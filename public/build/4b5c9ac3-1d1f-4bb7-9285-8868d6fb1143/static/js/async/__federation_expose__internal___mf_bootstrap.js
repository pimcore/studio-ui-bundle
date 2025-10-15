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
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["__federation_expose__internal___mf_bootstrap"], {
"./js/src/core/modules/app/app-loader/loader/language/loader.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useLanguageLoader: () => (useLanguageLoader)
});
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _Pimcore_modules_app_translations_translations_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/app/translations/translations-api-slice-enhanced.ts");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
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


const useLanguageLoader = ()=>{
    const loadAvailableLocales = async ()=>{
        try {
            await _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.store.dispatch(_Pimcore_modules_app_translations_translations_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__.api.endpoints.translationGetAvailableLocales.initiate(undefined, {
                forceRefetch: false,
                subscribe: true
            })).unwrap();
        } catch (error) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_2__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_2__.GeneralError('Error loading available locales'));
            throw error;
        }
    };
    return {
        loadAvailableLocales
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
"./js/src/core/modules/app/app-loader/loader/translation/loader.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useTranslationLoader: () => (useTranslationLoader)
});
/* ESM import */var _Pimcore_app_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/i18n/index.ts");
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* ESM import */var _Pimcore_modules_app_translations_translations_api_slice_gen__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/app/translations/translations-api-slice.gen.ts");
/* ESM import */var _Pimcore_modules_auth_user_user_slice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/auth/user/user-slice.ts");
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




const useTranslationLoader = ()=>{
    const [fetchTranslations] = (0,_Pimcore_modules_app_translations_translations_api_slice_gen__WEBPACK_IMPORTED_MODULE_3__.useTranslationGetCollectionMutation)();
    const loadPublicTranslations = async ()=>{
        await fetchTranslations({
            translation: {
                locale: _Pimcore_app_i18n__WEBPACK_IMPORTED_MODULE_0__.FALLBACK_LANGUAGE,
                keys: [],
                useFallback: true
            }
        }).unwrap().then((response)=>{
            _Pimcore_app_i18n__WEBPACK_IMPORTED_MODULE_0__["default"].addResourceBundle(_Pimcore_app_i18n__WEBPACK_IMPORTED_MODULE_0__.FALLBACK_LANGUAGE, 'translation', response.keys ?? [], true, true);
            void _Pimcore_app_i18n__WEBPACK_IMPORTED_MODULE_0__["default"].changeLanguage(_Pimcore_app_i18n__WEBPACK_IMPORTED_MODULE_0__.FALLBACK_LANGUAGE);
        }).catch(()=>{
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_2__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_2__.GeneralError('Error loading translations'));
            throw new Error('Error loading translations');
        });
    };
    const loadTranslations = async ()=>{
        const user = (0,_Pimcore_modules_auth_user_user_slice__WEBPACK_IMPORTED_MODULE_4__.selectCurrentUser)(_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_1__.store.getState());
        await fetchTranslations({
            translation: {
                locale: user.language,
                keys: [],
                useFallback: true
            }
        }).unwrap().then((response)=>{
            _Pimcore_app_i18n__WEBPACK_IMPORTED_MODULE_0__["default"].addResourceBundle(user.language, 'translation', response.keys ?? [], true, true);
            void _Pimcore_app_i18n__WEBPACK_IMPORTED_MODULE_0__["default"].changeLanguage(user.language);
        }).catch((error)=>{
            console.error('Error loading translations', error);
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_2__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_2__.GeneralError('Error loading translations'));
        });
    };
    return {
        loadPublicTranslations,
        loadTranslations
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
"./js/src/core/modules/app/app-loader/loader/user/loader.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useUserLoader: () => (useUserLoader)
});
/* ESM import */var _sdk_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/sdk/app/index.ts");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* ESM import */var _Pimcore_modules_auth_user_user_slice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/auth/user/user-slice.ts");
/* ESM import */var _Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/user/user-api-slice-enhanced.ts");
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



