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
"./js/src/core/app/router/router.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DEEP_LINK_URL: () => (DEEP_LINK_URL),
  LOGIN_URL: () => (LOGIN_URL),
  baseUrl: () => (baseUrl),
  router: () => (router),
  routes: () => (routes)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_components_deep_link_deep_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/deep-link/deep-link.tsx");
/* ESM import */var _Pimcore_modules_app_default_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/app/default-page.tsx");
/* ESM import */var _Pimcore_modules_auth_hooks_use_is_authenticated__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/auth/hooks/use-is-authenticated.ts");
/* ESM import */var _Pimcore_modules_auth_login_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/auth/login-page.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* ESM import */var react_router_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./node_modules/react-router/dist/index.js");
/* ESM import */var react_router_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./node_modules/react-router-dom/dist/index.js");
/* ESM import */var _config_app_config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/app/config/app-config.ts");
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







const baseUrl = _config_app_config__WEBPACK_IMPORTED_MODULE_6__.appConfig.baseUrl.endsWith('/') ? _config_app_config__WEBPACK_IMPORTED_MODULE_6__.appConfig.baseUrl.slice(0, -1) + '/' : _config_app_config__WEBPACK_IMPORTED_MODULE_6__.appConfig.baseUrl;
const LOGIN_URL = `${baseUrl}login/`;
const DEEP_LINK_URL = `${baseUrl}:elementType/:id`;
const routes = {
    root: baseUrl,
    login: LOGIN_URL,
    deeplinkAsset: DEEP_LINK_URL
};
const AuthenticatedRoute = (param)=>{
    let { children } = param;
    _s();
    const { isAuthenticated } = (0,_Pimcore_modules_auth_hooks_use_is_authenticated__WEBPACK_IMPORTED_MODULE_3__.useIsAuthenticated)();
    const location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_7__.useLocation)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            isAuthenticated === true && children,
            isAuthenticated === false && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_router_dom__WEBPACK_IMPORTED_MODULE_7__.Navigate, {
                state: {
                    from: location
                },
                to: routes.login
            }, void 0, false, {
                fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/app/router/router.tsx",
                lineNumber: 40,
                columnNumber: 9
            }, undefined)
        ]
    }, void 0, true);
};
_s(AuthenticatedRoute, "ALC1SJQQA8Hfu1q5DB7QH/C42qo=", false, function() {
    return [
        _Pimcore_modules_auth_hooks_use_is_authenticated__WEBPACK_IMPORTED_MODULE_3__.useIsAuthenticated,
        react_router_dom__WEBPACK_IMPORTED_MODULE_7__.useLocation
    ];
});
_c = AuthenticatedRoute;
const router = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_8__.createBrowserRouter)([
    {
        path: routes.root,
        element: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AuthenticatedRoute, {
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_app_default_page__WEBPACK_IMPORTED_MODULE_2__.DefaultPage, {}, void 0, false, {
                fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/app/router/router.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, undefined)
        }, void 0, false, {
            fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/app/router/router.tsx",
            lineNumber: 52,
            columnNumber: 14
        }, undefined)
    },
    {
        path: routes.login,
        element: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_auth_login_page__WEBPACK_IMPORTED_MODULE_4__.LoginPage, {}, void 0, false, {
            fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/app/router/router.tsx",
            lineNumber: 58,
            columnNumber: 14
        }, undefined)
    },
    {
        path: routes.deeplinkAsset,
        element: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AuthenticatedRoute, {
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_deep_link_deep_link__WEBPACK_IMPORTED_MODULE_1__.DeepLink, {}, void 0, false, {
                fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/app/router/router.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, undefined)
        }, void 0, false, {
            fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/app/router/router.tsx",
            lineNumber: 62,
            columnNumber: 14
        }, undefined)
    }
]);
var _c;
$RefreshReg$(_c, "AuthenticatedRoute");

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
"./js/src/core/app/store/middleware/rtkQueryErrorLogger.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  rtkQueryErrorLogger: () => (rtkQueryErrorLogger)
});
/* ESM import */var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs");
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
// Cannot use directly from the slice
// Middleware doesn't have direct access to the state management logic defined in slices
const initialState = {
    id: 0,
    username: '',
    email: '',
    firstname: '',
    lastname: '',
    permissions: [],
    isAdmin: false,
    classes: [],
    docTypes: [],
    language: 'en',
    activePerspective: 0,
    perspectives: [],
    dateTimeLocale: '',
    welcomeScreen: false,
    memorizeTabs: false,
    hasImage: false,
    contentLanguages: [],
    keyBindings: []
};
const rtkQueryErrorLogger = (api)=>(next)=>(action)=>{
            // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
            if ((0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.isRejectedWithValue)(action)) {
                var _action_meta;
                const payload = action.payload;
                const actionMetaArgs = (_action_meta = action.meta) === null || _action_meta === void 0 ? void 0 : _action_meta.arg;
                // Handle the case when the user's session has expired and further requests return a 401 status.
                // @todo - check if we can bind it to another endpoint that is specific to the user session
                if ((payload === null || payload === void 0 ? void 0 : payload.status) === 401) {
                    if ('endpointName' in actionMetaArgs && actionMetaArgs.endpointName === 'userGetCurrentInformation') {
                        return next(action);
                    }
                    api.dispatch({
                        type: 'auth/setUser',
                        payload: initialState
                    });
                    api.dispatch({
                        type: 'authentication/setAuthState',
                        payload: false
                    });
                    // Need to prevent further handling of the error to avoid triggering the error boundary etc.
                    return;
                }
            }
            return next(action);
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
/* ESM import */var _icon_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _Pimcore_modules_auth_authorization_api_slice_gen__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/auth/authorization-api-slice.gen.ts");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* ESM import */var _Pimcore_modules_auth_auth_slice__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/auth/auth-slice.ts");
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
    const [login] = (0,_Pimcore_modules_auth_authorization_api_slice_gen__WEBPACK_IMPORTED_MODULE_8__.useLoginMutation)();
    // Use manual isLoading state because the rtkQueryErrorLogger prevents this action on 401 error
    const [isLoginLoading, setIsLoginLoading] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const handleAuthentication = async (event)=>{
        const loginTask = login({
            credentials: formState
        });
        setIsLoginLoading(true);
        loginTask.catch((error)=>{
            setIsLoginLoading(false);
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_9__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_9__.ApiError(error));
        });
        try {
            event.preventDefault();
            const response = await loginTask;
            if (response.error !== undefined) {
                (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_9__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_9__.ApiError(response.error));
            }
            setIsLoginLoading(false);
            dispatch((0,_Pimcore_modules_auth_auth_slice__WEBPACK_IMPORTED_MODULE_10__.setAuthState)(true));
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
                        placeholder: "Username",
                        prefix: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_icon_icon__WEBPACK_IMPORTED_MODULE_7__.Icon, {
                            value: "user"
                        }, void 0, false, {
                            fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
                            lineNumber: 85,
                            columnNumber: 20
                        }, void 0)
                    }, void 0, false, {
                        fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
                        lineNumber: 82,
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
                        placeholder: "Password"
                    }, void 0, false, {
                        fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
                        lineNumber: 87,
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
                                lineNumber: 93,
                                columnNumber: 11
                            }, undefined),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
                                type: 'link',
                                children: t('login-form.forgot-password')
                            }, void 0, false, {
                                fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
                                lineNumber: 98,
                                columnNumber: 11
                            }, undefined)
                        ]
                    }, void 0, true, {
                        fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
                        lineNumber: 92,
                        columnNumber: 9
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
                        htmlType: "submit",
                        loading: isLoginLoading,
                        type: "primary",
                        children: t('login-form.login')
                    }, void 0, false, {
                        fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, undefined),
            Array.isArray(additionalLogins) && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                className: 'login__additional-logins',
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
                        children: t('login-form-additional-logins.or')
                    }, void 0, false, {
                        fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
                        lineNumber: 112,
                        columnNumber: 11
                    }, undefined),
                    additionalLogins === null || additionalLogins === void 0 ? void 0 : additionalLogins.map((login)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
                            "aria-label": `${t('aria.login-form-additional-logins.additional-login-provider')} ${login.name}`,
                            href: login.link,
                            type: 'primary',
                            children: login.name
                        }, login.key, false, {
                            fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
                            lineNumber: 115,
                            columnNumber: 13
                        }, undefined))
                ]
            }, void 0, true, {
                fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
                lineNumber: 111,
                columnNumber: 9
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
        lineNumber: 80,
        columnNumber: 5
    }, undefined);
};
_s(LoginForm, "CsDoDMTmXQTwhQhmd7BAY+8uG5o=", false, function() {
    return [
        react_redux__WEBPACK_IMPORTED_MODULE_11__.useDispatch,
        _Pimcore_components_login_form_login_form_style__WEBPACK_IMPORTED_MODULE_4__.useStyle,
        _Pimcore_components_message_useMessage__WEBPACK_IMPORTED_MODULE_5__.useMessage,
        react_i18next__WEBPACK_IMPORTED_MODULE_6__.useTranslation,
        _Pimcore_modules_auth_authorization_api_slice_gen__WEBPACK_IMPORTED_MODULE_8__.useLoginMutation
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
"./js/src/core/modules/auth/auth-slice.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__WEBPACK_DEFAULT_EXPORT__),
  resetAuthState: () => (resetAuthState),
  selectIsAuthenticated: () => (selectIsAuthenticated),
  setAuthState: () => (setAuthState)
});
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs");
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

const initialState = {
    isAuthenticated: undefined
};
const authSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__.createSlice)({
    name: 'authentication',
    initialState,
    reducers: {
        setAuthState (state, action) {
            state.isAuthenticated = action.payload;
        },
        resetAuthState (state) {
            state.isAuthenticated = undefined;
        }
    }
});
(0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.injectSliceWithState)(authSlice);
const { setAuthState, resetAuthState } = authSlice.actions;
const selectIsAuthenticated = (state)=>state.authentication.isAuthenticated;
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = (authSlice.reducer);

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
/* ESM import */var _user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/auth/user/user-api-slice-enhanced.ts");
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _auth_slice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/auth/auth-slice.ts");
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
    const isAuthenticated = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_2__.useAppSelector)(_auth_slice__WEBPACK_IMPORTED_MODULE_3__.selectIsAuthenticated);
    const dispatch = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_2__.useAppDispatch)();
    const { isError, error, isSuccess, refetch } = (0,_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__.useUserGetCurrentInformationQuery)(undefined, {
        skip: isAuthenticated !== undefined
    });
    const recheck = ()=>{
        void refetch();
    };
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (isError) {
            dispatch((0,_auth_slice__WEBPACK_IMPORTED_MODULE_3__.setAuthState)(false));
        }
        if (isSuccess) {
            dispatch((0,_auth_slice__WEBPACK_IMPORTED_MODULE_3__.setAuthState)(true));
        }
    }, [
        isError,
        isSuccess,
        error
    ]);
    return {
        isAuthenticated,
        recheck
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
"./js/src/core/modules/auth/login-page.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  LoginPage: () => (LoginPage)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_app_router_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/app/router/router.tsx");
/* ESM import */var _Pimcore_components_login_form_login_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/login-form/login-form.tsx");
/* ESM import */var react_router_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./node_modules/react-router/dist/index.js");
/* ESM import */var _hooks_use_is_authenticated__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/auth/hooks/use-is-authenticated.ts");
/* ESM import */var _Pimcore_modules_auth_hooks_use_user__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/auth/hooks/use-user.ts");
/* ESM import */var _Pimcore_modules_auth_services_statisticsService__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/auth/services/statisticsService.ts");
/* ESM import */var _login_page_styles__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/auth/login-page.styles.tsx");
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








