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
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["__federation_expose_api__thumbnails"], {
"./js/src/core/modules/asset/editor/types/asset-thumbnails-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useThumbnailImageGetCollectionQuery: () => (useThumbnailImageGetCollectionQuery),
  useThumbnailVideoGetCollectionQuery: () => (useThumbnailVideoGetCollectionQuery)
});
/* ESM import */var _sdk_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/sdk/api/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Asset Thumbnails"
];
const injectedRtkApi = _sdk_api__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            thumbnailImageGetCollection: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/thumbnails/image`
                    }),
                providesTags: [
                    "Asset Thumbnails"
                ]
            }),
            thumbnailVideoGetCollection: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/thumbnails/video`
                    }),
                providesTags: [
                    "Asset Thumbnails"
                ]
            })
        }),
    overrideExisting: false
});

const { useThumbnailImageGetCollectionQuery, useThumbnailVideoGetCollectionQuery } = injectedRtkApi;

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
"./js/src/sdk/api/thumbnails/index.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (/* reexport safe */ _Pimcore_modules_asset_editor_types_asset_thumbnails_api_slice_gen__WEBPACK_IMPORTED_MODULE_0__.addTagTypes),
  api: () => (/* reexport safe */ _Pimcore_modules_asset_editor_types_asset_thumbnails_api_slice_gen__WEBPACK_IMPORTED_MODULE_0__.api),
  useThumbnailImageGetCollectionQuery: () => (/* reexport safe */ _Pimcore_modules_asset_editor_types_asset_thumbnails_api_slice_gen__WEBPACK_IMPORTED_MODULE_0__.useThumbnailImageGetCollectionQuery),
  useThumbnailVideoGetCollectionQuery: () => (/* reexport safe */ _Pimcore_modules_asset_editor_types_asset_thumbnails_api_slice_gen__WEBPACK_IMPORTED_MODULE_0__.useThumbnailVideoGetCollectionQuery)
});
/* ESM import */var _Pimcore_modules_asset_editor_types_asset_thumbnails_api_slice_gen__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/asset/editor/types/asset-thumbnails-api-slice.gen.ts");
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