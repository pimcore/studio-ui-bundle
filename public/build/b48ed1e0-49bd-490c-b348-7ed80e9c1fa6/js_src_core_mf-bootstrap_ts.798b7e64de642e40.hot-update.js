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
/* ESM import */var _Pimcore_components_grid_grid__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/components/grid/grid.tsx");
/* ESM import */var _tanstack_react_table__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("webpack/sharing/consume/default/@tanstack/react-table/@tanstack/react-table");
/* ESM import */var _tanstack_react_table__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_tanstack_react_table__WEBPACK_IMPORTED_MODULE_11__);
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
    const { name: classificationStoreName, value } = props;
    const [isOpenModal, setIsOpenModal] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const valueRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(value);
    const changedFieldsRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(new Set());
    const { id } = (0,_Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_5__.useElementContext)();
    const { dataObject } = (0,_Pimcore_modules_data_object_hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_6__.useDataObjectDraft)(id);
    const objectData = (dataObject === null || dataObject === void 0 ? void 0 : dataObject.objectData) ?? {};
    const originalValue = getOriginalValue(objectData, classificationStoreName);
    const inheritanceState = (0,_Pimcore_modules_data_object_editor_types_object_tab_manager_tabs_edit_providers_inheritance_state_provider_use_inheritance_state__WEBPACK_IMPORTED_MODULE_7__.useInheritanceState)();
    const fieldName = (0,lodash__WEBPACK_IMPORTED_MODULE_2__.isArray)(classificationStoreName) ? classificationStoreName[classificationStoreName.length - 1] : classificationStoreName;
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
            ...classificationStoreName,
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
    const mergedValue = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>(0,_utils_group_value__WEBPACK_IMPORTED_MODULE_8__.getMergedValue)(valueRef.current, originalValue, value, isInherited), [
        valueRef.current,
        originalValue
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        valueRef.current = value;
    }, [
        value
    ]);
    const columnHelper = (0,_tanstack_react_table__WEBPACK_IMPORTED_MODULE_11__.createColumnHelper)();
    const columnList = [
        columnHelper.accessor('id', {
            header: 'Id',
            size: 100
        }),
        columnHelper.accessor('name', {
            header: 'Name',
            size: 200
        })
    ];
    const data = [
        {
            id: 1,
            name: 'Test1'
        },
        {
            id: 2,
            name: 'Test2'
        }
    ];
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_grid_grid__WEBPACK_IMPORTED_MODULE_10__.Grid, {
                columns: columnList,
                data: data === null || data === void 0 ? void 0 : data.items
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/classification-store.tsx",
                lineNumber: 125,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
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
                            lineNumber: 136,
                            columnNumber: 11
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/classification-store.tsx",
                        lineNumber: 130,
                        columnNumber: 9
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_classification_store_components_classification_store_modal_classification_store_modal__WEBPACK_IMPORTED_MODULE_9__.ClassificationStoreModal, {
                        close: ()=>{
                            setIsOpenModal(false);
                        },
                        fieldName: fieldName,
                        isOpen: isOpenModal,
                        objectId: id,
                        ...props
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/classification-store.tsx",
                        lineNumber: 141,
                        columnNumber: 9
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/classification-store.tsx",
                lineNumber: 129,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true);
};
_s(ClassificationStore, "dR5pbpkHvaznC5+Qs3xeCP5mig8=", false, function() {
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
//# sourceMappingURL=js_src_core_mf-bootstrap_ts.798b7e64de642e40.hot-update.js.map