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
self["webpackHotUpdatepimcore_studio_ui_bundle_core"]("js_src_core_mf-bootstrap_ts", {
"./js/src/core/components/dropdown/dropdown-inner.tsx": (function (module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DropdownInner: () => (DropdownInner)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _menu_menu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/menu/menu.tsx");
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



const DropdownInner = (param)=>{
    let { menu, onSelect, selectedKeys, menuRef, ...props } = param;
    const renderMenuComponent = ()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_menu_menu__WEBPACK_IMPORTED_MODULE_3__.Menu, {
            ref: menuRef,
            ...menu
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/dropdown/dropdown-inner.tsx",
            lineNumber: 22,
            columnNumber: 5
        }, undefined);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Dropdown, {
        ...props,
        dropdownRender: renderMenuComponent,
        children: props.children
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/dropdown/dropdown-inner.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, undefined);
};
_c = DropdownInner;
var _c;
$RefreshReg$(_c, "DropdownInner");

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
"./js/src/core/components/menu/item/menu-item.tsx": (function (module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  MenuItem: () => (MenuItem)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _item_types_custom_custom_item__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/menu/item/types/custom/custom-item.tsx");
/* ESM import */var _item_types_divider_divider_item__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/menu/item/types/divider/divider-item.tsx");
/* ESM import */var _item_types_group_group_item__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/menu/item/types/group/group-item.tsx");
/* ESM import */var _item_types_sub_menu_sub_menu_item__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/menu/item/types/sub-menu/sub-menu-item.tsx");
/* ESM import */var _item_types_default_default_item__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/menu/item/types/default/default-item.tsx");
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






const MenuItem = (param)=>{
    let { item } = param;
    if (item === null) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}, void 0, false);
    }
    if ('type' in item && item.type === 'divider') {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_item_types_divider_divider_item__WEBPACK_IMPORTED_MODULE_3__.DividerItem, {
            ...item
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/menu/item/menu-item.tsx",
            lineNumber: 29,
            columnNumber: 12
        }, undefined);
    }
    if ('type' in item && item.type === 'group') {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_item_types_group_group_item__WEBPACK_IMPORTED_MODULE_4__.GroupItem, {
            ...item
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/menu/item/menu-item.tsx",
            lineNumber: 33,
            columnNumber: 12
        }, undefined);
    }
    if ('type' in item && item.type === 'custom') {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_item_types_custom_custom_item__WEBPACK_IMPORTED_MODULE_2__.CustomItem, {
            ...item
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/menu/item/menu-item.tsx",
            lineNumber: 37,
            columnNumber: 12
        }, undefined);
    }
    if (!('type' in item) && 'children' in item) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_item_types_sub_menu_sub_menu_item__WEBPACK_IMPORTED_MODULE_5__.SubMenuItem, {
            ...item
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/menu/item/menu-item.tsx",
            lineNumber: 41,
            columnNumber: 12
        }, undefined);
    }
    if (!('type' in item) && !('children' in item)) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_item_types_default_default_item__WEBPACK_IMPORTED_MODULE_6__.DefaultItem, {
            ...item,
            id: item.key
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/menu/item/menu-item.tsx",
            lineNumber: 46,
            columnNumber: 7
        }, undefined);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}, void 0, false);
};
_c = MenuItem;
var _c;
$RefreshReg$(_c, "MenuItem");

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
"./js/src/core/components/menu/item/types/custom/custom-item.tsx": (function (module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  CustomItem: () => (CustomItem)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
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

const CustomItem = (param)=>{
    let { component } = param;
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: component
    }, void 0, false);
};
_c = CustomItem;
var _c;
$RefreshReg$(_c, "CustomItem");

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
"./js/src/core/components/menu/item/types/default/default-item.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyles: () => (useStyles)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/antd-style/es/functions/index.js");
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
const useStyles = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param)=>{
    let { token, css } = param;
    return {
        dropdownItem: css`
      &.ant-dropdown-menu-item-active {
        background-color: ${token.colorBgContainer} !important;

        &:hover {
          background-color: rgba(0, 0, 0, 0.04) !important;
        }
      }

      &.default-item--with-icon-right {
        padding-right: 4px !important;
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
"./js/src/core/components/menu/item/types/default/default-item.tsx": (function (module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DefaultItem: () => (DefaultItem),
  WithExtendedApi: () => (WithExtendedApi)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _default_item_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/menu/item/types/default/default-item.styles.tsx");
/* ESM import */var _Pimcore_components_spin_spin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/spin/spin.tsx");
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




const WithExtendedApi = (Component)=>{
    var _s = $RefreshSig$();
    const DecoratedMenuItem = (param)=>{
        let { label, key, selectable, id, icon, ...props } = param;
        _s();
        const { styles } = (0,_default_item_styles__WEBPACK_IMPORTED_MODULE_3__.useStyles)();
        const classes = [
            styles.dropdownItem
        ];
        classes.push('is-custom-item');
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {
            id: key,
            ...props,
            className: classes.join(' '),
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Flex, {
                align: "center",
                gap: 8,
                children: [
                    props.isLoading === true && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_spin_spin__WEBPACK_IMPORTED_MODULE_4__.Spin, {
                        tip: "Loading",
                        type: "classic"
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/menu/item/types/default/default-item.tsx",
                        lineNumber: 39,
                        columnNumber: 13
                    }, undefined),
                    icon,
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                        children: label
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/menu/item/types/default/default-item.tsx",
                        lineNumber: 47,
                        columnNumber: 11
                    }, undefined),
                    props.extra !== undefined && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                        children: props.extra
                    }, void 0, false)
                ]
            }, void 0, true, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/menu/item/types/default/default-item.tsx",
                lineNumber: 34,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/menu/item/types/default/default-item.tsx",
            lineNumber: 29,
            columnNumber: 7
        }, undefined);
    };
    _s(DecoratedMenuItem, "1BGFRu6BGAbhzJ8kKgs1GUjvI6w=", false, function() {
        return [
            _default_item_styles__WEBPACK_IMPORTED_MODULE_3__.useStyles
        ];
    });
    return DecoratedMenuItem;
};
_c = WithExtendedApi;
const DefaultItem = WithExtendedApi(antd__WEBPACK_IMPORTED_MODULE_2__.Menu.Item);
var _c;
$RefreshReg$(_c, "WithExtendedApi");

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
"./js/src/core/components/menu/item/types/divider/divider-item.tsx": (function (module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DividerItem: () => (DividerItem)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
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


const DividerItem = (props)=>{
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_1__.Menu.Divider, {
        ...props
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/menu/item/types/divider/divider-item.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, undefined);
};
_c = DividerItem;
var _c;
$RefreshReg$(_c, "DividerItem");

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
"./js/src/core/components/menu/item/types/group/group-item.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyles: () => (useStyles)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/antd-style/es/functions/index.js");
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
const useStyles = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param)=>{
    let { token, css } = param;
    return {
        groupItem: css`
      .ant-dropdown-menu-item-group-list {
        margin: 0 !important;
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
"./js/src/core/components/menu/item/types/group/group-item.tsx": (function (module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  GroupItem: () => (GroupItem),
  WithExtendedApi: () => (WithExtendedApi)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _group_item_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/menu/item/types/group/group-item.styles.tsx");
/* ESM import */var _menu_item__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/menu/item/menu-item.tsx");
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




const WithExtendedApi = (Component)=>{
    var _s = $RefreshSig$();
    const ExtendedMenuItemGroup = (param)=>{
        let { children, label, ...props } = param;
        _s();
        const { styles } = (0,_group_item_styles__WEBPACK_IMPORTED_MODULE_3__.useStyles)();
        return(// @ts-expect-error ref is incompatible due to wrong typing in antd
        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {
            title: label,
            ...props,
            className: styles.groupItem,
            children: children === null || children === void 0 ? void 0 : children.map((item)=>(0,_menu_item__WEBPACK_IMPORTED_MODULE_4__.MenuItem)({
                    item
                }))
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/menu/item/types/group/group-item.tsx",
            lineNumber: 23,
            columnNumber: 7
        }, undefined));
    };
    _s(ExtendedMenuItemGroup, "1BGFRu6BGAbhzJ8kKgs1GUjvI6w=", false, function() {
        return [
            _group_item_styles__WEBPACK_IMPORTED_MODULE_3__.useStyles
        ];
    });
    return ExtendedMenuItemGroup;
};
_c = WithExtendedApi;
const GroupItem = WithExtendedApi(antd__WEBPACK_IMPORTED_MODULE_1__.Menu.ItemGroup);
var _c;
$RefreshReg$(_c, "WithExtendedApi");

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
"./js/src/core/components/menu/item/types/sub-menu/sub-menu-item.tsx": (function (module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SubMenuItem: () => (SubMenuItem),
  WithExtendedApi: () => (WithExtendedApi)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _menu_item__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/menu/item/menu-item.tsx");
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



const WithExtendedApi = (Component)=>{
    const ExtendedSubmenu = (param)=>{
        let { children, popupOffset, label, ...props } = param;
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {
            title: label,
            ...props,
            children: children === null || children === void 0 ? void 0 : children.map((item)=>(0,_menu_item__WEBPACK_IMPORTED_MODULE_3__.MenuItem)({
                    item
                }))
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/menu/item/types/sub-menu/sub-menu-item.tsx",
            lineNumber: 19,
            columnNumber: 7
        }, undefined);
    };
    return ExtendedSubmenu;
};
_c = WithExtendedApi;
const SubMenuItem = WithExtendedApi(antd__WEBPACK_IMPORTED_MODULE_1__.Menu.SubMenu);
var _c;
$RefreshReg$(_c, "WithExtendedApi");

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
"./js/src/core/components/menu/menu.tsx": (function (module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Menu: () => (Menu)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _item_menu_item__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/menu/item/menu-item.tsx");
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



const Menu = (props)=>{
    var _props_items;
    const filteredItems = (_props_items = props.items) === null || _props_items === void 0 ? void 0 : _props_items.filter(function filterItems(item) {
        // @ts-expect-error - the prop exists trust me bro ;)
        if ((item === null || item === void 0 ? void 0 : item.hidden) === true) {
            return false;
        }
        // @ts-expect-error - the prop exists trust me bro ;)
        if ((item === null || item === void 0 ? void 0 : item.children) !== undefined) {
            // @ts-expect-error - the prop exists trust me bro ;)
            const filteredChildren = item.children.filter(filterItems);
            // @ts-expect-error - the prop exists trust me bro ;)
            item.children = filteredChildren;
            return filteredChildren.length;
        }
        return true;
    });
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Menu, {
        ...props,
        items: undefined,
        children: filteredItems === null || filteredItems === void 0 ? void 0 : filteredItems.map((item)=>(0,_item_menu_item__WEBPACK_IMPORTED_MODULE_3__.MenuItem)({
                item
            }))
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/menu/menu.tsx",
        lineNumber: 71,
        columnNumber: 5
    }, undefined);
};
_c = Menu;
var _c;
$RefreshReg$(_c, "Menu");

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
"./js/src/core/modules/icon-library/index.ts": (function () {
throw new Error("  × Module build failed:\n  ├─▶   ×   \u001b[31m×\u001b[0m Unterminated string constant\n  │     │       ╭─[\u001b[36;1;4m/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/icon-library/index.ts:1000:1\u001b[0m]\n  │     │  \u001b[2m 997\u001b[0m │       component: workflow\n  │     │  \u001b[2m 998\u001b[0m │     })\n  │     │  \u001b[2m 999\u001b[0m │     iconLibrary.register({\n  │     │  \u001b[2m1000\u001b[0m │       name: 'wysiwyg-fie\n  │     │       · \u001b[35;1m            ────────────\u001b[0m\n  │     │       ╰────\n  │     │   \u001b[31m×\u001b[0m Unexpected eof\n  │     │       ╭─[\u001b[36;1;4m/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/icon-library/index.ts:1000:1\u001b[0m]\n  │     │  \u001b[2m 997\u001b[0m │       component: workflow\n  │     │  \u001b[2m 998\u001b[0m │     })\n  │     │  \u001b[2m 999\u001b[0m │     iconLibrary.register({\n  │     │  \u001b[2m1000\u001b[0m │       name: 'wysiwyg-fie\n  │     │       ╰────\n  │     │\n  │   \n  ╰─▶ Syntax Error\n");


}),

});
//# sourceMappingURL=js_src_core_mf-bootstrap_ts.7f435c1dc1a11ccc.hot-update.js.map