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
import { api as baseApi } from './notifications-slice.gen'

export const api = baseApi.enhanceEndpoints({
  addTagTypes: [tagNames.NOTIFICATION_DETAILS, tagNames.NOTIFICATIONS, tagNames.NOTIFICATION_PREFERENCES],
  endpoints: {
    notificationGetSubscriptions: {
      providesTags: (result, error, args): Tag[] => providingTags.NOTIFICATION_PREFERENCES()
    },
    notificationUpdateSubscriptions: {
      // The response already carries the stored state, but invalidating keeps any other
      // consumer of the preferences honest.
      invalidatesTags: (result, error, args) => invalidatingTags.NOTIFICATION_PREFERENCES()
    },
    notificationGetCollection: {
      providesTags: (result, error, args): Tag[] => {
        const tags: Tag[] = []

        result?.items.forEach((note) => {
          tags.push(...providingTags.NOTIFICATION_DETAIL(note.id))
        })

        tags.push(...providingTags.NOTIFICATIONS())

        return tags
      }
    },
    notificationGetById: {
      providesTags: (result, error, args) => providingTags.NOTIFICATION_DETAIL(args.id)
    },
    notificationDeleteAll: {
      invalidatesTags: (result, error, args) => invalidatingTags.NOTIFICATIONS()
    },
    notificationGetUnreadCount: {
      // Share the list's NOTIFICATIONS tag so bulk changes (delete-all) refetch the badge count,
      // not only the single-item read/delete the manual decrement covers.
      providesTags: (result, error, args): Tag[] => providingTags.NOTIFICATIONS()
    }
  }
})

export type * from './notifications-slice.gen'
export const {
  useNotificationDeleteByIdMutation,
  useNotificationDeleteAllMutation,
  useNotificationGetCollectionQuery,
  useNotificationGetByIdQuery,
  useNotificationGetSubscriptionsQuery,
  useNotificationUpdateSubscriptionsMutation
} = api
