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
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["__federation_expose_api__workflow"], {
"./js/src/core/modules/element/editor/shared-tab-manager/tabs/workflow/workflow-api-slice-enhanced.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useWorkflowActionSubmitMutation: () => (useWorkflowActionSubmitMutation),
  useWorkflowGetDetailsQuery: () => (useWorkflowGetDetailsQuery)
});
/* ESM import */var _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/tags.ts");
/* ESM import */var _workflow_api_slice_gen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/element/editor/shared-tab-manager/tabs/workflow/workflow-api-slice.gen.ts");
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

const api = _workflow_api_slice_gen__WEBPACK_IMPORTED_MODULE_1__.api.enhanceEndpoints({
    addTagTypes: [
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.ASSET_DETAIL,
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.DATA_OBJECT_DETAIL,
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.WORKFLOW
    ],
    endpoints: {
        workflowGetDetails: {
            providesTags: (result, error, args)=>{
                const tags = _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.ELEMENT_WORKFLOW(args.elementType, args.elementId);
                return tags.filter((tag)=>tag !== undefined);
            }
        },
        workflowActionSubmit: {
            invalidatesTags: (result, error, args)=>{
                const tags = _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.ELEMENT_WORKFLOW(args.submitAction.elementType, args.submitAction.elementId);
                return tags.filter((tag)=>tag !== undefined);
            }
        }
    }
});
const { useWorkflowActionSubmitMutation, useWorkflowGetDetailsQuery } = api;

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
/* ESM import */var _sdk_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/sdk/api/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Workflows"
];
const injectedRtkApi = _sdk_api__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
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
"./js/src/sdk/api/workflow/index.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useWorkflowActionSubmitMutation: () => (/* reexport safe */ _Pimcore_modules_element_editor_shared_tab_manager_tabs_workflow_workflow_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useWorkflowActionSubmitMutation),
  useWorkflowGetDetailsQuery: () => (/* reexport safe */ _Pimcore_modules_element_editor_shared_tab_manager_tabs_workflow_workflow_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useWorkflowGetDetailsQuery)
});
/* ESM import */var _Pimcore_modules_element_editor_shared_tab_manager_tabs_workflow_workflow_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/element/editor/shared-tab-manager/tabs/workflow/workflow-api-slice-enhanced.ts");
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