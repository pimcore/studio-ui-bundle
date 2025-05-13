"use strict";
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["js_src_core_components_breadcrumb_breadcrumb_tsx-js_src_core_components_inheritance-overlay_h-7c9213"], {
"./js/src/core/components/breadcrumb/breadcrumb.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
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
        breadcrumb: css`
      .ant-dropdown-trigger {
        cursor: pointer;
        
        > span[role="img"] {
          display: none
        }
      }
    `,
        breadcrumbLink: css`
      color: ${token.colorTextTertiary};
    `,
        breadcrumbLinkLast: css`
      color: ${token.colorText};
    `,
        pathItem: css`
       cursor: pointer;
       
       &:hover {
         color: ${token.colorPrimaryHover};
       }
    `,
        dropdownMenu: css`
      max-width: 400px;
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
"./js/src/core/components/breadcrumb/breadcrumb.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Breadcrumb: () => (Breadcrumb),
  useBreadcrumbSize: () => (/* reexport safe */ _hooks_use_breadcrumb_size__WEBPACK_IMPORTED_MODULE_8__.useBreadcrumbSize)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/classnames/index.js");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _Pimcore_modules_element_element_api_slice_gen__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/element/element-api-slice.gen.ts");
/* ESM import */var _Pimcore_modules_element_hooks_use_element_helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/element/hooks/use-element-helper.ts");
/* ESM import */var _Pimcore_components_text_text__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/text/text.tsx");
/* ESM import */var _hooks_use_breadcrumb_size__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/breadcrumb/hooks/use-breadcrumb-size.ts");
/* ESM import */var _breadcrumb_styles__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/components/breadcrumb/breadcrumb.styles.ts");
/* ESM import */var _filename_filename__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/components/filename/filename.tsx");
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











const Breadcrumb = (param)=>{
    let { path, elementType, editorTabsWidth, pageSize } = param;
    _s();
    const dispatch = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_4__.useAppDispatch)();
    const hasFilename = elementType === 'asset';
    const [initialBreadcrumbLastElementWidth, setInitialBreadcrumbLastElementWidth] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const breadcrumbElementRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const { openElement } = (0,_Pimcore_modules_element_hooks_use_element_helper__WEBPACK_IMPORTED_MODULE_6__.useElementHelper)();
    const { styles } = (0,_breadcrumb_styles__WEBPACK_IMPORTED_MODULE_9__.useStyle)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (initialBreadcrumbLastElementWidth === 0) {
            var _breadcrumbElementRef_current;
            const initialBreadcrumbWidth = (breadcrumbElementRef === null || breadcrumbElementRef === void 0 ? void 0 : (_breadcrumbElementRef_current = breadcrumbElementRef.current) === null || _breadcrumbElementRef_current === void 0 ? void 0 : _breadcrumbElementRef_current.offsetWidth) ?? 0;
            setInitialBreadcrumbLastElementWidth(initialBreadcrumbWidth);
        }
    }, []);
    const { isHideBreadcrumb, currentBreadcrumbWidth } = (0,_hooks_use_breadcrumb_size__WEBPACK_IMPORTED_MODULE_8__.useBreadcrumbSize)(editorTabsWidth, initialBreadcrumbLastElementWidth);
    let items = [];
    // Handle click event for intermediate parts of breadcrumb
    const handleMenuItemClick = (path)=>{
        const elementIdFetcher = dispatch(_Pimcore_modules_element_element_api_slice_gen__WEBPACK_IMPORTED_MODULE_5__.api.endpoints.elementGetIdByPath.initiate({
            elementType,
            elementPath: path
        }));
        elementIdFetcher.then((param)=>{
            let { data } = param;
            if (data !== undefined) {
                openElement({
                    id: data.id,
                    type: elementType
                }).catch(()=>{});
            }
        }).catch(()=>{});
    };
    function getBreadcrumbItems(path) {
        // Split to check if it has more that just a single key
        const partList = path.split('/');
        const partListAmount = partList.length;
        // Generate the breadcrumb text with ellipsis
        const generateBreadcrumbText = (param)=>{
            let { content, style, className, hasFilename = false } = param;
            if (hasFilename) {
                return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_filename_filename__WEBPACK_IMPORTED_MODULE_10__.Filename, {
                    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(styles.breadcrumbLink, className),
                    ellipsis: true,
                    style: style,
                    value: content
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/breadcrumb/breadcrumb.tsx",
                    lineNumber: 87,
                    columnNumber: 11
                }, this);
            }
            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_text_text__WEBPACK_IMPORTED_MODULE_7__.Text, {
                className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(styles.breadcrumbLink, className),
                ellipsis: {
                    tooltip: {
                        title: content
                    }
                },
                style: style,
                children: content
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/breadcrumb/breadcrumb.tsx",
                lineNumber: 97,
                columnNumber: 9
            }, this);
        };
        // Prepend the "..." menu to the existing items array
        const addDotsMenu = (param)=>{
            let { dotsMenuItems, items } = param;
            return [
                {
                    title: '...',
                    menu: {
                        items: dotsMenuItems,
                        className: styles.dropdownMenu
                    }
                },
                ...items
            ];
        };
        if (partListAmount > 2 && pageSize === 'L') {
            items.push({
                title: generateBreadcrumbText({
                    content: partList[partListAmount - 2],
                    style: {
                        maxWidth: '100px'
                    }
                }),
                className: styles.pathItem,
                onClick: ()=>{
                    handleMenuItemClick(partList.slice(0, partListAmount - 1).join('/'));
                }
            });
            if (partListAmount > 3) {
                const dotsMenuItems = [];
                for(let i = 1; i < partListAmount - 2; i++){
                    dotsMenuItems.push({
                        title: partList[i],
                        onClick: ()=>{
                            handleMenuItemClick(partList.slice(0, i + 1).join('/'));
                        }
                    });
                }
                items = addDotsMenu({
                    dotsMenuItems,
                    items
                });
            }
        }
        if (partListAmount > 2 && pageSize !== 'L') {
            const dotsMenuItems = [];
            for(let i = 1; i < partListAmount; i++){
                dotsMenuItems.push({
                    title: partList[i],
                    onClick: ()=>{
                        handleMenuItemClick(partList.slice(0, i + 1).join('/'));
                    }
                });
            }
            items = addDotsMenu({
                dotsMenuItems,
                items
            });
        }
        // Add the last item of the breadcrumb
        items.push({
            title: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                ref: breadcrumbElementRef,
                children: generateBreadcrumbText({
                    content: partList[partListAmount - 1],
                    style: {
                        ...isHideBreadcrumb && {
                            maxWidth: `${currentBreadcrumbWidth}px`
                        }
                    },
                    className: styles.breadcrumbLinkLast,
                    hasFilename
                })
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/breadcrumb/breadcrumb.tsx",
                lineNumber: 162,
                columnNumber: 9
            }, this)
        });
        return items;
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Breadcrumb, {
        className: styles.breadcrumb,
        items: getBreadcrumbItems(path)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/breadcrumb/breadcrumb.tsx",
        lineNumber: 177,
        columnNumber: 5
    }, undefined);
};
_s(Breadcrumb, "Ew+qogDav+lntRxgWcDFgItFhg0=", false, function() {
    return [
        _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_4__.useAppDispatch,
        _Pimcore_modules_element_hooks_use_element_helper__WEBPACK_IMPORTED_MODULE_6__.useElementHelper,
        _breadcrumb_styles__WEBPACK_IMPORTED_MODULE_9__.useStyle,
        _hooks_use_breadcrumb_size__WEBPACK_IMPORTED_MODULE_8__.useBreadcrumbSize
    ];
});
_c = Breadcrumb;
var _c;
$RefreshReg$(_c, "Breadcrumb");

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
"./js/src/core/components/breadcrumb/hooks/use-breadcrumb-size.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useBreadcrumbSize: () => (useBreadcrumbSize)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
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
const useBreadcrumbSize = (editorTabsWidth, initialBreadcrumbLastElementWidth)=>{
    const [isHideBreadcrumb, setIsHideBreadcrumb] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const [currentBreadcrumbWidth, setCurrentBreadcrumbWidth] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)(()=>{
        if (editorTabsWidth == null || initialBreadcrumbLastElementWidth == null) return;
        const getBreadcrumbSettings = (width)=>{
            if (width <= 375) return {
                isHide: true,
                width: 50
            };
            if (width <= 450) return {
                isHide: true,
                width: 70
            };
            if (width <= 550) return {
                isHide: true,
                width: 85
            };
            if (width <= 700) return {
                isHide: true,
                width: 100
            };
            if (width <= 800) return {
                isHide: true,
                width: 150
            };
            if (width <= 900) return {
                isHide: true,
                width: 200
            };
            if (width <= 1000) return {
                isHide: true,
                width: 300
            };
            if (width <= 1100) return {
                isHide: true,
                width: 400
            };
            if (width <= 1200) return {
                isHide: true,
                width: 500
            };
            if (width <= 1300) return {
                isHide: true,
                width: 600
            };
            return {
                isHide: false,
                width: initialBreadcrumbLastElementWidth
            };
        };
        const { isHide, width } = getBreadcrumbSettings(editorTabsWidth);
        setIsHideBreadcrumb(isHide);
        setCurrentBreadcrumbWidth(width);
    }, [
        editorTabsWidth,
        initialBreadcrumbLastElementWidth
    ]);
    return {
        isHideBreadcrumb,
        currentBreadcrumbWidth
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
"./js/src/core/components/inheritance-overlay/hooks/use-inheritance-overlay-style.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useInheritanceOverlayStyle: () => (useInheritanceOverlayStyle)
});
/* ESM import */var _inheritance_overlay_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/components/inheritance-overlay/inheritance-overlay.styles.tsx");
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
const useInheritanceOverlayStyle = (props)=>{
    const { styles } = (0,_inheritance_overlay_styles__WEBPACK_IMPORTED_MODULE_0__.useStyles)();
    if (props.type === 'form-item-container' && props.inherited === true) {
        return styles.inheritedFormItemContainer;
    }
    if (props.type === 'form-element' && props.inherited === true) {
        return styles.inheritedFormElement;
    }
    if (props.type === 'manual' && props.inherited === true) {
        return styles.inheritedManual;
    }
    if (props.type === 'wrapper' && props.inherited === true) {
        return styles.inheritedWrapper;
    }
    if (props.type === 'grid-cell' && props.inherited === true) {
        return styles.inheritedGridCell;
    }
    return undefined;
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
"./js/src/core/components/inheritance-overlay/inheritance-overlay.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyles: () => (useStyles)
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
const useStyles = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param)=>{
    let { token, css } = param;
    const overlay = css`
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${token.colorBgContainerDisabled};
    backdrop-filter: grayscale(70%);
    pointer-events: none;
    opacity: 1;
  `;
    return {
        inheritedFormItemContainer: css`
      .ant-form-item-control-input-content > * {
        filter: opacity(0.5);
      }
      .ant-form-item-control-input-content:after {
        ${overlay};
      }
    `,
        inheritedFormElement: css`
      .ant-form-item-control-input-content > * > * {
        opacity: 0.7;
      }
        
      .ant-form-item-control-input-content > *:after {
        ${overlay};
      }
    `,
        inheritedManual: css`
      .studio-inherited-overlay {
        position: relative;
      }
      .studio-inherited-overlay > * {
        filter: opacity(0.5);
      }
      .studio-inherited-overlay:after {
        ${overlay};
      }
    `,
        inheritedWrapper: css`
      & {
        position: relative;
      }
      & > * {
        filter: opacity(0.5);
      }
      &:after {
        ${overlay};
      }
    `,
        inheritedGridCell: css`
      padding-right: 20px;
      
      & > * {
        filter: opacity(0.5);
      }
      &:after {
        ${overlay};
        backdrop-filter: none;
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
"./js/src/core/components/modal/footer/modal-footer.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
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
        footer: css`
        &.--divider {
            padding-top: 10px;
            border-top: 1px solid ${token.Divider.colorSplit}
        }
        
            .ant-btn-link {
                color: ${token.colorPrimary};
                margin: 0;
                padding: 0;

                &:hover {
                    color: ${token.colorPrimaryHover};
                }
            }
        `
    };
}, {
    hashPriority: 'low'
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
"./js/src/core/components/modal/footer/modal-footer.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ModalFooter: () => (ModalFooter)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_modal_footer_modal_footer_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/modal/footer/modal-footer.styles.tsx");
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
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



