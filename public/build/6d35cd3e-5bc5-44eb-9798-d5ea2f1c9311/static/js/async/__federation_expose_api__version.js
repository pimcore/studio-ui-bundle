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
(self["chunk_pimcore_studio_ui_bundle "] = self["chunk_pimcore_studio_ui_bundle "] || []).push([["__federation_expose_api__version"], {
"./js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/version-api-slice-enhanced.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  api: () => (api),
  useVersionAssetDownloadByIdQuery: () => (useVersionAssetDownloadByIdQuery),
  useVersionCleanupForElementByTypeAndIdMutation: () => (useVersionCleanupForElementByTypeAndIdMutation),
  useVersionDeleteByIdMutation: () => (useVersionDeleteByIdMutation),
  useVersionGetByIdQuery: () => (useVersionGetByIdQuery),
  useVersionGetCollectionForElementByTypeAndIdQuery: () => (useVersionGetCollectionForElementByTypeAndIdQuery),
  useVersionPublishByIdMutation: () => (useVersionPublishByIdMutation),
  useVersionUpdateByIdMutation: () => (useVersionUpdateByIdMutation)
});
/* import */ var _Pimcore_app_api_pimcore_tags__rspack_import_0 = __webpack_require__("./js/src/core/app/api/pimcore/tags.ts");
/* import */ var _version_api_slice_gen__rspack_import_1 = __webpack_require__("./js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/version-api-slice.gen.ts");
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

const api = _version_api_slice_gen__rspack_import_1.api.enhanceEndpoints({
    addTagTypes: [
        _Pimcore_app_api_pimcore_tags__rspack_import_0.tagNames.ASSET_DETAIL
    ],
    endpoints: {
        versionGetById: {
            providesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__rspack_import_0.providingTags.VERSIONS_DETAIL(args.id)
        },
        versionGetCollectionForElementByTypeAndId: {
            providesTags: (result, error, args)=>{
                const tagCollection = [];
                result === null || result === void 0 ? void 0 : result.items.forEach((version)=>{
                    tagCollection.push(..._Pimcore_app_api_pimcore_tags__rspack_import_0.providingTags.VERSIONS_DETAIL(version.id));
                });
                return [
                    ...tagCollection,
                    ..._Pimcore_app_api_pimcore_tags__rspack_import_0.providingTags.ELEMENT_VERSIONS(args.elementType, args.id)
                ];
            }
        },
        versionCleanupForElementByTypeAndId: {
            invalidatesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__rspack_import_0.invalidatingTags.ELEMENT_VERSIONS(args.elementType, args.id)
        },
        versionUpdateById: {
            invalidatesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__rspack_import_0.invalidatingTags.VERSIONS_DETAIL(args.id)
        },
        versionPublishById: {
            invalidatesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__rspack_import_0.invalidatingTags.VERSIONS_DETAIL(args.id)
        },
        versionDeleteById: {
            invalidatesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__rspack_import_0.invalidatingTags.VERSIONS_DETAIL(args.id)
        }
    }
});
const { useVersionAssetDownloadByIdQuery, useVersionCleanupForElementByTypeAndIdMutation, useVersionDeleteByIdMutation, useVersionGetByIdQuery, useVersionGetCollectionForElementByTypeAndIdQuery, useVersionPublishByIdMutation, useVersionUpdateByIdMutation } = api;

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/version-api-slice.gen.ts"(module, __webpack_exports__, __webpack_require__) {
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
/* import */ var _sdk_api__rspack_import_0 = __webpack_require__("./js/src/sdk/api/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Versions"
];
const injectedRtkApi = _sdk_api__rspack_import_0.api.enhanceEndpoints({
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

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/sdk/api/version/index.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  api: () => (/* reexport safe */ _Pimcore_modules_element_editor_shared_tab_manager_tabs_versions_version_api_slice_enhanced__rspack_import_0.api),
  useVersionAssetDownloadByIdQuery: () => (/* reexport safe */ _Pimcore_modules_element_editor_shared_tab_manager_tabs_versions_version_api_slice_enhanced__rspack_import_0.useVersionAssetDownloadByIdQuery),
  useVersionCleanupForElementByTypeAndIdMutation: () => (/* reexport safe */ _Pimcore_modules_element_editor_shared_tab_manager_tabs_versions_version_api_slice_enhanced__rspack_import_0.useVersionCleanupForElementByTypeAndIdMutation),
  useVersionDeleteByIdMutation: () => (/* reexport safe */ _Pimcore_modules_element_editor_shared_tab_manager_tabs_versions_version_api_slice_enhanced__rspack_import_0.useVersionDeleteByIdMutation),
  useVersionGetByIdQuery: () => (/* reexport safe */ _Pimcore_modules_element_editor_shared_tab_manager_tabs_versions_version_api_slice_enhanced__rspack_import_0.useVersionGetByIdQuery),
  useVersionGetCollectionForElementByTypeAndIdQuery: () => (/* reexport safe */ _Pimcore_modules_element_editor_shared_tab_manager_tabs_versions_version_api_slice_enhanced__rspack_import_0.useVersionGetCollectionForElementByTypeAndIdQuery),
  useVersionPublishByIdMutation: () => (/* reexport safe */ _Pimcore_modules_element_editor_shared_tab_manager_tabs_versions_version_api_slice_enhanced__rspack_import_0.useVersionPublishByIdMutation),
  useVersionUpdateByIdMutation: () => (/* reexport safe */ _Pimcore_modules_element_editor_shared_tab_manager_tabs_versions_version_api_slice_enhanced__rspack_import_0.useVersionUpdateByIdMutation)
});
/* import */ var _Pimcore_modules_element_editor_shared_tab_manager_tabs_versions_version_api_slice_enhanced__rspack_import_0 = __webpack_require__("./js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/version-api-slice-enhanced.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ if (true) {
    module.hot.accept();
}


function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},

}]);
//# sourceMappingURL=__federation_expose_api__version.js.map