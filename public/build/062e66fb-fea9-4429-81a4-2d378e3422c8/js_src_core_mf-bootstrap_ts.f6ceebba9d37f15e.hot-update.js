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
"./js/src/core/components/login-form/login-form.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  LoginForm: () => (LoginForm)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/button/button.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _Pimcore_components_login_form_login_form_style__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/login-form/login-form-style.tsx");
/* ESM import */var react_redux__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./node_modules/react-redux/dist/react-redux.mjs");
/* ESM import */var _Pimcore_components_message_useMessage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/message/useMessage/index.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_modules_auth_user_user_slice__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/auth/user/user-slice.ts");
/* ESM import */var _icon_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _Pimcore_modules_auth_authorization_api_slice_gen__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/auth/authorization-api-slice.gen.ts");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
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



// import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons-old'








const LoginForm = (param)=>{
    let { additionalLogins } = param;
    _s();
    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_11__.useDispatch)();
    const { styles } = (0,_Pimcore_components_login_form_login_form_style__WEBPACK_IMPORTED_MODULE_4__.useStyle)();
    const messageApi = (0,_Pimcore_components_message_useMessage__WEBPACK_IMPORTED_MODULE_5__.useMessage)();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_6__.useTranslation)();
    const [formState, setFormState] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)({
        username: '',
        password: ''
    });
    const [login] = (0,_Pimcore_modules_auth_authorization_api_slice_gen__WEBPACK_IMPORTED_MODULE_9__.useLoginMutation)();
    // Use manual isLoading state because the rtkQueryErrorLogger prevents this action on 401 error
    const [isLoginLoading, setIsLoginLoading] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const handleAuthentication = async (event)=>{
        const loginTask = login({
            credentials: formState
        });
        setIsLoginLoading(true);
        loginTask.catch((error)=>{
            setIsLoginLoading(false);
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_10__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_10__.ApiError(error));
        });
        try {
            event.preventDefault();
            const response = await loginTask;
            if (response.error !== undefined) {
                (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_10__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_10__.ApiError(response.error));
            }
            setIsLoginLoading(false);
            const userInformation = response.data;
            dispatch((0,_Pimcore_modules_auth_user_user_slice__WEBPACK_IMPORTED_MODULE_7__.setUser)(userInformation));
        } catch (e) {
            setIsLoginLoading(false);
            await messageApi.error({
                content: e.message
            });
        }
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: styles.form,
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("form", {
                onSubmit: handleAuthentication,
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_1__.Input, {
                        onChange: (e)=>{
                            setFormState({
                                ...formState,
                                username: e.target.value
                            });
                        },
                        placeholder: t('login-form.username'),
                        prefix: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_icon_icon__WEBPACK_IMPORTED_MODULE_8__.Icon, {
                            value: "user"
                        }, void 0, false, {
                            fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
                            lineNumber: 86,
                            columnNumber: 19
                        }, void 0)
                    }, void 0, false, {
                        fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_1__.Input.Password, {
                        // iconRender={ (visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />) }
                        onChange: (e)=>{
                            setFormState({
                                ...formState,
                                password: e.target.value
                            });
                        },
                        placeholder: t('login-form.password')
                    }, void 0, false, {
                        fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                        className: 'flex-space',
                        children: [
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_1__.Checkbox, {
                                "aria-label": t('aria.login-form-additional-logins.remember-me-checkbox'),
                                children: t('login-form.remember-me')
                            }, void 0, false, {
                                fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
                                lineNumber: 94,
                                columnNumber: 11
                            }, undefined),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
                                type: 'link',
                                children: t('login-form.forgot-password')
                            }, void 0, false, {
                                fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
                                lineNumber: 99,
                                columnNumber: 11
                            }, undefined)
                        ]
                    }, void 0, true, {
                        fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
                        lineNumber: 93,
                        columnNumber: 9
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
                        htmlType: "submit",
                        loading: isLoginLoading,
                        type: "primary",
                        children: t('login-form.login')
                    }, void 0, false, {
                        fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, undefined),
            Array.isArray(additionalLogins) && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                className: 'login__additional-logins',
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
                        children: t('login-form-additional-logins.or')
                    }, void 0, false, {
                        fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
                        lineNumber: 113,
                        columnNumber: 11
                    }, undefined),
                    additionalLogins === null || additionalLogins === void 0 ? void 0 : additionalLogins.map((login)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
                            "aria-label": `${t('aria.login-form-additional-logins.additional-login-provider')} ${login.name}`,
                            href: login.link,
                            type: 'primary',
                            children: login.name
                        }, login.key, false, {
                            fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
                            lineNumber: 116,
                            columnNumber: 13
                        }, undefined))
                ]
            }, void 0, true, {
                fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
                lineNumber: 112,
                columnNumber: 9
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
        lineNumber: 81,
        columnNumber: 5
    }, undefined);
};
_s(LoginForm, "CsDoDMTmXQTwhQhmd7BAY+8uG5o=", false, function() {
    return [
        react_redux__WEBPACK_IMPORTED_MODULE_11__.useDispatch,
        _Pimcore_components_login_form_login_form_style__WEBPACK_IMPORTED_MODULE_4__.useStyle,
        _Pimcore_components_message_useMessage__WEBPACK_IMPORTED_MODULE_5__.useMessage,
        react_i18next__WEBPACK_IMPORTED_MODULE_6__.useTranslation,
        _Pimcore_modules_auth_authorization_api_slice_gen__WEBPACK_IMPORTED_MODULE_9__.useLoginMutation
    ];
});
_c = LoginForm;
var _c;
$RefreshReg$(_c, "LoginForm");

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
"./js/src/core/modules/app/app-loader.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  AppLoader: () => (AppLoader)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_modules_auth_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/auth/user/user-api-slice-enhanced.ts");
/* ESM import */var _Pimcore_modules_app_settings_settings_slice_gen__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/app/settings/settings-slice.gen.ts");
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _Pimcore_modules_app_translations_translations_api_slice_gen__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/app/translations/translations-api-slice.gen.ts");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_modules_auth_user_user_slice__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/auth/user/user-slice.ts");
/* ESM import */var _Pimcore_modules_app_settings_settings_slice__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/app/settings/settings-slice.ts");
/* ESM import */var _Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/components/content/content.tsx");
/* ESM import */var _Pimcore_styles_global_styles__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/styles/global.styles.ts");
/* ESM import */var _Pimcore_components_modal_alert_modal_hooks_use_alert_modal__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/components/modal/alert-modal/hooks/use-alert-modal.tsx");
/* ESM import */var _Pimcore_modules_app_error_handler_services_error_modal_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/app/error-handler/services/error-modal-service.ts");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* ESM import */var _mercure_api_slice_gen__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/modules/app/mercure-api-slice.gen.ts");
/* ESM import */var _Pimcore_modules_auth_hooks_use_is_authenticated__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./js/src/core/modules/auth/hooks/use-is-authenticated.ts");
/* ESM import */var _perspectives_hooks_use_perspectives__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("./js/src/core/modules/perspectives/hooks/use-perspectives.tsx");
/* ESM import */var _Pimcore_app_i18n__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("./js/src/core/app/i18n/index.ts");
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
    const dispatch = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_4__.useAppDispatch)();
    const { i18n } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_6__.useTranslation)();
    const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [translations] = (0,_Pimcore_modules_app_translations_translations_api_slice_gen__WEBPACK_IMPORTED_MODULE_5__.useTranslationGetCollectionMutation)();
    const [fetchMercureCookie] = (0,_mercure_api_slice_gen__WEBPACK_IMPORTED_MODULE_14__.useMercureCreateCookieMutation)();
    const modal = (0,_Pimcore_components_modal_alert_modal_hooks_use_alert_modal__WEBPACK_IMPORTED_MODULE_11__.useAlertModal)();
    const { loadPerspective } = (0,_perspectives_hooks_use_perspectives__WEBPACK_IMPORTED_MODULE_16__.usePerspectives)();
    const isAuthenticated = (0,_Pimcore_modules_auth_hooks_use_is_authenticated__WEBPACK_IMPORTED_MODULE_15__.useIsAuthenticated)();
    // Register the modal instance to allow centralized error message display throughout the project
    _Pimcore_modules_app_error_handler_services_error_modal_service__WEBPACK_IMPORTED_MODULE_12__.ErrorModalService.setModalInstance(modal);
    async function initLoadUser() {
        const userFetcher = dispatch(_Pimcore_modules_auth_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__.api.endpoints.userGetCurrentInformation.initiate());
        await fetchMercureCookie();
        userFetcher.then((param)=>{
            let { data, isSuccess, isError, error } = param;
            // @todo check handling of 401
            const _error = error;
            if ((_error === null || _error === void 0 ? void 0 : _error.status) !== 401) {
                setIsLoading(true);
                void loadPublicTranslations().then(()=>{
                    setIsLoading(false);
                });
                isError && (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_13__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_13__.ApiError(error));
            }
            if (isSuccess && data !== undefined) {
                dispatch((0,_Pimcore_modules_auth_user_user_slice__WEBPACK_IMPORTED_MODULE_7__.setUser)(data));
                setIsLoading(false);
            }
        }).catch(()=>{});
        return await userFetcher;
    }
    async function initSettings() {
        const settingsFetcher = dispatch(_Pimcore_modules_app_settings_settings_slice_gen__WEBPACK_IMPORTED_MODULE_3__.api.endpoints.systemSettingsGet.initiate());
        settingsFetcher.then((param)=>{
            let { data, isSuccess, isError, error } = param;
            isError && (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_13__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_13__.ApiError(error));
            if (isSuccess && data !== undefined) {
                dispatch((0,_Pimcore_modules_app_settings_settings_slice__WEBPACK_IMPORTED_MODULE_8__.setSettings)(data));
            }
        }).catch(()=>{});
        return await settingsFetcher;
    }
    async function initActivePerspective() {
        const user = (0,_Pimcore_modules_auth_user_user_slice__WEBPACK_IMPORTED_MODULE_7__.selectCurrentUser)(_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_4__.store.getState());
        const perspectiveId = String((user === null || user === void 0 ? void 0 : user.activePerspective) ?? 'studio_default_perspective');
        return await loadPerspective(perspectiveId);
    }
    async function loadTranslations() {
        const user = (0,_Pimcore_modules_auth_user_user_slice__WEBPACK_IMPORTED_MODULE_7__.selectCurrentUser)(_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_4__.store.getState());
        await translations({
            translation: {
                locale: user.language,
                keys: [],
                useFallback: true
            }
        }).unwrap().then((response)=>{
            i18n.addResourceBundle(user.language, 'translation', response.keys ?? [], true, true);
            void i18n.changeLanguage(user.language);
        }).catch(()=>{
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_13__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_13__.GeneralError('Error loading translations'));
        });
    }
    async function loadPublicTranslations() {
        await translations({
            translation: {
                locale: _Pimcore_app_i18n__WEBPACK_IMPORTED_MODULE_17__.FALLBACK_LANGUAGE,
                keys: [],
                useFallback: true
            }
        }).unwrap().then((response)=>{
            i18n.addResourceBundle(_Pimcore_app_i18n__WEBPACK_IMPORTED_MODULE_17__.FALLBACK_LANGUAGE, 'translation', response.keys ?? [], true, true);
            void i18n.changeLanguage(_Pimcore_app_i18n__WEBPACK_IMPORTED_MODULE_17__.FALLBACK_LANGUAGE);
        }).catch(()=>{
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_13__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_13__.GeneralError('Error loading translations'));
        });
    }
    const loadUserData = async ()=>{
        const { isSuccess: isSuccessInitSetting } = await initSettings();
        if (isSuccessInitSetting === true) {
            Promise.allSettled([
                initActivePerspective(),
                loadTranslations()
            ]).then(()=>{}).catch(()=>{});
        }
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        void initLoadUser();
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const fetchUserData = async ()=>{
            await loadUserData();
        };
        if (isAuthenticated) {
            void fetchUserData();
        }
    }, [
        isAuthenticated
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_styles_global_styles__WEBPACK_IMPORTED_MODULE_10__.GlobalStyles, {}, void 0, false, {
                fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/app-loader.tsx",
                lineNumber: 160,
                columnNumber: 7
            }, undefined),
            isLoading && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_9__.Content, {
                loading: true
            }, void 0, false, {
                fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/app-loader.tsx",
                lineNumber: 162,
                columnNumber: 21
            }, undefined),
            !isLoading && props.children
        ]
    }, void 0, true);
};
_s(AppLoader, "VdkwWkNdg9q2PdRw2Ucs//mkU24=", false, function() {
    return [
        _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_4__.useAppDispatch,
        react_i18next__WEBPACK_IMPORTED_MODULE_6__.useTranslation,
        _Pimcore_modules_app_translations_translations_api_slice_gen__WEBPACK_IMPORTED_MODULE_5__.useTranslationGetCollectionMutation,
        _mercure_api_slice_gen__WEBPACK_IMPORTED_MODULE_14__.useMercureCreateCookieMutation,
        _Pimcore_components_modal_alert_modal_hooks_use_alert_modal__WEBPACK_IMPORTED_MODULE_11__.useAlertModal,
        _perspectives_hooks_use_perspectives__WEBPACK_IMPORTED_MODULE_16__.usePerspectives,
        _Pimcore_modules_auth_hooks_use_is_authenticated__WEBPACK_IMPORTED_MODULE_15__.useIsAuthenticated
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
/* ESM import */var _Pimcore_modules_app_app_loader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/app/app-loader.tsx");
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
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react__WEBPACK_IMPORTED_MODULE_1__.StrictMode, {
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_app_error_boundary_error_boundary__WEBPACK_IMPORTED_MODULE_7__["default"], {
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_global_provider__WEBPACK_IMPORTED_MODULE_2__.GlobalProvider, {
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.App, {
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_app_config_date_time__WEBPACK_IMPORTED_MODULE_6__.DateTimeConfig, {
                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_app_app_loader__WEBPACK_IMPORTED_MODULE_5__.AppLoader, {
                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_router_dom__WEBPACK_IMPORTED_MODULE_8__.RouterProvider, {
                                    router: _Pimcore_app_router_router__WEBPACK_IMPORTED_MODULE_4__.router
                                }, void 0, false, {
                                    fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/app-view.tsx",
                                    lineNumber: 29,
                                    columnNumber: 19
                                }, undefined)
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
    }, void 0, false);
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
"./js/src/core/modules/auth/hooks/use-is-authenticated.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useIsAuthenticated: () => (useIsAuthenticated)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _Pimcore_modules_auth_hooks_use_user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/auth/hooks/use-user.ts");
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

const useIsAuthenticated = ()=>{
    const user = (0,_Pimcore_modules_auth_hooks_use_user__WEBPACK_IMPORTED_MODULE_1__.useUser)();
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>user.username !== '', [
        user
    ]);
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

});
//# sourceMappingURL=js_src_core_mf-bootstrap_ts.f6ceebba9d37f15e.hot-update.js.map