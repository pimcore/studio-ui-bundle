"use strict";
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["js_src_core_components_dropdown-button_dropdown-button_tsx-js_src_core_components_modal_form--8d7a34"], {
"./js/src/core/components/dropdown-button/dropdown-button.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
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
        dropdownButton: css`
      &.ant-dropdown-trigger.ant-dropdown-open .pimcore-icon{
        transform: scaleY(-1);
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
"./js/src/core/components/dropdown-button/dropdown-button.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DropdownButton: () => (DropdownButton)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _icon_text_button_icon_text_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/icon-text-button/icon-text-button.tsx");
/* ESM import */var _dropdown_button_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/dropdown-button/dropdown-button.styles.ts");
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
    let { icon, ...props } = param;
    _s();
    const { styles } = (0,_dropdown_button_styles__WEBPACK_IMPORTED_MODULE_3__.useStyle)();
    props.className = props.className !== null ? `${props.className} ${styles.dropdownButton}` : `${styles.dropdownButton}`;
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_icon_text_button_icon_text_button__WEBPACK_IMPORTED_MODULE_2__.IconTextButton, {
        icon: {
            value: 'chevron-down',
            ...icon
        },
        iconPlacement: "right",
        type: "link",
        ...props
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/dropdown-button/dropdown-button.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, undefined);
};
_s(DropdownButton, "4AcVho8W1Y+Yfard/v4lDs8ZRDQ=", false, function() {
    return [
        _dropdown_button_styles__WEBPACK_IMPORTED_MODULE_3__.useStyle
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
"./js/src/core/components/modal/form-modal/hooks/use-form-modal.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useFormModal: () => (useFormModal),
  withConfirm: () => (withConfirm),
  withInput: () => (withInput),
  withTextarea: () => (withTextarea),
  withUpload: () => (withUpload)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_utils_uuid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/utils/uuid.ts");
/* ESM import */var i18next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/i18next/dist/esm/i18next.js");
/* ESM import */var _Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/form/form.tsx");
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





let form = null;
function useFormModal() {
    _s();
    const { modal } = antd__WEBPACK_IMPORTED_MODULE_2__.App.useApp();
    const [tmpForm] = _Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_5__.Form.useForm();
    form = tmpForm;
    return react__WEBPACK_IMPORTED_MODULE_1___default().useMemo(()=>({
            input: (props)=>{
                const modalResult = modal.confirm(withInput(props, (value)=>{
                    modalResult.destroy();
                }, (loading)=>{
                    modalResult.update({
                        okButtonProps: {
                            loading
                        }
                    });
                }));
                // avoid that errors are logged in the console
                modalResult.then(()=>{}, ()=>{});
                return modalResult;
            },
            textarea: (props)=>{
                const modalResult = modal.confirm(withTextarea(props));
                // avoid that errors are logged in the console
                modalResult.then(()=>{}, ()=>{});
                return modalResult;
            },
            confirm: (props)=>modal.confirm(withConfirm(props)),
            upload: (props)=>modal.confirm(withUpload(props))
        }), []);
}
_s(useFormModal, "17ETW8MzqZx+LJfydN4sehu5D3Y=", false, function() {
    return [
        antd__WEBPACK_IMPORTED_MODULE_2__.App.useApp,
        _Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_5__.Form.useForm
    ];
});
function withInput(props, onKeyBoardSubmit, onSetModalLoading) {
    const inputRef = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createRef();
    const uuid = (0,_Pimcore_utils_uuid__WEBPACK_IMPORTED_MODULE_3__.uuid)();
    const fieldName = `input-${uuid}`;
    const { label, rule, initialValue = '', ...modalProps } = props;
    let formattedRule = [];
    if (rule !== undefined) {
        formattedRule = [
            rule
        ];
    }
    const submit = async (fieldName)=>{
        onSetModalLoading === null || onSetModalLoading === void 0 ? void 0 : onSetModalLoading(true);
        return await new Promise((resolve, reject)=>{
            form.validateFields().then(async ()=>{
                var _props_onOk;
                const value = form.getFieldValue(fieldName);
                await ((_props_onOk = props.onOk) === null || _props_onOk === void 0 ? void 0 : _props_onOk.call(props, value));
                onKeyBoardSubmit === null || onKeyBoardSubmit === void 0 ? void 0 : onKeyBoardSubmit(value);
                resolve(value);
            }).catch(()=>{
                reject(new Error('Invalid form'));
            });
        });
    };
    const InputForm = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(function InputForm(props, ref) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_5__.Form, {
            form: props.form,
            initialValues: props.initialValues,
            layout: 'vertical',
            onSubmitCapture: async ()=>{
                await submit(props.fieldName);
            },
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_5__.Form.Item, {
                label: label,
                name: props.fieldName,
                rules: formattedRule,
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Input, {
                    ref: ref
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/modal/form-modal/hooks/use-form-modal.tsx",
                    lineNumber: 126,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/modal/form-modal/hooks/use-form-modal.tsx",
                lineNumber: 121,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/modal/form-modal/hooks/use-form-modal.tsx",
            lineNumber: 115,
            columnNumber: 7
        }, this);
    });
    return {
        ...modalProps,
        type: props.type ?? 'confirm',
        icon: props.icon ?? null,
        onOk: async ()=>{
            await submit(fieldName);
        },
        modalRender: (node)=>{
            if (inputRef.current !== null) {
                inputRef.current.focus();
            }
            return node;
        },
        content: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(InputForm, {
            fieldName: fieldName,
            form: form,
            initialValues: {
                [fieldName]: initialValue
            },
            ref: inputRef
        }, 'input-form', false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/modal/form-modal/hooks/use-form-modal.tsx",
            lineNumber: 145,
            columnNumber: 14
        }, this)
    };
}
function withTextarea(props) {
    const textareaRef = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createRef();
    const uuid = (0,_Pimcore_utils_uuid__WEBPACK_IMPORTED_MODULE_3__.uuid)();
    const fieldName = `textarea-${uuid}`;
    const { label, initialValue = '', ...modalProps } = props;
    const TextareaForm = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(function InputForm(props, ref) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_5__.Form, {
            form: props.form,
            initialValues: props.initialValues,
            layout: 'vertical',
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_5__.Form.Item, {
                label: label,
                name: props.fieldName,
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Input.TextArea, {
                    autoSize: {
                        minRows: 10,
                        maxRows: 20
                    },
                    placeholder: props.placeholder,
                    ref: ref
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/modal/form-modal/hooks/use-form-modal.tsx",
                    lineNumber: 183,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/modal/form-modal/hooks/use-form-modal.tsx",
                lineNumber: 179,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/modal/form-modal/hooks/use-form-modal.tsx",
            lineNumber: 174,
            columnNumber: 7
        }, this);
    });
    return {
        ...modalProps,
        type: props.type ?? 'confirm',
        icon: props.icon ?? null,
        width: 700,
        onOk: async ()=>{
            var _props_onOk;
            const value = form.getFieldValue(fieldName);
            (_props_onOk = props.onOk) === null || _props_onOk === void 0 ? void 0 : _props_onOk.call(props, value);
        },
        modalRender: (node)=>{
            if (textareaRef.current !== null) {
                textareaRef.current.focus();
            }
            return node;
        },
        content: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(TextareaForm, {
            fieldName: fieldName,
            form: form,
            initialValues: {
                [fieldName]: initialValue
            },
            placeholder: props.placeholder,
            ref: textareaRef
        }, 'textarea-form', false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/modal/form-modal/hooks/use-form-modal.tsx",
            lineNumber: 208,
            columnNumber: 14
        }, this)
    };
}
function withConfirm(props) {
    return {
        ...props,
        type: props.type ?? 'confirm',
        okText: props.okText ?? i18next__WEBPACK_IMPORTED_MODULE_4__["default"].t('yes'),
        cancelText: props.cancelText ?? i18next__WEBPACK_IMPORTED_MODULE_4__["default"].t('no')
    };
}
function withUpload(props) {
    const inputRef = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createRef();
    const uuid = (0,_Pimcore_utils_uuid__WEBPACK_IMPORTED_MODULE_3__.uuid)();
    const fieldName = `upload-${uuid}`;
    const { label, rule, accept, ...modalProps } = props;
    let formattedRule = [];
    if (rule !== undefined) {
        formattedRule = [
            rule
        ];
    }
    const UploadForm = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(function InputForm(props, ref) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_5__.Form, {
            form: props.form,
            initialValues: props.initialValues,
            layout: 'vertical',
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_5__.Form.Item, {
                label: label,
                name: props.fieldName,
                rules: formattedRule,
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Input, {
                    accept: accept,
                    ref: ref,
                    type: "file"
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/modal/form-modal/hooks/use-form-modal.tsx",
                    lineNumber: 256,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/modal/form-modal/hooks/use-form-modal.tsx",
                lineNumber: 251,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/modal/form-modal/hooks/use-form-modal.tsx",
            lineNumber: 246,
            columnNumber: 7
        }, this);
    });
    return {
        ...modalProps,
        type: props.type ?? 'confirm',
        icon: props.icon ?? null,
        onOk: async ()=>{
            return await new Promise((resolve, reject)=>{
                form.validateFields().then(()=>{
                    var _props_onOk;
                    const files = inputRef.current.input.files;
                    (_props_onOk = props.onOk) === null || _props_onOk === void 0 ? void 0 : _props_onOk.call(props, files);
                    resolve(files);
                }).catch(()=>{
                    reject(new Error('Invalid form'));
                });
            });
        },
        content: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(UploadForm, {
            fieldName: fieldName,
            form: form,
            initialValues: {},
            ref: inputRef
        }, 'upload-form', false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/modal/form-modal/hooks/use-form-modal.tsx",
            lineNumber: 284,
            columnNumber: 14
        }, this)
    };
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
"./js/src/core/modules/element/actions/refresh-tree/use-refresh-tree.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useRefreshTree: () => (useRefreshTree)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/element/tree/provider/tree-permission-provider/use-tree-permission.ts");
/* ESM import */var _perspectives_enums_tree_permission__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/perspectives/enums/tree-permission.ts");
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _Pimcore_components_element_tree_element_tree_slice__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/element-tree/element-tree-slice.ts");
/* ESM import */var _tree_provider_tree_id_provider_use_tree_id__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/element/tree/provider/tree-id-provider/use-tree-id.ts");
/* ESM import */var ___WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/element/actions/index.ts");
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









const useRefreshTree = (elementType)=>{
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation)();
    const { isTreeActionAllowed } = (0,_tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_4__.useTreePermission)();
    const dispatch = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_6__.useAppDispatch)();
    const { treeId } = (0,_tree_provider_tree_id_provider_use_tree_id__WEBPACK_IMPORTED_MODULE_8__.useTreeId)(true);
    const refreshTree = (parentId)=>{
        dispatch((0,_Pimcore_components_element_tree_element_tree_slice__WEBPACK_IMPORTED_MODULE_7__.refreshNodeChildren)({
            nodeId: String(parentId),
            elementType
        }));
    };
    const refreshTreeContextMenuItem = (node)=>{
        return {
            label: t('element.tree.refresh'),
            key: ___WEBPACK_IMPORTED_MODULE_9__.ContextMenuActionName.refresh,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_1__.Icon, {
                value: 'refresh'
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/actions/refresh-tree/use-refresh-tree.tsx",
                lineNumber: 46,
                columnNumber: 13
            }, undefined),
            hidden: !isTreeActionAllowed(_perspectives_enums_tree_permission__WEBPACK_IMPORTED_MODULE_5__.TreePermission.Refresh),
            onClick: ()=>{
                refreshTree(parseInt(node.id));
                dispatch((0,_Pimcore_components_element_tree_element_tree_slice__WEBPACK_IMPORTED_MODULE_7__.setNodeExpanded)({
                    treeId,
                    nodeId: String(node.id),
                    expanded: true
                }));
            }
        };
    };
    return {
        refreshTree,
        refreshTreeContextMenuItem
    };
};
_s(useRefreshTree, "6i0vbK8IsiG5q5K68aENMDZ1chg=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation,
        _tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_4__.useTreePermission,
        _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_6__.useAppDispatch,
        _tree_provider_tree_id_provider_use_tree_id__WEBPACK_IMPORTED_MODULE_8__.useTreeId
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
"./js/src/core/modules/element/element-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useElementDeleteMutation: () => (useElementDeleteMutation),
  useElementFolderCreateMutation: () => (useElementFolderCreateMutation),
  useElementGetContextPermissionsQuery: () => (useElementGetContextPermissionsQuery),
  useElementGetDeleteInfoQuery: () => (useElementGetDeleteInfoQuery),
  useElementGetIdByPathQuery: () => (useElementGetIdByPathQuery),
  useElementGetSubtypeQuery: () => (useElementGetSubtypeQuery),
  useElementGetTreeLocationQuery: () => (useElementGetTreeLocationQuery),
  useElementResolveBySearchTermQuery: () => (useElementResolveBySearchTermQuery)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Elements"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            elementDelete: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/elements/${queryArg.elementType}/delete/${queryArg.id}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Elements"
                ]
            }),
            elementGetDeleteInfo: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/elements/${queryArg.elementType}/delete-info/${queryArg.id}`
                    }),
                providesTags: [
                    "Elements"
                ]
            }),
            elementFolderCreate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/elements/${queryArg.elementType}/folder/${queryArg.parentId}`,
                        method: "POST",
                        body: queryArg.folderData
                    }),
                invalidatesTags: [
                    "Elements"
                ]
            }),
            elementGetContextPermissions: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/elements/${queryArg.elementType}/context-permissions/`
                    }),
                providesTags: [
                    "Elements"
                ]
            }),
            elementGetTreeLocation: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/elements/${queryArg.elementType}/location/${queryArg.id}/${queryArg.perspectiveId}`
                    }),
                providesTags: [
                    "Elements"
                ]
            }),
            elementGetIdByPath: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/elements/${queryArg.elementType}/path`,
                        params: {
                            elementPath: queryArg.elementPath
                        }
                    }),
                providesTags: [
                    "Elements"
                ]
            }),
            elementGetSubtype: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/elements/${queryArg.elementType}/subtype/${queryArg.id}`
                    }),
                providesTags: [
                    "Elements"
                ]
            }),
            elementResolveBySearchTerm: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/elements/${queryArg.elementType}/resolve`,
                        params: {
                            searchTerm: queryArg.searchTerm
                        }
                    }),
                providesTags: [
                    "Elements"
                ]
            })
        }),
    overrideExisting: false
});

