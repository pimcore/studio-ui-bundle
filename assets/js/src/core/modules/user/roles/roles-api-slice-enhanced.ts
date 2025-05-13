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
import { api as baseApi } from './roles-api-slice.gen'

const api = baseApi.enhanceEndpoints({
  addTagTypes: [tagNames.ROLE],
  endpoints: {
    roleGetCollection: {
      providesTags: () => providingTags.ROLE()
    }
  }
})

export type * from './roles-api-slice.gen'

export const {
  useRoleGetCollectionQuery
} = api

export { api }
