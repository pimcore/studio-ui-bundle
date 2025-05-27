/*!
 * 
 *             /**
 *              * This source file is available under the terms of the
 *              * Pimcore Open Core License (POCL)
 *              * Full copyright and license information is available in
 *              * LICENSE.md which is distributed with this source code.
 *              *
 *              *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *              *  @license    Pimcore Open Core License (POCL)
 *              * /
 *
 */
"use strict";
self["webpackHotUpdatepimcore_studio_ui_bundle_core"]("js_src_core_mf-bootstrap_ts", {
"./js/src/core/components/key-value-list/key-value-list.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  KeyValueList: () => (KeyValueList)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_components_text_text__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/text/text.tsx");
/* ESM import */var _Pimcore_components_sanitize_html_sanitize_html__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/sanitize-html/sanitize-html.tsx");
/* ESM import */var _Pimcore_utils_type_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/utils/type-utils.ts");
/* ESM import */var _Pimcore_utils_date_time__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/utils/date-time.ts");
/* ESM import */var _key_value_list_styles__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/key-value-list/key-value-list.styles.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 
var _s = $RefreshSig$();








const FIELDS_TO_CONVERT_TO_DATE = [
    'creationDate',
    'modificationDate'
];
const SPECIAL_DATA_TYPES = [
    'documentData',
    'objectData'
];
const KeyValueList = (param)=>{
    let { items, skipEmpty = true } = param;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation)();
    const { styles } = (0,_key_value_list_styles__WEBPACK_IMPORTED_MODULE_8__.useStyles)();
    const preparedItems = [];
    const shouldSkipValue = (value)=>skipEmpty && ((0,_Pimcore_utils_type_utils__WEBPACK_IMPORTED_MODULE_6__.isEmptyValue)(value) || (0,lodash__WEBPACK_IMPORTED_MODULE_2__.isEqual)(value, false));
    items.forEach((item)=>{
        if (shouldSkipValue(item === null || item === void 0 ? void 0 : item.value)) {
            return;
        }
        if (SPECIAL_DATA_TYPES.includes(item.key)) {
            if ((0,lodash__WEBPACK_IMPORTED_MODULE_2__.isObject)(item.value)) {
                const renderObjectValue = (objectValue)=>{
                    Object.entries(objectValue).forEach((param)=>{
                        let [key, value] = param;
                        if (shouldSkipValue(value)) {
                            return;
                        }
                        if ((0,lodash__WEBPACK_IMPORTED_MODULE_2__.isObject)(value)) {
                            renderObjectValue(value);
                        } else {
                            preparedItems.push({
                                key,
                                value,
                                withoutTranslate: item.key === 'objectData'
                            });
                        }
                    });
                };
                renderObjectValue(item.value);
            }
        } else {
            preparedItems.push(item);
        }
    });
    const renderItem = (item)=>{
        let fieldValue = item === null || item === void 0 ? void 0 : item.value;
        if (FIELDS_TO_CONVERT_TO_DATE.includes(item.key) && !(0,lodash__WEBPACK_IMPORTED_MODULE_2__.isObject)(item === null || item === void 0 ? void 0 : item.value)) {
            fieldValue = (0,_Pimcore_utils_date_time__WEBPACK_IMPORTED_MODULE_7__.formatDateTime)({
                timestamp: (item === null || item === void 0 ? void 0 : item.value) ?? null,
                dateStyle: 'short',
                timeStyle: 'short'
            });
        }
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("tr", {
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("td", {
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_text_text__WEBPACK_IMPORTED_MODULE_4__.Text, {
                        children: (item === null || item === void 0 ? void 0 : item.withoutTranslate) === true ? item.key : t(`modal-search.field.${item.key}`)
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/key-value-list/key-value-list.tsx",
                        lineNumber: 81,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/key-value-list/key-value-list.tsx",
                    lineNumber: 80,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("td", {
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_text_text__WEBPACK_IMPORTED_MODULE_4__.Text, {
                        children: fieldValue === 0 ? fieldValue : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_sanitize_html_sanitize_html__WEBPACK_IMPORTED_MODULE_5__.SanitizeHtml, {
                            html: fieldValue ?? ''
                        }, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/key-value-list/key-value-list.tsx",
                            lineNumber: 85,
                            columnNumber: 46
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/key-value-list/key-value-list.tsx",
                        lineNumber: 84,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/key-value-list/key-value-list.tsx",
                    lineNumber: 83,
                    columnNumber: 9
                }, undefined)
            ]
        }, item.key, true, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/key-value-list/key-value-list.tsx",
            lineNumber: 79,
            columnNumber: 7
        }, undefined);
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("table", {
        className: styles.keyValueList,
        children: preparedItems.map((item)=>renderItem(item))
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/key-value-list/key-value-list.tsx",
        lineNumber: 93,
        columnNumber: 5
    }, undefined);
};
_s(KeyValueList, "RLrtxoYLhU6K3pUxNPOpN7Ah0UQ=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation,
        _key_value_list_styles__WEBPACK_IMPORTED_MODULE_8__.useStyles
    ];
});
_c = KeyValueList;
var _c;
$RefreshReg$(_c, "KeyValueList");

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
"./js/src/core/modules/app/mercure-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useMercureCreateCookieMutation: () => (useMercureCreateCookieMutation)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Mercure"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            mercureCreateCookie: build.mutation({
                query: ()=>({
                        url: `/pimcore-studio/api/mercure/auth`,
                        method: "POST"
                    }),
                invalidatesTags: [
                    "Mercure"
                ]
            })
        }),
    overrideExisting: false
});

const { useMercureCreateCookieMutation } = injectedRtkApi;

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
"./js/src/core/modules/app/translations/translations-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useTranslationCreateMutation: () => (useTranslationCreateMutation),
  useTranslationDeleteByKeyMutation: () => (useTranslationDeleteByKeyMutation),
  useTranslationGetCollectionMutation: () => (useTranslationGetCollectionMutation),
  useTranslationUpdateMutation: () => (useTranslationUpdateMutation)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Translation"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            translationCreate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/translations/create`,
                        method: "POST",
                        body: queryArg.createTranslation
                    }),
                invalidatesTags: [
                    "Translation"
                ]
            }),
            translationDeleteByKey: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/translations/${queryArg.key}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Translation"
                ]
            }),
            translationUpdate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/translations`,
                        method: "PUT",
                        body: queryArg.updateTranslation
                    }),
                invalidatesTags: [
                    "Translation"
                ]
            }),
            translationGetCollection: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/translations`,
                        method: "POST",
                        body: queryArg.translation
                    }),
                invalidatesTags: [
                    "Translation"
                ]
            })
        }),
    overrideExisting: false
});

const { useTranslationCreateMutation, useTranslationDeleteByKeyMutation, useTranslationUpdateMutation, useTranslationGetCollectionMutation } = injectedRtkApi;

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
  useAssetVideoStreamByThumbnailQuery: () => (useAssetVideoStreamByThumbnailQuery)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Assets",
    "Asset Grid",
    "Metadata"
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
                        url: `/pimcore-studio/api/assets/grid/configuration/${queryArg.configurationId}`,
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
                query: ()=>({
                        url: `/pimcore-studio/api/assets/grid/configurations`
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
            })
        }),
    overrideExisting: false
});

