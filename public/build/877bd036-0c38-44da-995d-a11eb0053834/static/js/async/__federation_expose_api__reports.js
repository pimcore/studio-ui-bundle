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
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["__federation_expose_api__reports"], {
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
"./js/src/sdk/api/reports/index.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (/* reexport safe */ _Pimcore_modules_reports_custom_reports_api_slice_gen__WEBPACK_IMPORTED_MODULE_0__.addTagTypes),
  api: () => (/* reexport safe */ _Pimcore_modules_reports_custom_reports_api_slice_gen__WEBPACK_IMPORTED_MODULE_0__.api),
  useCustomReportExportCsvMutation: () => (/* reexport safe */ _Pimcore_modules_reports_custom_reports_api_slice_gen__WEBPACK_IMPORTED_MODULE_0__.useCustomReportExportCsvMutation),
  useCustomReportsChartQuery: () => (/* reexport safe */ _Pimcore_modules_reports_custom_reports_api_slice_gen__WEBPACK_IMPORTED_MODULE_0__.useCustomReportsChartQuery),
  useCustomReportsColumnConfigListQuery: () => (/* reexport safe */ _Pimcore_modules_reports_custom_reports_api_slice_gen__WEBPACK_IMPORTED_MODULE_0__.useCustomReportsColumnConfigListQuery),
  useCustomReportsConfigAddMutation: () => (/* reexport safe */ _Pimcore_modules_reports_custom_reports_api_slice_gen__WEBPACK_IMPORTED_MODULE_0__.useCustomReportsConfigAddMutation),
  useCustomReportsConfigCloneMutation: () => (/* reexport safe */ _Pimcore_modules_reports_custom_reports_api_slice_gen__WEBPACK_IMPORTED_MODULE_0__.useCustomReportsConfigCloneMutation),
  useCustomReportsConfigDeleteMutation: () => (/* reexport safe */ _Pimcore_modules_reports_custom_reports_api_slice_gen__WEBPACK_IMPORTED_MODULE_0__.useCustomReportsConfigDeleteMutation),
  useCustomReportsConfigGetTreeQuery: () => (/* reexport safe */ _Pimcore_modules_reports_custom_reports_api_slice_gen__WEBPACK_IMPORTED_MODULE_0__.useCustomReportsConfigGetTreeQuery),
  useCustomReportsConfigUpdateMutation: () => (/* reexport safe */ _Pimcore_modules_reports_custom_reports_api_slice_gen__WEBPACK_IMPORTED_MODULE_0__.useCustomReportsConfigUpdateMutation),
  useCustomReportsGetTreeQuery: () => (/* reexport safe */ _Pimcore_modules_reports_custom_reports_api_slice_gen__WEBPACK_IMPORTED_MODULE_0__.useCustomReportsGetTreeQuery),
  useCustomReportsListDrillDownOptionsQuery: () => (/* reexport safe */ _Pimcore_modules_reports_custom_reports_api_slice_gen__WEBPACK_IMPORTED_MODULE_0__.useCustomReportsListDrillDownOptionsQuery),
  useCustomReportsReportQuery: () => (/* reexport safe */ _Pimcore_modules_reports_custom_reports_api_slice_gen__WEBPACK_IMPORTED_MODULE_0__.useCustomReportsReportQuery)
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
 */ if (true) {
    module.hot.accept();
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

}]);
//# sourceMappingURL=__federation_expose_api__reports.js.map