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
import { api as baseApi } from './class-definition-slice.gen'

const api = baseApi.enhanceEndpoints({
  addTagTypes: [tagNames.DATA_OBJECT, tagNames.DATA_OBJECT_DETAIL, tagNames.CLASS_DEFINITION, tagNames.CLASS_DEFINITION_DETAIL, tagNames.CLASS_DEFINITION_COLLECTION],
  endpoints: {
    classDefinitionCollection: {
      providesTags: () => providingTags.CLASS_DEFINITION_COLLECTION()
    },
    classDefinitionGetById: {
      providesTags: (result, error, args) => providingTags.CLASS_DEFINITION_DETAIL(args.id)
    },
    classDefinitionGetLayoutById: {
      providesTags: (result, error, args) => providingTags.CLASS_DEFINITION_DETAIL(args.id)
    },
    classDefinitionUpdate: {
      invalidatesTags: () => invalidatingTags.CLASS_DEFINITION_COLLECTION(),
      async onQueryStarted (args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(
            api.util.updateQueryData('classDefinitionGetById', { id: args.id }, (draft) => {
              Object.assign(draft, data)
            })
          )
        } catch {
          // Mutation failed, no cache update needed
        }
      }
    },
    classDefinitionCreate: {
      invalidatesTags: () => invalidatingTags.CLASS_DEFINITION_COLLECTION()
    },
    classDefinitionDelete: {
      invalidatesTags: () => invalidatingTags.CLASS_DEFINITION_COLLECTION()
    },
    classDefinitionImport: {
      invalidatesTags: (result, error, args) => [
        ...invalidatingTags.CLASS_DEFINITION_DETAIL(args.id),
        ...invalidatingTags.CLASS_DEFINITION_COLLECTION()
      ]
    },
    pimcoreStudioApiClassCustomLayoutGet: {
      providesTags: (result, error, args) => providingTags.CLASS_DEFINITION_DETAIL(args.customLayoutId)
    },
    pimcoreStudioApiClassCustomLayoutUpdate: {
      invalidatesTags: () => [],
      async onQueryStarted (args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(
            api.util.updateQueryData('pimcoreStudioApiClassCustomLayoutGet', { customLayoutId: args.customLayoutId }, (draft) => {
              Object.assign(draft, data)
            })
          )
        } catch {
          // Mutation failed, no cache update needed
        }
      }
    },
    pimcoreStudioApiClassCustomLayoutCreate: {
      invalidatesTags: () => invalidatingTags.CLASS_DEFINITION_COLLECTION()
    },
    pimcoreStudioApiClassCustomLayoutDelete: {
      invalidatesTags: () => invalidatingTags.CLASS_DEFINITION_COLLECTION()
    },
    classCustomLayoutEditorCollection: {
      providesTags: (result, error, args) => providingTags.DATA_OBJECT_DETAIL_ID(args.objectId)
    },
    classFieldCollectionObjectLayout: {
      providesTags: (result, error, args) => providingTags.DATA_OBJECT_DETAIL_ID(args.objectId)
    },
    classObjectBrickObjectLayout: {
      providesTags: (result, error, args) => providingTags.DATA_OBJECT_DETAIL_ID(args.objectId)
    }
  }
})

export type * from './class-definition-slice.gen'

export const {
  useClassDefinitionCollectionQuery,
  useClassDefinitionFolderCollectionQuery,
  useClassCustomLayoutCollectionQuery,
  usePimcoreStudioApiClassCustomLayoutCreateMutation,
  usePimcoreStudioApiClassCustomLayoutGetQuery,
  usePimcoreStudioApiClassCustomLayoutUpdateMutation,
  usePimcoreStudioApiClassCustomLayoutDeleteMutation,
  useClassCustomLayoutEditorCollectionQuery,
  usePimcoreStudioApiClassCustomLayoutExportQuery,
  useClassCustomLayoutImportMutation,
  useClassFieldCollectionObjectLayoutQuery,
  useClassDefinitionGetQuery,
  useClassObjectBrickObjectLayoutQuery,
  useClassDefinitionGetIdentifierDataQuery,
  useClassDefinitionCreateMutation,
  useClassDefinitionGetLayoutByIdQuery,
  useClassDefinitionGetTreeQuery,
  useClassDefinitionGetByIdQuery,
  useClassDefinitionUpdateMutation,
  useClassDefinitionDeleteMutation,
  useClassDefinitionExportQuery,
  useLazyClassDefinitionExportQuery,
  useClassDefinitionImportMutation,
  useClassCustomLayoutGetIdentifierDataQuery,
  useClassSelectOptionGetTreeQuery,
  useClassDefinitionGetBricksUsagesQuery
} = api

export { api }
