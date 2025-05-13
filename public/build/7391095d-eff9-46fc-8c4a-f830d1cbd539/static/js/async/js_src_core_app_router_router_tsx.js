"use strict";
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["js_src_core_app_router_router_tsx"], {
"./js/src/core/app/config/app-config.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  appConfig: () => (appConfig),
  currentDomain: () => (currentDomain)
});
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ const appElement = document.querySelector('#app');
const currentDomain = window.location.origin;
if (appElement === null) {
    console.warn('App element not found');
}
const appConfigJSON = (appElement === null || appElement === void 0 ? void 0 : appElement.getAttribute('data-app-config')) ?? null;
let appConfigData = null;
if (appConfigJSON !== null) {
    appConfigData = JSON.parse(appConfigJSON);
}
const appConfig = {
    baseUrl: (appConfigData === null || appConfigData === void 0 ? void 0 : appConfigData.baseUrl) ?? '/pimcore-studio/',
    mercureUrl: (appConfigData === null || appConfigData === void 0 ? void 0 : appConfigData.mercureUrl) ?? `${currentDomain}/.well-known/mercure`,
    maxPageSize: (appConfigData === null || appConfigData === void 0 ? void 0 : appConfigData.maxPageSize) ?? 9999999,
    wysiwyg: (appConfigData === null || appConfigData === void 0 ? void 0 : appConfigData.wysiwyg) ?? {
        defaultEditorConfig: {
            dataObject: {},
            document: {}
        }
    }
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
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
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
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/app/router/router.tsx",
        lineNumber: 42,
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
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/app/router/router.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/app/router/router.tsx",
            lineNumber: 52,
            columnNumber: 14
        }, undefined)
    },
    {
        path: routes.login,
        element: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_auth_login_page__WEBPACK_IMPORTED_MODULE_4__.LoginPage, {}, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/app/router/router.tsx",
            lineNumber: 58,
            columnNumber: 14
        }, undefined)
    },
    {
        path: routes.deeplinkAsset,
        element: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AuthenticatedRoute, {
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_deep_link_deep_link__WEBPACK_IMPORTED_MODULE_1__.DeepLink, {}, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/app/router/router.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/app/router/router.tsx",
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
"./js/src/core/components/background/background.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyle: () => (useStyle)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/antd-style/es/functions/index.js");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
const useStyle = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param)=>{
    let { token, css } = param;
    return {
        background: css`
      position: absolute;
      inset: 0;
      background: #FFF;
      overflow: hidden; 
      opacity: 0.3;

      .background-figure {
        position: absolute;

        &--top-left {
          top: -80%;
          left: -30%;
          width: 1324px;
          height: 1324px;
          transform: rotate(65.637deg);
          flex-shrink: 0;
          border-radius: var(--Components-Input-Component-paddingBlockSM, 1324px);
          background: rgba(55, 217, 243, 0.20);
          filter: blur(310px);
        }


        &--bottom-left {
          width: 651.152px;
          height: 1503.398px;
          transform: rotate(28.303deg);
          flex-shrink: 0;
          border-radius: var(--Components-Input-Component-paddingBlockSM, 1503.398px);
          background: #FDFFFF;
          filter: blur(310px);
        }

        &--bottom-right {
          left: 11%;
          width: 1642px;
          height: 686px;
          transform: rotate(65.637deg);
          flex-shrink: 0;
          border-radius: var(--Components-Input-Component-paddingBlockSM, 1642px);
          background: rgba(122, 58, 212, 0.42);
          filter: blur(310px);
        }
      }
    `
    };
}, {
    hashPriority: 'low'
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
"./js/src/core/components/background/background.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Background: () => (Background)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _background_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/background/background.styles.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
var _s = $RefreshSig$();


const Background = ()=>{
    _s();
    const { styles } = (0,_background_styles__WEBPACK_IMPORTED_MODULE_2__.useStyle)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: styles.background,
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                className: "background-figure background-figure--bottom-left"
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/background/background.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                className: "background-figure background-figure--bottom-right"
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/background/background.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                className: "background-figure background-figure--top-left"
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/background/background.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/background/background.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, undefined);
};
_s(Background, "4AcVho8W1Y+Yfard/v4lDs8ZRDQ=", false, function() {
    return [
        _background_styles__WEBPACK_IMPORTED_MODULE_2__.useStyle
    ];
});
_c = Background;

var _c;
$RefreshReg$(_c, "Background");

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
"./js/src/core/components/deep-link/deep-link.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DeepLink: () => (DeepLink)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_app_router_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/app/router/router.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/react-router/dist/index.js");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
var _s = $RefreshSig$();



const DeepLink = ()=>{
    _s();
    const { elementType, id } = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_3__.useParams)();
    const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_3__.useNavigate)();
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        navigate(_Pimcore_app_router_router__WEBPACK_IMPORTED_MODULE_1__.routes.root, {
            state: {
                isDeeplink: true,
                id,
                elementType
            }
        });
    }, [
        id,
        elementType
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}, void 0, false);
};
_s(DeepLink, "4RFxzpts+1eQ6xC9l4a/dkZP9Ss=", false, function() {
    return [
        react_router_dom__WEBPACK_IMPORTED_MODULE_3__.useParams,
        react_router_dom__WEBPACK_IMPORTED_MODULE_3__.useNavigate
    ];
});
_c = DeepLink;
var _c;
$RefreshReg$(_c, "DeepLink");

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
"./js/src/core/components/focal-point/context/focal-point-context.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  FocalPointContext: () => (FocalPointContext)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
const FocalPointContext = react__WEBPACK_IMPORTED_MODULE_0___default().createContext(undefined);

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
"./js/src/core/components/image/image.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Image: () => (Image)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 


const Image = (props)=>{
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Image, {
        ...props
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/image/image.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, undefined);
};
_c = Image;
var _c;
$RefreshReg$(_c, "Image");

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
"./js/src/core/components/key-value-list/key-value-list.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyles: () => (useStyles)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/antd-style/es/functions/index.js");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
const useStyles = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param)=>{
    let { token, css } = param;
    return {
        keyValueList: css`
      border: 0;
      border-collapse: collapse;

      tr td {
        padding: ${token.Table.cellPaddingBlockSM}px;
        border: 0;
        border-bottom: 1px solid ${token.colorBorderSecondary};
        
        &:first-child {
          min-width: 100px;
        }
      }

      tr:last-of-type td {
        border-bottom: 0;
      }
    `
    };
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
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
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
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/key-value-list/key-value-list.tsx",
                        lineNumber: 87,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/key-value-list/key-value-list.tsx",
                    lineNumber: 86,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("td", {
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_text_text__WEBPACK_IMPORTED_MODULE_4__.Text, {
                        children: fieldValue === 0 ? fieldValue : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_sanitize_html_sanitize_html__WEBPACK_IMPORTED_MODULE_5__.SanitizeHtml, {
                            html: fieldValue ?? ''
                        }, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/key-value-list/key-value-list.tsx",
                            lineNumber: 91,
                            columnNumber: 46
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/key-value-list/key-value-list.tsx",
                        lineNumber: 90,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/key-value-list/key-value-list.tsx",
                    lineNumber: 89,
                    columnNumber: 9
                }, undefined)
            ]
        }, item.key, true, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/key-value-list/key-value-list.tsx",
            lineNumber: 85,
            columnNumber: 7
        }, undefined);
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("table", {
        className: styles.keyValueList,
        children: preparedItems.map((item)=>renderItem(item))
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/key-value-list/key-value-list.tsx",
        lineNumber: 99,
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
"./js/src/core/components/login-form/login-form-style.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyle: () => (useStyle)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/antd-style/es/functions/index.js");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
const useStyle = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param)=>{
    let { token, css } = param;
    return {
        form: css`
      form {
        display: flex;
        flex-direction: column;
        gap: 8px;
        font-family: Lato, sans-serif;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px;

        .flex-space {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .ant-btn-link {
          color: ${token.colorPrimary};

          &:hover {
            color: ${token.colorPrimaryHover};
          }
        }
      }
        
      .login__additional-logins {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        
        .ant-btn {
          width: 100%;
        }
      }
    `
    };
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
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
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
                        placeholder: "Username",
                        prefix: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_icon_icon__WEBPACK_IMPORTED_MODULE_8__.Icon, {
                            value: "user"
                        }, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
                            lineNumber: 89,
                            columnNumber: 20
                        }, void 0)
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
                        lineNumber: 86,
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
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
                        lineNumber: 91,
                        columnNumber: 9
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                        className: 'flex-space',
                        children: [
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_1__.Checkbox, {
                                "aria-label": t('aria.login-form-additional-logins.remember-me-checkbox'),
                                children: t('login-form.remember-me')
                            }, void 0, false, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
                                lineNumber: 97,
                                columnNumber: 11
                            }, undefined),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
                                type: 'link',
                                children: t('login-form.forgot-password')
                            }, void 0, false, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
                                lineNumber: 102,
                                columnNumber: 11
                            }, undefined)
                        ]
                    }, void 0, true, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
                        lineNumber: 96,
                        columnNumber: 9
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
                        htmlType: "submit",
                        loading: isLoginLoading,
                        type: "primary",
                        children: t('login-form.login')
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
                        lineNumber: 105,
                        columnNumber: 9
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
                lineNumber: 85,
                columnNumber: 7
            }, undefined),
            Array.isArray(additionalLogins) && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                className: 'login__additional-logins',
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
                        children: t('login-form-additional-logins.or')
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
                        lineNumber: 116,
                        columnNumber: 11
                    }, undefined),
                    additionalLogins === null || additionalLogins === void 0 ? void 0 : additionalLogins.map((login)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
                            "aria-label": `${t('aria.login-form-additional-logins.additional-login-provider')} ${login.name}`,
                            href: login.link,
                            type: 'primary',
                            children: login.name
                        }, login.key, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
                            lineNumber: 119,
                            columnNumber: 13
                        }, undefined))
                ]
            }, void 0, true, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
                lineNumber: 115,
                columnNumber: 9
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
        lineNumber: 84,
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
"./js/src/core/components/logo/logo.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStlyes: () => (useStlyes)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/antd-style/es/functions/index.js");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
const useStlyes = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param)=>{
    let { token, css } = param;
    return {
        logo: css`
      padding: 13px 16px 0 16px;
    `
    };
}, {
    hashPriority: 'low'
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
"./js/src/core/components/logo/logo.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Logo: () => (Logo)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_assets_images_pimcore_inline_svg_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/assets/images/pimcore.inline.svg?react");
/* ESM import */var _logo_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/logo/logo.styles.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
var _s = $RefreshSig$();



const Logo = ()=>{
    _s();
    const { styles } = (0,_logo_styles__WEBPACK_IMPORTED_MODULE_3__.useStlyes)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: [
            'logo',
            styles.logo
        ].join(' '),
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_assets_images_pimcore_inline_svg_react__WEBPACK_IMPORTED_MODULE_2__["default"], {
            color: "#333",
            fill: "#ff0000",
            height: 24,
            width: 24
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/logo/logo.tsx",
            lineNumber: 23,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/logo/logo.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, undefined);
};
_s(Logo, "Zah861yS7p3nEYN4Eain9hMyyUo=", false, function() {
    return [
        _logo_styles__WEBPACK_IMPORTED_MODULE_3__.useStlyes
    ];
});
_c = Logo;
var _c;
$RefreshReg$(_c, "Logo");

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
"./js/src/core/components/notification/notification.style.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyle: () => (useStyle)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/antd-style/es/functions/index.js");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
const useStyle = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param)=>{
    let { token, css } = param;
    return {
        notification: css`
      .ant-notification-notice-content {          
        .ant-notification-notice-message {
            color: ${token.colorText};
            font-size: 16px !important;
            font-style: normal;
            font-weight: 400;
            line-height: 24px;
            margin-bottom: ${token.marginXS}
        }
      }
    `
    };
}, {
    hashPriority: 'low'
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
"./js/src/core/components/notification/useNotification/index.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useNotification: () => (useNotification)
});
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _Pimcore_components_notification_notification_style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/notification/notification.style.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ var _s = $RefreshSig$();


const useNotification = ()=>{
    _s();
    const { notification: notificationApi } = antd__WEBPACK_IMPORTED_MODULE_0__.App.useApp();
    const decoratedNotificationApi = {
        ...notificationApi
    };
    const { styles } = (0,_Pimcore_components_notification_notification_style__WEBPACK_IMPORTED_MODULE_1__.useStyle)();
    decoratedNotificationApi.open = (config)=>{
        notificationApi.open({
            ...config,
            className: styles.notification
        });
    };
    return [
        decoratedNotificationApi
    ];
};
_s(useNotification, "i9OVTgiC06rqasQLQ3cyT2tpkuw=", false, function() {
    return [
        antd__WEBPACK_IMPORTED_MODULE_0__.App.useApp,
        _Pimcore_components_notification_notification_style__WEBPACK_IMPORTED_MODULE_1__.useStyle
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
"./js/src/core/components/pimcore-document/pimcore-document.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyle: () => (useStyle)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/antd-style/es/functions/index.js");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
const useStyle = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param)=>{
    let { token, css } = param;
    return {
        'document-container': css`
      width: 100%;
      height: 100%;
      .loading-div {
        position: absolute;
        top: calc(50% - 11px);
        left: calc(50% - 8px);
      }
      
      .display-none {
        display: none;
      }
    `
    };
}, {
    hashPriority: 'low'
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
"./js/src/core/components/pimcore-document/pimcore-document.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  PimcoreDocument: () => (PimcoreDocument)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_pimcore_document_pimcore_document_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/pimcore-document/pimcore-document.styles.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
var _s = $RefreshSig$();


const PimcoreDocument = (param)=>{
    let { src, className } = param;
    _s();
    const { styles } = (0,_Pimcore_components_pimcore_document_pimcore_document_styles__WEBPACK_IMPORTED_MODULE_2__.useStyle)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: [
            styles['document-container'],
            className
        ].join(' '),
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("iframe", {
            src: src,
            title: src
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/pimcore-document/pimcore-document.tsx",
            lineNumber: 27,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/pimcore-document/pimcore-document.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, undefined);
};
_s(PimcoreDocument, "4AcVho8W1Y+Yfard/v4lDs8ZRDQ=", false, function() {
    return [
        _Pimcore_components_pimcore_document_pimcore_document_styles__WEBPACK_IMPORTED_MODULE_2__.useStyle
    ];
});
_c = PimcoreDocument;
var _c;
$RefreshReg$(_c, "PimcoreDocument");

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
"./js/src/core/components/pimcore-video/pimcore-video.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  PimcoreVideo: () => (PimcoreVideo)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_modules_asset_editor_types_video_tab_manager_tabs_preview_preview_container__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/preview-container.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
var _s = $RefreshSig$();



const PimcoreVideo = (param)=>{
    let { sources, tracks, width, height, className, poster } = param;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)();
    const { setPlayerPosition } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_Pimcore_modules_asset_editor_types_video_tab_manager_tabs_preview_preview_container__WEBPACK_IMPORTED_MODULE_3__.VideoContext);
    return(// eslint-disable-next-line jsx-a11y/media-has-caption
    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("video", {
        className: className,
        controls: true,
        height: height,
        onTimeUpdate: onPlayerTimeUpdate,
        poster: poster,
        width: width,
        children: [
            sources.map((source, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("source", {
                    src: source.src,
                    type: source.type
                }, `${index}-${source.type}`, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/pimcore-video/pimcore-video.tsx",
                    lineNumber: 62,
                    columnNumber: 9
                }, undefined)),
            tracks === null || tracks === void 0 ? void 0 : tracks.map((track, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("track", {
                    kind: track.kind,
                    label: track.label,
                    src: track.src,
                    srcLang: track.srcLang
                }, `${index}-${track.label}`, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/pimcore-video/pimcore-video.tsx",
                    lineNumber: 70,
                    columnNumber: 9
                }, undefined)),
            t('asset.preview.no-video-support')
        ]
    }, sources[0].src, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/pimcore-video/pimcore-video.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, undefined));
    function onPlayerTimeUpdate(e) {
        const video = e.target;
        setPlayerPosition(video.currentTime);
    }
};
_s(PimcoreVideo, "d9H1/w4JVCfVFSbJ9VCvQ79Rku0=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation
    ];
});
_c = PimcoreVideo;
var _c;
$RefreshReg$(_c, "PimcoreVideo");

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
"./js/src/core/components/progressbar/progressbar.style.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyle: () => (useStyle)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/antd-style/es/functions/index.js");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
const useStyle = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param)=>{
    let { token, css } = param;
    return {
        progressbar: css`
      padding-bottom: ${token.marginXXS}px;  
        
      .progressbar-description {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-end;
          
        p {
          color: ${token.colorTextTertiary};
          margin: 0;
          font-size: 12px;
          font-weight: 400;
          line-height: 22px;
        }

        .progressbar-description__action {
          .ant-btn {
            color: ${token.colorPrimary};
            height: ${token.controlHeight}px;
            display: flex;
            justify-content: center;
            padding: 0 ${token.paddingXXS}px;
            align-items: flex-end;

            &:hover {
              color: ${token.colorPrimaryHover}
            }
          }
        }
      }
      
      .ant-progress {
        margin-bottom: 0;
          
        .ant-progress-bg {
          background: ${token.colorTextDescription};        
        }
      }

      .progressbar-status {
        p {
          color: ${token.colorTextSecondary};
          font-size: 12px;
          font-weight: 400;
          line-height: 22px;
          margin: 0;
        }
      }
    `
    };
}, {
    hashPriority: 'low'
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
"./js/src/core/components/progressbar/progressbar.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Progressbar: () => (Progressbar)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_components_progressbar_progressbar_style__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/progressbar/progressbar.style.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
var _s = $RefreshSig$();



const Progressbar = (param)=>{
    let { progressStatus, description, descriptionAction, ...props } = param;
    _s();
    const { styles } = (0,_Pimcore_components_progressbar_progressbar_style__WEBPACK_IMPORTED_MODULE_3__.useStyle)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: styles.progressbar,
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                className: 'progressbar-description',
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
                        id: 'progressbarLabel',
                        children: description
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/progressbar/progressbar.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                        className: 'progressbar-description__action',
                        children: descriptionAction
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/progressbar/progressbar.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/progressbar/progressbar.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_1__.Progress, {
                ...props,
                "aria-labelledby": 'progressbarLabel',
                showInfo: false,
                status: "normal"
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/progressbar/progressbar.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                className: 'progressbar-status',
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
                    children: progressStatus
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/progressbar/progressbar.tsx",
                    lineNumber: 42,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/progressbar/progressbar.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/progressbar/progressbar.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, undefined);
};
_s(Progressbar, "4AcVho8W1Y+Yfard/v4lDs8ZRDQ=", false, function() {
    return [
        _Pimcore_components_progressbar_progressbar_style__WEBPACK_IMPORTED_MODULE_3__.useStyle
    ];
});
_c = Progressbar;
var _c;
$RefreshReg$(_c, "Progressbar");

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
"./js/src/core/modules/app/base-layout/base-layout-view.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStlyes: () => (useStlyes)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/antd-style/es/functions/index.js");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
const useStlyes = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param)=>{
    let { token, css } = param;
    return {
        baseLayout: css`
      position: absolute;
      overflow: hidden;
      inset: 0;
    `
    };
}, {
    hashPriority: 'low'
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
"./js/src/core/modules/app/base-layout/base-layout-view.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  BaseLayoutView: () => (BaseLayoutView)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _left_sidebar_view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/app/base-layout/left-sidebar-view.tsx");
/* ESM import */var _Pimcore_modules_widget_manager_widget_manager_container__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/widget-manager/widget-manager-container.tsx");
/* ESM import */var _right_sidebar_view__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/app/base-layout/right-sidebar-view.tsx");
/* ESM import */var _base_layout_view_styles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/app/base-layout/base-layout-view.styles.ts");
/* ESM import */var _Pimcore_modules_execution_engine_notification_notification__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/execution-engine/notification/notification.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
var _s = $RefreshSig$();






const BaseLayoutView = ()=>{
    _s();
    const { styles } = (0,_base_layout_view_styles__WEBPACK_IMPORTED_MODULE_5__.useStlyes)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: [
            'base-layout',
            styles.baseLayout
        ].join(' '),
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_left_sidebar_view__WEBPACK_IMPORTED_MODULE_2__.LeftSidebarView, {}, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/base-layout/base-layout-view.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_widget_manager_widget_manager_container__WEBPACK_IMPORTED_MODULE_3__.WidgetManagerContainer, {}, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/base-layout/base-layout-view.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_execution_engine_notification_notification__WEBPACK_IMPORTED_MODULE_6__.Notification, {}, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/base-layout/base-layout-view.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_right_sidebar_view__WEBPACK_IMPORTED_MODULE_4__.RightSidebarView, {}, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/base-layout/base-layout-view.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/base-layout/base-layout-view.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, undefined);
};
_s(BaseLayoutView, "Zah861yS7p3nEYN4Eain9hMyyUo=", false, function() {
    return [
        _base_layout_view_styles__WEBPACK_IMPORTED_MODULE_5__.useStlyes
    ];
});
_c = BaseLayoutView;
var _c;
$RefreshReg$(_c, "BaseLayoutView");

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
"./js/src/core/modules/app/base-layout/left-sidebar-view.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyles: () => (useStyles)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/antd-style/es/functions/index.js");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
const useStyles = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param)=>{
    let { token, css } = param;
    return {
        leftSidebar: css`
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      z-index: 1000;
      pointer-events: none;

      .left-sidebar__avatar {
        margin: 8px 15px 0 15px;
        pointer-events: all;
      }

      .ant-avatar {
        background-color: rgba(114, 46, 209, 0.66);

        .anticon {
          vertical-align: 0;
        }
      }
      
      .left-sidebar__nav {
        list-style: none;
        padding: ${token.paddingXXS}px 0;
        margin: ${token.marginSM}px 0;
        position: relative;
        pointer-events: auto;
        text-align: center;
        
        &:before {
          content: '';
          position: absolute;
          top: 0;
          left: ${token.paddingSM}px;
          right: ${token.paddingSM}px;
          height: 1px;
          background: ${token.Divider.colorSplit};
        }
      }
    `
    };
}, {
    hashPriority: 'low'
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
"./js/src/core/modules/app/base-layout/left-sidebar-view.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  LeftSidebarView: () => (LeftSidebarView)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _Pimcore_modules_app_nav_main_nav__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/app/nav/main-nav.tsx");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var _left_sidebar_view_styles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/app/base-layout/left-sidebar-view.styles.ts");
/* ESM import */var _Pimcore_modules_search_search__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/search/search.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
var _s = $RefreshSig$();






