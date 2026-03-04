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
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["__federation_expose_modules__field_definitions"], {
"./js/src/core/modules/field-definitions/components/editor/items/sidebar.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyles: () => (useStyles)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/antd-style/antd-style");
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd_style__WEBPACK_IMPORTED_MODULE_0__);
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
const useStyles = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param)=>{
    let { css } = param;
    return {
        tree: css`
      .ant-tree-treenode {
        height: 24px;
      }
    `
    };
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
"./js/src/core/modules/field-definitions/dynamic-types/utils/reserved-words.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  isReservedWord: () => (isReservedWord)
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
 */ const RESERVED_WORDS = new Set([
    'id',
    'key',
    'path',
    'type',
    'index',
    'classname',
    'creationdate',
    'userowner',
    'value',
    'class',
    'list',
    'fullpath',
    'childs',
    'children',
    'values',
    'cachetag',
    'cachetags',
    'parent',
    'published',
    'valuefromparent',
    'userpermissions',
    'dependencies',
    'modificationdate',
    'usermodification',
    'byid',
    'bypath',
    'data',
    'versions',
    'properties',
    'permissions',
    'permissionsforuser',
    'childamount',
    'apipluginbroker',
    'resource',
    'parentclass',
    'definition',
    'locked',
    'language'
]);
const isReservedWord = (word)=>{
    return RESERVED_WORDS.has(word.toLowerCase());
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
"./js/src/core/modules/field-definitions/utils/global-clipboard.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  globalFieldDefinitionClipboard: () => (globalFieldDefinitionClipboard),
  useGlobalFieldDefinitionClipboard: () => (useGlobalFieldDefinitionClipboard)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
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
// Module-level singleton — shared across all React widget trees
let copiedLayout;
const listeners = new Set();
const notifyListeners = ()=>{
    listeners.forEach((fn)=>{
        fn();
    });
};
const globalFieldDefinitionClipboard = {
    get: ()=>copiedLayout,
    set: (layout)=>{
        copiedLayout = layout;
        notifyListeners();
    },
    clear: ()=>{
        copiedLayout = undefined;
        notifyListeners();
    },
    subscribe: (fn)=>{
        listeners.add(fn);
        return ()=>{
            listeners.delete(fn);
        };
    }
};
const useGlobalFieldDefinitionClipboard = ()=>{
    const [, rerender] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useReducer)((x)=>x + 1, 0);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        return globalFieldDefinitionClipboard.subscribe(rerender);
    }, []);
    return {
        copiedLayout: globalFieldDefinitionClipboard.get(),
        setCopiedLayout: globalFieldDefinitionClipboard.set,
        clearClipboard: globalFieldDefinitionClipboard.clear
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
"./js/src/sdk/modules/field-definitions/index.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  AreaContext: () => (/* reexport safe */ _Pimcore_modules_field_definitions_components_editor_area_provider__WEBPACK_IMPORTED_MODULE_7__.AreaContext),
  AreaProvider: () => (/* reexport safe */ _Pimcore_modules_field_definitions_components_editor_area_provider__WEBPACK_IMPORTED_MODULE_7__.AreaProvider),
  DynamicTypeFieldDefinitionAbstract: () => (/* reexport safe */ _Pimcore_modules_field_definitions_dynamic_types_dynamic_type_field_definition_abstract__WEBPACK_IMPORTED_MODULE_2__.DynamicTypeFieldDefinitionAbstract),
  DynamicTypeFieldDefinitionDataAbstract: () => (/* reexport safe */ _Pimcore_modules_field_definitions_dynamic_types_types_data_abstracts_dynamic_type_field_defintion_data_abstract__WEBPACK_IMPORTED_MODULE_4__.DynamicTypeFieldDefinitionDataAbstract),
  DynamicTypeFieldDefinitionLayoutAbstract: () => (/* reexport safe */ _Pimcore_modules_field_definitions_dynamic_types_types_layout_abstracts_dynamic_type_field_defintion_layout_abstract__WEBPACK_IMPORTED_MODULE_5__.DynamicTypeFieldDefinitionLayoutAbstract),
  DynamicTypeFieldDefinitionRegistry: () => (/* reexport safe */ _Pimcore_modules_field_definitions_dynamic_types_dynamic_type_field_definition_registry__WEBPACK_IMPORTED_MODULE_3__.DynamicTypeFieldDefinitionRegistry),
  Editor: () => (/* reexport safe */ _Pimcore_modules_field_definitions_components_editor__WEBPACK_IMPORTED_MODULE_6__.Editor),
  GeneralSettingsContext: () => (/* reexport safe */ _Pimcore_modules_field_definitions_components_editor_items_detail_general_settings_provider__WEBPACK_IMPORTED_MODULE_11__.GeneralSettingsContext),
  GeneralSettingsProvider: () => (/* reexport safe */ _Pimcore_modules_field_definitions_components_editor_items_detail_general_settings_provider__WEBPACK_IMPORTED_MODULE_11__.GeneralSettingsProvider),
  ItemsContext: () => (/* reexport safe */ _Pimcore_modules_field_definitions_components_editor_items_provider__WEBPACK_IMPORTED_MODULE_9__.ItemsContext),
  ItemsProvider: () => (/* reexport safe */ _Pimcore_modules_field_definitions_components_editor_items_provider__WEBPACK_IMPORTED_MODULE_9__.ItemsProvider),
  LayoutProvider: () => (/* reexport safe */ _Pimcore_modules_field_definitions_components_editor_items_detail_layout_provider__WEBPACK_IMPORTED_MODULE_10__.LayoutProvider),
  SettingsContext: () => (/* reexport safe */ _Pimcore_modules_field_definitions_components_editor_settings_provider__WEBPACK_IMPORTED_MODULE_8__.SettingsContext),
  SettingsProvider: () => (/* reexport safe */ _Pimcore_modules_field_definitions_components_editor_settings_provider__WEBPACK_IMPORTED_MODULE_8__.SettingsProvider),
  buildPathMap: () => (/* reexport safe */ _Pimcore_modules_field_definitions_utils_layout_helpers__WEBPACK_IMPORTED_MODULE_0__.buildPathMap),
  buildTree: () => (/* reexport safe */ _Pimcore_modules_field_definitions_utils_layout_helpers__WEBPACK_IMPORTED_MODULE_0__.buildTree),
  create: () => (/* reexport safe */ _Pimcore_modules_field_definitions_utils_layout_provider_factory__WEBPACK_IMPORTED_MODULE_1__.create),
  getNamesInNamespace: () => (/* reexport safe */ _Pimcore_modules_field_definitions_utils_layout_helpers__WEBPACK_IMPORTED_MODULE_0__.getNamesInNamespace),
  reduce: () => (/* reexport safe */ _Pimcore_modules_field_definitions_utils_layout_helpers__WEBPACK_IMPORTED_MODULE_0__.reduce),
  useArea: () => (/* reexport safe */ _Pimcore_modules_field_definitions_components_editor_area_provider__WEBPACK_IMPORTED_MODULE_7__.useArea),
  useGeneralSettings: () => (/* reexport safe */ _Pimcore_modules_field_definitions_components_editor_items_detail_general_settings_provider__WEBPACK_IMPORTED_MODULE_11__.useGeneralSettings),
  useItems: () => (/* reexport safe */ _Pimcore_modules_field_definitions_components_editor_items_provider__WEBPACK_IMPORTED_MODULE_9__.useItems),
  useLayout: () => (/* reexport safe */ _Pimcore_modules_field_definitions_components_editor_items_detail_layout_provider__WEBPACK_IMPORTED_MODULE_10__.useLayout),
  useSettings: () => (/* reexport safe */ _Pimcore_modules_field_definitions_components_editor_settings_provider__WEBPACK_IMPORTED_MODULE_8__.useSettings)
});
/* ESM import */var _Pimcore_modules_field_definitions_utils_layout_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/field-definitions/utils/layout-helpers.tsx");
/* ESM import */var _Pimcore_modules_field_definitions_utils_layout_provider_factory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/field-definitions/utils/layout-provider-factory.tsx");
/* ESM import */var _Pimcore_modules_field_definitions_dynamic_types_dynamic_type_field_definition_abstract__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/field-definitions/dynamic-types/dynamic-type-field-definition-abstract.tsx");
/* ESM import */var _Pimcore_modules_field_definitions_dynamic_types_dynamic_type_field_definition_registry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/field-definitions/dynamic-types/dynamic-type-field-definition-registry.tsx");
/* ESM import */var _Pimcore_modules_field_definitions_dynamic_types_types_data_abstracts_dynamic_type_field_defintion_data_abstract__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/field-definitions/dynamic-types/types/data/_abstracts/dynamic-type-field-defintion-data-abstract.tsx");
/* ESM import */var _Pimcore_modules_field_definitions_dynamic_types_types_layout_abstracts_dynamic_type_field_defintion_layout_abstract__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/field-definitions/dynamic-types/types/layout/_abstracts/dynamic-type-field-defintion-layout-abstract.tsx");
/* ESM import */var _Pimcore_modules_field_definitions_components_editor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/field-definitions/components/editor.tsx");
/* ESM import */var _Pimcore_modules_field_definitions_components_editor_area_provider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/field-definitions/components/editor/area-provider.tsx");
/* ESM import */var _Pimcore_modules_field_definitions_components_editor_settings_provider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/field-definitions/components/editor/settings-provider.tsx");
/* ESM import */var _Pimcore_modules_field_definitions_components_editor_items_provider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/field-definitions/components/editor/items/provider.tsx");
/* ESM import */var _Pimcore_modules_field_definitions_components_editor_items_detail_layout_provider__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/field-definitions/components/editor/items/detail/layout-provider.tsx");
/* ESM import */var _Pimcore_modules_field_definitions_components_editor_items_detail_general_settings_provider__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/field-definitions/components/editor/items/detail/general-settings-provider.tsx");
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
"./js/src/core/components/modal/factory/modal-factory.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  create: () => (create)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _sdk_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/sdk/components/index.ts");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
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


const create = (props)=>{
    var _s = $RefreshSig$(), _s1 = $RefreshSig$(), _s2 = $RefreshSig$();
    const { defaultProps = {} } = props ?? {};
    const ModalContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_2__.createContext)(undefined);
    const ModalProvider = (providerProps)=>{
        _s();
        const { children, onOpenChange, ...rest } = providerProps;
        const props = {
            ...defaultProps,
            ...rest
        };
        const [open, setOpen] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(props.open ?? false);
        const openModal = ()=>{
            setOpen(true);
            onOpenChange === null || onOpenChange === void 0 ? void 0 : onOpenChange(true);
        };
        const closeModal = ()=>{
            setOpen(false);
            onOpenChange === null || onOpenChange === void 0 ? void 0 : onOpenChange(false);
        };
        (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
            if ((props.open ?? false) !== open) {
                setOpen(props.open ?? false);
            }
        }, [
            props.open
        ]);
        return (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(ModalContext.Provider, {
                value: {
                    ...props,
                    open,
                    openModal,
                    closeModal
                },
                children: children
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/components/modal/factory/modal-factory.tsx",
                lineNumber: 42,
                columnNumber: 26
            }, undefined), [
            props,
            open
        ]);
    };
    _s(ModalProvider, "/XNYmKXkvwpEVOT4k2Kt9dkNy74=");
    const useModal = ()=>{
        _s1();
        const context = (0,react__WEBPACK_IMPORTED_MODULE_2__.useContext)(ModalContext);
        if (context === undefined) {
            throw new Error('useModal must be used within a ModalProvider');
        }
        return context;
    };
    _s1(useModal, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
    const Modal = (props)=>{
        _s2();
        const { closeModal, openModal, ...modalProps } = useModal();
        /* eslint-disable @typescript-eslint/consistent-type-assertions */ const finalModalProps = {
            ...defaultProps,
            ...modalProps,
            ...props
        };
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Modal, {
            ...finalModalProps,
            onCancel: closeModal
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/components/modal/factory/modal-factory.tsx",
            lineNumber: 70,
            columnNumber: 12
        }, undefined);
    };
    _s2(Modal, "FcilUDfzT9manq/0/oK5I8gmH5c=", false, function() {
        return [
            useModal
        ];
    });
    return {
        context: ModalContext,
        Modal,
        Provider: ModalProvider,
        useModal
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
"./js/src/core/modules/field-definitions/components/editor.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Editor: () => (Editor)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_modules_field_definitions_components_editor_area_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/field-definitions/components/editor/area-provider.tsx");
/* ESM import */var _Pimcore_modules_field_definitions_components_editor_items_provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/field-definitions/components/editor/items/provider.tsx");
/* ESM import */var _Pimcore_modules_field_definitions_components_editor_settings_provider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/field-definitions/components/editor/settings-provider.tsx");
/* ESM import */var _Pimcore_modules_field_definitions_components_editor_view__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/field-definitions/components/editor/view.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
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





const Editor = (props)=>{
    const { area, view = /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_field_definitions_components_editor_view__WEBPACK_IMPORTED_MODULE_4__.EditorView, {}, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor.tsx",
        lineNumber: 19,
        columnNumber: 12
    }, undefined), ...rest } = props;
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_field_definitions_components_editor_area_provider__WEBPACK_IMPORTED_MODULE_1__.AreaProvider, {
        area: area,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_field_definitions_components_editor_settings_provider__WEBPACK_IMPORTED_MODULE_3__.SettingsProvider, {
            ...rest,
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_field_definitions_components_editor_items_provider__WEBPACK_IMPORTED_MODULE_2__.ItemsProvider, {
                children: view
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor.tsx",
                lineNumber: 24,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor.tsx",
            lineNumber: 23,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor.tsx",
        lineNumber: 22,
        columnNumber: 10
    }, undefined);
};
_c = Editor;
var _c;
$RefreshReg$(_c, "Editor");

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
"./js/src/core/modules/field-definitions/components/editor/area-provider.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  AreaContext: () => (AreaContext),
  AreaProvider: () => (AreaProvider),
  useArea: () => (useArea)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
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
var _s = $RefreshSig$(), _s1 = $RefreshSig$();

const AreaContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(undefined);
const AreaProvider = (props)=>{
    _s();
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AreaContext.Provider, {
            value: {
                area: props.area
            },
            children: props.children
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/area-provider.tsx",
            lineNumber: 14,
            columnNumber: 24
        }, undefined), [
        props.area,
        props.children
    ]);
};
_s(AreaProvider, "nwk+m61qLgjDVUp4IGV/072DDN4=");
_c = AreaProvider;
const useArea = ()=>{
    _s1();
    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(AreaContext);
    if (context === undefined) {
        throw new Error('useArea must be used within an AreaProvider');
    }
    return context;
};
_s1(useArea, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
$RefreshReg$(_c, "AreaProvider");

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
"./js/src/core/modules/field-definitions/components/editor/custom-layout/current-configuration-provider.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  CurrentConfigurationContext: () => (CurrentConfigurationContext),
  CurrentConfigurationProvider: () => (CurrentConfigurationProvider),
  useCurrentConfiguration: () => (useCurrentConfiguration)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
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
var _s = $RefreshSig$(), _s1 = $RefreshSig$();

const CurrentConfigurationContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(undefined);
const CurrentConfigurationProvider = (props)=>{
    _s();
    const { configuration, children } = props;
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(CurrentConfigurationContext.Provider, {
            value: {
                configuration
            },
            children: children
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/custom-layout/current-configuration-provider.tsx",
            lineNumber: 18,
            columnNumber: 24
        }, undefined), [
        configuration,
        children
    ]);
};
_s(CurrentConfigurationProvider, "nwk+m61qLgjDVUp4IGV/072DDN4=");
_c = CurrentConfigurationProvider;
const useCurrentConfiguration = ()=>{
    _s1();
    const context = react__WEBPACK_IMPORTED_MODULE_1___default().useContext(CurrentConfigurationContext);
    if (context === undefined) {
        throw new Error('useCurrentConfiguration must be used within a CurrentConfigurationProvider');
    }
    return context;
};
_s1(useCurrentConfiguration, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
$RefreshReg$(_c, "CurrentConfigurationProvider");

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
"./js/src/core/modules/field-definitions/components/editor/custom-layout/custom-layout-modal-trigger.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  CustomLayoutModalTrigger: () => (CustomLayoutModalTrigger)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_modules_field_definitions_components_editor_custom_layout_custom_layout_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/field-definitions/components/editor/custom-layout/custom-layout-modal.tsx");
/* ESM import */var _sdk_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/sdk/components/index.ts");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_4__);
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
var _s = $RefreshSig$();




const CustomLayoutModalTrigger = ()=>{
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation)();
    const { openModal } = (0,_Pimcore_modules_field_definitions_components_editor_custom_layout_custom_layout_modal__WEBPACK_IMPORTED_MODULE_1__.useCustomLayoutModal)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_2__.IconTextButton, {
        icon: {
            value: 'new-something'
        },
        onClick: openModal,
        type: "link",
        children: t('field-definitions.custom-layouts')
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/custom-layout/custom-layout-modal-trigger.tsx",
        lineNumber: 22,
        columnNumber: 10
    }, undefined);
};
_s(CustomLayoutModalTrigger, "gm+p4gkGiNPy5lxgNgtiuARwPKk=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation,
        _Pimcore_modules_field_definitions_components_editor_custom_layout_custom_layout_modal__WEBPACK_IMPORTED_MODULE_1__.useCustomLayoutModal
    ];
});
_c = CustomLayoutModalTrigger;
var _c;
$RefreshReg$(_c, "CustomLayoutModalTrigger");

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
"./js/src/core/modules/field-definitions/components/editor/custom-layout/custom-layout-modal.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  CustomLayoutModal: () => (CustomLayoutModal),
  CustomLayoutModalProvider: () => (CustomLayoutModalProvider),
  useCustomLayoutModal: () => (useCustomLayoutModal)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_components_modal_factory_modal_factory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/modal/factory/modal-factory.tsx");
/* ESM import */var _Pimcore_modules_field_definitions_components_editor_settings_provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/field-definitions/components/editor/settings-provider.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_4__);
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
var _s = $RefreshSig$();




const { Modal: ModalTemplate, Provider: CustomLayoutModalProvider, useModal: useCustomLayoutModal } = (0,_Pimcore_components_modal_factory_modal_factory__WEBPACK_IMPORTED_MODULE_1__.create)({
    defaultProps: {
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}, void 0, false),
        size: 'XXL',
        footer: null
    }
});

const CustomLayoutModal = ()=>{
    var _settings_customLayouts;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation)();
    const settings = (0,_Pimcore_modules_field_definitions_components_editor_settings_provider__WEBPACK_IMPORTED_MODULE_2__.useSettings)();
    const { open } = useCustomLayoutModal();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: open && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(ModalTemplate, {
            title: t('field-definitions.custom-layouts'),
            children: (_settings_customLayouts = settings.customLayouts) === null || _settings_customLayouts === void 0 ? void 0 : _settings_customLayouts.ModalContent
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/custom-layout/custom-layout-modal.tsx",
            lineNumber: 36,
            columnNumber: 16
        }, undefined)
    }, void 0, false);
};
_s(CustomLayoutModal, "k47QC0cjqVD1PHHCWrpSuRKKsa4=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation,
        _Pimcore_modules_field_definitions_components_editor_settings_provider__WEBPACK_IMPORTED_MODULE_2__.useSettings,
        useCustomLayoutModal
    ];
});
_c = CustomLayoutModal;
var _c;
$RefreshReg$(_c, "CustomLayoutModal");

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
"./js/src/core/modules/field-definitions/components/editor/custom-layout/custom-layout.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  CustomLayout: () => (CustomLayout)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_modules_field_definitions_components_editor_custom_layout_current_configuration_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/field-definitions/components/editor/custom-layout/current-configuration-provider.tsx");
/* ESM import */var _Pimcore_modules_field_definitions_components_editor_custom_layout_custom_layout_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/field-definitions/components/editor/custom-layout/custom-layout-modal.tsx");
/* ESM import */var _Pimcore_modules_field_definitions_components_editor_custom_layout_custom_layout_modal_trigger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/field-definitions/components/editor/custom-layout/custom-layout-modal-trigger.tsx");
/* ESM import */var _Pimcore_modules_field_definitions_components_editor_items_provider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/field-definitions/components/editor/items/provider.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
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
var _s = $RefreshSig$();





