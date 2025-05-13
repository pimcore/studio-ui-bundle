"use strict";
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["__federation_expose_modules__asset"], {
"./js/src/core/components/message/message.style.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyle: () => (useStyle)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/antd-style/es/functions/index.js");
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
const useStyle = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param)=>{
    let { token, css } = param;
    return {
        message: css`
      .ant-message-custom-content {
          font-family: Lato,serif;
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 22px;
      }
    `
    };
}, {
    hashPriority: 'low'
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
"./js/src/core/components/message/useMessage/index.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useMessage: () => (useMessage)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _Pimcore_components_message_message_style__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/message/message.style.tsx");
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




const useMessage = (messageConfig)=>{
    _s();
    const { message } = antd__WEBPACK_IMPORTED_MODULE_1__.App.useApp();
    const decoratedMessage = {
        ...message
    };
    const { styles } = (0,_Pimcore_components_message_message_style__WEBPACK_IMPORTED_MODULE_4__.useStyle)();
    decoratedMessage.info = (content, duration, onClose)=>{
        let config;
        if (content !== null && typeof content === 'object' && 'content' in content) {
            config = content;
        } else {
            config = {
                content
            };
        }
        config.icon = /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_2__.Icon, {
            options: {
                width: '16px',
                height: '16px'
            },
            value: 'info-circle'
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/message/useMessage/index.tsx",
            lineNumber: 42,
            columnNumber: 7
        }, undefined);
        return message.info(config, duration, onClose);
    };
    decoratedMessage.open = (config)=>{
        if (config.type === 'info') {
            return message.open({
                icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_2__.Icon, {
                    options: {
                        width: '16px',
                        height: '16px'
                    },
                    value: 'info-circle'
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/message/useMessage/index.tsx",
                    lineNumber: 58,
                    columnNumber: 15
                }, undefined),
                className: styles.message,
                ...config
            });
        }
        return message.open({
            className: styles.message,
            ...config
        });
    };
    return decoratedMessage;
};
_s(useMessage, "LVhaTfTnS0W9OyMe0BIEa/1VwjA=", false, function() {
    return [
        antd__WEBPACK_IMPORTED_MODULE_1__.App.useApp,
        _Pimcore_components_message_message_style__WEBPACK_IMPORTED_MODULE_4__.useStyle
    ];
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
"./js/src/core/modules/app/global-context/global-context-slice.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addGlobalContext: () => (addGlobalContext),
  removeGlobalContext: () => (removeGlobalContext),
  selectContextByType: () => (selectContextByType)
});
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs");
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

const initialState = [];
const globalContextSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__.createSlice)({
    name: 'global-context',
    initialState,
    reducers: {
        addGlobalContext: (state, action)=>{
            state.push(action.payload);
        },
        removeGlobalContext: (state, action)=>{
            return state.filter((context)=>context.type !== action.payload);
        }
    },
    selectors: {
        selectContextByType: (state, type)=>{
            return state.find((context)=>context.type === type);
        }
    }
});
(0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.injectSliceWithState)(globalContextSlice);
const { addGlobalContext, removeGlobalContext } = globalContextSlice.actions;
const { selectContextByType } = globalContextSlice.getSelectors((state)=>state['global-context']);

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
"./js/src/core/modules/asset/actions/upload-new-version/upload-new-version.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useUploadNewVersion: () => (useUploadNewVersion)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_modules_asset_asset_api_slice_gen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/asset/asset-api-slice.gen.ts");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var _Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/modal/form-modal/hooks/use-form-modal.tsx");
/* ESM import */var _Pimcore_components_message_useMessage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/message/useMessage/index.tsx");
/* ESM import */var _Pimcore_modules_element_hooks_use_cache_update__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/element/hooks/use-cache-update.ts");
/* ESM import */var _Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/element/permissions/permission-helper.ts");
/* ESM import */var _Pimcore_modules_element_tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/element/tree/provider/tree-permission-provider/use-tree-permission.ts");
/* ESM import */var _Pimcore_modules_perspectives_enums_tree_permission__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/perspectives/enums/tree-permission.ts");
/* ESM import */var _Pimcore_modules_element_actions__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/element/actions/index.ts");
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











