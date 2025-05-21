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
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setFooterValue(props.value ?? undefined);
        setMapValue(props.value ?? undefined);
    }, [
        props.value
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_geo_map_components_geo_map_card_geo_map_card__WEBPACK_IMPORTED_MODULE_3__.GeoMapCard, {
        className: props === null || props === void 0 ? void 0 : props.className,
        disabled: props.disabled,
        footer: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_geo_point_picker_footer__WEBPACK_IMPORTED_MODULE_2__.GeoPointPickerFooter, {
            disabled: props.disabled,
            onChange: onChangeFooter,
            value: footerValue
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-point-picker/geo-point-picker.tsx",
            lineNumber: 56,
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
        lineNumber: 53,
        columnNumber: 5
    }, undefined);
};
_s(GeoPointPicker, "pEgvXBlcCmJLIN+/vydduFDUCyM=");
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
//# sourceMappingURL=js_src_core_mf-bootstrap_ts.a0d9036988bc8648.hot-update.js.map