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
  addTagTypes: [tagNames.NOTIFICATION_DETAILS, tagNames.NOTIFICATIONS],
  endpoints: {
    notificationGetCollection: {
      providesTags: (result, error, args): Tag[] => {
        const tags: Tag[] = []

        result?.items.forEach((note) => {
          tags.push(...providingTags.NOTIFICATION(note.id))
        })

        return tags
      }
    },
    notificationGetById: {
      providesTags: (result, error, args) => providingTags.NOTIFICATION_DETAIL(args.id)
    },
    notificationDeleteById: {
      invalidatesTags: (result, error, args) => invalidatingTags.NOTIFICATION(args.id)
  },
    notificationDeleteAll: {
      invalidatesTags: (result, error, args) => invalidatingTags.NOTIFICATIONS()
  }
}
})

export type * from './notifications-slice.gen'
export const { useNotificationDeleteByIdMutation, useNotificationGetCollectionQuery, useNotificationGetByIdQuery } = api
