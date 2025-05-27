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
"./js/src/core/components/date-picker/time-picker.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TimePicker: () => (TimePicker)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _utils_date_picker_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/date-picker/utils/date-picker-utils.ts");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/classnames/index.js");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var _Pimcore_components_date_picker_date_picker_styles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/date-picker/date-picker.styles.tsx");
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





const TimePicker = (props)=>{
    _s();
    const outputFormat = (props === null || props === void 0 ? void 0 : props.outputFormat) ?? 'HH:mm:ss';
    const value = (0,_utils_date_picker_utils__WEBPACK_IMPORTED_MODULE_2__.toDayJs)(props.value, outputFormat);
    const { styles } = (0,_Pimcore_components_date_picker_date_picker_styles__WEBPACK_IMPORTED_MODULE_5__.useStyles)();
    const handleChange = (date)=>{
        var _props_onChange;
        (_props_onChange = props.onChange) === null || _props_onChange === void 0 ? void 0 : _props_onChange.call(props, (0,_utils_date_picker_utils__WEBPACK_IMPORTED_MODULE_2__.fromDayJs)(date, props.outputType, outputFormat));
    };
    const OriginalTimePicker = antd__WEBPACK_IMPORTED_MODULE_3__.DatePicker.TimePicker;
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(OriginalTimePicker, {
        ...props,
        onChange: handleChange,
        popupClassName: styles.datePickerDropdown,
        rootClassName: classnames__WEBPACK_IMPORTED_MODULE_4___default()(styles.datePicker, props.className, {
            [styles.inherited]: props.inherited
        }),
        value: value
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/date-picker/time-picker.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, undefined);
};
_s(TimePicker, "1BGFRu6BGAbhzJ8kKgs1GUjvI6w=", false, function() {
    return [
        _Pimcore_components_date_picker_date_picker_styles__WEBPACK_IMPORTED_MODULE_5__.useStyles
    ];
});
_c = TimePicker;
var _c;
$RefreshReg$(_c, "TimePicker");

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
"./js/src/core/components/geo-bounds-drawer/footer.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  GeoBoundsDrawerFooter: () => (GeoBoundsDrawerFooter)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_geo_map_components_geo_map_card_footer_geo_map_card_footer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/geo-map/components/geo-map-card-footer/geo-map-card-footer.tsx");
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


const GeoBoundsDrawerFooter = (props)=>{
    const clearValue = ()=>{
        if (props.onChange !== undefined) {
            props.onChange(undefined);
        }
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_geo_map_components_geo_map_card_footer_geo_map_card_footer__WEBPACK_IMPORTED_MODULE_2__.GeoMapCardFooter, {
        emptyValue: clearValue,
        onSearch: props.onSearch,
        removeButtonDisabled: props.value === undefined
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-bounds-drawer/footer.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, undefined);
};
_c = GeoBoundsDrawerFooter;
var _c;
$RefreshReg$(_c, "GeoBoundsDrawerFooter");

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
"./js/src/core/components/geo-bounds-drawer/geo-bounds-drawer.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  GeoBoundsDrawer: () => (GeoBoundsDrawer)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _footer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/geo-bounds-drawer/footer.tsx");
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




const GeoBoundsDrawer = (param)=>{
    let { ...props } = param;
    _s();
    const [mapValue, setMapValue] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(props.value ?? undefined);
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
        className: props === null || props === void 0 ? void 0 : props.className,
        disabled: props.disabled,
        footer: props.disabled === true ? undefined : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_footer__WEBPACK_IMPORTED_MODULE_2__.GeoBoundsDrawerFooter, {
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
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-bounds-drawer/geo-bounds-drawer.tsx",
            lineNumber: 56,
            columnNumber: 11
        }, void 0),
        height: props.height,
        lat: props.lat,
        lng: props.lng,
        mapMode: "geoBounds",
        mapValue: mapValue,
        onChangeMap: handleChangeMap,
        ref: geoMapRef,
        width: props.width,
        zoom: props.zoom
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-bounds-drawer/geo-bounds-drawer.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, undefined);
};
_s(GeoBoundsDrawer, "Pm3gmYukZKwrSGM5tcKJ2Fa9oMQ=");
_c = GeoBoundsDrawer;
var _c;
$RefreshReg$(_c, "GeoBoundsDrawer");

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
"./js/src/core/components/geo-map/geo-map.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  GeoMap: () => (GeoMap)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var leaflet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/leaflet/dist/leaflet-src.js");
/* ESM import */var leaflet__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var leaflet_dist_leaflet_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/leaflet/dist/leaflet.css");
/* ESM import */var leaflet_draw__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/leaflet-draw/dist/leaflet.draw.js");
/* ESM import */var leaflet_draw__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(leaflet_draw__WEBPACK_IMPORTED_MODULE_5__);
/* ESM import */var leaflet_draw_dist_leaflet_draw_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/leaflet-draw/dist/leaflet.draw.css");
/* ESM import */var _Pimcore_components_geo_map_toolbar_add_geo_point_toolbar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/geo-map/toolbar/add-geo-point-toolbar.ts");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./node_modules/classnames/index.js");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_8__);
/* ESM import */var _geo_map_styles__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/components/geo-map/geo-map.styles.ts");
/* ESM import */var _Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/utils/css.tsx");
/* ESM import */var _Pimcore_components_geo_map_toolbar_add_geo_poly_line_toolbar__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/components/geo-map/toolbar/add-geo-poly-line-toolbar.ts");
/* ESM import */var _Pimcore_components_geo_map_toolbar_add_geo_polygon_toolbar__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/components/geo-map/toolbar/add-geo-polygon-toolbar.ts");
/* ESM import */var _Pimcore_components_geo_map_toolbar_add_geo_bounds_toolbar__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/components/geo-map/toolbar/add-geo-bounds-toolbar.ts");
/* ESM import */var _Pimcore_modules_app_settings_hooks_use_settings__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/modules/app/settings/hooks/use-settings.ts");
/* ESM import */var _Pimcore_utils_hooks_use_element_visible__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./js/src/core/utils/hooks/use-element-visible.ts");
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















leaflet__WEBPACK_IMPORTED_MODULE_3___default().Icon.Default.mergeOptions({
    iconRetinaUrl: '/bundles/pimcorestudioui/img/leaflet/marker-icon-2x.png',
    iconUrl: '/bundles/pimcorestudioui/img/leaflet/marker-icon.png',
    shadowUrl: '/bundles/pimcorestudioui/img/leaflet/marker-shadow.png'
});
const GeoMap = /*#__PURE__*/ _s((0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(_c = _s((props, ref)=>{
    _s();
    const mapContainer = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const containerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const [lat, setLat] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(props.lat);
    const [lng, setLng] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(props.lng);
    const [zoom, setZoom] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(props.zoom);
    const [value, setValue] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(props.value);
    const [key, setKey] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const settings = (0,_Pimcore_modules_app_settings_hooks_use_settings__WEBPACK_IMPORTED_MODULE_14__.useSettings)();
    const { styles } = (0,_geo_map_styles__WEBPACK_IMPORTED_MODULE_9__.useStyles)();
    const geoMapApi = {
        reset: ()=>{
            setLat(undefined);
            setLng(undefined);
            setZoom(undefined);
            setValue(undefined);
        },
        forceRerender: ()=>{
            setKey((prevKey)=>prevKey + 1);
        },
        setLat,
        setLng,
        setZoom,
        setValue
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useImperativeHandle)(ref, ()=>geoMapApi);
    const setupToolbar = (param)=>{
        let { mode, map, group, value } = param;
        var _toolbars_mode;
        const toolbars = {
            geoPoint: ()=>{
                (0,_Pimcore_components_geo_map_toolbar_add_geo_point_toolbar__WEBPACK_IMPORTED_MODULE_7__.addGeoPointToolbar)(map, group, settings.maps.reverse_geocoding_url_template, value, props.onChange, props.disabled);
            },
            geoPolyLine: ()=>{
                (0,_Pimcore_components_geo_map_toolbar_add_geo_poly_line_toolbar__WEBPACK_IMPORTED_MODULE_11__.addGeoPolyLineToolbar)(map, group, value, props.onChange, props.disabled);
            },
            geoPolygon: ()=>{
                (0,_Pimcore_components_geo_map_toolbar_add_geo_polygon_toolbar__WEBPACK_IMPORTED_MODULE_12__.addGeoPolygonToolbar)(map, group, value, props.onChange, props.disabled);
            },
            geoBounds: ()=>{
                (0,_Pimcore_components_geo_map_toolbar_add_geo_bounds_toolbar__WEBPACK_IMPORTED_MODULE_13__.addGeoBoundsToolbar)(map, group, value, props.onChange, props.disabled);
            }
        };
        (_toolbars_mode = toolbars[mode]) === null || _toolbars_mode === void 0 ? void 0 : _toolbars_mode.call(toolbars);
    };
    const initializeMap = ()=>{
        if (mapContainer.current !== null) {
            const map = leaflet__WEBPACK_IMPORTED_MODULE_3___default().map(mapContainer.current);
            if (props.mode === 'geoPoint' && props.value !== undefined) {
                const propsValue = props.value;
                map.setView([
                    propsValue.latitude,
                    propsValue.longitude
                ], 15);
            } else if (lat !== props.lat && lng !== props.lng) {
                map.setView([
                    lat ?? 0,
                    lng ?? 0
                ], 15);
            } else {
                map.setView([
                    props.lat ?? 0,
                    props.lng ?? 0
                ], props.zoom ?? 1);
            }
            leaflet__WEBPACK_IMPORTED_MODULE_3___default().tileLayer(settings.maps.tile_layer_url_template, {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            const featureGroup = leaflet__WEBPACK_IMPORTED_MODULE_3___default().featureGroup().addTo(map);
            setupToolbar({
                mode: props.mode ?? 'geoBounds',
                map,
                group: featureGroup,
                value
            });
            return map;
        }
        return null;
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setValue((prev)=>(0,lodash__WEBPACK_IMPORTED_MODULE_2__.isEqual)(prev, props.value) ? prev : props.value);
        setLat((prev)=>prev === props.lat ? prev : props.lat);
        setLng((prev)=>prev === props.lng ? prev : props.lng);
        setZoom((prev)=>prev === props.zoom ? prev : props.zoom);
    }, [
        props.value,
        props.lat,
        props.lng,
        props.zoom
    ]);
    const isVisible = (0,_Pimcore_utils_hooks_use_element_visible__WEBPACK_IMPORTED_MODULE_15__["default"])(containerRef);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!isVisible) {
            return;
        }
        const map = initializeMap();
        return ()=>{
            if (map !== null) {
                map.remove();
            }
        };
    }, [
        key,
        isVisible,
        lat,
        lng,
        zoom,
        value,
        props.mode,
        props.disabled
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        ref: containerRef,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
            className: classnames__WEBPACK_IMPORTED_MODULE_8___default()(styles.mapContainer),
            ref: mapContainer,
            style: {
                height: (0,_Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_10__.toCssDimension)(props.height, 250),
                width: (0,_Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_10__.toCssDimension)(props.width, 500)
            }
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-map/geo-map.tsx",
            lineNumber: 156,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-map/geo-map.tsx",
        lineNumber: 155,
        columnNumber: 5
    }, undefined);
}, "1vHBwfehUXY+JS3WWe7G1B5+adA=", false, function() {
    return [
        _Pimcore_modules_app_settings_hooks_use_settings__WEBPACK_IMPORTED_MODULE_14__.useSettings,
        _geo_map_styles__WEBPACK_IMPORTED_MODULE_9__.useStyles,
        _Pimcore_utils_hooks_use_element_visible__WEBPACK_IMPORTED_MODULE_15__["default"]
    ];
})), "1vHBwfehUXY+JS3WWe7G1B5+adA=", false, function() {
    return [
        _Pimcore_modules_app_settings_hooks_use_settings__WEBPACK_IMPORTED_MODULE_14__.useSettings,
        _geo_map_styles__WEBPACK_IMPORTED_MODULE_9__.useStyles,
        _Pimcore_utils_hooks_use_element_visible__WEBPACK_IMPORTED_MODULE_15__["default"]
    ];
});
_c1 = GeoMap;
GeoMap.displayName = 'GeoMap';

