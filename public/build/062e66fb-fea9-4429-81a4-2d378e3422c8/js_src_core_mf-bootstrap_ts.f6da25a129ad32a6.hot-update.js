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
    const isAuthenticated = (0,_Pimcore_modules_auth_hooks_use_is_authenticated__WEBPACK_IMPORTED_MODULE_3__.useIsAuthenticated)();
    const location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_7__.useLocation)();
    return isAuthenticated ? children : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_router_dom__WEBPACK_IMPORTED_MODULE_7__.Navigate, {
        state: {
            from: location
        },
        to: routes.login
    }, void 0, false, {
        fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/app/router/router.tsx",
        lineNumber: 39,
        columnNumber: 7
    }, undefined);
};
_s(AuthenticatedRoute, "7F4L7CIcOVZQ7PP9ZkyTdDOf/jc=", false, function() {
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
                lineNumber: 50,
                columnNumber: 7
            }, undefined)
        }, void 0, false, {
            fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/app/router/router.tsx",
            lineNumber: 49,
            columnNumber: 14
        }, undefined)
    },
    {
        path: routes.login,
        element: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_auth_login_page__WEBPACK_IMPORTED_MODULE_4__.LoginPage, {}, void 0, false, {
            fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/app/router/router.tsx",
            lineNumber: 55,
            columnNumber: 14
        }, undefined)
    },
    {
        path: routes.deeplinkAsset,
        element: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AuthenticatedRoute, {
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_deep_link_deep_link__WEBPACK_IMPORTED_MODULE_1__.DeepLink, {}, void 0, false, {
                fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/app/router/router.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, undefined)
        }, void 0, false, {
            fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/app/router/router.tsx",
            lineNumber: 59,
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
                const payload = action.payload;
                // Handle the case when the user's session has expired and further requests return a 401 status.
                if ((payload === null || payload === void 0 ? void 0 : payload.status) === 401) {
                    api.dispatch({
                        type: 'auth/setUser',
                        payload: initialState
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
"./js/src/core/components/key-value-list/key-value-list.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  KeyValueList: () => (KeyValueList)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_components_text_text__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/text/text.tsx");
/* ESM import */var _Pimcore_components_sanitize_html_sanitize_html__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/sanitize-html/sanitize-html.tsx");
/* ESM import */var _Pimcore_utils_type_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/utils/type-utils.ts");
/* ESM import */var _Pimcore_utils_date_time__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/utils/date-time.ts");
/* ESM import */var _key_value_list_styles__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/key-value-list/key-value-list.styles.ts");
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








const FIELDS_TO_CONVERT_TO_DATE = [
    'creationDate',
    'modificationDate'
];
const SPECIAL_DATA_TYPES = [
    'documentData',
    'objectData'
];
const KeyValueList = (param)=>{
    let { items, skipEmpty = true } = param;
    _s();
    const { styles } = (0,_key_value_list_styles__WEBPACK_IMPORTED_MODULE_8__.useStyles)();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation)();
    const preparedItems = [];
    const shouldSkipValue = (value)=>skipEmpty && ((0,_Pimcore_utils_type_utils__WEBPACK_IMPORTED_MODULE_6__.isEmptyValue)(value) || (0,lodash__WEBPACK_IMPORTED_MODULE_2__.isEqual)(value, false));
    items.forEach((item)=>{
        if (shouldSkipValue(item === null || item === void 0 ? void 0 : item.value)) {
            return;
        }
        if (SPECIAL_DATA_TYPES.includes(item.key)) {
            if ((0,lodash__WEBPACK_IMPORTED_MODULE_2__.isObject)(item.value)) {
                const renderObjectValue = (objectValue)=>{
                    Object.entries(objectValue).forEach((param)=>{
                        let [key, value] = param;
                        if (shouldSkipValue(value)) {
                            return;
                        }
                        if ((0,lodash__WEBPACK_IMPORTED_MODULE_2__.isObject)(value)) {
                            renderObjectValue(value);
                        } else {
                            // @TODO: delete after the task is completed (https://github.com/pimcore/studio-backend-bundle/issues/953)
                            const isTableValue = (0,lodash__WEBPACK_IMPORTED_MODULE_2__.isString)(value) && value.includes('<table>');
                            !isTableValue && preparedItems.push({
                                key,
                                value,
                                withoutTranslate: item.key === 'objectData'
                            });
                        }
                    });
                };
                renderObjectValue(item.value);
            }
        } else {
            preparedItems.push(item);
        }
    });
    const renderItem = (item)=>{
        let fieldValue = item === null || item === void 0 ? void 0 : item.value;
        if (FIELDS_TO_CONVERT_TO_DATE.includes(item.key)) {
            fieldValue = (0,_Pimcore_utils_date_time__WEBPACK_IMPORTED_MODULE_7__.formatDateTime)({
                timestamp: (item === null || item === void 0 ? void 0 : item.value) ?? null,
                dateStyle: 'short',
                timeStyle: 'short'
            });
        }
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("tr", {
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("td", {
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_text_text__WEBPACK_IMPORTED_MODULE_4__.Text, {
                        children: (item === null || item === void 0 ? void 0 : item.withoutTranslate) === true ? item.key : t(`modal-search.field.${item.key}`)
                    }, void 0, false, {
                        fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/key-value-list/key-value-list.tsx",
                        lineNumber: 84,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/key-value-list/key-value-list.tsx",
                    lineNumber: 83,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("td", {
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_text_text__WEBPACK_IMPORTED_MODULE_4__.Text, {
                        children: fieldValue === 0 ? fieldValue : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_sanitize_html_sanitize_html__WEBPACK_IMPORTED_MODULE_5__.SanitizeHtml, {
                            html: fieldValue ?? ''
                        }, void 0, false, {
                            fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/key-value-list/key-value-list.tsx",
                            lineNumber: 88,
                            columnNumber: 46
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/key-value-list/key-value-list.tsx",
                        lineNumber: 87,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/key-value-list/key-value-list.tsx",
                    lineNumber: 86,
                    columnNumber: 9
                }, undefined)
            ]
        }, item.key, true, {
            fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/key-value-list/key-value-list.tsx",
            lineNumber: 82,
            columnNumber: 7
        }, undefined);
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("table", {
        className: styles.keyValueList,
        children: preparedItems.map((item)=>renderItem(item))
    }, void 0, false, {
        fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/key-value-list/key-value-list.tsx",
        lineNumber: 96,
        columnNumber: 5
    }, undefined);
};
_s(KeyValueList, "npbODhKiVXMAM/EtpCiaKc7TtqU=", false, function() {
    return [
        _key_value_list_styles__WEBPACK_IMPORTED_MODULE_8__.useStyles,
        react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation
    ];
});
_c = KeyValueList;
var _c;
$RefreshReg$(_c, "KeyValueList");

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
    const isAuthenticated = (0,_hooks_use_is_authenticated__WEBPACK_IMPORTED_MODULE_4__.useIsAuthenticated)();
    const { styles } = (0,_login_page_styles__WEBPACK_IMPORTED_MODULE_7__.useStyle)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (isAuthenticated) {
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
_s(LoginPage, "Ks0F+IoJbdXK7u/TJAfHkITgMaU=", false, function() {
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

});
//# sourceMappingURL=js_src_core_mf-bootstrap_ts.f6da25a129ad32a6.hot-update.js.map