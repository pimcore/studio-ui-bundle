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
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["js_src_core_utils_compose_ts-js_src_core_utils_css_tsx-js_src_core_utils_date-time_ts-js_src_-7c30ca"], {
"./js/src/core/app/config/app-config.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  appConfig: () => (appConfig),
  currentDomain: () => (currentDomain)
});
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
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
"./js/src/core/modules/app/error-handler/classes/api-error.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DEFAULT_ERROR_CONTENT: () => (DEFAULT_ERROR_CONTENT),
  "default": () => (__WEBPACK_DEFAULT_EXPORT__)
});
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _Pimcore_modules_app_error_handler_constants_errorTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/app/error-handler/constants/errorTypes.ts");
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

const DEFAULT_ERROR_CONTENT = 'Something went wrong.';
class ApiError extends Error {
    handleApiErrorDetails(errorData) {
        const errorKey = errorData === null || errorData === void 0 ? void 0 : errorData.errorKey;
        const errorMessage = errorData === null || errorData === void 0 ? void 0 : errorData.message;
        const errorValue = errorData === null || errorData === void 0 ? void 0 : errorData.error;
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(errorKey) && errorKey === _Pimcore_modules_app_error_handler_constants_errorTypes__WEBPACK_IMPORTED_MODULE_1__.ErrorKeyTypes.ELEMENT_VALIDATION_FAILED) {
            return {
                title: errorKey,
                errorKey: errorMessage
            };
        }
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(errorKey) && errorKey !== _Pimcore_modules_app_error_handler_constants_errorTypes__WEBPACK_IMPORTED_MODULE_1__.ErrorKeyTypes.GENERIC_ERROR) {
            return {
                errorKey: errorKey
            };
        }
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(errorMessage)) {
            return errorMessage;
        }
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(errorValue)) {
            return errorValue;
        }
    }
    getContent() {
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(this.errorData)) {
            var _this_errorData;
            if (!(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isEmpty)((_this_errorData = this.errorData) === null || _this_errorData === void 0 ? void 0 : _this_errorData.message)) {
                return this.errorData.message;
            }
            if ('data' in this.errorData) {
                const apiErrorDetails = this.handleApiErrorDetails(this.errorData.data);
                if (!(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(apiErrorDetails)) return apiErrorDetails;
            }
            if ('error' in this.errorData && (0,lodash__WEBPACK_IMPORTED_MODULE_0__.isString)(this.errorData.error)) {
                return this.errorData.error;
            }
        }
        return DEFAULT_ERROR_CONTENT;
    }
    constructor(errorData){
        super();
        this.errorData = errorData;
    }
}
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ApiError);

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
"./js/src/core/modules/app/error-handler/classes/general-error.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__WEBPACK_DEFAULT_EXPORT__)
});
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ class GeneralError extends Error {
    getContent() {
        return this.errorData;
    }
    constructor(message){
        super();
        this.errorData = message;
    }
}
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GeneralError);

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
"./js/src/core/modules/app/error-handler/components/api-error-view-ui.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ApiErrorViewUI: () => (ApiErrorViewUI)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _Pimcore_modules_app_error_handler_classes_api_error__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/app/error-handler/classes/api-error.ts");
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




