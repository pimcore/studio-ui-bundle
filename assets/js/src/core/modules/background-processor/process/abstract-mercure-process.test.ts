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
import {
  isAuthorizationFresh,
  isAuthorizationValid,
  renewMercureAuthorization
} from '@Pimcore/modules/app/mercure/mercure-authorization'

jest.mock('@Pimcore/modules/app/mercure/mercure-authorization', () => ({
  renewMercureAuthorization: jest.fn(async () => {}),
  isAuthorizationFresh: jest.fn(() => false),
  isAuthorizationValid: jest.fn(() => true)
}))

const renewMock = renewMercureAuthorization as jest.MockedFunction<typeof renewMercureAuthorization>
const freshMock = isAuthorizationFresh as jest.MockedFunction<typeof isAuthorizationFresh>
const validMock = isAuthorizationValid as jest.MockedFunction<typeof isAuthorizationValid>

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

/** The stream opens after the authorization check, so let those microtasks run. */
const settle = async (): Promise<void> => { await jest.advanceTimersByTimeAsync(0) }

describe('AbstractMercureProcess authorization and reconnect', () => {
  let process: TestProcess

  beforeEach(() => {
    jest.useFakeTimers()
    FakeEventSource.instances = []
    renewMock.mockReset()
    renewMock.mockImplementation(async () => {})
    freshMock.mockReturnValue(false)
    validMock.mockReturnValue(true)
    globalThis.EventSource = FakeEventSource as unknown as typeof EventSource
    process = new TestProcess()
  })

  afterEach(() => {
    process.cancel()
    jest.useRealTimers()
  })

  it('renews the authorization before opening the stream', async () => {
    process.start()
    await settle()

    expect(renewMock).toHaveBeenCalledTimes(1)
    expect(FakeEventSource.instances).toHaveLength(1)
  })

  it('skips the renewal while the authorization is still fresh', async () => {
    freshMock.mockReturnValue(true)

    process.start()
    await settle()

    expect(renewMock).not.toHaveBeenCalled()
    expect(FakeEventSource.instances).toHaveLength(1)
  })

  it('renews the authorization before reconnecting a dropped stream', async () => {
    process.start()
    await settle()

    // The browser would reconnect this one on its own, reusing an expired cookie.
    lastSource().fail(FakeEventSource.CONNECTING)
    expect(lastSource().close).toHaveBeenCalled()

    await jest.advanceTimersByTimeAsync(FIRST_RECONNECT_DELAY)

    expect(renewMock).toHaveBeenCalledTimes(2)
    expect(FakeEventSource.instances).toHaveLength(2)
  })

  it('reconnects a refused stream as well, and reports the failure', async () => {
    const messages: AbstractMercureMessage[] = []
    process.onMessage = (message) => { messages.push(message as AbstractMercureMessage) }

    process.start()
    await settle()
    lastSource().fail(FakeEventSource.CLOSED)

    await jest.advanceTimersByTimeAsync(FIRST_RECONNECT_DELAY)

    expect(messages.map(message => message.type)).toContain('error')
    expect(FakeEventSource.instances).toHaveLength(2)
  })

  it('connects with the cookie it holds when the renewal fails but the cookie is still valid', async () => {
    renewMock.mockRejectedValue(new Error('offline'))
    validMock.mockReturnValue(true)

    process.start()
    await settle()

    expect(FakeEventSource.instances).toHaveLength(1)
  })

  it('opens no stream at all when the renewal fails and the cookie has expired', async () => {
    renewMock.mockRejectedValue(new Error('offline'))
    validMock.mockReturnValue(false)

    process.start()
    await settle()

    // Connecting now would be an anonymous subscription: accepted with 200 OK, silent forever,
    // and `onopen` would even reset the backoff. Retry the authorization instead.
    expect(FakeEventSource.instances).toHaveLength(0)

    renewMock.mockResolvedValue(undefined)
    await jest.advanceTimersByTimeAsync(FIRST_RECONNECT_DELAY)

    expect(FakeEventSource.instances).toHaveLength(1)
  })

  it('does not reconnect after the process was cancelled', async () => {
    process.start()
    await settle()
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

    // Renewal is in flight; something else (visibility change, network back) restarts the process.
    freshMock.mockReturnValue(true)
    process.start()
    await settle()
    expect(FakeEventSource.instances).toHaveLength(1)

    releaseRenewal()
    await settle()

    expect(FakeEventSource.instances).toHaveLength(1)
  })
})