const { useAssetCloneMutation, useAssetCustomSettingsGetByIdQuery, useAssetGetTextDataByIdQuery, useAssetDocumentStreamPreviewQuery, useAssetDownloadZipQuery, useAssetDeleteZipMutation, useAssetDownloadByIdQuery, useAssetExportZipAssetMutation, useAssetExportZipFolderMutation, useAssetGetByIdQuery, useAssetUpdateByIdMutation, useAssetDeleteGridConfigurationByConfigurationIdMutation, useAssetGetAvailableGridColumnsQuery, useAssetGetGridConfigurationByFolderIdQuery, useAssetGetSavedGridConfigurationsQuery, useAssetSaveGridConfigurationMutation, useAssetSetGridConfigurationAsFavoriteMutation, useAssetUpdateGridConfigurationMutation, useAssetGetGridQuery, useAssetImageDownloadCustomQuery, useAssetImageStreamCustomQuery, useAssetImageDownloadByFormatQuery, useAssetImageStreamPreviewQuery, useAssetImageStreamQuery, useAssetImageDownloadByThumbnailQuery, useAssetPatchByIdMutation, useAssetPatchFolderByIdMutation, useAssetClearThumbnailMutation, useAssetGetTreeQuery, useAssetAddMutation, useAssetUploadInfoQuery, useAssetReplaceMutation, useAssetUploadZipMutation, useAssetVideoImageThumbnailStreamQuery, useAssetVideoDownloadByThumbnailQuery, useAssetVideoStreamByThumbnailQuery, useAssetCustomMetadataGetByIdQuery } = injectedRtkApi;

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
"./js/src/core/modules/asset/editor/shared-tab-manager/tabs/custom-metadata/metadata-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useAssetCustomMetadataGetByIdQuery: () => (useAssetCustomMetadataGetByIdQuery),
  useMetadataGetCollectionQuery: () => (useMetadataGetCollectionQuery)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Metadata"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            assetCustomMetadataGetById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/${queryArg.id}/custom-metadata`
                    }),
                providesTags: [
                    "Metadata"
                ]
            }),
            metadataGetCollection: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/metadata`,
                        method: "POST",
                        body: queryArg.body
                    }),
                providesTags: [
                    "Metadata"
                ]
            })
        }),
    overrideExisting: false
});

const { useAssetCustomMetadataGetByIdQuery, useMetadataGetCollectionQuery } = injectedRtkApi;

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
"./js/src/core/modules/asset/editor/types/audio/tab-manager/tabs/preview/preview-container.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  PreviewContainer: () => (PreviewContainer)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _preview_view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/asset/editor/types/audio/tab-manager/tabs/preview/preview-view.tsx");
/* ESM import */var _Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/asset/asset-api-slice-enhanced.ts");
/* ESM import */var _Pimcore_modules_asset_asset_provider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/asset/asset-provider.tsx");
/* ESM import */var _Pimcore_components_content_layout_content_layout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/content-layout/content-layout.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 
var _s = $RefreshSig$();





const PreviewContainer = ()=>{
    _s();
    const assetContext = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_Pimcore_modules_asset_asset_provider__WEBPACK_IMPORTED_MODULE_4__.AssetContext);
    const { data } = (0,_Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_3__.useAssetGetByIdQuery)({
        id: assetContext.id
    });
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_layout_content_layout__WEBPACK_IMPORTED_MODULE_5__.ContentLayout, {
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_preview_view__WEBPACK_IMPORTED_MODULE_2__.PreviewView, {
            src: data.fullPath
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/audio/tab-manager/tabs/preview/preview-container.tsx",
            lineNumber: 25,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/audio/tab-manager/tabs/preview/preview-container.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, undefined);
};
_s(PreviewContainer, "SE0Nw5P3kNt86QksiRF7u6Urqfo=", false, function() {
    return [
        _Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_3__.useAssetGetByIdQuery
    ];
});
_c = PreviewContainer;

var _c;
$RefreshReg$(_c, "PreviewContainer");

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
"./js/src/core/modules/asset/editor/types/folder/tab-manager/tabs/preview/card/preview-card-container.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  PreviewCardContainer: () => (PreviewCardContainer)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_components_preview_card_preview_card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/preview-card/preview-card.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_modules_asset_hooks_use_asset_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/asset/hooks/use-asset-helper.ts");
/* ESM import */var _Pimcore_modules_element_actions_rename_use_rename__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/element/actions/rename/use-rename.tsx");
/* ESM import */var _Pimcore_modules_element_actions_delete_use_delete__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/element/actions/delete/use-delete.tsx");
/* ESM import */var _Pimcore_modules_asset_actions_download_use_download__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/asset/actions/download/use-download.tsx");
/* ESM import */var _Pimcore_modules_asset_actions_upload_new_version_upload_new_version__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/asset/actions/upload-new-version/upload-new-version.tsx");
/* ESM import */var _Pimcore_modules_element_actions_open_open__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/element/actions/open/open.tsx");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/element/element-helper.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_12__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 
var _s = $RefreshSig$();












const PreviewCardContainer = (param)=>{
    let { asset } = param;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation)();
    const { openAsset } = (0,_Pimcore_modules_asset_hooks_use_asset_helper__WEBPACK_IMPORTED_MODULE_4__.useAssetHelper)();
    const { renameContextMenuItem } = (0,_Pimcore_modules_element_actions_rename_use_rename__WEBPACK_IMPORTED_MODULE_5__.useRename)('asset', (0,_Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_11__.getElementActionCacheKey)('asset', 'rename', asset.id));
    const { deleteContextMenuItem } = (0,_Pimcore_modules_element_actions_delete_use_delete__WEBPACK_IMPORTED_MODULE_6__.useDelete)('asset', (0,_Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_11__.getElementActionCacheKey)('asset', 'delete', asset.id));
    const { downloadContextMenuItem } = (0,_Pimcore_modules_asset_actions_download_use_download__WEBPACK_IMPORTED_MODULE_7__.useDownload)();
    const { uploadNewVersionContextMenuItem } = (0,_Pimcore_modules_asset_actions_upload_new_version_upload_new_version__WEBPACK_IMPORTED_MODULE_8__.useUploadNewVersion)();
    const { openContextMenuItem } = (0,_Pimcore_modules_element_actions_open_open__WEBPACK_IMPORTED_MODULE_9__.useOpen)('asset');
    const onClickCard = (e)=>{
        openAsset({
            config: {
                id: asset.id
            }
        });
    };
    const dropdownItems = [
        openContextMenuItem(asset),
        {
            key: 'locate-in-tree',
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_10__.Icon, {
                value: "target"
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/folder/tab-manager/tabs/preview/card/preview-card-container.tsx",
                lineNumber: 51,
                columnNumber: 13
            }, undefined),
            label: t('preview-card.locate-in-tree'),
            hidden: true
        },
        {
            key: 'info',
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_10__.Icon, {
                value: "info-circle"
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/folder/tab-manager/tabs/preview/card/preview-card-container.tsx",
                lineNumber: 57,
                columnNumber: 13
            }, undefined),
            label: t('info'),
            hidden: true
        },
        renameContextMenuItem(asset),
        uploadNewVersionContextMenuItem(asset),
        downloadContextMenuItem(asset),
        deleteContextMenuItem(asset)
    ];
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_preview_card_preview_card__WEBPACK_IMPORTED_MODULE_1__.PreviewCard, {
        dropdownItems: dropdownItems,
        imgSrc: 'imageThumbnailPath' in asset && (0,lodash__WEBPACK_IMPORTED_MODULE_12__.isString)(asset.imageThumbnailPath) ? asset.imageThumbnailPath : asset.icon,
        name: asset.filename,
        onClick: onClickCard
    }, asset.id, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/folder/tab-manager/tabs/preview/card/preview-card-container.tsx",
        lineNumber: 68,
        columnNumber: 5
    }, undefined);
};
_s(PreviewCardContainer, "i6/OKgqcAa3qdLV+ABgR/kMg5hU=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation,
        _Pimcore_modules_asset_hooks_use_asset_helper__WEBPACK_IMPORTED_MODULE_4__.useAssetHelper,
        _Pimcore_modules_element_actions_rename_use_rename__WEBPACK_IMPORTED_MODULE_5__.useRename,
        _Pimcore_modules_element_actions_delete_use_delete__WEBPACK_IMPORTED_MODULE_6__.useDelete,
        _Pimcore_modules_asset_actions_download_use_download__WEBPACK_IMPORTED_MODULE_7__.useDownload,
        _Pimcore_modules_asset_actions_upload_new_version_upload_new_version__WEBPACK_IMPORTED_MODULE_8__.useUploadNewVersion,
        _Pimcore_modules_element_actions_open_open__WEBPACK_IMPORTED_MODULE_9__.useOpen
    ];
});
_c = PreviewCardContainer;
var _c;
$RefreshReg$(_c, "PreviewCardContainer");

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
"./js/src/core/modules/asset/editor/types/image/tab-manager/tabs/preview/sidebar/tabs/details/details-container.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DetailContainer: () => (DetailContainer)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/asset/asset-api-slice-enhanced.ts");
/* ESM import */var _Pimcore_modules_asset_asset_provider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/asset/asset-provider.tsx");
/* ESM import */var _Pimcore_modules_asset_editor_types_image_tab_manager_tabs_preview_sidebar_tabs_details_details_view__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/asset/editor/types/image/tab-manager/tabs/preview/sidebar/tabs/details/details-view.tsx");
/* ESM import */var _Pimcore_utils_files__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/utils/files.ts");
/* ESM import */var _Pimcore_utils_query_string__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/utils/query-string.ts");
/* ESM import */var _Pimcore_app_api_pimcore_route__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/app/api/pimcore/route.ts");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 
var _s = $RefreshSig$();








const DetailContainer = ()=>{
    _s();
    const assetContext = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_Pimcore_modules_asset_asset_provider__WEBPACK_IMPORTED_MODULE_3__.AssetContext);
    const { data } = (0,_Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__.useAssetGetByIdQuery)({
        id: assetContext.id
    });
    const imageData = data;
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_asset_editor_types_image_tab_manager_tabs_preview_sidebar_tabs_details_details_view__WEBPACK_IMPORTED_MODULE_4__.AssetEditorSidebarDetailsView, {
        height: imageData.height ?? 0,
        onClickCustomDownload: async (customDownloadProps)=>{
            downloadImageByCustomSettings(assetContext.id, customDownloadProps);
        },
        onClickDownloadByFormat: async (format)=>{
            downloadImageByFormat(assetContext.id, format);
        },
        width: imageData.width ?? 0
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/image/tab-manager/tabs/preview/sidebar/tabs/details/details-container.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, undefined);
    function downloadImageByCustomSettings(id, param) {
        let { width, height, quality, dpi, mode, format } = param;
        // ?mimeType=JPEG&resizeMode=scaleByWidth&width=140&height=78&quality=99&dpi=200
        const keyValues = [
            {
                key: 'mimeType',
                value: format
            },
            {
                key: 'resizeMode',
                value: mode
            },
            {
                key: 'dpi',
                value: dpi.toString()
            },
            {
                key: 'quality',
                value: quality.toString()
            },
            {
                key: 'height',
                value: height.toString()
            },
            {
                key: 'width',
                value: width.toString()
            }
        ];
        const queryString = (0,_Pimcore_utils_query_string__WEBPACK_IMPORTED_MODULE_6__.buildQueryString)(keyValues, [
            '',
            '-1'
        ]);
        fetch(`${(0,_Pimcore_app_api_pimcore_route__WEBPACK_IMPORTED_MODULE_7__.getPrefix)()}/assets/${id}/image/download/custom?${queryString}`).then(async (response)=>await response.blob()).then((imageBlob)=>{
            const imageURL = URL.createObjectURL(imageBlob);
            downloadShortcutsHandlerForCustomSettings(imageData.filename, imageURL, format);
        }).catch(()=>{
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_8__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_8__.GeneralError('Could not download image'));
        });
    }
    function downloadImageByFormat(id, format) {
        if (format === 'original') {
            prepareDownload(`${(0,_Pimcore_app_api_pimcore_route__WEBPACK_IMPORTED_MODULE_7__.getPrefix)()}/assets/${id}/download`, format);
            return;
        }
        prepareDownload(`${(0,_Pimcore_app_api_pimcore_route__WEBPACK_IMPORTED_MODULE_7__.getPrefix)()}/assets/${id}/image/download/format/${format}`, format);
    }
    function prepareDownload(url, format) {
        fetch(url).then(async (response)=>await response.blob()).then((imageBlob)=>{
            const imageURL = URL.createObjectURL(imageBlob);
            downloadShortcutsHandler(imageData.filename, imageURL, format);
        }).catch(()=>{
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_8__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_8__.GeneralError('Could not prepare download'));
        });
    }
    function downloadShortcutsHandler(name, url, format) {
        let filename = name;
        if (format !== 'original') {
            filename = (0,_Pimcore_utils_files__WEBPACK_IMPORTED_MODULE_5__.replaceFileEnding)(name, 'jpg');
        }
        (0,_Pimcore_utils_files__WEBPACK_IMPORTED_MODULE_5__.saveFileLocal)(url, filename);
    }
    function downloadShortcutsHandlerForCustomSettings(name, url, format) {
        const filename = (0,_Pimcore_utils_files__WEBPACK_IMPORTED_MODULE_5__.replaceFileEnding)(name, format.toLowerCase());
        (0,_Pimcore_utils_files__WEBPACK_IMPORTED_MODULE_5__.saveFileLocal)(url, filename);
    }
};
_s(DetailContainer, "SE0Nw5P3kNt86QksiRF7u6Urqfo=", false, function() {
    return [
        _Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__.useAssetGetByIdQuery
    ];
});
_c = DetailContainer;

var _c;
$RefreshReg$(_c, "DetailContainer");

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
"./js/src/core/modules/asset/listing/batch-actions/batch-edit-modal/batch-edit-modal.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  BatchEditModal: () => (BatchEditModal)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_components_modal_footer_modal_footer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/modal/footer/modal-footer.tsx");
/* ESM import */var _Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/dropdown/dropdown.tsx");
/* ESM import */var _Pimcore_components_icon_text_button_icon_text_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/icon-text-button/icon-text-button.tsx");
/* ESM import */var _Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/button/button.tsx");
/* ESM import */var _Pimcore_components_modal_window_modal_window_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/modal/window-modal/window-modal.tsx");
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var _Pimcore_components_modal_modal_title_modal_title__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/components/modal/modal-title/modal-title.tsx");
/* ESM import */var _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_available_columns_use_available_columns__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/use-available-columns.tsx");
/* ESM import */var _hooks_use_batch_edit__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/asset/listing/batch-actions/batch-edit-modal/hooks/use-batch-edit.ts");
/* ESM import */var _batch_edit_list_container__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/asset/listing/batch-actions/batch-edit-modal/batch-edit-list-container.tsx");
/* ESM import */var _Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/components/form/form.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./js/src/core/modules/asset/asset-api-slice-enhanced.ts");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* ESM import */var _Pimcore_modules_element_listing_decorators_row_selection_context_layer_provider_use_row_selection__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/row-selection/context-layer/provider/use-row-selection.tsx");
/* ESM import */var _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("./js/src/core/app/api/pimcore/tags.ts");
/* ESM import */var _Pimcore_modules_execution_engine_hooks_useJobs__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__("./js/src/core/modules/execution-engine/hooks/useJobs.ts");
/* ESM import */var _Pimcore_modules_execution_engine_topics__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__("./js/src/core/modules/execution-engine/topics.ts");
/* ESM import */var _Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__("./js/src/core/modules/element/hooks/use-element-context.ts");
/* ESM import */var _Pimcore_modules_execution_engine_jobs_batch_edit_factory__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__("./js/src/core/modules/execution-engine/jobs/batch-edit/factory.ts");
/* ESM import */var _Pimcore_modules_element_listing_abstract_settings_use_settings__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__("./js/src/core/modules/element/listing/abstract/settings/use-settings.ts");
/* ESM import */var _Pimcore_modules_element_dynamic_types_resolver_hooks_use_dynamic_type_resolver__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/resolver/hooks/use-dynamic-type-resolver.ts");
/* ESM import */var _Pimcore_modules_element_actions_refresh_grid_use_refresh_grid__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__("./js/src/core/modules/element/actions/refresh-grid/use-refresh-grid.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 
var _s = $RefreshSig$();

























const BatchEditModal = (param)=>{
    let { batchEditModalOpen, setBatchEditModalOpen } = param;
    var _getFilteredAvailableDropdownList;
    _s();
    const { getAvailableColumnsDropdown } = (0,_Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_available_columns_use_available_columns__WEBPACK_IMPORTED_MODULE_10__.useAvailableColumns)();
    const { batchEdits, addOrUpdateBatchEdit, resetBatchEdits } = (0,_hooks_use_batch_edit__WEBPACK_IMPORTED_MODULE_11__.useBatchEdit)();
    const [form] = _Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_13__.Form.useForm();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_14__.useTranslation)();
    const [patchAssets, { isError, isSuccess, error }] = (0,_Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_15__.useAssetPatchByIdMutation)();
    const [patchAssetsInFolder, { isError: isFolderPatchError, isSuccess: isFolderPatchSuccess, error: folderPatchError }] = (0,_Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_15__.useAssetPatchFolderByIdMutation)();
    const { selectedRows } = (0,_Pimcore_modules_element_listing_decorators_row_selection_context_layer_provider_use_row_selection__WEBPACK_IMPORTED_MODULE_17__.useRowSelection)();
    const selectedRowsIds = Object.keys(selectedRows ?? {}).map(Number);
    const selectedRowsCount = selectedRowsIds.length;
    const { addJob } = (0,_Pimcore_modules_execution_engine_hooks_useJobs__WEBPACK_IMPORTED_MODULE_19__.useJobs)();
    const { id, elementType } = (0,_Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_21__.useElementContext)();
    const { useDataQueryHelper } = (0,_Pimcore_modules_element_listing_abstract_settings_use_settings__WEBPACK_IMPORTED_MODULE_23__.useSettings)();
    const { getArgs } = useDataQueryHelper();
    const { hasType } = (0,_Pimcore_modules_element_dynamic_types_resolver_hooks_use_dynamic_type_resolver__WEBPACK_IMPORTED_MODULE_24__.useDynamicTypeResolver)();
    const { refreshGrid } = (0,_Pimcore_modules_element_actions_refresh_grid_use_refresh_grid__WEBPACK_IMPORTED_MODULE_25__.useRefreshGrid)(elementType);
    const resetModal = ()=>{
        resetBatchEdits();
        form.resetFields();
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (isSuccess || isFolderPatchSuccess) {
            setBatchEditModalOpen(false);
            resetModal();
        }
        if (selectedRowsCount === 1) {
            _Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_15__.api.util.invalidateTags(_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_18__.invalidatingTags.ASSET_GRID_ID(selectedRowsIds[0]));
        }
    }, [
        isSuccess,
        isFolderPatchSuccess
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (isError) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_16__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_16__.ApiError(error));
        }
        if (isFolderPatchError) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_16__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_16__.ApiError(folderPatchError));
        }
    }, [
        isError,
        isFolderPatchSuccess
    ]);
    const onColumnClick = (column)=>{
        const locale = column.locale ?? null;
        addOrUpdateBatchEdit({
            ...column,
            locale
        });
    };
    const handleApplyChanges = ()=>{
        form.submit();
        setBatchEditModalOpen(false);
    };
    const onFormFinish = async (values)=>{
        const patches = batchEdits.map((batchEdit)=>{
            return {
                name: batchEdit.key,
                language: batchEdit.locale ?? null,
                data: values[batchEdit.key],
                type: batchEdit.type
            };
        });
        if (selectedRowsCount === 0) {
            addJob((0,_Pimcore_modules_execution_engine_jobs_batch_edit_factory__WEBPACK_IMPORTED_MODULE_22__.createJob)({
                title: t('batch-edit.job-title'),
                topics: [
                    _Pimcore_modules_execution_engine_topics__WEBPACK_IMPORTED_MODULE_20__.topics["patch-finished"],
                    ..._Pimcore_modules_execution_engine_topics__WEBPACK_IMPORTED_MODULE_20__.defaultTopics
                ],
                action: async ()=>{
                    var _getArgs_body, _getArgs, _response_data, _response_data1;
                    const response = await patchAssetsInFolder({
                        body: {
                            data: [
                                {
                                    folderId: id,
                                    metadata: patches
                                }
                            ],
                            filters: (_getArgs = getArgs()) === null || _getArgs === void 0 ? void 0 : (_getArgs_body = _getArgs.body) === null || _getArgs_body === void 0 ? void 0 : _getArgs_body.filters
                        }
                    });
                    if (((_response_data = response.data) === null || _response_data === void 0 ? void 0 : _response_data.jobRunId) === undefined) {
                        (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_16__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_16__.GeneralError('JobRunId is undefined'));
                        throw new Error('JobRunId is undefined');
                    }
                    return (_response_data1 = response.data) === null || _response_data1 === void 0 ? void 0 : _response_data1.jobRunId;
                },
                refreshGrid,
                // @todo change that to a more generic context
                assetContextId: id
            }));
        } else if (selectedRowsCount === 1) {
            await patchAssets({
                body: {
                    data: [
                        {
                            id: selectedRowsIds[0],
                            metadata: patches
                        }
                    ]
                }
            });
        } else {
            addJob((0,_Pimcore_modules_execution_engine_jobs_batch_edit_factory__WEBPACK_IMPORTED_MODULE_22__.createJob)({
                title: t('batch-edit.job-title'),
                topics: [
                    _Pimcore_modules_execution_engine_topics__WEBPACK_IMPORTED_MODULE_20__.topics["patch-finished"],
                    ..._Pimcore_modules_execution_engine_topics__WEBPACK_IMPORTED_MODULE_20__.defaultTopics
                ],
                action: async ()=>{
                    var _response_data, _response_data1;
                    const response = await patchAssets({
                        body: {
                            data: selectedRowsIds.map((rowId)=>({
                                    id: rowId,
                                    metadata: patches
                                }))
                        }
                    });
                    if (((_response_data = response.data) === null || _response_data === void 0 ? void 0 : _response_data.jobRunId) === undefined) {
                        (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_16__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_16__.GeneralError('JobRunId is undefined'));
                        throw new Error('JobRunId is undefined');
                    }
                    return (_response_data1 = response.data) === null || _response_data1 === void 0 ? void 0 : _response_data1.jobRunId;
                },
                refreshGrid,
                // @todo change that to a more generic context
                assetContextId: id
            }));
        }
    };
    const availableDropdownList = getAvailableColumnsDropdown(onColumnClick).menu.items;
    const getFilteredTypes = (column)=>{
        var _column_children;
        return column === null || column === void 0 ? void 0 : (_column_children = column.children) === null || _column_children === void 0 ? void 0 : _column_children.filter((child)=>{
            const isEditable = child.editable === true;
            const isAlreadyInBatchEditList = batchEdits.some((item)=>child.key === item.key && child.group === item.group);
            const hasDynamicType = hasType({
                target: 'BATCH_EDIT',
                dynamicTypeIds: [
                    child === null || child === void 0 ? void 0 : child.frontendType
                ]
            });
            return isEditable && hasDynamicType && !isAlreadyInBatchEditList;
        });
    };
    const getFilteredAvailableDropdownList = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>()=>{
            if ((0,lodash__WEBPACK_IMPORTED_MODULE_2__.isUndefined)(availableDropdownList)) return [];
            return availableDropdownList.map((column)=>{
                return {
                    ...column,
                    children: getFilteredTypes(column)
                };
            });
        }, [
        availableDropdownList
    ]);
    const isEmptyDropdownList = (_getFilteredAvailableDropdownList = getFilteredAvailableDropdownList()) === null || _getFilteredAvailableDropdownList === void 0 ? void 0 : _getFilteredAvailableDropdownList.every((item)=>{
        var _item_children;
        return (item === null || item === void 0 ? void 0 : (_item_children = item.children) === null || _item_children === void 0 ? void 0 : _item_children.length) === 0;
    });
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_modal_window_modal_window_modal__WEBPACK_IMPORTED_MODULE_7__.WindowModal, {
        afterClose: ()=>{
            resetModal();
        },
        footer: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_modal_footer_modal_footer__WEBPACK_IMPORTED_MODULE_3__.ModalFooter, {
            divider: true,
            justify: 'space-between',
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_4__.Dropdown, {
                    menu: {
                        items: getFilteredAvailableDropdownList()
                    },
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_text_button_icon_text_button__WEBPACK_IMPORTED_MODULE_5__.IconTextButton, {
                        disabled: isEmptyDropdownList,
                        icon: {
                            value: 'new'
                        },
                        type: "default",
                        children: t('listing.add-column')
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/listing/batch-actions/batch-edit-modal/batch-edit-modal.tsx",
                        lineNumber: 209,
                        columnNumber: 13
                    }, void 0)
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/listing/batch-actions/batch-edit-modal/batch-edit-modal.tsx",
                    lineNumber: 208,
                    columnNumber: 11
                }, void 0),
                batchEdits.length > 0 && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_8__.Flex, {
                    align: 'center',
                    gap: 'extra-small',
                    children: [
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_text_button_icon_text_button__WEBPACK_IMPORTED_MODULE_5__.IconTextButton, {
                            icon: {
                                value: 'close'
                            },
                            onClick: ()=>{
                                resetBatchEdits();
                            },
                            type: "link",
                            children: t('batch-edit.modal-footer.discard-all-changes')
                        }, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/listing/batch-actions/batch-edit-modal/batch-edit-modal.tsx",
                            lineNumber: 223,
                            columnNumber: 17
                        }, void 0),
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_6__.Button, {
                            onClick: handleApplyChanges,
                            type: "primary",
                            children: t('batch-edit.modal-footer.apply-changes')
                        }, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/listing/batch-actions/batch-edit-modal/batch-edit-modal.tsx",
                            lineNumber: 232,
                            columnNumber: 17
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/listing/batch-actions/batch-edit-modal/batch-edit-modal.tsx",
                    lineNumber: 219,
                    columnNumber: 15
                }, void 0)
            ]
        }, void 0, true, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/listing/batch-actions/batch-edit-modal/batch-edit-modal.tsx",
            lineNumber: 204,
            columnNumber: 9
        }, void 0),
        onCancel: ()=>{
            setBatchEditModalOpen(false);
            resetModal();
        },
        open: batchEditModalOpen,
        size: "M",
        title: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_modal_modal_title_modal_title__WEBPACK_IMPORTED_MODULE_9__.ModalTitle, {
            children: t('batch-edit.modal-title')
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/listing/batch-actions/batch-edit-modal/batch-edit-modal.tsx",
            lineNumber: 248,
            columnNumber: 15
        }, void 0),
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_13__.Form, {
            form: form,
            onFinish: onFormFinish,
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_batch_edit_list_container__WEBPACK_IMPORTED_MODULE_12__.BatchEditListContainer, {}, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/listing/batch-actions/batch-edit-modal/batch-edit-modal.tsx",
                lineNumber: 254,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/listing/batch-actions/batch-edit-modal/batch-edit-modal.tsx",
            lineNumber: 250,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/listing/batch-actions/batch-edit-modal/batch-edit-modal.tsx",
        lineNumber: 199,
        columnNumber: 5
    }, undefined);
};
_s(BatchEditModal, "fJjSB+aanyTXSUqdVmAc2baZh5A=", true, function() {
    return [
        _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_available_columns_use_available_columns__WEBPACK_IMPORTED_MODULE_10__.useAvailableColumns,
        _hooks_use_batch_edit__WEBPACK_IMPORTED_MODULE_11__.useBatchEdit,
        _Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_13__.Form.useForm,
        react_i18next__WEBPACK_IMPORTED_MODULE_14__.useTranslation,
        _Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_15__.useAssetPatchByIdMutation,
        _Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_15__.useAssetPatchFolderByIdMutation,
        _Pimcore_modules_element_listing_decorators_row_selection_context_layer_provider_use_row_selection__WEBPACK_IMPORTED_MODULE_17__.useRowSelection,
        _Pimcore_modules_execution_engine_hooks_useJobs__WEBPACK_IMPORTED_MODULE_19__.useJobs,
        _Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_21__.useElementContext,
        _Pimcore_modules_element_listing_abstract_settings_use_settings__WEBPACK_IMPORTED_MODULE_23__.useSettings,
        _Pimcore_modules_element_dynamic_types_resolver_hooks_use_dynamic_type_resolver__WEBPACK_IMPORTED_MODULE_24__.useDynamicTypeResolver,
        _Pimcore_modules_element_actions_refresh_grid_use_refresh_grid__WEBPACK_IMPORTED_MODULE_25__.useRefreshGrid
    ];
});
_c = BatchEditModal;
var _c;
$RefreshReg$(_c, "BatchEditModal");

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
"./js/src/core/modules/asset/listing/decorator/column-configuration/view-layer/components/sidebar/tabs/grid-config/grid-config-inner.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  GridConfigInner: () => (GridConfigInner)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _hooks_use_grid_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/asset/listing/decorator/column-configuration/view-layer/components/sidebar/tabs/grid-config/hooks/use-grid-config.tsx");
/* ESM import */var _Pimcore_modules_auth_hooks_use_user__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/auth/hooks/use-user.ts");
/* ESM import */var _Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/asset/asset-api-slice-enhanced.ts");
/* ESM import */var _views_edit_view__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/asset/listing/decorator/column-configuration/view-layer/components/sidebar/tabs/grid-config/views/edit-view.tsx");
/* ESM import */var _views_save_view__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/asset/listing/decorator/column-configuration/view-layer/components/sidebar/tabs/grid-config/views/save-view.tsx");
/* ESM import */var antd_es_form_Form__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("./node_modules/antd/es/form/hooks/useForm.js");
/* ESM import */var _forms_save_form__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/asset/listing/decorator/column-configuration/view-layer/components/sidebar/tabs/grid-config/forms/save-form.tsx");
/* ESM import */var _Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/components/content/content.tsx");
/* ESM import */var _Pimcore_modules_user_roles_roles_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/user/roles/roles-api-slice-enhanced.ts");
/* ESM import */var _Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/user/user-api-slice-enhanced.ts");
/* ESM import */var _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_available_columns_use_available_columns__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/use-available-columns.tsx");
/* ESM import */var _Pimcore_modules_element_listing_abstract_configuration_layer_provider_selected_columns_use_selected_columns__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns.tsx");
/* ESM import */var _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_grid_config_use_grid_config__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/grid-config/use-grid-config.ts");
/* ESM import */var _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_selected_grid_config_id_use_selected_grid_config_id__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/selected-grid-config-id/use-selected-grid-config-id.ts");
/* ESM import */var _Pimcore_modules_element_listing_abstract_settings_use_settings__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("./js/src/core/modules/element/listing/abstract/settings/use-settings.ts");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 
var _s = $RefreshSig$();


















var ViewState = /*#__PURE__*/ function(ViewState) {
    ViewState["Edit"] = "edit";
    ViewState["Save"] = "save";
    ViewState["Update"] = "update";
    return ViewState;
}(ViewState || {});
const GridConfigInner = ()=>{
    _s();
    const { useElementId } = (0,_Pimcore_modules_element_listing_abstract_settings_use_settings__WEBPACK_IMPORTED_MODULE_16__.useSettings)();
    const { getAvailableColumnsDropdown } = (0,_Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_available_columns_use_available_columns__WEBPACK_IMPORTED_MODULE_12__.useAvailableColumns)();
    const { selectedColumns, setSelectedColumns } = (0,_Pimcore_modules_element_listing_abstract_configuration_layer_provider_selected_columns_use_selected_columns__WEBPACK_IMPORTED_MODULE_13__.useSelectedColumns)();
    const { columns, setColumns, addColumn } = (0,_hooks_use_grid_config__WEBPACK_IMPORTED_MODULE_3__.useGridConfig)();
    const { getId } = useElementId();
    const userData = (0,_Pimcore_modules_auth_hooks_use_user__WEBPACK_IMPORTED_MODULE_4__.useUser)();
    const { id: selectedGridConfigId, setId: setSelectedGridConfigId } = (0,_Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_selected_grid_config_id_use_selected_grid_config_id__WEBPACK_IMPORTED_MODULE_15__.useSelectedGridConfigId)();
    const { gridConfig, setGridConfig } = (0,_Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_grid_config_use_grid_config__WEBPACK_IMPORTED_MODULE_14__.useGridConfig)();
    const { isLoading, isFetching, data } = (0,_Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_5__.useAssetGetSavedGridConfigurationsQuery)();
    const { data: roleList } = (0,_Pimcore_modules_user_roles_roles_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_10__.useRoleGetCollectionQuery)();
    const { data: userList } = (0,_Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_11__.useUserGetCollectionQuery)();
    const { isFetching: gridConfigIsLoading } = (0,_Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_5__.useAssetGetGridConfigurationByFolderIdQuery)({
        folderId: getId(),
        configurationId: selectedGridConfigId
    });
    const [fetchSaveGridConfig, { isLoading: isSaveLoading, isError: isSaveGridConfigError, error: saveGridConfigError }] = (0,_Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_5__.useAssetSaveGridConfigurationMutation)();
    const [fetchUpdateGridConfig, { isLoading: isUpdating, isError: isUpdateGridConfigError, error: updateGridConfigError }] = (0,_Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_5__.useAssetUpdateGridConfigurationMutation)();
    const [fetchDeleteGridConfig, { isLoading: isDeleting, isError: isDeleteGridConfigError, error: deleteGridConfigError }] = (0,_Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_5__.useAssetDeleteGridConfigurationByConfigurationIdMutation)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (isSaveGridConfigError) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_17__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_17__.ApiError(saveGridConfigError));
        }
    }, [
        isSaveGridConfigError
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (isUpdateGridConfigError) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_17__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_17__.ApiError(updateGridConfigError));
        }
    }, [
        isUpdateGridConfigError
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (isDeleteGridConfigError) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_17__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_17__.ApiError(deleteGridConfigError));
        }
    }, [
        isDeleteGridConfigError
    ]);
    const [view, setView] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("edit");
    const [form] = (0,antd_es_form_Form__WEBPACK_IMPORTED_MODULE_18__["default"])();
    const isSavedConfiguration = (gridConfig === null || gridConfig === void 0 ? void 0 : gridConfig.name) !== 'Predefined' && gridConfig !== undefined;
    const savedGridConfigurations = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (data !== undefined) {
            var _data_items;
            return ((_data_items = data.items) === null || _data_items === void 0 ? void 0 : _data_items.map((item)=>{
                return {
                    key: item.id,
                    label: item.name,
                    onClick: ()=>{
                        setSelectedGridConfigId(item.id);
                    }
                };
            })) ?? [];
        }
        return [];
    }, [
        data
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setColumns(selectedColumns.map((column)=>{
            return {
                ...column.originalApiDefinition,
                locale: column === null || column === void 0 ? void 0 : column.locale
            };
        }));
    }, [
        selectedColumns
    ]);
    const onColumnClick = (column)=>{
        addColumn(column);
    };
    const availableColumnsDropdown = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>getAvailableColumnsDropdown(onColumnClick), [
        getAvailableColumnsDropdown,
        columns
    ]);
    const onDeleteClick = async ()=>{
        if (isSavedConfiguration) {
            await fetchDeleteGridConfig({
                configurationId: gridConfig.id
            }).then(()=>{
                setView("edit");
                setSelectedGridConfigId(undefined);
            });
        }
    };
    const onUpdatedConfigurationClick = async ()=>{
        if (gridConfig === undefined) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_17__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_17__.GeneralError('No grid configuration available'));
            return;
        }
        await fetchUpdateGridConfig({
            configurationId: gridConfig.id,
            body: {
                folderId: getId(),
                columns: prepareColumns(columns),
                name: gridConfig.name,
                description: gridConfig.description ?? '',
                setAsFavorite: gridConfig.setAsFavorite,
                shareGlobal: gridConfig.shareGlobal,
                sharedRoles: gridConfig.sharedRoles,
                sharedUsers: gridConfig.sharedUsers,
                saveFilter: false,
                pageSize: 0
            }
        });
    };
    function prepareColumns(columns) {
        return columns.map((column)=>({
                key: column.key,
                locale: column.locale ?? null,
                group: column.group
            }));
    }
    const onFormFinish = async (values)=>{
        const columnsToSave = prepareColumns(columns);
        const isShareGlobally = values.shareGlobally === true;
        // for global sharing the sharedUsers and sharedRoles need to be cleared
        // @todo Check if we really should modify the global grid config here...
        if (isShareGlobally && !(0,lodash__WEBPACK_IMPORTED_MODULE_2__.isEmpty)(gridConfig)) {
            setGridConfig({
                ...gridConfig,
                sharedUsers: [],
                sharedRoles: []
            });
        }
        if (view === "update" && isSavedConfiguration) {
            await fetchUpdateGridConfig({
                configurationId: gridConfig.id,
                body: {
                    folderId: getId(),
                    columns: columnsToSave,
                    name: values.name,
                    description: values.description,
                    setAsFavorite: values.setAsDefault,
                    shareGlobal: values.shareGlobally,
                    sharedRoles: gridConfig.sharedRoles,
                    sharedUsers: gridConfig.sharedUsers,
                    saveFilter: false,
                    pageSize: 0
                }
            }).then(()=>{
                setView("edit");
            });
        }
        if (view === "save") {
            await fetchSaveGridConfig({
                folderId: getId(),
                body: {
                    folderId: getId(),
                    columns: columnsToSave,
                    name: values.name,
                    description: values.description,
                    setAsFavorite: values.setAsDefault,
                    shareGlobal: values.shareGlobally,
                    sharedRoles: gridConfig === null || gridConfig === void 0 ? void 0 : gridConfig.sharedRoles,
                    sharedUsers: gridConfig === null || gridConfig === void 0 ? void 0 : gridConfig.sharedUsers,
                    saveFilter: false,
                    pageSize: 0
                }
            }).then((response)=>{
                if ((response === null || response === void 0 ? void 0 : response.data) !== undefined) {
                    setSelectedGridConfigId(response.data.id);
                    setView("edit");
                }
            });
        }
    };
    const onCancelClick = ()=>{
        setColumns(selectedColumns.map((column)=>column.originalApiDefinition));
    };
    const onApplyClick = ()=>{
        setSelectedColumns(columns.map((column)=>{
            return {
                key: column.key,
                locale: column.locale ?? undefined,
                type: column.type,
                config: column.config,
                sortable: column.sortable,
                editable: column.editable,
                localizable: column.localizable,
                exportable: column.exportable,
                frontendType: column.frontendType,
                group: column.group,
                originalApiDefinition: column
            };
        }));
    };
    if (gridConfigIsLoading || isDeleting) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_9__.Content, {
            loading: true
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/listing/decorator/column-configuration/view-layer/components/sidebar/tabs/grid-config/grid-config-inner.tsx",
            lineNumber: 239,
            columnNumber: 12
        }, undefined);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            view === "edit" && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_views_edit_view__WEBPACK_IMPORTED_MODULE_6__.EditView, {
                addColumnMenu: availableColumnsDropdown.menu.items,
                columns: columns,
                currentUserId: userData === null || userData === void 0 ? void 0 : userData.id,
                gridConfig: gridConfig,
                isLoading: isLoading || isFetching,
                isUpdating: isUpdating,
                onApplyClick: onApplyClick,
                onCancelClick: onCancelClick,
                onEditConfigurationClick: ()=>{
                    setView("update");
                },
                onSaveConfigurationClick: ()=>{
                    setView("save");
                },
                onUpdateConfigurationClick: onUpdatedConfigurationClick,
                savedGridConfigurations: savedGridConfigurations
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/listing/decorator/column-configuration/view-layer/components/sidebar/tabs/grid-config/grid-config-inner.tsx",
                lineNumber: 245,
                columnNumber: 9
            }, undefined),
            (view === "save" || view === "update") && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_views_save_view__WEBPACK_IMPORTED_MODULE_7__.SaveView, {
                formProps: {
                    form,
                    onFinish: onFormFinish,
                    initialValues: view === "update" && isSavedConfiguration ? {
                        name: gridConfig === null || gridConfig === void 0 ? void 0 : gridConfig.name,
                        description: gridConfig === null || gridConfig === void 0 ? void 0 : gridConfig.description,
                        setAsDefault: gridConfig === null || gridConfig === void 0 ? void 0 : gridConfig.setAsFavorite,
                        shareGlobally: gridConfig === null || gridConfig === void 0 ? void 0 : gridConfig.shareGlobal
                    } : {
                        ..._forms_save_form__WEBPACK_IMPORTED_MODULE_8__.defaultValues
                    }
                },
                isDeleting: isDeleting,
                isLoading: isSaveLoading || isUpdating,
                modificationDate: gridConfig === null || gridConfig === void 0 ? void 0 : gridConfig.modificationDate,
                onCancelClick: ()=>{
                    setView("edit");
                },
                onDeleteClick: isSavedConfiguration ? onDeleteClick : undefined,
                roleList: roleList,
                saveAsNewConfiguration: view === "save",
                userList: userList,
                userName: userData === null || userData === void 0 ? void 0 : userData.username
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/listing/decorator/column-configuration/view-layer/components/sidebar/tabs/grid-config/grid-config-inner.tsx",
                lineNumber: 264,
                columnNumber: 9
            }, undefined)
        ]
    }, void 0, true);
};
_s(GridConfigInner, "nwGy4H+ZFfdrolup90kbHp8qDB4=", true, function() {
    return [
        _Pimcore_modules_element_listing_abstract_settings_use_settings__WEBPACK_IMPORTED_MODULE_16__.useSettings,
        _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_available_columns_use_available_columns__WEBPACK_IMPORTED_MODULE_12__.useAvailableColumns,
        _Pimcore_modules_element_listing_abstract_configuration_layer_provider_selected_columns_use_selected_columns__WEBPACK_IMPORTED_MODULE_13__.useSelectedColumns,
        _hooks_use_grid_config__WEBPACK_IMPORTED_MODULE_3__.useGridConfig,
        _Pimcore_modules_auth_hooks_use_user__WEBPACK_IMPORTED_MODULE_4__.useUser,
        _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_selected_grid_config_id_use_selected_grid_config_id__WEBPACK_IMPORTED_MODULE_15__.useSelectedGridConfigId,
        _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_grid_config_use_grid_config__WEBPACK_IMPORTED_MODULE_14__.useGridConfig,
        _Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_5__.useAssetGetSavedGridConfigurationsQuery,
        _Pimcore_modules_user_roles_roles_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_10__.useRoleGetCollectionQuery,
        _Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_11__.useUserGetCollectionQuery,
        _Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_5__.useAssetGetGridConfigurationByFolderIdQuery,
        _Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_5__.useAssetSaveGridConfigurationMutation,
        _Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_5__.useAssetUpdateGridConfigurationMutation,
        _Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_5__.useAssetDeleteGridConfigurationByConfigurationIdMutation,
        antd_es_form_Form__WEBPACK_IMPORTED_MODULE_18__["default"]
    ];
});
_c = GridConfigInner;
var _c;
$RefreshReg$(_c, "GridConfigInner");

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
"./js/src/core/modules/asset/tree/node/with-draggable.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  withDraggable: () => (withDraggable)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_drag_and_drop_draggable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/drag-and-drop/draggable.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 


const withDraggable = (Component)=>{
    const DraggableNodeContent = (props, ref)=>{
        var _props_metaData, _props_metaData1;
        const metaData = (_props_metaData = props.metaData) === null || _props_metaData === void 0 ? void 0 : _props_metaData.asset;
        if (((_props_metaData1 = props.metaData) === null || _props_metaData1 === void 0 ? void 0 : _props_metaData1.asset) === undefined) {
            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {
                ...props,
                ref: ref
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/tree/node/with-draggable.tsx",
                lineNumber: 22,
                columnNumber: 9
            }, undefined);
        }
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_drag_and_drop_draggable__WEBPACK_IMPORTED_MODULE_2__.Draggable, {
            info: {
                icon: metaData.icon.value,
                title: metaData.filename,
                type: 'asset',
                data: {
                    ...metaData
                }
            },
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {
                ...props,
                ref: ref
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/tree/node/with-draggable.tsx",
                lineNumber: 33,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/tree/node/with-draggable.tsx",
            lineNumber: 30,
            columnNumber: 7
        }, undefined);
    };
    return /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(DraggableNodeContent);
};

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
"./js/src/core/modules/asset/tree/utils/transform-api-data-to-node.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  transformApiDataToNodes: () => (transformApiDataToNodes)
});
/* ESM import */var _Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/element/element-helper.ts");
/* ESM import */var _Pimcore_types_enums_element_element_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/types/enums/element/element-type.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 

const transformApiDataToNodes = (node, data, maxItemsPerNode)=>{
    const nodes = [];
    const assetData = data.items;
    assetData.forEach((assetNode)=>{
        nodes.push({
            id: assetNode.id.toString(),
            elementType: _Pimcore_types_enums_element_element_type__WEBPACK_IMPORTED_MODULE_1__.elementTypes.asset,
            icon: (0,_Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_0__.getElementIcon)(assetNode, {
                type: 'name',
                value: 'unknown'
            }),
            label: assetNode.filename,
            type: assetNode.type,
            parentId: assetNode.parentId.toString(),
            hasChildren: assetNode.hasChildren,
            locked: assetNode.locked,
            isLocked: assetNode.isLocked,
            metaData: {
                asset: assetNode
            },
            permissions: assetNode.permissions ?? [],
            internalKey: `${node.internalKey}-${assetNode.id}`
        });
    });
    const total = data.totalItems ?? maxItemsPerNode;
    return {
        nodes,
        total
    };
};

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
"./js/src/core/modules/auth/authorization-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useLoginMutation: () => (useLoginMutation),
  useLogoutMutation: () => (useLogoutMutation)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Authorization"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            login: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/login`,
                        method: "POST",
                        body: queryArg.credentials
                    }),
                invalidatesTags: [
                    "Authorization"
                ]
            }),
            logout: build.mutation({
                query: ()=>({
                        url: `/pimcore-studio/api/logout`,
                        method: "POST"
                    }),
                invalidatesTags: [
                    "Authorization"
                ]
            })
        }),
    overrideExisting: false
});