const LeftSidebarView = ()=>{
    _s();
    const { styles } = (0,_left_sidebar_view_styles__WEBPACK_IMPORTED_MODULE_5__.useStyles)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: styles.leftSidebar,
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.Avatar, {
                className: "left-sidebar__avatar",
                icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_1__.Icon, {
                    value: "user"
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/base-layout/left-sidebar-view.tsx",
                    lineNumber: 28,
                    columnNumber: 16
                }, void 0),
                size: 26
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/base-layout/left-sidebar-view.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("ul", {
                className: "left-sidebar__nav",
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("li", {
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_app_nav_main_nav__WEBPACK_IMPORTED_MODULE_2__.MainNav, {}, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/base-layout/left-sidebar-view.tsx",
                            lineNumber: 34,
                            columnNumber: 11
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/base-layout/left-sidebar-view.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("li", {
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_search_search__WEBPACK_IMPORTED_MODULE_6__.Search, {}, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/base-layout/left-sidebar-view.tsx",
                            lineNumber: 38,
                            columnNumber: 11
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/base-layout/left-sidebar-view.tsx",
                        lineNumber: 37,
                        columnNumber: 9
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/base-layout/left-sidebar-view.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/base-layout/left-sidebar-view.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, undefined);
};
_s(LeftSidebarView, "1BGFRu6BGAbhzJ8kKgs1GUjvI6w=", false, function() {
    return [
        _left_sidebar_view_styles__WEBPACK_IMPORTED_MODULE_5__.useStyles
    ];
});
_c = LeftSidebarView;
var _c;
$RefreshReg$(_c, "LeftSidebarView");

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
"./js/src/core/modules/app/base-layout/right-sidebar-view.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStlyes: () => (useStlyes)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/antd-style/es/functions/index.js");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
const useStlyes = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param)=>{
    let { token, css } = param;
    return {
        rightSidebar: css`
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 2;
      pointer-events: none;

      .logo 
    `
    };
}, {
    hashPriority: 'low'
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
"./js/src/core/modules/app/base-layout/right-sidebar-view.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  RightSidebarView: () => (RightSidebarView)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_components_logo_logo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/logo/logo.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _right_sidebar_view_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/app/base-layout/right-sidebar-view.styles.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
var _s = $RefreshSig$();



const RightSidebarView = ()=>{
    _s();
    const { styles } = (0,_right_sidebar_view_styles__WEBPACK_IMPORTED_MODULE_3__.useStlyes)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: styles.rightSidebar,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_logo_logo__WEBPACK_IMPORTED_MODULE_1__.Logo, {}, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/base-layout/right-sidebar-view.tsx",
            lineNumber: 23,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/base-layout/right-sidebar-view.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, undefined);
};
_s(RightSidebarView, "Zah861yS7p3nEYN4Eain9hMyyUo=", false, function() {
    return [
        _right_sidebar_view_styles__WEBPACK_IMPORTED_MODULE_3__.useStlyes
    ];
});
_c = RightSidebarView;
var _c;
$RefreshReg$(_c, "RightSidebarView");

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
"./js/src/core/modules/app/default-page.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DefaultPage: () => (DefaultPage)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_components_background_background__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/background/background.tsx");
/* ESM import */var _Pimcore_modules_app_base_layout_base_layout_view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/app/base-layout/base-layout-view.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _data_object_utils_provider_class_defintions_class_definitions_provider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/data-object/utils/provider/class-defintions/class-definitions-provider.tsx");
/* ESM import */var _element_element_selector_provider_element_selector_element_selector_provider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/element/element-selector/provider/element-selector/element-selector-provider.tsx");
/* ESM import */var _hook_use_handle_deeplink__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/app/hook/use-handle-deeplink.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
var _s = $RefreshSig$();






const DefaultPage = ()=>{
    _s();
    (0,_hook_use_handle_deeplink__WEBPACK_IMPORTED_MODULE_6__.useHandleDeepLink)();
    const preventDrop = (event)=>{
        event.preventDefault();
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        onDragOver: preventDrop,
        onDrop: preventDrop,
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_background_background__WEBPACK_IMPORTED_MODULE_1__.Background, {}, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/default-page.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_data_object_utils_provider_class_defintions_class_definitions_provider__WEBPACK_IMPORTED_MODULE_4__.ClassDefinitionsProvider, {
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_element_element_selector_provider_element_selector_element_selector_provider__WEBPACK_IMPORTED_MODULE_5__.ElementSelectorProvider, {
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_app_base_layout_base_layout_view__WEBPACK_IMPORTED_MODULE_2__.BaseLayoutView, {}, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/default-page.tsx",
                        lineNumber: 36,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/default-page.tsx",
                    lineNumber: 35,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/default-page.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/default-page.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, undefined);
};
_s(DefaultPage, "EsB+haLFaA3/R9EBhwpPpjcZa/g=", false, function() {
    return [
        _hook_use_handle_deeplink__WEBPACK_IMPORTED_MODULE_6__.useHandleDeepLink
    ];
});
_c = DefaultPage;
var _c;
$RefreshReg$(_c, "DefaultPage");

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
"./js/src/core/modules/app/hook/use-handle-deeplink.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useHandleDeepLink: () => (useHandleDeepLink)
});
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/react-router/dist/index.js");
/* ESM import */var _error_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* ESM import */var _Pimcore_modules_element_hooks_use_element_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/element/hooks/use-element-helper.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 



const useHandleDeepLink = ()=>{
    var _location_state;
    const location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_3__.useLocation)();
    const { openElement } = (0,_Pimcore_modules_element_hooks_use_element_helper__WEBPACK_IMPORTED_MODULE_2__.useElementHelper)();
    if ((location === null || location === void 0 ? void 0 : (_location_state = location.state) === null || _location_state === void 0 ? void 0 : _location_state.isDeeplink) === true) {
        var _location_state1, _location_state2;
        const id = location === null || location === void 0 ? void 0 : (_location_state1 = location.state) === null || _location_state1 === void 0 ? void 0 : _location_state1.id;
        const elementType = location === null || location === void 0 ? void 0 : (_location_state2 = location.state) === null || _location_state2 === void 0 ? void 0 : _location_state2.elementType;
        const fetchData = async ()=>{
            if (!(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(id) && !(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(elementType)) {
                await openElement({
                    id: Number(id),
                    type: elementType
                });
            }
        };
        fetchData().catch(()=>{
            (0,_error_handler__WEBPACK_IMPORTED_MODULE_1__["default"])(new _error_handler__WEBPACK_IMPORTED_MODULE_1__.GeneralError('An Error occured while opening the Element'));
        });
    }
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
"./js/src/core/modules/app/nav/hooks/use-main-nav.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useMainNav: () => (useMainNav)
});
/* ESM import */var _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/depency-injection/index.ts");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react_redux__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./node_modules/react-redux/dist/react-redux.mjs");
/* ESM import */var _Pimcore_app_config_services_service_ids__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/app/config/services/service-ids.ts");
/* ESM import */var _Pimcore_modules_auth_hooks_use_user__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/auth/hooks/use-user.ts");
/* ESM import */var _Pimcore_modules_auth_permission_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/auth/permission-helper.ts");
/* ESM import */var _Pimcore_modules_perspectives_permission_checker__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/perspectives/permission-checker.ts");
/* ESM import */var _Pimcore_modules_perspectives_active_perspective_slice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/perspectives/active-perspective-slice.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_7__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 








const addNavItemToItemList = (items, item)=>{
    const levels = item.path.split('/');
    if (levels.length > 4) {
        console.warn('MainNav: Maximum depth of 4 levels is allowed, Item will be ignored', item);
        return;
    }
    let currentLevel = items;
    levels.forEach((level, index)=>{
        let existingItem = currentLevel.find((i)=>i.id === level);
        const isCurrentItem = index === levels.length - 1;
        if (existingItem === undefined) {
            existingItem = {
                order: isCurrentItem ? item.order : 100,
                id: level,
                label: item.label ?? level,
                path: levels.slice(0, index + 1).join('/'),
                children: [],
                icon: isCurrentItem ? item.icon : undefined,
                widgetConfig: isCurrentItem ? item.widgetConfig : undefined,
                onClick: isCurrentItem ? item.onClick : undefined,
                button: isCurrentItem ? item.button : undefined,
                className: isCurrentItem ? item.className : undefined,
                perspectivePermission: isCurrentItem ? item.perspectivePermission : undefined,
                perspectivePermissionHide: isCurrentItem ? item.perspectivePermissionHide : undefined
            };
            currentLevel.push(existingItem);
        } else if (index === levels.length - 1) {
            Object.assign(existingItem, {
                icon: item.icon,
                order: item.order ?? 100,
                className: item.className
            });
        }
        currentLevel = existingItem.children ?? [];
        currentLevel.sort((a, b)=>(a.order ?? 100) - (b.order ?? 100));
    });
    items.sort((a, b)=>(a.order ?? 100) - (b.order ?? 100));
};
const useMainNav = ()=>{
    const mainNavRegistryService = _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_0__.container.get(_Pimcore_app_config_services_service_ids__WEBPACK_IMPORTED_MODULE_2__.serviceIds.mainNavRegistry);
    const user = (0,_Pimcore_modules_auth_hooks_use_user__WEBPACK_IMPORTED_MODULE_3__.useUser)();
    const activePerspective = (0,react_redux__WEBPACK_IMPORTED_MODULE_8__.useSelector)(_Pimcore_modules_perspectives_active_perspective_slice__WEBPACK_IMPORTED_MODULE_6__.selectActivePerspective);
    const createNavItems = ()=>{
        const items = [];
        if ((0,lodash__WEBPACK_IMPORTED_MODULE_7__.isNil)(user) || (0,lodash__WEBPACK_IMPORTED_MODULE_7__.isNil)(activePerspective)) {
            return items;
        }
        mainNavRegistryService.getMainNavItems().forEach((item)=>{
            if (item.permission !== undefined && !(0,_Pimcore_modules_auth_permission_helper__WEBPACK_IMPORTED_MODULE_4__.isAllowed)(item.permission)) {
                return;
            }
            if (item.perspectivePermission !== undefined && !(0,_Pimcore_modules_perspectives_permission_checker__WEBPACK_IMPORTED_MODULE_5__.isAllowedInPerspective)(item.perspectivePermission)) {
                return;
            }
            addNavItemToItemList(items, item);
        });
        return items;
    };
    const navItems = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        return createNavItems();
    }, [
        mainNavRegistryService.getMainNavItems(),
        user,
        activePerspective
    ]);
    return {
        navItems
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
"./js/src/core/modules/app/nav/main-nav.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStlyes: () => (useStlyes)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/antd-style/es/functions/index.js");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
const useStlyes = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param)=>{
    let { token, css } = param;
    return {
        mainNav: css`
      position: absolute;
      left: 100%;
      top: 0;
      background: #fff;
      padding: ${token.paddingMD}px;
      box-shadow: ${token.boxShadowSecondary};
      border-radius: ${token.borderRadius}px;
      width: 818px;
      max-width: 90vw;
      min-width: 530px;
      text-align: left;
      max-height: 85vh;
      display: flex;
      flex-direction: column;
      
      .main-nav__top {
        display: flex;
        justify-content: space-between;
      }
      
      .main-nav__list-inline {
        display: flex;
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .main-nav__bottom {
        display: flex;
        text-transform: uppercase;
        gap: ${token.marginSM}px;
        color: ${token.colorTextDescription};
        
        .main-nav__bottom-title {
          margin-top: ${token.marginXS}px;
          line-height: 1.5;
        }

        .main-nav__list-inline {
          gap: ${token.marginXS}px;
          flex-wrap: wrap;
        }
      }
      
      .main-nav__list {
        margin: 0;
        list-style: none;
        width: 100%;
        padding: 0 ${token.paddingXS}px;
        font-size: ${token.fontSize}px;
        position: relative;
        max-height: 100%;
      }

      .main-nav__list--level-0 {
        width: 25%;
        padding: 0;
        background: rgba(0, 0, 0, 0.02);
        
        > .main-nav__list-item.is-active > .main-nav__list-btn {
          border-left: 2px solid ${token.colorPrimary};
          background: ${token.controlItemBgActive};
          color: ${token.colorPrimary};
        }
      }

      .main-nav__list:not(.main-nav__list--level-0) {
        position: static;
      }

      .main-nav__list--level-1 {
        padding: ${token.paddingXS}px;
      }

      .main-nav__list-detail {
        position: absolute;
        left: 100%;
        width: 100%;
        top: 0;
        bottom: 0;
        transform: translateX(-15px);
        opacity: 0;
        visibility: hidden;
        transition: transform 200ms ease-in-out, opacity 200ms ease-in-out;
      }

      .is-active > .main-nav__list-detail {
        opacity: 1;
        transform: translateX(0);
        visibility: visible;
      }

      .main-nav__list-detail-scroll-container {
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        max-height: 100%;
      }

      .main-nav__list-detail-scroll {
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        scroll-behavior: smooth;
        scroll-snap-type: x mandatory;
      }

      .main-nav__list-btn {
        background: none;
        border: 0;
        width: 100%;
        padding: ${token.paddingSM}px;
        cursor: pointer;
        text-align: left;
        display: flex;
        align-items: center;
        gap: ${token.marginXXS}px;
        min-height: 46px;
        
        &:hover {
          background: ${token.controlItemBgActiveHover};
          color: ${token.colorPrimary};
        }
      }

      .is-active > .main-nav__list-btn {
        background: ${token.controlItemBgActive};
        color: ${token.colorPrimary};
      }
      
      .main-nav__list-btn-icon {
        margin-left: auto;
      }
      
      .main-nav__divider {
        margin: ${token.marginSM}px 0;
      }
      
      .main-nav__list--level-1 .main-nav__list-btn {
        min-height: unset;
        border-radius: ${token.borderRadius}px;
        padding: ${token.paddingXS}px;
      }
    `
    };
}, {
    hashPriority: 'low'
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
"./js/src/core/modules/app/nav/main-nav.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  MainNav: () => (MainNav)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var framer_motion__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs");
/* ESM import */var framer_motion__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs");
/* ESM import */var _main_nav_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/app/nav/main-nav.styles.ts");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _hooks_use_main_nav__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/app/nav/hooks/use-main-nav.ts");
/* ESM import */var _Pimcore_modules_widget_manager_hooks_use_widget_manager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/widget-manager/hooks/use-widget-manager.ts");
/* ESM import */var _Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/icon-button/icon-button.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_modules_perspectives_permission_checker__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/perspectives/permission-checker.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_10__);
/* ESM import */var _perspective_switch__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/app/nav/perspective-switch.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
var _s = $RefreshSig$();












const MainNav = ()=>{
    var _this = undefined;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_8__.useTranslation)();
    const { styles } = (0,_main_nav_styles__WEBPACK_IMPORTED_MODULE_3__.useStlyes)();
    const { navItems } = (0,_hooks_use_main_nav__WEBPACK_IMPORTED_MODULE_5__.useMainNav)();
    const { openMainWidget } = (0,_Pimcore_modules_widget_manager_hooks_use_widget_manager__WEBPACK_IMPORTED_MODULE_6__.useWidgetManager)();
    const [isOpen, setIsOpen] = react__WEBPACK_IMPORTED_MODULE_2___default().useState(false);
    const [openKeys, setOpenKeys] = react__WEBPACK_IMPORTED_MODULE_2___default().useState([]);
    const handleOpenState = (key)=>{
        if (key.includes('-')) {
            const searchKey = key.substring(0, key.length - 1);
            const newOpenKeys = openKeys.filter((k)=>!k.startsWith(searchKey));
            setOpenKeys([
                ...newOpenKeys,
                key
            ]);
        }
        if (!key.includes('-')) {
            setOpenKeys(openKeys.includes(key) ? openKeys.filter((k)=>k !== key) : [
                key
            ]);
        }
    };
    const renderNavItem = function(item, index) {
        let level = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
        var _item_children;
        const isVisible = item.children !== undefined && item.children.length > 0 || item.widgetConfig !== undefined || item.onClick !== undefined || item.button !== undefined;
        const isHiddenInPerspective = item.perspectivePermissionHide !== undefined && (0,_Pimcore_modules_perspectives_permission_checker__WEBPACK_IMPORTED_MODULE_9__.isAllowedInPerspective)(item.perspectivePermissionHide);
        if (!isVisible || isHiddenInPerspective) {
            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}, void 0, false);
        }
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("li", {
            className: `main-nav__list-item ${openKeys.includes(index) ? 'is-active' : ''} ${item.className ?? ''}`,
            children: [
                !(0,lodash__WEBPACK_IMPORTED_MODULE_10__.isUndefined)(item.button) ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                    children: item.button()
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/nav/main-nav.tsx",
                    lineNumber: 65,
                    columnNumber: 13
                }, _this) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("button", {
                    className: 'main-nav__list-btn',
                    onClick: ()=>{
                        if (item.children !== undefined && item.children.length > 0) {
                            handleOpenState(index);
                        } else if (item.onClick !== undefined) {
                            item.onClick();
                            setIsOpen(false);
                        } else if (item.widgetConfig !== undefined) {
                            openMainWidget(item.widgetConfig);
                            setIsOpen(false);
                        }
                    },
                    children: [
                        item.icon !== undefined ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_4__.Icon, {
                            value: item.icon
                        }, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/nav/main-nav.tsx",
                            lineNumber: 84,
                            columnNumber: 43
                        }, _this) : null,
                        t(`${item.label}`),
                        item.children !== undefined && item.children.length > 0 ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_4__.Icon, {
                            className: 'main-nav__list-btn-icon',
                            value: 'chevron-right'
                        }, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/nav/main-nav.tsx",
                            lineNumber: 89,
                            columnNumber: 19
                        }, _this) : null
                    ]
                }, void 0, true, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/nav/main-nav.tsx",
                    lineNumber: 70,
                    columnNumber: 13
                }, _this),
                item.children !== undefined && item.children.length > 0 ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                    className: 'main-nav__list-detail',
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                        className: 'main-nav__list-detail-scroll-container',
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                            className: 'main-nav__list-detail-scroll',
                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("ul", {
                                className: `main-nav__list main-nav__list--level-${level + 1}`,
                                children: (_item_children = item.children) === null || _item_children === void 0 ? void 0 : _item_children.map((child, childIndex)=>renderNavItem(child, `${index}-${childIndex}`, level))
                            }, void 0, false, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/nav/main-nav.tsx",
                                lineNumber: 103,
                                columnNumber: 19
                            }, _this)
                        }, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/nav/main-nav.tsx",
                            lineNumber: 102,
                            columnNumber: 17
                        }, _this)
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/nav/main-nav.tsx",
                        lineNumber: 101,
                        columnNumber: 15
                    }, _this)
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/nav/main-nav.tsx",
                    lineNumber: 100,
                    columnNumber: 13
                }, _this) : null
            ]
        }, item.path, true, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/nav/main-nav.tsx",
            lineNumber: 59,
            columnNumber: 7
        }, _this);
    };
    const elRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
    const handleClickOutside = (evt)=>{
        if (elRef.current !== null && !elRef.current.contains(evt.target)) {
            setIsOpen(false);
        }
    };
    const navRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        if (isOpen) {
            document.addEventListener('click', handleClickOutside);
            if (navRef.current !== null) {
                const maxHeight = Array.from(document.querySelectorAll('.main-nav__list')).reduce((max, nav)=>Math.max(max, nav.scrollHeight), 0);
                navRef.current.style.height = `${maxHeight}px`;
            }
        }
        return ()=>{
            document.removeEventListener('click', handleClickOutside);
        };
    }, [
        isOpen
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        ref: elRef,
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_7__.IconButton, {
                icon: {
                    value: 'menu'
                },
                onClick: ()=>{
                    setIsOpen(!isOpen);
                },
                type: 'text'
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/nav/main-nav.tsx",
                lineNumber: 143,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(framer_motion__WEBPACK_IMPORTED_MODULE_12__.AnimatePresence, {
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(framer_motion__WEBPACK_IMPORTED_MODULE_13__.motion.div, {
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    initial: {
                        opacity: isOpen ? 0 : 1
                    },
                    children: isOpen ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                        className: [
                            'main-nav',
                            styles.mainNav
                        ].join(' '),
                        children: [
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("ul", {
                                className: 'main-nav__list main-nav__list--level-0',
                                ref: navRef,
                                children: navItems.map((item, index)=>renderNavItem(item, `${index}`))
                            }, void 0, false, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/nav/main-nav.tsx",
                                lineNumber: 164,
                                columnNumber: 17
                            }, undefined),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_1__.Divider, {
                                className: 'main-nav__divider'
                            }, void 0, false, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/nav/main-nav.tsx",
                                lineNumber: 173,
                                columnNumber: 17
                            }, undefined),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_perspective_switch__WEBPACK_IMPORTED_MODULE_11__.PerspectiveSwitch, {
                                setIsOpen: setIsOpen
                            }, void 0, false, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/nav/main-nav.tsx",
                                lineNumber: 175,
                                columnNumber: 17
                            }, undefined)
                        ]
                    }, void 0, true, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/nav/main-nav.tsx",
                        lineNumber: 160,
                        columnNumber: 15
                    }, undefined) : null
                }, isOpen ? 'open' : 'closed', false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/nav/main-nav.tsx",
                    lineNumber: 152,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/nav/main-nav.tsx",
                lineNumber: 151,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/nav/main-nav.tsx",
        lineNumber: 142,
        columnNumber: 5
    }, undefined);
};
_s(MainNav, "9mjnmrgUlSN3+fUF8j7kkRPcPP8=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_8__.useTranslation,
        _main_nav_styles__WEBPACK_IMPORTED_MODULE_3__.useStlyes,
        _hooks_use_main_nav__WEBPACK_IMPORTED_MODULE_5__.useMainNav,
        _Pimcore_modules_widget_manager_hooks_use_widget_manager__WEBPACK_IMPORTED_MODULE_6__.useWidgetManager
    ];
});
_c = MainNav;
var _c;
$RefreshReg$(_c, "MainNav");

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
"./js/src/core/modules/app/nav/perspective-switch.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  PerspectiveSwitch: () => (PerspectiveSwitch)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_icon_text_button_icon_text_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/icon-text-button/icon-text-button.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_modules_auth_hooks_use_user__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/auth/hooks/use-user.ts");
/* ESM import */var _Pimcore_modules_perspectives_hooks_use_perspectives__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/perspectives/hooks/use-perspectives.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
var _s = $RefreshSig$();





