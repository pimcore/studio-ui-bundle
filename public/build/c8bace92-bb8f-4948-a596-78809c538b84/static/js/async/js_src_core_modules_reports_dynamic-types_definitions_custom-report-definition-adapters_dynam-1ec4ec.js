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
(self["chunk_pimcore_studio_ui_bundle "] = self["chunk_pimcore_studio_ui_bundle "] || []).push([["js_src_core_modules_reports_dynamic-types_definitions_custom-report-definition-adapters_dynam-1ec4ec"], {
"./js/src/core/modules/execution-engine/jobs/download/download-job.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DownloadJob: () => (DownloadJob)
});
/* import */ var _message_handlers_message_bus_job_message_bus_job_handler__rspack_import_0 = __webpack_require__("./js/src/core/modules/execution-engine/message-handlers/message-bus-job/message-bus-job-handler.ts");
/* import */ var _Pimcore_modules_app_error_handler__rspack_import_1 = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* import */ var i18next__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/i18next/i18next");
/* import */ var i18next__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(i18next__rspack_import_2);
/* import */ var lodash__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_3);
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



class DownloadJob {
    async run(options) {
        const { messageBus } = options;
        const jobRunId = await this.executeAction();
        if (!(0,lodash__rspack_import_3.isNull)(jobRunId)) {
            const handler = this.createHandler(jobRunId, options);
            messageBus.registerHandler(handler);
        }
    }
    async executeAction() {
        try {
            return await this.options.action();
        } catch (e) {
            console.error(e);
            (0,_Pimcore_modules_app_error_handler__rspack_import_1["default"])(new _Pimcore_modules_app_error_handler__rspack_import_1.GeneralError((0,i18next__rspack_import_2.t)('jobs.job.download-error')));
            return null;
        }
    }
    createHandler(jobRunId, options) {
        const { title, downloadUrl } = this.options;
        return new _message_handlers_message_bus_job_message_bus_job_handler__rspack_import_0.MessageBusJobHandler({
            jobRunId,
            title,
            onRetry: async ()=>{
                await this.run(options);
            },
            onCustomizeButtons: (context)=>{
                context.addSuccessButton({
                    label: (0,i18next__rspack_import_2.t)('jobs.job.button-download'),
                    handler: ()=>{
                        const a = document.createElement('a');
                        a.href = downloadUrl.replace('{jobRunId}', jobRunId.toString());
                        a.download = '';
                        a.click();
                    }
                });
            }
        });
    }
    constructor(options){
        this.options = options;
    }
}

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/constants.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  CHART_TYPE_BAR: () => (CHART_TYPE_BAR),
  CHART_TYPE_LINE: () => (CHART_TYPE_LINE),
  CHART_TYPE_PIE: () => (CHART_TYPE_PIE)
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
 */ const CHART_TYPE_PIE = 'pie';
const CHART_TYPE_LINE = 'line';
const CHART_TYPE_BAR = 'bar';

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/custom-reports-api-slice-enhanced.ts"(module, __webpack_exports__, __webpack_require__) {
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
/* import */ var _Pimcore_modules_reports_custom_reports_api_slice_gen__rspack_import_0 = __webpack_require__("./js/src/core/modules/reports/custom-reports-api-slice.gen.ts");
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
const api = _Pimcore_modules_reports_custom_reports_api_slice_gen__rspack_import_0.api.enhanceEndpoints({
    endpoints: {
        customReportExportCsv: {
            invalidatesTags: ()=>[]
        }
    }
});
const { useCustomReportsListDrillDownOptionsQuery, useCustomReportsChartQuery, useCustomReportsConfigAddMutation, useCustomReportsConfigCloneMutation, useCustomReportsColumnConfigListQuery, useCustomReportsConfigUpdateMutation, useCustomReportsConfigDeleteMutation, useCustomReportsReportQuery, useCustomReportsConfigGetTreeQuery, useCustomReportExportCsvMutation, useCustomReportsGetTreeQuery } = api;

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/custom-reports-api-slice.gen.ts"(module, __webpack_exports__, __webpack_require__) {
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
/* import */ var _sdk_api__rspack_import_0 = __webpack_require__("./js/src/sdk/api/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Bundle Custom Reports"
];
const injectedRtkApi = _sdk_api__rspack_import_0.api.enhanceEndpoints({
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

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/dynamic-types/definitions/custom-report-definition-adapters/dynamic-type-custom-report-definition-registry.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DynamicTypeCustomReportDefinitionRegistry: () => (DynamicTypeCustomReportDefinitionRegistry)
});
/* import */ var _swc_helpers_ts_decorate__rspack_import_2 = __webpack_require__("./node_modules/tslib/tslib.es6.mjs");
/* import */ var inversify__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* import */ var inversify__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(inversify__rspack_import_0);
/* import */ var _Pimcore_modules_element_dynamic_types_registry_dynamic_type_registry_abstract__rspack_import_1 = __webpack_require__("./js/src/core/modules/element/dynamic-types/registry/dynamic-type-registry-abstract.tsx");
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

class DynamicTypeCustomReportDefinitionRegistry extends _Pimcore_modules_element_dynamic_types_registry_dynamic_type_registry_abstract__rspack_import_1.DynamicTypeRegistryAbstract {
}
DynamicTypeCustomReportDefinitionRegistry = (0,_swc_helpers_ts_decorate__rspack_import_2.__decorate)([
    (0,inversify__rspack_import_0.injectable)()
], DynamicTypeCustomReportDefinitionRegistry);

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/reports-editor/components/report-configuration/components/column-configuration/constants.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  COLUMN_KEYS: () => (COLUMN_KEYS)
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
 */ const COLUMN_KEYS = {
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

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/reports-editor/components/report-configuration/helpers.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  normalizeChartData: () => (normalizeChartData),
  normalizeColumnConfigurations: () => (normalizeColumnConfigurations),
  normalizeDataSourceConfig: () => (normalizeDataSourceConfig)
});
/* import */ var lodash__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_0);
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
const normalizeDataSourceConfig = (data)=>{
    return {
        dataSourceConfig: (0,lodash__rspack_import_0.castArray)((data === null || data === void 0 ? void 0 : data.dataSourceConfig) ?? [])
    };
};
const normalizeChartData = (data)=>{
    if (data.chartType === '') {
        return {
            xAxis: '',
            yAxis: [],
            pieColumn: '',
            pieLabelColumn: ''
        };
    }
    return {
        pieColumn: data.pieColumn,
        pieLabelColumn: data.pieLabelColumn,
        xAxis: data.xAxis,
        yAxis: (0,lodash__rspack_import_0.isNull)(data.yAxis) ? [] : (0,lodash__rspack_import_0.castArray)(data.yAxis)
    };
};
const normalizeColumnConfigurations = (data)=>{
    var _data_columnConfigurations;
    const cleanedColumns = data === null || data === void 0 ? void 0 : (_data_columnConfigurations = data.columnConfigurations) === null || _data_columnConfigurations === void 0 ? void 0 : _data_columnConfigurations.map((param)=>{
        let { disableLabel, disableDropdownFilterable, disableOrderBy, disableFilterable, ...rest } = param;
        return rest;
    });
    return {
        columnConfigurations: cleanedColumns
    };
};

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/reports-editor/hooks/use-report-actions.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useReportActions: () => (useReportActions)
});
/* import */ var react__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var lodash__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_1);
/* import */ var _Pimcore_modules_app_error_handler__rspack_import_2 = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* import */ var _Pimcore_modules_reports_custom_reports_api_slice_enhanced__rspack_import_3 = __webpack_require__("./js/src/core/modules/reports/custom-reports-api-slice-enhanced.ts");
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



const useTrackMutationError = (isError, error)=>{
    (0,react__rspack_import_0.useEffect)(()=>{
        if (isError && !(0,lodash__rspack_import_1.isUndefined)(error)) {
            (0,_Pimcore_modules_app_error_handler__rspack_import_2["default"])(new _Pimcore_modules_app_error_handler__rspack_import_2.ApiError(error));
        }
    }, [
        isError,
        error
    ]);
};
const useReportActions = ()=>{
    const [addReportMutation, { isError: isAddReportError, error: addReportError }] = (0,_Pimcore_modules_reports_custom_reports_api_slice_enhanced__rspack_import_3.useCustomReportsConfigAddMutation)();
    const [cloneReportMutation, { isError: isCloneReportError, error: cloneReportError }] = (0,_Pimcore_modules_reports_custom_reports_api_slice_enhanced__rspack_import_3.useCustomReportsConfigCloneMutation)();
    const [deleteReportMutation, { isError: isDeleteReportError, error: deleteReportError }] = (0,_Pimcore_modules_reports_custom_reports_api_slice_enhanced__rspack_import_3.useCustomReportsConfigDeleteMutation)();
    const [updateReportMutation, { isError: isUpdateReportError, error: updateReportError }] = (0,_Pimcore_modules_reports_custom_reports_api_slice_enhanced__rspack_import_3.useCustomReportsConfigUpdateMutation)();
    useTrackMutationError(isAddReportError, addReportError);
    useTrackMutationError(isCloneReportError, cloneReportError);
    useTrackMutationError(isDeleteReportError, deleteReportError);
    useTrackMutationError(isUpdateReportError, updateReportError);
    const addReport = async (arg)=>{
        await addReportMutation(arg);
    };
    const cloneReport = async (arg)=>{
        await cloneReportMutation(arg);
    };
    const deleteReport = async (arg)=>{
        await deleteReportMutation(arg);
    };
    const updateReport = async (arg)=>{
        await updateReportMutation(arg);
    };
    return {
        addReport,
        cloneReport,
        deleteReport,
        updateReport
    };
};

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/reports-editor/hooks/use-report-form-state.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useReportFormState: () => (useReportFormState)
});
/* import */ var react__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var lodash__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_1);
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

const useReportFormState = ()=>{
    const [initialData, setInitialData] = (0,react__rspack_import_0.useState)(null);
    const [currentData, setCurrentData] = (0,react__rspack_import_0.useState)(null);
    const initializeForm = (data)=>{
        setInitialData({
            ...data
        });
        setCurrentData({
            ...data
        });
    };
    const updateFormData = (data)=>{
        setCurrentData((prev)=>!(0,lodash__rspack_import_1.isNull)(prev) ? {
                ...prev,
                ...data
            } : null);
    };
    const markFormSaved = ()=>{
        !(0,lodash__rspack_import_1.isNull)(currentData) && setInitialData({
            ...currentData
        });
    };
    const isDirty = (0,react__rspack_import_0.useMemo)(()=>{
        if ((0,lodash__rspack_import_1.isNull)(initialData) || (0,lodash__rspack_import_1.isNull)(currentData)) return false;
        return !(0,lodash__rspack_import_1.isEqual)(initialData, currentData);
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

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/reports-view/components/report-chart/hooks/use-show-more.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useShowMore: () => (useShowMore)
});
/* import */ var react__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
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
const INITIAL_VISIBLE_COUNT = 5;
const useShowMore = function() {
    let items = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    const [isExpanded, setIsExpanded] = (0,react__rspack_import_0.useState)(false);
    const visibleItems = (0,react__rspack_import_0.useMemo)(()=>{
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

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/reports-view/components/report-chart/utils/helpers.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  generateColorMap: () => (generateColorMap)
});
/* import */ var _ant_design_colors__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/@ant-design/colors/@ant-design/colors");
/* import */ var _ant_design_colors__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(_ant_design_colors__rspack_import_0);
/* import */ var lodash__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_1);
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

const PALETTES = [
    _ant_design_colors__rspack_import_0.purple,
    _ant_design_colors__rspack_import_0.magenta,
    _ant_design_colors__rspack_import_0.geekblue,
    _ant_design_colors__rspack_import_0.cyan,
    _ant_design_colors__rspack_import_0.blue,
    _ant_design_colors__rspack_import_0.green,
    _ant_design_colors__rspack_import_0.yellow,
    _ant_design_colors__rspack_import_0.lime,
    _ant_design_colors__rspack_import_0.gold,
    _ant_design_colors__rspack_import_0.volcano,
    _ant_design_colors__rspack_import_0.orange,
    _ant_design_colors__rspack_import_0.red
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
            if (!(0,lodash__rspack_import_1.isUndefined)(palette[i])) {
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

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/reports-view/components/report-sidebar/components/columns-filters/components/field-filters/types.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  FieldFilterOperators: () => (FieldFilterOperators)
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
 */ var FieldFilterOperators = /*#__PURE__*/ function(FieldFilterOperators) {
    FieldFilterOperators["EQUAL"] = "eq";
    FieldFilterOperators["LESS_THAN"] = "lt";
    FieldFilterOperators["GREATER_THAN"] = "gt";
    FieldFilterOperators["LIKE"] = "like";
    return FieldFilterOperators;
}({});

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/reports-view/helpers.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ReportActionType: () => (ReportActionType),
  getTypeByActionType: () => (getTypeByActionType)
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
 */ var ReportActionType = /*#__PURE__*/ function(ReportActionType) {
    ReportActionType["OPEN_OBJECT"] = "openObject";
    ReportActionType["OPEN_DOCUMENT"] = "openDocument";
    ReportActionType["OPEN_ASSET"] = "openAsset";
    ReportActionType["OPEN_URL"] = "openUrl";
    return ReportActionType;
}({});
const getTypeByActionType = (actionType)=>{
    switch(actionType){
        case "openObject":
            return 'data-object';
        case "openDocument":
            return 'document';
        case "openAsset":
            return 'asset';
        default:
            return 'data-object';
    }
};

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/reports-view/hooks/useFullChartData.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useFullChartData: () => (useFullChartData)
});
/* import */ var _Pimcore_modules_reports_custom_reports_api_slice_enhanced__rspack_import_0 = __webpack_require__("./js/src/core/modules/reports/custom-reports-api-slice-enhanced.ts");
/* import */ var _Pimcore_utils_type_utils__rspack_import_1 = __webpack_require__("./js/src/core/utils/type-utils.ts");
/* import */ var _Pimcore_modules_reports_reports_view_context_report_data_context__rspack_import_2 = __webpack_require__("./js/src/core/modules/reports/reports-view/context/report-data-context.tsx");
/* import */ var _Pimcore_modules_reports_reports_view_context_grid_filter_context__rspack_import_3 = __webpack_require__("./js/src/core/modules/reports/reports-view/context/grid-filter-context.tsx");
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



const useFullChartData = (param)=>{
    let { name } = param;
    const { filters } = (0,_Pimcore_modules_reports_reports_view_context_grid_filter_context__rspack_import_3.useGridFilterContext)();
    const { isLoading, data } = (0,_Pimcore_modules_reports_custom_reports_api_slice_enhanced__rspack_import_0.useCustomReportsChartQuery)({
        body: {
            name,
            page: _Pimcore_modules_reports_reports_view_context_report_data_context__rspack_import_2.PAGE_INITIAL,
            pageSize: 9999999999,
            filters
        }
    }, {
        skip: (0,_Pimcore_utils_type_utils__rspack_import_1.isEmptyValue)(name)
    });
    return {
        isLoading,
        data
    };
};

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/reports-view/hooks/useReportData.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useReportData: () => (useReportData)
});
/* import */ var _Pimcore_modules_reports_custom_reports_api_slice_enhanced__rspack_import_0 = __webpack_require__("./js/src/core/modules/reports/custom-reports-api-slice-enhanced.ts");
/* import */ var _Pimcore_utils_type_utils__rspack_import_1 = __webpack_require__("./js/src/core/utils/type-utils.ts");
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

const useReportData = (param)=>{
    let { name, filters, page, pageSize, sorting } = param;
    const { isLoading: isReportDetailLoading, data: reportDetailData, refetch: reportDetailRefetch, isFetching: isReportDetailFetching } = (0,_Pimcore_modules_reports_custom_reports_api_slice_enhanced__rspack_import_0.useCustomReportsReportQuery)({
        name
    }, {
        skip: (0,_Pimcore_utils_type_utils__rspack_import_1.isEmptyValue)(name)
    });
    const { isLoading: isChartDetailLoading, data: chartDetailData, refetch: chartDetailRefetch, isFetching: isChartDetailFetching } = (0,_Pimcore_modules_reports_custom_reports_api_slice_enhanced__rspack_import_0.useCustomReportsChartQuery)({
        body: {
            name,
            filters,
            page,
            pageSize,
            sortBy: sorting === null || sorting === void 0 ? void 0 : sorting.sortBy,
            sortOrder: sorting === null || sorting === void 0 ? void 0 : sorting.sortOrder
        }
    }, {
        skip: (0,_Pimcore_utils_type_utils__rspack_import_1.isEmptyValue)(name)
    });
    const isLoading = isReportDetailLoading || isChartDetailLoading;
    const isFetching = isReportDetailFetching || isChartDetailFetching;
    const refetchAll = ()=>{
        reportDetailRefetch().catch((e)=>{
            console.error(e);
        });
        chartDetailRefetch().catch((e)=>{
            console.error(e);
        });
    };
    return {
        reportDetailData,
        chartDetailData,
        isLoading,
        isFetching,
        refetchAll
    };
};

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/reports-view/types.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  FilterDrillDown: () => (FilterDrillDown)
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
 */ var FilterDrillDown = /*#__PURE__*/ function(FilterDrillDown) {
    FilterDrillDown["ONLY_FILTER"] = "only_filter";
    FilterDrillDown["FILTER_AND_SHOW"] = "filter_and_show";
    return FilterDrillDown;
}({});

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/utils/reports-loader.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  loadReportsMenuItems: () => (loadReportsMenuItems)
});
/* import */ var _Pimcore_app_store__rspack_import_0 = __webpack_require__("./js/src/core/app/store/index.ts");
/* import */ var _Pimcore_modules_auth_permission_helper__rspack_import_1 = __webpack_require__("./js/src/core/modules/auth/permission-helper.ts");
/* import */ var _Pimcore_modules_auth_enums_user_permission__rspack_import_2 = __webpack_require__("./js/src/core/modules/auth/enums/user-permission.ts");
/* import */ var _Pimcore_modules_perspectives_enums_nav_permission__rspack_import_3 = __webpack_require__("./js/src/core/modules/perspectives/enums/nav-permission.ts");
/* import */ var _Pimcore_modules_reports_custom_reports_api_slice_gen__rspack_import_4 = __webpack_require__("./js/src/core/modules/reports/custom-reports-api-slice.gen.ts");
/* import */ var lodash__rspack_import_5 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_5_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_5);
/* import */ var _Pimcore_utils_type_utils__rspack_import_6 = __webpack_require__("./js/src/core/utils/type-utils.ts");
/* import */ var _Pimcore_app_depency_injection__rspack_import_7 = __webpack_require__("./js/src/core/app/depency-injection/index.ts");
/* import */ var _Pimcore_app_config_services_service_ids__rspack_import_8 = __webpack_require__("./js/src/core/app/config/services/service-ids.ts");
/* import */ var _Pimcore_modules_reports_reports_view_reports_view_wrapper__rspack_import_9 = __webpack_require__("./js/src/core/modules/reports/reports-view/reports-view-wrapper.tsx");
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









const loadReportsMenuItems = async ()=>{
    if ((0,_Pimcore_modules_auth_permission_helper__rspack_import_1.isAllowed)(_Pimcore_modules_auth_enums_user_permission__rspack_import_2.UserPermission.Reports)) {
        const REPORTS_SECTION_NAME = 'Reporting';
        const DYNAMIC_REPORT_PREFIX = 'dynamic_report_';
        const mainNavRegistryService = _Pimcore_app_depency_injection__rspack_import_7.container.get(_Pimcore_app_config_services_service_ids__rspack_import_8.serviceIds.mainNavRegistry);
        const widgetRegistryService = _Pimcore_app_depency_injection__rspack_import_7.container.get(_Pimcore_app_config_services_service_ids__rspack_import_8.serviceIds.widgetManager);
        try {
            const reportsData = await _Pimcore_app_store__rspack_import_0.store.dispatch(_Pimcore_modules_reports_custom_reports_api_slice_gen__rspack_import_4.api.endpoints.customReportsGetTree.initiate({
                page: 1,
                pageSize: 999999
            }, {
                forceRefetch: true
            })).unwrap();
            if (!(0,lodash__rspack_import_5.isUndefined)(reportsData === null || reportsData === void 0 ? void 0 : reportsData.items)) {
                const validPaths = new Set();
                reportsData.items.forEach((report)=>{
                    if (report.menuShortcut && report.hasDataSourceConfig) {
                        const reportId = report.name;
                        const path = !(0,_Pimcore_utils_type_utils__rspack_import_6.isEmptyValue)(report.group) ? `${REPORTS_SECTION_NAME}/${report.group}/${reportId}` : `${REPORTS_SECTION_NAME}/${reportId}`;
                        validPaths.add(path);
                        if (!(0,_Pimcore_utils_type_utils__rspack_import_6.isEmptyValue)(report.group)) {
                            validPaths.add(`${REPORTS_SECTION_NAME}/${report.group}`);
                        }
                    }
                });
                const currentItems = mainNavRegistryService.getMainNavItems();
                const itemsToRemove = currentItems.filter((item)=>{
                    var _item_id;
                    return item.path.startsWith(`${REPORTS_SECTION_NAME}/`) && !validPaths.has(item.path) && ((_item_id = item.id) === null || _item_id === void 0 ? void 0 : _item_id.startsWith(DYNAMIC_REPORT_PREFIX));
                });
                itemsToRemove.forEach((item)=>{
                    mainNavRegistryService.unregisterMainNavItem(item.path);
                });
                reportsData.items.forEach((report, index)=>{
                    if (report.menuShortcut && report.hasDataSourceConfig) {
                        const reportId = report.name;
                        const reportName = !(0,_Pimcore_utils_type_utils__rspack_import_6.isEmptyValue)(report.niceName) ? report.niceName : reportId;
                        const path = !(0,_Pimcore_utils_type_utils__rspack_import_6.isEmptyValue)(report.group) ? `${REPORTS_SECTION_NAME}/${report.group}/${reportId}` : `${REPORTS_SECTION_NAME}/${reportId}`;
                        const reportIconClass = report.iconClass;
                        const reportGroupIconClass = report.groupIconClass;
                        if (!(0,_Pimcore_utils_type_utils__rspack_import_6.isEmptyValue)(report.group)) {
                            mainNavRegistryService.registerMainNavItem({
                                id: `${DYNAMIC_REPORT_PREFIX}group_${report.group}`,
                                path: `${REPORTS_SECTION_NAME}/${report.group}`,
                                label: report.group,
                                order: 300 + index,
                                permission: _Pimcore_modules_auth_enums_user_permission__rspack_import_2.UserPermission.Reports,
                                perspectivePermission: _Pimcore_modules_perspectives_enums_nav_permission__rspack_import_3.NavPermission.Reports,
                                ...!(0,_Pimcore_utils_type_utils__rspack_import_6.isEmptyValue)(reportGroupIconClass) && {
                                    icon: reportGroupIconClass
                                }
                            });
                        }
                        mainNavRegistryService.registerMainNavItem({
                            id: `${DYNAMIC_REPORT_PREFIX}${reportId}-${index}`,
                            path,
                            label: reportName,
                            group: report.group,
                            order: 300 + index,
                            permission: _Pimcore_modules_auth_enums_user_permission__rspack_import_2.UserPermission.Reports,
                            perspectivePermission: _Pimcore_modules_perspectives_enums_nav_permission__rspack_import_3.NavPermission.Reports,
                            ...!(0,_Pimcore_utils_type_utils__rspack_import_6.isEmptyValue)(reportIconClass) && {
                                icon: reportIconClass
                            },
                            ...!(0,_Pimcore_utils_type_utils__rspack_import_6.isEmptyValue)(reportGroupIconClass) && {
                                groupIcon: reportGroupIconClass
                            },
                            widgetConfig: {
                                component: 'dynamic-report',
                                config: {
                                    translationKey: 'navigation.reports',
                                    icon: {
                                        type: 'name',
                                        value: 'pie-chart'
                                    },
                                    reportId
                                }
                            }
                        });
                    }
                });
                widgetRegistryService.registerWidget({
                    name: 'dynamic-report',
                    component: _Pimcore_modules_reports_reports_view_reports_view_wrapper__rspack_import_9.ReportsViewWrapper
                });
            }
        } catch (e) {
            console.error('Failed to load reports for menu:', e);
        }
    }
};

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/components/grid/contexts/columns-context.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ColumnsProvider: () => (ColumnsProvider),
  useColumnsContext: () => (useColumnsContext)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var lodash__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_2);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$(), _s1 = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 

const ColumnsContext = /*#__PURE__*/ (0,react__rspack_import_1.createContext)(undefined);
const ColumnsProvider = (param)=>{
    let { children } = param;
    _s();
    const [columns, setColumns] = (0,react__rspack_import_1.useState)([]);
    const [initialColumns, setInitialColumns] = (0,react__rspack_import_1.useState)([]);
    const resetColumnsToInitial = ()=>{
        setColumns(initialColumns);
    };
    const addColumn = (column)=>{
        setColumns([
            ...columns,
            column
        ]);
    };
    const contextValue = (0,react__rspack_import_1.useMemo)(()=>({
            columns,
            setColumns,
            initialColumns,
            setInitialColumns,
            resetColumnsToInitial,
            addColumn
        }), [
        columns,
        setColumns,
        initialColumns,
        setInitialColumns
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(ColumnsContext.Provider, {
        value: contextValue,
        children: children
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/components/grid/contexts/columns-context.tsx",
        lineNumber: 33,
        columnNumber: 10
    }, undefined);
};
_s(ColumnsProvider, "70ISaLYJUYmJA3CHMEm1FZwSjNo=");
_c = ColumnsProvider;
const useColumnsContext = ()=>{
    _s1();
    const context = (0,react__rspack_import_1.useContext)(ColumnsContext);
    if ((0,lodash__rspack_import_2.isUndefined)(context)) {
        throw new Error('useColumnsContext must be used within a ColumnsProvider');
    }
    return context;
};
_s1(useColumnsContext, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
$RefreshReg$(_c, "ColumnsProvider");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/components/grid/contexts/filter-context.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  createFilterContext: () => (createFilterContext)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var lodash__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_2);
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

function createFilterContext() {
    var _s = $RefreshSig$(), _s1 = $RefreshSig$();
    const FilterContext = /*#__PURE__*/ (0,react__rspack_import_1.createContext)(undefined);
    const FilterProvider = (param)=>{
        let { children, initialValue } = param;
        _s();
        const [filters, setFilters] = (0,react__rspack_import_1.useState)(initialValue);
        const resetFilters = ()=>{
            setFilters(initialValue);
        };
        const contextValue = (0,react__rspack_import_1.useMemo)(()=>({
                filters,
                setFilters,
                resetFilters
            }), [
            filters,
            initialValue
        ]);
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(FilterContext.Provider, {
            value: contextValue,
            children: children
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/components/grid/contexts/filter-context.tsx",
            lineNumber: 28,
            columnNumber: 12
        }, this);
    };
    _s(FilterProvider, "MnmeH3exQx9vb7/5eG14b81mfTw=");
    function useFilterContext() {
        _s1();
        const context = (0,react__rspack_import_1.useContext)(FilterContext);
        if ((0,lodash__rspack_import_2.isUndefined)(context)) {
            throw new Error('useFilterContext must be used within a FilterProvider');
        }
        return context;
    }
    _s1(useFilterContext, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
    return {
        FilterProvider,
        useFilterContext
    };
}

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/components/pagination/pagination.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Pagination: () => (Pagination)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var react_i18next__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_2);
/* import */ var _Pimcore_components_pagination_pagination__rspack_import_3 = __webpack_require__("./js/src/core/components/pagination/pagination.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 


const Pagination = (param)=>{
    let { page, setPage, pageSize, setPageSize, totalItems } = param;
    _s();
    const { t } = (0,react_i18next__rspack_import_2.useTranslation)();
    const handleChange = (page, pageSize)=>{
        const newPageSize = pageSize;
        setPage(page);
        setPageSize(parseInt(newPageSize));
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_pagination_pagination__rspack_import_3.Pagination, {
        current: page,
        defaultPageSize: pageSize,
        onChange: handleChange,
        pageSizeOptions: [
            10,
            20,
            50,
            100
        ],
        showSizeChanger: true,
        showTotal: (total)=>t('pagination.show-total', {
                total
            }),
        total: totalItems
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/components/pagination/pagination.tsx",
        lineNumber: 29,
        columnNumber: 10
    }, undefined);
};
_s(Pagination, "vu2xTFBfHkv41zWfADiErp1aWcA=", false, function() {
    return [
        react_i18next__rspack_import_2.useTranslation
    ];
});
_c = Pagination;
var _c;
$RefreshReg$(_c, "Pagination");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/components/refetch/refetch.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Refetch: () => (Refetch)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _Pimcore_components_icon_button_icon_button__rspack_import_2 = __webpack_require__("./js/src/core/components/icon-button/icon-button.tsx");
/* import */ var _Pimcore_components_spin_spin__rspack_import_3 = __webpack_require__("./js/src/core/components/spin/spin.tsx");
/* import */ var _Pimcore_components_box_box__rspack_import_4 = __webpack_require__("./js/src/core/components/box/box.tsx");
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



const Refetch = (param)=>{
    let { isFetching, refetch } = param;
    if (isFetching) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_box_box__rspack_import_4.Box, {
            padding: {
                x: 'extra-small',
                y: 'extra-small'
            },
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_spin_spin__rspack_import_3.Spin, {}, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/components/refetch/refetch.tsx",
                lineNumber: 24,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/components/refetch/refetch.tsx",
            lineNumber: 20,
            columnNumber: 12
        }, undefined);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_button_icon_button__rspack_import_2.IconButton, {
        icon: {
            value: 'refresh'
        },
        onClick: async ()=>{
            refetch();
        }
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/components/refetch/refetch.tsx",
        lineNumber: 27,
        columnNumber: 10
    }, undefined);
};
_c = Refetch;
var _c;
$RefreshReg$(_c, "Refetch");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/dynamic-types/definitions/custom-report-definition-adapters/dynamic-type-custom-report-definition-abstract.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DynamicTypeCustomReportDefinitionAbstract: () => (DynamicTypeCustomReportDefinitionAbstract)
});
/* import */ var inversify__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* import */ var inversify__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(inversify__rspack_import_0);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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
let DynamicTypeCustomReportDefinitionAbstract = (_dec = (0,inversify__rspack_import_0.injectable)(), _dec(_class = class DynamicTypeCustomReportDefinitionAbstract {
    constructor(){
        _defineProperty(this, "id", void 0);
    }
}) || _class);

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/index.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  CUSTOM_REPORTS_WIDGET: () => (CUSTOM_REPORTS_WIDGET),
  REPORTS_WIDGET: () => (REPORTS_WIDGET)
});
/* import */ var _Pimcore_modules_reports_reports_view_reports_view_wrapper__rspack_import_0 = __webpack_require__("./js/src/core/modules/reports/reports-view/reports-view-wrapper.tsx");
/* import */ var _Pimcore_modules_reports_reports_editor_reports_editor__rspack_import_1 = __webpack_require__("./js/src/core/modules/reports/reports-editor/reports-editor.tsx");
/* import */ var _Pimcore_app_depency_injection__rspack_import_2 = __webpack_require__("./js/src/core/app/depency-injection/index.ts");
/* import */ var _Pimcore_app_config_services_service_ids__rspack_import_3 = __webpack_require__("./js/src/core/app/config/services/service-ids.ts");
/* import */ var _Pimcore_app_module_system_module_system__rspack_import_4 = __webpack_require__("./js/src/core/app/module-system/module-system.ts");
/* import */ var _perspectives_enums_nav_permission__rspack_import_5 = __webpack_require__("./js/src/core/modules/perspectives/enums/nav-permission.ts");
/* import */ var _Pimcore_modules_auth_enums_user_permission__rspack_import_6 = __webpack_require__("./js/src/core/modules/auth/enums/user-permission.ts");
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