const CustomLayout = ()=>{
    _s();
    const { activeConfiguration } = (0,_Pimcore_modules_field_definitions_components_editor_items_provider__WEBPACK_IMPORTED_MODULE_4__.useItems)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_field_definitions_components_editor_custom_layout_current_configuration_provider__WEBPACK_IMPORTED_MODULE_1__.CurrentConfigurationProvider, {
        configuration: activeConfiguration,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_field_definitions_components_editor_custom_layout_custom_layout_modal__WEBPACK_IMPORTED_MODULE_2__.CustomLayoutModalProvider, {
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_field_definitions_components_editor_custom_layout_custom_layout_modal__WEBPACK_IMPORTED_MODULE_2__.CustomLayoutModal, {}, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/custom-layout/custom-layout.tsx",
                    lineNumber: 22,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_field_definitions_components_editor_custom_layout_custom_layout_modal_trigger__WEBPACK_IMPORTED_MODULE_3__.CustomLayoutModalTrigger, {}, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/custom-layout/custom-layout.tsx",
                    lineNumber: 23,
                    columnNumber: 9
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/custom-layout/custom-layout.tsx",
            lineNumber: 21,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/custom-layout/custom-layout.tsx",
        lineNumber: 20,
        columnNumber: 10
    }, undefined);
};
_s(CustomLayout, "HowMWCnJwmGsZG9fyznSSTpt2Yo=", false, function() {
    return [
        _Pimcore_modules_field_definitions_components_editor_items_provider__WEBPACK_IMPORTED_MODULE_4__.useItems
    ];
});
_c = CustomLayout;
var _c;
$RefreshReg$(_c, "CustomLayout");

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
"./js/src/core/modules/field-definitions/components/editor/items/detail.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ItemDetail: () => (ItemDetail)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_modules_field_definitions_components_editor_custom_layout_custom_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/field-definitions/components/editor/custom-layout/custom-layout.tsx");
/* ESM import */var _Pimcore_modules_field_definitions_components_editor_items_detail_content__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/field-definitions/components/editor/items/detail/content.tsx");
/* ESM import */var _Pimcore_modules_field_definitions_components_editor_items_detail_general_settings_provider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/field-definitions/components/editor/items/detail/general-settings-provider.tsx");
/* ESM import */var _Pimcore_modules_field_definitions_components_editor_items_detail_save__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/field-definitions/components/editor/items/detail/save.tsx");
/* ESM import */var _Pimcore_modules_field_definitions_components_editor_items_detail_sidebar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/field-definitions/components/editor/items/detail/sidebar.tsx");
/* ESM import */var _Pimcore_modules_field_definitions_components_editor_items_detail_import_export_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/field-definitions/components/editor/items/detail/import-export-actions.tsx");
/* ESM import */var _Pimcore_modules_field_definitions_components_editor_items_provider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/field-definitions/components/editor/items/provider.tsx");
/* ESM import */var _Pimcore_modules_field_definitions_components_editor_settings_provider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/field-definitions/components/editor/settings-provider.tsx");
/* ESM import */var _sdk_components__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/sdk/components/index.ts");
/* ESM import */var _sdk_modules_app__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/sdk/modules/app/index.ts");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_11__);
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
var _s = $RefreshSig$();











const ItemDetail = (props)=>{
    _s();
    const { useDetailGeneralSettingsQuery, useDetailLayoutQuery, useDetailLayoutAccessor, customLayouts, LayoutProvider } = (0,_Pimcore_modules_field_definitions_components_editor_settings_provider__WEBPACK_IMPORTED_MODULE_8__.useSettings)();
    const { setDetailView } = (0,_Pimcore_modules_field_definitions_components_editor_items_provider__WEBPACK_IMPORTED_MODULE_7__.useItems)();
    const layoutResult = useDetailLayoutQuery === null || useDetailLayoutQuery === void 0 ? void 0 : useDetailLayoutQuery({
        id: props.configuration.id
    });
    const layoutError = layoutResult === null || layoutResult === void 0 ? void 0 : layoutResult.error;
    const layoutAccessor = useDetailLayoutAccessor === null || useDetailLayoutAccessor === void 0 ? void 0 : useDetailLayoutAccessor();
    const detailResult = useDetailGeneralSettingsQuery({
        id: props.configuration.id
    });
    const { isLoading: isDetailLoading, isFetching: isDetailFetching, refetch: refetchDetail, data: detailData } = detailResult;
    const detailError = detailResult.error;
    const [layout, setLayout] = (0,react__WEBPACK_IMPORTED_MODULE_11__.useState)(layoutResult === null || layoutResult === void 0 ? void 0 : layoutResult.data);
    const [layoutKey, setLayoutKey] = (0,react__WEBPACK_IMPORTED_MODULE_11__.useState)(0);
    (0,react__WEBPACK_IMPORTED_MODULE_11__.useEffect)(()=>{
        setLayout(layoutResult === null || layoutResult === void 0 ? void 0 : layoutResult.data);
    }, [
        layoutResult === null || layoutResult === void 0 ? void 0 : layoutResult.data
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_11__.useEffect)(()=>{
        if (layoutAccessor !== undefined && detailData !== undefined) {
            const accessedLayout = layoutAccessor.accessor(detailData);
            setLayout(accessedLayout);
        }
    }, [
        detailData,
        layoutAccessor
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_11__.useEffect)(()=>{
        // @todo check this with backend team why 404 is returned for missing layouts
        if (layoutError !== undefined && 'status' in layoutError && layoutError.status === 404) {
            setLayout({
                name: 'pimcore_root',
                children: [],
                fieldType: 'panel',
                // @todo
                // @ts-expect-error remove when backend provides the right typo
                fieldtype: 'panel',
                bodyStyle: '',
                border: false,
                collapsible: false,
                title: '',
                dataType: 'layout',
                collapsed: false,
                height: 0,
                width: 0,
                icon: {
                    type: 'name',
                    value: 'none'
                },
                labelAlign: 'left',
                labelWidth: 100,
                layout: null,
                locked: false,
                region: '',
                type: 'layout',
                additionalAttributes: {}
            });
            return;
        }
        if (layoutError !== undefined) {
            (0,_sdk_modules_app__WEBPACK_IMPORTED_MODULE_10__.trackError)(new _sdk_modules_app__WEBPACK_IMPORTED_MODULE_10__.ApiError(layoutError));
        }
    }, [
        layoutError
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_11__.useEffect)(()=>{
        if (detailError !== undefined) {
            (0,_sdk_modules_app__WEBPACK_IMPORTED_MODULE_10__.trackError)(new _sdk_modules_app__WEBPACK_IMPORTED_MODULE_10__.ApiError(detailError));
        }
    }, [
        detailError
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_field_definitions_components_editor_items_detail_general_settings_provider__WEBPACK_IMPORTED_MODULE_3__.GeneralSettingsProvider, {
        generalSettings: detailData,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(LayoutProvider, {
            layout: layout,
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_9__.ContentLayout, {
                className: "absolute-stretch",
                renderToolbar: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_9__.Toolbar, {
                    children: [
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_9__.Flex, {
                            gap: 'mini',
                            children: [
                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_9__.IconButton, {
                                    icon: {
                                        value: 'refresh'
                                    },
                                    onClick: ()=>{
                                        void (layoutResult === null || layoutResult === void 0 ? void 0 : layoutResult.refetch());
                                        void refetchDetail();
                                        setLayoutKey((prev)=>prev + 1);
                                        setDetailView('general');
                                    }
                                }, void 0, false, {
                                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail.tsx",
                                    lineNumber: 104,
                                    columnNumber: 17
                                }, void 0),
                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_field_definitions_components_editor_items_detail_import_export_actions__WEBPACK_IMPORTED_MODULE_6__.ImportExportActions, {}, void 0, false, {
                                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail.tsx",
                                    lineNumber: 113,
                                    columnNumber: 17
                                }, void 0),
                                (customLayouts === null || customLayouts === void 0 ? void 0 : customLayouts.ModalContent) !== undefined && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_field_definitions_components_editor_custom_layout_custom_layout__WEBPACK_IMPORTED_MODULE_1__.CustomLayout, {}, void 0, false, {
                                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail.tsx",
                                    lineNumber: 115,
                                    columnNumber: 63
                                }, void 0)
                            ]
                        }, void 0, true, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail.tsx",
                            lineNumber: 103,
                            columnNumber: 15
                        }, void 0),
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_field_definitions_components_editor_items_detail_save__WEBPACK_IMPORTED_MODULE_4__.DetailSave, {}, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail.tsx",
                            lineNumber: 118,
                            columnNumber: 15
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail.tsx",
                    lineNumber: 102,
                    columnNumber: 68
                }, void 0),
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_9__.Content, {
                    loading: (layoutResult === null || layoutResult === void 0 ? void 0 : layoutResult.isLoading) === true || isDetailLoading || (layoutResult === null || layoutResult === void 0 ? void 0 : layoutResult.isFetching) === true || isDetailFetching,
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_9__.ConfigLayout, {
                        leftItem: {
                            minSize: 250,
                            maxSize: 350,
                            size: 250,
                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_field_definitions_components_editor_items_detail_sidebar__WEBPACK_IMPORTED_MODULE_5__.DetailSidebar, {}, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail.tsx",
                                lineNumber: 125,
                                columnNumber: 23
                            }, void 0)
                        },
                        resizeAble: true,
                        rightItem: {
                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_field_definitions_components_editor_items_detail_content__WEBPACK_IMPORTED_MODULE_2__.DetailContent, {}, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail.tsx",
                                lineNumber: 127,
                                columnNumber: 23
                            }, void 0)
                        }
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail.tsx",
                        lineNumber: 121,
                        columnNumber: 13
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail.tsx",
                    lineNumber: 120,
                    columnNumber: 11
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail.tsx",
                lineNumber: 102,
                columnNumber: 9
            }, undefined)
        }, layoutKey, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail.tsx",
            lineNumber: 101,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail.tsx",
        lineNumber: 100,
        columnNumber: 10
    }, undefined);
};
_s(ItemDetail, "4Y17H1KmKYfH4GGSti6tV40wtdI=", true, function() {
    return [
        _Pimcore_modules_field_definitions_components_editor_settings_provider__WEBPACK_IMPORTED_MODULE_8__.useSettings,
        _Pimcore_modules_field_definitions_components_editor_items_provider__WEBPACK_IMPORTED_MODULE_7__.useItems
    ];
});
_c = ItemDetail;
var _c;
$RefreshReg$(_c, "ItemDetail");

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
"./js/src/core/modules/field-definitions/components/editor/items/detail/content.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DetailContent: () => (DetailContent)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_modules_field_definitions_components_editor_items_detail_content_general_settings_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/field-definitions/components/editor/items/detail/content/general-settings-form.tsx");
/* ESM import */var _Pimcore_modules_field_definitions_components_editor_items_detail_content_layout_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/field-definitions/components/editor/items/detail/content/layout-form.tsx");
/* ESM import */var _Pimcore_modules_field_definitions_components_editor_items_provider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/field-definitions/components/editor/items/provider.tsx");
/* ESM import */var _Pimcore_modules_field_definitions_components_editor_settings_provider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/field-definitions/components/editor/settings-provider.tsx");
/* ESM import */var _sdk_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/sdk/components/index.ts");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_7__);
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
var _s = $RefreshSig$();







const DetailContent = ()=>{
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_7__.useTranslation)();
    const { useLayout } = (0,_Pimcore_modules_field_definitions_components_editor_settings_provider__WEBPACK_IMPORTED_MODULE_4__.useSettings)();
    const { currentFieldDefinitionId } = useLayout();
    const { detailView } = (0,_Pimcore_modules_field_definitions_components_editor_items_provider__WEBPACK_IMPORTED_MODULE_3__.useItems)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            detailView === 'general' ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_field_definitions_components_editor_items_detail_content_general_settings_form__WEBPACK_IMPORTED_MODULE_1__.GeneralSettingsForm, {}, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail/content.tsx",
                lineNumber: 32,
                columnNumber: 35
            }, undefined) : null,
            detailView === 'layout' && currentFieldDefinitionId === null ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_5__.Content, {
                centered: true,
                padded: true,
                children: t('field-definitions.select-field-message')
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail/content.tsx",
                lineNumber: 34,
                columnNumber: 71
            }, undefined) : null,
            detailView === 'layout' && currentFieldDefinitionId !== null ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_field_definitions_components_editor_items_detail_content_layout_form__WEBPACK_IMPORTED_MODULE_2__.LayoutForm, {}, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail/content.tsx",
                lineNumber: 38,
                columnNumber: 71
            }, undefined) : null
        ]
    }, void 0, true);
};
_s(DetailContent, "DIpqOGCk1Rvuzm5irfSwn1J14WY=", true, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_7__.useTranslation,
        _Pimcore_modules_field_definitions_components_editor_settings_provider__WEBPACK_IMPORTED_MODULE_4__.useSettings,
        _Pimcore_modules_field_definitions_components_editor_items_provider__WEBPACK_IMPORTED_MODULE_3__.useItems
    ];
});
_c = DetailContent;
var _c;
$RefreshReg$(_c, "DetailContent");

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
"./js/src/core/modules/field-definitions/components/editor/items/detail/content/general-settings-form.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  GeneralSettingsForm: () => (GeneralSettingsForm)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_modules_field_definitions_components_editor_items_detail_general_settings_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/field-definitions/components/editor/items/detail/general-settings-provider.tsx");
/* ESM import */var _Pimcore_modules_field_definitions_components_editor_settings_provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/field-definitions/components/editor/settings-provider.tsx");
/* ESM import */var _sdk_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/sdk/components/index.ts");
/* ESM import */var _sdk_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/sdk/utils/index.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_7__);
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
var _s = $RefreshSig$();







const PADDING = {
    x: 'small',
    bottom: 'small',
    top: 'none'
};
const GeneralSettingsForm = ()=>{
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_7__.useTranslation)();
    const { generalSettings, setGeneralSettings } = (0,_Pimcore_modules_field_definitions_components_editor_items_detail_general_settings_provider__WEBPACK_IMPORTED_MODULE_1__.useGeneralSettings)();
    const { GeneralSettingsFormFields } = (0,_Pimcore_modules_field_definitions_components_editor_settings_provider__WEBPACK_IMPORTED_MODULE_2__.useSettings)();
    const [formValues, setFormValues] = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)(generalSettings);
    const debouncedValues = (0,_sdk_utils__WEBPACK_IMPORTED_MODULE_4__.useDebounce)(formValues, 300);
    const handleValuesChange = (0,react__WEBPACK_IMPORTED_MODULE_6__.useCallback)((changedValues, allValues)=>{
        setFormValues(allValues);
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_6__.useEffect)(()=>{
        if (debouncedValues !== generalSettings) {
            setGeneralSettings(debouncedValues);
        }
    }, [
        debouncedValues
    ]);
    const formProps = (0,react__WEBPACK_IMPORTED_MODULE_6__.useMemo)(()=>({
            initialValues: generalSettings,
            onValuesChange: handleValuesChange
        }), [
        generalSettings
    ]);
    return (0,react__WEBPACK_IMPORTED_MODULE_6__.useMemo)(()=>{
        if ((0,lodash__WEBPACK_IMPORTED_MODULE_5__.isNil)(generalSettings)) {
            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_3__.Content, {
                centered: true,
                padded: true,
                children: t('field-definitions.loading-general-settings')
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail/content/general-settings-form.tsx",
                lineNumber: 50,
                columnNumber: 14
            }, undefined);
        }
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_3__.Content, {
            padded: true,
            padding: PADDING,
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_3__.FormKit, {
                formProps: formProps,
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(GeneralSettingsFormFields, {}, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail/content/general-settings-form.tsx",
                    lineNumber: 56,
                    columnNumber: 11
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail/content/general-settings-form.tsx",
                lineNumber: 55,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail/content/general-settings-form.tsx",
            lineNumber: 54,
            columnNumber: 12
        }, undefined);
    }, [
        generalSettings
    ]);
};
_s(GeneralSettingsForm, "Sz+YwLey3pqIIVTBtyCSBtYhcBE=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_7__.useTranslation,
        _Pimcore_modules_field_definitions_components_editor_items_detail_general_settings_provider__WEBPACK_IMPORTED_MODULE_1__.useGeneralSettings,
        _Pimcore_modules_field_definitions_components_editor_settings_provider__WEBPACK_IMPORTED_MODULE_2__.useSettings,
        _sdk_utils__WEBPACK_IMPORTED_MODULE_4__.useDebounce
    ];
});
_c = GeneralSettingsForm;
var _c;
$RefreshReg$(_c, "GeneralSettingsForm");

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
"./js/src/core/modules/field-definitions/components/editor/items/detail/content/layout-form.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  LayoutForm: () => (LayoutForm)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_modules_field_definitions_components_editor_area_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/field-definitions/components/editor/area-provider.tsx");
/* ESM import */var _sdk_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/sdk/components/index.ts");
/* ESM import */var _sdk_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/sdk/utils/index.ts");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var _Pimcore_modules_field_definitions_components_editor_settings_provider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/field-definitions/components/editor/settings-provider.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_6__);
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
var _s = $RefreshSig$();






const LayoutForm = ()=>{
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_6__.useTranslation)();
    const { useLayout, fieldDefinitionRegistry } = (0,_Pimcore_modules_field_definitions_components_editor_settings_provider__WEBPACK_IMPORTED_MODULE_5__.useSettings)();
    const { currentFieldDefinitionId, currentFieldDefinitionIdPath, fieldDefinitions, updateFieldDefinition } = useLayout();
    const fieldDefinition = fieldDefinitions[currentFieldDefinitionId];
    const [values, setValues] = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(fieldDefinition);
    const debouncedValues = (0,_sdk_utils__WEBPACK_IMPORTED_MODULE_3__.useDebounce)(values, 300);
    // Capture the active field definition ID at the moment the user types, not when the debounce fires.
    // Without this, switching fields quickly causes the debounced update to write old values to the new field.
    const activeIdRef = (0,react__WEBPACK_IMPORTED_MODULE_4__.useRef)(currentFieldDefinitionId);
    const { area } = (0,_Pimcore_modules_field_definitions_components_editor_area_provider__WEBPACK_IMPORTED_MODULE_1__.useArea)();
    const dynamicType = (0,react__WEBPACK_IMPORTED_MODULE_4__.useMemo)(()=>{
        if (fieldDefinition !== undefined && fieldDefinitionRegistry.hasDynamicType(fieldDefinition.fieldtype)) {
            return fieldDefinitionRegistry.getDynamicType(fieldDefinition.fieldtype);
        }
        return null;
    }, [
        fieldDefinition
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_4__.useEffect)(()=>{
        if (activeIdRef.current !== null && debouncedValues !== fieldDefinition) {
            updateFieldDefinition(activeIdRef.current, debouncedValues);
        }
    }, [
        debouncedValues
    ]);
    return (0,react__WEBPACK_IMPORTED_MODULE_4__.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                dynamicType === null ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_2__.Content, {
                    padded: true,
                    children: t('field-definitions.type-not-supported')
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail/content/layout-form.tsx",
                    lineNumber: 52,
                    columnNumber: 31
                }, undefined) : null,
                dynamicType !== null ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_2__.Content, {
                    padded: true,
                    padding: {
                        x: 'small',
                        bottom: 'small',
                        top: 'none'
                    },
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_2__.FormKit, {
                        formProps: {
                            initialValues: {
                                ...fieldDefinition
                            },
                            onValuesChange: (_, changedValues)=>{
                                activeIdRef.current = currentFieldDefinitionId;
                                setValues(changedValues);
                            }
                        },
                        children: dynamicType.getFormFields({
                            area,
                            fieldDefinitions,
                            path: currentFieldDefinitionIdPath
                        })
                    }, `${currentFieldDefinitionId}-${dynamicType.id}`, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail/content/layout-form.tsx",
                        lineNumber: 61,
                        columnNumber: 13
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail/content/layout-form.tsx",
                    lineNumber: 56,
                    columnNumber: 31
                }, undefined) : null
            ]
        }, void 0, true), [
        fieldDefinition
    ]);
};
_s(LayoutForm, "DiRAYT7m/RW9D49aVUOHjCtbaWI=", true, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_6__.useTranslation,
        _Pimcore_modules_field_definitions_components_editor_settings_provider__WEBPACK_IMPORTED_MODULE_5__.useSettings,
        _sdk_utils__WEBPACK_IMPORTED_MODULE_3__.useDebounce,
        _Pimcore_modules_field_definitions_components_editor_area_provider__WEBPACK_IMPORTED_MODULE_1__.useArea
    ];
});
_c = LayoutForm;
var _c;
$RefreshReg$(_c, "LayoutForm");

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
"./js/src/core/modules/field-definitions/components/editor/items/detail/general-settings-provider.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  GeneralSettingsContext: () => (GeneralSettingsContext),
  GeneralSettingsProvider: () => (GeneralSettingsProvider),
  useGeneralSettings: () => (useGeneralSettings)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
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
var _s = $RefreshSig$(), _s1 = $RefreshSig$();

const GeneralSettingsContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(undefined);
const GeneralSettingsProvider = (props)=>{
    _s();
    const [generalSettings, setGeneralSettings] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(props.generalSettings);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setGeneralSettings(props.generalSettings);
    }, [
        props.generalSettings
    ]);
    const updateGeneralSettings = (settings)=>{
        /* eslint-disable  @typescript-eslint/consistent-type-assertions */ setGeneralSettings((oldSettings)=>{
            return {
                ...oldSettings,
                ...settings
            };
        });
    /* eslint-enable  @typescript-eslint/consistent-type-assertions */ };
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(GeneralSettingsContext.Provider, {
            value: {
                generalSettings,
                setGeneralSettings: updateGeneralSettings
            },
            children: props.children
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail/general-settings-provider.tsx",
            lineNumber: 28,
            columnNumber: 24
        }, undefined), [
        generalSettings,
        props.children
    ]);
};
_s(GeneralSettingsProvider, "YlLBX2pejtG+8/C7z5MN/1zmMJs=");
_c = GeneralSettingsProvider;
const useGeneralSettings = ()=>{
    _s1();
    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(GeneralSettingsContext);
    if (context === undefined) {
        throw new Error('useGeneralSettings must be used within a GeneralSettingsProvider');
    }
    return context;
};
_s1(useGeneralSettings, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
$RefreshReg$(_c, "GeneralSettingsProvider");

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
"./js/src/core/modules/field-definitions/components/editor/items/detail/import-export-actions.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ImportExportActions: () => (ImportExportActions)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_modules_field_definitions_components_editor_items_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/field-definitions/components/editor/items/provider.tsx");
/* ESM import */var _Pimcore_modules_field_definitions_components_editor_settings_provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/field-definitions/components/editor/settings-provider.tsx");
/* ESM import */var _sdk_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/sdk/components/index.ts");
/* ESM import */var _Pimcore_components_import_modal_import_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/import-modal/import-modal.tsx");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_7__);
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
var _s = $RefreshSig$();







