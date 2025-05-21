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
"./js/src/core/components/geo-point-picker/footer.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  GeoPointPickerFooter: () => (GeoPointPickerFooter)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/form/form.tsx");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/dropdown/dropdown.tsx");
/* ESM import */var _Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/box/box.tsx");
/* ESM import */var _Pimcore_components_geo_point_picker_geo_point_picker_styles__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/components/geo-point-picker/geo-point-picker.styles.ts");
/* ESM import */var _Pimcore_components_geo_map_components_geo_map_card_footer_geo_map_card_footer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/components/geo-map/components/geo-map-card-footer/geo-map-card-footer.tsx");
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










const GeoPointPickerFooter = (props)=>{
    var _props_value, _props_value1;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation)();
    const { styles } = (0,_Pimcore_components_geo_point_picker_geo_point_picker_styles__WEBPACK_IMPORTED_MODULE_9__.useStyles)();
    const [form] = _Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_5__.Form.useForm();
    const valueToGeoPoint = (val)=>{
        if ((val === null || val === void 0 ? void 0 : val.latitude) === undefined || val.longitude === undefined) {
            return undefined;
        }
        return {
            latitude: val.latitude,
            longitude: val.longitude
        };
    };
    const handleChange = ()=>{
        var _props_onChange;
        const fieldValues = form.getFieldsValue();
        const newValue = valueToGeoPoint(fieldValues);
        (_props_onChange = props.onChange) === null || _props_onChange === void 0 ? void 0 : _props_onChange.call(props, newValue);
    };
    const clearValue = ()=>{
        var _props_onChange;
        form.resetFields();
        (_props_onChange = props.onChange) === null || _props_onChange === void 0 ? void 0 : _props_onChange.call(props, undefined);
    };
    const handleSearch = (geoPoint)=>{
        var _props_onChange;
        const newValue = {
            latitude: geoPoint === null || geoPoint === void 0 ? void 0 : geoPoint.latitude,
            longitude: geoPoint === null || geoPoint === void 0 ? void 0 : geoPoint.longitude
        };
        form.setFieldsValue(newValue);
        (_props_onChange = props.onChange) === null || _props_onChange === void 0 ? void 0 : _props_onChange.call(props, geoPoint);
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_geo_map_components_geo_map_card_footer_geo_map_card_footer__WEBPACK_IMPORTED_MODULE_10__.GeoMapCardFooter, {
        disabled: props.disabled,
        dropdown: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_7__.Dropdown, {
            menu: {
                items: [
                    {
                        key: 'form',
                        type: 'custom',
                        component: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_8__.Box, {
                            margin: {
                                x: 'extra-small'
                            },
                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_5__.Form, {
                                className: styles.geoForm,
                                form: form,
                                layout: "vertical",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_5__.Form.Item, {
                                        label: t('latitude'),
                                        name: "latitude",
                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.InputNumber, {
                                            disabled: props.disabled,
                                            onChange: handleChange
                                        }, void 0, false, {
                                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-point-picker/footer.tsx",
                                            lineNumber: 91,
                                            columnNumber: 25
                                        }, void 0)
                                    }, void 0, false, {
                                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-point-picker/footer.tsx",
                                        lineNumber: 87,
                                        columnNumber: 23
                                    }, void 0),
                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_5__.Form.Item, {
                                        label: t('longitude'),
                                        name: "longitude",
                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.InputNumber, {
                                            disabled: props.disabled,
                                            onChange: handleChange
                                        }, void 0, false, {
                                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-point-picker/footer.tsx",
                                            lineNumber: 100,
                                            columnNumber: 25
                                        }, void 0)
                                    }, void 0, false, {
                                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-point-picker/footer.tsx",
                                        lineNumber: 96,
                                        columnNumber: 23
                                    }, void 0)
                                ]
                            }, void 0, true, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-point-picker/footer.tsx",
                                lineNumber: 82,
                                columnNumber: 21
                            }, void 0)
                        }, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-point-picker/footer.tsx",
                            lineNumber: 81,
                            columnNumber: 19
                        }, void 0)
                    }
                ]
            },
            placement: "bottomLeft",
            trigger: [
                'click'
            ],
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.Button, {
                icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_6__.Icon, {
                    className: "dropdown-menu__icon",
                    value: "more"
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-point-picker/footer.tsx",
                    lineNumber: 115,
                    columnNumber: 20
                }, void 0),
                onClick: (e)=>{
                    e.stopPropagation();
                }
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-point-picker/footer.tsx",
                lineNumber: 114,
                columnNumber: 11
            }, void 0)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-point-picker/footer.tsx",
            lineNumber: 74,
            columnNumber: 9
        }, void 0),
        emptyValue: clearValue,
        onSearch: handleSearch,
        removeButtonDisabled: (0,lodash__WEBPACK_IMPORTED_MODULE_2__.isUndefined)(props === null || props === void 0 ? void 0 : (_props_value = props.value) === null || _props_value === void 0 ? void 0 : _props_value.latitude) && (0,lodash__WEBPACK_IMPORTED_MODULE_2__.isUndefined)(props === null || props === void 0 ? void 0 : (_props_value1 = props.value) === null || _props_value1 === void 0 ? void 0 : _props_value1.longitude) || props.disabled
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-point-picker/footer.tsx",
        lineNumber: 71,
        columnNumber: 5
    }, undefined);
};
_s(GeoPointPickerFooter, "DeoouKHFwItexBnYH13MEwALhkM=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation,
        _Pimcore_components_geo_point_picker_geo_point_picker_styles__WEBPACK_IMPORTED_MODULE_9__.useStyles,
        _Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_5__.Form.useForm
    ];
});
_c = GeoPointPickerFooter;
var _c;
$RefreshReg$(_c, "GeoPointPickerFooter");

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
"./js/src/core/components/geo-point-picker/geo-point-picker.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyles: () => (useStyles)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/antd-style/es/functions/index.js");
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
const useStyles = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param)=>{
    let { token, css } = param;
    return {
        geoForm: css`
      .ant-input-number {
        width: 138px !important;
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
"./js/src/core/components/geo-point-picker/geo-point-picker.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  GeoPointPicker: () => (GeoPointPicker)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_geo_point_picker_footer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/geo-point-picker/footer.tsx");
/* ESM import */var _Pimcore_components_geo_map_components_geo_map_card_geo_map_card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/geo-map/components/geo-map-card/geo-map-card.tsx");
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



const GeoPointPicker = (param)=>{
    let { ...props } = param;
    _s();
    const [footerValue, setFooterValue] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(props.value ?? undefined);
    const [mapValue, setMapValue] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(props.value ?? undefined);
    const geoMapRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const onChangeFooter = (newValue)=>{
        var _props_onChange;
        setFooterValue(newValue);
        setMapValue(newValue);
        (_props_onChange = props.onChange) === null || _props_onChange === void 0 ? void 0 : _props_onChange.call(props, newValue);
        const geoMapAPI = geoMapRef.current;
        geoMapAPI === null || geoMapAPI === void 0 ? void 0 : geoMapAPI.forceRerender();
    };
    const onChangeMap = (newValue)=>{
        var _props_onChange;
        setFooterValue(newValue);
        (_props_onChange = props.onChange) === null || _props_onChange === void 0 ? void 0 : _props_onChange.call(props, newValue);
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_geo_map_components_geo_map_card_geo_map_card__WEBPACK_IMPORTED_MODULE_3__.GeoMapCard, {
        className: props === null || props === void 0 ? void 0 : props.className,
        disabled: props.disabled,
        footer: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_geo_point_picker_footer__WEBPACK_IMPORTED_MODULE_2__.GeoPointPickerFooter, {
            disabled: props.disabled,
            onChange: onChangeFooter,
            value: footerValue
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-point-picker/geo-point-picker.tsx",
            lineNumber: 51,
            columnNumber: 16
        }, void 0),
        height: props.height,
        lat: props.lat,
        lng: props.lng,
        mapMode: 'geoPoint',
        mapValue: mapValue,
        onChangeMap: onChangeMap,
        ref: geoMapRef,
        width: props.width,
        zoom: props.zoom
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-point-picker/geo-point-picker.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, undefined);
};
_s(GeoPointPicker, "N5yznWqDsrOSP1VFSKp4RezW0oc=");
_c = GeoPointPicker;
var _c;
$RefreshReg$(_c, "GeoPointPicker");

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
//# sourceMappingURL=js_src_core_mf-bootstrap_ts.6732bd13d056677a.hot-update.js.map