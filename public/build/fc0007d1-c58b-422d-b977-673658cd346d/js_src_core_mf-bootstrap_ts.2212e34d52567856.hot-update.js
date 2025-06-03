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
"./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/classification-store.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ClassificationStore: () => (ClassificationStore)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/form/form.tsx");
/* ESM import */var _classification_store_content__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/classification-store-content.tsx");
/* ESM import */var _Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/element/hooks/use-element-context.ts");
/* ESM import */var _Pimcore_modules_data_object_hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/data-object/hooks/use-data-object-draft.ts");
/* ESM import */var _Pimcore_modules_data_object_editor_types_object_tab_manager_tabs_edit_providers_inheritance_state_provider_use_inheritance_state__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/inheritance-state-provider/use-inheritance-state.tsx");
/* ESM import */var _utils_group_value__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/utils/group-value.ts");
/* ESM import */var _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_classification_store_components_classification_store_modal_classification_store_modal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/components/classification-store-modal/classification-store-modal.tsx");
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









const getOriginalValue = (value, name)=>{
    const originalValue = (0,lodash__WEBPACK_IMPORTED_MODULE_2__.get)(value, name, {});
    return (0,lodash__WEBPACK_IMPORTED_MODULE_2__.isPlainObject)(originalValue) ? originalValue : {};
};
const ClassificationStore = (props)=>{
    _s();
    const { id } = (0,_Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_5__.useElementContext)();
    const { dataObject } = (0,_Pimcore_modules_data_object_hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_6__.useDataObjectDraft)(id);
    const objectData = (dataObject === null || dataObject === void 0 ? void 0 : dataObject.objectData) ?? {};
    const originalValue = getOriginalValue(objectData, props.name);
    const valueRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(props.value);
    const inheritanceState = (0,_Pimcore_modules_data_object_editor_types_object_tab_manager_tabs_edit_providers_inheritance_state_provider_use_inheritance_state__WEBPACK_IMPORTED_MODULE_7__.useInheritanceState)();
    const changedFieldsRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(new Set());
    const [isOpenModal, setIsOpenModal] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const fieldNameToString = (field)=>{
        return Array.isArray(field) ? field.join('.') : field;
    };
    const onFieldChange = (field, value)=>{
        var _inheritanceState_getInheritanceState;
        const fieldName = fieldNameToString(field);
        changedFieldsRef.current.add(fieldName);
        if ((inheritanceState === null || inheritanceState === void 0 ? void 0 : (_inheritanceState_getInheritanceState = inheritanceState.getInheritanceState(field)) === null || _inheritanceState_getInheritanceState === void 0 ? void 0 : _inheritanceState_getInheritanceState.inherited) === true) {
            inheritanceState === null || inheritanceState === void 0 ? void 0 : inheritanceState.breakInheritance(field);
        }
    };
    const getAdditionalComponentProps = (name)=>{
        var _inheritanceState_getInheritanceState;
        return {
            inherited: (inheritanceState === null || inheritanceState === void 0 ? void 0 : (_inheritanceState_getInheritanceState = inheritanceState.getInheritanceState(name)) === null || _inheritanceState_getInheritanceState === void 0 ? void 0 : _inheritanceState_getInheritanceState.inherited) === true
        };
    };
    const isInherited = (name)=>{
        var _inheritanceState_getInheritanceState;
        const fullFieldNamePath = [
            ...props.name,
            ...name.split('.')
        ];
        return !changedFieldsRef.current.has(fullFieldNamePath.join('.')) && (inheritanceState === null || inheritanceState === void 0 ? void 0 : (_inheritanceState_getInheritanceState = inheritanceState.getInheritanceState(fullFieldNamePath)) === null || _inheritanceState_getInheritanceState === void 0 ? void 0 : _inheritanceState_getInheritanceState.inherited) === true;
    };
    const onChange = (changedValue)=>{
        const filteredValue = (0,_utils_group_value__WEBPACK_IMPORTED_MODULE_8__.filterInheritedFields)(changedValue, isInherited);
        /* const allGroupNames = union([...keys(originalValue), ...keys(valueRef.current)])

    forEach(allGroupNames, key => {
      if (isUndefined(filteredValue[key])) {
        deletedGroupsRef.current.add(key)
      } else {
        deletedGroupsRef.current.delete(key)
      }
    })

    forEach(Array.from(deletedGroupsRef.current.keys()), key => {
      filteredValue[key] = { action: DELETED }
    }) */ const newValue = (0,lodash__WEBPACK_IMPORTED_MODULE_2__.isEmpty)(filteredValue) ? [] : filteredValue;
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_2__.isEqual)(newValue, valueRef.current)) {
            props.onChange(newValue);
            valueRef.current = newValue;
        }
    };
    const mergedValue = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>(0,_utils_group_value__WEBPACK_IMPORTED_MODULE_8__.getMergedValue)(valueRef.current, originalValue, props.value, isInherited), [
        valueRef.current,
        originalValue
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        valueRef.current = props.value;
    }, [
        props.value
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_3__.Form.KeyedList, {
                getAdditionalComponentProps: getAdditionalComponentProps,
                onChange: onChange,
                onFieldChange: onFieldChange,
                value: mergedValue,
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_classification_store_content__WEBPACK_IMPORTED_MODULE_4__.ClassificationStoreContent, {
                    openAddModal: ()=>{
                        setIsOpenModal(true);
                    },
                    ...props
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/classification-store.tsx",
                    lineNumber: 112,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/classification-store.tsx",
                lineNumber: 106,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_classification_store_components_classification_store_modal_classification_store_modal__WEBPACK_IMPORTED_MODULE_9__.ClassificationStoreModal, {
                close: ()=>{
                    setIsOpenModal(false);
                },
                isOpen: isOpenModal
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/classification-store.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true);
};
_s(ClassificationStore, "f/QvKk+LIbChCVLNy1e+g5CqFZk=", false, function() {
    return [
        _Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_5__.useElementContext,
        _Pimcore_modules_data_object_hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_6__.useDataObjectDraft,
        _Pimcore_modules_data_object_editor_types_object_tab_manager_tabs_edit_providers_inheritance_state_provider_use_inheritance_state__WEBPACK_IMPORTED_MODULE_7__.useInheritanceState
    ];
});
_c = ClassificationStore;
var _c;
$RefreshReg$(_c, "ClassificationStore");

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
//# sourceMappingURL=js_src_core_mf-bootstrap_ts.2212e34d52567856.hot-update.js.map