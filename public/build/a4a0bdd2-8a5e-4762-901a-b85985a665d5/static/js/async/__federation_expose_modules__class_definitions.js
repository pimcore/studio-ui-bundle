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
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["__federation_expose_modules__class_definitions"], {
"./js/src/core/modules/class-definition/class-definition-slice-enhanced.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  api: () => (api),
  useClassCustomLayoutCollectionQuery: () => (useClassCustomLayoutCollectionQuery),
  useClassCustomLayoutEditorCollectionQuery: () => (useClassCustomLayoutEditorCollectionQuery),
  useClassDefinitionCollectionQuery: () => (useClassDefinitionCollectionQuery),
  useClassDefinitionFolderCollectionQuery: () => (useClassDefinitionFolderCollectionQuery),
  useClassDefinitionGetQuery: () => (useClassDefinitionGetQuery),
  useClassFieldCollectionObjectLayoutQuery: () => (useClassFieldCollectionObjectLayoutQuery),
  useClassObjectBrickObjectLayoutQuery: () => (useClassObjectBrickObjectLayoutQuery),
  usePimcoreStudioApiClassCustomLayoutCreateMutation: () => (usePimcoreStudioApiClassCustomLayoutCreateMutation),
  usePimcoreStudioApiClassCustomLayoutDeleteMutation: () => (usePimcoreStudioApiClassCustomLayoutDeleteMutation),
  usePimcoreStudioApiClassCustomLayoutExportQuery: () => (usePimcoreStudioApiClassCustomLayoutExportQuery),
  usePimcoreStudioApiClassCustomLayoutGetQuery: () => (usePimcoreStudioApiClassCustomLayoutGetQuery),
  usePimcoreStudioApiClassCustomLayoutImportMutation: () => (usePimcoreStudioApiClassCustomLayoutImportMutation),
  usePimcoreStudioApiClassCustomLayoutUpdateMutation: () => (usePimcoreStudioApiClassCustomLayoutUpdateMutation)
});
/* ESM import */var _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/tags.ts");
/* ESM import */var _class_definition_slice_gen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/class-definition/class-definition-slice.gen.ts");
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

