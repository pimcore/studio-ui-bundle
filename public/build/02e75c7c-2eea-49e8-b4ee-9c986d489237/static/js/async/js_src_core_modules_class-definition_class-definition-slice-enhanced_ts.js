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
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["js_src_core_modules_class-definition_class-definition-slice-enhanced_ts"], {
"./js/src/core/modules/class-definition/class-definition-slice-enhanced.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  api: () => (api),
  useClassCustomLayoutCollectionQuery: () => (useClassCustomLayoutCollectionQuery),
  useClassCustomLayoutEditorCollectionQuery: () => (useClassCustomLayoutEditorCollectionQuery),
  useClassCustomLayoutGetIdentifierDataQuery: () => (useClassCustomLayoutGetIdentifierDataQuery),
  useClassCustomLayoutImportMutation: () => (useClassCustomLayoutImportMutation),
  useClassDefinitionCollectionQuery: () => (useClassDefinitionCollectionQuery),
  useClassDefinitionCreateMutation: () => (useClassDefinitionCreateMutation),
  useClassDefinitionDeleteMutation: () => (useClassDefinitionDeleteMutation),
  useClassDefinitionExportQuery: () => (useClassDefinitionExportQuery),
  useClassDefinitionFolderCollectionQuery: () => (useClassDefinitionFolderCollectionQuery),
  useClassDefinitionGetBricksUsagesQuery: () => (useClassDefinitionGetBricksUsagesQuery),
  useClassDefinitionGetByIdQuery: () => (useClassDefinitionGetByIdQuery),
  useClassDefinitionGetIdentifierDataQuery: () => (useClassDefinitionGetIdentifierDataQuery),
  useClassDefinitionGetLayoutByIdQuery: () => (useClassDefinitionGetLayoutByIdQuery),
  useClassDefinitionGetQuery: () => (useClassDefinitionGetQuery),
  useClassDefinitionGetTreeQuery: () => (useClassDefinitionGetTreeQuery),
  useClassDefinitionImportMutation: () => (useClassDefinitionImportMutation),
  useClassDefinitionUpdateMutation: () => (useClassDefinitionUpdateMutation),
  useClassFieldCollectionObjectLayoutQuery: () => (useClassFieldCollectionObjectLayoutQuery),
  useClassObjectBrickObjectLayoutQuery: () => (useClassObjectBrickObjectLayoutQuery),
  useClassSelectOptionGetTreeQuery: () => (useClassSelectOptionGetTreeQuery),
  useLazyClassDefinitionExportQuery: () => (useLazyClassDefinitionExportQuery),
  usePimcoreStudioApiClassCustomLayoutCreateMutation: () => (usePimcoreStudioApiClassCustomLayoutCreateMutation),
  usePimcoreStudioApiClassCustomLayoutDeleteMutation: () => (usePimcoreStudioApiClassCustomLayoutDeleteMutation),
  usePimcoreStudioApiClassCustomLayoutExportQuery: () => (usePimcoreStudioApiClassCustomLayoutExportQuery),
  usePimcoreStudioApiClassCustomLayoutGetQuery: () => (usePimcoreStudioApiClassCustomLayoutGetQuery),
  usePimcoreStudioApiClassCustomLayoutUpdateMutation: () => (usePimcoreStudioApiClassCustomLayoutUpdateMutation)
});
/* ESM import */var _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/tags.ts");
/* ESM import */var _class_definition_slice_gen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/class-definition/class-definition-slice.gen.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 