const ModalFooter = (param)=>{
    let { justify = 'flex-end', divider = false, ...props } = param;
    _s();
    const { styles } = (0,_Pimcore_components_modal_footer_modal_footer_styles__WEBPACK_IMPORTED_MODULE_2__.useStyle)();
    const { children, ...inlineProps } = props;
    const classes = [
        `ant-modal-footer-container ${styles.footer}`
    ].filter(Boolean);
    if (divider) {
        classes.push('--divider');
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_3__.Flex, {
        align: 'center',
        className: classes.join(' '),
        gap: 'extra-small',
        justify: justify,
        ...inlineProps,
        children: children
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/modal/footer/modal-footer.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, undefined);
};
_s(ModalFooter, "4AcVho8W1Y+Yfard/v4lDs8ZRDQ=", false, function() {
    return [
        _Pimcore_components_modal_footer_modal_footer_styles__WEBPACK_IMPORTED_MODULE_2__.useStyle
    ];
});
_c = ModalFooter;
var _c;
$RefreshReg$(_c, "ModalFooter");

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
"./js/src/core/components/tooltip/tooltip.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Tooltip: () => (Tooltip)
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


const Tooltip = (props)=>{
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Tooltip, {
        ...props
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/tooltip/tooltip.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, undefined);
};
_c = Tooltip;
var _c;
$RefreshReg$(_c, "Tooltip");

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
"./js/src/core/modules/asset/editor/toolbar/workflow-log-modal/hooks/use-submit-workflow.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useSubmitWorkflow: () => (useSubmitWorkflow)
});
/* ESM import */var _Pimcore_modules_element_editor_shared_tab_manager_tabs_workflow_workflow_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/element/editor/shared-tab-manager/tabs/workflow/workflow-api-slice-enhanced.ts");
/* ESM import */var _Pimcore_components_message_useMessage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/message/useMessage/index.tsx");
/* ESM import */var i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/i18next/dist/esm/i18next.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _Pimcore_modules_asset_editor_toolbar_workflow_log_modal_hooks_use_workflow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/asset/editor/toolbar/workflow-log-modal/hooks/use-workflow.ts");
/* ESM import */var _Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/element/hooks/use-element-context.ts");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
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







