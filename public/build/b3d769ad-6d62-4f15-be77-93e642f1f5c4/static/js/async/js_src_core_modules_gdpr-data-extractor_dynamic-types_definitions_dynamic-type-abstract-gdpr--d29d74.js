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
(self["chunk_pimcore_studio_ui_bundle "] = self["chunk_pimcore_studio_ui_bundle "] || []).push([["js_src_core_modules_gdpr-data-extractor_dynamic-types_definitions_dynamic-type-abstract-gdpr--d29d74"], {
"./js/src/core/modules/email/emails-api-slice-enhanced.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  api: () => (api),
  useEmailBlocklistAddMutation: () => (useEmailBlocklistAddMutation),
  useEmailBlocklistDeleteMutation: () => (useEmailBlocklistDeleteMutation),
  useEmailBlocklistGetCollectionQuery: () => (useEmailBlocklistGetCollectionQuery),
  useEmailLogDeleteMutation: () => (useEmailLogDeleteMutation),
  useEmailLogForwardByIdMutation: () => (useEmailLogForwardByIdMutation),
  useEmailLogGetByIdQuery: () => (useEmailLogGetByIdQuery),
  useEmailLogGetCollectionQuery: () => (useEmailLogGetCollectionQuery),
  useEmailLogGetHtmlQuery: () => (useEmailLogGetHtmlQuery),
  useEmailLogGetParamsQuery: () => (useEmailLogGetParamsQuery),
  useEmailLogGetTextQuery: () => (useEmailLogGetTextQuery),
  useEmailLogResendByIdMutation: () => (useEmailLogResendByIdMutation),
  useEmailSendTestMutation: () => (useEmailSendTestMutation)
});
/* import */ var _Pimcore_app_api_pimcore_tags__rspack_import_0 = __webpack_require__("./js/src/core/app/api/pimcore/tags.ts");
/* import */ var _emails_api_slice_gen__rspack_import_1 = __webpack_require__("./js/src/core/modules/email/emails-api-slice.gen.ts");
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

const api = _emails_api_slice_gen__rspack_import_1.api.enhanceEndpoints({
    addTagTypes: [
        _Pimcore_app_api_pimcore_tags__rspack_import_0.tagNames.EMAIL_BLOCKLIST,
        _Pimcore_app_api_pimcore_tags__rspack_import_0.tagNames.EMAIL_BLOCKLIST_DETAIL,
        _Pimcore_app_api_pimcore_tags__rspack_import_0.tagNames.EMAIL_LOG,
        _Pimcore_app_api_pimcore_tags__rspack_import_0.tagNames.EMAIL_LOG_DETAIL
    ],
    endpoints: {
        emailBlocklistGetCollection: {
            providesTags: (result, error, args)=>{
                var _result_items;
                const blocklistCollection = [];
                result === null || result === void 0 ? void 0 : (_result_items = result.items) === null || _result_items === void 0 ? void 0 : _result_items.forEach((blocklistItem)=>{
                    blocklistCollection.push(..._Pimcore_app_api_pimcore_tags__rspack_import_0.providingTags.EMAIL_BLOCKLIST_DETAIL(blocklistItem.email));
                });
                return [
                    ...blocklistCollection,
                    ..._Pimcore_app_api_pimcore_tags__rspack_import_0.providingTags.EMAIL_BLOCKLIST()
                ];
            }
        },
        emailBlocklistAdd: {
            invalidatesTags: (result, error, args)=>{
                return _Pimcore_app_api_pimcore_tags__rspack_import_0.invalidatingTags.EMAIL_BLOCKLIST();
            }
        },
        emailBlocklistDelete: {
            invalidatesTags: (result, error, args)=>{
                return _Pimcore_app_api_pimcore_tags__rspack_import_0.invalidatingTags.EMAIL_BLOCKLIST_DETAIL(args.email);
            }
        },
        emailLogGetCollection: {
            providesTags: (result, error, args)=>{
                var _result_items;
                const logCollection = [];
                result === null || result === void 0 ? void 0 : (_result_items = result.items) === null || _result_items === void 0 ? void 0 : _result_items.forEach((blocklistItem)=>{
                    logCollection.push(..._Pimcore_app_api_pimcore_tags__rspack_import_0.providingTags.EMAIL_LOG_DETAIL(blocklistItem.id));
                });
                return [
                    ...logCollection,
                    ..._Pimcore_app_api_pimcore_tags__rspack_import_0.providingTags.EMAIL_LOG()
                ];
            }
        },
        emailLogDelete: {
            invalidatesTags: ()=>{
                return _Pimcore_app_api_pimcore_tags__rspack_import_0.invalidatingTags.EMAIL_LOG();
            }
        }
    }
});
const { useEmailBlocklistGetCollectionQuery, useEmailBlocklistAddMutation, useEmailBlocklistDeleteMutation, useEmailLogGetCollectionQuery, useEmailLogGetByIdQuery, useEmailLogDeleteMutation, useEmailLogGetHtmlQuery, useEmailLogGetParamsQuery, useEmailLogGetTextQuery, useEmailLogForwardByIdMutation, useEmailLogResendByIdMutation, useEmailSendTestMutation } = api;

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/email/emails-api-slice.gen.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useEmailBlocklistAddMutation: () => (useEmailBlocklistAddMutation),
  useEmailBlocklistDeleteMutation: () => (useEmailBlocklistDeleteMutation),
  useEmailBlocklistGetCollectionQuery: () => (useEmailBlocklistGetCollectionQuery),
  useEmailLogDeleteMutation: () => (useEmailLogDeleteMutation),
  useEmailLogForwardByIdMutation: () => (useEmailLogForwardByIdMutation),
  useEmailLogGetByIdQuery: () => (useEmailLogGetByIdQuery),
  useEmailLogGetCollectionQuery: () => (useEmailLogGetCollectionQuery),
  useEmailLogGetHtmlQuery: () => (useEmailLogGetHtmlQuery),
  useEmailLogGetParamsQuery: () => (useEmailLogGetParamsQuery),
  useEmailLogGetTextQuery: () => (useEmailLogGetTextQuery),
  useEmailLogResendByIdMutation: () => (useEmailLogResendByIdMutation),
  useEmailSendTestMutation: () => (useEmailSendTestMutation)
});
/* import */ var _sdk_api__rspack_import_0 = __webpack_require__("./js/src/sdk/api/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "E-Mails"
];
const injectedRtkApi = _sdk_api__rspack_import_0.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            emailBlocklistGetCollection: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/emails/blocklist`,
                        params: {
                            page: queryArg.page,
                            pageSize: queryArg.pageSize,
                            email: queryArg.email
                        }
                    }),
                providesTags: [
                    "E-Mails"
                ]
            }),
            emailBlocklistAdd: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/emails/blocklist`,
                        method: "POST",
                        body: queryArg.emailAddressParameter
                    }),
                invalidatesTags: [
                    "E-Mails"
                ]
            }),
            emailBlocklistDelete: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/emails/blocklist`,
                        method: "DELETE",
                        params: {
                            email: queryArg.email
                        }
                    }),
                invalidatesTags: [
                    "E-Mails"
                ]
            }),
            emailLogGetCollection: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/emails`,
                        params: {
                            page: queryArg.page,
                            pageSize: queryArg.pageSize
                        }
                    }),
                providesTags: [
                    "E-Mails"
                ]
            }),
            emailLogGetById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/emails/${queryArg.id}`
                    }),
                providesTags: [
                    "E-Mails"
                ]
            }),
            emailLogDelete: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/emails/${queryArg.id}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "E-Mails"
                ]
            }),
            emailLogGetHtml: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/emails/${queryArg.id}/html`
                    }),
                providesTags: [
                    "E-Mails"
                ]
            }),
            emailLogGetParams: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/emails/${queryArg.id}/params`
                    }),
                providesTags: [
                    "E-Mails"
                ]
            }),
            emailLogGetText: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/emails/${queryArg.id}/text`
                    }),
                providesTags: [
                    "E-Mails"
                ]
            }),
            emailLogForwardById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/emails/${queryArg.id}/forward`,
                        method: "POST",
                        body: queryArg.emailAddressParameter
                    }),
                invalidatesTags: [
                    "E-Mails"
                ]
            }),
            emailLogResendById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/emails/${queryArg.id}/resend`,
                        method: "POST"
                    }),
                invalidatesTags: [
                    "E-Mails"
                ]
            }),
            emailSendTest: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/emails/test`,
                        method: "POST",
                        body: queryArg.sendEmailParameters
                    }),
                invalidatesTags: [
                    "E-Mails"
                ]
            })
        }),
    overrideExisting: false
});

const { useEmailBlocklistGetCollectionQuery, useEmailBlocklistAddMutation, useEmailBlocklistDeleteMutation, useEmailLogGetCollectionQuery, useEmailLogGetByIdQuery, useEmailLogDeleteMutation, useEmailLogGetHtmlQuery, useEmailLogGetParamsQuery, useEmailLogGetTextQuery, useEmailLogForwardByIdMutation, useEmailLogResendByIdMutation, useEmailSendTestMutation } = injectedRtkApi;

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/gdpr-data-extractor/dynamic-types/definitions/dynamic-type-abstract-gdpr-provider.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DynamicTypeAbstractGDPRProvider: () => (DynamicTypeAbstractGDPRProvider)
});
/* import */ var _swc_helpers_ts_decorate__rspack_import_1 = __webpack_require__("./node_modules/tslib/tslib.es6.mjs");
/* import */ var inversify__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* import */ var inversify__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(inversify__rspack_import_0);
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

class DynamicTypeAbstractGDPRProvider {
}
DynamicTypeAbstractGDPRProvider = (0,_swc_helpers_ts_decorate__rspack_import_1.__decorate)([
    (0,inversify__rspack_import_0.injectable)()
], DynamicTypeAbstractGDPRProvider);

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/gdpr-data-extractor/gdpr-data-extractor-api-slice.gen.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useGdprExportQuery: () => (useGdprExportQuery),
  useGdprListProvidersQuery: () => (useGdprListProvidersQuery),
  useGdprSearchDataQuery: () => (useGdprSearchDataQuery)
});
/* import */ var _sdk_api__rspack_import_0 = __webpack_require__("./js/src/sdk/api/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "GDPR Data Extractor"
];
const injectedRtkApi = _sdk_api__rspack_import_0.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            gdprExport: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/gdpr/export-data/${queryArg.id}`,
                        params: {
                            providerKey: queryArg.providerKey
                        }
                    }),
                providesTags: [
                    "GDPR Data Extractor"
                ]
            }),
            gdprListProviders: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/gdpr/providers`
                    }),
                providesTags: [
                    "GDPR Data Extractor"
                ]
            }),
            gdprSearchData: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/gdpr/search`,
                        method: "POST",
                        body: queryArg.body,
                        params: {
                            provider: queryArg.provider
                        }
                    }),
                providesTags: [
                    "GDPR Data Extractor"
                ]
            })
        }),
    overrideExisting: false
});

