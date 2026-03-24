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
(self["chunk_pimcore_studio_ui_bundle "] = self["chunk_pimcore_studio_ui_bundle "] || []).push([["__federation_expose_api__properties"], {
"./js/src/core/modules/element/editor/shared-tab-manager/tabs/properties/properties-api-slice-enhanced.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  api: () => (api),
  usePropertyDeleteMutation: () => (usePropertyDeleteMutation),
  usePropertyGetCollectionForElementByTypeAndIdQuery: () => (usePropertyGetCollectionForElementByTypeAndIdQuery),
  usePropertyGetCollectionQuery: () => (usePropertyGetCollectionQuery),
  usePropertyUpdateMutation: () => (usePropertyUpdateMutation)
});
/* import */ var _Pimcore_app_api_pimcore_tags__rspack_import_0 = __webpack_require__("./js/src/core/app/api/pimcore/tags.ts");
/* import */ var _properties_api_slice_gen__rspack_import_1 = __webpack_require__("./js/src/core/modules/element/editor/shared-tab-manager/tabs/properties/properties-api-slice.gen.ts");
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

const api = _properties_api_slice_gen__rspack_import_1.api.enhanceEndpoints({
    addTagTypes: [
        _Pimcore_app_api_pimcore_tags__rspack_import_0.tagNames.ASSET_DETAIL,
        _Pimcore_app_api_pimcore_tags__rspack_import_0.tagNames.DATA_OBJECT_DETAIL,
        _Pimcore_app_api_pimcore_tags__rspack_import_0.tagNames.DOCUMENT_DETAIL
    ],
    endpoints: {
        propertyGetCollectionForElementByTypeAndId: {
            providesTags: (result, error, args)=>{
                var _result_items;
                const propertyCollection = [];
                result === null || result === void 0 ? void 0 : (_result_items = result.items) === null || _result_items === void 0 ? void 0 : _result_items.forEach((property)=>{
                    propertyCollection.push(..._Pimcore_app_api_pimcore_tags__rspack_import_0.providingTags.PROPERTY_DETAIL(property.key));
                });
                return [
                    ...propertyCollection,
                    ..._Pimcore_app_api_pimcore_tags__rspack_import_0.providingTags.ELEMENT_PROPERTIES(args.elementType, args.id)
                ];
            }
        },
        propertyGetCollection: {
            providesTags: (result, error, args)=>{
                var _result_items;
                const propertyCollection = [];
                result === null || result === void 0 ? void 0 : (_result_items = result.items) === null || _result_items === void 0 ? void 0 : _result_items.forEach((property)=>{
                    propertyCollection.push(..._Pimcore_app_api_pimcore_tags__rspack_import_0.providingTags.PROPERTY_DETAIL(property.key));
                });
                return [
                    ...propertyCollection,
                    ..._Pimcore_app_api_pimcore_tags__rspack_import_0.providingTags.GLOBAL_PROPERTIES()
                ];
            }
        },
        propertyUpdate: {
            invalidatesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__rspack_import_0.invalidatingTags.PROPERTY_DETAIL(args.id)
        },
        propertyDelete: {
            invalidatesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__rspack_import_0.invalidatingTags.PROPERTY_DETAIL(args.id)
        }
    }
});
const { usePropertyGetCollectionQuery, usePropertyGetCollectionForElementByTypeAndIdQuery, usePropertyUpdateMutation, usePropertyDeleteMutation } = api;

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/element/editor/shared-tab-manager/tabs/properties/properties-api-slice.gen.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  usePropertyCreateMutation: () => (usePropertyCreateMutation),
  usePropertyDeleteMutation: () => (usePropertyDeleteMutation),
  usePropertyGetCollectionForElementByTypeAndIdQuery: () => (usePropertyGetCollectionForElementByTypeAndIdQuery),
  usePropertyGetCollectionQuery: () => (usePropertyGetCollectionQuery),
  usePropertyUpdateMutation: () => (usePropertyUpdateMutation)
});
/* import */ var _sdk_api__rspack_import_0 = __webpack_require__("./js/src/sdk/api/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Properties"
];
const injectedRtkApi = _sdk_api__rspack_import_0.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            propertyGetCollection: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/properties`,
                        params: {
                            elementType: queryArg.elementType,
                            filter: queryArg.filter
                        }
                    }),
                providesTags: [
                    "Properties"
                ]
            }),
            propertyCreate: build.mutation({
                query: ()=>({
                        url: `/pimcore-studio/api/property`,
                        method: "POST"
                    }),
                invalidatesTags: [
                    "Properties"
                ]
            }),
            propertyUpdate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/properties/${queryArg.id}`,
                        method: "PUT",
                        body: queryArg.updatePredefinedProperty
                    }),
                invalidatesTags: [
                    "Properties"
                ]
            }),
            propertyDelete: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/properties/${queryArg.id}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Properties"
                ]
            }),
            propertyGetCollectionForElementByTypeAndId: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/properties/${queryArg.elementType}/${queryArg.id}`
                    }),
                providesTags: [
                    "Properties"
                ]
            })
        }),
    overrideExisting: false
});

const { usePropertyGetCollectionQuery, usePropertyCreateMutation, usePropertyUpdateMutation, usePropertyDeleteMutation, usePropertyGetCollectionForElementByTypeAndIdQuery } = injectedRtkApi;

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/sdk/api/properties/index.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  api: () => (/* reexport safe */ _Pimcore_modules_element_editor_shared_tab_manager_tabs_properties_properties_api_slice_enhanced__rspack_import_0.api),
  usePropertyDeleteMutation: () => (/* reexport safe */ _Pimcore_modules_element_editor_shared_tab_manager_tabs_properties_properties_api_slice_enhanced__rspack_import_0.usePropertyDeleteMutation),
  usePropertyGetCollectionForElementByTypeAndIdQuery: () => (/* reexport safe */ _Pimcore_modules_element_editor_shared_tab_manager_tabs_properties_properties_api_slice_enhanced__rspack_import_0.usePropertyGetCollectionForElementByTypeAndIdQuery),
  usePropertyGetCollectionQuery: () => (/* reexport safe */ _Pimcore_modules_element_editor_shared_tab_manager_tabs_properties_properties_api_slice_enhanced__rspack_import_0.usePropertyGetCollectionQuery),
  usePropertyUpdateMutation: () => (/* reexport safe */ _Pimcore_modules_element_editor_shared_tab_manager_tabs_properties_properties_api_slice_enhanced__rspack_import_0.usePropertyUpdateMutation)
});
/* import */ var _Pimcore_modules_element_editor_shared_tab_manager_tabs_properties_properties_api_slice_enhanced__rspack_import_0 = __webpack_require__("./js/src/core/modules/element/editor/shared-tab-manager/tabs/properties/properties-api-slice-enhanced.ts");
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
//# sourceMappingURL=__federation_expose_api__properties.js.map