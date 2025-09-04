/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { providingTags, type Tag, tagNames } from '@Pimcore/app/api/pimcore/tags'
import { api as baseApi } from './perspectives-slice.gen'

const api = baseApi.enhanceEndpoints({
  addTagTypes: [
    tagNames.PERSPECTIVES,
    tagNames.PERSPECTIVE_DETAIL,
    tagNames.WIDGETS,
    tagNames.WIDGET_DETAIL
  ],
  endpoints: {
    perspectiveGetConfigCollection: {
      providesTags: (result): Tag[] => {
        const tags: Tag[] = []

        result?.items.forEach((perspective) => {
          tags.push(...providingTags.PERSPECTIVE_DETAIL(perspective.id))
        })

        return [...tags, ...providingTags.PERSPECTIVES()]
      }
    },

    perspectiveWidgetGetConfigCollection: {
      providesTags: (result): Tag[] => {
        const tags: Tag[] = []

        result?.items.forEach((widget) => {
          tags.push(...providingTags.WIDGET_DETAIL(widget.id))
        })

        return [...tags, ...providingTags.WIDGETS()]
      }
    },
    perspectiveWidgetCreate: {
      invalidatesTags: () => []
    },
    perspectiveWidgetDelete: {
      invalidatesTags: () => []
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
