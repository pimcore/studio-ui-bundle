/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/* eslint-disable max-lines */

/**
 * The key update patches the cached key while the request is pending, but only with the
 * fields it actually sends: a null title means "leave the stored one alone" to the server,
 * so it must not blank the cached title for the length of the request.
 */

import { configureStore } from '@reduxjs/toolkit'
import { waitFor } from '@testing-library/react'
import {
  api,
  type ClassificationStoreConfigurationKeyUpdate
} from './classification-store-api-slice-enhanced'

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
  modificationDate: null,
  localized: true
}

/** A definition blob only the key definition dialog writes; every cell edit leaves it alone. */
const DEFINITION = { fieldtype: 'input', title: 'Weight' }

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
  /** The update requests the slice sent, so what reaches the wire can be asserted. */
  let updateRequests: Array<{ url: string, body: Record<string, unknown> }>
  /** One resolver per update request, in the order the requests were made. */
  let pendingUpdates: Array<(key: Record<string, unknown>) => void>

  beforeEach(() => {
    updateRequests = []
    pendingUpdates = []

    globalThis.fetch = jest.fn(async (input: Request) => {
      if (input.url.endsWith(KEYS_URL)) {
        return new Response(JSON.stringify({ items: [storedKey], totalItems: 1 }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        })
      }

      updateRequests.push({ url: input.url, body: JSON.parse(await input.clone().text()) })

      // The update answer is held back so the optimistic window can be asserted.
      return await new Promise<Response>((resolve) => {
        respondToUpdate = (key) => {
          resolve(new Response(JSON.stringify(key), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          }))
        }
        pendingUpdates.push(respondToUpdate)
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

  /** Typed on purpose: the payload only compiles while the hand-written `localized` shadow exists. */
  const keyUpdate = (payload: Partial<ClassificationStoreConfigurationKeyUpdate>): ClassificationStoreConfigurationKeyUpdate => ({
    name: storedKey.name,
    title: null,
    description: null,
    type: storedKey.type,
    definition: null,
    ...payload
  })

  const dispatchUpdate = async (
    store: ReturnType<typeof createStore>,
    update: ClassificationStoreConfigurationKeyUpdate
  ): Promise<unknown> =>
    await store.dispatch((api.endpoints as any).classificationStoreConfigurationKeyUpdate.initiate({
      id: KEY_ID,
      classificationStoreConfigurationKeyUpdate: update
    }))

  const updateKey = async (store: ReturnType<typeof createStore>, title: string | null): Promise<unknown> =>
    await dispatchUpdate(store, keyUpdate({ title }))

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

  it('sends the localized member of the payload to the key endpoint', async () => {
    const store = createStore()
    await subscribeToKeys(store)

    const pending = dispatchUpdate(store, keyUpdate({ localized: false }))
    await flush()

    expect(updateRequests).toHaveLength(1)
    expect(updateRequests[0].url.endsWith(KEY_URL)).toBe(true)
    expect(updateRequests[0].body).toEqual(expect.objectContaining({ localized: false }))

    respondToUpdate({ ...storedKey, localized: false })
    await pending
  })

  it('keeps the cached localized flag while an update that does not carry it is pending', async () => {
    const store = createStore()
    await subscribeToKeys(store)

    const pending = dispatchUpdate(store, keyUpdate({ title: 'Shipping weight' }))
    await flush()

    expect(cachedKey(store)).toEqual(expect.objectContaining({ localized: true }))

    respondToUpdate({ ...storedKey, title: 'Shipping weight' })
    await pending
  })

  it('shows an explicit null localized flag while the update is pending and takes the answer', async () => {
    const store = createStore()
    await subscribeToKeys(store)

    const pending = dispatchUpdate(store, keyUpdate({ localized: null }))
    await flush()

    // A present null is a value here, not an absence: it clears the stored flag.
    expect(cachedKey(store)).toEqual(expect.objectContaining({ localized: null }))

    respondToUpdate({ ...storedKey, localized: null })
    await pending

    expect(cachedKey(store)).toEqual(expect.objectContaining({ localized: null }))
  })

  it('leaves the cached localized flag alone when the member is sent as undefined', async () => {
    // An undefined member is dropped on the way to the wire, so the server never hears about it
    // and the cache may not patch one either: present-as-undefined is not an explicit null.
    const store = createStore()
    await subscribeToKeys(store)

    const pending = dispatchUpdate(store, keyUpdate({ localized: undefined }))
    await flush()

    expect(updateRequests[0].body).not.toHaveProperty('localized')
    expect(cachedKey(store)).toEqual(expect.objectContaining({ localized: true }))

    respondToUpdate({ ...storedKey })
    await pending

    expect(cachedKey(store)).toEqual(expect.objectContaining({ localized: true }))
  })

  it('keeps a saved definition when an older cell edit answers last', async () => {
    // The dialog writes the definition and the grid's cell edits leave it alone, and the dialog
    // reads the key back out of this cache. A response that replaced the whole row would write
    // back the definition the server held while the older request ran.
    const store = createStore()
    await subscribeToKeys(store)

    // A title edit goes out first; its null definition means "leave the stored one alone".
    const cellEdit = dispatchUpdate(store, keyUpdate({ title: 'Shipping weight' }))
    await flush()
    // The dialog's definition save follows while the cell edit is still in flight.
    const dialogSave = dispatchUpdate(store, keyUpdate({ title: storedKey.title, definition: DEFINITION }))
    await flush()

    expect(pendingUpdates).toHaveLength(2)

    pendingUpdates[1]({ ...storedKey, title: 'Shipping weight', definition: DEFINITION })
    await dialogSave

    expect(cachedKey(store)).toEqual(expect.objectContaining({ definition: DEFINITION }))

    // The cell edit answers last, carrying the definition as it was before the dialog's save.
    pendingUpdates[0]({ ...storedKey, title: 'Shipping weight', definition: null })
    await cellEdit

    expect(cachedKey(store)).toEqual(expect.objectContaining({
      title: 'Shipping weight',
      definition: DEFINITION
    }))
  })

  it('keeps a saved localization when an older cell edit answers last', async () => {
    // The keys grid and the key definition dialog write disjoint members of the same row, and
    // the dialog reads the key back out of this cache. A response that replaced the whole row
    // would write back the flag the server held while the older request ran.
    const store = createStore()
    await subscribeToKeys(store)

    // A title edit goes out first and carries no localized member at all.
    const cellEdit = dispatchUpdate(store, keyUpdate({ title: 'Shipping weight' }))
    await flush()
    // The dialog's save follows while the cell edit is still in flight.
    const dialogSave = dispatchUpdate(store, keyUpdate({ localized: false }))
    await flush()

    expect(pendingUpdates).toHaveLength(2)

    pendingUpdates[1]({ ...storedKey, title: 'Shipping weight', localized: false })
    await dialogSave

    expect(cachedKey(store)).toEqual(expect.objectContaining({ localized: false }))

    // The cell edit answers last, carrying the flag as it was before the dialog's save.
    pendingUpdates[0]({ ...storedKey, title: 'Shipping weight', localized: true })
    await cellEdit

    expect(cachedKey(store)).toEqual(expect.objectContaining({
      title: 'Shipping weight',
      localized: false
    }))
  })
})

/**
 * The key-group relation create-or-upsert is the one endpoint two surfaces write disjoint fields
 * of the same row through: a cell edit sends `sorter` or `mandatory`, a sub-group assignment sends
 * `subGroup`, and an absent property leaves the stored value alone. So the response may only
 * confirm the fields its own request named — a response that replaced the whole cached row wrote
 * back the fields it did not name as the server held them when it ran, and a cell edit answered
 * after an assignment restored the sub group the server had already replaced.
 */
describe('classification store key-group relation upsert cache patch', () => {
  const GROUP_ID = 7
  const RELATION_KEY_ID = 42
  const RELATIONS_URL = `/pimcore-studio/api/classification-store/configuration/groups/${GROUP_ID}/key-relations`
  const RELATION_ADD_URL = '/pimcore-studio/api/classification-store/configuration/key-group-relations/add'

  const storedRelation = {
    keyId: RELATION_KEY_ID,
    groupId: GROUP_ID,
    sorter: 3,
    mandatory: false,
    keyName: 'weight',
    keyDescription: null,
    groupName: 'Dimensions',
    subGroup: null
  }

  const relationQueryArgs = { groupId: GROUP_ID, body: { filters: { page: 1, pageSize: 10 } } }

  const cachedRelation = (store: ReturnType<typeof createStore>): Record<string, unknown> | undefined => {
    const select = (api.endpoints as any).classificationStoreConfigurationKeyGroupRelationCollection
      .select(relationQueryArgs)

    return select(store.getState()).data?.items?.[0]
  }

  const originalFetch = globalThis.fetch
  /** One resolver per upsert request, in the order the requests were made. */
  let pendingUpserts: Array<(relation: Record<string, unknown>) => void>

  beforeEach(() => {
    pendingUpserts = []

    globalThis.fetch = jest.fn(async (input: Request) => {
      if (input.url.endsWith(RELATIONS_URL)) {
        return new Response(JSON.stringify({ items: [storedRelation], totalItems: 1 }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        })
      }

      // Every upsert answer is held back, so the test decides the order they land in.
      return await new Promise<Response>((resolve) => {
        pendingUpserts.push((relation) => {
          resolve(new Response(JSON.stringify(relation), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          }))
        })
      })
    }) as unknown as typeof fetch
  })

  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  const upsert = async (
    store: ReturnType<typeof createStore>,
    payload: Record<string, unknown>
  ): Promise<unknown> =>
    await store.dispatch((api.endpoints as any).classificationStoreConfigurationKeyGroupRelationCreate.initiate({
      classificationStoreConfigurationKeyGroupRelationCreate: {
        keyId: RELATION_KEY_ID,
        groupId: GROUP_ID,
        ...payload
      }
    }))

  it('keeps an assigned sub group when an older cell edit answers last', async () => {
    const store = createStore()
    await store.dispatch(
      (api.endpoints as any).classificationStoreConfigurationKeyGroupRelationCollection.initiate(relationQueryArgs)
    )
    expect(cachedRelation(store)).toEqual(expect.objectContaining({ sorter: 3, subGroup: null }))

    // A cell edit of the sorter goes out first and carries no subGroup at all.
    const cellEdit = upsert(store, { sorter: 9 })
    await flush()
    // The assignment follows while the cell edit is still in flight, and carries no sorter.
    const assignment = upsert(store, { subGroup: 'electrical' })
    await flush()

    expect(pendingUpserts).toHaveLength(2)

    // The server applied the sorter first, then the assignment: its answer to the assignment
    // carries both, its answer to the cell edit carries the sub group as it was before.
    pendingUpserts[1]({ ...storedRelation, sorter: 9, subGroup: 'electrical' })
    await assignment
    expect(cachedRelation(store)).toEqual(expect.objectContaining({ sorter: 9, subGroup: 'electrical' }))

    pendingUpserts[0]({ ...storedRelation, sorter: 9, subGroup: null })
    await cellEdit

    // The cell edit confirms its own sorter and leaves the assignment it never named alone.
    expect(cachedRelation(store)).toEqual(expect.objectContaining({ sorter: 9, subGroup: 'electrical' }))
  })

  it('keeps a cell edit when an older assignment answers last', async () => {
    const store = createStore()
    await store.dispatch(
      (api.endpoints as any).classificationStoreConfigurationKeyGroupRelationCollection.initiate(relationQueryArgs)
    )

    const assignment = upsert(store, { subGroup: 'electrical' })
    await flush()
    const cellEdit = upsert(store, { mandatory: true })
    await flush()

    pendingUpserts[1]({ ...storedRelation, mandatory: true, subGroup: 'electrical' })
    await cellEdit

    pendingUpserts[0]({ ...storedRelation, mandatory: false, subGroup: 'electrical' })
    await assignment

    expect(cachedRelation(store)).toEqual(expect.objectContaining({ mandatory: true, subGroup: 'electrical' }))
  })

  it('keeps the field mask on a page that already held the row while another page did not', async () => {
    // The group is paged, so two of its pages can be cached at once and the relation sits on
    // only one of them. Insertion is therefore per cache entry: counting the second page's miss
    // as an insertion made the confirmation replace the whole row on the page that already held
    // it, which wrote the sub group back as the server had it when the older request ran.
    const store = createStore()
    const page2Args = { groupId: GROUP_ID, body: { filters: { page: 2, pageSize: 10 } } }

    globalThis.fetch = jest.fn(async (input: Request) => {
      const body = JSON.parse(await input.clone().text())

      if (input.url.endsWith(RELATIONS_URL)) {
        // Page one holds the relation, page two is a page of other keys that does not.
        const page = body?.filters?.page ?? 1

        return new Response(JSON.stringify(
          page === 1
            ? { items: [storedRelation], totalItems: 11 }
            : { items: [{ ...storedRelation, keyId: 77, keyName: 'colour' }], totalItems: 11 }
        ), { status: 200, headers: { 'Content-Type': 'application/json' } })
      }

      return await new Promise<Response>((resolve) => {
        pendingUpserts.push((relation) => {
          resolve(new Response(JSON.stringify(relation), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          }))
        })
      })
    }) as unknown as typeof fetch

    const collection = (api.endpoints as any).classificationStoreConfigurationKeyGroupRelationCollection
    await store.dispatch(collection.initiate(relationQueryArgs))
    await store.dispatch(collection.initiate(page2Args))

    // A cell edit of the sorter goes out first and carries no subGroup at all.
    const cellEdit = upsert(store, { sorter: 9 })
    await flush()
    // The assignment follows while the cell edit is still in flight, and carries no sorter.
    const assignment = upsert(store, { subGroup: 'electrical' })
    await flush()

    pendingUpserts[1]({ ...storedRelation, sorter: 9, subGroup: 'electrical' })
    await assignment

    // The cell edit answers last, carrying the sub group as it was before the assignment.
    pendingUpserts[0]({ ...storedRelation, sorter: 9, subGroup: null })
    await cellEdit

    expect(cachedRelation(store)).toEqual(expect.objectContaining({ sorter: 9, subGroup: 'electrical' }))
  })

  it('takes the whole server row for a relation it created', async () => {
    const store = createStore()
    await store.dispatch(
      (api.endpoints as any).classificationStoreConfigurationKeyGroupRelationCollection.initiate(relationQueryArgs)
    )

    const created = store.dispatch(
      (api.endpoints as any).classificationStoreConfigurationKeyGroupRelationCreate.initiate({
        classificationStoreConfigurationKeyGroupRelationCreate: {
          keyId: 99,
          groupId: GROUP_ID,
          subGroup: 'electrical'
        }
      })
    )
    await flush()

    // A new relation has no older state to preserve, so the descriptive fields and the defaults
    // the server gave it are taken as they come.
    pendingUpserts[0]({
      keyId: 99,
      groupId: GROUP_ID,
      sorter: 12,
      mandatory: true,
      keyName: 'colour',
      keyDescription: 'Housing colour',
      groupName: 'Dimensions',
      subGroup: 'electrical'
    })
    await created

    const select = (api.endpoints as any).classificationStoreConfigurationKeyGroupRelationCollection
      .select(relationQueryArgs)
    const items = select(store.getState()).data?.items

    expect(items?.find((r: { keyId: number }) => r.keyId === 99)).toEqual(expect.objectContaining({
      sorter: 12,
      mandatory: true,
      keyName: 'colour',
      subGroup: 'electrical'
    }))
  })
})

/**
 * A store import posts its file outside RTK Query, so the editor invalidates the tag by hand.
 * The four tab collections provide it, which is what makes the applied configuration show up
 * without the store being closed and reopened.
 */
describe('invalidating the classification store tag', () => {
  const originalFetch = globalThis.fetch

  const collectionEndpoints = [
    'classificationStoreConfigurationKeyCollection',
    'classificationStoreConfigurationGroupCollection',
    'classificationStoreConfigurationCollectionCollection',
    'classificationStoreConfigurationSubGroupCollection'
  ]

  const requestedUrls = (): string[] => (globalThis.fetch as jest.Mock).mock.calls.map(([request]) => request.url)

  beforeEach(() => {
    globalThis.fetch = jest.fn(async () => new Response(JSON.stringify({ items: [], totalItems: 0 }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })) as unknown as typeof fetch
  })

  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  it('refetches the keys, groups, collections and sub groups of the store', async () => {
    const store = createStore()

    for (const endpointName of collectionEndpoints) {
      await store.dispatch((api.endpoints as any)[endpointName].initiate(queryArgs))
    }

    const before = requestedUrls()

    expect(before).toHaveLength(collectionEndpoints.length)

    store.dispatch(api.util.invalidateTags(['Classification Store']))
    await waitFor(() => { expect(requestedUrls()).toHaveLength(before.length * 2) })

    const after = requestedUrls()


    before.forEach((url) => { expect(after.filter((requested) => requested === url)).toHaveLength(2) })
  })
})
