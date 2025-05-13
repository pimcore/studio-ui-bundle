"use strict";
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["__federation_expose_api__perspectives"], {
"./js/src/core/app/api/pimcore/index.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  api: () => (api)
});
/* ESM import */var _reduxjs_toolkit_query_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@reduxjs/toolkit/dist/query/react/rtk-query-react.modern.mjs");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
const baseQuery = (0,_reduxjs_toolkit_query_react__WEBPACK_IMPORTED_MODULE_0__.fetchBaseQuery)({
    baseUrl: '/'
});
const api = (0,_reduxjs_toolkit_query_react__WEBPACK_IMPORTED_MODULE_0__.createApi)({
    baseQuery,
    endpoints: ()=>({})
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
"./js/src/sdk/api/perspectives/index.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (/* reexport safe */ _Pimcore_modules_perspectives_perspectives_slice_gen__WEBPACK_IMPORTED_MODULE_0__.addTagTypes),
  api: () => (/* reexport safe */ _Pimcore_modules_perspectives_perspectives_slice_gen__WEBPACK_IMPORTED_MODULE_0__.api),
  usePerspectiveCreateMutation: () => (/* reexport safe */ _Pimcore_modules_perspectives_perspectives_slice_gen__WEBPACK_IMPORTED_MODULE_0__.usePerspectiveCreateMutation),
  usePerspectiveDeleteMutation: () => (/* reexport safe */ _Pimcore_modules_perspectives_perspectives_slice_gen__WEBPACK_IMPORTED_MODULE_0__.usePerspectiveDeleteMutation),
  usePerspectiveGetConfigByIdQuery: () => (/* reexport safe */ _Pimcore_modules_perspectives_perspectives_slice_gen__WEBPACK_IMPORTED_MODULE_0__.usePerspectiveGetConfigByIdQuery),
  usePerspectiveGetConfigCollectionQuery: () => (/* reexport safe */ _Pimcore_modules_perspectives_perspectives_slice_gen__WEBPACK_IMPORTED_MODULE_0__.usePerspectiveGetConfigCollectionQuery),
  usePerspectiveUpdateConfigByIdMutation: () => (/* reexport safe */ _Pimcore_modules_perspectives_perspectives_slice_gen__WEBPACK_IMPORTED_MODULE_0__.usePerspectiveUpdateConfigByIdMutation),
  usePerspectiveWidgetCreateMutation: () => (/* reexport safe */ _Pimcore_modules_perspectives_perspectives_slice_gen__WEBPACK_IMPORTED_MODULE_0__.usePerspectiveWidgetCreateMutation),
  usePerspectiveWidgetDeleteMutation: () => (/* reexport safe */ _Pimcore_modules_perspectives_perspectives_slice_gen__WEBPACK_IMPORTED_MODULE_0__.usePerspectiveWidgetDeleteMutation),
  usePerspectiveWidgetGetConfigByIdQuery: () => (/* reexport safe */ _Pimcore_modules_perspectives_perspectives_slice_gen__WEBPACK_IMPORTED_MODULE_0__.usePerspectiveWidgetGetConfigByIdQuery),
  usePerspectiveWidgetGetConfigCollectionQuery: () => (/* reexport safe */ _Pimcore_modules_perspectives_perspectives_slice_gen__WEBPACK_IMPORTED_MODULE_0__.usePerspectiveWidgetGetConfigCollectionQuery),
  usePerspectiveWidgetGetTypeCollectionQuery: () => (/* reexport safe */ _Pimcore_modules_perspectives_perspectives_slice_gen__WEBPACK_IMPORTED_MODULE_0__.usePerspectiveWidgetGetTypeCollectionQuery),
  usePerspectiveWidgetUpdateConfigByIdMutation: () => (/* reexport safe */ _Pimcore_modules_perspectives_perspectives_slice_gen__WEBPACK_IMPORTED_MODULE_0__.usePerspectiveWidgetUpdateConfigByIdMutation)
});
/* ESM import */var _Pimcore_modules_perspectives_perspectives_slice_gen__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/perspectives/perspectives-slice.gen.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
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
//# sourceMappingURL=__federation_expose_api__perspectives.js.map