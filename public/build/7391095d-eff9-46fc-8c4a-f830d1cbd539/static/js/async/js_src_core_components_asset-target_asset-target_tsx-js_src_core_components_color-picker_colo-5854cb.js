"use strict";
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["js_src_core_components_asset-target_asset-target_tsx-js_src_core_components_color-picker_colo-5854cb"], {
"./js/src/core/components/asset-target/asset-target.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
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
        assetTargetContainer: css`
      border-radius: ${token.borderRadiusLG}px;
      outline: 1px dashed ${token.colorBorder};
      background: ${token.controlItemBgHover};
      padding: ${token.paddingSM}px;
      max-width: 100%;
      position: relative;
      
      .image-target-title {
          text-align: center;
      }
      
      .icon-container {
        color: ${token.colorIcon};
      }
    `,
        closeButton: css`
      position: absolute;
      top: ${token.paddingXXS}px;
      right: ${token.paddingXXS}px;
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
"./js/src/core/components/asset-target/asset-target.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  AssetTarget: () => (AssetTarget)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var _asset_target_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/asset-target/asset-target.styles.tsx");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/classnames/index.js");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var _Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/utils/css.tsx");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _Pimcore_components_drag_and_drop_hooks_use_droppable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/drag-and-drop/hooks/use-droppable.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _image_preview_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/components/image-preview/components/dropdown/dropdown.tsx");
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









const AssetTarget = /*#__PURE__*/ _s((0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(_c = _s(function AssetTarget(param, ref) {
    let { title, className, width = 200, height = 200, dndIcon, uploadIcon, onRemove, onSearch } = param;
    _s();
    const { getStateClasses } = (0,_Pimcore_components_drag_and_drop_hooks_use_droppable__WEBPACK_IMPORTED_MODULE_7__.useDroppable)();
    const { styles } = (0,_asset_target_styles__WEBPACK_IMPORTED_MODULE_3__.useStyle)();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_8__.useTranslation)();
    const dropdownItems = [];
    if (onRemove !== undefined) {
        dropdownItems.push({
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_6__.Icon, {
                value: "trash"
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/asset-target/asset-target.tsx",
                lineNumber: 45,
                columnNumber: 13
            }, this),
            key: 'remove',
            label: t('remove'),
            onClick: onRemove
        });
    }
    if (onSearch !== undefined) {
        dropdownItems.push({
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_6__.Icon, {
                value: "search"
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/asset-target/asset-target.tsx",
                lineNumber: 54,
                columnNumber: 13
            }, this),
            key: 'search',
            label: t('search'),
            onClick: onSearch
        });
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_4___default()(className, styles.assetTargetContainer, ...getStateClasses()),
        ref: ref,
        style: {
            height: (0,_Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_5__.toCssDimension)(height),
            width: (0,_Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_5__.toCssDimension)(width)
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_2__.Flex, {
                align: "center",
                gap: "mini",
                justify: "center",
                style: {
                    height: '100%'
                },
                vertical: true,
                children: [
                    (dndIcon === true || uploadIcon === true) && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                        className: "icon-container",
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_2__.Flex, {
                            align: "center",
                            gap: "mini",
                            justify: "center",
                            children: [
                                dndIcon === true && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_6__.Icon, {
                                    options: {
                                        height: 30,
                                        width: 30
                                    },
                                    value: 'drop-target'
                                }, void 0, false, {
                                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/asset-target/asset-target.tsx",
                                    lineNumber: 85,
                                    columnNumber: 15
                                }, this),
                                uploadIcon === true && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_6__.Icon, {
                                    options: {
                                        height: 30,
                                        width: 30
                                    },
                                    value: 'upload-cloud'
                                }, void 0, false, {
                                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/asset-target/asset-target.tsx",
                                    lineNumber: 91,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/asset-target/asset-target.tsx",
                            lineNumber: 79,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/asset-target/asset-target.tsx",
                        lineNumber: 78,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                        className: "image-target-title",
                        children: title
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/asset-target/asset-target.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/asset-target/asset-target.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_image_preview_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_9__.ImagePreviewDropdown, {
                dropdownItems: dropdownItems
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/asset-target/asset-target.tsx",
                lineNumber: 102,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/asset-target/asset-target.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, this);
}, "fgunhaalDSs8N+2m1HtAJo+BJC8=", false, function() {
    return [
        _Pimcore_components_drag_and_drop_hooks_use_droppable__WEBPACK_IMPORTED_MODULE_7__.useDroppable,
        _asset_target_styles__WEBPACK_IMPORTED_MODULE_3__.useStyle,
        react_i18next__WEBPACK_IMPORTED_MODULE_8__.useTranslation
    ];
})), "fgunhaalDSs8N+2m1HtAJo+BJC8=", false, function() {
    return [
        _Pimcore_components_drag_and_drop_hooks_use_droppable__WEBPACK_IMPORTED_MODULE_7__.useDroppable,
        _asset_target_styles__WEBPACK_IMPORTED_MODULE_3__.useStyle,
        react_i18next__WEBPACK_IMPORTED_MODULE_8__.useTranslation
    ];
});
_c1 = AssetTarget;
var _c, _c1;
$RefreshReg$(_c, "AssetTarget$forwardRef");
$RefreshReg$(_c1, "AssetTarget");

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
"./js/src/core/components/card/card.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
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
        card: css`
      .ant-card-head {
        min-height: 38px;
        padding: ${token.paddingXXS}px ${token.paddingSM}px;

        .button--type-action {
          margin-bottom: -4px;
        }
      }

      &.ant-card:not(.ant-card-bordered) {
        box-shadow: none;
        border: 1px solid transparent;
      }

      .ant-card-head-title {
        display: flex;
        align-items: center;
        gap: ${token.marginXS}px;
        font-size: ${token.fontSize}px;
      }

      .ant-card-extra {
        display: flex;
        align-items: center;
        gap: ${token.marginXXS}px;
        color: ${token.colorTextSecondary};
      }

      .ant-card-head-wrapper {
        gap: ${token.paddingXS}px;

        .ant-card-head-title {
          min-width: fit-content;  
        }

        .ant-card-extra {
          width: 100%;
        }
      }

      .ant-card-body {
        padding: 0;
      }

      &.card-with-footer {
         .card-footer {
             padding: ${token.paddingXXS}px ${token.paddingXS}px;
             border-top: 1px solid ${token.colorBorderSecondary};
         }
      }
      
      &.card-fit-content {
        width: fit-content;
      }
      
      .ant-card-actions {
        padding: ${token.paddingXXS}px;

        li {
          margin: 0;
          max-width: fit-content;
        }

        li:not(:last-child) {
          border: none;
        }
      }

      &.card--theme-card-with-highlight {
        .ant-card-head {
          border-bottom: 1px solid ${token.colorPrimaryBorder};
        }
      }

      &.card--theme-border-highlight {        
        &, &.ant-card:not(.ant-card-bordered) {
          border-left: 3px solid #D5CFDA;
        }
      }

      &.card--theme-fieldset {
        border-left: 3px solid #D5CFDA;
        background: rgba(242, 240, 244, 0.52);

        &, &.ant-card:not(.ant-card-bordered) {
          border-left: 3px solid #D5CFDA;
        }
 
        .ant-card-head {
          border-bottom: transparent;
        }

        .ant-card-body {
          padding-top: ${token.paddingXXS}px;
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
"./js/src/core/components/card/card.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Card: () => (Card)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_components_card_card_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/card/card.styles.tsx");
/* ESM import */var _Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/icon-button/icon-button.tsx");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _Pimcore_components_pimcore_image_pimcore_image__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/pimcore-image/pimcore-image.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _box_box__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/box/box.tsx");
/* ESM import */var _flex_flex__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
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









const Component = (param, ref)=>{
    let { loading, children, footer, fitContent, className, theme = 'default', contentPadding = 'small', ...props } = param;
    var _props_image;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_7__.useTranslation)();
    const { styles } = (0,_Pimcore_components_card_card_styles__WEBPACK_IMPORTED_MODULE_3__.useStyles)();
    const classNames = [
        styles.card,
        className,
        footer !== undefined ? 'card-with-footer' : '',
        fitContent === true ? 'card-fit-content' : '',
        `card--theme-${theme}`
    ].filter(Boolean);
    const renderExtraContent = ()=>{
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_flex_flex__WEBPACK_IMPORTED_MODULE_9__.Flex, {
            className: "w-full",
            justify: props.extraPosition ?? 'flex-end',
            children: [
                Array.isArray(props.extra) ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                    children: props.extra.map((extra, index)=>typeof extra === 'object' && extra.icon !== undefined ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_4__.IconButton, {
                            icon: {
                                value: extra.icon
                            },
                            onClick: extra.onClick,
                            role: 'button',
                            title: extra.title,
                            type: extra.type !== undefined ? extra.type : 'text'
                        }, `${extra.icon}-${index}`, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/card/card.tsx",
                            lineNumber: 59,
                            columnNumber: 21
                        }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
                            children: extra
                        }, `${extra.icon}-${index}`, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/card/card.tsx",
                            lineNumber: 68,
                            columnNumber: 22
                        }, undefined))
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/card/card.tsx",
                    lineNumber: 55,
                    columnNumber: 13
                }, undefined) : props.extra,
                props.onClose !== undefined ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_4__.IconButton, {
                    "aria-label": t('aria.card.close'),
                    icon: {
                        value: 'close'
                    },
                    onClick: ()=>{
                        var _props_onClose;
                        return (_props_onClose = props.onClose) === null || _props_onClose === void 0 ? void 0 : _props_onClose.call(props);
                    },
                    role: 'button',
                    size: "small",
                    type: 'text'
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/card/card.tsx",
                    lineNumber: 76,
                    columnNumber: 13
                }, undefined) : null
            ]
        }, void 0, true, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/card/card.tsx",
            lineNumber: 49,
            columnNumber: 7
        }, undefined);
    };
    const renderTitle = ()=>{
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                props.icon !== undefined && props.icon !== null ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_5__.Icon, {
                    value: props.icon
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/card/card.tsx",
                    lineNumber: 93,
                    columnNumber: 60
                }, undefined) : null,
                props.title
            ]
        }, void 0, true);
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Card, {
        ...props,
        actions: props.actions,
        className: classNames.join(' '),
        cover: props.image !== null && ((_props_image = props.image) === null || _props_image === void 0 ? void 0 : _props_image.src) !== undefined ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_pimcore_image_pimcore_image__WEBPACK_IMPORTED_MODULE_6__.PimcoreImage, {
            alt: props.image.alt,
            src: props.image.src
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/card/card.tsx",
            lineNumber: 106,
            columnNumber: 11
        }, void 0) : props.cover,
        extra: props.extra !== undefined && props.extra !== null ? renderExtraContent() : null,
        title: props.title !== undefined && props.title !== null ? renderTitle() : null,
        children: [
            children !== undefined && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_box_box__WEBPACK_IMPORTED_MODULE_8__.Box, {
                padding: contentPadding,
                children: children
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/card/card.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, undefined),
            footer !== undefined && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                className: "card-footer",
                children: footer
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/card/card.tsx",
                lineNumber: 122,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/card/card.tsx",
        lineNumber: 100,
        columnNumber: 5
    }, undefined);
};
_s(Component, "RLrtxoYLhU6K3pUxNPOpN7Ah0UQ=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_7__.useTranslation,
        _Pimcore_components_card_card_styles__WEBPACK_IMPORTED_MODULE_3__.useStyles
    ];
});
_c = Component;
const Card = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().forwardRef(Component);
_c1 = Card;
var _c, _c1;
$RefreshReg$(_c, "Component");
$RefreshReg$(_c1, "Card");

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
"./js/src/core/components/color-picker/color-picker.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
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
        colorPicker: css`
      &.versionFieldItem {
        .ant-color-picker-trigger-text {
          color: ${token.colorText} !important;
        }
      }

      &.versionFieldItemHighlight {
        background-color: ${token.Colors.Brand.Warning.colorWarningBg} !important;
      }
    `,
        inherited: css`
      background: ${token.colorBgContainerDisabled};
      color: ${token.colorTextDisabled};
      &:focus-within, &:hover {
        background: ${token.colorBgContainerDisabled};
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
"./js/src/core/components/color-picker/color-picker.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ColorPicker: () => (ColorPicker)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/classnames/index.js");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _color_picker_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/color-picker/color-picker.styles.tsx");
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




const ColorPicker = (param)=>{
    let { inherited, className, ...restProps } = param;
    _s();
    const { styles } = (0,_color_picker_styles__WEBPACK_IMPORTED_MODULE_4__.useStyles)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.ColorPicker, {
        className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(styles.colorPicker, className, {
            [styles.inherited]: inherited
        }),
        ...restProps
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/color-picker/color-picker.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, undefined);
};
_s(ColorPicker, "1BGFRu6BGAbhzJ8kKgs1GUjvI6w=", false, function() {
    return [
        _color_picker_styles__WEBPACK_IMPORTED_MODULE_4__.useStyles
    ];
});
_c = ColorPicker;
var _c;
$RefreshReg$(_c, "ColorPicker");

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
"./js/src/core/components/date-picker/date-picker.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
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
        datePicker: css`
      input {
       color: ${token.colorText} !important;
      }

      .ant-picker-suffix {
        display: none;
      }
      
      &.versionFieldItemHighlight {
        background-color: ${token.Colors.Brand.Warning.colorWarningBg} !important;
      }
    `,
        datePickerDropdown: css`
      width: inherit !important;
    `,
        inherited: css`
      background: ${token.colorBgContainerDisabled};
      color: ${token.colorTextDisabled};
      &:focus-within, &:hover {
        background: ${token.colorBgContainerDisabled};
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
"./js/src/core/components/date-picker/date-picker.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DatePicker: () => (DatePicker)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _utils_date_picker_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/date-picker/utils/date-picker-utils.ts");
/* ESM import */var _Pimcore_components_date_picker_date_range_picker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/date-picker/date-range-picker.tsx");
/* ESM import */var _Pimcore_components_date_picker_time_picker__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/date-picker/time-picker.tsx");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_6__);
/* ESM import */var _date_picker_styles__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/date-picker/date-picker.styles.tsx");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./node_modules/classnames/index.js");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_8__);
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








const DatePickerComponent = (props)=>{
    _s();
    const [value, setValue] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)((0,_utils_date_picker_utils__WEBPACK_IMPORTED_MODULE_3__.toDayJs)(props.value));
    const { styles } = (0,_date_picker_styles__WEBPACK_IMPORTED_MODULE_7__.useStyles)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const localValue = (0,_utils_date_picker_utils__WEBPACK_IMPORTED_MODULE_3__.fromDayJs)(value, 'timestamp');
        if (!lodash__WEBPACK_IMPORTED_MODULE_6___default().isEqual((0,_utils_date_picker_utils__WEBPACK_IMPORTED_MODULE_3__.fromDayJs)((0,_utils_date_picker_utils__WEBPACK_IMPORTED_MODULE_3__.toDayJs)(props.value), 'timestamp'), localValue)) {
            setValue((0,_utils_date_picker_utils__WEBPACK_IMPORTED_MODULE_3__.toDayJs)(props.value));
        }
    }, [
        props.value
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.DatePicker, {
        ...props,
        format: props.outputFormat,
        onChange: (date)=>{
            var _props_onChange;
            setValue(date);
            (_props_onChange = props.onChange) === null || _props_onChange === void 0 ? void 0 : _props_onChange.call(props, (0,_utils_date_picker_utils__WEBPACK_IMPORTED_MODULE_3__.fromDayJs)(date, props.outputType, props.outputFormat));
        },
        popupClassName: styles.datePickerDropdown,
        rootClassName: classnames__WEBPACK_IMPORTED_MODULE_8___default()(styles.datePicker, props.className, {
            [styles.inherited]: props.inherited
        }),
        showTime: props.showTime,
        value: value
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/date-picker/date-picker.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, undefined);
};
_s(DatePickerComponent, "ZLeYUcszlePOTIeN3L10AxS9hCY=", false, function() {
    return [
        _date_picker_styles__WEBPACK_IMPORTED_MODULE_7__.useStyles
    ];
});
_c = DatePickerComponent;
const DatePicker = Object.assign(DatePickerComponent, {
    RangePicker: _Pimcore_components_date_picker_date_range_picker__WEBPACK_IMPORTED_MODULE_4__.DateRangePicker,
    TimePicker: _Pimcore_components_date_picker_time_picker__WEBPACK_IMPORTED_MODULE_5__.TimePicker
});
_c1 = DatePicker;
var _c, _c1;
$RefreshReg$(_c, "DatePickerComponent");
$RefreshReg$(_c1, "DatePicker");

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
"./js/src/core/components/date-picker/date-range-picker.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DateRangePicker: () => (DateRangePicker)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _utils_date_picker_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/date-picker/utils/date-picker-utils.ts");
/* ESM import */var _Pimcore_components_date_picker_date_picker_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/date-picker/date-picker.styles.tsx");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/classnames/index.js");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_5__);
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





const valueToDayJs = (value)=>{
    if (Array.isArray(value)) {
        return [
            (0,_utils_date_picker_utils__WEBPACK_IMPORTED_MODULE_3__.toDayJs)(value[0]),
            (0,_utils_date_picker_utils__WEBPACK_IMPORTED_MODULE_3__.toDayJs)(value[1])
        ];
    }
    return null;
};
const valueFromDayJs = (value, outputType, outputFormat)=>{
    if (value === null) {
        return null;
    }
    return [
        (0,_utils_date_picker_utils__WEBPACK_IMPORTED_MODULE_3__.fromDayJs)(value[0], outputType, outputFormat),
        (0,_utils_date_picker_utils__WEBPACK_IMPORTED_MODULE_3__.fromDayJs)(value[1], outputType, outputFormat)
    ];
};
const DateRangePicker = (props)=>{
    _s();
    const [value, setValue] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(valueToDayJs(props.value));
    const { styles } = (0,_Pimcore_components_date_picker_date_picker_styles__WEBPACK_IMPORTED_MODULE_4__.useStyles)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.DatePicker.RangePicker, {
        ...props,
        onChange: (dates)=>{
            var _props_onChange;
            setValue(dates);
            (_props_onChange = props.onChange) === null || _props_onChange === void 0 ? void 0 : _props_onChange.call(props, valueFromDayJs(dates, props.outputType, props.outputFormat));
        },
        popupClassName: styles.datePickerDropdown,
        rootClassName: classnames__WEBPACK_IMPORTED_MODULE_5___default()(styles.datePicker, props.className, {
            [styles.inherited]: props.inherited
        }),
        value: value
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/date-picker/date-range-picker.tsx",
        lineNumber: 65,
        columnNumber: 5
    }, undefined);
};
_s(DateRangePicker, "75KnSMS5w5WgpdJdfUtf1CxkL5Y=", false, function() {
    return [
        _Pimcore_components_date_picker_date_picker_styles__WEBPACK_IMPORTED_MODULE_4__.useStyles
    ];
});
_c = DateRangePicker;
var _c;
$RefreshReg$(_c, "DateRangePicker");

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
"./js/src/core/components/date-picker/time-picker.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TimePicker: () => (TimePicker)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _utils_date_picker_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/date-picker/utils/date-picker-utils.ts");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/classnames/index.js");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var _Pimcore_components_date_picker_date_picker_styles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/date-picker/date-picker.styles.tsx");
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





