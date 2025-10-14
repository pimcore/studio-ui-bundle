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
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["js_src_core_modules_document_editor_types_email_tab-manager_email-tab-manager_ts-js_src_core_-344236"], {
"./js/src/core/modules/document/document-editor-slice.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  clearAllDocuments: () => (clearAllDocuments),
  "default": () => (__WEBPACK_DEFAULT_EXPORT__),
  removeDocument: () => (removeDocument),
  selectDocumentAreablockGroupedTypes: () => (selectDocumentAreablockGroupedTypes),
  selectDocumentAreablockTypes: () => (selectDocumentAreablockTypes),
  selectDocumentEditorState: () => (selectDocumentEditorState),
  selectDocumentHasAreablocks: () => (selectDocumentHasAreablocks),
  setDocumentAreablockTypes: () => (setDocumentAreablockTypes)
});
/* ESM import */var _sdk_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/sdk/app/index.ts");
/* ESM import */var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/@reduxjs/toolkit/@reduxjs/toolkit");
/* ESM import */var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__);
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

const initialState = {
    documentAreablocks: {}
};
const documentEditorSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__.createSlice)({
    name: 'document-editor',
    initialState,
    reducers: {
        setDocumentAreablockTypes: (state, action)=>{
            state.documentAreablocks[action.payload.documentId] = action.payload.areablockTypes;
        },
        removeDocument: (state, action)=>{
            const documentId = action.payload;
            if (state.documentAreablocks[documentId] !== undefined) {
                const { [documentId]: removed, ...remainingAreablocks } = state.documentAreablocks;
                state.documentAreablocks = remainingAreablocks;
            }
        },
        clearAllDocuments: (state)=>{
            state.documentAreablocks = {};
        }
    }
});
const { setDocumentAreablockTypes, removeDocument, clearAllDocuments } = documentEditorSlice.actions;
const selectDocumentEditorState = (state)=>state['document-editor'];
const selectDocumentAreablockGroupedTypes = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__.createSelector)([
    selectDocumentEditorState,
    (_state, documentId)=>documentId
], (documentEditorState, documentId)=>{
    return documentEditorState.documentAreablocks[documentId] ?? {};
});
const selectDocumentHasAreablocks = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__.createSelector)([
    selectDocumentAreablockGroupedTypes
], (areablockGroupedTypes)=>{
    return Object.keys(areablockGroupedTypes).length > 0;
});
const selectDocumentAreablockTypes = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__.createSelector)([
    selectDocumentAreablockGroupedTypes
], (areablockGroupedTypes)=>{
    return Object.values(areablockGroupedTypes).flat();
});
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = (documentEditorSlice.reducer);
(0,_sdk_app__WEBPACK_IMPORTED_MODULE_0__.injectSliceWithState)(documentEditorSlice);

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
"./js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/hooks/use-document-editor-sidebar-entries.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useDocumentEditorSidebarEntries: () => (useDocumentEditorSidebarEntries)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _Pimcore_modules_document_document_provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/document/document-provider.tsx");
/* ESM import */var _Pimcore_modules_document_hooks_use_document_draft__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/document/hooks/use-document-draft.ts");
/* ESM import */var _sidebar_sidebar_manager_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/document/editor/sidebar/sidebar-manager-helper.ts");
/* ESM import */var _Pimcore_modules_document_document_editor_slice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/document/document-editor-slice.ts");
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





/**
 * Hook that provides reactive sidebar entries for the document editor.
 * This hook automatically subscribes to document editor state changes
 * and re-evaluates sidebar visibility when any relevant state changes.
 */ const useDocumentEditorSidebarEntries = ()=>{
    const documentContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_Pimcore_modules_document_document_provider__WEBPACK_IMPORTED_MODULE_2__.DocumentContext);
    const { document: documentDraft } = (0,_Pimcore_modules_document_hooks_use_document_draft__WEBPACK_IMPORTED_MODULE_3__.useDocumentDraft)(documentContext.id);
    const documentEditorState = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_1__.useAppSelector)(_Pimcore_modules_document_document_editor_slice__WEBPACK_IMPORTED_MODULE_5__.selectDocumentEditorState);
    const sidebarManager = (0,_sidebar_sidebar_manager_helper__WEBPACK_IMPORTED_MODULE_4__.getDocumentSidebarManager)(documentDraft === null || documentDraft === void 0 ? void 0 : documentDraft.type);
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>{
        return sidebarManager.getVisibleEntries(documentContext);
    }, [
        sidebarManager,
        documentContext,
        documentEditorState
    ]);
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
"./js/src/core/modules/document/editor/shared-tab-manager/tabs/versions/hooks/useVersionUrl.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useVersionUrl: () => (useVersionUrl)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/element/hooks/use-element-context.ts");
/* ESM import */var _Pimcore_app_config_app_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/app/config/app-config.ts");
/* ESM import */var _Pimcore_modules_document_document_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/document/document-api-slice-enhanced.ts");
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




const useVersionUrl = (param)=>{
    let { versionId, isSkip = false } = param;
    const { id } = (0,_Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_2__.useElementContext)();
    const { data, isLoading } = (0,_Pimcore_modules_document_document_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_4__.useDocumentGetByIdQuery)({
        id
    }, {
        skip: isSkip
    });
    const [versionUrl, setVersionUrl] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(data)) {
            const url = `${_Pimcore_app_config_app_config__WEBPACK_IMPORTED_MODULE_3__.currentDomain}${data === null || data === void 0 ? void 0 : data.fullPath}?pimcore_version=${versionId}`;
            setVersionUrl(url);
        }
    }, [
        versionId,
        data
    ]);
    return {
        isLoading,
        url: versionUrl
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
"./js/src/core/modules/document/editor/sidebar/sidebar-manager-helper.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  getDocumentSidebarManager: () => (getDocumentSidebarManager),
  getSidebarManagerServiceId: () => (getSidebarManagerServiceId)
});
/* ESM import */var _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/depency-injection/index.ts");
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
/**
 * Gets the service ID for a document sidebar manager based on document type
 */ const getSidebarManagerServiceId = (documentType)=>{
    const capitalizedType = documentType.charAt(0).toUpperCase() + documentType.slice(1);
    return `Document/Editor/Sidebar/${capitalizedType}SidebarManager`;
};
/**
 * Gets the document sidebar manager for a specific document type
 */ const getDocumentSidebarManager = (documentType)=>{
    return _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_0__.container.get(getSidebarManagerServiceId(documentType ?? 'page'));
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
"./js/src/core/modules/document/editor/types/email/tab-manager/email-tab-manager.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  EmailTabManager: () => (EmailTabManager)
});
/* ESM import */var _swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/tslib/tslib.es6.mjs");
/* ESM import */var _Pimcore_modules_element_editor_tab_manager_tab_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/element/editor/tab-manager/tab-manager.ts");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(inversify__WEBPACK_IMPORTED_MODULE_1__);
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



class EmailTabManager extends _Pimcore_modules_element_editor_tab_manager_tab_manager__WEBPACK_IMPORTED_MODULE_0__.TabManager {
    constructor(){
        super();
        this.type = 'email';
    }
}
EmailTabManager = (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.injectable)(),
    (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:type", Function),
    (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:paramtypes", [])
], EmailTabManager);

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
"./js/src/core/modules/document/editor/types/hardlink/tab-manager/hardlink-tab-manager.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  HardlinkTabManager: () => (HardlinkTabManager)
});
/* ESM import */var _swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/tslib/tslib.es6.mjs");
/* ESM import */var _Pimcore_modules_element_editor_tab_manager_tab_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/element/editor/tab-manager/tab-manager.ts");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(inversify__WEBPACK_IMPORTED_MODULE_1__);
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



class HardlinkTabManager extends _Pimcore_modules_element_editor_tab_manager_tab_manager__WEBPACK_IMPORTED_MODULE_0__.TabManager {
    constructor(){
        super();
        this.type = 'hardlink';
    }
}
HardlinkTabManager = (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.injectable)(),
    (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:type", Function),
    (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:paramtypes", [])
], HardlinkTabManager);

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
"./js/src/core/modules/document/editor/types/link/tab-manager/link-tab-manager.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  LinkTabManager: () => (LinkTabManager)
});
/* ESM import */var _swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/tslib/tslib.es6.mjs");
/* ESM import */var _Pimcore_modules_element_editor_tab_manager_tab_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/element/editor/tab-manager/tab-manager.ts");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(inversify__WEBPACK_IMPORTED_MODULE_1__);
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



class LinkTabManager extends _Pimcore_modules_element_editor_tab_manager_tab_manager__WEBPACK_IMPORTED_MODULE_0__.TabManager {
    constructor(){
        super();
        this.type = 'link';
    }
}
LinkTabManager = (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.injectable)(),
    (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:type", Function),
    (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:paramtypes", [])
], LinkTabManager);

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
"./js/src/core/modules/document/editor/types/page/tab-manager/page-tab-manager.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  PageTabManager: () => (PageTabManager)
});
/* ESM import */var _swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/tslib/tslib.es6.mjs");
/* ESM import */var _Pimcore_modules_element_editor_tab_manager_tab_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/element/editor/tab-manager/tab-manager.ts");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(inversify__WEBPACK_IMPORTED_MODULE_1__);
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



class PageTabManager extends _Pimcore_modules_element_editor_tab_manager_tab_manager__WEBPACK_IMPORTED_MODULE_0__.TabManager {
    constructor(){
        super();
        this.type = 'page';
    }
}
PageTabManager = (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.injectable)(),
    (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:type", Function),
    (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:paramtypes", [])
], PageTabManager);

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
"./js/src/core/modules/document/editor/types/snippet/tab-manager/snippet-tab-manager.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SnippetTabManager: () => (SnippetTabManager)
});
/* ESM import */var _swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/tslib/tslib.es6.mjs");
/* ESM import */var _Pimcore_modules_element_editor_tab_manager_tab_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/element/editor/tab-manager/tab-manager.ts");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(inversify__WEBPACK_IMPORTED_MODULE_1__);
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



