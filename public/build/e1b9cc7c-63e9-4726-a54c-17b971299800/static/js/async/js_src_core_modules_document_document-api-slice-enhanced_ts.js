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
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["js_src_core_modules_document_document-api-slice-enhanced_ts"], {
"./js/src/core/modules/document/document-api-slice-enhanced.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  api: () => (api),
  useDocumentAddMutation: () => (useDocumentAddMutation),
  useDocumentAddTranslationMutation: () => (useDocumentAddTranslationMutation),
  useDocumentAvailableControllersListQuery: () => (useDocumentAvailableControllersListQuery),
  useDocumentAvailableTemplatesListQuery: () => (useDocumentAvailableTemplatesListQuery),
  useDocumentCloneMutation: () => (useDocumentCloneMutation),
  useDocumentDeleteSiteMutation: () => (useDocumentDeleteSiteMutation),
  useDocumentDeleteTranslationMutation: () => (useDocumentDeleteTranslationMutation),
  useDocumentDocTypeAddMutation: () => (useDocumentDocTypeAddMutation),
  useDocumentDocTypeDeleteMutation: () => (useDocumentDocTypeDeleteMutation),
  useDocumentDocTypeListQuery: () => (useDocumentDocTypeListQuery),
  useDocumentDocTypeTypeListQuery: () => (useDocumentDocTypeTypeListQuery),
  useDocumentDocTypeUpdateByIdMutation: () => (useDocumentDocTypeUpdateByIdMutation),
  useDocumentGetByIdQuery: () => (useDocumentGetByIdQuery),
  useDocumentGetSiteQuery: () => (useDocumentGetSiteQuery),
  useDocumentGetTranslationParentByLanguageQuery: () => (useDocumentGetTranslationParentByLanguageQuery),
  useDocumentGetTranslationsQuery: () => (useDocumentGetTranslationsQuery),
  useDocumentGetTreeQuery: () => (useDocumentGetTreeQuery),
  useDocumentPageSnippetAreaBlockRenderQuery: () => (useDocumentPageSnippetAreaBlockRenderQuery),
  useDocumentPageSnippetChangeMainDocumentMutation: () => (useDocumentPageSnippetChangeMainDocumentMutation),
  useDocumentRenderletRenderQuery: () => (useDocumentRenderletRenderQuery),
  useDocumentUpdateByIdMutation: () => (useDocumentUpdateByIdMutation),
  useDocumentUpdateSiteMutation: () => (useDocumentUpdateSiteMutation),
  useDocumentsListAvailableSitesQuery: () => (useDocumentsListAvailableSitesQuery),
  useLazyDocumentGetSiteQuery: () => (useLazyDocumentGetSiteQuery),
  useLazyDocumentGetTranslationsQuery: () => (useLazyDocumentGetTranslationsQuery),
  useLazyDocumentPageSnippetAreaBlockRenderQuery: () => (useLazyDocumentPageSnippetAreaBlockRenderQuery)
});
/* ESM import */var _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/tags.ts");
/* ESM import */var _document_api_slice_gen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/document/document-api-slice.gen.ts");
/* ESM import */var _sdk_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/sdk/api/index.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
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