const TimePicker = (props)=>{
    _s();
    const outputFormat = (props === null || props === void 0 ? void 0 : props.outputFormat) ?? 'HH:mm:ss';
    const [value, setValue] = react__WEBPACK_IMPORTED_MODULE_1___default().useState((0,_utils_date_picker_utils__WEBPACK_IMPORTED_MODULE_2__.toDayJs)(props.value, outputFormat));
    const { styles } = (0,_Pimcore_components_date_picker_date_picker_styles__WEBPACK_IMPORTED_MODULE_5__.useStyles)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (props.onChange !== undefined) {
            props.onChange((0,_utils_date_picker_utils__WEBPACK_IMPORTED_MODULE_2__.fromDayJs)(value, props.outputType, outputFormat));
        }
    }, [
        value,
        props.outputType,
        outputFormat
    ]);
    const OriginalTimePicker = antd__WEBPACK_IMPORTED_MODULE_3__.DatePicker.TimePicker;
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(OriginalTimePicker, {
        ...props,
        onChange: (date)=>{
            setValue(date);
        },
        popupClassName: styles.datePickerDropdown,
        rootClassName: classnames__WEBPACK_IMPORTED_MODULE_4___default()(styles.datePicker, props.className, {
            [styles.inherited]: props.inherited
        }),
        value: value
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/date-picker/time-picker.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, undefined);
};
_s(TimePicker, "q9uvF9Vp/klDCsAkewHt0+fkBPQ=", false, function() {
    return [
        _Pimcore_components_date_picker_date_picker_styles__WEBPACK_IMPORTED_MODULE_5__.useStyles
    ];
});
_c = TimePicker;
var _c;
$RefreshReg$(_c, "TimePicker");

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
"./js/src/core/components/date-picker/utils/date-picker-utils.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  formatDatePickerDate: () => (formatDatePickerDate),
  fromDayJs: () => (fromDayJs),
  toDayJs: () => (toDayJs)
});
/* ESM import */var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/dayjs/dayjs.min.js");
/* ESM import */var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);
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
const toDayJs = (value, format)=>{
    if (dayjs__WEBPACK_IMPORTED_MODULE_0___default().isDayjs(value)) {
        return value;
    }
    if (typeof value === 'number') {
        return dayjs__WEBPACK_IMPORTED_MODULE_0___default().unix(value);
    }
    if (typeof value === 'string') {
        return dayjs__WEBPACK_IMPORTED_MODULE_0___default()(value, format);
    }
    return null;
};
const fromDayJs = (value, outputType, outputFormat)=>{
    if (value === null) {
        return null;
    }
    if (outputType === 'timestamp') {
        return value.unix();
    }
    if (outputType === 'dateString') {
        return outputFormat !== undefined ? value.format(outputFormat) : value.format();
    }
    return value;
};
const formatDatePickerDate = (date)=>{
    if (date === null || date === undefined) {
        return '';
    }
    return dayjs__WEBPACK_IMPORTED_MODULE_0___default().isDayjs(date) ? '[dayjs object]: ' + date.toString() : date.toString();
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
"./js/src/core/components/divider/divider.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Divider: () => (Divider)
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


const Divider = (props)=>{
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Divider, {
        ...props
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/divider/divider.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, undefined);
};
_c = Divider;
var _c;
$RefreshReg$(_c, "Divider");

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
"./js/src/core/components/element-tag/element-tag.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
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
        tag: css`
      display: block;
      max-width: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
    `,
        tagClickable: css`
      cursor: pointer;
    `,
        tagDisabled: css`
      position: relative;
      &::before {
        content: "";
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.07);
        pointer-events: none;
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
"./js/src/core/components/element-tag/element-tag.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ElementTag: () => (ElementTag)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_tag_tag__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/tag/tag.tsx");
/* ESM import */var _Pimcore_modules_element_hooks_use_element_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/element/hooks/use-element-helper.ts");
/* ESM import */var _element_tag_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/element-tag/element-tag.styles.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/classnames/index.js");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_6__);
/* ESM import */var _tooltip_tooltip__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/tooltip/tooltip.tsx");
/* ESM import */var _utils_use_element_overflow__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/utils/use-element-overflow.ts");
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








const ElementTag = (param)=>{
    let { path, elementType, id, published, disabled, onClose } = param;
    _s();
    const { openElement } = (0,_Pimcore_modules_element_hooks_use_element_helper__WEBPACK_IMPORTED_MODULE_3__.useElementHelper)();
    const { styles } = (0,_element_tag_styles__WEBPACK_IMPORTED_MODULE_4__.useStyles)();
    const textRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const isOverflow = (0,_utils_use_element_overflow__WEBPACK_IMPORTED_MODULE_8__["default"])(textRef);
    const isUnpublished = published === false;
    const isClickable = !(0,lodash__WEBPACK_IMPORTED_MODULE_5__.isUndefined)(elementType) && !(0,lodash__WEBPACK_IMPORTED_MODULE_5__.isUndefined)(id);
    const onClick = async ()=>{
        if (isClickable) {
            await openElement({
                type: elementType,
                id
            });
        }
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_tooltip_tooltip__WEBPACK_IMPORTED_MODULE_7__.Tooltip, {
        title: isOverflow ? path : '',
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_tag_tag__WEBPACK_IMPORTED_MODULE_2__.Tag, {
            bordered: false,
            className: classnames__WEBPACK_IMPORTED_MODULE_6___default()(styles.tag, {
                [styles.tagClickable]: isClickable,
                [styles.tagDisabled]: disabled
            }),
            closeIcon: !(0,lodash__WEBPACK_IMPORTED_MODULE_5__.isUndefined)(onClose),
            color: isUnpublished ? 'gold' : 'geekblue',
            iconName: isUnpublished ? 'eye-off' : undefined,
            onClick: isClickable ? onClick : undefined,
            onClose: onClose,
            ref: textRef,
            children: path
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tag/element-tag.tsx",
            lineNumber: 54,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tag/element-tag.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, undefined);
};
_s(ElementTag, "X2/xcT36WyoVk+4HPz1lab68jro=", false, function() {
    return [
        _Pimcore_modules_element_hooks_use_element_helper__WEBPACK_IMPORTED_MODULE_3__.useElementHelper,
        _element_tag_styles__WEBPACK_IMPORTED_MODULE_4__.useStyles,
        _utils_use_element_overflow__WEBPACK_IMPORTED_MODULE_8__["default"]
    ];
});
_c = ElementTag;
var _c;
$RefreshReg$(_c, "ElementTag");

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
"./js/src/core/components/formatted-date-time/formatted-date-time.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  FormattedDateTime: () => (FormattedDateTime)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_utils_date_time__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/utils/date-time.ts");
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


const FormattedDateTime = (props)=>{
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: (0,_Pimcore_utils_date_time__WEBPACK_IMPORTED_MODULE_2__.formatDateTime)({
            timestamp: props.timestamp,
            dateStyle: 'short',
            timeStyle: 'short'
        })
    }, void 0, false);
};
_c = FormattedDateTime;

var _c;
$RefreshReg$(_c, "FormattedDateTime");

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
"./js/src/core/components/formatted-date/formatted-date.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  FormattedDate: () => (FormattedDate)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_utils_date_time__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/utils/date-time.ts");
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


const FormattedDate = (props)=>{
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: (0,_Pimcore_utils_date_time__WEBPACK_IMPORTED_MODULE_2__.formatDate)(props.timestamp)
    }, void 0, false);
};
_c = FormattedDate;

var _c;
$RefreshReg$(_c, "FormattedDate");

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
"./js/src/core/components/formatted-time/formatted-time.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  FormattedTime: () => (FormattedTime)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_utils_date_time__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/utils/date-time.ts");
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


const FormattedTime = (props)=>{
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: (0,_Pimcore_utils_date_time__WEBPACK_IMPORTED_MODULE_2__.formatTime)(props.timestamp)
    }, void 0, false);
};
_c = FormattedTime;
var _c;
$RefreshReg$(_c, "FormattedTime");

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
"./js/src/core/components/geo-bounds-drawer/footer.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  GeoBoundsDrawerFooter: () => (GeoBoundsDrawerFooter)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_geo_map_components_geo_map_card_footer_geo_map_card_footer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/geo-map/components/geo-map-card-footer/geo-map-card-footer.tsx");
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


const GeoBoundsDrawerFooter = (props)=>{
    _s();
    const [value, setValue] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(props.value);
    const emptyValue = ()=>{
        setValue(undefined);
        if (props.onChange !== undefined) {
            props.onChange(undefined);
        }
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setValue(props.value);
    }, [
        props.value
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_geo_map_components_geo_map_card_footer_geo_map_card_footer__WEBPACK_IMPORTED_MODULE_2__.GeoMapCardFooter, {
        emptyValue: emptyValue,
        onSearch: props.onSearch,
        removeButtonDisabled: value === undefined
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-bounds-drawer/footer.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, undefined);
};
_s(GeoBoundsDrawerFooter, "Lex4bMt8druqlUQ1vjvidWytV38=");
_c = GeoBoundsDrawerFooter;
var _c;
$RefreshReg$(_c, "GeoBoundsDrawerFooter");

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
"./js/src/core/components/geo-bounds-drawer/geo-bounds-drawer.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  GeoBoundsDrawer: () => (GeoBoundsDrawer)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _footer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/geo-bounds-drawer/footer.tsx");
/* ESM import */var _Pimcore_components_geo_map_components_geo_map_card_geo_map_card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/geo-map/components/geo-map-card/geo-map-card.tsx");
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



const GeoBoundsDrawer = (param)=>{
    let { ...props } = param;
    _s();
    const [mapValue, setMapValue] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(props.value ?? undefined);
    const [footerValue, setFooterValue] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(props.value ?? undefined);
    const geoMapRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const onChangeFooter = (newValue)=>{
        var _props_onChange;
        setFooterValue(newValue);
        setMapValue(newValue);
        (_props_onChange = props.onChange) === null || _props_onChange === void 0 ? void 0 : _props_onChange.call(props, newValue);
        const geoMapAPI = geoMapRef.current;
        geoMapAPI === null || geoMapAPI === void 0 ? void 0 : geoMapAPI.reset();
        geoMapAPI === null || geoMapAPI === void 0 ? void 0 : geoMapAPI.forceRerender();
    };
    const onChangeMap = (newValue)=>{
        var _props_onChange;
        setFooterValue(newValue);
        (_props_onChange = props.onChange) === null || _props_onChange === void 0 ? void 0 : _props_onChange.call(props, newValue);
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_geo_map_components_geo_map_card_geo_map_card__WEBPACK_IMPORTED_MODULE_3__.GeoMapCard, {
        className: props === null || props === void 0 ? void 0 : props.className,
        disabled: props.disabled,
        footer: props.disabled === true ? undefined : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_footer__WEBPACK_IMPORTED_MODULE_2__.GeoBoundsDrawerFooter, {
            onChange: onChangeFooter,
            onSearch: (geoPoint)=>{
                var _props_onChange;
                setFooterValue(undefined);
                setMapValue(undefined);
                const geoMapAPI = geoMapRef.current;
                geoMapAPI === null || geoMapAPI === void 0 ? void 0 : geoMapAPI.setValue(undefined);
                if (geoPoint === undefined) {
                    geoMapAPI === null || geoMapAPI === void 0 ? void 0 : geoMapAPI.reset();
                } else {
                    geoMapAPI === null || geoMapAPI === void 0 ? void 0 : geoMapAPI.setLat(geoPoint.latitude);
                    geoMapAPI === null || geoMapAPI === void 0 ? void 0 : geoMapAPI.setLng(geoPoint.longitude);
                    geoMapAPI === null || geoMapAPI === void 0 ? void 0 : geoMapAPI.setZoom(15);
                }
                geoMapAPI === null || geoMapAPI === void 0 ? void 0 : geoMapAPI.forceRerender();
                (_props_onChange = props.onChange) === null || _props_onChange === void 0 ? void 0 : _props_onChange.call(props, undefined);
            },
            value: footerValue
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-bounds-drawer/geo-bounds-drawer.tsx",
            lineNumber: 53,
            columnNumber: 11
        }, void 0),
        height: props.height,
        lat: props.lat,
        lng: props.lng,
        mapMode: "geoBounds",
        mapValue: mapValue,
        onChangeMap: onChangeMap,
        ref: geoMapRef,
        width: props.width,
        zoom: props.zoom
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-bounds-drawer/geo-bounds-drawer.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, undefined);
};
_s(GeoBoundsDrawer, "spjMGwfOzEy16Tvd4ZdyJQXuzcM=");
_c = GeoBoundsDrawer;
var _c;
$RefreshReg$(_c, "GeoBoundsDrawer");

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
"./js/src/core/components/geo-map/components/address-search-field/address-search-field.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  AddressSearchField: () => (AddressSearchField)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_components_geo_map_utils_geocode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/geo-map/utils/geocode.ts");
/* ESM import */var _Pimcore_components_modal_alert_modal_hooks_use_alert_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/modal/alert-modal/hooks/use-alert-modal.tsx");
/* ESM import */var _Pimcore_modules_app_settings_hooks_use_settings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/app/settings/hooks/use-settings.ts");
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






const AddressSearchField = (props)=>{
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation)();
    const alertModal = (0,_Pimcore_components_modal_alert_modal_hooks_use_alert_modal__WEBPACK_IMPORTED_MODULE_5__.useAlertModal)();
    const settings = (0,_Pimcore_modules_app_settings_hooks_use_settings__WEBPACK_IMPORTED_MODULE_6__.useSettings)();
    const onSearch = async (value)=>{
        if (value === '') {
            props.onSearch(undefined);
            return;
        }
        await (0,_Pimcore_components_geo_map_utils_geocode__WEBPACK_IMPORTED_MODULE_4__.geoCode)(value, settings.maps.geocoding_url_template).then(props.onSearch).catch((error)=>{
            if (error.message === _Pimcore_components_geo_map_utils_geocode__WEBPACK_IMPORTED_MODULE_4__.ERROR_ADDRESS_NOT_FOUND) {
                const errorMessage = /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                    children: [
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
                            children: t('geocode.address-not-found')
                        }, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-map/components/address-search-field/address-search-field.tsx",
                            lineNumber: 43,
                            columnNumber: 15
                        }, undefined),
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("strong", {
                            children: [
                                t('geocode.possible-causes'),
                                ":"
                            ]
                        }, void 0, true, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-map/components/address-search-field/address-search-field.tsx",
                            lineNumber: 44,
                            columnNumber: 15
                        }, undefined),
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
                            children: t('geocode.postal-code-format-error')
                        }, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-map/components/address-search-field/address-search-field.tsx",
                            lineNumber: 45,
                            columnNumber: 15
                        }, undefined)
                    ]
                }, void 0, true, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-map/components/address-search-field/address-search-field.tsx",
                    lineNumber: 42,
                    columnNumber: 13
                }, undefined);
                alertModal.error({
                    content: errorMessage
                });
            } else {
                alertModal.error({
                    content: error.message
                });
            }
        });
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Input.Search, {
        className: "address-search-field",
        disabled: props.disabled,
        onSearch: onSearch,
        placeholder: t('search-address')
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-map/components/address-search-field/address-search-field.tsx",
        lineNumber: 56,
        columnNumber: 5
    }, undefined);
};
_s(AddressSearchField, "AfKiP/l2VoJSr1ebsprBYa/m7Y8=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation,
        _Pimcore_components_modal_alert_modal_hooks_use_alert_modal__WEBPACK_IMPORTED_MODULE_5__.useAlertModal,
        _Pimcore_modules_app_settings_hooks_use_settings__WEBPACK_IMPORTED_MODULE_6__.useSettings
    ];
});
_c = AddressSearchField;
var _c;
$RefreshReg$(_c, "AddressSearchField");

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
"./js/src/core/components/geo-map/components/geo-map-card-footer/geo-map-card-footer.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
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
        footer: css`
      .address-search-field {
        max-width: 300px;
      }
      .remove-button-wrapper {
        margin-left: auto;
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
"./js/src/core/components/geo-map/components/geo-map-card-footer/geo-map-card-footer.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  GeoMapCardFooter: () => (GeoMapCardFooter)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _geo_map_card_footer_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/geo-map/components/geo-map-card-footer/geo-map-card-footer.styles.ts");
/* ESM import */var _Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/box/box.tsx");
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var _Pimcore_components_geo_map_components_address_search_field_address_search_field__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/geo-map/components/address-search-field/address-search-field.tsx");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_6__);
/* ESM import */var _Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/icon-button/icon-button.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
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








const GeoMapCardFooter = (props)=>{
    _s();
    const { styles } = (0,_geo_map_card_footer_styles__WEBPACK_IMPORTED_MODULE_2__.useStyles)();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_8__.useTranslation)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_3__.Box, {
        className: styles.footer,
        padding: {
            y: 'mini'
        },
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_4__.Flex, {
            className: "w-full",
            gap: "mini",
            children: [
                props.disabled !== true && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_geo_map_components_address_search_field_address_search_field__WEBPACK_IMPORTED_MODULE_5__.AddressSearchField, {
                    onSearch: props.onSearch
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-map/components/geo-map-card-footer/geo-map-card-footer.tsx",
                    lineNumber: 47,
                    columnNumber: 11
                }, undefined),
                props.dropdown,
                props.disabled !== true && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                    className: "remove-button-wrapper",
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_6__.Tooltip, {
                        title: t('set-to-null'),
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_7__.IconButton, {
                            disabled: props.removeButtonDisabled,
                            icon: {
                                value: 'trash'
                            },
                            onClick: props.emptyValue
                        }, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-map/components/geo-map-card-footer/geo-map-card-footer.tsx",
                            lineNumber: 59,
                            columnNumber: 15
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-map/components/geo-map-card-footer/geo-map-card-footer.tsx",
                        lineNumber: 56,
                        columnNumber: 13
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-map/components/geo-map-card-footer/geo-map-card-footer.tsx",
                    lineNumber: 55,
                    columnNumber: 11
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-map/components/geo-map-card-footer/geo-map-card-footer.tsx",
            lineNumber: 41,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-map/components/geo-map-card-footer/geo-map-card-footer.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, undefined);
};
_s(GeoMapCardFooter, "npbODhKiVXMAM/EtpCiaKc7TtqU=", false, function() {
    return [
        _geo_map_card_footer_styles__WEBPACK_IMPORTED_MODULE_2__.useStyles,
        react_i18next__WEBPACK_IMPORTED_MODULE_8__.useTranslation
    ];
});
_c = GeoMapCardFooter;
var _c;
$RefreshReg$(_c, "GeoMapCardFooter");

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
"./js/src/core/components/geo-map/components/geo-map-card/geo-map-card.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
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
      max-width: 100%;
      min-width: 270px;

      .ant-card-cover {
        .leaflet-container {
          border-radius: ${token.borderRadiusLG}px ${token.borderRadiusLG}px 0 0;
          min-height: 120px;
        }
      }

      &.versionFieldItemHighlight {
        border: none !important;
      }

      &.ant-card {
        &.versionFieldItem {
          .ant-card-cover {
            .leaflet-container {
              width: 100% !important;
              border: 1px solid transparent !important;
            }
          }
        }
        
        &.versionFieldItemHighlight {
          .ant-card-cover {
            .leaflet-container {
              border: 1px solid ${token.Colors.Brand.Warning.colorWarningBorder} !important;
            }
          }
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
"./js/src/core/components/geo-map/components/geo-map-card/geo-map-card.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  GeoMapCard: () => (GeoMapCard)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/classnames/index.js");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_components_geo_map_geo_map__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/geo-map/geo-map.tsx");
/* ESM import */var _Pimcore_components_card_card__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/card/card.tsx");
/* ESM import */var _geo_map_card_styles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/geo-map/components/geo-map-card/geo-map-card.styles.ts");
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





const GeoMapCard = /*#__PURE__*/ _s((0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(_c = _s((props, geoMapRef)=>{
    _s();
    const { styles } = (0,_geo_map_card_styles__WEBPACK_IMPORTED_MODULE_5__.useStyles)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_card_card__WEBPACK_IMPORTED_MODULE_4__.Card, {
        className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(styles.container, props === null || props === void 0 ? void 0 : props.className),
        cover: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_geo_map_geo_map__WEBPACK_IMPORTED_MODULE_3__.GeoMap, {
            disabled: props.disabled,
            height: props.height,
            lat: props.lat,
            lng: props.lng,
            mode: props.mapMode,
            onChange: props.onChangeMap,
            ref: geoMapRef,
            value: props.mapValue,
            width: props.width,
            zoom: props.zoom
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-map/components/geo-map-card/geo-map-card.tsx",
            lineNumber: 45,
            columnNumber: 9
        }, void 0),
        fitContent: true,
        footer: props.footer,
        style: {
            width: props.width
        }
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-map/components/geo-map-card/geo-map-card.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, undefined);
}, "1BGFRu6BGAbhzJ8kKgs1GUjvI6w=", false, function() {
    return [
        _geo_map_card_styles__WEBPACK_IMPORTED_MODULE_5__.useStyles
    ];
})), "1BGFRu6BGAbhzJ8kKgs1GUjvI6w=", false, function() {
    return [
        _geo_map_card_styles__WEBPACK_IMPORTED_MODULE_5__.useStyles
    ];
});
_c1 = GeoMapCard;
GeoMapCard.displayName = 'GeoMapCard';

var _c, _c1;
$RefreshReg$(_c, "GeoMapCard$forwardRef");
$RefreshReg$(_c1, "GeoMapCard");

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
"./js/src/core/components/geo-map/geo-map.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
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
        mapContainer: css`
      max-width: 100%;
      width: 100% !important;
      
      .leaflet-tooltip{
        width: 100px;
        white-space: normal;
      }
      .leaflet-draw-actions-bottom li:nth-child(2) {
        display: none;
      }
      .leaflet-edit-marker-selected {
        border: 0;
        outline: 2px dashed rgba(51, 136, 255, .5);
        margin-left: -12px !important;
        margin-top: -41px !important;
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
"./js/src/core/components/geo-map/geo-map.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  GeoMap: () => (GeoMap)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var leaflet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/leaflet/dist/leaflet-src.js");
/* ESM import */var leaflet__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var leaflet_dist_leaflet_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/leaflet/dist/leaflet.css");
/* ESM import */var leaflet_draw__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/leaflet-draw/dist/leaflet.draw.js");
/* ESM import */var leaflet_draw__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(leaflet_draw__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var leaflet_draw_dist_leaflet_draw_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/leaflet-draw/dist/leaflet.draw.css");
/* ESM import */var _Pimcore_components_geo_map_toolbar_add_geo_point_toolbar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/geo-map/toolbar/add-geo-point-toolbar.ts");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./node_modules/classnames/index.js");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_7__);
/* ESM import */var _geo_map_styles__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/geo-map/geo-map.styles.ts");
/* ESM import */var _Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/utils/css.tsx");
/* ESM import */var _Pimcore_components_geo_map_toolbar_add_geo_poly_line_toolbar__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/components/geo-map/toolbar/add-geo-poly-line-toolbar.ts");
/* ESM import */var _Pimcore_components_geo_map_toolbar_add_geo_polygon_toolbar__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/components/geo-map/toolbar/add-geo-polygon-toolbar.ts");
/* ESM import */var _Pimcore_components_geo_map_toolbar_add_geo_bounds_toolbar__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/components/geo-map/toolbar/add-geo-bounds-toolbar.ts");
/* ESM import */var _Pimcore_modules_app_settings_hooks_use_settings__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/modules/app/settings/hooks/use-settings.ts");
/* ESM import */var _Pimcore_utils_hooks_use_element_visible__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/utils/hooks/use-element-visible.ts");
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














leaflet__WEBPACK_IMPORTED_MODULE_2___default().Icon.Default.mergeOptions({
    iconRetinaUrl: '/bundles/pimcorestudioui/img/leaflet/marker-icon-2x.png',
    iconUrl: '/bundles/pimcorestudioui/img/leaflet/marker-icon.png',
    shadowUrl: '/bundles/pimcorestudioui/img/leaflet/marker-shadow.png'
});
const GeoMap = /*#__PURE__*/ _s((0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(_c = _s((props, ref)=>{
    _s();
    const { styles } = (0,_geo_map_styles__WEBPACK_IMPORTED_MODULE_8__.useStyles)();
    const mapContainer = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const [lat, setLat] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(props.lat);
    const [lng, setLng] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(props.lng);
    const [zoom, setZoom] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(props.zoom);
    const [value, setValue] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(props.value);
    const [key, setKey] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const containerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const settings = (0,_Pimcore_modules_app_settings_hooks_use_settings__WEBPACK_IMPORTED_MODULE_13__.useSettings)();
    const geoMapApi = {
        reset: ()=>{
            setLat(undefined);
            setLng(undefined);
            setZoom(undefined);
            setValue(undefined);
        },
        forceRerender: ()=>{
            setKey((prevKey)=>prevKey + 1);
        },
        setLat,
        setLng,
        setZoom,
        setValue
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useImperativeHandle)(ref, ()=>geoMapApi);
    const initializeMap = ()=>{
        if (mapContainer.current !== null) {
            const map = leaflet__WEBPACK_IMPORTED_MODULE_2___default().map(mapContainer.current);
            if (props.mode === 'geoPoint' && props.value !== undefined) {
                const propsValue = props.value;
                map.setView([
                    propsValue.latitude,
                    propsValue.longitude
                ], 15);
            } else if (lat !== props.lat && lng !== props.lng) {
                map.setView([
                    lat ?? 0,
                    lng ?? 0
                ], 15);
            } else {
                map.setView([
                    props.lat ?? 0,
                    props.lng ?? 0
                ], props.zoom ?? 1);
            }
            leaflet__WEBPACK_IMPORTED_MODULE_2___default().tileLayer(settings.maps.tile_layer_url_template, {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            const featureGroup = leaflet__WEBPACK_IMPORTED_MODULE_2___default().featureGroup().addTo(map);
            if (props.mode === 'geoPoint') {
                (0,_Pimcore_components_geo_map_toolbar_add_geo_point_toolbar__WEBPACK_IMPORTED_MODULE_6__.addGeoPointToolbar)(map, featureGroup, settings.maps.reverse_geocoding_url_template, value, props.onChange, props.disabled);
            } else if (props.mode === 'geoPolyLine') {
                (0,_Pimcore_components_geo_map_toolbar_add_geo_poly_line_toolbar__WEBPACK_IMPORTED_MODULE_10__.addGeoPolyLineToolbar)(map, featureGroup, value, props.onChange, props.disabled);
            } else if (props.mode === 'geoPolygon') {
                (0,_Pimcore_components_geo_map_toolbar_add_geo_polygon_toolbar__WEBPACK_IMPORTED_MODULE_11__.addGeoPolygonToolbar)(map, featureGroup, value, props.onChange, props.disabled);
            } else if (props.mode === 'geoBounds') {
                (0,_Pimcore_components_geo_map_toolbar_add_geo_bounds_toolbar__WEBPACK_IMPORTED_MODULE_12__.addGeoBoundsToolbar)(map, featureGroup, value, props.onChange, props.disabled);
            }
            return map;
        }
        return null;
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setValue(props.value);
    }, [
        props.value
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setLat(props.lat);
    }, [
        props.lat
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setLng(props.lng);
    }, [
        props.lng
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setZoom(props.zoom);
    }, [
        props.zoom
    ]);
    const isVisible = (0,_Pimcore_utils_hooks_use_element_visible__WEBPACK_IMPORTED_MODULE_14__["default"])(containerRef);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!isVisible) {
            return;
        }
        const map = initializeMap();
        return ()=>{
            if (map !== null) {
                map.remove();
            }
        };
    }, [
        key,
        isVisible,
        lat,
        lng,
        zoom,
        value,
        props.mode,
        props.disabled
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        ref: containerRef,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
            className: classnames__WEBPACK_IMPORTED_MODULE_7___default()(styles.mapContainer),
            ref: mapContainer,
            style: {
                height: (0,_Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_9__.toCssDimension)(props.height, 250),
                width: (0,_Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_9__.toCssDimension)(props.width, 500)
            }
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-map/geo-map.tsx",
            lineNumber: 153,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-map/geo-map.tsx",
        lineNumber: 152,
        columnNumber: 5
    }, undefined);
}, "n3hrTjVR74SH+QRUP+btTqqZ6UY=", false, function() {
    return [
        _geo_map_styles__WEBPACK_IMPORTED_MODULE_8__.useStyles,
        _Pimcore_modules_app_settings_hooks_use_settings__WEBPACK_IMPORTED_MODULE_13__.useSettings,
        _Pimcore_utils_hooks_use_element_visible__WEBPACK_IMPORTED_MODULE_14__["default"]
    ];
})), "n3hrTjVR74SH+QRUP+btTqqZ6UY=", false, function() {
    return [
        _geo_map_styles__WEBPACK_IMPORTED_MODULE_8__.useStyles,
        _Pimcore_modules_app_settings_hooks_use_settings__WEBPACK_IMPORTED_MODULE_13__.useSettings,
        _Pimcore_utils_hooks_use_element_visible__WEBPACK_IMPORTED_MODULE_14__["default"]
    ];
});
_c1 = GeoMap;
GeoMap.displayName = 'GeoMap';

var _c, _c1;
$RefreshReg$(_c, "GeoMap$forwardRef");
$RefreshReg$(_c1, "GeoMap");

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
"./js/src/core/components/geo-map/toolbar/add-geo-bounds-toolbar.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addGeoBoundsToolbar: () => (addGeoBoundsToolbar)
});
/* ESM import */var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/leaflet/dist/leaflet-src.js");
/* ESM import */var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
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
const addGeoBoundsToolbar = (leafletMap, featureGroup, geoBounds, onChange, disabled)=>{
    leafletMap.addLayer(featureGroup);
    const bounds = geoBounds !== undefined ? leaflet__WEBPACK_IMPORTED_MODULE_0___default().latLngBounds(leaflet__WEBPACK_IMPORTED_MODULE_0___default().latLng(geoBounds.northEast.latitude, geoBounds.northEast.longitude), leaflet__WEBPACK_IMPORTED_MODULE_0___default().latLng(geoBounds.southWest.latitude, geoBounds.southWest.longitude)) : undefined;
    let rectangle;
    if (bounds !== undefined) {
        rectangle = leaflet__WEBPACK_IMPORTED_MODULE_0___default().rectangle(bounds, {
            stroke: true,
            color: '#3388ff',
            opacity: 0.5,
            fillOpacity: 0.2,
            weight: 4
        });
        featureGroup.addLayer(rectangle);
        leafletMap.fitBounds(bounds);
    }
    if (disabled === true) {
        return;
    }
    const drawControlFull = new (leaflet__WEBPACK_IMPORTED_MODULE_0___default().Control.Draw)({
        position: 'topright',
        draw: {
            polyline: false,
            polygon: false,
            circle: false,
            marker: false,
            circlemarker: false,
            // eslint-disable-next-line
            rectangle: {
                showArea: false
            }
        },
        edit: {
            featureGroup,
            remove: false
        }
    });
    leafletMap.addControl(drawControlFull);
    leafletMap.on((leaflet__WEBPACK_IMPORTED_MODULE_0___default().Draw.Event.CREATED), function(e) {
        featureGroup.clearLayers();
        if (rectangle !== undefined) {
            rectangle.remove();
        }
        const layer = e.layer;
        featureGroup.addLayer(layer);
        if (featureGroup.getLayers().length === 1) {
            if (onChange !== undefined) {
                const ne = layer.getBounds().getNorthEast();
                const sw = layer.getBounds().getSouthWest();
                onChange({
                    northEast: {
                        latitude: ne.lat,
                        longitude: ne.lng
                    },
                    southWest: {
                        latitude: sw.lat,
                        longitude: sw.lng
                    }
                });
            }
        }
    });
    leafletMap.on((leaflet__WEBPACK_IMPORTED_MODULE_0___default().Draw.Event.DELETED), function(e) {
        if (onChange !== undefined) {
            onChange(undefined);
        }
    });
    leafletMap.on((leaflet__WEBPACK_IMPORTED_MODULE_0___default().Draw.Event.EDITRESIZE) + ' ' + (leaflet__WEBPACK_IMPORTED_MODULE_0___default().Draw.Event.EDITMOVE), function(e) {
        if (onChange !== undefined) {
            const ne = e.layer.getBounds().getNorthEast();
            const sw = e.layer.getBounds().getSouthWest();
            onChange({
                northEast: {
                    latitude: ne.lat,
                    longitude: ne.lng
                },
                southWest: {
                    latitude: sw.lat,
                    longitude: sw.lng
                }
            });
        }
    });
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
"./js/src/core/components/geo-map/toolbar/add-geo-point-toolbar.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addGeoPointToolbar: () => (addGeoPointToolbar)
});
/* ESM import */var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/leaflet/dist/leaflet-src.js");
/* ESM import */var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _Pimcore_components_geo_map_utils_geocode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/geo-map/utils/geocode.ts");
/* ESM import */var _Pimcore_components_geo_map_utils_lat_lng_convert__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/geo-map/utils/lat-lng-convert.ts");
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


const addGeoPointToolbar = (leafletMap, featureGroup, reverseGeoCodeUrlTemplate, geoPoint, onChange, disabled)=>{
    leafletMap.addLayer(featureGroup);
    const marker = geoPoint !== undefined ? leaflet__WEBPACK_IMPORTED_MODULE_0___default().marker([
        geoPoint.latitude,
        geoPoint.longitude
    ]) : undefined;
    if (marker !== undefined) {
        featureGroup.addLayer(marker);
    }
    if (disabled === true) {
        return;
    }
    const drawControlFull = new (leaflet__WEBPACK_IMPORTED_MODULE_0___default().Control.Draw)({
        position: 'topright',
        draw: {
            polyline: false,
            polygon: false,
            circle: false,
            rectangle: false,
            circlemarker: false
        },
        edit: {
            featureGroup,
            remove: false
        }
    });
    leafletMap.addControl(drawControlFull);
    leafletMap.on((leaflet__WEBPACK_IMPORTED_MODULE_0___default().Draw.Event.CREATED), async function(e) {
        featureGroup.clearLayers();
        if (marker !== undefined) {
            marker.remove();
        }
        const layer = e.layer;
        featureGroup.addLayer(layer);
        if (featureGroup.getLayers().length === 1) {
            await (0,_Pimcore_components_geo_map_utils_geocode__WEBPACK_IMPORTED_MODULE_1__.reverseGeocode)(layer, reverseGeoCodeUrlTemplate).catch((error)=>{
                console.error(error);
            });
            onChange === null || onChange === void 0 ? void 0 : onChange((0,_Pimcore_components_geo_map_utils_lat_lng_convert__WEBPACK_IMPORTED_MODULE_2__.convertLatLngToGeoPoint)(layer.getLatLng()));
        }
    });
    leafletMap.on('draw:editmove', async function(e) {
        const layer = e.layer;
        await (0,_Pimcore_components_geo_map_utils_geocode__WEBPACK_IMPORTED_MODULE_1__.reverseGeocode)(layer, reverseGeoCodeUrlTemplate).catch((error)=>{
            console.error(error);
        });
        onChange === null || onChange === void 0 ? void 0 : onChange((0,_Pimcore_components_geo_map_utils_lat_lng_convert__WEBPACK_IMPORTED_MODULE_2__.convertLatLngToGeoPoint)(layer.getLatLng()));
    });
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
"./js/src/core/components/geo-map/toolbar/add-geo-poly-line-toolbar.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addGeoPolyLineToolbar: () => (addGeoPolyLineToolbar)
});
/* ESM import */var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/leaflet/dist/leaflet-src.js");
/* ESM import */var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _Pimcore_components_geo_map_utils_lat_lng_convert__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/geo-map/utils/lat-lng-convert.ts");
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

const addGeoPolyLineToolbar = (leafletMap, featureGroup, geoPolyLine, onChange, disabled)=>{
    leafletMap.addLayer(featureGroup);
    const polyLine = geoPolyLine !== undefined ? leaflet__WEBPACK_IMPORTED_MODULE_0___default().polyline((0,_Pimcore_components_geo_map_utils_lat_lng_convert__WEBPACK_IMPORTED_MODULE_1__.convertPolyLineToLatLngs)(geoPolyLine), {
        stroke: true,
        color: '#3388ff',
        opacity: 0.5,
        fillOpacity: 0.2,
        weight: 4
    }) : undefined;
    if (polyLine !== undefined) {
        featureGroup.addLayer(polyLine);
        leafletMap.fitBounds(polyLine.getBounds());
    }
    if (disabled === true) {
        return;
    }
    const drawControlFull = new (leaflet__WEBPACK_IMPORTED_MODULE_0___default().Control.Draw)({
        position: 'topright',
        draw: {
            rectangle: false,
            polygon: false,
            circle: false,
            marker: false,
            circlemarker: false
        },
        edit: {
            featureGroup,
            remove: false
        }
    });
    leafletMap.addControl(drawControlFull);
    leafletMap.on((leaflet__WEBPACK_IMPORTED_MODULE_0___default().Draw.Event.CREATED), function(e) {
        featureGroup.clearLayers();
        if (polyLine !== undefined) {
            polyLine.remove();
        }
        const layer = e.layer;
        featureGroup.addLayer(layer);
        if (featureGroup.getLayers().length === 1) {
            if (onChange !== undefined) {
                onChange((0,_Pimcore_components_geo_map_utils_lat_lng_convert__WEBPACK_IMPORTED_MODULE_1__.convertLatLngsToGeoPoints)(layer.getLatLngs()));
            }
        }
    });
    leafletMap.on((leaflet__WEBPACK_IMPORTED_MODULE_0___default().Draw.Event.DELETED), function(e) {
        if (onChange !== undefined) {
            onChange(undefined);
        }
    });
    leafletMap.on((leaflet__WEBPACK_IMPORTED_MODULE_0___default().Draw.Event.EDITSTOP), function(e) {
        for(const layerId in e.target._layers){
            if (Object.prototype.hasOwnProperty.call(e.target._layers, layerId) === true) {
                const layer = e.target._layers[layerId];
                if (Object.prototype.hasOwnProperty.call(layer, 'edited') === true) {
                    if (onChange !== undefined) {
                        onChange((0,_Pimcore_components_geo_map_utils_lat_lng_convert__WEBPACK_IMPORTED_MODULE_1__.convertLatLngsToGeoPoints)(layer.editing.latlngs[0]));
                    }
                }
            }
        }
    });
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
"./js/src/core/components/geo-map/toolbar/add-geo-polygon-toolbar.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addGeoPolygonToolbar: () => (addGeoPolygonToolbar)
});
/* ESM import */var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/leaflet/dist/leaflet-src.js");
/* ESM import */var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _Pimcore_components_geo_map_utils_lat_lng_convert__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/geo-map/utils/lat-lng-convert.ts");
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

const addGeoPolygonToolbar = (leafletMap, featureGroup, geoPolygon, onChange, disabled)=>{
    leafletMap.addLayer(featureGroup);
    const polygon = geoPolygon !== undefined ? leaflet__WEBPACK_IMPORTED_MODULE_0___default().polygon((0,_Pimcore_components_geo_map_utils_lat_lng_convert__WEBPACK_IMPORTED_MODULE_1__.convertPolyLineToLatLngs)(geoPolygon), {
        stroke: true,
        color: '#3388ff',
        opacity: 0.5,
        fillOpacity: 0.2,
        weight: 4
    }) : undefined;
    if (polygon !== undefined) {
        featureGroup.addLayer(polygon);
        leafletMap.fitBounds(polygon.getBounds());
    }
    if (disabled === true) {
        return;
    }
    const drawControlFull = new (leaflet__WEBPACK_IMPORTED_MODULE_0___default().Control.Draw)({
        position: 'topright',
        draw: {
            circle: false,
            marker: false,
            circlemarker: false,
            rectangle: false,
            polyline: false
        },
        edit: {
            featureGroup,
            remove: false
        }
    });
    leafletMap.addControl(drawControlFull);
    leafletMap.on((leaflet__WEBPACK_IMPORTED_MODULE_0___default().Draw.Event.CREATED), function(e) {
        featureGroup.clearLayers();
        if (polygon !== undefined) {
            polygon.remove();
        }
        const layer = e.layer;
        featureGroup.addLayer(layer);
        if (featureGroup.getLayers().length === 1) {
            if (onChange !== undefined) {
                onChange((0,_Pimcore_components_geo_map_utils_lat_lng_convert__WEBPACK_IMPORTED_MODULE_1__.convertLatLngsToGeoPoints)(layer.getLatLngs()[0]));
            }
        }
    });
    leafletMap.on((leaflet__WEBPACK_IMPORTED_MODULE_0___default().Draw.Event.DELETED), function(e) {
        if (onChange !== undefined) {
            onChange(undefined);
        }
    });
    leafletMap.on((leaflet__WEBPACK_IMPORTED_MODULE_0___default().Draw.Event.EDITSTOP), function(e) {
        for(const layerId in e.target._layers){
            if (Object.prototype.hasOwnProperty.call(e.target._layers, layerId) === true) {
                const layer = e.target._layers[layerId];
                if (Object.prototype.hasOwnProperty.call(layer, 'edited') === true) {
                    if (onChange !== undefined) {
                        onChange((0,_Pimcore_components_geo_map_utils_lat_lng_convert__WEBPACK_IMPORTED_MODULE_1__.convertLatLngsToGeoPoints)(layer.editing.latlngs[0][0]));
                    }
                }
            }
        }
    });
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
"./js/src/core/components/geo-map/utils/geocode.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ERROR_ADDRESS_NOT_FOUND: () => (ERROR_ADDRESS_NOT_FOUND),
  geoCode: () => (geoCode),
  reverseGeocode: () => (reverseGeocode)
});
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
*/ const ERROR_ADDRESS_NOT_FOUND = 'address_not_found';
const geoCode = async (address, geoCodeUrlTemplate)=>{
    const geoCodeUrl = geoCodeUrlTemplate.replace('{q}', encodeURIComponent(address));
    const response = await fetch(geoCodeUrl);
    if (!response.ok) {
        throw new Error(`Failed to fetch reverse geocoding data: ${response.statusText}`);
    }
    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) {
        throw new Error(ERROR_ADDRESS_NOT_FOUND);
    }
    return {
        latitude: parseFloat(data[0].lat),
        longitude: parseFloat(data[0].lon)
    };
};
const reverseGeocode = async (layerObj, reverseGeoCodeUrlTemplate)=>{
    const reverseGeocodeUrl = reverseGeoCodeUrlTemplate.replace('{lat}', layerObj.getLatLng().lat.toString()).replace('{lon}', layerObj.getLatLng().lng.toString());
    await fetch(reverseGeocodeUrl).then(async (response)=>{
        if (response === undefined || response === null) {
            throw new Error('Failed to fetch reverse geocoding data.');
        }
        if (!response.ok) {
            throw new Error(`Failed to fetch reverse geocoding data: ${response.statusText}`);
        }
        const data = await response.json();
        if (typeof data.display_name === 'string') {
            const locationText = data.display_name;
            layerObj.bindTooltip(locationText);
            layerObj.openTooltip();
        }
    });
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
"./js/src/core/components/geo-map/utils/lat-lng-convert.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  convertGeoPointToLatLng: () => (convertGeoPointToLatLng),
  convertLatLngToGeoPoint: () => (convertLatLngToGeoPoint),
  convertLatLngsToGeoPoints: () => (convertLatLngsToGeoPoints),
  convertPolyLineToLatLngs: () => (convertPolyLineToLatLngs)
});
/* ESM import */var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/leaflet/dist/leaflet-src.js");
/* ESM import */var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
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
const convertLatLngToGeoPoint = (latLng)=>{
    return {
        latitude: latLng.lat,
        longitude: latLng.lng
    };
};
const convertGeoPointToLatLng = (geoPoint)=>{
    return new (leaflet__WEBPACK_IMPORTED_MODULE_0___default().LatLng)(geoPoint.latitude, geoPoint.longitude);
};
const convertPolyLineToLatLngs = (polyLine)=>{
    return polyLine.map(convertGeoPointToLatLng);
};
const convertLatLngsToGeoPoints = (latlngs)=>{
    return latlngs.map(convertLatLngToGeoPoint);
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
"./js/src/core/components/geo-point-picker/footer.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  GeoPointPickerFooter: () => (GeoPointPickerFooter)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/form/form.tsx");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/dropdown/dropdown.tsx");
/* ESM import */var _Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/box/box.tsx");
/* ESM import */var _Pimcore_components_geo_point_picker_geo_point_picker_styles__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/geo-point-picker/geo-point-picker.styles.ts");
/* ESM import */var _Pimcore_components_geo_map_components_geo_map_card_footer_geo_map_card_footer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/components/geo-map/components/geo-map-card-footer/geo-map-card-footer.tsx");
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









const GeoPointPickerFooter = (props)=>{
    var _props_value, _props_value1;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation)();
    const { styles } = (0,_Pimcore_components_geo_point_picker_geo_point_picker_styles__WEBPACK_IMPORTED_MODULE_8__.useStyles)();
    const [value, setValue] = react__WEBPACK_IMPORTED_MODULE_1___default().useState({
        latitude: (_props_value = props.value) === null || _props_value === void 0 ? void 0 : _props_value.latitude,
        longitude: (_props_value1 = props.value) === null || _props_value1 === void 0 ? void 0 : _props_value1.longitude
    });
    const [form] = _Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_4__.Form.useForm();
    const valueToGeoPoint = (val)=>{
        if ((val === null || val === void 0 ? void 0 : val.latitude) === undefined || val.longitude === undefined) {
            return undefined;
        }
        return {
            latitude: val.latitude,
            longitude: val.longitude
        };
    };
    const onChange = ()=>{
        var _props_onChange;
        const fieldValues = form.getFieldsValue();
        setValue(fieldValues);
        const newValue = valueToGeoPoint(fieldValues);
        (_props_onChange = props.onChange) === null || _props_onChange === void 0 ? void 0 : _props_onChange.call(props, newValue);
    };
    const emptyValue = ()=>{
        var _props_onChange;
        setValue({
            latitude: undefined,
            longitude: undefined
        });
        form.resetFields();
        (_props_onChange = props.onChange) === null || _props_onChange === void 0 ? void 0 : _props_onChange.call(props, undefined);
    };
    const onSearch = (geoPoint)=>{
        var _props_onChange;
        const newValue = {
            latitude: geoPoint === null || geoPoint === void 0 ? void 0 : geoPoint.latitude,
            longitude: geoPoint === null || geoPoint === void 0 ? void 0 : geoPoint.longitude
        };
        setValue(newValue);
        form.setFieldsValue(newValue);
        (_props_onChange = props.onChange) === null || _props_onChange === void 0 ? void 0 : _props_onChange.call(props, geoPoint);
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        var _props_value, _props_value1;
        const newValue = {
            latitude: (_props_value = props.value) === null || _props_value === void 0 ? void 0 : _props_value.latitude,
            longitude: (_props_value1 = props.value) === null || _props_value1 === void 0 ? void 0 : _props_value1.longitude
        };
        setValue(newValue);
        form.setFieldsValue(newValue);
    }, [
        props.value
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_geo_map_components_geo_map_card_footer_geo_map_card_footer__WEBPACK_IMPORTED_MODULE_9__.GeoMapCardFooter, {
        disabled: props.disabled,
        dropdown: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_6__.Dropdown, {
            menu: {
                items: [
                    {
                        key: 'form',
                        type: 'custom',
                        component: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_7__.Box, {
                            margin: {
                                x: 'extra-small'
                            },
                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_4__.Form, {
                                className: styles.geoForm,
                                form: form,
                                layout: "vertical",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_4__.Form.Item, {
                                        label: t('latitude'),
                                        name: "latitude",
                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.InputNumber, {
                                            disabled: props.disabled,
                                            onChange: onChange
                                        }, void 0, false, {
                                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-point-picker/footer.tsx",
                                            lineNumber: 101,
                                            columnNumber: 25
                                        }, void 0)
                                    }, void 0, false, {
                                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-point-picker/footer.tsx",
                                        lineNumber: 97,
                                        columnNumber: 23
                                    }, void 0),
                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_4__.Form.Item, {
                                        label: t('longitude'),
                                        name: "longitude",
                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.InputNumber, {
                                            disabled: props.disabled,
                                            onChange: onChange
                                        }, void 0, false, {
                                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-point-picker/footer.tsx",
                                            lineNumber: 110,
                                            columnNumber: 25
                                        }, void 0)
                                    }, void 0, false, {
                                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-point-picker/footer.tsx",
                                        lineNumber: 106,
                                        columnNumber: 23
                                    }, void 0)
                                ]
                            }, void 0, true, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-point-picker/footer.tsx",
                                lineNumber: 92,
                                columnNumber: 21
                            }, void 0)
                        }, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-point-picker/footer.tsx",
                            lineNumber: 91,
                            columnNumber: 19
                        }, void 0)
                    }
                ]
            },
            placement: "bottomLeft",
            trigger: [
                'click'
            ],
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Button, {
                icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_5__.Icon, {
                    className: "dropdown-menu__icon",
                    value: "more"
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-point-picker/footer.tsx",
                    lineNumber: 125,
                    columnNumber: 20
                }, void 0),
                onClick: (e)=>{
                    e.stopPropagation();
                }
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-point-picker/footer.tsx",
                lineNumber: 124,
                columnNumber: 11
            }, void 0)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-point-picker/footer.tsx",
            lineNumber: 84,
            columnNumber: 9
        }, void 0),
        emptyValue: emptyValue,
        onSearch: onSearch,
        removeButtonDisabled: value.latitude === undefined && value.longitude === undefined || props.disabled
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-point-picker/footer.tsx",
        lineNumber: 81,
        columnNumber: 5
    }, undefined);
};
_s(GeoPointPickerFooter, "MEmHgkxj+9vwFIFsJfm8AcZnxN4=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation,
        _Pimcore_components_geo_point_picker_geo_point_picker_styles__WEBPACK_IMPORTED_MODULE_8__.useStyles,
        _Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_4__.Form.useForm
    ];
});
_c = GeoPointPickerFooter;
var _c;
$RefreshReg$(_c, "GeoPointPickerFooter");

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
"./js/src/core/components/geo-point-picker/geo-point-picker.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
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
        geoForm: css`
      .ant-input-number {
        width: 138px !important;
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
"./js/src/core/components/geo-point-picker/geo-point-picker.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  GeoPointPicker: () => (GeoPointPicker)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_geo_point_picker_footer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/geo-point-picker/footer.tsx");
/* ESM import */var _Pimcore_components_geo_map_components_geo_map_card_geo_map_card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/geo-map/components/geo-map-card/geo-map-card.tsx");
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



const GeoPointPicker = (param)=>{
    let { ...props } = param;
    _s();
    const [footerValue, setFooterValue] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(props.value ?? undefined);
    const [mapValue, setMapValue] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(props.value ?? undefined);
    const geoMapRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const onChangeFooter = (newValue)=>{
        var _props_onChange;
        setFooterValue(newValue);
        setMapValue(newValue);
        (_props_onChange = props.onChange) === null || _props_onChange === void 0 ? void 0 : _props_onChange.call(props, newValue);
        const geoMapAPI = geoMapRef.current;
        geoMapAPI === null || geoMapAPI === void 0 ? void 0 : geoMapAPI.forceRerender();
    };
    const onChangeMap = (newValue)=>{
        var _props_onChange;
        setFooterValue(newValue);
        (_props_onChange = props.onChange) === null || _props_onChange === void 0 ? void 0 : _props_onChange.call(props, newValue);
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_geo_map_components_geo_map_card_geo_map_card__WEBPACK_IMPORTED_MODULE_3__.GeoMapCard, {
        className: props === null || props === void 0 ? void 0 : props.className,
        disabled: props.disabled,
        footer: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_geo_point_picker_footer__WEBPACK_IMPORTED_MODULE_2__.GeoPointPickerFooter, {
            disabled: props.disabled,
            onChange: onChangeFooter,
            value: footerValue
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-point-picker/geo-point-picker.tsx",
            lineNumber: 54,
            columnNumber: 16
        }, void 0),
        height: props.height,
        lat: props.lat,
        lng: props.lng,
        mapMode: 'geoPoint',
        mapValue: mapValue,
        onChangeMap: onChangeMap,
        ref: geoMapRef,
        width: props.width,
        zoom: props.zoom
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-point-picker/geo-point-picker.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, undefined);
};
_s(GeoPointPicker, "N5yznWqDsrOSP1VFSKp4RezW0oc=");
_c = GeoPointPicker;
var _c;
$RefreshReg$(_c, "GeoPointPicker");

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
"./js/src/core/components/geo-poly-drawer/footer.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  GeoPolyDrawerFooter: () => (GeoPolyDrawerFooter)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_geo_map_components_geo_map_card_footer_geo_map_card_footer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/geo-map/components/geo-map-card-footer/geo-map-card-footer.tsx");
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


const GeoPolyDrawerFooter = (props)=>{
    _s();
    const [value, setValue] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(props.value);
    const emptyValue = ()=>{
        setValue(undefined);
        if (props.onChange !== undefined) {
            props.onChange(undefined);
        }
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setValue(props.value);
    }, [
        props.value
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_geo_map_components_geo_map_card_footer_geo_map_card_footer__WEBPACK_IMPORTED_MODULE_2__.GeoMapCardFooter, {
        emptyValue: emptyValue,
        onSearch: props.onSearch,
        removeButtonDisabled: value === undefined
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-poly-drawer/footer.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, undefined);
};
_s(GeoPolyDrawerFooter, "Lex4bMt8druqlUQ1vjvidWytV38=");
_c = GeoPolyDrawerFooter;
var _c;
$RefreshReg$(_c, "GeoPolyDrawerFooter");

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
"./js/src/core/components/geo-poly-drawer/geo-poly-drawer.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  GeoPolyDrawer: () => (GeoPolyDrawer)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _footer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/geo-poly-drawer/footer.tsx");
/* ESM import */var _Pimcore_components_geo_map_components_geo_map_card_geo_map_card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/geo-map/components/geo-map-card/geo-map-card.tsx");
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



const GeoPolyDrawer = (param)=>{
    let { ...props } = param;
    _s();
    const [mapValue, setMapValue] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(props.value ?? undefined);
    const [footerValue, setFooterValue] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(props.value ?? undefined);
    const geoMapRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const onChangeFooter = (newValue)=>{
        var _props_onChange;
        setFooterValue(newValue);
        setMapValue(newValue);
        (_props_onChange = props.onChange) === null || _props_onChange === void 0 ? void 0 : _props_onChange.call(props, newValue);
        const geoMapAPI = geoMapRef.current;
        geoMapAPI === null || geoMapAPI === void 0 ? void 0 : geoMapAPI.reset();
        geoMapAPI === null || geoMapAPI === void 0 ? void 0 : geoMapAPI.forceRerender();
    };
    const onChangeMap = (newValue)=>{
        var _props_onChange;
        setFooterValue(newValue);
        (_props_onChange = props.onChange) === null || _props_onChange === void 0 ? void 0 : _props_onChange.call(props, newValue);
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_geo_map_components_geo_map_card_geo_map_card__WEBPACK_IMPORTED_MODULE_3__.GeoMapCard, {
        className: props.className,
        disabled: props.disabled,
        footer: props.disabled === true ? undefined : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_footer__WEBPACK_IMPORTED_MODULE_2__.GeoPolyDrawerFooter, {
            onChange: onChangeFooter,
            onSearch: (geoPoint)=>{
                var _props_onChange;
                setFooterValue(undefined);
                setMapValue(undefined);
                const geoMapAPI = geoMapRef.current;
                geoMapAPI === null || geoMapAPI === void 0 ? void 0 : geoMapAPI.setValue(undefined);
                if (geoPoint === undefined) {
                    geoMapAPI === null || geoMapAPI === void 0 ? void 0 : geoMapAPI.reset();
                } else {
                    geoMapAPI === null || geoMapAPI === void 0 ? void 0 : geoMapAPI.setLat(geoPoint.latitude);
                    geoMapAPI === null || geoMapAPI === void 0 ? void 0 : geoMapAPI.setLng(geoPoint.longitude);
                    geoMapAPI === null || geoMapAPI === void 0 ? void 0 : geoMapAPI.setZoom(15);
                }
                geoMapAPI === null || geoMapAPI === void 0 ? void 0 : geoMapAPI.forceRerender();
                (_props_onChange = props.onChange) === null || _props_onChange === void 0 ? void 0 : _props_onChange.call(props, undefined);
            },
            value: footerValue
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-poly-drawer/geo-poly-drawer.tsx",
            lineNumber: 54,
            columnNumber: 11
        }, void 0),
        height: props.height,
        lat: props.lat,
        lng: props.lng,
        mapMode: props.mode,
        mapValue: mapValue,
        onChangeMap: onChangeMap,
        ref: geoMapRef,
        width: props.width,
        zoom: props.zoom
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/geo-poly-drawer/geo-poly-drawer.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, undefined);
};
_s(GeoPolyDrawer, "spjMGwfOzEy16Tvd4ZdyJQXuzcM=");
_c = GeoPolyDrawer;
var _c;
$RefreshReg$(_c, "GeoPolyDrawer");

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
"./js/src/core/components/grid/columns/helpers.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addColumnConfig: () => (addColumnConfig)
});
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
*/ const addColumnConfig = (props, config)=>{
    return {
        ...props,
        column: {
            ...props.column,
            columnDef: {
                ...props.column.columnDef,
                meta: {
                    ...props.column.columnDef.meta,
                    config
                }
            }
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
"./js/src/core/components/hotspot-image/hotspot-image.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
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
        hotspotImage: css`
            position: relative;
            width: fit-content;
            height: auto;
            margin: 0 auto;
            
            .hotspot-image__image {
                width: auto;
                max-width: 100%;
                height: auto;
                display: block;
            }
            
            .hotspot-image__item {
                border-radius: ${token.borderRadius}px;
                color: ${token.colorPrimary};
                background: rgba(215, 199, 236, 0.40);
                border: 3px dashed ${token.colorPrimary};
                border-radius: ${token.borderRadius}px;
                user-select: none;
                cursor: nwse-resize;
                
                &:before {
                    content: '';
                    position: absolute;
                    right: 6px;
                    bottom: 6px;
                    left: 6px;
                    top: 6px;
                    cursor: move;
                }
            }
            
            .hotspot-image__item--marker {
                cursor: move;
                border-width: 1px;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .hotspot-image__item--disabled {
                cursor: default;
                &:before {
                    cursor: default;
                }
            }
            
            .hotspot-image__popover {
            }
        `,
        Popover: css`
            .ant-popover-inner {
                padding: ${token.paddingXS}px;
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
"./js/src/core/components/hotspot-image/hotspot-image.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  HotspotImage: () => (HotspotImage),
  defaultStyleOptions: () => (defaultStyleOptions)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _hotspot_image_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/hotspot-image/hotspot-image.styles.tsx");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var _Pimcore_components_icon_text_button_icon_text_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/icon-text-button/icon-text-button.tsx");
/* ESM import */var _Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/icon-button/icon-button.tsx");
/* ESM import */var _Pimcore_components_hotspot_image_utils_calculate_dimensions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/hotspot-image/utils/calculate-dimensions.ts");
/* ESM import */var _Pimcore_components_hotspot_image_utils_drag__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/hotspot-image/utils/drag.ts");
/* ESM import */var _Pimcore_components_hotspot_image_utils_resize__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/components/hotspot-image/utils/resize.ts");
/* ESM import */var _Pimcore_components_tooltip_tooltip__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/components/tooltip/tooltip.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_12__);
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












const defaultStyleOptions = {
    hotspot: {
        width: 10,
        height: 10,
        resizeBorderSize: 10,
        minSize: 24,
        icon: null
    },
    marker: {
        width: 24,
        height: 24,
        marginLeft: -12,
        marginTop: -19,
        icon: 'location-marker'
    }
};
const HotspotImage = (param)=>{
    let { src, data, styleOptions = defaultStyleOptions, onRemove, onEdit, onClone, onUpdate, disableContextMenu, disabled, disableDrag = false } = param;
    _s();
    const { styles } = (0,_hotspot_image_styles__WEBPACK_IMPORTED_MODULE_2__.useStyle)();
    const [imageLoaded, setImageLoaded] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const imageRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_11__.useTranslation)();
    const [items, setItems] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(data ?? []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setItems(data ?? []);
    }, [
        data === null || data === void 0 ? void 0 : data.length,
        JSON.stringify(data === null || data === void 0 ? void 0 : data.map((item)=>({
                name: item.name,
                data: item.data,
                id: item.id
            })))
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setImageLoaded(false);
    }, [
        src
    ]);
    const [selectedId, setSelectedId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [dragging, setDragging] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [resizeDirection, setResizeDirection] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [dragStart, setDragStart] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        x: 0,
        y: 0
    });
    const [resizeStart, setResizeStart] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        width: 0,
        height: 0,
        x: 0,
        y: 0
    });
    const [popoverOpen, setPopoverOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const containerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const handleMouseDown = (evt, hotspot)=>{
        const rect = evt.currentTarget.getBoundingClientRect();
        const mouseX = evt.clientX - rect.left;
        const mouseY = evt.clientY - rect.top;
        const nearLeftEdge = mouseX < styleOptions[hotspot.type].resizeBorderSize;
        const nearRightEdge = mouseX > rect.width - styleOptions[hotspot.type].resizeBorderSize;
        const nearTopEdge = mouseY < styleOptions[hotspot.type].resizeBorderSize;
        const nearBottomEdge = mouseY > rect.height - styleOptions[hotspot.type].resizeBorderSize;
        if (hotspot.type === 'hotspot' && (nearLeftEdge || nearRightEdge || nearTopEdge || nearBottomEdge)) {
            let direction = '';
            if (nearTopEdge) direction += 'n';
            if (nearBottomEdge) direction += 's';
            if (nearLeftEdge) direction += 'w';
            if (nearRightEdge) direction += 'e';
            setResizeDirection(direction);
            setResizeStart({
                x: evt.clientX,
                y: evt.clientY,
                width: hotspot.width,
                height: hotspot.height
            });
        } else {
            setDragging(true);
            setDragStart({
                x: mouseX,
                y: mouseY
            });
        }
        setPopoverOpen(false);
        setSelectedId(hotspot.id);
        evt.stopPropagation();
    };
    const toNumber = (value)=>{
        const number = Number(value);
        return isNaN(number) ? 0 : number;
    };
    const handleMouseMove = (evt)=>{
        if (selectedId === null || containerRef.current === null || disabled === true) return;
        const containerBounds = containerRef.current.getBoundingClientRect();
        const hotspotIndex = items.findIndex((h)=>h.id === selectedId);
        const dx = evt.clientX - resizeStart.x;
        const dy = evt.clientY - resizeStart.y;
        if (dragging) {
            setItems((0,_Pimcore_components_hotspot_image_utils_drag__WEBPACK_IMPORTED_MODULE_8__.dragItem)(evt, dragStart, containerBounds, items, hotspotIndex, toNumber(styleOptions[items[hotspotIndex].type].marginLeft), toNumber(styleOptions[items[hotspotIndex].type].marginTop)));
        } else if (resizeDirection !== null) {
            setItems((0,_Pimcore_components_hotspot_image_utils_resize__WEBPACK_IMPORTED_MODULE_9__.resizeItem)(evt, resizeStart, resizeDirection, containerBounds, items, hotspotIndex, toNumber(styleOptions[items[hotspotIndex].type].minSize), dx, dy));
        }
    };
    const handleMouseUp = (evt)=>{
        setDragging(false);
        setResizeDirection(null);
        const updatedItem = items.find((h)=>h.id === selectedId);
        const origiinalItem = data === null || data === void 0 ? void 0 : data.find((h)=>h.id === selectedId);
        if (updatedItem !== undefined && !(0,lodash__WEBPACK_IMPORTED_MODULE_12__.isEqual)(updatedItem, origiinalItem)) {
            onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(updatedItem);
        }
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: [
            'hotspot-image',
            styles.hotspotImage
        ].join(' '),
        onMouseMove: !disableDrag ? handleMouseMove : undefined,
        onMouseUp: !disableDrag ? handleMouseUp : undefined,
        ref: containerRef,
        role: "none",
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("img", {
                alt: "",
                className: 'hotspot-image__image',
                onLoad: ()=>{
                    if (imageRef.current !== null) {
                        setImageLoaded(true);
                    }
                },
                ref: imageRef,
                src: src
            }, src, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/hotspot-image/hotspot-image.tsx",
                lineNumber: 178,
                columnNumber: 7
            }, undefined),
            !disableDrag && imageLoaded && containerRef.current !== null && (0,_Pimcore_components_hotspot_image_utils_calculate_dimensions__WEBPACK_IMPORTED_MODULE_7__.convertHotspotsToPixel)(items, containerRef.current.getBoundingClientRect()).map((hotspot)=>{
                var _styleOptions_hotspot_type, _styleOptions_hotspot_type1;
                return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_4__.Popover, {
                    arrow: false,
                    content: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                        children: [
                            onEdit !== undefined ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_text_button_icon_text_button__WEBPACK_IMPORTED_MODULE_5__.IconTextButton, {
                                icon: {
                                    value: 'new'
                                },
                                onClick: ()=>{
                                    onEdit(hotspot);
                                },
                                type: "default",
                                children: t('hotspots-markers-modal.edit-button')
                            }, void 0, false, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/hotspot-image/hotspot-image.tsx",
                                lineNumber: 198,
                                columnNumber: 21
                            }, void 0) : null,
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_tooltip_tooltip__WEBPACK_IMPORTED_MODULE_10__.Tooltip, {
                                title: t('remove'),
                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_6__.IconButton, {
                                    icon: {
                                        value: 'trash'
                                    },
                                    onClick: ()=>{
                                        onRemove === null || onRemove === void 0 ? void 0 : onRemove(hotspot.id);
                                    },
                                    type: 'link'
                                }, void 0, false, {
                                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/hotspot-image/hotspot-image.tsx",
                                    lineNumber: 207,
                                    columnNumber: 19
                                }, void 0)
                            }, void 0, false, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/hotspot-image/hotspot-image.tsx",
                                lineNumber: 206,
                                columnNumber: 17
                            }, void 0),
                            onClone !== undefined ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_tooltip_tooltip__WEBPACK_IMPORTED_MODULE_10__.Tooltip, {
                                title: t('clone'),
                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_6__.IconButton, {
                                    icon: {
                                        value: 'content-duplicate'
                                    },
                                    onClick: ()=>{
                                        onClone(hotspot.id);
                                    },
                                    type: 'link'
                                }, void 0, false, {
                                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/hotspot-image/hotspot-image.tsx",
                                    lineNumber: 217,
                                    columnNumber: 23
                                }, void 0)
                            }, void 0, false, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/hotspot-image/hotspot-image.tsx",
                                lineNumber: 216,
                                columnNumber: 21
                            }, void 0) : null
                        ]
                    }, void 0, true),
                    onOpenChange: (open)=>{
                        setPopoverOpen(open);
                    },
                    open: popoverOpen && selectedId === hotspot.id,
                    overlayClassName: [
                        styles.Popover
                    ].join(' '),
                    trigger: disableContextMenu === true || disabled === true ? [] : [
                        'contextMenu'
                    ],
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("button", {
                        className: `hotspot-image__item ${hotspot.type === 'marker' ? 'hotspot-image__item--marker' : ''} ${disabled === true ? 'hotspot-image__item--disabled' : ''}`,
                        onMouseDown: (evt)=>{
                            handleMouseDown(evt, hotspot);
                        },
                        style: {
                            position: 'absolute',
                            left: `${hotspot.x}px`,
                            top: `${hotspot.y}px`,
                            width: `${hotspot.width}px`,
                            height: `${hotspot.height}px`,
                            marginTop: styleOptions[hotspot.type].marginTop === undefined ? undefined : `${styleOptions[hotspot.type].marginTop}px`,
                            marginLeft: styleOptions[hotspot.type].marginLeft === undefined ? undefined : `${styleOptions[hotspot.type].marginLeft}px`
                        },
                        type: 'button',
                        children: ((_styleOptions_hotspot_type = styleOptions[hotspot.type]) === null || _styleOptions_hotspot_type === void 0 ? void 0 : _styleOptions_hotspot_type.icon) !== undefined && ((_styleOptions_hotspot_type1 = styleOptions[hotspot.type]) === null || _styleOptions_hotspot_type1 === void 0 ? void 0 : _styleOptions_hotspot_type1.icon) !== null ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__.Icon, {
                            value: styleOptions[hotspot.type].icon
                        }, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/hotspot-image/hotspot-image.tsx",
                            lineNumber: 251,
                            columnNumber: 19
                        }, undefined) : null
                    }, hotspot.id, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/hotspot-image/hotspot-image.tsx",
                        lineNumber: 234,
                        columnNumber: 13
                    }, undefined)
                }, hotspot.id, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/hotspot-image/hotspot-image.tsx",
                    lineNumber: 192,
                    columnNumber: 11
                }, undefined);
            })
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/hotspot-image/hotspot-image.tsx",
        lineNumber: 171,
        columnNumber: 5
    }, undefined);
};
_s(HotspotImage, "RmXqBuepZcmh5Q8sqPmxN/YPL1c=", false, function() {
    return [
        _hotspot_image_styles__WEBPACK_IMPORTED_MODULE_2__.useStyle,
        react_i18next__WEBPACK_IMPORTED_MODULE_11__.useTranslation
    ];
});
_c = HotspotImage;
var _c;
$RefreshReg$(_c, "HotspotImage");

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
"./js/src/core/components/hotspot-image/utils/calculate-dimensions.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  convertHotspotToPercent: () => (convertHotspotToPercent),
  convertHotspotToPixel: () => (convertHotspotToPixel),
  convertHotspotsToPixel: () => (convertHotspotsToPixel)
});
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
*/ const convertHotspotToPixel = (hotspot, containerBounds)=>{
    return {
        ...hotspot,
        x: percentToPixel(hotspot.x, containerBounds.width),
        y: percentToPixel(hotspot.y, containerBounds.height),
        width: hotspot.type === 'marker' ? hotspot.width : percentToPixel(hotspot.width, containerBounds.width),
        height: hotspot.type === 'marker' ? hotspot.height : percentToPixel(hotspot.height, containerBounds.height)
    };
};
const convertHotspotsToPixel = (hotspots, containerBounds)=>{
    return hotspots.map((hotspot)=>convertHotspotToPixel(hotspot, containerBounds));
};
const convertHotspotToPercent = (hotspot, containerBounds)=>{
    return {
        ...hotspot,
        x: pixelToPercent(hotspot.x, containerBounds.width),
        y: pixelToPercent(hotspot.y, containerBounds.height),
        width: hotspot.type === 'marker' ? hotspot.width : pixelToPercent(hotspot.width, containerBounds.width),
        height: hotspot.type === 'marker' ? hotspot.height : pixelToPercent(hotspot.height, containerBounds.height)
    };
};
const percentToPixel = (percent, dimension)=>{
    return dimension * percent / 100;
};
const pixelToPercent = (pixel, dimension)=>{
    return pixel * 100 / dimension;
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
"./js/src/core/components/hotspot-image/utils/drag.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  dragItem: () => (dragItem)
});
/* ESM import */var _Pimcore_components_hotspot_image_utils_calculate_dimensions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/components/hotspot-image/utils/calculate-dimensions.ts");
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
const dragItem = (evt, dragStart, containerBounds, hotspots, hotspotIndex, marginLeft, marginTop)=>{
    const hotspot = (0,_Pimcore_components_hotspot_image_utils_calculate_dimensions__WEBPACK_IMPORTED_MODULE_0__.convertHotspotToPixel)(hotspots[hotspotIndex], containerBounds);
    const newX = Math.min(containerBounds.width - hotspot.width, Math.max(0, evt.clientX - containerBounds.left - dragStart.x)) - marginLeft;
    const newY = Math.min(containerBounds.height - hotspot.height, Math.max(0, evt.clientY - containerBounds.top - dragStart.y)) - marginTop;
    return hotspots.map((h, i)=>i === hotspotIndex ? (0,_Pimcore_components_hotspot_image_utils_calculate_dimensions__WEBPACK_IMPORTED_MODULE_0__.convertHotspotToPercent)({
            ...h,
            x: newX,
            y: newY,
            width: hotspot.width,
            height: hotspot.height
        }, containerBounds) : h);
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
"./js/src/core/components/hotspot-image/utils/resize.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  resizeItem: () => (resizeItem)
});
/* ESM import */var _Pimcore_components_hotspot_image_utils_calculate_dimensions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/components/hotspot-image/utils/calculate-dimensions.ts");
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
const resizeItem = (evt, resizeStart, resizeDirection, containerBounds, hotspots, hotspotIndex, minSize, dx, dy)=>{
    const hotspot = (0,_Pimcore_components_hotspot_image_utils_calculate_dimensions__WEBPACK_IMPORTED_MODULE_0__.convertHotspotToPixel)(hotspots[hotspotIndex], containerBounds);
    let newWidth = resizeStart.width;
    let newHeight = resizeStart.height;
    let newX = hotspot.x;
    let newY = hotspot.y;
    if ((resizeDirection === null || resizeDirection === void 0 ? void 0 : resizeDirection.includes('w')) === true) {
        ({ newWidth, newX } = handleWestResize(resizeStart, hotspot, dx, evt, containerBounds, minSize));
    }
    if ((resizeDirection === null || resizeDirection === void 0 ? void 0 : resizeDirection.includes('e')) === true) {
        newWidth = Math.min(containerBounds.width - hotspot.x, Math.max(minSize, resizeStart.width + dx));
    }
    if ((resizeDirection === null || resizeDirection === void 0 ? void 0 : resizeDirection.includes('n')) === true) {
        ({ newHeight, newY } = handleNorthResize(resizeStart, hotspot, dy, evt, containerBounds, minSize));
    }
    if ((resizeDirection === null || resizeDirection === void 0 ? void 0 : resizeDirection.includes('s')) === true) {
        newHeight = Math.max(minSize, resizeStart.height + dy);
    }
    return hotspots.map((h, i)=>i === hotspotIndex ? (0,_Pimcore_components_hotspot_image_utils_calculate_dimensions__WEBPACK_IMPORTED_MODULE_0__.convertHotspotToPercent)({
            ...h,
            x: newX,
            y: newY,
            width: newWidth,
            height: newHeight
        }, containerBounds) : h);
};
const handleWestResize = (resizeStart, hotspot, dx, evt, containerBounds, minSize)=>{
    const newWidth = Math.max(minSize, resizeStart.width - dx);
    let newX = Math.min(hotspot.x + resizeStart.width - minSize, evt.clientX - containerBounds.left);
    if (newWidth === minSize) {
        newX = hotspot.x + hotspot.width - minSize;
    }
    return {
        newWidth,
        newX
    };
};
const handleNorthResize = (resizeStart, hotspot, dy, evt, containerBounds, minSize)=>{
    const newHeight = Math.max(minSize, resizeStart.height - dy);
    let newY = Math.min(hotspot.y + resizeStart.height - minSize, evt.clientY - containerBounds.top);
    if (newHeight === minSize) {
        newY = hotspot.y + hotspot.height - minSize;
    }
    return {
        newHeight,
        newY
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
"./js/src/core/components/image-preview/components/dropdown/dropdown.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
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
        dotsButton: css`
      position: absolute;
      top: ${token.paddingXXS}px;
      right: ${token.paddingXXS}px;
      
      // todo: remove this when loading animation in button is fixed
      & > div {
        display:none;
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
"./js/src/core/components/image-preview/components/dropdown/dropdown.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ImagePreviewDropdown: () => (ImagePreviewDropdown)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/dropdown/dropdown.tsx");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/button/button.tsx");
/* ESM import */var _dropdown_styles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/image-preview/components/dropdown/dropdown.styles.tsx");
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





const ImagePreviewDropdown = (props)=>{
    _s();
    const { styles } = (0,_dropdown_styles__WEBPACK_IMPORTED_MODULE_5__.useStyle)();
    if (props.dropdownItems === undefined || props.dropdownItems.length === 0) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}, void 0, false);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_2__.Dropdown, {
        menu: {
            items: props.dropdownItems
        },
        placement: "bottomLeft",
        trigger: [
            'click'
        ],
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_4__.Button, {
            className: styles.dotsButton,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__.Icon, {
                className: "dropdown-menu__icon",
                value: "more"
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/image-preview/components/dropdown/dropdown.tsx",
                lineNumber: 41,
                columnNumber: 16
            }, void 0),
            onClick: (e)=>{
                e.stopPropagation();
            },
            size: "small"
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/image-preview/components/dropdown/dropdown.tsx",
            lineNumber: 39,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/image-preview/components/dropdown/dropdown.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, undefined);
};
_s(ImagePreviewDropdown, "4AcVho8W1Y+Yfard/v4lDs8ZRDQ=", false, function() {
    return [
        _dropdown_styles__WEBPACK_IMPORTED_MODULE_5__.useStyle
    ];
});
_c = ImagePreviewDropdown;
var _c;
$RefreshReg$(_c, "ImagePreviewDropdown");

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
"./js/src/core/components/image-preview/image-preview.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
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
        imagePreviewContainer: css`
      display: flex;
      justify-content: center;
      align-items: center;
      max-width: 100%;
      position: relative;
      
      .ant-image {
        height: 100%;
        width: 100%;

        .ant-image-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
      
      &.image-preview-bordered {
        outline: 1px solid ${token.colorBorderSecondary};
        border-radius: ${token.borderRadius}px;
        .ant-image-img {
           border-radius: ${token.borderRadius}px;
        }
      }
        
    `,
        hotspotButton: css`
      position: absolute;
      top: ${token.paddingXXS}px;
      left: ${token.paddingXXS}px;
      // todo: remove this when loading animation in button is fixed
      & > div {
        display:none;
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
"./js/src/core/components/image-preview/image-preview.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ImagePreview: () => (ImagePreview),
  createImageThumbnailUrl: () => (/* reexport safe */ _utils_custom_image_thumbnail__WEBPACK_IMPORTED_MODULE_15__.createImageThumbnailUrl)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _image_preview_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/image-preview/image-preview.styles.tsx");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/classnames/index.js");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/utils/css.tsx");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_5__);
/* ESM import */var _Pimcore_app_api_pimcore_route__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/app/api/pimcore/route.ts");
/* ESM import */var _Pimcore_components_drag_and_drop_hooks_use_droppable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/drag-and-drop/hooks/use-droppable.tsx");
/* ESM import */var _Pimcore_components_spin_spin__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/spin/spin.tsx");
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var _Pimcore_components_image_preview_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/components/image-preview/components/dropdown/dropdown.tsx");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/components/button/button.tsx");
/* ESM import */var _Pimcore_components_tooltip_tooltip__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/components/tooltip/tooltip.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _utils_custom_image_thumbnail__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./js/src/core/components/image-preview/utils/custom-image-thumbnail.ts");
/* ESM import */var _Pimcore_utils_hooks_use_element_visible__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("./js/src/core/utils/hooks/use-element-visible.ts");
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
















const ImagePreview = /*#__PURE__*/ _s((0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(_c = _s(function ImagePreview(param, ref) {
    let { src, assetId, assetType, width, height, className, style, dropdownItems, bordered = false, onHotspotsDataButtonClick, thumbnailSettings } = param;
    _s();
    const [key, setKey] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(0);
    const [thumbnailDimensions, setThumbnailDimensions] = react__WEBPACK_IMPORTED_MODULE_1___default().useState({
        width: 0,
        height: 0
    });
    const { getStateClasses } = (0,_Pimcore_components_drag_and_drop_hooks_use_droppable__WEBPACK_IMPORTED_MODULE_7__.useDroppable)();
    const { styles } = (0,_image_preview_styles__WEBPACK_IMPORTED_MODULE_2__.useStyle)();
    const wrapperRef = react__WEBPACK_IMPORTED_MODULE_1___default().useRef(null);
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_14__.useTranslation)();
    const getAssetPreviewUrl = ()=>{
        const { width, height } = thumbnailDimensions;
        if (width === 0 || height === 0) {
            return undefined;
        }
        if (assetType === 'video') {
            return `${(0,_Pimcore_app_api_pimcore_route__WEBPACK_IMPORTED_MODULE_6__.getPrefix)()}/assets/${assetId}/video/stream/image-thumbnail?width=${width}&height=${height}&frame=true&aspectRatio=true`;
        }
        const defaultSettings = {
            width,
            height,
            mimeType: 'JPEG',
            frame: true
        };
        return (0,_utils_custom_image_thumbnail__WEBPACK_IMPORTED_MODULE_15__.createImageThumbnailUrl)(assetId, {
            ...defaultSettings,
            ...thumbnailSettings
        });
    };
    const imageSrc = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        return assetId !== undefined ? getAssetPreviewUrl() : src;
    }, [
        assetId,
        src,
        thumbnailDimensions,
        assetType,
        thumbnailSettings
    ]);
    const isVisible = (0,_Pimcore_utils_hooks_use_element_visible__WEBPACK_IMPORTED_MODULE_16__["default"])(wrapperRef);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (isVisible && (wrapperRef === null || wrapperRef === void 0 ? void 0 : wrapperRef.current) !== null && (wrapperRef === null || wrapperRef === void 0 ? void 0 : wrapperRef.current) !== undefined) {
            setThumbnailDimensions({
                width: wrapperRef.current.offsetWidth,
                height: wrapperRef.current.offsetHeight
            });
        }
    }, [
        isVisible,
        width,
        height
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setKey(key + 1);
    }, [
        imageSrc
    ]);
    const loadingSpinner = /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_9__.Flex, {
        align: "center",
        className: "h-full",
        justify: "center",
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_spin_spin__WEBPACK_IMPORTED_MODULE_8__.Spin, {
            size: "small"
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/image-preview/image-preview.tsx",
            lineNumber: 103,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/image-preview/image-preview.tsx",
        lineNumber: 98,
        columnNumber: 5
    }, this);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        ref: ref,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
            className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(className, styles.imagePreviewContainer, bordered ? 'image-preview-bordered' : undefined, ...getStateClasses()),
            ref: wrapperRef,
            style: {
                ...style,
                height: (0,_Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_4__.toCssDimension)(height),
                width: (0,_Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_4__.toCssDimension)(width)
            },
            children: [
                imageSrc !== undefined && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_5__.Image, {
                    className: "w-full",
                    fallback: "/bundles/pimcorestudioui/img/fallback-image.svg",
                    placeholder: loadingSpinner,
                    preview: false,
                    src: imageSrc
                }, key, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/image-preview/image-preview.tsx",
                    lineNumber: 119,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_image_preview_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_10__.ImagePreviewDropdown, {
                    dropdownItems: dropdownItems
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/image-preview/image-preview.tsx",
                    lineNumber: 129,
                    columnNumber: 9
                }, this),
                onHotspotsDataButtonClick !== undefined && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_tooltip_tooltip__WEBPACK_IMPORTED_MODULE_13__.Tooltip, {
                    className: styles.hotspotButton,
                    title: t('hotspots.has-hotspots-or-marker'),
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_12__.Button, {
                        className: styles.hotspotButton,
                        icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_11__.Icon, {
                            value: "location-marker"
                        }, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/image-preview/image-preview.tsx",
                            lineNumber: 138,
                            columnNumber: 22
                        }, void 0),
                        onClick: onHotspotsDataButtonClick,
                        size: "small"
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/image-preview/image-preview.tsx",
                        lineNumber: 136,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/image-preview/image-preview.tsx",
                    lineNumber: 132,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/image-preview/image-preview.tsx",
            lineNumber: 109,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/image-preview/image-preview.tsx",
        lineNumber: 108,
        columnNumber: 5
    }, this);
}, "UXkhMCGpyU5oqTjAUyiZb837z+4=", false, function() {
    return [
        _Pimcore_components_drag_and_drop_hooks_use_droppable__WEBPACK_IMPORTED_MODULE_7__.useDroppable,
        _image_preview_styles__WEBPACK_IMPORTED_MODULE_2__.useStyle,
        react_i18next__WEBPACK_IMPORTED_MODULE_14__.useTranslation,
        _Pimcore_utils_hooks_use_element_visible__WEBPACK_IMPORTED_MODULE_16__["default"]
    ];
})), "UXkhMCGpyU5oqTjAUyiZb837z+4=", false, function() {
    return [
        _Pimcore_components_drag_and_drop_hooks_use_droppable__WEBPACK_IMPORTED_MODULE_7__.useDroppable,
        _image_preview_styles__WEBPACK_IMPORTED_MODULE_2__.useStyle,
        react_i18next__WEBPACK_IMPORTED_MODULE_14__.useTranslation,
        _Pimcore_utils_hooks_use_element_visible__WEBPACK_IMPORTED_MODULE_16__["default"]
    ];
});
_c1 = ImagePreview;

var _c, _c1;
$RefreshReg$(_c, "ImagePreview$forwardRef");
$RefreshReg$(_c1, "ImagePreview");

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
"./js/src/core/components/image-preview/utils/custom-image-thumbnail.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  createImageThumbnailUrl: () => (createImageThumbnailUrl)
});
/* ESM import */var _Pimcore_app_api_pimcore_route__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/route.ts");
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
const createImageThumbnailUrl = (assetId, settings)=>{
    const { mimeType, resizeMode = 'none', width, height, quality, dpi, contain = false, frame = false, cover = false, forceResize = false, cropWidth, cropHeight, cropTop, cropLeft, cropPercent = false } = settings;
    const params = new URLSearchParams();
    if (mimeType !== undefined) {
        params.append('mimeType', mimeType);
    }
    params.append('resizeMode', resizeMode);
    if (width !== undefined) {
        params.append('width', width.toString());
    }
    if (height !== undefined) {
        params.append('height', height.toString());
    }
    if (quality !== undefined) {
        params.append('quality', quality.toString());
    }
    if (dpi !== undefined) {
        params.append('dpi', dpi.toString());
    }
    if (contain) {
        params.append('contain', contain.toString());
    }
    if (frame) {
        params.append('frame', frame.toString());
    }
    if (cover) {
        params.append('cover', cover.toString());
    }
    if (forceResize) {
        params.append('forceResize', forceResize.toString());
    }
    if (cropPercent) {
        params.append('cropPercent', cropPercent.toString());
    }
    if (cropWidth !== undefined) {
        params.append('cropWidth', Math.round(cropWidth).toString());
    }
    if (cropHeight !== undefined) {
        params.append('cropHeight', Math.round(cropHeight).toString());
    }
    if (cropTop !== undefined) {
        params.append('cropTop', Math.round(cropTop).toString());
    }
    if (cropLeft !== undefined) {
        params.append('cropLeft', Math.round(cropLeft).toString());
    }
    return `${(0,_Pimcore_app_api_pimcore_route__WEBPACK_IMPORTED_MODULE_0__.getPrefix)()}/assets/${assetId}/image/stream/custom?${params.toString()}`;
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
"./js/src/core/components/inheritance-overlay/inheritance-overlay.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  InheritanceOverlay: () => (InheritanceOverlay)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_inheritance_overlay_hooks_use_inheritance_overlay_style__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/inheritance-overlay/hooks/use-inheritance-overlay-style.ts");
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



const InheritanceOverlay = (props)=>{
    _s();
    const style = (0,_Pimcore_components_inheritance_overlay_hooks_use_inheritance_overlay_style__WEBPACK_IMPORTED_MODULE_2__.useInheritanceOverlayStyle)(props);
    if (style === undefined) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}, void 0, false);
    }
    const classNames = classnames__WEBPACK_IMPORTED_MODULE_3___default()('inheritance-overlay', style, props.className);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
        className: classNames,
        children: props.children
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/inheritance-overlay/inheritance-overlay.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, undefined);
};
_s(InheritanceOverlay, "w9VgtVhTshY9MTZjkLvXig/zB1M=", false, function() {
    return [
        _Pimcore_components_inheritance_overlay_hooks_use_inheritance_overlay_style__WEBPACK_IMPORTED_MODULE_2__.useInheritanceOverlayStyle
    ];
});
_c = InheritanceOverlay;
var _c;
$RefreshReg$(_c, "InheritanceOverlay");

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
"./js/src/core/components/input-number/input-number.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
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
        inputNumber: css`
      &.versionFieldItemHighlight {
        background-color: ${token.Colors.Brand.Warning.colorWarningBg} !important;
      }
    `,
        inherited: css`
      background: ${token.colorBgContainerDisabled};
      color: ${token.colorTextDisabled};
      &:focus-within, &:hover {
        background: ${token.colorBgContainerDisabled};
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
"./js/src/core/components/input-number/input-number.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  InputNumber: () => (InputNumber)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/classnames/index.js");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _input_number_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/input-number/input-number.styles.tsx");
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




const InputNumber = (param)=>{
    let { inherited, className, ...restProps } = param;
    _s();
    const { styles } = (0,_input_number_styles__WEBPACK_IMPORTED_MODULE_4__.useStyles)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.InputNumber, {
        className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(styles.inputNumber, className, {
            [styles.inherited]: inherited
        }),
        ...restProps
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/input-number/input-number.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, undefined);
};
_s(InputNumber, "1BGFRu6BGAbhzJ8kKgs1GUjvI6w=", false, function() {
    return [
        _input_number_styles__WEBPACK_IMPORTED_MODULE_4__.useStyles
    ];
});
_c = InputNumber;
var _c;
$RefreshReg$(_c, "InputNumber");

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
"./js/src/core/components/input-password/input-password.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
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
        input: css`
      &.ant-input-disabled {
        &.versionFieldItemHighlight {
          background-color: ${token.Colors.Brand.Warning.colorWarningBg} !important;
        }
      }
    `,
        inherited: css`
      background: ${token.colorBgContainerDisabled};
      color: ${token.colorTextDisabled};
      &:focus-within, &:hover {
        background: ${token.colorBgContainerDisabled};
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
"./js/src/core/components/input-password/input-password.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  InputPassword: () => (InputPassword)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/classnames/index.js");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _input_password_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/input-password/input-password.styles.tsx");
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




const InputPassword = (param)=>{
    let { inherited, className, ...restProps } = param;
    _s();
    const { styles } = (0,_input_password_styles__WEBPACK_IMPORTED_MODULE_4__.useStyles)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Input.Password, {
        className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(styles.input, className, {
            [styles.inherited]: inherited
        }),
        ...restProps
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/input-password/input-password.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, undefined);
};
_s(InputPassword, "1BGFRu6BGAbhzJ8kKgs1GUjvI6w=", false, function() {
    return [
        _input_password_styles__WEBPACK_IMPORTED_MODULE_4__.useStyles
    ];
});
_c = InputPassword;
var _c;
$RefreshReg$(_c, "InputPassword");

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
"./js/src/core/components/input/input.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
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
        input: css`
      &.ant-input-disabled {
        &.versionFieldItem {
          color: ${token.colorText} !important;
          border-color: transparent !important;
        }
        
        &.versionFieldItemHighlight {
          border-color: ${token.colorBorder} !important;
          background-color: ${token.Colors.Brand.Warning.colorWarningBg} !important;
        }
      }
    `,
        inherited: css`
      background: ${token.colorBgContainerDisabled};
      color: ${token.colorTextDisabled};
      &:focus-within, &:hover {
        background: ${token.colorBgContainerDisabled};
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
"./js/src/core/components/input/input.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Input: () => (Input)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/classnames/index.js");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _input_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/input/input.styles.tsx");
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




const Input = /*#__PURE__*/ _s(react__WEBPACK_IMPORTED_MODULE_1___default().forwardRef(_c = _s(function Input(param, ref) {
    let { inherited, className, ...restProps } = param;
    _s();
    const { styles } = (0,_input_styles__WEBPACK_IMPORTED_MODULE_4__.useStyles)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Input, {
        className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(styles.input, className, {
            [styles.inherited]: inherited
        }),
        ref: ref,
        ...restProps
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/input/input.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}, "1BGFRu6BGAbhzJ8kKgs1GUjvI6w=", false, function() {
    return [
        _input_styles__WEBPACK_IMPORTED_MODULE_4__.useStyles
    ];
})), "1BGFRu6BGAbhzJ8kKgs1GUjvI6w=", false, function() {
    return [
        _input_styles__WEBPACK_IMPORTED_MODULE_4__.useStyles
    ];
});
_c1 = Input;
var _c, _c1;
$RefreshReg$(_c, "Input$React.forwardRef");
$RefreshReg$(_c1, "Input");

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
"./js/src/core/components/modal/alert-modal/hooks/use-alert-modal.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useAlertModal: () => (useAlertModal)
});
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
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
*/ var _s = $RefreshSig$();




