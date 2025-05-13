"use strict";
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["__federation_expose_modules__app"], {
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
"./js/src/core/modules/app/error-boundary/error-boundary.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__WEBPACK_DEFAULT_EXPORT__)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_3__);
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



class ErrorBoundary extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error
        };
    }
    componentDidCatch(error, errorInfo) {
        console.log('Error caught by ErrorBoundary:', error, errorInfo);
    }
    render() {
        const { children, fallback } = this.props;
        const { hasError, error } = this.state;
        if (hasError) {
            if (!(0,lodash__WEBPACK_IMPORTED_MODULE_2__.isEmpty)(fallback)) return fallback;
            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.Flex, {
                align: "center",
                gap: 10,
                justify: "center",
                style: {
                    position: 'absolute',
                    inset: 0
                },
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.Typography, {
                    children: (error === null || error === void 0 ? void 0 : error.message) ?? 'Something went wrong.'
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/error-boundary/error-boundary.tsx",
                    lineNumber: 60,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/error-boundary/error-boundary.tsx",
                lineNumber: 54,
                columnNumber: 9
            }, this);
        }
        return children;
    }
    constructor(props){
        super(props);
        this.state = {
            hasError: false,
            error: null
        };
    }
}
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ErrorBoundary);

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
"./js/src/core/modules/app/nav/hooks/use-main-nav.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useMainNav: () => (useMainNav)
});
/* ESM import */var _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/depency-injection/index.ts");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react_redux__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./node_modules/react-redux/dist/react-redux.mjs");
/* ESM import */var _Pimcore_app_config_services_service_ids__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/app/config/services/service-ids.ts");
/* ESM import */var _Pimcore_modules_auth_hooks_use_user__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/auth/hooks/use-user.ts");
/* ESM import */var _Pimcore_modules_auth_permission_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/auth/permission-helper.ts");
/* ESM import */var _Pimcore_modules_perspectives_permission_checker__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/perspectives/permission-checker.ts");
/* ESM import */var _Pimcore_modules_perspectives_active_perspective_slice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/perspectives/active-perspective-slice.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_7__);
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








const addNavItemToItemList = (items, item)=>{
    const levels = item.path.split('/');
    if (levels.length > 4) {
        console.warn('MainNav: Maximum depth of 4 levels is allowed, Item will be ignored', item);
        return;
    }
    let currentLevel = items;
    levels.forEach((level, index)=>{
        let existingItem = currentLevel.find((i)=>i.id === level);
        const isCurrentItem = index === levels.length - 1;
        if (existingItem === undefined) {
            existingItem = {
                order: isCurrentItem ? item.order : 100,
                id: level,
                label: item.label ?? level,
                path: levels.slice(0, index + 1).join('/'),
                children: [],
                icon: isCurrentItem ? item.icon : undefined,
                widgetConfig: isCurrentItem ? item.widgetConfig : undefined,
                onClick: isCurrentItem ? item.onClick : undefined,
                button: isCurrentItem ? item.button : undefined,
                className: isCurrentItem ? item.className : undefined,
                perspectivePermission: isCurrentItem ? item.perspectivePermission : undefined,
                perspectivePermissionHide: isCurrentItem ? item.perspectivePermissionHide : undefined
            };
            currentLevel.push(existingItem);
        } else if (index === levels.length - 1) {
            Object.assign(existingItem, {
                icon: item.icon,
                order: item.order ?? 100,
                className: item.className
            });
        }
        currentLevel = existingItem.children ?? [];
        currentLevel.sort((a, b)=>(a.order ?? 100) - (b.order ?? 100));
    });
    items.sort((a, b)=>(a.order ?? 100) - (b.order ?? 100));
};
const useMainNav = ()=>{
    const mainNavRegistryService = _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_0__.container.get(_Pimcore_app_config_services_service_ids__WEBPACK_IMPORTED_MODULE_2__.serviceIds.mainNavRegistry);
    const user = (0,_Pimcore_modules_auth_hooks_use_user__WEBPACK_IMPORTED_MODULE_3__.useUser)();
    const activePerspective = (0,react_redux__WEBPACK_IMPORTED_MODULE_8__.useSelector)(_Pimcore_modules_perspectives_active_perspective_slice__WEBPACK_IMPORTED_MODULE_6__.selectActivePerspective);
    const createNavItems = ()=>{
        const items = [];
        if ((0,lodash__WEBPACK_IMPORTED_MODULE_7__.isNil)(user) || (0,lodash__WEBPACK_IMPORTED_MODULE_7__.isNil)(activePerspective)) {
            return items;
        }
        mainNavRegistryService.getMainNavItems().forEach((item)=>{
            if (item.permission !== undefined && !(0,_Pimcore_modules_auth_permission_helper__WEBPACK_IMPORTED_MODULE_4__.isAllowed)(item.permission)) {
                return;
            }
            if (item.perspectivePermission !== undefined && !(0,_Pimcore_modules_perspectives_permission_checker__WEBPACK_IMPORTED_MODULE_5__.isAllowedInPerspective)(item.perspectivePermission)) {
                return;
            }
            addNavItemToItemList(items, item);
        });
        return items;
    };
    const navItems = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        return createNavItems();
    }, [
        mainNavRegistryService.getMainNavItems(),
        user,
        activePerspective
    ]);
    return {
        navItems
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
"./js/src/core/modules/app/nav/services/main-nav-registry.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  MainNavRegistry: () => (MainNavRegistry)
});
/* ESM import */var _swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/tslib/tslib.es6.mjs");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(inversify__WEBPACK_IMPORTED_MODULE_0__);
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