const defaultValidateFile = (file)=>{
    return file.type === 'application/json' || file.name.endsWith('.json');
};
const ImportExportActions = ()=>{
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_7__.useTranslation)();
    const { activeConfiguration } = (0,_Pimcore_modules_field_definitions_components_editor_items_provider__WEBPACK_IMPORTED_MODULE_1__.useItems)();
    const { useDetailLayoutQuery, useDetailGeneralSettingsQuery, importExportConfig } = (0,_Pimcore_modules_field_definitions_components_editor_settings_provider__WEBPACK_IMPORTED_MODULE_2__.useSettings)();
    const messageApi = (0,_sdk_components__WEBPACK_IMPORTED_MODULE_3__.useMessage)();
    const [isImportModalOpen, setIsImportModalOpen] = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)(false);
    const itemId = activeConfiguration === null || activeConfiguration === void 0 ? void 0 : activeConfiguration.id;
    const layoutResult = useDetailLayoutQuery === null || useDetailLayoutQuery === void 0 ? void 0 : useDetailLayoutQuery({
        id: itemId ?? ''
    });
    const generalSettingsResult = useDetailGeneralSettingsQuery({
        id: itemId ?? ''
    });
    if ((0,lodash__WEBPACK_IMPORTED_MODULE_5__.isNil)(importExportConfig)) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}, void 0, false);
    }
    const { getExportUrl, getImportUrl, validateFile = defaultValidateFile, acceptFileTypes = '.json,application/json', acceptMimeTypes = [
        'application/json'
    ], successMessageKey = 'class-definition.import-success' } = importExportConfig;
    const handleExport = ()=>{
        if ((0,lodash__WEBPACK_IMPORTED_MODULE_5__.isNil)(itemId)) {
            return;
        }
        const link = document.createElement('a');
        link.href = getExportUrl(itemId);
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const handleImportSuccess = ()=>{
        void messageApi.success(t(successMessageKey));
        setIsImportModalOpen(false);
        void (layoutResult === null || layoutResult === void 0 ? void 0 : layoutResult.refetch());
        void (generalSettingsResult === null || generalSettingsResult === void 0 ? void 0 : generalSettingsResult.refetch());
    };
    const uploadUrl = !(0,lodash__WEBPACK_IMPORTED_MODULE_5__.isNil)(itemId) ? getImportUrl(itemId) : '';
    const menuItems = [
        {
            key: 'export',
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_3__.Icon, {
                value: "export"
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail/import-export-actions.tsx",
                lineNumber: 73,
                columnNumber: 11
            }, undefined),
            label: t('export'),
            onClick: handleExport
        },
        {
            key: 'import',
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_3__.Icon, {
                value: "upload-import"
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail/import-export-actions.tsx",
                lineNumber: 78,
                columnNumber: 11
            }, undefined),
            label: t('import'),
            onClick: ()=>{
                setIsImportModalOpen(true);
            }
        }
    ];
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_3__.Dropdown, {
                menu: {
                    items: menuItems
                },
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_3__.IconTextButton, {
                    icon: {
                        value: 'chevron-down'
                    },
                    iconPlacement: "right",
                    type: "link",
                    children: t('toolbar.more')
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail/import-export-actions.tsx",
                    lineNumber: 88,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail/import-export-actions.tsx",
                lineNumber: 85,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_import_modal_import_modal__WEBPACK_IMPORTED_MODULE_4__.ImportModal, {
                accept: acceptFileTypes,
                acceptMimeTypes: acceptMimeTypes,
                action: uploadUrl,
                onOpenChange: setIsImportModalOpen,
                onUploadSuccess: handleImportSuccess,
                open: isImportModalOpen,
                title: t('class-definition.import'),
                uploadButtonLabel: t('import'),
                validateFile: validateFile
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail/import-export-actions.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true);
};
_s(ImportExportActions, "NEQNVu6gtVhLXGLNsP8lRJ+1sT0=", true, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_7__.useTranslation,
        _Pimcore_modules_field_definitions_components_editor_items_provider__WEBPACK_IMPORTED_MODULE_1__.useItems,
        _Pimcore_modules_field_definitions_components_editor_settings_provider__WEBPACK_IMPORTED_MODULE_2__.useSettings,
        _sdk_components__WEBPACK_IMPORTED_MODULE_3__.useMessage
    ];
});
_c = ImportExportActions;
var _c;
$RefreshReg$(_c, "ImportExportActions");

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
"./js/src/core/modules/field-definitions/components/editor/items/detail/layout-provider.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  LayoutProvider: () => (LayoutProvider),
  useLayout: () => (useLayout)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_modules_field_definitions_components_editor_settings_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/field-definitions/components/editor/settings-provider.tsx");
/* ESM import */var _Pimcore_modules_field_definitions_utils_layout_provider_factory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/field-definitions/utils/layout-provider-factory.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
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
var _s = $RefreshSig$();



const { LayoutProvider: LayoutProviderInternal, useLayout } = (0,_Pimcore_modules_field_definitions_utils_layout_provider_factory__WEBPACK_IMPORTED_MODULE_2__.create)();

const LayoutProvider = (props)=>{
    _s();
    const { fieldDefinitionRegistry } = (0,_Pimcore_modules_field_definitions_components_editor_settings_provider__WEBPACK_IMPORTED_MODULE_1__.useSettings)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(LayoutProviderInternal, {
        ...props,
        fieldDefinitionRegistry: fieldDefinitionRegistry
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail/layout-provider.tsx",
        lineNumber: 23,
        columnNumber: 10
    }, undefined);
};
_s(LayoutProvider, "mb7e6TF/R/wg7dPFQQuFB5+eOlo=", false, function() {
    return [
        _Pimcore_modules_field_definitions_components_editor_settings_provider__WEBPACK_IMPORTED_MODULE_1__.useSettings
    ];
});
_c = LayoutProvider;
var _c;
$RefreshReg$(_c, "LayoutProvider");

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
"./js/src/core/modules/field-definitions/components/editor/items/detail/save.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DetailSave: () => (DetailSave)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_modules_field_definitions_components_editor_area_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/field-definitions/components/editor/area-provider.tsx");
/* ESM import */var _Pimcore_modules_field_definitions_components_editor_items_detail_general_settings_provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/field-definitions/components/editor/items/detail/general-settings-provider.tsx");
/* ESM import */var _Pimcore_modules_field_definitions_components_editor_settings_provider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/field-definitions/components/editor/settings-provider.tsx");
/* ESM import */var _Pimcore_modules_field_definitions_dynamic_types_utils_reserved_words__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/field-definitions/dynamic-types/utils/reserved-words.ts");
/* ESM import */var _Pimcore_modules_field_definitions_utils_layout_helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/field-definitions/utils/layout-helpers.tsx");
/* ESM import */var _sdk_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/sdk/components/index.ts");
/* ESM import */var _sdk_modules_app__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/sdk/modules/app/index.ts");
/* ESM import */var _Pimcore_components_modal_alert_modal_hooks_use_alert_modal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/modal/alert-modal/hooks/use-alert-modal.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_10__);
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
var _s = $RefreshSig$();










const NAME_FORMAT_REGEX = /^[A-Za-z][A-Za-z0-9_]*$/;
const DetailSave = ()=>{
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_10__.useTranslation)();
    const { useDetailUpdateMutation, useLayout } = (0,_Pimcore_modules_field_definitions_components_editor_settings_provider__WEBPACK_IMPORTED_MODULE_3__.useSettings)();
    const { fieldDefinitions, setInvalidFieldDefinitionIds, structure } = useLayout();
    const { generalSettings } = (0,_Pimcore_modules_field_definitions_components_editor_items_detail_general_settings_provider__WEBPACK_IMPORTED_MODULE_2__.useGeneralSettings)();
    const [updateDetailMutation, result] = useDetailUpdateMutation();
    const { isLoading } = result;
    const messageApi = (0,_sdk_components__WEBPACK_IMPORTED_MODULE_6__.useMessage)();
    const alertModal = (0,_Pimcore_components_modal_alert_modal_hooks_use_alert_modal__WEBPACK_IMPORTED_MODULE_8__.useAlertModal)();
    const fieldDefinitionRegistry = (0,_Pimcore_modules_field_definitions_components_editor_settings_provider__WEBPACK_IMPORTED_MODULE_3__.useSettings)().fieldDefinitionRegistry;
    const { area } = (0,_Pimcore_modules_field_definitions_components_editor_area_provider__WEBPACK_IMPORTED_MODULE_1__.useArea)();
    const onClick = ()=>{
        if (generalSettings === undefined) {
            return;
        }
        const invalidDefinitions = [];
        const emptyNameViolations = [];
        const reservedWordViolations = [];
        const formatViolations = [];
        const duplicateViolations = [];
        const pathMap = structure !== undefined ? (0,_Pimcore_modules_field_definitions_utils_layout_helpers__WEBPACK_IMPORTED_MODULE_5__.buildPathMap)(structure) : {};
        // Validate all field definitions before saving
        for (const [key, definition] of Object.entries(fieldDefinitions)){
            // Skip the root layout node — its name is structural, not user-editable,
            // and it is stripped from the payload before saving anyway
            if (structure !== undefined && key === structure.id) continue;
            if (fieldDefinitionRegistry.hasDynamicType(definition.fieldtype)) {
                const dynamicType = fieldDefinitionRegistry.getDynamicType(definition.fieldtype);
                // @todo check if we can handle the path here
                const isValid = dynamicType.isValid(definition, {
                    area,
                    fieldDefinitions,
                    path: []
                });
                if (!isValid) {
                    invalidDefinitions.push(key);
                }
            }
            const name = typeof definition.name === 'string' ? definition.name : '';
            // All types: check for empty name
            if (name.trim() === '') {
                emptyNameViolations.push({
                    id: key,
                    label: definition.fieldtype
                });
                if (!invalidDefinitions.includes(key)) invalidDefinitions.push(key);
            }
            // Data types only, skip localizedfields
            if (definition.datatype === 'data' && definition.fieldtype !== 'localizedfields') {
                if ((0,_Pimcore_modules_field_definitions_dynamic_types_utils_reserved_words__WEBPACK_IMPORTED_MODULE_4__.isReservedWord)(name)) {
                    reservedWordViolations.push({
                        id: key,
                        label: name
                    });
                    if (!invalidDefinitions.includes(key)) invalidDefinitions.push(key);
                }
                if (!NAME_FORMAT_REGEX.test(name)) {
                    formatViolations.push({
                        id: key,
                        label: name
                    });
                    if (!invalidDefinitions.includes(key)) invalidDefinitions.push(key);
                }
                if (structure !== undefined) {
                    const namesInNamespace = (0,_Pimcore_modules_field_definitions_utils_layout_helpers__WEBPACK_IMPORTED_MODULE_5__.getNamesInNamespace)(structure, fieldDefinitions, key, pathMap);
                    const occurrences = namesInNamespace.filter((n)=>n === name).length;
                    if (occurrences > 1) {
                        duplicateViolations.push({
                            id: key,
                            label: name
                        });
                        if (!invalidDefinitions.includes(key)) invalidDefinitions.push(key);
                    }
                }
            }
        }
        setInvalidFieldDefinitionIds(invalidDefinitions);
        const hasViolations = emptyNameViolations.length > 0 || reservedWordViolations.length > 0 || formatViolations.length > 0 || duplicateViolations.length > 0 || invalidDefinitions.length > 0;
        if (hasViolations) {
            const content = /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                style: {
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                        children: t('field-definitions.validation.errors-found')
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail/save.tsx",
                        lineNumber: 124,
                        columnNumber: 11
                    }, undefined),
                    emptyNameViolations.length > 0 && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("strong", {
                                children: t('field-definitions.validation.empty-name')
                            }, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail/save.tsx",
                                lineNumber: 126,
                                columnNumber: 15
                            }, undefined),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("ul", {
                                children: emptyNameViolations.map((v)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("li", {
                                        children: v.label
                                    }, v.id, false, {
                                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail/save.tsx",
                                        lineNumber: 127,
                                        columnNumber: 49
                                    }, undefined))
                            }, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail/save.tsx",
                                lineNumber: 127,
                                columnNumber: 15
                            }, undefined)
                        ]
                    }, void 0, true, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail/save.tsx",
                        lineNumber: 125,
                        columnNumber: 46
                    }, undefined),
                    reservedWordViolations.length > 0 && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("strong", {
                                children: t('field-definitions.validation.reserved-word')
                            }, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail/save.tsx",
                                lineNumber: 130,
                                columnNumber: 15
                            }, undefined),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("ul", {
                                children: reservedWordViolations.map((v)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("li", {
                                        children: v.label
                                    }, v.id, false, {
                                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail/save.tsx",
                                        lineNumber: 131,
                                        columnNumber: 52
                                    }, undefined))
                            }, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail/save.tsx",
                                lineNumber: 131,
                                columnNumber: 15
                            }, undefined)
                        ]
                    }, void 0, true, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail/save.tsx",
                        lineNumber: 129,
                        columnNumber: 49
                    }, undefined),
                    formatViolations.length > 0 && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("strong", {
                                children: t('field-definitions.validation.invalid-format')
                            }, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail/save.tsx",
                                lineNumber: 134,
                                columnNumber: 15
                            }, undefined),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("ul", {
                                children: formatViolations.map((v)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("li", {
                                        children: v.label
                                    }, v.id, false, {
                                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail/save.tsx",
                                        lineNumber: 135,
                                        columnNumber: 46
                                    }, undefined))
                            }, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail/save.tsx",
                                lineNumber: 135,
                                columnNumber: 15
                            }, undefined)
                        ]
                    }, void 0, true, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail/save.tsx",
                        lineNumber: 133,
                        columnNumber: 43
                    }, undefined),
                    duplicateViolations.length > 0 && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("strong", {
                                children: t('field-definitions.validation.duplicate-name')
                            }, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail/save.tsx",
                                lineNumber: 138,
                                columnNumber: 15
                            }, undefined),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("ul", {
                                children: duplicateViolations.map((v)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("li", {
                                        children: v.label
                                    }, v.id, false, {
                                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail/save.tsx",
                                        lineNumber: 139,
                                        columnNumber: 49
                                    }, undefined))
                            }, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail/save.tsx",
                                lineNumber: 139,
                                columnNumber: 15
                            }, undefined)
                        ]
                    }, void 0, true, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail/save.tsx",
                        lineNumber: 137,
                        columnNumber: 46
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail/save.tsx",
                lineNumber: 119,
                columnNumber: 23
            }, undefined);
            alertModal.error({
                content
            });
            return;
        }
        updateDetailMutation({}).unwrap().then(()=>{
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            messageApi.success(t('field-definitions.saved-successfully'));
        }).catch((e)=>{
            (0,_sdk_modules_app__WEBPACK_IMPORTED_MODULE_7__.trackError)(new _sdk_modules_app__WEBPACK_IMPORTED_MODULE_7__.ApiError(e));
        });
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_6__.Button, {
        disabled: isLoading || generalSettings === undefined,
        loading: isLoading,
        onClick: onClick,
        type: "primary",
        children: t('save')
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail/save.tsx",
        lineNumber: 154,
        columnNumber: 10
    }, undefined);
};
_s(DetailSave, "k46oTOJr8Zp6gfF7gbATY4ZYb1o=", true, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_10__.useTranslation,
        _Pimcore_modules_field_definitions_components_editor_settings_provider__WEBPACK_IMPORTED_MODULE_3__.useSettings,
        _Pimcore_modules_field_definitions_components_editor_items_detail_general_settings_provider__WEBPACK_IMPORTED_MODULE_2__.useGeneralSettings,
        _sdk_components__WEBPACK_IMPORTED_MODULE_6__.useMessage,
        _Pimcore_components_modal_alert_modal_hooks_use_alert_modal__WEBPACK_IMPORTED_MODULE_8__.useAlertModal,
        _Pimcore_modules_field_definitions_components_editor_settings_provider__WEBPACK_IMPORTED_MODULE_3__.useSettings,
        _Pimcore_modules_field_definitions_components_editor_area_provider__WEBPACK_IMPORTED_MODULE_1__.useArea
    ];
});
_c = DetailSave;
var _c;
$RefreshReg$(_c, "DetailSave");

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
"./js/src/core/modules/field-definitions/components/editor/items/detail/sidebar.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DetailSidebar: () => (DetailSidebar)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_modules_field_definitions_components_editor_area_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/field-definitions/components/editor/area-provider.tsx");
/* ESM import */var _Pimcore_modules_field_definitions_components_editor_items_provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/field-definitions/components/editor/items/provider.tsx");
/* ESM import */var _Pimcore_modules_field_definitions_components_editor_settings_provider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/field-definitions/components/editor/settings-provider.tsx");
/* ESM import */var _Pimcore_modules_field_definitions_utils_layout_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/field-definitions/utils/layout-helpers.tsx");
/* ESM import */var _Pimcore_modules_field_definitions_utils_global_clipboard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/field-definitions/utils/global-clipboard.ts");
/* ESM import */var _sdk_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/sdk/components/index.ts");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_7__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_8__);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_10__);
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
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ /* eslint-disable max-lines */ 
var _s = $RefreshSig$();