const PerspectiveSwitch = (param)=>{
    let { setIsOpen } = param;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation)();
    const { switchPerspective } = (0,_Pimcore_modules_perspectives_hooks_use_perspectives__WEBPACK_IMPORTED_MODULE_5__.usePerspectives)();
    const user = (0,_Pimcore_modules_auth_hooks_use_user__WEBPACK_IMPORTED_MODULE_4__.useUser)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: 'main-nav__bottom',
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                className: 'main-nav__bottom-title',
                children: t('navigation.perspectives')
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/nav/perspective-switch.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("ul", {
                className: 'main-nav__list-inline',
                children: user.perspectives.map((perspective, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("li", {
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_text_button_icon_text_button__WEBPACK_IMPORTED_MODULE_2__.IconTextButton, {
                            color: perspective.id === user.activePerspective ? 'primary' : 'secondary',
                            icon: perspective.icon,
                            onClick: async ()=>{
                                void switchPerspective(perspective);
                                setIsOpen(false);
                            },
                            variant: perspective.id === user.activePerspective ? 'filled' : 'outlined',
                            children: t(perspective.name)
                        }, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/nav/perspective-switch.tsx",
                            lineNumber: 34,
                            columnNumber: 13
                        }, undefined)
                    }, perspective.id, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/nav/perspective-switch.tsx",
                        lineNumber: 33,
                        columnNumber: 11
                    }, undefined))
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/nav/perspective-switch.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/nav/perspective-switch.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, undefined);
};
_s(PerspectiveSwitch, "BzRmeXbqSrs+gCIWdJEt8Efp864=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation,
        _Pimcore_modules_perspectives_hooks_use_perspectives__WEBPACK_IMPORTED_MODULE_5__.usePerspectives,
        _Pimcore_modules_auth_hooks_use_user__WEBPACK_IMPORTED_MODULE_4__.useUser
    ];
});
_c = PerspectiveSwitch;
var _c;
$RefreshReg$(_c, "PerspectiveSwitch");

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
"./js/src/core/modules/asset/editor/types/asset-thumbnails-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useThumbnailImageGetCollectionQuery: () => (useThumbnailImageGetCollectionQuery),
  useThumbnailVideoGetCollectionQuery: () => (useThumbnailVideoGetCollectionQuery)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Asset Thumbnails"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            thumbnailImageGetCollection: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/thumbnails/image`
                    }),
                providesTags: [
                    "Asset Thumbnails"
                ]
            }),
            thumbnailVideoGetCollection: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/thumbnails/video`
                    }),
                providesTags: [
                    "Asset Thumbnails"
                ]
            })
        }),
    overrideExisting: false
});

const { useThumbnailImageGetCollectionQuery, useThumbnailVideoGetCollectionQuery } = injectedRtkApi;

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
"./js/src/core/modules/asset/editor/types/image/tab-manager/tabs/preview/sidebar/buttons/focal-point.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  FocalPointSidebarButton: () => (FocalPointSidebarButton)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/classnames/index.js");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _Pimcore_components_focal_point_context_focal_point_context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/focal-point/context/focal-point-context.ts");
/* ESM import */var _Pimcore_modules_asset_asset_provider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/asset/asset-provider.tsx");
/* ESM import */var _Pimcore_modules_asset_hooks_use_asset_draft__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/asset/hooks/use-asset-draft.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
var _s = $RefreshSig$();






const HALF_DIVISOR = 2;
const PERCENT_MULTIPLIER = 100;
const FocalPointSidebarButton = (props)=>{
    _s();
    const { id } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_Pimcore_modules_asset_asset_provider__WEBPACK_IMPORTED_MODULE_5__.AssetContext);
    const focalPointContext = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_Pimcore_components_focal_point_context_focal_point_context__WEBPACK_IMPORTED_MODULE_4__.FocalPointContext);
    const { addImageSettings } = (0,_Pimcore_modules_asset_hooks_use_asset_draft__WEBPACK_IMPORTED_MODULE_6__.useAssetDraft)(id);
    const handleClick = ()=>{
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_3__.isUndefined)(focalPointContext)) {
            const { isActive, setIsActive, setCoordinates, containerRef } = focalPointContext;
            if (!(0,lodash__WEBPACK_IMPORTED_MODULE_3__.isNull)(containerRef.current)) {
                var _container_firstElementChild, _container_firstElementChild1;
                const container = containerRef.current;
                const scrollLeft = container.scrollLeft;
                const scrollTop = container.scrollTop;
                const visibleWidth = container.clientWidth;
                const visibleHeight = container.clientHeight;
                const fullWidth = (container === null || container === void 0 ? void 0 : (_container_firstElementChild = container.firstElementChild) === null || _container_firstElementChild === void 0 ? void 0 : _container_firstElementChild.clientWidth) ?? 0;
                const fullHeight = (container === null || container === void 0 ? void 0 : (_container_firstElementChild1 = container.firstElementChild) === null || _container_firstElementChild1 === void 0 ? void 0 : _container_firstElementChild1.clientHeight) ?? 0;
                const percentX = fullWidth >= visibleWidth ? (scrollLeft + visibleWidth / HALF_DIVISOR) / fullWidth * PERCENT_MULTIPLIER : 50;
                const percentY = fullHeight >= visibleHeight ? (scrollTop + visibleHeight / HALF_DIVISOR) / fullHeight * PERCENT_MULTIPLIER : 50;
                const updatedCoordinates = {
                    x: percentX,
                    y: percentY
                };
                setCoordinates(updatedCoordinates);
                addImageSettings({
                    focalPoint: updatedCoordinates
                });
                setIsActive(!isActive);
            }
        }
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        "aria-label": props.key,
        className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('button', {
            'button--highlighted': (focalPointContext === null || focalPointContext === void 0 ? void 0 : focalPointContext.isActive) === true
        }),
        onClick: handleClick,
        onKeyDown: handleClick,
        role: 'button',
        tabIndex: props.index,
        children: props.icon
    }, props.key, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/image/tab-manager/tabs/preview/sidebar/buttons/focal-point.tsx",
        lineNumber: 75,
        columnNumber: 5
    }, undefined);
};
_s(FocalPointSidebarButton, "jru9eUXv7YHJWVy5JjVV/hS7qGQ=", false, function() {
    return [
        _Pimcore_modules_asset_hooks_use_asset_draft__WEBPACK_IMPORTED_MODULE_6__.useAssetDraft
    ];
});
_c = FocalPointSidebarButton;
var _c;
$RefreshReg$(_c, "FocalPointSidebarButton");

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
"./js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/preview-container.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  PreviewContainer: () => (PreviewContainer),
  VideoContext: () => (VideoContext)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _preview_view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/preview-view.tsx");
/* ESM import */var _Pimcore_modules_asset_asset_provider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/asset/asset-provider.tsx");
/* ESM import */var _Pimcore_components_content_layout_content_layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/content-layout/content-layout.tsx");
/* ESM import */var _Pimcore_modules_asset_editor_types_video_tab_manager_tabs_preview_sidebar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/index.tsx");
/* ESM import */var _Pimcore_components_sidebar_sidebar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/sidebar/sidebar.tsx");
/* ESM import */var _Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/content/content.tsx");
/* ESM import */var _Pimcore_app_api_pimcore_route__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/app/api/pimcore/route.ts");
/* ESM import */var _Pimcore_modules_asset_hooks_use_asset_draft__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/asset/hooks/use-asset-draft.ts");
/* ESM import */var _Pimcore_utils_polling_helper__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/utils/polling-helper.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
var _s = $RefreshSig$();










const VideoContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({
    thumbnail: '',
    setThumbnail: ()=>{},
    playerPosition: 0,
    setPlayerPosition: ()=>{}
});
const PreviewContainer = ()=>{
    _s();
    const [thumbnail, setThumbnail] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('pimcore-system-treepreview');
    const [url, setUrl] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [playerPosition, setPlayerPosition] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const { id } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_Pimcore_modules_asset_asset_provider__WEBPACK_IMPORTED_MODULE_3__.AssetContext);
    const { isLoading } = (0,_Pimcore_modules_asset_hooks_use_asset_draft__WEBPACK_IMPORTED_MODULE_9__.useAssetDraft)(id);
    const sidebarEntries = _Pimcore_modules_asset_editor_types_video_tab_manager_tabs_preview_sidebar__WEBPACK_IMPORTED_MODULE_5__.sidebarManager.getEntries();
    const sidebarButtons = _Pimcore_modules_asset_editor_types_video_tab_manager_tabs_preview_sidebar__WEBPACK_IMPORTED_MODULE_5__.sidebarManager.getButtons();
    const contextValue = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>({
            thumbnail,
            setThumbnail,
            playerPosition,
            setPlayerPosition
        }), [
        thumbnail,
        playerPosition
    ]);
    const setUrlByThumbnail = (name)=>{
        setUrl('');
        const url = `${(0,_Pimcore_app_api_pimcore_route__WEBPACK_IMPORTED_MODULE_8__.getPrefix)()}/assets/${id}/video/stream/${name}`;
        (0,_Pimcore_utils_polling_helper__WEBPACK_IMPORTED_MODULE_10__.fetchBlobWithPolling)({
            url,
            onSuccess: (blob)=>{
                const objectUrl = URL.createObjectURL(blob);
                setUrl(objectUrl);
            }
        }).catch(console.error);
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (isLoading) {
            return;
        }
        setUrlByThumbnail(thumbnail);
    }, [
        thumbnail,
        isLoading
    ]);
    if (isLoading) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_7__.Content, {
            loading: true
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/preview-container.tsx",
            lineNumber: 82,
            columnNumber: 12
        }, undefined);
    }
    const poster = `${(0,_Pimcore_app_api_pimcore_route__WEBPACK_IMPORTED_MODULE_8__.getPrefix)()}/assets/${id}/video/stream/image-thumbnail?width=500&height=500&aspectRatio=true`;
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(VideoContext.Provider, {
        value: contextValue,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_layout_content_layout__WEBPACK_IMPORTED_MODULE_4__.ContentLayout, {
            renderSidebar: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_sidebar_sidebar__WEBPACK_IMPORTED_MODULE_6__.Sidebar, {
                buttons: sidebarButtons,
                entries: sidebarEntries
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/preview-container.tsx",
                lineNumber: 90,
                columnNumber: 9
            }, void 0),
            children: url === '' ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_7__.Content, {
                loading: true
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/preview-container.tsx",
                lineNumber: 98,
                columnNumber: 13
            }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_preview_view__WEBPACK_IMPORTED_MODULE_2__.PreviewView, {
                poster: poster,
                src: url
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/preview-container.tsx",
                lineNumber: 101,
                columnNumber: 13
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/preview-container.tsx",
            lineNumber: 89,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/preview-container.tsx",
        lineNumber: 88,
        columnNumber: 5
    }, undefined);
};
_s(PreviewContainer, "ED52ma13tviBlIfP2LVbrWFfRHo=", false, function() {
    return [
        _Pimcore_modules_asset_hooks_use_asset_draft__WEBPACK_IMPORTED_MODULE_9__.useAssetDraft
    ];
});
_c = PreviewContainer;

var _c;
$RefreshReg$(_c, "PreviewContainer");

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
"./js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/preview-view.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyle: () => (useStyle)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/antd-style/es/functions/index.js");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
const useStyle = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param)=>{
    let { token, css } = param;
    return {
        preview: css`
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;
      object-fit: contain;

      video {
        display: flex;
        max-height: 70%;
        max-width: 70%;
      }
    `
    };
}, {
    hashPriority: 'low'
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
"./js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/preview-view.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  PreviewView: () => (PreviewView)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _preview_view_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/preview-view.styles.ts");
/* ESM import */var _Pimcore_components_pimcore_video_pimcore_video__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/pimcore-video/pimcore-video.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
var _s = $RefreshSig$();



const PreviewView = (props)=>{
    _s();
    const { styles } = (0,_preview_view_styles__WEBPACK_IMPORTED_MODULE_2__.useStyle)();
    const { src, poster } = props;
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: styles.preview,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_pimcore_video_pimcore_video__WEBPACK_IMPORTED_MODULE_3__.PimcoreVideo, {
            poster: poster,
            sources: [
                {
                    src
                }
            ]
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/preview-view.tsx",
            lineNumber: 29,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/preview-view.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, undefined);
};
_s(PreviewView, "4AcVho8W1Y+Yfard/v4lDs8ZRDQ=", false, function() {
    return [
        _preview_view_styles__WEBPACK_IMPORTED_MODULE_2__.useStyle
    ];
});
_c = PreviewView;

var _c;
$RefreshReg$(_c, "PreviewView");

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
"./js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/index.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  sidebarManager: () => (sidebarManager)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_modules_asset_editor_types_video_tab_manager_tabs_preview_sidebar_sidebar_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/sidebar-manager.ts");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _Pimcore_modules_asset_editor_types_video_tab_manager_tabs_preview_sidebar_tabs_details_details_container__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/details-container.tsx");
/* ESM import */var _Pimcore_modules_asset_editor_types_image_tab_manager_tabs_preview_sidebar_buttons_focal_point__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/asset/editor/types/image/tab-manager/tabs/preview/sidebar/buttons/focal-point.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 





const sidebarManager = new _Pimcore_modules_asset_editor_types_video_tab_manager_tabs_preview_sidebar_sidebar_manager__WEBPACK_IMPORTED_MODULE_1__.VideoEditorSidebarManager();
sidebarManager.registerEntry({
    key: 'details',
    icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_2__.Icon, {
        options: {
            width: '16px',
            height: '16px'
        },
        value: 'details'
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/index.tsx",
        lineNumber: 30,
        columnNumber: 9
    }, undefined),
    component: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_asset_editor_types_video_tab_manager_tabs_preview_sidebar_tabs_details_details_container__WEBPACK_IMPORTED_MODULE_4__.DetailContainer, {}, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/index.tsx",
        lineNumber: 34,
        columnNumber: 14
    }, undefined)
});
sidebarManager.registerButton({
    key: 'focal-point',
    icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_2__.Icon, {
        options: {
            width: '16px',
            height: '16px'
        },
        value: 'focal-point'
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/index.tsx",
        lineNumber: 39,
        columnNumber: 9
    }, undefined),
    component: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_asset_editor_types_image_tab_manager_tabs_preview_sidebar_buttons_focal_point__WEBPACK_IMPORTED_MODULE_5__.FocalPointSidebarButton, {}, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/index.tsx",
        lineNumber: 43,
        columnNumber: 14
    }, undefined)
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
"./js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/sidebar-manager.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  VideoEditorSidebarManager: () => (VideoEditorSidebarManager)
});
/* ESM import */var _Pimcore_modules_element_sidebar_sidebar_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/element/sidebar/sidebar-manager.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
class VideoEditorSidebarManager extends _Pimcore_modules_element_sidebar_sidebar_manager__WEBPACK_IMPORTED_MODULE_0__.SidebarManager {
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
"./js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/details-container.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DetailContainer: () => (DetailContainer)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/asset/asset-api-slice-enhanced.ts");
/* ESM import */var _Pimcore_modules_asset_asset_provider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/asset/asset-provider.tsx");
/* ESM import */var _Pimcore_modules_asset_editor_types_video_tab_manager_tabs_preview_sidebar_tabs_details_details_view__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/details-view.tsx");
/* ESM import */var _Pimcore_modules_asset_editor_types_asset_thumbnails_api_slice_gen__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/asset/editor/types/asset-thumbnails-api-slice.gen.ts");
/* ESM import */var _Pimcore_app_api_pimcore_route__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/app/api/pimcore/route.ts");
/* ESM import */var _Pimcore_utils_files__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/utils/files.ts");
/* ESM import */var _Pimcore_modules_asset_editor_types_video_tab_manager_tabs_preview_preview_container__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/preview-container.tsx");
/* ESM import */var _Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/components/content/content.tsx");
/* ESM import */var _Pimcore_utils_polling_helper__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/utils/polling-helper.ts");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
var _s = $RefreshSig$();











const DetailContainer = ()=>{
    _s();
    const [isDownloading, setIsDownloading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { playerPosition, setThumbnail } = react__WEBPACK_IMPORTED_MODULE_1___default().useContext(_Pimcore_modules_asset_editor_types_video_tab_manager_tabs_preview_preview_container__WEBPACK_IMPORTED_MODULE_8__.VideoContext);
    const assetContext = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_Pimcore_modules_asset_asset_provider__WEBPACK_IMPORTED_MODULE_3__.AssetContext);
    const [imagePreview, setImagePreview] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        setImagePreviewFromBackend(200, 119);
    }, []);
    const { data: assetData } = (0,_Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__.useAssetGetByIdQuery)({
        id: assetContext.id
    });
    const videoData = assetData;
    const { data: thumbnailsData } = (0,_Pimcore_modules_asset_editor_types_asset_thumbnails_api_slice_gen__WEBPACK_IMPORTED_MODULE_5__.useThumbnailVideoGetCollectionQuery)();
    const videoThumbnails = thumbnailsData === null || thumbnailsData === void 0 ? void 0 : thumbnailsData.items;
    if (videoThumbnails === null || videoThumbnails === undefined) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_9__.Content, {
            loading: true
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/details-container.tsx",
            lineNumber: 43,
            columnNumber: 12
        }, undefined);
    }
    const noop = ()=>{};
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_asset_editor_types_video_tab_manager_tabs_preview_sidebar_tabs_details_details_view__WEBPACK_IMPORTED_MODULE_4__.VideoEditorSidebarDetailsTab, {
        height: videoData.height ?? 0,
        imagePreview: imagePreview,
        isDownloading: isDownloading,
        onApplyPlayerPosition: onApplyPlayerPosition,
        onChangeThumbnail: setThumbnail,
        onClickDownloadByFormat: downloadVideoByFormat,
        onDropImage: onDropImage,
        thumbnails: videoThumbnails,
        width: videoData.width ?? 0
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/details-container.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, undefined);
    function setImagePreviewFromBackend(width, height) {
        let then = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : noop;
        const url = `${(0,_Pimcore_app_api_pimcore_route__WEBPACK_IMPORTED_MODULE_6__.getPrefix)()}/assets/${assetContext.id}/video/stream/image-thumbnail?width=${width}&height=${height}&aspectRatio=true`;
        fetch(url).then(async (response)=>await response.blob()).then((blob)=>{
            const url = URL.createObjectURL(blob);
            setImagePreview(url);
        }).catch(()=>{
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_11__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_11__.GeneralError('An error occurred while loading the Thumbnail'));
        }).finally(then);
    }
    function onDropImage(id) {
        let callback = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
        setImagePreviewByToBackend('image_thumbnail_asset', id, callback);
    }
    function onApplyPlayerPosition() {
        let callback = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : noop;
        setImagePreviewByToBackend('image_thumbnail_time', playerPosition, callback);
    }
    function setImagePreviewByToBackend(key, value) {
        let callback = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : noop;
        const url = `${(0,_Pimcore_app_api_pimcore_route__WEBPACK_IMPORTED_MODULE_6__.getPrefix)()}/assets/${assetContext.id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: {
                    customSettings: [
                        {
                            key,
                            value
                        }
                    ]
                }
            })
        }).then(()=>{
            setImagePreviewFromBackend(200, 119, callback);
        }).catch(()=>{
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_11__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_11__.GeneralError('An error occured while setting the Image Preview'));
            callback();
        });
    }
    function downloadVideoByFormat(format) {
        setIsDownloading(true);
        const url = `${(0,_Pimcore_app_api_pimcore_route__WEBPACK_IMPORTED_MODULE_6__.getPrefix)()}/assets/${assetContext.id}/video/download/${format}`;
        (0,_Pimcore_utils_polling_helper__WEBPACK_IMPORTED_MODULE_10__.fetchBlobWithPolling)({
            url,
            onSuccess: (blob)=>{
                const objectUrl = URL.createObjectURL(blob);
                (0,_Pimcore_utils_files__WEBPACK_IMPORTED_MODULE_7__.saveFileLocal)(objectUrl, videoData.filename);
            }
        }).catch(()=>{
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_11__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_11__.GeneralError('An error occured while loading the Video'));
        }).finally(()=>{
            setIsDownloading(false);
        });
    }
};
_s(DetailContainer, "7Su/cVmbCepm/1CgQ5/WnzQKh2E=", false, function() {
    return [
        _Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__.useAssetGetByIdQuery,
        _Pimcore_modules_asset_editor_types_asset_thumbnails_api_slice_gen__WEBPACK_IMPORTED_MODULE_5__.useThumbnailVideoGetCollectionQuery
    ];
});
_c = DetailContainer;

var _c;
$RefreshReg$(_c, "DetailContainer");

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
"./js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/details-view.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  VideoEditorSidebarDetailsTab: () => (VideoEditorSidebarDetailsTab)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _details_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/details.styles.ts");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var antd_es_button_button_group__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./node_modules/antd/es/button/button-group.js");
/* ESM import */var antd_es_card_Meta__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./node_modules/antd/es/card/Meta.js");
/* ESM import */var _Pimcore_components_drag_and_drop_droppable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/drag-and-drop/droppable.tsx");
/* ESM import */var _Pimcore_modules_asset_editor_types_video_tab_manager_tabs_preview_sidebar_tabs_details_droppable_content__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/droppable-content.tsx");
/* ESM import */var _Pimcore_components_toolbar_toolbar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/toolbar/toolbar.tsx");
/* ESM import */var _Pimcore_components_pimcore_image_pimcore_image__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/components/pimcore-image/pimcore-image.tsx");
/* ESM import */var _Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/components/content/content.tsx");
/* ESM import */var _Pimcore_components_header_header__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/components/header/header.tsx");
/* ESM import */var _Pimcore_components_select_select__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/components/select/select.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
var _s = $RefreshSig$();














const VideoEditorSidebarDetailsTab = (param)=>{
    let { width, height, thumbnails, imagePreview, onApplyPlayerPosition, onChangeThumbnail, onClickDownloadByFormat, onDropImage, isDownloading } = param;
    _s();
    const { styles } = (0,_details_styles__WEBPACK_IMPORTED_MODULE_2__.useStyle)();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_5__.useTranslation)();
    const [imageSource, setImageSource] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('media');
    const [customMode, setCustomMode] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('pimcore-system-treepreview');
    const [applyLoading, setApplyLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [dropAssetLoading, setDropAssetLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [downloadFormat, setDownloadFormat] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('pimcore-system-treepreview');
    const modes = thumbnails.map((thumbnail)=>{
        return {
            value: thumbnail.id,
            label: thumbnail.text
        };
    });
    const downloadFormats = modes;
    let cardContent;
    if (imageSource === 'media') {
        cardContent = /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                dropAssetLoading ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_10__.Content, {
                    loading: true
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/details-view.tsx",
                    lineNumber: 79,
                    columnNumber: 13
                }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_drag_and_drop_droppable__WEBPACK_IMPORTED_MODULE_6__.Droppable, {
                    isValidContext: (info)=>info.type === 'asset',
                    onDrop: onDropAsset,
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_asset_editor_types_video_tab_manager_tabs_preview_sidebar_tabs_details_droppable_content__WEBPACK_IMPORTED_MODULE_7__.DroppableContent, {
                        imgSrc: imagePreview
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/details-view.tsx",
                        lineNumber: 86,
                        columnNumber: 15
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/details-view.tsx",
                    lineNumber: 82,
                    columnNumber: 13
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd_es_card_Meta__WEBPACK_IMPORTED_MODULE_13__["default"], {
                    title: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_toolbar_toolbar__WEBPACK_IMPORTED_MODULE_8__.Toolbar, {
                        theme: 'secondary',
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {}, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/details-view.tsx",
                            lineNumber: 93,
                            columnNumber: 15
                        }, void 0)
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/details-view.tsx",
                        lineNumber: 92,
                        columnNumber: 13
                    }, void 0)
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/details-view.tsx",
                    lineNumber: 90,
                    columnNumber: 9
                }, undefined)
            ]
        }, void 0, true);
    } else {
        cardContent = /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                    className: 'image-preview-container',
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_pimcore_image_pimcore_image__WEBPACK_IMPORTED_MODULE_9__.PimcoreImage, {
                        src: imagePreview
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/details-view.tsx",
                        lineNumber: 103,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/details-view.tsx",
                    lineNumber: 102,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd_es_card_Meta__WEBPACK_IMPORTED_MODULE_13__["default"], {
                    title: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_toolbar_toolbar__WEBPACK_IMPORTED_MODULE_8__.Toolbar, {
                        justify: 'flex-end',
                        theme: 'secondary',
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.Button, {
                            loading: applyLoading,
                            onClick: onClickApply,
                            children: t('apply')
                        }, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/details-view.tsx",
                            lineNumber: 113,
                            columnNumber: 15
                        }, void 0)
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/details-view.tsx",
                        lineNumber: 109,
                        columnNumber: 13
                    }, void 0)
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/details-view.tsx",
                    lineNumber: 107,
                    columnNumber: 9
                }, undefined)
            ]
        }, void 0, true);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_10__.Content, {
        className: styles.sidebarContentEntry,
        padded: true,
        padding: {
            top: 'none',
            x: 'small',
            bottom: 'mini'
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_header_header__WEBPACK_IMPORTED_MODULE_11__.Header, {
                title: t('asset.sidebar.details')
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/details-view.tsx",
                lineNumber: 130,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                className: 'sidebar__content-entry-content',
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                        className: styles.sidebarContentDimensions,
                        children: [
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                className: 'entry-content__dimensions-label',
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
                                        children: t('width')
                                    }, void 0, false, {
                                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/details-view.tsx",
                                        lineNumber: 135,
                                        columnNumber: 13
                                    }, undefined),
                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
                                        children: t('height')
                                    }, void 0, false, {
                                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/details-view.tsx",
                                        lineNumber: 136,
                                        columnNumber: 13
                                    }, undefined)
                                ]
                            }, void 0, true, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/details-view.tsx",
                                lineNumber: 134,
                                columnNumber: 11
                            }, undefined),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                className: 'entry-content__dimensions-content',
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
                                        children: [
                                            width,
                                            " px"
                                        ]
                                    }, void 0, true, {
                                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/details-view.tsx",
                                        lineNumber: 139,
                                        columnNumber: 13
                                    }, undefined),
                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
                                        children: [
                                            height,
                                            " px"
                                        ]
                                    }, void 0, true, {
                                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/details-view.tsx",
                                        lineNumber: 140,
                                        columnNumber: 13
                                    }, undefined)
                                ]
                            }, void 0, true, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/details-view.tsx",
                                lineNumber: 138,
                                columnNumber: 11
                            }, undefined)
                        ]
                    }, void 0, true, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/details-view.tsx",
                        lineNumber: 133,
                        columnNumber: 9
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                        className: styles.sidebarContentDownload,
                        children: [
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
                                className: 'sidebar__content-label',
                                children: t('thumbnail')
                            }, void 0, false, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/details-view.tsx",
                                lineNumber: 145,
                                columnNumber: 11
                            }, undefined),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                className: 'entry-content__download-content',
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                        className: 'entry-content__download-content-thumbnail',
                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_select_select__WEBPACK_IMPORTED_MODULE_12__.Select, {
                                            "aria-label": t('aria.asset.image-sidebar.tab.details.custom-thumbnail-mode'),
                                            defaultValue: customMode,
                                            onChange: onChangeMode,
                                            options: modes
                                        }, void 0, false, {
                                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/details-view.tsx",
                                            lineNumber: 149,
                                            columnNumber: 15
                                        }, undefined)
                                    }, void 0, false, {
                                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/details-view.tsx",
                                        lineNumber: 148,
                                        columnNumber: 13
                                    }, undefined),
                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
                                        className: 'sidebar__content-label',
                                        children: t('download')
                                    }, void 0, false, {
                                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/details-view.tsx",
                                        lineNumber: 157,
                                        columnNumber: 13
                                    }, undefined),
                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                        className: 'entry-content__download-content-thumbnail',
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_select_select__WEBPACK_IMPORTED_MODULE_12__.Select, {
                                                "aria-label": t('aria.asset.image-sidebar.tab.details.custom-thumbnail-mode'),
                                                defaultValue: downloadFormat,
                                                onChange: (format)=>{
                                                    setDownloadFormat(format);
                                                },
                                                options: downloadFormats
                                            }, void 0, false, {
                                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/details-view.tsx",
                                                lineNumber: 160,
                                                columnNumber: 15
                                            }, undefined),
                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.Button, {
                                                "aria-label": t('aria.asset.image-sidebar.tab.details.download-thumbnail'),
                                                icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_4__.Icon, {
                                                    value: 'download'
                                                }, void 0, false, {
                                                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/details-view.tsx",
                                                    lineNumber: 169,
                                                    columnNumber: 24
                                                }, void 0),
                                                loading: isDownloading,
                                                onClick: onClickDownload
                                            }, void 0, false, {
                                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/details-view.tsx",
                                                lineNumber: 167,
                                                columnNumber: 15
                                            }, undefined)
                                        ]
                                    }, void 0, true, {
                                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/details-view.tsx",
                                        lineNumber: 159,
                                        columnNumber: 13
                                    }, undefined)
                                ]
                            }, void 0, true, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/details-view.tsx",
                                lineNumber: 147,
                                columnNumber: 11
                            }, undefined)
                        ]
                    }, void 0, true, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/details-view.tsx",
                        lineNumber: 144,
                        columnNumber: 9
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.Divider, {
                        className: 'sidebar__content-hr'
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/details-view.tsx",
                        lineNumber: 176,
                        columnNumber: 9
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                        className: styles.sidebarContentImagePreview,
                        children: [
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
                                className: 'sidebar__content-label',
                                children: t('select-image-preview')
                            }, void 0, false, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/details-view.tsx",
                                lineNumber: 178,
                                columnNumber: 11
                            }, undefined),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd_es_button_button_group__WEBPACK_IMPORTED_MODULE_14__["default"], {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.Button, {
                                        onClick: onClickChooseMedia,
                                        type: imageSource === 'media' ? 'primary' : 'default',
                                        children: t('choose-media')
                                    }, void 0, false, {
                                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/details-view.tsx",
                                        lineNumber: 180,
                                        columnNumber: 13
                                    }, undefined),
                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.Button, {
                                        onClick: onClickCurrentPlayerPosition,
                                        type: imageSource === 'player' ? 'primary' : 'default',
                                        children: t('current-player-position')
                                    }, void 0, false, {
                                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/details-view.tsx",
                                        lineNumber: 186,
                                        columnNumber: 13
                                    }, undefined)
                                ]
                            }, void 0, true, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/details-view.tsx",
                                lineNumber: 179,
                                columnNumber: 11
                            }, undefined),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.Card, {
                                size: 'small',
                                children: cardContent
                            }, void 0, false, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/details-view.tsx",
                                lineNumber: 193,
                                columnNumber: 11
                            }, undefined)
                        ]
                    }, void 0, true, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/details-view.tsx",
                        lineNumber: 177,
                        columnNumber: 9
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/details-view.tsx",
                lineNumber: 132,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/details-view.tsx",
        lineNumber: 125,
        columnNumber: 5
    }, undefined);
    function onChangeMode(mode) {
        setCustomMode(mode);
        onChangeThumbnail(mode);
    }
    function onClickDownload() {
        onClickDownloadByFormat(downloadFormat);
    }
    function onClickCurrentPlayerPosition() {
        setImageSource('player');
    }
    function onClickChooseMedia() {
        setImageSource('media');
    }
    function onDropAsset(e) {
        setDropAssetLoading(true);
        onDropImage(e.data.id, ()=>{
            setDropAssetLoading(false);
        });
    }
    function onClickApply() {
        setApplyLoading(true);
        onApplyPlayerPosition(()=>{
            setApplyLoading(false);
        });
    }
};
_s(VideoEditorSidebarDetailsTab, "3H4CNlSLXG4xz1Qk/7kNTDHblHI=", false, function() {
    return [
        _details_styles__WEBPACK_IMPORTED_MODULE_2__.useStyle,
        react_i18next__WEBPACK_IMPORTED_MODULE_5__.useTranslation
    ];
});
_c = VideoEditorSidebarDetailsTab;
var _c;
$RefreshReg$(_c, "VideoEditorSidebarDetailsTab");

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
"./js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/details.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyle: () => (useStyle)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/antd-style/es/functions/index.js");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
const useStyle = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param)=>{
    let { token, css } = param;
    return {
        sidebarContentEntry: css`
            .sidebar__content-label {
                color: ${token.colorPrimaryActive};
                line-height: 20px;
                font-weight: 600;
                margin: 0;
                padding-bottom: ${token.paddingXS}px;
                
                &:not(:first-of-type) {
                    padding-top: ${token.paddingXS}px;
                }
            }
            .sidebar__content-hr {
              position: absolute;
              left: 0;
              right: 0;
              border-color: ${token.colorSplit};
              margin: 0;
            }
        `,
        sidebarContentDimensions: css`
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            align-self: stretch;
            
            .entry-content__dimensions-label {
                display: flex;
                padding-bottom: ${token.paddingXXS};
                gap: ${token.marginMD}px;
                align-items: center;
                gap: ${token.marginXXS};
                align-self: stretch;

                p {
                    margin: 0
                }
            }

            .entry-content__dimensions-content {
                color: ${token.colorTextDescription};
                display: flex;
                padding-bottom: ${token.paddingXXS};
                gap: ${token.marginMD}px;
                align-items: center;
                gap: ${token.marginXXS};
                align-self: stretch;

                p {
                    margin: 0;
                    line-height: 22px;
                }
            }
        `,
        sidebarContentDownload: css`
            .entry-content__download-content-thumbnail {
                display: flex;
                align-items: center;
                gap: ${token.paddingXXS}px;
                padding-bottom: ${token.paddingSM}px;
                
                .ant-select {
                    flex: 1
                }
            }
            
            .entry-content__download-content-custom {
                .ant-form-item {
                    margin-bottom: 0;
                }
                
                .entry-content__download-content-custom__dimensions {
                    display: flex;
                    gap: ${token.marginSM}px;
                    padding-bottom: ${token.paddingSM}px;
                }
                
                .entry-content__download-content-custom__others {
                    display: flex;
                    gap: ${token.paddingXS}px;
                    flex-direction: column;
                    padding-bottom: ${token.paddingSM}px;
                    
                    > div {
                        display: flex;
                        gap: ${token.marginSM}px;
                        
                        >.ant-form-item {
                            flex: 1
                        }
                    }
                }
                
                .entry-content__download-content-custom__button {
                    padding: ${token.paddingXS}px 0;
                }
            }
        `,
        sidebarContentImagePreview: css`
      & > .sidebar__content-label {
        margin-top: ${token.marginXS}px;
      }
      
      .ant-btn-group {
        button {
          padding: 0 4px;
          height: 24px;
          border-radius: unset;
        }
        button:nth-child(1)  {
          border-top-left-radius: 6px;
          border-bottom-left-radius: 6px;
        }
        button:nth-child(2)  {
          border-top-right-radius: 6px;
          border-bottom-right-radius: 6px;
        }
      }

      .ant-card {
        height: 208px;
      }
      
      .ant-card, .ant-card-meta-title {
        margin-top: ${token.marginSM}px;
      }
      
      .image-preview-container {
        height: 129px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        
        div {
          display: flex;
          gap: ${token.marginXXS}px;
        }
        
        span {
          margin-top: ${token.marginSM}px;
        }
      }

      .image-preview__toolbar {
        position: absolute;
        left: 0;
        right: 0;
        background: none;
        margin-top: ${token.marginXS}px
      }
    `
    };
}, {
    hashPriority: 'low'
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
"./js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/droppable-content.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DroppableContent: () => (DroppableContent)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_drag_and_drop_hooks_use_droppable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/drag-and-drop/hooks/use-droppable.tsx");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_components_pimcore_image_pimcore_image__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/pimcore-image/pimcore-image.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
var _s = $RefreshSig$();





const DroppableContent = /*#__PURE__*/ _s((0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(_c = _s(function DNDDemoDroppableContent(props, ref) {
    _s();
    const { getStateClasses } = (0,_Pimcore_components_drag_and_drop_hooks_use_droppable__WEBPACK_IMPORTED_MODULE_2__.useDroppable)();
    const options = {
        width: '21px',
        height: '21px'
    };
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation)();
    let content = /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__.Icon, {
                        options: options,
                        value: 'new'
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/droppable-content.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__.Icon, {
                        options: options,
                        value: 'drop-target'
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/droppable-content.tsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/droppable-content.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                children: t('drag-and-drop-asset')
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/droppable-content.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
    if (props.imgSrc !== '') {
        content = /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_pimcore_image_pimcore_image__WEBPACK_IMPORTED_MODULE_5__.PimcoreImage, {
            src: props.imgSrc
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/droppable-content.tsx",
            lineNumber: 47,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: [
            'image-preview-container',
            ...getStateClasses()
        ].join(' '),
        ref: ref,
        children: content
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/droppable-content.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}, "xmlUTlpbl/mVSdgwiF+c/0OChG4=", false, function() {
    return [
        _Pimcore_components_drag_and_drop_hooks_use_droppable__WEBPACK_IMPORTED_MODULE_2__.useDroppable,
        react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation
    ];
})), "xmlUTlpbl/mVSdgwiF+c/0OChG4=", false, function() {
    return [
        _Pimcore_components_drag_and_drop_hooks_use_droppable__WEBPACK_IMPORTED_MODULE_2__.useDroppable,
        react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation
    ];
});
_c1 = DroppableContent;
var _c, _c1;
$RefreshReg$(_c, "DroppableContent$forwardRef");
$RefreshReg$(_c1, "DroppableContent");

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
"./js/src/core/modules/auth/authorization-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useLoginMutation: () => (useLoginMutation),
  useLogoutMutation: () => (useLogoutMutation)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Authorization"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            login: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/login`,
                        method: "POST",
                        body: queryArg.credentials
                    }),
                invalidatesTags: [
                    "Authorization"
                ]
            }),
            logout: build.mutation({
                query: ()=>({
                        url: `/pimcore-studio/api/logout`,
                        method: "POST"
                    }),
                invalidatesTags: [
                    "Authorization"
                ]
            })
        }),
    overrideExisting: false
});

