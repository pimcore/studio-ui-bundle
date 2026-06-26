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
(self["chunk_pimcore_studio_ui_bundle "] = self["chunk_pimcore_studio_ui_bundle "] || []).push([["__federation_expose_modules__document"], {
"./js/src/core/modules/document/editor/types/folder/tab-manager/folder-tab-manager.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  FolderTabManager: () => (FolderTabManager)
});
/* import */ var _swc_helpers_ts_decorate__rspack_import_2 = __webpack_require__("./node_modules/tslib/tslib.es6.mjs");
/* import */ var _Pimcore_modules_element_editor_tab_manager_tab_manager__rspack_import_0 = __webpack_require__("./js/src/core/modules/element/editor/tab-manager/tab-manager.ts");
/* import */ var inversify__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* import */ var inversify__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(inversify__rspack_import_1);
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

class FolderTabManager extends _Pimcore_modules_element_editor_tab_manager_tab_manager__rspack_import_0.TabManager {
    constructor(){
        super();
        this.type = 'folder';
    }
}
FolderTabManager = (0,_swc_helpers_ts_decorate__rspack_import_2.__decorate)([
    (0,inversify__rspack_import_1.injectable)(),
    (0,_swc_helpers_ts_decorate__rspack_import_2.__metadata)("design:type", Function),
    (0,_swc_helpers_ts_decorate__rspack_import_2.__metadata)("design:paramtypes", [])
], FolderTabManager);

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/document/events/post-update-event.ts"(module, __webpack_exports__, __webpack_require__) {
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
"./js/src/core/modules/document/hooks/use-document.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useDocument: () => (useDocument)
});
/* import */ var react__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var _document_provider__rspack_import_1 = __webpack_require__("./js/src/core/modules/document/document-provider.tsx");
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

