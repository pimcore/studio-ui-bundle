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
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["__federation_expose_modules__widget_editor"], {
"./js/src/sdk/modules/widget-editor/index.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DynamicTypeWidgetTypeAbstract: () => (/* reexport safe */ _Pimcore_modules_widget_editor_dynmic_types_definitions_dynamic_type_widget_type_abstract__WEBPACK_IMPORTED_MODULE_0__.DynamicTypeWidgetTypeAbstract),
  DynamicTypeWidgetTypeRegistry: () => (/* reexport safe */ _Pimcore_modules_widget_editor_dynmic_types_registry_dynamic_type_widget_type_registry__WEBPACK_IMPORTED_MODULE_1__.DynamicTypeWidgetTypeRegistry)
});
/* ESM import */var _Pimcore_modules_widget_editor_dynmic_types_definitions_dynamic_type_widget_type_abstract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/widget-editor/dynmic-types/definitions/dynamic-type-widget-type-abstract.tsx");
/* ESM import */var _Pimcore_modules_widget_editor_dynmic_types_registry_dynamic_type_widget_type_registry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/widget-editor/dynmic-types/registry/dynamic-type-widget-type-registry.tsx");
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
"./js/src/core/modules/widget-editor/dynmic-types/definitions/dynamic-type-widget-type-abstract.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DynamicTypeWidgetTypeAbstract: () => (DynamicTypeWidgetTypeAbstract)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _sdk_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/sdk/components/index.ts");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(inversify__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _dec, _class;
function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[r] = t, e;
}
function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != typeof i) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 


let DynamicTypeWidgetTypeAbstract = (_dec = (0,inversify__WEBPACK_IMPORTED_MODULE_2__.injectable)(), _dec(_class = class DynamicTypeWidgetTypeAbstract {
    getSubMenuItems(configs, onWidgetClick) {
        return configs.map((config)=>{
            return {
                label: config.name,
                key: config.id,
                icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Icon, {
                    ...config.icon
                }, void 0, false, {
                    fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/widget-editor/dynmic-types/definitions/dynamic-type-widget-type-abstract.tsx",
                    lineNumber: 30,
                    columnNumber: 15
                }, this),
                onClick: onWidgetClick === undefined ? undefined : ()=>{
                    onWidgetClick(config);
                }
            };
        });
    }
    constructor(){
        _defineProperty(this, "id", void 0);
        _defineProperty(this, "name", void 0);
        _defineProperty(this, "group", void 0);
        _defineProperty(this, "icon", void 0);
    }
}) || _class);

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
"./js/src/core/modules/widget-editor/dynmic-types/registry/dynamic-type-widget-type-registry.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DynamicTypeWidgetTypeRegistry: () => (DynamicTypeWidgetTypeRegistry)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_modules_element_dynamic_types_registry_dynamic_type_registry_abstract__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/registry/dynamic-type-registry-abstract.tsx");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(inversify__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_5__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _dec, _class;
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 




let DynamicTypeWidgetTypeRegistry = (_dec = (0,inversify__WEBPACK_IMPORTED_MODULE_2__.injectable)(), _dec(_class = class DynamicTypeWidgetTypeRegistry extends _Pimcore_modules_element_dynamic_types_registry_dynamic_type_registry_abstract__WEBPACK_IMPORTED_MODULE_1__.DynamicTypeRegistryAbstract {
    getMenuItems(configs, onWidgetClick) {
        const widgetTypes = {};
        for (const dynamicType of this.getDynamicTypes()){
            widgetTypes[dynamicType.group] = widgetTypes[dynamicType.group] ?? [];
            widgetTypes[dynamicType.group].push(dynamicType);
        }
        return Object.entries(widgetTypes).map((param)=>{
            let [groupName, dynamicTypes] = param;
            return {
                key: groupName,
                label: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_i18next__WEBPACK_IMPORTED_MODULE_5__.Trans, {
                    children: `widget-editor.create-form.widgetTypeGroup.${groupName}`
                }, void 0, false, {
                    fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/widget-editor/dynmic-types/registry/dynamic-type-widget-type-registry.tsx",
                    lineNumber: 27,
                    columnNumber: 16
                }, this),
                type: 'group',
                children: dynamicTypes.map((dynamicType)=>({
                        label: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_i18next__WEBPACK_IMPORTED_MODULE_5__.Trans, {
                            children: `widget-editor.create-form.widgetType.${dynamicType.name}`
                        }, void 0, false, {
                            fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/widget-editor/dynmic-types/registry/dynamic-type-widget-type-registry.tsx",
                            lineNumber: 30,
                            columnNumber: 18
                        }, this),
                        key: dynamicType.id,
                        icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__.Icon, {
                            value: dynamicType.icon
                        }, void 0, false, {
                            fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/widget-editor/dynmic-types/registry/dynamic-type-widget-type-registry.tsx",
                            lineNumber: 32,
                            columnNumber: 17
                        }, this),
                        children: dynamicType.getSubMenuItems(configs.filter((config)=>config.widgetType === dynamicType.id), onWidgetClick)
                    }))
            };
        });
    }
}) || _class);

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
//# sourceMappingURL=__federation_expose_modules__widget_editor.js.map