const { useGdprExportQuery, useGdprListProvidersQuery, useGdprSearchDataQuery } = injectedRtkApi;

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/gdpr-data-extractor/gdpr-data-extractor-slice-enhanced.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  api: () => (api),
  useGdprExportQuery: () => (useGdprExportQuery),
  useGdprListProvidersQuery: () => (useGdprListProvidersQuery),
  useGdprSearchDataQuery: () => (useGdprSearchDataQuery),
  useLazyGdprExportQuery: () => (useLazyGdprExportQuery),
  useLazyGdprSearchDataQuery: () => (useLazyGdprSearchDataQuery)
});
/* import */ var _Pimcore_app_api_pimcore_tags__rspack_import_0 = __webpack_require__("./js/src/core/app/api/pimcore/tags.ts");
/* import */ var _gdpr_data_extractor_api_slice_gen__rspack_import_1 = __webpack_require__("./js/src/core/modules/gdpr-data-extractor/gdpr-data-extractor-api-slice.gen.ts");
/* import */ var lodash__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_2);
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


const api = _gdpr_data_extractor_api_slice_gen__rspack_import_1.api.enhanceEndpoints({
    addTagTypes: [
        _Pimcore_app_api_pimcore_tags__rspack_import_0.tagNames.GDPR_DATA,
        _Pimcore_app_api_pimcore_tags__rspack_import_0.tagNames.GDPR_DATA_DETAIL
    ],
    endpoints: {
        gdprSearchData: {
            providesTags: (result, error, args)=>{
                let elementTags = [];
                if (result !== undefined) {
                    elementTags = (result === null || result === void 0 ? void 0 : result.items.flatMap((item)=>{
                        if ((0,lodash__rspack_import_2.isNil)(item.data) || !('id' in item.data) || (0,lodash__rspack_import_2.isNil)(item.data.id)) {
                            return [];
                        }
                        return _Pimcore_app_api_pimcore_tags__rspack_import_0.providingTags.GDPR_DATA_DETAIL(args.provider, item.data.id);
                    }).filter(Boolean)) ?? [];
                }
                return [
                    ...elementTags,
                    ..._Pimcore_app_api_pimcore_tags__rspack_import_0.providingTags.GDPR_DATA(args.provider)
                ];
            }
        }
    }
});
const { useGdprExportQuery, useLazyGdprExportQuery, useGdprListProvidersQuery, useGdprSearchDataQuery, useLazyGdprSearchDataQuery } = api;


