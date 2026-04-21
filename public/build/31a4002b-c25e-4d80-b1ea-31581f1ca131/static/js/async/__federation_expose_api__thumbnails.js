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
(self["chunk_pimcore_studio_ui_bundle "] = self["chunk_pimcore_studio_ui_bundle "] || []).push([["__federation_expose_api__thumbnails"], {
"./js/src/core/modules/asset/editor/types/asset-thumbnails-api-slice.gen.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useThumbnailImageCreateMutation: () => (useThumbnailImageCreateMutation),
  useThumbnailImageDeleteMutation: () => (useThumbnailImageDeleteMutation),
  useThumbnailImageGetByNameQuery: () => (useThumbnailImageGetByNameQuery),
  useThumbnailImageGetCollectionQuery: () => (useThumbnailImageGetCollectionQuery),
  useThumbnailImageGetTreeQuery: () => (useThumbnailImageGetTreeQuery),
  useThumbnailImageUpdateMutation: () => (useThumbnailImageUpdateMutation),
  useThumbnailVideoCreateMutation: () => (useThumbnailVideoCreateMutation),
  useThumbnailVideoDeleteMutation: () => (useThumbnailVideoDeleteMutation),
  useThumbnailVideoGetByNameQuery: () => (useThumbnailVideoGetByNameQuery),
  useThumbnailVideoGetCollectionQuery: () => (useThumbnailVideoGetCollectionQuery),
  useThumbnailVideoGetTreeQuery: () => (useThumbnailVideoGetTreeQuery),
  useThumbnailVideoUpdateMutation: () => (useThumbnailVideoUpdateMutation)
});
/* import */ var _sdk_api__rspack_import_0 = __webpack_require__("./js/src/sdk/api/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Asset Thumbnails"
];
const injectedRtkApi = _sdk_api__rspack_import_0.api.enhanceEndpoints({
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
            thumbnailImageCreate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/thumbnails/image/config`,
                        method: "POST",
                        body: queryArg.createThumbnailConfig
                    }),
                invalidatesTags: [
                    "Asset Thumbnails"
                ]
            }),
            thumbnailImageGetByName: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/thumbnails/image/config/${queryArg.name}`
                    }),
                providesTags: [
                    "Asset Thumbnails"
                ]
            }),
            thumbnailImageUpdate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/thumbnails/image/config/${queryArg.name}`,
                        method: "PUT",
                        body: queryArg.updateThumbnailConfig
                    }),
                invalidatesTags: [
                    "Asset Thumbnails"
                ]
            }),
            thumbnailImageDelete: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/thumbnails/image/config/${queryArg.name}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Asset Thumbnails"
                ]
            }),
            thumbnailImageGetTree: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/thumbnails/image/tree`
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
            }),
            thumbnailVideoCreate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/thumbnails/video/config`,
                        method: "POST",
                        body: queryArg.createThumbnailConfig
                    }),
                invalidatesTags: [
                    "Asset Thumbnails"
                ]
            }),
            thumbnailVideoGetByName: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/thumbnails/video/config/${queryArg.name}`
                    }),
                providesTags: [
                    "Asset Thumbnails"
                ]
            }),
            thumbnailVideoUpdate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/thumbnails/video/config/${queryArg.name}`,
                        method: "PUT",
                        body: queryArg.updateThumbnailConfig
                    }),
                invalidatesTags: [
                    "Asset Thumbnails"
                ]
            }),
            thumbnailVideoDelete: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/thumbnails/video/config/${queryArg.name}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Asset Thumbnails"
                ]
            }),
            thumbnailVideoGetTree: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/thumbnails/video/tree`
                    }),
                providesTags: [
                    "Asset Thumbnails"
                ]
            })
        }),
    overrideExisting: false
});

const { useThumbnailImageGetCollectionQuery, useThumbnailImageCreateMutation, useThumbnailImageGetByNameQuery, useThumbnailImageUpdateMutation, useThumbnailImageDeleteMutation, useThumbnailImageGetTreeQuery, useThumbnailVideoGetCollectionQuery, useThumbnailVideoCreateMutation, useThumbnailVideoGetByNameQuery, useThumbnailVideoUpdateMutation, useThumbnailVideoDeleteMutation, useThumbnailVideoGetTreeQuery } = injectedRtkApi;

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/sdk/api/thumbnails/index.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (/* reexport safe */ _Pimcore_modules_asset_editor_types_asset_thumbnails_api_slice_gen__rspack_import_0.addTagTypes),
  api: () => (/* reexport safe */ _Pimcore_modules_asset_editor_types_asset_thumbnails_api_slice_gen__rspack_import_0.api),
  useThumbnailImageCreateMutation: () => (/* reexport safe */ _Pimcore_modules_asset_editor_types_asset_thumbnails_api_slice_gen__rspack_import_0.useThumbnailImageCreateMutation),
  useThumbnailImageDeleteMutation: () => (/* reexport safe */ _Pimcore_modules_asset_editor_types_asset_thumbnails_api_slice_gen__rspack_import_0.useThumbnailImageDeleteMutation),
  useThumbnailImageGetByNameQuery: () => (/* reexport safe */ _Pimcore_modules_asset_editor_types_asset_thumbnails_api_slice_gen__rspack_import_0.useThumbnailImageGetByNameQuery),
  useThumbnailImageGetCollectionQuery: () => (/* reexport safe */ _Pimcore_modules_asset_editor_types_asset_thumbnails_api_slice_gen__rspack_import_0.useThumbnailImageGetCollectionQuery),
  useThumbnailImageGetTreeQuery: () => (/* reexport safe */ _Pimcore_modules_asset_editor_types_asset_thumbnails_api_slice_gen__rspack_import_0.useThumbnailImageGetTreeQuery),
  useThumbnailImageUpdateMutation: () => (/* reexport safe */ _Pimcore_modules_asset_editor_types_asset_thumbnails_api_slice_gen__rspack_import_0.useThumbnailImageUpdateMutation),
  useThumbnailVideoCreateMutation: () => (/* reexport safe */ _Pimcore_modules_asset_editor_types_asset_thumbnails_api_slice_gen__rspack_import_0.useThumbnailVideoCreateMutation),
  useThumbnailVideoDeleteMutation: () => (/* reexport safe */ _Pimcore_modules_asset_editor_types_asset_thumbnails_api_slice_gen__rspack_import_0.useThumbnailVideoDeleteMutation),
  useThumbnailVideoGetByNameQuery: () => (/* reexport safe */ _Pimcore_modules_asset_editor_types_asset_thumbnails_api_slice_gen__rspack_import_0.useThumbnailVideoGetByNameQuery),
  useThumbnailVideoGetCollectionQuery: () => (/* reexport safe */ _Pimcore_modules_asset_editor_types_asset_thumbnails_api_slice_gen__rspack_import_0.useThumbnailVideoGetCollectionQuery),
  useThumbnailVideoGetTreeQuery: () => (/* reexport safe */ _Pimcore_modules_asset_editor_types_asset_thumbnails_api_slice_gen__rspack_import_0.useThumbnailVideoGetTreeQuery),
  useThumbnailVideoUpdateMutation: () => (/* reexport safe */ _Pimcore_modules_asset_editor_types_asset_thumbnails_api_slice_gen__rspack_import_0.useThumbnailVideoUpdateMutation)
});
/* import */ var _Pimcore_modules_asset_editor_types_asset_thumbnails_api_slice_gen__rspack_import_0 = __webpack_require__("./js/src/core/modules/asset/editor/types/asset-thumbnails-api-slice.gen.ts");
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
//# sourceMappingURL=__federation_expose_api__thumbnails.js.map