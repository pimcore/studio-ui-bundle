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
"./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/classification-store-item.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ClassificationStoreItem: () => (ClassificationStoreItem)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/content/content.tsx");
/* ESM import */var _Pimcore_components_form_item_provider_item_use_item__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/form/item/provider/item/use-item.ts");
/* ESM import */var _Pimcore_modules_data_object_editor_types_object_tab_manager_tabs_edit_components_object_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/object-component.tsx");
/* ESM import */var _Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/element/hooks/use-element-context.ts");
/* ESM import */var _layout_related_views_base_view__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/layout-related/views/base-view.tsx");
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







const ClassificationStoreItem = (props)=>{
    _s();
    const { currentLayout } = props;
    const { name } = (0,_Pimcore_components_form_item_provider_item_use_item__WEBPACK_IMPORTED_MODULE_4__.useItem)();
    const fieldName = (0,lodash__WEBPACK_IMPORTED_MODULE_2__.isArray)(name) ? name[name.length - 1] : name;
    const { id } = (0,_Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_6__.useElementContext)();
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        var _currentLayout_keys;
        if ((0,lodash__WEBPACK_IMPORTED_MODULE_2__.isEmpty)(currentLayout)) {
            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_3__.Content, {
                loading: true
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/classification-store-item.tsx",
                lineNumber: 36,
                columnNumber: 14
            }, undefined);
        }
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_layout_related_views_base_view__WEBPACK_IMPORTED_MODULE_7__.BaseView, {
            border: false,
            collapsed: false,
            collapsible: true,
            theme: "border-highlight",
            title: currentLayout === null || currentLayout === void 0 ? void 0 : currentLayout.name,
            children: currentLayout === null || currentLayout === void 0 ? void 0 : (_currentLayout_keys = currentLayout.keys) === null || _currentLayout_keys === void 0 ? void 0 : _currentLayout_keys.map((item)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_data_object_editor_types_object_tab_manager_tabs_edit_components_object_component__WEBPACK_IMPORTED_MODULE_5__.ObjectComponent, {
                    ...item.definition,
                    name: item.id
                }, item.id, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/classification-store-item.tsx",
                    lineNumber: 48,
                    columnNumber: 11
                }, undefined))
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/classification-store-item.tsx",
            lineNumber: 40,
            columnNumber: 7
        }, undefined);
    }, [
        currentLayout,
        id,
        fieldName
    ]);
};
_s(ClassificationStoreItem, "qjrTXxr9Hy5yOCO0aJJLxMaiPjQ=", false, function() {
    return [
        _Pimcore_components_form_item_provider_item_use_item__WEBPACK_IMPORTED_MODULE_4__.useItem,
        _Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_6__.useElementContext
    ];
});
_c = ClassificationStoreItem;
var _c;
$RefreshReg$(_c, "ClassificationStoreItem");

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
//# sourceMappingURL=js_src_core_mf-bootstrap_ts.cd245669e4619130.hot-update.js.map