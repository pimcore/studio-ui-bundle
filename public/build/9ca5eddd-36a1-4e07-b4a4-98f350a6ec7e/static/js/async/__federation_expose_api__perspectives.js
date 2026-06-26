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
(self["chunk_pimcore_studio_ui_bundle "] = self["chunk_pimcore_studio_ui_bundle "] || []).push([["__federation_expose_api__perspectives"], {
"./js/src/core/modules/perspectives/perspectives-slice.enhanced.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  api: () => (api),
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
/* import */ var _Pimcore_app_api_pimcore_tags__rspack_import_0 = __webpack_require__("./js/src/core/app/api/pimcore/tags.ts");
/* import */ var _perspectives_slice_gen__rspack_import_1 = __webpack_require__("./js/src/core/modules/perspectives/perspectives-slice.gen.ts");
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

const api = _perspectives_slice_gen__rspack_import_1.api.enhanceEndpoints({
    addTagTypes: [
        _Pimcore_app_api_pimcore_tags__rspack_import_0.tagNames.PERSPECTIVES,
        _Pimcore_app_api_pimcore_tags__rspack_import_0.tagNames.PERSPECTIVE_DETAIL,
        _Pimcore_app_api_pimcore_tags__rspack_import_0.tagNames.WIDGETS,
        _Pimcore_app_api_pimcore_tags__rspack_import_0.tagNames.WIDGET_DETAIL
    ],
    endpoints: {
        perspectiveGetConfigCollection: {
            providesTags: (result)=>{
                return _Pimcore_app_api_pimcore_tags__rspack_import_0.providingTags.PERSPECTIVES();
            }
        },
        perspectiveGetConfigById: {
            providesTags: (result, error, args)=>{
                return _Pimcore_app_api_pimcore_tags__rspack_import_0.providingTags.PERSPECTIVE_DETAIL(args.perspectiveId);
            }
        },
        perspectiveUpdateConfigById: {
            invalidatesTags: ()=>_Pimcore_app_api_pimcore_tags__rspack_import_0.invalidatingTags.PERSPECTIVES()
        },
        perspectiveDelete: {
            invalidatesTags: ()=>_Pimcore_app_api_pimcore_tags__rspack_import_0.invalidatingTags.PERSPECTIVES()
        },
        perspectiveCreate: {
            invalidatesTags: ()=>_Pimcore_app_api_pimcore_tags__rspack_import_0.invalidatingTags.PERSPECTIVES()
        },
        perspectiveWidgetGetConfigCollection: {
            providesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__rspack_import_0.providingTags.WIDGETS()
        },
        perspectiveWidgetGetConfigById: {
            providesTags: (result, error, args)=>{
                return _Pimcore_app_api_pimcore_tags__rspack_import_0.providingTags.WIDGET_DETAIL(args.widgetId, args.widgetType);
            }
        },
        perspectiveWidgetUpdateConfigById: {
            invalidatesTags: ()=>_Pimcore_app_api_pimcore_tags__rspack_import_0.invalidatingTags.WIDGETS()
        },
        perspectiveWidgetCreate: {
            invalidatesTags: ()=>_Pimcore_app_api_pimcore_tags__rspack_import_0.invalidatingTags.WIDGETS()
        },
        perspectiveWidgetDelete: {
            invalidatesTags: ()=>_Pimcore_app_api_pimcore_tags__rspack_import_0.invalidatingTags.WIDGETS()
        }
    }
});
const { usePerspectiveCreateMutation, usePerspectiveGetConfigCollectionQuery, usePerspectiveGetConfigByIdQuery, usePerspectiveUpdateConfigByIdMutation, usePerspectiveDeleteMutation, usePerspectiveWidgetCreateMutation, usePerspectiveWidgetGetConfigCollectionQuery, usePerspectiveWidgetGetConfigByIdQuery, usePerspectiveWidgetUpdateConfigByIdMutation, usePerspectiveWidgetDeleteMutation, usePerspectiveWidgetGetTypeCollectionQuery } = api;


function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/perspectives/perspectives-slice.gen.ts"(module, __webpack_exports__, __webpack_require__) {
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
/* import */ var _sdk_api__rspack_import_0 = __webpack_require__("./js/src/sdk/api/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Perspectives"
];
const injectedRtkApi = _sdk_api__rspack_import_0.api.enhanceEndpoints({
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
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/perspectives/widgets/configurations`,
                        params: {
                            skipWrapperWidgets: queryArg.skipWrapperWidgets
                        }
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

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/sdk/api/perspectives/index.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  api: () => (/* reexport safe */ _Pimcore_modules_perspectives_perspectives_slice_enhanced__rspack_import_0.api),
  usePerspectiveCreateMutation: () => (/* reexport safe */ _Pimcore_modules_perspectives_perspectives_slice_enhanced__rspack_import_0.usePerspectiveCreateMutation),
  usePerspectiveDeleteMutation: () => (/* reexport safe */ _Pimcore_modules_perspectives_perspectives_slice_enhanced__rspack_import_0.usePerspectiveDeleteMutation),
  usePerspectiveGetConfigByIdQuery: () => (/* reexport safe */ _Pimcore_modules_perspectives_perspectives_slice_enhanced__rspack_import_0.usePerspectiveGetConfigByIdQuery),
  usePerspectiveGetConfigCollectionQuery: () => (/* reexport safe */ _Pimcore_modules_perspectives_perspectives_slice_enhanced__rspack_import_0.usePerspectiveGetConfigCollectionQuery),
  usePerspectiveUpdateConfigByIdMutation: () => (/* reexport safe */ _Pimcore_modules_perspectives_perspectives_slice_enhanced__rspack_import_0.usePerspectiveUpdateConfigByIdMutation),
  usePerspectiveWidgetCreateMutation: () => (/* reexport safe */ _Pimcore_modules_perspectives_perspectives_slice_enhanced__rspack_import_0.usePerspectiveWidgetCreateMutation),
  usePerspectiveWidgetDeleteMutation: () => (/* reexport safe */ _Pimcore_modules_perspectives_perspectives_slice_enhanced__rspack_import_0.usePerspectiveWidgetDeleteMutation),
  usePerspectiveWidgetGetConfigByIdQuery: () => (/* reexport safe */ _Pimcore_modules_perspectives_perspectives_slice_enhanced__rspack_import_0.usePerspectiveWidgetGetConfigByIdQuery),
  usePerspectiveWidgetGetConfigCollectionQuery: () => (/* reexport safe */ _Pimcore_modules_perspectives_perspectives_slice_enhanced__rspack_import_0.usePerspectiveWidgetGetConfigCollectionQuery),
  usePerspectiveWidgetGetTypeCollectionQuery: () => (/* reexport safe */ _Pimcore_modules_perspectives_perspectives_slice_enhanced__rspack_import_0.usePerspectiveWidgetGetTypeCollectionQuery),
  usePerspectiveWidgetUpdateConfigByIdMutation: () => (/* reexport safe */ _Pimcore_modules_perspectives_perspectives_slice_enhanced__rspack_import_0.usePerspectiveWidgetUpdateConfigByIdMutation)
});
/* import */ var _Pimcore_modules_perspectives_perspectives_slice_enhanced__rspack_import_0 = __webpack_require__("./js/src/core/modules/perspectives/perspectives-slice.enhanced.ts");
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
//# sourceMappingURL=__federation_expose_api__perspectives.js.map