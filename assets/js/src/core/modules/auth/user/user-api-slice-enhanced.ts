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
import { api as userApi } from './user-api-slice.gen'

const enhancedUserApi = userApi.enhanceEndpoints({
  addTagTypes: [tagNames.CURRENT_USER_INFORMATION],
  endpoints: {
    userGetCurrentInformation: {
      providesTags: (result, error, args) => providingTags.CURRENT_USER_INFORMATION()
    }
  }
})

export type * from './user-api-slice.gen'

export { enhancedUserApi as api }
export const {
  useUserGetCurrentInformationQuery
  // ...other hooks from userApi if needed...
} = enhancedUserApi