const useUploadNewVersion = ()=>{
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)();
    const modal = (0,_Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_5__.useFormModal)();
    const messageApi = (0,_Pimcore_components_message_useMessage__WEBPACK_IMPORTED_MODULE_6__.useMessage)();
    const { updateFieldValue } = (0,_Pimcore_modules_element_hooks_use_cache_update__WEBPACK_IMPORTED_MODULE_7__.useCacheUpdate)('asset', [
        'ASSET_TREE'
    ]);
    const [replaceAsset] = (0,_Pimcore_modules_asset_asset_api_slice_gen__WEBPACK_IMPORTED_MODULE_1__.useAssetReplaceMutation)();
    const { isTreeActionAllowed } = (0,_Pimcore_modules_element_tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_9__.useTreePermission)();
    const uploadNewVersion = (id, accept, onFinish)=>{
        modal.upload({
            title: t('asset.upload'),
            label: t('asset.upload.label'),
            accept,
            rule: {
                required: true,
                message: t('element.rename.validation')
            },
            onOk: async (value)=>{
                const file = value[0];
                await uploadNewVersionMutation(id, file);
                onFinish === null || onFinish === void 0 ? void 0 : onFinish();
            }
        });
    };
    const uploadNewVersionMutation = async (id, file)=>{
        const formData = new FormData();
        formData.append('file', file);
        const replaceAssetTask = replaceAsset({
            id,
            body: formData
        });
        try {
            const response = await replaceAssetTask;
            if (response.error !== undefined) {
                throw new Error(response.error.data.error);
            }
            const data = response.data;
            updateFieldValue(id, 'filename', data.data);
        } catch (e) {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            messageApi.error({
                content: e.message
            });
        }
    };
    const uploadNewVersionContextMenuItem = (node, onFinish)=>{
        return {
            label: t('asset.tree.context-menu.upload-new-version'),
            key: _Pimcore_modules_element_actions__WEBPACK_IMPORTED_MODULE_11__.ContextMenuActionName.uploadNewVersion,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__.Icon, {
                value: 'upload-cloud'
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/actions/upload-new-version/upload-new-version.tsx",
                lineNumber: 94,
                columnNumber: 13
            }, undefined),
            hidden: node.type === 'folder' || !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_8__.checkElementPermission)(node.permissions, 'list') || !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_8__.checkElementPermission)(node.permissions, 'view') || !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_8__.checkElementPermission)(node.permissions, 'publish') || !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_8__.checkElementPermission)(node.permissions, 'versions'),
            onClick: ()=>{
                uploadNewVersion(node.id, node.mimeType, onFinish);
            }
        };
    };
    const uploadNewVersionTreeContextMenuItem = (node)=>{
        return {
            label: t('asset.tree.context-menu.upload-new-version'),
            key: _Pimcore_modules_element_actions__WEBPACK_IMPORTED_MODULE_11__.ContextMenuActionName.uploadNewVersion,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__.Icon, {
                value: 'upload-cloud'
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/actions/upload-new-version/upload-new-version.tsx",
                lineNumber: 114,
                columnNumber: 13
            }, undefined),
            hidden: !isTreeActionAllowed(_Pimcore_modules_perspectives_enums_tree_permission__WEBPACK_IMPORTED_MODULE_10__.TreePermission.UploadNewVersion) || node.type === 'folder' || !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_8__.checkElementPermission)(node.permissions, 'list') || !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_8__.checkElementPermission)(node.permissions, 'view') || !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_8__.checkElementPermission)(node.permissions, 'publish') || !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_8__.checkElementPermission)(node.permissions, 'versions'),
            onClick: ()=>{
                uploadNewVersion(parseInt(node.id), node.metaData.asset.mimeType);
            }
        };
    };
    return {
        uploadNewVersion,
        uploadNewVersionTreeContextMenuItem,
        uploadNewVersionContextMenuItem
    };
};
_s(useUploadNewVersion, "ysZw4w0l6RnF8vdwbm6+EuVESvI=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation,
        _Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_5__.useFormModal,
        _Pimcore_components_message_useMessage__WEBPACK_IMPORTED_MODULE_6__.useMessage,
        _Pimcore_modules_element_hooks_use_cache_update__WEBPACK_IMPORTED_MODULE_7__.useCacheUpdate,
        _Pimcore_modules_asset_asset_api_slice_gen__WEBPACK_IMPORTED_MODULE_1__.useAssetReplaceMutation,
        _Pimcore_modules_element_tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_9__.useTreePermission
    ];
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
"./js/src/core/modules/asset/editor/shared-tab-manager/tab-definitions.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TAB_CUSTOM_METADATA: () => (TAB_CUSTOM_METADATA),
  TAB_EMBEDDED_METADATA: () => (TAB_EMBEDDED_METADATA),
  TAB_VERSIONS: () => (TAB_VERSIONS)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_modules_app_component_registry_component_renderer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/app/component-registry/component-renderer.tsx");
