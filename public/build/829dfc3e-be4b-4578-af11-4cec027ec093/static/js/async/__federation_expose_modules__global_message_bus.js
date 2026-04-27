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
(self["chunk_pimcore_studio_ui_bundle "] = self["chunk_pimcore_studio_ui_bundle "] || []).push([["__federation_expose_modules__global_message_bus"], {
"./js/src/core/app/config/app-config.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  appConfig: () => (appConfig),
  currentDomain: () => (currentDomain)
});
/* import */ var _Pimcore_utils_iframe__rspack_import_0 = __webpack_require__("./js/src/core/utils/iframe.ts");
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
const appElement = (0,_Pimcore_utils_iframe__rspack_import_0.getParentDocument)().querySelector('#app');
const currentDomain = window.location.origin;
if (appElement === null) {
    console.warn('App element not found');
}
const appConfigJSON = (appElement === null || appElement === void 0 ? void 0 : appElement.getAttribute('data-app-config')) ?? null;
let appConfigData = null;
if (appConfigJSON !== null) {
    appConfigData = JSON.parse(appConfigJSON);
}
const appConfig = {
    baseUrl: (appConfigData === null || appConfigData === void 0 ? void 0 : appConfigData.baseUrl) ?? '/pimcore-studio/',
    mercureUrl: (appConfigData === null || appConfigData === void 0 ? void 0 : appConfigData.mercureUrl) ?? `${currentDomain}/.well-known/mercure`,
    wysiwyg: (appConfigData === null || appConfigData === void 0 ? void 0 : appConfigData.wysiwyg) ?? {
        defaultEditorConfig: {
            dataObject: {},
            document: {}
        }
    },
    ...appConfigData ?? {}
};

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/background-processor/process/global-message-bus-process.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  GlobalMessageBusProcess: () => (GlobalMessageBusProcess)
});
/* import */ var _swc_helpers_ts_decorate__rspack_import_3 = __webpack_require__("./node_modules/tslib/tslib.es6.mjs");
/* import */ var inversify__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* import */ var inversify__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(inversify__rspack_import_0);
/* import */ var _Pimcore_modules_background_processor_process_abstract_mercure_process__rspack_import_1 = __webpack_require__("./js/src/core/modules/background-processor/process/abstract-mercure-process.ts");
/* import */ var _Pimcore_app_config_services_service_ids__rspack_import_2 = __webpack_require__("./js/src/core/app/config/services/service-ids.ts");
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


class GlobalMessageBusProcess extends _Pimcore_modules_background_processor_process_abstract_mercure_process__rspack_import_1.AbstractMercureProcess {
    getTopics() {
        return this.messageBus.getRegisteredTopics();
    }
    sendMessage(message) {
        void this.messageBus.routeMessage(message);
    }
    constructor(messageBus){
        super(), this.messageBus = messageBus, this.name = 'global-message-bus-process', this.description = 'Global process for message bus handling operations';
    }
}
GlobalMessageBusProcess = (0,_swc_helpers_ts_decorate__rspack_import_3.__decorate)([
    (0,inversify__rspack_import_0.injectable)(),
    (0,_swc_helpers_ts_decorate__rspack_import_3.__param)(0, (0,inversify__rspack_import_0.inject)(_Pimcore_app_config_services_service_ids__rspack_import_2.serviceIds.globalMessageBus)),
    (0,_swc_helpers_ts_decorate__rspack_import_3.__metadata)("design:type", Function),
    (0,_swc_helpers_ts_decorate__rspack_import_3.__metadata)("design:paramtypes", [
        typeof GlobalMessageBus === "undefined" ? Object : GlobalMessageBus
    ])
], GlobalMessageBusProcess);

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/global-message-bus/services/global-message-bus.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  GlobalMessageBus: () => (GlobalMessageBus)
});
/* import */ var _swc_helpers_ts_decorate__rspack_import_3 = __webpack_require__("./node_modules/tslib/tslib.es6.mjs");
/* import */ var inversify__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* import */ var inversify__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(inversify__rspack_import_0);
/* import */ var _Pimcore_app_config_services_service_ids__rspack_import_1 = __webpack_require__("./js/src/core/app/config/services/service-ids.ts");
/* import */ var lodash__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_2);
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


