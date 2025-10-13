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
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["__federation_expose_api__schedule"], {
"./js/src/core/modules/element/editor/shared-tab-manager/tabs/schedule/schedule-api-slice-enhanced.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  api: () => (api),
  useScheduleCreateForElementByTypeAndIdMutation: () => (useScheduleCreateForElementByTypeAndIdMutation),
  useScheduleDeleteByIdMutation: () => (useScheduleDeleteByIdMutation),
  useScheduleGetCollectionForElementByTypeAndIdQuery: () => (useScheduleGetCollectionForElementByTypeAndIdQuery),
  useScheduleUpdateForElementByTypeAndIdMutation: () => (useScheduleUpdateForElementByTypeAndIdMutation)
});
/* ESM import */var _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/tags.ts");
/* ESM import */var _schedule_api_slice_gen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/element/editor/shared-tab-manager/tabs/schedule/schedule-api-slice.gen.ts");
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

const api = _schedule_api_slice_gen__WEBPACK_IMPORTED_MODULE_1__.api.enhanceEndpoints({
    addTagTypes: [
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.ASSET_DETAIL,
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.DATA_OBJECT_DETAIL
    ],
    endpoints: {
        scheduleGetCollectionForElementByTypeAndId: {
            providesTags: (result, error, args)=>{
                var _result_items;
                const scheduleCollection = [];
                result === null || result === void 0 ? void 0 : (_result_items = result.items) === null || _result_items === void 0 ? void 0 : _result_items.forEach((schedule)=>{
                    scheduleCollection.push(..._Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.SCHEDULE_DETAIL(schedule.id));
                });
                return [
                    ...scheduleCollection,
                    ..._Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.ELEMENT_SCHEDULES(args.elementType, args.id)
                ];
            }
        },
        scheduleUpdateForElementByTypeAndId: {
            invalidatesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.ELEMENT_SCHEDULES(args.elementType, args.id)
        },
        scheduleCreateForElementByTypeAndId: {
            invalidatesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.ELEMENT_SCHEDULES(args.elementType, args.id)
        },
        scheduleDeleteById: {
            invalidatesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.SCHEDULE_DETAIL(args.id)
        }
    }
});
const { useScheduleDeleteByIdMutation, useScheduleGetCollectionForElementByTypeAndIdQuery, useScheduleUpdateForElementByTypeAndIdMutation, useScheduleCreateForElementByTypeAndIdMutation } = api;

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
/* ESM import */var _sdk_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/sdk/api/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Schedule"
];
const injectedRtkApi = _sdk_api__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
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
"./js/src/sdk/api/schedule/index.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  api: () => (/* reexport safe */ _Pimcore_modules_element_editor_shared_tab_manager_tabs_schedule_schedule_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.api),
  useScheduleCreateForElementByTypeAndIdMutation: () => (/* reexport safe */ _Pimcore_modules_element_editor_shared_tab_manager_tabs_schedule_schedule_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useScheduleCreateForElementByTypeAndIdMutation),
  useScheduleDeleteByIdMutation: () => (/* reexport safe */ _Pimcore_modules_element_editor_shared_tab_manager_tabs_schedule_schedule_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useScheduleDeleteByIdMutation),
  useScheduleGetCollectionForElementByTypeAndIdQuery: () => (/* reexport safe */ _Pimcore_modules_element_editor_shared_tab_manager_tabs_schedule_schedule_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useScheduleGetCollectionForElementByTypeAndIdQuery),
  useScheduleUpdateForElementByTypeAndIdMutation: () => (/* reexport safe */ _Pimcore_modules_element_editor_shared_tab_manager_tabs_schedule_schedule_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useScheduleUpdateForElementByTypeAndIdMutation)
});
/* ESM import */var _Pimcore_modules_element_editor_shared_tab_manager_tabs_schedule_schedule_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/element/editor/shared-tab-manager/tabs/schedule/schedule-api-slice-enhanced.ts");
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
//# sourceMappingURL=__federation_expose_api__schedule.js.map