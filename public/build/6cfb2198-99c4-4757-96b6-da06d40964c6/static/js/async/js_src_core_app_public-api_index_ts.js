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
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["js_src_core_app_public-api_index_ts"], {
"./js/src/core/app/public-api/api-gateway/api-gateway-event.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  API_GATEWAY_EVENT: () => (API_GATEWAY_EVENT),
  ApiGatewayEvent: () => (ApiGatewayEvent)
});
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ /**
 * Event name for API gateway requests
 */ const API_GATEWAY_EVENT = 'pimcore:gateway:request';
/**
 * Custom event class for API Gateway events
 * Provides type safety and structured handling of API gateway requests
 */ class ApiGatewayEvent extends CustomEvent {
    get eventType() {
        return this.detail.type;
    }
    get payload() {
        return this.detail.payload;
    }
    constructor(type, payload){
        super(API_GATEWAY_EVENT, {
            detail: {
                type,
                payload
            }
        });
    }
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
"./js/src/core/app/public-api/api-gateway/handlers/crop-modal-handler.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  openCropModalHandler: () => (openCropModalHandler)
});
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ const openCropModalHandler = (payload, context)=>{
    const { cropModalContext } = context;
    cropModalContext.openModal(payload.imageId, payload.crop, payload.options);
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
"./js/src/core/app/public-api/api-gateway/handlers/element-selector-handler.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  openElementSelectorHandler: () => (openElementSelectorHandler)
});
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ const openElementSelectorHandler = (payload, context)=>{
    const { elementSelectorHelper } = context;
    elementSelectorHelper.setConfig(payload);
    elementSelectorHelper.open();
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
"./js/src/core/app/public-api/api-gateway/handlers/hotspot-markers-modal-handler.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  openHotspotMarkersModalHandler: () => (openHotspotMarkersModalHandler)
});
/* ESM import */var _Pimcore_utils_uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/utils/uuid.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 
const openHotspotMarkersModalHandler = (payload, context)=>{
    const { hotspotMarkersModalContext } = context;
    const modalId = `iframe-hotspot-modal-${(0,_Pimcore_utils_uuid__WEBPACK_IMPORTED_MODULE_0__.uuid)()}`;
    hotspotMarkersModalContext.openModal(modalId, payload.imageId, payload.hotspots, payload.crop, payload.options);
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
"./js/src/core/app/public-api/api-gateway/handlers/index.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  initializeHandlers: () => (initializeHandlers),
  locateInTreeHandler: () => (/* reexport safe */ _locate_in_tree_handler__WEBPACK_IMPORTED_MODULE_8__.locateInTreeHandler),
  openCropModalHandler: () => (/* reexport safe */ _crop_modal_handler__WEBPACK_IMPORTED_MODULE_5__.openCropModalHandler),
  openElementSelectorHandler: () => (/* reexport safe */ _element_selector_handler__WEBPACK_IMPORTED_MODULE_2__.openElementSelectorHandler),
  openHotspotMarkersModalHandler: () => (/* reexport safe */ _hotspot_markers_modal_handler__WEBPACK_IMPORTED_MODULE_6__.openHotspotMarkersModalHandler),
  openLinkModalHandler: () => (/* reexport safe */ _link_modal_handler__WEBPACK_IMPORTED_MODULE_4__.openLinkModalHandler),
  openUploadModalHandler: () => (/* reexport safe */ _upload_modal_handler__WEBPACK_IMPORTED_MODULE_3__.openUploadModalHandler),
  openVideoModalHandler: () => (/* reexport safe */ _video_modal_handler__WEBPACK_IMPORTED_MODULE_7__.openVideoModalHandler)
});
/* ESM import */var _registry_handler_registry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/public-api/api-gateway/registry/handler-registry.ts");
/* ESM import */var _types_event_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/app/public-api/api-gateway/types/event-types.ts");
/* ESM import */var _element_selector_handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/app/public-api/api-gateway/handlers/element-selector-handler.ts");
/* ESM import */var _upload_modal_handler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/app/public-api/api-gateway/handlers/upload-modal-handler.ts");
/* ESM import */var _link_modal_handler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/app/public-api/api-gateway/handlers/link-modal-handler.ts");
/* ESM import */var _crop_modal_handler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/app/public-api/api-gateway/handlers/crop-modal-handler.ts");
/* ESM import */var _hotspot_markers_modal_handler__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/app/public-api/api-gateway/handlers/hotspot-markers-modal-handler.ts");
/* ESM import */var _video_modal_handler__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/app/public-api/api-gateway/handlers/video-modal-handler.ts");
/* ESM import */var _locate_in_tree_handler__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/app/public-api/api-gateway/handlers/locate-in-tree-handler.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 








const initializeHandlers = ()=>{
    // Register all handlers here
    (0,_registry_handler_registry__WEBPACK_IMPORTED_MODULE_0__.registerApiGatewayHandler)(_types_event_types__WEBPACK_IMPORTED_MODULE_1__.ApiGatewayEventType.openElementSelector, _element_selector_handler__WEBPACK_IMPORTED_MODULE_2__.openElementSelectorHandler);
    (0,_registry_handler_registry__WEBPACK_IMPORTED_MODULE_0__.registerApiGatewayHandler)(_types_event_types__WEBPACK_IMPORTED_MODULE_1__.ApiGatewayEventType.openUploadModal, _upload_modal_handler__WEBPACK_IMPORTED_MODULE_3__.openUploadModalHandler);
    (0,_registry_handler_registry__WEBPACK_IMPORTED_MODULE_0__.registerApiGatewayHandler)(_types_event_types__WEBPACK_IMPORTED_MODULE_1__.ApiGatewayEventType.openLinkModal, _link_modal_handler__WEBPACK_IMPORTED_MODULE_4__.openLinkModalHandler);
    (0,_registry_handler_registry__WEBPACK_IMPORTED_MODULE_0__.registerApiGatewayHandler)(_types_event_types__WEBPACK_IMPORTED_MODULE_1__.ApiGatewayEventType.openCropModal, _crop_modal_handler__WEBPACK_IMPORTED_MODULE_5__.openCropModalHandler);
    (0,_registry_handler_registry__WEBPACK_IMPORTED_MODULE_0__.registerApiGatewayHandler)(_types_event_types__WEBPACK_IMPORTED_MODULE_1__.ApiGatewayEventType.openHotspotMarkersModal, _hotspot_markers_modal_handler__WEBPACK_IMPORTED_MODULE_6__.openHotspotMarkersModalHandler);
    (0,_registry_handler_registry__WEBPACK_IMPORTED_MODULE_0__.registerApiGatewayHandler)(_types_event_types__WEBPACK_IMPORTED_MODULE_1__.ApiGatewayEventType.openVideoModal, _video_modal_handler__WEBPACK_IMPORTED_MODULE_7__.openVideoModalHandler);
    (0,_registry_handler_registry__WEBPACK_IMPORTED_MODULE_0__.registerApiGatewayHandler)(_types_event_types__WEBPACK_IMPORTED_MODULE_1__.ApiGatewayEventType.locateInTree, _locate_in_tree_handler__WEBPACK_IMPORTED_MODULE_8__.locateInTreeHandler);
};
// Export all handlers for potential direct use








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
"./js/src/core/app/public-api/api-gateway/handlers/link-modal-handler.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  openLinkModalHandler: () => (openLinkModalHandler)
});
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ const openLinkModalHandler = (payload, context)=>{
    const { linkModalContext } = context;
    linkModalContext.openModal(payload.value, payload.options);
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
"./js/src/core/app/public-api/api-gateway/handlers/locate-in-tree-handler.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  locateInTreeHandler: () => (locateInTreeHandler)
});
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _Pimcore_modules_element_element_api_slice_gen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/element/element-api-slice.gen.ts");
/* ESM import */var _Pimcore_components_element_tree_element_tree_slice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/element-tree/element-tree-slice.ts");
/* ESM import */var _Pimcore_modules_perspectives_active_perspective_slice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/perspectives/active-perspective-slice.ts");
/* ESM import */var _Pimcore_modules_widget_manager_widget_manager_slice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/widget-manager/widget-manager-slice.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 





