"use strict";
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["js_src_core_modules_asset_editor_toolbar_workflow-log-modal_workflow-log-modal_tsx-js_src_cor-41db90"], {
"./js/src/core/modules/app/global-context/global-context-slice.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addGlobalContext: () => (addGlobalContext),
  removeGlobalContext: () => (removeGlobalContext),
  selectContextByType: () => (selectContextByType)
});
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs");
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

const initialState = [];
const globalContextSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__.createSlice)({
    name: 'global-context',
    initialState,
    reducers: {
        addGlobalContext: (state, action)=>{
            state.push(action.payload);
        },
        removeGlobalContext: (state, action)=>{
            return state.filter((context)=>context.type !== action.payload);
        }
    },
    selectors: {
        selectContextByType: (state, type)=>{
            return state.find((context)=>context.type === type);
        }
    }
});
(0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.injectSliceWithState)(globalContextSlice);
const { addGlobalContext, removeGlobalContext } = globalContextSlice.actions;
const { selectContextByType } = globalContextSlice.getSelectors((state)=>state['global-context']);

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
"./js/src/core/modules/asset/editor/toolbar/workflow-log-modal/workflow-log-modal.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  WorkflowLogModal: () => (WorkflowLogModal)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_modal_footer_modal_footer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/modal/footer/modal-footer.tsx");
/* ESM import */var _Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/button/button.tsx");
/* ESM import */var _Pimcore_components_modal_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/modal/modal.tsx");
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var _Pimcore_components_modal_modal_title_modal_title__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/modal/modal-title/modal-title.tsx");
/* ESM import */var _Pimcore_modules_asset_editor_toolbar_workflow_log_modal_hooks_use_workflow__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/asset/editor/toolbar/workflow-log-modal/hooks/use-workflow.ts");
/* ESM import */var _Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/form/form.tsx");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_9__);
/* ESM import */var i18next__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./node_modules/i18next/dist/esm/i18next.js");
/* ESM import */var _Pimcore_modules_asset_editor_toolbar_workflow_log_modal_hooks_use_submit_workflow__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/asset/editor/toolbar/workflow-log-modal/hooks/use-submit-workflow.ts");
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











