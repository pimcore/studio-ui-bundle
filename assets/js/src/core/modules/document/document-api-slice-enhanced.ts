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
import { getPrefix } from '@sdk/api'
import type { DocumentRenderletRenderApiArg, DocumentRenderletRenderApiResponse } from './document-api-slice.gen'
import { isNil } from 'lodash'

const api = baseApi.enhanceEndpoints({
  addTagTypes: [tagNames.DOCUMENT, tagNames.DOCUMENT_TREE, tagNames.DOCUMENT_DETAIL, tagNames.DOCUMENT_TYPES, tagNames.DOCUMENT_SITE],
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
    },

    documentUpdateById: {
      invalidatesTags: (result, error, args) => args.body.data.task === 'autoSave' ? [] : invalidatingTags.DOCUMENT_DETAIL_ID(args.id)
    },

    documentAdd: {
      invalidatesTags: (result, error, args) => invalidatingTags.DOCUMENT_TREE_ID(args.parentId)
    },

    documentGetSite: {
      providesTags: () => []
    },

    documentUpdateSite: {
      invalidatesTags: () => invalidatingTags.DOCUMENT_SITE()
    },

    documentDeleteSite: {
      invalidatesTags: () => invalidatingTags.DOCUMENT_SITE()
    },

    documentsListAvailableSites: {
      providesTags: () => providingTags.DOCUMENT_SITE()
    },

    documentGetTranslations: {
      providesTags: () => []
    },

    documentAddTranslation: {
      invalidatesTags: () => []
    },

    documentDeleteTranslation: {
      invalidatesTags: () => []
    }
  }
}).injectEndpoints({
  endpoints: (build) => ({
    documentRenderletRender: build.query<DocumentRenderletRenderApiResponse, DocumentRenderletRenderApiArg>({
      queryFn: async (arg, api, extraOptions, baseQuery) => {
        const result = await baseQuery({
          url: `${getPrefix()}/documents/renderlet/render`,
          params: arg,
          responseHandler: async (response) => await response.blob()
        })

        if (!isNil(result.error)) {
          if (result.error.data instanceof Blob) {
            try {
              const text = await result.error.data.text()
              const jsonData = JSON.parse(text)
              return {
                error: {
                  ...result.error,
                  data: jsonData
                }
              }
            } catch {
              return { error: result.error }
            }
          }
          return { error: result.error }
        }

        return { data: result.data as Blob }
      },
      providesTags: ['Documents']
    })
  }),
  overrideExisting: true
})

export type * from './document-api-slice.gen'

export const {
  useDocumentAddMutation,
  useDocumentCloneMutation,
  useDocumentGetByIdQuery,
  useDocumentUpdateByIdMutation,
  useDocumentGetTreeQuery,
  useDocumentAvailableTemplatesListQuery,
  useDocumentDocTypeListQuery,
  useDocumentDocTypeTypeListQuery,
  useDocumentAvailableControllersListQuery,
  useDocumentDocTypeAddMutation,
  useDocumentDocTypeUpdateByIdMutation,
  useDocumentDocTypeDeleteMutation,
  useDocumentPageSnippetChangeMainDocumentMutation,
  useDocumentPageSnippetAreaBlockRenderQuery,
  useLazyDocumentPageSnippetAreaBlockRenderQuery,
  useDocumentRenderletRenderQuery,
  useDocumentsListAvailableSitesQuery,
  useDocumentGetSiteQuery,
  useLazyDocumentGetSiteQuery,
  useDocumentUpdateSiteMutation,
  useDocumentDeleteSiteMutation,
  useDocumentGetTranslationsQuery,
  useLazyDocumentGetTranslationsQuery,
  useDocumentAddTranslationMutation,
  useDocumentDeleteTranslationMutation,
  useDocumentGetTranslationParentByLanguageQuery
} = api

export { api }
