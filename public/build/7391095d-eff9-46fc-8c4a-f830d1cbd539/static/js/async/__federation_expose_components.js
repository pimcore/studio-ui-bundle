"use strict";
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["__federation_expose_components"], {
"./js/src/core/components/accordion-timeline/accordion-timeline.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
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
        card: css`
        & .ant-collapse {
            width: 340px;
            background-color: white;
        }

        & span, & div, div.anticon, button {
            vertical-align: middle;
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
"./js/src/core/components/accordion-timeline/accordion-timeline.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  AccordionTimeline: () => (AccordionTimeline)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/classnames/index.js");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _accordion_timeline_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/accordion-timeline/accordion-timeline.styles.tsx");
/* ESM import */var _Pimcore_components_vertical_timeline_vertical_timeline__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/vertical-timeline/vertical-timeline.tsx");
/* ESM import */var _Pimcore_components_accordion_accordion__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/accordion/accordion.tsx");
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





const AccordionTimeline = (param)=>{
    let { items } = param;
    _s();
    const { styles } = (0,_accordion_timeline_styles__WEBPACK_IMPORTED_MODULE_3__.useStyle)();
    const ItemAccordions = items.map((item)=>{
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
            className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(styles.card, item.className),
            children: item.selected === true ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_accordion_accordion__WEBPACK_IMPORTED_MODULE_5__.Accordion, {
                activeKey: item.key,
                expandIconPosition: 'after-title',
                items: [
                    item
                ]
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/accordion-timeline/accordion-timeline.tsx",
                lineNumber: 40,
                columnNumber: 13
            }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_accordion_accordion__WEBPACK_IMPORTED_MODULE_5__.Accordion, {
                expandIconPosition: 'after-title',
                items: [
                    item
                ]
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/accordion-timeline/accordion-timeline.tsx",
                lineNumber: 47,
                columnNumber: 13
            }, undefined)
        }, item.key, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/accordion-timeline/accordion-timeline.tsx",
            lineNumber: 34,
            columnNumber: 7
        }, undefined);
    });
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_vertical_timeline_vertical_timeline__WEBPACK_IMPORTED_MODULE_4__.VerticalTimeline, {
        timeStamps: ItemAccordions
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/accordion-timeline/accordion-timeline.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, undefined);
};
_s(AccordionTimeline, "4AcVho8W1Y+Yfard/v4lDs8ZRDQ=", false, function() {
    return [
        _accordion_timeline_styles__WEBPACK_IMPORTED_MODULE_3__.useStyle
    ];
});
_c = AccordionTimeline;
var _c;
$RefreshReg$(_c, "AccordionTimeline");

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
"./js/src/core/components/accordion/accordion.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
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
    const themeToken = {
        highlightBackgroundColor: '#F6FFED',
        highlightBorderColor: '#B7EB8F',
        highlightColor: '#52C41A',
        ...token
    };
    return {
        accordion: css`
        border: none;

        &.ant-collapse-borderless.accordion--spaced {
            > .ant-collapse-item:last-child {
                > .ant-collapse-header[aria-expanded='false'] {
                    border-radius: ${themeToken.borderRadiusLG}px;
                }

                > .ant-collapse-header[aria-expanded='true'] {
                    border-top-left-radius: ${themeToken.borderRadiusLG}px;
                    border-top-right-radius: ${themeToken.borderRadiusLG}px;
                }
            }
        }

        .ant-collapse-item.accordion__item--theme-success {
            border: 1px solid ${themeToken.highlightBorderColor};
            background-color: ${themeToken.highlightBackgroundColor};
            border-radius: ${themeToken.borderRadiusLG}px !important;

            > .ant-collapse-content {
                border-top: 1px solid ${themeToken.highlightBorderColor};
                background-color: transparent;
            }
        }

        .ant-collapse-item.accordion__item--theme-primary {
            border: 1px solid ${themeToken.colorBorder};
            border-radius: ${themeToken.borderRadiusLG}px !important;
            background-color: ${themeToken.colorFillAlter};

            > .ant-collapse-content {
                border-top: 1px solid ${themeToken.colorBorder};
                background-color: transparent;
            }
        }

        .accordion__item {
          + .accordion__item {
            margin-top: ${token.marginXS}px;
          }
          
            > .ant-collapse-header {
                display: inline-flex;
                width: 100%;
                align-items: baseline;

                > .ant-collapse-header-text {
                    margin-inline-end: 0;
                }

                > .ant-collapse-expand-icon {
                    display: none;
                }
            }

            .accordion__chevron-btn {
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0 ${token.marginXXS}px;
            }

            .accordion__chevron {
                rotate: 180deg;
                transition-duration: 0.6s;
                transition-property: transform;
            }

            .accordion__chevron--up {
                transform: rotate(-180deg);
            }
        }

        .ant-collapse-extra {
            order: 1;
            margin-left: 5px;
        }
    `,
        table: css`
      width: min-content;
      min-width: 100%;

      .ant-collapse-item .ant-collapse-content .ant-collapse-content-box {
        padding: 0;
      }

      .ant-table {
        table {
          border: 0;
          border-radius: 0;

          th {
            padding: ${token.paddingXXS}px ${token.paddingXS}px !important;
          }
        }

        .ant-table-thead {
          th:first-child {
            border-left: 0;
          }
          tr:first-child th:first-child {
            border-top-left-radius: 0;
          }
          tr:first-child th:last-child {
            border-top-right-radius: 0;
          }
        }

        .ant-table-tbody {
          td:first-child {
            border-left: 0;
          }

          .ant-table-row:last-of-type {
            .ant-table-cell:first-of-type {
              border-bottom-left-radius: 0;
            }

            .ant-table-cell:last-of-type {
              border-bottom-right-radius: 0;
            }

            .ant-table-cell {
              border-bottom: 0;
            }
          }
        }
      }
    `,
        bordered: css`
      background: ${token.colorBgContainer};
      
      &.accordion--bordered {
        .ant-collapse-item {
          background: ${token.colorBgContainer};
          border: 1px solid ${token.colorBorderSecondary};
          border-radius: ${token.borderRadius}px;
        }
        
        .ant-collapse-header {
          font-weight: ${token.fontWeightStrong};
        }

        .accordion-item__header-info {
          font-weight: 400;
          color: ${token.colorTextSecondary};
        }

        .ant-collapse-content {
          border-color: ${token.colorBorderSecondary};
        }
        
        &.ant-collapse-small {
          .ant-collapse-item {
            border-radius: ${token.borderRadiusSM}px;
          }
          
          .ant-collapse-header {
            padding: ${token.paddingXXS}px ${token.paddingSM}px;
          }
        }
      }
    `,
        spaced: css`
      background: ${token.colorBgContainer};

      .accordion__item {
        margin-bottom: 24px;
        border-bottom: none;
      }

      .ant-collapse-header[aria-expanded='false'] {
        background-color: ${token.colorBgSelectedTab};
        border: 1px solid ${token.colorBorder};
        border-radius: 5px;
      }

      .ant-collapse-header[aria-expanded='true'] {
        background-color: ${token.colorBgSelectedTab};
        border: 1px solid ${token.colorBorder};
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
      }

      .ant-collapse-content-box {
        border: 1px solid ${token.colorBorder};
        border-top: none;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        background-color: ${token.colorBgSelectedTab};
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
"./js/src/core/components/accordion/accordion.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Accordion: () => (Accordion)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_components_accordion_accordion_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/accordion/accordion.styles.ts");
/* ESM import */var i18next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/i18next/dist/esm/i18next.js");
/* ESM import */var _Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/icon-button/icon-button.tsx");
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





const Accordion = (param)=>{
    let { items, accordion = false, spaced = false, bordered = false, table = false, className, activeKey, expandIconPosition = 'after-title', ...props } = param;
    _s();
    const { styles } = (0,_Pimcore_components_accordion_accordion_styles__WEBPACK_IMPORTED_MODULE_3__.useStyles)();
    const [expandedIds, setExpandedIds] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setExpandedIds([
            String(activeKey)
        ]);
    }, [
        activeKey
    ]);
    const onClickChevron = (id)=>{
        if (accordion) {
            setExpandedIds((prevIds)=>prevIds.includes(id) ? [] : [
                    id
                ]);
        } else {
            setExpandedIds((prevIds)=>prevIds.includes(id) ? prevIds.filter((expandedId)=>expandedId !== id) : [
                    ...prevIds,
                    id
                ]);
        }
    };
    const itemsWithCardClassName = (items === null || items === void 0 ? void 0 : items.map((item)=>{
        const chevronClassName = [
            'accordion__chevron',
            item.key != null && expandedIds.includes(String(item.key)) ? 'accordion__chevron--up' : ''
        ].join(' ');
        const chevronButton = ()=>{
            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_5__.IconButton, {
                "aria-label": i18next__WEBPACK_IMPORTED_MODULE_4__["default"].t('aria.notes-and-events.expand'),
                className: 'accordion__chevron-btn',
                icon: {
                    value: 'chevron-up',
                    className: chevronClassName
                },
                onClick: ()=>{
                    if (item.id != null) {
                        onClickChevron(item.id);
                    }
                },
                role: 'button',
                size: "small",
                type: 'text',
                variant: "minimal"
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/accordion/accordion.tsx",
                lineNumber: 79,
                columnNumber: 9
            }, undefined);
        };
        const { disabled, ...restItem } = item;
        const collapseDisabled = {
            collapsible: 'icon'
        };
        const itemClassNames = [
            item === null || item === void 0 ? void 0 : item.className,
            'accordion__item'
        ].filter(Boolean);
        if (item.theme !== undefined) {
            itemClassNames.push(`accordion__item--${item.theme}`);
        }
        return {
            ...restItem,
            className: itemClassNames.join(' '),
            label: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Flex, {
                        align: 'baseline',
                        children: [
                            expandIconPosition === 'start' && item.children !== null && !(item.disabled === true) && chevronButton(),
                            item.title,
                            expandIconPosition === 'after-title' && item.children !== null && !(item.disabled === true) && chevronButton(),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                                className: "accordion-item__header-info",
                                children: item.info !== null && item.info
                            }, void 0, false, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/accordion/accordion.tsx",
                                lineNumber: 121,
                                columnNumber: 11
                            }, undefined)
                        ]
                    }, void 0, true, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/accordion/accordion.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, undefined),
                    item.subtitle
                ]
            }, void 0, true),
            title: '',
            subtitle: '',
            ...item.disabled ?? false ? collapseDisabled : {}
        };
    })) ?? [];
    const allClassNames = [
        'accordion',
        className,
        styles.accordion
    ];
    if (spaced) {
        allClassNames.push('accordion--spaced', styles.spaced);
        allClassNames.push(styles.spaced);
    }
    if (bordered) {
        allClassNames.push('accordion--bordered', styles.bordered);
        allClassNames.push(styles.bordered);
    }
    if (table) {
        allClassNames.push('accordion--table', styles.table);
        allClassNames.push(styles.table);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Collapse, {
        accordion: accordion,
        activeKey: expandedIds,
        bordered: !spaced,
        className: allClassNames.join(' '),
        items: itemsWithCardClassName,
        onChange: (keys)=>{
            setExpandedIds(Array.isArray(keys) ? keys : [
                keys
            ]);
        },
        ...props
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/accordion/accordion.tsx",
        lineNumber: 153,
        columnNumber: 5
    }, undefined);
};
_s(Accordion, "CSFlLp8s0Pj9tW0aw2YS2GZv8Lw=", false, function() {
    return [
        _Pimcore_components_accordion_accordion_styles__WEBPACK_IMPORTED_MODULE_3__.useStyles
    ];
});
_c = Accordion;
var _c;
$RefreshReg$(_c, "Accordion");

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
"./js/src/core/components/breadcrumb/breadcrumb.skeleton.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
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
    let { css } = param;
    return {
        skeleton: css`
      display: flex;
      gap: 4px;
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
"./js/src/core/components/breadcrumb/breadcrumb.skeleton.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  BreadcrumbSkeleton: () => (BreadcrumbSkeleton)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _breadcrumb_skeleton_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/breadcrumb/breadcrumb.skeleton.styles.ts");
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



const BreadcrumbSkeleton = ()=>{
    _s();
    const { styles } = (0,_breadcrumb_skeleton_styles__WEBPACK_IMPORTED_MODULE_3__.useStyle)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: styles.skeleton,
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_1__.Skeleton.Button, {
                active: true,
                size: 'small'
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/breadcrumb/breadcrumb.skeleton.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_1__.Skeleton.Input, {
                active: true,
                size: 'small'
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/breadcrumb/breadcrumb.skeleton.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_1__.Skeleton.Input, {
                active: true,
                size: 'small'
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/breadcrumb/breadcrumb.skeleton.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/breadcrumb/breadcrumb.skeleton.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, undefined);
};
_s(BreadcrumbSkeleton, "4AcVho8W1Y+Yfard/v4lDs8ZRDQ=", false, function() {
    return [
        _breadcrumb_skeleton_styles__WEBPACK_IMPORTED_MODULE_3__.useStyle
    ];
});
_c = BreadcrumbSkeleton;
var _c;
$RefreshReg$(_c, "BreadcrumbSkeleton");

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
"./js/src/core/components/data-object-preview/data-object-preview.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
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
    return {
        preview: css`
      border: none
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
"./js/src/core/components/data-object-preview/data-object-preview.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DataObjectPreview: () => (DataObjectPreview)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_app_api_pimcore_route__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/app/api/pimcore/route.ts");
/* ESM import */var _Pimcore_components_data_object_preview_data_object_preview_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/data-object-preview/data-object-preview.styles.tsx");
/* ESM import */var _Pimcore_modules_data_object_hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/data-object/hooks/use-data-object-draft.ts");
/* ESM import */var _Pimcore_utils_hooks_use_element_visible__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/utils/hooks/use-element-visible.ts");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
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