const useSubmitWorkflow = (workflowName)=>{
    const { id, elementType } = (0,_Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_5__.useElementContext)();
    const messageApi = (0,_Pimcore_components_message_useMessage__WEBPACK_IMPORTED_MODULE_1__.useMessage)();
    const { setContextWorkflowDetails } = (0,_Pimcore_modules_asset_editor_toolbar_workflow_log_modal_hooks_use_workflow__WEBPACK_IMPORTED_MODULE_4__.useWorkflow)();
    const [fetchSubmitWorkflowActionMutation, { isLoading: submissionLoading, isSuccess: submissionSuccess, isError: isSubmissionError, error }] = (0,_Pimcore_modules_element_editor_shared_tab_manager_tabs_workflow_workflow_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useWorkflowActionSubmitMutation)({
        fixedCacheKey: `shared-submit-workflow-action-${workflowName}`
    });
    (0,react__WEBPACK_IMPORTED_MODULE_7__.useEffect)(()=>{
        if (isSubmissionError) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_6__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_6__.ApiError(error));
        }
    }, [
        isSubmissionError
    ]);
    const workFlowTransition = (transition, actionType, workFlowName, workFlowOptions)=>{
        const workflowId = lodash__WEBPACK_IMPORTED_MODULE_3___default().snakeCase(workFlowName);
        const transitionId = lodash__WEBPACK_IMPORTED_MODULE_3___default().snakeCase(transition);
        return {
            submitAction: {
                actionType,
                elementId: id,
                elementType,
                workflowId,
                transitionId,
                workflowOptions: workFlowOptions
            }
        };
    };
    const submitWorkflowAction = (transition, actionType, workflowName, workFlowOptions)=>{
        setContextWorkflowDetails({
            transition,
            action: actionType,
            workflowName
        });
        fetchSubmitWorkflowActionMutation(workFlowTransition(transition, actionType, workflowName, workFlowOptions)).unwrap().then((response)=>{
            if ('data' in response) {
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                messageApi.success({
                    content: (0,i18next__WEBPACK_IMPORTED_MODULE_2__.t)('action-applied-successfully') + ': ' + (0,i18next__WEBPACK_IMPORTED_MODULE_2__.t)(`${workflowName}`),
                    type: 'success',
                    duration: 3
                });
            }
        }).catch((error)=>{
            console.error(`Failed to submit workflow action ${error}`);
        });
    };
    return {
        submitWorkflowAction,
        submissionLoading,
        submissionSuccess,
        submissionError: isSubmissionError
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
"./js/src/core/modules/asset/editor/toolbar/workflow-log-modal/hooks/use-workflow.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useWorkflow: () => (useWorkflow)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _Pimcore_modules_asset_editor_toolbar_workflow_log_modal_workflow_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/asset/editor/toolbar/workflow-log-modal/workflow-provider.tsx");
/* ESM import */var _Pimcore_modules_element_editor_shared_tab_manager_tabs_workflow_workflow_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/element/editor/shared-tab-manager/tabs/workflow/workflow-api-slice-enhanced.ts");
/* ESM import */var _Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/element/hooks/use-element-context.ts");
/* ESM import */var _Pimcore_modules_element_hooks_use_element_draft__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/element/hooks/use-element-draft.ts");
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