const REPORTS_SECTION_NAME = 'Reporting';
const REPORTS_WIDGET = {
    name: 'Reports',
    id: 'reports',
    component: 'reports',
    config: {
        translationKey: 'navigation.reports',
        icon: {
            type: 'name',
            value: 'pie-chart'
        }
    }
};
const CUSTOM_REPORTS_WIDGET = {
    name: 'Custom Reports',
    id: 'custom-reports',
    component: 'custom-reports',
    config: {
        translationKey: 'navigation.custom-reports',
        icon: {
            type: 'name',
            value: 'chart-scatter'
        }
    }
};
_Pimcore_app_module_system_module_system__rspack_import_4.moduleSystem.registerModule({
    onInit: ()=>{
        const mainNavRegistryService = _Pimcore_app_depency_injection__rspack_import_2.container.get(_Pimcore_app_config_services_service_ids__rspack_import_3.serviceIds.mainNavRegistry);
        const sourceDefinitionRegistry = _Pimcore_app_depency_injection__rspack_import_2.container.get(_Pimcore_app_config_services_service_ids__rspack_import_3.serviceIds["DynamicTypes/CustomReportDefinitionRegistry"]);
        sourceDefinitionRegistry.registerDynamicType(_Pimcore_app_depency_injection__rspack_import_2.container.get(_Pimcore_app_config_services_service_ids__rspack_import_3.serviceIds["DynamicTypes/CustomReportDefinition/Sql"]));
        mainNavRegistryService.registerMainNavItem({
            path: `${REPORTS_SECTION_NAME}/Reports`,
            label: 'navigation.reports',
            className: 'item-style-modifier',
            order: 100,
            dividerBottom: true,
            permission: _Pimcore_modules_auth_enums_user_permission__rspack_import_6.UserPermission.Reports,
            perspectivePermission: _perspectives_enums_nav_permission__rspack_import_5.NavPermission.Reports,
            widgetConfig: REPORTS_WIDGET
        });
        mainNavRegistryService.registerMainNavItem({
            path: `${REPORTS_SECTION_NAME}/Custom Reports`,
            label: 'navigation.custom-reports',
            order: 200,
            dividerBottom: true,
            permission: _Pimcore_modules_auth_enums_user_permission__rspack_import_6.UserPermission.ReportsConfig,
            perspectivePermission: _perspectives_enums_nav_permission__rspack_import_5.NavPermission.CustomReportsConfiguration,
            widgetConfig: CUSTOM_REPORTS_WIDGET
        });
        const widgetRegistryService = _Pimcore_app_depency_injection__rspack_import_2.container.get(_Pimcore_app_config_services_service_ids__rspack_import_3.serviceIds.widgetManager);
        widgetRegistryService.registerWidget({
            name: 'reports',
            component: _Pimcore_modules_reports_reports_view_reports_view_wrapper__rspack_import_0.ReportsViewWrapper
        });
        widgetRegistryService.registerWidget({
            name: 'custom-reports',
            component: _Pimcore_modules_reports_reports_editor_reports_editor__rspack_import_1.ReportsEditor
        });
    }
});

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/reports-editor/components/report-configuration/components/chart-settings/chart-settings.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ChartSettings: () => (ChartSettings)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var react_i18next__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_2);
/* import */ var _Pimcore_components_form_form_kit__rspack_import_3 = __webpack_require__("./js/src/core/components/form/form-kit.tsx");
/* import */ var _Pimcore_components_select_select__rspack_import_4 = __webpack_require__("./js/src/core/components/select/select.tsx");
/* import */ var _Pimcore_components_form_form__rspack_import_5 = __webpack_require__("./js/src/core/components/form/form.tsx");
/* import */ var _Pimcore_components_form_conditional_conditional__rspack_import_6 = __webpack_require__("./js/src/core/components/form/conditional/conditional.tsx");
/* import */ var _Pimcore_modules_reports_constants__rspack_import_7 = __webpack_require__("./js/src/core/modules/reports/constants.ts");
/* import */ var _report_configuration_styles__rspack_import_8 = __webpack_require__("./js/src/core/modules/reports/reports-editor/components/report-configuration/report-configuration.styles.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 







const ChartSettings = (param)=>{
    let { currentData } = param;
    _s();
    const { t } = (0,react_i18next__rspack_import_2.useTranslation)();
    const { styles } = (0,_report_configuration_styles__rspack_import_8.useStyles)();
    const CHART_OPTIONS = [
        {
            value: '',
            label: t('reports.editor.chart-settings.chart-type.none')
        },
        {
            value: _Pimcore_modules_reports_constants__rspack_import_7.CHART_TYPE_PIE,
            label: t('reports.editor.chart-settings.chart-type.pie-chart')
        },
        {
            value: _Pimcore_modules_reports_constants__rspack_import_7.CHART_TYPE_LINE,
            label: t('reports.editor.chart-settings.chart-type.line-chart')
        },
        {
            value: _Pimcore_modules_reports_constants__rspack_import_7.CHART_TYPE_BAR,
            label: t('reports.editor.chart-settings.chart-type.bar-chart')
        }
    ];
    const chartSelectOptions = (0,react__rspack_import_1.useMemo)(()=>{
        return currentData.columnConfigurations.map((column)=>({
                value: column.name,
                label: column.name
            }));
    }, [
        currentData
    ]);
    const renderSelectItem = (param)=>{
        let { label, name, mode } = param;
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_form_form__rspack_import_5.Form.Item, {
            label: label,
            name: name,
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_select_select__rspack_import_4.Select, {
                className: styles.chartSelect,
                "data-testid": `report-chart-${name}`,
                mode: mode,
                options: chartSelectOptions
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/report-configuration/components/chart-settings/chart-settings.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/report-configuration/components/chart-settings/chart-settings.tsx",
            lineNumber: 51,
            columnNumber: 9
        }, undefined);
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_form_form_kit__rspack_import_3.FormKit.Panel, {
        title: t('reports.editor.chart-settings.title'),
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_form_form__rspack_import_5.Form.Item, {
                label: t('reports.editor.chart-settings.chart-type'),
                name: "chartType",
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_select_select__rspack_import_4.Select, {
                    className: styles.chartSelect,
                    "data-testid": "report-chart-type",
                    options: CHART_OPTIONS
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/report-configuration/components/chart-settings/chart-settings.tsx",
                    lineNumber: 56,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/report-configuration/components/chart-settings/chart-settings.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_form_conditional_conditional__rspack_import_6.Conditional, {
                condition: (formValues)=>formValues.chartType === _Pimcore_modules_reports_constants__rspack_import_7.CHART_TYPE_PIE,
                watchFields: [
                    'chartType'
                ],
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_form_form_kit__rspack_import_3.FormKit.Panel, {
                    border: true,
                    contentPadding: {
                        top: 'none',
                        right: 'small',
                        bottom: 'small',
                        left: 'small'
                    },
                    theme: "fieldset",
                    title: t('reports.editor.chart-settings.settings'),
                    children: [
                        renderSelectItem({
                            label: t('reports.editor.chart-settings.pie-label'),
                            name: 'pieLabelColumn'
                        }),
                        renderSelectItem({
                            label: t('reports.editor.chart-settings.pie-data'),
                            name: 'pieColumn'
                        })
                    ]
                }, void 0, true, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/report-configuration/components/chart-settings/chart-settings.tsx",
                    lineNumber: 60,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/report-configuration/components/chart-settings/chart-settings.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_form_conditional_conditional__rspack_import_6.Conditional, {
                condition: (formValues)=>formValues.chartType === _Pimcore_modules_reports_constants__rspack_import_7.CHART_TYPE_LINE,
                watchFields: [
                    'chartType'
                ],
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_form_form_kit__rspack_import_3.FormKit.Panel, {
                    border: true,
                    theme: "fieldset",
                    title: t('reports.editor.chart-settings.settings'),
                    children: [
                        renderSelectItem({
                            label: t('reports.editor.chart-settings.x-axis'),
                            name: 'xAxis'
                        }),
                        renderSelectItem({
                            label: t('reports.editor.chart-settings.y-axis'),
                            name: 'yAxis',
                            mode: 'multiple'
                        })
                    ]
                }, void 0, true, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/report-configuration/components/chart-settings/chart-settings.tsx",
                    lineNumber: 77,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/report-configuration/components/chart-settings/chart-settings.tsx",
                lineNumber: 76,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_form_conditional_conditional__rspack_import_6.Conditional, {
                condition: (formValues)=>formValues.chartType === _Pimcore_modules_reports_constants__rspack_import_7.CHART_TYPE_BAR,
                watchFields: [
                    'chartType'
                ],
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_form_form_kit__rspack_import_3.FormKit.Panel, {
                    border: true,
                    theme: "fieldset",
                    title: t('reports.editor.chart-settings.settings'),
                    children: [
                        renderSelectItem({
                            label: t('reports.editor.chart-settings.x-axis'),
                            name: 'xAxis'
                        }),
                        renderSelectItem({
                            label: t('reports.editor.chart-settings.y-axis'),
                            name: 'yAxis',
                            mode: 'multiple'
                        })
                    ]
                }, void 0, true, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/report-configuration/components/chart-settings/chart-settings.tsx",
                    lineNumber: 90,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/report-configuration/components/chart-settings/chart-settings.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/report-configuration/components/chart-settings/chart-settings.tsx",
        lineNumber: 54,
        columnNumber: 10
    }, undefined);
};
_s(ChartSettings, "me3ninCpcTxDGw8k0B7D8rRNtUI=", false, function() {
    return [
        react_i18next__rspack_import_2.useTranslation,
        _report_configuration_styles__rspack_import_8.useStyles
    ];
});
_c = ChartSettings;
var _c;
$RefreshReg$(_c, "ChartSettings");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/reports-editor/components/report-configuration/components/column-configuration/column-configuration.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ColumnConfiguration: () => (ColumnConfiguration)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var react_i18next__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_2);
/* import */ var _dnd_kit_sortable__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/@dnd-kit/sortable/@dnd-kit/sortable");
/* import */ var _dnd_kit_sortable__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(_dnd_kit_sortable__rspack_import_3);
/* import */ var lodash__rspack_import_4 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_4_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_4);
/* import */ var _Pimcore_components_form_form_kit__rspack_import_5 = __webpack_require__("./js/src/core/components/form/form-kit.tsx");
/* import */ var _Pimcore_components_grid_grid__rspack_import_6 = __webpack_require__("./js/src/core/components/grid/grid.tsx");
/* import */ var _Pimcore_modules_reports_reports_editor_components_report_configuration_components_column_configuration_hooks_use_columns__rspack_import_7 = __webpack_require__("./js/src/core/modules/reports/reports-editor/components/report-configuration/components/column-configuration/hooks/use-columns.tsx");
/* import */ var _report_configuration_styles__rspack_import_8 = __webpack_require__("./js/src/core/modules/reports/reports-editor/components/report-configuration/report-configuration.styles.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 







const ColumnConfiguration = (param)=>{
    let { currentData, updateFormData } = param;
    _s();
    const { t } = (0,react_i18next__rspack_import_2.useTranslation)();
    const { styles } = (0,_report_configuration_styles__rspack_import_8.useStyles)();
    const tableColumns = (0,_Pimcore_modules_reports_reports_editor_components_report_configuration_components_column_configuration_hooks_use_columns__rspack_import_7.useColumns)();
    const columnConfigurationsData = (0,react__rspack_import_1.useMemo)(()=>(currentData === null || currentData === void 0 ? void 0 : currentData.columnConfigurations) ?? [], [
        currentData
    ]);
    const handleUpdateCellData = (param)=>{
        let { rowIndex, columnId, value } = param;
        const updatedColumnConfigurations = columnConfigurationsData === null || columnConfigurationsData === void 0 ? void 0 : columnConfigurationsData.map((item, index)=>{
            if (index === rowIndex) {
                return {
                    ...item,
                    [columnId]: value
                };
            }
            return item;
        });
        updateFormData === null || updateFormData === void 0 ? void 0 : updateFormData({
            ...currentData,
            columnConfigurations: updatedColumnConfigurations
        });
    };
    const handleDragEnd = (event)=>{
        const { active, over } = event;
        if (!(0,lodash__rspack_import_4.isNil)(active) && !(0,lodash__rspack_import_4.isNil)(over) && !(0,lodash__rspack_import_4.isEqual)(active.id, over.id)) {
            const oldIndex = columnConfigurationsData === null || columnConfigurationsData === void 0 ? void 0 : columnConfigurationsData.findIndex((row)=>row.id === active.id);
            const newIndex = columnConfigurationsData === null || columnConfigurationsData === void 0 ? void 0 : columnConfigurationsData.findIndex((row)=>row.id === over.id);
            if (oldIndex === -1 || newIndex === -1) return;
            const reorderedColumnConfigurations = (0,_dnd_kit_sortable__rspack_import_3.arrayMove)(columnConfigurationsData, oldIndex, newIndex);
            updateFormData === null || updateFormData === void 0 ? void 0 : updateFormData({
                ...currentData,
                columnConfigurations: reorderedColumnConfigurations
            });
        }
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_form_form_kit__rspack_import_5.FormKit.Panel, {
        title: t('reports.editor.manage-column-configuration.title'),
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_grid_grid__rspack_import_6.Grid, {
            autoWidth: true,
            className: styles.grid,
            columns: tableColumns,
            data: columnConfigurationsData,
            enableRowDrag: true,
            enableRowVirtualizer: true,
            handleDragEnd: handleDragEnd,
            onUpdateCellData: handleUpdateCellData,
            resizable: true,
            setRowId: (originalRow)=>originalRow.id
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/report-configuration/components/column-configuration/column-configuration.tsx",
            lineNumber: 67,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/report-configuration/components/column-configuration/column-configuration.tsx",
        lineNumber: 66,
        columnNumber: 10
    }, undefined);
};
_s(ColumnConfiguration, "Niqvc+e7cpMDCD65hW7cSOwhhvU=", false, function() {
    return [
        react_i18next__rspack_import_2.useTranslation,
        _report_configuration_styles__rspack_import_8.useStyles,
        _Pimcore_modules_reports_reports_editor_components_report_configuration_components_column_configuration_hooks_use_columns__rspack_import_7.useColumns
    ];
});
_c = ColumnConfiguration;
var _c;
$RefreshReg$(_c, "ColumnConfiguration");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/reports-editor/components/report-configuration/components/column-configuration/hooks/use-columns.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useColumns: () => (useColumns)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _tanstack_react_table__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/@tanstack/react-table/@tanstack/react-table");
/* import */ var _tanstack_react_table__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(_tanstack_react_table__rspack_import_2);
/* import */ var react_i18next__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_3);
/* import */ var _Pimcore_modules_reports_reports_editor_components_report_configuration_components_column_configuration_constants__rspack_import_4 = __webpack_require__("./js/src/core/modules/reports/reports-editor/components/report-configuration/components/column-configuration/constants.ts");
/* import */ var _Pimcore_components_grid_columns_default_cell__rspack_import_5 = __webpack_require__("./js/src/core/components/grid/columns/default-cell.tsx");
/* import */ var _Pimcore_components_grid_columns_helpers__rspack_import_6 = __webpack_require__("./js/src/core/components/grid/columns/helpers.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 





const useColumns = ()=>{
    _s();
    const columnHelper = (0,_tanstack_react_table__rspack_import_2.createColumnHelper)();
    const { t } = (0,react_i18next__rspack_import_3.useTranslation)();
    const withEditable = (cellData, editable)=>(0,_Pimcore_components_grid_columns_helpers__rspack_import_6.addColumnMeta)(cellData, {
            editable
        });
    return [
        columnHelper.accessor(_Pimcore_modules_reports_reports_editor_components_report_configuration_components_column_configuration_constants__rspack_import_4.COLUMN_KEYS.NAME, {
            header: t('reports.editor.manage-column-configuration.name'),
            meta: {
                type: 'text-cell'
            }
        }),
        columnHelper.accessor(_Pimcore_modules_reports_reports_editor_components_report_configuration_components_column_configuration_constants__rspack_import_4.COLUMN_KEYS.DISPLAY, {
            header: t('reports.editor.manage-column-configuration.display'),
            meta: {
                type: 'checkbox',
                editable: true
            }
        }),
        columnHelper.accessor(_Pimcore_modules_reports_reports_editor_components_report_configuration_components_column_configuration_constants__rspack_import_4.COLUMN_KEYS.EXPORT, {
            header: t('reports.editor.manage-column-configuration.export'),
            meta: {
                type: 'checkbox',
                editable: true
            }
        }),
        columnHelper.accessor(_Pimcore_modules_reports_reports_editor_components_report_configuration_components_column_configuration_constants__rspack_import_4.COLUMN_KEYS.ORDER, {
            header: t('reports.editor.manage-column-configuration.order'),
            cell: (cellData)=>{
                const disableOrderBy = cellData.row.original.disableOrderBy;
                return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_grid_columns_default_cell__rspack_import_5.DefaultCell, {
                    ...withEditable(cellData, !disableOrderBy)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/report-configuration/components/column-configuration/hooks/use-columns.tsx",
                    lineNumber: 46,
                    columnNumber: 14
                }, undefined);
            },
            meta: {
                type: 'checkbox'
            }
        }),
        columnHelper.accessor(_Pimcore_modules_reports_reports_editor_components_report_configuration_components_column_configuration_constants__rspack_import_4.COLUMN_KEYS.FILTER_TYPE, {
            header: t('reports.editor.manage-column-configuration.filter-type'),
            cell: (cellData)=>{
                const disableFilterable = cellData.row.original.disableFilterable;
                return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_grid_columns_default_cell__rspack_import_5.DefaultCell, {
                    ...withEditable(cellData, !disableFilterable)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/report-configuration/components/column-configuration/hooks/use-columns.tsx",
                    lineNumber: 55,
                    columnNumber: 14
                }, undefined);
            },
            meta: {
                type: 'select',
                config: {
                    options: [
                        {
                            label: t('reports.editor.manage-column-configuration.filter-type.empty'),
                            value: ''
                        },
                        {
                            label: t('reports.editor.manage-column-configuration.filter-type.text'),
                            value: 'string'
                        },
                        {
                            label: t('reports.editor.manage-column-configuration.filter-type.number'),
                            value: 'numeric'
                        },
                        {
                            label: t('reports.editor.manage-column-configuration.filter-type.date'),
                            value: 'date'
                        },
                        {
                            label: t('reports.editor.manage-column-configuration.filter-type.bool'),
                            value: 'boolean'
                        }
                    ]
                }
            }
        }),
        columnHelper.accessor(_Pimcore_modules_reports_reports_editor_components_report_configuration_components_column_configuration_constants__rspack_import_4.COLUMN_KEYS.DISPLAY_TYPE, {
            header: t('reports.editor.manage-column-configuration.display-type'),
            meta: {
                type: 'select',
                editable: true,
                config: {
                    options: [
                        {
                            label: t('reports.editor.manage-column-configuration.display-type.none'),
                            value: ''
                        },
                        {
                            label: t('reports.editor.manage-column-configuration.display-type.text'),
                            value: 'text'
                        },
                        {
                            label: t('reports.editor.manage-column-configuration.display-type.date'),
                            value: 'date'
                        },
                        {
                            label: t('reports.editor.manage-column-configuration.display-type.hide'),
                            value: 'hide'
                        }
                    ]
                }
            }
        }),
        columnHelper.accessor(_Pimcore_modules_reports_reports_editor_components_report_configuration_components_column_configuration_constants__rspack_import_4.COLUMN_KEYS.FILTER_DRILLDOWN, {
            header: t('reports.editor.manage-column-configuration.filter-drilldown'),
            cell: (cellData)=>{
                const disableDropdownFilterable = cellData.row.original.disableDropdownFilterable;
                return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_grid_columns_default_cell__rspack_import_5.DefaultCell, {
                    ...withEditable(cellData, !disableDropdownFilterable)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/report-configuration/components/column-configuration/hooks/use-columns.tsx",
                    lineNumber: 103,
                    columnNumber: 14
                }, undefined);
            },
            meta: {
                type: 'select',
                config: {
                    options: [
                        {
                            label: t('reports.editor.manage-column-configuration.filter-drilldown.empty'),
                            value: ''
                        },
                        {
                            label: t('reports.editor.manage-column-configuration.filter-drilldown.only-filter'),
                            value: 'only_filter'
                        },
                        {
                            label: t('reports.editor.manage-column-configuration.filter-drilldown.filter-and-show'),
                            value: 'filter_and_show'
                        }
                    ]
                }
            }
        }),
        columnHelper.accessor(_Pimcore_modules_reports_reports_editor_components_report_configuration_components_column_configuration_constants__rspack_import_4.COLUMN_KEYS.WIDTH, {
            header: t('reports.editor.manage-column-configuration.width'),
            meta: {
                type: 'number',
                editable: true
            }
        }),
        columnHelper.accessor(_Pimcore_modules_reports_reports_editor_components_report_configuration_components_column_configuration_constants__rspack_import_4.COLUMN_KEYS.LABEL, {
            header: t('reports.editor.manage-column-configuration.label'),
            cell: (cellData)=>{
                const disableLabel = cellData.row.original.disableLabel;
                return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_grid_columns_default_cell__rspack_import_5.DefaultCell, {
                    ...withEditable(cellData, !disableLabel)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/report-configuration/components/column-configuration/hooks/use-columns.tsx",
                    lineNumber: 130,
                    columnNumber: 14
                }, undefined);
            },
            meta: {
                type: 'text-cell'
            }
        }),
        columnHelper.accessor(_Pimcore_modules_reports_reports_editor_components_report_configuration_components_column_configuration_constants__rspack_import_4.COLUMN_KEYS.ACTION, {
            header: t('reports.editor.manage-column-configuration.action'),
            meta: {
                type: 'select',
                editable: true,
                config: {
                    options: [
                        {
                            label: t('reports.editor.manage-column-configuration.action.none'),
                            value: ''
                        },
                        {
                            label: t('reports.editor.manage-column-configuration.action.open-document'),
                            value: 'openDocument'
                        },
                        {
                            label: t('reports.editor.manage-column-configuration.action.open-asset'),
                            value: 'openAsset'
                        },
                        {
                            label: t('reports.editor.manage-column-configuration.action.open-object'),
                            value: 'openObject'
                        },
                        {
                            label: t('reports.editor.manage-column-configuration.action.open-url'),
                            value: 'openUrl'
                        }
                    ]
                }
            }
        })
    ];
};
_s(useColumns, "vu2xTFBfHkv41zWfADiErp1aWcA=", false, function() {
    return [
        react_i18next__rspack_import_3.useTranslation
    ];
});

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/reports-editor/components/report-configuration/components/general-settings/general-settings.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  GeneralSettings: () => (GeneralSettings)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var react_i18next__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_2);
/* import */ var _Pimcore_components_form_form_kit__rspack_import_3 = __webpack_require__("./js/src/core/components/form/form-kit.tsx");
/* import */ var _Pimcore_components_form_form__rspack_import_4 = __webpack_require__("./js/src/core/components/form/form.tsx");
/* import */ var _Pimcore_components_input_input__rspack_import_5 = __webpack_require__("./js/src/core/components/input/input.tsx");
/* import */ var _Pimcore_components_switch_switch__rspack_import_6 = __webpack_require__("./js/src/core/components/switch/switch.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 





const GeneralSettings = ()=>{
    _s();
    const { t } = (0,react_i18next__rspack_import_2.useTranslation)();
    const renderInputItem = (param)=>{
        let { label, name, disabled = false, tooltip } = param;
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_form_form__rspack_import_4.Form.Item, {
            label: label,
            name: name,
            tooltip: tooltip,
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_input_input__rspack_import_5.Input, {
                disabled: disabled
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/report-configuration/components/general-settings/general-settings.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/report-configuration/components/general-settings/general-settings.tsx",
            lineNumber: 26,
            columnNumber: 9
        }, undefined);
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_form_form_kit__rspack_import_3.FormKit.Panel, {
        title: t('reports.editor.general-settings.title'),
        children: [
            renderInputItem({
                label: t('reports.editor.general-settings.name-label'),
                name: 'name',
                disabled: true
            }),
            renderInputItem({
                label: t('reports.editor.general-settings.display-name-label'),
                name: 'niceName'
            }),
            renderInputItem({
                label: t('reports.editor.general-settings.icon-class-label'),
                name: 'iconClass'
            }),
            renderInputItem({
                label: t('reports.editor.general-settings.group-label'),
                name: 'group',
                tooltip: t('reports.editor.general-settings.group-tooltip')
            }),
            renderInputItem({
                label: t('reports.editor.general-settings.report-class-label'),
                name: 'reportClass'
            }),
            renderInputItem({
                label: t('reports.editor.general-settings.group-icon-class-label'),
                name: 'groupIconClass'
            }),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_form_form__rspack_import_4.Form.Item, {
                name: "menuShortcut",
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_switch_switch__rspack_import_6.Switch, {
                    labelRight: t('reports.editor.general-settings.shortcut-menu-label')
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/report-configuration/components/general-settings/general-settings.tsx",
                    lineNumber: 57,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/report-configuration/components/general-settings/general-settings.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/report-configuration/components/general-settings/general-settings.tsx",
        lineNumber: 29,
        columnNumber: 10
    }, undefined);
};
_s(GeneralSettings, "vu2xTFBfHkv41zWfADiErp1aWcA=", false, function() {
    return [
        react_i18next__rspack_import_2.useTranslation
    ];
});
_c = GeneralSettings;
var _c;
$RefreshReg$(_c, "GeneralSettings");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/reports-editor/components/report-configuration/components/permissions/permissions.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Permissions: () => (Permissions)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var react_i18next__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_2);
/* import */ var lodash__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_3);
/* import */ var _Pimcore_components_form_form_kit__rspack_import_4 = __webpack_require__("./js/src/core/components/form/form-kit.tsx");
/* import */ var _Pimcore_modules_user_roles_roles_api_slice_enhanced__rspack_import_5 = __webpack_require__("./js/src/core/modules/user/roles/roles-api-slice-enhanced.ts");
/* import */ var _Pimcore_modules_user_user_api_slice_enhanced__rspack_import_6 = __webpack_require__("./js/src/core/modules/user/user-api-slice-enhanced.ts");
/* import */ var _Pimcore_components_users_roles_dropdown_users_roles_dropdown__rspack_import_7 = __webpack_require__("./js/src/core/components/users-roles-dropdown/users-roles-dropdown.tsx");
/* import */ var _Pimcore_components_switch_switch__rspack_import_8 = __webpack_require__("./js/src/core/components/switch/switch.tsx");
/* import */ var _Pimcore_components_form_form__rspack_import_9 = __webpack_require__("./js/src/core/components/form/form.tsx");
/* import */ var _Pimcore_components_tag_list_tag_list__rspack_import_10 = __webpack_require__("./js/src/core/components/tag-list/tag-list.tsx");
/* import */ var _Pimcore_components_text_text__rspack_import_11 = __webpack_require__("./js/src/core/components/text/text.tsx");
/* import */ var _Pimcore_components_icon_icon__rspack_import_12 = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* import */ var _Pimcore_components_flex_flex__rspack_import_13 = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* import */ var _report_configuration_styles__rspack_import_14 = __webpack_require__("./js/src/core/modules/reports/reports-editor/components/report-configuration/report-configuration.styles.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 













const Permissions = (param)=>{
    let { currentData, updateFormData } = param;
    _s();
    const { t } = (0,react_i18next__rspack_import_2.useTranslation)();
    const { styles } = (0,_report_configuration_styles__rspack_import_14.useStyles)();
    const { data: roleList } = (0,_Pimcore_modules_user_roles_roles_api_slice_enhanced__rspack_import_5.useRoleGetShareCollectionQuery)();
    const { data: userList } = (0,_Pimcore_modules_user_user_api_slice_enhanced__rspack_import_6.useUserGetShareCollectionQuery)();
    const [isSharedGlobally, setIsSharedGlobally] = (0,react__rspack_import_1.useState)(currentData.sharedGlobally);
    const [isOpenDropdown, setIsOpenDropdown] = (0,react__rspack_import_1.useState)(false);
    const handleClose = ()=>{
        setIsOpenDropdown(false);
    };
    const initialUserList = (0,react__rspack_import_1.useMemo)(()=>{
        return currentData.sharedUserNames.map((item)=>{
            var _userList_items_find, _userList_items;
            return userList === null || userList === void 0 ? void 0 : (_userList_items = userList.items) === null || _userList_items === void 0 ? void 0 : (_userList_items_find = _userList_items.find((user)=>user.username === item)) === null || _userList_items_find === void 0 ? void 0 : _userList_items_find.id;
        }).filter((id)=>!(0,lodash__rspack_import_3.isUndefined)(id));
    }, [
        currentData.sharedUserNames
    ]);
    const initialRoleList = (0,react__rspack_import_1.useMemo)(()=>{
        return currentData.sharedRoleNames.map((item)=>{
            var _roleList_items_find, _roleList_items;
            return roleList === null || roleList === void 0 ? void 0 : (_roleList_items = roleList.items) === null || _roleList_items === void 0 ? void 0 : (_roleList_items_find = _roleList_items.find((role)=>role.name === item)) === null || _roleList_items_find === void 0 ? void 0 : _roleList_items_find.id;
        }).filter((id)=>!(0,lodash__rspack_import_3.isUndefined)(id));
    }, [
        currentData.sharedRoleNames
    ]);
    const handleApplyChanges = (param)=>{
        let { sharedUsers, sharedRoles } = param;
        const updatedSharedUsers = sharedUsers.map((id)=>{
            var _userList_items_find, _userList_items;
            return userList === null || userList === void 0 ? void 0 : (_userList_items = userList.items) === null || _userList_items === void 0 ? void 0 : (_userList_items_find = _userList_items.find((user)=>user.id === id)) === null || _userList_items_find === void 0 ? void 0 : _userList_items_find.username;
        }).filter((name)=>!(0,lodash__rspack_import_3.isUndefined)(name));
        const updatedSharedRoles = sharedRoles.map((id)=>{
            var _roleList_items_find, _roleList_items;
            return roleList === null || roleList === void 0 ? void 0 : (_roleList_items = roleList.items) === null || _roleList_items === void 0 ? void 0 : (_roleList_items_find = _roleList_items.find((role)=>role.id === id)) === null || _roleList_items_find === void 0 ? void 0 : _roleList_items_find.name;
        }).filter((name)=>!(0,lodash__rspack_import_3.isUndefined)(name));
        updateFormData === null || updateFormData === void 0 ? void 0 : updateFormData({
            ...currentData,
            sharedUserNames: updatedSharedUsers,
            sharedRoleNames: updatedSharedRoles
        });
        handleClose();
    };
    const renderIcon = (iconName, size)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_icon__rspack_import_12.Icon, {
            className: styles.permissionIcon,
            options: {
                width: size ?? 12,
                height: size ?? 12
            },
            value: iconName
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/report-configuration/components/permissions/permissions.tsx",
            lineNumber: 65,
            columnNumber: 42
        }, undefined);
    const getSharedUsersRolesList = ()=>{
        const usersList = [];
        const rolesList = [];
        const getTagItem = (param)=>{
            let { label, iconName } = param;
            return {
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_text_text__rspack_import_11.Text, {
                    ellipsis: true,
                    style: {
                        maxWidth: '148px'
                    },
                    type: "secondary",
                    children: label
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/report-configuration/components/permissions/permissions.tsx",
                    lineNumber: 76,
                    columnNumber: 17
                }, undefined),
                icon: renderIcon(iconName),
                bordered: false
            };
        };
        currentData.sharedUserNames.forEach((item)=>{
            usersList.push(getTagItem({
                label: item,
                iconName: 'user'
            }));
        });
        currentData.sharedRoleNames.forEach((item)=>{
            rolesList.push(getTagItem({
                label: item,
                iconName: 'shield'
            }));
        });
        return [
            usersList,
            rolesList
        ];
    };
    const renderRightLabelComponent = ()=>{
        const renderGlobalView = ()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_text_text__rspack_import_11.Text, {
                className: styles.permissionLabel,
                children: t('common.globally')
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/report-configuration/components/permissions/permissions.tsx",
                lineNumber: 97,
                columnNumber: 36
            }, undefined);
        const renderUserView = ()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(react_jsx_dev_runtime__rspack_import_0.Fragment, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_flex_flex__rspack_import_13.Flex, {
                        gap: 10,
                        children: [
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_text_text__rspack_import_11.Text, {
                                className: styles.permissionLabel,
                                children: [
                                    renderIcon('user'),
                                    " ",
                                    t('user-management.user'),
                                    " | ",
                                    renderIcon('shield'),
                                    " ",
                                    t('user-management.role')
                                ]
                            }, void 0, true, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/report-configuration/components/permissions/permissions.tsx",
                                lineNumber: 100,
                                columnNumber: 11
                            }, undefined),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_flex_flex__rspack_import_13.Flex, {
                                align: "center",
                                className: styles.permissionUpdateButton,
                                gap: 8,
                                onClick: ()=>{
                                    setIsOpenDropdown(!isOpenDropdown);
                                },
                                children: [
                                    renderIcon('edit', 16),
                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_text_text__rspack_import_11.Text, {
                                        className: styles.permissionUpdateButtonText,
                                        children: t('button.add-edit')
                                    }, void 0, false, {
                                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/report-configuration/components/permissions/permissions.tsx",
                                        lineNumber: 107,
                                        columnNumber: 13
                                    }, undefined)
                                ]
                            }, void 0, true, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/report-configuration/components/permissions/permissions.tsx",
                                lineNumber: 103,
                                columnNumber: 11
                            }, undefined)
                        ]
                    }, void 0, true, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/report-configuration/components/permissions/permissions.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, undefined),
                    isOpenDropdown && /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_users_roles_dropdown_users_roles_dropdown__rspack_import_7.UsersRolesDropdown, {
                        handleApplyChanges: handleApplyChanges,
                        handleClose: handleClose,
                        initialSharedRoles: initialRoleList,
                        initialSharedUsers: initialUserList,
                        placement: "top",
                        roleList: roleList,
                        userList: userList
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/report-configuration/components/permissions/permissions.tsx",
                        lineNumber: 110,
                        columnNumber: 28
                    }, undefined)
                ]
            }, void 0, true);
        return isSharedGlobally ? renderGlobalView() : renderUserView();
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_form_form_kit__rspack_import_4.FormKit.Panel, {
        title: t('reports.editor.permissions.title'),
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_form_form__rspack_import_9.Form.Item, {
                name: "sharedGlobally",
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_switch_switch__rspack_import_8.Switch, {
                    labelLeft: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_text_text__rspack_import_11.Text, {
                        children: t('grid.configuration.shared')
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/report-configuration/components/permissions/permissions.tsx",
                        lineNumber: 116,
                        columnNumber: 28
                    }, undefined),
                    labelRight: renderRightLabelComponent(),
                    onChange: (checked)=>{
                        setIsSharedGlobally(checked);
                    }
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/report-configuration/components/permissions/permissions.tsx",
                    lineNumber: 116,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/report-configuration/components/permissions/permissions.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, undefined),
            !isSharedGlobally && /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_tag_list_tag_list__rspack_import_10.TagList, {
                itemGap: "mini",
                list: getSharedUsersRolesList(),
                tagListItemClassNames: styles.permissionTag
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/report-configuration/components/permissions/permissions.tsx",
                lineNumber: 120,
                columnNumber: 29
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/report-configuration/components/permissions/permissions.tsx",
        lineNumber: 114,
        columnNumber: 10
    }, undefined);
};
_s(Permissions, "Y7+sJTxKAYGse/DoxBMw2DGcH5A=", false, function() {
    return [
        react_i18next__rspack_import_2.useTranslation,
        _report_configuration_styles__rspack_import_14.useStyles,
        _Pimcore_modules_user_roles_roles_api_slice_enhanced__rspack_import_5.useRoleGetShareCollectionQuery,
        _Pimcore_modules_user_user_api_slice_enhanced__rspack_import_6.useUserGetShareCollectionQuery
    ];
});
_c = Permissions;
var _c;
$RefreshReg$(_c, "Permissions");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/reports-editor/components/report-configuration/components/source-definition/source-definition.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SourceDefinition: () => (SourceDefinition)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var react_i18next__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_2);
/* import */ var lodash__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_3);
/* import */ var _Pimcore_app_depency_injection__rspack_import_4 = __webpack_require__("./js/src/core/app/depency-injection/index.ts");
/* import */ var _Pimcore_app_config_services_service_ids__rspack_import_5 = __webpack_require__("./js/src/core/app/config/services/service-ids.ts");
/* import */ var _Pimcore_components_form_form_kit__rspack_import_6 = __webpack_require__("./js/src/core/components/form/form-kit.tsx");
/* import */ var _Pimcore_components_form_form__rspack_import_7 = __webpack_require__("./js/src/core/components/form/form.tsx");
/* import */ var _Pimcore_components_text_text__rspack_import_8 = __webpack_require__("./js/src/core/components/text/text.tsx");
/* import */ var _Pimcore_components_dropdown_dropdown__rspack_import_9 = __webpack_require__("./js/src/core/components/dropdown/dropdown.tsx");
/* import */ var _Pimcore_components_icon_text_button_icon_text_button__rspack_import_10 = __webpack_require__("./js/src/core/components/icon-text-button/icon-text-button.tsx");
/* import */ var _Pimcore_components_select_select__rspack_import_11 = __webpack_require__("./js/src/core/components/select/select.tsx");
/* import */ var _Pimcore_components_flex_flex__rspack_import_12 = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* import */ var _Pimcore_modules_reports_reports_editor_reports_editor_styles__rspack_import_13 = __webpack_require__("./js/src/core/modules/reports/reports-editor/reports-editor.styles.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 












const SourceDefinition = (param)=>{
    let { form, currentData, updateFormData } = param;
    var _currentData_dataSourceConfig;
    _s();
    const { t } = (0,react_i18next__rspack_import_2.useTranslation)();
    const { styles } = (0,_Pimcore_modules_reports_reports_editor_reports_editor_styles__rspack_import_13.useStyles)();
    const [currentSourceDefinition, setCurrentSourceDefinition] = (0,react__rspack_import_1.useState)((_currentData_dataSourceConfig = currentData.dataSourceConfig) === null || _currentData_dataSourceConfig === void 0 ? void 0 : _currentData_dataSourceConfig.type);
    const isEmptySourceDefinitionConfig = (0,lodash__rspack_import_3.isUndefined)(currentSourceDefinition);
    const sourceDefinitionService = _Pimcore_app_depency_injection__rspack_import_4.container.get(_Pimcore_app_config_services_service_ids__rspack_import_5.serviceIds["DynamicTypes/CustomReportDefinitionRegistry"]);
    const adapters = sourceDefinitionService.getDynamicTypes();
    const currentAdapter = !isEmptySourceDefinitionConfig ? sourceDefinitionService.getDynamicType(currentSourceDefinition) : undefined;
    const sourceDefinitionOptions = (0,react__rspack_import_1.useMemo)(()=>adapters.map((adapter)=>({
                key: adapter.id,
                label: adapter.getLabel()
            })), [
        adapters
    ]);
    const handleSourceDefinitionTypeUpdate = (type)=>{
        form === null || form === void 0 ? void 0 : form.resetFields([
            'dataSourceConfig'
        ]);
        form === null || form === void 0 ? void 0 : form.setFieldsValue({
            dataSourceConfig: {
                type
            }
        });
        updateFormData === null || updateFormData === void 0 ? void 0 : updateFormData({
            ...currentData,
            dataSourceConfig: {
                type
            }
        });
        setCurrentSourceDefinition(type);
    };
    const renderAddButton = ()=>{
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_dropdown_dropdown__rspack_import_9.Dropdown, {
            menu: {
                items: sourceDefinitionOptions,
                onClick: (e)=>{
                    handleSourceDefinitionTypeUpdate(e.key);
                }
            },
            trigger: [
                'click'
            ],
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_text_button_icon_text_button__rspack_import_10.IconTextButton, {
                className: styles.dropdownButton,
                "data-testid": "report-source-add-button",
                icon: {
                    value: 'plus-circle'
                },
                children: t('add')
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/report-configuration/components/source-definition/source-definition.tsx",
                lineNumber: 66,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/report-configuration/components/source-definition/source-definition.tsx",
            lineNumber: 60,
            columnNumber: 12
        }, undefined);
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_form_form_kit__rspack_import_6.FormKit.Panel, {
        extra: isEmptySourceDefinitionConfig && renderAddButton(),
        extraPosition: "start",
        title: t('reports.editor.source-definition.title'),
        children: [
            isEmptySourceDefinitionConfig && /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_text_text__rspack_import_8.Text, {
                type: "secondary",
                children: t('reports.editor.source-definition.no-content')
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/report-configuration/components/source-definition/source-definition.tsx",
                lineNumber: 74,
                columnNumber: 41
            }, undefined),
            !isEmptySourceDefinitionConfig && /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_flex_flex__rspack_import_12.Flex, {
                gap: "extra-small",
                vertical: true,
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_form_form__rspack_import_7.Form.Group, {
                    name: "dataSourceConfig",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_form_form__rspack_import_7.Form.Item, {
                            label: t('reports.editor.source-definition.select-source-definition'),
                            name: "type",
                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_select_select__rspack_import_11.Select, {
                                "data-testid": "report-source-type-select",
                                fieldNames: {
                                    label: 'label',
                                    value: 'key'
                                },
                                onChange: (value)=>{
                                    handleSourceDefinitionTypeUpdate(value);
                                },
                                options: sourceDefinitionOptions
                            }, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/report-configuration/components/source-definition/source-definition.tsx",
                                lineNumber: 80,
                                columnNumber: 13
                            }, undefined)
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/report-configuration/components/source-definition/source-definition.tsx",
                            lineNumber: 79,
                            columnNumber: 11
                        }, undefined),
                        currentAdapter === null || currentAdapter === void 0 ? void 0 : currentAdapter.getCustomReportData({
                            currentData,
                            updateFormData,
                            form
                        })
                    ]
                }, void 0, true, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/report-configuration/components/source-definition/source-definition.tsx",
                    lineNumber: 78,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/report-configuration/components/source-definition/source-definition.tsx",
                lineNumber: 77,
                columnNumber: 42
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/report-configuration/components/source-definition/source-definition.tsx",
        lineNumber: 73,
        columnNumber: 10
    }, undefined);
};
_s(SourceDefinition, "P/6MorAsXfit/WeKpx6VTeEsFuE=", false, function() {
    return [
        react_i18next__rspack_import_2.useTranslation,
        _Pimcore_modules_reports_reports_editor_reports_editor_styles__rspack_import_13.useStyles
    ];
});
_c = SourceDefinition;
var _c;
$RefreshReg$(_c, "SourceDefinition");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/reports-editor/components/report-configuration/report-configuration.styles.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyles: () => (useStyles)
});
/* import */ var antd_style__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/antd-style/antd-style");
/* import */ var antd_style__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(antd_style__rspack_import_0);
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
const useStyles = (0,antd_style__rspack_import_0.createStyles)((param)=>{
    let { css, token } = param;
    return {
        grid: css`
      position: relative;
      width: 100%;
      max-height: 500px;
      overflow: auto;
        
      tbody {
        .default-cell__content {
          height: 32px;
        }
      }
    `,
        permissionLabel: css`
      color: ${token.colorTextLabel};
    `,
        permissionIcon: css`
      color: ${token.colorTextLabel};
    `,
        permissionUpdateButton: css`
      color: ${token.Button.defaultColor};

      .pimcore-icon {
        color: ${token.Button.defaultColor};
      }

      &:hover {
        cursor: pointer;
      }
    `,
        permissionUpdateButtonText: css`
      color: ${token.Button.defaultColor};
    `,
        permissionTag: css`
      .ant-tag {
        background-color: ${token.Colors.Neutral.Fill.colorFillTertiary};
      }
    `,
        chartSelect: css`
      width: 100%;
      max-width: 100% !important;
    `
    };
});

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/reports-editor/components/report-configuration/report-configuration.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ReportConfiguration: () => (ReportConfiguration)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var lodash__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_2);
/* import */ var react_i18next__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_3);
/* import */ var _Pimcore_modules_reports_custom_reports_api_slice_enhanced__rspack_import_4 = __webpack_require__("./js/src/core/modules/reports/custom-reports-api-slice-enhanced.ts");
/* import */ var _Pimcore_components_content_content__rspack_import_5 = __webpack_require__("./js/src/core/components/content/content.tsx");
/* import */ var _Pimcore_modules_reports_components_refetch_refetch__rspack_import_6 = __webpack_require__("./js/src/core/modules/reports/components/refetch/refetch.tsx");
/* import */ var _Pimcore_components_form_form_kit__rspack_import_7 = __webpack_require__("./js/src/core/components/form/form-kit.tsx");
/* import */ var _Pimcore_modules_reports_reports_editor_hooks_use_report_form_state__rspack_import_8 = __webpack_require__("./js/src/core/modules/reports/reports-editor/hooks/use-report-form-state.ts");
/* import */ var _Pimcore_components_portal_portal__rspack_import_9 = __webpack_require__("./js/src/core/components/portal/portal.ts");
/* import */ var _Pimcore_components_button_button__rspack_import_10 = __webpack_require__("./js/src/core/components/button/button.tsx");
/* import */ var _Pimcore_modules_reports_reports_editor_hooks_use_report_actions__rspack_import_11 = __webpack_require__("./js/src/core/modules/reports/reports-editor/hooks/use-report-actions.ts");
/* import */ var _Pimcore_modules_reports_reports_editor_reports_editor__rspack_import_12 = __webpack_require__("./js/src/core/modules/reports/reports-editor/reports-editor.tsx");
/* import */ var _Pimcore_modules_reports_reports_editor_components_report_configuration_components_general_settings_general_settings__rspack_import_13 = __webpack_require__("./js/src/core/modules/reports/reports-editor/components/report-configuration/components/general-settings/general-settings.tsx");
/* import */ var _Pimcore_modules_reports_reports_editor_components_report_configuration_components_source_definition_source_definition__rspack_import_14 = __webpack_require__("./js/src/core/modules/reports/reports-editor/components/report-configuration/components/source-definition/source-definition.tsx");
/* import */ var _Pimcore_modules_reports_reports_editor_components_report_configuration_components_column_configuration_column_configuration__rspack_import_15 = __webpack_require__("./js/src/core/modules/reports/reports-editor/components/report-configuration/components/column-configuration/column-configuration.tsx");
/* import */ var _Pimcore_modules_reports_reports_editor_components_report_configuration_components_chart_settings_chart_settings__rspack_import_16 = __webpack_require__("./js/src/core/modules/reports/reports-editor/components/report-configuration/components/chart-settings/chart-settings.tsx");
/* import */ var _Pimcore_modules_reports_reports_editor_components_report_configuration_components_permissions_permissions__rspack_import_17 = __webpack_require__("./js/src/core/modules/reports/reports-editor/components/report-configuration/components/permissions/permissions.tsx");
/* import */ var _Pimcore_modules_reports_reports_editor_components_report_configuration_helpers__rspack_import_18 = __webpack_require__("./js/src/core/modules/reports/reports-editor/components/report-configuration/helpers.ts");
/* import */ var _Pimcore_components_form_form__rspack_import_19 = __webpack_require__("./js/src/core/components/form/form.tsx");
/* import */ var _Pimcore_modules_reports_utils_reports_loader__rspack_import_20 = __webpack_require__("./js/src/core/modules/reports/utils/reports-loader.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 



















const ReportConfiguration = (param)=>{
    let { report, isActive, modifiedReports, setModifiedReports } = param;
    _s();
    const { isLoading, data, isFetching, refetch } = (0,_Pimcore_modules_reports_custom_reports_api_slice_enhanced__rspack_import_4.useCustomReportsReportQuery)({
        name: report.id
    });
    const { initializeForm, currentData, isDirty, updateFormData, markFormSaved } = (0,_Pimcore_modules_reports_reports_editor_hooks_use_report_form_state__rspack_import_8.useReportFormState)();
    const { updateReport } = (0,_Pimcore_modules_reports_reports_editor_hooks_use_report_actions__rspack_import_11.useReportActions)();
    const [form] = _Pimcore_components_form_form__rspack_import_19.Form.useForm();
    const [isUpdatingReport, setIsUpdatingReport] = (0,react__rspack_import_1.useState)(false);
    const dataSourceConfig = currentData === null || currentData === void 0 ? void 0 : currentData.dataSourceConfig;
    const { t } = (0,react_i18next__rspack_import_3.useTranslation)();
    const prevDataSourceTypeRef = (0,react__rspack_import_1.useRef)(undefined);
    (0,react__rspack_import_1.useEffect)(()=>{
        if (!(0,lodash__rspack_import_2.isUndefined)(data)) {
            initializeForm(data);
        }
    }, [
        data
    ]);
    (0,react__rspack_import_1.useEffect)(()=>{
        const prevType = prevDataSourceTypeRef.current;
        const currentType = dataSourceConfig === null || dataSourceConfig === void 0 ? void 0 : dataSourceConfig.type;
        prevDataSourceTypeRef.current = currentType;
        if (!(0,lodash__rspack_import_2.isNull)(currentData) && !(0,lodash__rspack_import_2.isUndefined)(currentType) && !(0,lodash__rspack_import_2.isUndefined)(prevType) && prevType !== currentType) {
            form.resetFields();
            updateFormData === null || updateFormData === void 0 ? void 0 : updateFormData({
                ...currentData,
                columnConfigurations: []
            });
        }
    }, [
        dataSourceConfig === null || dataSourceConfig === void 0 ? void 0 : dataSourceConfig.type
    ]);
    (0,react__rspack_import_1.useEffect)(()=>{
        if (isDirty) {
            setModifiedReports([
                ...modifiedReports,
                report.id
            ]);
        } else {
            setModifiedReports(modifiedReports.filter((item)=>item !== report.id));
        }
    }, [
        isDirty
    ]);
    const onValuesChange = (changedValues, allValues)=>{
        updateFormData === null || updateFormData === void 0 ? void 0 : updateFormData({
            ...currentData,
            ...allValues
        });
    };
    const handleSave = ()=>{
        if ((0,lodash__rspack_import_2.isNull)(currentData)) return;
        setIsUpdatingReport(true);
        const bundleCustomReportUpdateData = {
            ...currentData,
            ...(0,_Pimcore_modules_reports_reports_editor_components_report_configuration_helpers__rspack_import_18.normalizeDataSourceConfig)(currentData),
            ...(0,_Pimcore_modules_reports_reports_editor_components_report_configuration_helpers__rspack_import_18.normalizeChartData)(currentData),
            ...(0,_Pimcore_modules_reports_reports_editor_components_report_configuration_helpers__rspack_import_18.normalizeColumnConfigurations)(currentData),
            ...currentData.sharedGlobally && {
                sharedRoleNames: [],
                sharedUserNames: []
            }
        };
        void updateReport({
            name: report.id,
            bundleCustomReportUpdate: bundleCustomReportUpdateData
        }).then(()=>{
            markFormSaved();
            setIsUpdatingReport(false);
            void (0,_Pimcore_modules_reports_utils_reports_loader__rspack_import_20.loadReportsMenuItems)();
        });
    };
    const renderRefetchButton = ()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_portal_portal__rspack_import_9.Portal, {
            targetId: _Pimcore_modules_reports_reports_editor_reports_editor__rspack_import_12.REFETCH_BTN_PORTAL_ID,
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_reports_components_refetch_refetch__rspack_import_6.Refetch, {
                isFetching: isFetching,
                refetch: refetch
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/report-configuration/report-configuration.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/report-configuration/report-configuration.tsx",
            lineNumber: 114,
            columnNumber: 37
        }, undefined);
    const renderSaveButton = ()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_portal_portal__rspack_import_9.Portal, {
            targetId: _Pimcore_modules_reports_reports_editor_reports_editor__rspack_import_12.SAVE_BTN_PORTAL_ID,
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_button_button__rspack_import_10.Button, {
                "data-testid": "reports-editor-save-button",
                disabled: !isDirty,
                loading: isUpdatingReport,
                onClick: handleSave,
                type: "primary",
                children: t('save')
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/report-configuration/report-configuration.tsx",
                lineNumber: 118,
                columnNumber: 7
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/report-configuration/report-configuration.tsx",
            lineNumber: 117,
            columnNumber: 34
        }, undefined);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_content_content__rspack_import_5.Content, {
        loading: isLoading,
        padded: true,
        padding: {
            top: 'none',
            right: 'extra-small',
            bottom: 'none',
            left: 'extra-small'
        },
        children: !(0,lodash__rspack_import_2.isNull)(currentData) && /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_form_form_kit__rspack_import_7.FormKit, {
            formProps: {
                form,
                initialValues: currentData,
                onValuesChange
            },
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_reports_reports_editor_components_report_configuration_components_general_settings_general_settings__rspack_import_13.GeneralSettings, {}, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/report-configuration/report-configuration.tsx",
                    lineNumber: 133,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_reports_reports_editor_components_report_configuration_components_source_definition_source_definition__rspack_import_14.SourceDefinition, {
                    currentData: currentData,
                    form: form,
                    updateFormData: updateFormData
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/report-configuration/report-configuration.tsx",
                    lineNumber: 134,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_reports_reports_editor_components_report_configuration_components_column_configuration_column_configuration__rspack_import_15.ColumnConfiguration, {
                    currentData: currentData,
                    updateFormData: updateFormData
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/report-configuration/report-configuration.tsx",
                    lineNumber: 135,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_reports_reports_editor_components_report_configuration_components_chart_settings_chart_settings__rspack_import_16.ChartSettings, {
                    currentData: currentData
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/report-configuration/report-configuration.tsx",
                    lineNumber: 136,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_reports_reports_editor_components_report_configuration_components_permissions_permissions__rspack_import_17.Permissions, {
                    currentData: currentData,
                    updateFormData: updateFormData
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/report-configuration/report-configuration.tsx",
                    lineNumber: 137,
                    columnNumber: 9
                }, undefined),
                isActive && renderRefetchButton(),
                isActive && renderSaveButton()
            ]
        }, dataSourceConfig === null || dataSourceConfig === void 0 ? void 0 : dataSourceConfig.type, true, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/report-configuration/report-configuration.tsx",
            lineNumber: 128,
            columnNumber: 32
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/report-configuration/report-configuration.tsx",
        lineNumber: 122,
        columnNumber: 10
    }, undefined);
};
_s(ReportConfiguration, "Q4mJheOCYbr9XXwsPoNAX4bEGjw=", false, function() {
    return [
        _Pimcore_modules_reports_custom_reports_api_slice_enhanced__rspack_import_4.useCustomReportsReportQuery,
        _Pimcore_modules_reports_reports_editor_hooks_use_report_form_state__rspack_import_8.useReportFormState,
        _Pimcore_modules_reports_reports_editor_hooks_use_report_actions__rspack_import_11.useReportActions,
        _Pimcore_components_form_form__rspack_import_19.Form.useForm,
        react_i18next__rspack_import_3.useTranslation
    ];
});
_c = ReportConfiguration;
var _c;
$RefreshReg$(_c, "ReportConfiguration");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/reports-editor/components/reports-sidebar/components/toolbar/toolbar.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Toolbar: () => (Toolbar)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var react_i18next__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_2);
/* import */ var _Pimcore_components_toolbar_toolbar__rspack_import_3 = __webpack_require__("./js/src/core/components/toolbar/toolbar.tsx");
/* import */ var _Pimcore_modules_reports_components_refetch_refetch__rspack_import_4 = __webpack_require__("./js/src/core/modules/reports/components/refetch/refetch.tsx");
/* import */ var _Pimcore_components_icon_text_button_icon_text_button__rspack_import_5 = __webpack_require__("./js/src/core/components/icon-text-button/icon-text-button.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 




const Toolbar = (param)=>{
    let { isFetching, refetch, handleReportAdd } = param;
    _s();
    const { t } = (0,react_i18next__rspack_import_2.useTranslation)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_toolbar_toolbar__rspack_import_3.Toolbar, {
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_reports_components_refetch_refetch__rspack_import_4.Refetch, {
                isFetching: isFetching,
                refetch: refetch
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/reports-sidebar/components/toolbar/toolbar.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_text_button_icon_text_button__rspack_import_5.IconTextButton, {
                "data-testid": "reports-editor-add-button",
                icon: {
                    value: 'new'
                },
                onClick: handleReportAdd,
                type: "link",
                children: t('new')
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/reports-sidebar/components/toolbar/toolbar.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/reports-sidebar/components/toolbar/toolbar.tsx",
        lineNumber: 24,
        columnNumber: 10
    }, undefined);
};
_s(Toolbar, "vu2xTFBfHkv41zWfADiErp1aWcA=", false, function() {
    return [
        react_i18next__rspack_import_2.useTranslation
    ];
});
_c = Toolbar;
var _c;
$RefreshReg$(_c, "Toolbar");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/reports-editor/components/reports-sidebar/reports-sidebar.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ReportsSidebar: () => (ReportsSidebar)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var lodash__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_2);
/* import */ var react_i18next__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_3);
/* import */ var _Pimcore_components_content_layout_content_layout__rspack_import_4 = __webpack_require__("./js/src/core/components/content-layout/content-layout.tsx");
/* import */ var _Pimcore_components_content_content__rspack_import_5 = __webpack_require__("./js/src/core/components/content/content.tsx");
/* import */ var _Pimcore_components_flex_flex__rspack_import_6 = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* import */ var _Pimcore_components_icon_icon__rspack_import_7 = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* import */ var _Pimcore_components_text_text__rspack_import_8 = __webpack_require__("./js/src/core/components/text/text.tsx");
/* import */ var _Pimcore_components_dropdown_dropdown__rspack_import_9 = __webpack_require__("./js/src/core/components/dropdown/dropdown.tsx");
/* import */ var _Pimcore_components_search_input_search_input__rspack_import_10 = __webpack_require__("./js/src/core/components/search-input/search-input.tsx");
/* import */ var _Pimcore_modules_reports_reports_editor_components_reports_sidebar_components_toolbar_toolbar__rspack_import_11 = __webpack_require__("./js/src/core/modules/reports/reports-editor/components/reports-sidebar/components/toolbar/toolbar.tsx");
/* import */ var _Pimcore_components_modal_form_modal_hooks_use_form_modal__rspack_import_12 = __webpack_require__("./js/src/core/components/modal/form-modal/hooks/use-form-modal.tsx");
/* import */ var _Pimcore_modules_reports_reports_editor_hooks_use_report_actions__rspack_import_13 = __webpack_require__("./js/src/core/modules/reports/reports-editor/hooks/use-report-actions.ts");
/* import */ var _Pimcore_modules_reports_reports_editor_reports_editor_styles__rspack_import_14 = __webpack_require__("./js/src/core/modules/reports/reports-editor/reports-editor.styles.tsx");
/* import */ var _Pimcore_utils_type_utils__rspack_import_15 = __webpack_require__("./js/src/core/utils/type-utils.ts");
/* import */ var _Pimcore_components_spin_spin__rspack_import_16 = __webpack_require__("./js/src/core/components/spin/spin.tsx");
/* import */ var _Pimcore_modules_reports_utils_reports_loader__rspack_import_17 = __webpack_require__("./js/src/core/modules/reports/utils/reports-loader.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 
















const ReportsSidebar = (param)=>{
    let { isLoading, refetch, isFetching, reportsList, handleOpenReport, handleCloseReport } = param;
    _s();
    const [reportsListData, setReportsListData] = (0,react__rspack_import_1.useState)([]);
    const [contextItem, setContextItem] = (0,react__rspack_import_1.useState)(null);
    (0,react__rspack_import_1.useEffect)(()=>{
        if (!(0,lodash__rspack_import_2.isNil)(reportsList === null || reportsList === void 0 ? void 0 : reportsList.items)) {
            setReportsListData(reportsList.items);
        }
    }, [
        reportsList
    ]);
    const { styles } = (0,_Pimcore_modules_reports_reports_editor_reports_editor_styles__rspack_import_14.useStyles)();
    const { t } = (0,react_i18next__rspack_import_3.useTranslation)();
    const modal = (0,_Pimcore_components_modal_form_modal_hooks_use_form_modal__rspack_import_12.useFormModal)();
    const { addReport, cloneReport, deleteReport } = (0,_Pimcore_modules_reports_reports_editor_hooks_use_report_actions__rspack_import_13.useReportActions)();
    const handleReportAdd = ()=>{
        modal.input({
            label: t('reports.editor.add.content'),
            rule: {
                pattern: /^[a-zA-Z0-9_-]+$/,
                message: t('reports.editor.content.validation.message')
            },
            onOk: async (value)=>{
                var _updatedData_items;
                await addReport({
                    bundleCustomReportAdd: {
                        name: value
                    }
                });
                const { data: updatedData } = await refetch();
                const addedReport = updatedData === null || updatedData === void 0 ? void 0 : (_updatedData_items = updatedData.items) === null || _updatedData_items === void 0 ? void 0 : _updatedData_items.find((item)=>item.id === value);
                !(0,lodash__rspack_import_2.isUndefined)(addedReport) && handleOpenReport(addedReport);
            }
        });
    };
    const handleReportClone = ()=>{
        modal.input({
            label: t('reports.editor.clone.content'),
            rule: {
                pattern: /^[a-zA-Z0-9_-]+$/,
                message: t('reports.editor.content.validation.message')
            },
            onOk: async (value)=>{
                var _updatedData_items;
                if ((0,lodash__rspack_import_2.isNil)(contextItem)) return;
                await cloneReport({
                    name: contextItem.id,
                    bundleCustomReportClone: {
                        newName: value
                    }
                });
                const { data: updatedData } = await refetch();
                void (0,_Pimcore_modules_reports_utils_reports_loader__rspack_import_17.loadReportsMenuItems)();
                const clonedReport = updatedData === null || updatedData === void 0 ? void 0 : (_updatedData_items = updatedData.items) === null || _updatedData_items === void 0 ? void 0 : _updatedData_items.find((item)=>item.id === value);
                !(0,lodash__rspack_import_2.isUndefined)(clonedReport) && handleOpenReport(clonedReport);
            }
        });
    };
    const handleReportDelete = ()=>{
        modal.confirm({
            title: t('delete'),
            content: t('reports.editor.delete.content', {
                reportName: contextItem === null || contextItem === void 0 ? void 0 : contextItem.text
            }),
            onOk: async ()=>{
                if ((0,lodash__rspack_import_2.isNil)(contextItem)) return;
                void deleteReport({
                    name: contextItem.id
                }).then(()=>{
                    handleCloseReport(contextItem.id);
                    void (0,_Pimcore_modules_reports_utils_reports_loader__rspack_import_17.loadReportsMenuItems)();
                });
            }
        });
    };
    const handleSearch = (value)=>{
        var _reportsList_items;
        if ((0,_Pimcore_utils_type_utils__rspack_import_15.isEmptyValue)(value)) {
            setReportsListData((reportsList === null || reportsList === void 0 ? void 0 : reportsList.items) ?? []);
            return;
        }
        const filteredReportsList = (reportsList === null || reportsList === void 0 ? void 0 : (_reportsList_items = reportsList.items) === null || _reportsList_items === void 0 ? void 0 : _reportsList_items.filter((item)=>item.text.toLowerCase().includes(value.toLowerCase()))) ?? [];
        setReportsListData(filteredReportsList);
    };
    const dropdownItems = [
        {
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_icon__rspack_import_7.Icon, {
                value: "copy-03"
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/reports-sidebar/reports-sidebar.tsx",
                lineNumber: 126,
                columnNumber: 11
            }, undefined),
            key: 'copy',
            label: t('clone'),
            onClick: handleReportClone
        },
        {
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_icon__rspack_import_7.Icon, {
                value: "trash"
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/reports-sidebar/reports-sidebar.tsx",
                lineNumber: 131,
                columnNumber: 11
            }, undefined),
            key: 'delete',
            label: t('delete'),
            onClick: handleReportDelete
        }
    ];
    const renderReportsList = ()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(react_jsx_dev_runtime__rspack_import_0.Fragment, {
            children: reportsListData.map((item)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_dropdown_dropdown__rspack_import_9.Dropdown, {
                    menu: {
                        items: dropdownItems
                    },
                    onOpenChange: (open)=>{
                        if (open) setContextItem(item);
                    },
                    trigger: [
                        'contextMenu'
                    ],
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_flex_flex__rspack_import_6.Flex, {
                        align: "center",
                        className: styles.sidebarReportItem,
                        "data-testid": `reports-editor-sidebar-item-${item.id}`,
                        gap: "mini",
                        onClick: ()=>{
                            handleOpenReport(item);
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_icon__rspack_import_7.Icon, {
                                className: styles.sidebarReportItemIcon,
                                value: "chart-scatter"
                            }, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/reports-sidebar/reports-sidebar.tsx",
                                lineNumber: 145,
                                columnNumber: 13
                            }, undefined),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_text_text__rspack_import_8.Text, {
                                className: styles.sidebarReportItemTitle,
                                children: item.text
                            }, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/reports-sidebar/reports-sidebar.tsx",
                                lineNumber: 146,
                                columnNumber: 13
                            }, undefined)
                        ]
                    }, void 0, true, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/reports-sidebar/reports-sidebar.tsx",
                        lineNumber: 142,
                        columnNumber: 11
                    }, undefined)
                }, item.id, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/reports-sidebar/reports-sidebar.tsx",
                    lineNumber: 137,
                    columnNumber: 36
                }, undefined))
        }, void 0, false);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_content_layout_content_layout__rspack_import_4.ContentLayout, {
        renderToolbar: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_reports_reports_editor_components_reports_sidebar_components_toolbar_toolbar__rspack_import_11.Toolbar, {
            handleReportAdd: handleReportAdd,
            isFetching: isFetching,
            refetch: refetch
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/reports-sidebar/reports-sidebar.tsx",
            lineNumber: 152,
            columnNumber: 40
        }, undefined),
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_content_content__rspack_import_5.Content, {
            loading: isLoading,
            padded: true,
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_search_input_search_input__rspack_import_10.SearchInput, {
                    onChange: (e)=>{
                        handleSearch(e.target.value);
                    },
                    placeholder: t('search'),
                    withoutAddon: true
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/reports-sidebar/reports-sidebar.tsx",
                    lineNumber: 154,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_flex_flex__rspack_import_6.Flex, {
                    className: "h-full",
                    gap: "mini",
                    justify: isFetching ? 'center' : 'start',
                    vertical: true,
                    children: isFetching ? /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_flex_flex__rspack_import_6.Flex, {
                        align: "center",
                        justify: "center",
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_spin_spin__rspack_import_16.Spin, {
                            asContainer: true,
                            tip: "Loading"
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/reports-sidebar/reports-sidebar.tsx",
                            lineNumber: 160,
                            columnNumber: 17
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/reports-sidebar/reports-sidebar.tsx",
                        lineNumber: 159,
                        columnNumber: 25
                    }, undefined) : renderReportsList()
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/reports-sidebar/reports-sidebar.tsx",
                    lineNumber: 158,
                    columnNumber: 9
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/reports-sidebar/reports-sidebar.tsx",
            lineNumber: 153,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/components/reports-sidebar/reports-sidebar.tsx",
        lineNumber: 152,
        columnNumber: 10
    }, undefined);
};
_s(ReportsSidebar, "jqnUtv+UttvTaViCdalEUdn+qTY=", false, function() {
    return [
        _Pimcore_modules_reports_reports_editor_reports_editor_styles__rspack_import_14.useStyles,
        react_i18next__rspack_import_3.useTranslation,
        _Pimcore_components_modal_form_modal_hooks_use_form_modal__rspack_import_12.useFormModal,
        _Pimcore_modules_reports_reports_editor_hooks_use_report_actions__rspack_import_13.useReportActions
    ];
});
_c = ReportsSidebar;
var _c;
$RefreshReg$(_c, "ReportsSidebar");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/reports-editor/reports-editor.styles.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyles: () => (useStyles)
});
/* import */ var antd_style__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/antd-style/antd-style");
/* import */ var antd_style__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(antd_style__rspack_import_0);
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
const useStyles = (0,antd_style__rspack_import_0.createStyles)((param)=>{
    let { css, token } = param;
    return {
        sidebarReportItem: css`
      padding: 2px ${token.paddingXS}px;
      
      &:hover {
        background-color: ${token.controlItemBgActiveHover};
        cursor: pointer;
      }
    `,
        sidebarReportItemIcon: css`
      color: ${token.colorIconTree};
    `,
        sidebarReportItemTitle: css`
      color: ${token.colorTextTreeElement};
    `,
        tabsContainer: css`
      height: 100%;
        
      .ant-tabs-content,
      .ant-tabs-tabpane {
        height: 100%;
      }
    `,
        tabs: css`
      .ant-tabs-tab {
        padding: ${token.paddingSM}px ${token.paddingXXS}px !important;
      }
    `,
        dropdownButton: css`
      padding: 0 ${token.paddingXS}px;
    `
    };
});

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/reports-editor/reports-editor.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  REFETCH_BTN_PORTAL_ID: () => (REFETCH_BTN_PORTAL_ID),
  ReportsEditor: () => (ReportsEditor),
  SAVE_BTN_PORTAL_ID: () => (SAVE_BTN_PORTAL_ID)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var lodash__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_2);
