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
(self["chunk_pimcore_studio_ui_bundle "] = self["chunk_pimcore_studio_ui_bundle "] || []).push([["__federation_expose_modules__data_object"], {
"./js/src/core/app/public-api/api-gateway/api-gateway-event.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  API_GATEWAY_EVENT: () => (API_GATEWAY_EVENT),
  ApiGatewayEvent: () => (ApiGatewayEvent)
});
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/app/public-api/api-gateway/handlers/crop-modal-handler.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  openCropModalHandler: () => (openCropModalHandler)
});
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/app/public-api/api-gateway/handlers/element-selector-handler.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  openElementSelectorHandler: () => (openElementSelectorHandler)
});
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/app/public-api/api-gateway/handlers/hotspot-markers-modal-handler.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  openHotspotMarkersModalHandler: () => (openHotspotMarkersModalHandler)
});
/* import */ var _Pimcore_utils_uuid__rspack_import_0 = __webpack_require__("./js/src/core/utils/uuid.ts");
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
const openHotspotMarkersModalHandler = (payload, context)=>{
    const { hotspotMarkersModalContext } = context;
    const modalId = `iframe-hotspot-modal-${(0,_Pimcore_utils_uuid__rspack_import_0.uuid)()}`;
    hotspotMarkersModalContext.openModal(modalId, payload.imageId, payload.hotspots, payload.crop, payload.options);
};

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/app/public-api/api-gateway/handlers/index.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  initializeHandlers: () => (initializeHandlers),
  locateInTreeHandler: () => (/* reexport safe */ _locate_in_tree_handler__rspack_import_8.locateInTreeHandler),
  openCropModalHandler: () => (/* reexport safe */ _crop_modal_handler__rspack_import_5.openCropModalHandler),
  openElementSelectorHandler: () => (/* reexport safe */ _element_selector_handler__rspack_import_2.openElementSelectorHandler),
  openHotspotMarkersModalHandler: () => (/* reexport safe */ _hotspot_markers_modal_handler__rspack_import_6.openHotspotMarkersModalHandler),
  openLinkModalHandler: () => (/* reexport safe */ _link_modal_handler__rspack_import_4.openLinkModalHandler),
  openUploadModalHandler: () => (/* reexport safe */ _upload_modal_handler__rspack_import_3.openUploadModalHandler),
  openVideoModalHandler: () => (/* reexport safe */ _video_modal_handler__rspack_import_7.openVideoModalHandler)
});
/* import */ var _registry_handler_registry__rspack_import_0 = __webpack_require__("./js/src/core/app/public-api/api-gateway/registry/handler-registry.ts");
/* import */ var _types_event_types__rspack_import_1 = __webpack_require__("./js/src/core/app/public-api/api-gateway/types/event-types.ts");
/* import */ var _element_selector_handler__rspack_import_2 = __webpack_require__("./js/src/core/app/public-api/api-gateway/handlers/element-selector-handler.ts");
/* import */ var _upload_modal_handler__rspack_import_3 = __webpack_require__("./js/src/core/app/public-api/api-gateway/handlers/upload-modal-handler.ts");
/* import */ var _link_modal_handler__rspack_import_4 = __webpack_require__("./js/src/core/app/public-api/api-gateway/handlers/link-modal-handler.ts");
/* import */ var _crop_modal_handler__rspack_import_5 = __webpack_require__("./js/src/core/app/public-api/api-gateway/handlers/crop-modal-handler.ts");
/* import */ var _hotspot_markers_modal_handler__rspack_import_6 = __webpack_require__("./js/src/core/app/public-api/api-gateway/handlers/hotspot-markers-modal-handler.ts");
/* import */ var _video_modal_handler__rspack_import_7 = __webpack_require__("./js/src/core/app/public-api/api-gateway/handlers/video-modal-handler.ts");
/* import */ var _locate_in_tree_handler__rspack_import_8 = __webpack_require__("./js/src/core/app/public-api/api-gateway/handlers/locate-in-tree-handler.ts");
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








const initializeHandlers = ()=>{
    // Register all handlers here
    (0,_registry_handler_registry__rspack_import_0.registerApiGatewayHandler)(_types_event_types__rspack_import_1.ApiGatewayEventType.openElementSelector, _element_selector_handler__rspack_import_2.openElementSelectorHandler);
    (0,_registry_handler_registry__rspack_import_0.registerApiGatewayHandler)(_types_event_types__rspack_import_1.ApiGatewayEventType.openUploadModal, _upload_modal_handler__rspack_import_3.openUploadModalHandler);
    (0,_registry_handler_registry__rspack_import_0.registerApiGatewayHandler)(_types_event_types__rspack_import_1.ApiGatewayEventType.openLinkModal, _link_modal_handler__rspack_import_4.openLinkModalHandler);
    (0,_registry_handler_registry__rspack_import_0.registerApiGatewayHandler)(_types_event_types__rspack_import_1.ApiGatewayEventType.openCropModal, _crop_modal_handler__rspack_import_5.openCropModalHandler);
    (0,_registry_handler_registry__rspack_import_0.registerApiGatewayHandler)(_types_event_types__rspack_import_1.ApiGatewayEventType.openHotspotMarkersModal, _hotspot_markers_modal_handler__rspack_import_6.openHotspotMarkersModalHandler);
    (0,_registry_handler_registry__rspack_import_0.registerApiGatewayHandler)(_types_event_types__rspack_import_1.ApiGatewayEventType.openVideoModal, _video_modal_handler__rspack_import_7.openVideoModalHandler);
    (0,_registry_handler_registry__rspack_import_0.registerApiGatewayHandler)(_types_event_types__rspack_import_1.ApiGatewayEventType.locateInTree, _locate_in_tree_handler__rspack_import_8.locateInTreeHandler);
};
// Export all handlers for potential direct use








function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/app/public-api/api-gateway/handlers/link-modal-handler.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  openLinkModalHandler: () => (openLinkModalHandler)
});
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/app/public-api/api-gateway/handlers/locate-in-tree-handler.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  locateInTreeHandler: () => (locateInTreeHandler)
});
/* import */ var _Pimcore_app_store__rspack_import_0 = __webpack_require__("./js/src/core/app/store/index.ts");
/* import */ var _Pimcore_modules_element_element_api_slice_gen__rspack_import_1 = __webpack_require__("./js/src/core/modules/element/element-api-slice.gen.ts");
/* import */ var _Pimcore_components_element_tree_element_tree_slice__rspack_import_2 = __webpack_require__("./js/src/core/components/element-tree/element-tree-slice.ts");
/* import */ var _Pimcore_modules_perspectives_active_perspective_slice__rspack_import_3 = __webpack_require__("./js/src/core/modules/perspectives/active-perspective-slice.ts");
/* import */ var _Pimcore_modules_widget_manager_widget_manager_slice__rspack_import_4 = __webpack_require__("./js/src/core/modules/widget-manager/widget-manager-slice.ts");
/* import */ var lodash__rspack_import_5 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_5_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_5);
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





const locateInTreeHandler = (payload)=>{
    const { id, elementType } = payload;
    const activePerspective = (0,_Pimcore_modules_perspectives_active_perspective_slice__rspack_import_3.selectActivePerspective)(_Pimcore_app_store__rspack_import_0.store.getState());
    if ((0,lodash__rspack_import_5.isNull)(activePerspective)) {
        console.warn('No active perspective available for locate in tree');
        return;
    }
    _Pimcore_app_store__rspack_import_0.store.dispatch(_Pimcore_modules_element_element_api_slice_gen__rspack_import_1.api.endpoints.elementGetTreeLocation.initiate({
        id,
        elementType,
        perspectiveId: activePerspective.id
    }, {
        forceRefetch: true
    })).then((result)=>{
        if (!(0,lodash__rspack_import_5.isNil)(result.data) && !(0,lodash__rspack_import_5.isNil)(result.data.treeLevelData)) {
            const treeId = String(result.data.widgetId);
            _Pimcore_app_store__rspack_import_0.store.dispatch((0,_Pimcore_modules_widget_manager_widget_manager_slice__rspack_import_4.setActiveWidgetById)(treeId));
            _Pimcore_app_store__rspack_import_0.store.dispatch((0,_Pimcore_components_element_tree_element_tree_slice__rspack_import_2.locateInTree)({
                treeId,
                nodeId: (0,lodash__rspack_import_5.isString)(id) ? id : String(id),
                treeLevelData: result.data.treeLevelData
            }));
        }
    }).catch((error)=>{
        console.error('Error locating element in tree:', error);
    });
};

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/app/public-api/api-gateway/handlers/upload-modal-handler.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  openUploadModalHandler: () => (openUploadModalHandler)
});
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/app/public-api/api-gateway/handlers/video-modal-handler.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  openVideoModalHandler: () => (openVideoModalHandler)
});
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/app/public-api/api-gateway/index.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  API_GATEWAY_EVENT: () => (/* reexport safe */ _api_gateway_event__rspack_import_1.API_GATEWAY_EVENT),
  ApiGateway: () => (/* reexport safe */ _gateway__rspack_import_0.ApiGateway),
  ApiGatewayEvent: () => (/* reexport safe */ _api_gateway_event__rspack_import_1.ApiGatewayEvent),
  ApiGatewayEventType: () => (/* reexport safe */ _types_event_types__rspack_import_2.ApiGatewayEventType),
  getApiGatewayHandler: () => (/* reexport safe */ _registry_handler_registry__rspack_import_3.getApiGatewayHandler),
  initializeHandlers: () => (/* reexport safe */ _handlers__rspack_import_4.initializeHandlers),
  openElementSelectorHandler: () => (/* reexport safe */ _handlers__rspack_import_4.openElementSelectorHandler),
  openUploadModalHandler: () => (/* reexport safe */ _handlers__rspack_import_4.openUploadModalHandler),
  registerApiGatewayHandler: () => (/* reexport safe */ _registry_handler_registry__rspack_import_3.registerApiGatewayHandler)
});
/* import */ var _gateway__rspack_import_0 = __webpack_require__("./js/src/core/app/public-api/api-gateway/gateway.tsx");
/* import */ var _api_gateway_event__rspack_import_1 = __webpack_require__("./js/src/core/app/public-api/api-gateway/api-gateway-event.ts");
/* import */ var _types_event_types__rspack_import_2 = __webpack_require__("./js/src/core/app/public-api/api-gateway/types/event-types.ts");
/* import */ var _registry_handler_registry__rspack_import_3 = __webpack_require__("./js/src/core/app/public-api/api-gateway/registry/handler-registry.ts");
/* import */ var _handlers__rspack_import_4 = __webpack_require__("./js/src/core/app/public-api/api-gateway/handlers/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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


function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/app/public-api/api-gateway/registry/handler-registry.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  getApiGatewayHandler: () => (getApiGatewayHandler),
  registerApiGatewayHandler: () => (registerApiGatewayHandler)
});
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/app/public-api/api-gateway/types/event-types.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ApiGatewayEventType: () => (ApiGatewayEventType)
});
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/app/public-api/element/element-api.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  elementApi: () => (elementApi),
  elementOpeningService: () => (elementOpeningService)
});
/* import */ var _Pimcore_modules_asset_services_asset_opening_service__rspack_import_0 = __webpack_require__("./js/src/core/modules/asset/services/asset-opening-service.ts");
/* import */ var _Pimcore_modules_document_services_document_opening_service__rspack_import_1 = __webpack_require__("./js/src/core/modules/document/services/document-opening-service.ts");
/* import */ var _Pimcore_modules_data_object_services_data_object_opening_service__rspack_import_2 = __webpack_require__("./js/src/core/modules/data-object/services/data-object-opening-service.ts");
/* import */ var _Pimcore_app_public_api_helpers_api_helper__rspack_import_3 = __webpack_require__("./js/src/core/app/public-api/helpers/api-helper.ts");
/* import */ var _Pimcore_utils_iframe__rspack_import_4 = __webpack_require__("./js/src/core/utils/iframe.ts");
/* import */ var _Pimcore_app_public_api_api_gateway__rspack_import_5 = __webpack_require__("./js/src/core/app/public-api/api-gateway/index.ts");
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





class ElementOpeningService {
    async openAsset(config) {
        await _Pimcore_modules_asset_services_asset_opening_service__rspack_import_0.assetOpeningService.openAsset(config);
    }
    async openDocument(config) {
        await _Pimcore_modules_document_services_document_opening_service__rspack_import_1.documentOpeningService.openDocument(config);
    }
    async openDataObject(config) {
        await _Pimcore_modules_data_object_services_data_object_opening_service__rspack_import_2.dataObjectOpeningService.openDataObject(config);
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
            const { element: elementApi } = (0,_Pimcore_app_public_api_helpers_api_helper__rspack_import_3.getPimcoreStudioApi)();
            if ((0,_Pimcore_utils_iframe__rspack_import_4.isInIframe)()) {
                elementApi.openElementSelector(config);
            } else {
                this.openElementSelectorDirectly(config);
            }
        } catch (error) {
            console.error('Failed to open element selector:', error);
        }
    }
    openElementSelectorDirectly(config) {
        const event = new _Pimcore_app_public_api_api_gateway__rspack_import_5.ApiGatewayEvent(_Pimcore_app_public_api_api_gateway__rspack_import_5.ApiGatewayEventType.openElementSelector, config);
        window.dispatchEvent(event);
    }
    openUploadModal(props) {
        try {
            if ((0,_Pimcore_utils_iframe__rspack_import_4.isInIframe)()) {
                const { element: elementApi } = (0,_Pimcore_app_public_api_helpers_api_helper__rspack_import_3.getPimcoreStudioApi)();
                elementApi.openUploadModal(props);
            } else {
                this.openUploadModalDirectly(props);
            }
        } catch (error) {
            console.error('Failed to open upload modal:', error);
        }
    }
    openUploadModalDirectly(props) {
        const event = new _Pimcore_app_public_api_api_gateway__rspack_import_5.ApiGatewayEvent(_Pimcore_app_public_api_api_gateway__rspack_import_5.ApiGatewayEventType.openUploadModal, props);
        window.dispatchEvent(event);
    }
    openLinkModal(props) {
        try {
            if ((0,_Pimcore_utils_iframe__rspack_import_4.isInIframe)()) {
                const { element: elementApi } = (0,_Pimcore_app_public_api_helpers_api_helper__rspack_import_3.getPimcoreStudioApi)();
                elementApi.openLinkModal(props);
            } else {
                this.openLinkModalDirectly(props);
            }
        } catch (error) {
            console.error('Failed to open link modal:', error);
        }
    }
    openLinkModalDirectly(props) {
        const event = new _Pimcore_app_public_api_api_gateway__rspack_import_5.ApiGatewayEvent(_Pimcore_app_public_api_api_gateway__rspack_import_5.ApiGatewayEventType.openLinkModal, props);
        window.dispatchEvent(event);
    }
    openCropModal(props) {
        try {
            if ((0,_Pimcore_utils_iframe__rspack_import_4.isInIframe)()) {
                const { element: elementApi } = (0,_Pimcore_app_public_api_helpers_api_helper__rspack_import_3.getPimcoreStudioApi)();
                elementApi.openCropModal(props);
            } else {
                this.openCropModalDirectly(props);
            }
        } catch (error) {
            console.error('Failed to open crop modal:', error);
        }
    }
    openCropModalDirectly(props) {
        const event = new _Pimcore_app_public_api_api_gateway__rspack_import_5.ApiGatewayEvent(_Pimcore_app_public_api_api_gateway__rspack_import_5.ApiGatewayEventType.openCropModal, props);
        window.dispatchEvent(event);
    }
    openHotspotMarkersModal(props) {
        try {
            if ((0,_Pimcore_utils_iframe__rspack_import_4.isInIframe)()) {
                const { element: elementApi } = (0,_Pimcore_app_public_api_helpers_api_helper__rspack_import_3.getPimcoreStudioApi)();
                elementApi.openHotspotMarkersModal(props);
            } else {
                this.openHotspotMarkersModalDirectly(props);
            }
        } catch (error) {
            console.error('Failed to open hotspot markers modal:', error);
        }
    }
    openHotspotMarkersModalDirectly(props) {
        const event = new _Pimcore_app_public_api_api_gateway__rspack_import_5.ApiGatewayEvent(_Pimcore_app_public_api_api_gateway__rspack_import_5.ApiGatewayEventType.openHotspotMarkersModal, props);
        window.dispatchEvent(event);
    }
    openVideoModal(props) {
        try {
            if ((0,_Pimcore_utils_iframe__rspack_import_4.isInIframe)()) {
                const { element: elementApi } = (0,_Pimcore_app_public_api_helpers_api_helper__rspack_import_3.getPimcoreStudioApi)();
                elementApi.openVideoModal(props);
            } else {
                this.openVideoModalDirectly(props);
            }
        } catch (error) {
            console.error('Failed to open video modal:', error);
        }
    }
    openVideoModalDirectly(props) {
        const event = new _Pimcore_app_public_api_api_gateway__rspack_import_5.ApiGatewayEvent(_Pimcore_app_public_api_api_gateway__rspack_import_5.ApiGatewayEventType.openVideoModal, props);
        window.dispatchEvent(event);
    }
    locateInTree(id, elementType) {
        try {
            const { element: elementApi } = (0,_Pimcore_app_public_api_helpers_api_helper__rspack_import_3.getPimcoreStudioApi)();
            if ((0,_Pimcore_utils_iframe__rspack_import_4.isInIframe)()) {
                elementApi.locateInTree(id, elementType);
            } else {
                this.locateInTreeDirectly(id, elementType);
            }
        } catch (error) {
            console.error('Failed to locate in tree:', error);
        }
    }
    locateInTreeDirectly(id, elementType) {
        const event = new _Pimcore_app_public_api_api_gateway__rspack_import_5.ApiGatewayEvent(_Pimcore_app_public_api_api_gateway__rspack_import_5.ApiGatewayEventType.locateInTree, {
            id,
            elementType
        });
        window.dispatchEvent(event);
    }
}
const elementApi = new ElementApiImpl();

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/asset/services/asset-opening-service.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  AssetOpeningService: () => (AssetOpeningService),
  assetOpeningService: () => (assetOpeningService)
});
/* import */ var _Pimcore_app_store__rspack_import_0 = __webpack_require__("./js/src/core/app/store/index.ts");
/* import */ var _asset_api_slice_enhanced__rspack_import_1 = __webpack_require__("./js/src/core/modules/asset/asset-api-slice-enhanced.ts");
/* import */ var _Pimcore_modules_element_permissions_permission_helper__rspack_import_2 = __webpack_require__("./js/src/core/modules/element/permissions/permission-helper.ts");
/* import */ var _Pimcore_modules_element_element_helper__rspack_import_3 = __webpack_require__("./js/src/core/modules/element/element-helper.ts");
/* import */ var _Pimcore_modules_widget_manager_utils_tools__rspack_import_4 = __webpack_require__("./js/src/core/modules/widget-manager/utils/tools.tsx");
/* import */ var _Pimcore_modules_widget_manager_widget_manager_slice__rspack_import_5 = __webpack_require__("./js/src/core/modules/widget-manager/widget-manager-slice.ts");
/* import */ var flexlayout_react__rspack_import_6 = __webpack_require__("webpack/sharing/consume/default/flexlayout-react/flexlayout-react");
/* import */ var flexlayout_react__rspack_import_6_default = /*#__PURE__*/__webpack_require__.n(flexlayout_react__rspack_import_6);
/* import */ var _asset_draft_slice__rspack_import_7 = __webpack_require__("./js/src/core/modules/asset/asset-draft-slice.tsx");
/* import */ var _Pimcore_modules_element_draft_hooks_use_tabs__rspack_import_8 = __webpack_require__("./js/src/core/modules/element/draft/hooks/use-tabs.ts");
/* import */ var lodash__rspack_import_9 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_9_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_9);
/* import */ var _Pimcore_modules_app_error_handler__rspack_import_10 = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
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










/**
 * Asset opening service that handles opening assets in the widget manager
 */ class AssetOpeningService {
    isWidgetOpen(widgetId) {
        var _state_widgetmanager;
        const state = _Pimcore_app_store__rspack_import_0.store.getState();
        const innerModel = (_state_widgetmanager = state['widget-manager']) === null || _state_widgetmanager === void 0 ? void 0 : _state_widgetmanager.innerModel;
        if ((0,lodash__rspack_import_9.isNil)(innerModel)) return false;
        // Type assertion for the Model.fromJson parameter
        const model = flexlayout_react__rspack_import_6.Model.fromJson(innerModel);
        return model.getNodeById(widgetId) !== undefined;
    }
    switchToWidget(widgetId) {
        _Pimcore_app_store__rspack_import_0.store.dispatch((0,_Pimcore_modules_widget_manager_widget_manager_slice__rspack_import_5.setActiveWidgetById)(widgetId));
    }
    async fetchAndStoreAssetDraft(id) {
        const { data } = await _Pimcore_app_store__rspack_import_0.store.dispatch(_asset_api_slice_enhanced__rspack_import_1.api.endpoints.assetGetById.initiate({
            id
        }));
        if (!(0,lodash__rspack_import_9.isNil)(data)) {
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
                ..._Pimcore_modules_element_draft_hooks_use_tabs__rspack_import_8.initialTabsStateValue
            };
            _Pimcore_app_store__rspack_import_0.store.dispatch((0,_asset_draft_slice__rspack_import_7.assetReceived)(mergedAssetData));
        }
    }
    async getWidgetConfig(id) {
        let silent = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
        const { data, isError, error } = await _Pimcore_app_store__rspack_import_0.store.dispatch(_asset_api_slice_enhanced__rspack_import_1.api.endpoints.assetGetById.initiate({
            id
        }));
        if (isError && !silent) {
            (0,_Pimcore_modules_app_error_handler__rspack_import_10["default"])(new _Pimcore_modules_app_error_handler__rspack_import_10.ApiError(error));
        }
        if ((0,lodash__rspack_import_9.isNil)(data) || !(0,_Pimcore_modules_element_permissions_permission_helper__rspack_import_2.checkElementPermission)(data.permissions, 'view')) {
            return;
        }
        // Store draft data for the element editor
        await this.fetchAndStoreAssetDraft(id);
        const widgetId = (0,_Pimcore_modules_widget_manager_utils_tools__rspack_import_4.getWidgetId)('asset', id);
        return {
            name: data === null || data === void 0 ? void 0 : data.filename,
            id: widgetId,
            component: 'asset-editor',
            config: {
                id,
                elementType: 'asset',
                icon: (0,_Pimcore_modules_element_element_helper__rspack_import_3.getElementIcon)(data, {
                    value: 'widget',
                    type: 'name'
                }),
                iconColorGroup: 'element'
            }
        };
    }
    async openAsset(config) {
        const { id } = config;
        const widgetId = (0,_Pimcore_modules_widget_manager_utils_tools__rspack_import_4.getWidgetId)('asset', id);
        if (this.isWidgetOpen(widgetId)) {
            this.switchToWidget(widgetId);
            return;
        }
        const widgetConfig = await this.getWidgetConfig(id);
        if (!(0,lodash__rspack_import_9.isNil)(widgetConfig)) {
            _Pimcore_app_store__rspack_import_0.store.dispatch((0,_Pimcore_modules_widget_manager_widget_manager_slice__rspack_import_5.openMainWidget)(widgetConfig));
        }
    }
}
// Create singleton instance
const assetOpeningService = new AssetOpeningService();

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/auth/util/user-helper.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  getCurrentUser: () => (getCurrentUser)
});
/* import */ var _Pimcore_app_store__rspack_import_0 = __webpack_require__("./js/src/core/app/store/index.ts");
/* import */ var _user_user_slice__rspack_import_1 = __webpack_require__("./js/src/core/modules/auth/user/user-slice.ts");
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

const getCurrentUser = ()=>{
    const user = (0,_user_user_slice__rspack_import_1.selectCurrentUser)(_Pimcore_app_store__rspack_import_0.store.getState());
    if (user.id === 0) {
        console.warn('getCurrentUser() returned the system user (id 0). This usually means it was ' + 'called before the current user was loaded, e.g. during a module\'s onInit(). ' + 'Read the user inside a component instead, for example via the useUser() hook.');
    }
    return user;
};

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/data-object/editor/types/folder/tab-manager/folder-tab-manager.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  FolderTabManager: () => (FolderTabManager)
});
/* import */ var _swc_helpers_ts_decorate__rspack_import_2 = __webpack_require__("./node_modules/tslib/tslib.es6.mjs");
/* import */ var _Pimcore_modules_element_editor_tab_manager_tab_manager__rspack_import_0 = __webpack_require__("./js/src/core/modules/element/editor/tab-manager/tab-manager.ts");
/* import */ var inversify__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* import */ var inversify__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(inversify__rspack_import_1);
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

class FolderTabManager extends _Pimcore_modules_element_editor_tab_manager_tab_manager__rspack_import_0.TabManager {
    constructor(){
        super();
        this.type = 'folder';
    }
}
FolderTabManager = (0,_swc_helpers_ts_decorate__rspack_import_2.__decorate)([
    (0,inversify__rspack_import_1.injectable)(),
    (0,_swc_helpers_ts_decorate__rspack_import_2.__metadata)("design:type", Function),
    (0,_swc_helpers_ts_decorate__rspack_import_2.__metadata)("design:paramtypes", [])
], FolderTabManager);

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/data-object/editor/types/object/tab-manager/object-tab-manager.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ObjectTabManager: () => (ObjectTabManager)
});
/* import */ var _swc_helpers_ts_decorate__rspack_import_2 = __webpack_require__("./node_modules/tslib/tslib.es6.mjs");
/* import */ var _Pimcore_modules_element_editor_tab_manager_tab_manager__rspack_import_0 = __webpack_require__("./js/src/core/modules/element/editor/tab-manager/tab-manager.ts");
/* import */ var inversify__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* import */ var inversify__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(inversify__rspack_import_1);
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

class ObjectTabManager extends _Pimcore_modules_element_editor_tab_manager_tab_manager__rspack_import_0.TabManager {
    constructor(){
        super();
        this.type = 'object';
    }
}
ObjectTabManager = (0,_swc_helpers_ts_decorate__rspack_import_2.__decorate)([
    (0,inversify__rspack_import_1.injectable)(),
    (0,_swc_helpers_ts_decorate__rspack_import_2.__metadata)("design:type", Function),
    (0,_swc_helpers_ts_decorate__rspack_import_2.__metadata)("design:paramtypes", [])
], ObjectTabManager);

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/data-object/events/post-update-event.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
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

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/data-object/hooks/use-custom-layouts.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useCustomLayouts: () => (useCustomLayouts)
});
/* import */ var _Pimcore_modules_data_object_hooks_use_data_object_draft__rspack_import_0 = __webpack_require__("./js/src/core/modules/data-object/hooks/use-data-object-draft.ts");
/* import */ var _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_1 = __webpack_require__("./js/src/core/modules/class-definition/class-definition-slice-enhanced.ts");
/* import */ var _Pimcore_modules_app_error_handler__rspack_import_2 = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* import */ var lodash__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_3);
/* import */ var _Pimcore_modules_element_editor_shared_tab_manager_tabs_workflow_workflow_api_slice_enhanced__rspack_import_4 = __webpack_require__("./js/src/core/modules/element/editor/shared-tab-manager/tabs/workflow/workflow-api-slice-enhanced.ts");
/* import */ var _Pimcore_modules_element_utils_workflow_availability__rspack_import_5 = __webpack_require__("./js/src/core/modules/element/utils/workflow-availability.ts");
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





const useCustomLayouts = (id)=>{
    const { dataObject, isLoading: isDraftLoading } = (0,_Pimcore_modules_data_object_hooks_use_data_object_draft__rspack_import_0.useDataObjectDraft)(id);
    const { data, error, isLoading: isCustomLayoutLoading } = (0,_Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_1.useClassCustomLayoutEditorCollectionQuery)({
        objectId: id
    }, {
        skip: dataObject === undefined || dataObject.type === 'folder'
    });
    if (error !== undefined) {
        (0,_Pimcore_modules_app_error_handler__rspack_import_2["default"])(new _Pimcore_modules_app_error_handler__rspack_import_2.ApiError(error));
    }
    const layouts = data !== undefined ? data.items : undefined;
    const hasWorkflowAvailable = (0,_Pimcore_modules_element_utils_workflow_availability__rspack_import_5.isWorkflowAvailable)(dataObject, 'data-object');
    const { data: workflowDetailsData, isLoading: isLoadingWorkflowDetails } = (0,_Pimcore_modules_element_editor_shared_tab_manager_tabs_workflow_workflow_api_slice_enhanced__rspack_import_4.useWorkflowGetDetailsQuery)({
        elementType: 'data-object',
        elementId: id
    }, {
        skip: !hasWorkflowAvailable
    });
    const getDefaultLayoutId = (currentLayout)=>{
        if ((0,lodash__rspack_import_3.isUndefined)(layouts)) {
            return null;
        }
        const defaultLayout = layouts.find((layout)=>layout.default) ?? layouts.find((layout)=>layout.id === currentLayout) ?? layouts.find((layout)=>layout.id === (workflowDetailsData === null || workflowDetailsData === void 0 ? void 0 : workflowDetailsData.layoutId)) ?? layouts.find((layout)=>layout.id === '0') ?? layouts[0] ?? null;
        return (defaultLayout === null || defaultLayout === void 0 ? void 0 : defaultLayout.id) ?? null;
    };
    const isLoading = isDraftLoading || isLoadingWorkflowDetails || isCustomLayoutLoading && (dataObject === null || dataObject === void 0 ? void 0 : dataObject.type) !== 'folder';
    return {
        layouts,
        getDefaultLayoutId,
        isLoading
    };
};

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/data-object/listing/builder/object-listing-builder.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ObjectListingBuilder: () => (ObjectListingBuilder)
});
/* import */ var _sdk_modules_element__rspack_import_0 = __webpack_require__("./js/src/sdk/modules/element/index.ts");
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
class ObjectListingBuilder extends _sdk_modules_element__rspack_import_0.ListingBuilder {
}

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/data-object/listing/data-layer/hooks/use-data-query-helper.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useDataQueryHelper: () => (useDataQueryHelper)
});
/* import */ var _Pimcore_modules_element_listing_abstract_configuration_layer_provider_selected_columns_use_selected_columns__rspack_import_0 = __webpack_require__("./js/src/core/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns.tsx");
/* import */ var _Pimcore_modules_element_listing_abstract_settings_use_settings__rspack_import_1 = __webpack_require__("./js/src/core/modules/element/listing/abstract/settings/use-settings.ts");
/* import */ var _decorator_class_definition_selection_context_layer_provider_use_class_definition_selection__rspack_import_2 = __webpack_require__("./js/src/core/modules/data-object/listing/decorator/class-definition-selection/context-layer/provider/use-class-definition-selection.tsx");
/* import */ var _Pimcore_modules_element_listing_abstract_data_layer_provider_data_use_data__rspack_import_3 = __webpack_require__("./js/src/core/modules/element/listing/abstract/data-layer/provider/data/use-data.tsx");
/* import */ var _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_available_columns_use_available_columns__rspack_import_4 = __webpack_require__("./js/src/core/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/use-available-columns.tsx");
/* import */ var _Pimcore_components_language_selection__rspack_import_5 = __webpack_require__("./js/src/core/components/language-selection/index.ts");
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





const useDataQueryHelper = ()=>{
    const { useElementId } = (0,_Pimcore_modules_element_listing_abstract_settings_use_settings__rspack_import_1.useSettings)();
    const { getId } = useElementId();
    const { selectedColumns } = (0,_Pimcore_modules_element_listing_abstract_configuration_layer_provider_selected_columns_use_selected_columns__rspack_import_0.useSelectedColumns)();
    const { availableColumns } = (0,_Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_available_columns_use_available_columns__rspack_import_4.useAvailableColumns)();
    const { selectedClassDefinition } = (0,_decorator_class_definition_selection_context_layer_provider_use_class_definition_selection__rspack_import_2.useClassDefinitionSelection)();
    const { dataLoadingState, setDataLoadingState } = (0,_Pimcore_modules_element_listing_abstract_data_layer_provider_data_use_data__rspack_import_3.useData)();
    const { currentLanguage } = (0,_Pimcore_components_language_selection__rspack_import_5.useLanguageSelection)();
    const columnsArg = [];
    selectedColumns.forEach((column)=>{
        let advancedColumnConfig;
        if (column.type === 'dataobject.advanced') {
            var _column_originalApiDefinition___meta, _column_originalApiDefinition;
            advancedColumnConfig = (_column_originalApiDefinition = column.originalApiDefinition) === null || _column_originalApiDefinition === void 0 ? void 0 : (_column_originalApiDefinition___meta = _column_originalApiDefinition.__meta) === null || _column_originalApiDefinition___meta === void 0 ? void 0 : _column_originalApiDefinition___meta.advancedColumnConfig;
        }
        columnsArg.push({
            key: column.key,
            type: column.type,
            locale: column.localizable ? (column.locale ?? currentLanguage) === 'default' ? null : column.locale ?? currentLanguage : undefined,
            group: column.group,
            config: advancedColumnConfig ?? column.config
        });
    });
    const systemColumns = availableColumns.filter((column)=>Array.isArray(column.group) && column.group.includes('system'));
    systemColumns.forEach((column)=>{
        const hasColumn = columnsArg.some((selectedColumn)=>selectedColumn.key === column.key);
        if (!hasColumn) {
            columnsArg.push({
                key: column.key,
                type: column.type,
                locale: column.locale,
                group: column.group,
                config: []
            });
        }
    });
    const getArgs = ()=>{
        if (selectedClassDefinition === undefined) {
            throw new Error('No class definition selected');
        }
        return {
            classId: selectedClassDefinition.id,
            body: {
                folderId: getId(),
                columns: columnsArg,
                filters: {
                    includeDescendants: true,
                    page: 1,
                    pageSize: 20
                }
            }
        };
    };
    const hasRequiredArgs = ()=>{
        const args = getArgs();
        return args.body.folderId !== undefined || selectedClassDefinition !== undefined;
    };
    return {
        getArgs,
        hasRequiredArgs,
        dataLoadingState,
        setDataLoadingState
    };
};

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/data-object/listing/decorator/action-column/action-column-decorator.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ActionColumnDecorator: () => (ActionColumnDecorator)
});
/* import */ var _view_layer_components_grid_hooks_with_action_column_configuration__rspack_import_0 = __webpack_require__("./js/src/core/modules/data-object/listing/decorator/action-column/view-layer/components/grid/hooks/with-action-column-configuration.tsx");
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
const ActionColumnDecorator = (props)=>{
    const { useGridOptions, ...defaultProps } = props;
    const newProps = {
        ...defaultProps,
        useGridOptions: (0,_view_layer_components_grid_hooks_with_action_column_configuration__rspack_import_0.withActionColumnConfiguration)(useGridOptions)
    };
    return newProps;
};

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/data-object/services/data-object-opening-service.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DataObjectOpeningService: () => (DataObjectOpeningService),
  dataObjectOpeningService: () => (dataObjectOpeningService)
});
/* import */ var _Pimcore_app_store__rspack_import_0 = __webpack_require__("./js/src/core/app/store/index.ts");
/* import */ var _data_object_api_slice_enhanced__rspack_import_1 = __webpack_require__("./js/src/core/modules/data-object/data-object-api-slice-enhanced.ts");
/* import */ var _Pimcore_app_api_pimcore_tags__rspack_import_2 = __webpack_require__("./js/src/core/app/api/pimcore/tags.ts");
/* import */ var _Pimcore_modules_element_permissions_permission_helper__rspack_import_3 = __webpack_require__("./js/src/core/modules/element/permissions/permission-helper.ts");
/* import */ var _Pimcore_modules_element_element_helper__rspack_import_4 = __webpack_require__("./js/src/core/modules/element/element-helper.ts");
/* import */ var _Pimcore_modules_widget_manager_utils_tools__rspack_import_5 = __webpack_require__("./js/src/core/modules/widget-manager/utils/tools.tsx");
/* import */ var _Pimcore_modules_widget_manager_widget_manager_slice__rspack_import_6 = __webpack_require__("./js/src/core/modules/widget-manager/widget-manager-slice.ts");
/* import */ var flexlayout_react__rspack_import_7 = __webpack_require__("webpack/sharing/consume/default/flexlayout-react/flexlayout-react");
/* import */ var flexlayout_react__rspack_import_7_default = /*#__PURE__*/__webpack_require__.n(flexlayout_react__rspack_import_7);
/* import */ var _data_object_draft_slice__rspack_import_8 = __webpack_require__("./js/src/core/modules/data-object/data-object-draft-slice.tsx");
/* import */ var _Pimcore_modules_element_draft_hooks_use_tabs__rspack_import_9 = __webpack_require__("./js/src/core/modules/element/draft/hooks/use-tabs.ts");
/* import */ var lodash__rspack_import_10 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_10_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_10);
/* import */ var _Pimcore_modules_app_error_handler__rspack_import_11 = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
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







// Import draft fetcher functions directly




/**
 * Data object opening service that handles opening data objects in the widget manager
 */ class DataObjectOpeningService {
    isWidgetOpen(widgetId) {
        var _state_widgetmanager;
        const state = _Pimcore_app_store__rspack_import_0.store.getState();
        const innerModel = (_state_widgetmanager = state['widget-manager']) === null || _state_widgetmanager === void 0 ? void 0 : _state_widgetmanager.innerModel;
        if ((0,lodash__rspack_import_10.isNil)(innerModel)) return false;
        // Type assertion for the Model.fromJson parameter
        const model = flexlayout_react__rspack_import_7.Model.fromJson(innerModel);
        return model.getNodeById(widgetId) !== undefined;
    }
    switchToWidget(widgetId) {
        _Pimcore_app_store__rspack_import_0.store.dispatch((0,_Pimcore_modules_widget_manager_widget_manager_slice__rspack_import_6.setActiveWidgetById)(widgetId));
    }
    async fetchAndStoreDataObjectDraft(id) {
        const { data } = await _Pimcore_app_store__rspack_import_0.store.dispatch(_data_object_api_slice_enhanced__rspack_import_1.api.endpoints.dataObjectGetById.initiate({
            id
        }));
        if (!(0,lodash__rspack_import_10.isNil)(data)) {
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
                ..._Pimcore_modules_element_draft_hooks_use_tabs__rspack_import_9.initialTabsStateValue
            };
            _Pimcore_app_store__rspack_import_0.store.dispatch((0,_data_object_draft_slice__rspack_import_8.dataObjectReceived)(mergedDataObjectData));
        }
    }
    async getWidgetConfig(id) {
        let silent = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
        _Pimcore_app_store__rspack_import_0.store.dispatch(_data_object_api_slice_enhanced__rspack_import_1.api.util.invalidateTags(_Pimcore_app_api_pimcore_tags__rspack_import_2.invalidatingTags.DATA_OBJECT_DETAIL_ID(id)));
        const { data, isError, error } = await _Pimcore_app_store__rspack_import_0.store.dispatch(_data_object_api_slice_enhanced__rspack_import_1.api.endpoints.dataObjectGetById.initiate({
            id
        }));
        if (isError && !silent) {
            (0,_Pimcore_modules_app_error_handler__rspack_import_11["default"])(new _Pimcore_modules_app_error_handler__rspack_import_11.ApiError(error));
        }
        if ((0,lodash__rspack_import_10.isNil)(data) || !(0,_Pimcore_modules_element_permissions_permission_helper__rspack_import_3.checkElementPermission)(data.permissions, 'view')) {
            return undefined;
        }
        // Store draft data for the element editor
        await this.fetchAndStoreDataObjectDraft(id);
        const icon = (0,_Pimcore_modules_element_element_helper__rspack_import_4.getElementIcon)(data, {
            value: 'widget',
            type: 'name'
        });
        const widgetId = (0,_Pimcore_modules_widget_manager_utils_tools__rspack_import_5.getWidgetId)('data-object', id);
        return {
            name: data === null || data === void 0 ? void 0 : data.key,
            id: widgetId,
            component: 'data-object-editor',
            config: {
                id,
                elementType: 'data-object',
                icon,
                iconColorGroup: 'element'
            }
        };
    }
    async openDataObject(config) {
        const { id } = config;
        const widgetId = (0,_Pimcore_modules_widget_manager_utils_tools__rspack_import_5.getWidgetId)('data-object', id);
        if (this.isWidgetOpen(widgetId)) {
            this.switchToWidget(widgetId);
            return;
        }
        const widgetConfig = await this.getWidgetConfig(id);
        if (!(0,lodash__rspack_import_10.isNil)(widgetConfig)) {
            _Pimcore_app_store__rspack_import_0.store.dispatch((0,_Pimcore_modules_widget_manager_widget_manager_slice__rspack_import_6.openMainWidget)(widgetConfig));
        }
    }
}
// Create singleton instance
const dataObjectOpeningService = new DataObjectOpeningService();

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/data-object/tree/utils/transform-api-data-to-node.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  transformApiDataToNode: () => (transformApiDataToNode),
  transformApiDataToNodes: () => (transformApiDataToNodes)
});
/* import */ var _Pimcore_modules_element_element_helper__rspack_import_0 = __webpack_require__("./js/src/core/modules/element/element-helper.ts");
/* import */ var _Pimcore_types_enums_element_element_type__rspack_import_1 = __webpack_require__("./js/src/core/types/enums/element/element-type.tsx");
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

const transformApiDataToNode = (dataObjectNode, node)=>{
    return {
        id: dataObjectNode.id.toString(),
        elementType: _Pimcore_types_enums_element_element_type__rspack_import_1.elementTypes.dataObject,
        icon: (0,_Pimcore_modules_element_element_helper__rspack_import_0.getElementIcon)(dataObjectNode, {
            type: 'name',
            value: 'data-object'
        }),
        label: dataObjectNode.key,
        type: dataObjectNode.type,
        parentId: dataObjectNode.parentId.toString(),
        fullPath: dataObjectNode.fullPath,
        hasChildren: dataObjectNode.hasChildren,
        locked: dataObjectNode.locked,
        isLocked: dataObjectNode.isLocked,
        isPublished: dataObjectNode.published,
        metaData: {
            dataObject: dataObjectNode
        },
        permissions: dataObjectNode.permissions ?? [],
        internalKey: `${node.internalKey}-${dataObjectNode.id}`
    };
};
const transformApiDataToNodes = (node, data, maxItemsPerNode)=>{
    const nodes = [];
    const dataObjectData = data.items;
    dataObjectData.forEach((dataObjectNode)=>{
        nodes.push(transformApiDataToNode(dataObjectNode, node));
    });
    const total = data.totalItems ?? maxItemsPerNode;
    return {
        nodes,
        total
    };
};

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/document/services/document-opening-service.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DocumentOpeningService: () => (DocumentOpeningService),
  documentOpeningService: () => (documentOpeningService)
});
/* import */ var _Pimcore_app_store__rspack_import_0 = __webpack_require__("./js/src/core/app/store/index.ts");
/* import */ var _document_api_slice_enhanced__rspack_import_1 = __webpack_require__("./js/src/core/modules/document/document-api-slice-enhanced.ts");
/* import */ var _Pimcore_app_api_pimcore_tags__rspack_import_2 = __webpack_require__("./js/src/core/app/api/pimcore/tags.ts");
/* import */ var _Pimcore_modules_element_permissions_permission_helper__rspack_import_3 = __webpack_require__("./js/src/core/modules/element/permissions/permission-helper.ts");
/* import */ var _Pimcore_modules_element_element_helper__rspack_import_4 = __webpack_require__("./js/src/core/modules/element/element-helper.ts");
/* import */ var _Pimcore_modules_widget_manager_utils_tools__rspack_import_5 = __webpack_require__("./js/src/core/modules/widget-manager/utils/tools.tsx");
/* import */ var _Pimcore_modules_widget_manager_widget_manager_slice__rspack_import_6 = __webpack_require__("./js/src/core/modules/widget-manager/widget-manager-slice.ts");
/* import */ var flexlayout_react__rspack_import_7 = __webpack_require__("webpack/sharing/consume/default/flexlayout-react/flexlayout-react");
/* import */ var flexlayout_react__rspack_import_7_default = /*#__PURE__*/__webpack_require__.n(flexlayout_react__rspack_import_7);
/* import */ var _document_draft_slice__rspack_import_8 = __webpack_require__("./js/src/core/modules/document/document-draft-slice.tsx");
/* import */ var _Pimcore_modules_element_draft_hooks_use_tabs__rspack_import_9 = __webpack_require__("./js/src/core/modules/element/draft/hooks/use-tabs.ts");
/* import */ var lodash__rspack_import_10 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_10_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_10);
/* import */ var _Pimcore_modules_app_error_handler__rspack_import_11 = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
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







// Import draft fetcher functions directly




/**
 * Document opening service that handles opening documents in the widget manager
 */ class DocumentOpeningService {
    isWidgetOpen(widgetId) {
        var _state_widgetmanager;
        const state = _Pimcore_app_store__rspack_import_0.store.getState();
        const innerModel = (_state_widgetmanager = state['widget-manager']) === null || _state_widgetmanager === void 0 ? void 0 : _state_widgetmanager.innerModel;
        if ((0,lodash__rspack_import_10.isNil)(innerModel)) return false;
        // Type assertion for the Model.fromJson parameter
        const model = flexlayout_react__rspack_import_7.Model.fromJson(innerModel);
        return model.getNodeById(widgetId) !== undefined;
    }
    switchToWidget(widgetId) {
        _Pimcore_app_store__rspack_import_0.store.dispatch((0,_Pimcore_modules_widget_manager_widget_manager_slice__rspack_import_6.setActiveWidgetById)(widgetId));
    }
    async fetchAndStoreDocumentDraft(id) {
        const { data } = await _Pimcore_app_store__rspack_import_0.store.dispatch(_document_api_slice_enhanced__rspack_import_1.api.endpoints.documentGetById.initiate({
            id
        }));
        if (!(0,lodash__rspack_import_10.isNil)(data)) {
            const mergedDocumentData = {
                ...data,
                id,
                modified: false,
                properties: [],
                schedules: [],
                changes: {},
                modifiedCells: {},
                ..._Pimcore_modules_element_draft_hooks_use_tabs__rspack_import_9.initialTabsStateValue
            };
            _Pimcore_app_store__rspack_import_0.store.dispatch((0,_document_draft_slice__rspack_import_8.documentReceived)(mergedDocumentData));
        }
    }
    async getWidgetConfig(id) {
        let silent = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
        _Pimcore_app_store__rspack_import_0.store.dispatch(_document_api_slice_enhanced__rspack_import_1.api.util.invalidateTags(_Pimcore_app_api_pimcore_tags__rspack_import_2.invalidatingTags.DOCUMENT_DETAIL_ID(id)));
        const { data, isError, error } = await _Pimcore_app_store__rspack_import_0.store.dispatch(_document_api_slice_enhanced__rspack_import_1.api.endpoints.documentGetById.initiate({
            id
        }));
        if (isError && !silent) {
            (0,_Pimcore_modules_app_error_handler__rspack_import_11["default"])(new _Pimcore_modules_app_error_handler__rspack_import_11.ApiError(error));
        }
        if ((0,lodash__rspack_import_10.isNil)(data) || !(0,_Pimcore_modules_element_permissions_permission_helper__rspack_import_3.checkElementPermission)(data.permissions, 'view')) {
            return undefined;
        }
        // Store draft data for the element editor
        await this.fetchAndStoreDocumentDraft(id);
        const icon = (0,_Pimcore_modules_element_element_helper__rspack_import_4.getElementIcon)(data, {
            value: 'widget',
            type: 'name'
        });
        const widgetId = (0,_Pimcore_modules_widget_manager_utils_tools__rspack_import_5.getWidgetId)('document', id);
        return {
            name: data === null || data === void 0 ? void 0 : data.key,
            id: widgetId,
            component: 'document-editor',
            config: {
                id,
                elementType: 'document',
                icon,
                iconColorGroup: 'element'
            }
        };
    }
    async openDocument(config) {
        const { id } = config;
        const widgetId = (0,_Pimcore_modules_widget_manager_utils_tools__rspack_import_5.getWidgetId)('document', id);
        if (this.isWidgetOpen(widgetId)) {
            this.switchToWidget(widgetId);
            return;
        }
        const widgetConfig = await this.getWidgetConfig(id);
        if (!(0,lodash__rspack_import_10.isNil)(widgetConfig)) {
            _Pimcore_app_store__rspack_import_0.store.dispatch((0,_Pimcore_modules_widget_manager_widget_manager_slice__rspack_import_6.openMainWidget)(widgetConfig));
        }
    }
}
// Create singleton instance
const documentOpeningService = new DocumentOpeningService();

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/element/editor/layouts/tabs-toolbar-view.styles.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyles: () => (useStyles)
});
/* import */ var _Pimcore_modules_ant_design_styles_create_styles__rspack_import_0 = __webpack_require__("./js/src/core/modules/ant-design/styles/create-styles.ts");
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
const useStyles = (0,_Pimcore_modules_ant_design_styles_create_styles__rspack_import_0.createStyles)((param)=>{
    let { token, css } = param;
    return {
        tabbarToolbar: css`
      &.tabs-toolbar-layout {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        overflow: hidden;
      }

      .tabs-toolbar-layout__tabbar {
        display: flex;
        overflow: hidden;
        height: calc(100% - ${token.sizeXXL}px);
        width: 100%;
      }

      .tabs-toolbar-layout__toolbar {
        display: flex;
        overflow: hidden;
        height: ${token.sizeXXL}px;
        width: 100%;
      }
    `
    };
}, {
    hashPriority: 'low'
});

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/element/editor/shared-components/workflow/hooks/use-submit-workflow.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useSubmitWorkflow: () => (useSubmitWorkflow)
});
/* import */ var _Pimcore_modules_element_editor_shared_tab_manager_tabs_workflow_workflow_api_slice_enhanced__rspack_import_0 = __webpack_require__("./js/src/core/modules/element/editor/shared-tab-manager/tabs/workflow/workflow-api-slice-enhanced.ts");
/* import */ var _Pimcore_components_message_useMessage__rspack_import_1 = __webpack_require__("./js/src/core/components/message/useMessage/index.tsx");
/* import */ var i18next__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/i18next/i18next");
/* import */ var i18next__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(i18next__rspack_import_2);
/* import */ var _Pimcore_modules_element_hooks_use_element_context__rspack_import_3 = __webpack_require__("./js/src/core/modules/element/hooks/use-element-context.ts");
/* import */ var _sdk_components__rspack_import_4 = __webpack_require__("./js/src/sdk/components/index.ts");
/* import */ var _use_workflow__rspack_import_5 = __webpack_require__("./js/src/core/modules/element/editor/shared-components/workflow/hooks/use-workflow.ts");
/* import */ var _sdk_modules_element__rspack_import_6 = __webpack_require__("./js/src/sdk/modules/element/index.ts");
/* import */ var _Pimcore_modules_data_object_editor_toolbar_context_menu_provider_use_layout_selection__rspack_import_7 = __webpack_require__("./js/src/core/modules/data-object/editor/toolbar/context-menu/provider/use-layout-selection.tsx");
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







const useSubmitWorkflow = ()=>{
    const { id: elementId, elementType } = (0,_Pimcore_modules_element_hooks_use_element_context__rspack_import_3.useElementContext)();
    const { refreshElement } = (0,_sdk_modules_element__rspack_import_6.useElementRefresh)(elementType);
    const { closeModal } = (0,_use_workflow__rspack_import_5.useWorkflow)();
    const alertModal = (0,_sdk_components__rspack_import_4.useAlertModal)();
    const messageApi = (0,_Pimcore_components_message_useMessage__rspack_import_1.useMessage)();
    const { setCurrentLayout } = (0,_Pimcore_modules_data_object_editor_toolbar_context_menu_provider_use_layout_selection__rspack_import_7.useLayoutSelection)();
    const [fetchSubmitWorkflowActionMutation, { isLoading: submissionLoading, isSuccess: submissionSuccess, isError: isSubmissionError }] = (0,_Pimcore_modules_element_editor_shared_tab_manager_tabs_workflow_workflow_api_slice_enhanced__rspack_import_0.useWorkflowActionSubmitMutation)();
    const workFlowTransition = (workflowAction, workflowOptions)=>{
        return {
            submitAction: {
                actionType: workflowAction.actionType,
                elementId,
                elementType,
                workflowId: workflowAction.workflowId,
                transitionId: workflowAction.transitionId,
                workflowOptions: workflowOptions ?? {}
            }
        };
    };
    const submitWorkflowAction = (workflowAction, workflowOptions)=>{
        fetchSubmitWorkflowActionMutation(workFlowTransition(workflowAction, workflowOptions)).unwrap().then(()=>{
            void messageApi.success({
                content: (0,i18next__rspack_import_2.t)('action-applied-successfully') + ': ' + (0,i18next__rspack_import_2.t)(workflowAction.label),
                type: 'success',
                duration: 3
            });
            if (elementType === 'data-object') {
                setCurrentLayout(null);
            }
            refreshElement(elementId);
            closeModal();
        }).catch((error)=>{
            var _error_data;
            void alertModal.error({
                title: (0,i18next__rspack_import_2.t)('action-could-not-be-applied'),
                content: ((_error_data = error.data) === null || _error_data === void 0 ? void 0 : _error_data.message) ?? undefined
            });
            closeModal();
        });
    };
    return {
        submitWorkflowAction,
        submissionLoading,
        submissionSuccess,
        submissionError: isSubmissionError
    };
};

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/element/editor/shared-components/workflow/hooks/use-workflow-field-renderer.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useWorkflowFieldRenderer: () => (useWorkflowFieldRenderer)
});
/* import */ var react__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var _Pimcore_app_depency_injection__rspack_import_1 = __webpack_require__("./js/src/core/app/depency-injection/index.ts");
/* import */ var _Pimcore_app_config_services_service_ids__rspack_import_2 = __webpack_require__("./js/src/core/app/config/services/service-ids.ts");
/* import */ var _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_providers_field_width_field_width_provider__rspack_import_3 = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/field-width-provider.tsx");
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



const useWorkflowFieldRenderer = ()=>{
    const objectDataRegistry = (0,react__rspack_import_0.useMemo)(()=>{
        return _Pimcore_app_depency_injection__rspack_import_1.container.get(_Pimcore_app_config_services_service_ids__rspack_import_2.serviceIds["DynamicTypes/ObjectDataRegistry"]);
    }, []);
    const supportedFieldTypes = [
        'input',
        'numeric',
        'textarea',
        'select',
        'datetime',
        'date',
        'user',
        'checkbox'
    ];
    const getSupportedFieldTypes = ()=>supportedFieldTypes;
    const renderFields = function() {
        let additionalFields = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
        return additionalFields.filter((field)=>supportedFieldTypes.includes(field.fieldType)).map((field)=>{
            const dynamicType = getDynamicTypeForField(field.fieldType);
            if (dynamicType === null) {
                return null;
            }
            const fieldProps = {
                name: field.name,
                title: field.title,
                datatype: 'data',
                fieldType: field.fieldType,
                defaultFieldWidth: _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_providers_field_width_field_width_provider__rspack_import_3.defaultFieldWidthValues,
                noteditable: false,
                inherited: false,
                value: undefined,
                ...field.fieldTypeSettings
            };
            const component = dynamicType.getObjectDataComponent(fieldProps);
            return {
                name: field.name,
                title: field.title,
                required: field.required ?? false,
                fieldType: field.fieldType,
                component
            };
        }).filter((field)=>field !== null);
    };
    const getDynamicTypeForField = (fieldType)=>{
        try {
            if (!objectDataRegistry.hasDynamicType(fieldType)) {
                console.warn(`Dynamic type "${fieldType}" not found in ObjectDataRegistry`);
                return null;
            }
            return objectDataRegistry.getDynamicType(fieldType);
        } catch (error) {
            console.warn(`Could not get dynamic type for field type "${fieldType}":`, error);
            return null;
        }
    };
    return {
        renderFields,
        getSupportedFieldTypes
    };
};

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/element/editor/tabs/hooks/use-detach-tab.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useDetachTab: () => (useDetachTab)
});
/* import */ var _Pimcore_modules_widget_manager_hooks_use_widget_manager__rspack_import_0 = __webpack_require__("./js/src/core/modules/widget-manager/hooks/use-widget-manager.ts");
/* import */ var i18next__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/i18next/i18next");
/* import */ var i18next__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(i18next__rspack_import_1);
/* import */ var _Pimcore_modules_element_editor_shared_tab_manager_hooks_use_tab_manager__rspack_import_2 = __webpack_require__("./js/src/core/modules/element/editor/shared-tab-manager/hooks/use-tab-manager.ts");
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


const useDetachTab = ()=>{
    const { openBottomWidget } = (0,_Pimcore_modules_widget_manager_hooks_use_widget_manager__rspack_import_0.useWidgetManager)();
    const tabManager = (0,_Pimcore_modules_element_editor_shared_tab_manager_hooks_use_tab_manager__rspack_import_2.useTabManager)();
    const detachWidget = (param)=>{
        let { tabKey, config = {} } = param;
        const tab = tabManager.getTab(tabKey);
        if (tab === undefined) {
            return;
        }
        openBottomWidget({
            name: i18next__rspack_import_1_default().t(String(tab.label)),
            id: `${tabKey}-detached`,
            component: 'detachable-tab',
            config: {
                ...config,
                icon: tab.icon.props,
                tabKey
            }
        });
    };
    return {
        detachWidget
    };
};

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/perspectives/enums/nav-permission.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  NavPermission: () => (NavPermission)
});
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ var NavPermission = /*#__PURE__*/ function(NavPermission) {
    NavPermission["QuickAccessHidden"] = "quickAccess.hidden";
    NavPermission["OpenDocument"] = "quickAccess.open_document";
    NavPermission["OpenObject"] = "quickAccess.open_object";
    NavPermission["OpenAsset"] = "quickAccess.open_asset";
    NavPermission["RecycleBin"] = "quickAccess.recycle_bin";
    NavPermission["DataManagementHidden"] = "dataManagement.hidden";
    NavPermission["NotesAndEvents"] = "dataManagement.notesEvents";
    NavPermission["SearchReplaceAssignments"] = "dataManagement.searchReplaceAssignments";
    NavPermission["PredefinedProperties"] = "dataManagement.predefinedProperties";
    NavPermission["TagConfiguration"] = "dataManagement.tagConfiguration";
    NavPermission["GDPRDataExtractor"] = "dataManagement.gdprDataExtractor";
    NavPermission["ClassDefinitions"] = "dataManagement.dataModel_classes";
    NavPermission["FieldCollections"] = "dataManagement.dataModel_fieldCollections";
    NavPermission["ObjectBricks"] = "dataManagement.dataModel_objectBricks";
    NavPermission["ClassificationStore"] = "dataManagement.dataModel_classificationStore";
    NavPermission["SelectOptions"] = "dataManagement.dataModel_selectOptions";
    NavPermission["QuantityValues"] = "dataManagement.dataModel_quantityValue";
    NavPermission["BulkExport"] = "dataManagement.dataModel_bulkExport";
    NavPermission["BulkImport"] = "dataManagement.dataModel_bulkImport";
    NavPermission["AssetThumbnails"] = "assetManagement.assetThumbnails";
    NavPermission["PredefinedAssetMetadata"] = "assetManagement.predefinedAssetMetadata";
    NavPermission["ExperienceEcommerceHidden"] = "experienceEcommerce.hidden";
    NavPermission["Mails"] = "experienceEcommerce.emails";
    NavPermission["DocumentTypes"] = "experienceEcommerce.documentTypes";
    NavPermission["WebsiteSettings"] = "experienceEcommerce.websiteSettings";
    NavPermission["Redirects"] = "experienceEcommerce.redirects";
    NavPermission["RobotsTxt"] = "experienceEcommerce.robotsTxt";
    NavPermission["TranslationsHidden"] = "translations.hidden";
    NavPermission["Translations"] = "translations.translations";
    NavPermission["Appearance"] = "system.appearanceBranding";
    NavPermission["ReportingHidden"] = "reporting.hidden";
    NavPermission["Reports"] = "reporting.reports";
    NavPermission["CustomReportsConfiguration"] = "reporting.customReportsConfiguration";
    NavPermission["SystemHidden"] = "system.hidden";
    NavPermission["UsersHidden"] = "system.users_hidden";
    NavPermission["Users"] = "system.users_users";
    NavPermission["Roles"] = "system.users_roles";
    NavPermission["PerspectiveEditor"] = "system.perspectiveEditor";
    NavPermission["WidgetEditor"] = "system.widgetEditor";
    NavPermission["ApplicationLogger"] = "system.applicationLogger";
    NavPermission["About"] = "system.about";
    NavPermission["SystemSettings"] = "system.systemSettings";
    NavPermission["SearchHidden"] = "search.hidden";
    return NavPermission;
}({});

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/user/index.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ROLES_WIDGET: () => (ROLES_WIDGET),
  USERS_WIDGET: () => (USERS_WIDGET)
});
/* import */ var _Pimcore_modules_user_management_management_container__rspack_import_0 = __webpack_require__("./js/src/core/modules/user/management/management-container.tsx");
/* import */ var _Pimcore_modules_user_roles_container__rspack_import_1 = __webpack_require__("./js/src/core/modules/user/roles/container.tsx");
/* import */ var _Pimcore_app_depency_injection__rspack_import_2 = __webpack_require__("./js/src/core/app/depency-injection/index.ts");
/* import */ var _Pimcore_app_config_services_service_ids__rspack_import_3 = __webpack_require__("./js/src/core/app/config/services/service-ids.ts");
/* import */ var _Pimcore_app_module_system_module_system__rspack_import_4 = __webpack_require__("./js/src/core/app/module-system/module-system.ts");
/* import */ var _perspectives_enums_nav_permission__rspack_import_5 = __webpack_require__("./js/src/core/modules/perspectives/enums/nav-permission.ts");
/* import */ var _auth_enums_user_permission__rspack_import_6 = __webpack_require__("./js/src/core/modules/auth/enums/user-permission.ts");
/* import */ var _Pimcore_modules_auth_profile_widget__rspack_import_7 = __webpack_require__("./js/src/core/modules/auth/profile/widget.tsx");
/* import */ var _Pimcore_modules_auth_profile_profile_container__rspack_import_8 = __webpack_require__("./js/src/core/modules/auth/profile/profile-container.tsx");
/* import */ var _widget_manager_services_static_widget_restorer__rspack_import_9 = __webpack_require__("./js/src/core/modules/widget-manager/services/static-widget-restorer.ts");
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









const USERS_WIDGET = {
    name: 'Users',
    id: 'user-management',
    component: 'user-management',
    config: {
        translationKey: 'widget.user-management',
        icon: {
            type: 'name',
            value: 'user'
        }
    }
};
const ROLES_WIDGET = {
    name: 'Roles',
    id: 'role-management',
    component: 'role-management',
    config: {
        translationKey: 'widget.role-management',
        icon: {
            type: 'name',
            value: 'user'
        }
    }
};
_Pimcore_app_module_system_module_system__rspack_import_4.moduleSystem.registerModule({
    onInit: ()=>{
        const mainNavRegistryService = _Pimcore_app_depency_injection__rspack_import_2.container.get(_Pimcore_app_config_services_service_ids__rspack_import_3.serviceIds.mainNavRegistry);
        mainNavRegistryService.registerMainNavItem({
            path: 'System/User & Roles',
            label: 'navigation.user-and-roles',
            order: 100,
            dividerBottom: true,
            permission: _auth_enums_user_permission__rspack_import_6.UserPermission.Users,
            perspectivePermissionHide: _perspectives_enums_nav_permission__rspack_import_5.NavPermission.UsersHidden
        });
        mainNavRegistryService.registerMainNavItem({
            path: 'System/User & Roles/Users',
            label: 'navigation.users',
            order: 100,
            className: 'item-style-modifier',
            permission: _auth_enums_user_permission__rspack_import_6.UserPermission.Users,
            perspectivePermission: _perspectives_enums_nav_permission__rspack_import_5.NavPermission.Users,
            widgetConfig: USERS_WIDGET
        });
        mainNavRegistryService.registerMainNavItem({
            path: 'System/User & Roles/Roles',
            label: 'navigation.roles',
            order: 200,
            permission: _auth_enums_user_permission__rspack_import_6.UserPermission.Users,
            perspectivePermission: _perspectives_enums_nav_permission__rspack_import_5.NavPermission.Roles,
            widgetConfig: ROLES_WIDGET
        });
        const widgetRegistryService = _Pimcore_app_depency_injection__rspack_import_2.container.get(_Pimcore_app_config_services_service_ids__rspack_import_3.serviceIds.widgetManager);
        widgetRegistryService.registerWidget({
            name: 'user-management',
            component: _Pimcore_modules_user_management_management_container__rspack_import_0.ManagementContainer
        });
        widgetRegistryService.registerWidget({
            name: 'role-management',
            component: _Pimcore_modules_user_roles_container__rspack_import_1.RoleContainer
        });
        widgetRegistryService.registerWidget(_Pimcore_modules_auth_profile_widget__rspack_import_7.UserProfileWidget);
        _widget_manager_services_static_widget_restorer__rspack_import_9.staticWidgetRestorer.registerStaticWidget(_Pimcore_modules_auth_profile_profile_container__rspack_import_8.USERPROFILE);
    }
});

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/user/management/detail/tabs/workspaces/workspace-type.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  WorkspaceType: () => (WorkspaceType)
});
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ var WorkspaceType = /*#__PURE__*/ function(WorkspaceType) {
    WorkspaceType["DOCUMENT"] = "document";
    WorkspaceType["ASSET"] = "asset";
    WorkspaceType["OBJECT"] = "object";
    return WorkspaceType;
}({});

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/user/management/tree/tree-helper.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  findNodeByKey: () => (findNodeByKey),
  findParentByKey: () => (findParentByKey)
});
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ const findNodeByKey = (data, key)=>{
    for (const node of data){
        if (parseInt(node.key) === parseInt(key)) {
            return node;
        }
        if (node.children !== undefined && node.children !== null) {
            const found = findNodeByKey(node.children, key);
            if (found !== undefined) {
                return found;
            }
        }
    }
    return undefined;
};
const findParentByKey = function(data, key) {
    let parent = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
    for (const node of data){
        if (parseInt(node.key) === parseInt(key)) {
            return parent;
        }
        if (node.children !== undefined && node.children !== null) {
            const found = findParentByKey(node.children, key, node);
            if (found !== null) {
                return found;
            }
        }
    }
    return null;
};

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/types/components/types.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
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

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/utils/global-context-identifiers.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ASSET_CONTEXT_IDENTIFIER_PREFIX: () => (ASSET_CONTEXT_IDENTIFIER_PREFIX),
  DOCUMENT_CONTEXT_IDENTIFIER_PREFIX: () => (DOCUMENT_CONTEXT_IDENTIFIER_PREFIX),
  OBJECT_CONTEXT_IDENTIFIER_PREFIX: () => (OBJECT_CONTEXT_IDENTIFIER_PREFIX),
  getBaseAssetContextIdentifiers: () => (getBaseAssetContextIdentifiers),
  getBaseDataObjectContextIdentifiers: () => (getBaseDataObjectContextIdentifiers),
  getBaseDocumentContextIdentifiers: () => (getBaseDocumentContextIdentifiers)
});
/* import */ var _Pimcore_utils_type_utils__rspack_import_0 = __webpack_require__("./js/src/core/utils/type-utils.ts");
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
const OBJECT_CONTEXT_IDENTIFIER_PREFIX = 'object';
const ASSET_CONTEXT_IDENTIFIER_PREFIX = 'asset';
const DOCUMENT_CONTEXT_IDENTIFIER_PREFIX = 'document';
const getBaseDataObjectContextIdentifiers = (objectData, isGrid)=>{
    const tags = [
        OBJECT_CONTEXT_IDENTIFIER_PREFIX,
        ...isGrid ? [
            `${OBJECT_CONTEXT_IDENTIFIER_PREFIX}_grid`
        ] : []
    ];
    const isFolderType = (objectData === null || objectData === void 0 ? void 0 : objectData.type) === 'folder';
    if (!(0,_Pimcore_utils_type_utils__rspack_import_0.isEmptyValue)(objectData === null || objectData === void 0 ? void 0 : objectData.className)) {
        tags.push(`${OBJECT_CONTEXT_IDENTIFIER_PREFIX}_${objectData === null || objectData === void 0 ? void 0 : objectData.className.toLowerCase()}`);
    } else if (isFolderType) {
        tags.push(`${OBJECT_CONTEXT_IDENTIFIER_PREFIX}_folder`);
    }
    return {
        type: OBJECT_CONTEXT_IDENTIFIER_PREFIX,
        subType: isFolderType ? 'folder' : OBJECT_CONTEXT_IDENTIFIER_PREFIX,
        tags
    };
};
const getBaseAssetContextIdentifiers = (assetData, isGrid)=>{
    var _assetData_type;
    const tags = [
        ASSET_CONTEXT_IDENTIFIER_PREFIX,
        ...isGrid ? [
            `${ASSET_CONTEXT_IDENTIFIER_PREFIX}_grid`
        ] : []
    ];
    if (!(0,_Pimcore_utils_type_utils__rspack_import_0.isEmptyValue)(assetData === null || assetData === void 0 ? void 0 : assetData.type)) {
        tags.push(`${ASSET_CONTEXT_IDENTIFIER_PREFIX}_${assetData === null || assetData === void 0 ? void 0 : assetData.type.toLowerCase()}`);
    }
    return {
        type: ASSET_CONTEXT_IDENTIFIER_PREFIX,
        subType: !(0,_Pimcore_utils_type_utils__rspack_import_0.isEmptyValue)(assetData === null || assetData === void 0 ? void 0 : assetData.type) ? assetData === null || assetData === void 0 ? void 0 : (_assetData_type = assetData.type) === null || _assetData_type === void 0 ? void 0 : _assetData_type.toLowerCase() : ASSET_CONTEXT_IDENTIFIER_PREFIX,
        tags
    };
};
const getBaseDocumentContextIdentifiers = (documentData)=>{
    var _documentData_type;
    const tags = [
        DOCUMENT_CONTEXT_IDENTIFIER_PREFIX
    ];
    if (!(0,_Pimcore_utils_type_utils__rspack_import_0.isEmptyValue)(documentData === null || documentData === void 0 ? void 0 : documentData.type)) {
        tags.push(`${DOCUMENT_CONTEXT_IDENTIFIER_PREFIX}_${documentData === null || documentData === void 0 ? void 0 : documentData.type.toLowerCase()}`);
    }
    return {
        type: DOCUMENT_CONTEXT_IDENTIFIER_PREFIX,
        subType: !(0,_Pimcore_utils_type_utils__rspack_import_0.isEmptyValue)(documentData === null || documentData === void 0 ? void 0 : documentData.type) ? documentData === null || documentData === void 0 ? void 0 : (_documentData_type = documentData.type) === null || _documentData_type === void 0 ? void 0 : _documentData_type.toLowerCase() : DOCUMENT_CONTEXT_IDENTIFIER_PREFIX,
        tags
    };
};

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/sdk/modules/auth/index.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  UserPermission: () => (/* reexport safe */ _Pimcore_modules_auth_enums_user_permission__rspack_import_0.UserPermission),
  getCurrentUser: () => (/* reexport safe */ _Pimcore_modules_auth_util_user_helper__rspack_import_4.getCurrentUser),
  isAllowed: () => (/* reexport safe */ _Pimcore_modules_auth_permission_helper__rspack_import_1.isAllowed),
  useIsAuthenticated: () => (/* reexport safe */ _Pimcore_modules_auth_hooks_use_is_authenticated__rspack_import_3.useIsAuthenticated),
  useUser: () => (/* reexport safe */ _Pimcore_modules_auth_hooks_use_user__rspack_import_2.useUser)
});
/* import */ var _Pimcore_modules_auth_enums_user_permission__rspack_import_0 = __webpack_require__("./js/src/core/modules/auth/enums/user-permission.ts");
/* import */ var _Pimcore_modules_auth_permission_helper__rspack_import_1 = __webpack_require__("./js/src/core/modules/auth/permission-helper.ts");
/* import */ var _Pimcore_modules_auth_hooks_use_user__rspack_import_2 = __webpack_require__("./js/src/core/modules/auth/hooks/use-user.ts");
/* import */ var _Pimcore_modules_auth_hooks_use_is_authenticated__rspack_import_3 = __webpack_require__("./js/src/core/modules/auth/hooks/use-is-authenticated.ts");
/* import */ var _Pimcore_modules_auth_util_user_helper__rspack_import_4 = __webpack_require__("./js/src/core/modules/auth/util/user-helper.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ if (true) {
    module.hot.accept();
}






function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/sdk/modules/data-object/index.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ActionColumnDecorator: () => (/* reexport safe */ _Pimcore_modules_data_object_listing_listing_container__rspack_import_24.ActionColumnDecorator),
  AdvancedColumnForm: () => (/* reexport safe */ _Pimcore_modules_data_object_listing_decorator_column_configuration_view_layer_components_grid_hooks_use_grid_options_tabs_grid_config_forms_advanced_column_form_advanced_column_form__rspack_import_30.AdvancedColumnForm),
  BaseListing: () => (/* reexport safe */ _Pimcore_modules_data_object_listing_listing_container__rspack_import_24.BaseListing),
  BatchAppendMode: () => (/* reexport safe */ _Pimcore_modules_data_object_listing_batch_actions_batch_append_mode_batch_append_mode__rspack_import_23.BatchAppendMode),
  ClassDefinitionSelectionDecorator: () => (/* reexport safe */ _Pimcore_modules_data_object_listing_listing_container__rspack_import_24.ClassDefinitionSelectionDecorator),
  ColumnConfigurationDecorator: () => (/* reexport safe */ _Pimcore_modules_data_object_listing_listing_container__rspack_import_24.ColumnConfigurationDecorator),
  ContextMenuDecorator: () => (/* reexport safe */ _Pimcore_modules_data_object_listing_listing_container__rspack_import_24.ContextMenuDecorator),
  DataComponent: () => (/* reexport safe */ _Pimcore_modules_data_object_editor_shared_tab_manager_tabs_versions_components_data_component_data_component__rspack_import_28.DataComponent),
  DataObjectContext: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_provider__rspack_import_27.DataObjectContext),
  DataObjectEditorWidget: () => (/* reexport safe */ _Pimcore_modules_data_object_editor_widget__rspack_import_20.DataObjectEditorWidget),
  DataObjectProvider: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_provider__rspack_import_27.DataObjectProvider),
  DataObjectSaveDataContext: () => (/* reexport safe */ _Pimcore_modules_data_object_services_processors_data_object_save_data_processor_registry__rspack_import_3.DataObjectSaveDataContext),
  DataObjectSaveDataProcessorRegistry: () => (/* reexport safe */ _Pimcore_modules_data_object_services_processors_data_object_save_data_processor_registry__rspack_import_3.DataObjectSaveDataProcessorRegistry),
  FolderTabManager: () => (/* reexport safe */ _Pimcore_modules_data_object_editor_types_folder_tab_manager_folder_tab_manager__rspack_import_14.FolderTabManager),
  GeneralFiltersDecorator: () => (/* reexport safe */ _Pimcore_modules_data_object_listing_listing_container__rspack_import_24.GeneralFiltersDecorator),
  InlineEditDecorator: () => (/* reexport safe */ _Pimcore_modules_data_object_listing_listing_container__rspack_import_24.InlineEditDecorator),
  LanguageSelection: () => (/* reexport safe */ _Pimcore_modules_data_object_editor_toolbar_language_selection_language_selection__rspack_import_16.LanguageSelection),
  LanguageSelectionContext: () => (/* reexport safe */ _Pimcore_components_language_selection_provider_language_selection_provider__rspack_import_18.LanguageSelectionContext),
  LanguageSelectionProvider: () => (/* reexport safe */ _Pimcore_components_language_selection_provider_language_selection_provider__rspack_import_18.LanguageSelectionProvider),
  LanguageSelectionWithProvider: () => (/* reexport safe */ _Pimcore_components_language_selection_language_selection_with_provider__rspack_import_17.LanguageSelectionWithProvider),
  ListingContainer: () => (/* reexport safe */ _Pimcore_modules_data_object_listing_listing_container__rspack_import_24.ListingContainer),
  META_SUPPORTS_BATCH_APPEND_MODE: () => (/* reexport safe */ _Pimcore_modules_data_object_listing_batch_actions_batch_append_mode_batch_append_mode__rspack_import_23.META_SUPPORTS_BATCH_APPEND_MODE),
  ObjectListingBuilder: () => (/* reexport safe */ _Pimcore_modules_data_object_listing_builder_object_listing_builder__rspack_import_25.ObjectListingBuilder),
  ObjectTabManager: () => (/* reexport safe */ _Pimcore_modules_data_object_editor_types_object_tab_manager_object_tab_manager__rspack_import_15.ObjectTabManager),
  PagingDecorator: () => (/* reexport safe */ _Pimcore_modules_data_object_listing_listing_container__rspack_import_24.PagingDecorator),
  PipelineLayoutContext: () => (/* reexport safe */ _Pimcore_modules_data_object_listing_decorator_column_configuration_view_layer_components_grid_hooks_use_grid_options_tabs_grid_config_forms_advanced_column_form_pipeline_layout_provider__rspack_import_31.PipelineLayoutContext),
  PipelineLayoutProvider: () => (/* reexport safe */ _Pimcore_modules_data_object_listing_decorator_column_configuration_view_layer_components_grid_hooks_use_grid_options_tabs_grid_config_forms_advanced_column_form_pipeline_layout_provider__rspack_import_31.PipelineLayoutProvider),
  RowSelectionDecorator: () => (/* reexport safe */ _Pimcore_modules_data_object_listing_listing_container__rspack_import_24.RowSelectionDecorator),
  SaveTaskType: () => (/* reexport safe */ _Pimcore_modules_data_object_actions_save_use_save__rspack_import_1.SaveTaskType),
  SortingDecorator: () => (/* reexport safe */ _Pimcore_modules_data_object_listing_listing_container__rspack_import_24.SortingDecorator),
  TagFilterDecorator: () => (/* reexport safe */ _Pimcore_modules_data_object_listing_listing_container__rspack_import_24.TagFilterDecorator),
  addBatchAppendMode: () => (/* reexport safe */ _Pimcore_modules_data_object_listing_batch_actions_batch_append_mode_batch_append_mode__rspack_import_23.addBatchAppendMode),
  addPropertyToDataObject: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__rspack_import_4.addPropertyToDataObject),
  addScheduleToDataObject: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__rspack_import_4.addScheduleToDataObject),
  dataObjectReceived: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__rspack_import_4.dataObjectReceived),
  dataObjectsAdapter: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__rspack_import_4.dataObjectsAdapter),
  elementTypes: () => (/* reexport safe */ _Pimcore_types_enums_element_element_type__rspack_import_13.elementTypes),
  listingDefaultProps: () => (/* reexport safe */ _Pimcore_modules_data_object_listing_listing_container__rspack_import_24.listingDefaultProps),
  markObjectDataAsModified: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__rspack_import_4.markObjectDataAsModified),
  publishDraft: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__rspack_import_4.publishDraft),
  removeDataObject: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__rspack_import_4.removeDataObject),
  removePropertyFromDataObject: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__rspack_import_4.removePropertyFromDataObject),
  removeScheduleFromDataObject: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__rspack_import_4.removeScheduleFromDataObject),
  resetChanges: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__rspack_import_4.resetChanges),
  resetDataObject: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__rspack_import_4.resetDataObject),
  resetSchedulesChangesForDataObject: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__rspack_import_4.resetSchedulesChangesForDataObject),
  selectDataObjectById: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__rspack_import_4.selectDataObjectById),
  setActiveTabForDataObject: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__rspack_import_4.setActiveTabForDataObject),
  setDraftData: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__rspack_import_4.setDraftData),
  setModificationDate: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__rspack_import_4.setModificationDate),
  setModifiedCells: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__rspack_import_4.setModifiedCells),
  setPropertiesForDataObject: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__rspack_import_4.setPropertiesForDataObject),
  setSchedulesForDataObject: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__rspack_import_4.setSchedulesForDataObject),
  slice: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__rspack_import_4.slice),
  transformApiDataToNode: () => (/* reexport safe */ _Pimcore_modules_data_object_tree_utils_transform_api_data_to_node__rspack_import_22.transformApiDataToNode),
  transformApiDataToNodes: () => (/* reexport safe */ _Pimcore_modules_data_object_tree_utils_transform_api_data_to_node__rspack_import_22.transformApiDataToNodes),
  unpublishDraft: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__rspack_import_4.unpublishDraft),
  updateKey: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__rspack_import_4.updateKey),
  updatePropertyForDataObject: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__rspack_import_4.updatePropertyForDataObject),
  updateScheduleForDataObject: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__rspack_import_4.updateScheduleForDataObject),
  useAddObject: () => (/* reexport safe */ _Pimcore_modules_data_object_actions_add_object_use_add_object__rspack_import_0.useAddObject),
  useClassDefinitionSelection: () => (/* reexport safe */ _Pimcore_modules_data_object_listing_decorator_class_definition_selection_context_layer_provider_use_class_definition_selection__rspack_import_26.useClassDefinitionSelection),
  useClassDefinitionSelectionOptional: () => (/* reexport safe */ _Pimcore_modules_data_object_listing_decorator_class_definition_selection_context_layer_provider_use_class_definition_selection__rspack_import_26.useClassDefinitionSelectionOptional),
  useClassDefinitions: () => (/* reexport safe */ _Pimcore_modules_data_object_utils_provider_class_defintions_use_class_definitions__rspack_import_29.useClassDefinitions),
  useCustomLayouts: () => (/* reexport safe */ _Pimcore_modules_data_object_hooks_use_custom_layouts__rspack_import_6.useCustomLayouts),
  useDataObject: () => (/* reexport safe */ _Pimcore_modules_data_object_hooks_use_data_object__rspack_import_7.useDataObject),
  useDataObjectDraft: () => (/* reexport safe */ _Pimcore_modules_data_object_hooks_use_data_object_draft__rspack_import_8.useDataObjectDraft),
  useDataObjectHelper: () => (/* reexport safe */ _Pimcore_modules_data_object_hooks_use_data_object_helper__rspack_import_9.useDataObjectHelper),
  useGlobalDataObjectContext: () => (/* reexport safe */ _Pimcore_modules_data_object_hooks_use_global_data_object_context__rspack_import_10.useGlobalDataObjectContext),
  useInlineEditApiUpdate: () => (/* reexport safe */ _Pimcore_modules_data_object_listing_listing_container__rspack_import_24.useInlineEditApiUpdate),
  useLanguageSelection: () => (/* reexport safe */ _Pimcore_components_language_selection_provider_use_language_selection__rspack_import_19.useLanguageSelection),
  useModifiedObjectDataDraft: () => (/* reexport safe */ _Pimcore_modules_data_object_draft_hooks_use_modified_object_data__rspack_import_5.useModifiedObjectDataDraft),
  useModifiedObjectDataReducers: () => (/* reexport safe */ _Pimcore_modules_data_object_draft_hooks_use_modified_object_data__rspack_import_5.useModifiedObjectDataReducers),
  usePipelineLayoutContext: () => (/* reexport safe */ _Pimcore_modules_data_object_listing_decorator_column_configuration_view_layer_components_grid_hooks_use_grid_options_tabs_grid_config_forms_advanced_column_form_pipeline_layout_provider__rspack_import_31.usePipelineLayoutContext),
  useQuantityValueUnits: () => (/* reexport safe */ _Pimcore_modules_data_object_hooks_use_quantity_value_units__rspack_import_11.useQuantityValueUnits),
  useSave: () => (/* reexport safe */ _Pimcore_modules_data_object_actions_save_use_save__rspack_import_1.useSave),
  withActionStates: () => (/* reexport safe */ _Pimcore_modules_data_object_tree_node_with_action_states__rspack_import_21.withActionStates)
});
/* import */ var _Pimcore_modules_data_object_actions_add_object_use_add_object__rspack_import_0 = __webpack_require__("./js/src/core/modules/data-object/actions/add-object/use-add-object.tsx");
/* import */ var _Pimcore_modules_data_object_actions_save_use_save__rspack_import_1 = __webpack_require__("./js/src/core/modules/data-object/actions/save/use-save.tsx");
/* import */ var _Pimcore_modules_data_object_events_post_update_event__rspack_import_2 = __webpack_require__("./js/src/core/modules/data-object/events/post-update-event.ts");
/* import */ var _Pimcore_modules_data_object_services_processors_data_object_save_data_processor_registry__rspack_import_3 = __webpack_require__("./js/src/core/modules/data-object/services/processors/data-object-save-data-processor-registry.ts");
/* import */ var _Pimcore_modules_data_object_data_object_draft_slice__rspack_import_4 = __webpack_require__("./js/src/core/modules/data-object/data-object-draft-slice.tsx");
/* import */ var _Pimcore_modules_data_object_draft_hooks_use_modified_object_data__rspack_import_5 = __webpack_require__("./js/src/core/modules/data-object/draft/hooks/use-modified-object-data.ts");
/* import */ var _Pimcore_modules_data_object_hooks_use_custom_layouts__rspack_import_6 = __webpack_require__("./js/src/core/modules/data-object/hooks/use-custom-layouts.ts");
/* import */ var _Pimcore_modules_data_object_hooks_use_data_object__rspack_import_7 = __webpack_require__("./js/src/core/modules/data-object/hooks/use-data-object.ts");
/* import */ var _Pimcore_modules_data_object_hooks_use_data_object_draft__rspack_import_8 = __webpack_require__("./js/src/core/modules/data-object/hooks/use-data-object-draft.ts");
/* import */ var _Pimcore_modules_data_object_hooks_use_data_object_helper__rspack_import_9 = __webpack_require__("./js/src/core/modules/data-object/hooks/use-data-object-helper.ts");
/* import */ var _Pimcore_modules_data_object_hooks_use_global_data_object_context__rspack_import_10 = __webpack_require__("./js/src/core/modules/data-object/hooks/use-global-data-object-context.ts");
/* import */ var _Pimcore_modules_data_object_hooks_use_quantity_value_units__rspack_import_11 = __webpack_require__("./js/src/core/modules/data-object/hooks/use-quantity-value-units.ts");
/* import */ var _Pimcore_types_components_types__rspack_import_12 = __webpack_require__("./js/src/core/types/components/types.ts");
/* import */ var _Pimcore_types_enums_element_element_type__rspack_import_13 = __webpack_require__("./js/src/core/types/enums/element/element-type.tsx");
/* import */ var _Pimcore_modules_data_object_editor_types_folder_tab_manager_folder_tab_manager__rspack_import_14 = __webpack_require__("./js/src/core/modules/data-object/editor/types/folder/tab-manager/folder-tab-manager.ts");
/* import */ var _Pimcore_modules_data_object_editor_types_object_tab_manager_object_tab_manager__rspack_import_15 = __webpack_require__("./js/src/core/modules/data-object/editor/types/object/tab-manager/object-tab-manager.ts");
/* import */ var _Pimcore_modules_data_object_editor_toolbar_language_selection_language_selection__rspack_import_16 = __webpack_require__("./js/src/core/modules/data-object/editor/toolbar/language-selection/language-selection.tsx");
/* import */ var _Pimcore_components_language_selection_language_selection_with_provider__rspack_import_17 = __webpack_require__("./js/src/core/components/language-selection/language-selection-with-provider.tsx");
/* import */ var _Pimcore_components_language_selection_provider_language_selection_provider__rspack_import_18 = __webpack_require__("./js/src/core/components/language-selection/provider/language-selection-provider.tsx");
/* import */ var _Pimcore_components_language_selection_provider_use_language_selection__rspack_import_19 = __webpack_require__("./js/src/core/components/language-selection/provider/use-language-selection.tsx");
/* import */ var _Pimcore_modules_data_object_editor_widget__rspack_import_20 = __webpack_require__("./js/src/core/modules/data-object/editor/widget.tsx");
/* import */ var _Pimcore_modules_data_object_tree_node_with_action_states__rspack_import_21 = __webpack_require__("./js/src/core/modules/data-object/tree/node/with-action-states.tsx");
/* import */ var _Pimcore_modules_data_object_tree_utils_transform_api_data_to_node__rspack_import_22 = __webpack_require__("./js/src/core/modules/data-object/tree/utils/transform-api-data-to-node.ts");
/* import */ var _Pimcore_modules_data_object_listing_batch_actions_batch_append_mode_batch_append_mode__rspack_import_23 = __webpack_require__("./js/src/core/modules/data-object/listing/batch-actions/batch-append-mode/batch-append-mode.ts");
/* import */ var _Pimcore_modules_data_object_listing_listing_container__rspack_import_24 = __webpack_require__("./js/src/core/modules/data-object/listing/listing-container.tsx");
/* import */ var _Pimcore_modules_data_object_listing_builder_object_listing_builder__rspack_import_25 = __webpack_require__("./js/src/core/modules/data-object/listing/builder/object-listing-builder.ts");
/* import */ var _Pimcore_modules_data_object_listing_decorator_class_definition_selection_context_layer_provider_use_class_definition_selection__rspack_import_26 = __webpack_require__("./js/src/core/modules/data-object/listing/decorator/class-definition-selection/context-layer/provider/use-class-definition-selection.tsx");
/* import */ var _Pimcore_modules_data_object_data_object_provider__rspack_import_27 = __webpack_require__("./js/src/core/modules/data-object/data-object-provider.tsx");
/* import */ var _Pimcore_modules_data_object_editor_shared_tab_manager_tabs_versions_components_data_component_data_component__rspack_import_28 = __webpack_require__("./js/src/core/modules/data-object/editor/shared-tab-manager/tabs/versions/components/data-component/data-component.tsx");
/* import */ var _Pimcore_modules_data_object_utils_provider_class_defintions_use_class_definitions__rspack_import_29 = __webpack_require__("./js/src/core/modules/data-object/utils/provider/class-defintions/use-class-definitions.tsx");
/* import */ var _Pimcore_modules_data_object_listing_decorator_column_configuration_view_layer_components_grid_hooks_use_grid_options_tabs_grid_config_forms_advanced_column_form_advanced_column_form__rspack_import_30 = __webpack_require__("./js/src/core/modules/data-object/listing/decorator/column-configuration/view-layer/components/grid/hooks/use-grid-options/tabs/grid-config/forms/advanced-column-form/advanced-column-form.tsx");
/* import */ var _Pimcore_modules_data_object_listing_decorator_column_configuration_view_layer_components_grid_hooks_use_grid_options_tabs_grid_config_forms_advanced_column_form_pipeline_layout_provider__rspack_import_31 = __webpack_require__("./js/src/core/modules/data-object/listing/decorator/column-configuration/view-layer/components/grid/hooks/use-grid-options/tabs/grid-config/forms/advanced-column-form/pipeline-layout-provider.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ if (true) {
    module.hot.accept();
}

































function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/app/public-api/api-gateway/gateway.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ApiGateway: () => (ApiGateway)
});
/* import */ var react__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var _Pimcore_modules_element_element_selector_provider_element_selector_use_element_selector_helper__rspack_import_1 = __webpack_require__("./js/src/core/modules/element/element-selector/provider/element-selector/use-element-selector-helper.tsx");
/* import */ var _Pimcore_components_modal_upload_provider_upload_modal_provider_use_upload_modal_context__rspack_import_2 = __webpack_require__("./js/src/core/components/modal-upload/provider/upload-modal-provider/use-upload-modal-context.tsx");
/* import */ var _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_link_provider_use_link_modal_context__rspack_import_3 = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/provider/use-link-modal-context.tsx");
/* import */ var _Pimcore_modules_element_components_crop_modal_provider_use_crop_modal_context__rspack_import_4 = __webpack_require__("./js/src/core/modules/element/components/crop-modal/provider/use-crop-modal-context.tsx");
/* import */ var _Pimcore_modules_element_components_hotspot_markers_modal_provider_use_hotspot_markers_modal_context__rspack_import_5 = __webpack_require__("./js/src/core/modules/element/components/hotspot-markers-modal/provider/use-hotspot-markers-modal-context.tsx");
/* import */ var _Pimcore_modules_element_components_video_modal_provider_use_video_modal_context__rspack_import_6 = __webpack_require__("./js/src/core/modules/element/components/video-modal/provider/use-video-modal-context.tsx");
/* import */ var _registry_handler_registry__rspack_import_7 = __webpack_require__("./js/src/core/app/public-api/api-gateway/registry/handler-registry.ts");
/* import */ var _handlers__rspack_import_8 = __webpack_require__("./js/src/core/app/public-api/api-gateway/handlers/index.ts");
/* import */ var _api_gateway_event__rspack_import_9 = __webpack_require__("./js/src/core/app/public-api/api-gateway/api-gateway-event.ts");
/* import */ var lodash__rspack_import_10 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_10_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_10);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
var _s = $RefreshSig$();
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
 * This component listens for various requests from the public API
 * and dispatches them to appropriate handlers based on the event type.
 */ const ApiGateway = ()=>{
    _s();
    const elementSelectorHelper = (0,_Pimcore_modules_element_element_selector_provider_element_selector_use_element_selector_helper__rspack_import_1.useElementSelectorHelper)();
    const uploadModalContext = (0,_Pimcore_components_modal_upload_provider_upload_modal_provider_use_upload_modal_context__rspack_import_2.useUploadModalContext)();
    const linkModalContext = (0,_Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_link_provider_use_link_modal_context__rspack_import_3.useLinkModalContext)();
    const cropModalContext = (0,_Pimcore_modules_element_components_crop_modal_provider_use_crop_modal_context__rspack_import_4.useCropModalContext)();
    const hotspotMarkersModalContext = (0,_Pimcore_modules_element_components_hotspot_markers_modal_provider_use_hotspot_markers_modal_context__rspack_import_5.useHotspotMarkersModalContext)();
    const videoModalContext = (0,_Pimcore_modules_element_components_video_modal_provider_use_video_modal_context__rspack_import_6.useVideoModalContext)();
    // Initialize handlers on component mount
    (0,react__rspack_import_0.useEffect)(()=>{
        (0,_handlers__rspack_import_8.initializeHandlers)();
    }, []);
    (0,react__rspack_import_0.useEffect)(()=>{
        const handleApiEvent = (event)=>{
            // Type guard to ensure this is our custom ApiGatewayEvent
            if (!(event instanceof _api_gateway_event__rspack_import_9.ApiGatewayEvent)) {
                console.warn('Received non-ApiGatewayEvent on API gateway listener');
                return;
            }
            // Cast to CustomEvent to access detail with proper typing
            const customEvent = event;
            const { type, payload } = customEvent.detail;
            try {
                const handler = (0,_registry_handler_registry__rspack_import_7.getApiGatewayHandler)(type);
                if (!(0,lodash__rspack_import_10.isUndefined)(handler)) {
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
        window.addEventListener(_api_gateway_event__rspack_import_9.API_GATEWAY_EVENT, handleApiEvent);
        return ()=>{
            window.removeEventListener(_api_gateway_event__rspack_import_9.API_GATEWAY_EVENT, handleApiEvent);
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
        _Pimcore_modules_element_element_selector_provider_element_selector_use_element_selector_helper__rspack_import_1.useElementSelectorHelper,
        _Pimcore_components_modal_upload_provider_upload_modal_provider_use_upload_modal_context__rspack_import_2.useUploadModalContext,
        _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_link_provider_use_link_modal_context__rspack_import_3.useLinkModalContext,
        _Pimcore_modules_element_components_crop_modal_provider_use_crop_modal_context__rspack_import_4.useCropModalContext,
        _Pimcore_modules_element_components_hotspot_markers_modal_provider_use_hotspot_markers_modal_context__rspack_import_5.useHotspotMarkersModalContext,
        _Pimcore_modules_element_components_video_modal_provider_use_video_modal_context__rspack_import_6.useVideoModalContext
    ];
});
_c = ApiGateway;
var _c;
$RefreshReg$(_c, "ApiGateway");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/asset/editor/types/folder/tab-manager/tabs/listing/listing-container.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ListingContainer: () => (ListingContainer),
  TAB_LISTING: () => (TAB_LISTING)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var _Pimcore_modules_asset_listing_listing_container__rspack_import_1 = __webpack_require__("./js/src/core/modules/asset/listing/listing-container.tsx");
/* import */ var react__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_2);
/* import */ var _Pimcore_components_icon_icon__rspack_import_3 = __webpack_require__("./js/src/core/components/icon/icon.tsx");
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


const ListingContainer = ()=>{
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_asset_listing_listing_container__rspack_import_1.ListingContainer, {}, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/folder/tab-manager/tabs/listing/listing-container.tsx",
        lineNumber: 15,
        columnNumber: 10
    }, undefined);
};
_c = ListingContainer;
const TAB_LISTING = {
    key: 'listing',
    label: 'folder.folder-editor-tabs.view',
    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(ListingContainer, {}, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/folder/tab-manager/tabs/listing/listing-container.tsx",
        lineNumber: 20,
        columnNumber: 13
    }, undefined),
    icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_icon__rspack_import_3.Icon, {
        value: 'list'
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/folder/tab-manager/tabs/listing/listing-container.tsx",
        lineNumber: 21,
        columnNumber: 9
    }, undefined),
    isDetachable: false
};
var _c;
$RefreshReg$(_c, "ListingContainer");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/auth/profile/title/title-container.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TitleContainer: () => (TitleContainer)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _Pimcore_modules_widget_manager_title_tab_title_container__rspack_import_2 = __webpack_require__("./js/src/core/modules/widget-manager/title/tab-title-container.tsx");
/* import */ var _Pimcore_modules_auth_hooks_use_user__rspack_import_3 = __webpack_require__("./js/src/core/modules/auth/hooks/use-user.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 


const TitleContainer = (props)=>{
    _s();
    const { node } = props;
    const user = (0,_Pimcore_modules_auth_hooks_use_user__rspack_import_3.useUser)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_widget_manager_title_tab_title_container__rspack_import_2.TabTitleContainer, {
        modified: (user === null || user === void 0 ? void 0 : user.modified) ?? false,
        node: node
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/auth/profile/title/title-container.tsx",
        lineNumber: 19,
        columnNumber: 10
    }, undefined);
};
_s(TitleContainer, "BPnln+wUpxLjLAxQmw7xYz9C+QI=", false, function() {
    return [
        _Pimcore_modules_auth_hooks_use_user__rspack_import_3.useUser
    ];
});
_c = TitleContainer;
var _c;
$RefreshReg$(_c, "TitleContainer");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/auth/profile/widget.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  UserProfileWidget: () => (UserProfileWidget)
});
/* import */ var _Pimcore_modules_auth_profile_title_title_container__rspack_import_0 = __webpack_require__("./js/src/core/modules/auth/profile/title/title-container.tsx");
/* import */ var _Pimcore_modules_auth_profile_profile_container__rspack_import_1 = __webpack_require__("./js/src/core/modules/auth/profile/profile-container.tsx");
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

const UserProfileWidget = {
    name: 'user-profile',
    component: _Pimcore_modules_auth_profile_profile_container__rspack_import_1.ProfileContainer,
    titleComponent: _Pimcore_modules_auth_profile_title_title_container__rspack_import_0.TitleContainer
};

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/data-object/actions/add-object/use-add-object.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useAddObject: () => (useAddObject)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var _sdk_app__rspack_import_1 = __webpack_require__("./js/src/sdk/app/index.ts");
/* import */ var _Pimcore_components_element_tree_element_tree_slice__rspack_import_2 = __webpack_require__("./js/src/core/components/element-tree/element-tree-slice.ts");
/* import */ var _Pimcore_components_icon_icon__rspack_import_3 = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* import */ var _Pimcore_components_modal_form_modal_hooks_use_form_modal__rspack_import_4 = __webpack_require__("./js/src/core/components/modal/form-modal/hooks/use-form-modal.tsx");
/* import */ var _Pimcore_modules_app_error_handler__rspack_import_5 = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* import */ var _Pimcore_modules_class_definition_class_definition_slice_gen__rspack_import_6 = __webpack_require__("./js/src/core/modules/class-definition/class-definition-slice.gen.ts");
/* import */ var _Pimcore_modules_element_permissions_permission_helper__rspack_import_7 = __webpack_require__("./js/src/core/modules/element/permissions/permission-helper.ts");
/* import */ var _Pimcore_components_element_tree_provider_tree_permission_provider_use_tree_permission__rspack_import_8 = __webpack_require__("./js/src/core/components/element-tree/provider/tree-permission-provider/use-tree-permission.ts");
/* import */ var _Pimcore_components_element_tree_provider_tree_filter_provider_use_tree_filter__rspack_import_9 = __webpack_require__("./js/src/core/components/element-tree/provider/tree-filter-provider/use-tree-filter.ts");
/* import */ var _Pimcore_modules_perspectives_enums_tree_permission__rspack_import_10 = __webpack_require__("./js/src/core/modules/perspectives/enums/tree-permission.ts");
/* import */ var _Pimcore_modules_auth_permission_helper__rspack_import_11 = __webpack_require__("./js/src/core/modules/auth/permission-helper.ts");
/* import */ var _Pimcore_modules_auth_enums_user_permission__rspack_import_12 = __webpack_require__("./js/src/core/modules/auth/enums/user-permission.ts");
/* import */ var lodash__rspack_import_13 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_13_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_13);
/* import */ var react__rspack_import_14 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_14_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_14);
/* import */ var _Pimcore_components_spin_spin__rspack_import_15 = __webpack_require__("./js/src/core/components/spin/spin.tsx");
/* import */ var react_i18next__rspack_import_16 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_16_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_16);
/* import */ var _data_object_api_slice_gen__rspack_import_17 = __webpack_require__("./js/src/core/modules/data-object/data-object-api-slice.gen.ts");
/* import */ var _hooks_use_data_object_helper__rspack_import_18 = __webpack_require__("./js/src/core/modules/data-object/hooks/use-data-object-helper.ts");
/* import */ var _Pimcore_modules_element_actions__rspack_import_19 = __webpack_require__("./js/src/core/modules/element/actions/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 


















const useAddObject = ()=>{
    _s();
    const { t } = (0,react_i18next__rspack_import_16.useTranslation)();
    const modal = (0,_Pimcore_components_modal_form_modal_hooks_use_form_modal__rspack_import_4.useFormModal)();
    const [addDataObjectMutation] = (0,_data_object_api_slice_gen__rspack_import_17.useDataObjectAddMutation)();
    const dispatch = (0,_sdk_app__rspack_import_1.useAppDispatch)();
    const { openDataObject } = (0,_hooks_use_data_object_helper__rspack_import_18.useDataObjectHelper)();
    const { isTreeActionAllowed } = (0,_Pimcore_components_element_tree_provider_tree_permission_provider_use_tree_permission__rspack_import_8.useTreePermission)();
    const { classIds: allowedClassIds } = (0,_Pimcore_components_element_tree_provider_tree_filter_provider_use_tree_filter__rspack_import_9.useTreeFilter)();
    // the creatable collection only contains the classes the current user may create
    const { data: creatableClasses, isLoading, error } = (0,_Pimcore_modules_class_definition_class_definition_slice_gen__rspack_import_6.useClassDefinitionCollectionCreatableQuery)(undefined, {
        skip: !(0,_Pimcore_modules_auth_permission_helper__rspack_import_11.isAllowed)(_Pimcore_modules_auth_enums_user_permission__rspack_import_12.UserPermission.Objects)
    });
    (0,react__rspack_import_14.useEffect)(()=>{
        if (!(0,lodash__rspack_import_13.isNil)(error)) {
            (0,_Pimcore_modules_app_error_handler__rspack_import_5["default"])(new _Pimcore_modules_app_error_handler__rspack_import_5.ApiError(error));
        }
    }, [
        error
    ]);
    // element tree widgets can additionally restrict the creatable classes via their `classes` allowlist
    const getAvailableClassDefinitions = ()=>{
        const classDefinitions = (creatableClasses === null || creatableClasses === void 0 ? void 0 : creatableClasses.items) ?? [];
        if (allowedClassIds === undefined || allowedClassIds.length === 0) {
            return classDefinitions;
        }
        return classDefinitions.filter((classDefinition)=>allowedClassIds.includes(classDefinition.id));
    };
    const getClassEntries = (node)=>{
        if (isLoading) {
            return [
                {
                    key: 'add-object-loading',
                    type: 'custom',
                    component: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_spin_spin__rspack_import_15.Spin, {
                        type: "classic"
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/actions/add-object/use-add-object.tsx",
                        lineNumber: 73,
                        columnNumber: 20
                    }, undefined)
                }
            ];
        }
        let classHierarchy = [];
        const classDefinitions = getAvailableClassDefinitions();
        const structuredClassDefinitions = [
            ...classDefinitions
        ].sort((a, b)=>t(a.name).localeCompare(t(b.name), undefined, {
                sensitivity: 'base'
            })).reduce((acc, classDefinition)=>{
            const groupName = (0,lodash__rspack_import_13.isNil)(classDefinition.group) || (0,lodash__rspack_import_13.isEmpty)(classDefinition.group) ? 'undefined' : classDefinition.group;
            // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
            if (acc[groupName] === undefined) {
                acc[groupName] = [];
            }
            acc[groupName].push(classDefinition);
            return acc;
        }, {});
        if (structuredClassDefinitions.undefined !== undefined) {
            classHierarchy = structuredClassDefinitions.undefined.map((classDefinition)=>getDataObjectEntry(classDefinition, node));
        }
        const sortedGroups = Object.entries(structuredClassDefinitions).sort((param, param1)=>{
            let [groupA] = param, [groupB] = param1;
            return t(groupA).localeCompare(t(groupB), undefined, {
                sensitivity: 'base'
            });
        });
        for (const [group, classDefinitions] of sortedGroups){
            if (group !== 'undefined') {
                classHierarchy.push({
                    label: t(group),
                    key: 'add-object-group-' + group,
                    icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_icon__rspack_import_3.Icon, {
                        value: 'folder'
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/actions/add-object/use-add-object.tsx",
                        lineNumber: 101,
                        columnNumber: 17
                    }, undefined),
                    children: classDefinitions.map((classDefinition)=>getDataObjectEntry(classDefinition, node))
                });
            }
        }
        return classHierarchy;
    };
    const getDataObjectEntry = (classDefinition, node)=>{
        return {
            label: t(classDefinition.name),
            key: classDefinition.id,
            icon: classDefinition.icon.value === 'class' ? /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_icon__rspack_import_3.Icon, {
                subIconName: "new",
                subIconVariant: 'green',
                value: "data-object"
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/actions/add-object/use-add-object.tsx",
                lineNumber: 112,
                columnNumber: 54
            }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_icon__rspack_import_3.Icon, {
                subIconName: "new",
                subIconVariant: 'green',
                ...classDefinition.icon
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/actions/add-object/use-add-object.tsx",
                lineNumber: 112,
                columnNumber: 128
            }, undefined),
            onClick: ()=>{
                const parentId = parseInt(node.id);
                createDataObject(classDefinition, parentId);
            }
        };
    };
    const addObject = (className, classId, parentId, onFinish)=>{
        modal.input({
            title: t('data-object.create-data-object', {
                className
            }),
            label: t('form.label.new-item'),
            rule: {
                required: true,
                message: t('form.validation.required')
            },
            onOk: async (value)=>{
                await createDataObjectMutation(classId, value, parentId);
                onFinish === null || onFinish === void 0 ? void 0 : onFinish(value);
            }
        });
    };
    const createDataObject = (classDefinition, parentId, onFinish)=>{
        addObject(classDefinition.name, classDefinition.id, parentId, onFinish);
    };
    const createDataObjectMutation = async (classId, name, parentId)=>{
        const createDataObjectTask = addDataObjectMutation({
            parentId,
            dataObjectAddParameters: {
                key: name,
                classId,
                type: 'object'
            }
        });
        try {
            const response = await createDataObjectTask;
            if (response.error !== undefined) {
                (0,_Pimcore_modules_app_error_handler__rspack_import_5["default"])(new _Pimcore_modules_app_error_handler__rspack_import_5.ApiError(response.error));
                return;
            }
            const { id } = response.data;
            void openDataObject({
                config: {
                    id
                }
            });
            dispatch((0,_Pimcore_components_element_tree_element_tree_slice__rspack_import_2.refreshNodeChildren)({
                nodeId: String(parentId),
                elementType: 'data-object'
            }));
        } catch (error) {
            (0,_Pimcore_modules_app_error_handler__rspack_import_5["default"])(new _Pimcore_modules_app_error_handler__rspack_import_5.GeneralError('Error creating data object'));
        }
    };
    const isAddObjectHidden = (node)=>{
        return !isTreeActionAllowed(_Pimcore_modules_perspectives_enums_tree_permission__rspack_import_10.TreePermission.AddObject) || !(0,_Pimcore_modules_element_permissions_permission_helper__rspack_import_7.checkElementPermission)(node.permissions, 'create') || !isLoading && (0,lodash__rspack_import_13.isEmpty)(getAvailableClassDefinitions());
    };
    const addObjectTreeContextMenuItem = (node)=>{
        return {
            label: t('data-object.tree.context-menu.add-object'),
            key: _Pimcore_modules_element_actions__rspack_import_19.ContextMenuActionName.addObject,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_icon__rspack_import_3.Icon, {
                value: 'folder'
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/actions/add-object/use-add-object.tsx",
                lineNumber: 176,
                columnNumber: 13
            }, undefined),
            hidden: isAddObjectHidden(node),
            children: getClassEntries(node)
        };
    };
    return {
        addObjectTreeContextMenuItem,
        addObject
    };
};
_s(useAddObject, "qv5unGGaJ3nUi62laZymbxO9AE4=", false, function() {
    return [
        react_i18next__rspack_import_16.useTranslation,
        _Pimcore_components_modal_form_modal_hooks_use_form_modal__rspack_import_4.useFormModal,
        _data_object_api_slice_gen__rspack_import_17.useDataObjectAddMutation,
        _sdk_app__rspack_import_1.useAppDispatch,
        _hooks_use_data_object_helper__rspack_import_18.useDataObjectHelper,
        _Pimcore_components_element_tree_provider_tree_permission_provider_use_tree_permission__rspack_import_8.useTreePermission,
        _Pimcore_components_element_tree_provider_tree_filter_provider_use_tree_filter__rspack_import_9.useTreeFilter,
        _Pimcore_modules_class_definition_class_definition_slice_gen__rspack_import_6.useClassDefinitionCollectionCreatableQuery
    ];
});

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/data-object/editor/editor-container.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  EditorContainer: () => (EditorContainer)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _Pimcore_modules_data_object_editor_editor_container_editor_container_inner__rspack_import_2 = __webpack_require__("./js/src/core/modules/data-object/editor/editor-container/editor-container-inner.tsx");
/* import */ var _Pimcore_modules_data_object_hooks_use_custom_layouts__rspack_import_3 = __webpack_require__("./js/src/core/modules/data-object/hooks/use-custom-layouts.ts");
/* import */ var _Pimcore_modules_data_object_editor_toolbar_context_menu_provider_layout_selection_provider__rspack_import_4 = __webpack_require__("./js/src/core/modules/data-object/editor/toolbar/context-menu/provider/layout-selection-provider.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 



const EditorContainer = (param)=>{
    let { id } = param;
    _s();
    const { getDefaultLayoutId, isLoading } = (0,_Pimcore_modules_data_object_hooks_use_custom_layouts__rspack_import_3.useCustomLayouts)(id);
    const defaultLayoutId = getDefaultLayoutId();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_data_object_editor_toolbar_context_menu_provider_layout_selection_provider__rspack_import_4.LayoutSelectionProvider, {
        defaultLayout: defaultLayoutId,
        isLoading: isLoading,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_data_object_editor_editor_container_editor_container_inner__rspack_import_2.EditorContainerInner, {
            id: id
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/editor-container.tsx",
            lineNumber: 24,
            columnNumber: 7
        }, undefined)
    }, defaultLayoutId, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/editor-container.tsx",
        lineNumber: 23,
        columnNumber: 10
    }, undefined);
};
_s(EditorContainer, "yxwzD4/aHSsQmsTK8HpSxunojgw=", false, function() {
    return [
        _Pimcore_modules_data_object_hooks_use_custom_layouts__rspack_import_3.useCustomLayouts
    ];
});
_c = EditorContainer;

var _c;
$RefreshReg$(_c, "EditorContainer");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/data-object/editor/editor-container/editor-container-inner.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  EditorContainerInner: () => (EditorContainerInner)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var lodash__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_2);
/* import */ var _Pimcore_modules_widget_manager_hooks_use_is_active_main_widget__rspack_import_3 = __webpack_require__("./js/src/core/modules/widget-manager/hooks/use-is-active-main-widget.ts");
/* import */ var _data_object_provider__rspack_import_4 = __webpack_require__("./js/src/core/modules/data-object/data-object-provider.tsx");
/* import */ var _Pimcore_components_content_content__rspack_import_5 = __webpack_require__("./js/src/core/components/content/content.tsx");
/* import */ var _Pimcore_modules_data_object_hooks_use_data_object_draft__rspack_import_6 = __webpack_require__("./js/src/core/modules/data-object/hooks/use-data-object-draft.ts");
/* import */ var _Pimcore_modules_data_object_hooks_use_global_data_object_context__rspack_import_7 = __webpack_require__("./js/src/core/modules/data-object/hooks/use-global-data-object-context.ts");
/* import */ var _Pimcore_modules_element_editor_shared_tab_manager_tabs_container__rspack_import_8 = __webpack_require__("./js/src/core/modules/element/editor/shared-tab-manager/tabs-container.tsx");
/* import */ var _Pimcore_modules_data_object_editor_toolbar_toolbar__rspack_import_9 = __webpack_require__("./js/src/core/modules/data-object/editor/toolbar/toolbar.tsx");
/* import */ var _Pimcore_modules_element_editor_layouts_tabs_toolbar_view__rspack_import_10 = __webpack_require__("./js/src/core/modules/element/editor/layouts/tabs-toolbar-view.tsx");
/* import */ var _Pimcore_components_language_selection_provider_language_selection_provider__rspack_import_11 = __webpack_require__("./js/src/core/components/language-selection/provider/language-selection-provider.tsx");
/* import */ var _Pimcore_modules_data_object_editor_types_object_tab_manager_tabs_edit_providers_edit_form_provider_edit_form_provider__rspack_import_12 = __webpack_require__("./js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/edit-form-provider/edit-form-provider.tsx");
/* import */ var _Pimcore_modules_data_object_editor_types_object_tab_manager_tabs_edit_providers_inheritance_state_provider_inheritance_state_provider__rspack_import_13 = __webpack_require__("./js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/inheritance-state-provider/inheritance-state-provider.tsx");
/* import */ var _Pimcore_modules_data_object_editor_types_object_tab_manager_tabs_edit_providers_save_provider_save_provider__rspack_import_14 = __webpack_require__("./js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/save-provider/save-provider.tsx");
/* import */ var _Pimcore_components_alert_alert__rspack_import_15 = __webpack_require__("./js/src/core/components/alert/alert.tsx");
/* import */ var _Pimcore_utils_test_id_generator__rspack_import_16 = __webpack_require__("./js/src/core/utils/test-id-generator.ts");
/* import */ var _Pimcore_utils_global_context_identifiers__rspack_import_17 = __webpack_require__("./js/src/core/utils/global-context-identifiers.ts");
/* import */ var _Pimcore_modules_asset_editor_types_folder_tab_manager_tabs_listing_listing_container__rspack_import_18 = __webpack_require__("./js/src/core/modules/asset/editor/types/folder/tab-manager/tabs/listing/listing-container.tsx");
/* import */ var _Pimcore_modules_element_hooks_use_edit_lock__rspack_import_19 = __webpack_require__("./js/src/core/modules/element/hooks/use-edit-lock.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 


















const EditorContainerInner = (props)=>{
    _s();
    const { id } = props;
    const { isLoading, isError, dataObject, editorType, activeTab } = (0,_Pimcore_modules_data_object_hooks_use_data_object_draft__rspack_import_6.useDataObjectDraft)(id);
    const isWidgetActive = (0,_Pimcore_modules_widget_manager_hooks_use_is_active_main_widget__rspack_import_3.useIsActiveMainWidget)();
    const { setContext, removeContext } = (0,_Pimcore_modules_data_object_hooks_use_global_data_object_context__rspack_import_7.useGlobalDataObjectContext)();
    (0,_Pimcore_modules_element_hooks_use_edit_lock__rspack_import_19.useEditLock)({
        id,
        elementType: 'data-object',
        modified: (dataObject === null || dataObject === void 0 ? void 0 : dataObject.modified) ?? false,
        path: dataObject === null || dataObject === void 0 ? void 0 : dataObject.fullPath
    });
    (0,react__rspack_import_1.useEffect)(()=>{
        return ()=>{
            removeContext();
        };
    }, []);
    (0,react__rspack_import_1.useEffect)(()=>{
        if (isWidgetActive) {
            setContext({
                id,
                ...!(0,lodash__rspack_import_2.isNil)(dataObject) && {
                    contextIdentifiers: (0,_Pimcore_utils_global_context_identifiers__rspack_import_17.getBaseDataObjectContextIdentifiers)(dataObject, activeTab === _Pimcore_modules_asset_editor_types_folder_tab_manager_tabs_listing_listing_container__rspack_import_18.TAB_LISTING.key)
                }
            });
        }
        return ()=>{
            if (!isWidgetActive) {
                removeContext();
            }
        };
    }, [
        isWidgetActive,
        activeTab,
        dataObject
    ]);
    if (isLoading) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_content_content__rspack_import_5.Content, {
            loading: true
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/editor-container/editor-container-inner.tsx",
            lineNumber: 73,
            columnNumber: 12
        }, undefined);
    }
    if (isError) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_content_content__rspack_import_5.Content, {
            padded: true,
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_alert_alert__rspack_import_15.Alert, {
                message: "Error: Loading of data object failed",
                type: "error"
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/editor-container/editor-container-inner.tsx",
                lineNumber: 77,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/editor-container/editor-container-inner.tsx",
            lineNumber: 76,
            columnNumber: 12
        }, undefined);
    }
    if (dataObject === undefined || editorType === undefined) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(react_jsx_dev_runtime__rspack_import_0.Fragment, {}, void 0, false);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_data_object_provider__rspack_import_4.DataObjectProvider, {
        id: id,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_data_object_editor_types_object_tab_manager_tabs_edit_providers_save_provider_save_provider__rspack_import_14.SaveProvider, {
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_data_object_editor_types_object_tab_manager_tabs_edit_providers_edit_form_provider_edit_form_provider__rspack_import_12.EditFormProvider, {
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_data_object_editor_types_object_tab_manager_tabs_edit_providers_inheritance_state_provider_inheritance_state_provider__rspack_import_13.InheritanceStateProvider, {
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_language_selection_provider_language_selection_provider__rspack_import_11.LanguageSelectionProvider, {
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_element_editor_layouts_tabs_toolbar_view__rspack_import_10.TabsToolbarView, {
                            dataTestId: `data-object-editor-${(0,_Pimcore_utils_test_id_generator__rspack_import_16.createSafeTestIdString)(id.toString())}`,
                            renderTabbar: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_element_editor_shared_tab_manager_tabs_container__rspack_import_8.TabsContainer, {
                                elementEditorType: editorType
                            }, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/editor-container/editor-container-inner.tsx",
                                lineNumber: 88,
                                columnNumber: 121
                            }, undefined),
                            renderToolbar: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_data_object_editor_toolbar_toolbar__rspack_import_9.Toolbar, {}, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/editor-container/editor-container-inner.tsx",
                                lineNumber: 88,
                                columnNumber: 186
                            }, undefined)
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/editor-container/editor-container-inner.tsx",
                            lineNumber: 88,
                            columnNumber: 15
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/editor-container/editor-container-inner.tsx",
                        lineNumber: 87,
                        columnNumber: 13
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/editor-container/editor-container-inner.tsx",
                    lineNumber: 86,
                    columnNumber: 11
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/editor-container/editor-container-inner.tsx",
                lineNumber: 85,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/editor-container/editor-container-inner.tsx",
            lineNumber: 84,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/editor-container/editor-container-inner.tsx",
        lineNumber: 83,
        columnNumber: 10
    }, undefined);
};
_s(EditorContainerInner, "JPggmkzXdD5J9aw11zWU9DwEs3U=", false, function() {
    return [
        _Pimcore_modules_data_object_hooks_use_data_object_draft__rspack_import_6.useDataObjectDraft,
        _Pimcore_modules_widget_manager_hooks_use_is_active_main_widget__rspack_import_3.useIsActiveMainWidget,
        _Pimcore_modules_data_object_hooks_use_global_data_object_context__rspack_import_7.useGlobalDataObjectContext,
        _Pimcore_modules_element_hooks_use_edit_lock__rspack_import_19.useEditLock
    ];
});
_c = EditorContainerInner;

var _c;
$RefreshReg$(_c, "EditorContainerInner");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/data-object/editor/title/title-container.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TitleContainer: () => (TitleContainer)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _Pimcore_modules_widget_manager_title_tab_title_container__rspack_import_2 = __webpack_require__("./js/src/core/modules/widget-manager/title/tab-title-container.tsx");
/* import */ var _Pimcore_modules_data_object_hooks_use_data_object_draft__rspack_import_3 = __webpack_require__("./js/src/core/modules/data-object/hooks/use-data-object-draft.ts");
/* import */ var react_i18next__rspack_import_4 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_4_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_4);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 



const TitleContainer = (props)=>{
    _s();
    const { node } = props;
    const { dataObject } = (0,_Pimcore_modules_data_object_hooks_use_data_object_draft__rspack_import_3.useDataObjectDraft)(node.getConfig().id);
    const { t } = (0,react_i18next__rspack_import_4.useTranslation)();
    const nodeName = node.getName();
    node.getName = ()=>{
        if ((dataObject === null || dataObject === void 0 ? void 0 : dataObject.parentId) === 0) {
            node.getName = ()=>t('home');
        }
        return (dataObject === null || dataObject === void 0 ? void 0 : dataObject.key) ?? nodeName;
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_widget_manager_title_tab_title_container__rspack_import_2.TabTitleContainer, {
        modified: (dataObject === null || dataObject === void 0 ? void 0 : dataObject.modified) ?? false,
        node: node
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/title/title-container.tsx",
        lineNumber: 32,
        columnNumber: 10
    }, undefined);
};
_s(TitleContainer, "FXFEc6BtxaeTESg8NhgqDkZuLFE=", false, function() {
    return [
        _Pimcore_modules_data_object_hooks_use_data_object_draft__rspack_import_3.useDataObjectDraft,
        react_i18next__rspack_import_4.useTranslation
    ];
});
_c = TitleContainer;
var _c;
$RefreshReg$(_c, "TitleContainer");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/data-object/editor/toolbar/context-menu/provider/layout-selection-provider.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  LayoutSelectionContext: () => (LayoutSelectionContext),
  LayoutSelectionProvider: () => (LayoutSelectionProvider)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _Pimcore_components_content_content__rspack_import_2 = __webpack_require__("./js/src/core/components/content/content.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 

const LayoutSelectionContext = /*#__PURE__*/ (0,react__rspack_import_1.createContext)({
    currentLayout: null,
    setCurrentLayout: ()=>{}
});
const LayoutSelectionProvider = (param)=>{
    let { children, defaultLayout, isLoading } = param;
    _s();
    const [currentLayout, setCurrentLayout] = (0,react__rspack_import_1.useState)(null);
    const isInitializedRef = (0,react__rspack_import_1.useRef)(false);
    (0,react__rspack_import_1.useEffect)(()=>{
        if (!isInitializedRef.current && !isLoading && defaultLayout !== null) {
            setCurrentLayout(defaultLayout);
            isInitializedRef.current = true;
        }
    }, [
        defaultLayout,
        isLoading
    ]);
    const value = (0,react__rspack_import_1.useMemo)(()=>({
            currentLayout,
            setCurrentLayout
        }), [
        currentLayout
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(LayoutSelectionContext.Provider, {
        value: value,
        children: isLoading ? /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_content_content__rspack_import_2.Content, {
            loading: true
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/toolbar/context-menu/provider/layout-selection-provider.tsx",
            lineNumber: 35,
            columnNumber: 20
        }, undefined) : children
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/toolbar/context-menu/provider/layout-selection-provider.tsx",
        lineNumber: 34,
        columnNumber: 10
    }, undefined);
};
_s(LayoutSelectionProvider, "Xa+WCP1AVEKu66dD9mXJQYMSD/0=");
_c = LayoutSelectionProvider;
var _c;
$RefreshReg$(_c, "LayoutSelectionProvider");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/data-object/editor/toolbar/context-menu/provider/use-layout-selection.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useLayoutSelection: () => (useLayoutSelection)
});
/* import */ var react__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var _Pimcore_modules_data_object_editor_toolbar_context_menu_provider_layout_selection_provider__rspack_import_1 = __webpack_require__("./js/src/core/modules/data-object/editor/toolbar/context-menu/provider/layout-selection-provider.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 

const useLayoutSelection = ()=>{
    _s();
    return (0,react__rspack_import_0.useContext)(_Pimcore_modules_data_object_editor_toolbar_context_menu_provider_layout_selection_provider__rspack_import_1.LayoutSelectionContext);
};
_s(useLayoutSelection, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/data-object/editor/toolbar/language-selection/language-selection.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  LanguageSelection: () => (LanguageSelection)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _Pimcore_components_language_selection_provider_use_language_selection__rspack_import_2 = __webpack_require__("./js/src/core/components/language-selection/provider/use-language-selection.tsx");
/* import */ var _Pimcore_modules_element_components_language_selection_permission_based_language_selection__rspack_import_3 = __webpack_require__("./js/src/core/modules/element/components/language-selection/permission-based-language-selection.tsx");
/* import */ var _Pimcore_modules_data_object_data_object_provider__rspack_import_4 = __webpack_require__("./js/src/core/modules/data-object/data-object-provider.tsx");
/* import */ var _Pimcore_modules_data_object_hooks_use_data_object_draft__rspack_import_5 = __webpack_require__("./js/src/core/modules/data-object/hooks/use-data-object-draft.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 




const LanguageSelection = ()=>{
    _s();
    const { hasLocalizedFields } = (0,_Pimcore_components_language_selection_provider_use_language_selection__rspack_import_2.useLanguageSelection)();
    const { id } = (0,react__rspack_import_1.useContext)(_Pimcore_modules_data_object_data_object_provider__rspack_import_4.DataObjectContext);
    const { editorType } = (0,_Pimcore_modules_data_object_hooks_use_data_object_draft__rspack_import_5.useDataObjectDraft)(id);
    if (hasLocalizedFields || (editorType === null || editorType === void 0 ? void 0 : editorType.name) === 'folder') {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_element_components_language_selection_permission_based_language_selection__rspack_import_3.PermissionBasedLanguageSelection, {}, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/toolbar/language-selection/language-selection.tsx",
            lineNumber: 27,
            columnNumber: 12
        }, undefined);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(react_jsx_dev_runtime__rspack_import_0.Fragment, {}, void 0, false);
};
_s(LanguageSelection, "lIJ7jviD/ABi1jXt+BxBKpQOnIk=", false, function() {
    return [
        _Pimcore_components_language_selection_provider_use_language_selection__rspack_import_2.useLanguageSelection,
        _Pimcore_modules_data_object_hooks_use_data_object_draft__rspack_import_5.useDataObjectDraft
    ];
});
_c = LanguageSelection;
var _c;
$RefreshReg$(_c, "LanguageSelection");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/data-object/editor/toolbar/toolbar.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Toolbar: () => (Toolbar)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _Pimcore_components_toolbar_toolbar__rspack_import_2 = __webpack_require__("./js/src/core/components/toolbar/toolbar.tsx");
/* import */ var _Pimcore_components_flex_flex__rspack_import_3 = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* import */ var _Pimcore_modules_element_editor_shared_components_workflow_modal_workflow_modal__rspack_import_4 = __webpack_require__("./js/src/core/modules/element/editor/shared-components/workflow/modal/workflow-modal.tsx");
/* import */ var _Pimcore_modules_element_editor_shared_components_workflow_provider_workflow_provider__rspack_import_5 = __webpack_require__("./js/src/core/modules/element/editor/shared-components/workflow/provider/workflow-provider.tsx");
/* import */ var _Pimcore_modules_app_component_registry_component_config__rspack_import_6 = __webpack_require__("./js/src/core/modules/app/component-registry/component-config.tsx");
/* import */ var _Pimcore_modules_app_component_registry_slot_renderer__rspack_import_7 = __webpack_require__("./js/src/core/modules/app/component-registry/slot-renderer.tsx");
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






const Toolbar = ()=>{
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_toolbar_toolbar__rspack_import_2.Toolbar, {
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_element_editor_shared_components_workflow_provider_workflow_provider__rspack_import_5.WorkFlowProvider, {
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_flex_flex__rspack_import_3.Flex, {
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_app_component_registry_slot_renderer__rspack_import_7.SlotRenderer, {
                        slot: _Pimcore_modules_app_component_registry_component_config__rspack_import_6.componentConfig.dataObject.editor.toolbar.slots.left.name
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/toolbar/toolbar.tsx",
                        lineNumber: 22,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/toolbar/toolbar.tsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_flex_flex__rspack_import_3.Flex, {
                    align: "center",
                    gap: 'extra-small',
                    style: {
                        height: '32px'
                    },
                    vertical: false,
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_app_component_registry_slot_renderer__rspack_import_7.SlotRenderer, {
                        slot: _Pimcore_modules_app_component_registry_component_config__rspack_import_6.componentConfig.dataObject.editor.toolbar.slots.right.name
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/toolbar/toolbar.tsx",
                        lineNumber: 28,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/toolbar/toolbar.tsx",
                    lineNumber: 25,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_element_editor_shared_components_workflow_modal_workflow_modal__rspack_import_4.WorkflowModal, {}, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/toolbar/toolbar.tsx",
                    lineNumber: 30,
                    columnNumber: 9
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/toolbar/toolbar.tsx",
            lineNumber: 20,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/toolbar/toolbar.tsx",
        lineNumber: 19,
        columnNumber: 10
    }, undefined);
};
_c = Toolbar;
var _c;
$RefreshReg$(_c, "Toolbar");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/data-object/editor/widget.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DataObjectEditorWidget: () => (DataObjectEditorWidget)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var _Pimcore_modules_data_object_editor_editor_container__rspack_import_1 = __webpack_require__("./js/src/core/modules/data-object/editor/editor-container.tsx");
/* import */ var _Pimcore_modules_data_object_editor_title_title_container__rspack_import_2 = __webpack_require__("./js/src/core/modules/data-object/editor/title/title-container.tsx");
/* import */ var _Pimcore_app_store__rspack_import_3 = __webpack_require__("./js/src/core/app/store/index.ts");
/* import */ var react__rspack_import_4 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_4_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_4);
/* import */ var _Pimcore_modules_data_object_data_object_provider__rspack_import_5 = __webpack_require__("./js/src/core/modules/data-object/data-object-provider.tsx");
/* import */ var _Pimcore_modules_data_object_data_object_draft_slice__rspack_import_6 = __webpack_require__("./js/src/core/modules/data-object/data-object-draft-slice.tsx");
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





const DataObjectEditorWidget = {
    name: 'data-object-editor',
    component: _Pimcore_modules_data_object_editor_editor_container__rspack_import_1.EditorContainer,
    titleComponent: _Pimcore_modules_data_object_editor_title_title_container__rspack_import_2.TitleContainer,
    defaultGlobalContext: false,
    isModified: (tabNode)=>{
        const config = tabNode.getConfig();
        const dataObject = (0,_Pimcore_modules_data_object_data_object_draft_slice__rspack_import_6.selectDataObjectById)(_Pimcore_app_store__rspack_import_3.store.getState(), config.id);
        return (dataObject === null || dataObject === void 0 ? void 0 : dataObject.modified) ?? false;
    },
    getContextProvider: (context, children)=>{
        const config = context.config;
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_data_object_data_object_provider__rspack_import_5.DataObjectProvider, {
            id: config.id,
            children: children
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/widget.tsx",
            lineNumber: 29,
            columnNumber: 12
        }, undefined);
    }
};

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/data-object/listing/column-mapper/use-column-mapper.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useDataObjectColumnMapper: () => (useDataObjectColumnMapper)
});
/* import */ var react__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var _Pimcore_components_language_selection__rspack_import_1 = __webpack_require__("./js/src/core/components/language-selection/index.ts");
/* import */ var _Pimcore_modules_element_listing_abstract_configuration_layer_provider_selected_columns_use_column_mapper__rspack_import_2 = __webpack_require__("./js/src/core/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-column-mapper.tsx");
/* import */ var _Pimcore_utils_uuid__rspack_import_3 = __webpack_require__("./js/src/core/utils/uuid.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 



const useDataObjectColumnMapper = ()=>{
    _s();
    const languageSelection = (0,_Pimcore_components_language_selection__rspack_import_1.useLanguageSelection)();
    const currentLanguageRef = (0,react__rspack_import_0.useRef)(languageSelection.currentLanguage);
    const { shouldMapDataToColumn: baseShouldMapDataToColumn, encodeColumnIdentifier: baseEncodeColumnIdentifier, decodeColumnIdentifier: baseDecodeColumnIdentifier, ...props } = (0,_Pimcore_modules_element_listing_abstract_configuration_layer_provider_selected_columns_use_column_mapper__rspack_import_2.useColumnMapper)();
    currentLanguageRef.current = languageSelection.currentLanguage;
    const shouldMapDataToColumn = (0,react__rspack_import_0.useCallback)((data, column)=>{
        const currentLanguage = currentLanguageRef.current;
        if (column.type === 'dataobject.classificationstore') {
            var _data_additionalAttributes, _column_config, _data_additionalAttributes1, _column_config1;
            const dataKey = data.key.split('.')[0];
            if (column.localizable && column.locale === 'default') {
                var _data_additionalAttributes2, _column_config2, _data_additionalAttributes3, _column_config3;
                return dataKey === column.key && ((_data_additionalAttributes2 = data.additionalAttributes) === null || _data_additionalAttributes2 === void 0 ? void 0 : _data_additionalAttributes2.keyId) === ((_column_config2 = column.config) === null || _column_config2 === void 0 ? void 0 : _column_config2.keyId) && ((_data_additionalAttributes3 = data.additionalAttributes) === null || _data_additionalAttributes3 === void 0 ? void 0 : _data_additionalAttributes3.groupId) === ((_column_config3 = column.config) === null || _column_config3 === void 0 ? void 0 : _column_config3.groupId) && data.locale === null;
            }
            if (column.localizable && (column.locale === null || column.locale === undefined)) {
                var _data_additionalAttributes4, _column_config4, _data_additionalAttributes5, _column_config5;
                return dataKey === column.key && ((_data_additionalAttributes4 = data.additionalAttributes) === null || _data_additionalAttributes4 === void 0 ? void 0 : _data_additionalAttributes4.keyId) === ((_column_config4 = column.config) === null || _column_config4 === void 0 ? void 0 : _column_config4.keyId) && ((_data_additionalAttributes5 = data.additionalAttributes) === null || _data_additionalAttributes5 === void 0 ? void 0 : _data_additionalAttributes5.groupId) === ((_column_config5 = column.config) === null || _column_config5 === void 0 ? void 0 : _column_config5.groupId) && data.locale === currentLanguage;
            }
            if (column.localizable) {
                var _data_additionalAttributes6, _column_config6, _data_additionalAttributes7, _column_config7;
                return dataKey === column.key && ((_data_additionalAttributes6 = data.additionalAttributes) === null || _data_additionalAttributes6 === void 0 ? void 0 : _data_additionalAttributes6.keyId) === ((_column_config6 = column.config) === null || _column_config6 === void 0 ? void 0 : _column_config6.keyId) && ((_data_additionalAttributes7 = data.additionalAttributes) === null || _data_additionalAttributes7 === void 0 ? void 0 : _data_additionalAttributes7.groupId) === ((_column_config7 = column.config) === null || _column_config7 === void 0 ? void 0 : _column_config7.groupId) && data.locale === column.locale;
            }
            return dataKey === column.key && ((_data_additionalAttributes = data.additionalAttributes) === null || _data_additionalAttributes === void 0 ? void 0 : _data_additionalAttributes.keyId) === ((_column_config = column.config) === null || _column_config === void 0 ? void 0 : _column_config.keyId) && ((_data_additionalAttributes1 = data.additionalAttributes) === null || _data_additionalAttributes1 === void 0 ? void 0 : _data_additionalAttributes1.groupId) === ((_column_config1 = column.config) === null || _column_config1 === void 0 ? void 0 : _column_config1.groupId);
        }
        if (column.localizable && (column.locale === null || column.locale === undefined)) {
            return data.key === column.key && currentLanguage === data.locale;
        }
        return baseShouldMapDataToColumn(data, column);
    }, [
        baseShouldMapDataToColumn
    ]);
    const encodeColumnIdentifier = (0,react__rspack_import_0.useCallback)((column)=>{
        if (column.type === 'dataobject.classificationstore') {
            var _column_config, _column_config1;
            return JSON.stringify({
                uuid: (0,_Pimcore_utils_uuid__rspack_import_3.uuid)(),
                key: column.key,
                keyId: (_column_config = column.config) === null || _column_config === void 0 ? void 0 : _column_config.keyId,
                groupId: (_column_config1 = column.config) === null || _column_config1 === void 0 ? void 0 : _column_config1.groupId,
                locale: column.locale ?? null,
                type: column.type.replaceAll('.', '*||*')
            });
        }
        return baseEncodeColumnIdentifier(column);
    }, [
        baseEncodeColumnIdentifier
    ]);
    const decodeColumnIdentifier = (0,react__rspack_import_0.useCallback)((columnIdentifier, selectedColumns)=>{
        var _data_type;
        try {
            JSON.parse(columnIdentifier);
        } catch (e) {
            return undefined;
        }
        const data = JSON.parse(columnIdentifier);
        const type = (_data_type = data.type) === null || _data_type === void 0 ? void 0 : _data_type.replaceAll('*||*', '.');
        if (type === 'dataobject.classificationstore') {
            return selectedColumns.find((column)=>{
                var _column_config, _column_config1;
                return column.key === data.key && column.type === 'dataobject.classificationstore' && ((_column_config = column.config) === null || _column_config === void 0 ? void 0 : _column_config.keyId) === data.keyId && ((_column_config1 = column.config) === null || _column_config1 === void 0 ? void 0 : _column_config1.groupId) === data.groupId && (column.locale ?? null) === data.locale;
            });
        }
        return baseDecodeColumnIdentifier(columnIdentifier, selectedColumns);
    }, [
        baseDecodeColumnIdentifier
    ]);
    return {
        ...props,
        decodeColumnIdentifier,
        encodeColumnIdentifier,
        shouldMapDataToColumn
    };
};
_s(useDataObjectColumnMapper, "/CS5FPRBGWO2OCtwbF+AdymcXhs=", false, function() {
    return [
        _Pimcore_components_language_selection__rspack_import_1.useLanguageSelection,
        _Pimcore_modules_element_listing_abstract_configuration_layer_provider_selected_columns_use_column_mapper__rspack_import_2.useColumnMapper
    ];
});

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/data-object/listing/decorator/action-column/view-layer/components/grid/hooks/with-action-column-configuration.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  withActionColumnConfiguration: () => (withActionColumnConfiguration)
});
/* import */ var _tanstack_react_table__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/@tanstack/react-table/@tanstack/react-table");
/* import */ var _tanstack_react_table__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(_tanstack_react_table__rspack_import_0);
/* import */ var react_i18next__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_1);
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

const columnHelper = (0,_tanstack_react_table__rspack_import_0.createColumnHelper)();
const withActionColumnConfiguration = (useBaseHook)=>{
    var _s = $RefreshSig$();
    const useActionColumnExtension = ()=>{
        _s();
        const { t } = (0,react_i18next__rspack_import_1.useTranslation)();
        const { transformGridColumnDefinition: baseTransformGridColumnDefinition, ...baseMethods } = useBaseHook();
        const transformGridColumnDefinition = (columnDefinition)=>{
            const baseColumnConfiguration = baseTransformGridColumnDefinition(columnDefinition);
            baseColumnConfiguration.push(columnHelper.accessor('actions', {
                header: t('actions.open'),
                enableSorting: false,
                meta: {
                    type: 'data-object-actions'
                },
                size: 65
            }));
            return baseColumnConfiguration;
        };
        return {
            ...baseMethods,
            transformGridColumnDefinition
        };
    };
    _s(useActionColumnExtension, "OM8xzguqZ1r85ICyYcpBufo5Wxw=", false, function() {
        return [
            react_i18next__rspack_import_1.useTranslation,
            useBaseHook
        ];
    });
    return useActionColumnExtension;
};

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/data-object/listing/decorator/column-configuration/column-configuration-decorator.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ColumnConfigurationDecorator: () => (ColumnConfigurationDecorator)
});
/* import */ var _configuration_layer_with_column_configuration__rspack_import_0 = __webpack_require__("./js/src/core/modules/data-object/listing/decorator/column-configuration/configuration-layer/with-column-configuration.tsx");
/* import */ var _context_layer_with_available_columns_context__rspack_import_1 = __webpack_require__("./js/src/core/modules/data-object/listing/decorator/column-configuration/context-layer/with-available-columns-context.tsx");
/* import */ var _view_layer_components_grid_hooks_use_grid_options_with_advanced_column_config__rspack_import_2 = __webpack_require__("./js/src/core/modules/data-object/listing/decorator/column-configuration/view-layer/components/grid/hooks/use-grid-options/with-advanced-column-config.tsx");
/* import */ var _view_layer_components_grid_hooks_use_grid_options_hooks_with_configuration_sidebar_entry__rspack_import_3 = __webpack_require__("./js/src/core/modules/data-object/listing/decorator/column-configuration/view-layer/components/grid/hooks/use-grid-options/hooks/with-configuration-sidebar-entry.tsx");
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



const ColumnConfigurationDecorator = (props)=>{
    const { ConfigurationComponent, ContextComponent, useGridOptions, useSidebarOptions, ...baseProps } = props;
    return {
        ...baseProps,
        ConfigurationComponent: (0,_configuration_layer_with_column_configuration__rspack_import_0.WithColumnConfiguration)(ConfigurationComponent),
        ContextComponent: (0,_context_layer_with_available_columns_context__rspack_import_1.WithAvailableColumnsContext)(ContextComponent),
        useGridOptions: (0,_view_layer_components_grid_hooks_use_grid_options_with_advanced_column_config__rspack_import_2.withAdvancedColumnConfig)(useGridOptions),
        useSidebarOptions: (0,_view_layer_components_grid_hooks_use_grid_options_hooks_with_configuration_sidebar_entry__rspack_import_3.withConfigurationSidebarEntry)(useSidebarOptions)
    };
};
_c = ColumnConfigurationDecorator;
var _c;
$RefreshReg$(_c, "ColumnConfigurationDecorator");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/data-object/listing/decorator/column-configuration/configuration-layer/components/column-config-loader/column-config-loader.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ColumnConfigLoader: () => (ColumnConfigLoader)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var _Pimcore_modules_element_listing_abstract_settings_use_settings__rspack_import_1 = __webpack_require__("./js/src/core/modules/element/listing/abstract/settings/use-settings.ts");
/* import */ var react__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_2);
/* import */ var _class_definition_selection_context_layer_provider_use_class_definition_selection__rspack_import_3 = __webpack_require__("./js/src/core/modules/data-object/listing/decorator/class-definition-selection/context-layer/provider/use-class-definition-selection.tsx");
/* import */ var _Pimcore_modules_data_object_data_object_api_slice_enhanced__rspack_import_4 = __webpack_require__("./js/src/core/modules/data-object/data-object-api-slice-enhanced.ts");
/* import */ var _Pimcore_modules_element_listing_abstract_configuration_layer_provider_selected_columns_use_selected_columns__rspack_import_5 = __webpack_require__("./js/src/core/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns.tsx");
/* import */ var _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_available_columns_use_available_columns__rspack_import_6 = __webpack_require__("./js/src/core/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/use-available-columns.tsx");
/* import */ var _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_selected_grid_config_id_use_selected_grid_config_id__rspack_import_7 = __webpack_require__("./js/src/core/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/selected-grid-config-id/use-selected-grid-config-id.ts");
/* import */ var _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_grid_config_use_grid_config__rspack_import_8 = __webpack_require__("./js/src/core/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/grid-config/use-grid-config.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 







const ColumnConfigLoader = (param)=>{
    let { Component } = param;
    _s();
    const { useElementId, ViewComponent, useDataQueryHelper } = (0,_Pimcore_modules_element_listing_abstract_settings_use_settings__rspack_import_1.useSettings)();
    const { setDataLoadingState } = useDataQueryHelper();
    const { getId } = useElementId();
    const { selectedClassDefinition } = (0,_class_definition_selection_context_layer_provider_use_class_definition_selection__rspack_import_3.useClassDefinitionSelection)();
    const { isLoading, data } = (0,_Pimcore_modules_data_object_data_object_api_slice_enhanced__rspack_import_4.useDataObjectGetAvailableGridColumnsQuery)({
        folderId: getId(),
        classId: selectedClassDefinition.id
    });
    const { id: configId } = (0,_Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_selected_grid_config_id_use_selected_grid_config_id__rspack_import_7.useSelectedGridConfigId)();
    const { isLoading: isInitialConfigLoading, data: initialConfigurationData } = (0,_Pimcore_modules_data_object_data_object_api_slice_enhanced__rspack_import_4.useDataObjectGetGridConfigurationQuery)({
        classId: selectedClassDefinition.id,
        folderId: getId(),
        configurationId: configId
    });
    const { selectedColumns, setSelectedColumns } = (0,_Pimcore_modules_element_listing_abstract_configuration_layer_provider_selected_columns_use_selected_columns__rspack_import_5.useSelectedColumns)();
    const { setAvailableColumns } = (0,_Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_available_columns_use_available_columns__rspack_import_6.useAvailableColumns)();
    const { setGridConfig } = (0,_Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_grid_config_use_grid_config__rspack_import_8.useGridConfig)();
    (0,react__rspack_import_2.useEffect)(()=>{
        if (data === undefined || initialConfigurationData === undefined) {
            return;
        }
        const selectedColumns = [];
        const availableColumns = data.columns.map((column)=>column);
        for (const column of initialConfigurationData.columns){
            const availableColumn = data.columns.find((availableColumn)=>availableColumn.key === column.key);
            const currentColumn = column;
            if (availableColumn !== undefined) {
                const apiColumn = {
                    ...availableColumn,
                    config: availableColumn.type === 'dataobject.classificationstore' ? 'config' in column && column.config : availableColumn.config,
                    __meta: {
                        advancedColumnConfig: currentColumn.config ?? {}
                    }
                };
                selectedColumns.push({
                    key: column.key,
                    locale: column.locale,
                    type: availableColumn.type,
                    config: availableColumn.type === 'dataobject.classificationstore' ? 'config' in column && column.config : availableColumn.config,
                    sortable: availableColumn.sortable,
                    editable: availableColumn.editable,
                    localizable: availableColumn.localizable,
                    exportable: availableColumn.exportable,
                    frontendType: availableColumn.frontendType,
                    group: availableColumn.group,
                    width: column.width,
                    originalApiDefinition: apiColumn
                });
            }
        }
        setSelectedColumns(selectedColumns);
        setAvailableColumns(availableColumns);
        setGridConfig(initialConfigurationData);
        setDataLoadingState('config-changed');
    }, [
        data,
        initialConfigurationData
    ]);
    if (isLoading || isInitialConfigLoading || selectedColumns.length === 0) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(ViewComponent, {}, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/listing/decorator/column-configuration/configuration-layer/components/column-config-loader/column-config-loader.tsx",
            lineNumber: 103,
            columnNumber: 12
        }, undefined);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(Component, {}, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/listing/decorator/column-configuration/configuration-layer/components/column-config-loader/column-config-loader.tsx",
        lineNumber: 105,
        columnNumber: 10
    }, undefined);
};
_s(ColumnConfigLoader, "mSJHIDhmUH3BIekG4jZY/WgrUNw=", true, function() {
    return [
        _Pimcore_modules_element_listing_abstract_settings_use_settings__rspack_import_1.useSettings,
        _class_definition_selection_context_layer_provider_use_class_definition_selection__rspack_import_3.useClassDefinitionSelection,
        _Pimcore_modules_data_object_data_object_api_slice_enhanced__rspack_import_4.useDataObjectGetAvailableGridColumnsQuery,
        _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_selected_grid_config_id_use_selected_grid_config_id__rspack_import_7.useSelectedGridConfigId,
        _Pimcore_modules_data_object_data_object_api_slice_enhanced__rspack_import_4.useDataObjectGetGridConfigurationQuery,
        _Pimcore_modules_element_listing_abstract_configuration_layer_provider_selected_columns_use_selected_columns__rspack_import_5.useSelectedColumns,
        _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_available_columns_use_available_columns__rspack_import_6.useAvailableColumns,
        _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_grid_config_use_grid_config__rspack_import_8.useGridConfig
    ];
});
_c = ColumnConfigLoader;
var _c;
$RefreshReg$(_c, "ColumnConfigLoader");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/data-object/listing/decorator/column-configuration/configuration-layer/with-column-configuration.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  WithColumnConfiguration: () => (WithColumnConfiguration)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _class_definition_selection_context_layer_provider_use_class_definition_selection__rspack_import_2 = __webpack_require__("./js/src/core/modules/data-object/listing/decorator/class-definition-selection/context-layer/provider/use-class-definition-selection.tsx");
/* import */ var _Pimcore_components_content_content__rspack_import_3 = __webpack_require__("./js/src/core/components/content/content.tsx");
/* import */ var _class_definition_selection_components_class_definition_select_class_definition_select__rspack_import_4 = __webpack_require__("./js/src/core/modules/data-object/listing/decorator/class-definition-selection/components/class-definition-select/class-definition-select.tsx");
/* import */ var _components_column_config_loader_column_config_loader__rspack_import_5 = __webpack_require__("./js/src/core/modules/data-object/listing/decorator/column-configuration/configuration-layer/components/column-config-loader/column-config-loader.tsx");
/* import */ var _Pimcore_components_flex_flex__rspack_import_6 = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* import */ var _Pimcore_components_text_text__rspack_import_7 = __webpack_require__("./js/src/core/components/text/text.tsx");
/* import */ var react_i18next__rspack_import_8 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_8_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_8);
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







const WithColumnConfiguration = (Component)=>{
    var _s = $RefreshSig$();
    const availableColumnsConfigurationComponent = ()=>{
        _s();
        const { selectedClassDefinition } = (0,_class_definition_selection_context_layer_provider_use_class_definition_selection__rspack_import_2.useClassDefinitionSelection)();
        const { t } = (0,react_i18next__rspack_import_8.useTranslation)();
        if (selectedClassDefinition === undefined) {
            return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_content_content__rspack_import_3.Content, {
                padded: true,
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_flex_flex__rspack_import_6.Flex, {
                    align: "center",
                    gap: 'extra-small',
                    children: [
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_text_text__rspack_import_7.Text, {
                            children: t('data-object.select-class-to-display')
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/listing/decorator/column-configuration/configuration-layer/with-column-configuration.tsx",
                            lineNumber: 30,
                            columnNumber: 13
                        }, undefined),
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_class_definition_selection_components_class_definition_select_class_definition_select__rspack_import_4.ClassDefinitionSelect, {}, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/listing/decorator/column-configuration/configuration-layer/with-column-configuration.tsx",
                            lineNumber: 31,
                            columnNumber: 13
                        }, undefined)
                    ]
                }, void 0, true, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/listing/decorator/column-configuration/configuration-layer/with-column-configuration.tsx",
                    lineNumber: 29,
                    columnNumber: 11
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/listing/decorator/column-configuration/configuration-layer/with-column-configuration.tsx",
                lineNumber: 28,
                columnNumber: 14
            }, undefined);
        }
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_components_column_config_loader_column_config_loader__rspack_import_5.ColumnConfigLoader, {
            Component: Component
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/listing/decorator/column-configuration/configuration-layer/with-column-configuration.tsx",
            lineNumber: 35,
            columnNumber: 12
        }, undefined);
    };
    _s(availableColumnsConfigurationComponent, "wi7iLYXtWIWoxY26u3uBLh5OdVA=", false, function() {
        return [
            _class_definition_selection_context_layer_provider_use_class_definition_selection__rspack_import_2.useClassDefinitionSelection,
            react_i18next__rspack_import_8.useTranslation
        ];
    });
    return availableColumnsConfigurationComponent;
};
_c = WithColumnConfiguration;
var _c;
$RefreshReg$(_c, "WithColumnConfiguration");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/data-object/listing/decorator/column-configuration/context-layer/with-available-columns-context.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  WithAvailableColumnsContext: () => (WithAvailableColumnsContext)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_available_columns_available_columns_provider__rspack_import_1 = __webpack_require__("./js/src/core/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider.tsx");
/* import */ var _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_grid_config_grid_config_provider__rspack_import_2 = __webpack_require__("./js/src/core/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/grid-config/grid-config-provider.tsx");
/* import */ var _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_selected_grid_config_id_selected_grid_config_id_provider__rspack_import_3 = __webpack_require__("./js/src/core/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/selected-grid-config-id/selected-grid-config-id-provider.tsx");
/* import */ var react__rspack_import_4 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_4_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_4);
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



const WithAvailableColumnsContext = (Component)=>{
    const AvailableColumnsContextComponent = ()=>{
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_grid_config_grid_config_provider__rspack_import_2.GridConfigProvider, {
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_available_columns_available_columns_provider__rspack_import_1.AvailableColumnsProvider, {
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_selected_grid_config_id_selected_grid_config_id_provider__rspack_import_3.SelectedGridConfigIdProvider, {
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(Component, {}, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/listing/decorator/column-configuration/context-layer/with-available-columns-context.tsx",
                        lineNumber: 20,
                        columnNumber: 13
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/listing/decorator/column-configuration/context-layer/with-available-columns-context.tsx",
                    lineNumber: 19,
                    columnNumber: 11
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/listing/decorator/column-configuration/context-layer/with-available-columns-context.tsx",
                lineNumber: 18,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/listing/decorator/column-configuration/context-layer/with-available-columns-context.tsx",
            lineNumber: 17,
            columnNumber: 12
        }, undefined);
    };
    return AvailableColumnsContextComponent;
};
_c = WithAvailableColumnsContext;
var _c;
$RefreshReg$(_c, "WithAvailableColumnsContext");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/data-object/listing/decorator/context-menu/context-menu-decorator.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ContextMenuDecorator: () => (ContextMenuDecorator)
});
/* import */ var _view_layer_components_grid_hooks_with_context_menu__rspack_import_0 = __webpack_require__("./js/src/core/modules/data-object/listing/decorator/context-menu/view-layer/components/grid/hooks/with-context-menu.tsx");
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
const ContextMenuDecorator = (props)=>{
    const { useGridOptions, ...defaultProps } = props;
    const newProps = {
        ...defaultProps,
        useGridOptions: (0,_view_layer_components_grid_hooks_with_context_menu__rspack_import_0.withContextMenu)(useGridOptions)
    };
    return newProps;
};
_c = ContextMenuDecorator;
var _c;
$RefreshReg$(_c, "ContextMenuDecorator");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/data-object/listing/decorator/context-menu/view-layer/components/context-menu/list-grid-context-menu.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ListGridContextMenu: () => (ListGridContextMenu)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var _Pimcore_components_dropdown_dropdown__rspack_import_1 = __webpack_require__("./js/src/core/components/dropdown/dropdown.tsx");
/* import */ var _Pimcore_modules_element_actions__rspack_import_2 = __webpack_require__("./js/src/core/modules/element/actions/index.ts");
/* import */ var react__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_3);
/* import */ var _Pimcore_modules_app_context_menu_registry_use_context_menu_slot__rspack_import_4 = __webpack_require__("./js/src/core/modules/app/context-menu-registry/use-context-menu-slot.ts");
/* import */ var _Pimcore_modules_app_context_menu_registry_context_menu_config__rspack_import_5 = __webpack_require__("./js/src/core/modules/app/context-menu-registry/context-menu-config.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 




const ListGridContextMenu = (props)=>{
    _s();
    const { row } = props;
    const [isOpen, setIsOpen] = (0,react__rspack_import_3.useState)(undefined);
    const context = {
        target: row,
        onComplete: ()=>{
            setIsOpen(undefined);
        }
    };
    const items = (0,_Pimcore_modules_app_context_menu_registry_use_context_menu_slot__rspack_import_4.useContextMenuSlot)(_Pimcore_modules_app_context_menu_registry_context_menu_config__rspack_import_5.contextMenuConfig.dataObjectListGrid.name, context);
    const handleMenuClick = (e)=>{
        if (e.key === _Pimcore_modules_element_actions__rspack_import_2.ContextMenuActionName.locateInTree) {
            setIsOpen(true);
        }
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_dropdown_dropdown__rspack_import_1.Dropdown, {
        menu: {
            items,
            onClick: handleMenuClick
        },
        open: isOpen,
        trigger: [
            'contextMenu'
        ],
        children: props.children
    }, row.id, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/listing/decorator/context-menu/view-layer/components/context-menu/list-grid-context-menu.tsx",
        lineNumber: 33,
        columnNumber: 10
    }, undefined);
};
_s(ListGridContextMenu, "xAs5U6WdJolTuZWeHAQeO4Bvx/Q=", false, function() {
    return [
        _Pimcore_modules_app_context_menu_registry_use_context_menu_slot__rspack_import_4.useContextMenuSlot
    ];
});
_c = ListGridContextMenu;
var _c;
$RefreshReg$(_c, "ListGridContextMenu");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/data-object/listing/decorator/context-menu/view-layer/components/grid/hooks/with-context-menu.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  withContextMenu: () => (withContextMenu)
});
/* import */ var _context_menu_list_grid_context_menu__rspack_import_0 = __webpack_require__("./js/src/core/modules/data-object/listing/decorator/context-menu/view-layer/components/context-menu/list-grid-context-menu.tsx");
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
const withContextMenu = (useBaseHook)=>{
    var _s = $RefreshSig$();
    const useContextMenuExtension = ()=>{
        _s();
        const { getGridProps: baseGetGridProps, ...baseMethods } = useBaseHook();
        const getGridProps = ()=>{
            const baseGripProps = baseGetGridProps();
            const newGridProps = {
                ...baseGripProps,
                contextMenu: _context_menu_list_grid_context_menu__rspack_import_0.ListGridContextMenu
            };
            return newGridProps;
        };
        return {
            ...baseMethods,
            getGridProps
        };
    };
    _s(useContextMenuExtension, "MSgmOMeAtGVhx1noK0eD6wMKTqg=", false, function() {
        return [
            useBaseHook
        ];
    });
    return useContextMenuExtension;
};

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/data-object/listing/decorator/inline-editing/hooks/use-inline-edit-api-update.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useInlineEditApiUpdate: () => (useInlineEditApiUpdate)
});
/* import */ var _sdk_app__rspack_import_0 = __webpack_require__("./js/src/sdk/app/index.ts");
/* import */ var _Pimcore_modules_app_error_handler__rspack_import_1 = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* import */ var _Pimcore_modules_data_object_data_object_api_slice_enhanced__rspack_import_2 = __webpack_require__("./js/src/core/modules/data-object/data-object-api-slice-enhanced.ts");
/* import */ var lodash__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_3);
/* import */ var _batch_actions_batch_append_mode_batch_append_mode__rspack_import_4 = __webpack_require__("./js/src/core/modules/data-object/listing/batch-actions/batch-append-mode/batch-append-mode.ts");
/* import */ var _Pimcore_components_language_selection__rspack_import_5 = __webpack_require__("./js/src/core/components/language-selection/index.ts");
/* import */ var _Pimcore_modules_element_listing_abstract_settings_use_settings__rspack_import_6 = __webpack_require__("./js/src/core/modules/element/listing/abstract/settings/use-settings.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 






const useInlineEditApiUpdate = ()=>{
    _s();
    const [patchDataObject] = (0,_Pimcore_modules_data_object_data_object_api_slice_enhanced__rspack_import_2.useDataObjectPatchByIdMutation)();
    const dispatch = (0,_sdk_app__rspack_import_0.useAppDispatch)();
    const { currentLanguage } = (0,_Pimcore_components_language_selection__rspack_import_5.useLanguageSelection)();
    const { useColumnMapper } = (0,_Pimcore_modules_element_listing_abstract_settings_use_settings__rspack_import_6.useSettings)();
    const columnMapper = useColumnMapper();
    const updateCache = (event)=>{
        const { update, getGetRequestArgs } = event;
        const { id, column: columnToUpdate, value } = update;
        dispatch(_Pimcore_modules_data_object_data_object_api_slice_enhanced__rspack_import_2.api.util.updateQueryData('dataObjectGetGrid', getGetRequestArgs, (oldData)=>{
            item_loop: for (const item of oldData.items){
                if (item.id !== id) {
                    continue;
                }
                for (const column of item.columns){
                    if (columnMapper.shouldMapDataToColumn(column, columnToUpdate)) {
                        column.value = value;
                        if (!(0,lodash__rspack_import_3.isNil)(column.inheritance) && 'inherited' in column.inheritance && column.inheritance.inherited === true) {
                            column.inheritance.inherited = false;
                        }
                        break item_loop;
                    }
                }
            }
            return oldData;
        }));
    };
    const updateApiData = async (event)=>{
        const columnType = event.update.column.type;
        let dataItem;
        switch(columnType){
            case 'dataobject.classificationstore':
                dataItem = prepareClassificationStoreApiUpdateData(event);
                break;
            default:
                dataItem = prepareDefaultApiUpdateData(event);
                break;
        }
        const promise = patchDataObject({
            body: {
                data: [
                    dataItem
                ]
            }
        });
        const result = await promise;
        if (!(0,lodash__rspack_import_3.isNil)(result.error)) {
            (0,_Pimcore_modules_app_error_handler__rspack_import_1["default"])(new _Pimcore_modules_app_error_handler__rspack_import_1.ApiError(result.error));
        }
        return result;
    };
    const prepareClassificationStoreApiUpdateData = (event)=>{
        const { update } = event;
        const locale = update.column.locale ?? (update.column.localizable ? currentLanguage ?? 'default' : 'default');
        const columnKey = update.column.key;
        const columnConfig = update.column.config;
        return {
            id: update.id,
            editableData: {
                [columnKey]: {
                    [columnConfig.groupId]: {
                        [locale]: {
                            [columnConfig.keyId]: update.value
                        }
                    }
                }
            }
        };
    };
    const prepareDefaultApiUpdateData = (event)=>{
        var _event_meta;
        const { update } = event;
        let columnKey = update.column.key;
        if (update.column.localizable) {
            const splittedColumnKey = (columnKey ?? '').split('.');
            const columnId = splittedColumnKey[splittedColumnKey.length - 1];
            splittedColumnKey.pop();
            const hasPrepath = splittedColumnKey.length > 0 && splittedColumnKey[0] !== '';
            columnKey = `${splittedColumnKey.join('.')}${hasPrepath ? '.' : ''}localizedfields.${columnId}.${update.column.locale ?? currentLanguage}`;
        }
        const value = ((_event_meta = event.meta) === null || _event_meta === void 0 ? void 0 : _event_meta[_batch_actions_batch_append_mode_batch_append_mode__rspack_import_4.META_SUPPORTS_BATCH_APPEND_MODE]) === true ? (0,_batch_actions_batch_append_mode_batch_append_mode__rspack_import_4.addBatchAppendMode)(update.value, _batch_actions_batch_append_mode_batch_append_mode__rspack_import_4.BatchAppendMode.Replace) : update.value;
        const isPublishedColumn = columnKey === 'published';
        return {
            id: update.id,
            ...isPublishedColumn ? {
                published: value
            } : {
                editableData: {
                    ...(0,lodash__rspack_import_3.set)({}, columnKey ?? '', value)
                }
            }
        };
    };
    return {
        updateCache,
        updateApiData
    };
};
_s(useInlineEditApiUpdate, "c/5KTZL7+PC1g/K0dbWNXnDHCn0=", true, function() {
    return [
        _Pimcore_modules_data_object_data_object_api_slice_enhanced__rspack_import_2.useDataObjectPatchByIdMutation,
        _sdk_app__rspack_import_0.useAppDispatch,
        _Pimcore_components_language_selection__rspack_import_5.useLanguageSelection,
        _Pimcore_modules_element_listing_abstract_settings_use_settings__rspack_import_6.useSettings
    ];
});

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/data-object/listing/listing-container.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ActionColumnDecorator: () => (/* reexport safe */ _decorator_action_column_action_column_decorator__rspack_import_15.ActionColumnDecorator),
  BaseListing: () => (/* reexport safe */ _Pimcore_modules_element_listing_abstract_listing_container__rspack_import_1.ListingContainer),
  ClassDefinitionSelectionDecorator: () => (/* reexport safe */ _decorator_class_definition_selection_class_definition_selection_decorator__rspack_import_11.ClassDefinitionSelectionDecorator),
  ColumnConfigurationDecorator: () => (/* reexport safe */ _decorator_column_configuration_column_configuration_decorator__rspack_import_6.ColumnConfigurationDecorator),
  ContextMenuDecorator: () => (/* reexport safe */ _decorator_context_menu_context_menu_decorator__rspack_import_17.ContextMenuDecorator),
  GeneralFiltersDecorator: () => (/* reexport safe */ _Pimcore_modules_element_listing_decorators_general_filters_general_filters_decorator__rspack_import_14.GeneralFiltersDecorator),
  InlineEditDecorator: () => (/* reexport safe */ _Pimcore_modules_element_listing_decorators_inline_edit_inline_edit_decorator__rspack_import_12.InlineEditDecorator),
  ListingContainer: () => (ListingContainer),
  PagingDecorator: () => (/* reexport safe */ _Pimcore_modules_element_listing_decorators_paging_paging_decorator__rspack_import_8.PagingDecorator),
  RowSelectionDecorator: () => (/* reexport safe */ _Pimcore_modules_element_listing_decorators_row_selection_row_selection_decorator__rspack_import_4.RowSelectionDecorator),
  SortingDecorator: () => (/* reexport safe */ _Pimcore_modules_element_listing_decorators_sorting_sorting_decorator__rspack_import_9.SortingDecorator),
  TagFilterDecorator: () => (/* reexport safe */ _Pimcore_modules_asset_listing_decorator_tag_filter_tag_filter_decorator__rspack_import_16.TagFilterDecorator),
  listingDefaultProps: () => (defaultProps),
  useInlineEditApiUpdate: () => (/* reexport safe */ _decorator_inline_editing_hooks_use_inline_edit_api_update__rspack_import_13.useInlineEditApiUpdate)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var _Pimcore_modules_element_listing_abstract_listing_container__rspack_import_1 = __webpack_require__("./js/src/core/modules/element/listing/abstract/listing-container.tsx");
/* import */ var _data_object_api_slice_gen__rspack_import_2 = __webpack_require__("./js/src/core/modules/data-object/data-object-api-slice.gen.ts");
/* import */ var _data_layer_hooks_use_data_query_helper__rspack_import_3 = __webpack_require__("./js/src/core/modules/data-object/listing/data-layer/hooks/use-data-query-helper.ts");
/* import */ var _Pimcore_modules_element_listing_decorators_row_selection_row_selection_decorator__rspack_import_4 = __webpack_require__("./js/src/core/modules/element/listing/decorators/row-selection/row-selection-decorator.ts");
/* import */ var _Pimcore_modules_asset_listing_hooks_use_element_id__rspack_import_5 = __webpack_require__("./js/src/core/modules/asset/listing/hooks/use-element-id.ts");
/* import */ var _decorator_column_configuration_column_configuration_decorator__rspack_import_6 = __webpack_require__("./js/src/core/modules/data-object/listing/decorator/column-configuration/column-configuration-decorator.tsx");
/* import */ var react__rspack_import_7 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_7_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_7);
/* import */ var _Pimcore_modules_element_listing_decorators_paging_paging_decorator__rspack_import_8 = __webpack_require__("./js/src/core/modules/element/listing/decorators/paging/paging-decorator.ts");
/* import */ var _Pimcore_modules_element_listing_decorators_sorting_sorting_decorator__rspack_import_9 = __webpack_require__("./js/src/core/modules/element/listing/decorators/sorting/sorting-decorator.ts");
/* import */ var _views_default_view__rspack_import_10 = __webpack_require__("./js/src/core/modules/data-object/listing/views/default-view.tsx");
/* import */ var _decorator_class_definition_selection_class_definition_selection_decorator__rspack_import_11 = __webpack_require__("./js/src/core/modules/data-object/listing/decorator/class-definition-selection/class-definition-selection-decorator.tsx");
/* import */ var _Pimcore_modules_element_listing_decorators_inline_edit_inline_edit_decorator__rspack_import_12 = __webpack_require__("./js/src/core/modules/element/listing/decorators/inline-edit/inline-edit-decorator.ts");
/* import */ var _decorator_inline_editing_hooks_use_inline_edit_api_update__rspack_import_13 = __webpack_require__("./js/src/core/modules/data-object/listing/decorator/inline-editing/hooks/use-inline-edit-api-update.tsx");
/* import */ var _Pimcore_modules_element_listing_decorators_general_filters_general_filters_decorator__rspack_import_14 = __webpack_require__("./js/src/core/modules/element/listing/decorators/general-filters/general-filters-decorator.ts");
/* import */ var _decorator_action_column_action_column_decorator__rspack_import_15 = __webpack_require__("./js/src/core/modules/data-object/listing/decorator/action-column/action-column-decorator.ts");
/* import */ var _Pimcore_modules_asset_listing_decorator_tag_filter_tag_filter_decorator__rspack_import_16 = __webpack_require__("./js/src/core/modules/asset/listing/decorator/tag-filter/tag-filter-decorator.ts");
/* import */ var _decorator_context_menu_context_menu_decorator__rspack_import_17 = __webpack_require__("./js/src/core/modules/data-object/listing/decorator/context-menu/context-menu-decorator.tsx");
/* import */ var _column_mapper_use_column_mapper__rspack_import_18 = __webpack_require__("./js/src/core/modules/data-object/listing/column-mapper/use-column-mapper.tsx");
/* import */ var _sdk_app__rspack_import_19 = __webpack_require__("./js/src/sdk/app/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 


















const defaultProps = {
    ..._Pimcore_modules_element_listing_abstract_listing_container__rspack_import_1.defaultProps,
    ViewComponent: _views_default_view__rspack_import_10.DefaultView,
    useDataQuery: _data_object_api_slice_gen__rspack_import_2.useDataObjectGetGridQuery,
    useDataQueryHelper: _data_layer_hooks_use_data_query_helper__rspack_import_3.useDataQueryHelper,
    useElementId: _Pimcore_modules_asset_listing_hooks_use_element_id__rspack_import_5.useElementId,
    useColumnMapper: _column_mapper_use_column_mapper__rspack_import_18.useDataObjectColumnMapper
};
const ListingContainer = ()=>{
    _s();
    const listingBuilder = (0,_sdk_app__rspack_import_19.useInjection)(_sdk_app__rspack_import_19.serviceIds["DataObject/Listing/Builder"]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_element_listing_abstract_listing_container__rspack_import_1.ListingContainer, {
        ...listingBuilder.build({
            props: defaultProps
        })
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/listing/listing-container.tsx",
        lineNumber: 40,
        columnNumber: 10
    }, undefined);
};
_s(ListingContainer, "Fv54hGd6p61AxFEYND6v+G8sUU8=", false, function() {
    return [
        _sdk_app__rspack_import_19.useInjection
    ];
});
_c = ListingContainer;

var _c;
$RefreshReg$(_c, "ListingContainer");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/data-object/listing/toolbar/toolbar.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Toolbar: () => (Toolbar)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _sdk_modules_app__rspack_import_2 = __webpack_require__("./js/src/sdk/modules/app/index.ts");
/* import */ var _sdk_modules_element__rspack_import_3 = __webpack_require__("./js/src/sdk/modules/element/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 


const Toolbar = ()=>{
    _s();
    const { toolbarSlotName } = (0,_sdk_modules_element__rspack_import_3.useSettings)();
    return (0,react__rspack_import_1.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_sdk_modules_app__rspack_import_2.ComponentRenderer, {
            component: toolbarSlotName ?? _sdk_modules_app__rspack_import_2.componentConfig.dataObject.listing.toolbar.component.name
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/listing/toolbar/toolbar.tsx",
            lineNumber: 18,
            columnNumber: 24
        }, undefined), []);
};
_s(Toolbar, "WMl/qvuk7XAOMHk9+zImmLtD7zs=", false, function() {
    return [
        _sdk_modules_element__rspack_import_3.useSettings
    ];
});
_c = Toolbar;
var _c;
$RefreshReg$(_c, "Toolbar");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/data-object/listing/views/default-view.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DefaultView: () => (DefaultView)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _Pimcore_components_content_layout_content_layout__rspack_import_2 = __webpack_require__("./js/src/core/components/content-layout/content-layout.tsx");
/* import */ var _Pimcore_modules_element_listing_abstract_data_layer_provider_data_use_data__rspack_import_3 = __webpack_require__("./js/src/core/modules/element/listing/abstract/data-layer/provider/data/use-data.tsx");
/* import */ var _Pimcore_modules_element_listing_abstract_view_layer_components_sidebar_sidebar__rspack_import_4 = __webpack_require__("./js/src/core/modules/element/listing/abstract/view-layer/components/sidebar/sidebar.tsx");
/* import */ var _Pimcore_modules_element_listing_abstract_view_layer_components_grid_grid_container__rspack_import_5 = __webpack_require__("./js/src/core/modules/element/listing/abstract/view-layer/components/grid/grid-container.tsx");
/* import */ var _decorator_class_definition_selection_context_layer_provider_use_class_definition_selection__rspack_import_6 = __webpack_require__("./js/src/core/modules/data-object/listing/decorator/class-definition-selection/context-layer/provider/use-class-definition-selection.tsx");
/* import */ var _toolbar_toolbar__rspack_import_7 = __webpack_require__("./js/src/core/modules/data-object/listing/toolbar/toolbar.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 






const DefaultView = ()=>{
    _s();
    const { dataQueryResult } = (0,_Pimcore_modules_element_listing_abstract_data_layer_provider_data_use_data__rspack_import_3.useData)();
    const { selectedClassDefinition } = (0,_decorator_class_definition_selection_context_layer_provider_use_class_definition_selection__rspack_import_6.useClassDefinitionSelection)();
    return (0,react__rspack_import_1.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_content_layout_content_layout__rspack_import_2.ContentLayout, {
            renderSidebar: dataQueryResult !== undefined ? /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_element_listing_abstract_view_layer_components_sidebar_sidebar__rspack_import_4.Sidebar, {}, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/listing/views/default-view.tsx",
                lineNumber: 25,
                columnNumber: 86
            }, undefined) : undefined,
            renderToolbar: dataQueryResult !== undefined ? /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_toolbar_toolbar__rspack_import_7.Toolbar, {}, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/listing/views/default-view.tsx",
                lineNumber: 25,
                columnNumber: 158
            }, undefined) : undefined,
            children: selectedClassDefinition !== undefined && dataQueryResult !== undefined && /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_element_listing_abstract_view_layer_components_grid_grid_container__rspack_import_5.GridContainer, {}, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/listing/views/default-view.tsx",
                lineNumber: 26,
                columnNumber: 82
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/listing/views/default-view.tsx",
            lineNumber: 25,
            columnNumber: 24
        }, undefined), [
        dataQueryResult
    ]);
};
_s(DefaultView, "UYL9xhQGQ03HVrOuaKuRIjlm28Y=", false, function() {
    return [
        _Pimcore_modules_element_listing_abstract_data_layer_provider_data_use_data__rspack_import_3.useData,
        _decorator_class_definition_selection_context_layer_provider_use_class_definition_selection__rspack_import_6.useClassDefinitionSelection
    ];
});
_c = DefaultView;
var _c;
$RefreshReg$(_c, "DefaultView");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/data-object/tree/node/with-action-states.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  withActionStates: () => (withActionStates)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var _Pimcore_components_element_tree_hooks_use_element_tree_node__rspack_import_1 = __webpack_require__("./js/src/core/components/element-tree/hooks/use-element-tree-node.ts");
/* import */ var _Pimcore_modules_element_element_api_slice_gen__rspack_import_2 = __webpack_require__("./js/src/core/modules/element/element-api-slice.gen.ts");
/* import */ var react__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_3);
/* import */ var _data_object_api_slice_gen__rspack_import_4 = __webpack_require__("./js/src/core/modules/data-object/data-object-api-slice.gen.ts");
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



const withActionStates = (Component)=>{
    var _s = $RefreshSig$();
    const ActionStates = (props, ref)=>{
        _s();
        const originalLoadingState = props.isLoading ?? false;
        const [, { isLoading }] = (0,_data_object_api_slice_gen__rspack_import_4.useDataObjectPatchByIdMutation)({
            fixedCacheKey: `DATA-OBJECT_ACTION_RENAME_ID_${props.id}`
        });
        const [, { isLoading: isDeleteLoading }] = (0,_Pimcore_modules_element_element_api_slice_gen__rspack_import_2.useElementDeleteMutation)({
            fixedCacheKey: `DATA-OBJECT_ACTION_DELETE_ID_${props.id}`
        });
        const { isFetching: isMarkedAsFetching, isLoading: isMarkedAsLoading, isDeleting: isMarkedAsDeleting, isOpening: isMarkedAsOpening } = (0,_Pimcore_components_element_tree_hooks_use_element_tree_node__rspack_import_1.useElementTreeNode)(props.id);
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(Component, {
            ...props,
            danger: originalLoadingState || isDeleteLoading || isMarkedAsDeleting,
            isLoading: originalLoadingState || isMarkedAsLoading !== true && isMarkedAsFetching || isLoading || isDeleteLoading || isMarkedAsDeleting || isMarkedAsLoading === true || isMarkedAsOpening === true,
            ref: ref
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/tree/node/with-action-states.tsx",
            lineNumber: 34,
            columnNumber: 12
        }, undefined);
    };
    _s(ActionStates, "TqN/qZPBXeapRp7iD6fDeg3xRPA=", false, function() {
        return [
            _data_object_api_slice_gen__rspack_import_4.useDataObjectPatchByIdMutation,
            _Pimcore_modules_element_element_api_slice_gen__rspack_import_2.useElementDeleteMutation,
            _Pimcore_components_element_tree_hooks_use_element_tree_node__rspack_import_1.useElementTreeNode
        ];
    });
    return /*#__PURE__*/ (0,react__rspack_import_3.forwardRef)(ActionStates);
};

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/element/components/edit-lock-warning/edit-lock-warning.styles.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyles: () => (useStyles)
});
/* import */ var antd_style__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/antd-style/antd-style");
/* import */ var antd_style__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(antd_style__rspack_import_0);
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
const useStyles = (0,antd_style__rspack_import_0.createStyles)((param)=>{
    let { token } = param;
    return {
        warning: {
            color: token.Colors.Brand.Warning.colorWarningText,
            marginTop: token.marginXS
        }
    };
});

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/element/components/edit-lock-warning/edit-lock-warning.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  EditLockWarning: () => (EditLockWarning)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var react_i18next__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_2);
/* import */ var lodash__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_3);
/* import */ var _Pimcore_components_flex_flex__rspack_import_4 = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* import */ var _Pimcore_components_text_text__rspack_import_5 = __webpack_require__("./js/src/core/components/text/text.tsx");
/* import */ var _Pimcore_utils_date_time__rspack_import_6 = __webpack_require__("./js/src/core/utils/date-time.ts");
/* import */ var _edit_lock_warning_styles__rspack_import_7 = __webpack_require__("./js/src/core/modules/element/components/edit-lock-warning/edit-lock-warning.styles.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 






const typeLabelKey = {
    asset: 'data-type.asset',
    document: 'data-type.document',
    'data-object': 'data-type.object'
};
const EditLockWarning = (param)=>{
    let { elementType, path, userName, date } = param;
    _s();
    const { t } = (0,react_i18next__rspack_import_2.useTranslation)();
    const { styles } = (0,_edit_lock_warning_styles__rspack_import_7.useStyles)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_flex_flex__rspack_import_4.Flex, {
        gap: "small",
        vertical: true,
        children: [
            !(0,lodash__rspack_import_3.isNil)(path) && path !== '' && /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_text_text__rspack_import_5.Text, {
                children: `${t('element.edit-lock.path')}: ${path}`
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/components/edit-lock-warning/edit-lock-warning.tsx",
                lineNumber: 36,
                columnNumber: 39
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_text_text__rspack_import_5.Text, {
                children: `${t('element.edit-lock.type')}: ${t(typeLabelKey[elementType])}`
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/components/edit-lock-warning/edit-lock-warning.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, undefined),
            !(0,lodash__rspack_import_3.isNil)(userName) && userName !== '' && /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_text_text__rspack_import_5.Text, {
                children: `${t('element.edit-lock.user')}: ${userName}`
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/components/edit-lock-warning/edit-lock-warning.tsx",
                lineNumber: 40,
                columnNumber: 47
            }, undefined),
            !(0,lodash__rspack_import_3.isNil)(date) && /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_text_text__rspack_import_5.Text, {
                children: `${t('element.edit-lock.editing-since')}: ${(0,_Pimcore_utils_date_time__rspack_import_6.formatDateTime)({
                    timestamp: date,
                    dateStyle: 'medium',
                    timeStyle: 'short'
                })}`
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/components/edit-lock-warning/edit-lock-warning.tsx",
                lineNumber: 42,
                columnNumber: 24
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_text_text__rspack_import_5.Text, {
                className: styles.warning,
                strong: true,
                children: t('element.edit-lock.warning')
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/components/edit-lock-warning/edit-lock-warning.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/components/edit-lock-warning/edit-lock-warning.tsx",
        lineNumber: 35,
        columnNumber: 10
    }, undefined);
};
_s(EditLockWarning, "X2Rvyd+rmhXLzvdxfthpqTKpak8=", false, function() {
    return [
        react_i18next__rspack_import_2.useTranslation,
        _edit_lock_warning_styles__rspack_import_7.useStyles
    ];
});
_c = EditLockWarning;
var _c;
$RefreshReg$(_c, "EditLockWarning");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/element/components/element-toolbar/element-toolbar.styles.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyle: () => (useStyle)
});
/* import */ var _Pimcore_modules_ant_design_styles_create_styles__rspack_import_0 = __webpack_require__("./js/src/core/modules/ant-design/styles/create-styles.ts");
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
const useStyle = (0,_Pimcore_modules_ant_design_styles_create_styles__rspack_import_0.createStyles)((param)=>{
    let { token, css } = param;
    return {
        toolbar: css`
      display: flex;
      align-items: center;
      gap: 8px;
        
      .pimcore-icon {
        color: ${token.colorIcon};
      }
    `,
        dropdownInfoWrapper: css`
      .ant-dropdown-trigger {
        display: flex;
        align-items: center;
        gap: 4px;
        border: 1px solid ${token.colorBorder};
        background: ${token.colorFillTertiary};
        color: ${token.colorText};

        .ant-btn-icon.ant-btn-icon-end {
          margin-left: 0;
        }

        &:hover .pimcore-icon {
          color: ${token.colorIconHover};
        }
      }
    `,
        dropdownInfo: css`
      min-width: 130px !important;
    `
    };
});

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/element/components/element-toolbar/element-toolbar.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ElementToolbar: () => (ElementToolbar)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _Pimcore_components_breadcrumb_breadcrumb__rspack_import_2 = __webpack_require__("./js/src/core/components/breadcrumb/breadcrumb.tsx");
/* import */ var _Pimcore_components_dropdown_dropdown__rspack_import_3 = __webpack_require__("./js/src/core/components/dropdown/dropdown.tsx");
/* import */ var _Pimcore_components_icon_icon__rspack_import_4 = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* import */ var _Pimcore_components_button_button__rspack_import_5 = __webpack_require__("./js/src/core/components/button/button.tsx");
/* import */ var _Pimcore_components_space_space__rspack_import_6 = __webpack_require__("./js/src/core/components/space/space.tsx");
/* import */ var _Pimcore_modules_element_actions_locate_in_tree_use_locate_in_tree__rspack_import_7 = __webpack_require__("./js/src/core/modules/element/actions/locate-in-tree/use-locate-in-tree.tsx");
/* import */ var _Pimcore_modules_element_hooks_use_element_draft__rspack_import_8 = __webpack_require__("./js/src/core/modules/element/hooks/use-element-draft.ts");
/* import */ var _Pimcore_modules_element_hooks_use_element_actions_menu__rspack_import_9 = __webpack_require__("./js/src/core/modules/element/hooks/use-element-actions-menu.tsx");
/* import */ var _Pimcore_components_icon_button_icon_button__rspack_import_10 = __webpack_require__("./js/src/core/components/icon-button/icon-button.tsx");
/* import */ var _Pimcore_modules_element_components_element_toolbar_element_toolbar_styles__rspack_import_11 = __webpack_require__("./js/src/core/modules/element/components/element-toolbar/element-toolbar.styles.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 










const ElementToolbar = (param)=>{
    let { id, elementType, editorTabsWidth } = param;
    _s();
    const elementRef = (0,react__rspack_import_1.useRef)(null);
    const { styles } = (0,_Pimcore_modules_element_components_element_toolbar_element_toolbar_styles__rspack_import_11.useStyle)();
    const { element } = (0,_Pimcore_modules_element_hooks_use_element_draft__rspack_import_8.useElementDraft)(id, elementType);
    const [editorTabsBlockSize, setEditorTabsBlockSize] = (0,react__rspack_import_1.useState)(null);
    const [locateInTreeLoading, setLocateInTreeLoading] = (0,react__rspack_import_1.useState)(false);
    const { locateInTree } = (0,_Pimcore_modules_element_actions_locate_in_tree_use_locate_in_tree__rspack_import_7.useLocateInTree)(elementType);
    const { actionMenuItems: menuItems } = (0,_Pimcore_modules_element_hooks_use_element_actions_menu__rspack_import_9.useElementActionsMenu)({
        element: element,
        elementType
    });
    (0,react__rspack_import_1.useLayoutEffect)(()=>{
        if (editorTabsWidth == null) return;
        editorTabsWidth <= 800 ? setEditorTabsBlockSize('S') : setEditorTabsBlockSize('L');
    }, [
        editorTabsWidth
    ]);
    if (element === undefined) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(react_jsx_dev_runtime__rspack_import_0.Fragment, {}, void 0, false);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)("div", {
        className: styles.toolbar,
        ref: elementRef,
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_breadcrumb_breadcrumb__rspack_import_2.Breadcrumb, {
                editorTabsWidth: editorTabsWidth,
                elementType: elementType,
                pageSize: editorTabsBlockSize,
                path: element.fullPath
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/components/element-toolbar/element-toolbar.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)("div", {
                className: styles.dropdownInfoWrapper,
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_dropdown_dropdown__rspack_import_3.Dropdown, {
                    menu: {
                        items: menuItems
                    },
                    rootClassName: styles.dropdownInfo,
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_button_button__rspack_import_5.Button, {
                        icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_icon__rspack_import_4.Icon, {
                            value: 'chevron-down'
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/components/element-toolbar/element-toolbar.tsx",
                            lineNumber: 60,
                            columnNumber: 25
                        }, undefined),
                        iconPosition: "end",
                        onClick: ()=>{
                            void navigator.clipboard.writeText(element.id.toString());
                        },
                        size: "small",
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_space_space__rspack_import_6.Space, {
                            children: [
                                "ID: ",
                                element.id
                            ]
                        }, void 0, true, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/components/element-toolbar/element-toolbar.tsx",
                            lineNumber: 63,
                            columnNumber: 13
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/components/element-toolbar/element-toolbar.tsx",
                        lineNumber: 60,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/components/element-toolbar/element-toolbar.tsx",
                    lineNumber: 57,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/components/element-toolbar/element-toolbar.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_button_icon_button__rspack_import_10.IconButton, {
                icon: {
                    value: 'target'
                },
                loading: locateInTreeLoading,
                onClick: ()=>{
                    setLocateInTreeLoading(true);
                    locateInTree(element.id, ()=>{
                        setLocateInTreeLoading(false);
                    });
                }
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/components/element-toolbar/element-toolbar.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/components/element-toolbar/element-toolbar.tsx",
        lineNumber: 52,
        columnNumber: 10
    }, undefined);
};
_s(ElementToolbar, "by6ek+jZUCvi+0mQw5QVBcE4HpM=", false, function() {
    return [
        _Pimcore_modules_element_components_element_toolbar_element_toolbar_styles__rspack_import_11.useStyle,
        _Pimcore_modules_element_hooks_use_element_draft__rspack_import_8.useElementDraft,
        _Pimcore_modules_element_actions_locate_in_tree_use_locate_in_tree__rspack_import_7.useLocateInTree,
        _Pimcore_modules_element_hooks_use_element_actions_menu__rspack_import_9.useElementActionsMenu
    ];
});
_c = ElementToolbar;
var _c;
$RefreshReg$(_c, "ElementToolbar");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/element/components/language-selection/permission-based-language-selection.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  PermissionBasedLanguageSelection: () => (PermissionBasedLanguageSelection)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _Pimcore_components_language_selection_provider_use_language_selection__rspack_import_2 = __webpack_require__("./js/src/core/components/language-selection/provider/use-language-selection.tsx");
/* import */ var _permission_based_language_selection_control__rspack_import_3 = __webpack_require__("./js/src/core/modules/element/components/language-selection/permission-based-language-selection-control.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 


const PermissionBasedLanguageSelection = (props)=>{
    _s();
    const { currentLanguage, setCurrentLanguage } = (0,_Pimcore_components_language_selection_provider_use_language_selection__rspack_import_2.useLanguageSelection)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_permission_based_language_selection_control__rspack_import_3.PermissionBasedLanguageSelectionControl, {
        isNullable: props.isNullable,
        onChange: setCurrentLanguage,
        value: currentLanguage
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/components/language-selection/permission-based-language-selection.tsx",
        lineNumber: 19,
        columnNumber: 10
    }, undefined);
};
_s(PermissionBasedLanguageSelection, "X8McRioo4bPWAb4PylWUEyyP8og=", false, function() {
    return [
        _Pimcore_components_language_selection_provider_use_language_selection__rspack_import_2.useLanguageSelection
    ];
});
_c = PermissionBasedLanguageSelection;
var _c;
$RefreshReg$(_c, "PermissionBasedLanguageSelection");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/element/components/system-info-modal/system-info-modal.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SystemInfoModal: () => (SystemInfoModal)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var lodash__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_2);
/* import */ var react_i18next__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_3);
/* import */ var antd_es_typography_Link__rspack_import_19 = __webpack_require__("./node_modules/antd/es/typography/Link.js");
/* import */ var _Pimcore_components_form_form_kit__rspack_import_4 = __webpack_require__("./js/src/core/components/form/form-kit.tsx");
/* import */ var _Pimcore_components_form_form__rspack_import_5 = __webpack_require__("./js/src/core/components/form/form.tsx");
/* import */ var _Pimcore_components_input_input__rspack_import_6 = __webpack_require__("./js/src/core/components/input/input.tsx");
/* import */ var _Pimcore_components_text_text__rspack_import_7 = __webpack_require__("./js/src/core/components/text/text.tsx");
/* import */ var _Pimcore_utils_date_time__rspack_import_8 = __webpack_require__("./js/src/core/utils/date-time.ts");
/* import */ var _Pimcore_modules_user_user_api_slice_enhanced__rspack_import_9 = __webpack_require__("./js/src/core/modules/user/user-api-slice-enhanced.ts");
/* import */ var _Pimcore_modules_auth_hooks_use_user__rspack_import_10 = __webpack_require__("./js/src/core/modules/auth/hooks/use-user.ts");
/* import */ var _Pimcore_components_flex_flex__rspack_import_11 = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* import */ var _Pimcore_modules_widget_manager_hooks_use_widget_manager__rspack_import_12 = __webpack_require__("./js/src/core/modules/widget-manager/hooks/use-widget-manager.ts");
/* import */ var _Pimcore_modules_user__rspack_import_13 = __webpack_require__("./js/src/core/modules/user/index.ts");
/* import */ var _Pimcore_utils_data_unit__rspack_import_14 = __webpack_require__("./js/src/core/utils/data-unit.ts");
/* import */ var _Pimcore_app_config_app_config__rspack_import_15 = __webpack_require__("./js/src/core/app/config/app-config.ts");
/* import */ var _Pimcore_types_enums_element_element_type__rspack_import_16 = __webpack_require__("./js/src/core/types/enums/element/element-type.tsx");
/* import */ var _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_17 = __webpack_require__("./js/src/core/modules/class-definition/class-definition-slice-enhanced.ts");
/* import */ var _Pimcore_modules_app_settings_hooks_use_settings__rspack_import_18 = __webpack_require__("./js/src/core/modules/app/settings/hooks/use-settings.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 


















const SystemInfoModal = (param)=>{
    let { onClose, data } = param;
    var _data_draftData, _getByName;
    _s();
    const { t } = (0,react_i18next__rspack_import_3.useTranslation)();
    const currentUser = (0,_Pimcore_modules_auth_hooks_use_user__rspack_import_10.useUser)();
    const { data: userList } = (0,_Pimcore_modules_user_user_api_slice_enhanced__rspack_import_9.useUserGetCollectionQuery)();
    const { openMainWidget } = (0,_Pimcore_modules_widget_manager_hooks_use_widget_manager__rspack_import_12.useWidgetManager)();
    const { data: classDefinitionData } = (0,_Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_17.useClassDefinitionCollectionQuery)();
    const { asset_frontend_prefix: assetFrontendPrefix } = (0,_Pimcore_modules_app_settings_hooks_use_settings__rspack_import_18.useSettings)();
    if ((0,lodash__rspack_import_2.isNil)(data)) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(react_jsx_dev_runtime__rspack_import_0.Fragment, {}, void 0, false);
    }
    const modificationDate = (data === null || data === void 0 ? void 0 : (_data_draftData = data.draftData) === null || _data_draftData === void 0 ? void 0 : _data_draftData.modificationDate) ?? (data === null || data === void 0 ? void 0 : data.modificationDate);
    const getByName = (name)=>{
        var _classDefinitionData_items;
        return classDefinitionData === null || classDefinitionData === void 0 ? void 0 : (_classDefinitionData_items = classDefinitionData.items) === null || _classDefinitionData_items === void 0 ? void 0 : _classDefinitionData_items.find((classDefinition)=>classDefinition.name === name);
    };
    const handleOpenUserManagement = (userId)=>{
        const updConfig = {
            ..._Pimcore_modules_user__rspack_import_13.USERS_WIDGET,
            config: {
                ..._Pimcore_modules_user__rspack_import_13.USERS_WIDGET.config,
                userId
            }
        };
        openMainWidget(updConfig);
        onClose();
    };
    const renderInputItem = (param)=>{
        let { label, name, value } = param;
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_form_form__rspack_import_5.Form.Item, {
            label: label,
            name: name,
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_input_input__rspack_import_6.Input, {
                disabled: true,
                value: value
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/components/system-info-modal/system-info-modal.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/components/system-info-modal/system-info-modal.tsx",
            lineNumber: 72,
            columnNumber: 9
        }, undefined);
    };
    const getUserLabel = (userId)=>{
        const user = userList === null || userList === void 0 ? void 0 : userList.items.find((user)=>user.id === userId);
        const renderLabel = (value)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_text_text__rspack_import_7.Text, {
                className: "m-l-mini",
                type: "secondary",
                children: value
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/components/system-info-modal/system-info-modal.tsx",
                lineNumber: 77,
                columnNumber: 34
            }, undefined);
        if (userId === 0) return renderLabel(t('system-information.system'));
        if (!(0,lodash__rspack_import_2.isUndefined)(user)) {
            return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_flex_flex__rspack_import_11.Flex, {
                align: "center",
                gap: "mini",
                children: [
                    renderLabel(user.username),
                    userId === currentUser.id && /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd_es_typography_Link__rspack_import_19["default"], {
                        onClick: ()=>{
                            handleOpenUserManagement(userId);
                        },
                        style: {
                            textDecoration: 'underline'
                        },
                        children: [
                            "(",
                            t('system-information.click-to-open'),
                            ")"
                        ]
                    }, void 0, true, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/components/system-info-modal/system-info-modal.tsx",
                        lineNumber: 84,
                        columnNumber: 41
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/components/system-info-modal/system-info-modal.tsx",
                lineNumber: 82,
                columnNumber: 14
            }, undefined);
        }
        return renderLabel(t('system-information.user-unknown'));
    };
    const shouldShowPublicUrl = ()=>{
        if (data.elementType === _Pimcore_types_enums_element_element_type__rspack_import_16.elementTypes.asset) {
            return data.type !== 'folder';
        }
        if (data.elementType === _Pimcore_types_enums_element_element_type__rspack_import_16.elementTypes.document) {
            return data.type === 'page' || data.type === 'headlessdocument';
        }
        return false;
    };
    const getPublicUrl = ()=>{
        const fullPath = data.fullPath;
        if (data.elementType === _Pimcore_types_enums_element_element_type__rspack_import_16.elementTypes.asset && !(0,lodash__rspack_import_2.isNil)(assetFrontendPrefix)) {
            return `${assetFrontendPrefix}${fullPath}`;
        }
        return `${_Pimcore_app_config_app_config__rspack_import_15.currentDomain}${fullPath}`;
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_form_form_kit__rspack_import_4.FormKit, {
        formProps: {
            initialValues: data
        },
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_form_form_kit__rspack_import_4.FormKit.Panel, {
            children: [
                renderInputItem({
                    label: t('system-information.id'),
                    name: 'id'
                }),
                renderInputItem({
                    label: t('system-information.path'),
                    name: 'fullPath'
                }),
                shouldShowPublicUrl() && renderInputItem({
                    label: t('system-information.public-url'),
                    value: getPublicUrl()
                }),
                !(0,lodash__rspack_import_2.isNil)(data === null || data === void 0 ? void 0 : data.parentId) && renderInputItem({
                    label: t('system-information.parent-id'),
                    name: 'parentId'
                }),
                renderInputItem({
                    label: t('system-information.type'),
                    value: data.elementType === _Pimcore_types_enums_element_element_type__rspack_import_16.elementTypes.asset ? data.type + ' ' + (!(0,lodash__rspack_import_2.isNil)(data.mimeType) ? '(MIME: ' + data.mimeType + ')' : '') : data.type
                }),
                data.elementType === _Pimcore_types_enums_element_element_type__rspack_import_16.elementTypes.dataObject && [
                    renderInputItem({
                        label: t('system-information.class-id'),
                        value: ((_getByName = getByName(data.className)) === null || _getByName === void 0 ? void 0 : _getByName.id) ?? ''
                    }),
                    renderInputItem({
                        label: t('system-information.class'),
                        name: 'className'
                    })
                ],
                !(0,lodash__rspack_import_2.isUndefined)(data.fileSize) && data.fileSize > 0 && renderInputItem({
                    label: t('system-information.file-size'),
                    value: (0,_Pimcore_utils_data_unit__rspack_import_14.formatDataUnit)(data.fileSize)
                }),
                !(0,lodash__rspack_import_2.isNil)(modificationDate) && renderInputItem({
                    label: t('system-information.modification-date'),
                    value: (0,_Pimcore_utils_date_time__rspack_import_8.formatDateTime)({
                        timestamp: modificationDate,
                        dateStyle: 'full',
                        timeStyle: 'full'
                    })
                }),
                renderInputItem({
                    label: t('system-information.creation-date'),
                    value: (0,_Pimcore_utils_date_time__rspack_import_8.formatDateTime)({
                        timestamp: data.creationDate,
                        dateStyle: 'full',
                        timeStyle: 'full'
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_form_form__rspack_import_5.Form.Item, {
                    label: t('system-information.user-modification'),
                    children: getUserLabel(data.userModification)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/components/system-info-modal/system-info-modal.tsx",
                    lineNumber: 166,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_form_form__rspack_import_5.Form.Item, {
                    label: t('system-information.owner'),
                    children: getUserLabel(data.userOwner)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/components/system-info-modal/system-info-modal.tsx",
                    lineNumber: 169,
                    columnNumber: 9
                }, undefined),
                renderInputItem({
                    label: t('system-information.deeplink'),
                    name: 'deeplink'
                })
            ]
        }, void 0, true, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/components/system-info-modal/system-info-modal.tsx",
            lineNumber: 114,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/components/system-info-modal/system-info-modal.tsx",
        lineNumber: 111,
        columnNumber: 10
    }, undefined);
};
_s(SystemInfoModal, "Vz/T0O2+V6SPvAMjPJIZlsw157Q=", false, function() {
    return [
        react_i18next__rspack_import_3.useTranslation,
        _Pimcore_modules_auth_hooks_use_user__rspack_import_10.useUser,
        _Pimcore_modules_user_user_api_slice_enhanced__rspack_import_9.useUserGetCollectionQuery,
        _Pimcore_modules_widget_manager_hooks_use_widget_manager__rspack_import_12.useWidgetManager,
        _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_17.useClassDefinitionCollectionQuery,
        _Pimcore_modules_app_settings_hooks_use_settings__rspack_import_18.useSettings
    ];
});
_c = SystemInfoModal;
var _c;
$RefreshReg$(_c, "SystemInfoModal");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/element/editor/layouts/tabs-toolbar-view.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TabsToolbarView: () => (TabsToolbarView)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _tabs_toolbar_view_styles__rspack_import_2 = __webpack_require__("./js/src/core/modules/element/editor/layouts/tabs-toolbar-view.styles.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 

const TabsToolbarView = (props)=>{
    _s();
    const { styles } = (0,_tabs_toolbar_view_styles__rspack_import_2.useStyles)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)("div", {
        className: [
            'tabs-toolbar-layout',
            styles.tabbarToolbar
        ].join(' '),
        "data-testid": props.dataTestId,
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)("div", {
                className: "tabs-toolbar-layout__tabbar",
                children: props.renderTabbar
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/layouts/tabs-toolbar-view.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)("div", {
                className: "tabs-toolbar-layout__toolbar",
                children: props.renderToolbar
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/layouts/tabs-toolbar-view.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/layouts/tabs-toolbar-view.tsx",
        lineNumber: 17,
        columnNumber: 10
    }, undefined);
};
_s(TabsToolbarView, "7xVbA/cAv2OTrtL4/ZezCn5HG/A=", false, function() {
    return [
        _tabs_toolbar_view_styles__rspack_import_2.useStyles
    ];
});
_c = TabsToolbarView;

var _c;
$RefreshReg$(_c, "TabsToolbarView");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/element/editor/shared-components/workflow/modal/workflow-modal.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  WorkflowModal: () => (WorkflowModal)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _Pimcore_components_modal_footer_modal_footer__rspack_import_2 = __webpack_require__("./js/src/core/components/modal/footer/modal-footer.tsx");
/* import */ var _Pimcore_components_button_button__rspack_import_3 = __webpack_require__("./js/src/core/components/button/button.tsx");
/* import */ var _Pimcore_components_modal_modal__rspack_import_4 = __webpack_require__("./js/src/core/components/modal/modal.tsx");
/* import */ var _Pimcore_components_flex_flex__rspack_import_5 = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* import */ var _Pimcore_components_modal_modal_title_modal_title__rspack_import_6 = __webpack_require__("./js/src/core/components/modal/modal-title/modal-title.tsx");
/* import */ var _Pimcore_modules_element_editor_shared_components_workflow_hooks_use_workflow__rspack_import_7 = __webpack_require__("./js/src/core/modules/element/editor/shared-components/workflow/hooks/use-workflow.ts");
/* import */ var _Pimcore_components_form_form__rspack_import_8 = __webpack_require__("./js/src/core/components/form/form.tsx");
/* import */ var antd__rspack_import_9 = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* import */ var antd__rspack_import_9_default = /*#__PURE__*/__webpack_require__.n(antd__rspack_import_9);
/* import */ var i18next__rspack_import_10 = __webpack_require__("webpack/sharing/consume/default/i18next/i18next");
/* import */ var i18next__rspack_import_10_default = /*#__PURE__*/__webpack_require__.n(i18next__rspack_import_10);
/* import */ var _Pimcore_modules_element_editor_shared_components_workflow_hooks_use_submit_workflow__rspack_import_11 = __webpack_require__("./js/src/core/modules/element/editor/shared-components/workflow/hooks/use-submit-workflow.ts");
/* import */ var lodash__rspack_import_12 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_12_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_12);
/* import */ var _Pimcore_utils_type_utils__rspack_import_13 = __webpack_require__("./js/src/core/utils/type-utils.ts");
/* import */ var _Pimcore_modules_element_editor_shared_components_workflow_hooks_use_workflow_field_renderer__rspack_import_14 = __webpack_require__("./js/src/core/modules/element/editor/shared-components/workflow/hooks/use-workflow-field-renderer.ts");
/* import */ var _Pimcore_modules_app_hook_use_date_converter__rspack_import_15 = __webpack_require__("./js/src/core/modules/app/hook/use-date-converter.ts");
/* import */ var _Pimcore_modules_app_component_registry_slot_renderer__rspack_import_16 = __webpack_require__("./js/src/core/modules/app/component-registry/slot-renderer.tsx");
/* import */ var _Pimcore_modules_app_component_registry_component_config__rspack_import_17 = __webpack_require__("./js/src/core/modules/app/component-registry/component-config.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 
















const WorkflowModal = ()=>{
    var _triggeredWorkflowAction_notes, _triggeredWorkflowAction_notes1, _triggeredWorkflowAction_notes2, _triggeredWorkflowAction_notes3;
    _s();
    const { isModalOpen, closeModal, triggeredWorkflowAction } = (0,_Pimcore_modules_element_editor_shared_components_workflow_hooks_use_workflow__rspack_import_7.useWorkflow)();
    const { renderFields } = (0,_Pimcore_modules_element_editor_shared_components_workflow_hooks_use_workflow_field_renderer__rspack_import_14.useWorkflowFieldRenderer)();
    const { convertToTimestamp } = (0,_Pimcore_modules_app_hook_use_date_converter__rspack_import_15.useDateConverter)();
    const [form] = _Pimcore_components_form_form__rspack_import_8.Form.useForm();
    const { submitWorkflowAction, submissionLoading } = (0,_Pimcore_modules_element_editor_shared_components_workflow_hooks_use_submit_workflow__rspack_import_11.useSubmitWorkflow)();
    const additionalFields = (triggeredWorkflowAction === null || triggeredWorkflowAction === void 0 ? void 0 : (_triggeredWorkflowAction_notes = triggeredWorkflowAction.notes) === null || _triggeredWorkflowAction_notes === void 0 ? void 0 : _triggeredWorkflowAction_notes.additionalFields) ?? [];
    const dynamicFields = renderFields(additionalFields);
    const onFinish = (values)=>{
        if (triggeredWorkflowAction === null) return;
        const { notes, ...additionalValues } = values;
        dynamicFields.forEach((field)=>{
            additionalValues[field.name] = additionalValues[field.name] ?? null;
            if (field.fieldType === 'date' || field.fieldType === 'datetime') {
                const fieldValue = additionalValues[field.name];
                if ((0,_Pimcore_utils_type_utils__rspack_import_13.isNonEmptyString)(fieldValue)) {
                    additionalValues[field.name] = convertToTimestamp(fieldValue, true, false);
                }
            }
        });
        submitWorkflowAction(triggeredWorkflowAction, {
            notes,
            additional: additionalValues
        });
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_modal_modal__rspack_import_4.Modal, {
        afterClose: ()=>{
            form.resetFields();
            closeModal();
        },
        closable: !submissionLoading,
        footer: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_modal_footer_modal_footer__rspack_import_2.ModalFooter, {
            divider: true,
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_flex_flex__rspack_import_5.Flex, {
                align: 'center',
                gap: 'extra-small',
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_button_button__rspack_import_3.Button, {
                        disabled: submissionLoading,
                        onClick: ()=>{
                            closeModal();
                        },
                        type: "default",
                        children: (0,i18next__rspack_import_10.t)('workflow-modal.cancel')
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-components/workflow/modal/workflow-modal.tsx",
                        lineNumber: 72,
                        columnNumber: 11
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_button_button__rspack_import_3.Button, {
                        loading: submissionLoading,
                        onClick: ()=>{
                            form.submit();
                        },
                        type: "primary",
                        children: (0,i18next__rspack_import_10.t)('workflow-modal.perform-action')
                    }, "submit", false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-components/workflow/modal/workflow-modal.tsx",
                        lineNumber: 75,
                        columnNumber: 11
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-components/workflow/modal/workflow-modal.tsx",
                lineNumber: 71,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-components/workflow/modal/workflow-modal.tsx",
            lineNumber: 70,
            columnNumber: 44
        }, undefined),
        onCancel: ()=>{
            closeModal();
        },
        open: isModalOpen && !(0,lodash__rspack_import_12.isNull)(triggeredWorkflowAction),
        size: 'M',
        title: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_modal_modal_title_modal_title__rspack_import_6.ModalTitle, {
            children: !(0,lodash__rspack_import_12.isNull)(triggeredWorkflowAction) ? (0,i18next__rspack_import_10.t)(triggeredWorkflowAction.label) : ''
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-components/workflow/modal/workflow-modal.tsx",
            lineNumber: 81,
            columnNumber: 79
        }, undefined),
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_app_component_registry_slot_renderer__rspack_import_16.SlotRenderer, {
                slot: _Pimcore_modules_app_component_registry_component_config__rspack_import_17.componentConfig.element.editor.workflow.modal.slots.top.name
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-components/workflow/modal/workflow-modal.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_form_form__rspack_import_8.Form, {
                form: form,
                initialValues: {
                    notes: (triggeredWorkflowAction === null || triggeredWorkflowAction === void 0 ? void 0 : (_triggeredWorkflowAction_notes1 = triggeredWorkflowAction.notes) === null || _triggeredWorkflowAction_notes1 === void 0 ? void 0 : _triggeredWorkflowAction_notes1.commentPrefill) ?? ''
                },
                layout: 'vertical',
                onFinish: onFinish,
                children: [
                    dynamicFields.map((field)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_form_form__rspack_import_8.Form.Item, {
                            label: (0,i18next__rspack_import_10.t)((0,_Pimcore_utils_type_utils__rspack_import_13.isNonEmptyString)(field.title) ? field.title : field.name),
                            name: field.name,
                            rules: [
                                {
                                    required: field.required,
                                    message: (0,i18next__rspack_import_10.t)('form.validation.required')
                                }
                            ],
                            children: field.component
                        }, field.name, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-components/workflow/modal/workflow-modal.tsx",
                            lineNumber: 87,
                            columnNumber: 37
                        }, undefined)),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_app_component_registry_slot_renderer__rspack_import_16.SlotRenderer, {
                        slot: _Pimcore_modules_app_component_registry_component_config__rspack_import_17.componentConfig.element.editor.workflow.modal.slots.center.name
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-components/workflow/modal/workflow-modal.tsx",
                        lineNumber: 94,
                        columnNumber: 9
                    }, undefined),
                    (triggeredWorkflowAction === null || triggeredWorkflowAction === void 0 ? void 0 : (_triggeredWorkflowAction_notes2 = triggeredWorkflowAction.notes) === null || _triggeredWorkflowAction_notes2 === void 0 ? void 0 : _triggeredWorkflowAction_notes2.commentEnabled) === true && /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_form_form__rspack_import_8.Form.Item, {
                        label: (0,i18next__rspack_import_10.t)('workflow-modal.notes'),
                        name: "notes",
                        rules: [
                            {
                                required: (triggeredWorkflowAction === null || triggeredWorkflowAction === void 0 ? void 0 : (_triggeredWorkflowAction_notes3 = triggeredWorkflowAction.notes) === null || _triggeredWorkflowAction_notes3 === void 0 ? void 0 : _triggeredWorkflowAction_notes3.commentRequired) ?? false,
                                message: (0,i18next__rspack_import_10.t)('workflow-modal.notes-required')
                            }
                        ],
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_9.Input.TextArea, {
                            rows: 4
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-components/workflow/modal/workflow-modal.tsx",
                            lineNumber: 100,
                            columnNumber: 13
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-components/workflow/modal/workflow-modal.tsx",
                        lineNumber: 96,
                        columnNumber: 69
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-components/workflow/modal/workflow-modal.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_app_component_registry_slot_renderer__rspack_import_16.SlotRenderer, {
                slot: _Pimcore_modules_app_component_registry_component_config__rspack_import_17.componentConfig.element.editor.workflow.modal.slots.bottom.name
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-components/workflow/modal/workflow-modal.tsx",
                lineNumber: 104,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-components/workflow/modal/workflow-modal.tsx",
        lineNumber: 67,
        columnNumber: 10
    }, undefined);
};
_s(WorkflowModal, "oYjQnDtaOV4P3Y3SZKqjylcfqh4=", false, function() {
    return [
        _Pimcore_modules_element_editor_shared_components_workflow_hooks_use_workflow__rspack_import_7.useWorkflow,
        _Pimcore_modules_element_editor_shared_components_workflow_hooks_use_workflow_field_renderer__rspack_import_14.useWorkflowFieldRenderer,
        _Pimcore_modules_app_hook_use_date_converter__rspack_import_15.useDateConverter,
        _Pimcore_components_form_form__rspack_import_8.Form.useForm,
        _Pimcore_modules_element_editor_shared_components_workflow_hooks_use_submit_workflow__rspack_import_11.useSubmitWorkflow
    ];
});
_c = WorkflowModal;
var _c;
$RefreshReg$(_c, "WorkflowModal");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/element/editor/shared-tab-manager/tabs-container.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TabsContainer: () => (TabsContainer)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _Pimcore_modules_element_editor_tabs_editor_tabs__rspack_import_2 = __webpack_require__("./js/src/core/modules/element/editor/tabs/editor-tabs.tsx");
/* import */ var react_i18next__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_3);
/* import */ var _Pimcore_app_depency_injection__rspack_import_4 = __webpack_require__("./js/src/core/app/depency-injection/index.ts");
/* import */ var _Pimcore_modules_element_hooks_use_element_context__rspack_import_5 = __webpack_require__("./js/src/core/modules/element/hooks/use-element-context.ts");
/* import */ var _Pimcore_modules_element_hooks_use_element_draft__rspack_import_6 = __webpack_require__("./js/src/core/modules/element/hooks/use-element-draft.ts");
/* import */ var _Pimcore_modules_element_editor_shared_tab_manager_tab_manager_context__rspack_import_7 = __webpack_require__("./js/src/core/modules/element/editor/shared-tab-manager/tab-manager-context.tsx");
/* import */ var _Pimcore_modules_app_hook_use_handle_keybindings__rspack_import_8 = __webpack_require__("./js/src/core/modules/app/hook/use-handle-keybindings.ts");
/* import */ var _Pimcore_modules_element_actions_rename_use_rename__rspack_import_9 = __webpack_require__("./js/src/core/modules/element/actions/rename/use-rename.tsx");
/* import */ var _Pimcore_modules_element_actions_unpublish_use_unpublish__rspack_import_10 = __webpack_require__("./js/src/core/modules/element/actions/unpublish/use-unpublish.tsx");
/* import */ var _Pimcore_modules_element_element_helper__rspack_import_11 = __webpack_require__("./js/src/core/modules/element/element-helper.ts");
/* import */ var _Pimcore_modules_element_actions_refresh_element_use_element_refresh__rspack_import_12 = __webpack_require__("./js/src/core/modules/element/actions/refresh-element/use-element-refresh.tsx");
/* import */ var _Pimcore_modules_element_actions_locate_in_tree_use_locate_in_tree__rspack_import_13 = __webpack_require__("./js/src/core/modules/element/actions/locate-in-tree/use-locate-in-tree.tsx");
/* import */ var lodash__rspack_import_14 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_14_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_14);
/* import */ var _Pimcore_modules_element_utils_workflow_availability__rspack_import_15 = __webpack_require__("./js/src/core/modules/element/utils/workflow-availability.ts");
/* import */ var _Pimcore_modules_element_permissions_permission_helper__rspack_import_16 = __webpack_require__("./js/src/core/modules/element/permissions/permission-helper.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 















const TabsContainer = (param)=>{
    let { elementEditorType } = param;
    _s();
    const { t } = (0,react_i18next__rspack_import_3.useTranslation)();
    const tabManager = (0,_Pimcore_app_depency_injection__rspack_import_4.useInjection)(elementEditorType.tabManagerServiceId);
    const { id, elementType } = (0,_Pimcore_modules_element_hooks_use_element_context__rspack_import_5.useElementContext)();
    const { element } = (0,_Pimcore_modules_element_hooks_use_element_draft__rspack_import_6.useElementDraft)(id, elementType);
    const tabs = tabManager.getTabs();
    const { rename } = (0,_Pimcore_modules_element_actions_rename_use_rename__rspack_import_9.useRename)(elementType);
    const { unpublishTreeNode } = (0,_Pimcore_modules_element_actions_unpublish_use_unpublish__rspack_import_10.useUnpublish)(elementType);
    const { refreshElement } = (0,_Pimcore_modules_element_actions_refresh_element_use_element_refresh__rspack_import_12.useElementRefresh)(elementType);
    const { locateInTree } = (0,_Pimcore_modules_element_actions_locate_in_tree_use_locate_in_tree__rspack_import_13.useLocateInTree)(elementType);
    const preparedTabs = tabs.map((tab, index)=>{
        const baseTab = {
            ...tabs[index],
            label: typeof tab.label === 'string' ? t(tab.label) : tab.label
        };
        if (tab.key === 'workflow') {
            return {
                ...baseTab,
                hidden: ()=>!(0,_Pimcore_modules_element_utils_workflow_availability__rspack_import_15.isWorkflowAvailable)(element, elementType)
            };
        }
        return baseTab;
    });
    (0,_Pimcore_modules_app_hook_use_handle_keybindings__rspack_import_8.useHandleKeyBindings)(()=>{
        if (element != null && (0,_Pimcore_modules_element_permissions_permission_helper__rspack_import_16.checkElementPermission)(element.permissions, 'rename') && !element.isLocked) rename(element.id, (0,_Pimcore_modules_element_element_helper__rspack_import_11.getElementKey)(element, elementType));
    }, 'rename');
    (0,_Pimcore_modules_app_hook_use_handle_keybindings__rspack_import_8.useHandleKeyBindings)(()=>{
        if (element != null && !(0,lodash__rspack_import_14.isNull)(elementType) && elementType !== 'asset' && (0,_Pimcore_modules_element_permissions_permission_helper__rspack_import_16.checkElementPermission)(element.permissions, 'unpublish') && !element.isLocked) unpublishTreeNode(element);
    }, 'unpublish');
    (0,_Pimcore_modules_app_hook_use_handle_keybindings__rspack_import_8.useHandleKeyBindings)(()=>{
        if (element != null) refreshElement(element.id);
    }, 'refresh');
    (0,_Pimcore_modules_app_hook_use_handle_keybindings__rspack_import_8.useHandleKeyBindings)(()=>{
        if (element != null) locateInTree(element.id);
    }, 'openInTree');
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_element_editor_shared_tab_manager_tab_manager_context__rspack_import_7.TabManagerProvider, {
        tabManager: tabManager,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_element_editor_tabs_editor_tabs__rspack_import_2.EditorTabs, {
            defaultActiveKey: '1',
            items: preparedTabs,
            showLabelIfActive: true
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs-container.tsx",
            lineNumber: 80,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs-container.tsx",
        lineNumber: 79,
        columnNumber: 10
    }, undefined);
};
_s(TabsContainer, "b6UHi7HBSEONBHH2TpBsb5UIMxE=", false, function() {
    return [
        react_i18next__rspack_import_3.useTranslation,
        _Pimcore_app_depency_injection__rspack_import_4.useInjection,
        _Pimcore_modules_element_hooks_use_element_context__rspack_import_5.useElementContext,
        _Pimcore_modules_element_hooks_use_element_draft__rspack_import_6.useElementDraft,
        _Pimcore_modules_element_actions_rename_use_rename__rspack_import_9.useRename,
        _Pimcore_modules_element_actions_unpublish_use_unpublish__rspack_import_10.useUnpublish,
        _Pimcore_modules_element_actions_refresh_element_use_element_refresh__rspack_import_12.useElementRefresh,
        _Pimcore_modules_element_actions_locate_in_tree_use_locate_in_tree__rspack_import_13.useLocateInTree,
        _Pimcore_modules_app_hook_use_handle_keybindings__rspack_import_8.useHandleKeyBindings,
        _Pimcore_modules_app_hook_use_handle_keybindings__rspack_import_8.useHandleKeyBindings,
        _Pimcore_modules_app_hook_use_handle_keybindings__rspack_import_8.useHandleKeyBindings,
        _Pimcore_modules_app_hook_use_handle_keybindings__rspack_import_8.useHandleKeyBindings
    ];
});
_c = TabsContainer;
var _c;
$RefreshReg$(_c, "TabsContainer");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/element/editor/tabs/editor-tabs.icon-wrapper.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  IconWrapper: () => (IconWrapper)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var antd__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* import */ var antd__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(antd__rspack_import_2);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 

const IconWrapper = (param)=>{
    let { tabKey, activeTabKey, tabKeyInFocus, tabKeyOutOfFocus, title, children } = param;
    _s();
    const [showTooltip, setShowTooltip] = (0,react__rspack_import_1.useState)(null);
    (0,react__rspack_import_1.useEffect)(()=>{
        if (tabKeyInFocus !== undefined) {
            setShowTooltip(tabKeyInFocus);
        }
    }, [
        tabKeyInFocus
    ]);
    (0,react__rspack_import_1.useEffect)(()=>{
        if (tabKeyOutOfFocus !== undefined && tabKeyOutOfFocus === showTooltip) {
            setShowTooltip(null);
        }
    }, [
        tabKeyOutOfFocus
    ]);
    const toolTipIsVisible = showTooltip === tabKey && activeTabKey !== tabKey;
    const handleMouseEnter = ()=>{
        setShowTooltip(tabKey);
    };
    const handleMouseLeave = ()=>{
        setShowTooltip(null);
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_2.Tooltip, {
        open: toolTipIsVisible,
        placement: "top",
        title: title,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)("div", {
            onMouseEnter: handleMouseEnter,
            onMouseLeave: handleMouseLeave,
            children: children
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/tabs/editor-tabs.icon-wrapper.tsx",
            lineNumber: 40,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/tabs/editor-tabs.icon-wrapper.tsx",
        lineNumber: 39,
        columnNumber: 10
    }, undefined);
};
_s(IconWrapper, "JFRjn1uz3Bv0o532BV7KPBBiAG4=");
_c = IconWrapper;
var _c;
$RefreshReg$(_c, "IconWrapper");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/element/editor/tabs/editor-tabs.styles.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyle: () => (useStyle)
});
/* import */ var _Pimcore_modules_ant_design_styles_create_styles__rspack_import_0 = __webpack_require__("./js/src/core/modules/ant-design/styles/create-styles.ts");
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
const useStyle = (0,_Pimcore_modules_ant_design_styles_create_styles__rspack_import_0.createStyles)((param)=>{
    let { token, css } = param;
    return {
        editorTabsContainer: css`
      width: 100%;
    `,
        editorTabs: css`
      height: 100%;
      width: 100%;
      overflow: hidden;

      .ant-tabs-content {
        display: flex;
        height: 100%;
      }
      
      &.ant-tabs > .ant-tabs-nav > .ant-tabs-nav-wrap > .ant-tabs-nav-list > .ant-tabs-tab {
        margin: 0 ${token.paddingXS}px !important;
        transition: color .2s;

        display: flex;
        height: 32px;
      }

      .ant-tabs-tabpane {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
      }

      .ant-tabs-content-holder {
        overflow: auto;
      }
      &.ant-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
        color: ${token.colorPrimaryActive}
      }
      &.ant-tabs-top >.ant-tabs-nav {
        margin-bottom: 0;
        padding-right: ${token.paddingXXS}px;
          
        .ant-tabs-nav-wrap {
          display: flex;

          .ant-tabs-nav-list {
            display: flex;
            align-items: center;
            margin-inline-start: auto;
          }
        }
      }

      &.ant-tabs .ant-tabs-tab-btn .ant-tabs-tab-icon:not(:last-child) {
        margin-inline-end: 0;
      }
      
      &.ant-tabs > .ant-tabs-nav > .ant-tabs-nav-wrap > .ant-tabs-nav-list > .ant-tabs-tab {
        padding: 0;
        
        &:first-of-type {
            margin-left: ${token.paddingSM}px;
            margin-right: ${token.paddingSM}px;
        }
        
        .ant-tabs-tab-btn {
          display: flex;
          padding-top: ${token.paddingXS}px;
          padding-bottom: ${token.paddingXS}px;
          justify-content: center;
          align-items: center;
          gap: ${token.paddingTabs}px;
          
          .ant-tabs-tab-icon {
            height: 16px;
            display: flex;
            justify-content: center;
            align-content: center;
            margin-inline-end: 0;
            color: ${token.Tabs.itemUnselectedIconColor};
            
            svg {
              height: 16px;
              width: 16px
            }
          }
        }
          
        .detachable-button {
          display: none;
          color: ${token.Tabs.itemUnselectedIconColor};
          height: ${token.controlHeightSM}px;
          width: ${token.controlHeightSM}px;
        }

        &:not(.ant-tabs-tab-active) {
          .ant-tabs-tab-icon {
            &:hover {
                color: ${token.colorIconHover};
            }
          }
        }
        
        &.ant-tabs-tab-active  {
          .ant-tabs-tab-icon {
              color: ${token.colorPrimaryActive}
          }

          .detachable-button {
            display: flex;
            color: ${token.colorPrimary};
          }
        }
      }
    `,
        onlyActiveLabel: css`
      .ant-tabs-tab:not(.ant-tabs-tab-active) {
          span:nth-child(2) {
              display: none;
          }

          .ant-tabs-tab-icon {
              margin-inline-end: 0;
          }
      }

      @keyframes fadeIn {
          from {
              opacity: 0;
          }

          to {
              opacity: 1;
          }
      }

      .ant-tabs-tab.ant-tabs-tab-active {
          //border-bottom: 3px solid ${token.colorPrimaryActive};
      }
    `
    };
}, {
    hashPriority: 'low'
});

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/element/editor/tabs/editor-tabs.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  EditorTabs: () => (EditorTabs)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _Pimcore_modules_element_editor_tabs_editor_tabs_styles__rspack_import_2 = __webpack_require__("./js/src/core/modules/element/editor/tabs/editor-tabs.styles.tsx");
/* import */ var antd__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* import */ var antd__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(antd__rspack_import_3);
/* import */ var classnames__rspack_import_4 = __webpack_require__("webpack/sharing/consume/default/classnames/classnames");
/* import */ var classnames__rspack_import_4_default = /*#__PURE__*/__webpack_require__.n(classnames__rspack_import_4);
/* import */ var _Pimcore_modules_element_editor_tabs_hooks_use_detach_tab__rspack_import_5 = __webpack_require__("./js/src/core/modules/element/editor/tabs/hooks/use-detach-tab.ts");
/* import */ var _Pimcore_modules_element_components_element_toolbar_element_toolbar__rspack_import_6 = __webpack_require__("./js/src/core/modules/element/components/element-toolbar/element-toolbar.tsx");
/* import */ var _Pimcore_modules_element_editor_tabs_editor_tabs_icon_wrapper__rspack_import_7 = __webpack_require__("./js/src/core/modules/element/editor/tabs/editor-tabs.icon-wrapper.tsx");
/* import */ var _Pimcore_modules_element_hooks_use_element_context__rspack_import_8 = __webpack_require__("./js/src/core/modules/element/hooks/use-element-context.ts");
/* import */ var _Pimcore_utils_hooks_use_element_resize__rspack_import_9 = __webpack_require__("./js/src/core/utils/hooks/use-element-resize.ts");
/* import */ var _Pimcore_modules_element_hooks_use_element_draft__rspack_import_10 = __webpack_require__("./js/src/core/modules/element/hooks/use-element-draft.ts");
/* import */ var _Pimcore_modules_element_permissions_permission_helper__rspack_import_11 = __webpack_require__("./js/src/core/modules/element/permissions/permission-helper.ts");
/* import */ var _Pimcore_modules_auth_permission_helper__rspack_import_12 = __webpack_require__("./js/src/core/modules/auth/permission-helper.ts");
/* import */ var _Pimcore_components_icon_button_icon_button__rspack_import_13 = __webpack_require__("./js/src/core/components/icon-button/icon-button.tsx");
/* import */ var _Pimcore_components_box_box__rspack_import_14 = __webpack_require__("./js/src/core/components/box/box.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 













const EditorTabs = (param)=>{
    let { defaultActiveKey, showLabelIfActive, items } = param;
    _s();
    const { styles } = (0,_Pimcore_modules_element_editor_tabs_editor_tabs_styles__rspack_import_2.useStyle)();
    const { detachWidget } = (0,_Pimcore_modules_element_editor_tabs_hooks_use_detach_tab__rspack_import_5.useDetachTab)();
    const { id, elementType } = (0,_Pimcore_modules_element_hooks_use_element_context__rspack_import_8.useElementContext)();
    const { activeTab, setActiveTab } = (0,_Pimcore_modules_element_hooks_use_element_draft__rspack_import_10.useElementDraft)(id, elementType);
    const [tabKeyInFocus, setTabKeyInFocus] = (0,react__rspack_import_1.useState)(undefined);
    const [tabKeyOutOfFocus, setTabKeyOutOfFocus] = (0,react__rspack_import_1.useState)(undefined);
    const elementDraft = (0,_Pimcore_modules_element_hooks_use_element_draft__rspack_import_10.useElementDraft)(id, elementType);
    const element = elementDraft.element;
    const elementRef = (0,react__rspack_import_1.useRef)(null);
    const { width: editorTabsWidth } = (0,_Pimcore_utils_hooks_use_element_resize__rspack_import_9["default"])(elementRef);
    (0,react__rspack_import_1.useEffect)(()=>{
        if (activeTab === null && (items === null || items === void 0 ? void 0 : items.length) > 0) {
            setActiveTab(items[0].key);
        }
    }, [
        items
    ]);
    const onChange = (key)=>{
        setActiveTab(key);
    };
    const tabKeys = items === null || items === void 0 ? void 0 : items.map((item)=>item.key);
    const findTabKey = (event)=>{
        const target = event.target;
        const id = target.id;
        return tabKeys.find((substring)=>id.includes(substring));
    };
    const onFocus = (event)=>{
        setTabKeyInFocus(findTabKey(event));
    };
    const onBlur = (event)=>{
        setTabKeyOutOfFocus(findTabKey(event));
    };
    const openDetachedWidget = (item)=>{
        detachWidget(item);
        if ((items === null || items === void 0 ? void 0 : items.length) > 0) {
            setActiveTab(items[0].key);
        }
    };
    items = items.filter((item)=>{
        // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
        if (item.hidden !== undefined && item.hidden(element)) {
            return false;
        }
        if (item.workspacePermission !== undefined && (element === null || element === void 0 ? void 0 : element.permissions) !== undefined) {
            if (!(0,_Pimcore_modules_element_permissions_permission_helper__rspack_import_11.checkElementPermission)(element.permissions, item.workspacePermission)) {
                return false;
            }
        }
        if (item.userPermission !== undefined && !(0,_Pimcore_modules_auth_permission_helper__rspack_import_12.isAllowed)(item.userPermission)) {
            return false;
        }
        return true;
    });
    items = items === null || items === void 0 ? void 0 : items.map((item)=>{
        const tmpItem = {
            ...item,
            originalLabel: item.label,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_element_editor_tabs_editor_tabs_icon_wrapper__rspack_import_7.IconWrapper, {
                activeTabKey: activeTab,
                tabKey: item.key,
                tabKeyInFocus: tabKeyInFocus,
                tabKeyOutOfFocus: tabKeyOutOfFocus,
                title: item.label,
                children: item.icon
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/tabs/editor-tabs.tsx",
                lineNumber: 97,
                columnNumber: 13
            }, undefined)
        };
        if (tmpItem.isDetachable === true) {
            tmpItem.label = /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(react_jsx_dev_runtime__rspack_import_0.Fragment, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)("span", {
                        children: tmpItem.label
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/tabs/editor-tabs.tsx",
                        lineNumber: 103,
                        columnNumber: 11
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_button_icon_button__rspack_import_13.IconButton, {
                        className: 'detachable-button',
                        icon: {
                            value: 'share'
                        },
                        onClick: (e)=>{
                            e.stopPropagation();
                            openDetachedWidget({
                                tabKey: item.key
                            });
                        },
                        type: 'link'
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/tabs/editor-tabs.tsx",
                        lineNumber: 104,
                        columnNumber: 11
                    }, undefined)
                ]
            }, void 0, true);
        }
        return tmpItem;
    });
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)("div", {
        className: styles.editorTabsContainer,
        ref: elementRef,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_3.Tabs, {
            activeKey: activeTab ?? undefined,
            className: classnames__rspack_import_4_default()(styles.editorTabs, {
                [styles.onlyActiveLabel]: showLabelIfActive
            }),
            defaultActiveKey: defaultActiveKey,
            items: items,
            onBlur: onBlur,
            onFocus: onFocus,
            onTabClick: onChange,
            tabBarExtraContent: {
                left: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_box_box__rspack_import_14.Box, {
                    padding: "extra-small",
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_element_components_element_toolbar_element_toolbar__rspack_import_6.ElementToolbar, {
                        editorTabsWidth: editorTabsWidth,
                        elementType: elementType,
                        id: id
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/tabs/editor-tabs.tsx",
                        lineNumber: 121,
                        columnNumber: 15
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/tabs/editor-tabs.tsx",
                    lineNumber: 120,
                    columnNumber: 13
                }, undefined)
            }
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/tabs/editor-tabs.tsx",
            lineNumber: 117,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/tabs/editor-tabs.tsx",
        lineNumber: 116,
        columnNumber: 10
    }, undefined);
};
_s(EditorTabs, "46SPCKYwYpxPuTpzK8GLNzcI13E=", false, function() {
    return [
        _Pimcore_modules_element_editor_tabs_editor_tabs_styles__rspack_import_2.useStyle,
        _Pimcore_modules_element_editor_tabs_hooks_use_detach_tab__rspack_import_5.useDetachTab,
        _Pimcore_modules_element_hooks_use_element_context__rspack_import_8.useElementContext,
        _Pimcore_modules_element_hooks_use_element_draft__rspack_import_10.useElementDraft,
        _Pimcore_modules_element_hooks_use_element_draft__rspack_import_10.useElementDraft,
        _Pimcore_utils_hooks_use_element_resize__rspack_import_9["default"]
    ];
});
_c = EditorTabs;
var _c;
$RefreshReg$(_c, "EditorTabs");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/element/hooks/use-edit-lock.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useEditLock: () => (useEditLock)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var react_i18next__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_2);
/* import */ var _sdk_app__rspack_import_3 = __webpack_require__("./js/src/sdk/app/index.ts");
/* import */ var _Pimcore_modules_element_element_api_slice_enhanced__rspack_import_4 = __webpack_require__("./js/src/core/modules/element/element-api-slice-enhanced.ts");
/* import */ var _Pimcore_components_modal_form_modal_hooks_use_form_modal__rspack_import_5 = __webpack_require__("./js/src/core/components/modal/form-modal/hooks/use-form-modal.tsx");
/* import */ var _Pimcore_modules_element_components_edit_lock_warning_edit_lock_warning__rspack_import_6 = __webpack_require__("./js/src/core/modules/element/components/edit-lock-warning/edit-lock-warning.tsx");
/* import */ var _Pimcore_app_api_pimcore_route__rspack_import_7 = __webpack_require__("./js/src/core/app/api/pimcore/route.ts");
/* import */ var _Pimcore_modules_widget_manager_utils_tools__rspack_import_8 = __webpack_require__("./js/src/core/modules/widget-manager/utils/tools.tsx");
/* import */ var _Pimcore_modules_widget_manager_widget_manager_slice__rspack_import_9 = __webpack_require__("./js/src/core/modules/widget-manager/widget-manager-slice.ts");
/* import */ var _Pimcore_app_public_api_element_element_api__rspack_import_10 = __webpack_require__("./js/src/core/app/public-api/element/element-api.ts");
/* import */ var _Pimcore_modules_element_services_edit_lock_gate__rspack_import_11 = __webpack_require__("./js/src/core/modules/element/services/edit-lock-gate.ts");
/* import */ var _Pimcore_modules_app_error_handler__rspack_import_12 = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 











// Renew at most once per this interval (well under the backend lock TTL).
const LOCK_RENEW_INTERVAL_MS = 15 * 60 * 1000;
/**
 * Concurrent-editing edit lock (#2318), mirroring classic UI (admin-ui-classic-bundle #724):
 * acquire on first edit (not on open), warn when another session holds it, release on close/unload.
 */ const useEditLock = (param)=>{
    let { id, elementType, modified, path } = param;
    _s();
    const { t } = (0,react_i18next__rspack_import_2.useTranslation)();
    const dispatch = (0,_sdk_app__rspack_import_3.useAppDispatch)();
    const modal = (0,_Pimcore_components_modal_form_modal_hooks_use_form_modal__rspack_import_5.useFormModal)();
    const [triggerGetEditlock] = (0,_Pimcore_modules_element_element_api_slice_enhanced__rspack_import_4.useLazyElementGetEditlockQuery)();
    const [lockElement] = (0,_Pimcore_modules_element_element_api_slice_enhanced__rspack_import_4.useElementLockMutation)();
    const [unlockElement] = (0,_Pimcore_modules_element_element_api_slice_enhanced__rspack_import_4.useElementUnlockMutation)();
    const acquiredRef = (0,react__rspack_import_1.useRef)(false);
    const checkedRef = (0,react__rspack_import_1.useRef)(false);
    const lastLockTouchRef = (0,react__rspack_import_1.useRef)(0);
    const acquire = (0,react__rspack_import_1.useCallback)(async ()=>{
        try {
            await lockElement({
                id,
                elementType
            }).unwrap();
            acquiredRef.current = true;
            lastLockTouchRef.current = Date.now();
        } catch (error) {
            if ((0,_Pimcore_modules_app_error_handler__rspack_import_12.isApiErrorData)(error)) {
                (0,_Pimcore_modules_app_error_handler__rspack_import_12["default"])(new _Pimcore_modules_app_error_handler__rspack_import_12.ApiError(error));
            }
        }
    }, [
        id,
        elementType,
        lockElement
    ]);
    const renewIfDue = (0,react__rspack_import_1.useCallback)(()=>{
        if (!acquiredRef.current) {
            return;
        }
        if (Date.now() - lastLockTouchRef.current < LOCK_RENEW_INTERVAL_MS) {
            return;
        }
        // Stamp up front so concurrent autosaves don't all renew.
        lastLockTouchRef.current = Date.now();
        void lockElement({
            id,
            elementType
        }).unwrap().catch((error)=>{
            if ((0,_Pimcore_modules_app_error_handler__rspack_import_12.isApiErrorData)(error)) {
                (0,_Pimcore_modules_app_error_handler__rspack_import_12["default"])(new _Pimcore_modules_app_error_handler__rspack_import_12.ApiError(error));
            }
        });
    }, [
        id,
        elementType,
        lockElement
    ]);
    const takeOver = (0,react__rspack_import_1.useCallback)(async ()=>{
        // DELETE then POST: edit_lock is keyed by id, so POST won't overwrite — remove the other lock first.
        try {
            await unlockElement({
                id,
                elementType
            }).unwrap();
        } catch (error) {
            if ((0,_Pimcore_modules_app_error_handler__rspack_import_12.isApiErrorData)(error)) {
                (0,_Pimcore_modules_app_error_handler__rspack_import_12["default"])(new _Pimcore_modules_app_error_handler__rspack_import_12.ApiError(error));
            }
        }
        await acquire();
        (0,_Pimcore_modules_element_services_edit_lock_gate__rspack_import_11.resolveEditLockCheck)(elementType, id, true);
    }, [
        id,
        elementType,
        unlockElement,
        acquire
    ]);
    const closeAndReopen = (0,react__rspack_import_1.useCallback)(()=>{
        dispatch((0,_Pimcore_modules_widget_manager_widget_manager_slice__rspack_import_9.closeWidget)((0,_Pimcore_modules_widget_manager_utils_tools__rspack_import_8.getWidgetId)(elementType, id)));
        void _Pimcore_app_public_api_element_element_api__rspack_import_10.elementOpeningService.openElement(id, elementType);
    }, [
        id,
        elementType,
        dispatch
    ]);
    const resolveLockOnFirstEdit = (0,react__rspack_import_1.useCallback)(async ()=>{
        if (checkedRef.current) {
            return;
        }
        checkedRef.current = true;
        try {
            const status = await triggerGetEditlock({
                id,
                elementType
            }).unwrap();
            if (status.isLocked) {
                var _status_user;
                modal.confirm({
                    title: t('element.edit-lock.title'),
                    content: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_element_components_edit_lock_warning_edit_lock_warning__rspack_import_6.EditLockWarning, {
                        date: status.date,
                        elementType: elementType,
                        path: path,
                        userName: (_status_user = status.user) === null || _status_user === void 0 ? void 0 : _status_user.name
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/hooks/use-edit-lock.tsx",
                        lineNumber: 112,
                        columnNumber: 20
                    }, undefined),
                    okText: t('element.edit-lock.continue'),
                    cancelText: t('element.edit-lock.cancel'),
                    onOk: ()=>{
                        void takeOver();
                    },
                    onCancel: ()=>{
                        // Abort the held autosave and discard via close & reopen.
                        (0,_Pimcore_modules_element_services_edit_lock_gate__rspack_import_11.resolveEditLockCheck)(elementType, id, false);
                        closeAndReopen();
                    }
                });
                return;
            }
            await acquire();
            (0,_Pimcore_modules_element_services_edit_lock_gate__rspack_import_11.resolveEditLockCheck)(elementType, id, true);
        } catch (error) {
            // Check failed: proceed without a lock and don't re-check (the gate is armed once, on mount).
            (0,_Pimcore_modules_element_services_edit_lock_gate__rspack_import_11.resolveEditLockCheck)(elementType, id, true);
            if ((0,_Pimcore_modules_app_error_handler__rspack_import_12.isApiErrorData)(error)) {
                (0,_Pimcore_modules_app_error_handler__rspack_import_12["default"])(new _Pimcore_modules_app_error_handler__rspack_import_12.ApiError(error));
            }
        }
    }, [
        id,
        elementType,
        path,
        triggerGetEditlock,
        modal,
        t,
        acquire,
        takeOver,
        closeAndReopen
    ]);
    // Arm the gate on mount — some editors flip `modified` and autosave in the same tick.
    (0,react__rspack_import_1.useEffect)(()=>{
        (0,_Pimcore_modules_element_services_edit_lock_gate__rspack_import_11.beginEditLockCheck)(elementType, id);
        return ()=>{
            (0,_Pimcore_modules_element_services_edit_lock_gate__rspack_import_11.clearEditLockCheck)(elementType, id);
        };
    }, [
        id,
        elementType
    ]);
    // Renew the lock (throttled) on each autosave so long sessions don't hit the TTL.
    (0,react__rspack_import_1.useEffect)(()=>{
        (0,_Pimcore_modules_element_services_edit_lock_gate__rspack_import_11.registerEditLockRenewHandler)(elementType, id, renewIfDue);
        return ()=>{
            (0,_Pimcore_modules_element_services_edit_lock_gate__rspack_import_11.unregisterEditLockRenewHandler)(elementType, id);
        };
    }, [
        id,
        elementType,
        renewIfDue
    ]);
    (0,react__rspack_import_1.useEffect)(()=>{
        if (modified && !checkedRef.current) {
            void resolveLockOnFirstEdit();
        }
    }, [
        modified,
        resolveLockOnFirstEdit
    ]);
    (0,react__rspack_import_1.useEffect)(()=>{
        return ()=>{
            if (acquiredRef.current) {
                acquiredRef.current = false;
                void unlockElement({
                    id,
                    elementType
                });
            }
        };
    }, [
        id,
        elementType,
        unlockElement
    ]);
    // Release on browser close/reload — `keepalive` fetch (not sendBeacon, which is POST-only).
    (0,react__rspack_import_1.useEffect)(()=>{
        const releaseOnUnload = ()=>{
            if (!acquiredRef.current) {
                return;
            }
            void fetch(`${(0,_Pimcore_app_api_pimcore_route__rspack_import_7.getPrefix)()}/elements/${elementType}/editlock/${id.toString()}`, {
                method: 'DELETE',
                keepalive: true
            });
        };
        window.addEventListener('beforeunload', releaseOnUnload);
        return ()=>{
            window.removeEventListener('beforeunload', releaseOnUnload);
        };
    }, [
        id,
        elementType
    ]);
};
_s(useEditLock, "xE/VLIntmplyHnWTBce1ZaOsZo0=", false, function() {
    return [
        react_i18next__rspack_import_2.useTranslation,
        _sdk_app__rspack_import_3.useAppDispatch,
        _Pimcore_components_modal_form_modal_hooks_use_form_modal__rspack_import_5.useFormModal,
        _Pimcore_modules_element_element_api_slice_enhanced__rspack_import_4.useLazyElementGetEditlockQuery,
        _Pimcore_modules_element_element_api_slice_enhanced__rspack_import_4.useElementLockMutation,
        _Pimcore_modules_element_element_api_slice_enhanced__rspack_import_4.useElementUnlockMutation
    ];
});

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/element/hooks/use-element-actions-menu.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useElementActionsMenu: () => (useElementActionsMenu)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var react_i18next__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_2);
/* import */ var antd__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* import */ var antd__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(antd__rspack_import_3);
/* import */ var _Pimcore_components_flex_flex__rspack_import_4 = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* import */ var _Pimcore_components_text_text__rspack_import_5 = __webpack_require__("./js/src/core/components/text/text.tsx");
/* import */ var _Pimcore_components_icon_icon__rspack_import_6 = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* import */ var _Pimcore_modules_element_element_helper__rspack_import_7 = __webpack_require__("./js/src/core/modules/element/element-helper.ts");
/* import */ var _Pimcore_modules_element_components_system_info_modal_system_info_modal__rspack_import_8 = __webpack_require__("./js/src/core/modules/element/components/system-info-modal/system-info-modal.tsx");
/* import */ var _Pimcore_utils_clipboard__rspack_import_9 = __webpack_require__("./js/src/core/utils/clipboard.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 








const useElementActionsMenu = (param)=>{
    let { element, elementType } = param;
    _s();
    const { t } = (0,react_i18next__rspack_import_2.useTranslation)();
    const { modal } = antd__rspack_import_3.App.useApp();
    if (element === undefined) {
        return {
            actionMenuItems: []
        };
    }
    const deeplinkUrl = (0,_Pimcore_modules_element_element_helper__rspack_import_7.getElementDeeplink)(elementType, element.id);
    const showSystemInfoModal = (data)=>{
        const modalInstance = modal.info({
            title: t('element.full-information'),
            content: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_element_components_system_info_modal_system_info_modal__rspack_import_8.SystemInfoModal, {
                data: data,
                onClose: ()=>{
                    modalInstance.destroy();
                }
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/hooks/use-element-actions-menu.tsx",
                lineNumber: 39,
                columnNumber: 16
            }, undefined),
            icon: null,
            footer: null,
            closable: true
        });
    };
    const actionMenuItems = [
        {
            key: 'copy-id',
            label: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_flex_flex__rspack_import_4.Flex, {
                justify: "space-between",
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_text_text__rspack_import_5.Text, {
                        children: t('element.toolbar.copy-id')
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/hooks/use-element-actions-menu.tsx",
                        lineNumber: 50,
                        columnNumber: 11
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_text_text__rspack_import_5.Text, {
                        style: {
                            fontWeight: 'lighter'
                        },
                        type: "secondary",
                        children: element.id
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/hooks/use-element-actions-menu.tsx",
                        lineNumber: 51,
                        columnNumber: 11
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/hooks/use-element-actions-menu.tsx",
                lineNumber: 49,
                columnNumber: 12
            }, undefined),
            onClick: (e)=>{
                e.domEvent.stopPropagation();
                void (0,_Pimcore_utils_clipboard__rspack_import_9.copyToClipboard)(element.id.toString());
            }
        },
        {
            key: 'copy-full-path',
            label: t('element.toolbar.copy-full-path-to-clipboard'),
            onClick: (e)=>{
                e.domEvent.stopPropagation();
                void (0,_Pimcore_utils_clipboard__rspack_import_9.copyToClipboard)(element.fullPath);
            }
        },
        {
            key: 'copy-deep-link',
            label: t('element.toolbar.copy-deep-link-to-clipboard'),
            onClick: (e)=>{
                e.domEvent.stopPropagation();
                void (0,_Pimcore_utils_clipboard__rspack_import_9.copyToClipboard)(deeplinkUrl);
            }
        },
        {
            type: 'divider'
        },
        {
            key: 'show-full-info',
            label: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_flex_flex__rspack_import_4.Flex, {
                align: "center",
                gap: "extra-small",
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_icon__rspack_import_6.Icon, {
                        value: "info-circle"
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/hooks/use-element-actions-menu.tsx",
                        lineNumber: 78,
                        columnNumber: 11
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_text_text__rspack_import_5.Text, {
                        children: t('element.toolbar.show-full-info')
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/hooks/use-element-actions-menu.tsx",
                        lineNumber: 79,
                        columnNumber: 11
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/hooks/use-element-actions-menu.tsx",
                lineNumber: 77,
                columnNumber: 12
            }, undefined),
            onClick: (e)=>{
                e.domEvent.stopPropagation();
                showSystemInfoModal({
                    ...element,
                    elementType,
                    deeplink: deeplinkUrl
                });
            }
        }
    ];
    if (elementType === 'data-object' && 'className' in element) {
        actionMenuItems === null || actionMenuItems === void 0 ? void 0 : actionMenuItems.splice(0, 0, {
            key: 'copy-className',
            label: t('element.toolbar.copy-className', {
                className: element.className
            }),
            onClick: (e)=>{
                e.domEvent.stopPropagation();
                void (0,_Pimcore_utils_clipboard__rspack_import_9.copyToClipboard)(element.className);
            }
        });
    }
    return {
        actionMenuItems
    };
};
_s(useElementActionsMenu, "+zLwmCpyJr1Qvatfc9tBwxU2fH4=", false, function() {
    return [
        react_i18next__rspack_import_2.useTranslation,
        antd__rspack_import_3.App.useApp
    ];
});

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/user/hooks/use-user-management-context.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useUserManagementContext: () => (useUserManagementContext)
});
/* import */ var react__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var _user_management_provider__rspack_import_1 = __webpack_require__("./js/src/core/modules/user/user-management-provider.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 

const useUserManagementContext = ()=>{
    _s();
    const { id } = (0,react__rspack_import_0.useContext)(_user_management_provider__rspack_import_1.UserContext);
    return {
        id
    };
};
_s(useUserManagementContext, "cXjLo1//Z4eo7bGcJs0ESH2TMGY=");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/user/management/detail/management-detail.styles.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyle: () => (useStyle)
});
/* import */ var _Pimcore_modules_ant_design_styles_create_styles__rspack_import_0 = __webpack_require__("./js/src/core/modules/ant-design/styles/create-styles.ts");
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
const useStyle = (0,_Pimcore_modules_ant_design_styles_create_styles__rspack_import_0.createStyles)((param)=>{
    let { token, css } = param;
    return {
        detailTabs: css`
      display: flex;
      flex-direction: column;
      overflow: hidden;
      padding: ${token.paddingSM}px ${token.paddingSM}px;
      
      .detail-tabs__content {
        height: 100%;
        width: 100%;
        overflow: hidden;
        
        .ant-tabs {
          height: 100%;
          width: 100%;
          overflow: hidden;
        }

        .ant-tabs-content {
          display: flex;
          height: 100%;
          margin-left: -${token.paddingXS}px;
          margin-right: -${token.paddingXS}px;
          padding-left: ${token.paddingXS}px;
          padding-right: ${token.paddingXS}px;
        }

        .ant-tabs-tabpane {
          display: flex;
          flex-direction: column;
          height: 100%;
          width: 100%;
        }

        .ant-tabs-content-holder {
          overflow: auto;
        }
      }
    `
    };
}, {
    hashPriority: 'low'
});

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/user/management/detail/management-detail.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ManagementDetail: () => (ManagementDetail)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _Pimcore_modules_user_management_detail_tabs_user_detail_tab__rspack_import_2 = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/user-detail-tab.tsx");
/* import */ var _Pimcore_modules_user_hooks_use_user_management_helper__rspack_import_3 = __webpack_require__("./js/src/core/modules/user/hooks/use-user-management-helper.tsx");
/* import */ var _Pimcore_components_content_content__rspack_import_4 = __webpack_require__("./js/src/core/components/content/content.tsx");
/* import */ var _Pimcore_modules_user_user_management_slice__rspack_import_5 = __webpack_require__("./js/src/core/modules/user/user-management-slice.tsx");
/* import */ var _Pimcore_app_store__rspack_import_6 = __webpack_require__("./js/src/core/app/store/index.ts");
/* import */ var _Pimcore_components_tabs_tabs__rspack_import_7 = __webpack_require__("./js/src/core/components/tabs/tabs.tsx");
/* import */ var _Pimcore_components_content_layout_content_layout__rspack_import_8 = __webpack_require__("./js/src/core/components/content-layout/content-layout.tsx");
/* import */ var _Pimcore_modules_user_management_toolbar_toolbar__rspack_import_9 = __webpack_require__("./js/src/core/modules/user/management/toolbar/toolbar.tsx");
/* import */ var _Pimcore_modules_user_management_detail_management_detail_styles__rspack_import_10 = __webpack_require__("./js/src/core/modules/user/management/detail/management-detail.styles.tsx");
/* import */ var react_i18next__rspack_import_11 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_11_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_11);
/* import */ var _Pimcore_components_modal_form_modal_hooks_use_form_modal__rspack_import_12 = __webpack_require__("./js/src/core/components/modal/form-modal/hooks/use-form-modal.tsx");
/* import */ var _Pimcore_modules_user_hooks_use_user_management_draft__rspack_import_13 = __webpack_require__("./js/src/core/modules/user/hooks/use-user-management-draft.tsx");
/* import */ var antd__rspack_import_14 = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* import */ var antd__rspack_import_14_default = /*#__PURE__*/__webpack_require__.n(antd__rspack_import_14);
/* import */ var _Pimcore_utils_test_id_generator__rspack_import_15 = __webpack_require__("./js/src/core/utils/test-id-generator.ts");
/* import */ var _Pimcore_modules_auth_hooks_use_user_draft__rspack_import_16 = __webpack_require__("./js/src/core/modules/auth/hooks/use-user-draft.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 















const ManagementDetail = (param)=>{
    let { onCloneUser, onRemoveItem, ...props } = param;
    _s();
    const { t } = (0,react_i18next__rspack_import_11.useTranslation)();
    const { styles } = (0,_Pimcore_modules_user_management_detail_management_detail_styles__rspack_import_10.useStyle)();
    const classNames = [
        'detail-tabs',
        styles.detailTabs
    ];
    const modal = (0,_Pimcore_components_modal_form_modal_hooks_use_form_modal__rspack_import_12.useFormModal)();
    const { user } = (0,_Pimcore_modules_auth_hooks_use_user_draft__rspack_import_16.useUserDraft)();
    const { openUser, closeUser, removeUser, cloneUser, getAllIds, activeId } = (0,_Pimcore_modules_user_hooks_use_user_management_helper__rspack_import_3.useUserManagementHelper)();
    const { user: openedUser } = (0,_Pimcore_modules_user_hooks_use_user_management_draft__rspack_import_13.useUserManagementDraft)(activeId);
    const [popConfirmOpen, setPopConfirmOpen] = (0,react__rspack_import_1.useState)(null);
    const triggerConfirm = (id)=>{
        closeUser(id);
    };
    const onHandleClose = (key)=>{
        var _selectUserById, _selectUserById1;
        if (((_selectUserById = (0,_Pimcore_modules_user_user_management_slice__rspack_import_5.selectUserById)(_Pimcore_app_store__rspack_import_6.store.getState(), parseInt(key))) === null || _selectUserById === void 0 ? void 0 : _selectUserById.modified) && popConfirmOpen === null) {
            if (user === null || user === void 0 ? void 0 : user.allowDirtyClose) {
                triggerConfirm(parseInt(key));
            } else {
                setPopConfirmOpen(parseInt(key));
            }
            return;
        }
        if (!((_selectUserById1 = (0,_Pimcore_modules_user_user_management_slice__rspack_import_5.selectUserById)(_Pimcore_app_store__rspack_import_6.store.getState(), parseInt(key))) === null || _selectUserById1 === void 0 ? void 0 : _selectUserById1.modified)) {
            triggerConfirm(parseInt(key));
            return;
        }
        if (popConfirmOpen !== null) {
            setPopConfirmOpen(null);
        }
    };
    const handleCloneUser = ()=>{
        modal.input({
            title: t('user-management.clone-user'),
            label: t('user-management.clone-user.label'),
            onOk: async (value)=>{
                const data = await cloneUser({
                    id: activeId,
                    name: value
                });
                onCloneUser(data, openedUser === null || openedUser === void 0 ? void 0 : openedUser.parentId);
            }
        });
    };
    const handleRemoveUser = ()=>{
        modal.confirm({
            title: t('user-management.remove-user'),
            content: t('user-management.remove-user.text'),
            onOk: async ()=>{
                triggerConfirm(activeId);
                await removeUser({
                    id: activeId
                });
                onRemoveItem(activeId, openedUser === null || openedUser === void 0 ? void 0 : openedUser.parentId);
            }
        });
    };
    (0,react__rspack_import_1.useEffect)(()=>{
        setPopConfirmOpen(null);
    }, [
        user
    ]);
    if (activeId === undefined) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_content_content__rspack_import_4.Content, {
            none: true
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/management-detail.tsx",
            lineNumber: 105,
            columnNumber: 12
        }, undefined);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_content_layout_content_layout__rspack_import_8.ContentLayout, {
        renderToolbar: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_user_management_toolbar_toolbar__rspack_import_9.Toolbar, {
            id: activeId,
            onCloneUser: handleCloneUser,
            onRemoveUser: handleRemoveUser
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/management-detail.tsx",
            lineNumber: 107,
            columnNumber: 40
        }, undefined),
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)("div", {
            className: classNames.join(' '),
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_tabs_tabs__rspack_import_7.Tabs, {
                    activeKey: activeId.toString(),
                    items: getAllIds.map((id)=>{
                        var _selectUserById, _selectUserById1;
                        return {
                            key: id.toString(),
                            label: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_14.Popconfirm, {
                                onCancel: ()=>{
                                    setPopConfirmOpen(null);
                                },
                                onConfirm: ()=>{
                                    triggerConfirm(id);
                                },
                                open: popConfirmOpen === id,
                                title: t('widget-manager.tab-title.close-confirmation'),
                                children: [
                                    (_selectUserById = (0,_Pimcore_modules_user_user_management_slice__rspack_import_5.selectUserById)(_Pimcore_app_store__rspack_import_6.store.getState(), id)) === null || _selectUserById === void 0 ? void 0 : _selectUserById.name,
                                    " ",
                                    ((_selectUserById1 = (0,_Pimcore_modules_user_user_management_slice__rspack_import_5.selectUserById)(_Pimcore_app_store__rspack_import_6.store.getState(), id)) === null || _selectUserById1 === void 0 ? void 0 : _selectUserById1.modified) ? '*' : ''
                                ]
                            }, void 0, true, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/management-detail.tsx",
                                lineNumber: 111,
                                columnNumber: 16
                            }, undefined)
                        };
                    }),
                    onChange: (id)=>{
                        openUser(Number(id));
                    },
                    onClose: onHandleClose
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/management-detail.tsx",
                    lineNumber: 109,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_content_content__rspack_import_4.Content, {
                    className: 'detail-tabs__content',
                    "data-testid": (0,_Pimcore_utils_test_id_generator__rspack_import_15.createTabContentTestId)(activeId, {
                        prefix: 'user-tab'
                    }),
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_user_management_detail_tabs_user_detail_tab__rspack_import_2.UserDetailTab, {
                        id: activeId
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/management-detail.tsx",
                        lineNumber: 124,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/management-detail.tsx",
                    lineNumber: 121,
                    columnNumber: 9
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/management-detail.tsx",
            lineNumber: 108,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/management-detail.tsx",
        lineNumber: 107,
        columnNumber: 10
    }, undefined);
};
_s(ManagementDetail, "LyDUrbb75ikF6gl1zDq50taO8aY=", false, function() {
    return [
        react_i18next__rspack_import_11.useTranslation,
        _Pimcore_modules_user_management_detail_management_detail_styles__rspack_import_10.useStyle,
        _Pimcore_components_modal_form_modal_hooks_use_form_modal__rspack_import_12.useFormModal,
        _Pimcore_modules_auth_hooks_use_user_draft__rspack_import_16.useUserDraft,
        _Pimcore_modules_user_hooks_use_user_management_helper__rspack_import_3.useUserManagementHelper,
        _Pimcore_modules_user_hooks_use_user_management_draft__rspack_import_13.useUserManagementDraft
    ];
});
_c = ManagementDetail;

var _c;
$RefreshReg$(_c, "ManagementDetail");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/user/management/detail/tabs/key-bindings/key-bindings-container.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  KeyBindingsContainer: () => (KeyBindingsContainer)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _Pimcore_components_form_form__rspack_import_2 = __webpack_require__("./js/src/core/components/form/form.tsx");
/* import */ var _Pimcore_modules_user_hooks_use_user_management_draft__rspack_import_3 = __webpack_require__("./js/src/core/modules/user/hooks/use-user-management-draft.tsx");
/* import */ var _Pimcore_modules_user_hooks_use_user_management_context__rspack_import_4 = __webpack_require__("./js/src/core/modules/user/hooks/use-user-management-context.tsx");
/* import */ var _Pimcore_components_content_content__rspack_import_5 = __webpack_require__("./js/src/core/components/content/content.tsx");
/* import */ var _Pimcore_modules_user_hooks_use_user_management_helper__rspack_import_6 = __webpack_require__("./js/src/core/modules/user/hooks/use-user-management-helper.tsx");
/* import */ var _Pimcore_modules_user_management_detail_tabs_key_bindings_key_bindings__rspack_import_7 = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/key-bindings/key-bindings.tsx");
/* import */ var _Pimcore_utils_test_id_generator__rspack_import_8 = __webpack_require__("./js/src/core/utils/test-id-generator.ts");
/* import */ var _Pimcore_modules_user_hooks_use_merged_keybindings__rspack_import_9 = __webpack_require__("./js/src/core/modules/user/hooks/use-merged-keybindings.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 








const KeyBindingsContainer = ()=>{
    _s();
    const [form] = _Pimcore_components_form_form__rspack_import_2.Form.useForm();
    const { id } = (0,_Pimcore_modules_user_hooks_use_user_management_context__rspack_import_4.useUserManagementContext)();
    const { user, updateUserKeyBinding } = (0,_Pimcore_modules_user_hooks_use_user_management_draft__rspack_import_3.useUserManagementDraft)(id);
    const { resetUserKeyBindings } = (0,_Pimcore_modules_user_hooks_use_user_management_helper__rspack_import_6.useUserManagementHelper)();
    const { mergedKeyBindings, isLoading: isMergingKeyBindings } = (0,_Pimcore_modules_user_hooks_use_merged_keybindings__rspack_import_9.useMergedKeyBindings)(user === null || user === void 0 ? void 0 : user.keyBindings, id);
    const handleOnChange = (name, code)=>{
        updateUserKeyBinding(name, code);
    };
    if (isMergingKeyBindings) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_content_content__rspack_import_5.Content, {
            loading: true
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/key-bindings/key-bindings-container.tsx",
            lineNumber: 40,
            columnNumber: 12
        }, undefined);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_form_form__rspack_import_2.Form, {
        "data-testid": (0,_Pimcore_utils_test_id_generator__rspack_import_8.createTabContentTestId)(id.toString(), {
            prefix: 'user-detail-tab',
            tabKey: 'key-bindings'
        }),
        form: form,
        layout: "vertical",
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_user_management_detail_tabs_key_bindings_key_bindings__rspack_import_7.KeyBindings, {
            onChange: handleOnChange,
            onResetKeyBindings: async ()=>await resetUserKeyBindings(id),
            values: mergedKeyBindings
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/key-bindings/key-bindings-container.tsx",
            lineNumber: 46,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/key-bindings/key-bindings-container.tsx",
        lineNumber: 42,
        columnNumber: 10
    }, undefined);
};
_s(KeyBindingsContainer, "uYR6iegUjgCzE5XrIrvL/htq9cM=", false, function() {
    return [
        _Pimcore_components_form_form__rspack_import_2.Form.useForm,
        _Pimcore_modules_user_hooks_use_user_management_context__rspack_import_4.useUserManagementContext,
        _Pimcore_modules_user_hooks_use_user_management_draft__rspack_import_3.useUserManagementDraft,
        _Pimcore_modules_user_hooks_use_user_management_helper__rspack_import_6.useUserManagementHelper,
        _Pimcore_modules_user_hooks_use_merged_keybindings__rspack_import_9.useMergedKeyBindings
    ];
});
_c = KeyBindingsContainer;

var _c;
$RefreshReg$(_c, "KeyBindingsContainer");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/user/management/detail/tabs/references/components/table/table.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Table: () => (Table)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _Pimcore_components_grid_grid__rspack_import_2 = __webpack_require__("./js/src/core/components/grid/grid.tsx");
/* import */ var _tanstack_react_table__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/@tanstack/react-table/@tanstack/react-table");
/* import */ var _tanstack_react_table__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(_tanstack_react_table__rspack_import_3);
/* import */ var react_i18next__rspack_import_4 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_4_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_4);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 



const Table = (param)=>{
    let { data, isLoading } = param;
    _s();
    const { t } = (0,react_i18next__rspack_import_4.useTranslation)();
    const [gridData, setGridData] = react__rspack_import_1_default().useState(data);
    (0,react__rspack_import_1.useEffect)(()=>{
        setGridData(data);
    }, [
        data
    ]);
    const columnHelper = (0,_tanstack_react_table__rspack_import_3.createColumnHelper)();
    const createColumns = ()=>[
            columnHelper.accessor('id', {
                header: t('user-management.workspaces.columns.id'),
                meta: {
                    type: 'element-cell',
                    editable: true
                },
                size: 100
            }),
            columnHelper.accessor('path', {
                header: t('user-management.workspaces.columns.path'),
                meta: {
                    type: 'element-cell',
                    editable: true,
                    autoWidth: true
                }
            }),
            columnHelper.accessor('subtype', {
                header: t('user-management.workspaces.columns.subtype'),
                meta: {
                    type: 'element-cell',
                    editable: true
                },
                size: 150
            })
        ];
    const ownTableColumns = [
        ...createColumns()
    ];
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_grid_grid__rspack_import_2.Grid, {
        autoWidth: true,
        columns: ownTableColumns,
        data: gridData,
        isLoading: isLoading,
        resizable: true,
        setRowId: (row)=>row.cid
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/references/components/table/table.tsx",
        lineNumber: 50,
        columnNumber: 10
    }, undefined);
};
_s(Table, "rNIBCN+oGVZtDerrLUXvH4d3PZ8=", false, function() {
    return [
        react_i18next__rspack_import_4.useTranslation
    ];
});
_c = Table;
var _c;
$RefreshReg$(_c, "Table");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/user/management/detail/tabs/references/references-container.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ReferenceContainer: () => (ReferenceContainer)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var react_i18next__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_2);
/* import */ var _Pimcore_modules_user_management_detail_tabs_references_components_table_table__rspack_import_3 = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/references/components/table/table.tsx");
/* import */ var _Pimcore_components_accordion_accordion__rspack_import_4 = __webpack_require__("./js/src/core/components/accordion/accordion.tsx");
/* import */ var _Pimcore_modules_user_hooks_use_user_management_draft__rspack_import_5 = __webpack_require__("./js/src/core/modules/user/hooks/use-user-management-draft.tsx");
/* import */ var _Pimcore_modules_user_hooks_use_user_management_context__rspack_import_6 = __webpack_require__("./js/src/core/modules/user/hooks/use-user-management-context.tsx");
/* import */ var _Pimcore_utils_test_id_generator__rspack_import_7 = __webpack_require__("./js/src/core/utils/test-id-generator.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 






const ReferenceContainer = (param)=>{
    let { ...props } = param;
    var _user_objectDependencies;
    _s();
    const { t } = (0,react_i18next__rspack_import_2.useTranslation)();
    const { id } = (0,_Pimcore_modules_user_hooks_use_user_management_context__rspack_import_6.useUserManagementContext)();
    const { user } = (0,_Pimcore_modules_user_hooks_use_user_management_draft__rspack_import_5.useUserManagementDraft)(id);
    const accordionContent = [
        {
            key: '1',
            title: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(react_jsx_dev_runtime__rspack_import_0.Fragment, {
                children: t('user-management.references.object-dependencies')
            }, void 0, false),
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_user_management_detail_tabs_references_components_table_table__rspack_import_3.Table, {
                data: (user === null || user === void 0 ? void 0 : (_user_objectDependencies = user.objectDependencies) === null || _user_objectDependencies === void 0 ? void 0 : _user_objectDependencies.dependencies) ?? [],
                isLoading: false
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/references/references-container.tsx",
                lineNumber: 33,
                columnNumber: 15
            }, undefined)
        }
    ];
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_accordion_accordion__rspack_import_4.Accordion, {
        activeKey: '1',
        bordered: true,
        collapsible: "icon",
        "data-testid": (0,_Pimcore_utils_test_id_generator__rspack_import_7.createTabContentTestId)(id.toString(), {
            prefix: 'user-detail-tab',
            tabKey: 'user-references'
        }),
        items: accordionContent,
        size: 'small',
        table: true
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/references/references-container.tsx",
        lineNumber: 35,
        columnNumber: 10
    }, undefined);
};
_s(ReferenceContainer, "wCY0uTGrPSMErYpH9LqYKnCDyaE=", false, function() {
    return [
        react_i18next__rspack_import_2.useTranslation,
        _Pimcore_modules_user_hooks_use_user_management_context__rspack_import_6.useUserManagementContext,
        _Pimcore_modules_user_hooks_use_user_management_draft__rspack_import_5.useUserManagementDraft
    ];
});
_c = ReferenceContainer;

var _c;
$RefreshReg$(_c, "ReferenceContainer");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/user/management/detail/tabs/settings/components/form/admin-accordion.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  AdminAccordion: () => (AdminAccordion)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var _Pimcore_components_accordion_accordion__rspack_import_1 = __webpack_require__("./js/src/core/components/accordion/accordion.tsx");
/* import */ var _Pimcore_components_switch_switch__rspack_import_2 = __webpack_require__("./js/src/core/components/switch/switch.tsx");
/* import */ var _sdk_modules_auth__rspack_import_3 = __webpack_require__("./js/src/sdk/modules/auth/index.ts");
/* import */ var antd__rspack_import_4 = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* import */ var antd__rspack_import_4_default = /*#__PURE__*/__webpack_require__.n(antd__rspack_import_4);
/* import */ var react__rspack_import_5 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_5_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_5);
/* import */ var react_i18next__rspack_import_6 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_6_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_6);
/* import */ var _login_token_modal_login_token_modal_container__rspack_import_7 = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/settings/components/login-token-modal/login-token-modal-container.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 






const AdminAccordion = (param)=>{
    let { isDisabled, ...props } = param;
    _s();
    const { t } = (0,react_i18next__rspack_import_6.useTranslation)();
    const { Text } = antd__rspack_import_4.Typography;
    const user = (0,_sdk_modules_auth__rspack_import_3.getCurrentUser)();
    const content = [
        {
            key: '1',
            title: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(react_jsx_dev_runtime__rspack_import_0.Fragment, {
                children: t('user-management.admin')
            }, void 0, false),
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(react_jsx_dev_runtime__rspack_import_0.Fragment, {
                children: [
                    user.isAdmin && /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)("div", {
                        className: "m-b-normal",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_4.Form.Item, {
                                name: 'admin',
                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_switch_switch__rspack_import_2.Switch, {
                                    disabled: isDisabled === true,
                                    labelRight: t('user-management.admin'),
                                    size: 'small'
                                }, void 0, false, {
                                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/admin-accordion.tsx",
                                    lineNumber: 35,
                                    columnNumber: 15
                                }, undefined)
                            }, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/admin-accordion.tsx",
                                lineNumber: 34,
                                columnNumber: 13
                            }, undefined),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(Text, {
                                disabled: true,
                                children: t('user-management.admin.info')
                            }, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/admin-accordion.tsx",
                                lineNumber: 38,
                                columnNumber: 13
                            }, undefined)
                        ]
                    }, void 0, true, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/admin-accordion.tsx",
                        lineNumber: 33,
                        columnNumber: 26
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)("div", {
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_login_token_modal_login_token_modal_container__rspack_import_7.LoginTokenModalContainer, {
                            disabled: isDisabled
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/admin-accordion.tsx",
                            lineNumber: 42,
                            columnNumber: 11
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/admin-accordion.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, undefined)
                ]
            }, void 0, true)
        }
    ];
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_accordion_accordion__rspack_import_1.Accordion, {
        activeKey: '1',
        bordered: true,
        items: content,
        size: 'small'
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/admin-accordion.tsx",
        lineNumber: 46,
        columnNumber: 10
    }, undefined);
};
_s(AdminAccordion, "vu2xTFBfHkv41zWfADiErp1aWcA=", false, function() {
    return [
        react_i18next__rspack_import_6.useTranslation
    ];
});
_c = AdminAccordion;

var _c;
$RefreshReg$(_c, "AdminAccordion");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/user/management/detail/tabs/settings/components/form/customisation-accordion.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  CustomisationAccordion: () => (CustomisationAccordion)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var antd__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* import */ var antd__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(antd__rspack_import_2);
/* import */ var _Pimcore_components_accordion_accordion__rspack_import_3 = __webpack_require__("./js/src/core/components/accordion/accordion.tsx");
/* import */ var react_i18next__rspack_import_4 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_4_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_4);
/* import */ var _Pimcore_components_switch_switch__rspack_import_5 = __webpack_require__("./js/src/core/components/switch/switch.tsx");
/* import */ var _Pimcore_components_select_select__rspack_import_6 = __webpack_require__("./js/src/core/components/select/select.tsx");
/* import */ var _Pimcore_modules_app_settings_hooks_use_settings__rspack_import_7 = __webpack_require__("./js/src/core/modules/app/settings/hooks/use-settings.ts");
/* import */ var _Pimcore_modules_perspectives_hooks_use_perspectives__rspack_import_8 = __webpack_require__("./js/src/core/modules/perspectives/hooks/use-perspectives.tsx");
/* import */ var _Pimcore_modules_user_roles_hooks_use_roles_helper__rspack_import_9 = __webpack_require__("./js/src/core/modules/user/roles/hooks/use-roles-helper.tsx");
/* import */ var _Pimcore_modules_translations_hooks_use_language_lookup__rspack_import_10 = __webpack_require__("./js/src/core/modules/translations/hooks/use-language-lookup.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 









const CustomisationAccordion = (param)=>{
    let { isAdmin, ...props } = param;
    _s();
    const { t } = (0,react_i18next__rspack_import_4.useTranslation)();
    const { availableAdminLanguages, validLocales } = (0,_Pimcore_modules_app_settings_hooks_use_settings__rspack_import_7.useSettings)();
    const { getDisplayName } = (0,_Pimcore_modules_translations_hooks_use_language_lookup__rspack_import_10.useLanguageLookup)();
    const [roleOptions, setRoleOptions] = (0,react__rspack_import_1.useState)([]);
    const [perspectiveOptions, setPerspectiveOptions] = (0,react__rspack_import_1.useState)([]);
    const { getRoleCollection } = (0,_Pimcore_modules_user_roles_hooks_use_roles_helper__rspack_import_9.useRoleHelper)();
    const { getPerspectiveConfigCollection } = (0,_Pimcore_modules_perspectives_hooks_use_perspectives__rspack_import_8.usePerspectives)();
    const sortByLabel = (values, options)=>{
        const labelMap = new Map(options.map((o)=>[
                o.value,
                o.label ?? ''
            ]));
        return [
            ...values
        ].sort((a, b)=>(labelMap.get(a) ?? '').localeCompare(labelMap.get(b) ?? ''));
    };
    (0,react__rspack_import_1.useEffect)(()=>{
        if (perspectiveOptions.length === 0) {
            getPerspectiveConfigCollection().then((data)=>{
                if (data === undefined) {
                    return;
                }
                setPerspectiveOptions(data.items.map((item)=>({
                        value: item.id,
                        label: item.name
                    })).sort((a, b)=>(a.label ?? '').localeCompare(b.label ?? '')));
            }).catch((error)=>{
                console.error('Error fetching perspective config collection:', error);
            });
        }
        if (roleOptions.length === 0) {
            getRoleCollection().then((data)=>{
                if (data === undefined) {
                    return;
                }
                setRoleOptions(data.items.map((item)=>({
                        value: item.id,
                        label: item.name
                    })).sort((a, b)=>(a.label ?? '').localeCompare(b.label ?? '')));
            }).catch((error)=>{
                console.error('Error fetching role collection:', error);
            });
        }
    }, []);
    const validLocalesOptions = [
        {
            value: '',
            label: '(system)'
        },
        ...Object.entries(validLocales).map((param)=>{
            let [key, value] = param;
            return {
                value: key,
                label: value
            };
        }).sort((a, b)=>a.label.localeCompare(b.label))
    ];
    const content = [
        {
            key: '1',
            title: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(react_jsx_dev_runtime__rspack_import_0.Fragment, {
                children: t('user-management.customisation')
            }, void 0, false),
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(react_jsx_dev_runtime__rspack_import_0.Fragment, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_2.Form.Item, {
                        label: t('user-management.firstname'),
                        name: "firstname",
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_2.Input, {}, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/customisation-accordion.tsx",
                            lineNumber: 87,
                            columnNumber: 11
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/customisation-accordion.tsx",
                        lineNumber: 86,
                        columnNumber: 9
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_2.Form.Item, {
                        label: t('user-management.lastname'),
                        name: "lastname",
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_2.Input, {}, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/customisation-accordion.tsx",
                            lineNumber: 91,
                            columnNumber: 11
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/customisation-accordion.tsx",
                        lineNumber: 90,
                        columnNumber: 9
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_2.Form.Item, {
                        label: t('user-management.email'),
                        name: "email",
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_2.Input, {
                            type: 'email'
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/customisation-accordion.tsx",
                            lineNumber: 95,
                            columnNumber: 11
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/customisation-accordion.tsx",
                        lineNumber: 94,
                        columnNumber: 9
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_2.Form.Item, {
                        label: t('user-management.language'),
                        name: "language",
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_select_select__rspack_import_6.Select, {
                            optionFilterProp: "label",
                            options: availableAdminLanguages.map((language)=>({
                                    value: language,
                                    label: getDisplayName(language)
                                })).sort((a, b)=>(a.label ?? 'UNKNOWN').localeCompare(b.label ?? 'UNKNOWN')),
                            placeholder: t('user-management.language'),
                            showSearch: true
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/customisation-accordion.tsx",
                            lineNumber: 99,
                            columnNumber: 11
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/customisation-accordion.tsx",
                        lineNumber: 98,
                        columnNumber: 9
                    }, undefined),
                    isAdmin === false ? /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(react_jsx_dev_runtime__rspack_import_0.Fragment, {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_2.Form.Item, {
                                label: t('user-management.roles'),
                                name: "roles",
                                normalize: (values)=>sortByLabel(values, roleOptions),
                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_select_select__rspack_import_6.Select, {
                                    mode: "multiple",
                                    options: roleOptions,
                                    placeholder: t('user-management.roles')
                                }, void 0, false, {
                                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/customisation-accordion.tsx",
                                    lineNumber: 107,
                                    columnNumber: 17
                                }, undefined)
                            }, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/customisation-accordion.tsx",
                                lineNumber: 106,
                                columnNumber: 15
                            }, undefined),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_2.Form.Item, {
                                label: t('user-management.perspectives'),
                                name: "perspectives",
                                normalize: (values)=>sortByLabel(values, perspectiveOptions),
                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_select_select__rspack_import_6.Select, {
                                    mode: "multiple",
                                    options: perspectiveOptions,
                                    placeholder: t('user-management.perspectives')
                                }, void 0, false, {
                                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/customisation-accordion.tsx",
                                    lineNumber: 111,
                                    columnNumber: 17
                                }, undefined)
                            }, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/customisation-accordion.tsx",
                                lineNumber: 110,
                                columnNumber: 15
                            }, undefined)
                        ]
                    }, void 0, true) : null,
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_2.Form.Item, {
                        label: t('user-management.dateTime'),
                        name: "dateTimeLocale",
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_select_select__rspack_import_6.Select, {
                            optionFilterProp: "label",
                            options: validLocalesOptions,
                            placeholder: t('user-management.dateTime'),
                            showSearch: true
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/customisation-accordion.tsx",
                            lineNumber: 116,
                            columnNumber: 11
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/customisation-accordion.tsx",
                        lineNumber: 115,
                        columnNumber: 9
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_2.Form.Item, {
                        name: "welcomeScreen",
                        style: {
                            marginBottom: '0'
                        },
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_switch_switch__rspack_import_5.Switch, {
                            labelRight: t('user-management.welcomeScreen'),
                            size: 'small'
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/customisation-accordion.tsx",
                            lineNumber: 122,
                            columnNumber: 11
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/customisation-accordion.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_2.Form.Item, {
                        name: "memorizeTabs",
                        style: {
                            marginBottom: '0'
                        },
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_switch_switch__rspack_import_5.Switch, {
                            labelRight: t('user-management.memorizeTabs'),
                            size: 'small'
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/customisation-accordion.tsx",
                            lineNumber: 128,
                            columnNumber: 11
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/customisation-accordion.tsx",
                        lineNumber: 125,
                        columnNumber: 9
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_2.Form.Item, {
                        name: "allowDirtyClose",
                        style: {
                            marginBottom: '0'
                        },
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_switch_switch__rspack_import_5.Switch, {
                            labelRight: t('user-management.allowDirtyClose'),
                            size: 'small'
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/customisation-accordion.tsx",
                            lineNumber: 134,
                            columnNumber: 11
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/customisation-accordion.tsx",
                        lineNumber: 131,
                        columnNumber: 9
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_2.Form.Item, {
                        name: "closeWarning",
                        style: {
                            marginBottom: '0'
                        },
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_switch_switch__rspack_import_5.Switch, {
                            labelRight: t('user-management.closeWarning'),
                            size: 'small'
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/customisation-accordion.tsx",
                            lineNumber: 140,
                            columnNumber: 11
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/customisation-accordion.tsx",
                        lineNumber: 137,
                        columnNumber: 9
                    }, undefined)
                ]
            }, void 0, true)
        }
    ];
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_accordion_accordion__rspack_import_3.Accordion, {
        activeKey: '1',
        bordered: true,
        items: content,
        size: 'small'
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/customisation-accordion.tsx",
        lineNumber: 144,
        columnNumber: 10
    }, undefined);
};
_s(CustomisationAccordion, "N5+1iL+EzP6GPHOb3g6tXrrVas4=", false, function() {
    return [
        react_i18next__rspack_import_4.useTranslation,
        _Pimcore_modules_app_settings_hooks_use_settings__rspack_import_7.useSettings,
        _Pimcore_modules_translations_hooks_use_language_lookup__rspack_import_10.useLanguageLookup,
        _Pimcore_modules_user_roles_hooks_use_roles_helper__rspack_import_9.useRoleHelper,
        _Pimcore_modules_perspectives_hooks_use_perspectives__rspack_import_8.usePerspectives
    ];
});
_c = CustomisationAccordion;

var _c;
$RefreshReg$(_c, "CustomisationAccordion");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/user/management/detail/tabs/settings/components/form/permissions-accordion.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  PermissionsAccordion: () => (PermissionsAccordion)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var antd__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* import */ var antd__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(antd__rspack_import_2);
/* import */ var _Pimcore_components_accordion_accordion__rspack_import_3 = __webpack_require__("./js/src/core/components/accordion/accordion.tsx");
/* import */ var react_i18next__rspack_import_4 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_4_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_4);
/* import */ var _Pimcore_components_select_select__rspack_import_5 = __webpack_require__("./js/src/core/components/select/select.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 




const PermissionsAccordion = (param)=>{
    let { permissions, ...props } = param;
    _s();
    const { t } = (0,react_i18next__rspack_import_4.useTranslation)();
    const translatePermissionOptions = (permission)=>({
            value: permission.key,
            label: t(`user-management.permissions.${permission.key}`)
        });
    const sortByTranslatedLabel = (values)=>{
        return [
            ...values
        ].sort((a, b)=>t(`user-management.permissions.${a}`).localeCompare(t(`user-management.permissions.${b}`)));
    };
    const content = [
        {
            key: '1',
            title: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(react_jsx_dev_runtime__rspack_import_0.Fragment, {
                children: t('user-management.permissions.default')
            }, void 0, false),
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(react_jsx_dev_runtime__rspack_import_0.Fragment, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_2.Form.Item, {
                        name: "permissionsDefault",
                        normalize: sortByTranslatedLabel,
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_select_select__rspack_import_5.Select, {
                            dataTestId: "permissions-select-default",
                            mode: "multiple",
                            options: permissions.default.map(translatePermissionOptions).sort((a, b)=>a.label.localeCompare(b.label)),
                            placeholder: t('user-management.permissions.default')
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/permissions-accordion.tsx",
                            lineNumber: 35,
                            columnNumber: 13
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/permissions-accordion.tsx",
                        lineNumber: 34,
                        columnNumber: 11
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_2.Form.Item, {
                        name: "permissionsBundles",
                        normalize: sortByTranslatedLabel,
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_select_select__rspack_import_5.Select, {
                            dataTestId: "permissions-select-bundles",
                            mode: "multiple",
                            options: permissions.bundles.map(translatePermissionOptions).sort((a, b)=>a.label.localeCompare(b.label)),
                            placeholder: t('user-management.permissions.bundles')
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/permissions-accordion.tsx",
                            lineNumber: 38,
                            columnNumber: 13
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/permissions-accordion.tsx",
                        lineNumber: 37,
                        columnNumber: 11
                    }, undefined)
                ]
            }, void 0, true)
        }
    ];
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_accordion_accordion__rspack_import_3.Accordion, {
        activeKey: '1',
        bordered: true,
        items: content,
        size: 'small'
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/permissions-accordion.tsx",
        lineNumber: 42,
        columnNumber: 10
    }, undefined);
};
_s(PermissionsAccordion, "vu2xTFBfHkv41zWfADiErp1aWcA=", false, function() {
    return [
        react_i18next__rspack_import_4.useTranslation
    ];
});
_c = PermissionsAccordion;

var _c;
$RefreshReg$(_c, "PermissionsAccordion");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/user/management/detail/tabs/settings/components/form/shared-translation-settings-accordion.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SharedTranslationSettingsAccordion: () => (SharedTranslationSettingsAccordion)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _Pimcore_components_accordion_accordion__rspack_import_2 = __webpack_require__("./js/src/core/components/accordion/accordion.tsx");
/* import */ var react_i18next__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_3);
/* import */ var _Pimcore_modules_user_management_detail_tabs_settings_components_table_language_table__rspack_import_4 = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/settings/components/table/language-table.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 



const SharedTranslationSettingsAccordion = (param)=>{
    let { data, viewData, editData, onChange, ...props } = param;
    _s();
    const { t } = (0,react_i18next__rspack_import_3.useTranslation)();
    const content = [
        {
            key: '1',
            title: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(react_jsx_dev_runtime__rspack_import_0.Fragment, {
                children: t('user-management.shared-translation-settings')
            }, void 0, false),
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_user_management_detail_tabs_settings_components_table_language_table__rspack_import_4.LanguageTable, {
                data: data,
                editData: editData,
                onChange: (languages)=>{
                    onChange(languages);
                },
                viewData: viewData
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/shared-translation-settings-accordion.tsx",
                lineNumber: 28,
                columnNumber: 15
            }, undefined)
        }
    ];
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_accordion_accordion__rspack_import_2.Accordion, {
        activeKey: '1',
        bordered: true,
        items: content,
        size: 'small',
        table: true
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/shared-translation-settings-accordion.tsx",
        lineNumber: 32,
        columnNumber: 10
    }, undefined);
};
_s(SharedTranslationSettingsAccordion, "vu2xTFBfHkv41zWfADiErp1aWcA=", false, function() {
    return [
        react_i18next__rspack_import_3.useTranslation
    ];
});
_c = SharedTranslationSettingsAccordion;

var _c;
$RefreshReg$(_c, "SharedTranslationSettingsAccordion");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/user/management/detail/tabs/settings/components/form/types-classes-accordion.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TypesAndClassesAccordion: () => (TypesAndClassesAccordion)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var antd__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* import */ var antd__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(antd__rspack_import_2);
/* import */ var _Pimcore_components_accordion_accordion__rspack_import_3 = __webpack_require__("./js/src/core/components/accordion/accordion.tsx");
/* import */ var react_i18next__rspack_import_4 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_4_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_4);
/* import */ var _Pimcore_components_select_select__rspack_import_5 = __webpack_require__("./js/src/core/components/select/select.tsx");
/* import */ var _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_6 = __webpack_require__("./js/src/core/modules/class-definition/class-definition-slice-enhanced.ts");
/* import */ var _Pimcore_modules_document_document_api_slice_enhanced__rspack_import_7 = __webpack_require__("./js/src/core/modules/document/document-api-slice-enhanced.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 






const TypesAndClassesAccordion = ()=>{
    _s();
    const { t } = (0,react_i18next__rspack_import_4.useTranslation)();
    const { data: classesData, isLoading: classesLoading } = (0,_Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_6.useClassDefinitionCollectionQuery)();
    const { data: documentTypesData, isLoading: documentTypesLoading } = (0,_Pimcore_modules_document_document_api_slice_enhanced__rspack_import_7.useDocumentDocTypeListQuery)({});
    const sortByLabel = (values, options)=>{
        const labelMap = new Map(options.map((o)=>[
                o.value,
                o.label ?? ''
            ]));
        return [
            ...values
        ].sort((a, b)=>(labelMap.get(a) ?? '').localeCompare(labelMap.get(b) ?? ''));
    };
    const docTypeOptions = (documentTypesData === null || documentTypesData === void 0 ? void 0 : documentTypesData.items.map((item)=>({
            label: item.name ?? '',
            value: item.id
        })).sort((a, b)=>a.label.localeCompare(b.label))) ?? [];
    const classOptions = (classesData === null || classesData === void 0 ? void 0 : classesData.items.map((item)=>({
            label: item.name ?? '',
            value: item.id
        })).sort((a, b)=>a.label.localeCompare(b.label))) ?? [];
    const content = [
        {
            key: '1',
            title: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(react_jsx_dev_runtime__rspack_import_0.Fragment, {
                children: t('user-management.types-and-classes')
            }, void 0, false),
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(react_jsx_dev_runtime__rspack_import_0.Fragment, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_2.Form.Item, {
                        name: "docTypes",
                        normalize: (values)=>sortByLabel(values, docTypeOptions),
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_select_select__rspack_import_5.Select, {
                            disabled: documentTypesLoading,
                            mode: "multiple",
                            options: docTypeOptions,
                            placeholder: t('user-management.doc-types')
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/types-classes-accordion.tsx",
                            lineNumber: 47,
                            columnNumber: 13
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/types-classes-accordion.tsx",
                        lineNumber: 46,
                        columnNumber: 11
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_2.Form.Item, {
                        name: "classes",
                        normalize: (values)=>sortByLabel(values, classOptions),
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_select_select__rspack_import_5.Select, {
                            disabled: classesLoading,
                            mode: "multiple",
                            options: classOptions,
                            placeholder: t('user-management.classes')
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/types-classes-accordion.tsx",
                            lineNumber: 50,
                            columnNumber: 13
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/types-classes-accordion.tsx",
                        lineNumber: 49,
                        columnNumber: 11
                    }, undefined)
                ]
            }, void 0, true)
        }
    ];
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_accordion_accordion__rspack_import_3.Accordion, {
        activeKey: '1',
        bordered: true,
        items: content,
        size: 'small'
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/types-classes-accordion.tsx",
        lineNumber: 54,
        columnNumber: 10
    }, undefined);
};
_s(TypesAndClassesAccordion, "wmBrroyGRDVU3CXZIO7BmDdcsaI=", false, function() {
    return [
        react_i18next__rspack_import_4.useTranslation,
        _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_6.useClassDefinitionCollectionQuery,
        _Pimcore_modules_document_document_api_slice_enhanced__rspack_import_7.useDocumentDocTypeListQuery
    ];
});
_c = TypesAndClassesAccordion;

var _c;
$RefreshReg$(_c, "TypesAndClassesAccordion");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/user/management/detail/tabs/settings/components/login-token-modal/login-token-modal-container.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  LoginTokenModalContainer: () => (LoginTokenModalContainer)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var _Pimcore_app_config_app_config__rspack_import_1 = __webpack_require__("./js/src/core/app/config/app-config.ts");
/* import */ var _Pimcore_app_router_router__rspack_import_2 = __webpack_require__("./js/src/core/app/router/router.tsx");
/* import */ var _Pimcore_components_button_button__rspack_import_3 = __webpack_require__("./js/src/core/components/button/button.tsx");
/* import */ var _Pimcore_modules_app_modal_holder_use_modal_holder__rspack_import_4 = __webpack_require__("./js/src/core/modules/app/modal-holder/use-modal-holder.ts");
/* import */ var _Pimcore_modules_user_hooks_use_user_management_context__rspack_import_5 = __webpack_require__("./js/src/core/modules/user/hooks/use-user-management-context.tsx");
/* import */ var _Pimcore_modules_user_user_api_slice_enhanced__rspack_import_6 = __webpack_require__("./js/src/core/modules/user/user-api-slice-enhanced.ts");
/* import */ var react__rspack_import_7 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_7_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_7);
/* import */ var react_i18next__rspack_import_8 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_8_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_8);
/* import */ var react_router_dom__rspack_import_9 = __webpack_require__("webpack/sharing/consume/default/react-router-dom/react-router-dom");
/* import */ var react_router_dom__rspack_import_9_default = /*#__PURE__*/__webpack_require__.n(react_router_dom__rspack_import_9);
/* import */ var _login_token_modal__rspack_import_10 = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/settings/components/login-token-modal/login-token-modal.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 









const LoginTokenModalContainer = (param)=>{
    let { disabled } = param;
    _s();
    const { t } = (0,react_i18next__rspack_import_8.useTranslation)();
    const [isOpen, setIsOpen] = (0,react__rspack_import_7.useState)(false);
    const { addModal, removeModal } = (0,_Pimcore_modules_app_modal_holder_use_modal_holder__rspack_import_4.useModalHolder)();
    const modalId = 'login-as-different-user-modal';
    const { id } = (0,_Pimcore_modules_user_hooks_use_user_management_context__rspack_import_5.useUserManagementContext)();
    const [trigger, { data, isLoading, isFetching }] = (0,_Pimcore_modules_user_user_api_slice_enhanced__rspack_import_6.useLazyUserTokenLinkGetQuery)();
    const closeModal = ()=>{
        if (isOpen) {
            setIsOpen(false);
            removeModal(modalId);
        }
    };
    const openModal = async ()=>{
        if (!isOpen) {
            await trigger({
                id,
                tokenLink: {
                    tokenLoginUrl: `${_Pimcore_app_config_app_config__rspack_import_1.currentDomain}${(0,react_router_dom__rspack_import_9.generatePath)(_Pimcore_app_router_router__rspack_import_2.routes.login)}`
                }
            });
            setIsOpen(true);
        }
    };
    (0,react__rspack_import_7.useEffect)(()=>{
        if (isOpen) {
            addModal(modalId, /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_login_token_modal__rspack_import_10.LoginTokenModal, {
                isLoading: isLoading || isFetching,
                onCancel: closeModal,
                onClose: closeModal,
                onOk: closeModal,
                open: isOpen,
                tokenUrl: (data === null || data === void 0 ? void 0 : data.link) ?? ''
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/login-token-modal/login-token-modal-container.tsx",
                lineNumber: 60,
                columnNumber: 25
            }, undefined));
        }
    }, [
        isOpen,
        data,
        isLoading
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_button_button__rspack_import_3.Button, {
        disabled: disabled,
        loading: isLoading || isFetching,
        onClick: openModal,
        type: "default",
        children: t('user-management.admin.login')
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/login-token-modal/login-token-modal-container.tsx",
        lineNumber: 63,
        columnNumber: 10
    }, undefined);
};
_s(LoginTokenModalContainer, "mo3RtykGo1pPEhBJL/7EAj2RNJ4=", false, function() {
    return [
        react_i18next__rspack_import_8.useTranslation,
        _Pimcore_modules_app_modal_holder_use_modal_holder__rspack_import_4.useModalHolder,
        _Pimcore_modules_user_hooks_use_user_management_context__rspack_import_5.useUserManagementContext,
        _Pimcore_modules_user_user_api_slice_enhanced__rspack_import_6.useLazyUserTokenLinkGetQuery
    ];
});
_c = LoginTokenModalContainer;
var _c;
$RefreshReg$(_c, "LoginTokenModalContainer");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/user/management/detail/tabs/settings/components/login-token-modal/login-token-modal.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  LoginTokenModal: () => (LoginTokenModal)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var _Pimcore_components_button_group_button_group__rspack_import_1 = __webpack_require__("./js/src/core/components/button-group/button-group.tsx");
/* import */ var _Pimcore_components_button_button__rspack_import_2 = __webpack_require__("./js/src/core/components/button/button.tsx");
/* import */ var _Pimcore_components_flex_flex__rspack_import_3 = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* import */ var _Pimcore_components_modal_modal__rspack_import_4 = __webpack_require__("./js/src/core/components/modal/modal.tsx");
/* import */ var _Pimcore_utils_clipboard__rspack_import_5 = __webpack_require__("./js/src/core/utils/clipboard.ts");
/* import */ var _sdk_components__rspack_import_6 = __webpack_require__("./js/src/sdk/components/index.ts");
/* import */ var react__rspack_import_7 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_7_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_7);
/* import */ var react_i18next__rspack_import_8 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_8_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_8);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 







const LoginTokenModal = (param)=>{
    let { tokenUrl, isLoading = false, ...props } = param;
    _s();
    const { t } = (0,react_i18next__rspack_import_8.useTranslation)();
    const { success, error } = (0,_sdk_components__rspack_import_6.useMessage)();
    const copyToClipboard = (e)=>{
        var _props_onClose;
        void (0,_Pimcore_utils_clipboard__rspack_import_5.copyToClipboardWithFeedback)(tokenUrl, ()=>{
            void success(t('clipboard.copy.success'));
        }, ()=>{
            void error(t('clipboard.copy.error'));
        });
        (_props_onClose = props.onClose) === null || _props_onClose === void 0 ? void 0 : _props_onClose.call(props, e);
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_modal_modal__rspack_import_4.Modal, {
        ...props,
        footer: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_flex_flex__rspack_import_3.Flex, {
            justify: "end",
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_button_group_button_group__rspack_import_1.ButtonGroup, {
                items: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_button_button__rspack_import_2.Button, {
                        loading: isLoading,
                        onClick: props.onClose,
                        children: t('login-token-modal.close')
                    }, "closeBtn", false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/login-token-modal/login-token-modal.tsx",
                        lineNumber: 39,
                        columnNumber: 77
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_button_button__rspack_import_2.Button, {
                        loading: isLoading,
                        onClick: copyToClipboard,
                        type: "primary",
                        children: t('login-token-modal.copy-and-close')
                    }, "copyAndCloseBtn", false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/login-token-modal/login-token-modal.tsx",
                        lineNumber: 41,
                        columnNumber: 22
                    }, undefined)
                ]
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/login-token-modal/login-token-modal.tsx",
                lineNumber: 39,
                columnNumber: 56
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/login-token-modal/login-token-modal.tsx",
            lineNumber: 39,
            columnNumber: 36
        }, undefined),
        title: t('login-token-modal.title'),
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_flex_flex__rspack_import_3.Flex, {
            vertical: true,
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)("p", {
                    children: [
                        t('login-token-modal.description'),
                        ":"
                    ]
                }, void 0, true, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/login-token-modal/login-token-modal.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_sdk_components__rspack_import_6.TextArea, {
                    readOnly: true,
                    rows: 5,
                    value: tokenUrl
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/login-token-modal/login-token-modal.tsx",
                    lineNumber: 46,
                    columnNumber: 9
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/login-token-modal/login-token-modal.tsx",
            lineNumber: 44,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/login-token-modal/login-token-modal.tsx",
        lineNumber: 39,
        columnNumber: 10
    }, undefined);
};
_s(LoginTokenModal, "nHP74TSLNaRmA+FLjQOmPqbtdF4=", false, function() {
    return [
        react_i18next__rspack_import_8.useTranslation,
        _sdk_components__rspack_import_6.useMessage
    ];
});
_c = LoginTokenModal;
var _c;
$RefreshReg$(_c, "LoginTokenModal");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SettingsContainer: () => (SettingsContainer)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var lodash__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_1);
/* import */ var react__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_2);
/* import */ var antd__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* import */ var antd__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(antd__rspack_import_3);
/* import */ var _Pimcore_components_form_form__rspack_import_4 = __webpack_require__("./js/src/core/components/form/form.tsx");
/* import */ var _Pimcore_components_accordion_accordion__rspack_import_5 = __webpack_require__("./js/src/core/components/accordion/accordion.tsx");
/* import */ var _Pimcore_components_switch_switch__rspack_import_6 = __webpack_require__("./js/src/core/components/switch/switch.tsx");
/* import */ var react_i18next__rspack_import_7 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_7_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_7);
/* import */ var _Pimcore_modules_user_hooks_use_user_management_draft__rspack_import_8 = __webpack_require__("./js/src/core/modules/user/hooks/use-user-management-draft.tsx");
/* import */ var _Pimcore_modules_user_hooks_use_user_management_context__rspack_import_9 = __webpack_require__("./js/src/core/modules/user/hooks/use-user-management-context.tsx");
/* import */ var _Pimcore_components_content_content__rspack_import_10 = __webpack_require__("./js/src/core/components/content/content.tsx");
/* import */ var _Pimcore_utils_test_id_generator__rspack_import_11 = __webpack_require__("./js/src/core/utils/test-id-generator.ts");
/* import */ var _Pimcore_modules_user_management_detail_tabs_settings_components_user_avatar__rspack_import_12 = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/settings/components/user-avatar.tsx");
/* import */ var _Pimcore_modules_user_management_detail_tabs_settings_settings_helper__rspack_import_13 = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/settings/settings-helper.ts");
/* import */ var _Pimcore_components_icon_button_icon_button__rspack_import_14 = __webpack_require__("./js/src/core/components/icon-button/icon-button.tsx");
/* import */ var _Pimcore_modules_app_settings_hooks_use_settings__rspack_import_15 = __webpack_require__("./js/src/core/modules/app/settings/hooks/use-settings.ts");
/* import */ var _Pimcore_modules_user_management_detail_tabs_settings_components_form_admin_accordion__rspack_import_16 = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/settings/components/form/admin-accordion.tsx");
/* import */ var _Pimcore_modules_user_management_detail_tabs_settings_components_form_customisation_accordion__rspack_import_17 = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/settings/components/form/customisation-accordion.tsx");
/* import */ var _Pimcore_modules_user_management_detail_tabs_settings_components_form_permissions_accordion__rspack_import_18 = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/settings/components/form/permissions-accordion.tsx");
/* import */ var _Pimcore_modules_user_management_detail_tabs_settings_components_form_types_classes_accordion__rspack_import_19 = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/settings/components/form/types-classes-accordion.tsx");
/* import */ var _Pimcore_modules_user_management_detail_tabs_settings_components_form_editor_settings_accordion__rspack_import_20 = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/settings/components/form/editor-settings-accordion.tsx");
/* import */ var _Pimcore_modules_user_management_detail_tabs_settings_components_form_shared_translation_settings_accordion__rspack_import_21 = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/settings/components/form/shared-translation-settings-accordion.tsx");
/* import */ var _Pimcore_modules_auth_hooks_use_user__rspack_import_22 = __webpack_require__("./js/src/core/modules/auth/hooks/use-user.ts");
/* import */ var _Pimcore_modules_user_user_api_slice_enhanced__rspack_import_23 = __webpack_require__("./js/src/core/modules/user/user-api-slice-enhanced.ts");
/* import */ var _Pimcore_modules_perspectives_perspectives_slice_enhanced__rspack_import_24 = __webpack_require__("./js/src/core/modules/perspectives/perspectives-slice.enhanced.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 























const SettingsContainer = (param)=>{
    let { ...props } = param;
    _s();
    const { validLanguages } = (0,_Pimcore_modules_app_settings_hooks_use_settings__rspack_import_15.useSettings)();
    const [form] = _Pimcore_components_form_form__rspack_import_4.Form.useForm();
    const { t } = (0,react_i18next__rspack_import_7.useTranslation)();
    const { Text } = antd__rspack_import_3.Typography;
    const { id } = (0,_Pimcore_modules_user_hooks_use_user_management_context__rspack_import_9.useUserManagementContext)();
    const user = (0,_Pimcore_modules_auth_hooks_use_user__rspack_import_22.useUser)();
    const { user: openedUser, isLoading, changeUserInState, updateUserImageInState } = (0,_Pimcore_modules_user_hooks_use_user_management_draft__rspack_import_8.useUserManagementDraft)(id);
    const { data: availablePermissionsData, isLoading: permissionsLoading } = (0,_Pimcore_modules_user_user_api_slice_enhanced__rspack_import_23.useUserGetAvailablePermissionsQuery)();
    const { isLoading: perspectivesLoading } = (0,_Pimcore_modules_perspectives_perspectives_slice_enhanced__rspack_import_24.usePerspectiveGetConfigCollectionQuery)();
    const permissions = (0,_Pimcore_modules_user_management_detail_tabs_settings_settings_helper__rspack_import_13.getGroupedPermissions)((availablePermissionsData === null || availablePermissionsData === void 0 ? void 0 : availablePermissionsData.items) ?? []);
    const [passwordType, setPasswordType] = react__rspack_import_2_default().useState('password');
    const buildFormValues = ()=>{
        var _openedUser_twoFactorAuthentication;
        return {
            active: openedUser === null || openedUser === void 0 ? void 0 : openedUser.active,
            admin: openedUser === null || openedUser === void 0 ? void 0 : openedUser.admin,
            classes: openedUser === null || openedUser === void 0 ? void 0 : openedUser.classes,
            docTypes: openedUser === null || openedUser === void 0 ? void 0 : openedUser.docTypes,
            name: openedUser === null || openedUser === void 0 ? void 0 : openedUser.name,
            twoFactorAuthenticationRequired: (openedUser === null || openedUser === void 0 ? void 0 : (_openedUser_twoFactorAuthentication = openedUser.twoFactorAuthentication) === null || _openedUser_twoFactorAuthentication === void 0 ? void 0 : _openedUser_twoFactorAuthentication.required) ?? false,
            firstname: openedUser === null || openedUser === void 0 ? void 0 : openedUser.firstname,
            lastname: openedUser === null || openedUser === void 0 ? void 0 : openedUser.lastname,
            email: openedUser === null || openedUser === void 0 ? void 0 : openedUser.email,
            language: openedUser === null || openedUser === void 0 ? void 0 : openedUser.language,
            dateTimeLocale: (openedUser === null || openedUser === void 0 ? void 0 : openedUser.dateTimeLocale) ?? '',
            welcomeScreen: openedUser === null || openedUser === void 0 ? void 0 : openedUser.welcomeScreen,
            memorizeTabs: openedUser === null || openedUser === void 0 ? void 0 : openedUser.memorizeTabs,
            allowDirtyClose: openedUser === null || openedUser === void 0 ? void 0 : openedUser.allowDirtyClose,
            closeWarning: openedUser === null || openedUser === void 0 ? void 0 : openedUser.closeWarning,
            roles: (openedUser === null || openedUser === void 0 ? void 0 : openedUser.roles) ?? [],
            perspectives: (openedUser === null || openedUser === void 0 ? void 0 : openedUser.perspectives) ?? [],
            permissionsDefault: Array.isArray(openedUser === null || openedUser === void 0 ? void 0 : openedUser.permissions) ? openedUser.permissions.filter((permission)=>permissions.default.some((defaultPermission)=>defaultPermission.key === permission)).sort((a, b)=>t(`user-management.permissions.${a}`).localeCompare(t(`user-management.permissions.${b}`))) : [],
            permissionsBundles: Array.isArray(openedUser === null || openedUser === void 0 ? void 0 : openedUser.permissions) ? openedUser.permissions.filter((permission)=>permissions.bundles.some((defaultPermission)=>defaultPermission.key === permission)).sort((a, b)=>t(`user-management.permissions.${a}`).localeCompare(t(`user-management.permissions.${b}`))) : []
        };
    };
    const onValuesChange = (0,react__rspack_import_2.useCallback)((0,lodash__rspack_import_1.debounce)((changedValues, allValues)=>{
        if (changedValues.permissionsDefault !== undefined || changedValues.permissionsBundles !== undefined) {
            allValues.permissions = [
                ...changedValues.permissionsDefault ?? allValues.permissionsDefault ?? [],
                ...changedValues.permissionsBundles ?? allValues.permissionsBundles ?? []
            ];
        }
        changeUserInState(allValues);
    }, 300), [
        changeUserInState
    ]);
    const formatLastLogin = (timestamp)=>{
        const date = new Date(timestamp * 1000);
        return date.toLocaleString();
    };
    if (isLoading || permissionsLoading || perspectivesLoading) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_content_content__rspack_import_10.Content, {
            loading: true
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
            lineNumber: 99,
            columnNumber: 12
        }, undefined);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_form_form__rspack_import_4.Form, {
        "data-testid": (0,_Pimcore_utils_test_id_generator__rspack_import_11.createTabContentTestId)(id.toString(), {
            prefix: 'user-detail-tab',
            tabKey: 'settings'
        }),
        form: form,
        initialValues: buildFormValues(),
        layout: "vertical",
        onValuesChange: onValuesChange,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_3.Row, {
            gutter: [
                10,
                10
            ],
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_3.Col, {
                    span: 8,
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_accordion_accordion__rspack_import_5.Accordion, {
                        activeKey: '1',
                        bordered: true,
                        items: [
                            {
                                key: '1',
                                title: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(react_jsx_dev_runtime__rspack_import_0.Fragment, {
                                    children: t('user-management.general')
                                }, void 0, false),
                                info: 'ID: ' + id,
                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(react_jsx_dev_runtime__rspack_import_0.Fragment, {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_3.Flex, {
                                            align: "center",
                                            gap: "small",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_form_form__rspack_import_4.Form.Item, {
                                                    className: 'm-b-none',
                                                    name: "active",
                                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_switch_switch__rspack_import_6.Switch, {
                                                        disabled: (user === null || user === void 0 ? void 0 : user.id) === (openedUser === null || openedUser === void 0 ? void 0 : openedUser.id),
                                                        labelRight: t('user-management.active'),
                                                        size: 'small'
                                                    }, void 0, false, {
                                                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
                                                        lineNumber: 114,
                                                        columnNumber: 23
                                                    }, undefined)
                                                }, void 0, false, {
                                                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
                                                    lineNumber: 113,
                                                    columnNumber: 21
                                                }, undefined),
                                                (openedUser === null || openedUser === void 0 ? void 0 : openedUser.lastLogin) !== undefined && (openedUser === null || openedUser === void 0 ? void 0 : openedUser.lastLogin) !== null ? /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(Text, {
                                                    disabled: true,
                                                    children: [
                                                        t('user-management.last-login'),
                                                        ": ",
                                                        formatLastLogin(openedUser.lastLogin)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
                                                    lineNumber: 117,
                                                    columnNumber: 94
                                                }, undefined) : null
                                            ]
                                        }, void 0, true, {
                                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
                                            lineNumber: 112,
                                            columnNumber: 19
                                        }, undefined),
                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_form_form__rspack_import_4.Form.Item, {
                                            label: t('user-management.name'),
                                            name: 'name',
                                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_3.Input, {
                                                disabled: true
                                            }, void 0, false, {
                                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
                                                lineNumber: 121,
                                                columnNumber: 21
                                            }, undefined)
                                        }, void 0, false, {
                                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
                                            lineNumber: 120,
                                            columnNumber: 19
                                        }, undefined),
                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_form_form__rspack_import_4.Form.Item, {
                                            label: t('user-management.password'),
                                            name: 'password',
                                            rules: [
                                                {
                                                    min: 10
                                                }
                                            ],
                                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_3.Input, {
                                                autoComplete: "new-password",
                                                suffix: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_button_icon_button__rspack_import_14.IconButton, {
                                                    icon: {
                                                        value: 'locked'
                                                    },
                                                    onClick: ()=>{
                                                        const newPassword = (0,_Pimcore_modules_user_management_detail_tabs_settings_settings_helper__rspack_import_13.generatePassword)();
                                                        form.setFieldValue('password', newPassword);
                                                        changeUserInState({
                                                            password: newPassword
                                                        });
                                                        setPasswordType('text');
                                                    },
                                                    title: t('user-management.generate-password'),
                                                    variant: 'minimal'
                                                }, void 0, false, {
                                                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
                                                    lineNumber: 127,
                                                    columnNumber: 64
                                                }, undefined),
                                                type: passwordType
                                            }, void 0, false, {
                                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
                                                lineNumber: 127,
                                                columnNumber: 21
                                            }, undefined)
                                        }, void 0, false, {
                                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
                                            lineNumber: 124,
                                            columnNumber: 19
                                        }, undefined),
                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_form_form__rspack_import_4.Form.Item, {
                                            name: 'twoFactorAuthenticationRequired',
                                            style: {
                                                marginBottom: '0'
                                            },
                                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_switch_switch__rspack_import_6.Switch, {
                                                labelRight: t('user-management.two-factor-authentication'),
                                                size: 'small'
                                            }, void 0, false, {
                                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
                                                lineNumber: 142,
                                                columnNumber: 21
                                            }, undefined)
                                        }, void 0, false, {
                                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
                                            lineNumber: 139,
                                            columnNumber: 19
                                        }, undefined)
                                    ]
                                }, void 0, true)
                            }
                        ],
                        size: 'small'
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
                        lineNumber: 107,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
                    lineNumber: 106,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_3.Col, {
                    span: 8,
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_user_management_detail_tabs_settings_components_user_avatar__rspack_import_12.UserAvatar, {
                        onUserImageChanged: (imageUrl)=>{
                            updateUserImageInState(imageUrl);
                        },
                        user: openedUser
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
                        lineNumber: 148,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
                    lineNumber: 147,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_3.Col, {
                    span: 16,
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_user_management_detail_tabs_settings_components_form_customisation_accordion__rspack_import_17.CustomisationAccordion, {
                        isAdmin: openedUser === null || openedUser === void 0 ? void 0 : openedUser.admin
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
                        lineNumber: 153,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
                    lineNumber: 152,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_3.Col, {
                    span: 16,
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_user_management_detail_tabs_settings_components_form_admin_accordion__rspack_import_16.AdminAccordion, {
                        isDisabled: (user === null || user === void 0 ? void 0 : user.id) === (openedUser === null || openedUser === void 0 ? void 0 : openedUser.id)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
                        lineNumber: 156,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
                    lineNumber: 155,
                    columnNumber: 9
                }, undefined),
                (openedUser === null || openedUser === void 0 ? void 0 : openedUser.admin) === false ? /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(react_jsx_dev_runtime__rspack_import_0.Fragment, {
                    children: [
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_3.Col, {
                            span: 16,
                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_user_management_detail_tabs_settings_components_form_permissions_accordion__rspack_import_18.PermissionsAccordion, {
                                permissions: permissions
                            }, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
                                lineNumber: 161,
                                columnNumber: 17
                            }, undefined)
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
                            lineNumber: 160,
                            columnNumber: 15
                        }, undefined),
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_3.Col, {
                            span: 16,
                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_user_management_detail_tabs_settings_components_form_types_classes_accordion__rspack_import_19.TypesAndClassesAccordion, {}, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
                                lineNumber: 164,
                                columnNumber: 17
                            }, undefined)
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
                            lineNumber: 163,
                            columnNumber: 15
                        }, undefined)
                    ]
                }, void 0, true) : null,
                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_3.Col, {
                    span: 16,
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_user_management_detail_tabs_settings_components_form_editor_settings_accordion__rspack_import_20.EditorSettingsAccordion, {
                        data: openedUser === null || openedUser === void 0 ? void 0 : openedUser.contentLanguages,
                        editData: openedUser === null || openedUser === void 0 ? void 0 : openedUser.websiteTranslationLanguagesEdit,
                        onChange: (languages)=>{
                            changeUserInState({
                                contentLanguages: languages
                            });
                        },
                        viewData: openedUser === null || openedUser === void 0 ? void 0 : openedUser.websiteTranslationLanguagesView
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
                        lineNumber: 169,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
                    lineNumber: 168,
                    columnNumber: 9
                }, undefined),
                (openedUser === null || openedUser === void 0 ? void 0 : openedUser.admin) === false ? /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_3.Col, {
                    span: 16,
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_user_management_detail_tabs_settings_components_form_shared_translation_settings_accordion__rspack_import_21.SharedTranslationSettingsAccordion, {
                        data: validLanguages,
                        editData: openedUser === null || openedUser === void 0 ? void 0 : openedUser.websiteTranslationLanguagesEdit,
                        onChange: (languages)=>{
                            changeUserInState({
                                websiteTranslationLanguagesEdit: languages.filter((language)=>language.edit).map((language)=>language.abbreviation),
                                websiteTranslationLanguagesView: languages.filter((language)=>language.view).map((language)=>language.abbreviation)
                            });
                        },
                        viewData: openedUser === null || openedUser === void 0 ? void 0 : openedUser.websiteTranslationLanguagesView
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
                        lineNumber: 177,
                        columnNumber: 15
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
                    lineNumber: 176,
                    columnNumber: 40
                }, undefined) : null
            ]
        }, void 0, true, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
            lineNumber: 105,
            columnNumber: 7
        }, undefined)
    }, id, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
        lineNumber: 101,
        columnNumber: 10
    }, undefined);
};
_s(SettingsContainer, "44RG9z+bVts9ECfiD5W2arxyN5c=", false, function() {
    return [
        _Pimcore_modules_app_settings_hooks_use_settings__rspack_import_15.useSettings,
        _Pimcore_components_form_form__rspack_import_4.Form.useForm,
        react_i18next__rspack_import_7.useTranslation,
        _Pimcore_modules_user_hooks_use_user_management_context__rspack_import_9.useUserManagementContext,
        _Pimcore_modules_auth_hooks_use_user__rspack_import_22.useUser,
        _Pimcore_modules_user_hooks_use_user_management_draft__rspack_import_8.useUserManagementDraft,
        _Pimcore_modules_user_user_api_slice_enhanced__rspack_import_23.useUserGetAvailablePermissionsQuery,
        _Pimcore_modules_perspectives_perspectives_slice_enhanced__rspack_import_24.usePerspectiveGetConfigCollectionQuery
    ];
});
_c = SettingsContainer;

var _c;
$RefreshReg$(_c, "SettingsContainer");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/user/management/detail/tabs/user-detail-tab.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  UserDetailTab: () => (UserDetailTab)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _Pimcore_components_tabs_tabs__rspack_import_2 = __webpack_require__("./js/src/core/components/tabs/tabs.tsx");
/* import */ var _Pimcore_modules_user_management_detail_tabs_settings_settings_container__rspack_import_3 = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx");
/* import */ var _Pimcore_modules_user_management_detail_tabs_workspaces_workspaces_container__rspack_import_4 = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/workspaces/workspaces-container.tsx");
/* import */ var _Pimcore_modules_user_management_detail_tabs_key_bindings_key_bindings_container__rspack_import_5 = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/key-bindings/key-bindings-container.tsx");
/* import */ var _Pimcore_modules_user_management_detail_tabs_references_references_container__rspack_import_6 = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/references/references-container.tsx");
/* import */ var react_i18next__rspack_import_7 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_7_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_7);
/* import */ var _Pimcore_modules_user_user_management_provider__rspack_import_8 = __webpack_require__("./js/src/core/modules/user/user-management-provider.tsx");
/* import */ var _Pimcore_modules_widget_manager_hooks_use_is_active_main_widget__rspack_import_9 = __webpack_require__("./js/src/core/modules/widget-manager/hooks/use-is-active-main-widget.ts");
/* import */ var _Pimcore_modules_user_hooks_use_global_user_management_context__rspack_import_10 = __webpack_require__("./js/src/core/modules/user/hooks/use-global-user-management-context.ts");
/* import */ var _Pimcore_modules_user_hooks_use_user_management_draft__rspack_import_11 = __webpack_require__("./js/src/core/modules/user/hooks/use-user-management-draft.tsx");
/* import */ var _Pimcore_components_content_content__rspack_import_12 = __webpack_require__("./js/src/core/components/content/content.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 











const UserDetailTab = (param)=>{
    let { id, ...props } = param;
    _s();
    const { t } = (0,react_i18next__rspack_import_7.useTranslation)();
    const isWidgetActive = (0,_Pimcore_modules_widget_manager_hooks_use_is_active_main_widget__rspack_import_9.useIsActiveMainWidget)();
    const { setContext, removeContext } = (0,_Pimcore_modules_user_hooks_use_global_user_management_context__rspack_import_10.useGlobalUserContext)();
    const { user, isLoading, isError, removeUserFromState } = (0,_Pimcore_modules_user_hooks_use_user_management_draft__rspack_import_11.useUserManagementDraft)(id);
    (0,react__rspack_import_1.useEffect)(()=>{
        return ()=>{
            removeContext();
            removeUserFromState();
        };
    }, []);
    (0,react__rspack_import_1.useEffect)(()=>{
        if (isWidgetActive) {
            setContext({
                id
            });
        }
        return ()=>{
            if (!isWidgetActive) {
                removeContext();
            }
        };
    }, [
        isWidgetActive
    ]);
    if (isError) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)("div", {
            children: "Error"
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/user-detail-tab.tsx",
            lineNumber: 60,
            columnNumber: 12
        }, undefined);
    }
    if (isLoading) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_content_content__rspack_import_12.Content, {
            loading: true
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/user-detail-tab.tsx",
            lineNumber: 63,
            columnNumber: 12
        }, undefined);
    }
    if (user === undefined) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(react_jsx_dev_runtime__rspack_import_0.Fragment, {}, void 0, false);
    }
    const items = [
        {
            key: 'settings',
            label: t('user-management.settings.title'),
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_user_management_detail_tabs_settings_settings_container__rspack_import_3.SettingsContainer, {}, id, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/user-detail-tab.tsx",
                lineNumber: 71,
                columnNumber: 15
            }, undefined)
        },
        {
            key: 'workspaces',
            label: t('user-management.workspaces.title'),
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_user_management_detail_tabs_workspaces_workspaces_container__rspack_import_4.WorkspacesContainer, {}, id, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/user-detail-tab.tsx",
                lineNumber: 75,
                columnNumber: 15
            }, undefined),
            disabled: user.admin
        },
        {
            key: 'key-bindings',
            label: t('user-management.key-bindings.title'),
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_user_management_detail_tabs_key_bindings_key_bindings_container__rspack_import_5.KeyBindingsContainer, {}, id, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/user-detail-tab.tsx",
                lineNumber: 80,
                columnNumber: 15
            }, undefined)
        },
        {
            key: 'user-references',
            label: t('user-management.references.title'),
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_user_management_detail_tabs_references_references_container__rspack_import_6.ReferenceContainer, {}, id, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/user-detail-tab.tsx",
                lineNumber: 84,
                columnNumber: 15
            }, undefined)
        }
    ];
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_user_user_management_provider__rspack_import_8.UserManagementProvider, {
        id: id,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_tabs_tabs__rspack_import_2.Tabs, {
            defaultActiveKey: "1",
            destroyInactiveTabPane: true,
            items: items
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/user-detail-tab.tsx",
            lineNumber: 87,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/user-detail-tab.tsx",
        lineNumber: 86,
        columnNumber: 10
    }, undefined);
};
_s(UserDetailTab, "6jQPMR72b59VwIrgVjt/XEKOre4=", false, function() {
    return [
        react_i18next__rspack_import_7.useTranslation,
        _Pimcore_modules_widget_manager_hooks_use_is_active_main_widget__rspack_import_9.useIsActiveMainWidget,
        _Pimcore_modules_user_hooks_use_global_user_management_context__rspack_import_10.useGlobalUserContext,
        _Pimcore_modules_user_hooks_use_user_management_draft__rspack_import_11.useUserManagementDraft
    ];
});
_c = UserDetailTab;

var _c;
$RefreshReg$(_c, "UserDetailTab");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/user/management/detail/tabs/workspaces/components/special-settings-modal.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SpecialSettingsModal: () => (SpecialSettingsModal)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var react_i18next__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_2);
/* import */ var _Pimcore_components_modal_modal__rspack_import_3 = __webpack_require__("./js/src/core/components/modal/modal.tsx");
/* import */ var _Pimcore_components_modal_footer_modal_footer__rspack_import_4 = __webpack_require__("./js/src/core/components/modal/footer/modal-footer.tsx");
/* import */ var _Pimcore_components_button_button__rspack_import_5 = __webpack_require__("./js/src/core/components/button/button.tsx");
/* import */ var _Pimcore_modules_user_management_detail_tabs_workspaces_components_special_settings__rspack_import_6 = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/workspaces/components/special-settings.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 





const SpecialSettingsModal = (param)=>{
    let { open, cpath, initialValues, onCancel, onApply } = param;
    _s();
    const { t } = (0,react_i18next__rspack_import_2.useTranslation)();
    const pendingChangesRef = (0,react__rspack_import_1.useRef)({
        ...initialValues
    });
    (0,react__rspack_import_1.useEffect)(()=>{
        if (open) {
            pendingChangesRef.current = {
                ...initialValues
            };
        }
    }, [
        open
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_modal_modal__rspack_import_3.Modal, {
        footer: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_modal_footer_modal_footer__rspack_import_4.ModalFooter, {
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_button_button__rspack_import_5.Button, {
                    onClick: onCancel,
                    type: 'default',
                    children: t('button.cancel')
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/components/special-settings-modal.tsx",
                    lineNumber: 38,
                    columnNumber: 11
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_button_button__rspack_import_5.Button, {
                    onClick: ()=>{
                        onApply(pendingChangesRef.current);
                    },
                    type: 'primary',
                    children: t('button.apply')
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/components/special-settings-modal.tsx",
                    lineNumber: 41,
                    columnNumber: 11
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/components/special-settings-modal.tsx",
            lineNumber: 37,
            columnNumber: 25
        }, undefined),
        onCancel: onCancel,
        open: open,
        size: 'L',
        title: `${t('user-management.workspaces.additional-settings')} — ${cpath}`,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_user_management_detail_tabs_workspaces_components_special_settings__rspack_import_6.SpecialSettings, {
            layouts: initialValues.layouts,
            localizedEdit: initialValues.localizedEdit,
            localizedView: initialValues.localizedView,
            onValuesChange: (changedValues)=>{
                pendingChangesRef.current = {
                    ...pendingChangesRef.current,
                    ...changedValues
                };
            }
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/components/special-settings-modal.tsx",
            lineNumber: 47,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/components/special-settings-modal.tsx",
        lineNumber: 37,
        columnNumber: 10
    }, undefined);
};
_s(SpecialSettingsModal, "hiVY4KXs/p+MXpC1ldA+N1lJq9U=", false, function() {
    return [
        react_i18next__rspack_import_2.useTranslation
    ];
});
_c = SpecialSettingsModal;

var _c;
$RefreshReg$(_c, "SpecialSettingsModal");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/user/management/detail/tabs/workspaces/components/special-settings.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SpecialSettings: () => (SpecialSettings)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _Pimcore_components_accordion_accordion__rspack_import_2 = __webpack_require__("./js/src/core/components/accordion/accordion.tsx");
/* import */ var react_i18next__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_3);
/* import */ var _Pimcore_components_flex_flex__rspack_import_4 = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* import */ var _Pimcore_modules_class_definition_class_definition_slice_gen__rspack_import_5 = __webpack_require__("./js/src/core/modules/class-definition/class-definition-slice.gen.ts");
/* import */ var _Pimcore_components_select_select__rspack_import_6 = __webpack_require__("./js/src/core/components/select/select.tsx");
/* import */ var antd__rspack_import_7 = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* import */ var antd__rspack_import_7_default = /*#__PURE__*/__webpack_require__.n(antd__rspack_import_7);
/* import */ var _Pimcore_modules_app_settings_hooks_use_settings__rspack_import_8 = __webpack_require__("./js/src/core/modules/app/settings/hooks/use-settings.ts");
/* import */ var _Pimcore_modules_translations_hooks_use_language_lookup__rspack_import_9 = __webpack_require__("./js/src/core/modules/translations/hooks/use-language-lookup.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 








const SpecialSettings = (param)=>{
    let { localizedView, localizedEdit, layouts, onValuesChange } = param;
    _s();
    const { t } = (0,react_i18next__rspack_import_3.useTranslation)();
    const { data } = (0,_Pimcore_modules_class_definition_class_definition_slice_gen__rspack_import_5.useClassAllLayoutCollectionQuery)();
    const { validLanguages } = (0,_Pimcore_modules_app_settings_hooks_use_settings__rspack_import_8.useSettings)();
    const { getDisplayName } = (0,_Pimcore_modules_translations_hooks_use_language_lookup__rspack_import_9.useLanguageLookup)();
    const [form] = antd__rspack_import_7.Form.useForm();
    const languageOptions = validLanguages.map((lang)=>({
            value: lang,
            label: getDisplayName(lang) ?? lang
        })).sort((a, b)=>a.label.localeCompare(b.label));
    const layoutOptions = (data === null || data === void 0 ? void 0 : data.items.map((layout)=>({
            value: layout.id,
            label: layout.name ?? ''
        })).sort((a, b)=>a.label.localeCompare(b.label))) ?? [];
    const sortByLabel = (values, options)=>{
        const labelMap = new Map(options.map((o)=>[
                o.value,
                o.label ?? ''
            ]));
        return [
            ...values
        ].sort((a, b)=>(labelMap.get(a) ?? '').localeCompare(labelMap.get(b) ?? ''));
    };
    (0,react__rspack_import_1.useEffect)(()=>{
        form.setFieldsValue({
            localizedView: sortByLabel(localizedView, languageOptions),
            localizedEdit: sortByLabel(localizedEdit, languageOptions),
            layouts: sortByLabel(layouts, layoutOptions)
        });
    }, []);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_7.Form, {
        form: form,
        layout: "vertical",
        onValuesChange: onValuesChange,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_flex_flex__rspack_import_4.Flex, {
            gap: 'small',
            vertical: true,
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_accordion_accordion__rspack_import_2.Accordion, {
                    activeKey: 'localizedFields',
                    bordered: true,
                    items: [
                        {
                            key: 'localizedFields',
                            title: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(react_jsx_dev_runtime__rspack_import_0.Fragment, {
                                children: t('user-management.workspaces.localized-fields')
                            }, void 0, false),
                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(react_jsx_dev_runtime__rspack_import_0.Fragment, {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_7.Form.Item, {
                                        label: t('user-management.workspaces.localized-fields.view'),
                                        name: "localizedView",
                                        normalize: (values)=>sortByLabel(values, languageOptions),
                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_select_select__rspack_import_6.Select, {
                                            mode: "multiple",
                                            options: languageOptions,
                                            placeholder: t('user-management.workspaces.localized-fields.view')
                                        }, void 0, false, {
                                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/components/special-settings.tsx",
                                            lineNumber: 65,
                                            columnNumber: 19
                                        }, undefined)
                                    }, void 0, false, {
                                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/components/special-settings.tsx",
                                        lineNumber: 64,
                                        columnNumber: 17
                                    }, undefined),
                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_7.Form.Item, {
                                        label: t('user-management.workspaces.localized-fields.edit'),
                                        name: "localizedEdit",
                                        normalize: (values)=>sortByLabel(values, languageOptions),
                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_select_select__rspack_import_6.Select, {
                                            mode: "multiple",
                                            options: languageOptions,
                                            placeholder: t('user-management.workspaces.localized-fields.edit')
                                        }, void 0, false, {
                                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/components/special-settings.tsx",
                                            lineNumber: 69,
                                            columnNumber: 19
                                        }, undefined)
                                    }, void 0, false, {
                                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/components/special-settings.tsx",
                                        lineNumber: 68,
                                        columnNumber: 17
                                    }, undefined)
                                ]
                            }, void 0, true)
                        }
                    ],
                    size: 'small'
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/components/special-settings.tsx",
                    lineNumber: 60,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_accordion_accordion__rspack_import_2.Accordion, {
                    activeKey: 'customLayouts',
                    bordered: true,
                    items: [
                        {
                            key: 'customLayouts',
                            title: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(react_jsx_dev_runtime__rspack_import_0.Fragment, {
                                children: t('user-management.workspaces.custom-layouts')
                            }, void 0, false),
                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_7.Form.Item, {
                                label: t('user-management.workspaces.custom-layouts.select'),
                                name: "layouts",
                                normalize: (values)=>sortByLabel(values, layoutOptions),
                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_select_select__rspack_import_6.Select, {
                                    mode: "multiple",
                                    options: layoutOptions,
                                    placeholder: t('user-management.workspaces.custom-layouts.select')
                                }, void 0, false, {
                                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/components/special-settings.tsx",
                                    lineNumber: 78,
                                    columnNumber: 17
                                }, undefined)
                            }, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/components/special-settings.tsx",
                                lineNumber: 77,
                                columnNumber: 19
                            }, undefined)
                        }
                    ],
                    size: 'small'
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/components/special-settings.tsx",
                    lineNumber: 74,
                    columnNumber: 9
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/components/special-settings.tsx",
            lineNumber: 59,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/components/special-settings.tsx",
        lineNumber: 58,
        columnNumber: 10
    }, undefined);
};
_s(SpecialSettings, "vUEwtuT2PKc5urw+ZWazfTHFUa0=", false, function() {
    return [
        react_i18next__rspack_import_3.useTranslation,
        _Pimcore_modules_class_definition_class_definition_slice_gen__rspack_import_5.useClassAllLayoutCollectionQuery,
        _Pimcore_modules_app_settings_hooks_use_settings__rspack_import_8.useSettings,
        _Pimcore_modules_translations_hooks_use_language_lookup__rspack_import_9.useLanguageLookup,
        antd__rspack_import_7.Form.useForm
    ];
});
_c = SpecialSettings;

var _c;
$RefreshReg$(_c, "SpecialSettings");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/user/management/detail/tabs/workspaces/components/table/table.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Table: () => (Table)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _Pimcore_components_grid_grid__rspack_import_2 = __webpack_require__("./js/src/core/components/grid/grid.tsx");
/* import */ var _tanstack_react_table__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/@tanstack/react-table/@tanstack/react-table");
/* import */ var _tanstack_react_table__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(_tanstack_react_table__rspack_import_3);
/* import */ var react_i18next__rspack_import_4 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_4_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_4);
/* import */ var _Pimcore_components_icon_button_icon_button__rspack_import_5 = __webpack_require__("./js/src/core/components/icon-button/icon-button.tsx");
/* import */ var antd__rspack_import_6 = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* import */ var antd__rspack_import_6_default = /*#__PURE__*/__webpack_require__.n(antd__rspack_import_6);
/* import */ var _Pimcore_utils_test_id_generator__rspack_import_7 = __webpack_require__("./js/src/core/utils/test-id-generator.ts");
/* import */ var _Pimcore_modules_user_management_detail_tabs_workspaces_workspace_type__rspack_import_8 = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/workspaces/workspace-type.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 







const Table = (param)=>{
    let { showDuplicatePropertyModal, data, type, isLoading, onUpdateData, onShowSpecialSettings } = param;
    _s();
    const { t } = (0,react_i18next__rspack_import_4.useTranslation)();
    const [gridData, setGridData] = react__rspack_import_1_default().useState(data);
    const isAsset = type === _Pimcore_modules_user_management_detail_tabs_workspaces_workspace_type__rspack_import_8.WorkspaceType.ASSET;
    const isObject = type === _Pimcore_modules_user_management_detail_tabs_workspaces_workspace_type__rspack_import_8.WorkspaceType.OBJECT;
    (0,react__rspack_import_1.useEffect)(()=>{
        setGridData(data);
    }, [
        data
    ]);
    const columnHelper = (0,_tanstack_react_table__rspack_import_3.createColumnHelper)();
    const createColumns = ()=>[
            columnHelper.accessor('cpath', {
                header: t('user-management.workspaces.columns.cpath'),
                meta: {
                    type,
                    editable: true,
                    autoWidth: true
                },
                size: 272
            }),
            columnHelper.accessor('list', {
                header: t('user-management.workspaces.columns.list'),
                size: 72,
                meta: {
                    type: 'checkbox',
                    editable: true,
                    config: {
                        align: 'center'
                    }
                }
            }),
            columnHelper.accessor('view', {
                header: t('user-management.workspaces.columns.view'),
                size: 72,
                meta: {
                    type: 'checkbox',
                    editable: true,
                    config: {
                        align: 'center'
                    }
                }
            }),
            !isAsset ? columnHelper.accessor('save', {
                header: t('user-management.workspaces.columns.save'),
                size: 72,
                meta: {
                    type: 'checkbox',
                    editable: true,
                    config: {
                        align: 'center'
                    }
                }
            }) : null,
            columnHelper.accessor('publish', {
                header: t('user-management.workspaces.columns.publish'),
                size: 72,
                meta: {
                    type: 'checkbox',
                    editable: true,
                    config: {
                        align: 'center'
                    }
                }
            }),
            !isAsset ? columnHelper.accessor('unpublish', {
                header: t('user-management.workspaces.columns.unpublish'),
                size: 72,
                meta: {
                    type: 'checkbox',
                    editable: true,
                    config: {
                        align: 'center'
                    }
                }
            }) : null,
            columnHelper.accessor('delete', {
                header: t('user-management.workspaces.columns.delete'),
                size: 72,
                meta: {
                    type: 'checkbox',
                    editable: true,
                    config: {
                        align: 'center'
                    }
                }
            }),
            columnHelper.accessor('rename', {
                header: t('user-management.workspaces.columns.rename'),
                size: 72,
                meta: {
                    type: 'checkbox',
                    editable: true,
                    config: {
                        align: 'center'
                    }
                }
            }),
            columnHelper.accessor('create', {
                header: t('user-management.workspaces.columns.create'),
                size: 72,
                meta: {
                    type: 'checkbox',
                    editable: true,
                    config: {
                        align: 'center'
                    }
                }
            }),
            columnHelper.accessor('settings', {
                header: t('user-management.workspaces.columns.settings'),
                size: 72,
                meta: {
                    type: 'checkbox',
                    editable: true,
                    config: {
                        align: 'center'
                    }
                }
            }),
            columnHelper.accessor('versions', {
                header: t('user-management.workspaces.columns.versions'),
                size: 72,
                meta: {
                    type: 'checkbox',
                    editable: true,
                    config: {
                        align: 'center'
                    }
                }
            }),
            columnHelper.accessor('properties', {
                header: t('user-management.workspaces.columns.properties'),
                size: 72,
                meta: {
                    type: 'checkbox',
                    editable: true,
                    config: {
                        align: 'center'
                    }
                }
            }),
            ...isObject && onShowSpecialSettings !== undefined ? [
                columnHelper.display({
                    id: 'specialSettings',
                    header: '',
                    size: 40,
                    cell: (context)=>{
                        return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_6.Flex, {
                            align: "center",
                            className: "w-full h-full",
                            justify: "center",
                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_button_icon_button__rspack_import_5.IconButton, {
                                icon: {
                                    value: 'settings'
                                },
                                onClick: ()=>{
                                    const cid = context.row.original.cid;
                                    onShowSpecialSettings(cid);
                                },
                                type: "link"
                            }, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/components/table/table.tsx",
                                lineNumber: 161,
                                columnNumber: 17
                            }, undefined)
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/components/table/table.tsx",
                            lineNumber: 160,
                            columnNumber: 14
                        }, undefined);
                    }
                })
            ] : [],
            columnHelper.display({
                id: 'actions',
                header: '',
                size: 40,
                cell: (context)=>{
                    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_6.Flex, {
                        align: "center",
                        className: "w-full h-full",
                        justify: "center",
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_button_icon_button__rspack_import_5.IconButton, {
                            icon: {
                                value: 'trash'
                            },
                            onClick: ()=>{
                                handleRemoveRow(context.row.id);
                            },
                            type: "link"
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/components/table/table.tsx",
                            lineNumber: 175,
                            columnNumber: 13
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/components/table/table.tsx",
                        lineNumber: 174,
                        columnNumber: 14
                    }, undefined);
                }
            })
        ].filter(Boolean);
    const ownTableColumns = [
        ...createColumns()
    ];
    const onUpdateCellData = (param)=>{
        let { rowIndex, columnId, value, rowData } = param;
        setGridData(gridData.map((item, index)=>{
            if (index === rowIndex) {
                return {
                    ...item,
                    [columnId]: value
                };
            }
            return item;
        }));
        const updatedProperties = [
            ...gridData ?? []
        ];
        const propertyIndex = updatedProperties.findIndex((property)=>property.cpath === rowData.cpath);
        const updatedProperty = {
            ...updatedProperties.at(propertyIndex),
            [columnId]: value,
            cid: value.id !== undefined ? value.id : rowData.cid,
            cpath: value.fullPath !== undefined ? value.fullPath : rowData.cpath
        };
        updatedProperties[propertyIndex] = updatedProperty;
        const hasDuplicate = updatedProperties.filter((property)=>property.cpath === updatedProperty.cpath).length > 1;
        if (hasDuplicate) {
            updatedProperty.cpath = '';
            setGridData(updatedProperties);
            showDuplicatePropertyModal();
        } else {
            setGridData(updatedProperties);
            onUpdateData(updatedProperties);
        }
    };
    const handleRemoveRow = (id)=>{
        const updatedProperties = [
            ...gridData ?? []
        ];
        const propertyIndex = updatedProperties.findIndex((property)=>property.cid === id);
        updatedProperties.splice(propertyIndex, 1);
        setGridData(updatedProperties);
        onUpdateData(updatedProperties);
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_grid_grid__rspack_import_2.Grid, {
        autoWidth: true,
        columns: ownTableColumns,
        data: gridData,
        dataTestId: (0,_Pimcore_utils_test_id_generator__rspack_import_7.createTableTestId)(`user-workspaces-${type ?? 'unknown'}`),
        isLoading: isLoading,
        onUpdateCellData: onUpdateCellData,
        resizable: true,
        setRowId: (row)=>row.cid
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/components/table/table.tsx",
        lineNumber: 225,
        columnNumber: 10
    }, undefined);
};
_s(Table, "rNIBCN+oGVZtDerrLUXvH4d3PZ8=", false, function() {
    return [
        react_i18next__rspack_import_4.useTranslation
    ];
});
_c = Table;
var _c;
$RefreshReg$(_c, "Table");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/user/management/detail/tabs/workspaces/workspaces-container.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  WorkspacesContainer: () => (WorkspacesContainer)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _Pimcore_components_accordion_accordion__rspack_import_2 = __webpack_require__("./js/src/core/components/accordion/accordion.tsx");
/* import */ var react_i18next__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_3);
/* import */ var _Pimcore_modules_user_management_detail_tabs_workspaces_components_table_table__rspack_import_4 = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/workspaces/components/table/table.tsx");
/* import */ var _Pimcore_components_icon_text_button_icon_text_button__rspack_import_5 = __webpack_require__("./js/src/core/components/icon-text-button/icon-text-button.tsx");
/* import */ var _Pimcore_modules_user_hooks_use_user_management_draft__rspack_import_6 = __webpack_require__("./js/src/core/modules/user/hooks/use-user-management-draft.tsx");
/* import */ var _Pimcore_modules_user_hooks_use_user_management_context__rspack_import_7 = __webpack_require__("./js/src/core/modules/user/hooks/use-user-management-context.tsx");
/* import */ var _Pimcore_components_flex_flex__rspack_import_8 = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* import */ var _Pimcore_components_modal_useModal__rspack_import_9 = __webpack_require__("./js/src/core/components/modal/useModal/index.tsx");
/* import */ var _Pimcore_components_modal_footer_modal_footer__rspack_import_10 = __webpack_require__("./js/src/core/components/modal/footer/modal-footer.tsx");
/* import */ var _Pimcore_components_button_button__rspack_import_11 = __webpack_require__("./js/src/core/components/button/button.tsx");
/* import */ var _Pimcore_utils_test_id_generator__rspack_import_12 = __webpack_require__("./js/src/core/utils/test-id-generator.ts");
/* import */ var _Pimcore_modules_user_management_detail_tabs_workspaces_components_special_settings_modal__rspack_import_13 = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/workspaces/components/special-settings-modal.tsx");
/* import */ var _Pimcore_modules_user_management_detail_tabs_workspaces_workspace_type__rspack_import_14 = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/workspaces/workspace-type.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 













const WorkspacesContainer = (param)=>{
    let { ...props } = param;
    var _user_dataObjectWorkspaces_find;
    _s();
    const { t } = (0,react_i18next__rspack_import_3.useTranslation)();
    const { id } = (0,_Pimcore_modules_user_hooks_use_user_management_context__rspack_import_7.useUserManagementContext)();
    const { user, isLoading, changeUserInState } = (0,_Pimcore_modules_user_hooks_use_user_management_draft__rspack_import_6.useUserManagementDraft)(id);
    const [assetWorkspaces, setAssetWorkspaces] = (0,react__rspack_import_1.useState)((user === null || user === void 0 ? void 0 : user.assetWorkspaces) ?? []);
    const [documentWorkspaces, setDocumentWorkspaces] = (0,react__rspack_import_1.useState)((user === null || user === void 0 ? void 0 : user.documentWorkspaces) ?? []);
    const [objectWorkspaces, setObjectWorkspaces] = (0,react__rspack_import_1.useState)((user === null || user === void 0 ? void 0 : user.dataObjectWorkspaces) ?? []);
    (0,react__rspack_import_1.useEffect)(()=>{
        setAssetWorkspaces((user === null || user === void 0 ? void 0 : user.assetWorkspaces) ?? []);
        setDocumentWorkspaces((user === null || user === void 0 ? void 0 : user.documentWorkspaces) ?? []);
        setObjectWorkspaces((user === null || user === void 0 ? void 0 : user.dataObjectWorkspaces) ?? []);
    }, [
        id
    ]);
    const [specialModalContext, setSpecialModalContext] = (0,react__rspack_import_1.useState)(null);
    const { showModal: showDuplicatePropertyModal, closeModal: closeDuplicatePropertyModal, renderModal: DuplicatePropertyModal } = (0,_Pimcore_components_modal_useModal__rspack_import_9.useModal)({
        type: 'error'
    });
    const [isSpecialSettingsModalOpen, setIsSpecialSettingsModalOpen] = (0,react__rspack_import_1.useState)(false);
    if (user === undefined) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(react_jsx_dev_runtime__rspack_import_0.Fragment, {}, void 0, false);
    }
    const documentsAccordion = [
        {
            key: 'documents',
            id: 'documents',
            title: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(react_jsx_dev_runtime__rspack_import_0.Fragment, {
                children: t('user-management.workspaces.documents')
            }, void 0, false),
            info: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_text_button_icon_text_button__rspack_import_5.IconTextButton, {
                icon: {
                    value: 'add-find'
                },
                onClick: ()=>{
                    setDocumentWorkspaces([
                        ...user.documentWorkspaces,
                        {
                            cid: new Date().getTime(),
                            // after path update is set to document id
                            cpath: '',
                            list: false,
                            view: false,
                            save: false,
                            publish: false,
                            unpublish: false,
                            delete: false,
                            rename: false,
                            create: false,
                            settings: false,
                            versions: false,
                            properties: false
                        }
                    ]);
                },
                children: t('user-management.workspaces.add')
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/workspaces-container.tsx",
                lineNumber: 63,
                columnNumber: 11
            }, undefined),
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_user_management_detail_tabs_workspaces_components_table_table__rspack_import_4.Table, {
                data: documentWorkspaces,
                isLoading: isLoading,
                onUpdateData: (data)=>{
                    changeUserInState({
                        documentWorkspaces: data
                    });
                },
                showDuplicatePropertyModal: ()=>{
                    showDuplicatePropertyModal();
                },
                type: _Pimcore_modules_user_management_detail_tabs_workspaces_workspace_type__rspack_import_14.WorkspaceType.DOCUMENT
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/workspaces-container.tsx",
                lineNumber: 85,
                columnNumber: 15
            }, undefined)
        }
    ];
    const assetsAccordion = [
        {
            key: 'assets',
            id: 'assets',
            title: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(react_jsx_dev_runtime__rspack_import_0.Fragment, {
                children: t('user-management.workspaces.assets')
            }, void 0, false),
            info: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_text_button_icon_text_button__rspack_import_5.IconTextButton, {
                icon: {
                    value: 'add-find'
                },
                onClick: ()=>{
                    setAssetWorkspaces([
                        ...user.assetWorkspaces,
                        {
                            cid: new Date().getTime(),
                            // after path update is set to document id
                            cpath: '',
                            list: false,
                            view: false,
                            publish: false,
                            delete: false,
                            rename: false,
                            create: false,
                            settings: false,
                            versions: false,
                            properties: false
                        }
                    ]);
                },
                children: t('user-management.workspaces.add')
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/workspaces-container.tsx",
                lineNumber: 97,
                columnNumber: 11
            }, undefined),
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_user_management_detail_tabs_workspaces_components_table_table__rspack_import_4.Table, {
                data: assetWorkspaces,
                isLoading: isLoading,
                onUpdateData: (data)=>{
                    changeUserInState({
                        assetWorkspaces: data
                    });
                },
                showDuplicatePropertyModal: ()=>{
                    showDuplicatePropertyModal();
                },
                type: _Pimcore_modules_user_management_detail_tabs_workspaces_workspace_type__rspack_import_14.WorkspaceType.ASSET
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/workspaces-container.tsx",
                lineNumber: 117,
                columnNumber: 15
            }, undefined)
        }
    ];
    const getSpecialModalValues = (type)=>{
        var _user_dataObjectWorkspaces_find;
        return (user === null || user === void 0 ? void 0 : (_user_dataObjectWorkspaces_find = user.dataObjectWorkspaces.find((ws)=>ws.cid === specialModalContext)) === null || _user_dataObjectWorkspaces_find === void 0 ? void 0 : _user_dataObjectWorkspaces_find[type]) ?? [];
    };
    const objectsAccordion = [
        {
            key: 'objects',
            id: 'objects',
            title: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(react_jsx_dev_runtime__rspack_import_0.Fragment, {
                children: t('user-management.workspaces.objects')
            }, void 0, false),
            info: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_text_button_icon_text_button__rspack_import_5.IconTextButton, {
                icon: {
                    value: 'add-find'
                },
                onClick: ()=>{
                    setObjectWorkspaces([
                        ...user.dataObjectWorkspaces,
                        {
                            cid: new Date().getTime(),
                            // after path update is set to document id
                            cpath: '',
                            list: false,
                            view: false,
                            save: false,
                            publish: false,
                            unpublish: false,
                            delete: false,
                            rename: false,
                            create: false,
                            settings: false,
                            versions: false,
                            properties: false
                        }
                    ]);
                },
                children: t('user-management.workspaces.add')
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/workspaces-container.tsx",
                lineNumber: 132,
                columnNumber: 11
            }, undefined),
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_user_management_detail_tabs_workspaces_components_table_table__rspack_import_4.Table, {
                data: objectWorkspaces,
                isLoading: isLoading,
                onShowSpecialSettings: (id)=>{
                    setSpecialModalContext(id);
                    setIsSpecialSettingsModalOpen(true);
                },
                onUpdateData: (data)=>{
                    changeUserInState({
                        dataObjectWorkspaces: data
                    });
                },
                showDuplicatePropertyModal: ()=>{
                    showDuplicatePropertyModal();
                },
                type: _Pimcore_modules_user_management_detail_tabs_workspaces_workspace_type__rspack_import_14.WorkspaceType.OBJECT
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/workspaces-container.tsx",
                lineNumber: 154,
                columnNumber: 15
            }, undefined)
        }
    ];
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_flex_flex__rspack_import_8.Flex, {
        "data-testid": (0,_Pimcore_utils_test_id_generator__rspack_import_12.createTabContentTestId)(id.toString(), {
            prefix: 'user-detail-tab',
            tabKey: 'workspaces'
        }),
        gap: 'small',
        vertical: true,
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_accordion_accordion__rspack_import_2.Accordion, {
                activeKey: 'documents',
                bordered: true,
                collapsible: "icon",
                items: documentsAccordion,
                size: 'small',
                table: true
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/workspaces-container.tsx",
                lineNumber: 169,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_accordion_accordion__rspack_import_2.Accordion, {
                activeKey: 'assets',
                bordered: true,
                collapsible: "icon",
                items: assetsAccordion,
                size: 'small',
                table: true
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/workspaces-container.tsx",
                lineNumber: 171,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_accordion_accordion__rspack_import_2.Accordion, {
                activeKey: 'objects',
                bordered: true,
                collapsible: "icon",
                items: objectsAccordion,
                size: 'small',
                table: true
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/workspaces-container.tsx",
                lineNumber: 173,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(DuplicatePropertyModal, {
                footer: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_modal_footer_modal_footer__rspack_import_10.ModalFooter, {
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_button_button__rspack_import_11.Button, {
                        onClick: closeDuplicatePropertyModal,
                        type: "primary",
                        children: t('button.ok')
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/workspaces-container.tsx",
                        lineNumber: 176,
                        columnNumber: 13
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/workspaces-container.tsx",
                    lineNumber: 175,
                    columnNumber: 39
                }, undefined),
                title: t('properties.property-already-exist.title'),
                children: t('properties.property-already-exist.error')
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/workspaces-container.tsx",
                lineNumber: 175,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_user_management_detail_tabs_workspaces_components_special_settings_modal__rspack_import_13.SpecialSettingsModal, {
                cpath: ((_user_dataObjectWorkspaces_find = user.dataObjectWorkspaces.find((ws)=>ws.cid === specialModalContext)) === null || _user_dataObjectWorkspaces_find === void 0 ? void 0 : _user_dataObjectWorkspaces_find.cpath) ?? '',
                initialValues: {
                    layouts: getSpecialModalValues('layouts'),
                    localizedEdit: getSpecialModalValues('localizedEdit'),
                    localizedView: getSpecialModalValues('localizedView')
                },
                onApply: (values)=>{
                    changeUserInState({
                        dataObjectWorkspaces: user.dataObjectWorkspaces.map((ws)=>ws.cid === specialModalContext ? {
                                ...ws,
                                ...values
                            } : ws)
                    });
                    setIsSpecialSettingsModalOpen(false);
                },
                onCancel: ()=>{
                    setIsSpecialSettingsModalOpen(false);
                },
                open: isSpecialSettingsModalOpen
            }, specialModalContext ?? 'none', false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/workspaces-container.tsx",
                lineNumber: 183,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/workspaces-container.tsx",
        lineNumber: 165,
        columnNumber: 10
    }, undefined);
};
_s(WorkspacesContainer, "lGjkfYaBCQEXpyiFK9NmKCyLuF8=", false, function() {
    return [
        react_i18next__rspack_import_3.useTranslation,
        _Pimcore_modules_user_hooks_use_user_management_context__rspack_import_7.useUserManagementContext,
        _Pimcore_modules_user_hooks_use_user_management_draft__rspack_import_6.useUserManagementDraft,
        _Pimcore_components_modal_useModal__rspack_import_9.useModal
    ];
});
_c = WorkspacesContainer;

var _c;
$RefreshReg$(_c, "WorkspacesContainer");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/user/management/management-container.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ManagementContainer: () => (ManagementContainer)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _Pimcore_modules_user_management_tree_tree_container__rspack_import_2 = __webpack_require__("./js/src/core/modules/user/management/tree/tree-container.tsx");
/* import */ var _Pimcore_modules_user_management_detail_management_detail__rspack_import_3 = __webpack_require__("./js/src/core/modules/user/management/detail/management-detail.tsx");
/* import */ var _Pimcore_components_icon_icon__rspack_import_4 = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* import */ var react_i18next__rspack_import_5 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_5_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_5);
/* import */ var _Pimcore_modules_user_hooks_use_user_management_helper__rspack_import_6 = __webpack_require__("./js/src/core/modules/user/hooks/use-user-management-helper.tsx");
/* import */ var _Pimcore_modules_user_management_tree_tree_helper__rspack_import_7 = __webpack_require__("./js/src/core/modules/user/management/tree/tree-helper.ts");
/* import */ var _Pimcore_components_spin_spin__rspack_import_8 = __webpack_require__("./js/src/core/components/spin/spin.tsx");
/* import */ var _Pimcore_utils_test_id_generator__rspack_import_9 = __webpack_require__("./js/src/core/utils/test-id-generator.ts");
/* import */ var _Pimcore_components_predefined_layouts_config_config_layout__rspack_import_10 = __webpack_require__("./js/src/core/components/predefined-layouts/config/config-layout.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 









const ManagementContainer = (param)=>{
    let { userId, ...props } = param;
    _s();
    const { t } = (0,react_i18next__rspack_import_5.useTranslation)();
    const { getUserTree } = (0,_Pimcore_modules_user_hooks_use_user_management_helper__rspack_import_6.useUserManagementHelper)();
    const [expandedKeys, setExpandedKeys] = react__rspack_import_1_default().useState([
        0
    ]);
    const treeParentItem = {
        title: t('user-management.tree.all'),
        key: 0,
        icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_icon__rspack_import_4.Icon, {
            value: 'folder'
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/management-container.tsx",
            lineNumber: 35,
            columnNumber: 11
        }, undefined),
        'data-testid': (0,_Pimcore_utils_test_id_generator__rspack_import_9.createTreeNodeTestId)(0, 'folder'),
        children: [],
        actions: [
            {
                key: 'add-folder',
                icon: 'folder-plus'
            },
            {
                key: 'add-user',
                icon: 'add-user'
            }
        ]
    };
    const [treeData, setTreeData] = react__rspack_import_1_default().useState([
        treeParentItem
    ]);
    const createNodeByResponse = (items)=>{
        return items.map((item)=>({
                title: item.name,
                key: item.id,
                selectable: item.type === 'user',
                allowDrop: item.type !== 'user',
                allowDrag: item.type === 'user',
                icon: item.type === 'user' ? /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_icon__rspack_import_4.Icon, {
                    value: 'user'
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/management-container.tsx",
                    lineNumber: 54,
                    columnNumber: 36
                }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_icon__rspack_import_4.Icon, {
                    value: 'folder'
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/management-container.tsx",
                    lineNumber: 54,
                    columnNumber: 62
                }, undefined),
                'data-testid': (0,_Pimcore_utils_test_id_generator__rspack_import_9.createTreeNodeTestId)(item.id, item.type),
                actions: item.type === 'user' ? [
                    {
                        key: 'clone-user',
                        icon: 'copy'
                    },
                    {
                        key: 'remove-user',
                        icon: 'trash'
                    }
                ] : [
                    {
                        key: 'add-folder',
                        icon: 'folder-plus'
                    },
                    {
                        key: 'add-user',
                        icon: 'add-user'
                    },
                    {
                        key: 'remove-folder',
                        icon: 'trash'
                    }
                ],
                children: [],
                isLeaf: item.type === 'user'
            }));
    };
    const updateTreeData = (key, items)=>{
        setNodeLoading(key, false);
        setTreeData((data)=>{
            const parentNode = (0,_Pimcore_modules_user_management_tree_tree_helper__rspack_import_7.findNodeByKey)(data, key);
            if (parentNode !== undefined) {
                parentNode.children = parentNode.children ?? [];
                if (items.length === 0) {
                    parentNode.isLeaf = true;
                    setExpandedKeys(expandedKeys.filter((k)=>k !== key));
                } else {
                    parentNode.isLeaf = false;
                }
                const newChildren = createNodeByResponse(items);
                const newKeys = new Set(newChildren.map((child)=>child.key));
                parentNode.children = parentNode.children.filter((child)=>newKeys.has(child.key));
                const existingKeys = new Set(parentNode.children.map((child)=>child.key));
                parentNode.children = [
                    ...parentNode.children,
                    ...newChildren.filter((child)=>!existingKeys.has(child.key))
                ];
            }
            return [
                ...data
            ];
        });
    };
    const handleOnLoadData = async (node)=>{
        await getUserTree({
            parentId: Number(node.key)
        }).then((response)=>{
            updateTreeData(node.key, response.items);
        });
    };
    const setNodeLoading = (key, isLoading)=>{
        const node = (0,_Pimcore_modules_user_management_tree_tree_helper__rspack_import_7.findNodeByKey)(treeData, key);
        if (node !== undefined) {
            node.switcherIcon = isLoading ? /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_spin_spin__rspack_import_8.Spin, {
                type: "classic"
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/management-container.tsx",
                lineNumber: 107,
                columnNumber: 39
            }, undefined) : undefined;
        }
        setTreeData([
            ...treeData
        ]);
    };
    const reloadTree = async (key)=>{
        if (key === undefined) {
            key = 0;
        }
        const { items } = await getUserTree({
            parentId: key
        });
        updateTreeData(key, items);
    };
    const sidebar = {
        id: 'user-tree',
        minSize: 170,
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_user_management_tree_tree_container__rspack_import_2.TreeContainer, {
                expandedKeys: expandedKeys,
                onLoadTreeData: handleOnLoadData,
                onReloadTree: async (keys)=>{
                    for (const key of keys){
                        setNodeLoading(key, true);
                        await reloadTree(key);
                    }
                },
                onSetExpandedKeys: (keys)=>{
                    setExpandedKeys(keys);
                },
                onUpdateTreeData: updateTreeData,
                treeData: treeData,
                userId: userId
            }, "user-tree", false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/management-container.tsx",
                lineNumber: 125,
                columnNumber: 16
            }, undefined)
        ]
    };
    const main = {
        id: 'user-detail',
        minSize: 600,
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_user_management_detail_management_detail__rspack_import_3.ManagementDetail, {
                onCloneUser: async (data, parentId)=>{
                    setNodeLoading(parentId, true);
                    await reloadTree(parentId);
                },
                onRemoveItem: async (id, parentId)=>{
                    setNodeLoading(parentId, true);
                    await reloadTree(parentId);
                }
            }, "user-detail", false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/management-container.tsx",
                lineNumber: 137,
                columnNumber: 16
            }, undefined)
        ]
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_predefined_layouts_config_config_layout__rspack_import_10.ConfigLayout, {
        leftItem: sidebar,
        rightItem: main
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/management-container.tsx",
        lineNumber: 145,
        columnNumber: 10
    }, undefined);
};
_s(ManagementContainer, "v0KE6aAkVznvKTIds9cOb9OZ7zc=", false, function() {
    return [
        react_i18next__rspack_import_5.useTranslation,
        _Pimcore_modules_user_hooks_use_user_management_helper__rspack_import_6.useUserManagementHelper
    ];
});
_c = ManagementContainer;

var _c;
$RefreshReg$(_c, "ManagementContainer");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/user/management/toolbar/toolbar-tree.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ToolbarTree: () => (ToolbarTree)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _Pimcore_components_toolbar_toolbar__rspack_import_2 = __webpack_require__("./js/src/core/components/toolbar/toolbar.tsx");
/* import */ var react_i18next__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_3);
/* import */ var _Pimcore_components_icon_button_icon_button__rspack_import_4 = __webpack_require__("./js/src/core/components/icon-button/icon-button.tsx");
/* import */ var _Pimcore_components_dropdown_dropdown__rspack_import_5 = __webpack_require__("./js/src/core/components/dropdown/dropdown.tsx");
/* import */ var _Pimcore_components_dropdown_button_dropdown_button__rspack_import_6 = __webpack_require__("./js/src/core/components/dropdown-button/dropdown-button.tsx");
/* import */ var _Pimcore_components_icon_icon__rspack_import_7 = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* import */ var _Pimcore_components_flex_flex__rspack_import_8 = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 







const ToolbarTree = (param)=>{
    let { actions, onReload, onAddItem, onAddFolder } = param;
    _s();
    const { t } = (0,react_i18next__rspack_import_3.useTranslation)();
    const items = actions ?? [
        {
            key: '1',
            label: t('tree.actions.user'),
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_icon__rspack_import_7.Icon, {
                value: "add-user"
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/toolbar/toolbar-tree.tsx",
                lineNumber: 31,
                columnNumber: 11
            }, undefined),
            onClick: onAddItem ?? (()=>{})
        },
        {
            key: '2',
            label: t('tree.actions.folder'),
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_icon__rspack_import_7.Icon, {
                value: "folder-plus"
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/toolbar/toolbar-tree.tsx",
                lineNumber: 36,
                columnNumber: 11
            }, undefined),
            onClick: onAddFolder ?? (()=>{})
        }
    ];
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_toolbar_toolbar__rspack_import_2.Toolbar, {
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_button_icon_button__rspack_import_4.IconButton, {
                icon: {
                    value: 'refresh'
                },
                onClick: onReload,
                children: t('toolbar.reload')
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/toolbar/toolbar-tree.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_dropdown_dropdown__rspack_import_5.Dropdown, {
                menu: {
                    items
                },
                trigger: [
                    'click'
                ],
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_dropdown_button_dropdown_button__rspack_import_6.DropdownButton, {
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_flex_flex__rspack_import_8.Flex, {
                        align: 'center',
                        children: [
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_icon__rspack_import_7.Icon, {
                                options: {
                                    width: 18,
                                    height: 18
                                },
                                value: 'new'
                            }, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/toolbar/toolbar-tree.tsx",
                                lineNumber: 51,
                                columnNumber: 13
                            }, undefined),
                            " ",
                            t('toolbar.new')
                        ]
                    }, void 0, true, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/toolbar/toolbar-tree.tsx",
                        lineNumber: 50,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/toolbar/toolbar-tree.tsx",
                    lineNumber: 49,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/toolbar/toolbar-tree.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/toolbar/toolbar-tree.tsx",
        lineNumber: 39,
        columnNumber: 10
    }, undefined);
};
_s(ToolbarTree, "vu2xTFBfHkv41zWfADiErp1aWcA=", false, function() {
    return [
        react_i18next__rspack_import_3.useTranslation
    ];
});
_c = ToolbarTree;
var _c;
$RefreshReg$(_c, "ToolbarTree");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/user/management/toolbar/toolbar.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Toolbar: () => (Toolbar)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _Pimcore_components_toolbar_toolbar__rspack_import_2 = __webpack_require__("./js/src/core/components/toolbar/toolbar.tsx");
/* import */ var react_i18next__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_3);
/* import */ var _sdk_components__rspack_import_4 = __webpack_require__("./js/src/sdk/components/index.ts");
/* import */ var _Pimcore_modules_user_hooks_use_user_management_draft__rspack_import_5 = __webpack_require__("./js/src/core/modules/user/hooks/use-user-management-draft.tsx");
/* import */ var _Pimcore_modules_user_hooks_use_user_management_helper__rspack_import_6 = __webpack_require__("./js/src/core/modules/user/hooks/use-user-management-helper.tsx");
/* import */ var _Pimcore_components_icon_button_icon_button__rspack_import_7 = __webpack_require__("./js/src/core/components/icon-button/icon-button.tsx");
/* import */ var antd__rspack_import_8 = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* import */ var antd__rspack_import_8_default = /*#__PURE__*/__webpack_require__.n(antd__rspack_import_8);
/* import */ var _Pimcore_components_dropdown_button_dropdown_button__rspack_import_9 = __webpack_require__("./js/src/core/components/dropdown-button/dropdown-button.tsx");
/* import */ var _Pimcore_components_icon_icon__rspack_import_10 = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* import */ var _Pimcore_components_dropdown_dropdown__rspack_import_11 = __webpack_require__("./js/src/core/components/dropdown/dropdown.tsx");
/* import */ var _Pimcore_components_flex_flex__rspack_import_12 = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 











const Toolbar = (param)=>{
    let { id, onCloneUser, onRemoveUser, ...props } = param;
    _s();
    const { t } = (0,react_i18next__rspack_import_3.useTranslation)();
    const { user, isLoading, reloadUser } = (0,_Pimcore_modules_user_hooks_use_user_management_draft__rspack_import_5.useUserManagementDraft)(id);
    const { updateUserById } = (0,_Pimcore_modules_user_hooks_use_user_management_helper__rspack_import_6.useUserManagementHelper)();
    const hasChanges = (user === null || user === void 0 ? void 0 : user.modified) === true;
    const [popConfirmOpen, setPopConfirmOpen] = (0,react__rspack_import_1.useState)(false);
    const onOpenChange = (newOpen)=>{
        if (!newOpen) {
            setPopConfirmOpen(false);
            return;
        }
        if (hasChanges) {
            setPopConfirmOpen(true);
        } else {
            reloadUser();
        }
    };
    const onCancel = ()=>{
        setPopConfirmOpen(false);
    };
    const onConfirm = ()=>{
        setPopConfirmOpen(false);
        reloadUser();
    };
    const onSaveClick = ()=>{
        updateUserById({
            id,
            user: {
                ...user
            }
        }).catch(()=>{
            console.error('error');
        });
    };
    const items = [
        {
            key: '1',
            label: t('tree.actions.clone-user'),
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_icon__rspack_import_10.Icon, {
                value: "copy"
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/toolbar/toolbar.tsx",
                lineNumber: 73,
                columnNumber: 11
            }, undefined),
            onClick: onCloneUser
        },
        {
            key: '2',
            label: t('tree.actions.remove-user'),
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_icon__rspack_import_10.Icon, {
                value: "trash"
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/toolbar/toolbar.tsx",
                lineNumber: 78,
                columnNumber: 11
            }, undefined),
            onClick: onRemoveUser
        }
    ];
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_toolbar_toolbar__rspack_import_2.Toolbar, {
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_flex_flex__rspack_import_12.Flex, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_8.Popconfirm, {
                        onCancel: onCancel,
                        onConfirm: onConfirm,
                        onOpenChange: onOpenChange,
                        open: popConfirmOpen,
                        title: t('toolbar.reload.confirmation'),
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_button_icon_button__rspack_import_7.IconButton, {
                            icon: {
                                value: 'refresh'
                            },
                            children: t('toolbar.reload')
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/toolbar/toolbar.tsx",
                            lineNumber: 84,
                            columnNumber: 11
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/toolbar/toolbar.tsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, undefined),
                    onCloneUser !== null || onRemoveUser !== null ? /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_dropdown_dropdown__rspack_import_11.Dropdown, {
                        menu: {
                            items
                        },
                        trigger: [
                            'click'
                        ],
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_dropdown_button_dropdown_button__rspack_import_9.DropdownButton, {
                            children: t('toolbar.more')
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/toolbar/toolbar.tsx",
                            lineNumber: 94,
                            columnNumber: 15
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/toolbar/toolbar.tsx",
                        lineNumber: 91,
                        columnNumber: 58
                    }, undefined) : null
                ]
            }, void 0, true, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/toolbar/toolbar.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_sdk_components__rspack_import_4.Button, {
                disabled: !hasChanges || isLoading,
                loading: isLoading,
                onClick: onSaveClick,
                type: "primary",
                children: t('toolbar.save')
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/toolbar/toolbar.tsx",
                lineNumber: 100,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/toolbar/toolbar.tsx",
        lineNumber: 81,
        columnNumber: 10
    }, undefined);
};
_s(Toolbar, "49j3Oue6ljvI0CMlxt7PZ8r9Gh0=", false, function() {
    return [
        react_i18next__rspack_import_3.useTranslation,
        _Pimcore_modules_user_hooks_use_user_management_draft__rspack_import_5.useUserManagementDraft,
        _Pimcore_modules_user_hooks_use_user_management_helper__rspack_import_6.useUserManagementHelper
    ];
});
_c = Toolbar;
var _c;
$RefreshReg$(_c, "Toolbar");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/user/management/tree/tree-autocomplete.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TreeAutocomplete: () => (TreeAutocomplete)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _Pimcore_modules_user_hooks_use_user_management_helper__rspack_import_2 = __webpack_require__("./js/src/core/modules/user/hooks/use-user-management-helper.tsx");
/* import */ var antd__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* import */ var antd__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(antd__rspack_import_3);
/* import */ var react_i18next__rspack_import_4 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_4_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_4);
/* import */ var _ant_design_icons__rspack_import_8 = __webpack_require__("./node_modules/@ant-design/icons/es/icons/UserOutlined.js");
/* import */ var _Pimcore_components_search_input_search_input_styles__rspack_import_5 = __webpack_require__("./js/src/core/components/search-input/search-input.styles.ts");
/* import */ var _Pimcore_components_icon_icon__rspack_import_6 = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* import */ var _Pimcore_modules_app_error_handler__rspack_import_7 = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 







const TreeAutocomplete = (param)=>{
    let { loading = true, ...props } = param;
    _s();
    const { t } = (0,react_i18next__rspack_import_4.useTranslation)();
    const { openUser, searchUserByText } = (0,_Pimcore_modules_user_hooks_use_user_management_helper__rspack_import_2.useUserManagementHelper)();
    const [searchOptions, setSearchOptions] = (0,react__rspack_import_1.useState)([]);
    const [searchValue, setSearchValue] = (0,react__rspack_import_1.useState)('');
    const { Text } = antd__rspack_import_3.Typography;
    const { styles } = (0,_Pimcore_components_search_input_search_input_styles__rspack_import_5.useStyles)();
    const onSearch = (value)=>{
        setSearchValue(value);
        searchUserByText(value).then((response)=>{
            setSearchOptions(response.items.map((item)=>({
                    value: item.id.toString(),
                    label: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_3.Row, {
                        gutter: 8,
                        wrap: false,
                        children: [
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_3.Col, {
                                flex: "none",
                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_3.Avatar, {
                                    icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_ant_design_icons__rspack_import_8["default"], {}, void 0, false, {
                                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/tree/tree-autocomplete.tsx",
                                        lineNumber: 45,
                                        columnNumber: 29
                                    }, undefined),
                                    size: 26
                                }, void 0, false, {
                                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/tree/tree-autocomplete.tsx",
                                    lineNumber: 45,
                                    columnNumber: 15
                                }, undefined)
                            }, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/tree/tree-autocomplete.tsx",
                                lineNumber: 44,
                                columnNumber: 13
                            }, undefined),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_3.Col, {
                                flex: "auto",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)("div", {
                                        children: item.username
                                    }, void 0, false, {
                                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/tree/tree-autocomplete.tsx",
                                        lineNumber: 48,
                                        columnNumber: 15
                                    }, undefined),
                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(Text, {
                                        strong: true,
                                        children: [
                                            t('user-management.search.id'),
                                            ": "
                                        ]
                                    }, void 0, true, {
                                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/tree/tree-autocomplete.tsx",
                                        lineNumber: 49,
                                        columnNumber: 15
                                    }, undefined),
                                    " ",
                                    item.id
                                ]
                            }, void 0, true, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/tree/tree-autocomplete.tsx",
                                lineNumber: 47,
                                columnNumber: 13
                            }, undefined)
                        ]
                    }, void 0, true, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/tree/tree-autocomplete.tsx",
                        lineNumber: 43,
                        columnNumber: 16
                    }, undefined)
                })));
        }).catch((e)=>{
            (0,_Pimcore_modules_app_error_handler__rspack_import_7["default"])(new _Pimcore_modules_app_error_handler__rspack_import_7.GeneralError('An error occured while searching for a user'));
        });
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_3.AutoComplete, {
        className: 'tree--search',
        onSearch: onSearch,
        onSelect: (id, option)=>{
            openUser(Number(id));
            setSearchValue('');
        },
        options: searchOptions,
        value: searchValue,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_3.Input.Search, {
            allowClear: {
                clearIcon: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_icon__rspack_import_6.Icon, {
                    className: styles.closeIcon,
                    value: "close"
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/tree/tree-autocomplete.tsx",
                    lineNumber: 62,
                    columnNumber: 18
                }, undefined)
            },
            className: styles.searchWithoutAddon,
            placeholder: t('user-management.search'),
            prefix: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_icon__rspack_import_6.Icon, {
                className: styles.searchIcon,
                options: {
                    width: 12,
                    height: 12
                },
                value: "search"
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/tree/tree-autocomplete.tsx",
                lineNumber: 63,
                columnNumber: 96
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/tree/tree-autocomplete.tsx",
            lineNumber: 61,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/tree/tree-autocomplete.tsx",
        lineNumber: 57,
        columnNumber: 10
    }, undefined);
};
_s(TreeAutocomplete, "TraqEKTpX6sgczoTvz7x6jU1XNY=", false, function() {
    return [
        react_i18next__rspack_import_4.useTranslation,
        _Pimcore_modules_user_hooks_use_user_management_helper__rspack_import_2.useUserManagementHelper,
        _Pimcore_components_search_input_search_input_styles__rspack_import_5.useStyles
    ];
});
_c = TreeAutocomplete;

var _c;
$RefreshReg$(_c, "TreeAutocomplete");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/user/management/tree/tree-container.styles.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyle: () => (useStyle)
});
/* import */ var _Pimcore_modules_ant_design_styles_create_styles__rspack_import_0 = __webpack_require__("./js/src/core/modules/ant-design/styles/create-styles.ts");
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
const useStyle = (0,_Pimcore_modules_ant_design_styles_create_styles__rspack_import_0.createStyles)((param)=>{
    let { token, css } = param;
    return {
        treeContainer: css`
      margin-top: ${token.paddingSM}px;

      .tree--search {
        margin: ${token.paddingSM}px ${token.paddingSM}px 0;
      }
      
      :has(.tree--search) {
        margin-top: 0;
      }
    `
    };
}, {
    hashPriority: 'low'
});

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/user/management/tree/tree-container.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TreeContainer: () => (TreeContainer)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var lodash__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_2);
/* import */ var react_i18next__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_3);
/* import */ var _Pimcore_components_tree_element_tree_element__rspack_import_4 = __webpack_require__("./js/src/core/components/tree-element/tree-element.tsx");
/* import */ var _Pimcore_modules_user_hooks_use_user_management_helper__rspack_import_5 = __webpack_require__("./js/src/core/modules/user/hooks/use-user-management-helper.tsx");
/* import */ var _Pimcore_components_modal_form_modal_hooks_use_form_modal__rspack_import_6 = __webpack_require__("./js/src/core/components/modal/form-modal/hooks/use-form-modal.tsx");
/* import */ var _Pimcore_modules_user_management_toolbar_toolbar_tree__rspack_import_7 = __webpack_require__("./js/src/core/modules/user/management/toolbar/toolbar-tree.tsx");
/* import */ var _Pimcore_components_content_layout_content_layout__rspack_import_8 = __webpack_require__("./js/src/core/components/content-layout/content-layout.tsx");
/* import */ var _Pimcore_components_content_content__rspack_import_9 = __webpack_require__("./js/src/core/components/content/content.tsx");
/* import */ var _Pimcore_modules_user_management_tree_tree_container_styles__rspack_import_10 = __webpack_require__("./js/src/core/modules/user/management/tree/tree-container.styles.tsx");
/* import */ var _Pimcore_modules_user_management_tree_tree_autocomplete__rspack_import_11 = __webpack_require__("./js/src/core/modules/user/management/tree/tree-autocomplete.tsx");
/* import */ var _Pimcore_modules_user_management_tree_tree_helper__rspack_import_12 = __webpack_require__("./js/src/core/modules/user/management/tree/tree-helper.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 











const TreeContainer = (param)=>{
    let { expandedKeys, treeData, onLoadTreeData, onReloadTree, onSetExpandedKeys, onUpdateTreeData, userId, ...props } = param;
    _s();
    const { t } = (0,react_i18next__rspack_import_3.useTranslation)();
    const { openUser, moveUserById, addNewUser, addNewFolder, removeUser, cloneUser, removeFolder } = (0,_Pimcore_modules_user_hooks_use_user_management_helper__rspack_import_5.useUserManagementHelper)();
    const { styles } = (0,_Pimcore_modules_user_management_tree_tree_container_styles__rspack_import_10.useStyle)();
    const classNames = [
        styles.treeContainer
    ];
    (0,react__rspack_import_1.useEffect)(()=>{
        if (!(0,lodash__rspack_import_2.isNil)(userId)) {
            openUser(userId);
        }
    }, [
        userId
    ]);
    const modal = (0,_Pimcore_components_modal_form_modal_hooks_use_form_modal__rspack_import_6.useFormModal)();
    const handleAddUser = (key)=>{
        modal.input({
            title: t('user-management.add-user'),
            label: t('user-management.add-user.label'),
            onOk: async (value)=>{
                await addNewUser({
                    parentId: key,
                    name: value
                });
                onReloadTree([
                    key
                ]);
            }
        });
    };
    const handleAddFolder = (key)=>{
        modal.input({
            title: t('user-management.add-folder'),
            label: t('user-management.add-folder.label'),
            onOk: async (value)=>{
                await addNewFolder({
                    parentId: key,
                    name: value
                });
                onReloadTree([
                    key
                ]);
            }
        });
    };
    const getUserNameByKey = (data, key)=>{
        const node = (0,_Pimcore_modules_user_management_tree_tree_helper__rspack_import_12.findNodeByKey)(data, key);
        return (node === null || node === void 0 ? void 0 : node.title) ?? '';
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_content_layout_content_layout__rspack_import_8.ContentLayout, {
        renderToolbar: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_user_management_toolbar_toolbar_tree__rspack_import_7.ToolbarTree, {
            onAddFolder: ()=>{
                handleAddFolder(0);
            },
            onAddItem: ()=>{
                handleAddUser(0);
            },
            onReload: ()=>{
                onReloadTree([
                    0
                ]);
            }
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/tree/tree-container.tsx",
            lineNumber: 85,
            columnNumber: 40
        }, undefined),
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_content_content__rspack_import_9.Content, {
            className: classNames.join(', '),
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_user_management_tree_tree_autocomplete__rspack_import_11.TreeAutocomplete, {}, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/tree/tree-container.tsx",
                    lineNumber: 93,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_tree_element_tree_element__rspack_import_4.TreeElement, {
                    defaultExpandedKeys: expandedKeys,
                    draggable: true,
                    expandedKeys: expandedKeys,
                    onActionsClick: (key, action)=>{
                        if (typeof key === 'string') {
                            key = parseInt(key);
                        }
                        switch(action){
                            case 'add-folder':
                                handleAddFolder(key);
                                break;
                            case 'add-user':
                                handleAddUser(key);
                                break;
                            case 'clone-user':
                                modal.input({
                                    title: t('user-management.clone-user'),
                                    label: t('user-management.clone-user.label'),
                                    onOk: async (value)=>{
                                        var _findParentByKey;
                                        const parentId = (_findParentByKey = (0,_Pimcore_modules_user_management_tree_tree_helper__rspack_import_12.findParentByKey)(treeData, key)) === null || _findParentByKey === void 0 ? void 0 : _findParentByKey.key;
                                        const data = await cloneUser({
                                            id: key,
                                            name: value
                                        });
                                        if (data !== undefined) {
                                            onReloadTree([
                                                parentId
                                            ]);
                                        }
                                    }
                                });
                                break;
                            case 'remove-user':
                                modal.confirm({
                                    title: t('user-management.remove-user'),
                                    content: t('user-management.remove-user.text', {
                                        name: getUserNameByKey(treeData, key)
                                    }),
                                    okText: t('button.confirm'),
                                    cancelText: t('button.cancel'),
                                    onOk: async ()=>{
                                        var _findParentByKey;
                                        await removeUser({
                                            id: Number(key)
                                        });
                                        onReloadTree([
                                            (_findParentByKey = (0,_Pimcore_modules_user_management_tree_tree_helper__rspack_import_12.findParentByKey)(treeData, key)) === null || _findParentByKey === void 0 ? void 0 : _findParentByKey.key
                                        ]);
                                    }
                                });
                                break;
                            case 'remove-folder':
                                modal.confirm({
                                    title: t('user-management.remove-folder'),
                                    content: t('user-management.remove-folder.text'),
                                    okText: t('button.confirm'),
                                    cancelText: t('button.cancel'),
                                    onOk: async ()=>{
                                        var _findParentByKey;
                                        await removeFolder({
                                            id: Number(key)
                                        });
                                        onReloadTree([
                                            (_findParentByKey = (0,_Pimcore_modules_user_management_tree_tree_helper__rspack_import_12.findParentByKey)(treeData, key)) === null || _findParentByKey === void 0 ? void 0 : _findParentByKey.key
                                        ]);
                                    }
                                });
                                break;
                        }
                    },
                    onDragAndDrop: async (params)=>{
                        const data = await moveUserById({
                            id: Number(params.dragNode.key),
                            parentId: Number(params.node.key)
                        });
                        if (data !== undefined) {
                            var _findParentByKey;
                            onReloadTree([
                                (_findParentByKey = (0,_Pimcore_modules_user_management_tree_tree_helper__rspack_import_12.findParentByKey)(treeData, params.dragNode.key)) === null || _findParentByKey === void 0 ? void 0 : _findParentByKey.key,
                                params.node.key
                            ]);
                        }
                    },
                    onExpand: (keys)=>{
                        onSetExpandedKeys(keys);
                    },
                    onLoadData: onLoadTreeData,
                    onSelected: (key)=>{
                        var _findNodeByKey;
                        if (((_findNodeByKey = (0,_Pimcore_modules_user_management_tree_tree_helper__rspack_import_12.findNodeByKey)(treeData, key)) === null || _findNodeByKey === void 0 ? void 0 : _findNodeByKey.selectable) === true) {
                            openUser(Number(key));
                        }
                    },
                    treeData: treeData
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/tree/tree-container.tsx",
                    lineNumber: 95,
                    columnNumber: 9
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/tree/tree-container.tsx",
            lineNumber: 92,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/tree/tree-container.tsx",
        lineNumber: 85,
        columnNumber: 10
    }, undefined);
};
_s(TreeContainer, "hotPDMuZzHAEBxrGLGqyuskTvHI=", false, function() {
    return [
        react_i18next__rspack_import_3.useTranslation,
        _Pimcore_modules_user_hooks_use_user_management_helper__rspack_import_5.useUserManagementHelper,
        _Pimcore_modules_user_management_tree_tree_container_styles__rspack_import_10.useStyle,
        _Pimcore_components_modal_form_modal_hooks_use_form_modal__rspack_import_6.useFormModal
    ];
});
_c = TreeContainer;

var _c;
$RefreshReg$(_c, "TreeContainer");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/user/roles/container.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  RoleContainer: () => (RoleContainer)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _Pimcore_modules_user_roles_tree_tree_container__rspack_import_2 = __webpack_require__("./js/src/core/modules/user/roles/tree/tree-container.tsx");
/* import */ var _Pimcore_modules_user_roles_detail_detail__rspack_import_3 = __webpack_require__("./js/src/core/modules/user/roles/detail/detail.tsx");
/* import */ var _Pimcore_components_icon_icon__rspack_import_4 = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* import */ var react_i18next__rspack_import_5 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_5_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_5);
/* import */ var _Pimcore_modules_user_management_tree_tree_helper__rspack_import_6 = __webpack_require__("./js/src/core/modules/user/management/tree/tree-helper.ts");
/* import */ var _Pimcore_modules_user_roles_hooks_use_roles_helper__rspack_import_7 = __webpack_require__("./js/src/core/modules/user/roles/hooks/use-roles-helper.tsx");
/* import */ var _Pimcore_components_spin_spin__rspack_import_8 = __webpack_require__("./js/src/core/components/spin/spin.tsx");
/* import */ var _Pimcore_utils_test_id_generator__rspack_import_9 = __webpack_require__("./js/src/core/utils/test-id-generator.ts");
/* import */ var _Pimcore_components_predefined_layouts_config_config_layout__rspack_import_10 = __webpack_require__("./js/src/core/components/predefined-layouts/config/config-layout.tsx");
/* import */ var lodash__rspack_import_11 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_11_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_11);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 










const RoleContainer = (param)=>{
    let { ...props } = param;
    _s();
    const { t } = (0,react_i18next__rspack_import_5.useTranslation)();
    const { getRoleTree } = (0,_Pimcore_modules_user_roles_hooks_use_roles_helper__rspack_import_7.useRoleHelper)();
    const [expandedKeys, setExpandedKeys] = react__rspack_import_1_default().useState([
        0
    ]);
    const updateExpandedKeys = (keys)=>{
        setExpandedKeys((0,lodash__rspack_import_11.uniq)([
            ...keys,
            0
        ]));
    };
    const treeParentItem = {
        title: t('roles.tree.all'),
        key: 0,
        icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_icon__rspack_import_4.Icon, {
            value: 'folder'
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/container.tsx",
            lineNumber: 38,
            columnNumber: 11
        }, undefined),
        'data-testid': (0,_Pimcore_utils_test_id_generator__rspack_import_9.createTreeNodeTestId)(0, 'folder'),
        children: [],
        actions: [
            {
                key: 'add-folder',
                icon: 'folder-plus'
            },
            {
                key: 'add-role',
                icon: 'shield-plus'
            }
        ]
    };
    const [treeData, setTreeData] = (0,react__rspack_import_1.useState)([
        treeParentItem
    ]);
    const createNodeByResponse = (items)=>{
        return items.map((item)=>({
                title: item.name,
                key: item.id,
                selectable: item.type === 'role',
                allowDrop: item.type !== 'role',
                allowDrag: item.type === 'role',
                icon: item.type === 'role' ? /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_icon__rspack_import_4.Icon, {
                    value: 'shield'
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/container.tsx",
                    lineNumber: 57,
                    columnNumber: 36
                }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_icon__rspack_import_4.Icon, {
                    value: 'folder'
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/container.tsx",
                    lineNumber: 57,
                    columnNumber: 64
                }, undefined),
                'data-testid': (0,_Pimcore_utils_test_id_generator__rspack_import_9.createTreeNodeTestId)(item.id, item.type),
                actions: item.type === 'role' ? [
                    {
                        key: 'clone-role',
                        icon: 'copy'
                    },
                    {
                        key: 'remove-role',
                        icon: 'trash'
                    }
                ] : [
                    {
                        key: 'add-folder',
                        icon: 'folder-plus'
                    },
                    {
                        key: 'add-role',
                        icon: 'shield-plus'
                    },
                    {
                        key: 'remove-folder',
                        icon: 'trash'
                    }
                ],
                children: [],
                isLeaf: item.type === 'role'
            }));
    };
    const updateTreeData = (key, items)=>{
        setNodeLoading(key, false);
        setTreeData((data)=>{
            const parentNode = (0,_Pimcore_modules_user_management_tree_tree_helper__rspack_import_6.findNodeByKey)(data, key);
            if (parentNode !== undefined) {
                parentNode.children = parentNode.children ?? [];
                if (items.length === 0) {
                    parentNode.isLeaf = true;
                    updateExpandedKeys(expandedKeys.filter((k)=>k !== key));
                } else {
                    parentNode.isLeaf = false;
                }
                const newChildren = createNodeByResponse(items);
                const newKeys = new Set(newChildren.map((child)=>child.key));
                parentNode.children = parentNode.children.filter((child)=>newKeys.has(child.key));
                const existingKeys = new Set(parentNode.children.map((child)=>child.key));
                parentNode.children = [
                    ...parentNode.children,
                    ...newChildren.filter((child)=>!existingKeys.has(child.key))
                ];
            }
            return [
                ...data
            ];
        });
    };
    const handleOnLoadData = async (node)=>{
        await getRoleTree({
            parentId: Number(node.key)
        }).then((response)=>{
            updateTreeData(node.key, response.items);
        });
    };
    const setNodeLoading = (key, isLoading)=>{
        const node = (0,_Pimcore_modules_user_management_tree_tree_helper__rspack_import_6.findNodeByKey)(treeData, key);
        if (node !== undefined) {
            node.switcherIcon = isLoading ? /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_spin_spin__rspack_import_8.Spin, {
                type: "classic"
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/container.tsx",
                lineNumber: 110,
                columnNumber: 39
            }, undefined) : undefined;
        }
        setTreeData([
            ...treeData
        ]);
    };
    const reloadTree = async (key)=>{
        if (key === undefined) {
            key = 0;
        }
        const { items } = await getRoleTree({
            parentId: key
        });
        updateTreeData(key, items);
    };
    const sidebar = {
        id: 'role-tree',
        size: 20,
        minSize: 170,
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_user_roles_tree_tree_container__rspack_import_2.TreeContainer, {
                expandedKeys: expandedKeys,
                onLoadTreeData: handleOnLoadData,
                onReloadTree: async (keys)=>{
                    for (const key of keys){
                        setNodeLoading(key, true);
                        await reloadTree(key);
                    }
                },
                onSetExpandedKeys: (keys)=>{
                    updateExpandedKeys(keys);
                },
                onUpdateTreeData: updateTreeData,
                treeData: treeData
            }, "role-tree", false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/container.tsx",
                lineNumber: 129,
                columnNumber: 16
            }, undefined)
        ]
    };
    const main = {
        id: 'role-detail',
        size: 80,
        minSize: 600,
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_user_roles_detail_detail__rspack_import_3.Detail, {
                onCloneRole: async (data, parentId)=>{
                    setNodeLoading(parentId, true);
                    await reloadTree(parentId);
                },
                onRemoveRole: async (id, parentId)=>{
                    setNodeLoading(parentId, true);
                    await reloadTree(parentId);
                }
            }, "role-detail", false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/container.tsx",
                lineNumber: 142,
                columnNumber: 16
            }, undefined)
        ]
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_predefined_layouts_config_config_layout__rspack_import_10.ConfigLayout, {
        leftItem: sidebar,
        rightItem: main
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/container.tsx",
        lineNumber: 150,
        columnNumber: 10
    }, undefined);
};
_s(RoleContainer, "uhm71qQyQFkCY/gZ4htGJCx1sY4=", false, function() {
    return [
        react_i18next__rspack_import_5.useTranslation,
        _Pimcore_modules_user_roles_hooks_use_roles_helper__rspack_import_7.useRoleHelper
    ];
});
_c = RoleContainer;

var _c;
$RefreshReg$(_c, "RoleContainer");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/user/roles/detail/detail.styles.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyle: () => (useStyle)
});
/* import */ var _Pimcore_modules_ant_design_styles_create_styles__rspack_import_0 = __webpack_require__("./js/src/core/modules/ant-design/styles/create-styles.ts");
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
const useStyle = (0,_Pimcore_modules_ant_design_styles_create_styles__rspack_import_0.createStyles)((param)=>{
    let { token, css } = param;
    return {
        detailTabs: css`
      display: flex;
      flex-direction: column;
      overflow: hidden;
      padding: ${token.paddingSM}px ${token.paddingSM}px;
      
      .detail-tabs__content {
        height: 100%;
        width: 100%;
        overflow: hidden;
        
        .ant-tabs {
          height: 100%;
          width: 100%;
          overflow: hidden;
        }

        .ant-tabs-content {
          display: flex;
          height: 100%;
          margin-left: -${token.paddingXS}px;
          margin-right: -${token.paddingXS}px;
          padding-left: ${token.paddingXS}px;
          padding-right: ${token.paddingXS}px;
        }

        .ant-tabs-tabpane {
          display: flex;
          flex-direction: column;
          height: 100%;
          width: 100%;
        }

        .ant-tabs-content-holder {
          overflow: auto;
        }
      }
    `
    };
}, {
    hashPriority: 'low'
});

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/user/roles/detail/detail.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Detail: () => (Detail)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _Pimcore_modules_user_roles_detail_tabs_detail_tab__rspack_import_2 = __webpack_require__("./js/src/core/modules/user/roles/detail/tabs/detail-tab.tsx");
/* import */ var _Pimcore_modules_user_roles_hooks_use_roles_helper__rspack_import_3 = __webpack_require__("./js/src/core/modules/user/roles/hooks/use-roles-helper.tsx");
/* import */ var _Pimcore_components_content_content__rspack_import_4 = __webpack_require__("./js/src/core/components/content/content.tsx");
/* import */ var _Pimcore_modules_user_roles_roles_slice__rspack_import_5 = __webpack_require__("./js/src/core/modules/user/roles/roles-slice.tsx");
/* import */ var _Pimcore_app_store__rspack_import_6 = __webpack_require__("./js/src/core/app/store/index.ts");
/* import */ var _Pimcore_components_tabs_tabs__rspack_import_7 = __webpack_require__("./js/src/core/components/tabs/tabs.tsx");
/* import */ var _Pimcore_components_content_layout_content_layout__rspack_import_8 = __webpack_require__("./js/src/core/components/content-layout/content-layout.tsx");
/* import */ var _Pimcore_modules_user_roles_toolbar_toolbar__rspack_import_9 = __webpack_require__("./js/src/core/modules/user/roles/toolbar/toolbar.tsx");
/* import */ var _Pimcore_modules_user_roles_detail_detail_styles__rspack_import_10 = __webpack_require__("./js/src/core/modules/user/roles/detail/detail.styles.tsx");
/* import */ var react_i18next__rspack_import_11 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_11_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_11);
/* import */ var _Pimcore_components_modal_form_modal_hooks_use_form_modal__rspack_import_12 = __webpack_require__("./js/src/core/components/modal/form-modal/hooks/use-form-modal.tsx");
/* import */ var antd__rspack_import_13 = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* import */ var antd__rspack_import_13_default = /*#__PURE__*/__webpack_require__.n(antd__rspack_import_13);
/* import */ var _Pimcore_modules_user_roles_hooks_use_roles_draft__rspack_import_14 = __webpack_require__("./js/src/core/modules/user/roles/hooks/use-roles-draft.tsx");
/* import */ var _Pimcore_modules_auth_hooks_use_user_draft__rspack_import_15 = __webpack_require__("./js/src/core/modules/auth/hooks/use-user-draft.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 














const Detail = (param)=>{
    let { onCloneRole, onRemoveRole, ...props } = param;
    _s();
    const { t } = (0,react_i18next__rspack_import_11.useTranslation)();
    const { styles } = (0,_Pimcore_modules_user_roles_detail_detail_styles__rspack_import_10.useStyle)();
    const classNames = [
        'detail-tabs',
        styles.detailTabs
    ];
    const modal = (0,_Pimcore_components_modal_form_modal_hooks_use_form_modal__rspack_import_12.useFormModal)();
    const { user } = (0,_Pimcore_modules_auth_hooks_use_user_draft__rspack_import_15.useUserDraft)();
    const { openRole, closeRole, removeRole, cloneRole, getAllIds, activeId } = (0,_Pimcore_modules_user_roles_hooks_use_roles_helper__rspack_import_3.useRoleHelper)();
    const { role } = (0,_Pimcore_modules_user_roles_hooks_use_roles_draft__rspack_import_14.useRoleDraft)(activeId);
    const [popConfirmOpen, setPopConfirmOpen] = (0,react__rspack_import_1.useState)(null);
    const triggerConfirm = (id)=>{
        closeRole(id);
    };
    const onHandleClose = (key)=>{
        const id = parseInt(key);
        const role = (0,_Pimcore_modules_user_roles_roles_slice__rspack_import_5.selectRoleById)(_Pimcore_app_store__rspack_import_6.store.getState(), id);
        if ((role === null || role === void 0 ? void 0 : role.modified) && popConfirmOpen === null) {
            if (user === null || user === void 0 ? void 0 : user.allowDirtyClose) {
                triggerConfirm(id);
            } else {
                setPopConfirmOpen(id);
            }
            return;
        }
        if (!(role === null || role === void 0 ? void 0 : role.modified)) {
            triggerConfirm(id);
            return;
        }
        if (popConfirmOpen !== null) {
            setPopConfirmOpen(null);
        }
    };
    const handleCloneRole = ()=>{
        modal.input({
            title: t('roles.clone-item'),
            label: t('roles.clone-item.label'),
            onOk: async (value)=>{
                const data = await cloneRole({
                    id: activeId,
                    name: value
                });
                onCloneRole(data, (role === null || role === void 0 ? void 0 : role.parentId) ?? 0);
            }
        });
    };
    const handleRemoveRole = ()=>{
        modal.confirm({
            title: t('roles.remove-item'),
            content: t('roles.remove-item.text'),
            onOk: async ()=>{
                triggerConfirm(activeId);
                await removeRole({
                    id: activeId
                });
                onRemoveRole(activeId, (role === null || role === void 0 ? void 0 : role.parentId) ?? 0);
            }
        });
    };
    (0,react__rspack_import_1.useEffect)(()=>{
        setPopConfirmOpen(null);
    }, [
        role
    ]);
    if (activeId === undefined) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_content_content__rspack_import_4.Content, {
            none: true
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/detail.tsx",
            lineNumber: 106,
            columnNumber: 12
        }, undefined);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_content_layout_content_layout__rspack_import_8.ContentLayout, {
        renderToolbar: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_user_roles_toolbar_toolbar__rspack_import_9.Toolbar, {
            id: activeId,
            onCloneRole: handleCloneRole,
            onRemoveRole: handleRemoveRole
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/detail.tsx",
            lineNumber: 108,
            columnNumber: 40
        }, undefined),
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)("div", {
            className: classNames.join(' '),
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_tabs_tabs__rspack_import_7.Tabs, {
                    activeKey: activeId.toString(),
                    items: getAllIds.map((id)=>{
                        var _selectRoleById, _selectRoleById1;
                        return {
                            key: id.toString(),
                            label: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_13.Popconfirm, {
                                onCancel: ()=>{
                                    setPopConfirmOpen(null);
                                },
                                onConfirm: ()=>{
                                    triggerConfirm(id);
                                },
                                open: popConfirmOpen === id,
                                title: t('widget-manager.tab-title.close-confirmation'),
                                children: [
                                    (_selectRoleById = (0,_Pimcore_modules_user_roles_roles_slice__rspack_import_5.selectRoleById)(_Pimcore_app_store__rspack_import_6.store.getState(), id)) === null || _selectRoleById === void 0 ? void 0 : _selectRoleById.name,
                                    " ",
                                    ((_selectRoleById1 = (0,_Pimcore_modules_user_roles_roles_slice__rspack_import_5.selectRoleById)(_Pimcore_app_store__rspack_import_6.store.getState(), id)) === null || _selectRoleById1 === void 0 ? void 0 : _selectRoleById1.modified) ? '*' : ''
                                ]
                            }, void 0, true, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/detail.tsx",
                                lineNumber: 112,
                                columnNumber: 16
                            }, undefined)
                        };
                    }),
                    onChange: (id)=>{
                        openRole(Number(id));
                    },
                    onClose: onHandleClose
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/detail.tsx",
                    lineNumber: 110,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_content_content__rspack_import_4.Content, {
                    className: 'detail-tabs__content',
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_user_roles_detail_tabs_detail_tab__rspack_import_2.DetailTab, {
                        id: activeId
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/detail.tsx",
                        lineNumber: 123,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/detail.tsx",
                    lineNumber: 122,
                    columnNumber: 9
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/detail.tsx",
            lineNumber: 109,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/detail.tsx",
        lineNumber: 108,
        columnNumber: 10
    }, undefined);
};
_s(Detail, "QpayYefsqxD0EPfu0fE838BR26g=", false, function() {
    return [
        react_i18next__rspack_import_11.useTranslation,
        _Pimcore_modules_user_roles_detail_detail_styles__rspack_import_10.useStyle,
        _Pimcore_components_modal_form_modal_hooks_use_form_modal__rspack_import_12.useFormModal,
        _Pimcore_modules_auth_hooks_use_user_draft__rspack_import_15.useUserDraft,
        _Pimcore_modules_user_roles_hooks_use_roles_helper__rspack_import_3.useRoleHelper,
        _Pimcore_modules_user_roles_hooks_use_roles_draft__rspack_import_14.useRoleDraft
    ];
});
_c = Detail;

var _c;
$RefreshReg$(_c, "Detail");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/user/roles/detail/tabs/detail-tab.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DetailTab: () => (DetailTab)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _Pimcore_components_tabs_tabs__rspack_import_2 = __webpack_require__("./js/src/core/components/tabs/tabs.tsx");
/* import */ var _Pimcore_modules_user_roles_detail_tabs_settings_settings_container__rspack_import_3 = __webpack_require__("./js/src/core/modules/user/roles/detail/tabs/settings/settings-container.tsx");
/* import */ var _Pimcore_modules_user_roles_detail_tabs_workspaces_workspaces_container__rspack_import_4 = __webpack_require__("./js/src/core/modules/user/roles/detail/tabs/workspaces/workspaces-container.tsx");
/* import */ var react_i18next__rspack_import_5 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_5_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_5);
/* import */ var _Pimcore_modules_user_roles_role_provider__rspack_import_6 = __webpack_require__("./js/src/core/modules/user/roles/role-provider.tsx");
/* import */ var _Pimcore_modules_widget_manager_hooks_use_is_active_main_widget__rspack_import_7 = __webpack_require__("./js/src/core/modules/widget-manager/hooks/use-is-active-main-widget.ts");
/* import */ var _Pimcore_modules_user_hooks_use_global_user_management_context__rspack_import_8 = __webpack_require__("./js/src/core/modules/user/hooks/use-global-user-management-context.ts");
/* import */ var _Pimcore_modules_user_roles_hooks_use_roles_draft__rspack_import_9 = __webpack_require__("./js/src/core/modules/user/roles/hooks/use-roles-draft.tsx");
/* import */ var _Pimcore_components_content_content__rspack_import_10 = __webpack_require__("./js/src/core/components/content/content.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 









const DetailTab = (param)=>{
    let { id } = param;
    _s();
    const { t } = (0,react_i18next__rspack_import_5.useTranslation)();
    const isWidgetActive = (0,_Pimcore_modules_widget_manager_hooks_use_is_active_main_widget__rspack_import_7.useIsActiveMainWidget)();
    const { setContext, removeContext } = (0,_Pimcore_modules_user_hooks_use_global_user_management_context__rspack_import_8.useGlobalUserContext)();
    const { role, isLoading, isError, removeRoleFromState } = (0,_Pimcore_modules_user_roles_hooks_use_roles_draft__rspack_import_9.useRoleDraft)(id);
    (0,react__rspack_import_1.useEffect)(()=>{
        return ()=>{
            removeContext();
            removeRoleFromState();
        };
    }, []);
    (0,react__rspack_import_1.useEffect)(()=>{
        if (isWidgetActive) {
            setContext({
                id
            });
        }
        return ()=>{
            if (!isWidgetActive) {
                removeContext();
            }
        };
    }, [
        isWidgetActive
    ]);
    if (isError) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)("div", {
            children: "Error"
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/detail-tab.tsx",
            lineNumber: 57,
            columnNumber: 12
        }, undefined);
    }
    if (isLoading) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_content_content__rspack_import_10.Content, {
            loading: true
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/detail-tab.tsx",
            lineNumber: 60,
            columnNumber: 12
        }, undefined);
    }
    if (role === undefined) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(react_jsx_dev_runtime__rspack_import_0.Fragment, {}, void 0, false);
    }
    const items = [
        {
            key: 'settings',
            label: t('roles.settings.title'),
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_user_roles_detail_tabs_settings_settings_container__rspack_import_3.SettingsContainer, {}, id, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/detail-tab.tsx",
                lineNumber: 68,
                columnNumber: 15
            }, undefined)
        },
        {
            key: 'workspaces',
            label: t('roles.workspaces.title'),
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_user_roles_detail_tabs_workspaces_workspaces_container__rspack_import_4.WorkspacesContainer, {}, id, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/detail-tab.tsx",
                lineNumber: 72,
                columnNumber: 15
            }, undefined)
        }
    ];
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_user_roles_role_provider__rspack_import_6.RoleProvider, {
        id: id,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_tabs_tabs__rspack_import_2.Tabs, {
            defaultActiveKey: "1",
            destroyInactiveTabPane: true,
            items: items
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/detail-tab.tsx",
            lineNumber: 75,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/detail-tab.tsx",
        lineNumber: 74,
        columnNumber: 10
    }, undefined);
};
_s(DetailTab, "l/9Yai2GU4XnaVy02jZ2lUPRNbI=", false, function() {
    return [
        react_i18next__rspack_import_5.useTranslation,
        _Pimcore_modules_widget_manager_hooks_use_is_active_main_widget__rspack_import_7.useIsActiveMainWidget,
        _Pimcore_modules_user_hooks_use_global_user_management_context__rspack_import_8.useGlobalUserContext,
        _Pimcore_modules_user_roles_hooks_use_roles_draft__rspack_import_9.useRoleDraft
    ];
});
_c = DetailTab;

var _c;
$RefreshReg$(_c, "DetailTab");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/user/roles/detail/tabs/settings/components/form/general-accordion.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  GeneralAccordion: () => (GeneralAccordion)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var antd__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* import */ var antd__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(antd__rspack_import_2);
/* import */ var _Pimcore_components_accordion_accordion__rspack_import_3 = __webpack_require__("./js/src/core/components/accordion/accordion.tsx");
/* import */ var react_i18next__rspack_import_4 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_4_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_4);
/* import */ var _Pimcore_components_select_select__rspack_import_5 = __webpack_require__("./js/src/core/components/select/select.tsx");
/* import */ var _Pimcore_modules_user_roles_hooks_use_role_context__rspack_import_6 = __webpack_require__("./js/src/core/modules/user/roles/hooks/use-role-context.tsx");
/* import */ var _Pimcore_modules_perspectives_perspectives_slice_enhanced__rspack_import_7 = __webpack_require__("./js/src/core/modules/perspectives/perspectives-slice.enhanced.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 






const GeneralAccordion = ()=>{
    _s();
    const { t } = (0,react_i18next__rspack_import_4.useTranslation)();
    const { id } = (0,_Pimcore_modules_user_roles_hooks_use_role_context__rspack_import_6.useRoleContext)();
    const { data: perspectivesData } = (0,_Pimcore_modules_perspectives_perspectives_slice_enhanced__rspack_import_7.usePerspectiveGetConfigCollectionQuery)();
    const perspectiveOptions = ((perspectivesData === null || perspectivesData === void 0 ? void 0 : perspectivesData.items) ?? []).map((item)=>({
            value: item.id,
            label: item.name
        })).sort((a, b)=>(a.label ?? '').localeCompare(b.label ?? ''));
    const sortByLabel = (values)=>{
        const labelMap = new Map(perspectiveOptions.map((o)=>[
                o.value,
                o.label ?? ''
            ]));
        return [
            ...values
        ].sort((a, b)=>(labelMap.get(a) ?? '').localeCompare(labelMap.get(b) ?? ''));
    };
    const content = [
        {
            key: '1',
            title: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(react_jsx_dev_runtime__rspack_import_0.Fragment, {
                children: t('roles.general')
            }, void 0, false),
            info: 'ID: ' + id,
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_2.Form.Item, {
                label: t('user-management.perspectives'),
                name: "perspectives",
                normalize: sortByLabel,
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_select_select__rspack_import_5.Select, {
                    mode: "multiple",
                    options: perspectiveOptions,
                    placeholder: t('user-management.perspectives')
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/settings/components/form/general-accordion.tsx",
                    lineNumber: 41,
                    columnNumber: 11
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/settings/components/form/general-accordion.tsx",
                lineNumber: 40,
                columnNumber: 15
            }, undefined)
        }
    ];
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_accordion_accordion__rspack_import_3.Accordion, {
        activeKey: '1',
        bordered: true,
        items: content,
        size: 'small'
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/settings/components/form/general-accordion.tsx",
        lineNumber: 44,
        columnNumber: 10
    }, undefined);
};
_s(GeneralAccordion, "NW3CnVb7l8pRbXszqxQGFTd137s=", false, function() {
    return [
        react_i18next__rspack_import_4.useTranslation,
        _Pimcore_modules_user_roles_hooks_use_role_context__rspack_import_6.useRoleContext,
        _Pimcore_modules_perspectives_perspectives_slice_enhanced__rspack_import_7.usePerspectiveGetConfigCollectionQuery
    ];
});
_c = GeneralAccordion;

var _c;
$RefreshReg$(_c, "GeneralAccordion");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/user/roles/detail/tabs/settings/settings-container.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SettingsContainer: () => (SettingsContainer)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var lodash__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_1);
/* import */ var react__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_2);
/* import */ var antd__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* import */ var antd__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(antd__rspack_import_3);
/* import */ var _Pimcore_components_form_form__rspack_import_4 = __webpack_require__("./js/src/core/components/form/form.tsx");
/* import */ var _Pimcore_modules_user_roles_hooks_use_role_context__rspack_import_5 = __webpack_require__("./js/src/core/modules/user/roles/hooks/use-role-context.tsx");
/* import */ var _Pimcore_components_content_content__rspack_import_6 = __webpack_require__("./js/src/core/components/content/content.tsx");
/* import */ var _Pimcore_modules_user_roles_detail_tabs_settings_components_form_general_accordion__rspack_import_7 = __webpack_require__("./js/src/core/modules/user/roles/detail/tabs/settings/components/form/general-accordion.tsx");
/* import */ var _Pimcore_modules_user_management_detail_tabs_settings_components_form_permissions_accordion__rspack_import_8 = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/settings/components/form/permissions-accordion.tsx");
/* import */ var _Pimcore_modules_user_management_detail_tabs_settings_components_form_types_classes_accordion__rspack_import_9 = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/settings/components/form/types-classes-accordion.tsx");
/* import */ var _Pimcore_modules_user_management_detail_tabs_settings_components_form_shared_translation_settings_accordion__rspack_import_10 = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/settings/components/form/shared-translation-settings-accordion.tsx");
/* import */ var _Pimcore_modules_app_settings_hooks_use_settings__rspack_import_11 = __webpack_require__("./js/src/core/modules/app/settings/hooks/use-settings.ts");
/* import */ var _Pimcore_modules_user_roles_hooks_use_roles_draft__rspack_import_12 = __webpack_require__("./js/src/core/modules/user/roles/hooks/use-roles-draft.tsx");
/* import */ var _Pimcore_modules_user_management_detail_tabs_settings_settings_helper__rspack_import_13 = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/settings/settings-helper.ts");
/* import */ var _Pimcore_modules_user_user_api_slice_enhanced__rspack_import_14 = __webpack_require__("./js/src/core/modules/user/user-api-slice-enhanced.ts");
/* import */ var _Pimcore_modules_perspectives_perspectives_slice_enhanced__rspack_import_15 = __webpack_require__("./js/src/core/modules/perspectives/perspectives-slice.enhanced.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 














const SettingsContainer = (param)=>{
    let { ...props } = param;
    _s();
    const { validLanguages } = (0,_Pimcore_modules_app_settings_hooks_use_settings__rspack_import_11.useSettings)();
    const [form] = _Pimcore_components_form_form__rspack_import_4.Form.useForm();
    const { id } = (0,_Pimcore_modules_user_roles_hooks_use_role_context__rspack_import_5.useRoleContext)();
    const { role, isLoading, changeRoleInState } = (0,_Pimcore_modules_user_roles_hooks_use_roles_draft__rspack_import_12.useRoleDraft)(id);
    const { data: availablePermissionsData, isLoading: permissionsLoading } = (0,_Pimcore_modules_user_user_api_slice_enhanced__rspack_import_14.useUserGetAvailablePermissionsQuery)();
    const { isLoading: perspectivesLoading } = (0,_Pimcore_modules_perspectives_perspectives_slice_enhanced__rspack_import_15.usePerspectiveGetConfigCollectionQuery)();
    const permissions = (0,_Pimcore_modules_user_management_detail_tabs_settings_settings_helper__rspack_import_13.getGroupedPermissions)((availablePermissionsData === null || availablePermissionsData === void 0 ? void 0 : availablePermissionsData.items) ?? []);
    const buildFormValues = ()=>({
            name: role === null || role === void 0 ? void 0 : role.name,
            classes: (role === null || role === void 0 ? void 0 : role.classes) ?? [],
            docTypes: role === null || role === void 0 ? void 0 : role.docTypes,
            perspectives: (role === null || role === void 0 ? void 0 : role.perspectives) ?? [],
            permissionsDefault: Array.isArray(role === null || role === void 0 ? void 0 : role.permissions) ? role.permissions.filter((permission)=>permissions.default.some((defaultPermission)=>defaultPermission.key === permission)) : [],
            permissionsBundles: Array.isArray(role === null || role === void 0 ? void 0 : role.permissions) ? role.permissions.filter((permission)=>permissions.bundles.some((defaultPermission)=>defaultPermission.key === permission)) : []
        });
    const onValuesChange = (0,react__rspack_import_2.useCallback)((0,lodash__rspack_import_1.debounce)((changedValues, allValues)=>{
        const updatedValues = {
            ...allValues
        };
        if (changedValues.permissionsDefault !== undefined || changedValues.permissionsBundles !== undefined) {
            updatedValues.permissions = [
                ...changedValues.permissionsDefault ?? allValues.permissionsDefault ?? [],
                ...changedValues.permissionsBundles ?? allValues.permissionsBundles ?? []
            ];
        }
        changeRoleInState(updatedValues);
    }, 300), [
        changeRoleInState
    ]);
    if (isLoading || permissionsLoading || perspectivesLoading) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_content_content__rspack_import_6.Content, {
            loading: true
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/settings/settings-container.tsx",
            lineNumber: 67,
            columnNumber: 12
        }, undefined);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_form_form__rspack_import_4.Form, {
        form: form,
        initialValues: buildFormValues(),
        layout: "vertical",
        onValuesChange: onValuesChange,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_3.Row, {
            gutter: [
                10,
                10
            ],
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_3.Col, {
                    span: 16,
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_user_roles_detail_tabs_settings_components_form_general_accordion__rspack_import_7.GeneralAccordion, {}, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/settings/settings-container.tsx",
                        lineNumber: 72,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/settings/settings-container.tsx",
                    lineNumber: 71,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_3.Col, {
                    span: 16,
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_user_management_detail_tabs_settings_components_form_permissions_accordion__rspack_import_8.PermissionsAccordion, {
                        permissions: permissions
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/settings/settings-container.tsx",
                        lineNumber: 75,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/settings/settings-container.tsx",
                    lineNumber: 74,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_3.Col, {
                    span: 16,
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_user_management_detail_tabs_settings_components_form_types_classes_accordion__rspack_import_9.TypesAndClassesAccordion, {}, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/settings/settings-container.tsx",
                        lineNumber: 78,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/settings/settings-container.tsx",
                    lineNumber: 77,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_3.Col, {
                    span: 16,
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_user_management_detail_tabs_settings_components_form_shared_translation_settings_accordion__rspack_import_10.SharedTranslationSettingsAccordion, {
                        data: validLanguages,
                        editData: role === null || role === void 0 ? void 0 : role.websiteTranslationLanguagesEdit,
                        onChange: (languages)=>{
                            changeRoleInState({
                                websiteTranslationLanguagesEdit: languages.filter((language)=>language.edit).map((language)=>language.abbreviation),
                                websiteTranslationLanguagesView: languages.filter((language)=>language.view).map((language)=>language.abbreviation)
                            });
                        },
                        viewData: role === null || role === void 0 ? void 0 : role.websiteTranslationLanguagesView
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/settings/settings-container.tsx",
                        lineNumber: 81,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/settings/settings-container.tsx",
                    lineNumber: 80,
                    columnNumber: 9
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/settings/settings-container.tsx",
            lineNumber: 70,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/settings/settings-container.tsx",
        lineNumber: 69,
        columnNumber: 10
    }, undefined);
};
_s(SettingsContainer, "N/xxS4tXfiwyUyaqpzFLt+Vs/x0=", false, function() {
    return [
        _Pimcore_modules_app_settings_hooks_use_settings__rspack_import_11.useSettings,
        _Pimcore_components_form_form__rspack_import_4.Form.useForm,
        _Pimcore_modules_user_roles_hooks_use_role_context__rspack_import_5.useRoleContext,
        _Pimcore_modules_user_roles_hooks_use_roles_draft__rspack_import_12.useRoleDraft,
        _Pimcore_modules_user_user_api_slice_enhanced__rspack_import_14.useUserGetAvailablePermissionsQuery,
        _Pimcore_modules_perspectives_perspectives_slice_enhanced__rspack_import_15.usePerspectiveGetConfigCollectionQuery
    ];
});
_c = SettingsContainer;

var _c;
$RefreshReg$(_c, "SettingsContainer");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/user/roles/detail/tabs/workspaces/workspaces-container.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  WorkspacesContainer: () => (WorkspacesContainer)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _Pimcore_components_accordion_accordion__rspack_import_2 = __webpack_require__("./js/src/core/components/accordion/accordion.tsx");
/* import */ var react_i18next__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_3);
/* import */ var _Pimcore_modules_user_management_detail_tabs_workspaces_components_table_table__rspack_import_4 = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/workspaces/components/table/table.tsx");
/* import */ var _Pimcore_components_icon_text_button_icon_text_button__rspack_import_5 = __webpack_require__("./js/src/core/components/icon-text-button/icon-text-button.tsx");
/* import */ var _Pimcore_modules_user_roles_hooks_use_role_context__rspack_import_6 = __webpack_require__("./js/src/core/modules/user/roles/hooks/use-role-context.tsx");
/* import */ var _Pimcore_modules_user_roles_hooks_use_roles_draft__rspack_import_7 = __webpack_require__("./js/src/core/modules/user/roles/hooks/use-roles-draft.tsx");
/* import */ var antd__rspack_import_8 = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* import */ var antd__rspack_import_8_default = /*#__PURE__*/__webpack_require__.n(antd__rspack_import_8);
/* import */ var _Pimcore_components_modal_useModal__rspack_import_9 = __webpack_require__("./js/src/core/components/modal/useModal/index.tsx");
/* import */ var _Pimcore_components_modal_footer_modal_footer__rspack_import_10 = __webpack_require__("./js/src/core/components/modal/footer/modal-footer.tsx");
/* import */ var _Pimcore_components_button_button__rspack_import_11 = __webpack_require__("./js/src/core/components/button/button.tsx");
/* import */ var _Pimcore_modules_user_management_detail_tabs_workspaces_components_special_settings_modal__rspack_import_12 = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/workspaces/components/special-settings-modal.tsx");
/* import */ var _Pimcore_modules_user_management_detail_tabs_workspaces_workspace_type__rspack_import_13 = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/workspaces/workspace-type.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 












const WorkspacesContainer = (param)=>{
    let { ...props } = param;
    var _role_dataObjectWorkspaces_find;
    _s();
    const { t } = (0,react_i18next__rspack_import_3.useTranslation)();
    const { id } = (0,_Pimcore_modules_user_roles_hooks_use_role_context__rspack_import_6.useRoleContext)();
    const { role, isLoading, changeRoleInState } = (0,_Pimcore_modules_user_roles_hooks_use_roles_draft__rspack_import_7.useRoleDraft)(id);
    const [assetWorkspaces, setAssetWorkspaces] = react__rspack_import_1_default().useState((role === null || role === void 0 ? void 0 : role.assetWorkspaces) ?? []);
    const [documentWorkspaces, setDocumentWorkspaces] = react__rspack_import_1_default().useState((role === null || role === void 0 ? void 0 : role.documentWorkspaces) ?? []);
    const [objectWorkspaces, setObjectWorkspaces] = react__rspack_import_1_default().useState((role === null || role === void 0 ? void 0 : role.dataObjectWorkspaces) ?? []);
    const [specialModalContext, setSpecialModalContext] = (0,react__rspack_import_1.useState)(null);
    const [isSpecialSettingsModalOpen, setIsSpecialSettingsModalOpen] = (0,react__rspack_import_1.useState)(false);
    const { showModal: showDuplicatePropertyModal, closeModal: closeDuplicatePropertyModal, renderModal: DuplicatePropertyModal } = (0,_Pimcore_components_modal_useModal__rspack_import_9.useModal)({
        type: 'error'
    });
    if (role === undefined) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(react_jsx_dev_runtime__rspack_import_0.Fragment, {}, void 0, false);
    }
    const handleAddNewWorkspaces = (workspaces, type)=>{
        const workspace = {
            cid: new Date().getTime(),
            // after path update is set to document id
            cpath: '',
            list: false,
            view: false,
            save: false,
            publish: false,
            unpublish: false,
            delete: false,
            rename: false,
            create: false,
            settings: false,
            versions: false,
            properties: false
        };
        switch(type){
            case _Pimcore_modules_user_management_detail_tabs_workspaces_workspace_type__rspack_import_13.WorkspaceType.DOCUMENT:
                setDocumentWorkspaces([
                    ...workspaces,
                    workspace
                ]);
                break;
            case _Pimcore_modules_user_management_detail_tabs_workspaces_workspace_type__rspack_import_13.WorkspaceType.ASSET:
                setAssetWorkspaces([
                    ...workspaces,
                    workspace
                ]);
                break;
            case _Pimcore_modules_user_management_detail_tabs_workspaces_workspace_type__rspack_import_13.WorkspaceType.OBJECT:
                setObjectWorkspaces([
                    ...workspaces,
                    workspace
                ]);
                break;
        }
    };
    const getSpecialModalValues = (type)=>{
        const ws = role === null || role === void 0 ? void 0 : role.dataObjectWorkspaces.find((ws)=>ws.cid === specialModalContext);
        return (ws === null || ws === void 0 ? void 0 : ws[type]) ?? [];
    };
    const documentsAccordion = [
        {
            key: '1',
            title: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(react_jsx_dev_runtime__rspack_import_0.Fragment, {
                children: t('user-management.workspaces.documents')
            }, void 0, false),
            info: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_text_button_icon_text_button__rspack_import_5.IconTextButton, {
                icon: {
                    value: 'add-find'
                },
                onClick: ()=>{
                    handleAddNewWorkspaces(role.documentWorkspaces, 'document');
                },
                children: t('user-management.workspaces.add')
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/workspaces/workspaces-container.tsx",
                lineNumber: 89,
                columnNumber: 11
            }, undefined),
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_user_management_detail_tabs_workspaces_components_table_table__rspack_import_4.Table, {
                data: documentWorkspaces,
                isLoading: isLoading,
                onUpdateData: (data)=>{
                    changeRoleInState({
                        documentWorkspaces: data
                    });
                },
                showDuplicatePropertyModal: ()=>{
                    showDuplicatePropertyModal();
                },
                type: _Pimcore_modules_user_management_detail_tabs_workspaces_workspace_type__rspack_import_13.WorkspaceType.DOCUMENT
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/workspaces/workspaces-container.tsx",
                lineNumber: 94,
                columnNumber: 15
            }, undefined)
        }
    ];
    const assetsAccordion = [
        {
            key: '1',
            title: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(react_jsx_dev_runtime__rspack_import_0.Fragment, {
                children: t('user-management.workspaces.assets')
            }, void 0, false),
            info: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_text_button_icon_text_button__rspack_import_5.IconTextButton, {
                icon: {
                    value: 'add-find'
                },
                onClick: ()=>{
                    handleAddNewWorkspaces(role.assetWorkspaces, 'asset');
                },
                children: t('user-management.workspaces.add')
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/workspaces/workspaces-container.tsx",
                lineNumber: 105,
                columnNumber: 11
            }, undefined),
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_user_management_detail_tabs_workspaces_components_table_table__rspack_import_4.Table, {
                data: assetWorkspaces,
                isLoading: isLoading,
                onUpdateData: (data)=>{
                    changeRoleInState({
                        assetWorkspaces: data
                    });
                },
                showDuplicatePropertyModal: ()=>{
                    showDuplicatePropertyModal();
                },
                type: _Pimcore_modules_user_management_detail_tabs_workspaces_workspace_type__rspack_import_13.WorkspaceType.ASSET
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/workspaces/workspaces-container.tsx",
                lineNumber: 110,
                columnNumber: 15
            }, undefined)
        }
    ];
    const objectsAccordion = [
        {
            key: '1',
            title: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(react_jsx_dev_runtime__rspack_import_0.Fragment, {
                children: t('user-management.workspaces.objects')
            }, void 0, false),
            info: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_text_button_icon_text_button__rspack_import_5.IconTextButton, {
                icon: {
                    value: 'add-find'
                },
                onClick: ()=>{
                    handleAddNewWorkspaces(role.dataObjectWorkspaces, 'object');
                },
                children: t('user-management.workspaces.add')
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/workspaces/workspaces-container.tsx",
                lineNumber: 121,
                columnNumber: 11
            }, undefined),
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_user_management_detail_tabs_workspaces_components_table_table__rspack_import_4.Table, {
                data: objectWorkspaces,
                isLoading: isLoading,
                onShowSpecialSettings: (cid)=>{
                    setSpecialModalContext(cid);
                    setIsSpecialSettingsModalOpen(true);
                },
                onUpdateData: (data)=>{
                    changeRoleInState({
                        dataObjectWorkspaces: data
                    });
                },
                showDuplicatePropertyModal: ()=>{
                    showDuplicatePropertyModal();
                },
                type: _Pimcore_modules_user_management_detail_tabs_workspaces_workspace_type__rspack_import_13.WorkspaceType.OBJECT
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/workspaces/workspaces-container.tsx",
                lineNumber: 126,
                columnNumber: 15
            }, undefined)
        }
    ];
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_8.Flex, {
        gap: 'middle',
        vertical: true,
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_accordion_accordion__rspack_import_2.Accordion, {
                activeKey: '1',
                bordered: true,
                collapsible: "icon",
                items: documentsAccordion,
                size: 'small',
                table: true
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/workspaces/workspaces-container.tsx",
                lineNumber: 138,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_accordion_accordion__rspack_import_2.Accordion, {
                activeKey: '1',
                bordered: true,
                collapsible: "icon",
                items: assetsAccordion,
                size: 'small',
                table: true
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/workspaces/workspaces-container.tsx",
                lineNumber: 140,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_accordion_accordion__rspack_import_2.Accordion, {
                activeKey: '1',
                bordered: true,
                collapsible: "icon",
                items: objectsAccordion,
                size: 'small',
                table: true
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/workspaces/workspaces-container.tsx",
                lineNumber: 142,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(DuplicatePropertyModal, {
                footer: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_modal_footer_modal_footer__rspack_import_10.ModalFooter, {
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_button_button__rspack_import_11.Button, {
                        onClick: closeDuplicatePropertyModal,
                        type: "primary",
                        children: t('button.ok')
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/workspaces/workspaces-container.tsx",
                        lineNumber: 145,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/workspaces/workspaces-container.tsx",
                    lineNumber: 144,
                    columnNumber: 39
                }, undefined),
                title: t('properties.property-already-exist.title'),
                children: t('properties.property-already-exist.error')
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/workspaces/workspaces-container.tsx",
                lineNumber: 144,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_user_management_detail_tabs_workspaces_components_special_settings_modal__rspack_import_12.SpecialSettingsModal, {
                cpath: ((_role_dataObjectWorkspaces_find = role.dataObjectWorkspaces.find((ws)=>ws.cid === specialModalContext)) === null || _role_dataObjectWorkspaces_find === void 0 ? void 0 : _role_dataObjectWorkspaces_find.cpath) ?? '',
                initialValues: {
                    layouts: getSpecialModalValues('layouts'),
                    localizedEdit: getSpecialModalValues('localizedEdit'),
                    localizedView: getSpecialModalValues('localizedView')
                },
                onApply: (changes)=>{
                    changeRoleInState({
                        dataObjectWorkspaces: role.dataObjectWorkspaces.map((ws)=>ws.cid === specialModalContext ? {
                                ...ws,
                                ...changes
                            } : ws)
                    });
                    setIsSpecialSettingsModalOpen(false);
                },
                onCancel: ()=>{
                    setIsSpecialSettingsModalOpen(false);
                },
                open: isSpecialSettingsModalOpen
            }, specialModalContext ?? 'none', false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/workspaces/workspaces-container.tsx",
                lineNumber: 150,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/workspaces/workspaces-container.tsx",
        lineNumber: 137,
        columnNumber: 10
    }, undefined);
};
_s(WorkspacesContainer, "6m3imdXCRABpqn42Zg9y5Pvy0D0=", false, function() {
    return [
        react_i18next__rspack_import_3.useTranslation,
        _Pimcore_modules_user_roles_hooks_use_role_context__rspack_import_6.useRoleContext,
        _Pimcore_modules_user_roles_hooks_use_roles_draft__rspack_import_7.useRoleDraft,
        _Pimcore_components_modal_useModal__rspack_import_9.useModal
    ];
});
_c = WorkspacesContainer;

var _c;
$RefreshReg$(_c, "WorkspacesContainer");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/user/roles/hooks/use-role-context.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useRoleContext: () => (useRoleContext)
});
/* import */ var react__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var _Pimcore_modules_user_roles_role_provider__rspack_import_1 = __webpack_require__("./js/src/core/modules/user/roles/role-provider.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 

const useRoleContext = ()=>{
    _s();
    const { id } = (0,react__rspack_import_0.useContext)(_Pimcore_modules_user_roles_role_provider__rspack_import_1.RoleContext);
    return {
        id
    };
};
_s(useRoleContext, "cXjLo1//Z4eo7bGcJs0ESH2TMGY=");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/user/roles/role-provider.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  RoleContext: () => (RoleContext),
  RoleProvider: () => (RoleProvider)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 
const RoleContext = /*#__PURE__*/ (0,react__rspack_import_1.createContext)({
    id: -1
});
const RoleProvider = (param)=>{
    let { id, children } = param;
    _s();
    return (0,react__rspack_import_1.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(RoleContext.Provider, {
            value: {
                id
            },
            children: children
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/role-provider.tsx",
            lineNumber: 19,
            columnNumber: 24
        }, undefined), [
        id
    ]);
};
_s(RoleProvider, "nwk+m61qLgjDVUp4IGV/072DDN4=");
_c = RoleProvider;
var _c;
$RefreshReg$(_c, "RoleProvider");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/user/roles/toolbar/toolbar.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Toolbar: () => (Toolbar)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _Pimcore_components_toolbar_toolbar__rspack_import_2 = __webpack_require__("./js/src/core/components/toolbar/toolbar.tsx");
/* import */ var react_i18next__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_3);
/* import */ var _Pimcore_components_button_button__rspack_import_4 = __webpack_require__("./js/src/core/components/button/button.tsx");
/* import */ var _Pimcore_modules_user_roles_hooks_use_roles_draft__rspack_import_5 = __webpack_require__("./js/src/core/modules/user/roles/hooks/use-roles-draft.tsx");
/* import */ var _Pimcore_modules_user_roles_hooks_use_roles_helper__rspack_import_6 = __webpack_require__("./js/src/core/modules/user/roles/hooks/use-roles-helper.tsx");
/* import */ var _Pimcore_components_icon_button_icon_button__rspack_import_7 = __webpack_require__("./js/src/core/components/icon-button/icon-button.tsx");
/* import */ var antd__rspack_import_8 = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* import */ var antd__rspack_import_8_default = /*#__PURE__*/__webpack_require__.n(antd__rspack_import_8);
/* import */ var _Pimcore_components_dropdown_button_dropdown_button__rspack_import_9 = __webpack_require__("./js/src/core/components/dropdown-button/dropdown-button.tsx");
/* import */ var _Pimcore_components_icon_icon__rspack_import_10 = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* import */ var _Pimcore_components_dropdown_dropdown__rspack_import_11 = __webpack_require__("./js/src/core/components/dropdown/dropdown.tsx");
/* import */ var _Pimcore_components_flex_flex__rspack_import_12 = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 











const Toolbar = (param)=>{
    let { id, onCloneRole, onRemoveRole } = param;
    _s();
    const { t } = (0,react_i18next__rspack_import_3.useTranslation)();
    const { role, isLoading, reloadRole } = (0,_Pimcore_modules_user_roles_hooks_use_roles_draft__rspack_import_5.useRoleDraft)(id);
    const { updateRoleById } = (0,_Pimcore_modules_user_roles_hooks_use_roles_helper__rspack_import_6.useRoleHelper)();
    const hasChanges = (role === null || role === void 0 ? void 0 : role.modified) === true;
    const [popConfirmOpen, setPopConfirmOpen] = (0,react__rspack_import_1.useState)(false);
    const onOpenChange = (newOpen)=>{
        if (!newOpen) {
            setPopConfirmOpen(false);
            return;
        }
        if (hasChanges) {
            setPopConfirmOpen(true);
        } else {
            reloadRole();
        }
    };
    const onCancel = ()=>{
        setPopConfirmOpen(false);
    };
    const onConfirm = ()=>{
        setPopConfirmOpen(false);
        reloadRole();
    };
    const onSaveClick = ()=>{
        updateRoleById({
            id,
            item: role
        }).catch((error)=>{
            console.error(error);
        });
    };
    const items = [
        {
            key: '1',
            label: t('tree.actions.clone-role'),
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_icon__rspack_import_10.Icon, {
                value: "copy"
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/toolbar/toolbar.tsx",
                lineNumber: 70,
                columnNumber: 11
            }, undefined),
            onClick: onCloneRole
        },
        {
            key: '2',
            label: t('tree.actions.remove-role'),
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_icon__rspack_import_10.Icon, {
                value: "trash"
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/toolbar/toolbar.tsx",
                lineNumber: 75,
                columnNumber: 11
            }, undefined),
            onClick: onRemoveRole
        }
    ];
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_toolbar_toolbar__rspack_import_2.Toolbar, {
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_flex_flex__rspack_import_12.Flex, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_8.Popconfirm, {
                        onCancel: onCancel,
                        onConfirm: onConfirm,
                        onOpenChange: onOpenChange,
                        open: popConfirmOpen,
                        title: t('toolbar.reload.confirmation'),
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_button_icon_button__rspack_import_7.IconButton, {
                            icon: {
                                value: 'refresh'
                            },
                            children: t('toolbar.reload')
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/toolbar/toolbar.tsx",
                            lineNumber: 81,
                            columnNumber: 11
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/toolbar/toolbar.tsx",
                        lineNumber: 80,
                        columnNumber: 9
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_dropdown_dropdown__rspack_import_11.Dropdown, {
                        menu: {
                            items
                        },
                        trigger: [
                            'click'
                        ],
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_dropdown_button_dropdown_button__rspack_import_9.DropdownButton, {
                            children: t('toolbar.more')
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/toolbar/toolbar.tsx",
                            lineNumber: 91,
                            columnNumber: 11
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/toolbar/toolbar.tsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/toolbar/toolbar.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_button_button__rspack_import_4.Button, {
                disabled: !hasChanges || isLoading,
                loading: isLoading,
                onClick: onSaveClick,
                type: "primary",
                children: t('toolbar.save')
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/toolbar/toolbar.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/toolbar/toolbar.tsx",
        lineNumber: 78,
        columnNumber: 10
    }, undefined);
};
_s(Toolbar, "+uSDkkfhVzC6Is3vdIKK0H6p6/c=", false, function() {
    return [
        react_i18next__rspack_import_3.useTranslation,
        _Pimcore_modules_user_roles_hooks_use_roles_draft__rspack_import_5.useRoleDraft,
        _Pimcore_modules_user_roles_hooks_use_roles_helper__rspack_import_6.useRoleHelper
    ];
});
_c = Toolbar;
var _c;
$RefreshReg$(_c, "Toolbar");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/user/roles/tree/tree-autocomplete.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TreeAutocomplete: () => (TreeAutocomplete)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var antd__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* import */ var antd__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(antd__rspack_import_2);
/* import */ var react_i18next__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_3);
/* import */ var _Pimcore_components_search_input_search_input_styles__rspack_import_4 = __webpack_require__("./js/src/core/components/search-input/search-input.styles.ts");
/* import */ var _Pimcore_components_icon_icon__rspack_import_5 = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* import */ var _Pimcore_modules_app_error_handler__rspack_import_6 = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* import */ var _Pimcore_modules_user_roles_hooks_use_roles_helper__rspack_import_7 = __webpack_require__("./js/src/core/modules/user/roles/hooks/use-roles-helper.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 






const TreeAutocomplete = (param)=>{
    let { loading = true, ...props } = param;
    _s();
    const { t } = (0,react_i18next__rspack_import_3.useTranslation)();
    const { openRole, searchRoleByText } = (0,_Pimcore_modules_user_roles_hooks_use_roles_helper__rspack_import_7.useRoleHelper)();
    const [searchOptions, setSearchOptions] = (0,react__rspack_import_1.useState)([]);
    const [searchValue, setSearchValue] = (0,react__rspack_import_1.useState)('');
    const { Text } = antd__rspack_import_2.Typography;
    const { styles } = (0,_Pimcore_components_search_input_search_input_styles__rspack_import_4.useStyles)();
    const onSearch = (value)=>{
        setSearchValue(value);
        searchRoleByText(searchValue).then((response)=>{
            setSearchOptions(response.items.map((item)=>({
                    value: item.id.toString(),
                    label: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(react_jsx_dev_runtime__rspack_import_0.Fragment, {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)("div", {
                                children: item.name
                            }, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/tree/tree-autocomplete.tsx",
                                lineNumber: 43,
                                columnNumber: 13
                            }, undefined),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(Text, {
                                strong: true,
                                children: [
                                    t('roles.search.id'),
                                    ": "
                                ]
                            }, void 0, true, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/tree/tree-autocomplete.tsx",
                                lineNumber: 44,
                                columnNumber: 13
                            }, undefined),
                            " ",
                            item.id
                        ]
                    }, void 0, true)
                })));
        }).catch((e)=>{
            (0,_Pimcore_modules_app_error_handler__rspack_import_6["default"])(new _Pimcore_modules_app_error_handler__rspack_import_6.GeneralError('An error occured while searching for a role'));
        });
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_2.AutoComplete, {
        className: 'tree--search',
        onSearch: onSearch,
        onSelect: (id, option)=>{
            openRole(Number(id));
            setSearchValue('');
        },
        options: searchOptions,
        value: searchValue,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_2.Input.Search, {
            allowClear: {
                clearIcon: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_icon__rspack_import_5.Icon, {
                    className: styles.closeIcon,
                    value: "close"
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/tree/tree-autocomplete.tsx",
                    lineNumber: 56,
                    columnNumber: 18
                }, undefined)
            },
            className: styles.searchWithoutAddon,
            placeholder: t('roles.search'),
            prefix: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_icon__rspack_import_5.Icon, {
                className: styles.searchIcon,
                options: {
                    width: 12,
                    height: 12
                },
                value: "search"
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/tree/tree-autocomplete.tsx",
                lineNumber: 57,
                columnNumber: 86
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/tree/tree-autocomplete.tsx",
            lineNumber: 55,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/tree/tree-autocomplete.tsx",
        lineNumber: 51,
        columnNumber: 10
    }, undefined);
};
_s(TreeAutocomplete, "WSxl4HHKYGXJ3Dm42jlIJEs2iHg=", false, function() {
    return [
        react_i18next__rspack_import_3.useTranslation,
        _Pimcore_modules_user_roles_hooks_use_roles_helper__rspack_import_7.useRoleHelper,
        _Pimcore_components_search_input_search_input_styles__rspack_import_4.useStyles
    ];
});
_c = TreeAutocomplete;

var _c;
$RefreshReg$(_c, "TreeAutocomplete");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/user/roles/tree/tree-container.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TreeContainer: () => (TreeContainer)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _Pimcore_components_tree_element_tree_element__rspack_import_2 = __webpack_require__("./js/src/core/components/tree-element/tree-element.tsx");
/* import */ var react_i18next__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_3);
/* import */ var _Pimcore_components_modal_form_modal_hooks_use_form_modal__rspack_import_4 = __webpack_require__("./js/src/core/components/modal/form-modal/hooks/use-form-modal.tsx");
/* import */ var _Pimcore_modules_user_management_toolbar_toolbar_tree__rspack_import_5 = __webpack_require__("./js/src/core/modules/user/management/toolbar/toolbar-tree.tsx");
/* import */ var _Pimcore_components_content_layout_content_layout__rspack_import_6 = __webpack_require__("./js/src/core/components/content-layout/content-layout.tsx");
/* import */ var _Pimcore_components_content_content__rspack_import_7 = __webpack_require__("./js/src/core/components/content/content.tsx");
/* import */ var _Pimcore_modules_user_management_tree_tree_container_styles__rspack_import_8 = __webpack_require__("./js/src/core/modules/user/management/tree/tree-container.styles.tsx");
/* import */ var _Pimcore_modules_user_management_tree_tree_helper__rspack_import_9 = __webpack_require__("./js/src/core/modules/user/management/tree/tree-helper.ts");
/* import */ var _Pimcore_components_icon_icon__rspack_import_10 = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* import */ var _Pimcore_modules_user_roles_hooks_use_roles_helper__rspack_import_11 = __webpack_require__("./js/src/core/modules/user/roles/hooks/use-roles-helper.tsx");
/* import */ var _Pimcore_modules_user_roles_tree_tree_autocomplete__rspack_import_12 = __webpack_require__("./js/src/core/modules/user/roles/tree/tree-autocomplete.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 











const TreeContainer = (param)=>{
    let { expandedKeys, treeData, onLoadTreeData, onReloadTree, onSetExpandedKeys, onUpdateTreeData, ...props } = param;
    _s();
    const { t } = (0,react_i18next__rspack_import_3.useTranslation)();
    const { openRole, addNewRole, addNewFolder, removeRole, cloneRole, removeFolder, moveRoleById } = (0,_Pimcore_modules_user_roles_hooks_use_roles_helper__rspack_import_11.useRoleHelper)();
    const { styles } = (0,_Pimcore_modules_user_management_tree_tree_container_styles__rspack_import_8.useStyle)();
    const classNames = [
        styles.treeContainer
    ];
    const modal = (0,_Pimcore_components_modal_form_modal_hooks_use_form_modal__rspack_import_4.useFormModal)();
    const handleAddRole = (key)=>{
        modal.input({
            title: t('roles.add-role'),
            label: t('roles.add-role.label'),
            onOk: async (value)=>{
                await addNewRole({
                    parentId: key,
                    name: value
                });
                onReloadTree([
                    key
                ]);
            }
        });
    };
    const handleAddFolder = (key)=>{
        modal.input({
            title: t('roles.add-folder'),
            label: t('roles.add-folder.label'),
            onOk: async (value)=>{
                await addNewFolder({
                    parentId: key,
                    name: value
                });
                onReloadTree([
                    key
                ]);
            }
        });
    };
    const getRoleNameByKey = (data, key)=>{
        const node = (0,_Pimcore_modules_user_management_tree_tree_helper__rspack_import_9.findNodeByKey)(data, key);
        return (node === null || node === void 0 ? void 0 : node.title) ?? '';
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_content_layout_content_layout__rspack_import_6.ContentLayout, {
        renderToolbar: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_user_management_toolbar_toolbar_tree__rspack_import_5.ToolbarTree, {
            actions: [
                {
                    key: 'add-role',
                    label: t('tree.actions.role'),
                    icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_icon__rspack_import_10.Icon, {
                        value: "shield-plus"
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/tree/tree-container.tsx",
                        lineNumber: 82,
                        columnNumber: 11
                    }, undefined),
                    onClick: ()=>{
                        handleAddRole(0);
                    }
                },
                {
                    key: 'add-folder',
                    label: t('tree.actions.folder'),
                    icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_icon__rspack_import_10.Icon, {
                        value: "folder-plus"
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/tree/tree-container.tsx",
                        lineNumber: 89,
                        columnNumber: 11
                    }, undefined),
                    onClick: ()=>{
                        handleAddFolder(0);
                    }
                }
            ],
            onReload: ()=>{
                onReloadTree([
                    0
                ]);
            }
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/tree/tree-container.tsx",
            lineNumber: 79,
            columnNumber: 40
        }, undefined),
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_content_content__rspack_import_7.Content, {
            className: classNames.join(', '),
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_user_roles_tree_tree_autocomplete__rspack_import_12.TreeAutocomplete, {}, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/tree/tree-container.tsx",
                    lineNumber: 97,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_tree_element_tree_element__rspack_import_2.TreeElement, {
                    defaultExpandedKeys: expandedKeys,
                    draggable: true,
                    expandedKeys: expandedKeys,
                    onActionsClick: (key, action)=>{
                        if (typeof key === 'string') {
                            key = parseInt(key);
                        }
                        switch(action){
                            case 'add-folder':
                                handleAddFolder(key);
                                break;
                            case 'add-role':
                                handleAddRole(key);
                                break;
                            case 'clone-role':
                                modal.input({
                                    title: t('roles.clone-role'),
                                    label: t('roles.clone-role.text'),
                                    onOk: async (value)=>{
                                        var _findParentByKey;
                                        const parentId = (_findParentByKey = (0,_Pimcore_modules_user_management_tree_tree_helper__rspack_import_9.findParentByKey)(treeData, key)) === null || _findParentByKey === void 0 ? void 0 : _findParentByKey.key;
                                        const data = await cloneRole({
                                            id: key,
                                            name: value
                                        });
                                        if (data !== undefined) {
                                            onReloadTree([
                                                parentId
                                            ]);
                                        }
                                    }
                                });
                                break;
                            case 'remove-role':
                                modal.confirm({
                                    title: t('roles.remove-role'),
                                    content: t('roles.remove-role.text', {
                                        name: getRoleNameByKey(treeData, key)
                                    }),
                                    okText: t('button.confirm'),
                                    cancelText: t('button.cancel'),
                                    onOk: async ()=>{
                                        var _findParentByKey;
                                        await removeRole({
                                            id: Number(key)
                                        });
                                        onReloadTree([
                                            (_findParentByKey = (0,_Pimcore_modules_user_management_tree_tree_helper__rspack_import_9.findParentByKey)(treeData, key)) === null || _findParentByKey === void 0 ? void 0 : _findParentByKey.key
                                        ]);
                                    }
                                });
                                break;
                            case 'remove-folder':
                                modal.confirm({
                                    title: t('roles.remove-folder'),
                                    content: t('roles.remove-folder.text'),
                                    okText: t('button.confirm'),
                                    cancelText: t('button.cancel'),
                                    onOk: async ()=>{
                                        var _findParentByKey;
                                        await removeFolder({
                                            id: Number(key)
                                        });
                                        onReloadTree([
                                            (_findParentByKey = (0,_Pimcore_modules_user_management_tree_tree_helper__rspack_import_9.findParentByKey)(treeData, key)) === null || _findParentByKey === void 0 ? void 0 : _findParentByKey.key
                                        ]);
                                    }
                                });
                                break;
                        }
                    },
                    onDragAndDrop: async (params)=>{
                        const data = await moveRoleById({
                            id: Number(params.dragNode.key),
                            parentId: Number(params.node.key)
                        });
                        if (data !== undefined) {
                            var _findParentByKey;
                            onReloadTree([
                                (_findParentByKey = (0,_Pimcore_modules_user_management_tree_tree_helper__rspack_import_9.findParentByKey)(treeData, params.dragNode.key)) === null || _findParentByKey === void 0 ? void 0 : _findParentByKey.key,
                                params.node.key
                            ]);
                        }
                    },
                    onExpand: (keys)=>{
                        onSetExpandedKeys(keys);
                    },
                    onLoadData: onLoadTreeData,
                    onSelected: (key)=>{
                        var _findNodeByKey;
                        if (((_findNodeByKey = (0,_Pimcore_modules_user_management_tree_tree_helper__rspack_import_9.findNodeByKey)(treeData, key)) === null || _findNodeByKey === void 0 ? void 0 : _findNodeByKey.selectable) === true) {
                            openRole(Number(key));
                        }
                    },
                    treeData: treeData
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/tree/tree-container.tsx",
                    lineNumber: 99,
                    columnNumber: 9
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/tree/tree-container.tsx",
            lineNumber: 96,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/tree/tree-container.tsx",
        lineNumber: 79,
        columnNumber: 10
    }, undefined);
};
_s(TreeContainer, "WjbMjkfdvoVhUBvBFD+/+AZ3M9I=", false, function() {
    return [
        react_i18next__rspack_import_3.useTranslation,
        _Pimcore_modules_user_roles_hooks_use_roles_helper__rspack_import_11.useRoleHelper,
        _Pimcore_modules_user_management_tree_tree_container_styles__rspack_import_8.useStyle,
        _Pimcore_components_modal_form_modal_hooks_use_form_modal__rspack_import_4.useFormModal
    ];
});
_c = TreeContainer;

var _c;
$RefreshReg$(_c, "TreeContainer");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/user/user-management-provider.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  UserContext: () => (UserContext),
  UserManagementProvider: () => (UserManagementProvider)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 
const UserContext = /*#__PURE__*/ (0,react__rspack_import_1.createContext)({
    id: -1
});
const UserManagementProvider = (param)=>{
    let { id, children } = param;
    _s();
    return (0,react__rspack_import_1.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(UserContext.Provider, {
            value: {
                id
            },
            children: children
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/user-management-provider.tsx",
            lineNumber: 19,
            columnNumber: 24
        }, undefined), [
        id
    ]);
};
_s(UserManagementProvider, "nwk+m61qLgjDVUp4IGV/072DDN4=");
_c = UserManagementProvider;
var _c;
$RefreshReg$(_c, "UserManagementProvider");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},

}]);
//# sourceMappingURL=__federation_expose_modules__data_object.js.map