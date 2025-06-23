/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { invalidatingTags, providingTags, tagNames } from '@Pimcore/app/api/pimcore/tags'
import { api as baseApi } from './document-api-slice.gen'

const api = baseApi.enhanceEndpoints({
  addTagTypes: [tagNames.DOCUMENT, tagNames.DOCUMENT_TREE, tagNames.DOCUMENT_DETAIL, tagNames.DOCUMENT_TYPES],
  endpoints: {

    documentClone: {
      invalidatesTags: (result, error, args) => invalidatingTags.DOCUMENT_TREE_ID(args.parentId)
    },

    documentGetById: {
      providesTags: (result, error, args) => providingTags.DOCUMENT_DETAIL_ID(args.id)
    },

    documentGetTree: {
      providesTags: (result, error, args) => args.parentId !== undefined ? providingTags.DOCUMENT_TREE_ID(args.parentId) : providingTags.DOCUMENT_TREE()
    },

    documentDocTypeList: {
      providesTags: (result, error, args) => providingTags.DOCUMENT_TYPES()
    },

    documentDocTypeDelete: {
        invalidatesTags: () => []
    },

    documentDocTypeUpdateById: {
        invalidatesTags: () => []
    },

    documentDocTypeAdd: {
        invalidatesTags: () => []
    }

    documentUpdateById: {
      invalidatesTags: (result, error, args) => args.body.data.task === 'autoSave' ? [] : invalidatingTags.DOCUMENT_DETAIL_ID(args.id)
    },

    documentAdd: {
      invalidatesTags: (result, error, args) => invalidatingTags.DOCUMENT_TREE_ID(args.parentId)
    }
  }
})

export type * from './document-api-slice.gen'

export const {
  // useDocumentAddMutation,
  // useDocumentCloneMutation,
  useDocumentGetByIdQuery,
  // useDocumentUpdateByIdMutation,
  useDocumentGetTreeQuery,
  useDocumentAvailableTemplatesListQuery,
  useDocumentDocTypeListQuery,
  useDocumentDocTypeTypeListQuery,
  useDocumentAvailableControllersListQuery,
  useDocumentDocTypeAddMutation,
  useDocumentDocTypeUpdateByIdMutation,
  useDocumentDocTypeDeleteMutation
} = api

export { api }
