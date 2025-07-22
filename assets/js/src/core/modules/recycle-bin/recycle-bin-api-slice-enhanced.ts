import { providingTags, tagNames } from '@sdk/api'
import { api as baseApi } from './recycle-bin-api-slice.gen'
import { Tag } from '@sdk/api/tags'

export const api = baseApi.enhanceEndpoints({
  addTagTypes: [tagNames.RECYCLE_BIN],
  endpoints: {
    recycleBinGetCollection: {
      providesTags: (result, error, args) => {
        const tagCollection: Tag[] = []

        result?.items?.forEach((item) => {
          tagCollection.push(...providingTags.RECYCLING_BIN_DETAIL(item.id))
        })

        return [...tagCollection, ...providingTags.EMAIL_BLOCKLIST()]
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