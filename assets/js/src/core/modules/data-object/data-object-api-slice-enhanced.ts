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
import { normalizeLayoutTreeIcons } from '@Pimcore/utils/normalize-icon'
import { api as baseApi, type Layout } from './data-object-api-slice.gen'

const api = baseApi.enhanceEndpoints({
  addTagTypes: [tagNames.DATA_OBJECT, tagNames.DATA_OBJECT_TREE, tagNames.DATA_OBJECT_DETAIL, tagNames.DATA_OBJECT_GRID_CONFIGURATION, tagNames.DATA_OBJECT_GRID_CONFIGURATION_LIST, tagNames.DATA_OBJECT_GRID_CONFIGURATION_DETAIL],
  endpoints: {

    dataObjectClone: {
      invalidatesTags: (result, error, args) => invalidatingTags.DATA_OBJECT_TREE_ID(args.parentId)
    },

    dataObjectGetById: {
      providesTags: (result, error, args) => providingTags.DATA_OBJECT_DETAIL_ID(args.id)
    },

    dataObjectGetTree: {
      providesTags: (result, error, args) => args.parentId !== undefined ? providingTags.DATA_OBJECT_TREE_ID(args.parentId) : providingTags.DATA_OBJECT_TREE()
    },

    dataObjectGetGrid: {
      providesTags: (result, error, args) => providingTags.DATA_OBJECT_GRID_ID(args.body.folderId)
    },

    dataObjectGetGridConfiguration: {
      providesTags: (result, error, args) => providingTags.DATA_OBJECT_GRID_CONFIGURATION_DETAIL(args.configurationId)
    },

    dataObjectListSavedGridConfigurations: {
      providesTags: (result, error, args) => providingTags.DATA_OBJECT_GRID_CONFIGURATION_LIST()
    },

    dataObjectSaveGridConfiguration: {
      invalidatesTags: (result, error, args) => invalidatingTags.DATA_OBJECT_GRID_CONFIGURATION()
    },

    dataObjectSetGridConfigurationAsFavorite: {
      invalidatesTags: (result, error, args) => invalidatingTags.DATA_OBJECT_GRID_CONFIGURATION()
    },

    dataObjectRemoveGridConfigurationAsFavorite: {
      invalidatesTags: (result, error, args) => invalidatingTags.DATA_OBJECT_GRID_CONFIGURATION()
    },

    dataObjectUpdateGridConfiguration: {
      invalidatesTags: (result, error, args) => invalidatingTags.DATA_OBJECT_GRID_CONFIGURATION_DETAIL(args.configurationId)
    },

    dataObjectDeleteGridConfigurationByConfigurationId: {
      invalidatesTags: (result, error, args) => [...invalidatingTags.DATA_OBJECT_GRID_CONFIGURATION_DETAIL(), ...invalidatingTags.DATA_OBJECT_GRID_CONFIGURATION_LIST()]
    },

    dataObjectUpdateById: {
      invalidatesTags: (result, error, args) => args.body.data.task === 'autoSave' ? [] : invalidatingTags.DATA_OBJECT_DETAIL_ID(args.id)
    },

    dataObjectAdd: {
      invalidatesTags: (result, error, args) => invalidatingTags.DATA_OBJECT_TREE_ID(args.parentId)
    },

    dataObjectGetLayoutById: {
      providesTags: (result, error, args) => providingTags.DATA_OBJECT_DETAIL_ID(args.id),
      transformResponse: (raw: Layout): Layout => normalizeLayoutTreeIcons(raw)
    },

    // Cache dynamic select options per object; drop them when that object's detail is invalidated.
    dataObjectGetSelectOptions: {
      providesTags: (result, error, args) => providingTags.DATA_OBJECT_DETAIL_ID(args.body.objectId)
    },

    dataObjectFormatPath: {
      providesTags: (result, error, args) => providingTags.DATA_OBJECT_DETAIL_ID(args.body.objectId)
    },

    dataObjectPatchById: {
      invalidatesTags: (result, error, args) => {
        const invalidatingTagsForPatch: Tag[] = []

        for (const dataObject of args.body.data) {
          invalidatingTagsForPatch.push(...invalidatingTags.DATA_OBJECT_DETAIL_ID(dataObject.id))
        }

        return invalidatingTagsForPatch
      }
    }
  }
})

export type * from './data-object-api-slice.gen'

export const {
  useDataObjectAddMutation,
  useDataObjectCloneMutation,
  useDataObjectGetByIdQuery,
  useDataObjectUpdateByIdMutation,
  useDataObjectPatchByIdMutation,
  useDataObjectPatchFolderByIdMutation,
  useDataObjectGetTreeQuery,
  useDataObjectGetLayoutByIdQuery,
  useLazyDataObjectGetSelectOptionsQuery,
  useDataObjectGetAvailableGridColumnsQuery,
  useDataObjectGetGridConfigurationQuery,
  useDataObjectListSavedGridConfigurationsQuery,
  useDataObjectSaveGridConfigurationMutation,
  useDataObjectUpdateGridConfigurationMutation,
  useDataObjectDeleteGridConfigurationByConfigurationIdMutation,
  useDataObjectSetGridConfigurationAsFavoriteMutation,
  useDataObjectRemoveGridConfigurationAsFavoriteMutation
} = api

export { api }
