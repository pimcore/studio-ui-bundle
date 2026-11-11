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

import { type TypedUseMutation } from '@reduxjs/toolkit/query/react'
import { type BaseQuery } from '@Pimcore/app/api/pimcore'
import {
  api as baseApi,
  type ClassificationStoreConfigurationGroupCollectionApiArg,
  type ClassificationStoreConfigurationCollectionCollectionApiArg,
  type ClassificationStoreConfigurationGroupCollectionApiResponse,
  type ClassificationStoreConfigurationCollectionCollectionApiResponse,
  type ClassificationStoreConfigurationKeyGroupRelationCollectionApiArg,
  type ClassificationStoreConfigurationKeyCollectionApiArg,
  type ClassificationStoreConfigurationCollectionRelationCollectionApiResponse,
  type ClassificationStoreConfigurationCollectionRelationCollectionApiArg,
  type ClassificationStoreCollection2 as GeneratedKeyLayout,
  type ClassificationStoreGroupLayout2 as GeneratedGroupLayout,
  type ClassificationStoreConfigurationKeyGroupRelationCreate as GeneratedKeyGroupRelationCreate,
  type ClassificationStoreConfigurationKeyDetail as GeneratedKeyDetail,
  type ClassificationStoreConfigurationKeyUpdate as GeneratedKeyUpdate,
  type ClassificationStoreConfigurationSubGroupDetail as GeneratedSubGroupDetail,
  type ClassificationStoreConfigurationKeyGroupRelationDetail as GeneratedKeyGroupRelationDetail
} from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice.gen'

const CONFIGURATION_PREFIX = '/pimcore-studio/api/classification-store/configuration'

// ─── Hand-written sub-group contract ────────────────────────────────────────────
// The sub-group endpoints and the `subGroup` field shipped after this client was last
// generated. Each declaration below either adds a name the generated slice does not carry
// or shadows a generated one, so the next regeneration supersedes this block by deleting it.

/**
 * The generated `ClassificationStoreConfigurationSubGroupDetail` marks `identifier` optional
 * and nullable. The UI cannot act on a sub group without one — it is the value a key-group
 * relation stores, so a sub group lacking it cannot be assigned, unassigned or counted. This
 * narrows that one field; `hasIdentifier` below is the only way in.
 */
export type ClassificationStoreConfigurationSubGroupDetail =
  Omit<GeneratedSubGroupDetail, 'identifier'> & { identifier: string }

/** A sub group the UI can act on: one the server has given an identifier. */
export const hasIdentifier = (
  subGroup: GeneratedSubGroupDetail
): subGroup is ClassificationStoreConfigurationSubGroupDetail =>
  typeof subGroup.identifier === 'string' && subGroup.identifier !== ''


export interface ClassificationStoreConfigurationSubGroupCreate {
  /** Name of the sub group */
  name: string
  /** ID of the store this sub group belongs to */
  storeId: number
}

export interface ClassificationStoreConfigurationSubGroupUpdate {
  /** Name of the sub group */
  name: string
  /** Description of the sub group */
  description: string | null
  /** Free-form pairs of the sub group; absent keeps the stored ones, null clears them */
  customMetadata?: object | null
}

export interface ClassificationStoreConfigurationSubGroupCollectionApiResponse {
  totalItems: number
  items: ClassificationStoreConfigurationSubGroupDetail[]
}

export interface ClassificationStoreConfigurationSubGroupCollectionApiArg {
  /** ID of the store to list sub groups for */
  storeId: number
  body: {
    filters?: {
      page?: number
      pageSize?: number
      columnFilters?: object
      sortFilter?: object
      additionalSortFilters?: object
    }
  }
}

export interface ClassificationStoreConfigurationSubGroupCreateApiArg {
  classificationStoreConfigurationSubGroupCreate: ClassificationStoreConfigurationSubGroupCreate
}

export interface ClassificationStoreConfigurationSubGroupUpdateApiArg {
  /** Id of the sub group configuration */
  id: number
  classificationStoreConfigurationSubGroupUpdate: ClassificationStoreConfigurationSubGroupUpdate
}

export interface ClassificationStoreConfigurationSubGroupDeleteApiArg {
  /** Id of the sub group configuration */
  id: number
}

/**
 * The part of a key's definition blob the Classification Store search index reads. An absent
 * `indexed` means the key is indexed, so a key stored before the flag existed is not reported
 * as excluded. It is not the field definition's `index`, which drives the object query index.
 *
 * Unlike the rest of this block, a regeneration does not supersede the two shadows below: the
 * schema declares `definition` as free-form JSON, so no generated client ever names what is in it.
 *
 * The flag is named alongside a `string` index signature of `unknown` rather than on its own: a
 * definition blob is a whole field definition and carries dozens of members this client never
 * reads. Naming only `indexed` made excess-property checking reject every contextually typed
 * literal — `{ name: 'height', fieldtype: 'input' }` is a valid definition the server accepts,
 * and a type that cannot express it is narrower than the thing it describes.
 */
export type ClassificationStoreKeyDefinition = {
  /** Whether this key reaches the Classification Store search index */
  indexed?: boolean
} & {
  /** Every other member of the blob, which this client passes through without reading. */
  [member: string]: unknown
}

/**
 * A key, whose definition blob carries the Classification Store index flag. It also reports
 * whether the key holds a value per language: `localized` is a tri-state, where `true` and
 * `false` are the key's own decision and `null` inherits the flag of the class definition field
 * the store is used in.
 */
export interface ClassificationStoreConfigurationKeyDetail extends Omit<GeneratedKeyDetail, 'definition'> {
  /** Definition of the key */
  definition: ClassificationStoreKeyDefinition | null
  /** Whether the key is localized; null inherits the class field's flag */
  localized?: boolean | null
}

/**
 * The key update payload, whose definition blob carries the Classification Store index flag. It
 * also carries the localization tri-state: absent leaves the stored value alone, `true` and
 * `false` store that value, and an explicit null stores NULL, which means the key inherits the
 * class field's flag again.
 */
export interface ClassificationStoreConfigurationKeyUpdate extends Omit<GeneratedKeyUpdate, 'definition'> {
  /** Values for object brick definition metadata */
  definition: ClassificationStoreKeyDefinition | null
  /** Whether the key is localized; null inherits the class field's flag */
  localized?: boolean | null
}

/**
 * A key row as the generated client types it, read as the shape above. The index signature is the
 * one thing a generated `object` does not promise, so the read has to be declared; it is a read
 * and not a parse, the same bytes seen through a type that can name `indexed`. Every surface that
 * takes a key from a collection response goes through here rather than casting at the call.
 */
export const asKeyDetail = (key: GeneratedKeyDetail): ClassificationStoreConfigurationKeyDetail =>
  key as ClassificationStoreConfigurationKeyDetail

/** A key-group relation, which now also stores the identifier of its sub group. */
export interface ClassificationStoreConfigurationKeyGroupRelationDetail extends GeneratedKeyGroupRelationDetail {
  /** Identifier of the sub group this key is assigned to in this group */
  subGroup?: string | null
}

/**
 * The create-or-upsert payload of a key-group relation. Only the pair is required: a property
 * absent from the payload leaves the stored value alone, so a caller sends the fields it is
 * changing and nothing else. An explicit null on `subGroup` clears the assignment; `sorter` and
 * `mandatory` cannot be cleared and take 0 and false on a relation that does not exist yet.
 *
 * `sorter` and `mandatory` are re-declared optional: `KeyGroupRelationCreate` carries them as
 * `AbsentValue::ABSENT` defaults outside `required: ['keyId', 'groupId']`, which the generated
 * slice predates. The next regeneration reproduces them optional and this shadow goes with the
 * rest of the block.
 */
/**
 * Retired 2026-11-05 with the OpenAPI refresh, exactly as the note above said it would be: the
 * regenerated slice now carries `sorter`, `mandatory` and `subGroup` itself, optional and
 * nullable. Kept as an alias so call sites keep their name.
 */
export type ClassificationStoreConfigurationKeyGroupRelationCreate = GeneratedKeyGroupRelationCreate

export interface ClassificationStoreConfigurationKeyGroupRelationCollectionApiResponse {
  totalItems: number
  items: ClassificationStoreConfigurationKeyGroupRelationDetail[]
}

/** The sub groups of a group layout, in the order of their first key. */
export interface ClassificationStoreSubGroupLayout {
  /** Identifier of the sub group */
  identifier: string
  /** Name of the sub group */
  name: string
  /** Description of the sub group */
  description: string | null
}