/* import */ var _Pimcore_components_predefined_layouts_config_config_layout__rspack_import_3 = __webpack_require__("./js/src/core/components/predefined-layouts/config/config-layout.tsx");
/* import */ var _Pimcore_components_content_layout_content_layout__rspack_import_4 = __webpack_require__("./js/src/core/components/content-layout/content-layout.tsx");
/* import */ var _Pimcore_components_tabs_tabs__rspack_import_5 = __webpack_require__("./js/src/core/components/tabs/tabs.tsx");
/* import */ var _Pimcore_components_toolbar_toolbar__rspack_import_6 = __webpack_require__("./js/src/core/components/toolbar/toolbar.tsx");
/* import */ var _Pimcore_components_content_content__rspack_import_7 = __webpack_require__("./js/src/core/components/content/content.tsx");
/* import */ var _Pimcore_modules_reports_reports_editor_components_reports_sidebar_reports_sidebar__rspack_import_8 = __webpack_require__("./js/src/core/modules/reports/reports-editor/components/reports-sidebar/reports-sidebar.tsx");
/* import */ var _Pimcore_modules_reports_reports_editor_components_report_configuration_report_configuration__rspack_import_9 = __webpack_require__("./js/src/core/modules/reports/reports-editor/components/report-configuration/report-configuration.tsx");
/* import */ var _Pimcore_modules_reports_custom_reports_api_slice_enhanced__rspack_import_10 = __webpack_require__("./js/src/core/modules/reports/custom-reports-api-slice-enhanced.ts");
/* import */ var _Pimcore_components_portal_portal_slot__rspack_import_11 = __webpack_require__("./js/src/core/components/portal/portal-slot.tsx");
/* import */ var _Pimcore_modules_auth_permission_helper__rspack_import_12 = __webpack_require__("./js/src/core/modules/auth/permission-helper.ts");
/* import */ var _Pimcore_modules_auth_enums_user_permission__rspack_import_13 = __webpack_require__("./js/src/core/modules/auth/enums/user-permission.ts");
/* import */ var _reports_editor_styles__rspack_import_14 = __webpack_require__("./js/src/core/modules/reports/reports-editor/reports-editor.styles.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 













const REFETCH_BTN_PORTAL_ID = 'reports-editor-toolbar-refetch-btn';
const SAVE_BTN_PORTAL_ID = 'reports-editor-toolbar-save-btn';
const ReportsEditor = ()=>{
    _s();
    const hasPermission = (0,_Pimcore_modules_auth_permission_helper__rspack_import_12.isAllowed)(_Pimcore_modules_auth_enums_user_permission__rspack_import_13.UserPermission.ReportsConfig);
    const { data: reportsConfigTreeData, isLoading, isFetching, refetch } = (0,_Pimcore_modules_reports_custom_reports_api_slice_enhanced__rspack_import_10.useCustomReportsConfigGetTreeQuery)({
        page: 1,
        pageSize: 9999
    }, {
        skip: !hasPermission
    });
    const [openedReports, setOpenedReports] = (0,react__rspack_import_1.useState)([]);
    const [activeTabKey, setActiveTabKey] = (0,react__rspack_import_1.useState)(undefined);
    const [modifiedReports, setModifiedReports] = (0,react__rspack_import_1.useState)([]);
    const { styles } = (0,_reports_editor_styles__rspack_import_14.useStyles)();
    const tabItems = (0,react__rspack_import_1.useMemo)(()=>{
        var _reportsConfigTreeData_items;
        const existingReportIds = new Set(reportsConfigTreeData === null || reportsConfigTreeData === void 0 ? void 0 : (_reportsConfigTreeData_items = reportsConfigTreeData.items) === null || _reportsConfigTreeData_items === void 0 ? void 0 : _reportsConfigTreeData_items.map((report)=>report.id));
        return openedReports.filter((report)=>existingReportIds.has(report.id)).map((report)=>({
                key: report.id,
                label: `${report.text} ${modifiedReports.includes(report.id) ? '*' : ''}`,
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_reports_reports_editor_components_report_configuration_report_configuration__rspack_import_9.ReportConfiguration, {
                    isActive: activeTabKey === report.id,
                    modifiedReports: modifiedReports,
                    report: report,
                    setModifiedReports: setModifiedReports
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/reports-editor.tsx",
                    lineNumber: 51,
                    columnNumber: 17
                }, undefined)
            }));
    }, [
        reportsConfigTreeData,
        openedReports,
        activeTabKey,
        modifiedReports
    ]);
    const handleOpenReport = (report)=>{
        const isAlreadyOpened = openedReports.some((item)=>item.id === report.id);
        if (!isAlreadyOpened) {
            setOpenedReports([
                ...openedReports,
                report
            ]);
        }
        setActiveTabKey(report.id);
    };
    const handleCloseTab = (key)=>{
        const targetIndex = openedReports.findIndex((tab)=>(tab === null || tab === void 0 ? void 0 : tab.id) === key);
        const updatedOpenedReports = openedReports.filter((report)=>report.id !== key);
        if (key === activeTabKey) {
            const prevTab = openedReports[targetIndex - 1];
            const nextTab = openedReports[targetIndex + 1];
            const prevTabId = prevTab === null || prevTab === void 0 ? void 0 : prevTab.id;
            const nextTabId = !(0,lodash__rspack_import_2.isUndefined)(nextTab) ? nextTab === null || nextTab === void 0 ? void 0 : nextTab.id : undefined;
            const activeId = !(0,lodash__rspack_import_2.isUndefined)(prevTab) ? prevTabId : nextTabId;
            setActiveTabKey(activeId);
        }
        setOpenedReports(updatedOpenedReports);
    };
    const handleChangeTab = (key)=>{
        setActiveTabKey(key);
    };
    const mainContent = ()=>{
        if ((0,lodash__rspack_import_2.isUndefined)(activeTabKey)) {
            return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_content_content__rspack_import_7.Content, {
                none: true
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/reports-editor.tsx",
                lineNumber: 79,
                columnNumber: 14
            }, undefined);
        }
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_content_layout_content_layout__rspack_import_4.ContentLayout, {
            renderToolbar: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_toolbar_toolbar__rspack_import_6.Toolbar, {
                justify: "space-between",
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_portal_portal_slot__rspack_import_11.PortalSlot, {
                        id: REFETCH_BTN_PORTAL_ID
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/reports-editor.tsx",
                        lineNumber: 82,
                        columnNumber: 13
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_portal_portal_slot__rspack_import_11.PortalSlot, {
                        id: SAVE_BTN_PORTAL_ID
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/reports-editor.tsx",
                        lineNumber: 83,
                        columnNumber: 13
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/reports-editor.tsx",
                lineNumber: 81,
                columnNumber: 42
            }, undefined),
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_tabs_tabs__rspack_import_5.Tabs, {
                activeKey: activeTabKey,
                className: styles.tabs,
                hasStickyHeader: true,
                items: tabItems,
                onChange: handleChangeTab,
                onClose: handleCloseTab,
                rootClassName: styles.tabsContainer
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/reports-editor.tsx",
                lineNumber: 85,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/reports-editor.tsx",
            lineNumber: 81,
            columnNumber: 12
        }, undefined);
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_predefined_layouts_config_config_layout__rspack_import_3.ConfigLayout, {
        leftItem: {
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_reports_reports_editor_components_reports_sidebar_reports_sidebar__rspack_import_8.ReportsSidebar, {
                handleCloseReport: handleCloseTab,
                handleOpenReport: handleOpenReport,
                isFetching: isFetching,
                isLoading: isLoading,
                refetch: refetch,
                reportsList: reportsConfigTreeData
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/reports-editor.tsx",
                lineNumber: 89,
                columnNumber: 15
            }, undefined)
        },
        rightItem: {
            children: mainContent()
        }
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-editor/reports-editor.tsx",
        lineNumber: 88,
        columnNumber: 10
    }, undefined);
};
_s(ReportsEditor, "Nq11a1yjaijMzamSpEKNUf/yaS4=", false, function() {
    return [
        _Pimcore_modules_reports_custom_reports_api_slice_enhanced__rspack_import_10.useCustomReportsConfigGetTreeQuery,
        _reports_editor_styles__rspack_import_14.useStyles
    ];
});
_c = ReportsEditor;
var _c;
$RefreshReg$(_c, "ReportsEditor");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/reports-view/components/report-chart/components/bar-chart/bar-chart.styles.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyles: () => (useStyles)
});
/* import */ var antd_style__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/antd-style/antd-style");
/* import */ var antd_style__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(antd_style__rspack_import_0);
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
const useStyles = (0,antd_style__rspack_import_0.createStyles)((param)=>{
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

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/reports-view/components/report-chart/components/bar-chart/bar-chart.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  BarChart: () => (BarChart)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _ant_design_plots__rspack_import_10 = __webpack_require__("./node_modules/@ant-design/plots/es/components/column/index.js");
/* import */ var lodash__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_2);
/* import */ var _Pimcore_components_flex_flex__rspack_import_3 = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* import */ var _Pimcore_modules_reports_reports_view_components_report_chart_utils_helpers__rspack_import_4 = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-chart/utils/helpers.ts");
/* import */ var _Pimcore_modules_reports_reports_view_components_report_chart_components_legend_item_legend_item__rspack_import_5 = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-chart/components/legend-item/legend-item.tsx");
/* import */ var _Pimcore_modules_reports_reports_view_components_report_chart_hooks_use_show_more__rspack_import_6 = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-chart/hooks/use-show-more.ts");
/* import */ var _Pimcore_modules_reports_reports_view_components_report_chart_components_show_more_btn_show_more_btn__rspack_import_7 = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-chart/components/show-more-btn/show-more-btn.tsx");
/* import */ var _Pimcore_utils_hooks_use_element_resize__rspack_import_8 = __webpack_require__("./js/src/core/utils/hooks/use-element-resize.ts");
/* import */ var _bar_chart_styles__rspack_import_9 = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-chart/components/bar-chart/bar-chart.styles.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 









const CHART_FIELD_NAME_KEY = 'name';
const CHART_FIELD_VALUE_KEY = 'value';
const CHART_HEIGHT = 250;
const BarChart = (param)=>{
    let { chartData, reportData, chartLabelMap, chartConfig, showLegend = true } = param;
    _s();
    const { styles } = (0,_bar_chart_styles__rspack_import_9.useStyles)();
    const chartRef = (0,react__rspack_import_1.useRef)(null);
    const { width: chartWidth } = (0,_Pimcore_utils_hooks_use_element_resize__rspack_import_8["default"])(chartRef);
    const [colorList] = (0,react__rspack_import_1.useState)((0,_Pimcore_modules_reports_reports_view_components_report_chart_utils_helpers__rspack_import_4.generateColorMap)(chartData.length));
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
                [CHART_FIELD_VALUE_KEY]: (0,lodash__rspack_import_2.toNumber)(value)
            };
        });
    });
    const seriesKeys = [
        ...new Set(formattedChartData.map((item)=>item.name))
    ];
    const { isExpanded, visibleItems, toggle, initialVisibleCount } = (0,_Pimcore_modules_reports_reports_view_components_report_chart_hooks_use_show_more__rspack_import_6.useShowMore)(seriesKeys);
    const [activeSeries, setActiveSeries] = (0,react__rspack_import_1.useState)(seriesKeys);
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
    const filteredData = (0,react__rspack_import_1.useMemo)(()=>{
        return formattedChartData.filter((item)=>activeSeries.includes(item.name));
    }, [
        formattedChartData,
        activeSeries
    ]);
    const config = (0,react__rspack_import_1.useMemo)(()=>({
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
                        return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_flex_flex__rspack_import_3.Flex, {
                            gap: "mini",
                            vertical: true,
                            children: [
                                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)("div", {
                                    className: styles.tooltipTitle,
                                    children: title
                                }, void 0, false, {
                                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/bar-chart/bar-chart.tsx",
                                    lineNumber: 94,
                                    columnNumber: 13
                                }, undefined),
                                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_flex_flex__rspack_import_3.Flex, {
                                    vertical: true,
                                    children: items.map((item)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_flex_flex__rspack_import_3.Flex, {
                                            gap: "small",
                                            justify: "space-between",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_flex_flex__rspack_import_3.Flex, {
                                                    align: 'center',
                                                    gap: "mini",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)("div", {
                                                            className: styles.circle,
                                                            style: {
                                                                backgroundColor: item.color
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/bar-chart/bar-chart.tsx",
                                                            lineNumber: 98,
                                                            columnNumber: 21
                                                        }, undefined),
                                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)("div", {
                                                            children: chartLabelMap[item.name] ?? item.name
                                                        }, void 0, false, {
                                                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/bar-chart/bar-chart.tsx",
                                                            lineNumber: 101,
                                                            columnNumber: 21
                                                        }, undefined)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/bar-chart/bar-chart.tsx",
                                                    lineNumber: 97,
                                                    columnNumber: 19
                                                }, undefined),
                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)("div", {
                                                    className: styles.tooltipItemValue,
                                                    children: item.value
                                                }, void 0, false, {
                                                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/bar-chart/bar-chart.tsx",
                                                    lineNumber: 103,
                                                    columnNumber: 19
                                                }, undefined)
                                            ]
                                        }, item.name, true, {
                                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/bar-chart/bar-chart.tsx",
                                            lineNumber: 96,
                                            columnNumber: 34
                                        }, undefined))
                                }, void 0, false, {
                                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/bar-chart/bar-chart.tsx",
                                    lineNumber: 95,
                                    columnNumber: 13
                                }, undefined)
                            ]
                        }, void 0, true, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/bar-chart/bar-chart.tsx",
                            lineNumber: 93,
                            columnNumber: 15
                        }, undefined);
                    }
                }
            }
        }), [
        filteredData,
        chartWidth
    ]);
    const mergedConfig = chartConfig === undefined ? config : (0,lodash__rspack_import_2.merge)({}, config, chartConfig);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)("div", {
        className: "m-t-mini",
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)("div", {
                ref: chartRef,
                style: {
                    overflowX: 'hidden'
                },
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_ant_design_plots__rspack_import_10["default"], {
                    ...mergedConfig
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/bar-chart/bar-chart.tsx",
                    lineNumber: 115,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/bar-chart/bar-chart.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, undefined),
            showLegend ? /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_flex_flex__rspack_import_3.Flex, {
                gap: "mini",
                justify: "center",
                wrap: "wrap",
                children: visibleItems.map((key, index)=>{
                    const isActive = activeSeries.includes(key);
                    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_reports_reports_view_components_report_chart_components_legend_item_legend_item__rspack_import_5.LegendItem, {
                        disabled: !isActive,
                        handleClick: ()=>{
                            handleLegendItemClick(key);
                        },
                        label: chartLabelMap[key] ?? key,
                        markerColor: colorMap[key]
                    }, `${index}-${key}`, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/bar-chart/bar-chart.tsx",
                        lineNumber: 121,
                        columnNumber: 16
                    }, undefined);
                })
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/bar-chart/bar-chart.tsx",
                lineNumber: 118,
                columnNumber: 21
            }, undefined) : null,
            (seriesKeys === null || seriesKeys === void 0 ? void 0 : seriesKeys.length) > initialVisibleCount && /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_reports_reports_view_components_report_chart_components_show_more_btn_show_more_btn__rspack_import_7.ShowMoreBtn, {
                isExpanded: isExpanded,
                toggle: toggle
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/bar-chart/bar-chart.tsx",
                lineNumber: 127,
                columnNumber: 52
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/bar-chart/bar-chart.tsx",
        lineNumber: 111,
        columnNumber: 10
    }, undefined);
};
_s(BarChart, "euukTnXj3P4K6k30wSeqaYeuB6E=", false, function() {
    return [
        _bar_chart_styles__rspack_import_9.useStyles,
        _Pimcore_utils_hooks_use_element_resize__rspack_import_8["default"],
        _Pimcore_modules_reports_reports_view_components_report_chart_hooks_use_show_more__rspack_import_6.useShowMore
    ];
});
_c = BarChart;
var _c;
$RefreshReg$(_c, "BarChart");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/reports-view/components/report-chart/components/legend-item/legend-item.styles.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyles: () => (useStyles)
});
/* import */ var antd_style__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/antd-style/antd-style");
/* import */ var antd_style__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(antd_style__rspack_import_0);
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
const useStyles = (0,antd_style__rspack_import_0.createStyles)((param)=>{
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

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/reports-view/components/report-chart/components/legend-item/legend-item.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  LegendItem: () => (LegendItem)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var classnames__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/classnames/classnames");
/* import */ var classnames__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(classnames__rspack_import_2);
/* import */ var lodash__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_3);
/* import */ var _Pimcore_components_flex_flex__rspack_import_4 = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* import */ var _Pimcore_components_text_text__rspack_import_5 = __webpack_require__("./js/src/core/components/text/text.tsx");
/* import */ var _legend_item_styles__rspack_import_6 = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-chart/components/legend-item/legend-item.styles.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 





const LegendItem = (param)=>{
    let { label, value, disabled, markerColor, handleClick } = param;
    _s();
    const { styles } = (0,_legend_item_styles__rspack_import_6.useStyles)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_flex_flex__rspack_import_4.Flex, {
        align: "center",
        className: classnames__rspack_import_2_default()(styles.legendItem, {
            [styles.legendItemDisabled]: disabled
        }),
        onClick: handleClick,
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)("div", {
                className: styles.circle,
                style: {
                    background: markerColor
                }
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/legend-item/legend-item.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_flex_flex__rspack_import_4.Flex, {
                gap: "small",
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_text_text__rspack_import_5.Text, {
                        type: "secondary",
                        children: label
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/legend-item/legend-item.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, undefined),
                    !(0,lodash__rspack_import_3.isUndefined)(value) && /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_text_text__rspack_import_5.Text, {
                        children: value
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/legend-item/legend-item.tsx",
                        lineNumber: 35,
                        columnNumber: 33
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/legend-item/legend-item.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/legend-item/legend-item.tsx",
        lineNumber: 27,
        columnNumber: 10
    }, undefined);
};
_s(LegendItem, "7xVbA/cAv2OTrtL4/ZezCn5HG/A=", false, function() {
    return [
        _legend_item_styles__rspack_import_6.useStyles
    ];
});
_c = LegendItem;
var _c;
$RefreshReg$(_c, "LegendItem");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/reports-view/components/report-chart/components/line-chart/line-chart.styles.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyles: () => (useStyles)
});
/* import */ var antd_style__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/antd-style/antd-style");
/* import */ var antd_style__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(antd_style__rspack_import_0);
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
const useStyles = (0,antd_style__rspack_import_0.createStyles)((param)=>{
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

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/reports-view/components/report-chart/components/line-chart/line-chart.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  LineChart: () => (LineChart)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _ant_design_plots__rspack_import_10 = __webpack_require__("./node_modules/@ant-design/plots/es/components/line/index.js");
/* import */ var lodash__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_2);
/* import */ var _Pimcore_components_flex_flex__rspack_import_3 = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* import */ var _Pimcore_modules_reports_reports_view_components_report_chart_components_legend_item_legend_item__rspack_import_4 = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-chart/components/legend-item/legend-item.tsx");
/* import */ var _Pimcore_modules_reports_reports_view_components_report_chart_utils_helpers__rspack_import_5 = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-chart/utils/helpers.ts");
/* import */ var _Pimcore_modules_reports_reports_view_components_report_chart_hooks_use_show_more__rspack_import_6 = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-chart/hooks/use-show-more.ts");
/* import */ var _Pimcore_modules_reports_reports_view_components_report_chart_components_show_more_btn_show_more_btn__rspack_import_7 = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-chart/components/show-more-btn/show-more-btn.tsx");
/* import */ var _Pimcore_utils_hooks_use_element_resize__rspack_import_8 = __webpack_require__("./js/src/core/utils/hooks/use-element-resize.ts");
/* import */ var _line_chart_styles__rspack_import_9 = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-chart/components/line-chart/line-chart.styles.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 









const CHART_FIELD_NAME_KEY = 'name';
const CHART_FIELD_VALUE_KEY = 'value';
const CHART_HEIGHT = 250;
const LineChart = (param)=>{
    let { chartData, reportData, chartLabelMap, chartConfig, showLegend = true } = param;
    _s();
    const { styles } = (0,_line_chart_styles__rspack_import_9.useStyles)();
    const chartRef = (0,react__rspack_import_1.useRef)(null);
    const { width: chartWidth } = (0,_Pimcore_utils_hooks_use_element_resize__rspack_import_8["default"])(chartRef);
    const [colorList] = (0,react__rspack_import_1.useState)((0,_Pimcore_modules_reports_reports_view_components_report_chart_utils_helpers__rspack_import_5.generateColorMap)(chartData.length));
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
                [CHART_FIELD_VALUE_KEY]: (0,lodash__rspack_import_2.toNumber)(value)
            };
        });
    });
    const seriesKeys = [
        ...new Set(formattedChartData.map((item)=>item.name))
    ];
    const { isExpanded, visibleItems, toggle, initialVisibleCount } = (0,_Pimcore_modules_reports_reports_view_components_report_chart_hooks_use_show_more__rspack_import_6.useShowMore)(seriesKeys);
    const [activeSeries, setActiveSeries] = (0,react__rspack_import_1.useState)(seriesKeys);
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
    const filteredData = (0,react__rspack_import_1.useMemo)(()=>{
        return formattedChartData.filter((item)=>activeSeries.includes(item.name));
    }, [
        formattedChartData,
        activeSeries
    ]);
    const config = (0,react__rspack_import_1.useMemo)(()=>({
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
                        return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_flex_flex__rspack_import_3.Flex, {
                            gap: "mini",
                            vertical: true,
                            children: [
                                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)("div", {
                                    className: styles.tooltipTitle,
                                    children: title
                                }, void 0, false, {
                                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/line-chart/line-chart.tsx",
                                    lineNumber: 93,
                                    columnNumber: 13
                                }, undefined),
                                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_flex_flex__rspack_import_3.Flex, {
                                    vertical: true,
                                    children: items.map((item)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_flex_flex__rspack_import_3.Flex, {
                                            gap: "small",
                                            justify: "space-between",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_flex_flex__rspack_import_3.Flex, {
                                                    align: "center",
                                                    gap: "mini",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)("div", {
                                                            className: styles.circle,
                                                            style: {
                                                                backgroundColor: item.color
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/line-chart/line-chart.tsx",
                                                            lineNumber: 97,
                                                            columnNumber: 21
                                                        }, undefined),
                                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)("div", {
                                                            children: chartLabelMap[item.name] ?? item.name
                                                        }, void 0, false, {
                                                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/line-chart/line-chart.tsx",
                                                            lineNumber: 100,
                                                            columnNumber: 21
                                                        }, undefined)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/line-chart/line-chart.tsx",
                                                    lineNumber: 96,
                                                    columnNumber: 19
                                                }, undefined),
                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)("div", {
                                                    className: styles.tooltipItemValue,
                                                    children: item.value
                                                }, void 0, false, {
                                                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/line-chart/line-chart.tsx",
                                                    lineNumber: 102,
                                                    columnNumber: 19
                                                }, undefined)
                                            ]
                                        }, item.name, true, {
                                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/line-chart/line-chart.tsx",
                                            lineNumber: 95,
                                            columnNumber: 34
                                        }, undefined))
                                }, void 0, false, {
                                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/line-chart/line-chart.tsx",
                                    lineNumber: 94,
                                    columnNumber: 13
                                }, undefined)
                            ]
                        }, void 0, true, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/line-chart/line-chart.tsx",
                            lineNumber: 92,
                            columnNumber: 15
                        }, undefined);
                    }
                }
            }
        }), [
        filteredData,
        chartWidth
    ]);
    const mergedConfig = chartConfig === undefined ? config : (0,lodash__rspack_import_2.merge)({}, config, chartConfig);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)("div", {
        className: "m-t-mini",
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)("div", {
                ref: chartRef,
                style: {
                    overflowX: 'hidden'
                },
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_ant_design_plots__rspack_import_10["default"], {
                    ...mergedConfig
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/line-chart/line-chart.tsx",
                    lineNumber: 114,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/line-chart/line-chart.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, undefined),
            showLegend ? /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_flex_flex__rspack_import_3.Flex, {
                gap: "mini",
                justify: "center",
                wrap: "wrap",
                children: visibleItems.map((key, index)=>{
                    const isActive = activeSeries.includes(key);
                    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_reports_reports_view_components_report_chart_components_legend_item_legend_item__rspack_import_4.LegendItem, {
                        disabled: !isActive,
                        handleClick: ()=>{
                            handleLegendItemClick(key);
                        },
                        label: chartLabelMap[key] ?? key,
                        markerColor: colorMap[key]
                    }, `${index}-${key}`, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/line-chart/line-chart.tsx",
                        lineNumber: 120,
                        columnNumber: 16
                    }, undefined);
                })
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/line-chart/line-chart.tsx",
                lineNumber: 117,
                columnNumber: 21
            }, undefined) : null,
            (seriesKeys === null || seriesKeys === void 0 ? void 0 : seriesKeys.length) > initialVisibleCount && /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_reports_reports_view_components_report_chart_components_show_more_btn_show_more_btn__rspack_import_7.ShowMoreBtn, {
                isExpanded: isExpanded,
                toggle: toggle
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/line-chart/line-chart.tsx",
                lineNumber: 126,
                columnNumber: 52
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/line-chart/line-chart.tsx",
        lineNumber: 110,
        columnNumber: 10
    }, undefined);
};
_s(LineChart, "euukTnXj3P4K6k30wSeqaYeuB6E=", false, function() {
    return [
        _line_chart_styles__rspack_import_9.useStyles,
        _Pimcore_utils_hooks_use_element_resize__rspack_import_8["default"],
        _Pimcore_modules_reports_reports_view_components_report_chart_hooks_use_show_more__rspack_import_6.useShowMore
    ];
});
_c = LineChart;
var _c;
$RefreshReg$(_c, "LineChart");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/reports-view/components/report-chart/components/pie-chart/pie-chart.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  PieChart: () => (PieChart)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _ant_design_plots__rspack_import_8 = __webpack_require__("./node_modules/@ant-design/plots/es/components/pie/index.js");
/* import */ var lodash__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_2);
/* import */ var _Pimcore_modules_reports_reports_view_components_report_chart_utils_helpers__rspack_import_3 = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-chart/utils/helpers.ts");
/* import */ var _Pimcore_components_flex_flex__rspack_import_4 = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* import */ var _Pimcore_modules_reports_reports_view_components_report_chart_components_legend_item_legend_item__rspack_import_5 = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-chart/components/legend-item/legend-item.tsx");
/* import */ var _Pimcore_modules_reports_reports_view_components_report_chart_hooks_use_show_more__rspack_import_6 = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-chart/hooks/use-show-more.ts");
/* import */ var _Pimcore_modules_reports_reports_view_components_report_chart_components_show_more_btn_show_more_btn__rspack_import_7 = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-chart/components/show-more-btn/show-more-btn.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 







