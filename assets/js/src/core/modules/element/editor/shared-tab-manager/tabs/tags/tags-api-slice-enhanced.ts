/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { invalidatingTags, providingTags, tagNames } from '@Pimcore/app/api/pimcore/tags'
import { api as baseApi } from './tags-api-slice.gen'

export const api = baseApi.enhanceEndpoints({
  addTagTypes: [tagNames.AVAILABLE_TAGS, tagNames.ASSET_DETAIL, tagNames.DATA_OBJECT_DETAIL],
  endpoints: {
    tagUpdateById: {
      invalidatesTags: (result, error, args) => invalidatingTags.AVAILABLE_TAGS()
    },
    tagDeleteById: {
      invalidatesTags: (result, error, args) => invalidatingTags.AVAILABLE_TAGS()
    },
    tagCreate: {
      invalidatesTags: (result, error, args) => invalidatingTags.AVAILABLE_TAGS()
    },
    tagGetById: {
      providesTags: (result, error, args) => providingTags.AVAILABLE_TAGS()
    },
    tagGetCollection: {
      providesTags: (result, error, args) => providingTags.AVAILABLE_TAGS()
    },
    tagAssignToElement: {
      invalidatesTags: (result, error, args) => []
    },
    tagUnassignFromElement: {
      invalidatesTags: (result, error, args) => []
    },
    tagBatchOperationToElementsByTypeAndId: {
      invalidatesTags: (result, error, args) => invalidatingTags.ELEMENT_TAGS(args.elementType, args.id)
    },
    tagGetCollectionForElementByTypeAndId: {
      providesTags: (result, error, args) =>
        providingTags
          .ELEMENT_TAGS(args.elementType, args.id)
          .filter((tag) => tag !== undefined)
    }
  }
})

export type * from './tags-api-slice.gen'
export const { useTagCreateMutation, useTagDeleteByIdMutation, useTagUpdateByIdMutation, useTagGetCollectionQuery, useTagAssignToElementMutation, useTagUnassignFromElementMutation, useTagGetCollectionForElementByTypeAndIdQuery, useTagBatchOperationToElementsByTypeAndIdMutation } = api
