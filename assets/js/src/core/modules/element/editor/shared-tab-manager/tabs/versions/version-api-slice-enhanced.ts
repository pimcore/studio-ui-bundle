/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { invalidatingTags, providingTags, type Tag, tagNames } from '@Pimcore/app/api/pimcore/tags'
import { api as baseApi } from './version-api-slice.gen'

export const api = baseApi.enhanceEndpoints({
  addTagTypes: [tagNames.ASSET_DETAIL],
  endpoints: {
    versionGetById: {
      providesTags: (result, error, args) =>
        providingTags.VERSIONS_DETAIL(args.id)
    },
    versionGetCollectionForElementByTypeAndId: {
      providesTags: (result, error, args) => {
        const tagCollection: Tag[] = []

        result?.items.forEach((version) => {
          tagCollection.push(...providingTags.VERSIONS_DETAIL(version.id))
        })

        return [...tagCollection, ...providingTags.ELEMENT_VERSIONS(args.elementType, args.id)]
      }
    },

    versionCleanupForElementByTypeAndId: {
      invalidatesTags: (result, error, args) => invalidatingTags.ELEMENT_VERSIONS(args.elementType, args.id)
    },

    versionUpdateById: {
      invalidatesTags: (result, error, args) => invalidatingTags.VERSIONS_DETAIL(args.id)
    },

    versionPublishById: {
      invalidatesTags: (result, error, args) => invalidatingTags.VERSIONS_DETAIL(args.id)
    },

    versionDeleteById: {
      invalidatesTags: (result, error, args) => invalidatingTags.VERSIONS_DETAIL(args.id)
    }
  }
})

export type * from './version-api-slice.gen'
export const {
  useVersionAssetDownloadByIdQuery,
  useVersionCleanupForElementByTypeAndIdMutation,
  useVersionDeleteByIdMutation,
  useVersionGetByIdQuery,
  useVersionGetCollectionForElementByTypeAndIdQuery,
  useVersionPublishByIdMutation,
  useVersionUpdateByIdMutation
} = api
