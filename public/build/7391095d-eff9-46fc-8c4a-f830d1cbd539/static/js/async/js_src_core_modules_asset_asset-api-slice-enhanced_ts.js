"use strict";
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["js_src_core_modules_asset_asset-api-slice-enhanced_ts"], {
"./js/src/core/modules/asset/asset-api-slice-enhanced.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  api: () => (api),
  useAssetCloneMutation: () => (useAssetCloneMutation),
  useAssetCustomMetadataGetByIdQuery: () => (useAssetCustomMetadataGetByIdQuery),
  useAssetCustomSettingsGetByIdQuery: () => (useAssetCustomSettingsGetByIdQuery),
  useAssetDeleteGridConfigurationByConfigurationIdMutation: () => (useAssetDeleteGridConfigurationByConfigurationIdMutation),
  useAssetExportZipAssetMutation: () => (useAssetExportZipAssetMutation),
  useAssetExportZipFolderMutation: () => (useAssetExportZipFolderMutation),
  useAssetGetAvailableGridColumnsQuery: () => (useAssetGetAvailableGridColumnsQuery),
  useAssetGetByIdQuery: () => (useAssetGetByIdQuery),
  useAssetGetGridConfigurationByFolderIdQuery: () => (useAssetGetGridConfigurationByFolderIdQuery),
  useAssetGetGridQuery: () => (useAssetGetGridQuery),
  useAssetGetSavedGridConfigurationsQuery: () => (useAssetGetSavedGridConfigurationsQuery),
  useAssetGetTextDataByIdQuery: () => (useAssetGetTextDataByIdQuery),
  useAssetGetTreeQuery: () => (useAssetGetTreeQuery),
  useAssetPatchByIdMutation: () => (useAssetPatchByIdMutation),
  useAssetPatchFolderByIdMutation: () => (useAssetPatchFolderByIdMutation),
  useAssetReplaceMutation: () => (useAssetReplaceMutation),
  useAssetSaveGridConfigurationMutation: () => (useAssetSaveGridConfigurationMutation),
  useAssetSetGridConfigurationAsFavoriteMutation: () => (useAssetSetGridConfigurationAsFavoriteMutation),
  useAssetUpdateByIdMutation: () => (useAssetUpdateByIdMutation),
  useAssetUpdateGridConfigurationMutation: () => (useAssetUpdateGridConfigurationMutation),
  useLazyAssetGetTreeQuery: () => (useLazyAssetGetTreeQuery)
});
/* ESM import */var _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/tags.ts");
/* ESM import */var _asset_api_slice_gen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/asset/asset-api-slice.gen.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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

