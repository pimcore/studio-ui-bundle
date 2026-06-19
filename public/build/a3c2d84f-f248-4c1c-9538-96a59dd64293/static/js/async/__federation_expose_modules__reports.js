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
(self["chunk_pimcore_studio_ui_bundle "] = self["chunk_pimcore_studio_ui_bundle "] || []).push([["__federation_expose_modules__reports"], {
"./js/src/core/modules/element/editor/layouts/tabs-toolbar-view.styles.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyles: () => (useStyles)
});
/* import */ var _Pimcore_modules_ant_design_styles_create_styles__rspack_import_0 = __webpack_require__("./js/src/core/modules/ant-design/styles/create-styles.ts");
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
const useStyles = (0,_Pimcore_modules_ant_design_styles_create_styles__rspack_import_0.createStyles)((param)=>{
    let { token, css } = param;
    return {
        tabbarToolbar: css`
      &.tabs-toolbar-layout {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        overflow: hidden;
      }

      .tabs-toolbar-layout__tabbar {
        display: flex;
        overflow: hidden;
        height: calc(100% - ${token.sizeXXL}px);
        width: 100%;
      }

      .tabs-toolbar-layout__toolbar {
        display: flex;
        overflow: hidden;
        height: ${token.sizeXXL}px;
        width: 100%;
      }
    `
    };
}, {
    hashPriority: 'low'
});

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/perspectives/enums/nav-permission.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  NavPermission: () => (NavPermission)
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
 */ var NavPermission = /*#__PURE__*/ function(NavPermission) {
    NavPermission["QuickAccessHidden"] = "quickAccess.hidden";
    NavPermission["OpenDocument"] = "quickAccess.open_document";
    NavPermission["OpenObject"] = "quickAccess.open_object";
    NavPermission["OpenAsset"] = "quickAccess.open_asset";
    NavPermission["RecycleBin"] = "quickAccess.recycle_bin";
    NavPermission["DataManagementHidden"] = "dataManagement.hidden";
    NavPermission["NotesAndEvents"] = "dataManagement.notesEvents";
    NavPermission["SearchReplaceAssignments"] = "dataManagement.searchReplaceAssignments";
    NavPermission["PredefinedProperties"] = "dataManagement.predefinedProperties";
    NavPermission["TagConfiguration"] = "dataManagement.tagConfiguration";
    NavPermission["GDPRDataExtractor"] = "dataManagement.gdprDataExtractor";
    NavPermission["ClassDefinitions"] = "dataManagement.dataModel_classes";
    NavPermission["FieldCollections"] = "dataManagement.dataModel_fieldCollections";
    NavPermission["ObjectBricks"] = "dataManagement.dataModel_objectBricks";
    NavPermission["ClassificationStore"] = "dataManagement.dataModel_classificationStore";
    NavPermission["SelectOptions"] = "dataManagement.dataModel_selectOptions";
    NavPermission["QuantityValues"] = "dataManagement.dataModel_quantityValue";
    NavPermission["BulkExport"] = "dataManagement.dataModel_bulkExport";
    NavPermission["BulkImport"] = "dataManagement.dataModel_bulkImport";
    NavPermission["AssetThumbnails"] = "assetManagement.assetThumbnails";
    NavPermission["PredefinedAssetMetadata"] = "assetManagement.predefinedAssetMetadata";
    NavPermission["ExperienceEcommerceHidden"] = "experienceEcommerce.hidden";
    NavPermission["Mails"] = "experienceEcommerce.emails";
    NavPermission["DocumentTypes"] = "experienceEcommerce.documentTypes";
    NavPermission["WebsiteSettings"] = "experienceEcommerce.websiteSettings";
    NavPermission["Redirects"] = "experienceEcommerce.redirects";
    NavPermission["RobotsTxt"] = "experienceEcommerce.robotsTxt";
    NavPermission["TranslationsHidden"] = "translations.hidden";
    NavPermission["Translations"] = "translations.translations";
    NavPermission["Appearance"] = "system.appearanceBranding";
    NavPermission["ReportingHidden"] = "reporting.hidden";
    NavPermission["Reports"] = "reporting.reports";
    NavPermission["CustomReportsConfiguration"] = "reporting.customReportsConfiguration";
    NavPermission["SystemHidden"] = "system.hidden";
    NavPermission["UsersHidden"] = "system.users_hidden";
    NavPermission["Users"] = "system.users_users";
    NavPermission["Roles"] = "system.users_roles";
    NavPermission["PerspectiveEditor"] = "system.perspectiveEditor";
    NavPermission["WidgetEditor"] = "system.widgetEditor";
    NavPermission["ApplicationLogger"] = "system.applicationLogger";
    NavPermission["About"] = "system.about";
    NavPermission["SystemSettings"] = "system.systemSettings";
    NavPermission["SearchHidden"] = "search.hidden";
    return NavPermission;
}({});

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/reports/reports-editor/types.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
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

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/sdk/modules/reports/index.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  BarChart: () => (/* reexport safe */ _Pimcore_modules_reports_reports_view_components_report_chart_components_bar_chart_bar_chart__rspack_import_9.BarChart),
  COLUMN_KEYS: () => (/* reexport safe */ _Pimcore_modules_reports_reports_editor_components_report_configuration_components_column_configuration_constants__rspack_import_5.COLUMN_KEYS),
  CUSTOM_REPORTS_WIDGET: () => (/* reexport safe */ _Pimcore_modules_reports__rspack_import_0.CUSTOM_REPORTS_WIDGET),
  DynamicTypeCustomReportDefinitionAbstract: () => (/* reexport safe */ _Pimcore_modules_reports_dynamic_types_definitions_custom_report_definition_adapters_dynamic_type_custom_report_definition_abstract__rspack_import_2.DynamicTypeCustomReportDefinitionAbstract),
  DynamicTypeCustomReportDefinitionRegistry: () => (/* reexport safe */ _Pimcore_modules_reports_dynamic_types_definitions_custom_report_definition_adapters_dynamic_type_custom_report_definition_registry__rspack_import_1.DynamicTypeCustomReportDefinitionRegistry),
  LineChart: () => (/* reexport safe */ _Pimcore_modules_reports_reports_view_components_report_chart_components_line_chart_line_chart__rspack_import_8.LineChart),
  PieChart: () => (/* reexport safe */ _Pimcore_modules_reports_reports_view_components_report_chart_components_pie_chart_pie_chart__rspack_import_7.PieChart),
  REPORTS_WIDGET: () => (/* reexport safe */ _Pimcore_modules_reports__rspack_import_0.REPORTS_WIDGET),
  ReportActionType: () => (/* reexport safe */ _Pimcore_modules_reports_reports_view_helpers__rspack_import_10.ReportActionType),
  ReportChart: () => (/* reexport safe */ _Pimcore_modules_reports_reports_view_components_report_chart_report_chart__rspack_import_6.ReportChart),
  ReportsApiSlice: () => (/* reexport module object */ _Pimcore_modules_reports_custom_reports_api_slice_enhanced__rspack_import_11),
  getTypeByActionType: () => (/* reexport safe */ _Pimcore_modules_reports_reports_view_helpers__rspack_import_10.getTypeByActionType),
  normalizeReportFormData: () => (/* reexport safe */ _Pimcore_modules_reports_reports_editor_hooks_use_report_form_state__rspack_import_4.normalizeReportFormData),
  useReportFormState: () => (/* reexport safe */ _Pimcore_modules_reports_reports_editor_hooks_use_report_form_state__rspack_import_4.useReportFormState)
});
/* import */ var _Pimcore_modules_reports__rspack_import_0 = __webpack_require__("./js/src/core/modules/reports/index.tsx");
/* import */ var _Pimcore_modules_reports_dynamic_types_definitions_custom_report_definition_adapters_dynamic_type_custom_report_definition_registry__rspack_import_1 = __webpack_require__("./js/src/core/modules/reports/dynamic-types/definitions/custom-report-definition-adapters/dynamic-type-custom-report-definition-registry.ts");
/* import */ var _Pimcore_modules_reports_dynamic_types_definitions_custom_report_definition_adapters_dynamic_type_custom_report_definition_abstract__rspack_import_2 = __webpack_require__("./js/src/core/modules/reports/dynamic-types/definitions/custom-report-definition-adapters/dynamic-type-custom-report-definition-abstract.tsx");
/* import */ var _Pimcore_modules_reports_reports_editor_types__rspack_import_3 = __webpack_require__("./js/src/core/modules/reports/reports-editor/types.ts");
/* import */ var _Pimcore_modules_reports_reports_editor_hooks_use_report_form_state__rspack_import_4 = __webpack_require__("./js/src/core/modules/reports/reports-editor/hooks/use-report-form-state.ts");
/* import */ var _Pimcore_modules_reports_reports_editor_components_report_configuration_components_column_configuration_constants__rspack_import_5 = __webpack_require__("./js/src/core/modules/reports/reports-editor/components/report-configuration/components/column-configuration/constants.ts");
/* import */ var _Pimcore_modules_reports_reports_view_components_report_chart_report_chart__rspack_import_6 = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-chart/report-chart.tsx");
/* import */ var _Pimcore_modules_reports_reports_view_components_report_chart_components_pie_chart_pie_chart__rspack_import_7 = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-chart/components/pie-chart/pie-chart.tsx");
/* import */ var _Pimcore_modules_reports_reports_view_components_report_chart_components_line_chart_line_chart__rspack_import_8 = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-chart/components/line-chart/line-chart.tsx");
/* import */ var _Pimcore_modules_reports_reports_view_components_report_chart_components_bar_chart_bar_chart__rspack_import_9 = __webpack_require__("./js/src/core/modules/reports/reports-view/components/report-chart/components/bar-chart/bar-chart.tsx");
/* import */ var _Pimcore_modules_reports_reports_view_helpers__rspack_import_10 = __webpack_require__("./js/src/core/modules/reports/reports-view/helpers.ts");
/* import */ var _Pimcore_modules_reports_custom_reports_api_slice_enhanced__rspack_import_11 = __webpack_require__("./js/src/core/modules/reports/custom-reports-api-slice-enhanced.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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














function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/element/editor/layouts/tabs-toolbar-view.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TabsToolbarView: () => (TabsToolbarView)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _tabs_toolbar_view_styles__rspack_import_2 = __webpack_require__("./js/src/core/modules/element/editor/layouts/tabs-toolbar-view.styles.ts");
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

const TabsToolbarView = (props)=>{
    _s();
    const { styles } = (0,_tabs_toolbar_view_styles__rspack_import_2.useStyles)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)("div", {
        className: [
            'tabs-toolbar-layout',
            styles.tabbarToolbar
        ].join(' '),
        "data-testid": props.dataTestId,
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)("div", {
                className: "tabs-toolbar-layout__tabbar",
                children: props.renderTabbar
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/layouts/tabs-toolbar-view.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)("div", {
                className: "tabs-toolbar-layout__toolbar",
                children: props.renderToolbar
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/layouts/tabs-toolbar-view.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/layouts/tabs-toolbar-view.tsx",
        lineNumber: 17,
        columnNumber: 10
    }, undefined);
};
_s(TabsToolbarView, "7xVbA/cAv2OTrtL4/ZezCn5HG/A=", false, function() {
    return [
        _tabs_toolbar_view_styles__rspack_import_2.useStyles
    ];
});
_c = TabsToolbarView;

var _c;
$RefreshReg$(_c, "TabsToolbarView");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},

}]);
//# sourceMappingURL=__federation_expose_modules__reports.js.map