var _c, _c1;
$RefreshReg$(_c, "GeoMap$forwardRef");
$RefreshReg$(_c1, "GeoMap");

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
"./js/src/core/components/geo-point-picker/geo-point-picker.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  GeoPointPicker: () => (GeoPointPicker)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_components_geo_point_picker_footer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/geo-point-picker/footer.tsx");
/* ESM import */var _Pimcore_components_geo_map_components_geo_map_card_geo_map_card__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/geo-map/components/geo-map-card/geo-map-card.tsx");
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
    const [mapValue, setMapValue] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(props.value ?? undefined);
    const geoMapRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const handleChangeFooter = (newValue)=>{
        var _props_onChange;
        setMapValue(newValue);
        (_props_onChange = props.onChange) === null || _props_onChange === void 0 ? void 0 : _props_onChange.call(props, newValue);
        const geoMapAPI = geoMapRef.current;
        geoMapAPI === null || geoMapAPI === void 0 ? void 0 : geoMapAPI.forceRerender();
    };
    const handleChangeMap = (newValue)=>{
        var _props_onChange;
        setMapValue(newValue);
        (_props_onChange = props.onChange) === null || _props_onChange === void 0 ? void 0 : _props_onChange.call(props, newValue);
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_2__.isEqual)(mapValue, props.value)) {
            setMapValue(props.value ?? undefined);
        }
    }, [
        props.value
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_geo_map_components_geo_map_card_geo_map_card__WEBPACK_IMPORTED_MODULE_4__.GeoMapCard, {
        className: props === null || props === void 0 ? void 0 : props.className,
        disabled: props.disabled,
        footer: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_geo_point_picker_footer__WEBPACK_IMPORTED_MODULE_3__.GeoPointPickerFooter, {
            disabled: props.disabled,
            onChange: handleChangeFooter,
            value: mapValue
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-point-picker/geo-point-picker.tsx",
            lineNumber: 57,
            columnNumber: 16
        }, void 0),
        height: props.height,
        lat: props.lat,
        lng: props.lng,
        mapMode: 'geoPoint',
        mapValue: mapValue,
        onChangeMap: handleChangeMap,
        ref: geoMapRef,
        width: props.width,
        zoom: props.zoom
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-point-picker/geo-point-picker.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, undefined);
};
_s(GeoPointPicker, "Pm3gmYukZKwrSGM5tcKJ2Fa9oMQ=");
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
"./js/src/core/components/geo-poly-drawer/footer.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  GeoPolyDrawerFooter: () => (GeoPolyDrawerFooter)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_geo_map_components_geo_map_card_footer_geo_map_card_footer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/geo-map/components/geo-map-card-footer/geo-map-card-footer.tsx");
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


const GeoPolyDrawerFooter = (props)=>{
    const clearValue = ()=>{
        if (props.onChange !== undefined) {
            props.onChange(undefined);
        }
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_geo_map_components_geo_map_card_footer_geo_map_card_footer__WEBPACK_IMPORTED_MODULE_2__.GeoMapCardFooter, {
        emptyValue: clearValue,
        onSearch: props.onSearch,
        removeButtonDisabled: props.value === undefined
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-poly-drawer/footer.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, undefined);
};
_c = GeoPolyDrawerFooter;
var _c;
$RefreshReg$(_c, "GeoPolyDrawerFooter");

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
"./js/src/core/components/numeric-range/numeric-range.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  NumericRange: () => (NumericRange),
  validateOneFieldEmpty: () => (validateOneFieldEmpty),
  validateSecondValueGreater: () => (validateSecondValueGreater)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/classnames/index.js");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var i18next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/i18next/dist/esm/i18next.js");
/* ESM import */var _Pimcore_components_input_number_input_number__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/input-number/input-number.tsx");
/* ESM import */var _Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/utils/css.tsx");
/* ESM import */var _numeric_range_styles__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/numeric-range/numeric-range.styles.tsx");
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