const useAlertModal = ()=>{
    _s();
    const { modal } = antd__WEBPACK_IMPORTED_MODULE_0__.App.useApp();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)();
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>({
            info: (param)=>{
                let { title, content } = param;
                return modal.info({
                    title: !(0,lodash__WEBPACK_IMPORTED_MODULE_3__.isUndefined)(title) ? t(title) : t('info'),
                    content
                });
            },
            error: (param)=>{
                let { title, content } = param;
                return modal.error({
                    title: !(0,lodash__WEBPACK_IMPORTED_MODULE_3__.isUndefined)(title) ? t(title) : t('error'),
                    content
                });
            },
            warn: (param)=>{
                let { title, content } = param;
                return modal.warning({
                    title: !(0,lodash__WEBPACK_IMPORTED_MODULE_3__.isUndefined)(title) ? t(title) : t('warning'),
                    content
                });
            },
            success: (param)=>{
                let { title, content } = param;
                return modal.success({
                    title: !(0,lodash__WEBPACK_IMPORTED_MODULE_3__.isUndefined)(title) ? t(title) : t('success'),
                    content
                });
            }
        }), []);
};
_s(useAlertModal, "TcmdpjKYzPndyZz4/qvRAK+gRlQ=", false, function() {
    return [
        antd__WEBPACK_IMPORTED_MODULE_0__.App.useApp,
        react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation
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
"./js/src/core/components/modal/upload-modal/components/upload-modal/upload-modal.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  UploadModal: () => (UploadModal)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_components_modal_modal_title_modal_title__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/modal/modal-title/modal-title.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var antd_es_upload_UploadList__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./node_modules/antd/es/upload/UploadList/index.js");
/* ESM import */var _Pimcore_components_alert_alert__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/alert/alert.tsx");
/* ESM import */var _Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/button/button.tsx");
/* ESM import */var _Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/box/box.tsx");
/* ESM import */var _Pimcore_components_spin_spin__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/spin/spin.tsx");
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var _Pimcore_components_text_text__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/components/text/text.tsx");
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











const UploadModal = (props)=>{
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_1__.Modal, {
        // onCancel={ () => { props.setOpen(false) } }
        // onOk={ () => { form.submit() } }
        closable: false,
        footer: null,
        open: props.open,
        title: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_modal_modal_title_modal_title__WEBPACK_IMPORTED_MODULE_3__.ModalTitle, {
            iconName: "upload-cloud",
            children: t('upload')
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/modal/upload-modal/components/upload-modal/upload-modal.tsx",
            lineNumber: 46,
            columnNumber: 9
        }, void 0),
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_7__.Box, {
                margin: {
                    bottom: 'small'
                },
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_1__.Upload, {
                    openFileDialogOnClick: false,
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd_es_upload_UploadList__WEBPACK_IMPORTED_MODULE_11__["default"], {
                        items: props.fileList,
                        listType: "text",
                        locale: {
                            uploading: 'Uploading...'
                        },
                        showRemoveIcon: false
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/modal/upload-modal/components/upload-modal/upload-modal.tsx",
                        lineNumber: 53,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/modal/upload-modal/components/upload-modal/upload-modal.tsx",
                    lineNumber: 50,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/modal/upload-modal/components/upload-modal/upload-modal.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, undefined),
            props.showProcessing && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_7__.Box, {
                margin: {
                    top: 'small'
                },
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_alert_alert__WEBPACK_IMPORTED_MODULE_5__.Alert, {
                    message: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_9__.Flex, {
                        gap: "small",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_spin_spin__WEBPACK_IMPORTED_MODULE_8__.Spin, {
                                size: "small"
                            }, void 0, false, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/modal/upload-modal/components/upload-modal/upload-modal.tsx",
                                lineNumber: 67,
                                columnNumber: 17
                            }, void 0),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_text_text__WEBPACK_IMPORTED_MODULE_10__.Text, {
                                type: "secondary",
                                children: t('processing')
                            }, void 0, false, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/modal/upload-modal/components/upload-modal/upload-modal.tsx",
                                lineNumber: 70,
                                columnNumber: 17
                            }, void 0)
                        ]
                    }, void 0, true, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/modal/upload-modal/components/upload-modal/upload-modal.tsx",
                        lineNumber: 66,
                        columnNumber: 15
                    }, void 0),
                    type: "info"
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/modal/upload-modal/components/upload-modal/upload-modal.tsx",
                    lineNumber: 64,
                    columnNumber: 11
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/modal/upload-modal/components/upload-modal/upload-modal.tsx",
                lineNumber: 63,
                columnNumber: 9
            }, undefined),
            props.showUploadError && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_7__.Box, {
                margin: {
                    top: 'extra-small'
                },
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_alert_alert__WEBPACK_IMPORTED_MODULE_5__.Alert, {
                    action: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_6__.Button, {
                        onClick: props.closeModal,
                        size: "small",
                        children: t('ok')
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/modal/upload-modal/components/upload-modal/upload-modal.tsx",
                        lineNumber: 84,
                        columnNumber: 15
                    }, void 0),
                    message: t('upload.assets-items-failed-message'),
                    type: "warning"
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/modal/upload-modal/components/upload-modal/upload-modal.tsx",
                    lineNumber: 81,
                    columnNumber: 11
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/modal/upload-modal/components/upload-modal/upload-modal.tsx",
                lineNumber: 80,
                columnNumber: 9
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/modal/upload-modal/components/upload-modal/upload-modal.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, undefined);
};
_s(UploadModal, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation
    ];
});
_c = UploadModal;
var _c;
$RefreshReg$(_c, "UploadModal");

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
"./js/src/core/components/modal/upload-modal/upload-modal-button.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  UploadModalButton: () => (UploadModalButton)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_modules_element_upload_upload_provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/element/upload/upload-provider.tsx");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/icon-button/icon-button.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_components_modal_upload_modal_components_upload_modal_upload_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/modal/upload-modal/components/upload-modal/upload-modal.tsx");
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/asset/asset-api-slice-enhanced.ts");
/* ESM import */var _Pimcore_app_api_pimcore_route__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/app/api/pimcore/route.ts");
/* ESM import */var _Pimcore_modules_element_element_api_slice_gen__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/element/element-api-slice.gen.ts");
/* ESM import */var _Pimcore_components_modal_alert_modal_hooks_use_alert_modal__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/components/modal/alert-modal/hooks/use-alert-modal.tsx");
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











