import { providingTags, tagNames, Tag, invalidatingTags } from '@sdk/api'
import { api as baseApi } from './recycle-bin-api-slice.gen'

export const api = baseApi.enhanceEndpoints({
  addTagTypes: [tagNames.RECYCLE_BIN],
  endpoints: {
    recycleBinGetCollection: {
      providesTags: (result, error, args) => {
        const tagCollection: Tag[] = []

        result?.items?.forEach((item) => {
          tagCollection.push(...providingTags.RECYCLING_BIN_DETAIL(item.id))
        })

        return [...tagCollection, ...providingTags.RECYCLING_BIN()]
      }
    },
    recycleBinDeleteItems: {
      invalidatesTags: (result, error, args) => {
        return invalidatingTags.RECYCLING_BIN()
      }
    },
    recycleBinFlush: {
      invalidatesTags: () => {
        return invalidatingTags.RECYCLING_BIN()
      }
    },
    recycleBinRestoreItems: {
      invalidatesTags: (result, error, args) => {
        return invalidatingTags.RECYCLING_BIN()
      }
    }
  }
})

export type * from './recycle-bin-api-slice.gen'
export const {
  useRecycleBinGetCollectionQuery,
  useRecycleBinDeleteItemsMutation,
  useRecycleBinFlushMutation,
  useRecycleBinRestoreItemsMutation
} = api