const validateOneFieldEmpty = async (rule, value)=>{
    if (value === null) {
        await Promise.resolve();
        return;
    }
    if (value.minimum === null) {
        await Promise.reject(Error((0,i18next__WEBPACK_IMPORTED_MODULE_4__.t)('form.validation.numeric-range.first-value-missing')));
    }
    if (value.maximum === null) {
        await Promise.reject(Error((0,i18next__WEBPACK_IMPORTED_MODULE_4__.t)('form.validation.numeric-range.second-value-missing')));
    }
    await Promise.resolve();
};
const validateSecondValueGreater = async (rule, value)=>{
    await validateOneFieldEmpty(rule, value);
    if (value === null) {
        return;
    }
    if (value.minimum > value.maximum) {
        await Promise.reject(Error((0,i18next__WEBPACK_IMPORTED_MODULE_4__.t)('form.validation.numeric-range.second-value-greater')));
    }
    await Promise.resolve();
};
const NumericRange = (props)=>{
    _s();
    const numericRangeValue = props.value ?? null;
    const { styles } = (0,_numeric_range_styles__WEBPACK_IMPORTED_MODULE_7__.useStyles)();
    const handleChange = (key, newValue)=>{
        var _props_onChange;
        const updatedValue = {
            minimum: (numericRangeValue === null || numericRangeValue === void 0 ? void 0 : numericRangeValue.minimum) ?? null,
            maximum: (numericRangeValue === null || numericRangeValue === void 0 ? void 0 : numericRangeValue.maximum) ?? null,
            [key]: newValue
        };
        const value = updatedValue.minimum === null && updatedValue.maximum === null ? null : updatedValue;
        (_props_onChange = props.onChange) === null || _props_onChange === void 0 ? void 0 : _props_onChange.call(props, value);
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_3__.Flex, {
        align: "center",
        className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(styles.container, props.className),
        gap: "small",
        style: {
            maxWidth: (0,_Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_6__.toCssDimension)(props.width)
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_input_number_input_number__WEBPACK_IMPORTED_MODULE_5__.InputNumber, {
                ...props,
                className: props.inputClassName,
                onChange: (newValue)=>{
                    handleChange('minimum', newValue);
                },
                value: numericRangeValue !== null ? numericRangeValue.minimum : null
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/numeric-range/numeric-range.tsx",
                lineNumber: 80,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_input_number_input_number__WEBPACK_IMPORTED_MODULE_5__.InputNumber, {
                ...props,
                className: props.inputClassName,
                onChange: (newValue)=>{
                    handleChange('maximum', newValue);
                },
                value: numericRangeValue !== null ? numericRangeValue.maximum : null
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/numeric-range/numeric-range.tsx",
                lineNumber: 86,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/numeric-range/numeric-range.tsx",
        lineNumber: 73,
        columnNumber: 5
    }, undefined);
};
_s(NumericRange, "1BGFRu6BGAbhzJ8kKgs1GUjvI6w=", false, function() {
    return [
        _numeric_range_styles__WEBPACK_IMPORTED_MODULE_7__.useStyles
    ];
});
_c = NumericRange;
var _c;
$RefreshReg$(_c, "NumericRange");

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
"./js/src/core/components/slider/slider.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Slider: () => (Slider)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_utils_number__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/utils/number.ts");
/* ESM import */var _Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/box/box.tsx");
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var _Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/icon-button/icon-button.tsx");
/* ESM import */var i18next__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./node_modules/i18next/dist/esm/i18next.js");
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







const Slider = (props)=>{
    const value = props.value ?? null;
    const handleChange = (value)=>{
        if (props.onChange !== undefined) {
            props.onChange(value);
        }
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: props.className,
        children: [
            props.showValue === true && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_4__.Box, {
                padding: {
                    x: 'mini'
                },
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                    children: [
                        "(",
                        value === null || value === undefined ? (0,i18next__WEBPACK_IMPORTED_MODULE_7__.t)('no-value-set') : (0,_Pimcore_utils_number__WEBPACK_IMPORTED_MODULE_3__.formatNumber)({
                            value
                        }),
                        ")"
                    ]
                }, void 0, true, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/slider/slider.tsx",
                    lineNumber: 41,
                    columnNumber: 11
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/slider/slider.tsx",
                lineNumber: 40,
                columnNumber: 9
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_5__.Flex, {
                align: props.vertical === true ? 'left' : 'center',
                className: "w-full",
                vertical: props.vertical,
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Slider, {
                        ...props,
                        className: 'w-full',
                        onChange: handleChange,
                        value: value ?? undefined
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/slider/slider.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, undefined),
                    props.allowClear === true && value !== null && props.disabled !== true && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_4__.Box, {
                        padding: {
                            x: 'mini'
                        },
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Tooltip, {
                            title: (0,i18next__WEBPACK_IMPORTED_MODULE_7__.t)('set-to-null'),
                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_6__.IconButton, {
                                icon: {
                                    value: 'trash'
                                },
                                onClick: ()=>{
                                    var _props_onChange;
                                    (_props_onChange = props.onChange) === null || _props_onChange === void 0 ? void 0 : _props_onChange.call(props, null);
                                },
                                type: 'default',
                                variant: 'static'
                            }, void 0, false, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/slider/slider.tsx",
                                lineNumber: 59,
                                columnNumber: 13
                            }, undefined)
                        }, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/slider/slider.tsx",
                            lineNumber: 58,
                            columnNumber: 11
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/slider/slider.tsx",
                        lineNumber: 57,
                        columnNumber: 9
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/slider/slider.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/slider/slider.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, undefined);
};
_c = Slider;
var _c;
$RefreshReg$(_c, "Slider");

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
"./js/src/core/components/tabs/tabs.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
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
        tabs: css`
      .ant-tabs-nav .ant-tabs-tab {
        padding-left: ${token.paddingXXS}px;
        padding-right: ${token.paddingXXS}px;

        + .ant-tabs-tab {
          margin-left: ${token.marginSM}px;
        }
      }

      &.tabs--has-sticky-header > .ant-tabs-nav {
        position: sticky;
        top: 0;
        z-index: 99999;
        background: ${token.colorBgContainer};
      }

      &.ant-tabs-top > .ant-tabs-nav {
        margin-bottom: 0;

        & + .ant-tabs-content-holder {
          padding-top: ${token.marginXS}px;
        }
      }

      &.ant-tabs-bottom > .ant-tabs-nav {
        margin-top: 0;

        & + .ant-tabs-content-holder {
          padding-bottom: ${token.marginXS}px;
        }
      }

      .ant-tabs-nav-list {
        padding-left: ${token.paddingXS}px;
        padding-right: ${token.paddingXS}px;
        align-items: center;
      }
      
      &.tabs--no-padding .ant-tabs-nav-list {
        padding-left: 0;
        padding-right: 0;
      }

      &.tabs--no-tab-bar-margin.ant-tabs-top>.ant-tabs-nav+.ant-tabs-content-holder {
        padding-top: 0;
      }

      &.ant-tabs-line .ant-tabs-nav .ant-tabs-tab {
        border-radius: 0;
        background: none;
        border: none;
        
        .ant-tabs-tab-remove {
          margin: 0 0 0 ${token.marginXS}px;
          padding: 0;
          opacity: 0;
          font-size: 8px;
        }
      }

      .ant-tabs-tab-active .ant-tabs-tab-btn {
        font-weight: 600;
        text-shadow: none !important;
      }
      
      &.ant-tabs-line .ant-tabs-nav .ant-tabs-tab-active .ant-tabs-tab-remove {
        opacity: 1;
      }
      
      &.ant-tabs-line > .ant-tabs-nav .ant-tabs-ink-bar {
        visibility: visible;
      }
    `
    };
}, {
    hashPriority: 'high'
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
"./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/boolean-select/boolean-select.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  BooleanSelect: () => (BooleanSelect)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_select_select__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/select/select.tsx");
/* ESM import */var _Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/utils/css.tsx");
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



const BooleanSelect = (props)=>{
    const booleanSelectValue = props.value ?? null;
    const mapValue = (value)=>{
        if (value === undefined) {
            return undefined;
        }
        if (value === null) {
            return 0;
        }
        return value ? 1 : -1;
    };
    const reverseMapValue = (value)=>{
        if (value === undefined) {
            return undefined;
        }
        if (value === 0) {
            return null;
        }
        return value === 1;
    };
    const onChange = (value)=>{
        var _props_onChange;
        const newValue = reverseMapValue(value);
        (_props_onChange = props.onChange) === null || _props_onChange === void 0 ? void 0 : _props_onChange.call(props, newValue ?? null);
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_select_select__WEBPACK_IMPORTED_MODULE_2__.Select, {
        ...props,
        onChange: onChange,
        style: {
            maxWidth: (0,_Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_3__.toCssDimension)(props.maxWidth)
        },
        value: mapValue(booleanSelectValue)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/boolean-select/boolean-select.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, undefined);
};
_c = BooleanSelect;
var _c;
$RefreshReg$(_c, "BooleanSelect");

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
"./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/checkbox/checkbox.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Checkbox: () => (Checkbox)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/classnames/index.js");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _Pimcore_modules_data_object_hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/data-object/hooks/use-data-object-draft.ts");
/* ESM import */var _Pimcore_modules_data_object_data_object_provider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/data-object/data-object-provider.tsx");
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var _Pimcore_components_checkbox_checkbox__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/checkbox/checkbox.tsx");
/* ESM import */var _Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/icon-button/icon-button.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _checkbox_styles__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/checkbox/checkbox.styles.tsx");
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










const Checkbox = (props)=>{
    _s();
    const checkboxValue = props.value ?? null;
    const { id } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_Pimcore_modules_data_object_data_object_provider__WEBPACK_IMPORTED_MODULE_5__.DataObjectContext);
    const { dataObject } = (0,_Pimcore_modules_data_object_hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_4__.useDataObjectDraft)(id);
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_9__.useTranslation)();
    const { styles } = (0,_checkbox_styles__WEBPACK_IMPORTED_MODULE_10__.useStyles)();
    const handleChange = (e)=>{
        var _props_onChange;
        const newValue = Boolean(e.nativeEvent.target.checked);
        (_props_onChange = props.onChange) === null || _props_onChange === void 0 ? void 0 : _props_onChange.call(props, newValue ?? null);
    };
    const clearValue = ()=>{
        var _props_onChange;
        (_props_onChange = props.onChange) === null || _props_onChange === void 0 ? void 0 : _props_onChange.call(props, null);
    };
    const showClearButton = props.disableClearButton !== true && checkboxValue !== null && (dataObject === null || dataObject === void 0 ? void 0 : dataObject.allowInheritance) === true && props.disabled !== true;
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_6__.Flex, {
        className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(styles.checkbox, props.className),
        gap: "extra-small",
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_checkbox_checkbox__WEBPACK_IMPORTED_MODULE_7__.Checkbox, {
                ...props,
                checked: checkboxValue ?? false,
                onChange: handleChange
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/checkbox/checkbox.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, undefined),
            showClearButton && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Tooltip, {
                title: t('set-to-null'),
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_8__.IconButton, {
                    icon: {
                        value: 'trash'
                    },
                    onClick: clearValue
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/checkbox/checkbox.tsx",
                    lineNumber: 60,
                    columnNumber: 11
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/checkbox/checkbox.tsx",
                lineNumber: 59,
                columnNumber: 9
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/checkbox/checkbox.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, undefined);
};
_s(Checkbox, "r7s7hHm3981jnREv95b1szUF2C4=", false, function() {
    return [
        _Pimcore_modules_data_object_hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_4__.useDataObjectDraft,
        react_i18next__WEBPACK_IMPORTED_MODULE_9__.useTranslation,
        _checkbox_styles__WEBPACK_IMPORTED_MODULE_10__.useStyles
    ];
});
_c = Checkbox;
var _c;
$RefreshReg$(_c, "Checkbox");

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
"./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/external-image/external-image.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ExternalImage: () => (ExternalImage)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/classnames/index.js");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_components_card_card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/card/card.tsx");
/* ESM import */var _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_external_image_footer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/external-image/footer.tsx");
/* ESM import */var _Pimcore_components_asset_target_asset_target__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/asset-target/asset-target.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_components_image_preview_image_preview__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/image-preview/image-preview.tsx");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_8__);
/* ESM import */var _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_providers_field_width_use_field_width__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/use-field-width.tsx");
/* ESM import */var _Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/utils/css.tsx");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_11__);
/* ESM import */var _external_image_styles__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/external-image/external-image.styles.tsx");
/* ESM import */var _Pimcore_utils_type_utils__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/utils/type-utils.ts");
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