const useWorkflow = ()=>{
    const { openModal, closeModal, isModalOpen, contextWorkflowDetails, setContextWorkflowDetails } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_Pimcore_modules_asset_editor_toolbar_workflow_log_modal_workflow_provider__WEBPACK_IMPORTED_MODULE_1__.WorkflowContext);
    const { id, elementType } = (0,_Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_3__.useElementContext)();
    const { element } = (0,_Pimcore_modules_element_hooks_use_element_draft__WEBPACK_IMPORTED_MODULE_4__.useElementDraft)(id, elementType);
    const hasWorkflowAvailable = (element === null || element === void 0 ? void 0 : element.hasWorkflowAvailable) ?? false;
    const { data: workflowDetailsData, isFetching: isFetchingWorkflowDetails } = (0,_Pimcore_modules_element_editor_shared_tab_manager_tabs_workflow_workflow_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__.useWorkflowGetDetailsQuery)({
        elementType,
        elementId: id
    }, {
        skip: !hasWorkflowAvailable
    });
    return {
        openModal,
        closeModal,
        isModalOpen,
        contextWorkflowDetails,
        setContextWorkflowDetails,
        workflowDetailsData,
        isFetchingWorkflowDetails
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
"./js/src/core/modules/asset/editor/toolbar/workflow-log-modal/workflow-provider.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  WorkFlowProvider: () => (WorkFlowProvider),
  WorkflowContext: () => (WorkflowContext)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
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

const WorkflowContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({
    isModalOpen: false,
    openModal: ()=>{},
    closeModal: ()=>{},
    contextWorkflowDetails: null,
    setContextWorkflowDetails: ()=>{}
});
const WorkFlowProvider = (param)=>{
    let { children } = param;
    _s();
    const [isModalOpen, setModalOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [contextWorkflowDetails, setContextWorkflowDetails] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const openModal = (workflowDetails)=>{
        setContextWorkflowDetails(workflowDetails);
        setModalOpen(true);
    };
    const closeModal = ()=>{
        setModalOpen(false);
    };
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(WorkflowContext.Provider, {
            value: {
                isModalOpen,
                openModal,
                closeModal,
                contextWorkflowDetails,
                setContextWorkflowDetails
            },
            children: children
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/toolbar/workflow-log-modal/workflow-provider.tsx",
            lineNumber: 55,
            columnNumber: 5
        }, undefined), [
        isModalOpen,
        children,
        contextWorkflowDetails
    ]);
};
_s(WorkFlowProvider, "zrC/MQnuPnDFOngMUg/nOMSVons=");
_c = WorkFlowProvider;
var _c;
$RefreshReg$(_c, "WorkFlowProvider");

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
"./js/src/core/modules/element/actions/locate-in-tree/use-locate-in-tree.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useLocateInTree: () => (useLocateInTree)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _Pimcore_components_element_tree_element_tree_slice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/element-tree/element-tree-slice.ts");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* ESM import */var _Pimcore_modules_element_element_api_slice_gen__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/element/element-api-slice.gen.ts");
/* ESM import */var _Pimcore_modules_perspectives_active_perspective_slice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/perspectives/active-perspective-slice.ts");
/* ESM import */var _Pimcore_modules_widget_manager_hooks_use_widget_manager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/widget-manager/hooks/use-widget-manager.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_8__);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var ___WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/element/actions/index.ts");
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