const WorkflowLogModal = ()=>{
    _s();
    const { isModalOpen, closeModal, contextWorkflowDetails } = (0,_Pimcore_modules_asset_editor_toolbar_workflow_log_modal_hooks_use_workflow__WEBPACK_IMPORTED_MODULE_7__.useWorkflow)();
    const [form] = _Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_8__.Form.useForm();
    const { submitWorkflowAction } = (0,_Pimcore_modules_asset_editor_toolbar_workflow_log_modal_hooks_use_submit_workflow__WEBPACK_IMPORTED_MODULE_11__.useSubmitWorkflow)((contextWorkflowDetails === null || contextWorkflowDetails === void 0 ? void 0 : contextWorkflowDetails.workflowName) ?? '');
    const onFinish = (values)=>{
        contextWorkflowDetails !== null && submitWorkflowAction(contextWorkflowDetails.action, contextWorkflowDetails.transition, contextWorkflowDetails.workflowName, {
            notes: values.notes,
            additional: {
                timeWorked: values.timeSpent
            }
        });
        closeModal();
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_modal_modal__WEBPACK_IMPORTED_MODULE_4__.Modal, {
        afterClose: ()=>{
            form.resetFields();
            closeModal();
        },
        footer: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_modal_footer_modal_footer__WEBPACK_IMPORTED_MODULE_2__.ModalFooter, {
            divider: true,
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_5__.Flex, {
                align: 'center',
                gap: 'extra-small',
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_3__.Button, {
                        onClick: ()=>{
                            closeModal();
                        },
                        type: "default",
                        children: (0,i18next__WEBPACK_IMPORTED_MODULE_10__.t)('workflow-modal.cancel')
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/toolbar/workflow-log-modal/workflow-log-modal.tsx",
                        lineNumber: 54,
                        columnNumber: 11
                    }, void 0),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_3__.Button, {
                        onClick: ()=>{
                            form.submit();
                        },
                        type: "primary",
                        children: (0,i18next__WEBPACK_IMPORTED_MODULE_10__.t)('workflow-modal.perform-action')
                    }, "submit", false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/toolbar/workflow-log-modal/workflow-log-modal.tsx",
                        lineNumber: 58,
                        columnNumber: 11
                    }, void 0)
                ]
            }, void 0, true, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/toolbar/workflow-log-modal/workflow-log-modal.tsx",
                lineNumber: 50,
                columnNumber: 9
            }, void 0)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/toolbar/workflow-log-modal/workflow-log-modal.tsx",
            lineNumber: 48,
            columnNumber: 16
        }, void 0),
        onCancel: ()=>{
            closeModal();
        },
        open: isModalOpen && contextWorkflowDetails !== null,
        size: 'M',
        title: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_modal_modal_title_modal_title__WEBPACK_IMPORTED_MODULE_6__.ModalTitle, {
            children: (0,i18next__WEBPACK_IMPORTED_MODULE_10__.t)('workflow-modal.log-time')
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/toolbar/workflow-log-modal/workflow-log-modal.tsx",
            lineNumber: 70,
            columnNumber: 15
        }, void 0),
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_8__.Form, {
            form: form,
            layout: 'vertical',
            onFinish: onFinish,
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_8__.Form.Item, {
                    label: (0,i18next__WEBPACK_IMPORTED_MODULE_10__.t)('workflow-modal.timeSpent'),
                    name: "timeSpent",
                    rules: [
                        {
                            required: true,
                            message: (0,i18next__WEBPACK_IMPORTED_MODULE_10__.t)('workflow-modal.timeSpent-required')
                        }
                    ],
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_9__.Input, {}, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/toolbar/workflow-log-modal/workflow-log-modal.tsx",
                        lineNumber: 82,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/toolbar/workflow-log-modal/workflow-log-modal.tsx",
                    lineNumber: 77,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_8__.Form.Item, {
                    label: (0,i18next__WEBPACK_IMPORTED_MODULE_10__.t)('workflow-modal.notes'),
                    name: "notes",
                    rules: [
                        {
                            required: true,
                            message: (0,i18next__WEBPACK_IMPORTED_MODULE_10__.t)('workflow-modal.notes-required')
                        }
                    ],
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_9__.Input.TextArea, {
                        rows: 4
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/toolbar/workflow-log-modal/workflow-log-modal.tsx",
                        lineNumber: 89,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/toolbar/workflow-log-modal/workflow-log-modal.tsx",
                    lineNumber: 84,
                    columnNumber: 9
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/toolbar/workflow-log-modal/workflow-log-modal.tsx",
            lineNumber: 72,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/toolbar/workflow-log-modal/workflow-log-modal.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, undefined);
};
_s(WorkflowLogModal, "rqlBgkIOeZpRyQkJwN6/cO3dX44=", false, function() {
    return [
        _Pimcore_modules_asset_editor_toolbar_workflow_log_modal_hooks_use_workflow__WEBPACK_IMPORTED_MODULE_7__.useWorkflow,
        _Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_8__.Form.useForm,
        _Pimcore_modules_asset_editor_toolbar_workflow_log_modal_hooks_use_submit_workflow__WEBPACK_IMPORTED_MODULE_11__.useSubmitWorkflow
    ];
});
_c = WorkflowLogModal;
var _c;
$RefreshReg$(_c, "WorkflowLogModal");

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
"./js/src/core/modules/data-object/editor/toolbar/language-selection/provider/language-selection-provider.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  LanguageSelectionContext: () => (LanguageSelectionContext),
  LanguageSelectionProvider: () => (LanguageSelectionProvider)
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

const LanguageSelectionContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({
    currentLanguage: 'en',
    setCurrentLanguage: ()=>{}
});
const LanguageSelectionProvider = (param)=>{
    let { children } = param;
    _s();
    // @todo check for default language
    const [currentLanguage, setCurrentLanguage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('en');
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(LanguageSelectionContext.Provider, {
            value: {
                currentLanguage,
                setCurrentLanguage
            },
            children: children
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/toolbar/language-selection/provider/language-selection-provider.tsx",
            lineNumber: 35,
            columnNumber: 5
        }, undefined), [
        currentLanguage,
        children
    ]);
};
_s(LanguageSelectionProvider, "hPONFh3ipydjEPdh5FTeV++SEto=");
_c = LanguageSelectionProvider;
var _c;
$RefreshReg$(_c, "LanguageSelectionProvider");

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
"./js/src/core/modules/data-object/editor/toolbar/language-selection/provider/use-language-selection.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useLanguageSelection: () => (useLanguageSelection)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _language_selection_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/data-object/editor/toolbar/language-selection/provider/language-selection-provider.tsx");
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


const useLanguageSelection = ()=>{
    _s();
    const context = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_language_selection_provider__WEBPACK_IMPORTED_MODULE_1__.LanguageSelectionContext);
    return {
        ...context
    };
};
_s(useLanguageSelection, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");

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
"./js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/data-component.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DataComponent: () => (DataComponent)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/form/form.tsx");
/* ESM import */var _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/app/depency-injection/index.ts");
/* ESM import */var _Pimcore_app_config_services_service_ids__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/app/config/services/service-ids.ts");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_5__);
/* ESM import */var _providers_form_list_provider_use_form_list__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/form-list-provider/use-form-list.tsx");
/* ESM import */var _Pimcore_modules_app_error_boundary_error_boundary__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/app/error-boundary/error-boundary.tsx");
/* ESM import */var _Pimcore_modules_data_object_editor_types_object_tab_manager_tabs_edit_components_data_component_form_item__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/data-component/form-item.tsx");
/* ESM import */var _Pimcore_modules_data_object_editor_types_object_tab_manager_tabs_edit_providers_inheritance_state_provider_use_inheritance_state__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/inheritance-state-provider/use-inheritance-state.tsx");
/* ESM import */var _Pimcore_modules_data_object_editor_types_object_tab_manager_tabs_edit_providers_edit_form_provider_edit_form_provider__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/edit-form-provider/edit-form-provider.tsx");
/* ESM import */var _Pimcore_components_form_group_provider_use_form_group_optional__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/components/form/group/provider/use-form-group-optional.ts");
/* ESM import */var _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_localized_fields_provider_localized_fields_provider_use_localized_fields__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/localized-fields/provider/localized-fields-provider/use-localized-fields.tsx");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_13__);
/* ESM import */var _element_dynamic_types_definitions_objects_data_related_providers_field_width_use_field_width__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/use-field-width.tsx");
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