/* ESM import */var _Pimcore_modules_app_component_registry_component_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/app/component-registry/component-config.ts");
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




const TAB_EMBEDDED_METADATA = {
    key: 'embedded-metadata',
    label: 'asset.asset-editor-tabs.embedded-metadata',
    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_app_component_registry_component_renderer__WEBPACK_IMPORTED_MODULE_3__.ComponentRenderer, {
        component: _Pimcore_modules_app_component_registry_component_config__WEBPACK_IMPORTED_MODULE_4__.componentConfig.asset.editor.tab.embeddedMetadata.name
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/shared-tab-manager/tab-definitions.tsx",
        lineNumber: 23,
        columnNumber: 13
    }, undefined),
    icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_1__.Icon, {
        value: 'embedded-metadata'
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/shared-tab-manager/tab-definitions.tsx",
        lineNumber: 24,
        columnNumber: 9
    }, undefined),
    isDetachable: true
};
const TAB_CUSTOM_METADATA = {
    key: 'custom-metadata',
    label: 'asset.asset-editor-tabs.custom-metadata',
    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_app_component_registry_component_renderer__WEBPACK_IMPORTED_MODULE_3__.ComponentRenderer, {
        component: _Pimcore_modules_app_component_registry_component_config__WEBPACK_IMPORTED_MODULE_4__.componentConfig.asset.editor.tab.customMetadata.name
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/shared-tab-manager/tab-definitions.tsx",
        lineNumber: 31,
        columnNumber: 13
    }, undefined),
    icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_1__.Icon, {
        value: 'custom-metadata'
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/shared-tab-manager/tab-definitions.tsx",
        lineNumber: 32,
        columnNumber: 9
    }, undefined),
    isDetachable: true
};
const TAB_VERSIONS = {
    key: 'versions',
    label: 'version.label',
    workspacePermission: 'versions',
    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_app_component_registry_component_renderer__WEBPACK_IMPORTED_MODULE_3__.ComponentRenderer, {
        component: _Pimcore_modules_app_component_registry_component_config__WEBPACK_IMPORTED_MODULE_4__.componentConfig.asset.editor.tab.versions.name
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/shared-tab-manager/tab-definitions.tsx",
        lineNumber: 40,
        columnNumber: 13
    }, undefined),
    icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_1__.Icon, {
        value: 'history'
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/shared-tab-manager/tab-definitions.tsx",
        lineNumber: 41,
        columnNumber: 9
    }, undefined),
    isDetachable: true
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
"./js/src/core/modules/asset/editor/shared-tab-manager/tabs/custom-metadata/metadata-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useAssetCustomMetadataGetByIdQuery: () => (useAssetCustomMetadataGetByIdQuery),
  useMetadataGetCollectionQuery: () => (useMetadataGetCollectionQuery)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Metadata"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            assetCustomMetadataGetById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/${queryArg.id}/custom-metadata`
                    }),
                providesTags: [
                    "Metadata"
                ]
            }),
            metadataGetCollection: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/metadata`,
                        method: "POST",
                        body: queryArg.body
                    }),
                providesTags: [
                    "Metadata"
                ]
            })
        }),
    overrideExisting: false
});

const { useAssetCustomMetadataGetByIdQuery, useMetadataGetCollectionQuery } = injectedRtkApi;

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
"./js/src/core/modules/asset/editor/shared-tab-manager/tabs/custom-metadata/settings-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useAssetCustomMetadataGetByIdQuery: () => (useAssetCustomMetadataGetByIdQuery)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Metadata"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            assetCustomMetadataGetById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/${queryArg.id}/custom-metadata`
                    }),
                providesTags: [
                    "Metadata"
                ]
            })
        }),
    overrideExisting: false
});

