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
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["js_src_core_modules_reports_custom-reports-api-slice-enhanced_ts-js_src_core_modules_reports_-c12071"], {
"./js/src/core/modules/reports/constants.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  CHART_TYPE_BAR: () => (CHART_TYPE_BAR),
  CHART_TYPE_LINE: () => (CHART_TYPE_LINE),
  CHART_TYPE_PIE: () => (CHART_TYPE_PIE)
});
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ const CHART_TYPE_PIE = 'pie';
const CHART_TYPE_LINE = 'line';
const CHART_TYPE_BAR = 'bar';

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
"./js/src/core/modules/reports/custom-reports-api-slice-enhanced.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useCustomReportExportCsvMutation: () => (useCustomReportExportCsvMutation),
  useCustomReportsChartQuery: () => (useCustomReportsChartQuery),
  useCustomReportsColumnConfigListQuery: () => (useCustomReportsColumnConfigListQuery),
  useCustomReportsConfigAddMutation: () => (useCustomReportsConfigAddMutation),
  useCustomReportsConfigCloneMutation: () => (useCustomReportsConfigCloneMutation),
  useCustomReportsConfigDeleteMutation: () => (useCustomReportsConfigDeleteMutation),
  useCustomReportsConfigGetTreeQuery: () => (useCustomReportsConfigGetTreeQuery),
  useCustomReportsConfigUpdateMutation: () => (useCustomReportsConfigUpdateMutation),
  useCustomReportsGetTreeQuery: () => (useCustomReportsGetTreeQuery),
  useCustomReportsListDrillDownOptionsQuery: () => (useCustomReportsListDrillDownOptionsQuery),
  useCustomReportsReportQuery: () => (useCustomReportsReportQuery)
});
/* ESM import */var _Pimcore_modules_reports_custom_reports_api_slice_gen__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/reports/custom-reports-api-slice.gen.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 
const api = _Pimcore_modules_reports_custom_reports_api_slice_gen__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    endpoints: {
        customReportExportCsv: {
            invalidatesTags: ()=>[]
        }
    }
});
const { useCustomReportsListDrillDownOptionsQuery, useCustomReportsChartQuery, useCustomReportsConfigAddMutation, useCustomReportsConfigCloneMutation, useCustomReportsColumnConfigListQuery, useCustomReportsConfigUpdateMutation, useCustomReportsConfigDeleteMutation, useCustomReportsReportQuery, useCustomReportsConfigGetTreeQuery, useCustomReportExportCsvMutation, useCustomReportsGetTreeQuery } = api;

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
"./js/src/core/modules/reports/custom-reports-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useCustomReportExportCsvMutation: () => (useCustomReportExportCsvMutation),
  useCustomReportsChartQuery: () => (useCustomReportsChartQuery),
  useCustomReportsColumnConfigListQuery: () => (useCustomReportsColumnConfigListQuery),
  useCustomReportsConfigAddMutation: () => (useCustomReportsConfigAddMutation),
  useCustomReportsConfigCloneMutation: () => (useCustomReportsConfigCloneMutation),
  useCustomReportsConfigDeleteMutation: () => (useCustomReportsConfigDeleteMutation),
  useCustomReportsConfigGetTreeQuery: () => (useCustomReportsConfigGetTreeQuery),
  useCustomReportsConfigUpdateMutation: () => (useCustomReportsConfigUpdateMutation),
  useCustomReportsGetTreeQuery: () => (useCustomReportsGetTreeQuery),
  useCustomReportsListDrillDownOptionsQuery: () => (useCustomReportsListDrillDownOptionsQuery),
  useCustomReportsReportQuery: () => (useCustomReportsReportQuery)
});
/* ESM import */var _sdk_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/sdk/api/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Bundle Custom Reports"
];
const injectedRtkApi = _sdk_api__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            customReportsListDrillDownOptions: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/bundle/custom-reports/drill-down-options`,
                        method: "POST",
                        body: queryArg.body
                    }),
                providesTags: [
                    "Bundle Custom Reports"
                ]
            }),
            customReportsChart: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/bundle/custom-reports/chart`,
                        method: "POST",
                        body: queryArg.body
                    }),
                providesTags: [
                    "Bundle Custom Reports"
                ]
            }),
            customReportsConfigAdd: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/bundle/custom-reports/config/add`,
                        method: "POST",
                        body: queryArg.bundleCustomReportAdd
                    }),
                invalidatesTags: [
                    "Bundle Custom Reports"
                ]
            }),
            customReportsConfigClone: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/bundle/custom-reports/config/clone/${queryArg.name}`,
                        method: "POST",
                        body: queryArg.bundleCustomReportClone
                    }),
                invalidatesTags: [
                    "Bundle Custom Reports"
                ]
            }),
            customReportsColumnConfigList: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/bundle/custom-reports/column-config/${queryArg.name}`,
                        method: "POST",
                        body: queryArg.bundleCustomReportsDataSourceConfig
                    }),
                providesTags: [
                    "Bundle Custom Reports"
                ]
            }),
            customReportsConfigUpdate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/bundle/custom-reports/config/${queryArg.name}`,
                        method: "PUT",
                        body: queryArg.bundleCustomReportUpdate
                    }),
                invalidatesTags: [
                    "Bundle Custom Reports"
                ]
            }),
            customReportsConfigDelete: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/bundle/custom-reports/config/${queryArg.name}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Bundle Custom Reports"
                ]
            }),
            customReportsReport: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/bundle/custom-reports/report/${queryArg.name}`
                    }),
                providesTags: [
                    "Bundle Custom Reports"
                ]
            }),
            customReportsConfigGetTree: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/bundle/custom-reports/tree/config`,
                        params: {
                            page: queryArg.page,
                            pageSize: queryArg.pageSize
                        }
                    }),
                providesTags: [
                    "Bundle Custom Reports"
                ]
            }),
            customReportExportCsv: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/bundle/custom-reports/export/csv`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Bundle Custom Reports"
                ]
            }),
            customReportsGetTree: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/bundle/custom-reports/tree`,
                        params: {
                            page: queryArg.page,
                            pageSize: queryArg.pageSize
                        }
                    }),
                providesTags: [
                    "Bundle Custom Reports"
                ]
            })
        }),
    overrideExisting: false
});