const api = _class_definition_slice_gen__WEBPACK_IMPORTED_MODULE_1__.api.enhanceEndpoints({
    addTagTypes: [
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.DATA_OBJECT,
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.DATA_OBJECT_DETAIL
    ],
    endpoints: {
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
const { useClassDefinitionCollectionQuery, useClassDefinitionFolderCollectionQuery, useClassCustomLayoutCollectionQuery, usePimcoreStudioApiClassCustomLayoutCreateMutation, usePimcoreStudioApiClassCustomLayoutGetQuery, usePimcoreStudioApiClassCustomLayoutUpdateMutation, usePimcoreStudioApiClassCustomLayoutDeleteMutation, useClassCustomLayoutEditorCollectionQuery, usePimcoreStudioApiClassCustomLayoutExportQuery, usePimcoreStudioApiClassCustomLayoutImportMutation, useClassFieldCollectionObjectLayoutQuery, useClassDefinitionGetQuery, useClassObjectBrickObjectLayoutQuery } = api;


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
  useClassCustomLayoutCollectionQuery: () => (useClassCustomLayoutCollectionQuery),
  useClassCustomLayoutEditorCollectionQuery: () => (useClassCustomLayoutEditorCollectionQuery),
  useClassDefinitionCollectionQuery: () => (useClassDefinitionCollectionQuery),
  useClassDefinitionFolderCollectionQuery: () => (useClassDefinitionFolderCollectionQuery),
  useClassDefinitionGetQuery: () => (useClassDefinitionGetQuery),
  useClassFieldCollectionObjectLayoutQuery: () => (useClassFieldCollectionObjectLayoutQuery),
  useClassObjectBrickObjectLayoutQuery: () => (useClassObjectBrickObjectLayoutQuery),
  usePimcoreStudioApiClassCustomLayoutCreateMutation: () => (usePimcoreStudioApiClassCustomLayoutCreateMutation),
  usePimcoreStudioApiClassCustomLayoutDeleteMutation: () => (usePimcoreStudioApiClassCustomLayoutDeleteMutation),
  usePimcoreStudioApiClassCustomLayoutExportQuery: () => (usePimcoreStudioApiClassCustomLayoutExportQuery),
  usePimcoreStudioApiClassCustomLayoutGetQuery: () => (usePimcoreStudioApiClassCustomLayoutGetQuery),
  usePimcoreStudioApiClassCustomLayoutImportMutation: () => (usePimcoreStudioApiClassCustomLayoutImportMutation),
  usePimcoreStudioApiClassCustomLayoutUpdateMutation: () => (usePimcoreStudioApiClassCustomLayoutUpdateMutation)
});
/* ESM import */var _sdk_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/sdk/api/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Class Definition"
];
const injectedRtkApi = _sdk_api__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            classDefinitionCollection: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/class/collection`
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
            pimcoreStudioApiClassCustomLayoutCreate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/${queryArg.customLayoutId}`,
                        method: "POST",
                        body: queryArg.customLayoutNew
                    }),
                invalidatesTags: [
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
            pimcoreStudioApiClassCustomLayoutImport: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/custom-layout/import/${queryArg.customLayoutId}`,
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
            })
        }),
    overrideExisting: false
});

const { useClassDefinitionCollectionQuery, useClassCustomLayoutCollectionQuery, usePimcoreStudioApiClassCustomLayoutCreateMutation, usePimcoreStudioApiClassCustomLayoutGetQuery, usePimcoreStudioApiClassCustomLayoutUpdateMutation, usePimcoreStudioApiClassCustomLayoutDeleteMutation, useClassCustomLayoutEditorCollectionQuery, usePimcoreStudioApiClassCustomLayoutExportQuery, usePimcoreStudioApiClassCustomLayoutImportMutation, useClassFieldCollectionObjectLayoutQuery, useClassDefinitionFolderCollectionQuery, useClassDefinitionGetQuery, useClassObjectBrickObjectLayoutQuery } = injectedRtkApi;

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
"./js/src/sdk/modules/class-definitions/index.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  api: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.api),
  useClassCustomLayoutCollectionQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassCustomLayoutCollectionQuery),
  useClassCustomLayoutEditorCollectionQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassCustomLayoutEditorCollectionQuery),
  useClassDefinitionCollectionQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassDefinitionCollectionQuery),
  useClassDefinitionFolderCollectionQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassDefinitionFolderCollectionQuery),
  useClassDefinitionGetQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassDefinitionGetQuery),
  useClassFieldCollectionObjectLayoutQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassFieldCollectionObjectLayoutQuery),
  useClassObjectBrickObjectLayoutQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassObjectBrickObjectLayoutQuery),
  usePimcoreStudioApiClassCustomLayoutCreateMutation: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.usePimcoreStudioApiClassCustomLayoutCreateMutation),
  usePimcoreStudioApiClassCustomLayoutDeleteMutation: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.usePimcoreStudioApiClassCustomLayoutDeleteMutation),
  usePimcoreStudioApiClassCustomLayoutExportQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.usePimcoreStudioApiClassCustomLayoutExportQuery),
  usePimcoreStudioApiClassCustomLayoutGetQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.usePimcoreStudioApiClassCustomLayoutGetQuery),
  usePimcoreStudioApiClassCustomLayoutImportMutation: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.usePimcoreStudioApiClassCustomLayoutImportMutation),
  usePimcoreStudioApiClassCustomLayoutUpdateMutation: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.usePimcoreStudioApiClassCustomLayoutUpdateMutation)
});
/* ESM import */var _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/class-definition/class-definition-slice-enhanced.ts");
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