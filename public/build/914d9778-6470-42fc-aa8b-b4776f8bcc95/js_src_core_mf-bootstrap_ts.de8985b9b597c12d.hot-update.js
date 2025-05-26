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
                        console.log('------->>>>>> value: ', value);
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
                        lineNumber: 86,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/key-value-list/key-value-list.tsx",
                    lineNumber: 85,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("td", {
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_text_text__WEBPACK_IMPORTED_MODULE_4__.Text, {
                        children: fieldValue === 0 ? fieldValue : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_sanitize_html_sanitize_html__WEBPACK_IMPORTED_MODULE_5__.SanitizeHtml, {
                            html: fieldValue ?? ''
                        }, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/key-value-list/key-value-list.tsx",
                            lineNumber: 90,
                            columnNumber: 46
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/key-value-list/key-value-list.tsx",
                        lineNumber: 89,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/key-value-list/key-value-list.tsx",
                    lineNumber: 88,
                    columnNumber: 9
                }, undefined)
            ]
        }, item.key, true, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/key-value-list/key-value-list.tsx",
            lineNumber: 84,
            columnNumber: 7
        }, undefined);
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("table", {
        className: styles.keyValueList,
        children: preparedItems.map((item)=>renderItem(item))
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/key-value-list/key-value-list.tsx",
        lineNumber: 98,
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

});
//# sourceMappingURL=js_src_core_mf-bootstrap_ts.de8985b9b597c12d.hot-update.js.map