const locateInTreeHandler = (payload)=>{
    const { id, elementType } = payload;
    const activePerspective = (0,_Pimcore_modules_perspectives_active_perspective_slice__WEBPACK_IMPORTED_MODULE_3__.selectActivePerspective)(_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.store.getState());
    if ((0,lodash__WEBPACK_IMPORTED_MODULE_5__.isNull)(activePerspective)) {
        console.warn('No active perspective available for locate in tree');
        return;
    }
    _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.store.dispatch(_Pimcore_modules_element_element_api_slice_gen__WEBPACK_IMPORTED_MODULE_1__.api.endpoints.elementGetTreeLocation.initiate({
        id,
        elementType,
        perspectiveId: activePerspective.id
    }, {
        forceRefetch: true
    })).then((result)=>{
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_5__.isNil)(result.data) && !(0,lodash__WEBPACK_IMPORTED_MODULE_5__.isNil)(result.data.treeLevelData)) {
            const treeId = String(result.data.widgetId);
            _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.store.dispatch((0,_Pimcore_modules_widget_manager_widget_manager_slice__WEBPACK_IMPORTED_MODULE_4__.setActiveWidgetById)(treeId));
            _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.store.dispatch((0,_Pimcore_components_element_tree_element_tree_slice__WEBPACK_IMPORTED_MODULE_2__.locateInTree)({
                treeId,
                nodeId: (0,lodash__WEBPACK_IMPORTED_MODULE_5__.isString)(id) ? id : String(id),
                treeLevelData: result.data.treeLevelData
            }));
        }
    }).catch((error)=>{
        console.error('Error locating element in tree:', error);
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
"./js/src/core/app/public-api/api-gateway/handlers/upload-modal-handler.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  openUploadModalHandler: () => (openUploadModalHandler)
});
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ const openUploadModalHandler = (payload, context)=>{
    const { uploadModalContext } = context;
    uploadModalContext.triggerUpload(payload);
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
"./js/src/core/app/public-api/api-gateway/handlers/video-modal-handler.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  openVideoModalHandler: () => (openVideoModalHandler)
});
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ const openVideoModalHandler = (payload, context)=>{
    const { videoModalContext } = context;
    videoModalContext.openModal(payload.value, payload.options);
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
"./js/src/core/app/public-api/api-gateway/index.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  API_GATEWAY_EVENT: () => (/* reexport safe */ _api_gateway_event__WEBPACK_IMPORTED_MODULE_1__.API_GATEWAY_EVENT),
  ApiGateway: () => (/* reexport safe */ _gateway__WEBPACK_IMPORTED_MODULE_0__.ApiGateway),
  ApiGatewayEvent: () => (/* reexport safe */ _api_gateway_event__WEBPACK_IMPORTED_MODULE_1__.ApiGatewayEvent),
  ApiGatewayEventType: () => (/* reexport safe */ _types_event_types__WEBPACK_IMPORTED_MODULE_2__.ApiGatewayEventType),
  getApiGatewayHandler: () => (/* reexport safe */ _registry_handler_registry__WEBPACK_IMPORTED_MODULE_3__.getApiGatewayHandler),
  initializeHandlers: () => (/* reexport safe */ _handlers__WEBPACK_IMPORTED_MODULE_4__.initializeHandlers),
  openElementSelectorHandler: () => (/* reexport safe */ _handlers__WEBPACK_IMPORTED_MODULE_4__.openElementSelectorHandler),
  openUploadModalHandler: () => (/* reexport safe */ _handlers__WEBPACK_IMPORTED_MODULE_4__.openUploadModalHandler),
  registerApiGatewayHandler: () => (/* reexport safe */ _registry_handler_registry__WEBPACK_IMPORTED_MODULE_3__.registerApiGatewayHandler)
});
/* ESM import */var _gateway__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/public-api/api-gateway/gateway.tsx");
/* ESM import */var _api_gateway_event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/app/public-api/api-gateway/api-gateway-event.ts");
/* ESM import */var _types_event_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/app/public-api/api-gateway/types/event-types.ts");
/* ESM import */var _registry_handler_registry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/app/public-api/api-gateway/registry/handler-registry.ts");
/* ESM import */var _handlers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/app/public-api/api-gateway/handlers/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ // Main API Gateway component

// Events

// Types

// Registry

// Handlers


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
"./js/src/core/app/public-api/api-gateway/registry/handler-registry.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  getApiGatewayHandler: () => (getApiGatewayHandler),
  registerApiGatewayHandler: () => (registerApiGatewayHandler)
});
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ const handlerRegistry = new Map();
const registerApiGatewayHandler = (type, handler)=>{
    if (handlerRegistry.has(type)) {
        console.warn(`A handler for the API gateway event type "${type}" is already registered. It will be overwritten.`);
    }
    handlerRegistry.set(type, handler);
};
const getApiGatewayHandler = (type)=>{
    return handlerRegistry.get(type);
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
"./js/src/core/app/public-api/api-gateway/types/event-types.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ApiGatewayEventType: () => (ApiGatewayEventType)
});
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ var ApiGatewayEventType = /*#__PURE__*/ function(ApiGatewayEventType) {
    ApiGatewayEventType["openElementSelector"] = "openElementSelector";
    ApiGatewayEventType["openUploadModal"] = "openUploadModal";
    ApiGatewayEventType["openLinkModal"] = "openLinkModal";
    ApiGatewayEventType["openCropModal"] = "openCropModal";
    ApiGatewayEventType["openHotspotMarkersModal"] = "openHotspotMarkersModal";
    ApiGatewayEventType["openVideoModal"] = "openVideoModal";
    ApiGatewayEventType["locateInTree"] = "locateInTree";
    return ApiGatewayEventType;
}({});

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
"./js/src/core/app/public-api/document/document-api.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  documentApi: () => (documentApi)
});
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _Pimcore_modules_document_document_draft_slice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/document/document-draft-slice.tsx");
/* ESM import */var _iframe_registry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/app/public-api/document/iframe-registry.ts");
/* ESM import */var _Pimcore_modules_document_services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/document/services/index.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var _Pimcore_modules_document_document_editor_slice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/document/document-editor-slice.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 





