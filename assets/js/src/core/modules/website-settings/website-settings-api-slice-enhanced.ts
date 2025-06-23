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
import { api as baseApi } from './website-settings-api-slice.gen'

const api = baseApi.enhanceEndpoints({
  addTagTypes: [tagNames.WEBSITE_SETTINGS],
  endpoints: {

    websiteSettingsGetCollection: {
      providesTags: (result, error, args) => providingTags.WEBSITE_SETTINGS()
    },

    websiteSettingsDelete: {
      invalidatesTags: () => []
    },

    websiteSettingsAdd: {
      invalidatesTags: () => []
    },

    websiteSettingsUpdate: {
      invalidatesTags: () => []
    },

    websiteSettingsListTypes: {
      providesTags: () => []
    },
  }
})

export type * from './website-settings-api-slice.gen'

export const {
  useWebsiteSettingsAddMutation,
  useWebsiteSettingsDeleteMutation,
  useWebsiteSettingsGetCollectionQuery,
  useWebsiteSettingsUpdateMutation,
  useWebsiteSettingsListTypesQuery
} = api

export { api }