const CHART_FIELD_TYPE_KEY = 'type';
const CHART_FIELD_VALUE_KEY = 'value';
const CHART_FIELD_COLOR_KEY = 'color';
const PieChart = (param)=>{
    let { reportData, chartData, chartConfig, showLegend = true } = param;
    _s();
    const pieLabelColumn = (reportData === null || reportData === void 0 ? void 0 : reportData.pieLabelColumn) ?? '';
    const pieColumn = (reportData === null || reportData === void 0 ? void 0 : reportData.pieColumn) ?? '';
    const [colorList] = (0,react__rspack_import_1.useState)((0,_Pimcore_modules_reports_reports_view_components_report_chart_utils_helpers__rspack_import_3.generateColorMap)(chartData.length));
    const reportChartData = (0,react__rspack_import_1.useMemo)(()=>{
        return chartData.map((item, index)=>({
                [CHART_FIELD_TYPE_KEY]: item === null || item === void 0 ? void 0 : item[pieLabelColumn],
                [CHART_FIELD_VALUE_KEY]: item === null || item === void 0 ? void 0 : item[pieColumn],
                [CHART_FIELD_COLOR_KEY]: colorList[index]
            }));
    }, [
        chartData,
        pieLabelColumn,
        pieColumn,
        colorList
    ]);
    const { isExpanded, visibleItems, toggle, initialVisibleCount } = (0,_Pimcore_modules_reports_reports_view_components_report_chart_hooks_use_show_more__rspack_import_6.useShowMore)(reportChartData);
    const [chartRef, setChartRef] = (0,react__rspack_import_1.useState)(null);
    const [disabledItems, setDisabledItems] = (0,react__rspack_import_1.useState)([]);
    const visibleChartData = (0,react__rspack_import_1.useMemo)(()=>{
        if ((0,lodash__rspack_import_2.isEmpty)(disabledItems)) {
            return reportChartData;
        }
        return reportChartData.filter((item)=>!disabledItems.includes(item[CHART_FIELD_TYPE_KEY]));
    }, [
        reportChartData,
        disabledItems
    ]);
    const totalCount = (0,react__rspack_import_1.useMemo)(()=>{
        return visibleChartData.reduce((sum, item)=>sum + item[CHART_FIELD_VALUE_KEY], 0);
    }, [
        visibleChartData
    ]);
    (0,react__rspack_import_1.useEffect)(()=>{
        if (chartRef === null) return;
        chartRef.chart.changeData(visibleChartData);
    }, [
        visibleChartData,
        chartRef
    ]);
    const handleLegendItemClick = (itemKey)=>{
        setDisabledItems((prev)=>prev.includes(itemKey) ? prev.filter((item)=>item !== itemKey) : [
                ...prev,
                itemKey
            ]);
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
    const mergedConfig = chartConfig === undefined ? config : (0,lodash__rspack_import_2.merge)({}, config, chartConfig);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)("div", {
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_ant_design_plots__rspack_import_8["default"], {
                ...mergedConfig
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/pie-chart/pie-chart.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, undefined),
            showLegend ? /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_flex_flex__rspack_import_4.Flex, {
                gap: "mini",
                justify: "center",
                wrap: "wrap",
                children: visibleItems === null || visibleItems === void 0 ? void 0 : visibleItems.map((item, index)=>{
                    const isDisabled = disabledItems.includes(item.type);
                    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_reports_reports_view_components_report_chart_components_legend_item_legend_item__rspack_import_5.LegendItem, {
                        disabled: isDisabled,
                        handleClick: ()=>{
                            handleLegendItemClick(item.type);
                        },
                        label: item.type,
                        markerColor: item.color,
                        value: item.value
                    }, `${index}-${item.type}`, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/pie-chart/pie-chart.tsx",
                        lineNumber: 104,
                        columnNumber: 16
                    }, undefined);
                })
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/pie-chart/pie-chart.tsx",
                lineNumber: 101,
                columnNumber: 21
            }, undefined) : null,
            (reportChartData === null || reportChartData === void 0 ? void 0 : reportChartData.length) > initialVisibleCount && /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_reports_reports_view_components_report_chart_components_show_more_btn_show_more_btn__rspack_import_7.ShowMoreBtn, {
                isExpanded: isExpanded,
                toggle: toggle
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/pie-chart/pie-chart.tsx",
                lineNumber: 110,
                columnNumber: 57
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/pie-chart/pie-chart.tsx",
        lineNumber: 98,
        columnNumber: 10
    }, undefined);
};
_s(PieChart, "YhaQAan8QBKS2GlHFKCy4nvOkMY=", false, function() {
    return [
        _Pimcore_modules_reports_reports_view_components_report_chart_hooks_use_show_more__rspack_import_6.useShowMore
    ];
});
_c = PieChart;
var _c;
$RefreshReg$(_c, "PieChart");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/reports-view/components/report-chart/components/show-more-btn/show-more-btn.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ShowMoreBtn: () => (ShowMoreBtn)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var react_i18next__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_2);
/* import */ var _Pimcore_components_flex_flex__rspack_import_3 = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* import */ var _Pimcore_components_icon_text_button_icon_text_button__rspack_import_4 = __webpack_require__("./js/src/core/components/icon-text-button/icon-text-button.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 



const ShowMoreBtn = (param)=>{
    let { isExpanded, toggle } = param;
    _s();
    const { t } = (0,react_i18next__rspack_import_2.useTranslation)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_flex_flex__rspack_import_3.Flex, {
        className: "m-t-mini",
        justify: "center",
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_text_button_icon_text_button__rspack_import_4.IconTextButton, {
            icon: {
                value: isExpanded ? 'chevron-up' : 'chevron-down'
            },
            iconPlacement: "right",
            onClick: toggle,
            type: "link",
            children: isExpanded ? t('reports.show-fewer-labels') : t('reports.show-all-labels')
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/show-more-btn/show-more-btn.tsx",
            lineNumber: 23,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/components/show-more-btn/show-more-btn.tsx",
        lineNumber: 22,
        columnNumber: 10
    }, undefined);
};
_s(ShowMoreBtn, "vu2xTFBfHkv41zWfADiErp1aWcA=", false, function() {
    return [
        react_i18next__rspack_import_2.useTranslation
    ];
});
_c = ShowMoreBtn;
var _c;
$RefreshReg$(_c, "ShowMoreBtn");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/reports-view/components/report-chart/report-chart.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ReportChart: () => (ReportChart)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var lodash__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_2);
/* import */ var antd__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* import */ var antd__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(antd__rspack_import_3);
/* import */ var _Pimcore_components_content_content__rspack_import_4 = __webpack_require__("./js/src/core/components/content/content.tsx");
/* import */ var _Pimcore_modules_reports_reports_view_components_report_chart_components_pie_chart_pie_chart__rspack_import_5 = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-chart/components/pie-chart/pie-chart.tsx");
/* import */ var _Pimcore_modules_reports_reports_view_components_report_chart_components_line_chart_line_chart__rspack_import_6 = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-chart/components/line-chart/line-chart.tsx");
/* import */ var _Pimcore_modules_reports_reports_view_components_report_chart_components_bar_chart_bar_chart__rspack_import_7 = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-chart/components/bar-chart/bar-chart.tsx");
/* import */ var _Pimcore_utils_type_utils__rspack_import_8 = __webpack_require__("./js/src/core/utils/type-utils.ts");
/* import */ var _Pimcore_modules_reports_constants__rspack_import_9 = __webpack_require__("./js/src/core/modules/reports/constants.ts");
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








