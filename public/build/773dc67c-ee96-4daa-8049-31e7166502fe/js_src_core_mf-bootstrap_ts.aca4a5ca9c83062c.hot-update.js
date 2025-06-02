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
"./js/src/core/modules/element/dynamic-types/definitions/field-filters/components/dynamic-type-field-filter-datetime-component.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DynamicTypeFieldFilterDatetimeComponent: () => (DynamicTypeFieldFilterDatetimeComponent)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_select_select__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/select/select.tsx");
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var _Pimcore_components_date_picker_date_picker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/date-picker/date-picker.tsx");
/* ESM import */var _Pimcore_components_date_picker_date_range_picker__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/date-picker/date-range-picker.tsx");
/* ESM import */var _Pimcore_components_dynamic_filter_provider_use_dynamic_filter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/dynamic-filter/provider/use-dynamic-filter.ts");
/* ESM import */var i18next__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("webpack/sharing/consume/default/i18next/i18next");
/* ESM import */var i18next__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(i18next__WEBPACK_IMPORTED_MODULE_7__);
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







var DatePickerSettingValue = /*#__PURE__*/ function(DatePickerSettingValue) {
    DatePickerSettingValue["ON"] = "on";
    DatePickerSettingValue["BETWEEN"] = "between";
    DatePickerSettingValue["BEFORE"] = "before";
    DatePickerSettingValue["AFTER"] = "after";
    return DatePickerSettingValue;
}(DatePickerSettingValue || {});
const DATE_FORMAT = 'YYYY-MM-DD';
const DynamicTypeFieldFilterDatetimeComponent = (props)=>{
    _s();
    const { data: rawData, setData } = (0,_Pimcore_components_dynamic_filter_provider_use_dynamic_filter__WEBPACK_IMPORTED_MODULE_6__.useDynamicFilter)();
    const data = rawData ?? {
        setting: "on",
        from: null,
        to: null,
        on: null
    };
    const SETTING_OPTIONS = [
        {
            label: (0,i18next__WEBPACK_IMPORTED_MODULE_7__.t)('grid.filter.datetime.on'),
            value: "on"
        },
        {
            label: (0,i18next__WEBPACK_IMPORTED_MODULE_7__.t)('grid.filter.datetime.between'),
            value: "between"
        },
        {
            label: (0,i18next__WEBPACK_IMPORTED_MODULE_7__.t)('grid.filter.datetime.before'),
            value: "before"
        },
        {
            label: (0,i18next__WEBPACK_IMPORTED_MODULE_7__.t)('grid.filter.datetime.after'),
            value: "after"
        }
    ];
    const currentSetting = (data === null || data === void 0 ? void 0 : data.setting) ?? "on";
    const handleSettingChange = (newSetting)=>{
        const prevData = data ?? {
            from: null,
            to: null,
            on: null,
            setting: "on"
        };
        if (newSetting === "before") {
            setData({
                setting: newSetting,
                from: null,
                to: prevData.to ?? prevData.on ?? prevData.from ?? null,
                on: null
            });
        } else if (newSetting === "after") {
            setData({
                setting: newSetting,
                from: prevData.from ?? prevData.on ?? prevData.to ?? null,
                to: null,
                on: null
            });
        } else if (newSetting === "on") {
            setData({
                setting: newSetting,
                from: null,
                to: null,
                on: prevData.from ?? prevData.to ?? null
            });
        } else if (newSetting === "between") {
            setData({
                setting: newSetting,
                from: prevData.from ?? prevData.on ?? null,
                to: prevData.to ?? null,
                on: null
            });
        }
    };
    const handleDateChange = (field, value)=>{
        setData({
            setting: currentSetting,
            from: field === 'from' ? value : null,
            to: field === 'to' ? value : null,
            on: field === 'on' ? value : null
        });
    };
    const handleDateRangeChange = (newFrom, newTo)=>{
        setData({
            setting: data.setting,
            from: newFrom ?? data.from ?? null,
            to: newTo ?? data.to ?? null,
            on: null
        });
    };
    const getDatePickerValue = ()=>{
        if (currentSetting === "on") {
            return (data === null || data === void 0 ? void 0 : data.on) ?? null;
        } else if (currentSetting === "before") {
            return (data === null || data === void 0 ? void 0 : data.to) ?? null;
        } else if (currentSetting === "after") {
            return (data === null || data === void 0 ? void 0 : data.from) ?? null;
        } else return null;
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_3__.Flex, {
        align: "center",
        gap: "extra-small",
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_select_select__WEBPACK_IMPORTED_MODULE_2__.Select, {
                defaultValue: "on",
                onChange: (value)=>{
                    handleSettingChange(value);
                },
                options: SETTING_OPTIONS,
                width: 90
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/field-filters/components/dynamic-type-field-filter-datetime-component.tsx",
                lineNumber: 126,
                columnNumber: 7
            }, undefined),
            currentSetting === "between" && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_date_picker_date_range_picker__WEBPACK_IMPORTED_MODULE_5__.DateRangePicker, {
                allowEmpty: [
                    true,
                    true
                ],
                format: DATE_FORMAT,
                onChange: (value)=>{
                    const [newFrom, newTo] = value;
                    handleDateRangeChange(newFrom, newTo);
                },
                outputType: "timestamp",
                value: [
                    (data === null || data === void 0 ? void 0 : data.from) ?? null,
                    (data === null || data === void 0 ? void 0 : data.to) ?? null
                ]
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/field-filters/components/dynamic-type-field-filter-datetime-component.tsx",
                lineNumber: 134,
                columnNumber: 9
            }, undefined),
            currentSetting !== "between" && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_date_picker_date_picker__WEBPACK_IMPORTED_MODULE_4__.DatePicker, {
                format: DATE_FORMAT,
                onChange: (value)=>{
                    const newValue = typeof value === 'number' ? value : null;
                    if (currentSetting === "on") {
                        handleDateChange('on', newValue);
                    } else if (currentSetting === "before") {
                        handleDateChange('to', newValue);
                    } else if (currentSetting === "after") {
                        handleDateChange('from', newValue);
                    }
                },
                outputType: "timestamp",
                value: getDatePickerValue()
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/field-filters/components/dynamic-type-field-filter-datetime-component.tsx",
                lineNumber: 147,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/field-filters/components/dynamic-type-field-filter-datetime-component.tsx",
        lineNumber: 122,
        columnNumber: 5
    }, undefined);
};
_s(DynamicTypeFieldFilterDatetimeComponent, "JtaJJTfdbnK1FexOHVkUWQSRISY=", false, function() {
    return [
        _Pimcore_components_dynamic_filter_provider_use_dynamic_filter__WEBPACK_IMPORTED_MODULE_6__.useDynamicFilter
    ];
});
_c = DynamicTypeFieldFilterDatetimeComponent;
var _c;
$RefreshReg$(_c, "DynamicTypeFieldFilterDatetimeComponent");

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
//# sourceMappingURL=js_src_core_mf-bootstrap_ts.aca4a5ca9c83062c.hot-update.js.map