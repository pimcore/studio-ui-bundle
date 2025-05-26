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
self["webpackHotUpdatepimcore_studio_ui_bundle_core"]("js_src_core_mf-bootstrap_ts", {
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
/* ESM import */var _Pimcore_modules_auth_user_user_slice__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/auth/user/user-slice.ts");
/* ESM import */var _Pimcore_modules_perspectives_hooks_use_perspectives__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/modules/perspectives/hooks/use-perspectives.tsx");
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
    // Register the modal instance to allow centralized error message display throughout the project
    _Pimcore_modules_app_error_handler_services_error_modal_service__WEBPACK_IMPORTED_MODULE_6__.ErrorModalService.setModalInstance(modal);
    const { isAuthenticated } = (0,_Pimcore_modules_auth_hooks_use_is_authenticated__WEBPACK_IMPORTED_MODULE_7__.useIsAuthenticated)();
    const { loadPublicTranslations, loadTranslations } = (0,_loader_translation_loader__WEBPACK_IMPORTED_MODULE_8__.useTranslationLoader)();
    const { loadUser } = (0,_loader_user_loader__WEBPACK_IMPORTED_MODULE_9__.useUserLoader)();
    const [fetchMercureCookie] = (0,_mercure_api_slice_gen__WEBPACK_IMPORTED_MODULE_10__.useMercureCreateCookieMutation)();
    const { loadSettings } = (0,_loader_settings_loader__WEBPACK_IMPORTED_MODULE_11__.useSettingsLoader)();
    const { loadPerspective } = (0,_Pimcore_modules_perspectives_hooks_use_perspectives__WEBPACK_IMPORTED_MODULE_13__.usePerspectives)();
    async function initActivePerspective() {
        const user = (0,_Pimcore_modules_auth_user_user_slice__WEBPACK_IMPORTED_MODULE_12__.selectCurrentUser)(_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_2__.store.getState());
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
                fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/app-loader/app-loader.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, undefined),
            isLoading && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_3__.Content, {
                loading: true
            }, void 0, false, {
                fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/app-loader/app-loader.tsx",
                lineNumber: 89,
                columnNumber: 21
            }, undefined),
            !isLoading && props.children
        ]
    }, void 0, true);
};
_s(AppLoader, "riXrhX7BQI2CSxrF6I9g6LW7exE=", false, function() {
    return [
        _Pimcore_components_modal_alert_modal_hooks_use_alert_modal__WEBPACK_IMPORTED_MODULE_5__.useAlertModal,
        _Pimcore_modules_auth_hooks_use_is_authenticated__WEBPACK_IMPORTED_MODULE_7__.useIsAuthenticated,
        _loader_translation_loader__WEBPACK_IMPORTED_MODULE_8__.useTranslationLoader,
        _loader_user_loader__WEBPACK_IMPORTED_MODULE_9__.useUserLoader,
        _mercure_api_slice_gen__WEBPACK_IMPORTED_MODULE_10__.useMercureCreateCookieMutation,
        _loader_settings_loader__WEBPACK_IMPORTED_MODULE_11__.useSettingsLoader,
        _Pimcore_modules_perspectives_hooks_use_perspectives__WEBPACK_IMPORTED_MODULE_13__.usePerspectives
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
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/store/index.ts");
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
    const dispatch = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.useAppDispatch)();
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
        _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.useAppDispatch
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
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/store/index.ts");
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
    const dispatch = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.useAppDispatch)();
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
/* ESM import */var react_router_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./node_modules/react-router-dom/dist/index.js");
/* ESM import */var _Pimcore_app_router_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/app/router/router.tsx");
/* ESM import */var _Pimcore_modules_app_app_loader_app_loader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/app/app-loader/app-loader.tsx");
/* ESM import */var _Pimcore_app_config_date_time__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/app/config/date-time.tsx");
/* ESM import */var _Pimcore_modules_app_error_boundary_error_boundary__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/app/error-boundary/error-boundary.tsx");
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
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_app_error_boundary_error_boundary__WEBPACK_IMPORTED_MODULE_7__["default"], {
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_global_provider__WEBPACK_IMPORTED_MODULE_2__.GlobalProvider, {
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.App, {
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_app_config_date_time__WEBPACK_IMPORTED_MODULE_6__.DateTimeConfig, {
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_app_app_loader_app_loader__WEBPACK_IMPORTED_MODULE_5__.AppLoader, {
                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_router_dom__WEBPACK_IMPORTED_MODULE_8__.RouterProvider, {
                                router: _Pimcore_app_router_router__WEBPACK_IMPORTED_MODULE_4__.router
                            }, void 0, false, {
                                fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/app-view.tsx",
                                lineNumber: 28,
                                columnNumber: 17
                            }, undefined)
                        }, void 0, false, {
                            fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/app-view.tsx",
                            lineNumber: 27,
                            columnNumber: 15
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/app-view.tsx",
                        lineNumber: 26,
                        columnNumber: 13
                    }, undefined)
                }, void 0, false, {
                    fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/app-view.tsx",
                    lineNumber: 25,
                    columnNumber: 11
                }, undefined)
            }, void 0, false, {
                fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/app-view.tsx",
                lineNumber: 24,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/app-view.tsx",
            lineNumber: 23,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/app-view.tsx",
        lineNumber: 22,
        columnNumber: 5
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

});
//# sourceMappingURL=js_src_core_mf-bootstrap_ts.6ab9ccef3db926c5.hot-update.js.map