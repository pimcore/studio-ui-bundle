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
"./js/src/core/components/geo-map/toolbar/add-geo-bounds-toolbar.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addGeoBoundsToolbar: () => (addGeoBoundsToolbar)
});
/* ESM import */var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/leaflet/dist/leaflet-src.js");
/* ESM import */var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
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
const addGeoBoundsToolbar = (leafletMap, featureGroup, geoBounds, onChange, disabled)=>{
    leafletMap.addLayer(featureGroup);
    const bounds = geoBounds !== undefined ? leaflet__WEBPACK_IMPORTED_MODULE_0___default().latLngBounds(leaflet__WEBPACK_IMPORTED_MODULE_0___default().latLng(geoBounds.northEast.latitude, geoBounds.northEast.longitude), leaflet__WEBPACK_IMPORTED_MODULE_0___default().latLng(geoBounds.southWest.latitude, geoBounds.southWest.longitude)) : undefined;
    let rectangle;
    if (bounds !== undefined) {
        rectangle = leaflet__WEBPACK_IMPORTED_MODULE_0___default().rectangle(bounds, {
            stroke: true,
            color: '#3388ff',
            opacity: 0.5,
            fillOpacity: 0.2,
            weight: 4
        });
        featureGroup.addLayer(rectangle);
        leafletMap.fitBounds(bounds);
    }
    if (disabled === true) {
        return;
    }
    const drawControlFull = new (leaflet__WEBPACK_IMPORTED_MODULE_0___default().Control.Draw)({
        position: 'topright',
        draw: {
            polyline: false,
            polygon: false,
            circle: false,
            marker: false,
            circlemarker: false,
            // eslint-disable-next-line
            rectangle: {
                showArea: false
            }
        },
        edit: {
            featureGroup,
            remove: false
        }
    });
    leafletMap.addControl(drawControlFull);
    leafletMap.on((leaflet__WEBPACK_IMPORTED_MODULE_0___default().Draw.Event.CREATED), function(e) {
        featureGroup.clearLayers();
        if (rectangle !== undefined) {
            rectangle.remove();
        }
        const layer = e.layer;
        featureGroup.addLayer(layer);
        if (featureGroup.getLayers().length === 1) {
            if (onChange !== undefined) {
                const ne = layer.getBounds().getNorthEast();
                const sw = layer.getBounds().getSouthWest();
                onChange({
                    northEast: {
                        latitude: ne.lat,
                        longitude: ne.lng
                    },
                    southWest: {
                        latitude: sw.lat,
                        longitude: sw.lng
                    }
                });
            }
        }
    });
    leafletMap.on((leaflet__WEBPACK_IMPORTED_MODULE_0___default().Draw.Event.DELETED), function(e) {
        if (onChange !== undefined) {
            onChange(undefined);
        }
    });
    leafletMap.on((leaflet__WEBPACK_IMPORTED_MODULE_0___default().Draw.Event.EDITRESIZE) + ' ' + (leaflet__WEBPACK_IMPORTED_MODULE_0___default().Draw.Event.EDITMOVE), function(e) {
        if (onChange !== undefined) {
            const ne = e.layer.getBounds().getNorthEast();
            const sw = e.layer.getBounds().getSouthWest();
            onChange({
                northEast: {
                    latitude: ne.lat,
                    longitude: ne.lng
                },
                southWest: {
                    latitude: sw.lat,
                    longitude: sw.lng
                }
            });
        }
    });
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

});
//# sourceMappingURL=js_src_core_mf-bootstrap_ts.a344e2ec1cac4b22.hot-update.js.map