const { useLoginMutation, useLogoutMutation } = injectedRtkApi;

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
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
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
"./js/src/core/modules/auth/login-page.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyle: () => (useStyle)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/antd-style/es/functions/index.js");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
const useStyle = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param)=>{
    let { token, css } = param;
    return {
        loginPage: css`
      display: flex;
      align-items: center;
      background: url(/bundles/pimcorestudioui/img/login-bg.png) lightgray 50% / cover no-repeat;
      position: absolute;
      inset: 0;
      overflow: hidden;
    `,
        loginWidget: css`
      display: flex;
      flex-direction: column;
      width: 503px;
      height: 608px;
      flex-shrink: 0;
      border-radius: 8px;
      background: linear-gradient(335deg, rgba(255, 255, 255, 0.86) 1.72%, rgba(57, 14, 97, 0.86) 158.36%);
      padding: 83px 100px 0 100px;
      margin-left: 80px;
      
      /* Component/Button/primaryShadow */
      box-shadow: 0px 2px 0px 0px rgba(114, 46, 209, 0.10);
      
      img {
        margin-bottom: 50px
      }
    `
    };
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
"./js/src/core/modules/auth/login-page.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  LoginPage: () => (LoginPage)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_app_router_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/app/router/router.tsx");
/* ESM import */var _Pimcore_components_login_form_login_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/login-form/login-form.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/react-router/dist/index.js");
/* ESM import */var _hooks_use_is_authenticated__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/auth/hooks/use-is-authenticated.ts");
/* ESM import */var _login_page_styles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/auth/login-page.styles.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
var _s = $RefreshSig$();






const LoginPage = ()=>{
    _s();
    const { styles } = (0,_login_page_styles__WEBPACK_IMPORTED_MODULE_5__.useStyle)();
    const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_6__.useNavigate)();
    const location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_6__.useLocation)();
    const isAuthenticated = (0,_hooks_use_is_authenticated__WEBPACK_IMPORTED_MODULE_4__.useIsAuthenticated)();
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        if (isAuthenticated) {
            var _location_state_from, _location_state;
            const redirectPath = location === null || location === void 0 ? void 0 : (_location_state = location.state) === null || _location_state === void 0 ? void 0 : (_location_state_from = _location_state.from) === null || _location_state_from === void 0 ? void 0 : _location_state_from.pathname;
            navigate(redirectPath ?? _Pimcore_app_router_router__WEBPACK_IMPORTED_MODULE_1__.routes.root);
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
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/auth/login-page.tsx",
                    lineNumber: 38,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_login_form_login_form__WEBPACK_IMPORTED_MODULE_2__.LoginForm, {}, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/auth/login-page.tsx",
                    lineNumber: 42,
                    columnNumber: 9
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/auth/login-page.tsx",
            lineNumber: 37,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/auth/login-page.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, undefined);
};
_s(LoginPage, "rKue5aOBN+mH13CdUCnx+DHukDU=", false, function() {
    return [
        _login_page_styles__WEBPACK_IMPORTED_MODULE_5__.useStyle,
        react_router_dom__WEBPACK_IMPORTED_MODULE_6__.useNavigate,
        react_router_dom__WEBPACK_IMPORTED_MODULE_6__.useLocation,
        _hooks_use_is_authenticated__WEBPACK_IMPORTED_MODULE_4__.useIsAuthenticated
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
"./js/src/core/modules/auth/permission-helper.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  isAllowed: () => (isAllowed)
});
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _Pimcore_modules_auth_user_user_slice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/auth/user/user-slice.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 

const isAllowed = (permission)=>{
    const state = _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.store.getState();
    const user = (0,_Pimcore_modules_auth_user_user_slice__WEBPACK_IMPORTED_MODULE_1__.selectCurrentUser)(state);
    if (user.isAdmin) {
        return true;
    }
    return permission !== undefined && user.permissions.includes(permission);
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
"./js/src/core/modules/element/sidebar/sidebar-manager.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SidebarManager: () => (SidebarManager)
});
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ class SidebarManager {
    getEntries() {
        return this.entries;
    }
    getEntry(key) {
        return this.entries.find((entry)=>entry.key === key);
    }
    registerEntry(entry) {
        if (this.getEntry(entry.key) !== undefined) {
            this.entries.splice(this.entries.findIndex((e)=>e.key === entry.key), 1, entry);
            return;
        }
        this.entries.push(entry);
    }
    getButtons() {
        return this.buttons;
    }
    getButton(key) {
        return this.buttons.find((button)=>button.key === key);
    }
    registerButton(button) {
        if (this.getButton(button.key) !== undefined) {
            this.buttons.splice(this.buttons.findIndex((e)=>e.key === button.key), 1, button);
            return;
        }
        this.buttons.push(button);
    }
    constructor(){
        this.entries = [];
        this.buttons = [];
    }
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
"./js/src/core/modules/execution-engine/jobs/default/notification-job-container.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  NotificationJobContainer: () => (NotificationJobContainer)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _jobs_abstact_job__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/execution-engine/jobs/abstact-job.ts");
/* ESM import */var _Pimcore_utils_hooks_use_server_side_event__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/utils/hooks/use-server-side-event.ts");
/* ESM import */var _hooks_useJobs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/execution-engine/hooks/useJobs.ts");
/* ESM import */var _notification_job_job_view__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/execution-engine/notification/job/job-view.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
var _s = $RefreshSig$();






const NotificationJobContainer = (props)=>{
    _s();
    const { id, topics, status, action } = props;
    const { open: openSEEvent, close: closeSEEvent } = (0,_Pimcore_utils_hooks_use_server_side_event__WEBPACK_IMPORTED_MODULE_3__.useServerSideEvent)({
        topics,
        messageHandler,
        openHandler
    });
    const [progress, setProgress] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const { updateJob, removeJob } = (0,_hooks_useJobs__WEBPACK_IMPORTED_MODULE_4__.useJobs)();
    const jobId = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_6__.useTranslation)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (_jobs_abstact_job__WEBPACK_IMPORTED_MODULE_2__.JobStatus.QUEUED === status) {
            updateJob(id, {
                status: _jobs_abstact_job__WEBPACK_IMPORTED_MODULE_2__.JobStatus.RUNNING
            });
            openSEEvent();
        }
    }, []);
    function openHandler() {
        action().then((actionJobId)=>{
            jobId.current = actionJobId;
        }).catch(console.error);
    }
    const handleFailureButtonHandler = ()=>{
        updateJob(id, {
            status: _jobs_abstact_job__WEBPACK_IMPORTED_MODULE_2__.JobStatus.QUEUED
        });
        openSEEvent();
    };
    const handleJobStatusUpdate = (data)=>{
        if (data.status === 'finished') {
            updateJob(id, {
                status: _jobs_abstact_job__WEBPACK_IMPORTED_MODULE_2__.JobStatus.SUCCESS
            });
            closeSEEvent();
        }
        if (data.status === 'failed') {
            updateJob(id, {
                status: _jobs_abstact_job__WEBPACK_IMPORTED_MODULE_2__.JobStatus.FAILED
            });
            closeSEEvent();
        }
    };
    function messageHandler(event) {
        const data = JSON.parse(event.data);
        if (data.jobRunId !== jobId.current) {
            return;
        }
        if (data.progress !== undefined) {
            setProgress(data.progress);
        }
        if (data.status !== undefined) {
            handleJobStatusUpdate(data);
        }
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_notification_job_job_view__WEBPACK_IMPORTED_MODULE_5__.JobView, {
        failureButtonActions: [
            {
                label: t('jobs.job.button-retry'),
                handler: handleFailureButtonHandler
            },
            {
                label: t('jobs.job.button-hide'),
                handler: ()=>{
                    removeJob(id);
                }
            }
        ],
        successButtonActions: [
            {
                label: t('jobs.job.button-hide'),
                handler: ()=>{
                    removeJob(id);
                }
            }
        ],
        ...props,
        progress: progress
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/execution-engine/jobs/default/notification-job-container.tsx",
        lineNumber: 89,
        columnNumber: 5
    }, undefined);
};
_s(NotificationJobContainer, "x+fcCQW9p03z3sJujq+Q1p9JcNM=", false, function() {
    return [
        _Pimcore_utils_hooks_use_server_side_event__WEBPACK_IMPORTED_MODULE_3__.useServerSideEvent,
        _hooks_useJobs__WEBPACK_IMPORTED_MODULE_4__.useJobs,
        react_i18next__WEBPACK_IMPORTED_MODULE_6__.useTranslation
    ];
});
_c = NotificationJobContainer;
var _c;
$RefreshReg$(_c, "NotificationJobContainer");

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
"./js/src/core/modules/execution-engine/notification/job-list/job-list.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyles: () => (useStyles)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/antd-style/es/functions/index.js");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
const useStyles = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param)=>{
    let { css, token } = param;
    return {
        jobList: css`
      &.ant-collapse>.ant-collapse-item >.ant-collapse-header {
        padding: ${token.paddingXXS}px 0;
      }

      &.ant-collapse-ghost >.ant-collapse-item >.ant-collapse-content >.ant-collapse-content-box {
        padding: ${token.paddingXXS}px 0;
      }
    `
    };
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
"./js/src/core/modules/execution-engine/notification/job-list/job-list.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  JobList: () => (JobList)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _job_job__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/execution-engine/notification/job/job.tsx");
/* ESM import */var framer_motion__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs");
/* ESM import */var framer_motion__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs");
/* ESM import */var _job_list_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/execution-engine/notification/job-list/job-list.styles.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_modules_execution_engine_hooks_useJobs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/execution-engine/hooks/useJobs.ts");
/* ESM import */var _Pimcore_components_collapse_collapse__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/collapse/collapse.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 

var _s = $RefreshSig$();







const JobList = ()=>{
    _s();
    const { jobs } = (0,_Pimcore_modules_execution_engine_hooks_useJobs__WEBPACK_IMPORTED_MODULE_5__.useJobs)();
    const { styles } = (0,_job_list_styles__WEBPACK_IMPORTED_MODULE_3__.useStyles)();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation)();
    const collapseDisabled = {
        disabled: true
    };
    const item = {
        key: '1',
        label: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
            children: t('jobs.notification.jobs', {
                count: jobs.length
            })
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/execution-engine/notification/job-list/job-list.tsx",
            lineNumber: 31,
            columnNumber: 12
        }, undefined),
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(framer_motion__WEBPACK_IMPORTED_MODULE_7__.AnimatePresence, {
            children: jobs.map((job)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(framer_motion__WEBPACK_IMPORTED_MODULE_8__.motion.div, {
                    animate: {
                        opacity: 1,
                        height: 'auto'
                    },
                    exit: {
                        opacity: 0,
                        height: 1
                    },
                    initial: {
                        opacity: 0,
                        height: 1
                    },
                    children: /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_job_job__WEBPACK_IMPORTED_MODULE_2__.Job, {
                        ...job,
                        key: job.id,
                        __source: {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/execution-engine/notification/job-list/job-list.tsx",
                            lineNumber: 41,
                            columnNumber: 9
                        },
                        __self: undefined
                    })
                }, `${job.id}`, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/execution-engine/notification/job-list/job-list.tsx",
                    lineNumber: 35,
                    columnNumber: 7
                }, undefined))
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/execution-engine/notification/job-list/job-list.tsx",
            lineNumber: 33,
            columnNumber: 3
        }, undefined),
        ...jobs.length === 0 && collapseDisabled
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_collapse_collapse__WEBPACK_IMPORTED_MODULE_6__.Collapse, {
        bordered: false,
        className: styles.jobList,
        defaultActiveKeys: [
            item.key
        ],
        hasContentSeparator: false,
        items: [
            item
        ]
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/execution-engine/notification/job-list/job-list.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, undefined);
};
_s(JobList, "LOQ1kABmzS39D47MrgI0XsDClao=", false, function() {
    return [
        _Pimcore_modules_execution_engine_hooks_useJobs__WEBPACK_IMPORTED_MODULE_5__.useJobs,
        _job_list_styles__WEBPACK_IMPORTED_MODULE_3__.useStyles,
        react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation
    ];
});
_c = JobList;
var _c;
$RefreshReg$(_c, "JobList");

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
"./js/src/core/modules/execution-engine/notification/job/job-view.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyles: () => (useStyles)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/antd-style/es/functions/index.js");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
const useStyles = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param)=>{
    let { css } = param;
    return {
        buttonStyle: css`
      padding-left: 2px;
      padding-right: 2px;
      text-transform: capitalize;
    `
    };
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
"./js/src/core/modules/execution-engine/notification/job/job-view.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  JobView: () => (JobView)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_components_progressbar_progressbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/progressbar/progressbar.tsx");
/* ESM import */var _jobs_abstact_job__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/execution-engine/jobs/abstact-job.ts");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var framer_motion__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs");
/* ESM import */var framer_motion__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs");
/* ESM import */var _job_view_styles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/execution-engine/notification/job/job-view.styles.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
var _s = $RefreshSig$();








const JobView = (props)=>{
    var _props_successButtonActions, _props_finishedWithErrorsButtonActions, _props_failureButtonActions;
    _s();
    const { styles } = (0,_job_view_styles__WEBPACK_IMPORTED_MODULE_6__.useStyles)();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_7__.useTranslation)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(framer_motion__WEBPACK_IMPORTED_MODULE_8__.AnimatePresence, {
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(framer_motion__WEBPACK_IMPORTED_MODULE_9__.motion.div, {
                animate: {
                    opacity: 1,
                    height: 'auto'
                },
                exit: {
                    opacity: 0,
                    height: 1
                },
                initial: {
                    opacity: 0,
                    height: 1
                },
                children: [
                    props.status === _jobs_abstact_job__WEBPACK_IMPORTED_MODULE_2__.JobStatus.RUNNING && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_progressbar_progressbar__WEBPACK_IMPORTED_MODULE_1__.Progressbar, {
                        description: t('jobs.job.in-progress', {
                            title: props.title
                        }),
                        percent: props.progress,
                        progressStatus: t('jobs.job.progress', {
                            progress: props.progress
                        })
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/execution-engine/notification/job/job-view.tsx",
                        lineNumber: 50,
                        columnNumber: 13
                    }, undefined),
                    props.status === _jobs_abstact_job__WEBPACK_IMPORTED_MODULE_2__.JobStatus.SUCCESS && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_4__.Flex, {
                        align: "center",
                        justify: "space-between",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_4__.Flex, {
                                align: "center",
                                gap: 'small',
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_5__.Icon, {
                                        value: "check-circle"
                                    }, void 0, false, {
                                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/execution-engine/notification/job/job-view.tsx",
                                        lineNumber: 67,
                                        columnNumber: 17
                                    }, undefined),
                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                                        children: t('jobs.job.finished', {
                                            title: props.title
                                        })
                                    }, void 0, false, {
                                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/execution-engine/notification/job/job-view.tsx",
                                        lineNumber: 67,
                                        columnNumber: 46
                                    }, undefined)
                                ]
                            }, void 0, true, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/execution-engine/notification/job/job-view.tsx",
                                lineNumber: 63,
                                columnNumber: 15
                            }, undefined),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_4__.Flex, {
                                gap: 'small',
                                children: (_props_successButtonActions = props.successButtonActions) === null || _props_successButtonActions === void 0 ? void 0 : _props_successButtonActions.map((action, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_4__.Button, {
                                        className: styles.buttonStyle,
                                        onClick: action.handler,
                                        type: "link",
                                        children: action.label
                                    }, index, false, {
                                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/execution-engine/notification/job/job-view.tsx",
                                        lineNumber: 72,
                                        columnNumber: 19
                                    }, undefined))
                            }, void 0, false, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/execution-engine/notification/job/job-view.tsx",
                                lineNumber: 69,
                                columnNumber: 15
                            }, undefined)
                        ]
                    }, void 0, true, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/execution-engine/notification/job/job-view.tsx",
                        lineNumber: 59,
                        columnNumber: 13
                    }, undefined),
                    props.status === _jobs_abstact_job__WEBPACK_IMPORTED_MODULE_2__.JobStatus.FINISHED_WITH_ERRORS && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_4__.Flex, {
                        align: "center",
                        justify: "space-between",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_4__.Flex, {
                                align: "center",
                                gap: 'small',
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_5__.Icon, {
                                        value: "warning-circle"
                                    }, void 0, false, {
                                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/execution-engine/notification/job/job-view.tsx",
                                        lineNumber: 92,
                                        columnNumber: 17
                                    }, undefined),
                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                                        children: t('jobs.job.finished-with-errors', {
                                            title: props.title
                                        })
                                    }, void 0, false, {
                                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/execution-engine/notification/job/job-view.tsx",
                                        lineNumber: 92,
                                        columnNumber: 48
                                    }, undefined)
                                ]
                            }, void 0, true, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/execution-engine/notification/job/job-view.tsx",
                                lineNumber: 88,
                                columnNumber: 15
                            }, undefined),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_4__.Flex, {
                                gap: 'small',
                                children: (_props_finishedWithErrorsButtonActions = props.finishedWithErrorsButtonActions) === null || _props_finishedWithErrorsButtonActions === void 0 ? void 0 : _props_finishedWithErrorsButtonActions.map((action, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_4__.Button, {
                                        className: styles.buttonStyle,
                                        onClick: action.handler,
                                        type: "link",
                                        children: action.label
                                    }, index, false, {
                                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/execution-engine/notification/job/job-view.tsx",
                                        lineNumber: 97,
                                        columnNumber: 19
                                    }, undefined))
                            }, void 0, false, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/execution-engine/notification/job/job-view.tsx",
                                lineNumber: 94,
                                columnNumber: 15
                            }, undefined)
                        ]
                    }, void 0, true, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/execution-engine/notification/job/job-view.tsx",
                        lineNumber: 84,
                        columnNumber: 13
                    }, undefined),
                    props.status === _jobs_abstact_job__WEBPACK_IMPORTED_MODULE_2__.JobStatus.FAILED && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_4__.Flex, {
                        align: "center",
                        justify: "space-between",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_4__.Flex, {
                                align: "center",
                                gap: 'small',
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_5__.Icon, {
                                        value: "x-circle"
                                    }, void 0, false, {
                                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/execution-engine/notification/job/job-view.tsx",
                                        lineNumber: 117,
                                        columnNumber: 17
                                    }, undefined),
                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                                        children: t('jobs.job.failed', {
                                            title: props.title
                                        })
                                    }, void 0, false, {
                                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/execution-engine/notification/job/job-view.tsx",
                                        lineNumber: 117,
                                        columnNumber: 42
                                    }, undefined)
                                ]
                            }, void 0, true, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/execution-engine/notification/job/job-view.tsx",
                                lineNumber: 113,
                                columnNumber: 15
                            }, undefined),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_4__.Flex, {
                                gap: 'small',
                                children: (_props_failureButtonActions = props.failureButtonActions) === null || _props_failureButtonActions === void 0 ? void 0 : _props_failureButtonActions.map((action, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_4__.Button, {
                                        className: styles.buttonStyle,
                                        onClick: action.handler,
                                        type: "link",
                                        children: action.label
                                    }, index, false, {
                                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/execution-engine/notification/job/job-view.tsx",
                                        lineNumber: 121,
                                        columnNumber: 19
                                    }, undefined))
                            }, void 0, false, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/execution-engine/notification/job/job-view.tsx",
                                lineNumber: 119,
                                columnNumber: 15
                            }, undefined)
                        ]
                    }, void 0, true, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/execution-engine/notification/job/job-view.tsx",
                        lineNumber: 109,
                        columnNumber: 13
                    }, undefined)
                ]
            }, props.status, true, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/execution-engine/notification/job/job-view.tsx",
                lineNumber: 43,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/execution-engine/notification/job/job-view.tsx",
            lineNumber: 42,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/execution-engine/notification/job/job-view.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, undefined);
};
_s(JobView, "npbODhKiVXMAM/EtpCiaKc7TtqU=", false, function() {
    return [
        _job_view_styles__WEBPACK_IMPORTED_MODULE_6__.useStyles,
        react_i18next__WEBPACK_IMPORTED_MODULE_7__.useTranslation
    ];
});
_c = JobView;
var _c;
$RefreshReg$(_c, "JobView");

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
"./js/src/core/modules/execution-engine/notification/job/job.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Job: () => (Job)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/app/depency-injection/index.ts");
/* ESM import */var _Pimcore_app_config_services_service_ids__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/app/config/services/service-ids.ts");
/* ESM import */var _jobs_default_notification_job_container__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/execution-engine/jobs/default/notification-job-container.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
var _s = $RefreshSig$();




const Job = (props)=>{
    _s();
    const jobRegistryService = (0,_Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_2__.useInjection)(_Pimcore_app_config_services_service_ids__WEBPACK_IMPORTED_MODULE_3__.serviceIds["ExecutionEngine/JobComponentRegistry"]);
    const Component = jobRegistryService.getComponentByType(props.type) ?? _jobs_default_notification_job_container__WEBPACK_IMPORTED_MODULE_4__.NotificationJobContainer;
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {
        ...props
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/execution-engine/notification/job/job.tsx",
        lineNumber: 27,
        columnNumber: 10
    }, undefined);
};
_s(Job, "IYJhEI+bzkaokLxYhN7AOUFcTcI=", false, function() {
    return [
        _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_2__.useInjection
    ];
});
_c = Job;
var _c;
$RefreshReg$(_c, "Job");

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
"./js/src/core/modules/execution-engine/notification/notification.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Notification: () => (Notification)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _hooks_useJobs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/execution-engine/hooks/useJobs.ts");
/* ESM import */var _Pimcore_components_notification_useNotification__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/notification/useNotification/index.tsx");
/* ESM import */var _job_list_job_list__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/execution-engine/notification/job-list/job-list.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
var _s = $RefreshSig$();





