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
      providesTags: (result, error, args) => args.parentId !== undefined ? providingTags.ASSET_TREE_ID(args.parentId) : providingTags.ASSET_TREE()
    },

    assetUpdateById: {
      invalidatesTags: (result, error, args) => invalidatingTags.ASSET_DETAIL_ID(args.id)
    },

    assetAdd: {
      invalidatesTags: (result, error, args) => invalidatingTags.ASSET_TREE_ID(args.parentId)
    }
  }
})

export type * from './asset-api-slice.gen'

export const {
  useAssetGetByIdQuery,
  useAssetGetTreeQuery,
  useAssetUpdateByIdMutation,
  useAssetCloneMutation,
  useAssetReplaceMutation,
  useAssetCustomMetadataGetByIdQuery,
  useAssetCustomSettingsGetByIdQuery,
  useAssetGetTextDataByIdQuery,
  useAssetGetGridMutation,
  useAssetPatchByIdMutation,
  useAssetCreateZipMutation,
  useAssetCreateCsvMutation,
  useAssetGetSavedGridConfigurationsQuery,
  useAssetSaveGridConfigurationMutation,
  useAssetSetGridConfigurationAsFavoriteMutation,
  useAssetUpdateGridConfigurationMutation
} = api

export { api }
