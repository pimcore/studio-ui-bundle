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
  useClassCustomLayoutCreateMutation: () => (useClassCustomLayoutCreateMutation),
  useClassCustomLayoutDeleteMutation: () => (useClassCustomLayoutDeleteMutation),
  useClassCustomLayoutEditorCollectionQuery: () => (useClassCustomLayoutEditorCollectionQuery),
  useClassCustomLayoutExportQuery: () => (useClassCustomLayoutExportQuery),
  useClassCustomLayoutGetIdentifierDataQuery: () => (useClassCustomLayoutGetIdentifierDataQuery),
  useClassCustomLayoutGetQuery: () => (useClassCustomLayoutGetQuery),
  useClassCustomLayoutImportMutation: () => (useClassCustomLayoutImportMutation),
  useClassCustomLayoutUpdateMutation: () => (useClassCustomLayoutUpdateMutation),
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
  useClassFieldCollectionCollectionQuery: () => (useClassFieldCollectionCollectionQuery),
  useClassFieldCollectionCreateMutation: () => (useClassFieldCollectionCreateMutation),
  useClassFieldCollectionDeleteMutation: () => (useClassFieldCollectionDeleteMutation),
  useClassFieldCollectionExportQuery: () => (useClassFieldCollectionExportQuery),
  useClassFieldCollectionGetByKeyQuery: () => (useClassFieldCollectionGetByKeyQuery),
  useClassFieldCollectionGetLayoutByKeyQuery: () => (useClassFieldCollectionGetLayoutByKeyQuery),
  useClassFieldCollectionGetTreeQuery: () => (useClassFieldCollectionGetTreeQuery),
  useClassFieldCollectionGetUsagesQuery: () => (useClassFieldCollectionGetUsagesQuery),
  useClassFieldCollectionImportMutation: () => (useClassFieldCollectionImportMutation),
  useClassFieldCollectionObjectLayoutQuery: () => (useClassFieldCollectionObjectLayoutQuery),
  useClassFieldCollectionUpdateMutation: () => (useClassFieldCollectionUpdateMutation),
  useClassGetAvailableVisibleFieldsQuery: () => (useClassGetAvailableVisibleFieldsQuery),
  useClassGetSelectedVisibleFieldsQuery: () => (useClassGetSelectedVisibleFieldsQuery),
  useClassObjectBrickClassesQuery: () => (useClassObjectBrickClassesQuery),
  useClassObjectBrickCollectionQuery: () => (useClassObjectBrickCollectionQuery),
  useClassObjectBrickCreateMutation: () => (useClassObjectBrickCreateMutation),
  useClassObjectBrickCustomLayoutDeleteMutation: () => (useClassObjectBrickCustomLayoutDeleteMutation),
  useClassObjectBrickCustomLayoutExportQuery: () => (useClassObjectBrickCustomLayoutExportQuery),
  useClassObjectBrickCustomLayoutGetQuery: () => (useClassObjectBrickCustomLayoutGetQuery),
  useClassObjectBrickCustomLayoutImportMutation: () => (useClassObjectBrickCustomLayoutImportMutation),
  useClassObjectBrickCustomLayoutUpdateMutation: () => (useClassObjectBrickCustomLayoutUpdateMutation),
  useClassObjectBrickDeleteMutation: () => (useClassObjectBrickDeleteMutation),
  useClassObjectBrickExportQuery: () => (useClassObjectBrickExportQuery),
  useClassObjectBrickGetByKeyQuery: () => (useClassObjectBrickGetByKeyQuery),
  useClassObjectBrickGetLayoutByKeyQuery: () => (useClassObjectBrickGetLayoutByKeyQuery),
  useClassObjectBrickGetTreeQuery: () => (useClassObjectBrickGetTreeQuery),
  useClassObjectBrickGetUsagesQuery: () => (useClassObjectBrickGetUsagesQuery),
  useClassObjectBrickImportMutation: () => (useClassObjectBrickImportMutation),
  useClassObjectBrickObjectLayoutQuery: () => (useClassObjectBrickObjectLayoutQuery),
  useClassObjectBrickUpdateMutation: () => (useClassObjectBrickUpdateMutation),
  useClassSelectOptionGetTreeQuery: () => (useClassSelectOptionGetTreeQuery),
  useLazyClassDefinitionExportQuery: () => (useLazyClassDefinitionExportQuery),
  useLazyClassFieldCollectionExportQuery: () => (useLazyClassFieldCollectionExportQuery),
  useLazyClassObjectBrickExportQuery: () => (useLazyClassObjectBrickExportQuery)
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
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.CUSTOM_LAYOUT_COLLECTION,
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.FIELD_COLLECTION,
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.FIELD_COLLECTION_DETAIL,
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.FIELD_COLLECTION_COLLECTION,
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.OBJECT_BRICK,
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.OBJECT_BRICK_DETAIL,
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.OBJECT_BRICK_COLLECTION,
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.OBJECT_BRICK_CUSTOM_LAYOUT,
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.OBJECT_BRICK_CUSTOM_LAYOUT_DETAIL,
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.OBJECT_BRICK_CUSTOM_LAYOUT_COLLECTION
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
        classDefinitionGetIdentifierData: {
            providesTags: ()=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.CLASS_DEFINITION_COLLECTION()
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
        classCustomLayoutGet: {
            providesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.CUSTOM_LAYOUT_DETAIL(args.customLayoutId)
        },
        classCustomLayoutUpdate: {
            invalidatesTags: ()=>[],
            async onQueryStarted (args, param) {
                let { dispatch, queryFulfilled } = param;
                try {
                    const { data } = await queryFulfilled;
                    dispatch(api.util.updateQueryData('classCustomLayoutGet', {
                        customLayoutId: args.customLayoutId
                    }, (draft)=>{
                        Object.assign(draft, data);
                    }));
                } catch  {
                // Mutation failed, no cache update needed
                }
            }
        },
        classCustomLayoutCreate: {
            invalidatesTags: ()=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.CUSTOM_LAYOUT_COLLECTION()
        },
        classCustomLayoutDelete: {
            invalidatesTags: ()=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.CUSTOM_LAYOUT_COLLECTION()
        },
        classCustomLayoutExport: {
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
        },
        classFieldCollectionCollection: {
            providesTags: ()=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.FIELD_COLLECTION_COLLECTION()
        },
        classFieldCollectionGetByKey: {
            providesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.FIELD_COLLECTION_DETAIL(args.key)
        },
        classFieldCollectionGetLayoutByKey: {
            providesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.FIELD_COLLECTION_DETAIL(args.key)
        },
        classFieldCollectionUpdate: {
            invalidatesTags: ()=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.FIELD_COLLECTION_COLLECTION(),
            async onQueryStarted (args, param) {
                let { dispatch, queryFulfilled } = param;
                try {
                    const { data } = await queryFulfilled;
                    dispatch(api.util.updateQueryData('classFieldCollectionGetByKey', {
                        key: args.key
                    }, (draft)=>{
                        Object.assign(draft, data);
                    }));
                } catch  {
                // Mutation failed, no cache update needed
                }
            }
        },
        classFieldCollectionCreate: {
            invalidatesTags: ()=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.FIELD_COLLECTION_COLLECTION()
        },
        classFieldCollectionDelete: {
            invalidatesTags: ()=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.FIELD_COLLECTION_COLLECTION()
        },
        classFieldCollectionImport: {
            invalidatesTags: (result, error, args)=>[
                    ..._Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.FIELD_COLLECTION_DETAIL(args.key),
                    ..._Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.FIELD_COLLECTION_COLLECTION()
                ]
        },
        classFieldCollectionGetTree: {
            providesTags: ()=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.FIELD_COLLECTION_COLLECTION()
        },
        classObjectBrickCollection: {
            providesTags: ()=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.OBJECT_BRICK_COLLECTION()
        },
        classObjectBrickGetByKey: {
            providesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.OBJECT_BRICK_DETAIL(args.key)
        },
        classObjectBrickGetLayoutByKey: {
            providesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.OBJECT_BRICK_DETAIL(args.key)
        },
        classObjectBrickGetTree: {
            providesTags: ()=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.OBJECT_BRICK_COLLECTION()
        },
        classObjectBrickUpdate: {
            invalidatesTags: ()=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.OBJECT_BRICK_COLLECTION(),
            async onQueryStarted (args, param) {
                let { dispatch, queryFulfilled } = param;
                try {
                    const { data } = await queryFulfilled;
                    dispatch(api.util.updateQueryData('classObjectBrickGetByKey', {
                        key: args.key
                    }, (draft)=>{
                        Object.assign(draft, data);
                    }));
                } catch  {
                // Mutation failed, no cache update needed
                }
            }
        },
        classObjectBrickCreate: {
            invalidatesTags: ()=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.OBJECT_BRICK_COLLECTION()
        },
        classObjectBrickDelete: {
            invalidatesTags: ()=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.OBJECT_BRICK_COLLECTION()
        },
        classObjectBrickImport: {
            invalidatesTags: (result, error, args)=>[
                    ..._Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.OBJECT_BRICK_DETAIL(args.key),
                    ..._Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.OBJECT_BRICK_COLLECTION()
                ]
        },
        classObjectBrickCustomLayoutGet: {
            providesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.OBJECT_BRICK_CUSTOM_LAYOUT_DETAIL(args.key, args.customLayoutId)
        },
        classObjectBrickCustomLayoutUpdate: {
            invalidatesTags: ()=>[],
            async onQueryStarted (args, param) {
                let { dispatch, queryFulfilled } = param;
                try {
                    const { data } = await queryFulfilled;
                    dispatch(api.util.updateQueryData('classObjectBrickCustomLayoutGet', {
                        key: args.key,
                        customLayoutId: args.customLayoutId
                    }, (draft)=>{
                        Object.assign(draft, data);
                    }));
                } catch  {
                // Mutation failed, no cache update needed
                }
            }
        },
        classObjectBrickCustomLayoutDelete: {
            invalidatesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.OBJECT_BRICK_CUSTOM_LAYOUT_COLLECTION(args.key)
        },
        classObjectBrickCustomLayoutExport: {
            providesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.OBJECT_BRICK_CUSTOM_LAYOUT_DETAIL(args.key, args.customLayoutId)
        },
        classObjectBrickCustomLayoutImport: {
            invalidatesTags: (result, error, args)=>[
                    ..._Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.OBJECT_BRICK_CUSTOM_LAYOUT_DETAIL(args.key, args.customLayoutId),
                    ..._Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.OBJECT_BRICK_CUSTOM_LAYOUT_COLLECTION(args.key)
                ]
        }
    }
});
const { useClassDefinitionCollectionQuery, useClassDefinitionFolderCollectionQuery, useClassCustomLayoutCollectionQuery, useClassCustomLayoutCreateMutation, useClassCustomLayoutGetQuery, useClassCustomLayoutUpdateMutation, useClassCustomLayoutDeleteMutation, useClassCustomLayoutEditorCollectionQuery, useClassCustomLayoutExportQuery, useClassCustomLayoutImportMutation, useClassFieldCollectionObjectLayoutQuery, useClassDefinitionGetQuery, useClassObjectBrickObjectLayoutQuery, useClassDefinitionGetIdentifierDataQuery, useClassDefinitionCreateMutation, useClassDefinitionGetLayoutByIdQuery, useClassDefinitionGetTreeQuery, useClassDefinitionGetByIdQuery, useClassDefinitionUpdateMutation, useClassDefinitionDeleteMutation, useClassDefinitionExportQuery, useLazyClassDefinitionExportQuery, useClassDefinitionImportMutation, useClassCustomLayoutGetIdentifierDataQuery, useClassSelectOptionGetTreeQuery, useClassGetAvailableVisibleFieldsQuery, useClassGetSelectedVisibleFieldsQuery, useClassDefinitionGetBricksUsagesQuery, useClassFieldCollectionCollectionQuery, useClassFieldCollectionCreateMutation, useClassFieldCollectionGetByKeyQuery, useClassFieldCollectionUpdateMutation, useClassFieldCollectionDeleteMutation, useClassFieldCollectionExportQuery, useLazyClassFieldCollectionExportQuery, useClassFieldCollectionImportMutation, useClassFieldCollectionGetLayoutByKeyQuery, useClassFieldCollectionGetTreeQuery, useClassFieldCollectionGetUsagesQuery, useClassObjectBrickCollectionQuery, useClassObjectBrickGetByKeyQuery, useClassObjectBrickGetLayoutByKeyQuery, useClassObjectBrickGetTreeQuery, useClassObjectBrickCreateMutation, useClassObjectBrickUpdateMutation, useClassObjectBrickDeleteMutation, useClassObjectBrickGetUsagesQuery, useClassObjectBrickClassesQuery, useClassObjectBrickExportQuery, useLazyClassObjectBrickExportQuery, useClassObjectBrickImportMutation, useClassObjectBrickCustomLayoutGetQuery, useClassObjectBrickCustomLayoutUpdateMutation, useClassObjectBrickCustomLayoutDeleteMutation, useClassObjectBrickCustomLayoutExportQuery, useClassObjectBrickCustomLayoutImportMutation } = api;


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
  useClassCustomLayoutCreateMutation: () => (useClassCustomLayoutCreateMutation),
  useClassCustomLayoutDeleteMutation: () => (useClassCustomLayoutDeleteMutation),
  useClassCustomLayoutEditorCollectionQuery: () => (useClassCustomLayoutEditorCollectionQuery),
  useClassCustomLayoutExportQuery: () => (useClassCustomLayoutExportQuery),
  useClassCustomLayoutGetIdentifierDataQuery: () => (useClassCustomLayoutGetIdentifierDataQuery),
  useClassCustomLayoutGetQuery: () => (useClassCustomLayoutGetQuery),
  useClassCustomLayoutImportMutation: () => (useClassCustomLayoutImportMutation),
  useClassCustomLayoutUpdateMutation: () => (useClassCustomLayoutUpdateMutation),
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
  useClassFieldCollectionCreateMutation: () => (useClassFieldCollectionCreateMutation),
  useClassFieldCollectionDeleteMutation: () => (useClassFieldCollectionDeleteMutation),
  useClassFieldCollectionExportQuery: () => (useClassFieldCollectionExportQuery),
  useClassFieldCollectionGetByKeyQuery: () => (useClassFieldCollectionGetByKeyQuery),
  useClassFieldCollectionGetLayoutByKeyQuery: () => (useClassFieldCollectionGetLayoutByKeyQuery),
  useClassFieldCollectionGetTreeQuery: () => (useClassFieldCollectionGetTreeQuery),
  useClassFieldCollectionGetUsagesQuery: () => (useClassFieldCollectionGetUsagesQuery),
  useClassFieldCollectionImportMutation: () => (useClassFieldCollectionImportMutation),
  useClassFieldCollectionObjectLayoutQuery: () => (useClassFieldCollectionObjectLayoutQuery),
  useClassFieldCollectionUpdateMutation: () => (useClassFieldCollectionUpdateMutation),
  useClassGetAvailableVisibleFieldsQuery: () => (useClassGetAvailableVisibleFieldsQuery),
  useClassGetFieldsByTypeQuery: () => (useClassGetFieldsByTypeQuery),
  useClassGetSelectedVisibleFieldsQuery: () => (useClassGetSelectedVisibleFieldsQuery),
  useClassObjectBrickClassesQuery: () => (useClassObjectBrickClassesQuery),
  useClassObjectBrickCollectionQuery: () => (useClassObjectBrickCollectionQuery),
  useClassObjectBrickCreateMutation: () => (useClassObjectBrickCreateMutation),
  useClassObjectBrickCustomLayoutDeleteMutation: () => (useClassObjectBrickCustomLayoutDeleteMutation),
  useClassObjectBrickCustomLayoutExportQuery: () => (useClassObjectBrickCustomLayoutExportQuery),
  useClassObjectBrickCustomLayoutGetQuery: () => (useClassObjectBrickCustomLayoutGetQuery),
  useClassObjectBrickCustomLayoutImportMutation: () => (useClassObjectBrickCustomLayoutImportMutation),
  useClassObjectBrickCustomLayoutUpdateMutation: () => (useClassObjectBrickCustomLayoutUpdateMutation),
  useClassObjectBrickDeleteMutation: () => (useClassObjectBrickDeleteMutation),
  useClassObjectBrickExportQuery: () => (useClassObjectBrickExportQuery),
  useClassObjectBrickGetByKeyQuery: () => (useClassObjectBrickGetByKeyQuery),
  useClassObjectBrickGetLayoutByKeyQuery: () => (useClassObjectBrickGetLayoutByKeyQuery),
  useClassObjectBrickGetTreeQuery: () => (useClassObjectBrickGetTreeQuery),
  useClassObjectBrickGetUsagesQuery: () => (useClassObjectBrickGetUsagesQuery),
  useClassObjectBrickImportMutation: () => (useClassObjectBrickImportMutation),
  useClassObjectBrickObjectLayoutQuery: () => (useClassObjectBrickObjectLayoutQuery),
  useClassObjectBrickUpdateMutation: () => (useClassObjectBrickUpdateMutation),
  useClassSelectOptionGetTreeQuery: () => (useClassSelectOptionGetTreeQuery)
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
                        url: `/pimcore-studio/api/class/custom-layout/collection`,
                        params: {
                            classIds: queryArg.classIds
                        }
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
            classCustomLayoutGet: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/custom-layout/${queryArg.customLayoutId}`
                    }),
                providesTags: [
                    "Class Definition"
                ]
            }),
            classCustomLayoutUpdate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/custom-layout/${queryArg.customLayoutId}`,
                        method: "PUT",
                        body: queryArg.customLayoutUpdate
                    }),
                invalidatesTags: [
                    "Class Definition"
                ]
            }),
            classCustomLayoutCreate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/custom-layout/${queryArg.customLayoutId}`,
                        method: "POST",
                        body: queryArg.customLayoutNew
                    }),
                invalidatesTags: [
                    "Class Definition"
                ]
            }),
            classCustomLayoutDelete: build.mutation({
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
            classCustomLayoutExport: build.query({
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
            classFieldCollectionCreate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/field-collection`,
                        method: "POST",
                        body: queryArg.createFieldCollection
                    }),
                invalidatesTags: [
                    "Class Definition"
                ]
            }),
            classFieldCollectionGetByKey: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/field-collection/${queryArg.key}`
                    }),
                providesTags: [
                    "Class Definition"
                ]
            }),
            classFieldCollectionUpdate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/field-collection/${queryArg.key}`,
                        method: "PUT",
                        body: queryArg.fieldCollectionUpdate
                    }),
                invalidatesTags: [
                    "Class Definition"
                ]
            }),
            classFieldCollectionDelete: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/field-collection/${queryArg.key}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Class Definition"
                ]
            }),
            classFieldCollectionExport: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/field-collection/${queryArg.key}/export`
                    }),
                providesTags: [
                    "Class Definition"
                ]
            }),
            classFieldCollectionImport: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/field-collection/${queryArg.key}/import`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
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
            classFieldCollectionGetLayoutByKey: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/field-collection/${queryArg.key}/layout`
                    }),
                providesTags: [
                    "Class Definition"
                ]
            }),
            classFieldCollectionGetTree: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/field-collection/tree`,
                        params: {
                            allowedTypes: queryArg.allowedTypes
                        }
                    }),
                providesTags: [
                    "Class Definition"
                ]
            }),
            classFieldCollectionGetUsages: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/field-collection/${queryArg.key}/usages`
                    }),
                providesTags: [
                    "Class Definition"
                ]
            }),
            classGetFieldsByType: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/definition/fields-by-type`,
                        params: {
                            classId: queryArg.classId,
                            type: queryArg["type"]
                        }
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
            classObjectBrickClasses: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/class/object-brick/classes`
                    }),
                providesTags: [
                    "Class Definition"
                ]
            }),
            classObjectBrickCollection: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/class/object-brick/collection`
                    }),
                providesTags: [
                    "Class Definition"
                ]
            }),
            classObjectBrickCreate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/object-brick`,
                        method: "POST",
                        body: queryArg.createObjectBrick
                    }),
                invalidatesTags: [
                    "Class Definition"
                ]
            }),
            classObjectBrickCustomLayoutGet: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/object-brick/${queryArg.key}/custom-layout/${queryArg.customLayoutId}`
                    }),
                providesTags: [
                    "Class Definition"
                ]
            }),
            classObjectBrickCustomLayoutUpdate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/object-brick/${queryArg.key}/custom-layout/${queryArg.customLayoutId}`,
                        method: "PUT",
                        body: queryArg.customLayoutUpdate
                    }),
                invalidatesTags: [
                    "Class Definition"
                ]
            }),
            classObjectBrickCustomLayoutDelete: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/object-brick/${queryArg.key}/custom-layout/${queryArg.customLayoutId}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Class Definition"
                ]
            }),
            classObjectBrickCustomLayoutExport: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/object-brick/${queryArg.key}/custom-layout/${queryArg.customLayoutId}/export`
                    }),
                providesTags: [
                    "Class Definition"
                ]
            }),
            classObjectBrickCustomLayoutImport: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/object-brick/${queryArg.key}/custom-layout/${queryArg.customLayoutId}/import`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Class Definition"
                ]
            }),
            classObjectBrickGetByKey: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/object-brick/${queryArg.key}`
                    }),
                providesTags: [
                    "Class Definition"
                ]
            }),
            classObjectBrickUpdate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/object-brick/${queryArg.key}`,
                        method: "PUT",
                        body: queryArg.objectBrickUpdate
                    }),
                invalidatesTags: [
                    "Class Definition"
                ]
            }),
            classObjectBrickDelete: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/object-brick/${queryArg.key}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Class Definition"
                ]
            }),
            classObjectBrickExport: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/object-brick/${queryArg.key}/export`
                    }),
                providesTags: [
                    "Class Definition"
                ]
            }),
            classObjectBrickImport: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/object-brick/${queryArg.key}/import`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
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
            classObjectBrickGetLayoutByKey: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/object-brick/${queryArg.key}/layout`
                    }),
                providesTags: [
                    "Class Definition"
                ]
            }),
            classObjectBrickGetTree: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/class/object-brick/tree`
                    }),
                providesTags: [
                    "Class Definition"
                ]
            }),
            classObjectBrickGetUsages: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/object-brick/${queryArg.key}/usages`
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

