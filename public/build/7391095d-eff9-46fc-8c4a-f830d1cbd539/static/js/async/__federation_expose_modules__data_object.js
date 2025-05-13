"use strict";
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["__federation_expose_modules__data_object"], {
"./js/src/core/modules/asset/editor/toolbar/workflow-menu/workflow-menu.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  EditorToolbarWorkflowMenu: () => (EditorToolbarWorkflowMenu)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_tag_list_tag_list__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/tag-list/tag-list.tsx");
/* ESM import */var _Pimcore_components_badge_badge__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/badge/badge.tsx");
/* ESM import */var _Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/dropdown/dropdown.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_modules_asset_editor_toolbar_workflow_menu_workflow_transition_group__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/asset/editor/toolbar/workflow-menu/workflow-transition-group.tsx");
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _Pimcore_components_dropdown_button_dropdown_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/components/dropdown-button/dropdown-button.tsx");
/* ESM import */var _Pimcore_modules_asset_editor_toolbar_workflow_log_modal_hooks_use_workflow__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/asset/editor/toolbar/workflow-log-modal/hooks/use-workflow.ts");
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










const EditorToolbarWorkflowMenu = ()=>{
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_5__.useTranslation)();
    const [items, setItems] = react__WEBPACK_IMPORTED_MODULE_1___default().useState([]);
    const { workflowDetailsData, isFetchingWorkflowDetails } = (0,_Pimcore_modules_asset_editor_toolbar_workflow_log_modal_hooks_use_workflow__WEBPACK_IMPORTED_MODULE_10__.useWorkflow)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if ((workflowDetailsData === null || workflowDetailsData === void 0 ? void 0 : workflowDetailsData.items) !== undefined && workflowDetailsData.items.length > 0) {
            const workFlowItems = workflowDetailsData.items.flatMap((workflow)=>{
                var _workflowDetailsData_items;
                const result = [];
                result.push({
                    key: (((workflowDetailsData === null || workflowDetailsData === void 0 ? void 0 : (_workflowDetailsData_items = workflowDetailsData.items) === null || _workflowDetailsData_items === void 0 ? void 0 : _workflowDetailsData_items.length) ?? 0) + 1).toString(),
                    type: 'custom',
                    component: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_asset_editor_toolbar_workflow_menu_workflow_transition_group__WEBPACK_IMPORTED_MODULE_6__.WorkflowTransitionGroup, {
                        workflow: workflow
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/toolbar/workflow-menu/workflow-menu.tsx",
                        lineNumber: 38,
                        columnNumber: 22
                    }, undefined)
                });
                return {
                    key: t(`${workflow.workflowName}`),
                    type: 'group',
                    label: t(`${workflow.workflowName}`).toUpperCase(),
                    children: result
                };
            });
            setItems(workFlowItems);
        }
    }, [
        workflowDetailsData
    ]);
    const getVisibleWorkflowStatus = ()=>{
        if ((workflowDetailsData === null || workflowDetailsData === void 0 ? void 0 : workflowDetailsData.items) !== undefined && workflowDetailsData.items.length > 0) {
            const formattedStatuses = workflowDetailsData.items.reduce((result, workflow)=>{
                workflow.workflowStatus.forEach((status)=>{
                    if (status.visibleInDetail !== undefined && status.visibleInDetail) {
                        const style = status.colorInverted ? {
                            backgroundColor: `${status.color}33`
                        } : {};
                        const tag = {
                            children: t(`${status.label}`),
                            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_badge_badge__WEBPACK_IMPORTED_MODULE_3__.Badge, {
                                color: status.color
                            }, void 0, false, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/toolbar/workflow-menu/workflow-menu.tsx",
                                lineNumber: 63,
                                columnNumber: 25
                            }, undefined),
                            style
                        };
                        result.push(tag);
                    }
                });
                return result;
            }, []);
            return [
                formattedStatuses
            ];
        }
        return [
            []
        ];
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_7__.Flex, {
        align: 'center',
        justify: 'flex-end',
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_tag_list_tag_list__WEBPACK_IMPORTED_MODULE_2__.TagList, {
                itemGap: 'extra-small',
                list: getVisibleWorkflowStatus(),
                wrap: false
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/toolbar/workflow-menu/workflow-menu.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, undefined),
            workflowDetailsData !== undefined && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_4__.Dropdown, {
                disabled: isFetchingWorkflowDetails,
                menu: {
                    items
                },
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_dropdown_button_dropdown_button__WEBPACK_IMPORTED_MODULE_9__.DropdownButton, {
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_8__.Icon, {
                        options: {
                            height: 16,
                            width: 16
                        },
                        value: 'workflow'
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/toolbar/workflow-menu/workflow-menu.tsx",
                        lineNumber: 94,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/toolbar/workflow-menu/workflow-menu.tsx",
                    lineNumber: 93,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/toolbar/workflow-menu/workflow-menu.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/toolbar/workflow-menu/workflow-menu.tsx",
        lineNumber: 79,
        columnNumber: 5
    }, undefined);
};
_s(EditorToolbarWorkflowMenu, "ACxHaQ/L9KUjW0/8qHcKpKmmhYs=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_5__.useTranslation,
        _Pimcore_modules_asset_editor_toolbar_workflow_log_modal_hooks_use_workflow__WEBPACK_IMPORTED_MODULE_10__.useWorkflow
    ];
});
_c = EditorToolbarWorkflowMenu;
var _c;
$RefreshReg$(_c, "EditorToolbarWorkflowMenu");

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
"./js/src/core/modules/asset/editor/toolbar/workflow-menu/workflow-transition-group.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
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
        button: css`
              min-width: 100%;
              justify-items: flex-start;
    `,
        'not-first': css`
              margin-top: ${token.marginXXS}px;
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
"./js/src/core/modules/asset/editor/toolbar/workflow-menu/workflow-transition-group.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  WorkflowTransitionGroup: () => (WorkflowTransitionGroup)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_modules_asset_editor_toolbar_workflow_log_modal_hooks_use_workflow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/asset/editor/toolbar/workflow-log-modal/hooks/use-workflow.ts");
/* ESM import */var _Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/button/button.tsx");
/* ESM import */var _Pimcore_modules_asset_editor_toolbar_workflow_log_modal_hooks_use_submit_workflow__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/asset/editor/toolbar/workflow-log-modal/hooks/use-submit-workflow.ts");
/* ESM import */var _Pimcore_modules_asset_editor_toolbar_workflow_menu_workflow_transition_group_styles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/asset/editor/toolbar/workflow-menu/workflow-transition-group.styles.ts");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./node_modules/classnames/index.js");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_7__);
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







const WorkflowTransitionGroup = (param)=>{
    let { workflow } = param;
    _s();
    const { openModal } = (0,_Pimcore_modules_asset_editor_toolbar_workflow_log_modal_hooks_use_workflow__WEBPACK_IMPORTED_MODULE_3__.useWorkflow)();
    const { submitWorkflowAction, submissionLoading } = (0,_Pimcore_modules_asset_editor_toolbar_workflow_log_modal_hooks_use_submit_workflow__WEBPACK_IMPORTED_MODULE_5__.useSubmitWorkflow)(workflow.workflowName);
    const { styles } = (0,_Pimcore_modules_asset_editor_toolbar_workflow_menu_workflow_transition_group_styles__WEBPACK_IMPORTED_MODULE_6__.useStyles)();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)();
    const onClick = (actionType, transition, workflowName)=>{
        if (transition === 'global') openModal({
            action: actionType,
            transition,
            workflowName
        });
        else if (transition === 'transition') {
            submitWorkflowAction(actionType, transition, workflowName, {});
        }
    };
    const isFirst = true;
    const renderButton = (actionType, transition)=>{
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_4__.Button, {
            className: isFirst ? `${styles.button}` : classnames__WEBPACK_IMPORTED_MODULE_7___default()(`${styles.button}`, `${styles['not-first']}`),
            onClick: ()=>{
                onClick(actionType, transition, workflow.workflowName);
            },
            type: "text",
            children: t(`${actionType}`)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/toolbar/workflow-menu/workflow-transition-group.tsx",
            lineNumber: 48,
            columnNumber: 7
        }, undefined);
    };
    if (submissionLoading) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_4__.Button, {
            loading: submissionLoading,
            type: 'link'
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/toolbar/workflow-menu/workflow-transition-group.tsx",
            lineNumber: 62,
            columnNumber: 7
        }, undefined);
    } else {
        var _workflow_allowedTransitions, _workflow_globalActions;
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
            children: [
                (_workflow_allowedTransitions = workflow.allowedTransitions) === null || _workflow_allowedTransitions === void 0 ? void 0 : _workflow_allowedTransitions.map((status)=>renderButton(status.label, 'transition')),
                (_workflow_globalActions = workflow.globalActions) === null || _workflow_globalActions === void 0 ? void 0 : _workflow_globalActions.map((status)=>renderButton(status.label, 'global'))
            ]
        }, void 0, true, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/toolbar/workflow-menu/workflow-transition-group.tsx",
            lineNumber: 69,
            columnNumber: 7
        }, undefined);
    }
};
_s(WorkflowTransitionGroup, "P152HvCOg9U9CObPLdWfK9ffUUg=", false, function() {
    return [
        _Pimcore_modules_asset_editor_toolbar_workflow_log_modal_hooks_use_workflow__WEBPACK_IMPORTED_MODULE_3__.useWorkflow,
        _Pimcore_modules_asset_editor_toolbar_workflow_log_modal_hooks_use_submit_workflow__WEBPACK_IMPORTED_MODULE_5__.useSubmitWorkflow,
        _Pimcore_modules_asset_editor_toolbar_workflow_menu_workflow_transition_group_styles__WEBPACK_IMPORTED_MODULE_6__.useStyles,
        react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation
    ];
});
_c = WorkflowTransitionGroup;
var _c;
$RefreshReg$(_c, "WorkflowTransitionGroup");

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
"./js/src/core/modules/data-object/actions/add-object/use-add-object.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useAddObject: () => (useAddObject)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _Pimcore_components_element_tree_element_tree_slice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/element-tree/element-tree-slice.ts");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/modal/form-modal/hooks/use-form-modal.tsx");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* ESM import */var _Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/element/permissions/permission-helper.ts");
/* ESM import */var _Pimcore_modules_element_tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/element/tree/provider/tree-permission-provider/use-tree-permission.ts");
/* ESM import */var _Pimcore_modules_perspectives_enums_tree_permission__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/perspectives/enums/tree-permission.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_9__);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_10__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _data_object_api_slice_gen__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/data-object/data-object-api-slice.gen.ts");
/* ESM import */var _hooks_use_data_object_helper__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/modules/data-object/hooks/use-data-object-helper.ts");
/* ESM import */var _utils_provider_class_defintions_use_class_definitions__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/modules/data-object/utils/provider/class-defintions/use-class-definitions.tsx");
/* ESM import */var _Pimcore_modules_element_actions__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./js/src/core/modules/element/actions/index.ts");
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















const useAddObject = ()=>{
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_11__.useTranslation)();
    const modal = (0,_Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_4__.useFormModal)();
    const [addDataObjectMutation] = (0,_data_object_api_slice_gen__WEBPACK_IMPORTED_MODULE_12__.useDataObjectAddMutation)();
    const dispatch = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_1__.useAppDispatch)();
    const { openDataObject } = (0,_hooks_use_data_object_helper__WEBPACK_IMPORTED_MODULE_13__.useDataObjectHelper)();
    const { isTreeActionAllowed } = (0,_Pimcore_modules_element_tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_7__.useTreePermission)();
    const { getClassDefinitionsForCurrentUser } = (0,_utils_provider_class_defintions_use_class_definitions__WEBPACK_IMPORTED_MODULE_14__.useClassDefinitions)();
    const getClassEntries = (node)=>{
        let classHierarchy = [];
        const classDefinitions = getClassDefinitionsForCurrentUser();
        const structuredClassDefinitions = [
            ...classDefinitions
        ].sort((a, b)=>a.name.localeCompare(b.name)).reduce((acc, classDefinition)=>{
            const groupName = (0,lodash__WEBPACK_IMPORTED_MODULE_9__.isEmpty)(classDefinition.group) ? 'undefined' : classDefinition.group;
            if (acc[groupName] === undefined) {
                acc[groupName] = [];
            }
            acc[groupName].push(classDefinition);
            return acc;
        }, {});
        if (structuredClassDefinitions.undefined !== undefined) {
            classHierarchy = structuredClassDefinitions.undefined.map((classDefinition)=>getDataObjectEntry(classDefinition, node));
        }
        for (const [group, classDefinitions] of Object.entries(structuredClassDefinitions)){
            if (group !== 'undefined') {
                classHierarchy.push({
                    label: t(group),
                    key: 'add-object-group-' + group,
                    icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__.Icon, {
                        value: 'folder'
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/actions/add-object/use-add-object.tsx",
                        lineNumber: 77,
                        columnNumber: 17
                    }, undefined),
                    children: classDefinitions.map((classDefinition)=>getDataObjectEntry(classDefinition, node))
                });
            }
        }
        return classHierarchy;
    };
    const getDataObjectEntry = (classDefinition, node)=>{
        return {
            label: t(classDefinition.name),
            key: classDefinition.id,
            icon: classDefinition.icon.value === 'class' ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__.Icon, {
                subIconName: "new",
                subIconVariant: 'green',
                value: "data-object"
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/actions/add-object/use-add-object.tsx",
                lineNumber: 92,
                columnNumber: 11
            }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__.Icon, {
                subIconName: "new",
                subIconVariant: 'green',
                ...classDefinition.icon
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/actions/add-object/use-add-object.tsx",
                lineNumber: 99,
                columnNumber: 11
            }, undefined),
            onClick: ()=>{
                const parentId = parseInt(node.id);
                createDataObject(classDefinition, parentId);
            }
        };
    };
    const createDataObject = (classDefinition, parentId, onFinish)=>{
        modal.input({
            title: t('data-object.create-data-object', {
                className: classDefinition.name
            }),
            label: t('form.label.new-item'),
            rule: {
                required: true,
                message: t('form.validation.required')
            },
            onOk: async (value)=>{
                await createDataObjectMutation(classDefinition.id, value, parentId);
                onFinish === null || onFinish === void 0 ? void 0 : onFinish(value);
            }
        });
    };
    const createDataObjectMutation = async (classId, name, parentId)=>{
        const createDataObjectTask = addDataObjectMutation({
            parentId,
            dataObjectAddParameters: {
                key: name,
                classId,
                type: 'object'
            }
        });
        try {
            const response = await createDataObjectTask;
            if (response.error !== undefined) {
                (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_5__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_5__.ApiError(response.error));
                return;
            }
            const { id } = response.data;
            void openDataObject({
                config: {
                    id
                }
            });
            dispatch((0,_Pimcore_components_element_tree_element_tree_slice__WEBPACK_IMPORTED_MODULE_2__.refreshNodeChildren)({
                nodeId: String(parentId),
                elementType: 'data-object'
            }));
        } catch (error) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_5__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_5__.GeneralError('Error creating data object'));
        }
    };
    const isAddObjectHidden = (node)=>{
        return !isTreeActionAllowed(_Pimcore_modules_perspectives_enums_tree_permission__WEBPACK_IMPORTED_MODULE_8__.TreePermission.Add) || !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_6__.checkElementPermission)(node.permissions, 'create') || (0,lodash__WEBPACK_IMPORTED_MODULE_9__.isEmpty)(getClassDefinitionsForCurrentUser());
    };
    const addObjectTreeContextMenuItem = (node)=>{
        return {
            label: t('data-object.tree.context-menu.add-object'),
            key: _Pimcore_modules_element_actions__WEBPACK_IMPORTED_MODULE_15__.ContextMenuActionName.addObject,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__.Icon, {
                value: 'folder'
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/actions/add-object/use-add-object.tsx",
                lineNumber: 171,
                columnNumber: 13
            }, undefined),
            hidden: isAddObjectHidden(node),
            children: getClassEntries(node)
        };
    };
    return {
        addObjectTreeContextMenuItem
    };
};
_s(useAddObject, "XBKjbXtzxpwzlZN8G+HvPOaTqVs=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_11__.useTranslation,
        _Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_4__.useFormModal,
        _data_object_api_slice_gen__WEBPACK_IMPORTED_MODULE_12__.useDataObjectAddMutation,
        _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_1__.useAppDispatch,
        _hooks_use_data_object_helper__WEBPACK_IMPORTED_MODULE_13__.useDataObjectHelper,
        _Pimcore_modules_element_tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_7__.useTreePermission,
        _utils_provider_class_defintions_use_class_definitions__WEBPACK_IMPORTED_MODULE_14__.useClassDefinitions
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
"./js/src/core/modules/data-object/actions/delete-draft/use-delete-draft.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useDeleteDraft: () => (useDeleteDraft)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_modules_data_object_data_object_provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/data-object/data-object-provider.tsx");
/* ESM import */var _Pimcore_modules_data_object_hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/data-object/hooks/use-data-object-draft.ts");
/* ESM import */var _Pimcore_modules_element_editor_shared_tab_manager_tabs_versions_version_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/version-api-slice-enhanced.ts");
/* ESM import */var _Pimcore_modules_element_actions_refresh_element_use_element_refresh__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/element/actions/refresh-element/use-element-refresh.tsx");
/* ESM import */var _Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/modal/form-modal/hooks/use-form-modal.tsx");
/* ESM import */var _Pimcore_modules_app_error_handler_classes_api_error__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/app/error-handler/classes/api-error.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_8__);
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









const useDeleteDraft = ()=>{
    var _dataObject_draftData;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_1__.useTranslation)();
    const { id } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_Pimcore_modules_data_object_data_object_provider__WEBPACK_IMPORTED_MODULE_2__.DataObjectContext);
    const { dataObject } = (0,_Pimcore_modules_data_object_hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_3__.useDataObjectDraft)(id);
    const [deleteVersion, { isLoading, isError, error }] = (0,_Pimcore_modules_element_editor_shared_tab_manager_tabs_versions_version_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_4__.useVersionDeleteByIdMutation)();
    const { refreshElement } = (0,_Pimcore_modules_element_actions_refresh_element_use_element_refresh__WEBPACK_IMPORTED_MODULE_5__.useElementRefresh)('data-object');
    const { confirm } = (0,_Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_6__.useFormModal)();
    if (isError) {
        throw new _Pimcore_modules_app_error_handler_classes_api_error__WEBPACK_IMPORTED_MODULE_7__["default"](error);
    }
    const buttonText = t((dataObject === null || dataObject === void 0 ? void 0 : (_dataObject_draftData = dataObject.draftData) === null || _dataObject_draftData === void 0 ? void 0 : _dataObject_draftData.isAutoSave) === true ? 'delete-draft-auto-save' : 'delete-draft');
    const deleteDraft = async ()=>{
        if ((0,lodash__WEBPACK_IMPORTED_MODULE_8__.isNil)(dataObject === null || dataObject === void 0 ? void 0 : dataObject.draftData)) {
            return;
        }
        confirm({
            title: buttonText,
            content: t('delete-draft-confirmation'),
            onOk: async ()=>{
                if ((0,lodash__WEBPACK_IMPORTED_MODULE_8__.isNil)(dataObject === null || dataObject === void 0 ? void 0 : dataObject.draftData)) {
                    return;
                }
                await deleteVersion({
                    id: dataObject.draftData.id
                }).then(()=>{
                    refreshElement(dataObject.id);
                });
            }
        });
    };
    return {
        deleteDraft,
        buttonText,
        isLoading,
        isError
    };
};
_s(useDeleteDraft, "CsJwkJ+r4WG0DOfJrH53G7vBos0=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_1__.useTranslation,
        _Pimcore_modules_data_object_hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_3__.useDataObjectDraft,
        _Pimcore_modules_element_editor_shared_tab_manager_tabs_versions_version_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_4__.useVersionDeleteByIdMutation,
        _Pimcore_modules_element_actions_refresh_element_use_element_refresh__WEBPACK_IMPORTED_MODULE_5__.useElementRefresh,
        _Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_6__.useFormModal
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
"./js/src/core/modules/data-object/editor/editor-container.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  EditorContainer: () => (EditorContainer)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_modules_data_object_editor_editor_container_editor_container_inner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/data-object/editor/editor-container/editor-container-inner.tsx");
/* ESM import */var _Pimcore_modules_data_object_hooks_use_custom_layouts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/data-object/hooks/use-custom-layouts.ts");
/* ESM import */var _Pimcore_modules_data_object_editor_toolbar_context_menu_provider_layout_selection_provider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/data-object/editor/toolbar/context-menu/provider/layout-selection-provider.tsx");
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




const EditorContainer = (param)=>{
    let { id } = param;
    _s();
    const { getDefaultLayoutId, isLoading } = (0,_Pimcore_modules_data_object_hooks_use_custom_layouts__WEBPACK_IMPORTED_MODULE_3__.useCustomLayouts)(id);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_data_object_editor_toolbar_context_menu_provider_layout_selection_provider__WEBPACK_IMPORTED_MODULE_4__.LayoutSelectionProvider, {
        defaultLayout: getDefaultLayoutId(),
        isLoading: isLoading,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_data_object_editor_editor_container_editor_container_inner__WEBPACK_IMPORTED_MODULE_2__.EditorContainerInner, {
            id: id
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/editor-container.tsx",
            lineNumber: 34,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/editor-container.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, undefined);
};
_s(EditorContainer, "v1ixWZp5Z8Ee6gj5Cxb82qQB6PM=", false, function() {
    return [
        _Pimcore_modules_data_object_hooks_use_custom_layouts__WEBPACK_IMPORTED_MODULE_3__.useCustomLayouts
    ];
});
_c = EditorContainer;

var _c;
$RefreshReg$(_c, "EditorContainer");

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
"./js/src/core/modules/data-object/editor/editor-container/editor-container-inner.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  EditorContainerInner: () => (EditorContainerInner)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_modules_widget_manager_hooks_use_is_active_main_widget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/widget-manager/hooks/use-is-active-main-widget.ts");
/* ESM import */var _data_object_provider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/data-object/data-object-provider.tsx");
/* ESM import */var _Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/content/content.tsx");
/* ESM import */var _Pimcore_modules_data_object_hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/data-object/hooks/use-data-object-draft.ts");
/* ESM import */var _Pimcore_modules_data_object_hooks_use_global_data_object_context__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/data-object/hooks/use-global-data-object-context.ts");
/* ESM import */var _Pimcore_modules_element_editor_shared_tab_manager_tabs_container__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/element/editor/shared-tab-manager/tabs-container.tsx");
/* ESM import */var _Pimcore_modules_data_object_editor_toolbar_toolbar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/data-object/editor/toolbar/toolbar.tsx");
/* ESM import */var _Pimcore_modules_element_editor_layouts_tabs_toolbar_view__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/element/editor/layouts/tabs-toolbar-view.tsx");
/* ESM import */var _toolbar_language_selection_provider_language_selection_provider__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/data-object/editor/toolbar/language-selection/provider/language-selection-provider.tsx");
/* ESM import */var _Pimcore_modules_data_object_editor_types_object_tab_manager_tabs_edit_providers_edit_form_provider_edit_form_provider__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/edit-form-provider/edit-form-provider.tsx");
/* ESM import */var _Pimcore_modules_data_object_editor_types_object_tab_manager_tabs_edit_providers_inheritance_state_provider_inheritance_state_provider__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/inheritance-state-provider/inheritance-state-provider.tsx");
/* ESM import */var _Pimcore_modules_data_object_editor_types_object_tab_manager_tabs_edit_providers_save_provider_save_provider__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/save-provider/save-provider.tsx");
/* ESM import */var _Pimcore_components_alert_alert__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/components/alert/alert.tsx");
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














const EditorContainerInner = (props)=>{
    _s();
    const { id } = props;
    const { isLoading, isError, dataObject, editorType } = (0,_Pimcore_modules_data_object_hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_5__.useDataObjectDraft)(id);
    const isWidgetActive = (0,_Pimcore_modules_widget_manager_hooks_use_is_active_main_widget__WEBPACK_IMPORTED_MODULE_2__.useIsAcitveMainWidget)();
    const { setContext, removeContext } = (0,_Pimcore_modules_data_object_hooks_use_global_data_object_context__WEBPACK_IMPORTED_MODULE_6__.useGlobalDataObjectContext)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        return ()=>{
            removeContext();
        };
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (isWidgetActive) {
            setContext({
                id
            });
        }
        return ()=>{
            if (!isWidgetActive) {
                removeContext();
            }
        };
    }, [
        isWidgetActive
    ]);
    if (isLoading) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_4__.Content, {
            loading: true
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/editor-container/editor-container-inner.tsx",
            lineNumber: 64,
            columnNumber: 12
        }, undefined);
    }
    if (isError) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_4__.Content, {
            padded: true,
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_alert_alert__WEBPACK_IMPORTED_MODULE_14__.Alert, {
                message: "Error: Loading of data object failed",
                type: "error"
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/editor-container/editor-container-inner.tsx",
                lineNumber: 70,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/editor-container/editor-container-inner.tsx",
            lineNumber: 69,
            columnNumber: 7
        }, undefined);
    }
    if (dataObject === undefined || editorType === undefined) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}, void 0, false);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_data_object_provider__WEBPACK_IMPORTED_MODULE_3__.DataObjectProvider, {
        id: id,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_data_object_editor_types_object_tab_manager_tabs_edit_providers_save_provider_save_provider__WEBPACK_IMPORTED_MODULE_13__.SaveProvider, {
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_data_object_editor_types_object_tab_manager_tabs_edit_providers_edit_form_provider_edit_form_provider__WEBPACK_IMPORTED_MODULE_11__.EditFormProvider, {
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_data_object_editor_types_object_tab_manager_tabs_edit_providers_inheritance_state_provider_inheritance_state_provider__WEBPACK_IMPORTED_MODULE_12__.InheritanceStateProvider, {
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_toolbar_language_selection_provider_language_selection_provider__WEBPACK_IMPORTED_MODULE_10__.LanguageSelectionProvider, {
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_editor_layouts_tabs_toolbar_view__WEBPACK_IMPORTED_MODULE_9__.TabsToolbarView, {
                            renderTabbar: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_editor_shared_tab_manager_tabs_container__WEBPACK_IMPORTED_MODULE_7__.TabsContainer, {
                                elementEditorType: editorType
                            }, void 0, false, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/editor-container/editor-container-inner.tsx",
                                lineNumber: 90,
                                columnNumber: 19
                            }, void 0),
                            renderToolbar: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_data_object_editor_toolbar_toolbar__WEBPACK_IMPORTED_MODULE_8__.Toolbar, {}, void 0, false, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/editor-container/editor-container-inner.tsx",
                                lineNumber: 96,
                                columnNumber: 19
                            }, void 0)
                        }, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/editor-container/editor-container-inner.tsx",
                            lineNumber: 88,
                            columnNumber: 15
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/editor-container/editor-container-inner.tsx",
                        lineNumber: 87,
                        columnNumber: 13
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/editor-container/editor-container-inner.tsx",
                    lineNumber: 86,
                    columnNumber: 11
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/editor-container/editor-container-inner.tsx",
                lineNumber: 85,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/editor-container/editor-container-inner.tsx",
            lineNumber: 84,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/editor-container/editor-container-inner.tsx",
        lineNumber: 83,
        columnNumber: 5
    }, undefined);
};
_s(EditorContainerInner, "xtGvam9TxQA3ZfH++17+qWAIPPk=", false, function() {
    return [
        _Pimcore_modules_data_object_hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_5__.useDataObjectDraft,
        _Pimcore_modules_widget_manager_hooks_use_is_active_main_widget__WEBPACK_IMPORTED_MODULE_2__.useIsAcitveMainWidget,
        _Pimcore_modules_data_object_hooks_use_global_data_object_context__WEBPACK_IMPORTED_MODULE_6__.useGlobalDataObjectContext
    ];
});
_c = EditorContainerInner;

var _c;
$RefreshReg$(_c, "EditorContainerInner");

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
"./js/src/core/modules/data-object/editor/title/title-container.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TitleContainer: () => (TitleContainer)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_modules_widget_manager_title_tab_title_container__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/widget-manager/title/tab-title-container.tsx");
/* ESM import */var _Pimcore_modules_data_object_hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/data-object/hooks/use-data-object-draft.ts");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
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




const TitleContainer = (props)=>{
    _s();
    const { node } = props;
    const { dataObject } = (0,_Pimcore_modules_data_object_hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_3__.useDataObjectDraft)(node.getConfig().id);
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation)();
    const nodeName = node.getName();
    node.getName = ()=>{
        if ((dataObject === null || dataObject === void 0 ? void 0 : dataObject.parentId) === 0) {
            node.getName = ()=>t('home');
        }
        return (dataObject === null || dataObject === void 0 ? void 0 : dataObject.key) ?? nodeName;
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_widget_manager_title_tab_title_container__WEBPACK_IMPORTED_MODULE_2__.TabTitleContainer, {
        modified: (dataObject === null || dataObject === void 0 ? void 0 : dataObject.modified) ?? false,
        node: node
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/title/title-container.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, undefined);
};
_s(TitleContainer, "nF2ykJHEPNTZStinGBdx0t4clqg=", false, function() {
    return [
        _Pimcore_modules_data_object_hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_3__.useDataObjectDraft,
        react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation
    ];
});
_c = TitleContainer;
var _c;
$RefreshReg$(_c, "TitleContainer");

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
"./js/src/core/modules/data-object/editor/toolbar/context-menu/provider/layout-selection-provider.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  LayoutSelectionContext: () => (LayoutSelectionContext),
  LayoutSelectionProvider: () => (LayoutSelectionProvider)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/content/content.tsx");
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


const LayoutSelectionContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({
    currentLayout: null,
    setCurrentLayout: ()=>{}
});
const LayoutSelectionProvider = (param)=>{
    let { children, defaultLayout, isLoading } = param;
    _s();
    const [currentLayout, setCurrentLayout] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(defaultLayout);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (currentLayout === null && defaultLayout !== null) {
            setCurrentLayout(defaultLayout);
        }
    }, [
        defaultLayout
    ]);
    const value = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>({
            currentLayout,
            setCurrentLayout
        }), [
        currentLayout
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(LayoutSelectionContext.Provider, {
        value: value,
        children: isLoading ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_2__.Content, {
            loading: true
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/toolbar/context-menu/provider/layout-selection-provider.tsx",
            lineNumber: 48,
            columnNumber: 21
        }, undefined) : children
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/toolbar/context-menu/provider/layout-selection-provider.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, undefined);
};
_s(LayoutSelectionProvider, "uzaRjyphPHyxj14bMcwgxbICvnI=");
_c = LayoutSelectionProvider;
var _c;
$RefreshReg$(_c, "LayoutSelectionProvider");

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
"./js/src/core/modules/data-object/editor/toolbar/context-menu/provider/use-layout-selection.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useLayoutSelection: () => (useLayoutSelection)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _Pimcore_modules_data_object_editor_toolbar_context_menu_provider_layout_selection_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/data-object/editor/toolbar/context-menu/provider/layout-selection-provider.tsx");
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


const useLayoutSelection = ()=>{
    _s();
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_Pimcore_modules_data_object_editor_toolbar_context_menu_provider_layout_selection_provider__WEBPACK_IMPORTED_MODULE_1__.LayoutSelectionContext);
};
_s(useLayoutSelection, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");

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
"./js/src/core/modules/data-object/editor/toolbar/language-selection/language-selection.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  LanguageSelection: () => (LanguageSelection)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_components_language_selection_language_selection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/language-selection/language-selection.tsx");
/* ESM import */var _Pimcore_modules_app_settings_hooks_use_settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/app/settings/hooks/use-settings.ts");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _provider_use_language_selection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/data-object/editor/toolbar/language-selection/provider/use-language-selection.tsx");
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




const LanguageSelection = ()=>{
    _s();
    const settings = (0,_Pimcore_modules_app_settings_hooks_use_settings__WEBPACK_IMPORTED_MODULE_2__.useSettings)();
    const { currentLanguage, setCurrentLanguage } = (0,_provider_use_language_selection__WEBPACK_IMPORTED_MODULE_4__.useLanguageSelection)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_language_selection_language_selection__WEBPACK_IMPORTED_MODULE_1__.LanguageSelection, {
        languages: [
            ...settings.requiredLanguages
        ],
        onSelectLanguage: setCurrentLanguage,
        selectedLanguage: currentLanguage
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/toolbar/language-selection/language-selection.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, undefined);
};
_s(LanguageSelection, "EYgwCN5NmThWgGGw4+846xrIYyo=", false, function() {
    return [
        _Pimcore_modules_app_settings_hooks_use_settings__WEBPACK_IMPORTED_MODULE_2__.useSettings,
        _provider_use_language_selection__WEBPACK_IMPORTED_MODULE_4__.useLanguageSelection
    ];
});
_c = LanguageSelection;
var _c;
$RefreshReg$(_c, "LanguageSelection");

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
"./js/src/core/modules/data-object/editor/toolbar/save-buttons/save-buttons.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  EditorToolbarSaveButtons: () => (EditorToolbarSaveButtons)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_components_button_group_button_group__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/button-group/button-group.tsx");
/* ESM import */var _Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/button/button.tsx");
/* ESM import */var _Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/dropdown/dropdown.tsx");
/* ESM import */var _Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/icon-button/icon-button.tsx");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _Pimcore_components_message_useMessage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/message/useMessage/index.tsx");
/* ESM import */var _Pimcore_components_spin_spin__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/spin/spin.tsx");
/* ESM import */var _Pimcore_components_tooltip_tooltip__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/tooltip/tooltip.tsx");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* ESM import */var _Pimcore_modules_data_object_actions_delete_draft_use_delete_draft__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/data-object/actions/delete-draft/use-delete-draft.tsx");
/* ESM import */var _Pimcore_modules_data_object_actions_save_use_save__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/data-object/actions/save/use-save.tsx");
/* ESM import */var _Pimcore_modules_data_object_data_object_provider__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/data-object/data-object-provider.tsx");
/* ESM import */var _Pimcore_modules_data_object_editor_types_object_tab_manager_tabs_edit_providers_edit_form_provider_edit_form_provider__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/edit-form-provider/edit-form-provider.tsx");
/* ESM import */var _Pimcore_modules_data_object_editor_types_object_tab_manager_tabs_edit_providers_save_provider_use_save_context__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/save-provider/use-save-context.tsx");
/* ESM import */var _Pimcore_modules_data_object_hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./js/src/core/modules/data-object/hooks/use-data-object-draft.ts");
/* ESM import */var _Pimcore_modules_element_editor_shared_tab_manager_tabs_schedule_hooks_use_save_schedules__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("./js/src/core/modules/element/editor/shared-tab-manager/tabs/schedule/hooks/use-save-schedules.ts");
/* ESM import */var _Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("./js/src/core/modules/element/permissions/permission-helper.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_18__);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_19__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
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




















const EditorToolbarSaveButtons = ()=>{
    var _dataObject_draftData;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_20__.useTranslation)();
    const { id } = (0,react__WEBPACK_IMPORTED_MODULE_19__.useContext)(_Pimcore_modules_data_object_data_object_provider__WEBPACK_IMPORTED_MODULE_12__.DataObjectContext);
    const { dataObject, removeTrackedChanges, publishDraft } = (0,_Pimcore_modules_data_object_hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_15__.useDataObjectDraft)(id);
    const { save: saveDataObject, isLoading, isSuccess, isError, error } = (0,_Pimcore_modules_data_object_actions_save_use_save__WEBPACK_IMPORTED_MODULE_11__.useSave)();
    const { isAutoSaveLoading, runningTask } = (0,_Pimcore_modules_data_object_editor_types_object_tab_manager_tabs_edit_providers_save_provider_use_save_context__WEBPACK_IMPORTED_MODULE_14__.useSaveContext)();
    const { saveSchedules, isLoading: isSchedulesLoading, isSuccess: isSchedulesSuccess, isError: isSchedulesError, error: schedulesError } = (0,_Pimcore_modules_element_editor_shared_tab_manager_tabs_schedule_hooks_use_save_schedules__WEBPACK_IMPORTED_MODULE_16__.useSaveSchedules)('data-object', id, false);
    const { getModifiedDataObjectAttributes, resetModifiedDataObjectAttributes } = (0,_Pimcore_modules_data_object_editor_types_object_tab_manager_tabs_edit_providers_edit_form_provider_edit_form_provider__WEBPACK_IMPORTED_MODULE_13__.useEditFormContext)();
    const { deleteDraft, isLoading: isDraftDeleteLoading, buttonText: deleteDraftButtonText } = (0,_Pimcore_modules_data_object_actions_delete_draft_use_delete_draft__WEBPACK_IMPORTED_MODULE_10__.useDeleteDraft)();
    const messageApi = (0,_Pimcore_components_message_useMessage__WEBPACK_IMPORTED_MODULE_6__.useMessage)();
    const isAutoSaved = (dataObject === null || dataObject === void 0 ? void 0 : (_dataObject_draftData = dataObject.draftData) === null || _dataObject_draftData === void 0 ? void 0 : _dataObject_draftData.isAutoSave) === true;
    (0,react__WEBPACK_IMPORTED_MODULE_19__.useEffect)(()=>{
        const handleSuccessEvent = async ()=>{
            if (isSuccess && isSchedulesSuccess) {
                removeTrackedChanges();
                await messageApi.success(t('save-success'));
            }
        };
        handleSuccessEvent().catch((error)=>{
            console.error(error);
        });
    }, [
        isSuccess,
        isSchedulesSuccess
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_19__.useEffect)(()=>{
        if (isError && !(0,lodash__WEBPACK_IMPORTED_MODULE_18__.isNil)(error)) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_9__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_9__.ApiError(error));
        } else if (isSchedulesError && !(0,lodash__WEBPACK_IMPORTED_MODULE_18__.isNil)(schedulesError)) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_9__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_9__.ApiError(schedulesError));
        }
    }, [
        isError,
        isSchedulesError,
        error,
        schedulesError
    ]);
    async function handleSaveClick(task, onFinish) {
        if ((dataObject === null || dataObject === void 0 ? void 0 : dataObject.changes) === undefined) return;
        Promise.all([
            saveDataObject(getModifiedDataObjectAttributes(), task, ()=>{
                resetModifiedDataObjectAttributes();
                onFinish === null || onFinish === void 0 ? void 0 : onFinish();
            }),
            saveSchedules()
        ]).catch((error)=>{
            console.error(error);
        });
    }
    const getSecondaryButtons = ()=>{
        const secondaryButtons = [];
        const isDraftLoading = runningTask === _Pimcore_modules_data_object_actions_save_use_save__WEBPACK_IMPORTED_MODULE_11__.SaveTaskType.Version && (isLoading || isSchedulesLoading) || isDraftDeleteLoading;
        if ((0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_17__.checkElementPermission)(dataObject === null || dataObject === void 0 ? void 0 : dataObject.permissions, 'save')) {
            if ((dataObject === null || dataObject === void 0 ? void 0 : dataObject.published) === true) {
                secondaryButtons.push(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
                    disabled: isLoading || isSchedulesLoading || isDraftLoading,
                    loading: runningTask === _Pimcore_modules_data_object_actions_save_use_save__WEBPACK_IMPORTED_MODULE_11__.SaveTaskType.Version && (isLoading || isSchedulesLoading),
                    onClick: async ()=>{
                        await handleSaveClick(_Pimcore_modules_data_object_actions_save_use_save__WEBPACK_IMPORTED_MODULE_11__.SaveTaskType.Version);
                    },
                    type: "default",
                    children: t('toolbar.save-draft')
                }, "save-draft", false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/toolbar/save-buttons/save-buttons.tsx",
                    lineNumber: 100,
                    columnNumber: 11
                }, undefined));
            }
            const saveDisabled = isLoading || isSchedulesLoading || isDraftLoading;
            if ((dataObject === null || dataObject === void 0 ? void 0 : dataObject.published) === false && (0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_17__.checkElementPermission)(dataObject === null || dataObject === void 0 ? void 0 : dataObject.permissions, 'save')) {
                secondaryButtons.push(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
                    disabled: saveDisabled,
                    loading: runningTask === _Pimcore_modules_data_object_actions_save_use_save__WEBPACK_IMPORTED_MODULE_11__.SaveTaskType.Publish && (isLoading || isSchedulesLoading),
                    onClick: async ()=>{
                        await handleSaveClick(_Pimcore_modules_data_object_actions_save_use_save__WEBPACK_IMPORTED_MODULE_11__.SaveTaskType.Publish, ()=>{
                            publishDraft();
                        });
                    },
                    type: "default",
                    children: t('toolbar.save-and-publish')
                }, "save-draft", false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/toolbar/save-buttons/save-buttons.tsx",
                    lineNumber: 118,
                    columnNumber: 11
                }, undefined));
            }
            if (!(0,lodash__WEBPACK_IMPORTED_MODULE_18__.isNil)(dataObject === null || dataObject === void 0 ? void 0 : dataObject.draftData)) {
                secondaryButtons.push(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_3__.Dropdown, {
                    menu: {
                        items: [
                            {
                                disabled: isLoading,
                                label: deleteDraftButtonText,
                                key: 'delete-draft',
                                onClick: deleteDraft
                            }
                        ]
                    },
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_4__.IconButton, {
                        disabled: isLoading || isSchedulesLoading || isDraftLoading,
                        icon: {
                            value: 'chevron-down'
                        },
                        loading: isDraftDeleteLoading,
                        type: "default"
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/toolbar/save-buttons/save-buttons.tsx",
                        lineNumber: 149,
                        columnNumber: 13
                    }, undefined)
                }, "dropdown", false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/toolbar/save-buttons/save-buttons.tsx",
                    lineNumber: 136,
                    columnNumber: 11
                }, undefined));
            }
        }
        return secondaryButtons;
    };
    const getPrimaryButtons = ()=>{
        const primaryButtons = [];
        const saveDisabled = isLoading || isSchedulesLoading || isDraftDeleteLoading;
        if ((dataObject === null || dataObject === void 0 ? void 0 : dataObject.published) === true && (0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_17__.checkElementPermission)(dataObject === null || dataObject === void 0 ? void 0 : dataObject.permissions, 'publish')) {
            primaryButtons.push(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
                disabled: saveDisabled,
                loading: runningTask === _Pimcore_modules_data_object_actions_save_use_save__WEBPACK_IMPORTED_MODULE_11__.SaveTaskType.Publish && (isLoading || isSchedulesLoading),
                onClick: async ()=>{
                    await handleSaveClick(_Pimcore_modules_data_object_actions_save_use_save__WEBPACK_IMPORTED_MODULE_11__.SaveTaskType.Publish);
                },
                type: "primary",
                children: t('toolbar.save-and-publish')
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/toolbar/save-buttons/save-buttons.tsx",
                lineNumber: 170,
                columnNumber: 9
            }, undefined));
        }
        if ((dataObject === null || dataObject === void 0 ? void 0 : dataObject.published) === false && (0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_17__.checkElementPermission)(dataObject === null || dataObject === void 0 ? void 0 : dataObject.permissions, 'save')) {
            primaryButtons.push(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
                disabled: saveDisabled,
                loading: runningTask === _Pimcore_modules_data_object_actions_save_use_save__WEBPACK_IMPORTED_MODULE_11__.SaveTaskType.Save && (isLoading || isSchedulesLoading),
                onClick: async ()=>{
                    await handleSaveClick(_Pimcore_modules_data_object_actions_save_use_save__WEBPACK_IMPORTED_MODULE_11__.SaveTaskType.Save);
                },
                type: "primary",
                children: t('toolbar.save-draft')
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/toolbar/save-buttons/save-buttons.tsx",
                lineNumber: 185,
                columnNumber: 9
            }, undefined));
        }
        return primaryButtons;
    };
    const secondaryButtons = getSecondaryButtons();
    const primaryButtons = getPrimaryButtons();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            isAutoSaveLoading && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_tooltip_tooltip__WEBPACK_IMPORTED_MODULE_8__.Tooltip, {
                title: t('auto-save.loading-tooltip'),
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_spin_spin__WEBPACK_IMPORTED_MODULE_7__.Spin, {
                    type: "classic"
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/toolbar/save-buttons/save-buttons.tsx",
                    lineNumber: 209,
                    columnNumber: 11
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/toolbar/save-buttons/save-buttons.tsx",
                lineNumber: 208,
                columnNumber: 9
            }, undefined),
            !isAutoSaveLoading && isAutoSaved && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_tooltip_tooltip__WEBPACK_IMPORTED_MODULE_8__.Tooltip, {
                title: t('auto-save.tooltip'),
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_5__.Icon, {
                    value: "auto-save"
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/toolbar/save-buttons/save-buttons.tsx",
                    lineNumber: 214,
                    columnNumber: 11
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/toolbar/save-buttons/save-buttons.tsx",
                lineNumber: 213,
                columnNumber: 9
            }, undefined),
            secondaryButtons.length > 0 && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_group_button_group__WEBPACK_IMPORTED_MODULE_1__.ButtonGroup, {
                items: secondaryButtons,
                noSpacing: true
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/toolbar/save-buttons/save-buttons.tsx",
                lineNumber: 218,
                columnNumber: 9
            }, undefined),
            primaryButtons.length > 0 && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_group_button_group__WEBPACK_IMPORTED_MODULE_1__.ButtonGroup, {
                items: primaryButtons,
                noSpacing: true
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/toolbar/save-buttons/save-buttons.tsx",
                lineNumber: 224,
                columnNumber: 9
            }, undefined)
        ]
    }, void 0, true);
};
_s(EditorToolbarSaveButtons, "WnroF699yEBRj8BEY/KWCjY1HdM=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_20__.useTranslation,
        _Pimcore_modules_data_object_hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_15__.useDataObjectDraft,
        _Pimcore_modules_data_object_actions_save_use_save__WEBPACK_IMPORTED_MODULE_11__.useSave,
        _Pimcore_modules_data_object_editor_types_object_tab_manager_tabs_edit_providers_save_provider_use_save_context__WEBPACK_IMPORTED_MODULE_14__.useSaveContext,
        _Pimcore_modules_element_editor_shared_tab_manager_tabs_schedule_hooks_use_save_schedules__WEBPACK_IMPORTED_MODULE_16__.useSaveSchedules,
        _Pimcore_modules_data_object_editor_types_object_tab_manager_tabs_edit_providers_edit_form_provider_edit_form_provider__WEBPACK_IMPORTED_MODULE_13__.useEditFormContext,
        _Pimcore_modules_data_object_actions_delete_draft_use_delete_draft__WEBPACK_IMPORTED_MODULE_10__.useDeleteDraft,
        _Pimcore_components_message_useMessage__WEBPACK_IMPORTED_MODULE_6__.useMessage
    ];
});
_c = EditorToolbarSaveButtons;
var _c;
$RefreshReg$(_c, "EditorToolbarSaveButtons");

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
"./js/src/core/modules/data-object/editor/toolbar/toolbar.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Toolbar: () => (Toolbar)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_toolbar_toolbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/toolbar/toolbar.tsx");
/* ESM import */var _hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/data-object/hooks/use-data-object-draft.ts");
/* ESM import */var _data_object_provider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/data-object/data-object-provider.tsx");
/* ESM import */var _Pimcore_app_config_services_service_ids__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/app/config/services/service-ids.ts");
/* ESM import */var _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/app/depency-injection/index.ts");
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var _types_object_tab_manager_tabs_edit_edit_container__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/edit-container.tsx");
/* ESM import */var _language_selection_language_selection__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/data-object/editor/toolbar/language-selection/language-selection.tsx");
/* ESM import */var _Pimcore_modules_asset_editor_toolbar_workflow_log_modal_workflow_log_modal__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/asset/editor/toolbar/workflow-log-modal/workflow-log-modal.tsx");
/* ESM import */var _Pimcore_modules_asset_editor_toolbar_workflow_menu_workflow_menu__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/asset/editor/toolbar/workflow-menu/workflow-menu.tsx");
/* ESM import */var _Pimcore_modules_asset_editor_toolbar_workflow_log_modal_workflow_provider__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/asset/editor/toolbar/workflow-log-modal/workflow-provider.tsx");
/* ESM import */var _Pimcore_modules_data_object_editor_toolbar_save_buttons_save_buttons__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/modules/data-object/editor/toolbar/save-buttons/save-buttons.tsx");
/* ESM import */var _Pimcore_modules_app_component_registry_component_config__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/modules/app/component-registry/component-config.ts");
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














const Toolbar = ()=>{
    _s();
    const { id } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_data_object_provider__WEBPACK_IMPORTED_MODULE_4__.DataObjectContext);
    const { activeTab } = (0,_hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_3__.useDataObjectDraft)(id);
    const componentRegistry = _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_6__.container.get(_Pimcore_app_config_services_service_ids__WEBPACK_IMPORTED_MODULE_5__.serviceIds["App/ComponentRegistry/ComponentRegistry"]);
    const ContextMenu = componentRegistry.get(_Pimcore_modules_app_component_registry_component_config__WEBPACK_IMPORTED_MODULE_14__.componentConfig.dataObject.editor.toolbar.contextMenu.name);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_toolbar_toolbar__WEBPACK_IMPORTED_MODULE_2__.Toolbar, {
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_asset_editor_toolbar_workflow_log_modal_workflow_provider__WEBPACK_IMPORTED_MODULE_12__.WorkFlowProvider, {
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_7__.Flex, {
                    children: [
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(ContextMenu, {}, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/toolbar/toolbar.tsx",
                            lineNumber: 44,
                            columnNumber: 11
                        }, undefined),
                        activeTab === _types_object_tab_manager_tabs_edit_edit_container__WEBPACK_IMPORTED_MODULE_8__.TAB_EDIT.key && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_language_selection_language_selection__WEBPACK_IMPORTED_MODULE_9__.LanguageSelection, {}, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/toolbar/toolbar.tsx",
                            lineNumber: 47,
                            columnNumber: 13
                        }, undefined)
                    ]
                }, void 0, true, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/toolbar/toolbar.tsx",
                    lineNumber: 43,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_7__.Flex, {
                    align: "center",
                    gap: 'extra-small',
                    style: {
                        height: '32px'
                    },
                    vertical: false,
                    children: [
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_asset_editor_toolbar_workflow_menu_workflow_menu__WEBPACK_IMPORTED_MODULE_11__.EditorToolbarWorkflowMenu, {}, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/toolbar/toolbar.tsx",
                            lineNumber: 57,
                            columnNumber: 11
                        }, undefined),
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_data_object_editor_toolbar_save_buttons_save_buttons__WEBPACK_IMPORTED_MODULE_13__.EditorToolbarSaveButtons, {}, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/toolbar/toolbar.tsx",
                            lineNumber: 58,
                            columnNumber: 11
                        }, undefined)
                    ]
                }, void 0, true, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/toolbar/toolbar.tsx",
                    lineNumber: 51,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_asset_editor_toolbar_workflow_log_modal_workflow_log_modal__WEBPACK_IMPORTED_MODULE_10__.WorkflowLogModal, {}, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/toolbar/toolbar.tsx",
                    lineNumber: 60,
                    columnNumber: 9
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/toolbar/toolbar.tsx",
            lineNumber: 42,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/toolbar/toolbar.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, undefined);
};
_s(Toolbar, "jf1w3FJE4a7XFHNs7iPD6tH0UO0=", false, function() {
    return [
        _hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_3__.useDataObjectDraft
    ];
});
_c = Toolbar;
var _c;
$RefreshReg$(_c, "Toolbar");

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
"./js/src/core/modules/data-object/editor/types/folder/tab-manager/folder-tab-manager.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  FolderTabManager: () => (FolderTabManager)
});
/* ESM import */var _swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/tslib/tslib.es6.mjs");
/* ESM import */var _Pimcore_modules_element_editor_tab_manager_tab_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/element/editor/tab-manager/tab-manager.ts");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(inversify__WEBPACK_IMPORTED_MODULE_1__);
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



class FolderTabManager extends _Pimcore_modules_element_editor_tab_manager_tab_manager__WEBPACK_IMPORTED_MODULE_0__.TabManager {
    constructor(){
        super();
        this.type = 'folder';
    }
}
FolderTabManager = (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.injectable)(),
    (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:type", Function),
    (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:paramtypes", [])
], FolderTabManager);

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
"./js/src/core/modules/data-object/editor/types/object/tab-manager/object-tab-manager.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ObjectTabManager: () => (ObjectTabManager)
});
/* ESM import */var _swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/tslib/tslib.es6.mjs");
/* ESM import */var _Pimcore_modules_element_editor_tab_manager_tab_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/element/editor/tab-manager/tab-manager.ts");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(inversify__WEBPACK_IMPORTED_MODULE_1__);
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



class ObjectTabManager extends _Pimcore_modules_element_editor_tab_manager_tab_manager__WEBPACK_IMPORTED_MODULE_0__.TabManager {
    constructor(){
        super();
        this.type = 'object';
    }
}
ObjectTabManager = (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.injectable)(),
    (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:type", Function),
    (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:paramtypes", [])
], ObjectTabManager);

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
"./js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/root-component.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  RootComponent: () => (RootComponent)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _object_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/object-component.tsx");
/* ESM import */var _Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/form/form.tsx");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var _Pimcore_modules_data_object_editor_types_object_tab_manager_tabs_edit_providers_edit_form_provider_edit_form_provider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/edit-form-provider/edit-form-provider.tsx");
/* ESM import */var _Pimcore_modules_data_object_editor_types_object_tab_manager_tabs_edit_providers_inheritance_state_provider_use_inheritance_state__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/inheritance-state-provider/use-inheritance-state.tsx");
/* ESM import */var _Pimcore_modules_data_object_editor_types_object_tab_manager_tabs_edit_components_root_component_draft_alert__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/root-component/draft-alert.tsx");
/* ESM import */var _element_dynamic_types_definitions_objects_data_related_providers_field_width_field_width_provider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/field-width-provider.tsx");
/* ESM import */var _Pimcore_components_content_layout_content_layout__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/components/content-layout/content-layout.tsx");
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









const RootComponent = (param)=>{
    let { layout, data, className } = param;
    _s();
    const { form, updateModifiedDataObjectAttributes, updateDraft, getChangedFieldName, disabled } = (0,_Pimcore_modules_data_object_editor_types_object_tab_manager_tabs_edit_providers_edit_form_provider_edit_form_provider__WEBPACK_IMPORTED_MODULE_5__.useEditFormContext)();
    const inheritanceState = (0,_Pimcore_modules_data_object_editor_types_object_tab_manager_tabs_edit_providers_inheritance_state_provider_use_inheritance_state__WEBPACK_IMPORTED_MODULE_6__.useInheritanceState)();
    const handleValuesChange = (changedValues, allValues)=>{
        var _inheritanceState_getInheritanceState;
        if (disabled) {
            return;
        }
        updateModifiedDataObjectAttributes(changedValues);
        const fieldName = getChangedFieldName(changedValues);
        if (fieldName !== null && (inheritanceState === null || inheritanceState === void 0 ? void 0 : (_inheritanceState_getInheritanceState = inheritanceState.getInheritanceState(fieldName)) === null || _inheritanceState_getInheritanceState === void 0 ? void 0 : _inheritanceState_getInheritanceState.inherited) === true) {
            inheritanceState === null || inheritanceState === void 0 ? void 0 : inheritanceState.breakInheritance(fieldName);
        }
        updateDraft().catch((error)=>{
            console.error(error);
        });
    };
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_4__.ConfigProvider, {
            theme: {
                components: {
                    Form: {
                        itemMarginBottom: 0
                    }
                }
            },
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_element_dynamic_types_definitions_objects_data_related_providers_field_width_field_width_provider__WEBPACK_IMPORTED_MODULE_8__.FieldWidthProvider, {
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_3__.Form, {
                    className: className,
                    form: form,
                    initialValues: data,
                    layout: "vertical",
                    onValuesChange: handleValuesChange,
                    preserve: true,
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_layout_content_layout__WEBPACK_IMPORTED_MODULE_9__.ContentLayout, {
                        renderTopBar: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_data_object_editor_types_object_tab_manager_tabs_edit_components_root_component_draft_alert__WEBPACK_IMPORTED_MODULE_7__.DraftAlert, {}, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/root-component.tsx",
                            lineNumber: 66,
                            columnNumber: 28
                        }, void 0),
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_object_component__WEBPACK_IMPORTED_MODULE_2__.ObjectComponent, {
                            ...layout
                        }, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/root-component.tsx",
                            lineNumber: 68,
                            columnNumber: 13
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/root-component.tsx",
                        lineNumber: 65,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/root-component.tsx",
                    lineNumber: 57,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/root-component.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/root-component.tsx",
            lineNumber: 55,
            columnNumber: 5
        }, undefined), [
        layout,
        data,
        className
    ]);
};
_s(RootComponent, "MU23FnXtvmaQSdBvcqk2Qx1rj/A=", false, function() {
    return [
        _Pimcore_modules_data_object_editor_types_object_tab_manager_tabs_edit_providers_edit_form_provider_edit_form_provider__WEBPACK_IMPORTED_MODULE_5__.useEditFormContext,
        _Pimcore_modules_data_object_editor_types_object_tab_manager_tabs_edit_providers_inheritance_state_provider_use_inheritance_state__WEBPACK_IMPORTED_MODULE_6__.useInheritanceState
    ];
});
_c = RootComponent;
var _c;
$RefreshReg$(_c, "RootComponent");

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
"./js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/root-component/draft-alert.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DraftAlert: () => (DraftAlert)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_alert_alert__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/alert/alert.tsx");
/* ESM import */var _Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/box/box.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/button/button.tsx");
/* ESM import */var _Pimcore_modules_data_object_hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/data-object/hooks/use-data-object-draft.ts");
/* ESM import */var _Pimcore_modules_data_object_data_object_provider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/data-object/data-object-provider.tsx");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_9__);
/* ESM import */var _Pimcore_modules_data_object_draft_hooks_use_draft_data__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/data-object/draft/hooks/use-draft-data.ts");
/* ESM import */var _Pimcore_modules_data_object_actions_delete_draft_use_delete_draft__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/data-object/actions/delete-draft/use-delete-draft.tsx");
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











const DraftAlert = ()=>{
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation)();
    const { deleteDraft, isLoading, buttonText } = (0,_Pimcore_modules_data_object_actions_delete_draft_use_delete_draft__WEBPACK_IMPORTED_MODULE_11__.useDeleteDraft)();
    const { id } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_Pimcore_modules_data_object_data_object_provider__WEBPACK_IMPORTED_MODULE_8__.DataObjectContext);
    const { dataObject } = (0,_Pimcore_modules_data_object_hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_7__.useDataObjectDraft)(id);
    if ((0,lodash__WEBPACK_IMPORTED_MODULE_9__.isNil)(dataObject)) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}, void 0, false);
    }
    const draftData = dataObject === null || dataObject === void 0 ? void 0 : dataObject.draftData;
    if ((0,lodash__WEBPACK_IMPORTED_MODULE_9__.isNil)(draftData) || dataObject.changes[_Pimcore_modules_data_object_draft_hooks_use_draft_data__WEBPACK_IMPORTED_MODULE_10__.IS_AUTO_SAVE_DRAFT_CREATED]) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}, void 0, false);
    }
    const deleteDraftButton = /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_6__.Button, {
        danger: true,
        ghost: true,
        loading: isLoading,
        onClick: deleteDraft,
        size: "small",
        children: buttonText
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/root-component/draft-alert.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, undefined);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_3__.Box, {
        padding: "extra-small",
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_alert_alert__WEBPACK_IMPORTED_MODULE_2__.Alert, {
            action: deleteDraftButton,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_5__.Icon, {
                value: "draft"
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/root-component/draft-alert.tsx",
                lineNumber: 60,
                columnNumber: 16
            }, void 0),
            message: t(draftData.isAutoSave ? 'draft-alert-auto-save' : 'draft-alert'),
            showIcon: true,
            type: "info"
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/root-component/draft-alert.tsx",
            lineNumber: 58,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/root-component/draft-alert.tsx",
        lineNumber: 57,
        columnNumber: 5
    }, undefined);
};
_s(DraftAlert, "slgLyBycqfgBGzCYM58HHBVkC9w=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation,
        _Pimcore_modules_data_object_actions_delete_draft_use_delete_draft__WEBPACK_IMPORTED_MODULE_11__.useDeleteDraft,
        _Pimcore_modules_data_object_hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_7__.useDataObjectDraft
    ];
});
_c = DraftAlert;
var _c;
$RefreshReg$(_c, "DraftAlert");

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
"./js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/edit-container.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
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
        editContainer: css`
      display: flex;
      width: 100%;
      height: 100%;
      flex-direction: column;

      & > .ant-space,
      & > .ant-space > .ant-space-item {
        display: flex;
        width: 100%;
        height: 100%;

        .ant-tabs {
          width: 100%;
        }
      }
    `
    };
}, {
    hashPriority: 'high'
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
"./js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/edit-container.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  EditContainer: () => (EditContainer),
  TAB_EDIT: () => (TAB_EDIT)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _components_root_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/root-component.tsx");
/* ESM import */var _Pimcore_modules_data_object_data_object_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/data-object/data-object-api-slice-enhanced.ts");
/* ESM import */var _Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/element/hooks/use-element-context.ts");
/* ESM import */var _Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/content/content.tsx");
/* ESM import */var _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_field_collection_providers_field_collection_provider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/field-collection/providers/field-collection-provider.tsx");
/* ESM import */var _edit_container_styles__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/edit-container.styles.ts");
/* ESM import */var _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_object_brick_providers_object_brick_provider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/object-brick/providers/object-brick-provider.tsx");
/* ESM import */var _Pimcore_modules_data_object_editor_toolbar_context_menu_provider_use_layout_selection__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/data-object/editor/toolbar/context-menu/provider/use-layout-selection.tsx");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* ESM import */var _Pimcore_modules_data_object_hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/data-object/hooks/use-data-object-draft.ts");
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












const EditContainer = ()=>{
    _s();
    const { id } = (0,_Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_5__.useElementContext)();
    const { currentLayout } = (0,_Pimcore_modules_data_object_editor_toolbar_context_menu_provider_use_layout_selection__WEBPACK_IMPORTED_MODULE_10__.useLayoutSelection)();
    const { data: layoutData, isLoading, error: layoutError } = (0,_Pimcore_modules_data_object_data_object_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_4__.useDataObjectGetLayoutByIdQuery)({
        id,
        layoutId: currentLayout ?? undefined
    });
    const { dataObject, isLoading: isDraftLoading } = (0,_Pimcore_modules_data_object_hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_12__.useDataObjectDraft)(id);
    const { styles } = (0,_edit_container_styles__WEBPACK_IMPORTED_MODULE_8__.useStyles)();
    if (layoutError !== undefined) {
        (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_11__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_11__.ApiError(layoutError));
    }
    if (layoutData === undefined || isLoading || isDraftLoading) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_6__.Content, {
            loading: true
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/edit-container.tsx",
            lineNumber: 44,
            columnNumber: 12
        }, undefined);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_field_collection_providers_field_collection_provider__WEBPACK_IMPORTED_MODULE_7__.FieldCollectionProvider, {
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_object_brick_providers_object_brick_provider__WEBPACK_IMPORTED_MODULE_9__.ObjectBrickProvider, {
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_root_component__WEBPACK_IMPORTED_MODULE_3__.RootComponent, {
                className: styles.editContainer,
                data: dataObject === null || dataObject === void 0 ? void 0 : dataObject.objectData,
                layout: layoutData
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/edit-container.tsx",
                lineNumber: 50,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/edit-container.tsx",
            lineNumber: 49,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/edit-container.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, undefined);
};
_s(EditContainer, "6MVROah9tmWZL6oEbsWTbIM4Xog=", false, function() {
    return [
        _Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_5__.useElementContext,
        _Pimcore_modules_data_object_editor_toolbar_context_menu_provider_use_layout_selection__WEBPACK_IMPORTED_MODULE_10__.useLayoutSelection,
        _Pimcore_modules_data_object_data_object_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_4__.useDataObjectGetLayoutByIdQuery,
        _Pimcore_modules_data_object_hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_12__.useDataObjectDraft,
        _edit_container_styles__WEBPACK_IMPORTED_MODULE_8__.useStyles
    ];
});
_c = EditContainer;
const TAB_EDIT = {
    key: 'edit',
    label: 'asset.asset-editor-tabs.edit',
    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(EditContainer, {}, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/edit-container.tsx",
        lineNumber: 63,
        columnNumber: 13
    }, undefined),
    icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_2__.Icon, {
        value: 'edit-pen'
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/edit-container.tsx",
        lineNumber: 64,
        columnNumber: 9
    }, undefined),
    isDetachable: true
};
var _c;
$RefreshReg$(_c, "EditContainer");

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
"./js/src/core/modules/data-object/editor/widget.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DataObjectEditorWidget: () => (DataObjectEditorWidget)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_modules_data_object_editor_editor_container__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/data-object/editor/editor-container.tsx");
/* ESM import */var _Pimcore_modules_data_object_editor_title_title_container__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/data-object/editor/title/title-container.tsx");
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var _Pimcore_modules_data_object_data_object_provider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/data-object/data-object-provider.tsx");
/* ESM import */var _Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/data-object/data-object-draft-slice.tsx");
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






const DataObjectEditorWidget = {
    name: 'data-object-editor',
    component: _Pimcore_modules_data_object_editor_editor_container__WEBPACK_IMPORTED_MODULE_1__.EditorContainer,
    titleComponent: _Pimcore_modules_data_object_editor_title_title_container__WEBPACK_IMPORTED_MODULE_2__.TitleContainer,
    isModified: (tabNode)=>{
        const config = tabNode.getConfig();
        const dataObject = (0,_Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_6__.selectDataObjectById)(_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_3__.store.getState(), config.id);
        return (dataObject === null || dataObject === void 0 ? void 0 : dataObject.modified) ?? false;
    },
    getContextProvider: (context, children)=>{
        const config = context.config;
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_data_object_data_object_provider__WEBPACK_IMPORTED_MODULE_5__.DataObjectProvider, {
            id: config.id,
            children: children
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/widget.tsx",
            lineNumber: 35,
            columnNumber: 7
        }, undefined);
    }
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
"./js/src/core/modules/data-object/hooks/use-custom-layouts.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useCustomLayouts: () => (useCustomLayouts)
});
/* ESM import */var _Pimcore_modules_data_object_hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/data-object/hooks/use-data-object-draft.ts");
/* ESM import */var _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/class-definition/class-definition-slice-enhanced.ts");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
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
*/ 



const useCustomLayouts = (id)=>{
    const { dataObject, isLoading: isDraftLoading } = (0,_Pimcore_modules_data_object_hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_0__.useDataObjectDraft)(id);
    const { data, error, isLoading: isCustomLayoutLoading } = (0,_Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__.useClassCustomLayoutEditorCollectionQuery)({
        objectId: id
    }, {
        skip: dataObject === undefined || dataObject.type === 'folder'
    });
    if (error !== undefined) {
        (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_2__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_2__.ApiError(error));
    }
    const layouts = data !== undefined ? data.items : undefined;
    const getDefaultLayoutId = (currentLayout)=>{
        if ((0,lodash__WEBPACK_IMPORTED_MODULE_3__.isUndefined)(layouts)) {
            return null;
        }
        const defaultLayout = layouts.find((layout)=>layout.default) ?? layouts.find((layout)=>layout.id === currentLayout) ?? layouts.find((layout)=>layout.id === '0') ?? layouts[0] ?? null;
        return (defaultLayout === null || defaultLayout === void 0 ? void 0 : defaultLayout.id) ?? null;
    };
    const isLoading = isDraftLoading || isCustomLayoutLoading && (dataObject === null || dataObject === void 0 ? void 0 : dataObject.type) !== 'folder';
    return {
        layouts,
        getDefaultLayoutId,
        isLoading
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
"./js/src/core/modules/data-object/hooks/use-data-object.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useDataObject: () => (useDataObject)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _data_object_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/data-object/data-object-provider.tsx");
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

const useDataObject = ()=>{
    const { id } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_data_object_provider__WEBPACK_IMPORTED_MODULE_1__.DataObjectContext);
    return {
        id
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
"./js/src/core/modules/element/editor/layouts/tabs-toolbar-view.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
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
        tabbarToolbar: css`
      &.tabs-toolbar-layout {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        overflow: hidden;
      }

      .tabs-toolbar-layout__tabbar {
        display: flex;
        overflow: hidden;
        height: calc(100% - ${token.sizeXXL}px);
        width: 100%;
      }

      .tabs-toolbar-layout__toolbar {
        display: flex;
        overflow: hidden;
        height: ${token.sizeXXL}px;
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
"./js/src/core/modules/element/editor/layouts/tabs-toolbar-view.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TabsToolbarView: () => (TabsToolbarView)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _tabs_toolbar_view_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/element/editor/layouts/tabs-toolbar-view.styles.ts");
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


