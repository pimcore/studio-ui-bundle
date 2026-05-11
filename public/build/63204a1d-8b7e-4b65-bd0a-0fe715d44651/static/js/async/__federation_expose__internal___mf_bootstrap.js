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
(self["chunk_pimcore_studio_ui_bundle "] = self["chunk_pimcore_studio_ui_bundle "] || []).push([["__federation_expose__internal___mf_bootstrap"], {
"./js/src/core/modules/app/app-loader/loader/global-message-bus/loader.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useGlobalMessageBusLoader: () => (useGlobalMessageBusLoader)
});
/* import */ var react__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var _sdk_app__rspack_import_1 = __webpack_require__("./js/src/sdk/app/index.ts");
/* import */ var _Pimcore_modules_execution_engine_topics__rspack_import_2 = __webpack_require__("./js/src/core/modules/execution-engine/topics.ts");
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


const useGlobalMessageBusLoader = ()=>{
    const isInitialized = (0,react__rspack_import_0.useRef)(false);
    const initGlobalMessageBus = (userId)=>{
        if (isInitialized.current) {
            return;
        }
        try {
            const messageRegistry = _sdk_app__rspack_import_1.container.get(_sdk_app__rspack_import_1.serviceIds.globalMessageBus);
            const globalProcess = _sdk_app__rspack_import_1.container.get(_sdk_app__rspack_import_1.serviceIds.globalMessageBusProcess);
            const backgroundProcessor = _sdk_app__rspack_import_1.container.get(_sdk_app__rspack_import_1.serviceIds.backgroundProcessor);
            messageRegistry.registerTopics([
                ...Object.values(_Pimcore_modules_execution_engine_topics__rspack_import_2.topics),
                `studio-backend-default/user/${userId}`
            ]);
            backgroundProcessor.registerProcess(globalProcess);
            messageRegistry.startGlobalSubscription();
            // Reconnect when tab becomes visible again
            document.addEventListener('visibilitychange', ()=>{
                if (document.visibilityState === 'visible' && !globalProcess.isConnected()) {
                    globalProcess.start();
                }
            });
            // Reconnect on network change as the connection is likely stale
            window.addEventListener('online', ()=>{
                globalProcess.start();
            });
            isInitialized.current = true;
        } catch (error) {
            console.error('Failed to initialize global message bus:', error);
        }
    };
    return {
        initGlobalMessageBus
    };
};

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/app/app-loader/loader/language/loader.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useLanguageLoader: () => (useLanguageLoader)
});
/* import */ var _Pimcore_app_store__rspack_import_0 = __webpack_require__("./js/src/core/app/store/index.ts");
/* import */ var _Pimcore_modules_app_translations_translations_api_slice_enhanced__rspack_import_1 = __webpack_require__("./js/src/core/modules/app/translations/translations-api-slice-enhanced.ts");
/* import */ var _Pimcore_modules_app_error_handler__rspack_import_2 = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
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
            await _Pimcore_app_store__rspack_import_0.store.dispatch(_Pimcore_modules_app_translations_translations_api_slice_enhanced__rspack_import_1.api.endpoints.translationGetAvailableLocales.initiate(undefined, {
                forceRefetch: false,
                subscribe: true
            })).unwrap();
        } catch (error) {
            (0,_Pimcore_modules_app_error_handler__rspack_import_2["default"])(new _Pimcore_modules_app_error_handler__rspack_import_2.GeneralError('Error loading available locales'));
            throw error;
        }
    };
    return {
        loadAvailableLocales
    };
};

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/app/app-loader/loader/translation/loader.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useTranslationLoader: () => (useTranslationLoader)
});
/* import */ var _Pimcore_app_i18n__rspack_import_0 = __webpack_require__("./js/src/core/app/i18n/index.ts");
/* import */ var _Pimcore_app_store__rspack_import_1 = __webpack_require__("./js/src/core/app/store/index.ts");
/* import */ var _Pimcore_modules_app_error_handler__rspack_import_2 = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* import */ var _Pimcore_modules_app_translations_translations_api_slice_gen__rspack_import_3 = __webpack_require__("./js/src/core/modules/app/translations/translations-api-slice.gen.ts");
/* import */ var _Pimcore_modules_auth_user_user_slice__rspack_import_4 = __webpack_require__("./js/src/core/modules/auth/user/user-slice.ts");
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
    const [fetchTranslations] = (0,_Pimcore_modules_app_translations_translations_api_slice_gen__rspack_import_3.useTranslationGetCollectionMutation)();
    const loadPublicTranslations = async ()=>{
        await fetchTranslations({
            translation: {
                locale: _Pimcore_app_i18n__rspack_import_0.FALLBACK_LANGUAGE,
                keys: [],
                useFallback: true
            }
        }).unwrap().then((response)=>{
            _Pimcore_app_i18n__rspack_import_0["default"].addResourceBundle(_Pimcore_app_i18n__rspack_import_0.FALLBACK_LANGUAGE, 'translation', response.keys ?? [], true, true);
            void _Pimcore_app_i18n__rspack_import_0["default"].changeLanguage(_Pimcore_app_i18n__rspack_import_0.FALLBACK_LANGUAGE);
        }).catch(()=>{
            (0,_Pimcore_modules_app_error_handler__rspack_import_2["default"])(new _Pimcore_modules_app_error_handler__rspack_import_2.GeneralError('Error loading translations'));
            throw new Error('Error loading translations');
        });
    };
    const loadTranslations = async ()=>{
        const user = (0,_Pimcore_modules_auth_user_user_slice__rspack_import_4.selectCurrentUser)(_Pimcore_app_store__rspack_import_1.store.getState());
        await fetchTranslations({
            translation: {
                locale: user.language,
                keys: [],
                useFallback: true
            }
        }).unwrap().then((response)=>{
            _Pimcore_app_i18n__rspack_import_0["default"].addResourceBundle(user.language, 'translation', response.keys ?? [], true, true);
            void _Pimcore_app_i18n__rspack_import_0["default"].changeLanguage(user.language);
        }).catch((error)=>{
            console.error('Error loading translations', error);
            (0,_Pimcore_modules_app_error_handler__rspack_import_2["default"])(new _Pimcore_modules_app_error_handler__rspack_import_2.GeneralError('Error loading translations'));
        });
    };
    return {
        loadPublicTranslations,
        loadTranslations
    };
};

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/app/app-loader/loader/user/loader.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useUserLoader: () => (useUserLoader)
});
/* import */ var _sdk_app__rspack_import_0 = __webpack_require__("./js/src/sdk/app/index.ts");
/* import */ var _Pimcore_modules_app_error_handler__rspack_import_1 = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* import */ var _Pimcore_modules_auth_user_user_slice__rspack_import_2 = __webpack_require__("./js/src/core/modules/auth/user/user-slice.ts");
/* import */ var _Pimcore_modules_user_user_api_slice_enhanced__rspack_import_3 = __webpack_require__("./js/src/core/modules/user/user-api-slice-enhanced.ts");
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
    const dispatch = (0,_sdk_app__rspack_import_0.useAppDispatch)();
    const loadUser = async ()=>{
        const userFetcher = dispatch(_Pimcore_modules_user_user_api_slice_enhanced__rspack_import_3.api.endpoints.userGetCurrentInformation.initiate());
        await userFetcher.then((param)=>{
            let { data, isSuccess, isError, error } = param;
            if (isError) {
                // Handle error appropriately
                (0,_Pimcore_modules_app_error_handler__rspack_import_1["default"])(new _Pimcore_modules_app_error_handler__rspack_import_1.ApiError(error));
            } else if (isSuccess && data !== undefined) {
                // Dispatch action to set user information in the store
                dispatch((0,_Pimcore_modules_auth_user_user_slice__rspack_import_2.setUser)(data));
            }
        }).catch((err)=>{
            (0,_Pimcore_modules_app_error_handler__rspack_import_1["default"])(new _Pimcore_modules_app_error_handler__rspack_import_1.GeneralError('Error loading user information'));
            throw new Error('Error loading user information', {
                cause: err
            });
        });
    };
    return {
        loadUser
    };
};

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/app/mercure-api-slice.gen.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useMercureCreateCookieMutation: () => (useMercureCreateCookieMutation)
});
/* import */ var _sdk_api__rspack_import_0 = __webpack_require__("./js/src/sdk/api/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Mercure"
];
const injectedRtkApi = _sdk_api__rspack_import_0.api.enhanceEndpoints({
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

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/styles/global.styles.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  GlobalStyles: () => (GlobalStyles)
});
/* import */ var antd_style__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/antd-style/antd-style");
/* import */ var antd_style__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(antd_style__rspack_import_0);
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
const GlobalStyles = (0,antd_style__rspack_import_0.createGlobalStyle)`
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

  :not(.menu--is-calculated-height).ant-dropdown-menu,
  .ant-dropdown-menu-sub {
    overflow: auto;
    max-height: 48vh;
  }

  .ant-dropdown-menu-submenu-popup {
    box-shadow: ${(props)=>props.theme.boxShadowSecondary};
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

  .absolute-stretch {
    position: absolute;
    inset: 0;
  }

  //fix notification enter transition bug
  .ant-notification-stack > .ant-notification-notice-wrapper {
      transition: transform 0.3s, backdrop-filter 0s;
  }

  /** WORKFLOW PLACE INDICATOR **/
  span:has(> .pimcore-workflow-place-indicator) {
    display: contents;
  }

  .pimcore-workflow-place-indicator {
    display: inline-block;
    vertical-align: middle;
    padding: 2px 8px;
    border-radius: 3px;
    line-height: 1.4;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    box-sizing: border-box;
  }
`;

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/sdk/_internal_/mf-bootstrap.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.a(module, async function (__rspack_load_async_deps, __rspack_async_done) { try {
__webpack_require__.r(__webpack_exports__);
/* import */ var _Pimcore_bootstrap__rspack_import_0 = __webpack_require__("./js/src/core/bootstrap.ts");
/* import */ var _Pimcore_modules_app_utils_app_runner__rspack_import_1 = __webpack_require__("./js/src/core/modules/app/utils/app-runner.tsx");
/* import */ var _Pimcore_app_plugin_system_plugin_system__rspack_import_2 = __webpack_require__("./js/src/core/app/plugin-system/plugin-system.ts");
/* import */ var _Pimcore_app_public_api__rspack_import_3 = __webpack_require__("./js/src/core/app/public-api/index.ts");
/* import */ var _Pimcore_app_module_system_module_system__rspack_import_4 = __webpack_require__("./js/src/core/app/module-system/module-system.ts");
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
window.PimcoreStudio = _Pimcore_app_public_api__rspack_import_3.PimcoreStudio;
window.addEventListener('load', async ()=>{
    await _Pimcore_app_plugin_system_plugin_system__rspack_import_2.pluginSystem.loadPlugins();
    _Pimcore_app_plugin_system_plugin_system__rspack_import_2.pluginSystem.initPlugins();
    _Pimcore_app_plugin_system_plugin_system__rspack_import_2.pluginSystem.startupPlugins();
    _Pimcore_app_module_system_module_system__rspack_import_4.moduleSystem.initModules();
    (0,_Pimcore_modules_app_utils_app_runner__rspack_import_1.runApp)();
});

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });

__rspack_async_done();
} catch(e) { __rspack_async_done(e); } }, 1);

},
"./js/src/core/modules/app/app-loader/app-loader.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  AppLoader: () => (AppLoader)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var lodash__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_2);
/* import */ var _Pimcore_app_store__rspack_import_3 = __webpack_require__("./js/src/core/app/store/index.ts");
/* import */ var _Pimcore_components_background_background_styles__rspack_import_4 = __webpack_require__("./js/src/core/components/background/background.styles.ts");
/* import */ var _Pimcore_modules_app_component_registry_component_registry__rspack_import_5 = __webpack_require__("./js/src/core/modules/app/component-registry/component-registry.ts");
/* import */ var _Pimcore_styles_global_styles__rspack_import_6 = __webpack_require__("./js/src/core/styles/global.styles.ts");
/* import */ var _Pimcore_components_modal_alert_modal_hooks_use_alert_modal__rspack_import_7 = __webpack_require__("./js/src/core/components/modal/alert-modal/hooks/use-alert-modal.tsx");
/* import */ var _Pimcore_modules_app_error_handler_services_error_modal_service__rspack_import_8 = __webpack_require__("./js/src/core/modules/app/error-handler/services/error-modal-service.ts");
/* import */ var _Pimcore_modules_auth_hooks_use_is_authenticated__rspack_import_9 = __webpack_require__("./js/src/core/modules/auth/hooks/use-is-authenticated.ts");
/* import */ var _loader_translation_loader__rspack_import_10 = __webpack_require__("./js/src/core/modules/app/app-loader/loader/translation/loader.ts");
/* import */ var _loader_user_loader__rspack_import_11 = __webpack_require__("./js/src/core/modules/app/app-loader/loader/user/loader.ts");
/* import */ var _mercure_api_slice_gen__rspack_import_12 = __webpack_require__("./js/src/core/modules/app/mercure-api-slice.gen.ts");
/* import */ var _loader_settings_loader__rspack_import_13 = __webpack_require__("./js/src/core/modules/app/app-loader/loader/settings/loader.tsx");
/* import */ var _loader_language_loader__rspack_import_14 = __webpack_require__("./js/src/core/modules/app/app-loader/loader/language/loader.ts");
/* import */ var _loader_brand_thumbnail_urls_loader__rspack_import_15 = __webpack_require__("./js/src/core/modules/app/app-loader/loader/brand-thumbnail-urls/loader.tsx");
/* import */ var _loader_admin_settings_loader__rspack_import_16 = __webpack_require__("./js/src/core/modules/app/app-loader/loader/admin-settings/loader.tsx");
/* import */ var _Pimcore_modules_auth_user_user_slice__rspack_import_17 = __webpack_require__("./js/src/core/modules/auth/user/user-slice.ts");
/* import */ var _Pimcore_modules_perspectives_hooks_use_perspectives__rspack_import_18 = __webpack_require__("./js/src/core/modules/perspectives/hooks/use-perspectives.tsx");
/* import */ var antd__rspack_import_19 = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* import */ var antd__rspack_import_19_default = /*#__PURE__*/__webpack_require__.n(antd__rspack_import_19);
/* import */ var _Pimcore_app_public_api_modal_modal_api__rspack_import_20 = __webpack_require__("./js/src/core/app/public-api/modal/modal-api.ts");
/* import */ var _Pimcore_modules_reports_utils_reports_loader__rspack_import_21 = __webpack_require__("./js/src/core/modules/reports/utils/reports-loader.ts");
/* import */ var _sdk_app__rspack_import_22 = __webpack_require__("./js/src/sdk/app/index.ts");
/* import */ var _loader_global_message_bus_loader__rspack_import_23 = __webpack_require__("./js/src/core/modules/app/app-loader/loader/global-message-bus/loader.ts");
/* import */ var _context_app_loading_context__rspack_import_24 = __webpack_require__("./js/src/core/modules/app/app-loader/context/app-loading-context.tsx");
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