const useUserLoader = ()=>{
    const dispatch = (0,_sdk_app__WEBPACK_IMPORTED_MODULE_0__.useAppDispatch)();
    const loadUser = async ()=>{
        const userFetcher = dispatch(_Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_3__.api.endpoints.userGetCurrentInformation.initiate());
        await userFetcher.then((param)=>{
            let { data, isSuccess, isError, error } = param;
            if (isError) {
                // Handle error appropriately
                (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__.ApiError(error));
            } else if (isSuccess && data !== undefined) {
                // Dispatch action to set user information in the store
                dispatch((0,_Pimcore_modules_auth_user_user_slice__WEBPACK_IMPORTED_MODULE_2__.setUser)(data));
            }
        }).catch((err)=>{
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__.GeneralError('Error loading user information'));
            throw new Error('Error loading user information', {
                cause: err
            });
        });
    };
    return {
        loadUser
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
"./js/src/core/modules/app/mercure-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useMercureCreateCookieMutation: () => (useMercureCreateCookieMutation)
});
/* ESM import */var _sdk_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/sdk/api/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Mercure"
];
const injectedRtkApi = _sdk_api__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            mercureCreateCookie: build.mutation({
                query: ()=>({
                        url: `/pimcore-studio/api/mercure/auth`,
                        method: "POST"
                    }),
                invalidatesTags: [
                    "Mercure"
                ]
            })
        }),
    overrideExisting: false
});

const { useMercureCreateCookieMutation } = injectedRtkApi;

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
"./js/src/core/modules/app/settings/settings-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useActiveBundlesGetQuery: () => (useActiveBundlesGetQuery),
  useSystemSettingsGetQuery: () => (useSystemSettingsGetQuery)
});
/* ESM import */var _sdk_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/sdk/api/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Settings"
];
const injectedRtkApi = _sdk_api__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            systemSettingsGet: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/settings`
                    }),
                providesTags: [
                    "Settings"
                ]
            }),
            activeBundlesGet: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/settings/active-bundles`
                    }),
                providesTags: [
                    "Settings"
                ]
            })
        }),
    overrideExisting: false
});

