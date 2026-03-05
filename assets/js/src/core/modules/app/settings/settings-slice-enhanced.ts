/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { providingTags, invalidatingTags, tagNames } from '@Pimcore/app/api/pimcore/tags'
import { api as baseApi } from './settings-slice.gen'

const api = baseApi.enhanceEndpoints({
  addTagTypes: [tagNames.SETTINGS_ADMIN],
  endpoints: {
    adminSettingsGet: {
      providesTags: (result, error, args) => providingTags.SETTINGS_ADMIN()
    },

    adminSettingsUpdate: {
      invalidatesTags: (result, error, args) => invalidatingTags.SETTINGS_ADMIN()
    },

    settingAdminThumbnail: {
      providesTags: (result, error, args) => providingTags.SETTINGS_ADMIN()
    }
  }
})

export const {
  useAdminSettingsGetQuery,
  useAdminSettingsUpdateMutation,
  useSettingAdminThumbnailQuery,
  useSystemSettingsGetQuery,
  useSettingsUpdateMutation,
  useActiveBundlesGetQuery,
  usePingActionQuery,
  useLazyPingActionQuery,
  useSettingsCountryCollectionQuery
} = api

export { api }
export type * from './settings-slice.gen'