const AppLoader = (props)=>{
    _s();
    const [phase, setPhase] = (0,react__rspack_import_1.useState)('loading');
    const isLoading = phase === 'loading' || phase === 'outro';
    const [pendingLoaders, setPendingLoaders] = (0,react__rspack_import_1.useState)(new Set());
    const registerLoader = (0,react__rspack_import_1.useCallback)((id)=>{
        setPendingLoaders((prev)=>new Set(prev).add(id));
    }, []);
    const unregisterLoader = (0,react__rspack_import_1.useCallback)((id)=>{
        setPendingLoaders((prev)=>{
            const next = new Set(prev);
            next.delete(id);
            return next;
        });
    }, []);
    const loading = isLoading || pendingLoaders.size > 0;
    const appLoadingContextValue = (0,react__rspack_import_1.useMemo)(()=>({
            registerLoader,
            unregisterLoader,
            isAppLoading: loading
        }), [
        registerLoader,
        unregisterLoader,
        loading
    ]);
    const outroTimerRef = (0,react__rspack_import_1.useRef)(null);
    const finishLoading = (0,react__rspack_import_1.useCallback)(()=>{
        setPhase('outro');
        outroTimerRef.current = setTimeout(()=>{
            setPhase('idle');
        }, 1000);
    }, []);
    (0,react__rspack_import_1.useEffect)(()=>{
        return ()=>{
            if (outroTimerRef.current !== null) {
                clearTimeout(outroTimerRef.current);
            }
        };
    }, []);
    const modal = (0,_Pimcore_components_modal_alert_modal_hooks_use_alert_modal__rspack_import_7.useAlertModal)();
    const { modal: studioModal } = antd__rspack_import_19.App.useApp();
    // Register the modal instance to allow centralized error message display throughout the project
    _Pimcore_modules_app_error_handler_services_error_modal_service__rspack_import_8.ErrorModalService.setModalInstance(modal);
    // Register the modal instance for iframe communication
    _Pimcore_app_public_api_modal_modal_api__rspack_import_20.modalApi.setModalInstance(studioModal);
    const { isAuthenticated } = (0,_Pimcore_modules_auth_hooks_use_is_authenticated__rspack_import_9.useIsAuthenticated)();
    const { loadPublicTranslations, loadTranslations } = (0,_loader_translation_loader__rspack_import_10.useTranslationLoader)();
    const { loadUser } = (0,_loader_user_loader__rspack_import_11.useUserLoader)();
    const [fetchMercureCookie] = (0,_mercure_api_slice_gen__rspack_import_12.useMercureCreateCookieMutation)();
    const { loadSettings } = (0,_loader_settings_loader__rspack_import_13.useSettingsLoader)();
    const { loadAvailableLocales } = (0,_loader_language_loader__rspack_import_14.useLanguageLoader)();
    const { loadBrandThumbnailUrls } = (0,_loader_brand_thumbnail_urls_loader__rspack_import_15.useBrandThumbnailUrlLoader)();
    const { loadAdminSettings } = (0,_loader_admin_settings_loader__rspack_import_16.useAdminSettingsLoader)();
    const { loadPerspective } = (0,_Pimcore_modules_perspectives_hooks_use_perspectives__rspack_import_18.usePerspectives)();
    const { initGlobalMessageBus } = (0,_loader_global_message_bus_loader__rspack_import_23.useGlobalMessageBusLoader)();
    const appLoaderRegistry = _sdk_app__rspack_import_22.container.get(_sdk_app__rspack_import_22.serviceIds["AppLoader/Registry"]);
    async function initActivePerspective() {
        const user = (0,_Pimcore_modules_auth_user_user_slice__rspack_import_17.selectCurrentUser)(_Pimcore_app_store__rspack_import_3.store.getState());
        const perspectiveId = String((user === null || user === void 0 ? void 0 : user.activePerspective) ?? 'studio_default_perspective');
        return await loadPerspective(perspectiveId);
    }
    (0,react__rspack_import_1.useEffect)(()=>{
        void (async ()=>{
            setPhase('loading');
            if (isAuthenticated === undefined) {
                return;
            }
            if (!isAuthenticated) {
                await Promise.all([
                    loadPublicTranslations(),
                    loadBrandThumbnailUrls()
                ]).then(()=>{
                    finishLoading();
                }).catch((error)=>{
                    console.error('Error during login preparation', error);
                });
            }
            if (isAuthenticated) {
                await Promise.all([
                    loadUser()
                ]);
                const user = (0,_Pimcore_modules_auth_user_user_slice__rspack_import_17.selectCurrentUser)(_Pimcore_app_store__rspack_import_3.store.getState());
                if (!(0,lodash__rspack_import_2.isNil)(user === null || user === void 0 ? void 0 : user.id)) {
                    initGlobalMessageBus(user.id);
                }
                await Promise.all([
                    fetchMercureCookie(),
                    loadTranslations(),
                    loadSettings(),
                    loadAdminSettings(),
                    loadBrandThumbnailUrls(),
                    loadAvailableLocales(),
                    initActivePerspective(),
                    (0,_Pimcore_modules_reports_utils_reports_loader__rspack_import_21.loadReportsMenuItems)()
                ]);
                await appLoaderRegistry.loadAll();
                finishLoading();
            }
        })();
    }, [
        isAuthenticated
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(react_jsx_dev_runtime__rspack_import_0.Fragment, {
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_styles_global_styles__rspack_import_6.GlobalStyles, {}, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/app-loader/app-loader.tsx",
                lineNumber: 139,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_context_app_loading_context__rspack_import_24.AppLoadingContext.Provider, {
                value: appLoadingContextValue,
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_app_component_registry_component_registry__rspack_import_5.ComponentRenderer, {
                        component: _Pimcore_modules_app_component_registry_component_registry__rspack_import_5.componentConfig.app.background.name,
                        props: {
                            phase
                        }
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/app-loader/app-loader.tsx",
                        lineNumber: 142,
                        columnNumber: 9
                    }, undefined),
                    phase === 'idle' && /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)("div", {
                        style: {
                            position: 'absolute',
                            inset: 0,
                            animation: `${_Pimcore_components_background_background_styles__rspack_import_4.appIntro} 600ms ease 200ms both`
                        },
                        children: [
                            "            ",
                            props.children
                        ]
                    }, void 0, true, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/app-loader/app-loader.tsx",
                        lineNumber: 145,
                        columnNumber: 30
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/app-loader/app-loader.tsx",
                lineNumber: 141,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true);
};
_s(AppLoader, "tyddz52VWQprtBjrI30vHqOPw6w=", false, function() {
    return [
        _Pimcore_components_modal_alert_modal_hooks_use_alert_modal__rspack_import_7.useAlertModal,
        antd__rspack_import_19.App.useApp,
        _Pimcore_modules_auth_hooks_use_is_authenticated__rspack_import_9.useIsAuthenticated,
        _loader_translation_loader__rspack_import_10.useTranslationLoader,
        _loader_user_loader__rspack_import_11.useUserLoader,
        _mercure_api_slice_gen__rspack_import_12.useMercureCreateCookieMutation,
        _loader_settings_loader__rspack_import_13.useSettingsLoader,
        _loader_language_loader__rspack_import_14.useLanguageLoader,
        _loader_brand_thumbnail_urls_loader__rspack_import_15.useBrandThumbnailUrlLoader,
        _loader_admin_settings_loader__rspack_import_16.useAdminSettingsLoader,
        _Pimcore_modules_perspectives_hooks_use_perspectives__rspack_import_18.usePerspectives,
        _loader_global_message_bus_loader__rspack_import_23.useGlobalMessageBusLoader
    ];
});
_c = AppLoader;
var _c;
$RefreshReg$(_c, "AppLoader");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/app/app-loader/context/app-loading-context.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  AppLoadingContext: () => (AppLoadingContext),
  useIsAppLoading: () => (useIsAppLoading),
  useRegisterAppLoading: () => (useRegisterAppLoading)
});
/* import */ var react__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
var _s = $RefreshSig$(), _s1 = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 
const AppLoadingContext = /*#__PURE__*/ (0,react__rspack_import_0.createContext)({
    registerLoader: ()=>{},
    unregisterLoader: ()=>{},
    isAppLoading: false
});
/**
 * Register a named loading participant with the AppLoader background gate.
 * The background stays visible until every registered participant calls the
 * returned `setLoaded` callback (or the component unmounts).
 */ const useRegisterAppLoading = (id)=>{
    _s();
    const { registerLoader, unregisterLoader } = (0,react__rspack_import_0.useContext)(AppLoadingContext);
    (0,react__rspack_import_0.useEffect)(()=>{
        registerLoader(id);
        return ()=>{
            unregisterLoader(id);
        };
    }, [
        id
    ]);
    return (0,react__rspack_import_0.useCallback)(()=>{
        unregisterLoader(id);
    }, [
        unregisterLoader,
        id
    ]);
};
_s(useRegisterAppLoading, "cHjkJNVF8ajWCH/bKBWRSfPfxMA=");
/**
 * Returns true while the initial app loading sequence is still in progress.
 * Use this to suppress loading indicators that are redundant during the
 * initial load (the animated background already covers the screen).
 */ const useIsAppLoading = ()=>{
    _s1();
    return (0,react__rspack_import_0.useContext)(AppLoadingContext).isAppLoading;
};
_s1(useIsAppLoading, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/app/app-loader/loader/admin-settings/loader.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useAdminSettingsLoader: () => (useAdminSettingsLoader)
});
/* import */ var _Pimcore_app_store__rspack_import_0 = __webpack_require__("./js/src/core/app/store/index.ts");
/* import */ var _Pimcore_modules_app_error_handler__rspack_import_1 = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* import */ var _Pimcore_modules_app_settings_settings_slice_gen__rspack_import_2 = __webpack_require__("./js/src/core/modules/app/settings/settings-slice.gen.ts");
/* import */ var _Pimcore_modules_app_settings_settings_slice__rspack_import_3 = __webpack_require__("./js/src/core/modules/app/settings/settings-slice.ts");
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