const ReportChart = (param)=>{
    let { chartData, reportData, chartConfig } = param;
    if ((0,lodash__rspack_import_2.isUndefined)(reportData) || (0,lodash__rspack_import_2.isUndefined)(chartData)) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_content_content__rspack_import_4.Content, {
            loading: true
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/report-chart.tsx",
            lineNumber: 26,
            columnNumber: 12
        }, undefined);
    }
    const chartType = (reportData === null || reportData === void 0 ? void 0 : reportData.chartType) ?? 'default';
    const chartLabelMap = (0,lodash__rspack_import_2.fromPairs)((0,lodash__rspack_import_2.map)(reportData === null || reportData === void 0 ? void 0 : reportData.columnConfigurations, (item)=>[
            item.name,
            !(0,_Pimcore_utils_type_utils__rspack_import_8.isEmptyValue)(item.label) ? item.label : item.name
        ]));
    const commonProps = {
        reportData,
        chartData,
        chartLabelMap,
        chartConfig
    };
    if ((0,_Pimcore_utils_type_utils__rspack_import_8.isEmptyValue)(chartData)) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_3.Empty, {
            image: antd__rspack_import_3.Empty.PRESENTED_IMAGE_SIMPLE
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/report-chart.tsx",
            lineNumber: 37,
            columnNumber: 12
        }, undefined);
    }
    const chartElement = (()=>{
        switch(chartType){
            case _Pimcore_modules_reports_constants__rspack_import_9.CHART_TYPE_PIE:
                return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_reports_reports_view_components_report_chart_components_pie_chart_pie_chart__rspack_import_5.PieChart, {
                    ...commonProps
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/report-chart.tsx",
                    lineNumber: 42,
                    columnNumber: 16
                }, undefined);
            case _Pimcore_modules_reports_constants__rspack_import_9.CHART_TYPE_LINE:
                return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_reports_reports_view_components_report_chart_components_line_chart_line_chart__rspack_import_6.LineChart, {
                    ...commonProps
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/report-chart.tsx",
                    lineNumber: 44,
                    columnNumber: 16
                }, undefined);
            case _Pimcore_modules_reports_constants__rspack_import_9.CHART_TYPE_BAR:
                return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_reports_reports_view_components_report_chart_components_bar_chart_bar_chart__rspack_import_7.BarChart, {
                    ...commonProps
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/report-chart.tsx",
                    lineNumber: 46,
                    columnNumber: 16
                }, undefined);
            default:
                return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_reports_reports_view_components_report_chart_components_pie_chart_pie_chart__rspack_import_5.PieChart, {
                    ...commonProps
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/report-chart.tsx",
                    lineNumber: 48,
                    columnNumber: 16
                }, undefined);
        }
    })();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)("div", {
        "data-testid": "report-chart-container",
        children: chartElement
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-chart/report-chart.tsx",
        lineNumber: 51,
        columnNumber: 10
    }, undefined);
};
_c = ReportChart;
var _c;
$RefreshReg$(_c, "ReportChart");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/reports-view/components/report-detail/components/drill-down-select/drill-down-select.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DrillDownSelect: () => (DrillDownSelect)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var react_i18next__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_2);
/* import */ var _Pimcore_components_select_select__rspack_import_3 = __webpack_require__("./js/src/core/components/select/select.tsx");
/* import */ var _Pimcore_components_flex_flex__rspack_import_4 = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* import */ var _Pimcore_components_text_text__rspack_import_5 = __webpack_require__("./js/src/core/components/text/text.tsx");
/* import */ var _Pimcore_modules_reports_custom_reports_api_slice_enhanced__rspack_import_6 = __webpack_require__("./js/src/core/modules/reports/custom-reports-api-slice-enhanced.ts");
/* import */ var _Pimcore_modules_reports_reports_view_context_grid_filter_context__rspack_import_7 = __webpack_require__("./js/src/core/modules/reports/reports-view/context/grid-filter-context.tsx");
/* import */ var _Pimcore_modules_reports_reports_view_reports_view_styles__rspack_import_8 = __webpack_require__("./js/src/core/modules/reports/reports-view/reports-view.styles.tsx");
/* import */ var _Pimcore_utils_type_utils__rspack_import_9 = __webpack_require__("./js/src/core/utils/type-utils.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 








const DrillDownSelect = (param)=>{
    let { reportName, field } = param;
    var _data_items;
    _s();
    const { filters, setFilters } = (0,_Pimcore_modules_reports_reports_view_context_grid_filter_context__rspack_import_7.useGridFilterContext)();
    const { data, isLoading } = (0,_Pimcore_modules_reports_custom_reports_api_slice_enhanced__rspack_import_6.useCustomReportsListDrillDownOptionsQuery)({
        body: {
            name: reportName,
            field: field.name ?? null
        }
    });
    const { t } = (0,react_i18next__rspack_import_2.useTranslation)();
    const { styles } = (0,_Pimcore_modules_reports_reports_view_reports_view_styles__rspack_import_8.useStyles)();
    const [currentValue, setCurrentValue] = (0,react__rspack_import_1.useState)(null);
    const handleSelectChange = (value)=>{
        setCurrentValue(value);
        const drillDownFilters = {
            ...(filters === null || filters === void 0 ? void 0 : filters.drillDownFilters) ?? {}
        };
        drillDownFilters[field.name] = String(value);
        setFilters({
            ...filters,
            drillDownFilters
        });
    };
    const selectLabel = !(0,_Pimcore_utils_type_utils__rspack_import_9.isEmptyValue)(field.label) ? field.label : field.name;
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_flex_flex__rspack_import_4.Flex, {
        align: "center",
        "data-testid": `report-drilldown-${field.name}`,
        gap: "extra-small",
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_text_text__rspack_import_5.Text, {
                className: styles.drillDownSelectLabel,
                children: selectLabel
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-detail/components/drill-down-select/drill-down-select.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_select_select__rspack_import_3.Select, {
                className: "min-w-200",
                "data-testid": `report-drilldown-select-${field.name}`,
                loading: isLoading,
                onSelect: handleSelectChange,
                options: data === null || data === void 0 ? void 0 : (_data_items = data.items) === null || _data_items === void 0 ? void 0 : _data_items.map((item)=>({
                        label: item.name,
                        value: item.value
                    })),
                placeholder: t('select'),
                value: currentValue
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-detail/components/drill-down-select/drill-down-select.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-detail/components/drill-down-select/drill-down-select.tsx",
        lineNumber: 56,
        columnNumber: 10
    }, undefined);
};
_s(DrillDownSelect, "x2pmCPvKvpx5CUrc9KS/YcPq3jg=", false, function() {
    return [
        _Pimcore_modules_reports_reports_view_context_grid_filter_context__rspack_import_7.useGridFilterContext,
        _Pimcore_modules_reports_custom_reports_api_slice_enhanced__rspack_import_6.useCustomReportsListDrillDownOptionsQuery,
        react_i18next__rspack_import_2.useTranslation,
        _Pimcore_modules_reports_reports_view_reports_view_styles__rspack_import_8.useStyles
    ];
});
_c = DrillDownSelect;
var _c;
$RefreshReg$(_c, "DrillDownSelect");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/reports-view/components/report-detail/report-detail.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ReportDetail: () => (ReportDetail)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var lodash__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_2);
/* import */ var _tanstack_react_table__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/@tanstack/react-table/@tanstack/react-table");
/* import */ var _tanstack_react_table__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(_tanstack_react_table__rspack_import_3);
/* import */ var react_i18next__rspack_import_4 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_4_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_4);
/* import */ var _Pimcore_utils_type_utils__rspack_import_5 = __webpack_require__("./js/src/core/utils/type-utils.ts");
/* import */ var _Pimcore_modules_reports_reports_view_components_report_chart_report_chart__rspack_import_6 = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-chart/report-chart.tsx");
/* import */ var _Pimcore_components_content_content__rspack_import_7 = __webpack_require__("./js/src/core/components/content/content.tsx");
/* import */ var _Pimcore_components_flex_flex__rspack_import_8 = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* import */ var _Pimcore_components_grid_grid__rspack_import_9 = __webpack_require__("./js/src/core/components/grid/grid.tsx");
/* import */ var _Pimcore_modules_reports_reports_view_types__rspack_import_10 = __webpack_require__("./js/src/core/modules/reports/reports-view/types.ts");
/* import */ var _Pimcore_modules_reports_reports_view_components_report_detail_components_drill_down_select_drill_down_select__rspack_import_11 = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-detail/components/drill-down-select/drill-down-select.tsx");
/* import */ var _Pimcore_components_grid_contexts_columns_context__rspack_import_12 = __webpack_require__("./js/src/core/components/grid/contexts/columns-context.tsx");
/* import */ var _Pimcore_modules_reports_reports_view_context_report_data_context__rspack_import_13 = __webpack_require__("./js/src/core/modules/reports/reports-view/context/report-data-context.tsx");
/* import */ var _Pimcore_modules_reports_reports_view_hooks_useFullChartData__rspack_import_14 = __webpack_require__("./js/src/core/modules/reports/reports-view/hooks/useFullChartData.ts");
/* import */ var _Pimcore_components_icon_button_icon_button__rspack_import_15 = __webpack_require__("./js/src/core/components/icon-button/icon-button.tsx");
/* import */ var _Pimcore_modules_element_hooks_use_element_helper__rspack_import_16 = __webpack_require__("./js/src/core/modules/element/hooks/use-element-helper.ts");
/* import */ var _Pimcore_modules_reports_reports_view_helpers__rspack_import_17 = __webpack_require__("./js/src/core/modules/reports/reports-view/helpers.ts");
/* import */ var _Pimcore_app_config_app_config__rspack_import_18 = __webpack_require__("./js/src/core/app/config/app-config.ts");
/* import */ var _Pimcore_modules_reports_reports_view_reports_view_styles__rspack_import_19 = __webpack_require__("./js/src/core/modules/reports/reports-view/reports-view.styles.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 


















const columnHelper = (0,_tanstack_react_table__rspack_import_3.createColumnHelper)();
const ReportDetail = (param)=>{
    let { isLoading, currentReport, reportDetailData, chartDetailData } = param;
    var _chartDetailData_items, _fullChartDataList_items;
    _s();
    const [isShowLoading, setIsShowLoading] = (0,react__rspack_import_1.useState)(false);
    const prevReportRef = (0,react__rspack_import_1.useRef)(null);
    const reportName = (reportDetailData === null || reportDetailData === void 0 ? void 0 : reportDetailData.name) ?? '';
    const { sorting, setSorting } = (0,_Pimcore_modules_reports_reports_view_context_report_data_context__rspack_import_13.useReportDataContext)();
    const { data: fullChartDataList } = (0,_Pimcore_modules_reports_reports_view_hooks_useFullChartData__rspack_import_14.useFullChartData)({
        name: reportName
    });
    (0,react__rspack_import_1.useEffect)(()=>{
        if (currentReport !== prevReportRef.current) {
            prevReportRef.current = currentReport;
            if (!(0,lodash__rspack_import_2.isUndefined)(currentReport) && !(0,lodash__rspack_import_2.isNil)(currentReport) && isLoading) {
                setIsShowLoading(true);
            }
        }
    }, [
        currentReport,
        isLoading
    ]);
    (0,react__rspack_import_1.useEffect)(()=>{
        if (!isLoading) {
            setIsShowLoading(false);
        }
    }, [
        isLoading
    ]);
    const { columns, setColumns, setInitialColumns } = (0,_Pimcore_components_grid_contexts_columns_context__rspack_import_12.useColumnsContext)();
    const { openElement } = (0,_Pimcore_modules_element_hooks_use_element_helper__rspack_import_16.useElementHelper)();
    const { t } = (0,react_i18next__rspack_import_4.useTranslation)();
    const { styles } = (0,_Pimcore_modules_reports_reports_view_reports_view_styles__rspack_import_19.useStyles)();
    const sortingValue = (0,react__rspack_import_1.useMemo)(()=>{
        return !(0,lodash__rspack_import_2.isUndefined)(sorting) ? [
            {
                id: sorting.sortBy,
                desc: sorting.sortOrder === 'DESC'
            }
        ] : [];
    }, [
        sorting
    ]);
    const handleSortingChange = (updatedSorting)=>{
        if (updatedSorting.length > 0) {
            const { id, desc } = updatedSorting[0];
            setSorting({
                sortBy: id,
                sortOrder: desc ? 'DESC' : 'ASC'
            });
        } else {
            setSorting(undefined);
        }
    };
    const handleElementOpen = (param)=>{
        let { id, actionType } = param;
        if (actionType === _Pimcore_modules_reports_reports_view_helpers__rspack_import_17.ReportActionType.OPEN_URL) {
            window.open(`${_Pimcore_app_config_app_config__rspack_import_18.currentDomain}/pimcore-studio/${id}`, '_blank');
        } else {
            const type = (0,_Pimcore_modules_reports_reports_view_helpers__rspack_import_17.getTypeByActionType)(actionType);
            void openElement({
                id: Number(id),
                type
            });
        }
    };
    const renderColumnActionCell = (param)=>{
        let { id, actionType } = param;
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_flex_flex__rspack_import_8.Flex, {
            align: "center",
            justify: "center",
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_button_icon_button__rspack_import_15.IconButton, {
                icon: {
                    value: 'open-folder'
                },
                onClick: ()=>{
                    handleElementOpen({
                        id: Number(id),
                        actionType
                    });
                },
                type: "link"
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-detail/report-detail.tsx",
                lineNumber: 114,
                columnNumber: 7
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-detail/report-detail.tsx",
            lineNumber: 113,
            columnNumber: 9
        }, undefined);
    };
    const getColumns = ()=>{
        var _reportDetailData_columnConfigurations;
        const list = [];
        reportDetailData === null || reportDetailData === void 0 ? void 0 : (_reportDetailData_columnConfigurations = reportDetailData.columnConfigurations) === null || _reportDetailData_columnConfigurations === void 0 ? void 0 : _reportDetailData_columnConfigurations.forEach((item, index)=>{
            const isShowColumn = item.display && item.filterDrilldown !== _Pimcore_modules_reports_reports_view_types__rspack_import_10.FilterDrillDown.ONLY_FILTER;
            if (isShowColumn) {
                const columnId = !(0,_Pimcore_utils_type_utils__rspack_import_5.isEmptyValue)(item === null || item === void 0 ? void 0 : item.name) ? item.name : `id-${index}`;
                const columnType = !(0,_Pimcore_utils_type_utils__rspack_import_5.isEmptyValue)(item.displayType) ? item.displayType : 'text';
                if (item.displayType !== 'hide') {
                    list.push(columnHelper.accessor((row)=>row === null || row === void 0 ? void 0 : row[columnId], {
                        id: columnId,
                        header: !(0,_Pimcore_utils_type_utils__rspack_import_5.isEmptyValue)(item.label) ? item.label : item.name,
                        enableSorting: item.order,
                        ...!(0,lodash__rspack_import_2.isNull)(item.width) && {
                            size: item.width
                        },
                        meta: {
                            type: columnType,
                            ...columnType === 'date' && {
                                config: {
                                    showTime: true
                                }
                            },
                            ...columnType === 'text' && {
                                config: {
                                    renderAsHtml: true
                                }
                            },
                            ...(0,lodash__rspack_import_2.isNull)(item.width) && {
                                autoWidth: true
                            }
                        }
                    }));
                }
                if (!(0,_Pimcore_utils_type_utils__rspack_import_5.isEmptyValue)(item.action)) {
                    list.push(columnHelper.accessor((row)=>row === null || row === void 0 ? void 0 : row[columnId], {
                        id: `${columnId}-action`,
                        header: t('actions.open'),
                        enableSorting: false,
                        size: 50,
                        cell: (info)=>{
                            const rowData = info.row.original;
                            const id = rowData[columnId];
                            return renderColumnActionCell({
                                id,
                                actionType: item.action
                            });
                        }
                    }));
                }
            }
            return undefined;
        });
        return list.filter((item)=>!(0,lodash__rspack_import_2.isUndefined)(item));
    };
    (0,react__rspack_import_1.useEffect)(()=>{
        setColumns(getColumns() ?? []);
        setInitialColumns(getColumns() ?? []);
    }, [
        reportDetailData,
        setColumns
    ]);
    const getDrillDownSelectList = ()=>{
        var _reportDetailData_columnConfigurations;
        return reportDetailData === null || reportDetailData === void 0 ? void 0 : (_reportDetailData_columnConfigurations = reportDetailData.columnConfigurations) === null || _reportDetailData_columnConfigurations === void 0 ? void 0 : _reportDetailData_columnConfigurations.filter((item)=>!(0,_Pimcore_utils_type_utils__rspack_import_5.isEmptyValue)(item.filterDrilldown)).map((item)=>item);
    };
    const drillDownFields = (0,react__rspack_import_1.useMemo)(()=>getDrillDownSelectList(), [
        reportDetailData
    ]);
    const isShowChart = !(0,_Pimcore_utils_type_utils__rspack_import_5.isEmptyValue)(reportDetailData === null || reportDetailData === void 0 ? void 0 : reportDetailData.chartType);
    const chartData = chartDetailData === null || chartDetailData === void 0 ? void 0 : (_chartDetailData_items = chartDetailData.items) === null || _chartDetailData_items === void 0 ? void 0 : _chartDetailData_items.map((item)=>item.data);
    const fullChartData = fullChartDataList === null || fullChartDataList === void 0 ? void 0 : (_fullChartDataList_items = fullChartDataList.items) === null || _fullChartDataList_items === void 0 ? void 0 : _fullChartDataList_items.map((item)=>item.data);
    if (isLoading && isShowLoading) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_content_content__rspack_import_7.Content, {
            loading: true
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-detail/report-detail.tsx",
            lineNumber: 187,
            columnNumber: 12
        }, undefined);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_flex_flex__rspack_import_8.Flex, {
        className: "h-full",
        "data-testid": "report-detail-container",
        gap: "small",
        vertical: true,
        children: [
            !(0,lodash__rspack_import_2.isUndefined)(drillDownFields) && /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_flex_flex__rspack_import_8.Flex, {
                "data-testid": "report-detail-drilldown-area",
                gap: "small",
                wrap: true,
                children: drillDownFields === null || drillDownFields === void 0 ? void 0 : drillDownFields.map((item)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_reports_reports_view_components_report_detail_components_drill_down_select_drill_down_select__rspack_import_11.DrillDownSelect, {
                        field: item,
                        reportName: reportName
                    }, item.name, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-detail/report-detail.tsx",
                        lineNumber: 191,
                        columnNumber: 41
                    }, undefined))
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-detail/report-detail.tsx",
                lineNumber: 190,
                columnNumber: 41
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_flex_flex__rspack_import_8.Flex, {
                className: "h-full",
                "data-testid": "report-detail-content",
                gap: "small",
                justify: "flex-start",
                vertical: true,
                children: [
                    isShowChart && /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_reports_reports_view_components_report_chart_report_chart__rspack_import_6.ReportChart, {
                        chartData: fullChartData,
                        reportData: reportDetailData
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-detail/report-detail.tsx",
                        lineNumber: 194,
                        columnNumber: 25
                    }, undefined),
                    !(0,lodash__rspack_import_2.isUndefined)(chartData) && /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_grid_grid__rspack_import_9.Grid, {
                        allowMultipleAutoWidthColumns: true,
                        autoWidth: true,
                        className: styles.gridTable,
                        columns: columns,
                        data: chartData,
                        dataTestId: "report-detail-grid",
                        enableColumnVirtualizer: true,
                        enableSorting: true,
                        isLoading: isLoading,
                        manualSorting: true,
                        onSortingChange: handleSortingChange,
                        sorting: sortingValue
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-detail/report-detail.tsx",
                        lineNumber: 195,
                        columnNumber: 37
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-detail/report-detail.tsx",
                lineNumber: 193,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-detail/report-detail.tsx",
        lineNumber: 189,
        columnNumber: 10
    }, undefined);
};
_s(ReportDetail, "qpOMlflaJK93uE4IDsKrlA5lgh0=", false, function() {
    return [
        _Pimcore_modules_reports_reports_view_context_report_data_context__rspack_import_13.useReportDataContext,
        _Pimcore_modules_reports_reports_view_hooks_useFullChartData__rspack_import_14.useFullChartData,
        _Pimcore_components_grid_contexts_columns_context__rspack_import_12.useColumnsContext,
        _Pimcore_modules_element_hooks_use_element_helper__rspack_import_16.useElementHelper,
        react_i18next__rspack_import_4.useTranslation,
        _Pimcore_modules_reports_reports_view_reports_view_styles__rspack_import_19.useStyles
    ];
});
_c = ReportDetail;
var _c;
$RefreshReg$(_c, "ReportDetail");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/reports-view/components/report-sidebar/components/columns-configuration/columns-configuration.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ColumnsConfiguration: () => (ColumnsConfiguration)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var react_i18next__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_2);
/* import */ var antd__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* import */ var antd__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(antd__rspack_import_3);
/* import */ var lodash__rspack_import_4 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_4_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_4);
/* import */ var _Pimcore_components_grid_contexts_columns_context__rspack_import_5 = __webpack_require__("./js/src/core/components/grid/contexts/columns-context.tsx");
/* import */ var _Pimcore_components_content_layout_content_layout__rspack_import_6 = __webpack_require__("./js/src/core/components/content-layout/content-layout.tsx");
/* import */ var _Pimcore_components_content_content__rspack_import_7 = __webpack_require__("./js/src/core/components/content/content.tsx");
/* import */ var _Pimcore_components_flex_flex__rspack_import_8 = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* import */ var _Pimcore_components_tag_tag__rspack_import_9 = __webpack_require__("./js/src/core/components/tag/tag.tsx");
/* import */ var _Pimcore_components_space_space__rspack_import_10 = __webpack_require__("./js/src/core/components/space/space.tsx");
/* import */ var _Pimcore_components_icon_button_icon_button__rspack_import_11 = __webpack_require__("./js/src/core/components/icon-button/icon-button.tsx");
/* import */ var _Pimcore_utils_uuid__rspack_import_12 = __webpack_require__("./js/src/core/utils/uuid.ts");
/* import */ var _Pimcore_components_stack_list_stack_list__rspack_import_13 = __webpack_require__("./js/src/core/components/stack-list/stack-list.tsx");
/* import */ var _Pimcore_components_toolbar_toolbar__rspack_import_14 = __webpack_require__("./js/src/core/components/toolbar/toolbar.tsx");
/* import */ var _Pimcore_components_button_button__rspack_import_15 = __webpack_require__("./js/src/core/components/button/button.tsx");
/* import */ var _Pimcore_components_dropdown_dropdown__rspack_import_16 = __webpack_require__("./js/src/core/components/dropdown/dropdown.tsx");
/* import */ var _Pimcore_components_icon_text_button_icon_text_button__rspack_import_17 = __webpack_require__("./js/src/core/components/icon-text-button/icon-text-button.tsx");
/* import */ var _Pimcore_components_title_title__rspack_import_18 = __webpack_require__("./js/src/core/components/title/title.tsx");
/* import */ var _Pimcore_components_tooltip_tooltip__rspack_import_19 = __webpack_require__("./js/src/core/components/tooltip/tooltip.tsx");
/* import */ var _Pimcore_modules_reports_reports_view_reports_view_styles__rspack_import_20 = __webpack_require__("./js/src/core/modules/reports/reports-view/reports-view.styles.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 



















const ColumnsConfiguration = ()=>{
    _s();
    const { columns, setColumns, initialColumns, addColumn, resetColumnsToInitial } = (0,_Pimcore_components_grid_contexts_columns_context__rspack_import_5.useColumnsContext)();
    const [addColumnMenu, setAddColumnMenu] = (0,react__rspack_import_1.useState)([]);
    const { t } = (0,react_i18next__rspack_import_2.useTranslation)();
    const { styles } = (0,_Pimcore_modules_reports_reports_view_reports_view_styles__rspack_import_20.useStyles)();
    const handleItemsChange = (items)=>{
        const newColumns = items.map((item)=>item.meta);
        setColumns(newColumns);
    };
    const handleRemoveColumn = (uniqueId)=>{
        const itemList = stackListItems.filter((item)=>item.id !== uniqueId);
        const newColumns = itemList.map((item)=>item.meta);
        setColumns(newColumns);
    };
    (0,react__rspack_import_1.useEffect)(()=>{
        var _initialColumns_filter;
        const newAddColumnMenu = initialColumns === null || initialColumns === void 0 ? void 0 : (_initialColumns_filter = initialColumns.filter((initialColumn)=>!columns.some((column)=>initialColumn.id === column.id))) === null || _initialColumns_filter === void 0 ? void 0 : _initialColumns_filter.map((column)=>({
                key: column.id ?? (0,_Pimcore_utils_uuid__rspack_import_12.uuid)(),
                label: column.header,
                onClick: ()=>{
                    addColumn(column);
                }
            }));
        setAddColumnMenu(newAddColumnMenu);
    }, [
        columns
    ]);
    const stackListItems = columns.map((column)=>{
        const uniqueId = (0,_Pimcore_utils_uuid__rspack_import_12.uuid)();
        return {
            id: uniqueId,
            sortable: true,
            meta: column,
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_tooltip_tooltip__rspack_import_19.Tooltip, {
                title: column.header,
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_tag_tag__rspack_import_9.Tag, {
                    className: styles.stackItem,
                    children: column.header
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-sidebar/components/columns-configuration/columns-configuration.tsx",
                    lineNumber: 72,
                    columnNumber: 11
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-sidebar/components/columns-configuration/columns-configuration.tsx",
                lineNumber: 71,
                columnNumber: 17
            }, undefined),
            renderRightToolbar: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_space_space__rspack_import_10.Space, {
                size: "mini",
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_button_icon_button__rspack_import_11.IconButton, {
                    icon: {
                        value: 'trash'
                    },
                    onClick: ()=>{
                        handleRemoveColumn(uniqueId);
                    },
                    theme: "secondary"
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-sidebar/components/columns-configuration/columns-configuration.tsx",
                    lineNumber: 75,
                    columnNumber: 11
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-sidebar/components/columns-configuration/columns-configuration.tsx",
                lineNumber: 74,
                columnNumber: 27
            }, undefined)
        };
    });
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_content_layout_content_layout__rspack_import_6.ContentLayout, {
        renderToolbar: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_toolbar_toolbar__rspack_import_14.Toolbar, {
            theme: "secondary",
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_button_button__rspack_import_15.Button, {
                className: styles.btnLink,
                "data-testid": "report-columns-restore-default",
                onClick: resetColumnsToInitial,
                type: "link",
                children: t('reports.grid-config.restore-to-default')
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-sidebar/components/columns-configuration/columns-configuration.tsx",
                lineNumber: 84,
                columnNumber: 11
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-sidebar/components/columns-configuration/columns-configuration.tsx",
            lineNumber: 83,
            columnNumber: 40
        }, undefined),
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_content_content__rspack_import_7.Content, {
            padded: true,
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_title_title__rspack_import_18.Title, {
                    children: t('reports.grid-config.title-columns')
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-sidebar/components/columns-configuration/columns-configuration.tsx",
                    lineNumber: 89,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_space_space__rspack_import_10.Space, {
                    direction: "vertical",
                    style: {
                        width: '100%'
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_flex_flex__rspack_import_8.Flex, {
                            vertical: true,
                            children: [
                                stackListItems.length === 0 && /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_3.Empty, {
                                    image: antd__rspack_import_3.Empty.PRESENTED_IMAGE_SIMPLE
                                }, void 0, false, {
                                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-sidebar/components/columns-configuration/columns-configuration.tsx",
                                    lineNumber: 94,
                                    columnNumber: 45
                                }, undefined),
                                stackListItems.length > 0 && /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_stack_list_stack_list__rspack_import_13.StackList, {
                                    items: stackListItems,
                                    onItemsChange: handleItemsChange,
                                    sortable: true
                                }, void 0, false, {
                                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-sidebar/components/columns-configuration/columns-configuration.tsx",
                                    lineNumber: 95,
                                    columnNumber: 43
                                }, undefined)
                            ]
                        }, void 0, true, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-sidebar/components/columns-configuration/columns-configuration.tsx",
                            lineNumber: 93,
                            columnNumber: 11
                        }, undefined),
                        !(0,lodash__rspack_import_4.isEmpty)(addColumnMenu) && /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_dropdown_dropdown__rspack_import_16.Dropdown, {
                            menu: {
                                items: addColumnMenu
                            },
                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_text_button_icon_text_button__rspack_import_17.IconTextButton, {
                                "data-testid": "report-columns-add-button",
                                icon: {
                                    value: 'new'
                                },
                                type: "link",
                                children: t('reports.grid-config.add-column')
                            }, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-sidebar/components/columns-configuration/columns-configuration.tsx",
                                lineNumber: 100,
                                columnNumber: 13
                            }, undefined)
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-sidebar/components/columns-configuration/columns-configuration.tsx",
                            lineNumber: 97,
                            columnNumber: 39
                        }, undefined)
                    ]
                }, void 0, true, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-sidebar/components/columns-configuration/columns-configuration.tsx",
                    lineNumber: 90,
                    columnNumber: 9
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-sidebar/components/columns-configuration/columns-configuration.tsx",
            lineNumber: 88,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-sidebar/components/columns-configuration/columns-configuration.tsx",
        lineNumber: 83,
        columnNumber: 10
    }, undefined);
};
_s(ColumnsConfiguration, "4I5Yi3rIx91UyI8R1QR0y2mB69M=", false, function() {
    return [
        _Pimcore_components_grid_contexts_columns_context__rspack_import_5.useColumnsContext,
        react_i18next__rspack_import_2.useTranslation,
        _Pimcore_modules_reports_reports_view_reports_view_styles__rspack_import_20.useStyles
    ];
});
_c = ColumnsConfiguration;
var _c;
$RefreshReg$(_c, "ColumnsConfiguration");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/reports-view/components/report-sidebar/components/columns-filters/columns-filters.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ColumnsFilters: () => (ColumnsFilters)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var react_i18next__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_2);
/* import */ var _Pimcore_components_content_layout_content_layout__rspack_import_3 = __webpack_require__("./js/src/core/components/content-layout/content-layout.tsx");
/* import */ var _Pimcore_components_content_content__rspack_import_4 = __webpack_require__("./js/src/core/components/content/content.tsx");
/* import */ var _Pimcore_components_toolbar_toolbar__rspack_import_5 = __webpack_require__("./js/src/core/components/toolbar/toolbar.tsx");
/* import */ var _Pimcore_components_button_button__rspack_import_6 = __webpack_require__("./js/src/core/components/button/button.tsx");
/* import */ var _Pimcore_modules_reports_reports_view_components_report_sidebar_components_columns_filters_components_field_filters_field_filters__rspack_import_7 = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-sidebar/components/columns-filters/components/field-filters/field-filters.tsx");
/* import */ var _Pimcore_modules_reports_reports_view_context_grid_filter_context__rspack_import_8 = __webpack_require__("./js/src/core/modules/reports/reports-view/context/grid-filter-context.tsx");
/* import */ var _Pimcore_modules_reports_reports_view_components_report_sidebar_components_columns_filters_context_columns_filters_context__rspack_import_9 = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-sidebar/components/columns-filters/context/columns-filters-context.tsx");
/* import */ var _Pimcore_modules_reports_reports_view_context_report_data_context__rspack_import_10 = __webpack_require__("./js/src/core/modules/reports/reports-view/context/report-data-context.tsx");
/* import */ var _Pimcore_modules_reports_reports_view_reports_view_styles__rspack_import_11 = __webpack_require__("./js/src/core/modules/reports/reports-view/reports-view.styles.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 










const ColumnsFilters = ()=>{
    _s();
    const { filters, setFilters } = (0,_Pimcore_modules_reports_reports_view_context_grid_filter_context__rspack_import_8.useGridFilterContext)();
    const { columnsFilters, setColumnsFilters, setFieldFilters } = (0,_Pimcore_modules_reports_reports_view_components_report_sidebar_components_columns_filters_context_columns_filters_context__rspack_import_9.useColumnsFiltersContext)();
    const { setPage } = (0,_Pimcore_modules_reports_reports_view_context_report_data_context__rspack_import_10.useReportDataContext)();
    const { t } = (0,react_i18next__rspack_import_2.useTranslation)();
    const { styles } = (0,_Pimcore_modules_reports_reports_view_reports_view_styles__rspack_import_11.useStyles)();
    const handleApplyFilters = ()=>{
        setPage(_Pimcore_modules_reports_reports_view_context_report_data_context__rspack_import_10.PAGE_INITIAL);
        setFilters({
            ...filters,
            columnFilters: columnsFilters
        });
    };
    const handleClearFilters = ()=>{
        setColumnsFilters([]);
        setFieldFilters([]);
        setFilters({
            ...filters,
            columnFilters: []
        });
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_content_layout_content_layout__rspack_import_3.ContentLayout, {
        renderToolbar: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_toolbar_toolbar__rspack_import_5.Toolbar, {
            theme: "secondary",
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_button_button__rspack_import_6.Button, {
                    className: styles.btnLink,
                    "data-testid": "report-filters-clear-button",
                    onClick: handleClearFilters,
                    type: "link",
                    children: t('sidebar.clear-all-filters')
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-sidebar/components/columns-filters/columns-filters.tsx",
                    lineNumber: 57,
                    columnNumber: 11
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_button_button__rspack_import_6.Button, {
                    "data-testid": "report-filters-apply-button",
                    onClick: handleApplyFilters,
                    type: "primary",
                    children: t('button.apply')
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-sidebar/components/columns-filters/columns-filters.tsx",
                    lineNumber: 61,
                    columnNumber: 11
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-sidebar/components/columns-filters/columns-filters.tsx",
            lineNumber: 56,
            columnNumber: 40
        }, undefined),
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_content_content__rspack_import_4.Content, {
            padded: true,
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_reports_reports_view_components_report_sidebar_components_columns_filters_components_field_filters_field_filters__rspack_import_7.FieldFilters, {}, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-sidebar/components/columns-filters/columns-filters.tsx",
                lineNumber: 66,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-sidebar/components/columns-filters/columns-filters.tsx",
            lineNumber: 65,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-sidebar/components/columns-filters/columns-filters.tsx",
        lineNumber: 56,
        columnNumber: 10
    }, undefined);
};
_s(ColumnsFilters, "GQi1ARFImNZ9y04bVTrmkmTsnyo=", false, function() {
    return [
        _Pimcore_modules_reports_reports_view_context_grid_filter_context__rspack_import_8.useGridFilterContext,
        _Pimcore_modules_reports_reports_view_components_report_sidebar_components_columns_filters_context_columns_filters_context__rspack_import_9.useColumnsFiltersContext,
        _Pimcore_modules_reports_reports_view_context_report_data_context__rspack_import_10.useReportDataContext,
        react_i18next__rspack_import_2.useTranslation,
        _Pimcore_modules_reports_reports_view_reports_view_styles__rspack_import_11.useStyles
    ];
});
_c = ColumnsFilters;
var _c;
$RefreshReg$(_c, "ColumnsFilters");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/reports-view/components/report-sidebar/components/columns-filters/components/field-filters/field-filters.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  FieldFilters: () => (FieldFilters)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var react_i18next__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_2);
/* import */ var antd__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* import */ var antd__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(antd__rspack_import_3);
/* import */ var lodash__rspack_import_4 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_4_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_4);
/* import */ var _Pimcore_components_icon_text_button_icon_text_button__rspack_import_5 = __webpack_require__("./js/src/core/components/icon-text-button/icon-text-button.tsx");
/* import */ var _Pimcore_components_title_title__rspack_import_6 = __webpack_require__("./js/src/core/components/title/title.tsx");
/* import */ var _Pimcore_components_flex_flex__rspack_import_7 = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* import */ var _Pimcore_components_dropdown_dropdown__rspack_import_8 = __webpack_require__("./js/src/core/components/dropdown/dropdown.tsx");
/* import */ var _Pimcore_utils_type_utils__rspack_import_9 = __webpack_require__("./js/src/core/utils/type-utils.ts");
/* import */ var _Pimcore_components_field_filters_field_filters__rspack_import_10 = __webpack_require__("./js/src/core/components/field-filters/field-filters.tsx");
/* import */ var _Pimcore_modules_reports_reports_view_components_report_sidebar_components_columns_filters_components_field_filters_helpers__rspack_import_11 = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-sidebar/components/columns-filters/components/field-filters/helpers.tsx");
/* import */ var _Pimcore_modules_reports_reports_view_components_report_sidebar_components_columns_filters_context_columns_filters_context__rspack_import_12 = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-sidebar/components/columns-filters/context/columns-filters-context.tsx");
/* import */ var _Pimcore_modules_reports_reports_view_context_report_data_context__rspack_import_13 = __webpack_require__("./js/src/core/modules/reports/reports-view/context/report-data-context.tsx");
/* import */ var _Pimcore_modules_reports_reports_view_hooks_useFullChartData__rspack_import_14 = __webpack_require__("./js/src/core/modules/reports/reports-view/hooks/useFullChartData.ts");
/* import */ var _Pimcore_modules_element_dynamic_types_resolver_hooks_use_dynamic_type_resolver__rspack_import_15 = __webpack_require__("./js/src/core/modules/element/dynamic-types/resolver/hooks/use-dynamic-type-resolver.ts");
/* import */ var _Pimcore_modules_reports_reports_view_components_report_sidebar_components_columns_filters_components_field_filters_types__rspack_import_16 = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-sidebar/components/columns-filters/components/field-filters/types.ts");
/* import */ var _Pimcore_modules_element_dynamic_types_definitions_field_filters_types_number_dynamic_type_field_filter_number__rspack_import_17 = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/field-filters/types/number/dynamic-type-field-filter-number.tsx");
/* import */ var _Pimcore_modules_element_dynamic_types_definitions_field_filters_types_date_dynamic_type_field_filter_date__rspack_import_18 = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/field-filters/types/date/dynamic-type-field-filter-date.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 

















const FieldFilters = ()=>{
    _s();
    const { t } = (0,react_i18next__rspack_import_2.useTranslation)();
    const [addColumnMenu, setAddColumnMenu] = (0,react__rspack_import_1.useState)([]);
    const { reportDetailData } = (0,_Pimcore_modules_reports_reports_view_context_report_data_context__rspack_import_13.useReportDataContext)();
    const { setColumnsFilters, fieldFilters, setFieldFilters } = (0,_Pimcore_modules_reports_reports_view_components_report_sidebar_components_columns_filters_context_columns_filters_context__rspack_import_12.useColumnsFiltersContext)();
    const { data: fullChartDetailData } = (0,_Pimcore_modules_reports_reports_view_hooks_useFullChartData__rspack_import_14.useFullChartData)({
        name: (reportDetailData === null || reportDetailData === void 0 ? void 0 : reportDetailData.name) ?? ''
    });
    const { getType } = (0,_Pimcore_modules_element_dynamic_types_resolver_hooks_use_dynamic_type_resolver__rspack_import_15.useDynamicTypeResolver)();
    const getLabelValue = (column)=>!(0,_Pimcore_utils_type_utils__rspack_import_9.isEmptyValue)(column.label) ? column.label : column.name;
    const handleColumnClick = (column)=>{
        const filterType = column.filterType ?? 'string';
        const frontendType = _Pimcore_modules_reports_reports_view_components_report_sidebar_components_columns_filters_components_field_filters_helpers__rspack_import_11.FIELD_TYPE_MAP[filterType].frontendType;
        const type = _Pimcore_modules_reports_reports_view_components_report_sidebar_components_columns_filters_components_field_filters_helpers__rspack_import_11.FIELD_TYPE_MAP[filterType].type;
        const id = getLabelValue(column);
        const fieldName = column.name;
        const fieldOptions = (0,lodash__rspack_import_4.reject)(fullChartDetailData === null || fullChartDetailData === void 0 ? void 0 : fullChartDetailData.items.map((item)=>item.data[fieldName]), (value)=>(0,lodash__rspack_import_4.isNull)(value));
        setFieldFilters([
            ...fieldFilters,
            {
                data: undefined,
                id,
                translationKey: id,
                name: fieldName,
                type,
                frontendType,
                config: {
                    options: (0,lodash__rspack_import_4.uniq)(fieldOptions),
                    showSearch: frontendType === 'select'
                }
            }
        ]);
    };
    const onFilterChange = (data)=>{
        setFieldFilters(data);
        const updatedColumnFilters = data.filter((item)=>!(0,lodash__rspack_import_4.isUndefined)(item.data)).flatMap((item)=>{
            const dynType = getType({
                target: 'FIELD_FILTER',
                dynamicTypeIds: [
                    item.frontendType
                ]
            });
            const baseFilterData = {
                property: item.name,
                type: _Pimcore_modules_reports_reports_view_components_report_sidebar_components_columns_filters_components_field_filters_helpers__rspack_import_11.FRONTEND_TO_ORIGINAL_TYPE[item.frontendType]
            };
            const defaultFilterData = {
                operator: _Pimcore_modules_reports_reports_view_components_report_sidebar_components_columns_filters_components_field_filters_types__rspack_import_16.FieldFilterOperators.LIKE,
                value: String(item.data)
            };
            if ((0,lodash__rspack_import_4.isNull)(dynType)) {
                return [
                    {
                        ...baseFilterData,
                        ...defaultFilterData
                    }
                ];
            }
            let filterData = [];
            if (dynType instanceof _Pimcore_modules_element_dynamic_types_definitions_field_filters_types_number_dynamic_type_field_filter_number__rspack_import_17.DynamicTypeFieldFilterNumber) {
                filterData = (0,_Pimcore_modules_reports_reports_view_components_report_sidebar_components_columns_filters_components_field_filters_helpers__rspack_import_11.getNumberFieldFilterData)(item.data);
            } else if (dynType instanceof _Pimcore_modules_element_dynamic_types_definitions_field_filters_types_date_dynamic_type_field_filter_date__rspack_import_18.DynamicTypeFieldFilterDate) {
                filterData = (0,_Pimcore_modules_reports_reports_view_components_report_sidebar_components_columns_filters_components_field_filters_helpers__rspack_import_11.getDateFieldFilterData)(item.data);
            } else {
                filterData = [
                    defaultFilterData
                ];
            }
            return filterData.map((filter)=>({
                    ...baseFilterData,
                    operator: filter.operator,
                    value: filter.value
                }));
        });
        !(0,lodash__rspack_import_4.isUndefined)(updatedColumnFilters) && setColumnsFilters(updatedColumnFilters);
    };
    (0,react__rspack_import_1.useEffect)(()=>{
        setFieldFilters([]);
        setColumnsFilters([]);
    }, [
        reportDetailData
    ]);
    (0,react__rspack_import_1.useEffect)(()=>{
        var _filterableColumnConfigurationsList_filter;
        if ((0,lodash__rspack_import_4.isEmpty)(fullChartDetailData)) return;
        const filterableColumnConfigurationsList = reportDetailData === null || reportDetailData === void 0 ? void 0 : reportDetailData.columnConfigurations.filter((item)=>{
            return item.display && !(0,_Pimcore_utils_type_utils__rspack_import_9.isEmptyValue)(item.filterType);
        });
        const newAddColumnMenu = filterableColumnConfigurationsList === null || filterableColumnConfigurationsList === void 0 ? void 0 : (_filterableColumnConfigurationsList_filter = filterableColumnConfigurationsList.filter((initialColumn)=>!fieldFilters.some((column)=>initialColumn.name === column.name))) === null || _filterableColumnConfigurationsList_filter === void 0 ? void 0 : _filterableColumnConfigurationsList_filter.map((column)=>({
                key: column.id,
                label: getLabelValue(column),
                onClick: ()=>{
                    handleColumnClick(column);
                }
            }));
        setAddColumnMenu(newAddColumnMenu);
    }, [
        fullChartDetailData,
        reportDetailData,
        fieldFilters
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(react_jsx_dev_runtime__rspack_import_0.Fragment, {
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_title_title__rspack_import_6.Title, {
                children: t('reports.field-filters')
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-sidebar/components/columns-filters/components/field-filters/field-filters.tsx",
                lineNumber: 127,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_3.Space, {
                direction: "vertical",
                style: {
                    width: '100%'
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_flex_flex__rspack_import_7.Flex, {
                        vertical: true,
                        children: [
                            fieldFilters.length === 0 && /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_3.Empty, {
                                image: antd__rspack_import_3.Empty.PRESENTED_IMAGE_SIMPLE
                            }, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-sidebar/components/columns-filters/components/field-filters/field-filters.tsx",
                                lineNumber: 132,
                                columnNumber: 41
                            }, undefined),
                            fieldFilters.length > 0 && /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_field_filters_field_filters__rspack_import_10.FieldFilters, {
                                data: fieldFilters,
                                onChange: onFilterChange
                            }, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-sidebar/components/columns-filters/components/field-filters/field-filters.tsx",
                                lineNumber: 133,
                                columnNumber: 39
                            }, undefined)
                        ]
                    }, void 0, true, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-sidebar/components/columns-filters/components/field-filters/field-filters.tsx",
                        lineNumber: 131,
                        columnNumber: 9
                    }, undefined),
                    !(0,lodash__rspack_import_4.isEmpty)(addColumnMenu) && /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_dropdown_dropdown__rspack_import_8.Dropdown, {
                        menu: {
                            items: addColumnMenu
                        },
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_text_button_icon_text_button__rspack_import_5.IconTextButton, {
                            "data-testid": "report-filters-add-column-button",
                            icon: {
                                value: 'new'
                            },
                            type: "link",
                            children: t('reports.grid-config.add-column')
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-sidebar/components/columns-filters/components/field-filters/field-filters.tsx",
                            lineNumber: 138,
                            columnNumber: 13
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-sidebar/components/columns-filters/components/field-filters/field-filters.tsx",
                        lineNumber: 135,
                        columnNumber: 37
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-sidebar/components/columns-filters/components/field-filters/field-filters.tsx",
                lineNumber: 128,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true);
};
_s(FieldFilters, "dQMYof68S68bnFmpoOHIkoS1q28=", false, function() {
    return [
        react_i18next__rspack_import_2.useTranslation,
        _Pimcore_modules_reports_reports_view_context_report_data_context__rspack_import_13.useReportDataContext,
        _Pimcore_modules_reports_reports_view_components_report_sidebar_components_columns_filters_context_columns_filters_context__rspack_import_12.useColumnsFiltersContext,
        _Pimcore_modules_reports_reports_view_hooks_useFullChartData__rspack_import_14.useFullChartData,
        _Pimcore_modules_element_dynamic_types_resolver_hooks_use_dynamic_type_resolver__rspack_import_15.useDynamicTypeResolver
    ];
});
_c = FieldFilters;
var _c;
$RefreshReg$(_c, "FieldFilters");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/reports-view/components/report-sidebar/components/columns-filters/components/field-filters/helpers.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  FIELD_TYPE_MAP: () => (FIELD_TYPE_MAP),
  FRONTEND_TO_ORIGINAL_TYPE: () => (FRONTEND_TO_ORIGINAL_TYPE),
  getDateFieldFilterData: () => (getDateFieldFilterData),
  getNumberFieldFilterData: () => (getNumberFieldFilterData)
});
/* import */ var lodash__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_0);
/* import */ var _Pimcore_modules_element_dynamic_types_definitions_field_filters_frontendTypes__rspack_import_1 = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/field-filters/frontendTypes.ts");
/* import */ var _Pimcore_modules_element_dynamic_types_definitions_field_filters_components_dynamic_type_field_filter_number_component__rspack_import_2 = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/field-filters/components/dynamic-type-field-filter-number-component.tsx");
/* import */ var _Pimcore_modules_reports_reports_view_components_report_sidebar_components_columns_filters_components_field_filters_types__rspack_import_3 = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-sidebar/components/columns-filters/components/field-filters/types.ts");
/* import */ var _Pimcore_modules_element_dynamic_types_definitions_field_filters_components_dynamic_type_field_filter_date_component__rspack_import_4 = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/field-filters/components/dynamic-type-field-filter-date-component.tsx");
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