class SnippetTabManager extends _Pimcore_modules_element_editor_tab_manager_tab_manager__WEBPACK_IMPORTED_MODULE_0__.TabManager {
    constructor(){
        super();
        this.type = 'snippet';
    }
}
SnippetTabManager = (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.injectable)(),
    (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:type", Function),
    (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:paramtypes", [])
], SnippetTabManager);

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
"./js/src/core/modules/document/utils/preview-url-helper.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  createPreviewUrl: () => (createPreviewUrl)
});
/* ESM import */var _Pimcore_utils_url_cache_buster__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/utils/url-cache-buster.ts");
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
/**
 * Creates a preview URL for a document with the necessary preview parameters
 */ const createPreviewUrl = function(baseUrl) {
    let addPreviewParameters = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    const urlObj = new URL(baseUrl, window.location.origin);
    if (addPreviewParameters) {
        urlObj.searchParams.set('pimcore_preview', 'true');
        urlObj.searchParams.set('pimcore_studio_preview', 'true');
    }
    const url = urlObj.toString();
    if (addPreviewParameters) {
        return (0,_Pimcore_utils_url_cache_buster__WEBPACK_IMPORTED_MODULE_0__.addCacheBusterToUrl)(url, '_dc');
    }
    return url;
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
"./js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/components/versions-fields-list/versions-fields-list.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyles: () => (useStyles)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/antd-style/antd-style");
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd_style__WEBPACK_IMPORTED_MODULE_0__);
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
const useStyles = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param)=>{
    let { token, css } = param;
    return {
        headerContainer: css`
      position: sticky;
      top: 0;
      width: 100%;
      z-index: 999999999;
      
      &::before {
        content: '';
        position: absolute;
        top: -15px;
        bottom: 0;
        width: 100%;
        height: 20px;
        background-color: #fff;
        z-index: -1;
      }
    `,
        headerItem: css`
      flex: 1 1 50%;
      padding: ${token.paddingXS}px;
      background-color: ${token.Table.headerBg};
      border: 0.5px solid ${token.Table.colorBorderSecondary};
      border-top-width: 0;
      box-shadow: 0 2px 4px 0 rgba(35, 11, 100, .2);
      
      &:first-child {
        border-right: 0;
      }

      &:last-child {
        border-left: 0;
      }

      &:only-child {
        flex: 1 1 100%;
        border-right: 0.5px;
        border-left: 0.5px;
      }
    `,
        content: css`
      position: relative;
      min-width: 220px;
    `,
        emptyState: css`
      margin-top: 40px;
      max-width: 200px;
      text-align: center;
    `,
        switchContainer: css`
      position: absolute;
      top: 10px;
      right: ${token.paddingXS}px;
      z-index: 1;
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
"./js/src/core/modules/document/actions/open-in-new-window/use-open-in-new-window.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useOpenInNewWindow: () => (useOpenInNewWindow)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/element/permissions/permission-helper.ts");
/* ESM import */var _Pimcore_modules_element_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/element/actions/index.ts");
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _Pimcore_modules_document_document_api_slice_gen__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/document/document-api-slice.gen.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_8__);
/* ESM import */var _Pimcore_modules_perspectives_enums_tree_permission__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/perspectives/enums/tree-permission.ts");
/* ESM import */var _Pimcore_modules_element_tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/element/tree/provider/tree-permission-provider/use-tree-permission.ts");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* ESM import */var _Pimcore_modules_document_utils_preview_url_helper__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/document/utils/preview-url-helper.ts");
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
var _s = $RefreshSig$();












const useOpenInNewWindow = ()=>{
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_1__.useTranslation)();
    const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const dispatch = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_6__.useAppDispatch)();
    const { isTreeActionAllowed } = (0,_Pimcore_modules_element_tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_10__.useTreePermission)();
    const openInNewWindow = async (documentId, onFinish, options)=>{
        setIsLoading(true);
        const { data, error } = await dispatch(_Pimcore_modules_document_document_api_slice_gen__WEBPACK_IMPORTED_MODULE_7__.api.endpoints.documentGetById.initiate({
            id: documentId
        }));
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_8__.isUndefined)(error)) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_11__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_11__.ApiError(error));
            setIsLoading(false);
        }
        // Use settingsData.url if available and not in preview mode
        if (((0,lodash__WEBPACK_IMPORTED_MODULE_8__.isNil)(options === null || options === void 0 ? void 0 : options.preview) || !(options === null || options === void 0 ? void 0 : options.preview)) && !(0,lodash__WEBPACK_IMPORTED_MODULE_8__.isNil)(data === null || data === void 0 ? void 0 : data.settingsData) && (0,lodash__WEBPACK_IMPORTED_MODULE_8__.has)(data === null || data === void 0 ? void 0 : data.settingsData, 'url') && (0,lodash__WEBPACK_IMPORTED_MODULE_8__.isString)(data === null || data === void 0 ? void 0 : data.settingsData.url)) {
            const url = data.settingsData.url;
            window.open(url);
            onFinish === null || onFinish === void 0 ? void 0 : onFinish();
        } else if (!(0,lodash__WEBPACK_IMPORTED_MODULE_8__.isNil)(data === null || data === void 0 ? void 0 : data.fullPath)) {
            // Use fullPath (for preview or if settingsData.url is not available)
            window.open((0,_Pimcore_modules_document_utils_preview_url_helper__WEBPACK_IMPORTED_MODULE_12__.createPreviewUrl)(data.fullPath, Boolean(options === null || options === void 0 ? void 0 : options.preview)));
            onFinish === null || onFinish === void 0 ? void 0 : onFinish();
        } else {
            console.error('Failed to fetch document data', data);
        }
        setIsLoading(false);
    };
    const isContextMenuEntryHidden = (node, options)=>{
        return !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_4__.checkElementPermission)(node.permissions, 'view') || ((0,lodash__WEBPACK_IMPORTED_MODULE_8__.isNil)(options === null || options === void 0 ? void 0 : options.preview) || !(options === null || options === void 0 ? void 0 : options.preview)) && [
            'snippet',
            'newsletter',
            'folder',
            'link',
            'hardlink',
            'email'
        ].includes(node.type) || !(0,lodash__WEBPACK_IMPORTED_MODULE_8__.isNil)(options === null || options === void 0 ? void 0 : options.preview) && options.preview && [
            'folder',
            'link',
            'hardlink'
        ].includes(node.type);
    };
    const isTreeContextMenuEntryHidden = (node)=>{
        return node.type !== 'page' || !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_4__.checkElementPermission)(node.permissions, 'view');
    };
    const openInNewWindowContextMenuItem = (document, onFinish)=>{
        return {
            label: t('document.open-in-new-window'),
            key: _Pimcore_modules_element_actions__WEBPACK_IMPORTED_MODULE_5__.ContextMenuActionName.openInNewWindow,
            isLoading,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_2__.Icon, {
                value: 'share'
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/actions/open-in-new-window/use-open-in-new-window.tsx",
                lineNumber: 70,
                columnNumber: 13
            }, undefined),
            hidden: isContextMenuEntryHidden(document),
            onClick: async ()=>{
                await openInNewWindow(document.id, onFinish);
            }
        };
    };
    const openInNewWindowTreeContextMenuItem = (node)=>{
        return {
            label: t('document.open-in-new-window'),
            key: _Pimcore_modules_element_actions__WEBPACK_IMPORTED_MODULE_5__.ContextMenuActionName.openInNewWindow,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_2__.Icon, {
                value: 'share'
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/actions/open-in-new-window/use-open-in-new-window.tsx",
                lineNumber: 81,
                columnNumber: 13
            }, undefined),
            hidden: isTreeContextMenuEntryHidden(node) || !isTreeActionAllowed(_Pimcore_modules_perspectives_enums_tree_permission__WEBPACK_IMPORTED_MODULE_9__.TreePermission.Open),
            onClick: async ()=>{
                await openInNewWindow(parseInt(node.id));
            }
        };
    };
    const openPreviewInNewWindowContextMenuItem = (document, onFinish)=>{
        return {
            label: t('document.open-preview-in-new-window'),
            key: _Pimcore_modules_element_actions__WEBPACK_IMPORTED_MODULE_5__.ContextMenuActionName.openPreviewInNewWindow,
            isLoading,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_2__.Icon, {
                value: 'eye'
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/actions/open-in-new-window/use-open-in-new-window.tsx",
                lineNumber: 93,
                columnNumber: 13
            }, undefined),
            hidden: isContextMenuEntryHidden(document, {
                preview: true
            }),
            onClick: async ()=>{
                await openInNewWindow(document.id, onFinish, {
                    preview: true
                });
            }
        };
    };
    return {
        openInNewWindow,
        openInNewWindowTreeContextMenuItem,
        openInNewWindowContextMenuItem,
        openPreviewInNewWindowContextMenuItem
    };
};
_s(useOpenInNewWindow, "HGWKtmwWuUPq9bUWPeyit2eMMRI=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_1__.useTranslation,
        _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_6__.useAppDispatch,
        _Pimcore_modules_element_tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_10__.useTreePermission
    ];
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
"./js/src/core/modules/document/actions/save/use-save.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SaveTaskType: () => (/* reexport safe */ _sdk_modules_data_object__WEBPACK_IMPORTED_MODULE_4__.SaveTaskType),
  useSave: () => (useSave)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _document_provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/document/document-provider.tsx");
/* ESM import */var _hooks_use_document_draft__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/document/hooks/use-document-draft.ts");
/* ESM import */var _sdk_modules_data_object__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/sdk/modules/data-object/index.ts");
/* ESM import */var _services__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/document/services/index.ts");
/* ESM import */var _sdk_app__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/sdk/app/index.ts");
/* ESM import */var _Pimcore_components_element_tree_element_tree_slice__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/element-tree/element-tree-slice.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ var _s = $RefreshSig$();









const useSave = ()=>{
    _s();
    const { id } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_document_provider__WEBPACK_IMPORTED_MODULE_2__.DocumentContext);
    const { document } = (0,_hooks_use_document_draft__WEBPACK_IMPORTED_MODULE_3__.useDocumentDraft)(id);
    const dispatch = (0,_sdk_app__WEBPACK_IMPORTED_MODULE_6__.useAppDispatch)();
    const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const [isSuccess, setIsSuccess] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const [isError, setIsError] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)();
    const debouncedAutoSave = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((0,lodash__WEBPACK_IMPORTED_MODULE_1__.debounce)(()=>{
        _services__WEBPACK_IMPORTED_MODULE_5__.documentSaveService.saveDocument(id, _sdk_modules_data_object__WEBPACK_IMPORTED_MODULE_4__.SaveTaskType.AutoSave).catch(console.error);
    }, 500), [
        id
    ]);
    const save = async (task, onFinish)=>{
        if ((document === null || document === void 0 ? void 0 : document.changes) === undefined) return;
        try {
            var _document_changes;
            setIsLoading(true);
            setIsError(false);
            setError(undefined);
            setIsSuccess(false);
            await _services__WEBPACK_IMPORTED_MODULE_5__.documentSaveService.saveDocument(id, task);
            if (task !== _sdk_modules_data_object__WEBPACK_IMPORTED_MODULE_4__.SaveTaskType.AutoSave && (document === null || document === void 0 ? void 0 : (_document_changes = document.changes) === null || _document_changes === void 0 ? void 0 : _document_changes.properties)) {
                var _document_properties_find, _document_properties;
                const currentNavigationExclude = Boolean(document === null || document === void 0 ? void 0 : (_document_properties = document.properties) === null || _document_properties === void 0 ? void 0 : (_document_properties_find = _document_properties.find((prop)=>prop.key === 'navigation_exclude')) === null || _document_properties_find === void 0 ? void 0 : _document_properties_find.data);
                dispatch((0,_Pimcore_components_element_tree_element_tree_slice__WEBPACK_IMPORTED_MODULE_7__.setDocumentNodeNavigationExclude)({
                    nodeId: String(id),
                    navigationExclude: currentNavigationExclude
                }));
            }
            setIsSuccess(true);
            onFinish === null || onFinish === void 0 ? void 0 : onFinish();
        } catch (error) {
            console.error('Save failed:', error);
            setIsError(true);
            setError(error);
            throw error;
        } finally{
            setIsLoading(false);
        }
    };
    return {
        save,
        debouncedAutoSave,
        isLoading,
        isSuccess,
        isError,
        error
    };
};
_s(useSave, "MF+M7DLHCdjnVeY6kbVEUlwoCXM=", false, function() {
    return [
        _hooks_use_document_draft__WEBPACK_IMPORTED_MODULE_3__.useDocumentDraft,
        _sdk_app__WEBPACK_IMPORTED_MODULE_6__.useAppDispatch
    ];
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
"./js/src/core/modules/document/editor/editor-container/editor-container-renderer.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  EditorContainerRenderer: () => (EditorContainerRenderer)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _app_component_registry_component_registry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/app/component-registry/component-registry.ts");
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


const EditorContainerRenderer = (props)=>{
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_app_component_registry_component_registry__WEBPACK_IMPORTED_MODULE_2__.ComponentRenderer, {
        component: _app_component_registry_component_registry__WEBPACK_IMPORTED_MODULE_2__.componentConfig.document.editor.container.name,
        props: props
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/editor-container/editor-container-renderer.tsx",
        lineNumber: 14,
        columnNumber: 10
    }, undefined);
};
_c = EditorContainerRenderer;

var _c;
$RefreshReg$(_c, "EditorContainerRenderer");

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
"./js/src/core/modules/document/editor/shared-tab-manager/tab-definitions.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TAB_EDIT: () => (TAB_EDIT),
  TAB_PREVIEW: () => (TAB_PREVIEW),
  TAB_VERSIONS: () => (TAB_VERSIONS)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _tabs_edit_edit_container__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/edit-container.tsx");
/* ESM import */var _Pimcore_modules_element_editor_shared_tab_manager_tabs_versions_components_versions_container_versions_container__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/components/versions-container/versions-container.tsx");
/* ESM import */var _Pimcore_modules_document_editor_shared_tab_manager_tabs_versions_comparison_view_comparison_view__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/document/editor/shared-tab-manager/tabs/versions/comparison-view/comparison-view.tsx");
/* ESM import */var _Pimcore_modules_document_editor_shared_tab_manager_tabs_versions_single_view_single_view__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/document/editor/shared-tab-manager/tabs/versions/single-view/single-view.tsx");
/* ESM import */var _Pimcore_modules_document_editor_shared_tab_manager_tabs_preview_preview_view__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/document/editor/shared-tab-manager/tabs/preview/preview-view.tsx");
/* ESM import */var _Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/element/permissions/permission-helper.ts");
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








const TAB_EDIT = {
    key: 'edit',
    label: 'edit.label',
    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_tabs_edit_edit_container__WEBPACK_IMPORTED_MODULE_3__.EditContainer, {}, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tab-definitions.tsx",
        lineNumber: 22,
        columnNumber: 13
    }, undefined),
    icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_2__.Icon, {
        value: 'edit-pen'
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tab-definitions.tsx",
        lineNumber: 23,
        columnNumber: 9
    }, undefined),
    isDetachable: false,
    hidden: (element)=>{
        return !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_8__.checkElementPermission)(element.permissions, 'save') && !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_8__.checkElementPermission)(element.permissions, 'publish');
    }
};
const TAB_VERSIONS = {
    key: 'versions',
    label: 'version.label',
    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_editor_shared_tab_manager_tabs_versions_components_versions_container_versions_container__WEBPACK_IMPORTED_MODULE_4__.VersionsTabContainer, {
        ComparisonViewComponent: _Pimcore_modules_document_editor_shared_tab_manager_tabs_versions_comparison_view_comparison_view__WEBPACK_IMPORTED_MODULE_5__.ComparisonView,
        SingleViewComponent: _Pimcore_modules_document_editor_shared_tab_manager_tabs_versions_single_view_single_view__WEBPACK_IMPORTED_MODULE_6__.SingleView
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tab-definitions.tsx",
        lineNumber: 32,
        columnNumber: 13
    }, undefined),
    icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_2__.Icon, {
        value: 'history'
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tab-definitions.tsx",
        lineNumber: 33,
        columnNumber: 9
    }, undefined),
    isDetachable: true,
    hidden: (element)=>{
        return !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_8__.checkElementPermission)(element.permissions, 'versions');
    }
};
const TAB_PREVIEW = {
    key: 'preview',
    label: 'preview.label',
    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_document_editor_shared_tab_manager_tabs_preview_preview_view__WEBPACK_IMPORTED_MODULE_7__.PreviewView, {}, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tab-definitions.tsx",
        lineNumber: 42,
        columnNumber: 13
    }, undefined),
    icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_2__.Icon, {
        value: 'preview'
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tab-definitions.tsx",
        lineNumber: 43,
        columnNumber: 9
    }, undefined),
    isDetachable: true
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
"./js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/components/draft-alert/draft-alert.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DraftAlert: () => (DraftAlert)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_alert_alert__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/alert/alert.tsx");
/* ESM import */var _Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/box/box.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/button/button.tsx");
/* ESM import */var _Pimcore_modules_document_hooks_use_document_draft__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/document/hooks/use-document-draft.ts");
/* ESM import */var _Pimcore_modules_document_document_provider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/document/document-provider.tsx");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_9__);
/* ESM import */var _Pimcore_modules_element_draft_hooks_use_draft_data__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/element/draft/hooks/use-draft-data.ts");
/* ESM import */var _Pimcore_modules_element_actions_delete_draft_use_delete_draft__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/element/actions/delete-draft/use-delete-draft.tsx");
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
var _s = $RefreshSig$();











const DraftAlert = ()=>{
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation)();
    const { deleteDraft, isLoading, buttonText } = (0,_Pimcore_modules_element_actions_delete_draft_use_delete_draft__WEBPACK_IMPORTED_MODULE_11__.useDeleteDraft)('document');
    const { id } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_Pimcore_modules_document_document_provider__WEBPACK_IMPORTED_MODULE_8__.DocumentContext);
    const { document } = (0,_Pimcore_modules_document_hooks_use_document_draft__WEBPACK_IMPORTED_MODULE_7__.useDocumentDraft)(id);
    if ((0,lodash__WEBPACK_IMPORTED_MODULE_9__.isNil)(document)) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}, void 0, false);
    }
    const draftData = document === null || document === void 0 ? void 0 : document.draftData;
    if ((0,lodash__WEBPACK_IMPORTED_MODULE_9__.isNil)(draftData) || document.changes[_Pimcore_modules_element_draft_hooks_use_draft_data__WEBPACK_IMPORTED_MODULE_10__.IS_AUTO_SAVE_DRAFT_CREATED]) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}, void 0, false);
    }
    const deleteDraftButton = /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_6__.Button, {
        danger: true,
        ghost: true,
        loading: isLoading,
        onClick: deleteDraft,
        size: "small",
        children: buttonText
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/components/draft-alert/draft-alert.tsx",
        lineNumber: 44,
        columnNumber: 29
    }, undefined);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_3__.Box, {
        padding: "extra-small",
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_alert_alert__WEBPACK_IMPORTED_MODULE_2__.Alert, {
            action: deleteDraftButton,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_5__.Icon, {
                value: "draft"
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/components/draft-alert/draft-alert.tsx",
                lineNumber: 48,
                columnNumber: 47
            }, void 0),
            message: t(draftData.isAutoSave ? 'draft-alert-auto-save' : 'draft-alert'),
            showIcon: true,
            type: "info"
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/components/draft-alert/draft-alert.tsx",
            lineNumber: 48,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/components/draft-alert/draft-alert.tsx",
        lineNumber: 47,
        columnNumber: 10
    }, undefined);
};
_s(DraftAlert, "mYLFjfO1H7u4R4rRita94SuKT1c=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation,
        _Pimcore_modules_element_actions_delete_draft_use_delete_draft__WEBPACK_IMPORTED_MODULE_11__.useDeleteDraft,
        _Pimcore_modules_document_hooks_use_document_draft__WEBPACK_IMPORTED_MODULE_7__.useDocumentDraft
    ];
});
_c = DraftAlert;
var _c;
$RefreshReg$(_c, "DraftAlert");

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
"./js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/edit-container.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  EditContainer: () => (EditContainer)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_modules_document_document_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/document/document-provider.tsx");
/* ESM import */var _Pimcore_modules_document_hooks_use_document_draft__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/document/hooks/use-document-draft.ts");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var _components_iframe_iframe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/iframe/iframe.tsx");
/* ESM import */var _Pimcore_app_public_api_helpers_api_helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/app/public-api/helpers/api-helper.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_7__);
/* ESM import */var _Pimcore_utils_url_cache_buster__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/utils/url-cache-buster.ts");
/* ESM import */var _Pimcore_components_sidebar_sidebar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/components/sidebar/sidebar.tsx");
/* ESM import */var _Pimcore_components_content_layout_content_layout__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/components/content-layout/content-layout.tsx");
/* ESM import */var _sidebar_sidebar_manager_helper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/document/editor/sidebar/sidebar-manager-helper.ts");
/* ESM import */var _hooks_use_document_editor_sidebar_entries__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/hooks/use-document-editor-sidebar-entries.ts");
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _Pimcore_modules_document_document_editor_slice__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/modules/document/document-editor-slice.ts");
/* ESM import */var _components_draft_alert_draft_alert__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/components/draft-alert/draft-alert.tsx");
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
var _s = $RefreshSig$();















const EditContainer = ()=>{
    _s();
    const { id } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useContext)(_Pimcore_modules_document_document_provider__WEBPACK_IMPORTED_MODULE_1__.DocumentContext);
    const { document: documentDraft } = (0,_Pimcore_modules_document_hooks_use_document_draft__WEBPACK_IMPORTED_MODULE_2__.useDocumentDraft)(id);
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation)();
    const iframeRef = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)(null);
    const dispatch = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_13__.useAppDispatch)();
    const sidebarManager = (0,_sidebar_sidebar_manager_helper__WEBPACK_IMPORTED_MODULE_11__.getDocumentSidebarManager)(documentDraft === null || documentDraft === void 0 ? void 0 : documentDraft.type);
    const sidebarButtons = sidebarManager.getButtons();
    const sidebarEntries = (0,_hooks_use_document_editor_sidebar_entries__WEBPACK_IMPORTED_MODULE_12__.useDocumentEditorSidebarEntries)();
    const handleIframeLoad = (0,react__WEBPACK_IMPORTED_MODULE_3__.useCallback)(()=>{
        var _iframeRef_current;
        const iframeElement = (_iframeRef_current = iframeRef.current) === null || _iframeRef_current === void 0 ? void 0 : _iframeRef_current.getIframeElement();
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_7__.isNil)(iframeElement)) {
            try {
                const { document: documentApi } = (0,_Pimcore_app_public_api_helpers_api_helper__WEBPACK_IMPORTED_MODULE_6__.getPimcoreStudioApi)();
                documentApi.registerIframe(id, iframeElement, iframeRef);
            } catch (error) {
                console.warn('Could not register iframe:', error);
            }
        }
    }, [
        id
    ]);
    const iframeSrc = (0,react__WEBPACK_IMPORTED_MODULE_3__.useMemo)(()=>{
        return (0,_Pimcore_utils_url_cache_buster__WEBPACK_IMPORTED_MODULE_8__.addCacheBusterToUrl)(`${documentDraft === null || documentDraft === void 0 ? void 0 : documentDraft.fullPath}?pimcore_editmode=true&pimcore_studio=true&documentId=${id}`);
    }, [
        documentDraft === null || documentDraft === void 0 ? void 0 : documentDraft.fullPath,
        id
    ]);
    // Cleanup on unmount
    react__WEBPACK_IMPORTED_MODULE_3___default().useEffect(()=>{
        return ()=>{
            try {
                const { document: documentApi } = (0,_Pimcore_app_public_api_helpers_api_helper__WEBPACK_IMPORTED_MODULE_6__.getPimcoreStudioApi)();
                documentApi.unregisterIframe(id);
            } catch (error) {
                console.warn('Could not unregister iframe:', error);
            }
            dispatch((0,_Pimcore_modules_document_document_editor_slice__WEBPACK_IMPORTED_MODULE_14__.removeDocument)(id));
        };
    }, [
        id,
        dispatch
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_layout_content_layout__WEBPACK_IMPORTED_MODULE_10__.ContentLayout, {
        renderSidebar: sidebarEntries.length > 0 ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_sidebar_sidebar__WEBPACK_IMPORTED_MODULE_9__.Sidebar, {
            buttons: sidebarButtons,
            entries: sidebarEntries,
            sizing: "medium",
            translateTooltips: true
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/edit-container.tsx",
            lineNumber: 72,
            columnNumber: 68
        }, void 0) : undefined,
        renderTopBar: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_draft_alert_draft_alert__WEBPACK_IMPORTED_MODULE_15__.DraftAlert, {}, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/edit-container.tsx",
            lineNumber: 72,
            columnNumber: 191
        }, void 0),
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_iframe_iframe__WEBPACK_IMPORTED_MODULE_5__.Iframe, {
            onLoad: handleIframeLoad,
            preserveScrollOnReload: true,
            ref: iframeRef,
            src: iframeSrc,
            title: `${t('edit.label')}-${id}`,
            useExternalReadyState: true
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/edit-container.tsx",
            lineNumber: 73,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/edit-container.tsx",
        lineNumber: 72,
        columnNumber: 10
    }, undefined);
};
_s(EditContainer, "A6zh1HaLVWnWkFGgpour7x5H674=", false, function() {
    return [
        _Pimcore_modules_document_hooks_use_document_draft__WEBPACK_IMPORTED_MODULE_2__.useDocumentDraft,
        react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation,
        _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_13__.useAppDispatch,
        _hooks_use_document_editor_sidebar_entries__WEBPACK_IMPORTED_MODULE_12__.useDocumentEditorSidebarEntries
    ];
});
_c = EditContainer;
var _c;
$RefreshReg$(_c, "EditContainer");

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
"./js/src/core/modules/document/editor/shared-tab-manager/tabs/preview/document-preview.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DocumentPreview: () => (DocumentPreview)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_modules_document_hooks_use_document_draft__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/document/hooks/use-document-draft.ts");
/* ESM import */var _Pimcore_utils_hooks_use_element_visible__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/utils/hooks/use-element-visible.ts");
/* ESM import */var _Pimcore_components_iframe_iframe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/iframe/iframe.tsx");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_6__);
/* ESM import */var _Pimcore_modules_document_utils_preview_url_helper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/document/utils/preview-url-helper.ts");
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
var _s = $RefreshSig$();







const DocumentPreview = (param)=>{
    let { id } = param;
    var _iframeRef_current, _document_draftData;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)();
    const [refreshKey, setRefreshKey] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(Date.now());
    const { document } = (0,_Pimcore_modules_document_hooks_use_document_draft__WEBPACK_IMPORTED_MODULE_3__.useDocumentDraft)(id);
    const iframeRef = react__WEBPACK_IMPORTED_MODULE_1___default().useRef(null);
    const isVisible = (0,_Pimcore_utils_hooks_use_element_visible__WEBPACK_IMPORTED_MODULE_4__["default"])((_iframeRef_current = iframeRef.current) === null || _iframeRef_current === void 0 ? void 0 : _iframeRef_current.getElementRef(), true);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (isVisible) {
            setRefreshKey(Date.now());
        }
    }, [
        document === null || document === void 0 ? void 0 : (_document_draftData = document.draftData) === null || _document_draftData === void 0 ? void 0 : _document_draftData.modificationDate,
        isVisible
    ]);
    const previewUrl = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_6__.isNil)(document === null || document === void 0 ? void 0 : document.fullPath)) {
            return (0,_Pimcore_modules_document_utils_preview_url_helper__WEBPACK_IMPORTED_MODULE_7__.createPreviewUrl)(document.fullPath);
        }
        return '';
    }, [
        document === null || document === void 0 ? void 0 : document.fullPath,
        refreshKey
    ]);
    if (previewUrl === '' || (0,lodash__WEBPACK_IMPORTED_MODULE_6__.isNil)(document)) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
            children: t('preview.label')
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/preview/document-preview.tsx",
            lineNumber: 42,
            columnNumber: 12
        }, undefined);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_iframe_iframe__WEBPACK_IMPORTED_MODULE_5__.Iframe, {
        ref: iframeRef,
        src: previewUrl,
        title: `${t('preview.label')}-${id}`
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/preview/document-preview.tsx",
        lineNumber: 44,
        columnNumber: 10
    }, undefined);
};
_s(DocumentPreview, "sZRtQwCClv5xRlhzsFWM+As6vQ4=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation,
        _Pimcore_modules_document_hooks_use_document_draft__WEBPACK_IMPORTED_MODULE_3__.useDocumentDraft,
        _Pimcore_utils_hooks_use_element_visible__WEBPACK_IMPORTED_MODULE_4__["default"]
    ];
});
_c = DocumentPreview;
var _c;
$RefreshReg$(_c, "DocumentPreview");

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
"./js/src/core/modules/document/editor/shared-tab-manager/tabs/preview/preview-view.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  PreviewView: () => (PreviewView)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/element/hooks/use-element-context.ts");
/* ESM import */var _document_preview__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/document/editor/shared-tab-manager/tabs/preview/document-preview.tsx");
/* ESM import */var _Pimcore_components_content_layout_content_layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/content-layout/content-layout.tsx");
/* ESM import */var _Pimcore_components_sidebar_sidebar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/sidebar/sidebar.tsx");
/* ESM import */var _Pimcore_modules_document_document_provider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/document/document-provider.tsx");
/* ESM import */var _Pimcore_modules_document_hooks_use_document_draft__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/document/hooks/use-document-draft.ts");
/* ESM import */var _sidebar_sidebar_manager_helper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/document/editor/sidebar/sidebar-manager-helper.ts");
/* ESM import */var _edit_hooks_use_document_editor_sidebar_entries__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/hooks/use-document-editor-sidebar-entries.ts");
/* ESM import */var _Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/element/permissions/permission-helper.ts");
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
var _s = $RefreshSig$();










const PreviewView = ()=>{
    _s();
    const { id } = (0,_Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_2__.useElementContext)();
    const { id: contextId } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_Pimcore_modules_document_document_provider__WEBPACK_IMPORTED_MODULE_6__.DocumentContext);
    const { document } = (0,_Pimcore_modules_document_hooks_use_document_draft__WEBPACK_IMPORTED_MODULE_7__.useDocumentDraft)(contextId);
    const sidebarManager = (0,_sidebar_sidebar_manager_helper__WEBPACK_IMPORTED_MODULE_8__.getDocumentSidebarManager)(document === null || document === void 0 ? void 0 : document.type);
    const sidebarButtons = sidebarManager.getButtons();
    const sidebarEntries = (0,_edit_hooks_use_document_editor_sidebar_entries__WEBPACK_IMPORTED_MODULE_9__.useDocumentEditorSidebarEntries)();
    const isEditTabHidden = !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_10__.checkElementPermission)(document === null || document === void 0 ? void 0 : document.permissions, 'save') && !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_10__.checkElementPermission)(document === null || document === void 0 ? void 0 : document.permissions, 'publish');
    const showSidebar = isEditTabHidden;
    if (!showSidebar) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_document_preview__WEBPACK_IMPORTED_MODULE_3__.DocumentPreview, {
            id: id
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/preview/preview-view.tsx",
            lineNumber: 37,
            columnNumber: 12
        }, undefined);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_layout_content_layout__WEBPACK_IMPORTED_MODULE_4__.ContentLayout, {
        renderSidebar: sidebarEntries.length > 0 ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_sidebar_sidebar__WEBPACK_IMPORTED_MODULE_5__.Sidebar, {
            buttons: sidebarButtons,
            entries: sidebarEntries,
            sizing: "medium",
            translateTooltips: true
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/preview/preview-view.tsx",
            lineNumber: 39,
            columnNumber: 68
        }, void 0) : undefined,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_document_preview__WEBPACK_IMPORTED_MODULE_3__.DocumentPreview, {
            id: id
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/preview/preview-view.tsx",
            lineNumber: 40,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/preview/preview-view.tsx",
        lineNumber: 39,
        columnNumber: 10
    }, undefined);
};
_s(PreviewView, "Qm7OCT2Ifs74CvsuGLlnS9FxIlQ=", false, function() {
    return [
        _Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_2__.useElementContext,
        _Pimcore_modules_document_hooks_use_document_draft__WEBPACK_IMPORTED_MODULE_7__.useDocumentDraft,
        _edit_hooks_use_document_editor_sidebar_entries__WEBPACK_IMPORTED_MODULE_9__.useDocumentEditorSidebarEntries
    ];
});
_c = PreviewView;
var _c;
$RefreshReg$(_c, "PreviewView");

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
"./js/src/core/modules/document/editor/shared-tab-manager/tabs/versions/comparison-view/comparison-view.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ComparisonView: () => (ComparisonView)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_modules_document_editor_shared_tab_manager_tabs_versions_components_document_versions_view_document_versions_view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/document/editor/shared-tab-manager/tabs/versions/components/document-versions-view/document-versions-view.tsx");
/* ESM import */var _Pimcore_utils_type_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/utils/type-utils.ts");
/* ESM import */var _Pimcore_app_config_app_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/app/config/app-config.ts");
/* ESM import */var _Pimcore_modules_document_editor_shared_tab_manager_tabs_versions_hooks_useVersionUrl__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/document/editor/shared-tab-manager/tabs/versions/hooks/useVersionUrl.ts");
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
var _s = $RefreshSig$();





const ComparisonView = (param)=>{
    let { versionIds } = param;
    var _versionIds_, _versionIds_1;
    _s();
    const [versionUrl, setVersionUrl] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const versionsIdList = versionIds.map((version)=>version.count);
    const mainVersionId = versionIds === null || versionIds === void 0 ? void 0 : (_versionIds_ = versionIds[0]) === null || _versionIds_ === void 0 ? void 0 : _versionIds_.id;
    const comparedVersionId = versionIds === null || versionIds === void 0 ? void 0 : (_versionIds_1 = versionIds[1]) === null || _versionIds_1 === void 0 ? void 0 : _versionIds_1.id;
    const { url: mainVersionUrl } = (0,_Pimcore_modules_document_editor_shared_tab_manager_tabs_versions_hooks_useVersionUrl__WEBPACK_IMPORTED_MODULE_5__.useVersionUrl)({
        versionId: mainVersionId
    });
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!(0,_Pimcore_utils_type_utils__WEBPACK_IMPORTED_MODULE_3__.isEmptyValue)(comparedVersionId)) {
            const comparisonVersionUrl = `${_Pimcore_app_config_app_config__WEBPACK_IMPORTED_MODULE_4__.currentDomain}/pimcore-studio/api/documents/diff-versions/from/${mainVersionId}/to/${comparedVersionId}`;
            setVersionUrl(comparisonVersionUrl);
        } else {
            setVersionUrl(mainVersionUrl);
        }
    }, [
        versionIds,
        mainVersionUrl
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_document_editor_shared_tab_manager_tabs_versions_components_document_versions_view_document_versions_view__WEBPACK_IMPORTED_MODULE_2__.DocumentVersionsView, {
        versionUrl: versionUrl,
        versionsIdList: versionsIdList
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/versions/comparison-view/comparison-view.tsx",
        lineNumber: 36,
        columnNumber: 10
    }, undefined);
};
_s(ComparisonView, "BpkypkyTCNH3JvtFYDx53RH2qDs=", false, function() {
    return [
        _Pimcore_modules_document_editor_shared_tab_manager_tabs_versions_hooks_useVersionUrl__WEBPACK_IMPORTED_MODULE_5__.useVersionUrl
    ];
});
_c = ComparisonView;
var _c;
$RefreshReg$(_c, "ComparisonView");

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
"./js/src/core/modules/document/editor/shared-tab-manager/tabs/versions/components/document-versions-view/document-versions-view.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DocumentVersionsView: () => (DocumentVersionsView)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var _Pimcore_components_text_text__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/text/text.tsx");
/* ESM import */var _Pimcore_components_iframe_iframe__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/iframe/iframe.tsx");
/* ESM import */var _Pimcore_utils_hooks_use_element_resize__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/utils/hooks/use-element-resize.ts");
/* ESM import */var _Pimcore_modules_element_editor_shared_tab_manager_tabs_versions_components_versions_fields_list_versions_fields_list_styles__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/components/versions-fields-list/versions-fields-list.styles.ts");
/* ESM import */var _Pimcore_modules_element_editor_shared_tab_manager_tabs_versions_versions_view__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/versions-view.tsx");
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
var _s = $RefreshSig$();









const DocumentVersionsView = (param)=>{
    let { versionsIdList, versionUrl } = param;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)();
    const { styles } = (0,_Pimcore_modules_element_editor_shared_tab_manager_tabs_versions_components_versions_fields_list_versions_fields_list_styles__WEBPACK_IMPORTED_MODULE_8__.useStyles)();
    const { height } = (0,_Pimcore_utils_hooks_use_element_resize__WEBPACK_IMPORTED_MODULE_7__["default"])(_Pimcore_modules_element_editor_shared_tab_manager_tabs_versions_versions_view__WEBPACK_IMPORTED_MODULE_9__.VERSIONS_CONTENT_VIEW_ID);
    const iframeRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_3__.isNull)(versionUrl) && !(0,lodash__WEBPACK_IMPORTED_MODULE_3__.isNull)(iframeRef.current)) {
            iframeRef.current.reload();
        }
    }, [
        versionUrl
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_4__.Flex, {
        style: {
            height,
            minWidth: '100%'
        },
        vertical: true,
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_4__.Flex, {
                className: styles.headerContainer,
                wrap: "wrap",
                children: versionsIdList.map((versionId, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_4__.Flex, {
                        className: styles.headerItem,
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_text_text__WEBPACK_IMPORTED_MODULE_5__.Text, {
                            children: [
                                t('version.version'),
                                " ",
                                versionId
                            ]
                        }, void 0, true, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/versions/components/document-versions-view/document-versions-view.tsx",
                            lineNumber: 45,
                            columnNumber: 13
                        }, undefined)
                    }, `${index}-${versionId}`, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/versions/components/document-versions-view/document-versions-view.tsx",
                        lineNumber: 44,
                        columnNumber: 51
                    }, undefined))
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/versions/components/document-versions-view/document-versions-view.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_4__.Flex, {
                className: styles.content,
                flex: 1,
                children: !(0,lodash__WEBPACK_IMPORTED_MODULE_3__.isNull)(versionUrl) && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_iframe_iframe__WEBPACK_IMPORTED_MODULE_6__.Iframe, {
                    ref: iframeRef,
                    src: versionUrl
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/versions/components/document-versions-view/document-versions-view.tsx",
                    lineNumber: 49,
                    columnNumber: 33
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/versions/components/document-versions-view/document-versions-view.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/versions/components/document-versions-view/document-versions-view.tsx",
        lineNumber: 39,
        columnNumber: 10
    }, undefined);
};
_s(DocumentVersionsView, "qry12eBv9BXEZpM+j0gmOLmNmiU=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation,
        _Pimcore_modules_element_editor_shared_tab_manager_tabs_versions_components_versions_fields_list_versions_fields_list_styles__WEBPACK_IMPORTED_MODULE_8__.useStyles,
        _Pimcore_utils_hooks_use_element_resize__WEBPACK_IMPORTED_MODULE_7__["default"]
    ];
});
_c = DocumentVersionsView;
var _c;
$RefreshReg$(_c, "DocumentVersionsView");

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
"./js/src/core/modules/document/editor/shared-tab-manager/tabs/versions/single-view/single-view.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SingleView: () => (SingleView)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/content/content.tsx");
/* ESM import */var _Pimcore_modules_document_editor_shared_tab_manager_tabs_versions_components_document_versions_view_document_versions_view__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/document/editor/shared-tab-manager/tabs/versions/components/document-versions-view/document-versions-view.tsx");
/* ESM import */var _Pimcore_modules_document_editor_shared_tab_manager_tabs_versions_hooks_useVersionUrl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/document/editor/shared-tab-manager/tabs/versions/hooks/useVersionUrl.ts");
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
var _s = $RefreshSig$();




const SingleView = (param)=>{
    let { versionId } = param;
    _s();
    const { isLoading, url } = (0,_Pimcore_modules_document_editor_shared_tab_manager_tabs_versions_hooks_useVersionUrl__WEBPACK_IMPORTED_MODULE_4__.useVersionUrl)({
        versionId: versionId.id
    });
    if (isLoading) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_2__.Content, {
            fullPage: true,
            loading: true
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/versions/single-view/single-view.tsx",
            lineNumber: 25,
            columnNumber: 12
        }, undefined);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_document_editor_shared_tab_manager_tabs_versions_components_document_versions_view_document_versions_view__WEBPACK_IMPORTED_MODULE_3__.DocumentVersionsView, {
        versionUrl: url,
        versionsIdList: [
            versionId.count
        ]
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/versions/single-view/single-view.tsx",
        lineNumber: 27,
        columnNumber: 10
    }, undefined);
};
_s(SingleView, "vr6/kR0vyMOSBsLbCiHRlhdwVC8=", false, function() {
    return [
        _Pimcore_modules_document_editor_shared_tab_manager_tabs_versions_hooks_useVersionUrl__WEBPACK_IMPORTED_MODULE_4__.useVersionUrl
    ];
});
_c = SingleView;
var _c;
$RefreshReg$(_c, "SingleView");

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
"./js/src/core/modules/document/editor/title/title-container.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TitleContainer: () => (TitleContainer)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_modules_widget_manager_title_tab_title_container__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/widget-manager/title/tab-title-container.tsx");
/* ESM import */var _hooks_use_document_draft__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/document/hooks/use-document-draft.ts");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_4__);
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
var _s = $RefreshSig$();




const TitleContainer = (props)=>{
    _s();
    const { node } = props;
    const { document } = (0,_hooks_use_document_draft__WEBPACK_IMPORTED_MODULE_3__.useDocumentDraft)(node.getConfig().id);
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation)();
    const nodeName = node.getName();
    node.getName = ()=>{
        if ((document === null || document === void 0 ? void 0 : document.parentId) === 0) {
            return t('home');
        }
        return (document === null || document === void 0 ? void 0 : document.key) ?? nodeName;
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_widget_manager_title_tab_title_container__WEBPACK_IMPORTED_MODULE_2__.TabTitleContainer, {
        modified: (document === null || document === void 0 ? void 0 : document.modified) ?? false,
        node: node
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/title/title-container.tsx",
        lineNumber: 32,
        columnNumber: 10
    }, undefined);
};
_s(TitleContainer, "b/O53hDTnLIaKceeEDQKkZNYWFY=", false, function() {
    return [
        _hooks_use_document_draft__WEBPACK_IMPORTED_MODULE_3__.useDocumentDraft,
        react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation
    ];
});
_c = TitleContainer;
var _c;
$RefreshReg$(_c, "TitleContainer");

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
"./js/src/core/modules/document/editor/widget.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DocumentEditorWidget: () => (DocumentEditorWidget)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_modules_document_editor_title_title_container__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/document/editor/title/title-container.tsx");
/* ESM import */var _Pimcore_modules_document_document_draft_slice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/document/document-draft-slice.tsx");
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var _Pimcore_modules_document_document_provider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/document/document-provider.tsx");
/* ESM import */var _editor_container_editor_container_renderer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/document/editor/editor-container/editor-container-renderer.tsx");
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






const DocumentEditorWidget = {
    name: 'document-editor',
    component: _editor_container_editor_container_renderer__WEBPACK_IMPORTED_MODULE_6__.EditorContainerRenderer,
    titleComponent: _Pimcore_modules_document_editor_title_title_container__WEBPACK_IMPORTED_MODULE_1__.TitleContainer,
    defaultGlobalContext: false,
    isModified: (tabNode)=>{
        const config = tabNode.getConfig();
        const document = (0,_Pimcore_modules_document_document_draft_slice__WEBPACK_IMPORTED_MODULE_2__.selectDocumentById)(_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_3__.store.getState(), config.id);
        return (document === null || document === void 0 ? void 0 : document.modified) ?? false;
    },
    getContextProvider: (context, children)=>{
        const config = context.config;
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_document_document_provider__WEBPACK_IMPORTED_MODULE_5__.DocumentProvider, {
            id: config.id,
            children: children
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/widget.tsx",
            lineNumber: 29,
            columnNumber: 12
        }, undefined);
    }
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
"./js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/components/version-item/version-item.style.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyles: () => (useStyles)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/antd-style/antd-style");
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd_style__WEBPACK_IMPORTED_MODULE_0__);
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
const useStyles = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param)=>{
    let { token, css } = param;
    return {
        versionTag: css`
      width: 56px;
      height: 22px;

      display: inline-grid;
      justify-content: center;

      font-weight: 400;
      font-size: 12px;
      line-height: 20px;
    `,
        dateContainer: css`
      display: flex;
      align-items: center;
      margin-top: 2px;
      gap: 4px;
    `,
        dateIcon: css`
      color: ${token.Colors.Neutral.Icon.colorIcon};
    `,
        dateLabel: css`
      color: ${token.colorTextDescription};
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
"./js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/components/version-item/version-item.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  VersionItem: () => (VersionItem)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var _Pimcore_components_tag_tag__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/tag/tag.tsx");
/* ESM import */var _Pimcore_components_text_text__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/text/text.tsx");
/* ESM import */var _Pimcore_components_space_space__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/space/space.tsx");
/* ESM import */var _Pimcore_components_icon_text_button_icon_text_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/icon-text-button/icon-text-button.tsx");
/* ESM import */var _Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/components/icon-button/icon-button.tsx");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _Pimcore_components_input_input__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/components/input/input.tsx");
/* ESM import */var _Pimcore_utils_date_time__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/utils/date-time.ts");
/* ESM import */var _Pimcore_modules_element_editor_shared_tab_manager_tabs_versions_version_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/version-api-slice-enhanced.ts");
/* ESM import */var _Pimcore_modules_document_editor_shared_tab_manager_tabs_versions_hooks_useVersionUrl__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/modules/document/editor/shared-tab-manager/tabs/versions/hooks/useVersionUrl.ts");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* ESM import */var _Pimcore_types_enums_element_element_type__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("./js/src/core/types/enums/element/element-type.tsx");
/* ESM import */var _version_item_style__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("./js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/components/version-item/version-item.style.tsx");
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
var _s = $RefreshSig$();

