class DocumentApiImpl {
    markDraftAsModified(documentId) {
        var _document_changes;
        const currentState = _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.store.getState();
        const document = (0,_Pimcore_modules_document_document_draft_slice__WEBPACK_IMPORTED_MODULE_1__.selectDocumentById)(currentState, documentId);
        if (document === null || document === void 0 ? void 0 : (_document_changes = document.changes) === null || _document_changes === void 0 ? void 0 : _document_changes.documentEditable) {
            return;
        }
        setTimeout(()=>{
            _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.store.dispatch((0,_Pimcore_modules_document_document_draft_slice__WEBPACK_IMPORTED_MODULE_1__.markDocumentEditablesAsModified)(documentId));
        }, 0);
    }
    getIframeApi(documentId) {
        return _iframe_registry__WEBPACK_IMPORTED_MODULE_2__.iframeDocumentEditorRegistry.getDocumentEditorApi(documentId);
    }
    getIframeDocument(documentId) {
        return _iframe_registry__WEBPACK_IMPORTED_MODULE_2__.iframeDocumentEditorRegistry.getIframeDocument(documentId);
    }
    isIframeAvailable(documentId) {
        return _iframe_registry__WEBPACK_IMPORTED_MODULE_2__.iframeDocumentEditorRegistry.isIframeRegistered(documentId);
    }
    registerIframe(documentId, iframe, iframeRef) {
        _iframe_registry__WEBPACK_IMPORTED_MODULE_2__.iframeDocumentEditorRegistry.register(documentId, iframe, iframeRef);
        this.autoSaveCallbacks.set(documentId, (0,lodash__WEBPACK_IMPORTED_MODULE_4__.debounce)(async ()=>{
            await this.performAutoSave(documentId);
        }, 800));
        // Automatically set up ready state notification when iframe becomes ready
        _iframe_registry__WEBPACK_IMPORTED_MODULE_2__.iframeDocumentEditorRegistry.onReady(documentId, ()=>{
            var // Notify the iframe component that it's ready
            _iframeRef_current;
            (_iframeRef_current = iframeRef.current) === null || _iframeRef_current === void 0 ? void 0 : _iframeRef_current.setReady(true);
        });
    }
    unregisterIframe(documentId) {
        _iframe_registry__WEBPACK_IMPORTED_MODULE_2__.iframeDocumentEditorRegistry.unregister(documentId);
        this.autoSaveCallbacks.delete(documentId);
    }
    triggerValueChange(documentId, key, value) {
        var _this_autoSaveCallbacks_get;
        this.markDraftAsModified(documentId);
        void ((_this_autoSaveCallbacks_get = this.autoSaveCallbacks.get(documentId)) === null || _this_autoSaveCallbacks_get === void 0 ? void 0 : _this_autoSaveCallbacks_get());
    }
    triggerValueChangeWithReload(documentId, key, value) {
        this.markDraftAsModified(documentId);
        // Perform immediate auto-save without debounce, then reload
        void this.performAutoSaveAndReload(documentId);
    }
    triggerSaveAndReload(documentId) {
        void this.performAutoSaveAndReload(documentId);
    }
    notifyIframeReady(documentId) {
        _iframe_registry__WEBPACK_IMPORTED_MODULE_2__.iframeDocumentEditorRegistry.markAsReady(documentId);
    }
    notifyAreablockTypes(documentId, areablockTypes) {
        _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.store.dispatch((0,_Pimcore_modules_document_document_editor_slice__WEBPACK_IMPORTED_MODULE_5__.setDocumentAreablockTypes)({
            documentId,
            areablockTypes
        }));
    }
    isIframeReady(documentId) {
        return _iframe_registry__WEBPACK_IMPORTED_MODULE_2__.iframeDocumentEditorRegistry.isIframeReady(documentId);
    }
    onReady(documentId, callback) {
        _iframe_registry__WEBPACK_IMPORTED_MODULE_2__.iframeDocumentEditorRegistry.onReady(documentId, callback);
    }
    async performAutoSave(documentId) {
        try {
            await _Pimcore_modules_document_services__WEBPACK_IMPORTED_MODULE_3__.documentSaveService.saveDocument(documentId, _Pimcore_modules_document_services__WEBPACK_IMPORTED_MODULE_3__.SaveTaskType.AutoSave);
        } catch (error) {
            console.error(`Auto-save failed for document ${documentId}:`, error);
        }
    }
    async performAutoSaveAndReload(documentId) {
        try {
            const iframeRef = _iframe_registry__WEBPACK_IMPORTED_MODULE_2__.iframeDocumentEditorRegistry.getIframeRef(documentId);
            if (!(0,lodash__WEBPACK_IMPORTED_MODULE_4__.isNil)(iframeRef === null || iframeRef === void 0 ? void 0 : iframeRef.current)) {
                iframeRef.current.setReloading(true);
            }
            await _Pimcore_modules_document_services__WEBPACK_IMPORTED_MODULE_3__.documentSaveService.saveDocument(documentId, _Pimcore_modules_document_services__WEBPACK_IMPORTED_MODULE_3__.SaveTaskType.AutoSave);
            if (!(0,lodash__WEBPACK_IMPORTED_MODULE_4__.isNil)(iframeRef === null || iframeRef === void 0 ? void 0 : iframeRef.current)) {
                iframeRef.current.reload();
            }
        } catch (error) {
            console.error(`Auto-save and reload failed for document ${documentId}:`, error);
            // Reset loading state on error
            const iframeRef = _iframe_registry__WEBPACK_IMPORTED_MODULE_2__.iframeDocumentEditorRegistry.getIframeRef(documentId);
            if (!(0,lodash__WEBPACK_IMPORTED_MODULE_4__.isNil)(iframeRef === null || iframeRef === void 0 ? void 0 : iframeRef.current)) {
                iframeRef.current.setReloading(false);
            }
        }
    }
    constructor(){
        this.autoSaveCallbacks = new Map();
    }
}
const documentApi = new DocumentApiImpl();

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
"./js/src/core/app/public-api/document/iframe-registry.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  iframeDocumentEditorRegistry: () => (iframeDocumentEditorRegistry)
});
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 
class IframeDocumentEditorRegistry {
    register(documentId, iframe, iframeRef) {
        if ((0,lodash__WEBPACK_IMPORTED_MODULE_0__.isNull)(iframe.contentWindow)) {
            throw new Error(`Iframe for document ${documentId} has no content window`);
        }
        this.iframes.set(documentId, {
            iframe,
            documentId,
            contentWindow: iframe.contentWindow,
            iframeRef,
            isReady: false,
            readyCallbacks: []
        });
    }
    unregister(documentId) {
        this.iframes.delete(documentId);
    }
    getIframe(documentId) {
        var _this_iframes_get;
        return (_this_iframes_get = this.iframes.get(documentId)) === null || _this_iframes_get === void 0 ? void 0 : _this_iframes_get.iframe;
    }
    getContentWindow(documentId) {
        var _this_iframes_get;
        return (_this_iframes_get = this.iframes.get(documentId)) === null || _this_iframes_get === void 0 ? void 0 : _this_iframes_get.contentWindow;
    }
    getIframeDocument(documentId) {
        var _iframe_contentWindow;
        const iframe = this.getIframe(documentId);
        return (iframe === null || iframe === void 0 ? void 0 : iframe.contentDocument) ?? (iframe === null || iframe === void 0 ? void 0 : (_iframe_contentWindow = iframe.contentWindow) === null || _iframe_contentWindow === void 0 ? void 0 : _iframe_contentWindow.document);
    }
    getDocumentEditorApi(documentId) {
        const contentWindow = this.getContentWindow(documentId);
        if ((0,lodash__WEBPACK_IMPORTED_MODULE_0__.isNull)(contentWindow)) {
            throw new Error(`No iframe found for document ID ${documentId}`);
        }
        const api = contentWindow.PimcoreDocumentEditor;
        if ((0,lodash__WEBPACK_IMPORTED_MODULE_0__.isNil)(api)) {
            throw new Error(`Document editor API not available in iframe for document ID ${documentId}`);
        }
        return api;
    }
    isIframeRegistered(documentId) {
        return this.iframes.has(documentId);
    }
    getAllRegisteredDocumentIds() {
        return Array.from(this.iframes.keys());
    }
    getIframeRef(documentId) {
        var _this_iframes_get;
        return (_this_iframes_get = this.iframes.get(documentId)) === null || _this_iframes_get === void 0 ? void 0 : _this_iframes_get.iframeRef;
    }
    /**
   * Mark an iframe as ready and execute any pending callbacks
   */ markAsReady(documentId) {
        const reference = this.iframes.get(documentId);
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isNil)(reference) && !reference.isReady) {
            reference.isReady = true;
            // Execute all pending callbacks
            reference.readyCallbacks.forEach((callback)=>{
                try {
                    callback();
                } catch (error) {
                    console.error(`Error executing ready callback for document ${documentId}:`, error);
                }
            });
            // Clear callbacks after execution
            reference.readyCallbacks.length = 0;
        }
    }
    /**
   * Check if an iframe is ready
   */ isIframeReady(documentId) {
        var _this_iframes_get;
        return ((_this_iframes_get = this.iframes.get(documentId)) === null || _this_iframes_get === void 0 ? void 0 : _this_iframes_get.isReady) ?? false;
    }
    /**
   * Register a callback to be executed when the iframe is ready
   * If already ready, executes immediately
   */ onReady(documentId, callback) {
        const reference = this.iframes.get(documentId);
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isNil)(reference)) {
            if (reference.isReady) {
                // Already ready, execute immediately
                try {
                    callback();
                } catch (error) {
                    console.error(`Error executing immediate ready callback for document ${documentId}:`, error);
                }
            } else {
                // Not ready yet, add to pending callbacks
                reference.readyCallbacks.push(callback);
            }
        } else {
            throw new Error(`No iframe found for document ID ${documentId}`);
        }
    }
    constructor(){
        this.iframes = new Map();
    }
}
const iframeDocumentEditorRegistry = new IframeDocumentEditorRegistry();

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
"./js/src/core/app/public-api/element/element-api.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  elementApi: () => (elementApi),
  elementOpeningService: () => (elementOpeningService)
});
/* ESM import */var _Pimcore_modules_asset_services_asset_opening_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/asset/services/asset-opening-service.ts");
/* ESM import */var _Pimcore_modules_document_services_document_opening_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/document/services/document-opening-service.ts");
/* ESM import */var _Pimcore_modules_data_object_services_data_object_opening_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/data-object/services/data-object-opening-service.ts");
/* ESM import */var _Pimcore_app_public_api_helpers_api_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/app/public-api/helpers/api-helper.ts");
/* ESM import */var _Pimcore_utils_iframe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/utils/iframe.ts");
/* ESM import */var _Pimcore_app_public_api_api_gateway__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/app/public-api/api-gateway/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 