const FIELD_TYPE_MAP = {
    string: {
        frontendType: 'string',
        type: _Pimcore_modules_element_dynamic_types_definitions_field_filters_frontendTypes__rspack_import_1.FieldFilterFrontendType.String
    },
    numeric: {
        frontendType: 'number',
        type: _Pimcore_modules_element_dynamic_types_definitions_field_filters_frontendTypes__rspack_import_1.FieldFilterFrontendType.Number
    },
    boolean: {
        frontendType: 'boolean',
        type: _Pimcore_modules_element_dynamic_types_definitions_field_filters_frontendTypes__rspack_import_1.FieldFilterFrontendType.Boolean
    },
    date: {
        frontendType: 'datetime',
        type: _Pimcore_modules_element_dynamic_types_definitions_field_filters_frontendTypes__rspack_import_1.FieldFilterFrontendType.DateTime
    }
};
const FRONTEND_TO_ORIGINAL_TYPE = Object.fromEntries(_c1 = Object.entries(FIELD_TYPE_MAP).map(_c = (param)=>{
    let [originalType, config] = param;
    return [
        config.frontendType,
        originalType
    ];
}));
_c2 = FRONTEND_TO_ORIGINAL_TYPE;
const getNumberFieldFilterData = (data)=>{
    const { setting, from, to, is } = data;
    const getValue = (value)=>!(0,lodash__rspack_import_0.isNull)(value) ? String(value) : '';
    const operatorMap = {
        [_Pimcore_modules_element_dynamic_types_definitions_field_filters_components_dynamic_type_field_filter_number_component__rspack_import_2.NumberFilterSettingValue.IS]: [
            {
                operator: _Pimcore_modules_reports_reports_view_components_report_sidebar_components_columns_filters_components_field_filters_types__rspack_import_3.FieldFilterOperators.EQUAL,
                value: getValue(is)
            }
        ],
        [_Pimcore_modules_element_dynamic_types_definitions_field_filters_components_dynamic_type_field_filter_number_component__rspack_import_2.NumberFilterSettingValue.LESS]: [
            {
                operator: _Pimcore_modules_reports_reports_view_components_report_sidebar_components_columns_filters_components_field_filters_types__rspack_import_3.FieldFilterOperators.LESS_THAN,
                value: getValue(to)
            }
        ],
        [_Pimcore_modules_element_dynamic_types_definitions_field_filters_components_dynamic_type_field_filter_number_component__rspack_import_2.NumberFilterSettingValue.MORE]: [
            {
                operator: _Pimcore_modules_reports_reports_view_components_report_sidebar_components_columns_filters_components_field_filters_types__rspack_import_3.FieldFilterOperators.GREATER_THAN,
                value: getValue(from)
            }
        ],
        [_Pimcore_modules_element_dynamic_types_definitions_field_filters_components_dynamic_type_field_filter_number_component__rspack_import_2.NumberFilterSettingValue.BETWEEN]: [
            {
                operator: _Pimcore_modules_reports_reports_view_components_report_sidebar_components_columns_filters_components_field_filters_types__rspack_import_3.FieldFilterOperators.GREATER_THAN,
                value: getValue(from)
            },
            {
                operator: _Pimcore_modules_reports_reports_view_components_report_sidebar_components_columns_filters_components_field_filters_types__rspack_import_3.FieldFilterOperators.LESS_THAN,
                value: getValue(to)
            }
        ]
    };
    return operatorMap[setting] ?? operatorMap[_Pimcore_modules_element_dynamic_types_definitions_field_filters_components_dynamic_type_field_filter_number_component__rspack_import_2.NumberFilterSettingValue.IS];
};
const getDateFieldFilterData = (data)=>{
    const { setting, from, to, on } = data;
    const getValue = (value)=>value ?? '';
    const operatorMap = {
        [_Pimcore_modules_element_dynamic_types_definitions_field_filters_components_dynamic_type_field_filter_date_component__rspack_import_4.DatePickerSettingValue.ON]: [
            {
                operator: _Pimcore_modules_reports_reports_view_components_report_sidebar_components_columns_filters_components_field_filters_types__rspack_import_3.FieldFilterOperators.EQUAL,
                value: getValue(on)
            }
        ],
        [_Pimcore_modules_element_dynamic_types_definitions_field_filters_components_dynamic_type_field_filter_date_component__rspack_import_4.DatePickerSettingValue.BEFORE]: [
            {
                operator: _Pimcore_modules_reports_reports_view_components_report_sidebar_components_columns_filters_components_field_filters_types__rspack_import_3.FieldFilterOperators.LESS_THAN,
                value: getValue(to)
            }
        ],
        [_Pimcore_modules_element_dynamic_types_definitions_field_filters_components_dynamic_type_field_filter_date_component__rspack_import_4.DatePickerSettingValue.AFTER]: [
            {
                operator: _Pimcore_modules_reports_reports_view_components_report_sidebar_components_columns_filters_components_field_filters_types__rspack_import_3.FieldFilterOperators.GREATER_THAN,
                value: getValue(from)
            }
        ],
        [_Pimcore_modules_element_dynamic_types_definitions_field_filters_components_dynamic_type_field_filter_date_component__rspack_import_4.DatePickerSettingValue.BETWEEN]: [
            {
                operator: _Pimcore_modules_reports_reports_view_components_report_sidebar_components_columns_filters_components_field_filters_types__rspack_import_3.FieldFilterOperators.GREATER_THAN,
                value: getValue(from)
            },
            {
                operator: _Pimcore_modules_reports_reports_view_components_report_sidebar_components_columns_filters_components_field_filters_types__rspack_import_3.FieldFilterOperators.LESS_THAN,
                value: getValue(to)
            }
        ]
    };
    return operatorMap[setting] ?? operatorMap[_Pimcore_modules_element_dynamic_types_definitions_field_filters_components_dynamic_type_field_filter_date_component__rspack_import_4.DatePickerSettingValue.ON];
};
var _c, _c1, _c2;
$RefreshReg$(_c, "FRONTEND_TO_ORIGINAL_TYPE$Object.fromEntries$Object.entries(FIELD_TYPE_MAP).map");
$RefreshReg$(_c1, "FRONTEND_TO_ORIGINAL_TYPE$Object.fromEntries");
$RefreshReg$(_c2, "FRONTEND_TO_ORIGINAL_TYPE");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/reports-view/components/report-sidebar/components/columns-filters/context/columns-filters-context.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ColumnsFiltersProvider: () => (ColumnsFiltersProvider),
  useColumnsFiltersContext: () => (useColumnsFiltersContext)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var lodash__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_2);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$(), _s1 = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 