const UploadModalButton = (props)=>{
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_5__.useTranslation)();
    const [isButtonLoading, setIsButtonLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [isModalOpen, setIsModalOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [showUploadError, setShowUploadError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [showProcessing, setShowProcessing] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [targetFolderId, setTargetFolderId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(undefined);
    const [fileList, setFileList] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const dispatch = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_7__.useAppDispatch)();
    const alertModal = (0,_Pimcore_components_modal_alert_modal_hooks_use_alert_modal__WEBPACK_IMPORTED_MODULE_11__.useAlertModal)();
    const uploadProps = {
        action: async ()=>{
            const baseUrl = `${(0,_Pimcore_app_api_pimcore_route__WEBPACK_IMPORTED_MODULE_9__.getPrefix)()}/assets/add/`;
            if (targetFolderId === undefined) {
                if (props.targetFolderPath === undefined || props.targetFolderPath === '' || props.targetFolderPath === '/') {
                    setTargetFolderId(1);
                    return baseUrl + 1;
                }
                setIsButtonLoading(true);
                const { data } = await dispatch(_Pimcore_modules_element_element_api_slice_gen__WEBPACK_IMPORTED_MODULE_10__.api.endpoints.elementGetIdByPath.initiate({
                    elementType: 'asset',
                    elementPath: props.targetFolderPath
                }));
                if (data !== undefined) {
                    setTargetFolderId(data.id);
                    return baseUrl + data.id;
                }
            }
            return baseUrl + targetFolderId;
        },
        name: 'file',
        multiple: true,
        showUploadList: false,
        maxCount: props.maxItems,
        fileList,
        onChange: async (info)=>{
            setFileList(info.fileList);
            setIsModalOpen(true);
            setIsButtonLoading(false);
            const allFilesDone = info.fileList.every((file)=>file.status === 'done');
            const uploadFinished = info.fileList.every((file)=>file.status === 'done' || file.status === 'error');
            if (uploadFinished) {
                setShowProcessing(true);
                const assets = [];
                for (const file of info.fileList){
                    if (file.status === 'done') {
                        const { data } = await dispatch(_Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_8__.api.endpoints.assetGetById.initiate({
                            id: file.response.id
                        }));
                        if (data !== undefined) {
                            assets.push(data);
                        }
                    }
                }
                if (assets.length > 0) {
                    await props.onSuccess(assets);
                }
                setShowProcessing(false);
                if (allFilesDone) {
                    setFileList([]);
                    setIsModalOpen(false);
                } else {
                    setShowUploadError(true);
                }
            }
        }
    };
    const closeModal = ()=>{
        setIsModalOpen(false);
        setFileList([]);
        setShowUploadError(false);
        setShowProcessing(false);
    };
    if (props.showMaxItemsError === true) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.Tooltip, {
            title: t('upload'),
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_4__.IconButton, {
                icon: {
                    value: 'upload-cloud'
                },
                loading: isButtonLoading,
                onClick: ()=>alertModal.warn({
                        content: t('items-limit-reached', {
                            maxItems: props.maxItems ?? 0
                        })
                    }),
                type: "default"
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/modal/upload-modal/upload-modal-button.tsx",
                lineNumber: 114,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/modal/upload-modal/upload-modal-button.tsx",
            lineNumber: 113,
            columnNumber: 7
        }, undefined);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_modal_upload_modal_components_upload_modal_upload_modal__WEBPACK_IMPORTED_MODULE_6__.UploadModal, {
                closeModal: closeModal,
                fileList: fileList,
                open: isModalOpen,
                showProcessing: showProcessing,
                showUploadError: showUploadError
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/modal/upload-modal/upload-modal-button.tsx",
                lineNumber: 128,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_upload_upload_provider__WEBPACK_IMPORTED_MODULE_2__.UploadProvider, {
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.Upload, {
                    ...uploadProps,
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.Tooltip, {
                        title: t('upload'),
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_4__.IconButton, {
                            icon: {
                                value: 'upload-cloud'
                            },
                            loading: isButtonLoading,
                            type: "default"
                        }, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/modal/upload-modal/upload-modal-button.tsx",
                            lineNumber: 138,
                            columnNumber: 13
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/modal/upload-modal/upload-modal-button.tsx",
                        lineNumber: 137,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/modal/upload-modal/upload-modal-button.tsx",
                    lineNumber: 136,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/modal/upload-modal/upload-modal-button.tsx",
                lineNumber: 135,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true);
};
_s(UploadModalButton, "JBdXmafgm0C9ObvE3H1SELZv+po=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_5__.useTranslation,
        _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_7__.useAppDispatch,
        _Pimcore_components_modal_alert_modal_hooks_use_alert_modal__WEBPACK_IMPORTED_MODULE_11__.useAlertModal
    ];
});
_c = UploadModalButton;
var _c;
$RefreshReg$(_c, "UploadModalButton");

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
"./js/src/core/components/modal/useModal/index.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useModal: () => (useModal),
  withError: () => (withError),
  withInfo: () => (withInfo),
  withSuccess: () => (withSuccess),
  withWarn: () => (withWarn)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_modal_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/modal/modal.tsx");
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


const useModal = function() {
    let config = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {
        type: 'default'
    };
    _s();
    const [isModalOpen, setIsModalOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const showModal = ()=>{
        setIsModalOpen(true);
    };
    const closeModal = ()=>{
        setIsModalOpen(false);
    };
    const handleOk = ()=>{
        closeModal();
    };
    const handleCancel = ()=>{
        closeModal();
    };
    function getModalComponent(type) {
        let component = _Pimcore_components_modal_modal__WEBPACK_IMPORTED_MODULE_2__.Modal;
        switch(type){
            case 'error':
                component = withError(_Pimcore_components_modal_modal__WEBPACK_IMPORTED_MODULE_2__.Modal);
                break;
            case 'success':
                component = withSuccess(_Pimcore_components_modal_modal__WEBPACK_IMPORTED_MODULE_2__.Modal);
                break;
            case 'info':
                component = withInfo(_Pimcore_components_modal_modal__WEBPACK_IMPORTED_MODULE_2__.Modal);
                break;
            case 'warn':
                component = withWarn(_Pimcore_components_modal_modal__WEBPACK_IMPORTED_MODULE_2__.Modal);
                break;
        }
        return component;
    }
    function renderModal(props) {
        const { children, ...inlineProps } = props;
        const ModalComponent = getModalComponent(config.type);
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(ModalComponent, {
            onCancel: handleCancel,
            onOk: handleOk,
            open: isModalOpen,
            ...inlineProps,
            children: children
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/modal/useModal/index.tsx",
            lineNumber: 70,
            columnNumber: 7
        }, this);
    }
    return {
        renderModal,
        showModal,
        handleOk,
        handleCancel,
        closeModal
    };
};
_s(useModal, "mLsII5HRP5G63IA/8vjZ5YHXWr8=");
const withError = (Component)=>{
    const modalWithError = (props)=>{
        const { children, ...inlineProps } = props;
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {
            className: 'error',
            iconName: 'close-filled',
            title: 'Error',
            ...inlineProps,
            children: children
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/modal/useModal/index.tsx",
            lineNumber: 89,
            columnNumber: 7
        }, undefined);
    };
    return modalWithError;
};
const withSuccess = (Component)=>{
    const modalWithSuccess = (props)=>{
        const { children, ...inlineProps } = props;
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {
            className: 'success',
            iconName: 'checkmark',
            title: 'Success',
            ...inlineProps,
            children: children
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/modal/useModal/index.tsx",
            lineNumber: 108,
            columnNumber: 7
        }, undefined);
    };
    return modalWithSuccess;
};
const withInfo = (Component)=>{
    const modalWithInfo = (props)=>{
        const { children, ...inlineProps } = props;
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {
            className: 'info',
            iconName: 'info',
            title: 'Info',
            ...inlineProps,
            children: children
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/modal/useModal/index.tsx",
            lineNumber: 127,
            columnNumber: 7
        }, undefined);
    };
    return modalWithInfo;
};
const withWarn = (Component)=>{
    const modalWithWarn = (props)=>{
        const { children, ...inlineProps } = props;
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {
            className: 'alert',
            iconName: 'alert',
            title: "Warn",
            ...inlineProps,
            children: children
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/modal/useModal/index.tsx",
            lineNumber: 146,
            columnNumber: 7
        }, undefined);
    };
    return modalWithWarn;
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
"./js/src/core/components/modal/window-modal/window-modal.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
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
        wrapper: css`
      pointer-events: none;
    `,
        modal: css`
      .ant-modal-content {
          outline: 1px solid ${token.colorBorderContainer};
          box-shadow: ${token.boxShadowSecondary} !important;
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
"./js/src/core/components/modal/window-modal/window-modal.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  WindowModal: () => (WindowModal)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_modal_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/modal/modal.tsx");
/* ESM import */var react_draggable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/react-draggable/build/cjs/cjs.js");
/* ESM import */var react_draggable__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_draggable__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _window_modal_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/modal/window-modal/window-modal.styles.tsx");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/classnames/index.js");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_5__);
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
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







const WindowModal = (props)=>{
    _s();
    const { styles } = (0,_window_modal_styles__WEBPACK_IMPORTED_MODULE_4__.useStyle)();
    const [disabled, setDisabled] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [bounds, setBounds] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        left: 0,
        top: 0,
        bottom: 0,
        right: 0
    });
    const draggleRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const onStart = (_event, uiData)=>{
        var _draggleRef_current;
        const { clientWidth, clientHeight } = window.document.documentElement;
        const targetRect = (_draggleRef_current = draggleRef.current) === null || _draggleRef_current === void 0 ? void 0 : _draggleRef_current.getBoundingClientRect();
        if (targetRect === undefined) {
            return;
        }
        setBounds({
            left: -targetRect.left + uiData.x,
            right: clientWidth - (targetRect.right - uiData.x),
            top: -targetRect.top + uiData.y,
            bottom: clientHeight - (targetRect.bottom - uiData.y)
        });
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_modal_modal__WEBPACK_IMPORTED_MODULE_2__.Modal, {
        ...props,
        className: classnames__WEBPACK_IMPORTED_MODULE_5___default()(styles.modal, props.className),
        mask: false,
        maskClosable: false,
        modalRender: (modal)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((react_draggable__WEBPACK_IMPORTED_MODULE_3___default()), {
                bounds: bounds,
                disabled: disabled,
                nodeRef: draggleRef,
                onStart: (event, uiData)=>{
                    onStart(event, uiData);
                },
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                    ref: draggleRef,
                    children: modal
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/modal/window-modal/window-modal.tsx",
                    lineNumber: 61,
                    columnNumber: 11
                }, void 0)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/modal/window-modal/window-modal.tsx",
                lineNumber: 55,
                columnNumber: 9
            }, void 0),
        title: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
            onBlur: ()=>{},
            onFocus: ()=>{},
            onMouseOut: ()=>{
                setDisabled(true);
            },
            onMouseOver: ()=>{
                if (disabled) {
                    setDisabled(false);
                }
            },
            // fix eslintjsx-a11y/mouse-events-have-key-events
            // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
            style: {
                width: '100%',
                cursor: 'move',
                flex: 1
            },
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_7__.Flex, {
                gap: "small",
                children: props.title ?? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_6__.Icon, {
                    value: 'drag-option'
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/modal/window-modal/window-modal.tsx",
                    lineNumber: 82,
                    columnNumber: 29
                }, void 0)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/modal/window-modal/window-modal.tsx",
                lineNumber: 81,
                columnNumber: 11
            }, void 0)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/modal/window-modal/window-modal.tsx",
            lineNumber: 65,
            columnNumber: 9
        }, void 0),
        wrapClassName: styles.wrapper,
        children: props.children
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/modal/window-modal/window-modal.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, undefined);
};
_s(WindowModal, "05dmyzDs1FwANX2G/Fs8h/T/+gg=", false, function() {
    return [
        _window_modal_styles__WEBPACK_IMPORTED_MODULE_4__.useStyle
    ];
});
_c = WindowModal;
var _c;
$RefreshReg$(_c, "WindowModal");

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
"./js/src/core/components/numeric-range/numeric-range.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
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
*/ /**
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
    let { css, token } = param;
    return {
        container: css`
      &.versionFieldItem {
        .ant-input-number-disabled {
          width: 100%;
          max-width: 100% !important;
          color: ${token.colorText} !important;
          border-color: transparent !important;
        }
      }

      &.versionFieldItemHighlight {
        .ant-input-number-disabled {
          background-color: ${token.Colors.Brand.Warning.colorWarningBg} !important;
          border-color: ${token.colorBorder} !important;
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
"./js/src/core/components/numeric-range/numeric-range.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  NumericRange: () => (NumericRange),
  validateOneFieldEmpty: () => (validateOneFieldEmpty),
  validateSecondValueGreater: () => (validateSecondValueGreater)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/classnames/index.js");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var i18next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/i18next/dist/esm/i18next.js");
/* ESM import */var _Pimcore_components_input_number_input_number__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/input-number/input-number.tsx");
/* ESM import */var _Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/utils/css.tsx");
/* ESM import */var _numeric_range_styles__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/numeric-range/numeric-range.styles.tsx");
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







const validateOneFieldEmpty = async (rule, value)=>{
    if (value === null) {
        await Promise.resolve();
        return;
    }
    if (value.minimum === null) {
        await Promise.reject(Error((0,i18next__WEBPACK_IMPORTED_MODULE_4__.t)('form.validation.numeric-range.first-value-missing')));
    }
    if (value.maximum === null) {
        await Promise.reject(Error((0,i18next__WEBPACK_IMPORTED_MODULE_4__.t)('form.validation.numeric-range.second-value-missing')));
    }
    await Promise.resolve();
};
const validateSecondValueGreater = async (rule, value)=>{
    await validateOneFieldEmpty(rule, value);
    if (value === null) {
        return;
    }
    if (value.minimum > value.maximum) {
        await Promise.reject(Error((0,i18next__WEBPACK_IMPORTED_MODULE_4__.t)('form.validation.numeric-range.second-value-greater')));
    }
    await Promise.resolve();
};
const NumericRange = (props)=>{
    _s();
    const [value, setValue] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(props.value ?? null);
    const { styles } = (0,_numeric_range_styles__WEBPACK_IMPORTED_MODULE_7__.useStyles)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (props.onChange !== undefined) {
            props.onChange(value);
        }
    }, [
        value
    ]);
    const updateValue = (key, newValue)=>{
        setValue((prevValue)=>{
            const updatedValue = {
                minimum: (prevValue === null || prevValue === void 0 ? void 0 : prevValue.minimum) ?? null,
                maximum: (prevValue === null || prevValue === void 0 ? void 0 : prevValue.maximum) ?? null,
                [key]: newValue
            };
            return updatedValue.minimum === null && updatedValue.maximum === null ? null : updatedValue;
        });
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_3__.Flex, {
        align: "center",
        className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(styles.container, props.className),
        gap: "small",
        style: {
            maxWidth: (0,_Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_6__.toCssDimension)(props.width)
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_input_number_input_number__WEBPACK_IMPORTED_MODULE_5__.InputNumber, {
                ...props,
                className: props.inputClassName,
                onChange: (newValue)=>{
                    updateValue('minimum', newValue);
                },
                value: value !== null ? value.minimum : null
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/numeric-range/numeric-range.tsx",
                lineNumber: 90,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_input_number_input_number__WEBPACK_IMPORTED_MODULE_5__.InputNumber, {
                ...props,
                className: props.inputClassName,
                onChange: (newValue)=>{
                    updateValue('maximum', newValue);
                },
                value: value !== null ? value.maximum : null
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/numeric-range/numeric-range.tsx",
                lineNumber: 96,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/numeric-range/numeric-range.tsx",
        lineNumber: 83,
        columnNumber: 5
    }, undefined);
};
_s(NumericRange, "3vqar+DZWOMa2G22pdCmmTXzF0s=", false, function() {
    return [
        _numeric_range_styles__WEBPACK_IMPORTED_MODULE_7__.useStyles
    ];
});
_c = NumericRange;
var _c;
$RefreshReg$(_c, "NumericRange");

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
"./js/src/core/components/paragraph/paragraph.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Paragraph: () => (Paragraph)
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


const { Paragraph: AntParagraph } = antd__WEBPACK_IMPORTED_MODULE_2__.Typography;
const Paragraph = (props)=>{
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AntParagraph, {
        ...props
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/paragraph/paragraph.tsx",
        lineNumber: 23,
        columnNumber: 10
    }, undefined);
};
_c = Paragraph;
var _c;
$RefreshReg$(_c, "Paragraph");

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
"./js/src/core/components/segmented/segmented.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
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
        segmented: css`
            .ant-segmented-group {
                padding: 2px;
                border-radius: ${token.borderRadius}px;
                border: 1px solid ${token.colorBorderSecondary};
                background: ${token.colorBgLayout};
                box-shadow: ${token.boxShadow};

                .ant-segmented-item {
                    color: ${token.itemColor};

                    &.ant-segmented-item-selected {
                        background: ${token.controlItemBgActive};
                        border-color: ${token.controlItemBgActive};
                        color: ${token.itemSelectedColor};
                    }
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
"./js/src/core/components/segmented/segmented.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Segmented: () => (Segmented)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_segmented_segmented_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/segmented/segmented.styles.tsx");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_3__);
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



const Segmented = /*#__PURE__*/ _s(react__WEBPACK_IMPORTED_MODULE_1___default().forwardRef(_c = _s((param, ref)=>{
    let { options, ...props } = param;
    _s();
    const { styles } = (0,_Pimcore_components_segmented_segmented_styles__WEBPACK_IMPORTED_MODULE_2__.useStyles)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: styles.segmented,
        ref: ref,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.Segmented, {
            options: options,
            ...props
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/segmented/segmented.tsx",
            lineNumber: 33,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/segmented/segmented.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, undefined);
}, "1BGFRu6BGAbhzJ8kKgs1GUjvI6w=", false, function() {
    return [
        _Pimcore_components_segmented_segmented_styles__WEBPACK_IMPORTED_MODULE_2__.useStyles
    ];
})), "1BGFRu6BGAbhzJ8kKgs1GUjvI6w=", false, function() {
    return [
        _Pimcore_components_segmented_segmented_styles__WEBPACK_IMPORTED_MODULE_2__.useStyles
    ];
});
_c1 = Segmented;
Segmented.displayName = 'Segmented';

var _c, _c1;
$RefreshReg$(_c, "Segmented$React.forwardRef");
$RefreshReg$(_c1, "Segmented");

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
"./js/src/core/components/slider/slider.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Slider: () => (Slider)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_utils_number__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/utils/number.ts");
/* ESM import */var _Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/box/box.tsx");
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var _Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/icon-button/icon-button.tsx");
/* ESM import */var i18next__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./node_modules/i18next/dist/esm/i18next.js");
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







const Slider = (props)=>{
    _s();
    const [value, setValue] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(props.value ?? null);
    const onChange = (value)=>{
        setValue(value);
        if (props.onChange !== undefined) {
            props.onChange(value);
        }
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: props.className,
        children: [
            props.showValue === true && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_4__.Box, {
                padding: {
                    x: 'mini'
                },
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                    children: [
                        "(",
                        value === null || value === undefined ? (0,i18next__WEBPACK_IMPORTED_MODULE_7__.t)('no-value-set') : (0,_Pimcore_utils_number__WEBPACK_IMPORTED_MODULE_3__.formatNumber)({
                            value
                        }),
                        ")"
                    ]
                }, void 0, true, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/slider/slider.tsx",
                    lineNumber: 45,
                    columnNumber: 11
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/slider/slider.tsx",
                lineNumber: 44,
                columnNumber: 9
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_5__.Flex, {
                align: props.vertical === true ? 'left' : 'center',
                className: "w-full",
                vertical: props.vertical,
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Slider, {
                        ...props,
                        className: 'w-full',
                        onChange: onChange,
                        value: value ?? undefined
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/slider/slider.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, undefined),
                    props.allowClear === true && value !== null && props.disabled !== true && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_4__.Box, {
                        padding: {
                            x: 'mini'
                        },
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Tooltip, {
                            title: (0,i18next__WEBPACK_IMPORTED_MODULE_7__.t)('set-to-null'),
                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_6__.IconButton, {
                                icon: {
                                    value: 'trash'
                                },
                                onClick: ()=>{
                                    setValue(null);
                                },
                                type: 'default',
                                variant: 'static'
                            }, void 0, false, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/slider/slider.tsx",
                                lineNumber: 63,
                                columnNumber: 13
                            }, undefined)
                        }, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/slider/slider.tsx",
                            lineNumber: 62,
                            columnNumber: 11
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/slider/slider.tsx",
                        lineNumber: 61,
                        columnNumber: 9
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/slider/slider.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/slider/slider.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, undefined);
};
_s(Slider, "RgGMW9dHojr1DaZY4eIAVqlAh6M=");
_c = Slider;
var _c;
$RefreshReg$(_c, "Slider");

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
"./js/src/core/components/toolstrip/box/tool-strip-box.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
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
    let { css, token } = param;
    return {
        'tool-strip-box': css`
      .tool-strip-box__content {
        border: 2px solid rgba(0, 0, 0, 0.04);
        border-radius: ${token.borderRadius}px;
      }

      &.tool-strip-box--with-start .tool-strip-box__content {
        border-top-left-radius: 0;
      }

      &.tool-strip-box--with-end .tool-strip-box__content {
        border-top-right-radius: 0;
      }

      &.tool-strip-box--docked .tool-strip-box__content {
        border-radius: 0;
        border-bottom: 0;
        border-left: 0;
        border-right: 0;
      }

      &.tool-strip-box--docked .tool-strip-box__strip--start {
        border-top-left-radius: 0;
      }

      &.tool-strip-box--docked .tool-strip-box__strip--end {
        border-top-right-radius: 0;
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
"./js/src/core/components/toolstrip/box/tool-strip-box.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ToolStripBox: () => (ToolStripBox)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/box/box.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _tool_strip__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/toolstrip/tool-strip.tsx");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var _tool_strip_box_styles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/toolstrip/box/tool-strip-box.styles.ts");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/classnames/index.js");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_6__);
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