class ElementOpeningService {
    async openAsset(config) {
        await _Pimcore_modules_asset_services_asset_opening_service__WEBPACK_IMPORTED_MODULE_0__.assetOpeningService.openAsset(config);
    }
    async openDocument(config) {
        await _Pimcore_modules_document_services_document_opening_service__WEBPACK_IMPORTED_MODULE_1__.documentOpeningService.openDocument(config);
    }
    async openDataObject(config) {
        await _Pimcore_modules_data_object_services_data_object_opening_service__WEBPACK_IMPORTED_MODULE_2__.dataObjectOpeningService.openDataObject(config);
    }
    async openElement(id, type) {
        const config = {
            id
        };
        switch(type){
            case 'asset':
                await this.openAsset(config);
                break;
            case 'document':
                await this.openDocument(config);
                break;
            case 'data-object':
                await this.openDataObject(config);
                break;
            default:
                console.warn(`Unknown element type: ${String(type)}`);
                break;
        }
    }
}
// Create singleton instance
const elementOpeningService = new ElementOpeningService();
class ElementApiImpl {
    async openAsset(id) {
        await elementOpeningService.openAsset({
            id
        });
    }
    async openDocument(id) {
        await elementOpeningService.openDocument({
            id
        });
    }
    async openDataObject(id) {
        await elementOpeningService.openDataObject({
            id
        });
    }
    async openElement(id, type) {
        await elementOpeningService.openElement(id, type);
    }
    openElementSelector(config) {
        try {
            const { element: elementApi } = (0,_Pimcore_app_public_api_helpers_api_helper__WEBPACK_IMPORTED_MODULE_3__.getPimcoreStudioApi)();
            if ((0,_Pimcore_utils_iframe__WEBPACK_IMPORTED_MODULE_4__.isInIframe)()) {
                elementApi.openElementSelector(config);
            } else {
                this.openElementSelectorDirectly(config);
            }
        } catch (error) {
            console.error('Failed to open element selector:', error);
        }
    }
    openElementSelectorDirectly(config) {
        const event = new _Pimcore_app_public_api_api_gateway__WEBPACK_IMPORTED_MODULE_5__.ApiGatewayEvent(_Pimcore_app_public_api_api_gateway__WEBPACK_IMPORTED_MODULE_5__.ApiGatewayEventType.openElementSelector, config);
        window.dispatchEvent(event);
    }
    openUploadModal(props) {
        try {
            if ((0,_Pimcore_utils_iframe__WEBPACK_IMPORTED_MODULE_4__.isInIframe)()) {
                const { element: elementApi } = (0,_Pimcore_app_public_api_helpers_api_helper__WEBPACK_IMPORTED_MODULE_3__.getPimcoreStudioApi)();
                elementApi.openUploadModal(props);
            } else {
                this.openUploadModalDirectly(props);
            }
        } catch (error) {
            console.error('Failed to open upload modal:', error);
        }
    }
    openUploadModalDirectly(props) {
        const event = new _Pimcore_app_public_api_api_gateway__WEBPACK_IMPORTED_MODULE_5__.ApiGatewayEvent(_Pimcore_app_public_api_api_gateway__WEBPACK_IMPORTED_MODULE_5__.ApiGatewayEventType.openUploadModal, props);
        window.dispatchEvent(event);
    }
    openLinkModal(props) {
        try {
            if ((0,_Pimcore_utils_iframe__WEBPACK_IMPORTED_MODULE_4__.isInIframe)()) {
                const { element: elementApi } = (0,_Pimcore_app_public_api_helpers_api_helper__WEBPACK_IMPORTED_MODULE_3__.getPimcoreStudioApi)();
                elementApi.openLinkModal(props);
            } else {
                this.openLinkModalDirectly(props);
            }
        } catch (error) {
            console.error('Failed to open link modal:', error);
        }
    }
    openLinkModalDirectly(props) {
        const event = new _Pimcore_app_public_api_api_gateway__WEBPACK_IMPORTED_MODULE_5__.ApiGatewayEvent(_Pimcore_app_public_api_api_gateway__WEBPACK_IMPORTED_MODULE_5__.ApiGatewayEventType.openLinkModal, props);
        window.dispatchEvent(event);
    }
    openCropModal(props) {
        try {
            if ((0,_Pimcore_utils_iframe__WEBPACK_IMPORTED_MODULE_4__.isInIframe)()) {
                const { element: elementApi } = (0,_Pimcore_app_public_api_helpers_api_helper__WEBPACK_IMPORTED_MODULE_3__.getPimcoreStudioApi)();
                elementApi.openCropModal(props);
            } else {
                this.openCropModalDirectly(props);
            }
        } catch (error) {
            console.error('Failed to open crop modal:', error);
        }
    }
    openCropModalDirectly(props) {
        const event = new _Pimcore_app_public_api_api_gateway__WEBPACK_IMPORTED_MODULE_5__.ApiGatewayEvent(_Pimcore_app_public_api_api_gateway__WEBPACK_IMPORTED_MODULE_5__.ApiGatewayEventType.openCropModal, props);
        window.dispatchEvent(event);
    }
    openHotspotMarkersModal(props) {
        try {
            if ((0,_Pimcore_utils_iframe__WEBPACK_IMPORTED_MODULE_4__.isInIframe)()) {
                const { element: elementApi } = (0,_Pimcore_app_public_api_helpers_api_helper__WEBPACK_IMPORTED_MODULE_3__.getPimcoreStudioApi)();
                elementApi.openHotspotMarkersModal(props);
            } else {
                this.openHotspotMarkersModalDirectly(props);
            }
        } catch (error) {
            console.error('Failed to open hotspot markers modal:', error);
        }
    }
    openHotspotMarkersModalDirectly(props) {
        const event = new _Pimcore_app_public_api_api_gateway__WEBPACK_IMPORTED_MODULE_5__.ApiGatewayEvent(_Pimcore_app_public_api_api_gateway__WEBPACK_IMPORTED_MODULE_5__.ApiGatewayEventType.openHotspotMarkersModal, props);
        window.dispatchEvent(event);
    }
    openVideoModal(props) {
        try {
            if ((0,_Pimcore_utils_iframe__WEBPACK_IMPORTED_MODULE_4__.isInIframe)()) {
                const { element: elementApi } = (0,_Pimcore_app_public_api_helpers_api_helper__WEBPACK_IMPORTED_MODULE_3__.getPimcoreStudioApi)();
                elementApi.openVideoModal(props);
            } else {
                this.openVideoModalDirectly(props);
            }
        } catch (error) {
            console.error('Failed to open video modal:', error);
        }
    }
    openVideoModalDirectly(props) {
        const event = new _Pimcore_app_public_api_api_gateway__WEBPACK_IMPORTED_MODULE_5__.ApiGatewayEvent(_Pimcore_app_public_api_api_gateway__WEBPACK_IMPORTED_MODULE_5__.ApiGatewayEventType.openVideoModal, props);
        window.dispatchEvent(event);
    }
    locateInTree(id, elementType) {
        try {
            const { element: elementApi } = (0,_Pimcore_app_public_api_helpers_api_helper__WEBPACK_IMPORTED_MODULE_3__.getPimcoreStudioApi)();
            if ((0,_Pimcore_utils_iframe__WEBPACK_IMPORTED_MODULE_4__.isInIframe)()) {
                elementApi.locateInTree(id, elementType);
            } else {
                this.locateInTreeDirectly(id, elementType);
            }
        } catch (error) {
            console.error('Failed to locate in tree:', error);
        }
    }
    locateInTreeDirectly(id, elementType) {
        const event = new _Pimcore_app_public_api_api_gateway__WEBPACK_IMPORTED_MODULE_5__.ApiGatewayEvent(_Pimcore_app_public_api_api_gateway__WEBPACK_IMPORTED_MODULE_5__.ApiGatewayEventType.locateInTree, {
            id,
            elementType
        });
        window.dispatchEvent(event);
    }
}
const elementApi = new ElementApiImpl();

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
"./js/src/core/app/public-api/i18n/i18n-api.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  i18nApi: () => (i18nApi)
});
/* ESM import */var _Pimcore_app_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/i18n/index.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 

