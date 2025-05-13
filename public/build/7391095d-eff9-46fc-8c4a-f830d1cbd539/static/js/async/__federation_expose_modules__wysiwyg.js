"use strict";
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["__federation_expose_modules__wysiwyg"], {
"./js/src/core/modules/app/component-registry/component-registry.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ComponentRegistry: () => (ComponentRegistry),
  ComponentRenderer: () => (/* reexport safe */ _component_renderer__WEBPACK_IMPORTED_MODULE_5__.ComponentRenderer),
  ComponentType: () => (/* reexport safe */ _enums_component_type__WEBPACK_IMPORTED_MODULE_4__.ComponentType),
  componentConfig: () => (/* reexport safe */ _component_config__WEBPACK_IMPORTED_MODULE_2__.componentConfig),
  useComponentRegistry: () => (/* reexport safe */ _use_component_registry__WEBPACK_IMPORTED_MODULE_6__.useComponentRegistry)
});
/* ESM import */var _swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./node_modules/tslib/tslib.es6.mjs");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(inversify__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* ESM import */var _component_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/app/component-registry/component-config.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _enums_component_type__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/app/component-registry/enums/component-type.ts");
/* ESM import */var _component_renderer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/app/component-registry/component-renderer.tsx");
/* ESM import */var _use_component_registry__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/app/component-registry/use-component-registry.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 





const flattenConfig = (source)=>{
    const result = {};
    const flatten = (config)=>{
        for(const key in config){
            const value = config[key];
            // Check if it's a valid config entry by checking for the 'type' property
            if ((0,lodash__WEBPACK_IMPORTED_MODULE_3__.isObject)(value) && 'type' in value) {
                const entry = value;
                result[entry.name] = entry;
            } else if ((0,lodash__WEBPACK_IMPORTED_MODULE_3__.isObject)(value)) {
                // If it's an object but not a config entry, recurse
                flatten(value);
            }
        }
    };
    flatten(source);
    return result;
};
class ComponentRegistry {
    register(component) {
        const componentConfig = this.getComponentConfig(component.name);
        if (componentConfig.type !== _enums_component_type__WEBPACK_IMPORTED_MODULE_4__.ComponentType.SINGLE) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__.GeneralError(`Component "${component.name}" is not configured as a single component. Use registerToSlot instead.`));
        }
        if (this.has(component.name)) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__.GeneralError(`Component with the name "${component.name}" already exists. Use the override method to override it`));
        }
        this.registry[component.name] = component;
    }
    getAll() {
        return this.registry;
    }
    get(name) {
        if (!this.has(name)) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__.GeneralError(`No component with the name "${name}" found`));
        }
        return this.registry[name].component;
    }
    has(name) {
        return name in this.registry;
    }
    override(component) {
        if (!this.has(component.name)) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__.GeneralError(`No component named "${component.name}" found to override`));
        }
        this.registry[component.name] = component;
    }
    registerToSlot(slotName, component) {
        const componentConfig = this.getComponentConfig(slotName);
        if (componentConfig.type !== _enums_component_type__WEBPACK_IMPORTED_MODULE_4__.ComponentType.SLOT) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__.GeneralError(`Slot "${slotName}" is not configured as a slot component.`));
        }
        if ((0,lodash__WEBPACK_IMPORTED_MODULE_3__.isUndefined)(this.slots[slotName])) {
            this.slots[slotName] = [];
        }
        this.slots[slotName].push(component);
        this.slots[slotName].sort((a, b)=>(a.priority ?? 0) - (b.priority ?? 0));
    }
    getSlotComponents(slotName) {
        return this.slots[slotName] ?? [];
    }
    registerConfig(config) {
        const flattenedConfig = flattenConfig(config);
        Object.assign(this.configs, flattenedConfig);
    }
    getComponentConfig(name) {
        if ((0,lodash__WEBPACK_IMPORTED_MODULE_3__.isUndefined)(this.configs[name])) {
            throw new Error(`Component configuration for "${name}" not found.`);
        }
        return this.configs[name];
    }
    constructor(){
        this.registry = {};
        this.slots = {};
        this.configs = flattenConfig(_component_config__WEBPACK_IMPORTED_MODULE_2__.componentConfig) // Start with default config
        ;
    }
}
ComponentRegistry = (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_7__.__decorate)([
    (0,inversify__WEBPACK_IMPORTED_MODULE_0__.injectable)()
], ComponentRegistry);





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
"./js/src/core/modules/app/component-registry/component-renderer.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ComponentRenderer: () => (ComponentRenderer)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _component_registry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/app/component-registry/component-registry.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
var _s = $RefreshSig$();


const ComponentRenderer = (param)=>{
    let { component, props } = param;
    _s();
    const ComponentRegistry = (0,_component_registry__WEBPACK_IMPORTED_MODULE_2__.useComponentRegistry)();
    const Component = ComponentRegistry.get(component);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {
        ...props
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/component-registry/component-renderer.tsx",
        lineNumber: 26,
        columnNumber: 10
    }, undefined);
};
_s(ComponentRenderer, "8sP9/9s4DG03rMfNDBA34AR/NAo=", false, function() {
    return [
        _component_registry__WEBPACK_IMPORTED_MODULE_2__.useComponentRegistry
    ];
});
_c = ComponentRenderer;
var _c;
$RefreshReg$(_c, "ComponentRenderer");

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
"./js/src/core/modules/app/component-registry/use-component-registry.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useComponentRegistry: () => (useComponentRegistry)
});
/* ESM import */var _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/depency-injection/index.ts");
/* ESM import */var _Pimcore_app_config_services_service_ids__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/app/config/services/service-ids.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 

