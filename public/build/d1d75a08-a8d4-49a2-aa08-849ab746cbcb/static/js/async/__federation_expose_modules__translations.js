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
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["__federation_expose_modules__translations"], {
"./js/src/core/modules/app/translations/translations-api-slice-enhanced.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  api: () => (api),
  useTranslationCreateMutation: () => (useTranslationCreateMutation),
  useTranslationDeleteByKeyMutation: () => (useTranslationDeleteByKeyMutation),
  useTranslationGetAvailableLocalesQuery: () => (useTranslationGetAvailableLocalesQuery),
  useTranslationGetDomainsQuery: () => (useTranslationGetDomainsQuery),
  useTranslationGetListQuery: () => (useTranslationGetListQuery),
  useTranslationUpdateMutation: () => (useTranslationUpdateMutation)
});
/* ESM import */var _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/tags.ts");
/* ESM import */var _translations_api_slice_gen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/app/translations/translations-api-slice.gen.ts");
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

const api = _translations_api_slice_gen__WEBPACK_IMPORTED_MODULE_1__.api.enhanceEndpoints({
    addTagTypes: [
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.DOMAIN_TRANSLATIONS,
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.LOCALES
    ],
    endpoints: {
        translationGetList: {
            providesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.DOMAIN_TRANSLATIONS()
        },
        translationGetAvailableLocales: {
            providesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.LOCALES()
        },
        translationGetDomains: {
            providesTags: ()=>[]
        },
        translationDeleteByKey: {
            invalidatesTags: ()=>[]
        },
        translationCreate: {
            invalidatesTags: ()=>[]
        },
        translationUpdate: {
            invalidatesTags: ()=>[]
        }
    }
});
const { useTranslationCreateMutation, useTranslationDeleteByKeyMutation, useTranslationGetDomainsQuery, useTranslationGetListQuery, useTranslationGetAvailableLocalesQuery, useTranslationUpdateMutation } = api;


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
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

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
"./js/src/core/modules/translations/hooks/use-language-lookup.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useLanguageLookup: () => (useLanguageLookup)
});
/* ESM import */var _Pimcore_modules_app_translations_translations_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/app/translations/translations-api-slice-enhanced.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
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


const useLanguageLookup = ()=>{
    const { data: availableLocales, isLoading } = (0,_Pimcore_modules_app_translations_translations_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useTranslationGetAvailableLocalesQuery)();
    const lookupMap = (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(()=>{
        const map = {};
        if (availableLocales !== null && availableLocales !== undefined) {
            availableLocales.forEach((localeInfo)=>{
                const locale = localeInfo === null || localeInfo === void 0 ? void 0 : localeInfo.locale;
                if (locale !== null && locale !== undefined && locale !== '' && (localeInfo === null || localeInfo === void 0 ? void 0 : localeInfo.displayName) !== null && (localeInfo === null || localeInfo === void 0 ? void 0 : localeInfo.displayName) !== undefined && localeInfo.displayName !== '') {
                    map[locale] = localeInfo.displayName;
                }
            });
        }
        return map;
    }, [
        availableLocales
    ]);
    const getDisplayName = (locale)=>{
        if ((0,lodash__WEBPACK_IMPORTED_MODULE_1__.isNil)(locale) || !(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isString)(locale)) {
            return 'Unknown';
        }
        return lookupMap[locale] ?? locale.toUpperCase();
    };
    return {
        lookupMap,
        isLoading,
        getDisplayName
    };
};

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
"./js/src/sdk/modules/translations/index.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useLanguageLookup: () => (/* reexport safe */ _Pimcore_modules_translations_hooks_use_language_lookup__WEBPACK_IMPORTED_MODULE_0__.useLanguageLookup)
});
/* ESM import */var _Pimcore_modules_translations_hooks_use_language_lookup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/translations/hooks/use-language-lookup.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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
//# sourceMappingURL=__federation_expose_modules__translations.js.map