class I18nApiImpl {
    getTranslationResources() {
        const resources = {};
        // Get all loaded language resources from i18n
        const languages = _Pimcore_app_i18n__WEBPACK_IMPORTED_MODULE_0__["default"].languages ?? [];
        languages.forEach((language)=>{
            const resourceBundle = _Pimcore_app_i18n__WEBPACK_IMPORTED_MODULE_0__["default"].getResourceBundle(language, 'translation');
            if (!(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isNil)(resourceBundle)) {
                resources[language] = resourceBundle;
            }
        });
        return resources;
    }
    getCurrentLanguage() {
        return _Pimcore_app_i18n__WEBPACK_IMPORTED_MODULE_0__["default"].language;
    }
    getFallbackLanguage() {
        const fallbackLng = _Pimcore_app_i18n__WEBPACK_IMPORTED_MODULE_0__["default"].options.fallbackLng;
        return fallbackLng !== '' ? fallbackLng : 'en';
    }
    reportMissingTranslation(key) {
        // Trigger the same missing key handling as the main app
        // This will add the key to the missing translations store and handle debounced API calls
        _Pimcore_app_i18n__WEBPACK_IMPORTED_MODULE_0__["default"].emit('missingKey', [
            _Pimcore_app_i18n__WEBPACK_IMPORTED_MODULE_0__["default"].language
        ], 'translation', key, key);
    }
}
const i18nApi = new I18nApiImpl();

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
"./js/src/core/app/public-api/index.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Pimcore: () => (Pimcore),
  PimcoreStudio: () => (PimcoreStudio)
});
/* ESM import */var _depency_injection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/depency-injection/index.ts");
/* ESM import */var _document_document_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/app/public-api/document/document-api.ts");
/* ESM import */var _i18n_i18n_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/app/public-api/i18n/i18n-api.ts");
/* ESM import */var _element_element_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/app/public-api/element/element-api.ts");
/* ESM import */var _modal_modal_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/app/public-api/modal/modal-api.ts");
/* ESM import */var _settings_settings_api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/app/public-api/settings/settings-api.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 