const ExternalImage = (props)=>{
    _s();
    const externalImageValue = props.value ?? null;
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_6__.useTranslation)();
    const fieldWidth = (0,_Pimcore_modules_element_dynamic_types_definitions_objects_data_related_providers_field_width_use_field_width__WEBPACK_IMPORTED_MODULE_9__.useFieldWidth)();
    const { useToken } = antd__WEBPACK_IMPORTED_MODULE_11__.theme;
    const { token } = useToken();
    const { styles } = (0,_external_image_styles__WEBPACK_IMPORTED_MODULE_12__.useStyles)();
    const handleChange = (value)=>{
        var _props_onChange;
        const newUrl = value !== '' && value !== undefined ? value : null;
        (_props_onChange = props.onChange) === null || _props_onChange === void 0 ? void 0 : _props_onChange.call(props, newUrl === null ? null : {
            url: newUrl
        });
    };
    const previewWidth = Math.max(props.previewWidth ?? 300, 70);
    const previewHeight = Math.max(props.previewHeight ?? 150, 70);
    const containerWidth = (0,lodash__WEBPACK_IMPORTED_MODULE_8__.isNil)(props.inputWidth) && previewWidth < fieldWidth.large ? fieldWidth.large : Math.max(previewWidth, props.inputWidth ?? 0) + 2 + token.paddingSM * 2;
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_card_card__WEBPACK_IMPORTED_MODULE_3__.Card, {
            className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('max-w-full', styles.image, props.className),
            fitContent: Boolean(props.inputWidth),
            footer: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_external_image_footer__WEBPACK_IMPORTED_MODULE_4__.ExternalImageFooter, {
                disabled: props.disabled,
                inputWidth: props.inputWidth ?? undefined,
                onChange: handleChange,
                placeholder: (0,_Pimcore_utils_type_utils__WEBPACK_IMPORTED_MODULE_13__.isEmptyValue)(externalImageValue === null || externalImageValue === void 0 ? void 0 : externalImageValue.url) ? 'URL' : undefined,
                value: (externalImageValue === null || externalImageValue === void 0 ? void 0 : externalImageValue.url) ?? undefined
            }, "external-image-footer", false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/external-image/external-image.tsx",
                lineNumber: 64,
                columnNumber: 11
            }, void 0),
            style: {
                maxWidth: (0,_Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_10__.toCssDimension)(containerWidth)
            },
            children: externalImageValue !== null && !(0,lodash__WEBPACK_IMPORTED_MODULE_8__.isEmpty)(externalImageValue === null || externalImageValue === void 0 ? void 0 : externalImageValue.url) ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_image_preview_image_preview__WEBPACK_IMPORTED_MODULE_7__.ImagePreview, {
                height: previewHeight,
                src: externalImageValue === null || externalImageValue === void 0 ? void 0 : externalImageValue.url,
                width: previewWidth
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/external-image/external-image.tsx",
                lineNumber: 77,
                columnNumber: 13
            }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_asset_target_asset_target__WEBPACK_IMPORTED_MODULE_5__.AssetTarget, {
                height: previewHeight,
                title: t(props.disabled === true ? 'empty-image' : 'external-image.preview-placeholder'),
                width: previewWidth
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/external-image/external-image.tsx",
                lineNumber: 84,
                columnNumber: 13
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/external-image/external-image.tsx",
            lineNumber: 60,
            columnNumber: 7
        }, undefined)
    }, void 0, false);
};
_s(ExternalImage, "PDpcCGz2jWoZbRIbTNoxAjnBMxA=", true, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_6__.useTranslation,
        _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_providers_field_width_use_field_width__WEBPACK_IMPORTED_MODULE_9__.useFieldWidth,
        _external_image_styles__WEBPACK_IMPORTED_MODULE_12__.useStyles
    ];
});
_c = ExternalImage;
var _c;
$RefreshReg$(_c, "ExternalImage");

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
"./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/hotspot-image/hotspot-image.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  HotspotImage: () => (HotspotImage)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/classnames/index.js");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_components_card_card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/card/card.tsx");
/* ESM import */var _footer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/hotspot-image/footer.tsx");
/* ESM import */var _Pimcore_components_asset_target_asset_target__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/asset-target/asset-target.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_components_drag_and_drop_droppable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/drag-and-drop/droppable.tsx");
/* ESM import */var _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_hotspot_image_image_preview__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/hotspot-image/image-preview.tsx");
/* ESM import */var _Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/components/modal/form-modal/hooks/use-form-modal.tsx");
/* ESM import */var _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_hotspot_image_utils_value_data__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/hotspot-image/utils/value-data.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_11__);
/* ESM import */var _Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/utils/css.tsx");
/* ESM import */var _hotspot_image_styles__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/hotspot-image/hotspot-image.styles.tsx");
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













const HotspotImage = (props)=>{
    _s();
    const imageValue = props.value ?? null;
    const [markerModalOpen, setMarkerModalOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [cropModalOpen, setCropModalOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { confirm } = (0,_Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_9__.useFormModal)();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_6__.useTranslation)();
    const { styles } = (0,_hotspot_image_styles__WEBPACK_IMPORTED_MODULE_13__.useStyles)();
    const handleChange = (newValue)=>{
        if (!lodash__WEBPACK_IMPORTED_MODULE_11___default().isEqual(newValue, imageValue)) {
            var _props_onChange;
            (_props_onChange = props.onChange) === null || _props_onChange === void 0 ? void 0 : _props_onChange.call(props, newValue);
        }
    };
    const clearValue = ()=>{
        var _props_onChange;
        (_props_onChange = props.onChange) === null || _props_onChange === void 0 ? void 0 : _props_onChange.call(props, null);
    };
    const width = (0,_Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_12__.toCssDimension)(props.width, 300);
    const height = (0,_Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_12__.toCssDimension)(props.height, 150);
    const replaceImage = (newImage)=>{
        if ((0,_Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_hotspot_image_utils_value_data__WEBPACK_IMPORTED_MODULE_10__.hasValueData)(imageValue)) {
            confirm({
                title: t('hotspots.clear-data'),
                content: t('hotspots.clear-data.dnd-message'),
                okText: t('yes'),
                cancelText: t('no'),
                onOk: ()=>{
                    setImage(newImage, true);
                },
                onCancel: ()=>{
                    setImage(newImage, false);
                }
            });
        } else {
            setImage(newImage, true);
        }
    };
    const setImage = (image, replaceValueData)=>{
        let newValue = imageValue === null ? {
            image: null,
            hotspots: [],
            marker: [],
            crop: {}
        } : {
            ...imageValue
        };
        if (replaceValueData) {
            newValue = {
                image,
                hotspots: [],
                marker: [],
                crop: {}
            };
        } else {
            newValue = {
                ...newValue,
                image
            };
        }
        handleChange(newValue);
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_card_card__WEBPACK_IMPORTED_MODULE_3__.Card, {
        className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('max-w-full', styles.image, props.className),
        fitContent: true,
        footer: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_footer__WEBPACK_IMPORTED_MODULE_4__.HotspotImageFooter, {
            disabled: props.disabled,
            emptyValue: clearValue,
            replaceImage: replaceImage,
            setCropModalOpen: setCropModalOpen,
            setMarkerModalOpen: setMarkerModalOpen,
            setValue: handleChange,
            value: imageValue
        }, "image-footer", false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/hotspot-image/hotspot-image.tsx",
            lineNumber: 117,
            columnNumber: 9
        }, void 0),
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_drag_and_drop_droppable__WEBPACK_IMPORTED_MODULE_7__.Droppable, {
            isValidContext: (info)=>props.disabled !== true,
            isValidData: (info)=>info.type === 'asset' && info.data.type === 'image',
            onDrop: (info)=>{
                const newImage = {
                    type: 'asset',
                    id: info.data.id
                };
                replaceImage(newImage);
            },
            variant: "outline",
            children: imageValue !== null && (imageValue === null || imageValue === void 0 ? void 0 : imageValue.image) !== null ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_hotspot_image_image_preview__WEBPACK_IMPORTED_MODULE_8__.HotspotImagePreview, {
                assetId: imageValue.image.id,
                cropModalOpen: cropModalOpen,
                disabled: props.disabled,
                height: height,
                markerModalOpen: markerModalOpen,
                onChange: handleChange,
                setCropModalOpen: setCropModalOpen,
                setMarkerModalOpen: setMarkerModalOpen,
                value: imageValue,
                width: width
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/hotspot-image/hotspot-image.tsx",
                lineNumber: 141,
                columnNumber: 15
            }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_asset_target_asset_target__WEBPACK_IMPORTED_MODULE_5__.AssetTarget, {
                dndIcon: props.disabled !== true,
                height: height,
                title: t(props.disabled !== true ? 'image.dnd-target' : 'empty-image'),
                width: width
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/hotspot-image/hotspot-image.tsx",
                lineNumber: 155,
                columnNumber: 15
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/hotspot-image/hotspot-image.tsx",
            lineNumber: 129,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/hotspot-image/hotspot-image.tsx",
        lineNumber: 113,
        columnNumber: 5
    }, undefined);
};
_s(HotspotImage, "q8BVpNc4g7KbMv3v7MW28ZPYeqM=", false, function() {
    return [
        _Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_9__.useFormModal,
        react_i18next__WEBPACK_IMPORTED_MODULE_6__.useTranslation,
        _hotspot_image_styles__WEBPACK_IMPORTED_MODULE_13__.useStyles
    ];
});
_c = HotspotImage;
var _c;
$RefreshReg$(_c, "HotspotImage");

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
"./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/image-gallery/image-gallery.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ImageGallery: () => (ImageGallery)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/classnames/index.js");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_image_gallery_components_image_target_image_target__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/image-gallery/components/image-target/image-target.tsx");
/* ESM import */var _Pimcore_components_card_card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/card/card.tsx");
/* ESM import */var _Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/icon-button/icon-button.tsx");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_7__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_8__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_image_gallery_components_sortable_item_sortable_item__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/image-gallery/components/sortable-item/sortable-item.tsx");
/* ESM import */var _dnd_kit_sortable__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./node_modules/@dnd-kit/sortable/dist/sortable.esm.js");
/* ESM import */var _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_helpers_hotspot_image_hotspot_markers_modal_container__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/helpers/hotspot-image/hotspot-markers-modal-container.tsx");
/* ESM import */var _Pimcore_utils_uuid__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/utils/uuid.ts");
/* ESM import */var _image_gallery_styles__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/image-gallery/image-gallery.styles.tsx");
/* ESM import */var _Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./js/src/core/utils/css.tsx");
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