const ApiErrorViewUI = (param)=>{
    let { errorContent } = param;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)();
    const getErrorKeyValue = ()=>{
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_3__.isString)(errorContent) && !(0,lodash__WEBPACK_IMPORTED_MODULE_3__.isUndefined)(errorContent === null || errorContent === void 0 ? void 0 : errorContent.errorKey)) {
            return t(`error.${errorContent.errorKey}`);
        }
        return _Pimcore_modules_app_error_handler_classes_api_error__WEBPACK_IMPORTED_MODULE_4__.DEFAULT_ERROR_CONTENT;
    };
    const textValue = (0,lodash__WEBPACK_IMPORTED_MODULE_3__.isString)(errorContent) ? errorContent : getErrorKeyValue();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: textValue
    }, void 0, false);
};
_s(ApiErrorViewUI, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation
    ];
});
_c = ApiErrorViewUI;
var _c;
$RefreshReg$(_c, "ApiErrorViewUI");

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
"./js/src/core/modules/app/error-handler/constants/errorTypes.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ErrorKeyTypes: () => (ErrorKeyTypes),
  ErrorTypes: () => (ErrorTypes)
});
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ /* In this file, we're keeping the unused data as documentation of what we have exactly. */ var ErrorTypes = /*#__PURE__*/ function(ErrorTypes) {
    ErrorTypes["API_ERROR"] = "API_ERROR";
    ErrorTypes["GENERAL_ERROR"] = "GENERAL_ERROR";
    return ErrorTypes;
}({});
var ErrorKeyTypes = /*#__PURE__*/ function(ErrorKeyTypes) {
    ErrorKeyTypes["GENERIC_ERROR"] = "error_something_generic_went_wrong";
    ErrorKeyTypes["ELEMENT_EXISTS"] = "error_element_exists";
    ErrorKeyTypes["FOLDER_EXISTS"] = "error_folder_exists";
    ErrorKeyTypes["INVALID_ARGUMENT"] = "error_invalid_argument";
    ErrorKeyTypes["WIDGET_NAME_MISSING"] = "error_widget_name_missing";
    ErrorKeyTypes["WIDGET_NAME_INVALID"] = "error_widget_name_invalid";
    ErrorKeyTypes["VALIDATION_FAILED"] = "error_validation_failed";
    ErrorKeyTypes["ELEMENT_VALIDATION_FAILED"] = "error_element_validation_failed";
    return ErrorKeyTypes;
}({});

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
"./js/src/core/modules/app/error-handler/error-handler.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__WEBPACK_DEFAULT_EXPORT__)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_modules_app_error_handler_services_error_modal_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/app/error-handler/services/error-modal-service.ts");
/* ESM import */var _Pimcore_modules_app_error_handler_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* ESM import */var _Pimcore_modules_app_error_handler_components_api_error_view_ui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/app/error-handler/components/api-error-view-ui.tsx");
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





