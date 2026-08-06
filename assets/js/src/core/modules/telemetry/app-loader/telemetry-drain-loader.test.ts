/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

const mockDispatch = jest.fn()

jest.mock('@Pimcore/app/store', () => ({
  store: { dispatch: (action: unknown) => mockDispatch(action) }
}))

// Identify the two endpoints by a marker so the dispatch mock can answer each one independently.
jest.mock('../telemetry-api-slice.gen', () => ({
  api: {
    endpoints: {
      telemetryOutboxNextBatch: {
        initiate: (arg: unknown, options: unknown) => ({ endpoint: 'getOutbox', arg, options })
      },
      telemetryOutboxAck: { initiate: (arg: unknown) => ({ endpoint: 'ack', arg }) }
    }
  }
}))

// eslint-disable-next-line import/first
import { telemetryDrainLoader } from './telemetry-drain-loader'

interface Batch {
  nonce: string
  instanceIdentifier: string
  v: number
  ciphertext: string
  relayEndpoint: string
}

const batch = (nonce: string): Batch => ({
  nonce,
  instanceIdentifier: 'inst-1',
  v: 1,
  ciphertext: 'opaque',
  relayEndpoint: 'https://license.pimcore.com/telemetry/v1/ingest'
})

/** Queue of outbox answers; `Error` means the request itself failed. */
let outbox: Array<Batch | null | Error> = []
let ackFails = false
const acked: string[] = []

const relayResponds = (init: { ok?: boolean, body?: unknown, throws?: boolean }): void => {
  ;(global.fetch as jest.Mock).mockImplementation(async () => {
    if (init.throws === true) {
      throw new Error('network down')
    }

    return {
      ok: init.ok ?? true,
      json: async () => init.body ?? { status: 'ok' }
    }
  })
}

beforeEach(() => {
  outbox = []
  ackFails = false
  acked.length = 0
  global.fetch = jest.fn()
  relayResponds({})

  mockDispatch.mockImplementation((action: { endpoint: string, arg: { telemetryOutboxAckParameters?: { nonce: string } } }) => {
    if (action.endpoint === 'getOutbox') {
      const next = outbox.length > 0 ? outbox.shift() : null

      return {
        unwrap: async () => {
          if (next instanceof Error) {
            throw next
          }

          return next ?? null
        }
      }
    }

    return {
      unwrap: async () => {
        if (ackFails) {
          throw new Error('ack failed')
        }
        acked.push(action.arg.telemetryOutboxAckParameters?.nonce ?? '')

        return { acked: 1 }
      }
    }
  })
})

describe('telemetryDrainLoader', () => {
  it('does nothing when the outbox is empty', async () => {
    outbox = [null]

    await telemetryDrainLoader.onLoad()

    expect(global.fetch).not.toHaveBeenCalled()
    expect(acked).toEqual([])
  })

  it('forwards the opaque batch to the relay and only then acks it', async () => {
    outbox = [batch('n1'), null]

    await telemetryDrainLoader.onLoad()

    expect(global.fetch).toHaveBeenCalledTimes(1)
    const [url, init] = (global.fetch as jest.Mock).mock.calls[0] as [string, { body: string }]
    const sent = JSON.parse(init.body) as Record<string, unknown>
    expect(url).toBe('https://license.pimcore.com/telemetry/v1/ingest')
    expect(sent).toEqual({ instanceIdentifier: 'inst-1', v: 1, ciphertext: 'opaque' })
    // the nonce is an outbox lease, not part of the relay envelope
    expect(sent.nonce).toBeUndefined()
    expect(acked).toEqual(['n1'])
  })

  it('drains repeatedly until the pool reports empty', async () => {
    outbox = [batch('n1'), batch('n2'), batch('n3'), null]

    await telemetryDrainLoader.onLoad()

    expect(acked).toEqual(['n1', 'n2', 'n3'])
  })

  it('never acks when the relay rejects the batch', async () => {
    outbox = [batch('n1'), batch('n2')]
    relayResponds({ ok: false })

    await telemetryDrainLoader.onLoad()

    expect(acked).toEqual([])
    expect(global.fetch).toHaveBeenCalledTimes(1) // stops on the first failure
  })

  /**
   * The guarantee that protects against data loss: a captive portal or proxy answering 200 without
   * the relay's own confirmation must not cause the batch to be dropped from the pool.
   */
  it('never acks on a 2xx that is not a confirmed relay acceptance', async () => {
    outbox = [batch('n1')]
    relayResponds({ ok: true, body: { status: 'something-else' } })

    await telemetryDrainLoader.onLoad()

    expect(acked).toEqual([])
  })

  it('never acks when the relay response is not parseable', async () => {
    outbox = [batch('n1')]
    ;(global.fetch as jest.Mock).mockImplementation(async () => ({
      ok: true,
      json: async () => {
        throw new Error('not json')
      }
    }))

    await telemetryDrainLoader.onLoad()

    expect(acked).toEqual([])
  })

  it('never acks when the relay is unreachable', async () => {
    outbox = [batch('n1')]
    relayResponds({ throws: true })

    await telemetryDrainLoader.onLoad()

    expect(acked).toEqual([])
  })

  it('stops when the outbox request itself fails', async () => {
    outbox = [new Error('backend not ready')]

    await telemetryDrainLoader.onLoad()

    expect(global.fetch).not.toHaveBeenCalled()
    expect(acked).toEqual([])
  })

  it('stops when the ack fails, leaving the batch to be retried', async () => {
    outbox = [batch('n1'), batch('n2'), null]
    ackFails = true

    await telemetryDrainLoader.onLoad()

    expect(acked).toEqual([])
    expect(global.fetch).toHaveBeenCalledTimes(1) // did not go on to the second batch
  })

  it('caps the work it does in one session', async () => {
    // an outbox that never empties must not spin forever during login
    outbox = Array.from({ length: 200 }, (_, i) => batch(`n${i}`))

    await telemetryDrainLoader.onLoad()

    expect(acked).toHaveLength(50)
  })

  it('never rejects, so it cannot block application loading', async () => {
    outbox = [new Error('everything is broken')]

    await expect(telemetryDrainLoader.onLoad()).resolves.toBeUndefined()
  })
})