const useAdminSettingsLoader = ()=>{
    _s();
    const dispatch = (0,_Pimcore_app_store__rspack_import_0.useAppDispatch)();
    const loadAdminSettings = async ()=>{
        const adminSettingsFetcher = dispatch(_Pimcore_modules_app_settings_settings_slice_gen__rspack_import_2.api.endpoints.adminSettingsGet.initiate());
        await adminSettingsFetcher.then((param)=>{
            let { data, isSuccess, isError, error } = param;
            if (isError) {
                (0,_Pimcore_modules_app_error_handler__rspack_import_1["default"])(new _Pimcore_modules_app_error_handler__rspack_import_1.ApiError(error));
            } else if (isSuccess && data !== undefined) {
                dispatch((0,_Pimcore_modules_app_settings_settings_slice__rspack_import_3.setAdminSettings)(data));
            }
        }).catch(()=>{
            (0,_Pimcore_modules_app_error_handler__rspack_import_1["default"])(new _Pimcore_modules_app_error_handler__rspack_import_1.GeneralError('Error loading admin settings'));
        });
    };
    return {
        loadAdminSettings
    };
};
_s(useAdminSettingsLoader, "BJQ1DUn/XFEl2NsQ3DWyHAXfnkY=", false, function() {
    return [
        _Pimcore_app_store__rspack_import_0.useAppDispatch
    ];
});

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/app/app-loader/loader/brand-thumbnail-urls/loader.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useBrandThumbnailUrlLoader: () => (useBrandThumbnailUrlLoader)
});
/* import */ var _sdk_app__rspack_import_0 = __webpack_require__("./js/src/sdk/app/index.ts");
/* import */ var _Pimcore_modules_app_error_handler__rspack_import_1 = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* import */ var _Pimcore_modules_app_settings_settings_slice_gen__rspack_import_2 = __webpack_require__("./js/src/core/modules/app/settings/settings-slice.gen.ts");
/* import */ var _Pimcore_modules_app_settings_settings_slice__rspack_import_3 = __webpack_require__("./js/src/core/modules/app/settings/settings-slice.ts");
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



