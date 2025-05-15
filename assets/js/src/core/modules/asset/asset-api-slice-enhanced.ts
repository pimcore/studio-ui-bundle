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
import { api as baseApi } from './asset-api-slice.gen'

const api = baseApi.enhanceEndpoints({
  addTagTypes: [tagNames.ASSET, tagNames.ASSET_TREE, tagNames.ASSET_DETAIL],
  endpoints: {
    assetClone: {
      invalidatesTags: (result, error, args) => invalidatingTags.ASSET_TREE_ID(args.parentId)
    },

    assetCustomMetadataGetById: {
      providesTags: (result, error, args) => providingTags.ASSET_DETAIL_ID(args.id)
    },

    assetCustomSettingsGetById: {
      providesTags: (result, error, args) => providingTags.ASSET_DETAIL_ID(args.id)
    },

    assetGetTextDataById: {
      providesTags: (result, error, args) => providingTags.ASSET_DETAIL_ID(args.id)
    },

    assetGetById: {
      providesTags: (result, error, args) => providingTags.ASSET_DETAIL_ID(args.id)
    },

    assetGetTree: {
      providesTags: (result, error, args) => {
        let providingTagsForTree: Tag[] = []
        if (result !== undefined) {
          providingTagsForTree = result?.items.flatMap((item) => providingTags.ASSET_DETAIL_ID(item.id))
        }

        providingTagsForTree = [
          ...providingTagsForTree,
          ...providingTags.ASSET_TREE(),
          ...args.parentId !== undefined ? providingTags.ASSET_TREE_ID(args.parentId) : []
        ]

        return providingTagsForTree
      }
    },

    assetUpdateById: {
      invalidatesTags: (result, error, args) => invalidatingTags.ASSET_DETAIL_ID(args.id)
    },

    assetAdd: {
      invalidatesTags: (result, error, args) => invalidatingTags.ASSET_TREE_ID(args.parentId)
    },

    assetPatchById: {
      invalidatesTags: (result, error, args) => {
        const invalidatingTagsForPatch: Tag[] = []

        for (const asset of args.body.data) {
          invalidatingTagsForPatch.push(...invalidatingTags.ASSET_DETAIL_ID(asset.id))
        }

        return invalidatingTagsForPatch
      }
    },

    assetGetGridConfigurationByFolderId: {
      providesTags: (result, error, args) => providingTags.ASSET_GRID_CONFIGURATION_DETAIL(args.configurationId)
    },

    assetGetGrid: {
      providesTags: (result, error, args) => providingTags.ASSET_GRID_ID(args.body.folderId)
    },

    assetSaveGridConfiguration: {
      invalidatesTags: (result, error, args) => invalidatingTags.ASSET_GRID_CONFIGURATION_LIST()
    },

    assetSetGridConfigurationAsFavorite: {
      invalidatesTags: (result, error, args) => invalidatingTags.ASSET_GRID_CONFIGURATION_LIST()
    },

    assetUpdateGridConfiguration: {
      invalidatesTags: (result, error, args) => invalidatingTags.ASSET_GRID_CONFIGURATION_DETAIL(args.configurationId)
    },

    assetDeleteGridConfigurationByConfigurationId: {
      invalidatesTags: (result, error, args) => [...invalidatingTags.ASSET_GRID_CONFIGURATION_DETAIL(), ...invalidatingTags.ASSET_GRID_CONFIGURATION_LIST()]
    },

    assetGetSavedGridConfigurations: {
      providesTags: (result, error, args) => providingTags.ASSET_GRID_CONFIGURATION_LIST()
    }
  }
})

export type * from './asset-api-slice.gen'

export const {
  useAssetGetByIdQuery,
  useAssetGetTreeQuery,
  useLazyAssetGetTreeQuery,
  useAssetUpdateByIdMutation,
  useAssetCloneMutation,
  useAssetReplaceMutation,
  useAssetCustomMetadataGetByIdQuery,
  useAssetCustomSettingsGetByIdQuery,
  useAssetGetTextDataByIdQuery,
  useAssetGetGridQuery,
  useAssetPatchByIdMutation,
  useAssetExportZipAssetMutation,
  useAssetExportZipFolderMutation,
  useAssetGetSavedGridConfigurationsQuery,
  useAssetSaveGridConfigurationMutation,
  useAssetSetGridConfigurationAsFavoriteMutation,
  useAssetUpdateGridConfigurationMutation,
  useAssetDeleteGridConfigurationByConfigurationIdMutation,
  useAssetGetGridConfigurationByFolderIdQuery,
  useAssetGetAvailableGridColumnsQuery,
  useAssetPatchFolderByIdMutation
} = api

export { api }