export interface ClassificationStoreCollection2 extends GeneratedKeyLayout {
  /** Identifier of the sub group this key is assigned to in its group */
  subGroup?: string | null
  /** Whether this key is localized; null inherits the class field's flag */
  localized?: boolean | null
}

/**
 * One entry of the value of a key of type `multiValue`. It shadows a payload the generated client
 * types as `object`, and is used unchanged for reading and writing. Its members are the ones of
 * QualifiedValueSerializerInterface: `v`, `var` and `p`. The payload is keyed by language before it
 * reaches an entry, so the slot is the authority on language and an entry carries no such member.
 */
export interface ClassificationStoreMultiValueEntry {
  /** The delegate type's own value */
  v: unknown
  /** The variant; absent is the default variant */
  var?: string | null
  /** The position within the (language, variant) slot; absent reads as 0 */
  p?: number | null
}

/** The members of a `multiValue` key definition the schema does not name. */
export interface ClassificationStoreMultiValueDefinition {
  delegateDatatype?: string | null
  delegate?: Record<string, unknown> | null
}

export interface ClassificationStoreGroupLayout2 extends GeneratedGroupLayout {
  keys: ClassificationStoreCollection2[]
  /** Sub groups the keys of this group are assigned to, ordered by their first key */
  subGroups?: ClassificationStoreSubGroupLayout[]
}

// ─── The local write ledger for a key ───────────────────────────────────────────
// A key-update response is a snapshot of the whole key taken at a moment this client cannot know:
// two requests can reach the server in either order, so the one answered last is not necessarily
// the one that landed last. That is why a confirmation may not simply replace the cached row.
//
// It is not a reason to keep the cached value for every field the payload did not name, either.
// A field no local write touched is a field whose only writer is somebody else, and there the
// response IS the canonical value — refusing it left another user's exclusion of a key discarded
// by an unrelated description edit, and the key definition dialog then reopened showing the key
// as indexed, where an untouched save undid the exclusion.
//
// So the question a confirmation asks per field is "did another local write of mine overlap this
// request?", and the ledger below answers it: `pending` counts the writes in flight, `started`
// counts every write ever begun, so a write that began and finished inside this request's
// lifetime is seen as well as one still running.
//
// There is one question that mask cannot answer, and the per-key flight count below is what
// answers it. Where two writes overlap and NEITHER of them names a field — two cell edits, one on
// the title and one on the description, both leaving the definition alone — that field has no
// local writer, so both answers are canonical for it and each one simply replaces what the other
// wrote. The cache then holds whichever answer arrived last, which is not the snapshot the server
// applied last: a title edit answered after a description edit can carry the definition as it
// stood before another user's exclusion, and the dialog reopened on that row saves the stale flag
// back and undoes the exclusion. Arrival order is not an ordering, and this client has no server
// revision to order by — `modificationDate` is a Unix second, and the responses in question are
// milliseconds apart. So once the last of a set of overlapping writes has settled the key is
// re-read from the server, which is the only authority on what it now holds.

/** The fields of a key whose cached value a confirmation has to decide about. */
const KEY_WRITE_FIELDS = ['title', 'description', 'type', 'definition', 'localized', 'customMetadata'] as const
type KeyWriteField = typeof KEY_WRITE_FIELDS[number]

interface KeyWriteCounters { pending: number, started: number }

const localKeyWrites = new Map<string, KeyWriteCounters>()
/** In-flight key updates across all keys, so the ledger can be emptied when none are left. */
let localKeyWritesInFlight = 0

/**
 * Per key rather than per field: how many of this client's updates to it are in flight, and
 * whether any of them was ever in flight alongside another. A write that names no field at all
 * still counts here, which is why this is not derived from the per-field counters.
 */
interface KeyFlight { inFlight: number, overlapped: boolean }

const keyFlights = new Map<string, KeyFlight>()

const keyFlight = (id: unknown): KeyFlight => {
  const slot = String(id)
  let flight = keyFlights.get(slot)
  if (flight === undefined) {
    flight = { inFlight: 0, overlapped: false }
    keyFlights.set(slot, flight)
  }

  return flight
}

const keyWriteCounters = (id: unknown, field: KeyWriteField): KeyWriteCounters => {
  const slot = `${String(id)}:${field}`
  let counters = localKeyWrites.get(slot)
  if (counters === undefined) {
    counters = { pending: 0, started: 0 }
    localKeyWrites.set(slot, counters)
  }
  return counters
}

/** Which fields a key-update payload writes, by the three-state rules the server reads it with. */
const keyFieldsWritten = (update: {
  title?: string | null
  description?: string | null
  type?: string | null
  definition?: unknown
  localized?: boolean | null
  customMetadata?: object | null
}): Record<KeyWriteField, boolean> => ({
  // `title` and `description` are optional: absent leaves the stored value alone, null clears it.
  title: update.title !== undefined,
  description: update.description !== undefined,
  // `type` and `definition` cannot be absent from the payload, so a null is their "leave alone".
  type: update.type !== undefined && update.type !== null,
  definition: update.definition !== undefined && update.definition !== null,
  // `localized` is a tri-state: absent leaves the stored value alone, and a present null is a
  // value rather than an absence — it stores NULL, so the key inherits the class field's flag.
  localized: update.localized !== undefined,
  // `customMetadata` is a tri-state too: absent leaves the stored pairs alone, null clears them.
  customMetadata: update.customMetadata !== undefined
})

/**
 * Registers a key update's own writes and returns the decision its confirmation needs: for a
 * field the payload did not name, whether the response can be trusted for it. Call `settled()`
 * once the request has been answered and its cache patch applied; it reports whether the cached
 * key now has to be re-read from the server.
 */
const openKeyWrite = (
  id: unknown,
  written: Record<KeyWriteField, boolean>
): { responseIsCanonicalFor: (field: KeyWriteField) => boolean, settled: () => boolean } => {
  // Taken before this request registers itself, so a request never counts its own write.
  const contended = new Map<KeyWriteField, boolean>()
  const startedAtDispatch = new Map<KeyWriteField, number>()
  for (const field of KEY_WRITE_FIELDS) {
    const counters = keyWriteCounters(id, field)
    contended.set(field, counters.pending > 0)
    startedAtDispatch.set(field, counters.started)
  }

  // Read before this request counts itself, for the same reason as the field snapshot above.
  const flight = keyFlight(id)
  if (flight.inFlight > 0) flight.overlapped = true
  flight.inFlight += 1

  localKeyWritesInFlight += 1
  for (const field of KEY_WRITE_FIELDS) {
    if (!written[field]) continue
    const counters = keyWriteCounters(id, field)
    counters.pending += 1
    counters.started += 1
  }

  return {
    responseIsCanonicalFor: (field) =>
      contended.get(field) !== true &&
      keyWriteCounters(id, field).started === startedAtDispatch.get(field),
    settled: () => {
      for (const field of KEY_WRITE_FIELDS) {
        if (written[field]) keyWriteCounters(id, field).pending -= 1
      }
      localKeyWritesInFlight -= 1
      // With nothing in flight nobody is holding a dispatch-time snapshot any more, so the ledger
      // can be dropped whole rather than growing one entry per key touched in the session.
      if (localKeyWritesInFlight === 0) localKeyWrites.clear()

      flight.inFlight -= 1
      // True exactly once per set of overlapping writes, when the last of them has settled: the
      // cache is now holding answers ordered by arrival for any field none of them named, and
      // only the server can say which of them is current. A write that overlapped nothing returns
      // false, so the ordinary single save stays one request.
      const overlapSettled = flight.inFlight === 0 && flight.overlapped
      if (flight.inFlight === 0) keyFlights.delete(String(id))

      return overlapSettled
    }
  }
}

// The two shadows above — the key detail and the key update payload — are what the responses and
// arguments below are typed against, so the collection response and the update argument have to
// be declared here too rather than imported from the generated slice.

export interface ClassificationStoreConfigurationKeyCollectionApiResponse {
  totalItems: number
  items: ClassificationStoreConfigurationKeyDetail[]
}

export interface ClassificationStoreConfigurationKeyUpdateApiArg {
  /** Id of the key configuration */
  id: number
  classificationStoreConfigurationKeyUpdate: ClassificationStoreConfigurationKeyUpdate
}

// Helper: scan all active query cache entries for a given endpoint name and patch each one.
// The patch is handed the entry's own cache key alongside the draft, because what it has to do
// can differ per entry: a relation that already sits on the cached page 1 is simply missing from
// the cached page 2, and only the entry that pushed it in has created anything.
type PatchFn<T> = (draft: T, cacheKey: string) => void
interface PatchResult { undo: () => void }

