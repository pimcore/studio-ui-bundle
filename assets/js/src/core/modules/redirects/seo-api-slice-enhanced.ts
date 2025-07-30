/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { providingTags, tagNames } from '@Pimcore/app/api/pimcore/tags'
import { api as baseApi } from './seo-api-slice.gen'

const api = baseApi.enhanceEndpoints({
  addTagTypes: [tagNames.REDIRECTS],
  endpoints: {

    bundleSeoRedirectsGetCollection: {
      providesTags: (result, error, args) => providingTags.REDIRECTS()
    },

    bundleSeoRedirectDelete: {
      invalidatesTags: () => []
    },

    bundleSeoRedirectAdd: {
      invalidatesTags: () => []
    },

    bundleSeoRedirectUpdateById: {
      invalidatesTags: () => []
    },

    bundleSeoRedirectsExport: {
      query: () => ({ 
        url: `/pimcore-studio/api/bundle/seo/redirects/export`,
        responseHandler: async (response): Promise<Blob> => {
          return await response.blob()
        }
      })
    },

    bundleSeoRedirectsImport: {
      query: (args) => {
        const formData = new FormData()
        formData.append('file', args.body.file)
        
        return {
          url: `/pimcore-studio/api/bundle/seo/redirects/import`,
          method: 'POST',
          body: formData
        }
      },
      invalidatesTags: () => [tagNames.REDIRECTS]
    }
  }
})

export type * from './seo-api-slice.gen'

export const {
  useBundleSeoRedirectAddMutation,
  useBundleSeoRedirectCleanupMutation,
  useBundleSeoRedirectsGetCollectionQuery,
  useBundleSeoRedirectUpdateByIdMutation,
  useBundleSeoRedirectDeleteMutation,
  useBundleSeoRedirectsExportQuery,
  useBundleSeoRedirectsImportMutation,
  useBundleSeoRedirectListPrioritiesQuery,
  useBundleSeoRedirectListStatusesQuery,
  useBundleSeoRedirectListTypesQuery
} = api

export { api }