const DataComponent = (props)=>{
    _s();
    const objectDataRegistry = (0,_Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_3__.useInjection)(_Pimcore_app_config_services_service_ids__WEBPACK_IMPORTED_MODULE_4__.serviceIds["DynamicTypes/ObjectDataRegistry"]);
    const { name, fieldType, fieldtype } = props;
    const formList = (0,_providers_form_list_provider_use_form_list__WEBPACK_IMPORTED_MODULE_6__.useFormList)();
    const hasFormList = formList !== undefined;
    let formFieldName = [
        name
    ];
    const title = props.title;
    const inheritanceState = (0,_Pimcore_modules_data_object_editor_types_object_tab_manager_tabs_edit_providers_inheritance_state_provider_use_inheritance_state__WEBPACK_IMPORTED_MODULE_9__.useInheritanceState)();
    const form = _Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_2__.Form.useFormInstance();
    const { disabled } = (0,_Pimcore_modules_data_object_editor_types_object_tab_manager_tabs_edit_providers_edit_form_provider_edit_form_provider__WEBPACK_IMPORTED_MODULE_10__.useEditFormContext)();
    const fieldWidth = (0,_element_dynamic_types_definitions_objects_data_related_providers_field_width_use_field_width__WEBPACK_IMPORTED_MODULE_14__.useFieldWidth)();
    let virtualFieldName = [
        name
    ];
    const groupContext = (0,_Pimcore_components_form_group_provider_use_form_group_optional__WEBPACK_IMPORTED_MODULE_11__.useFormGroupOptional)();
    const localizedContext = (0,_Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_localized_fields_provider_localized_fields_provider_use_localized_fields__WEBPACK_IMPORTED_MODULE_12__.useLocalizedFields)();
    if (groupContext !== undefined) {
        virtualFieldName = [
            ...(0,lodash__WEBPACK_IMPORTED_MODULE_13__.isArray)(groupContext.name) ? groupContext.name : [
                groupContext.name
            ],
            ...virtualFieldName
        ];
    }
    if (localizedContext !== undefined) {
        virtualFieldName = [
            ...virtualFieldName,
            localizedContext.locales[0]
        ];
    }
    if (hasFormList) {
        formFieldName = [
            ...formList.getComputedFieldName(),
            name
        ];
    }
    // @todo unify to one fieldType after api is updated completely
    const currentFieldType = fieldType ?? fieldtype ?? 'unknown';
    if (!objectDataRegistry.hasDynamicType(currentFieldType)) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_5__.Alert, {
            message: `Unknown data type: ${currentFieldType}`,
            type: "warning"
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/data-component.tsx",
            lineNumber: 75,
            columnNumber: 7
        }, undefined);
    }
    const objectDataType = objectDataRegistry.getDynamicType(currentFieldType);
    const inheritanceStateValue = inheritanceState === null || inheritanceState === void 0 ? void 0 : inheritanceState.getInheritanceState(virtualFieldName);
    const _props = {
        ...props,
        title,
        defaultFieldWidth: fieldWidth,
        name: formFieldName,
        inherited: (inheritanceStateValue === null || inheritanceStateValue === void 0 ? void 0 : inheritanceStateValue.inherited) === true,
        noteditable: Boolean(props.noteditable) || disabled
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!objectDataType.isCollectionType) {
            objectDataType.handleDefaultValue(_props, form, virtualFieldName);
        }
    }, [
        form
    ]);
    if (!objectDataType.isCollectionType) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_data_object_editor_types_object_tab_manager_tabs_edit_components_data_component_form_item__WEBPACK_IMPORTED_MODULE_8__["default"], {
            _props: _props,
            formFieldName: formFieldName,
            objectDataType: objectDataType
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/data-component.tsx",
            lineNumber: 102,
            columnNumber: 7
        }, undefined);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_app_error_boundary_error_boundary__WEBPACK_IMPORTED_MODULE_7__["default"], {
        children: objectDataType.getObjectDataComponent(_props)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/data-component.tsx",
        lineNumber: 111,
        columnNumber: 5
    }, undefined);
};
_s(DataComponent, "rFqFaNVKrkI7ElAtIc1pyfSERWU=", false, function() {
    return [
        _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_3__.useInjection,
        _providers_form_list_provider_use_form_list__WEBPACK_IMPORTED_MODULE_6__.useFormList,
        _Pimcore_modules_data_object_editor_types_object_tab_manager_tabs_edit_providers_inheritance_state_provider_use_inheritance_state__WEBPACK_IMPORTED_MODULE_9__.useInheritanceState,
        _Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_2__.Form.useFormInstance,
        _Pimcore_modules_data_object_editor_types_object_tab_manager_tabs_edit_providers_edit_form_provider_edit_form_provider__WEBPACK_IMPORTED_MODULE_10__.useEditFormContext,
        _element_dynamic_types_definitions_objects_data_related_providers_field_width_use_field_width__WEBPACK_IMPORTED_MODULE_14__.useFieldWidth,
        _Pimcore_components_form_group_provider_use_form_group_optional__WEBPACK_IMPORTED_MODULE_11__.useFormGroupOptional,
        _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_localized_fields_provider_localized_fields_provider_use_localized_fields__WEBPACK_IMPORTED_MODULE_12__.useLocalizedFields
    ];
});
_c = DataComponent;
var _c;
$RefreshReg$(_c, "DataComponent");

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
"./js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/data-component/form-item.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__WEBPACK_DEFAULT_EXPORT__)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/form/form.tsx");
/* ESM import */var _Pimcore_modules_app_error_boundary_error_boundary__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/app/error-boundary/error-boundary.tsx");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/classnames/index.js");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var _Pimcore_components_inheritance_overlay_hooks_use_inheritance_overlay_style__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/inheritance-overlay/hooks/use-inheritance-overlay-style.ts");
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





const DataComponentFormItem = (param)=>{
    let { objectDataType, _props, formFieldName } = param;
    _s();
    const formItemProps = objectDataType.getObjectDataFormItemProps(_props);
    const inheritanceOverlayStyle = (0,_Pimcore_components_inheritance_overlay_hooks_use_inheritance_overlay_style__WEBPACK_IMPORTED_MODULE_5__.useInheritanceOverlayStyle)({
        inherited: _props.inherited,
        type: objectDataType.inheritedMaskOverlay
    });
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_app_error_boundary_error_boundary__WEBPACK_IMPORTED_MODULE_3__["default"], {
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_2__.Form.Item, {
                ...formItemProps,
                className: classnames__WEBPACK_IMPORTED_MODULE_4___default()(formItemProps.className, inheritanceOverlayStyle),
                name: formFieldName,
                children: objectDataType.getObjectDataComponent(_props)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/data-component/form-item.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/data-component/form-item.tsx",
            lineNumber: 35,
            columnNumber: 5
        }, undefined), [
        formItemProps,
        inheritanceOverlayStyle
    ]);
};
_s(DataComponentFormItem, "Jxb/iapJ8Yj7Wiho4BThb1+hLkg=", false, function() {
    return [
        _Pimcore_components_inheritance_overlay_hooks_use_inheritance_overlay_style__WEBPACK_IMPORTED_MODULE_5__.useInheritanceOverlayStyle
    ];
});
_c = DataComponentFormItem;
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DataComponentFormItem);
var _c;
$RefreshReg$(_c, "DataComponentFormItem");

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
"./js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/layout-component.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  LayoutComponent: () => (LayoutComponent)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/app/depency-injection/index.ts");
/* ESM import */var _Pimcore_app_config_services_service_ids__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/app/config/services/service-ids.ts");
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



