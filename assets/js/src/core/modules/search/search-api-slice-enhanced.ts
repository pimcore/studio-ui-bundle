/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { api } from './search-api-slice.gen'

const enhancedApi = api.enhanceEndpoints({
  addTagTypes: ['SavedSearch'],
  endpoints: {
    simpleSearchGet: {
      keepUnusedDataFor: 5
    },
    savedSearchSaveConfiguration: {
      invalidatesTags: ['SavedSearch']
    },
    savedSearchGetConfiguration: {
      providesTags: ['SavedSearch']
    },
    savedSearchGetConfigurations: {
      providesTags: ['SavedSearch']
    },
    savedSearchUpdateConfiguration: {
      invalidatesTags: ['SavedSearch']
    },
    savedSearchDeleteConfiguration: {
      invalidatesTags: ['SavedSearch']
    },
    savedSearchGetMenuShortcutConfigurations: {
      providesTags: ['SavedSearch']
    },
    savedSearchUpdateMenuShortcut: {
      invalidatesTags: ['SavedSearch']
    }
  }
})

export const {
  useSimpleSearchGetQuery,
  useSavedSearchSaveConfigurationMutation,
  useSavedSearchGetConfigurationQuery,
  useSavedSearchGetConfigurationsQuery,
  useLazySavedSearchGetConfigurationQuery,
  useSavedSearchUpdateConfigurationMutation,
  useSavedSearchDeleteConfigurationMutation,
  useSavedSearchGetMenuShortcutConfigurationsQuery,
  useSavedSearchUpdateMenuShortcutMutation
} = enhancedApi