const TabsToolbarView = (props)=>{
    _s();
    const { styles } = (0,_tabs_toolbar_view_styles__WEBPACK_IMPORTED_MODULE_2__.useStyles)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: [
            'tabs-toolbar-layout',
            styles.tabbarToolbar
        ].join(' '),
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                className: "tabs-toolbar-layout__tabbar",
                children: props.renderTabbar
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/layouts/tabs-toolbar-view.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                className: "tabs-toolbar-layout__toolbar",
                children: props.renderToolbar
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/layouts/tabs-toolbar-view.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/layouts/tabs-toolbar-view.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, undefined);
};
_s(TabsToolbarView, "1BGFRu6BGAbhzJ8kKgs1GUjvI6w=", false, function() {
    return [
        _tabs_toolbar_view_styles__WEBPACK_IMPORTED_MODULE_2__.useStyles
    ];
});
_c = TabsToolbarView;

var _c;
$RefreshReg$(_c, "TabsToolbarView");

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
"./js/src/core/modules/element/editor/shared-tab-manager/tabs-container.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TabsContainer: () => (TabsContainer)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_modules_element_editor_tabs_editor_tabs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/element/editor/tabs/editor-tabs.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/app/depency-injection/index.ts");
/* ESM import */var _Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/element/hooks/use-element-context.ts");
/* ESM import */var _Pimcore_modules_element_hooks_use_element_draft__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/element/hooks/use-element-draft.ts");
/* ESM import */var _Pimcore_modules_element_editor_shared_tab_manager_tab_manager_context__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/element/editor/shared-tab-manager/tab-manager-context.tsx");
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







