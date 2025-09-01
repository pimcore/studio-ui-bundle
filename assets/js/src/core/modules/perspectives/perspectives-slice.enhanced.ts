/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { providingTags, tagNames } from '@Pimcore/app/api/pimcore/tags'
import { api as baseApi } from './perspectives-slice.gen'

const api = baseApi.enhanceEndpoints({
  addTagTypes: [tagNames.PERSPECTIVES],
  endpoints: {
    perspectiveGetConfigCollection: {
      providesTags: () => providingTags.PERSPECTIVES()
    },
    perspectiveCreate: {
      invalidatesTags: () => [tagNames.PERSPECTIVES]
    }
  }
})

export type * from './perspectives-slice.gen'

export const {
  usePerspectiveCreateMutation,
  usePerspectiveGetConfigCollectionQuery,
  usePerspectiveGetConfigByIdQuery,
  usePerspectiveUpdateConfigByIdMutation,
  usePerspectiveDeleteMutation,
  usePerspectiveWidgetCreateMutation,
  usePerspectiveWidgetGetConfigCollectionQuery,
  usePerspectiveWidgetGetConfigByIdQuery,
  usePerspectiveWidgetUpdateConfigByIdMutation,
  usePerspectiveWidgetDeleteMutation,
  usePerspectiveWidgetGetTypeCollectionQuery
} = api

export { api }