function patchAllCacheEntries<T, A = unknown> (
  dispatch: (thunk: any) => void,
  endpointName: string,
  patch: PatchFn<T>,
  argFilter?: (args: A) => boolean
): void {
  // Accessing internal RTK Query store state to fan-out cache patches across all pages
  dispatch((innerDispatch: unknown, getState: () => unknown) => {
    const state = getState() as Record<string, unknown>
    const queries = (state.api as Record<string, unknown>)?.queries as Record<string, unknown> ?? {}

    for (const [queryKey, queryState] of Object.entries(queries)) {
      if (!queryKey.startsWith(`${endpointName}(`)) continue
      const qs = queryState as { originalArgs: unknown }
      try {
        if (argFilter !== undefined && !argFilter(qs.originalArgs as A)) continue
        // @ts-expect-error — dynamic endpoint name not in the union
        innerDispatch(baseApi.util.updateQueryData(endpointName, qs.originalArgs, (draft: T) => {
          patch(draft, queryKey)
        }))
      } catch {
        // Cache entry may have been garbage-collected — safe to ignore
      }
    }
  })
}

// Like patchAllCacheEntries but returns PatchResults so callers can undo on failure.
function optimisticPatchAllCacheEntries<T, A = unknown> (
  dispatch: (thunk: any) => any,
  endpointName: string,
  patch: PatchFn<T>,
  argFilter?: (args: A) => boolean
): PatchResult[] {
  const results: PatchResult[] = []

  dispatch((innerDispatch: (action: unknown) => PatchResult, getState: () => unknown) => {
    const state = getState() as Record<string, unknown>
    const queries = (state.api as Record<string, unknown>)?.queries as Record<string, unknown> ?? {}

    for (const [queryKey, queryState] of Object.entries(queries)) {
      if (!queryKey.startsWith(`${endpointName}(`)) continue
      const qs = queryState as { originalArgs: unknown }
      if (argFilter !== undefined && !argFilter(qs.originalArgs as A)) continue
      try {
        // @ts-expect-error — dynamic endpoint name not in the union
        const result = innerDispatch(baseApi.util.updateQueryData(endpointName, qs.originalArgs, (draft: T) => {
          patch(draft, queryKey)
        }))
        results.push(result)
      } catch {
        // Cache entry may have been garbage-collected — safe to ignore
      }
    }
  })

  return results
}

/**
 * Re-reads one cache entry of the key collection from the server, ignoring what the cache holds.
 *
 * Used where a patch cannot decide which of two server-side orders won: a write confirmed inside a
 * collection read, where the read's snapshot and the write's confirmation are two statements about
 * the same row with no knowable order between them (see the read ledger below). The entry is named
 * by the arguments of the read that could not decide, so one unanswerable read costs one request.
 *
 * `subscribe: false` keeps the refetch from holding the entry open: it writes into the entries the
 * grid is already subscribed to, and an entry nobody is reading any more expires as before. An
 * open key definition dialog is unaffected — the layout provider seeds once and ignores later
 * refreshes of the same key (layout-provider-factory.tsx, "Already initialized").
 */
const refetchKeyCollection = (
  dispatch: (thunk: any) => void,
  args: ClassificationStoreConfigurationKeyCollectionApiArg
): void => {
  dispatch(baseApi.endpoints.classificationStoreConfigurationKeyCollection.initiate(
    args,
    { subscribe: false, forceRefetch: true }
  ))
}

/**
 * Re-reads the cached pages of one store's key collection, ignoring what the cache holds.
 *
 * Used for the other case a patch cannot decide: two of this client's writes to the same key
 * overlapped, so for any field neither of them named the cache took whichever answer arrived last
 * (see the ledger above). That one is not confined to a single entry — the confirmation patch
 * fans out over every cached page, so every page that holds the key took the same last answer —
 * and it fires once per set of overlapping writes rather than once per read.
 *
 * `storeId` is the store the confirmed key belongs to, and pages of any other store are left
 * alone: a key belongs to exactly one store (`ClassificationStoreConfigurationKeyDetail.storeId`),
 * so a page listing another store's keys cannot hold the row and re-reading it buys nothing. It is
 * undefined only where no response arrived to name the store, and then every page is re-read
 * because there is nothing to narrow by.
 *
 * Only the cached pages are re-read — a tag invalidation would also refetch the groups, the
 * collections and every relation list, none of which a key update can have changed.
 */
const refetchKeyCollections = (dispatch: (thunk: any) => void, storeId?: number): void => {
  // Accessing internal RTK Query store state to find the cached pages, as the patch helpers do.
  dispatch((innerDispatch: (thunk: any) => void, getState: () => unknown) => {
    const state = getState() as Record<string, unknown>
    const queries = (state.api as Record<string, unknown>)?.queries as Record<string, unknown> ?? {}

    for (const [queryKey, queryState] of Object.entries(queries)) {
      if (!queryKey.startsWith('classificationStoreConfigurationKeyCollection(')) continue
      const qs = queryState as { originalArgs: ClassificationStoreConfigurationKeyCollectionApiArg }
      if (storeId !== undefined && qs.originalArgs?.storeId !== storeId) continue
      refetchKeyCollection(innerDispatch, qs.originalArgs)
    }
  })
}

// ─── The collection reads a confirmation has to survive ─────────────────────────
// A read of the key collection is a snapshot of the server taken at a moment this client cannot
// know either, and its answer replaces the whole cached page rather than a field of a row. So a
// read dispatched before a key update confirms, and answered after it, writes the page back as it
// stood before that save: the exclusion the key definition dialog had just confirmed is gone from
// the cache, and reopening the dialog shows the key as indexed again — then saves that back.
//
// The write ledger above cannot see this. It weighs this client's writes against each other, and a
// read registers nothing in it, so a save that overlaps only a read is a save that overlapped
// "nothing" and schedules no corrective re-read. It is not confined to the key the read was taken
// for, either: the answer carries every row of the page, so a save on any key in it is overwritten
// the same way. The corrective re-read below is one such read, and the ordinary grid load, the
// page change and the tag invalidation are the others, so this is registered on the collection
// endpoint itself rather than around that one dispatch.
//
// Every read in flight is registered here, and a confirmation landing inside one leaves the fields
// that confirmation owns behind. Once the read's answer has been written to the cache those fields
// are written over it again, in the order they were confirmed. Only the fields the request named
// are preserved: for those the server has just said what it stored, and only in the one cache
// entry this read answered. Everything else in the row is the read's, which is what re-reading is
// for.
//
// Two things the replay cannot establish, and the corrective re-read is how both are answered:
//
//   * which of the two is newer. A confirmation that landed after the read was dispatched is not
//     thereby newer than the read's answer: the server evaluates the read at a moment this client
//     cannot know, and that moment can be after it applied the update AND after another user
//     changed the same field back. Replayed over such an answer the confirmation reinstates a
//     value the server no longer holds, and a single save schedules no re-read of its own, so
//     reopening the dialog would offer that stale value and save it back.
//   * whether the other cached entries are owed anything. They are not: a read writes its own
//     entry, so a replay reaching into the entry of a later, differently keyed read overwrites
//     that read's fresher answer with this one's remembered confirmation.
//
// So the replay is kept — the cache must not flicker back to the pre-save value — but a read that
// replayed anything re-reads the collection as it settles, and the cache ends on the server's
// state rather than on an assumption about arrival order. The re-read is registered here like any
// other read, so a confirmation landing inside it is replayed and re-read in turn; with no further
// write to confirm, the next one records nothing and the sequence stops.
//
// Both halves of that are confined to the reads and the entry the save can actually have changed,
// because a save is one row of one store and this ledger holds every read of every store:
//
//   * a confirmation is recorded only against reads of the store the confirmed key belongs to.
//     Recorded against all of them, a save in one store left a remembered confirmation on the
//     editor's read of another store, whose page cannot hold the row; the replay then found no
//     row to write and the read still ordered a corrective re-read, so one save cost a re-read of
//     every store open in the session.
//   * a read re-reads its own entry and no other. Re-reading every cached page meant each read of
//     a staggered set ordered the whole set again, so n reads in flight cost n×n requests and a
//     corrective read that had already answered was launched a second time by a later settlement.
//   * and only a read whose replay actually wrote a row re-reads at all. Whether the page carries
//     the saved key is not knowable when the confirmation is recorded — the read has not answered
//     yet — but it is knowable once it has, and a page that never held the row has no conflict of
//     statements on it to resolve.

