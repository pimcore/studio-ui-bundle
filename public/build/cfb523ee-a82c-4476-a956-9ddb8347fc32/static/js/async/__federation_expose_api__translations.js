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
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["__federation_expose_api__translations"], {
"./js/src/core/modules/app/translations/translations-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useTranslationCleanupByDomainMutation: () => (useTranslationCleanupByDomainMutation),
  useTranslationCreateMutation: () => (useTranslationCreateMutation),
  useTranslationDeleteByKeyMutation: () => (useTranslationDeleteByKeyMutation),
  useTranslationDetermineCsvSettingsForImportMutation: () => (useTranslationDetermineCsvSettingsForImportMutation),
  useTranslationExportListMutation: () => (useTranslationExportListMutation),
  useTranslationGetAvailableLocalesQuery: () => (useTranslationGetAvailableLocalesQuery),
  useTranslationGetCollectionMutation: () => (useTranslationGetCollectionMutation),
  useTranslationGetDomainsQuery: () => (useTranslationGetDomainsQuery),
  useTranslationGetListQuery: () => (useTranslationGetListQuery),
  useTranslationImportCsvMutation: () => (useTranslationImportCsvMutation),
  useTranslationUpdateMutation: () => (useTranslationUpdateMutation)
});
/* ESM import */var _sdk_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/sdk/api/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Translation"
];
const injectedRtkApi = _sdk_api__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            translationGetAvailableLocales: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/translations/available-locales`
                    }),
                providesTags: [
                    "Translation"
                ]
            }),
            translationCleanupByDomain: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/translations/${queryArg.domain}/cleanup`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Translation"
                ]
            }),
            translationCreate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/translations/create`,
                        method: "POST",
                        body: queryArg.createTranslation
                    }),
                invalidatesTags: [
                    "Translation"
                ]
            }),
            translationDetermineCsvSettingsForImport: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/translations/csv-settings`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Translation"
                ]
            }),
            translationDeleteByKey: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/translations/${queryArg.key}`,
                        method: "DELETE",
                        params: {
                            domain: queryArg.domain
                        }
                    }),
                invalidatesTags: [
                    "Translation"
                ]
            }),
            translationGetDomains: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/translations/domains`
                    }),
                providesTags: [
                    "Translation"
                ]
            }),
            translationExportList: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/translations/export`,
                        method: "POST",
                        body: queryArg.body,
                        params: {
                            domain: queryArg.domain
                        }
                    }),
                invalidatesTags: [
                    "Translation"
                ]
            }),
            translationImportCsv: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/translations/${queryArg.domain}/import`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Translation"
                ]
            }),
            translationGetList: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/translations/list`,
                        method: "POST",
                        body: queryArg.body,
                        params: {
                            domain: queryArg.domain
                        }
                    }),
                providesTags: [
                    "Translation"
                ]
            }),
            translationGetCollection: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/translations`,
                        method: "POST",
                        body: queryArg.translation
                    }),
                invalidatesTags: [
                    "Translation"
                ]
            }),
            translationUpdate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/translations/${queryArg.domain}`,
                        method: "PUT",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Translation"
                ]
            })
        }),
    overrideExisting: false
});

const { useTranslationGetAvailableLocalesQuery, useTranslationCleanupByDomainMutation, useTranslationCreateMutation, useTranslationDetermineCsvSettingsForImportMutation, useTranslationDeleteByKeyMutation, useTranslationGetDomainsQuery, useTranslationExportListMutation, useTranslationImportCsvMutation, useTranslationGetListQuery, useTranslationGetCollectionMutation, useTranslationUpdateMutation } = injectedRtkApi;

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
"./js/src/sdk/api/translations/index.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (/* reexport safe */ _Pimcore_modules_app_translations_translations_api_slice_gen__WEBPACK_IMPORTED_MODULE_0__.addTagTypes),
  api: () => (/* reexport safe */ _Pimcore_modules_app_translations_translations_api_slice_gen__WEBPACK_IMPORTED_MODULE_0__.api),
  useTranslationCleanupByDomainMutation: () => (/* reexport safe */ _Pimcore_modules_app_translations_translations_api_slice_gen__WEBPACK_IMPORTED_MODULE_0__.useTranslationCleanupByDomainMutation),
  useTranslationCreateMutation: () => (/* reexport safe */ _Pimcore_modules_app_translations_translations_api_slice_gen__WEBPACK_IMPORTED_MODULE_0__.useTranslationCreateMutation),
  useTranslationDeleteByKeyMutation: () => (/* reexport safe */ _Pimcore_modules_app_translations_translations_api_slice_gen__WEBPACK_IMPORTED_MODULE_0__.useTranslationDeleteByKeyMutation),
  useTranslationDetermineCsvSettingsForImportMutation: () => (/* reexport safe */ _Pimcore_modules_app_translations_translations_api_slice_gen__WEBPACK_IMPORTED_MODULE_0__.useTranslationDetermineCsvSettingsForImportMutation),
  useTranslationExportListMutation: () => (/* reexport safe */ _Pimcore_modules_app_translations_translations_api_slice_gen__WEBPACK_IMPORTED_MODULE_0__.useTranslationExportListMutation),
  useTranslationGetAvailableLocalesQuery: () => (/* reexport safe */ _Pimcore_modules_app_translations_translations_api_slice_gen__WEBPACK_IMPORTED_MODULE_0__.useTranslationGetAvailableLocalesQuery),
  useTranslationGetCollectionMutation: () => (/* reexport safe */ _Pimcore_modules_app_translations_translations_api_slice_gen__WEBPACK_IMPORTED_MODULE_0__.useTranslationGetCollectionMutation),
  useTranslationGetDomainsQuery: () => (/* reexport safe */ _Pimcore_modules_app_translations_translations_api_slice_gen__WEBPACK_IMPORTED_MODULE_0__.useTranslationGetDomainsQuery),
  useTranslationGetListQuery: () => (/* reexport safe */ _Pimcore_modules_app_translations_translations_api_slice_gen__WEBPACK_IMPORTED_MODULE_0__.useTranslationGetListQuery),
  useTranslationImportCsvMutation: () => (/* reexport safe */ _Pimcore_modules_app_translations_translations_api_slice_gen__WEBPACK_IMPORTED_MODULE_0__.useTranslationImportCsvMutation),
  useTranslationUpdateMutation: () => (/* reexport safe */ _Pimcore_modules_app_translations_translations_api_slice_gen__WEBPACK_IMPORTED_MODULE_0__.useTranslationUpdateMutation)
});
/* ESM import */var _Pimcore_modules_app_translations_translations_api_slice_gen__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/app/translations/translations-api-slice.gen.ts");
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
//# sourceMappingURL=__federation_expose_api__translations.js.map