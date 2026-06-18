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
(self["chunk_pimcore_studio_ui_bundle "] = self["chunk_pimcore_studio_ui_bundle "] || []).push([["js_src_core_app_public-api_index_ts"], {
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
"./js/src/core/app/public-api/i18n/i18n-api.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  i18nApi: () => (i18nApi)
});
/* import */ var _Pimcore_app_i18n__rspack_import_0 = __webpack_require__("./js/src/core/app/i18n/index.ts");
/* import */ var lodash__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_1);
/* import */ var _sdk_utils__rspack_import_2 = __webpack_require__("./js/src/sdk/utils/index.ts");
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


class I18nApiImpl {
    getTranslationResources() {
        const resources = {};
        // Get all loaded language resources from i18n
        const languages = _Pimcore_app_i18n__rspack_import_0["default"].languages ?? [];
        languages.forEach((language)=>{
            const resourceBundle = _Pimcore_app_i18n__rspack_import_0["default"].getResourceBundle(language, 'translation');
            if (!(0,lodash__rspack_import_1.isNil)(resourceBundle)) {
                resources[language] = resourceBundle;
            }
        });
        return resources;
    }
    getCurrentLanguage() {
        return _Pimcore_app_i18n__rspack_import_0["default"].language;
    }
    getFallbackLanguage() {
        const fallbackLng = _Pimcore_app_i18n__rspack_import_0["default"].options.fallbackLng;
        if (Array.isArray(fallbackLng)) {
            return fallbackLng[0] ?? 'en';
        }
        if ((0,_sdk_utils__rspack_import_2.isNonEmptyString)(fallbackLng)) {
            return fallbackLng;
        }
        if ((0,lodash__rspack_import_1.isPlainObject)(fallbackLng)) {
            var _fallbackMap_default;
            const fallbackMap = fallbackLng;
            return ((_fallbackMap_default = fallbackMap.default) === null || _fallbackMap_default === void 0 ? void 0 : _fallbackMap_default[0]) ?? 'en';
        }
        return 'en';
    }
    reportMissingTranslation(key) {
        // Trigger the same missing key handling as the main app
        // This will add the key to the missing translations store and handle debounced API calls
        _Pimcore_app_i18n__rspack_import_0["default"].emit('missingKey', [
            _Pimcore_app_i18n__rspack_import_0["default"].language
        ], 'translation', key, key);
    }
}
const i18nApi = new I18nApiImpl();

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/app/public-api/index.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Pimcore: () => (Pimcore),
  PimcoreStudio: () => (PimcoreStudio)
});
/* import */ var _depency_injection__rspack_import_0 = __webpack_require__("./js/src/core/app/depency-injection/index.ts");
/* import */ var _document_document_api__rspack_import_1 = __webpack_require__("./js/src/core/app/public-api/document/document-api.ts");
/* import */ var _i18n_i18n_api__rspack_import_2 = __webpack_require__("./js/src/core/app/public-api/i18n/i18n-api.ts");
/* import */ var _element_element_api__rspack_import_3 = __webpack_require__("./js/src/core/app/public-api/element/element-api.ts");
/* import */ var _modal_modal_api__rspack_import_4 = __webpack_require__("./js/src/core/app/public-api/modal/modal-api.ts");
/* import */ var _settings_settings_api__rspack_import_5 = __webpack_require__("./js/src/core/app/public-api/settings/settings-api.ts");
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





const Pimcore = {
    container: _depency_injection__rspack_import_0.container
};
const PimcoreStudio = {
    document: _document_document_api__rspack_import_1.documentApi,
    i18n: _i18n_i18n_api__rspack_import_2.i18nApi,
    element: _element_element_api__rspack_import_3.elementApi,
    modal: _modal_modal_api__rspack_import_4.modalApi,
    settings: _settings_settings_api__rspack_import_5.settingsApi
};

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/app/public-api/modal/modal-api.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  modalApi: () => (modalApi)
});
/* import */ var lodash__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_0);
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
let modalInstance = null;
class ModalApiImpl {
    setModalInstance(modal) {
        modalInstance = modal;
    }
    getModalInstance() {
        if ((0,lodash__rspack_import_0.isNull)(modalInstance)) {
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

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/app/public-api/settings/settings-api.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SettingsApi: () => (SettingsApi),
  settingsApi: () => (settingsApi)
});
/* import */ var _Pimcore_modules_app_settings_settings_slice__rspack_import_0 = __webpack_require__("./js/src/core/modules/app/settings/settings-slice.ts");
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
            return (0,_Pimcore_modules_app_settings_settings_slice__rspack_import_0.getSettings)(this.store.getState());
        } catch (error) {
            console.error('Failed to get settings from store:', error);
            return null;
        }
    }
    /**
   * Check if settings are available
   */ areSettingsAvailable() {
        return this.store !== null && (0,_Pimcore_modules_app_settings_settings_slice__rspack_import_0.getSettings)(this.store.getState()) !== null;
    }
    constructor(){
        this.store = null;
    }
}
const settingsApi = new SettingsApi();

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

}]);
//# sourceMappingURL=js_src_core_app_public-api_index_ts.js.map