const Pimcore = {
    container: _depency_injection__WEBPACK_IMPORTED_MODULE_0__.container
};
const PimcoreStudio = {
    document: _document_document_api__WEBPACK_IMPORTED_MODULE_1__.documentApi,
    i18n: _i18n_i18n_api__WEBPACK_IMPORTED_MODULE_2__.i18nApi,
    element: _element_element_api__WEBPACK_IMPORTED_MODULE_3__.elementApi,
    modal: _modal_modal_api__WEBPACK_IMPORTED_MODULE_4__.modalApi,
    settings: _settings_settings_api__WEBPACK_IMPORTED_MODULE_5__.settingsApi
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
"./js/src/core/app/public-api/modal/modal-api.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  modalApi: () => (modalApi)
});
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 
let modalInstance = null;
class ModalApiImpl {
    setModalInstance(modal) {
        modalInstance = modal;
    }
    getModalInstance() {
        if ((0,lodash__WEBPACK_IMPORTED_MODULE_0__.isNull)(modalInstance)) {
            throw new Error('Modal instance not initialized. Make sure App.useApp() is called in the parent window.');
        }
        return modalInstance;
    }
    constructor(){
        this.info = (props)=>{
            return this.getModalInstance().info(props);
        };
        this.success = (props)=>{
            return this.getModalInstance().success(props);
        };
        this.error = (props)=>{
            return this.getModalInstance().error(props);
        };
        this.warning = (props)=>{
            return this.getModalInstance().warning(props);
        };
        this.confirm = (props)=>{
            return this.getModalInstance().confirm(props);
        };
    }
}
const modalApi = new ModalApiImpl();

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
"./js/src/core/app/public-api/settings/settings-api.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SettingsApi: () => (SettingsApi),
  settingsApi: () => (settingsApi)
});
/* ESM import */var _Pimcore_modules_app_settings_settings_slice__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/app/settings/settings-slice.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 
/**
 * Settings API for iframe communication
 * Provides access to system settings from parent window to iframes
 */ class SettingsApi {
    /**
   * Initialize the settings API with the Redux store
   * This should be called during app initialization
   */ initialize(appStore) {
        this.store = appStore;
    }
    /**
   * Get current system settings
   * Returns the settings from the Redux store if available
   */ getSettings() {
        if (this.store === null) {
            console.warn('Settings API not initialized - Redux store not available');
            return null;
        }
        try {
            return (0,_Pimcore_modules_app_settings_settings_slice__WEBPACK_IMPORTED_MODULE_0__.getSettings)(this.store.getState());
        } catch (error) {
            console.error('Failed to get settings from store:', error);
            return null;
        }
    }
    /**
   * Check if settings are available
   */ areSettingsAvailable() {
        return this.store !== null && (0,_Pimcore_modules_app_settings_settings_slice__WEBPACK_IMPORTED_MODULE_0__.getSettings)(this.store.getState()) !== null;
    }
    constructor(){
        this.store = null;
    }
}
const settingsApi = new SettingsApi();

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
"./js/src/core/modules/asset/services/asset-opening-service.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  AssetOpeningService: () => (AssetOpeningService),
  assetOpeningService: () => (assetOpeningService)
});
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/asset/asset-api-slice-enhanced.ts");
/* ESM import */var _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/app/api/pimcore/tags.ts");
/* ESM import */var _Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/element/permissions/permission-helper.ts");
/* ESM import */var _Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/element/element-helper.ts");
/* ESM import */var _Pimcore_modules_widget_manager_utils_tools__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/widget-manager/utils/tools.tsx");
/* ESM import */var _Pimcore_modules_widget_manager_widget_manager_slice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/widget-manager/widget-manager-slice.ts");
/* ESM import */var flexlayout_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("webpack/sharing/consume/default/flexlayout-react/flexlayout-react");
/* ESM import */var flexlayout_react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(flexlayout_react__WEBPACK_IMPORTED_MODULE_7__);
/* ESM import */var _asset_draft_slice__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/asset/asset-draft-slice.tsx");
/* ESM import */var _Pimcore_modules_element_draft_hooks_use_tabs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/element/draft/hooks/use-tabs.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_10__);
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 











/**
 * Asset opening service that handles opening assets in the widget manager
 */ class AssetOpeningService {
    isWidgetOpen(widgetId) {
        var _state_widgetmanager;
        const state = _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.store.getState();
        const innerModel = (_state_widgetmanager = state['widget-manager']) === null || _state_widgetmanager === void 0 ? void 0 : _state_widgetmanager.innerModel;
        if ((0,lodash__WEBPACK_IMPORTED_MODULE_10__.isNil)(innerModel)) return false;
        // Type assertion for the Model.fromJson parameter
        const model = flexlayout_react__WEBPACK_IMPORTED_MODULE_7__.Model.fromJson(innerModel);
        return model.getNodeById(widgetId) !== undefined;
    }
    switchToWidget(widgetId) {
        _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.store.dispatch((0,_Pimcore_modules_widget_manager_widget_manager_slice__WEBPACK_IMPORTED_MODULE_6__.setActiveWidgetById)(widgetId));
    }
    async fetchAndStoreAssetDraft(id) {
        const { data } = await _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.store.dispatch(_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__.api.endpoints.assetGetById.initiate({
            id
        }));
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_10__.isNil)(data)) {
            const mergedAssetData = {
                ...data,
                id,
                modified: false,
                properties: [],
                customMetadata: [],
                customSettings: [],
                schedules: [],
                textData: '',
                imageSettings: {},
                changes: {},
                modifiedCells: {},
                ..._Pimcore_modules_element_draft_hooks_use_tabs__WEBPACK_IMPORTED_MODULE_9__.initialTabsStateValue
            };
            _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.store.dispatch((0,_asset_draft_slice__WEBPACK_IMPORTED_MODULE_8__.assetReceived)(mergedAssetData));
        }
    }
    async openAsset(config) {
        const { id } = config;
        const widgetId = (0,_Pimcore_modules_widget_manager_utils_tools__WEBPACK_IMPORTED_MODULE_5__.getWidgetId)('asset', id);
        // If widget is already open, just switch to it
        if (this.isWidgetOpen(widgetId)) {
            this.switchToWidget(widgetId);
            return;
        }
        // Invalidate cache and fetch fresh data
        _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.store.dispatch(_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__.api.util.invalidateTags(_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_2__.invalidatingTags.ASSET_DETAIL_ID(id)));
        const { data, isError, error } = await _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.store.dispatch(_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__.api.endpoints.assetGetById.initiate({
            id
        }));
        if (isError) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_11__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_11__.ApiError(error));
        }
        if ((0,lodash__WEBPACK_IMPORTED_MODULE_10__.isNil)(data) || !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_3__.checkElementPermission)(data.permissions, 'view')) {
            return;
        }
        // Store draft data for the element editor
        await this.fetchAndStoreAssetDraft(id);
        // Open the widget
        _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.store.dispatch((0,_Pimcore_modules_widget_manager_widget_manager_slice__WEBPACK_IMPORTED_MODULE_6__.openMainWidget)({
            name: data === null || data === void 0 ? void 0 : data.filename,
            id: widgetId,
            component: 'asset-editor',
            config: {
                id,
                elementType: 'asset',
                icon: (0,_Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_4__.getElementIcon)(data, {
                    value: 'widget',
                    type: 'name'
                })
            }
        }));
    }
}
// Create singleton instance
const assetOpeningService = new AssetOpeningService();

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
"./js/src/core/modules/data-object/services/data-object-opening-service.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DataObjectOpeningService: () => (DataObjectOpeningService),
  dataObjectOpeningService: () => (dataObjectOpeningService)
});
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _data_object_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/data-object/data-object-api-slice-enhanced.ts");
/* ESM import */var _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/app/api/pimcore/tags.ts");
/* ESM import */var _Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/element/permissions/permission-helper.ts");
/* ESM import */var _Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/element/element-helper.ts");
/* ESM import */var _Pimcore_modules_widget_manager_utils_tools__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/widget-manager/utils/tools.tsx");
/* ESM import */var _Pimcore_modules_widget_manager_widget_manager_slice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/widget-manager/widget-manager-slice.ts");
/* ESM import */var flexlayout_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("webpack/sharing/consume/default/flexlayout-react/flexlayout-react");
/* ESM import */var flexlayout_react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(flexlayout_react__WEBPACK_IMPORTED_MODULE_7__);
/* ESM import */var _data_object_draft_slice__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/data-object/data-object-draft-slice.tsx");
/* ESM import */var _Pimcore_modules_element_draft_hooks_use_tabs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/element/draft/hooks/use-tabs.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_10__);
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 







