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
"./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/link.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Link: () => (Link)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/classnames/index.js");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/icon-button/icon-button.tsx");
/* ESM import */var _Pimcore_components_tooltip_tooltip__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/tooltip/tooltip.tsx");
/* ESM import */var _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_link_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/modal.tsx");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_8__);
/* ESM import */var _Pimcore_modules_element_hooks_use_element_helper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/element/hooks/use-element-helper.ts");
/* ESM import */var _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_link_utils_link_value_converter__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/utils/link-value-converter.ts");
/* ESM import */var _link_styles__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/link.styles.tsx");
/* ESM import */var _components_link_preview_link_preview__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/components/link-preview/link-preview.tsx");
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












const Link = (props)=>{
    _s();
    const [isModalVisible, setIsModalVisible] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation)();
    const { styles } = (0,_link_styles__WEBPACK_IMPORTED_MODULE_11__.useStyles)();
    const { openElement } = (0,_Pimcore_modules_element_hooks_use_element_helper__WEBPACK_IMPORTED_MODULE_9__.useElementHelper)();
    const value = props.value ?? null;
    const handleChange = (value)=>{
        var _props_onChange;
        console.log('----->>>>>> Link handleChange: ', value);
        (_props_onChange = props.onChange) === null || _props_onChange === void 0 ? void 0 : _props_onChange.call(props, value);
    };
    const showModal = ()=>{
        setIsModalVisible(true);
    };
    const hideModal = ()=>{
        setIsModalVisible(false);
    };
    const openLink = ()=>{
        if (value === null) {
            return;
        }
        if (value.linktype === 'direct' && value.direct !== null && !lodash__WEBPACK_IMPORTED_MODULE_8___default().isEmpty(value.direct)) {
            window.open(value.direct, '_blank');
        }
        const internalType = (0,_Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_link_utils_link_value_converter__WEBPACK_IMPORTED_MODULE_10__.convertType)(value.internalType ?? null);
        const internal = value.internal ?? null;
        if (value.linktype === 'internal' && internalType !== null && internal !== null) {
            openElement({
                type: internalType,
                id: internal
            }).catch((error)=>{
                console.error('Error while opening element:', error);
            });
        }
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_3__.Flex, {
        align: "center",
        className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(styles.link, props.className),
        gap: "extra-small",
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_link_preview_link_preview__WEBPACK_IMPORTED_MODULE_12__.LinkPreview, {
                className: "studio-inherited-overlay",
                inherited: props.inherited,
                value: value
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/link.tsx",
                lineNumber: 106,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_tooltip_tooltip__WEBPACK_IMPORTED_MODULE_6__.Tooltip, {
                title: t('open'),
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_5__.IconButton, {
                    disabled: value === null || lodash__WEBPACK_IMPORTED_MODULE_8___default().isEmpty(value.fullPath),
                    icon: {
                        value: 'open-folder'
                    },
                    onClick: openLink,
                    type: "default"
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/link.tsx",
                    lineNumber: 116,
                    columnNumber: 9
                }, undefined)
            }, "open", false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/link.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, undefined),
            props.disabled !== true ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_tooltip_tooltip__WEBPACK_IMPORTED_MODULE_6__.Tooltip, {
                title: t('edit'),
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_5__.IconButton, {
                    icon: {
                        value: 'edit'
                    },
                    onClick: showModal,
                    type: "default"
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/link.tsx",
                    lineNumber: 130,
                    columnNumber: 13
                }, undefined)
            }, "edit", false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/link.tsx",
                lineNumber: 126,
                columnNumber: 11
            }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_tooltip_tooltip__WEBPACK_IMPORTED_MODULE_6__.Tooltip, {
                title: t('details'),
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_5__.IconButton, {
                    icon: {
                        value: 'info-circle'
                    },
                    onClick: showModal,
                    type: "default"
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/link.tsx",
                    lineNumber: 142,
                    columnNumber: 13
                }, undefined)
            }, "details", false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/link.tsx",
                lineNumber: 138,
                columnNumber: 11
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_link_modal__WEBPACK_IMPORTED_MODULE_7__.LinkModal, {
                allowedTargets: props.allowedTargets,
                allowedTypes: props.allowedTypes,
                disabled: props.disabled,
                disabledFields: props.disabledFields,
                onClose: hideModal,
                onSave: handleChange,
                open: isModalVisible,
                value: value
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/link.tsx",
                lineNumber: 150,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/link.tsx",
        lineNumber: 101,
        columnNumber: 5
    }, undefined);
};
_s(Link, "tgpapYisNefCK8UnO5k5/dhZ/Ng=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation,
        _link_styles__WEBPACK_IMPORTED_MODULE_11__.useStyles,
        _Pimcore_modules_element_hooks_use_element_helper__WEBPACK_IMPORTED_MODULE_9__.useElementHelper
    ];
});
_c = Link;
var _c;
$RefreshReg$(_c, "Link");

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
//# sourceMappingURL=js_src_core_mf-bootstrap_ts.f7615734d905297f.hot-update.js.map