const Notification = ()=>{
    _s();
    const { jobs } = (0,_hooks_useJobs__WEBPACK_IMPORTED_MODULE_2__.useJobs)();
    const hasJobs = jobs.length > 0;
    const [notificationApi] = (0,_Pimcore_components_notification_useNotification__WEBPACK_IMPORTED_MODULE_3__.useNotification)();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_5__.useTranslation)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (hasJobs) {
            notificationApi.open({
                message: t('jobs.notification.title'),
                description: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_job_list_job_list__WEBPACK_IMPORTED_MODULE_4__.JobList, {}, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/execution-engine/notification/notification.tsx",
                    lineNumber: 30,
                    columnNumber: 22
                }, undefined),
                duration: 0,
                closable: false,
                placement: 'bottomRight'
            });
        }
        if (!hasJobs) {
            notificationApi.destroy();
        }
    }, [
        hasJobs
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}, void 0, false);
};
_s(Notification, "j+gm50Z92mw66J5cS2RDSbAi0dg=", false, function() {
    return [
        _hooks_useJobs__WEBPACK_IMPORTED_MODULE_2__.useJobs,
        _Pimcore_components_notification_useNotification__WEBPACK_IMPORTED_MODULE_3__.useNotification,
        react_i18next__WEBPACK_IMPORTED_MODULE_5__.useTranslation
    ];
});
_c = Notification;
var _c;
$RefreshReg$(_c, "Notification");

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
"./js/src/core/modules/perspectives/hooks/use-perspectives.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  usePerspectives: () => (usePerspectives)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _Pimcore_modules_user_user_api_slice_gen__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/user/user-api-slice.gen.ts");
/* ESM import */var _Pimcore_modules_perspectives_active_perspective_slice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/perspectives/active-perspective-slice.ts");
/* ESM import */var _Pimcore_modules_widget_manager_widget_manager_slice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/widget-manager/widget-manager-slice.ts");
/* ESM import */var _Pimcore_modules_widget_manager_utils_widget_manager_outer_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/widget-manager/utils/widget-manager-outer-model.tsx");
/* ESM import */var _Pimcore_modules_auth_user_user_slice__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/auth/user/user-slice.ts");
/* ESM import */var _Pimcore_modules_auth_hooks_use_user__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/auth/hooks/use-user.ts");
/* ESM import */var _Pimcore_modules_perspectives_perspectives_slice_gen__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/perspectives/perspectives-slice.gen.ts");
/* ESM import */var _app_error_handler__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_11__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_12__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_components_icon_text_button_icon_text_button__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/components/icon-text-button/icon-text-button.tsx");
/* ESM import */var _Pimcore_components_spin_spin__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./js/src/core/components/spin/spin.tsx");
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var _Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("./js/src/core/components/box/box.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
var _s = $RefreshSig$();

















const usePerspectives = ()=>{
    _s();
    const dispatch = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_2__.useAppDispatch)();
    const user = (0,_Pimcore_modules_auth_hooks_use_user__WEBPACK_IMPORTED_MODULE_8__.useUser)();
    const [updateActivePerspective] = (0,_Pimcore_modules_user_user_api_slice_gen__WEBPACK_IMPORTED_MODULE_3__.useUserUpdateActivePerspectiveMutation)();
    const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { modal } = antd__WEBPACK_IMPORTED_MODULE_12__.App.useApp();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_13__.useTranslation)();
    const loadPerspective = async (perspectiveId)=>{
        const perspectiveFetcher = dispatch(_Pimcore_modules_perspectives_perspectives_slice_gen__WEBPACK_IMPORTED_MODULE_9__.api.endpoints.perspectiveGetConfigById.initiate({
            perspectiveId
        }));
        perspectiveFetcher.then((param)=>{
            let { data, isSuccess, isError, error } = param;
            isError && (0,_app_error_handler__WEBPACK_IMPORTED_MODULE_10__["default"])(new _app_error_handler__WEBPACK_IMPORTED_MODULE_10__.ApiError(error));
            if (isSuccess && (0,lodash__WEBPACK_IMPORTED_MODULE_11__.isPlainObject)(data)) {
                dispatch((0,_Pimcore_modules_perspectives_active_perspective_slice__WEBPACK_IMPORTED_MODULE_4__.setActivePerspective)(data));
                dispatch((0,_Pimcore_modules_widget_manager_widget_manager_slice__WEBPACK_IMPORTED_MODULE_5__.updateOuterModel)((0,_Pimcore_modules_widget_manager_utils_widget_manager_outer_model__WEBPACK_IMPORTED_MODULE_6__.getInitialModelJson)()));
            }
        }).catch(()=>{});
        return await perspectiveFetcher;
    };
    const switchPerspective = async (perspective)=>{
        setIsLoading(true);
        const switchModal = modal.info({
            title: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_16__.Flex, {
                align: "center",
                gap: "small",
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_spin_spin__WEBPACK_IMPORTED_MODULE_15__.Spin, {
                        type: "classic"
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/perspectives/hooks/use-perspectives.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, undefined),
                    t('perspective.switching.title')
                ]
            }, void 0, true, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/perspectives/hooks/use-perspectives.tsx",
                lineNumber: 66,
                columnNumber: 14
            }, undefined),
            content: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_17__.Box, {
                        margin: {
                            bottom: 'small'
                        },
                        children: [
                            t('perspective.switching.description'),
                            ":"
                        ]
                    }, void 0, true, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/perspectives/hooks/use-perspectives.tsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_text_button_icon_text_button__WEBPACK_IMPORTED_MODULE_14__.IconTextButton, {
                        color: "primary",
                        icon: perspective.icon,
                        variant: "filled",
                        children: t(perspective.name)
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/perspectives/hooks/use-perspectives.tsx",
                        lineNumber: 77,
                        columnNumber: 9
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/perspectives/hooks/use-perspectives.tsx",
                lineNumber: 73,
                columnNumber: 16
            }, undefined),
            footer: false
        });
        const perspectiveId = perspective.id;
        const updateResult = await updateActivePerspective({
            perspectiveId
        });
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_11__.isUndefined)(updateResult.error)) {
            (0,_app_error_handler__WEBPACK_IMPORTED_MODULE_10__["default"])(new _app_error_handler__WEBPACK_IMPORTED_MODULE_10__.ApiError(updateResult.error));
        } else {
            await loadPerspective(perspectiveId);
            dispatch((0,_Pimcore_modules_auth_user_user_slice__WEBPACK_IMPORTED_MODULE_7__.setUser)({
                ...user,
                activePerspective: perspectiveId
            }));
        }
        setIsLoading(false);
        setTimeout(()=>{
            switchModal.destroy();
        }, 500);
    };
    return {
        switchPerspective,
        loadPerspective,
        isLoading
    };
};
_s(usePerspectives, "TlOfy/VCr0O11G3ka+r2vz+j47E=", false, function() {
    return [
        _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_2__.useAppDispatch,
        _Pimcore_modules_auth_hooks_use_user__WEBPACK_IMPORTED_MODULE_8__.useUser,
        _Pimcore_modules_user_user_api_slice_gen__WEBPACK_IMPORTED_MODULE_3__.useUserUpdateActivePerspectiveMutation,
        antd__WEBPACK_IMPORTED_MODULE_12__.App.useApp,
        react_i18next__WEBPACK_IMPORTED_MODULE_13__.useTranslation
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
"./js/src/core/modules/perspectives/permission-checker.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  isAllowedInPerspective: () => (isAllowedInPerspective)
});
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _active_perspective_slice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/perspectives/active-perspective-slice.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 


const isAllowedInPerspective = (permission)=>{
    const activePerspective = (0,_active_perspective_slice__WEBPACK_IMPORTED_MODULE_1__.selectActivePerspective)(_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.store.getState());
    if ((0,lodash__WEBPACK_IMPORTED_MODULE_2__.isNil)(activePerspective)) {
        return false;
    }
    return isPathTrue(activePerspective.contextPermissions, permission);
};
const isPathTrue = (obj, path)=>{
    if ((0,lodash__WEBPACK_IMPORTED_MODULE_2__.isNil)(obj)) {
        return false;
    }
    const keys = path.split('.');
    let current = obj;
    for (const key of keys){
        if (typeof current === 'object' && key in current) {
            current = current[key];
        } else {
            return false;
        }
    }
    return current === true;
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
"./js/src/core/modules/perspectives/perspectives-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  usePerspectiveCreateMutation: () => (usePerspectiveCreateMutation),
  usePerspectiveDeleteMutation: () => (usePerspectiveDeleteMutation),
  usePerspectiveGetConfigByIdQuery: () => (usePerspectiveGetConfigByIdQuery),
  usePerspectiveGetConfigCollectionQuery: () => (usePerspectiveGetConfigCollectionQuery),
  usePerspectiveUpdateConfigByIdMutation: () => (usePerspectiveUpdateConfigByIdMutation),
  usePerspectiveWidgetCreateMutation: () => (usePerspectiveWidgetCreateMutation),
  usePerspectiveWidgetDeleteMutation: () => (usePerspectiveWidgetDeleteMutation),
  usePerspectiveWidgetGetConfigByIdQuery: () => (usePerspectiveWidgetGetConfigByIdQuery),
  usePerspectiveWidgetGetConfigCollectionQuery: () => (usePerspectiveWidgetGetConfigCollectionQuery),
  usePerspectiveWidgetGetTypeCollectionQuery: () => (usePerspectiveWidgetGetTypeCollectionQuery),
  usePerspectiveWidgetUpdateConfigByIdMutation: () => (usePerspectiveWidgetUpdateConfigByIdMutation)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Perspectives"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            perspectiveCreate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/perspectives/configuration`,
                        method: "POST",
                        body: queryArg.addPerspectiveConfig
                    }),
                invalidatesTags: [
                    "Perspectives"
                ]
            }),
            perspectiveGetConfigCollection: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/perspectives/configurations`
                    }),
                providesTags: [
                    "Perspectives"
                ]
            }),
            perspectiveGetConfigById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/perspectives/configuration/${queryArg.perspectiveId}`
                    }),
                providesTags: [
                    "Perspectives"
                ]
            }),
            perspectiveUpdateConfigById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/perspectives/configuration/${queryArg.perspectiveId}`,
                        method: "PUT",
                        body: queryArg.savePerspectiveConfig
                    }),
                invalidatesTags: [
                    "Perspectives"
                ]
            }),
            perspectiveDelete: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/perspectives/configuration/${queryArg.perspectiveId}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Perspectives"
                ]
            }),
            perspectiveWidgetCreate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/perspectives/widgets/${queryArg.widgetType}/configuration`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Perspectives"
                ]
            }),
            perspectiveWidgetGetConfigCollection: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/perspectives/widgets/configurations`
                    }),
                providesTags: [
                    "Perspectives"
                ]
            }),
            perspectiveWidgetGetConfigById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/perspectives/widgets/${queryArg.widgetType}/configuration/${queryArg.widgetId}`
                    }),
                providesTags: [
                    "Perspectives"
                ]
            }),
            perspectiveWidgetUpdateConfigById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/perspectives/widgets/${queryArg.widgetType}/configuration/${queryArg.widgetId}`,
                        method: "PUT",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Perspectives"
                ]
            }),
            perspectiveWidgetDelete: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/perspectives/widgets/${queryArg.widgetType}/configuration/${queryArg.widgetId}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Perspectives"
                ]
            }),
            perspectiveWidgetGetTypeCollection: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/perspectives/widgets/types`
                    }),
                providesTags: [
                    "Perspectives"
                ]
            })
        }),
    overrideExisting: false
});

const { usePerspectiveCreateMutation, usePerspectiveGetConfigCollectionQuery, usePerspectiveGetConfigByIdQuery, usePerspectiveUpdateConfigByIdMutation, usePerspectiveDeleteMutation, usePerspectiveWidgetCreateMutation, usePerspectiveWidgetGetConfigCollectionQuery, usePerspectiveWidgetGetConfigByIdQuery, usePerspectiveWidgetUpdateConfigByIdMutation, usePerspectiveWidgetDeleteMutation, usePerspectiveWidgetGetTypeCollectionQuery } = injectedRtkApi;

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
"./js/src/core/modules/search/modal/search-modal.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SearchModal: () => (SearchModal)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_components_modal_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/modal/modal.tsx");
/* ESM import */var _Pimcore_components_tabs_tabs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/tabs/tabs.tsx");
/* ESM import */var _Pimcore_types_enums_element_element_type__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/types/enums/element/element-type.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var _tabs_general_general_tab__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/search/modal/tabs/general/general-tab.tsx");
/* ESM import */var _provider_use_search__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/search/provider/use-search.ts");
/* ESM import */var _tabs_asset_asset_tab__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/search/modal/tabs/asset/asset-tab.tsx");
/* ESM import */var _tabs_object_object_tab__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/search/modal/tabs/object/object-tab.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
var _s = $RefreshSig$();








const SearchModal = ()=>{
    _s();
    const { isOpen, close } = (0,_provider_use_search__WEBPACK_IMPORTED_MODULE_6__.useSearch)();
    const tabItems = [
        {
            label: 'All',
            key: 'all',
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_tabs_general_general_tab__WEBPACK_IMPORTED_MODULE_5__.GeneralTab, {}, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/search-modal.tsx",
                lineNumber: 30,
                columnNumber: 17
            }, undefined)
        },
        /* {
      label: 'Documents',
      key: elementTypes.document,
      children: <>@todo</>
    }, */ {
            label: 'Assets',
            key: _Pimcore_types_enums_element_element_type__WEBPACK_IMPORTED_MODULE_3__.elementTypes.asset,
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_tabs_asset_asset_tab__WEBPACK_IMPORTED_MODULE_7__.AssetTab, {}, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/search-modal.tsx",
                lineNumber: 40,
                columnNumber: 17
            }, undefined)
        },
        {
            label: 'Data Objects',
            key: _Pimcore_types_enums_element_element_type__WEBPACK_IMPORTED_MODULE_3__.elementTypes.dataObject,
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_tabs_object_object_tab__WEBPACK_IMPORTED_MODULE_8__.ObjectTab, {}, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/search-modal.tsx",
                lineNumber: 45,
                columnNumber: 17
            }, undefined)
        }
    ];
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: isOpen && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_modal_modal__WEBPACK_IMPORTED_MODULE_1__.Modal, {
            closable: true,
            footer: null,
            onCancel: ()=>{
                close();
            },
            open: isOpen,
            size: 'XL',
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_tabs_tabs__WEBPACK_IMPORTED_MODULE_2__.Tabs, {
                items: tabItems,
                noTabBarMargin: true
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/search-modal.tsx",
                lineNumber: 59,
                columnNumber: 11
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/search-modal.tsx",
            lineNumber: 52,
            columnNumber: 9
        }, undefined)
    }, void 0, false);
};
_s(SearchModal, "cAfgv6dfgpx4r2scYkZDfYAyR8s=", false, function() {
    return [
        _provider_use_search__WEBPACK_IMPORTED_MODULE_6__.useSearch
    ];
});
_c = SearchModal;
var _c;
$RefreshReg$(_c, "SearchModal");

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
"./js/src/core/modules/search/modal/tabs/asset/asset-tab.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  AssetTab: () => (AssetTab)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _listing_asset_search_listing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/search/modal/tabs/asset/listing/asset-search-listing.tsx");
/* ESM import */var _Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/content/content.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 



const AssetTab = ()=>{
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_3__.Content, {
        style: {
            height: '65vh'
        },
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_listing_asset_search_listing__WEBPACK_IMPORTED_MODULE_2__.AssetSearchListing, {}, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/asset/asset-tab.tsx",
            lineNumber: 21,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/asset/asset-tab.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, undefined);
};
_c = AssetTab;
var _c;
$RefreshReg$(_c, "AssetTab");

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
"./js/src/core/modules/search/modal/tabs/asset/listing/asset-search-listing.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  AssetSearchListing: () => (AssetSearchListing)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_modules_asset_listing_data_layer_use_data_query_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/asset/listing/data-layer/use-data-query-helper.tsx");
/* ESM import */var _Pimcore_modules_asset_listing_decorator_tag_filter_tag_filter_decorator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/asset/listing/decorator/tag-filter/tag-filter-decorator.ts");
/* ESM import */var _Pimcore_modules_asset_listing_hooks_use_root_element_id__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/asset/listing/hooks/use-root-element-id.ts");
/* ESM import */var _Pimcore_modules_element_dynamic_types_registry_provider_dynamic_type_registry_provider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/registry/provider/dynamic-type-registry-provider.tsx");
/* ESM import */var _Pimcore_modules_element_listing_abstract_listing_container__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/element/listing/abstract/listing-container.tsx");
/* ESM import */var _Pimcore_modules_element_listing_decorators_general_filters_general_filters_decorator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/general-filters/general-filters-decorator.ts");
/* ESM import */var _Pimcore_modules_element_listing_decorators_paging_paging_decorator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/paging/paging-decorator.ts");
/* ESM import */var _Pimcore_modules_element_listing_decorators_sorting_sorting_decorator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/sorting/sorting-decorator.ts");
/* ESM import */var _Pimcore_modules_search_search_api_slice_gen__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/search/search-api-slice.gen.ts");
/* ESM import */var _Pimcore_utils_compose__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/utils/compose.ts");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_11__);
/* ESM import */var _decorator_static_column_configuration_static_column_configuration_decorator__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/search/modal/tabs/asset/listing/decorator/static-column-configuration/static-column-configuration-decorator.ts");
/* ESM import */var _view_view_layer_views_default_view__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/modules/search/modal/tabs/asset/listing/view/view-layer/views/default-view.tsx");
/* ESM import */var _element_listing_decorators_type_filter_type_filter_decorator__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/type-filter/type-filter-decorator.tsx");
/* ESM import */var _decorator_open_element_open_element_decorator__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./js/src/core/modules/search/modal/tabs/asset/listing/decorator/open-element/open-element-decorator.tsx");
/* ESM import */var _Pimcore_types_enums_element_element_type__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("./js/src/core/types/enums/element/element-type.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
















const defaultProps = {
    ..._Pimcore_modules_element_listing_abstract_listing_container__WEBPACK_IMPORTED_MODULE_5__.defaultProps,
    ViewComponent: _view_view_layer_views_default_view__WEBPACK_IMPORTED_MODULE_13__.DefaultView,
    useDataQuery: _Pimcore_modules_search_search_api_slice_gen__WEBPACK_IMPORTED_MODULE_9__.useAssetGetSearchQuery,
    useDataQueryHelper: _Pimcore_modules_asset_listing_data_layer_use_data_query_helper__WEBPACK_IMPORTED_MODULE_1__.useDataQueryHelper,
    useElementId: _Pimcore_modules_asset_listing_hooks_use_root_element_id__WEBPACK_IMPORTED_MODULE_3__.useRootElementId
};
/* eslint-disable @typescript-eslint/consistent-type-assertions */ const listingProps = (0,_Pimcore_utils_compose__WEBPACK_IMPORTED_MODULE_10__.compose)(_Pimcore_modules_element_listing_decorators_paging_paging_decorator__WEBPACK_IMPORTED_MODULE_7__.PagingDecorator, _decorator_static_column_configuration_static_column_configuration_decorator__WEBPACK_IMPORTED_MODULE_12__.StaticColumnConfigurationDecorator, _Pimcore_modules_asset_listing_decorator_tag_filter_tag_filter_decorator__WEBPACK_IMPORTED_MODULE_2__.TagFilterDecorator, [
    _Pimcore_modules_element_listing_decorators_general_filters_general_filters_decorator__WEBPACK_IMPORTED_MODULE_6__.GeneralFiltersDecorator,
    {
        handleSearchTermInSidebar: false
    }
], [
    _element_listing_decorators_type_filter_type_filter_decorator__WEBPACK_IMPORTED_MODULE_14__.TypeFilterDecorator,
    {
        elementType: _Pimcore_types_enums_element_element_type__WEBPACK_IMPORTED_MODULE_16__.elementTypes.asset
    }
], _Pimcore_modules_element_listing_decorators_sorting_sorting_decorator__WEBPACK_IMPORTED_MODULE_8__.SortingDecorator, [
    _decorator_open_element_open_element_decorator__WEBPACK_IMPORTED_MODULE_15__.OpenElementDecorator,
    {
        elementType: _Pimcore_types_enums_element_element_type__WEBPACK_IMPORTED_MODULE_16__.elementTypes.asset
    }
])(defaultProps);
/* eslint-enable @typescript-eslint/consistent-type-assertions */ const AssetSearchListing = ()=>{
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_dynamic_types_registry_provider_dynamic_type_registry_provider__WEBPACK_IMPORTED_MODULE_4__.DynamicTypeRegistryProvider, {
        serviceIds: [
            'DynamicTypes/GridCellRegistry',
            'DynamicTypes/MetadataRegistry',
            'DynamicTypes/ListingRegistry'
        ],
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_listing_abstract_listing_container__WEBPACK_IMPORTED_MODULE_5__.ListingContainer, {
            ...listingProps
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/asset/listing/asset-search-listing.tsx",
            lineNumber: 60,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/asset/listing/asset-search-listing.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, undefined);
};
_c = AssetSearchListing;
var _c;
$RefreshReg$(_c, "AssetSearchListing");

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
"./js/src/core/modules/search/modal/tabs/asset/listing/decorator/open-element/open-element-decorator.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  OpenElementDecorator: () => (OpenElementDecorator)
});
/* ESM import */var _view_layer_with_open_element_event__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/search/modal/tabs/asset/listing/decorator/open-element/view-layer/with-open-element-event.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
const OpenElementDecorator = (props, config)=>{
    const { useGridOptions, ...baseProps } = props;
    if (config === undefined) {
        throw new Error('OpenElementDecorator requires an elementType prop');
    }
    return {
        ...baseProps,
        useGridOptions: (0,_view_layer_with_open_element_event__WEBPACK_IMPORTED_MODULE_0__.withOpenElementEvent)(useGridOptions, config)
    };
};
_c = OpenElementDecorator;
var _c;
$RefreshReg$(_c, "OpenElementDecorator");

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
"./js/src/core/modules/search/modal/tabs/asset/listing/decorator/open-element/view-layer/with-open-element-event.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  withOpenElementEvent: () => (withOpenElementEvent)
});
/* ESM import */var _Pimcore_modules_element_hooks_use_element_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/element/hooks/use-element-helper.ts");
/* ESM import */var _Pimcore_modules_search_provider_use_search__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/search/provider/use-search.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 

const withOpenElementEvent = (useBaseHook, config)=>{
    const useOpenElementExtension = ()=>{
        const { getGridProps: baseGetGridProps, ...baseMethods } = useBaseHook();
        const { openElement } = (0,_Pimcore_modules_element_hooks_use_element_helper__WEBPACK_IMPORTED_MODULE_0__.useElementHelper)();
        const { close } = (0,_Pimcore_modules_search_provider_use_search__WEBPACK_IMPORTED_MODULE_1__.useSearch)();
        const getGridProps = ()=>{
            const baseGripProps = baseGetGridProps();
            const onRowDoubleClick = (row)=>{
                const { id } = row.original;
                const { elementType } = config;
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                openElement({
                    id,
                    type: elementType
                });
                close();
            };
            const newGridProps = {
                ...baseGripProps,
                onRowDoubleClick
            };
            return newGridProps;
        };
        return {
            ...baseMethods,
            getGridProps
        };
    };
    return useOpenElementExtension;
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
"./js/src/core/modules/search/modal/tabs/asset/listing/view/toolbar/toolbar.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Toolbar: () => (Toolbar)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_toolbar_toolbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/toolbar/toolbar.tsx");
/* ESM import */var _Pimcore_modules_element_listing_decorators_row_selection_view_layer_components_row_selection_total_row_reselection_total__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/row-selection/view-layer/components/row-selection-total/row-reselection-total.tsx");
/* ESM import */var _Pimcore_components_split_split__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/split/split.tsx");
/* ESM import */var _Pimcore_modules_element_listing_abstract_view_layer_components_refetch_refetch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/element/listing/abstract/view-layer/components/refetch/refetch.tsx");
/* ESM import */var _Pimcore_modules_element_listing_decorators_paging_pagination_pagination__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/paging/pagination/pagination.tsx");
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 







const Toolbar = ()=>{
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_toolbar_toolbar__WEBPACK_IMPORTED_MODULE_2__.Toolbar, {
        borderStyle: "default",
        padding: {
            right: 'none',
            left: 'none'
        },
        theme: "secondary",
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_7__.Flex, {
            className: "w-full",
            gap: 'small',
            justify: "space-between",
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_split_split__WEBPACK_IMPORTED_MODULE_4__.Split, {
                size: "extra-small",
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_listing_decorators_row_selection_view_layer_components_row_selection_total_row_reselection_total__WEBPACK_IMPORTED_MODULE_3__.RowSelectionTotal, {}, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/asset/listing/view/toolbar/toolbar.tsx",
                        lineNumber: 35,
                        columnNumber: 11
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_listing_abstract_view_layer_components_refetch_refetch__WEBPACK_IMPORTED_MODULE_5__.Refetch, {}, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/asset/listing/view/toolbar/toolbar.tsx",
                        lineNumber: 36,
                        columnNumber: 11
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_listing_decorators_paging_pagination_pagination__WEBPACK_IMPORTED_MODULE_6__.Pagination, {}, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/asset/listing/view/toolbar/toolbar.tsx",
                        lineNumber: 37,
                        columnNumber: 11
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/asset/listing/view/toolbar/toolbar.tsx",
                lineNumber: 34,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/asset/listing/view/toolbar/toolbar.tsx",
            lineNumber: 29,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/asset/listing/view/toolbar/toolbar.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, undefined);
};
_c = Toolbar;
var _c;
$RefreshReg$(_c, "Toolbar");

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
"./js/src/core/modules/search/modal/tabs/asset/listing/view/top-bar/top-bar.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TopBar: () => (TopBar)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var _Pimcore_components_toolbar_toolbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/toolbar/toolbar.tsx");
/* ESM import */var _Pimcore_modules_element_components_type_select_provided_type_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/element/components/type-select/provided-type-select.tsx");
/* ESM import */var _Pimcore_modules_element_listing_decorators_general_filters_view_layer_components_search_search_term_filter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/general-filters/view-layer/components/search/search-term-filter.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 





const TopBar = ()=>{
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_toolbar_toolbar__WEBPACK_IMPORTED_MODULE_2__.Toolbar, {
        borderStyle: "default",
        padding: {
            left: 'none',
            right: 'none'
        },
        position: "top",
        theme: "secondary",
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_1__.Flex, {
            className: "w-full",
            gap: 'small',
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_components_type_select_provided_type_select__WEBPACK_IMPORTED_MODULE_3__.ProvidedTypeSelect, {}, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/asset/listing/view/top-bar/top-bar.tsx",
                    lineNumber: 32,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_listing_decorators_general_filters_view_layer_components_search_search_term_filter__WEBPACK_IMPORTED_MODULE_4__.SearchTermFilter, {}, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/asset/listing/view/top-bar/top-bar.tsx",
                    lineNumber: 33,
                    columnNumber: 9
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/asset/listing/view/top-bar/top-bar.tsx",
            lineNumber: 28,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/asset/listing/view/top-bar/top-bar.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, undefined);
};
_c = TopBar;
var _c;
$RefreshReg$(_c, "TopBar");

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
"./js/src/core/modules/search/modal/tabs/asset/listing/view/view-layer/views/default-view.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DefaultView: () => (DefaultView)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/content/content.tsx");
/* ESM import */var _Pimcore_components_content_layout_content_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/content-layout/content-layout.tsx");
/* ESM import */var _Pimcore_modules_element_listing_abstract_data_layer_provider_data_use_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/element/listing/abstract/data-layer/provider/data/use-data.tsx");
/* ESM import */var _Pimcore_modules_element_listing_abstract_view_layer_components_sidebar_sidebar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/element/listing/abstract/view-layer/components/sidebar/sidebar.tsx");
/* ESM import */var _Pimcore_modules_element_listing_abstract_view_layer_components_grid_grid_container__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/element/listing/abstract/view-layer/components/grid/grid-container.tsx");
/* ESM import */var _top_bar_top_bar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/search/modal/tabs/asset/listing/view/top-bar/top-bar.tsx");
/* ESM import */var _toolbar_toolbar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/search/modal/tabs/asset/listing/view/toolbar/toolbar.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
var _s = $RefreshSig$();








const DefaultView = ()=>{
    _s();
    const { dataQueryResult } = (0,_Pimcore_modules_element_listing_abstract_data_layer_provider_data_use_data__WEBPACK_IMPORTED_MODULE_4__.useData)();
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                dataQueryResult === undefined && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_2__.Content, {
                    loading: true
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/asset/listing/view/view-layer/views/default-view.tsx",
                    lineNumber: 28,
                    columnNumber: 42
                }, undefined),
                dataQueryResult !== undefined && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_layout_content_layout__WEBPACK_IMPORTED_MODULE_3__.ContentLayout, {
                    renderToolbar: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_toolbar_toolbar__WEBPACK_IMPORTED_MODULE_8__.Toolbar, {}, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/asset/listing/view/view-layer/views/default-view.tsx",
                        lineNumber: 31,
                        columnNumber: 27
                    }, void 0),
                    renderTopBar: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_top_bar_top_bar__WEBPACK_IMPORTED_MODULE_7__.TopBar, {}, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/asset/listing/view/view-layer/views/default-view.tsx",
                        lineNumber: 32,
                        columnNumber: 26
                    }, void 0),
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_layout_content_layout__WEBPACK_IMPORTED_MODULE_3__.ContentLayout, {
                        renderSidebar: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_listing_abstract_view_layer_components_sidebar_sidebar__WEBPACK_IMPORTED_MODULE_5__.Sidebar, {}, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/asset/listing/view/view-layer/views/default-view.tsx",
                            lineNumber: 35,
                            columnNumber: 29
                        }, void 0),
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_listing_abstract_view_layer_components_grid_grid_container__WEBPACK_IMPORTED_MODULE_6__.GridContainer, {}, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/asset/listing/view/view-layer/views/default-view.tsx",
                            lineNumber: 37,
                            columnNumber: 13
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/asset/listing/view/view-layer/views/default-view.tsx",
                        lineNumber: 34,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/asset/listing/view/view-layer/views/default-view.tsx",
                    lineNumber: 30,
                    columnNumber: 9
                }, undefined)
            ]
        }, void 0, true), [
        dataQueryResult
    ]);
};
_s(DefaultView, "9qJdQRCeNoDij9m8TwTKifY8g2A=", false, function() {
    return [
        _Pimcore_modules_element_listing_abstract_data_layer_provider_data_use_data__WEBPACK_IMPORTED_MODULE_4__.useData
    ];
});
_c = DefaultView;
var _c;
$RefreshReg$(_c, "DefaultView");

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
"./js/src/core/modules/search/modal/tabs/general/general-tab.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  GeneralTab: () => (GeneralTab)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_components_content_layout_content_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/content-layout/content-layout.tsx");
/* ESM import */var _Pimcore_components_search_input_search_input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/search-input/search-input.tsx");
/* ESM import */var _Pimcore_components_toolbar_toolbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/toolbar/toolbar.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var _search_result_search_result__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/search/modal/tabs/general/search-result/search-result.tsx");
/* ESM import */var _provider_search_term_provider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/search/modal/tabs/general/provider/search-term-provider.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
var _s = $RefreshSig$();