const { useSystemSettingsGetQuery, useActiveBundlesGetQuery } = injectedRtkApi;

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
"./js/src/core/styles/global.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  GlobalStyles: () => (GlobalStyles)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/antd-style/antd-style");
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd_style__WEBPACK_IMPORTED_MODULE_0__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ /* eslint-disable max-lines */ 
const GlobalStyles = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createGlobalStyle)`
  * {
    box-sizing: border-box;
  }

  /** MESSAGE **/
  .ant-message {
    position: absolute;
    bottom: 20px !important;
    top: unset !important;
  }

  @keyframes moveUp {
    0% {
        transform: translateY(+30%);
        opacity: 0;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
  }

  .ant-message .ant-message-move-up-appear,
  .ant-message .ant-message-move-up-enter {
    animation-name: moveUp;
  }

  .ant-message .ant-message-move-up-leave {
    animation-name: moveUp;
    animation-direction: reverse;
  }

  .active {
    cursor: pointer;
    background: ${(props)=>props.theme.itemHoverColor};
  }

  .hover:hover {
    cursor: pointer;
    background: ${(props)=>props.theme.itemHoverColor};
  }

  .relative {
    position: relative;
  }

  .p-none {
    padding: 0;
  }

  .p-mini {
    padding: ${(props)=>props.theme.paddingXXS}px;
  }

  .p-extra-small {
    padding: ${(props)=>props.theme.paddingXS}px;
  }

  .p-small {
    padding: ${(props)=>props.theme.paddingSM}px;
  }

  .p-normal {
    padding: ${(props)=>props.theme.padding}px;
  }

  .p-medium {
    padding: ${(props)=>props.theme.paddingMD}px;
  }

  .p-large {
    padding: ${(props)=>props.theme.paddingLG}px;
  }

  .p-extra-large {
    padding: ${(props)=>props.theme.paddingXL}px;
  }

  .p-maxi {
    // @todo check missing padding token
    padding: ${(props)=>props.theme.sizeXXL}px;
  }

  .p-y-none {
    padding-top: 0;
    padding-bottom: 0;
  }

  .p-y-mini {
    padding-top: ${(props)=>props.theme.paddingXXS}px;
    padding-bottom: ${(props)=>props.theme.paddingXXS}px;
  }

  .p-y-extra-small {
    padding-top: ${(props)=>props.theme.paddingXS}px;
    padding-bottom: ${(props)=>props.theme.paddingXS}px;
  }

  .p-y-small {
    padding-top: ${(props)=>props.theme.paddingSM}px;
    padding-bottom: ${(props)=>props.theme.paddingSM}px;
  }

  .p-y-normal {
    padding-top: ${(props)=>props.theme.padding}px;
    padding-bottom: ${(props)=>props.theme.padding}px;
  }

  .p-y-medium {
    padding-top: ${(props)=>props.theme.paddingMD}px;
    padding-bottom: ${(props)=>props.theme.paddingMD}px;
  }

  .p-y-large {
    padding-top: ${(props)=>props.theme.paddingLG}px;
    padding-bottom: ${(props)=>props.theme.paddingLG}px;
  }

  .p-y-extra-large {
    padding-top: ${(props)=>props.theme.paddingXL}px;
    padding-bottom: ${(props)=>props.theme.paddingXL}px;
  }

  .p-y-maxi {
    // @todo check missing padding token
    padding-top: ${(props)=>props.theme.sizeXXL}px;
    padding-bottom: ${(props)=>props.theme.sizeXXL}px;
  }

  .p-x-none {
    padding-left: 0;
    padding-right: 0;
  }

  .p-x-mini {
    padding-left: ${(props)=>props.theme.paddingXXS}px;
    padding-right: ${(props)=>props.theme.paddingXXS}px;
  }

  .p-x-extra-small {
    padding-left: ${(props)=>props.theme.paddingXS}px;
    padding-right: ${(props)=>props.theme.paddingXS}px;
  }

  .p-x-small {
    padding-left: ${(props)=>props.theme.paddingSM}px;
    padding-right: ${(props)=>props.theme.paddingSM}px;
  }

  .p-x-normal {
    padding-left: ${(props)=>props.theme.padding}px;
    padding-right: ${(props)=>props.theme.padding}px;
  }

  .p-x-medium {
    padding-left: ${(props)=>props.theme.paddingMD}px;
    padding-right: ${(props)=>props.theme.paddingMD}px;
  }

  .p-x-large {
    padding-left: ${(props)=>props.theme.paddingLG}px;
    padding-right: ${(props)=>props.theme.paddingLG}px;
  }

  .p-x-extra-large {
    padding-left: ${(props)=>props.theme.paddingXL}px;
    padding-right: ${(props)=>props.theme.paddingXL}px;
  }

  .p-x-maxi {
    // @todo check missing padding token
    padding-left: ${(props)=>props.theme.sizeXXL}px;
    padding-right: ${(props)=>props.theme.sizeXXL}px;
  }

  .p-t-none {
    padding-top: 0;
  }

  .p-t-mini {
    padding-top: ${(props)=>props.theme.paddingXXS}px;
  }

  .p-t-extra-small {
    padding-top: ${(props)=>props.theme.paddingXS}px;
  }

  .p-t-small {
    padding-top: ${(props)=>props.theme.paddingSM}px;
  }

  .p-t-normal {
    padding-top: ${(props)=>props.theme.padding}px;
  }

  .p-t-medium {
    padding-top: ${(props)=>props.theme.paddingMD}px;
  }

  .p-t-large {
    padding-top: ${(props)=>props.theme.paddingLG}px;
  }

  .p-t-extra-large {
    padding-top: ${(props)=>props.theme.paddingXL}px;
  }

  .p-t-maxi {
    // @todo check missing padding token
    padding-top: ${(props)=>props.theme.sizeXXL}px;
  }

  .p-b-none {
    padding-bottom: 0;
  }

  .p-b-mini {
    padding-bottom: ${(props)=>props.theme.paddingXXS}px;
  }

  .p-b-extra-small {
    padding-bottom: ${(props)=>props.theme.paddingXS}px;
  }

  .p-b-small {
    padding-bottom: ${(props)=>props.theme.paddingSM}px;
  }

  .p-b-normal {
    padding-bottom: ${(props)=>props.theme.padding}px;
  }

  .p-b-medium {
    padding-bottom: ${(props)=>props.theme.paddingMD}px;
  }

  .p-b-large {
    padding-bottom: ${(props)=>props.theme.paddingLG}px;
  }

  .p-b-extra-large {
    padding-bottom: ${(props)=>props.theme.paddingXL}px;
  }

  .p-b-maxi {
    // @todo check missing padding token
    padding-bottom: ${(props)=>props.theme.sizeXXL}px;
  }

  .p-l-none {
    padding-left: 0;
  }

  .p-l-mini {
    padding-left: ${(props)=>props.theme.paddingXXS}px;
  }

  .p-l-extra-small {
    padding-left: ${(props)=>props.theme.paddingXS}px;
  }

  .p-l-small {
    padding-left: ${(props)=>props.theme.paddingSM}px;
  }

  .p-l-normal {
    padding-left: ${(props)=>props.theme.padding}px;
  }

  .p-l-medium {
    padding-left: ${(props)=>props.theme.paddingMD}px;
  }

  .p-l-large {
    padding-left: ${(props)=>props.theme.paddingLG}px;
  }

  .p-l-extra-large {
    padding-left: ${(props)=>props.theme.paddingXL}px;
  }

  .p-l-maxi {
    // @todo check missing padding token
    padding-left: ${(props)=>props.theme.sizeXXL}px;
  }

  .p-r-none {
    padding-right: 0;
  }

  .p-r-mini {
    padding-right: ${(props)=>props.theme.paddingXXS}px;
  }

  .p-r-extra-small {
    padding-right: ${(props)=>props.theme.paddingXS}px;
  }

  .p-r-small {
    padding-right: ${(props)=>props.theme.paddingSM}px;
  }

  .p-r-normal {
    padding-right: ${(props)=>props.theme.padding}px;
  }

  .p-r-medium {
    padding-right: ${(props)=>props.theme.paddingMD}px;
  }

  .p-r-large {
    padding-right: ${(props)=>props.theme.paddingLG}px;
  }

  .p-r-extra-large {
    padding-right: ${(props)=>props.theme.paddingXL}px;
  }

  .p-r-maxi {
    // @todo check missing padding token
    padding-right: ${(props)=>props.theme.sizeXXL}px;
  }

  .m-none {
    margin: 0;
  }

  .m-mini {
    margin: ${(props)=>props.theme.marginXXS}px;
  }

  .m-extra-small {
    margin: ${(props)=>props.theme.marginXS}px;
  }

  .m-small {
    margin: ${(props)=>props.theme.marginSM}px;
  }

  .m-normal {
    margin: ${(props)=>props.theme.margin}px;
  }

  .m-medium {
    margin: ${(props)=>props.theme.marginMD}px;
  }

  .m-large {
    margin: ${(props)=>props.theme.marginLG}px;
  }

  .m-extra-large {
    margin: ${(props)=>props.theme.marginXL}px;
  }

  .m-maxi {
    // @todo check missing margin token
    margin: ${(props)=>props.theme.sizeXXL}px;
  }

  .m-y-none {
    margin-top: 0;
    margin-bottom: 0;
  }

  .m-y-mini {
    margin-top: ${(props)=>props.theme.marginXXS}px;
    margin-bottom: ${(props)=>props.theme.marginXXS}px;
  }

  .m-y-extra-small {
    margin-top: ${(props)=>props.theme.marginXS}px;
    margin-bottom: ${(props)=>props.theme.marginXS}px;
  }

  .m-y-small {
    margin-top: ${(props)=>props.theme.marginSM}px;
    margin-bottom: ${(props)=>props.theme.marginSM}px;
  }

  .m-y-normal {
    margin-top: ${(props)=>props.theme.margin}px;
    margin-bottom: ${(props)=>props.theme.margin}px;
  }

  .m-y-medium {
    margin-top: ${(props)=>props.theme.marginMD}px;
    margin-bottom: ${(props)=>props.theme.marginMD}px;
  }

  .m-y-large {
    margin-top: ${(props)=>props.theme.marginLG}px;
    margin-bottom: ${(props)=>props.theme.marginLG}px;
  }

  .m-y-extra-large {
    margin-top: ${(props)=>props.theme.marginXL}px;
    margin-bottom: ${(props)=>props.theme.marginXL}px;
  }

  .m-y-maxi {
    // @todo check missing margin token
    margin-top: ${(props)=>props.theme.sizeXXL}px;
    margin-bottom: ${(props)=>props.theme.sizeXXL}px;
  }

  .m-x-none {
    margin-left: 0;
    margin-right: 0;
  }

  .m-x-mini {
    margin-left: ${(props)=>props.theme.marginXXS}px;
    margin-right: ${(props)=>props.theme.marginXXS}px;
  }

  .m-x-extra-small {
    margin-left: ${(props)=>props.theme.marginXS}px;
    margin-right: ${(props)=>props.theme.marginXS}px;
  }

  .m-x-small {
    margin-left: ${(props)=>props.theme.marginSM}px;
    margin-right: ${(props)=>props.theme.marginSM}px;
  }

  .m-x-normal {
    margin-left: ${(props)=>props.theme.margin}px;
    margin-right: ${(props)=>props.theme.margin}px;
  }

  .m-x-medium {
    margin-left: ${(props)=>props.theme.marginMD}px;
    margin-right: ${(props)=>props.theme.marginMD}px;
  }

  .m-x-large {
    margin-left: ${(props)=>props.theme.marginLG}px;
    margin-right: ${(props)=>props.theme.marginLG}px;
  }

  .m-x-extra-large {
    margin-left: ${(props)=>props.theme.marginXL}px;
    margin-right: ${(props)=>props.theme.marginXL}px;
  }

  .m-x-maxi {
    // @todo check missing margin token
    margin-left: ${(props)=>props.theme.sizeXXL}px;
    margin-right: ${(props)=>props.theme.sizeXXL}px;
  }

  .m-t-none {
    margin-top: 0;
  }

  .m-t-mini {
    margin-top: ${(props)=>props.theme.marginXXS}px;
  }

  .m-t-extra-small {
    margin-top: ${(props)=>props.theme.marginXS}px;
  }

  .m-t-small {
    margin-top: ${(props)=>props.theme.marginSM}px;
  }

  .m-t-normal {
    margin-top: ${(props)=>props.theme.margin}px;
  }

  .m-t-medium {
    margin-top: ${(props)=>props.theme.marginMD}px;
  }

  .m-t-large {
    margin-top: ${(props)=>props.theme.marginLG}px;
  }

  .m-t-extra-large {
    margin-top: ${(props)=>props.theme.marginXL}px;
  }

  .m-t-maxi {
    // @todo check missing margin token
    margin-top: ${(props)=>props.theme.sizeXXL}px;
  }

  .m-b-none {
    margin-bottom: 0;
  }

  .m-b-mini {
    margin-bottom: ${(props)=>props.theme.marginXXS}px;
  }

  .m-b-extra-small {
    margin-bottom: ${(props)=>props.theme.marginXS}px;
  }

  .m-b-small {
    margin-bottom: ${(props)=>props.theme.marginSM}px;
  }

  .m-b-normal {
    margin-bottom: ${(props)=>props.theme.margin}px;
  }

  .m-b-medium {
    margin-bottom: ${(props)=>props.theme.marginMD}px;
  }

  .m-b-large {
    margin-bottom: ${(props)=>props.theme.marginLG}px;
  }

  .m-b-extra-large {
    margin-bottom: ${(props)=>props.theme.marginXL}px;
  }

  .m-b-maxi {
    // @todo check missing margin token
    margin-bottom: ${(props)=>props.theme.sizeXXL}px;
  }

  .m-l-none {
    margin-left: 0;
  }

  .m-l-mini {
    margin-left: ${(props)=>props.theme.marginXXS}px;
  }

  .m-l-extra-small {
    margin-left: ${(props)=>props.theme.marginXS}px;
  }

  .m-l-small {
    margin-left: ${(props)=>props.theme.marginSM}px;
  }

  .m-l-normal {
    margin-left: ${(props)=>props.theme.margin}px;
  }

  .m-l-medium {
    margin-left: ${(props)=>props.theme.marginMD}px;
  }

  .m-l-large {
    margin-left: ${(props)=>props.theme.marginLG}px;
  }

  .m-l-extra-large {
    margin-left: ${(props)=>props.theme.marginXL}px;
  }

  .m-l-maxi {
    // @todo check missing margin token
    margin-left: ${(props)=>props.theme.sizeXXL}px;
  }

  .m-r-none {
    margin-right: 0;
  }

  .m-r-mini {
    margin-right: ${(props)=>props.theme.marginXXS}px;
  }

  .m-r-extra-small {
    margin-right: ${(props)=>props.theme.marginXS}px;
  }

  .m-r-small {
    margin-right: ${(props)=>props.theme.marginSM}px;
  }

  .m-r-normal {
    margin-right: ${(props)=>props.theme.margin}px;
  }

  .m-r-medium {
    margin-right: ${(props)=>props.theme.marginMD}px;
  }

  .m-r-large {
    margin-right: ${(props)=>props.theme.marginLG}px;
  }

  .m-r-extra-large {
    margin-right: ${(props)=>props.theme.marginXL}px;
  }

  .m-r-maxi {
    // @todo check missing margin token
    margin-right: ${(props)=>props.theme.sizeXXL}px;
  }

  .relative {
    position: relative;
  }

  .absolute {
    position: absolute;
  }

  .w-full {
    width: 100%;
  }

  .max-w-full {
      max-width: 100%;
  }
  
  .min-w-100 {
      min-width: 100px;
  }

  .min-w-200 {
      min-width: 200px;
  }

  .h-full {
    height: 100%;
  }

  .overflow-x-auto {
    overflow-x: auto;
  }

  .makeTabsGreatAgain {
    position: absolute;
    inset: 0;
  }
`;

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
"./js/src/sdk/_internal_/mf-bootstrap.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.a(module, async function (__webpack_handle_async_dependencies__, __webpack_async_result__) { try {
__webpack_require__.r(__webpack_exports__);
/* ESM import */var _Pimcore_bootstrap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/bootstrap.ts");
/* ESM import */var _Pimcore_modules_app_utils_app_runner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/app/utils/app-runner.tsx");
/* ESM import */var _Pimcore_app_plugin_system_plugin_system__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/app/plugin-system/plugin-system.ts");
/* ESM import */var _Pimcore_app_public_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/app/public-api/index.ts");
/* ESM import */var _Pimcore_app_module_system_module_system__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/app/module-system/module-system.ts");
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




