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
"./js/src/core/modules/element/listing/decorators/general-filters/data-layer/with-general-filters-query-arg.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  withGeneralFiltersQueryArg: () => (withGeneralFiltersQueryArg)
});
/* ESM import */var _context_layer_provider_search_term_filter_use_search_term_filter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/general-filters/context-layer/provider/search-term-filter/use-search-term-filter.tsx");
/* ESM import */var _context_layer_provider_search_term_filter_search_term_filter_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/general-filters/context-layer/provider/search-term-filter/search-term-filter-provider.tsx");
/* ESM import */var _context_layer_provider_direct_children_filter_use_direct_children_filter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/general-filters/context-layer/provider/direct-children-filter/use-direct-children-filter.tsx");
/* ESM import */var _context_layer_provider_pql_filter_pql_filter_provider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/general-filters/context-layer/provider/pql-filter/pql-filter-provider.tsx");
/* ESM import */var _context_layer_provider_pql_filter_use_pql_filter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/general-filters/context-layer/provider/pql-filter/use-pql-filter.tsx");
/* ESM import */var _context_layer_provider_field_filters_use_field_filters__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/general-filters/context-layer/provider/field-filters/use-field-filters.tsx");
/* ESM import */var _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_available_columns_use_available_columns__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/use-available-columns.tsx");
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






const withGeneralFiltersQueryArg = (useBaseHook)=>{
    const useDataQueryHelperGeneralFiltersExtension = ()=>{
        const { getArgs: baseGetArgs, ...baseMethods } = useBaseHook();
        const { getDataQueryFilterArg: getSearchTermFilterArg } = (0,_context_layer_provider_search_term_filter_use_search_term_filter__WEBPACK_IMPORTED_MODULE_0__.useSearchTermFilter)();
        const { getDataQueryFilterArg: getPqlFilterArg } = (0,_context_layer_provider_pql_filter_use_pql_filter__WEBPACK_IMPORTED_MODULE_4__.usePqlFilter)();
        const { onlyDirectChildren } = (0,_context_layer_provider_direct_children_filter_use_direct_children_filter__WEBPACK_IMPORTED_MODULE_2__.useDirectChildrenFilter)();
        const { fieldFilters } = (0,_context_layer_provider_field_filters_use_field_filters__WEBPACK_IMPORTED_MODULE_5__.useFieldFilters)();
        const { availableColumns } = (0,_Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_available_columns_use_available_columns__WEBPACK_IMPORTED_MODULE_6__.useAvailableColumns)();
        const getUpdatedColumnFilters = (columnFilters)=>{
            // Override 'type' with 'filterType' for specific cases (e.g., 'dataobject.adapter')
            return columnFilters.map((param)=>{
                let { filterType, ...rest } = param;
                return {
                    ...rest,
                    ...filterType !== undefined && {
                        type: filterType
                    }
                };
            });
        };
        const getArgs = ()=>{
            const baseArgs = baseGetArgs();
            const searchTermFilter = getSearchTermFilterArg();
            const pqlFilter = getPqlFilterArg();
            const columnsToFilterOut = availableColumns.map((column)=>column.key);
            columnsToFilterOut.push(_context_layer_provider_pql_filter_pql_filter_provider__WEBPACK_IMPORTED_MODULE_3__.pqlFilterType, _context_layer_provider_search_term_filter_search_term_filter_provider__WEBPACK_IMPORTED_MODULE_1__.searchTermFilterType);
            const currentColumnFilters = baseArgs.body.filters.columnFilters ?? [];
            const newColumnFilters = [
                ...currentColumnFilters.filter((currentFilter)=>!columnsToFilterOut.includes(currentFilter.type))
            ];
            if (searchTermFilter !== undefined) {
                newColumnFilters.push(searchTermFilter);
            }
            if (pqlFilter !== undefined) {
                newColumnFilters.push(pqlFilter);
            }
            if (fieldFilters.length > 0) {
                newColumnFilters.push(...fieldFilters);
            }
            return {
                ...baseArgs,
                body: {
                    ...baseArgs.body,
                    filters: {
                        ...baseArgs.body.filters,
                        includeDescendants: !onlyDirectChildren,
                        columnFilters: getUpdatedColumnFilters(newColumnFilters)
                    }
                }
            };
        };
        return {
            ...baseMethods,
            getArgs
        };
    };
    return useDataQueryHelperGeneralFiltersExtension;
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
//# sourceMappingURL=js_src_core_mf-bootstrap_ts.2476c775bf14c4bb.hot-update.js.map