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
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["__federation_expose_modules__document"], {
"./js/src/core/modules/document/editor/types/folder/tab-manager/folder-tab-manager.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  FolderTabManager: () => (FolderTabManager)
});
/* ESM import */var _swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/tslib/tslib.es6.mjs");
/* ESM import */var _Pimcore_modules_element_editor_tab_manager_tab_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/element/editor/tab-manager/tab-manager.ts");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(inversify__WEBPACK_IMPORTED_MODULE_1__);
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



class FolderTabManager extends _Pimcore_modules_element_editor_tab_manager_tab_manager__WEBPACK_IMPORTED_MODULE_0__.TabManager {
    constructor(){
        super();
        this.type = 'folder';
    }
}
FolderTabManager = (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.injectable)(),
    (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:type", Function),
    (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:paramtypes", [])
], FolderTabManager);

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
"./js/src/core/modules/document/events/post-update-event.ts": (function (module, __webpack_exports__, __webpack_require__) {
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
"./js/src/core/modules/document/hooks/use-document.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useDocument: () => (useDocument)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _document_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/document/document-provider.tsx");
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

const useDocument = ()=>{
    const { id } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_document_provider__WEBPACK_IMPORTED_MODULE_1__.DocumentContext);
    return {
        id
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
"./js/src/sdk/modules/document/index.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  AddDocumentFormType: () => (/* reexport safe */ _Pimcore_modules_document_actions_add_page_use_add_document__WEBPACK_IMPORTED_MODULE_2__.AddDocumentFormType),
  ContentSettingsSidebar: () => (/* reexport safe */ _Pimcore_modules_document_editor_sidebar_tabs_content_settings_content_settings_sidebar__WEBPACK_IMPORTED_MODULE_22__.ContentSettingsSidebar),
  DocumentContext: () => (/* reexport safe */ _Pimcore_modules_document_document_provider__WEBPACK_IMPORTED_MODULE_27__.DocumentContext),
  DocumentEditorWidget: () => (/* reexport safe */ _Pimcore_modules_document_editor_widget__WEBPACK_IMPORTED_MODULE_24__.DocumentEditorWidget),
  DocumentProvider: () => (/* reexport safe */ _Pimcore_modules_document_document_provider__WEBPACK_IMPORTED_MODULE_27__.DocumentProvider),
  DocumentSaveDataContext: () => (/* reexport safe */ _Pimcore_modules_document_services_processors_document_save_data_processor_registry__WEBPACK_IMPORTED_MODULE_12__.DocumentSaveDataContext),
  DocumentSaveDataProcessorRegistry: () => (/* reexport safe */ _Pimcore_modules_document_services_processors_document_save_data_processor_registry__WEBPACK_IMPORTED_MODULE_12__.DocumentSaveDataProcessorRegistry),
  DocumentSidebarManager: () => (/* reexport safe */ _Pimcore_modules_document_editor_sidebar_document_sidebar_manager__WEBPACK_IMPORTED_MODULE_21__.DocumentSidebarManager),
  DocumentUrlContext: () => (/* reexport safe */ _Pimcore_modules_document_services_processors_document_url_processor_registry__WEBPACK_IMPORTED_MODULE_11__.DocumentUrlContext),
  DocumentUrlProcessorRegistry: () => (/* reexport safe */ _Pimcore_modules_document_services_processors_document_url_processor_registry__WEBPACK_IMPORTED_MODULE_11__.DocumentUrlProcessorRegistry),
  EmailTabManager: () => (/* reexport safe */ _Pimcore_modules_document_editor_types_email_tab_manager_email_tab_manager__WEBPACK_IMPORTED_MODULE_15__.EmailTabManager),
  FolderTabManager: () => (/* reexport safe */ _Pimcore_modules_document_editor_types_folder_tab_manager_folder_tab_manager__WEBPACK_IMPORTED_MODULE_16__.FolderTabManager),
  HardlinkTabManager: () => (/* reexport safe */ _Pimcore_modules_document_editor_types_hardlink_tab_manager_hardlink_tab_manager__WEBPACK_IMPORTED_MODULE_17__.HardlinkTabManager),
  InheritanceOverlay: () => (/* reexport safe */ _Pimcore_modules_element_dynamic_types_definitions_document_editable_components_inheritance_overlay_inheritance_overlay__WEBPACK_IMPORTED_MODULE_25__.InheritanceOverlay),
  LinkTabManager: () => (/* reexport safe */ _Pimcore_modules_document_editor_types_link_tab_manager_link_tab_manager__WEBPACK_IMPORTED_MODULE_18__.LinkTabManager),
  PageTabManager: () => (/* reexport safe */ _Pimcore_modules_document_editor_types_page_tab_manager_page_tab_manager__WEBPACK_IMPORTED_MODULE_19__.PageTabManager),
  SIDEBAR_AREABLOCK_TYPES: () => (/* reexport safe */ _Pimcore_modules_document_editor_shared_tab_manager_sidebar_definitions__WEBPACK_IMPORTED_MODULE_14__.SIDEBAR_AREABLOCK_TYPES),
  SIDEBAR_CONTENT_SETTINGS: () => (/* reexport safe */ _Pimcore_modules_document_editor_shared_tab_manager_sidebar_definitions__WEBPACK_IMPORTED_MODULE_14__.SIDEBAR_CONTENT_SETTINGS),
  SIDEBAR_DOCUMENT_CONFIGURATION: () => (/* reexport safe */ _Pimcore_modules_document_editor_shared_tab_manager_sidebar_definitions__WEBPACK_IMPORTED_MODULE_14__.SIDEBAR_DOCUMENT_CONFIGURATION),
  SIDEBAR_NAVIGATION: () => (/* reexport safe */ _Pimcore_modules_document_editor_shared_tab_manager_sidebar_definitions__WEBPACK_IMPORTED_MODULE_14__.SIDEBAR_NAVIGATION),
  SaveTaskType: () => (/* reexport safe */ _Pimcore_modules_document_actions_save_use_save__WEBPACK_IMPORTED_MODULE_1__.SaveTaskType),
  SnippetTabManager: () => (/* reexport safe */ _Pimcore_modules_document_editor_types_snippet_tab_manager_snippet_tab_manager__WEBPACK_IMPORTED_MODULE_20__.SnippetTabManager),
  TAB_EDIT: () => (/* reexport safe */ _Pimcore_modules_document_editor_shared_tab_manager_tab_definitions__WEBPACK_IMPORTED_MODULE_13__.TAB_EDIT),
  TAB_PREVIEW: () => (/* reexport safe */ _Pimcore_modules_document_editor_shared_tab_manager_tab_definitions__WEBPACK_IMPORTED_MODULE_13__.TAB_PREVIEW),
  TAB_VERSIONS: () => (/* reexport safe */ _Pimcore_modules_document_editor_shared_tab_manager_tab_definitions__WEBPACK_IMPORTED_MODULE_13__.TAB_VERSIONS),
  addPropertyToDocument: () => (/* reexport safe */ _Pimcore_modules_document_document_draft_slice__WEBPACK_IMPORTED_MODULE_4__.addPropertyToDocument),
  addScheduleToDocument: () => (/* reexport safe */ _Pimcore_modules_document_document_draft_slice__WEBPACK_IMPORTED_MODULE_4__.addScheduleToDocument),
  checkDocumentPermission: () => (/* reexport safe */ _Pimcore_modules_document_editor_sidebar_visibility_document_permission_helper__WEBPACK_IMPORTED_MODULE_23__.checkDocumentPermission),
  documentReceived: () => (/* reexport safe */ _Pimcore_modules_document_document_draft_slice__WEBPACK_IMPORTED_MODULE_4__.documentReceived),
  documentsAdapter: () => (/* reexport safe */ _Pimcore_modules_document_document_draft_slice__WEBPACK_IMPORTED_MODULE_4__.documentsAdapter),
  markDocumentEditablesAsModified: () => (/* reexport safe */ _Pimcore_modules_document_document_draft_slice__WEBPACK_IMPORTED_MODULE_4__.markDocumentEditablesAsModified),
  publishDraft: () => (/* reexport safe */ _Pimcore_modules_document_document_draft_slice__WEBPACK_IMPORTED_MODULE_4__.publishDraft),
  removeDocument: () => (/* reexport safe */ _Pimcore_modules_document_document_draft_slice__WEBPACK_IMPORTED_MODULE_4__.removeDocument),
  removePropertyFromDocument: () => (/* reexport safe */ _Pimcore_modules_document_document_draft_slice__WEBPACK_IMPORTED_MODULE_4__.removePropertyFromDocument),
  removeScheduleFromDocument: () => (/* reexport safe */ _Pimcore_modules_document_document_draft_slice__WEBPACK_IMPORTED_MODULE_4__.removeScheduleFromDocument),
  resetChanges: () => (/* reexport safe */ _Pimcore_modules_document_document_draft_slice__WEBPACK_IMPORTED_MODULE_4__.resetChanges),
  resetDocument: () => (/* reexport safe */ _Pimcore_modules_document_document_draft_slice__WEBPACK_IMPORTED_MODULE_4__.resetDocument),
  resetSchedulesChangesForDocument: () => (/* reexport safe */ _Pimcore_modules_document_document_draft_slice__WEBPACK_IMPORTED_MODULE_4__.resetSchedulesChangesForDocument),
  selectDocumentById: () => (/* reexport safe */ _Pimcore_modules_document_document_draft_slice__WEBPACK_IMPORTED_MODULE_4__.selectDocumentById),
  setActiveTabForDocument: () => (/* reexport safe */ _Pimcore_modules_document_document_draft_slice__WEBPACK_IMPORTED_MODULE_4__.setActiveTabForDocument),
  setDraftData: () => (/* reexport safe */ _Pimcore_modules_document_document_draft_slice__WEBPACK_IMPORTED_MODULE_4__.setDraftData),
  setModifiedCells: () => (/* reexport safe */ _Pimcore_modules_document_document_draft_slice__WEBPACK_IMPORTED_MODULE_4__.setModifiedCells),
  setPropertiesForDocument: () => (/* reexport safe */ _Pimcore_modules_document_document_draft_slice__WEBPACK_IMPORTED_MODULE_4__.setPropertiesForDocument),
  setSchedulesForDocument: () => (/* reexport safe */ _Pimcore_modules_document_document_draft_slice__WEBPACK_IMPORTED_MODULE_4__.setSchedulesForDocument),
  setSettingsDataForDocument: () => (/* reexport safe */ _Pimcore_modules_document_document_draft_slice__WEBPACK_IMPORTED_MODULE_4__.setSettingsDataForDocument),
  slice: () => (/* reexport safe */ _Pimcore_modules_document_document_draft_slice__WEBPACK_IMPORTED_MODULE_4__.slice),
  transformApiDataToNode: () => (/* reexport safe */ _Pimcore_modules_document_tree_utils_transform_api_data_to_node__WEBPACK_IMPORTED_MODULE_26__.transformApiDataToNode),
  transformApiDataToNodes: () => (/* reexport safe */ _Pimcore_modules_document_tree_utils_transform_api_data_to_node__WEBPACK_IMPORTED_MODULE_26__.transformApiDataToNodes),
  unpublishDraft: () => (/* reexport safe */ _Pimcore_modules_document_document_draft_slice__WEBPACK_IMPORTED_MODULE_4__.unpublishDraft),
  updateKey: () => (/* reexport safe */ _Pimcore_modules_document_document_draft_slice__WEBPACK_IMPORTED_MODULE_4__.updateKey),
  updatePropertyForDocument: () => (/* reexport safe */ _Pimcore_modules_document_document_draft_slice__WEBPACK_IMPORTED_MODULE_4__.updatePropertyForDocument),
  updateScheduleForDocument: () => (/* reexport safe */ _Pimcore_modules_document_document_draft_slice__WEBPACK_IMPORTED_MODULE_4__.updateScheduleForDocument),
  updateSettingsDataForDocument: () => (/* reexport safe */ _Pimcore_modules_document_document_draft_slice__WEBPACK_IMPORTED_MODULE_4__.updateSettingsDataForDocument),
  useAddDocument: () => (/* reexport safe */ _Pimcore_modules_document_actions_add_page_use_add_document__WEBPACK_IMPORTED_MODULE_2__.useAddDocument),
  useDocument: () => (/* reexport safe */ _Pimcore_modules_document_hooks_use_document__WEBPACK_IMPORTED_MODULE_6__.useDocument),
  useDocumentDraft: () => (/* reexport safe */ _Pimcore_modules_document_hooks_use_document_draft__WEBPACK_IMPORTED_MODULE_7__.useDocumentDraft),
  useDocumentHelper: () => (/* reexport safe */ _Pimcore_modules_document_hooks_use_document_helper__WEBPACK_IMPORTED_MODULE_8__.useDocumentHelper),
  useGlobalDocumentContext: () => (/* reexport safe */ _Pimcore_modules_document_hooks_use_global_document_context__WEBPACK_IMPORTED_MODULE_9__.useGlobalDocumentContext),
  useModifiedDocumentEditablesDraft: () => (/* reexport safe */ _Pimcore_modules_document_draft_hooks_use_modified_editable_data__WEBPACK_IMPORTED_MODULE_5__.useModifiedDocumentEditablesDraft),
  useModifiedDocumentEditablesReducers: () => (/* reexport safe */ _Pimcore_modules_document_draft_hooks_use_modified_editable_data__WEBPACK_IMPORTED_MODULE_5__.useModifiedDocumentEditablesReducers),
  useOpenInNewWindow: () => (/* reexport safe */ _Pimcore_modules_document_actions_open_in_new_window_use_open_in_new_window__WEBPACK_IMPORTED_MODULE_0__.useOpenInNewWindow),
  useSave: () => (/* reexport safe */ _Pimcore_modules_document_actions_save_use_save__WEBPACK_IMPORTED_MODULE_1__.useSave),
  useSites: () => (/* reexport safe */ _Pimcore_modules_document_hooks_use_sites__WEBPACK_IMPORTED_MODULE_10__.useSites)
});
/* ESM import */var _Pimcore_modules_document_actions_open_in_new_window_use_open_in_new_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/document/actions/open-in-new-window/use-open-in-new-window.tsx");
/* ESM import */var _Pimcore_modules_document_actions_save_use_save__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/document/actions/save/use-save.tsx");
/* ESM import */var _Pimcore_modules_document_actions_add_page_use_add_document__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/document/actions/add-page/use-add-document.tsx");
/* ESM import */var _Pimcore_modules_document_events_post_update_event__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/document/events/post-update-event.ts");
/* ESM import */var _Pimcore_modules_document_document_draft_slice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/document/document-draft-slice.tsx");
/* ESM import */var _Pimcore_modules_document_draft_hooks_use_modified_editable_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/document/draft/hooks/use-modified-editable-data.ts");
/* ESM import */var _Pimcore_modules_document_hooks_use_document__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/document/hooks/use-document.ts");
/* ESM import */var _Pimcore_modules_document_hooks_use_document_draft__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/document/hooks/use-document-draft.ts");
/* ESM import */var _Pimcore_modules_document_hooks_use_document_helper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/document/hooks/use-document-helper.ts");
/* ESM import */var _Pimcore_modules_document_hooks_use_global_document_context__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/document/hooks/use-global-document-context.ts");
/* ESM import */var _Pimcore_modules_document_hooks_use_sites__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/document/hooks/use-sites.ts");
/* ESM import */var _Pimcore_modules_document_services_processors_document_url_processor_registry__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/document/services/processors/document-url-processor-registry.ts");
/* ESM import */var _Pimcore_modules_document_services_processors_document_save_data_processor_registry__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/document/services/processors/document-save-data-processor-registry.ts");
/* ESM import */var _Pimcore_modules_document_editor_shared_tab_manager_tab_definitions__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/modules/document/editor/shared-tab-manager/tab-definitions.tsx");
/* ESM import */var _Pimcore_modules_document_editor_shared_tab_manager_sidebar_definitions__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/modules/document/editor/shared-tab-manager/sidebar-definitions.tsx");
/* ESM import */var _Pimcore_modules_document_editor_types_email_tab_manager_email_tab_manager__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./js/src/core/modules/document/editor/types/email/tab-manager/email-tab-manager.ts");
/* ESM import */var _Pimcore_modules_document_editor_types_folder_tab_manager_folder_tab_manager__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("./js/src/core/modules/document/editor/types/folder/tab-manager/folder-tab-manager.ts");
/* ESM import */var _Pimcore_modules_document_editor_types_hardlink_tab_manager_hardlink_tab_manager__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("./js/src/core/modules/document/editor/types/hardlink/tab-manager/hardlink-tab-manager.ts");
/* ESM import */var _Pimcore_modules_document_editor_types_link_tab_manager_link_tab_manager__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("./js/src/core/modules/document/editor/types/link/tab-manager/link-tab-manager.ts");
/* ESM import */var _Pimcore_modules_document_editor_types_page_tab_manager_page_tab_manager__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__("./js/src/core/modules/document/editor/types/page/tab-manager/page-tab-manager.ts");
/* ESM import */var _Pimcore_modules_document_editor_types_snippet_tab_manager_snippet_tab_manager__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__("./js/src/core/modules/document/editor/types/snippet/tab-manager/snippet-tab-manager.ts");
/* ESM import */var _Pimcore_modules_document_editor_sidebar_document_sidebar_manager__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__("./js/src/core/modules/document/editor/sidebar/document-sidebar-manager.ts");
/* ESM import */var _Pimcore_modules_document_editor_sidebar_tabs_content_settings_content_settings_sidebar__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__("./js/src/core/modules/document/editor/sidebar/tabs/content-settings/content-settings-sidebar.tsx");
/* ESM import */var _Pimcore_modules_document_editor_sidebar_visibility_document_permission_helper__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__("./js/src/core/modules/document/editor/sidebar/visibility/document-permission-helper.ts");
/* ESM import */var _Pimcore_modules_document_editor_widget__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__("./js/src/core/modules/document/editor/widget.tsx");
/* ESM import */var _Pimcore_modules_element_dynamic_types_definitions_document_editable_components_inheritance_overlay_inheritance_overlay__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/document/editable/components/inheritance-overlay/inheritance-overlay.tsx");
/* ESM import */var _Pimcore_modules_document_tree_utils_transform_api_data_to_node__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__("./js/src/core/modules/document/tree/utils/transform-api-data-to-node.ts");
/* ESM import */var _Pimcore_modules_document_document_provider__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__("./js/src/core/modules/document/document-provider.tsx");
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











// Document Processor Systems (for plugins to register custom processors)


















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
//# sourceMappingURL=__federation_expose_modules__document.js.map