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
/* ESM import */var _Pimcore_components_form_keyed_list_provider_keyed_list_use_keyed_list__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/form/keyed-list/provider/keyed-list/use-keyed-list.ts");
/* ESM import */var _Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/form/form.tsx");
/* ESM import */var _Pimcore_components_input_input__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/input/input.tsx");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);
/* ESM import */var _layout_related_views_base_view__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/layout-related/views/base-view.tsx");
/* ESM import */var _classification_store_item__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/classification-store-item.tsx");
/* ESM import */var _Pimcore_modules_data_object_editor_toolbar_language_selection_provider_use_language_selection__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/data-object/editor/toolbar/language-selection/provider/use-language-selection.tsx");
/* ESM import */var _localization_switch__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/localization-switch.tsx");
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var _Pimcore_components_space_space__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/components/space/space.tsx");
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
    const { values } = (0,_Pimcore_components_form_keyed_list_provider_keyed_list_use_keyed_list__WEBPACK_IMPORTED_MODULE_2__.useKeyedList)();
    const { activeGroups, groupCollectionMapping, ...groups } = values;
    const [localizationMode, setLocalizationMode] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('default');
    const { currentLanguage } = (0,_Pimcore_modules_data_object_editor_toolbar_language_selection_provider_use_language_selection__WEBPACK_IMPORTED_MODULE_8__.useLanguageSelection)();
    let localizationGroup = 'default';
    const isLocalizable = props.localized ?? false;
    console.log('========= props: ', props === null || props === void 0 ? void 0 : props.activeGroupDefinitions);
    console.log('========= values: ', values);
    const onLocalizationChange = (value)=>{
        setLocalizationMode(value);
    };
    if (localizationMode === 'current-language') {
        localizationGroup = currentLanguage;
    }
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_layout_related_views_base_view__WEBPACK_IMPORTED_MODULE_6__.BaseView, {
            border: true,
            collapsed: false,
            collapsible: true,
            extra: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_10__.Flex, {
                className: "w-full",
                justify: "space-between",
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {}, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/classification-store-content.tsx",
                        lineNumber: 57,
                        columnNumber: 11
                    }, void 0),
                    isLocalizable ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_localization_switch__WEBPACK_IMPORTED_MODULE_9__.LocalizationSwitch, {
                        initialValue: localizationGroup,
                        onChange: onLocalizationChange
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/classification-store-content.tsx",
                        lineNumber: 61,
                        columnNumber: 15
                    }, void 0) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}, void 0, false)
                ]
            }, void 0, true, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/classification-store-content.tsx",
                lineNumber: 52,
                columnNumber: 9
            }, void 0),
            extraPosition: "start",
            theme: "default",
            title: props.title,
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_space_space__WEBPACK_IMPORTED_MODULE_11__.Space, {
                    className: "w-full",
                    direction: "vertical",
                    size: "small",
                    children: Object.keys((0,lodash__WEBPACK_IMPORTED_MODULE_5__.isObject)(groups) ? groups : {}).map((key)=>{
                        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_3__.Form.Group, {
                            name: [
                                key,
                                localizationGroup
                            ],
                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_classification_store_item__WEBPACK_IMPORTED_MODULE_7__.ClassificationStoreItem, {
                                currentLayout: props === null || props === void 0 ? void 0 : props.activeGroupDefinitions[key],
                                groupId: key
                            }, void 0, false, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/classification-store-content.tsx",
                                lineNumber: 84,
                                columnNumber: 17
                            }, undefined)
                        }, `${key}`, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/classification-store-content.tsx",
                            lineNumber: 80,
                            columnNumber: 15
                        }, undefined);
                    })
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/classification-store-content.tsx",
                    lineNumber: 73,
                    columnNumber: 7
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_3__.Form.Item, {
                    name: [
                        'groupCollectionMapping'
                    ],
                    style: {
                        display: 'none'
                    },
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_input_input__WEBPACK_IMPORTED_MODULE_4__.Input, {
                        type: "hidden",
                        value: activeGroups ?? {}
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/classification-store-content.tsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/classification-store-content.tsx",
                    lineNumber: 93,
                    columnNumber: 7
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_3__.Form.Item, {
                    name: [
                        'groupCollectionMapping'
                    ],
                    style: {
                        display: 'none'
                    },
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_input_input__WEBPACK_IMPORTED_MODULE_4__.Input, {
                        type: "hidden",
                        value: groupCollectionMapping ?? {}
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/classification-store-content.tsx",
                        lineNumber: 107,
                        columnNumber: 9
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/classification-store-content.tsx",
                    lineNumber: 103,
                    columnNumber: 7
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/classification-store-content.tsx",
            lineNumber: 47,
            columnNumber: 5
        }, undefined), [
        values,
        localizationGroup
    ]);
};
_s(ClassificationStoreContent, "TchZGMeyzKILtl5vDF/rsD0KVeM=", false, function() {
    return [
        _Pimcore_components_form_keyed_list_provider_keyed_list_use_keyed_list__WEBPACK_IMPORTED_MODULE_2__.useKeyedList,
        _Pimcore_modules_data_object_editor_toolbar_language_selection_provider_use_language_selection__WEBPACK_IMPORTED_MODULE_8__.useLanguageSelection
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
"./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/classification-store-item.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ClassificationStoreItem: () => (ClassificationStoreItem)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/content/content.tsx");
/* ESM import */var _Pimcore_components_form_item_provider_item_use_item__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/form/item/provider/item/use-item.ts");
/* ESM import */var _Pimcore_modules_data_object_classification_store_classification_store_api_slice_gen__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/data-object/classification-store/classification-store-api-slice.gen.ts");
/* ESM import */var _Pimcore_modules_data_object_editor_types_object_tab_manager_tabs_edit_components_object_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/object-component.tsx");
/* ESM import */var _Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/element/hooks/use-element-context.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_6__);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* ESM import */var _layout_related_views_base_view__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/layout-related/views/base-view.tsx");
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








const ClassificationStoreItem = (props)=>{
    _s();
    const { name } = (0,_Pimcore_components_form_item_provider_item_use_item__WEBPACK_IMPORTED_MODULE_2__.useItem)();
    const fieldName = (0,lodash__WEBPACK_IMPORTED_MODULE_6__.isArray)(name) ? name[name.length - 1] : name;
    const { groupId } = props;
    const { id } = (0,_Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_5__.useElementContext)();
    const { isLoading, data } = (0,_Pimcore_modules_data_object_classification_store_classification_store_api_slice_gen__WEBPACK_IMPORTED_MODULE_3__.useClassificationStoreGetLayoutByGroupQuery)({
        fieldName,
        groupId: parseInt(groupId),
        objectId: id
    });
    return (0,react__WEBPACK_IMPORTED_MODULE_7__.useMemo)(()=>{
        if (isLoading) {
            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_1__.Content, {
                loading: true
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/classification-store-item.tsx",
                lineNumber: 34,
                columnNumber: 14
            }, undefined);
        }
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_layout_related_views_base_view__WEBPACK_IMPORTED_MODULE_8__.BaseView, {
            border: false,
            collapsed: false,
            collapsible: true,
            theme: "border-highlight",
            title: data === null || data === void 0 ? void 0 : data.name,
            children: data === null || data === void 0 ? void 0 : data.keys.map((item)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_data_object_editor_types_object_tab_manager_tabs_edit_components_object_component__WEBPACK_IMPORTED_MODULE_4__.ObjectComponent, {
                    ...item.definition,
                    name: item.id
                }, item.id, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/classification-store-item.tsx",
                    lineNumber: 46,
                    columnNumber: 11
                }, undefined))
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/classification-store-item.tsx",
            lineNumber: 38,
            columnNumber: 7
        }, undefined);
    }, [
        data,
        isLoading,
        groupId,
        id,
        fieldName
    ]);
};
_s(ClassificationStoreItem, "HjXplAL7hCHxiQyWlXswS1wBBZU=", false, function() {
    return [
        _Pimcore_components_form_item_provider_item_use_item__WEBPACK_IMPORTED_MODULE_2__.useItem,
        _Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_5__.useElementContext,
        _Pimcore_modules_data_object_classification_store_classification_store_api_slice_gen__WEBPACK_IMPORTED_MODULE_3__.useClassificationStoreGetLayoutByGroupQuery
    ];
});
_c = ClassificationStoreItem;
var _c;
$RefreshReg$(_c, "ClassificationStoreItem");

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
//# sourceMappingURL=js_src_core_mf-bootstrap_ts.2b5a25cd7bc1aaec.hot-update.js.map