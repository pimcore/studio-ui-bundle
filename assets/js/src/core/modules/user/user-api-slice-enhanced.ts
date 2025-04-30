/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
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