const api = _asset_api_slice_gen__WEBPACK_IMPORTED_MODULE_1__.api.enhanceEndpoints({
    addTagTypes: [
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.ASSET,
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.ASSET_TREE,
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.ASSET_DETAIL
    ],
    endpoints: {
        assetClone: {
            invalidatesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.ASSET_TREE_ID(args.parentId)
        },
        assetCustomMetadataGetById: {
            providesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.ASSET_DETAIL_ID(args.id)
        },
        assetCustomSettingsGetById: {
            providesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.ASSET_DETAIL_ID(args.id)
        },
        assetGetTextDataById: {
            providesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.ASSET_DETAIL_ID(args.id)
        },
        assetGetById: {
            providesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.ASSET_DETAIL_ID(args.id)
        },
        assetGetTree: {
            providesTags: (result, error, args)=>{
                let providingTagsForTree = [];
                if (result !== undefined) {
                    providingTagsForTree = result === null || result === void 0 ? void 0 : result.items.flatMap((item)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.ASSET_DETAIL_ID(item.id));
                }
                providingTagsForTree = [
                    ...providingTagsForTree,
                    ..._Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.ASSET_TREE(),
                    ...args.parentId !== undefined ? _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.ASSET_TREE_ID(args.parentId) : []
                ];
                return providingTagsForTree;
            }
        },
        assetUpdateById: {
            invalidatesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.ASSET_DETAIL_ID(args.id)
        },
        assetAdd: {
            invalidatesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.ASSET_TREE_ID(args.parentId)
        },
        assetPatchById: {
            invalidatesTags: (result, error, args)=>{
                const invalidatingTagsForPatch = [];
                for (const asset of args.body.data){
                    invalidatingTagsForPatch.push(..._Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.ASSET_DETAIL_ID(asset.id));
                }
                return invalidatingTagsForPatch;
            }
        },
        assetGetGridConfigurationByFolderId: {
            providesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.ASSET_GRID_CONFIGURATION_DETAIL(args.folderId, args.configurationId)
        },
        assetGetGrid: {
            providesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.ASSET_GRID_ID(args.body.folderId)
        },
        assetSaveGridConfiguration: {
            invalidatesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.ASSET_GRID_CONFIGURATION_LIST(args.body.folderId)
        },
        assetSetGridConfigurationAsFavorite: {
            invalidatesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.ASSET_GRID_CONFIGURATION_LIST(args.folderId)
        },
        assetUpdateGridConfiguration: {
            invalidatesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.ASSET_GRID_CONFIGURATION_DETAIL(undefined, args.configurationId)
        },
        assetDeleteGridConfigurationByConfigurationId: {
            invalidatesTags: (result, error, args)=>[
                    ..._Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.ASSET_GRID_CONFIGURATION_DETAIL(args.folderId),
                    ..._Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.ASSET_GRID_CONFIGURATION_LIST(args.folderId)
                ]
        },
        assetGetSavedGridConfigurations: {
            providesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.ASSET_GRID_CONFIGURATION_LIST(args.folderId)
        }
    }
});
const { useAssetGetByIdQuery, useAssetGetTreeQuery, useLazyAssetGetTreeQuery, useAssetUpdateByIdMutation, useAssetCloneMutation, useAssetReplaceMutation, useAssetCustomMetadataGetByIdQuery, useAssetCustomSettingsGetByIdQuery, useAssetGetTextDataByIdQuery, useAssetGetGridQuery, useAssetPatchByIdMutation, useAssetExportZipAssetMutation, useAssetExportZipFolderMutation, useAssetGetSavedGridConfigurationsQuery, useAssetSaveGridConfigurationMutation, useAssetSetGridConfigurationAsFavoriteMutation, useAssetUpdateGridConfigurationMutation, useAssetDeleteGridConfigurationByConfigurationIdMutation, useAssetGetGridConfigurationByFolderIdQuery, useAssetGetAvailableGridColumnsQuery, useAssetPatchFolderByIdMutation } = api;


