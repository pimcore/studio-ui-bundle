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
import { api as baseApi } from './maintenance-mode-api-slice.gen'

export const api = baseApi.enhanceEndpoints({
  addTagTypes: [tagNames.MAINTENANCE_MODE],
  endpoints: {
    maintenanceModeGet: {
      providesTags: () => providingTags.MAINTENANCE_MODE()
    },
    maintenanceModeActivate: {
      invalidatesTags: () => invalidatingTags.MAINTENANCE_MODE()
    },
    maintenanceModeDeactivate: {
      invalidatesTags: () => invalidatingTags.MAINTENANCE_MODE()
    }
  }
})

export type * from './maintenance-mode-api-slice.gen'
export const {
  useMaintenanceModeGetQuery,
  useMaintenanceModeActivateMutation,
  useMaintenanceModeDeactivateMutation
} = api
