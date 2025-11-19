/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { api as baseApi } from './usage-api-slice.gen'

export const api = baseApi.enhanceEndpoints({
  endpoints: {
    elementUsageReplace: {
      invalidatesTags: []
    }
  }
})

export type * from './usage-api-slice.gen'
export const {
  useLazyElementGetUsageQuery,
  useElementUsageReplaceMutation
} = api