const VersionItem = (param)=>{
    let { version, setDetailedVersions } = param;
    _s();
    const [inputValue, setInputValue] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(version === null || version === void 0 ? void 0 : version.note);
    const [updateVersion, { isError: isUpdateVersionError, error: updateVersionError }] = (0,_Pimcore_modules_element_editor_shared_tab_manager_tabs_versions_version_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_13__.useVersionUpdateByIdMutation)();
    const [publishVersion, { isLoading: isLoadingPublishVersion, isError: isPublishVersionError, error: publishVersionError }] = (0,_Pimcore_modules_element_editor_shared_tab_manager_tabs_versions_version_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_13__.useVersionPublishByIdMutation)();
    const [deleteVersion, { isLoading: isLoadingDeleteVersion, isError: isDeleteVersionError, error: deleteVersionError }] = (0,_Pimcore_modules_element_editor_shared_tab_manager_tabs_versions_version_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_13__.useVersionDeleteByIdMutation)();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)();
    const { styles } = (0,_version_item_style__WEBPACK_IMPORTED_MODULE_17__.useStyles)();
    const published = version.published ?? false;
    const isDocumentType = version.ctype === _Pimcore_types_enums_element_element_type__WEBPACK_IMPORTED_MODULE_16__.elementTypes.document;
    const scheduledDate = !(0,lodash__WEBPACK_IMPORTED_MODULE_3__.isNil)(version.scheduled) ? (0,_Pimcore_utils_date_time__WEBPACK_IMPORTED_MODULE_12__.formatDateTime)({
        timestamp: version.scheduled,
        dateStyle: 'short',
        timeStyle: 'short'
    }) : undefined;
    const { isLoading, url } = (0,_Pimcore_modules_document_editor_shared_tab_manager_tabs_versions_hooks_useVersionUrl__WEBPACK_IMPORTED_MODULE_14__.useVersionUrl)({
        versionId: version.id,
        isSkip: !isDocumentType
    });
    const handlePublishVersion = async ()=>{
        await publishVersion({
            id: version.id
        });
        if (isPublishVersionError) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_15__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_15__.ApiError(publishVersionError));
        }
    };
    const handleDeleteVersion = async ()=>{
        await deleteVersion({
            id: version.id
        });
        setDetailedVersions([]);
        if (isDeleteVersionError) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_15__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_15__.ApiError(deleteVersionError));
        }
    };
    const handleChangeInput = (e)=>{
        setInputValue(e.target.value);
    };
    const handleUpdateNote = async ()=>{
        await updateVersion({
            id: version.id,
            updateVersion: {
                note: inputValue
            }
        });
        if (isUpdateVersionError) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_15__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_15__.ApiError(updateVersionError));
        }
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_4__.Flex, {
        gap: 'extra-small',
        vertical: true,
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_4__.Flex, {
                align: "top",
                justify: "space-between",
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_tag_tag__WEBPACK_IMPORTED_MODULE_5__.Tag, {
                        className: styles.versionTag,
                        children: [
                            "ID: ",
                            version.id
                        ]
                    }, void 0, true, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/components/version-item/version-item.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_space_space__WEBPACK_IMPORTED_MODULE_7__.Space, {
                        size: "mini",
                        children: [
                            !published && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_text_button_icon_text_button__WEBPACK_IMPORTED_MODULE_8__.IconTextButton, {
                                disabled: isLoadingPublishVersion || isLoadingDeleteVersion,
                                icon: {
                                    value: 'published'
                                },
                                loading: isLoadingPublishVersion,
                                onClick: handlePublishVersion,
                                children: t('version.publish')
                            }, void 0, false, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/components/version-item/version-item.tsx",
                                lineNumber: 102,
                                columnNumber: 26
                            }, undefined),
                            isDocumentType && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_9__.IconButton, {
                                "aria-label": t('aria.version.delete'),
                                icon: {
                                    value: 'open-folder'
                                },
                                loading: isLoading,
                                onClick: ()=>{
                                    !(0,lodash__WEBPACK_IMPORTED_MODULE_3__.isNull)(url) && window.open(url, '_blank');
                                },
                                type: 'default'
                            }, void 0, false, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/components/version-item/version-item.tsx",
                                lineNumber: 107,
                                columnNumber: 30
                            }, undefined),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_9__.IconButton, {
                                "aria-label": t('aria.version.delete'),
                                disabled: isLoadingPublishVersion || isLoadingDeleteVersion,
                                icon: {
                                    value: 'trash'
                                },
                                loading: isLoadingDeleteVersion,
                                onClick: handleDeleteVersion,
                                type: 'default'
                            }, void 0, false, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/components/version-item/version-item.tsx",
                                lineNumber: 112,
                                columnNumber: 11
                            }, undefined)
                        ]
                    }, void 0, true, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/components/version-item/version-item.tsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/components/version-item/version-item.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, undefined),
            !(0,lodash__WEBPACK_IMPORTED_MODULE_3__.isNil)(scheduledDate) && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                        children: t('version.schedule-for')
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/components/version-item/version-item.tsx",
                        lineNumber: 118,
                        columnNumber: 11
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                        className: styles.dateContainer,
                        children: [
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_10__.Icon, {
                                className: styles.dateIcon,
                                value: "calendar"
                            }, void 0, false, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/components/version-item/version-item.tsx",
                                lineNumber: 120,
                                columnNumber: 13
                            }, undefined),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_text_text__WEBPACK_IMPORTED_MODULE_6__.Text, {
                                className: styles.dateLabel,
                                children: scheduledDate
                            }, void 0, false, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/components/version-item/version-item.tsx",
                                lineNumber: 121,
                                columnNumber: 13
                            }, undefined)
                        ]
                    }, void 0, true, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/components/version-item/version-item.tsx",
                        lineNumber: 119,
                        columnNumber: 11
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/components/version-item/version-item.tsx",
                lineNumber: 117,
                columnNumber: 33
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                        children: t('version.note')
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/components/version-item/version-item.tsx",
                        lineNumber: 127,
                        columnNumber: 9
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_input_input__WEBPACK_IMPORTED_MODULE_11__.Input, {
                        onBlur: handleUpdateNote,
                        onChange: handleChangeInput,
                        onClick: (e)=>{
                            e.stopPropagation();
                        },
                        placeholder: t('version.note.add'),
                        value: inputValue
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/components/version-item/version-item.tsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/components/version-item/version-item.tsx",
                lineNumber: 126,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/components/version-item/version-item.tsx",
        lineNumber: 98,
        columnNumber: 10
    }, undefined);
};
_s(VersionItem, "6pZF9NqStcBTlJXIbG7PgpicOF4=", false, function() {
    return [
        _Pimcore_modules_element_editor_shared_tab_manager_tabs_versions_version_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_13__.useVersionUpdateByIdMutation,
        _Pimcore_modules_element_editor_shared_tab_manager_tabs_versions_version_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_13__.useVersionPublishByIdMutation,
        _Pimcore_modules_element_editor_shared_tab_manager_tabs_versions_version_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_13__.useVersionDeleteByIdMutation,
        react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation,
        _version_item_style__WEBPACK_IMPORTED_MODULE_17__.useStyles,
        _Pimcore_modules_document_editor_shared_tab_manager_tabs_versions_hooks_useVersionUrl__WEBPACK_IMPORTED_MODULE_14__.useVersionUrl
    ];
});
_c = VersionItem;
var _c;
$RefreshReg$(_c, "VersionItem");

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
"./js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/components/versions-container/versions-container.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  VersionsTabContainer: () => (VersionsTabContainer)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_modules_element_editor_shared_tab_manager_tabs_versions_version_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/version-api-slice-enhanced.ts");
/* ESM import */var _Pimcore_modules_element_editor_shared_tab_manager_tabs_versions_versions_view__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/versions-view.tsx");
/* ESM import */var _Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/content/content.tsx");
/* ESM import */var _Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/element/hooks/use-element-context.ts");
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
var _s = $RefreshSig$();