const DataObjectPreview = (param)=>{
    let { id } = param;
    var _dataObject_draftData;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_6__.useTranslation)();
    const { styles } = (0,_Pimcore_components_data_object_preview_data_object_preview_styles__WEBPACK_IMPORTED_MODULE_2__.useStyles)();
    const [timestamp, setTimestamp] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(Date.now());
    const { dataObject } = (0,_Pimcore_modules_data_object_hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_3__.useDataObjectDraft)(id);
    const iframeRef = react__WEBPACK_IMPORTED_MODULE_5___default().useRef(null);
    const isVisible = (0,_Pimcore_utils_hooks_use_element_visible__WEBPACK_IMPORTED_MODULE_4__["default"])(iframeRef, true);
    (0,react__WEBPACK_IMPORTED_MODULE_5__.useEffect)(()=>{
        if (isVisible) {
            setTimestamp(Date.now());
        }
    }, [
        dataObject === null || dataObject === void 0 ? void 0 : (_dataObject_draftData = dataObject.draftData) === null || _dataObject_draftData === void 0 ? void 0 : _dataObject_draftData.modificationDate,
        isVisible
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("iframe", {
        className: [
            'w-full h-full',
            styles.preview
        ].join(' '),
        ref: iframeRef,
        src: `${(0,_Pimcore_app_api_pimcore_route__WEBPACK_IMPORTED_MODULE_1__.getPrefix)()}/data-objects/preview/${id}?timestamp=${timestamp}`,
        title: `${t('preview.label')}-${id}`
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/data-object-preview/data-object-preview.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, undefined);
};
_s(DataObjectPreview, "SAP2usQYDm/iEpMwX91YPqve90I=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_6__.useTranslation,
        _Pimcore_components_data_object_preview_data_object_preview_styles__WEBPACK_IMPORTED_MODULE_2__.useStyles,
        _Pimcore_modules_data_object_hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_3__.useDataObjectDraft,
        _Pimcore_utils_hooks_use_element_visible__WEBPACK_IMPORTED_MODULE_4__["default"]
    ];
});
_c = DataObjectPreview;
var _c;
$RefreshReg$(_c, "DataObjectPreview");

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
"./js/src/core/components/drag-and-drop/draggable.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  GlobalStyle: () => (GlobalStyle)
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
const GlobalStyle = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createGlobalStyle)((param)=>{
    let { theme: token } = param;
    return {
        '.dnd--dragging': {
            cursor: 'move'
        },
        '.dnd--invalid': {
            '.dnd__overlay': {
                background: token.colorErrorBg,
                color: token.colorErrorActive
            }
        }
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
"./js/src/core/components/drag-and-drop/draggable.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Draggable: () => (DraggableMemo)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _dnd_kit_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/@dnd-kit/core/dist/core.esm.js");
/* ESM import */var _Pimcore_utils_uuid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/utils/uuid.ts");
/* ESM import */var _draggable_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/drag-and-drop/draggable.styles.ts");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
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





function Draggable(props) {
    _s();
    const [id] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)((0,_Pimcore_utils_uuid__WEBPACK_IMPORTED_MODULE_3__.uuid)());
    const { attributes, listeners, setNodeRef } = (0,_dnd_kit_core__WEBPACK_IMPORTED_MODULE_2__.useDraggable)({
        id,
        data: props.info
    });
    const Child = react__WEBPACK_IMPORTED_MODULE_1__.Children.only(props.children);
    if (!/*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.isValidElement)(Child)) {
        (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_5__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_5__.GeneralError('Children must be a valid react component'));
        throw new Error('Invalid React child element.');
    }
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
            ref: setNodeRef,
            ...listeners,
            ...attributes,
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_draggable_styles__WEBPACK_IMPORTED_MODULE_4__.GlobalStyle, {}, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/drag-and-drop/draggable.tsx",
                    lineNumber: 46,
                    columnNumber: 7
                }, this),
                props.children
            ]
        }, void 0, true, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/drag-and-drop/draggable.tsx",
            lineNumber: 41,
            columnNumber: 5
        }, this), [
        props.children
    ]);
}
_s(Draggable, "gl/N/BhhH41b6uwHDfOmRaOpOHA=", false, function() {
    return [
        _dnd_kit_core__WEBPACK_IMPORTED_MODULE_2__.useDraggable
    ];
});
_c = Draggable;
const DraggableMemo = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().memo(Draggable);
_c1 = DraggableMemo;

var _c, _c1;
$RefreshReg$(_c, "Draggable");
$RefreshReg$(_c1, "DraggableMemo");

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
"./js/src/core/components/element-toolbar/element-toolbar.skeleton.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
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
        skeleton: css`
      display: flex;
      align-items: center;
      gap: 8px;
      height: 40px;
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
"./js/src/core/components/element-toolbar/element-toolbar.skeleton.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ElementToolbarSkeleton: () => (ElementToolbarSkeleton)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _element_toolbar_skeleton_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/element-toolbar/element-toolbar.skeleton.styles.ts");
/* ESM import */var _Pimcore_components_breadcrumb_breadcrumb_skeleton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/breadcrumb/breadcrumb.skeleton.tsx");
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




const ElementToolbarSkeleton = ()=>{
    _s();
    const { styles } = (0,_element_toolbar_skeleton_styles__WEBPACK_IMPORTED_MODULE_3__.useStyle)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: styles.skeleton,
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_breadcrumb_breadcrumb_skeleton__WEBPACK_IMPORTED_MODULE_4__.BreadcrumbSkeleton, {}, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-toolbar/element-toolbar.skeleton.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_1__.Skeleton.Button, {
                active: true,
                size: 'small'
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-toolbar/element-toolbar.skeleton.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_1__.Skeleton.Avatar, {
                active: true,
                shape: 'circle',
                size: 'small'
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-toolbar/element-toolbar.skeleton.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-toolbar/element-toolbar.skeleton.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, undefined);
};
_s(ElementToolbarSkeleton, "4AcVho8W1Y+Yfard/v4lDs8ZRDQ=", false, function() {
    return [
        _element_toolbar_skeleton_styles__WEBPACK_IMPORTED_MODULE_3__.useStyle
    ];
});
_c = ElementToolbarSkeleton;
var _c;
$RefreshReg$(_c, "ElementToolbarSkeleton");

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
"./js/src/core/components/element-tree/dnd-upload/dnd-upload.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
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
    return {
        dragger: css`
      .ant-upload {
        padding: 0 !important;
        background: none;
        border-color: transparent;
        
        &:hover {
            border-color: transparent !important;
        }
        
        &.ant-upload-drag-hover {
            border-color: ${token.colorLinkHover} !important;
        }

        .ant-upload-drag-container {
          width: 100%;
        }
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
"./js/src/core/components/element-tree/dnd-upload/dnd-upload.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DndUpload: () => (DndUpload)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_components_element_tree_dnd_upload_dnd_upload_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/element-tree/dnd-upload/dnd-upload.styles.tsx");
/* ESM import */var _Pimcore_modules_element_upload_upload_provider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/element/upload/upload-provider.tsx");
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




const DndUpload = (param)=>{
    let { nodeId, nodeType, children } = param;
    _s();
    const { styles } = (0,_Pimcore_components_element_tree_dnd_upload_dnd_upload_styles__WEBPACK_IMPORTED_MODULE_3__.useStyles)();
    const { Dragger } = antd__WEBPACK_IMPORTED_MODULE_2__.Upload;
    const { fileList, setUploadContext } = (0,_Pimcore_modules_element_upload_upload_provider__WEBPACK_IMPORTED_MODULE_4__.useUploadContext)();
    const uploadProps = {
        action: `/pimcore-studio/api/assets/add/${nodeId}`,
        name: 'file',
        multiple: true,
        openFileDialogOnClick: false,
        showUploadList: false,
        fileList,
        onChange: (param)=>{
            let { fileList: currentFileList } = param;
            setUploadContext('file', currentFileList);
        }
    };
    if (nodeType !== 'asset') {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: children
        }, void 0, false);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Dragger, {
        className: styles.dragger,
        ...uploadProps,
        children: children
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tree/dnd-upload/dnd-upload.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, undefined);
};
_s(DndUpload, "LGvxoHWghJVLYm9uVezYQbdFoKo=", false, function() {
    return [
        _Pimcore_components_element_tree_dnd_upload_dnd_upload_styles__WEBPACK_IMPORTED_MODULE_3__.useStyles,
        _Pimcore_modules_element_upload_upload_provider__WEBPACK_IMPORTED_MODULE_4__.useUploadContext
    ];
});
_c = DndUpload;
var _c;
$RefreshReg$(_c, "DndUpload");

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
"./js/src/core/components/element-tree/element-tree.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
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
    return {
        tree: css`
      padding: ${token.paddingXXS}px 0 ${token.paddingXS}px 0;
      max-width: 100%;
      color: ${token.colorTextTreeElement}
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
"./js/src/core/components/element-tree/element-tree.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ElementTree: () => (ElementTree),
  TreeContext: () => (TreeContext),
  defaultProps: () => (defaultProps)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _node_tree_node__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/element-tree/node/tree-node.tsx");
/* ESM import */var _node_content_tree_node_content__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/element-tree/node/content/tree-node-content.tsx");
/* ESM import */var _element_tree_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/element-tree/element-tree.styles.ts");
/* ESM import */var _Pimcore_modules_element_upload_upload_provider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/element/upload/upload-provider.tsx");
/* ESM import */var _skeleton_skeleton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/element-tree/skeleton/skeleton.tsx");
/* ESM import */var _box_box__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/box/box.tsx");
/* ESM import */var _hooks_use_element_tree_node__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/element-tree/hooks/use-element-tree-node.ts");
/* ESM import */var _list_tree_list__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/components/element-tree/list/tree-list.tsx");
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









const defaultProps = {
    nodeId: 1,
    renderNodeContent: _node_content_tree_node_content__WEBPACK_IMPORTED_MODULE_3__.TreeNodeContent,
    renderNode: _node_tree_node__WEBPACK_IMPORTED_MODULE_2__.TreeNode,
    showRoot: true
};
const TreeContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({
    ...defaultProps
});
const ElementTree = (param)=>{
    let { renderNode = defaultProps.renderNode, renderNodeContent = defaultProps.renderNodeContent, contextMenu: ContextMenu, rootNode, ...props } = param;
    _s();
    const { styles } = (0,_element_tree_styles__WEBPACK_IMPORTED_MODULE_4__.useStyles)();
    const { nodeId } = props;
    const hasRootNode = rootNode !== undefined && parseInt(rootNode.id) === nodeId && props.showRoot;
    const preparedRootNode = rootNode;
    const { getChildren, isLoading } = (0,_hooks_use_element_tree_node__WEBPACK_IMPORTED_MODULE_8__.useElementTreeNode)(String(nodeId));
    const nodesRefs = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)({});
    const nodeOrder = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        return Object.keys(nodesRefs.current).sort((a, b)=>{
            const nodeA = nodesRefs.current[a].node;
            const nodeB = nodesRefs.current[b].node;
            const indexesA = nodeA.internalKey.split('-');
            const indexesB = nodeB.internalKey.split('-');
            for(let index = 0; index < indexesA.length; index++){
                if (indexesA[index] !== indexesB[index]) {
                    return parseInt(indexesA[index]) - parseInt(indexesB[index]);
                }
            }
            return 0;
        });
    }, [
        nodesRefs.current
    ]);
    const [rightClickedNode, setRightClickedNode] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(undefined);
    async function onRightClick(event, node) {
        event.preventDefault();
        setRightClickedNode(node);
    }
    const treeContextValue = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>({
            ...props,
            nodesRefs,
            nodeOrder,
            renderNode,
            renderNodeContent,
            onRightClick
        }), [
        props,
        nodesRefs,
        nodeOrder,
        renderNode,
        renderNodeContent,
        onRightClick
    ]);
    const items = getChildren();
    const TreeNode = renderNode;
    const treeContent = /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: [
            'tree',
            styles.tree
        ].join(' '),
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(TreeContext.Provider, {
            value: treeContextValue,
            children: [
                hasRootNode && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(TreeNode, {
                    level: -1,
                    ...preparedRootNode
                }, preparedRootNode.id, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tree/element-tree.tsx",
                    lineNumber: 137,
                    columnNumber: 11
                }, undefined),
                !hasRootNode && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_list_tree_list__WEBPACK_IMPORTED_MODULE_9__.TreeList, {
                    node: {
                        ...preparedRootNode,
                        level: -1
                    }
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tree/element-tree.tsx",
                    lineNumber: 145,
                    columnNumber: 11
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tree/element-tree.tsx",
            lineNumber: 135,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tree/element-tree.tsx",
        lineNumber: 134,
        columnNumber: 5
    }, undefined);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_upload_upload_provider__WEBPACK_IMPORTED_MODULE_5__.UploadProvider, {
        children: [
            isLoading === true && !hasRootNode && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_box_box__WEBPACK_IMPORTED_MODULE_7__.Box, {
                padding: {
                    left: 'extra-small'
                },
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_skeleton_skeleton__WEBPACK_IMPORTED_MODULE_6__.Skeleton, {}, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tree/element-tree.tsx",
                    lineNumber: 158,
                    columnNumber: 11
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tree/element-tree.tsx",
                lineNumber: 157,
                columnNumber: 9
            }, undefined),
            (items.length !== 0 || hasRootNode) && (ContextMenu !== undefined ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(ContextMenu, {
                node: rightClickedNode,
                children: treeContent
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tree/element-tree.tsx",
                lineNumber: 165,
                columnNumber: 13
            }, undefined) : treeContent)
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tree/element-tree.tsx",
        lineNumber: 155,
        columnNumber: 5
    }, undefined);
};
_s(ElementTree, "jQTZH+zGhxAqC3I1VK25r9zH/ug=", false, function() {
    return [
        _element_tree_styles__WEBPACK_IMPORTED_MODULE_4__.useStyles,
        _hooks_use_element_tree_node__WEBPACK_IMPORTED_MODULE_8__.useElementTreeNode
    ];
});
_c = ElementTree;

var _c;
$RefreshReg$(_c, "ElementTree");

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
"./js/src/core/components/element-tree/expander/tree-expander.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TreeExpander: () => (TreeExpander)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _element_tree__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/element-tree/element-tree.tsx");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_components_spin_spin__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/spin/spin.tsx");
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





const TreeExpander = (param)=>{
    let { node, state } = param;
    _s();
    const { hasChildren, children, isLoading } = node;
    const { onLoad } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_element_tree__WEBPACK_IMPORTED_MODULE_2__.TreeContext);
    const [isExpanded, setIsExpanded] = state;
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation)();
    async function onClick(event) {
        event.stopPropagation();
        if (hasChildren === true) {
            const newExpandedValue = !isExpanded;
            if (newExpandedValue && onLoad !== undefined && children !== undefined && children.length === 0) {
                await onLoad(node);
            }
            setIsExpanded(newExpandedValue);
        }
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: "tree-expander",
        style: {
            minWidth: 16,
            width: 16,
            height: 16
        },
        children: [
            isLoading === true && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_spin_spin__WEBPACK_IMPORTED_MODULE_5__.Spin, {
                type: "classic"
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tree/expander/tree-expander.tsx",
                lineNumber: 52,
                columnNumber: 9
            }, undefined),
            node.hasChildren === true && // keyboard navigation is already handled on parent level
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                "aria-label": t('tree.aria.expand-and-collapse'),
                onClick: onClick,
                role: "button",
                tabIndex: -1,
                children: isLoading !== true && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                    children: isExpanded ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__.Icon, {
                        options: {
                            width: 16,
                            height: 16
                        },
                        value: "chevron-up"
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tree/expander/tree-expander.tsx",
                        lineNumber: 68,
                        columnNumber: 19
                    }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__.Icon, {
                        options: {
                            width: 16,
                            height: 16
                        },
                        value: "chevron-down"
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tree/expander/tree-expander.tsx",
                        lineNumber: 74,
                        columnNumber: 19
                    }, undefined)
                }, void 0, false)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tree/expander/tree-expander.tsx",
                lineNumber: 58,
                columnNumber: 9
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tree/expander/tree-expander.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, undefined);
};
_s(TreeExpander, "5XBz4J80I+jLX2eg019jPgKoLOM=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation
    ];
});
_c = TreeExpander;
var _c;
$RefreshReg$(_c, "TreeExpander");

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
"./js/src/core/components/element-tree/hooks/use-element-tree-node.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useElementTreeNode: () => (useElementTreeNode)
});
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _element_tree_slice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/element-tree/element-tree-slice.ts");
/* ESM import */var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/react-redux/dist/react-redux.mjs");
/* ESM import */var _Pimcore_modules_element_tree_provider_tree_id_provider_use_tree_id__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/element/tree/provider/tree-id-provider/use-tree-id.ts");
/* ESM import */var _use_element_tree__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/element-tree/hooks/use-element-tree.ts");
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




const useElementTreeNode = (nodeId)=>{
    const dispatch = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.useAppDispatch)();
    const { treeId } = (0,_Pimcore_modules_element_tree_provider_tree_id_provider_use_tree_id__WEBPACK_IMPORTED_MODULE_2__.useTreeId)();
    const { refreshChildren, setLoading, setFetching, setExpanded, setPage, setSearchTerm, setSelectedIds, setScrollTo } = (0,_use_element_tree__WEBPACK_IMPORTED_MODULE_3__.useElementTree)();
    const nodeState = (0,react_redux__WEBPACK_IMPORTED_MODULE_4__.useSelector)((state)=>(0,_element_tree_slice__WEBPACK_IMPORTED_MODULE_1__.selectNodeState)(state, treeId, nodeId));
    const resultInternalNodeState = nodeState ?? {
        isFetching: false,
        page: 1,
        isSelected: false,
        isScrollTo: false,
        isExpanded: false,
        isFetchTriggered: false
    };
    const resultNodeState = {
        ...resultInternalNodeState,
        isExpanded: resultInternalNodeState.isExpanded,
        page: resultInternalNodeState.page ?? 1
    };
    const getChildren = ()=>{
        if (!resultNodeState.isFetchTriggered && resultNodeState.isExpanded) {
            dispatch((0,_element_tree_slice__WEBPACK_IMPORTED_MODULE_1__.setFetchTriggered)({
                treeId,
                nodeId,
                fetchTriggered: true
            }));
            refreshChildren(nodeId, false);
        }
        return resultNodeState.childrenIds ?? [];
    };
    return {
        ...resultNodeState,
        setLoading: (loading)=>{
            setLoading(nodeId, loading);
        },
        setFetching: (isFetching)=>{
            setFetching(nodeId, isFetching);
        },
        setExpanded: (expanded)=>{
            setExpanded(nodeId, expanded);
        },
        setPage: (page)=>{
            setPage(nodeId, page);
        },
        setSearchTerm: (searchTerm)=>{
            setSearchTerm(nodeId, searchTerm);
        },
        setSelectedIds: (selectedNodeIds)=>{
            setSelectedIds(selectedNodeIds);
        },
        setScrollTo: (scrollTo)=>{
            setScrollTo(nodeId, scrollTo);
        },
        getChildren
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
"./js/src/core/components/element-tree/hooks/use-element-tree-root-node.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useElementTreeRootNode: () => (useElementTreeRootNode)
});
/* ESM import */var react_redux__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./node_modules/react-redux/dist/react-redux.mjs");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _element_tree_slice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/element-tree/element-tree-slice.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_modules_element_tree_provider_tree_id_provider_use_tree_id__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/element/tree/provider/tree-id-provider/use-tree-id.ts");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* ESM import */var _use_element_tree_node__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/element-tree/hooks/use-element-tree-node.ts");
/* ESM import */var _provider_node_api_hook_provider_use_node_api_hook__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/element-tree/provider/node-api-hook-provider/use-node-api-hook.ts");
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








const useElementTreeRootNode = (id, showRoot)=>{
    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_8__.useDispatch)();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_0__.useTranslation)();
    const { treeId } = (0,_Pimcore_modules_element_tree_provider_tree_id_provider_use_tree_id__WEBPACK_IMPORTED_MODULE_3__.useTreeId)();
    const { treeNodeProps, isRootFetchTriggered } = (0,_use_element_tree_node__WEBPACK_IMPORTED_MODULE_5__.useElementTreeNode)(String(id));
    const [isLoading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_7__.useState)(false);
    const { nodeApiHook } = (0,_provider_node_api_hook_provider_use_node_api_hook__WEBPACK_IMPORTED_MODULE_6__.useNodeApiHook)();
    const { fetchRoot } = nodeApiHook();
    const setRootNode = (rootNodeState)=>{
        dispatch((0,_element_tree_slice__WEBPACK_IMPORTED_MODULE_1__.setRootNode)({
            treeId,
            nodeId: String(id),
            rootNode: rootNodeState
        }));
    };
    const refreshRootNode = ()=>{
        if (isLoading) {
            return;
        }
        setLoading(true);
        fetchRoot(id).then((apiHookResult)=>{
            if ((0,lodash__WEBPACK_IMPORTED_MODULE_2__.isNil)(apiHookResult) || (0,lodash__WEBPACK_IMPORTED_MODULE_2__.isNil)(apiHookResult.nodes[0])) {
                (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_4__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_4__.GeneralError('Root node not found: ' + id));
            } else {
                setRootNode(apiHookResult.nodes[0]);
            }
            setLoading(false);
        }).catch((error)=>{
            console.error(error);
        });
    };
    if (isRootFetchTriggered !== true) {
        dispatch((0,_element_tree_slice__WEBPACK_IMPORTED_MODULE_1__.setRootFetchTriggered)({
            treeId,
            nodeId: String(id),
            rootFetchTriggered: true
        }));
        refreshRootNode();
    }
    const defaultRootNodeProps = {
        icon: {
            type: 'name',
            value: 'home-root-folder'
        },
        level: -1,
        isRoot: true
    };
    const newRootNode = (0,lodash__WEBPACK_IMPORTED_MODULE_2__.isNil)(treeNodeProps) ? undefined : {
        ...defaultRootNodeProps,
        ...treeNodeProps,
        icon: id === 1 ? {
            type: 'name',
            value: 'home-root-folder'
        } : treeNodeProps.icon,
        label: id === 1 ? t('home') : treeNodeProps.label,
        permissions: {
            ...treeNodeProps.permissions,
            delete: false,
            rename: false
        }
    };
    return {
        rootNode: newRootNode === undefined ? undefined : {
            ...defaultRootNodeProps,
            ...newRootNode
        },
        isLoading: showRoot && isLoading
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
"./js/src/core/components/element-tree/hooks/use-element-tree.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useElementTree: () => (useElementTree)
});
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _element_tree_slice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/element-tree/element-tree-slice.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _provider_node_api_hook_provider_use_node_api_hook__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/element-tree/provider/node-api-hook-provider/use-node-api-hook.ts");
/* ESM import */var _Pimcore_modules_element_tree_provider_tree_id_provider_use_tree_id__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/element/tree/provider/tree-id-provider/use-tree-id.ts");
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




const useElementTree = ()=>{
    const dispatch = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.useAppDispatch)();
    const { nodeApiHook } = (0,_provider_node_api_hook_provider_use_node_api_hook__WEBPACK_IMPORTED_MODULE_3__.useNodeApiHook)();
    const { fetchChildren } = nodeApiHook();
    const { treeId } = (0,_Pimcore_modules_element_tree_provider_tree_id_provider_use_tree_id__WEBPACK_IMPORTED_MODULE_4__.useTreeId)();
    const getNodeState = (nodeId)=>{
        const nodeState = (0,_element_tree_slice__WEBPACK_IMPORTED_MODULE_1__.selectNodeState)(_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.store.getState(), treeId, nodeId);
        const resultInternalNodeState = nodeState ?? {
            isFetching: false,
            page: 1,
            isSelected: false,
            isScrollTo: false,
            isExpanded: false,
            isFetchTriggered: false
        };
        const resultNodeState = {
            ...resultInternalNodeState,
            isExpanded: resultInternalNodeState.isExpanded,
            page: resultInternalNodeState.page ?? 1
        };
        return resultNodeState;
    };
    const doRefreshChildren = async (nodeId, forceLoading)=>{
        const nodeState = getNodeState(nodeId);
        if (forceLoading) {
            dispatch((0,_element_tree_slice__WEBPACK_IMPORTED_MODULE_1__.updateNodesByParentId)({
                treeId,
                parentId: nodeId,
                nodes: [],
                total: 0
            }));
        }
        if ((0,lodash__WEBPACK_IMPORTED_MODULE_2__.isUndefined)(nodeState === null || nodeState === void 0 ? void 0 : nodeState.isLoading) || forceLoading) {
            setLoading(nodeId, true);
        }
        setFetching(nodeId, true);
        const node = {
            id: nodeId,
            internalKey: nodeId
        };
        return await fetchChildren(node, nodeState);
    };
    const refreshChildren = (nodeId, forceLoading)=>{
        doRefreshChildren(nodeId, forceLoading).then((apiHookResult)=>{
            if (!(0,lodash__WEBPACK_IMPORTED_MODULE_2__.isUndefined)(apiHookResult)) {
                dispatch((0,_element_tree_slice__WEBPACK_IMPORTED_MODULE_1__.updateNodesByParentId)({
                    treeId,
                    parentId: nodeId,
                    nodes: apiHookResult.nodes,
                    total: apiHookResult.total
                }));
                if (getNodeState(nodeId).page > 1 && apiHookResult.nodes.length === 0) {
                    setPage(nodeId, 1);
                }
                if (getNodeState(nodeId).page === 1) {
                    updateHasChildren(nodeId, apiHookResult.nodes.length > 0);
                }
            }
            setLoading(nodeId, false);
            setFetching(nodeId, false);
        }).catch((error)=>{
            console.error(error);
        });
    };
    const setLoading = (nodeId, loading)=>{
        dispatch((0,_element_tree_slice__WEBPACK_IMPORTED_MODULE_1__.setNodeLoading)({
            treeId,
            nodeId,
            loading
        }));
    };
    const setFetching = (nodeId, isFetching)=>{
        dispatch((0,_element_tree_slice__WEBPACK_IMPORTED_MODULE_1__.setNodeFetching)({
            treeId,
            nodeId,
            isFetching
        }));
    };
    const setExpanded = (nodeId, expanded)=>{
        dispatch((0,_element_tree_slice__WEBPACK_IMPORTED_MODULE_1__.setNodeExpanded)({
            treeId,
            nodeId,
            expanded
        }));
    };
    const setPage = (nodeId, page)=>{
        dispatch((0,_element_tree_slice__WEBPACK_IMPORTED_MODULE_1__.setNodePage)({
            treeId,
            nodeId,
            page
        }));
    };
    const setSearchTerm = (nodeId, searchTerm)=>{
        dispatch((0,_element_tree_slice__WEBPACK_IMPORTED_MODULE_1__.setNodeSearchTerm)({
            treeId,
            nodeId,
            searchTerm
        }));
    };
    const setSelectedIds = (selectedNodeIds)=>{
        dispatch((0,_element_tree_slice__WEBPACK_IMPORTED_MODULE_1__.setSelectedNodeIds)({
            treeId,
            selectedNodeIds
        }));
    };
    const setScrollTo = (nodeId, scrollTo)=>{
        dispatch((0,_element_tree_slice__WEBPACK_IMPORTED_MODULE_1__.setNodeScrollTo)({
            treeId,
            nodeId,
            scrollTo
        }));
    };
    const updateHasChildren = (nodeId, hasChildren)=>{
        var _getNodeState_treeNodeProps;
        if (((_getNodeState_treeNodeProps = getNodeState(nodeId).treeNodeProps) === null || _getNodeState_treeNodeProps === void 0 ? void 0 : _getNodeState_treeNodeProps.hasChildren) !== hasChildren) {
            dispatch((0,_element_tree_slice__WEBPACK_IMPORTED_MODULE_1__.setNodeHasChildren)({
                treeId,
                nodeId,
                hasChildren
            }));
        }
    };
    return {
        setLoading,
        setFetching,
        setExpanded,
        setPage,
        setSearchTerm,
        setSelectedIds,
        setScrollTo,
        refreshChildren
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
"./js/src/core/components/element-tree/list/tree-list-node.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TreeListNode: () => (TreeListNode)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _element_tree__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/element-tree/element-tree.tsx");
/* ESM import */var _hooks_use_element_tree_node__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/element-tree/hooks/use-element-tree-node.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);
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