const ToolStripBox = (param)=>{
    let { className, docked = false, children, renderToolStripEnd, renderToolStripStart, padding = {
        x: 'extra-small',
        y: 'small'
    }, ...props } = param;
    _s();
    const { styles } = (0,_tool_strip_box_styles__WEBPACK_IMPORTED_MODULE_5__.useStyles)();
    const classNames = classnames__WEBPACK_IMPORTED_MODULE_6___default()(className, 'tool-strip-box', styles['tool-strip-box'], {
        'tool-strip-box--with-start': renderToolStripStart !== undefined,
        'tool-strip-box--with-end': renderToolStripEnd !== undefined,
        'tool-strip-box--docked': docked
    });
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: classNames,
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_4__.Flex, {
                align: "flex-end",
                justify: "space-between",
                children: [
                    renderToolStripStart !== undefined ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_tool_strip__WEBPACK_IMPORTED_MODULE_3__.ToolStrip, {
                        className: "tool-strip-box__strip--start",
                        children: renderToolStripStart
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/toolstrip/box/tool-strip-box.tsx",
                        lineNumber: 46,
                        columnNumber: 47
                    }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {}, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/toolstrip/box/tool-strip-box.tsx",
                        lineNumber: 46,
                        columnNumber: 136
                    }, undefined),
                    renderToolStripEnd !== undefined ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_tool_strip__WEBPACK_IMPORTED_MODULE_3__.ToolStrip, {
                        className: "tool-strip-box__strip--end",
                        children: renderToolStripEnd
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/toolstrip/box/tool-strip-box.tsx",
                        lineNumber: 47,
                        columnNumber: 45
                    }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {}, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/toolstrip/box/tool-strip-box.tsx",
                        lineNumber: 47,
                        columnNumber: 130
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/toolstrip/box/tool-strip-box.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_1__.Box, {
                className: "tool-strip-box__content",
                padding: padding,
                ...props,
                children: children
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/toolstrip/box/tool-strip-box.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/toolstrip/box/tool-strip-box.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, undefined);
};
_s(ToolStripBox, "1BGFRu6BGAbhzJ8kKgs1GUjvI6w=", false, function() {
    return [
        _tool_strip_box_styles__WEBPACK_IMPORTED_MODULE_5__.useStyles
    ];
});
_c = ToolStripBox;
var _c;
$RefreshReg$(_c, "ToolStripBox");

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
"./js/src/core/components/toolstrip/tool-strip.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
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
    let { css, token } = param;
    return {
        'tool-strip': css`
      background: #f5f5f5;
      border-top-left-radius: ${token.borderRadius}px;
      border-top-right-radius: ${token.borderRadius}px;
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
"./js/src/core/components/toolstrip/tool-strip.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ToolStrip: () => (ToolStrip)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _tool_strip_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/toolstrip/tool-strip.styles.ts");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/classnames/index.js");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _box_box__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/box/box.tsx");
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




const ToolStrip = (param)=>{
    let { children, className } = param;
    _s();
    const { styles } = (0,_tool_strip_styles__WEBPACK_IMPORTED_MODULE_2__.useStyles)();
    const classNames = classnames__WEBPACK_IMPORTED_MODULE_3___default()('tool-strip', styles['tool-strip'], className);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_box_box__WEBPACK_IMPORTED_MODULE_4__.Box, {
        className: classNames,
        padding: {
            x: 'mini',
            y: 'mini',
            left: 'extra-small'
        },
        children: children
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/toolstrip/tool-strip.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, undefined);
};
_s(ToolStrip, "1BGFRu6BGAbhzJ8kKgs1GUjvI6w=", false, function() {
    return [
        _tool_strip_styles__WEBPACK_IMPORTED_MODULE_2__.useStyles
    ];
});
_c = ToolStrip;
var _c;
$RefreshReg$(_c, "ToolStrip");

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
"./js/src/core/components/upload/upload-list/upload-list.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
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
        uploadList: css`
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
        
      .ant-upload-list-item {
          display: flex;
          align-items: center;
          gap: ${token.paddingXS}px;
          
          &.ant-upload-list-item-error {
              color: ${token.colorError};
          }
          
          .ant-upload-icon {
              display: flex;
          }
      }

        .success_items {
            display: flex;
            align-items: center;
            gap: ${token.paddingXS}px;
            
            p {
                margin: 0;
            }
            
            .pimcore-icon{
                &.pimcore-icon-checkmark {
                    color: ${token.colorSuccess};
                }
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
"./js/src/core/components/upload/upload-list/upload-list.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  UploadList: () => (UploadList)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var antd_es_upload_UploadList__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./node_modules/antd/es/upload/UploadList/index.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var _upload_list_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/upload/upload-list/upload-list.styles.ts");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_modules_element_upload_upload_provider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/element/upload/upload-provider.tsx");
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







const UploadList = ()=>{
    _s();
    const { styles } = (0,_upload_list_styles__WEBPACK_IMPORTED_MODULE_4__.useStyles)();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_5__.useTranslation)();
    const { successItems, failedItems } = (0,_Pimcore_modules_element_upload_upload_provider__WEBPACK_IMPORTED_MODULE_6__.useUploadContext)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: styles.uploadList,
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
                children: t('asset.upload.files.completed-actions')
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/upload/upload-list/upload-list.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, undefined),
            successItems.length > 0 && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_3__.Flex, {
                className: 'success_items',
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_2__.Icon, {
                        value: 'checkmark'
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/upload/upload-list/upload-list.tsx",
                        lineNumber: 33,
                        columnNumber: 11
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                        children: t('asset.upload.files.uploaded', {
                            successItems: successItems.length
                        })
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/upload/upload-list/upload-list.tsx",
                        lineNumber: 34,
                        columnNumber: 11
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/upload/upload-list/upload-list.tsx",
                lineNumber: 32,
                columnNumber: 9
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd_es_upload_UploadList__WEBPACK_IMPORTED_MODULE_7__["default"], {
                iconRender: ()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_2__.Icon, {
                        value: 'alert'
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/upload/upload-list/upload-list.tsx",
                        lineNumber: 39,
                        columnNumber: 28
                    }, void 0),
                items: failedItems,
                locale: {},
                showRemoveIcon: false
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/upload/upload-list/upload-list.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/upload/upload-list/upload-list.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, undefined);
};
_s(UploadList, "ho8Fz03I8ES1bRFqvhGO60XXb+U=", false, function() {
    return [
        _upload_list_styles__WEBPACK_IMPORTED_MODULE_4__.useStyles,
        react_i18next__WEBPACK_IMPORTED_MODULE_5__.useTranslation,
        _Pimcore_modules_element_upload_upload_provider__WEBPACK_IMPORTED_MODULE_6__.useUploadContext
    ];
});
_c = UploadList;
var _c;
$RefreshReg$(_c, "UploadList");

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
"./js/src/core/components/upload/upload-modal/upload-modal.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  UploadModal: () => (UploadModal)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_components_modal_footer_modal_footer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/modal/footer/modal-footer.tsx");
/* ESM import */var _Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/button/button.tsx");
/* ESM import */var _Pimcore_components_modal_modal_title_modal_title__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/modal/modal-title/modal-title.tsx");
/* ESM import */var _Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/box/box.tsx");
/* ESM import */var _Pimcore_components_upload_upload_progress_upload_progress__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/upload/upload-progress/upload-progress.tsx");
/* ESM import */var _Pimcore_components_modal_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/modal/modal.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* ESM import */var _Pimcore_modules_element_upload_upload_provider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/element/upload/upload-provider.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
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









