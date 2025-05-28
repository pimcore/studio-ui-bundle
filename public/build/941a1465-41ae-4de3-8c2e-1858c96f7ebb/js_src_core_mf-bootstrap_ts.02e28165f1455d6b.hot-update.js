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
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/lodash/lodash.js");
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
const getFieldKey = (item)=>{
    var _item_fieldData, _item_fieldData1;
    const path = item.fieldBreadcrumbTitle ?? '';
    const name = ((_item_fieldData = item.fieldData) === null || _item_fieldData === void 0 ? void 0 : _item_fieldData.name) ?? '';
    const locale = ((_item_fieldData1 = item.fieldData) === null || _item_fieldData1 === void 0 ? void 0 : _item_fieldData1.locale) ?? 'default';
    return `${path}::${name}::${locale}`;
};
const versionsDataToTableData = (param)=>{
    let { data } = param;
    const resultList = [];
    const mainVersionData = data[0] ?? [];
    const mainVersionMap = new Map(mainVersionData.map((item)=>[
            getFieldKey(item),
            item
        ]));
    const compareVersionData = data[1] ?? [];
    const compareVersionMap = new Map(compareVersionData.map((item)=>[
            getFieldKey(item),
            item
        ]));
    const isComparisonMode = !(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(compareVersionData);
    const allKeys = new Set([
        ...mainVersionMap.keys(),
        ...compareMap.keys()
    ]);
    for (const key of allKeys){
        const mainVersionItem = mainVersionMap.get(key);
        const compareVersionItem = compareMap.get(key);
        const isEmptyField = isFieldValueEmpty(mainVersionItem === null || mainVersionItem === void 0 ? void 0 : mainVersionItem.fieldValue) && isFieldValueEmpty(compareVersionItem === null || compareVersionItem === void 0 ? void 0 : compareVersionItem.fieldValue);
        if (isEmptyField) {
            continue;
        }
        const hasCompareVersion = !(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(compareVersionItem);
        const field = {
            Field: {
                fieldBreadcrumbTitle: mainVersionItem === null || mainVersionItem === void 0 ? void 0 : mainVersionItem.fieldBreadcrumbTitle,
                ...mainVersionItem === null || mainVersionItem === void 0 ? void 0 : mainVersionItem.fieldData
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

});
//# sourceMappingURL=js_src_core_mf-bootstrap_ts.02e28165f1455d6b.hot-update.js.map