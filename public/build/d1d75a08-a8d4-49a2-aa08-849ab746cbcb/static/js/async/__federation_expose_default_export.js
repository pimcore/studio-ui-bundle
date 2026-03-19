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
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["__federation_expose_default_export"], {
"./js/src/core/lib/event-bus/event-types.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  eventTypes: () => (eventTypes)
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
 * Event types constants for the application event bus
 *
 * Naming convention: module:scope:action
 * - module: The main module (e.g., widget-manager, asset, document)
 * - scope: The specific area within the module (e.g., inner, outer, tree)
 * - action: The action that occurred (e.g., widget-closed, item-selected)
 */ const eventTypes = {
    'widget-manager:inner:widget-closed': 'widget-manager:inner:widget-closed',
    'widget-manager:outer:widget-closed': 'widget-manager:outer:widget-closed',
    'data-object:editor:post-update': 'data-object:editor:post-update',
    'document:editor:post-update': 'document:editor:post-update',
    'asset:editor:post-update': 'asset:editor:post-update'
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
"./js/src/core/lib/event-bus/index.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  eventBus: () => (eventBus),
  eventTypes: () => (/* reexport safe */ _event_types__WEBPACK_IMPORTED_MODULE_1__.eventTypes)
});
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _event_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/lib/event-bus/event-types.ts");
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
class EventBus {
    subscribe(identifier, callback) {
        const newSubscriber = {
            identifier,
            callback
        };
        this.subscribers.push(newSubscriber);
        return newSubscriber;
    }
    unsubscribe(subscriber) {
        this.subscribers = this.subscribers.filter((sub)=>sub !== subscriber);
    }
    publish(event) {
        this.subscribers.forEach((subscriber)=>{
            const typeMatches = subscriber.identifier.type === event.identifier.type;
            const idMatches = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(subscriber.identifier.id) || subscriber.identifier.id === event.identifier.id;
            if (typeMatches && idMatches) {
                subscriber.callback(event);
            }
        });
    }
    constructor(){
        this.subscribers = [];
    }
}
const eventBus = new EventBus();


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
"./js/src/core/modules/widget-editor/services/widget-context-menu-item-registry.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ElementTreeWidgetPermissionRegistry: () => (ElementTreeWidgetPermissionRegistry)
});
/* ESM import */var _swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/tslib/tslib.es6.mjs");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(inversify__WEBPACK_IMPORTED_MODULE_0__);
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

class ElementTreeWidgetPermissionRegistry {
    registerItem(elementType, item) {
        const existingIndex = this.items[elementType].findIndex((existing)=>existing.key === item.key);
        if (existingIndex !== -1) {
            this.items[elementType][existingIndex] = item;
        } else {
            this.items[elementType].push(item);
        }
        this.items[elementType].sort((a, b)=>a.priority - b.priority);
    }
    getItems(elementType) {
        return this.items[elementType].map((item)=>item.key);
    }
    constructor(){
        this.items = {
            asset: [],
            'data-object': [],
            document: []
        };
    }
}
ElementTreeWidgetPermissionRegistry = (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,inversify__WEBPACK_IMPORTED_MODULE_0__.injectable)()
], ElementTreeWidgetPermissionRegistry);

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
"./js/src/sdk/main.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ElementTreeWidgetPermissionRegistry: () => (/* reexport safe */ _Pimcore_modules_widget_editor_services_widget_context_menu_item_registry__WEBPACK_IMPORTED_MODULE_1__.ElementTreeWidgetPermissionRegistry),
  Pimcore: () => (Pimcore),
  container: () => (container),
  eventBus: () => (/* reexport safe */ _Pimcore_lib_event_bus__WEBPACK_IMPORTED_MODULE_0__.eventBus),
  eventTypes: () => (/* reexport safe */ _Pimcore_lib_event_bus__WEBPACK_IMPORTED_MODULE_0__.eventTypes)
});
/* ESM import */var _Pimcore_lib_event_bus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/lib/event-bus/index.ts");
/* ESM import */var _Pimcore_modules_widget_editor_services_widget_context_menu_item_registry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/widget-editor/services/widget-context-menu-item-registry.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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
const Pimcore = window.Pimcore;
const container = window.Pimcore.container;



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
//# sourceMappingURL=__federation_expose_default_export.js.map