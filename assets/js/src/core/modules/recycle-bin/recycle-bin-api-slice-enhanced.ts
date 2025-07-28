/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { providingTags, tagNames, type Tag, invalidatingTags } from '@sdk/api'
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