/** The fields of one key a confirmed update is the authority on, and the values it confirmed. */
type ConfirmedKeyFields = Partial<Record<KeyWriteField, unknown>>

interface KeyCollectionRead {
  /** The store whose keys this read lists; a confirmation from any other store is not its concern. */
  storeId: number
  preserve: Array<{ id: unknown, fields: ConfirmedKeyFields }>
  /** Keys deleted while this read was in flight: its answer, a pre-delete snapshot, may still carry them. */
  deleted: Set<unknown>
}

/** The reads of the key collection now in flight. */
const keyCollectionReads = new Set<KeyCollectionRead>()

/**
 * Registers a read of the key collection, under the query arguments it was dispatched with — the
 * one cache entry its answer lands in, and so the only entry its replay may touch and the only one
 * it may re-read. Call `settled()` once its answer has been written to the cache — or once it has
 * failed, where there is simply nothing to write back over.
 */
const openKeyCollectionRead = (
  args: ClassificationStoreConfigurationKeyCollectionApiArg
): { settled: (dispatch: (thunk: any) => void) => void } => {
  const read: KeyCollectionRead = { storeId: args.storeId, preserve: [], deleted: new Set() }
  keyCollectionReads.add(read)

  return {
    settled: (dispatch) => {
      keyCollectionReads.delete(read)

      // A delete confirmed inside this read: the answer is a snapshot from before it, so the row
      // is taken out again and the entry re-read, which also settles the totals a page-local
      // removal cannot know. Dispatched after the delete, so the re-read cannot see the key.
      if (read.deleted.size > 0) {
        dispatch(baseApi.util.updateQueryData(
          'classificationStoreConfigurationKeyCollection',
          args,
          (draft) => {
            const page = draft as unknown as ClassificationStoreConfigurationKeyCollectionApiResponse
            page.items = page.items.filter((k) => !read.deleted.has(k.id))
          }
        ))
        refetchKeyCollection(dispatch, args)
        return
      }

      if (read.preserve.length === 0) return

      // Set from inside the recipe, which `updateQueryData` runs synchronously while this
      // dispatch is on the stack — so it is readable immediately below. It stays false where the
      // answer carried none of the preserved keys, and where the entry had already been dropped
      // and the recipe never ran at all.
      let replayed = false

      // This read's own entry, named by the arguments it was dispatched with, and not every cached
      // page: an entry another read has since refreshed holds that read's answer, which is newer
      // than the confirmation remembered here, and replaying into it would put the older value
      // back.
      dispatch(baseApi.util.updateQueryData(
        'classificationStoreConfigurationKeyCollection',
        args,
        (draft) => {
          const page = draft as unknown as ClassificationStoreConfigurationKeyCollectionApiResponse
          for (const { id, fields } of read.preserve) {
            const idx = page.items.findIndex((k) => k.id === id)
            // A key the answer does not carry any more — deleted, moved to another page or
            // filtered out — has no row to write to, and nothing to preserve.
            if (idx !== -1) {
              Object.assign(page.items[idx], fields)
              replayed = true
            }
          }
        }
      ))

      // Nothing of this read's answer was written over, so the two statements never met on this
      // page and there is no order to resolve: a page that does not carry the saved key reads the
      // same before and after the save.
      if (!replayed) return

      // The replay is a guess about which of two unordered statements is newer, so the server is
      // asked — for this read's own entry, which is the only one the replay touched. See the
      // section comment above: this is also what gives a save that overlapped only a read the
      // corrective re-read the write ledger would have given it had it overlapped a write.
      refetchKeyCollection(dispatch, args)
    }
  }
}

/**
 * The deletion of a key, recorded against the key collection reads in flight that may list it — those
 * of its own store, or all of them where the store is unknown.
 */
const tombstoneAcrossKeyCollectionReads = (id: unknown, storeId: number | undefined): void => {
  for (const read of keyCollectionReads) {
    if (storeId === undefined || read.storeId === storeId) read.deleted.add(id)
  }
}

/** The reads of a group's key relations now in flight, with the keys deleted while they ran. */
interface RelationCollectionRead { deleted: Set<unknown> }
const relationCollectionReads = new Set<RelationCollectionRead>()

const refetchRelationCollection = (
  dispatch: (thunk: any) => void,
  args: ClassificationStoreConfigurationKeyGroupRelationCollectionApiArg
): void => {
  dispatch(baseApi.endpoints.classificationStoreConfigurationKeyGroupRelationCollection.initiate(
    args,
    { subscribe: false, forceRefetch: true }
  ))
}

/** Re-reads every cached relation page: which group and page held a deleted key is not knowable from the key. */
const refetchRelationCollections = (dispatch: (thunk: any) => void): void => {
  dispatch((innerDispatch: (thunk: any) => void, getState: () => unknown) => {
    const queries = ((getState() as Record<string, any>).api?.queries ?? {}) as Record<string, any>
    for (const [queryKey, queryState] of Object.entries(queries)) {
      if (!queryKey.startsWith('classificationStoreConfigurationKeyGroupRelationCollection(')) continue
      refetchRelationCollection(innerDispatch, queryState.originalArgs as ClassificationStoreConfigurationKeyGroupRelationCollectionApiArg)
    }
  })
}

/**
 * Records the fields a key update has just had confirmed against the collection reads in flight
 * that list the confirmed key's own store, so each of those reads writes them back once its own
 * answer has landed. A read of any other store is left alone: its page lists keys of a store this
 * key does not belong to, so its answer cannot be carrying the row and cannot be overwriting the
 * save.
 */
const preserveAcrossKeyCollectionReads = (
  id: unknown,
  storeId: number,
  fields: ConfirmedKeyFields
): void => {
  if (keyCollectionReads.size === 0 || Object.keys(fields).length === 0) return

  for (const read of keyCollectionReads) {
    if (read.storeId !== storeId) continue
    read.preserve.push({ id, fields })
  }
}

// Collections and groups: the same question the key ledger answers, without the corrective
// re-read. A metadata save and a name edit are separate requests on one row, each answered with
// the row as the server held it when it read it, so a confirmation may only take the response for
// a member that no other local write of this client touched while it was in flight.
type RowWriteField = 'name' | 'description' | 'customMetadata'
const ROW_WRITE_FIELDS: readonly RowWriteField[] = ['name', 'description', 'customMetadata']

const createRowWriteLedger = () => {
  // Set when a request failed while another write of the same row overlapped it: its rollback was
  // skipped (it could not tell its own members from the newer write's), so the cache is re-read
  // once the last write has settled.
  let needsReread = false
  const counters = new Map<string, { pending: number, started: number }>()
  let inFlight = 0
  const slot = (id: unknown, field: RowWriteField): { pending: number, started: number } => {
    const key = `${String(id)}:${field}`
    let entry = counters.get(key)
    if (entry === undefined) {
      entry = { pending: 0, started: 0 }
      counters.set(key, entry)
    }
    return entry
  }

  return (id: unknown, update: { customMetadata?: object | null }) => {
    // `name` and `description` are required in the payload, so they are always written.
    const written: Record<RowWriteField, boolean> = {
      name: true,
      description: true,
      customMetadata: update.customMetadata !== undefined
    }
    const contended = new Map<RowWriteField, boolean>()
    const startedAtDispatch = new Map<RowWriteField, number>()
    for (const field of ROW_WRITE_FIELDS) {
      contended.set(field, slot(id, field).pending > 0)
      startedAtDispatch.set(field, slot(id, field).started)
    }
    inFlight += 1
    for (const field of ROW_WRITE_FIELDS) {
      if (!written[field]) continue
      slot(id, field).pending += 1
      slot(id, field).started += 1
    }

    return {
      /** Whether the cached value of `field` is to be replaced by the response. */
      // Written members are held to the same test as unwritten ones: a response may only decide a
      // member when no other write of it was in flight at dispatch and none has started since
      // (this request's own start is the one counted in `started` when it wrote the member).
      // Otherwise the arrival order of overlapping answers would decide which stale value wins.
      takesResponseFor: (field: RowWriteField): boolean =>
        contended.get(field) !== true &&
        slot(id, field).started === (startedAtDispatch.get(field) ?? 0) + (written[field] ? 1 : 0),
      /** Whether no other write of a member this request wrote overlapped it, so undoing it is exact. */
      ownsItsPatch: (): boolean => ROW_WRITE_FIELDS.every((field) => !written[field] || (
        contended.get(field) !== true &&
        slot(id, field).started === (startedAtDispatch.get(field) ?? 0) + 1
      )),
      /** A rollback was skipped because a newer write overlapped: ask for a re-read at the end. */
      skippedRollback: (): void => { needsReread = true },
      /** Closes the request; true when it was the last in flight and a skipped rollback wants a re-read. */
      settled: (): boolean => {
        for (const field of ROW_WRITE_FIELDS) {
          if (written[field]) slot(id, field).pending -= 1
        }
        inFlight -= 1
        if (inFlight !== 0) return false
        counters.clear()
        const reread = needsReread
        needsReread = false
        return reread
      }
    }
  }
}