function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/gdpr-data-extractor/components/delete-button/delete-button.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DeleteButton: () => (DeleteButton)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var _Pimcore_app_store__rspack_import_1 = __webpack_require__("./js/src/core/app/store/index.ts");
/* import */ var _sdk_components__rspack_import_2 = __webpack_require__("./js/src/sdk/components/index.ts");
/* import */ var _sdk_modules_element__rspack_import_3 = __webpack_require__("./js/src/sdk/modules/element/index.ts");
/* import */ var react__rspack_import_4 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_4_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_4);
/* import */ var _Pimcore_modules_email_emails_api_slice_enhanced__rspack_import_5 = __webpack_require__("./js/src/core/modules/email/emails-api-slice-enhanced.ts");
/* import */ var _Pimcore_app_api_pimcore_tags__rspack_import_6 = __webpack_require__("./js/src/core/app/api/pimcore/tags.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 





const DeleteButton = (param)=>{
    let { id, elementType, label, providerKey, onClick, ...iconButtonProps } = param;
    _s();
    const { deleteElement } = (0,_sdk_modules_element__rspack_import_3.useDelete)(elementType);
    const [isDeleting, setIsDeleting] = (0,react__rspack_import_4.useState)(false);
    const dispatch = (0,_Pimcore_app_store__rspack_import_1.useAppDispatch)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_sdk_components__rspack_import_2.IconButton, {
        ...iconButtonProps,
        icon: {
            value: 'trash'
        },
        loading: isDeleting || iconButtonProps.loading,
        onClick: (e)=>{
            setIsDeleting(true);
            deleteElement(id, label, undefined, ()=>{
                setIsDeleting(false);
                dispatch(_Pimcore_modules_email_emails_api_slice_enhanced__rspack_import_5.api.util.invalidateTags(_Pimcore_app_api_pimcore_tags__rspack_import_6.invalidatingTags.GDPR_DATA(providerKey)));
            });
            onClick === null || onClick === void 0 ? void 0 : onClick(e);
        }
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/gdpr-data-extractor/components/delete-button/delete-button.tsx",
        lineNumber: 30,
        columnNumber: 10
    }, undefined);
};
_s(DeleteButton, "wq8a5JxPq0pb5i8s84Nsl5Eekb0=", false, function() {
    return [
        _sdk_modules_element__rspack_import_3.useDelete,
        _Pimcore_app_store__rspack_import_1.useAppDispatch
    ];
});
_c = DeleteButton;
var _c;
$RefreshReg$(_c, "DeleteButton");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/gdpr-data-extractor/components/export-button/export-button.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ExportButton: () => (ExportButton)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var _sdk_components__rspack_import_1 = __webpack_require__("./js/src/sdk/components/index.ts");
/* import */ var react__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_2);
/* import */ var _gdpr_data_extractor_slice_enhanced__rspack_import_3 = __webpack_require__("./js/src/core/modules/gdpr-data-extractor/gdpr-data-extractor-slice-enhanced.ts");
/* import */ var _Pimcore_modules_app_utils_download__rspack_import_4 = __webpack_require__("./js/src/core/modules/app/utils/download.ts");
/* import */ var lodash__rspack_import_5 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_5_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_5);
/* import */ var _Pimcore_modules_app_error_handler_error_handler__rspack_import_6 = __webpack_require__("./js/src/core/modules/app/error-handler/error-handler.tsx");
/* import */ var _Pimcore_modules_app_error_handler_classes_api_error__rspack_import_7 = __webpack_require__("./js/src/core/modules/app/error-handler/classes/api-error.ts");
/* import */ var _sdk_modules_app__rspack_import_8 = __webpack_require__("./js/src/sdk/modules/app/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 







const ExportButton = (param)=>{
    let { id, providerKey, onClick, loading, ...iconButtonProps } = param;
    _s();
    const [trigger, { isLoading, error }] = (0,_gdpr_data_extractor_slice_enhanced__rspack_import_3.useLazyGdprExportQuery)();
    const handleExport = async (e)=>{
        try {
            const result = await trigger({
                id,
                providerKey
            }).unwrap();
            (0,_Pimcore_modules_app_utils_download__rspack_import_4.downloadJsonFile)(`gdpr-export-${providerKey}-${id}.json`, result);
            onClick === null || onClick === void 0 ? void 0 : onClick(e);
        } catch (error) {
            console.error('Export failed:', error);
            (0,_Pimcore_modules_app_error_handler_error_handler__rspack_import_6["default"])(new _sdk_modules_app__rspack_import_8.GeneralError(error.message));
        }
    };
    (0,react__rspack_import_2.useEffect)(()=>{
        if (!(0,lodash__rspack_import_5.isUndefined)(error)) {
            (0,_Pimcore_modules_app_error_handler_error_handler__rspack_import_6["default"])(new _Pimcore_modules_app_error_handler_classes_api_error__rspack_import_7["default"](error));
        }
    }, [
        error
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_sdk_components__rspack_import_1.IconButton, {
        ...iconButtonProps,
        icon: {
            value: 'export'
        },
        loading: isLoading || loading,
        onClick: handleExport
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/gdpr-data-extractor/components/export-button/export-button.tsx",
        lineNumber: 48,
        columnNumber: 10
    }, undefined);
};
_s(ExportButton, "74NMEM1/41LRPxW/BbUaThGI9mM=", false, function() {
    return [
        _gdpr_data_extractor_slice_enhanced__rspack_import_3.useLazyGdprExportQuery
    ];
});
_c = ExportButton;
var _c;
$RefreshReg$(_c, "ExportButton");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/gdpr-data-extractor/components/open-button/open-button.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  OpenButton: () => (OpenButton)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var _sdk_components__rspack_import_1 = __webpack_require__("./js/src/sdk/components/index.ts");
/* import */ var _sdk_modules_element__rspack_import_2 = __webpack_require__("./js/src/sdk/modules/element/index.ts");
/* import */ var react__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_3);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 


const OpenButton = (param)=>{
    let { id, elementType, onClick, ...iconButtonProps } = param;
    _s();
    const { openElement } = (0,_sdk_modules_element__rspack_import_2.useElementHelper)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_sdk_components__rspack_import_1.IconButton, {
        ...iconButtonProps,
        icon: {
            value: 'open-folder'
        },
        onClick: async (e)=>{
            await openElement({
                id,
                type: elementType
            });
            onClick === null || onClick === void 0 ? void 0 : onClick(e);
        }
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/gdpr-data-extractor/components/open-button/open-button.tsx",
        lineNumber: 23,
        columnNumber: 10
    }, undefined);
};
_s(OpenButton, "4iTuiAXGNxytjMXrpHC/S5JB+TA=", false, function() {
    return [
        _sdk_modules_element__rspack_import_2.useElementHelper
    ];
});
_c = OpenButton;
var _c;
$RefreshReg$(_c, "OpenButton");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/gdpr-data-extractor/dynamic-types/registry/dynamic-type-gdpr-provider-registry.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DynamicTypeGDPRProviderRegistry: () => (DynamicTypeGDPRProviderRegistry)
});
/* import */ var _sdk_modules_element__rspack_import_0 = __webpack_require__("./js/src/sdk/modules/element/index.ts");
/* import */ var inversify__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* import */ var inversify__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(inversify__rspack_import_1);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
var _dec, _class;
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 

let DynamicTypeGDPRProviderRegistry = (_dec = (0,inversify__rspack_import_1.injectable)(), _dec(_class = class DynamicTypeGDPRProviderRegistry extends _sdk_modules_element__rspack_import_0.DynamicTypeRegistryAbstract {
}) || _class);

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},

}]);
//# sourceMappingURL=js_src_core_modules_gdpr-data-extractor_dynamic-types_definitions_dynamic-type-abstract-gdpr--d29d74.js.map