const DetailSidebar = (props)=>{
    _s();
    const { useLayout } = (0,_Pimcore_modules_field_definitions_components_editor_settings_provider__WEBPACK_IMPORTED_MODULE_3__.useSettings)();
    const { detailView, setDetailView } = (0,_Pimcore_modules_field_definitions_components_editor_items_provider__WEBPACK_IMPORTED_MODULE_2__.useItems)();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_10__.useTranslation)();
    const { token } = antd__WEBPACK_IMPORTED_MODULE_7__.theme.useToken();
    const { allowExternalDrop = false } = props;
    const { area } = (0,_Pimcore_modules_field_definitions_components_editor_area_provider__WEBPACK_IMPORTED_MODULE_1__.useArea)();
    const { structure, fieldDefinitions, invalidFieldDefinitionIds, currentFieldDefinitionId, copiedPath, addFieldDefinition, addExternalFieldDefinition, updateFieldDefinition, setCurrentFieldDefinitionIdPath, setCurrentFieldDefinitionId, moveFieldDefinition, removeFieldDefinition, removeChildren, cloneFieldDefinition, isValidChildFieldDefinition, isValidExternalChildFieldDefinition, copyFieldDefinition, pasteFieldDefinition, getLayout } = useLayout();
    const { fieldDefinitionRegistry } = (0,_Pimcore_modules_field_definitions_components_editor_settings_provider__WEBPACK_IMPORTED_MODULE_3__.useSettings)();
    const { copiedLayout: globalCopiedLayout } = (0,_Pimcore_modules_field_definitions_utils_global_clipboard__WEBPACK_IMPORTED_MODULE_5__.useGlobalFieldDefinitionClipboard)();
    // Function to get all keys from tree structure that have children
    const getAllKeys = (node)=>{
        const keys = [];
        if (node.children.length > 0) {
            keys.push(node.id);
            node.children.forEach((child)=>{
                keys.push(...getAllKeys(child));
            });
        }
        return keys;
    };
    // Calculate all available keys from current structure (nodes with children)
    const allAvailableKeys = (0,react__WEBPACK_IMPORTED_MODULE_9__.useMemo)(()=>{
        if ((0,lodash__WEBPACK_IMPORTED_MODULE_8__.isUndefined)(structure)) {
            return [];
        }
        return getAllKeys(structure);
    }, [
        structure
    ]);
    // Controlled state for expanded keys
    const [expandedKeys, setExpandedKeys] = (0,react__WEBPACK_IMPORTED_MODULE_9__.useState)([]);
    // Track if we've set initial keys
    const hasInitializedRef = react__WEBPACK_IMPORTED_MODULE_9___default().useRef(false);
    // Track cloned node IDs to expand them when they appear in structure
    const pendingClonedNodeIdRef = react__WEBPACK_IMPORTED_MODULE_9___default().useRef(null);
    // Set initial expanded keys once when data arrives
    (0,react__WEBPACK_IMPORTED_MODULE_9__.useEffect)(()=>{
        if (!hasInitializedRef.current && allAvailableKeys.length > 0) {
            setExpandedKeys(allAvailableKeys);
            expandedKeysRef.current = allAvailableKeys;
            hasInitializedRef.current = true;
        }
    }, [
        allAvailableKeys
    ]);
    // Expand cloned nodes when they appear in structure
    (0,react__WEBPACK_IMPORTED_MODULE_9__.useEffect)(()=>{
        if (pendingClonedNodeIdRef.current !== null && structure !== undefined) {
            const clonedNodeId = pendingClonedNodeIdRef.current;
            const findNodeInStructure = (node, targetId)=>{
                if (node.id === targetId) return node;
                for (const child of node.children){
                    const found = findNodeInStructure(child, targetId);
                    if (found !== undefined) return found;
                }
                return undefined;
            };
            const clonedNode = findNodeInStructure(structure, clonedNodeId);
            if (clonedNode !== undefined) {
                const keysToExpand = getAllKeys(clonedNode);
                if (keysToExpand.length > 0) {
                    setExpandedKeys((prev)=>{
                        const newKeys = [
                            ...new Set([
                                ...prev,
                                ...keysToExpand
                            ])
                        ];
                        expandedKeysRef.current = newKeys;
                        return newKeys;
                    });
                }
                pendingClonedNodeIdRef.current = null;
            }
        }
    }, [
        structure
    ]);
    // Ref for expanded keys (needed in sorting-bottom isValidContext)
    const expandedKeysRef = react__WEBPACK_IMPORTED_MODULE_9___default().useRef(expandedKeys);
    const structureRef = react__WEBPACK_IMPORTED_MODULE_9___default().useRef(structure);
    // Update structure ref whenever structure changes
    react__WEBPACK_IMPORTED_MODULE_9___default().useEffect(()=>{
        structureRef.current = structure;
    }, [
        structure
    ]);
    // Helper to find current path to a node in the structure
    const findCurrentPath = (nodeId)=>{
        if ((0,lodash__WEBPACK_IMPORTED_MODULE_8__.isUndefined)(structureRef.current)) return undefined;
        const findPath = function(node, targetId) {
            let currentPath = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
            const newPath = [
                ...currentPath,
                node.id
            ];
            if (node.id === targetId) {
                return newPath;
            }
            for (const child of node.children){
                const found = findPath(child, targetId, newPath);
                if (found !== undefined) {
                    return found;
                }
            }
            return undefined;
        };
        return findPath(structureRef.current, nodeId);
    };
    // Handle expand/collapse from user interactions
    const handleExpand = (keys)=>{
        setExpandedKeys(keys);
        expandedKeysRef.current = keys;
    };
    // Helper to expand a node after dropping into it
    const expandNode = (nodeId)=>{
        setExpandedKeys((prev)=>{
            if (prev.includes(nodeId)) {
                return prev;
            }
            const newKeys = [
                ...prev,
                nodeId
            ];
            expandedKeysRef.current = newKeys;
            return newKeys;
        });
    };
    const resolveParentAndIndexFromPath = (root, path)=>{
        if ((0,lodash__WEBPACK_IMPORTED_MODULE_8__.isUndefined)(root) || path.length < 2) return undefined;
        let cursor = root;
        // Walk down following the path up to the parent
        for(let i = 0; i < path.length - 1; i++){
            if ((0,lodash__WEBPACK_IMPORTED_MODULE_8__.isUndefined)(cursor)) return undefined;
            if (cursor.id !== path[i]) {
                cursor = cursor.children.find((c)=>c.id === path[i]);
            }
        }
        if ((0,lodash__WEBPACK_IMPORTED_MODULE_8__.isUndefined)(cursor)) return undefined;
        const targetId = path[path.length - 1];
        const index = cursor.children.findIndex((c)=>c.id === targetId);
        return {
            parentId: cursor.id,
            index: Math.max(index, 0),
            siblingsCount: cursor.children.length
        };
    };
    const titleRender = (node, initialComponent)=>{
        const titleComponent = initialComponent;
        const currentFieldDefinition = fieldDefinitions[node.key];
        if (currentFieldDefinition === undefined) {
            return titleComponent;
        }
        if (node.key !== (structure === null || structure === void 0 ? void 0 : structure.id)) {
            var _treeNode_meta;
            const treeNode = node;
            const currentPath = Array.isArray((_treeNode_meta = treeNode.meta) === null || _treeNode_meta === void 0 ? void 0 : _treeNode_meta.currentPath) ? treeNode.meta.currentPath : [];
            const layout = getLayout({
                startNode: node.key.toString()
            });
            if (layout === undefined) {
                return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}, void 0, false);
            }
            const currentDynType = fieldDefinitionRegistry.getDynamicType(currentFieldDefinition.fieldtype, false);
            const info = {
                type: 'field-definition',
                icon: currentDynType !== undefined ? {
                    ...currentDynType.getIcon(),
                    iconColorGroup: [
                        'fieldDefinition_' + currentDynType.id,
                        'fieldDefinition'
                    ]
                } : {
                    value: 'unknown'
                },
                title: currentFieldDefinition.name,
                data: {
                    area,
                    internal: {
                        id: node.key,
                        fieldDefinition: currentFieldDefinition,
                        path: currentPath
                    },
                    external: layout
                }
            };
            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_6__.Draggable, {
                info: info,
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_6__.HotspotDroppable, {
                    hotspots: [
                        {
                            id: 'sorting-top',
                            className: 'dnd__sorting dnd__sorting--top',
                            position: {
                                x: 0,
                                y: 0,
                                width: '100%',
                                height: '30%'
                            },
                            isValidContext: (info)=>{
                                if (info.type !== 'field-definition') return false;
                                const currentPath = findCurrentPath(node.key) ?? [];
                                const parentPath = currentPath.slice(0, -1);
                                if ((0,lodash__WEBPACK_IMPORTED_MODULE_8__.isEqual)(info.data.area, area)) {
                                    const draggedCurrentPath = findCurrentPath(info.data.internal.id) ?? [];
                                    return isValidChildFieldDefinition(parentPath, draggedCurrentPath);
                                }
                                const externalLayout = info.data.external;
                                return allowExternalDrop && externalLayout !== undefined && isValidExternalChildFieldDefinition(parentPath, externalLayout);
                            },
                            onDrop: (info)=>{
                                const currentPath = findCurrentPath(node.key) ?? [];
                                const ctx = resolveParentAndIndexFromPath(structureRef.current, currentPath);
                                if (!(0,lodash__WEBPACK_IMPORTED_MODULE_8__.isUndefined)(ctx)) {
                                    const { parentId, index: targetIndex } = ctx;
                                    if ((0,lodash__WEBPACK_IMPORTED_MODULE_8__.isEqual)(info.data.area, area)) {
                                        const draggedCurrentPath = findCurrentPath(info.data.internal.id) ?? [];
                                        const draggedCtx = resolveParentAndIndexFromPath(structureRef.current, draggedCurrentPath);
                                        const sameParent = !(0,lodash__WEBPACK_IMPORTED_MODULE_8__.isUndefined)(draggedCtx) && draggedCtx.parentId === parentId;
                                        const insertIndex = sameParent && !(0,lodash__WEBPACK_IMPORTED_MODULE_8__.isUndefined)(draggedCtx) ? draggedCtx.index < targetIndex ? Math.max(targetIndex - 1, 0) : targetIndex : targetIndex;
                                        moveFieldDefinition(info.data.internal.id, parentId, insertIndex);
                                        return;
                                    }
                                    const newNode = addExternalFieldDefinition(parentId, info.data.external, targetIndex);
                                    if (allowExternalDrop) {
                                        const parentPath = currentPath.slice(0, -1);
                                        const keysToExpand = getAllKeys(newNode);
                                        setExpandedKeys((prev)=>{
                                            const newKeys = [
                                                ...new Set([
                                                    ...prev,
                                                    ...keysToExpand
                                                ])
                                            ];
                                            expandedKeysRef.current = newKeys;
                                            return newKeys;
                                        });
                                        setCurrentFieldDefinitionId(newNode.id);
                                        setCurrentFieldDefinitionIdPath([
                                            ...parentPath,
                                            newNode.id
                                        ]);
                                        setDetailView('layout');
                                    }
                                }
                            }
                        },
                        {
                            id: 'drop-middle',
                            position: {
                                x: '0',
                                y: '30%',
                                width: '100%',
                                height: '40%'
                            },
                            isValidContext: (info)=>{
                                if (info.type !== 'field-definition') return false;
                                const targetPath = findCurrentPath(node.key) ?? [];
                                if ((0,lodash__WEBPACK_IMPORTED_MODULE_8__.isEqual)(info.data.area, area)) {
                                    const draggedCurrentPath = findCurrentPath(info.data.internal.id) ?? [];
                                    return isValidChildFieldDefinition(targetPath, draggedCurrentPath);
                                }
                                const externalLayout = info.data.external;
                                return allowExternalDrop && externalLayout !== undefined && isValidExternalChildFieldDefinition(targetPath, externalLayout);
                            },
                            onDrop: (info)=>{
                                const targetNodeId = node.key.toString();
                                if ((0,lodash__WEBPACK_IMPORTED_MODULE_8__.isEqual)(info.data.area, area)) {
                                    moveFieldDefinition(info.data.internal.id, targetNodeId, 0);
                                } else {
                                    const newNode = addExternalFieldDefinition(targetNodeId, info.data.external, 0);
                                    if (allowExternalDrop) {
                                        const targetPath = findCurrentPath(targetNodeId) ?? [];
                                        const keysToExpand = getAllKeys(newNode);
                                        setExpandedKeys((prev)=>{
                                            const newKeys = [
                                                ...new Set([
                                                    ...prev,
                                                    targetNodeId,
                                                    ...keysToExpand
                                                ])
                                            ];
                                            expandedKeysRef.current = newKeys;
                                            return newKeys;
                                        });
                                        setCurrentFieldDefinitionId(newNode.id);
                                        setCurrentFieldDefinitionIdPath([
                                            ...targetPath,
                                            newNode.id
                                        ]);
                                        setDetailView('layout');
                                    }
                                }
                                expandNode(targetNodeId);
                            }
                        },
                        {
                            id: 'sorting-bottom',
                            position: {
                                x: 0,
                                y: '70%',
                                width: '100%',
                                height: '30%'
                            },
                            isValidContext: (info)=>{
                                if (expandedKeysRef.current.includes(node.key)) return false;
                                if (info.type !== 'field-definition') return false;
                                const currentPath = findCurrentPath(node.key) ?? [];
                                const parentPath = currentPath.slice(0, -1);
                                if ((0,lodash__WEBPACK_IMPORTED_MODULE_8__.isEqual)(info.data.area, area)) {
                                    const draggedCurrentPath = findCurrentPath(info.data.internal.id) ?? [];
                                    return isValidChildFieldDefinition(parentPath, draggedCurrentPath);
                                }
                                const externalLayout = info.data.external;
                                return allowExternalDrop && externalLayout !== undefined && isValidExternalChildFieldDefinition(parentPath, externalLayout);
                            },
                            onDrop: (info)=>{
                                const currentPath = findCurrentPath(node.key) ?? [];
                                const ctx = resolveParentAndIndexFromPath(structureRef.current, currentPath);
                                if (!(0,lodash__WEBPACK_IMPORTED_MODULE_8__.isUndefined)(ctx)) {
                                    const { parentId, index: targetIndex, siblingsCount } = ctx;
                                    let insertIndex = Math.min(targetIndex + 1, siblingsCount);
                                    if ((0,lodash__WEBPACK_IMPORTED_MODULE_8__.isEqual)(info.data.area, area)) {
                                        const draggedCurrentPath = findCurrentPath(info.data.internal.id) ?? [];
                                        const draggedCtx = resolveParentAndIndexFromPath(structureRef.current, draggedCurrentPath);
                                        const sameParent = !(0,lodash__WEBPACK_IMPORTED_MODULE_8__.isUndefined)(draggedCtx) && draggedCtx.parentId === parentId;
                                        if (sameParent && !(0,lodash__WEBPACK_IMPORTED_MODULE_8__.isUndefined)(draggedCtx)) {
                                            insertIndex = draggedCtx.index < targetIndex ? targetIndex : Math.min(targetIndex + 1, siblingsCount);
                                        }
                                        moveFieldDefinition(info.data.internal.id, parentId, insertIndex);
                                        return;
                                    }
                                    const newNode = addExternalFieldDefinition(parentId, info.data.external, insertIndex);
                                    if (allowExternalDrop) {
                                        const parentPath = currentPath.slice(0, -1);
                                        const keysToExpand = getAllKeys(newNode);
                                        setExpandedKeys((prev)=>{
                                            const newKeys = [
                                                ...new Set([
                                                    ...prev,
                                                    ...keysToExpand
                                                ])
                                            ];
                                            expandedKeysRef.current = newKeys;
                                            return newKeys;
                                        });
                                        setCurrentFieldDefinitionId(newNode.id);
                                        setCurrentFieldDefinitionIdPath([
                                            ...parentPath,
                                            newNode.id
                                        ]);
                                        setDetailView('layout');
                                    }
                                }
                            }
                        }
                    ],
                    children: titleComponent
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail/sidebar.tsx",
                    lineNumber: 245,
                    columnNumber: 11
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail/sidebar.tsx",
                lineNumber: 244,
                columnNumber: 14
            }, undefined);
        }
        // Root node — not draggable, but accepts drops
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_6__.HotspotDroppable, {
            hotspots: [
                {
                    id: 'drop-middle',
                    position: {
                        x: '0',
                        y: '0',
                        width: '100%',
                        height: '100%'
                    },
                    isValidContext: (info)=>{
                        if (info.type !== 'field-definition') return false;
                        const rootPath = [
                            structure.id
                        ];
                        if ((0,lodash__WEBPACK_IMPORTED_MODULE_8__.isEqual)(info.data.area, area)) {
                            const draggedCurrentPath = findCurrentPath(info.data.internal.id) ?? [];
                            return isValidChildFieldDefinition(rootPath, draggedCurrentPath);
                        }
                        const externalLayout = info.data.external;
                        return allowExternalDrop && externalLayout !== undefined && isValidExternalChildFieldDefinition(rootPath, externalLayout);
                    },
                    onDrop: (info)=>{
                        const rootId = structure.id;
                        if ((0,lodash__WEBPACK_IMPORTED_MODULE_8__.isEqual)(info.data.area, area)) {
                            moveFieldDefinition(info.data.internal.id, rootId, 0);
                        } else {
                            const newNode = addExternalFieldDefinition(rootId, info.data.external, 0);
                            if (allowExternalDrop) {
                                const keysToExpand = getAllKeys(newNode);
                                setExpandedKeys((prev)=>{
                                    const newKeys = [
                                        ...new Set([
                                            ...prev,
                                            rootId,
                                            ...keysToExpand
                                        ])
                                    ];
                                    expandedKeysRef.current = newKeys;
                                    return newKeys;
                                });
                                setCurrentFieldDefinitionId(newNode.id);
                                setCurrentFieldDefinitionIdPath([
                                    rootId,
                                    newNode.id
                                ]);
                                setDetailView('layout');
                            }
                        }
                        expandNode(rootId);
                    }
                }
            ],
            children: titleComponent
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail/sidebar.tsx",
            lineNumber: 397,
            columnNumber: 12
        }, undefined);
    };
    const items = react__WEBPACK_IMPORTED_MODULE_9___default().useMemo(()=>{
        if (structure === undefined) {
            return [];
        }
        const treeItems = (0,_Pimcore_modules_field_definitions_utils_layout_helpers__WEBPACK_IMPORTED_MODULE_4__.buildTree)({
            structure,
            fieldDefinitions,
            itemCallback: (param)=>{
                let { fieldDefinition, initialTreeItem } = param;
                const currentPath = initialTreeItem.meta.currentPath;
                const actions = fieldDefinitionRegistry.getDropdownActions({
                    area,
                    path: currentPath,
                    fieldDefinitions
                });
                const isCustomLayout = area.includes('custom-layout');
                return {
                    ...initialTreeItem,
                    ...initialTreeItem.key === (structure === null || structure === void 0 ? void 0 : structure.id) ? {
                        title: t('field-definitions.base'),
                        icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_6__.Icon, {
                            value: "folder"
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail/sidebar.tsx",
                            lineNumber: 461,
                            columnNumber: 19
                        }, undefined)
                    } : {},
                    className: 'ant-tree-node--has-drag-and-drop ' + (invalidFieldDefinitionIds.includes(initialTreeItem.key) ? 'tree-element-item--danger' : undefined),
                    actions: [
                        ...actions ?? [],
                        ...initialTreeItem.key !== (structure === null || structure === void 0 ? void 0 : structure.id) && !isCustomLayout ? [
                            {
                                key: 'copy',
                                icon: 'copy'
                            }
                        ] : [],
                        ...!isCustomLayout && copiedPath !== undefined && isValidChildFieldDefinition(currentPath, copiedPath) ? [
                            {
                                key: 'paste',
                                icon: 'paste'
                            }
                        ] : [],
                        ...!isCustomLayout && copiedPath === undefined && globalCopiedLayout !== undefined && isValidExternalChildFieldDefinition(currentPath, globalCopiedLayout) ? [
                            {
                                key: 'paste',
                                icon: 'paste'
                            }
                        ] : [],
                        ...initialTreeItem.key !== (structure === null || structure === void 0 ? void 0 : structure.id) ? [
                            {
                                key: 'delete',
                                icon: 'trash'
                            }
                        ] : []
                    ]
                };
            }
        });
        return [
            treeItems
        ];
    }, [
        structure,
        fieldDefinitions,
        invalidFieldDefinitionIds,
        copiedPath,
        isValidChildFieldDefinition,
        globalCopiedLayout,
        isValidExternalChildFieldDefinition
    ]);
    const onActionsClick = (nodeKey, actionKey, node)=>{
        if (actionKey === 'clone') {
            const clonedNodeId = cloneFieldDefinition(nodeKey);
            pendingClonedNodeIdRef.current = clonedNodeId;
        }
        if (actionKey === 'delete') {
            removeFieldDefinition(nodeKey);
        }
        if (actionKey === 'copy') {
            var _node_meta;
            copyFieldDefinition(((_node_meta = node.meta) === null || _node_meta === void 0 ? void 0 : _node_meta.currentPath) ?? []);
        }
        if (actionKey === 'paste') {
            if (copiedPath !== undefined) {
                var _node_meta1;
                pasteFieldDefinition(((_node_meta1 = node.meta) === null || _node_meta1 === void 0 ? void 0 : _node_meta1.currentPath) ?? []);
            } else if (globalCopiedLayout !== undefined) {
                var _node_meta2;
                const newNode = addExternalFieldDefinition(nodeKey, globalCopiedLayout);
                const keysToExpand = getAllKeys(newNode);
                if (keysToExpand.length > 0) {
                    setExpandedKeys((prev)=>{
                        const newKeys = [
                            ...new Set([
                                ...prev,
                                ...keysToExpand
                            ])
                        ];
                        expandedKeysRef.current = newKeys;
                        return newKeys;
                    });
                }
                expandNode(nodeKey);
                setCurrentFieldDefinitionId(newNode.id);
                setCurrentFieldDefinitionIdPath([
                    ...((_node_meta2 = node.meta) === null || _node_meta2 === void 0 ? void 0 : _node_meta2.currentPath) ?? [],
                    newNode.id
                ]);
                setDetailView('layout');
            }
        }
        if (actionKey.startsWith('add-')) {
            var _node_meta3, _node_meta4;
            const typeId = actionKey.replace('add-', '');
            const type = fieldDefinitionRegistry.getDynamicType(typeId);
            const newFieldDefData = type.getDefaultData({
                area,
                path: ((_node_meta3 = node.meta) === null || _node_meta3 === void 0 ? void 0 : _node_meta3.currentPath) ?? [],
                fieldDefinitions
            });
            const newlyAddedFieldId = addFieldDefinition(nodeKey, newFieldDefData);
            setCurrentFieldDefinitionId(newlyAddedFieldId);
            setCurrentFieldDefinitionIdPath([
                ...(node === null || node === void 0 ? void 0 : (_node_meta4 = node.meta) === null || _node_meta4 === void 0 ? void 0 : _node_meta4.currentPath) ?? [],
                newlyAddedFieldId
            ]);
            setDetailView('layout');
            expandNode(nodeKey);
        }
        if (actionKey.startsWith('convert-')) {
            var _node_meta5, _node_meta6, _node_meta7;
            const typeId = actionKey.replace('convert-', '');
            const type = fieldDefinitionRegistry.getDynamicType(typeId);
            const existingFieldDef = fieldDefinitions[nodeKey];
            const convertibleData = type.getConvertibleData({
                area,
                path: ((_node_meta5 = node.meta) === null || _node_meta5 === void 0 ? void 0 : _node_meta5.currentPath) ?? [],
                fieldDefinitions,
                newTypeId: typeId
            });
            const defaultData = type.getDefaultData({
                area,
                path: ((_node_meta6 = node.meta) === null || _node_meta6 === void 0 ? void 0 : _node_meta6.currentPath) ?? [],
                fieldDefinitions
            });
            const newData = {};
            for (const [key] of Object.entries(defaultData)){
                if (key in existingFieldDef) {
                    newData[key] = existingFieldDef[key];
                }
            }
            const mergedData = {
                ...defaultData,
                ...newData,
                ...convertibleData,
                fieldtype: typeId,
                children: []
            };
            setCurrentFieldDefinitionId(nodeKey);
            setCurrentFieldDefinitionIdPath(((_node_meta7 = node.meta) === null || _node_meta7 === void 0 ? void 0 : _node_meta7.currentPath) ?? null);
            updateFieldDefinition(nodeKey, mergedData, true);
            removeChildren(nodeKey);
        }
    };
    const onSelected = (key, node)=>{
        var _node_meta;
        if (key === (structure === null || structure === void 0 ? void 0 : structure.id)) {
            setCurrentFieldDefinitionId(null);
            setCurrentFieldDefinitionIdPath(null);
            return;
        }
        setCurrentFieldDefinitionId(key);
        setCurrentFieldDefinitionIdPath(((_node_meta = node.meta) === null || _node_meta === void 0 ? void 0 : _node_meta.currentPath) ?? null);
        setDetailView('layout');
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_6__.Content, {
        padded: true,
        padding: {
            y: 'small',
            x: 'mini'
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_6__.Content, {
                padded: true,
                padding: {
                    top: 'none',
                    x: 'extra-small'
                },
                style: {
                    height: 'fit-content',
                    flexShrink: 0
                },
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_6__.Space, {
                    className: "w-full",
                    direction: "vertical",
                    size: "none",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_6__.Button, {
                            className: "w-full",
                            onClick: ()=>{
                                setDetailView('general');
                                setCurrentFieldDefinitionId(null);
                                setCurrentFieldDefinitionIdPath(null);
                            },
                            style: {
                                backgroundColor: detailView === 'general' ? token.controlItemBgActive : undefined,
                                borderRadius: token.borderRadiusSM,
                                fontSize: token.fontSize,
                                height: '24px',
                                justifyContent: 'flex-start',
                                padding: `0 ${token.paddingXS}px`,
                                position: 'relative'
                            },
                            type: "text",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                    style: {
                                        paddingLeft: '16px'
                                    },
                                    children: t('field-definitions.general-settings')
                                }, void 0, false, {
                                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail/sidebar.tsx",
                                    lineNumber: 595,
                                    columnNumber: 13
                                }, undefined),
                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                    style: {
                                        position: 'absolute',
                                        right: '8px',
                                        top: '50%',
                                        transform: 'translateY(-50%)'
                                    },
                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_6__.Icon, {
                                        colorToken: "colorPrimary",
                                        value: "edit"
                                    }, void 0, false, {
                                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail/sidebar.tsx",
                                        lineNumber: 606,
                                        columnNumber: 15
                                    }, undefined)
                                }, void 0, false, {
                                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail/sidebar.tsx",
                                    lineNumber: 600,
                                    columnNumber: 13
                                }, undefined)
                            ]
                        }, void 0, true, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail/sidebar.tsx",
                            lineNumber: 582,
                            columnNumber: 11
                        }, undefined),
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_7__.Divider, {
                            style: {
                                margin: `${token.marginXS}px 0 0`
                            }
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail/sidebar.tsx",
                            lineNumber: 610,
                            columnNumber: 11
                        }, undefined)
                    ]
                }, void 0, true, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail/sidebar.tsx",
                    lineNumber: 581,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail/sidebar.tsx",
                lineNumber: 574,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_6__.Content, {
                overflow: {
                    x: 'hidden',
                    y: 'auto'
                },
                style: {
                    minHeight: 0,
                    flex: 1
                },
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_6__.TreeElement, {
                    defaultExpandedKeys: expandedKeys,
                    onActionsClick: onActionsClick,
                    onExpand: handleExpand,
                    onSelected: onSelected,
                    selectedKeys: currentFieldDefinitionId !== null ? [
                        currentFieldDefinitionId
                    ] : [],
                    titleRender: titleRender,
                    treeData: items
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail/sidebar.tsx",
                    lineNumber: 623,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail/sidebar.tsx",
                lineNumber: 616,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/detail/sidebar.tsx",
        lineNumber: 570,
        columnNumber: 10
    }, undefined);
};
_s(DetailSidebar, "8fdUgbt63GtvOnsLDt2KMrKDNFM=", true, function() {
    return [
        _Pimcore_modules_field_definitions_components_editor_settings_provider__WEBPACK_IMPORTED_MODULE_3__.useSettings,
        _Pimcore_modules_field_definitions_components_editor_items_provider__WEBPACK_IMPORTED_MODULE_2__.useItems,
        react_i18next__WEBPACK_IMPORTED_MODULE_10__.useTranslation,
        antd__WEBPACK_IMPORTED_MODULE_7__.theme.useToken,
        _Pimcore_modules_field_definitions_components_editor_area_provider__WEBPACK_IMPORTED_MODULE_1__.useArea,
        _Pimcore_modules_field_definitions_components_editor_settings_provider__WEBPACK_IMPORTED_MODULE_3__.useSettings,
        _Pimcore_modules_field_definitions_utils_global_clipboard__WEBPACK_IMPORTED_MODULE_5__.useGlobalFieldDefinitionClipboard
    ];
});
_c = DetailSidebar;
var _c;
$RefreshReg$(_c, "DetailSidebar");

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
"./js/src/core/modules/field-definitions/components/editor/items/provider.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ItemsContext: () => (ItemsContext),
  ItemsProvider: () => (ItemsProvider),
  useItems: () => (useItems)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
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
var _s = $RefreshSig$(), _s1 = $RefreshSig$();

const ItemsContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(undefined);
const ItemsProvider = (props)=>{
    _s();
    const [configurations, setConfigurations] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [activeConfiguration, setActiveConfigurationInternal] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(undefined);
    const [detailView, setDetailView] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('general');
    const closeActiveConfiguration = ()=>{
        if (activeConfiguration === undefined) {
            return;
        }
        setConfigurations((prevConfigs)=>{
            return prevConfigs.filter((cd)=>cd.id !== activeConfiguration.id);
        });
        if (configurations.length > 1) {
            const currentIndex = configurations.findIndex((cd)=>cd.id === activeConfiguration.id);
            const nextIndex = currentIndex === configurations.length - 1 ? currentIndex - 1 : currentIndex + 1;
            setActiveConfigurationInternal(configurations[nextIndex]);
            return;
        }
        setActiveConfigurationInternal(undefined);
    };
    const setActiveConfiguration = (config)=>{
        if (configurations.find((cd)=>cd.id === config.id) === undefined) {
            openConfiguration(config);
            return;
        }
        setActiveConfigurationInternal(config);
    };
    const openConfiguration = (config)=>{
        setConfigurations((prevConfigs)=>{
            if (prevConfigs.find((cd)=>cd.id === config.id) !== undefined) {
                return prevConfigs;
            }
            return [
                ...prevConfigs,
                config
            ];
        });
        setActiveConfigurationInternal(config);
        setDetailView('general');
    };
    const closeConfiguration = (config)=>{
        if ((activeConfiguration === null || activeConfiguration === void 0 ? void 0 : activeConfiguration.id) === config.id) {
            closeActiveConfiguration();
        }
        setConfigurations((prevConfigs)=>{
            return prevConfigs.filter((cd)=>cd.id !== config.id);
        });
    };
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(ItemsContext.Provider, {
            value: {
                configurations,
                closeConfiguration,
                openConfiguration,
                activeConfiguration,
                setActiveConfiguration,
                closeActiveConfiguration,
                detailView,
                setDetailView
            },
            children: props.children
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/provider.tsx",
            lineNumber: 58,
            columnNumber: 12
        }, undefined);
    }, [
        props.children,
        configurations,
        activeConfiguration,
        detailView
    ]);
};
_s(ItemsProvider, "TLspD1qsDI+wcKCtlxfLvvHBPYU=");
_c = ItemsProvider;
const useItems = ()=>{
    _s1();
    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(ItemsContext);
    if (context === undefined) {
        throw new Error('useItems must be used within a ItemsProvider');
    }
    return context;
};
_s1(useItems, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
$RefreshReg$(_c, "ItemsProvider");

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
"./js/src/core/modules/field-definitions/components/editor/items/sidebar.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ItemsSidebar: () => (ItemsSidebar)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_modules_field_definitions_components_editor_items_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/field-definitions/components/editor/items/provider.tsx");
/* ESM import */var _Pimcore_modules_field_definitions_components_editor_items_sidebar_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/field-definitions/components/editor/items/sidebar.styles.ts");
/* ESM import */var _Pimcore_modules_field_definitions_components_editor_items_sidebar_add_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/field-definitions/components/editor/items/sidebar/add-modal.tsx");
/* ESM import */var _Pimcore_modules_field_definitions_components_editor_items_sidebar_modal_holder__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/field-definitions/components/editor/items/sidebar/modal-holder.tsx");
/* ESM import */var _Pimcore_modules_field_definitions_components_editor_settings_provider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/field-definitions/components/editor/settings-provider.tsx");
/* ESM import */var _sdk_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/sdk/components/index.ts");
/* ESM import */var _sdk_modules_app__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/sdk/modules/app/index.ts");
/* ESM import */var _sdk_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/sdk/utils/index.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_9__);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_10__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_11__);
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
var _s = $RefreshSig$();











// A stable no-op hook used when useItemsDeleteMutation is not provided
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useNoOpDeleteMutation = ()=>[
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async ()=>{},
        {}
    ];
const ItemsSidebar = ()=>{
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_11__.useTranslation)();
    const { styles } = (0,_Pimcore_modules_field_definitions_components_editor_items_sidebar_styles__WEBPACK_IMPORTED_MODULE_2__.useStyles)();
    const { useItemsQuery, useItemsDeleteMutation, AddModal } = (0,_Pimcore_modules_field_definitions_components_editor_settings_provider__WEBPACK_IMPORTED_MODULE_5__.useSettings)();
    const { isLoading, isFetching, data, refetch } = useItemsQuery();
    const deleteMutationHook = useItemsDeleteMutation ?? useNoOpDeleteMutation;
    const [deleteConfigurationMutation] = deleteMutationHook();
    const canDelete = useItemsDeleteMutation !== undefined;
    const canCreate = AddModal !== undefined;
    const [searchTerm, setSearchTerm] = (0,react__WEBPACK_IMPORTED_MODULE_10__.useState)('');
    const debouncedSearchTerm = (0,_sdk_utils__WEBPACK_IMPORTED_MODULE_8__.useDebounce)(searchTerm, 300);
    const [showNewModal, setShowNewModal] = (0,react__WEBPACK_IMPORTED_MODULE_10__.useState)(false);
    const { setActiveConfiguration, activeConfiguration, closeConfiguration } = (0,_Pimcore_modules_field_definitions_components_editor_items_provider__WEBPACK_IMPORTED_MODULE_1__.useItems)();
    const treeData = (0,react__WEBPACK_IMPORTED_MODULE_10__.useMemo)(()=>{
        if (data === undefined) {
            return [];
        }
        const formattedTreeData = [];
        const groupMap = {};
        const filteredData = data.items.filter((configuration)=>{
            if (debouncedSearchTerm === '') {
                return true;
            }
            return configuration.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) || configuration.id.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
        });
        filteredData.forEach((configuration)=>{
            const groupName = configuration.group;
            if ((0,lodash__WEBPACK_IMPORTED_MODULE_9__.isNil)(groupName) || groupName === '') {
                formattedTreeData.push({
                    title: configuration.name !== '' && configuration.name !== undefined && configuration.name !== configuration.id ? `${configuration.name} (${configuration.id})` : `${configuration.id}`,
                    key: `${configuration.id}`,
                    icon: configuration.icon !== undefined ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_6__.Icon, {
                        ...configuration.icon
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/sidebar.tsx",
                        lineNumber: 75,
                        columnNumber: 52
                    }, undefined) : undefined,
                    meta: {
                        configuration
                    },
                    actions: canDelete ? [
                        {
                            key: 'delete',
                            icon: 'delete'
                        }
                    ] : []
                });
                return;
            }
            if (groupMap[groupName] === undefined) {
                groupMap[groupName] = {
                    title: groupName,
                    key: `group-${groupName}`,
                    icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_6__.Icon, {
                        value: "folder"
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/sidebar.tsx",
                        lineNumber: 90,
                        columnNumber: 17
                    }, undefined),
                    children: []
                };
                formattedTreeData.push(groupMap[groupName]);
            }
            const treeDataItem = {
                title: configuration.name !== '' && configuration.name !== undefined && configuration.name !== configuration.id ? `${configuration.name} (${configuration.id})` : `${configuration.id}`,
                key: `${configuration.id}`,
                icon: configuration.icon !== undefined ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_6__.Icon, {
                    ...configuration.icon
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/sidebar.tsx",
                    lineNumber: 98,
                    columnNumber: 50
                }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_6__.Icon, {
                    value: "class"
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/sidebar.tsx",
                    lineNumber: 98,
                    columnNumber: 85
                }, undefined),
                meta: {
                    configuration
                },
                actions: canDelete ? [
                    {
                        key: 'delete',
                        icon: 'delete'
                    }
                ] : []
            };
            groupMap[groupName].children.push(treeDataItem);
        });
        formattedTreeData.sort((a, b)=>{
            var _a_children, _b_children, _a_children1, _b_children1;
            if ((((_a_children = a.children) === null || _a_children === void 0 ? void 0 : _a_children.length) ?? 0) !== 0 && (((_b_children = b.children) === null || _b_children === void 0 ? void 0 : _b_children.length) ?? 0) === 0) {
                return -1;
            }
            if ((((_a_children1 = a.children) === null || _a_children1 === void 0 ? void 0 : _a_children1.length) ?? 0) === 0 && (((_b_children1 = b.children) === null || _b_children1 === void 0 ? void 0 : _b_children1.length) ?? 0) !== 0) {
                return 1;
            }
            return 0;
        });
        return formattedTreeData;
    }, [
        data,
        debouncedSearchTerm
    ]);
    const expandedKeys = (0,react__WEBPACK_IMPORTED_MODULE_10__.useMemo)(()=>{
        return debouncedSearchTerm !== '' ? treeData.map((item)=>item.key) : [];
    }, [
        treeData,
        debouncedSearchTerm
    ]);
    const deleteConfiguration = (node)=>{
        const configuration = node.meta.configuration;
        closeConfiguration(configuration);
        deleteConfigurationMutation({
            id: configuration.id
        }).catch((err)=>{
            (0,_sdk_modules_app__WEBPACK_IMPORTED_MODULE_7__.trackError)(new _sdk_modules_app__WEBPACK_IMPORTED_MODULE_7__.ApiError(err));
        });
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_field_definitions_components_editor_items_sidebar_add_modal__WEBPACK_IMPORTED_MODULE_3__.AddModalProvider, {
        onOpenChange: setShowNewModal,
        open: showNewModal,
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_field_definitions_components_editor_items_sidebar_modal_holder__WEBPACK_IMPORTED_MODULE_4__.SidebarModalHolder, {}, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/sidebar.tsx",
                lineNumber: 133,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_6__.ContentLayout, {
                renderToolbar: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_6__.Toolbar, {
                    children: [
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_6__.IconButton, {
                            icon: {
                                value: 'refresh'
                            },
                            onClick: refetch
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/sidebar.tsx",
                            lineNumber: 136,
                            columnNumber: 13
                        }, void 0),
                        canCreate && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_6__.IconTextButton, {
                            icon: {
                                value: 'new'
                            },
                            onClick: ()=>{
                                setShowNewModal(true);
                            },
                            type: "link",
                            children: t('new')
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/sidebar.tsx",
                            lineNumber: 140,
                            columnNumber: 27
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/sidebar.tsx",
                    lineNumber: 135,
                    columnNumber: 37
                }, void 0),
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_6__.Content, {
                    loading: isLoading,
                    padded: true,
                    children: [
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_6__.SearchInput, {
                            onChange: (e)=>{
                                setSearchTerm(e.target.value);
                            },
                            placeholder: t('search'),
                            value: searchTerm,
                            withoutAddon: true
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/sidebar.tsx",
                            lineNumber: 149,
                            columnNumber: 11
                        }, undefined),
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_6__.Content, {
                            loading: isFetching,
                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_6__.TreeElement, {
                                className: styles.tree,
                                defaultExpandedKeys: expandedKeys,
                                onActionsClick: (key, action, node)=>{
                                    if (action === 'delete') {
                                        deleteConfiguration(node);
                                    }
                                },
                                onSelected: (key, node)=>{
                                    setActiveConfiguration(node.meta.configuration);
                                },
                                selectedKeys: activeConfiguration !== undefined ? [
                                    activeConfiguration.id
                                ] : undefined,
                                treeData: treeData
                            }, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/sidebar.tsx",
                                lineNumber: 154,
                                columnNumber: 13
                            }, undefined)
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/sidebar.tsx",
                            lineNumber: 153,
                            columnNumber: 11
                        }, undefined)
                    ]
                }, void 0, true, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/sidebar.tsx",
                    lineNumber: 148,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/sidebar.tsx",
                lineNumber: 135,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/sidebar.tsx",
        lineNumber: 132,
        columnNumber: 10
    }, undefined);
};
_s(ItemsSidebar, "Gkq79Nph6UKtbCeawydPH+BjJLI=", true, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_11__.useTranslation,
        _Pimcore_modules_field_definitions_components_editor_items_sidebar_styles__WEBPACK_IMPORTED_MODULE_2__.useStyles,
        _Pimcore_modules_field_definitions_components_editor_settings_provider__WEBPACK_IMPORTED_MODULE_5__.useSettings,
        _sdk_utils__WEBPACK_IMPORTED_MODULE_8__.useDebounce,
        _Pimcore_modules_field_definitions_components_editor_items_provider__WEBPACK_IMPORTED_MODULE_1__.useItems
    ];
});
_c = ItemsSidebar;
var _c;
$RefreshReg$(_c, "ItemsSidebar");

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
"./js/src/core/modules/field-definitions/components/editor/items/sidebar/add-modal.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  AddModal: () => (AddModal),
  AddModalContext: () => (AddModalContext),
  AddModalProvider: () => (AddModalProvider),
  useAddModal: () => (useAddModal)
});
/* ESM import */var _Pimcore_components_modal_factory_modal_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/components/modal/factory/modal-factory.tsx");
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
const { Modal: AddModal, Provider: AddModalProvider, context: AddModalContext, useModal: useAddModal } = (0,_Pimcore_components_modal_factory_modal_factory__WEBPACK_IMPORTED_MODULE_0__.create)({
    defaultProps: {
        title: 'Missing title'
    }
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
"./js/src/core/modules/field-definitions/components/editor/items/sidebar/modal-holder.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SidebarModalHolder: () => (SidebarModalHolder)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_modules_field_definitions_components_editor_items_sidebar_add_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/field-definitions/components/editor/items/sidebar/add-modal.tsx");
/* ESM import */var _Pimcore_modules_field_definitions_components_editor_settings_provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/field-definitions/components/editor/settings-provider.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
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
var _s = $RefreshSig$();



const SidebarModalHolder = ()=>{
    _s();
    const { open } = (0,_Pimcore_modules_field_definitions_components_editor_items_sidebar_add_modal__WEBPACK_IMPORTED_MODULE_1__.useAddModal)();
    const { AddModal } = (0,_Pimcore_modules_field_definitions_components_editor_settings_provider__WEBPACK_IMPORTED_MODULE_2__.useSettings)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: open && AddModal !== undefined && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AddModal, {}, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/sidebar/modal-holder.tsx",
            lineNumber: 22,
            columnNumber: 42
        }, undefined)
    }, void 0, false);
};
_s(SidebarModalHolder, "GAIS7t0+IthpbnSjdhfZvBLBDnY=", false, function() {
    return [
        _Pimcore_modules_field_definitions_components_editor_items_sidebar_add_modal__WEBPACK_IMPORTED_MODULE_1__.useAddModal,
        _Pimcore_modules_field_definitions_components_editor_settings_provider__WEBPACK_IMPORTED_MODULE_2__.useSettings
    ];
});
_c = SidebarModalHolder;
var _c;
$RefreshReg$(_c, "SidebarModalHolder");

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
"./js/src/core/modules/field-definitions/components/editor/items/tabs.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ItemsTabs: () => (ItemsTabs)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_modules_field_definitions_components_editor_items_detail__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/field-definitions/components/editor/items/detail.tsx");
/* ESM import */var _Pimcore_modules_field_definitions_components_editor_items_provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/field-definitions/components/editor/items/provider.tsx");
/* ESM import */var _sdk_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/sdk/components/index.ts");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
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
var _s = $RefreshSig$();




const ItemsTabs = ()=>{
    _s();
    const { configurations, activeConfiguration, setActiveConfiguration, closeConfiguration } = (0,_Pimcore_modules_field_definitions_components_editor_items_provider__WEBPACK_IMPORTED_MODULE_2__.useItems)();
    const items = configurations.map((configuration)=>({
            key: `${configuration.id}`,
            label: configuration.name !== '' && configuration.name !== undefined && configuration.name !== configuration.id ? `${configuration.name} (${configuration.id})` : `${configuration.id}`,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_3__.Icon, {
                ...configuration.icon ?? {
                    value: 'class'
                }
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/tabs.tsx",
                lineNumber: 25,
                columnNumber: 11
            }, undefined),
            closable: true,
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_field_definitions_components_editor_items_detail__WEBPACK_IMPORTED_MODULE_1__.ItemDetail, {
                configuration: configuration
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/tabs.tsx",
                lineNumber: 29,
                columnNumber: 15
            }, undefined)
        }));
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_3__.Tabs, {
        activeKey: (activeConfiguration === null || activeConfiguration === void 0 ? void 0 : activeConfiguration.id) ?? undefined,
        fullHeight: true,
        items: items,
        onChange: (configurationKey)=>{
            const configuration = configurations.find((cd)=>cd.id === configurationKey);
            if (configuration !== undefined) {
                setActiveConfiguration(configuration);
            }
        },
        onClose: (configurationKey)=>{
            const configuration = configurations.find((cd)=>cd.id === configurationKey);
            if (configuration !== undefined) {
                closeConfiguration(configuration);
            }
        }
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/items/tabs.tsx",
        lineNumber: 31,
        columnNumber: 10
    }, undefined);
};
_s(ItemsTabs, "bH60YFJ4I2P1Bw6rmDjisQoKn7Y=", false, function() {
    return [
        _Pimcore_modules_field_definitions_components_editor_items_provider__WEBPACK_IMPORTED_MODULE_2__.useItems
    ];
});
_c = ItemsTabs;
var _c;
$RefreshReg$(_c, "ItemsTabs");

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
"./js/src/core/modules/field-definitions/components/editor/settings-provider.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SettingsContext: () => (SettingsContext),
  SettingsProvider: () => (SettingsProvider),
  useSettings: () => (useSettings)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_modules_field_definitions_components_editor_items_detail_layout_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/field-definitions/components/editor/items/detail/layout-provider.tsx");