/** Re-reads every cached page of a collection endpoint, ignoring what the cache holds. */
const refetchCachedPages = (
  dispatch: (thunk: any) => void,
  endpointName: 'classificationStoreConfigurationGroupCollection' | 'classificationStoreConfigurationCollectionCollection'
): void => {
  dispatch((innerDispatch: (thunk: any) => void, getState: () => unknown) => {
    const state = getState() as Record<string, unknown>
    const queries = (state.api as Record<string, unknown>)?.queries as Record<string, unknown> ?? {}

    for (const [queryKey, queryState] of Object.entries(queries)) {
      if (!queryKey.startsWith(`${endpointName}(`)) continue
      const qs = queryState as { originalArgs: ClassificationStoreConfigurationGroupCollectionApiArg & ClassificationStoreConfigurationCollectionCollectionApiArg }
      innerDispatch(baseApi.endpoints[endpointName].initiate(qs.originalArgs, { subscribe: false, forceRefetch: true }))
    }
  })
}

const openGroupWrite = createRowWriteLedger()
const openCollectionWrite = createRowWriteLedger()

/** The response row, with the cached value kept for every member this request may not decide. */
const confirmedRow = <T extends { name: string, description?: string | null, customMetadata?: object | null }>(
  updated: T,
  cached: T,
  takes: (field: RowWriteField) => boolean
): T => {
  const merged = { ...updated }
  for (const field of ROW_WRITE_FIELDS) {
    if (!takes(field)) (merged as Record<RowWriteField, unknown>)[field] = cached[field]
  }
  return merged
}

