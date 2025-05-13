"use strict";
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["__federation_expose_utils"], {
"./node_modules/uuid/dist/esm-browser/native.js": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__WEBPACK_DEFAULT_EXPORT__)
});
var randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  randomUUID
});

}),
"./node_modules/uuid/dist/esm-browser/regex.js": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__WEBPACK_DEFAULT_EXPORT__)
});
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i);

}),
"./node_modules/uuid/dist/esm-browser/rng.js": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (rng)
});
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).

var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }
  return getRandomValues(rnds8);
}

}),
"./node_modules/uuid/dist/esm-browser/stringify.js": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__WEBPACK_DEFAULT_EXPORT__),
  unsafeStringify: () => (unsafeStringify)
});
/* ESM import */var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/uuid/dist/esm-browser/validate.js");


/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  //
  // Note to future-self: No, you can't remove the `toLowerCase()` call.
  // REF: https://github.com/uuidjs/uuid/pull/677#issuecomment-1757351351
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}
function stringify(arr, offset = 0) {
  var uuid = unsafeStringify(arr, offset);
  // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields
  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }
  return uuid;
}
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);

}),
"./node_modules/uuid/dist/esm-browser/v4.js": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__WEBPACK_DEFAULT_EXPORT__)
});
/* ESM import */var _native_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/uuid/dist/esm-browser/native.js");
/* ESM import */var _rng_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/uuid/dist/esm-browser/rng.js");
/* ESM import */var _stringify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/uuid/dist/esm-browser/stringify.js");



function v4(options, buf, offset) {
  if (_native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID && !buf && !options) {
    return _native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID();
  }
  options = options || {};
  var rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"])();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    offset = offset || 0;
    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_2__.unsafeStringify)(rnds);
}
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);

}),
"./node_modules/uuid/dist/esm-browser/validate.js": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__WEBPACK_DEFAULT_EXPORT__)
});
/* ESM import */var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/uuid/dist/esm-browser/regex.js");

function validate(uuid) {
  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__["default"].test(uuid);
}
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);

}),
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
"./js/src/core/utils/compose.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  compose: () => (compose)
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
"./js/src/core/utils/currency.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  formatCurrency: () => (formatCurrency)
});
/* ESM import */var i18next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/i18next/dist/esm/i18next.js");
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
function formatCurrency(param) {
    let { value, lng, options } = param;
    if (lng === undefined) {
        lng = i18next__WEBPACK_IMPORTED_MODULE_0__["default"].language;
    }
    return i18next__WEBPACK_IMPORTED_MODULE_0__["default"].format(value, 'currency', lng, {
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
/* ESM import */var i18next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/i18next/dist/esm/i18next.js");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
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


function formatDateTime(param) {
    let { timestamp, lng, timeStyle, dateStyle, options } = param;
    if (lng === undefined) {
        lng = i18next__WEBPACK_IMPORTED_MODULE_0__["default"].language;
    }
    if (timestamp === null) {
        return '';
    }
    try {
        const date = new Date((0,lodash__WEBPACK_IMPORTED_MODULE_2__.isNumber)(timestamp) ? timestamp * 1000 : timestamp);
        return i18next__WEBPACK_IMPORTED_MODULE_0__["default"].format(date, 'datetime', lng, {
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
                    lineNumber: 35,
                    columnNumber: 9
                }, this))
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/utils/helpers.tsx",
            lineNumber: 34,
            columnNumber: 7
        }, this);
    } else {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
            children: textSplit.map((line, index, arr)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), {
                    children: [
                        line,
                        index < arr.length - 1 && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("br", {}, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/utils/helpers.tsx",
                            lineNumber: 44,
                            columnNumber: 38
                        }, this)
                    ]
                }, index, true, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/utils/helpers.tsx",
                    lineNumber: 41,
                    columnNumber: 9
                }, this))
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/utils/helpers.tsx",
            lineNumber: 40,
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
"./js/src/core/utils/hooks/use-element-resize.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__WEBPACK_DEFAULT_EXPORT__)
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
const useElementResize = (ref)=>{
    const [width, setWidth] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
    // Get initial width before the render phase
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)(()=>{
        var _ref_current;
        setWidth(((_ref_current = ref.current) === null || _ref_current === void 0 ? void 0 : _ref_current.getBoundingClientRect().width) ?? 0);
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (ref.current == null) return;
        const resizeObserver = new ResizeObserver((param)=>{
            let [entry] = param;
            const newWidth = entry.contentRect.width;
            setWidth((prevWidth)=>{
                if (newWidth !== 0 && prevWidth !== newWidth) {
                    return newWidth;
                }
                return prevWidth;
            });
        });
        resizeObserver.observe(ref.current);
        return ()=>{
            resizeObserver.disconnect();
        };
    }, [
        ref
    ]);
    return width;
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
  "default": () => (__WEBPACK_DEFAULT_EXPORT__)
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
"./js/src/core/utils/number.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  formatNumber: () => (formatNumber)
});
/* ESM import */var i18next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/i18next/dist/esm/i18next.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
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