const LoginPage = ()=>{
    _s();
    const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_8__.useNavigate)();
    const location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_8__.useLocation)();
    const user = (0,_Pimcore_modules_auth_hooks_use_user__WEBPACK_IMPORTED_MODULE_5__.useUser)();
    const { isAuthenticated } = (0,_hooks_use_is_authenticated__WEBPACK_IMPORTED_MODULE_4__.useIsAuthenticated)();
    const { styles } = (0,_login_page_styles__WEBPACK_IMPORTED_MODULE_7__.useStyle)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (isAuthenticated === true) {
            (async ()=>{
                var _location_state_from, _location_state;
                const redirectPath = location === null || location === void 0 ? void 0 : (_location_state = location.state) === null || _location_state === void 0 ? void 0 : (_location_state_from = _location_state.from) === null || _location_state_from === void 0 ? void 0 : _location_state_from.pathname;
                navigate(redirectPath ?? _Pimcore_app_router_router__WEBPACK_IMPORTED_MODULE_2__.routes.root);
                await (0,_Pimcore_modules_auth_services_statisticsService__WEBPACK_IMPORTED_MODULE_6__.sendStatistics)(user.isAdmin);
            })().catch(()=>{});
        }
    }, [
        isAuthenticated
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: styles.loginPage,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
            className: styles.loginWidget,
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("img", {
                    alt: 'Pimcore Logo',
                    src: '/bundles/pimcorestudioui/img/logo.png'
                }, void 0, false, {
                    fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/auth/login-page.tsx",
                    lineNumber: 44,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_login_form_login_form__WEBPACK_IMPORTED_MODULE_3__.LoginForm, {}, void 0, false, {
                    fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/auth/login-page.tsx",
                    lineNumber: 48,
                    columnNumber: 9
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/auth/login-page.tsx",
            lineNumber: 43,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/auth/login-page.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, undefined);
};
_s(LoginPage, "UxakANj78oSPpbP8ZFALEbMfD2c=", false, function() {
    return [
        react_router_dom__WEBPACK_IMPORTED_MODULE_8__.useNavigate,
        react_router_dom__WEBPACK_IMPORTED_MODULE_8__.useLocation,
        _Pimcore_modules_auth_hooks_use_user__WEBPACK_IMPORTED_MODULE_5__.useUser,
        _hooks_use_is_authenticated__WEBPACK_IMPORTED_MODULE_4__.useIsAuthenticated,
        _login_page_styles__WEBPACK_IMPORTED_MODULE_7__.useStyle
    ];
});
_c = LoginPage;
var _c;
$RefreshReg$(_c, "LoginPage");

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
"./js/src/core/modules/auth/user/user-api-slice-enhanced.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  api: () => (enhancedUserApi),
  useUserGetCurrentInformationQuery: () => (useUserGetCurrentInformationQuery)
});
/* ESM import */var _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/tags.ts");
/* ESM import */var _user_api_slice_gen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/auth/user/user-api-slice.gen.ts");
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