const UploadModal = ()=>{
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_9__.useTranslation)();
    const { isOpen, fileList, setIsOpen } = (0,_Pimcore_modules_element_upload_upload_provider__WEBPACK_IMPORTED_MODULE_8__.useUploadContext)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_modal_modal__WEBPACK_IMPORTED_MODULE_6__.Modal, {
        closable: false,
        footer: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_modal_footer_modal_footer__WEBPACK_IMPORTED_MODULE_1__.ModalFooter, {
            justify: 'end',
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
                disabled: fileList.length > 0 && fileList.some((file)=>file.status === 'uploading'),
                onClick: ()=>{
                    setIsOpen(false);
                },
                type: "primary",
                children: t('close')
            }, "cancel", false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/upload/upload-modal/upload-modal.tsx",
                lineNumber: 33,
                columnNumber: 11
            }, void 0)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/upload/upload-modal/upload-modal.tsx",
            lineNumber: 32,
            columnNumber: 9
        }, void 0),
        open: isOpen,
        size: "L",
        title: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_modal_modal_title_modal_title__WEBPACK_IMPORTED_MODULE_3__.ModalTitle, {
            children: t('asset.upload')
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/upload/upload-modal/upload-modal.tsx",
            lineNumber: 49,
            columnNumber: 9
        }, void 0),
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_4__.Box, {
            margin: {
                bottom: 'small'
            },
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_upload_upload_progress_upload_progress__WEBPACK_IMPORTED_MODULE_5__.UploadProgress, {
                locale: {
                    uploading: 'uploading'
                }
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/upload/upload-modal/upload-modal.tsx",
                lineNumber: 55,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/upload/upload-modal/upload-modal.tsx",
            lineNumber: 54,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/upload/upload-modal/upload-modal.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, undefined);
};
_s(UploadModal, "yvasdEWW8A+VRdbfhNF4GGL2RmY=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_9__.useTranslation,
        _Pimcore_modules_element_upload_upload_provider__WEBPACK_IMPORTED_MODULE_8__.useUploadContext
    ];
});
_c = UploadModal;
var _c;
$RefreshReg$(_c, "UploadModal");

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
"./js/src/core/components/upload/upload-progress/upload-progress.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
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
        uploadProgress: css`
      margin-top: ${token.paddingSM}px;
      margin-bottom: ${token.paddingSM}px;
      display: flex;
      gap: ${token.paddingSM}px;
      flex-direction: column;
      align-items: center;
        
      .progress-label {
          color: ${token.colorTextDescription};
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
"./js/src/core/components/upload/upload-progress/upload-progress.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  UploadProgress: () => (UploadProgress)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var _Pimcore_components_upload_upload_progress_upload_progress_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/upload/upload-progress/upload-progress.styles.ts");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_components_upload_upload_list_upload_list__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/upload/upload-list/upload-list.tsx");
/* ESM import */var _Pimcore_modules_element_upload_upload_provider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/element/upload/upload-provider.tsx");
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







const UploadProgress = (props)=>{
    _s();
    const { styles } = (0,_Pimcore_components_upload_upload_progress_upload_progress_styles__WEBPACK_IMPORTED_MODULE_4__.useStyles)();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_5__.useTranslation)();
    const { fileList } = (0,_Pimcore_modules_element_upload_upload_provider__WEBPACK_IMPORTED_MODULE_7__.useUploadContext)();
    const totalItems = fileList.length;
    const processedItems = fileList.filter((file)=>file.status !== 'uploading').length;
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: styles.uploadProgress,
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_3__.Flex, {
                align: 'start',
                className: 'w-full',
                vertical: true,
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                        className: 'progress-label',
                        children: processedItems !== totalItems ? t('asset.upload.files.uploading', {
                            processedItems,
                            totalItems
                        }) : t('asset.upload.files.completed')
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/upload/upload-progress/upload-progress.tsx",
                        lineNumber: 37,
                        columnNumber: 9
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Progress, {
                        ...props.progress,
                        "aria-label": 'upload progress',
                        percent: processedItems / totalItems * 100,
                        showInfo: false,
                        size: [
                            -1,
                            2
                        ],
                        type: "line"
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/upload/upload-progress/upload-progress.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/upload/upload-progress/upload-progress.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_upload_upload_list_upload_list__WEBPACK_IMPORTED_MODULE_6__.UploadList, {}, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/upload/upload-progress/upload-progress.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/upload/upload-progress/upload-progress.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, undefined);
};
_s(UploadProgress, "XsuojraZNBzowwReziXaMSbKtyI=", false, function() {
    return [
        _Pimcore_components_upload_upload_progress_upload_progress_styles__WEBPACK_IMPORTED_MODULE_4__.useStyles,
        react_i18next__WEBPACK_IMPORTED_MODULE_5__.useTranslation,
        _Pimcore_modules_element_upload_upload_provider__WEBPACK_IMPORTED_MODULE_7__.useUploadContext
    ];
});
_c = UploadProgress;
var _c;
$RefreshReg$(_c, "UploadProgress");

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
"./js/src/core/components/workflow-card/components/dropdown-button/dropdown-button.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DropdownButton: () => (DropdownButton)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/dropdown/dropdown.tsx");
/* ESM import */var _Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/button/button.tsx");
/* ESM import */var _Pimcore_modules_asset_editor_toolbar_workflow_log_modal_hooks_use_submit_workflow__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/asset/editor/toolbar/workflow-log-modal/hooks/use-submit-workflow.ts");
/* ESM import */var _Pimcore_modules_asset_editor_toolbar_workflow_log_modal_hooks_use_workflow__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/asset/editor/toolbar/workflow-log-modal/hooks/use-workflow.ts");
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






const DropdownButton = (param)=>{
    let { workflow } = param;
    _s();
    const [items, setItems] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)();
    const { submitWorkflowAction, submissionLoading } = (0,_Pimcore_modules_asset_editor_toolbar_workflow_log_modal_hooks_use_submit_workflow__WEBPACK_IMPORTED_MODULE_5__.useSubmitWorkflow)(workflow.workflowName);
    const { openModal } = (0,_Pimcore_modules_asset_editor_toolbar_workflow_log_modal_hooks_use_workflow__WEBPACK_IMPORTED_MODULE_6__.useWorkflow)();
    const setWorkflowData = ()=>{
        var _workflow_allowedTransitions, _workflow_globalActions;
        const items = [];
        (_workflow_allowedTransitions = workflow.allowedTransitions) === null || _workflow_allowedTransitions === void 0 ? void 0 : _workflow_allowedTransitions.forEach((status)=>{
            items.push({
                key: Number(items.length + 1).toString(),
                label: t(`${status.label}`),
                onClick: ()=>{
                    submitWorkflowAction(status.name, 'transition', workflow.workflowName, {});
                }
            });
        });
        (_workflow_globalActions = workflow.globalActions) === null || _workflow_globalActions === void 0 ? void 0 : _workflow_globalActions.forEach((status)=>{
            items.push({
                key: Number(items.length + 1).toString(),
                label: t(`${status.label}`),
                onClick: ()=>{
                    openModal({
                        transition: 'global',
                        action: status.name,
                        workflowName: workflow.workflowName
                    });
                }
            });
        });
        setItems(items);
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setWorkflowData();
    }, []);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_3__.Dropdown, {
        menu: {
            items
        },
        placement: "bottom",
        children: submissionLoading ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_4__.Button, {
            loading: true,
            type: 'link'
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/workflow-card/components/dropdown-button/dropdown-button.tsx",
            lineNumber: 66,
            columnNumber: 11
        }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_4__.Button, {
            children: t('component.workflow-card.action-btn')
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/workflow-card/components/dropdown-button/dropdown-button.tsx",
            lineNumber: 71,
            columnNumber: 11
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/workflow-card/components/dropdown-button/dropdown-button.tsx",
        lineNumber: 60,
        columnNumber: 5
    }, undefined);
};
_s(DropdownButton, "yQtmBn13nFGSMnarRJzNC5rVxS4=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation,
        _Pimcore_modules_asset_editor_toolbar_workflow_log_modal_hooks_use_submit_workflow__WEBPACK_IMPORTED_MODULE_5__.useSubmitWorkflow,
        _Pimcore_modules_asset_editor_toolbar_workflow_log_modal_hooks_use_workflow__WEBPACK_IMPORTED_MODULE_6__.useWorkflow
    ];
});
_c = DropdownButton;
var _c;
$RefreshReg$(_c, "DropdownButton");

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
"./js/src/core/components/workflow-card/workflow-card.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
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
        workflowCard: css`
      .ant-card-head-title {
        display: flex !important;
        gap: 8px;
        font-size: 12px;
        align-items: center;
        
          p {
              margin: 0;
          }

        .ant-tag {
          background: ${token.colorFillSecondary};
          border: 1px solid ${token.colorBorder};
          cursor: pointer;
          height: 22px;
          display: flex;
          align-items: center;
          gap: 8px;
            
          &.color-inverted {
            border: transparent;
          }
            
          .ant-badge {              
            .ant-badge-status-dot {
              width: 6px;
              height: 6px;
              top: unset;
            }
          }
        }
      }

      .ant-card-body {
        overflow: auto;
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
"./js/src/core/components/workflow-card/workflow-card.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  WorkflowCard: () => (WorkflowCard)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_components_workflow_card_workflow_card_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/workflow-card/workflow-card.styles.ts");
/* ESM import */var _components_dropdown_button_dropdown_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/workflow-card/components/dropdown-button/dropdown-button.tsx");
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