function $RefreshSig$() {
  return $ReactRefreshRuntime$.createSignatureFunctionForTransform();
}
function $RefreshReg$(type, id) {
  $ReactRefreshRuntime$.register(type, module.id + "_" + id);
}
Promise.resolve().then(function() {
  $ReactRefreshRuntime$.refresh(module.id, module.hot);
});


}),
"./js/src/core/modules/asset/asset-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useAssetAddMutation: () => (useAssetAddMutation),
  useAssetClearThumbnailMutation: () => (useAssetClearThumbnailMutation),
  useAssetCloneMutation: () => (useAssetCloneMutation),
  useAssetCustomMetadataGetByIdQuery: () => (useAssetCustomMetadataGetByIdQuery),
  useAssetCustomSettingsGetByIdQuery: () => (useAssetCustomSettingsGetByIdQuery),
  useAssetDeleteGridConfigurationByConfigurationIdMutation: () => (useAssetDeleteGridConfigurationByConfigurationIdMutation),
  useAssetDeleteZipMutation: () => (useAssetDeleteZipMutation),
  useAssetDocumentStreamPreviewQuery: () => (useAssetDocumentStreamPreviewQuery),
  useAssetDownloadByIdQuery: () => (useAssetDownloadByIdQuery),
  useAssetDownloadZipQuery: () => (useAssetDownloadZipQuery),
  useAssetExportZipAssetMutation: () => (useAssetExportZipAssetMutation),
  useAssetExportZipFolderMutation: () => (useAssetExportZipFolderMutation),
  useAssetGetAvailableGridColumnsQuery: () => (useAssetGetAvailableGridColumnsQuery),
  useAssetGetByIdQuery: () => (useAssetGetByIdQuery),
  useAssetGetGridConfigurationByFolderIdQuery: () => (useAssetGetGridConfigurationByFolderIdQuery),
  useAssetGetGridQuery: () => (useAssetGetGridQuery),
  useAssetGetSavedGridConfigurationsQuery: () => (useAssetGetSavedGridConfigurationsQuery),
  useAssetGetSearchConfigurationQuery: () => (useAssetGetSearchConfigurationQuery),
  useAssetGetSearchQuery: () => (useAssetGetSearchQuery),
  useAssetGetTextDataByIdQuery: () => (useAssetGetTextDataByIdQuery),
  useAssetGetTreeQuery: () => (useAssetGetTreeQuery),
  useAssetImageDownloadByFormatQuery: () => (useAssetImageDownloadByFormatQuery),
  useAssetImageDownloadByThumbnailQuery: () => (useAssetImageDownloadByThumbnailQuery),
  useAssetImageDownloadCustomQuery: () => (useAssetImageDownloadCustomQuery),
  useAssetImageStreamCustomQuery: () => (useAssetImageStreamCustomQuery),
  useAssetImageStreamPreviewQuery: () => (useAssetImageStreamPreviewQuery),
  useAssetImageStreamQuery: () => (useAssetImageStreamQuery),
  useAssetPatchByIdMutation: () => (useAssetPatchByIdMutation),
  useAssetPatchFolderByIdMutation: () => (useAssetPatchFolderByIdMutation),
  useAssetReplaceMutation: () => (useAssetReplaceMutation),
  useAssetSaveGridConfigurationMutation: () => (useAssetSaveGridConfigurationMutation),
  useAssetSetGridConfigurationAsFavoriteMutation: () => (useAssetSetGridConfigurationAsFavoriteMutation),
  useAssetUpdateByIdMutation: () => (useAssetUpdateByIdMutation),
  useAssetUpdateGridConfigurationMutation: () => (useAssetUpdateGridConfigurationMutation),
  useAssetUploadInfoQuery: () => (useAssetUploadInfoQuery),
  useAssetUploadZipMutation: () => (useAssetUploadZipMutation),
  useAssetVideoDownloadByThumbnailQuery: () => (useAssetVideoDownloadByThumbnailQuery),
  useAssetVideoImageThumbnailStreamQuery: () => (useAssetVideoImageThumbnailStreamQuery),
  useAssetVideoStreamByThumbnailQuery: () => (useAssetVideoStreamByThumbnailQuery),
  useVersionAssetDownloadByIdQuery: () => (useVersionAssetDownloadByIdQuery)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Assets",
    "Asset Grid",
    "Metadata",
    "Search",
    "Versions"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            assetClone: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/${queryArg.id}/clone/${queryArg.parentId}`,
                        method: "POST"
                    }),
                invalidatesTags: [
                    "Assets"
                ]
            }),
            assetCustomSettingsGetById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/${queryArg.id}/custom-settings`
                    }),
                providesTags: [
                    "Assets"
                ]
            }),
            assetGetTextDataById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/${queryArg.id}/text`
                    }),
                providesTags: [
                    "Assets"
                ]
            }),
            assetDocumentStreamPreview: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/${queryArg.id}/document/stream/pdf-preview`
                    }),
                providesTags: [
                    "Assets"
                ]
            }),
            assetDownloadZip: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/download/zip/${queryArg.jobRunId}`
                    }),
                providesTags: [
                    "Assets"
                ]
            }),
            assetDeleteZip: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/download/zip/${queryArg.jobRunId}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Assets"
                ]
            }),
            assetDownloadById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/${queryArg.id}/download`
                    }),
                providesTags: [
                    "Assets"
                ]
            }),
            assetExportZipAsset: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/export/zip/asset`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Assets"
                ]
            }),
            assetExportZipFolder: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/export/zip/folder`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Assets"
                ]
            }),
            assetGetById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/${queryArg.id}`
                    }),
                providesTags: [
                    "Assets"
                ]
            }),
            assetUpdateById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/${queryArg.id}`,
                        method: "PUT",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Assets"
                ]
            }),
            assetDeleteGridConfigurationByConfigurationId: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/grid/configuration/${queryArg.folderId}/${queryArg.configurationId}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Asset Grid"
                ]
            }),
            assetGetAvailableGridColumns: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/assets/grid/available-columns`
                    }),
                providesTags: [
                    "Asset Grid"
                ]
            }),
            assetGetGridConfigurationByFolderId: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/grid/configuration/${queryArg.folderId}`,
                        params: {
                            configurationId: queryArg.configurationId
                        }
                    }),
                providesTags: [
                    "Asset Grid"
                ]
            }),
            assetGetSavedGridConfigurations: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/grid/configurations/${queryArg.folderId}`
                    }),
                providesTags: [
                    "Asset Grid"
                ]
            }),
            assetSaveGridConfiguration: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/grid/configuration/save`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Asset Grid"
                ]
            }),
            assetSetGridConfigurationAsFavorite: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/grid/configuration/set-as-favorite/${queryArg.configurationId}/${queryArg.folderId}`,
                        method: "POST"
                    }),
                invalidatesTags: [
                    "Asset Grid"
                ]
            }),
            assetUpdateGridConfiguration: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/grid/configuration/update/${queryArg.configurationId}`,
                        method: "PUT",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Asset Grid"
                ]
            }),
            assetGetGrid: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/grid`,
                        method: "POST",
                        body: queryArg.body
                    }),
                providesTags: [
                    "Asset Grid"
                ]
            }),
            assetImageDownloadCustom: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/${queryArg.id}/image/download/custom`,
                        params: {
                            mimeType: queryArg.mimeType,
                            resizeMode: queryArg.resizeMode,
                            width: queryArg.width,
                            height: queryArg.height,
                            quality: queryArg.quality,
                            dpi: queryArg.dpi
                        }
                    }),
                providesTags: [
                    "Assets"
                ]
            }),
            assetImageStreamCustom: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/${queryArg.id}/image/stream/custom`,
                        params: {
                            mimeType: queryArg.mimeType,
                            resizeMode: queryArg.resizeMode,
                            width: queryArg.width,
                            height: queryArg.height,
                            quality: queryArg.quality,
                            dpi: queryArg.dpi,
                            contain: queryArg.contain,
                            frame: queryArg.frame,
                            cover: queryArg.cover,
                            forceResize: queryArg.forceResize,
                            cropPercent: queryArg.cropPercent,
                            cropWidth: queryArg.cropWidth,
                            cropHeight: queryArg.cropHeight,
                            cropTop: queryArg.cropTop,
                            cropLeft: queryArg.cropLeft
                        }
                    }),
                providesTags: [
                    "Assets"
                ]
            }),
            assetImageDownloadByFormat: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/${queryArg.id}/image/download/format/${queryArg.format}`
                    }),
                providesTags: [
                    "Assets"
                ]
            }),
            assetImageStreamPreview: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/${queryArg.id}/image/stream/preview`
                    }),
                providesTags: [
                    "Assets"
                ]
            }),
            assetImageStream: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/${queryArg.id}/image/stream`
                    }),
                providesTags: [
                    "Assets"
                ]
            }),
            assetImageDownloadByThumbnail: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/${queryArg.id}/image/download/thumbnail/${queryArg.thumbnailName}`
                    }),
                providesTags: [
                    "Assets"
                ]
            }),
            assetPatchById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets`,
                        method: "PATCH",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Assets"
                ]
            }),
            assetPatchFolderById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/folder`,
                        method: "PATCH",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Assets"
                ]
            }),
            assetClearThumbnail: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/${queryArg.id}/thumbnail/clear`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Assets"
                ]
            }),
            assetGetTree: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/tree`,
                        params: {
                            page: queryArg.page,
                            pageSize: queryArg.pageSize,
                            parentId: queryArg.parentId,
                            idSearchTerm: queryArg.idSearchTerm,
                            pqlQuery: queryArg.pqlQuery,
                            excludeFolders: queryArg.excludeFolders,
                            path: queryArg.path,
                            pathIncludeParent: queryArg.pathIncludeParent,
                            pathIncludeDescendants: queryArg.pathIncludeDescendants
                        }
                    }),
                providesTags: [
                    "Assets"
                ]
            }),
            assetAdd: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/add/${queryArg.parentId}`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Assets"
                ]
            }),
            assetUploadInfo: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/exists/${queryArg.parentId}`,
                        params: {
                            fileName: queryArg.fileName
                        }
                    }),
                providesTags: [
                    "Assets"
                ]
            }),
            assetReplace: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/${queryArg.id}/replace`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Assets"
                ]
            }),
            assetUploadZip: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/add-zip/${queryArg.parentId}`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Assets"
                ]
            }),
            assetVideoImageThumbnailStream: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/${queryArg.id}/video/stream/image-thumbnail`,
                        params: {
                            width: queryArg.width,
                            height: queryArg.height,
                            aspectRatio: queryArg.aspectRatio,
                            frame: queryArg.frame,
                            async: queryArg["async"]
                        }
                    }),
                providesTags: [
                    "Assets"
                ]
            }),
            assetVideoDownloadByThumbnail: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/${queryArg.id}/video/download/${queryArg.thumbnailName}`
                    }),
                providesTags: [
                    "Assets"
                ]
            }),
            assetVideoStreamByThumbnail: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/${queryArg.id}/video/stream/${queryArg.thumbnailName}`
                    }),
                providesTags: [
                    "Assets"
                ]
            }),
            assetCustomMetadataGetById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/${queryArg.id}/custom-metadata`
                    }),
                providesTags: [
                    "Metadata"
                ]
            }),
            assetGetSearchConfiguration: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/search/configuration/assets`
                    }),
                providesTags: [
                    "Search"
                ]
            }),
            assetGetSearch: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/search/assets`,
                        method: "POST",
                        body: queryArg.body
                    }),
                providesTags: [
                    "Search"
                ]
            }),
            versionAssetDownloadById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/versions/${queryArg.id}/asset/download`
                    }),
                providesTags: [
                    "Versions"
                ]
            })
        }),
    overrideExisting: false
});

