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

import { invalidatingTags, providingTags, type Tag, tagNames } from '@Pimcore/app/api/pimcore/tags'
import { api as baseApi } from './tags-api-slice.gen'

export const api = baseApi.enhanceEndpoints({
  addTagTypes: [tagNames.TAGS, tagNames.ASSET_DETAIL, tagNames.DATA_OBJECT_DETAIL],
  endpoints: {
    tagGetCollection: {
      providesTags: (result, error, args) => {
        const tags: Tag[] = []
        // all possible tags that can be applied
        if (result?.items !== undefined && result.items !== null) {
          result.items.forEach((assignedTag) => {
            if (assignedTag.id !== undefined) {
              tags.push(...providingTags.TAGS_ID(assignedTag.id))
            }
          })
        }

        return tags
      }
    },
    tagAssignToElement: {
      invalidatesTags: (result, error, args) => invalidatingTags.ELEMENT_TAGS_ID(args.id)
    },
    tagUnassignFromElement: {
      invalidatesTags: (result, error, args) => invalidatingTags.ELEMENT_TAGS_ID(args.id)
    },
    tagBatchOperationToElementsByTypeAndId: {
      // when tags from folder are applied to children assets or data objects
      invalidatesTags: (result, error, args) => invalidatingTags.ELEMENT_TAGS(args.elementType, args.id)
    },
    tagGetCollectionForElementByTypeAndId: {
      providesTags: (result, error, args) => {
        const tags: Tag[] = []
        // all tags that are applied to an element
        const items = Array.isArray(result?.items) ? result.items : []
        items.forEach((assignedTag) => {
          if (assignedTag.id !== undefined) {
            tags.push(...providingTags.ELEMENT_TAGS(args.elementType, assignedTag.id))
          }
        })

        return tags
      }
    }
  }
})

export type * from './tags-api-slice.gen'
export const { useTagGetCollectionQuery, useTagAssignToElementMutation, useTagUnassignFromElementMutation, useTagGetCollectionForElementByTypeAndIdQuery, useTagBatchOperationToElementsByTypeAndIdMutation } = api