const addKeys = (value)=>{
    return value.map((item, index)=>{
        if (item.key === undefined) {
            return {
                ...item,
                key: (0,_Pimcore_utils_uuid__WEBPACK_IMPORTED_MODULE_13__.uuid)()
            };
        }
        return item;
    });
};
const removeKeys = (items)=>{
    return items.map((item)=>{
        const { key, ...rest } = item;
        return rest;
    });
};
const ImageGallery = (props)=>{
    _s();
    const imageValue = addKeys(props.value ?? []);
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_9__.useTranslation)();
    const { styles } = (0,_image_gallery_styles__WEBPACK_IMPORTED_MODULE_14__.useStyles)();
    const width = (0,_Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_15__.toCssDimension)(props.width, 200);
    const height = (0,_Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_15__.toCssDimension)(props.height, 100);
    const hotspotMarkersModalContainerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const handleChange = (newValue)=>{
        const updatedValue = addKeys(newValue);
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_7__.isEqual)(updatedValue, imageValue)) {
            var _props_onChange;
            const changedValue = removeKeys(updatedValue.filter((item)=>item.image !== null));
            (_props_onChange = props.onChange) === null || _props_onChange === void 0 ? void 0 : _props_onChange.call(props, changedValue.length > 0 ? changedValue : null);
        }
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_card_card__WEBPACK_IMPORTED_MODULE_5__.Card, {
        className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(styles.imageGallery, props.className),
        footer: props.disabled === true ? undefined : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_8__.Tooltip, {
            title: t('empty'),
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_6__.IconButton, {
                disabled: (0,lodash__WEBPACK_IMPORTED_MODULE_7__.isEmpty)(props.value),
                icon: {
                    value: 'trash'
                },
                onClick: ()=>{
                    handleChange([]);
                }
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/image-gallery/image-gallery.tsx",
                lineNumber: 112,
                columnNumber: 13
            }, void 0)
        }, "empty", false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/image-gallery/image-gallery.tsx",
            lineNumber: 108,
            columnNumber: 11
        }, void 0),
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_3__.Flex, {
                gap: "small",
                wrap: true,
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_dnd_kit_sortable__WEBPACK_IMPORTED_MODULE_11__.SortableContext, {
                        disabled: props.disabled,
                        items: imageValue.map((item, index)=>({
                                id: String(index)
                            })),
                        strategy: _dnd_kit_sortable__WEBPACK_IMPORTED_MODULE_11__.rectSortingStrategy,
                        children: imageValue.map((item, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_image_gallery_components_sortable_item_sortable_item__WEBPACK_IMPORTED_MODULE_10__.ImageGallerySortableItem, {
                                disabled: props.disabled,
                                height: height,
                                hotspotMarkersModalContainer: hotspotMarkersModalContainerRef,
                                id: String(index),
                                index: index,
                                item: item,
                                setValue: handleChange,
                                value: imageValue,
                                width: width
                            }, item.key, false, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/image-gallery/image-gallery.tsx",
                                lineNumber: 130,
                                columnNumber: 13
                            }, undefined))
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/image-gallery/image-gallery.tsx",
                        lineNumber: 124,
                        columnNumber: 9
                    }, undefined),
                    (props.disabled !== true || (0,lodash__WEBPACK_IMPORTED_MODULE_7__.isEmpty)(imageValue)) && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_image_gallery_components_image_target_image_target__WEBPACK_IMPORTED_MODULE_4__.ImageGalleryImageTarget, {
                        disabled: props.disabled,
                        height: height,
                        index: imageValue.length,
                        setValue: handleChange,
                        value: imageValue,
                        width: width
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/image-gallery/image-gallery.tsx",
                        lineNumber: 145,
                        columnNumber: 11
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/image-gallery/image-gallery.tsx",
                lineNumber: 120,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_dynamic_types_definitions_objects_data_related_helpers_hotspot_image_hotspot_markers_modal_container__WEBPACK_IMPORTED_MODULE_12__.HotspotMarkersModalContainer, {
                ref: hotspotMarkersModalContainerRef
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/image-gallery/image-gallery.tsx",
                lineNumber: 155,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/image-gallery/image-gallery.tsx",
        lineNumber: 103,
        columnNumber: 5
    }, undefined);
};
_s(ImageGallery, "J569ZxYio4kfLEia1kV1rf2ELJI=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_9__.useTranslation,
        _image_gallery_styles__WEBPACK_IMPORTED_MODULE_14__.useStyles
    ];
});
_c = ImageGallery;
var _c;
$RefreshReg$(_c, "ImageGallery");

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
"./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/image/image.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Image: () => (Image)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/classnames/index.js");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_components_card_card__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/card/card.tsx");
/* ESM import */var _footer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/image/footer.tsx");
/* ESM import */var _Pimcore_components_asset_target_asset_target__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/asset-target/asset-target.tsx");
/* ESM import */var _Pimcore_components_image_preview_image_preview__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/image-preview/image-preview.tsx");
/* ESM import */var _Pimcore_components_drag_and_drop_droppable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/drag-and-drop/droppable.tsx");
/* ESM import */var _Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/utils/css.tsx");
/* ESM import */var _image_styles__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/image/image.styles.tsx");
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










const Image = (props)=>{
    _s();
    const imageValue = props.value ?? null;
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation)();
    const { styles } = (0,_image_styles__WEBPACK_IMPORTED_MODULE_10__.useStyles)();
    const clearValue = ()=>{
        var _props_onChange;
        (_props_onChange = props.onChange) === null || _props_onChange === void 0 ? void 0 : _props_onChange.call(props, null);
    };
    const handleChange = (value)=>{
        var _props_onChange;
        (_props_onChange = props.onChange) === null || _props_onChange === void 0 ? void 0 : _props_onChange.call(props, value);
    };
    const width = (0,_Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_9__.toCssDimension)(props.width, 300);
    const height = (0,_Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_9__.toCssDimension)(props.height, 150);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_card_card__WEBPACK_IMPORTED_MODULE_4__.Card, {
        className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('max-w-full', styles.image, props.className),
        fitContent: true,
        footer: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_footer__WEBPACK_IMPORTED_MODULE_5__.ImageFooter, {
            disabled: props.disabled,
            emptyValue: clearValue,
            setValue: handleChange,
            value: imageValue
        }, "image-footer", false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/image/image.tsx",
            lineNumber: 59,
            columnNumber: 9
        }, void 0),
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_drag_and_drop_droppable__WEBPACK_IMPORTED_MODULE_8__.Droppable, {
            isValidContext: (info)=>props.disabled !== true,
            isValidData: (info)=>info.type === 'asset' && info.data.type === 'image',
            onDrop: (info)=>{
                var _props_onChange;
                (_props_onChange = props.onChange) === null || _props_onChange === void 0 ? void 0 : _props_onChange.call(props, {
                    type: 'asset',
                    id: info.data.id
                });
            },
            variant: "outline",
            children: imageValue !== null ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_image_preview_image_preview__WEBPACK_IMPORTED_MODULE_7__.ImagePreview, {
                assetId: imageValue === null || imageValue === void 0 ? void 0 : imageValue.id,
                height: height,
                width: width
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/image/image.tsx",
                lineNumber: 76,
                columnNumber: 13
            }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_asset_target_asset_target__WEBPACK_IMPORTED_MODULE_6__.AssetTarget, {
                dndIcon: props.disabled !== true,
                height: height,
                title: t(props.disabled !== true ? 'image.dnd-target' : 'empty'),
                uploadIcon: props.disabled !== true,
                width: width
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/image/image.tsx",
                lineNumber: 83,
                columnNumber: 13
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/image/image.tsx",
            lineNumber: 68,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/image/image.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, undefined);
};
_s(Image, "RLrtxoYLhU6K3pUxNPOpN7Ah0UQ=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation,
        _image_styles__WEBPACK_IMPORTED_MODULE_10__.useStyles
    ];
});
_c = Image;
var _c;
$RefreshReg$(_c, "Image");

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
"./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/link.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Link: () => (Link)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/classnames/index.js");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/icon-button/icon-button.tsx");
/* ESM import */var _Pimcore_components_tooltip_tooltip__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/tooltip/tooltip.tsx");
/* ESM import */var _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_link_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/modal.tsx");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_8__);
/* ESM import */var _Pimcore_modules_element_hooks_use_element_helper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/element/hooks/use-element-helper.ts");
/* ESM import */var _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_link_utils_link_value_converter__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/utils/link-value-converter.ts");
/* ESM import */var _link_styles__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/link.styles.tsx");
/* ESM import */var _components_link_preview_link_preview__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/components/link-preview/link-preview.tsx");
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












