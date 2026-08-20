/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type * as MercureAuthorizationModule from './mercure-authorization'

const dispatch = jest.fn()
const initiate = jest.fn(() => 'mercure-create-cookie-action')

jest.mock('@Pimcore/app/store', () => ({
  store: { dispatch: (action: unknown) => dispatch(action) }
}))

jest.mock('@Pimcore/modules/app/mercure-api-slice.gen', () => ({
  api: { endpoints: { mercureCreateCookie: { initiate: () => initiate() } } }
}))

type AuthorizationModule = typeof MercureAuthorizationModule

const respondWith = (response: unknown): void => {
  dispatch.mockReturnValue({ unwrap: async () => response })
}

const rejectWith = (error: Error): void => {
  dispatch.mockReturnValue({ unwrap: async () => { throw error } })
}

const loadModule = async (): Promise<AuthorizationModule> => {
  let module: AuthorizationModule | undefined
  await jest.isolateModulesAsync(async () => {
    module = await import('./mercure-authorization')
  })

  return module!
}

describe('mercure authorization', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    dispatch.mockReset()
    initiate.mockClear()
    respondWith({ cookieLifetime: 3600 })
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('requests a new cookie and learns its lifetime from the response', async () => {
    const module = await loadModule()

    await module.renewMercureAuthorization()

    expect(initiate).toHaveBeenCalledTimes(1)
    expect(module.getAuthorizationLifetimeMs()).toBe(3_600_000)
  })

  it('keeps the last known lifetime when the response does not carry one', async () => {
    const module = await loadModule()
    respondWith({ cookieLifetime: 900 })
    await module.renewMercureAuthorization()

    respondWith(undefined)
    await module.renewMercureAuthorization()

    expect(module.getAuthorizationLifetimeMs()).toBe(900_000)
  })

  it('rejects when the request fails, so the caller can fall back to the cookie it has', async () => {
    const module = await loadModule()
    rejectWith(new Error('offline'))

    await expect(module.renewMercureAuthorization()).rejects.toThrow('offline')
  })

  it('renews in the background before the cookie expires, and keeps renewing', async () => {
    const module = await loadModule()
    respondWith({ cookieLifetime: 1000 })
    // The app loader fetches the first cookie through the same call, which is what teaches the
    // schedule the configured lifetime instead of the fallback.
    await module.renewMercureAuthorization()
    initiate.mockClear()

    module.startMercureAuthorizationRenewal()

    // Nothing yet: renewal happens at 80% of the lifetime, not immediately.
    await jest.advanceTimersByTimeAsync(799_000)
    expect(initiate).not.toHaveBeenCalled()

    await jest.advanceTimersByTimeAsync(1_000)
    expect(initiate).toHaveBeenCalledTimes(1)

    await jest.advanceTimersByTimeAsync(800_000)
    expect(initiate).toHaveBeenCalledTimes(2)
  })

  it('keeps the schedule alive when a renewal fails', async () => {
    const module = await loadModule()
    rejectWith(new Error('offline'))

    module.startMercureAuthorizationRenewal()

    await jest.advanceTimersByTimeAsync(2_880_000)
    expect(initiate).toHaveBeenCalledTimes(1)

    await jest.advanceTimersByTimeAsync(2_880_000)
    expect(initiate).toHaveBeenCalledTimes(2)
  })

  it('does not stack a second timer when started twice', async () => {
    const module = await loadModule()

    module.startMercureAuthorizationRenewal()
    module.startMercureAuthorizationRenewal()

    await jest.advanceTimersByTimeAsync(2_880_000)

    expect(initiate).toHaveBeenCalledTimes(1)
  })

  it('stops renewing once cancelled', async () => {
    const module = await loadModule()

    module.startMercureAuthorizationRenewal()
    module.stopMercureAuthorizationRenewal()

    await jest.advanceTimersByTimeAsync(2_880_000)

    expect(initiate).not.toHaveBeenCalled()
  })
})