const LayoutComponent = (props)=>{
    _s();
    const layoutTypeRegistry = (0,_Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_2__.useInjection)(_Pimcore_app_config_services_service_ids__WEBPACK_IMPORTED_MODULE_3__.serviceIds["DynamicTypes/ObjectLayoutRegistry"]);
    const { fieldType, fieldtype } = props;
    // @todo unify to one fieldType after api is updated completely
    const currentFieldType = fieldType ?? fieldtype ?? 'unknown';
    if (!layoutTypeRegistry.hasDynamicType(currentFieldType)) {
        // @todo should throw an error in the future after the implementation of all layout types
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
            children: [
                "Unknown layout type: ",
                currentFieldType
            ]
        }, void 0, true, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/layout-component.tsx",
            lineNumber: 40,
            columnNumber: 13
        }, undefined);
    }
    const layoutType = layoutTypeRegistry.getDynamicType(currentFieldType);
    return layoutType.getObjectLayoutComponent(props);
};
_s(LayoutComponent, "TWHxS1GgdXtMZyl9sA0uKu40LcA=", false, function() {
    return [
        _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_2__.useInjection
    ];
});
_c = LayoutComponent;
var _c;
$RefreshReg$(_c, "LayoutComponent");

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
"./js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/object-component.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ObjectComponent: () => (ObjectComponent)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _layout_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/layout-component.tsx");
/* ESM import */var _data_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/data-component.tsx");
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



const ObjectComponent = (props)=>{
    _s();
    const { dataType, datatype } = props;
    const currentDataType = dataType ?? datatype;
    const renderNode = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (currentDataType === 'data') {
            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_data_component__WEBPACK_IMPORTED_MODULE_3__.DataComponent, {
                ...props,
                noteditable: props.noteditable
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/object-component.tsx",
                lineNumber: 39,
                columnNumber: 9
            }, undefined);
        }
        if (currentDataType === 'layout') {
            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_layout_component__WEBPACK_IMPORTED_MODULE_2__.LayoutComponent, {
                ...props,
                noteditable: props.noteditable
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/object-component.tsx",
                lineNumber: 48,
                columnNumber: 9
            }, undefined);
        }
    }, [
        props
    ]);
    if (renderNode === undefined) {
        throw new Error(`Unknown datatype: ${currentDataType}`);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: renderNode
    }, void 0, false);
};
_s(ObjectComponent, "E221tZGqYJwoYbIj5q5UFQ1CGew=");
_c = ObjectComponent;
var _c;
$RefreshReg$(_c, "ObjectComponent");

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
"./js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/edit-form-provider/edit-form-provider.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  EditFormProvider: () => (EditFormProvider),
  useEditFormContext: () => (useEditFormContext)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var antd_es_form_Form__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./node_modules/antd/es/form/hooks/useForm.js");
/* ESM import */var _Pimcore_modules_data_object_hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/data-object/hooks/use-data-object-draft.ts");
/* ESM import */var _Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/element/hooks/use-element-context.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var _Pimcore_modules_data_object_actions_save_use_save__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/data-object/actions/save/use-save.tsx");
/* ESM import */var _Pimcore_components_message_useMessage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/message/useMessage/index.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/element/permissions/permission-helper.ts");
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









const EditFormContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(undefined);
const useEditFormContext = ()=>{
    _s();
    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(EditFormContext);
    if (context === undefined) {
        throw new Error('useEditFormContext must be used within a FormProvider');
    }
    return context;
};
_s(useEditFormContext, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
const EditFormProvider = (param)=>{
    let { children } = param;
    _s1();
    const [form] = (0,antd_es_form_Form__WEBPACK_IMPORTED_MODULE_9__["default"])();
    const modifiedDataObjectAttributesRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)({});
    const { id } = (0,_Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_3__.useElementContext)();
    const { dataObject, markObjectDataAsModified } = (0,_Pimcore_modules_data_object_hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_2__.useDataObjectDraft)(id);
    const { save, isError } = (0,_Pimcore_modules_data_object_actions_save_use_save__WEBPACK_IMPORTED_MODULE_5__.useSave)();
    const messageApi = (0,_Pimcore_components_message_useMessage__WEBPACK_IMPORTED_MODULE_6__.useMessage)();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_7__.useTranslation)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (isError) {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            messageApi.error(t('auto-save-failed'));
        }
    }, [
        isError
    ]);
    const updateModifiedDataObjectAttributes = (changedValues)=>{
        modifiedDataObjectAttributesRef.current = {
            ...modifiedDataObjectAttributesRef.current,
            ...changedValues
        };
    };
    const resetModifiedDataObjectAttributes = ()=>{
        modifiedDataObjectAttributesRef.current = {};
    };
    const getModifiedDataObjectAttributes = ()=>{
        return modifiedDataObjectAttributesRef.current;
    };
    const disabled = !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_8__.checkElementPermission)(dataObject === null || dataObject === void 0 ? void 0 : dataObject.permissions, 'publish') && !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_8__.checkElementPermission)(dataObject === null || dataObject === void 0 ? void 0 : dataObject.permissions, 'save');
    const getChangedFieldName = function(changedValues) {
        let parentKey = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : '';
        const keys = Object.keys(changedValues);
        if (keys.length === 0) {
            return null;
        }
        const key = keys[0];
        const fullKey = parentKey !== '' ? `${parentKey}.${key}` : key;
        const value = changedValues[key];
        if (!form.isFieldTouched(fullKey.split('.'))) {
            return parentKey;
        }
        if (lodash__WEBPACK_IMPORTED_MODULE_4___default().isPlainObject(value)) {
            return getChangedFieldName(value, fullKey);
        }
        return fullKey;
    };
    const autoSave = (0,lodash__WEBPACK_IMPORTED_MODULE_4__.debounce)(async ()=>{
        const modifiedAttributes = getModifiedDataObjectAttributes();
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(modifiedAttributes)) {
            await save(modifiedAttributes, _Pimcore_modules_data_object_actions_save_use_save__WEBPACK_IMPORTED_MODULE_5__.SaveTaskType.AutoSave);
        }
    }, 800);
    const updateDraft = async ()=>{
        markObjectDataAsModified();
        await autoSave();
    };
    const value = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>({
            form,
            updateModifiedDataObjectAttributes,
            resetModifiedDataObjectAttributes,
            updateDraft,
            getModifiedDataObjectAttributes,
            getChangedFieldName,
            disabled
        }), [
        form,
        disabled
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(EditFormContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/edit-form-provider/edit-form-provider.tsx",
        lineNumber: 125,
        columnNumber: 5
    }, undefined);
};
_s1(EditFormProvider, "7qFB8YlDViTX97jxl1uQQV3hed4=", false, function() {
    return [
        antd_es_form_Form__WEBPACK_IMPORTED_MODULE_9__["default"],
        _Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_3__.useElementContext,
        _Pimcore_modules_data_object_hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_2__.useDataObjectDraft,
        _Pimcore_modules_data_object_actions_save_use_save__WEBPACK_IMPORTED_MODULE_5__.useSave,
        _Pimcore_components_message_useMessage__WEBPACK_IMPORTED_MODULE_6__.useMessage,
        react_i18next__WEBPACK_IMPORTED_MODULE_7__.useTranslation
    ];
});
_c = EditFormProvider;
var _c;
$RefreshReg$(_c, "EditFormProvider");

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
"./js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/form-list-provider/form-list-provider.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  FormListContext: () => (FormListContext),
  FormListProvider: () => (FormListProvider)
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

const FormListContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createContext(undefined);
const FormListProvider = (param)=>{
    let { field, fieldSuffix, operation, children } = param;
    _s();
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(FormListContext.Provider, {
            value: {
                field,
                fieldSuffix,
                operation
            },
            children: children
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/form-list-provider/form-list-provider.tsx",
            lineNumber: 32,
            columnNumber: 7
        }, undefined);
    }, [
        field,
        operation,
        children
    ]);
};
_s(FormListProvider, "nwk+m61qLgjDVUp4IGV/072DDN4=");
_c = FormListProvider;
var _c;
$RefreshReg$(_c, "FormListProvider");

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
"./js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/form-list-provider/use-form-list.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useFormList: () => (useFormList)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _form_list_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/form-list-provider/form-list-provider.tsx");
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


const useFormList = ()=>{
    _s();
    const formListContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_form_list_provider__WEBPACK_IMPORTED_MODULE_1__.FormListContext);
    if (formListContext === undefined) {
        return undefined;
    }
    const getComputedFieldName = ()=>{
        const { field, fieldSuffix } = formListContext;
        const computedFieldName = [
            field.name
        ];
        if (fieldSuffix !== undefined) {
            computedFieldName.push(fieldSuffix);
        }
        return computedFieldName;
    };
    return {
        ...formListContext,
        getComputedFieldName
    };
};
_s(useFormList, "J2ijEj5jQlt38SNmFvSS2Sz5Ghc=");

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
"./js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/inheritance-state-provider/inheritance-state-provider.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  InheritanceStateContext: () => (InheritanceStateContext),
  InheritanceStateProvider: () => (InheritanceStateProvider)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_modules_data_object_hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/data-object/hooks/use-data-object-draft.ts");
/* ESM import */var _Pimcore_modules_data_object_data_object_provider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/data-object/data-object-provider.tsx");
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



const InheritanceStateContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createContext(undefined);
const getInitialInheritanceState = (dataObjectDraft)=>{
    const inheritanceStates = {};
    if (dataObjectDraft === undefined) {
        return inheritanceStates;
    }
    const traverseMetaData = function(metaData) {
        let path = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
        if (typeof metaData !== 'object' || metaData === null) return;
        Object.entries(metaData).forEach((param)=>{
            let [key, value] = param;
            const currentPath = [
                ...path,
                key
            ];
            if (typeof value === 'object' && 'objectId' in value && 'inherited' in value && typeof value.objectId === 'number' && typeof value.inherited === 'boolean') {
                const stateKey = currentPath.join('.');
                inheritanceStates[stateKey] = {
                    objectId: value.objectId,
                    inherited: value.inherited
                };
            } else {
                traverseMetaData(value, currentPath);
            }
        });
    };
    if (typeof dataObjectDraft === 'object' && 'inheritanceData' in dataObjectDraft && typeof dataObjectDraft.inheritanceData === 'object' && 'metaData' in dataObjectDraft.inheritanceData && typeof dataObjectDraft.inheritanceData.metaData === 'object') {
        traverseMetaData(dataObjectDraft.inheritanceData.metaData);
    }
    return inheritanceStates;
};
const InheritanceStateProvider = (param)=>{
    let { children } = param;
    _s();
    const { id } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_Pimcore_modules_data_object_data_object_provider__WEBPACK_IMPORTED_MODULE_3__.DataObjectContext);
    const { dataObject } = (0,_Pimcore_modules_data_object_hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_2__.useDataObjectDraft)(id);
    const [inheritanceStates, setInheritanceStates] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(getInitialInheritanceState(dataObject));
    const [, startTransition] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useTransition)();
    const getInheritanceState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((name)=>{
        const key = Array.isArray(name) ? name.join('.') : name.toString();
        return inheritanceStates[key];
    }, [
        inheritanceStates
    ]);
    const setInheritanceState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((name, state)=>{
        const key = Array.isArray(name) ? name.join('.') : name.toString();
        setInheritanceStates((prevStates)=>({
                ...prevStates,
                [key]: state
            }));
    }, []);
    const breakInheritance = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((name)=>{
        var _getInheritanceState;
        if (((_getInheritanceState = getInheritanceState(name)) === null || _getInheritanceState === void 0 ? void 0 : _getInheritanceState.inherited) === false) {
            return;
        }
        startTransition(()=>{
            setInheritanceState(name, {
                objectId: id,
                inherited: 'broken'
            });
        });
    }, []);
    const value = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>({
            getInheritanceState,
            breakInheritance
        }), [
        getInheritanceState,
        breakInheritance
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(InheritanceStateContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/inheritance-state-provider/inheritance-state-provider.tsx",
        lineNumber: 112,
        columnNumber: 5
    }, undefined);
};
_s(InheritanceStateProvider, "IE1lbJTJiJO4WV7In0t9TdLu80A=", false, function() {
    return [
        _Pimcore_modules_data_object_hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_2__.useDataObjectDraft,
        react__WEBPACK_IMPORTED_MODULE_1__.useTransition
    ];
});
_c = InheritanceStateProvider;
var _c;
$RefreshReg$(_c, "InheritanceStateProvider");

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
"./js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/inheritance-state-provider/use-inheritance-state.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useInheritanceState: () => (useInheritanceState)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _inheritance_state_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/inheritance-state-provider/inheritance-state-provider.tsx");
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