const WorkflowCard = (param)=>{
    let { workflow } = param;
    var _workflow_workflowStatus;
    _s();
    const { styles } = (0,_Pimcore_components_workflow_card_workflow_card_styles__WEBPACK_IMPORTED_MODULE_3__.useStyles)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Card, {
        className: styles.workflowCard,
        extra: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_dropdown_button_dropdown_button__WEBPACK_IMPORTED_MODULE_4__.DropdownButton, {
            workflow: workflow
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/workflow-card/workflow-card.tsx",
            lineNumber: 26,
            columnNumber: 15
        }, void 0),
        title: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
                    children: workflow.workflowName
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/workflow-card/workflow-card.tsx",
                    lineNumber: 29,
                    columnNumber: 11
                }, void 0),
                workflow.workflowStatus !== undefined && ((_workflow_workflowStatus = workflow.workflowStatus) === null || _workflow_workflowStatus === void 0 ? void 0 : _workflow_workflowStatus.length) > 0 && workflow.workflowStatus.map((status, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Tag, {
                        className: status.colorInverted ? 'color-inverted' : '',
                        icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Badge, {
                            color: status.color,
                            styles: status.colorInverted ? {
                                indicator: {
                                    outline: `1px solid ${status.color}4D`
                                }
                            } : {}
                        }, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/workflow-card/workflow-card.tsx",
                            lineNumber: 36,
                            columnNumber: 19
                        }, void 0),
                        style: status.colorInverted ? {
                            backgroundColor: `${status.color}33`
                        } : {},
                        title: status.title,
                        children: status.label
                    }, `${index}-${status.title}`, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/workflow-card/workflow-card.tsx",
                        lineNumber: 33,
                        columnNumber: 15
                    }, void 0))
            ]
        }, void 0, true),
        children: workflow.graph !== undefined && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("img", {
            alt: 'workflow',
            src: `data:image/svg+xml;utf8,${encodeURIComponent(workflow.graph)}`
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/workflow-card/workflow-card.tsx",
            lineNumber: 59,
            columnNumber: 9
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/workflow-card/workflow-card.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, undefined);
};
_s(WorkflowCard, "1BGFRu6BGAbhzJ8kKgs1GUjvI6w=", false, function() {
    return [
        _Pimcore_components_workflow_card_workflow_card_styles__WEBPACK_IMPORTED_MODULE_3__.useStyles
    ];
});
_c = WorkflowCard;
var _c;
$RefreshReg$(_c, "WorkflowCard");

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
"./js/src/core/modules/element/upload/upload-provider.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  UploadContext: () => (UploadContext),
  UploadProvider: () => (UploadProvider),
  useUploadContext: () => (useUploadContext)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_upload_upload_modal_upload_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/upload/upload-modal/upload-modal.tsx");