const TabsContainer = (param)=>{
    let { elementEditorType } = param;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation)();
    const tabManager = (0,_Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_4__.useInjection)(elementEditorType.tabManagerServiceId);
    const { id, elementType } = (0,_Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_5__.useElementContext)();
    const { element } = (0,_Pimcore_modules_element_hooks_use_element_draft__WEBPACK_IMPORTED_MODULE_6__.useElementDraft)(id, elementType);
    const tabs = tabManager.getTabs();
    const preparedTabs = tabs.map((tab, index)=>{
        const baseTab = {
            ...tabs[index],
            label: typeof tab.label === 'string' ? t(tab.label) : tab.label
        };
        if (tab.key === 'workflow') {
            return {
                ...baseTab,
                hidden: ()=>(element === null || element === void 0 ? void 0 : element.hasWorkflowAvailable) === false || (element === null || element === void 0 ? void 0 : element.hasWorkflowAvailable) === undefined
            };
        }
        return baseTab;
    });
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_editor_shared_tab_manager_tab_manager_context__WEBPACK_IMPORTED_MODULE_7__.TabManagerProvider, {
        tabManager: tabManager,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_editor_tabs_editor_tabs__WEBPACK_IMPORTED_MODULE_2__.EditorTabs, {
            defaultActiveKey: '1',
            items: preparedTabs,
            showLabelIfActive: true
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs-container.tsx",
            lineNumber: 48,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs-container.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, undefined);
};
_s(TabsContainer, "gHUu6FpGoT5btdDmbCqN9WtKUW4=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation,
        _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_4__.useInjection,
        _Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_5__.useElementContext,
        _Pimcore_modules_element_hooks_use_element_draft__WEBPACK_IMPORTED_MODULE_6__.useElementDraft
    ];
});
_c = TabsContainer;
var _c;
$RefreshReg$(_c, "TabsContainer");

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
"./js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/version-api-slice-enhanced.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  api: () => (api),
  useVersionAssetDownloadByIdQuery: () => (useVersionAssetDownloadByIdQuery),
  useVersionCleanupForElementByTypeAndIdMutation: () => (useVersionCleanupForElementByTypeAndIdMutation),
  useVersionDeleteByIdMutation: () => (useVersionDeleteByIdMutation),
  useVersionGetByIdQuery: () => (useVersionGetByIdQuery),
  useVersionGetCollectionForElementByTypeAndIdQuery: () => (useVersionGetCollectionForElementByTypeAndIdQuery),
  useVersionPublishByIdMutation: () => (useVersionPublishByIdMutation),
  useVersionUpdateByIdMutation: () => (useVersionUpdateByIdMutation)
});
/* ESM import */var _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/tags.ts");
/* ESM import */var _version_api_slice_gen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/version-api-slice.gen.ts");
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