const VersionsTabContainer = (param)=>{
    let { SingleViewComponent, ComparisonViewComponent } = param;
    _s();
    const { id, elementType } = (0,_Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_5__.useElementContext)();
    const { isLoading, data } = (0,_Pimcore_modules_element_editor_shared_tab_manager_tabs_versions_version_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__.useVersionGetCollectionForElementByTypeAndIdQuery)({
        id,
        elementType,
        page: 1,
        pageSize: 9999
    });
    if (isLoading) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_4__.Content, {
            loading: true
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/components/versions-container/versions-container.tsx",
            lineNumber: 34,
            columnNumber: 12
        }, undefined);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_editor_shared_tab_manager_tabs_versions_versions_view__WEBPACK_IMPORTED_MODULE_3__.VersionsView, {
        ComparisonViewComponent: ComparisonViewComponent,
        SingleViewComponent: SingleViewComponent,
        versions: data.items
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/components/versions-container/versions-container.tsx",
        lineNumber: 36,
        columnNumber: 10
    }, undefined);
};
_s(VersionsTabContainer, "hkE5n1gmBzB4A+iWyF9eWPtdlL8=", false, function() {
    return [
        _Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_5__.useElementContext,
        _Pimcore_modules_element_editor_shared_tab_manager_tabs_versions_version_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__.useVersionGetCollectionForElementByTypeAndIdQuery
    ];
});
_c = VersionsTabContainer;
var _c;
$RefreshReg$(_c, "VersionsTabContainer");

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
"./js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/helpers/create-version-accordion-item.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  createVersionAccordionItem: () => (createVersionAccordionItem)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _Pimcore_utils_date_time__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/utils/date-time.ts");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_5__);
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _Pimcore_components_tag_tag__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/tag/tag.tsx");
/* ESM import */var _Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/box/box.tsx");
/* ESM import */var _components_version_item_version_item__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/components/version-item/version-item.tsx");
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