class GlobalMessageBus {
    /**
   * Register topics that handlers can use
   * @throws Error if global subscription has already started
   */ registerTopics(topics) {
        if (!(0,lodash__rspack_import_2.isNil)(this.globalSubscriptionId)) {
            throw new Error('Cannot register new topics after global subscription has started. Topics must be registered in your module\'s onInit() method before the app starts.');
        }
        topics.forEach((topic)=>this.registeredTopics.add(topic));
    }
    getRegisteredTopics() {
        return Array.from(this.registeredTopics);
    }
    registerHandler(handler) {
        const handlerId = handler.getId();
        this.activeHandlers.set(handlerId, handler);
        if (!(0,lodash__rspack_import_2.isNil)(handler.onRegister)) {
            handler.onRegister();
        }
        void this.replayBufferedMessages(handler);
    }
    unregisterHandler(handlerId) {
        const handler = this.activeHandlers.get(handlerId);
        if (!(0,lodash__rspack_import_2.isNil)(handler === null || handler === void 0 ? void 0 : handler.onUnregister)) {
            handler.onUnregister();
        }
        this.activeHandlers.delete(handlerId);
    }
    startGlobalSubscription() {
        if (this.globalSubscriptionId !== null) {
            return;
        }
        try {
            this.globalSubscriptionId = this.backgroundProcessor.subscribeToProcessMessages({
                processName: 'global-message-bus-process',
                callback: (message)=>{
                    void this.routeMessage(message);
                }
            });
        } catch (error) {
            console.error('Failed to establish global subscription:', error);
        }
    }
    async routeMessage(mercureMessage) {
        const matchingHandlers = [];
        for (const handler of this.activeHandlers.values()){
            const shouldHandle = handler.shouldHandle(mercureMessage);
            if (shouldHandle) {
                matchingHandlers.push(handler);
            }
        }
        if (matchingHandlers.length === 0) {
            this.bufferMessage(mercureMessage);
            return;
        }
        for (const handler of matchingHandlers){
            try {
                await handler.handleMessage(mercureMessage);
            } catch (error) {
                console.error('GlobalMessageBus: Error processing message with handler', handler.getId(), error);
            }
        }
    }
    bufferMessage(mercureMessage) {
        if (this.messageBuffer.length >= this.MAX_BUFFER_SIZE) {
            console.warn('GlobalMessageBus: Message buffer full, removing oldest messages');
            this.messageBuffer.splice(0, this.messageBuffer.length - this.MAX_BUFFER_SIZE + 100); // Keep some headroom
        }
        this.messageBuffer.push({
            mercureMessage,
            timestamp: Date.now()
        });
        this.debouncedCleanup();
    }
    async replayBufferedMessages(handler) {
        const matchingMessages = [];
        for (const bufferedMsg of this.messageBuffer){
            const shouldHandle = handler.shouldHandle(bufferedMsg.mercureMessage);
            if (shouldHandle) {
                matchingMessages.push(bufferedMsg);
            }
        }
        if (matchingMessages.length > 0) {
            // Replay messages in chronological order
            matchingMessages.sort((a, b)=>a.timestamp - b.timestamp);
            for (const bufferedMsg of matchingMessages){
                try {
                    await handler.handleMessage(bufferedMsg.mercureMessage);
                } catch (error) {
                    console.error('GlobalMessageBus: Error replaying message for handler', handler.getId(), error);
                }
            }
            // Remove replayed messages from buffer
            this.messageBuffer = this.messageBuffer.filter((bufferedMsg)=>!matchingMessages.includes(bufferedMsg));
        }
    }
    cleanupExpiredMessages() {
        const now = Date.now();
        this.messageBuffer = this.messageBuffer.filter((bufferedMsg)=>now - bufferedMsg.timestamp < this.MESSAGE_BUFFER_TTL);
    }
    constructor(backgroundProcessor){
        this.backgroundProcessor = backgroundProcessor;
        this.activeHandlers = new Map();
        this.globalSubscriptionId = null;
        this.registeredTopics = new Set();
        // Message buffer for race condition prevention
        this.messageBuffer = [];
        this.MESSAGE_BUFFER_TTL = 30000; // 30 seconds
        this.MAX_BUFFER_SIZE = 1000; // Prevent memory leaks
        this.debouncedCleanup = (0,lodash__rspack_import_2.debounce)(()=>{
            this.cleanupExpiredMessages();
        }, 5000);
    }
}
GlobalMessageBus = (0,_swc_helpers_ts_decorate__rspack_import_3.__decorate)([
    (0,inversify__rspack_import_0.injectable)(),
    (0,_swc_helpers_ts_decorate__rspack_import_3.__param)(0, (0,inversify__rspack_import_0.inject)(_Pimcore_app_config_services_service_ids__rspack_import_1.serviceIds.backgroundProcessor)),
    (0,_swc_helpers_ts_decorate__rspack_import_3.__metadata)("design:type", Function),
    (0,_swc_helpers_ts_decorate__rspack_import_3.__metadata)("design:paramtypes", [
        typeof BackgroundProcessor === "undefined" ? Object : BackgroundProcessor
    ])
], GlobalMessageBus);

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/utils/iframe.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  getIframeOffset: () => (getIframeOffset),
  getParentDocument: () => (getParentDocument),
  isInIframe: () => (isInIframe)
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
const iframeCache = new Map();
/**
 * Checks if the current window is running inside an iframe
 * @returns true if running in an iframe, false otherwise
 */ const isInIframe = ()=>{
    try {
        return window.parent !== null && window.parent !== window;
    } catch (error) {
        // In case of cross-origin restrictions, assume we're in an iframe
        return true;
    }
};
const getIframeOffset = (view)=>{
    const viewDocument = view.document;
    if (viewDocument === window.parent.document) {
        return {
            x: 0,
            y: 0
        };
    }
    if (!iframeCache.has(viewDocument)) {
        const iframes = window.parent.document.querySelectorAll('iframe');
        const matchingIframe = Array.from(iframes).find((iframe)=>iframe.contentDocument === viewDocument);
        iframeCache.set(viewDocument, matchingIframe ?? null);
    }
    const cachedIframe = iframeCache.get(viewDocument);
    if (!(0,lodash__rspack_import_0.isNil)(cachedIframe)) {
        const iframeRect = cachedIframe.getBoundingClientRect();
        return {
            x: iframeRect.left,
            y: iframeRect.top
        };
    }
    return {
        x: 0,
        y: 0
    };
};
/**
 * Safely gets the parent document when running in an iframe
 * @returns The parent document if accessible, null otherwise
 */ const getParentDocument = ()=>{
    if (!isInIframe()) {
        return document;
    }
    try {
        return window.parent.document;
    } catch  {
        // Cross-origin restriction - parent document not accessible
        return document;
    }
};

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/sdk/modules/global-message-bus/index.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  AbstractMessageHandler: () => (/* reexport safe */ _Pimcore_modules_global_message_bus_message_handlers_abstract_message_handler__rspack_import_0.AbstractMessageHandler),
  GlobalMessageBus: () => (/* reexport safe */ _Pimcore_modules_global_message_bus_services_global_message_bus__rspack_import_1.GlobalMessageBus),
  GlobalMessageBusProcess: () => (/* reexport safe */ _Pimcore_modules_background_processor_process_global_message_bus_process__rspack_import_3.GlobalMessageBusProcess),
  useGlobalMessageBus: () => (/* reexport safe */ _Pimcore_modules_global_message_bus_hooks_use_global_message_bus__rspack_import_2.useGlobalMessageBus)
});
/* import */ var _Pimcore_modules_global_message_bus_message_handlers_abstract_message_handler__rspack_import_0 = __webpack_require__("./js/src/core/modules/global-message-bus/message-handlers/abstract-message-handler.ts");
/* import */ var _Pimcore_modules_global_message_bus_services_global_message_bus__rspack_import_1 = __webpack_require__("./js/src/core/modules/global-message-bus/services/global-message-bus.ts");
/* import */ var _Pimcore_modules_global_message_bus_hooks_use_global_message_bus__rspack_import_2 = __webpack_require__("./js/src/core/modules/global-message-bus/hooks/use-global-message-bus.ts");
/* import */ var _Pimcore_modules_background_processor_process_global_message_bus_process__rspack_import_3 = __webpack_require__("./js/src/core/modules/background-processor/process/global-message-bus-process.ts");
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

}]);
//# sourceMappingURL=__federation_expose_modules__global_message_bus.js.map