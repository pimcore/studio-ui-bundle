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
import { api as baseApi } from './translations-api-slice.gen'

const api = baseApi.enhanceEndpoints({
  addTagTypes: [tagNames.DOMAIN_TRANSLATIONS, tagNames.LOCALES],
  endpoints: {

    translationGetList: {
      providesTags: (result, error, args) => providingTags.DOMAIN_TRANSLATIONS()
    },

    translationGetAvailableLocales: {
      providesTags: (result, error, args) => providingTags.LOCALES()
    },

    translationGetDomains: {
      providesTags: () => []
    },

    translationDeleteByKey: {
      invalidatesTags: () => []
    },

    translationCreate: {
      invalidatesTags: () => []
    },

    translationUpdate: {
      invalidatesTags: () => []
    },

    translationExportList: {
      query: (queryArg) => ({
        url: '/pimcore-studio/api/translations/export',
        method: 'POST',
        body: queryArg.body,
        params: {
          domain: queryArg.domain
        },
        responseHandler: async (response): Promise<Blob> => {
          return await response.blob()
        }
      })
    },

    translationImportCsv: {
      query: (queryArg) => {
        const formData = new FormData()
        formData.append('file', queryArg.body.file)
        formData.append('csvSettings', JSON.stringify(queryArg.body.csvSettings))

        return {
          url: `/pimcore-studio/api/translations/${queryArg.domain}/import`,
          method: 'POST',
          body: formData
        }
      },
      invalidatesTags: () => invalidatingTags.DOMAIN_TRANSLATIONS()
    },

    translationCleanupByDomain: {
      invalidatesTags: () => invalidatingTags.DOMAIN_TRANSLATIONS()
    }
  }
})

export type * from './translations-api-slice.gen'

export const {
  useTranslationCreateMutation,
  useTranslationDeleteByKeyMutation,
  useTranslationGetDomainsQuery,
  useTranslationGetListQuery,
  useTranslationGetAvailableLocalesQuery,
  useTranslationUpdateMutation,
  useTranslationCleanupByDomainMutation,
  useTranslationExportListMutation,
  useTranslationImportCsvMutation,
  useTranslationDetermineCsvSettingsForImportMutation
} = api

export { api }
