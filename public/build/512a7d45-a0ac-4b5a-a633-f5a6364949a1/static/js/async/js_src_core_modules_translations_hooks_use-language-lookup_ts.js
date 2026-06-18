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
(self["chunk_pimcore_studio_ui_bundle "] = self["chunk_pimcore_studio_ui_bundle "] || []).push([["js_src_core_modules_translations_hooks_use-language-lookup_ts"], {
"./js/src/core/modules/app/translations/translations-api-slice-enhanced.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  api: () => (api),
  useTranslationCleanupByDomainMutation: () => (useTranslationCleanupByDomainMutation),
  useTranslationCreateMutation: () => (useTranslationCreateMutation),
  useTranslationDeleteByKeyMutation: () => (useTranslationDeleteByKeyMutation),
  useTranslationDetermineCsvSettingsForImportMutation: () => (useTranslationDetermineCsvSettingsForImportMutation),
  useTranslationExportListMutation: () => (useTranslationExportListMutation),
  useTranslationGetAvailableLocalesQuery: () => (useTranslationGetAvailableLocalesQuery),
  useTranslationGetDomainsQuery: () => (useTranslationGetDomainsQuery),
  useTranslationGetListQuery: () => (useTranslationGetListQuery),
  useTranslationImportCsvMutation: () => (useTranslationImportCsvMutation),
  useTranslationUpdateMutation: () => (useTranslationUpdateMutation)
});
/* import */ var _Pimcore_app_api_pimcore_tags__rspack_import_0 = __webpack_require__("./js/src/core/app/api/pimcore/tags.ts");
/* import */ var _translations_api_slice_gen__rspack_import_1 = __webpack_require__("./js/src/core/modules/app/translations/translations-api-slice.gen.ts");
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

const api = _translations_api_slice_gen__rspack_import_1.api.enhanceEndpoints({
    addTagTypes: [
        _Pimcore_app_api_pimcore_tags__rspack_import_0.tagNames.DOMAIN_TRANSLATIONS,
        _Pimcore_app_api_pimcore_tags__rspack_import_0.tagNames.LOCALES
    ],
    endpoints: {
        translationGetList: {
            providesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__rspack_import_0.providingTags.DOMAIN_TRANSLATIONS()
        },
        translationGetAvailableLocales: {
            providesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__rspack_import_0.providingTags.LOCALES()
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
        },
        translationExportList: {
            query: (queryArg)=>({
                    url: '/pimcore-studio/api/translations/export',
                    method: 'POST',
                    body: queryArg.body,
                    params: {
                        domain: queryArg.domain
                    },
                    responseHandler: async (response)=>{
                        return await response.blob();
                    }
                })
        },
        translationImportCsv: {
            query: (queryArg)=>{
                const formData = new FormData();
                formData.append('file', queryArg.body.file);
                formData.append('csvSettings', JSON.stringify(queryArg.body.csvSettings));
                return {
                    url: `/pimcore-studio/api/translations/${queryArg.domain}/import`,
                    method: 'POST',
                    body: formData
                };
            },
            invalidatesTags: ()=>_Pimcore_app_api_pimcore_tags__rspack_import_0.invalidatingTags.DOMAIN_TRANSLATIONS()
        },
        translationCleanupByDomain: {
            invalidatesTags: ()=>_Pimcore_app_api_pimcore_tags__rspack_import_0.invalidatingTags.DOMAIN_TRANSLATIONS()
        }
    }
});
const { useTranslationCreateMutation, useTranslationDeleteByKeyMutation, useTranslationGetDomainsQuery, useTranslationGetListQuery, useTranslationGetAvailableLocalesQuery, useTranslationUpdateMutation, useTranslationCleanupByDomainMutation, useTranslationExportListMutation, useTranslationImportCsvMutation, useTranslationDetermineCsvSettingsForImportMutation } = api;


function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/app/translations/translations-api-slice.gen.ts"(module, __webpack_exports__, __webpack_require__) {
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
/* import */ var _sdk_api__rspack_import_0 = __webpack_require__("./js/src/sdk/api/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Translation"
];
const injectedRtkApi = _sdk_api__rspack_import_0.api.enhanceEndpoints({
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

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/translations/hooks/use-language-lookup.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useLanguageLookup: () => (useLanguageLookup)
});
/* import */ var _Pimcore_modules_app_translations_translations_api_slice_enhanced__rspack_import_0 = __webpack_require__("./js/src/core/modules/app/translations/translations-api-slice-enhanced.ts");
/* import */ var lodash__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_1);
/* import */ var react__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_2);
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


const useLanguageLookup = ()=>{
    const { data: availableLocales, isLoading } = (0,_Pimcore_modules_app_translations_translations_api_slice_enhanced__rspack_import_0.useTranslationGetAvailableLocalesQuery)();
    const lookupMap = (0,react__rspack_import_2.useMemo)(()=>{
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
        if ((0,lodash__rspack_import_1.isNil)(locale) || !(0,lodash__rspack_import_1.isString)(locale)) {
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

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},

}]);
//# sourceMappingURL=js_src_core_modules_translations_hooks_use-language-lookup_ts.js.map