const createVersionAccordionItem = (param)=>{
    let { version, detailedVersions, isComparingActive, selectVersion, setDetailedVersions } = param;
    var _s = $RefreshSig$(), _s1 = $RefreshSig$(), _s2 = $RefreshSig$();
    const vId = {
        id: version.id,
        count: version.versionCount
    };
    const selected = detailedVersions.some((v)=>v.id === version.id);
    const published = version.published ?? false;
    const autosaved = version.autosave ?? false;
    const selectable = isComparingActive;
    const themeBySelection = selected ? 'theme-primary' : 'theme-default';
    const themeByState = published ? 'theme-success' : themeBySelection;
    const handleComparisonAction = ()=>{
        selectVersion(vId);
    };
    const handleDetailAction = ()=>{
        setDetailedVersions([
            {
                id: version.id,
                count: version.versionCount
            }
        ]);
    };
    const handleClick = ()=>{
        selectable ? handleComparisonAction() : handleDetailAction();
    };
    const Title = ()=>{
        _s();
        const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)();
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
            children: [
                selectable && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_8__.Box, {
                    inline: true,
                    padding: {
                        right: 'extra-small'
                    },
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_5__.Checkbox, {
                        checked: selected,
                        onChange: ()=>{
                            selectVersion(vId);
                        }
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/helpers/create-version-accordion-item.tsx",
                        lineNumber: 57,
                        columnNumber: 13
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/helpers/create-version-accordion-item.tsx",
                    lineNumber: 54,
                    columnNumber: 24
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                    className: 'title',
                    children: `${t('version.version')} ${version.versionCount} | ${(0,_Pimcore_utils_date_time__WEBPACK_IMPORTED_MODULE_4__.formatDateTime)({
                        timestamp: version.date,
                        dateStyle: 'short',
                        timeStyle: 'medium'
                    })}`
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/helpers/create-version-accordion-item.tsx",
                    lineNumber: 61,
                    columnNumber: 9
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/helpers/create-version-accordion-item.tsx",
            lineNumber: 53,
            columnNumber: 12
        }, undefined);
    };
    _s(Title, "EHitWn2MOpZJ3EHE1EThwmMZIjo=", false, function() {
        return [
            react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation
        ];
    });
    const Subtitle = ()=>{
        var _version_user;
        _s1();
        const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)();
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                    className: 'sub-title',
                    children: `${t('by')} ${((_version_user = version.user) === null || _version_user === void 0 ? void 0 : _version_user.name) ?? ''}`
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/helpers/create-version-accordion-item.tsx",
                    lineNumber: 74,
                    columnNumber: 9
                }, undefined),
                (0,lodash__WEBPACK_IMPORTED_MODULE_3__.isNil)(version.autosave) && version.autosave && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_6__.Icon, {
                    value: "auto-save"
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/helpers/create-version-accordion-item.tsx",
                    lineNumber: 75,
                    columnNumber: 57
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/helpers/create-version-accordion-item.tsx",
            lineNumber: 73,
            columnNumber: 12
        }, undefined);
    };
    _s1(Subtitle, "EHitWn2MOpZJ3EHE1EThwmMZIjo=", false, function() {
        return [
            react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation
        ];
    });
    const Extra = ()=>{
        _s2();
        const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)();
        if (published) {
            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_tag_tag__WEBPACK_IMPORTED_MODULE_7__.Tag, {
                color: 'success',
                iconName: 'published',
                children: t('version.published')
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/helpers/create-version-accordion-item.tsx",
                lineNumber: 83,
                columnNumber: 14
            }, undefined);
        }
        if (autosaved) {
            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_tag_tag__WEBPACK_IMPORTED_MODULE_7__.Tag, {
                color: 'geekblue',
                iconName: 'auto-save',
                children: t('version.autosaved')
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/helpers/create-version-accordion-item.tsx",
                lineNumber: 88,
                columnNumber: 14
            }, undefined);
        }
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}, void 0, false);
    };
    _s2(Extra, "EHitWn2MOpZJ3EHE1EThwmMZIjo=", false, function() {
        return [
            react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation
        ];
    });
    return {
        key: String(version.id),
        selected,
        title: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Title, {}, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/helpers/create-version-accordion-item.tsx",
            lineNumber: 97,
            columnNumber: 12
        }, undefined),
        subtitle: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Subtitle, {}, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/helpers/create-version-accordion-item.tsx",
            lineNumber: 98,
            columnNumber: 15
        }, undefined),
        extra: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Extra, {}, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/helpers/create-version-accordion-item.tsx",
            lineNumber: 99,
            columnNumber: 12
        }, undefined),
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_version_item_version_item__WEBPACK_IMPORTED_MODULE_9__.VersionItem, {
            setDetailedVersions: setDetailedVersions,
            version: version
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/helpers/create-version-accordion-item.tsx",
            lineNumber: 100,
            columnNumber: 15
        }, undefined),
        onClick: handleClick,
        theme: themeByState
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
"./js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/versions-view.style.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyles: () => (useStyles)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/antd-style/antd-style");
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd_style__WEBPACK_IMPORTED_MODULE_0__);
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
const useStyles = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param)=>{
    let { token, css } = param;
    const themeToken = {
        highlightBackgroundColor: '#F6FFED',
        highlightBorderColor: '#B7EB8F',
        highlightColor: '#52C41A',
        signalBackgroundColor: '#E6F4FF',
        signalBorderColor: '#91CAFF',
        signalColor: '#1677FF',
        ...token
    };
    return {
        versions: css`
      .title-tag__own-draft {
        color: ${themeToken.signalColor};
        border-color: ${themeToken.signalBorderColor};
        background-color: ${themeToken.signalBackgroundColor};
      }

      .title-tag__published {
        color: ${themeToken.highlightColor};
        border-color: ${themeToken.highlightBorderColor};
        background-color: ${themeToken.highlightBackgroundColor};
      }

      .sub-title {
        font-weight: normal;
        margin-right: 4px;
        color: ${themeToken.colorTextDescription};
      }

      .ant-tag {
        display: flex;
        align-items: center;
      }

      .ant-tag-geekblue {
        background-color: ${token.Colors.Base.Geekblue['2']} !important;
        color: ${token.Colors.Base.Geekblue['6']} !important;
        border-color: ${token.Colors.Base.Geekblue['3']} !important;
      }
    `,
        compareButton: css`
      background-color: ${token.Colors.Neutral.Fill.colorFill} !important;
    `,
        notificationMessage: css`
      text-align: center;
      max-width: 200px;
    `
    };
}, {
    hashPriority: 'low'
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
"./js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/versions-view.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  VERSIONS_CONTENT_VIEW_ID: () => (VERSIONS_CONTENT_VIEW_ID),
  VersionsView: () => (VersionsView)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/classnames/classnames");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _Pimcore_modules_element_editor_shared_tab_manager_tabs_versions_version_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/version-api-slice-enhanced.ts");