const { useAssetCustomMetadataGetByIdQuery } = injectedRtkApi;

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
"./js/src/core/modules/asset/editor/types/archive/tab-manager/archive-tab-manager.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ArchiveTabManager: () => (ArchiveTabManager)
});
/* ESM import */var _Pimcore_modules_element_editor_tab_manager_tab_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/element/editor/tab-manager/tab-manager.ts");
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
class ArchiveTabManager extends _Pimcore_modules_element_editor_tab_manager_tab_manager__WEBPACK_IMPORTED_MODULE_0__.TabManager {
    constructor(){
        super();
        this.type = 'archive';
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
"./js/src/core/modules/asset/editor/types/audio/tab-manager/audio-tab-manager.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  AudioTabManager: () => (AudioTabManager)
});
/* ESM import */var _Pimcore_modules_element_editor_tab_manager_tab_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/element/editor/tab-manager/tab-manager.ts");
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
class AudioTabManager extends _Pimcore_modules_element_editor_tab_manager_tab_manager__WEBPACK_IMPORTED_MODULE_0__.TabManager {
    constructor(){
        super();
        this.type = 'audio';
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
"./js/src/core/modules/asset/editor/types/document/tab-manager/document-tab-manager.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DocumentTabManager: () => (DocumentTabManager)
});
/* ESM import */var _swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/tslib/tslib.es6.mjs");
/* ESM import */var _Pimcore_modules_element_editor_tab_manager_tab_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/element/editor/tab-manager/tab-manager.ts");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(inversify__WEBPACK_IMPORTED_MODULE_1__);
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



class DocumentTabManager extends _Pimcore_modules_element_editor_tab_manager_tab_manager__WEBPACK_IMPORTED_MODULE_0__.TabManager {
    constructor(){
        super();
        this.type = 'document';
    }
}
DocumentTabManager = (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.injectable)(),
    (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:type", Function),
    (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:paramtypes", [])
], DocumentTabManager);

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
"./js/src/core/modules/asset/editor/types/folder/tab-manager/folder-tab-manager.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  FolderTabManager: () => (FolderTabManager)
});
/* ESM import */var _swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/tslib/tslib.es6.mjs");
/* ESM import */var _Pimcore_modules_element_editor_tab_manager_tab_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/element/editor/tab-manager/tab-manager.ts");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(inversify__WEBPACK_IMPORTED_MODULE_1__);
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



class FolderTabManager extends _Pimcore_modules_element_editor_tab_manager_tab_manager__WEBPACK_IMPORTED_MODULE_0__.TabManager {
    constructor(){
        super();
        this.type = 'folder';
    }
}
FolderTabManager = (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.injectable)(),
    (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:type", Function),
    (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:paramtypes", [])
], FolderTabManager);

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
"./js/src/core/modules/asset/editor/types/image/tab-manager/image-tab-manager.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ImageTabManager: () => (ImageTabManager)
});
/* ESM import */var _swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/tslib/tslib.es6.mjs");
/* ESM import */var _Pimcore_modules_element_editor_tab_manager_tab_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/element/editor/tab-manager/tab-manager.ts");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(inversify__WEBPACK_IMPORTED_MODULE_1__);
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



class ImageTabManager extends _Pimcore_modules_element_editor_tab_manager_tab_manager__WEBPACK_IMPORTED_MODULE_0__.TabManager {
    constructor(){
        super();
        this.type = 'image';
    }
}
ImageTabManager = (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.injectable)(),
    (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:type", Function),
    (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:paramtypes", [])
], ImageTabManager);

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
"./js/src/core/modules/asset/editor/types/text/tab-manager/text-tab-manager.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TextTabManager: () => (TextTabManager)
});
/* ESM import */var _swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/tslib/tslib.es6.mjs");
/* ESM import */var _Pimcore_modules_element_editor_tab_manager_tab_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/element/editor/tab-manager/tab-manager.ts");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(inversify__WEBPACK_IMPORTED_MODULE_1__);
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