const GeneralTab = ()=>{
    _s();
    const [searchTerm, setSearchTerm] = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)('');
    const [searchQuery, setSearchQuery] = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)('');
    (0,react__WEBPACK_IMPORTED_MODULE_4__.useEffect)(()=>{
        const timerId = setTimeout(()=>{
            setSearchTerm(searchQuery);
        }, 500);
        return ()=>{
            clearTimeout(timerId);
        };
    }, [
        searchQuery
    ]);
    const onSearch = (value)=>{
        setSearchQuery(value);
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_layout_content_layout__WEBPACK_IMPORTED_MODULE_1__.ContentLayout, {
        renderTopBar: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_toolbar_toolbar__WEBPACK_IMPORTED_MODULE_3__.Toolbar, {
            padding: {
                left: 'none',
                right: 'none'
            },
            position: "top",
            theme: "secondary",
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_search_input_search_input__WEBPACK_IMPORTED_MODULE_2__.SearchInput, {
                maxWidth: '100%',
                onChange: (event)=>{
                    setSearchQuery(event.target.value);
                },
                onSearch: onSearch,
                value: searchQuery
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/general/general-tab.tsx",
                lineNumber: 42,
                columnNumber: 11
            }, void 0)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/general/general-tab.tsx",
            lineNumber: 37,
            columnNumber: 9
        }, void 0),
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_provider_search_term_provider__WEBPACK_IMPORTED_MODULE_6__.SearchTermProvider, {
            searchTerm: searchTerm,
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_search_result_search_result__WEBPACK_IMPORTED_MODULE_5__.SearchResult, {}, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/general/general-tab.tsx",
                lineNumber: 52,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/general/general-tab.tsx",
            lineNumber: 51,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/general/general-tab.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, undefined);
};
_s(GeneralTab, "TMFBS5hayqCXBl9zkR8WBE0Fe7Y=");
_c = GeneralTab;
var _c;
$RefreshReg$(_c, "GeneralTab");

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
"./js/src/core/modules/search/modal/tabs/general/provider/search-term-provider.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SearchTermContext: () => (SearchTermContext),
  SearchTermProvider: () => (SearchTermProvider)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
var _s = $RefreshSig$();

const SearchTermContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({
    searchTerm: ''
});
const SearchTermProvider = (props)=>{
    _s();
    const { searchTerm, children } = props;
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(SearchTermContext.Provider, {
            value: {
                searchTerm
            },
            children: children
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/general/provider/search-term-provider.tsx",
            lineNumber: 33,
            columnNumber: 5
        }, undefined), [
        searchTerm,
        children
    ]);
};
_s(SearchTermProvider, "nwk+m61qLgjDVUp4IGV/072DDN4=");
_c = SearchTermProvider;
var _c;
$RefreshReg$(_c, "SearchTermProvider");

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
"./js/src/core/modules/search/modal/tabs/general/provider/use-search-term.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useSearchTerm: () => (useSearchTerm)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _search_term_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/search/modal/tabs/general/provider/search-term-provider.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ var _s = $RefreshSig$();


const useSearchTerm = ()=>{
    _s();
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_search_term_provider__WEBPACK_IMPORTED_MODULE_1__.SearchTermContext);
};
_s(useSearchTerm, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");

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
"./js/src/core/modules/search/modal/tabs/general/search-result/detail/search-result-detail-empty.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SearchResultDetailEmpty: () => (SearchResultDetailEmpty)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/content/content.tsx");
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var _Pimcore_components_no_content_no_content__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/no-content/no-content.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 




const SearchResultDetailEmpty = ()=>{
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_1__.Content, {
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_2__.Flex, {
            align: "center",
            className: "h-full w-full",
            justify: "center",
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_no_content_no_content__WEBPACK_IMPORTED_MODULE_3__.NoContent, {
                text: "No item selected"
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/general/search-result/detail/search-result-detail-empty.tsx",
                lineNumber: 27,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/general/search-result/detail/search-result-detail-empty.tsx",
            lineNumber: 22,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/general/search-result/detail/search-result-detail-empty.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, undefined);
};
_c = SearchResultDetailEmpty;
var _c;
$RefreshReg$(_c, "SearchResultDetailEmpty");

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
"./js/src/core/modules/search/modal/tabs/general/search-result/detail/search-result-detail-found.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SearchResultDetailFound: () => (SearchResultDetailFound)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/content/content.tsx");
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var _Pimcore_components_key_value_list_key_value_list__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/key-value-list/key-value-list.tsx");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* ESM import */var _Pimcore_modules_search_search_api_slice_gen__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/search/search-api-slice.gen.ts");
/* ESM import */var _Pimcore_modules_element_utils_element_type__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/element/utils/element-type.ts");
/* ESM import */var _Pimcore_components_image_image__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/image/image.tsx");
/* ESM import */var _Pimcore_utils_type_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/utils/type-utils.ts");
/* ESM import */var _Pimcore_components_pimcore_video_pimcore_video__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/components/pimcore-video/pimcore-video.tsx");
/* ESM import */var _Pimcore_components_pimcore_document_pimcore_document__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/components/pimcore-document/pimcore-document.tsx");
/* ESM import */var _search_styles__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/search/search.styles.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
var _s = $RefreshSig$();












const KEYS_TO_REMOVE = [
    'elementType',
    'type'
];
const MEDIA_TYPE = [
    'image',
    'video',
    'document'
];
const SearchResultDetailFound = (props)=>{
    _s();
    const { item } = props;
    const { id, elementType } = item;
    const { isError, error, isLoading, data } = (0,_Pimcore_modules_search_search_api_slice_gen__WEBPACK_IMPORTED_MODULE_6__.useSimpleSearchPreviewGetQuery)({
        id,
        elementType: (0,_Pimcore_modules_element_utils_element_type__WEBPACK_IMPORTED_MODULE_7__.mapToElementType)(elementType)
    });
    const { styles } = (0,_search_styles__WEBPACK_IMPORTED_MODULE_12__.useStyles)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (isError) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_5__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_5__.ApiError(error));
        }
    }, [
        isError
    ]);
    if (isLoading) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_2__.Content, {
            loading: true
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/general/search-result/detail/search-result-detail-found.tsx",
            lineNumber: 50,
            columnNumber: 12
        }, undefined);
    }
    if (isError || error !== undefined) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_2__.Content, {
            none: true,
            noneOptions: {
                text: 'data not available'
            }
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/general/search-result/detail/search-result-detail-found.tsx",
            lineNumber: 55,
            columnNumber: 7
        }, undefined);
    }
    const { additionalAttributes, ...detail } = data;
    const preparedItemList = Object.entries(detail).filter((param)=>{
        let [key] = param;
        return !KEYS_TO_REMOVE.includes(key);
    }).map((param)=>{
        let [key, value] = param;
        return {
            key,
            value
        };
    });
    const renderMediaElement = ()=>{
        const type = item === null || item === void 0 ? void 0 : item.type;
        const path = item === null || item === void 0 ? void 0 : item.path;
        const isShowMediaElement = MEDIA_TYPE.includes(type);
        if (isShowMediaElement && !(0,_Pimcore_utils_type_utils__WEBPACK_IMPORTED_MODULE_9__.isEmptyValue)(path)) {
            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_3__.Flex, {
                justify: "center",
                children: [
                    type === 'image' && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_image_image__WEBPACK_IMPORTED_MODULE_8__.Image, {
                        className: styles.searchResultImage,
                        preview: false,
                        src: path
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/general/search-result/detail/search-result-detail-found.tsx",
                        lineNumber: 83,
                        columnNumber: 13
                    }, undefined),
                    type === 'video' && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_pimcore_video_pimcore_video__WEBPACK_IMPORTED_MODULE_10__.PimcoreVideo, {
                        sources: [
                            {
                                src: path
                            }
                        ],
                        width: 250
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/general/search-result/detail/search-result-detail-found.tsx",
                        lineNumber: 90,
                        columnNumber: 13
                    }, undefined),
                    type === 'document' && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_pimcore_document_pimcore_document__WEBPACK_IMPORTED_MODULE_11__.PimcoreDocument, {
                        className: styles.searchResultDocument,
                        src: path
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/general/search-result/detail/search-result-detail-found.tsx",
                        lineNumber: 96,
                        columnNumber: 13
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/general/search-result/detail/search-result-detail-found.tsx",
                lineNumber: 81,
                columnNumber: 9
            }, undefined);
        }
        return null;
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_2__.Content, {
        className: styles.detailContent,
        children: [
            renderMediaElement(),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_key_value_list_key_value_list__WEBPACK_IMPORTED_MODULE_4__.KeyValueList, {
                items: preparedItemList
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/general/search-result/detail/search-result-detail-found.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/general/search-result/detail/search-result-detail-found.tsx",
        lineNumber: 109,
        columnNumber: 5
    }, undefined);
};
_s(SearchResultDetailFound, "nt88bn1LT0o/nn+v+B4mPk3oJ8Q=", false, function() {
    return [
        _Pimcore_modules_search_search_api_slice_gen__WEBPACK_IMPORTED_MODULE_6__.useSimpleSearchPreviewGetQuery,
        _search_styles__WEBPACK_IMPORTED_MODULE_12__.useStyles
    ];
});
_c = SearchResultDetailFound;
var _c;
$RefreshReg$(_c, "SearchResultDetailFound");

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
"./js/src/core/modules/search/modal/tabs/general/search-result/detail/search-result-detail.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SearchResultDetail: () => (SearchResultDetail)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _search_result_detail_found__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/search/modal/tabs/general/search-result/detail/search-result-detail-found.tsx");
/* ESM import */var _search_result_detail_empty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/search/modal/tabs/general/search-result/detail/search-result-detail-empty.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
var _s = $RefreshSig$();



const SearchResultDetail = (props)=>{
    _s();
    const { item } = props;
    const hasItem = item !== undefined;
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (hasItem) {
            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_search_result_detail_found__WEBPACK_IMPORTED_MODULE_2__.SearchResultDetailFound, {
                item: item
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/general/search-result/detail/search-result-detail.tsx",
                lineNumber: 30,
                columnNumber: 9
            }, undefined);
        }
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_search_result_detail_empty__WEBPACK_IMPORTED_MODULE_3__.SearchResultDetailEmpty, {}, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/general/search-result/detail/search-result-detail.tsx",
            lineNumber: 35,
            columnNumber: 7
        }, undefined);
    }, [
        item
    ]);
};
_s(SearchResultDetail, "nwk+m61qLgjDVUp4IGV/072DDN4=");
_c = SearchResultDetail;
var _c;
$RefreshReg$(_c, "SearchResultDetail");

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
"./js/src/core/modules/search/modal/tabs/general/search-result/search-result-item.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SearchResultItem: () => (SearchResultItem)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _Pimcore_modules_element_hooks_use_element_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/element/hooks/use-element-helper.ts");
/* ESM import */var _Pimcore_modules_search_provider_use_search__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/search/provider/use-search.ts");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/classnames/index.js");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_6__);
/* ESM import */var _Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/box/box.tsx");
/* ESM import */var _Pimcore_components_filename_filename__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/filename/filename.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
var _s = $RefreshSig$();








const SearchResultItem = (props)=>{
    _s();
    const { item, active, ...htmlProps } = props;
    const { icon, path } = item;
    const { openElement } = (0,_Pimcore_modules_element_hooks_use_element_helper__WEBPACK_IMPORTED_MODULE_4__.useElementHelper)();
    const { close } = (0,_Pimcore_modules_search_provider_use_search__WEBPACK_IMPORTED_MODULE_5__.useSearch)();
    const className = classnames__WEBPACK_IMPORTED_MODULE_6___default()('hover', {
        active: active === true
    });
    const onClick = ()=>{
        /* eslint-disable-next-line @typescript-eslint/no-floating-promises */ openElement({
            id: item.id,
            type: item.elementType
        });
        close();
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_7__.Box, {
        ...htmlProps,
        className: className,
        onClick: onClick,
        padding: 'mini',
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_1__.Flex, {
            align: "center",
            gap: 'mini',
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__.Icon, {
                    ...icon
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/general/search-result/search-result-item.tsx",
                    lineNumber: 64,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_filename_filename__WEBPACK_IMPORTED_MODULE_8__.Filename, {
                    ellipsis: !(active ?? false),
                    value: path
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/general/search-result/search-result-item.tsx",
                    lineNumber: 65,
                    columnNumber: 9
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/general/search-result/search-result-item.tsx",
            lineNumber: 60,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/general/search-result/search-result-item.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, undefined);
};
_s(SearchResultItem, "JjWMcEQfPomae5eUiPMQyWtMBNE=", false, function() {
    return [
        _Pimcore_modules_element_hooks_use_element_helper__WEBPACK_IMPORTED_MODULE_4__.useElementHelper,
        _Pimcore_modules_search_provider_use_search__WEBPACK_IMPORTED_MODULE_5__.useSearch
    ];
});
_c = SearchResultItem;
var _c;
$RefreshReg$(_c, "SearchResultItem");

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
"./js/src/core/modules/search/modal/tabs/general/search-result/search-result.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SearchResult: () => (SearchResult)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _provider_use_search_term__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/search/modal/tabs/general/provider/use-search-term.tsx");
/* ESM import */var _Pimcore_modules_search_search_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/search/search-api-slice-enhanced.ts");
/* ESM import */var _Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/content/content.tsx");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* ESM import */var _search_result_item__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/search/modal/tabs/general/search-result/search-result-item.tsx");
/* ESM import */var _Pimcore_components_toolbar_toolbar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/toolbar/toolbar.tsx");
/* ESM import */var _Pimcore_components_pagination_pagination__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/pagination/pagination.tsx");
/* ESM import */var _Pimcore_components_no_content_no_content__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/components/no-content/no-content.tsx");
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var _Pimcore_components_split_layout_split_layout__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/components/split-layout/split-layout.tsx");
/* ESM import */var _detail_search_result_detail__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/search/modal/tabs/general/search-result/detail/search-result-detail.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
var _s = $RefreshSig$();












const SearchResult = ()=>{
    _s();
    const { searchTerm } = (0,_provider_use_search_term__WEBPACK_IMPORTED_MODULE_2__.useSearchTerm)();
    const [page, setPage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(1);
    const [pageSize, setPageSize] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(20);
    const [selectedItem, setSelectedItem] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(undefined);
    const [selectedItemQuery, setSelectedItemQuery] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(undefined);
    const { isLoading, isError, error, data } = (0,_Pimcore_modules_search_search_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_3__.useSimpleSearchGetQuery)({
        searchTerm,
        page,
        pageSize
    });
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const timerId = setTimeout(()=>{
            setSelectedItem(selectedItemQuery);
        }, 333);
        return ()=>{
            clearTimeout(timerId);
        };
    }, [
        selectedItemQuery
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setPage(1);
        setSelectedItem(undefined);
    }, [
        searchTerm
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (isError) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_5__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_5__.ApiError(error));
        }
    }, [
        isError
    ]);
    const onChange = (page, pageSize)=>{
        setPage(page);
        setPageSize(pageSize);
        setSelectedItem(undefined);
    };
    const onMouseEnter = (item)=>{
        setSelectedItemQuery(item);
    };
    const onMouseLeave = ()=>{
        setSelectedItemQuery(selectedItem);
    };
    const detectItemActivity = (item)=>{
        return (selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.id) === item.id && (selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.elementType) === item.elementType;
    };
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (isLoading) {
            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_4__.Content, {
                loading: true
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/general/search-result/search-result.tsx",
                lineNumber: 72,
                columnNumber: 14
            }, undefined);
        }
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {}, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/general/search-result/search-result.tsx",
                    lineNumber: 77,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_split_layout_split_layout__WEBPACK_IMPORTED_MODULE_11__.SplitLayout, {
                    leftItem: {
                        size: 750,
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_4__.Content, {
                            overflow: {
                                x: 'hidden',
                                y: 'auto'
                            },
                            padded: true,
                            padding: {
                                left: 'none',
                                right: 'none',
                                y: 'none'
                            },
                            style: {
                                height: 400
                            },
                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_10__.Flex, {
                                className: "w-full h-full",
                                gap: 0,
                                vertical: true,
                                children: [
                                    data === null || data === void 0 ? void 0 : data.items.map((item)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_search_result_item__WEBPACK_IMPORTED_MODULE_6__.SearchResultItem, {
                                            active: detectItemActivity(item),
                                            item: item,
                                            onMouseEnter: ()=>{
                                                onMouseEnter(item);
                                            },
                                            onMouseLeave: ()=>{
                                                onMouseLeave();
                                            }
                                        }, `${item.id}-${item.elementType}`, false, {
                                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/general/search-result/search-result.tsx",
                                            lineNumber: 96,
                                            columnNumber: 23
                                        }, void 0)),
                                    (data === null || data === void 0 ? void 0 : data.items.length) === 0 && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_10__.Flex, {
                                        align: "center",
                                        className: "w-full h-full",
                                        gap: 'mini',
                                        justify: "center",
                                        vertical: true,
                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_no_content_no_content__WEBPACK_IMPORTED_MODULE_9__.NoContent, {
                                            text: "No results found"
                                        }, void 0, false, {
                                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/general/search-result/search-result.tsx",
                                            lineNumber: 113,
                                            columnNumber: 25
                                        }, void 0)
                                    }, void 0, false, {
                                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/general/search-result/search-result.tsx",
                                        lineNumber: 106,
                                        columnNumber: 23
                                    }, void 0)
                                ]
                            }, void 0, true, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/general/search-result/search-result.tsx",
                                lineNumber: 90,
                                columnNumber: 19
                            }, void 0)
                        }, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/general/search-result/search-result.tsx",
                            lineNumber: 84,
                            columnNumber: 17
                        }, void 0)
                    },
                    rightItem: {
                        size: 250,
                        minSize: 250,
                        maxSize: 250,
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_detail_search_result_detail__WEBPACK_IMPORTED_MODULE_12__.SearchResultDetail, {
                            item: selectedItem
                        }, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/general/search-result/search-result.tsx",
                            lineNumber: 128,
                            columnNumber: 17
                        }, void 0)
                    },
                    withDivider: true
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/general/search-result/search-result.tsx",
                    lineNumber: 79,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_toolbar_toolbar__WEBPACK_IMPORTED_MODULE_7__.Toolbar, {
                    theme: "secondary",
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_pagination_pagination__WEBPACK_IMPORTED_MODULE_8__.Pagination, {
                        onChange: onChange,
                        pageSizeOptions: [
                            10,
                            20,
                            50,
                            100
                        ],
                        showSizeChanger: true,
                        showTotal: (total)=>`Total ${total} items`,
                        total: (data === null || data === void 0 ? void 0 : data.totalItems) ?? 0
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/general/search-result/search-result.tsx",
                        lineNumber: 137,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/general/search-result/search-result.tsx",
                    lineNumber: 136,
                    columnNumber: 9
                }, undefined)
            ]
        }, void 0, true);
    }, [
        data,
        selectedItem,
        isLoading
    ]);
};
_s(SearchResult, "iF3tDX24uTTGGhaoH+vphjGJOv0=", false, function() {
    return [
        _provider_use_search_term__WEBPACK_IMPORTED_MODULE_2__.useSearchTerm,
        _Pimcore_modules_search_search_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_3__.useSimpleSearchGetQuery
    ];
});
_c = SearchResult;
var _c;
$RefreshReg$(_c, "SearchResult");

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
"./js/src/core/modules/search/modal/tabs/object/listing/decorator/open-element/open-element-decorator.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  OpenElementDecorator: () => (OpenElementDecorator)
});
/* ESM import */var _view_layer_with_open_element_event__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/search/modal/tabs/object/listing/decorator/open-element/view-layer/with-open-element-event.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
const OpenElementDecorator = (props, config)=>{
    const { useGridOptions, ...baseProps } = props;
    if (config === undefined) {
        throw new Error('OpenElementDecorator requires an elementType prop');
    }
    return {
        ...baseProps,
        useGridOptions: (0,_view_layer_with_open_element_event__WEBPACK_IMPORTED_MODULE_0__.withOpenElementEvent)(useGridOptions, config)
    };
};
_c = OpenElementDecorator;
var _c;
$RefreshReg$(_c, "OpenElementDecorator");

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
"./js/src/core/modules/search/modal/tabs/object/listing/decorator/open-element/view-layer/with-open-element-event.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  withOpenElementEvent: () => (withOpenElementEvent)
});
/* ESM import */var _Pimcore_modules_element_hooks_use_element_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/element/hooks/use-element-helper.ts");
/* ESM import */var _Pimcore_modules_search_provider_use_search__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/search/provider/use-search.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 

const withOpenElementEvent = (useBaseHook, config)=>{
    const useOpenElementExtension = ()=>{
        const { getGridProps: baseGetGridProps, ...baseMethods } = useBaseHook();
        const { openElement } = (0,_Pimcore_modules_element_hooks_use_element_helper__WEBPACK_IMPORTED_MODULE_0__.useElementHelper)();
        const { close } = (0,_Pimcore_modules_search_provider_use_search__WEBPACK_IMPORTED_MODULE_1__.useSearch)();
        const getGridProps = ()=>{
            const baseGripProps = baseGetGridProps();
            const onRowDoubleClick = (row)=>{
                const { id } = row.original;
                const { elementType } = config;
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                openElement({
                    id,
                    type: elementType
                });
                close();
            };
            const newGridProps = {
                ...baseGripProps,
                onRowDoubleClick
            };
            return newGridProps;
        };
        return {
            ...baseMethods,
            getGridProps
        };
    };
    return useOpenElementExtension;
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
"./js/src/core/modules/search/modal/tabs/object/listing/object-search-listing.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ObjectSearchListing: () => (ObjectSearchListing)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_modules_element_dynamic_types_registry_provider_dynamic_type_registry_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/registry/provider/dynamic-type-registry-provider.tsx");
/* ESM import */var _Pimcore_modules_element_listing_abstract_listing_container__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/element/listing/abstract/listing-container.tsx");
/* ESM import */var _Pimcore_modules_element_listing_decorators_general_filters_general_filters_decorator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/general-filters/general-filters-decorator.ts");
/* ESM import */var _Pimcore_modules_element_listing_decorators_paging_paging_decorator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/paging/paging-decorator.ts");
/* ESM import */var _Pimcore_modules_element_listing_decorators_sorting_sorting_decorator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/sorting/sorting-decorator.ts");
/* ESM import */var _Pimcore_modules_search_search_api_slice_gen__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/search/search-api-slice.gen.ts");
/* ESM import */var _Pimcore_utils_compose__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/utils/compose.ts");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* ESM import */var _view_view_layer_views_default_view__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/search/modal/tabs/object/listing/view/view-layer/views/default-view.tsx");
/* ESM import */var _decorator_open_element_open_element_decorator__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/search/modal/tabs/object/listing/decorator/open-element/open-element-decorator.tsx");
/* ESM import */var _Pimcore_types_enums_element_element_type__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/types/enums/element/element-type.tsx");
/* ESM import */var _Pimcore_modules_asset_listing_hooks_use_root_element_id__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/asset/listing/hooks/use-root-element-id.ts");
/* ESM import */var _Pimcore_modules_asset_listing_decorator_tag_filter_tag_filter_decorator__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/modules/asset/listing/decorator/tag-filter/tag-filter-decorator.ts");
/* ESM import */var _Pimcore_modules_element_listing_decorators_type_filter_type_filter_decorator__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/type-filter/type-filter-decorator.tsx");
/* ESM import */var _data_layer_use_data_query_helper__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./js/src/core/modules/search/modal/tabs/object/listing/data-layer/use-data-query-helper.ts");
/* ESM import */var _Pimcore_modules_data_object_listing_decorator_class_definition_selection_class_definition_selection_decorator__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("./js/src/core/modules/data-object/listing/decorator/class-definition-selection/class-definition-selection-decorator.tsx");
/* ESM import */var _decorator_column_configuration_column_configuration_decorator__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("./js/src/core/modules/search/modal/tabs/object/listing/decorator/column-configuration/column-configuration-decorator.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 

















const defaultProps = {
    ..._Pimcore_modules_element_listing_abstract_listing_container__WEBPACK_IMPORTED_MODULE_2__.defaultProps,
    ViewComponent: _view_view_layer_views_default_view__WEBPACK_IMPORTED_MODULE_9__.DefaultView,
    useDataQuery: _Pimcore_modules_search_search_api_slice_gen__WEBPACK_IMPORTED_MODULE_6__.useDataObjectGetSearchQuery,
    useDataQueryHelper: _data_layer_use_data_query_helper__WEBPACK_IMPORTED_MODULE_15__.useDataQueryHelper,
    useElementId: _Pimcore_modules_asset_listing_hooks_use_root_element_id__WEBPACK_IMPORTED_MODULE_12__.useRootElementId
};
/* eslint-disable @typescript-eslint/consistent-type-assertions */ const listingProps = (0,_Pimcore_utils_compose__WEBPACK_IMPORTED_MODULE_7__.compose)(_Pimcore_modules_element_listing_decorators_paging_paging_decorator__WEBPACK_IMPORTED_MODULE_4__.PagingDecorator, _decorator_column_configuration_column_configuration_decorator__WEBPACK_IMPORTED_MODULE_17__.ColumnConfigurationDecorator, _Pimcore_modules_asset_listing_decorator_tag_filter_tag_filter_decorator__WEBPACK_IMPORTED_MODULE_13__.TagFilterDecorator, [
    _Pimcore_modules_element_listing_decorators_general_filters_general_filters_decorator__WEBPACK_IMPORTED_MODULE_3__.GeneralFiltersDecorator,
    {
        handleSearchTermInSidebar: false
    }
], _Pimcore_modules_element_listing_decorators_sorting_sorting_decorator__WEBPACK_IMPORTED_MODULE_5__.SortingDecorator, [
    _Pimcore_modules_data_object_listing_decorator_class_definition_selection_class_definition_selection_decorator__WEBPACK_IMPORTED_MODULE_16__.ClassDefinitionSelectionDecorator,
    {
        showConfigLayer: false
    }
], [
    _decorator_open_element_open_element_decorator__WEBPACK_IMPORTED_MODULE_10__.OpenElementDecorator,
    {
        elementType: _Pimcore_types_enums_element_element_type__WEBPACK_IMPORTED_MODULE_11__.elementTypes.dataObject
    }
], [
    _Pimcore_modules_element_listing_decorators_type_filter_type_filter_decorator__WEBPACK_IMPORTED_MODULE_14__.TypeFilterDecorator,
    {
        elementType: _Pimcore_types_enums_element_element_type__WEBPACK_IMPORTED_MODULE_11__.elementTypes.dataObject
    }
])(defaultProps);
/* eslint-enable @typescript-eslint/consistent-type-assertions */ const ObjectSearchListing = ()=>{
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_dynamic_types_registry_provider_dynamic_type_registry_provider__WEBPACK_IMPORTED_MODULE_1__.DynamicTypeRegistryProvider, {
        serviceIds: [
            'DynamicTypes/GridCellRegistry',
            'DynamicTypes/ListingRegistry'
        ],
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_listing_abstract_listing_container__WEBPACK_IMPORTED_MODULE_2__.ListingContainer, {
            ...listingProps
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/object/listing/object-search-listing.tsx",
            lineNumber: 61,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/object/listing/object-search-listing.tsx",
        lineNumber: 56,
        columnNumber: 5
    }, undefined);
};
_c = ObjectSearchListing;
var _c;
$RefreshReg$(_c, "ObjectSearchListing");

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
"./js/src/core/modules/search/modal/tabs/object/listing/view/toolbar/toolbar.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Toolbar: () => (Toolbar)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_toolbar_toolbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/toolbar/toolbar.tsx");
/* ESM import */var _Pimcore_modules_element_listing_decorators_row_selection_view_layer_components_row_selection_total_row_reselection_total__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/row-selection/view-layer/components/row-selection-total/row-reselection-total.tsx");
/* ESM import */var _Pimcore_components_split_split__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/split/split.tsx");
/* ESM import */var _Pimcore_modules_element_listing_abstract_view_layer_components_refetch_refetch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/element/listing/abstract/view-layer/components/refetch/refetch.tsx");
/* ESM import */var _Pimcore_modules_element_listing_decorators_paging_pagination_pagination__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/paging/pagination/pagination.tsx");
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 