/* ESM import */var _Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/button/button.tsx");
/* ESM import */var _Pimcore_components_modal_useModal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/modal/useModal/index.tsx");
/* ESM import */var _Pimcore_components_modal_footer_modal_footer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/modal/footer/modal-footer.tsx");
/* ESM import */var _Pimcore_components_icon_text_button_icon_text_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/icon-text-button/icon-text-button.tsx");
/* ESM import */var _Pimcore_components_header_header__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/components/header/header.tsx");
/* ESM import */var _Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/components/content/content.tsx");
/* ESM import */var _Pimcore_components_split_layout_split_layout__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/components/split-layout/split-layout.tsx");
/* ESM import */var _Pimcore_components_accordion_timeline_accordion_timeline__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/components/accordion-timeline/accordion-timeline.tsx");
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var _Pimcore_components_text_text__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/components/text/text.tsx");
/* ESM import */var _helpers_create_version_accordion_item__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/helpers/create-version-accordion-item.tsx");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* ESM import */var _Pimcore_modules_element_editor_shared_tab_manager_tabs_versions_versions_view_style__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("./js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/versions-view.style.tsx");
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
var _s = $RefreshSig$();

















const VERSIONS_CONTENT_VIEW_ID = 'versions_content_view';
const VersionsView = (param)=>{
    let { versions, SingleViewComponent, ComparisonViewComponent } = param;
    _s();
    const [isComparingActive, setIsComparingActive] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [detailedVersions, setDetailedVersions] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [cleanupVersion, { isLoading: isLoadingCleanupVersion, isError: isCleanupVersionError, error: cleanupVersionError }] = (0,_Pimcore_modules_element_editor_shared_tab_manager_tabs_versions_version_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_4__.useVersionCleanupForElementByTypeAndIdMutation)();
    const { renderModal: RenderModal, showModal, handleOk } = (0,_Pimcore_components_modal_useModal__WEBPACK_IMPORTED_MODULE_6__.useModal)({
        type: 'warn'
    });
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation)();
    const { styles } = (0,_Pimcore_modules_element_editor_shared_tab_manager_tabs_versions_versions_view_style__WEBPACK_IMPORTED_MODULE_17__.useStyles)();
    const handleClearVersions = async ()=>{
        handleOk();
        await cleanupVersion({
            elementType: versions[0].ctype,
            id: versions[0].cid
        });
        if (isCleanupVersionError) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_16__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_16__.ApiError(cleanupVersionError));
        }
    };
    const handleClickCompareVersion = ()=>{
        setDetailedVersions([]);
        setIsComparingActive(!isComparingActive);
    };
    const selectVersion = (vId)=>{
        let tempComparedVersions = [
            ...detailedVersions
        ];
        const isSelected = tempComparedVersions.some((v)=>v.id === vId.id);
        if (tempComparedVersions.length === 2 && !isSelected) {
            tempComparedVersions = [];
        }
        if (!isSelected) {
            tempComparedVersions.push(vId);
        } else {
            tempComparedVersions.splice(tempComparedVersions.indexOf(vId), 1);
        }
        setDetailedVersions(tempComparedVersions);
    };
    const renderModal = ()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(RenderModal, {
            footer: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_modal_footer_modal_footer__WEBPACK_IMPORTED_MODULE_7__.ModalFooter, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_5__.Button, {
                        onClick: handleClearVersions,
                        type: 'primary',
                        children: t('yes')
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/versions-view.tsx",
                        lineNumber: 82,
                        columnNumber: 11
                    }, void 0),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_5__.Button, {
                        onClick: handleOk,
                        type: 'default',
                        children: t('no')
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/versions-view.tsx",
                        lineNumber: 85,
                        columnNumber: 11
                    }, void 0)
                ]
            }, void 0, true, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/versions-view.tsx",
                lineNumber: 81,
                columnNumber: 50
            }, void 0),
            title: t('version.clear-unpublished-versions'),
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                children: t('version.confirm-clear-unpublished')
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/versions-view.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/versions-view.tsx",
            lineNumber: 81,
            columnNumber: 29
        }, undefined);
    const accordionItems = versions.map((version)=>(0,_helpers_create_version_accordion_item__WEBPACK_IMPORTED_MODULE_15__.createVersionAccordionItem)({
            version,
            detailedVersions,
            isComparingActive,
            selectVersion,
            setDetailedVersions
        }));
    const isEmptyVersionsList = versions.length === 0;
    const isEmptyDetailedVersionsList = detailedVersions.length === 0;
    if (isEmptyVersionsList) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_10__.Content, {
            padded: true,
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_header_header__WEBPACK_IMPORTED_MODULE_9__.Header, {
                    className: 'p-l-mini',
                    title: t('version.versions')
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/versions-view.tsx",
                    lineNumber: 102,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_10__.Content, {
                    none: true,
                    noneOptions: {
                        text: t('version.no-versions-to-show')
                    }
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/versions-view.tsx",
                    lineNumber: 103,
                    columnNumber: 9
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/versions-view.tsx",
            lineNumber: 101,
            columnNumber: 12
        }, undefined);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_10__.Content, {
        className: styles.versions,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_split_layout_split_layout__WEBPACK_IMPORTED_MODULE_11__.SplitLayout, {
            leftItem: {
                size: 25,
                minSize: 415,
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_10__.Content, {
                    padded: true,
                    children: [
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_header_header__WEBPACK_IMPORTED_MODULE_9__.Header, {
                            title: t('version.versions'),
                            children: !isEmptyVersionsList && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_13__.Flex, {
                                        className: "w-full",
                                        gap: "small",
                                        justify: "space-between",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_5__.Button, {
                                                className: classnames__WEBPACK_IMPORTED_MODULE_2___default()({
                                                    [styles.compareButton]: isComparingActive
                                                }),
                                                onClick: handleClickCompareVersion,
                                                children: t('version.compare-versions')
                                            }, t('version.compare-versions'), false, {
                                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/versions-view.tsx",
                                                lineNumber: 116,
                                                columnNumber: 23
                                            }, void 0),
                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_text_button_icon_text_button__WEBPACK_IMPORTED_MODULE_8__.IconTextButton, {
                                                icon: {
                                                    value: 'trash'
                                                },
                                                loading: isLoadingCleanupVersion,
                                                onClick: showModal,
                                                children: t('version.clear-unpublished')
                                            }, t('version.clear-unpublished'), false, {
                                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/versions-view.tsx",
                                                lineNumber: 122,
                                                columnNumber: 23
                                            }, void 0)
                                        ]
                                    }, void 0, true, {
                                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/versions-view.tsx",
                                        lineNumber: 115,
                                        columnNumber: 21
                                    }, void 0),
                                    renderModal()
                                ]
                            }, void 0, true)
                        }, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/versions-view.tsx",
                            lineNumber: 113,
                            columnNumber: 15
                        }, void 0),
                        !isEmptyVersionsList && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_accordion_timeline_accordion_timeline__WEBPACK_IMPORTED_MODULE_12__.AccordionTimeline, {
                            items: accordionItems
                        }, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/versions-view.tsx",
                            lineNumber: 133,
                            columnNumber: 40
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/versions-view.tsx",
                    lineNumber: 112,
                    columnNumber: 17
                }, void 0)
            },
            rightItem: {
                size: 75,
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_10__.Content, {
                    centered: isEmptyDetailedVersionsList,
                    id: VERSIONS_CONTENT_VIEW_ID,
                    padded: true,
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_13__.Flex, {
                        align: "center",
                        children: [
                            !isEmptyDetailedVersionsList && isComparingActive && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(ComparisonViewComponent, {
                                versionIds: detailedVersions
                            }, void 0, false, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/versions-view.tsx",
                                lineNumber: 139,
                                columnNumber: 71
                            }, void 0),
                            !isEmptyDetailedVersionsList && !isComparingActive && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(SingleViewComponent, {
                                setDetailedVersions: setDetailedVersions,
                                versionId: detailedVersions[0],
                                versions: versions
                            }, void 0, false, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/versions-view.tsx",
                                lineNumber: 141,
                                columnNumber: 72
                            }, void 0),
                            isEmptyDetailedVersionsList && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_text_text__WEBPACK_IMPORTED_MODULE_14__.Text, {
                                className: styles.notificationMessage,
                                children: t('version.preview-notification')
                            }, void 0, false, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/versions-view.tsx",
                                lineNumber: 143,
                                columnNumber: 49
                            }, void 0)
                        ]
                    }, void 0, true, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/versions-view.tsx",
                        lineNumber: 138,
                        columnNumber: 15
                    }, void 0)
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/versions-view.tsx",
                    lineNumber: 137,
                    columnNumber: 17
                }, void 0)
            }
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/versions-view.tsx",
            lineNumber: 109,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/versions-view.tsx",
        lineNumber: 108,
        columnNumber: 10
    }, undefined);
};
_s(VersionsView, "EXMAAEoRcPu/8xy6hEonVqacSJU=", false, function() {
    return [
        _Pimcore_modules_element_editor_shared_tab_manager_tabs_versions_version_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_4__.useVersionCleanupForElementByTypeAndIdMutation,
        _Pimcore_components_modal_useModal__WEBPACK_IMPORTED_MODULE_6__.useModal,
        react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation,
        _Pimcore_modules_element_editor_shared_tab_manager_tabs_versions_versions_view_style__WEBPACK_IMPORTED_MODULE_17__.useStyles
    ];
});
_c = VersionsView;
var _c;
$RefreshReg$(_c, "VersionsView");

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
//# sourceMappingURL=js_src_core_modules_document_editor_types_email_tab-manager_email-tab-manager_ts-js_src_core_-344236.js.map