const useInheritanceState = ()=>{
    _s();
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_inheritance_state_provider__WEBPACK_IMPORTED_MODULE_1__.InheritanceStateContext);
};
_s(useInheritanceState, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");

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
"./js/src/core/modules/data-object/hooks/use-global-data-object-context.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useGlobalDataObjectContext: () => (useGlobalDataObjectContext)
});
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _Pimcore_modules_app_global_context_global_context_slice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/app/global-context/global-context-slice.ts");
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

const useGlobalDataObjectContext = ()=>{
    const disptach = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.useAppDispatch)();
    const context = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.useAppSelector)((state)=>(0,_Pimcore_modules_app_global_context_global_context_slice__WEBPACK_IMPORTED_MODULE_1__.selectContextByType)(state, 'data-object'));
    const setContext = function(config) {
        disptach((0,_Pimcore_modules_app_global_context_global_context_slice__WEBPACK_IMPORTED_MODULE_1__.addGlobalContext)({
            type: 'data-object',
            config
        }));
    };
    const removeContext = function() {
        disptach((0,_Pimcore_modules_app_global_context_global_context_slice__WEBPACK_IMPORTED_MODULE_1__.removeGlobalContext)('data-object'));
    };
    return {
        context,
        setContext,
        removeContext
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
"./js/src/core/modules/data-object/hooks/use-quantity-value-units.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useQuantityValueUnits: () => (useQuantityValueUnits)
});
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_modules_data_object_unit_slice_gen__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/data-object/unit-slice.gen.ts");
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/app/store/index.ts");
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



const useQuantityValueUnits = ()=>{
    const { data: units } = (0,_Pimcore_modules_data_object_unit_slice_gen__WEBPACK_IMPORTED_MODULE_2__.useUnitQuantityValueListQuery)();
    const dispatch = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_3__.useAppDispatch)();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_0__.useTranslation)();
    const getSelectOptions = (validUnits)=>{
        if ((units === null || units === void 0 ? void 0 : units.items) === undefined) {
            return [];
        }
        return units.items.filter((unit)=>validUnits === undefined || unit.id !== null && validUnits.includes(String(unit.id))).map((unit)=>({
                label: unit.abbreviation === null ? unit.id : t(String(unit.abbreviation)),
                value: unit.id
            }));
    };
    const convertValue = async (fromUnitId, toUnitId, value)=>{
        if ((units === null || units === void 0 ? void 0 : units.items) === undefined) {
            return null;
        }
        const fromUnit = units.items.find((unit)=>unit.id === fromUnitId);
        const toUnit = units.items.find((unit)=>unit.id === toUnitId);
        if (fromUnit === undefined || toUnit === undefined) {
            return null;
        }
        if (fromUnit.baseUnit === null || fromUnit.baseUnit !== toUnit.baseUnit) {
            return null;
        }
        const { data } = await dispatch(_Pimcore_modules_data_object_unit_slice_gen__WEBPACK_IMPORTED_MODULE_2__.api.endpoints.unitQuantityValueConvert.initiate({
            fromUnitId,
            toUnitId,
            value
        }));
        return (data === null || data === void 0 ? void 0 : data.data) ?? null;
    };
    const getAbbreviation = (unitId)=>{
        if ((units === null || units === void 0 ? void 0 : units.items) === undefined) {
            return '';
        }
        const unit = units.items.find((unit)=>unit.id === unitId);
        if (typeof (unit === null || unit === void 0 ? void 0 : unit.abbreviation) === 'string' && !lodash__WEBPACK_IMPORTED_MODULE_1___default().isEmpty(unit.abbreviation)) {
            return t(unit.abbreviation);
        }
        return unitId;
    };
    return {
        getSelectOptions,
        convertValue,
        getAbbreviation
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
"./js/src/core/modules/data-object/unit-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useUnitQuantityValueConvertAllQuery: () => (useUnitQuantityValueConvertAllQuery),
  useUnitQuantityValueConvertQuery: () => (useUnitQuantityValueConvertQuery),
  useUnitQuantityValueListQuery: () => (useUnitQuantityValueListQuery)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Units"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            unitQuantityValueConvertAll: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/unit/quantity-value/convert-all`,
                        params: {
                            fromUnitId: queryArg.fromUnitId,
                            value: queryArg.value
                        }
                    }),
                providesTags: [
                    "Units"
                ]
            }),
            unitQuantityValueConvert: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/unit/quantity-value/convert`,
                        params: {
                            fromUnitId: queryArg.fromUnitId,
                            toUnitId: queryArg.toUnitId,
                            value: queryArg.value
                        }
                    }),
                providesTags: [
                    "Units"
                ]
            }),
            unitQuantityValueList: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/unit/quantity-value/unit-list`
                    }),
                providesTags: [
                    "Units"
                ]
            })
        }),
    overrideExisting: false
});

const { useUnitQuantityValueConvertAllQuery, useUnitQuantityValueConvertQuery, useUnitQuantityValueListQuery } = injectedRtkApi;

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
"./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/field-collection/providers/field-collection-provider.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  FieldCollectionContext: () => (FieldCollectionContext),
  FieldCollectionProvider: () => (FieldCollectionProvider)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/class-definition/class-definition-slice-enhanced.ts");
/* ESM import */var _Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/element/hooks/use-element-context.ts");
/* ESM import */var _Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/content/content.tsx");
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




const FieldCollectionContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(null);
const FieldCollectionProvider = (param)=>{
    let { children, id } = param;
    _s();
    const { id: elementId } = (0,_Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_3__.useElementContext)();
    const fieldCollectionResult = (0,_Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__.useClassFieldCollectionObjectLayoutQuery)({
        objectId: id ?? elementId
    });
    const { isLoading } = fieldCollectionResult;
    if (isLoading) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_4__.Content, {
            loading: true
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/field-collection/providers/field-collection-provider.tsx",
            lineNumber: 35,
            columnNumber: 12
        }, undefined);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(FieldCollectionContext.Provider, {
        value: fieldCollectionResult,
        children: children
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/field-collection/providers/field-collection-provider.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, undefined);
};
_s(FieldCollectionProvider, "RtEE+sz6qie5uh0z/DsdfIhP0S8=", false, function() {
    return [
        _Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_3__.useElementContext,
        _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__.useClassFieldCollectionObjectLayoutQuery
    ];
});
_c = FieldCollectionProvider;
var _c;
$RefreshReg$(_c, "FieldCollectionProvider");

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
"./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/object-brick/providers/object-brick-provider.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ObjectBrickContext: () => (ObjectBrickContext),
  ObjectBrickProvider: () => (ObjectBrickProvider)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/class-definition/class-definition-slice-enhanced.ts");
/* ESM import */var _Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/element/hooks/use-element-context.ts");
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



const ObjectBrickContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(null);
const ObjectBrickProvider = (param)=>{
    let { children } = param;
    _s();
    const { id } = (0,_Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_3__.useElementContext)();
    const objectBrickResult = (0,_Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__.useClassObjectBrickObjectLayoutQuery)({
        objectId: id
    });
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(ObjectBrickContext.Provider, {
            value: objectBrickResult,
            children: children
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/object-brick/providers/object-brick-provider.tsx",
            lineNumber: 31,
            columnNumber: 5
        }, undefined), [
        objectBrickResult,
        children
    ]);
};
_s(ObjectBrickProvider, "yZkBs3z+DcsUTDvd35ssyMCKpCw=", false, function() {
    return [
        _Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_3__.useElementContext,
        _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__.useClassObjectBrickObjectLayoutQuery
    ];
});
_c = ObjectBrickProvider;
var _c;
$RefreshReg$(_c, "ObjectBrickProvider");

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
"./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/field-width-provider.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  FieldWidthContext: () => (FieldWidthContext),
  FieldWidthProvider: () => (FieldWidthProvider),
  defaultFieldWidthValues: () => (defaultFieldWidthValues)
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

const defaultFieldWidthValues = {
    small: 200,
    medium: 300,
    large: 900
};
const FieldWidthContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createContext(undefined);
const FieldWidthProvider = (param)=>{
    let { children, ...props } = param;
    _s();
    const fieldWidthValues = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>({
            ...defaultFieldWidthValues,
            ...props.fieldWidthValues
        }), [
        props.fieldWidthValues
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(FieldWidthContext.Provider, {
        value: fieldWidthValues,
        children: children
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/field-width-provider.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, undefined);
};
_s(FieldWidthProvider, "eh7+KNrdSMMcrucf5NxvYs/9oJs=");
_c = FieldWidthProvider;
var _c;
$RefreshReg$(_c, "FieldWidthProvider");

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
"./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/use-field-width.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useFieldWidth: () => (useFieldWidth)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _field_width_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/field-width-provider.tsx");
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


const useFieldWidth = ()=>{
    _s();
    const context = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_field_width_provider__WEBPACK_IMPORTED_MODULE_1__.FieldWidthContext);
    if (context === undefined) {
        throw new Error('useFieldWidth must be used within a FieldWidthProvider');
    }
    return context;
};
_s(useFieldWidth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");

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
"./js/src/core/modules/element/editor/shared-tab-manager/hooks/use-tab-manager.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useTabManager: () => (useTabManager)
});
/* ESM import */var _Pimcore_modules_element_editor_shared_tab_manager_tab_manager_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/element/editor/shared-tab-manager/tab-manager-context.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
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


const useTabManager = ()=>{
    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_Pimcore_modules_element_editor_shared_tab_manager_tab_manager_context__WEBPACK_IMPORTED_MODULE_0__.TabManagerContext);
    if (lodash__WEBPACK_IMPORTED_MODULE_2___default().isEmpty(context)) {
        throw new Error('useTabManager must be used within TabManagerProvider');
    }
    return context.tabManager;
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
"./js/src/core/modules/element/editor/shared-tab-manager/tab-manager-context.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TabManagerContext: () => (TabManagerContext),
  TabManagerProvider: () => (TabManagerProvider)
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

const TabManagerContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({
    tabManager: null
});
const TabManagerProvider = (param)=>{
    let { tabManager, children } = param;
    _s();
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(TabManagerContext.Provider, {
            value: {
                tabManager
            },
            children: children
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tab-manager-context.tsx",
            lineNumber: 31,
            columnNumber: 5
        }, undefined), [
        tabManager,
        children
    ]);
};
_s(TabManagerProvider, "nwk+m61qLgjDVUp4IGV/072DDN4=");
_c = TabManagerProvider;
var _c;
$RefreshReg$(_c, "TabManagerProvider");

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
"./js/src/core/modules/element/editor/shared-tab-manager/tabs/schedule/hooks/use-save-schedules.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useSaveSchedules: () => (useSaveSchedules)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _Pimcore_modules_element_editor_shared_tab_manager_tabs_schedule_schedule_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/element/editor/shared-tab-manager/tabs/schedule/schedule-api-slice-enhanced.ts");
/* ESM import */var _Pimcore_components_message_useMessage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/message/useMessage/index.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
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