const ColumnsFiltersContext = /*#__PURE__*/ (0,react__rspack_import_1.createContext)(undefined);
const ColumnsFiltersProvider = (param)=>{
    let { children } = param;
    _s();
    const [columnsFilters, setColumnsFilters] = (0,react__rspack_import_1.useState)([]);
    const [fieldFilters, setFieldFilters] = (0,react__rspack_import_1.useState)([]);
    const contextValue = (0,react__rspack_import_1.useMemo)(()=>({
            columnsFilters,
            setColumnsFilters,
            fieldFilters,
            setFieldFilters
        }), [
        columnsFilters,
        setColumnsFilters,
        fieldFilters,
        setFieldFilters
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(ColumnsFiltersContext.Provider, {
        value: contextValue,
        children: children
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-sidebar/components/columns-filters/context/columns-filters-context.tsx",
        lineNumber: 25,
        columnNumber: 10
    }, undefined);
};
_s(ColumnsFiltersProvider, "aKQS1sFFlb5AOsDrfGBc2ONM4PA=");
_c = ColumnsFiltersProvider;
const useColumnsFiltersContext = ()=>{
    _s1();
    const context = (0,react__rspack_import_1.useContext)(ColumnsFiltersContext);
    if ((0,lodash__rspack_import_2.isUndefined)(context)) {
        throw new Error('useColumnsFiltersContext must be used within a ColumnsFiltersProvider');
    }
    return context;
};
_s1(useColumnsFiltersContext, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
$RefreshReg$(_c, "ColumnsFiltersProvider");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/reports-view/components/report-sidebar/report-sidebar.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ReportSidebar: () => (ReportSidebar)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var react_i18next__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_2);
/* import */ var lodash__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_3);
/* import */ var _Pimcore_components_sidebar_sidebar__rspack_import_4 = __webpack_require__("./js/src/core/components/sidebar/sidebar.tsx");
/* import */ var _Pimcore_components_icon_icon__rspack_import_5 = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* import */ var _Pimcore_modules_reports_reports_view_components_report_sidebar_components_columns_configuration_columns_configuration__rspack_import_6 = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-sidebar/components/columns-configuration/columns-configuration.tsx");
/* import */ var _Pimcore_modules_reports_reports_view_components_report_sidebar_components_columns_filters_columns_filters__rspack_import_7 = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-sidebar/components/columns-filters/columns-filters.tsx");
/* import */ var _Pimcore_modules_reports_reports_view_components_report_sidebar_components_columns_filters_context_columns_filters_context__rspack_import_8 = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-sidebar/components/columns-filters/context/columns-filters-context.tsx");
/* import */ var _Pimcore_modules_reports_reports_view_context_report_data_context__rspack_import_9 = __webpack_require__("./js/src/core/modules/reports/reports-view/context/report-data-context.tsx");
/* import */ var _Pimcore_utils_type_utils__rspack_import_10 = __webpack_require__("./js/src/core/utils/type-utils.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 









const ReportSidebar = ()=>{
    _s();
    const { t } = (0,react_i18next__rspack_import_2.useTranslation)();
    const { reportDetailData } = (0,_Pimcore_modules_reports_reports_view_context_report_data_context__rspack_import_9.useReportDataContext)();
    const filterableColumnConfigurations = (0,react__rspack_import_1.useMemo)(()=>{
        var _reportDetailData_columnConfigurations;
        return reportDetailData === null || reportDetailData === void 0 ? void 0 : (_reportDetailData_columnConfigurations = reportDetailData.columnConfigurations) === null || _reportDetailData_columnConfigurations === void 0 ? void 0 : _reportDetailData_columnConfigurations.filter((item)=>!(0,_Pimcore_utils_type_utils__rspack_import_10.isEmptyValue)(item.filterType));
    }, [
        reportDetailData
    ]);
    const sidebarProps = {
        entries: [
            {
                component: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_reports_reports_view_components_report_sidebar_components_columns_configuration_columns_configuration__rspack_import_6.ColumnsConfiguration, {}, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-sidebar/report-sidebar.tsx",
                    lineNumber: 33,
                    columnNumber: 18
                }, undefined),
                key: 'reports-columns-configuration',
                icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_icon__rspack_import_5.Icon, {
                    value: "columns"
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-sidebar/report-sidebar.tsx",
                    lineNumber: 35,
                    columnNumber: 13
                }, undefined),
                tooltip: t('reports.grid-config.title-columns')
            }
        ]
    };
    if (!(0,lodash__rspack_import_3.isEmpty)(filterableColumnConfigurations)) {
        sidebarProps.entries.push({
            component: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_reports_reports_view_components_report_sidebar_components_columns_filters_context_columns_filters_context__rspack_import_8.ColumnsFiltersProvider, {
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_reports_reports_view_components_report_sidebar_components_columns_filters_columns_filters__rspack_import_7.ColumnsFilters, {}, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-sidebar/report-sidebar.tsx",
                    lineNumber: 42,
                    columnNumber: 11
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-sidebar/report-sidebar.tsx",
                lineNumber: 41,
                columnNumber: 18
            }, undefined),
            key: 'reports-field-filters',
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_icon__rspack_import_5.Icon, {
                value: "filter"
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-sidebar/report-sidebar.tsx",
                lineNumber: 45,
                columnNumber: 13
            }, undefined),
            tooltip: t('reports.field-filters')
        });
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_sidebar_sidebar__rspack_import_4.Sidebar, {
        sizing: "medium",
        ...sidebarProps
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-sidebar/report-sidebar.tsx",
        lineNumber: 49,
        columnNumber: 10
    }, undefined);
};
_s(ReportSidebar, "xSQtsSBFscYGrNbyHaxoNCAItaA=", false, function() {
    return [
        react_i18next__rspack_import_2.useTranslation,
        _Pimcore_modules_reports_reports_view_context_report_data_context__rspack_import_9.useReportDataContext
    ];
});
_c = ReportSidebar;
var _c;
$RefreshReg$(_c, "ReportSidebar");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/reports-view/components/report-toolbar/report-toolbar.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ReportToolbar: () => (ReportToolbar)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var react_i18next__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_2);
/* import */ var _Pimcore_components_toolbar_toolbar__rspack_import_3 = __webpack_require__("./js/src/core/components/toolbar/toolbar.tsx");
/* import */ var _Pimcore_modules_reports_components_pagination_pagination__rspack_import_4 = __webpack_require__("./js/src/core/modules/reports/components/pagination/pagination.tsx");
/* import */ var _Pimcore_components_dropdown_dropdown__rspack_import_5 = __webpack_require__("./js/src/core/components/dropdown/dropdown.tsx");
/* import */ var _Pimcore_components_dropdown_button_dropdown_button__rspack_import_6 = __webpack_require__("./js/src/core/components/dropdown-button/dropdown-button.tsx");
/* import */ var _Pimcore_components_icon_icon__rspack_import_7 = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* import */ var _Pimcore_components_flex_flex__rspack_import_8 = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* import */ var _Pimcore_components_modal_modal__rspack_import_9 = __webpack_require__("./js/src/core/components/modal/modal.tsx");
/* import */ var _Pimcore_components_checkbox_checkbox__rspack_import_10 = __webpack_require__("./js/src/core/components/checkbox/checkbox.tsx");
/* import */ var _Pimcore_components_input_input__rspack_import_11 = __webpack_require__("./js/src/core/components/input/input.tsx");
/* import */ var _Pimcore_modules_reports_custom_reports_api_slice_enhanced__rspack_import_12 = __webpack_require__("./js/src/core/modules/reports/custom-reports-api-slice-enhanced.ts");
/* import */ var _Pimcore_modules_reports_reports_view_context_grid_filter_context__rspack_import_13 = __webpack_require__("./js/src/core/modules/reports/reports-view/context/grid-filter-context.tsx");
/* import */ var _Pimcore_modules_execution_engine_jobs_download_download_job__rspack_import_14 = __webpack_require__("./js/src/core/modules/execution-engine/jobs/download/download-job.ts");
/* import */ var _Pimcore_modules_app_error_handler__rspack_import_15 = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* import */ var _Pimcore_modules_reports_reports_view_reports_view_styles__rspack_import_16 = __webpack_require__("./js/src/core/modules/reports/reports-view/reports-view.styles.tsx");
/* import */ var _Pimcore_modules_execution_engine_hooks_use_execution_engine__rspack_import_17 = __webpack_require__("./js/src/core/modules/execution-engine/hooks/use-execution-engine.ts");
/* import */ var _Pimcore_app_api_pimcore_route__rspack_import_18 = __webpack_require__("./js/src/core/app/api/pimcore/route.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 

















const ReportToolbar = (param)=>{
    let { currentReport, showPagination, page, setPage, pageSize, setPageSize, totalItems } = param;
    var _this = undefined;
    _s();
    const [fetchExportCSV, { isError, error }] = (0,_Pimcore_modules_reports_custom_reports_api_slice_enhanced__rspack_import_12.useCustomReportExportCsvMutation)();
    const [isModalOpen, setIsModalOpen] = (0,react__rspack_import_1.useState)(false);
    const [includeHeaders, setIncludeHeaders] = (0,react__rspack_import_1.useState)(true);
    const [delimiter, setDelimiter] = (0,react__rspack_import_1.useState)(';');
    const executionEngine = (0,_Pimcore_modules_execution_engine_hooks_use_execution_engine__rspack_import_17.useExecutionEngine)();
    const { filters } = (0,_Pimcore_modules_reports_reports_view_context_grid_filter_context__rspack_import_13.useGridFilterContext)();
    const { t } = (0,react_i18next__rspack_import_2.useTranslation)();
    const { styles } = (0,_Pimcore_modules_reports_reports_view_reports_view_styles__rspack_import_16.useStyles)();
    const handleExportCSV = ()=>{
        const job = new _Pimcore_modules_execution_engine_jobs_download_download_job__rspack_import_14.DownloadJob({
            title: t('jobs.csv-job.title', {
                title: currentReport
            }),
            downloadUrl: `${(0,_Pimcore_app_api_pimcore_route__rspack_import_18.getPrefix)()}/export/download/csv/{jobRunId}`,
            action: async ()=>{
                const response = await fetchExportCSV({
                    body: {
                        name: currentReport,
                        filters,
                        includeHeaders,
                        delimiter
                    }
                }).unwrap();
                return response;
            }
        });
        void executionEngine.runJob(job);
        setIsModalOpen(false);
    };
    (0,react__rspack_import_1.useEffect)(()=>{
        if (isError) {
            (0,_Pimcore_modules_app_error_handler__rspack_import_15["default"])(new _Pimcore_modules_app_error_handler__rspack_import_15.ApiError(error));
        }
    }, [
        isError
    ]);
    const renderDropdownLabel = function(translationKey) {
        let isShowIcon = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_flex_flex__rspack_import_8.Flex, {
            align: 'center',
            className: styles.dropdownLabel,
            gap: "extra-small",
            children: [
                isShowIcon && /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_icon__rspack_import_7.Icon, {
                    value: 'export'
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-toolbar/report-toolbar.tsx",
                    lineNumber: 82,
                    columnNumber: 22
                }, _this),
                t(translationKey)
            ]
        }, void 0, true, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-toolbar/report-toolbar.tsx",
            lineNumber: 81,
            columnNumber: 70
        }, _this);
    };
    const dropdownItems = [
        {
            key: 'csv-export',
            label: renderDropdownLabel('reports.csv-export'),
            onClick: ()=>{
                setIsModalOpen(true);
            }
        }
    ];
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(react_jsx_dev_runtime__rspack_import_0.Fragment, {
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_toolbar_toolbar__rspack_import_3.Toolbar, {
                justify: "space-between",
                theme: "secondary",
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_dropdown_dropdown__rspack_import_5.Dropdown, {
                        menu: {
                            items: dropdownItems
                        },
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_dropdown_button_dropdown_button__rspack_import_6.DropdownButton, {
                            "data-testid": "report-export-button",
                            children: renderDropdownLabel('reports.export', false)
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-toolbar/report-toolbar.tsx",
                            lineNumber: 97,
                            columnNumber: 11
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-toolbar/report-toolbar.tsx",
                        lineNumber: 94,
                        columnNumber: 9
                    }, undefined),
                    showPagination && /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_reports_components_pagination_pagination__rspack_import_4.Pagination, {
                        page: page,
                        pageSize: pageSize,
                        setPage: setPage,
                        setPageSize: setPageSize,
                        totalItems: totalItems
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-toolbar/report-toolbar.tsx",
                        lineNumber: 101,
                        columnNumber: 28
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-toolbar/report-toolbar.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_modal_modal__rspack_import_9.Modal, {
                onCancel: ()=>{
                    setIsModalOpen(false);
                },
                onOk: handleExportCSV,
                open: isModalOpen,
                title: t('reports.csv-export-modal.title'),
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_flex_flex__rspack_import_8.Flex, {
                    gap: "small",
                    vertical: true,
                    children: [
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)("div", {
                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_checkbox_checkbox__rspack_import_10.Checkbox, {
                                checked: includeHeaders,
                                onChange: (e)=>{
                                    setIncludeHeaders(e.target.checked);
                                },
                                children: t('reports.csv-export-modal.include-headers')
                            }, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-toolbar/report-toolbar.tsx",
                                lineNumber: 109,
                                columnNumber: 13
                            }, undefined)
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-toolbar/report-toolbar.tsx",
                            lineNumber: 108,
                            columnNumber: 11
                        }, undefined),
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)("div", {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)("div", {
                                    style: {
                                        marginBottom: '8px'
                                    },
                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)("strong", {
                                        children: [
                                            t('reports.csv-export-modal.delimiter-label'),
                                            ":"
                                        ]
                                    }, void 0, true, {
                                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-toolbar/report-toolbar.tsx",
                                        lineNumber: 120,
                                        columnNumber: 15
                                    }, undefined)
                                }, void 0, false, {
                                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-toolbar/report-toolbar.tsx",
                                    lineNumber: 117,
                                    columnNumber: 13
                                }, undefined),
                                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_input_input__rspack_import_11.Input, {
                                    maxLength: 1,
                                    onChange: (e)=>{
                                        setDelimiter(e.target.value);
                                    },
                                    placeholder: t('reports.csv-export-modal.delimiter-placeholder'),
                                    style: {
                                        width: '100%'
                                    },
                                    value: delimiter
                                }, void 0, false, {
                                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-toolbar/report-toolbar.tsx",
                                    lineNumber: 122,
                                    columnNumber: 13
                                }, undefined)
                            ]
                        }, void 0, true, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-toolbar/report-toolbar.tsx",
                            lineNumber: 116,
                            columnNumber: 11
                        }, undefined)
                    ]
                }, void 0, true, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-toolbar/report-toolbar.tsx",
                    lineNumber: 107,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-toolbar/report-toolbar.tsx",
                lineNumber: 104,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true);
};
_s(ReportToolbar, "zTubBG8jJikyGzI0zw4UXlTg7W0=", false, function() {
    return [
        _Pimcore_modules_reports_custom_reports_api_slice_enhanced__rspack_import_12.useCustomReportExportCsvMutation,
        _Pimcore_modules_execution_engine_hooks_use_execution_engine__rspack_import_17.useExecutionEngine,
        _Pimcore_modules_reports_reports_view_context_grid_filter_context__rspack_import_13.useGridFilterContext,
        react_i18next__rspack_import_2.useTranslation,
        _Pimcore_modules_reports_reports_view_reports_view_styles__rspack_import_16.useStyles
    ];
});
_c = ReportToolbar;
var _c;
$RefreshReg$(_c, "ReportToolbar");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/reports-view/components/report-top-bar/report-top-bar.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ReportTopBar: () => (ReportTopBar)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var react_i18next__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_2);
/* import */ var _Pimcore_components_toolbar_toolbar__rspack_import_3 = __webpack_require__("./js/src/core/components/toolbar/toolbar.tsx");
/* import */ var _Pimcore_components_flex_flex__rspack_import_4 = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* import */ var _Pimcore_components_text_text__rspack_import_5 = __webpack_require__("./js/src/core/components/text/text.tsx");
/* import */ var _Pimcore_components_select_select__rspack_import_6 = __webpack_require__("./js/src/core/components/select/select.tsx");
/* import */ var _Pimcore_components_content_content__rspack_import_7 = __webpack_require__("./js/src/core/components/content/content.tsx");
/* import */ var _Pimcore_modules_reports_reports_view_context_report_data_context__rspack_import_8 = __webpack_require__("./js/src/core/modules/reports/reports-view/context/report-data-context.tsx");
/* import */ var _Pimcore_modules_reports_reports_view_context_grid_filter_context__rspack_import_9 = __webpack_require__("./js/src/core/modules/reports/reports-view/context/grid-filter-context.tsx");
/* import */ var _Pimcore_modules_reports_reports_view_reports_view_styles__rspack_import_10 = __webpack_require__("./js/src/core/modules/reports/reports-view/reports-view.styles.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 









const ReportTopBar = (param)=>{
    let { currentReport, setCurrentReport, reportsTreeOptions } = param;
    _s();
    const { t } = (0,react_i18next__rspack_import_2.useTranslation)();
    const { styles } = (0,_Pimcore_modules_reports_reports_view_reports_view_styles__rspack_import_10.useStyles)();
    const { resetFilters } = (0,_Pimcore_modules_reports_reports_view_context_grid_filter_context__rspack_import_9.useGridFilterContext)();
    const { resetData } = (0,_Pimcore_modules_reports_reports_view_context_report_data_context__rspack_import_8.useReportDataContext)();
    const handleReportChange = (value)=>{
        resetData();
        resetFilters();
        setCurrentReport(value);
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_content_content__rspack_import_7.Content, {
        padded: true,
        padding: {
            top: 'extra-small',
            right: 'extra-small',
            bottom: 'extra-small',
            left: 'extra-small'
        },
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_toolbar_toolbar__rspack_import_3.Toolbar, {
            padding: {
                top: 'extra-small',
                bottom: 'extra-small',
                left: 'none',
                right: 'none'
            },
            position: "top",
            size: "auto",
            theme: "secondary",
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_flex_flex__rspack_import_4.Flex, {
                align: "center",
                gap: "extra-small",
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_text_text__rspack_import_5.Text, {
                        className: styles.selectReportLabel,
                        children: t('reports.reports-title')
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-top-bar/report-top-bar.tsx",
                        lineNumber: 56,
                        columnNumber: 11
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_select_select__rspack_import_6.Select, {
                        className: "min-w-200",
                        "data-testid": "reports-view-report-selector",
                        onChange: handleReportChange,
                        options: reportsTreeOptions,
                        placeholder: t('reports.select-report'),
                        showSearch: true,
                        value: currentReport
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-top-bar/report-top-bar.tsx",
                        lineNumber: 57,
                        columnNumber: 11
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-top-bar/report-top-bar.tsx",
                lineNumber: 55,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-top-bar/report-top-bar.tsx",
            lineNumber: 49,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-top-bar/report-top-bar.tsx",
        lineNumber: 43,
        columnNumber: 10
    }, undefined);
};
_s(ReportTopBar, "jtx7BB8qnAvBhhDAkgOMA4Wed9Q=", false, function() {
    return [
        react_i18next__rspack_import_2.useTranslation,
        _Pimcore_modules_reports_reports_view_reports_view_styles__rspack_import_10.useStyles,
        _Pimcore_modules_reports_reports_view_context_grid_filter_context__rspack_import_9.useGridFilterContext,
        _Pimcore_modules_reports_reports_view_context_report_data_context__rspack_import_8.useReportDataContext
    ];
});
_c = ReportTopBar;
var _c;
$RefreshReg$(_c, "ReportTopBar");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/reports-view/components/report-view-content/report-view-content.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ReportViewContent: () => (ReportViewContent)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var react_i18next__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_2);
/* import */ var lodash__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_3);
/* import */ var _Pimcore_components_toolbar_toolbar__rspack_import_4 = __webpack_require__("./js/src/core/components/toolbar/toolbar.tsx");
/* import */ var _Pimcore_modules_reports_components_refetch_refetch__rspack_import_5 = __webpack_require__("./js/src/core/modules/reports/components/refetch/refetch.tsx");
/* import */ var _Pimcore_modules_element_editor_layouts_tabs_toolbar_view__rspack_import_6 = __webpack_require__("./js/src/core/modules/element/editor/layouts/tabs-toolbar-view.tsx");
/* import */ var _Pimcore_components_content_layout_content_layout__rspack_import_7 = __webpack_require__("./js/src/core/components/content-layout/content-layout.tsx");
/* import */ var _Pimcore_modules_reports_reports_view_components_report_sidebar_report_sidebar__rspack_import_8 = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-sidebar/report-sidebar.tsx");
/* import */ var _Pimcore_modules_reports_reports_view_components_report_toolbar_report_toolbar__rspack_import_9 = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-toolbar/report-toolbar.tsx");
/* import */ var _Pimcore_modules_reports_reports_view_components_report_top_bar_report_top_bar__rspack_import_10 = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-top-bar/report-top-bar.tsx");
/* import */ var _Pimcore_components_content_content__rspack_import_11 = __webpack_require__("./js/src/core/components/content/content.tsx");
/* import */ var _Pimcore_modules_reports_reports_view_components_report_detail_report_detail__rspack_import_12 = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-detail/report-detail.tsx");
/* import */ var _Pimcore_components_flex_flex__rspack_import_13 = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* import */ var _Pimcore_components_text_text__rspack_import_14 = __webpack_require__("./js/src/core/components/text/text.tsx");
/* import */ var _Pimcore_utils_type_utils__rspack_import_15 = __webpack_require__("./js/src/core/utils/type-utils.ts");
/* import */ var _Pimcore_modules_reports_reports_view_context_report_data_context__rspack_import_16 = __webpack_require__("./js/src/core/modules/reports/reports-view/context/report-data-context.tsx");
/* import */ var _Pimcore_app_depency_injection__rspack_import_17 = __webpack_require__("./js/src/core/app/depency-injection/index.ts");
/* import */ var _Pimcore_app_config_services_service_ids__rspack_import_18 = __webpack_require__("./js/src/core/app/config/services/service-ids.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 

















const ReportViewContent = (param)=>{
    let { currentReport, setCurrentReport, reportsTreeOptions } = param;
    var _reportDetailData_dataSourceConfig;
    _s();
    const { t } = (0,react_i18next__rspack_import_2.useTranslation)();
    const { isLoading, isFetching, reportDetailData, chartDetailData, refetchAll, page, setPage, pageSize, setPageSize } = (0,_Pimcore_modules_reports_reports_view_context_report_data_context__rspack_import_16.useReportDataContext)();
    const isCurrentReportSelected = !(0,_Pimcore_utils_type_utils__rspack_import_15.isEmptyValue)(currentReport);
    const isLoadingReportsData = isLoading || isFetching;
    const currentSourceDefinition = reportDetailData === null || reportDetailData === void 0 ? void 0 : (_reportDetailData_dataSourceConfig = reportDetailData.dataSourceConfig) === null || _reportDetailData_dataSourceConfig === void 0 ? void 0 : _reportDetailData_dataSourceConfig.type;
    const isEmptySourceDefinitionConfig = (0,lodash__rspack_import_3.isUndefined)(currentSourceDefinition);
    const sourceDefinitionService = _Pimcore_app_depency_injection__rspack_import_17.container.get(_Pimcore_app_config_services_service_ids__rspack_import_18.serviceIds["DynamicTypes/CustomReportDefinitionRegistry"]);
    const currentAdapter = !isEmptySourceDefinitionConfig ? sourceDefinitionService.getDynamicType(currentSourceDefinition) : undefined;
    const showPagination = (0,react__rspack_import_1.useMemo)(()=>{
        if ((0,lodash__rspack_import_3.isNull)(currentReport) || (0,lodash__rspack_import_3.isUndefined)(currentAdapter)) {
            return false;
        }
        if (!(0,lodash__rspack_import_3.isFunction)(currentAdapter === null || currentAdapter === void 0 ? void 0 : currentAdapter.getPagination)) {
            return false;
        }
        return (currentAdapter === null || currentAdapter === void 0 ? void 0 : currentAdapter.getPagination()) ?? false;
    }, [
        currentReport,
        currentAdapter
    ]);
    const renderMainContent = ()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_content_content__rspack_import_11.Content, {
            centered: !isCurrentReportSelected,
            className: "h-full",
            padded: true,
            padding: {
                top: 'none',
                right: 'extra-small',
                bottom: 'extra-small',
                left: 'extra-small'
            },
            children: isCurrentReportSelected ? /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_reports_reports_view_components_report_detail_report_detail__rspack_import_12.ReportDetail, {
                chartDetailData: chartDetailData,
                currentReport: currentReport,
                isLoading: isLoadingReportsData,
                reportDetailData: reportDetailData
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-view-content/report-view-content.tsx",
                lineNumber: 69,
                columnNumber: 34
            }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_flex_flex__rspack_import_13.Flex, {
                align: "center",
                justify: "center",
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_text_text__rspack_import_14.Text, {
                    children: t('reports.select-report-name')
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-view-content/report-view-content.tsx",
                    lineNumber: 70,
                    columnNumber: 13
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-view-content/report-view-content.tsx",
                lineNumber: 69,
                columnNumber: 186
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-view-content/report-view-content.tsx",
            lineNumber: 63,
            columnNumber: 35
        }, undefined);
    const renderContent = ()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_content_layout_content_layout__rspack_import_7.ContentLayout, {
            renderSidebar: !(0,lodash__rspack_import_3.isEmpty)(reportDetailData) && /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_reports_reports_view_components_report_sidebar_report_sidebar__rspack_import_8.ReportSidebar, {}, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-view-content/report-view-content.tsx",
                lineNumber: 73,
                columnNumber: 91
            }, undefined),
            renderToolbar: !(0,lodash__rspack_import_3.isEmpty)(chartDetailData === null || chartDetailData === void 0 ? void 0 : chartDetailData.items) && !isFetching && /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_reports_reports_view_components_report_toolbar_report_toolbar__rspack_import_9.ReportToolbar, {
                currentReport: currentReport,
                page: page,
                pageSize: pageSize,
                setPage: setPage,
                setPageSize: setPageSize,
                showPagination: showPagination,
                totalItems: (chartDetailData === null || chartDetailData === void 0 ? void 0 : chartDetailData.totalItems) ?? 0
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-view-content/report-view-content.tsx",
                lineNumber: 73,
                columnNumber: 176
            }, undefined),
            renderTopBar: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_reports_reports_view_components_report_top_bar_report_top_bar__rspack_import_10.ReportTopBar, {
                currentReport: currentReport,
                reportsTreeOptions: reportsTreeOptions,
                setCurrentReport: setCurrentReport
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-view-content/report-view-content.tsx",
                lineNumber: 73,
                columnNumber: 393
            }, undefined),
            children: renderMainContent()
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-view-content/report-view-content.tsx",
            lineNumber: 73,
            columnNumber: 31
        }, undefined);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_element_editor_layouts_tabs_toolbar_view__rspack_import_6.TabsToolbarView, {
        renderTabbar: renderContent(),
        renderToolbar: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_toolbar_toolbar__rspack_import_4.Toolbar, {
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_reports_components_refetch_refetch__rspack_import_5.Refetch, {
                isFetching: isLoadingReportsData,
                refetch: refetchAll
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-view-content/report-view-content.tsx",
                lineNumber: 77,
                columnNumber: 11
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-view-content/report-view-content.tsx",
            lineNumber: 76,
            columnNumber: 73
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/components/report-view-content/report-view-content.tsx",
        lineNumber: 76,
        columnNumber: 10
    }, undefined);
};
_s(ReportViewContent, "xC0zpm3drSnHp6BcVONM3HFr5iQ=", false, function() {
    return [
        react_i18next__rspack_import_2.useTranslation,
        _Pimcore_modules_reports_reports_view_context_report_data_context__rspack_import_16.useReportDataContext
    ];
});
_c = ReportViewContent;
var _c;
$RefreshReg$(_c, "ReportViewContent");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/reports-view/context/grid-filter-context.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  GridFilterProvider: () => (GridFilterProvider),
  useGridFilterContext: () => (useGridFilterContext)
});
/* import */ var _Pimcore_components_grid_contexts_filter_context__rspack_import_0 = __webpack_require__("./js/src/core/components/grid/contexts/filter-context.tsx");
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
const { FilterProvider: GridFilterProvider, useFilterContext: useGridFilterContext } = (0,_Pimcore_components_grid_contexts_filter_context__rspack_import_0.createFilterContext)();

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/reports-view/context/report-data-context.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  PAGE_INITIAL: () => (PAGE_INITIAL),
  PAGE_SIZE_INITIAL: () => (PAGE_SIZE_INITIAL),
  ReportDataProvider: () => (ReportDataProvider),
  SORTING_INITIAL: () => (SORTING_INITIAL),
  useReportDataContext: () => (useReportDataContext)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var lodash__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_2);
