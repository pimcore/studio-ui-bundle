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
"./js/src/core/components/date-picker/date-picker.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DatePicker: () => (DatePicker)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _utils_date_picker_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/date-picker/utils/date-picker-utils.ts");
/* ESM import */var _Pimcore_components_date_picker_date_range_picker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/date-picker/date-range-picker.tsx");
/* ESM import */var _Pimcore_components_date_picker_time_picker__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/date-picker/time-picker.tsx");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_6__);
/* ESM import */var _date_picker_styles__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/date-picker/date-picker.styles.tsx");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./node_modules/classnames/index.js");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_8__);
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








const DatePickerComponent = (props)=>{
    _s();
    const [value, setValue] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)((0,_utils_date_picker_utils__WEBPACK_IMPORTED_MODULE_3__.toDayJs)(props.value));
    const { styles } = (0,_date_picker_styles__WEBPACK_IMPORTED_MODULE_7__.useStyles)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const localValue = (0,_utils_date_picker_utils__WEBPACK_IMPORTED_MODULE_3__.fromDayJs)(value, 'timestamp');
        if (!lodash__WEBPACK_IMPORTED_MODULE_6___default().isEqual((0,_utils_date_picker_utils__WEBPACK_IMPORTED_MODULE_3__.fromDayJs)((0,_utils_date_picker_utils__WEBPACK_IMPORTED_MODULE_3__.toDayJs)(props.value), 'timestamp'), localValue)) {
            setValue((0,_utils_date_picker_utils__WEBPACK_IMPORTED_MODULE_3__.toDayJs)(props.value));
        }
    }, [
        props.value
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.DatePicker, {
        ...props,
        format: props.outputFormat,
        onChange: (date)=>{
            var _props_onChange;
            setValue(date);
            (_props_onChange = props.onChange) === null || _props_onChange === void 0 ? void 0 : _props_onChange.call(props, (0,_utils_date_picker_utils__WEBPACK_IMPORTED_MODULE_3__.fromDayJs)(date, props.outputType, props.outputFormat));
        },
        popupClassName: styles.datePickerDropdown,
        rootClassName: classnames__WEBPACK_IMPORTED_MODULE_8___default()(styles.datePicker, props.className, {
            [styles.inherited]: props.inherited
        }),
        showTime: props.showTime,
        value: value
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/date-picker/date-picker.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, undefined);
};
_s(DatePickerComponent, "ZLeYUcszlePOTIeN3L10AxS9hCY=", false, function() {
    return [
        _date_picker_styles__WEBPACK_IMPORTED_MODULE_7__.useStyles
    ];
});
_c = DatePickerComponent;
const DatePicker = Object.assign(DatePickerComponent, {
    RangePicker: _Pimcore_components_date_picker_date_range_picker__WEBPACK_IMPORTED_MODULE_4__.DateRangePicker,
    TimePicker: _Pimcore_components_date_picker_time_picker__WEBPACK_IMPORTED_MODULE_5__.TimePicker
});
_c1 = DatePicker;
var _c, _c1;
$RefreshReg$(_c, "DatePickerComponent");
$RefreshReg$(_c1, "DatePicker");

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
"./js/src/core/components/date-picker/date-range-picker.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DateRangePicker: () => (DateRangePicker)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _utils_date_picker_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/date-picker/utils/date-picker-utils.ts");
/* ESM import */var _Pimcore_components_date_picker_date_picker_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/date-picker/date-picker.styles.tsx");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/classnames/index.js");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_5__);
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
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






const valueToDayJs = (value)=>{
    if (Array.isArray(value)) {
        return [
            (0,_utils_date_picker_utils__WEBPACK_IMPORTED_MODULE_3__.toDayJs)(value[0]),
            (0,_utils_date_picker_utils__WEBPACK_IMPORTED_MODULE_3__.toDayJs)(value[1])
        ];
    }
    return null;
};
const valueFromDayJs = (value, outputType, outputFormat)=>{
    if (value === null) {
        return null;
    }
    return [
        (0,_utils_date_picker_utils__WEBPACK_IMPORTED_MODULE_3__.fromDayJs)(value[0], outputType, outputFormat),
        (0,_utils_date_picker_utils__WEBPACK_IMPORTED_MODULE_3__.fromDayJs)(value[1], outputType, outputFormat)
    ];
};
const DateRangePicker = (props)=>{
    _s();
    const [value, setValue] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(valueToDayJs(props.value));
    const { styles } = (0,_Pimcore_components_date_picker_date_picker_styles__WEBPACK_IMPORTED_MODULE_4__.useStyles)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.DatePicker.RangePicker, {
        ...props,
        onChange: (dates)=>{
            var _props_onChange;
            setValue(dates);
            (_props_onChange = props.onChange) === null || _props_onChange === void 0 ? void 0 : _props_onChange.call(props, valueFromDayJs(dates, props.outputType, props.outputFormat));
        },
        popupClassName: styles.datePickerDropdown,
        rootClassName: classnames__WEBPACK_IMPORTED_MODULE_5___default()(styles.datePicker, props.className, {
            [styles.inherited]: props.inherited
        }),
        separator: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_6__.Icon, {
            value: "arrow-narrow-right"
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/date-picker/date-range-picker.tsx",
            lineNumber: 71,
            columnNumber: 19
        }, void 0),
        value: value
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/date-picker/date-range-picker.tsx",
        lineNumber: 63,
        columnNumber: 5
    }, undefined);
};
_s(DateRangePicker, "75KnSMS5w5WgpdJdfUtf1CxkL5Y=", false, function() {
    return [
        _Pimcore_components_date_picker_date_picker_styles__WEBPACK_IMPORTED_MODULE_4__.useStyles
    ];
});
_c = DateRangePicker;
var _c;
$RefreshReg$(_c, "DateRangePicker");

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
//# sourceMappingURL=js_src_core_mf-bootstrap_ts.e37aea7a317ccf5e.hot-update.js.map