const useSaveSchedules = function(elementType, id) {
    let showNotifications = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
    const [updateSchedulesApi, { isLoading, isSuccess: isApiSuccess, isError, error }] = (0,_Pimcore_modules_element_editor_shared_tab_manager_tabs_schedule_schedule_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__.useScheduleUpdateForElementByTypeAndIdMutation)();
    const [isSuccess, setIsSuccess] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const { element, schedules, resetSchedulesChanges } = (0,_Pimcore_modules_element_hooks_use_element_draft__WEBPACK_IMPORTED_MODULE_4__.useElementDraft)(id, elementType);
    const messageApi = (0,_Pimcore_components_message_useMessage__WEBPACK_IMPORTED_MODULE_2__.useMessage)();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation)();
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (isSuccess) {
            if (showNotifications) {
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                messageApi.success(t('save-success'));
            }
            resetSchedulesChanges();
        }
    }, [
        isSuccess
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        setIsSuccess(isApiSuccess);
    }, [
        isApiSuccess
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (isError && showNotifications) {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            messageApi.error(t('save-failed'));
        }
    }, [
        isError
    ]);
    const saveSchedules = async ()=>{
        if ((element === null || element === void 0 ? void 0 : element.changes.schedules) === undefined) {
            setIsSuccess(true);
            return;
        }
        await updateSchedulesApi({
            elementType,
            id,
            body: {
                items: schedules === null || schedules === void 0 ? void 0 : schedules.map((schedule)=>({
                        id: schedule.id > 0 ? schedule.id : null,
                        date: schedule.date,
                        action: schedule.action,
                        version: schedule.version,
                        active: schedule.active
                    }))
            }
        });
    };
    return {
        isLoading,
        isSuccess,
        isError,
        error,
        saveSchedules
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
"./js/src/core/modules/element/editor/shared-tab-manager/tabs/schedule/schedule-api-slice-enhanced.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  api: () => (api),
  useScheduleCreateForElementByTypeAndIdMutation: () => (useScheduleCreateForElementByTypeAndIdMutation),
  useScheduleDeleteByIdMutation: () => (useScheduleDeleteByIdMutation),
  useScheduleGetCollectionForElementByTypeAndIdQuery: () => (useScheduleGetCollectionForElementByTypeAndIdQuery),
  useScheduleUpdateForElementByTypeAndIdMutation: () => (useScheduleUpdateForElementByTypeAndIdMutation)
});
/* ESM import */var _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/tags.ts");
/* ESM import */var _schedule_api_slice_gen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/element/editor/shared-tab-manager/tabs/schedule/schedule-api-slice.gen.ts");
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

const api = _schedule_api_slice_gen__WEBPACK_IMPORTED_MODULE_1__.api.enhanceEndpoints({
    addTagTypes: [
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.ASSET_DETAIL,
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.DATA_OBJECT_DETAIL
    ],
    endpoints: {
        scheduleGetCollectionForElementByTypeAndId: {
            providesTags: (result, error, args)=>{
                var _result_items;
                const scheduleCollection = [];
                result === null || result === void 0 ? void 0 : (_result_items = result.items) === null || _result_items === void 0 ? void 0 : _result_items.forEach((schedule)=>{
                    scheduleCollection.push(..._Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.SCHEDULE_DETAIL(schedule.id));
                });
                return [
                    ...scheduleCollection,
                    ..._Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.ELEMENT_SCHEDULES(args.elementType, args.id)
                ];
            }
        },
        scheduleUpdateForElementByTypeAndId: {
            invalidatesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.ELEMENT_SCHEDULES(args.elementType, args.id)
        },
        scheduleCreateForElementByTypeAndId: {
            invalidatesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.ELEMENT_SCHEDULES(args.elementType, args.id)
        },
        scheduleDeleteById: {
            invalidatesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.SCHEDULE_DETAIL(args.id)
        }
    }
});
const { useScheduleDeleteByIdMutation, useScheduleGetCollectionForElementByTypeAndIdQuery, useScheduleUpdateForElementByTypeAndIdMutation, useScheduleCreateForElementByTypeAndIdMutation } = api;

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
"./js/src/core/modules/element/editor/shared-tab-manager/tabs/schedule/schedule-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useScheduleCreateForElementByTypeAndIdMutation: () => (useScheduleCreateForElementByTypeAndIdMutation),
  useScheduleDeleteByIdMutation: () => (useScheduleDeleteByIdMutation),
  useScheduleGetCollectionForElementByTypeAndIdQuery: () => (useScheduleGetCollectionForElementByTypeAndIdQuery),
  useScheduleUpdateForElementByTypeAndIdMutation: () => (useScheduleUpdateForElementByTypeAndIdMutation)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Schedule"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            scheduleDeleteById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/schedules/${queryArg.id}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Schedule"
                ]
            }),
            scheduleGetCollectionForElementByTypeAndId: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/schedules/${queryArg.elementType}/${queryArg.id}`
                    }),
                providesTags: [
                    "Schedule"
                ]
            }),
            scheduleUpdateForElementByTypeAndId: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/schedules/${queryArg.elementType}/${queryArg.id}`,
                        method: "PUT",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Schedule"
                ]
            }),
            scheduleCreateForElementByTypeAndId: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/schedules/${queryArg.elementType}/${queryArg.id}`,
                        method: "POST"
                    }),
                invalidatesTags: [
                    "Schedule"
                ]
            })
        }),
    overrideExisting: false
});

const { useScheduleDeleteByIdMutation, useScheduleGetCollectionForElementByTypeAndIdQuery, useScheduleUpdateForElementByTypeAndIdMutation, useScheduleCreateForElementByTypeAndIdMutation } = injectedRtkApi;

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
"./js/src/core/modules/element/editor/tab-manager/tab-manager.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TabManager: () => (TabManager)
});
/* ESM import */var _swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/tslib/tslib.es6.mjs");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(inversify__WEBPACK_IMPORTED_MODULE_0__);
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

class TabManager {
    getTabs() {
        return this.tabs;
    }
    getTab(key) {
        return this.tabs.find((tab)=>tab.key === key);
    }
    register(tab) {
        if (this.getTab(tab.key) !== undefined) {
            this.tabs.splice(this.tabs.findIndex((t)=>t.key === tab.key), 1, tab);
            return;
        }
        this.tabs.push(tab);
    }
    constructor(){
        this.type = '';
        this.tabs = [];
    }
}
TabManager = (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,inversify__WEBPACK_IMPORTED_MODULE_0__.injectable)()
], TabManager);

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
//# sourceMappingURL=js_src_core_modules_asset_editor_toolbar_workflow-log-modal_workflow-log-modal_tsx-js_src_cor-41db90.js.map