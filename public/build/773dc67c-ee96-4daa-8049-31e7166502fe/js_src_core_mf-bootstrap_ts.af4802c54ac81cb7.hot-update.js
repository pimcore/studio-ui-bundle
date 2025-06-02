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
"./js/src/core/modules/data-object/editor/shared-tab-manager/tabs/versions/details-functions.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  getBreadcrumbTitle: () => (getBreadcrumbTitle),
  getFormattedDataStructure: () => (getFormattedDataStructure),
  versionsDataToTableData: () => (versionsDataToTableData)
});
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _Pimcore_utils_date_time__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/utils/date-time.ts");
/* ESM import */var _Pimcore_utils_type_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/utils/type-utils.ts");
/* ESM import */var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/data-object/editor/shared-tab-manager/tabs/versions/types.ts");
/* ESM import */var _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_constants_typesList__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/constants/typesList.ts");
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




const isFieldValueEmpty = (fieldValue)=>{
    if ((0,lodash__WEBPACK_IMPORTED_MODULE_0__.isObject)(fieldValue)) {
        return (0,lodash__WEBPACK_IMPORTED_MODULE_0__.every)(fieldValue, _Pimcore_utils_type_utils__WEBPACK_IMPORTED_MODULE_2__.isEmptyValue);
    }
    return (0,_Pimcore_utils_type_utils__WEBPACK_IMPORTED_MODULE_2__.isEmptyValue)(fieldValue);
};
const getBreadcrumbTitle = (value1, value2)=>{
    return [
        value1,
        value2
    ].filter(Boolean).join('/');
};
const fieldTypesRequiringChildren = [
    _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_constants_typesList__WEBPACK_IMPORTED_MODULE_4__.DynamicTypesList.BLOCK
];
const getFormattedDataStructure = async (param)=>{
    let { objectId, layout, versionData, versionId, versionCount, objectDataRegistry, layoutsList, setLayoutsList } = param;
    const formattedSystemData = {
        fullPath: versionData.fullPath,
        creationDate: (0,_Pimcore_utils_date_time__WEBPACK_IMPORTED_MODULE_1__.formatDateTime)({
            timestamp: versionData.creationDate ?? null,
            dateStyle: 'short',
            timeStyle: 'medium'
        }),
        modificationDate: (0,_Pimcore_utils_date_time__WEBPACK_IMPORTED_MODULE_1__.formatDateTime)({
            timestamp: versionData.modificationDate ?? null,
            dateStyle: 'short',
            timeStyle: 'medium'
        })
    };
    const processLayoutData = async (param)=>{
        let { data, objectValuesData = versionData === null || versionData === void 0 ? void 0 : versionData.objectData, fieldBreadcrumbTitle = '' } = param;
        const promises = data.map(async (item)=>{
            if (item.datatype === _types__WEBPACK_IMPORTED_MODULE_3__.DATATYPE_LIST.LAYOUT) {
                const breadcrumbTitle = getBreadcrumbTitle(fieldBreadcrumbTitle, item.title);
                return await processLayoutData({
                    data: item.children,
                    fieldBreadcrumbTitle: breadcrumbTitle,
                    objectValuesData
                });
            }
            if (item.datatype === _types__WEBPACK_IMPORTED_MODULE_3__.DATATYPE_LIST.DATA) {
                const fieldName = item.name;
                const fieldValueByName = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.get)(objectValuesData, fieldName);
                const currentFieldType = item.fieldtype;
                if (!objectDataRegistry.hasDynamicType(currentFieldType)) {
                    return [];
                }
                const objectDataType = objectDataRegistry.getDynamicType(currentFieldType);
                const processedDataList = await objectDataType.processVersionFieldData({
                    objectId,
                    item,
                    fieldBreadcrumbTitle,
                    fieldValueByName,
                    versionId,
                    versionCount,
                    layoutsList,
                    setLayoutsList
                });
                const processedPromises = processedDataList === null || processedDataList === void 0 ? void 0 : processedDataList.map(async (processedDataItem)=>{
                    var _processedDataItem_fieldData, _processedDataItem_fieldData1;
                    objectValuesData = {};
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    if (!(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(processedDataItem === null || processedDataItem === void 0 ? void 0 : (_processedDataItem_fieldData = processedDataItem.fieldData) === null || _processedDataItem_fieldData === void 0 ? void 0 : _processedDataItem_fieldData.children) && !fieldTypesRequiringChildren.includes(processedDataItem === null || processedDataItem === void 0 ? void 0 : (_processedDataItem_fieldData1 = processedDataItem.fieldData) === null || _processedDataItem_fieldData1 === void 0 ? void 0 : _processedDataItem_fieldData1.fieldtype)) {
                        var _processedDataItem_fieldData2, _processedDataItem_fieldData3;
                        const breadcrumbTitle = getBreadcrumbTitle(fieldBreadcrumbTitle, (processedDataItem === null || processedDataItem === void 0 ? void 0 : (_processedDataItem_fieldData2 = processedDataItem.fieldData) === null || _processedDataItem_fieldData2 === void 0 ? void 0 : _processedDataItem_fieldData2.title) ?? '');
                        return await processLayoutData({
                            data: [
                                processedDataItem === null || processedDataItem === void 0 ? void 0 : processedDataItem.fieldData
                            ],
                            objectValuesData: {
                                ...objectValuesData,
                                [processedDataItem === null || processedDataItem === void 0 ? void 0 : (_processedDataItem_fieldData3 = processedDataItem.fieldData) === null || _processedDataItem_fieldData3 === void 0 ? void 0 : _processedDataItem_fieldData3.name]: processedDataItem === null || processedDataItem === void 0 ? void 0 : processedDataItem.fieldValue
                            },
                            fieldBreadcrumbTitle: breadcrumbTitle
                        });
                    }
                    return [
                        processedDataItem
                    ];
                });
                return (await Promise.all(processedPromises)).flatMap((item)=>item);
            }
            return [];
        });
        return (await Promise.all(promises)).flatMap((item)=>item);
    };
    const getGeneralSystemData = ()=>{
        const result = [];
        Object.entries(formattedSystemData).forEach((param)=>{
            let [key, value] = param;
            result.push({
                fieldBreadcrumbTitle: 'systemData',
                fieldData: {
                    title: key,
                    name: key,
                    fieldtype: 'input'
                },
                fieldValue: value,
                versionId,
                versionCount
            });
        });
        return result;
    };
    const layoutData = await processLayoutData({
        data: layout
    });
    const generalSystemData = getGeneralSystemData();
    return [
        ...generalSystemData,
        ...layoutData
    ];
};
const getUniqFieldKey = (item)=>{
    var _item_fieldData, _item_fieldData1;
    const path = item.fieldBreadcrumbTitle ?? '';
    const name = ((_item_fieldData = item.fieldData) === null || _item_fieldData === void 0 ? void 0 : _item_fieldData.name) ?? '';
    const locale = ((_item_fieldData1 = item.fieldData) === null || _item_fieldData1 === void 0 ? void 0 : _item_fieldData1.locale) ?? 'default';
    return `${path}-${name}-${locale}`;
};
const versionsDataToTableData = (param)=>{
    let { data } = param;
    const resultList = [];
    const mainVersionData = data[0] ?? [];
    const mainVersionMap = new Map(mainVersionData.map((item)=>[
            getUniqFieldKey(item),
            item
        ]));
    const compareVersionData = data[1] ?? [];
    const compareVersionMap = new Map(compareVersionData.map((item)=>[
            getUniqFieldKey(item),
            item
        ]));
    const isComparisonMode = !(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(compareVersionData);
    const allKeys = new Set([
        ...mainVersionMap.keys(),
        ...compareVersionMap.keys()
    ]);
    for (const key of allKeys){
        const mainVersionItem = mainVersionMap.get(key);
        const compareVersionItem = compareVersionMap.get(key);
        const isEmptyField = isFieldValueEmpty(mainVersionItem === null || mainVersionItem === void 0 ? void 0 : mainVersionItem.fieldValue) && isFieldValueEmpty(compareVersionItem === null || compareVersionItem === void 0 ? void 0 : compareVersionItem.fieldValue);
        if (isEmptyField) {
            continue;
        }
        const hasCompareVersion = !(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(compareVersionItem);
        const field = {
            Field: {
                fieldBreadcrumbTitle: (mainVersionItem === null || mainVersionItem === void 0 ? void 0 : mainVersionItem.fieldBreadcrumbTitle) ?? (compareVersionItem === null || compareVersionItem === void 0 ? void 0 : compareVersionItem.fieldBreadcrumbTitle),
                ...(mainVersionItem === null || mainVersionItem === void 0 ? void 0 : mainVersionItem.fieldData) ?? (compareVersionItem === null || compareVersionItem === void 0 ? void 0 : compareVersionItem.fieldData)
            }
        };
        // Set the field for the main version count
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(mainVersionItem)) {
            field[`Version ${mainVersionItem.versionCount}`] = mainVersionItem.fieldValue;
        } else if (hasCompareVersion) {
            field[`Version ${compareVersionItem.versionCount}`] = null;
        }
        // Set the field for the compare version count
        if (hasCompareVersion) {
            field[`Version ${compareVersionItem.versionCount}`] = compareVersionItem.fieldValue ?? null;
        }
        if (isComparisonMode && !(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isEqual)(mainVersionItem === null || mainVersionItem === void 0 ? void 0 : mainVersionItem.fieldValue, compareVersionItem === null || compareVersionItem === void 0 ? void 0 : compareVersionItem.fieldValue)) {
            var _mainVersionItem_fieldData;
            field.isModifiedValue = true;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            if ((mainVersionItem === null || mainVersionItem === void 0 ? void 0 : (_mainVersionItem_fieldData = mainVersionItem.fieldData) === null || _mainVersionItem_fieldData === void 0 ? void 0 : _mainVersionItem_fieldData.fieldtype) === _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_constants_typesList__WEBPACK_IMPORTED_MODULE_4__.DynamicTypesList.FIELD_COLLECTIONS) {
                var _mainVersionItem_fieldValue, _compareVersionItem_fieldValue;
                const mainVersionLength = mainVersionItem === null || mainVersionItem === void 0 ? void 0 : (_mainVersionItem_fieldValue = mainVersionItem.fieldValue) === null || _mainVersionItem_fieldValue === void 0 ? void 0 : _mainVersionItem_fieldValue.length;
                const compareVersionLength = compareVersionItem === null || compareVersionItem === void 0 ? void 0 : (_compareVersionItem_fieldValue = compareVersionItem.fieldValue) === null || _compareVersionItem_fieldValue === void 0 ? void 0 : _compareVersionItem_fieldValue.length;
                const mainList = compareVersionLength > mainVersionLength ? compareVersionItem : mainVersionItem;
                const compareList = mainVersionLength < compareVersionLength ? mainVersionItem : compareVersionItem;
                const differences = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.differenceWith)(mainList === null || mainList === void 0 ? void 0 : mainList.fieldValue, compareList === null || compareList === void 0 ? void 0 : compareList.fieldValue, (item1, item2)=>{
                    return (item1 === null || item1 === void 0 ? void 0 : item1.type) === (item2 === null || item2 === void 0 ? void 0 : item2.type) && (0,lodash__WEBPACK_IMPORTED_MODULE_0__.isEqual)(item1 === null || item1 === void 0 ? void 0 : item1.data, item2 === null || item2 === void 0 ? void 0 : item2.data);
                });
                field.fieldCollectionModifiedList = differences.map((item)=>item.type);
            }
        }
        resultList.push(field);
    }
    return resultList;
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
"./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/input-quantity-value/input-quantity-value.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyles: () => (useStyles)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/antd-style/antd-style");
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd_style__WEBPACK_IMPORTED_MODULE_0__);
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
const useStyles = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param)=>{
    let { css, token } = param;
    return {
        container: css`
      &.versionFieldItem {
        .ant-select-disabled,
        .ant-input-disabled {
          width: 100%;
          max-width: 100% !important;
        }

        .ant-select-disabled .ant-select-selection-item,
        .ant-input-disabled {
          color: ${token.colorText} !important;
        }

        .ant-select.ant-select-disabled .ant-select-selector,
        .ant-input-disabled {
          border-color: transparent !important;
        }
      }

      &.versionFieldItemHighlight {
        .ant-select-disabled .ant-select-selector,
        .ant-input-disabled {
          background-color: ${token.Colors.Brand.Warning.colorWarningBg} !important;
        }

        .ant-select.ant-select-disabled .ant-select-selector,
        .ant-input-disabled {
          border-color: ${token.colorBorder} !important;
        }
      }
    `,
        select: css`
       min-width: 100px;
    `,
        input: css`
      min-width: 80px;
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
"./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/quantity-value/quantity-value.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyles: () => (useStyles)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/antd-style/antd-style");
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd_style__WEBPACK_IMPORTED_MODULE_0__);
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
const useStyles = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param)=>{
    let { css, token } = param;
    return {
        container: css`
      &.versionFieldItem {
        .ant-select-disabled,
        .ant-input-number-disabled {
          width: 100%;
          max-width: 100% !important;
        }

        .ant-select-disabled .ant-select-selection-item,
        .ant-input-number-disabled {
          color: ${token.colorText} !important;
        }

        .ant-select.ant-select-disabled .ant-select-selector,
        .ant-input-number-disabled {
          border-color: transparent !important;
        }
      }

      &.versionFieldItemHighlight {
        .ant-select-disabled .ant-select-selector,
        .ant-input-number-disabled {
          background-color: ${token.Colors.Brand.Warning.colorWarningBg} !important;
        }

        .ant-select.ant-select-disabled .ant-select-selector,
        .ant-input-number-disabled {
          border-color: ${token.colorBorder} !important;
        }
      }
    `,
        select: css`
       min-width: 100px;
    `,
        input: css`
      min-width: 80px;
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
"./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/constants/typesList.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DynamicTypesList: () => (DynamicTypesList)
});
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ var DynamicTypesList = /*#__PURE__*/ function(DynamicTypesList) {
    DynamicTypesList["LOCALIZED_FIELDS"] = "localizedfields";
    DynamicTypesList["OBJECT_BRICKS"] = "objectbricks";
    DynamicTypesList["FIELD_COLLECTIONS"] = "fieldcollections";
    DynamicTypesList["BLOCK"] = "block";
    DynamicTypesList["CLASSIFICATION_STORE"] = "classificationstore";
    return DynamicTypesList;
}({});

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
"./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-classification-store.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DynamicTypeObjectDataClassificationStore: () => (DynamicTypeObjectDataClassificationStore)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
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
            return data.flatMap((dataItem)=>{
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
//# sourceMappingURL=js_src_core_mf-bootstrap_ts.af4802c54ac81cb7.hot-update.js.map