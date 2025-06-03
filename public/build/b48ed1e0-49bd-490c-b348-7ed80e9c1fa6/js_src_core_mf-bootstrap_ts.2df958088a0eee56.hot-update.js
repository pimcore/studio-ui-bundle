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
self["webpackHotUpdatepimcore_studio_ui_bundle_core"]("js_src_core_mf-bootstrap_ts", {
"./js/src/core/modules/data-object/editor/editor-container.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  EditorContainer: () => (EditorContainer)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_modules_data_object_editor_editor_container_editor_container_inner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/data-object/editor/editor-container/editor-container-inner.tsx");
/* ESM import */var _Pimcore_modules_data_object_hooks_use_custom_layouts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/data-object/hooks/use-custom-layouts.ts");
/* ESM import */var _Pimcore_modules_data_object_editor_toolbar_context_menu_provider_layout_selection_provider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/data-object/editor/toolbar/context-menu/provider/layout-selection-provider.tsx");
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




const EditorContainer = (param)=>{
    let { id } = param;
    _s();
    const { getDefaultLayoutId, isLoading } = (0,_Pimcore_modules_data_object_hooks_use_custom_layouts__WEBPACK_IMPORTED_MODULE_3__.useCustomLayouts)(id);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_data_object_editor_toolbar_context_menu_provider_layout_selection_provider__WEBPACK_IMPORTED_MODULE_4__.LayoutSelectionProvider, {
        defaultLayout: getDefaultLayoutId(),
        isLoading: isLoading,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_data_object_editor_editor_container_editor_container_inner__WEBPACK_IMPORTED_MODULE_2__.EditorContainerInner, {
            id: id
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/editor-container.tsx",
            lineNumber: 31,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/editor-container.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, undefined);
};
_s(EditorContainer, "v1ixWZp5Z8Ee6gj5Cxb82qQB6PM=", false, function() {
    return [
        _Pimcore_modules_data_object_hooks_use_custom_layouts__WEBPACK_IMPORTED_MODULE_3__.useCustomLayouts
    ];
});
_c = EditorContainer;

var _c;
$RefreshReg$(_c, "EditorContainer");

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

});
//# sourceMappingURL=js_src_core_mf-bootstrap_ts.2df958088a0eee56.hot-update.js.map