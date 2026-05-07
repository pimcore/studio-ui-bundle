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
  type ClassificationStoreConfigurationCollectionRelationCollectionApiArg
} from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice.gen'

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
        const { keyId, groupId, sorter, mandatory } = args.classificationStoreConfigurationKeyGroupRelationCreate
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
              // Upsert — update mandatory/sorter in-place
              draft.items[idx] = { ...draft.items[idx], sorter, mandatory }
            } else {
              // New relation — keyName/keyDescription/groupName filled in by server overwrite below
              draft.items.push({ keyId, groupId, sorter, mandatory, keyName: null, keyDescription: null, groupName: null })
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