const { useCustomReportsListDrillDownOptionsQuery, useCustomReportsChartQuery, useCustomReportsConfigAddMutation, useCustomReportsConfigCloneMutation, useCustomReportsColumnConfigListQuery, useCustomReportsConfigUpdateMutation, useCustomReportsConfigDeleteMutation, useCustomReportsReportQuery, useCustomReportsConfigGetTreeQuery, useCustomReportExportCsvMutation, useCustomReportsGetTreeQuery } = injectedRtkApi;

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
"./js/src/core/modules/reports/dynamic-types/definitions/custom-report-definition-adapters/dynamic-type-custom-report-definition-registry.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DynamicTypeCustomReportDefinitionRegistry: () => (DynamicTypeCustomReportDefinitionRegistry)
});
/* ESM import */var _swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/tslib/tslib.es6.mjs");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(inversify__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _Pimcore_modules_element_dynamic_types_registry_dynamic_type_registry_abstract__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/registry/dynamic-type-registry-abstract.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 


class DynamicTypeCustomReportDefinitionRegistry extends _Pimcore_modules_element_dynamic_types_registry_dynamic_type_registry_abstract__WEBPACK_IMPORTED_MODULE_1__.DynamicTypeRegistryAbstract {
}
DynamicTypeCustomReportDefinitionRegistry = (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,inversify__WEBPACK_IMPORTED_MODULE_0__.injectable)()
], DynamicTypeCustomReportDefinitionRegistry);

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
"./js/src/core/modules/reports/reports-editor/components/report-configuration/components/column-configuration/constants.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  COLUMN_KEYS: () => (COLUMN_KEYS)
});
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ const COLUMN_KEYS = {
    ROW_DRAG: 'rowDragCol',
    NAME: 'name',
    DISPLAY: 'display',
    EXPORT: 'export',
    ORDER: 'order',
    FILTER_TYPE: 'filterType',
    DISPLAY_TYPE: 'displayType',
    FILTER_DRILLDOWN: 'filterDrilldown',
    WIDTH: 'width',
    LABEL: 'label',
    ACTION: 'action'
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
"./js/src/core/modules/reports/reports-editor/hooks/use-report-form-state.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useReportFormState: () => (useReportFormState)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 

const useReportFormState = ()=>{
    const [initialData, setInitialData] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    const [currentData, setCurrentData] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    const initializeForm = (data)=>{
        setInitialData({
            ...data
        });
        setCurrentData({
            ...data
        });
    };
    const updateFormData = (data)=>{
        setCurrentData((prev)=>!(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isNull)(prev) ? {
                ...prev,
                ...data
            } : null);
    };
    const markFormSaved = ()=>{
        !(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isNull)(currentData) && setInitialData({
            ...currentData
        });
    };
    const isDirty = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>{
        if ((0,lodash__WEBPACK_IMPORTED_MODULE_1__.isNull)(initialData) || (0,lodash__WEBPACK_IMPORTED_MODULE_1__.isNull)(currentData)) return false;
        return !(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isEqual)(initialData, currentData);
    }, [
        initialData,
        currentData
    ]);
    return {
        initialData,
        currentData,
        isDirty,
        initializeForm,
        updateFormData,
        markFormSaved
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
"./js/src/core/modules/reports/reports-view/components/report-chart/hooks/use-show-more.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useShowMore: () => (useShowMore)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 
const INITIAL_VISIBLE_COUNT = 5;
const useShowMore = function() {
    let items = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    const [isExpanded, setIsExpanded] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const visibleItems = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>{
        return isExpanded ? items : items === null || items === void 0 ? void 0 : items.slice(0, INITIAL_VISIBLE_COUNT);
    }, [
        isExpanded,
        items
    ]);
    const toggle = ()=>{
        setIsExpanded(!isExpanded);
    };
    return {
        isExpanded,
        visibleItems,
        toggle,
        initialVisibleCount: INITIAL_VISIBLE_COUNT
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
"./js/src/core/modules/reports/reports-view/components/report-chart/utils/helpers.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  generateColorMap: () => (generateColorMap)
});
/* ESM import */var _ant_design_colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/@ant-design/colors/@ant-design/colors");
/* ESM import */var _ant_design_colors__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ant_design_colors__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 

const PALETTES = [
    _ant_design_colors__WEBPACK_IMPORTED_MODULE_0__.purple,
    _ant_design_colors__WEBPACK_IMPORTED_MODULE_0__.magenta,
    _ant_design_colors__WEBPACK_IMPORTED_MODULE_0__.geekblue,
    _ant_design_colors__WEBPACK_IMPORTED_MODULE_0__.cyan,
    _ant_design_colors__WEBPACK_IMPORTED_MODULE_0__.blue,
    _ant_design_colors__WEBPACK_IMPORTED_MODULE_0__.green,
    _ant_design_colors__WEBPACK_IMPORTED_MODULE_0__.yellow,
    _ant_design_colors__WEBPACK_IMPORTED_MODULE_0__.lime,
    _ant_design_colors__WEBPACK_IMPORTED_MODULE_0__.gold,
    _ant_design_colors__WEBPACK_IMPORTED_MODULE_0__.volcano,
    _ant_design_colors__WEBPACK_IMPORTED_MODULE_0__.orange,
    _ant_design_colors__WEBPACK_IMPORTED_MODULE_0__.red
];
const TONES_ORDER = [
    4,
    6,
    8,
    2,
    5,
    3,
    7,
    1,
    9,
    0
];
const generateRandomColors = (count)=>{
    const colors = [];
    for(let i = 0; i < count; i++){
        const r = 50 + Math.floor(Math.random() * 150);
        const g = 50 + Math.floor(Math.random() * 150);
        const b = 50 + Math.floor(Math.random() * 150);
        const color = '#' + [
            r,
            g,
            b
        ].map((x)=>x.toString(16).padStart(2, '0')).join('');
        colors.push(color);
    }
    return colors;
};
const generateColorMap = (colorCount)=>{
    const result = [];
    const palettes = Object.values(PALETTES);
    for (const i of TONES_ORDER){
        for (const palette of palettes){
            if (!(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isUndefined)(palette[i])) {
                result.push(palette[i]);
            }
        }
    }
    // Fallback: generate extra colors if needed
    const neededExtras = colorCount - result.length;
    if (neededExtras > 0) {
        const fallbackColors = generateRandomColors(neededExtras);
        result.push(...fallbackColors);
    }
    return result;
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
"./js/src/core/modules/reports/dynamic-types/definitions/custom-report-definition-adapters/dynamic-type-custom-report-definition-abstract.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DynamicTypeCustomReportDefinitionAbstract: () => (DynamicTypeCustomReportDefinitionAbstract)
});
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(inversify__WEBPACK_IMPORTED_MODULE_0__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
var _dec, _class;
function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[r] = t, e;
}
function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != typeof i) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 
let DynamicTypeCustomReportDefinitionAbstract = (_dec = (0,inversify__WEBPACK_IMPORTED_MODULE_0__.injectable)(), _dec(_class = class DynamicTypeCustomReportDefinitionAbstract {
    constructor(){
        _defineProperty(this, "id", void 0);
        _defineProperty(this, "label", void 0);
    }
}) || _class);

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
"./js/src/core/modules/reports/reports-view/components/report-chart/components/bar-chart/bar-chart.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyles: () => (useStyles)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/antd-style/antd-style");
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd_style__WEBPACK_IMPORTED_MODULE_0__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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
        tooltipTitle: css`
       color: ${token.colorTextTertiary};
    `,
        tooltipItemValue: css`
      color: ${token.colorText};
    `,
        circle: css`
      width: 8px;
      height: 8px;
      border-radius: 50%;
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
"./js/src/core/modules/reports/reports-view/components/report-chart/components/bar-chart/bar-chart.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  BarChart: () => (BarChart)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _ant_design_plots__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./node_modules/@ant-design/plots/es/components/column/index.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var _Pimcore_modules_reports_reports_view_components_report_chart_utils_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-chart/utils/helpers.ts");
/* ESM import */var _Pimcore_modules_reports_reports_view_components_report_chart_components_legend_item_legend_item__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-chart/components/legend-item/legend-item.tsx");
/* ESM import */var _Pimcore_modules_reports_reports_view_components_report_chart_hooks_use_show_more__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-chart/hooks/use-show-more.ts");
/* ESM import */var _Pimcore_modules_reports_reports_view_components_report_chart_components_show_more_btn_show_more_btn__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-chart/components/show-more-btn/show-more-btn.tsx");
/* ESM import */var _Pimcore_utils_hooks_use_element_resize__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/utils/hooks/use-element-resize.ts");
/* ESM import */var _bar_chart_styles__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-chart/components/bar-chart/bar-chart.styles.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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










const CHART_FIELD_NAME_KEY = 'name';
const CHART_FIELD_VALUE_KEY = 'value';
const CHART_HEIGHT = 250;
const BarChart = (param)=>{
    let { chartData, reportData, chartLabelMap, chartConfig } = param;
    _s();
    const { styles } = (0,_bar_chart_styles__WEBPACK_IMPORTED_MODULE_9__.useStyles)();
    const chartRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const { width: chartWidth } = (0,_Pimcore_utils_hooks_use_element_resize__WEBPACK_IMPORTED_MODULE_8__["default"])(chartRef);
    const [colorList] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)((0,_Pimcore_modules_reports_reports_view_components_report_chart_utils_helpers__WEBPACK_IMPORTED_MODULE_4__.generateColorMap)(chartData.length));
    const xAxis = (reportData === null || reportData === void 0 ? void 0 : reportData.xAxis) ?? '';
    const yAxis = reportData === null || reportData === void 0 ? void 0 : reportData.yAxis;
    const formattedChartData = chartData.flatMap((item)=>{
        return Object.entries(item).filter((param)=>{
            let [key] = param;
            return key !== xAxis && (yAxis === null || yAxis === void 0 ? void 0 : yAxis.includes(key));
        }).map((param)=>{
            let [key, value] = param;
            return {
                [xAxis]: item === null || item === void 0 ? void 0 : item[xAxis],
                [CHART_FIELD_NAME_KEY]: key,
                [CHART_FIELD_VALUE_KEY]: (0,lodash__WEBPACK_IMPORTED_MODULE_2__.toNumber)(value)
            };
        });
    });
    const seriesKeys = [
        ...new Set(formattedChartData.map((item)=>item.name))
    ];
    const { isExpanded, visibleItems, toggle, initialVisibleCount } = (0,_Pimcore_modules_reports_reports_view_components_report_chart_hooks_use_show_more__WEBPACK_IMPORTED_MODULE_6__.useShowMore)(seriesKeys);
    const [activeSeries, setActiveSeries] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(seriesKeys);
    const handleLegendItemClick = (key)=>{
        setActiveSeries((prev)=>prev.includes(key) ? prev.filter((k)=>k !== key) : [
                ...prev,
                key
            ]);
    };
    const colorMap = {
        ...Object.fromEntries(seriesKeys.map((key, index)=>[
                key,
                colorList[index]
            ]))
    };
    const filteredData = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        return formattedChartData.filter((item)=>activeSeries.includes(item.name));
    }, [
        formattedChartData,
        activeSeries
    ]);
    const config = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>({
            data: filteredData,
            xField: xAxis,
            yField: CHART_FIELD_VALUE_KEY,
            seriesField: CHART_FIELD_NAME_KEY,
            colorField: CHART_FIELD_NAME_KEY,
            scale: {
                color: {
                    range: colorList
                }
            },
            height: CHART_HEIGHT,
            point: {
                shapeField: 'circle',
                sizeField: 4
            },
            legend: false,
            interaction: {
                tooltip: {
                    bounding: {
                        x: 20,
                        y: 20,
                        height: CHART_HEIGHT,
                        width: chartWidth
                    },
                    render: (event, param)=>{
                        let { title, items } = param;
                        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_3__.Flex, {
                            gap: "mini",
                            vertical: true,
                            children: [
                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                    className: styles.tooltipTitle,
                                    children: title
                                }, void 0, false, {
                                    fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/bar-chart/bar-chart.tsx",
                                    lineNumber: 93,
                                    columnNumber: 13
                                }, undefined),
                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_3__.Flex, {
                                    vertical: true,
                                    children: items.map((item)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_3__.Flex, {
                                            gap: "small",
                                            justify: "space-between",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_3__.Flex, {
                                                    align: 'center',
                                                    gap: "mini",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                                            className: styles.circle,
                                                            style: {
                                                                backgroundColor: item.color
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/bar-chart/bar-chart.tsx",
                                                            lineNumber: 97,
                                                            columnNumber: 21
                                                        }, undefined),
                                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                                            children: chartLabelMap[item.name] ?? item.name
                                                        }, void 0, false, {
                                                            fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/bar-chart/bar-chart.tsx",
                                                            lineNumber: 100,
                                                            columnNumber: 21
                                                        }, undefined)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/bar-chart/bar-chart.tsx",
                                                    lineNumber: 96,
                                                    columnNumber: 19
                                                }, undefined),
                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                                    className: styles.tooltipItemValue,
                                                    children: item.value
                                                }, void 0, false, {
                                                    fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/bar-chart/bar-chart.tsx",
                                                    lineNumber: 102,
                                                    columnNumber: 19
                                                }, undefined)
                                            ]
                                        }, item.name, true, {
                                            fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/bar-chart/bar-chart.tsx",
                                            lineNumber: 95,
                                            columnNumber: 34
                                        }, undefined))
                                }, void 0, false, {
                                    fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/bar-chart/bar-chart.tsx",
                                    lineNumber: 94,
                                    columnNumber: 13
                                }, undefined)
                            ]
                        }, void 0, true, {
                            fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/bar-chart/bar-chart.tsx",
                            lineNumber: 92,
                            columnNumber: 15
                        }, undefined);
                    }
                }
            }
        }), [
        chartWidth
    ]);
    const mergedConfig = chartConfig === undefined ? config : (0,lodash__WEBPACK_IMPORTED_MODULE_2__.merge)({}, config, chartConfig);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: "m-t-mini",
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                ref: chartRef,
                style: {
                    overflowX: 'hidden'
                },
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_ant_design_plots__WEBPACK_IMPORTED_MODULE_10__["default"], {
                    ...mergedConfig
                }, void 0, false, {
                    fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/bar-chart/bar-chart.tsx",
                    lineNumber: 114,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/bar-chart/bar-chart.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_3__.Flex, {
                gap: "mini",
                justify: "center",
                wrap: "wrap",
                children: visibleItems.map((key, index)=>{
                    const isActive = activeSeries.includes(key);
                    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_reports_reports_view_components_report_chart_components_legend_item_legend_item__WEBPACK_IMPORTED_MODULE_5__.LegendItem, {
                        disabled: !isActive,
                        handleClick: ()=>{
                            handleLegendItemClick(key);
                        },
                        label: chartLabelMap[key] ?? key,
                        markerColor: colorMap[key]
                    }, `${index}-${key}`, false, {
                        fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/bar-chart/bar-chart.tsx",
                        lineNumber: 120,
                        columnNumber: 16
                    }, undefined);
                })
            }, void 0, false, {
                fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/bar-chart/bar-chart.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, undefined),
            (seriesKeys === null || seriesKeys === void 0 ? void 0 : seriesKeys.length) > initialVisibleCount && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_reports_reports_view_components_report_chart_components_show_more_btn_show_more_btn__WEBPACK_IMPORTED_MODULE_7__.ShowMoreBtn, {
                isExpanded: isExpanded,
                toggle: toggle
            }, void 0, false, {
                fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/bar-chart/bar-chart.tsx",
                lineNumber: 126,
                columnNumber: 52
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/bar-chart/bar-chart.tsx",
        lineNumber: 110,
        columnNumber: 10
    }, undefined);
};
_s(BarChart, "euukTnXj3P4K6k30wSeqaYeuB6E=", false, function() {
    return [
        _bar_chart_styles__WEBPACK_IMPORTED_MODULE_9__.useStyles,
        _Pimcore_utils_hooks_use_element_resize__WEBPACK_IMPORTED_MODULE_8__["default"],
        _Pimcore_modules_reports_reports_view_components_report_chart_hooks_use_show_more__WEBPACK_IMPORTED_MODULE_6__.useShowMore
    ];
});
_c = BarChart;
var _c;
$RefreshReg$(_c, "BarChart");

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
"./js/src/core/modules/reports/reports-view/components/report-chart/components/legend-item/legend-item.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyles: () => (useStyles)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/antd-style/antd-style");
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd_style__WEBPACK_IMPORTED_MODULE_0__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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
        legendItem: css`
      padding: 0 ${token.paddingXXS}px;
      border: 1px solid ${token.colorBorderTertiary};
      border-radius: ${token.borderRadiusSM}px;
      cursor: pointer;
    `,
        legendItemDisabled: css`
      background-color: ${token.colorBorderTertiary};
      opacity: 0.5;
    `,
        circle: css`
      margin-right: ${token.marginXXS}px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
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
"./js/src/core/modules/reports/reports-view/components/report-chart/components/legend-item/legend-item.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  LegendItem: () => (LegendItem)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/classnames/classnames");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var _Pimcore_components_text_text__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/text/text.tsx");
/* ESM import */var _legend_item_styles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-chart/components/legend-item/legend-item.styles.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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






