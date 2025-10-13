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
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["__federation_expose_api__elements"], {
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
/* ESM import */var _sdk_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/sdk/api/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Elements"
];
const injectedRtkApi = _sdk_api__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
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
"./js/src/sdk/api/elements/index.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useElementDeleteMutation: () => (/* reexport safe */ _Pimcore_modules_element_element_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useElementDeleteMutation),
  useElementFolderCreateMutation: () => (/* reexport safe */ _Pimcore_modules_element_element_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useElementFolderCreateMutation),
  useElementGetContextPermissionsQuery: () => (/* reexport safe */ _Pimcore_modules_element_element_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useElementGetContextPermissionsQuery),
  useElementGetDeleteInfoQuery: () => (/* reexport safe */ _Pimcore_modules_element_element_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useElementGetDeleteInfoQuery),
  useElementGetIdByPathQuery: () => (/* reexport safe */ _Pimcore_modules_element_element_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useElementGetIdByPathQuery),
  useElementGetSubtypeQuery: () => (/* reexport safe */ _Pimcore_modules_element_element_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useElementGetSubtypeQuery),
  useElementResolveBySearchTermQuery: () => (/* reexport safe */ _Pimcore_modules_element_element_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useElementResolveBySearchTermQuery),
  useLazyElementResolveBySearchTermQuery: () => (/* reexport safe */ _Pimcore_modules_element_element_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useLazyElementResolveBySearchTermQuery)
});
/* ESM import */var _Pimcore_modules_element_element_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/element/element-api-slice-enhanced.ts");
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
//# sourceMappingURL=__federation_expose_api__elements.js.map