const api = baseApi.enhanceEndpoints({
  endpoints: {

    // ─── Groups ──────────────────────────────────────────────────────────────

    classificationStoreConfigurationGroupCollection: {
      providesTags: ['Classification Store']
    },

    classificationStoreConfigurationGroupUpdate: {
      invalidatesTags: () => [],
      async onQueryStarted (args, { dispatch, queryFulfilled }) {
        const write = openGroupWrite(args.id, args.classificationStoreConfigurationGroupUpdate)
        const patchResults = optimisticPatchAllCacheEntries<ClassificationStoreConfigurationGroupCollectionApiResponse>(
          dispatch,
          'classificationStoreConfigurationGroupCollection',
          (draft) => {
            const idx = draft.items.findIndex((g) => g.id === args.id)
            if (idx !== -1) {
              const update = args.classificationStoreConfigurationGroupUpdate
              Object.assign(draft.items[idx], update)
            }
          }
        )
        try {
          const { data: updated } = await queryFulfilled
          patchAllCacheEntries<ClassificationStoreConfigurationGroupCollectionApiResponse>(
            dispatch,
            'classificationStoreConfigurationGroupCollection',
            (draft) => {
              const idx = draft.items.findIndex((g) => g.id === updated.id)
              if (idx !== -1) draft.items[idx] = confirmedRow(updated, draft.items[idx], write.takesResponseFor)
            }
          )
        } catch {
          // Undoing restores the pre-request value of each member this request wrote, which would
          // also discard a newer overlapping write's value for it. Roll back only when nothing
          // overlapped; otherwise leave the cache and re-read once the overlap has settled.
          if (write.ownsItsPatch()) patchResults.forEach((r) => { r.undo() })
          else write.skippedRollback()
        } finally {
          if (write.settled()) refetchCachedPages(dispatch, 'classificationStoreConfigurationGroupCollection')
        }
      }
    },

    classificationStoreConfigurationGroupDelete: {
      invalidatesTags: () => [],
      async onQueryStarted (args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          patchAllCacheEntries<ClassificationStoreConfigurationGroupCollectionApiResponse>(
            dispatch,
            'classificationStoreConfigurationGroupCollection',
            (draft) => {
              draft.items = draft.items.filter((g) => g.id !== args.id)
              draft.totalItems = Math.max(0, draft.totalItems - 1)
            }
          )
        } catch {
          // Mutation failed — cache stays stale until next refetch
        }
      }
    },

    // ─── Collections ─────────────────────────────────────────────────────────

    classificationStoreConfigurationCollectionCollection: {
      providesTags: ['Classification Store']
    },

    classificationStoreConfigurationCollectionUpdate: {
      invalidatesTags: () => [],
      async onQueryStarted (args, { dispatch, queryFulfilled }) {
        const write = openCollectionWrite(args.id, args.classificationStoreConfigurationCollectionUpdate)
        const patchResults = optimisticPatchAllCacheEntries<ClassificationStoreConfigurationCollectionCollectionApiResponse>(
          dispatch,
          'classificationStoreConfigurationCollectionCollection',
          (draft) => {
            const idx = draft.items.findIndex((c) => c.id === args.id)
            if (idx !== -1) {
              const update = args.classificationStoreConfigurationCollectionUpdate
              Object.assign(draft.items[idx], update)
            }
          }
        )
        try {
          const { data: updated } = await queryFulfilled
          patchAllCacheEntries<ClassificationStoreConfigurationCollectionCollectionApiResponse>(
            dispatch,
            'classificationStoreConfigurationCollectionCollection',
            (draft) => {
              const idx = draft.items.findIndex((c) => c.id === updated.id)
              if (idx !== -1) draft.items[idx] = confirmedRow(updated, draft.items[idx], write.takesResponseFor)
            }
          )
        } catch {
          if (write.ownsItsPatch()) patchResults.forEach((r) => { r.undo() })
          else write.skippedRollback()
        } finally {
          if (write.settled()) refetchCachedPages(dispatch, 'classificationStoreConfigurationCollectionCollection')
        }
      }
    },

    classificationStoreConfigurationCollectionDelete: {
      invalidatesTags: () => [],
      async onQueryStarted (args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          patchAllCacheEntries<ClassificationStoreConfigurationCollectionCollectionApiResponse>(
            dispatch,
            'classificationStoreConfigurationCollectionCollection',
            (draft) => {
              draft.items = draft.items.filter((c) => c.id !== args.id)
              draft.totalItems = Math.max(0, draft.totalItems - 1)
            }
          )
        } catch {
          // Mutation failed — cache stays stale until next refetch
        }
      }
    },

    // ─── Keys ────────────────────────────────────────────────────────────────

    classificationStoreConfigurationKeyCollection: {
      providesTags: ['Classification Store'],
      // Every read of the page is registered for as long as it is in flight, so a key update
      // confirmed while it ran can write its own fields back over the answer (see the read ledger
      // above). Without it the answer — a snapshot taken before that update was applied — is the
      // last word on every row of the page, including rows of keys the read was not taken for.
      // Registered with its own arguments: the replay belongs to the entry this read answers, and
      // a read with other arguments has its own, newer answer there.
      async onQueryStarted (args, { dispatch, queryFulfilled }) {
        const read = openKeyCollectionRead(args)
        try {
          await queryFulfilled
        } catch {
          // A read that failed wrote nothing into the cache, so there is nothing over it to undo.
        } finally {
          read.settled(dispatch)
        }
      }
    },

    classificationStoreConfigurationKeyUpdate: {
      invalidatesTags: () => [],
      async onQueryStarted (args, { dispatch, queryFulfilled }) {
        // Read as the shadowed payload above, which is what the hook's callers hand the trigger:
        // the generated argument types `definition` as a bare `object` and does not name
        // `localized` at all, so neither the index flag nor the localization tri-state is
        // readable through it.
        const update = args.classificationStoreConfigurationKeyUpdate as ClassificationStoreConfigurationKeyUpdate
        const written = keyFieldsWritten(update)
        const write = openKeyWrite(args.id, written)
        // The store the confirmed row belongs to, so the corrective re-read in the `finally` can
        // leave the cached pages of every other store alone. Only a response can name it — the
        // payload carries no store — so a request that failed leaves it undefined and the re-read
        // falls back to every cached page.
        let confirmedStoreId: number | undefined
        // Everything from here on is inside the `finally` that closes the ledger entry: a write
        // left open would mark its fields contended for the rest of the session, and the cache
        // would go back to refusing every canonical value for them.
        try {
          // Only what the payload names is patched. `title` and `description` are optional, so they
          // carry three states: absent leaves the stored value alone, a null clears it, a string
          // sets it. `type` and `definition` cannot be absent from the payload, so a null is their
          // "leave the stored one alone" and writing it would wipe the cached value instead.
          // `definition` is left out either way: no cached cell shows it, and the key definition
          // dialog reads it back from the response below.
          const namedFields = {
            name: update.name,
            ...(update.title !== undefined ? { title: update.title } : {}),
            ...(update.description !== undefined ? { description: update.description } : {}),
            // Spelled out rather than read off `written.type`, which is a boolean and so does not
            // narrow the null away for the patch.
            ...(update.type !== undefined && update.type !== null ? { type: update.type } : {}),
            // `localized` is a tri-state, so a present null is a value and not an absence: it
            // stores NULL, which means the key inherits the class field's flag again. Keyed off
            // `undefined` and not off `in`, because an undefined member is dropped on the way to
            // the wire and would patch a null the server never hears about.
            ...(update.localized !== undefined ? { localized: update.localized } : {})
          }
          // Optimistically apply the update payload to the cache immediately so the
          // UI reflects the change without waiting for the server round-trip.
          const patchResults = optimisticPatchAllCacheEntries<ClassificationStoreConfigurationKeyCollectionApiResponse>(
            dispatch,
            'classificationStoreConfigurationKeyCollection',
            (draft) => {
              const idx = draft.items.findIndex((k) => k.id === args.id)
              if (idx !== -1) {
                // Assigned onto the existing row rather than replacing it. Immer records one patch
                // per path it sees written, so the inverse patches this produces name only the
                // members this request wrote — and the rollback below can therefore undo no more
                // than that. Replacing the row recorded a single replace of the whole row, and a
                // request that failed after a later one had already succeeded then restored every
                // member of it: the exact staleness the response mask further down prevents,
                // arriving through the other door.
                Object.assign(draft.items[idx], namedFields)
              }
            }
          )

          try {
            const { data: updated } = await queryFulfilled
            // The fields this request named, as the server has just confirmed them. A collection
            // read already in flight answers with a snapshot taken before this request was
            // applied, and replaces the whole page with it; these values are written back over
            // that answer so the save survives it (see the read ledger above).
            const confirmedRow = asKeyDetail(updated)
            confirmedStoreId = confirmedRow.storeId
            const ownedFields: ConfirmedKeyFields = {}
            for (const field of KEY_WRITE_FIELDS) {
              if (written[field]) ownedFields[field] = confirmedRow[field]
            }
            preserveAcrossKeyCollectionReads(updated.id, confirmedRow.storeId, ownedFields)

            patchAllCacheEntries<ClassificationStoreConfigurationKeyCollectionApiResponse>(
              dispatch,
              'classificationStoreConfigurationKeyCollection',
              (draft) => {
                const idx = draft.items.findIndex((k) => k.id === updated.id)
                if (idx === -1) return

                // Once confirmed, the server's answer is taken for every field this request named,
                // and for every field nobody else here was writing at the same time: that field has
                // no local writer, so the response is the freshest value there is and another
                // user's change to it belongs in the cache.
                //
                // The cached value is kept only where a local write of this client's overlapped the
                // request, because there the response may be a snapshot from before that write
                // landed. Replacing the whole row in that case reverted the definition the key
                // definition dialog had just saved when a cell edit answered last, and reverted the
                // cell edit when the dialog save answered last — and the same for the localization
                // the dialog writes, which the grid and the dialog both read out of this cache.
                const cached = draft.items[idx]
                const keepCached = (field: KeyWriteField): boolean =>
                  !written[field] && !write.responseIsCanonicalFor(field)
                draft.items[idx] = {
                  ...asKeyDetail(updated),
                  ...(keepCached('title') ? { title: cached.title } : {}),
                  ...(keepCached('description') ? { description: cached.description } : {}),
                  ...(keepCached('type') ? { type: cached.type } : {}),
                  ...(keepCached('definition') ? { definition: cached.definition } : {}),
                  ...(keepCached('localized') ? { localized: cached.localized } : {}),
                  ...(keepCached('customMetadata') ? { customMetadata: cached.customMetadata } : {})
                }
              }
            )
          } catch {
            // Server rejected — roll back all optimistic patches.
            patchResults.forEach((r) => { r.undo() })
          }
        } finally {
          // After the cache patch, so a request still counts as in flight for as long as it can
          // still write, and a rejected one leaves the ledger as it found it.
          //
          // `settled()` answers the one question the field mask above cannot: two of this client's
          // writes overlapped, so a field neither of them named was confirmed twice and the cache
          // kept whichever answer arrived last. Re-read once the last of them has settled — after
          // every patch, so nothing in flight can be overwritten, and only on that path, so an
          // ordinary save still costs one request. Narrowed to the store the confirmed row named:
          // the pages of another store cannot hold this key, so re-reading them answers nothing.
          if (write.settled()) refetchKeyCollections(dispatch, confirmedStoreId)
        }
      }
    },

    classificationStoreConfigurationKeyDelete: {
      invalidatesTags: () => [],
      async onQueryStarted (args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          // The key's store is read off a cached row, as a delete response names nothing.
          let deletedStoreId: number | undefined
          dispatch((_inner: unknown, getState: () => unknown) => {
            const queries = ((getState() as Record<string, any>).api?.queries ?? {}) as Record<string, any>
            for (const [queryKey, queryState] of Object.entries(queries)) {
              if (!queryKey.startsWith('classificationStoreConfigurationKeyCollection(')) continue
              const row = (queryState?.data as ClassificationStoreConfigurationKeyCollectionApiResponse | undefined)
                ?.items?.find((k) => k.id === args.id)
              if (row !== undefined) { deletedStoreId = row.storeId; return }
            }
          })

          // Reads dispatched before this delete may still answer with the key; see the ledger above.
          tombstoneAcrossKeyCollectionReads(args.id, deletedStoreId)
          for (const read of relationCollectionReads) read.deleted.add(args.id)

          const isSearch = (a: ClassificationStoreConfigurationKeyCollectionApiArg): boolean =>
            ((a?.body?.filters?.columnFilters as unknown[] | undefined)?.length ?? 0) > 0
          // The Deleted view lists disabled keys, which this delete adds to rather than removes from.
          const isActiveView = (a: ClassificationStoreConfigurationKeyCollectionApiArg): boolean =>
            a?.body?.disabledOnly !== true

          // Unfiltered pages of the key's own store lose one item from their total whether or not
          // the row sat on that page. Anything else (another store, a cached search, or any entry
          // when the store is unknown) drops the row only if it holds it, and lowers the total by
          // what it actually removed, so a search the key does not match keeps its total.
          patchAllCacheEntries<
            ClassificationStoreConfigurationKeyCollectionApiResponse,
            ClassificationStoreConfigurationKeyCollectionApiArg
          >(
            dispatch,
            'classificationStoreConfigurationKeyCollection',
            (draft) => {
              draft.items = draft.items.filter((k) => k.id !== args.id)
              draft.totalItems = Math.max(0, draft.totalItems - 1)
            },
            (a) => isActiveView(a) && deletedStoreId !== undefined && a.storeId === deletedStoreId && !isSearch(a)
          )
          patchAllCacheEntries<
            ClassificationStoreConfigurationKeyCollectionApiResponse,
            ClassificationStoreConfigurationKeyCollectionApiArg
          >(
            dispatch,
            'classificationStoreConfigurationKeyCollection',
            (draft) => {
              const before = draft.items.length
              draft.items = draft.items.filter((k) => k.id !== args.id)
              draft.totalItems = Math.max(0, draft.totalItems - (before - draft.items.length))
            },
            (a) => isActiveView(a) && !(deletedStoreId !== undefined && a.storeId === deletedStoreId && !isSearch(a))
          )
          // The server unassigns the key from every group when it is disabled, so the cached
          // relation pages of every group drop its rows too.
          patchAllCacheEntries<ClassificationStoreConfigurationKeyGroupRelationCollectionApiResponse>(
            dispatch,
            'classificationStoreConfigurationKeyGroupRelationCollection',
            (draft) => {
              const before = draft.items.length
              draft.items = draft.items.filter((r) => r.keyId !== args.id)
              draft.totalItems = Math.max(0, draft.totalItems - (before - draft.items.length))
            }
          )
          // The patches above only know the cached page. A search the key matches on another page,
          // and a relation on a later page of its group, leave a total one too high, so those
          // entries are re-read rather than counted.
          dispatch((innerDispatch: (thunk: any) => void, getState: () => unknown) => {
            const queries = ((getState() as Record<string, any>).api?.queries ?? {}) as Record<string, any>
            for (const [queryKey, queryState] of Object.entries(queries)) {
              if (!queryKey.startsWith('classificationStoreConfigurationKeyCollection(')) continue
              const a = queryState.originalArgs as ClassificationStoreConfigurationKeyCollectionApiArg
              if (isActiveView(a) && isSearch(a) && (deletedStoreId === undefined || a.storeId === deletedStoreId)) {
                refetchKeyCollection(innerDispatch, a)
              }
            }
          })
          refetchRelationCollections(dispatch)
        } catch {
          // Mutation failed — cache stays stale until next refetch
        }
      }
    },

    // Invalidation rather than a hand patch, as for the sub groups below: which view and page a
    // restored key lands on, and what each total becomes, are the server's decisions.
    classificationStoreConfigurationKeyRestore: {
      invalidatesTags: ['Classification Store']
    },

    // ─── Key-Group Relations ──────────────────────────────────────────────────

    classificationStoreConfigurationKeyGroupRelationCollection: {
      providesTags: ['Classification Store'],
      // Registered while in flight so a key deleted meanwhile cannot be written back by the
      // pre-delete answer: the entry is re-read once it has landed.
      async onQueryStarted (args, { dispatch, queryFulfilled }) {
        const read: RelationCollectionRead = { deleted: new Set() }
        relationCollectionReads.add(read)
        try {
          await queryFulfilled
        } catch {
          // Nothing was written, so there is nothing to undo.
        } finally {
          relationCollectionReads.delete(read)
          if (read.deleted.size > 0) refetchRelationCollection(dispatch, args)
        }
      }
    },

    // ─── Sub groups ───────────────────────────────────────────────────────────
    // Defined by the generated slice since the 2026-11-05 snapshot refresh; only the
    // cache rules are ours. They are invalidations rather than hand patches: which page a
    // sub group lands on, which cached searches it belongs to and what each total becomes
    // are the server's decisions, and patching them corrupted pages, searches and totals.
    classificationStoreConfigurationSubGroupCollection: {
      providesTags: ['Classification Store']
    },
    classificationStoreConfigurationSubGroupCreate: {
      invalidatesTags: ['Classification Store']
    },
    classificationStoreConfigurationSubGroupUpdate: {
      invalidatesTags: ['Classification Store']
    },
    classificationStoreConfigurationSubGroupDelete: {
      invalidatesTags: ['Classification Store']
    },

    // create is also used as upsert (update mandatory/sorter) — patch cache in-place
    classificationStoreConfigurationKeyGroupRelationCreate: {
      invalidatesTags: () => [],
      async onQueryStarted (args, { dispatch, queryFulfilled }) {
        const create: ClassificationStoreConfigurationKeyGroupRelationCreate =
          args.classificationStoreConfigurationKeyGroupRelationCreate
        const { keyId, groupId, sorter, mandatory } = create
        // Only what the payload carries is patched (sorter, mandatory, subGroup, definitionOverride).
        // An absent property means "leave the stored value alone" to the server, so patching it
        // would blank the cell it belongs to for the length of the request — a sub-group
        // assignment carries neither sorter nor mandatory.
        // null as well as undefined: the refreshed contract types both as
        // `AbsentValue::ABSENT`, and the server reads either as "leave the stored
        // value alone". Patching a null would blank the cached cell instead.
        const absentSafePatch = {
          ...(sorter !== undefined && sorter !== null ? { sorter } : {}),
          ...(mandatory !== undefined && mandatory !== null ? { mandatory } : {}),
          ...(create.subGroup !== undefined ? { subGroup: create.subGroup ?? null } : {}),
          // An explicit null clears the stored override, so it is a value to patch, as subGroup is.
          ...(create.definitionOverride !== undefined ? { definitionOverride: create.definitionOverride ?? null } : {})
        }
        // Cache entries are keyed by groupId — only patch entries for the affected group,
        // otherwise the new relation gets pushed into every other group's cache too.
        const matchesGroup = (a: ClassificationStoreConfigurationKeyGroupRelationCollectionApiArg): boolean => a.groupId === groupId
        // The cache entries this request inserted the row into, which decides how the response is
        // confirmed below: a row this request brought into being has nothing older to preserve.
        //
        // Per entry and not per request. The group is paged, so several pages of it can be cached
        // at once and a relation that already sits on page 1 is simply absent from page 2. A
        // single flag let that page-local miss count as an insertion for every entry, and the
        // confirmation then replaced the whole page-1 row — writing back the `subGroup` an older
        // cell edit's response had never named, which is the exact staleness the field mask below
        // exists to prevent.
        const overrideOnly = create.definitionOverride !== undefined && create.subGroup === undefined &&
          (sorter === undefined || sorter === null) && (mandatory === undefined || mandatory === null)
        const createdIn = new Set<string>()
        const patchResults = optimisticPatchAllCacheEntries<
          ClassificationStoreConfigurationKeyGroupRelationCollectionApiResponse,
          ClassificationStoreConfigurationKeyGroupRelationCollectionApiArg
        >(
          dispatch,
          'classificationStoreConfigurationKeyGroupRelationCollection',
          (draft, cacheKey) => {
            const idx = draft.items.findIndex((r) => r.keyId === keyId && r.groupId === groupId)
            if (idx !== -1) {
              // Upsert — update in-place whatever the payload named. Assigned onto the existing
              // row rather than replacing it, for the same reason the key update above is: the
              // inverse patches then name only the members this request wrote, so rolling back a
              // request that failed after a later one succeeded cannot undo the later one. The
              // two surfaces here write disjoint members, so a whole-row rollback took the field
              // mask below apart — a failed sorter edit restored the sub group an assignment had
              // already saved.
              Object.assign(draft.items[idx], absentSafePatch)
            } else if (!overrideOnly) {
              // An override is only ever written from an existing row, so an entry that does not
              // hold the pair (another page of the group) has nothing to patch and must not gain one;
              // only the other writes create the relation.
              // New relation — keyName/keyDescription/groupName filled in by server overwrite
              // below, and an absent sorter or mandatory takes the value the server gives a new
              // relation rather than leaving the cached row without one.
              createdIn.add(cacheKey)
              draft.items.push({
                keyId,
                groupId,
                sorter: sorter ?? 0,
                mandatory: mandatory ?? false,
                keyName: null,
                keyDescription: null,
                groupName: null,
                subGroup: create.subGroup ?? null
              })
              draft.totalItems += 1
            }
          },
          matchesGroup
        )
        try {
          const { data } = await queryFulfilled
          // The response carries `subGroup`, which the generated detail predates — the same
          // shadow the rest of this hand-written block applies, and gone with it on the next
          // regeneration.
          const updated = data as ClassificationStoreConfigurationKeyGroupRelationDetail
          // The response is confirmed through the same field mask the optimistic patch used,
          // taking the server's own value for each field this request named. Replacing the whole
          // row instead would write back the fields it did NOT name as the server held them while
          // it ran, so a cell edit started before a sub-group assignment and answered after it
          // restored the old `subGroup` — the server kept the assignment while the cache, the
          // headings and the chips went stale with no way back short of a refetch.
          const confirmed = {
            ...(sorter !== undefined ? { sorter: updated.sorter } : {}),
            ...(mandatory !== undefined ? { mandatory: updated.mandatory } : {}),
            ...(create.subGroup !== undefined ? { subGroup: updated.subGroup ?? null } : {}),
            ...(create.definitionOverride !== undefined ? { definitionOverride: updated.definitionOverride ?? null } : {})
          }
          patchAllCacheEntries<
            ClassificationStoreConfigurationKeyGroupRelationCollectionApiResponse,
            ClassificationStoreConfigurationKeyGroupRelationCollectionApiArg
          >(
            dispatch,
            'classificationStoreConfigurationKeyGroupRelationCollection',
            (draft, cacheKey) => {
              const idx = draft.items.findIndex(
                (r) => r.keyId === updated.keyId && r.groupId === updated.groupId
              )
              if (idx === -1) return

              draft.items[idx] = createdIn.has(cacheKey)
                // A relation this request created has no older state to keep, and its sorter and
                // mandatory are whatever the server gave it. Only in the entries that actually
                // inserted it: an entry that already held the row keeps the field mask.
                ? updated
                : {
                    ...draft.items[idx],
                    // Descriptive fields the server fills in and no mutation writes, so the
                    // response is always the freshest value there is.
                    keyName: updated.keyName,
                    keyDescription: updated.keyDescription,
                    groupName: updated.groupName,
                    ...confirmed
                  }
            },
            matchesGroup
          )
        } catch {
          patchResults.forEach((r) => { r.undo() })
        }
      }
    },

    classificationStoreConfigurationKeyGroupRelationDelete: {
      invalidatesTags: () => [],
      async onQueryStarted (args, { dispatch, queryFulfilled }) {
        const { keyId, groupId } = args.classificationStoreConfigurationKeyGroupRelationDelete
        const patchResults = optimisticPatchAllCacheEntries<ClassificationStoreConfigurationKeyGroupRelationCollectionApiResponse>(
          dispatch,
          'classificationStoreConfigurationKeyGroupRelationCollection',
          (draft) => {
            const idx = draft.items.findIndex((r) => r.keyId === keyId && r.groupId === groupId)
            if (idx !== -1) {
              draft.items.splice(idx, 1)
              draft.totalItems = Math.max(0, draft.totalItems - 1)
            }
          }
        )
        try {
          await queryFulfilled
        } catch {
          patchResults.forEach((r) => { r.undo() })
        }
      }
    },

    // ─── Collection-Group Relations ───────────────────────────────────────────

    classificationStoreConfigurationCollectionRelationCollection: {
      providesTags: ['Classification Store']
    },

    // create is also used as upsert (update sorter) — patch cache in-place
    classificationStoreConfigurationCollectionRelationCreate: {
      invalidatesTags: () => [],
      async onQueryStarted (args, { dispatch, queryFulfilled }) {
        const { colId, groupId, sorter } = args.classificationStoreConfigurationCollectionRelationCreate
        // Cache entries are keyed by colId — only patch entries for the affected collection,
        // otherwise the new relation gets pushed into every other collection's cache too.
        const matchesCollection = (a: ClassificationStoreConfigurationCollectionRelationCollectionApiArg): boolean => a.colId === colId
        const patchResults = optimisticPatchAllCacheEntries<
          ClassificationStoreConfigurationCollectionRelationCollectionApiResponse,
          ClassificationStoreConfigurationCollectionRelationCollectionApiArg
        >(
          dispatch,
          'classificationStoreConfigurationCollectionRelationCollection',
          (draft) => {
            const idx = draft.items.findIndex((r) => r.colId === colId && r.groupId === groupId)
            if (idx !== -1) {
              // Upsert — update sorter in-place
              draft.items[idx] = { ...draft.items[idx], sorter }
            } else {
              // New relation — groupName/groupDescription filled in by server overwrite below
              draft.items.push({ id: '', colId, groupId, sorter, groupName: null, groupDescription: null })
              draft.totalItems += 1
            }
          },
          matchesCollection
        )
        try {
          const { data: updated } = await queryFulfilled
          patchAllCacheEntries<
            ClassificationStoreConfigurationCollectionRelationCollectionApiResponse,
            ClassificationStoreConfigurationCollectionRelationCollectionApiArg
          >(
            dispatch,
            'classificationStoreConfigurationCollectionRelationCollection',
            (draft) => {
              const idx = draft.items.findIndex(
                (r) => r.colId === updated.colId && r.groupId === updated.groupId
              )
              if (idx !== -1) draft.items[idx] = updated
            },
            matchesCollection
          )
        } catch {
          patchResults.forEach((r) => { r.undo() })
        }
      }
    },

    classificationStoreConfigurationCollectionRelationDelete: {
      invalidatesTags: () => [],
      async onQueryStarted (args, { dispatch, queryFulfilled }) {
        const { colId, groupId } = args.classificationStoreConfigurationCollectionRelationDelete
        const patchResults = optimisticPatchAllCacheEntries<ClassificationStoreConfigurationCollectionRelationCollectionApiResponse>(
          dispatch,
          'classificationStoreConfigurationCollectionRelationCollection',
          (draft) => {
            const idx = draft.items.findIndex((r) => r.colId === colId && r.groupId === groupId)
            if (idx !== -1) {
              draft.items.splice(idx, 1)
              draft.totalItems = Math.max(0, draft.totalItems - 1)
            }
          }
        )
        try {
          await queryFulfilled
        } catch {
          patchResults.forEach((r) => { r.undo() })
        }
      }
    }
  }
})

