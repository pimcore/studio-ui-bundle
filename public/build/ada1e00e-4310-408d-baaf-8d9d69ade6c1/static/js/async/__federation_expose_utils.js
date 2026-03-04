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
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["__federation_expose_utils"], {
"./js/src/core/app/config/app-config.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  appConfig: () => (appConfig),
  currentDomain: () => (currentDomain)
});
/* ESM import */var _Pimcore_utils_iframe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/utils/iframe.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 
const appElement = (0,_Pimcore_utils_iframe__WEBPACK_IMPORTED_MODULE_0__.getParentDocument)().querySelector('#app');
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
"./js/src/core/constants/global.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ElementTypeName: () => (ElementTypeName),
  LOCAL_STORAGE_PREFIX: () => (LOCAL_STORAGE_PREFIX)
});
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ var ElementTypeName = /*#__PURE__*/ function(ElementTypeName) {
    ElementTypeName["ASSET"] = "asset";
    ElementTypeName["DATA_OBJECT"] = "data-object";
    return ElementTypeName;
}({});
const LOCAL_STORAGE_PREFIX = 'pimcore_studio_';

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
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(errorKey) && errorKey !== _Pimcore_modules_app_error_handler_constants_errorTypes__WEBPACK_IMPORTED_MODULE_1__.ErrorKeyTypes.GENERIC_ERROR && errorKey !== _Pimcore_modules_app_error_handler_constants_errorTypes__WEBPACK_IMPORTED_MODULE_1__.ErrorKeyTypes.INVALID_ARGUMENT) {
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
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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
"./js/src/core/modules/app/error-handler/constants/errorTypes.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ErrorKeyTypes: () => (ErrorKeyTypes),
  ErrorTypes: () => (ErrorTypes)
});
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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
"./js/src/core/utils/clipboard.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  copyToClipboard: () => (copyToClipboard),
  copyToClipboardWithFeedback: () => (copyToClipboardWithFeedback),
  pasteFromClipboard: () => (pasteFromClipboard),
  pasteFromClipboardWithFeedback: () => (pasteFromClipboardWithFeedback)
});
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 
const copyToClipboard = async (text)=>{
    if (!(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isNil)(navigator.clipboard) && !(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isNil)(navigator.clipboard.writeText)) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (error) {
            console.warn('Clipboard API failed, trying fallback method:', error);
        }
    }
    return copyToClipboardFallback(text);
};
const copyToClipboardFallback = (text)=>{
    try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        textArea.setAttribute('readonly', '');
        textArea.setAttribute('aria-hidden', 'true');
        document.body.appendChild(textArea);
        textArea.select();
        textArea.setSelectionRange(0, 99999);
        const successful = document.execCommand('copy');
        textArea.remove();
        return successful;
    } catch (error) {
        console.error('Fallback clipboard method failed:', error);
        return false;
    }
};
const copyToClipboardWithFeedback = async (text, onSuccess, onError)=>{
    const success = await copyToClipboard(text);
    if (success) {
        onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess();
    } else {
        onError === null || onError === void 0 ? void 0 : onError('Failed to copy to clipboard');
    }
};
const pasteFromClipboard = async ()=>{
    if (!(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isNil)(navigator.clipboard) && !(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isNil)(navigator.clipboard.readText)) {
        try {
            return await navigator.clipboard.readText();
        } catch (error) {
            console.warn('Clipboard API read failed:', error);
        }
    }
    return null;
};
const pasteFromClipboardWithFeedback = async (onSuccess, onError)=>{
    const text = await pasteFromClipboard();
    if (!(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isNull)(text)) {
        onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess();
    } else {
        onError === null || onError === void 0 ? void 0 : onError('Failed to paste from clipboard');
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
"./js/src/core/utils/compose.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  compose: () => (compose)
});
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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
"./js/src/core/utils/currency.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  formatCurrency: () => (formatCurrency)
});
/* ESM import */var i18next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/i18next/i18next");
/* ESM import */var i18next__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(i18next__WEBPACK_IMPORTED_MODULE_0__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 
function formatCurrency(param) {
    let { value, lng, options } = param;
    if (lng === undefined) {
        lng = (i18next__WEBPACK_IMPORTED_MODULE_0___default().language);
    }
    return i18next__WEBPACK_IMPORTED_MODULE_0___default().format(value, 'currency', lng, {
        style: 'currency',
        currency: 'EUR',
        ...options
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
"./js/src/core/utils/data-unit.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  formatDataUnit: () => (formatDataUnit)
});
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ function formatDataUnit(bytes) {
    let precision = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 2;
    if (bytes === 0) return '0 B';
    const units = [
        'B',
        'KB',
        'MB',
        'GB',
        'TB'
    ];
    let pow = Math.floor(Math.log(bytes) / Math.log(1000));
    pow = Math.min(pow, units.length - 1);
    bytes /= Math.pow(1000, pow);
    return `${bytes.toFixed(precision)} ${units[pow]}`;
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
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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
"./js/src/core/utils/hooks/use-click-outside.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useClickOutside: () => (useClickOutside)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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
"./js/src/core/utils/hooks/use-debounce.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useDebounce: () => (useDebounce)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 
const useDebounce = (value, delay)=>{
    const [debouncedValue, setDebouncedValue] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(value);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        const handler = setTimeout(()=>{
            setDebouncedValue(value);
        }, delay);
        return ()=>{
            clearTimeout(handler);
        };
    }, [
        value,
        delay
    ]);
    return debouncedValue;
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
"./js/src/core/utils/hooks/use-element-resize.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__WEBPACK_DEFAULT_EXPORT__),
  useElementResize: () => (useElementResize)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 

const getElement = (element)=>{
    if ((0,lodash__WEBPACK_IMPORTED_MODULE_1__.isString)(element)) {
        return document.getElementById(element);
    }
    return element.current;
};
const useElementResize = function(element) {
    let disable = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    const [size, setSize] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
        width: 0,
        height: 0
    });
    // Get initial width before the render phase
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)(()=>{
        if (disable) {
            return;
        }
        const targetElement = getElement(element);
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isNull)(targetElement)) {
            const { width, height } = targetElement.getBoundingClientRect();
            setSize({
                width,
                height
            });
        }
    }, [
        disable
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (disable) {
            return;
        }
        const targetElement = getElement(element);
        if ((0,lodash__WEBPACK_IMPORTED_MODULE_1__.isNull)(targetElement)) return;
        const resizeObserver = new ResizeObserver((param)=>{
            let [entry] = param;
            let width;
            let height;
            // Prefer modern spec-compliant API
            if (!(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isNull)(entry.borderBoxSize) && entry.borderBoxSize.length > 0) {
                width = entry.borderBoxSize[0].inlineSize;
                height = entry.borderBoxSize[0].blockSize;
            } else {
                // Fallback for older browsers (contentRect is always defined)
                const rect = entry.contentRect;
                width = rect.width;
                height = rect.height;
            }
            setSize((prevSize)=>{
                if (width !== 0 && height !== 0 && (width !== prevSize.width || height !== prevSize.height)) {
                    return {
                        width,
                        height
                    };
                }
                return prevSize;
            });
        });
        resizeObserver.observe(targetElement);
        return ()=>{
            resizeObserver.disconnect();
        };
    }, [
        element,
        disable
    ]);
    return size;
};
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useElementResize);

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
  "default": () => (__WEBPACK_DEFAULT_EXPORT__),
  useElementVisible: () => (useElementVisible)
});
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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
    let continueObserving = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false, disable = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
    const [isVisible, setIsVisible] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(disable);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (disable) {
            return;
        }
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
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isNil)(ref) && ref.current !== null) {
            observer.observe(ref.current);
        }
        return ()=>{
            if (!(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isNil)(ref) && ref.current !== null) {
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
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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
        event = new EventSource(url.toString(), {
            withCredentials: true
        });
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
"./js/src/core/utils/html.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  decodeHtmlEntities: () => (decodeHtmlEntities),
  escapeHtml: () => (escapeHtml),
  hasLineBreaks: () => (hasLineBreaks),
  isHtmlContent: () => (isHtmlContent),
  pasteHtmlAtCaret: () => (pasteHtmlAtCaret),
  stripTags: () => (stripTags)
});
/* ESM import */var dompurify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/dompurify/dompurify");
/* ESM import */var dompurify__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dompurify__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 