// Import draft fetcher functions directly




/**
 * Data object opening service that handles opening data objects in the widget manager
 */ class DataObjectOpeningService {
    isWidgetOpen(widgetId) {
        var _state_widgetmanager;
        const state = _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.store.getState();
        const innerModel = (_state_widgetmanager = state['widget-manager']) === null || _state_widgetmanager === void 0 ? void 0 : _state_widgetmanager.innerModel;
        if ((0,lodash__WEBPACK_IMPORTED_MODULE_10__.isNil)(innerModel)) return false;
        // Type assertion for the Model.fromJson parameter
        const model = flexlayout_react__WEBPACK_IMPORTED_MODULE_7__.Model.fromJson(innerModel);
        return model.getNodeById(widgetId) !== undefined;
    }
    switchToWidget(widgetId) {
        _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.store.dispatch((0,_Pimcore_modules_widget_manager_widget_manager_slice__WEBPACK_IMPORTED_MODULE_6__.setActiveWidgetById)(widgetId));
    }
    async fetchAndStoreDataObjectDraft(id) {
        const { data } = await _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.store.dispatch(_data_object_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__.api.endpoints.dataObjectGetById.initiate({
            id
        }));
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_10__.isNil)(data)) {
            const mergedDataObjectData = {
                draftData: null,
                ...data,
                id,
                modified: false,
                properties: [],
                schedules: [],
                changes: {},
                modifiedCells: {},
                modifiedObjectData: {},
                ..._Pimcore_modules_element_draft_hooks_use_tabs__WEBPACK_IMPORTED_MODULE_9__.initialTabsStateValue
            };
            _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.store.dispatch((0,_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_8__.dataObjectReceived)(mergedDataObjectData));
        }
    }
    async openDataObject(config) {
        const { id } = config;
        const widgetId = (0,_Pimcore_modules_widget_manager_utils_tools__WEBPACK_IMPORTED_MODULE_5__.getWidgetId)('data-object', id);
        if (this.isWidgetOpen(widgetId)) {
            this.switchToWidget(widgetId);
            return;
        }
        _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.store.dispatch(_data_object_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__.api.util.invalidateTags(_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_2__.invalidatingTags.DATA_OBJECT_DETAIL_ID(id)));
        const { data, isError, error } = await _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.store.dispatch(_data_object_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__.api.endpoints.dataObjectGetById.initiate({
            id
        }));
        if (isError) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_11__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_11__.ApiError(error));
        }
        if ((0,lodash__WEBPACK_IMPORTED_MODULE_10__.isNil)(data) || !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_3__.checkElementPermission)(data.permissions, 'view')) {
            return;
        }
        // Store draft data for the element editor
        await this.fetchAndStoreDataObjectDraft(id);
        const icon = (0,_Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_4__.getElementIcon)(data, {
            value: 'widget',
            type: 'name'
        });
        _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.store.dispatch((0,_Pimcore_modules_widget_manager_widget_manager_slice__WEBPACK_IMPORTED_MODULE_6__.openMainWidget)({
            name: data === null || data === void 0 ? void 0 : data.key,
            id: widgetId,
            component: 'data-object-editor',
            config: {
                id,
                elementType: 'data-object',
                icon: {
                    type: icon.type,
                    value: icon.value
                }
            }
        }));
    }
}
// Create singleton instance
const dataObjectOpeningService = new DataObjectOpeningService();

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
"./js/src/core/modules/document/services/document-opening-service.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DocumentOpeningService: () => (DocumentOpeningService),
  documentOpeningService: () => (documentOpeningService)
});
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _document_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/document/document-api-slice-enhanced.ts");
/* ESM import */var _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/app/api/pimcore/tags.ts");
/* ESM import */var _Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/element/permissions/permission-helper.ts");
/* ESM import */var _Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/element/element-helper.ts");
/* ESM import */var _Pimcore_modules_widget_manager_utils_tools__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/widget-manager/utils/tools.tsx");
/* ESM import */var _Pimcore_modules_widget_manager_widget_manager_slice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/widget-manager/widget-manager-slice.ts");
/* ESM import */var flexlayout_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("webpack/sharing/consume/default/flexlayout-react/flexlayout-react");
/* ESM import */var flexlayout_react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(flexlayout_react__WEBPACK_IMPORTED_MODULE_7__);
/* ESM import */var _document_draft_slice__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/document/document-draft-slice.tsx");
/* ESM import */var _Pimcore_modules_element_draft_hooks_use_tabs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/element/draft/hooks/use-tabs.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_10__);
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 







// Import draft fetcher functions directly




