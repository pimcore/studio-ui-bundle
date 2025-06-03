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
"./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/classification-store-content.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ClassificationStoreContent: () => (ClassificationStoreContent)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _Pimcore_components_form_keyed_list_provider_keyed_list_use_keyed_list__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/form/keyed-list/provider/keyed-list/use-keyed-list.ts");
/* ESM import */var _Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/form/form.tsx");
/* ESM import */var _Pimcore_components_input_input__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/input/input.tsx");
/* ESM import */var _layout_related_views_base_view__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/layout-related/views/base-view.tsx");
/* ESM import */var _classification_store_item__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/classification-store-item.tsx");
/* ESM import */var _Pimcore_modules_data_object_editor_toolbar_language_selection_provider_use_language_selection__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/data-object/editor/toolbar/language-selection/provider/use-language-selection.tsx");
Object(function webpackMissingModule() { var e = new Error("Cannot find module './localization-switch'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var _Pimcore_components_space_space__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/components/space/space.tsx");
/* ESM import */var _Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/components/button/button.tsx");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
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














const ClassificationStoreContent = (props)=>{
    _s();
    const [localizationMode, setLocalizationMode] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('default');
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)();
    const { values } = (0,_Pimcore_components_form_keyed_list_provider_keyed_list_use_keyed_list__WEBPACK_IMPORTED_MODULE_4__.useKeyedList)();
    const { activeGroups, groupCollectionMapping, ...groups } = values;
    const { currentLanguage } = (0,_Pimcore_modules_data_object_editor_toolbar_language_selection_provider_use_language_selection__WEBPACK_IMPORTED_MODULE_9__.useLanguageSelection)();
    let localizationGroup = 'default';
    const isLocalizable = props.localized ?? false;
    const activeGroupLayout = props.activeGroupDefinitions ?? [];
    const onLocalizationChange = (value)=>{
        setLocalizationMode(value);
    };
    if (localizationMode === 'current-language') {
        localizationGroup = currentLanguage;
    }
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_layout_related_views_base_view__WEBPACK_IMPORTED_MODULE_7__.BaseView, {
            border: true,
            collapsed: false,
            collapsible: true,
            extra: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_11__.Flex, {
                align: "center",
                className: "w-full",
                justify: "space-between",
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_13__.Button, {
                        color: "default",
                        icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_14__.Icon, {
                            value: "folder-search"
                        }, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/classification-store-content.tsx",
                            lineNumber: 62,
                            columnNumber: 20
                        }, void 0),
                        variant: "filled",
                        children: t('add')
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/classification-store-content.tsx",
                        lineNumber: 60,
                        columnNumber: 11
                    }, void 0),
                    isLocalizable ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Object(function webpackMissingModule() { var e = new Error("Cannot find module './localization-switch'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), {
                        initialValue: localizationGroup,
                        onChange: onLocalizationChange
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/classification-store-content.tsx",
                        lineNumber: 70,
                        columnNumber: 15
                    }, void 0) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}, void 0, false)
                ]
            }, void 0, true, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/classification-store-content.tsx",
                lineNumber: 55,
                columnNumber: 9
            }, void 0),
            extraPosition: "start",
            theme: "default",
            title: props.title,
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_space_space__WEBPACK_IMPORTED_MODULE_12__.Space, {
                    className: "w-full",
                    direction: "vertical",
                    size: "small",
                    children: Object.keys((0,lodash__WEBPACK_IMPORTED_MODULE_3__.isObject)(groups) ? groups : {}).map((key)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_5__.Form.Group, {
                            name: [
                                key,
                                localizationGroup
                            ],
                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_classification_store_item__WEBPACK_IMPORTED_MODULE_8__.ClassificationStoreItem, {
                                groupLayout: (0,lodash__WEBPACK_IMPORTED_MODULE_3__.find)(activeGroupLayout, {
                                    id: parseInt(key)
                                })
                            }, void 0, false, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/classification-store-content.tsx",
                                lineNumber: 92,
                                columnNumber: 13
                            }, undefined)
                        }, `${key}`, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/classification-store-content.tsx",
                            lineNumber: 88,
                            columnNumber: 11
                        }, undefined))
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/classification-store-content.tsx",
                    lineNumber: 82,
                    columnNumber: 7
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_5__.Form.Item, {
                    name: [
                        'groupCollectionMapping'
                    ],
                    style: {
                        display: 'none'
                    },
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_input_input__WEBPACK_IMPORTED_MODULE_6__.Input, {
                        type: "hidden",
                        value: activeGroups ?? {}
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/classification-store-content.tsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/classification-store-content.tsx",
                    lineNumber: 97,
                    columnNumber: 7
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_5__.Form.Item, {
                    name: [
                        'groupCollectionMapping'
                    ],
                    style: {
                        display: 'none'
                    },
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_input_input__WEBPACK_IMPORTED_MODULE_6__.Input, {
                        type: "hidden",
                        value: groupCollectionMapping ?? {}
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/classification-store-content.tsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/classification-store-content.tsx",
                    lineNumber: 107,
                    columnNumber: 7
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/classification-store-content.tsx",
            lineNumber: 50,
            columnNumber: 5
        }, undefined), [
        values,
        localizationGroup
    ]);
};
_s(ClassificationStoreContent, "80fDeuRYc8X62/NgIy0/ZDKddXU=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation,
        _Pimcore_components_form_keyed_list_provider_keyed_list_use_keyed_list__WEBPACK_IMPORTED_MODULE_4__.useKeyedList,
        _Pimcore_modules_data_object_editor_toolbar_language_selection_provider_use_language_selection__WEBPACK_IMPORTED_MODULE_9__.useLanguageSelection
    ];
});
_c = ClassificationStoreContent;
var _c;
$RefreshReg$(_c, "ClassificationStoreContent");

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
//# sourceMappingURL=js_src_core_mf-bootstrap_ts.6ed037ae662f81c6.hot-update.js.map