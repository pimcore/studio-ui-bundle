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
"./js/src/core/modules/element/listing/decorators/general-filters/view-layer/components/sidebar/tabs/filters/field-filters/field-filters-container.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  FieldFiltersContainer: () => (FieldFiltersContainer)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_modules_element_dynamic_types_resolver_hooks_use_dynamic_type_resolver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/resolver/hooks/use-dynamic-type-resolver.ts");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/app/depency-injection/index.ts");
/* ESM import */var _Pimcore_app_config_services_service_ids__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/app/config/services/service-ids.ts");
/* ESM import */var _Pimcore_components_icon_text_button_icon_text_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/icon-text-button/icon-text-button.tsx");
/* ESM import */var _Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/dropdown/dropdown.tsx");
/* ESM import */var _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_available_columns_use_available_columns__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/use-available-columns.tsx");
/* ESM import */var _Pimcore_components_field_filters_field_filters__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/components/field-filters/field-filters.tsx");
/* ESM import */var _provider_filter_provider_use_filter__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/general-filters/view-layer/components/sidebar/tabs/filters/provider/filter-provider/use-filter.tsx");
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











const FILTER_FIELD_KEY_IGNORE_LIST = [
    'size'
];
const FILTER_TYPE_OVERRIDE_WHITELIST = [
    'dataobject.adapter',
    'dataobject.objectbrick'
];
const FieldFiltersContainer = ()=>{
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation)();
    const { availableColumns } = (0,_Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_available_columns_use_available_columns__WEBPACK_IMPORTED_MODULE_9__.useAvailableColumns)();
    const { hasType } = (0,_Pimcore_modules_element_dynamic_types_resolver_hooks_use_dynamic_type_resolver__WEBPACK_IMPORTED_MODULE_2__.useDynamicTypeResolver)();
    const { fieldFilters, setFieldFilters } = (0,_provider_filter_provider_use_filter__WEBPACK_IMPORTED_MODULE_11__.useFilter)();
    const objectDataRegistry = (0,_Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_5__.useInjection)(_Pimcore_app_config_services_service_ids__WEBPACK_IMPORTED_MODULE_6__.serviceIds["DynamicTypes/FieldFilterRegistry"]);
    const initialFilters = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>fieldFilters.map((filter)=>{
            const currentColumn = availableColumns.find((column)=>column.key === filter.key);
            return {
                id: filter.key,
                data: filter.filterValue,
                type: filter.type,
                filterType: filter === null || filter === void 0 ? void 0 : filter.filterType,
                frontendType: currentColumn === null || currentColumn === void 0 ? void 0 : currentColumn.frontendType,
                config: currentColumn === null || currentColumn === void 0 ? void 0 : currentColumn.config
            };
        }), [
        fieldFilters,
        availableColumns
    ]);
    const [filters, setFilters] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(initialFilters);
    const onFilterChange = (data)=>{
        setFilters(data);
        setFieldFilters(data.map((filter)=>({
                key: filter.id,
                filterType: filter === null || filter === void 0 ? void 0 : filter.filterType,
                filterValue: filter.data,
                type: filter.type
            })));
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setFilters(initialFilters);
    }, [
        initialFilters
    ]);
    const handleColumnClick = (column)=>{
        console.log('----->>>>> column: ', column);
        const objectDataType = objectDataRegistry.getDynamicType(column.frontendType);
        const shouldOverrideFilterType = FILTER_TYPE_OVERRIDE_WHITELIST.includes(column.type);
        setFilters((prevFilters)=>[
                ...prevFilters,
                {
                    data: undefined,
                    id: column.key,
                    type: column.type,
                    frontendType: column.frontendType,
                    config: column.config,
                    ...shouldOverrideFilterType && {
                        filterType: objectDataType.getFieldFilterType()
                    }
                }
            ]);
    };
    const availableFilterColumns = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>availableColumns.filter((column)=>{
            const hasDynamicType = hasType({
                target: 'FIELD_FILTER',
                dynamicTypeIds: [
                    column.frontendType
                ]
            });
            const isIgnoredField = FILTER_FIELD_KEY_IGNORE_LIST.includes(column.key) || column.filterable !== true;
            return hasDynamicType && !isIgnoredField && !filters.some((filter)=>filter.id === column.key);
        }), [
        availableColumns,
        filters
    ]);
    const getFilteredDropDownMenuItems = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>()=>{
            const groupedItems = [];
            availableFilterColumns.forEach((column)=>{
                const group = column.group;
                if (groupedItems[group] === undefined) {
                    groupedItems[group] = [];
                }
                let translationKey = `${column.key}`;
                if ('fieldDefinition' in column.config) {
                    const fieldDefinition = column.config.fieldDefinition;
                    translationKey = (fieldDefinition === null || fieldDefinition === void 0 ? void 0 : fieldDefinition.title) ?? column.key;
                }
                groupedItems[group].push({
                    key: column.key,
                    label: t(translationKey),
                    onClick: ()=>{
                        handleColumnClick(column);
                    }
                });
            });
            return Object.keys(groupedItems).map((group)=>({
                    key: group,
                    label: t(group),
                    children: groupedItems[group]
                }));
        }, [
        availableFilterColumns
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.Space, {
        className: "w-full",
        direction: "vertical",
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_field_filters_field_filters__WEBPACK_IMPORTED_MODULE_10__.FieldFilters, {
                data: filters,
                onChange: onFilterChange
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/listing/decorators/general-filters/view-layer/components/sidebar/tabs/filters/field-filters/field-filters-container.tsx",
                lineNumber: 126,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_8__.Dropdown, {
                menu: {
                    items: getFilteredDropDownMenuItems()
                },
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_text_button_icon_text_button__WEBPACK_IMPORTED_MODULE_7__.IconTextButton, {
                    icon: {
                        value: 'new'
                    },
                    type: "link",
                    children: t('listing.add-column')
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/listing/decorators/general-filters/view-layer/components/sidebar/tabs/filters/field-filters/field-filters-container.tsx",
                    lineNumber: 132,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/listing/decorators/general-filters/view-layer/components/sidebar/tabs/filters/field-filters/field-filters-container.tsx",
                lineNumber: 131,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/listing/decorators/general-filters/view-layer/components/sidebar/tabs/filters/field-filters/field-filters-container.tsx",
        lineNumber: 122,
        columnNumber: 5
    }, undefined);
};
_s(FieldFiltersContainer, "2LEwqP1Pju4VXmb9QfV5D0eUOdY=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation,
        _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_available_columns_use_available_columns__WEBPACK_IMPORTED_MODULE_9__.useAvailableColumns,
        _Pimcore_modules_element_dynamic_types_resolver_hooks_use_dynamic_type_resolver__WEBPACK_IMPORTED_MODULE_2__.useDynamicTypeResolver,
        _provider_filter_provider_use_filter__WEBPACK_IMPORTED_MODULE_11__.useFilter,
        _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_5__.useInjection
    ];
});
_c = FieldFiltersContainer;
var _c;
$RefreshReg$(_c, "FieldFiltersContainer");

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
//# sourceMappingURL=js_src_core_mf-bootstrap_ts.b20f155f29bdee70.hot-update.js.map