const { useLoginMutation, useLogoutMutation } = injectedRtkApi;

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
"./js/src/core/modules/auth/user/user-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  usePimcoreStudioApiUserSearchQuery: () => (usePimcoreStudioApiUserSearchQuery),
  useUserCloneByIdMutation: () => (useUserCloneByIdMutation),
  useUserCreateMutation: () => (useUserCreateMutation),
  useUserDefaultKeyBindingsQuery: () => (useUserDefaultKeyBindingsQuery),
  useUserDeleteByIdMutation: () => (useUserDeleteByIdMutation),
  useUserFolderCreateMutation: () => (useUserFolderCreateMutation),
  useUserFolderDeleteByIdMutation: () => (useUserFolderDeleteByIdMutation),
  useUserGetAvailablePermissionsQuery: () => (useUserGetAvailablePermissionsQuery),
  useUserGetByIdQuery: () => (useUserGetByIdQuery),
  useUserGetCollectionQuery: () => (useUserGetCollectionQuery),
  useUserGetCurrentInformationQuery: () => (useUserGetCurrentInformationQuery),
  useUserGetImageQuery: () => (useUserGetImageQuery),
  useUserGetTreeQuery: () => (useUserGetTreeQuery),
  useUserResetPasswordMutation: () => (useUserResetPasswordMutation),
  useUserUpdateActivePerspectiveMutation: () => (useUserUpdateActivePerspectiveMutation),
  useUserUpdateByIdMutation: () => (useUserUpdateByIdMutation),
  useUserUpdatePasswordByIdMutation: () => (useUserUpdatePasswordByIdMutation),
  useUserUpdateProfileMutation: () => (useUserUpdateProfileMutation),
  useUserUploadImageMutation: () => (useUserUploadImageMutation)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "User Management"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            userCloneById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/clone/${queryArg.id}`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userCreate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userFolderCreate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/folder`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userGetCurrentInformation: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/user/current-user-information`
                    }),
                providesTags: [
                    "User Management"
                ]
            }),
            userGetById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/${queryArg.id}`
                    }),
                providesTags: [
                    "User Management"
                ]
            }),
            userUpdateById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/${queryArg.id}`,
                        method: "PUT",
                        body: queryArg.updateUser
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userDeleteById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/${queryArg.id}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userFolderDeleteById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/folder/${queryArg.id}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userDefaultKeyBindings: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/users/default-key-bindings`
                    }),
                providesTags: [
                    "User Management"
                ]
            }),
            userGetAvailablePermissions: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/user/available-permissions`
                    }),
                providesTags: [
                    "User Management"
                ]
            }),
            userGetCollection: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/users`
                    }),
                providesTags: [
                    "User Management"
                ]
            }),
            userResetPassword: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/reset-password`,
                        method: "POST",
                        body: queryArg.resetPassword
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            pimcoreStudioApiUserSearch: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/search`,
                        params: {
                            searchQuery: queryArg.searchQuery
                        }
                    }),
                providesTags: [
                    "User Management"
                ]
            }),
            userUpdateActivePerspective: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/active-perspective/${queryArg.perspectiveId}`,
                        method: "PUT"
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userUpdatePasswordById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/${queryArg.id}/password`,
                        method: "PUT",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userUpdateProfile: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/update-profile`,
                        method: "PUT",
                        body: queryArg.updateUserProfile
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userUploadImage: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/upload-image/${queryArg.id}`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userGetImage: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/image/${queryArg.id}`
                    }),
                providesTags: [
                    "User Management"
                ]
            }),
            userGetTree: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/users/tree`,
                        params: {
                            parentId: queryArg.parentId
                        }
                    }),
                providesTags: [
                    "User Management"
                ]
            })
        }),
    overrideExisting: false
});

const { useUserCloneByIdMutation, useUserCreateMutation, useUserFolderCreateMutation, useUserGetCurrentInformationQuery, useUserGetByIdQuery, useUserUpdateByIdMutation, useUserDeleteByIdMutation, useUserFolderDeleteByIdMutation, useUserDefaultKeyBindingsQuery, useUserGetAvailablePermissionsQuery, useUserGetCollectionQuery, useUserResetPasswordMutation, usePimcoreStudioApiUserSearchQuery, useUserUpdateActivePerspectiveMutation, useUserUpdatePasswordByIdMutation, useUserUpdateProfileMutation, useUserUploadImageMutation, useUserGetImageQuery, useUserGetTreeQuery } = injectedRtkApi;

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
"./js/src/core/modules/auth/user/user-slice.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  selectCurrentUser: () => (selectCurrentUser),
  setUser: () => (setUser),
  userSliceName: () => (userSliceName)
});
/* ESM import */var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs");
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 

// The logic dependency is in the rtkQueryErrorLogger middleware
const initialState = {
    id: 0,
    username: '',
    email: '',
    firstname: '',
    lastname: '',
    permissions: [],
    isAdmin: false,
    classes: [],
    docTypes: [],
    language: 'en',
    activePerspective: '0',
    perspectives: [],
    dateTimeLocale: '',
    welcomeScreen: false,
    memorizeTabs: false,
    hasImage: false,
    contentLanguages: [],
    keyBindings: []
};
const slice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__.createSlice)({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, param)=>{
            let { payload } = param;
            return {
                ...state,
                ...payload
            };
        }
    }
});
const userSliceName = slice.name;
(0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.injectSliceWithState)(slice);
const { setUser } = slice.actions;
const selectCurrentUser = (state)=>state.auth;

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
"./js/src/core/modules/class-definition/class-definition-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useClassCustomLayoutCollectionQuery: () => (useClassCustomLayoutCollectionQuery),
  useClassCustomLayoutEditorCollectionQuery: () => (useClassCustomLayoutEditorCollectionQuery),
  useClassDefinitionCollectionQuery: () => (useClassDefinitionCollectionQuery),
  useClassDefinitionFolderCollectionQuery: () => (useClassDefinitionFolderCollectionQuery),
  useClassDefinitionGetQuery: () => (useClassDefinitionGetQuery),
  useClassFieldCollectionObjectLayoutQuery: () => (useClassFieldCollectionObjectLayoutQuery),
  useClassObjectBrickObjectLayoutQuery: () => (useClassObjectBrickObjectLayoutQuery),
  usePimcoreStudioApiClassCustomLayoutCreateMutation: () => (usePimcoreStudioApiClassCustomLayoutCreateMutation),
  usePimcoreStudioApiClassCustomLayoutDeleteMutation: () => (usePimcoreStudioApiClassCustomLayoutDeleteMutation),
  usePimcoreStudioApiClassCustomLayoutExportQuery: () => (usePimcoreStudioApiClassCustomLayoutExportQuery),
  usePimcoreStudioApiClassCustomLayoutGetQuery: () => (usePimcoreStudioApiClassCustomLayoutGetQuery),
  usePimcoreStudioApiClassCustomLayoutImportMutation: () => (usePimcoreStudioApiClassCustomLayoutImportMutation),
  usePimcoreStudioApiClassCustomLayoutUpdateMutation: () => (usePimcoreStudioApiClassCustomLayoutUpdateMutation)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Class Definition"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            classDefinitionCollection: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/class/collection`
                    }),
                providesTags: [
                    "Class Definition"
                ]
            }),
            classCustomLayoutCollection: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/custom-layout/collection/${queryArg.dataObjectClass}`
                    }),
                providesTags: [
                    "Class Definition"
                ]
            }),
            pimcoreStudioApiClassCustomLayoutCreate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/${queryArg.customLayoutId}`,
                        method: "POST",
                        body: queryArg.customLayoutNew
                    }),
                invalidatesTags: [
                    "Class Definition"
                ]
            }),
            pimcoreStudioApiClassCustomLayoutGet: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/custom-layout/${queryArg.customLayoutId}`
                    }),
                providesTags: [
                    "Class Definition"
                ]
            }),
            pimcoreStudioApiClassCustomLayoutUpdate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/custom-layout/${queryArg.customLayoutId}`,
                        method: "PUT",
                        body: queryArg.customLayoutUpdate
                    }),
                invalidatesTags: [
                    "Class Definition"
                ]
            }),
            pimcoreStudioApiClassCustomLayoutDelete: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/custom-layout/${queryArg.customLayoutId}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Class Definition"
                ]
            }),
            classCustomLayoutEditorCollection: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/custom-layout/editor/collection/${queryArg.objectId}`
                    }),
                providesTags: [
                    "Class Definition"
                ]
            }),
            pimcoreStudioApiClassCustomLayoutExport: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/custom-layout/export/${queryArg.customLayoutId}`
                    }),
                providesTags: [
                    "Class Definition"
                ]
            }),
            pimcoreStudioApiClassCustomLayoutImport: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/custom-layout/import/${queryArg.customLayoutId}`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Class Definition"
                ]
            }),
            classFieldCollectionObjectLayout: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/field-collection/${queryArg.objectId}/object/layout`
                    }),
                providesTags: [
                    "Class Definition"
                ]
            }),
            classDefinitionFolderCollection: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/folder/${queryArg.folderId}`
                    }),
                providesTags: [
                    "Class Definition"
                ]
            }),
            classDefinitionGet: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/definition/${queryArg.dataObjectClass}`
                    }),
                providesTags: [
                    "Class Definition"
                ]
            }),
            classObjectBrickObjectLayout: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/object-brick/${queryArg.objectId}/object/layout`
                    }),
                providesTags: [
                    "Class Definition"
                ]
            })
        }),
    overrideExisting: false
});

const { useClassDefinitionCollectionQuery, useClassCustomLayoutCollectionQuery, usePimcoreStudioApiClassCustomLayoutCreateMutation, usePimcoreStudioApiClassCustomLayoutGetQuery, usePimcoreStudioApiClassCustomLayoutUpdateMutation, usePimcoreStudioApiClassCustomLayoutDeleteMutation, useClassCustomLayoutEditorCollectionQuery, usePimcoreStudioApiClassCustomLayoutExportQuery, usePimcoreStudioApiClassCustomLayoutImportMutation, useClassFieldCollectionObjectLayoutQuery, useClassDefinitionFolderCollectionQuery, useClassDefinitionGetQuery, useClassObjectBrickObjectLayoutQuery } = injectedRtkApi;

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
"./js/src/core/modules/data-object/actions/add-object/use-add-object.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useAddObject: () => (useAddObject)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _Pimcore_components_element_tree_element_tree_slice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/element-tree/element-tree-slice.ts");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/modal/form-modal/hooks/use-form-modal.tsx");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* ESM import */var _Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/element/permissions/permission-helper.ts");
/* ESM import */var _Pimcore_modules_element_tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/element/tree/provider/tree-permission-provider/use-tree-permission.ts");
/* ESM import */var _Pimcore_modules_perspectives_enums_tree_permission__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/perspectives/enums/tree-permission.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_9__);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_10__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _data_object_api_slice_gen__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/data-object/data-object-api-slice.gen.ts");
/* ESM import */var _hooks_use_data_object_helper__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/modules/data-object/hooks/use-data-object-helper.ts");
/* ESM import */var _utils_provider_class_defintions_use_class_definitions__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/modules/data-object/utils/provider/class-defintions/use-class-definitions.tsx");
/* ESM import */var _Pimcore_modules_element_actions__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./js/src/core/modules/element/actions/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 
var _s = $RefreshSig$();















const useAddObject = ()=>{
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_11__.useTranslation)();
    const modal = (0,_Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_4__.useFormModal)();
    const [addDataObjectMutation] = (0,_data_object_api_slice_gen__WEBPACK_IMPORTED_MODULE_12__.useDataObjectAddMutation)();
    const dispatch = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_1__.useAppDispatch)();
    const { openDataObject } = (0,_hooks_use_data_object_helper__WEBPACK_IMPORTED_MODULE_13__.useDataObjectHelper)();
    const { isTreeActionAllowed } = (0,_Pimcore_modules_element_tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_7__.useTreePermission)();
    const { getClassDefinitionsForCurrentUser } = (0,_utils_provider_class_defintions_use_class_definitions__WEBPACK_IMPORTED_MODULE_14__.useClassDefinitions)();
    const getClassEntries = (node)=>{
        let classHierarchy = [];
        const classDefinitions = getClassDefinitionsForCurrentUser();
        const structuredClassDefinitions = [
            ...classDefinitions
        ].sort((a, b)=>a.name.localeCompare(b.name)).reduce((acc, classDefinition)=>{
            const groupName = (0,lodash__WEBPACK_IMPORTED_MODULE_9__.isNil)(classDefinition.group) || (0,lodash__WEBPACK_IMPORTED_MODULE_9__.isEmpty)(classDefinition.group) ? 'undefined' : classDefinition.group;
            if (acc[groupName] === undefined) {
                acc[groupName] = [];
            }
            acc[groupName].push(classDefinition);
            return acc;
        }, {});
        if (structuredClassDefinitions.undefined !== undefined) {
            classHierarchy = structuredClassDefinitions.undefined.map((classDefinition)=>getDataObjectEntry(classDefinition, node));
        }
        for (const [group, classDefinitions] of Object.entries(structuredClassDefinitions)){
            if (group !== 'undefined') {
                classHierarchy.push({
                    label: t(group),
                    key: 'add-object-group-' + group,
                    icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__.Icon, {
                        value: 'folder'
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/actions/add-object/use-add-object.tsx",
                        lineNumber: 74,
                        columnNumber: 17
                    }, undefined),
                    children: classDefinitions.map((classDefinition)=>getDataObjectEntry(classDefinition, node))
                });
            }
        }
        return classHierarchy;
    };
    const getDataObjectEntry = (classDefinition, node)=>{
        return {
            label: t(classDefinition.name),
            key: classDefinition.id,
            icon: classDefinition.icon.value === 'class' ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__.Icon, {
                subIconName: "new",
                subIconVariant: 'green',
                value: "data-object"
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/actions/add-object/use-add-object.tsx",
                lineNumber: 89,
                columnNumber: 11
            }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__.Icon, {
                subIconName: "new",
                subIconVariant: 'green',
                ...classDefinition.icon
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/actions/add-object/use-add-object.tsx",
                lineNumber: 96,
                columnNumber: 11
            }, undefined),
            onClick: ()=>{
                const parentId = parseInt(node.id);
                createDataObject(classDefinition, parentId);
            }
        };
    };
    const createDataObject = (classDefinition, parentId, onFinish)=>{
        modal.input({
            title: t('data-object.create-data-object', {
                className: classDefinition.name
            }),
            label: t('form.label.new-item'),
            rule: {
                required: true,
                message: t('form.validation.required')
            },
            onOk: async (value)=>{
                await createDataObjectMutation(classDefinition.id, value, parentId);
                onFinish === null || onFinish === void 0 ? void 0 : onFinish(value);
            }
        });
    };
    const createDataObjectMutation = async (classId, name, parentId)=>{
        const createDataObjectTask = addDataObjectMutation({
            parentId,
            dataObjectAddParameters: {
                key: name,
                classId,
                type: 'object'
            }
        });
        try {
            const response = await createDataObjectTask;
            if (response.error !== undefined) {
                (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_5__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_5__.ApiError(response.error));
                return;
            }
            const { id } = response.data;
            void openDataObject({
                config: {
                    id
                }
            });
            dispatch((0,_Pimcore_components_element_tree_element_tree_slice__WEBPACK_IMPORTED_MODULE_2__.refreshNodeChildren)({
                nodeId: String(parentId),
                elementType: 'data-object'
            }));
        } catch (error) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_5__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_5__.GeneralError('Error creating data object'));
        }
    };
    const isAddObjectHidden = (node)=>{
        return !isTreeActionAllowed(_Pimcore_modules_perspectives_enums_tree_permission__WEBPACK_IMPORTED_MODULE_8__.TreePermission.Add) || !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_6__.checkElementPermission)(node.permissions, 'create') || (0,lodash__WEBPACK_IMPORTED_MODULE_9__.isEmpty)(getClassDefinitionsForCurrentUser());
    };
    const addObjectTreeContextMenuItem = (node)=>{
        return {
            label: t('data-object.tree.context-menu.add-object'),
            key: _Pimcore_modules_element_actions__WEBPACK_IMPORTED_MODULE_15__.ContextMenuActionName.addObject,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__.Icon, {
                value: 'folder'
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/actions/add-object/use-add-object.tsx",
                lineNumber: 168,
                columnNumber: 13
            }, undefined),
            hidden: isAddObjectHidden(node),
            children: getClassEntries(node)
        };
    };
    return {
        addObjectTreeContextMenuItem
    };
};
_s(useAddObject, "XBKjbXtzxpwzlZN8G+HvPOaTqVs=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_11__.useTranslation,
        _Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_4__.useFormModal,
        _data_object_api_slice_gen__WEBPACK_IMPORTED_MODULE_12__.useDataObjectAddMutation,
        _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_1__.useAppDispatch,
        _hooks_use_data_object_helper__WEBPACK_IMPORTED_MODULE_13__.useDataObjectHelper,
        _Pimcore_modules_element_tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_7__.useTreePermission,
        _utils_provider_class_defintions_use_class_definitions__WEBPACK_IMPORTED_MODULE_14__.useClassDefinitions
    ];
});

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
"./js/src/core/modules/data-object/classification-store/classification-store-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useClassificationStoreGetCollectionsQuery: () => (useClassificationStoreGetCollectionsQuery),
  useClassificationStoreGetGroupsQuery: () => (useClassificationStoreGetGroupsQuery),
  useClassificationStoreGetKeyGroupRelationsQuery: () => (useClassificationStoreGetKeyGroupRelationsQuery),
  useClassificationStoreGetLayoutByCollectionQuery: () => (useClassificationStoreGetLayoutByCollectionQuery),
  useClassificationStoreGetLayoutByGroupQuery: () => (useClassificationStoreGetLayoutByGroupQuery)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Classification Store"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            classificationStoreGetCollections: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/classification-store/collections`,
                        params: {
                            storeId: queryArg.storeId,
                            objectId: queryArg.objectId,
                            page: queryArg.page,
                            pageSize: queryArg.pageSize,
                            fieldName: queryArg.fieldName,
                            searchTerm: queryArg.searchTerm
                        }
                    }),
                providesTags: [
                    "Classification Store"
                ]
            }),
            classificationStoreGetGroups: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/classification-store/groups`,
                        params: {
                            storeId: queryArg.storeId,
                            objectId: queryArg.objectId,
                            searchTerm: queryArg.searchTerm,
                            page: queryArg.page,
                            pageSize: queryArg.pageSize,
                            fieldName: queryArg.fieldName
                        }
                    }),
                providesTags: [
                    "Classification Store"
                ]
            }),
            classificationStoreGetKeyGroupRelations: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/classification-store/key-group-relations`,
                        params: {
                            storeId: queryArg.storeId,
                            objectId: queryArg.objectId,
                            searchTerm: queryArg.searchTerm,
                            page: queryArg.page,
                            pageSize: queryArg.pageSize,
                            fieldName: queryArg.fieldName
                        }
                    }),
                providesTags: [
                    "Classification Store"
                ]
            }),
            classificationStoreGetLayoutByCollection: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/classification-store/layout-by-collection/${queryArg.collectionId}`,
                        params: {
                            objectId: queryArg.objectId,
                            fieldName: queryArg.fieldName
                        }
                    }),
                providesTags: [
                    "Classification Store"
                ]
            }),
            classificationStoreGetLayoutByGroup: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/classification-store/layout-by-group/${queryArg.groupId}`,
                        params: {
                            objectId: queryArg.objectId,
                            fieldName: queryArg.fieldName
                        }
                    }),
                providesTags: [
                    "Classification Store"
                ]
            })
        }),
    overrideExisting: false
});

