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
 * The key update patches the cached key while the request is pending, but only with the fields
 * it actually names: a title the payload does not carry must not blank the cached title for the
 * length of the request, while one carried as null is a clear and shows at once.
 *
 * The confirmation is where the two writers of a key row meet. The grid's cells and the key
 * definition dialog write disjoint fields of the same row, and two requests can reach the server
 * in either order, so a whole-row replacement reverts whichever of them answered first. But the
 * cached value may only be kept where one of this client's own writes overlapped the request: a
 * field nobody here was writing has no local writer at all, and there the response is canonical
 * — another user's exclusion of the key arrives in it and has to be taken, not discarded.
 */

import { configureStore } from '@reduxjs/toolkit'
import { waitFor } from '@testing-library/react'
import {
  api,
  type ClassificationStoreKeyDefinition
} from './classification-store-api-slice-enhanced'

/**
 * A definition blob is a whole field definition, and the exported type has to be able to express
 * one. This literal is the shape every caller writes; typed, it is rejected at build time by a
 * `ClassificationStoreKeyDefinition` that names only `indexed`, which is what `tsc --noEmit`
 * catches here — @swc/jest strips types, so this assertion is the type check's, not jest's.
 */
const typedDefinition: ClassificationStoreKeyDefinition = {
  name: 'weight',
  fieldtype: 'input',
  title: 'Weight',
  indexed: true
}

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
  definition: typedDefinition,
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
  /** One resolver per update request, in the order the requests were made. */
  let pendingUpdates: Array<(key: Record<string, unknown>) => void>

  beforeEach(() => {
    pendingUpdates = []

    globalThis.fetch = jest.fn(async (input: Request) => {
      if (input.url.endsWith(KEYS_URL)) {
        return new Response(JSON.stringify({ items: [storedKey], totalItems: 1 }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        })
      }

      // Every update answer is held back, so the optimistic window can be asserted and the
      // test decides the order the answers land in.
      return await new Promise<Response>((resolve) => {
        pendingUpdates.push((key) => {
          resolve(new Response(JSON.stringify(key), {
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

  const subscribeToKeys = async (store: ReturnType<typeof createStore>): Promise<void> => {
    await store.dispatch((api.endpoints as any).classificationStoreConfigurationKeyCollection.initiate(queryArgs))
    expect(cachedKey(store)).toEqual(expect.objectContaining({ title: 'Weight' }))
  }

  /** The payload as a writer sends it: `name`, `type` and `definition` always, the rest named or not. */
  const updateKey = async (
    store: ReturnType<typeof createStore>,
    payload: Record<string, unknown>
  ): Promise<unknown> =>
    await store.dispatch((api.endpoints as any).classificationStoreConfigurationKeyUpdate.initiate({
      id: KEY_ID,
      classificationStoreConfigurationKeyUpdate: {
        name: storedKey.name,
        type: null,
        definition: null,
        ...payload
      }
    }))

  it('keeps the cached title while an update that does not name it is pending', async () => {
    const store = createStore()
    await subscribeToKeys(store)

    const pending = updateKey(store, { description: 'Shipping' })
    await flush()

    expect(cachedKey(store)).toEqual(expect.objectContaining({ title: 'Weight' }))

    pendingUpdates[0]({ ...storedKey, description: 'Shipping' })
    await pending

    expect(cachedKey(store)).toEqual(expect.objectContaining({ title: 'Weight', description: 'Shipping' }))
  })

  it('blanks the cached title while an update that clears it is pending', async () => {
    const store = createStore()
    await subscribeToKeys(store)

    const pending = updateKey(store, { title: null })
    await flush()

    expect(cachedKey(store)).toEqual(expect.objectContaining({ title: null }))

    pendingUpdates[0]({ ...storedKey, title: null })
    await pending

    expect(cachedKey(store)).toEqual(expect.objectContaining({ title: null }))
  })

  it('shows a new title while the update is still pending', async () => {
    const store = createStore()
    await subscribeToKeys(store)

    const pending = updateKey(store, { title: 'Shipping weight' })
    await flush()

    expect(cachedKey(store)).toEqual(expect.objectContaining({ title: 'Shipping weight' }))

    pendingUpdates[0]({ ...storedKey, title: 'Shipping weight' })
    await pending
  })

  it('takes the server definition when no local write overlapped the request', async () => {
    const store = createStore()
    await subscribeToKeys(store)

    // Another user excluded the key from the index while this page sat on a cached row that
    // still says indexed. A description-only edit is the only request this client has in flight,
    // so its answer is the canonical state of every field it did not name.
    const excluded = { ...storedKey.definition, indexed: false }
    const cellEdit = updateKey(store, { description: 'Shipping' })
    await flush()

    pendingUpdates[0]({ ...storedKey, description: 'Shipping', definition: excluded })
    await cellEdit

    expect(cachedKey(store)).toEqual(expect.objectContaining({
      description: 'Shipping',
      definition: excluded
    }))
  })

  it('takes a server title nobody here was editing', async () => {
    const store = createStore()
    await subscribeToKeys(store)

    // The same rule for the fields the grid writes: a definition save names no title, so a title
    // changed elsewhere since the page loaded comes back in its answer and stands.
    const dialogSave = updateKey(store, { definition: { ...storedKey.definition, indexed: false } })
    await flush()

    pendingUpdates[0]({
      ...storedKey,
      title: 'Gross weight',
      definition: { ...storedKey.definition, indexed: false }
    })
    await dialogSave

    expect(cachedKey(store)).toEqual(expect.objectContaining({ title: 'Gross weight' }))
  })

  it('keeps a saved definition when an older cell edit answers last', async () => {
    const store = createStore()
    await subscribeToKeys(store)

    // A title cell edit goes out first and names no definition at all.
    const cellEdit = updateKey(store, { title: 'Shipping weight' })
    await flush()
    // The key definition dialog saves while it is still in flight, and names no title.
    const dialogSave = updateKey(store, { definition: { ...storedKey.definition, indexed: false } })
    await flush()

    expect(pendingUpdates).toHaveLength(2)

    // The server applied the title first, then the definition: its answer to the dialog carries
    // both, its answer to the cell edit carries the definition as it was before.
    pendingUpdates[1]({ ...storedKey, title: 'Shipping weight', definition: { ...storedKey.definition, indexed: false } })
    await dialogSave
    expect(cachedKey(store)).toEqual(expect.objectContaining({
      title: 'Shipping weight',
      definition: { ...storedKey.definition, indexed: false }
    }))

    pendingUpdates[0]({ ...storedKey, title: 'Shipping weight' })
    await cellEdit

    // The cell edit confirms its own title and leaves the definition it never named alone.
    expect(cachedKey(store)).toEqual(expect.objectContaining({
      title: 'Shipping weight',
      definition: { ...storedKey.definition, indexed: false }
    }))
  })

  it('keeps a cell edit when an older definition save answers last', async () => {
    const store = createStore()
    await subscribeToKeys(store)

    const dialogSave = updateKey(store, { definition: { ...storedKey.definition, indexed: false } })
    await flush()
    const cellEdit = updateKey(store, { description: 'the shipping weight' })
    await flush()

    pendingUpdates[1]({
      ...storedKey,
      description: 'the shipping weight',
      definition: { ...storedKey.definition, indexed: false }
    })
    await cellEdit

    pendingUpdates[0]({ ...storedKey, definition: { ...storedKey.definition, indexed: false } })
    await dialogSave

    expect(cachedKey(store)).toEqual(expect.objectContaining({
      description: 'the shipping weight',
      definition: { ...storedKey.definition, indexed: false }
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
