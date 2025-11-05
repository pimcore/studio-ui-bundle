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
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["__federation_expose_modules__reports"], {
"./js/src/core/modules/reports/reports-editor/types.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
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
"./js/src/sdk/modules/reports/index.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  BarChart: () => (/* reexport safe */ _Pimcore_modules_reports_reports_view_components_report_chart_components_bar_chart_bar_chart__WEBPACK_IMPORTED_MODULE_8__.BarChart),
  COLUMN_KEYS: () => (/* reexport safe */ _Pimcore_modules_reports_reports_editor_components_report_configuration_components_column_configuration_constants__WEBPACK_IMPORTED_MODULE_4__.COLUMN_KEYS),
  DynamicTypeCustomReportDefinitionAbstract: () => (/* reexport safe */ _Pimcore_modules_reports_dynamic_types_definitions_custom_report_definition_adapters_dynamic_type_custom_report_definition_abstract__WEBPACK_IMPORTED_MODULE_1__.DynamicTypeCustomReportDefinitionAbstract),
  DynamicTypeCustomReportDefinitionRegistry: () => (/* reexport safe */ _Pimcore_modules_reports_dynamic_types_definitions_custom_report_definition_adapters_dynamic_type_custom_report_definition_registry__WEBPACK_IMPORTED_MODULE_0__.DynamicTypeCustomReportDefinitionRegistry),
  LineChart: () => (/* reexport safe */ _Pimcore_modules_reports_reports_view_components_report_chart_components_line_chart_line_chart__WEBPACK_IMPORTED_MODULE_7__.LineChart),
  PieChart: () => (/* reexport safe */ _Pimcore_modules_reports_reports_view_components_report_chart_components_pie_chart_pie_chart__WEBPACK_IMPORTED_MODULE_6__.PieChart),
  ReportChart: () => (/* reexport safe */ _Pimcore_modules_reports_reports_view_components_report_chart_report_chart__WEBPACK_IMPORTED_MODULE_5__.ReportChart),
  ReportsApiSlice: () => (/* reexport module object */ _Pimcore_modules_reports_custom_reports_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_9__),
  useReportFormState: () => (/* reexport safe */ _Pimcore_modules_reports_reports_editor_hooks_use_report_form_state__WEBPACK_IMPORTED_MODULE_3__.useReportFormState)
});
/* ESM import */var _Pimcore_modules_reports_dynamic_types_definitions_custom_report_definition_adapters_dynamic_type_custom_report_definition_registry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/reports/dynamic-types/definitions/custom-report-definition-adapters/dynamic-type-custom-report-definition-registry.ts");
/* ESM import */var _Pimcore_modules_reports_dynamic_types_definitions_custom_report_definition_adapters_dynamic_type_custom_report_definition_abstract__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/reports/dynamic-types/definitions/custom-report-definition-adapters/dynamic-type-custom-report-definition-abstract.tsx");
/* ESM import */var _Pimcore_modules_reports_reports_editor_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/reports/reports-editor/types.ts");
/* ESM import */var _Pimcore_modules_reports_reports_editor_hooks_use_report_form_state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/reports/reports-editor/hooks/use-report-form-state.ts");
/* ESM import */var _Pimcore_modules_reports_reports_editor_components_report_configuration_components_column_configuration_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/reports/reports-editor/components/report-configuration/components/column-configuration/constants.ts");
/* ESM import */var _Pimcore_modules_reports_reports_view_components_report_chart_report_chart__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-chart/report-chart.tsx");
/* ESM import */var _Pimcore_modules_reports_reports_view_components_report_chart_components_pie_chart_pie_chart__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-chart/components/pie-chart/pie-chart.tsx");
/* ESM import */var _Pimcore_modules_reports_reports_view_components_report_chart_components_line_chart_line_chart__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-chart/components/line-chart/line-chart.tsx");
/* ESM import */var _Pimcore_modules_reports_reports_view_components_report_chart_components_bar_chart_bar_chart__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-chart/components/bar-chart/bar-chart.tsx");
/* ESM import */var _Pimcore_modules_reports_custom_reports_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/reports/custom-reports-api-slice-enhanced.ts");
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
//# sourceMappingURL=__federation_expose_modules__reports.js.map