const useBrandThumbnailUrlLoader = ()=>{
    _s();
    const dispatch = (0,_sdk_app__rspack_import_0.useAppDispatch)();
    const loadBrandThumbnailUrls = async ()=>{
        const thumbnailsFetcher = dispatch(_Pimcore_modules_app_settings_settings_slice_gen__rspack_import_2.api.endpoints.settingAdminThumbnail.initiate());
        await thumbnailsFetcher.then((param)=>{
            let { data, isSuccess, isError, error } = param;
            if (isError) {
                (0,_Pimcore_modules_app_error_handler__rspack_import_1["default"])(new _Pimcore_modules_app_error_handler__rspack_import_1.ApiError(error));
            } else if (isSuccess && data !== undefined) {
                dispatch((0,_Pimcore_modules_app_settings_settings_slice__rspack_import_3.setThumbnails)(data));
            }
        }).catch(()=>{
            (0,_Pimcore_modules_app_error_handler__rspack_import_1["default"])(new _Pimcore_modules_app_error_handler__rspack_import_1.GeneralError('Error loading brand thumbnail URLs'));
        });
    };
    return {
        loadBrandThumbnailUrls
    };
};
_s(useBrandThumbnailUrlLoader, "BJQ1DUn/XFEl2NsQ3DWyHAXfnkY=", false, function() {
    return [
        _sdk_app__rspack_import_0.useAppDispatch
    ];
});

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/app/app-loader/loader/settings/loader.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useSettingsLoader: () => (useSettingsLoader)
});
/* import */ var _sdk_app__rspack_import_0 = __webpack_require__("./js/src/sdk/app/index.ts");
/* import */ var _Pimcore_modules_app_error_handler__rspack_import_1 = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* import */ var _Pimcore_modules_app_settings_settings_slice__rspack_import_2 = __webpack_require__("./js/src/core/modules/app/settings/settings-slice.ts");
/* import */ var _Pimcore_modules_app_settings_settings_slice_gen__rspack_import_3 = __webpack_require__("./js/src/core/modules/app/settings/settings-slice.gen.ts");
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



