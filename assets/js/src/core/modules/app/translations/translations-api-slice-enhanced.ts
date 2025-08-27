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
import { api as baseApi } from './translations-api-slice.gen'

const api = baseApi.enhanceEndpoints({
  addTagTypes: [tagNames.DOMAIN_TRANSLATIONS],
  endpoints: {

    translationGetList: {
      providesTags: (result, error, args) => providingTags.DOMAIN_TRANSLATIONS()
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
    }
  }
})

export type * from './translations-api-slice.gen'

export const {
  useTranslationCreateMutation,
  useTranslationDeleteByKeyMutation,
  useTranslationGetDomainsQuery,
  useTranslationGetListQuery,
  useTranslationUpdateMutation
} = api

export { api }
