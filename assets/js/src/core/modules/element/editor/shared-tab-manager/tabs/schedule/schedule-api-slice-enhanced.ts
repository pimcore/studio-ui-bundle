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
import { api as baseApi } from './schedule-api-slice.gen'

export const api = baseApi.enhanceEndpoints({
  addTagTypes: [tagNames.ASSET_DETAIL, tagNames.DATA_OBJECT_DETAIL],
  endpoints: {
    scheduleGetCollectionForElementByTypeAndId: {
      providesTags: (result, error, args) => {
        const scheduleCollection: Tag[] = []

        result?.items?.forEach((schedule) => {
          scheduleCollection.push(...providingTags.SCHEDULE_DETAIL(schedule.id))
        })

        return [...scheduleCollection, ...providingTags.ELEMENT_SCHEDULES(args.elementType, args.id)]
      }
    },
    scheduleUpdateForElementByTypeAndId: {
      invalidatesTags: (result, error, args) => invalidatingTags.ELEMENT_SCHEDULES(args.elementType, args.id)
    },
    scheduleCreateForElementByTypeAndId: {
      invalidatesTags: (result, error, args) => invalidatingTags.ELEMENT_SCHEDULES(args.elementType, args.id)
    },
    scheduleDeleteById: {
      invalidatesTags: (result, error, args) => invalidatingTags.SCHEDULE_DETAIL(args.id)
    }
  }
})

export type * from './schedule-api-slice.gen'
export const {
  useScheduleDeleteByIdMutation,
  useScheduleGetCollectionForElementByTypeAndIdQuery,
  useScheduleUpdateForElementByTypeAndIdMutation,
  useScheduleCreateForElementByTypeAndIdMutation
} = api
