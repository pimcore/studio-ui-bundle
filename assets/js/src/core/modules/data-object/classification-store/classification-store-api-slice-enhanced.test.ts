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
 *
 * The key's localization is written by the dialog alone and carries the same three states as the
 * rest of the payload, with one difference: a present null is a value there, not an absence, so
 * it clears the stored flag where an absent member leaves it alone.
 */

import { configureStore } from '@reduxjs/toolkit'
import { waitFor } from '@testing-library/react'
import {
  api,
  type ClassificationStoreConfigurationKeyUpdate,
  type ClassificationStoreKeyDefinition,
  type ClassificationStoreMultiValueEntry
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

/**
 * A real object-data payload for a multiValue key, typed against the shadow: the generated client
 * types it as `object`, so a drift of the shadow from the payload is caught by `tsc --noEmit` here.
 */
const typedMultiValuePayload: Record<string, Record<string, Record<number, ClassificationStoreMultiValueEntry[]>>> = {
  4: { de: { 11: [{ value: { value: 30, unit: 'cm' }, variant: 'metric' }, { value: { value: 1, unit: 'ft' }, position: 1 }] } }
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
  modificationDate: null,
  localized: true
}

/** A definition blob only the key definition dialog writes; every cell edit leaves it alone. */
const DEFINITION = { fieldtype: 'input', title: 'Weight' }

const OTHER_KEY_ID = 9

/**
 * A second key of the same page. A collection answer carries every row it holds, so a read in
 * flight is the last word on keys it was never taken for as much as on the one it was.
 */
const otherKey = {
  ...storedKey,
  id: OTHER_KEY_ID,
  name: 'diameter',
  title: 'Diameter',
  definition: { ...typedDefinition, name: 'diameter', title: 'Diameter' }
}

const queryArgs = { storeId: STORE_ID, body: { filters: { page: 1, pageSize: 10 } } }

/**
 * A second read of the same rows under different arguments — another consumer of the collection
 * asking for a larger page. It has its own cache entry, holding its own answer, and a read of the
 * entry above has nothing to say about what is in it.
 */
const otherQueryArgs = { storeId: STORE_ID, body: { filters: { page: 1, pageSize: 20 } } }

/** A second page of the same store, which does not carry the key the saves below are made on. */
const secondPageArgs = { storeId: STORE_ID, body: { filters: { page: 2, pageSize: 10 } } }

/**
 * A second store, open in another editor of the same session. Its key collection is a different
 * endpoint argument, a different cache entry and a different URL, and no key of this store can
 * appear on its pages — `storeId` is a member of the key itself.
 */
const OTHER_STORE_ID = 2
const OTHER_STORE_KEYS_URL =
  `/pimcore-studio/api/classification-store/configuration/stores/${OTHER_STORE_ID}/keys`
const otherStoreQueryArgs = { storeId: OTHER_STORE_ID, body: { filters: { page: 1, pageSize: 10 } } }

const otherStoreKey = {
  ...storedKey,
  id: 11,
  name: 'voltage',
  storeId: OTHER_STORE_ID,
  title: 'Voltage',
  definition: { ...typedDefinition, name: 'voltage', title: 'Voltage' }
}

const createStore = (): ReturnType<typeof configureStore> => configureStore({
  reducer: { [api.reducerPath]: api.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})

const cachedKeysOf = (
  store: ReturnType<typeof createStore>,
  args: unknown
): Array<Record<string, unknown>> => {
  const select = (api.endpoints as any).classificationStoreConfigurationKeyCollection.select(args)
  return select(store.getState()).data?.items ?? []
}

const cachedKeys = (store: ReturnType<typeof createStore>): Array<Record<string, unknown>> =>
  cachedKeysOf(store, queryArgs)

const cachedKey = (store: ReturnType<typeof createStore>): Record<string, unknown> | undefined =>
  cachedKeys(store)[0]

const cachedKeyById = (
  store: ReturnType<typeof createStore>,
  id: number
): Record<string, unknown> | undefined => cachedKeys(store).find((key) => key.id === id)

const flush = async (): Promise<void> => { await new Promise((resolve) => setTimeout(resolve, 0)) }

/**
 * Answers one held-back request: with the row it carries, or — given a failure status — with the
 * rejection that makes the slice roll its optimistic patch back.
 */
type Responder = (payload: Record<string, unknown>, status?: number) => void

describe('multiValue entry shadow', () => {
  it('names the members of one entry of the value of a multiValue key, in the slot it is stored under', () => {
    const [capped, positioned] = typedMultiValuePayload[4].de[11]

    expect(capped).toEqual({ value: { value: 30, unit: 'cm' }, variant: 'metric' })
    expect(positioned.position).toBe(1)
    expect('language' in capped).toBe(false)
  })
})

describe('classification store key update cache patch', () => {
  const originalFetch = globalThis.fetch
  let respondToUpdate: Responder
  /** The update requests the slice sent, so what reaches the wire can be asserted. */
  let updateRequests: Array<{ url: string, body: Record<string, unknown> }>
  /** One resolver per update request, in the order the requests were made. */
  let pendingUpdates: Responder[]
  /**
   * The page as the server holds it, which a test can move: it is what another user's change looks
   * like from here, and what a re-read of the collection answers with.
   */
  let serverKeys: Array<Record<string, unknown>>
  /** How often the collection was read, so a re-read can be told from the first load. */
  let keyCollectionReads: number
  /**
   * The filters every collection read asked for, in order. Two cache entries of one store share a
   * URL and differ only in the body, so this is what says WHICH entry a corrective re-read was
   * ordered for — the one thing a bare count cannot tell.
   */
  let keyCollectionFilters: Array<Record<string, unknown>>
  /** The same, for the second store: its own counter, its own held answers. */
  let otherStoreReads: number
  let otherStoreServerKeys: Array<Record<string, unknown>>
  let pendingOtherStoreReads: Array<(rows: Array<Record<string, unknown>>) => void>
  /**
   * Set by a test that needs the collection's answer held back: a read is a snapshot in flight
   * too, and only a held one can be made to land after an update it predates has confirmed. Each
   * responder answers with the rows it is given — the page as the server held it when the read
   * was taken.
   */
  let holdKeyCollectionReads: boolean
  let pendingKeyCollectionReads: Array<(rows: Array<Record<string, unknown>>) => void>

  beforeEach(() => {
    updateRequests = []
    pendingUpdates = []
    serverKeys = [storedKey]
    keyCollectionReads = 0
    keyCollectionFilters = []
    holdKeyCollectionReads = false
    pendingKeyCollectionReads = []
    otherStoreReads = 0
    otherStoreServerKeys = [otherStoreKey]
    pendingOtherStoreReads = []

    const page = (rows: Array<Record<string, unknown>>): Response =>
      new Response(JSON.stringify({ items: rows, totalItems: rows.length }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })

    globalThis.fetch = jest.fn(async (input: Request) => {
      if (input.url.endsWith(OTHER_STORE_KEYS_URL)) {
        otherStoreReads += 1
        if (!holdKeyCollectionReads) return page(otherStoreServerKeys)

        return await new Promise<Response>((resolve) => {
          pendingOtherStoreReads.push((rows) => { resolve(page(rows)) })
        })
      }

      if (input.url.endsWith(KEYS_URL)) {
        keyCollectionReads += 1
        const body = JSON.parse(await input.clone().text()) as { filters?: Record<string, unknown> }
        keyCollectionFilters.push(body.filters ?? {})

        if (!holdKeyCollectionReads) return page(serverKeys)

        return await new Promise<Response>((resolve) => {
          pendingKeyCollectionReads.push((rows) => { resolve(page(rows)) })
        })
      }

      updateRequests.push({ url: input.url, body: JSON.parse(await input.clone().text()) })

      // Every update answer is held back, so the optimistic window can be asserted and the
      // test decides the order the answers land in.
      return await new Promise<Response>((resolve) => {
        respondToUpdate = (key, status = 200) => {
          resolve(new Response(JSON.stringify(key), {
            status,
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

  /**
   * The payload as a writer sends it: `name`, `type` and `definition` always, the rest named or
   * not. Typed on purpose: it only compiles while the hand-written `definition` and `localized`
   * shadows exist.
   */
  const keyUpdate = (
    payload: Partial<ClassificationStoreConfigurationKeyUpdate>
  ): ClassificationStoreConfigurationKeyUpdate => ({
    name: storedKey.name,
    type: null,
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

  const updateKey = async (
    store: ReturnType<typeof createStore>,
    payload: Partial<ClassificationStoreConfigurationKeyUpdate>
  ): Promise<unknown> =>
    await dispatchUpdate(store, keyUpdate(payload))

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

  it('re-reads the key when two overlapping edits both leave the definition untouched', async () => {
    const store = createStore()
    await subscribeToKeys(store)
    expect(keyCollectionReads).toBe(1)

    const excluded = { ...storedKey.definition, indexed: false }

    // Two cell edits overlap and neither of them names the definition, so the definition has no
    // local writer at all and both answers are canonical for it.
    const titleEdit = updateKey(store, { title: 'Shipping weight' })
    await flush()
    const descriptionEdit = updateKey(store, { description: 'Shipping' })
    await flush()

    expect(pendingUpdates).toHaveLength(2)

    // The server applied the title first, another user then excluded the key, and the description
    // edit was applied after that. So the answer to the description edit carries the exclusion,
    // and the answer to the older title edit carries the definition as it stood before it.
    serverKeys = [{ ...storedKey, title: 'Shipping weight', description: 'Shipping', definition: excluded }]

    pendingUpdates[1]({ ...storedKey, title: 'Shipping weight', description: 'Shipping', definition: excluded })
    await descriptionEdit

    pendingUpdates[0]({ ...storedKey, title: 'Shipping weight', definition: storedKey.definition })
    await titleEdit

    // Arrival order would leave the stale flag in the cache, where reopening the dialog shows the
    // key as indexed and an untouched save writes the exclusion away. The key is re-read instead,
    // so the cache ends on what the server holds.
    await waitFor(() => { expect(keyCollectionReads).toBe(2) })
    await waitFor(() => {
      expect(cachedKey(store)).toEqual(expect.objectContaining({
        title: 'Shipping weight',
        description: 'Shipping',
        definition: excluded
      }))
    })
  })

  it('does not re-read the key after a save that overlapped nothing', async () => {
    const store = createStore()
    await subscribeToKeys(store)
    expect(keyCollectionReads).toBe(1)

    const dialogSave = updateKey(store, { definition: { ...storedKey.definition, indexed: false } })
    await flush()

    pendingUpdates[0]({ ...storedKey, definition: { ...storedKey.definition, indexed: false } })
    await dialogSave
    await flush()

    // The ordinary save is one request: the re-read is the price of an overlap, not of every save.
    expect(keyCollectionReads).toBe(1)
  })

  /**
   * A read of the collection is a snapshot in flight too, and its answer replaces the whole cached
   * page. So a read dispatched before a save and answered after it writes the page back as it
   * stood before the save, and the write ledger cannot see it: a save overlapping only a read
   * overlapped no write, so it schedules no corrective re-read and the dialog reopens on the stale
   * flag. The fields the save named are written back over the answer instead.
   */
  const holdOneCollectionRead = async (store: ReturnType<typeof createStore>): Promise<void> => {
    holdKeyCollectionReads = true
    void store.dispatch((api.endpoints as any).classificationStoreConfigurationKeyCollection.initiate(
      queryArgs,
      { subscribe: false, forceRefetch: true }
    ))
    await flush()
    expect(pendingKeyCollectionReads).toHaveLength(1)
  }

  it('keeps a definition saved while a collection read it predates was in flight', async () => {
    const store = createStore()
    await subscribeToKeys(store)

    // A re-read of the page goes out: the corrective one the ledger schedules, a page change or a
    // tag invalidation — the same read either way — and is held before it answers.
    await holdOneCollectionRead(store)

    // The dialog excludes the key from the index while that read is in flight, and is confirmed.
    const excluded = { ...typedDefinition, indexed: false }
    const dialogSave = updateKey(store, { definition: excluded })
    await flush()
    pendingUpdates[0]({ ...storedKey, definition: excluded })
    await dialogSave

    expect(cachedKey(store)).toEqual(expect.objectContaining({ definition: excluded }))

    // The read answers last, with the page as the server held it when the read was taken: the key
    // still indexed, and a title another user had changed in the meantime.
    pendingKeyCollectionReads[0]([{ ...storedKey, title: 'Gross weight', definition: typedDefinition }])

    await waitFor(() => {
      expect(cachedKey(store)).toEqual(expect.objectContaining({
        // the read landed — it is the authority on every field nobody here was writing ...
        title: 'Gross weight',
        // ... and not on the exclusion this client saved after it was taken
        definition: excluded
      }))
    })
  })

  it('keeps a definition saved on another key of the page while a collection read was in flight', async () => {
    const store = createStore()
    serverKeys = [storedKey, otherKey]
    await subscribeToKeys(store)

    await holdOneCollectionRead(store)

    // The exclusion is saved on the other key of the page — the read was not taken for it, and
    // replaces its row all the same.
    const excluded = { ...otherKey.definition, indexed: false }
    const dialogSave = store.dispatch((api.endpoints as any).classificationStoreConfigurationKeyUpdate.initiate({
      id: OTHER_KEY_ID,
      classificationStoreConfigurationKeyUpdate: keyUpdate({ name: otherKey.name, definition: excluded })
    }))
    await flush()
    pendingUpdates[0]({ ...otherKey, definition: excluded })
    await dialogSave

    expect(cachedKeyById(store, OTHER_KEY_ID)).toEqual(expect.objectContaining({ definition: excluded }))

    pendingKeyCollectionReads[0]([
      storedKey,
      { ...otherKey, title: 'Outer diameter', definition: otherKey.definition }
    ])

    await waitFor(() => {
      expect(cachedKeyById(store, OTHER_KEY_ID)).toEqual(expect.objectContaining({
        title: 'Outer diameter',
        definition: excluded
      }))
    })
  })

  /**
   * The replay belongs to the one cache entry the read answered. Replayed into every cached entry
   * it reaches entries that hold a different, later read's answer, and overwrites that answer with
   * a confirmation taken from before it.
   */
  it('replays a confirmation into the entry its read answered and not into a differently keyed one', async () => {
    const store = createStore()
    await subscribeToKeys(store)
    // A second consumer of the same rows, with its own cache entry.
    await store.dispatch((api.endpoints as any).classificationStoreConfigurationKeyCollection.initiate(otherQueryArgs))
    expect(cachedKeysOf(store, otherQueryArgs)[0]).toEqual(
      expect.objectContaining({ definition: typedDefinition })
    )

    // Every collection read from here on is held, so the test decides the order they land in.
    await holdOneCollectionRead(store)

    // The dialog excludes the key while that read is in flight, and is confirmed.
    const excluded = { ...typedDefinition, indexed: false }
    const dialogSave = updateKey(store, { definition: excluded })
    await flush()
    pendingUpdates[0]({ ...storedKey, definition: excluded })
    await dialogSave

    // Another user re-enables the key. The second entry is re-read after that confirmation, under
    // its own arguments, and answers with the newer state.
    void store.dispatch((api.endpoints as any).classificationStoreConfigurationKeyCollection.initiate(
      otherQueryArgs,
      { subscribe: false, forceRefetch: true }
    ))
    await flush()
    expect(pendingKeyCollectionReads).toHaveLength(2)
    pendingKeyCollectionReads[1]([{ ...storedKey, title: 'Gross weight', definition: typedDefinition }])
    await waitFor(() => {
      expect(cachedKeysOf(store, otherQueryArgs)[0]).toEqual(
        expect.objectContaining({ title: 'Gross weight' })
      )
    })

    // The first read answers last, with the page as it stood before the save.
    pendingKeyCollectionReads[0]([{ ...storedKey, definition: typedDefinition }])

    // Its own entry takes the replay — the save it predates has to survive it ...
    await waitFor(() => { expect(cachedKey(store)).toEqual(expect.objectContaining({ definition: excluded })) })
    // ... and the entry it never answered keeps the newer answer that was fetched into it.
    expect(cachedKeysOf(store, otherQueryArgs)[0]).toEqual(
      expect.objectContaining({ title: 'Gross weight', definition: typedDefinition })
    )
  })

  /**
   * Which of the two is newer is not knowable from here: the server evaluates the read at a moment
   * this client cannot see, and that moment can be after it applied the update and after another
   * user changed the same field back. So the replay is not the last word — the collection is
   * re-read, and the cache ends on what the server holds.
   */
  it('re-reads the collection after a save confirmed inside a collection read', async () => {
    const store = createStore()
    await subscribeToKeys(store)
    expect(keyCollectionReads).toBe(1)

    await holdOneCollectionRead(store)
    expect(keyCollectionReads).toBe(2)

    const excluded = { ...typedDefinition, indexed: false }
    const dialogSave = updateKey(store, { definition: excluded })
    await flush()
    pendingUpdates[0]({ ...storedKey, definition: excluded })
    await dialogSave

    // The server applied the exclusion, another user then re-enabled the key, and the held read
    // was evaluated after both — so its snapshot is the newer of the two statements, and neither
    // response says so.
    const serverRow = { ...storedKey, definition: typedDefinition }
    serverKeys = [serverRow]
    pendingKeyCollectionReads[0]([serverRow])

    // The replay goes in first, so the dialog and the grid never flicker back to the pre-save
    // value ...
    await waitFor(() => { expect(cachedKey(store)).toEqual(expect.objectContaining({ definition: excluded })) })

    // ... and the corrective read follows and puts the question to the server.
    await waitFor(() => { expect(keyCollectionReads).toBe(3) })
    pendingKeyCollectionReads[1]([serverRow])

    await waitFor(() => {
      expect(cachedKey(store)).toEqual(expect.objectContaining({ definition: typedDefinition }))
    })

    // The corrective read confirmed nothing of this client's, so it replays nothing and re-reads
    // nothing: the sequence is bounded by the writes that feed it.
    await flush()
    expect(keyCollectionReads).toBe(3)
  })

  /**
   * What a read is owed is bounded by what it can have overwritten, and the three tests below are
   * the three bounds. A save is one row of one store; the read ledger holds every read of every
   * store in the session, and a read that could not have been carrying the row has no conflict of
   * statements on it to resolve and nothing to ask the server about.
   */
  const holdCollectionReadOf = async (
    store: ReturnType<typeof createStore>,
    args: unknown
  ): Promise<void> => {
    holdKeyCollectionReads = true
    void store.dispatch((api.endpoints as any).classificationStoreConfigurationKeyCollection.initiate(
      args,
      { subscribe: false, forceRefetch: true }
    ))
    await flush()
  }

  it('leaves a collection read of another store out of a save it cannot be overwriting', async () => {
    const store = createStore()
    await subscribeToKeys(store)
    // A second editor, open on another store, with its own cache entry and its own URL.
    await store.dispatch((api.endpoints as any).classificationStoreConfigurationKeyCollection.initiate(
      otherStoreQueryArgs
    ))
    expect(otherStoreReads).toBe(1)

    // Its read is in flight when the dialog's save on a key of the FIRST store confirms.
    await holdCollectionReadOf(store, otherStoreQueryArgs)
    expect(otherStoreReads).toBe(2)

    const excluded = { ...typedDefinition, indexed: false }
    const dialogSave = updateKey(store, { definition: excluded })
    await flush()
    pendingUpdates[0]({ ...storedKey, definition: excluded })
    await dialogSave

    // It answers with the other store's page, which cannot carry the saved key: `storeId` is a
    // member of the key, so the row is in exactly one store's collection.
    pendingOtherStoreReads[0]([otherStoreKey])
    await waitFor(() => {
      expect(cachedKeysOf(store, otherStoreQueryArgs)[0]).toEqual(
        expect.objectContaining({ id: otherStoreKey.id })
      )
    })
    await flush()

    // So nothing of the save was recorded against it, and it orders no corrective re-read —
    // neither of its own store nor of the one that was saved. A save in one store costs nothing
    // in any other store open in the session.
    expect(otherStoreReads).toBe(2)
    expect(keyCollectionReads).toBe(1)
    expect(cachedKey(store)).toEqual(expect.objectContaining({ definition: excluded }))
  })

  it('re-reads the entry of the read that could not decide and no other cached page', async () => {
    const store = createStore()
    await subscribeToKeys(store)
    await store.dispatch((api.endpoints as any).classificationStoreConfigurationKeyCollection.initiate(
      otherQueryArgs
    ))
    expect(keyCollectionReads).toBe(2)

    // Two entries of the same store read at once, to be answered out of order — the staggered
    // responses that made this multiply.
    await holdCollectionReadOf(store, queryArgs)
    await holdCollectionReadOf(store, otherQueryArgs)
    expect(pendingKeyCollectionReads).toHaveLength(2)

    const excluded = { ...typedDefinition, indexed: false }
    const dialogSave = updateKey(store, { definition: excluded })
    await flush()
    pendingUpdates[0]({ ...storedKey, definition: excluded })
    await dialogSave

    // The first read answers with the page as it stood before the save. It replays the save back
    // over its own answer and orders one corrective re-read, under its own arguments.
    pendingKeyCollectionReads[0]([{ ...storedKey, definition: typedDefinition }])
    await waitFor(() => { expect(pendingKeyCollectionReads).toHaveLength(3) })
    expect(keyCollectionFilters[4]).toEqual(queryArgs.body.filters)

    // That corrective read answers. No write of this client's was confirmed inside it, so it
    // records nothing and the sequence stops there.
    pendingKeyCollectionReads[2]([{ ...storedKey, definition: excluded }])
    await flush()
    expect(pendingKeyCollectionReads).toHaveLength(3)

    // Now the second read answers, and re-reads its own entry.
    pendingKeyCollectionReads[1]([{ ...storedKey, definition: typedDefinition }])
    await waitFor(() => { expect(pendingKeyCollectionReads).toHaveLength(4) })
    await flush()

    // Six reads for two entries: each was loaded, read again, and corrected once. The first
    // entry's corrective read is NOT launched a second time by the second read settling — which
    // is what re-reading every cached page per settlement did, at n² requests for n reads in
    // flight, re-running reads that had already answered.
    expect(keyCollectionFilters).toEqual([
      queryArgs.body.filters,
      otherQueryArgs.body.filters,
      queryArgs.body.filters,
      otherQueryArgs.body.filters,
      queryArgs.body.filters,
      otherQueryArgs.body.filters
    ])
  })

  it('orders no re-read for a read whose page does not carry the saved key', async () => {
    const store = createStore()
    await subscribeToKeys(store)

    // The second page of the same store is read, and the save lands on a key of the first page
    // while that read is in flight.
    await holdCollectionReadOf(store, secondPageArgs)
    expect(keyCollectionReads).toBe(2)

    const excluded = { ...typedDefinition, indexed: false }
    const dialogSave = updateKey(store, { definition: excluded })
    await flush()
    pendingUpdates[0]({ ...storedKey, definition: excluded })
    await dialogSave

    // Whether the page carries the key is unknowable while the read is in flight, so the
    // confirmation is recorded against it — and knowable once it answers.
    pendingKeyCollectionReads[0]([otherKey])
    await waitFor(() => {
      expect(cachedKeysOf(store, secondPageArgs)[0]).toEqual(
        expect.objectContaining({ id: OTHER_KEY_ID })
      )
    })
    await flush()

    // It answered without the saved row, so the replay wrote nothing, nothing of the save was
    // overwritten, and no page is re-read.
    expect(keyCollectionReads).toBe(2)
    expect(cachedKey(store)).toEqual(expect.objectContaining({ definition: excluded }))
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

  it('keeps a definition blob the dialog saved when an older cell edit answers last', async () => {
    // The same pair of writers as above, with the blob the dialog sends rather than a flag in it.
    const store = createStore()
    await subscribeToKeys(store)

    // A title edit goes out first; its null definition means "leave the stored one alone".
    const cellEdit = dispatchUpdate(store, keyUpdate({ title: 'Shipping weight' }))
    await flush()
    // The dialog's definition save follows while the cell edit is still in flight.
    const dialogSave = dispatchUpdate(store, keyUpdate({ definition: DEFINITION }))
    await flush()

    expect(pendingUpdates).toHaveLength(2)

    pendingUpdates[1]({ ...storedKey, title: 'Shipping weight', definition: DEFINITION })
    await dialogSave

    expect(cachedKey(store)).toEqual(expect.objectContaining({ definition: DEFINITION }))

    // The cell edit answers last, carrying the definition as it was before the dialog's save.
    pendingUpdates[0]({ ...storedKey, title: 'Shipping weight' })
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

  it('keeps saved custom metadata when an older cell edit answers last', async () => {
    const store = createStore()
    await subscribeToKeys(store)

    const cellEdit = dispatchUpdate(store, keyUpdate({ title: 'Shipping weight' }))
    await flush()
    const metadataSave = dispatchUpdate(store, keyUpdate({ customMetadata: { externalCode: 'EF1' } }))
    await flush()

    expect(pendingUpdates).toHaveLength(2)

    pendingUpdates[1]({ ...storedKey, title: 'Shipping weight', customMetadata: { externalCode: 'EF1' } })
    await metadataSave

    // The cell edit answers last, carrying the pairs as they were before the metadata save.
    pendingUpdates[0]({ ...storedKey, title: 'Shipping weight', customMetadata: null })
    await cellEdit

    expect(cachedKey(store)).toEqual(expect.objectContaining({ customMetadata: { externalCode: 'EF1' } }))
  })

  it('takes the answer for custom metadata when the payload names it as null', async () => {
    const store = createStore()
    await subscribeToKeys(store)

    const cellEdit = dispatchUpdate(store, keyUpdate({ title: 'Shipping weight' }))
    await flush()
    const clear = dispatchUpdate(store, keyUpdate({ customMetadata: null }))
    await flush()

    pendingUpdates[1]({ ...storedKey, customMetadata: null })
    await clear
    pendingUpdates[0]({ ...storedKey, title: 'Shipping weight', customMetadata: { stale: 'x' } })
    await cellEdit

    expect(cachedKey(store)).toEqual(expect.objectContaining({ customMetadata: null }))
  })

  it('takes the answer for custom metadata nobody here was writing', async () => {
    const store = createStore()
    await subscribeToKeys(store)

    const cellEdit = dispatchUpdate(store, keyUpdate({ title: 'Shipping weight' }))
    await flush()

    // A payload that omits the member does not claim it, so another user's pairs arrive.
    pendingUpdates[0]({ ...storedKey, title: 'Shipping weight', customMetadata: { fromServer: '1' } })
    await cellEdit

    expect(cachedKey(store)).toEqual(expect.objectContaining({ customMetadata: { fromServer: '1' } }))
  })

  it('keeps a saved localization when an older cell edit fails after it', async () => {
    // The rollback is the other door into the same staleness the response mask closes, and the
    // mask cannot see it: a failed request may undo the members it wrote and no others, or it
    // takes a save the server has already accepted down with it.
    const store = createStore()
    await subscribeToKeys(store)

    // A title edit goes out first and carries no localized member at all.
    const cellEdit = dispatchUpdate(store, keyUpdate({ title: 'Shipping weight' }))
    await flush()
    // The dialog's save follows while the cell edit is still in flight, and succeeds.
    const dialogSave = dispatchUpdate(store, keyUpdate({ localized: false }))
    await flush()

    expect(pendingUpdates).toHaveLength(2)

    pendingUpdates[1]({ ...storedKey, title: 'Shipping weight', localized: false })
    await dialogSave

    expect(cachedKey(store)).toEqual(expect.objectContaining({ localized: false }))

    // The cell edit answers last and is rejected, so its optimistic title rolls back.
    pendingUpdates[0]({ message: 'Conflict' }, 409)
    await cellEdit

    expect(cachedKey(store)).toEqual(expect.objectContaining({
      // its own member is back as it was ...
      title: 'Weight',
      // ... and the flag the dialog saved in the meantime is untouched
      localized: false
    }))
  })

  it('keeps a saved definition when an older cell edit fails after it', async () => {
    const store = createStore()
    await subscribeToKeys(store)

    const cellEdit = dispatchUpdate(store, keyUpdate({ title: 'Shipping weight' }))
    await flush()
    const dialogSave = dispatchUpdate(store, keyUpdate({ definition: DEFINITION }))
    await flush()

    pendingUpdates[1]({ ...storedKey, definition: DEFINITION })
    await dialogSave

    expect(cachedKey(store)).toEqual(expect.objectContaining({ definition: DEFINITION }))

    pendingUpdates[0]({ message: 'Conflict' }, 409)
    await cellEdit

    expect(cachedKey(store)).toEqual(expect.objectContaining({
      title: 'Weight',
      definition: DEFINITION
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
  let pendingUpserts: Responder[]

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
        pendingUpserts.push((relation, status = 200) => {
          resolve(new Response(JSON.stringify(relation), {
            status,
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

  it('keeps an assigned sub group when an older cell edit fails after it', async () => {
    // The same two surfaces, reached through the rollback instead of through the response: a
    // failed upsert may undo the members it wrote and no others, or the field mask above is
    // taken apart from behind and the assignment the server kept disappears from the cache.
    const store = createStore()
    await store.dispatch(
      (api.endpoints as any).classificationStoreConfigurationKeyGroupRelationCollection.initiate(relationQueryArgs)
    )
    expect(cachedRelation(store)).toEqual(expect.objectContaining({ sorter: 3, subGroup: null }))

    const cellEdit = upsert(store, { sorter: 9 })
    await flush()
    const assignment = upsert(store, { subGroup: 'electrical' })
    await flush()

    expect(pendingUpserts).toHaveLength(2)

    pendingUpserts[1]({ ...storedRelation, sorter: 9, subGroup: 'electrical' })
    await assignment
    expect(cachedRelation(store)).toEqual(expect.objectContaining({ sorter: 9, subGroup: 'electrical' }))

    // The cell edit answers last and is rejected.
    pendingUpserts[0]({ message: 'Conflict' }, 409)
    await cellEdit

    // Its own sorter is back as it was, and the sub group it never named is still assigned.
    expect(cachedRelation(store)).toEqual(expect.objectContaining({ sorter: 3, subGroup: 'electrical' }))
  })

  it('patches a definition override while pending and takes the server value', async () => {
    const store = createStore()
    await store.dispatch(
      (api.endpoints as any).classificationStoreConfigurationKeyGroupRelationCollection.initiate(relationQueryArgs)
    )

    const save = upsert(store, { definitionOverride: { options: ['a'] } })
    await flush()
    expect(cachedRelation(store)).toEqual(expect.objectContaining({ definitionOverride: { options: ['a'] }, sorter: 3 }))

    pendingUpserts[0]({ ...storedRelation, definitionOverride: { options: ['a', 'b'] } })
    await save

    expect(cachedRelation(store)).toEqual(expect.objectContaining({ definitionOverride: { options: ['a', 'b'] } }))
  })

  it('does not insert a row for an override save into a cached page that did not hold it', async () => {
    const store = createStore()
    const page2Args = { groupId: GROUP_ID, body: { filters: { page: 2, pageSize: 10 } } }

    globalThis.fetch = jest.fn(async (input: Request) => {
      const body = JSON.parse(await input.clone().text())

      if (input.url.endsWith(RELATIONS_URL)) {
        const page = body?.filters?.page ?? 1

        return new Response(JSON.stringify(
          page === 1
            ? { items: [storedRelation], totalItems: 2 }
            : { items: [{ ...storedRelation, keyId: 77, keyName: 'colour' }], totalItems: 2 }
        ), { status: 200, headers: { 'Content-Type': 'application/json' } })
      }

      return await new Promise<Response>((resolve) => {
        pendingUpserts.push((relation) => {
          resolve(new Response(JSON.stringify(relation), { status: 200, headers: { 'Content-Type': 'application/json' } }))
        })
      })
    }) as unknown as typeof fetch

    const collection = (api.endpoints as any).classificationStoreConfigurationKeyGroupRelationCollection
    await store.dispatch(collection.initiate(relationQueryArgs))
    await store.dispatch(collection.initiate(page2Args))

    const save = upsert(store, { definitionOverride: { options: ['a'] } })
    await flush()

    const page2 = (): any => collection.select(page2Args)(store.getState()).data

    expect(page2().items).toHaveLength(1)
    expect(page2().totalItems).toBe(2)

    pendingUpserts[0]({ ...storedRelation, definitionOverride: { options: ['a'] } })
    await save

    expect(page2().items).toEqual([expect.objectContaining({ keyId: 77 })])
    expect(page2().totalItems).toBe(2)
    expect(cachedRelation(store)).toEqual(expect.objectContaining({ definitionOverride: { options: ['a'] } }))
  })

  it('patches a clearing null as null and rolls a failed override save back', async () => {
    const store = createStore()
    await store.dispatch(
      (api.endpoints as any).classificationStoreConfigurationKeyGroupRelationCollection.initiate(relationQueryArgs)
    )

    const clear = upsert(store, { definitionOverride: null })
    await flush()
    expect(cachedRelation(store)).toEqual(expect.objectContaining({ definitionOverride: null }))
    pendingUpserts[0]({ message: 'Conflict' }, 409)
    await clear

    expect(cachedRelation(store)?.definitionOverride).toBeUndefined()
  })

  it('keeps both an override save and an older cell edit', async () => {
    const store = createStore()
    await store.dispatch(
      (api.endpoints as any).classificationStoreConfigurationKeyGroupRelationCollection.initiate(relationQueryArgs)
    )

    const cellEdit = upsert(store, { sorter: 9 })
    await flush()
    const override = upsert(store, { definitionOverride: { defaultUnit: 'kg' } })
    await flush()

    pendingUpserts[1]({ ...storedRelation, sorter: 9, definitionOverride: { defaultUnit: 'kg' } })
    await override
    pendingUpserts[0]({ ...storedRelation, sorter: 9, definitionOverride: null })
    await cellEdit

    expect(cachedRelation(store)).toEqual(
      expect.objectContaining({ sorter: 9, definitionOverride: { defaultUnit: 'kg' } })
    )
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

/**
 * A key delete disables the key, so it leaves the Active view and arrives in the Deleted view.
 * The cached entries of the two views sit on the same endpoint and differ only in the body.
 */
describe('classification store key delete cache patch', () => {
  const originalFetch = globalThis.fetch

  const deletedViewArgs = { storeId: STORE_ID, body: { filters: { page: 1, pageSize: 10 }, disabledOnly: true } }

  beforeEach(() => {
    globalThis.fetch = jest.fn(async (input: Request) => {
      if (input.method === 'DELETE') {
        return new Response('null', { status: 200, headers: { 'Content-Type': 'application/json' } })
      }

      return new Response(JSON.stringify({ items: [storedKey], totalItems: 1 }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
    }) as unknown as typeof fetch
  })

  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  it('drops the row and the total from the Active entry only', async () => {
    const store = createStore()
    const select = (args: unknown): { items: unknown[], totalItems: number } =>
      (api.endpoints as any).classificationStoreConfigurationKeyCollection.select(args)(store.getState()).data

    await store.dispatch((api.endpoints as any).classificationStoreConfigurationKeyCollection.initiate(queryArgs))
    await store.dispatch((api.endpoints as any).classificationStoreConfigurationKeyCollection.initiate(deletedViewArgs))

    await store.dispatch((api.endpoints as any).classificationStoreConfigurationKeyDelete.initiate({ id: KEY_ID }))

    await waitFor(() => { expect(select(queryArgs)).toEqual({ items: [], totalItems: 0 }) })
    expect(select(deletedViewArgs)).toEqual({ items: [storedKey], totalItems: 1 })
  })

  it('drops the key from every cached group relation page', async () => {
    const GROUP = 7
    const relation = { keyId: KEY_ID, groupId: GROUP }
    const otherRelation = { keyId: KEY_ID + 1, groupId: GROUP }
    let deleted = false
    globalThis.fetch = jest.fn(async (input: Request) => {
      if (input.method === 'DELETE') deleted = true
      const body = input.method === 'DELETE'
        ? null
        : (deleted ? { items: [otherRelation], totalItems: 1 } : { items: [relation, otherRelation], totalItems: 2 })
      return new Response(JSON.stringify(body), { status: 200, headers: { 'Content-Type': 'application/json' } })
    }) as unknown as typeof fetch
    const store = createStore()
    const relationArgs = { groupId: GROUP, body: { filters: { page: 1, pageSize: 10 } } }
    const relations = (api.endpoints as any).classificationStoreConfigurationKeyGroupRelationCollection

    await store.dispatch(relations.initiate(relationArgs))
    await store.dispatch((api.endpoints as any).classificationStoreConfigurationKeyDelete.initiate({ id: KEY_ID }))

    await waitFor(() => {
      expect(relations.select(relationArgs)(store.getState()).data).toEqual({ items: [otherRelation], totalItems: 1 })
    })
  })

  it('does not let a relation read dispatched before the delete write the key back', async () => {
    const GROUP = 7
    const relation = { keyId: KEY_ID, groupId: GROUP }
    const otherRelation = { keyId: KEY_ID + 1, groupId: GROUP }
    let deleted = false
    let releaseStale: () => void = () => {}
    const staleGate = new Promise<void>((resolve) => { releaseStale = resolve })
    globalThis.fetch = jest.fn(async (input: Request) => {
      if (input.method === 'DELETE') {
        deleted = true
        return new Response('null', { status: 200, headers: { 'Content-Type': 'application/json' } })
      }
      const snapshotBeforeDelete = !deleted
      if (snapshotBeforeDelete) await staleGate
      const body = snapshotBeforeDelete
        ? { items: [relation, otherRelation], totalItems: 2 }
        : { items: [otherRelation], totalItems: 1 }
      return new Response(JSON.stringify(body), { status: 200, headers: { 'Content-Type': 'application/json' } })
    }) as unknown as typeof fetch
    const store = createStore()
    const relationArgs = { groupId: GROUP, body: { filters: { page: 1, pageSize: 10 } } }
    const relations = (api.endpoints as any).classificationStoreConfigurationKeyGroupRelationCollection

    const pendingRead = store.dispatch(relations.initiate(relationArgs))
    await store.dispatch((api.endpoints as any).classificationStoreConfigurationKeyDelete.initiate({ id: KEY_ID }))
    releaseStale()
    await pendingRead

    await waitFor(() => {
      expect(relations.select(relationArgs)(store.getState()).data).toEqual({ items: [otherRelation], totalItems: 1 })
    })
  })

  it('re-reads a cached search instead of counting only the rows of its page', async () => {
    let deleted = false
    const searchArgs = {
      storeId: STORE_ID,
      body: { filters: { page: 2, pageSize: 1, columnFilters: [{ type: 'search', filterValue: 'x' }] } }
    }
    globalThis.fetch = jest.fn(async (input: Request) => {
      if (input.method === 'DELETE') {
        deleted = true
        return new Response('null', { status: 200, headers: { 'Content-Type': 'application/json' } })
      }
      const body = input.url.includes('keys') && !deleted
        ? { items: [{ ...storedKey, id: KEY_ID + 5 }], totalItems: 2 }
        : { items: [{ ...storedKey, id: KEY_ID + 5 }], totalItems: 1 }
      return new Response(JSON.stringify(body), { status: 200, headers: { 'Content-Type': 'application/json' } })
    }) as unknown as typeof fetch
    const store = createStore()
    const keys = (api.endpoints as any).classificationStoreConfigurationKeyCollection

    await store.dispatch(keys.initiate(queryArgs))
    await store.dispatch(keys.initiate(searchArgs))
    await store.dispatch((api.endpoints as any).classificationStoreConfigurationKeyDelete.initiate({ id: KEY_ID }))

    await waitFor(() => { expect(keys.select(searchArgs)(store.getState()).data.totalItems).toBe(1) })
  })
})

/**
 * A failed group update rolls back only when nothing overlapped it. Undoing restores the value a
 * member had before the failed request, which would also discard the value of a newer overlapping
 * write that succeeded; there the cache is left alone and re-read once the overlap has settled.
 */
describe('classification store group update rollback', () => {
  const originalFetch = globalThis.fetch
  const GROUP_ID = 3
  const groupArgs = { storeId: STORE_ID, body: { filters: { page: 1, pageSize: 10 } } }
  const baseGroup = { id: GROUP_ID, storeId: STORE_ID, name: 'g', description: null, customMetadata: null }
  let serverGroup: Record<string, unknown>
  let groupReads: number
  let pending: Array<(row: Record<string, unknown> | undefined, status?: number) => void>

  const json = (body: unknown, status = 200): Response =>
    new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })

  beforeEach(() => {
    serverGroup = baseGroup
    groupReads = 0
    pending = []
    globalThis.fetch = jest.fn(async (input: Request) => {
      if (input.method === 'POST' && input.url.endsWith('/groups')) {
        groupReads += 1
        return json({ items: [serverGroup], totalItems: 1 })
      }

      return await new Promise<Response>((resolve) => {
        pending.push((row, status = 200) => { resolve(json(row ?? { message: 'no' }, status)) })
      })
    }) as unknown as typeof fetch
  })

  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  const cached = (store: ReturnType<typeof createStore>): Record<string, unknown> | undefined =>
    (api.endpoints as any).classificationStoreConfigurationGroupCollection
      .select(groupArgs)(store.getState()).data?.items[0]

  const update = (store: ReturnType<typeof createStore>, customMetadata: object | null): void => {
    void store.dispatch((api.endpoints as any).classificationStoreConfigurationGroupUpdate.initiate({
      id: GROUP_ID,
      classificationStoreConfigurationGroupUpdate: { name: 'g', description: null, customMetadata }
    }))
  }

  it('keeps the newer write and re-reads when the older overlapping request fails', async () => {
    const store = createStore()
    await store.dispatch((api.endpoints as any).classificationStoreConfigurationGroupCollection.initiate(groupArgs))

    update(store, { a: 'A' })
    await waitFor(() => { expect(pending).toHaveLength(1) })
    update(store, { b: 'B' })
    await waitFor(() => { expect(pending).toHaveLength(2) })

    serverGroup = { ...baseGroup, customMetadata: { b: 'B' } }
    pending[1]({ ...baseGroup, customMetadata: { b: 'B' } })
    await flush()
    pending[0](undefined, 422)
    await waitFor(() => { expect(groupReads).toBe(2) })

    expect(cached(store)?.customMetadata).toEqual({ b: 'B' })
  })

  it('still rolls back a failed request nothing overlapped, without a re-read', async () => {
    const store = createStore()
    await store.dispatch((api.endpoints as any).classificationStoreConfigurationGroupCollection.initiate(groupArgs))

    update(store, { a: 'A' })
    await waitFor(() => { expect(pending).toHaveLength(1) })
    expect(cached(store)?.customMetadata).toEqual({ a: 'A' })

    pending[0](undefined, 422)
    await waitFor(() => { expect(cached(store)?.customMetadata).toBeNull() })
    await flush()

    expect(groupReads).toBe(1)
  })
})