/**
 * Document opening service that handles opening documents in the widget manager
 */ class DocumentOpeningService {
    isWidgetOpen(widgetId) {
        var _state_widgetmanager;
        const state = _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.store.getState();
        const innerModel = (_state_widgetmanager = state['widget-manager']) === null || _state_widgetmanager === void 0 ? void 0 : _state_widgetmanager.innerModel;
        if ((0,lodash__WEBPACK_IMPORTED_MODULE_10__.isNil)(innerModel)) return false;
        // Type assertion for the Model.fromJson parameter
        const model = flexlayout_react__WEBPACK_IMPORTED_MODULE_7__.Model.fromJson(innerModel);
        return model.getNodeById(widgetId) !== undefined;
    }
    switchToWidget(widgetId) {
        _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.store.dispatch((0,_Pimcore_modules_widget_manager_widget_manager_slice__WEBPACK_IMPORTED_MODULE_6__.setActiveWidgetById)(widgetId));
    }
    async fetchAndStoreDocumentDraft(id) {
        const { data } = await _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.store.dispatch(_document_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__.api.endpoints.documentGetById.initiate({
            id
        }));
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_10__.isNil)(data)) {
            const mergedDocumentData = {
                ...data,
                id,
                modified: false,
                properties: [],
                schedules: [],
                changes: {},
                modifiedCells: {},
                ..._Pimcore_modules_element_draft_hooks_use_tabs__WEBPACK_IMPORTED_MODULE_9__.initialTabsStateValue
            };
            _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.store.dispatch((0,_document_draft_slice__WEBPACK_IMPORTED_MODULE_8__.documentReceived)(mergedDocumentData));
        }
    }
    async openDocument(config) {
        const { id } = config;
        const widgetId = (0,_Pimcore_modules_widget_manager_utils_tools__WEBPACK_IMPORTED_MODULE_5__.getWidgetId)('document', id);
        if (this.isWidgetOpen(widgetId)) {
            this.switchToWidget(widgetId);
            return;
        }
        _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.store.dispatch(_document_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__.api.util.invalidateTags(_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_2__.invalidatingTags.DOCUMENT_DETAIL_ID(id)));
        const { data, isError, error } = await _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.store.dispatch(_document_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__.api.endpoints.documentGetById.initiate({
            id
        }));
        if (isError) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_11__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_11__.ApiError(error));
        }
        if ((0,lodash__WEBPACK_IMPORTED_MODULE_10__.isNil)(data) || !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_3__.checkElementPermission)(data.permissions, 'view')) {
            return;
        }
        // Store draft data for the element editor
        await this.fetchAndStoreDocumentDraft(id);
        const icon = (0,_Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_4__.getElementIcon)(data, {
            value: 'widget',
            type: 'name'
        });
        _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.store.dispatch((0,_Pimcore_modules_widget_manager_widget_manager_slice__WEBPACK_IMPORTED_MODULE_6__.openMainWidget)({
            name: data === null || data === void 0 ? void 0 : data.key,
            id: widgetId,
            component: 'document-editor',
            config: {
                id,
                elementType: 'document',
                icon: {
                    type: icon.type,
                    value: icon.value
                }
            }
        }));
    }
}
// Create singleton instance
const documentOpeningService = new DocumentOpeningService();

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
"./js/src/core/app/public-api/api-gateway/gateway.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ApiGateway: () => (ApiGateway)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _Pimcore_modules_element_element_selector_provider_element_selector_use_element_selector_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/element/element-selector/provider/element-selector/use-element-selector-helper.tsx");
/* ESM import */var _Pimcore_components_modal_upload_provider_upload_modal_provider_use_upload_modal_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/modal-upload/provider/upload-modal-provider/use-upload-modal-context.tsx");
/* ESM import */var _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_link_provider_use_link_modal_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/provider/use-link-modal-context.tsx");
/* ESM import */var _Pimcore_modules_element_components_crop_modal_provider_use_crop_modal_context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/element/components/crop-modal/provider/use-crop-modal-context.tsx");
/* ESM import */var _Pimcore_modules_element_components_hotspot_markers_modal_provider_use_hotspot_markers_modal_context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/element/components/hotspot-markers-modal/provider/use-hotspot-markers-modal-context.tsx");
/* ESM import */var _Pimcore_modules_element_components_video_modal_provider_use_video_modal_context__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/element/components/video-modal/provider/use-video-modal-context.tsx");
/* ESM import */var _registry_handler_registry__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/app/public-api/api-gateway/registry/handler-registry.ts");
/* ESM import */var _handlers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/app/public-api/api-gateway/handlers/index.ts");
/* ESM import */var _api_gateway_event__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/app/public-api/api-gateway/api-gateway-event.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_10__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ var _s = $RefreshSig$();











/**
 * This component listens for various requests from the public API
 * and dispatches them to appropriate handlers based on the event type.
 */ const ApiGateway = ()=>{
    _s();
    const elementSelectorHelper = (0,_Pimcore_modules_element_element_selector_provider_element_selector_use_element_selector_helper__WEBPACK_IMPORTED_MODULE_1__.useElementSelectorHelper)();
    const uploadModalContext = (0,_Pimcore_components_modal_upload_provider_upload_modal_provider_use_upload_modal_context__WEBPACK_IMPORTED_MODULE_2__.useUploadModalContext)();
    const linkModalContext = (0,_Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_link_provider_use_link_modal_context__WEBPACK_IMPORTED_MODULE_3__.useLinkModalContext)();
    const cropModalContext = (0,_Pimcore_modules_element_components_crop_modal_provider_use_crop_modal_context__WEBPACK_IMPORTED_MODULE_4__.useCropModalContext)();
    const hotspotMarkersModalContext = (0,_Pimcore_modules_element_components_hotspot_markers_modal_provider_use_hotspot_markers_modal_context__WEBPACK_IMPORTED_MODULE_5__.useHotspotMarkersModalContext)();
    const videoModalContext = (0,_Pimcore_modules_element_components_video_modal_provider_use_video_modal_context__WEBPACK_IMPORTED_MODULE_6__.useVideoModalContext)();
    // Initialize handlers on component mount
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        (0,_handlers__WEBPACK_IMPORTED_MODULE_8__.initializeHandlers)();
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        const handleApiEvent = (event)=>{
            // Type guard to ensure this is our custom ApiGatewayEvent
            if (!(event instanceof _api_gateway_event__WEBPACK_IMPORTED_MODULE_9__.ApiGatewayEvent)) {
                console.warn('Received non-ApiGatewayEvent on API gateway listener');
                return;
            }
            // Cast to CustomEvent to access detail with proper typing
            const customEvent = event;
            const { type, payload } = customEvent.detail;
            try {
                const handler = (0,_registry_handler_registry__WEBPACK_IMPORTED_MODULE_7__.getApiGatewayHandler)(type);
                if (!(0,lodash__WEBPACK_IMPORTED_MODULE_10__.isUndefined)(handler)) {
                    handler(payload, {
                        elementSelectorHelper,
                        uploadModalContext,
                        linkModalContext,
                        cropModalContext,
                        hotspotMarkersModalContext,
                        videoModalContext
                    });
                } else {
                    console.warn(`No handler registered for API event type: ${type}`);
                }
            } catch (error) {
                console.error(`Error handling API gateway event of type ${type}:`, error);
            }
        };
        window.addEventListener(_api_gateway_event__WEBPACK_IMPORTED_MODULE_9__.API_GATEWAY_EVENT, handleApiEvent);
        return ()=>{
            window.removeEventListener(_api_gateway_event__WEBPACK_IMPORTED_MODULE_9__.API_GATEWAY_EVENT, handleApiEvent);
        };
    }, [
        elementSelectorHelper,
        uploadModalContext,
        linkModalContext,
        cropModalContext,
        hotspotMarkersModalContext,
        videoModalContext
    ]);
    return null;
};
_s(ApiGateway, "0ZVrLdTOzt240ESEBwlH5uO9ObU=", false, function() {
    return [
        _Pimcore_modules_element_element_selector_provider_element_selector_use_element_selector_helper__WEBPACK_IMPORTED_MODULE_1__.useElementSelectorHelper,
        _Pimcore_components_modal_upload_provider_upload_modal_provider_use_upload_modal_context__WEBPACK_IMPORTED_MODULE_2__.useUploadModalContext,
        _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_link_provider_use_link_modal_context__WEBPACK_IMPORTED_MODULE_3__.useLinkModalContext,
        _Pimcore_modules_element_components_crop_modal_provider_use_crop_modal_context__WEBPACK_IMPORTED_MODULE_4__.useCropModalContext,
        _Pimcore_modules_element_components_hotspot_markers_modal_provider_use_hotspot_markers_modal_context__WEBPACK_IMPORTED_MODULE_5__.useHotspotMarkersModalContext,
        _Pimcore_modules_element_components_video_modal_provider_use_video_modal_context__WEBPACK_IMPORTED_MODULE_6__.useVideoModalContext
    ];
});
_c = ApiGateway;
var _c;
$RefreshReg$(_c, "ApiGateway");

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
//# sourceMappingURL=js_src_core_app_public-api_index_ts.js.map