const { useClassificationStoreGetCollectionsQuery, useClassificationStoreGetGroupsQuery, useClassificationStoreGetKeyGroupRelationsQuery, useClassificationStoreGetLayoutByCollectionQuery, useClassificationStoreGetLayoutByGroupQuery } = injectedRtkApi;

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
"./js/src/core/modules/data-object/data-object-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useDataObjectAddMutation: () => (useDataObjectAddMutation),
  useDataObjectCloneMutation: () => (useDataObjectCloneMutation),
  useDataObjectDeleteGridConfigurationByConfigurationIdMutation: () => (useDataObjectDeleteGridConfigurationByConfigurationIdMutation),
  useDataObjectFormatPathMutation: () => (useDataObjectFormatPathMutation),
  useDataObjectGetAvailableGridColumnsQuery: () => (useDataObjectGetAvailableGridColumnsQuery),
  useDataObjectGetByIdQuery: () => (useDataObjectGetByIdQuery),
  useDataObjectGetGridConfigurationQuery: () => (useDataObjectGetGridConfigurationQuery),
  useDataObjectGetGridQuery: () => (useDataObjectGetGridQuery),
  useDataObjectGetLayoutByIdQuery: () => (useDataObjectGetLayoutByIdQuery),
  useDataObjectGetSelectOptionsMutation: () => (useDataObjectGetSelectOptionsMutation),
  useDataObjectGetTreeQuery: () => (useDataObjectGetTreeQuery),
  useDataObjectListSavedGridConfigurationsQuery: () => (useDataObjectListSavedGridConfigurationsQuery),
  useDataObjectPatchByIdMutation: () => (useDataObjectPatchByIdMutation),
  useDataObjectPatchFolderByIdMutation: () => (useDataObjectPatchFolderByIdMutation),
  useDataObjectPreviewByIdQuery: () => (useDataObjectPreviewByIdQuery),
  useDataObjectReplaceContentMutation: () => (useDataObjectReplaceContentMutation),
  useDataObjectSaveGridConfigurationMutation: () => (useDataObjectSaveGridConfigurationMutation),
  useDataObjectSetGridConfigurationAsFavoriteMutation: () => (useDataObjectSetGridConfigurationAsFavoriteMutation),
  useDataObjectUpdateByIdMutation: () => (useDataObjectUpdateByIdMutation),
  useDataObjectUpdateGridConfigurationMutation: () => (useDataObjectUpdateGridConfigurationMutation)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Data Objects",
    "Data Object Grid"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            dataObjectAdd: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-objects/add/${queryArg.parentId}`,
                        method: "POST",
                        body: queryArg.dataObjectAddParameters
                    }),
                invalidatesTags: [
                    "Data Objects"
                ]
            }),
            dataObjectClone: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-objects/${queryArg.id}/clone/${queryArg.parentId}`,
                        method: "POST",
                        body: queryArg.cloneParameters
                    }),
                invalidatesTags: [
                    "Data Objects"
                ]
            }),
            dataObjectGetById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-objects/${queryArg.id}`
                    }),
                providesTags: [
                    "Data Objects"
                ]
            }),
            dataObjectUpdateById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-objects/${queryArg.id}`,
                        method: "PUT",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Data Objects"
                ]
            }),
            dataObjectDeleteGridConfigurationByConfigurationId: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-object/grid/configuration/${queryArg.configurationId}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Data Object Grid"
                ]
            }),
            dataObjectGetGridConfiguration: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-object/grid/configuration/${queryArg.folderId}/${queryArg.classId}`,
                        params: {
                            configurationId: queryArg.configurationId
                        }
                    }),
                providesTags: [
                    "Data Object Grid"
                ]
            }),
            dataObjectListSavedGridConfigurations: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-object/grid/configurations/${queryArg.classId}`
                    }),
                providesTags: [
                    "Data Object Grid"
                ]
            }),
            dataObjectSaveGridConfiguration: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-object/grid/configuration/save/${queryArg.classId}`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Data Object Grid"
                ]
            }),
            dataObjectSetGridConfigurationAsFavorite: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-object/grid/configuration/set-as-favorite/${queryArg.configurationId}/${queryArg.folderId}`,
                        method: "POST"
                    }),
                invalidatesTags: [
                    "Data Object Grid"
                ]
            }),
            dataObjectUpdateGridConfiguration: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-object/grid/configuration/update/${queryArg.configurationId}`,
                        method: "PUT",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Data Object Grid"
                ]
            }),
            dataObjectGetAvailableGridColumns: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-object/grid/available-columns`,
                        params: {
                            classId: queryArg.classId,
                            folderId: queryArg.folderId
                        }
                    }),
                providesTags: [
                    "Data Object Grid"
                ]
            }),
            dataObjectGetGrid: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-objects/grid/${queryArg.classId}`,
                        method: "POST",
                        body: queryArg.body
                    }),
                providesTags: [
                    "Data Object Grid"
                ]
            }),
            dataObjectGetLayoutById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-objects/${queryArg.id}/layout/${queryArg.layoutId}`
                    }),
                providesTags: [
                    "Data Objects"
                ]
            }),
            dataObjectPatchById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-objects`,
                        method: "PATCH",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Data Objects"
                ]
            }),
            dataObjectPatchFolderById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-objects/folder`,
                        method: "PATCH",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Data Objects"
                ]
            }),
            dataObjectFormatPath: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-objects/format-path`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Data Objects"
                ]
            }),
            dataObjectPreviewById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-objects/preview/${queryArg.id}`,
                        params: {
                            site: queryArg.site
                        }
                    }),
                providesTags: [
                    "Data Objects"
                ]
            }),
            dataObjectReplaceContent: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-objects/${queryArg.sourceId}/replace/${queryArg.targetId}`,
                        method: "POST"
                    }),
                invalidatesTags: [
                    "Data Objects"
                ]
            }),
            dataObjectGetSelectOptions: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-objects/select-options`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Data Objects"
                ]
            }),
            dataObjectGetTree: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-objects/tree`,
                        params: {
                            page: queryArg.page,
                            pageSize: queryArg.pageSize,
                            parentId: queryArg.parentId,
                            idSearchTerm: queryArg.idSearchTerm,
                            pqlQuery: queryArg.pqlQuery,
                            excludeFolders: queryArg.excludeFolders,
                            path: queryArg.path,
                            pathIncludeParent: queryArg.pathIncludeParent,
                            pathIncludeDescendants: queryArg.pathIncludeDescendants,
                            className: queryArg.className,
                            classIds: queryArg.classIds
                        }
                    }),
                providesTags: [
                    "Data Objects"
                ]
            })
        }),
    overrideExisting: false
});

const { useDataObjectAddMutation, useDataObjectCloneMutation, useDataObjectGetByIdQuery, useDataObjectUpdateByIdMutation, useDataObjectDeleteGridConfigurationByConfigurationIdMutation, useDataObjectGetGridConfigurationQuery, useDataObjectListSavedGridConfigurationsQuery, useDataObjectSaveGridConfigurationMutation, useDataObjectSetGridConfigurationAsFavoriteMutation, useDataObjectUpdateGridConfigurationMutation, useDataObjectGetAvailableGridColumnsQuery, useDataObjectGetGridQuery, useDataObjectGetLayoutByIdQuery, useDataObjectPatchByIdMutation, useDataObjectPatchFolderByIdMutation, useDataObjectFormatPathMutation, useDataObjectPreviewByIdQuery, useDataObjectReplaceContentMutation, useDataObjectGetSelectOptionsMutation, useDataObjectGetTreeQuery } = injectedRtkApi;

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
"./js/src/core/modules/data-object/editor/shared-tab-manager/tabs/versions/details-functions.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  getBreadcrumbTitle: () => (getBreadcrumbTitle),
  getFormattedDataStructure: () => (getFormattedDataStructure),
  versionsDataToTableData: () => (versionsDataToTableData)
});
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _Pimcore_utils_date_time__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/utils/date-time.ts");
/* ESM import */var _Pimcore_utils_type_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/utils/type-utils.ts");
/* ESM import */var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/data-object/editor/shared-tab-manager/tabs/versions/types.ts");
/* ESM import */var _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_constants_typesList__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/constants/typesList.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 




const isFieldValueEmpty = (fieldValue)=>{
    if ((0,lodash__WEBPACK_IMPORTED_MODULE_0__.isObject)(fieldValue)) {
        return (0,lodash__WEBPACK_IMPORTED_MODULE_0__.every)(fieldValue, _Pimcore_utils_type_utils__WEBPACK_IMPORTED_MODULE_2__.isEmptyValue);
    }
    return (0,_Pimcore_utils_type_utils__WEBPACK_IMPORTED_MODULE_2__.isEmptyValue)(fieldValue);
};
const getBreadcrumbTitle = (value1, value2)=>{
    return [
        value1,
        value2
    ].filter(Boolean).join('/');
};
const fieldTypesRequiringChildren = [
    _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_constants_typesList__WEBPACK_IMPORTED_MODULE_4__.DynamicTypesList.BLOCK
];
const getFormattedDataStructure = async (param)=>{
    let { objectId, layout, versionData, versionId, versionCount, objectDataRegistry, layoutsList, setLayoutsList } = param;
    const formattedSystemData = {
        fullPath: versionData.fullPath,
        creationDate: (0,_Pimcore_utils_date_time__WEBPACK_IMPORTED_MODULE_1__.formatDateTime)({
            timestamp: versionData.creationDate ?? null,
            dateStyle: 'short',
            timeStyle: 'medium'
        }),
        modificationDate: (0,_Pimcore_utils_date_time__WEBPACK_IMPORTED_MODULE_1__.formatDateTime)({
            timestamp: versionData.modificationDate ?? null,
            dateStyle: 'short',
            timeStyle: 'medium'
        })
    };
    const processLayoutData = async (param)=>{
        let { data, objectValuesData = versionData === null || versionData === void 0 ? void 0 : versionData.objectData, fieldBreadcrumbTitle = '' } = param;
        const promises = data.map(async (item)=>{
            if (item.datatype === _types__WEBPACK_IMPORTED_MODULE_3__.DATATYPE_LIST.LAYOUT) {
                const breadcrumbTitle = getBreadcrumbTitle(fieldBreadcrumbTitle, item.title);
                return await processLayoutData({
                    data: item.children,
                    fieldBreadcrumbTitle: breadcrumbTitle,
                    objectValuesData
                });
            }
            if (item.datatype === _types__WEBPACK_IMPORTED_MODULE_3__.DATATYPE_LIST.DATA) {
                const fieldName = item.name;
                const fieldValueByName = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.get)(objectValuesData, fieldName);
                const currentFieldType = item.fieldtype;
                if (!objectDataRegistry.hasDynamicType(currentFieldType)) {
                    return [];
                }
                const objectDataType = objectDataRegistry.getDynamicType(currentFieldType);
                const processedDataList = await objectDataType.processVersionFieldData({
                    objectId,
                    item,
                    fieldBreadcrumbTitle,
                    fieldValueByName,
                    versionId,
                    versionCount,
                    layoutsList,
                    setLayoutsList
                });
                const processedPromises = processedDataList === null || processedDataList === void 0 ? void 0 : processedDataList.map(async (processedDataItem)=>{
                    var _processedDataItem_fieldData, _processedDataItem_fieldData1;
                    objectValuesData = {};
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    if (!(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(processedDataItem === null || processedDataItem === void 0 ? void 0 : (_processedDataItem_fieldData = processedDataItem.fieldData) === null || _processedDataItem_fieldData === void 0 ? void 0 : _processedDataItem_fieldData.children) && !fieldTypesRequiringChildren.includes(processedDataItem === null || processedDataItem === void 0 ? void 0 : (_processedDataItem_fieldData1 = processedDataItem.fieldData) === null || _processedDataItem_fieldData1 === void 0 ? void 0 : _processedDataItem_fieldData1.fieldtype)) {
                        var _processedDataItem_fieldData2, _processedDataItem_fieldData3;
                        const breadcrumbTitle = getBreadcrumbTitle(fieldBreadcrumbTitle, (processedDataItem === null || processedDataItem === void 0 ? void 0 : (_processedDataItem_fieldData2 = processedDataItem.fieldData) === null || _processedDataItem_fieldData2 === void 0 ? void 0 : _processedDataItem_fieldData2.title) ?? '');
                        return await processLayoutData({
                            data: [
                                processedDataItem === null || processedDataItem === void 0 ? void 0 : processedDataItem.fieldData
                            ],
                            objectValuesData: {
                                ...objectValuesData,
                                [processedDataItem === null || processedDataItem === void 0 ? void 0 : (_processedDataItem_fieldData3 = processedDataItem.fieldData) === null || _processedDataItem_fieldData3 === void 0 ? void 0 : _processedDataItem_fieldData3.name]: processedDataItem === null || processedDataItem === void 0 ? void 0 : processedDataItem.fieldValue
                            },
                            fieldBreadcrumbTitle: breadcrumbTitle
                        });
                    }
                    return [
                        processedDataItem
                    ];
                });
                return (await Promise.all(processedPromises)).flatMap((item)=>item);
            }
            return [];
        });
        return (await Promise.all(promises)).flatMap((item)=>item);
    };
    const getGeneralSystemData = ()=>{
        const result = [];
        Object.entries(formattedSystemData).forEach((param)=>{
            let [key, value] = param;
            result.push({
                fieldBreadcrumbTitle: 'systemData',
                fieldData: {
                    title: key,
                    name: key,
                    fieldtype: 'input'
                },
                fieldValue: value,
                versionId,
                versionCount
            });
        });
        return result;
    };
    const layoutData = await processLayoutData({
        data: layout
    });
    const generalSystemData = getGeneralSystemData();
    return [
        ...generalSystemData,
        ...layoutData
    ];
};
const versionsDataToTableData = (param)=>{
    let { data } = param;
    const resultList = [];
    const mainVersionData = data[0] ?? [];
    const compareVersionData = data[1] ?? [];
    const isComparisonMode = !(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(compareVersionData);
    for(let index = 0; index < mainVersionData.length; index++){
        const mainVersionItem = mainVersionData[index];
        const compareVersionItem = compareVersionData[index];
        const isEmptyField = isFieldValueEmpty(mainVersionItem === null || mainVersionItem === void 0 ? void 0 : mainVersionItem.fieldValue) && isFieldValueEmpty(compareVersionItem === null || compareVersionItem === void 0 ? void 0 : compareVersionItem.fieldValue);
        if (isEmptyField) {
            continue;
        }
        const hasCompareVersion = !(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(compareVersionItem);
        const field = {
            Field: {
                fieldBreadcrumbTitle: mainVersionItem === null || mainVersionItem === void 0 ? void 0 : mainVersionItem.fieldBreadcrumbTitle,
                ...mainVersionItem === null || mainVersionItem === void 0 ? void 0 : mainVersionItem.fieldData
            }
        };
        // Set the field for the main version count
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(mainVersionItem)) {
            field[`Version ${mainVersionItem.versionCount}`] = mainVersionItem.fieldValue;
        } else if (hasCompareVersion) {
            field[`Version ${compareVersionItem.versionCount}`] = null;
        }
        // Set the field for the compare version count
        if (hasCompareVersion) {
            field[`Version ${compareVersionItem.versionCount}`] = compareVersionItem.fieldValue ?? null;
        }
        if (isComparisonMode && !(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isEqual)(mainVersionItem === null || mainVersionItem === void 0 ? void 0 : mainVersionItem.fieldValue, compareVersionItem === null || compareVersionItem === void 0 ? void 0 : compareVersionItem.fieldValue)) {
            var _mainVersionItem_fieldData;
            field.isModifiedValue = true;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            if ((mainVersionItem === null || mainVersionItem === void 0 ? void 0 : (_mainVersionItem_fieldData = mainVersionItem.fieldData) === null || _mainVersionItem_fieldData === void 0 ? void 0 : _mainVersionItem_fieldData.fieldtype) === _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_constants_typesList__WEBPACK_IMPORTED_MODULE_4__.DynamicTypesList.FIELD_COLLECTIONS) {
                var _mainVersionItem_fieldValue, _compareVersionItem_fieldValue;
                const mainVersionLength = mainVersionItem === null || mainVersionItem === void 0 ? void 0 : (_mainVersionItem_fieldValue = mainVersionItem.fieldValue) === null || _mainVersionItem_fieldValue === void 0 ? void 0 : _mainVersionItem_fieldValue.length;
                const compareVersionLength = compareVersionItem === null || compareVersionItem === void 0 ? void 0 : (_compareVersionItem_fieldValue = compareVersionItem.fieldValue) === null || _compareVersionItem_fieldValue === void 0 ? void 0 : _compareVersionItem_fieldValue.length;
                const mainList = compareVersionLength > mainVersionLength ? compareVersionItem : mainVersionItem;
                const compareList = mainVersionLength < compareVersionLength ? mainVersionItem : compareVersionItem;
                const differences = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.differenceWith)(mainList === null || mainList === void 0 ? void 0 : mainList.fieldValue, compareList === null || compareList === void 0 ? void 0 : compareList.fieldValue, (item1, item2)=>{
                    return (item1 === null || item1 === void 0 ? void 0 : item1.type) === (item2 === null || item2 === void 0 ? void 0 : item2.type) && (0,lodash__WEBPACK_IMPORTED_MODULE_0__.isEqual)(item1 === null || item1 === void 0 ? void 0 : item1.data, item2 === null || item2 === void 0 ? void 0 : item2.data);
                });
                field.fieldCollectionModifiedList = differences.map((item)=>item.type);
            }
        }
        resultList.push(field);
    }
    return resultList;
};

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
"./js/src/core/modules/data-object/listing/decorator/column-configuration/view-layer/components/grid/hooks/use-grid-options/tabs/grid-config/grid-config-inner.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  GridConfigInner: () => (GridConfigInner)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _hooks_use_grid_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/data-object/listing/decorator/column-configuration/view-layer/components/grid/hooks/use-grid-options/tabs/grid-config/hooks/use-grid-config.tsx");
/* ESM import */var _Pimcore_modules_auth_hooks_use_user__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/auth/hooks/use-user.ts");
/* ESM import */var _views_edit_view__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/data-object/listing/decorator/column-configuration/view-layer/components/grid/hooks/use-grid-options/tabs/grid-config/views/edit-view.tsx");
/* ESM import */var _views_save_view__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/data-object/listing/decorator/column-configuration/view-layer/components/grid/hooks/use-grid-options/tabs/grid-config/views/save-view.tsx");
/* ESM import */var antd_es_form_Form__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("./node_modules/antd/es/form/hooks/useForm.js");
/* ESM import */var _forms_save_form__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/data-object/listing/decorator/column-configuration/view-layer/components/grid/hooks/use-grid-options/tabs/grid-config/forms/save-form.tsx");
/* ESM import */var _Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/content/content.tsx");
/* ESM import */var _Pimcore_modules_user_roles_roles_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/user/roles/roles-api-slice-enhanced.ts");
/* ESM import */var _Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/user/user-api-slice-enhanced.ts");
/* ESM import */var _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_available_columns_use_available_columns__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/use-available-columns.tsx");
/* ESM import */var _Pimcore_modules_element_listing_abstract_configuration_layer_provider_selected_columns_use_selected_columns__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns.tsx");
/* ESM import */var _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_grid_config_use_grid_config__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/grid-config/use-grid-config.ts");
/* ESM import */var _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_selected_grid_config_id_use_selected_grid_config_id__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/selected-grid-config-id/use-selected-grid-config-id.ts");
/* ESM import */var _Pimcore_modules_element_listing_abstract_settings_use_settings__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./js/src/core/modules/element/listing/abstract/settings/use-settings.ts");
/* ESM import */var _Pimcore_modules_data_object_data_object_api_slice_gen__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("./js/src/core/modules/data-object/data-object-api-slice.gen.ts");
/* ESM import */var _Pimcore_modules_data_object_listing_decorator_class_definition_selection_context_layer_provider_use_class_definition_selection__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("./js/src/core/modules/data-object/listing/decorator/class-definition-selection/context-layer/provider/use-class-definition-selection.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 
var _s = $RefreshSig$();


















var ViewState = /*#__PURE__*/ function(ViewState) {
    ViewState["Edit"] = "edit";
    ViewState["Save"] = "save";
    ViewState["Update"] = "update";
    return ViewState;
}(ViewState || {});
const GridConfigInner = ()=>{
    _s();
    const { useElementId } = (0,_Pimcore_modules_element_listing_abstract_settings_use_settings__WEBPACK_IMPORTED_MODULE_15__.useSettings)();
    const { getAvailableColumnsDropdown } = (0,_Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_available_columns_use_available_columns__WEBPACK_IMPORTED_MODULE_11__.useAvailableColumns)();
    const { selectedColumns, setSelectedColumns } = (0,_Pimcore_modules_element_listing_abstract_configuration_layer_provider_selected_columns_use_selected_columns__WEBPACK_IMPORTED_MODULE_12__.useSelectedColumns)();
    const { columns, setColumns, addColumn } = (0,_hooks_use_grid_config__WEBPACK_IMPORTED_MODULE_3__.useGridConfig)();
    const { getId } = useElementId();
    const userData = (0,_Pimcore_modules_auth_hooks_use_user__WEBPACK_IMPORTED_MODULE_4__.useUser)();
    const { id: selectedGridConfigId, setId: setSelectedGridConfigId } = (0,_Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_selected_grid_config_id_use_selected_grid_config_id__WEBPACK_IMPORTED_MODULE_14__.useSelectedGridConfigId)();
    const { gridConfig, setGridConfig } = (0,_Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_grid_config_use_grid_config__WEBPACK_IMPORTED_MODULE_13__.useGridConfig)();
    const { selectedClassDefinition } = (0,_Pimcore_modules_data_object_listing_decorator_class_definition_selection_context_layer_provider_use_class_definition_selection__WEBPACK_IMPORTED_MODULE_17__.useClassDefinitionSelection)();
    const { isLoading, isFetching, data } = (0,_Pimcore_modules_data_object_data_object_api_slice_gen__WEBPACK_IMPORTED_MODULE_16__.useDataObjectListSavedGridConfigurationsQuery)({
        classId: selectedClassDefinition.id
    });
    const { data: roleList } = (0,_Pimcore_modules_user_roles_roles_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_9__.useRoleGetCollectionQuery)();
    const { data: userList } = (0,_Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_10__.useUserGetCollectionQuery)();
    const { isFetching: gridConfigIsLoading } = (0,_Pimcore_modules_data_object_data_object_api_slice_gen__WEBPACK_IMPORTED_MODULE_16__.useDataObjectGetGridConfigurationQuery)({
        classId: selectedClassDefinition.id,
        folderId: getId(),
        configurationId: selectedGridConfigId
    });
    const [fetchSaveGridConfig, { isLoading: isSaveLoading }] = (0,_Pimcore_modules_data_object_data_object_api_slice_gen__WEBPACK_IMPORTED_MODULE_16__.useDataObjectSaveGridConfigurationMutation)();
    const [fetchUpdateGridConfig, { isLoading: isUpdating }] = (0,_Pimcore_modules_data_object_data_object_api_slice_gen__WEBPACK_IMPORTED_MODULE_16__.useDataObjectUpdateGridConfigurationMutation)();
    const [fetchDeleteGridConfig, { isLoading: isDeleting }] = (0,_Pimcore_modules_data_object_data_object_api_slice_gen__WEBPACK_IMPORTED_MODULE_16__.useDataObjectDeleteGridConfigurationByConfigurationIdMutation)();
    // @todo prefill current language with language of the current configuration
    const [currentLanguage, setCurrentLanguage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('en');
    const [view, setView] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("edit");
    const [form] = (0,antd_es_form_Form__WEBPACK_IMPORTED_MODULE_18__["default"])();
    const isSavedConfiguration = (gridConfig === null || gridConfig === void 0 ? void 0 : gridConfig.name) !== 'Predefined' && gridConfig !== undefined;
    const savedGridConfigurations = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (data !== undefined) {
            var _data_items;
            return ((_data_items = data.items) === null || _data_items === void 0 ? void 0 : _data_items.map((item)=>{
                return {
                    key: item.id,
                    label: item.name,
                    onClick: ()=>{
                        setSelectedGridConfigId(item.id);
                    }
                };
            })) ?? [];
        }
        return [];
    }, [
        data
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setColumns(selectedColumns.map((column)=>{
            return {
                ...column.originalApiDefinition,
                locale: column === null || column === void 0 ? void 0 : column.locale
            };
        }));
    }, [
        selectedColumns
    ]);
    const onColumnClick = (column)=>{
        addColumn(column);
    };
    const availableColumnsDropdown = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>getAvailableColumnsDropdown(onColumnClick), [
        getAvailableColumnsDropdown,
        columns
    ]);
    function onDeleteClick() {
        if (isSavedConfiguration) {
            fetchDeleteGridConfig({
                configurationId: gridConfig.id
            }).then(()=>{
                setView("edit");
                setSelectedGridConfigId(undefined);
            }).catch((error)=>{
                console.error('Failed to switch to edit view', error);
            });
        }
    }
    function onUpdatedConfigurationClick() {
        if (gridConfig === undefined) {
            console.error('No grid configuration available');
            return;
        }
        fetchUpdateGridConfig({
            configurationId: gridConfig.id,
            body: {
                folderId: getId(),
                columns: prepareColumns(columns),
                name: gridConfig.name,
                description: gridConfig.description ?? '',
                setAsFavorite: gridConfig.setAsFavorite,
                shareGlobal: gridConfig.shareGlobal,
                sharedRoles: gridConfig.sharedRoles,
                sharedUsers: gridConfig.sharedUsers,
                saveFilter: false,
                pageSize: 0
            }
        }).catch((error)=>{
            console.error('Failed to update grid configuration', error);
        });
    }
    function prepareColumns(columns) {
        return columns.map((column)=>({
                key: column.key,
                locale: column.locale ?? null,
                group: column.group
            }));
    }
    function onFormFinish(values) {
        const columnsToSave = prepareColumns(columns);
        const isShareGlobally = values.shareGlobally === true;
        // for global sharing the sharedUsers and sharedRoles need to be cleared
        // @todo Check if we really should modify the global grid config here...
        if (isShareGlobally && !(0,lodash__WEBPACK_IMPORTED_MODULE_2__.isEmpty)(gridConfig)) {
            setGridConfig({
                ...gridConfig,
                sharedUsers: [],
                sharedRoles: []
            });
        }
        if (view === "update" && isSavedConfiguration) {
            fetchUpdateGridConfig({
                configurationId: gridConfig.id,
                body: {
                    folderId: getId(),
                    columns: columnsToSave,
                    name: values.name,
                    description: values.description,
                    setAsFavorite: values.setAsDefault,
                    shareGlobal: values.shareGlobally,
                    sharedRoles: gridConfig.sharedRoles,
                    sharedUsers: gridConfig.sharedUsers,
                    saveFilter: false,
                    pageSize: 0
                }
            }).catch((error)=>{
                console.error('Failed to update grid configuration', error);
            }).then(()=>{
                setView("edit");
            }).catch((error)=>{
                console.error('Failed to switch to edit view', error);
            });
        }
        if (view === "save") {
            fetchSaveGridConfig({
                classId: selectedClassDefinition.id,
                body: {
                    folderId: getId(),
                    columns: columnsToSave,
                    name: values.name,
                    description: values.description,
                    setAsFavorite: values.setAsDefault,
                    shareGlobal: values.shareGlobally,
                    sharedRoles: gridConfig === null || gridConfig === void 0 ? void 0 : gridConfig.sharedRoles,
                    sharedUsers: gridConfig === null || gridConfig === void 0 ? void 0 : gridConfig.sharedUsers,
                    saveFilter: false,
                    pageSize: 0
                }
            }).catch((error)=>{
                console.error('Failed to save grid configuration', error);
            }).then((response)=>{
                if ((response === null || response === void 0 ? void 0 : response.data) !== undefined) {
                    setSelectedGridConfigId(response.data.id);
                    setView("edit");
                }
            }).catch((error)=>{
                console.error('Failed to switch to edit view', error);
            });
        }
    }
    const onCancelClick = ()=>{
        setColumns(selectedColumns.map((column)=>column.originalApiDefinition));
    };
    const onApplyClick = ()=>{
        setSelectedColumns(columns.map((column)=>{
            const locale = column.locale === null && column.localizable ? currentLanguage : column.locale;
            return {
                key: column.key,
                locale: locale ?? undefined,
                type: column.type,
                config: column.config,
                sortable: column.sortable,
                editable: column.editable,
                localizable: column.localizable,
                exportable: column.exportable,
                frontendType: column.frontendType,
                group: column.group,
                originalApiDefinition: column
            };
        }));
    };
    if (gridConfigIsLoading || isDeleting) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_8__.Content, {
            loading: true
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/listing/decorator/column-configuration/view-layer/components/grid/hooks/use-grid-options/tabs/grid-config/grid-config-inner.tsx",
            lineNumber: 235,
            columnNumber: 12
        }, undefined);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            view === "edit" && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_views_edit_view__WEBPACK_IMPORTED_MODULE_5__.EditView, {
                addColumnMenu: availableColumnsDropdown.menu.items,
                columns: columns,
                currentLanguage: currentLanguage,
                currentUserId: userData === null || userData === void 0 ? void 0 : userData.id,
                gridConfig: gridConfig,
                isLoading: isLoading || isFetching,
                isUpdating: isUpdating,
                onApplyClick: onApplyClick,
                onCancelClick: onCancelClick,
                onEditConfigurationClick: ()=>{
                    setView("update");
                },
                onSaveConfigurationClick: ()=>{
                    setView("save");
                },
                onUpdateConfigurationClick: onUpdatedConfigurationClick,
                savedGridConfigurations: savedGridConfigurations,
                setCurrentLanguage: setCurrentLanguage
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/listing/decorator/column-configuration/view-layer/components/grid/hooks/use-grid-options/tabs/grid-config/grid-config-inner.tsx",
                lineNumber: 241,
                columnNumber: 9
            }, undefined),
            (view === "save" || view === "update") && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_views_save_view__WEBPACK_IMPORTED_MODULE_6__.SaveView, {
                formProps: {
                    form,
                    onFinish: onFormFinish,
                    initialValues: view === "update" && isSavedConfiguration ? {
                        name: gridConfig === null || gridConfig === void 0 ? void 0 : gridConfig.name,
                        description: gridConfig === null || gridConfig === void 0 ? void 0 : gridConfig.description,
                        setAsDefault: gridConfig === null || gridConfig === void 0 ? void 0 : gridConfig.setAsFavorite,
                        shareGlobally: gridConfig === null || gridConfig === void 0 ? void 0 : gridConfig.shareGlobal
                    } : {
                        ..._forms_save_form__WEBPACK_IMPORTED_MODULE_7__.defaultValues
                    }
                },
                isDeleting: isDeleting,
                isLoading: isSaveLoading || isUpdating,
                modificationDate: gridConfig === null || gridConfig === void 0 ? void 0 : gridConfig.modificationDate,
                onCancelClick: ()=>{
                    setView("edit");
                },
                onDeleteClick: isSavedConfiguration ? onDeleteClick : undefined,
                roleList: roleList,
                saveAsNewConfiguration: view === "save",
                userList: userList,
                userName: userData === null || userData === void 0 ? void 0 : userData.username
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/listing/decorator/column-configuration/view-layer/components/grid/hooks/use-grid-options/tabs/grid-config/grid-config-inner.tsx",
                lineNumber: 262,
                columnNumber: 9
            }, undefined)
        ]
    }, void 0, true);
};
_s(GridConfigInner, "/COEeTWpbkUg7Z4w+Txf/t3whY0=", true, function() {
    return [
        _Pimcore_modules_element_listing_abstract_settings_use_settings__WEBPACK_IMPORTED_MODULE_15__.useSettings,
        _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_available_columns_use_available_columns__WEBPACK_IMPORTED_MODULE_11__.useAvailableColumns,
        _Pimcore_modules_element_listing_abstract_configuration_layer_provider_selected_columns_use_selected_columns__WEBPACK_IMPORTED_MODULE_12__.useSelectedColumns,
        _hooks_use_grid_config__WEBPACK_IMPORTED_MODULE_3__.useGridConfig,
        _Pimcore_modules_auth_hooks_use_user__WEBPACK_IMPORTED_MODULE_4__.useUser,
        _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_selected_grid_config_id_use_selected_grid_config_id__WEBPACK_IMPORTED_MODULE_14__.useSelectedGridConfigId,
        _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_grid_config_use_grid_config__WEBPACK_IMPORTED_MODULE_13__.useGridConfig,
        _Pimcore_modules_data_object_listing_decorator_class_definition_selection_context_layer_provider_use_class_definition_selection__WEBPACK_IMPORTED_MODULE_17__.useClassDefinitionSelection,
        _Pimcore_modules_data_object_data_object_api_slice_gen__WEBPACK_IMPORTED_MODULE_16__.useDataObjectListSavedGridConfigurationsQuery,
        _Pimcore_modules_user_roles_roles_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_9__.useRoleGetCollectionQuery,
        _Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_10__.useUserGetCollectionQuery,
        _Pimcore_modules_data_object_data_object_api_slice_gen__WEBPACK_IMPORTED_MODULE_16__.useDataObjectGetGridConfigurationQuery,
        _Pimcore_modules_data_object_data_object_api_slice_gen__WEBPACK_IMPORTED_MODULE_16__.useDataObjectSaveGridConfigurationMutation,
        _Pimcore_modules_data_object_data_object_api_slice_gen__WEBPACK_IMPORTED_MODULE_16__.useDataObjectUpdateGridConfigurationMutation,
        _Pimcore_modules_data_object_data_object_api_slice_gen__WEBPACK_IMPORTED_MODULE_16__.useDataObjectDeleteGridConfigurationByConfigurationIdMutation,
        antd_es_form_Form__WEBPACK_IMPORTED_MODULE_18__["default"]
    ];
});
_c = GridConfigInner;
var _c;
$RefreshReg$(_c, "GridConfigInner");

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
"./js/src/core/modules/data-object/listing/decorator/inline-editing/hooks/use-inline-edit-api-update.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useInlineEditApiUpdate: () => (useInlineEditApiUpdate)
});
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* ESM import */var _Pimcore_modules_data_object_data_object_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/data-object/data-object-api-slice-enhanced.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _batch_actions_batch_append_mode_batch_append_mode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/data-object/listing/batch-actions/batch-append-mode/batch-append-mode.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ var _s = $RefreshSig$();





const useInlineEditApiUpdate = ()=>{
    _s();
    const [patchDataObject] = (0,_Pimcore_modules_data_object_data_object_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__.useDataObjectPatchByIdMutation)();
    const dispatch = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.useAppDispatch)();
    const updateCache = (event)=>{
        const { update, getGetRequestArgs } = event;
        const { id, column: columnToUpdate, value } = update;
        dispatch(_Pimcore_modules_data_object_data_object_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__.api.util.updateQueryData('dataObjectGetGrid', getGetRequestArgs, (oldData)=>{
            item_loop: for (const item of oldData.items){
                if (item.id !== id) {
                    continue;
                }
                for (const column of item.columns){
                    if (column.key === columnToUpdate.key && column.locale === columnToUpdate.locale) {
                        column.value = value;
                        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_3__.isNil)(column.inheritance) && 'inherited' in column.inheritance && column.inheritance.inherited === true) {
                            column.inheritance.inherited = false;
                        }
                        break item_loop;
                    }
                }
            }
            return oldData;
        }));
    };
    const updateApiData = async (event)=>{
        var _event_meta;
        const { update } = event;
        let columnKey = update.column.key;
        if (update.column.localizable && update.column.locale !== undefined && update.column.locale !== null) {
            const splittedColumnKey = columnKey.split('.');
            const columnId = splittedColumnKey[splittedColumnKey.length - 1];
            splittedColumnKey.pop();
            const hasPrepath = splittedColumnKey.length > 0 && splittedColumnKey[0] !== '';
            columnKey = `${splittedColumnKey.join('.')}${hasPrepath ? '.' : ''}localizedfields.${columnId}.${update.column.locale}`;
        }
        const value = ((_event_meta = event.meta) === null || _event_meta === void 0 ? void 0 : _event_meta[_batch_actions_batch_append_mode_batch_append_mode__WEBPACK_IMPORTED_MODULE_4__.META_SUPPORTS_BATCH_APPEND_MODE]) === true ? (0,_batch_actions_batch_append_mode_batch_append_mode__WEBPACK_IMPORTED_MODULE_4__.addBatchAppendMode)(update.value, _batch_actions_batch_append_mode_batch_append_mode__WEBPACK_IMPORTED_MODULE_4__.BatchAppendMode.Replace) : update.value;
        const promise = patchDataObject({
            body: {
                data: [
                    {
                        id: update.id,
                        editableData: {
                            ...(0,lodash__WEBPACK_IMPORTED_MODULE_3__.set)({}, columnKey, value)
                        }
                    }
                ]
            }
        });
        const result = await promise;
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_3__.isNil)(result.error)) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__.ApiError(result.error));
        }
        return result;
    };
    return {
        updateCache,
        updateApiData
    };
};
_s(useInlineEditApiUpdate, "In3OxzQxeXhdbUnAtDZfCm3ghb0=", false, function() {
    return [
        _Pimcore_modules_data_object_data_object_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__.useDataObjectPatchByIdMutation,
        _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.useAppDispatch
    ];
});

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
"./js/src/core/modules/data-object/tree/node/with-draggable.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  withDraggable: () => (withDraggable)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_drag_and_drop_draggable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/drag-and-drop/draggable.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 


const withDraggable = (Component)=>{
    const DraggableNodeContent = (props, ref)=>{
        var _props_metaData;
        const metaData = props.metaData.dataObject;
        if (((_props_metaData = props.metaData) === null || _props_metaData === void 0 ? void 0 : _props_metaData.dataObject) === undefined) {
            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {
                ...props
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/tree/node/with-draggable.tsx",
                lineNumber: 22,
                columnNumber: 9
            }, undefined);
        }
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_drag_and_drop_draggable__WEBPACK_IMPORTED_MODULE_2__.Draggable, {
            info: {
                icon: metaData.icon.value,
                title: metaData.key,
                type: 'data-object',
                data: {
                    ...metaData
                }
            },
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {
                ...props,
                ref: ref
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/tree/node/with-draggable.tsx",
                lineNumber: 30,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/tree/node/with-draggable.tsx",
            lineNumber: 27,
            columnNumber: 7
        }, undefined);
    };
    return /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(DraggableNodeContent);
};

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
"./js/src/core/modules/data-object/tree/utils/transform-api-data-to-node.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  transformApiDataToNodes: () => (transformApiDataToNodes)
});
/* ESM import */var _Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/element/element-helper.ts");
/* ESM import */var _Pimcore_types_enums_element_element_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/types/enums/element/element-type.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 

const transformApiDataToNodes = (node, data, maxItemsPerNode)=>{
    const nodes = [];
    const dataObjectData = data.items;
    dataObjectData.forEach((dataObjectNode)=>{
        nodes.push({
            id: dataObjectNode.id.toString(),
            elementType: _Pimcore_types_enums_element_element_type__WEBPACK_IMPORTED_MODULE_1__.elementTypes.dataObject,
            icon: (0,_Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_0__.getElementIcon)(dataObjectNode, {
                type: 'name',
                value: 'data-object'
            }),
            label: dataObjectNode.key,
            type: dataObjectNode.type,
            parentId: dataObjectNode.parentId.toString(),
            hasChildren: dataObjectNode.hasChildren,
            locked: dataObjectNode.locked,
            isLocked: dataObjectNode.isLocked,
            isPublished: dataObjectNode.published,
            metaData: {
                dataObject: dataObjectNode
            },
            permissions: dataObjectNode.permissions ?? [],
            internalKey: `${node.internalKey}-${dataObjectNode.id}`
        });
    });
    const total = data.totalItems ?? maxItemsPerNode;
    return {
        nodes,
        total
    };
};

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
"./js/src/core/modules/data-object/unit-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useUnitQuantityValueConvertAllQuery: () => (useUnitQuantityValueConvertAllQuery),
  useUnitQuantityValueConvertQuery: () => (useUnitQuantityValueConvertQuery),
  useUnitQuantityValueListQuery: () => (useUnitQuantityValueListQuery)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Units"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            unitQuantityValueConvertAll: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/unit/quantity-value/convert-all`,
                        params: {
                            fromUnitId: queryArg.fromUnitId,
                            value: queryArg.value
                        }
                    }),
                providesTags: [
                    "Units"
                ]
            }),
            unitQuantityValueConvert: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/unit/quantity-value/convert`,
                        params: {
                            fromUnitId: queryArg.fromUnitId,
                            toUnitId: queryArg.toUnitId,
                            value: queryArg.value
                        }
                    }),
                providesTags: [
                    "Units"
                ]
            }),
            unitQuantityValueList: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/unit/quantity-value/unit-list`
                    }),
                providesTags: [
                    "Units"
                ]
            })
        }),
    overrideExisting: false
});

