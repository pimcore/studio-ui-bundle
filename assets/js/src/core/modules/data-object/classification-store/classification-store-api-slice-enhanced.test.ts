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
 * A confirmed configuration mutation announces itself to an open object editor, the config
 * grids keep their in-place patches and a failed mutation announces nothing.
 */

/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { configureStore } from '@reduxjs/toolkit'
import { waitFor } from '@testing-library/react'
import { api } from './classification-store-api-slice-enhanced'
import { subscribeToClassificationStoreConfigurationChange } from './classification-store-configuration-change'

const KEY_COLLECTION_URL = '/classification-store/configuration/stores/1/keys'

const createStore = (): ReturnType<typeof configureStore> => configureStore({
  reducer: { [api.reducerPath]: api.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})

const dispatchLoose = (store: ReturnType<typeof createStore>): ((action: unknown) => Promise<unknown>) => store.dispatch as unknown as (action: unknown) => Promise<unknown>

const keyRow = { id: 5, name: 'Old', type: 'input', description: 'd', definition: null }

const mutations: Array<[string, () => any]> = [
  ['group update', () => api.endpoints.classificationStoreConfigurationGroupUpdate.initiate({ id: 1, classificationStoreConfigurationGroupUpdate: { name: 'G' } } as any)],
  ['group delete', () => api.endpoints.classificationStoreConfigurationGroupDelete.initiate({ id: 1 } as any)],
  ['collection update', () => api.endpoints.classificationStoreConfigurationCollectionUpdate.initiate({ id: 1, classificationStoreConfigurationCollectionUpdate: { name: 'C' } } as any)],
  ['collection delete', () => api.endpoints.classificationStoreConfigurationCollectionDelete.initiate({ id: 1 } as any)],
  ['key update', () => api.endpoints.classificationStoreConfigurationKeyUpdate.initiate({ id: 5, classificationStoreConfigurationKeyUpdate: { name: 'K', type: 'input' } } as any)],
  ['key delete', () => api.endpoints.classificationStoreConfigurationKeyDelete.initiate({ id: 5 } as any)],
  ['key group relation create', () => api.endpoints.classificationStoreConfigurationKeyGroupRelationCreate.initiate({ classificationStoreConfigurationKeyGroupRelationCreate: { keyId: 5, groupId: 1, sorter: 0, mandatory: false } } as any)],
  ['key group relation delete', () => api.endpoints.classificationStoreConfigurationKeyGroupRelationDelete.initiate({ classificationStoreConfigurationKeyGroupRelationDelete: { keyId: 5, groupId: 1 } } as any)],
  ['collection relation create', () => api.endpoints.classificationStoreConfigurationCollectionRelationCreate.initiate({ classificationStoreConfigurationCollectionRelationCreate: { colId: 1, groupId: 1, sorter: 0 } } as any)],
  ['collection relation delete', () => api.endpoints.classificationStoreConfigurationCollectionRelationDelete.initiate({ classificationStoreConfigurationCollectionRelationDelete: { colId: 1, groupId: 1 } } as any)]
]

describe('classification store configuration change signal', () => {
  const originalFetch = globalThis.fetch
  let fetchMock: jest.Mock
  let respondWithError = false
  const listener = jest.fn()
  let unsubscribe: () => void

  beforeEach(() => {
    respondWithError = false
    listener.mockClear()
    unsubscribe = subscribeToClassificationStoreConfigurationChange(listener)
    fetchMock = jest.fn(async () => respondWithError
      ? new Response(JSON.stringify({ message: 'failed' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
      : new Response(JSON.stringify({ ...keyRow, items: [keyRow], totalItems: 1, keyId: 5, groupId: 1, colId: 1 }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }))
    globalThis.fetch = fetchMock as unknown as typeof fetch
  })

  afterEach(() => {
    unsubscribe()
    globalThis.fetch = originalFetch
  })

  it.each(mutations)('announces a confirmed %s once', async (_name, mutation) => {
    const store = createStore()

    await dispatchLoose(store)(mutation())

    await waitFor(() => { expect(listener).toHaveBeenCalledTimes(1) })
  })

  it.each(mutations)('announces nothing for a rejected %s', async (_name, mutation) => {
    respondWithError = true
    const store = createStore()

    await dispatchLoose(store)(mutation())
    await new Promise((resolve) => setTimeout(resolve, 20))

    expect(listener).not.toHaveBeenCalled()
  })

  it('does not refetch a subscribed key page and patches the row in place', async () => {
    const store = createStore()
    await dispatchLoose(store)(api.endpoints.classificationStoreConfigurationKeyCollection.initiate({ storeId: 1, body: { filters: { page: 1, pageSize: 10 } } } as any))
    const collectionCalls = (): number => fetchMock.mock.calls.filter(([input]) => (input as Request).url.includes(KEY_COLLECTION_URL)).length
    expect(collectionCalls()).toBe(1)

    await dispatchLoose(store)(api.endpoints.classificationStoreConfigurationKeyUpdate.initiate({
      id: 5,
      classificationStoreConfigurationKeyUpdate: { name: 'New', type: 'input', description: 'd' }
    } as any))
    await new Promise((resolve) => setTimeout(resolve, 20))

    expect(collectionCalls()).toBe(1)
    const cached = api.endpoints.classificationStoreConfigurationKeyCollection.select({ storeId: 1, body: { filters: { page: 1, pageSize: 10 } } } as any)(store.getState() as any)
    expect((cached.data as any).items[0].id).toBe(5)
  })

  it('rolls the patched row back when the key update is rejected', async () => {
    const store = createStore()
    const args = { storeId: 1, body: { filters: { page: 1, pageSize: 10 } } } as any
    await dispatchLoose(store)(api.endpoints.classificationStoreConfigurationKeyCollection.initiate(args))

    respondWithError = true
    await dispatchLoose(store)(api.endpoints.classificationStoreConfigurationKeyUpdate.initiate({
      id: 5,
      classificationStoreConfigurationKeyUpdate: { name: 'New', type: 'input', description: 'x' }
    } as any))
    await new Promise((resolve) => setTimeout(resolve, 20))

    const cached = api.endpoints.classificationStoreConfigurationKeyCollection.select(args)(store.getState() as any)
    expect((cached.data as any).items[0].name).toBe('Old')
  })
  const json = (body: unknown): Response => new Response(JSON.stringify(body), { status: 200, headers: { 'Content-Type': 'application/json' } })
  const select = (store: ReturnType<typeof createStore>, endpoint: 'classificationStoreConfigurationKeyCollection' | 'classificationStoreConfigurationKeyGroupRelationCollection', args: unknown): any => (
    (api.endpoints[endpoint] as any).select(args)(store.getState()).data
  )

  it('lowers the total of the store a key was deleted in, and no other store\'s', async () => {
    fetchMock.mockImplementation(async (input: Request) => {
      if (input.url.endsWith('/stores/1/keys')) return json({ items: [{ ...keyRow, id: 5 }], totalItems: 1 })
      if (input.url.endsWith('/stores/2/keys')) return json({ items: [{ ...keyRow, id: 6 }], totalItems: 1 })
      return json({})
    })
    const store = createStore()
    const argsA = { storeId: 1, body: { filters: { page: 1, pageSize: 10 } } }
    const argsB = { storeId: 2, body: { filters: { page: 1, pageSize: 10 } } }
    await dispatchLoose(store)(api.endpoints.classificationStoreConfigurationKeyCollection.initiate(argsA as any))
    await dispatchLoose(store)(api.endpoints.classificationStoreConfigurationKeyCollection.initiate(argsB as any))

    fetchMock.mockImplementation(async () => json({}))
    await dispatchLoose(store)(api.endpoints.classificationStoreConfigurationKeyDelete.initiate({ id: 6 } as any))
    await waitFor(() => { expect(select(store, 'classificationStoreConfigurationKeyCollection', argsB).totalItems).toBe(0) })

    expect(select(store, 'classificationStoreConfigurationKeyCollection', argsA).totalItems).toBe(1)
    expect(select(store, 'classificationStoreConfigurationKeyCollection', argsA).items).toHaveLength(1)
  })

  it('appends a created relation to the page that shows it only', async () => {
    const relation = (keyId: number): object => ({ keyId, groupId: 1, sorter: 0, mandatory: false, keyName: `k${keyId}`, keyDescription: null, groupName: 'G' })
    fetchMock.mockImplementation(async (input: Request) => {
      if (!input.url.includes('/key-relations')) return json({})
      const page = JSON.parse(await input.clone().text()).filters.page
      return json(page === 1
        ? { items: Array.from({ length: 2 }, (_v, i) => relation(i + 1)), totalItems: 3 }
        : { items: [relation(3)], totalItems: 3 })
    })
    const store = createStore()
    const page1 = { groupId: 1, body: { filters: { page: 1, pageSize: 2 } } }
    const page2 = { groupId: 1, body: { filters: { page: 2, pageSize: 2 } } }
    await dispatchLoose(store)(api.endpoints.classificationStoreConfigurationKeyGroupRelationCollection.initiate(page1 as any))
    await dispatchLoose(store)(api.endpoints.classificationStoreConfigurationKeyGroupRelationCollection.initiate(page2 as any))

    fetchMock.mockImplementation(async () => json(relation(4)))
    await dispatchLoose(store)(api.endpoints.classificationStoreConfigurationKeyGroupRelationCreate.initiate({
      classificationStoreConfigurationKeyGroupRelationCreate: { keyId: 4, groupId: 1, sorter: 0, mandatory: false }
    } as any))
    await waitFor(() => { expect(select(store, 'classificationStoreConfigurationKeyGroupRelationCollection', page2).items).toHaveLength(2) })

    expect(select(store, 'classificationStoreConfigurationKeyGroupRelationCollection', page1).items).toHaveLength(2)
    expect(select(store, 'classificationStoreConfigurationKeyGroupRelationCollection', page2).items.map((r: any) => r.keyId)).toEqual([3, 4])
    // both pages count the new row, so the pagination can reach it
    expect(select(store, 'classificationStoreConfigurationKeyGroupRelationCollection', page1).totalItems).toBe(4)
    expect(select(store, 'classificationStoreConfigurationKeyGroupRelationCollection', page2).totalItems).toBe(4)
  })

  it('counts a created relation on a full single page without showing it there', async () => {
    const relation = (keyId: number): object => ({ keyId, groupId: 1, sorter: 0, mandatory: false, keyName: `k${keyId}`, keyDescription: null, groupName: 'G' })
    fetchMock.mockImplementation(async () => json({ items: [relation(1), relation(2)], totalItems: 2 }))
    const store = createStore()
    const page1 = { groupId: 1, body: { filters: { page: 1, pageSize: 2 } } }
    await dispatchLoose(store)(api.endpoints.classificationStoreConfigurationKeyGroupRelationCollection.initiate(page1 as any))

    fetchMock.mockImplementation(async () => json(relation(3)))
    await dispatchLoose(store)(api.endpoints.classificationStoreConfigurationKeyGroupRelationCreate.initiate({
      classificationStoreConfigurationKeyGroupRelationCreate: { keyId: 3, groupId: 1, sorter: 0, mandatory: false }
    } as any))
    await waitFor(() => { expect(select(store, 'classificationStoreConfigurationKeyGroupRelationCollection', page1).totalItems).toBe(3) })

    expect(select(store, 'classificationStoreConfigurationKeyGroupRelationCollection', page1).items).toHaveLength(2)
  })

  it('leaves the total of a cached search alone when the deleted key is not in it', async () => {
    fetchMock.mockImplementation(async (input: Request) => {
      const filtered = (await input.clone().text()).includes('abc')
      return json(filtered
        ? { items: [{ ...keyRow, id: 1 }, { ...keyRow, id: 2 }, { ...keyRow, id: 3 }], totalItems: 3 }
        : { items: [{ ...keyRow, id: 5 }], totalItems: 1 })
    })
    const store = createStore()
    const search = { storeId: 1, body: { filters: { page: 1, pageSize: 10, columnFilters: { name: 'abc' } } } }
    const all = { storeId: 1, body: { filters: { page: 1, pageSize: 10 } } }
    await dispatchLoose(store)(api.endpoints.classificationStoreConfigurationKeyCollection.initiate(search as any))
    await dispatchLoose(store)(api.endpoints.classificationStoreConfigurationKeyCollection.initiate(all as any))

    fetchMock.mockImplementation(async () => json({}))
    await dispatchLoose(store)(api.endpoints.classificationStoreConfigurationKeyDelete.initiate({ id: 5 } as any))
    await waitFor(() => { expect(select(store, 'classificationStoreConfigurationKeyCollection', all).totalItems).toBe(0) })

    expect(select(store, 'classificationStoreConfigurationKeyCollection', search).totalItems).toBe(3)
  })
})