function useComponentRegistry() {
    return (0,_Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_0__.useInjection)(_Pimcore_app_config_services_service_ids__WEBPACK_IMPORTED_MODULE_1__.serviceIds["App/ComponentRegistry/ComponentRegistry"]);
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
"./js/src/core/modules/wysiwyg/interface/wysiwyg.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 

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
"./js/src/core/modules/wysiwyg/wysiwyg-editor.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  WysiwygEditor: () => (WysiwygEditor),
  "default": () => (__WEBPACK_DEFAULT_EXPORT__)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _app_component_registry_component_registry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/app/component-registry/component-registry.ts");
/* ESM import */var _Pimcore_components_drag_and_drop_hooks_use_droppable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/drag-and-drop/hooks/use-droppable.tsx");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/classnames/index.js");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
var _s = $RefreshSig$();




const WysiwygEditor = /*#__PURE__*/ _s((0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(_c = _s(function WysiwygEditor(props, ref) {
    _s();
    const { getStateClasses } = (0,_Pimcore_components_drag_and_drop_hooks_use_droppable__WEBPACK_IMPORTED_MODULE_3__.useDroppable)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{}, [
        props.editorProps
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_4___default()(...getStateClasses()),
        ref: ref,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_app_component_registry_component_registry__WEBPACK_IMPORTED_MODULE_2__.ComponentRenderer, {
            component: _app_component_registry_component_registry__WEBPACK_IMPORTED_MODULE_2__.componentConfig.wysiwyg.editor.name,
            props: {
                ...props.editorProps
            }
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/wysiwyg/wysiwyg-editor.tsx",
            lineNumber: 35,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/wysiwyg/wysiwyg-editor.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}, "gfEh9D7/NQrY/Lom5rbF4OQRYPM=", false, function() {
    return [
        _Pimcore_components_drag_and_drop_hooks_use_droppable__WEBPACK_IMPORTED_MODULE_3__.useDroppable
    ];
})), "gfEh9D7/NQrY/Lom5rbF4OQRYPM=", false, function() {
    return [
        _Pimcore_components_drag_and_drop_hooks_use_droppable__WEBPACK_IMPORTED_MODULE_3__.useDroppable
    ];
});
_c1 = WysiwygEditor;
WysiwygEditor.displayName = 'WysiwygEditor';
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WysiwygEditor);
var _c, _c1;
$RefreshReg$(_c, "WysiwygEditor$forwardRef");
$RefreshReg$(_c1, "WysiwygEditor");

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
"./js/src/core/modules/wysiwyg/wysiwyg.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Wysiwyg: () => (Wysiwyg),
  "default": () => (__WEBPACK_DEFAULT_EXPORT__)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_drag_and_drop_droppable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/drag-and-drop/droppable.tsx");
/* ESM import */var _element_utils_element_type__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/element/utils/element-type.ts");
/* ESM import */var _wysiwyg_editor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/wysiwyg/wysiwyg-editor.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
var _s = $RefreshSig$();




const Wysiwyg = (props)=>{
    _s();
    const wysiwygEditorRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_drag_and_drop_droppable__WEBPACK_IMPORTED_MODULE_2__.Droppable, {
        isValidContext: (info)=>props.disabled !== true && (0,_element_utils_element_type__WEBPACK_IMPORTED_MODULE_3__.isValidElementType)(info.type),
        isValidData: ()=>true,
        onDrop: (info)=>{
            var _wysiwygEditorRef_current_onDrop, _wysiwygEditorRef_current;
            (_wysiwygEditorRef_current = wysiwygEditorRef.current) === null || _wysiwygEditorRef_current === void 0 ? void 0 : (_wysiwygEditorRef_current_onDrop = _wysiwygEditorRef_current.onDrop) === null || _wysiwygEditorRef_current_onDrop === void 0 ? void 0 : _wysiwygEditorRef_current_onDrop.call(_wysiwygEditorRef_current, info);
        },
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_wysiwyg_editor__WEBPACK_IMPORTED_MODULE_4__["default"], {
            editorProps: {
                ...props,
                ref: wysiwygEditorRef
            }
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/wysiwyg/wysiwyg.tsx",
            lineNumber: 32,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/wysiwyg/wysiwyg.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, undefined);
};
_s(Wysiwyg, "OJU51pwww8Xeqoebc/Eltu6eHTs=");
_c = Wysiwyg;
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Wysiwyg);
var _c;
$RefreshReg$(_c, "Wysiwyg");

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
"./js/src/sdk/modules/wysiwyg/index.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Wysiwyg: () => (/* reexport safe */ _Pimcore_modules_wysiwyg_wysiwyg__WEBPACK_IMPORTED_MODULE_1__.Wysiwyg)
});
/* ESM import */var _Pimcore_modules_wysiwyg_interface_wysiwyg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/wysiwyg/interface/wysiwyg.ts");
/* ESM import */var _Pimcore_modules_wysiwyg_wysiwyg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/wysiwyg/wysiwyg.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 


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
//# sourceMappingURL=__federation_expose_modules__wysiwyg.js.map