const api = _class_definition_slice_gen__WEBPACK_IMPORTED_MODULE_1__.api.enhanceEndpoints({
    addTagTypes: [
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.DATA_OBJECT,
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.DATA_OBJECT_DETAIL,
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.CLASS_DEFINITION,
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.CLASS_DEFINITION_DETAIL,
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.CLASS_DEFINITION_COLLECTION,
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.CUSTOM_LAYOUT,
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.CUSTOM_LAYOUT_DETAIL,
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.CUSTOM_LAYOUT_COLLECTION
    ],
    endpoints: {
        classDefinitionCollection: {
            providesTags: ()=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.CLASS_DEFINITION_COLLECTION()
        },
        classDefinitionGetById: {
            providesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.CLASS_DEFINITION_DETAIL(args.id)
        },
        classDefinitionGetLayoutById: {
            providesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.CLASS_DEFINITION_DETAIL(args.id)
        },
        classCustomLayoutCollection: {
            providesTags: ()=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.CUSTOM_LAYOUT_COLLECTION()
        },
        classDefinitionUpdate: {
            invalidatesTags: ()=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.CLASS_DEFINITION_COLLECTION(),
            async onQueryStarted (args, param) {
                let { dispatch, queryFulfilled } = param;
                try {
                    const { data } = await queryFulfilled;
                    dispatch(api.util.updateQueryData('classDefinitionGetById', {
                        id: args.id
                    }, (draft)=>{
                        Object.assign(draft, data);
                    }));
                } catch  {
                // Mutation failed, no cache update needed
                }
            }
        },
        classDefinitionCreate: {
            invalidatesTags: ()=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.CLASS_DEFINITION_COLLECTION()
        },
        classDefinitionDelete: {
            invalidatesTags: ()=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.CLASS_DEFINITION_COLLECTION()
        },
        classDefinitionImport: {
            invalidatesTags: (result, error, args)=>[
                    ..._Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.CLASS_DEFINITION_DETAIL(args.id),
                    ..._Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.CLASS_DEFINITION_COLLECTION()
                ]
        },
        pimcoreStudioApiClassCustomLayoutGet: {
            providesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.CUSTOM_LAYOUT_DETAIL(args.customLayoutId)
        },
        pimcoreStudioApiClassCustomLayoutUpdate: {
            invalidatesTags: ()=>[],
            async onQueryStarted (args, param) {
                let { dispatch, queryFulfilled } = param;
                try {
                    const { data } = await queryFulfilled;
                    dispatch(api.util.updateQueryData('pimcoreStudioApiClassCustomLayoutGet', {
                        customLayoutId: args.customLayoutId
                    }, (draft)=>{
                        Object.assign(draft, data);
                    }));
                } catch  {
                // Mutation failed, no cache update needed
                }
            }
        },
        pimcoreStudioApiClassCustomLayoutCreate: {
            invalidatesTags: ()=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.CUSTOM_LAYOUT_COLLECTION()
        },
        pimcoreStudioApiClassCustomLayoutDelete: {
            invalidatesTags: ()=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.CUSTOM_LAYOUT_COLLECTION()
        },
        pimcoreStudioApiClassCustomLayoutExport: {
            providesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.CUSTOM_LAYOUT_DETAIL(args.customLayoutId)
        },
        classCustomLayoutGetIdentifierData: {
            providesTags: ()=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.CUSTOM_LAYOUT_COLLECTION()
        },
        classCustomLayoutImport: {
            invalidatesTags: (result, error, args)=>[
                    ..._Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.CUSTOM_LAYOUT_DETAIL(args.customLayoutId),
                    ..._Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.CUSTOM_LAYOUT_COLLECTION()
                ]
        },
        classCustomLayoutEditorCollection: {
            providesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.DATA_OBJECT_DETAIL_ID(args.objectId)
        },
        classFieldCollectionObjectLayout: {
            providesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.DATA_OBJECT_DETAIL_ID(args.objectId)
        },
        classObjectBrickObjectLayout: {
            providesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.DATA_OBJECT_DETAIL_ID(args.objectId)
        }
    }
});
const { useClassDefinitionCollectionQuery, useClassDefinitionFolderCollectionQuery, useClassCustomLayoutCollectionQuery, usePimcoreStudioApiClassCustomLayoutCreateMutation, usePimcoreStudioApiClassCustomLayoutGetQuery, usePimcoreStudioApiClassCustomLayoutUpdateMutation, usePimcoreStudioApiClassCustomLayoutDeleteMutation, useClassCustomLayoutEditorCollectionQuery, usePimcoreStudioApiClassCustomLayoutExportQuery, useClassCustomLayoutImportMutation, useClassFieldCollectionObjectLayoutQuery, useClassDefinitionGetQuery, useClassObjectBrickObjectLayoutQuery, useClassDefinitionGetIdentifierDataQuery, useClassDefinitionCreateMutation, useClassDefinitionGetLayoutByIdQuery, useClassDefinitionGetTreeQuery, useClassDefinitionGetByIdQuery, useClassDefinitionUpdateMutation, useClassDefinitionDeleteMutation, useClassDefinitionExportQuery, useLazyClassDefinitionExportQuery, useClassDefinitionImportMutation, useClassCustomLayoutGetIdentifierDataQuery, useClassSelectOptionGetTreeQuery, useClassDefinitionGetBricksUsagesQuery } = api;


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
"./js/src/core/modules/class-definition/class-definition-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useClassAllLayoutCollectionQuery: () => (useClassAllLayoutCollectionQuery),
  useClassCustomLayoutCollectionQuery: () => (useClassCustomLayoutCollectionQuery),
  useClassCustomLayoutEditorCollectionQuery: () => (useClassCustomLayoutEditorCollectionQuery),
  useClassCustomLayoutGetIdentifierDataQuery: () => (useClassCustomLayoutGetIdentifierDataQuery),
  useClassCustomLayoutImportMutation: () => (useClassCustomLayoutImportMutation),
  useClassDefinitionCollectionCreatableQuery: () => (useClassDefinitionCollectionCreatableQuery),
  useClassDefinitionCollectionQuery: () => (useClassDefinitionCollectionQuery),
  useClassDefinitionCreateMutation: () => (useClassDefinitionCreateMutation),
  useClassDefinitionDeleteMutation: () => (useClassDefinitionDeleteMutation),
  useClassDefinitionExportQuery: () => (useClassDefinitionExportQuery),
  useClassDefinitionFolderCollectionQuery: () => (useClassDefinitionFolderCollectionQuery),
  useClassDefinitionGetBricksUsagesQuery: () => (useClassDefinitionGetBricksUsagesQuery),
  useClassDefinitionGetByIdQuery: () => (useClassDefinitionGetByIdQuery),
  useClassDefinitionGetIdentifierDataQuery: () => (useClassDefinitionGetIdentifierDataQuery),
  useClassDefinitionGetLayoutByIdQuery: () => (useClassDefinitionGetLayoutByIdQuery),
  useClassDefinitionGetQuery: () => (useClassDefinitionGetQuery),
  useClassDefinitionGetTextLayoutPreviewQuery: () => (useClassDefinitionGetTextLayoutPreviewQuery),
  useClassDefinitionGetTreeQuery: () => (useClassDefinitionGetTreeQuery),
  useClassDefinitionImportMutation: () => (useClassDefinitionImportMutation),
  useClassDefinitionUpdateMutation: () => (useClassDefinitionUpdateMutation),
  useClassFieldCollectionCollectionQuery: () => (useClassFieldCollectionCollectionQuery),
  useClassFieldCollectionObjectLayoutQuery: () => (useClassFieldCollectionObjectLayoutQuery),
  useClassGetAvailableVisibleFieldsQuery: () => (useClassGetAvailableVisibleFieldsQuery),
  useClassGetSelectedVisibleFieldsQuery: () => (useClassGetSelectedVisibleFieldsQuery),
  useClassObjectBrickObjectLayoutQuery: () => (useClassObjectBrickObjectLayoutQuery),
  useClassSelectOptionGetTreeQuery: () => (useClassSelectOptionGetTreeQuery),
  usePimcoreStudioApiClassCustomLayoutCreateMutation: () => (usePimcoreStudioApiClassCustomLayoutCreateMutation),
  usePimcoreStudioApiClassCustomLayoutDeleteMutation: () => (usePimcoreStudioApiClassCustomLayoutDeleteMutation),
  usePimcoreStudioApiClassCustomLayoutExportQuery: () => (usePimcoreStudioApiClassCustomLayoutExportQuery),
  usePimcoreStudioApiClassCustomLayoutGetQuery: () => (usePimcoreStudioApiClassCustomLayoutGetQuery),
  usePimcoreStudioApiClassCustomLayoutUpdateMutation: () => (usePimcoreStudioApiClassCustomLayoutUpdateMutation)
});
/* ESM import */var _sdk_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/sdk/api/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Class Definition"
];
const injectedRtkApi = _sdk_api__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            classGetAvailableVisibleFields: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/definition/available-visible-fields`,
                        params: {
                            classNames: queryArg.classNames
                        }
                    }),
                providesTags: [
                    "Class Definition"
                ]
            }),
            classDefinitionCollection: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/class/collection`
                    }),
                providesTags: [
                    "Class Definition"
                ]
            }),
            classDefinitionCollectionCreatable: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/class/collection/creatable`
                    }),
                providesTags: [
                    "Class Definition"
                ]
            }),
            classCustomLayoutCollection: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/custom-layout/collection/${queryArg.dataObjectClass}`
                    }),
                providesTags: [
                    "Class Definition"
                ]
            }),
            classAllLayoutCollection: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/class/all-layouts`
                    }),
                providesTags: [
                    "Class Definition"
                ]
            }),
            pimcoreStudioApiClassCustomLayoutGet: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/custom-layout/${queryArg.customLayoutId}`
                    }),
                providesTags: [
                    "Class Definition"
                ]
            }),
            pimcoreStudioApiClassCustomLayoutUpdate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/custom-layout/${queryArg.customLayoutId}`,
                        method: "PUT",
                        body: queryArg.customLayoutUpdate
                    }),
                invalidatesTags: [
                    "Class Definition"
                ]
            }),
            pimcoreStudioApiClassCustomLayoutCreate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/custom-layout/${queryArg.customLayoutId}`,
                        method: "POST",
                        body: queryArg.customLayoutNew
                    }),
                invalidatesTags: [
                    "Class Definition"
                ]
            }),
            pimcoreStudioApiClassCustomLayoutDelete: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/custom-layout/${queryArg.customLayoutId}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Class Definition"
                ]
            }),
            classCustomLayoutEditorCollection: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/custom-layout/editor/collection/${queryArg.objectId}`
                    }),
                providesTags: [
                    "Class Definition"
                ]
            }),
            pimcoreStudioApiClassCustomLayoutExport: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/custom-layout/export/${queryArg.customLayoutId}`
                    }),
                providesTags: [
                    "Class Definition"
                ]
            }),
            classCustomLayoutGetIdentifierData: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/custom-layout/identifier-data/${queryArg.classDefinitionId}`
                    }),
                providesTags: [
                    "Class Definition"
                ]
            }),
            classCustomLayoutImport: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/custom-layout/import/${queryArg.customLayoutId}`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Class Definition"
                ]
            }),
            classDefinitionGetBricksUsages: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/definition/configuration-view/detail/${queryArg.id}/bricks`
                    }),
                providesTags: [
                    "Class Definition"
                ]
            }),
            classDefinitionCreate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/definition/configuration-view/detail/create`,
                        method: "POST",
                        body: queryArg.createClassDefinition
                    }),
                invalidatesTags: [
                    "Class Definition"
                ]
            }),
            classDefinitionGetById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/definition/configuration-view/detail/${queryArg.id}`
                    }),
                providesTags: [
                    "Class Definition"
                ]
            }),
            classDefinitionUpdate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/definition/configuration-view/detail/${queryArg.id}`,
                        method: "PUT",
                        body: queryArg.classDefinitionUpdate
                    }),
                invalidatesTags: [
                    "Class Definition"
                ]
            }),
            classDefinitionDelete: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/definition/configuration-view/detail/${queryArg.id}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Class Definition"
                ]
            }),
            classDefinitionExport: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/definition/configuration-view/detail/${queryArg.id}/export`
                    }),
                providesTags: [
                    "Class Definition"
                ]
            }),
            classDefinitionGetIdentifierData: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/class/definition/configuration-view/identifier-data`
                    }),
                providesTags: [
                    "Class Definition"
                ]
            }),
            classDefinitionImport: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/definition/configuration-view/detail/${queryArg.id}/import`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Class Definition"
                ]
            }),
            classDefinitionGetLayoutById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/definition/configuration-view/detail/${queryArg.id}/layout`
                    }),
                providesTags: [
                    "Class Definition"
                ]
            }),
            classGetSelectedVisibleFields: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/definition/configuration-view/detail/${queryArg.id}/selected-visible-fields`,
                        params: {
                            relationField: queryArg.relationField
                        }
                    }),
                providesTags: [
                    "Class Definition"
                ]
            }),
            classDefinitionGetTextLayoutPreview: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/definition/configuration-view/text-layout/preview`,
                        params: {
                            className: queryArg.className,
                            path: queryArg.path,
                            renderingData: queryArg.renderingData,
                            renderingClass: queryArg.renderingClass,
                            html: queryArg.html
                        }
                    }),
                providesTags: [
                    "Class Definition"
                ]
            }),
            classDefinitionGetTree: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/definition/configuration-view/tree`,
                        params: {
                            withGroup: queryArg.withGroup
                        }
                    }),
                providesTags: [
                    "Class Definition"
                ]
            }),
            classFieldCollectionCollection: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/class/field-collection/collection`
                    }),
                providesTags: [
                    "Class Definition"
                ]
            }),
            classFieldCollectionObjectLayout: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/field-collection/${queryArg.objectId}/object/layout`
                    }),
                providesTags: [
                    "Class Definition"
                ]
            }),
            classDefinitionFolderCollection: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/folder/${queryArg.folderId}`
                    }),
                providesTags: [
                    "Class Definition"
                ]
            }),
            classDefinitionGet: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/definition/${queryArg.dataObjectClass}`
                    }),
                providesTags: [
                    "Class Definition"
                ]
            }),
            classObjectBrickObjectLayout: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/object-brick/${queryArg.objectId}/object/layout`
                    }),
                providesTags: [
                    "Class Definition"
                ]
            }),
            classSelectOptionGetTree: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/select-option/tree`,
                        params: {
                            withGroup: queryArg.withGroup
                        }
                    }),
                providesTags: [
                    "Class Definition"
                ]
            })
        }),
    overrideExisting: false
});

const { useClassGetAvailableVisibleFieldsQuery, useClassDefinitionCollectionQuery, useClassDefinitionCollectionCreatableQuery, useClassCustomLayoutCollectionQuery, useClassAllLayoutCollectionQuery, usePimcoreStudioApiClassCustomLayoutGetQuery, usePimcoreStudioApiClassCustomLayoutUpdateMutation, usePimcoreStudioApiClassCustomLayoutCreateMutation, usePimcoreStudioApiClassCustomLayoutDeleteMutation, useClassCustomLayoutEditorCollectionQuery, usePimcoreStudioApiClassCustomLayoutExportQuery, useClassCustomLayoutGetIdentifierDataQuery, useClassCustomLayoutImportMutation, useClassDefinitionGetBricksUsagesQuery, useClassDefinitionCreateMutation, useClassDefinitionGetByIdQuery, useClassDefinitionUpdateMutation, useClassDefinitionDeleteMutation, useClassDefinitionExportQuery, useClassDefinitionGetIdentifierDataQuery, useClassDefinitionImportMutation, useClassDefinitionGetLayoutByIdQuery, useClassGetSelectedVisibleFieldsQuery, useClassDefinitionGetTextLayoutPreviewQuery, useClassDefinitionGetTreeQuery, useClassFieldCollectionCollectionQuery, useClassFieldCollectionObjectLayoutQuery, useClassDefinitionFolderCollectionQuery, useClassDefinitionGetQuery, useClassObjectBrickObjectLayoutQuery, useClassSelectOptionGetTreeQuery } = injectedRtkApi;

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
//# sourceMappingURL=js_src_core_modules_class-definition_class-definition-slice-enhanced_ts.js.map