const TreeListNode = (param)=>{
    let { nodeId, level } = param;
    _s();
    const { renderNode: RenderNode } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_element_tree__WEBPACK_IMPORTED_MODULE_2__.TreeContext);
    const node = (0,_hooks_use_element_tree_node__WEBPACK_IMPORTED_MODULE_3__.useElementTreeNode)(nodeId);
    if ((0,lodash__WEBPACK_IMPORTED_MODULE_4__.isUndefined)(node.treeNodeProps)) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}, void 0, false);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(RenderNode, {
        ...node.treeNodeProps,
        level: level
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tree/list/tree-list-node.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, undefined);
};
_s(TreeListNode, "TUEB8f0Z/oUnlBrrDSBdCXr19Vs=", false, function() {
    return [
        _hooks_use_element_tree_node__WEBPACK_IMPORTED_MODULE_3__.useElementTreeNode
    ];
});
_c = TreeListNode;
var _c;
$RefreshReg$(_c, "TreeListNode");

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
"./js/src/core/components/element-tree/list/tree-list.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
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
    return {
        'tree-list__pager': css` 
      padding: ${token.paddingSM}px 0;

      &:empty {
        padding: 0;
      }
    `,
        'tree-list__search': css`
      padding: ${token.paddingXXS}px ${token.paddingSM}px ${token.paddingXS}px 0;

      &:empty {
        padding: 0;
      }

      .ant-btn-default {
        border-color: ${token.colorBorder}
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
"./js/src/core/components/element-tree/list/tree-list.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TreeList: () => (TreeList)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _element_tree__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/element-tree/element-tree.tsx");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _tree_list_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/element-tree/list/tree-list.styles.ts");
/* ESM import */var _skeleton_skeleton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/element-tree/skeleton/skeleton.tsx");
/* ESM import */var _hooks_use_element_tree_node__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/element-tree/hooks/use-element-tree-node.ts");
/* ESM import */var _tree_list_node__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/element-tree/list/tree-list-node.tsx");
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







const { useToken } = antd__WEBPACK_IMPORTED_MODULE_3__.theme;
const TreeList = (param)=>{
    let { node } = param;
    _s();
    const { token } = useToken();
    const { styles } = (0,_tree_list_styles__WEBPACK_IMPORTED_MODULE_4__.useStyles)();
    const { renderFilter: RenderFilter, renderPager: RenderPager } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_element_tree__WEBPACK_IMPORTED_MODULE_2__.TreeContext);
    const { isLoading, isFetching, getChildren, total } = (0,_hooks_use_element_tree_node__WEBPACK_IMPORTED_MODULE_6__.useElementTreeNode)(node.id);
    if (isLoading === true) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_skeleton_skeleton__WEBPACK_IMPORTED_MODULE_5__.Skeleton, {
            style: {
                paddingLeft: token.paddingSM + (node.level + 1.5) * 24
            }
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tree/list/tree-list.tsx",
            lineNumber: 37,
            columnNumber: 7
        }, undefined);
    }
    const childrenIds = getChildren();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            RenderFilter !== undefined && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                className: [
                    'tree-list__search',
                    styles['tree-list__search']
                ].join(' '),
                style: {
                    paddingLeft: token.paddingSM + (node.level + 1) * 24
                },
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(RenderFilter, {
                    isLoading: isFetching,
                    node: node,
                    total: total ?? 0
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tree/list/tree-list.tsx",
                    lineNumber: 50,
                    columnNumber: 11
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tree/list/tree-list.tsx",
                lineNumber: 46,
                columnNumber: 9
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                className: "tree-list",
                children: childrenIds.map((childId)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_tree_list_node__WEBPACK_IMPORTED_MODULE_7__.TreeListNode, {
                        level: node.level + 1,
                        nodeId: childId
                    }, childId, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tree/list/tree-list.tsx",
                        lineNumber: 60,
                        columnNumber: 11
                    }, undefined))
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tree/list/tree-list.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, undefined),
            RenderPager !== undefined && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                className: [
                    'tree-list__pager',
                    styles['tree-list__pager']
                ].join(' '),
                style: {
                    paddingLeft: token.paddingSM + (node.level + 1) * 24
                },
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(RenderPager, {
                    node: node,
                    total: total ?? 0
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tree/list/tree-list.tsx",
                    lineNumber: 73,
                    columnNumber: 11
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tree/list/tree-list.tsx",
                lineNumber: 69,
                columnNumber: 9
            }, undefined)
        ]
    }, void 0, true);
};
_s(TreeList, "Zl3XdA7YyIgNhFddVrTkgALMqak=", false, function() {
    return [
        useToken,
        _tree_list_styles__WEBPACK_IMPORTED_MODULE_4__.useStyles,
        _hooks_use_element_tree_node__WEBPACK_IMPORTED_MODULE_6__.useElementTreeNode
    ];
});
_c = TreeList;
var _c;
$RefreshReg$(_c, "TreeList");

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
"./js/src/core/components/element-tree/node/content/tree-node-content.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
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
    return {
        container: css`
      width: 100%;
      overflow: hidden;
    `,
        containerChild: css`
      min-width: 150px
    `,
        unpublishedIcon: css`
      color: ${token.colorIconTreeUnpublished}
    `,
        unpublishedIconPath: css`
       .pimcore-icon__image {
          opacity: 0.4
       }
    `,
        indirectLockedIcon: css`
      opacity: 0.5;
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
"./js/src/core/components/element-tree/node/content/tree-node-content.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TreeNodeContent: () => (TreeNodeContent)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _tree_node_content_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/element-tree/node/content/tree-node-content.styles.ts");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/classnames/index.js");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_6__);
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






const TreeNodeContent = /*#__PURE__*/ _s((0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(_c = _s(function TreeNodeContent(props, ref) {
    _s();
    const { icon, label, isPublished, isLocked, locked } = props.node;
    const { styles } = (0,_tree_node_content_styles__WEBPACK_IMPORTED_MODULE_3__.useStyles)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_5__.Flex, {
        className: styles.container,
        gap: 'mini',
        justify: "space-between",
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_5__.Flex, {
                align: "center",
                className: styles.containerChild,
                gap: 'small',
                ref: ref,
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_2__.Icon, {
                        ...icon,
                        className: classnames__WEBPACK_IMPORTED_MODULE_4___default()({
                            [styles.unpublishedIcon]: isPublished === false && icon.type === 'name',
                            [styles.unpublishedIconPath]: isPublished === false && icon.type === 'path'
                        }),
                        options: {
                            width: 16,
                            height: 16
                        },
                        subIconName: isPublished === false ? 'eye-off' : undefined
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tree/node/content/tree-node-content.tsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                        className: "tree-node-content__label",
                        children: label
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tree/node/content/tree-node-content.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tree/node/content/tree-node-content.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_5__.Flex, {
                align: "center",
                gap: 'mini',
                ref: ref,
                children: isLocked && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_2__.Icon, {
                    className: !(0,lodash__WEBPACK_IMPORTED_MODULE_6__.isNil)(locked) && !(0,lodash__WEBPACK_IMPORTED_MODULE_6__.isEmpty)(locked) ? '' : styles.indirectLockedIcon,
                    options: {
                        width: 14,
                        height: 14
                    },
                    value: "lock"
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tree/node/content/tree-node-content.tsx",
                    lineNumber: 57,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tree/node/content/tree-node-content.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tree/node/content/tree-node-content.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}, "1BGFRu6BGAbhzJ8kKgs1GUjvI6w=", false, function() {
    return [
        _tree_node_content_styles__WEBPACK_IMPORTED_MODULE_3__.useStyles
    ];
})), "1BGFRu6BGAbhzJ8kKgs1GUjvI6w=", false, function() {
    return [
        _tree_node_content_styles__WEBPACK_IMPORTED_MODULE_3__.useStyles
    ];
});
_c1 = TreeNodeContent;

var _c, _c1;
$RefreshReg$(_c, "TreeNodeContent$forwardRef");
$RefreshReg$(_c1, "TreeNodeContent");

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
"./js/src/core/components/element-tree/node/tree-node.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
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
    return {
        treeNode: css`
      user-select: none;

      &.tree-node--is-root {
        & > .tree-node__content {
          padding-left: ${token.paddingSM}px;
        }
      }

      &.tree-node--danger {
        & > .tree-node__content .tree-node__content-wrapper {
          color: ${token.colorError};
          text-decoration: line-through;
        }
      }

      .tree-node__content {
        cursor: pointer;
        width: 100%;
        padding: 2px ${token.paddingSM}px 2px 0;
        white-space: nowrap;
        align-items: center;
          
        .ant-upload-wrapper {
          width: 100%;
          overflow: hidden;
            
          .ant-upload {
            width: 100%;
            display: flex;
            align-items: center;
            gap: 8px
          }
        }

        .tree-node__content-wrapper {
          width: 100%;
          overflow: hidden;
        }

        @media (hover: hover) {
          &:hover {
            background-color: ${token.controlItemBgActiveHover};
          }
        }

        &:focus {
          outline: none;
          background-color: ${token.controlItemBgActiveHover};
        }
      }

      &.tree-node--selected > .tree-node__content {
        background-color: ${token.controlItemBgActive};
      }

      .tree-node-content__label {
        display: inline-block;
        text-overflow: ellipsis;
        overflow: hidden;
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
"./js/src/core/components/element-tree/node/tree-node.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TreeNode: () => (TreeNode),
  defaultProps: () => (defaultProps)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _tree_node_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/element-tree/node/tree-node.styles.ts");
/* ESM import */var _element_tree__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/element-tree/element-tree.tsx");
/* ESM import */var _list_tree_list__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/element-tree/list/tree-list.tsx");
/* ESM import */var _expander_tree_expander__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/element-tree/expander/tree-expander.tsx");
/* ESM import */var _hooks_use_element_tree_node__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/element-tree/hooks/use-element-tree-node.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_8__);
/* ESM import */var _Pimcore_modules_widget_manager_widget_utils_widget_content_scroll__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/widget-manager/widget/utils/widget-content-scroll.ts");
/* ESM import */var _Pimcore_components_element_tree_dnd_upload_dnd_upload__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/components/element-tree/dnd-upload/dnd-upload.tsx");
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










const defaultProps = {
    id: Math.random().toString(16).slice(2),
    internalKey: '',
    icon: {
        type: 'name',
        value: 'folder'
    },
    label: '',
    children: [],
    permissions: {
        list: false,
        view: false,
        publish: false,
        delete: false,
        rename: false,
        create: false,
        settings: false,
        versions: false,
        properties: false
    },
    level: 0,
    locked: null,
    isLocked: false,
    isRoot: false
};
const { useToken } = antd__WEBPACK_IMPORTED_MODULE_1__.theme;
const TreeNode = /*#__PURE__*/ _s((0,react__WEBPACK_IMPORTED_MODULE_2__.forwardRef)(_c = _s(function ForwardedTreeNode(param, forwardRef) {
    let { id = defaultProps.id, internalKey = defaultProps.internalKey, icon = defaultProps.icon, label = defaultProps.label, level = defaultProps.level, isRoot = defaultProps.isRoot, isLoading = false, danger = false, ...props } = param;
    _s();
    const { token } = useToken();
    const { metaData } = props;
    const { styles } = (0,_tree_node_styles__WEBPACK_IMPORTED_MODULE_3__.useStyles)();
    const { renderNodeContent: RenderNodeContent, onSelect, onRightClick, nodesRefs, nodeOrder } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useContext)(_element_tree__WEBPACK_IMPORTED_MODULE_4__.TreeContext);
    const { isExpanded, setExpanded, isSelected, isScrollTo, setScrollTo, setSelectedIds } = (0,_hooks_use_element_tree_node__WEBPACK_IMPORTED_MODULE_7__.useElementTreeNode)(id);
    const treeNodeProps = {
        id,
        icon,
        label,
        internalKey,
        level,
        isLoading,
        isRoot,
        danger,
        ...props
    };
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        return ()=>{
            if (nodesRefs !== undefined) {
                // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                delete nodesRefs.current[internalKey];
            }
        };
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        if (isScrollTo) {
            var _nodesRefs_current_internalKey;
            const nodeElement = nodesRefs === null || nodesRefs === void 0 ? void 0 : (_nodesRefs_current_internalKey = nodesRefs.current[internalKey]) === null || _nodesRefs_current_internalKey === void 0 ? void 0 : _nodesRefs_current_internalKey.el;
            if (!(0,lodash__WEBPACK_IMPORTED_MODULE_8__.isNil)(nodeElement)) {
                (0,_Pimcore_modules_widget_manager_widget_utils_widget_content_scroll__WEBPACK_IMPORTED_MODULE_9__.scrollToNodeElement)(nodeElement);
                setScrollTo(false);
            }
        }
    }, [
        isScrollTo,
        nodesRefs,
        internalKey,
        setScrollTo
    ]);
    function getClasses() {
        const classes = [
            'tree-node',
            styles.treeNode
        ];
        if (isSelected) {
            classes.push('tree-node--selected');
        }
        if (danger) {
            classes.push('tree-node--danger');
        }
        if (isRoot === true) {
            classes.push('tree-node--is-root');
        }
        return classes.join(' ');
    }
    function selectNode() {
        setSelectedIds([
            id
        ]);
        if (onSelect !== undefined) {
            onSelect(treeNodeProps);
        }
    }
    function onClick(event) {
        selectNode();
    }
    function onContextMenu(event) {
        if (onRightClick !== undefined) {
            onRightClick(event, treeNodeProps);
        }
    }
    function onKeyDown(event) {
        if (event.key === 'Enter') {
            selectNode();
        }
        if (event.key === 'ArrowRight') {
            expandItem();
        }
        if (event.key === 'ArrowLeft') {
            collapseItem();
        }
        if (event.key === 'ArrowDown') {
            gotoNextNode(event);
        }
        if (event.key === 'ArrowUp') {
            gotoPreviousNode(event);
        }
    }
    function expandItem() {
        setExpanded(true);
    }
    function collapseItem() {
        setExpanded(false);
    }
    function gotoNextNode(event) {
        event.preventDefault();
        const index = nodeOrder().indexOf(internalKey);
        if (index < nodeOrder().length - 1) {
            nodesRefs.current[nodeOrder()[index + 1]].el.focus();
        }
    }
    function gotoPreviousNode(event) {
        event.preventDefault();
        const index = nodeOrder().indexOf(internalKey);
        if (index > 0) {
            nodesRefs.current[nodeOrder()[index - 1]].el.focus();
        }
    }
    function setRef(el) {
        registerNode(el);
    }
    function registerNode(el) {
        const nodeRef = {
            el,
            node: treeNodeProps
        };
        nodesRefs.current[internalKey] = nodeRef;
    }
    function onDragOver(event) {
        const assetMetaData = metaData === null || metaData === void 0 ? void 0 : metaData.asset;
        if (assetMetaData !== undefined && assetMetaData.type === 'folder') {
            setSelectedIds([
                id
            ]);
        }
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: getClasses(),
        onDragOver: onDragOver,
        ref: forwardRef,
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_1__.Flex, {
                className: "tree-node__content",
                gap: "small",
                onClick: onClick,
                onContextMenu: onContextMenu,
                onKeyDown: onKeyDown,
                ref: setRef,
                role: "button",
                style: {
                    paddingLeft: token.paddingSM + 20 * level,
                    minWidth: `${20 * level + 200}px`
                },
                tabIndex: -1,
                children: [
                    isRoot !== true && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_expander_tree_expander__WEBPACK_IMPORTED_MODULE_6__.TreeExpander, {
                        node: treeNodeProps,
                        state: [
                            isExpanded,
                            setExpanded
                        ]
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tree/node/tree-node.tsx",
                        lineNumber: 248,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_element_tree_dnd_upload_dnd_upload__WEBPACK_IMPORTED_MODULE_10__.DndUpload, {
                        nodeId: id,
                        nodeType: props.elementType,
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                            className: "tree-node__content-wrapper",
                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(RenderNodeContent, {
                                node: treeNodeProps
                            }, void 0, false, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tree/node/tree-node.tsx",
                                lineNumber: 259,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tree/node/tree-node.tsx",
                            lineNumber: 258,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tree/node/tree-node.tsx",
                        lineNumber: 254,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tree/node/tree-node.tsx",
                lineNumber: 231,
                columnNumber: 7
            }, this),
            isExpanded && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_list_tree_list__WEBPACK_IMPORTED_MODULE_5__.TreeList, {
                node: treeNodeProps
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tree/node/tree-node.tsx",
                lineNumber: 265,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tree/node/tree-node.tsx",
        lineNumber: 226,
        columnNumber: 5
    }, this);
}, "b5VJ0r66oZ/2trH/k1rNEFy5gv4=", false, function() {
    return [
        useToken,
        _tree_node_styles__WEBPACK_IMPORTED_MODULE_3__.useStyles,
        _hooks_use_element_tree_node__WEBPACK_IMPORTED_MODULE_7__.useElementTreeNode
    ];
})), "b5VJ0r66oZ/2trH/k1rNEFy5gv4=", false, function() {
    return [
        useToken,
        _tree_node_styles__WEBPACK_IMPORTED_MODULE_3__.useStyles,
        _hooks_use_element_tree_node__WEBPACK_IMPORTED_MODULE_7__.useElementTreeNode
    ];
});
_c1 = TreeNode;

var _c, _c1;
$RefreshReg$(_c, "TreeNode$forwardRef");
$RefreshReg$(_c1, "TreeNode");

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
"./js/src/core/components/element-tree/provider/node-api-hook-provider/node-api-hook-provider.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  NodeApiHookContext: () => (NodeApiHookContext),
  NodeApiHookProvider: () => (NodeApiHookProvider)
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

const NodeApiHookContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(undefined);
const NodeApiHookProvider = (param)=>{
    let { nodeApiHook, children } = param;
    _s();
    const contextValue = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>({
            nodeApiHook
        }), [
        nodeApiHook
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(NodeApiHookContext.Provider, {
        value: contextValue,
        children: children
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tree/provider/node-api-hook-provider/node-api-hook-provider.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, undefined);
};
_s(NodeApiHookProvider, "JLzJfL3KLoV7bWTi3UEfulSv7uk=");
_c = NodeApiHookProvider;
var _c;
$RefreshReg$(_c, "NodeApiHookProvider");

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
"./js/src/core/components/element-tree/provider/node-api-hook-provider/use-node-api-hook.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useNodeApiHook: () => (useNodeApiHook)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _node_api_hook_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/element-tree/provider/node-api-hook-provider/node-api-hook-provider.tsx");
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

const useNodeApiHook = ()=>{
    const context = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_node_api_hook_provider__WEBPACK_IMPORTED_MODULE_1__.NodeApiHookContext);
    if (context === undefined) {
        throw new Error('useNodeApiHook must be used within a NodeApiHookProvider');
    }
    return context;
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
"./js/src/core/components/element-tree/skeleton/skeleton.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Skeleton: () => (Skeleton)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var framer_motion__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs");
/* ESM import */var _Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/box/box.tsx");
/* ESM import */var _Pimcore_components_space_space__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/space/space.tsx");
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





const Skeleton = (props)=>{
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(framer_motion__WEBPACK_IMPORTED_MODULE_5__.motion.div, {
        animate: {
            opacity: 1
        },
        initial: {
            opacity: 0
        },
        ...props,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_3__.Box, {
            padding: {
                top: 'extra-small',
                bottom: 'extra-small',
                right: 'extra-small'
            },
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_space_space__WEBPACK_IMPORTED_MODULE_4__.Space, {
                className: "w-full",
                direction: "vertical",
                size: "extra-small",
                children: Array.from({
                    length: 5
                }).map((_, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Skeleton.Input, {
                        active: true,
                        block: true,
                        style: {
                            height: 16
                        }
                    }, index, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tree/skeleton/skeleton.tsx",
                        lineNumber: 38,
                        columnNumber: 13
                    }, undefined))
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tree/skeleton/skeleton.tsx",
                lineNumber: 32,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tree/skeleton/skeleton.tsx",
            lineNumber: 31,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tree/skeleton/skeleton.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, undefined);
};
_c = Skeleton;
var _c;
$RefreshReg$(_c, "Skeleton");

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
"./js/src/core/components/element-tree/types/node-api-hook.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
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
"./js/src/core/components/empty/empty.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Empty: () => (Empty)
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


const Empty = (props)=>{
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Empty, {
        ...props
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/empty/empty.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, undefined);
};
_c = Empty;
var _c;
$RefreshReg$(_c, "Empty");

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
"./js/src/core/components/focal-point/focal-point.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
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
    return {
        container: css`
      position: relative;
      margin: auto;
      user-select: none;
    `,
        imageContainer: css`
      width: 100%;
    `,
        draggableElement: css`
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      color: ${token.colorPrimary};
      width: ${token.Button.controlHeightSM}px !important;
      height: ${token.Button.controlHeightSM}px !important;
      background: ${token.Colors.Neutral.Fill.colorFill};
      box-shadow: none;
      border: 2px dashed;
      transition: transform 0.05s linear !important;
      transform: translate(-50%, -50%);
      

        &:hover, &:active {
          color: ${token.colorPrimary};
          background: ${token.Colors.Neutral.Fill.colorFill} !important;
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
"./js/src/core/components/focal-point/focal-point.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  FocalPoint: () => (FocalPoint)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_modules_asset_hooks_use_asset_draft__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/asset/hooks/use-asset-draft.ts");
/* ESM import */var _Pimcore_modules_asset_asset_provider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/asset/asset-provider.tsx");
/* ESM import */var _Pimcore_components_focal_point_context_focal_point_context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/focal-point/context/focal-point-context.ts");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* ESM import */var _Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/icon-button/icon-button.tsx");
/* ESM import */var _Pimcore_components_pimcore_image_pimcore_image__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/pimcore-image/pimcore-image.tsx");
/* ESM import */var _focal_point_styles__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/components/focal-point/focal-point.styles.ts");
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









const PERCENT_MULTIPLIER = 100;
const FocalPoint = (param)=>{
    let { zoom, imageSrc } = param;
    _s();
    const [dragging, setDragging] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [imageWidth, setImageWidth] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const draggingRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(dragging);
    const movingElementRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        draggingRef.current = dragging;
    }, [
        dragging
    ]);
    const { id } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_Pimcore_modules_asset_asset_provider__WEBPACK_IMPORTED_MODULE_4__.AssetContext);
    const focalPointContext = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_Pimcore_components_focal_point_context_focal_point_context__WEBPACK_IMPORTED_MODULE_5__.FocalPointContext);
    const { isLoading, imageSettings, addImageSettings, removeImageSetting } = (0,_Pimcore_modules_asset_hooks_use_asset_draft__WEBPACK_IMPORTED_MODULE_3__.useAssetDraft)(id);
    const { styles } = (0,_focal_point_styles__WEBPACK_IMPORTED_MODULE_9__.useStyles)();
    if ((0,lodash__WEBPACK_IMPORTED_MODULE_2__.isUndefined)(focalPointContext)) {
        (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_6__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_6__.GeneralError('FocalPoint must be used within the FocalPointProvider'));
    }
    const { coordinates, setCoordinates, isActive, setIsActive, disabled, containerRef } = focalPointContext;
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!isActive && !isLoading && containerRef.current !== null) {
            removeImageSetting('focalPoint');
        }
    }, [
        isActive
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (isActive && !dragging) {
            addImageSettings({
                focalPoint: {
                    x: coordinates.x,
                    y: coordinates.y
                }
            });
        }
    }, [
        dragging
    ]);
    const handleOnLoad = ()=>{
        var _containerRef_current;
        const image = (_containerRef_current = containerRef.current) === null || _containerRef_current === void 0 ? void 0 : _containerRef_current.querySelector('img');
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_2__.isNull)(containerRef.current) && !(0,lodash__WEBPACK_IMPORTED_MODULE_2__.isNull)(image)) {
            const container = containerRef.current;
            const visibleWidth = container.clientWidth;
            const visibleHeight = container.clientHeight;
            const imageNaturalWidth = image.naturalWidth;
            const imageNaturalHeight = image.naturalHeight;
            const aspectRatio = imageNaturalWidth / imageNaturalHeight;
            const maxWidthBasedOnHeight = visibleHeight * aspectRatio;
            const maxImageWidth = Math.min(visibleWidth, maxWidthBasedOnHeight, imageNaturalWidth);
            setImageWidth(maxImageWidth);
            if (!(0,lodash__WEBPACK_IMPORTED_MODULE_2__.isUndefined)(imageSettings === null || imageSettings === void 0 ? void 0 : imageSettings.focalPoint)) {
                const focalPoint = imageSettings.focalPoint;
                setCoordinates({
                    x: focalPoint.x,
                    y: focalPoint.y
                });
                setIsActive(true);
            }
        }
    };
    const handleMouseMove = (evt)=>{
        if ((0,lodash__WEBPACK_IMPORTED_MODULE_2__.isNull)(containerRef.current) || (0,lodash__WEBPACK_IMPORTED_MODULE_2__.isNull)(movingElementRef.current) || disabled) return;
        if (draggingRef.current) {
            const container = containerRef.current.firstElementChild;
            const movingElement = movingElementRef.current;
            const containerBounds = container.getBoundingClientRect();
            const movingElementBounds = movingElement.getBoundingClientRect();
            const movingElementHalfWidth = movingElementBounds.width / 2;
            const movingElementHalfHeight = movingElementBounds.height / 2;
            const fullWidth = container.clientWidth ?? 0;
            const fullHeight = container.clientHeight ?? 0;
            const minX = containerBounds.left + movingElementHalfWidth;
            const maxX = containerBounds.left + containerBounds.width - movingElementHalfWidth;
            const minY = containerBounds.top + movingElementHalfHeight;
            const maxY = containerBounds.top + containerBounds.height - movingElementHalfHeight;
            const positionX = Math.min(Math.max(minX, evt.clientX), maxX);
            const positionY = Math.min(Math.max(minY, evt.clientY), maxY);
            const percentX = (positionX - containerBounds.left) / fullWidth * PERCENT_MULTIPLIER;
            const percentY = (positionY - containerBounds.top) / fullHeight * PERCENT_MULTIPLIER;
            setCoordinates({
                x: percentX,
                y: percentY
            });
        }
    };
    const handleMouseUp = ()=>{
        setDragging(false);
    };
    const handleMouseDown = ()=>{
        setDragging(true);
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mousemove', handleMouseMove);
        return ()=>{
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: styles.container,
        style: {
            width: `${zoom}%`,
            maxWidth: `${imageWidth * (zoom / 100)}px`
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_pimcore_image_pimcore_image__WEBPACK_IMPORTED_MODULE_8__.PimcoreImage, {
                alt: "car",
                onLoad: handleOnLoad,
                src: imageSrc,
                wrapperClassName: styles.imageContainer
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/focal-point/focal-point.tsx",
                lineNumber: 153,
                columnNumber: 7
            }, undefined),
            isActive && !(0,lodash__WEBPACK_IMPORTED_MODULE_2__.isNull)(containerRef.current) && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_7__.IconButton, {
                "aria-label": "Draggable",
                className: styles.draggableElement,
                "data-cypress": "draggable-item",
                hidden: !isActive,
                icon: {
                    value: 'focal-point'
                },
                onMouseDown: handleMouseDown,
                ref: movingElementRef,
                style: {
                    left: `${coordinates.x}%`,
                    top: `${coordinates.y}%`
                },
                type: "dashed"
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/focal-point/focal-point.tsx",
                lineNumber: 160,
                columnNumber: 9
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/focal-point/focal-point.tsx",
        lineNumber: 146,
        columnNumber: 5
    }, undefined);
};
_s(FocalPoint, "r/5o62sYKvNTa0jWGhzh70YUz+0=", false, function() {
    return [
        _Pimcore_modules_asset_hooks_use_asset_draft__WEBPACK_IMPORTED_MODULE_3__.useAssetDraft,
        _focal_point_styles__WEBPACK_IMPORTED_MODULE_9__.useStyles
    ];
});
_c = FocalPoint;
var _c;
$RefreshReg$(_c, "FocalPoint");

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
"./js/src/core/components/focal-point/provider/focal-point-provider.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  FocalPointProvider: () => (FocalPointProvider)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _context_focal_point_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/focal-point/context/focal-point-context.ts");
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


