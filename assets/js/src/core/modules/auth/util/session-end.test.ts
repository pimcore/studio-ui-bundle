/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

jest.mock('@Pimcore/app/api/pimcore/route', () => ({
  getPrefix: () => '/pimcore-studio/api'
}))

// eslint-disable-next-line import/first
import { isSessionGone } from './session-end'

const respondWith = (response: Promise<Response>): jest.Mock => {
  const fetchMock = jest.fn(async () => await response)
  globalThis.fetch = fetchMock as unknown as typeof fetch

  return fetchMock
}

describe('isSessionGone', () => {
  const originalFetch = globalThis.fetch

  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  it('reports the session as gone when the server answers 401', async () => {
    const fetchMock = respondWith(Promise.resolve(new Response(null, { status: 401 })))

    await expect(isSessionGone()).resolves.toBe(true)
    expect(fetchMock).toHaveBeenCalledWith('/pimcore-studio/api/user/current-user-information', expect.anything())
  })

  it('keeps the session when the server still knows the user', async () => {
    respondWith(Promise.resolve(new Response('{}', { status: 200 })))

    await expect(isSessionGone()).resolves.toBe(false)
  })

  it('does not guess when the server cannot be asked', async () => {
    respondWith(Promise.reject(new TypeError('Failed to fetch')))

    await expect(isSessionGone()).resolves.toBe(false)
  })
})