const { useUnitQuantityValueConvertAllQuery, useUnitQuantityValueConvertQuery, useUnitQuantityValueListQuery } = injectedRtkApi;

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
"./js/src/core/modules/document/document-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useDocumentAddMutation: () => (useDocumentAddMutation),
  useDocumentAddTranslationMutation: () => (useDocumentAddTranslationMutation),
  useDocumentAvailableControllersListQuery: () => (useDocumentAvailableControllersListQuery),
  useDocumentAvailableTemplatesListQuery: () => (useDocumentAvailableTemplatesListQuery),
  useDocumentCloneMutation: () => (useDocumentCloneMutation),
  useDocumentConvertMutation: () => (useDocumentConvertMutation),
  useDocumentDeleteSiteMutation: () => (useDocumentDeleteSiteMutation),
  useDocumentDeleteTranslationMutation: () => (useDocumentDeleteTranslationMutation),
  useDocumentDocTypeListQuery: () => (useDocumentDocTypeListQuery),
  useDocumentGetByIdQuery: () => (useDocumentGetByIdQuery),
  useDocumentGetTranslationParentByLanguageQuery: () => (useDocumentGetTranslationParentByLanguageQuery),
  useDocumentGetTranslationsQuery: () => (useDocumentGetTranslationsQuery),
  useDocumentGetTreeQuery: () => (useDocumentGetTreeQuery),
  useDocumentPageStreamPreviewQuery: () => (useDocumentPageStreamPreviewQuery),
  useDocumentReplaceContentMutation: () => (useDocumentReplaceContentMutation),
  useDocumentUpdateSiteMutation: () => (useDocumentUpdateSiteMutation),
  useDocumentsListAvailableSitesQuery: () => (useDocumentsListAvailableSitesQuery)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Documents"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            documentAdd: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/documents/add/${queryArg.parentId}`,
                        method: "POST",
                        body: queryArg.documentAddParameters
                    }),
                invalidatesTags: [
                    "Documents"
                ]
            }),
            documentClone: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/documents/${queryArg.id}/clone/${queryArg.parentId}`,
                        method: "POST",
                        body: queryArg.documentCloneParameters
                    }),
                invalidatesTags: [
                    "Documents"
                ]
            }),
            documentConvert: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/documents/${queryArg.id}/convert/${queryArg["type"]}`,
                        method: "POST"
                    }),
                invalidatesTags: [
                    "Documents"
                ]
            }),
            documentDocTypeList: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/documents/doc-types`,
                        params: {
                            type: queryArg["type"]
                        }
                    }),
                providesTags: [
                    "Documents"
                ]
            }),
            documentGetById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/documents/${queryArg.id}`
                    }),
                providesTags: [
                    "Documents"
                ]
            }),
            documentPageStreamPreview: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/documents/${queryArg.id}/page/stream/preview`
                    }),
                providesTags: [
                    "Documents"
                ]
            }),
            documentAvailableControllersList: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/documents/get-available-controllers`
                    }),
                providesTags: [
                    "Documents"
                ]
            }),
            documentAvailableTemplatesList: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/documents/get-available-templates`
                    }),
                providesTags: [
                    "Documents"
                ]
            }),
            documentReplaceContent: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/documents/${queryArg.sourceId}/replace/${queryArg.targetId}`,
                        method: "POST"
                    }),
                invalidatesTags: [
                    "Documents"
                ]
            }),
            documentsListAvailableSites: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/documents/sites/list-available`,
                        params: {
                            excludeMainSite: queryArg.excludeMainSite
                        }
                    }),
                providesTags: [
                    "Documents"
                ]
            }),
            documentUpdateSite: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/documents/site/${queryArg.id}`,
                        method: "POST",
                        body: queryArg.update20Site
                    }),
                invalidatesTags: [
                    "Documents"
                ]
            }),
            documentDeleteSite: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/documents/site/${queryArg.id}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Documents"
                ]
            }),
            documentAddTranslation: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/documents/translations/${queryArg.id}/add/${queryArg.translationId}`,
                        method: "POST"
                    }),
                invalidatesTags: [
                    "Documents"
                ]
            }),
            documentDeleteTranslation: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/documents/translations/${queryArg.id}/delete/${queryArg.translationId}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Documents"
                ]
            }),
            documentGetTranslations: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/documents/translations/${queryArg.id}`
                    }),
                providesTags: [
                    "Documents"
                ]
            }),
            documentGetTranslationParentByLanguage: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/documents/translations/${queryArg.id}/get-parent/${queryArg.language}`
                    }),
                providesTags: [
                    "Documents"
                ]
            }),
            documentGetTree: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/documents/tree`,
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
                    "Documents"
                ]
            })
        }),
    overrideExisting: false
});

