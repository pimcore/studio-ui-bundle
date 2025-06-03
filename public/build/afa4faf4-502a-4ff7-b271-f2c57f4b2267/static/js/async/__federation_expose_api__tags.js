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
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["__federation_expose_api__tags"], {
"./js/src/core/modules/element/editor/shared-tab-manager/tabs/tags/tags-api-slice-enhanced.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  api: () => (api),
  useTagAssignToElementMutation: () => (useTagAssignToElementMutation),
  useTagBatchOperationToElementsByTypeAndIdMutation: () => (useTagBatchOperationToElementsByTypeAndIdMutation),
  useTagCreateMutation: () => (useTagCreateMutation),
  useTagDeleteByIdMutation: () => (useTagDeleteByIdMutation),
  useTagGetCollectionForElementByTypeAndIdQuery: () => (useTagGetCollectionForElementByTypeAndIdQuery),
  useTagGetCollectionQuery: () => (useTagGetCollectionQuery),
  useTagUnassignFromElementMutation: () => (useTagUnassignFromElementMutation),
  useTagUpdateByIdMutation: () => (useTagUpdateByIdMutation)
});
/* ESM import */var _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/tags.ts");
/* ESM import */var _tags_api_slice_gen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/element/editor/shared-tab-manager/tabs/tags/tags-api-slice.gen.ts");
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

const api = _tags_api_slice_gen__WEBPACK_IMPORTED_MODULE_1__.api.enhanceEndpoints({
    addTagTypes: [
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.AVAILABLE_TAGS,
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.ASSET_DETAIL,
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.DATA_OBJECT_DETAIL
    ],
    endpoints: {
        tagUpdateById: {
            invalidatesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.AVAILABLE_TAGS()
        },
        tagDeleteById: {
            invalidatesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.AVAILABLE_TAGS()
        },
        tagCreate: {
            invalidatesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.AVAILABLE_TAGS()
        },
        tagGetById: {
            providesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.AVAILABLE_TAGS()
        },
        tagGetCollection: {
            providesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.AVAILABLE_TAGS()
        },
        tagAssignToElement: {
            invalidatesTags: (result, error, args)=>[]
        },
        tagUnassignFromElement: {
            invalidatesTags: (result, error, args)=>[]
        },
        tagBatchOperationToElementsByTypeAndId: {
            invalidatesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.ELEMENT_TAGS(args.elementType, args.id)
        },
        tagGetCollectionForElementByTypeAndId: {
            providesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.ELEMENT_TAGS(args.elementType, args.id).filter((tag)=>tag !== undefined)
        }
    }
});
const { useTagCreateMutation, useTagDeleteByIdMutation, useTagUpdateByIdMutation, useTagGetCollectionQuery, useTagAssignToElementMutation, useTagUnassignFromElementMutation, useTagGetCollectionForElementByTypeAndIdQuery, useTagBatchOperationToElementsByTypeAndIdMutation } = api;

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
/* ESM import */var _sdk_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/sdk/api/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Tags",
    "Tags for Element"
];
const injectedRtkApi = _sdk_api__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
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
"./js/src/sdk/api/tags/index.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  api: () => (/* reexport safe */ _Pimcore_modules_element_editor_shared_tab_manager_tabs_tags_tags_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.api),
  useTagAssignToElementMutation: () => (/* reexport safe */ _Pimcore_modules_element_editor_shared_tab_manager_tabs_tags_tags_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useTagAssignToElementMutation),
  useTagBatchOperationToElementsByTypeAndIdMutation: () => (/* reexport safe */ _Pimcore_modules_element_editor_shared_tab_manager_tabs_tags_tags_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useTagBatchOperationToElementsByTypeAndIdMutation),
  useTagCreateMutation: () => (/* reexport safe */ _Pimcore_modules_element_editor_shared_tab_manager_tabs_tags_tags_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useTagCreateMutation),
  useTagDeleteByIdMutation: () => (/* reexport safe */ _Pimcore_modules_element_editor_shared_tab_manager_tabs_tags_tags_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useTagDeleteByIdMutation),
  useTagGetCollectionForElementByTypeAndIdQuery: () => (/* reexport safe */ _Pimcore_modules_element_editor_shared_tab_manager_tabs_tags_tags_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useTagGetCollectionForElementByTypeAndIdQuery),
  useTagGetCollectionQuery: () => (/* reexport safe */ _Pimcore_modules_element_editor_shared_tab_manager_tabs_tags_tags_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useTagGetCollectionQuery),
  useTagUnassignFromElementMutation: () => (/* reexport safe */ _Pimcore_modules_element_editor_shared_tab_manager_tabs_tags_tags_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useTagUnassignFromElementMutation),
  useTagUpdateByIdMutation: () => (/* reexport safe */ _Pimcore_modules_element_editor_shared_tab_manager_tabs_tags_tags_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useTagUpdateByIdMutation)
});
/* ESM import */var _Pimcore_modules_element_editor_shared_tab_manager_tabs_tags_tags_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/element/editor/shared-tab-manager/tabs/tags/tags-api-slice-enhanced.ts");
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