function formatNumber(param) {
    let { value, lng, options = {
        useGrouping: false
    } } = param;
    if ((0,lodash__WEBPACK_IMPORTED_MODULE_1__.isNil)(value)) {
        return '';
    }
    if (lng === undefined) {
        lng = i18next__WEBPACK_IMPORTED_MODULE_0__["default"].language;
    }
    return i18next__WEBPACK_IMPORTED_MODULE_0__["default"].format(value, 'number', lng, options);
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
"./js/src/core/utils/query-string.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  buildQueryString: () => (buildQueryString)
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
/* ESM import */var i18next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/i18next/dist/esm/i18next.js");
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
function formatRelativeTime(param) {
    let { value, unit, lng, options } = param;
    if (lng === undefined) {
        lng = i18next__WEBPACK_IMPORTED_MODULE_0__["default"].language;
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
"./js/src/core/utils/uuid.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  uuid: () => (uuid)
});
/* ESM import */var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/uuid/dist/esm-browser/v4.js");
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
function uuid() {
    return (0,uuid__WEBPACK_IMPORTED_MODULE_0__["default"])();
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
  buildQueryString: () => (/* reexport safe */ _Pimcore_utils_query_string__WEBPACK_IMPORTED_MODULE_9__.buildQueryString),
  compose: () => (/* reexport safe */ _Pimcore_utils_compose__WEBPACK_IMPORTED_MODULE_0__.compose),
  fetchBlobWithPolling: () => (/* reexport safe */ _Pimcore_utils_polling_helper__WEBPACK_IMPORTED_MODULE_8__.fetchBlobWithPolling),
  formatCurrency: () => (/* reexport safe */ _Pimcore_utils_currency__WEBPACK_IMPORTED_MODULE_2__.formatCurrency),
  formatDataUnit: () => (/* reexport safe */ _Pimcore_utils_data_unit__WEBPACK_IMPORTED_MODULE_3__.formatDataUnit),
  formatDate: () => (/* reexport safe */ _Pimcore_utils_date_time__WEBPACK_IMPORTED_MODULE_4__.formatDate),
  formatDateTime: () => (/* reexport safe */ _Pimcore_utils_date_time__WEBPACK_IMPORTED_MODULE_4__.formatDateTime),
  formatNumber: () => (/* reexport safe */ _Pimcore_utils_number__WEBPACK_IMPORTED_MODULE_7__.formatNumber),
  formatRelativeTime: () => (/* reexport safe */ _Pimcore_utils_relative_time__WEBPACK_IMPORTED_MODULE_10__.formatRelativeTime),
  formatTime: () => (/* reexport safe */ _Pimcore_utils_date_time__WEBPACK_IMPORTED_MODULE_4__.formatTime),
  isSet: () => (/* reexport safe */ _Pimcore_utils_helpers__WEBPACK_IMPORTED_MODULE_6__.isSet),
  onKeyEnterExecuteClick: () => (/* reexport safe */ _Pimcore_utils_helpers__WEBPACK_IMPORTED_MODULE_6__.onKeyEnterExecuteClick),
  replaceFileEnding: () => (/* reexport safe */ _Pimcore_utils_files__WEBPACK_IMPORTED_MODULE_5__.replaceFileEnding),
  respectLineBreak: () => (/* reexport safe */ _Pimcore_utils_helpers__WEBPACK_IMPORTED_MODULE_6__.respectLineBreak),
  saveFileLocal: () => (/* reexport safe */ _Pimcore_utils_files__WEBPACK_IMPORTED_MODULE_5__.saveFileLocal),
  toCssDimension: () => (/* reexport safe */ _Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_1__.toCssDimension),
  useClickOutside: () => (/* reexport safe */ _Pimcore_utils_hooks_use_click_outside__WEBPACK_IMPORTED_MODULE_12__.useClickOutside),
  useCssContainer: () => (/* reexport safe */ _Pimcore_utils_hooks_use_css_container_use_css_container__WEBPACK_IMPORTED_MODULE_13__.useCssContainer),
  usePrevious: () => (/* reexport safe */ _Pimcore_utils_hooks_use_previous__WEBPACK_IMPORTED_MODULE_16__.usePrevious),
  useServerSideEvent: () => (/* reexport safe */ _Pimcore_utils_hooks_use_server_side_event__WEBPACK_IMPORTED_MODULE_17__.useServerSideEvent),
  uuid: () => (/* reexport safe */ _Pimcore_utils_uuid__WEBPACK_IMPORTED_MODULE_11__.uuid)
});
/* ESM import */var _Pimcore_utils_compose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/utils/compose.ts");
/* ESM import */var _Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/utils/css.tsx");
/* ESM import */var _Pimcore_utils_currency__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/utils/currency.ts");
/* ESM import */var _Pimcore_utils_data_unit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/utils/data-unit.ts");
/* ESM import */var _Pimcore_utils_date_time__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/utils/date-time.ts");
/* ESM import */var _Pimcore_utils_files__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/utils/files.ts");
/* ESM import */var _Pimcore_utils_helpers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/utils/helpers.tsx");
/* ESM import */var _Pimcore_utils_number__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/utils/number.ts");
/* ESM import */var _Pimcore_utils_polling_helper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/utils/polling-helper.ts");
/* ESM import */var _Pimcore_utils_query_string__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/utils/query-string.ts");
/* ESM import */var _Pimcore_utils_relative_time__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/utils/relative-time.ts");
/* ESM import */var _Pimcore_utils_uuid__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/utils/uuid.ts");
/* ESM import */var _Pimcore_utils_hooks_use_click_outside__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/utils/hooks/use-click-outside.ts");
/* ESM import */var _Pimcore_utils_hooks_use_css_container_use_css_container__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/utils/hooks/use-css-container/use-css-container.tsx");
/* ESM import */var _Pimcore_utils_hooks_use_element_resize__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/utils/hooks/use-element-resize.ts");
/* ESM import */var _Pimcore_utils_hooks_use_element_visible__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./js/src/core/utils/hooks/use-element-visible.ts");
/* ESM import */var _Pimcore_utils_hooks_use_previous__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("./js/src/core/utils/hooks/use-previous.ts");
/* ESM import */var _Pimcore_utils_hooks_use_server_side_event__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("./js/src/core/utils/hooks/use-server-side-event.ts");
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