const useLocateInTree = (elementType)=>{
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_10__.useTranslation)();
    const dispatch = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_1__.useAppDispatch)();
    const activePerspective = (0,_Pimcore_modules_perspectives_active_perspective_slice__WEBPACK_IMPORTED_MODULE_6__.selectActivePerspective)(_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_1__.store.getState());
    const { switchToWidget } = (0,_Pimcore_modules_widget_manager_hooks_use_widget_manager__WEBPACK_IMPORTED_MODULE_7__.useWidgetManager)();
    const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_9__.useState)(false);
    const locateInTree = (elementId, onFinished)=>{
        if ((0,lodash__WEBPACK_IMPORTED_MODULE_8__.isNull)(activePerspective)) {
            return;
        }
        dispatch(_Pimcore_modules_element_element_api_slice_gen__WEBPACK_IMPORTED_MODULE_5__.api.endpoints.elementGetTreeLocation.initiate({
            id: elementId,
            elementType,
            perspectiveId: activePerspective.id
        }, {
            forceRefetch: true
        })).then((result)=>{
            if (!(0,lodash__WEBPACK_IMPORTED_MODULE_8__.isNil)(result.data) && !(0,lodash__WEBPACK_IMPORTED_MODULE_8__.isNil)(result.data.treeLevelData)) {
                const treeId = result.data.widgetId;
                switchToWidget(treeId);
                dispatch((0,_Pimcore_components_element_tree_element_tree_slice__WEBPACK_IMPORTED_MODULE_2__.locateInTree)({
                    treeId,
                    nodeId: String(elementId),
                    treeLevelData: result.data.treeLevelData
                }));
                onFinished === null || onFinished === void 0 ? void 0 : onFinished();
            }
        }).catch(()=>{
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_4__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_4__.GeneralError('An error occured while locating in the tree'));
        });
    };
    const locateInTreeGridContextMenuItem = (row, onFinish)=>{
        const data = row.original ?? {};
        if (data.id === undefined) {
            return;
        }
        return {
            label: t('element.locate-in-tree'),
            key: ___WEBPACK_IMPORTED_MODULE_11__.ContextMenuActionName.locateInTree,
            isLoading,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__.Icon, {
                value: 'target'
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/actions/locate-in-tree/use-locate-in-tree.tsx",
                lineNumber: 77,
                columnNumber: 13
            }, undefined),
            onClick: async ()=>{
                setIsLoading(true);
                locateInTree(data.id, ()=>{
                    onFinish === null || onFinish === void 0 ? void 0 : onFinish();
                    setIsLoading(false);
                });
            }
        };
    };
    return {
        locateInTree,
        locateInTreeGridContextMenuItem
    };
};
_s(useLocateInTree, "ZeN4khT9nAZTXmbBlvkWT3bjzhc=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_10__.useTranslation,
        _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_1__.useAppDispatch,
        _Pimcore_modules_widget_manager_hooks_use_widget_manager__WEBPACK_IMPORTED_MODULE_7__.useWidgetManager
    ];
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
"./js/src/core/modules/element/editor/shared-tab-manager/tabs/workflow/workflow-api-slice-enhanced.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useWorkflowActionSubmitMutation: () => (useWorkflowActionSubmitMutation),
  useWorkflowGetDetailsQuery: () => (useWorkflowGetDetailsQuery)
});
/* ESM import */var _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/tags.ts");
/* ESM import */var _workflow_api_slice_gen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/element/editor/shared-tab-manager/tabs/workflow/workflow-api-slice.gen.ts");
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