class TextTabManager extends _Pimcore_modules_element_editor_tab_manager_tab_manager__WEBPACK_IMPORTED_MODULE_0__.TabManager {
    constructor(){
        super();
        this.type = 'text';
    }
}
TextTabManager = (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.injectable)(),
    (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:type", Function),
    (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:paramtypes", [])
], TextTabManager);

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
"./js/src/core/modules/asset/editor/types/unknown/tab-manager/unknown-tab-manager.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  UnknownTabManager: () => (UnknownTabManager)
});
/* ESM import */var _Pimcore_modules_element_editor_tab_manager_tab_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/element/editor/tab-manager/tab-manager.ts");
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
class UnknownTabManager extends _Pimcore_modules_element_editor_tab_manager_tab_manager__WEBPACK_IMPORTED_MODULE_0__.TabManager {
    constructor(){
        super();
        this.type = 'unknown';
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
"./js/src/core/modules/asset/editor/types/video/tab-manager/video-tab-manager.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  VideoTabManager: () => (VideoTabManager)
});
/* ESM import */var _Pimcore_modules_element_editor_tab_manager_tab_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/element/editor/tab-manager/tab-manager.ts");
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
class VideoTabManager extends _Pimcore_modules_element_editor_tab_manager_tab_manager__WEBPACK_IMPORTED_MODULE_0__.TabManager {
    constructor(){
        super();
        this.type = 'video';
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
"./js/src/core/modules/asset/hooks/use-asset-helper.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useAssetHelper: () => (useAssetHelper)
});
/* ESM import */var _Pimcore_modules_widget_manager_hooks_use_widget_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/widget-manager/hooks/use-widget-manager.ts");
/* ESM import */var _asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/asset/asset-api-slice-enhanced.ts");
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/app/api/pimcore/tags.ts");
/* ESM import */var _Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/element/permissions/permission-helper.ts");
/* ESM import */var _Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/element/element-helper.ts");
/* ESM import */var _Pimcore_modules_widget_manager_utils_tools__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/widget-manager/utils/tools.tsx");
/* ESM import */var _use_asset_draft_fetcher__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/asset/hooks/use-asset-draft-fetcher.ts");
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







const useAssetHelper = ()=>{
    const { openMainWidget, isMainWidgetOpen } = (0,_Pimcore_modules_widget_manager_hooks_use_widget_manager__WEBPACK_IMPORTED_MODULE_0__.useWidgetManager)();
    const dispatch = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_2__.useAppDispatch)();
    const { updateAssetDraft } = (0,_use_asset_draft_fetcher__WEBPACK_IMPORTED_MODULE_7__.useAssetDraftFetcher)();
    const openAsset = async (props)=>{
        const { config } = props;
        const widgetId = (0,_Pimcore_modules_widget_manager_utils_tools__WEBPACK_IMPORTED_MODULE_6__.getWidgetId)('asset', config.id);
        if (!isMainWidgetOpen(widgetId)) {
            dispatch(_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__.api.util.invalidateTags(_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_3__.invalidatingTags.ASSET_DETAIL_ID(config.id)));
            void updateAssetDraft(config.id, true);
        }
        const { data } = await _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_2__.store.dispatch(_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__.api.endpoints.assetGetById.initiate({
            id: config.id
        }));
        if (data === undefined || !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_4__.checkElementPermission)(data.permissions, 'view')) {
            return;
        }
        openMainWidget({
            name: data === null || data === void 0 ? void 0 : data.filename,
            id: widgetId,
            component: 'asset-editor',
            config: {
                ...config,
                icon: (0,_Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_5__.getElementIcon)(data, {
                    value: 'widget',
                    type: 'name'
                })
            }
        });
    };
    return {
        openAsset
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
"./js/src/core/modules/asset/hooks/use-asset.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useAsset: () => (useAsset)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _asset_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/asset/asset-provider.tsx");
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

const useAsset = ()=>{
    const { id } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_asset_provider__WEBPACK_IMPORTED_MODULE_1__.AssetContext);
    return {
        id
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
"./js/src/core/modules/asset/hooks/use-global-asset-context.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useGlobalAssetContext: () => (useGlobalAssetContext)
});
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _Pimcore_modules_app_global_context_global_context_slice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/app/global-context/global-context-slice.ts");
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