const Link = (props)=>{
    _s();
    const [isModalVisible, setIsModalVisible] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation)();
    const { styles } = (0,_link_styles__WEBPACK_IMPORTED_MODULE_11__.useStyles)();
    const { openElement } = (0,_Pimcore_modules_element_hooks_use_element_helper__WEBPACK_IMPORTED_MODULE_9__.useElementHelper)();
    const value = props.value ?? null;
    const handleChange = (value)=>{
        var _props_onChange;
        (_props_onChange = props.onChange) === null || _props_onChange === void 0 ? void 0 : _props_onChange.call(props, value);
    };
    const showModal = ()=>{
        setIsModalVisible(true);
    };
    const hideModal = ()=>{
        setIsModalVisible(false);
    };
    const openLink = ()=>{
        if (value === null) {
            return;
        }
        if (value.linktype === 'direct' && value.direct !== null && !lodash__WEBPACK_IMPORTED_MODULE_8___default().isEmpty(value.direct)) {
            window.open(value.direct, '_blank');
        }
        const internalType = (0,_Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_link_utils_link_value_converter__WEBPACK_IMPORTED_MODULE_10__.convertType)(value.internalType ?? null);
        const internal = value.internal ?? null;
        if (value.linktype === 'internal' && internalType !== null && internal !== null) {
            openElement({
                type: internalType,
                id: internal
            }).catch((error)=>{
                console.error('Error while opening element:', error);
            });
        }
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_3__.Flex, {
        align: "center",
        className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(styles.link, props.className),
        gap: "extra-small",
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_link_preview_link_preview__WEBPACK_IMPORTED_MODULE_12__.LinkPreview, {
                className: "studio-inherited-overlay",
                inherited: props.inherited,
                value: value
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/link.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_tooltip_tooltip__WEBPACK_IMPORTED_MODULE_6__.Tooltip, {
                title: t('open'),
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_5__.IconButton, {
                    disabled: value === null || lodash__WEBPACK_IMPORTED_MODULE_8___default().isEmpty(value.fullPath),
                    icon: {
                        value: 'open-folder'
                    },
                    onClick: openLink,
                    type: "default"
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/link.tsx",
                    lineNumber: 115,
                    columnNumber: 9
                }, undefined)
            }, "open", false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/link.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, undefined),
            props.disabled !== true ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_tooltip_tooltip__WEBPACK_IMPORTED_MODULE_6__.Tooltip, {
                title: t('edit'),
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_5__.IconButton, {
                    icon: {
                        value: 'edit'
                    },
                    onClick: showModal,
                    type: "default"
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/link.tsx",
                    lineNumber: 129,
                    columnNumber: 13
                }, undefined)
            }, "edit", false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/link.tsx",
                lineNumber: 125,
                columnNumber: 11
            }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_tooltip_tooltip__WEBPACK_IMPORTED_MODULE_6__.Tooltip, {
                title: t('details'),
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_5__.IconButton, {
                    icon: {
                        value: 'info-circle'
                    },
                    onClick: showModal,
                    type: "default"
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/link.tsx",
                    lineNumber: 141,
                    columnNumber: 13
                }, undefined)
            }, "details", false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/link.tsx",
                lineNumber: 137,
                columnNumber: 11
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_link_modal__WEBPACK_IMPORTED_MODULE_7__.LinkModal, {
                allowedTargets: props.allowedTargets,
                allowedTypes: props.allowedTypes,
                disabled: props.disabled,
                disabledFields: props.disabledFields,
                onClose: hideModal,
                onSave: handleChange,
                open: isModalVisible,
                value: value
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/link.tsx",
                lineNumber: 149,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/link.tsx",
        lineNumber: 100,
        columnNumber: 5
    }, undefined);
};
_s(Link, "tgpapYisNefCK8UnO5k5/dhZ/Ng=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation,
        _link_styles__WEBPACK_IMPORTED_MODULE_11__.useStyles,
        _Pimcore_modules_element_hooks_use_element_helper__WEBPACK_IMPORTED_MODULE_9__.useElementHelper
    ];
});
_c = Link;
var _c;
$RefreshReg$(_c, "Link");

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
"./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/structured-table/structured-table.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  StructuredTable: () => (StructuredTable)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/classnames/index.js");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_structured_table_components_grid_grid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/structured-table/components/grid/grid.tsx");
/* ESM import */var _Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/box/box.tsx");
/* ESM import */var _Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/icon-button/icon-button.tsx");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_6__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/modal/form-modal/hooks/use-form-modal.tsx");
/* ESM import */var _Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/utils/css.tsx");
/* ESM import */var _Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/components/content/content.tsx");
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










const StructuredTable = (props)=>{
    _s();
    const value = props.value ?? null;
    const [key, setKey] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_7__.useTranslation)();
    const { confirm } = (0,_Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_8__.useFormModal)();
    const handleChange = (value)=>{
        var _props_onChange;
        (_props_onChange = props.onChange) === null || _props_onChange === void 0 ? void 0 : _props_onChange.call(props, value);
    };
    const castColumnValue = (value, columnId)=>{
        const column = props.cols.find((col)=>col.key === columnId);
        if (column === undefined) {
            return value;
        }
        switch(column.type){
            case 'number':
                return Number(value);
            case 'bool':
                return Boolean(value);
            default:
                return value === null ? '' : String(value);
        }
    };
    const clearValue = ()=>{
        if (value !== null) {
            const newValue = value;
            for(const rowKey in value){
                for(const colKey in value[rowKey]){
                    newValue[rowKey][colKey] = castColumnValue(null, colKey);
                }
            }
            handleChange(newValue);
            setKey(key + 1) // force re-render
            ;
        }
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_10__.Content, {
                style: {
                    width: (0,_Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_9__.toCssDimension)(props.width),
                    height: (0,_Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_9__.toCssDimension)(props.height)
                },
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_structured_table_components_grid_grid__WEBPACK_IMPORTED_MODULE_3__.StructuredTableGrid, {
                    castColumnValue: castColumnValue,
                    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(props.className),
                    cols: props.cols,
                    disabled: props.disabled,
                    labelFirstCell: props.labelFirstCell,
                    labelWidth: props.labelWidth,
                    onChange: handleChange,
                    rows: props.rows,
                    value: value
                }, key, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/structured-table/structured-table.tsx",
                    lineNumber: 107,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/structured-table/structured-table.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, undefined),
            props.disabled !== true && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_4__.Box, {
                padding: "extra-small",
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_6__.Tooltip, {
                    title: t('empty'),
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_5__.IconButton, {
                        icon: {
                            value: 'trash'
                        },
                        onClick: ()=>{
                            confirm({
                                title: t('empty'),
                                content: t('empty.confirm'),
                                onOk: clearValue
                            });
                        },
                        type: "default"
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/structured-table/structured-table.tsx",
                        lineNumber: 123,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/structured-table/structured-table.tsx",
                    lineNumber: 122,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/structured-table/structured-table.tsx",
                lineNumber: 121,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true);
};
_s(StructuredTable, "jef9sYKIFkJSKWL3jOwnJve8p8w=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_7__.useTranslation,
        _Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_8__.useFormModal
    ];
});
_c = StructuredTable;
var _c;
$RefreshReg$(_c, "StructuredTable");

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
"./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/table/hooks/use-table-value.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useTableValue: () => (useTableValue)
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
const useTableValue = (props)=>{
    const [activeCell, setActiveCell] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(undefined);
    const [key, setKey] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
    const value = props.initialValue;
    const handleChange = (value)=>{
        var _props_onChange;
        (_props_onChange = props.onChange) === null || _props_onChange === void 0 ? void 0 : _props_onChange.call(props, value);
    };
    const initializeValue = ()=>{
        const rows = props.rows ?? 1;
        return new Array(rows).fill(null).map(()=>createEmptyRow());
    };
    let cols = (()=>{
        if (value !== null && value.length > 0) {
            if (props.columnConfigActivated) {
                return Object.keys(value[0]).length;
            } else {
                return value[0].length;
            }
        } else {
            return props.cols ?? 0;
        }
    })();
    let rows = value !== null && value.length > 0 ? value.length : props.rows ?? 0;
    cols = Math.max(cols, 1);
    rows = Math.max(rows, 1);
    const emptyValue = ()=>{
        handleChange(props.emptyValue ?? []);
        setKey(key + 1) // force re-render
        ;
    };
    const createEmptyRow = ()=>{
        if (props.columnConfigActivated && props.columnConfig !== undefined) {
            return props.columnConfig.reduce((acc, col)=>{
                acc[col.key] = '';
                return acc;
            }, {});
        } else {
            return new Array(cols).fill('');
        }
    };
    const newRow = ()=>{
        const newValue = [
            ...value !== null && value.length > 0 ? value : initializeValue()
        ];
        const newRow = createEmptyRow();
        if ((activeCell === null || activeCell === void 0 ? void 0 : activeCell.rowIndex) !== undefined) {
            newValue.splice(activeCell.rowIndex, 0, newRow);
        } else {
            newValue.push(newRow);
        }
        handleChange(newValue);
    };
    const newColumn = ()=>{
        if (props.columnConfigActivated) return;
        const newValue = [
            ...value !== null && value.length > 0 ? value : initializeValue()
        ];
        newValue.forEach((row)=>row.splice((activeCell === null || activeCell === void 0 ? void 0 : activeCell.columnIndex) ?? row.length, 0, ''));
        handleChange(newValue);
    };
    const deleteRow = ()=>{
        if (activeCell === undefined) return;
        const newValue = [
            ...value !== null && value.length > 0 ? value : initializeValue()
        ];
        newValue.splice(activeCell.rowIndex, 1);
        handleChange(newValue);
    };
    const deleteColumn = ()=>{
        if (props.columnConfigActivated || activeCell === undefined) return;
        const newValue = [
            ...value !== null && value.length > 0 ? value : initializeValue()
        ];
        newValue.forEach((row)=>row.splice(activeCell.columnIndex, 1));
        handleChange(newValue);
    };
    const duplicateRow = ()=>{
        if (activeCell === undefined) return;
        const newValue = [
            ...value !== null && value.length > 0 ? value : initializeValue()
        ];
        const rowToDuplicate = newValue[activeCell.rowIndex];
        if (Array.isArray(rowToDuplicate)) {
            newValue.splice(activeCell.rowIndex, 0, [
                ...rowToDuplicate
            ]);
        } else {
            newValue.splice(activeCell.rowIndex, 0, {
                ...rowToDuplicate
            });
        }
        handleChange(newValue);
    };
    const fixColumnConfig = (value)=>{
        if (!props.columnConfigActivated || props.columnConfig === undefined) {
            return value;
        }
        const columnConfig = props.columnConfig ?? [];
        return value.map((row)=>{
            const newRow = {};
            columnConfig.forEach((col, index)=>{
                newRow[col.key] = row[index] ?? '';
            });
            return newRow;
        });
    };
    return {
        value,
        handleChange,
        activeCell,
        setActiveCell,
        key,
        emptyValue,
        newRow,
        newColumn,
        deleteRow,
        deleteColumn,
        duplicateRow,
        fixColumnConfig,
        rows,
        cols
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
"./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/table/table.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Table: () => (Table)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/classnames/index.js");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _components_grid_grid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/table/components/grid/grid.tsx");
/* ESM import */var _Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/box/box.tsx");
/* ESM import */var _Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/icon-button/icon-button.tsx");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_7__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/components/modal/form-modal/hooks/use-form-modal.tsx");
/* ESM import */var _hooks_use_table_value__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/table/hooks/use-table-value.ts");
/* ESM import */var _utils_copy_paste__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/table/utils/copy-paste.ts");
/* ESM import */var _Pimcore_components_button_group_button_group__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/components/button-group/button-group.tsx");
/* ESM import */var _Pimcore_components_icon_text_button_icon_text_button__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/components/icon-text-button/icon-text-button.tsx");
/* ESM import */var _Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/components/content/content.tsx");
/* ESM import */var _Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./js/src/core/utils/css.tsx");
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















