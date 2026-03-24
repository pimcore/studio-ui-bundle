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
(self["chunk_pimcore_studio_ui_bundle "] = self["chunk_pimcore_studio_ui_bundle "] || []).push([["__federation_expose_api__metadata"], {
"./js/src/core/modules/asset/editor/shared-tab-manager/tabs/custom-metadata/metadata-api-slice-enhanced.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useAssetCustomMetadataGetByIdQuery: () => (useAssetCustomMetadataGetByIdQuery),
  useLazyMetadataGetCollectionQuery: () => (useLazyMetadataGetCollectionQuery),
  useMetadataGetCollectionQuery: () => (useMetadataGetCollectionQuery)
});
/* import */ var _metadata_api_slice_gen__rspack_import_0 = __webpack_require__("./js/src/core/modules/asset/editor/shared-tab-manager/tabs/custom-metadata/metadata-api-slice.gen.ts");
/* import */ var _Pimcore_app_api_pimcore_tags__rspack_import_1 = __webpack_require__("./js/src/core/app/api/pimcore/tags.ts");
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

const api = _metadata_api_slice_gen__rspack_import_0.api.enhanceEndpoints({
    addTagTypes: [
        _Pimcore_app_api_pimcore_tags__rspack_import_1.tagNames.PREDEFINED_ASSET_METADATA
    ],
    endpoints: {
        metadataGetCollection: {
            providesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__rspack_import_1.providingTags.PREDEFINED_ASSET_METADATA()
        }
    }
});
const { useAssetCustomMetadataGetByIdQuery, useMetadataGetCollectionQuery, useLazyMetadataGetCollectionQuery } = api;

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/asset/editor/shared-tab-manager/tabs/custom-metadata/metadata-api-slice.gen.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useAssetCustomMetadataGetByIdQuery: () => (useAssetCustomMetadataGetByIdQuery),
  useMetadataGetCollectionQuery: () => (useMetadataGetCollectionQuery)
});
/* import */ var _sdk_api__rspack_import_0 = __webpack_require__("./js/src/sdk/api/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Metadata"
];
const injectedRtkApi = _sdk_api__rspack_import_0.api.enhanceEndpoints({
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

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/sdk/api/metadata/index.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useAssetCustomMetadataGetByIdQuery: () => (/* reexport safe */ _Pimcore_modules_asset_editor_shared_tab_manager_tabs_custom_metadata_metadata_api_slice_enhanced__rspack_import_0.useAssetCustomMetadataGetByIdQuery),
  useLazyMetadataGetCollectionQuery: () => (/* reexport safe */ _Pimcore_modules_asset_editor_shared_tab_manager_tabs_custom_metadata_metadata_api_slice_enhanced__rspack_import_0.useLazyMetadataGetCollectionQuery),
  useMetadataGetCollectionQuery: () => (/* reexport safe */ _Pimcore_modules_asset_editor_shared_tab_manager_tabs_custom_metadata_metadata_api_slice_enhanced__rspack_import_0.useMetadataGetCollectionQuery)
});
/* import */ var _Pimcore_modules_asset_editor_shared_tab_manager_tabs_custom_metadata_metadata_api_slice_enhanced__rspack_import_0 = __webpack_require__("./js/src/core/modules/asset/editor/shared-tab-manager/tabs/custom-metadata/metadata-api-slice-enhanced.ts");
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
//# sourceMappingURL=__federation_expose_api__metadata.js.map