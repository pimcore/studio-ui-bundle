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

import { api as baseApi } from './user-api-slice.gen'

const api = baseApi.enhanceEndpoints({
  endpoints: {
    userUploadImage: {
      query: (queryArg) => {
        const formData = new FormData()
        formData.append('userImage', queryArg.body.userImage)
        return {
          url: `/pimcore-studio/api/user/upload-image/${queryArg.id}`,
          method: 'POST',
          body: formData
        }
      }
    }
  }
})

export type * from './user-api-slice.gen'

export const {
  useUserCloneByIdMutation,
  useUserCreateMutation,
  useUserFolderCreateMutation,
  useUserGetCurrentInformationQuery,
  useUserGetByIdQuery,
  useUserUpdateByIdMutation,
  useUserDeleteByIdMutation,
  useUserFolderDeleteByIdMutation,
  useUserDefaultKeyBindingsQuery,
  useUserGetAvailablePermissionsQuery,
  useUserGetCollectionQuery,
  useUserResetPasswordMutation,
  usePimcoreStudioApiUserSearchQuery,
  useUserUpdatePasswordByIdMutation,
  useUserUploadImageMutation,
  useUserGetImageQuery,
  useUserGetTreeQuery
} = api

export { api }