const api = _version_api_slice_gen__WEBPACK_IMPORTED_MODULE_1__.api.enhanceEndpoints({
    addTagTypes: [
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.ASSET_DETAIL
    ],
    endpoints: {
        versionGetById: {
            providesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.VERSIONS_DETAIL(args.id)
        },
        versionGetCollectionForElementByTypeAndId: {
            providesTags: (result, error, args)=>{
                const tagCollection = [];
                result === null || result === void 0 ? void 0 : result.items.forEach((version)=>{
                    tagCollection.push(..._Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.VERSIONS_DETAIL(version.id));
                });
                return [
                    ...tagCollection,
                    ..._Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.ELEMENT_VERSIONS(args.elementType, args.id)
                ];
            }
        },
        versionCleanupForElementByTypeAndId: {
            invalidatesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.ELEMENT_VERSIONS(args.elementType, args.id)
        },
        versionUpdateById: {
            invalidatesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.VERSIONS_DETAIL(args.id)
        },
        versionPublishById: {
            invalidatesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.VERSIONS_DETAIL(args.id)
        },
        versionDeleteById: {
            invalidatesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.VERSIONS_DETAIL(args.id)
        }
    }
});
const { useVersionAssetDownloadByIdQuery, useVersionCleanupForElementByTypeAndIdMutation, useVersionDeleteByIdMutation, useVersionGetByIdQuery, useVersionGetCollectionForElementByTypeAndIdQuery, useVersionPublishByIdMutation, useVersionUpdateByIdMutation } = api;

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
"./js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/version-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useVersionAssetDownloadByIdQuery: () => (useVersionAssetDownloadByIdQuery),
  useVersionCleanupForElementByTypeAndIdMutation: () => (useVersionCleanupForElementByTypeAndIdMutation),
  useVersionDeleteByIdMutation: () => (useVersionDeleteByIdMutation),
  useVersionGetByIdQuery: () => (useVersionGetByIdQuery),
  useVersionGetCollectionForElementByTypeAndIdQuery: () => (useVersionGetCollectionForElementByTypeAndIdQuery),
  useVersionImageStreamByIdQuery: () => (useVersionImageStreamByIdQuery),
  useVersionPdfStreamByIdQuery: () => (useVersionPdfStreamByIdQuery),
  useVersionPublishByIdMutation: () => (useVersionPublishByIdMutation),
  useVersionUpdateByIdMutation: () => (useVersionUpdateByIdMutation)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Versions"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            versionAssetDownloadById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/versions/${queryArg.id}/asset/download`
                    }),
                providesTags: [
                    "Versions"
                ]
            }),
            versionImageStreamById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/versions/${queryArg.id}/image/stream`
                    }),
                providesTags: [
                    "Versions"
                ]
            }),
            versionPdfStreamById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/versions/${queryArg.id}/pdf/stream`
                    }),
                providesTags: [
                    "Versions"
                ]
            }),
            versionGetById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/versions/${queryArg.id}`
                    }),
                providesTags: [
                    "Versions"
                ]
            }),
            versionUpdateById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/versions/${queryArg.id}`,
                        method: "PUT",
                        body: queryArg.updateVersion
                    }),
                invalidatesTags: [
                    "Versions"
                ]
            }),
            versionPublishById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/versions/${queryArg.id}`,
                        method: "POST"
                    }),
                invalidatesTags: [
                    "Versions"
                ]
            }),
            versionDeleteById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/versions/${queryArg.id}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Versions"
                ]
            }),
            versionGetCollectionForElementByTypeAndId: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/versions/${queryArg.elementType}/${queryArg.id}`,
                        params: {
                            page: queryArg.page,
                            pageSize: queryArg.pageSize
                        }
                    }),
                providesTags: [
                    "Versions"
                ]
            }),
            versionCleanupForElementByTypeAndId: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/versions/${queryArg.elementType}/${queryArg.id}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Versions"
                ]
            })
        }),
    overrideExisting: false
});