const parseFieldDefinitionData = (data)=>{
    if ((0,lodash__WEBPACK_IMPORTED_MODULE_2__.isNil)(data) || data === '') {
        return null;
    }
    const dataRows = data.split('\n');
    const dataGrid = dataRows.map((row)=>row.split('|'));
    return dataGrid;
};
const Table = (props)=>{
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_8__.useTranslation)();
    const modal = (0,_Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_9__.useFormModal)();
    const { confirm } = modal;
    const columnConfigActivated = props.colsFixed === true ? props.columnConfigActivated ?? false : false;
    const fieldDefinitionData = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>parseFieldDefinitionData(props.data), [
        props.data
    ]);
    const getInitialValue = ()=>{
        if ((0,lodash__WEBPACK_IMPORTED_MODULE_2__.isNil)(props.value) || (0,lodash__WEBPACK_IMPORTED_MODULE_2__.isEmpty)(props.value)) {
            return fieldDefinitionData;
        }
        return props.value;
    };
    const { value, handleChange, activeCell, setActiveCell, key, emptyValue, newRow, newColumn, deleteRow, deleteColumn, duplicateRow, fixColumnConfig, rows, cols } = (0,_hooks_use_table_value__WEBPACK_IMPORTED_MODULE_10__.useTableValue)({
        initialValue: getInitialValue(),
        onChange: props.onChange,
        cols: props.cols,
        rows: props.rows,
        columnConfig: props.columnConfig,
        columnConfigActivated,
        emptyValue: fieldDefinitionData
    });
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (activeCell !== undefined && ((value === null || value === void 0 ? void 0 : value[activeCell.rowIndex]) === undefined || value[activeCell.rowIndex][activeCell.columnIndex] === undefined && value[activeCell.rowIndex][activeCell.columnId] === undefined)) {
            setActiveCell(undefined);
        }
    }, [
        value
    ]);
    const items = [];
    if (props.disabled !== true) {
        if (props.rowsFixed !== true || rows < (props.rows ?? 0)) {
            items.push(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_text_button_icon_text_button__WEBPACK_IMPORTED_MODULE_13__.IconTextButton, {
                icon: {
                    value: 'new-row'
                },
                onClick: newRow,
                type: "default",
                children: t('table.new-row')
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/table/table.tsx",
                lineNumber: 106,
                columnNumber: 9
            }, undefined));
        }
        if (!columnConfigActivated && (props.colsFixed !== true || cols < (props.cols ?? 0))) {
            items.push(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_text_button_icon_text_button__WEBPACK_IMPORTED_MODULE_13__.IconTextButton, {
                icon: {
                    value: 'new-column'
                },
                onClick: newColumn,
                type: "default",
                children: t('table.new-column')
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/table/table.tsx",
                lineNumber: 118,
                columnNumber: 9
            }, undefined));
        }
        if (props.rowsFixed !== true || rows > (props.rows ?? 0)) {
            items.push(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_text_button_icon_text_button__WEBPACK_IMPORTED_MODULE_13__.IconTextButton, {
                disabled: activeCell === undefined,
                icon: {
                    value: 'delete-row'
                },
                onClick: deleteRow,
                type: "default",
                children: t('table.delete-row')
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/table/table.tsx",
                lineNumber: 130,
                columnNumber: 9
            }, undefined));
        }
        if (!columnConfigActivated && (props.colsFixed !== true || cols > (props.cols ?? 0))) {
            items.push(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_text_button_icon_text_button__WEBPACK_IMPORTED_MODULE_13__.IconTextButton, {
                disabled: activeCell === undefined,
                icon: {
                    value: 'delete-column'
                },
                onClick: deleteColumn,
                type: "default",
                children: t('table.delete-column')
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/table/table.tsx",
                lineNumber: 143,
                columnNumber: 9
            }, undefined));
        }
        if (props.rowsFixed !== true || rows < (props.rows ?? 0)) {
            items.push(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_text_button_icon_text_button__WEBPACK_IMPORTED_MODULE_13__.IconTextButton, {
                disabled: activeCell === undefined,
                icon: {
                    value: 'content-duplicate'
                },
                onClick: duplicateRow,
                type: "default",
                children: t('table.duplicate-row')
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/table/table.tsx",
                lineNumber: 156,
                columnNumber: 9
            }, undefined));
        }
    }
    items.push(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_7__.Tooltip, {
        title: t('table.copy'),
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_6__.IconButton, {
            icon: {
                value: 'copy'
            },
            onClick: ()=>modal.textarea({
                    title: t('table.copy'),
                    initialValue: (0,_utils_copy_paste__WEBPACK_IMPORTED_MODULE_11__.getCopyData)(value),
                    okText: t('table.copy'),
                    onOk: (value)=>{
                        void navigator.clipboard.writeText(value);
                    }
                }),
            type: "default"
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/table/table.tsx",
            lineNumber: 169,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/table/table.tsx",
        lineNumber: 168,
        columnNumber: 5
    }, undefined));
    if (props.disabled !== true) {
        items.push(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_7__.Tooltip, {
            title: t('table.paste'),
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_6__.IconButton, {
                icon: {
                    value: 'paste'
                },
                onClick: ()=>modal.textarea({
                        title: t('table.paste'),
                        placeholder: t('paste-placeholder'),
                        okText: t('save'),
                        onOk: (value)=>{
                            if (value !== '') {
                                handleChange(fixColumnConfig((0,_utils_copy_paste__WEBPACK_IMPORTED_MODULE_11__.getPasteData)(value)));
                            }
                        }
                    }),
                type: "default"
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/table/table.tsx",
                lineNumber: 188,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/table/table.tsx",
            lineNumber: 187,
            columnNumber: 7
        }, undefined));
        items.push(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_7__.Tooltip, {
            title: t('empty'),
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_6__.IconButton, {
                icon: {
                    value: 'trash'
                },
                onClick: ()=>{
                    confirm({
                        title: t('empty'),
                        content: t('table.empty.confirm'),
                        onOk: emptyValue
                    });
                },
                type: "default"
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/table/table.tsx",
                lineNumber: 207,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/table/table.tsx",
            lineNumber: 206,
            columnNumber: 7
        }, undefined));
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_14__.Content, {
                style: {
                    width: (0,_Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_15__.toCssDimension)(props.width === 320 ? undefined : props.width),
                    height: (0,_Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_15__.toCssDimension)(props.height)
                },
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_grid_grid__WEBPACK_IMPORTED_MODULE_4__.TableGrid, {
                    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(props.className),
                    cols: cols,
                    columnConfig: props.columnConfig,
                    columnConfigActivated: columnConfigActivated,
                    disabled: props.disabled,
                    onActiveCellChange: setActiveCell,
                    onChange: handleChange,
                    rows: rows,
                    value: value
                }, key, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/table/table.tsx",
                    lineNumber: 230,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/table/table.tsx",
                lineNumber: 224,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_5__.Box, {
                padding: "extra-small",
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_group_button_group__WEBPACK_IMPORTED_MODULE_12__.ButtonGroup, {
                    items: items
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/table/table.tsx",
                    lineNumber: 244,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/table/table.tsx",
                lineNumber: 243,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/table/table.tsx",
        lineNumber: 223,
        columnNumber: 5
    }, undefined);
};
_s(Table, "Wb0s2W0BDgmwYAl+pH9Yv/m+VUI=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_8__.useTranslation,
        _Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_9__.useFormModal,
        _hooks_use_table_value__WEBPACK_IMPORTED_MODULE_10__.useTableValue
    ];
});
_c = Table;
var _c;
$RefreshReg$(_c, "Table");

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
"./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/url-slug/url-slug.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  UrlSlug: () => (UrlSlug)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/classnames/index.js");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var _Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/utils/css.tsx");
/* ESM import */var _Pimcore_modules_document_hooks_use_sites__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/document/hooks/use-sites.ts");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/dropdown/dropdown.tsx");
/* ESM import */var _Pimcore_components_dropdown_button_dropdown_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/components/dropdown-button/dropdown-button.tsx");
/* ESM import */var _Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/components/icon-button/icon-button.tsx");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_11__);
/* ESM import */var _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_providers_field_width_use_field_width__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/use-field-width.tsx");
/* ESM import */var _url_slug_styles__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/url-slug/url-slug.styles.tsx");
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