const { useDocumentAddMutation, useDocumentCloneMutation, useDocumentConvertMutation, useDocumentDocTypeListQuery, useDocumentGetByIdQuery, useDocumentPageStreamPreviewQuery, useDocumentAvailableControllersListQuery, useDocumentAvailableTemplatesListQuery, useDocumentReplaceContentMutation, useDocumentsListAvailableSitesQuery, useDocumentUpdateSiteMutation, useDocumentDeleteSiteMutation, useDocumentAddTranslationMutation, useDocumentDeleteTranslationMutation, useDocumentGetTranslationsQuery, useDocumentGetTranslationParentByLanguageQuery, useDocumentGetTreeQuery } = injectedRtkApi;

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
"./js/src/core/modules/document/hooks/use-document-helper.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useDocumentHelper: () => (useDocumentHelper)
});
/* ESM import */var _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/tags.ts");
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _Pimcore_modules_document_document_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/document/document-api-slice-enhanced.ts");
/* ESM import */var _Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/element/element-helper.ts");
/* ESM import */var _Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/element/permissions/permission-helper.ts");
/* ESM import */var _Pimcore_modules_widget_manager_hooks_use_widget_manager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/widget-manager/hooks/use-widget-manager.ts");
/* ESM import */var _Pimcore_modules_widget_manager_utils_tools__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/widget-manager/utils/tools.tsx");
/* ESM import */var _use_document_draft_fetcher__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/document/hooks/use-document-draft-fetcher.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 







const useDocumentHelper = ()=>{
    const { openMainWidget, isMainWidgetOpen } = (0,_Pimcore_modules_widget_manager_hooks_use_widget_manager__WEBPACK_IMPORTED_MODULE_5__.useWidgetManager)();
    const dispatch = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_1__.useAppDispatch)();
    const { updateDocumentDraft } = (0,_use_document_draft_fetcher__WEBPACK_IMPORTED_MODULE_7__.useDocumentDraftFetcher)();
    async function openDocument(props) {
        const { config } = props;
        const widgetId = (0,_Pimcore_modules_widget_manager_utils_tools__WEBPACK_IMPORTED_MODULE_6__.getWidgetId)('document', config.id);
        if (!isMainWidgetOpen(widgetId)) {
            dispatch(_Pimcore_modules_document_document_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__.api.util.invalidateTags(_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.DOCUMENT_DETAIL_ID(config.id)));
            void updateDocumentDraft(config.id, true);
        }
        const { data } = await _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_1__.store.dispatch(_Pimcore_modules_document_document_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__.api.endpoints.documentGetById.initiate({
            id: config.id
        }));
        if (data === undefined || !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_4__.checkElementPermission)(data.permissions, 'view')) {
            return;
        }
        const icon = (0,_Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_3__.getElementIcon)(data, {
            value: 'widget',
            type: 'name'
        });
        const iconConfig = {
            type: icon.type,
            value: icon.value
        };
        openMainWidget({
            name: data === null || data === void 0 ? void 0 : data.key,
            id: widgetId,
            component: 'document-editor',
            config: {
                ...config,
                icon: iconConfig
            }
        });
    }
    return {
        openDocument
    };
};

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
"./js/src/core/modules/document/sites-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useDocumentsListAvailableSitesQuery: () => (useDocumentsListAvailableSitesQuery)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Documents"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            documentsListAvailableSites: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/documents/sites/list-available`,
                        params: {
                            excludeMainSite: queryArg.excludeMainSite
                        }
                    }),
                providesTags: [
                    "Documents"
                ]
            })
        }),
    overrideExisting: false
});

const { useDocumentsListAvailableSitesQuery } = injectedRtkApi;

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
"./js/src/core/modules/document/tree/node/with-draggable.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  withDraggable: () => (withDraggable)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_drag_and_drop_draggable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/drag-and-drop/draggable.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 


const withDraggable = (Component)=>{
    const DraggableNodeContent = (props, ref)=>{
        var _props_metaData;
        const metaData = props.metaData.document;
        if (((_props_metaData = props.metaData) === null || _props_metaData === void 0 ? void 0 : _props_metaData.document) === undefined) {
            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {
                ...props
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/tree/node/with-draggable.tsx",
                lineNumber: 22,
                columnNumber: 9
            }, undefined);
        }
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_drag_and_drop_draggable__WEBPACK_IMPORTED_MODULE_2__.Draggable, {
            info: {
                icon: metaData.icon.value,
                title: metaData.key,
                type: 'document',
                data: {
                    ...metaData
                }
            },
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {
                ...props,
                ref: ref
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/tree/node/with-draggable.tsx",
                lineNumber: 30,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/tree/node/with-draggable.tsx",
            lineNumber: 27,
            columnNumber: 7
        }, undefined);
    };
    return /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(DraggableNodeContent);
};

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
"./js/src/core/modules/document/tree/utils/transform-api-data-to-node.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  transformApiDataToNodes: () => (transformApiDataToNodes)
});
/* ESM import */var _Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/element/element-helper.ts");
/* ESM import */var _Pimcore_types_enums_element_element_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/types/enums/element/element-type.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 

const transformApiDataToNodes = (node, data, maxItemsPerNode)=>{
    const nodes = [];
    const documentData = data.items;
    documentData.forEach((documentNode)=>{
        nodes.push({
            id: documentNode.id.toString(),
            elementType: _Pimcore_types_enums_element_element_type__WEBPACK_IMPORTED_MODULE_1__.elementTypes.document,
            icon: (0,_Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_0__.getElementIcon)(documentNode, {
                type: 'name',
                value: 'document'
            }),
            label: documentNode.key,
            type: documentNode.type,
            parentId: documentNode.parentId.toString(),
            hasChildren: documentNode.hasChildren,
            locked: documentNode.locked,
            isLocked: documentNode.isLocked,
            isPublished: documentNode.published,
            metaData: {
                document: documentNode
            },
            permissions: documentNode.permissions ?? [],
            internalKey: `${node.internalKey}-${documentNode.id}`
        });
    });
    const total = data.totalItems ?? maxItemsPerNode;
    return {
        nodes,
        total
    };
};

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
"./js/src/core/modules/element/actions/unpublish/use-unpublish.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useUnpublish: () => (useUnpublish)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _Pimcore_modules_data_object_actions_save_use_save__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/data-object/actions/save/use-save.tsx");
/* ESM import */var _Pimcore_modules_perspectives_enums_tree_permission__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/perspectives/enums/tree-permission.ts");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _hooks_use_element_helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/element/hooks/use-element-helper.ts");
/* ESM import */var _permissions_permission_helper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/element/permissions/permission-helper.ts");
/* ESM import */var _tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/element/tree/provider/tree-permission-provider/use-tree-permission.ts");
/* ESM import */var ___WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/element/actions/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 
var _s = $RefreshSig$();









const useUnpublish = (elementType)=>{
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_5__.useTranslation)();
    const { isTreeActionAllowed } = (0,_tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_8__.useTreePermission)();
    const { executeElementTask } = (0,_hooks_use_element_helper__WEBPACK_IMPORTED_MODULE_6__.useElementHelper)();
    const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(false);
    const isUnpublishHidden = (node)=>{
        return !(0,_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_7__.checkElementPermission)(node.permissions, 'unpublish') || node.type === 'folder' || node.isLocked;
    };
    const unpublishTreeNode = (node, onFinish)=>{
        const nodeId = typeof node.id === 'string' ? parseInt(node.id) : node.id;
        executeElementTask(elementType, nodeId, _Pimcore_modules_data_object_actions_save_use_save__WEBPACK_IMPORTED_MODULE_2__.SaveTaskType.Unpublish, onFinish);
    };
    const unpublishContextMenuItem = (node, onFinish)=>{
        return {
            label: t('element.unpublish'),
            key: ___WEBPACK_IMPORTED_MODULE_9__.ContextMenuActionName.unpublish,
            isLoading,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_1__.Icon, {
                value: "eye-off"
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/actions/unpublish/use-unpublish.tsx",
                lineNumber: 54,
                columnNumber: 13
            }, undefined),
            hidden: !node.published || isUnpublishHidden(node),
            onClick: ()=>{
                setIsLoading(true);
                unpublishTreeNode(node, ()=>{
                    onFinish === null || onFinish === void 0 ? void 0 : onFinish();
                    setIsLoading(false);
                });
            }
        };
    };
    const unpublishTreeContextMenuItem = (node)=>{
        return {
            label: t('element.unpublish'),
            key: ___WEBPACK_IMPORTED_MODULE_9__.ContextMenuActionName.unpublish,
            isLoading,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_1__.Icon, {
                value: "eye-off"
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/actions/unpublish/use-unpublish.tsx",
                lineNumber: 71,
                columnNumber: 13
            }, undefined),
            hidden: node.isPublished === false || !isTreeActionAllowed(_Pimcore_modules_perspectives_enums_tree_permission__WEBPACK_IMPORTED_MODULE_3__.TreePermission.Unpublish) || isUnpublishHidden(node),
            onClick: ()=>{
                unpublishTreeNode(node);
            }
        };
    };
    return {
        unpublishTreeContextMenuItem,
        unpublishContextMenuItem
    };
};
_s(useUnpublish, "DXszsBxr2ek2Lqcr7eSMrOMU7g0=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_5__.useTranslation,
        _tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_8__.useTreePermission,
        _hooks_use_element_helper__WEBPACK_IMPORTED_MODULE_6__.useElementHelper
    ];
});

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
"./js/src/core/modules/element/draft/hooks/use-published.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  usePublishedDraft: () => (usePublishedDraft),
  usePublishedReducers: () => (usePublishedReducers)
});
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 

const usePublishedReducers = (entityAdapter)=>{
    const publishDraft = (state, action)=>{
        modifyDraft(state, action.payload.id, (draft)=>{
            draft.published = true;
            return draft;
        });
    };
    const unpublishDraft = (state, action)=>{
        modifyDraft(state, action.payload.id, (draft)=>{
            draft.published = false;
            return draft;
        });
    };
    const modifyDraft = (state, id, modification)=>{
        const draft = entityAdapter.getSelectors().selectById(state, id);
        if (draft === undefined) {
            return;
        }
        state.entities[id] = modification({
            ...draft
        });
    };
    return {
        publishDraft,
        unpublishDraft
    };
};
const usePublishedDraft = (id, publishDraftAction, unpublishDraftAction)=>{
    const dispatch = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.useAppDispatch)();
    const [, startTransition] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useTransition)();
    return {
        publishDraft: ()=>{
            startTransition(()=>{
                dispatch(publishDraftAction({
                    id
                }));
            });
        },
        unpublishDraft: ()=>{
            startTransition(()=>{
                dispatch(unpublishDraftAction({
                    id
                }));
            });
        }
    };
};

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
"./js/src/core/modules/element/editor/shared-tab-manager/tabs/notes-and-events/notes-and-events-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useNoteDeleteByIdMutation: () => (useNoteDeleteByIdMutation),
  useNoteElementCreateMutation: () => (useNoteElementCreateMutation),
  useNoteElementGetCollectionQuery: () => (useNoteElementGetCollectionQuery),
  useNoteElementGetTypeCollectionQuery: () => (useNoteElementGetTypeCollectionQuery),
  useNoteGetCollectionQuery: () => (useNoteGetCollectionQuery)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Notes"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            noteGetCollection: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/notes`,
                        method: "POST",
                        body: queryArg.body
                    }),
                providesTags: [
                    "Notes"
                ]
            }),
            noteDeleteById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/notes/${queryArg.id}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Notes"
                ]
            }),
            noteElementGetCollection: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/notes/${queryArg.elementType}/${queryArg.id}`,
                        params: {
                            page: queryArg.page,
                            pageSize: queryArg.pageSize,
                            sortBy: queryArg.sortBy,
                            sortOrder: queryArg.sortOrder,
                            filter: queryArg.filter,
                            fieldFilters: queryArg.fieldFilters
                        }
                    }),
                providesTags: [
                    "Notes"
                ]
            }),
            noteElementCreate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/notes/${queryArg.elementType}/${queryArg.id}`,
                        method: "POST",
                        body: queryArg.createNote
                    }),
                invalidatesTags: [
                    "Notes"
                ]
            }),
            noteElementGetTypeCollection: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/notes/type/${queryArg.elementType}`
                    }),
                providesTags: [
                    "Notes"
                ]
            })
        }),
    overrideExisting: false
});

const { useNoteGetCollectionQuery, useNoteDeleteByIdMutation, useNoteElementGetCollectionQuery, useNoteElementCreateMutation, useNoteElementGetTypeCollectionQuery } = injectedRtkApi;

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
"./js/src/core/modules/element/editor/shared-tab-manager/tabs/properties/properties-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  usePropertyDeleteMutation: () => (usePropertyDeleteMutation),
  usePropertyGetCollectionForElementByTypeAndIdQuery: () => (usePropertyGetCollectionForElementByTypeAndIdQuery),
  usePropertyGetCollectionQuery: () => (usePropertyGetCollectionQuery),
  usePropertyUpdateMutation: () => (usePropertyUpdateMutation)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Properties"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            propertyGetCollection: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/properties`,
                        params: {
                            elementType: queryArg.elementType,
                            filter: queryArg.filter
                        }
                    }),
                providesTags: [
                    "Properties"
                ]
            }),
            propertyUpdate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/properties/${queryArg.id}`,
                        method: "PUT",
                        body: queryArg.updatePredefinedProperty
                    }),
                invalidatesTags: [
                    "Properties"
                ]
            }),
            propertyDelete: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/properties/${queryArg.id}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Properties"
                ]
            }),
            propertyGetCollectionForElementByTypeAndId: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/properties/${queryArg.elementType}/${queryArg.id}`
                    }),
                providesTags: [
                    "Properties"
                ]
            })
        }),
    overrideExisting: false
});