if (true) {
    module.hot.accept();
}
window.Pimcore = (await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./js/src/core/app/public-api/index.ts"))).Pimcore;
window.PimcoreStudio = _Pimcore_app_public_api__WEBPACK_IMPORTED_MODULE_3__.PimcoreStudio;
window.addEventListener('load', async ()=>{
    await _Pimcore_app_plugin_system_plugin_system__WEBPACK_IMPORTED_MODULE_2__.pluginSystem.loadPlugins();
    _Pimcore_app_plugin_system_plugin_system__WEBPACK_IMPORTED_MODULE_2__.pluginSystem.initPlugins();
    _Pimcore_app_plugin_system_plugin_system__WEBPACK_IMPORTED_MODULE_2__.pluginSystem.startupPlugins();
    _Pimcore_app_module_system_module_system__WEBPACK_IMPORTED_MODULE_4__.moduleSystem.initModules();
    (0,_Pimcore_modules_app_utils_app_runner__WEBPACK_IMPORTED_MODULE_1__.runApp)();
});

function $RefreshSig$() {
  return $ReactRefreshRuntime$.createSignatureFunctionForTransform();
}
function $RefreshReg$(type, id) {
  $ReactRefreshRuntime$.register(type, module.id + "_" + id);
}
Promise.resolve().then(function() {
  $ReactRefreshRuntime$.refresh(module.id, module.hot);
});

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

}),
"./js/src/core/modules/app/app-loader/app-loader.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  AppLoader: () => (AppLoader)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/content/content.tsx");
/* ESM import */var _Pimcore_styles_global_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/styles/global.styles.ts");
/* ESM import */var _Pimcore_components_modal_alert_modal_hooks_use_alert_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/modal/alert-modal/hooks/use-alert-modal.tsx");
/* ESM import */var _Pimcore_modules_app_error_handler_services_error_modal_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/app/error-handler/services/error-modal-service.ts");
/* ESM import */var _Pimcore_modules_auth_hooks_use_is_authenticated__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/auth/hooks/use-is-authenticated.ts");
/* ESM import */var _loader_translation_loader__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/app/app-loader/loader/translation/loader.ts");
/* ESM import */var _loader_user_loader__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/app/app-loader/loader/user/loader.ts");
/* ESM import */var _mercure_api_slice_gen__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/app/mercure-api-slice.gen.ts");
/* ESM import */var _loader_settings_loader__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/app/app-loader/loader/settings/loader.tsx");
/* ESM import */var _loader_language_loader__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/app/app-loader/loader/language/loader.ts");
/* ESM import */var _Pimcore_modules_auth_user_user_slice__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/modules/auth/user/user-slice.ts");
/* ESM import */var _Pimcore_modules_perspectives_hooks_use_perspectives__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/modules/perspectives/hooks/use-perspectives.tsx");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_15__);
/* ESM import */var _Pimcore_app_public_api_modal_modal_api__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("./js/src/core/app/public-api/modal/modal-api.ts");
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
var _s = $RefreshSig$();
