const useGlobalAssetContext = ()=>{
    const disptach = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.useAppDispatch)();
    const context = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.useAppSelector)((state)=>(0,_Pimcore_modules_app_global_context_global_context_slice__WEBPACK_IMPORTED_MODULE_1__.selectContextByType)(state, 'asset'));
    const setContext = function(config) {
        disptach((0,_Pimcore_modules_app_global_context_global_context_slice__WEBPACK_IMPORTED_MODULE_1__.addGlobalContext)({
            type: 'asset',
            config
        }));
    };
    const removeContext = function() {
        disptach((0,_Pimcore_modules_app_global_context_global_context_slice__WEBPACK_IMPORTED_MODULE_1__.removeGlobalContext)('asset'));
    };
    return {
        context,
        setContext,
        removeContext
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
"./js/src/core/modules/element/editor/tab-manager/tab-manager.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TabManager: () => (TabManager)
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

class TabManager {
    getTabs() {
        return this.tabs;
    }
    getTab(key) {
        return this.tabs.find((tab)=>tab.key === key);
    }
    register(tab) {
        if (this.getTab(tab.key) !== undefined) {
            this.tabs.splice(this.tabs.findIndex((t)=>t.key === tab.key), 1, tab);
            return;
        }
        this.tabs.push(tab);
    }
    constructor(){
        this.type = '';
        this.tabs = [];
    }
}
TabManager = (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,inversify__WEBPACK_IMPORTED_MODULE_0__.injectable)()
], TabManager);

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
"./js/src/sdk/modules/asset/index.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ArchiveTabManager: () => (/* reexport safe */ _Pimcore_modules_asset_editor_types_archive_tab_manager_archive_tab_manager__WEBPACK_IMPORTED_MODULE_9__.ArchiveTabManager),
  AssetApiSlice: () => (/* reexport module object */ _Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_21__),
  AssetContext: () => (/* reexport safe */ _Pimcore_modules_asset_asset_provider__WEBPACK_IMPORTED_MODULE_23__.AssetContext),
  AssetProvider: () => (/* reexport safe */ _Pimcore_modules_asset_asset_provider__WEBPACK_IMPORTED_MODULE_23__.AssetProvider),
  AudioTabManager: () => (/* reexport safe */ _Pimcore_modules_asset_editor_types_audio_tab_manager_audio_tab_manager__WEBPACK_IMPORTED_MODULE_10__.AudioTabManager),
  DocumentTabManager: () => (/* reexport safe */ _Pimcore_modules_asset_editor_types_document_tab_manager_document_tab_manager__WEBPACK_IMPORTED_MODULE_11__.DocumentTabManager),
  FolderTabManager: () => (/* reexport safe */ _Pimcore_modules_asset_editor_types_folder_tab_manager_folder_tab_manager__WEBPACK_IMPORTED_MODULE_12__.FolderTabManager),
  ImageTabManager: () => (/* reexport safe */ _Pimcore_modules_asset_editor_types_image_tab_manager_image_tab_manager__WEBPACK_IMPORTED_MODULE_13__.ImageTabManager),
  MetadataApiSlice: () => (/* reexport module object */ _Pimcore_modules_asset_editor_shared_tab_manager_tabs_custom_metadata_metadata_api_slice_gen__WEBPACK_IMPORTED_MODULE_7__),
  SettingsApiSlice: () => (/* reexport module object */ _Pimcore_modules_asset_editor_shared_tab_manager_tabs_custom_metadata_settings_slice_gen__WEBPACK_IMPORTED_MODULE_8__),
  TAB_CUSTOM_METADATA: () => (/* reexport safe */ _Pimcore_modules_asset_editor_shared_tab_manager_tab_definitions__WEBPACK_IMPORTED_MODULE_6__.TAB_CUSTOM_METADATA),
  TAB_EMBEDDED_METADATA: () => (/* reexport safe */ _Pimcore_modules_asset_editor_shared_tab_manager_tab_definitions__WEBPACK_IMPORTED_MODULE_6__.TAB_EMBEDDED_METADATA),
  TAB_VERSIONS: () => (/* reexport safe */ _Pimcore_modules_asset_editor_shared_tab_manager_tab_definitions__WEBPACK_IMPORTED_MODULE_6__.TAB_VERSIONS),
  TextTabManager: () => (/* reexport safe */ _Pimcore_modules_asset_editor_types_text_tab_manager_text_tab_manager__WEBPACK_IMPORTED_MODULE_14__.TextTabManager),
  UnknownTabManager: () => (/* reexport safe */ _Pimcore_modules_asset_editor_types_unknown_tab_manager_unknown_tab_manager__WEBPACK_IMPORTED_MODULE_15__.UnknownTabManager),
  VideoTabManager: () => (/* reexport safe */ _Pimcore_modules_asset_editor_types_video_tab_manager_video_tab_manager__WEBPACK_IMPORTED_MODULE_16__.VideoTabManager),
  addCustomMetadataToAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_22__.addCustomMetadataToAsset),
  addImageSettingsToAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_22__.addImageSettingsToAsset),
  addPropertyToAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_22__.addPropertyToAsset),
  addScheduleToAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_22__.addScheduleToAsset),
  assetReceived: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_22__.assetReceived),
  assetsAdapter: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_22__.assetsAdapter),
  removeAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_22__.removeAsset),
  removeCustomMetadataFromAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_22__.removeCustomMetadataFromAsset),
  removeCustomSettingsFromAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_22__.removeCustomSettingsFromAsset),
  removeImageSettingFromAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_22__.removeImageSettingFromAsset),
  removePropertyFromAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_22__.removePropertyFromAsset),
  removeScheduleFromAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_22__.removeScheduleFromAsset),
  resetAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_22__.resetAsset),
  resetChanges: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_22__.resetChanges),
  resetSchedulesChangesForAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_22__.resetSchedulesChangesForAsset),
  selectAssetById: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_22__.selectAssetById),
  setActiveTabForAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_22__.setActiveTabForAsset),
  setCustomMetadataForAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_22__.setCustomMetadataForAsset),
  setCustomSettingsForAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_22__.setCustomSettingsForAsset),
  setModifiedCells: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_22__.setModifiedCells),
  setPropertiesForAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_22__.setPropertiesForAsset),
  setSchedulesForAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_22__.setSchedulesForAsset),
  slice: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_22__.slice),
  updateAllCustomMetadataForAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_22__.updateAllCustomMetadataForAsset),
  updateCustomMetadataForAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_22__.updateCustomMetadataForAsset),
  updateImageSettingForAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_22__.updateImageSettingForAsset),
  updatePropertyForAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_22__.updatePropertyForAsset),
  updateScheduleForAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_22__.updateScheduleForAsset),
  updateTextDataForAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_22__.updateTextDataForAsset),
  useAsset: () => (/* reexport safe */ _Pimcore_modules_asset_hooks_use_asset__WEBPACK_IMPORTED_MODULE_17__.useAsset),
  useAssetDraft: () => (/* reexport safe */ _Pimcore_modules_asset_hooks_use_asset_draft__WEBPACK_IMPORTED_MODULE_18__.useAssetDraft),
  useAssetHelper: () => (/* reexport safe */ _Pimcore_modules_asset_hooks_use_asset_helper__WEBPACK_IMPORTED_MODULE_19__.useAssetHelper),
  useClearThumbnails: () => (/* reexport safe */ _Pimcore_modules_asset_actions_clear_thumbnails_use_clear_thumbnails__WEBPACK_IMPORTED_MODULE_0__.useClearThumbnails),
  useCustomMetadataDraft: () => (/* reexport safe */ _Pimcore_modules_asset_draft_hooks_use_custom_metadata__WEBPACK_IMPORTED_MODULE_4__.useCustomMetadataDraft),
  useCustomMetadataReducers: () => (/* reexport safe */ _Pimcore_modules_asset_draft_hooks_use_custom_metadata__WEBPACK_IMPORTED_MODULE_4__.useCustomMetadataReducers),
  useDownload: () => (/* reexport safe */ _Pimcore_modules_asset_actions_download_use_download__WEBPACK_IMPORTED_MODULE_1__.useDownload),
  useGlobalAssetContext: () => (/* reexport safe */ _Pimcore_modules_asset_hooks_use_global_asset_context__WEBPACK_IMPORTED_MODULE_20__.useGlobalAssetContext),
  useImageSettingsDraft: () => (/* reexport safe */ _Pimcore_modules_asset_draft_hooks_use_image_settings__WEBPACK_IMPORTED_MODULE_5__.useImageSettingsDraft),
  useImageSettingsReducers: () => (/* reexport safe */ _Pimcore_modules_asset_draft_hooks_use_image_settings__WEBPACK_IMPORTED_MODULE_5__.useImageSettingsReducers),
  useUploadNewVersion: () => (/* reexport safe */ _Pimcore_modules_asset_actions_upload_new_version_upload_new_version__WEBPACK_IMPORTED_MODULE_2__.useUploadNewVersion),
  useZipDownload: () => (/* reexport safe */ _Pimcore_modules_asset_actions_zip_download_use_zip_download__WEBPACK_IMPORTED_MODULE_3__.useZipDownload)
});
/* ESM import */var _Pimcore_modules_asset_actions_clear_thumbnails_use_clear_thumbnails__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/asset/actions/clear-thumbnails/use-clear-thumbnails.tsx");
/* ESM import */var _Pimcore_modules_asset_actions_download_use_download__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/asset/actions/download/use-download.tsx");
/* ESM import */var _Pimcore_modules_asset_actions_upload_new_version_upload_new_version__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/asset/actions/upload-new-version/upload-new-version.tsx");
/* ESM import */var _Pimcore_modules_asset_actions_zip_download_use_zip_download__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/asset/actions/zip-download/use-zip-download.tsx");
/* ESM import */var _Pimcore_modules_asset_draft_hooks_use_custom_metadata__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/asset/draft/hooks/use-custom-metadata.ts");
/* ESM import */var _Pimcore_modules_asset_draft_hooks_use_image_settings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/asset/draft/hooks/use-image-settings.ts");
/* ESM import */var _Pimcore_modules_asset_editor_shared_tab_manager_tab_definitions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/asset/editor/shared-tab-manager/tab-definitions.tsx");
/* ESM import */var _Pimcore_modules_asset_editor_shared_tab_manager_tabs_custom_metadata_metadata_api_slice_gen__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/asset/editor/shared-tab-manager/tabs/custom-metadata/metadata-api-slice.gen.ts");
/* ESM import */var _Pimcore_modules_asset_editor_shared_tab_manager_tabs_custom_metadata_settings_slice_gen__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/asset/editor/shared-tab-manager/tabs/custom-metadata/settings-slice.gen.ts");
/* ESM import */var _Pimcore_modules_asset_editor_types_archive_tab_manager_archive_tab_manager__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/asset/editor/types/archive/tab-manager/archive-tab-manager.ts");
/* ESM import */var _Pimcore_modules_asset_editor_types_audio_tab_manager_audio_tab_manager__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/asset/editor/types/audio/tab-manager/audio-tab-manager.ts");
/* ESM import */var _Pimcore_modules_asset_editor_types_document_tab_manager_document_tab_manager__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/asset/editor/types/document/tab-manager/document-tab-manager.ts");
/* ESM import */var _Pimcore_modules_asset_editor_types_folder_tab_manager_folder_tab_manager__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/asset/editor/types/folder/tab-manager/folder-tab-manager.ts");
/* ESM import */var _Pimcore_modules_asset_editor_types_image_tab_manager_image_tab_manager__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/modules/asset/editor/types/image/tab-manager/image-tab-manager.ts");
/* ESM import */var _Pimcore_modules_asset_editor_types_text_tab_manager_text_tab_manager__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/modules/asset/editor/types/text/tab-manager/text-tab-manager.ts");
/* ESM import */var _Pimcore_modules_asset_editor_types_unknown_tab_manager_unknown_tab_manager__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./js/src/core/modules/asset/editor/types/unknown/tab-manager/unknown-tab-manager.ts");
/* ESM import */var _Pimcore_modules_asset_editor_types_video_tab_manager_video_tab_manager__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("./js/src/core/modules/asset/editor/types/video/tab-manager/video-tab-manager.ts");
/* ESM import */var _Pimcore_modules_asset_hooks_use_asset__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("./js/src/core/modules/asset/hooks/use-asset.ts");
/* ESM import */var _Pimcore_modules_asset_hooks_use_asset_draft__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("./js/src/core/modules/asset/hooks/use-asset-draft.ts");
/* ESM import */var _Pimcore_modules_asset_hooks_use_asset_helper__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__("./js/src/core/modules/asset/hooks/use-asset-helper.ts");
/* ESM import */var _Pimcore_modules_asset_hooks_use_global_asset_context__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__("./js/src/core/modules/asset/hooks/use-global-asset-context.ts");
/* ESM import */var _Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__("./js/src/core/modules/asset/asset-api-slice-enhanced.ts");
/* ESM import */var _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__("./js/src/core/modules/asset/asset-draft-slice.tsx");
/* ESM import */var _Pimcore_modules_asset_asset_provider__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__("./js/src/core/modules/asset/asset-provider.tsx");
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








// @todo is this really the right location for settings?



















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
//# sourceMappingURL=__federation_expose_modules__asset.js.map