const stripTags = function(input) {
    let allowedTags = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
    return dompurify__WEBPACK_IMPORTED_MODULE_0___default().sanitize(input, {
        ALLOWED_TAGS: allowedTags
    });
};
const decodeHtmlEntities = (input)=>{
    const txt = document.createElement('textarea');
    txt.innerHTML = input;
    return txt.textContent ?? txt.innerText ?? '';
};
const escapeHtml = (input)=>{
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
};
const isHtmlContent = (value)=>{
    if ((0,lodash__WEBPACK_IMPORTED_MODULE_1__.isNil)(value) || !(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isString)(value) || value.trim() === '') {
        return false;
    }
    return /<\/?[a-z][\s\S]*>/i.test(value);
};
const hasLineBreaks = (value)=>{
    if ((0,lodash__WEBPACK_IMPORTED_MODULE_1__.isNil)(value) || !(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isString)(value)) {
        return false;
    }
    return /\n/gm.test(value);
};
const pasteHtmlAtCaret = function(html) {
    let currentWindow = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : window;
    let range;
    const sel = currentWindow.getSelection();
    if (!(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isNil)(sel) && !(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isNil)(sel.getRangeAt) && sel.rangeCount > 0) {
        range = sel.getRangeAt(0);
        range.deleteContents();
        const el = currentWindow.document.createElement('div');
        el.innerHTML = html;
        const frag = currentWindow.document.createDocumentFragment();
        let node = null;
        let lastNode = null;
        while(!(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isNil)(el.firstChild)){
            node = el.firstChild;
            lastNode = frag.appendChild(node);
        }
        range.insertNode(frag);
        // Preserve the selection
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isNil)(lastNode)) {
            range = range.cloneRange();
            range.setStartAfter(lastNode);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
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
"./js/src/core/utils/iframe.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  getIframeOffset: () => (getIframeOffset),
  getParentDocument: () => (getParentDocument),
  isInIframe: () => (isInIframe)
});
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 
const iframeCache = new Map();
/**
 * Checks if the current window is running inside an iframe
 * @returns true if running in an iframe, false otherwise
 */ const isInIframe = ()=>{
    try {
        return window.parent !== null && window.parent !== window;
    } catch (error) {
        // In case of cross-origin restrictions, assume we're in an iframe
        return true;
    }
};
const getIframeOffset = (view)=>{
    const viewDocument = view.document;
    if (viewDocument === window.parent.document) {
        return {
            x: 0,
            y: 0
        };
    }
    if (!iframeCache.has(viewDocument)) {
        const iframes = window.parent.document.querySelectorAll('iframe');
        const matchingIframe = Array.from(iframes).find((iframe)=>iframe.contentDocument === viewDocument);
        iframeCache.set(viewDocument, matchingIframe ?? null);
    }
    const cachedIframe = iframeCache.get(viewDocument);
    if (!(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isNil)(cachedIframe)) {
        const iframeRect = cachedIframe.getBoundingClientRect();
        return {
            x: iframeRect.left,
            y: iframeRect.top
        };
    }
    return {
        x: 0,
        y: 0
    };
};
/**
 * Safely gets the parent document when running in an iframe
 * @returns The parent document if accessible, null otherwise
 */ const getParentDocument = ()=>{
    if (!isInIframe()) {
        return document;
    }
    try {
        return window.parent.document;
    } catch  {
        // Cross-origin restriction - parent document not accessible
        return document;
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
"./js/src/core/utils/local-storage.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  getLocalStorageItem: () => (getLocalStorageItem),
  isDontAskAgainEnabled: () => (isDontAskAgainEnabled),
  removeLocalStorageItem: () => (removeLocalStorageItem),
  setDontAskAgain: () => (setDontAskAgain),
  setLocalStorageItem: () => (setLocalStorageItem)
});
/* ESM import */var _Pimcore_constants_global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/constants/global.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 
/**
 * Get the prefixed key for local storage
 */ function getPrefixedKey(key) {
    return `${_Pimcore_constants_global__WEBPACK_IMPORTED_MODULE_0__.LOCAL_STORAGE_PREFIX}${key}`;
}
/**
 * Set a value in local storage with prefix
 */ function setLocalStorageItem(key, value) {
    try {
        localStorage.setItem(getPrefixedKey(key), value);
    } catch (error) {
        console.warn('Failed to save to localStorage:', error);
    }
}
/**
 * Get a value from local storage with prefix
 */ function getLocalStorageItem(key) {
    try {
        return localStorage.getItem(getPrefixedKey(key));
    } catch (error) {
        console.warn('Failed to read from localStorage:', error);
        return null;
    }
}
/**
 * Remove a value from local storage with prefix
 */ function removeLocalStorageItem(key) {
    try {
        localStorage.removeItem(getPrefixedKey(key));
    } catch (error) {
        console.warn('Failed to remove from localStorage:', error);
    }
}
/**
 * Check if user has selected "don't ask again" for a specific key
 */ function isDontAskAgainEnabled(key) {
    return getLocalStorageItem(`dont_ask_again_${key}`) === 'true';
}
/**
 * Set "don't ask again" preference for a specific key
 */ function setDontAskAgain(key, enabled) {
    if (enabled) {
        setLocalStorageItem(`dont_ask_again_${key}`, 'true');
    } else {
        removeLocalStorageItem(`dont_ask_again_${key}`);
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
"./js/src/core/utils/number.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  formatNumber: () => (formatNumber)
});
/* ESM import */var i18next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/i18next/i18next");
/* ESM import */var i18next__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(i18next__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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
    let { url, onSuccess, interval = 3000, throwOnError = false } = param;
    await new Promise((resolve, reject)=>{
        const fetchUrl = async ()=>{
            try {
                const response = await fetch(url);
                if (response.status === 200) {
                    const blob = await response.blob();
                    onSuccess(blob);
                    resolve(undefined);
                } else if (response.status === 202) {
                    setTimeout(()=>{
                        void fetchUrl();
                    }, interval);
                } else {
                    if (throwOnError) {
                        reject(new Error(`Unexpected response status: ${response.status}`));
                    } else {
                        (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_0__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_0__.GeneralError(`Unexpected response status: ${response.status}`));
                        resolve(undefined);
                    }
                }
            } catch (error) {
                if (throwOnError) {
                    reject(error);
                } else {
                    (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_0__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_0__.GeneralError('An error occurred while fetching the blob'));
                    resolve(undefined);
                }
            }
        };
        void fetchUrl();
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
"./js/src/core/utils/query-string.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  buildQueryString: () => (buildQueryString)
});
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ function buildQueryString(keyValues) {
    let invalidValues = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [
        ''
    ];
    const queryParameters = [];
    for (const obj of keyValues){
        if (!invalidValues.includes(obj.value)) {
            queryParameters.push(`${obj.key}=${obj.value}`);
        }
    }
    return queryParameters.join('&');
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
"./js/src/core/utils/relative-time.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  formatRelativeTime: () => (formatRelativeTime)
});
/* ESM import */var i18next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/i18next/i18next");
/* ESM import */var i18next__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(i18next__WEBPACK_IMPORTED_MODULE_0__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 
function formatRelativeTime(param) {
    let { value, unit, lng, options } = param;
    if (lng === undefined) {
        lng = (i18next__WEBPACK_IMPORTED_MODULE_0___default().language);
    }
    const formatter = new Intl.RelativeTimeFormat(lng, options);
    return formatter.format(value, unit);
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
"./js/src/core/utils/type-utils.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  isEmptyValue: () => (isEmptyValue),
  isNonEmptyString: () => (isNonEmptyString)
});
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 
// Difference from Lodash: primitive values like booleans and numbers are NOT considered empty
const isEmptyValue = (value)=>{
    if (value === null || value === undefined) {
        return true;
    }
    if (typeof value === 'object' && !Array.isArray(value)) {
        return Object.keys(value).length === 0;
    }
    if (typeof value === 'object' && Array.isArray(value)) {
        return value.length === 0;
    }
    if (typeof value === 'string') {
        return value.trim().length === 0;
    }
    return false;
};
/**
 * Checks if a value is a non-empty string (after trimming whitespace)
 */ const isNonEmptyString = (value)=>{
    return (0,lodash__WEBPACK_IMPORTED_MODULE_0__.isString)(value) && !(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isEmpty)((0,lodash__WEBPACK_IMPORTED_MODULE_0__.trim)(value));
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
"./js/src/core/utils/url-cache-buster.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addCacheBusterToUrl: () => (addCacheBusterToUrl)
});
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ /**
 * Adds a timestamp-based cache buster parameter to a URL to force reload and bypass cache
 * @param url - The original URL
 * @param parameterName - The name of the cache buster parameter (default: '_cb')
 * @returns URL with added cache buster parameter using current timestamp in milliseconds
 */ function addCacheBusterToUrl(url) {
    let parameterName = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : '_cb';
    const cacheBuster = Date.now().toString();
    try {
        const urlObj = new URL(url, window.location.origin);
        urlObj.searchParams.set(parameterName, cacheBuster);
        return urlObj.toString();
    } catch  {
        // Fallback for invalid URLs - just append the parameter
        const separator = url.includes('?') ? '&' : '?';
        return `${url}${separator}${parameterName}=${cacheBuster}`;
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
"./js/src/core/utils/uuid.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  uuid: () => (uuid)
});
/* ESM import */var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/uuid/uuid");
/* ESM import */var uuid__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_0__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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
"./js/src/sdk/utils/index.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addCacheBusterToUrl: () => (/* reexport safe */ _Pimcore_utils_url_cache_buster__WEBPACK_IMPORTED_MODULE_14__.addCacheBusterToUrl),
  buildQueryString: () => (/* reexport safe */ _Pimcore_utils_query_string__WEBPACK_IMPORTED_MODULE_12__.buildQueryString),
  compose: () => (/* reexport safe */ _Pimcore_utils_compose__WEBPACK_IMPORTED_MODULE_1__.compose),
  copyToClipboard: () => (/* reexport safe */ _Pimcore_utils_clipboard__WEBPACK_IMPORTED_MODULE_0__.copyToClipboard),
  copyToClipboardWithFeedback: () => (/* reexport safe */ _Pimcore_utils_clipboard__WEBPACK_IMPORTED_MODULE_0__.copyToClipboardWithFeedback),
  decodeHtmlEntities: () => (/* reexport safe */ _Pimcore_utils_html__WEBPACK_IMPORTED_MODULE_8__.decodeHtmlEntities),
  escapeHtml: () => (/* reexport safe */ _Pimcore_utils_html__WEBPACK_IMPORTED_MODULE_8__.escapeHtml),
  fetchBlobWithPolling: () => (/* reexport safe */ _Pimcore_utils_polling_helper__WEBPACK_IMPORTED_MODULE_11__.fetchBlobWithPolling),
  formatCurrency: () => (/* reexport safe */ _Pimcore_utils_currency__WEBPACK_IMPORTED_MODULE_3__.formatCurrency),
  formatDataUnit: () => (/* reexport safe */ _Pimcore_utils_data_unit__WEBPACK_IMPORTED_MODULE_4__.formatDataUnit),
  formatDate: () => (/* reexport safe */ _Pimcore_utils_date_time__WEBPACK_IMPORTED_MODULE_5__.formatDate),
  formatDateTime: () => (/* reexport safe */ _Pimcore_utils_date_time__WEBPACK_IMPORTED_MODULE_5__.formatDateTime),
  formatNumber: () => (/* reexport safe */ _Pimcore_utils_number__WEBPACK_IMPORTED_MODULE_10__.formatNumber),
  formatRelativeTime: () => (/* reexport safe */ _Pimcore_utils_relative_time__WEBPACK_IMPORTED_MODULE_13__.formatRelativeTime),
  formatTime: () => (/* reexport safe */ _Pimcore_utils_date_time__WEBPACK_IMPORTED_MODULE_5__.formatTime),
  getIframeOffset: () => (/* reexport safe */ _Pimcore_utils_iframe__WEBPACK_IMPORTED_MODULE_9__.getIframeOffset),
  getLocalStorageItem: () => (/* reexport safe */ _Pimcore_utils_local_storage__WEBPACK_IMPORTED_MODULE_17__.getLocalStorageItem),
  getParentDocument: () => (/* reexport safe */ _Pimcore_utils_iframe__WEBPACK_IMPORTED_MODULE_9__.getParentDocument),
  hasLineBreaks: () => (/* reexport safe */ _Pimcore_utils_html__WEBPACK_IMPORTED_MODULE_8__.hasLineBreaks),
  isDontAskAgainEnabled: () => (/* reexport safe */ _Pimcore_utils_local_storage__WEBPACK_IMPORTED_MODULE_17__.isDontAskAgainEnabled),
  isEmptyValue: () => (/* reexport safe */ _Pimcore_utils_type_utils__WEBPACK_IMPORTED_MODULE_16__.isEmptyValue),
  isHtmlContent: () => (/* reexport safe */ _Pimcore_utils_html__WEBPACK_IMPORTED_MODULE_8__.isHtmlContent),
  isInIframe: () => (/* reexport safe */ _Pimcore_utils_iframe__WEBPACK_IMPORTED_MODULE_9__.isInIframe),
  isNonEmptyString: () => (/* reexport safe */ _Pimcore_utils_type_utils__WEBPACK_IMPORTED_MODULE_16__.isNonEmptyString),
  isSet: () => (/* reexport safe */ _Pimcore_utils_helpers__WEBPACK_IMPORTED_MODULE_7__.isSet),
  onKeyEnterExecuteClick: () => (/* reexport safe */ _Pimcore_utils_helpers__WEBPACK_IMPORTED_MODULE_7__.onKeyEnterExecuteClick),
  pasteFromClipboard: () => (/* reexport safe */ _Pimcore_utils_clipboard__WEBPACK_IMPORTED_MODULE_0__.pasteFromClipboard),
  pasteFromClipboardWithFeedback: () => (/* reexport safe */ _Pimcore_utils_clipboard__WEBPACK_IMPORTED_MODULE_0__.pasteFromClipboardWithFeedback),
  pasteHtmlAtCaret: () => (/* reexport safe */ _Pimcore_utils_html__WEBPACK_IMPORTED_MODULE_8__.pasteHtmlAtCaret),
  removeLocalStorageItem: () => (/* reexport safe */ _Pimcore_utils_local_storage__WEBPACK_IMPORTED_MODULE_17__.removeLocalStorageItem),
  replaceFileEnding: () => (/* reexport safe */ _Pimcore_utils_files__WEBPACK_IMPORTED_MODULE_6__.replaceFileEnding),
  respectLineBreak: () => (/* reexport safe */ _Pimcore_utils_helpers__WEBPACK_IMPORTED_MODULE_7__.respectLineBreak),
  saveFileLocal: () => (/* reexport safe */ _Pimcore_utils_files__WEBPACK_IMPORTED_MODULE_6__.saveFileLocal),
  setDontAskAgain: () => (/* reexport safe */ _Pimcore_utils_local_storage__WEBPACK_IMPORTED_MODULE_17__.setDontAskAgain),
  setLocalStorageItem: () => (/* reexport safe */ _Pimcore_utils_local_storage__WEBPACK_IMPORTED_MODULE_17__.setLocalStorageItem),
  stripTags: () => (/* reexport safe */ _Pimcore_utils_html__WEBPACK_IMPORTED_MODULE_8__.stripTags),
  toCssDimension: () => (/* reexport safe */ _Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_2__.toCssDimension),
  useClickOutside: () => (/* reexport safe */ _Pimcore_utils_hooks_use_click_outside__WEBPACK_IMPORTED_MODULE_18__.useClickOutside),
  useCssContainer: () => (/* reexport safe */ _Pimcore_utils_hooks_use_css_container_use_css_container__WEBPACK_IMPORTED_MODULE_19__.useCssContainer),
  useDebounce: () => (/* reexport safe */ _Pimcore_utils_hooks_use_debounce__WEBPACK_IMPORTED_MODULE_24__.useDebounce),
  useElementResize: () => (/* reexport safe */ _Pimcore_utils_hooks_use_element_resize__WEBPACK_IMPORTED_MODULE_20__.useElementResize),
  useElementVisible: () => (/* reexport safe */ _Pimcore_utils_hooks_use_element_visible__WEBPACK_IMPORTED_MODULE_21__.useElementVisible),
  usePrevious: () => (/* reexport safe */ _Pimcore_utils_hooks_use_previous__WEBPACK_IMPORTED_MODULE_22__.usePrevious),
  useServerSideEvent: () => (/* reexport safe */ _Pimcore_utils_hooks_use_server_side_event__WEBPACK_IMPORTED_MODULE_23__.useServerSideEvent),
  uuid: () => (/* reexport safe */ _Pimcore_utils_uuid__WEBPACK_IMPORTED_MODULE_15__.uuid)
});
/* ESM import */var _Pimcore_utils_clipboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/utils/clipboard.ts");
/* ESM import */var _Pimcore_utils_compose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/utils/compose.ts");
/* ESM import */var _Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/utils/css.tsx");
/* ESM import */var _Pimcore_utils_currency__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/utils/currency.ts");
/* ESM import */var _Pimcore_utils_data_unit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/utils/data-unit.ts");
/* ESM import */var _Pimcore_utils_date_time__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/utils/date-time.ts");
/* ESM import */var _Pimcore_utils_files__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/utils/files.ts");
/* ESM import */var _Pimcore_utils_helpers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/utils/helpers.tsx");
/* ESM import */var _Pimcore_utils_html__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/utils/html.ts");
/* ESM import */var _Pimcore_utils_iframe__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/utils/iframe.ts");
/* ESM import */var _Pimcore_utils_number__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/utils/number.ts");
/* ESM import */var _Pimcore_utils_polling_helper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/utils/polling-helper.ts");
/* ESM import */var _Pimcore_utils_query_string__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/utils/query-string.ts");
/* ESM import */var _Pimcore_utils_relative_time__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/utils/relative-time.ts");
/* ESM import */var _Pimcore_utils_url_cache_buster__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/utils/url-cache-buster.ts");
/* ESM import */var _Pimcore_utils_uuid__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./js/src/core/utils/uuid.ts");
/* ESM import */var _Pimcore_utils_type_utils__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("./js/src/core/utils/type-utils.ts");
/* ESM import */var _Pimcore_utils_local_storage__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("./js/src/core/utils/local-storage.ts");
/* ESM import */var _Pimcore_utils_hooks_use_click_outside__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("./js/src/core/utils/hooks/use-click-outside.ts");
/* ESM import */var _Pimcore_utils_hooks_use_css_container_use_css_container__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__("./js/src/core/utils/hooks/use-css-container/use-css-container.tsx");
/* ESM import */var _Pimcore_utils_hooks_use_element_resize__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__("./js/src/core/utils/hooks/use-element-resize.ts");
/* ESM import */var _Pimcore_utils_hooks_use_element_visible__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__("./js/src/core/utils/hooks/use-element-visible.ts");
/* ESM import */var _Pimcore_utils_hooks_use_previous__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__("./js/src/core/utils/hooks/use-previous.ts");
/* ESM import */var _Pimcore_utils_hooks_use_server_side_event__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__("./js/src/core/utils/hooks/use-server-side-event.ts");
/* ESM import */var _Pimcore_utils_hooks_use_debounce__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__("./js/src/core/utils/hooks/use-debounce.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ if (true) {
    module.hot.accept();
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
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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
_s(ApiErrorViewUI, "vu2xTFBfHkv41zWfADiErp1aWcA=", false, function() {
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
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/error-handler/error-handler.tsx",
            lineNumber: 35,
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
"./js/src/core/utils/css.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  toCssDimension: () => (toCssDimension)
});
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/utils/helpers.tsx",
                    lineNumber: 28,
                    columnNumber: 49
                }, this))
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/utils/helpers.tsx",
            lineNumber: 28,
            columnNumber: 12
        }, this);
    } else {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
            children: textSplit.map((line, index, arr)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), {
                    children: [
                        line,
                        index < arr.length - 1 && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("br", {}, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/utils/helpers.tsx",
                            lineNumber: 34,
                            columnNumber: 38
                        }, this)
                    ]
                }, index, true, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/utils/helpers.tsx",
                    lineNumber: 31,
                    columnNumber: 54
                }, this))
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/utils/helpers.tsx",
            lineNumber: 31,
            columnNumber: 12
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
"./js/src/core/utils/hooks/use-css-container/use-css-container.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useCssContainerStyles: () => (useCssContainerStyles)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/antd-style/antd-style");
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd_style__WEBPACK_IMPORTED_MODULE_0__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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

}]);
//# sourceMappingURL=__federation_expose_utils.js.map