const AppLoader = (props)=>{
    _s();
    const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const modal = (0,_Pimcore_components_modal_alert_modal_hooks_use_alert_modal__WEBPACK_IMPORTED_MODULE_5__.useAlertModal)();
    const { modal: studioModal } = antd__WEBPACK_IMPORTED_MODULE_15__.App.useApp();
    // Register the modal instance to allow centralized error message display throughout the project
    _Pimcore_modules_app_error_handler_services_error_modal_service__WEBPACK_IMPORTED_MODULE_6__.ErrorModalService.setModalInstance(modal);
    // Register the modal instance for iframe communication
    _Pimcore_app_public_api_modal_modal_api__WEBPACK_IMPORTED_MODULE_16__.modalApi.setModalInstance(studioModal);
    const { isAuthenticated } = (0,_Pimcore_modules_auth_hooks_use_is_authenticated__WEBPACK_IMPORTED_MODULE_7__.useIsAuthenticated)();
    const { loadPublicTranslations, loadTranslations } = (0,_loader_translation_loader__WEBPACK_IMPORTED_MODULE_8__.useTranslationLoader)();
    const { loadUser } = (0,_loader_user_loader__WEBPACK_IMPORTED_MODULE_9__.useUserLoader)();
    const [fetchMercureCookie] = (0,_mercure_api_slice_gen__WEBPACK_IMPORTED_MODULE_10__.useMercureCreateCookieMutation)();
    const { loadSettings } = (0,_loader_settings_loader__WEBPACK_IMPORTED_MODULE_11__.useSettingsLoader)();
    const { loadAvailableLocales } = (0,_loader_language_loader__WEBPACK_IMPORTED_MODULE_12__.useLanguageLoader)();
    const { loadPerspective } = (0,_Pimcore_modules_perspectives_hooks_use_perspectives__WEBPACK_IMPORTED_MODULE_14__.usePerspectives)();
    async function initActivePerspective() {
        const user = (0,_Pimcore_modules_auth_user_user_slice__WEBPACK_IMPORTED_MODULE_13__.selectCurrentUser)(_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_2__.store.getState());
        const perspectiveId = String((user === null || user === void 0 ? void 0 : user.activePerspective) ?? 'studio_default_perspective');
        return await loadPerspective(perspectiveId);
    }
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        void (async ()=>{
            setIsLoading(()=>true);
            if (isAuthenticated === undefined) {
                return;
            }
            if (!isAuthenticated) {
                await Promise.all([
                    loadPublicTranslations()
                ]).then(()=>{
                    setIsLoading(()=>false);
                }).catch((error)=>{
                    console.error('Error during login preparation', error);
                });
            }
            if (isAuthenticated) {
                await Promise.all([
                    loadUser()
                ]);
                await Promise.all([
                    fetchMercureCookie(),
                    loadTranslations(),
                    loadSettings(),
                    loadAvailableLocales(),
                    initActivePerspective()
                ]);
                setIsLoading(()=>false);
            }
        })();
    }, [
        isAuthenticated
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_styles_global_styles__WEBPACK_IMPORTED_MODULE_4__.GlobalStyles, {}, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/app-loader/app-loader.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, undefined),
            isLoading && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_3__.Content, {
                loading: true
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/app-loader/app-loader.tsx",
                lineNumber: 86,
                columnNumber: 21
            }, undefined),
            !isLoading && props.children
        ]
    }, void 0, true);
};
_s(AppLoader, "jibAnEUD4ccevqSLAr0T/LQyFdA=", false, function() {
    return [
        _Pimcore_components_modal_alert_modal_hooks_use_alert_modal__WEBPACK_IMPORTED_MODULE_5__.useAlertModal,
        antd__WEBPACK_IMPORTED_MODULE_15__.App.useApp,
        _Pimcore_modules_auth_hooks_use_is_authenticated__WEBPACK_IMPORTED_MODULE_7__.useIsAuthenticated,
        _loader_translation_loader__WEBPACK_IMPORTED_MODULE_8__.useTranslationLoader,
        _loader_user_loader__WEBPACK_IMPORTED_MODULE_9__.useUserLoader,
        _mercure_api_slice_gen__WEBPACK_IMPORTED_MODULE_10__.useMercureCreateCookieMutation,
        _loader_settings_loader__WEBPACK_IMPORTED_MODULE_11__.useSettingsLoader,
        _loader_language_loader__WEBPACK_IMPORTED_MODULE_12__.useLanguageLoader,
        _Pimcore_modules_perspectives_hooks_use_perspectives__WEBPACK_IMPORTED_MODULE_14__.usePerspectives
    ];
});
_c = AppLoader;
var _c;
$RefreshReg$(_c, "AppLoader");

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
"./js/src/core/modules/app/app-loader/loader/settings/loader.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useSettingsLoader: () => (useSettingsLoader)
});
/* ESM import */var _sdk_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/sdk/app/index.ts");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* ESM import */var _Pimcore_modules_app_settings_settings_slice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/app/settings/settings-slice.ts");
/* ESM import */var _Pimcore_modules_app_settings_settings_slice_gen__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/app/settings/settings-slice.gen.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ var _s = $RefreshSig$();