const getInitialValue = (value)=>{
    return !(0,lodash__WEBPACK_IMPORTED_MODULE_11__.isNil)(value) && !(0,lodash__WEBPACK_IMPORTED_MODULE_11__.isEmpty)(value) ? value : [
        {
            slug: '',
            siteId: 0
        }
    ];
};
const UrlSlug = (props)=>{
    _s();
    const value = getInitialValue(props.value);
    if ((0,lodash__WEBPACK_IMPORTED_MODULE_11__.isPlainObject)(value) && !value.some((entry)=>entry.siteId === 0)) {
        value.unshift({
            slug: '',
            siteId: 0
        });
    }
    const [errors, setErrors] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_7__.useTranslation)();
    const { styles } = (0,_url_slug_styles__WEBPACK_IMPORTED_MODULE_13__.useStyles)();
    const { getSiteById, getRemainingSites } = (0,_Pimcore_modules_document_hooks_use_sites__WEBPACK_IMPORTED_MODULE_6__.useSites)();
    const fieldWidth = (0,_Pimcore_modules_element_dynamic_types_definitions_objects_data_related_providers_field_width_use_field_width__WEBPACK_IMPORTED_MODULE_12__.useFieldWidth)();
    const { Text } = antd__WEBPACK_IMPORTED_MODULE_2__.Typography;
    const handleChange = (value)=>{
        var _props_onChange;
        (_props_onChange = props.onChange) === null || _props_onChange === void 0 ? void 0 : _props_onChange.call(props, value);
    };
    const validateSlug = (slug)=>{
        if (slug !== '') {
            if (!slug.startsWith('/') || slug.length < 2) {
                return false;
            }
            slug = slug.substring(1).replace(/\/$/, '');
            const parts = slug.split('/');
            for (const part of parts){
                if (part.length === 0) {
                    return false;
                }
            }
        }
        return true;
    };
    const handleInputChange = (index, newSlug)=>{
        const newValue = (0,lodash__WEBPACK_IMPORTED_MODULE_11__.cloneDeep)(value);
        newValue[index].slug = newSlug;
        const newErrors = [
            ...errors
        ];
        newErrors[index] = !validateSlug(newSlug);
        handleChange(newValue);
        setErrors(newErrors);
    };
    const remainingSites = getRemainingSites(value.map((item)=>item.siteId), props.availableSites ?? undefined);
    const remainingSitesMenuItems = remainingSites.map((site)=>({
            key: site.id,
            label: site.domain,
            onClick: ()=>{
                handleChange([
                    ...value,
                    {
                        slug: '',
                        siteId: site.id
                    }
                ]);
            }
        }));
    const sortedValue = [
        ...value
    ].sort((a, b)=>a.siteId === 0 ? -1 : 0);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.List, {
        bordered: true,
        className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(styles.container, props.className),
        dataSource: sortedValue,
        loadMore: remainingSites.length > 0 && props.disabled !== true && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.List.Item, {
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_8__.Dropdown, {
                menu: {
                    items: remainingSitesMenuItems
                },
                trigger: [
                    'click'
                ],
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_dropdown_button_dropdown_button__WEBPACK_IMPORTED_MODULE_9__.DropdownButton, {
                    type: "default",
                    children: t('url-slug.add-site')
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/url-slug/url-slug.tsx",
                    lineNumber: 111,
                    columnNumber: 11
                }, void 0)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/url-slug/url-slug.tsx",
                lineNumber: 107,
                columnNumber: 9
            }, void 0)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/url-slug/url-slug.tsx",
            lineNumber: 106,
            columnNumber: 7
        }, void 0),
        renderItem: (item, index)=>{
            var _getSiteById;
            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.List.Item, {
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_4__.Flex, {
                    align: "center",
                    className: "w-full",
                    gap: "small",
                    justify: "center",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                            className: "urlSlugLabel",
                            style: {
                                width: (0,_Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_5__.toCssDimension)(props.domainLabelWidth, 250)
                            },
                            children: item.siteId === 0 ? t('fallback') : (_getSiteById = getSiteById(item.siteId)) === null || _getSiteById === void 0 ? void 0 : _getSiteById.domain
                        }, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/url-slug/url-slug.tsx",
                            lineNumber: 125,
                            columnNumber: 13
                        }, void 0),
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                            className: "w-full",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Input, {
                                    disabled: props.disabled,
                                    onChange: (e)=>{
                                        handleInputChange(index, e.target.value);
                                    },
                                    status: errors[index] ? 'error' : undefined,
                                    value: item.slug
                                }, void 0, false, {
                                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/url-slug/url-slug.tsx",
                                    lineNumber: 132,
                                    columnNumber: 15
                                }, void 0),
                                errors[index] && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Text, {
                                    type: "danger",
                                    children: t('url-slug.invalid')
                                }, void 0, false, {
                                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/url-slug/url-slug.tsx",
                                    lineNumber: 139,
                                    columnNumber: 15
                                }, void 0)
                            ]
                        }, void 0, true, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/url-slug/url-slug.tsx",
                            lineNumber: 131,
                            columnNumber: 13
                        }, void 0),
                        props.disabled !== true && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Tooltip, {
                            title: t('remove'),
                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_10__.IconButton, {
                                disabled: item.siteId === 0,
                                icon: {
                                    value: 'trash'
                                },
                                onClick: ()=>{
                                    const newValue = [
                                        ...value
                                    ];
                                    newValue.splice(index, 1);
                                    handleChange(newValue);
                                },
                                style: {
                                    visibility: item.siteId === 0 ? 'hidden' : undefined
                                }
                            }, void 0, false, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/url-slug/url-slug.tsx",
                                lineNumber: 146,
                                columnNumber: 15
                            }, void 0)
                        }, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/url-slug/url-slug.tsx",
                            lineNumber: 145,
                            columnNumber: 13
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/url-slug/url-slug.tsx",
                    lineNumber: 119,
                    columnNumber: 11
                }, void 0)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/url-slug/url-slug.tsx",
                lineNumber: 118,
                columnNumber: 9
            }, void 0);
        },
        size: "small",
        style: {
            maxWidth: (0,_Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_5__.toCssDimension)(props.width, fieldWidth.large)
        }
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/url-slug/url-slug.tsx",
        lineNumber: 101,
        columnNumber: 5
    }, undefined);
};
_s(UrlSlug, "ehaVJXjDVVe6Adm8ay3y3njZ6TA=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_7__.useTranslation,
        _url_slug_styles__WEBPACK_IMPORTED_MODULE_13__.useStyles,
        _Pimcore_modules_document_hooks_use_sites__WEBPACK_IMPORTED_MODULE_6__.useSites,
        _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_providers_field_width_use_field_width__WEBPACK_IMPORTED_MODULE_12__.useFieldWidth
    ];
});
_c = UrlSlug;
var _c;
$RefreshReg$(_c, "UrlSlug");

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
"./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/video/video.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Video: () => (Video)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_card_card__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/card/card.tsx");
/* ESM import */var _footer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/video/footer.tsx");
/* ESM import */var _Pimcore_components_asset_target_asset_target__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/asset-target/asset-target.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_components_drag_and_drop_droppable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/drag-and-drop/droppable.tsx");
/* ESM import */var _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_video_preview__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/video/preview.tsx");
/* ESM import */var _Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/utils/css.tsx");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./node_modules/classnames/index.js");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_9__);
/* ESM import */var _video_styles__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/video/video.styles.tsx");
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










const Video = (props)=>{
    _s();
    const videoValue = props.value ?? null;
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_5__.useTranslation)();
    const { styles } = (0,_video_styles__WEBPACK_IMPORTED_MODULE_10__.useStyles)();
    const handleChange = (value)=>{
        var _props_onChange;
        (_props_onChange = props.onChange) === null || _props_onChange === void 0 ? void 0 : _props_onChange.call(props, value);
    };
    const clearValue = ()=>{
        var _props_onChange;
        props === null || props === void 0 ? void 0 : (_props_onChange = props.onChange) === null || _props_onChange === void 0 ? void 0 : _props_onChange.call(props, null);
    };
    const width = (0,_Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_8__.toCssDimension)(props.width, 300);
    const height = (0,_Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_8__.toCssDimension)(props.height, 245);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_card_card__WEBPACK_IMPORTED_MODULE_2__.Card, {
        className: classnames__WEBPACK_IMPORTED_MODULE_9___default()('max-w-full', styles.video, props.className),
        fitContent: true,
        footer: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_footer__WEBPACK_IMPORTED_MODULE_3__.VideoFooter, {
            allowedVideoTypes: props.allowedVideoTypes,
            disabled: props.disabled,
            emptyValue: clearValue,
            onSave: handleChange,
            value: videoValue
        }, "video-footer", false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/video/video.tsx",
            lineNumber: 95,
            columnNumber: 9
        }, void 0),
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_drag_and_drop_droppable__WEBPACK_IMPORTED_MODULE_6__.Droppable, {
            isValidContext: (info)=>props.disabled !== true,
            isValidData: (info)=>info.type === 'asset' && info.data.type === 'video',
            onDrop: (info)=>{
                handleChange({
                    type: 'asset',
                    data: {
                        type: 'asset',
                        id: info.data.id,
                        fullPath: `${info.data.path}${info.data.filename ?? info.data.key}`,
                        subtype: info.data.type
                    }
                });
            },
            variant: "outline",
            children: videoValue !== null && (videoValue === null || videoValue === void 0 ? void 0 : videoValue.data) !== null ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_video_preview__WEBPACK_IMPORTED_MODULE_7__.VideoPreview, {
                height: height,
                value: videoValue,
                width: width
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/video/video.tsx",
                lineNumber: 125,
                columnNumber: 15
            }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_asset_target_asset_target__WEBPACK_IMPORTED_MODULE_4__.AssetTarget, {
                dndIcon: props.disabled !== true,
                height: height,
                title: t(props.disabled !== true ? 'video.dnd-target' : 'empty'),
                width: width
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/video/video.tsx",
                lineNumber: 132,
                columnNumber: 15
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/video/video.tsx",
            lineNumber: 105,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/video/video.tsx",
        lineNumber: 91,
        columnNumber: 5
    }, undefined);
};
_s(Video, "RLrtxoYLhU6K3pUxNPOpN7Ah0UQ=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_5__.useTranslation,
        _video_styles__WEBPACK_IMPORTED_MODULE_10__.useStyles
    ];
});
_c = Video;
var _c;
$RefreshReg$(_c, "Video");

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
//# sourceMappingURL=js_src_core_mf-bootstrap_ts.f65938f15d6b0c16.hot-update.js.map