const { usePropertyGetCollectionQuery, usePropertyUpdateMutation, usePropertyDeleteMutation, usePropertyGetCollectionForElementByTypeAndIdQuery } = injectedRtkApi;

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
"./js/src/core/modules/element/editor/shared-tab-manager/tabs/schedule/schedule-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useScheduleCreateForElementByTypeAndIdMutation: () => (useScheduleCreateForElementByTypeAndIdMutation),
  useScheduleDeleteByIdMutation: () => (useScheduleDeleteByIdMutation),
  useScheduleGetCollectionForElementByTypeAndIdQuery: () => (useScheduleGetCollectionForElementByTypeAndIdQuery),
  useScheduleUpdateForElementByTypeAndIdMutation: () => (useScheduleUpdateForElementByTypeAndIdMutation)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Schedule"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            scheduleDeleteById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/schedules/${queryArg.id}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Schedule"
                ]
            }),
            scheduleGetCollectionForElementByTypeAndId: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/schedules/${queryArg.elementType}/${queryArg.id}`
                    }),
                providesTags: [
                    "Schedule"
                ]
            }),
            scheduleUpdateForElementByTypeAndId: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/schedules/${queryArg.elementType}/${queryArg.id}`,
                        method: "PUT",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Schedule"
                ]
            }),
            scheduleCreateForElementByTypeAndId: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/schedules/${queryArg.elementType}/${queryArg.id}`,
                        method: "POST"
                    }),
                invalidatesTags: [
                    "Schedule"
                ]
            })
        }),
    overrideExisting: false
});

const { useScheduleDeleteByIdMutation, useScheduleGetCollectionForElementByTypeAndIdQuery, useScheduleUpdateForElementByTypeAndIdMutation, useScheduleCreateForElementByTypeAndIdMutation } = injectedRtkApi;

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
"./js/src/core/modules/element/editor/shared-tab-manager/tabs/tags/tags-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useTagAssignToElementMutation: () => (useTagAssignToElementMutation),
  useTagBatchOperationToElementsByTypeAndIdMutation: () => (useTagBatchOperationToElementsByTypeAndIdMutation),
  useTagCreateMutation: () => (useTagCreateMutation),
  useTagDeleteByIdMutation: () => (useTagDeleteByIdMutation),
  useTagGetByIdQuery: () => (useTagGetByIdQuery),
  useTagGetCollectionForElementByTypeAndIdQuery: () => (useTagGetCollectionForElementByTypeAndIdQuery),
  useTagGetCollectionQuery: () => (useTagGetCollectionQuery),
  useTagUnassignFromElementMutation: () => (useTagUnassignFromElementMutation),
  useTagUpdateByIdMutation: () => (useTagUpdateByIdMutation)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Tags",
    "Tags for Element"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            tagGetCollection: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/tags`,
                        params: {
                            page: queryArg.page,
                            pageSize: queryArg.pageSize,
                            elementType: queryArg.elementType,
                            filter: queryArg.filter,
                            parentId: queryArg.parentId
                        }
                    }),
                providesTags: [
                    "Tags"
                ]
            }),
            tagCreate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/tag`,
                        method: "POST",
                        body: queryArg.createTagParameters
                    }),
                invalidatesTags: [
                    "Tags"
                ]
            }),
            tagGetById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/tags/${queryArg.id}`
                    }),
                providesTags: [
                    "Tags"
                ]
            }),
            tagUpdateById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/tags/${queryArg.id}`,
                        method: "PUT",
                        body: queryArg.updateTagParameters
                    }),
                invalidatesTags: [
                    "Tags"
                ]
            }),
            tagDeleteById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/tags/${queryArg.id}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Tags"
                ]
            }),
            tagAssignToElement: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/tags/assign/${queryArg.elementType}/${queryArg.id}/${queryArg.tagId}`,
                        method: "POST"
                    }),
                invalidatesTags: [
                    "Tags for Element"
                ]
            }),
            tagBatchOperationToElementsByTypeAndId: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/tags/batch/${queryArg.operation}/${queryArg.elementType}/${queryArg.id}`,
                        method: "POST"
                    }),
                invalidatesTags: [
                    "Tags for Element"
                ]
            }),
            tagGetCollectionForElementByTypeAndId: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/tags/${queryArg.elementType}/${queryArg.id}`
                    }),
                providesTags: [
                    "Tags for Element"
                ]
            }),
            tagUnassignFromElement: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/tags/${queryArg.elementType}/${queryArg.id}/${queryArg.tagId}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Tags for Element"
                ]
            })
        }),
    overrideExisting: false
});

const { useTagGetCollectionQuery, useTagCreateMutation, useTagGetByIdQuery, useTagUpdateByIdMutation, useTagDeleteByIdMutation, useTagAssignToElementMutation, useTagBatchOperationToElementsByTypeAndIdMutation, useTagGetCollectionForElementByTypeAndIdQuery, useTagUnassignFromElementMutation } = injectedRtkApi;

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
"./js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/version-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useVersionAssetDownloadByIdQuery: () => (useVersionAssetDownloadByIdQuery),
  useVersionCleanupForElementByTypeAndIdMutation: () => (useVersionCleanupForElementByTypeAndIdMutation),
  useVersionDeleteByIdMutation: () => (useVersionDeleteByIdMutation),
  useVersionGetByIdQuery: () => (useVersionGetByIdQuery),
  useVersionGetCollectionForElementByTypeAndIdQuery: () => (useVersionGetCollectionForElementByTypeAndIdQuery),
  useVersionImageStreamByIdQuery: () => (useVersionImageStreamByIdQuery),
  useVersionPdfStreamByIdQuery: () => (useVersionPdfStreamByIdQuery),
  useVersionPublishByIdMutation: () => (useVersionPublishByIdMutation),
  useVersionUpdateByIdMutation: () => (useVersionUpdateByIdMutation)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Versions"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            versionAssetDownloadById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/versions/${queryArg.id}/asset/download`
                    }),
                providesTags: [
                    "Versions"
                ]
            }),
            versionImageStreamById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/versions/${queryArg.id}/image/stream`
                    }),
                providesTags: [
                    "Versions"
                ]
            }),
            versionPdfStreamById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/versions/${queryArg.id}/pdf/stream`
                    }),
                providesTags: [
                    "Versions"
                ]
            }),
            versionGetById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/versions/${queryArg.id}`
                    }),
                providesTags: [
                    "Versions"
                ]
            }),
            versionUpdateById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/versions/${queryArg.id}`,
                        method: "PUT",
                        body: queryArg.updateVersion
                    }),
                invalidatesTags: [
                    "Versions"
                ]
            }),
            versionPublishById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/versions/${queryArg.id}`,
                        method: "POST"
                    }),
                invalidatesTags: [
                    "Versions"
                ]
            }),
            versionDeleteById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/versions/${queryArg.id}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Versions"
                ]
            }),
            versionGetCollectionForElementByTypeAndId: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/versions/${queryArg.elementType}/${queryArg.id}`,
                        params: {
                            page: queryArg.page,
                            pageSize: queryArg.pageSize
                        }
                    }),
                providesTags: [
                    "Versions"
                ]
            }),
            versionCleanupForElementByTypeAndId: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/versions/${queryArg.elementType}/${queryArg.id}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Versions"
                ]
            })
        }),
    overrideExisting: false
});

const { useVersionAssetDownloadByIdQuery, useVersionImageStreamByIdQuery, useVersionPdfStreamByIdQuery, useVersionGetByIdQuery, useVersionUpdateByIdMutation, useVersionPublishByIdMutation, useVersionDeleteByIdMutation, useVersionGetCollectionForElementByTypeAndIdQuery, useVersionCleanupForElementByTypeAndIdMutation } = injectedRtkApi;

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
"./js/src/core/modules/element/editor/shared-tab-manager/tabs/workflow/workflow-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useWorkflowActionSubmitMutation: () => (useWorkflowActionSubmitMutation),
  useWorkflowGetDetailsQuery: () => (useWorkflowGetDetailsQuery)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Workflows"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            workflowGetDetails: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/workflows/details`,
                        params: {
                            elementId: queryArg.elementId,
                            elementType: queryArg.elementType
                        }
                    }),
                providesTags: [
                    "Workflows"
                ]
            }),
            workflowActionSubmit: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/workflows/action`,
                        method: "POST",
                        body: queryArg.submitAction
                    }),
                invalidatesTags: [
                    "Workflows"
                ]
            })
        }),
    overrideExisting: false
});

const { useWorkflowGetDetailsQuery, useWorkflowActionSubmitMutation } = injectedRtkApi;

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
"./js/src/core/modules/element/element-api-slice-enhanced.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useElementDeleteMutation: () => (useElementDeleteMutation),
  useElementFolderCreateMutation: () => (useElementFolderCreateMutation),
  useElementGetContextPermissionsQuery: () => (useElementGetContextPermissionsQuery),
  useElementGetDeleteInfoQuery: () => (useElementGetDeleteInfoQuery),
  useElementGetIdByPathQuery: () => (useElementGetIdByPathQuery),
  useElementGetSubtypeQuery: () => (useElementGetSubtypeQuery),
  useElementResolveBySearchTermQuery: () => (useElementResolveBySearchTermQuery),
  useLazyElementResolveBySearchTermQuery: () => (useLazyElementResolveBySearchTermQuery)
});
/* ESM import */var _Pimcore_modules_element_element_api_slice_gen__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/element/element-api-slice.gen.ts");
/* ESM import */var _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/app/api/pimcore/tags.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 

const api = _Pimcore_modules_element_element_api_slice_gen__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes: [
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_1__.tagNames.DATA_OBJECT_DETAIL,
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_1__.tagNames.ASSET_DETAIL
    ],
    endpoints: {
        elementDelete: {
            invalidatesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_1__.invalidatingTags.ELEMENT_DETAIL(args.elementType, args.id)
        }
    }
});
const { useElementDeleteMutation, useElementGetDeleteInfoQuery, useElementFolderCreateMutation, useElementGetContextPermissionsQuery, useElementGetIdByPathQuery, useElementGetSubtypeQuery, useElementResolveBySearchTermQuery, useLazyElementResolveBySearchTermQuery } = api;

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
"./js/src/core/modules/element/element-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useElementDeleteMutation: () => (useElementDeleteMutation),
  useElementFolderCreateMutation: () => (useElementFolderCreateMutation),
  useElementGetContextPermissionsQuery: () => (useElementGetContextPermissionsQuery),
  useElementGetDeleteInfoQuery: () => (useElementGetDeleteInfoQuery),
  useElementGetIdByPathQuery: () => (useElementGetIdByPathQuery),
  useElementGetSubtypeQuery: () => (useElementGetSubtypeQuery),
  useElementGetTreeLocationQuery: () => (useElementGetTreeLocationQuery),
  useElementResolveBySearchTermQuery: () => (useElementResolveBySearchTermQuery)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Elements"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            elementDelete: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/elements/${queryArg.elementType}/delete/${queryArg.id}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Elements"
                ]
            }),
            elementGetDeleteInfo: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/elements/${queryArg.elementType}/delete-info/${queryArg.id}`
                    }),
                providesTags: [
                    "Elements"
                ]
            }),
            elementFolderCreate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/elements/${queryArg.elementType}/folder/${queryArg.parentId}`,
                        method: "POST",
                        body: queryArg.folderData
                    }),
                invalidatesTags: [
                    "Elements"
                ]
            }),
            elementGetContextPermissions: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/elements/${queryArg.elementType}/context-permissions/`
                    }),
                providesTags: [
                    "Elements"
                ]
            }),
            elementGetTreeLocation: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/elements/${queryArg.elementType}/location/${queryArg.id}/${queryArg.perspectiveId}`
                    }),
                providesTags: [
                    "Elements"
                ]
            }),
            elementGetIdByPath: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/elements/${queryArg.elementType}/path`,
                        params: {
                            elementPath: queryArg.elementPath
                        }
                    }),
                providesTags: [
                    "Elements"
                ]
            }),
            elementGetSubtype: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/elements/${queryArg.elementType}/subtype/${queryArg.id}`
                    }),
                providesTags: [
                    "Elements"
                ]
            }),
            elementResolveBySearchTerm: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/elements/${queryArg.elementType}/resolve`,
                        params: {
                            searchTerm: queryArg.searchTerm
                        }
                    }),
                providesTags: [
                    "Elements"
                ]
            })
        }),
    overrideExisting: false
});

const { useElementDeleteMutation, useElementGetDeleteInfoQuery, useElementFolderCreateMutation, useElementGetContextPermissionsQuery, useElementGetTreeLocationQuery, useElementGetIdByPathQuery, useElementGetSubtypeQuery, useElementResolveBySearchTermQuery } = injectedRtkApi;

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
"./js/src/core/modules/element/element-helper.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  convertDragAndDropInfoToElementReference: () => (convertDragAndDropInfoToElementReference),
  getElementActionCacheKey: () => (getElementActionCacheKey),
  getElementIcon: () => (getElementIcon),
  getElementKey: () => (getElementKey)
});
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 
const getElementIcon = (element, defaultIcon)=>{
    var _element_customAttributes, _element_customAttributes1;
    if (((_element_customAttributes = element.customAttributes) === null || _element_customAttributes === void 0 ? void 0 : _element_customAttributes.icon) !== undefined && ((_element_customAttributes1 = element.customAttributes) === null || _element_customAttributes1 === void 0 ? void 0 : _element_customAttributes1.icon) !== null) {
        return element.customAttributes.icon;
    }
    if (element.icon !== undefined && element.icon !== null) {
        return element.icon;
    }
    return defaultIcon;
};
const getElementKey = (element, elementType)=>{
    if (elementType === 'asset') {
        return element.filename ?? '';
    }
    if (elementType === 'data-object') {
        return element.key ?? '';
    }
    return '';
};
const getElementActionCacheKey = (elementType, action, id)=>{
    let cacheKey = `${elementType}_ACTION_${action}`;
    if (id !== undefined) {
        cacheKey += `_ID_${id}`;
    }
    return cacheKey.toUpperCase();
};
const convertDragAndDropInfoToElementReference = (info)=>{
    const elementData = info.data;
    const getSubType = (info)=>{
        if (info.type === 'data-object') {
            return info.data.classname ?? 'folder';
        }
        return info.data.type ?? undefined;
    };
    const published = 'published' in elementData ? elementData.published : null;
    return {
        id: elementData.id,
        type: info.type === 'data-object' ? 'object' : info.type,
        fullPath: String(elementData.fullPath),
        isPublished: (0,lodash__WEBPACK_IMPORTED_MODULE_0__.isBoolean)(published) ? published : null,
        subtype: getSubType(info)
    };
};

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
"./js/src/core/modules/element/export-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useExportCsvFolderMutation: () => (useExportCsvFolderMutation),
  useExportCsvMutation: () => (useExportCsvMutation),
  useExportDeleteCsvMutation: () => (useExportDeleteCsvMutation),
  useExportDeleteXlsxMutation: () => (useExportDeleteXlsxMutation),
  useExportDownloadCsvQuery: () => (useExportDownloadCsvQuery),
  useExportDownloadXlsxQuery: () => (useExportDownloadXlsxQuery),
  useExportXlsxFolderMutation: () => (useExportXlsxFolderMutation),
  useExportXlsxMutation: () => (useExportXlsxMutation)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Export"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            exportDownloadCsv: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/export/download/csv/${queryArg.jobRunId}`
                    }),
                providesTags: [
                    "Export"
                ]
            }),
            exportDeleteCsv: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/export/download/csv/${queryArg.jobRunId}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Export"
                ]
            }),
            exportCsv: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/export/csv`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Export"
                ]
            }),
            exportCsvFolder: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/export/csv/folder`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Export"
                ]
            }),
            exportDownloadXlsx: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/export/download/xlsx/${queryArg.jobRunId}`
                    }),
                providesTags: [
                    "Export"
                ]
            }),
            exportDeleteXlsx: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/export/download/xlsx/${queryArg.jobRunId}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Export"
                ]
            }),
            exportXlsx: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/export/xlsx`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Export"
                ]
            }),
            exportXlsxFolder: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/export/xlsx/folder`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Export"
                ]
            })
        }),
    overrideExisting: false
});

const { useExportDownloadCsvQuery, useExportDeleteCsvMutation, useExportCsvMutation, useExportCsvFolderMutation, useExportDownloadXlsxQuery, useExportDeleteXlsxMutation, useExportXlsxMutation, useExportXlsxFolderMutation } = injectedRtkApi;

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
"./js/src/core/modules/element/listing/abstract/configuration-layer/provider/selected-columns/selected-columns-provider.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SelectedColumnsContext: () => (SelectedColumnsContext),
  SelectedColumnsProvider: () => (SelectedColumnsProvider)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_utils_uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/utils/uuid.ts");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 
var _s = $RefreshSig$();


const SelectedColumnsContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_2__.createContext)({
    selectedColumns: [],
    setSelectedColumns: ()=>{},
    encodeColumnIdentifier: ()=>'',
    decodeColumnIdentifier: ()=>undefined
});
const SelectedColumnsProvider = (param)=>{
    let { children } = param;
    _s();
    const [selectedColumns, setSelectedColumns] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)([]);
    const encodeColumnIdentifier = (column)=>{
        return JSON.stringify({
            uuid: (0,_Pimcore_utils_uuid__WEBPACK_IMPORTED_MODULE_1__.uuid)(),
            key: column.key.replaceAll('.', '**'),
            locale: column.locale
        });
    };
    const decodeColumnIdentifier = (columnIdentifier)=>{
        try {
            JSON.parse(columnIdentifier);
        } catch (e) {
            return undefined;
        }
        const { key, locale } = JSON.parse(columnIdentifier);
        const formattedKey = key.replaceAll('**', '.');
        return selectedColumns.find((column)=>column.key === formattedKey && column.locale === locale);
    };
    return (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(SelectedColumnsContext.Provider, {
            value: {
                selectedColumns,
                setSelectedColumns,
                encodeColumnIdentifier,
                decodeColumnIdentifier
            },
            children: children
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/listing/abstract/configuration-layer/provider/selected-columns/selected-columns-provider.tsx",
            lineNumber: 72,
            columnNumber: 5
        }, undefined), [
        selectedColumns
    ]);
};
_s(SelectedColumnsProvider, "MMZk15tnGAeJ2XYddqUfTuyt/eA=");
_c = SelectedColumnsProvider;
var _c;
$RefreshReg$(_c, "SelectedColumnsProvider");

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
"./js/src/core/modules/element/permissions/permission-helper.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  checkElementPermission: () => (checkElementPermission)
});
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 
const checkElementPermission = (permissions, permission)=>{
    if ((0,lodash__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(permissions)) {
        return false;
    }
    return permissions[permission] === true;
};

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
"./js/src/core/modules/notifications/notification-detail.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  NotificationDetail: () => (NotificationDetail)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_utils_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/utils/helpers.tsx");
/* ESM import */var _Pimcore_components_space_space__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/space/space.tsx");
/* ESM import */var _Pimcore_utils_date_time__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/utils/date-time.ts");
/* ESM import */var _Pimcore_components_text_text__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/text/text.tsx");
/* ESM import */var _Pimcore_components_paragraph_paragraph__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/paragraph/paragraph.tsx");
/* ESM import */var _Pimcore_components_collapse_collapse__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/collapse/collapse.tsx");
/* ESM import */var _hooks_use_notification_detail__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/notifications/hooks/use-notification-detail.tsx");
/* ESM import */var _Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/components/content/content.tsx");
/* ESM import */var _Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/components/icon-button/icon-button.tsx");
/* ESM import */var _sdk_components__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("webpack/container/remote/@sdk/components");
/* ESM import */var _sdk_components__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_sdk_components__WEBPACK_IMPORTED_MODULE_11__);
/* ESM import */var _notifications_styles__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/notifications/notifications.styles.ts");
/* ESM import */var _notification_attachment__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/modules/notifications/notification-attachment.tsx");
/* ESM import */var _sdk_modules_element__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("webpack/container/remote/@sdk/modules/element");
/* ESM import */var _sdk_modules_element__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_sdk_modules_element__WEBPACK_IMPORTED_MODULE_14__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_15__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 
var _s = $RefreshSig$();















const NotificationDetail = (param)=>{
    let { notification } = param;
    _s();
    const { isExpanded, setIsExpanded, notificationDetail, detailLoading, deleteNotification, deleteLoading } = (0,_hooks_use_notification_detail__WEBPACK_IMPORTED_MODULE_8__.useNotificationDetail)({
        id: notification.id
    });
    const { mapToElementType } = (0,_sdk_modules_element__WEBPACK_IMPORTED_MODULE_14__.useElementHelper)();
    const elementType = (notificationDetail === null || notificationDetail === void 0 ? void 0 : notificationDetail.attachmentType) !== undefined ? mapToElementType(notificationDetail.attachmentType) : undefined;
    const { styles } = (0,_notifications_styles__WEBPACK_IMPORTED_MODULE_12__.useStyles)();
    const [notificationRead, setNotificationRead] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(notification.read);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (notificationDetail !== undefined) {
            setNotificationRead(notificationDetail === null || notificationDetail === void 0 ? void 0 : notificationDetail.read);
        }
    }, [
        notificationDetail
    ]);
    const extra = ()=>{
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_space_space__WEBPACK_IMPORTED_MODULE_3__.Space, {
            align: "center",
            "justify-content": "center",
            size: "extra-small",
            children: [
                notification.hasAttachment && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_11__.Icon, {
                    className: styles.margin,
                    value: 'attachment'
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/notifications/notification-detail.tsx",
                    lineNumber: 66,
                    columnNumber: 9
                }, undefined),
                notification.creationDate !== undefined && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                    children: (0,_Pimcore_utils_date_time__WEBPACK_IMPORTED_MODULE_4__.formatDateTime)({
                        timestamp: notification.creationDate,
                        dateStyle: 'short',
                        timeStyle: 'medium'
                    })
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/notifications/notification-detail.tsx",
                    lineNumber: 71,
                    columnNumber: 53
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_10__.IconButton, {
                    icon: {
                        value: 'trash'
                    },
                    loading: deleteLoading,
                    onClick: async (e)=>{
                        e.stopPropagation();
                        await deleteNotification();
                    },
                    theme: "primary"
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/notifications/notification-detail.tsx",
                    lineNumber: 72,
                    columnNumber: 9
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/notifications/notification-detail.tsx",
            lineNumber: 60,
            columnNumber: 7
        }, undefined);
    };
    const children = ()=>{
        var _notificationDetail_message;
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_9__.Content, {
            loading: detailLoading,
            none: notificationDetail === undefined || ((_notificationDetail_message = notificationDetail.message) === null || _notificationDetail_message === void 0 ? void 0 : _notificationDetail_message.length) === 0,
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_11__.Flex, {
                gap: 0,
                vertical: true,
                children: [
                    notificationDetail !== undefined && typeof notificationDetail.message === 'string' && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_paragraph_paragraph__WEBPACK_IMPORTED_MODULE_6__.Paragraph, {
                        children: (0,_Pimcore_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.respectLineBreak)(notificationDetail.message)
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/notifications/notification-detail.tsx",
                        lineNumber: 95,
                        columnNumber: 99
                    }, undefined),
                    !(0,lodash__WEBPACK_IMPORTED_MODULE_15__.isNil)(notificationDetail === null || notificationDetail === void 0 ? void 0 : notificationDetail.attachmentId) && elementType !== undefined && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_notification_attachment__WEBPACK_IMPORTED_MODULE_13__.NotificationAttachment, {
                        attachmentId: notificationDetail.attachmentId,
                        attachmentType: elementType
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/notifications/notification-detail.tsx",
                        lineNumber: 97,
                        columnNumber: 11
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/notifications/notification-detail.tsx",
                lineNumber: 91,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/notifications/notification-detail.tsx",
            lineNumber: 87,
            columnNumber: 7
        }, undefined);
    };
    const item = {
        key: notification.id.toString(),
        label: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_11__.Flex, {
            align: 'center',
            "justify-content": 'center',
            children: [
                notificationRead ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_11__.Icon, {
                    className: styles.margin,
                    value: 'notification-read'
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/notifications/notification-detail.tsx",
                    lineNumber: 121,
                    columnNumber: 9
                }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_11__.Icon, {
                    className: styles.unreadNotificationIcon,
                    value: 'notification-unread'
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/notifications/notification-detail.tsx",
                    lineNumber: 127,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_11__.Split, {
                    dividerSize: "small",
                    size: "extra-small",
                    theme: "secondary",
                    children: [
                        notification.title !== '' && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_text_text__WEBPACK_IMPORTED_MODULE_5__.Text, {
                            strong: true,
                            children: notification.title
                        }, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/notifications/notification-detail.tsx",
                            lineNumber: 138,
                            columnNumber: 38
                        }, undefined),
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_text_text__WEBPACK_IMPORTED_MODULE_5__.Text, {
                            type: "secondary",
                            children: notification.sender
                        }, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/notifications/notification-detail.tsx",
                            lineNumber: 139,
                            columnNumber: 7
                        }, undefined)
                    ]
                }, void 0, true, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/notifications/notification-detail.tsx",
                    lineNumber: 133,
                    columnNumber: 5
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/notifications/notification-detail.tsx",
            lineNumber: 115,
            columnNumber: 3
        }, undefined),
        extra: extra(),
        children: children()
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_collapse_collapse__WEBPACK_IMPORTED_MODULE_7__.Collapse, {
        activeKeys: isExpanded ? [
            notification.id.toString()
        ] : [],
        items: [
            item
        ],
        onChange: (expandedKeys)=>{
            if (expandedKeys.length > 0) {
                setIsExpanded(true);
            } else {
                setIsExpanded(false);
            }
        }
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/notifications/notification-detail.tsx",
        lineNumber: 147,
        columnNumber: 5
    }, undefined);
};
_s(NotificationDetail, "bFgpLn74vNlxEZfHWjsllKxv078=", false, function() {
    return [
        _hooks_use_notification_detail__WEBPACK_IMPORTED_MODULE_8__.useNotificationDetail,
        _sdk_modules_element__WEBPACK_IMPORTED_MODULE_14__.useElementHelper,
        _notifications_styles__WEBPACK_IMPORTED_MODULE_12__.useStyles
    ];
});
_c = NotificationDetail;
var _c;
$RefreshReg$(_c, "NotificationDetail");

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
"./js/src/core/modules/notifications/notifications-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useNotificationDeleteAllMutation: () => (useNotificationDeleteAllMutation),
  useNotificationDeleteByIdMutation: () => (useNotificationDeleteByIdMutation),
  useNotificationGetByIdQuery: () => (useNotificationGetByIdQuery),
  useNotificationGetCollectionQuery: () => (useNotificationGetCollectionQuery),
  useNotificationReadByIdMutation: () => (useNotificationReadByIdMutation),
  useNotificationSendMutation: () => (useNotificationSendMutation)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Notifications"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            notificationGetCollection: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/notifications`,
                        method: "POST",
                        body: queryArg.body
                    }),
                providesTags: [
                    "Notifications"
                ]
            }),
            notificationDeleteAll: build.mutation({
                query: ()=>({
                        url: `/pimcore-studio/api/notifications`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Notifications"
                ]
            }),
            notificationGetById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/notifications/${queryArg.id}`
                    }),
                providesTags: [
                    "Notifications"
                ]
            }),
            notificationReadById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/notifications/${queryArg.id}`,
                        method: "POST"
                    }),
                invalidatesTags: [
                    "Notifications"
                ]
            }),
            notificationDeleteById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/notifications/${queryArg.id}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Notifications"
                ]
            }),
            notificationSend: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/notifications/send`,
                        method: "POST",
                        body: queryArg.sendNotificationParameters
                    }),
                invalidatesTags: [
                    "Notifications"
                ]
            })
        }),
    overrideExisting: false
});

const { useNotificationGetCollectionQuery, useNotificationDeleteAllMutation, useNotificationGetByIdQuery, useNotificationReadByIdMutation, useNotificationDeleteByIdMutation, useNotificationSendMutation } = injectedRtkApi;

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
"./js/src/core/modules/perspectives/perspectives-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  usePerspectiveCreateMutation: () => (usePerspectiveCreateMutation),
  usePerspectiveDeleteMutation: () => (usePerspectiveDeleteMutation),
  usePerspectiveGetConfigByIdQuery: () => (usePerspectiveGetConfigByIdQuery),
  usePerspectiveGetConfigCollectionQuery: () => (usePerspectiveGetConfigCollectionQuery),
  usePerspectiveUpdateConfigByIdMutation: () => (usePerspectiveUpdateConfigByIdMutation),
  usePerspectiveWidgetCreateMutation: () => (usePerspectiveWidgetCreateMutation),
  usePerspectiveWidgetDeleteMutation: () => (usePerspectiveWidgetDeleteMutation),
  usePerspectiveWidgetGetConfigByIdQuery: () => (usePerspectiveWidgetGetConfigByIdQuery),
  usePerspectiveWidgetGetConfigCollectionQuery: () => (usePerspectiveWidgetGetConfigCollectionQuery),
  usePerspectiveWidgetGetTypeCollectionQuery: () => (usePerspectiveWidgetGetTypeCollectionQuery),
  usePerspectiveWidgetUpdateConfigByIdMutation: () => (usePerspectiveWidgetUpdateConfigByIdMutation)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Perspectives"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            perspectiveCreate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/perspectives/configuration`,
                        method: "POST",
                        body: queryArg.addPerspectiveConfig
                    }),
                invalidatesTags: [
                    "Perspectives"
                ]
            }),
            perspectiveGetConfigCollection: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/perspectives/configurations`
                    }),
                providesTags: [
                    "Perspectives"
                ]
            }),
            perspectiveGetConfigById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/perspectives/configuration/${queryArg.perspectiveId}`
                    }),
                providesTags: [
                    "Perspectives"
                ]
            }),
            perspectiveUpdateConfigById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/perspectives/configuration/${queryArg.perspectiveId}`,
                        method: "PUT",
                        body: queryArg.savePerspectiveConfig
                    }),
                invalidatesTags: [
                    "Perspectives"
                ]
            }),
            perspectiveDelete: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/perspectives/configuration/${queryArg.perspectiveId}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Perspectives"
                ]
            }),
            perspectiveWidgetCreate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/perspectives/widgets/${queryArg.widgetType}/configuration`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Perspectives"
                ]
            }),
            perspectiveWidgetGetConfigCollection: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/perspectives/widgets/configurations`
                    }),
                providesTags: [
                    "Perspectives"
                ]
            }),
            perspectiveWidgetGetConfigById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/perspectives/widgets/${queryArg.widgetType}/configuration/${queryArg.widgetId}`
                    }),
                providesTags: [
                    "Perspectives"
                ]
            }),
            perspectiveWidgetUpdateConfigById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/perspectives/widgets/${queryArg.widgetType}/configuration/${queryArg.widgetId}`,
                        method: "PUT",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Perspectives"
                ]
            }),
            perspectiveWidgetDelete: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/perspectives/widgets/${queryArg.widgetType}/configuration/${queryArg.widgetId}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Perspectives"
                ]
            }),
            perspectiveWidgetGetTypeCollection: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/perspectives/widgets/types`
                    }),
                providesTags: [
                    "Perspectives"
                ]
            })
        }),
    overrideExisting: false
});