/* ESM import */var _Pimcore_modules_element_actions_refresh_tree_use_refresh_tree__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/element/actions/refresh-tree/use-refresh-tree.tsx");
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
var _s = $RefreshSig$(), _s1 = $RefreshSig$();



const UploadContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(undefined);
const UploadProvider = (param)=>{
    let { children } = param;
    _s();
    const [isOpen, setIsOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [fileList, setFileList] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [uploadingNode, setUploadingNode] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [successItems, setSuccessItems] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [failedItems, setFailedItems] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [uploadType, setUploadType] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('file');
    const { refreshTree } = (0,_Pimcore_modules_element_actions_refresh_tree_use_refresh_tree__WEBPACK_IMPORTED_MODULE_3__.useRefreshTree)('asset');
    const setUploadContext = (uploadType, fileList)=>{
        setUploadType(uploadType);
        setFileList(fileList);
    };
    const finishUpload = ()=>{
        if (uploadType !== 'zip') {
            refreshTree(parseInt(uploadingNode));
        }
        setFileList(()=>[]);
        setUploadingNode(null);
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (isOpen) {
            setSuccessItems(()=>[]);
            setFailedItems(()=>[]);
        } else {
            finishUpload();
        }
    }, [
        isOpen
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!isOpen && fileList.length > 0) {
            setIsOpen(true);
        }
        const currentErrorItems = fileList.filter((file)=>file.status === 'error');
        setFailedItems(()=>currentErrorItems);
        const currentSuccessItems = fileList.filter((file)=>file.status === 'done');
        setSuccessItems(()=>currentSuccessItems);
        if (fileList.length > 0 && fileList.length === currentSuccessItems.length) {
            setIsOpen(false);
        }
    }, [
        fileList
    ]);
    const contextValue = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>({
            isOpen,
            setIsOpen,
            uploadingNode,
            setUploadingNode,
            finishUpload,
            fileList,
            successItems,
            failedItems,
            setUploadContext
        }), [
        uploadingNode,
        isOpen,
        fileList,
        successItems,
        failedItems
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(UploadContext.Provider, {
        value: contextValue,
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_upload_upload_modal_upload_modal__WEBPACK_IMPORTED_MODULE_2__.UploadModal, {}, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/upload/upload-provider.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, undefined),
            children
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/upload/upload-provider.tsx",
        lineNumber: 97,
        columnNumber: 5
    }, undefined);
};
_s(UploadProvider, "ppM8CnYkFZBqRrBnnFpr74mWADY=", false, function() {
    return [
        _Pimcore_modules_element_actions_refresh_tree_use_refresh_tree__WEBPACK_IMPORTED_MODULE_3__.useRefreshTree
    ];
});
_c = UploadProvider;
const useUploadContext = ()=>{
    _s1();
    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(UploadContext);
    if (context === undefined) {
        throw new Error('useUploadContext must be used within a UploadProvider');
    }
    return context;
};
_s1(useUploadContext, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
$RefreshReg$(_c, "UploadProvider");

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
"./js/src/core/utils/css.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  toCssDimension: () => (toCssDimension)
});
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
*/ const toCssDimension = (value, fallback)=>{
    if (value === null || value === undefined || value === '' || value === 0) {
        if (fallback === undefined) {
            return undefined;
        }
        value = fallback;
    }
    return typeof value === 'number' ? `${value}px` : value;
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
"./js/src/core/utils/hooks/use-element-visible.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__WEBPACK_DEFAULT_EXPORT__)
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
const useElementVisible = function(ref) {
    let continueObserving = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    const [isVisible, setIsVisible] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        const observer = new IntersectionObserver((param)=>{
            let [entry] = param;
            if (entry.isIntersecting) {
                setIsVisible(true);
                if (!continueObserving) {
                    observer.disconnect();
                }
            } else if (continueObserving) {
                setIsVisible(false);
            }
        }, {
            threshold: 0.1
        });
        if (ref.current !== null) {
            observer.observe(ref.current);
        }
        return ()=>{
            if (ref.current !== null) {
                observer.unobserve(ref.current);
                observer.disconnect();
            }
        };
    }, [
        ref,
        continueObserving
    ]);
    return isVisible;
};
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useElementVisible);

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
"./js/src/core/utils/number.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  formatNumber: () => (formatNumber)
});
/* ESM import */var i18next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/i18next/dist/esm/i18next.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
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

function formatNumber(param) {
    let { value, lng, options = {
        useGrouping: false
    } } = param;
    if ((0,lodash__WEBPACK_IMPORTED_MODULE_1__.isNil)(value)) {
        return '';
    }
    if (lng === undefined) {
        lng = i18next__WEBPACK_IMPORTED_MODULE_0__["default"].language;
    }
    return i18next__WEBPACK_IMPORTED_MODULE_0__["default"].format(value, 'number', lng, options);
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
"./js/src/core/utils/use-element-overflow.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__WEBPACK_DEFAULT_EXPORT__)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
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

const useElementOverflow = (ref)=>{
    const [isOverflow, setIsOverflow] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        const observer = new ResizeObserver(()=>{
            if (!(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isNull)(ref.current)) {
                setIsOverflow(ref.current.scrollWidth > ref.current.clientWidth);
            }
        });
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isNull)(ref.current)) {
            observer.observe(ref.current);
        }
        return ()=>{
            observer.disconnect();
        };
    }, [
        ref
    ]);
    return isOverflow;
};
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useElementOverflow);

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
//# sourceMappingURL=js_src_core_components_asset-target_asset-target_tsx-js_src_core_components_color-picker_colo-5854cb.js.map