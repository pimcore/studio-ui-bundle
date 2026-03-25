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

/* eslint-disable max-lines */
const api = baseApi.enhanceEndpoints({
  addTagTypes: [tagNames.DATA_OBJECT, tagNames.DATA_OBJECT_DETAIL, tagNames.CLASS_DEFINITION, tagNames.CLASS_DEFINITION_DETAIL, tagNames.CLASS_DEFINITION_COLLECTION, tagNames.CUSTOM_LAYOUT, tagNames.CUSTOM_LAYOUT_DETAIL, tagNames.CUSTOM_LAYOUT_COLLECTION, tagNames.FIELD_COLLECTION, tagNames.FIELD_COLLECTION_DETAIL, tagNames.FIELD_COLLECTION_COLLECTION, tagNames.OBJECT_BRICK, tagNames.OBJECT_BRICK_DETAIL, tagNames.OBJECT_BRICK_COLLECTION, tagNames.OBJECT_BRICK_CUSTOM_LAYOUT, tagNames.OBJECT_BRICK_CUSTOM_LAYOUT_DETAIL, tagNames.OBJECT_BRICK_CUSTOM_LAYOUT_COLLECTION, tagNames.SELECT_OPTION_DETAIL, tagNames.SELECT_OPTION_COLLECTION],
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
    classCustomLayoutCollection: {
      providesTags: () => providingTags.CUSTOM_LAYOUT_COLLECTION()
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
    classDefinitionGetIdentifierData: {
      providesTags: () => providingTags.CLASS_DEFINITION_COLLECTION()
    },
    classDefinitionCreate: {
      invalidatesTags: () => invalidatingTags.CLASS_DEFINITION_COLLECTION()
    },
    classDefinitionDelete: {
      invalidatesTags: (result, error, args) => [
        ...invalidatingTags.CLASS_DEFINITION_DETAIL(args.id),
        ...invalidatingTags.CLASS_DEFINITION_COLLECTION()
      ]
    },
    classDefinitionImport: {
      invalidatesTags: (result, error, args) => [
        ...invalidatingTags.CLASS_DEFINITION_DETAIL(args.id),
        ...invalidatingTags.CLASS_DEFINITION_COLLECTION()
      ]
    },
    classCustomLayoutGet: {
      providesTags: (result, error, args) => providingTags.CUSTOM_LAYOUT_DETAIL(args.customLayoutId)
    },
    classCustomLayoutUpdate: {
      invalidatesTags: () => [],
      async onQueryStarted (args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(
            api.util.updateQueryData('classCustomLayoutGet', { customLayoutId: args.customLayoutId }, (draft) => {
              Object.assign(draft, data)
            })
          )
        } catch {
          // Mutation failed, no cache update needed
        }
      }
    },
    classCustomLayoutCreate: {
      invalidatesTags: () => invalidatingTags.CUSTOM_LAYOUT_COLLECTION()
    },
    classCustomLayoutDelete: {
      invalidatesTags: () => invalidatingTags.CUSTOM_LAYOUT_COLLECTION()
    },
    classCustomLayoutExport: {
      providesTags: (result, error, args) => providingTags.CUSTOM_LAYOUT_DETAIL(args.customLayoutId)
    },
    classCustomLayoutGetIdentifierData: {
      providesTags: () => providingTags.CUSTOM_LAYOUT_COLLECTION()
    },
    classCustomLayoutImport: {
      invalidatesTags: (result, error, args) => [
        ...invalidatingTags.CUSTOM_LAYOUT_DETAIL(args.customLayoutId),
        ...invalidatingTags.CUSTOM_LAYOUT_COLLECTION()
      ]
    },
    classCustomLayoutEditorCollection: {
      providesTags: (result, error, args) => providingTags.DATA_OBJECT_DETAIL_ID(args.objectId)
    },
    classFieldCollectionObjectLayout: {
      providesTags: (result, error, args) => providingTags.DATA_OBJECT_DETAIL_ID(args.objectId)
    },
    classObjectBrickObjectLayout: {
      providesTags: (result, error, args) => providingTags.DATA_OBJECT_DETAIL_ID(args.objectId)
    },
    classFieldCollectionCollection: {
      providesTags: () => providingTags.FIELD_COLLECTION_COLLECTION()
    },
    classFieldCollectionGetByKey: {
      providesTags: (result, error, args) => providingTags.FIELD_COLLECTION_DETAIL(args.key)
    },
    classFieldCollectionGetLayoutByKey: {
      providesTags: (result, error, args) => providingTags.FIELD_COLLECTION_DETAIL(args.key)
    },
    classFieldCollectionUpdate: {
      invalidatesTags: () => invalidatingTags.FIELD_COLLECTION_COLLECTION(),
      async onQueryStarted (args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(
            api.util.updateQueryData('classFieldCollectionGetByKey', { key: args.key }, (draft) => {
              Object.assign(draft, data)
            })
          )
        } catch {
          // Mutation failed, no cache update needed
        }
      }
    },
    classFieldCollectionCreate: {
      invalidatesTags: () => invalidatingTags.FIELD_COLLECTION_COLLECTION()
    },
    classFieldCollectionDelete: {
      invalidatesTags: (result, error, args) => [
        ...invalidatingTags.FIELD_COLLECTION_DETAIL(args.key),
        ...invalidatingTags.FIELD_COLLECTION_COLLECTION()
      ]
    },
    classFieldCollectionImport: {
      invalidatesTags: (result, error, args) => [
        ...invalidatingTags.FIELD_COLLECTION_DETAIL(args.key),
        ...invalidatingTags.FIELD_COLLECTION_COLLECTION()
      ]
    },
    classFieldCollectionGetTree: {
      providesTags: () => providingTags.FIELD_COLLECTION_COLLECTION()
    },
    classObjectBrickCollection: {
      providesTags: () => providingTags.OBJECT_BRICK_COLLECTION()
    },
    classObjectBrickGetByKey: {
      providesTags: (result, error, args) => providingTags.OBJECT_BRICK_DETAIL(args.key)
    },
    classObjectBrickGetLayoutByKey: {
      providesTags: (result, error, args) => providingTags.OBJECT_BRICK_DETAIL(args.key)
    },
    classObjectBrickGetTree: {
      providesTags: () => providingTags.OBJECT_BRICK_COLLECTION()
    },
    classObjectBrickUpdate: {
      invalidatesTags: () => invalidatingTags.OBJECT_BRICK_COLLECTION(),
      async onQueryStarted (args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(
            api.util.updateQueryData('classObjectBrickGetByKey', { key: args.key }, (draft) => {
              Object.assign(draft, data)
            })
          )
        } catch {
          // Mutation failed, no cache update needed
        }
      }
    },
    classObjectBrickCreate: {
      invalidatesTags: () => invalidatingTags.OBJECT_BRICK_COLLECTION()
    },
    classObjectBrickDelete: {
      invalidatesTags: (result, error, args) => [
        ...invalidatingTags.OBJECT_BRICK_DETAIL(args.key),
        ...invalidatingTags.OBJECT_BRICK_COLLECTION()
      ]
    },
    classObjectBrickImport: {
      invalidatesTags: (result, error, args) => [
        ...invalidatingTags.OBJECT_BRICK_DETAIL(args.key),
        ...invalidatingTags.OBJECT_BRICK_COLLECTION()
      ]
    },
    classObjectBrickCustomLayoutGet: {
      providesTags: (result, error, args) => providingTags.OBJECT_BRICK_CUSTOM_LAYOUT_DETAIL(args.key, args.customLayoutId)
    },
    classObjectBrickCustomLayoutUpdate: {
      invalidatesTags: () => [],
      async onQueryStarted (args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(
            api.util.updateQueryData('classObjectBrickCustomLayoutGet', { key: args.key, customLayoutId: args.customLayoutId }, (draft) => {
              Object.assign(draft, data)
            })
          )
        } catch {
          // Mutation failed, no cache update needed
        }
      }
    },
    classObjectBrickCustomLayoutDelete: {
      invalidatesTags: (result, error, args) => invalidatingTags.OBJECT_BRICK_CUSTOM_LAYOUT_COLLECTION(args.key)
    },
    classObjectBrickCustomLayoutExport: {
      providesTags: (result, error, args) => providingTags.OBJECT_BRICK_CUSTOM_LAYOUT_DETAIL(args.key, args.customLayoutId)
    },
    classObjectBrickCustomLayoutImport: {
      invalidatesTags: (result, error, args) => [
        ...invalidatingTags.OBJECT_BRICK_CUSTOM_LAYOUT_DETAIL(args.key, args.customLayoutId),
        ...invalidatingTags.OBJECT_BRICK_CUSTOM_LAYOUT_COLLECTION(args.key)
      ]
    },
    classSelectOptionGetTree: {
      providesTags: () => providingTags.SELECT_OPTION_COLLECTION()
    },
    classSelectOptionGet: {
      providesTags: (result, error, args) => providingTags.SELECT_OPTION_DETAIL(args.id)
    },
    classSelectOptionUpdate: {
      invalidatesTags: () => invalidatingTags.SELECT_OPTION_COLLECTION(),
      async onQueryStarted (args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(
            api.util.updateQueryData('classSelectOptionGet', { id: args.id }, (draft) => {
              Object.assign(draft, data)
            })
          )
        } catch {
          // Mutation failed, no cache update needed
        }
      }
    },
    classSelectOptionCreate: {
      invalidatesTags: () => invalidatingTags.SELECT_OPTION_COLLECTION()
    },
    classSelectOptionDelete: {
      invalidatesTags: () => invalidatingTags.SELECT_OPTION_COLLECTION()
    },
    classSelectOptionGetUsages: {
      providesTags: (result, error, args) => providingTags.SELECT_OPTION_DETAIL(args.id)
    },
    classBulkImportPrepare: (endpoint): void => {
      const originalQuery = endpoint.query

      if (originalQuery !== undefined) {
        endpoint.query = (queryArg) => {
          const baseResult = originalQuery(queryArg)
          const formData = new FormData()
          formData.append('file', queryArg.body.file)

          if (baseResult === null || typeof baseResult !== 'object') {
            return baseResult
          }

          return {
            ...baseResult,
            body: formData
          }
        }
      }
    }
  }
})