const { useVersionAssetDownloadByIdQuery, useVersionImageStreamByIdQuery, useVersionPdfStreamByIdQuery, useVersionGetByIdQuery, useVersionUpdateByIdMutation, useVersionPublishByIdMutation, useVersionDeleteByIdMutation, useVersionGetCollectionForElementByTypeAndIdQuery, useVersionCleanupForElementByTypeAndIdMutation } = injectedRtkApi;

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
"./js/src/core/modules/element/editor/tabs/editor-tabs.icon-wrapper.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  IconWrapper: () => (IconWrapper)
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


const IconWrapper = (param)=>{
    let { tabKey, activeTabKey, tabKeyInFocus, tabKeyOutOfFocus, title, children } = param;
    _s();
    const [showTooltip, setShowTooltip] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (tabKeyInFocus !== undefined) {
            setShowTooltip(tabKeyInFocus);
        }
    }, [
        tabKeyInFocus
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (tabKeyOutOfFocus !== undefined && tabKeyOutOfFocus === showTooltip) {
            setShowTooltip(null);
        }
    }, [
        tabKeyOutOfFocus
    ]);
    const toolTipIsVisible = showTooltip === tabKey && activeTabKey !== tabKey;
    const handleMouseEnter = ()=>{
        setShowTooltip(tabKey);
    };
    const handleMouseLeave = ()=>{
        setShowTooltip(null);
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Tooltip, {
        arrow: false,
        open: toolTipIsVisible,
        placement: "top",
        title: title,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
            onMouseEnter: handleMouseEnter,
            onMouseLeave: handleMouseLeave,
            children: children
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/tabs/editor-tabs.icon-wrapper.tsx",
            lineNumber: 53,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/tabs/editor-tabs.icon-wrapper.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, undefined);
};
_s(IconWrapper, "JFRjn1uz3Bv0o532BV7KPBBiAG4=");
_c = IconWrapper;
var _c;
$RefreshReg$(_c, "IconWrapper");

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
"./js/src/core/modules/element/editor/tabs/editor-tabs.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
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
        editorTabsContainer: css`
      width: 100%;
    `,
        editorTabs: css`
      height: 100%;
      width: 100%;
      overflow: hidden;

      .ant-tabs-content {
        display: flex;
        height: 100%;
      }
      
      &.ant-tabs > .ant-tabs-nav > .ant-tabs-nav-wrap > .ant-tabs-nav-list > .ant-tabs-tab {
        margin: 0 ${token.paddingXS}px !important;
        transition: color .2s;

        display: flex;
        height: 32px;
      }

      .ant-tabs-tabpane {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
      }

      .ant-tabs-content-holder {
        overflow: auto;
      }
      &.ant-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
        color: ${token.colorPrimaryActive}
      }
      &.ant-tabs-top >.ant-tabs-nav {
        margin-bottom: 0;
        padding-right: ${token.paddingXXS}px;
          
        .ant-tabs-nav-wrap {
          display: flex;
          justify-content: flex-end;
            
          .ant-tabs-nav-list {
            display: flex;
            align-items: center;
          }
        }
      }

      &.ant-tabs .ant-tabs-tab-btn .ant-tabs-tab-icon:not(:last-child) {
        margin-inline-end: 0;
      }
      
      &.ant-tabs > .ant-tabs-nav > .ant-tabs-nav-wrap > .ant-tabs-nav-list > .ant-tabs-tab {
        padding: 0;
        
        &:first-of-type {
            margin-left: ${token.paddingSM}px;
            margin-right: ${token.paddingSM}px;
        }
        
        .ant-tabs-tab-btn {
          display: flex;
          padding-top: ${token.paddingXS}px;
          padding-bottom: ${token.paddingXS}px;
          justify-content: center;
          align-items: center;
          gap: ${token.paddingTabs}px;
          
          .ant-tabs-tab-icon {
            height: 16px;
            display: flex;
            justify-content: center;
            align-content: center;
            margin-inline-end: 0;
            color: ${token.Tabs.itemUnselectedIconColor};
            
            svg {
              height: 16px;
              width: 16px
            }
          }
        }
          
        .detachable-button {
          display: none;
          color: ${token.Tabs.itemUnselectedIconColor};
          height: ${token.controlHeightSM}px;
          width: ${token.controlHeightSM}px;
        }

        &:not(.ant-tabs-tab-active) {
          .ant-tabs-tab-icon {
            &:hover {
                color: ${token.colorIconHover};
            }
          }
        }
        
        &.ant-tabs-tab-active  {
          .ant-tabs-tab-icon {
              color: ${token.colorPrimaryActive}
          }

          .detachable-button {
            display: flex;
            color: ${token.colorPrimary};
          }
        }
      }
    `,
        onlyActiveLabel: css`
      .ant-tabs-tab:not(.ant-tabs-tab-active) {
          span:nth-child(2) {
              display: none;
          }

          .ant-tabs-tab-icon {
              margin-inline-end: 0;
          }
      }

      @keyframes fadeIn {
          from {
              opacity: 0;
          }

          to {
              opacity: 1;
          }
      }

      .ant-tabs-tab.ant-tabs-tab-active {
          //border-bottom: 3px solid ${token.colorPrimaryActive};
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
"./js/src/core/modules/element/editor/tabs/editor-tabs.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  EditorTabs: () => (EditorTabs)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_modules_element_editor_tabs_editor_tabs_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/element/editor/tabs/editor-tabs.styles.tsx");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/classnames/index.js");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var _Pimcore_modules_element_editor_tabs_hooks_use_detach_tab__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/element/editor/tabs/hooks/use-detach-tab.ts");
/* ESM import */var _Pimcore_components_element_toolbar_element_toolbar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/element-toolbar/element-toolbar.tsx");
/* ESM import */var _Pimcore_modules_element_editor_tabs_editor_tabs_icon_wrapper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/element/editor/tabs/editor-tabs.icon-wrapper.tsx");
/* ESM import */var _Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/element/hooks/use-element-context.ts");
/* ESM import */var _Pimcore_utils_hooks_use_element_resize__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/utils/hooks/use-element-resize.ts");
/* ESM import */var _Pimcore_modules_element_hooks_use_element_draft__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/element/hooks/use-element-draft.ts");
/* ESM import */var _Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/element/permissions/permission-helper.ts");
/* ESM import */var _Pimcore_modules_auth_permission_helper__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/auth/permission-helper.ts");
/* ESM import */var _Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/components/icon-button/icon-button.tsx");
/* ESM import */var _Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/components/box/box.tsx");
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














const EditorTabs = (param)=>{
    let { defaultActiveKey, showLabelIfActive, items } = param;
    _s();
    const { styles } = (0,_Pimcore_modules_element_editor_tabs_editor_tabs_styles__WEBPACK_IMPORTED_MODULE_2__.useStyle)();
    const { detachWidget } = (0,_Pimcore_modules_element_editor_tabs_hooks_use_detach_tab__WEBPACK_IMPORTED_MODULE_5__.useDetachTab)();
    const { id, elementType } = (0,_Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_8__.useElementContext)();
    const { activeTab, setActiveTab } = (0,_Pimcore_modules_element_hooks_use_element_draft__WEBPACK_IMPORTED_MODULE_10__.useElementDraft)(id, elementType);
    const [tabKeyInFocus, setTabKeyInFocus] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(undefined);
    const [tabKeyOutOfFocus, setTabKeyOutOfFocus] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(undefined);
    const elementDraft = (0,_Pimcore_modules_element_hooks_use_element_draft__WEBPACK_IMPORTED_MODULE_10__.useElementDraft)(id, elementType);
    const element = elementDraft.element;
    const elementRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const editorTabsWidth = (0,_Pimcore_utils_hooks_use_element_resize__WEBPACK_IMPORTED_MODULE_9__["default"])(elementRef);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (activeTab === null && (items === null || items === void 0 ? void 0 : items.length) > 0) {
            setActiveTab(items[0].key);
        }
    }, [
        items
    ]);
    const onChange = (key)=>{
        setActiveTab(key);
    };
    const tabKeys = items === null || items === void 0 ? void 0 : items.map((item)=>item.key);
    const findTabKey = (event)=>{
        const target = event.target;
        const id = target.id;
        return tabKeys.find((substring)=>id.includes(substring));
    };
    const onFocus = (event)=>{
        setTabKeyInFocus(findTabKey(event));
    };
    const onBlur = (event)=>{
        setTabKeyOutOfFocus(findTabKey(event));
    };
    const openDetachedWidget = (item)=>{
        detachWidget(item);
        if ((items === null || items === void 0 ? void 0 : items.length) > 0) {
            setActiveTab(items[0].key);
        }
    };
    items = items.filter((item)=>{
        if (item.hidden !== undefined && item.hidden(element)) {
            return false;
        }
        if (item.workspacePermission !== undefined && (element === null || element === void 0 ? void 0 : element.permissions) !== undefined) {
            if (!(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_11__.checkElementPermission)(element.permissions, item.workspacePermission)) {
                return false;
            }
        }
        if (item.userPermission !== undefined && !(0,_Pimcore_modules_auth_permission_helper__WEBPACK_IMPORTED_MODULE_12__.isAllowed)(item.userPermission)) {
            return false;
        }
        return true;
    });
    items = items === null || items === void 0 ? void 0 : items.map((item)=>{
        const tmpItem = {
            ...item,
            originalLabel: item.label,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_editor_tabs_editor_tabs_icon_wrapper__WEBPACK_IMPORTED_MODULE_7__.IconWrapper, {
                activeTabKey: activeTab,
                tabKey: item.key,
                tabKeyInFocus: tabKeyInFocus,
                tabKeyOutOfFocus: tabKeyOutOfFocus,
                title: item.label,
                children: item.icon
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/tabs/editor-tabs.tsx",
                lineNumber: 111,
                columnNumber: 9
            }, undefined)
        };
        if (tmpItem.isDetachable === true) {
            tmpItem.label = /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                        children: tmpItem.label
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/tabs/editor-tabs.tsx",
                        lineNumber: 126,
                        columnNumber: 11
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_13__.IconButton, {
                        className: 'detachable-button',
                        icon: {
                            value: 'share'
                        },
                        onClick: (e)=>{
                            e.stopPropagation();
                            openDetachedWidget({
                                tabKey: item.key
                            });
                        },
                        type: 'link'
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/tabs/editor-tabs.tsx",
                        lineNumber: 127,
                        columnNumber: 11
                    }, undefined)
                ]
            }, void 0, true);
        }
        return tmpItem;
    });
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: styles.editorTabsContainer,
        ref: elementRef,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.Tabs, {
            activeKey: activeTab ?? undefined,
            className: classnames__WEBPACK_IMPORTED_MODULE_4___default()(styles.editorTabs, {
                [styles.onlyActiveLabel]: showLabelIfActive
            }),
            defaultActiveKey: defaultActiveKey,
            items: items,
            onBlur: onBlur,
            onFocus: onFocus,
            onTabClick: onChange,
            tabBarExtraContent: {
                left: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_14__.Box, {
                    padding: {
                        left: 'extra-small',
                        top: 'extra-small',
                        bottom: 'extra-small'
                    },
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_element_toolbar_element_toolbar__WEBPACK_IMPORTED_MODULE_6__.ElementToolbar, {
                        editorTabsWidth: editorTabsWidth,
                        elementType: elementType,
                        id: id
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/tabs/editor-tabs.tsx",
                        lineNumber: 161,
                        columnNumber: 15
                    }, void 0)
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/tabs/editor-tabs.tsx",
                    lineNumber: 160,
                    columnNumber: 13
                }, void 0)
            }
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/tabs/editor-tabs.tsx",
            lineNumber: 150,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/tabs/editor-tabs.tsx",
        lineNumber: 146,
        columnNumber: 5
    }, undefined);
};
_s(EditorTabs, "whbT6LlywVRwlo0FLvds1Gdn4+I=", false, function() {
    return [
        _Pimcore_modules_element_editor_tabs_editor_tabs_styles__WEBPACK_IMPORTED_MODULE_2__.useStyle,
        _Pimcore_modules_element_editor_tabs_hooks_use_detach_tab__WEBPACK_IMPORTED_MODULE_5__.useDetachTab,
        _Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_8__.useElementContext,
        _Pimcore_modules_element_hooks_use_element_draft__WEBPACK_IMPORTED_MODULE_10__.useElementDraft,
        _Pimcore_modules_element_hooks_use_element_draft__WEBPACK_IMPORTED_MODULE_10__.useElementDraft,
        _Pimcore_utils_hooks_use_element_resize__WEBPACK_IMPORTED_MODULE_9__["default"]
    ];
});
_c = EditorTabs;
var _c;
$RefreshReg$(_c, "EditorTabs");

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
"./js/src/core/modules/element/editor/tabs/hooks/use-detach-tab.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useDetachTab: () => (useDetachTab)
});
/* ESM import */var _Pimcore_modules_widget_manager_hooks_use_widget_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/widget-manager/hooks/use-widget-manager.ts");
/* ESM import */var i18next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/i18next/dist/esm/i18next.js");
/* ESM import */var _Pimcore_modules_element_editor_shared_tab_manager_hooks_use_tab_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/element/editor/shared-tab-manager/hooks/use-tab-manager.ts");
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


const useDetachTab = ()=>{
    const { openBottomWidget } = (0,_Pimcore_modules_widget_manager_hooks_use_widget_manager__WEBPACK_IMPORTED_MODULE_0__.useWidgetManager)();
    const tabManager = (0,_Pimcore_modules_element_editor_shared_tab_manager_hooks_use_tab_manager__WEBPACK_IMPORTED_MODULE_2__.useTabManager)();
    const detachWidget = (param)=>{
        let { tabKey, config = {} } = param;
        const tab = tabManager.getTab(tabKey);
        if (tab === undefined) {
            return;
        }
        openBottomWidget({
            name: i18next__WEBPACK_IMPORTED_MODULE_1__["default"].t(String(tab.label)),
            id: `${tabKey}-detached`,
            component: 'detachable-tab',
            config: {
                ...config,
                icon: tab.icon.props,
                tabKey
            }
        });
    };
    return {
        detachWidget
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
"./js/src/core/modules/widget-manager/hooks/use-is-active-main-widget.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useIsAcitveMainWidget: () => (useIsAcitveMainWidget)
});
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _widget_manager_slice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/widget-manager/widget-manager-slice.ts");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_modules_widget_manager_widget_widget_container__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/widget-manager/widget/widget-container.tsx");
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



const useIsAcitveMainWidget = ()=>{
    const activeMainWidget = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.useAppSelector)(_widget_manager_slice__WEBPACK_IMPORTED_MODULE_1__.selectMainWidgetContext);
    const currentWidget = (0,react__WEBPACK_IMPORTED_MODULE_2__.useContext)(_Pimcore_modules_widget_manager_widget_widget_container__WEBPACK_IMPORTED_MODULE_3__.WidgetContext);
    return activeMainWidget !== null && activeMainWidget.nodeId === currentWidget.nodeId;
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
"./js/src/core/types/components/types.ts": (function (module, __webpack_exports__, __webpack_require__) {
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
"./js/src/core/utils/hooks/use-element-resize.ts": (function (module, __webpack_exports__, __webpack_require__) {
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
const useElementResize = (ref)=>{
    const [width, setWidth] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
    // Get initial width before the render phase
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)(()=>{
        var _ref_current;
        setWidth(((_ref_current = ref.current) === null || _ref_current === void 0 ? void 0 : _ref_current.getBoundingClientRect().width) ?? 0);
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (ref.current == null) return;
        const resizeObserver = new ResizeObserver((param)=>{
            let [entry] = param;
            const newWidth = entry.contentRect.width;
            setWidth((prevWidth)=>{
                if (newWidth !== 0 && prevWidth !== newWidth) {
                    return newWidth;
                }
                return prevWidth;
            });
        });
        resizeObserver.observe(ref.current);
        return ()=>{
            resizeObserver.disconnect();
        };
    }, [
        ref
    ]);
    return width;
};
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useElementResize);

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
"./js/src/sdk/modules/data-object/index.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DataObjectEditorWidget: () => (/* reexport safe */ _Pimcore_modules_data_object_editor_widget__WEBPACK_IMPORTED_MODULE_19__.DataObjectEditorWidget),
  FolderTabManager: () => (/* reexport safe */ _Pimcore_modules_data_object_editor_types_folder_tab_manager_folder_tab_manager__WEBPACK_IMPORTED_MODULE_14__.FolderTabManager),
  IS_AUTO_SAVE_DRAFT_CREATED: () => (/* reexport safe */ _Pimcore_modules_data_object_draft_hooks_use_draft_data__WEBPACK_IMPORTED_MODULE_4__.IS_AUTO_SAVE_DRAFT_CREATED),
  LanguageSelection: () => (/* reexport safe */ _Pimcore_modules_data_object_editor_toolbar_language_selection_language_selection__WEBPACK_IMPORTED_MODULE_16__.LanguageSelection),
  LanguageSelectionContext: () => (/* reexport safe */ _Pimcore_modules_data_object_editor_toolbar_language_selection_provider_language_selection_provider__WEBPACK_IMPORTED_MODULE_17__.LanguageSelectionContext),
  LanguageSelectionProvider: () => (/* reexport safe */ _Pimcore_modules_data_object_editor_toolbar_language_selection_provider_language_selection_provider__WEBPACK_IMPORTED_MODULE_17__.LanguageSelectionProvider),
  ObjectTabManager: () => (/* reexport safe */ _Pimcore_modules_data_object_editor_types_object_tab_manager_object_tab_manager__WEBPACK_IMPORTED_MODULE_15__.ObjectTabManager),
  SaveTaskType: () => (/* reexport safe */ _Pimcore_modules_data_object_actions_save_use_save__WEBPACK_IMPORTED_MODULE_2__.SaveTaskType),
  addPropertyToDataObject: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_3__.addPropertyToDataObject),
  addScheduleToDataObject: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_3__.addScheduleToDataObject),
  dataObjectReceived: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_3__.dataObjectReceived),
  dataObjectsAdapter: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_3__.dataObjectsAdapter),
  elementTypes: () => (/* reexport safe */ _Pimcore_types_enums_element_element_type__WEBPACK_IMPORTED_MODULE_13__.elementTypes),
  markObjectDataAsModified: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_3__.markObjectDataAsModified),
  publishDraft: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_3__.publishDraft),
  removeDataObject: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_3__.removeDataObject),
  removePropertyFromDataObject: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_3__.removePropertyFromDataObject),
  removeScheduleFromDataObject: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_3__.removeScheduleFromDataObject),
  resetChanges: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_3__.resetChanges),
  resetDataObject: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_3__.resetDataObject),
  resetSchedulesChangesForDataObject: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_3__.resetSchedulesChangesForDataObject),
  selectDataObjectById: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_3__.selectDataObjectById),
  setActiveTabForDataObject: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_3__.setActiveTabForDataObject),
  setDraftData: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_3__.setDraftData),
  setModifiedCells: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_3__.setModifiedCells),
  setPropertiesForDataObject: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_3__.setPropertiesForDataObject),
  setSchedulesForDataObject: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_3__.setSchedulesForDataObject),
  slice: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_3__.slice),
  unpublishDraft: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_3__.unpublishDraft),
  updateKey: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_3__.updateKey),
  updatePropertyForDataObject: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_3__.updatePropertyForDataObject),
  updateScheduleForDataObject: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_3__.updateScheduleForDataObject),
  useAddObject: () => (/* reexport safe */ _Pimcore_modules_data_object_actions_add_object_use_add_object__WEBPACK_IMPORTED_MODULE_0__.useAddObject),
  useCustomLayouts: () => (/* reexport safe */ _Pimcore_modules_data_object_hooks_use_custom_layouts__WEBPACK_IMPORTED_MODULE_6__.useCustomLayouts),
  useDataObject: () => (/* reexport safe */ _Pimcore_modules_data_object_hooks_use_data_object__WEBPACK_IMPORTED_MODULE_7__.useDataObject),
  useDataObjectDraft: () => (/* reexport safe */ _Pimcore_modules_data_object_hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_8__.useDataObjectDraft),
  useDataObjectHelper: () => (/* reexport safe */ _Pimcore_modules_data_object_hooks_use_data_object_helper__WEBPACK_IMPORTED_MODULE_9__.useDataObjectHelper),
  useDeleteDraft: () => (/* reexport safe */ _Pimcore_modules_data_object_actions_delete_draft_use_delete_draft__WEBPACK_IMPORTED_MODULE_1__.useDeleteDraft),
  useDraftDataDraft: () => (/* reexport safe */ _Pimcore_modules_data_object_draft_hooks_use_draft_data__WEBPACK_IMPORTED_MODULE_4__.useDraftDataDraft),
  useDraftDataReducers: () => (/* reexport safe */ _Pimcore_modules_data_object_draft_hooks_use_draft_data__WEBPACK_IMPORTED_MODULE_4__.useDraftDataReducers),
  useGlobalDataObjectContext: () => (/* reexport safe */ _Pimcore_modules_data_object_hooks_use_global_data_object_context__WEBPACK_IMPORTED_MODULE_10__.useGlobalDataObjectContext),
  useLanguageSelection: () => (/* reexport safe */ _Pimcore_modules_data_object_editor_toolbar_language_selection_provider_use_language_selection__WEBPACK_IMPORTED_MODULE_18__.useLanguageSelection),
  useModifiedObjectDataDraft: () => (/* reexport safe */ _Pimcore_modules_data_object_draft_hooks_use_modified_object_data__WEBPACK_IMPORTED_MODULE_5__.useModifiedObjectDataDraft),
  useModifiedObjectDataReducers: () => (/* reexport safe */ _Pimcore_modules_data_object_draft_hooks_use_modified_object_data__WEBPACK_IMPORTED_MODULE_5__.useModifiedObjectDataReducers),
  useQuantityValueUnits: () => (/* reexport safe */ _Pimcore_modules_data_object_hooks_use_quantity_value_units__WEBPACK_IMPORTED_MODULE_11__.useQuantityValueUnits),
  useSave: () => (/* reexport safe */ _Pimcore_modules_data_object_actions_save_use_save__WEBPACK_IMPORTED_MODULE_2__.useSave)
});
/* ESM import */var _Pimcore_modules_data_object_actions_add_object_use_add_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/data-object/actions/add-object/use-add-object.tsx");
/* ESM import */var _Pimcore_modules_data_object_actions_delete_draft_use_delete_draft__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/data-object/actions/delete-draft/use-delete-draft.tsx");
/* ESM import */var _Pimcore_modules_data_object_actions_save_use_save__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/data-object/actions/save/use-save.tsx");
/* ESM import */var _Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/data-object/data-object-draft-slice.tsx");
/* ESM import */var _Pimcore_modules_data_object_draft_hooks_use_draft_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/data-object/draft/hooks/use-draft-data.ts");
/* ESM import */var _Pimcore_modules_data_object_draft_hooks_use_modified_object_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/data-object/draft/hooks/use-modified-object-data.ts");
/* ESM import */var _Pimcore_modules_data_object_hooks_use_custom_layouts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/data-object/hooks/use-custom-layouts.ts");
/* ESM import */var _Pimcore_modules_data_object_hooks_use_data_object__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/data-object/hooks/use-data-object.ts");
/* ESM import */var _Pimcore_modules_data_object_hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/data-object/hooks/use-data-object-draft.ts");
/* ESM import */var _Pimcore_modules_data_object_hooks_use_data_object_helper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/data-object/hooks/use-data-object-helper.ts");
/* ESM import */var _Pimcore_modules_data_object_hooks_use_global_data_object_context__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/data-object/hooks/use-global-data-object-context.ts");
/* ESM import */var _Pimcore_modules_data_object_hooks_use_quantity_value_units__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/data-object/hooks/use-quantity-value-units.ts");
/* ESM import */var _Pimcore_types_components_types__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/types/components/types.ts");
/* ESM import */var _Pimcore_types_enums_element_element_type__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/types/enums/element/element-type.tsx");
/* ESM import */var _Pimcore_modules_data_object_editor_types_folder_tab_manager_folder_tab_manager__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/modules/data-object/editor/types/folder/tab-manager/folder-tab-manager.ts");
/* ESM import */var _Pimcore_modules_data_object_editor_types_object_tab_manager_object_tab_manager__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./js/src/core/modules/data-object/editor/types/object/tab-manager/object-tab-manager.ts");
/* ESM import */var _Pimcore_modules_data_object_editor_toolbar_language_selection_language_selection__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("./js/src/core/modules/data-object/editor/toolbar/language-selection/language-selection.tsx");
/* ESM import */var _Pimcore_modules_data_object_editor_toolbar_language_selection_provider_language_selection_provider__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("./js/src/core/modules/data-object/editor/toolbar/language-selection/provider/language-selection-provider.tsx");
/* ESM import */var _Pimcore_modules_data_object_editor_toolbar_language_selection_provider_use_language_selection__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("./js/src/core/modules/data-object/editor/toolbar/language-selection/provider/use-language-selection.tsx");
/* ESM import */var _Pimcore_modules_data_object_editor_widget__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__("./js/src/core/modules/data-object/editor/widget.tsx");
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

}]);
//# sourceMappingURL=__federation_expose_modules__data_object.js.map