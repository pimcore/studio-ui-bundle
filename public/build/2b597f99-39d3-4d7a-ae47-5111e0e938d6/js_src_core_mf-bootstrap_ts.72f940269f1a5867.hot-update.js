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
/* ESM import */var _Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/content/content.tsx");
/* ESM import */var _Pimcore_components_form_item_provider_item_use_item__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/form/item/provider/item/use-item.ts");
/* ESM import */var _Pimcore_modules_data_object_classification_store_classification_store_api_slice_gen__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/data-object/classification-store/classification-store-api-slice.gen.ts");
/* ESM import */var _Pimcore_modules_data_object_editor_types_object_tab_manager_tabs_edit_components_object_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/object-component.tsx");
/* ESM import */var _Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/element/hooks/use-element-context.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_6__);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* ESM import */var _layout_related_views_base_view__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/layout-related/views/base-view.tsx");
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
    const { name } = (0,_Pimcore_components_form_item_provider_item_use_item__WEBPACK_IMPORTED_MODULE_2__.useItem)();
    const fieldName = (0,lodash__WEBPACK_IMPORTED_MODULE_6__.isArray)(name) ? name[name.length - 1] : name;
    const { groupId } = props;
    const { id } = (0,_Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_5__.useElementContext)();
    const { isLoading, data } = (0,_Pimcore_modules_data_object_classification_store_classification_store_api_slice_gen__WEBPACK_IMPORTED_MODULE_3__.useClassificationStoreGetLayoutByGroupQuery)({
        fieldName,
        groupId: parseInt(groupId),
        objectId: id
    });
    console.log('------>>>>>>>>: props ', props);
    return (0,react__WEBPACK_IMPORTED_MODULE_7__.useMemo)(()=>{
        if (isLoading) {
            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_1__.Content, {
                loading: true
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/classification-store-item.tsx",
                lineNumber: 35,
                columnNumber: 14
            }, undefined);
        }
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_layout_related_views_base_view__WEBPACK_IMPORTED_MODULE_8__.BaseView, {
            border: false,
            collapsed: false,
            collapsible: true,
            theme: "border-highlight",
            title: data === null || data === void 0 ? void 0 : data.name,
            children: data === null || data === void 0 ? void 0 : data.keys.map((item)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_data_object_editor_types_object_tab_manager_tabs_edit_components_object_component__WEBPACK_IMPORTED_MODULE_4__.ObjectComponent, {
                    ...item.definition,
                    name: item.id
                }, item.id, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/classification-store-item.tsx",
                    lineNumber: 47,
                    columnNumber: 11
                }, undefined))
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/classification-store-item.tsx",
            lineNumber: 39,
            columnNumber: 7
        }, undefined);
    }, [
        data,
        isLoading,
        groupId,
        id,
        fieldName
    ]);
};
_s(ClassificationStoreItem, "HjXplAL7hCHxiQyWlXswS1wBBZU=", false, function() {
    return [
        _Pimcore_components_form_item_provider_item_use_item__WEBPACK_IMPORTED_MODULE_2__.useItem,
        _Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_5__.useElementContext,
        _Pimcore_modules_data_object_classification_store_classification_store_api_slice_gen__WEBPACK_IMPORTED_MODULE_3__.useClassificationStoreGetLayoutByGroupQuery
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
//# sourceMappingURL=js_src_core_mf-bootstrap_ts.72f940269f1a5867.hot-update.js.map