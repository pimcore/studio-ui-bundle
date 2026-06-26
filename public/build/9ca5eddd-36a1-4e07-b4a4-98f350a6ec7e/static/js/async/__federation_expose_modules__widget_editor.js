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
(self["chunk_pimcore_studio_ui_bundle "] = self["chunk_pimcore_studio_ui_bundle "] || []).push([["__federation_expose_modules__widget_editor"], {
"./js/src/sdk/modules/widget-editor/index.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DynamicTypeWidgetTypeAbstract: () => (/* reexport safe */ _Pimcore_modules_widget_editor_dynmic_types_definitions_dynamic_type_widget_type_abstract__rspack_import_0.DynamicTypeWidgetTypeAbstract),
  DynamicTypeWidgetTypeRegistry: () => (/* reexport safe */ _Pimcore_modules_widget_editor_dynmic_types_registry_dynamic_type_widget_type_registry__rspack_import_1.DynamicTypeWidgetTypeRegistry)
});
/* import */ var _Pimcore_modules_widget_editor_dynmic_types_definitions_dynamic_type_widget_type_abstract__rspack_import_0 = __webpack_require__("./js/src/core/modules/widget-editor/dynmic-types/definitions/dynamic-type-widget-type-abstract.tsx");
/* import */ var _Pimcore_modules_widget_editor_dynmic_types_registry_dynamic_type_widget_type_registry__rspack_import_1 = __webpack_require__("./js/src/core/modules/widget-editor/dynmic-types/registry/dynamic-type-widget-type-registry.tsx");
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
"./js/src/core/modules/widget-editor/dynmic-types/definitions/dynamic-type-widget-type-abstract.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DynamicTypeWidgetTypeAbstract: () => (DynamicTypeWidgetTypeAbstract)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var _sdk_components__rspack_import_1 = __webpack_require__("./js/src/sdk/components/index.ts");
/* import */ var inversify__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* import */ var inversify__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(inversify__rspack_import_2);
/* import */ var i18next__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/i18next/i18next");
/* import */ var i18next__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(i18next__rspack_import_3);
/* import */ var react__rspack_import_4 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_4_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_4);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

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



let DynamicTypeWidgetTypeAbstract = (_dec = (0,inversify__rspack_import_2.injectable)(), _dec(_class = class DynamicTypeWidgetTypeAbstract {
    getSubMenuItems(configs, onWidgetClick) {
        return configs.map((config)=>{
            return {
                label: (0,i18next__rspack_import_3.t)(config.name),
                key: config.id,
                icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_sdk_components__rspack_import_1.Icon, {
                    ...config.icon
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/widget-editor/dynmic-types/definitions/dynamic-type-widget-type-abstract.tsx",
                    lineNumber: 31,
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

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/widget-editor/dynmic-types/registry/dynamic-type-widget-type-registry.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DynamicTypeWidgetTypeRegistry: () => (DynamicTypeWidgetTypeRegistry)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var _Pimcore_modules_element_dynamic_types_registry_dynamic_type_registry_abstract__rspack_import_1 = __webpack_require__("./js/src/core/modules/element/dynamic-types/registry/dynamic-type-registry-abstract.tsx");
/* import */ var inversify__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* import */ var inversify__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(inversify__rspack_import_2);
/* import */ var _Pimcore_components_icon_icon__rspack_import_3 = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* import */ var react__rspack_import_4 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_4_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_4);
/* import */ var react_i18next__rspack_import_5 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_5_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_5);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

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




let DynamicTypeWidgetTypeRegistry = (_dec = (0,inversify__rspack_import_2.injectable)(), _dec(_class = class DynamicTypeWidgetTypeRegistry extends _Pimcore_modules_element_dynamic_types_registry_dynamic_type_registry_abstract__rspack_import_1.DynamicTypeRegistryAbstract {
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
                label: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(react_i18next__rspack_import_5.Trans, {
                    children: `widget-editor.create-form.widgetTypeGroup.${groupName}`
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/widget-editor/dynmic-types/registry/dynamic-type-widget-type-registry.tsx",
                    lineNumber: 27,
                    columnNumber: 16
                }, this),
                type: 'group',
                children: dynamicTypes.map((dynamicType)=>({
                        label: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(react_i18next__rspack_import_5.Trans, {
                            children: `widget-editor.create-form.widgetType.${dynamicType.name}`
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/widget-editor/dynmic-types/registry/dynamic-type-widget-type-registry.tsx",
                            lineNumber: 30,
                            columnNumber: 18
                        }, this),
                        key: dynamicType.id,
                        icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_icon__rspack_import_3.Icon, {
                            value: dynamicType.icon
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/widget-editor/dynmic-types/registry/dynamic-type-widget-type-registry.tsx",
                            lineNumber: 32,
                            columnNumber: 17
                        }, this),
                        children: dynamicType.getSubMenuItems(configs.filter((config)=>config.widgetType === dynamicType.id), onWidgetClick)
                    }))
            };
        });
    }
}) || _class);

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},

}]);
//# sourceMappingURL=__federation_expose_modules__widget_editor.js.map