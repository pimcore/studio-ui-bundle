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
(self["chunk_pimcore_studio_ui_bundle "] = self["chunk_pimcore_studio_ui_bundle "] || []).push([["__federation_expose_api__elements"], {
"./js/src/core/modules/element/element-api-slice-enhanced.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useElementDeleteMutation: () => (useElementDeleteMutation),
  useElementFolderCreateMutation: () => (useElementFolderCreateMutation),
  useElementGetContextPermissionsQuery: () => (useElementGetContextPermissionsQuery),
  useElementGetDeleteInfoQuery: () => (useElementGetDeleteInfoQuery),
  useElementGetIdByPathQuery: () => (useElementGetIdByPathQuery),
  useElementGetSubtypeQuery: () => (useElementGetSubtypeQuery),
  useElementResolveBySearchTermQuery: () => (useElementResolveBySearchTermQuery),
  useLazyElementGetIdByPathQuery: () => (useLazyElementGetIdByPathQuery),
  useLazyElementResolveBySearchTermQuery: () => (useLazyElementResolveBySearchTermQuery)
});
/* import */ var _Pimcore_modules_element_element_api_slice_gen__rspack_import_0 = __webpack_require__("./js/src/core/modules/element/element-api-slice.gen.ts");
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

const api = _Pimcore_modules_element_element_api_slice_gen__rspack_import_0.api.enhanceEndpoints({
    addTagTypes: [
        _Pimcore_app_api_pimcore_tags__rspack_import_1.tagNames.DATA_OBJECT_DETAIL,
        _Pimcore_app_api_pimcore_tags__rspack_import_1.tagNames.ASSET_DETAIL
    ],
    endpoints: {
        elementDelete: {
            invalidatesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__rspack_import_1.invalidatingTags.ELEMENT_DETAIL(args.elementType, args.id)
        }
    }
});
const { useElementDeleteMutation, useElementGetDeleteInfoQuery, useElementFolderCreateMutation, useElementGetContextPermissionsQuery, useElementGetIdByPathQuery, useLazyElementGetIdByPathQuery, useElementGetSubtypeQuery, useElementResolveBySearchTermQuery, useLazyElementResolveBySearchTermQuery } = api;

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/element/element-api-slice.gen.ts"(module, __webpack_exports__, __webpack_require__) {
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
  useElementGetUsageQuery: () => (useElementGetUsageQuery),
  useElementResolveBySearchTermQuery: () => (useElementResolveBySearchTermQuery),
  useElementUsageReplaceMutation: () => (useElementUsageReplaceMutation)
});
/* import */ var _sdk_api__rspack_import_0 = __webpack_require__("./js/src/sdk/api/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Elements"
];
const injectedRtkApi = _sdk_api__rspack_import_0.api.enhanceEndpoints({
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
            elementGetUsage: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/elements/usage/${queryArg.elementType}/${queryArg.id}`,
                        params: {
                            page: queryArg.page,
                            pageSize: queryArg.pageSize,
                            sortOrder: queryArg.sortOrder,
                            sortBy: queryArg.sortBy
                        }
                    }),
                providesTags: [
                    "Elements"
                ]
            }),
            elementUsageReplace: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/elements/usage/replace/${queryArg.elementType}/${queryArg.id}`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
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

const { useElementDeleteMutation, useElementGetDeleteInfoQuery, useElementFolderCreateMutation, useElementGetContextPermissionsQuery, useElementGetTreeLocationQuery, useElementGetIdByPathQuery, useElementGetSubtypeQuery, useElementGetUsageQuery, useElementUsageReplaceMutation, useElementResolveBySearchTermQuery } = injectedRtkApi;

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/sdk/api/elements/index.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useElementDeleteMutation: () => (/* reexport safe */ _Pimcore_modules_element_element_api_slice_enhanced__rspack_import_0.useElementDeleteMutation),
  useElementFolderCreateMutation: () => (/* reexport safe */ _Pimcore_modules_element_element_api_slice_enhanced__rspack_import_0.useElementFolderCreateMutation),
  useElementGetContextPermissionsQuery: () => (/* reexport safe */ _Pimcore_modules_element_element_api_slice_enhanced__rspack_import_0.useElementGetContextPermissionsQuery),
  useElementGetDeleteInfoQuery: () => (/* reexport safe */ _Pimcore_modules_element_element_api_slice_enhanced__rspack_import_0.useElementGetDeleteInfoQuery),
  useElementGetIdByPathQuery: () => (/* reexport safe */ _Pimcore_modules_element_element_api_slice_enhanced__rspack_import_0.useElementGetIdByPathQuery),
  useElementGetSubtypeQuery: () => (/* reexport safe */ _Pimcore_modules_element_element_api_slice_enhanced__rspack_import_0.useElementGetSubtypeQuery),
  useElementResolveBySearchTermQuery: () => (/* reexport safe */ _Pimcore_modules_element_element_api_slice_enhanced__rspack_import_0.useElementResolveBySearchTermQuery),
  useLazyElementGetIdByPathQuery: () => (/* reexport safe */ _Pimcore_modules_element_element_api_slice_enhanced__rspack_import_0.useLazyElementGetIdByPathQuery),
  useLazyElementResolveBySearchTermQuery: () => (/* reexport safe */ _Pimcore_modules_element_element_api_slice_enhanced__rspack_import_0.useLazyElementResolveBySearchTermQuery)
});
/* import */ var _Pimcore_modules_element_element_api_slice_enhanced__rspack_import_0 = __webpack_require__("./js/src/core/modules/element/element-api-slice-enhanced.ts");
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
//# sourceMappingURL=__federation_expose_api__elements.js.map