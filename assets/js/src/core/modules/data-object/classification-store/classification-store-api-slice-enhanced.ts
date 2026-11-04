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
  type ClassificationStoreConfigurationKeyGroupRelationDetail as GeneratedKeyGroupRelationDetail
} from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice.gen'

const CONFIGURATION_PREFIX = '/pimcore-studio/api/classification-store/configuration'

// ─── Hand-written sub-group contract ────────────────────────────────────────────
// The sub-group endpoints and the `subGroup` field shipped after this client was last
// generated. Each declaration below either adds a name the generated slice does not carry
// or shadows a generated one, so the next regeneration supersedes this block by deleting it.

export interface ClassificationStoreConfigurationSubGroupDetail {
  /** AdditionalAttributes */
  additionalAttributes?: {
    [key: string]: string | number | boolean | object
  }
  /** ID of the sub group */
  id: number
  /** Generated identifier of the sub group, the value a key-group relation stores */
  identifier: string
  /** Name of the sub group */
  name: string
  /** ID of the store this sub group belongs to */
  storeId: number
  /** Description of the sub group */
  description: string | null
  /** Creation date as Unix timestamp */
  creationDate: number | null
  /** Modification date as Unix timestamp */
  modificationDate: number | null
}

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
export interface ClassificationStoreConfigurationKeyGroupRelationCreate
  extends Omit<GeneratedKeyGroupRelationCreate, 'sorter' | 'mandatory'> {
  /** Sort order of the relation. Omitting it keeps the stored one, 0 on a new relation */
  sorter?: number
  /** Whether the key is mandatory here. Omitting it keeps the stored flag, false if new */
  mandatory?: boolean
  /** Identifier of the sub group to assign the key to in this group */
  subGroup?: string | null
}

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