const Toolbar = ()=>{
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_toolbar_toolbar__WEBPACK_IMPORTED_MODULE_2__.Toolbar, {
        borderStyle: "default",
        padding: {
            right: 'none',
            left: 'none'
        },
        theme: "secondary",
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_7__.Flex, {
            className: "w-full",
            gap: 'small',
            justify: "space-between",
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_split_split__WEBPACK_IMPORTED_MODULE_4__.Split, {
                size: "extra-small",
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_listing_decorators_row_selection_view_layer_components_row_selection_total_row_reselection_total__WEBPACK_IMPORTED_MODULE_3__.RowSelectionTotal, {}, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/object/listing/view/toolbar/toolbar.tsx",
                        lineNumber: 35,
                        columnNumber: 11
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_listing_abstract_view_layer_components_refetch_refetch__WEBPACK_IMPORTED_MODULE_5__.Refetch, {}, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/object/listing/view/toolbar/toolbar.tsx",
                        lineNumber: 36,
                        columnNumber: 11
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_listing_decorators_paging_pagination_pagination__WEBPACK_IMPORTED_MODULE_6__.Pagination, {}, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/object/listing/view/toolbar/toolbar.tsx",
                        lineNumber: 37,
                        columnNumber: 11
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/object/listing/view/toolbar/toolbar.tsx",
                lineNumber: 34,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/object/listing/view/toolbar/toolbar.tsx",
            lineNumber: 29,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/object/listing/view/toolbar/toolbar.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, undefined);
};
_c = Toolbar;
var _c;
$RefreshReg$(_c, "Toolbar");

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
"./js/src/core/modules/search/modal/tabs/object/listing/view/top-bar/top-bar.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TopBar: () => (TopBar)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_components_toolbar_toolbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/toolbar/toolbar.tsx");
/* ESM import */var _Pimcore_modules_data_object_listing_decorator_class_definition_selection_components_class_definition_select_class_definition_select__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/data-object/listing/decorator/class-definition-selection/components/class-definition-select/class-definition-select.tsx");
/* ESM import */var _Pimcore_modules_element_components_type_select_provided_type_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/element/components/type-select/provided-type-select.tsx");
/* ESM import */var _Pimcore_modules_element_listing_decorators_general_filters_view_layer_components_search_search_term_filter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/general-filters/view-layer/components/search/search-term-filter.tsx");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_5__);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 






const TopBar = ()=>{
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_toolbar_toolbar__WEBPACK_IMPORTED_MODULE_1__.Toolbar, {
        borderStyle: "default",
        padding: {
            left: 'none',
            right: 'none'
        },
        position: "top",
        theme: "secondary",
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_5__.Flex, {
            className: "w-full",
            gap: 'small',
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_components_type_select_provided_type_select__WEBPACK_IMPORTED_MODULE_3__.ProvidedTypeSelect, {}, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/object/listing/view/top-bar/top-bar.tsx",
                    lineNumber: 33,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_data_object_listing_decorator_class_definition_selection_components_class_definition_select_class_definition_select__WEBPACK_IMPORTED_MODULE_2__.ClassDefinitionSelect, {
                    nullable: true
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/object/listing/view/top-bar/top-bar.tsx",
                    lineNumber: 34,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_listing_decorators_general_filters_view_layer_components_search_search_term_filter__WEBPACK_IMPORTED_MODULE_4__.SearchTermFilter, {}, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/object/listing/view/top-bar/top-bar.tsx",
                    lineNumber: 35,
                    columnNumber: 9
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/object/listing/view/top-bar/top-bar.tsx",
            lineNumber: 29,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/object/listing/view/top-bar/top-bar.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, undefined);
};
_c = TopBar;
var _c;
$RefreshReg$(_c, "TopBar");

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
"./js/src/core/modules/search/modal/tabs/object/listing/view/view-layer/views/default-view.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DefaultView: () => (DefaultView)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/content/content.tsx");
/* ESM import */var _Pimcore_components_content_layout_content_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/content-layout/content-layout.tsx");
/* ESM import */var _Pimcore_modules_element_listing_abstract_data_layer_provider_data_use_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/element/listing/abstract/data-layer/provider/data/use-data.tsx");
/* ESM import */var _Pimcore_modules_element_listing_abstract_view_layer_components_sidebar_sidebar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/element/listing/abstract/view-layer/components/sidebar/sidebar.tsx");
/* ESM import */var _Pimcore_modules_element_listing_abstract_view_layer_components_grid_grid_container__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/element/listing/abstract/view-layer/components/grid/grid-container.tsx");
/* ESM import */var _top_bar_top_bar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/search/modal/tabs/object/listing/view/top-bar/top-bar.tsx");
/* ESM import */var _toolbar_toolbar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/search/modal/tabs/object/listing/view/toolbar/toolbar.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
var _s = $RefreshSig$();








const DefaultView = ()=>{
    _s();
    const { dataQueryResult } = (0,_Pimcore_modules_element_listing_abstract_data_layer_provider_data_use_data__WEBPACK_IMPORTED_MODULE_4__.useData)();
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                dataQueryResult === undefined && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_2__.Content, {
                    loading: true
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/object/listing/view/view-layer/views/default-view.tsx",
                    lineNumber: 28,
                    columnNumber: 42
                }, undefined),
                dataQueryResult !== undefined && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_layout_content_layout__WEBPACK_IMPORTED_MODULE_3__.ContentLayout, {
                    renderToolbar: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_toolbar_toolbar__WEBPACK_IMPORTED_MODULE_8__.Toolbar, {}, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/object/listing/view/view-layer/views/default-view.tsx",
                        lineNumber: 31,
                        columnNumber: 27
                    }, void 0),
                    renderTopBar: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_top_bar_top_bar__WEBPACK_IMPORTED_MODULE_7__.TopBar, {}, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/object/listing/view/view-layer/views/default-view.tsx",
                        lineNumber: 32,
                        columnNumber: 26
                    }, void 0),
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_layout_content_layout__WEBPACK_IMPORTED_MODULE_3__.ContentLayout, {
                        renderSidebar: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_listing_abstract_view_layer_components_sidebar_sidebar__WEBPACK_IMPORTED_MODULE_5__.Sidebar, {}, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/object/listing/view/view-layer/views/default-view.tsx",
                            lineNumber: 35,
                            columnNumber: 29
                        }, void 0),
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_listing_abstract_view_layer_components_grid_grid_container__WEBPACK_IMPORTED_MODULE_6__.GridContainer, {}, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/object/listing/view/view-layer/views/default-view.tsx",
                            lineNumber: 37,
                            columnNumber: 13
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/object/listing/view/view-layer/views/default-view.tsx",
                        lineNumber: 34,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/object/listing/view/view-layer/views/default-view.tsx",
                    lineNumber: 30,
                    columnNumber: 9
                }, undefined)
            ]
        }, void 0, true), [
        dataQueryResult
    ]);
};
_s(DefaultView, "9qJdQRCeNoDij9m8TwTKifY8g2A=", false, function() {
    return [
        _Pimcore_modules_element_listing_abstract_data_layer_provider_data_use_data__WEBPACK_IMPORTED_MODULE_4__.useData
    ];
});
_c = DefaultView;
var _c;
$RefreshReg$(_c, "DefaultView");

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
"./js/src/core/modules/search/modal/tabs/object/object-tab.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ObjectTab: () => (ObjectTab)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _listing_object_search_listing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/search/modal/tabs/object/listing/object-search-listing.tsx");
/* ESM import */var _Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/content/content.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 



const ObjectTab = ()=>{
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_3__.Content, {
        style: {
            height: '65vh'
        },
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_listing_object_search_listing__WEBPACK_IMPORTED_MODULE_2__.ObjectSearchListing, {}, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/object/object-tab.tsx",
            lineNumber: 21,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/modal/tabs/object/object-tab.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, undefined);
};
_c = ObjectTab;
var _c;
$RefreshReg$(_c, "ObjectTab");

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
"./js/src/core/modules/search/provider/search-provider.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SearchContext: () => (SearchContext),
  SearchProvider: () => (SearchProvider)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
var _s = $RefreshSig$();

const SearchContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(undefined);
const SearchProvider = (props)=>{
    _s();
    const [open, setOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(SearchContext.Provider, {
            value: {
                open,
                setOpen
            },
            children: props.children
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/provider/search-provider.tsx",
            lineNumber: 33,
            columnNumber: 5
        }, undefined), [
        open
    ]);
};
_s(SearchProvider, "Q/R62h0AHeEs8YPchGQPN8+HFZI=");
_c = SearchProvider;
var _c;
$RefreshReg$(_c, "SearchProvider");

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
"./js/src/core/modules/search/provider/use-search.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useSearch: () => (useSearch)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _search_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/search/provider/search-provider.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 

const useSearch = ()=>{
    const context = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_search_provider__WEBPACK_IMPORTED_MODULE_1__.SearchContext);
    if (context === undefined) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    const open = ()=>{
        context.setOpen(true);
    };
    const close = ()=>{
        context.setOpen(false);
    };
    return {
        isOpen: context.open,
        open,
        close
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
"./js/src/core/modules/search/search-api-slice-enhanced.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useSimpleSearchGetQuery: () => (useSimpleSearchGetQuery)
});
/* ESM import */var _search_api_slice_gen__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/search/search-api-slice.gen.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
_search_api_slice_gen__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    endpoints: {
        simpleSearchGet: {
            keepUnusedDataFor: 5
        }
    }
});
const { useSimpleSearchGetQuery } = _search_api_slice_gen__WEBPACK_IMPORTED_MODULE_0__.api;

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
"./js/src/core/modules/search/search.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyles: () => (useStyles)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/antd-style/es/functions/index.js");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
const useStyles = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param)=>{
    let { token, css } = param;
    return {
        detailContent: css`
      max-height: 400px;
    `,
        searchResultImage: css`
      min-height: 100px;
      max-height: 200px;
    `,
        searchResultDocument: css`
      iframe {
        width: 100%;
        height: 100%;
      }
    `
    };
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
"./js/src/core/modules/search/search.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Search: () => (Search)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _triggers_button_search_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/search/triggers/button/search-button.tsx");
/* ESM import */var _modal_search_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/search/modal/search-modal.tsx");
/* ESM import */var _provider_search_provider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/search/provider/search-provider.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 




const Search = ()=>{
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_provider_search_provider__WEBPACK_IMPORTED_MODULE_4__.SearchProvider, {
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_triggers_button_search_button__WEBPACK_IMPORTED_MODULE_2__.SearchButton, {}, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/search.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_modal_search_modal__WEBPACK_IMPORTED_MODULE_3__.SearchModal, {}, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/search.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/search.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, undefined);
};
_c = Search;
var _c;
$RefreshReg$(_c, "Search");

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
"./js/src/core/modules/search/triggers/button/search-button.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SearchButton: () => (SearchButton)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/icon-button/icon-button.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _provider_use_search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/search/provider/use-search.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
var _s = $RefreshSig$();



const SearchButton = ()=>{
    _s();
    const { open } = (0,_provider_use_search__WEBPACK_IMPORTED_MODULE_3__.useSearch)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_1__.IconButton, {
        icon: {
            value: 'search'
        },
        onClick: ()=>{
            open();
        },
        type: "text"
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/search/triggers/button/search-button.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, undefined);
};
_s(SearchButton, "lSbe7f9uMjA1emNdbm0lPYflggM=", false, function() {
    return [
        _provider_use_search__WEBPACK_IMPORTED_MODULE_3__.useSearch
    ];
});
_c = SearchButton;
var _c;
$RefreshReg$(_c, "SearchButton");

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
"./js/src/core/modules/widget-manager/context-menu/context-menu.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  createContextMenuItems: () => (createContextMenuItems)
});
/* ESM import */var _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/depency-injection/index.ts");
/* ESM import */var _Pimcore_app_config_services_service_ids__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/app/config/services/service-ids.ts");
/* ESM import */var i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/i18next/dist/esm/i18next.js");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 


const createContextMenuItems = (param)=>{
    let { contextMenuState, closeContextMenu, model, closeWidget } = param;
    return [
        {
            key: 'close-tab',
            label: (0,i18next__WEBPACK_IMPORTED_MODULE_2__.t)('close-tab'),
            onClick: ()=>{
                if (contextMenuState !== null) {
                    closeWidget(contextMenuState.tabNode.getId());
                    closeContextMenu();
                }
            }
        },
        {
            key: 'close-others',
            label: (0,i18next__WEBPACK_IMPORTED_MODULE_2__.t)('close-others'),
            onClick: ()=>{
                if (contextMenuState !== null) {
                    var _model_getActiveTabset;
                    (_model_getActiveTabset = model.getActiveTabset()) === null || _model_getActiveTabset === void 0 ? void 0 : _model_getActiveTabset.getChildren().forEach((tabNode)=>{
                        if (tabNode.getId() !== contextMenuState.tabNode.getId()) {
                            closeWidget(tabNode.getId());
                        }
                    });
                    closeContextMenu();
                }
            }
        },
        {
            key: 'close-unmodified',
            label: (0,i18next__WEBPACK_IMPORTED_MODULE_2__.t)('close-unmodified'),
            onClick: ()=>{
                if (contextMenuState !== null) {
                    var _model_getActiveTabset;
                    const widgetRegistryService = _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_0__.container.get(_Pimcore_app_config_services_service_ids__WEBPACK_IMPORTED_MODULE_1__.serviceIds.widgetManager);
                    (_model_getActiveTabset = model.getActiveTabset()) === null || _model_getActiveTabset === void 0 ? void 0 : _model_getActiveTabset.getChildren().forEach((tabNode)=>{
                        const component = widgetRegistryService.getWidget(tabNode.getComponent() ?? '');
                        const isModified = component === null || component === void 0 ? void 0 : component.isModified;
                        if (isModified !== undefined && isModified(tabNode)) {
                            return;
                        }
                        closeWidget(tabNode.getId());
                    });
                    closeContextMenu();
                }
            }
        },
        {
            key: 'close-all',
            label: (0,i18next__WEBPACK_IMPORTED_MODULE_2__.t)('close-all'),
            onClick: ()=>{
                if (contextMenuState !== null) {
                    var _model_getActiveTabset;
                    (_model_getActiveTabset = model.getActiveTabset()) === null || _model_getActiveTabset === void 0 ? void 0 : _model_getActiveTabset.getChildren().forEach((tabNode)=>{
                        closeWidget(tabNode.getId());
                    });
                    closeContextMenu();
                }
            }
        }
    ];
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
"./js/src/core/modules/widget-manager/hooks/use-context-menu.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useContextMenu: () => (useContextMenu)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/dropdown/dropdown.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var flexlayout_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/flexlayout-react/lib/index.js");
/* ESM import */var flexlayout_react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flexlayout_react__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var _Pimcore_modules_widget_manager_hooks_use_widget_manager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/widget-manager/hooks/use-widget-manager.ts");
/* ESM import */var _Pimcore_utils_hooks_use_click_outside__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/utils/hooks/use-click-outside.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
var _s = $RefreshSig$();






const useContextMenu = (model, createContextMenuItems)=>{
    _s();
    const [contextMenuState, setContextMenuState] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(null);
    const dropdownRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
    const { closeWidget } = (0,_Pimcore_modules_widget_manager_hooks_use_widget_manager__WEBPACK_IMPORTED_MODULE_5__.useWidgetManager)();
    const closeContextMenu = ()=>{
        setContextMenuState(null);
    };
    (0,_Pimcore_utils_hooks_use_click_outside__WEBPACK_IMPORTED_MODULE_6__.useClickOutside)(dropdownRef, closeContextMenu);
    const showContextMenu = (node, event)=>{
        if (node instanceof flexlayout_react__WEBPACK_IMPORTED_MODULE_3__.TabNode) {
            event.preventDefault();
            setContextMenuState({
                x: event.clientX,
                y: event.clientY,
                tabNode: node
            });
            node.getExtraData();
        }
    };
    const menuItems = (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(()=>{
        if (contextMenuState !== null && !(0,lodash__WEBPACK_IMPORTED_MODULE_4__.isUndefined)(createContextMenuItems)) {
            return createContextMenuItems({
                contextMenuState,
                closeContextMenu,
                model,
                closeWidget
            });
        }
        return [];
    }, [
        contextMenuState,
        createContextMenuItems,
        model,
        closeWidget
    ]);
    const dropdown = contextMenuState !== null && !(0,lodash__WEBPACK_IMPORTED_MODULE_4__.isUndefined)(createContextMenuItems) ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_1__.Dropdown, {
        menu: {
            items: menuItems
        },
        menuRef: dropdownRef,
        open: true,
        overlayStyle: {
            position: 'absolute',
            left: contextMenuState.x,
            top: contextMenuState.y
        },
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {}, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/widget-manager/hooks/use-context-menu.tsx",
            lineNumber: 77,
            columnNumber: 9
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/widget-manager/hooks/use-context-menu.tsx",
        lineNumber: 71,
        columnNumber: 7
    }, undefined) : null;
    if (createContextMenuItems === undefined) {
        return {};
    }
    return {
        showContextMenu,
        dropdown
    };
};
_s(useContextMenu, "Ju/SvRe8AqhZMWX0nC4fVr4p+3o=", false, function() {
    return [
        _Pimcore_modules_widget_manager_hooks_use_widget_manager__WEBPACK_IMPORTED_MODULE_5__.useWidgetManager,
        _Pimcore_utils_hooks_use_click_outside__WEBPACK_IMPORTED_MODULE_6__.useClickOutside
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
"./js/src/core/modules/widget-manager/title/border-title-view.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  BorderTitleView: () => (BorderTitleView)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
var _s = $RefreshSig$();




const BorderTitleView = (param)=>{
    let { icon, title } = param;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.Tooltip, {
        placement: 'right',
        title: t(title),
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_1__.Icon, {
                options: {
                    width: 16,
                    height: 16
                },
                ...icon
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/widget-manager/title/border-title-view.tsx",
                lineNumber: 34,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/widget-manager/title/border-title-view.tsx",
            lineNumber: 33,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/widget-manager/title/border-title-view.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, undefined);
};
_s(BorderTitleView, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation
    ];
});
_c = BorderTitleView;
var _c;
$RefreshReg$(_c, "BorderTitleView");

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
"./js/src/core/modules/widget-manager/title/tab-title-container.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TabTitleContainer: () => (TabTitleContainer)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var flexlayout_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/flexlayout-react/lib/index.js");
/* ESM import */var flexlayout_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flexlayout_react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _border_title_view__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/widget-manager/title/border-title-view.tsx");
/* ESM import */var _tab_title_view__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/widget-manager/title/tab-title-view.tsx");
/* ESM import */var _hooks_use_widget_manager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/widget-manager/hooks/use-widget-manager.ts");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_7__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
var _s = $RefreshSig$();







const TabTitleContainer = (param)=>{
    let { node, modified } = param;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_6__.useTranslation)();
    const [isBorderNode] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(node.getParent() instanceof flexlayout_react__WEBPACK_IMPORTED_MODULE_1__.BorderNode);
    const config = node.getConfig();
    const icon = config.icon ?? {
        value: 'widget-default',
        type: 'name'
    };
    const title = (0,lodash__WEBPACK_IMPORTED_MODULE_7__.isString)(config.translationKey) ? t(config.translationKey) : node.getName();
    const { closeWidget } = (0,_hooks_use_widget_manager__WEBPACK_IMPORTED_MODULE_5__.useWidgetManager)();
    const isCloseable = node.isEnableClose();
    const onClose = ()=>{
        if (modified === false || modified === undefined) {
            closeWidget(node.getId());
        }
    };
    const onConfirm = ()=>{
        closeWidget(node.getId());
    };
    if (isBorderNode) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_border_title_view__WEBPACK_IMPORTED_MODULE_3__.BorderTitleView, {
            icon: icon,
            title: t(`${node.getName()}`)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/widget-manager/title/tab-title-container.tsx",
            lineNumber: 50,
            columnNumber: 7
        }, undefined);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_tab_title_view__WEBPACK_IMPORTED_MODULE_4__.TabTitleView, {
        icon: icon,
        onClose: isCloseable ? onClose : undefined,
        onConfirm: modified === true ? onConfirm : undefined,
        title: getTitle()
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/widget-manager/title/tab-title-container.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, undefined);
    function getTitle() {
        return title + (modified === true ? '*' : '');
    }
};
_s(TabTitleContainer, "jpKM+hDH5PHR1fjpJqDYkOgiMQ0=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_6__.useTranslation,
        _hooks_use_widget_manager__WEBPACK_IMPORTED_MODULE_5__.useWidgetManager
    ];
});
_c = TabTitleContainer;
var _c;
$RefreshReg$(_c, "TabTitleContainer");

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
"./js/src/core/modules/widget-manager/title/tab-title-outer-container.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TabTitleOuterContainer: () => (TabTitleOuterContainer)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/app/depency-injection/index.ts");
/* ESM import */var _tab_title_container__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/widget-manager/title/tab-title-container.tsx");
/* ESM import */var _Pimcore_app_config_services_service_ids__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/app/config/services/service-ids.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
var _s = $RefreshSig$();




const TabTitleOuterContainer = (param)=>{
    let { node } = param;
    _s();
    const componentName = node.getComponent();
    const widgetConfig = (0,_Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_2__.useInjection)(_Pimcore_app_config_services_service_ids__WEBPACK_IMPORTED_MODULE_4__.serviceIds.widgetManager);
    const config = widgetConfig.getWidget(componentName);
    let Component = /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_tab_title_container__WEBPACK_IMPORTED_MODULE_3__.TabTitleContainer, {
        modified: false,
        node: node
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/widget-manager/title/tab-title-outer-container.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, undefined);
    if ((config === null || config === void 0 ? void 0 : config.titleComponent) !== undefined) {
        Component = /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(config.titleComponent, {
            node: node
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/widget-manager/title/tab-title-outer-container.tsx",
            lineNumber: 38,
            columnNumber: 17
        }, undefined);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            " ",
            Component,
            " "
        ]
    }, void 0, true);
};
_s(TabTitleOuterContainer, "AYJz77Dwb2+tu88upn1bQCuyym8=", false, function() {
    return [
        _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_2__.useInjection
    ];
});
_c = TabTitleOuterContainer;
var _c;
$RefreshReg$(_c, "TabTitleOuterContainer");

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
"./js/src/core/modules/widget-manager/title/tab-title-view.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyles: () => (useStyles)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/antd-style/es/functions/index.js");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
const useStyles = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param)=>{
    let { token, css } = param;
    return {
        title: css`
      .ant-space-item {
        display: flex;
        align-items: center;
      }
    `
    };
}, {
    hashPriority: 'low'
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
"./js/src/core/modules/widget-manager/title/tab-title-view.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TabTitleView: () => (TabTitleView)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/button/button.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var _tab_title_view_styles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/widget-manager/title/tab-title-view.styles.ts");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_components_space_space__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/space/space.tsx");
/* ESM import */var _Pimcore_components_filename_filename__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/filename/filename.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
var _s = $RefreshSig$();








const TabTitleView = (param)=>{
    let { icon, title, onClose, onConfirm } = param;
    _s();
    const { styles } = (0,_tab_title_view_styles__WEBPACK_IMPORTED_MODULE_5__.useStyles)();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_6__.useTranslation)();
    const triggerClose = ()=>{
        onClose === null || onClose === void 0 ? void 0 : onClose();
    };
    const triggerConfirm = ()=>{
        onConfirm === null || onConfirm === void 0 ? void 0 : onConfirm();
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_space_space__WEBPACK_IMPORTED_MODULE_7__.Space, {
        className: [
            'widget-manager-tab-title',
            styles.title
        ].join(' '),
        size: "mini",
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_1__.Icon, {
                options: {
                    width: 16,
                    height: 16
                },
                ...icon
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/widget-manager/title/tab-title-view.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_filename_filename__WEBPACK_IMPORTED_MODULE_8__.Filename, {
                ellipsis: true,
                style: {
                    maxWidth: '300px',
                    color: 'inherit'
                },
                value: title
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/widget-manager/title/tab-title-view.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, undefined),
            onClose !== undefined && onConfirm !== undefined && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Popconfirm, {
                onConfirm: triggerConfirm,
                title: t('widget-manager.tab-title.close-confirmation'),
                children: renderCloseButton()
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/widget-manager/title/tab-title-view.tsx",
                lineNumber: 60,
                columnNumber: 9
            }, undefined),
            onClose !== undefined && onConfirm === undefined && renderCloseButton()
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/widget-manager/title/tab-title-view.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, undefined);
    function renderCloseButton() {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_3__.Button, {
            className: "widget-manager__tab-title-close-button",
            onClick: triggerClose,
            onMouseDown: (event)=>{
                event.stopPropagation();
            },
            type: 'link',
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_1__.Icon, {
                options: {
                    width: 14,
                    height: 14
                },
                value: "close"
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/widget-manager/title/tab-title-view.tsx",
                lineNumber: 80,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/widget-manager/title/tab-title-view.tsx",
            lineNumber: 74,
            columnNumber: 7
        }, this);
    }
};
_s(TabTitleView, "npbODhKiVXMAM/EtpCiaKc7TtqU=", false, function() {
    return [
        _tab_title_view_styles__WEBPACK_IMPORTED_MODULE_5__.useStyles,
        react_i18next__WEBPACK_IMPORTED_MODULE_6__.useTranslation
    ];
});
_c = TabTitleView;
var _c;
$RefreshReg$(_c, "TabTitleView");

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
"./js/src/core/modules/widget-manager/utils/widget-manager-factory.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  widgetManagerFactory: () => (widgetManagerFactory)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_modules_widget_manager_widget_widget_container__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/widget-manager/widget/widget-container.tsx");
/* ESM import */var _widget_manager_inner_container__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/widget-manager/widget-manager-inner-container.tsx");
/* ESM import */var _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/app/depency-injection/index.ts");
/* ESM import */var _Pimcore_app_config_services_service_ids__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/app/config/services/service-ids.ts");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 






const widgetManagerFactory = (node)=>{
    if (node.getComponent() === 'inner-widget-manager') {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_widget_manager_inner_container__WEBPACK_IMPORTED_MODULE_3__.WidgetManagerInnerContainer, {}, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/widget-manager/utils/widget-manager-factory.tsx",
            lineNumber: 25,
            columnNumber: 12
        }, undefined);
    }
    const widgetRegistryService = _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_4__.container.get(_Pimcore_app_config_services_service_ids__WEBPACK_IMPORTED_MODULE_5__.serviceIds.widgetManager);
    const widgetName = node.getComponent();
    if (widgetName === undefined) {
        return undefined;
    }
    const widget = widgetRegistryService.getWidget(widgetName);
    if (widget === undefined) {
        (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_6__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_6__.GeneralError(`Widget ${widgetName} not found`));
        return undefined;
    }
    const { component } = widget;
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_widget_manager_widget_widget_container__WEBPACK_IMPORTED_MODULE_2__.WidgetContainer, {
        component: component,
        node: node
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/widget-manager/utils/widget-manager-factory.tsx",
        lineNumber: 46,
        columnNumber: 5
    }, undefined);
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
"./js/src/core/modules/widget-manager/widget-manager-container.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  WidgetManagerContainer: () => (WidgetManagerContainer)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _widget_manager_view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/widget-manager/widget-manager-view.tsx");
/* ESM import */var _utils_widget_manager_factory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/widget-manager/utils/widget-manager-factory.tsx");
/* ESM import */var flexlayout_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/flexlayout-react/lib/index.js");
/* ESM import */var flexlayout_react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flexlayout_react__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var _Pimcore_app_store_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _widget_manager_slice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/widget-manager/widget-manager-slice.ts");
/* ESM import */var _title_tab_title_container__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/widget-manager/title/tab-title-container.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
var _s = $RefreshSig$();