/* import */ var _Pimcore_modules_reports_reports_view_hooks_useReportData__rspack_import_3 = __webpack_require__("./js/src/core/modules/reports/reports-view/hooks/useReportData.ts");
/* import */ var _Pimcore_modules_reports_reports_view_context_grid_filter_context__rspack_import_4 = __webpack_require__("./js/src/core/modules/reports/reports-view/context/grid-filter-context.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$(), _s1 = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 



const PAGE_INITIAL = 1;
const PAGE_SIZE_INITIAL = 50;
const SORTING_INITIAL = undefined;
const ReportDataContext = /*#__PURE__*/ (0,react__rspack_import_1.createContext)(undefined);
const ReportDataProvider = (param)=>{
    let { name, children } = param;
    _s();
    const [page, setPage] = (0,react__rspack_import_1.useState)(PAGE_INITIAL);
    const [pageSize, setPageSize] = (0,react__rspack_import_1.useState)(PAGE_SIZE_INITIAL);
    const [sorting, setSorting] = (0,react__rspack_import_1.useState)(SORTING_INITIAL);
    const { filters } = (0,_Pimcore_modules_reports_reports_view_context_grid_filter_context__rspack_import_4.useGridFilterContext)();
    const resetData = ()=>{
        setPage(PAGE_INITIAL);
        setPageSize(PAGE_SIZE_INITIAL);
        setSorting(SORTING_INITIAL);
    };
    const reportDataValue = (0,_Pimcore_modules_reports_reports_view_hooks_useReportData__rspack_import_3.useReportData)({
        name,
        filters,
        page,
        pageSize,
        sorting
    });
    const contextValue = (0,react__rspack_import_1.useMemo)(()=>({
            ...reportDataValue,
            page,
            setPage,
            pageSize,
            setPageSize,
            sorting,
            setSorting,
            resetData
        }), [
        reportDataValue,
        page,
        setPage,
        pageSize,
        setPageSize,
        sorting,
        setSorting
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(ReportDataContext.Provider, {
        value: contextValue,
        children: children
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/context/report-data-context.tsx",
        lineNumber: 51,
        columnNumber: 10
    }, undefined);
};
_s(ReportDataProvider, "Q4+d/QwuMbMAJpWkJV4eUwuKzeo=", false, function() {
    return [
        _Pimcore_modules_reports_reports_view_context_grid_filter_context__rspack_import_4.useGridFilterContext,
        _Pimcore_modules_reports_reports_view_hooks_useReportData__rspack_import_3.useReportData
    ];
});
_c = ReportDataProvider;
const useReportDataContext = ()=>{
    _s1();
    const context = (0,react__rspack_import_1.useContext)(ReportDataContext);
    if ((0,lodash__rspack_import_2.isUndefined)(context)) {
        throw new Error('useReportDataContext must be used within a ReportDataProvider');
    }
    return context;
};
_s1(useReportDataContext, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
$RefreshReg$(_c, "ReportDataProvider");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/reports-view/reports-view-wrapper.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ReportsViewWrapper: () => (ReportsViewWrapper)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _Pimcore_modules_reports_reports_view_context_grid_filter_context__rspack_import_2 = __webpack_require__("./js/src/core/modules/reports/reports-view/context/grid-filter-context.tsx");
/* import */ var _Pimcore_components_grid_contexts_columns_context__rspack_import_3 = __webpack_require__("./js/src/core/components/grid/contexts/columns-context.tsx");
/* import */ var _Pimcore_modules_reports_reports_view_reports_view__rspack_import_4 = __webpack_require__("./js/src/core/modules/reports/reports-view/reports-view.tsx");
/* import */ var _Pimcore_modules_element_dynamic_types_registry_provider_dynamic_type_registry_provider__rspack_import_5 = __webpack_require__("./js/src/core/modules/element/dynamic-types/registry/provider/dynamic-type-registry-provider.tsx");
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




const ReportsViewWrapper = (param)=>{
    let { reportId } = param;
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_reports_reports_view_context_grid_filter_context__rspack_import_2.GridFilterProvider, {
        initialValue: {
            columnFilters: [],
            drillDownFilters: {}
        },
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_grid_contexts_columns_context__rspack_import_3.ColumnsProvider, {
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_element_dynamic_types_registry_provider_dynamic_type_registry_provider__rspack_import_5.DynamicTypeRegistryProvider, {
                serviceIds: [
                    'DynamicTypes/FieldFilterRegistry'
                ],
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_reports_reports_view_reports_view__rspack_import_4.ReportsView, {
                    reportId: reportId
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/reports-view-wrapper.tsx",
                    lineNumber: 25,
                    columnNumber: 11
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/reports-view-wrapper.tsx",
                lineNumber: 24,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/reports-view-wrapper.tsx",
            lineNumber: 23,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/reports-view-wrapper.tsx",
        lineNumber: 19,
        columnNumber: 10
    }, undefined);
};
_c = ReportsViewWrapper;
var _c;
$RefreshReg$(_c, "ReportsViewWrapper");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/reports-view/reports-view.styles.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyles: () => (useStyles)
});
/* import */ var antd_style__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/antd-style/antd-style");
/* import */ var antd_style__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(antd_style__rspack_import_0);
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
const useStyles = (0,antd_style__rspack_import_0.createStyles)((param)=>{
    let { css, token } = param;
    return {
        selectReportLabel: css`
      color: ${token.itemActiveColor};
      font-weight: ${token.fontWeightStrong};
    `,
        selectReportGroupLabel: css`
      color: ${token.colorTextDescription};
      font-size: ${token.fontSize}px;
      text-transform: uppercase;
    `,
        withDivider: css`
      &:before {
        content: '';
        display: block;
        margin-bottom: 10px;
        width: 100%;
        height: 1px;
        background-color: ${token.colorSplit};
      }
    `,
        drillDownSelectLabel: css`
      color: ${token.colorPrimary};
    `,
        dropdownLabel: css`
      color: ${token.colorPrimary};
    `,
        btnLink: css`
      padding: 0;
    `,
        gridTable: css`
      min-height: 300px;
      overflow: auto;
    `,
        stackItem: css`
      display: block;
      max-width: 100%;
      width: min-content;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `
    };
});

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/reports-view/reports-view.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ReportsView: () => (ReportsView)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var lodash__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_2);
/* import */ var classnames__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/classnames/classnames");
/* import */ var classnames__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(classnames__rspack_import_3);
/* import */ var _Pimcore_utils_type_utils__rspack_import_4 = __webpack_require__("./js/src/core/utils/type-utils.ts");
/* import */ var _Pimcore_modules_reports_custom_reports_api_slice_enhanced__rspack_import_5 = __webpack_require__("./js/src/core/modules/reports/custom-reports-api-slice-enhanced.ts");
/* import */ var _Pimcore_components_content_content__rspack_import_6 = __webpack_require__("./js/src/core/components/content/content.tsx");
/* import */ var _Pimcore_components_flex_flex__rspack_import_7 = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* import */ var _Pimcore_components_icon_icon__rspack_import_8 = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* import */ var _Pimcore_components_sanitize_html_sanitize_html__rspack_import_9 = __webpack_require__("./js/src/core/components/sanitize-html/sanitize-html.tsx");
/* import */ var _Pimcore_modules_reports_reports_view_context_report_data_context__rspack_import_10 = __webpack_require__("./js/src/core/modules/reports/reports-view/context/report-data-context.tsx");
/* import */ var _Pimcore_modules_reports_reports_view_components_report_view_content_report_view_content__rspack_import_11 = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-view-content/report-view-content.tsx");
/* import */ var _Pimcore_modules_auth_permission_helper__rspack_import_12 = __webpack_require__("./js/src/core/modules/auth/permission-helper.ts");
/* import */ var _Pimcore_modules_auth_enums_user_permission__rspack_import_13 = __webpack_require__("./js/src/core/modules/auth/enums/user-permission.ts");
/* import */ var _reports_view_styles__rspack_import_14 = __webpack_require__("./js/src/core/modules/reports/reports-view/reports-view.styles.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 













const ReportsView = (param)=>{
    let { reportId } = param;
    _s();
    const [currentReport, setCurrentReport] = (0,react__rspack_import_1.useState)(reportId ?? null);
    const hasPermission = (0,_Pimcore_modules_auth_permission_helper__rspack_import_12.isAllowed)(_Pimcore_modules_auth_enums_user_permission__rspack_import_13.UserPermission.Reports);
    const { isLoading: isReportsTreeLoading, data: reportsTreeData } = (0,_Pimcore_modules_reports_custom_reports_api_slice_enhanced__rspack_import_5.useCustomReportsGetTreeQuery)({
        page: 1,
        pageSize: 9999
    }, {
        skip: !hasPermission
    });
    const { styles } = (0,_reports_view_styles__rspack_import_14.useStyles)();
    const renderOptionLabel = (iconClass, value)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_flex_flex__rspack_import_7.Flex, {
            align: "center",
            gap: "mini",
            children: [
                !(0,_Pimcore_utils_type_utils__rspack_import_4.isEmptyValue)(iconClass) && /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_icon__rspack_import_8.Icon, {
                    value: iconClass
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/reports-view.tsx",
                    lineNumber: 43,
                    columnNumber: 36
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_sanitize_html_sanitize_html__rspack_import_9.SanitizeHtml, {
                    html: value
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/reports-view.tsx",
                    lineNumber: 44,
                    columnNumber: 7
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/reports-view.tsx",
            lineNumber: 42,
            columnNumber: 51
        }, undefined);
    const reportsTreeOptions = (0,react__rspack_import_1.useMemo)(()=>{
        if (!(0,lodash__rspack_import_2.isUndefined)(reportsTreeData === null || reportsTreeData === void 0 ? void 0 : reportsTreeData.items)) {
            var _reportsTreeData_items;
            const reportsTreeDataWithSourceConfig = (_reportsTreeData_items = reportsTreeData.items) === null || _reportsTreeData_items === void 0 ? void 0 : _reportsTreeData_items.filter((item)=>item.hasDataSourceConfig);
            const groupedOptions = {};
            const ungroupedOptions = [];
            reportsTreeDataWithSourceConfig === null || reportsTreeDataWithSourceConfig === void 0 ? void 0 : reportsTreeDataWithSourceConfig.forEach((item)=>{
                const reportLabel = !(0,_Pimcore_utils_type_utils__rspack_import_4.isEmptyValue)(item.niceName) ? item.niceName : item.name;
                if ((0,_Pimcore_utils_type_utils__rspack_import_4.isEmptyValue)(item.group)) {
                    ungroupedOptions.push({
                        label: renderOptionLabel(item.iconClass, reportLabel),
                        value: item.name
                    });
                    return;
                }
                if ((0,lodash__rspack_import_2.isUndefined)(groupedOptions[item.group])) {
                    const elementWithGroupIcon = reportsTreeDataWithSourceConfig === null || reportsTreeDataWithSourceConfig === void 0 ? void 0 : reportsTreeDataWithSourceConfig.filter((element)=>element.group === item.group).find((element)=>!(0,_Pimcore_utils_type_utils__rspack_import_4.isEmptyValue)(element.groupIconClass));
                    groupedOptions[item.group] = {
                        label: renderOptionLabel((elementWithGroupIcon === null || elementWithGroupIcon === void 0 ? void 0 : elementWithGroupIcon.groupIconClass) ?? '', item.group),
                        title: item.group,
                        options: []
                    };
                }
                groupedOptions[item.group].options.push({
                    label: renderOptionLabel(item.iconClass, reportLabel),
                    value: item.name
                });
            });
            const hasUngroupedOptions = ungroupedOptions.length > 0;
            Object.keys(groupedOptions).forEach((groupKey, index)=>{
                const title = groupedOptions[groupKey].label;
                const withDivider = hasUngroupedOptions || index > 0;
                groupedOptions[groupKey].label = /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)("div", {
                    className: classnames__rspack_import_3_default()(styles.selectReportGroupLabel, {
                        [styles.withDivider]: withDivider
                    }),
                    children: title
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/reports-view.tsx",
                    lineNumber: 77,
                    columnNumber: 42
                }, undefined);
            });
            return [
                ...ungroupedOptions,
                ...Object.values(groupedOptions)
            ];
        }
        return [];
    }, [
        reportsTreeData
    ]);
    const isLoadingReportsTree = isReportsTreeLoading && (0,lodash__rspack_import_2.isEmpty)(reportsTreeOptions);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_content_content__rspack_import_6.Content, {
        loading: isLoadingReportsTree,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_reports_reports_view_context_report_data_context__rspack_import_10.ReportDataProvider, {
            name: currentReport ?? '',
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_reports_reports_view_components_report_view_content_report_view_content__rspack_import_11.ReportViewContent, {
                currentReport: currentReport,
                reportsTreeOptions: reportsTreeOptions,
                setCurrentReport: setCurrentReport
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/reports-view.tsx",
                lineNumber: 90,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/reports-view.tsx",
            lineNumber: 89,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/reports/reports-view/reports-view.tsx",
        lineNumber: 88,
        columnNumber: 10
    }, undefined);
};
_s(ReportsView, "IHqp0mW9DXgRHWEcFVCDqnsvBL8=", false, function() {
    return [
        _Pimcore_modules_reports_custom_reports_api_slice_enhanced__rspack_import_5.useCustomReportsGetTreeQuery,
        _reports_view_styles__rspack_import_14.useStyles
    ];
});
_c = ReportsView;
var _c;
$RefreshReg$(_c, "ReportsView");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},

}]);
//# sourceMappingURL=js_src_core_modules_reports_dynamic-types_definitions_custom-report-definition-adapters_dynam-1ec4ec.js.map