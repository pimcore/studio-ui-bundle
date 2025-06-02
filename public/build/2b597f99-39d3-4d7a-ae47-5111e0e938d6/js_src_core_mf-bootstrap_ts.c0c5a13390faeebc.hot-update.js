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
"./js/src/core/modules/app/base-layout/left-sidebar-view.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  LeftSidebarView: () => (LeftSidebarView)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _left_sidebar_view_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/app/base-layout/left-sidebar-view.styles.ts");
/* ESM import */var _Pimcore_modules_app_component_registry_component_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/app/component-registry/component-config.ts");
/* ESM import */var _Pimcore_modules_app_component_registry_slot_renderer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/app/component-registry/slot-renderer.tsx");
/* ESM import */var _Pimcore_modules_app_base_layout_user_menu_user_menu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/app/base-layout/user-menu/user-menu.tsx");
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





// New functional component
const SidebarNavItem = (param)=>{
    let { Component, context } = param;
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("li", {
        children: Component
    }, context.name, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/base-layout/left-sidebar-view.tsx",
        lineNumber: 19,
        columnNumber: 3
    }, undefined);
};
_c = SidebarNavItem;
const LeftSidebarView = ()=>{
    _s();
    const { styles } = (0,_left_sidebar_view_styles__WEBPACK_IMPORTED_MODULE_2__.useStyles)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: styles.leftSidebar,
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_app_base_layout_user_menu_user_menu__WEBPACK_IMPORTED_MODULE_5__.UserMenu, {
                className: "left-sidebar__avatar"
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/base-layout/left-sidebar-view.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("ul", {
                className: "left-sidebar__nav",
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_app_component_registry_slot_renderer__WEBPACK_IMPORTED_MODULE_4__.SlotRenderer, {
                    onRenderComponent: (Component, context)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(SidebarNavItem, {
                            Component: Component,
                            context: context
                        }, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/base-layout/left-sidebar-view.tsx",
                            lineNumber: 34,
                            columnNumber: 13
                        }, void 0),
                    slot: _Pimcore_modules_app_component_registry_component_config__WEBPACK_IMPORTED_MODULE_3__.componentConfig.leftSidebar.slot
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/base-layout/left-sidebar-view.tsx",
                    lineNumber: 32,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/base-layout/left-sidebar-view.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, undefined),
            "dghsgdhgsh"
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/base-layout/left-sidebar-view.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, undefined);
};
_s(LeftSidebarView, "1BGFRu6BGAbhzJ8kKgs1GUjvI6w=", false, function() {
    return [
        _left_sidebar_view_styles__WEBPACK_IMPORTED_MODULE_2__.useStyles
    ];
});
_c1 = LeftSidebarView;
var _c, _c1;
$RefreshReg$(_c, "SidebarNavItem");
$RefreshReg$(_c1, "LeftSidebarView");

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
//# sourceMappingURL=js_src_core_mf-bootstrap_ts.c0c5a13390faeebc.hot-update.js.map