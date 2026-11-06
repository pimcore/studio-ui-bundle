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
  type ClassificationStoreConfigurationGroupCollectionApiResponse,
  type ClassificationStoreConfigurationCollectionCollectionApiResponse,
  type ClassificationStoreConfigurationKeyCollectionApiResponse,
  type ClassificationStoreConfigurationKeyGroupRelationCollectionApiArg,
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
 */
export type ClassificationStoreKeyDefinition = object & {
  /** Whether this key reaches the Classification Store search index */
  indexed?: boolean
}

/** A key, whose definition blob carries the Classification Store index flag. */
export interface ClassificationStoreConfigurationKeyDetail extends Omit<GeneratedKeyDetail, 'definition'> {
  /** Definition of the key */
  definition: ClassificationStoreKeyDefinition | null
}

/** The key update payload, whose definition blob carries the Classification Store index flag. */
export interface ClassificationStoreConfigurationKeyUpdate extends Omit<GeneratedKeyUpdate, 'definition'> {
  /** Values for object brick definition metadata */
  definition: ClassificationStoreKeyDefinition | null
}

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
}

export interface ClassificationStoreGroupLayout2 extends GeneratedGroupLayout {
  keys: ClassificationStoreCollection2[]
  /** Sub groups the keys of this group are assigned to, ordered by their first key */
  subGroups?: ClassificationStoreSubGroupLayout[]
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
      if (argFilter !== undefined && !argFilter(qs.originalArgs as A)) continue
      try {
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

const api = baseApi.enhanceEndpoints({
  endpoints: {

    // ─── Groups ──────────────────────────────────────────────────────────────

    classificationStoreConfigurationGroupCollection: {
      providesTags: ['Classification Store']
    },

    classificationStoreConfigurationGroupUpdate: {
      invalidatesTags: () => [],
      async onQueryStarted (args, { dispatch, queryFulfilled }) {
        const patchResults = optimisticPatchAllCacheEntries<ClassificationStoreConfigurationGroupCollectionApiResponse>(
          dispatch,
          'classificationStoreConfigurationGroupCollection',
          (draft) => {
            const idx = draft.items.findIndex((g) => g.id === args.id)
            if (idx !== -1) {
              const update = args.classificationStoreConfigurationGroupUpdate
              draft.items[idx] = { ...draft.items[idx], ...update }
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
              if (idx !== -1) draft.items[idx] = updated
            }
          )
        } catch {
          patchResults.forEach((r) => { r.undo() })
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
        const patchResults = optimisticPatchAllCacheEntries<ClassificationStoreConfigurationCollectionCollectionApiResponse>(
          dispatch,
          'classificationStoreConfigurationCollectionCollection',
          (draft) => {
            const idx = draft.items.findIndex((c) => c.id === args.id)
            if (idx !== -1) {
              const update = args.classificationStoreConfigurationCollectionUpdate
              draft.items[idx] = { ...draft.items[idx], ...update }
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
              if (idx !== -1) draft.items[idx] = updated
            }
          )
        } catch {
          patchResults.forEach((r) => { r.undo() })
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
      providesTags: ['Classification Store']
    },

    classificationStoreConfigurationKeyUpdate: {
      invalidatesTags: () => [],
      async onQueryStarted (args, { dispatch, queryFulfilled }) {
        // Optimistically apply the update payload to the cache immediately so the
        // UI reflects the change without waiting for the server round-trip.
        const patchResults = optimisticPatchAllCacheEntries<ClassificationStoreConfigurationKeyCollectionApiResponse>(
          dispatch,
          'classificationStoreConfigurationKeyCollection',
          (draft) => {
            const idx = draft.items.findIndex((k) => k.id === args.id)
            if (idx !== -1) {
              const update = args.classificationStoreConfigurationKeyUpdate
              draft.items[idx] = {
                ...draft.items[idx],
                name: update.name,
                // A null title means "leave the stored one alone" to the server, just like a
                // null type does, so writing it into the cache would blank the Title cell
                // for the length of the request and let it come back with the response.
                ...(update.title !== undefined && update.title !== null ? { title: update.title } : {}),
                ...(update.type !== undefined && update.type !== null ? { type: update.type } : {}),
                // `description` is optional in the payload now, so an absent one must not be
                // written: it would blank the cached cell for the length of the request.
                ...(update.description !== undefined ? { description: update.description } : {})
                // `definition` intentionally excluded: a null definition means "leave the stored
                // one alone" to the server, so spreading it would wipe the cached definition.
              }
            }
          }
        )

        try {
          // Once confirmed, overwrite with the canonical server-returned value.
          const { data: updated } = await queryFulfilled
          patchAllCacheEntries<ClassificationStoreConfigurationKeyCollectionApiResponse>(
            dispatch,
            'classificationStoreConfigurationKeyCollection',
            (draft) => {
              const idx = draft.items.findIndex((k) => k.id === updated.id)
              if (idx !== -1) draft.items[idx] = updated
            }
          )
        } catch {
          // Server rejected — roll back all optimistic patches.
          patchResults.forEach((r) => { r.undo() })
        }
      }
    },

    classificationStoreConfigurationKeyDelete: {
      invalidatesTags: () => [],
      async onQueryStarted (args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          patchAllCacheEntries<ClassificationStoreConfigurationKeyCollectionApiResponse>(
            dispatch,
            'classificationStoreConfigurationKeyCollection',
            (draft) => {
              draft.items = draft.items.filter((k) => k.id !== args.id)
              draft.totalItems = Math.max(0, draft.totalItems - 1)
            }
          )
        } catch {
          // Mutation failed — cache stays stale until next refetch
        }
      }
    },

    // ─── Key-Group Relations ──────────────────────────────────────────────────

    classificationStoreConfigurationKeyGroupRelationCollection: {
      providesTags: ['Classification Store']
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
        // Only what the payload carries is patched. An absent property means "leave the stored
        // value alone" to the server, so patching it would blank the cell it belongs to for the
        // length of the request — a sub-group assignment carries neither sorter nor mandatory.
        // null as well as undefined: the refreshed contract types both as
        // `AbsentValue::ABSENT`, and the server reads either as "leave the stored
        // value alone". Patching a null would blank the cached cell instead.
        const absentSafePatch = {
          ...(sorter !== undefined && sorter !== null ? { sorter } : {}),
          ...(mandatory !== undefined && mandatory !== null ? { mandatory } : {}),
          ...('subGroup' in create ? { subGroup: create.subGroup ?? null } : {})
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
              // Upsert — update in-place whatever the payload named
              draft.items[idx] = { ...draft.items[idx], ...absentSafePatch }
            } else {
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
            ...('subGroup' in create ? { subGroup: updated.subGroup ?? null } : {})
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
  useClassificationStoreConfigurationKeyUpdateMutation,
  useClassificationStoreConfigurationKeyDeleteMutation,
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

export { api }
