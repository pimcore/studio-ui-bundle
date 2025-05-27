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
"./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/block/block-content.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  BlockContent: () => (BlockContent)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _layout_related_views_base_view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/layout-related/views/base-view.tsx");
/* ESM import */var _Pimcore_components_form_numbered_list_provider_numbered_list_use_numbered_list__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/form/numbered-list/provider/numbered-list/use-numbered-list.ts");
/* ESM import */var _block_add_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/block/block-add-button.tsx");
/* ESM import */var _block_item__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/block/block-item.tsx");
/* ESM import */var _Pimcore_components_space_space__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/space/space.tsx");
/* ESM import */var _Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/box/box.tsx");
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







const BlockContent = (props)=>{
    _s();
    const { values } = (0,_Pimcore_components_form_numbered_list_provider_numbered_list_use_numbered_list__WEBPACK_IMPORTED_MODULE_3__.useNumberedList)();
    console.log('------>>>>>> values: ', values);
    const maxItemsCount = (props === null || props === void 0 ? void 0 : props.maxItems) ?? 0;
    const valuesKeys = Object.keys(values);
    const isNoteditable = props.noteditable === true;
    const isDisallowAddRemove = props.disallowAddRemove === true;
    const isItemLimitReached = maxItemsCount > 0 && valuesKeys.length === maxItemsCount;
    const isHideAddButton = isNoteditable || isItemLimitReached || valuesKeys.length > 0 || isDisallowAddRemove;
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_layout_related_views_base_view__WEBPACK_IMPORTED_MODULE_2__.BaseView, {
            border: props.border,
            collapsed: props.collapsed,
            collapsible: props.collapsible,
            contentPadding: 'none',
            extra: !isHideAddButton && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_block_add_button__WEBPACK_IMPORTED_MODULE_4__.BlockAddButton, {}, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/block/block-content.tsx",
                lineNumber: 41,
                columnNumber: 35
            }, void 0),
            extraPosition: "start",
            theme: "default",
            title: props.title,
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_7__.Box, {
                padding: {
                    top: 'extra-small'
                },
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_space_space__WEBPACK_IMPORTED_MODULE_6__.Space, {
                    className: "w-full",
                    direction: "vertical",
                    size: "extra-small",
                    children: values.map((_value, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_block_item__WEBPACK_IMPORTED_MODULE_5__.BlockItem, {
                                disallowAdd: isDisallowAddRemove || isItemLimitReached || isNoteditable,
                                disallowDelete: isDisallowAddRemove || isNoteditable,
                                disallowReorder: props.disallowReorder === true || isNoteditable,
                                field: index,
                                noteditable: props.noteditable,
                                children: props.children
                            }, void 0, false, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/block/block-content.tsx",
                                lineNumber: 54,
                                columnNumber: 15
                            }, undefined)
                        }, index, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/block/block-content.tsx",
                            lineNumber: 53,
                            columnNumber: 13
                        }, undefined))
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/block/block-content.tsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/block/block-content.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/block/block-content.tsx",
            lineNumber: 36,
            columnNumber: 5
        }, undefined), [
        values
    ]);
};
_s(BlockContent, "0uPG1RBOwzPRiiMyeFicqkwxKVM=", false, function() {
    return [
        _Pimcore_components_form_numbered_list_provider_numbered_list_use_numbered_list__WEBPACK_IMPORTED_MODULE_3__.useNumberedList
    ];
});
_c = BlockContent;
var _c;
$RefreshReg$(_c, "BlockContent");

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
//# sourceMappingURL=js_src_core_mf-bootstrap_ts.a240c8fe1c5723a9.hot-update.js.map