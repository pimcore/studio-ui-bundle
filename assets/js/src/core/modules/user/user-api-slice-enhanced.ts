/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { api as baseApi } from '@Pimcore/modules/auth/user/user-api-slice.gen'

const api = baseApi.enhanceEndpoints({
  endpoints: {
    userUploadImage: (endpoint): void => {
      const originalQuery = endpoint.query

      if (originalQuery !== undefined) {
        endpoint.query = (queryArg) => {
          const baseResult = originalQuery(queryArg)
          const formData = new FormData()
          formData.append('userImage', queryArg.body.userImage)

          if (baseResult === null || typeof baseResult !== 'object') {
            return baseResult
          }

          return {
            ...baseResult,
            body: formData
          }
        }
      }
    }
  }
})

export type * from '@Pimcore/modules/auth/user/user-api-slice.gen'

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