export type * from './class-definition-slice.gen'

export const {
  useClassDefinitionCollectionQuery,
  useClassDefinitionFolderCollectionQuery,
  useClassCustomLayoutCollectionQuery,
  useClassCustomLayoutCreateMutation,
  useClassCustomLayoutGetQuery,
  useClassCustomLayoutUpdateMutation,
  useClassCustomLayoutDeleteMutation,
  useClassCustomLayoutEditorCollectionQuery,
  useClassCustomLayoutExportQuery,
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
  useClassGetAvailableVisibleFieldsQuery,
  useClassGetSelectedVisibleFieldsQuery,
  useClassDefinitionGetBricksUsagesQuery,
  useClassFieldCollectionCollectionQuery,
  useClassFieldCollectionCreateMutation,
  useClassFieldCollectionGetByKeyQuery,
  useClassFieldCollectionUpdateMutation,
  useClassFieldCollectionDeleteMutation,
  useClassFieldCollectionExportQuery,
  useLazyClassFieldCollectionExportQuery,
  useClassFieldCollectionImportMutation,
  useClassFieldCollectionGetLayoutByKeyQuery,
  useClassFieldCollectionGetTreeQuery,
  useClassFieldCollectionGetUsagesQuery,
  useClassObjectBrickCollectionQuery,
  useClassObjectBrickGetByKeyQuery,
  useClassObjectBrickGetLayoutByKeyQuery,
  useClassObjectBrickGetTreeQuery,
  useClassObjectBrickCreateMutation,
  useClassObjectBrickUpdateMutation,
  useClassObjectBrickDeleteMutation,
  useClassObjectBrickGetUsagesQuery,
  useClassObjectBrickClassesQuery,
  useClassObjectBrickExportQuery,
  useLazyClassObjectBrickExportQuery,
  useClassObjectBrickImportMutation,
  useClassObjectBrickCustomLayoutGetQuery,
  useClassObjectBrickCustomLayoutUpdateMutation,
  useClassObjectBrickCustomLayoutDeleteMutation,
  useClassObjectBrickCustomLayoutExportQuery,
  useClassObjectBrickCustomLayoutImportMutation,
  useClassGetFieldsByTypeQuery,
  useClassSelectOptionCreateMutation,
  useClassSelectOptionGetQuery,
  useClassSelectOptionUpdateMutation,
  useClassSelectOptionDeleteMutation,
  useClassSelectOptionGetUsagesQuery,
  useClassBulkExportAvailableQuery,
  useClassBulkExportMutation,
  useClassBulkImportPrepareMutation,
  useClassBulkImportMutation,
  useClassBulkImportDeleteFileMutation
} = api

export { api }
