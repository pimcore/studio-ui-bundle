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
import { api as baseApi } from './data-object-api-slice.gen'
import { getPrefix } from '@Pimcore/app/api/pimcore/route'

const api = baseApi.enhanceEndpoints({
  addTagTypes: [tagNames.DATA_OBJECT, tagNames.DATA_OBJECT_TREE, tagNames.DATA_OBJECT_DETAIL],
  endpoints: {

    dataObjectClone: {
      invalidatesTags: (result, error, args) => invalidatingTags.DATA_OBJECT_TREE_ID(args.parentId)
    },

    dataObjectGetById: {
      providesTags: (result, error, args) => providingTags.DATA_OBJECT_DETAIL_ID(args.id)
    },

    dataObjectGetTree: {
      providesTags: (result, error, args) => args.parentId !== undefined ? providingTags.DATA_OBJECT_TREE_ID(args.parentId) : providingTags.DATA_OBJECT_TREE()
    },

    dataObjectGetGrid: {
      keepUnusedDataFor: 10
    },

    dataObjectUpdateById: {
      invalidatesTags: (result, error, args) => args.body.data.task === 'autoSave' ? [] : invalidatingTags.DATA_OBJECT_DETAIL_ID(args.id)
    },

    dataObjectAdd: {
      invalidatesTags: (result, error, args) => invalidatingTags.DATA_OBJECT_TREE_ID(args.parentId)
    },

    dataObjectGetLayoutById: {
      query: (queryArg) => ({
        url: queryArg.layoutId === undefined ? `${getPrefix()}/data-objects/${queryArg.id}/layout` : `${getPrefix()}/data-objects/${queryArg.id}/layout/${queryArg.layoutId}`
      }),
      providesTags: (result, error, args) => providingTags.DATA_OBJECT_DETAIL_ID(args.id)
    }
  }
})

export type * from './data-object-api-slice.gen'

export const {
  useDataObjectAddMutation,
  useDataObjectCloneMutation,
  useDataObjectGetByIdQuery,
  useDataObjectUpdateByIdMutation,
  useDataObjectPatchByIdMutation,
  useDataObjectGetTreeQuery,
  useDataObjectGetLayoutByIdQuery
} = api

export { api }
