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
"./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/components/classification-store-modal/classification-store-modal.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ClassificationStoreModal: () => (ClassificationStoreModal)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_tabs_tabs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/tabs/tabs.tsx");
/* ESM import */var _Pimcore_components_modal_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/modal/modal.tsx");
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



const ClassificationStoreModal = (props)=>{
    const { isOpen, close } = props;
    const tabItems = [
        {
            label: 'Collection',
            key: 'collection',
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                children: "Collection"
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/components/classification-store-modal/classification-store-modal.tsx",
                lineNumber: 30,
                columnNumber: 17
            }, undefined)
        },
        {
            label: 'Group',
            key: 'group',
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                children: "Group"
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/components/classification-store-modal/classification-store-modal.tsx",
                lineNumber: 35,
                columnNumber: 17
            }, undefined)
        },
        {
            label: 'Group by key',
            key: 'group-by-key',
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                children: "Group by key"
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/components/classification-store-modal/classification-store-modal.tsx",
                lineNumber: 40,
                columnNumber: 17
            }, undefined)
        }
    ];
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: isOpen && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_modal_modal__WEBPACK_IMPORTED_MODULE_3__.Modal, {
            closable: true,
            footer: null,
            onCancel: ()=>{
                close();
            },
            open: isOpen,
            size: 'XL',
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_tabs_tabs__WEBPACK_IMPORTED_MODULE_2__.Tabs, {
                items: tabItems,
                noTabBarMargin: true
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/components/classification-store-modal/classification-store-modal.tsx",
                lineNumber: 54,
                columnNumber: 11
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/components/classification-store-modal/classification-store-modal.tsx",
            lineNumber: 47,
            columnNumber: 9
        }, undefined)
    }, void 0, false);
};
_c = ClassificationStoreModal;
var _c;
$RefreshReg$(_c, "ClassificationStoreModal");

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
//# sourceMappingURL=js_src_core_mf-bootstrap_ts.f02b830a1008f888.hot-update.js.map