const enhancedUserApi = _user_api_slice_gen__WEBPACK_IMPORTED_MODULE_1__.api.enhanceEndpoints({
    addTagTypes: [
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.CURRENT_USER_INFORMATION
    ],
    endpoints: {
        userGetCurrentInformation: {
            providesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.CURRENT_USER_INFORMATION()
        }
    }
});

const { useUserGetCurrentInformationQuery } = enhancedUserApi;

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
"./js/src/core/modules/auth/user/user-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  usePimcoreStudioApiUserSearchQuery: () => (usePimcoreStudioApiUserSearchQuery),
  useUserCloneByIdMutation: () => (useUserCloneByIdMutation),
  useUserCreateMutation: () => (useUserCreateMutation),
  useUserDefaultKeyBindingsQuery: () => (useUserDefaultKeyBindingsQuery),
  useUserDeleteByIdMutation: () => (useUserDeleteByIdMutation),
  useUserFolderCreateMutation: () => (useUserFolderCreateMutation),
  useUserFolderDeleteByIdMutation: () => (useUserFolderDeleteByIdMutation),
  useUserGetAvailablePermissionsQuery: () => (useUserGetAvailablePermissionsQuery),
  useUserGetByIdQuery: () => (useUserGetByIdQuery),
  useUserGetCollectionQuery: () => (useUserGetCollectionQuery),
  useUserGetCurrentInformationQuery: () => (useUserGetCurrentInformationQuery),
  useUserGetImageQuery: () => (useUserGetImageQuery),
  useUserGetTreeQuery: () => (useUserGetTreeQuery),
  useUserResetPasswordMutation: () => (useUserResetPasswordMutation),
  useUserUpdateActivePerspectiveMutation: () => (useUserUpdateActivePerspectiveMutation),
  useUserUpdateByIdMutation: () => (useUserUpdateByIdMutation),
  useUserUpdatePasswordByIdMutation: () => (useUserUpdatePasswordByIdMutation),
  useUserUpdateProfileMutation: () => (useUserUpdateProfileMutation),
  useUserUploadImageMutation: () => (useUserUploadImageMutation)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "User Management"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            userCloneById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/clone/${queryArg.id}`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userCreate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userFolderCreate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/folder`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userGetCurrentInformation: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/user/current-user-information`
                    }),
                providesTags: [
                    "User Management"
                ]
            }),
            userGetById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/${queryArg.id}`
                    }),
                providesTags: [
                    "User Management"
                ]
            }),
            userUpdateById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/${queryArg.id}`,
                        method: "PUT",
                        body: queryArg.updateUser
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userDeleteById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/${queryArg.id}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userFolderDeleteById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/folder/${queryArg.id}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userDefaultKeyBindings: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/users/default-key-bindings`
                    }),
                providesTags: [
                    "User Management"
                ]
            }),
            userGetAvailablePermissions: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/user/available-permissions`
                    }),
                providesTags: [
                    "User Management"
                ]
            }),
            userGetCollection: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/users`
                    }),
                providesTags: [
                    "User Management"
                ]
            }),
            userResetPassword: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/reset-password`,
                        method: "POST",
                        body: queryArg.resetPassword
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            pimcoreStudioApiUserSearch: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/search`,
                        params: {
                            searchQuery: queryArg.searchQuery
                        }
                    }),
                providesTags: [
                    "User Management"
                ]
            }),
            userUpdateActivePerspective: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/active-perspective/${queryArg.perspectiveId}`,
                        method: "PUT"
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userUpdatePasswordById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/${queryArg.id}/password`,
                        method: "PUT",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userUpdateProfile: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/update-profile`,
                        method: "PUT",
                        body: queryArg.updateUserProfile
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userUploadImage: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/upload-image/${queryArg.id}`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userGetImage: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/image/${queryArg.id}`
                    }),
                providesTags: [
                    "User Management"
                ]
            }),
            userGetTree: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/users/tree`,
                        params: {
                            parentId: queryArg.parentId
                        }
                    }),
                providesTags: [
                    "User Management"
                ]
            })
        }),
    overrideExisting: false
});

const { useUserCloneByIdMutation, useUserCreateMutation, useUserFolderCreateMutation, useUserGetCurrentInformationQuery, useUserGetByIdQuery, useUserUpdateByIdMutation, useUserDeleteByIdMutation, useUserFolderDeleteByIdMutation, useUserDefaultKeyBindingsQuery, useUserGetAvailablePermissionsQuery, useUserGetCollectionQuery, useUserResetPasswordMutation, usePimcoreStudioApiUserSearchQuery, useUserUpdateActivePerspectiveMutation, useUserUpdatePasswordByIdMutation, useUserUpdateProfileMutation, useUserUploadImageMutation, useUserGetImageQuery, useUserGetTreeQuery } = injectedRtkApi;

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
//# sourceMappingURL=js_src_core_mf-bootstrap_ts.c9077b58b8c40e2a.hot-update.js.map