/* ESM import */var _sdk_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/sdk/app/index.ts");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
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
var _s = $RefreshSig$(), _s1 = $RefreshSig$();



const SettingsContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_3__.createContext)(undefined);
const SettingsProvider = (props)=>{
    _s();
    const { children, LayoutProvider = _Pimcore_modules_field_definitions_components_editor_items_detail_layout_provider__WEBPACK_IMPORTED_MODULE_1__.LayoutProvider, useLayout = _Pimcore_modules_field_definitions_components_editor_items_detail_layout_provider__WEBPACK_IMPORTED_MODULE_1__.useLayout, ...rest } = props;
    const defaultRegistry = (0,_sdk_app__WEBPACK_IMPORTED_MODULE_2__.useInjection)(_sdk_app__WEBPACK_IMPORTED_MODULE_2__.serviceIds["DynamicTypes/FieldDefinitionRegistry"]);
    const fieldDefinitionRegistry = props.fieldDefinitionRegistry ?? defaultRegistry;
    const providerProps = (0,react__WEBPACK_IMPORTED_MODULE_3__.useMemo)(()=>({
            LayoutProvider,
            useLayout,
            fieldDefinitionRegistry,
            ...rest
        }), [
        LayoutProvider,
        useLayout,
        fieldDefinitionRegistry,
        rest
    ]);
    return (0,react__WEBPACK_IMPORTED_MODULE_3__.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(SettingsContext.Provider, {
            value: providerProps,
            children: children
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/settings-provider.tsx",
            lineNumber: 30,
            columnNumber: 24
        }, undefined), [
        children,
        providerProps
    ]);
};
_s(SettingsProvider, "wqm3/fKi4WVniXekpqut6gGa7CI=", false, function() {
    return [
        _sdk_app__WEBPACK_IMPORTED_MODULE_2__.useInjection
    ];
});
_c = SettingsProvider;
const useSettings = ()=>{
    _s1();
    const context = (0,react__WEBPACK_IMPORTED_MODULE_3__.useContext)(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};
_s1(useSettings, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
$RefreshReg$(_c, "SettingsProvider");

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
"./js/src/core/modules/field-definitions/components/editor/view.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  EditorView: () => (EditorView)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_modules_field_definitions_components_editor_items_sidebar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/field-definitions/components/editor/items/sidebar.tsx");
/* ESM import */var _Pimcore_modules_field_definitions_components_editor_items_tabs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/field-definitions/components/editor/items/tabs.tsx");
/* ESM import */var _sdk_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/sdk/components/index.ts");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
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




const EditorView = ()=>{
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_3__.ConfigLayout, {
        leftItem: {
            minSize: 250,
            maxSize: 350,
            size: 250,
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_field_definitions_components_editor_items_sidebar__WEBPACK_IMPORTED_MODULE_1__.ItemsSidebar, {}, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/view.tsx",
                lineNumber: 20,
                columnNumber: 15
            }, void 0)
        },
        resizeAble: true,
        rightItem: {
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_field_definitions_components_editor_items_tabs__WEBPACK_IMPORTED_MODULE_2__.ItemsTabs, {}, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/view.tsx",
                lineNumber: 22,
                columnNumber: 15
            }, void 0)
        }
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/components/editor/view.tsx",
        lineNumber: 16,
        columnNumber: 10
    }, undefined);
};
_c = EditorView;
var _c;
$RefreshReg$(_c, "EditorView");

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
"./js/src/core/modules/field-definitions/dynamic-types/dynamic-type-field-definition-abstract.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DynamicTypeFieldDefinitionAbstract: () => (DynamicTypeFieldDefinitionAbstract)
});
/* ESM import */var _sdk_modules_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/sdk/modules/element/index.ts");
/* ESM import */var _sdk_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/sdk/app/index.ts");
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

class DynamicTypeFieldDefinitionAbstract extends _sdk_modules_element__WEBPACK_IMPORTED_MODULE_0__.DynamicTypeAbstract {
    getIcon() {
        return {
            type: 'name',
            value: 'questionmark'
        };
    }
    getTags(props) {
        return [
            this.id
        ];
    }
    getAllowedChildTags(props) {
        return [];
    }
    getDisallowedRecursiveChildTags(props) {
        return [];
    }
    getConvertibleTags(props) {
        return [];
    }
    getDropdownTags(props) {
        const isCustomLayout = props.area.includes('custom-layout');
        if (isCustomLayout) {
            return [
                'group:layout'
            ];
        }
        return this.getAllowedChildTags(props);
    }
    getValidChildTags(props) {
        const allowedChildTags = this.getAllowedChildTags(props);
        const validChildTags = this.computeValidTags(allowedChildTags, props);
        return validChildTags;
    }
    getValidConvertibleTags(props) {
        const convertibleTags = this.getConvertibleTags(props);
        const validConvertibleTags = this.computeValidTags(convertibleTags, props).filter((tag)=>tag !== this.id);
        return validConvertibleTags;
    }
    getValidDropdownTags(props) {
        const dropdownTags = this.getDropdownTags(props);
        const validDropdownTags = this.computeValidTags(dropdownTags, props);
        return validDropdownTags;
    }
    isValid(data, context) {
        return true;
    }
    opensNamespace() {
        return false;
    }
    getConvertibleData(context) {
        return {};
    }
    getAdditionalFormFields(context) {
        return null;
    }
    computeValidTags(tags, context) {
        const { path, fieldDefinitions } = context;
        const usedFieldDefinitions = path.map((pathItem)=>fieldDefinitions[pathItem]);
        const fieldDefinitionRegistry = _sdk_app__WEBPACK_IMPORTED_MODULE_1__.container.get(_sdk_app__WEBPACK_IMPORTED_MODULE_1__.serviceIds["DynamicTypes/FieldDefinitionRegistry"]);
        const blockedTags = [];
        usedFieldDefinitions.forEach((usedFieldDefinition)=>{
            if (usedFieldDefinition !== undefined) {
                var _fieldDefinitionRegistry_getDynamicType;
                const disallowedTags = ((_fieldDefinitionRegistry_getDynamicType = fieldDefinitionRegistry.getDynamicType(usedFieldDefinition.fieldtype, false)) === null || _fieldDefinitionRegistry_getDynamicType === void 0 ? void 0 : _fieldDefinitionRegistry_getDynamicType.getDisallowedRecursiveChildTags({
                    ...context
                })) ?? [];
                blockedTags.push(...disallowedTags);
            }
        });
        const allowedChildTags = tags;
        const resolvedBlockedTags = fieldDefinitionRegistry.getTypesByTags(blockedTags, context).map((type)=>type.id);
        const resolvedAllowedChildTags = fieldDefinitionRegistry.getTypesByTags(allowedChildTags, context).map((type)=>type.id);
        const validChildTags = resolvedAllowedChildTags.filter((tag)=>!resolvedBlockedTags.includes(tag));
        return validChildTags;
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
"./js/src/core/modules/field-definitions/dynamic-types/dynamic-type-field-definition-registry.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DynamicTypeFieldDefinitionRegistry: () => (DynamicTypeFieldDefinitionRegistry)
});
/* ESM import */var _sdk_modules_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/sdk/modules/element/index.ts");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(inversify__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
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