const api = _workflow_api_slice_gen__WEBPACK_IMPORTED_MODULE_1__.api.enhanceEndpoints({
    addTagTypes: [
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.ASSET_DETAIL,
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.DATA_OBJECT_DETAIL,
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.WORKFLOW
    ],
    endpoints: {
        workflowGetDetails: {
            providesTags: (result, error, args)=>{
                const tags = _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.ELEMENT_WORKFLOW(args.elementType, args.elementId);
                return tags.filter((tag)=>tag !== undefined);
            }
        },
        workflowActionSubmit: {
            invalidatesTags: (result, error, args)=>{
                const tags = _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.ELEMENT_WORKFLOW(args.submitAction.elementType, args.submitAction.elementId);
                return tags.filter((tag)=>tag !== undefined);
            }
        }
    }
});
const { useWorkflowActionSubmitMutation, useWorkflowGetDetailsQuery } = api;

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
"./js/src/core/modules/element/editor/shared-tab-manager/tabs/workflow/workflow-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useWorkflowActionSubmitMutation: () => (useWorkflowActionSubmitMutation),
  useWorkflowGetDetailsQuery: () => (useWorkflowGetDetailsQuery)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Workflows"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            workflowGetDetails: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/workflows/details`,
                        params: {
                            elementId: queryArg.elementId,
                            elementType: queryArg.elementType
                        }
                    }),
                providesTags: [
                    "Workflows"
                ]
            }),
            workflowActionSubmit: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/workflows/action`,
                        method: "POST",
                        body: queryArg.submitAction
                    }),
                invalidatesTags: [
                    "Workflows"
                ]
            })
        }),
    overrideExisting: false
});

const { useWorkflowGetDetailsQuery, useWorkflowActionSubmitMutation } = injectedRtkApi;

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
"./js/src/core/modules/element/hooks/use-element-draft.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useElementDraft: () => (useElementDraft)
});
/* ESM import */var _Pimcore_modules_asset_hooks_use_asset_draft__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/asset/hooks/use-asset-draft.ts");
/* ESM import */var _Pimcore_modules_data_object_hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/data-object/hooks/use-data-object-draft.ts");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
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


const useElementDraft = (id, elementType)=>{
    if (elementType === 'asset') {
        const draft = (0,_Pimcore_modules_asset_hooks_use_asset_draft__WEBPACK_IMPORTED_MODULE_0__.useAssetDraft)(id);
        return {
            ...draft,
            element: draft.asset
        };
    }
    if (elementType === 'data-object') {
        const draft = (0,_Pimcore_modules_data_object_hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_1__.useDataObjectDraft)(id);
        return {
            ...draft,
            element: draft.dataObject
        };
    }
    (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_2__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_2__.GeneralError('Element type not supported: ' + elementType));
    throw new Error('Element type not supported: ' + elementType);
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
//# sourceMappingURL=js_src_core_components_breadcrumb_breadcrumb_tsx-js_src_core_components_inheritance-overlay_h-7c9213.js.map