const api = _document_api_slice_gen__WEBPACK_IMPORTED_MODULE_1__.api.enhanceEndpoints({
    addTagTypes: [
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.DOCUMENT,
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.DOCUMENT_TREE,
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.DOCUMENT_DETAIL,
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.DOCUMENT_TYPES,
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.DOCUMENT_SITE
    ],
    endpoints: {
        documentClone: {
            invalidatesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.DOCUMENT_TREE_ID(args.parentId)
        },
        documentGetById: {
            providesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.DOCUMENT_DETAIL_ID(args.id)
        },
        documentGetTree: {
            providesTags: (result, error, args)=>args.parentId !== undefined ? _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.DOCUMENT_TREE_ID(args.parentId) : _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.DOCUMENT_TREE()
        },
        documentDocTypeList: {
            providesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.DOCUMENT_TYPES()
        },
        documentDocTypeDelete: {
            invalidatesTags: ()=>[]
        },
        documentDocTypeUpdateById: {
            invalidatesTags: ()=>[]
        },
        documentDocTypeAdd: {
            invalidatesTags: ()=>[]
        },
        documentUpdateById: {
            invalidatesTags: (result, error, args)=>args.body.data.task === 'autoSave' ? [] : _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.DOCUMENT_DETAIL_ID(args.id)
        },
        documentAdd: {
            invalidatesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.DOCUMENT_TREE_ID(args.parentId)
        },
        documentGetSite: {
            providesTags: ()=>[]
        },
        documentUpdateSite: {
            invalidatesTags: ()=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.DOCUMENT_SITE()
        },
        documentDeleteSite: {
            invalidatesTags: ()=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.DOCUMENT_SITE()
        },
        documentsListAvailableSites: {
            providesTags: ()=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.DOCUMENT_SITE()
        },
        documentGetTranslations: {
            providesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.DOCUMENT_DETAIL_ID(args.id)
        },
        documentAddTranslation: {
            invalidatesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.DOCUMENT_DETAIL_ID(args.id)
        },
        documentDeleteTranslation: {
            invalidatesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.DOCUMENT_DETAIL_ID(args.id)
        }
    }
}).injectEndpoints({
    endpoints: (build)=>({
            documentRenderletRender: build.query({
                queryFn: async (arg, api, extraOptions, baseQuery)=>{
                    const result = await baseQuery({
                        url: `${(0,_sdk_api__WEBPACK_IMPORTED_MODULE_2__.getPrefix)()}/documents/renderlet/render`,
                        params: {
                            id: arg.id,
                            type: arg.type,
                            controller: arg.controller,
                            parentDocumentId: arg.parentDocumentId,
                            template: arg.template
                        },
                        responseHandler: async (response)=>await response.blob()
                    });
                    if (!(0,lodash__WEBPACK_IMPORTED_MODULE_3__.isNil)(result.error)) {
                        if (result.error.data instanceof Blob) {
                            try {
                                const text = await result.error.data.text();
                                const jsonData = JSON.parse(text);
                                return {
                                    error: {
                                        ...result.error,
                                        data: jsonData
                                    }
                                };
                            } catch  {
                                return {
                                    error: result.error
                                };
                            }
                        }
                        return {
                            error: result.error
                        };
                    }
                    return {
                        data: result.data
                    };
                },
                providesTags: [
                    'Documents'
                ]
            })
        }),
    overrideExisting: true
});
const { useDocumentAddMutation, useDocumentCloneMutation, useDocumentGetByIdQuery, useDocumentUpdateByIdMutation, useDocumentGetTreeQuery, useDocumentAvailableTemplatesListQuery, useDocumentDocTypeListQuery, useDocumentDocTypeTypeListQuery, useDocumentAvailableControllersListQuery, useDocumentDocTypeAddMutation, useDocumentDocTypeUpdateByIdMutation, useDocumentDocTypeDeleteMutation, useDocumentPageSnippetChangeMainDocumentMutation, useDocumentPageSnippetAreaBlockRenderQuery, useLazyDocumentPageSnippetAreaBlockRenderQuery, useDocumentRenderletRenderQuery, useDocumentsListAvailableSitesQuery, useDocumentGetSiteQuery, useLazyDocumentGetSiteQuery, useDocumentUpdateSiteMutation, useDocumentDeleteSiteMutation, useDocumentGetTranslationsQuery, useLazyDocumentGetTranslationsQuery, useDocumentAddTranslationMutation, useDocumentDeleteTranslationMutation, useDocumentGetTranslationParentByLanguageQuery } = api;


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
"./js/src/core/modules/document/document-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useDocumentAddMutation: () => (useDocumentAddMutation),
  useDocumentAddTranslationMutation: () => (useDocumentAddTranslationMutation),
  useDocumentAvailableControllersListQuery: () => (useDocumentAvailableControllersListQuery),
  useDocumentAvailableTemplatesListQuery: () => (useDocumentAvailableTemplatesListQuery),
  useDocumentCloneMutation: () => (useDocumentCloneMutation),
  useDocumentConvertMutation: () => (useDocumentConvertMutation),
  useDocumentDeleteSiteMutation: () => (useDocumentDeleteSiteMutation),
  useDocumentDeleteTranslationMutation: () => (useDocumentDeleteTranslationMutation),
  useDocumentDocTypeAddMutation: () => (useDocumentDocTypeAddMutation),
  useDocumentDocTypeDeleteMutation: () => (useDocumentDocTypeDeleteMutation),
  useDocumentDocTypeListQuery: () => (useDocumentDocTypeListQuery),
  useDocumentDocTypeTypeListQuery: () => (useDocumentDocTypeTypeListQuery),
  useDocumentDocTypeUpdateByIdMutation: () => (useDocumentDocTypeUpdateByIdMutation),
  useDocumentGetByIdQuery: () => (useDocumentGetByIdQuery),
  useDocumentGetSiteQuery: () => (useDocumentGetSiteQuery),
  useDocumentGetTranslationParentByLanguageQuery: () => (useDocumentGetTranslationParentByLanguageQuery),
  useDocumentGetTranslationsQuery: () => (useDocumentGetTranslationsQuery),
  useDocumentGetTreeQuery: () => (useDocumentGetTreeQuery),
  useDocumentPageCheckPrettyUrlMutation: () => (useDocumentPageCheckPrettyUrlMutation),
  useDocumentPageSnippetAreaBlockRenderQuery: () => (useDocumentPageSnippetAreaBlockRenderQuery),
  useDocumentPageSnippetChangeMainDocumentMutation: () => (useDocumentPageSnippetChangeMainDocumentMutation),
  useDocumentPageStreamPreviewQuery: () => (useDocumentPageStreamPreviewQuery),
  useDocumentRenderletRenderQuery: () => (useDocumentRenderletRenderQuery),
  useDocumentReplaceContentMutation: () => (useDocumentReplaceContentMutation),
  useDocumentUpdateByIdMutation: () => (useDocumentUpdateByIdMutation),
  useDocumentUpdateSiteMutation: () => (useDocumentUpdateSiteMutation),
  useDocumentsListAvailableSitesQuery: () => (useDocumentsListAvailableSitesQuery)
});
/* ESM import */var _sdk_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/sdk/api/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Documents"
];
const injectedRtkApi = _sdk_api__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            documentAdd: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/documents/add/${queryArg.parentId}`,
                        method: "POST",
                        body: queryArg.documentAddParameters
                    }),
                invalidatesTags: [
                    "Documents"
                ]
            }),
            documentClone: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/documents/${queryArg.id}/clone/${queryArg.parentId}`,
                        method: "POST",
                        body: queryArg.documentCloneParameters
                    }),
                invalidatesTags: [
                    "Documents"
                ]
            }),
            documentConvert: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/documents/${queryArg.id}/convert/${queryArg["type"]}`,
                        method: "POST"
                    }),
                invalidatesTags: [
                    "Documents"
                ]
            }),
            documentDocTypeAdd: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/documents/doc-types/add`,
                        method: "POST",
                        body: queryArg.docTypeAddParameters
                    }),
                invalidatesTags: [
                    "Documents"
                ]
            }),
            documentDocTypeUpdateById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/documents/doc-types/${queryArg.id}`,
                        method: "PUT",
                        body: queryArg.docTypeUpdateParameters
                    }),
                invalidatesTags: [
                    "Documents"
                ]
            }),
            documentDocTypeDelete: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/documents/doc-types/${queryArg.id}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Documents"
                ]
            }),
            documentDocTypeTypeList: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/documents/doc-types/types`
                    }),
                providesTags: [
                    "Documents"
                ]
            }),
            documentDocTypeList: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/documents/doc-types`,
                        params: {
                            type: queryArg["type"]
                        }
                    }),
                providesTags: [
                    "Documents"
                ]
            }),
            documentGetById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/documents/${queryArg.id}`
                    }),
                providesTags: [
                    "Documents"
                ]
            }),
            documentUpdateById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/documents/${queryArg.id}`,
                        method: "PUT",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Documents"
                ]
            }),
            documentPageCheckPrettyUrl: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/documents/${queryArg.id}/page/check-pretty-url`,
                        method: "POST",
                        body: queryArg.checkPrettyUrl
                    }),
                invalidatesTags: [
                    "Documents"
                ]
            }),
            documentPageStreamPreview: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/documents/${queryArg.id}/page/stream/preview`
                    }),
                providesTags: [
                    "Documents"
                ]
            }),
            documentAvailableControllersList: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/documents/get-available-controllers`
                    }),
                providesTags: [
                    "Documents"
                ]
            }),
            documentAvailableTemplatesList: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/documents/get-available-templates`
                    }),
                providesTags: [
                    "Documents"
                ]
            }),
            documentPageSnippetChangeMainDocument: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/documents/${queryArg.id}/page-snippet/change-main-document`,
                        method: "PUT",
                        body: queryArg.changeMainDocument
                    }),
                invalidatesTags: [
                    "Documents"
                ]
            }),
            documentPageSnippetAreaBlockRender: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/documents/page-snippet/${queryArg.id}/area-block/render`,
                        method: "POST",
                        body: queryArg.body
                    }),
                providesTags: [
                    "Documents"
                ]
            }),
            documentRenderletRender: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/documents/renderlet/render`,
                        params: {
                            id: queryArg.id,
                            type: queryArg["type"],
                            controller: queryArg.controller,
                            parentDocumentId: queryArg.parentDocumentId,
                            template: queryArg.template
                        }
                    }),
                providesTags: [
                    "Documents"
                ]
            }),
            documentReplaceContent: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/documents/${queryArg.sourceId}/replace/${queryArg.targetId}`,
                        method: "POST"
                    }),
                invalidatesTags: [
                    "Documents"
                ]
            }),
            documentsListAvailableSites: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/documents/sites/list-available`,
                        params: {
                            excludeMainSite: queryArg.excludeMainSite
                        }
                    }),
                providesTags: [
                    "Documents"
                ]
            }),
            documentUpdateSite: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/documents/site/${queryArg.id}`,
                        method: "POST",
                        body: queryArg.updateSite
                    }),
                invalidatesTags: [
                    "Documents"
                ]
            }),
            documentDeleteSite: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/documents/site/${queryArg.id}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Documents"
                ]
            }),
            documentGetSite: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/documents/site/${queryArg.documentId}`
                    }),
                providesTags: [
                    "Documents"
                ]
            }),
            documentAddTranslation: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/documents/translations/${queryArg.id}/add/${queryArg.translationId}`,
                        method: "POST"
                    }),
                invalidatesTags: [
                    "Documents"
                ]
            }),
            documentDeleteTranslation: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/documents/translations/${queryArg.id}/delete/${queryArg.translationId}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Documents"
                ]
            }),
            documentGetTranslations: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/documents/translations/${queryArg.id}`
                    }),
                providesTags: [
                    "Documents"
                ]
            }),
            documentGetTranslationParentByLanguage: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/documents/translations/${queryArg.id}/get-parent/${queryArg.language}`
                    }),
                providesTags: [
                    "Documents"
                ]
            }),
            documentGetTree: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/documents/tree`,
                        params: {
                            page: queryArg.page,
                            pageSize: queryArg.pageSize,
                            parentId: queryArg.parentId,
                            idSearchTerm: queryArg.idSearchTerm,
                            pqlQuery: queryArg.pqlQuery,
                            excludeFolders: queryArg.excludeFolders,
                            path: queryArg.path,
                            pathIncludeParent: queryArg.pathIncludeParent,
                            pathIncludeDescendants: queryArg.pathIncludeDescendants
                        }
                    }),
                providesTags: [
                    "Documents"
                ]
            })
        }),
    overrideExisting: false
});

const { useDocumentAddMutation, useDocumentCloneMutation, useDocumentConvertMutation, useDocumentDocTypeAddMutation, useDocumentDocTypeUpdateByIdMutation, useDocumentDocTypeDeleteMutation, useDocumentDocTypeTypeListQuery, useDocumentDocTypeListQuery, useDocumentGetByIdQuery, useDocumentUpdateByIdMutation, useDocumentPageCheckPrettyUrlMutation, useDocumentPageStreamPreviewQuery, useDocumentAvailableControllersListQuery, useDocumentAvailableTemplatesListQuery, useDocumentPageSnippetChangeMainDocumentMutation, useDocumentPageSnippetAreaBlockRenderQuery, useDocumentRenderletRenderQuery, useDocumentReplaceContentMutation, useDocumentsListAvailableSitesQuery, useDocumentUpdateSiteMutation, useDocumentDeleteSiteMutation, useDocumentGetSiteQuery, useDocumentAddTranslationMutation, useDocumentDeleteTranslationMutation, useDocumentGetTranslationsQuery, useDocumentGetTranslationParentByLanguageQuery, useDocumentGetTreeQuery } = injectedRtkApi;

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
//# sourceMappingURL=js_src_core_modules_document_document-api-slice-enhanced_ts.js.map