const WidgetManagerContainer = ()=>{
    _s();
    const modelJson = (0,_Pimcore_app_store_index__WEBPACK_IMPORTED_MODULE_5__.useAppSelector)(_widget_manager_slice__WEBPACK_IMPORTED_MODULE_6__.selectOuterModel);
    const dispatch = (0,_Pimcore_app_store_index__WEBPACK_IMPORTED_MODULE_5__.useAppDispatch)();
    const model = flexlayout_react__WEBPACK_IMPORTED_MODULE_4__.Model.fromJson(modelJson);
    const bottomTabset = model.getNodeById('bottom_tabset');
    model.doAction(flexlayout_react__WEBPACK_IMPORTED_MODULE_4__.Actions.updateModelAttributes({
        tabSetTabStripHeight: 34,
        tabSetTabHeaderHeight: 34,
        borderBarSize: 50
    }));
    if (bottomTabset.getChildren().length === 0) {
        model.doAction(flexlayout_react__WEBPACK_IMPORTED_MODULE_4__.Actions.updateNodeAttributes(bottomTabset.getId(), {
            height: -8
        }));
    } else if (bottomTabset.getHeight() === -8) {
        model.doAction(flexlayout_react__WEBPACK_IMPORTED_MODULE_4__.Actions.updateNodeAttributes(bottomTabset.getId(), {
            height: 34
        }));
    }
    function onModelChange(model) {
        dispatch((0,_widget_manager_slice__WEBPACK_IMPORTED_MODULE_6__.updateOuterModel)(model.toJson()));
    }
    function onRenderTab(node, renderValues) {
        renderValues.content = /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_title_tab_title_container__WEBPACK_IMPORTED_MODULE_7__.TabTitleContainer, {
            node: node
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/widget-manager/widget-manager-container.tsx",
            lineNumber: 45,
            columnNumber: 28
        }, this);
        renderValues.leading = /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}, void 0, false);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_widget_manager_view__WEBPACK_IMPORTED_MODULE_2__.WidgetManagerView, {
        factory: _utils_widget_manager_factory__WEBPACK_IMPORTED_MODULE_3__.widgetManagerFactory,
        model: model,
        onModelChange: onModelChange,
        onRenderTab: onRenderTab
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/widget-manager/widget-manager-container.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, undefined);
};
_s(WidgetManagerContainer, "Ojsa3NuTmYn2jLnej7ThHwMqN6M=", false, function() {
    return [
        _Pimcore_app_store_index__WEBPACK_IMPORTED_MODULE_5__.useAppSelector,
        _Pimcore_app_store_index__WEBPACK_IMPORTED_MODULE_5__.useAppDispatch
    ];
});
_c = WidgetManagerContainer;
var _c;
$RefreshReg$(_c, "WidgetManagerContainer");

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
"./js/src/core/modules/widget-manager/widget-manager-inner-container.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  WidgetManagerInnerContainer: () => (MemoizedWidgetManagerInnerContainer)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _widget_manager_view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/widget-manager/widget-manager-view.tsx");
/* ESM import */var _utils_widget_manager_factory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/widget-manager/utils/widget-manager-factory.tsx");
/* ESM import */var flexlayout_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/flexlayout-react/lib/index.js");
/* ESM import */var flexlayout_react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flexlayout_react__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var _Pimcore_app_store_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _widget_manager_slice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/widget-manager/widget-manager-slice.ts");
/* ESM import */var _title_tab_title_outer_container__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/widget-manager/title/tab-title-outer-container.tsx");
/* ESM import */var _Pimcore_modules_widget_manager_context_menu_context_menu__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/widget-manager/context-menu/context-menu.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
var _s = $RefreshSig$();








const WidgetManagerInnerContainer = ()=>{
    _s();
    const modelJson = (0,_Pimcore_app_store_index__WEBPACK_IMPORTED_MODULE_5__.useAppSelector)(_widget_manager_slice__WEBPACK_IMPORTED_MODULE_6__.selectInnerModel);
    const dispatch = (0,_Pimcore_app_store_index__WEBPACK_IMPORTED_MODULE_5__.useAppDispatch)();
    const model = flexlayout_react__WEBPACK_IMPORTED_MODULE_4__.Model.fromJson(modelJson);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        model.doAction(flexlayout_react__WEBPACK_IMPORTED_MODULE_4__.Actions.updateModelAttributes({
            tabSetTabStripHeight: 34,
            tabSetTabHeaderHeight: 34,
            borderBarSize: 50
        }));
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        var _model_getActiveTabset;
        const selectedNode = (_model_getActiveTabset = model.getActiveTabset()) === null || _model_getActiveTabset === void 0 ? void 0 : _model_getActiveTabset.getSelectedNode();
        if (selectedNode !== undefined) {
            dispatch((0,_widget_manager_slice__WEBPACK_IMPORTED_MODULE_6__.updateMainWidgetContext)({
                nodeId: selectedNode.getId()
            }));
        } else {
            dispatch((0,_widget_manager_slice__WEBPACK_IMPORTED_MODULE_6__.updateMainWidgetContext)(null));
        }
    }, [
        model
    ]);
    function onModelChange(model) {
        dispatch((0,_widget_manager_slice__WEBPACK_IMPORTED_MODULE_6__.updateInnerModel)(model.toJson()));
    }
    function onRenderTab(node, renderValues) {
        renderValues.content = /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_title_tab_title_outer_container__WEBPACK_IMPORTED_MODULE_7__.TabTitleOuterContainer, {
            node: node
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/widget-manager/widget-manager-inner-container.tsx",
            lineNumber: 53,
            columnNumber: 28
        }, this);
        renderValues.leading = /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}, void 0, false);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_widget_manager_view__WEBPACK_IMPORTED_MODULE_2__.WidgetManagerView, {
        className: "widget-manager--inner",
        createContextMenuItems: _Pimcore_modules_widget_manager_context_menu_context_menu__WEBPACK_IMPORTED_MODULE_8__.createContextMenuItems,
        factory: _utils_widget_manager_factory__WEBPACK_IMPORTED_MODULE_3__.widgetManagerFactory,
        model: model,
        onModelChange: onModelChange,
        onRenderTab: onRenderTab
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/widget-manager/widget-manager-inner-container.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, undefined);
};
_s(WidgetManagerInnerContainer, "ClKaimE0FqamNL6bjEVoHVJUQx4=", false, function() {
    return [
        _Pimcore_app_store_index__WEBPACK_IMPORTED_MODULE_5__.useAppSelector,
        _Pimcore_app_store_index__WEBPACK_IMPORTED_MODULE_5__.useAppDispatch
    ];
});
_c = WidgetManagerInnerContainer;
const MemoizedWidgetManagerInnerContainer = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.memo)(WidgetManagerInnerContainer);
_c1 = MemoizedWidgetManagerInnerContainer;

var _c, _c1;
$RefreshReg$(_c, "WidgetManagerInnerContainer");
$RefreshReg$(_c1, "MemoizedWidgetManagerInnerContainer");

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
"./js/src/core/modules/widget-manager/widget-manager-view.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  getTabTokens: () => (getTabTokens),
  useStyles: () => (useStyles)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/antd-style/es/functions/index.js");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
const getTabTokens = (token)=>{
    let tabTokens = {
        zIndexPopup: token.zIndexPopupBase + 50,
        cardBg: token.colorFillAlter,
        cardHeight: token.controlHeightLG,
        // Initialize with empty string, because cardPadding will be calculated with cardHeight by default.
        cardPadding: '',
        cardPaddingSM: `${token.paddingXXS * 1.5}px ${token.padding}px`,
        cardPaddingLG: `${token.paddingXS}px ${token.padding}px ${token.paddingXXS * 1.5}px`,
        titleFontSize: `${token.fontSize}px`,
        titleFontSizeLG: `${token.fontSizeLG}px`,
        titleFontSizeSM: `${token.fontSize}px`,
        inkBarColor: token.colorPrimary,
        horizontalMargin: `0 0 ${token.margin}px 0`,
        horizontalItemGutter: 32,
        // Initialize with empty string, because horizontalItemMargin will be calculated with horizontalItemGutter by default.
        horizontalItemMargin: '',
        horizontalItemMarginRTL: '',
        horizontalItemPadding: `${token.paddingSM}px 0`,
        horizontalItemPaddingSM: `${token.paddingXS}px 0`,
        horizontalItemPaddingLG: `${token.padding}px 0`,
        verticalItemPadding: `${token.paddingXS}px ${token.paddingLG}px`,
        verticalItemMargin: `${token.margin}px 0 0 0`,
        itemSelectedColor: token.colorPrimary,
        itemHoverColor: token.colorPrimaryHover,
        itemActiveColor: token.colorPrimaryActive,
        cardGutter: token.marginXXS / 2,
        ...(token === null || token === void 0 ? void 0 : token.Tabs) ?? {}
    };
    tabTokens = {
        ...tabTokens,
        tabsCardPadding: token.cardPadding ?? `${(tabTokens.cardHeight - Math.round(token.fontSize * token.lineHeight)) / 2 - token.lineWidth}px ${token.paddingSM}px`,
        dropdownEdgeChildVerticalPadding: token.paddingXXS,
        tabsActiveTextShadow: '0 0 0.25px currentcolor',
        tabsDropdownHeight: 200,
        tabsDropdownWidth: 120,
        tabsHorizontalItemMargin: `0 0 0 ${token.horizontalItemGutter}px`,
        tabsHorizontalItemMarginRTL: `0 0 0 ${token.horizontalItemGutter}px`
    };
    return tabTokens;
};
const useStyles = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param)=>{
    let { token, css } = param;
    const tabToken = getTabTokens(token);
    return {
        widgetManager: css`
        position: absolute;
        inset: 8px 6px 12px 6px;
  
        .flexlayout__layout {
          overflow: visible;
        }
  
        &.widget-manager--inner {
          inset: 0;
        }
  
        .flexlayout__tab_button_leading,
        .flexlayout__border_button_leading {
          display: none;
        }
  
        .flexlayout__tab_button {
          margin: 0;
          padding: ${token.paddingSM}px ${token.paddingSM}px;
          background: ${token.colorFillAlter};
          transition: all ${token.motionDurationSlow} ${token.motionEaseInOut};
          font-size: ${token.fontSize}px;
          color: ${tabToken.itemColor};
          outline: none;
          gap: ${token.marginXXS}px;
        
          &:hover {
            background: ${token.Tabs.colorBgHoverUnselectedTab};
          }
  
          &_trailing {
            display: none;
          }
  
          &--selected {
            font-weight: ${token.fontWeightStrong};
            color: ${tabToken.itemActiveColor};
            background: ${token.colorBgContainer};
            border-top: 2px solid ${token.Tabs.colorBorderActiveTab};

            .widget-manager__tab-title-close-button {
              display: block;
            }
  
            .widget-manager-tab-title {
              margin-top: -2px;
            }
  
            &:hover {
              background: ${token.colorBgContainer};
            }
          }

          .flexlayout__tab_button_trailing {
            margin-top: -2px;
            display: none;
          }
  
          &:focus:not(:focus-visible), &:active {
            color: ${tabToken.itemActiveColor};
          }
  
          &:first-child {
            border-left: 1px solid ${token.Tabs.colorBorderContainer}66;
          }
        }
  
        .flexlayout__tabset_tab_divider {
          width: ${tabToken.cardGutter}px;
        }
  
        .flexlayout__tab_button_top {
          border-radius: ${token.borderRadiusLG}px ${token.borderRadiusLG}px 0 0;
          border-bottom: 0;
        }
  
        .flexlayout__border_inner_tab_container {
          width: calc(100svh - 12px);
          justify-content: flex-end;
        }
  
        .flexlayout__border_inner_tab_container_left, .flexlayout__border_inner_tab_container_right {
          .flexlayout__border_tab_divider {
            width: 0;
          }
        }
  
        .flexlayout__splitter,
        .flexlayout__border,
        .flexlayout__tabset_tabbar_outer {
          background: transparent;
        }
  
        .flexlayout__tab {
          overflow: visible;
          background: ${token.colorBgContainer};
          box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.07), 2px 2px 0px 0px rgba(79, 78, 183, 0.05);
          border-bottom: 1px solid ${token.Tabs.colorBorderContainer}66;
          border-left: 1px solid ${token.Tabs.colorBorderContainer}66;
          border-radius: 0 8px 8px 8px;
        }

        .flexlayout__tab:not(.widget-manager-inner-container) {
          overflow: hidden;
        }
      
        .flexlayout__tab_border {
          box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.07), 2px 2px 0px 0px rgba(79, 78, 183, 0.05);
          border-top: 1px solid ${token.Tabs.colorBorderContainer}66;
          border-right: 1px solid ${token.Tabs.colorBorderContainer}66;
          border-bottom: 1px solid ${token.Tabs.colorBorderContainer}66;
          border-left: 1px solid ${token.Tabs.colorBorderContainer}66;
          border-radius: 8px;
        }
  
        .widget-manager-inner-container {
          background: transparent;
          box-shadow: none;
          border: 0;
        }
  
        .flexlayout__tabset {
          overflow: visible;
          border-radius: ${token.borderRadius}px;
          font-family: ${token.fontFamily};
  
          &, &-selected {
            background: transparent;
          }
        }
  
        .flexlayout__border {
          font-family: ${token.fontFamily};
        }
  
        .flexlayout__border_button {
          margin: 0 0 6px 0;
          background: transparent;
          width: 40px;
          justify-content: center;
          border-radius: ${token.borderRadiusSM}px;
          transition: all ${token.motionDurationSlow} ${token.motionEaseInOut};
  
          &--selected {
            color: ${tabToken.itemActiveColor};
            border-top: 1.5px solid ${token.colorBorderActive};
            background: ${token.controlItemBgHover};
          }
        }
  
        @media (hover: hover) {
          .flexlayout__border_button--unselected:hover {
            color: ${token.colorTextSecondary}; 
            background: ${token.controlItemBgActiveHover};
          }
          
          .flexlayout__tab_button--selected:hover {
            color: ${tabToken.itemActiveColor};
            background: ${token.colorBgContainer};
          }
        }
  
        .flexlayout__border_button_trailing {
          display: none;
        }
  
        .flexlayout__border_left {
          border-right: 0;
  
          .flexlayout__border_button_content {
            transform: rotate(90deg);
          }
        }
  
        .flexlayout__border_right {
          border-left: 0;
  
          .flexlayout__border_button_content {
            transform: rotate(-90deg);
          }
        }
  
        .flexlayout__tabset_tabbar_outer_top {
          border: 0;
        }
  
        .flexlayout__tabset_tabbar_inner_tab_container {
          padding-left: 0;
        }
  
        .flexlayout__border_toolbar {
          display: none;
        }

        .widget-manager__tab-title-close-button {
          display: none;
          width: 12px;
          height: 12px;
          padding: 4px;
          line-height: 0;
          margin-top: -8px;
          color: ${token.colorIcon};
        }
      `
    };
}, {
    hashPriority: 'low'
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
"./js/src/core/modules/widget-manager/widget-manager-view.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  WidgetManagerView: () => (WidgetManagerView)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var flexlayout_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/flexlayout-react/lib/index.js");
/* ESM import */var flexlayout_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flexlayout_react__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _widget_manager_view_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/widget-manager/widget-manager-view.styles.ts");
/* ESM import */var _Pimcore_modules_widget_manager_hooks_use_context_menu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/widget-manager/hooks/use-context-menu.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
var _s = $RefreshSig$();




const WidgetManagerView = (param)=>{
    let { className, createContextMenuItems, ...props } = param;
    _s();
    const { styles } = (0,_widget_manager_view_styles__WEBPACK_IMPORTED_MODULE_3__.useStyles)();
    const { showContextMenu, dropdown } = (0,_Pimcore_modules_widget_manager_hooks_use_context_menu__WEBPACK_IMPORTED_MODULE_4__.useContextMenu)(props.model, createContextMenuItems);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: [
            'widget-manager',
            className,
            styles.widgetManager
        ].join(' '),
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(flexlayout_react__WEBPACK_IMPORTED_MODULE_2__.Layout, {
                ...props,
                onContextMenu: showContextMenu
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/widget-manager/widget-manager-view.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, undefined),
            dropdown
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/widget-manager/widget-manager-view.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, undefined);
};
_s(WidgetManagerView, "IHQmMpTiL1rqjlabuNNf5Uehc6Q=", false, function() {
    return [
        _widget_manager_view_styles__WEBPACK_IMPORTED_MODULE_3__.useStyles,
        _Pimcore_modules_widget_manager_hooks_use_context_menu__WEBPACK_IMPORTED_MODULE_4__.useContextMenu
    ];
});
_c = WidgetManagerView;
var _c;
$RefreshReg$(_c, "WidgetManagerView");

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
"./js/src/core/modules/widget-manager/widget/title/title-view.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyles: () => (useStyles)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/antd-style/es/functions/index.js");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
const useStyles = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param)=>{
    let { token, css } = param;
    return {
        WidgetTitle: css`
      display: flex;
      padding: ${token.paddingXS}px ${token.paddingSM}px;
      gap: 8px;
      align-items: center;
      color: ${token.Tree.colorPrimaryHeading};
      font-weight: 600;
    `
    };
}, {
    hashPriority: 'low'
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
"./js/src/core/modules/widget-manager/widget/title/title-view.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TitleView: () => (TitleView)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _title_view_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/widget-manager/widget/title/title-view.styles.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
var _s = $RefreshSig$();



const TitleView = (props)=>{
    _s();
    const { styles } = (0,_title_view_styles__WEBPACK_IMPORTED_MODULE_3__.useStyles)();
    const { title, icon, className } = props;
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: [
            styles.WidgetTitle,
            className,
            'foobar'
        ].join(' '),
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_1__.Icon, {
                options: {
                    width: 18,
                    height: 18
                },
                ...icon
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/widget-manager/widget/title/title-view.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                children: title
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/widget-manager/widget/title/title-view.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/widget-manager/widget/title/title-view.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, undefined);
};
_s(TitleView, "1BGFRu6BGAbhzJ8kKgs1GUjvI6w=", false, function() {
    return [
        _title_view_styles__WEBPACK_IMPORTED_MODULE_3__.useStyles
    ];
});
_c = TitleView;

var _c;
$RefreshReg$(_c, "TitleView");

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
"./js/src/core/modules/widget-manager/widget/widget-container.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  WidgetContainer: () => (WidgetContainer),
  WidgetContext: () => (WidgetContext)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var flexlayout_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/flexlayout-react/lib/index.js");
/* ESM import */var flexlayout_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flexlayout_react__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_modules_widget_manager_widget_widget_view__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/widget-manager/widget/widget-view.tsx");
/* ESM import */var _Pimcore_modules_app_error_boundary_error_boundary__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/app/error-boundary/error-boundary.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
var _s = $RefreshSig$();




const WidgetContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({
    nodeId: null
});
const WidgetContainer = (props)=>{
    _s();
    const { node, component: Component } = props;
    const [nodeId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(node.getId());
    const isBorderNode = node.getParent() instanceof flexlayout_react__WEBPACK_IMPORTED_MODULE_2__.BorderNode;
    const config = node.getConfig();
    const icon = config.icon ?? {
        value: 'widget-default',
        type: 'name'
    };
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_app_error_boundary_error_boundary__WEBPACK_IMPORTED_MODULE_4__["default"], {
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(WidgetContext.Provider, {
                value: {
                    nodeId
                },
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_widget_manager_widget_widget_view__WEBPACK_IMPORTED_MODULE_3__.WidgetView, {
                    icon: icon,
                    showTitle: isBorderNode,
                    title: node.getName(),
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {
                        ...node.getConfig()
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/widget-manager/widget/widget-container.tsx",
                        lineNumber: 45,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/widget-manager/widget/widget-container.tsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/widget-manager/widget/widget-container.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/widget-manager/widget/widget-container.tsx",
            lineNumber: 38,
            columnNumber: 5
        }, undefined), [
        nodeId,
        isBorderNode
    ]);
};
_s(WidgetContainer, "gMcX8R5i7FJMfBwM885KeGViyUg=");
_c = WidgetContainer;

var _c;
$RefreshReg$(_c, "WidgetContainer");

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
"./js/src/core/modules/widget-manager/widget/widget-view.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyles: () => (useStyles)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/antd-style/es/functions/index.js");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
const useStyles = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param)=>{
    let { token, css } = param;
    return {
        Widget: css`
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      overflow: hidden;

      .widget__content {
        flex: 1;
        overflow: auto;
        contain: layout size;
        position: relative;
      }

      .widget__title {
        padding-top: ${token.paddingSM}px;
      }
    `
    };
}, {
    hashPriority: 'low'
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
"./js/src/core/modules/widget-manager/widget/widget-view.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  WIDGET_CONTENT_CLASS: () => (WIDGET_CONTENT_CLASS),
  WidgetView: () => (memorizedWidgetView),
  cssContainerWidget: () => (cssContainerWidget)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _title_title_view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/widget-manager/widget/title/title-view.tsx");
/* ESM import */var _widget_view_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/widget-manager/widget/widget-view.styles.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_utils_hooks_use_css_container_use_css_container__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/utils/hooks/use-css-container/use-css-container.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
var _s = $RefreshSig$();





const cssContainerWidget = {
    name: 'widget'
};
const WIDGET_CONTENT_CLASS = 'widget__content';
const WidgetView = (props)=>{
    _s();
    const { styleDefinition } = (0,_Pimcore_utils_hooks_use_css_container_use_css_container__WEBPACK_IMPORTED_MODULE_5__.useCssContainer)(cssContainerWidget);
    const { styles } = (0,_widget_view_styles__WEBPACK_IMPORTED_MODULE_3__.useStyles)();
    const { title, showTitle, icon, children } = props;
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: [
            'widget',
            styles.Widget,
            styleDefinition.styles.container
        ].join(' '),
        children: [
            showTitle === true && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_title_title_view__WEBPACK_IMPORTED_MODULE_2__.TitleView, {
                className: 'widget__title',
                icon: icon,
                title: t(title)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/widget-manager/widget/widget-view.tsx",
                lineNumber: 43,
                columnNumber: 9
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                className: WIDGET_CONTENT_CLASS,
                children: children
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/widget-manager/widget/widget-view.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/widget-manager/widget/widget-view.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, undefined);
};
_s(WidgetView, "0MXPyU/d3Pa9KibZ12tVTcTL/XU=", false, function() {
    return [
        _Pimcore_utils_hooks_use_css_container_use_css_container__WEBPACK_IMPORTED_MODULE_5__.useCssContainer,
        _widget_view_styles__WEBPACK_IMPORTED_MODULE_3__.useStyles,
        react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation
    ];
});
_c = WidgetView;
const memorizedWidgetView = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().memo(WidgetView);

var _c;
$RefreshReg$(_c, "WidgetView");

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
"./js/src/core/utils/hooks/use-css-container/use-css-container.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useCssContainerStyles: () => (useCssContainerStyles)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/antd-style/es/functions/index.js");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
const useCssContainerStyles = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param, props)=>{
    let { token, css } = param;
    return {
        container: css`
      container: ${props.name} / ${props.type};
    `
    };
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
"./js/src/core/utils/hooks/use-css-container/use-css-container.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useCssContainer: () => (useCssContainer)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _use_css_container_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/utils/hooks/use-css-container/use-css-container.styles.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ var _s = $RefreshSig$();


const useCssContainer = (param)=>{
    let { name, type = 'size' } = param;
    _s();
    const styleDefinition = (0,_use_css_container_styles__WEBPACK_IMPORTED_MODULE_1__.useCssContainerStyles)({
        name,
        type
    });
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>{
        return {
            styleDefinition
        };
    }, []);
};
_s(useCssContainer, "PIiD9o0qklDMaExOy5szBdc4ynE=", false, function() {
    return [
        _use_css_container_styles__WEBPACK_IMPORTED_MODULE_1__.useCssContainerStyles
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
"./js/src/core/utils/hooks/use-server-side-event.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useServerSideEvent: () => (useServerSideEvent)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _Pimcore_app_config_app_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/app/config/app-config.ts");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 


const ServerSideEventDomain = _Pimcore_app_config_app_config__WEBPACK_IMPORTED_MODULE_1__.appConfig.mercureUrl;
const useServerSideEvent = (param)=>{
    let { topics, messageHandler, openHandler } = param;
    let event;
    if (topics.length === 0) {
        (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_2__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_2__.GeneralError('No topics provided'));
    }
    function open() {
        const url = new URL(ServerSideEventDomain);
        topics.forEach((topic)=>{
            url.searchParams.append('topic', topic);
        });
        event = new EventSource(url.toString());
        if (messageHandler !== undefined) {
            event.onmessage = messageHandler;
        }
        if (openHandler !== undefined) {
            event.onopen = openHandler;
        }
    }
    function close() {
        if (event !== undefined) {
            event.close();
        }
    }
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        return ()=>{
            close();
        };
    }, []);
    return {
        open,
        close
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
"./js/src/core/utils/polling-helper.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  fetchBlobWithPolling: () => (fetchBlobWithPolling)
});
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
async function fetchBlobWithPolling(param) {
    let { url, onSuccess, interval = 3000 } = param;
    const fetchUrl = async ()=>{
        const response = await fetch(url);
        if (response.status === 200) {
            const blob = await response.blob();
            onSuccess(blob);
        } else if (response.status === 202) {
            setTimeout(fetchUrl, interval);
        } else {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_0__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_0__.GeneralError(`Unexpected response status: ${response.status}`));
        }
    };
    await fetchUrl();
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
"./js/src/core/assets/images/pimcore.inline.svg?react": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__WEBPACK_DEFAULT_EXPORT__)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const SvgPimcoreinline = (props)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1em",
        height: "1em",
        fill: "none",
        viewBox: "0 0 24 24",
        ...props,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("path", {
            fill: "#5520A6",
            d: "M19 7c-1.7 0-3.2.8-4.2 2.2l-3.7 5.5C10.2 16.2 8.7 17 7 17c-2.8 0-5-2.2-5-5s2.2-5 5-5c1.7 0 3.2.8 4.2 2.2l.6 1L13 8.4l-.2-.3C11.5 6.2 9.3 5 7 5c-3.9 0-7 3.1-7 7s3.1 7 7 7c2.3 0 4.5-1.2 5.8-3.1l1.4-2.1.6 1c.9 1.4 2.5 2.2 4.2 2.2 2.8 0 5-2.2 5-5s-2.2-5-5-5m0 8c-1 0-1.9-.5-2.5-1.3L15.4 12l1.1-1.6C17 9.5 18 9 19 9c1.7 0 3 1.3 3 3s-1.3 3-3 3"
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/assets/images/pimcore.inline.svg",
            lineNumber: 3,
            columnNumber: 170
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/assets/images/pimcore.inline.svg",
        lineNumber: 3,
        columnNumber: 62
    }, undefined);
_c = SvgPimcoreinline;
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SvgPimcoreinline);
var _c;
$RefreshReg$(_c, "SvgPimcoreinline");


}),

}]);
//# sourceMappingURL=js_src_core_app_router_router_tsx.js.map