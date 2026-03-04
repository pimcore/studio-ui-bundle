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
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["__federation_expose_modules__application_logger"], {
"./js/src/core/modules/element/sidebar/sidebar-manager.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SidebarManager: () => (SidebarManager)
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
 */ class SidebarManager {
    getEntries() {
        return this.entries;
    }
    getVisibleEntries(context) {
        return this.entries.filter((entry)=>{
            // If no isVisible function is provided, the entry is always visible
            if (entry.isVisible === undefined) {
                return true;
            }
            try {
                return entry.isVisible(context);
            } catch (error) {
                console.warn(`Error checking visibility for sidebar entry "${entry.key}":`, error);
                return false;
            }
        });
    }
    getEntry(key) {
        return this.entries.find((entry)=>entry.key === key);
    }
    registerEntry(entry) {
        if (this.getEntry(entry.key) !== undefined) {
            this.entries.splice(this.entries.findIndex((e)=>e.key === entry.key), 1, entry);
            return;
        }
        this.entries.push(entry);
    }
    getButtons() {
        return this.buttons;
    }
    getButton(key) {
        return this.buttons.find((button)=>button.key === key);
    }
    registerButton(button) {
        if (this.getButton(button.key) !== undefined) {
            this.buttons.splice(this.buttons.findIndex((e)=>e.key === button.key), 1, button);
            return;
        }
        this.buttons.push(button);
    }
    constructor(){
        this.entries = [];
        this.buttons = [];
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
"./js/src/core/modules/perspectives/enums/nav-permission.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  NavPermission: () => (NavPermission)
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
    NavPermission["AssetThumbnails"] = "assetManagement.assetThumbnails";
    NavPermission["ExperienceEcommerceHidden"] = "experienceEcommerce.hidden";
    NavPermission["Mails"] = "experienceEcommerce.emails";
    NavPermission["DocumentTypes"] = "experienceEcommerce.documentTypes";
    NavPermission["WebsiteSettings"] = "experienceEcommerce.websiteSettings";
    NavPermission["Redirects"] = "experienceEcommerce.redirects";
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
"./js/src/sdk/modules/application-logger/index.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  APPLICATION_LOGGER_WIDGET: () => (/* reexport safe */ _Pimcore_modules_application_logger_index__WEBPACK_IMPORTED_MODULE_2__.APPLICATION_LOGGER_WIDGET),
  ApplicationLogger: () => (/* reexport safe */ _Pimcore_modules_application_logger_application_logger__WEBPACK_IMPORTED_MODULE_1__.ApplicationLogger),
  ApplicationLoggerContainer: () => (/* reexport safe */ _Pimcore_modules_application_logger_application_logger_container__WEBPACK_IMPORTED_MODULE_0__.ApplicationLoggerContainer),
  ApplicationLoggerTable: () => (/* reexport safe */ _Pimcore_modules_application_logger_components_table_table__WEBPACK_IMPORTED_MODULE_3__.Table),
  FilterProvider: () => (/* reexport safe */ _Pimcore_modules_application_logger_components_sidebar_tabs_filter_provider_filter_provider_filter_provider__WEBPACK_IMPORTED_MODULE_4__.FilterProvider),
  FilterProviderContext: () => (/* reexport safe */ _Pimcore_modules_application_logger_components_sidebar_tabs_filter_provider_filter_provider_filter_provider__WEBPACK_IMPORTED_MODULE_4__.FilterProviderContext),
  PrioritySelect: () => (/* reexport safe */ _Pimcore_modules_application_logger_components_sidebar_tabs_filter_components_priority_select_priority_select__WEBPACK_IMPORTED_MODULE_6__.PrioritySelect),
  api: () => (/* reexport safe */ _Pimcore_modules_application_logger_application_logger_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_7__.api),
  useBundleApplicationLoggerGetCollectionQuery: () => (/* reexport safe */ _Pimcore_modules_application_logger_application_logger_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_7__.useBundleApplicationLoggerGetCollectionQuery),
  useBundleApplicationLoggerListComponentsQuery: () => (/* reexport safe */ _Pimcore_modules_application_logger_application_logger_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_7__.useBundleApplicationLoggerListComponentsQuery),
  useBundleApplicationLoggerListPrioritiesQuery: () => (/* reexport safe */ _Pimcore_modules_application_logger_application_logger_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_7__.useBundleApplicationLoggerListPrioritiesQuery),
  useFilter: () => (/* reexport safe */ _Pimcore_modules_application_logger_components_sidebar_tabs_filter_provider_filter_provider_use_filter__WEBPACK_IMPORTED_MODULE_5__.useFilter)
});
/* ESM import */var _Pimcore_modules_application_logger_application_logger_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/application-logger/application-logger-container.tsx");
/* ESM import */var _Pimcore_modules_application_logger_application_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/application-logger/application-logger.tsx");
/* ESM import */var _Pimcore_modules_application_logger_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/application-logger/index.ts");
/* ESM import */var _Pimcore_modules_application_logger_components_table_table__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/application-logger/components/table/table.tsx");
/* ESM import */var _Pimcore_modules_application_logger_components_sidebar_tabs_filter_provider_filter_provider_filter_provider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/application-logger/components/sidebar/tabs/filter/provider/filter-provider/filter-provider.tsx");
/* ESM import */var _Pimcore_modules_application_logger_components_sidebar_tabs_filter_provider_filter_provider_use_filter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/application-logger/components/sidebar/tabs/filter/provider/filter-provider/use-filter.ts");
/* ESM import */var _Pimcore_modules_application_logger_components_sidebar_tabs_filter_components_priority_select_priority_select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/application-logger/components/sidebar/tabs/filter/components/priority-select/priority-select.tsx");
/* ESM import */var _Pimcore_modules_application_logger_application_logger_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/application-logger/application-logger-api-slice-enhanced.ts");
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
//# sourceMappingURL=__federation_expose_modules__application_logger.js.map