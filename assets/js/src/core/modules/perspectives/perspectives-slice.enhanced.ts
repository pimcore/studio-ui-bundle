import { providingTags, tagNames } from '@Pimcore/app/api/pimcore/tags';
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
});

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
  usePerspectiveWidgetGetTypeCollectionQuery,
} = api

export { api }