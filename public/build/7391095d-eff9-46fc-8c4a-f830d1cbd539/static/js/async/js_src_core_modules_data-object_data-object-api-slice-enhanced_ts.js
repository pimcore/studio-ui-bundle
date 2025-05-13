"use strict";
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["js_src_core_modules_data-object_data-object-api-slice-enhanced_ts"], {
"./js/src/core/app/api/pimcore/route.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  getPrefix: () => (getPrefix)
});
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
*/ function getPrefix() {
    return '/pimcore-studio/api';
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
"./js/src/core/modules/data-object/data-object-api-slice-enhanced.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  api: () => (api),
  useDataObjectAddMutation: () => (useDataObjectAddMutation),
  useDataObjectCloneMutation: () => (useDataObjectCloneMutation),
  useDataObjectGetByIdQuery: () => (useDataObjectGetByIdQuery),
  useDataObjectGetLayoutByIdQuery: () => (useDataObjectGetLayoutByIdQuery),
  useDataObjectGetTreeQuery: () => (useDataObjectGetTreeQuery),
  useDataObjectPatchByIdMutation: () => (useDataObjectPatchByIdMutation),
  useDataObjectPatchFolderByIdMutation: () => (useDataObjectPatchFolderByIdMutation),
  useDataObjectUpdateByIdMutation: () => (useDataObjectUpdateByIdMutation)
});
/* ESM import */var _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/tags.ts");
/* ESM import */var _data_object_api_slice_gen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/data-object/data-object-api-slice.gen.ts");
/* ESM import */var _Pimcore_app_api_pimcore_route__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/app/api/pimcore/route.ts");
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