const useDocument = ()=>{
    const { id } = (0,react__rspack_import_0.useContext)(_document_provider__rspack_import_1.DocumentContext);
    return {
        id
    };
};

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/sdk/modules/document/index.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  AddDocumentFormType: () => (/* reexport safe */ _Pimcore_modules_document_actions_add_page_use_add_document__rspack_import_2.AddDocumentFormType),
  ContentSettingsSidebar: () => (/* reexport safe */ _Pimcore_modules_document_editor_sidebar_tabs_content_settings_content_settings_sidebar__rspack_import_22.ContentSettingsSidebar),
  DocumentContext: () => (/* reexport safe */ _Pimcore_modules_document_document_provider__rspack_import_27.DocumentContext),
  DocumentEditorWidget: () => (/* reexport safe */ _Pimcore_modules_document_editor_widget__rspack_import_24.DocumentEditorWidget),
  DocumentProvider: () => (/* reexport safe */ _Pimcore_modules_document_document_provider__rspack_import_27.DocumentProvider),
  DocumentSaveDataContext: () => (/* reexport safe */ _Pimcore_modules_document_services_processors_document_save_data_processor_registry__rspack_import_12.DocumentSaveDataContext),
  DocumentSaveDataProcessorRegistry: () => (/* reexport safe */ _Pimcore_modules_document_services_processors_document_save_data_processor_registry__rspack_import_12.DocumentSaveDataProcessorRegistry),
  DocumentSidebarManager: () => (/* reexport safe */ _Pimcore_modules_document_editor_sidebar_document_sidebar_manager__rspack_import_21.DocumentSidebarManager),
  DocumentUrlContext: () => (/* reexport safe */ _Pimcore_modules_document_services_processors_document_url_processor_registry__rspack_import_11.DocumentUrlContext),
  DocumentUrlProcessorRegistry: () => (/* reexport safe */ _Pimcore_modules_document_services_processors_document_url_processor_registry__rspack_import_11.DocumentUrlProcessorRegistry),
  EditableOverlay: () => (/* reexport safe */ _Pimcore_modules_element_dynamic_types_definitions_document_editable_components_editable_overlay_editable_overlay__rspack_import_25.EditableOverlay),
  EmailTabManager: () => (/* reexport safe */ _Pimcore_modules_document_editor_types_email_tab_manager_email_tab_manager__rspack_import_15.EmailTabManager),
  FolderTabManager: () => (/* reexport safe */ _Pimcore_modules_document_editor_types_folder_tab_manager_folder_tab_manager__rspack_import_16.FolderTabManager),
  HardlinkTabManager: () => (/* reexport safe */ _Pimcore_modules_document_editor_types_hardlink_tab_manager_hardlink_tab_manager__rspack_import_17.HardlinkTabManager),
  InheritanceOverlay: () => (/* reexport safe */ _Pimcore_modules_element_dynamic_types_definitions_document_editable_components_editable_overlay_editable_overlay__rspack_import_25.EditableOverlay),
  LinkTabManager: () => (/* reexport safe */ _Pimcore_modules_document_editor_types_link_tab_manager_link_tab_manager__rspack_import_18.LinkTabManager),
  PageTabManager: () => (/* reexport safe */ _Pimcore_modules_document_editor_types_page_tab_manager_page_tab_manager__rspack_import_19.PageTabManager),
  SIDEBAR_AREABLOCK_TYPES: () => (/* reexport safe */ _Pimcore_modules_document_editor_shared_tab_manager_sidebar_definitions__rspack_import_14.SIDEBAR_AREABLOCK_TYPES),
  SIDEBAR_CONTENT_SETTINGS: () => (/* reexport safe */ _Pimcore_modules_document_editor_shared_tab_manager_sidebar_definitions__rspack_import_14.SIDEBAR_CONTENT_SETTINGS),
  SIDEBAR_DOCUMENT_CONFIGURATION: () => (/* reexport safe */ _Pimcore_modules_document_editor_shared_tab_manager_sidebar_definitions__rspack_import_14.SIDEBAR_DOCUMENT_CONFIGURATION),
  SIDEBAR_HIGHLIGHT_EDITABLES: () => (/* reexport safe */ _Pimcore_modules_document_editor_shared_tab_manager_sidebar_definitions__rspack_import_14.SIDEBAR_HIGHLIGHT_EDITABLES),
  SIDEBAR_NAVIGATION: () => (/* reexport safe */ _Pimcore_modules_document_editor_shared_tab_manager_sidebar_definitions__rspack_import_14.SIDEBAR_NAVIGATION),
  SaveTaskType: () => (/* reexport safe */ _Pimcore_modules_document_actions_save_use_save__rspack_import_1.SaveTaskType),
  SnippetTabManager: () => (/* reexport safe */ _Pimcore_modules_document_editor_types_snippet_tab_manager_snippet_tab_manager__rspack_import_20.SnippetTabManager),
  TAB_EDIT: () => (/* reexport safe */ _Pimcore_modules_document_editor_shared_tab_manager_tab_definitions__rspack_import_13.TAB_EDIT),
  TAB_PREVIEW: () => (/* reexport safe */ _Pimcore_modules_document_editor_shared_tab_manager_tab_definitions__rspack_import_13.TAB_PREVIEW),
  TAB_VERSIONS: () => (/* reexport safe */ _Pimcore_modules_document_editor_shared_tab_manager_tab_definitions__rspack_import_13.TAB_VERSIONS),
  addPropertyToDocument: () => (/* reexport safe */ _Pimcore_modules_document_document_draft_slice__rspack_import_4.addPropertyToDocument),
  addScheduleToDocument: () => (/* reexport safe */ _Pimcore_modules_document_document_draft_slice__rspack_import_4.addScheduleToDocument),
  checkDocumentPermission: () => (/* reexport safe */ _Pimcore_modules_document_editor_sidebar_visibility_document_permission_helper__rspack_import_23.checkDocumentPermission),
  documentReceived: () => (/* reexport safe */ _Pimcore_modules_document_document_draft_slice__rspack_import_4.documentReceived),
  documentsAdapter: () => (/* reexport safe */ _Pimcore_modules_document_document_draft_slice__rspack_import_4.documentsAdapter),
  markDocumentEditablesAsModified: () => (/* reexport safe */ _Pimcore_modules_document_document_draft_slice__rspack_import_4.markDocumentEditablesAsModified),
  publishDraft: () => (/* reexport safe */ _Pimcore_modules_document_document_draft_slice__rspack_import_4.publishDraft),
  removeDocument: () => (/* reexport safe */ _Pimcore_modules_document_document_draft_slice__rspack_import_4.removeDocument),
  removePropertyFromDocument: () => (/* reexport safe */ _Pimcore_modules_document_document_draft_slice__rspack_import_4.removePropertyFromDocument),
  removeScheduleFromDocument: () => (/* reexport safe */ _Pimcore_modules_document_document_draft_slice__rspack_import_4.removeScheduleFromDocument),
  resetChanges: () => (/* reexport safe */ _Pimcore_modules_document_document_draft_slice__rspack_import_4.resetChanges),
  resetDocument: () => (/* reexport safe */ _Pimcore_modules_document_document_draft_slice__rspack_import_4.resetDocument),
  resetSchedulesChangesForDocument: () => (/* reexport safe */ _Pimcore_modules_document_document_draft_slice__rspack_import_4.resetSchedulesChangesForDocument),
  selectDocumentById: () => (/* reexport safe */ _Pimcore_modules_document_document_draft_slice__rspack_import_4.selectDocumentById),
  setActiveTabForDocument: () => (/* reexport safe */ _Pimcore_modules_document_document_draft_slice__rspack_import_4.setActiveTabForDocument),
  setDraftData: () => (/* reexport safe */ _Pimcore_modules_document_document_draft_slice__rspack_import_4.setDraftData),
  setModificationDate: () => (/* reexport safe */ _Pimcore_modules_document_document_draft_slice__rspack_import_4.setModificationDate),
  setModifiedCells: () => (/* reexport safe */ _Pimcore_modules_document_document_draft_slice__rspack_import_4.setModifiedCells),
  setPropertiesForDocument: () => (/* reexport safe */ _Pimcore_modules_document_document_draft_slice__rspack_import_4.setPropertiesForDocument),
  setSchedulesForDocument: () => (/* reexport safe */ _Pimcore_modules_document_document_draft_slice__rspack_import_4.setSchedulesForDocument),
  setSettingsDataForDocument: () => (/* reexport safe */ _Pimcore_modules_document_document_draft_slice__rspack_import_4.setSettingsDataForDocument),
  slice: () => (/* reexport safe */ _Pimcore_modules_document_document_draft_slice__rspack_import_4.slice),
  transformApiDataToNode: () => (/* reexport safe */ _Pimcore_modules_document_tree_utils_transform_api_data_to_node__rspack_import_26.transformApiDataToNode),
  transformApiDataToNodes: () => (/* reexport safe */ _Pimcore_modules_document_tree_utils_transform_api_data_to_node__rspack_import_26.transformApiDataToNodes),
  unpublishDraft: () => (/* reexport safe */ _Pimcore_modules_document_document_draft_slice__rspack_import_4.unpublishDraft),
  updateKey: () => (/* reexport safe */ _Pimcore_modules_document_document_draft_slice__rspack_import_4.updateKey),
  updatePropertyForDocument: () => (/* reexport safe */ _Pimcore_modules_document_document_draft_slice__rspack_import_4.updatePropertyForDocument),
  updateScheduleForDocument: () => (/* reexport safe */ _Pimcore_modules_document_document_draft_slice__rspack_import_4.updateScheduleForDocument),
  updateSettingsDataForDocument: () => (/* reexport safe */ _Pimcore_modules_document_document_draft_slice__rspack_import_4.updateSettingsDataForDocument),
  useAddDocument: () => (/* reexport safe */ _Pimcore_modules_document_actions_add_page_use_add_document__rspack_import_2.useAddDocument),
  useDocument: () => (/* reexport safe */ _Pimcore_modules_document_hooks_use_document__rspack_import_6.useDocument),
  useDocumentDraft: () => (/* reexport safe */ _Pimcore_modules_document_hooks_use_document_draft__rspack_import_7.useDocumentDraft),
  useDocumentHelper: () => (/* reexport safe */ _Pimcore_modules_document_hooks_use_document_helper__rspack_import_8.useDocumentHelper),
  useGlobalDocumentContext: () => (/* reexport safe */ _Pimcore_modules_document_hooks_use_global_document_context__rspack_import_9.useGlobalDocumentContext),
  useModifiedDocumentEditablesDraft: () => (/* reexport safe */ _Pimcore_modules_document_draft_hooks_use_modified_editable_data__rspack_import_5.useModifiedDocumentEditablesDraft),
  useModifiedDocumentEditablesReducers: () => (/* reexport safe */ _Pimcore_modules_document_draft_hooks_use_modified_editable_data__rspack_import_5.useModifiedDocumentEditablesReducers),
  useOpenInNewWindow: () => (/* reexport safe */ _Pimcore_modules_document_actions_open_in_new_window_use_open_in_new_window__rspack_import_0.useOpenInNewWindow),
  useSave: () => (/* reexport safe */ _Pimcore_modules_document_actions_save_use_save__rspack_import_1.useSave),
  useSites: () => (/* reexport safe */ _Pimcore_modules_document_hooks_use_sites__rspack_import_10.useSites)
});
/* import */ var _Pimcore_modules_document_actions_open_in_new_window_use_open_in_new_window__rspack_import_0 = __webpack_require__("./js/src/core/modules/document/actions/open-in-new-window/use-open-in-new-window.tsx");
/* import */ var _Pimcore_modules_document_actions_save_use_save__rspack_import_1 = __webpack_require__("./js/src/core/modules/document/actions/save/use-save.tsx");
/* import */ var _Pimcore_modules_document_actions_add_page_use_add_document__rspack_import_2 = __webpack_require__("./js/src/core/modules/document/actions/add-page/use-add-document.tsx");
/* import */ var _Pimcore_modules_document_events_post_update_event__rspack_import_3 = __webpack_require__("./js/src/core/modules/document/events/post-update-event.ts");
/* import */ var _Pimcore_modules_document_document_draft_slice__rspack_import_4 = __webpack_require__("./js/src/core/modules/document/document-draft-slice.tsx");
/* import */ var _Pimcore_modules_document_draft_hooks_use_modified_editable_data__rspack_import_5 = __webpack_require__("./js/src/core/modules/document/draft/hooks/use-modified-editable-data.ts");
/* import */ var _Pimcore_modules_document_hooks_use_document__rspack_import_6 = __webpack_require__("./js/src/core/modules/document/hooks/use-document.ts");
/* import */ var _Pimcore_modules_document_hooks_use_document_draft__rspack_import_7 = __webpack_require__("./js/src/core/modules/document/hooks/use-document-draft.ts");
/* import */ var _Pimcore_modules_document_hooks_use_document_helper__rspack_import_8 = __webpack_require__("./js/src/core/modules/document/hooks/use-document-helper.ts");
/* import */ var _Pimcore_modules_document_hooks_use_global_document_context__rspack_import_9 = __webpack_require__("./js/src/core/modules/document/hooks/use-global-document-context.ts");
/* import */ var _Pimcore_modules_document_hooks_use_sites__rspack_import_10 = __webpack_require__("./js/src/core/modules/document/hooks/use-sites.ts");
/* import */ var _Pimcore_modules_document_services_processors_document_url_processor_registry__rspack_import_11 = __webpack_require__("./js/src/core/modules/document/services/processors/document-url-processor-registry.ts");
/* import */ var _Pimcore_modules_document_services_processors_document_save_data_processor_registry__rspack_import_12 = __webpack_require__("./js/src/core/modules/document/services/processors/document-save-data-processor-registry.ts");
/* import */ var _Pimcore_modules_document_editor_shared_tab_manager_tab_definitions__rspack_import_13 = __webpack_require__("./js/src/core/modules/document/editor/shared-tab-manager/tab-definitions.tsx");
/* import */ var _Pimcore_modules_document_editor_shared_tab_manager_sidebar_definitions__rspack_import_14 = __webpack_require__("./js/src/core/modules/document/editor/shared-tab-manager/sidebar-definitions.tsx");
/* import */ var _Pimcore_modules_document_editor_types_email_tab_manager_email_tab_manager__rspack_import_15 = __webpack_require__("./js/src/core/modules/document/editor/types/email/tab-manager/email-tab-manager.ts");
/* import */ var _Pimcore_modules_document_editor_types_folder_tab_manager_folder_tab_manager__rspack_import_16 = __webpack_require__("./js/src/core/modules/document/editor/types/folder/tab-manager/folder-tab-manager.ts");
/* import */ var _Pimcore_modules_document_editor_types_hardlink_tab_manager_hardlink_tab_manager__rspack_import_17 = __webpack_require__("./js/src/core/modules/document/editor/types/hardlink/tab-manager/hardlink-tab-manager.ts");
/* import */ var _Pimcore_modules_document_editor_types_link_tab_manager_link_tab_manager__rspack_import_18 = __webpack_require__("./js/src/core/modules/document/editor/types/link/tab-manager/link-tab-manager.ts");
/* import */ var _Pimcore_modules_document_editor_types_page_tab_manager_page_tab_manager__rspack_import_19 = __webpack_require__("./js/src/core/modules/document/editor/types/page/tab-manager/page-tab-manager.ts");
/* import */ var _Pimcore_modules_document_editor_types_snippet_tab_manager_snippet_tab_manager__rspack_import_20 = __webpack_require__("./js/src/core/modules/document/editor/types/snippet/tab-manager/snippet-tab-manager.ts");
/* import */ var _Pimcore_modules_document_editor_sidebar_document_sidebar_manager__rspack_import_21 = __webpack_require__("./js/src/core/modules/document/editor/sidebar/document-sidebar-manager.ts");
/* import */ var _Pimcore_modules_document_editor_sidebar_tabs_content_settings_content_settings_sidebar__rspack_import_22 = __webpack_require__("./js/src/core/modules/document/editor/sidebar/tabs/content-settings/content-settings-sidebar.tsx");
/* import */ var _Pimcore_modules_document_editor_sidebar_visibility_document_permission_helper__rspack_import_23 = __webpack_require__("./js/src/core/modules/document/editor/sidebar/visibility/document-permission-helper.ts");
/* import */ var _Pimcore_modules_document_editor_widget__rspack_import_24 = __webpack_require__("./js/src/core/modules/document/editor/widget.tsx");
/* import */ var _Pimcore_modules_element_dynamic_types_definitions_document_editable_components_editable_overlay_editable_overlay__rspack_import_25 = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/document/editable/components/editable-overlay/editable-overlay.tsx");
/* import */ var _Pimcore_modules_document_tree_utils_transform_api_data_to_node__rspack_import_26 = __webpack_require__("./js/src/core/modules/document/tree/utils/transform-api-data-to-node.ts");
/* import */ var _Pimcore_modules_document_document_provider__rspack_import_27 = __webpack_require__("./js/src/core/modules/document/document-provider.tsx");
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











// Document Processor Systems (for plugins to register custom processors)















/**
 * @deprecated `InheritanceOverlay`/`InheritanceOverlayProps` have been renamed to
 * `EditableOverlay`/`EditableOverlayProps`. These aliases are kept for backward
 * compatibility and will be removed in a future version. Use `EditableOverlay`/`EditableOverlayProps` instead.
 */ 



function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},

}]);
//# sourceMappingURL=__federation_expose_modules__document.js.map