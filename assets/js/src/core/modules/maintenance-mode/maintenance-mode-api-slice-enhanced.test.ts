/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { configureStore } from '@reduxjs/toolkit'
import { api } from './maintenance-mode-api-slice-enhanced'

const createStore = (): ReturnType<typeof configureStore> => configureStore({
  reducer: { [api.reducerPath]: api.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})

const selectState = api.endpoints.maintenanceModeGet.select()
type ApiState = Parameters<typeof selectState>[0]

const flushRefetches = async (): Promise<void> => { await new Promise((resolve) => setTimeout(resolve, 50)) }

// "Deactivate and log out" logs out right after deactivating: a request running alongside the logout keeps the session alive
describe('maintenance mode api cache', () => {
  const originalFetch = globalThis.fetch
  let fetchMock: jest.Mock
  let serverActive: boolean

  beforeEach(() => {
    fetchMock = jest.fn(async (input: Request) => {
      if (input.method === 'POST') {
        serverActive = true
      }
      if (input.method === 'DELETE') {
        serverActive = false
      }

      return new Response(JSON.stringify({ active: serverActive }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
    })
    globalThis.fetch = fetchMock as unknown as typeof fetch
  })

  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  const requestMethods = (): string[] => fetchMock.mock.calls.map(([input]) => (input as Request).method)

  it.each([
    { action: 'activating', before: false, method: 'POST', after: true },
    { action: 'deactivating', before: true, method: 'DELETE', after: false }
  ])('stores the state returned by $action without asking for it again', async ({ before, method, after }) => {
    serverActive = before
    const store = createStore()
    store.dispatch(api.endpoints.maintenanceModeGet.initiate() as any)
    await flushRefetches()

    const mutation = after ? api.endpoints.maintenanceModeActivate : api.endpoints.maintenanceModeDeactivate
    await store.dispatch(mutation.initiate() as any)
    await flushRefetches()

    expect(requestMethods()).toEqual(['GET', method])
    expect(selectState(store.getState() as ApiState).data?.active).toBe(after)
  })
})
