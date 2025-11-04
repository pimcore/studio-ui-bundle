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
import { isNil } from 'lodash'

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
      providesTags: (result): Tag[] => {
        if (isNil(result?.id)) {
          return []
        }
        return providingTags.PERSPECTIVE_DETAIL(result?.id)
      }
    },
    perspectiveUpdateConfigById: {
      invalidatesTags: () => []
    },
    perspectiveDelete: {
      invalidatesTags: () => []
    },
    perspectiveWidgetGetConfigCollection: {
      providesTags: (result): Tag[] => {
        return providingTags.WIDGETS()
      }
    },
    perspectiveWidgetGetConfigById: {
      providesTags: (result, error, args): Tag[] => {
        return providingTags.WIDGET_DETAIL(args.widgetId, args.widgetType)
      }
    },
    perspectiveWidgetUpdateConfigById: {
      invalidatesTags: () => []
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