const { useElementDeleteMutation, useElementGetDeleteInfoQuery, useElementFolderCreateMutation, useElementGetContextPermissionsQuery, useElementGetTreeLocationQuery, useElementGetIdByPathQuery, useElementGetSubtypeQuery, useElementResolveBySearchTermQuery } = injectedRtkApi;

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
"./js/src/core/modules/element/hooks/use-element-context.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useElementContext: () => (useElementContext),
  useOptionalElementContext: () => (useOptionalElementContext)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _Pimcore_modules_asset_asset_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/asset/asset-provider.tsx");
/* ESM import */var _Pimcore_modules_data_object_data_object_provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/data-object/data-object-provider.tsx");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
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



const useElementContext = ()=>{
    const elementContext = useOptionalElementContext();
    if (elementContext !== null) {
        return elementContext;
    }
    const errorMessage = 'No element context found';
    (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_3__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_3__.GeneralError(errorMessage));
    throw new Error(errorMessage);
};
const useOptionalElementContext = ()=>{
    const { id: assetId } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_Pimcore_modules_asset_asset_provider__WEBPACK_IMPORTED_MODULE_1__.AssetContext);
    const { id: dataObjectId } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_Pimcore_modules_data_object_data_object_provider__WEBPACK_IMPORTED_MODULE_2__.DataObjectContext);
    if (assetId !== 0) {
        return {
            id: assetId,
            elementType: 'asset'
        };
    } else if (dataObjectId !== 0) {
        return {
            id: dataObjectId,
            elementType: 'data-object'
        };
    } else {
        return null;
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
"./js/src/core/modules/element/tree/provider/tree-id-provider/tree-id-provider.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TreeIdContext: () => (TreeIdContext),
  TreeIdProvider: () => (TreeIdProvider)
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

const TreeIdContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(undefined);
const TreeIdProvider = (param)=>{
    let { children, treeId } = param;
    _s();
    const contextValue = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>({
            treeId
        }), [
        treeId
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(TreeIdContext.Provider, {
        value: contextValue,
        children: children
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/tree/provider/tree-id-provider/tree-id-provider.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, undefined);
};
_s(TreeIdProvider, "JLzJfL3KLoV7bWTi3UEfulSv7uk=");
_c = TreeIdProvider;
var _c;
$RefreshReg$(_c, "TreeIdProvider");

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
"./js/src/core/modules/element/tree/provider/tree-id-provider/use-tree-id.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useTreeId: () => (useTreeId)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _tree_id_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/element/tree/provider/tree-id-provider/tree-id-provider.tsx");
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

const useTreeId = function() {
    let allowEmptyContext = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
    const context = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_tree_id_provider__WEBPACK_IMPORTED_MODULE_1__.TreeIdContext);
    if (context === undefined) {
        if (allowEmptyContext) {
            return {
                treeId: ''
            };
        }
        throw new Error('useTreeId must be used within a TreeIdProvider');
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
"./js/src/core/modules/execution-engine/jobs/factory-helper.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  getUniqueId: () => (getUniqueId)
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
*/ let index = 0;
function getUniqueId() {
    return index++;
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
"./js/src/core/modules/execution-engine/topics.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  defaultTopics: () => (defaultTopics),
  topics: () => (topics)
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
*/ const topics = {
    'patch-finished': 'patch-finished',
    'zip-download-ready': 'zip-download-ready',
    'csv-download-ready': 'csv-download-ready',
    'xlsx-download-ready': 'xlsx-download-ready',
    'handler-progress': 'handler-progress',
    'job-finished-with-errors': 'job-finished-with-errors',
    'job-failed': 'job-failed',
    'asset-upload-finished': 'asset-upload-finished',
    'zip-upload-finished': 'zip-upload-finished',
    'deletion-finished': 'deletion-finished',
    'cloning-finished': 'cloning-finished',
    'tag-assignment-finished': 'tag-assignment-finished',
    'tag-replacement-finished': 'tag-replacement-finished'
};
const defaultTopics = [
    topics['handler-progress'],
    topics['job-finished-with-errors'],
    topics['job-failed']
];

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
//# sourceMappingURL=js_src_core_components_dropdown-button_dropdown-button_tsx-js_src_core_components_modal_form--8d7a34.js.map