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
import { api as baseApi } from './service-users-api-slice.gen'

const api = baseApi.enhanceEndpoints({
  addTagTypes: [tagNames.SERVICE_USERS, tagNames.SERVICE_USER_DETAIL],
  endpoints: {
    serviceUserGetCollection: {
      providesTags: () => providingTags.SERVICE_USERS()
    },
    serviceUserGetById: {
      providesTags: (result, error, args) => providingTags.SERVICE_USER_DETAIL(args.id)
    },
    serviceUserCreate: {
      invalidatesTags: () => invalidatingTags.SERVICE_USERS()
    },
    serviceUserCreateFromUser: {
      invalidatesTags: () => invalidatingTags.SERVICE_USERS()
    },
    serviceUserUpdateById: {
      invalidatesTags: (result, error, args) => [
        ...invalidatingTags.SERVICE_USERS(),
        ...invalidatingTags.SERVICE_USER_DETAIL(args.id)
      ]
    },
    serviceUserDeactivateById: {
      invalidatesTags: (result, error, args) => [
        ...invalidatingTags.SERVICE_USERS(),
        ...invalidatingTags.SERVICE_USER_DETAIL(args.id)
      ]
    },
    // The detail is gone after a deletion; refetching it would only answer 404.
    serviceUserDeleteById: {
      invalidatesTags: () => invalidatingTags.SERVICE_USERS()
    },
    // Rotating changes nothing the list or the detail shows; the new secret is in the response only.
    serviceUserRotateSecret: {
      invalidatesTags: () => []
    },
    serviceUserMcpTokenIssue: {
      invalidatesTags: () => []
    },
    serviceUserMcpTokenRevoke: {
      invalidatesTags: () => []
    }
  }
})

export type * from './service-users-api-slice.gen'

export const {
  useServiceUserGetCollectionQuery,
  useServiceUserGetByIdQuery,
  useServiceUserCreateMutation,
  useServiceUserCreateFromUserMutation,
  useServiceUserUpdateByIdMutation,
  useServiceUserDeactivateByIdMutation,
  useServiceUserDeleteByIdMutation,
  useServiceUserRotateSecretMutation
} = api

export { api }
