/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { api } from '@sdk/api'

/**
 * Manually injected endpoints for the asset folder preview image-size setting.
 *
 * These mirror the `asset_get_folder_preview_setting` / `asset_update_folder_preview_setting`
 * operations added to the StudioBackendBundle OpenAPI spec. They live here (rather than in the
 * generated `asset-api-slice.gen.ts`) so a future `@rtk-query/codegen-openapi` run does not
 * overwrite them; once the client is regenerated from the updated spec, this file can be removed
 * and the generated hooks used instead.
 */

export interface FolderPreviewSetting {
  imageSize: 'small' | 'large'
}

export interface AssetGetFolderPreviewSettingApiArg {
  folderId: number
}

export interface AssetUpdateFolderPreviewSettingApiArg {
  folderId: number
  body: FolderPreviewSetting
}

const folderPreviewSettingApi = api.enhanceEndpoints({ addTagTypes: ['Assets'] }).injectEndpoints({
  endpoints: (build) => ({
    assetGetFolderPreviewSetting: build.query<FolderPreviewSetting, AssetGetFolderPreviewSettingApiArg>({
      query: (queryArg) => ({ url: `/pimcore-studio/api/assets/${queryArg.folderId}/preview-setting` }),
      providesTags: (result, error, arg) => [{ type: 'Assets', id: `PREVIEW_SETTING_${arg.folderId}` }]
    }),
    assetUpdateFolderPreviewSetting: build.mutation<FolderPreviewSetting, AssetUpdateFolderPreviewSettingApiArg>({
      query: (queryArg) => ({
        url: `/pimcore-studio/api/assets/${queryArg.folderId}/preview-setting`,
        method: 'PUT',
        body: queryArg.body
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Assets', id: `PREVIEW_SETTING_${arg.folderId}` }]
    })
  }),
  overrideExisting: false
})

export const { useAssetGetFolderPreviewSettingQuery, useAssetUpdateFolderPreviewSettingMutation } =
  folderPreviewSettingApi