const api = _data_object_api_slice_gen__WEBPACK_IMPORTED_MODULE_1__.api.enhanceEndpoints({
    addTagTypes: [
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.DATA_OBJECT,
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.DATA_OBJECT_TREE,
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.DATA_OBJECT_DETAIL
    ],
    endpoints: {
        dataObjectClone: {
            invalidatesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.DATA_OBJECT_TREE_ID(args.parentId)
        },
        dataObjectGetById: {
            providesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.DATA_OBJECT_DETAIL_ID(args.id)
        },
        dataObjectGetTree: {
            providesTags: (result, error, args)=>args.parentId !== undefined ? _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.DATA_OBJECT_TREE_ID(args.parentId) : _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.DATA_OBJECT_TREE()
        },
        dataObjectGetGrid: {
            keepUnusedDataFor: 10,
            providesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.DATA_OBJECT_GRID_ID(args.body.folderId)
        },
        dataObjectUpdateById: {
            invalidatesTags: (result, error, args)=>args.body.data.task === 'autoSave' ? [] : _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.DATA_OBJECT_DETAIL_ID(args.id)
        },
        dataObjectAdd: {
            invalidatesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.DATA_OBJECT_TREE_ID(args.parentId)
        },
        dataObjectGetLayoutById: {
            query: (queryArg)=>({
                    url: queryArg.layoutId === undefined ? `${(0,_Pimcore_app_api_pimcore_route__WEBPACK_IMPORTED_MODULE_2__.getPrefix)()}/data-objects/${queryArg.id}/layout` : `${(0,_Pimcore_app_api_pimcore_route__WEBPACK_IMPORTED_MODULE_2__.getPrefix)()}/data-objects/${queryArg.id}/layout/${queryArg.layoutId}`
                }),
            providesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.DATA_OBJECT_DETAIL_ID(args.id)
        },
        dataObjectPatchById: {
            invalidatesTags: (result, error, args)=>{
                const invalidatingTagsForPatch = [];
                for (const dataObject of args.body.data){
                    invalidatingTagsForPatch.push(..._Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.DATA_OBJECT_DETAIL_ID(dataObject.id));
                }
                return invalidatingTagsForPatch;
            }
        }
    }
});
const { useDataObjectAddMutation, useDataObjectCloneMutation, useDataObjectGetByIdQuery, useDataObjectUpdateByIdMutation, useDataObjectPatchByIdMutation, useDataObjectPatchFolderByIdMutation, useDataObjectGetTreeQuery, useDataObjectGetLayoutByIdQuery } = api;


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
"./js/src/core/modules/data-object/data-object-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useDataObjectAddMutation: () => (useDataObjectAddMutation),
  useDataObjectCloneMutation: () => (useDataObjectCloneMutation),
  useDataObjectDeleteGridConfigurationByConfigurationIdMutation: () => (useDataObjectDeleteGridConfigurationByConfigurationIdMutation),
  useDataObjectFormatPathMutation: () => (useDataObjectFormatPathMutation),
  useDataObjectGetAvailableGridColumnsQuery: () => (useDataObjectGetAvailableGridColumnsQuery),
  useDataObjectGetByIdQuery: () => (useDataObjectGetByIdQuery),
  useDataObjectGetGridConfigurationQuery: () => (useDataObjectGetGridConfigurationQuery),
  useDataObjectGetGridQuery: () => (useDataObjectGetGridQuery),
  useDataObjectGetLayoutByIdQuery: () => (useDataObjectGetLayoutByIdQuery),
  useDataObjectGetSearchConfigurationQuery: () => (useDataObjectGetSearchConfigurationQuery),
  useDataObjectGetSearchQuery: () => (useDataObjectGetSearchQuery),
  useDataObjectGetSelectOptionsMutation: () => (useDataObjectGetSelectOptionsMutation),
  useDataObjectGetTreeQuery: () => (useDataObjectGetTreeQuery),
  useDataObjectListSavedGridConfigurationsQuery: () => (useDataObjectListSavedGridConfigurationsQuery),
  useDataObjectPatchByIdMutation: () => (useDataObjectPatchByIdMutation),
  useDataObjectPatchFolderByIdMutation: () => (useDataObjectPatchFolderByIdMutation),
  useDataObjectPreviewByIdQuery: () => (useDataObjectPreviewByIdQuery),
  useDataObjectReplaceContentMutation: () => (useDataObjectReplaceContentMutation),
  useDataObjectSaveGridConfigurationMutation: () => (useDataObjectSaveGridConfigurationMutation),
  useDataObjectSetGridConfigurationAsFavoriteMutation: () => (useDataObjectSetGridConfigurationAsFavoriteMutation),
  useDataObjectUpdateByIdMutation: () => (useDataObjectUpdateByIdMutation),
  useDataObjectUpdateGridConfigurationMutation: () => (useDataObjectUpdateGridConfigurationMutation)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Data Objects",
    "Data Object Grid",
    "Search"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            dataObjectAdd: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-objects/add/${queryArg.parentId}`,
                        method: "POST",
                        body: queryArg.dataObjectAddParameters
                    }),
                invalidatesTags: [
                    "Data Objects"
                ]
            }),
            dataObjectClone: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-objects/${queryArg.id}/clone/${queryArg.parentId}`,
                        method: "POST",
                        body: queryArg.cloneParameters
                    }),
                invalidatesTags: [
                    "Data Objects"
                ]
            }),
            dataObjectGetById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-objects/${queryArg.id}`
                    }),
                providesTags: [
                    "Data Objects"
                ]
            }),
            dataObjectUpdateById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-objects/${queryArg.id}`,
                        method: "PUT",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Data Objects"
                ]
            }),
            dataObjectDeleteGridConfigurationByConfigurationId: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-object/grid/configuration/${queryArg.configurationId}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Data Object Grid"
                ]
            }),
            dataObjectGetGridConfiguration: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-object/grid/configuration/${queryArg.folderId}/${queryArg.classId}`,
                        params: {
                            configurationId: queryArg.configurationId
                        }
                    }),
                providesTags: [
                    "Data Object Grid"
                ]
            }),
            dataObjectListSavedGridConfigurations: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-object/grid/configurations/${queryArg.classId}`
                    }),
                providesTags: [
                    "Data Object Grid"
                ]
            }),
            dataObjectSaveGridConfiguration: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-object/grid/configuration/save/${queryArg.classId}`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Data Object Grid"
                ]
            }),
            dataObjectSetGridConfigurationAsFavorite: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-object/grid/configuration/set-as-favorite/${queryArg.configurationId}/${queryArg.folderId}`,
                        method: "POST"
                    }),
                invalidatesTags: [
                    "Data Object Grid"
                ]
            }),
            dataObjectUpdateGridConfiguration: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-object/grid/configuration/update/${queryArg.configurationId}`,
                        method: "PUT",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Data Object Grid"
                ]
            }),
            dataObjectGetAvailableGridColumns: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-object/grid/available-columns/${queryArg.classId}/${queryArg.folderId}`
                    }),
                providesTags: [
                    "Data Object Grid"
                ]
            }),
            dataObjectGetGrid: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-objects/grid/${queryArg.classId}`,
                        method: "POST",
                        body: queryArg.body
                    }),
                providesTags: [
                    "Data Object Grid"
                ]
            }),
            dataObjectGetLayoutById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-objects/${queryArg.id}/layout/${queryArg.layoutId}`
                    }),
                providesTags: [
                    "Data Objects"
                ]
            }),
            dataObjectPatchById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-objects`,
                        method: "PATCH",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Data Objects"
                ]
            }),
            dataObjectPatchFolderById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-objects/folder`,
                        method: "PATCH",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Data Objects"
                ]
            }),
            dataObjectFormatPath: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-objects/format-path`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Data Objects"
                ]
            }),
            dataObjectPreviewById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-objects/preview/${queryArg.id}`,
                        params: {
                            site: queryArg.site
                        }
                    }),
                providesTags: [
                    "Data Objects"
                ]
            }),
            dataObjectReplaceContent: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-objects/${queryArg.sourceId}/replace/${queryArg.targetId}`,
                        method: "POST"
                    }),
                invalidatesTags: [
                    "Data Objects"
                ]
            }),
            dataObjectGetSelectOptions: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-objects/select-options`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Data Objects"
                ]
            }),
            dataObjectGetTree: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-objects/tree`,
                        params: {
                            page: queryArg.page,
                            pageSize: queryArg.pageSize,
                            parentId: queryArg.parentId,
                            idSearchTerm: queryArg.idSearchTerm,
                            pqlQuery: queryArg.pqlQuery,
                            excludeFolders: queryArg.excludeFolders,
                            path: queryArg.path,
                            pathIncludeParent: queryArg.pathIncludeParent,
                            pathIncludeDescendants: queryArg.pathIncludeDescendants,
                            className: queryArg.className,
                            classIds: queryArg.classIds
                        }
                    }),
                providesTags: [
                    "Data Objects"
                ]
            }),
            dataObjectGetSearchConfiguration: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/search/configuration/data-objects`,
                        params: {
                            classId: queryArg.classId
                        }
                    }),
                providesTags: [
                    "Search"
                ]
            }),
            dataObjectGetSearch: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/search/data-objects`,
                        method: "POST",
                        body: queryArg.body,
                        params: {
                            classId: queryArg.classId
                        }
                    }),
                providesTags: [
                    "Search"
                ]
            })
        }),
    overrideExisting: false
});

const { useDataObjectAddMutation, useDataObjectCloneMutation, useDataObjectGetByIdQuery, useDataObjectUpdateByIdMutation, useDataObjectDeleteGridConfigurationByConfigurationIdMutation, useDataObjectGetGridConfigurationQuery, useDataObjectListSavedGridConfigurationsQuery, useDataObjectSaveGridConfigurationMutation, useDataObjectSetGridConfigurationAsFavoriteMutation, useDataObjectUpdateGridConfigurationMutation, useDataObjectGetAvailableGridColumnsQuery, useDataObjectGetGridQuery, useDataObjectGetLayoutByIdQuery, useDataObjectPatchByIdMutation, useDataObjectPatchFolderByIdMutation, useDataObjectFormatPathMutation, useDataObjectPreviewByIdQuery, useDataObjectReplaceContentMutation, useDataObjectGetSelectOptionsMutation, useDataObjectGetTreeQuery, useDataObjectGetSearchConfigurationQuery, useDataObjectGetSearchQuery } = injectedRtkApi;

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
//# sourceMappingURL=js_src_core_modules_data-object_data-object-api-slice-enhanced_ts.js.map