const useSettingsLoader = ()=>{
    _s();
    const dispatch = (0,_sdk_app__WEBPACK_IMPORTED_MODULE_0__.useAppDispatch)();
    const loadSettings = async ()=>{
        const settingsFetcher = dispatch(_Pimcore_modules_app_settings_settings_slice_gen__WEBPACK_IMPORTED_MODULE_3__.api.endpoints.systemSettingsGet.initiate());
        settingsFetcher.then((param)=>{
            let { data, isSuccess, isError, error } = param;
            isError && (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__.ApiError(error));
            if (isSuccess && data !== undefined) {
                dispatch((0,_Pimcore_modules_app_settings_settings_slice__WEBPACK_IMPORTED_MODULE_2__.setSettings)(data));
            }
        }).catch(()=>{});
    };
    return {
        loadSettings
    };
};
_s(useSettingsLoader, "BJQ1DUn/XFEl2NsQ3DWyHAXfnkY=", false, function() {
    return [
        _sdk_app__WEBPACK_IMPORTED_MODULE_0__.useAppDispatch
    ];
});

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
"./js/src/core/modules/app/app-view.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  AppView: () => (AppView)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _global_provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/app/global-provider.tsx");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/react-router-dom/react-router-dom");
/* ESM import */var react_router_dom__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var _Pimcore_app_router_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/app/router/router.tsx");
/* ESM import */var _Pimcore_modules_app_app_loader_app_loader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/app/app-loader/app-loader.tsx");
/* ESM import */var _Pimcore_app_config_date_time__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/app/config/date-time.tsx");
/* ESM import */var _Pimcore_modules_app_error_boundary_error_boundary__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/app/error-boundary/error-boundary.tsx");
/* ESM import */var _modals_provider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/app/modals-provider.tsx");
/* ESM import */var _Pimcore_app_public_api_api_gateway__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/app/public-api/api-gateway/index.ts");
/* ESM import */var _element_actions_copy_paste_tree_copy_paste_context__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/element/actions/copy-paste/tree-copy-paste-context.tsx");
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











