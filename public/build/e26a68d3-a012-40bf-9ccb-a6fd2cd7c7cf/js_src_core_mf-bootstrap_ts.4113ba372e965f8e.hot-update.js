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
"./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/url-slug/url-slug.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  UrlSlug: () => (UrlSlug)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/classnames/index.js");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var _Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/utils/css.tsx");
/* ESM import */var _Pimcore_modules_document_hooks_use_sites__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/document/hooks/use-sites.ts");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/dropdown/dropdown.tsx");
/* ESM import */var _Pimcore_components_dropdown_button_dropdown_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/components/dropdown-button/dropdown-button.tsx");
/* ESM import */var _Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/components/icon-button/icon-button.tsx");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_11__);
/* ESM import */var _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_providers_field_width_use_field_width__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/use-field-width.tsx");
/* ESM import */var _url_slug_styles__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/url-slug/url-slug.styles.tsx");
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













const getInitialValue = (value)=>{
    return !(0,lodash__WEBPACK_IMPORTED_MODULE_11__.isNil)(value) && !(0,lodash__WEBPACK_IMPORTED_MODULE_11__.isEmpty)(value) ? value : [
        {
            slug: '',
            siteId: 0
        }
    ];
};
const UrlSlug = (props)=>{
    _s();
    console.log('----->>>>>> value 1: ', props === null || props === void 0 ? void 0 : props.value);
    const value = getInitialValue(props.value);
    if ((0,lodash__WEBPACK_IMPORTED_MODULE_11__.isPlainObject)(value) && !value.some((entry)=>entry.siteId === 0)) {
        value.unshift({
            slug: '',
            siteId: 0
        });
    }
    console.log('----->>>>>> value 2: ', value);
    const [errors, setErrors] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_7__.useTranslation)();
    const { styles } = (0,_url_slug_styles__WEBPACK_IMPORTED_MODULE_13__.useStyles)();
    const { getSiteById, getRemainingSites } = (0,_Pimcore_modules_document_hooks_use_sites__WEBPACK_IMPORTED_MODULE_6__.useSites)();
    const fieldWidth = (0,_Pimcore_modules_element_dynamic_types_definitions_objects_data_related_providers_field_width_use_field_width__WEBPACK_IMPORTED_MODULE_12__.useFieldWidth)();
    const { Text } = antd__WEBPACK_IMPORTED_MODULE_2__.Typography;
    const handleChange = (value)=>{
        var _props_onChange;
        (_props_onChange = props.onChange) === null || _props_onChange === void 0 ? void 0 : _props_onChange.call(props, value);
    };
    const validateSlug = (slug)=>{
        if (slug !== '') {
            if (!slug.startsWith('/') || slug.length < 2) {
                return false;
            }
            slug = slug.substring(1).replace(/\/$/, '');
            const parts = slug.split('/');
            for (const part of parts){
                if (part.length === 0) {
                    return false;
                }
            }
        }
        return true;
    };
    const handleInputChange = (index, newSlug)=>{
        const newValue = (0,lodash__WEBPACK_IMPORTED_MODULE_11__.cloneDeep)(value);
        newValue[index].slug = newSlug;
        const newErrors = [
            ...errors
        ];
        newErrors[index] = !validateSlug(newSlug);
        handleChange(newValue);
        setErrors(newErrors);
    };
    const remainingSites = getRemainingSites(value.map((item)=>item.siteId), props.availableSites ?? undefined);
    const remainingSitesMenuItems = remainingSites.map((site)=>({
            key: site.id,
            label: site.domain,
            onClick: ()=>{
                handleChange([
                    ...value,
                    {
                        slug: '',
                        siteId: site.id
                    }
                ]);
            }
        }));
    const sortedValue = [
        ...value
    ].sort((a, b)=>a.siteId === 0 ? -1 : 0);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.List, {
        bordered: true,
        className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(styles.container, props.className),
        dataSource: sortedValue,
        loadMore: remainingSites.length > 0 && props.disabled !== true && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.List.Item, {
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_8__.Dropdown, {
                menu: {
                    items: remainingSitesMenuItems
                },
                trigger: [
                    'click'
                ],
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_dropdown_button_dropdown_button__WEBPACK_IMPORTED_MODULE_9__.DropdownButton, {
                    type: "default",
                    children: t('url-slug.add-site')
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/url-slug/url-slug.tsx",
                    lineNumber: 114,
                    columnNumber: 11
                }, void 0)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/url-slug/url-slug.tsx",
                lineNumber: 110,
                columnNumber: 9
            }, void 0)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/url-slug/url-slug.tsx",
            lineNumber: 109,
            columnNumber: 7
        }, void 0),
        renderItem: (item, index)=>{
            var _getSiteById;
            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.List.Item, {
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_4__.Flex, {
                    align: "center",
                    className: "w-full",
                    gap: "small",
                    justify: "center",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                            className: "urlSlugLabel",
                            style: {
                                width: (0,_Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_5__.toCssDimension)(props.domainLabelWidth, 250)
                            },
                            children: item.siteId === 0 ? t('fallback') : (_getSiteById = getSiteById(item.siteId)) === null || _getSiteById === void 0 ? void 0 : _getSiteById.domain
                        }, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/url-slug/url-slug.tsx",
                            lineNumber: 128,
                            columnNumber: 13
                        }, void 0),
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                            className: "w-full",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Input, {
                                    disabled: props.disabled,
                                    onChange: (e)=>{
                                        handleInputChange(index, e.target.value);
                                    },
                                    status: errors[index] ? 'error' : undefined,
                                    value: item.slug
                                }, void 0, false, {
                                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/url-slug/url-slug.tsx",
                                    lineNumber: 135,
                                    columnNumber: 15
                                }, void 0),
                                errors[index] && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Text, {
                                    type: "danger",
                                    children: t('url-slug.invalid')
                                }, void 0, false, {
                                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/url-slug/url-slug.tsx",
                                    lineNumber: 142,
                                    columnNumber: 15
                                }, void 0)
                            ]
                        }, void 0, true, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/url-slug/url-slug.tsx",
                            lineNumber: 134,
                            columnNumber: 13
                        }, void 0),
                        props.disabled !== true && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Tooltip, {
                            title: t('remove'),
                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_10__.IconButton, {
                                disabled: item.siteId === 0,
                                icon: {
                                    value: 'trash'
                                },
                                onClick: ()=>{
                                    const newValue = [
                                        ...value
                                    ];
                                    newValue.splice(index, 1);
                                    handleChange(newValue);
                                },
                                style: {
                                    visibility: item.siteId === 0 ? 'hidden' : undefined
                                }
                            }, void 0, false, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/url-slug/url-slug.tsx",
                                lineNumber: 149,
                                columnNumber: 15
                            }, void 0)
                        }, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/url-slug/url-slug.tsx",
                            lineNumber: 148,
                            columnNumber: 13
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/url-slug/url-slug.tsx",
                    lineNumber: 122,
                    columnNumber: 11
                }, void 0)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/url-slug/url-slug.tsx",
                lineNumber: 121,
                columnNumber: 9
            }, void 0);
        },
        size: "small",
        style: {
            maxWidth: (0,_Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_5__.toCssDimension)(props.width, fieldWidth.large)
        }
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/url-slug/url-slug.tsx",
        lineNumber: 104,
        columnNumber: 5
    }, undefined);
};
_s(UrlSlug, "ehaVJXjDVVe6Adm8ay3y3njZ6TA=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_7__.useTranslation,
        _url_slug_styles__WEBPACK_IMPORTED_MODULE_13__.useStyles,
        _Pimcore_modules_document_hooks_use_sites__WEBPACK_IMPORTED_MODULE_6__.useSites,
        _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_providers_field_width_use_field_width__WEBPACK_IMPORTED_MODULE_12__.useFieldWidth
    ];
});
_c = UrlSlug;
var _c;
$RefreshReg$(_c, "UrlSlug");

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
//# sourceMappingURL=js_src_core_mf-bootstrap_ts.4113ba372e965f8e.hot-update.js.map