const useSettingsLoader = ()=>{
    _s();
    const dispatch = (0,_sdk_app__rspack_import_0.useAppDispatch)();
    const loadSettings = async ()=>{
        const settingsFetcher = dispatch(_Pimcore_modules_app_settings_settings_slice_gen__rspack_import_3.api.endpoints.systemSettingsGet.initiate());
        settingsFetcher.then((param)=>{
            let { data, isSuccess, isError, error } = param;
            isError && (0,_Pimcore_modules_app_error_handler__rspack_import_1["default"])(new _Pimcore_modules_app_error_handler__rspack_import_1.ApiError(error));
            if (isSuccess && data !== undefined) {
                dispatch((0,_Pimcore_modules_app_settings_settings_slice__rspack_import_2.setSettings)(data));
            }
        }).catch(()=>{});
    };
    return {
        loadSettings
    };
};
_s(useSettingsLoader, "BJQ1DUn/XFEl2NsQ3DWyHAXfnkY=", false, function() {
    return [
        _sdk_app__rspack_import_0.useAppDispatch
    ];
});

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/app/app-view.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  AppView: () => (AppView)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _global_provider__rspack_import_2 = __webpack_require__("./js/src/core/modules/app/global-provider.tsx");
/* import */ var antd__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* import */ var antd__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(antd__rspack_import_3);
/* import */ var react_router_dom__rspack_import_4 = __webpack_require__("webpack/sharing/consume/default/react-router-dom/react-router-dom");
/* import */ var react_router_dom__rspack_import_4_default = /*#__PURE__*/__webpack_require__.n(react_router_dom__rspack_import_4);
/* import */ var _Pimcore_app_router_router__rspack_import_5 = __webpack_require__("./js/src/core/app/router/router.tsx");
/* import */ var _Pimcore_modules_app_app_loader_app_loader__rspack_import_6 = __webpack_require__("./js/src/core/modules/app/app-loader/app-loader.tsx");
/* import */ var _Pimcore_app_config_date_time__rspack_import_7 = __webpack_require__("./js/src/core/app/config/date-time.tsx");
/* import */ var _Pimcore_modules_app_error_boundary_error_boundary__rspack_import_8 = __webpack_require__("./js/src/core/modules/app/error-boundary/error-boundary.tsx");
/* import */ var _modals_provider__rspack_import_9 = __webpack_require__("./js/src/core/modules/app/modals-provider.tsx");
/* import */ var _Pimcore_app_public_api_api_gateway__rspack_import_10 = __webpack_require__("./js/src/core/app/public-api/api-gateway/index.ts");
/* import */ var _element_actions_copy_paste_tree_copy_paste_context__rspack_import_11 = __webpack_require__("./js/src/core/modules/element/actions/copy-paste/tree-copy-paste-context.tsx");
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
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(react__rspack_import_1.StrictMode, {
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_app_error_boundary_error_boundary__rspack_import_8["default"], {
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_global_provider__rspack_import_2.GlobalProvider, {
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_3.App, {
                    notification: {
                        stack: false
                    },
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_element_actions_copy_paste_tree_copy_paste_context__rspack_import_11.TreeCopyPasteProvider, {
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_modals_provider__rspack_import_9.ModalsProvider, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_app_public_api_api_gateway__rspack_import_10.ApiGateway, {}, void 0, false, {
                                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/app-view.tsx",
                                    lineNumber: 31,
                                    columnNumber: 18
                                }, undefined),
                                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_app_config_date_time__rspack_import_7.DateTimeConfig, {
                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_app_app_loader_app_loader__rspack_import_6.AppLoader, {
                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(react_router_dom__rspack_import_4.RouterProvider, {
                                            router: _Pimcore_app_router_router__rspack_import_5.router
                                        }, void 0, false, {
                                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/app-view.tsx",
                                            lineNumber: 34,
                                            columnNumber: 21
                                        }, undefined)
                                    }, void 0, false, {
                                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/app-view.tsx",
                                        lineNumber: 33,
                                        columnNumber: 19
                                    }, undefined)
                                }, void 0, false, {
                                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/app-view.tsx",
                                    lineNumber: 32,
                                    columnNumber: 17
                                }, undefined)
                            ]
                        }, void 0, true, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/app-view.tsx",
                            lineNumber: 30,
                            columnNumber: 15
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/app-view.tsx",
                        lineNumber: 29,
                        columnNumber: 13
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/app-view.tsx",
                    lineNumber: 26,
                    columnNumber: 11
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/app-view.tsx",
                lineNumber: 25,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/app-view.tsx",
            lineNumber: 24,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/app-view.tsx",
        lineNumber: 23,
        columnNumber: 10
    }, undefined);
};
_c = AppView;
var _c;
$RefreshReg$(_c, "AppView");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/app/utils/app-runner.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  runApp: () => (runApp)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var react_dom_client__rspack_import_2 = __webpack_require__("./node_modules/react-dom/client.js");
/* import */ var _app_view__rspack_import_3 = __webpack_require__("./js/src/core/modules/app/app-view.tsx");
/* import */ var _Pimcore_modules_app_error_handler__rspack_import_4 = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* import */ var _Pimcore_app_store__rspack_import_5 = __webpack_require__("./js/src/core/app/store/index.ts");
/* import */ var _Pimcore_app_public_api_settings_settings_api__rspack_import_6 = __webpack_require__("./js/src/core/app/public-api/settings/settings-api.ts");
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
    _Pimcore_app_public_api_settings_settings_api__rspack_import_6.settingsApi.initialize(_Pimcore_app_store__rspack_import_5.store);
    const domElement = document.getElementById('app');
    if (domElement === null) {
        (0,_Pimcore_modules_app_error_handler__rspack_import_4["default"])(new _Pimcore_modules_app_error_handler__rspack_import_4.GeneralError('Root element not found'));
        return undefined;
    }
    const root = (0,react_dom_client__rspack_import_2.createRoot)(domElement);
    root.render(/*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_app_view__rspack_import_3.AppView, {}, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/utils/app-runner.tsx",
        lineNumber: 25,
        columnNumber: 15
    }, this));
}

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},

}]);
//# sourceMappingURL=__federation_expose__internal___mf_bootstrap.js.map