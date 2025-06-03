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
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["__federation_expose_modules__wysiwyg"], {
"./js/src/core/modules/wysiwyg/interface/wysiwyg.ts": (function (module, __webpack_exports__, __webpack_require__) {
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
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/classnames/classnames");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
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
            lineNumber: 32,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/wysiwyg/wysiwyg-editor.tsx",
        lineNumber: 28,
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
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
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
            lineNumber: 29,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/wysiwyg/wysiwyg.tsx",
        lineNumber: 22,
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

}]);