const AppView = ()=>{
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react__WEBPACK_IMPORTED_MODULE_1__.StrictMode, {
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_app_error_boundary_error_boundary__WEBPACK_IMPORTED_MODULE_8__["default"], {
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_global_provider__WEBPACK_IMPORTED_MODULE_2__.GlobalProvider, {
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.App, {
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_element_actions_copy_paste_tree_copy_paste_context__WEBPACK_IMPORTED_MODULE_11__.TreeCopyPasteProvider, {
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_modals_provider__WEBPACK_IMPORTED_MODULE_9__.ModalsProvider, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_app_public_api_api_gateway__WEBPACK_IMPORTED_MODULE_10__.ApiGateway, {}, void 0, false, {
                                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/app-view.tsx",
                                    lineNumber: 29,
                                    columnNumber: 18
                                }, undefined),
                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_app_config_date_time__WEBPACK_IMPORTED_MODULE_7__.DateTimeConfig, {
                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_app_app_loader_app_loader__WEBPACK_IMPORTED_MODULE_6__.AppLoader, {
                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_router_dom__WEBPACK_IMPORTED_MODULE_4__.RouterProvider, {
                                            router: _Pimcore_app_router_router__WEBPACK_IMPORTED_MODULE_5__.router
                                        }, void 0, false, {
                                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/app-view.tsx",
                                            lineNumber: 32,
                                            columnNumber: 21
                                        }, undefined)
                                    }, void 0, false, {
                                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/app-view.tsx",
                                        lineNumber: 31,
                                        columnNumber: 19
                                    }, undefined)
                                }, void 0, false, {
                                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/app-view.tsx",
                                    lineNumber: 30,
                                    columnNumber: 17
                                }, undefined)
                            ]
                        }, void 0, true, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/app-view.tsx",
                            lineNumber: 28,
                            columnNumber: 15
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/app-view.tsx",
                        lineNumber: 27,
                        columnNumber: 13
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/app-view.tsx",
                    lineNumber: 26,
                    columnNumber: 11
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/app-view.tsx",
                lineNumber: 25,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/app-view.tsx",
            lineNumber: 24,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/app-view.tsx",
        lineNumber: 23,
        columnNumber: 10
    }, undefined);
};
_c = AppView;
var _c;
$RefreshReg$(_c, "AppView");

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
"./js/src/core/modules/app/utils/app-runner.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  runApp: () => (runApp)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react_dom_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/react-dom/client.js");
/* ESM import */var _app_view__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/app/app-view.tsx");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _Pimcore_app_public_api_settings_settings_api__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/app/public-api/settings/settings-api.ts");
/* ESM import */var _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/app/depency-injection/index.ts");
/* ESM import */var _Pimcore_app_config_services_service_ids__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/app/config/services/service-ids.ts");
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








function runApp() {
    // Initialize the settings API with the Redux store for iframe communication
    _Pimcore_app_public_api_settings_settings_api__WEBPACK_IMPORTED_MODULE_6__.settingsApi.initialize(_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_5__.store);
    // Start global message bus subscription after all modules are initialized
    try {
        const globalMessageBus = _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_7__.container.get(_Pimcore_app_config_services_service_ids__WEBPACK_IMPORTED_MODULE_8__.serviceIds.globalMessageBus);
        globalMessageBus.startGlobalSubscription();
    } catch (error) {
        console.error('Failed to start global message bus subscription:', error);
    }
    const domElement = document.getElementById('app');
    if (domElement === null) {
        (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_4__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_4__.GeneralError('Root element not found'));
        return undefined;
    }
    const root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_2__.createRoot)(domElement);
    root.render(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_app_view__WEBPACK_IMPORTED_MODULE_3__.AppView, {}, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/utils/app-runner.tsx",
        lineNumber: 36,
        columnNumber: 15
    }, this));
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
//# sourceMappingURL=__federation_expose__internal___mf_bootstrap.js.map