export type * from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice.gen'

export const {
  // Listing queries (formerly mutations)
  useClassificationStoreConfigurationCollectionCollectionQuery,
  useClassificationStoreConfigurationGroupCollectionQuery,
  useClassificationStoreConfigurationKeyCollectionQuery,
  useClassificationStoreConfigurationKeyGroupRelationCollectionQuery,
  useClassificationStoreConfigurationCollectionRelationCollectionQuery,
  // CRUD mutations — groups
  useClassificationStoreConfigurationGroupCreateMutation,
  useClassificationStoreConfigurationGroupUpdateMutation,
  useClassificationStoreConfigurationGroupDeleteMutation,
  // CRUD mutations — collections
  useClassificationStoreConfigurationCollectionCreateMutation,
  useClassificationStoreConfigurationCollectionUpdateMutation,
  useClassificationStoreConfigurationCollectionDeleteMutation,
  // CRUD mutations — keys
  useClassificationStoreConfigurationKeyCreateMutation,
  useClassificationStoreConfigurationKeyDeleteMutation,
  useClassificationStoreConfigurationKeyRestoreMutation,
  // CRUD mutations — key-group relations
  useClassificationStoreConfigurationKeyGroupRelationDeleteMutation,
  // CRUD mutations — collection-group relations
  useClassificationStoreConfigurationCollectionRelationCreateMutation,
  useClassificationStoreConfigurationCollectionRelationDeleteMutation,
  // Sub groups
  useClassificationStoreConfigurationSubGroupCollectionQuery,
  useClassificationStoreConfigurationSubGroupCreateMutation,
  useClassificationStoreConfigurationSubGroupUpdateMutation,
  useClassificationStoreConfigurationSubGroupDeleteMutation,
  // Store / other queries (unchanged)
  useClassificationStoreConfigurationStoreTreeQuery,
  useClassificationStoreConfigurationStoreCreateMutation,
  useClassificationStoreConfigurationStoreUpdateMutation,
  useClassificationStoreGetCollectionsQuery,
  useClassificationStoreGetGroupsQuery,
  useClassificationStoreGetKeyGroupRelationsQuery,
  useClassificationStoreGetLayoutByCollectionQuery,
  useLazyClassificationStoreGetLayoutByCollectionQuery,
  useClassificationStoreGetLayoutByGroupQuery,
  useLazyClassificationStoreGetLayoutByGroupQuery,
  useClassificationStoreGetLayoutByKeyQuery,
  useLazyClassificationStoreGetLayoutByKeyQuery
} = api