const FocalPointProvider = (param)=>{
    let { children } = param;
    _s();
    const [coordinates, setCoordinates] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        x: 0,
        y: 0
    });
    const [isActive, setIsActive] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [disabled, setDisabled] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const containerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_context_focal_point_context__WEBPACK_IMPORTED_MODULE_2__.FocalPointContext.Provider, {
            value: {
                isActive,
                setIsActive,
                coordinates,
                setCoordinates,
                disabled,
                setDisabled,
                containerRef
            },
            children: children
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/focal-point/provider/focal-point-provider.tsx",
            lineNumber: 27,
            columnNumber: 5
        }, undefined), [
        isActive,
        coordinates,
        disabled,
        children
    ]);
};
_s(FocalPointProvider, "vPQm8SRvsv3TA2qKWslwOskftWA=");
_c = FocalPointProvider;
var _c;
$RefreshReg$(_c, "FocalPointProvider");

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
"./js/src/core/components/form-item-wrapper/form-item-wrapper.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  FormItemWrapper: () => (FormItemWrapper)
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


const FormItemWrapper = (param)=>{
    let { children, ...props } = param;
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Form.Item, {
        ...props,
        children: children
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/form-item-wrapper/form-item-wrapper.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, undefined);
};
_c = FormItemWrapper;
var _c;
$RefreshReg$(_c, "FormItemWrapper");

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
"./js/src/core/components/icon-or-image/icon-or-image.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
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
    return {
        icon: css`
        color: ${token.Colors.Neutral.Icon.colorIcon};
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
"./js/src/core/components/icon-or-image/icon-or-image.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  IconOrImage: () => (IconOrImage)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_pimcore_image_pimcore_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/pimcore-image/pimcore-image.tsx");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _Pimcore_components_icon_or_image_icon_or_image_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/icon-or-image/icon-or-image.styles.tsx");
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




const IconOrImage = (props)=>{
    _s();
    const { styles } = (0,_Pimcore_components_icon_or_image_icon_or_image_styles__WEBPACK_IMPORTED_MODULE_4__.useStyles)();
    const renderPreview = ()=>{
        if (typeof props.value === 'string') {
            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_pimcore_image_pimcore_image__WEBPACK_IMPORTED_MODULE_2__.PimcoreImage, {
                alt: props.alt,
                className: props.class,
                src: props.value
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/icon-or-image/icon-or-image.tsx",
                lineNumber: 32,
                columnNumber: 9
            }, undefined);
        } else if (typeof props.value === 'object') {
            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__.Icon, {
                ...props.value,
                className: styles.icon,
                options: {
                    width: 50,
                    height: 50
                }
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/icon-or-image/icon-or-image.tsx",
                lineNumber: 40,
                columnNumber: 9
            }, undefined);
        }
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}, void 0, false);
    };
    return renderPreview();
};
_s(IconOrImage, "1BGFRu6BGAbhzJ8kKgs1GUjvI6w=", false, function() {
    return [
        _Pimcore_components_icon_or_image_icon_or_image_styles__WEBPACK_IMPORTED_MODULE_4__.useStyles
    ];
});
_c = IconOrImage;
var _c;
$RefreshReg$(_c, "IconOrImage");

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
"./js/src/core/components/image-zoom/image-zoom.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
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
        imageZoomContainer: css`
      display: flex;
      gap: 5px
    `,
        imageZoom: css`
      .ant-select {
        min-width: 70px;
        text-align: center;

        .ant-select-selector {
          border: 1px solid ${token.Button.defaultBorderColor};

          .ant-select-selection-item {
            padding-inline-end: unset;
          }
        }

        .ant-select-arrow {
          display: none;
        }
      }
    `,
        imageZoomBtn: css`
      border: 1px solid ${token.Button.defaultBorderColor};
      box-shadow: none !important;
      width: ${token.controlHeight}px;
      height: ${token.controlHeight}px;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;

      .pimcore-icon {
        display: flex;
      }

      &:disabled {
        background: ${token.colorBgContainer};
      }
    `,
        imageZoomResetBtn: css`
      border: 1px solid ${token.Button.defaultBorderColor};
      box-shadow: none !important;
      width: auto;
      height: ${token.controlHeight}px;
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
"./js/src/core/components/image-zoom/image-zoom.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ImageZoom: () => (ImageZoom)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _Pimcore_components_select_select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/select/select.tsx");
/* ESM import */var _Pimcore_utils_helpers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/utils/helpers.tsx");
/* ESM import */var _Pimcore_components_image_zoom_image_zoom_styles__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/image-zoom/image-zoom.styles.tsx");
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