class MainNavRegistry {
    registerMainNavItem(item) {
        this.items.push(item);
    }
    getMainNavItem(path) {
        return this.items.find((item)=>item.path === path);
    }
    getMainNavItems() {
        return this.items;
    }
    constructor(){
        this.items = [];
    }
}
MainNavRegistry = (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,inversify__WEBPACK_IMPORTED_MODULE_0__.injectable)()
], MainNavRegistry);

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
"./js/src/core/modules/app/settings/hooks/use-settings.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useSettings: () => (useSettings)
});
/* ESM import */var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/react-redux/dist/react-redux.mjs");
/* ESM import */var _Pimcore_modules_app_settings_settings_slice__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/app/settings/settings-slice.ts");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
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


const useSettings = ()=>{
    const settings = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(_Pimcore_modules_app_settings_settings_slice__WEBPACK_IMPORTED_MODULE_0__.getSettings);
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>settings, [
        settings
    ]);
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
"./js/src/core/modules/app/settings/settings-slice.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  getSettings: () => (getSettings),
  setSettings: () => (setSettings)
});
/* ESM import */var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs");
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/store/index.ts");
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

const initialState = {};
const slice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__.createSlice)({
    name: 'settings',
    initialState,
    reducers: {
        setSettings: (state, param)=>{
            let { payload: { ...props } } = param;
            state.settings = props;
        }
    }
});
(0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.injectSliceWithState)(slice);
const { setSettings } = slice.actions;
const getSettings = (state)=>state.settings.settings;

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
"./js/src/core/modules/auth/permission-helper.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  isAllowed: () => (isAllowed)
});
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _Pimcore_modules_auth_user_user_slice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/auth/user/user-slice.ts");
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

const isAllowed = (permission)=>{
    const state = _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.store.getState();
    const user = (0,_Pimcore_modules_auth_user_user_slice__WEBPACK_IMPORTED_MODULE_1__.selectCurrentUser)(state);
    if (user.isAdmin) {
        return true;
    }
    return permission !== undefined && user.permissions.includes(permission);
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
"./js/src/core/modules/perspectives/permission-checker.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  isAllowedInPerspective: () => (isAllowedInPerspective)
});
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _active_perspective_slice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/perspectives/active-perspective-slice.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
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


const isAllowedInPerspective = (permission)=>{
    const activePerspective = (0,_active_perspective_slice__WEBPACK_IMPORTED_MODULE_1__.selectActivePerspective)(_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.store.getState());
    if ((0,lodash__WEBPACK_IMPORTED_MODULE_2__.isNil)(activePerspective)) {
        return false;
    }
    return isPathTrue(activePerspective.contextPermissions, permission);
};
const isPathTrue = (obj, path)=>{
    if ((0,lodash__WEBPACK_IMPORTED_MODULE_2__.isNil)(obj)) {
        return false;
    }
    const keys = path.split('.');
    let current = obj;
    for (const key of keys){
        if (typeof current === 'object' && key in current) {
            current = current[key];
        } else {
            return false;
        }
    }
    return current === true;
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
"./js/src/sdk/modules/app/index.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ApiError: () => (/* reexport safe */ _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_2__.ApiError),
  ComponentRegistry: () => (/* reexport safe */ _Pimcore_modules_app_component_registry_component_registry__WEBPACK_IMPORTED_MODULE_0__.ComponentRegistry),
  ComponentRenderer: () => (/* reexport safe */ _Pimcore_modules_app_component_registry_component_registry__WEBPACK_IMPORTED_MODULE_0__.ComponentRenderer),
  ComponentType: () => (/* reexport safe */ _Pimcore_modules_app_component_registry_component_registry__WEBPACK_IMPORTED_MODULE_0__.ComponentType),
  GeneralError: () => (/* reexport safe */ _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_2__.GeneralError),
  MainNavRegistry: () => (/* reexport safe */ _Pimcore_modules_app_nav_services_main_nav_registry__WEBPACK_IMPORTED_MODULE_4__.MainNavRegistry),
  componentConfig: () => (/* reexport safe */ _Pimcore_modules_app_component_registry_component_registry__WEBPACK_IMPORTED_MODULE_0__.componentConfig),
  trackError: () => (/* reexport safe */ _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_2__["default"]),
  useComponentRegistry: () => (/* reexport safe */ _Pimcore_modules_app_component_registry_component_registry__WEBPACK_IMPORTED_MODULE_0__.useComponentRegistry),
  useMainNav: () => (/* reexport safe */ _Pimcore_modules_app_nav_hooks_use_main_nav__WEBPACK_IMPORTED_MODULE_5__.useMainNav),
  useSettings: () => (/* reexport safe */ _Pimcore_modules_app_settings_hooks_use_settings__WEBPACK_IMPORTED_MODULE_3__.useSettings)
});
/* ESM import */var _Pimcore_modules_app_component_registry_component_registry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/app/component-registry/component-registry.ts");
/* ESM import */var _Pimcore_modules_app_error_boundary_error_boundary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/app/error-boundary/error-boundary.tsx");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* ESM import */var _Pimcore_modules_app_settings_hooks_use_settings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/app/settings/hooks/use-settings.ts");
/* ESM import */var _Pimcore_modules_app_nav_services_main_nav_registry__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/app/nav/services/main-nav-registry.ts");
/* ESM import */var _Pimcore_modules_app_nav_hooks_use_main_nav__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/app/nav/hooks/use-main-nav.ts");
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
//# sourceMappingURL=__federation_expose_modules__app.js.map