const { usePerspectiveCreateMutation, usePerspectiveGetConfigCollectionQuery, usePerspectiveGetConfigByIdQuery, usePerspectiveUpdateConfigByIdMutation, usePerspectiveDeleteMutation, usePerspectiveWidgetCreateMutation, usePerspectiveWidgetGetConfigCollectionQuery, usePerspectiveWidgetGetConfigByIdQuery, usePerspectiveWidgetUpdateConfigByIdMutation, usePerspectiveWidgetDeleteMutation, usePerspectiveWidgetGetTypeCollectionQuery } = injectedRtkApi;

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
"./js/src/core/modules/search/search-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useAssetGetSearchConfigurationQuery: () => (useAssetGetSearchConfigurationQuery),
  useAssetGetSearchQuery: () => (useAssetGetSearchQuery),
  useDataObjectGetSearchConfigurationQuery: () => (useDataObjectGetSearchConfigurationQuery),
  useDataObjectGetSearchQuery: () => (useDataObjectGetSearchQuery),
  useSimpleSearchGetQuery: () => (useSimpleSearchGetQuery),
  useSimpleSearchPreviewGetQuery: () => (useSimpleSearchPreviewGetQuery)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Search"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
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
            dataObjectGetSearchConfiguration: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/search/configuration/data-objects`,
                        params: {
                            classId: queryArg.classId
                        }
                    }),
                providesTags: [
                    "Search"
                ]
            }),
            dataObjectGetSearch: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/search/data-objects`,
                        method: "POST",
                        body: queryArg.body,
                        params: {
                            classId: queryArg.classId
                        }
                    }),
                providesTags: [
                    "Search"
                ]
            }),
            simpleSearchPreviewGet: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/search/preview/${queryArg.elementType}/${queryArg.id}`
                    }),
                providesTags: [
                    "Search"
                ]
            }),
            simpleSearchGet: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/search`,
                        params: {
                            page: queryArg.page,
                            pageSize: queryArg.pageSize,
                            searchTerm: queryArg.searchTerm
                        }
                    }),
                providesTags: [
                    "Search"
                ]
            })
        }),
    overrideExisting: false
});

const { useAssetGetSearchConfigurationQuery, useAssetGetSearchQuery, useDataObjectGetSearchConfigurationQuery, useDataObjectGetSearchQuery, useSimpleSearchPreviewGetQuery, useSimpleSearchGetQuery } = injectedRtkApi;

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
"./js/src/core/modules/user/roles/roles-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useRoleCloneByIdMutation: () => (useRoleCloneByIdMutation),
  useRoleCreateMutation: () => (useRoleCreateMutation),
  useRoleDeleteByIdMutation: () => (useRoleDeleteByIdMutation),
  useRoleFolderCreateMutation: () => (useRoleFolderCreateMutation),
  useRoleFolderDeleteByIdMutation: () => (useRoleFolderDeleteByIdMutation),
  useRoleGetByIdQuery: () => (useRoleGetByIdQuery),
  useRoleGetCollectionQuery: () => (useRoleGetCollectionQuery),
  useRoleGetTreeQuery: () => (useRoleGetTreeQuery),
  useRoleUpdateByIdMutation: () => (useRoleUpdateByIdMutation)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Role Management"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            roleCloneById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/role/clone/${queryArg.id}`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Role Management"
                ]
            }),
            roleFolderCreate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/role/folder`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Role Management"
                ]
            }),
            roleCreate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/role`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Role Management"
                ]
            }),
            roleFolderDeleteById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/role/folder/${queryArg.id}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Role Management"
                ]
            }),
            roleGetById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/role/${queryArg.id}`
                    }),
                providesTags: [
                    "Role Management"
                ]
            }),
            roleUpdateById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/role/${queryArg.id}`,
                        method: "PUT",
                        body: queryArg.updateRole
                    }),
                invalidatesTags: [
                    "Role Management"
                ]
            }),
            roleDeleteById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/role/${queryArg.id}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Role Management"
                ]
            }),
            roleGetCollection: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/roles`
                    }),
                providesTags: [
                    "Role Management"
                ]
            }),
            roleGetTree: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/roles/tree`,
                        params: {
                            parentId: queryArg.parentId
                        }
                    }),
                providesTags: [
                    "Role Management"
                ]
            })
        }),
    overrideExisting: false
});

const { useRoleCloneByIdMutation, useRoleFolderCreateMutation, useRoleCreateMutation, useRoleFolderDeleteByIdMutation, useRoleGetByIdQuery, useRoleUpdateByIdMutation, useRoleDeleteByIdMutation, useRoleGetCollectionQuery, useRoleGetTreeQuery } = injectedRtkApi;

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
"./js/src/core/modules/user/user-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  usePimcoreStudioApiUserSearchQuery: () => (usePimcoreStudioApiUserSearchQuery),
  useUserCloneByIdMutation: () => (useUserCloneByIdMutation),
  useUserCreateMutation: () => (useUserCreateMutation),
  useUserDefaultKeyBindingsQuery: () => (useUserDefaultKeyBindingsQuery),
  useUserDeleteByIdMutation: () => (useUserDeleteByIdMutation),
  useUserFolderCreateMutation: () => (useUserFolderCreateMutation),
  useUserFolderDeleteByIdMutation: () => (useUserFolderDeleteByIdMutation),
  useUserGetAvailablePermissionsQuery: () => (useUserGetAvailablePermissionsQuery),
  useUserGetByIdQuery: () => (useUserGetByIdQuery),
  useUserGetCollectionQuery: () => (useUserGetCollectionQuery),
  useUserGetCurrentInformationQuery: () => (useUserGetCurrentInformationQuery),
  useUserGetImageQuery: () => (useUserGetImageQuery),
  useUserGetTreeQuery: () => (useUserGetTreeQuery),
  useUserResetPasswordMutation: () => (useUserResetPasswordMutation),
  useUserUpdateActivePerspectiveMutation: () => (useUserUpdateActivePerspectiveMutation),
  useUserUpdateByIdMutation: () => (useUserUpdateByIdMutation),
  useUserUpdatePasswordByIdMutation: () => (useUserUpdatePasswordByIdMutation),
  useUserUpdateProfileMutation: () => (useUserUpdateProfileMutation),
  useUserUploadImageMutation: () => (useUserUploadImageMutation)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "User Management"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            userCloneById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/clone/${queryArg.id}`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userCreate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userFolderCreate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/folder`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userGetCurrentInformation: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/user/current-user-information`
                    }),
                providesTags: [
                    "User Management"
                ]
            }),
            userGetById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/${queryArg.id}`
                    }),
                providesTags: [
                    "User Management"
                ]
            }),
            userUpdateById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/${queryArg.id}`,
                        method: "PUT",
                        body: queryArg.updateUser
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userDeleteById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/${queryArg.id}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userFolderDeleteById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/folder/${queryArg.id}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userDefaultKeyBindings: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/users/default-key-bindings`
                    }),
                providesTags: [
                    "User Management"
                ]
            }),
            userGetAvailablePermissions: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/user/available-permissions`
                    }),
                providesTags: [
                    "User Management"
                ]
            }),
            userGetCollection: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/users`
                    }),
                providesTags: [
                    "User Management"
                ]
            }),
            userResetPassword: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/reset-password`,
                        method: "POST",
                        body: queryArg.resetPassword
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            pimcoreStudioApiUserSearch: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/search`,
                        params: {
                            searchQuery: queryArg.searchQuery
                        }
                    }),
                providesTags: [
                    "User Management"
                ]
            }),
            userUpdateActivePerspective: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/active-perspective/${queryArg.perspectiveId}`,
                        method: "PUT"
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userUpdatePasswordById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/${queryArg.id}/password`,
                        method: "PUT",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userUpdateProfile: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/update-profile`,
                        method: "PUT",
                        body: queryArg.updateUserProfile
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userUploadImage: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/upload-image/${queryArg.id}`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userGetImage: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/image/${queryArg.id}`
                    }),
                providesTags: [
                    "User Management"
                ]
            }),
            userGetTree: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/users/tree`,
                        params: {
                            parentId: queryArg.parentId
                        }
                    }),
                providesTags: [
                    "User Management"
                ]
            })
        }),
    overrideExisting: false
});

const { useUserCloneByIdMutation, useUserCreateMutation, useUserFolderCreateMutation, useUserGetCurrentInformationQuery, useUserGetByIdQuery, useUserUpdateByIdMutation, useUserDeleteByIdMutation, useUserFolderDeleteByIdMutation, useUserDefaultKeyBindingsQuery, useUserGetAvailablePermissionsQuery, useUserGetCollectionQuery, useUserResetPasswordMutation, usePimcoreStudioApiUserSearchQuery, useUserUpdateActivePerspectiveMutation, useUserUpdatePasswordByIdMutation, useUserUpdateProfileMutation, useUserUploadImageMutation, useUserGetImageQuery, useUserGetTreeQuery } = injectedRtkApi;

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
"./js/src/core/modules/widget-manager/utils/widget-manager-outer-model.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  getInitialModelJson: () => (getInitialModelJson)
});
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _Pimcore_modules_perspectives_active_perspective_slice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/perspectives/active-perspective-slice.ts");
/* ESM import */var _Pimcore_utils_uuid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/utils/uuid.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _Pimcore_modules_auth_permission_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/auth/permission-helper.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 




const getInitialModelJson = ()=>{
    const activePerspective = (0,_Pimcore_modules_perspectives_active_perspective_slice__WEBPACK_IMPORTED_MODULE_1__.selectActivePerspective)(_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.store.getState());
    const usedIds = new Set();
    const widgetsLeft = getWidgetsLeft(activePerspective, usedIds);
    const widgetsRight = getWidgetsRight(activePerspective, usedIds);
    const widgetsBottom = getWidgetsBottom(activePerspective, usedIds);
    return {
        global: {
            tabEnableRename: false,
            tabSetEnableMaximize: false,
            rootOrientationVertical: true
        },
        layout: {
            id: 'main',
            type: 'row',
            children: [
                {
                    type: 'tabset',
                    id: 'main_tabset',
                    enableDeleteWhenEmpty: false,
                    weight: 50,
                    selected: 0,
                    children: [
                        {
                            type: 'tab',
                            component: 'inner-widget-manager',
                            contentClassName: 'widget-manager-inner-container',
                            enableClose: false
                        }
                    ],
                    enableDrag: false,
                    enableDrop: false,
                    enableTabStrip: false
                },
                {
                    type: 'tabset',
                    id: 'bottom_tabset',
                    enableDeleteWhenEmpty: false,
                    weight: 50,
                    minHeight: 0,
                    selected: 0,
                    children: widgetsBottom
                }
            ]
        },
        borders: [
            {
                type: 'border',
                location: 'left',
                size: 315,
                selected: getWidgetIndex(widgetsLeft, activePerspective === null || activePerspective === void 0 ? void 0 : activePerspective.expandedLeft),
                children: widgetsLeft
            },
            {
                type: 'border',
                location: 'right',
                size: 315,
                selected: getWidgetIndex(widgetsRight, activePerspective === null || activePerspective === void 0 ? void 0 : activePerspective.expandedRight),
                children: widgetsRight
            }
        ]
    };
};
const getWidgetsLeft = (activePerspective, usedIds)=>{
    if (activePerspective === null) {
        return [];
    }
    return widgetsToModelJson(activePerspective.widgetsLeft, usedIds);
};
const getWidgetsRight = (activePerspective, usedIds)=>{
    if (activePerspective === null) {
        return [];
    }
    return widgetsToModelJson(activePerspective.widgetsRight, usedIds);
};
const getWidgetsBottom = (activePerspective, usedIds)=>{
    if (activePerspective === null) {
        return [];
    }
    return widgetsToModelJson(activePerspective.widgetsBottom, usedIds);
};
const getWidgetIndex = (widgets, widgetId)=>{
    if ((0,lodash__WEBPACK_IMPORTED_MODULE_3__.isNil)(widgets) || (0,lodash__WEBPACK_IMPORTED_MODULE_3__.isNil)(widgetId)) {
        return undefined;
    }
    const widgetIndex = widgets.findIndex((widget)=>widget.id === widgetId);
    if (widgetIndex === -1) {
        return widgets.length > 0 ? 0 : undefined;
    }
    return widgetIndex;
};
const widgetsToModelJson = (widgets, usedIds)=>{
    const result = [];
    const hasDocumentPermission =  false ? 0 : (0,_Pimcore_modules_auth_permission_helper__WEBPACK_IMPORTED_MODULE_4__.isAllowed)('documents');
    const hasAssetPermission = (0,_Pimcore_modules_auth_permission_helper__WEBPACK_IMPORTED_MODULE_4__.isAllowed)('assets');
    const hasObjectPermission = (0,_Pimcore_modules_auth_permission_helper__WEBPACK_IMPORTED_MODULE_4__.isAllowed)('objects');
    widgets === null || widgets === void 0 ? void 0 : widgets.forEach((widget)=>{
        // skip document trees until we have a documents implementation
        if (widget.widgetType === 'element_tree' && 'elementType' in widget && widget.elementType === 'document' && !hasDocumentPermission) {
            return;
        }
        if (widget.widgetType === 'element_tree' && 'elementType' in widget && widget.elementType === 'asset' && !hasAssetPermission) {
            return;
        }
        if (widget.widgetType === 'element_tree' && 'elementType' in widget && widget.elementType === 'data-object' && !hasObjectPermission) {
            return;
        }
        let widgetId = widget.id;
        while(usedIds.has(widgetId)){
            widgetId = `${(0,_Pimcore_utils_uuid__WEBPACK_IMPORTED_MODULE_2__.uuid)()}_${widget.id}`;
        }
        usedIds.add(widgetId);
        result.push({
            id: widgetId,
            type: 'tab',
            name: widget.name,
            component: widget.widgetType,
            enableClose: false,
            config: {
                ...widget,
                id: widgetId
            }
        });
    });
    return result;
};

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

});
//# sourceMappingURL=js_src_core_mf-bootstrap_ts.15ad8f63702b7803.hot-update.js.map