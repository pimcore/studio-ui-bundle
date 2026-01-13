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
        return providingTags.PERSPECTIVES()
      }
    },
    perspectiveGetConfigById: {
      providesTags: (result, error, args): Tag[] => {
        return providingTags.PERSPECTIVE_DETAIL(args.perspectiveId)
      }
    },
    perspectiveUpdateConfigById: {
      invalidatesTags: () => invalidatingTags.PERSPECTIVES()
    },
    perspectiveDelete: {
      invalidatesTags: () => invalidatingTags.PERSPECTIVES()
    },
    perspectiveCreate: {
      invalidatesTags: () => invalidatingTags.PERSPECTIVES()
    },
    perspectiveWidgetGetConfigCollection: {
      providesTags: (result, error, args): Tag[] => providingTags.WIDGETS()
    },
    perspectiveWidgetGetConfigById: {
      providesTags: (result, error, args): Tag[] => {
        return providingTags.WIDGET_DETAIL(args.widgetId, args.widgetType)
      }
    },
    perspectiveWidgetUpdateConfigById: {
      invalidatesTags: () => invalidatingTags.WIDGETS()
    },
    perspectiveWidgetCreate: {
      invalidatesTags: () => invalidatingTags.WIDGETS()
    },
    perspectiveWidgetDelete: {
      invalidatesTags: () => invalidatingTags.WIDGETS()
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
