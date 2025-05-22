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
            if (props.mode === 'geoPoint') {
                (0,_Pimcore_components_geo_map_toolbar_add_geo_point_toolbar__WEBPACK_IMPORTED_MODULE_7__.addGeoPointToolbar)(map, featureGroup, settings.maps.reverse_geocoding_url_template, value, props.onChange, props.disabled);
            } else if (props.mode === 'geoPolyLine') {
                (0,_Pimcore_components_geo_map_toolbar_add_geo_poly_line_toolbar__WEBPACK_IMPORTED_MODULE_11__.addGeoPolyLineToolbar)(map, featureGroup, value, props.onChange, props.disabled);
            } else if (props.mode === 'geoPolygon') {
                (0,_Pimcore_components_geo_map_toolbar_add_geo_polygon_toolbar__WEBPACK_IMPORTED_MODULE_12__.addGeoPolygonToolbar)(map, featureGroup, value, props.onChange, props.disabled);
            } else if (props.mode === 'geoBounds') {
                (0,_Pimcore_components_geo_map_toolbar_add_geo_bounds_toolbar__WEBPACK_IMPORTED_MODULE_13__.addGeoBoundsToolbar)(map, featureGroup, value, props.onChange, props.disabled);
            }
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
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_2__.isEqual)(value, props.value)) {
            setValue(props.value);
        }
    }, [
        props.value
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_2__.isEqual)(lat, props.lat)) {
            setLat(props.lat);
        }
    }, [
        props.lat
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_2__.isEqual)(lng, props.lng)) {
            setLng(props.lng);
        }
    }, [
        props.lng
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_2__.isEqual)(zoom, props.zoom)) {
            setZoom(props.zoom);
        }
    }, [
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
            lineNumber: 168,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-map/geo-map.tsx",
        lineNumber: 167,
        columnNumber: 5
    }, undefined);
}, "558JlN68wIXXyOPyBEzGWPKl9sE=", false, function() {
    return [
        _Pimcore_modules_app_settings_hooks_use_settings__WEBPACK_IMPORTED_MODULE_14__.useSettings,
        _geo_map_styles__WEBPACK_IMPORTED_MODULE_9__.useStyles,
        _Pimcore_utils_hooks_use_element_visible__WEBPACK_IMPORTED_MODULE_15__["default"]
    ];
})), "558JlN68wIXXyOPyBEzGWPKl9sE=", false, function() {
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

});
//# sourceMappingURL=js_src_core_mf-bootstrap_ts.a997624349a51904.hot-update.js.map