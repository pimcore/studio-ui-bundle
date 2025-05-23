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
"./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/modal.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  LinkModal: () => (LinkModal)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/form/form.tsx");
/* ESM import */var _Pimcore_components_space_space__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/space/space.tsx");
/* ESM import */var _Pimcore_components_input_input__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/input/input.tsx");
/* ESM import */var _Pimcore_components_modal_window_modal_window_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/modal/window-modal/window-modal.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_components_select_select__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/select/select.tsx");
/* ESM import */var _Pimcore_components_card_card__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/card/card.tsx");
/* ESM import */var _Pimcore_components_tabs_tabs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/components/tabs/tabs.tsx");
/* ESM import */var _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_many_to_one_relation_many_to_one_relation__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-one-relation/many-to-one-relation.tsx");
/* ESM import */var _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_link_utils_link_value_converter__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/utils/link-value-converter.ts");
/* ESM import */var _Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/components/modal/form-modal/hooks/use-form-modal.tsx");
/* ESM import */var _Pimcore_components_icon_text_button_icon_text_button__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/components/icon-text-button/icon-text-button.tsx");
/* ESM import */var _Pimcore_components_button_group_button_group__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/components/button-group/button-group.tsx");
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
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















const LinkModal = (props)=>{
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_6__.useTranslation)();
    const [form] = _Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_2__.Form.useForm();
    const emptyLinkValue = {
        linktype: 'direct',
        text: '',
        direct: '',
        fullPath: '',
        target: '',
        parameters: '',
        anchor: '',
        title: '',
        accesskey: '',
        rel: '',
        tabindex: '',
        class: ''
    };
    const { confirm } = (0,_Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_12__.useFormModal)();
    console.log('------ LinkModal form: ', form);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        form.setFieldsValue((0,_Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_link_utils_link_value_converter__WEBPACK_IMPORTED_MODULE_11__.convertToInternalLinkValue)(props.value ?? emptyLinkValue));
    }, [
        props.value
    ]);
    const handleOk = ()=>{
        const values = form.getFieldsValue();
        const newValue = (0,_Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_link_utils_link_value_converter__WEBPACK_IMPORTED_MODULE_11__.convertFromInternalLinkValue)(values);
        props.onSave(newValue);
        props.onClose();
    };
    const handleCancel = ()=>{
        props.onClose();
        const newValue = props.value ?? {
            ...emptyLinkValue
        };
        form.setFieldsValue((0,_Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_link_utils_link_value_converter__WEBPACK_IMPORTED_MODULE_11__.convertToInternalLinkValue)(newValue));
    };
    const emptyValue = ()=>{
        const newValue = {
            ...emptyLinkValue
        };
        form.setFieldsValue((0,_Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_link_utils_link_value_converter__WEBPACK_IMPORTED_MODULE_11__.convertToInternalLinkValue)(newValue));
        props.onSave(newValue);
        props.onClose();
    };
    const isTypeAllowed = (type)=>{
        if (props.allowedTypes.length === 0) {
            return true;
        }
        return props.allowedTypes.includes(type);
    };
    const getTargetOptions = ()=>{
        const allowedTargets = props.allowedTargets.length > 0 ? props.allowedTargets : [
            '_blank',
            '_self',
            '_top',
            '_parent'
        ];
        return allowedTargets.map((target)=>({
                value: target,
                label: target
            }));
    };
    const basicTab = {
        key: 'basic',
        label: t('link.tab.basic'),
        forceRender: true,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_space_space__WEBPACK_IMPORTED_MODULE_3__.Space, {
            className: "w-full",
            direction: "vertical",
            size: "small",
            children: [
                !props.disabledFields.includes('text') && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_2__.Form.Item, {
                    label: t('link.text'),
                    name: "text",
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_input_input__WEBPACK_IMPORTED_MODULE_4__.Input, {
                        disabled: props.disabled
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/modal.tsx",
                        lineNumber: 110,
                        columnNumber: 13
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/modal.tsx",
                    lineNumber: 106,
                    columnNumber: 11
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_2__.Form.Item, {
                    label: t('link.path'),
                    name: "path",
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_many_to_one_relation_many_to_one_relation__WEBPACK_IMPORTED_MODULE_10__.ManyToOneRelation, {
                        allowPathTextInput: true,
                        assetsAllowed: isTypeAllowed('asset'),
                        dataObjectsAllowed: isTypeAllowed('object'),
                        disabled: props.disabled,
                        documentsAllowed: isTypeAllowed('document')
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/modal.tsx",
                        lineNumber: 118,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/modal.tsx",
                    lineNumber: 114,
                    columnNumber: 9
                }, undefined),
                ![
                    'target',
                    'parameters',
                    'anchor',
                    'title'
                ].every((field)=>props.disabledFields.includes(field)) && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_card_card__WEBPACK_IMPORTED_MODULE_8__.Card, {
                    theme: "card-with-highlight",
                    title: t('link.properties'),
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_space_space__WEBPACK_IMPORTED_MODULE_3__.Space, {
                        className: "w-full",
                        direction: "vertical",
                        size: "small",
                        children: [
                            !props.disabledFields.includes('target') && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_2__.Form.Item, {
                                label: t('link.target'),
                                name: "target",
                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_select_select__WEBPACK_IMPORTED_MODULE_7__.Select, {
                                    allowClear: true,
                                    disabled: props.disabled,
                                    options: getTargetOptions()
                                }, void 0, false, {
                                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/modal.tsx",
                                    lineNumber: 141,
                                    columnNumber: 19
                                }, undefined)
                            }, void 0, false, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/modal.tsx",
                                lineNumber: 137,
                                columnNumber: 17
                            }, undefined),
                            !props.disabledFields.includes('parameters') && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_2__.Form.Item, {
                                label: t('link.parameters'),
                                name: "parameters",
                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_input_input__WEBPACK_IMPORTED_MODULE_4__.Input, {
                                    disabled: props.disabled
                                }, void 0, false, {
                                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/modal.tsx",
                                    lineNumber: 154,
                                    columnNumber: 19
                                }, undefined)
                            }, void 0, false, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/modal.tsx",
                                lineNumber: 150,
                                columnNumber: 17
                            }, undefined),
                            !props.disabledFields.includes('anchor') && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_2__.Form.Item, {
                                label: t('link.anchor'),
                                name: "anchor",
                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_input_input__WEBPACK_IMPORTED_MODULE_4__.Input, {
                                    disabled: props.disabled
                                }, void 0, false, {
                                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/modal.tsx",
                                    lineNumber: 163,
                                    columnNumber: 19
                                }, undefined)
                            }, void 0, false, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/modal.tsx",
                                lineNumber: 159,
                                columnNumber: 17
                            }, undefined),
                            !props.disabledFields.includes('title') && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_2__.Form.Item, {
                                label: t('link.title'),
                                name: "title",
                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_input_input__WEBPACK_IMPORTED_MODULE_4__.Input, {
                                    disabled: props.disabled
                                }, void 0, false, {
                                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/modal.tsx",
                                    lineNumber: 172,
                                    columnNumber: 19
                                }, undefined)
                            }, void 0, false, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/modal.tsx",
                                lineNumber: 168,
                                columnNumber: 17
                            }, undefined)
                        ]
                    }, void 0, true, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/modal.tsx",
                        lineNumber: 131,
                        columnNumber: 13
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/modal.tsx",
                    lineNumber: 127,
                    columnNumber: 11
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/modal.tsx",
            lineNumber: 100,
            columnNumber: 7
        }, undefined)
    };
    const advancedTab = {
        key: 'advanced',
        label: t('link.tab.advanced'),
        forceRender: true,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_space_space__WEBPACK_IMPORTED_MODULE_3__.Space, {
            className: "w-full",
            direction: "vertical",
            size: "small",
            children: [
                !props.disabledFields.includes('accesskey') && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_2__.Form.Item, {
                    label: t('link.accesskey'),
                    name: "accesskey",
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_input_input__WEBPACK_IMPORTED_MODULE_4__.Input, {
                        disabled: props.disabled
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/modal.tsx",
                        lineNumber: 197,
                        columnNumber: 13
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/modal.tsx",
                    lineNumber: 193,
                    columnNumber: 11
                }, undefined),
                !props.disabledFields.includes('rel') && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_2__.Form.Item, {
                    label: t('link.rel'),
                    name: "rel",
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_input_input__WEBPACK_IMPORTED_MODULE_4__.Input, {
                        disabled: props.disabled
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/modal.tsx",
                        lineNumber: 206,
                        columnNumber: 13
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/modal.tsx",
                    lineNumber: 202,
                    columnNumber: 11
                }, undefined),
                !props.disabledFields.includes('tabindex') && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_2__.Form.Item, {
                    label: t('link.tabindex'),
                    name: "tabindex",
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_input_input__WEBPACK_IMPORTED_MODULE_4__.Input, {
                        disabled: props.disabled
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/modal.tsx",
                        lineNumber: 215,
                        columnNumber: 13
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/modal.tsx",
                    lineNumber: 211,
                    columnNumber: 11
                }, undefined),
                !props.disabledFields.includes('class') && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_2__.Form.Item, {
                    label: t('link.class'),
                    name: "class",
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_input_input__WEBPACK_IMPORTED_MODULE_4__.Input, {
                        disabled: props.disabled
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/modal.tsx",
                        lineNumber: 224,
                        columnNumber: 13
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/modal.tsx",
                    lineNumber: 220,
                    columnNumber: 11
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/modal.tsx",
            lineNumber: 187,
            columnNumber: 7
        }, undefined)
    };
    const tabItems = [
        basicTab
    ];
    if (![
        'accesskey',
        'rel',
        'tabindex',
        'class'
    ].every((field)=>props.disabledFields.includes(field))) {
        tabItems.push(advancedTab);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_modal_window_modal_window_modal__WEBPACK_IMPORTED_MODULE_5__.WindowModal, {
        footer: props.disabled === true ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {}, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/modal.tsx",
            lineNumber: 242,
            columnNumber: 11
        }, void 0) : (_, param)=>{
            let { OkBtn, CancelBtn } = param;
            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_15__.Flex, {
                className: "w-100",
                justify: "flex-end",
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_group_button_group__WEBPACK_IMPORTED_MODULE_14__.ButtonGroup, {
                    items: [
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_text_button_icon_text_button__WEBPACK_IMPORTED_MODULE_13__.IconTextButton, {
                            icon: {
                                value: 'trash'
                            },
                            onClick: ()=>confirm({
                                    title: t('empty'),
                                    content: t('empty.confirm'),
                                    onOk: emptyValue
                                }),
                            children: t('empty')
                        }, "empty", false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/modal.tsx",
                            lineNumber: 249,
                            columnNumber: 15
                        }, void 0),
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(CancelBtn, {}, "cancel", false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/modal.tsx",
                            lineNumber: 260,
                            columnNumber: 15
                        }, void 0),
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(OkBtn, {}, "ok", false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/modal.tsx",
                            lineNumber: 261,
                            columnNumber: 15
                        }, void 0)
                    ]
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/modal.tsx",
                    lineNumber: 248,
                    columnNumber: 13
                }, void 0)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/modal.tsx",
                lineNumber: 244,
                columnNumber: 11
            }, void 0);
        },
        okText: t('save'),
        onCancel: handleCancel,
        onOk: handleOk,
        open: props.open,
        size: "M",
        title: t('link.edit-title'),
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_2__.Form, {
            form: form,
            layout: "vertical",
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_tabs_tabs__WEBPACK_IMPORTED_MODULE_9__.Tabs, {
                items: tabItems,
                noPadding: true,
                size: "small"
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/modal.tsx",
                lineNumber: 277,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/modal.tsx",
            lineNumber: 273,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/link/modal.tsx",
        lineNumber: 240,
        columnNumber: 5
    }, undefined);
};
_s(LinkModal, "ybVBBFoa8Kgxsdb/8u7Rfk1dZUo=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_6__.useTranslation,
        _Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_2__.Form.useForm,
        _Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_12__.useFormModal
    ];
});
_c = LinkModal;
var _c;
$RefreshReg$(_c, "LinkModal");

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
//# sourceMappingURL=js_src_core_mf-bootstrap_ts.39b629e9d8a5173e.hot-update.js.map