const LegendItem = (param)=>{
    let { label, value, disabled, markerColor, handleClick } = param;
    _s();
    const { styles } = (0,_legend_item_styles__WEBPACK_IMPORTED_MODULE_6__.useStyles)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_4__.Flex, {
        align: "center",
        className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(styles.legendItem, {
            [styles.legendItemDisabled]: disabled
        }),
        onClick: handleClick,
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                className: styles.circle,
                style: {
                    background: markerColor
                }
            }, void 0, false, {
                fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/legend-item/legend-item.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_4__.Flex, {
                gap: "small",
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_text_text__WEBPACK_IMPORTED_MODULE_5__.Text, {
                        type: "secondary",
                        children: label
                    }, void 0, false, {
                        fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/legend-item/legend-item.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, undefined),
                    !(0,lodash__WEBPACK_IMPORTED_MODULE_3__.isUndefined)(value) && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_text_text__WEBPACK_IMPORTED_MODULE_5__.Text, {
                        children: value
                    }, void 0, false, {
                        fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/legend-item/legend-item.tsx",
                        lineNumber: 35,
                        columnNumber: 33
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/legend-item/legend-item.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/legend-item/legend-item.tsx",
        lineNumber: 27,
        columnNumber: 10
    }, undefined);
};
_s(LegendItem, "7xVbA/cAv2OTrtL4/ZezCn5HG/A=", false, function() {
    return [
        _legend_item_styles__WEBPACK_IMPORTED_MODULE_6__.useStyles
    ];
});
_c = LegendItem;
var _c;
$RefreshReg$(_c, "LegendItem");

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
"./js/src/core/modules/reports/reports-view/components/report-chart/components/line-chart/line-chart.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyles: () => (useStyles)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/antd-style/antd-style");
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd_style__WEBPACK_IMPORTED_MODULE_0__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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
        tooltipTitle: css`
      color: ${token.colorTextTertiary};
    `,
        tooltipItemValue: css`
      color: ${token.colorText};
    `,
        circle: css`
      width: 8px;
      height: 8px;
      border-radius: 50%;
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
"./js/src/core/modules/reports/reports-view/components/report-chart/components/line-chart/line-chart.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  LineChart: () => (LineChart)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _ant_design_plots__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./node_modules/@ant-design/plots/es/components/line/index.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var _Pimcore_modules_reports_reports_view_components_report_chart_components_legend_item_legend_item__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-chart/components/legend-item/legend-item.tsx");
/* ESM import */var _Pimcore_modules_reports_reports_view_components_report_chart_utils_helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-chart/utils/helpers.ts");
/* ESM import */var _Pimcore_modules_reports_reports_view_components_report_chart_hooks_use_show_more__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-chart/hooks/use-show-more.ts");
/* ESM import */var _Pimcore_modules_reports_reports_view_components_report_chart_components_show_more_btn_show_more_btn__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-chart/components/show-more-btn/show-more-btn.tsx");
/* ESM import */var _Pimcore_utils_hooks_use_element_resize__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/utils/hooks/use-element-resize.ts");
/* ESM import */var _line_chart_styles__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-chart/components/line-chart/line-chart.styles.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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










const CHART_FIELD_NAME_KEY = 'name';
const CHART_FIELD_VALUE_KEY = 'value';
const CHART_HEIGHT = 250;
const LineChart = (param)=>{
    let { chartData, reportData, chartLabelMap, chartConfig } = param;
    _s();
    const { styles } = (0,_line_chart_styles__WEBPACK_IMPORTED_MODULE_9__.useStyles)();
    const chartRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const { width: chartWidth } = (0,_Pimcore_utils_hooks_use_element_resize__WEBPACK_IMPORTED_MODULE_8__["default"])(chartRef);
    const [colorList] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)((0,_Pimcore_modules_reports_reports_view_components_report_chart_utils_helpers__WEBPACK_IMPORTED_MODULE_5__.generateColorMap)(chartData.length));
    const xAxis = (reportData === null || reportData === void 0 ? void 0 : reportData.xAxis) ?? '';
    const yAxis = reportData === null || reportData === void 0 ? void 0 : reportData.yAxis;
    const formattedChartData = chartData.flatMap((item, index)=>{
        return Object.entries(item).filter((param)=>{
            let [key] = param;
            return key !== xAxis && (yAxis === null || yAxis === void 0 ? void 0 : yAxis.includes(key));
        }).map((param)=>{
            let [key, value] = param;
            return {
                [xAxis]: item === null || item === void 0 ? void 0 : item[xAxis],
                [CHART_FIELD_NAME_KEY]: key,
                [CHART_FIELD_VALUE_KEY]: (0,lodash__WEBPACK_IMPORTED_MODULE_2__.toNumber)(value)
            };
        });
    });
    const seriesKeys = [
        ...new Set(formattedChartData.map((item)=>item.name))
    ];
    const { isExpanded, visibleItems, toggle, initialVisibleCount } = (0,_Pimcore_modules_reports_reports_view_components_report_chart_hooks_use_show_more__WEBPACK_IMPORTED_MODULE_6__.useShowMore)(seriesKeys);
    const [activeSeries, setActiveSeries] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(seriesKeys);
    const handleLegendItemClick = (key)=>{
        setActiveSeries((prev)=>prev.includes(key) ? prev.filter((k)=>k !== key) : [
                ...prev,
                key
            ]);
    };
    const colorMap = {
        ...Object.fromEntries(seriesKeys.map((key, index)=>[
                key,
                colorList[index]
            ]))
    };
    const filteredData = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        return formattedChartData.filter((item)=>activeSeries.includes(item.name));
    }, [
        formattedChartData,
        activeSeries
    ]);
    const config = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>({
            data: filteredData,
            xField: xAxis,
            yField: CHART_FIELD_VALUE_KEY,
            colorField: CHART_FIELD_NAME_KEY,
            scale: {
                color: {
                    range: colorList
                }
            },
            height: CHART_HEIGHT,
            point: {
                shapeField: 'circle',
                sizeField: 4
            },
            legend: false,
            interaction: {
                tooltip: {
                    bounding: {
                        x: 20,
                        y: 20,
                        height: CHART_HEIGHT,
                        width: chartWidth
                    },
                    render: (event, param)=>{
                        let { title, items } = param;
                        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_3__.Flex, {
                            gap: "mini",
                            vertical: true,
                            children: [
                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                    className: styles.tooltipTitle,
                                    children: title
                                }, void 0, false, {
                                    fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/line-chart/line-chart.tsx",
                                    lineNumber: 92,
                                    columnNumber: 13
                                }, undefined),
                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_3__.Flex, {
                                    vertical: true,
                                    children: items.map((item)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_3__.Flex, {
                                            gap: "small",
                                            justify: "space-between",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_3__.Flex, {
                                                    align: "center",
                                                    gap: "mini",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                                            className: styles.circle,
                                                            style: {
                                                                backgroundColor: item.color
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/line-chart/line-chart.tsx",
                                                            lineNumber: 96,
                                                            columnNumber: 21
                                                        }, undefined),
                                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                                            children: chartLabelMap[item.name] ?? item.name
                                                        }, void 0, false, {
                                                            fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/line-chart/line-chart.tsx",
                                                            lineNumber: 99,
                                                            columnNumber: 21
                                                        }, undefined)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/line-chart/line-chart.tsx",
                                                    lineNumber: 95,
                                                    columnNumber: 19
                                                }, undefined),
                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                                    className: styles.tooltipItemValue,
                                                    children: item.value
                                                }, void 0, false, {
                                                    fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/line-chart/line-chart.tsx",
                                                    lineNumber: 101,
                                                    columnNumber: 19
                                                }, undefined)
                                            ]
                                        }, item.name, true, {
                                            fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/line-chart/line-chart.tsx",
                                            lineNumber: 94,
                                            columnNumber: 34
                                        }, undefined))
                                }, void 0, false, {
                                    fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/line-chart/line-chart.tsx",
                                    lineNumber: 93,
                                    columnNumber: 13
                                }, undefined)
                            ]
                        }, void 0, true, {
                            fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/line-chart/line-chart.tsx",
                            lineNumber: 91,
                            columnNumber: 15
                        }, undefined);
                    }
                }
            }
        }), [
        chartWidth
    ]);
    const mergedConfig = chartConfig === undefined ? config : (0,lodash__WEBPACK_IMPORTED_MODULE_2__.merge)({}, config, chartConfig);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: "m-t-mini",
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                ref: chartRef,
                style: {
                    overflowX: 'hidden'
                },
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_ant_design_plots__WEBPACK_IMPORTED_MODULE_10__["default"], {
                    ...mergedConfig
                }, void 0, false, {
                    fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/line-chart/line-chart.tsx",
                    lineNumber: 113,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/line-chart/line-chart.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_3__.Flex, {
                gap: "mini",
                justify: "center",
                wrap: "wrap",
                children: visibleItems.map((key, index)=>{
                    const isActive = activeSeries.includes(key);
                    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_reports_reports_view_components_report_chart_components_legend_item_legend_item__WEBPACK_IMPORTED_MODULE_4__.LegendItem, {
                        disabled: !isActive,
                        handleClick: ()=>{
                            handleLegendItemClick(key);
                        },
                        label: chartLabelMap[key] ?? key,
                        markerColor: colorMap[key]
                    }, `${index}-${key}`, false, {
                        fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/line-chart/line-chart.tsx",
                        lineNumber: 119,
                        columnNumber: 16
                    }, undefined);
                })
            }, void 0, false, {
                fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/line-chart/line-chart.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, undefined),
            (seriesKeys === null || seriesKeys === void 0 ? void 0 : seriesKeys.length) > initialVisibleCount && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_reports_reports_view_components_report_chart_components_show_more_btn_show_more_btn__WEBPACK_IMPORTED_MODULE_7__.ShowMoreBtn, {
                isExpanded: isExpanded,
                toggle: toggle
            }, void 0, false, {
                fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/line-chart/line-chart.tsx",
                lineNumber: 125,
                columnNumber: 52
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/line-chart/line-chart.tsx",
        lineNumber: 109,
        columnNumber: 10
    }, undefined);
};
_s(LineChart, "euukTnXj3P4K6k30wSeqaYeuB6E=", false, function() {
    return [
        _line_chart_styles__WEBPACK_IMPORTED_MODULE_9__.useStyles,
        _Pimcore_utils_hooks_use_element_resize__WEBPACK_IMPORTED_MODULE_8__["default"],
        _Pimcore_modules_reports_reports_view_components_report_chart_hooks_use_show_more__WEBPACK_IMPORTED_MODULE_6__.useShowMore
    ];
});
_c = LineChart;
var _c;
$RefreshReg$(_c, "LineChart");

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
"./js/src/core/modules/reports/reports-view/components/report-chart/components/pie-chart/pie-chart.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  PieChart: () => (PieChart)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _ant_design_plots__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./node_modules/@ant-design/plots/es/components/pie/index.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_modules_reports_reports_view_components_report_chart_utils_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-chart/utils/helpers.ts");
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var _Pimcore_modules_reports_reports_view_components_report_chart_components_legend_item_legend_item__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-chart/components/legend-item/legend-item.tsx");
/* ESM import */var _Pimcore_modules_reports_reports_view_components_report_chart_hooks_use_show_more__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-chart/hooks/use-show-more.ts");
/* ESM import */var _Pimcore_modules_reports_reports_view_components_report_chart_components_show_more_btn_show_more_btn__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-chart/components/show-more-btn/show-more-btn.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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








const CHART_FIELD_TYPE_KEY = 'type';
const CHART_FIELD_VALUE_KEY = 'value';
const CHART_FIELD_COLOR_KEY = 'color';
const PieChart = (param)=>{
    let { reportData, chartData, chartConfig } = param;
    _s();
    const pieLabelColumn = (reportData === null || reportData === void 0 ? void 0 : reportData.pieLabelColumn) ?? '';
    const pieColumn = (reportData === null || reportData === void 0 ? void 0 : reportData.pieColumn) ?? '';
    const [colorList] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)((0,_Pimcore_modules_reports_reports_view_components_report_chart_utils_helpers__WEBPACK_IMPORTED_MODULE_3__.generateColorMap)(chartData.length));
    const reportChartData = chartData.map((item, index)=>({
            [CHART_FIELD_TYPE_KEY]: item === null || item === void 0 ? void 0 : item[pieLabelColumn],
            [CHART_FIELD_VALUE_KEY]: item === null || item === void 0 ? void 0 : item[pieColumn],
            [CHART_FIELD_COLOR_KEY]: colorList[index]
        }));
    const { isExpanded, visibleItems, toggle, initialVisibleCount } = (0,_Pimcore_modules_reports_reports_view_components_report_chart_hooks_use_show_more__WEBPACK_IMPORTED_MODULE_6__.useShowMore)(reportChartData);
    const [disabledItems, setDisabledItems] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [chartRef, setChartRef] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [totalCount, setTotalCount] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (chartRef !== null && !(0,lodash__WEBPACK_IMPORTED_MODULE_2__.isNil)(reportChartData)) {
            chartRef.chart.changeData(reportChartData);
            const totalValue = reportChartData.filter((item)=>!disabledItems.includes(item[CHART_FIELD_TYPE_KEY])).reduce((sum, item)=>sum + item[CHART_FIELD_VALUE_KEY], 0);
            setTotalCount(totalValue ?? 0);
        }
    }, [
        reportChartData
    ]);
    const handleLegendItemClick = (itemKey)=>{
        const newDisabledItems = (disabledItems === null || disabledItems === void 0 ? void 0 : disabledItems.includes(itemKey)) ? disabledItems.filter((item)=>item !== itemKey) : [
            ...disabledItems,
            itemKey
        ];
        setDisabledItems(newDisabledItems);
        if (chartRef !== null) {
            const chart = chartRef.chart;
            const filteredData = (0,lodash__WEBPACK_IMPORTED_MODULE_2__.isEmpty)(newDisabledItems) ? reportChartData : reportChartData.filter((item)=>!newDisabledItems.includes(item[CHART_FIELD_TYPE_KEY]));
            setTotalCount(filteredData.reduce((sum, item)=>sum + item[CHART_FIELD_VALUE_KEY], 0));
            chart.changeData(filteredData);
        }
    };
    const config = {
        data: reportChartData,
        colorField: CHART_FIELD_COLOR_KEY,
        angleField: CHART_FIELD_VALUE_KEY,
        autoFit: true,
        height: 230,
        scale: {
            color: {
                type: 'identity'
            }
        },
        innerRadius: 0.6,
        legend: false,
        onReady: (plot)=>{
            setChartRef(plot);
        },
        tooltip: {
            items: [
                (datum)=>({
                        name: `${datum.type}`,
                        value: `${datum.value} (${Math.round(datum.value * 100 / totalCount)}%)`
                    })
            ]
        },
        annotations: [
            {
                type: 'text',
                data: [],
                style: {
                    text: totalCount.toString(),
                    x: '50%',
                    y: '50%',
                    textAlign: 'center',
                    fontSize: 40,
                    fontStyle: 'bold'
                }
            }
        ]
    };
    const mergedConfig = chartConfig === undefined ? config : (0,lodash__WEBPACK_IMPORTED_MODULE_2__.merge)({}, config, chartConfig);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_ant_design_plots__WEBPACK_IMPORTED_MODULE_8__["default"], {
                ...mergedConfig
            }, void 0, false, {
                fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/pie-chart/pie-chart.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_4__.Flex, {
                gap: "mini",
                justify: "center",
                wrap: "wrap",
                children: visibleItems === null || visibleItems === void 0 ? void 0 : visibleItems.map((item, index)=>{
                    const isDisabled = disabledItems.includes(item.type);
                    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_reports_reports_view_components_report_chart_components_legend_item_legend_item__WEBPACK_IMPORTED_MODULE_5__.LegendItem, {
                        disabled: isDisabled,
                        handleClick: ()=>{
                            handleLegendItemClick(item.type);
                        },
                        label: item.type,
                        markerColor: item.color,
                        value: item.value
                    }, `${index}-${item.type}`, false, {
                        fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/pie-chart/pie-chart.tsx",
                        lineNumber: 102,
                        columnNumber: 16
                    }, undefined);
                })
            }, void 0, false, {
                fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/pie-chart/pie-chart.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, undefined),
            (reportChartData === null || reportChartData === void 0 ? void 0 : reportChartData.length) > initialVisibleCount && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_reports_reports_view_components_report_chart_components_show_more_btn_show_more_btn__WEBPACK_IMPORTED_MODULE_7__.ShowMoreBtn, {
                isExpanded: isExpanded,
                toggle: toggle
            }, void 0, false, {
                fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/pie-chart/pie-chart.tsx",
                lineNumber: 108,
                columnNumber: 57
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/pie-chart/pie-chart.tsx",
        lineNumber: 97,
        columnNumber: 10
    }, undefined);
};
_s(PieChart, "rL8gzHSkQyHLrlpLSlXIRHRThGs=", false, function() {
    return [
        _Pimcore_modules_reports_reports_view_components_report_chart_hooks_use_show_more__WEBPACK_IMPORTED_MODULE_6__.useShowMore
    ];
});
_c = PieChart;
var _c;
$RefreshReg$(_c, "PieChart");

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
"./js/src/core/modules/reports/reports-view/components/report-chart/components/show-more-btn/show-more-btn.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ShowMoreBtn: () => (ShowMoreBtn)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var _Pimcore_components_icon_text_button_icon_text_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/icon-text-button/icon-text-button.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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




const ShowMoreBtn = (param)=>{
    let { isExpanded, toggle } = param;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_3__.Flex, {
        className: "m-t-mini",
        justify: "center",
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_text_button_icon_text_button__WEBPACK_IMPORTED_MODULE_4__.IconTextButton, {
            icon: {
                value: isExpanded ? 'chevron-up' : 'chevron-down'
            },
            iconPlacement: "right",
            onClick: toggle,
            type: "link",
            children: isExpanded ? t('reports.show-fewer-labels') : t('reports.show-all-labels')
        }, void 0, false, {
            fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/show-more-btn/show-more-btn.tsx",
            lineNumber: 23,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/show-more-btn/show-more-btn.tsx",
        lineNumber: 22,
        columnNumber: 10
    }, undefined);
};
_s(ShowMoreBtn, "vu2xTFBfHkv41zWfADiErp1aWcA=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation
    ];
});
_c = ShowMoreBtn;
var _c;
$RefreshReg$(_c, "ShowMoreBtn");

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
"./js/src/core/modules/reports/reports-view/components/report-chart/report-chart.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ReportChart: () => (ReportChart)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/content/content.tsx");
/* ESM import */var _Pimcore_modules_reports_reports_view_components_report_chart_components_pie_chart_pie_chart__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-chart/components/pie-chart/pie-chart.tsx");
/* ESM import */var _Pimcore_modules_reports_reports_view_components_report_chart_components_line_chart_line_chart__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-chart/components/line-chart/line-chart.tsx");
/* ESM import */var _Pimcore_modules_reports_reports_view_components_report_chart_components_bar_chart_bar_chart__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-chart/components/bar-chart/bar-chart.tsx");
/* ESM import */var _Pimcore_utils_type_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/utils/type-utils.ts");
/* ESM import */var _Pimcore_modules_reports_constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/reports/constants.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 









const ReportChart = (param)=>{
    let { chartData, reportData, chartConfig } = param;
    if ((0,lodash__WEBPACK_IMPORTED_MODULE_2__.isUndefined)(reportData) || (0,lodash__WEBPACK_IMPORTED_MODULE_2__.isUndefined)(chartData)) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_4__.Content, {
            loading: true
        }, void 0, false, {
            fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/report-chart.tsx",
            lineNumber: 26,
            columnNumber: 12
        }, undefined);
    }
    const chartType = (reportData === null || reportData === void 0 ? void 0 : reportData.chartType) ?? 'default';
    const chartLabelMap = (0,lodash__WEBPACK_IMPORTED_MODULE_2__.fromPairs)((0,lodash__WEBPACK_IMPORTED_MODULE_2__.map)(reportData === null || reportData === void 0 ? void 0 : reportData.columnConfigurations, (item)=>[
            item.name,
            !(0,_Pimcore_utils_type_utils__WEBPACK_IMPORTED_MODULE_8__.isEmptyValue)(item.label) ? item.label : item.name
        ]));
    const commonProps = {
        reportData,
        chartData,
        chartLabelMap,
        chartConfig
    };
    if ((0,_Pimcore_utils_type_utils__WEBPACK_IMPORTED_MODULE_8__.isEmptyValue)(chartData)) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.Empty, {
            image: antd__WEBPACK_IMPORTED_MODULE_3__.Empty.PRESENTED_IMAGE_SIMPLE
        }, void 0, false, {
            fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/report-chart.tsx",
            lineNumber: 37,
            columnNumber: 12
        }, undefined);
    }
    switch(chartType){
        case _Pimcore_modules_reports_constants__WEBPACK_IMPORTED_MODULE_9__.CHART_TYPE_PIE:
            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_reports_reports_view_components_report_chart_components_pie_chart_pie_chart__WEBPACK_IMPORTED_MODULE_5__.PieChart, {
                ...commonProps
            }, void 0, false, {
                fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/report-chart.tsx",
                lineNumber: 41,
                columnNumber: 14
            }, undefined);
        case _Pimcore_modules_reports_constants__WEBPACK_IMPORTED_MODULE_9__.CHART_TYPE_LINE:
            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_reports_reports_view_components_report_chart_components_line_chart_line_chart__WEBPACK_IMPORTED_MODULE_6__.LineChart, {
                ...commonProps
            }, void 0, false, {
                fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/report-chart.tsx",
                lineNumber: 43,
                columnNumber: 14
            }, undefined);
        case _Pimcore_modules_reports_constants__WEBPACK_IMPORTED_MODULE_9__.CHART_TYPE_BAR:
            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_reports_reports_view_components_report_chart_components_bar_chart_bar_chart__WEBPACK_IMPORTED_MODULE_7__.BarChart, {
                ...commonProps
            }, void 0, false, {
                fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/report-chart.tsx",
                lineNumber: 45,
                columnNumber: 14
            }, undefined);
        default:
            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_reports_reports_view_components_report_chart_components_pie_chart_pie_chart__WEBPACK_IMPORTED_MODULE_5__.PieChart, {
                ...commonProps
            }, void 0, false, {
                fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/report-chart.tsx",
                lineNumber: 47,
                columnNumber: 14
            }, undefined);
    }
};
_c = ReportChart;
var _c;
$RefreshReg$(_c, "ReportChart");

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
//# sourceMappingURL=js_src_core_modules_reports_custom-reports-api-slice-enhanced_ts-js_src_core_modules_reports_-c12071.js.map