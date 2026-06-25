/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { providingTags, tagNames } from '@sdk/api'
import { api as baseApi } from './ownership-management-api-slice.gen'

export const api = baseApi.enhanceEndpoints({
  addTagTypes: [tagNames.OWNERSHIP_MANAGEMENT],
  endpoints: {
    ownershipManagementGetTypes: {
      providesTags: () => providingTags.OWNERSHIP_MANAGEMENT()
    },
    ownershipManagementGetCollection: {
      providesTags: () => providingTags.OWNERSHIP_MANAGEMENT()
    }
    // NOTE: reassignOwner/delete deliberately do NOT invalidate tags here. They only start an
    // async execution-engine job (the response just carries a jobRunId), so invalidating on the
    // mutation response would refetch stale data before the worker has run. The cache is
    // invalidated once, on job completion, in the EE jobs' handleCompletion().
  }
})

export type * from './ownership-management-api-slice.gen'
export const {
  useOwnershipManagementGetTypesQuery,
  useOwnershipManagementGetCollectionQuery,
  useOwnershipManagementReassignOwnerMutation,
  useOwnershipManagementDeleteConfigurationsMutation
} = api