let DynamicTypeFieldDefinitionRegistry = (_dec = (0,inversify__WEBPACK_IMPORTED_MODULE_1__.injectable)(), _dec(_class = class DynamicTypeFieldDefinitionRegistry extends _sdk_modules_element__WEBPACK_IMPORTED_MODULE_0__.DynamicTypeRegistryAbstract {
    getTypesByTags(tags, context) {
        return this.getDynamicTypes().filter((type)=>{
            const typeTags = type.getTags(context);
            return tags.some((tag)=>typeTags.includes(tag));
        });
    }
    resolveTags(tags, context) {
        const types = this.getTypesByTags(tags, context);
        return (0,lodash__WEBPACK_IMPORTED_MODULE_2__.uniq)(types.map((type)=>type.id));
    }
    getDropdownGroupInfos() {
        return {
            layout: {
                icon: {
                    value: 'new-layout',
                    type: 'name'
                },
                translationKey: 'field-definition.groups.layout'
            },
            'layout/panel': {
                icon: {
                    value: 'panel',
                    type: 'name'
                },
                translationKey: 'field-definition.groups.layout.panel'
            },
            'layout/accordion': {
                icon: {
                    value: 'accordion',
                    type: 'name'
                },
                translationKey: 'field-definition.groups.layout.accordion'
            },
            'layout/fieldset': {
                icon: {
                    value: 'fieldset',
                    type: 'name'
                },
                translationKey: 'field-definition.groups.layout.fieldset'
            },
            'layout/fieldcontainer': {
                icon: {
                    value: 'field-container',
                    type: 'name'
                },
                translationKey: 'field-definition.groups.layout.fieldcontainer'
            },
            'layout/iframe': {
                icon: {
                    value: 'iframe',
                    type: 'name'
                },
                translationKey: 'field-definition.groups.layout.iframe'
            },
            'layout/region': {
                icon: {
                    value: 'region',
                    type: 'name'
                },
                translationKey: 'field-definition.groups.layout.region'
            },
            'layout/tabpanel': {
                icon: {
                    value: 'tabpanel',
                    type: 'name'
                },
                translationKey: 'field-definition.groups.layout.tabpanel'
            },
            'layout/text': {
                icon: {
                    value: 'text',
                    type: 'name'
                },
                translationKey: 'field-definition.groups.layout.text'
            },
            data: {
                icon: {
                    value: 'new-data-component',
                    type: 'name'
                },
                translationKey: 'field-definition.groups.data'
            },
            'data/text': {
                icon: {
                    value: 'content',
                    type: 'name'
                },
                translationKey: 'field-definition.groups.data.text',
                order: 100
            },
            'data/numeric': {
                icon: {
                    value: 'number-type',
                    type: 'name'
                },
                translationKey: 'field-definition.groups.data.numeric',
                order: 200
            },
            'data/date': {
                icon: {
                    value: 'date',
                    type: 'name'
                },
                translationKey: 'field-definition.groups.data.date',
                order: 300
            },
            'data/select': {
                icon: {
                    value: 'select-type',
                    type: 'name'
                },
                translationKey: 'field-definition.groups.data.select',
                order: 400
            },
            'data/media': {
                icon: {
                    value: 'media',
                    type: 'name'
                },
                translationKey: 'field-definition.groups.data.media',
                order: 500
            },
            'data/relation': {
                icon: {
                    value: 'relation',
                    type: 'name'
                },
                translationKey: 'field-definition.groups.data.relation',
                order: 600
            },
            'data/geo': {
                icon: {
                    value: 'location-marker',
                    type: 'name'
                },
                translationKey: 'field-definition.groups.data.geographic',
                order: 700
            },
            'data/crm': {
                icon: {
                    value: 'crm',
                    type: 'name'
                },
                translationKey: 'field-definition.groups.data.crm',
                order: 800
            },
            'data/structured': {
                icon: {
                    value: 'batch-selection',
                    type: 'name'
                },
                translationKey: 'field-definition.groups.data.structured',
                order: 900
            },
            'data/other': {
                icon: {
                    value: 'other',
                    type: 'name'
                },
                translationKey: 'field-definition.groups.data.other',
                order: 1000
            }
        };
    }
    buildGroupedActions(types, actionKeyPrefix) {
        const groupInfos = this.getDropdownGroupInfos();
        const actions = [];
        const groupedTypes = {};
        types.forEach((type)=>{
            const groupKey = type.getGroup().join('/');
            if ((0,lodash__WEBPACK_IMPORTED_MODULE_2__.isNil)(groupedTypes[groupKey])) {
                groupedTypes[groupKey] = [];
            }
            groupedTypes[groupKey].push(type);
        });
        const sortedGroupPaths = Object.keys(groupedTypes).sort((a, b)=>{
            var _groupInfos_a, _groupInfos_b;
            const orderA = ((_groupInfos_a = groupInfos[a]) === null || _groupInfos_a === void 0 ? void 0 : _groupInfos_a.order) ?? Infinity;
            const orderB = ((_groupInfos_b = groupInfos[b]) === null || _groupInfos_b === void 0 ? void 0 : _groupInfos_b.order) ?? Infinity;
            return orderA - orderB;
        });
        for (const groupPath of sortedGroupPaths){
            const groupParts = groupPath.split('/');
            let currentActions = actions;
            let currentGroupPath = '';
            groupParts.forEach((group, index)=>{
                currentGroupPath = index === 0 ? group : `${currentGroupPath}/${group}`;
                const groupKey = `group-${group}`;
                const groupMenuKey = `${actionKeyPrefix}group-${group}`;
                const isRootLevel = currentActions === actions;
                let action = currentActions.find((a)=>a.key === groupKey);
                if ((0,lodash__WEBPACK_IMPORTED_MODULE_2__.isNil)(action)) {
                    var _groupInfos_currentGroupPath, _groupInfos_currentGroupPath1;
                    const baseTranslationKey = (_groupInfos_currentGroupPath = groupInfos[currentGroupPath]) === null || _groupInfos_currentGroupPath === void 0 ? void 0 : _groupInfos_currentGroupPath.translationKey;
                    const shouldAddPrefix = isRootLevel && baseTranslationKey !== undefined && actionKeyPrefix !== 'convert-';
                    const groupTranslationKey = shouldAddPrefix ? `${baseTranslationKey}.with-prefix.${actionKeyPrefix.replace('-', '')}` : baseTranslationKey;
                    action = {
                        key: groupKey,
                        menuKey: groupMenuKey,
                        icon: ((_groupInfos_currentGroupPath1 = groupInfos[currentGroupPath]) === null || _groupInfos_currentGroupPath1 === void 0 ? void 0 : _groupInfos_currentGroupPath1.icon.value) ?? '',
                        iconColorGroup: [
                            'fieldDefinition_group_' + group,
                            'fieldDefinition'
                        ],
                        translationKey: groupTranslationKey,
                        actions: []
                    };
                    currentActions.push(action);
                }
                if (index === groupParts.length - 1) {
                    groupedTypes[groupPath].forEach((type)=>{
                        const isTypeAtRoot = action.actions.length === 0 && isRootLevel;
                        const baseTypeTranslationKey = `field-definition.${(0,lodash__WEBPACK_IMPORTED_MODULE_2__.kebabCase)(type.id)}`;
                        const typeTranslationKey = isTypeAtRoot && actionKeyPrefix !== 'convert-' ? `${baseTypeTranslationKey}.with-prefix.${actionKeyPrefix.replace('-', '')}` : baseTypeTranslationKey;
                        action.actions.push({
                            key: `${actionKeyPrefix}${type.id}`,
                            icon: type.getIcon().value,
                            iconColorGroup: [
                                'fieldDefinition_' + type.id,
                                'fieldDefinition'
                            ],
                            translationKey: typeTranslationKey
                        });
                    });
                } else {
                    currentActions = action.actions;
                }
            });
        }
        return this.optimizeActions(actions, actionKeyPrefix, true) ?? [];
    }
    optimizeActions(actions, actionKeyPrefix) {
        let isRootLevel = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
        if ((0,lodash__WEBPACK_IMPORTED_MODULE_2__.isNil)(actions)) {
            return actions;
        }
        if (actions.length === 1 && !(0,lodash__WEBPACK_IMPORTED_MODULE_2__.isNil)(actions[0].actions) && actions[0].actions.length > 0) {
            // If it's a layout or data group at root level, don't promote its children (except for convert actions)
            if (isRootLevel && actionKeyPrefix !== 'convert-' && (actions[0].key === 'group-layout' || actions[0].key === 'group-data')) {
                actions[0].actions = this.optimizeActions(actions[0].actions, actionKeyPrefix, false);
                return actions;
            }
            const promotedActions = this.optimizeActions(actions[0].actions, actionKeyPrefix, isRootLevel);
            // Add prefix only to items being promoted to the absolute root level (and not for convert)
            if (isRootLevel && actionKeyPrefix !== 'convert-') {
                return promotedActions === null || promotedActions === void 0 ? void 0 : promotedActions.map((action)=>{
                    if (action.translationKey !== undefined && !action.translationKey.includes('.with-prefix.')) {
                        return {
                            ...action,
                            translationKey: `${action.translationKey}.with-prefix.${actionKeyPrefix.replace('-', '')}`
                        };
                    }
                    return action;
                });
            }
            return promotedActions;
        }
        const optimizedActions = [];
        actions.forEach((action)=>{
            if (!(0,lodash__WEBPACK_IMPORTED_MODULE_2__.isNil)(action.actions) && action.actions.length > 0) {
                action.actions = this.optimizeActions(action.actions, actionKeyPrefix, false);
            }
            if (!(0,lodash__WEBPACK_IMPORTED_MODULE_2__.isNil)(action.actions) && action.actions.length === 1) {
                // If it's a layout or data group, don't promote its only child (except for convert actions)
                if (actionKeyPrefix !== 'convert-' && (action.key === 'group-layout' || action.key === 'group-data')) {
                    optimizedActions.push(action);
                    return;
                }
                const childAction = action.actions[0];
                // Add prefix only when promoting to root level (and not for convert)
                if (isRootLevel && actionKeyPrefix !== 'convert-' && childAction.translationKey !== undefined && !childAction.translationKey.includes('.with-prefix.')) {
                    childAction.translationKey = `${childAction.translationKey}.with-prefix.${actionKeyPrefix.replace('-', '')}`;
                }
                optimizedActions.push(childAction);
            } else {
                optimizedActions.push(action);
            }
        });
        return optimizedActions.sort((a, b)=>{
            var _a_actions, _b_actions;
            const aHasChildren = (((_a_actions = a.actions) === null || _a_actions === void 0 ? void 0 : _a_actions.length) ?? 0) > 0;
            const bHasChildren = (((_b_actions = b.actions) === null || _b_actions === void 0 ? void 0 : _b_actions.length) ?? 0) > 0;
            if (aHasChildren === bHasChildren) {
                return 0;
            }
            return aHasChildren ? -1 : 1;
        });
    }
    getDropdownActions(context) {
        const { fieldDefinitions, path, area } = context;
        const fieldDefinition = fieldDefinitions[path.at(-1)];
        // @todo remove wrong type of fieldType when backend provides the right typo
        const dynType = this.getDynamicType(fieldDefinition.fieldType ?? fieldDefinition.fieldtype, false);
        if (dynType === undefined) {
            return [];
        }
        const isCustomLayout = area.includes('custom-layout');
        const isRoot = path.length === 1;
        const allowedDropdownTags = isRoot ? [
            'group:root'
        ] : dynType.getValidDropdownTags(context);
        const dropdownTagTypes = this.getTypesByTags(allowedDropdownTags, context);
        const actions = this.buildGroupedActions(dropdownTagTypes, 'add-');
        if (!isRoot) {
            if (!isCustomLayout) {
                const convertibleTagTypes = this.getTypesByTags(dynType.getValidConvertibleTags(context), context);
                const convertibleActions = this.buildGroupedActions(convertibleTagTypes, 'convert-');
                if (((convertibleActions === null || convertibleActions === void 0 ? void 0 : convertibleActions.length) ?? 0) > 0) {
                    actions === null || actions === void 0 ? void 0 : actions.push({
                        key: 'convert',
                        icon: 'convert',
                        translationKey: 'tree.actions.convert',
                        actions: convertibleActions
                    });
                }
                actions === null || actions === void 0 ? void 0 : actions.push({
                    key: 'clone',
                    icon: 'content-duplicate',
                    translationKey: 'tree.actions.clone'
                });
            }
        }
        return actions ?? [];
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
"./js/src/core/modules/field-definitions/dynamic-types/types/data/_abstracts/dynamic-type-field-defintion-data-abstract.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DynamicTypeFieldDefinitionDataAbstract: () => (DynamicTypeFieldDefinitionDataAbstract)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_modules_field_definitions_dynamic_types_dynamic_type_field_definition_abstract__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/field-definitions/dynamic-types/dynamic-type-field-definition-abstract.tsx");
/* ESM import */var _Pimcore_modules_field_definitions_dynamic_types_types_data_abstracts_field_defintion_data_form_fields__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/field-definitions/dynamic-types/types/data/_abstracts/field-defintion-data-form-fields.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
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



class DynamicTypeFieldDefinitionDataAbstract extends _Pimcore_modules_field_definitions_dynamic_types_dynamic_type_field_definition_abstract__WEBPACK_IMPORTED_MODULE_1__.DynamicTypeFieldDefinitionAbstract {
    getTags(props) {
        return [
            ...super.getTags(props),
            'group:data'
        ];
    }
    getConvertibleTags(props) {
        return [
            'group:data'
        ];
    }
    getDropdownTags(props) {
        const isCustomLayout = props.area.includes('custom-layout');
        if (isCustomLayout) {
            return [];
        }
        return this.getAllowedChildTags(props);
    }
    getGroup() {
        return [
            'data'
        ];
    }
    getDefaultData() {
        return {
            fieldtype: this.id,
            datatype: 'data',
            name: '',
            title: '',
            tooltip: ''
        };
    }
    isValid(data) {
        return data.name.trim().length > 0;
    }
    getId(context) {
        return context.path.at(-1) ?? '';
    }
    getFormFields(context) {
        const id = this.getId(context);
        const fieldDefinition = context.fieldDefinitions[id];
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_field_definitions_dynamic_types_types_data_abstracts_field_defintion_data_form_fields__WEBPACK_IMPORTED_MODULE_2__.FieldDefinitionDataFormFields, {
            context: context,
            id: (fieldDefinition === null || fieldDefinition === void 0 ? void 0 : fieldDefinition.name) ?? id,
            type: this.id
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/data/_abstracts/dynamic-type-field-defintion-data-abstract.tsx",
            lineNumber: 49,
            columnNumber: 12
        }, this);
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
"./js/src/core/modules/field-definitions/dynamic-types/types/data/_abstracts/field-defintion-data-form-fields.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  FieldDefinitionDataFormFields: () => (FieldDefinitionDataFormFields)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _sdk_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/sdk/components/index.ts");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);
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
var _s = $RefreshSig$();




const FieldDefinitionDataFormFields = (props)=>{
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation)();
    const isCustomLayout = props.context.area.includes('custom-layout');
    const typeTranslation = t('field-definition.' + (0,lodash__WEBPACK_IMPORTED_MODULE_4__.kebabCase)(props.type));
    const panelTitle = `${props.id} (${t('type')}: ${typeTranslation})`;
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.FormKit.Panel, {
        title: panelTitle,
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Form.Item, {
                label: t('name'),
                name: "name",
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Input, {}, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/data/_abstracts/field-defintion-data-form-fields.tsx",
                    lineNumber: 24,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/data/_abstracts/field-defintion-data-form-fields.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Form.Item, {
                label: t('title'),
                name: "title",
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Input, {}, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/data/_abstracts/field-defintion-data-form-fields.tsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/data/_abstracts/field-defintion-data-form-fields.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Form.Item, {
                label: t('tooltip'),
                name: "tooltip",
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.TextArea, {}, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/data/_abstracts/field-defintion-data-form-fields.tsx",
                    lineNumber: 32,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/data/_abstracts/field-defintion-data-form-fields.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Form.Item, {
                name: "mandatory",
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Switch, {
                    disabled: props.context.disableMandatory,
                    labelRight: t('mandatory')
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/data/_abstracts/field-defintion-data-form-fields.tsx",
                    lineNumber: 36,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/data/_abstracts/field-defintion-data-form-fields.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Form.Item, {
                name: "index",
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Switch, {
                    disabled: props.context.disableIndex,
                    labelRight: t('index')
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/data/_abstracts/field-defintion-data-form-fields.tsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/data/_abstracts/field-defintion-data-form-fields.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, undefined),
            props.context.hideUnique !== true && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Form.Item, {
                name: "unique",
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Switch, {
                    labelRight: t('unique')
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/data/_abstracts/field-defintion-data-form-fields.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/data/_abstracts/field-defintion-data-form-fields.tsx",
                lineNumber: 44,
                columnNumber: 45
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Form.Item, {
                name: "noteditable",
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Switch, {
                    labelRight: t('not-editable')
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/data/_abstracts/field-defintion-data-form-fields.tsx",
                    lineNumber: 49,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/data/_abstracts/field-defintion-data-form-fields.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Form.Item, {
                name: "invisible",
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Switch, {
                    labelRight: t('invisible')
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/data/_abstracts/field-defintion-data-form-fields.tsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/data/_abstracts/field-defintion-data-form-fields.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, undefined),
            !isCustomLayout && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Form.Item, {
                        name: "visibleGridView",
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Switch, {
                            disabled: props.context.disableVisibleGridView,
                            labelRight: t('visible-in-gridview')
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/data/_abstracts/field-defintion-data-form-fields.tsx",
                            lineNumber: 58,
                            columnNumber: 13
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/data/_abstracts/field-defintion-data-form-fields.tsx",
                        lineNumber: 57,
                        columnNumber: 11
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Form.Item, {
                        name: "visibleSearch",
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Switch, {
                            disabled: props.context.disableVisibleSearch,
                            labelRight: t('visible-in-searchresult')
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/data/_abstracts/field-defintion-data-form-fields.tsx",
                            lineNumber: 62,
                            columnNumber: 13
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/data/_abstracts/field-defintion-data-form-fields.tsx",
                        lineNumber: 61,
                        columnNumber: 11
                    }, undefined)
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/data/_abstracts/field-defintion-data-form-fields.tsx",
        lineNumber: 22,
        columnNumber: 10
    }, undefined);
};
_s(FieldDefinitionDataFormFields, "vu2xTFBfHkv41zWfADiErp1aWcA=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation
    ];
});
_c = FieldDefinitionDataFormFields;
var _c;
$RefreshReg$(_c, "FieldDefinitionDataFormFields");

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
"./js/src/core/modules/field-definitions/dynamic-types/types/layout/_abstracts/dynamic-type-field-defintion-layout-abstract.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DynamicTypeFieldDefinitionLayoutAbstract: () => (DynamicTypeFieldDefinitionLayoutAbstract)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_modules_field_definitions_dynamic_types_dynamic_type_field_definition_abstract__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/field-definitions/dynamic-types/dynamic-type-field-definition-abstract.tsx");
/* ESM import */var _Pimcore_modules_field_definitions_dynamic_types_types_layout_abstracts_field_defintion_layout_form_fields__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/field-definitions/dynamic-types/types/layout/_abstracts/field-defintion-layout-form-fields.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
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



class DynamicTypeFieldDefinitionLayoutAbstract extends _Pimcore_modules_field_definitions_dynamic_types_dynamic_type_field_definition_abstract__WEBPACK_IMPORTED_MODULE_1__.DynamicTypeFieldDefinitionAbstract {
    getAllowedChildTags(props) {
        return [
            ...super.getAllowedChildTags(props),
            'group:layout',
            'group:data'
        ];
    }
    getTags(props) {
        return [
            ...super.getTags(props),
            'group:layout',
            'group:root'
        ];
    }
    getGroup() {
        return [
            'layout'
        ];
    }
    getDefaultData() {
        return {
            fieldtype: this.id,
            datatype: 'layout',
            name: 'Layout',
            title: '',
            region: ''
        };
    }
    getFormFields(context) {
        const id = context.path.at(-1) ?? '';
        const fieldDefinition = context.fieldDefinitions[id];
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_field_definitions_dynamic_types_types_layout_abstracts_field_defintion_layout_form_fields__WEBPACK_IMPORTED_MODULE_2__.FieldDefinitionLayoutFormFields, {
            context: context,
            id: (fieldDefinition === null || fieldDefinition === void 0 ? void 0 : fieldDefinition.name) ?? id,
            type: this.id
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/layout/_abstracts/dynamic-type-field-defintion-layout-abstract.tsx",
            lineNumber: 36,
            columnNumber: 12
        }, this);
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
"./js/src/core/modules/field-definitions/dynamic-types/types/layout/_abstracts/field-defintion-layout-form-fields.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  FieldDefinitionLayoutFormFields: () => (FieldDefinitionLayoutFormFields)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _sdk_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/sdk/components/index.ts");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);
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
var _s = $RefreshSig$();




const FieldDefinitionLayoutFormFields = (props)=>{
    _s();
    const form = _sdk_components__WEBPACK_IMPORTED_MODULE_1__.Form.useFormInstance();
    const collapsible = _sdk_components__WEBPACK_IMPORTED_MODULE_1__.Form.useWatch('collapsible');
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        if (collapsible === false) {
            form.setFieldValue('collapsed', false);
        }
    }, [
        collapsible,
        form
    ]);
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation)();
    const typeTranslation = t('field-definition.' + (0,lodash__WEBPACK_IMPORTED_MODULE_4__.kebabCase)(props.type));
    const panelTitle = `${props.id} (${t('type')}: ${typeTranslation})`;
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.FormKit.Panel, {
        contentPadding: {
            bottom: 'none',
            top: 'small',
            x: 'small'
        },
        title: panelTitle,
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Form.Item, {
                label: t('name'),
                name: "name",
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Input, {}, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/layout/_abstracts/field-defintion-layout-form-fields.tsx",
                    lineNumber: 34,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/layout/_abstracts/field-defintion-layout-form-fields.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, undefined),
            props.context.hideRegion !== true && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Form.Item, {
                label: t('region'),
                name: "region",
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Select, {
                    options: [
                        {
                            label: t('center'),
                            value: 'center'
                        },
                        {
                            label: t('north'),
                            value: 'north'
                        },
                        {
                            label: t('south'),
                            value: 'south'
                        },
                        {
                            label: t('east'),
                            value: 'east'
                        },
                        {
                            label: t('west'),
                            value: 'west'
                        }
                    ]
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/layout/_abstracts/field-defintion-layout-form-fields.tsx",
                    lineNumber: 38,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/layout/_abstracts/field-defintion-layout-form-fields.tsx",
                lineNumber: 37,
                columnNumber: 45
            }, undefined),
            props.context.hideTitle !== true && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Form.Item, {
                label: t('title'),
                name: "title",
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Input, {}, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/layout/_abstracts/field-defintion-layout-form-fields.tsx",
                    lineNumber: 57,
                    columnNumber: 11
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/layout/_abstracts/field-defintion-layout-form-fields.tsx",
                lineNumber: 56,
                columnNumber: 44
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Form.Item, {
                label: t('width'),
                name: "width",
                tooltip: t('width-tooltip'),
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Input, {}, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/layout/_abstracts/field-defintion-layout-form-fields.tsx",
                    lineNumber: 61,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/layout/_abstracts/field-defintion-layout-form-fields.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Form.Item, {
                label: t('height'),
                name: "height",
                tooltip: t('height-tooltip'),
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Input, {}, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/layout/_abstracts/field-defintion-layout-form-fields.tsx",
                    lineNumber: 65,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/layout/_abstracts/field-defintion-layout-form-fields.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, undefined),
            props.context.hideCollapsible !== true && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Form.Item, {
                        name: "collapsible",
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Switch, {
                            labelRight: t('collapsible')
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/layout/_abstracts/field-defintion-layout-form-fields.tsx",
                            lineNumber: 70,
                            columnNumber: 11
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/layout/_abstracts/field-defintion-layout-form-fields.tsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Form.Item, {
                        name: "collapsed",
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Switch, {
                            labelRight: t('collapsed')
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/layout/_abstracts/field-defintion-layout-form-fields.tsx",
                            lineNumber: 74,
                            columnNumber: 11
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/layout/_abstracts/field-defintion-layout-form-fields.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, undefined)
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/layout/_abstracts/field-defintion-layout-form-fields.tsx",
        lineNumber: 28,
        columnNumber: 10
    }, undefined);
};
_s(FieldDefinitionLayoutFormFields, "vw0vigUaoy85QCrYKT57/8OAx9M=", false, function() {
    return [
        _sdk_components__WEBPACK_IMPORTED_MODULE_1__.Form.useFormInstance,
        _sdk_components__WEBPACK_IMPORTED_MODULE_1__.Form.useWatch,
        react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation
    ];
});
_c = FieldDefinitionLayoutFormFields;
var _c;
$RefreshReg$(_c, "FieldDefinitionLayoutFormFields");

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
"./js/src/core/modules/field-definitions/utils/layout-helpers.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  buildPathMap: () => (buildPathMap),
  buildTree: () => (buildTree),
  getNamesInNamespace: () => (getNamesInNamespace),
  reduce: () => (reduce)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _sdk_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/sdk/app/index.ts");
/* ESM import */var _sdk_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/sdk/components/index.ts");
/* ESM import */var _sdk_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/sdk/utils/index.ts");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
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




const reduce = (props)=>{
    if (props.layout === undefined) {
        return;
    }
    const initialFieldDefinitions = {};
    const buildStructure = (layoutItem)=>{
        const id = (0,_sdk_utils__WEBPACK_IMPORTED_MODULE_3__.uuid)();
        const node = {
            id,
            children: layoutItem.children !== undefined && layoutItem.children !== null ? layoutItem.children.map((child)=>buildStructure(child)) : []
        };
        const { children, ...fieldDef } = layoutItem;
        // @todo remove type conversion after fix of typo from backendSide (fieldtype vs. fieldType)
        initialFieldDefinitions[id] = fieldDef;
        return node;
    };
    const rootStructure = buildStructure(props.layout);
    return {
        structure: rootStructure,
        fieldDefinitions: initialFieldDefinitions
    };
};
const buildPathMap = (structure)=>{
    const map = {};
    const walk = (node, path)=>{
        const current = [
            ...path,
            node.id
        ];
        map[node.id] = current;
        node.children.forEach((child)=>{
            walk(child, current);
        });
    };
    walk(structure, []);
    return map;
};
const getNamesInNamespace = function(structure, fieldDefinitions, targetId, pathMap) {
    let registry = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : _sdk_app__WEBPACK_IMPORTED_MODULE_1__.container.get(_sdk_app__WEBPACK_IMPORTED_MODULE_1__.serviceIds["DynamicTypes/FieldDefinitionRegistry"]);
    const isOpener = (id)=>{
        var _registry_getDynamicType;
        const def = fieldDefinitions[id];
        if (def === undefined) return false;
        return ((_registry_getDynamicType = registry.getDynamicType(def.fieldtype, false)) === null || _registry_getDynamicType === void 0 ? void 0 : _registry_getDynamicType.opensNamespace()) ?? false;
    };
    const findNode = (node, id)=>{
        if (node.id === id) return node;
        for (const child of node.children){
            const found = findNode(child, id);
            if (found !== undefined) return found;
        }
        return undefined;
    };
    // Find innermost namespace-opener ancestor (skip tree root and target itself)
    const path = pathMap[targetId] ?? [];
    let namespaceRootId;
    for (const id of path.slice(1, -1)){
        if (isOpener(id)) namespaceRootId = id;
    }
    const namespaceRoot = namespaceRootId !== undefined ? findNode(structure, namespaceRootId) : structure;
    // Collect names, stop descending into nested namespace openers
    const names = [];
    const collect = (node, isRoot)=>{
        if (!isRoot) {
            var _fieldDefinitions_node_id;
            const name = (_fieldDefinitions_node_id = fieldDefinitions[node.id]) === null || _fieldDefinitions_node_id === void 0 ? void 0 : _fieldDefinitions_node_id.name;
            if (name !== undefined && name !== '') names.push(name);
            if (isOpener(node.id)) return;
        }
        node.children.forEach((child)=>{
            collect(child, false);
        });
    };
    collect(namespaceRoot, true);
    return names;
};
const buildTree = (props)=>{
    var _this = undefined;
    const { fieldDefinitions, structure, itemCallback } = props;
    const fieldDefinitionRegistry = props.registry ?? _sdk_app__WEBPACK_IMPORTED_MODULE_1__.container.get(_sdk_app__WEBPACK_IMPORTED_MODULE_1__.serviceIds["DynamicTypes/FieldDefinitionRegistry"]);
    const buildTreeItems = function(node) {
        let parentPath = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
        const fieldDef = fieldDefinitions[node.id];
        let dynType;
        if (fieldDefinitionRegistry.hasDynamicType(fieldDef.fieldtype)) {
            dynType = fieldDefinitionRegistry.getDynamicType(fieldDef.fieldtype);
        }
        const currentPath = [
            ...parentPath,
            node.id
        ];
        const item = {
            title: fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.name,
            icon: dynType !== undefined ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_2__.Icon, {
                ...dynType.getIcon(),
                iconColorGroup: [
                    'fieldDefinition_' + dynType.id,
                    'fieldDefinition'
                ]
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/utils/layout-helpers.tsx",
                lineNumber: 107,
                columnNumber: 37
            }, _this) : undefined,
            key: node.id,
            meta: {
                currentPath
            },
            children: node.children.map((child)=>buildTreeItems(child, currentPath))
        };
        if (itemCallback !== undefined) {
            return itemCallback({
                fieldDefinition: fieldDef,
                initialTreeItem: item
            });
        }
        return item;
    };
    return buildTreeItems(structure);
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
"./js/src/core/modules/field-definitions/utils/layout-provider-factory.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  create: () => (create)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_modules_field_definitions_components_editor_area_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/field-definitions/components/editor/area-provider.tsx");
/* ESM import */var _Pimcore_modules_field_definitions_utils_global_clipboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/field-definitions/utils/global-clipboard.ts");
/* ESM import */var _Pimcore_modules_field_definitions_utils_layout_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/field-definitions/utils/layout-helpers.tsx");
/* ESM import */var _sdk_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/sdk/utils/index.ts");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ /* eslint-disable max-lines */ 





const create = ()=>{
    var _s = $RefreshSig$(), _s1 = $RefreshSig$();
    const LayoutContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_5__.createContext)(undefined);
    const findNode = (node, targetId)=>{
        if (node.id === targetId) {
            return node;
        }
        for (const child of node.children){
            const found = findNode(child, targetId);
            if (found !== undefined) return found;
        }
        return undefined;
    };
    const collectChildIds = (node)=>{
        let ids = [];
        node.children.forEach((child)=>{
            ids.push(child.id);
            ids = ids.concat(collectChildIds(child));
        });
        return ids;
    };
    const collectAllIds = (node)=>{
        const ids = [
            node.id
        ];
        node.children.forEach((child)=>{
            ids.push(...collectAllIds(child));
        });
        return ids;
    };
    const findPathToNode = function(node, targetId) {
        let currentPath = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
        const newPath = [
            ...currentPath,
            node.id
        ];
        if (node.id === targetId) {
            return newPath;
        }
        for (const child of node.children){
            const found = findPathToNode(child, targetId, newPath);
            if (found !== undefined) return found;
        }
        return undefined;
    };
    const cloneNodeWithIdMapping = (node, idMap)=>{
        const newId = (0,_sdk_utils__WEBPACK_IMPORTED_MODULE_4__.uuid)();
        idMap[node.id] = newId;
        return {
            id: newId,
            children: node.children.map((child)=>cloneNodeWithIdMapping(child, idMap))
        };
    };
    const getNextIndexedName = (baseName, siblingNames)=>{
        // Extract the base name and current number (if exists)
        const match = baseName.match(/^(.*?)(\d+)$/);
        const nameWithoutNumber = match !== null ? match[1] : baseName;
        const currentNumber = match !== null ? parseInt(match[2], 10) : 0;
        // Find the highest index among siblings with the same base name
        let maxIndex = currentNumber;
        siblingNames.forEach((name)=>{
            const siblingMatch = name.match(/^(.*?)(\d+)$/);
            const siblingBase = siblingMatch !== null ? siblingMatch[1] : name;
            const siblingNumber = siblingMatch !== null ? parseInt(siblingMatch[2], 10) : 0;
            if (siblingBase === nameWithoutNumber && siblingNumber > maxIndex) {
                maxIndex = siblingNumber;
            }
        });
        // Return the next number
        const nextNumber = maxIndex + 1;
        return `${nameWithoutNumber}${nextNumber}`;
    };
    const LayoutProvider = (props)=>{
        _s();
        const [structure, setStructure] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(undefined);
        const [fieldDefinitions, setFieldDefinitions] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)({});
        const [currentFieldDefinitionId, setCurrentFieldDefinitionId] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(null);
        const [currentFieldDefinitionIdPath, setCurrentFieldDefinitionIdPath] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(null);
        const [invalidFieldDefinitionIds, setInvalidFieldDefinitionIds] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)([]);
        const [copiedPath, setCopiedPath] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(undefined);
        const fieldDefinitionRegistry = props.fieldDefinitionRegistry;
        const { area } = (0,_Pimcore_modules_field_definitions_components_editor_area_provider__WEBPACK_IMPORTED_MODULE_1__.useArea)();
        // Use refs to always access latest values in callbacks
        const structureRef = react__WEBPACK_IMPORTED_MODULE_5___default().useRef(structure);
        const fieldDefinitionsRef = react__WEBPACK_IMPORTED_MODULE_5___default().useRef(fieldDefinitions);
        const areaRef = react__WEBPACK_IMPORTED_MODULE_5___default().useRef(area);
        const isInitializedRef = (0,react__WEBPACK_IMPORTED_MODULE_5__.useRef)(false);
        react__WEBPACK_IMPORTED_MODULE_5___default().useEffect(()=>{
            structureRef.current = structure;
            fieldDefinitionsRef.current = fieldDefinitions;
            areaRef.current = area;
        }, [
            structure,
            fieldDefinitions,
            area
        ]);
        (0,react__WEBPACK_IMPORTED_MODULE_5__.useEffect)(()=>{
            if (props.layout === undefined) {
                // Reset: layout cleared or switching away
                isInitializedRef.current = false;
                setStructure(undefined);
                setFieldDefinitions({});
                setInvalidFieldDefinitionIds([]);
                setCurrentFieldDefinitionId(null);
                setCurrentFieldDefinitionIdPath(null);
                setCopiedPath(undefined);
                return;
            }
            if (isInitializedRef.current) {
                // Already initialized — ignore post-save refetches.
                // The explicit refresh button remounts the component via key increment,
                // which is the correct mechanism to re-sync from server.
                return;
            }
            // First time we have a defined layout — initialize
            isInitializedRef.current = true;
            const { structure: rootStructure, fieldDefinitions: initialFieldDefinitions } = (0,_Pimcore_modules_field_definitions_utils_layout_helpers__WEBPACK_IMPORTED_MODULE_3__.reduce)({
                layout: props.layout
            });
            setCurrentFieldDefinitionId(null);
            setCurrentFieldDefinitionIdPath(null);
            setInvalidFieldDefinitionIds([]);
            setStructure(rootStructure);
            setFieldDefinitions(initialFieldDefinitions);
        }, [
            props.layout
        ]);
        const updateFieldDefinition = (0,react__WEBPACK_IMPORTED_MODULE_5__.useCallback)(function(structureNodeId, updatedFieldDefinition) {
            let overwriteValues = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
            setFieldDefinitions((prevDefs)=>({
                    ...prevDefs,
                    [structureNodeId]: {
                        ...overwriteValues ? updatedFieldDefinition : {
                            ...prevDefs[structureNodeId],
                            ...updatedFieldDefinition
                        }
                    }
                }));
        }, []);
        const addFieldDefinition = (0,react__WEBPACK_IMPORTED_MODULE_5__.useCallback)((structureNodeId, newFieldDefinition)=>{
            const newId = (0,_sdk_utils__WEBPACK_IMPORTED_MODULE_4__.uuid)();
            const addNodeRecursively = (node)=>{
                if (node.id === structureNodeId) {
                    return {
                        ...node,
                        children: [
                            ...node.children,
                            {
                                id: newId,
                                children: []
                            }
                        ]
                    };
                }
                return {
                    ...node,
                    children: node.children.map(addNodeRecursively)
                };
            };
            setStructure((prevStructure)=>prevStructure !== undefined ? addNodeRecursively(prevStructure) : prevStructure);
            setFieldDefinitions((prevDefs)=>({
                    ...prevDefs,
                    [newId]: newFieldDefinition
                }));
            return newId;
        }, []);
        const removeFieldDefinition = (0,react__WEBPACK_IMPORTED_MODULE_5__.useCallback)((structureNodeId)=>{
            const removeNodeRecursively = (node)=>{
                if (node.id === structureNodeId) {
                    return undefined;
                }
                const updatedChildren = node.children.map(removeNodeRecursively).filter((child)=>child !== undefined);
                return {
                    ...node,
                    children: updatedChildren
                };
            };
            setCurrentFieldDefinitionId((prevId)=>{
                if (prevId === structureNodeId) {
                    setCurrentFieldDefinitionIdPath(null);
                    setInvalidFieldDefinitionIds((prevIds)=>prevIds.filter((id)=>id !== structureNodeId));
                    return null;
                }
                return prevId;
            });
            setStructure((prevStructure)=>prevStructure !== undefined ? removeNodeRecursively(prevStructure) : prevStructure);
            setFieldDefinitions((prevDefs)=>{
                const { [structureNodeId]: _, ...rest } = prevDefs;
                return rest;
            });
        }, []);
        const removeChildren = (0,react__WEBPACK_IMPORTED_MODULE_5__.useCallback)((structureNodeId)=>{
            const removeChildrenRecursively = (node)=>{
                if (node.id === structureNodeId) {
                    return {
                        ...node,
                        children: []
                    };
                }
                return {
                    ...node,
                    children: node.children.map(removeChildrenRecursively)
                };
            };
            setStructure((prevStructure)=>{
                if (prevStructure === undefined) return prevStructure;
                const updatedStructure = removeChildrenRecursively(prevStructure);
                setFieldDefinitions((prevDefs)=>{
                    const targetNode = findNode(prevStructure, structureNodeId);
                    if (targetNode === undefined) return prevDefs;
                    const childIds = collectChildIds(targetNode);
                    const newDefs = {
                        ...prevDefs
                    };
                    childIds.forEach((id)=>{
                        /* eslint-disable @typescript-eslint/no-dynamic-delete */ delete newDefs[id];
                    /* eslint-enable @typescript-eslint/no-dynamic-delete */ });
                    return newDefs;
                });
                return updatedStructure;
            });
        }, []);
        const cloneFieldDefinition = (0,react__WEBPACK_IMPORTED_MODULE_5__.useCallback)((structureNodeId)=>{
            const insertClonedNodeAsSibling = (node, targetId, clonedNode)=>{
                const childIndex = node.children.findIndex((child)=>child.id === targetId);
                if (childIndex !== -1) {
                    const newChildren = [
                        ...node.children
                    ];
                    newChildren.splice(childIndex + 1, 0, clonedNode);
                    return {
                        ...node,
                        children: newChildren
                    };
                }
                return {
                    ...node,
                    children: node.children.map((child)=>insertClonedNodeAsSibling(child, targetId, clonedNode))
                };
            };
            const findParentNode = (node, targetId)=>{
                for (const child of node.children){
                    if (child.id === targetId) {
                        return node;
                    }
                    const found = findParentNode(child, targetId);
                    if (found !== undefined) return found;
                }
                return undefined;
            };
            let clonedId = structureNodeId;
            setStructure((prevStructure)=>{
                if (prevStructure === undefined) {
                    return prevStructure;
                }
                const nodeToClone = findNode(prevStructure, structureNodeId);
                if (nodeToClone === undefined) {
                    return prevStructure;
                }
                // Find parent to get sibling names
                const parentNode = findParentNode(prevStructure, structureNodeId) ?? prevStructure;
                const siblingNames = parentNode.children.map((child)=>{
                    var _fieldDefinitionsRef_current_child_id;
                    return ((_fieldDefinitionsRef_current_child_id = fieldDefinitionsRef.current[child.id]) === null || _fieldDefinitionsRef_current_child_id === void 0 ? void 0 : _fieldDefinitionsRef_current_child_id.name) ?? '';
                }).filter((name)=>name !== '');
                const oldToNewIdMap = {};
                const clonedNode = cloneNodeWithIdMapping(nodeToClone, oldToNewIdMap);
                clonedId = clonedNode.id;
                setFieldDefinitions((prevDefs)=>{
                    const newDefs = {
                        ...prevDefs
                    };
                    Object.entries(oldToNewIdMap).forEach((param)=>{
                        let [oldId, newId] = param;
                        const clonedDef = {
                            ...prevDefs[oldId]
                        };
                        // Update the name with index only for the root cloned node
                        if (oldId === structureNodeId && clonedDef.name !== undefined && typeof clonedDef.name === 'string') {
                            clonedDef.name = getNextIndexedName(clonedDef.name, siblingNames);
                        }
                        newDefs[newId] = clonedDef;
                    });
                    return newDefs;
                });
                return insertClonedNodeAsSibling(prevStructure, structureNodeId, clonedNode);
            });
            return clonedId;
        }, []);
        const moveFieldDefinition = (0,react__WEBPACK_IMPORTED_MODULE_5__.useCallback)((structureNodeId, newParentId, newIndex)=>{
            const findAndRemoveNode = (node, targetId)=>{
                if (node.id === targetId) {
                    return {
                        updatedNode: null,
                        removedNode: node
                    };
                }
                let removedNode = null;
                const updatedChildren = node.children.map((child)=>{
                    const result = findAndRemoveNode(child, targetId);
                    if (result.removedNode !== null) {
                        removedNode = result.removedNode;
                    }
                    return result.updatedNode;
                }).filter((child)=>child !== null);
                return {
                    updatedNode: {
                        ...node,
                        children: updatedChildren
                    },
                    removedNode
                };
            };
            const insertNodeAtNewPosition = (node, targetParentId, nodeToInsert, index)=>{
                if (node.id === targetParentId) {
                    const newChildren = [
                        ...node.children
                    ];
                    newChildren.splice(index, 0, nodeToInsert);
                    return {
                        ...node,
                        children: newChildren
                    };
                }
                return {
                    ...node,
                    children: node.children.map((child)=>insertNodeAtNewPosition(child, targetParentId, nodeToInsert, index))
                };
            };
            setStructure((prevStructure)=>{
                if (prevStructure === undefined) return prevStructure;
                const { updatedNode, removedNode } = findAndRemoveNode(prevStructure, structureNodeId);
                if (removedNode === null || updatedNode === null) return prevStructure;
                return insertNodeAtNewPosition(updatedNode, newParentId, removedNode, newIndex);
            });
        }, []);
        const copyFieldDefinition = (0,react__WEBPACK_IMPORTED_MODULE_5__.useCallback)((path)=>{
            setCopiedPath(path);
            // Also write a Layout snapshot to the global clipboard so it can be
            // pasted into other editor instances (cross-configuration copy/paste).
            const nodeId = path[path.length - 1];
            const currentStructure = structureRef.current;
            const currentFieldDefs = fieldDefinitionsRef.current;
            if (currentStructure === undefined || nodeId === undefined) {
                return;
            }
            const buildLayoutFromNode = (node)=>{
                const fieldDef = currentFieldDefs[node.id];
                const children = node.children.map(buildLayoutFromNode);
                const { id, ...restFieldDef } = fieldDef;
                /* eslint-disable @typescript-eslint/consistent-type-assertions */ return {
                    ...restFieldDef,
                    children: children.length > 0 ? children : null
                };
            /* eslint-enable @typescript-eslint/consistent-type-assertions */ };
            const targetNode = findNode(currentStructure, nodeId);
            if (targetNode !== undefined) {
                _Pimcore_modules_field_definitions_utils_global_clipboard__WEBPACK_IMPORTED_MODULE_2__.globalFieldDefinitionClipboard.set(buildLayoutFromNode(targetNode));
            }
        }, []);
        const pasteFieldDefinition = (0,react__WEBPACK_IMPORTED_MODULE_5__.useCallback)((path)=>{
            setCopiedPath((currentCopiedPath)=>{
                if (currentCopiedPath === undefined) {
                    return currentCopiedPath;
                }
                const sourceId = currentCopiedPath[currentCopiedPath.length - 1];
                const targetId = path[path.length - 1];
                setStructure((prevStructure)=>{
                    if (prevStructure === undefined) {
                        return prevStructure;
                    }
                    const sourceNode = findNode(prevStructure, sourceId);
                    if (sourceNode === undefined) {
                        return prevStructure;
                    }
                    const oldToNewIdMap = {};
                    const clonedNode = cloneNodeWithIdMapping(sourceNode, oldToNewIdMap);
                    const attachNodeRecursively = (node)=>{
                        if (node.id === targetId) {
                            return {
                                ...node,
                                children: [
                                    ...node.children,
                                    clonedNode
                                ]
                            };
                        }
                        return {
                            ...node,
                            children: node.children.map(attachNodeRecursively)
                        };
                    };
                    setFieldDefinitions((prevDefs)=>{
                        const newDefs = {
                            ...prevDefs
                        };
                        Object.entries(oldToNewIdMap).forEach((param)=>{
                            let [oldId, newId] = param;
                            if (prevDefs[oldId] !== undefined) {
                                newDefs[newId] = {
                                    ...prevDefs[oldId]
                                };
                            }
                        });
                        return newDefs;
                    });
                    return attachNodeRecursively(prevStructure);
                });
                return currentCopiedPath;
            });
        }, []);
        const getLayout = (0,react__WEBPACK_IMPORTED_MODULE_5__.useCallback)((props)=>{
            const fromNodeId = props === null || props === void 0 ? void 0 : props.startNode;
            let structureToConvert = structure;
            if (fromNodeId !== undefined && structure !== undefined) {
                const fromNode = findNode(structure, fromNodeId);
                if (fromNode !== undefined) {
                    structureToConvert = fromNode;
                }
            }
            if (structureToConvert === undefined) {
                return undefined;
            }
            const buildLayoutRecursively = (node)=>{
                const fieldDef = fieldDefinitions[node.id];
                const children = node.children.map(buildLayoutRecursively);
                const { id, ...restFieldDef } = fieldDef;
                /* eslint-disable @typescript-eslint/consistent-type-assertions */ return {
                    ...restFieldDef,
                    children: children.length > 0 ? children : null
                };
            /* eslint-enable @typescript-eslint/consistent-type-assertions */ };
            return buildLayoutRecursively(structureToConvert);
        }, [
            structure,
            fieldDefinitions
        ]);
        const getRecursiveChildrenIdsFromPath = (0,react__WEBPACK_IMPORTED_MODULE_5__.useCallback)((path)=>{
            if (structureRef.current === undefined) return [];
            const targetNode = findNode(structureRef.current, path[path.length - 1]);
            return targetNode !== undefined ? collectAllIds(targetNode) : [];
        }, []);
        const isValidChildFieldDefinition = (0,react__WEBPACK_IMPORTED_MODULE_5__.useCallback)((targetPath, childPath)=>{
            // Rebuild current paths from structure to handle moved nodes
            const currentStructure = structureRef.current;
            if (currentStructure === undefined) {
                return false;
            }
            const targetId = targetPath[targetPath.length - 1];
            const childId = childPath[childPath.length - 1];
            const currentTargetPath = findPathToNode(currentStructure, targetId);
            const currentChildPath = findPathToNode(currentStructure, childId);
            if (currentTargetPath === undefined || currentChildPath === undefined) {
                return false;
            }
            // Check for circular reference using current paths
            if (currentTargetPath.includes(childId)) {
                return false;
            }
            const fieldDefs = fieldDefinitionsRef.current;
            const currentFieldDef = fieldDefs[targetId];
            const childFieldDef = fieldDefs[childId];
            if (currentFieldDef === undefined) {
                return false;
            }
            const currentDynType = fieldDefinitionRegistry.getDynamicType(currentFieldDef.fieldtype, false);
            const childDynType = fieldDefinitionRegistry.getDynamicType(childFieldDef === null || childFieldDef === void 0 ? void 0 : childFieldDef.fieldtype, false);
            const isRoot = currentTargetPath.length === 1;
            if (childDynType === undefined || currentDynType === undefined && !isRoot) {
                return false;
            }
            const targetContext = {
                area: areaRef.current,
                fieldDefinitions: fieldDefs,
                path: currentTargetPath
            };
            const validChildTags = fieldDefinitionRegistry.resolveTags(!isRoot ? currentDynType === null || currentDynType === void 0 ? void 0 : currentDynType.getValidChildTags(targetContext) : [
                'group:root'
            ], targetContext);
            if (!validChildTags.includes(childDynType.id)) {
                return false;
            }
            const targetFieldDefinitions = currentTargetPath.map((id)=>fieldDefs[id]);
            let blockedChildTags = [];
            for (const currentFieldDef of targetFieldDefinitions){
                const dynType = fieldDefinitionRegistry.getDynamicType(currentFieldDef.fieldtype, false);
                if (dynType === undefined) {
                    continue;
                }
                blockedChildTags.push(...dynType.getDisallowedRecursiveChildTags({
                    area: areaRef.current,
                    fieldDefinitions: fieldDefs,
                    path: currentTargetPath
                }));
            }
            blockedChildTags = fieldDefinitionRegistry.resolveTags(blockedChildTags, {
                area: areaRef.current,
                fieldDefinitions: fieldDefs,
                path: currentTargetPath
            });
            const childFieldDefinitions = [];
            const childNodes = getRecursiveChildrenIdsFromPath(currentChildPath);
            for (const childNodeId of childNodes){
                if (childNodeId === childId) {
                    continue;
                }
                const childFieldDef = fieldDefs[childNodeId];
                if (childFieldDef !== undefined) {
                    childFieldDefinitions.push(childFieldDef);
                }
            }
            const childrenTags = childFieldDefinitions.map((def)=>{
                return def.fieldtype;
            });
            if (childrenTags.some((tag)=>blockedChildTags.includes(tag))) {
                return false;
            }
            return true;
        }, [
            fieldDefinitionRegistry,
            getRecursiveChildrenIdsFromPath
        ]);
        const isValidExternalChildFieldDefinition = (0,react__WEBPACK_IMPORTED_MODULE_5__.useCallback)((targetPath, externalLayout)=>{
            // Rebuild current path from structure to handle moved nodes
            const currentStructure = structureRef.current;
            if (currentStructure === undefined) {
                return false;
            }
            const targetId = targetPath[targetPath.length - 1];
            const currentTargetPath = findPathToNode(currentStructure, targetId);
            if (currentTargetPath === undefined) {
                return false;
            }
            const fieldDefs = fieldDefinitionsRef.current;
            const currentFieldDef = fieldDefs[targetId];
            if (currentFieldDef === undefined || externalLayout === undefined) {
                return false;
            }
            const externalFieldtype = externalLayout.fieldType ?? externalLayout.fieldtype;
            if (externalFieldtype === undefined) {
                return false;
            }
            const currentDynType = fieldDefinitionRegistry.getDynamicType(currentFieldDef.fieldtype, false);
            const childDynType = fieldDefinitionRegistry.getDynamicType(externalFieldtype, false);
            const isRoot = currentTargetPath.length === 1;
            if (childDynType === undefined || currentDynType === undefined && !isRoot) {
                return false;
            }
            const targetContext = {
                area: areaRef.current,
                fieldDefinitions: fieldDefs,
                path: currentTargetPath
            };
            const validChildTags = fieldDefinitionRegistry.resolveTags(!isRoot ? currentDynType === null || currentDynType === void 0 ? void 0 : currentDynType.getValidChildTags(targetContext) : [
                'group:root'
            ], targetContext);
            if (!validChildTags.includes(childDynType.id)) {
                return false;
            }
            return true;
        }, [
            fieldDefinitionRegistry
        ]);
        const addExternalFieldDefinition = (0,react__WEBPACK_IMPORTED_MODULE_5__.useCallback)((structureNodeId, layout, insertIndex)=>{
            const { structure: externalStructure, fieldDefinitions: externalFieldDefinitions } = (0,_Pimcore_modules_field_definitions_utils_layout_helpers__WEBPACK_IMPORTED_MODULE_3__.reduce)({
                layout
            });
            const addNodeRecursively = (node)=>{
                if (node.id === structureNodeId) {
                    const newChildren = [
                        ...node.children
                    ];
                    if (typeof insertIndex === 'number') {
                        const clamped = Math.min(Math.max(insertIndex, 0), newChildren.length);
                        newChildren.splice(clamped, 0, externalStructure);
                    } else {
                        newChildren.push(externalStructure);
                    }
                    return {
                        ...node,
                        children: newChildren
                    };
                }
                return {
                    ...node,
                    children: node.children.map(addNodeRecursively)
                };
            };
            setStructure((prevStructure)=>prevStructure !== undefined ? addNodeRecursively(prevStructure) : prevStructure);
            setFieldDefinitions((prevDefs)=>({
                    ...prevDefs,
                    ...externalFieldDefinitions
                }));
            return externalStructure;
        }, []);
        return (0,react__WEBPACK_IMPORTED_MODULE_5__.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(LayoutContext.Provider, {
                value: {
                    structure,
                    fieldDefinitions,
                    copiedPath,
                    currentFieldDefinitionId,
                    currentFieldDefinitionIdPath,
                    invalidFieldDefinitionIds,
                    setInvalidFieldDefinitionIds,
                    setCurrentFieldDefinitionId,
                    setCurrentFieldDefinitionIdPath,
                    updateFieldDefinition,
                    addFieldDefinition,
                    addExternalFieldDefinition,
                    removeFieldDefinition,
                    removeChildren,
                    copyFieldDefinition,
                    pasteFieldDefinition,
                    cloneFieldDefinition,
                    moveFieldDefinition,
                    isValidChildFieldDefinition,
                    isValidExternalChildFieldDefinition,
                    getLayout
                },
                children: props.children
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/utils/layout-provider-factory.tsx",
                lineNumber: 604,
                columnNumber: 26
            }, undefined), [
            structure,
            fieldDefinitions,
            copiedPath,
            currentFieldDefinitionId,
            currentFieldDefinitionIdPath,
            invalidFieldDefinitionIds,
            updateFieldDefinition,
            addFieldDefinition,
            addExternalFieldDefinition,
            removeFieldDefinition,
            removeChildren,
            copyFieldDefinition,
            pasteFieldDefinition,
            cloneFieldDefinition,
            moveFieldDefinition,
            isValidChildFieldDefinition,
            isValidExternalChildFieldDefinition,
            getLayout,
            props.children
        ]);
    };
    _s(LayoutProvider, "tn9gEcm/BPgGMVZkgQWOiNeXD1I=", false, function() {
        return [
            _Pimcore_modules_field_definitions_components_editor_area_provider__WEBPACK_IMPORTED_MODULE_1__.useArea
        ];
    });
    const useLayout = ()=>{
        _s1();
        const context = (0,react__WEBPACK_IMPORTED_MODULE_5__.useContext)(LayoutContext);
        if (context === undefined) {
            throw new Error('useLayout must be used within a LayoutProvider');
        }
        return context;
    };
    _s1(useLayout, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
    return {
        LayoutProvider,
        useLayout
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

}]);
//# sourceMappingURL=__federation_expose_modules__field_definitions.js.map