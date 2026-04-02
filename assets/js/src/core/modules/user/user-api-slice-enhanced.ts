/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { invalidatingTags, providingTags, type Tag, tagNames } from '@Pimcore/app/api/pimcore/tags'
import { api as baseApi } from '@Pimcore/modules/auth/user/user-api-slice.gen'

const api = baseApi.enhanceEndpoints({
  addTagTypes: [
    tagNames.USERS,
    tagNames.USER_DETAIL,
    tagNames.USER_TREE
  ],
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
    },
    userGetCollection: {
      providesTags: (result, error, args) => {
        let detailTags: Tag[] = []
        if (result !== undefined) {
          detailTags = result?.items.flatMap((item) => providingTags.USER_DETAIL(item.id))
        }

        return [
          ...detailTags,
          ...providingTags.USERS()
        ]
      }
    },
    userGetById: {
      providesTags: (result, error, args) => providingTags.USER_DETAIL(args.id)
    },
    userDeleteById: {
      invalidatesTags: (result, error, args) => invalidatingTags.USER_DETAIL(args.id)
    },
    userUpdateById: {
      invalidatesTags: (result, error, args) => invalidatingTags.USER_DETAIL(args.id)
    },
    userGetTree: {
      providesTags: (result, error, args) => {
        let detailTags: Tag[] = []
        if (result !== undefined) {
          detailTags = result?.items.flatMap((item) => providingTags.USER_DETAIL(item.id))
        }

        return [
          ...detailTags,
          ...providingTags.USER_TREE(),
          ...providingTags.USERS()
        ]
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
  useUserGetTreeQuery,
  useUserTokenLinkGetQuery,
  useLazyUserTokenLinkGetQuery,
  useUserGetShareCollectionQuery
} = api

export { api }
