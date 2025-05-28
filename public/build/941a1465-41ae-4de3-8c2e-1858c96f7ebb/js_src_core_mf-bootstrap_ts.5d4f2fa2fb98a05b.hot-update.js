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
"./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-classification-store.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DynamicTypeObjectDataClassificationStore: () => (DynamicTypeObjectDataClassificationStore)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _dynamic_type_object_data_abstract__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-abstract.tsx");
/* ESM import */var _components_classification_store_classification_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/classification-store.tsx");
/* ESM import */var _Pimcore_modules_data_object_editor_shared_tab_manager_tabs_versions_details_functions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/data-object/editor/shared-tab-manager/tabs/versions/details-functions.ts");
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





class DynamicTypeObjectDataClassificationStore extends _dynamic_type_object_data_abstract__WEBPACK_IMPORTED_MODULE_3__.DynamicTypeObjectDataAbstract {
    getObjectDataComponent(props) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_classification_store_classification_store__WEBPACK_IMPORTED_MODULE_4__.ClassificationStore, {
            ...props
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-classification-store.tsx",
            lineNumber: 28,
            columnNumber: 12
        }, this);
    }
    getObjectDataFormItemProps(props) {
        return {
            ...super.getObjectDataFormItemProps(props),
            label: null
        };
    }
    async processVersionFieldData(props) {
        const { item, fieldBreadcrumbTitle, fieldValueByName, versionId, versionCount } = props;
        const getFieldData = (param)=>{
            let { fieldData, fieldValue, fieldBreadcrumbTitle } = param;
            return {
                fieldBreadcrumbTitle,
                versionId,
                versionCount,
                fieldData,
                fieldValue
            };
        };
        const processClassificationStoreData = (param)=>{
            let { data, updatedFieldBreadcrumbTitle = fieldBreadcrumbTitle, groupId } = param;
            return data.flatMap((dataItem, index)=>{
                if (!(0,lodash__WEBPACK_IMPORTED_MODULE_2__.isEmpty)(dataItem.keys)) {
                    const breadcrumbField = dataItem.title ?? dataItem.name;
                    const breadcrumbTitle = (0,_Pimcore_modules_data_object_editor_shared_tab_manager_tabs_versions_details_functions__WEBPACK_IMPORTED_MODULE_5__.getBreadcrumbTitle)(updatedFieldBreadcrumbTitle, breadcrumbField);
                    return processClassificationStoreData({
                        data: dataItem.keys,
                        updatedFieldBreadcrumbTitle: breadcrumbTitle,
                        groupId: dataItem.id
                    });
                }
                if (!(0,lodash__WEBPACK_IMPORTED_MODULE_2__.isEmpty)(dataItem.definition)) {
                    if ((0,lodash__WEBPACK_IMPORTED_MODULE_2__.isUndefined)(groupId)) return [];
                    const fieldValue = (0,lodash__WEBPACK_IMPORTED_MODULE_2__.get)(fieldValueByName, groupId);
                    if ((0,lodash__WEBPACK_IMPORTED_MODULE_2__.isEmpty)(fieldValue)) {
                        return getFieldData({
                            fieldData: {
                                ...dataItem.definition
                            },
                            fieldValue,
                            fieldBreadcrumbTitle: updatedFieldBreadcrumbTitle
                        });
                    }
                    return Object.entries(fieldValue).map((param)=>{
                        let [key, value] = param;
                        return getFieldData({
                            fieldData: {
                                ...dataItem.definition,
                                locale: key
                            },
                            fieldValue: value[dataItem.id],
                            fieldBreadcrumbTitle: updatedFieldBreadcrumbTitle
                        });
                    });
                }
                return [];
            });
        };
        async function handleClassificationStoreData() {
            try {
                if ((0,lodash__WEBPACK_IMPORTED_MODULE_2__.isEmpty)(item)) return [];
                const breadcrumbField = item.title ?? item.name;
                const breadcrumbTitle = (0,_Pimcore_modules_data_object_editor_shared_tab_manager_tabs_versions_details_functions__WEBPACK_IMPORTED_MODULE_5__.getBreadcrumbTitle)(fieldBreadcrumbTitle, breadcrumbField);
                return processClassificationStoreData({
                    data: item.activeGroupDefinitions,
                    updatedFieldBreadcrumbTitle: breadcrumbTitle
                });
            } catch (e) {
                console.error('Error while handling Classification Store data:', e);
                return [];
            }
        }
        return await handleClassificationStoreData();
    }
    constructor(...args){
        super(...args), this.id = 'classificationstore';
    }
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

});
//# sourceMappingURL=js_src_core_mf-bootstrap_ts.5d4f2fa2fb98a05b.hot-update.js.map