/**
 * The create-or-upsert hook, typed to take the payload the shipped `KeyGroupRelationCreate`
 * declares: every property but the pair optional, an absent one keeping its stored value. Only
 * the argument is shadowed — the generated slice still requires `sorter` and `mandatory`, which
 * it carried before they became `AbsentValue::ABSENT` defaults. Done here once so no call site
 * has to cast, and removed with the rest of the hand-written block on the next regeneration.
 *
 * It is the generated hook itself, re-typed rather than wrapped: a zero-argument wrapper dropped
 * the hook's own options, so no caller could pass `fixedCacheKey` or `selectFromResult` any more
 * and a JavaScript caller had them silently ignored. `TypedUseMutation` is the shape the generated
 * hook already has, so the options parameter and the `selectFromResult` return typing stay the
 * generated ones and only the trigger's payload type differs.
 */
export const useClassificationStoreConfigurationKeyGroupRelationCreateMutation =
  api.useClassificationStoreConfigurationKeyGroupRelationCreateMutation as unknown as TypedUseMutation<
    ClassificationStoreConfigurationKeyGroupRelationDetail,
    { classificationStoreConfigurationKeyGroupRelationCreate: ClassificationStoreConfigurationKeyGroupRelationCreate },
    BaseQuery
  >

/**
 * The key update hook, re-typed to take the `localized` tri-state the shipped payload declares.
 * Re-typed rather than wrapped for the same reason as the hook above: a wrapper drops the hook's
 * own options. Removed with the rest of the hand-written block on the next regeneration.
 */
export const useClassificationStoreConfigurationKeyUpdateMutation =
  api.useClassificationStoreConfigurationKeyUpdateMutation as unknown as TypedUseMutation<
    ClassificationStoreConfigurationKeyDetail,
    ClassificationStoreConfigurationKeyUpdateApiArg,
    BaseQuery
  >

export { api }
