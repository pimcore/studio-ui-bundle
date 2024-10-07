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

import { invalidatingTags, providingTags, tagNames } from '@Pimcore/app/api/pimcore/tags'
import { api as baseApi } from './schedule-api-slice.gen'

export const api = baseApi.enhanceEndpoints({
  addTagTypes: [tagNames.ASSET_DETAIL, tagNames.DATA_OBJECT_DETAIL],
  endpoints: {
    scheduleGetCollectionForElementByTypeAndId: {
      providesTags: (result, error, args) => {
        return providingTags.ELEMENT_SCHEDULES(args.elementType, args.id)
      }
    },
    scheduleUpdateForElementByTypeAndId: {
      invalidatesTags: (result, error, args) => invalidatingTags.ELEMENT_SCHEDULES(args.elementType, args.id)
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