const { useClassGetAvailableVisibleFieldsQuery, useClassDefinitionCollectionQuery, useClassDefinitionCollectionCreatableQuery, useClassCustomLayoutCollectionQuery, useClassAllLayoutCollectionQuery, useClassCustomLayoutGetQuery, useClassCustomLayoutUpdateMutation, useClassCustomLayoutCreateMutation, useClassCustomLayoutDeleteMutation, useClassCustomLayoutEditorCollectionQuery, useClassCustomLayoutExportQuery, useClassCustomLayoutGetIdentifierDataQuery, useClassCustomLayoutImportMutation, useClassDefinitionGetBricksUsagesQuery, useClassDefinitionCreateMutation, useClassDefinitionGetByIdQuery, useClassDefinitionUpdateMutation, useClassDefinitionDeleteMutation, useClassDefinitionExportQuery, useClassDefinitionGetIdentifierDataQuery, useClassDefinitionImportMutation, useClassDefinitionGetLayoutByIdQuery, useClassGetSelectedVisibleFieldsQuery, useClassDefinitionGetTextLayoutPreviewQuery, useClassDefinitionGetTreeQuery, useClassFieldCollectionCollectionQuery, useClassFieldCollectionCreateMutation, useClassFieldCollectionGetByKeyQuery, useClassFieldCollectionUpdateMutation, useClassFieldCollectionDeleteMutation, useClassFieldCollectionExportQuery, useClassFieldCollectionImportMutation, useClassFieldCollectionObjectLayoutQuery, useClassFieldCollectionGetLayoutByKeyQuery, useClassFieldCollectionGetTreeQuery, useClassFieldCollectionGetUsagesQuery, useClassGetFieldsByTypeQuery, useClassDefinitionFolderCollectionQuery, useClassDefinitionGetQuery, useClassObjectBrickClassesQuery, useClassObjectBrickCollectionQuery, useClassObjectBrickCreateMutation, useClassObjectBrickCustomLayoutGetQuery, useClassObjectBrickCustomLayoutUpdateMutation, useClassObjectBrickCustomLayoutDeleteMutation, useClassObjectBrickCustomLayoutExportQuery, useClassObjectBrickCustomLayoutImportMutation, useClassObjectBrickGetByKeyQuery, useClassObjectBrickUpdateMutation, useClassObjectBrickDeleteMutation, useClassObjectBrickExportQuery, useClassObjectBrickImportMutation, useClassObjectBrickObjectLayoutQuery, useClassObjectBrickGetLayoutByKeyQuery, useClassObjectBrickGetTreeQuery, useClassObjectBrickGetUsagesQuery, useClassSelectOptionGetTreeQuery } = injectedRtkApi;

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