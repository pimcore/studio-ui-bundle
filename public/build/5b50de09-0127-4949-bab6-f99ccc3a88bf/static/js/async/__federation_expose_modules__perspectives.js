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
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["__federation_expose_modules__perspectives"], {
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
"./js/src/sdk/modules/perspectives/index.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  NavPermission: () => (/* reexport safe */ _Pimcore_modules_perspectives_enums_nav_permission__WEBPACK_IMPORTED_MODULE_0__.NavPermission),
  PerspectivesApiSlice: () => (/* reexport module object */ _Pimcore_modules_perspectives_perspectives_slice_enhanced__WEBPACK_IMPORTED_MODULE_3__),
  TreePermission: () => (/* reexport safe */ _Pimcore_modules_perspectives_enums_tree_permission__WEBPACK_IMPORTED_MODULE_1__.TreePermission),
  usePerspectives: () => (/* reexport safe */ _Pimcore_modules_perspectives_hooks_use_perspectives__WEBPACK_IMPORTED_MODULE_2__.usePerspectives)
});
/* ESM import */var _Pimcore_modules_perspectives_enums_nav_permission__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/perspectives/enums/nav-permission.ts");
/* ESM import */var _Pimcore_modules_perspectives_enums_tree_permission__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/perspectives/enums/tree-permission.ts");
/* ESM import */var _Pimcore_modules_perspectives_hooks_use_perspectives__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/perspectives/hooks/use-perspectives.tsx");
/* ESM import */var _Pimcore_modules_perspectives_perspectives_slice_enhanced__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/perspectives/perspectives-slice.enhanced.ts");
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
//# sourceMappingURL=__federation_expose_modules__perspectives.js.map