const isGeneralError = (error)=>error instanceof _Pimcore_modules_app_error_handler_index__WEBPACK_IMPORTED_MODULE_4__.GeneralError;
const isApiError = (error)=>error instanceof _Pimcore_modules_app_error_handler_index__WEBPACK_IMPORTED_MODULE_4__.ApiError;
// Create a set to keep shown error content and avoid duplicates
const shownErrors = new Set();
const trackError = (data, handler)=>{
    const errorContent = data.getContent();
    if (shownErrors.has(errorContent)) {
        return;
    } else {
        shownErrors.add(errorContent);
    }
    // Set a timeout to clear the shownErrors after the current execution cycle
    setTimeout(()=>{
        // Clear the shownErrors after handling the error to allow future errors to be shown
        shownErrors.clear();
    }, 0);
    const getErrorContentValue = ()=>{
        return isApiError(data) ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_app_error_handler_components_api_error_view_ui__WEBPACK_IMPORTED_MODULE_5__.ApiErrorViewUI, {
            errorContent: errorContent
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/error-handler/error-handler.tsx",
            lineNumber: 45,
            columnNumber: 31
        }, undefined) : errorContent;
    };
    if (!(0,lodash__WEBPACK_IMPORTED_MODULE_2__.isUndefined)(handler)) {
        handler(getErrorContentValue());
    } else {
        // default handler
        _Pimcore_modules_app_error_handler_services_error_modal_service__WEBPACK_IMPORTED_MODULE_3__.ErrorModalService.showError({
            content: getErrorContentValue(),
            title: typeof errorContent === 'object' ? errorContent.title : null
        });
    }
    if (isGeneralError(data)) {
        throw new Error(errorContent);
    }
};
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = (trackError);

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
"./js/src/core/modules/app/error-handler/index.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ApiError: () => (/* reexport safe */ _classes_api_error__WEBPACK_IMPORTED_MODULE_1__["default"]),
  GeneralError: () => (/* reexport safe */ _classes_general_error__WEBPACK_IMPORTED_MODULE_2__["default"]),
  "default": () => (/* reexport safe */ _error_handler__WEBPACK_IMPORTED_MODULE_0__["default"])
});
/* ESM import */var _error_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/app/error-handler/error-handler.tsx");
/* ESM import */var _classes_api_error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/app/error-handler/classes/api-error.ts");
/* ESM import */var _classes_general_error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/app/error-handler/classes/general-error.ts");
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
"./js/src/core/modules/app/error-handler/services/error-modal-service.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ErrorModalService: () => (ErrorModalService)
});
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
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
const ErrorModalService = (()=>{
    let modalInstance = null;
    const setModalInstance = (modal)=>{
        modalInstance = modal;
    };
    const showError = (param)=>{
        let { content, title } = param;
        if ((0,lodash__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(modalInstance)) {
            console.warn('ErrorModalService: Modal instance is not set. Call setModalInstance first.');
            console.warn('Error title:', title);
            console.warn('Error content:', content);
            return;
        // throw new Error('ErrorModalService: Modal instance is not set. Call setModalInstance first.')
        }
        modalInstance.error({
            content,
            title
        });
    };
    return {
        setModalInstance,
        showError
    };
})();

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
"./js/src/core/utils/compose.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  compose: () => (compose)
});
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ /* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-unsafe-argument */ const compose = function() {
    for(var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++){
        fns[_key] = arguments[_key];
    }
    return (initialArg)=>{
        return fns.reduce((arg, fn)=>{
            if (Array.isArray(fn)) {
                return fn[0](arg, ...fn.slice(1));
            }
            return fn(arg);
        }, initialArg);
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
"./js/src/core/utils/css.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  toCssDimension: () => (toCssDimension)
});
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ const toCssDimension = (value, fallback)=>{
    if (value === null || value === undefined || value === '' || value === 0) {
        if (fallback === undefined) {
            return undefined;
        }
        value = fallback;
    }
    return typeof value === 'number' ? `${value}px` : value;
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
"./js/src/core/utils/date-time.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  formatDate: () => (formatDate),
  formatDateTime: () => (formatDateTime),
  formatTime: () => (formatTime)
});
/* ESM import */var i18next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/i18next/i18next");
/* ESM import */var i18next__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(i18next__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
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


function formatDateTime(param) {
    let { timestamp, lng, timeStyle, dateStyle, options } = param;
    if (lng === undefined) {
        lng = (i18next__WEBPACK_IMPORTED_MODULE_0___default().language);
    }
    if (timestamp === null) {
        return '';
    }
    try {
        const date = new Date((0,lodash__WEBPACK_IMPORTED_MODULE_2__.isNumber)(timestamp) ? timestamp * 1000 : timestamp);
        return i18next__WEBPACK_IMPORTED_MODULE_0___default().format(date, 'datetime', lng, {
            timeStyle,
            dateStyle,
            ...options
        });
    } catch (error) {
        (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__.GeneralError(`Failed to format date time: ${error}`));
        return '';
    }
}
function formatDate(timestamp) {
    return formatDateTime({
        timestamp,
        dateStyle: 'short'
    });
}
function formatTime(timestamp) {
    return formatDateTime({
        timestamp,
        timeStyle: 'short'
    });
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
"./js/src/core/utils/files.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  replaceFileEnding: () => (replaceFileEnding),
  saveFileLocal: () => (saveFileLocal)
});
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ function replaceFileEnding(name, ending) {
    const extensionP = name.split('.');
    extensionP[extensionP.length - 1] = ending;
    return extensionP.join('.');
}
function saveFileLocal(url, name) {
    const a = document.createElement('a');
    a.download = name ?? '';
    a.href = url;
    a.click();
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
"./js/src/core/utils/helpers.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  isSet: () => (isSet),
  onKeyEnterExecuteClick: () => (onKeyEnterExecuteClick),
  respectLineBreak: () => (respectLineBreak)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
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

function onKeyEnterExecuteClick(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.click();
    }
}
// TODO: Use _.isNil from Lodash instead of the custom implementation below
function isSet(par) {
    return par !== null && par !== undefined;
}
function respectLineBreak(text) {
    let useParagraph = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    const trimmedText = text.replace(/\n+$/, '');
    const textSplit = trimmedText.split('\n');
    if (useParagraph) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
            children: textSplit.map((line, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
                    children: line
                }, `${index}-${line}`, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/utils/helpers.tsx",
                    lineNumber: 32,
                    columnNumber: 9
                }, this))
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/utils/helpers.tsx",
            lineNumber: 31,
            columnNumber: 7
        }, this);
    } else {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
            children: textSplit.map((line, index, arr)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), {
                    children: [
                        line,
                        index < arr.length - 1 && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("br", {}, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/utils/helpers.tsx",
                            lineNumber: 41,
                            columnNumber: 38
                        }, this)
                    ]
                }, index, true, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/utils/helpers.tsx",
                    lineNumber: 38,
                    columnNumber: 9
                }, this))
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/utils/helpers.tsx",
            lineNumber: 37,
            columnNumber: 7
        }, this);
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
"./js/src/core/utils/hooks/use-click-outside.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useClickOutside: () => (useClickOutside)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
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
const useClickOutside = (ref, handler, selectors)=>{
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        const listener = (event)=>{
            var _ref_current_menu_list, _ref_current_menu, _ref_current, _ref_current_nativeElement, _ref_current1;
            if (selectors !== undefined) {
                const domElements = document.querySelectorAll(selectors);
                for (const item of domElements){
                    if (item.contains(event.target)) {
                        return;
                    }
                }
            }
            if (((_ref_current = ref.current) === null || _ref_current === void 0 ? void 0 : (_ref_current_menu = _ref_current.menu) === null || _ref_current_menu === void 0 ? void 0 : (_ref_current_menu_list = _ref_current_menu.list) === null || _ref_current_menu_list === void 0 ? void 0 : _ref_current_menu_list.contains(event.target)) === true) {
                return;
            }
            if (((_ref_current1 = ref.current) === null || _ref_current1 === void 0 ? void 0 : (_ref_current_nativeElement = _ref_current1.nativeElement) === null || _ref_current_nativeElement === void 0 ? void 0 : _ref_current_nativeElement.contains(event.target)) === true) {
                return;
            }
            handler(event);
        };
        document.addEventListener('mousedown', listener, true);
        return ()=>{
            document.removeEventListener('mousedown', listener, true);
        };
    }, [
        ref,
        handler
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
"./js/src/core/utils/hooks/use-css-container/use-css-container.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useCssContainerStyles: () => (useCssContainerStyles)
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
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
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
"./js/src/core/utils/hooks/use-element-visible.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__WEBPACK_DEFAULT_EXPORT__)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
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
const useElementVisible = function(ref) {
    let continueObserving = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    const [isVisible, setIsVisible] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        const observer = new IntersectionObserver((param)=>{
            let [entry] = param;
            if (entry.isIntersecting) {
                setIsVisible(true);
                if (!continueObserving) {
                    observer.disconnect();
                }
            } else if (continueObserving) {
                setIsVisible(false);
            }
        }, {
            threshold: 0.1
        });
        if (ref.current !== null) {
            observer.observe(ref.current);
        }
        return ()=>{
            if (ref.current !== null) {
                observer.unobserve(ref.current);
                observer.disconnect();
            }
        };
    }, [
        ref,
        continueObserving
    ]);
    return isVisible;
};
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useElementVisible);

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
"./js/src/core/utils/hooks/use-previous.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  usePrevious: () => (usePrevious)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
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
const usePrevious = (value)=>{
    const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        ref.current = value;
    }, [
        value
    ]);
    return ref.current;
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
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
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
"./js/src/core/utils/number.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  formatNumber: () => (formatNumber)
});
/* ESM import */var i18next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/i18next/i18next");
/* ESM import */var i18next__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(i18next__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
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

function formatNumber(param) {
    let { value, lng, options = {
        useGrouping: false
    } } = param;
    if ((0,lodash__WEBPACK_IMPORTED_MODULE_1__.isNil)(value)) {
        return '';
    }
    if (lng === undefined) {
        lng = (i18next__WEBPACK_IMPORTED_MODULE_0___default().language);
    }
    return i18next__WEBPACK_IMPORTED_MODULE_0___default().format(value, 'number', lng, options);
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
"./js/src/core/utils/polling-helper.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  fetchBlobWithPolling: () => (fetchBlobWithPolling)
});
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
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
"./js/src/core/utils/uuid.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  uuid: () => (uuid)
});
/* ESM import */var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/uuid/uuid");
/* ESM import */var uuid__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_0__);
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
function uuid() {
    return (0,uuid__WEBPACK_IMPORTED_MODULE_0__.v4)();
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
//# sourceMappingURL=js_src_core_utils_compose_ts-js_src_core_utils_css_tsx-js_src_core_utils_date-time_ts-js_src_-7c30ca.js.map