const { useAssetCloneMutation, useAssetCustomSettingsGetByIdQuery, useAssetGetTextDataByIdQuery, useAssetDocumentStreamPreviewQuery, useAssetDownloadZipQuery, useAssetDeleteZipMutation, useAssetDownloadByIdQuery, useAssetExportZipAssetMutation, useAssetExportZipFolderMutation, useAssetGetByIdQuery, useAssetUpdateByIdMutation, useAssetDeleteGridConfigurationByConfigurationIdMutation, useAssetGetAvailableGridColumnsQuery, useAssetGetGridConfigurationByFolderIdQuery, useAssetGetSavedGridConfigurationsQuery, useAssetSaveGridConfigurationMutation, useAssetSetGridConfigurationAsFavoriteMutation, useAssetUpdateGridConfigurationMutation, useAssetGetGridQuery, useAssetImageDownloadCustomQuery, useAssetImageStreamCustomQuery, useAssetImageDownloadByFormatQuery, useAssetImageStreamPreviewQuery, useAssetImageStreamQuery, useAssetImageDownloadByThumbnailQuery, useAssetPatchByIdMutation, useAssetPatchFolderByIdMutation, useAssetClearThumbnailMutation, useAssetGetTreeQuery, useAssetAddMutation, useAssetUploadInfoQuery, useAssetReplaceMutation, useAssetUploadZipMutation, useAssetVideoImageThumbnailStreamQuery, useAssetVideoDownloadByThumbnailQuery, useAssetVideoStreamByThumbnailQuery, useAssetCustomMetadataGetByIdQuery, useAssetGetSearchConfigurationQuery, useAssetGetSearchQuery, useVersionAssetDownloadByIdQuery } = injectedRtkApi;

function $RefreshSig$() {
  return $ReactRefreshRuntime$.createSignatureFunctionForTransform();
}
function $RefreshReg$(type, id) {
  $ReactRefreshRuntime$.register(type, module.id + "_" + id);
}
Promise.resolve().then(function() {
  $ReactRefreshRuntime$.refresh(module.id, module.hot);
});


}),

}]);
//# sourceMappingURL=js_src_core_modules_asset_asset-api-slice-enhanced_ts.js.map