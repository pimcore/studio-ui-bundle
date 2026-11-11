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
import { api as baseApi } from './maintenance-mode-api-slice.gen'

// Both return the new state; a refetch would run alongside the logout of "Deactivate and log out" and keep the session alive
export const api = baseApi.enhanceEndpoints({
  addTagTypes: [tagNames.MAINTENANCE_MODE],
  endpoints: {
    maintenanceModeGet: {
      providesTags: () => providingTags.MAINTENANCE_MODE()
    },
    maintenanceModeActivate: {
      invalidatesTags: () => [],
      async onQueryStarted (_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          await dispatch(api.util.upsertQueryData('maintenanceModeGet', undefined, data))
        } catch {
          // The caller reports the failed request
        }
      }
    },
    maintenanceModeDeactivate: {
      invalidatesTags: () => [],
      async onQueryStarted (_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          await dispatch(api.util.upsertQueryData('maintenanceModeGet', undefined, data))
        } catch {
          // The caller reports the failed request
        }
      }
    }
  }
})

export type * from './maintenance-mode-api-slice.gen'
export const {
  useMaintenanceModeGetQuery,
  useMaintenanceModeActivateMutation,
  useMaintenanceModeDeactivateMutation
} = api
