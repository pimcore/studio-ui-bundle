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
  type ClassificationStoreConfigurationKeyGroupRelationCollectionApiResponse,
  type ClassificationStoreConfigurationKeyGroupRelationCollectionApiArg,
  type ClassificationStoreConfigurationCollectionRelationCollectionApiResponse,
  type ClassificationStoreConfigurationCollectionRelationCollectionApiArg,
  type ClassificationStoreConfigurationGroupCollectionApiArg,
  type ClassificationStoreConfigurationCollectionCollectionApiArg,
  type ClassificationStoreConfigurationKeyCollectionApiArg
} from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice.gen'
import { emitClassificationStoreConfigurationChange } from './classification-store-configuration-change'

// Helper: scan all active query cache entries for a given endpoint name and patch each one
type PatchFn<T, A = unknown> = (draft: T, args: A) => void
interface PatchResult { undo: () => void }

function patchAllCacheEntries<T, A = unknown> (
  dispatch: (thunk: any) => void,
  endpointName: string,
  patch: PatchFn<T, A>,
  argFilter?: (args: A, data: any) => boolean
): void {
  // Accessing internal RTK Query store state to fan-out cache patches across all pages
  dispatch((innerDispatch: unknown, getState: () => unknown) => {
    const state = getState() as Record<string, unknown>
    const queries = (state.api as Record<string, unknown>)?.queries as Record<string, unknown> ?? {}

    for (const [queryKey, queryState] of Object.entries(queries)) {
      if (!queryKey.startsWith(`${endpointName}(`)) continue
      const qs = queryState as { originalArgs: unknown, data?: unknown }
      if (argFilter !== undefined && !argFilter(qs.originalArgs as A, qs.data)) continue
      try {
        // @ts-expect-error — dynamic endpoint name not in the union
        innerDispatch(baseApi.util.updateQueryData(endpointName, qs.originalArgs, (draft: T) => { patch(draft, qs.originalArgs as A) }))
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
  patch: PatchFn<T, A>,
  argFilter?: (args: A, data: any) => boolean
): PatchResult[] {
  const results: PatchResult[] = []

  dispatch((innerDispatch: (action: unknown) => PatchResult, getState: () => unknown) => {
    const state = getState() as Record<string, unknown>
    const queries = (state.api as Record<string, unknown>)?.queries as Record<string, unknown> ?? {}

    for (const [queryKey, queryState] of Object.entries(queries)) {
      if (!queryKey.startsWith(`${endpointName}(`)) continue
      const qs = queryState as { originalArgs: unknown, data?: unknown }
      if (argFilter !== undefined && !argFilter(qs.originalArgs as A, qs.data)) continue
      try {
        // @ts-expect-error — dynamic endpoint name not in the union
        const result = innerDispatch(baseApi.util.updateQueryData(endpointName, qs.originalArgs, (draft: T) => { patch(draft, qs.originalArgs as A) }))
        results.push(result)
      } catch {
        // Cache entry may have been garbage-collected — safe to ignore
      }
    }
  })

  return results
}

interface CachedPage { items: Array<Record<string, unknown>>, totalItems: number }
interface PagedArgs { body?: { filters?: { page?: number, pageSize?: number, columnFilters?: object } } }

// Delete handlers: the delete call only carries the row id, so only the cached pages that hold the row
// are patched; an entry that never held it (another store, a filtered search) keeps its items and its total.
const holdsRow = (rowId: number) => (_args: unknown, data: CachedPage | undefined): boolean => data?.items?.some((row) => row.id === rowId) === true

// A created relation is appended. Every unfiltered page of the group counts it (its total grows, so the
// pagination can reach it); only the last page, while it has room left, also receives the row itself.
// A filtered page cannot tell whether the row matches and is left for a refetch.
const isUnfilteredPage = (args: PagedArgs, data: CachedPage | undefined): boolean => {
  if (data?.items === undefined) return false

  return Object.keys(args.body?.filters?.columnFilters ?? {}).length === 0
}

const isLastPageWithRoom = (args: PagedArgs, draft: CachedPage): boolean => {
  const pageSize = args.body?.filters?.pageSize
  if (pageSize === undefined) return true
  const offset = ((args.body?.filters?.page ?? 1) - 1) * pageSize

  return draft.items.length < pageSize && draft.totalItems <= offset + pageSize
}

// Configuration mutations refetch nothing: the config grids are patched in place, and an open object
// editor is told through emitClassificationStoreConfigurationChange once the mutation is confirmed.
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
          emitClassificationStoreConfigurationChange()
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
          patchAllCacheEntries<ClassificationStoreConfigurationGroupCollectionApiResponse, ClassificationStoreConfigurationGroupCollectionApiArg>(
            dispatch,
            'classificationStoreConfigurationGroupCollection',
            (draft) => {
              const before = draft.items.length
              draft.items = draft.items.filter((g) => g.id !== args.id)
              draft.totalItems = Math.max(0, draft.totalItems - (before - draft.items.length))
            },
            holdsRow(args.id)
          )
          emitClassificationStoreConfigurationChange()
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
          emitClassificationStoreConfigurationChange()
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
          patchAllCacheEntries<ClassificationStoreConfigurationCollectionCollectionApiResponse, ClassificationStoreConfigurationCollectionCollectionApiArg>(
            dispatch,
            'classificationStoreConfigurationCollectionCollection',
            (draft) => {
              const before = draft.items.length
              draft.items = draft.items.filter((c) => c.id !== args.id)
              draft.totalItems = Math.max(0, draft.totalItems - (before - draft.items.length))
            },
            holdsRow(args.id)
          )
          emitClassificationStoreConfigurationChange()
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
                ...(update.type !== undefined && update.type !== null ? { type: update.type } : {}),
                description: update.description
                // `definition` intentionally excluded: it lives inside definition.title on KeyDetail,
                // spreading definition: null would wipe the visible title during the optimistic window.
                // `title` intentionally excluded: it does not exist as a top-level field on KeyDetail.
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
          emitClassificationStoreConfigurationChange()
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
          patchAllCacheEntries<ClassificationStoreConfigurationKeyCollectionApiResponse, ClassificationStoreConfigurationKeyCollectionApiArg>(
            dispatch,
            'classificationStoreConfigurationKeyCollection',
            (draft) => {
              const before = draft.items.length
              draft.items = draft.items.filter((k) => k.id !== args.id)
              draft.totalItems = Math.max(0, draft.totalItems - (before - draft.items.length))
            },
            holdsRow(args.id)
          )
          emitClassificationStoreConfigurationChange()
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
        const { keyId, groupId, sorter, mandatory } = args.classificationStoreConfigurationKeyGroupRelationCreate
        // Cache entries are keyed by groupId — only patch entries for the affected group,
        // otherwise the new relation gets pushed into every other group's cache too.
        // The new row additionally goes only into the page that would show it; an entry that already holds
        // the relation (upsert) is patched wherever it is.
        const holdsRelation = (data: CachedPage | undefined): boolean => data?.items?.some((r) => r.keyId === keyId && r.groupId === groupId) === true
        const matchesGroup = (a: ClassificationStoreConfigurationKeyGroupRelationCollectionApiArg): boolean => a.groupId === groupId
        const matchesPatchTarget = (a: ClassificationStoreConfigurationKeyGroupRelationCollectionApiArg, data: CachedPage | undefined): boolean => matchesGroup(a) && (holdsRelation(data) || isUnfilteredPage(a, data))
        const patchResults = optimisticPatchAllCacheEntries<
          ClassificationStoreConfigurationKeyGroupRelationCollectionApiResponse,
          ClassificationStoreConfigurationKeyGroupRelationCollectionApiArg
        >(
          dispatch,
          'classificationStoreConfigurationKeyGroupRelationCollection',
          (draft, entryArgs) => {
            const idx = draft.items.findIndex((r) => r.keyId === keyId && r.groupId === groupId)
            if (idx !== -1) {
              // Upsert — update mandatory/sorter in-place
              draft.items[idx] = { ...draft.items[idx], sorter, mandatory }
            } else {
              // New relation — keyName/keyDescription/groupName filled in by server overwrite below
              if (isLastPageWithRoom(entryArgs, draft)) {
                draft.items.push({ keyId, groupId, sorter, mandatory, keyName: null, keyDescription: null, groupName: null })
              }
              draft.totalItems += 1
            }
          },
          matchesPatchTarget
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
          emitClassificationStoreConfigurationChange()
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
          emitClassificationStoreConfigurationChange()
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
        const holdsRelation = (data: CachedPage | undefined): boolean => data?.items?.some((r) => r.colId === colId && r.groupId === groupId) === true
        const matchesCollection = (a: ClassificationStoreConfigurationCollectionRelationCollectionApiArg): boolean => a.colId === colId
        const matchesPatchTarget = (a: ClassificationStoreConfigurationCollectionRelationCollectionApiArg, data: CachedPage | undefined): boolean => matchesCollection(a) && (holdsRelation(data) || isUnfilteredPage(a, data))
        const patchResults = optimisticPatchAllCacheEntries<
          ClassificationStoreConfigurationCollectionRelationCollectionApiResponse,
          ClassificationStoreConfigurationCollectionRelationCollectionApiArg
        >(
          dispatch,
          'classificationStoreConfigurationCollectionRelationCollection',
          (draft, entryArgs) => {
            const idx = draft.items.findIndex((r) => r.colId === colId && r.groupId === groupId)
            if (idx !== -1) {
              // Upsert — update sorter in-place
              draft.items[idx] = { ...draft.items[idx], sorter }
            } else {
              // New relation — groupName/groupDescription filled in by server overwrite below
              if (isLastPageWithRoom(entryArgs, draft)) {
                draft.items.push({ id: '', colId, groupId, sorter, groupName: null, groupDescription: null })
              }
              draft.totalItems += 1
            }
          },
          matchesPatchTarget
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
          emitClassificationStoreConfigurationChange()
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
          emitClassificationStoreConfigurationChange()
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
  useClassificationStoreConfigurationKeyGroupRelationCreateMutation,
  useClassificationStoreConfigurationKeyGroupRelationDeleteMutation,
  // CRUD mutations — collection-group relations
  useClassificationStoreConfigurationCollectionRelationCreateMutation,
  useClassificationStoreConfigurationCollectionRelationDeleteMutation,
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

export { api }
