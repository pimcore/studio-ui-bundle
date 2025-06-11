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
"./js/src/core/utils/currency.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  formatCurrency: () => (formatCurrency)
});
/* ESM import */var i18next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/i18next/i18next");
/* ESM import */var i18next__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(i18next__WEBPACK_IMPORTED_MODULE_0__);
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
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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
"./js/src/core/utils/hooks/use-element-resize.ts": (function (module, __webpack_exports__, __webpack_require__) {
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
"./js/src/core/utils/query-string.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  buildQueryString: () => (buildQueryString)
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

}]);
//# sourceMappingURL=__federation_expose_utils.js.map