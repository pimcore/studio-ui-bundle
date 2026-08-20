/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { AbstractMercureProcess, type AbstractMercureMessage } from './abstract-mercure-process'
import { renewMercureAuthorization } from '@Pimcore/modules/app/mercure/mercure-authorization'

jest.mock('@Pimcore/modules/app/mercure/mercure-authorization', () => ({
  renewMercureAuthorization: jest.fn(async () => {})
}))

const renewMock = renewMercureAuthorization as jest.MockedFunction<typeof renewMercureAuthorization>

/** Backoff delay of the first reconnect attempt, see AbstractMercureProcess. */
const FIRST_RECONNECT_DELAY = 2000

class FakeEventSource {
  public static readonly CONNECTING = 0
  public static readonly OPEN = 1
  public static readonly CLOSED = 2

  public static instances: FakeEventSource[] = []

  public readyState: number = FakeEventSource.CONNECTING
  public onopen: (() => void) | null = null
  public onmessage: ((event: MessageEvent) => void) | null = null
  public onerror: ((event: Event) => void) | null = null
  public readonly close = jest.fn(() => {
    this.readyState = FakeEventSource.CLOSED
  })

  constructor (public readonly url: string) {
    FakeEventSource.instances.push(this)
  }

  /** Simulate the hub or the network dropping the stream. */
  public fail (readyState: number): void {
    this.readyState = readyState
    this.onerror?.({ target: this } as unknown as Event)
  }
}

class TestProcess extends AbstractMercureProcess {
  protected readonly name = 'test-process'
  protected readonly description = undefined

  protected getTopics (): string[] {
    return ['studio-backend-default']
  }
}

const lastSource = (): FakeEventSource =>
  FakeEventSource.instances[FakeEventSource.instances.length - 1]

describe('AbstractMercureProcess reconnect', () => {
  let process: TestProcess

  beforeEach(() => {
    jest.useFakeTimers()
    FakeEventSource.instances = []
    renewMock.mockClear()
    renewMock.mockImplementation(async () => {})
    globalThis.EventSource = FakeEventSource as unknown as typeof EventSource
    process = new TestProcess()
  })

  afterEach(() => {
    process.cancel()
    jest.useRealTimers()
  })

  it('renews the authorization before reconnecting a dropped stream', async () => {
    process.start()
    expect(FakeEventSource.instances).toHaveLength(1)

    // The browser would reconnect this one on its own, reusing an expired cookie.
    lastSource().fail(FakeEventSource.CONNECTING)
    expect(lastSource().close).toHaveBeenCalled()

    await jest.advanceTimersByTimeAsync(FIRST_RECONNECT_DELAY)

    expect(renewMock).toHaveBeenCalledTimes(1)
    expect(FakeEventSource.instances).toHaveLength(2)
  })

  it('reconnects a refused stream as well, and reports the failure', async () => {
    const messages: AbstractMercureMessage[] = []
    process.onMessage = (message) => { messages.push(message as AbstractMercureMessage) }

    process.start()
    lastSource().fail(FakeEventSource.CLOSED)

    await jest.advanceTimersByTimeAsync(FIRST_RECONNECT_DELAY)

    expect(messages.map(message => message.type)).toContain('error')
    expect(renewMock).toHaveBeenCalledTimes(1)
    expect(FakeEventSource.instances).toHaveLength(2)
  })

  it('reconnects with the cookie it has when the renewal fails', async () => {
    renewMock.mockRejectedValue(new Error('offline'))

    process.start()
    lastSource().fail(FakeEventSource.CONNECTING)
    await jest.advanceTimersByTimeAsync(FIRST_RECONNECT_DELAY)

    expect(FakeEventSource.instances).toHaveLength(2)
  })

  it('does not reconnect after the process was cancelled', async () => {
    process.start()
    lastSource().fail(FakeEventSource.CONNECTING)
    process.cancel()

    await jest.advanceTimersByTimeAsync(FIRST_RECONNECT_DELAY * 10)

    expect(FakeEventSource.instances).toHaveLength(1)
  })

  it('drops a pending reconnect that was superseded by an explicit restart', async () => {
    let releaseRenewal = (): void => {}
    renewMock.mockImplementation(async () => {
      await new Promise<void>(resolve => { releaseRenewal = () => { resolve() } })
    })

    process.start()
    lastSource().fail(FakeEventSource.CONNECTING)
    await jest.advanceTimersByTimeAsync(FIRST_RECONNECT_DELAY)

    // Renewal is in flight; something else (visibility change, network back) restarts the process.
    process.start()
    expect(FakeEventSource.instances).toHaveLength(2)

    releaseRenewal()
    await jest.advanceTimersByTimeAsync(0)

    expect(FakeEventSource.instances).toHaveLength(2)
  })
})