// Helper: scan all active query cache entries for a given endpoint name and patch each one
type PatchFn<T> = (draft: T) => void
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
        innerDispatch(baseApi.util.updateQueryData(endpointName, qs.originalArgs, patch))
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
        const result = innerDispatch(baseApi.util.updateQueryData(endpointName, qs.originalArgs, patch))
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
                description: update.description
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
        const absentSafePatch = {
          ...(sorter !== undefined ? { sorter } : {}),
          ...(mandatory !== undefined ? { mandatory } : {}),
          ...('subGroup' in create ? { subGroup: create.subGroup ?? null } : {})
        }
        // Cache entries are keyed by groupId — only patch entries for the affected group,
        // otherwise the new relation gets pushed into every other group's cache too.
        const matchesGroup = (a: ClassificationStoreConfigurationKeyGroupRelationCollectionApiArg): boolean => a.groupId === groupId
        const patchResults = optimisticPatchAllCacheEntries<
          ClassificationStoreConfigurationKeyGroupRelationCollectionApiResponse,
          ClassificationStoreConfigurationKeyGroupRelationCollectionApiArg
        >(
          dispatch,
          'classificationStoreConfigurationKeyGroupRelationCollection',
          (draft) => {
            const idx = draft.items.findIndex((r) => r.keyId === keyId && r.groupId === groupId)
            if (idx !== -1) {
              // Upsert — update in-place whatever the payload named
              draft.items[idx] = { ...draft.items[idx], ...absentSafePatch }
            } else {
              // New relation — keyName/keyDescription/groupName filled in by server overwrite
              // below, and an absent sorter or mandatory takes the value the server gives a new
              // relation rather than leaving the cached row without one.
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
          const { data: updated } = await queryFulfilled
          patchAllCacheEntries<
            ClassificationStoreConfigurationKeyGroupRelationCollectionApiResponse,
            ClassificationStoreConfigurationKeyGroupRelationCollectionApiArg
          >(
            dispatch,
            'classificationStoreConfigurationKeyGroupRelationCollection',
            (draft) => {
              const idx = draft.items.findIndex(
                (r) => r.keyId === updated.keyId && r.groupId === updated.groupId
              )
              if (idx !== -1) draft.items[idx] = updated
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
}).injectEndpoints({
  endpoints: (build) => ({

    // ─── Sub groups ───────────────────────────────────────────────────────────

    classificationStoreConfigurationSubGroupCollection: build.query<
      ClassificationStoreConfigurationSubGroupCollectionApiResponse,
      ClassificationStoreConfigurationSubGroupCollectionApiArg
    >({
      query: (queryArg) => ({
        url: `${CONFIGURATION_PREFIX}/stores/${queryArg.storeId}/sub-groups`,
        method: 'POST',
        body: queryArg.body
      }),
      providesTags: ['Classification Store']
    }),

    classificationStoreConfigurationSubGroupCreate: build.mutation<
      ClassificationStoreConfigurationSubGroupDetail,
      ClassificationStoreConfigurationSubGroupCreateApiArg
    >({
      query: (queryArg) => ({
        url: `${CONFIGURATION_PREFIX}/sub-groups/add`,
        method: 'POST',
        body: queryArg.classificationStoreConfigurationSubGroupCreate
      }),
      // Invalidated rather than hand-patched. Which page a new sub group lands on, whether it
      // matches a cached search and what each cached total becomes are all decided by the
      // server's own filtering and ordering, so appending the row to every cached entry
      // duplicated it across visited pages and corrupted filtered totals.
      invalidatesTags: ['Classification Store']
    }),

    classificationStoreConfigurationSubGroupUpdate: build.mutation<
      ClassificationStoreConfigurationSubGroupDetail,
      ClassificationStoreConfigurationSubGroupUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `${CONFIGURATION_PREFIX}/sub-groups/${queryArg.id}`,
        method: 'PUT',
        body: queryArg.classificationStoreConfigurationSubGroupUpdate
      }),
      // Invalidated rather than hand-patched. A rename changes which cached searches the row
      // belongs to and where the server sorts it, so patching the rows already present left a
      // renamed sub group sitting in a search for its old name and absent from one for its new.
      invalidatesTags: ['Classification Store']
    }),

    classificationStoreConfigurationSubGroupDelete: build.mutation<
      unknown,
      ClassificationStoreConfigurationSubGroupDeleteApiArg
    >({
      query: (queryArg) => ({
        url: `${CONFIGURATION_PREFIX}/sub-groups/${queryArg.id}`,
        method: 'DELETE'
      }),
      // Invalidated rather than hand-patched. The decrement was applied to every cached
      // sub-group collection, including other stores and searches that never held the row, so
      // a delete in one store shrank another store's pagination total while its rows stayed.
      invalidatesTags: ['Classification Store']
    })
  }),
  overrideExisting: false
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

type GeneratedKeyGroupRelationCreateTrigger =
  ReturnType<typeof api.useClassificationStoreConfigurationKeyGroupRelationCreateMutation>[0]

/**
 * The create-or-upsert trigger, taking the payload the shipped `KeyGroupRelationCreate`
 * declares: every property but the pair optional, an absent one keeping its stored value. Only
 * the argument is shadowed — the generated slice still requires `sorter` and `mandatory`, which
 * it carried before they became `AbsentValue::ABSENT` defaults. Done here once so no call site
 * has to cast, and removed with the rest of the hand-written block on the next regeneration.
 */
export const useClassificationStoreConfigurationKeyGroupRelationCreateMutation = (): [
  (arg: {
    classificationStoreConfigurationKeyGroupRelationCreate: ClassificationStoreConfigurationKeyGroupRelationCreate
  }) => ReturnType<GeneratedKeyGroupRelationCreateTrigger>,
  ReturnType<typeof api.useClassificationStoreConfigurationKeyGroupRelationCreateMutation>[1]
] => {
  const [trigger, state] = api.useClassificationStoreConfigurationKeyGroupRelationCreateMutation()

  return [trigger, state]
}

export { api }
