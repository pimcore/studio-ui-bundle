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
"./js/src/core/components/geo-poly-drawer/geo-poly-drawer.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  GeoPolyDrawer: () => (GeoPolyDrawer)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _footer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/geo-poly-drawer/footer.tsx");
/* ESM import */var _Pimcore_components_geo_map_components_geo_map_card_geo_map_card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/geo-map/components/geo-map-card/geo-map-card.tsx");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);
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




const GeoPolyDrawer = (param)=>{
    let { ...props } = param;
    _s();
    const [mapValue, setMapValue] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(props.value ?? undefined);
    const geoMapRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const handleChangeFooter = (newValue)=>{
        var _props_onChange;
        setMapValue(newValue);
        (_props_onChange = props.onChange) === null || _props_onChange === void 0 ? void 0 : _props_onChange.call(props, newValue);
        const geoMapAPI = geoMapRef.current;
        geoMapAPI === null || geoMapAPI === void 0 ? void 0 : geoMapAPI.reset();
        geoMapAPI === null || geoMapAPI === void 0 ? void 0 : geoMapAPI.forceRerender();
    };
    const handleChangeMap = (newValue)=>{
        var _props_onChange;
        setMapValue(newValue);
        (_props_onChange = props.onChange) === null || _props_onChange === void 0 ? void 0 : _props_onChange.call(props, newValue);
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_4__.isEqual)(mapValue, props.value)) {
            setMapValue(props.value ?? undefined);
        }
    }, [
        props.value
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_geo_map_components_geo_map_card_geo_map_card__WEBPACK_IMPORTED_MODULE_3__.GeoMapCard, {
        className: props.className,
        disabled: props.disabled,
        footer: props.disabled === true ? undefined : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_footer__WEBPACK_IMPORTED_MODULE_2__.GeoPolyDrawerFooter, {
            onChange: handleChangeFooter,
            onSearch: (geoPoint)=>{
                var _props_onChange;
                setMapValue(undefined);
                const geoMapAPI = geoMapRef.current;
                geoMapAPI === null || geoMapAPI === void 0 ? void 0 : geoMapAPI.setValue(undefined);
                if (geoPoint === undefined) {
                    geoMapAPI === null || geoMapAPI === void 0 ? void 0 : geoMapAPI.reset();
                } else {
                    geoMapAPI === null || geoMapAPI === void 0 ? void 0 : geoMapAPI.setLat(geoPoint.latitude);
                    geoMapAPI === null || geoMapAPI === void 0 ? void 0 : geoMapAPI.setLng(geoPoint.longitude);
                    geoMapAPI === null || geoMapAPI === void 0 ? void 0 : geoMapAPI.setZoom(15);
                }
                geoMapAPI === null || geoMapAPI === void 0 ? void 0 : geoMapAPI.forceRerender();
                (_props_onChange = props.onChange) === null || _props_onChange === void 0 ? void 0 : _props_onChange.call(props, undefined);
            },
            value: mapValue
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-poly-drawer/geo-poly-drawer.tsx",
            lineNumber: 57,
            columnNumber: 11
        }, void 0),
        height: props.height,
        lat: props.lat,
        lng: props.lng,
        mapMode: props.mode,
        mapValue: mapValue,
        onChangeMap: handleChangeMap,
        ref: geoMapRef,
        width: props.width,
        zoom: props.zoom
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-poly-drawer/geo-poly-drawer.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, undefined);
};
_s(GeoPolyDrawer, "Pm3gmYukZKwrSGM5tcKJ2Fa9oMQ=");
_c = GeoPolyDrawer;
var _c;
$RefreshReg$(_c, "GeoPolyDrawer");

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
//# sourceMappingURL=js_src_core_mf-bootstrap_ts.94a0a41899e3a8d6.hot-update.js.map