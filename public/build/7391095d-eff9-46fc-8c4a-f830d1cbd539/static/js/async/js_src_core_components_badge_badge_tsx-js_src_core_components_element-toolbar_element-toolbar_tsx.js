"use strict";
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["js_src_core_components_badge_badge_tsx-js_src_core_components_element-toolbar_element-toolbar_tsx"], {
"./js/src/core/components/badge/badge.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Badge: () => (Badge)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 


const Badge = (param)=>{
    let { color, ...props } = param;
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Badge, {
        color: color,
        styles: {
            indicator: {
                outline: `1px solid ${color}`
            },
            root: {
                marginRight: '5px'
            }
        },
        ...props
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/badge/badge.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, undefined);
};
_c = Badge;
var _c;
$RefreshReg$(_c, "Badge");

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
"./js/src/core/components/element-toolbar/element-toolbar.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyle: () => (useStyle)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/antd-style/es/functions/index.js");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
const useStyle = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param)=>{
    let { token, css } = param;
    return {
        toolbar: css`
      display: flex;
      align-items: center;
      gap: 8px;

      .element-toolbar__info-dropdown {
        .ant-dropdown-trigger {
          display: flex;
          align-items: center;
          gap: 4px;
          border: 1px solid ${token.colorBorder};
          background: ${token.colorFillTertiary};
          color: ${token.colorText};

          .ant-btn-icon.ant-btn-icon-end {
            margin-left: 0;
          }

          &:hover .pimcore-icon {
            color: ${token.colorIconHover};
          }
        }
      }
        
      .pimcore-icon {
        color: ${token.colorIcon};
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
"./js/src/core/components/element-toolbar/element-toolbar.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ElementToolbar: () => (ElementToolbar)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_element_toolbar_element_toolbar_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/element-toolbar/element-toolbar.styles.tsx");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/dropdown/dropdown.tsx");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _Pimcore_components_breadcrumb_breadcrumb__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/breadcrumb/breadcrumb.tsx");
/* ESM import */var _Pimcore_modules_element_hooks_use_element_draft__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/element/hooks/use-element-draft.ts");
/* ESM import */var _Pimcore_app_router_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/app/router/router.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _icon_button_icon_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/components/icon-button/icon-button.tsx");
/* ESM import */var _Pimcore_modules_element_actions_locate_in_tree_use_locate_in_tree__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/element/actions/locate-in-tree/use-locate-in-tree.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
var _s = $RefreshSig$();











const ElementToolbar = (param)=>{
    let { id, elementType, editorTabsWidth } = param;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_9__.useTranslation)();
    const elementRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const { styles } = (0,_Pimcore_components_element_toolbar_element_toolbar_styles__WEBPACK_IMPORTED_MODULE_2__.useStyle)();
    const { element } = (0,_Pimcore_modules_element_hooks_use_element_draft__WEBPACK_IMPORTED_MODULE_7__.useElementDraft)(id, elementType);
    const deeplinkUrl = `${window.location.origin}${_Pimcore_app_router_router__WEBPACK_IMPORTED_MODULE_8__.baseUrl}${elementType}/${id}`;
    const [editorTabsBlockSize, setEditorTabsBlockSize] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [locateInTreeLoading, setLocateInTreeLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { locateInTree } = (0,_Pimcore_modules_element_actions_locate_in_tree_use_locate_in_tree__WEBPACK_IMPORTED_MODULE_11__.useLocateInTree)(elementType);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect)(()=>{
        if (editorTabsWidth == null) return;
        editorTabsWidth <= 800 ? setEditorTabsBlockSize('S') : setEditorTabsBlockSize('L');
    }, [
        editorTabsWidth
    ]);
    if (element === undefined) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}, void 0, false);
    }
    const menuItems = [
        {
            key: '1',
            label: t('element.toolbar.copy-id', {
                id: element.id
            }),
            onClick: ()=>{
                void navigator.clipboard.writeText(element.id.toString());
            }
        },
        {
            key: '2',
            label: t('element.toolbar.copy-full-path-to-clipboard'),
            onClick: ()=>{
                void navigator.clipboard.writeText(element.fullPath);
            }
        },
        {
            key: '3',
            label: t('element.toolbar.copy-deep-link-to-clipboard'),
            onClick: ()=>{
                void navigator.clipboard.writeText(deeplinkUrl);
            }
        }
    ];
    if (elementType === 'data-object' && 'className' in element) {
        menuItems === null || menuItems === void 0 ? void 0 : menuItems.splice(0, 0, {
            key: '0',
            label: t('element.toolbar.copy-className', {
                className: element.className
            }),
            onClick: ()=>{
                void navigator.clipboard.writeText(element.className);
            }
        });
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: styles.toolbar,
        ref: elementRef,
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_breadcrumb_breadcrumb__WEBPACK_IMPORTED_MODULE_6__.Breadcrumb, {
                editorTabsWidth: editorTabsWidth,
                elementType: elementType,
                pageSize: editorTabsBlockSize,
                path: element.fullPath
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-toolbar/element-toolbar.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                className: 'element-toolbar__info-dropdown',
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_4__.Dropdown, {
                    menu: {
                        items: menuItems
                    },
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.Button, {
                        icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_5__.Icon, {
                            value: 'chevron-down'
                        }, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-toolbar/element-toolbar.tsx",
                            lineNumber: 104,
                            columnNumber: 15
                        }, void 0),
                        iconPosition: "end",
                        onClick: ()=>{
                            void navigator.clipboard.writeText(element.id.toString());
                        },
                        size: "small",
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.Space, {
                            children: [
                                "ID: ",
                                element.id
                            ]
                        }, void 0, true, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-toolbar/element-toolbar.tsx",
                            lineNumber: 116,
                            columnNumber: 13
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-toolbar/element-toolbar.tsx",
                        lineNumber: 102,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-toolbar/element-toolbar.tsx",
                    lineNumber: 101,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-toolbar/element-toolbar.tsx",
                lineNumber: 100,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_10__.IconButton, {
                icon: {
                    value: 'target'
                },
                loading: locateInTreeLoading,
                onClick: ()=>{
                    setLocateInTreeLoading(true);
                    locateInTree(element.id, ()=>{
                        setLocateInTreeLoading(false);
                    });
                }
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-toolbar/element-toolbar.tsx",
                lineNumber: 123,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-toolbar/element-toolbar.tsx",
        lineNumber: 88,
        columnNumber: 5
    }, undefined);
};
_s(ElementToolbar, "xUQUjn0Gwls+/A4oyuWJ7Rk0xGU=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_9__.useTranslation,
        _Pimcore_components_element_toolbar_element_toolbar_styles__WEBPACK_IMPORTED_MODULE_2__.useStyle,
        _Pimcore_modules_element_hooks_use_element_draft__WEBPACK_IMPORTED_MODULE_7__.useElementDraft,
        _Pimcore_modules_element_actions_locate_in_tree_use_locate_in_tree__WEBPACK_IMPORTED_MODULE_11__.useLocateInTree
    ];
});
_c = ElementToolbar;
var _c;
$RefreshReg$(_c, "ElementToolbar");

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
//# sourceMappingURL=js_src_core_components_badge_badge_tsx-js_src_core_components_element-toolbar_element-toolbar_tsx.js.map