const ImageZoom = (param)=>{
    let { zoom, setZoom, zoomSteps = 25 } = param;
    _s();
    const [zoomInDisabled, setZoomInDisabled] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [zoomOutDisabled, setZoomOutDisabled] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const selectRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const { styles } = (0,_Pimcore_components_image_zoom_image_zoom_styles__WEBPACK_IMPORTED_MODULE_8__.useStyle)({
        zoom
    });
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        // zoomIn Btn
        if (zoom >= 500) {
            setZoomInDisabled(true);
        }
        if (zoomInDisabled && zoom < 500) {
            setZoomInDisabled(false);
        }
        // zoomOut Btn
        if (zoom <= 25) {
            setZoomOutDisabled(true);
        }
        if (zoomOutDisabled && zoom > 25) {
            setZoomOutDisabled(false);
        }
    }, [
        zoom
    ]);
    const handleChange = (value)=>{
        setZoom(parseInt(value));
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_4__.isNull)(selectRef.current)) {
            selectRef.current.blur();
        }
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: styles.imageZoomContainer,
        children: [
            zoom !== 100 && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.Button, {
                "aria-label": t('aria.asset.image.editor.zoom.reset'),
                className: styles.imageZoomResetBtn,
                onClick: ()=>{
                    setZoom(100);
                },
                onKeyDown: _Pimcore_utils_helpers__WEBPACK_IMPORTED_MODULE_7__.onKeyEnterExecuteClick,
                children: t('asset.image.editor.zoom.reset')
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/image-zoom/image-zoom.tsx",
                lineNumber: 68,
                columnNumber: 9
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.Space.Compact, {
                className: styles.imageZoom,
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.Button, {
                        "aria-disabled": zoomOutDisabled,
                        "aria-label": t('aria.asset.image.editor.zoom.zoom-out'),
                        className: styles.imageZoomBtn,
                        disabled: zoomOutDisabled,
                        onClick: ()=>{
                            setZoom(zoom - zoomSteps);
                        },
                        onKeyDown: _Pimcore_utils_helpers__WEBPACK_IMPORTED_MODULE_7__.onKeyEnterExecuteClick,
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_5__.Icon, {
                            value: 'minus'
                        }, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/image-zoom/image-zoom.tsx",
                            lineNumber: 87,
                            columnNumber: 11
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/image-zoom/image-zoom.tsx",
                        lineNumber: 79,
                        columnNumber: 9
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_select_select__WEBPACK_IMPORTED_MODULE_6__.Select, {
                        "aria-label": t('aria.asset.image.editor.zoom.preconfigured-zoom-levels'),
                        defaultActiveFirstOption: true,
                        defaultValue: '100',
                        onChange: (value)=>{
                            handleChange(value);
                        },
                        options: [
                            {
                                value: '100',
                                label: '100%'
                            },
                            {
                                value: '125',
                                label: '125%'
                            },
                            {
                                value: '150',
                                label: '150%'
                            },
                            {
                                value: '175',
                                label: '175%'
                            },
                            {
                                value: '200',
                                label: '200%'
                            },
                            {
                                value: '225',
                                label: '225%'
                            },
                            {
                                value: '250',
                                label: '250%'
                            }
                        ],
                        ref: selectRef,
                        value: `${zoom}%`
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/image-zoom/image-zoom.tsx",
                        lineNumber: 89,
                        columnNumber: 9
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.Button, {
                        "aria-disabled": zoomInDisabled,
                        "aria-label": t('aria.asset.image.editor.zoom.zoom-in'),
                        className: styles.imageZoomBtn,
                        disabled: zoomInDisabled,
                        onClick: ()=>{
                            setZoom(zoom + zoomSteps);
                        },
                        onKeyDown: _Pimcore_utils_helpers__WEBPACK_IMPORTED_MODULE_7__.onKeyEnterExecuteClick,
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_5__.Icon, {
                            value: 'new'
                        }, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/image-zoom/image-zoom.tsx",
                            lineNumber: 114,
                            columnNumber: 11
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/image-zoom/image-zoom.tsx",
                        lineNumber: 106,
                        columnNumber: 9
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/image-zoom/image-zoom.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/image-zoom/image-zoom.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, undefined);
};
_s(ImageZoom, "4WfoxbXomPPZyluoRSuTirwlK5s=", false, function() {
    return [
        _Pimcore_components_image_zoom_image_zoom_styles__WEBPACK_IMPORTED_MODULE_8__.useStyle,
        react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation
    ];
});
_c = ImageZoom;
var _c;
$RefreshReg$(_c, "ImageZoom");

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
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Menu: () => (Menu)
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


const Menu = (props)=>{
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Menu, {
        ...props
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/menu/menu.tsx",
        lineNumber: 21,
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
"./js/src/core/components/modal/file-list/file-list.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
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
        filesList: css`
            list-style: none;
            padding: 0;
            margin: 10px 0 0;

            li {
                font-size: 12px;
                font-weight: 400;
                line-height: 22px;
                color: ${token.colorTextTertiary}
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
"./js/src/core/components/modal/file-list/file-list.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  FileList: () => (FileList)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_modal_file_list_file_list_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/modal/file-list/file-list.styles.tsx");
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


const FileList = (props)=>{
    _s();
    const { styles } = (0,_Pimcore_components_modal_file_list_file_list_styles__WEBPACK_IMPORTED_MODULE_2__.useStyle)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("ul", {
        className: styles.filesList,
        children: props.files.map((file, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("li", {
                children: file
            }, `${file}-${index}`, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/modal/file-list/file-list.tsx",
                lineNumber: 27,
                columnNumber: 9
            }, undefined))
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/modal/file-list/file-list.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, undefined);
};
_s(FileList, "4AcVho8W1Y+Yfard/v4lDs8ZRDQ=", false, function() {
    return [
        _Pimcore_components_modal_file_list_file_list_styles__WEBPACK_IMPORTED_MODULE_2__.useStyle
    ];
});
_c = FileList;
var _c;
$RefreshReg$(_c, "FileList");

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
"./js/src/core/components/modal/popconfirm/popconfirm.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Popconfirm: () => (Popconfirm)
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


const Popconfirm = (props)=>{
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Popconfirm, {
        ...props
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/modal/popconfirm/popconfirm.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, undefined);
};
_c = Popconfirm;
var _c;
$RefreshReg$(_c, "Popconfirm");

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
"./js/src/core/components/pimcore-audio/pimcore-audio.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  PimcoreAudio: () => (PimcoreAudio)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
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


const PimcoreAudio = (param)=>{
    let { sources, tracks, className } = param;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)();
    return(// eslint-disable-next-line jsx-a11y/media-has-caption
    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("audio", {
        className: className,
        controls: true,
        children: [
            sources.map((source, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("source", {
                    src: source.src,
                    type: source.type
                }, `${index}-${source.type}`, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/pimcore-audio/pimcore-audio.tsx",
                    lineNumber: 49,
                    columnNumber: 9
                }, undefined)),
            tracks === null || tracks === void 0 ? void 0 : tracks.map((track, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("track", {
                    kind: track.kind,
                    label: track.label,
                    src: track.src,
                    srcLang: track.srcLang
                }, `${index}-${track.label}`, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/pimcore-audio/pimcore-audio.tsx",
                    lineNumber: 57,
                    columnNumber: 9
                }, undefined)),
            t('asset.preview.no-audio-support')
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/pimcore-audio/pimcore-audio.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, undefined));
};
_s(PimcoreAudio, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation
    ];
});
_c = PimcoreAudio;
var _c;
$RefreshReg$(_c, "PimcoreAudio");

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
"./js/src/core/components/preview-card/preview-card.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
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
        card: css`
        &.ant-card {
            height: 103px;
            cursor: pointer;
        }

      &.card-medium {
        height: 150px;
      }
      
      &.ant-card .ant-card-body {
            padding: ${token.paddingXXS}px ${token.paddingXS}px;
            margin-top: 7px;
            margin-bottom: 7px;
            width: 166px;
        }
        
        &.ant-card .ant-card-meta-title {
              font-weight: normal;
        }

        .checkbox, .checkbox-medium {
            position: absolute;
            top: ${token.paddingXXS}px;
            left: ${token.paddingXXS}px;
        }

        .checkbox-medium {
            left: ${token.paddingXS}px;
        }

        .dots-button, .dots-button-medium {
            position: absolute;
            top: ${token.paddingXXS}px;
            right: ${token.paddingXXS}px;
        }

        .dots-button-medium {
            right: ${token.paddingXS}px;
        }
      
        .dropdown-menu__icon {
            vertical-align: text-bottom;
        }

        .dots-button-open-dropdown:not(:disabled):not(.ant-btn-disabled):hover {
            background-color: ${token.Button.defaultColor};
            color: white;
        }

        .ant-card-cover .img-container, .ant-card-cover .img-container-medium {
            display: flex;
            justify-content: center;
            align-items: center;
        }
      
        .ant-card-cover .img-container {
            height: 64px;
            width: 170px;
            
            .pimcore-icon {
                color: ${token.Colors.Neutral.Icon.colorIcon};

                svg * {
                    vector-effect: non-scaling-stroke;
                }
            }
        }

        .ant-image .ant-image-img.img, .ant-image .ant-image-img.img-medium {
            border-radius: unset;
            margin-top: 3px;
        }
        
        .ant-image .ant-image-img.img {
            max-height: 61px;
            max-width: 168px;
        }

        .ant-card-cover .img-container-medium {
            height: 109px;
            width: 236px;
        }

        .ant-image .ant-image-img.img-medium {
            max-height: 106px;
            max-width: 234px;
        }

        .menu-icon {
            margin-right: ${token.marginXS}px;
        }

        .flexbox-start-end {
            display: flex;
            justify-content: space-between;
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
"./js/src/core/components/preview-card/preview-card.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  PreviewCard: () => (PreviewCard),
  SizeTypes: () => (SizeTypes)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _preview_card_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/preview-card/preview-card.styles.tsx");
/* ESM import */var antd_es_card_Meta__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./node_modules/antd/es/card/Meta.js");
/* ESM import */var _icon_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _dropdown_dropdown__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/dropdown/dropdown.tsx");
/* ESM import */var _Pimcore_components_icon_or_image_icon_or_image__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/icon-or-image/icon-or-image.tsx");
/* ESM import */var _Pimcore_components_tooltip_tooltip__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/tooltip/tooltip.tsx");
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








var SizeTypes = /*#__PURE__*/ function(SizeTypes) {
    SizeTypes["SMALL"] = "small";
    SizeTypes["MEDIUM"] = "medium";
    return SizeTypes;
}({});
const PreviewCard = (props)=>{
    _s();
    const { size = "small" } = props;
    const { styles } = (0,_preview_card_styles__WEBPACK_IMPORTED_MODULE_3__.useStyle)();
    const dropdownMenuRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
    let classCard = '';
    let classImg = 'img';
    let classImgDiv = 'img-container';
    let classDotsButton = 'dots-button';
    if (size === "medium") {
        classCard = 'card-medium';
        classImg = 'img-medium';
        classImgDiv = 'img-container-medium';
        classDotsButton = 'dots-button-medium';
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_tooltip_tooltip__WEBPACK_IMPORTED_MODULE_7__.Tooltip, {
        placement: 'right',
        title: props.name,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_1__.Card, {
            className: [
                styles.card,
                classCard
            ].join(' '),
            cover: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                className: classImgDiv,
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_or_image_icon_or_image__WEBPACK_IMPORTED_MODULE_6__.IconOrImage, {
                    alt: props.name,
                    class: classImg,
                    value: props.imgSrc
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/preview-card/preview-card.tsx",
                    lineNumber: 62,
                    columnNumber: 13
                }, void 0)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/preview-card/preview-card.tsx",
                lineNumber: 61,
                columnNumber: 11
            }, void 0),
            onClick: (event)=>{
                var _dropdownMenuRef_current_menu;
                if (dropdownMenuRef.current === null || ((_dropdownMenuRef_current_menu = dropdownMenuRef.current.menu) === null || _dropdownMenuRef_current_menu === void 0 ? void 0 : _dropdownMenuRef_current_menu.list.contains(event.target)) === false) {
                    var _props_onClick;
                    (_props_onClick = props.onClick) === null || _props_onClick === void 0 ? void 0 : _props_onClick.call(props, event);
                }
            },
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_5__.Dropdown, {
                    menu: {
                        items: props.dropdownItems
                    },
                    menuRef: dropdownMenuRef,
                    placement: "bottomLeft",
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_1__.Button, {
                        className: classDotsButton,
                        icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_icon_icon__WEBPACK_IMPORTED_MODULE_4__.Icon, {
                            className: "dropdown-menu__icon",
                            value: "more"
                        }, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/preview-card/preview-card.tsx",
                            lineNumber: 87,
                            columnNumber: 20
                        }, void 0),
                        onClick: (e)=>{
                            e.stopPropagation();
                        },
                        size: "small"
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/preview-card/preview-card.tsx",
                        lineNumber: 85,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/preview-card/preview-card.tsx",
                    lineNumber: 78,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd_es_card_Meta__WEBPACK_IMPORTED_MODULE_8__["default"], {
                    title: props.name
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/preview-card/preview-card.tsx",
                    lineNumber: 95,
                    columnNumber: 9
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/preview-card/preview-card.tsx",
            lineNumber: 58,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/preview-card/preview-card.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, undefined);
};
_s(PreviewCard, "qWIJGQr+oSH4zv6USvWrmJIdpVw=", false, function() {
    return [
        _preview_card_styles__WEBPACK_IMPORTED_MODULE_3__.useStyle
    ];
});
_c = PreviewCard;
var _c;
$RefreshReg$(_c, "PreviewCard");

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
"./js/src/core/components/progress/progress.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Progress: () => (Progress)
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


const Progress = (props)=>{
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Progress, {
        ...props
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/progress/progress.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, undefined);
};
_c = Progress;
var _c;
$RefreshReg$(_c, "Progress");

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
"./js/src/core/components/region/components/region-item/region-item.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
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
const useStyles = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param, param1)=>{
    let { token, css } = param, { region } = param1;
    return {
        regionItem: css`
      grid-area: ${region};
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
"./js/src/core/components/region/components/region-item/region-item.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  RegionItem: () => (RegionItem)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _region_item_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/region/components/region-item/region-item.styles.ts");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/classnames/index.js");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
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



const RegionItem = (props)=>{
    _s();
    const { region, component, ...restProps } = props;
    const { styles } = (0,_region_item_styles__WEBPACK_IMPORTED_MODULE_1__.useStyles)(props);
    const classnames = classnames__WEBPACK_IMPORTED_MODULE_3___default()(styles.regionItem);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: classnames,
        ...restProps,
        children: component
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/region/components/region-item/region-item.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, undefined);
};
_s(RegionItem, "1BGFRu6BGAbhzJ8kKgs1GUjvI6w=", false, function() {
    return [
        _region_item_styles__WEBPACK_IMPORTED_MODULE_1__.useStyles
    ];
});
_c = RegionItem;
var _c;
$RefreshReg$(_c, "RegionItem");

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
"./js/src/core/components/region/region.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyles: () => (useStyles)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/antd-style/es/functions/index.js");
/* ESM import */var _Pimcore_modules_widget_manager_widget_widget_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/widget-manager/widget/widget-view.tsx");
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

const useStyles = (0,antd_style__WEBPACK_IMPORTED_MODULE_1__.createStyles)((param, param1)=>{
    let { token, css } = param, { layoutDefinition, items } = param1;
    const gridTemplateAreas = layoutDefinition.map((row)=>`"${row}"`).join(' ');
    const maxWidthsPerRegion = items.map((item)=>{
        return {
            region: item.region,
            maxWidth: item.maxWidth
        };
    });
    const maxWidthsPerColumn = [];
    layoutDefinition.forEach((row)=>{
        const regions = row.split(' ');
        regions.forEach((region, index)=>{
            var _maxWidthsPerRegion_find;
            const maxWidth = (_maxWidthsPerRegion_find = maxWidthsPerRegion.find((item)=>item.region === region)) === null || _maxWidthsPerRegion_find === void 0 ? void 0 : _maxWidthsPerRegion_find.maxWidth;
            if (!Array.isArray(maxWidthsPerColumn[index])) {
                maxWidthsPerColumn[index] = [];
            }
            const maxWidthAsNumber = Number(maxWidth ?? '0');
            const isValidNumber = !isNaN(maxWidthAsNumber);
            if (maxWidth !== undefined && (maxWidth !== '' && maxWidth !== '0' && !isValidNumber || isValidNumber && maxWidthAsNumber > 0)) {
                if (isValidNumber) {
                    maxWidthsPerColumn[index].push(`${maxWidthAsNumber}px`);
                } else {
                    maxWidthsPerColumn[index].push(maxWidth);
                }
            }
        });
    });
    const gridTemplateColumns = maxWidthsPerColumn.map((column)=>{
        if (column.length === 0) {
            return '1fr';
        }
        return `max(${column.join(',')})`;
    }).join(' ');
    return {
        region: css`
      display: flex;
      flex-direction: column;
      // @todo make this configurable
      gap: 12px;

      // @todo we should introduce a predefined set of breakpoints
      @container ${_Pimcore_modules_widget_manager_widget_widget_view__WEBPACK_IMPORTED_MODULE_0__.cssContainerWidget.name} (min-width: 768px) {
        display: grid;
        grid-template-areas: ${gridTemplateAreas};
        grid-template-columns: ${gridTemplateColumns};
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
"./js/src/core/components/region/region.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Region: () => (Region)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _region_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/region/region.styles.ts");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/classnames/index.js");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _components_region_item_region_item__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/region/components/region-item/region-item.tsx");
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




const Region = (props)=>{
    _s();
    const { items } = props;
    const { styles } = (0,_region_styles__WEBPACK_IMPORTED_MODULE_2__.useStyles)(props);
    const classnames = classnames__WEBPACK_IMPORTED_MODULE_3___default()(styles.region);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: classnames,
        children: items.map((item)=>{
            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_region_item_region_item__WEBPACK_IMPORTED_MODULE_4__.RegionItem, {
                component: item.component,
                maxWidth: item.maxWidth,
                region: item.region
            }, item.region, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/region/region.tsx",
                lineNumber: 34,
                columnNumber: 11
            }, undefined);
        })
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/region/region.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, undefined);
};
_s(Region, "1BGFRu6BGAbhzJ8kKgs1GUjvI6w=", false, function() {
    return [
        _region_styles__WEBPACK_IMPORTED_MODULE_2__.useStyles
    ];
});
_c = Region;
var _c;
$RefreshReg$(_c, "Region");

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
"./js/src/core/components/reload-popconfirm/reload-popconfirm.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ReloadPopconfirm: () => (ReloadPopconfirm)
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
var _s = $RefreshSig$();


const ReloadPopconfirm = /*#__PURE__*/ _s((0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(_c = _s((props, ref)=>{
    _s();
    const [popConfirmOpen, setPopConfirmOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // Expose open function to parent via ref
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useImperativeHandle)(ref, ()=>({
            refresh: ()=>{
                if (props.hasDataChanged()) {
                    setPopConfirmOpen(true);
                } else {
                    props.onReload();
                }
            }
        }));
    const onOpenChange = (newOpen)=>{
        if (!newOpen) {
            setPopConfirmOpen(false);
            return;
        }
        if (props.hasDataChanged()) {
            setPopConfirmOpen(true);
        } else {
            props.onReload();
        }
    };
    const onConfirm = ()=>{
        setPopConfirmOpen(false);
        props.onReload();
    };
    const onCancel = ()=>{
        var _props_onCancel;
        setPopConfirmOpen(false);
        (_props_onCancel = props.onCancel) === null || _props_onCancel === void 0 ? void 0 : _props_onCancel.call(props);
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Popconfirm, {
        onCancel: onCancel,
        onConfirm: onConfirm,
        onOpenChange: onOpenChange,
        open: popConfirmOpen,
        title: props.title,
        children: props.children
    }, "reload", false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/reload-popconfirm/reload-popconfirm.tsx",
        lineNumber: 67,
        columnNumber: 5
    }, undefined);
}, "MOPT5Lxi9AeqTnbSjJkC3wWdVDg=")), "MOPT5Lxi9AeqTnbSjJkC3wWdVDg=");
_c1 = ReloadPopconfirm;
ReloadPopconfirm.displayName = 'ReloadPopconfirm';

var _c, _c1;
$RefreshReg$(_c, "ReloadPopconfirm$forwardRef");
$RefreshReg$(_c1, "ReloadPopconfirm");

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
"./js/src/core/components/skeleton/components/skeleton-avatar/skeleton-avatar.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SkeletonAvatar: () => (SkeletonAvatar)
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


const SkeletonAvatar = (props)=>{
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Skeleton.Avatar, {
        ...props
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/skeleton/components/skeleton-avatar/skeleton-avatar.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, undefined);
};
_c = SkeletonAvatar;
var _c;
$RefreshReg$(_c, "SkeletonAvatar");

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
"./js/src/core/components/skeleton/components/skeleton-button/skeleton-button.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SkeletonButton: () => (SkeletonButton)
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


const SkeletonButton = (props)=>{
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Skeleton.Button, {
        ...props
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/skeleton/components/skeleton-button/skeleton-button.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, undefined);
};
_c = SkeletonButton;
var _c;
$RefreshReg$(_c, "SkeletonButton");

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
"./js/src/core/components/skeleton/components/skeleton-input/skeleton-input.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SkeletonInput: () => (SkeletonInput)
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


const SkeletonInput = (props)=>{
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Skeleton.Input, {
        ...props
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/skeleton/components/skeleton-input/skeleton-input.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, undefined);
};
_c = SkeletonInput;
var _c;
$RefreshReg$(_c, "SkeletonInput");

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
"./js/src/core/components/skeleton/skeleton.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Skeleton: () => (Skeleton)
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


const Skeleton = (props)=>{
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Skeleton, {
        ...props
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/skeleton/skeleton.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, undefined);
};
_c = Skeleton;
var _c;
$RefreshReg$(_c, "Skeleton");

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
"./js/src/core/components/text-editor/detect-language.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  detectLanguageFromFilename: () => (detectLanguageFromFilename),
  getLanguageExtensions: () => (getLanguageExtensions)
});
/* ESM import */var _codemirror_lang_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@codemirror/lang-html/dist/index.js");
/* ESM import */var _codemirror_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@codemirror/lang-css/dist/index.js");
/* ESM import */var _codemirror_lang_javascript__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/@codemirror/lang-javascript/dist/index.js");
/* ESM import */var _codemirror_lang_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/@codemirror/lang-json/dist/index.js");
/* ESM import */var _codemirror_lang_xml__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/@codemirror/lang-xml/dist/index.js");
/* ESM import */var _codemirror_lang_sql__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/@codemirror/lang-sql/dist/index.js");
/* ESM import */var _codemirror_lang_markdown__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/@codemirror/lang-markdown/dist/index.js");
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






const FILE_EXTENSIONS = {
    html: {
        codeMirrorExtension: (0,_codemirror_lang_html__WEBPACK_IMPORTED_MODULE_0__.html)(),
        fileExtensions: [
            'html',
            'htm',
            'shtm',
            'shtml',
            'xhtml',
            'cfm',
            'cfml',
            'cfc',
            'dhtml',
            'xht',
            'tpl',
            'twig',
            'kit',
            'jsp',
            'aspx',
            'ascx',
            'asp',
            'master',
            'cshtml',
            'vbhtml'
        ]
    },
    css: {
        codeMirrorExtension: (0,_codemirror_lang_css__WEBPACK_IMPORTED_MODULE_1__.css)(),
        fileExtensions: [
            'css',
            'less',
            'scss',
            'sass'
        ]
    },
    javascript: {
        codeMirrorExtension: (0,_codemirror_lang_javascript__WEBPACK_IMPORTED_MODULE_2__.javascript)({
            jsx: true
        }),
        fileExtensions: [
            'js',
            'js.erb',
            'jsm',
            '_js',
            'jsx'
        ]
    },
    json: {
        codeMirrorExtension: (0,_codemirror_lang_json__WEBPACK_IMPORTED_MODULE_3__.json)(),
        fileExtensions: [
            'json',
            'map'
        ]
    },
    xml: {
        codeMirrorExtension: (0,_codemirror_lang_xml__WEBPACK_IMPORTED_MODULE_4__.xml)(),
        fileExtensions: [
            'xml',
            'wxs',
            'wxl',
            'wsdl',
            'rss',
            'atom',
            'rdf',
            'xslt',
            'xsl',
            'xul',
            'xsd',
            'xbl',
            'mathml',
            'config',
            'plist',
            'xaml'
        ]
    },
    sql: {
        codeMirrorExtension: (0,_codemirror_lang_sql__WEBPACK_IMPORTED_MODULE_5__.sql)(),
        fileExtensions: [
            'sql'
        ]
    },
    markdown: {
        codeMirrorExtension: (0,_codemirror_lang_markdown__WEBPACK_IMPORTED_MODULE_6__.markdown)(),
        fileExtensions: [
            'md',
            'markdown',
            'mdown',
            'mkdn'
        ]
    }
};
const getLanguageExtensions = (language)=>{
    if (language === undefined || language === null) {
        return [];
    }
    return [
        FILE_EXTENSIONS[language].codeMirrorExtension
    ];
};
const detectLanguageFromFilename = (filename)=>{
    const extension = filename.split('.').pop();
    if (extension === undefined) {
        return null;
    }
    for(const language in FILE_EXTENSIONS){
        if (FILE_EXTENSIONS[language].fileExtensions.includes(extension)) {
            return language;
        }
    }
    return null;
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
"./js/src/core/components/text-editor/text-editor.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
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
        editor: css`
      height: 100%;
      width: 100%;
      
      & .CodeMirror {
        height: 100%;
        width: 100%;
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
"./js/src/core/components/text-editor/text-editor.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TextEditor: () => (TextEditor)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _uiw_react_codemirror__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/@uiw/react-codemirror/esm/index.js");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/classnames/index.js");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _Pimcore_components_text_editor_detect_language__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/text-editor/detect-language.tsx");
/* ESM import */var _text_editor_styles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/text-editor/text-editor.styles.tsx");
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





const TextEditor = (param)=>{
    let { lineNumbers = true, className, language, textValue, setTextValue } = param;
    _s();
    const { styles } = (0,_text_editor_styles__WEBPACK_IMPORTED_MODULE_5__.useStyle)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_uiw_react_codemirror__WEBPACK_IMPORTED_MODULE_2__["default"], {
        basicSetup: {
            lineNumbers
        },
        className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(styles.editor, className),
        extensions: (0,_Pimcore_components_text_editor_detect_language__WEBPACK_IMPORTED_MODULE_4__.getLanguageExtensions)(language),
        onChange: (value)=>{
            setTextValue(value);
        },
        value: textValue
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/text-editor/text-editor.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, undefined);
};
_s(TextEditor, "4AcVho8W1Y+Yfard/v4lDs8ZRDQ=", false, function() {
    return [
        _text_editor_styles__WEBPACK_IMPORTED_MODULE_5__.useStyle
    ];
});
_c = TextEditor;
var _c;
$RefreshReg$(_c, "TextEditor");

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
"./js/src/core/components/upload/upload.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
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
    return {
        upload: css`
      display: none
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
"./js/src/core/components/upload/upload.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Upload: () => (Upload)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _upload_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/upload/upload.styles.ts");
/* ESM import */var _Pimcore_modules_element_upload_upload_provider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/element/upload/upload-provider.tsx");
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




const Upload = (props)=>{
    _s();
    const { styles } = (0,_upload_styles__WEBPACK_IMPORTED_MODULE_3__.useStyles)();
    const { fileList, uploadingNode, setUploadContext } = (0,_Pimcore_modules_element_upload_upload_provider__WEBPACK_IMPORTED_MODULE_4__.useUploadContext)();
    const mergedConfig = {
        action: `/pimcore-studio/api/assets/add/${uploadingNode}`,
        name: 'file',
        multiple: true,
        showUploadList: false,
        fileList,
        onChange: (param)=>{
            let { fileList } = param;
            setUploadContext('file', fileList);
        },
        ...props
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Upload, {
        className: styles.upload,
        ...mergedConfig,
        children: props.children
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/upload/upload.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, undefined);
};
_s(Upload, "51j9CJLINtPhhAUVXlZCA4OHYNA=", false, function() {
    return [
        _upload_styles__WEBPACK_IMPORTED_MODULE_3__.useStyles,
        _Pimcore_modules_element_upload_upload_provider__WEBPACK_IMPORTED_MODULE_4__.useUploadContext
    ];
});
_c = Upload;
var _c;
$RefreshReg$(_c, "Upload");

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
"./js/src/core/components/upload/zip-upload.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ZipUpload: () => (ZipUpload)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_upload_upload__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/upload/upload.tsx");
/* ESM import */var _Pimcore_modules_element_upload_upload_provider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/element/upload/upload-provider.tsx");
/* ESM import */var _Pimcore_modules_element_upload_hook_use_file_uploader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/element/upload/hook/use-file-uploader.ts");
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




const ZipUpload = (props)=>{
    _s();
    const [promiseCollection, setPromiseCollection] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const { fileList, uploadingNode, setUploadContext } = (0,_Pimcore_modules_element_upload_upload_provider__WEBPACK_IMPORTED_MODULE_3__.useUploadContext)();
    const { uploadZip: uploadZipProcessor } = (0,_Pimcore_modules_element_upload_hook_use_file_uploader__WEBPACK_IMPORTED_MODULE_4__.useFileUploader)({
        nodeId: uploadingNode
    });
    const mergedProps = {
        action: `/pimcore-studio/api/assets/add-zip/${uploadingNode}`,
        accept: '.zip, .rar, .7zip',
        name: 'zipFile',
        multiple: false,
        showUploadList: false,
        fileList,
        onChange: (onChangeProps)=>{
            setUploadContext('zip', onChangeProps.fileList);
            void uploadZipProcessor(onChangeProps);
        },
        ...props
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_upload_upload__WEBPACK_IMPORTED_MODULE_2__.Upload, {
        ...mergedProps,
        onChange: (changeProps)=>{
            let promiseTmpHolder = promiseCollection[changeProps.file.uid];
            if (promiseTmpHolder === undefined) {
                let freshResolve = ()=>{};
                const freshPromise = new Promise((resolve)=>{
                    freshResolve = resolve;
                });
                promiseTmpHolder = {
                    promise: freshPromise,
                    promiseResolve: freshResolve
                };
            }
            if (mergedProps.onChange !== undefined) {
                mergedProps.onChange({
                    ...changeProps,
                    ...promiseTmpHolder
                });
            }
            setPromiseCollection({
                ...promiseCollection,
                [changeProps.file.uid]: promiseTmpHolder
            });
        },
        children: props.children
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/upload/zip-upload.tsx",
        lineNumber: 56,
        columnNumber: 5
    }, undefined);
};
_s(ZipUpload, "GCU2SOT74OSxKsAKuOgkCvBJ9ZA=", false, function() {
    return [
        _Pimcore_modules_element_upload_upload_provider__WEBPACK_IMPORTED_MODULE_3__.useUploadContext,
        _Pimcore_modules_element_upload_hook_use_file_uploader__WEBPACK_IMPORTED_MODULE_4__.useFileUploader
    ];
});
_c = ZipUpload;
var _c;
$RefreshReg$(_c, "ZipUpload");

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
"./js/src/core/components/vertical-timeline/vertical-timeline.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
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
        timeline: css`
      padding-left: ${token.paddingXS}px;
    
      & > div {
        position: relative;
        margin: 0;
        
        padding: 3px 0 7px 21px;
        
        border-left: 2px solid rgba(0,0,0,6%);
      }

      & > div:before {
        content: '';
        
        position: absolute;
        margin-top: 16px;
        margin-right: -4px;
        right: 100%;
        text-align: center;

        height: 6px;
        width: 6px;
        border-radius: 50%;
        background-color: white;
        border: 2px solid ${token.colorTextDisabled};
      }

      & > .is-active:before {
        height: 10px;
        width: 10px;
        margin-right: -6px;
        border-color: ${token.colorPrimary};
      }

      & > .is-published:before {
        border-color: ${token.colorSuccess};
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
"./js/src/core/components/vertical-timeline/vertical-timeline.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  VerticalTimeline: () => (VerticalTimeline)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _vertical_timeline_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/vertical-timeline/vertical-timeline.styles.tsx");
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


const VerticalTimeline = (param)=>{
    let { timeStamps } = param;
    _s();
    const { styles } = (0,_vertical_timeline_styles__WEBPACK_IMPORTED_MODULE_2__.useStyle)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: styles.timeline,
        children: timeStamps
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/vertical-timeline/vertical-timeline.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, undefined);
};
_s(VerticalTimeline, "4AcVho8W1Y+Yfard/v4lDs8ZRDQ=", false, function() {
    return [
        _vertical_timeline_styles__WEBPACK_IMPORTED_MODULE_2__.useStyle
    ];
});
_c = VerticalTimeline;
var _c;
$RefreshReg$(_c, "VerticalTimeline");

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
"./js/src/core/modules/element/upload/hook/use-file-uploader.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useFileUploader: () => (useFileUploader)
});
/* ESM import */var _Pimcore_modules_element_upload_upload_provider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/element/upload/upload-provider.tsx");
/* ESM import */var _Pimcore_modules_execution_engine_hooks_useJobs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/execution-engine/hooks/useJobs.ts");
/* ESM import */var _Pimcore_modules_execution_engine_jobs_zip_upload_factory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/execution-engine/jobs/zip-upload/factory.ts");
/* ESM import */var _Pimcore_modules_execution_engine_topics__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/execution-engine/topics.ts");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
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




let zipUploadFirstRun = [];
const useFileUploader = (param)=>{
    let { nodeId } = param;
    const { addJob } = (0,_Pimcore_modules_execution_engine_hooks_useJobs__WEBPACK_IMPORTED_MODULE_1__.useJobs)();
    const { uploadingNode } = (0,_Pimcore_modules_element_upload_upload_provider__WEBPACK_IMPORTED_MODULE_0__.useUploadContext)();
    const uploadZip = async (props)=>{
        if (nodeId === undefined) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_4__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_4__.GeneralError('Parent ID is required'));
        }
        if (!zipUploadFirstRun.includes(props.file.uid)) {
            zipUploadFirstRun = [
                ...zipUploadFirstRun,
                props.file.uid
            ];
            addJob((0,_Pimcore_modules_execution_engine_jobs_zip_upload_factory__WEBPACK_IMPORTED_MODULE_2__.createJob)({
                title: 'Upload Zip',
                topics: [
                    _Pimcore_modules_execution_engine_topics__WEBPACK_IMPORTED_MODULE_3__.topics["zip-upload-finished"],
                    _Pimcore_modules_execution_engine_topics__WEBPACK_IMPORTED_MODULE_3__.topics["asset-upload-finished"],
                    ..._Pimcore_modules_execution_engine_topics__WEBPACK_IMPORTED_MODULE_3__.defaultTopics
                ],
                action: async ()=>{
                    return await props.promise;
                },
                parentFolder: uploadingNode
            }));
        }
        if (props.file.response !== undefined) {
            props.promiseResolve(props.file.response.jobRunId);
        }
    };
    return {
        uploadZip
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
"./js/src/core/modules/execution-engine/jobs/zip-upload/factory.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  createJob: () => (createJob)
});
/* ESM import */var _abstact_job__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/execution-engine/jobs/abstact-job.ts");
/* ESM import */var _factory_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/execution-engine/jobs/factory-helper.ts");
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

const createJob = (job)=>{
    return {
        id: (0,_factory_helper__WEBPACK_IMPORTED_MODULE_1__.getUniqueId)(),
        action: job.action,
        type: 'zip-upload',
        title: job.title,
        status: _abstact_job__WEBPACK_IMPORTED_MODULE_0__.JobStatus.QUEUED,
        topics: job.topics,
        config: {
            parentFolder: job.parentFolder
        }
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
"./js/src/core/modules/widget-manager/widget/utils/widget-content-scroll.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  scrollToNodeElement: () => (scrollToNodeElement)
});
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _widget_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/widget-manager/widget/widget-view.tsx");
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

function scrollToNodeElement(nodeElement) {
    const scrollContainer = nodeElement.closest('.' + _widget_view__WEBPACK_IMPORTED_MODULE_1__.WIDGET_CONTENT_CLASS);
    if (!(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isNil)(scrollContainer)) {
        const containerRect = scrollContainer.getBoundingClientRect();
        const nodeRect = nodeElement.getBoundingClientRect();
        const elementOffsetTop = nodeRect.top - containerRect.top + scrollContainer.scrollTop;
        const currentScrollTop = scrollContainer.scrollTop;
        if (containerRect.height === 0) {
            return;
        }
        const scrollbarHeight = scrollContainer.offsetHeight - scrollContainer.clientHeight;
        const scrollToTop = ()=>{
            scrollContainer.scrollTo({
                top: elementOffsetTop,
                behavior: 'smooth'
            });
        };
        const scrollToBottom = ()=>{
            scrollContainer.scrollTo({
                top: elementOffsetTop - containerRect.height + nodeRect.height + scrollbarHeight,
                behavior: 'smooth'
            });
        };
        if (elementOffsetTop < currentScrollTop) {
            // Element is above the visible area
            scrollToTop();
        } else if (elementOffsetTop + nodeRect.height > currentScrollTop + containerRect.height - scrollbarHeight) {
            // Element is below the visible area
            scrollToBottom();
        }
    }
}

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
"./js/src/sdk/components/index.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Accordion: () => (/* reexport safe */ _Pimcore_components_accordion_accordion__WEBPACK_IMPORTED_MODULE_0__.Accordion),
  AccordionTimeline: () => (/* reexport safe */ _Pimcore_components_accordion_timeline_accordion_timeline__WEBPACK_IMPORTED_MODULE_2__.AccordionTimeline),
  Alert: () => (/* reexport safe */ _Pimcore_components_alert_alert__WEBPACK_IMPORTED_MODULE_3__.Alert),
  AssetTarget: () => (/* reexport safe */ _Pimcore_components_asset_target_asset_target__WEBPACK_IMPORTED_MODULE_4__.AssetTarget),
  Background: () => (/* reexport safe */ _Pimcore_components_background_background__WEBPACK_IMPORTED_MODULE_5__.Background),
  Badge: () => (/* reexport safe */ _Pimcore_components_badge_badge__WEBPACK_IMPORTED_MODULE_6__.Badge),
  Box: () => (/* reexport safe */ _Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_8__.Box),
  Breadcrumb: () => (/* reexport safe */ _Pimcore_components_breadcrumb_breadcrumb__WEBPACK_IMPORTED_MODULE_7__.Breadcrumb),
  Button: () => (/* reexport safe */ _Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_1__.Button),
  Card: () => (/* reexport safe */ _Pimcore_components_card_card__WEBPACK_IMPORTED_MODULE_9__.Card),
  Checkbox: () => (/* reexport safe */ _Pimcore_components_checkbox_checkbox__WEBPACK_IMPORTED_MODULE_10__.Checkbox),
  Collapse: () => (/* reexport safe */ _Pimcore_components_collapse_collapse__WEBPACK_IMPORTED_MODULE_11__.Collapse),
  CollapseHeader: () => (/* reexport safe */ _Pimcore_components_collapse_collapse__WEBPACK_IMPORTED_MODULE_11__.CollapseHeader),
  CollapseItem: () => (/* reexport safe */ _Pimcore_components_collapse_collapse__WEBPACK_IMPORTED_MODULE_11__.CollapseItem),
  ColorPicker: () => (/* reexport safe */ _Pimcore_components_color_picker_color_picker__WEBPACK_IMPORTED_MODULE_12__.ColorPicker),
  Compact: () => (/* reexport safe */ _Pimcore_components_compact_compact__WEBPACK_IMPORTED_MODULE_13__.Compact),
  Content: () => (/* reexport safe */ _Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_14__.Content),
  ContentLayout: () => (/* reexport safe */ _Pimcore_components_content_layout_content_layout__WEBPACK_IMPORTED_MODULE_15__.ContentLayout),
  DataObjectPreview: () => (/* reexport safe */ _Pimcore_components_data_object_preview_data_object_preview__WEBPACK_IMPORTED_MODULE_145__.DataObjectPreview),
  DatePicker: () => (/* reexport safe */ _Pimcore_components_date_picker_date_picker__WEBPACK_IMPORTED_MODULE_16__.DatePicker),
  DateRangePicker: () => (/* reexport safe */ _Pimcore_components_date_picker_date_range_picker__WEBPACK_IMPORTED_MODULE_17__.DateRangePicker),
  DeepLink: () => (/* reexport safe */ _Pimcore_components_deep_link_deep_link__WEBPACK_IMPORTED_MODULE_20__.DeepLink),
  DefaultCell: () => (/* reexport safe */ _Pimcore_components_grid_columns_default_cell__WEBPACK_IMPORTED_MODULE_60__.DefaultCell),
  Divider: () => (/* reexport safe */ _Pimcore_components_divider_divider__WEBPACK_IMPORTED_MODULE_21__.Divider),
  DndUpload: () => (/* reexport safe */ _Pimcore_components_element_tree_dnd_upload_dnd_upload__WEBPACK_IMPORTED_MODULE_37__.DndUpload),
  DragAndDropContextProvider: () => (/* reexport safe */ _Pimcore_components_drag_and_drop_context_provider__WEBPACK_IMPORTED_MODULE_25__.DragAndDropContextProvider),
  DragAndDropInfoContext: () => (/* reexport safe */ _Pimcore_components_drag_and_drop_context_provider__WEBPACK_IMPORTED_MODULE_25__.DragAndDropInfoContext),
  DragOverlay: () => (/* reexport safe */ _Pimcore_components_drag_and_drop_drag_overlay__WEBPACK_IMPORTED_MODULE_22__.DragOverlay),
  Draggable: () => (/* reexport safe */ _Pimcore_components_drag_and_drop_draggable__WEBPACK_IMPORTED_MODULE_23__.Draggable),
  Dropdown: () => (/* reexport safe */ _Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_26__.Dropdown),
  DropdownButton: () => (/* reexport safe */ _Pimcore_components_dropdown_button_dropdown_button__WEBPACK_IMPORTED_MODULE_27__.DropdownButton),
  Droppable: () => (/* reexport safe */ _Pimcore_components_drag_and_drop_droppable__WEBPACK_IMPORTED_MODULE_24__.Droppable),
  DynamicFilter: () => (/* reexport safe */ _Pimcore_components_dynamic_filter_dynamic_filter__WEBPACK_IMPORTED_MODULE_28__.DynamicFilter),
  ElementTag: () => (/* reexport safe */ _Pimcore_components_element_tag_element_tag__WEBPACK_IMPORTED_MODULE_29__.ElementTag),
  ElementToolbar: () => (/* reexport safe */ _Pimcore_components_element_toolbar_element_toolbar__WEBPACK_IMPORTED_MODULE_30__.ElementToolbar),
  ElementToolbarSkeleton: () => (/* reexport safe */ _Pimcore_components_element_toolbar_element_toolbar_skeleton__WEBPACK_IMPORTED_MODULE_31__.ElementToolbarSkeleton),
  ElementTree: () => (/* reexport safe */ _Pimcore_components_element_tree_element_tree__WEBPACK_IMPORTED_MODULE_32__.ElementTree),
  ElementTreeSkeleton: () => (/* reexport safe */ _Pimcore_components_element_tree_skeleton_skeleton__WEBPACK_IMPORTED_MODULE_43__.Skeleton),
  Empty: () => (/* reexport safe */ _Pimcore_components_empty_empty__WEBPACK_IMPORTED_MODULE_45__.Empty),
  FieldFilters: () => (/* reexport safe */ _Pimcore_components_field_filters_field_filters__WEBPACK_IMPORTED_MODULE_46__.FieldFilters),
  FileList: () => (/* reexport safe */ _Pimcore_components_modal_file_list_file_list__WEBPACK_IMPORTED_MODULE_142__.FileList),
  Filename: () => (/* reexport safe */ _Pimcore_components_filename_filename__WEBPACK_IMPORTED_MODULE_47__.Filename),
  Flex: () => (/* reexport safe */ _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_48__.Flex),
  FocalPoint: () => (/* reexport safe */ _Pimcore_components_focal_point_focal_point__WEBPACK_IMPORTED_MODULE_49__.FocalPoint),
  FocalPointProvider: () => (/* reexport safe */ _Pimcore_components_focal_point_provider_focal_point_provider__WEBPACK_IMPORTED_MODULE_50__.FocalPointProvider),
  Form: () => (/* reexport safe */ _Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_51__.Form),
  FormItemWrapper: () => (/* reexport safe */ _Pimcore_components_form_item_wrapper_form_item_wrapper__WEBPACK_IMPORTED_MODULE_144__.FormItemWrapper),
  FormattedDate: () => (/* reexport safe */ _Pimcore_components_formatted_date_formatted_date__WEBPACK_IMPORTED_MODULE_52__.FormattedDate),
  FormattedDateTime: () => (/* reexport safe */ _Pimcore_components_formatted_date_time_formatted_date_time__WEBPACK_IMPORTED_MODULE_53__.FormattedDateTime),
  FormattedTime: () => (/* reexport safe */ _Pimcore_components_formatted_time_formatted_time__WEBPACK_IMPORTED_MODULE_54__.FormattedTime),
  GeoBoundsDrawer: () => (/* reexport safe */ _Pimcore_components_geo_bounds_drawer_geo_bounds_drawer__WEBPACK_IMPORTED_MODULE_55__.GeoBoundsDrawer),
  GeoMap: () => (/* reexport safe */ _Pimcore_components_geo_map_geo_map__WEBPACK_IMPORTED_MODULE_56__.GeoMap),
  GeoPointPicker: () => (/* reexport safe */ _Pimcore_components_geo_point_picker_geo_point_picker__WEBPACK_IMPORTED_MODULE_57__.GeoPointPicker),
  GeoPolyDrawer: () => (/* reexport safe */ _Pimcore_components_geo_poly_drawer_geo_poly_drawer__WEBPACK_IMPORTED_MODULE_58__.GeoPolyDrawer),
  Grid: () => (/* reexport safe */ _Pimcore_components_grid_grid__WEBPACK_IMPORTED_MODULE_59__.Grid),
  Header: () => (/* reexport safe */ _Pimcore_components_header_header__WEBPACK_IMPORTED_MODULE_62__.Header),
  HorizontalScroll: () => (/* reexport safe */ _Pimcore_components_horizontal_scroll_horizontal_scroll__WEBPACK_IMPORTED_MODULE_63__.HorizontalScroll),
  HotspotImage: () => (/* reexport safe */ _Pimcore_components_hotspot_image_hotspot_image__WEBPACK_IMPORTED_MODULE_64__.HotspotImage),
  Icon: () => (/* reexport safe */ _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_65__.Icon),
  IconButton: () => (/* reexport safe */ _Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_66__.IconButton),
  IconTextButton: () => (/* reexport safe */ _Pimcore_components_icon_text_button_icon_text_button__WEBPACK_IMPORTED_MODULE_67__.IconTextButton),
  Image: () => (/* reexport safe */ _Pimcore_components_image_image__WEBPACK_IMPORTED_MODULE_68__.Image),
  ImagePreview: () => (/* reexport safe */ _Pimcore_components_image_preview_image_preview__WEBPACK_IMPORTED_MODULE_69__.ImagePreview),
  ImageZoom: () => (/* reexport safe */ _Pimcore_components_image_zoom_image_zoom__WEBPACK_IMPORTED_MODULE_70__.ImageZoom),
  InheritanceOverlay: () => (/* reexport safe */ _Pimcore_components_inheritance_overlay_inheritance_overlay__WEBPACK_IMPORTED_MODULE_71__.InheritanceOverlay),
  Input: () => (/* reexport safe */ _Pimcore_components_input_input__WEBPACK_IMPORTED_MODULE_72__.Input),
  InputNumber: () => (/* reexport safe */ _Pimcore_components_input_number_input_number__WEBPACK_IMPORTED_MODULE_73__.InputNumber),
  InputPassword: () => (/* reexport safe */ _Pimcore_components_input_password_input_password__WEBPACK_IMPORTED_MODULE_74__.InputPassword),
  LanguageSelection: () => (/* reexport safe */ _Pimcore_components_language_selection_language_selection__WEBPACK_IMPORTED_MODULE_75__.LanguageSelection),
  LoginForm: () => (/* reexport safe */ _Pimcore_components_login_form_login_form__WEBPACK_IMPORTED_MODULE_143__.LoginForm),
  Logo: () => (/* reexport safe */ _Pimcore_components_logo_logo__WEBPACK_IMPORTED_MODULE_76__.Logo),
  Menu: () => (/* reexport safe */ _Pimcore_components_menu_menu__WEBPACK_IMPORTED_MODULE_77__.Menu),
  Modal: () => (/* reexport safe */ _Pimcore_components_modal_modal__WEBPACK_IMPORTED_MODULE_79__.Modal),
  ModalFooter: () => (/* reexport safe */ _Pimcore_components_modal_footer_modal_footer__WEBPACK_IMPORTED_MODULE_81__.ModalFooter),
  ModalTitle: () => (/* reexport safe */ _Pimcore_components_modal_modal_title_modal_title__WEBPACK_IMPORTED_MODULE_83__.ModalTitle),
  NoContent: () => (/* reexport safe */ _Pimcore_components_no_content_no_content__WEBPACK_IMPORTED_MODULE_88__.NoContent),
  NodeApiHookContext: () => (/* reexport safe */ _Pimcore_components_element_tree_provider_node_api_hook_provider_node_api_hook_provider__WEBPACK_IMPORTED_MODULE_41__.NodeApiHookContext),
  NodeApiHookProvider: () => (/* reexport safe */ _Pimcore_components_element_tree_provider_node_api_hook_provider_node_api_hook_provider__WEBPACK_IMPORTED_MODULE_41__.NodeApiHookProvider),
  NumericRange: () => (/* reexport safe */ _Pimcore_components_numeric_range_numeric_range__WEBPACK_IMPORTED_MODULE_90__.NumericRange),
  PQLQueryInput: () => (/* reexport safe */ _Pimcore_components_pql_query_input_pql_query_input__WEBPACK_IMPORTED_MODULE_93__.PQLQueryInput),
  Pagination: () => (/* reexport safe */ _Pimcore_components_pagination_pagination__WEBPACK_IMPORTED_MODULE_91__.Pagination),
  Paragraph: () => (/* reexport safe */ _Pimcore_components_paragraph_paragraph__WEBPACK_IMPORTED_MODULE_92__.Paragraph),
  PimcoreAudio: () => (/* reexport safe */ _Pimcore_components_pimcore_audio_pimcore_audio__WEBPACK_IMPORTED_MODULE_137__.PimcoreAudio),
  PimcoreDocument: () => (/* reexport safe */ _Pimcore_components_pimcore_document_pimcore_document__WEBPACK_IMPORTED_MODULE_138__.PimcoreDocument),
  PimcoreImage: () => (/* reexport safe */ _Pimcore_components_pimcore_image_pimcore_image__WEBPACK_IMPORTED_MODULE_139__.PimcoreImage),
  PimcoreVideo: () => (/* reexport safe */ _Pimcore_components_pimcore_video_pimcore_video__WEBPACK_IMPORTED_MODULE_140__.PimcoreVideo),
  Popconfirm: () => (/* reexport safe */ _Pimcore_components_modal_popconfirm_popconfirm__WEBPACK_IMPORTED_MODULE_84__.Popconfirm),
  PreviewCard: () => (/* reexport safe */ _Pimcore_components_preview_card_preview_card__WEBPACK_IMPORTED_MODULE_94__.PreviewCard),
  Progress: () => (/* reexport safe */ _Pimcore_components_progress_progress__WEBPACK_IMPORTED_MODULE_95__.Progress),
  Progressbar: () => (/* reexport safe */ _Pimcore_components_progressbar_progressbar__WEBPACK_IMPORTED_MODULE_96__.Progressbar),
  Region: () => (/* reexport safe */ _Pimcore_components_region_region__WEBPACK_IMPORTED_MODULE_97__.Region),
  ReloadPopconfirm: () => (/* reexport safe */ _Pimcore_components_reload_popconfirm_reload_popconfirm__WEBPACK_IMPORTED_MODULE_98__.ReloadPopconfirm),
  SanitizeHtml: () => (/* reexport safe */ _Pimcore_components_sanitize_html_sanitize_html__WEBPACK_IMPORTED_MODULE_99__.SanitizeHtml),
  SearchInput: () => (/* reexport safe */ _Pimcore_components_search_input_search_input__WEBPACK_IMPORTED_MODULE_100__.SearchInput),
  Segmented: () => (/* reexport safe */ _Pimcore_components_segmented_segmented__WEBPACK_IMPORTED_MODULE_101__.Segmented),
  Select: () => (/* reexport safe */ _Pimcore_components_select_select__WEBPACK_IMPORTED_MODULE_102__.Select),
  Sidebar: () => (/* reexport safe */ _Pimcore_components_sidebar_sidebar__WEBPACK_IMPORTED_MODULE_103__.Sidebar),
  SizeTypes: () => (/* reexport safe */ _Pimcore_components_preview_card_preview_card__WEBPACK_IMPORTED_MODULE_94__.SizeTypes),
  Skeleton: () => (/* reexport safe */ _Pimcore_components_skeleton_skeleton__WEBPACK_IMPORTED_MODULE_104__.Skeleton),
  SkeletonAvatar: () => (/* reexport safe */ _Pimcore_components_skeleton_components_skeleton_avatar_skeleton_avatar__WEBPACK_IMPORTED_MODULE_105__.SkeletonAvatar),
  SkeletonButton: () => (/* reexport safe */ _Pimcore_components_skeleton_components_skeleton_button_skeleton_button__WEBPACK_IMPORTED_MODULE_106__.SkeletonButton),
  SkeletonInput: () => (/* reexport safe */ _Pimcore_components_skeleton_components_skeleton_input_skeleton_input__WEBPACK_IMPORTED_MODULE_107__.SkeletonInput),
  Slider: () => (/* reexport safe */ _Pimcore_components_slider_slider__WEBPACK_IMPORTED_MODULE_108__.Slider),
  SortButton: () => (/* reexport safe */ _Pimcore_components_sort_button_sort_button__WEBPACK_IMPORTED_MODULE_109__.SortButton),
  SortDirections: () => (/* reexport safe */ _Pimcore_components_sort_button_sort_button__WEBPACK_IMPORTED_MODULE_109__.SortDirections),
  Space: () => (/* reexport safe */ _Pimcore_components_space_space__WEBPACK_IMPORTED_MODULE_110__.Space),
  Spin: () => (/* reexport safe */ _Pimcore_components_spin_spin__WEBPACK_IMPORTED_MODULE_111__.Spin),
  Split: () => (/* reexport safe */ _Pimcore_components_split_split__WEBPACK_IMPORTED_MODULE_112__.Split),
  SplitLayout: () => (/* reexport safe */ _Pimcore_components_split_layout_split_layout__WEBPACK_IMPORTED_MODULE_113__.SplitLayout),
  SplitLayoutDivider: () => (/* reexport safe */ _Pimcore_components_split_layout_components_divider_divider__WEBPACK_IMPORTED_MODULE_114__.Divider),
  SplitLayoutItem: () => (/* reexport safe */ _Pimcore_components_split_layout_components_item_split_layout_item__WEBPACK_IMPORTED_MODULE_115__.SplitLayoutItem),
  StackList: () => (/* reexport safe */ _Pimcore_components_stack_list_stack_list__WEBPACK_IMPORTED_MODULE_116__.StackList),
  Switch: () => (/* reexport safe */ _Pimcore_components_switch_switch__WEBPACK_IMPORTED_MODULE_117__.Switch),
  Tabs: () => (/* reexport safe */ _Pimcore_components_tabs_tabs__WEBPACK_IMPORTED_MODULE_118__.Tabs),
  Tag: () => (/* reexport safe */ _Pimcore_components_tag_tag__WEBPACK_IMPORTED_MODULE_119__.Tag),
  TagList: () => (/* reexport safe */ _Pimcore_components_tag_list_tag_list__WEBPACK_IMPORTED_MODULE_120__.TagList),
  Text: () => (/* reexport safe */ _Pimcore_components_text_text__WEBPACK_IMPORTED_MODULE_121__.Text),
  TextArea: () => (/* reexport safe */ _Pimcore_components_textarea_textarea__WEBPACK_IMPORTED_MODULE_124__.TextArea),
  TextEditor: () => (/* reexport safe */ _Pimcore_components_text_editor_text_editor__WEBPACK_IMPORTED_MODULE_122__.TextEditor),
  TimePicker: () => (/* reexport safe */ _Pimcore_components_date_picker_time_picker__WEBPACK_IMPORTED_MODULE_18__.TimePicker),
  Title: () => (/* reexport safe */ _Pimcore_components_title_title__WEBPACK_IMPORTED_MODULE_125__.Title),
  ToolStrip: () => (/* reexport safe */ _Pimcore_components_toolstrip_tool_strip__WEBPACK_IMPORTED_MODULE_127__.ToolStrip),
  ToolStripBox: () => (/* reexport safe */ _Pimcore_components_toolstrip_box_tool_strip_box__WEBPACK_IMPORTED_MODULE_128__.ToolStripBox),
  Toolbar: () => (/* reexport safe */ _Pimcore_components_toolbar_toolbar__WEBPACK_IMPORTED_MODULE_126__.Toolbar),
  TreeContext: () => (/* reexport safe */ _Pimcore_components_element_tree_element_tree__WEBPACK_IMPORTED_MODULE_32__.TreeContext),
  TreeElement: () => (/* reexport safe */ _Pimcore_components_tree_element_tree_element__WEBPACK_IMPORTED_MODULE_129__.TreeElement),
  TreeExpander: () => (/* reexport safe */ _Pimcore_components_element_tree_expander_tree_expander__WEBPACK_IMPORTED_MODULE_36__.TreeExpander),
  TreeList: () => (/* reexport safe */ _Pimcore_components_element_tree_list_tree_list__WEBPACK_IMPORTED_MODULE_38__.TreeList),
  TreeNode: () => (/* reexport safe */ _Pimcore_components_element_tree_node_tree_node__WEBPACK_IMPORTED_MODULE_39__.TreeNode),
  TreeNodeContent: () => (/* reexport safe */ _Pimcore_components_element_tree_node_content_tree_node_content__WEBPACK_IMPORTED_MODULE_40__.TreeNodeContent),
  Upload: () => (/* reexport safe */ _Pimcore_components_upload_upload__WEBPACK_IMPORTED_MODULE_130__.Upload),
  UploadList: () => (/* reexport safe */ _Pimcore_components_upload_upload_list_upload_list__WEBPACK_IMPORTED_MODULE_131__.UploadList),
  UploadModal: () => (/* reexport safe */ _Pimcore_components_modal_upload_modal_components_upload_modal_upload_modal__WEBPACK_IMPORTED_MODULE_86__.UploadModal),
  UploadModalButton: () => (/* reexport safe */ _Pimcore_components_modal_upload_modal_upload_modal_button__WEBPACK_IMPORTED_MODULE_85__.UploadModalButton),
  UploadProgress: () => (/* reexport safe */ _Pimcore_components_upload_upload_progress_upload_progress__WEBPACK_IMPORTED_MODULE_132__.UploadProgress),
  UsersRolesDropdown: () => (/* reexport safe */ _Pimcore_components_users_roles_dropdown_users_roles_dropdown__WEBPACK_IMPORTED_MODULE_134__.UsersRolesDropdown),
  VerticalTimeline: () => (/* reexport safe */ _Pimcore_components_vertical_timeline_vertical_timeline__WEBPACK_IMPORTED_MODULE_135__.VerticalTimeline),
  WindowModal: () => (/* reexport safe */ _Pimcore_components_modal_window_modal_window_modal__WEBPACK_IMPORTED_MODULE_87__.WindowModal),
  WorkflowCard: () => (/* reexport safe */ _Pimcore_components_workflow_card_workflow_card__WEBPACK_IMPORTED_MODULE_136__.WorkflowCard),
  ZipUpload: () => (/* reexport safe */ _Pimcore_components_upload_zip_upload__WEBPACK_IMPORTED_MODULE_133__.ZipUpload),
  addColumnConfig: () => (/* reexport safe */ _Pimcore_components_grid_columns_helpers__WEBPACK_IMPORTED_MODULE_61__.addColumnConfig),
  createImageThumbnailUrl: () => (/* reexport safe */ _Pimcore_components_image_preview_image_preview__WEBPACK_IMPORTED_MODULE_69__.createImageThumbnailUrl),
  defaultProps: () => (/* reexport safe */ _Pimcore_components_element_tree_element_tree__WEBPACK_IMPORTED_MODULE_32__.defaultProps),
  defaultStyleOptions: () => (/* reexport safe */ _Pimcore_components_hotspot_image_hotspot_image__WEBPACK_IMPORTED_MODULE_64__.defaultStyleOptions),
  detectLanguageFromFilename: () => (/* reexport safe */ _Pimcore_components_text_editor_detect_language__WEBPACK_IMPORTED_MODULE_123__.detectLanguageFromFilename),
  formatDatePickerDate: () => (/* reexport safe */ _Pimcore_components_date_picker_utils_date_picker_utils__WEBPACK_IMPORTED_MODULE_19__.formatDatePickerDate),
  fromDayJs: () => (/* reexport safe */ _Pimcore_components_date_picker_utils_date_picker_utils__WEBPACK_IMPORTED_MODULE_19__.fromDayJs),
  getLanguageExtensions: () => (/* reexport safe */ _Pimcore_components_text_editor_detect_language__WEBPACK_IMPORTED_MODULE_123__.getLanguageExtensions),
  getSizingClasses: () => (/* reexport safe */ _Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_8__.getSizingClasses),
  sizeOptions: () => (/* reexport safe */ _Pimcore_components_select_select__WEBPACK_IMPORTED_MODULE_102__.sizeOptions),
  test: () => (test),
  toDayJs: () => (/* reexport safe */ _Pimcore_components_date_picker_utils_date_picker_utils__WEBPACK_IMPORTED_MODULE_19__.toDayJs),
  transformLanguage: () => (/* reexport safe */ _Pimcore_components_language_selection_language_selection__WEBPACK_IMPORTED_MODULE_75__.transformLanguage),
  treeNodeDefaultProps: () => (/* reexport safe */ _Pimcore_components_element_tree_node_tree_node__WEBPACK_IMPORTED_MODULE_39__.defaultProps),
  useAlertModal: () => (/* reexport safe */ _Pimcore_components_modal_alert_modal_hooks_use_alert_modal__WEBPACK_IMPORTED_MODULE_80__.useAlertModal),
  useBreadcrumbSize: () => (/* reexport safe */ _Pimcore_components_breadcrumb_breadcrumb__WEBPACK_IMPORTED_MODULE_7__.useBreadcrumbSize),
  useEditMode: () => (/* reexport safe */ _Pimcore_components_grid_grid__WEBPACK_IMPORTED_MODULE_59__.useEditMode),
  useElementTree: () => (/* reexport safe */ _Pimcore_components_element_tree_hooks_use_element_tree__WEBPACK_IMPORTED_MODULE_33__.useElementTree),
  useElementTreeNode: () => (/* reexport safe */ _Pimcore_components_element_tree_hooks_use_element_tree_node__WEBPACK_IMPORTED_MODULE_34__.useElementTreeNode),
  useElementTreeRootNode: () => (/* reexport safe */ _Pimcore_components_element_tree_hooks_use_element_tree_root_node__WEBPACK_IMPORTED_MODULE_35__.useElementTreeRootNode),
  useFormModal: () => (/* reexport safe */ _Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_82__.useFormModal),
  useMessage: () => (/* reexport safe */ _Pimcore_components_message_useMessage__WEBPACK_IMPORTED_MODULE_78__.useMessage),
  useModal: () => (/* reexport safe */ _Pimcore_components_modal_useModal_index__WEBPACK_IMPORTED_MODULE_141__.useModal),
  useNodeApiHook: () => (/* reexport safe */ _Pimcore_components_element_tree_provider_node_api_hook_provider_use_node_api_hook__WEBPACK_IMPORTED_MODULE_42__.useNodeApiHook),
  useNotification: () => (/* reexport safe */ _Pimcore_components_notification_useNotification__WEBPACK_IMPORTED_MODULE_89__.useNotification),
  validateOneFieldEmpty: () => (/* reexport safe */ _Pimcore_components_numeric_range_numeric_range__WEBPACK_IMPORTED_MODULE_90__.validateOneFieldEmpty),
  validateSecondValueGreater: () => (/* reexport safe */ _Pimcore_components_numeric_range_numeric_range__WEBPACK_IMPORTED_MODULE_90__.validateSecondValueGreater),
  withConfirm: () => (/* reexport safe */ _Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_82__.withConfirm),
  withError: () => (/* reexport safe */ _Pimcore_components_modal_useModal_index__WEBPACK_IMPORTED_MODULE_141__.withError),
  withInfo: () => (/* reexport safe */ _Pimcore_components_modal_useModal_index__WEBPACK_IMPORTED_MODULE_141__.withInfo),
  withInput: () => (/* reexport safe */ _Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_82__.withInput),
  withSuccess: () => (/* reexport safe */ _Pimcore_components_modal_useModal_index__WEBPACK_IMPORTED_MODULE_141__.withSuccess),
  withTextarea: () => (/* reexport safe */ _Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_82__.withTextarea),
  withUpload: () => (/* reexport safe */ _Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_82__.withUpload),
  withWarn: () => (/* reexport safe */ _Pimcore_components_modal_useModal_index__WEBPACK_IMPORTED_MODULE_141__.withWarn)
});
/* ESM import */var _Pimcore_components_accordion_accordion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/components/accordion/accordion.tsx");
/* ESM import */var _Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/button/button.tsx");
/* ESM import */var _Pimcore_components_accordion_timeline_accordion_timeline__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/accordion-timeline/accordion-timeline.tsx");
/* ESM import */var _Pimcore_components_alert_alert__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/alert/alert.tsx");
/* ESM import */var _Pimcore_components_asset_target_asset_target__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/asset-target/asset-target.tsx");
/* ESM import */var _Pimcore_components_background_background__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/background/background.tsx");
/* ESM import */var _Pimcore_components_badge_badge__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/badge/badge.tsx");
/* ESM import */var _Pimcore_components_breadcrumb_breadcrumb__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/breadcrumb/breadcrumb.tsx");
/* ESM import */var _Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/box/box.tsx");
/* ESM import */var _Pimcore_components_card_card__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/components/card/card.tsx");
/* ESM import */var _Pimcore_components_checkbox_checkbox__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/components/checkbox/checkbox.tsx");
/* ESM import */var _Pimcore_components_collapse_collapse__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/components/collapse/collapse.tsx");
/* ESM import */var _Pimcore_components_color_picker_color_picker__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/components/color-picker/color-picker.tsx");
/* ESM import */var _Pimcore_components_compact_compact__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/components/compact/compact.tsx");
/* ESM import */var _Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/components/content/content.tsx");
/* ESM import */var _Pimcore_components_content_layout_content_layout__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./js/src/core/components/content-layout/content-layout.tsx");
/* ESM import */var _Pimcore_components_date_picker_date_picker__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("./js/src/core/components/date-picker/date-picker.tsx");
/* ESM import */var _Pimcore_components_date_picker_date_range_picker__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("./js/src/core/components/date-picker/date-range-picker.tsx");
/* ESM import */var _Pimcore_components_date_picker_time_picker__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("./js/src/core/components/date-picker/time-picker.tsx");
/* ESM import */var _Pimcore_components_date_picker_utils_date_picker_utils__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__("./js/src/core/components/date-picker/utils/date-picker-utils.ts");
/* ESM import */var _Pimcore_components_deep_link_deep_link__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__("./js/src/core/components/deep-link/deep-link.tsx");
/* ESM import */var _Pimcore_components_divider_divider__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__("./js/src/core/components/divider/divider.tsx");
/* ESM import */var _Pimcore_components_drag_and_drop_drag_overlay__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__("./js/src/core/components/drag-and-drop/drag-overlay.tsx");
/* ESM import */var _Pimcore_components_drag_and_drop_draggable__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__("./js/src/core/components/drag-and-drop/draggable.tsx");
/* ESM import */var _Pimcore_components_drag_and_drop_droppable__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__("./js/src/core/components/drag-and-drop/droppable.tsx");
/* ESM import */var _Pimcore_components_drag_and_drop_context_provider__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__("./js/src/core/components/drag-and-drop/context-provider.tsx");
/* ESM import */var _Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__("./js/src/core/components/dropdown/dropdown.tsx");
/* ESM import */var _Pimcore_components_dropdown_button_dropdown_button__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__("./js/src/core/components/dropdown-button/dropdown-button.tsx");
/* ESM import */var _Pimcore_components_dynamic_filter_dynamic_filter__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__("./js/src/core/components/dynamic-filter/dynamic-filter.tsx");
/* ESM import */var _Pimcore_components_element_tag_element_tag__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__("./js/src/core/components/element-tag/element-tag.tsx");
/* ESM import */var _Pimcore_components_element_toolbar_element_toolbar__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__("./js/src/core/components/element-toolbar/element-toolbar.tsx");
/* ESM import */var _Pimcore_components_element_toolbar_element_toolbar_skeleton__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__("./js/src/core/components/element-toolbar/element-toolbar.skeleton.tsx");
/* ESM import */var _Pimcore_components_element_tree_element_tree__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__("./js/src/core/components/element-tree/element-tree.tsx");
/* ESM import */var _Pimcore_components_element_tree_hooks_use_element_tree__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__("./js/src/core/components/element-tree/hooks/use-element-tree.ts");
/* ESM import */var _Pimcore_components_element_tree_hooks_use_element_tree_node__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__("./js/src/core/components/element-tree/hooks/use-element-tree-node.ts");
/* ESM import */var _Pimcore_components_element_tree_hooks_use_element_tree_root_node__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__("./js/src/core/components/element-tree/hooks/use-element-tree-root-node.ts");
/* ESM import */var _Pimcore_components_element_tree_expander_tree_expander__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__("./js/src/core/components/element-tree/expander/tree-expander.tsx");
/* ESM import */var _Pimcore_components_element_tree_dnd_upload_dnd_upload__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__("./js/src/core/components/element-tree/dnd-upload/dnd-upload.tsx");
/* ESM import */var _Pimcore_components_element_tree_list_tree_list__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__("./js/src/core/components/element-tree/list/tree-list.tsx");
/* ESM import */var _Pimcore_components_element_tree_node_tree_node__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__("./js/src/core/components/element-tree/node/tree-node.tsx");
/* ESM import */var _Pimcore_components_element_tree_node_content_tree_node_content__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__("./js/src/core/components/element-tree/node/content/tree-node-content.tsx");
/* ESM import */var _Pimcore_components_element_tree_provider_node_api_hook_provider_node_api_hook_provider__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__("./js/src/core/components/element-tree/provider/node-api-hook-provider/node-api-hook-provider.tsx");
/* ESM import */var _Pimcore_components_element_tree_provider_node_api_hook_provider_use_node_api_hook__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__("./js/src/core/components/element-tree/provider/node-api-hook-provider/use-node-api-hook.ts");
/* ESM import */var _Pimcore_components_element_tree_skeleton_skeleton__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__("./js/src/core/components/element-tree/skeleton/skeleton.tsx");
/* ESM import */var _Pimcore_components_element_tree_types_node_api_hook__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__("./js/src/core/components/element-tree/types/node-api-hook.ts");
/* ESM import */var _Pimcore_components_empty_empty__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__("./js/src/core/components/empty/empty.tsx");
/* ESM import */var _Pimcore_components_field_filters_field_filters__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__("./js/src/core/components/field-filters/field-filters.tsx");
/* ESM import */var _Pimcore_components_filename_filename__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__("./js/src/core/components/filename/filename.tsx");
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var _Pimcore_components_focal_point_focal_point__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__("./js/src/core/components/focal-point/focal-point.tsx");
/* ESM import */var _Pimcore_components_focal_point_provider_focal_point_provider__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__("./js/src/core/components/focal-point/provider/focal-point-provider.tsx");
/* ESM import */var _Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__("./js/src/core/components/form/form.tsx");
/* ESM import */var _Pimcore_components_formatted_date_formatted_date__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__("./js/src/core/components/formatted-date/formatted-date.tsx");
/* ESM import */var _Pimcore_components_formatted_date_time_formatted_date_time__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__("./js/src/core/components/formatted-date-time/formatted-date-time.tsx");
/* ESM import */var _Pimcore_components_formatted_time_formatted_time__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__("./js/src/core/components/formatted-time/formatted-time.tsx");
/* ESM import */var _Pimcore_components_geo_bounds_drawer_geo_bounds_drawer__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__("./js/src/core/components/geo-bounds-drawer/geo-bounds-drawer.tsx");
/* ESM import */var _Pimcore_components_geo_map_geo_map__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__("./js/src/core/components/geo-map/geo-map.tsx");
/* ESM import */var _Pimcore_components_geo_point_picker_geo_point_picker__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__("./js/src/core/components/geo-point-picker/geo-point-picker.tsx");
/* ESM import */var _Pimcore_components_geo_poly_drawer_geo_poly_drawer__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__("./js/src/core/components/geo-poly-drawer/geo-poly-drawer.tsx");
/* ESM import */var _Pimcore_components_grid_grid__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__("./js/src/core/components/grid/grid.tsx");
/* ESM import */var _Pimcore_components_grid_columns_default_cell__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__("./js/src/core/components/grid/columns/default-cell.tsx");
/* ESM import */var _Pimcore_components_grid_columns_helpers__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__("./js/src/core/components/grid/columns/helpers.ts");
/* ESM import */var _Pimcore_components_header_header__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__("./js/src/core/components/header/header.tsx");
/* ESM import */var _Pimcore_components_horizontal_scroll_horizontal_scroll__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__("./js/src/core/components/horizontal-scroll/horizontal-scroll.tsx");
/* ESM import */var _Pimcore_components_hotspot_image_hotspot_image__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__("./js/src/core/components/hotspot-image/hotspot-image.tsx");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__("./js/src/core/components/icon-button/icon-button.tsx");
/* ESM import */var _Pimcore_components_icon_text_button_icon_text_button__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__("./js/src/core/components/icon-text-button/icon-text-button.tsx");
/* ESM import */var _Pimcore_components_image_image__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__("./js/src/core/components/image/image.tsx");
/* ESM import */var _Pimcore_components_image_preview_image_preview__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__("./js/src/core/components/image-preview/image-preview.tsx");
/* ESM import */var _Pimcore_components_image_zoom_image_zoom__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__("./js/src/core/components/image-zoom/image-zoom.tsx");
/* ESM import */var _Pimcore_components_inheritance_overlay_inheritance_overlay__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__("./js/src/core/components/inheritance-overlay/inheritance-overlay.tsx");
/* ESM import */var _Pimcore_components_input_input__WEBPACK_IMPORTED_MODULE_72__ = __webpack_require__("./js/src/core/components/input/input.tsx");
/* ESM import */var _Pimcore_components_input_number_input_number__WEBPACK_IMPORTED_MODULE_73__ = __webpack_require__("./js/src/core/components/input-number/input-number.tsx");
/* ESM import */var _Pimcore_components_input_password_input_password__WEBPACK_IMPORTED_MODULE_74__ = __webpack_require__("./js/src/core/components/input-password/input-password.tsx");
/* ESM import */var _Pimcore_components_language_selection_language_selection__WEBPACK_IMPORTED_MODULE_75__ = __webpack_require__("./js/src/core/components/language-selection/language-selection.tsx");
/* ESM import */var _Pimcore_components_logo_logo__WEBPACK_IMPORTED_MODULE_76__ = __webpack_require__("./js/src/core/components/logo/logo.tsx");
/* ESM import */var _Pimcore_components_menu_menu__WEBPACK_IMPORTED_MODULE_77__ = __webpack_require__("./js/src/core/components/menu/menu.tsx");
/* ESM import */var _Pimcore_components_message_useMessage__WEBPACK_IMPORTED_MODULE_78__ = __webpack_require__("./js/src/core/components/message/useMessage/index.tsx");
/* ESM import */var _Pimcore_components_modal_modal__WEBPACK_IMPORTED_MODULE_79__ = __webpack_require__("./js/src/core/components/modal/modal.tsx");
/* ESM import */var _Pimcore_components_modal_alert_modal_hooks_use_alert_modal__WEBPACK_IMPORTED_MODULE_80__ = __webpack_require__("./js/src/core/components/modal/alert-modal/hooks/use-alert-modal.tsx");
/* ESM import */var _Pimcore_components_modal_footer_modal_footer__WEBPACK_IMPORTED_MODULE_81__ = __webpack_require__("./js/src/core/components/modal/footer/modal-footer.tsx");
/* ESM import */var _Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_82__ = __webpack_require__("./js/src/core/components/modal/form-modal/hooks/use-form-modal.tsx");
/* ESM import */var _Pimcore_components_modal_modal_title_modal_title__WEBPACK_IMPORTED_MODULE_83__ = __webpack_require__("./js/src/core/components/modal/modal-title/modal-title.tsx");
/* ESM import */var _Pimcore_components_modal_popconfirm_popconfirm__WEBPACK_IMPORTED_MODULE_84__ = __webpack_require__("./js/src/core/components/modal/popconfirm/popconfirm.tsx");
/* ESM import */var _Pimcore_components_modal_upload_modal_upload_modal_button__WEBPACK_IMPORTED_MODULE_85__ = __webpack_require__("./js/src/core/components/modal/upload-modal/upload-modal-button.tsx");
/* ESM import */var _Pimcore_components_modal_upload_modal_components_upload_modal_upload_modal__WEBPACK_IMPORTED_MODULE_86__ = __webpack_require__("./js/src/core/components/modal/upload-modal/components/upload-modal/upload-modal.tsx");
/* ESM import */var _Pimcore_components_modal_window_modal_window_modal__WEBPACK_IMPORTED_MODULE_87__ = __webpack_require__("./js/src/core/components/modal/window-modal/window-modal.tsx");
/* ESM import */var _Pimcore_components_no_content_no_content__WEBPACK_IMPORTED_MODULE_88__ = __webpack_require__("./js/src/core/components/no-content/no-content.tsx");
/* ESM import */var _Pimcore_components_notification_useNotification__WEBPACK_IMPORTED_MODULE_89__ = __webpack_require__("./js/src/core/components/notification/useNotification/index.tsx");
/* ESM import */var _Pimcore_components_numeric_range_numeric_range__WEBPACK_IMPORTED_MODULE_90__ = __webpack_require__("./js/src/core/components/numeric-range/numeric-range.tsx");
/* ESM import */var _Pimcore_components_pagination_pagination__WEBPACK_IMPORTED_MODULE_91__ = __webpack_require__("./js/src/core/components/pagination/pagination.tsx");
/* ESM import */var _Pimcore_components_paragraph_paragraph__WEBPACK_IMPORTED_MODULE_92__ = __webpack_require__("./js/src/core/components/paragraph/paragraph.tsx");
/* ESM import */var _Pimcore_components_pql_query_input_pql_query_input__WEBPACK_IMPORTED_MODULE_93__ = __webpack_require__("./js/src/core/components/pql-query-input/pql-query-input.tsx");
/* ESM import */var _Pimcore_components_preview_card_preview_card__WEBPACK_IMPORTED_MODULE_94__ = __webpack_require__("./js/src/core/components/preview-card/preview-card.tsx");
/* ESM import */var _Pimcore_components_progress_progress__WEBPACK_IMPORTED_MODULE_95__ = __webpack_require__("./js/src/core/components/progress/progress.tsx");
/* ESM import */var _Pimcore_components_progressbar_progressbar__WEBPACK_IMPORTED_MODULE_96__ = __webpack_require__("./js/src/core/components/progressbar/progressbar.tsx");
/* ESM import */var _Pimcore_components_region_region__WEBPACK_IMPORTED_MODULE_97__ = __webpack_require__("./js/src/core/components/region/region.tsx");
/* ESM import */var _Pimcore_components_reload_popconfirm_reload_popconfirm__WEBPACK_IMPORTED_MODULE_98__ = __webpack_require__("./js/src/core/components/reload-popconfirm/reload-popconfirm.tsx");
/* ESM import */var _Pimcore_components_sanitize_html_sanitize_html__WEBPACK_IMPORTED_MODULE_99__ = __webpack_require__("./js/src/core/components/sanitize-html/sanitize-html.tsx");
/* ESM import */var _Pimcore_components_search_input_search_input__WEBPACK_IMPORTED_MODULE_100__ = __webpack_require__("./js/src/core/components/search-input/search-input.tsx");
/* ESM import */var _Pimcore_components_segmented_segmented__WEBPACK_IMPORTED_MODULE_101__ = __webpack_require__("./js/src/core/components/segmented/segmented.tsx");
/* ESM import */var _Pimcore_components_select_select__WEBPACK_IMPORTED_MODULE_102__ = __webpack_require__("./js/src/core/components/select/select.tsx");
/* ESM import */var _Pimcore_components_sidebar_sidebar__WEBPACK_IMPORTED_MODULE_103__ = __webpack_require__("./js/src/core/components/sidebar/sidebar.tsx");
/* ESM import */var _Pimcore_components_skeleton_skeleton__WEBPACK_IMPORTED_MODULE_104__ = __webpack_require__("./js/src/core/components/skeleton/skeleton.tsx");
/* ESM import */var _Pimcore_components_skeleton_components_skeleton_avatar_skeleton_avatar__WEBPACK_IMPORTED_MODULE_105__ = __webpack_require__("./js/src/core/components/skeleton/components/skeleton-avatar/skeleton-avatar.tsx");
/* ESM import */var _Pimcore_components_skeleton_components_skeleton_button_skeleton_button__WEBPACK_IMPORTED_MODULE_106__ = __webpack_require__("./js/src/core/components/skeleton/components/skeleton-button/skeleton-button.tsx");
/* ESM import */var _Pimcore_components_skeleton_components_skeleton_input_skeleton_input__WEBPACK_IMPORTED_MODULE_107__ = __webpack_require__("./js/src/core/components/skeleton/components/skeleton-input/skeleton-input.tsx");
/* ESM import */var _Pimcore_components_slider_slider__WEBPACK_IMPORTED_MODULE_108__ = __webpack_require__("./js/src/core/components/slider/slider.tsx");
/* ESM import */var _Pimcore_components_sort_button_sort_button__WEBPACK_IMPORTED_MODULE_109__ = __webpack_require__("./js/src/core/components/sort-button/sort-button.tsx");
/* ESM import */var _Pimcore_components_space_space__WEBPACK_IMPORTED_MODULE_110__ = __webpack_require__("./js/src/core/components/space/space.tsx");
/* ESM import */var _Pimcore_components_spin_spin__WEBPACK_IMPORTED_MODULE_111__ = __webpack_require__("./js/src/core/components/spin/spin.tsx");
/* ESM import */var _Pimcore_components_split_split__WEBPACK_IMPORTED_MODULE_112__ = __webpack_require__("./js/src/core/components/split/split.tsx");
/* ESM import */var _Pimcore_components_split_layout_split_layout__WEBPACK_IMPORTED_MODULE_113__ = __webpack_require__("./js/src/core/components/split-layout/split-layout.tsx");
/* ESM import */var _Pimcore_components_split_layout_components_divider_divider__WEBPACK_IMPORTED_MODULE_114__ = __webpack_require__("./js/src/core/components/split-layout/components/divider/divider.tsx");
/* ESM import */var _Pimcore_components_split_layout_components_item_split_layout_item__WEBPACK_IMPORTED_MODULE_115__ = __webpack_require__("./js/src/core/components/split-layout/components/item/split-layout-item.tsx");
/* ESM import */var _Pimcore_components_stack_list_stack_list__WEBPACK_IMPORTED_MODULE_116__ = __webpack_require__("./js/src/core/components/stack-list/stack-list.tsx");
/* ESM import */var _Pimcore_components_switch_switch__WEBPACK_IMPORTED_MODULE_117__ = __webpack_require__("./js/src/core/components/switch/switch.tsx");
/* ESM import */var _Pimcore_components_tabs_tabs__WEBPACK_IMPORTED_MODULE_118__ = __webpack_require__("./js/src/core/components/tabs/tabs.tsx");
/* ESM import */var _Pimcore_components_tag_tag__WEBPACK_IMPORTED_MODULE_119__ = __webpack_require__("./js/src/core/components/tag/tag.tsx");
/* ESM import */var _Pimcore_components_tag_list_tag_list__WEBPACK_IMPORTED_MODULE_120__ = __webpack_require__("./js/src/core/components/tag-list/tag-list.tsx");
/* ESM import */var _Pimcore_components_text_text__WEBPACK_IMPORTED_MODULE_121__ = __webpack_require__("./js/src/core/components/text/text.tsx");
/* ESM import */var _Pimcore_components_text_editor_text_editor__WEBPACK_IMPORTED_MODULE_122__ = __webpack_require__("./js/src/core/components/text-editor/text-editor.tsx");
/* ESM import */var _Pimcore_components_text_editor_detect_language__WEBPACK_IMPORTED_MODULE_123__ = __webpack_require__("./js/src/core/components/text-editor/detect-language.tsx");
/* ESM import */var _Pimcore_components_textarea_textarea__WEBPACK_IMPORTED_MODULE_124__ = __webpack_require__("./js/src/core/components/textarea/textarea.tsx");
/* ESM import */var _Pimcore_components_title_title__WEBPACK_IMPORTED_MODULE_125__ = __webpack_require__("./js/src/core/components/title/title.tsx");
/* ESM import */var _Pimcore_components_toolbar_toolbar__WEBPACK_IMPORTED_MODULE_126__ = __webpack_require__("./js/src/core/components/toolbar/toolbar.tsx");
/* ESM import */var _Pimcore_components_toolstrip_tool_strip__WEBPACK_IMPORTED_MODULE_127__ = __webpack_require__("./js/src/core/components/toolstrip/tool-strip.tsx");
/* ESM import */var _Pimcore_components_toolstrip_box_tool_strip_box__WEBPACK_IMPORTED_MODULE_128__ = __webpack_require__("./js/src/core/components/toolstrip/box/tool-strip-box.tsx");
/* ESM import */var _Pimcore_components_tree_element_tree_element__WEBPACK_IMPORTED_MODULE_129__ = __webpack_require__("./js/src/core/components/tree-element/tree-element.tsx");
/* ESM import */var _Pimcore_components_upload_upload__WEBPACK_IMPORTED_MODULE_130__ = __webpack_require__("./js/src/core/components/upload/upload.tsx");
/* ESM import */var _Pimcore_components_upload_upload_list_upload_list__WEBPACK_IMPORTED_MODULE_131__ = __webpack_require__("./js/src/core/components/upload/upload-list/upload-list.tsx");
/* ESM import */var _Pimcore_components_upload_upload_progress_upload_progress__WEBPACK_IMPORTED_MODULE_132__ = __webpack_require__("./js/src/core/components/upload/upload-progress/upload-progress.tsx");
/* ESM import */var _Pimcore_components_upload_zip_upload__WEBPACK_IMPORTED_MODULE_133__ = __webpack_require__("./js/src/core/components/upload/zip-upload.tsx");
/* ESM import */var _Pimcore_components_users_roles_dropdown_users_roles_dropdown__WEBPACK_IMPORTED_MODULE_134__ = __webpack_require__("./js/src/core/components/users-roles-dropdown/users-roles-dropdown.tsx");
/* ESM import */var _Pimcore_components_vertical_timeline_vertical_timeline__WEBPACK_IMPORTED_MODULE_135__ = __webpack_require__("./js/src/core/components/vertical-timeline/vertical-timeline.tsx");
/* ESM import */var _Pimcore_components_workflow_card_workflow_card__WEBPACK_IMPORTED_MODULE_136__ = __webpack_require__("./js/src/core/components/workflow-card/workflow-card.tsx");
/* ESM import */var _Pimcore_components_pimcore_audio_pimcore_audio__WEBPACK_IMPORTED_MODULE_137__ = __webpack_require__("./js/src/core/components/pimcore-audio/pimcore-audio.tsx");
/* ESM import */var _Pimcore_components_pimcore_document_pimcore_document__WEBPACK_IMPORTED_MODULE_138__ = __webpack_require__("./js/src/core/components/pimcore-document/pimcore-document.tsx");
/* ESM import */var _Pimcore_components_pimcore_image_pimcore_image__WEBPACK_IMPORTED_MODULE_139__ = __webpack_require__("./js/src/core/components/pimcore-image/pimcore-image.tsx");
/* ESM import */var _Pimcore_components_pimcore_video_pimcore_video__WEBPACK_IMPORTED_MODULE_140__ = __webpack_require__("./js/src/core/components/pimcore-video/pimcore-video.tsx");
/* ESM import */var _Pimcore_components_modal_useModal_index__WEBPACK_IMPORTED_MODULE_141__ = __webpack_require__("./js/src/core/components/modal/useModal/index.tsx");
/* ESM import */var _Pimcore_components_modal_file_list_file_list__WEBPACK_IMPORTED_MODULE_142__ = __webpack_require__("./js/src/core/components/modal/file-list/file-list.tsx");
/* ESM import */var _Pimcore_components_login_form_login_form__WEBPACK_IMPORTED_MODULE_143__ = __webpack_require__("./js/src/core/components/login-form/login-form.tsx");
/* ESM import */var _Pimcore_components_form_item_wrapper_form_item_wrapper__WEBPACK_IMPORTED_MODULE_144__ = __webpack_require__("./js/src/core/components/form-item-wrapper/form-item-wrapper.tsx");
/* ESM import */var _Pimcore_components_data_object_preview_data_object_preview__WEBPACK_IMPORTED_MODULE_145__ = __webpack_require__("./js/src/core/components/data-object-preview/data-object-preview.tsx");
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
*/ const test = 'test3';

































// @todo check usage and naming of nodeState







































































































// @todo check if this component should really be branded to workflows or if we can find a mor re-usable name

// @todo what is the difference betweens this one and the one exported from the modal component?
// export * from '@Pimcore/components/upload/upload-modal/upload-modal'
// @todo to we really need the pimcore branding in those components?




// @todo useModal folder is not following the naming convention for folders

// @todo is this component still needed?

// @todo check if this should really located under the components folder

// @todo Is this still needed since we have a completed adapted form with it's own form.item

// @todo move those to another folder or make it a more generic iframe component


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
//# sourceMappingURL=__federation_expose_components.js.map