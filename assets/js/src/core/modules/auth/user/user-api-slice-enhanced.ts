/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
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
