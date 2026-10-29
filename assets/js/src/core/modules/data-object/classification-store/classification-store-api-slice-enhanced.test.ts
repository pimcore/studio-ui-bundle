/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/**
 * The key update patches the cached key while the request is pending, but only with the
 * fields it actually sends: a null title means "leave the stored one alone" to the server,
 * so it must not blank the cached title for the length of the request.
 */

import { configureStore } from '@reduxjs/toolkit'
import { api } from './classification-store-api-slice-enhanced'

const STORE_ID = 1
const KEY_ID = 5
const KEYS_URL = `/pimcore-studio/api/classification-store/configuration/stores/${STORE_ID}/keys`
const KEY_URL = `/pimcore-studio/api/classification-store/configuration/keys/${KEY_ID}`

const storedKey = {
  id: KEY_ID,
  name: 'weight',
  storeId: STORE_ID,
  type: 'input',
  enabled: true,
  title: 'Weight',
  description: null,
  definition: null,
  creationDate: null,
  modificationDate: null
}

const queryArgs = { storeId: STORE_ID, body: { filters: { page: 1, pageSize: 10 } } }

const createStore = (): ReturnType<typeof configureStore> => configureStore({
  reducer: { [api.reducerPath]: api.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})

const cachedKey = (store: ReturnType<typeof createStore>): Record<string, unknown> | undefined => {
  const select = (api.endpoints as any).classificationStoreConfigurationKeyCollection.select(queryArgs)
  return select(store.getState()).data?.items?.[0]
}

const flush = async (): Promise<void> => { await new Promise((resolve) => setTimeout(resolve, 0)) }

describe('classification store key update cache patch', () => {
  const originalFetch = globalThis.fetch
  let respondToUpdate: (key: Record<string, unknown>) => void

  beforeEach(() => {
    globalThis.fetch = jest.fn(async (input: Request) => {
      if (input.url.endsWith(KEYS_URL)) {
        return new Response(JSON.stringify({ items: [storedKey], totalItems: 1 }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        })
      }

      // The update answer is held back so the optimistic window can be asserted.
      return await new Promise<Response>((resolve) => {
        respondToUpdate = (key) => {
          resolve(new Response(JSON.stringify(key), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          }))
        }
      })
    }) as unknown as typeof fetch
  })

  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  const subscribeToKeys = async (store: ReturnType<typeof createStore>): Promise<void> => {
    await store.dispatch((api.endpoints as any).classificationStoreConfigurationKeyCollection.initiate(queryArgs))
    expect(cachedKey(store)).toEqual(expect.objectContaining({ title: 'Weight' }))
  }

  const updateKey = async (store: ReturnType<typeof createStore>, title: string | null): Promise<unknown> =>
    await store.dispatch((api.endpoints as any).classificationStoreConfigurationKeyUpdate.initiate({
      id: KEY_ID,
      classificationStoreConfigurationKeyUpdate: {
        name: storedKey.name,
        title,
        description: null,
        type: storedKey.type,
        definition: null
      }
    }))

  it('keeps the cached title while an update that does not change it is pending', async () => {
    const store = createStore()
    await subscribeToKeys(store)

    const pending = updateKey(store, null)
    await flush()

    expect(cachedKey(store)).toEqual(expect.objectContaining({ title: 'Weight' }))

    respondToUpdate({ ...storedKey })
    await pending

    expect(cachedKey(store)).toEqual(expect.objectContaining({ title: 'Weight' }))
  })

  it('shows a new title while the update is still pending', async () => {
    const store = createStore()
    await subscribeToKeys(store)

    const pending = updateKey(store, 'Shipping weight')
    await flush()

    expect(cachedKey(store)).toEqual(expect.objectContaining({ title: 'Shipping weight' }))

    respondToUpdate({ ...storedKey, title: 'Shipping weight' })
    await pending
  })
})
