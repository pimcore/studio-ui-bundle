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
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["js_src_core_modules_document_editor_sidebar_document-sidebar-manager_ts-js_src_core_modules_d-4b5729"], {
"./js/src/core/components/form/hooks/use-debounced-form-change.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useDebouncedFormChange: () => (useDebouncedFormChange)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_utils_uuid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/utils/uuid.ts");
/* ESM import */var _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/app/depency-injection/index.ts");
/* ESM import */var _Pimcore_app_config_services_service_ids__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/app/config/services/service-ids.ts");
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




const useDebouncedFormChange = function(onFormChange) {
    let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const { delay = 300, immediateFields = [], tag } = options;
    const registryKey = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>`${tag ?? 'default'}-${(0,_Pimcore_utils_uuid__WEBPACK_IMPORTED_MODULE_2__.uuid)()}`, [
        tag
    ]);
    const debouncedChangeRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)((0,lodash__WEBPACK_IMPORTED_MODULE_1__.debounce)((changedValues, allValues)=>{
        onFormChange(changedValues, allValues);
    }, delay));
    const handleFormChange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((changedValues, allValues)=>{
        const immediateChanges = {};
        const debouncedChanges = {};
        Object.entries(changedValues).forEach((param)=>{
            let [key, value] = param;
            if (immediateFields.includes(key)) {
                immediateChanges[key] = value;
            } else {
                debouncedChanges[key] = value;
            }
        });
        if (Object.keys(immediateChanges).length > 0) {
            onFormChange(immediateChanges, allValues);
        }
        if (Object.keys(debouncedChanges).length > 0) {
            debouncedChangeRef.current(debouncedChanges, allValues);
        }
    }, [
        onFormChange,
        immediateFields
    ]);
    const flush = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(()=>{
        debouncedChangeRef.current.flush();
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isNil)(tag) && !(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(tag)) {
            const registry = _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_3__.container.get(_Pimcore_app_config_services_service_ids__WEBPACK_IMPORTED_MODULE_4__.serviceIds.debouncedFormRegistry);
            registry.register(registryKey, flush, tag);
            return ()=>{
                registry.unregister(registryKey);
            };
        }
    }, [
        registryKey,
        flush,
        tag
    ]);
    return {
        handleFormChange,
        flush
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
  selectDocumentTimeSliderVisible: () => (selectDocumentTimeSliderVisible),
  setDocumentAreablockTypes: () => (setDocumentAreablockTypes),
  setDocumentTimeSliderVisible: () => (setDocumentTimeSliderVisible)
});
/* ESM import */var _sdk_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/sdk/app/index.ts");
/* ESM import */var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/@reduxjs/toolkit/@reduxjs/toolkit");
/* ESM import */var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
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


const initialState = {
    documentAreablocks: {},
    timeSliderVisible: {}
};
const documentEditorSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__.createSlice)({
    name: 'document-editor',
    initialState,
    reducers: {
        setDocumentAreablockTypes: (state, action)=>{
            if ((0,lodash__WEBPACK_IMPORTED_MODULE_2__.isNil)(state.documentAreablocks[action.payload.documentId])) {
                state.documentAreablocks[action.payload.documentId] = {};
            }
            state.documentAreablocks[action.payload.documentId][action.payload.editableTypeId] = action.payload.areablockTypes;
        },
        setDocumentTimeSliderVisible: (state, action)=>{
            state.timeSliderVisible[action.payload.documentId] = action.payload.visible;
        },
        removeDocument: (state, action)=>{
            const documentId = action.payload;
            if (state.documentAreablocks[documentId] !== undefined) {
                const { [documentId]: removed, ...remainingAreablocks } = state.documentAreablocks;
                state.documentAreablocks = remainingAreablocks;
            }
            if (state.timeSliderVisible[documentId] !== undefined) {
                const { [documentId]: removed, ...remainingTimeSliderVisible } = state.timeSliderVisible;
                state.timeSliderVisible = remainingTimeSliderVisible;
            }
        },
        clearAllDocuments: (state)=>{
            state.documentAreablocks = {};
            state.timeSliderVisible = {};
        }
    }
});
const { setDocumentAreablockTypes, setDocumentTimeSliderVisible, removeDocument, clearAllDocuments } = documentEditorSlice.actions;
const selectDocumentEditorState = (state)=>state['document-editor'];
const selectDocumentAreablockGroupedTypes = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__.createSelector)([
    selectDocumentEditorState,
    (_state, documentId)=>documentId
], (documentEditorState, documentId)=>{
    const editableTypeCollections = documentEditorState.documentAreablocks[documentId] ?? {};
    return (0,lodash__WEBPACK_IMPORTED_MODULE_2__.mergeWith)({}, ...Object.values(editableTypeCollections), (objValue, srcValue)=>{
        if ((0,lodash__WEBPACK_IMPORTED_MODULE_2__.isArray)(objValue)) {
            return objValue.concat(srcValue);
        }
    });
});
const selectDocumentTimeSliderVisible = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__.createSelector)([
    selectDocumentEditorState,
    (_state, documentId)=>documentId
], (documentEditorState, documentId)=>{
    return documentEditorState.timeSliderVisible[documentId] ?? false;
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
"./js/src/core/modules/document/editor/sidebar/document-sidebar-manager.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DocumentSidebarManager: () => (DocumentSidebarManager)
});
/* ESM import */var _swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/tslib/tslib.es6.mjs");
/* ESM import */var _Pimcore_modules_element_sidebar_sidebar_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/element/sidebar/sidebar-manager.ts");
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


class DocumentSidebarManager extends _Pimcore_modules_element_sidebar_sidebar_manager__WEBPACK_IMPORTED_MODULE_0__.SidebarManager {
}
DocumentSidebarManager = (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.injectable)()
], DocumentSidebarManager);

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
"./js/src/core/modules/document/editor/sidebar/tabs/areablock-types/components/areablock-types-list/areablock-types-list.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
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
    let { token, css } = param;
    return {
        collapsibleContainer: css`
      width: 100%;
    `,
        gridContainer: css`
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: ${token.marginXS}px;
      width: 100%;
      align-items: stretch;
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
"./js/src/core/modules/document/editor/sidebar/tabs/areablock-types/utils/icon-fallback.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  getAreablockTypeIcon: () => (getAreablockTypeIcon)
});
/* ESM import */var _Pimcore_utils_type_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/utils/type-utils.ts");
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
/**
 * Gets the icon for an areablock type, applying fallback icon if no icon is provided
 */ const getAreablockTypeIcon = (icon, index)=>{
    if ((0,_Pimcore_utils_type_utils__WEBPACK_IMPORTED_MODULE_0__.isNonEmptyString)(icon)) {
        // If icon contains a dot, treat it as a path, otherwise as a name
        if (icon.includes('.')) {
            return {
                type: 'path',
                value: icon
            };
        } else {
            return {
                type: 'name',
                value: icon
            };
        }
    }
    return {
        type: 'name',
        value: 'area-brick'
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
"./js/src/core/modules/document/editor/sidebar/visibility/areablock-types-visibility.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  checkAreablockTypesVisibility: () => (checkAreablockTypesVisibility)
});
/* ESM import */var _Pimcore_modules_document_document_editor_slice__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/document/document-editor-slice.ts");
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/app/store/index.ts");
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

/**
 * Checks if areablock types should be visible in the sidebar.
 * This function takes a document context parameter since visibility functions
 * are called from the sidebar manager which doesn't have React context access.
 */ const checkAreablockTypesVisibility = (context)=>{
    try {
        const state = _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_1__.store.getState();
        return (0,_Pimcore_modules_document_document_editor_slice__WEBPACK_IMPORTED_MODULE_0__.selectDocumentHasAreablocks)(state, context.id);
    } catch (error) {
        console.warn('Could not check areablock types visibility:', error);
        return false;
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
"./js/src/core/modules/document/editor/sidebar/visibility/content-settings-visibility.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  checkSettingsVisibility: () => (checkSettingsVisibility)
});
/* ESM import */var _document_permission_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/document/editor/sidebar/visibility/document-permission-helper.ts");
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
/**
 * Checks if settings should be visible based on document permissions.
 * This function takes a document context parameter since visibility functions
 * are called from the sidebar manager which doesn't have React context access.
 */ const checkSettingsVisibility = (context)=>{
    return (0,_document_permission_helper__WEBPACK_IMPORTED_MODULE_0__.checkDocumentPermission)(context, 'settings');
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
"./js/src/core/modules/document/editor/sidebar/visibility/document-permission-helper.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  checkDocumentPermission: () => (checkDocumentPermission)
});
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _Pimcore_modules_document_document_draft_slice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/document/document-draft-slice.tsx");
/* ESM import */var _Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/element/permissions/permission-helper.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
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



/**
 * Generic utility function to check document permissions for sidebar visibility.
 * This function takes a document context parameter since visibility functions
 * are called from the sidebar manager which doesn't have React context access.
 *
 * @param context - The document context containing the document ID
 * @param permission - The permission key to check (e.g., 'settings', 'properties', 'view', etc.)
 * @returns boolean indicating whether the user has the specified permission for the document
 */ const checkDocumentPermission = (context, permission)=>{
    try {
        const state = _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.store.getState();
        const document = (0,_Pimcore_modules_document_document_draft_slice__WEBPACK_IMPORTED_MODULE_1__.selectDocumentById)(state, context.id);
        if ((0,lodash__WEBPACK_IMPORTED_MODULE_3__.isNil)(document === null || document === void 0 ? void 0 : document.permissions)) {
            return false;
        }
        return (0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_2__.checkElementPermission)(document.permissions, permission);
    } catch (error) {
        console.warn(`Could not check document permission '${permission}':`, error);
        return false;
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
"./js/src/core/modules/document/editor/sidebar/visibility/navigation-visibility.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  checkNavigationVisibility: () => (checkNavigationVisibility)
});
/* ESM import */var _document_permission_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/document/editor/sidebar/visibility/document-permission-helper.ts");
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
/**
 * Checks if navigation should be visible based on document permissions.
 * This function takes a document context parameter since visibility functions
 * are called from the sidebar manager which doesn't have React context access.
 */ const checkNavigationVisibility = (context)=>{
    return (0,_document_permission_helper__WEBPACK_IMPORTED_MODULE_0__.checkDocumentPermission)(context, 'properties');
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
"./js/src/core/modules/document/hooks/use-document-url-processor.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useDocumentPreviewUrlProcessor: () => (useDocumentPreviewUrlProcessor),
  useDocumentUrlProcessor: () => (useDocumentUrlProcessor)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/app/depency-injection/index.ts");
/* ESM import */var _Pimcore_app_config_services_service_ids__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/app/config/services/service-ids.ts");
/* ESM import */var _Pimcore_utils_url_cache_buster__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/utils/url-cache-buster.ts");
/* ESM import */var _services_processors_document_url_processor_registry__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/document/services/processors/document-url-processor-registry.ts");
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





/**
 * Custom hook that processes URL parameters using hook-based processors
 * This allows processors to use React hooks directly within the processor
 */ const useDocumentUrlProcessor = function(documentId, processorType, baseUrl) {
    let baseParameters = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    const registry = _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_2__.container.get(_Pimcore_app_config_services_service_ids__WEBPACK_IMPORTED_MODULE_3__.serviceIds["Document/ProcessorRegistry/UrlProcessor"]);
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>{
        try {
            if ((0,lodash__WEBPACK_IMPORTED_MODULE_1__.isNil)(baseUrl) || baseUrl === '') {
                return '';
            }
            const context = new _services_processors_document_url_processor_registry__WEBPACK_IMPORTED_MODULE_5__.DocumentUrlContext(documentId, processorType, baseUrl, baseParameters);
            registry.executeProcessors(context);
            const url = new URL(baseUrl, window.location.origin);
            Object.entries(context.getParams()).forEach((param)=>{
                let [key, value] = param;
                url.searchParams.set(key, value);
            });
            return (0,_Pimcore_utils_url_cache_buster__WEBPACK_IMPORTED_MODULE_4__.addCacheBusterToUrl)(url.toString());
        } catch (error) {
            console.warn('Failed to process URL:', error);
            return '';
        }
    }, [
        documentId,
        processorType,
        baseUrl,
        baseParameters
    ]);
};
/**
 * Helper hook for preview URLs with standard preview parameters
 */ const useDocumentPreviewUrlProcessor = (documentId, baseUrl, refreshKey, forceDeviceType, timestamp)=>{
    const baseParameters = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({
            pimcore_preview: 'true',
            pimcore_studio_preview: 'true',
            ...!(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isNil)(forceDeviceType) && forceDeviceType !== '' ? {
                forceDeviceType
            } : {},
            ...!(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isNil)(timestamp) ? {
                pimcore_override_output_timestamp: timestamp.toString()
            } : {}
        }), [
        refreshKey,
        forceDeviceType,
        timestamp
    ]);
    return useDocumentUrlProcessor(documentId, 'preview', baseUrl, baseParameters);
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
"./js/src/core/modules/document/services/processors/document-url-processor-registry.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DocumentUrlContext: () => (DocumentUrlContext),
  DocumentUrlProcessorRegistry: () => (DocumentUrlProcessorRegistry)
});
/* ESM import */var _swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/tslib/tslib.es6.mjs");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(inversify__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _Pimcore_modules_app_processor_registry_abstract_processor_registry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/app/processor-registry/abstract-processor-registry.ts");
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


/**
 * Context for document URL processing operations
 */ class DocumentUrlContext {
    addParam(key, value) {
        this.parameters[key] = value;
    }
    getParams() {
        return {
            ...this.parameters
        };
    }
    constructor(documentId, processorType, baseUrl, baseParameters = {}){
        this.documentId = documentId;
        this.processorType = processorType;
        this.baseUrl = baseUrl;
        this.parameters = {
            ...baseParameters
        };
    }
}
class DocumentUrlProcessorRegistry extends _Pimcore_modules_app_processor_registry_abstract_processor_registry__WEBPACK_IMPORTED_MODULE_1__.AbstractProcessorRegistry {
}
DocumentUrlProcessorRegistry = (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,inversify__WEBPACK_IMPORTED_MODULE_0__.injectable)()
], DocumentUrlProcessorRegistry);

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
"./js/src/core/modules/document/tree/utils/transform-api-data-to-node.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  transformApiDataToNode: () => (transformApiDataToNode),
  transformApiDataToNodes: () => (transformApiDataToNodes)
});
/* ESM import */var _Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/element/element-helper.ts");
/* ESM import */var _Pimcore_types_enums_element_element_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/types/enums/element/element-type.tsx");
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

const transformApiDataToNode = (documentNode, node)=>{
    return {
        id: documentNode.id.toString(),
        elementType: _Pimcore_types_enums_element_element_type__WEBPACK_IMPORTED_MODULE_1__.elementTypes.document,
        icon: (0,_Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_0__.getElementIcon)(documentNode, {
            type: 'name',
            value: 'document'
        }),
        label: documentNode.key,
        type: documentNode.type,
        parentId: documentNode.parentId.toString(),
        fullPath: documentNode.fullPath,
        hasChildren: documentNode.hasChildren,
        locked: documentNode.locked,
        isLocked: documentNode.isLocked,
        isPublished: documentNode.published,
        isSite: documentNode.isSite,
        metaData: {
            document: documentNode
        },
        permissions: documentNode.permissions ?? [],
        internalKey: `${node.internalKey}-${documentNode.id}`
    };
};
const transformApiDataToNodes = (node, data, maxItemsPerNode)=>{
    const nodes = [];
    const documentData = data.items;
    documentData.forEach((documentNode)=>{
        nodes.push(transformApiDataToNode(documentNode, node));
    });
    const total = data.totalItems ?? maxItemsPerNode;
    return {
        nodes,
        total
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
"./js/src/core/modules/element/editor/shared-tab-manager/tabs/properties/properties-api-slice-enhanced.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  api: () => (api),
  usePropertyDeleteMutation: () => (usePropertyDeleteMutation),
  usePropertyGetCollectionForElementByTypeAndIdQuery: () => (usePropertyGetCollectionForElementByTypeAndIdQuery),
  usePropertyGetCollectionQuery: () => (usePropertyGetCollectionQuery),
  usePropertyUpdateMutation: () => (usePropertyUpdateMutation)
});
/* ESM import */var _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/tags.ts");
/* ESM import */var _properties_api_slice_gen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/element/editor/shared-tab-manager/tabs/properties/properties-api-slice.gen.ts");
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

const api = _properties_api_slice_gen__WEBPACK_IMPORTED_MODULE_1__.api.enhanceEndpoints({
    addTagTypes: [
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.ASSET_DETAIL,
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.DATA_OBJECT_DETAIL,
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.DOCUMENT_DETAIL
    ],
    endpoints: {
        propertyGetCollectionForElementByTypeAndId: {
            providesTags: (result, error, args)=>{
                var _result_items;
                const propertyCollection = [];
                result === null || result === void 0 ? void 0 : (_result_items = result.items) === null || _result_items === void 0 ? void 0 : _result_items.forEach((property)=>{
                    propertyCollection.push(..._Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.PROPERTY_DETAIL(property.key));
                });
                return [
                    ...propertyCollection,
                    ..._Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.ELEMENT_PROPERTIES(args.elementType, args.id)
                ];
            }
        },
        propertyGetCollection: {
            providesTags: (result, error, args)=>{
                var _result_items;
                const propertyCollection = [];
                result === null || result === void 0 ? void 0 : (_result_items = result.items) === null || _result_items === void 0 ? void 0 : _result_items.forEach((property)=>{
                    propertyCollection.push(..._Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.PROPERTY_DETAIL(property.key));
                });
                return [
                    ...propertyCollection,
                    ..._Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.GLOBAL_PROPERTIES()
                ];
            }
        },
        propertyUpdate: {
            invalidatesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.PROPERTY_DETAIL(args.id)
        },
        propertyDelete: {
            invalidatesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.PROPERTY_DETAIL(args.id)
        }
    }
});
const { usePropertyGetCollectionQuery, usePropertyGetCollectionForElementByTypeAndIdQuery, usePropertyUpdateMutation, usePropertyDeleteMutation } = api;

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
"./js/src/core/modules/element/editor/shared-tab-manager/tabs/properties/properties-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  usePropertyCreateMutation: () => (usePropertyCreateMutation),
  usePropertyDeleteMutation: () => (usePropertyDeleteMutation),
  usePropertyGetCollectionForElementByTypeAndIdQuery: () => (usePropertyGetCollectionForElementByTypeAndIdQuery),
  usePropertyGetCollectionQuery: () => (usePropertyGetCollectionQuery),
  usePropertyUpdateMutation: () => (usePropertyUpdateMutation)
});
/* ESM import */var _sdk_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/sdk/api/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Properties"
];
const injectedRtkApi = _sdk_api__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            propertyGetCollection: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/properties`,
                        params: {
                            elementType: queryArg.elementType,
                            filter: queryArg.filter
                        }
                    }),
                providesTags: [
                    "Properties"
                ]
            }),
            propertyCreate: build.mutation({
                query: ()=>({
                        url: `/pimcore-studio/api/property`,
                        method: "POST"
                    }),
                invalidatesTags: [
                    "Properties"
                ]
            }),
            propertyUpdate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/properties/${queryArg.id}`,
                        method: "PUT",
                        body: queryArg.updatePredefinedProperty
                    }),
                invalidatesTags: [
                    "Properties"
                ]
            }),
            propertyDelete: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/properties/${queryArg.id}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Properties"
                ]
            }),
            propertyGetCollectionForElementByTypeAndId: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/properties/${queryArg.elementType}/${queryArg.id}`
                    }),
                providesTags: [
                    "Properties"
                ]
            })
        }),
    overrideExisting: false
});

const { usePropertyGetCollectionQuery, usePropertyCreateMutation, usePropertyUpdateMutation, usePropertyDeleteMutation, usePropertyGetCollectionForElementByTypeAndIdQuery } = injectedRtkApi;

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
"./js/src/core/modules/element/hooks/use-properties-initialization.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  usePropertiesInitialization: () => (usePropertiesInitialization)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _Pimcore_utils_uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/utils/uuid.ts");
/* ESM import */var _Pimcore_modules_element_editor_shared_tab_manager_tabs_properties_properties_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/element/editor/shared-tab-manager/tabs/properties/properties-api-slice-enhanced.ts");
/* ESM import */var _Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/element/hooks/use-element-context.ts");
/* ESM import */var _Pimcore_modules_element_hooks_use_element_draft__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/element/hooks/use-element-draft.ts");
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




const usePropertiesInitialization = (options)=>{
    var _element_changes;
    const { elementType, id } = (0,_Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_3__.useElementContext)();
    const { element, setProperties } = (0,_Pimcore_modules_element_hooks_use_element_draft__WEBPACK_IMPORTED_MODULE_4__.useElementDraft)(id, elementType);
    const { data, isLoading, isFetching } = (0,_Pimcore_modules_element_editor_shared_tab_manager_tabs_properties_properties_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__.usePropertyGetCollectionForElementByTypeAndIdQuery)({
        elementType,
        id
    }, {
        skip: options === null || options === void 0 ? void 0 : options.skip
    });
    const enrichProperties = (apiProperties)=>{
        return apiProperties.map((item)=>({
                ...item,
                rowId: (0,_Pimcore_utils_uuid__WEBPACK_IMPORTED_MODULE_1__.uuid)()
            }));
    };
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        var _element_changes;
        if (data !== undefined && !isFetching && (element === null || element === void 0 ? void 0 : (_element_changes = element.changes) === null || _element_changes === void 0 ? void 0 : _element_changes.properties) === undefined && Array.isArray(data.items)) {
            setProperties(enrichProperties(data.items));
        }
    }, [
        data,
        element === null || element === void 0 ? void 0 : (_element_changes = element.changes) === null || _element_changes === void 0 ? void 0 : _element_changes.properties,
        isFetching
    ]);
    return {
        data,
        isLoading
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
"./js/src/core/modules/document/actions/add-page/use-add-document.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  AddDocumentFormType: () => (AddDocumentFormType),
  useAddDocument: () => (useAddDocument)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _sdk_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/sdk/app/index.ts");
/* ESM import */var _Pimcore_components_element_tree_element_tree_slice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/element-tree/element-tree-slice.ts");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* ESM import */var _Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/element/permissions/permission-helper.ts");
/* ESM import */var _Pimcore_components_element_tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/element-tree/provider/tree-permission-provider/use-tree-permission.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_7__);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_9__);
/* ESM import */var _document_api_slice_gen__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/document/document-api-slice.gen.ts");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_11__);
/* ESM import */var _Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/components/form/form.tsx");
/* ESM import */var _Pimcore_components_input_input__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/components/input/input.tsx");
/* ESM import */var _hooks_use_document_helper__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/modules/document/hooks/use-document-helper.ts");
/* ESM import */var _Pimcore_components_spin_spin__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./js/src/core/components/spin/spin.tsx");
/* ESM import */var _Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("./js/src/core/components/modal/form-modal/hooks/use-form-modal.tsx");
/* ESM import */var _sdk_utils__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("./js/src/sdk/utils/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ /* eslint-disable max-lines */ 
var _s = $RefreshSig$();

















let AddDocumentFormType = /*#__PURE__*/ function(AddDocumentFormType) {
    AddDocumentFormType["FULL"] = "full";
    // title, navigationName, key
    AddDocumentFormType["KEY_ONLY"] = "key-only"; // only key
    return AddDocumentFormType;
}({});
const useAddDocument = (config)=>{
    _s();
    const { type, iconValue, contextMenuKey, formType, modalTitle, hasNoChildren } = config;
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_9__.useTranslation)();
    const { data: documentTypes, isLoading, error } = (0,_document_api_slice_gen__WEBPACK_IMPORTED_MODULE_10__.useDocumentDocTypeListQuery)({});
    const { openDocument } = (0,_hooks_use_document_helper__WEBPACK_IMPORTED_MODULE_14__.useDocumentHelper)();
    const [addDocumentMutation] = (0,_document_api_slice_gen__WEBPACK_IMPORTED_MODULE_10__.useDocumentAddMutation)();
    const dispatch = (0,_sdk_app__WEBPACK_IMPORTED_MODULE_1__.useAppDispatch)();
    const { isTreeActionAllowed } = (0,_Pimcore_components_element_tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_6__.useTreePermission)();
    const { modal } = antd__WEBPACK_IMPORTED_MODULE_11__.App.useApp();
    const formModal = (0,_Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_16__.useFormModal)();
    const [form] = _Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_12__.Form.useForm();
    const firstInputRef = (0,react__WEBPACK_IMPORTED_MODULE_8__.useRef)(null);
    const getDocumentEntries = (node)=>{
        let documentHierarchy = [];
        if (isLoading) {
            return [
                {
                    key: 'add-document-loading',
                    type: 'custom',
                    component: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_spin_spin__WEBPACK_IMPORTED_MODULE_15__.Spin, {
                        type: "classic"
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/actions/add-page/use-add-document.tsx",
                        lineNumber: 72,
                        columnNumber: 20
                    }, undefined)
                }
            ];
        } else if (!(0,lodash__WEBPACK_IMPORTED_MODULE_7__.isUndefined)(error) || (0,lodash__WEBPACK_IMPORTED_MODULE_7__.isNil)(documentTypes) || (0,lodash__WEBPACK_IMPORTED_MODULE_7__.isEmpty)(documentTypes.items)) {
            return documentHierarchy; // Return empty if empty or error occurs
        }
        const structuredDocumentTypes = [
            ...documentTypes.items
        ].filter((docType)=>docType.type === type) // Filter for a certain docType
        .sort((a, b)=>a.name.localeCompare(b.name)).reduce((acc, docType)=>{
            const groupName = (0,lodash__WEBPACK_IMPORTED_MODULE_7__.isNil)(docType.group) || (0,lodash__WEBPACK_IMPORTED_MODULE_7__.isEmpty)(docType.group) ? 'undefined' : docType.group;
            if (acc[groupName] === undefined) {
                acc[groupName] = [];
            }
            acc[groupName].push(docType);
            return acc;
        }, {});
        if (structuredDocumentTypes.undefined !== undefined) {
            documentHierarchy = structuredDocumentTypes.undefined.map((docType)=>getDocumentEntry(docType, node));
        }
        for (const [group, docTypes] of Object.entries(structuredDocumentTypes)){
            if (group !== 'undefined') {
                documentHierarchy.push({
                    label: t(group),
                    key: 'add-document-group-' + type + group,
                    icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__.Icon, {
                        value: 'folder'
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/actions/add-page/use-add-document.tsx",
                        lineNumber: 94,
                        columnNumber: 17
                    }, undefined),
                    children: docTypes.map((docType)=>getDocumentEntry(docType, node))
                });
            }
        }
        // add blank entry
        documentHierarchy.push({
            label: `> ${t('blank')}`,
            key: 'blank' + type,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__.Icon, {
                subIconName: "new",
                subIconVariant: "green",
                value: iconValue
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/actions/add-page/use-add-document.tsx",
                lineNumber: 104,
                columnNumber: 13
            }, undefined),
            onClick: ()=>{
                const parentId = Number.parseInt(node.id);
                createDocument(null, parentId);
            }
        });
        return documentHierarchy;
    };
    const getDocumentEntry = (docType, node)=>{
        return {
            label: t(docType.name),
            key: docType.id,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__.Icon, {
                subIconName: "new",
                subIconVariant: 'green',
                value: iconValue
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/actions/add-page/use-add-document.tsx",
                lineNumber: 116,
                columnNumber: 13
            }, undefined),
            onClick: ()=>{
                const parentId = Number.parseInt(node.id);
                createDocument(docType, parentId);
            }
        };
    };
    // Full form component (3 inputs: title, navigationName, key)
    const FullFormContent = (param)=>{
        let { form, firstInputRef, buttonId } = param;
        const handleEnterPress = ()=>{
            // Click the OK button using the unique ID
            const okButton = document.getElementById(buttonId);
            if (!(0,lodash__WEBPACK_IMPORTED_MODULE_7__.isNull)(okButton) && !okButton.disabled) {
                okButton.click();
            }
        };
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_12__.Form, {
            form: form,
            initialValues: {
                title: '',
                navigationName: '',
                key: ''
            },
            layout: "vertical",
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_12__.Form.Item, {
                    label: t('add-document-form.label.title'),
                    name: "title",
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_input_input__WEBPACK_IMPORTED_MODULE_13__.Input, {
                        onChange: (e)=>{
                            const value = e.target.value;
                            form.setFieldsValue({
                                title: value,
                                navigationName: value,
                                key: value
                            });
                        },
                        onPressEnter: handleEnterPress,
                        ref: firstInputRef
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/actions/add-page/use-add-document.tsx",
                        lineNumber: 143,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/actions/add-page/use-add-document.tsx",
                    lineNumber: 142,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_12__.Form.Item, {
                    label: t('add-document-form.label.navigation'),
                    name: "navigationName",
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_input_input__WEBPACK_IMPORTED_MODULE_13__.Input, {
                        onPressEnter: handleEnterPress
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/actions/add-page/use-add-document.tsx",
                        lineNumber: 153,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/actions/add-page/use-add-document.tsx",
                    lineNumber: 152,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_12__.Form.Item, {
                    label: t('add-document-form.label.key'),
                    name: "key",
                    rules: [
                        {
                            required: true,
                            message: t('form.validation.required')
                        }
                    ],
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_input_input__WEBPACK_IMPORTED_MODULE_13__.Input, {
                        onPressEnter: handleEnterPress
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/actions/add-page/use-add-document.tsx",
                        lineNumber: 159,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/actions/add-page/use-add-document.tsx",
                    lineNumber: 155,
                    columnNumber: 9
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/actions/add-page/use-add-document.tsx",
            lineNumber: 137,
            columnNumber: 12
        }, undefined);
    };
    const createDocument = (docType, parentId)=>{
        if (formType === AddDocumentFormType.KEY_ONLY) {
            // Use formModal.input for key-only forms (like in use-add-object)
            formModal.input({
                title: modalTitle,
                label: t('form.label.new-item'),
                rule: {
                    required: true,
                    message: t('form.validation.required')
                },
                onOk: async (key)=>{
                    await createDocumentMutation((0,lodash__WEBPACK_IMPORTED_MODULE_7__.isNil)(docType) ? null : docType.id, key, key, // Use key as title for key-only forms
                    key, // Use key as navigationName for key-only forms
                    parentId);
                }
            });
        } else {
            // Use existing modal.confirm for full forms
            form.resetFields(); // Always reset before opening
            const submitForm = async ()=>{
                await form.validateFields().then(async ()=>{
                    const values = form.getFieldsValue();
                    const title = values.title;
                    const navigationName = values.navigationName;
                    const key = values.key;
                    await createDocumentMutation((0,lodash__WEBPACK_IMPORTED_MODULE_7__.isNil)(docType) ? null : docType.id, key, title, navigationName, parentId);
                });
            };
            const buttonId = (0,_sdk_utils__WEBPACK_IMPORTED_MODULE_17__.uuid)();
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            modal.confirm({
                icon: null,
                title: modalTitle,
                content: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(FullFormContent, {
                    buttonId: buttonId,
                    firstInputRef: firstInputRef,
                    form: form
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/actions/add-page/use-add-document.tsx",
                    lineNumber: 200,
                    columnNumber: 18
                }, undefined),
                modalRender: (node)=>{
                    if (firstInputRef.current !== null) {
                        firstInputRef.current.focus();
                    }
                    return node;
                },
                okButtonProps: {
                    id: buttonId
                },
                onOk: async ()=>{
                    await submitForm();
                }
            });
        }
    };
    const createDocumentMutation = async (docTypeId, key, title, navigationName, parentId)=>{
        const createDocumentTask = addDocumentMutation({
            parentId,
            documentAddParameters: {
                key,
                type,
                title,
                navigationName,
                docTypeId,
                language: null,
                translationsSourceId: null,
                inheritanceSourceId: null,
                template: null
            }
        });
        try {
            const response = await createDocumentTask;
            if (!(0,lodash__WEBPACK_IMPORTED_MODULE_7__.isUndefined)(response.error)) {
                (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_4__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_4__.ApiError(response.error));
            } else if (!(0,lodash__WEBPACK_IMPORTED_MODULE_7__.isUndefined)(response.data)) {
                const { id } = response.data;
                void openDocument({
                    config: {
                        id
                    }
                });
                dispatch((0,_Pimcore_components_element_tree_element_tree_slice__WEBPACK_IMPORTED_MODULE_2__.refreshNodeChildren)({
                    nodeId: String(parentId),
                    elementType: 'document'
                }));
            }
        } catch  {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_4__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_4__.GeneralError('Error creating document'));
        }
    };
    const isAddDocumentHidden = (node)=>{
        return !isTreeActionAllowed(config.perspectiveTreePermission) || !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_5__.checkElementPermission)(node.permissions, 'create') || (0,lodash__WEBPACK_IMPORTED_MODULE_7__.isEmpty)(getDocumentEntries(node));
    };
    const addDocumentTreeContextMenuItem = (node)=>{
        const baseItem = {
            label: t(`document.tree.context-menu.add-${type}`),
            key: contextMenuKey,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__.Icon, {
                value: iconValue
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/actions/add-page/use-add-document.tsx",
                lineNumber: 260,
                columnNumber: 13
            }, undefined),
            hidden: isAddDocumentHidden(node)
        };
        // If hasNoChildren is true, add onClick instead of children
        if (hasNoChildren === true) {
            return {
                ...baseItem,
                onClick: ()=>{
                    createDocument(null, Number.parseInt(node.id));
                }
            };
        }
        // Default behavior: add children dropdown
        return {
            ...baseItem,
            children: getDocumentEntries(node)
        };
    };
    return {
        addDocumentTreeContextMenuItem
    };
};
_s(useAddDocument, "VcnhBUQzP8ZsReYysqJEMXfBYX0=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_9__.useTranslation,
        _document_api_slice_gen__WEBPACK_IMPORTED_MODULE_10__.useDocumentDocTypeListQuery,
        _hooks_use_document_helper__WEBPACK_IMPORTED_MODULE_14__.useDocumentHelper,
        _document_api_slice_gen__WEBPACK_IMPORTED_MODULE_10__.useDocumentAddMutation,
        _sdk_app__WEBPACK_IMPORTED_MODULE_1__.useAppDispatch,
        _Pimcore_components_element_tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_6__.useTreePermission,
        antd__WEBPACK_IMPORTED_MODULE_11__.App.useApp,
        _Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_16__.useFormModal,
        _Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_12__.Form.useForm
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
/* ESM import */var _Pimcore_components_element_tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/components/element-tree/provider/tree-permission-provider/use-tree-permission.ts");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
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











const useOpenInNewWindow = ()=>{
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_1__.useTranslation)();
    const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const dispatch = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_6__.useAppDispatch)();
    const { isTreeActionAllowed } = (0,_Pimcore_components_element_tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_10__.useTreePermission)();
    const openInNewWindow = async (documentId, onFinish)=>{
        setIsLoading(true);
        const { data, error } = await dispatch(_Pimcore_modules_document_document_api_slice_gen__WEBPACK_IMPORTED_MODULE_7__.api.endpoints.documentGetById.initiate({
            id: documentId
        }));
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_8__.isUndefined)(error)) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_11__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_11__.ApiError(error));
            setIsLoading(false);
        }
        // Use settingsData.url if available, otherwise use fullPath
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_8__.isNil)(data === null || data === void 0 ? void 0 : data.settingsData) && (0,lodash__WEBPACK_IMPORTED_MODULE_8__.has)(data === null || data === void 0 ? void 0 : data.settingsData, 'url') && (0,lodash__WEBPACK_IMPORTED_MODULE_8__.isString)(data === null || data === void 0 ? void 0 : data.settingsData.url)) {
            const url = data.settingsData.url;
            window.open(url);
            onFinish === null || onFinish === void 0 ? void 0 : onFinish();
        } else if (!(0,lodash__WEBPACK_IMPORTED_MODULE_8__.isNil)(data === null || data === void 0 ? void 0 : data.fullPath)) {
            // Open document without preview parameters (just the plain URL)
            window.open(data.fullPath);
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
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/actions/open-in-new-window/use-open-in-new-window.tsx",
                lineNumber: 69,
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
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/actions/open-in-new-window/use-open-in-new-window.tsx",
                lineNumber: 80,
                columnNumber: 13
            }, undefined),
            hidden: isTreeContextMenuEntryHidden(node) || !isTreeActionAllowed(_Pimcore_modules_perspectives_enums_tree_permission__WEBPACK_IMPORTED_MODULE_9__.TreePermission.Open),
            onClick: async ()=>{
                await openInNewWindow(parseInt(node.id));
            }
        };
    };
    const openPreviewInNewWindowContextMenuItem = (document, previewUrl, onFinish)=>{
        return {
            label: t('document.open-preview-in-new-window'),
            key: _Pimcore_modules_element_actions__WEBPACK_IMPORTED_MODULE_5__.ContextMenuActionName.openPreviewInNewWindow,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_2__.Icon, {
                value: 'eye'
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/actions/open-in-new-window/use-open-in-new-window.tsx",
                lineNumber: 91,
                columnNumber: 13
            }, undefined),
            hidden: isContextMenuEntryHidden(document, {
                preview: true
            }),
            onClick: ()=>{
                window.open(previewUrl);
                onFinish === null || onFinish === void 0 ? void 0 : onFinish();
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
        _Pimcore_components_element_tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_10__.useTreePermission
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
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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


const EditorContainerRenderer = (props)=>{
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_app_component_registry_component_registry__WEBPACK_IMPORTED_MODULE_2__.ComponentRenderer, {
        component: _app_component_registry_component_registry__WEBPACK_IMPORTED_MODULE_2__.componentConfig.document.editor.container.name,
        props: props
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/editor-container/editor-container-renderer.tsx",
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
"./js/src/core/modules/document/editor/shared-tab-manager/sidebar-definitions.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SIDEBAR_AREABLOCK_TYPES: () => (SIDEBAR_AREABLOCK_TYPES),
  SIDEBAR_CONTENT_SETTINGS: () => (SIDEBAR_CONTENT_SETTINGS),
  SIDEBAR_DOCUMENT_CONFIGURATION: () => (SIDEBAR_DOCUMENT_CONFIGURATION),
  SIDEBAR_NAVIGATION: () => (SIDEBAR_NAVIGATION)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _sidebar_tabs_content_settings_content_settings_sidebar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/document/editor/sidebar/tabs/content-settings/content-settings-sidebar.tsx");
/* ESM import */var _sidebar_tabs_areablock_types_areablock_types_sidebar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/document/editor/sidebar/tabs/areablock-types/areablock-types-sidebar.tsx");
/* ESM import */var _sidebar_tabs_navigation_navigation_sidebar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/document/editor/sidebar/tabs/navigation/navigation-sidebar.tsx");
/* ESM import */var _sidebar_tabs_document_configuration_document_configuration_sidebar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/document/editor/sidebar/tabs/document-configuration/document-configuration-sidebar.tsx");
/* ESM import */var _sidebar_visibility_areablock_types_visibility__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/document/editor/sidebar/visibility/areablock-types-visibility.ts");
/* ESM import */var _sidebar_visibility_content_settings_visibility__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/document/editor/sidebar/visibility/content-settings-visibility.ts");
/* ESM import */var _sidebar_visibility_navigation_visibility__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/document/editor/sidebar/visibility/navigation-visibility.ts");
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









const SIDEBAR_AREABLOCK_TYPES = {
    key: 'areablock-types',
    icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_2__.Icon, {
        value: "new"
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/sidebar-definitions.tsx",
        lineNumber: 22,
        columnNumber: 9
    }, undefined),
    component: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sidebar_tabs_areablock_types_areablock_types_sidebar__WEBPACK_IMPORTED_MODULE_4__.AreablockTypesSidebar, {}, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/sidebar-definitions.tsx",
        lineNumber: 23,
        columnNumber: 14
    }, undefined),
    tooltip: 'add-areas',
    isVisible: _sidebar_visibility_areablock_types_visibility__WEBPACK_IMPORTED_MODULE_7__.checkAreablockTypesVisibility
};
const SIDEBAR_CONTENT_SETTINGS = {
    key: 'content-settings',
    icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_2__.Icon, {
        value: "content-settings"
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/sidebar-definitions.tsx",
        lineNumber: 29,
        columnNumber: 9
    }, undefined),
    component: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sidebar_tabs_content_settings_content_settings_sidebar__WEBPACK_IMPORTED_MODULE_3__.ContentSettingsSidebar, {}, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/sidebar-definitions.tsx",
        lineNumber: 30,
        columnNumber: 14
    }, undefined),
    tooltip: 'content-settings',
    isVisible: _sidebar_visibility_content_settings_visibility__WEBPACK_IMPORTED_MODULE_8__.checkSettingsVisibility
};
const SIDEBAR_NAVIGATION = {
    key: 'navigation',
    icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_2__.Icon, {
        value: "navigation"
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/sidebar-definitions.tsx",
        lineNumber: 36,
        columnNumber: 9
    }, undefined),
    component: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sidebar_tabs_navigation_navigation_sidebar__WEBPACK_IMPORTED_MODULE_5__.NavigationSidebar, {}, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/sidebar-definitions.tsx",
        lineNumber: 37,
        columnNumber: 14
    }, undefined),
    tooltip: 'navigation.sidebar-title',
    isVisible: _sidebar_visibility_navigation_visibility__WEBPACK_IMPORTED_MODULE_9__.checkNavigationVisibility
};
const SIDEBAR_DOCUMENT_CONFIGURATION = {
    key: 'document-configuration',
    icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_2__.Icon, {
        value: "document-configurations"
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/sidebar-definitions.tsx",
        lineNumber: 43,
        columnNumber: 9
    }, undefined),
    component: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sidebar_tabs_document_configuration_document_configuration_sidebar__WEBPACK_IMPORTED_MODULE_6__.DocumentConfigurationSidebar, {}, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/sidebar-definitions.tsx",
        lineNumber: 44,
        columnNumber: 14
    }, undefined),
    tooltip: 'document-configuration.sidebar-title',
    isVisible: _sidebar_visibility_content_settings_visibility__WEBPACK_IMPORTED_MODULE_8__.checkSettingsVisibility
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








const TAB_EDIT = {
    key: 'edit',
    label: 'edit.label',
    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_tabs_edit_edit_container__WEBPACK_IMPORTED_MODULE_3__.EditContainer, {}, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tab-definitions.tsx",
        lineNumber: 22,
        columnNumber: 13
    }, undefined),
    icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_2__.Icon, {
        value: 'edit-pen'
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tab-definitions.tsx",
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
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tab-definitions.tsx",
        lineNumber: 32,
        columnNumber: 13
    }, undefined),
    icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_2__.Icon, {
        value: 'history'
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tab-definitions.tsx",
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
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tab-definitions.tsx",
        lineNumber: 42,
        columnNumber: 13
    }, undefined),
    icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_2__.Icon, {
        value: 'preview'
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tab-definitions.tsx",
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
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/components/draft-alert/draft-alert.tsx",
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
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/components/draft-alert/draft-alert.tsx",
                lineNumber: 48,
                columnNumber: 47
            }, void 0),
            message: t(draftData.isAutoSave ? 'draft-alert-auto-save' : 'draft-alert'),
            showIcon: true,
            type: "info"
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/components/draft-alert/draft-alert.tsx",
            lineNumber: 48,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/components/draft-alert/draft-alert.tsx",
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
/* ESM import */var _Pimcore_modules_document_hooks_use_document_url_processor__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/document/hooks/use-document-url-processor.ts");
/* ESM import */var _Pimcore_components_sidebar_sidebar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/components/sidebar/sidebar.tsx");
/* ESM import */var _Pimcore_components_content_layout_content_layout__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/components/content-layout/content-layout.tsx");
/* ESM import */var _sidebar_sidebar_manager_helper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/document/editor/sidebar/sidebar-manager-helper.ts");
/* ESM import */var _hooks_use_document_editor_sidebar_entries__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/hooks/use-document-editor-sidebar-entries.ts");
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _Pimcore_modules_document_document_editor_slice__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/modules/document/document-editor-slice.ts");
/* ESM import */var _components_draft_alert_draft_alert__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/components/draft-alert/draft-alert.tsx");
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
    const baseParameters = (0,react__WEBPACK_IMPORTED_MODULE_3__.useMemo)(()=>({
            pimcore_editmode: 'true',
            pimcore_studio: 'true',
            documentId: id.toString()
        }), [
        id
    ]);
    const iframeSrc = (0,_Pimcore_modules_document_hooks_use_document_url_processor__WEBPACK_IMPORTED_MODULE_8__.useDocumentUrlProcessor)(id, 'edit', (documentDraft === null || documentDraft === void 0 ? void 0 : documentDraft.fullPath) ?? '', baseParameters);
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
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/edit-container.tsx",
            lineNumber: 75,
            columnNumber: 68
        }, void 0) : undefined,
        renderTopBar: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_draft_alert_draft_alert__WEBPACK_IMPORTED_MODULE_15__.DraftAlert, {}, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/edit-container.tsx",
            lineNumber: 75,
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
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/edit-container.tsx",
            lineNumber: 76,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/edit-container.tsx",
        lineNumber: 75,
        columnNumber: 10
    }, undefined);
};
_s(EditContainer, "Lvnzx8Wv1NTmkYmOS2NgxsxDubI=", false, function() {
    return [
        _Pimcore_modules_document_hooks_use_document_draft__WEBPACK_IMPORTED_MODULE_2__.useDocumentDraft,
        react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation,
        _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_13__.useAppDispatch,
        _hooks_use_document_editor_sidebar_entries__WEBPACK_IMPORTED_MODULE_12__.useDocumentEditorSidebarEntries,
        _Pimcore_modules_document_hooks_use_document_url_processor__WEBPACK_IMPORTED_MODULE_8__.useDocumentUrlProcessor
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
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _Pimcore_modules_document_hooks_use_document_draft__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/document/hooks/use-document-draft.ts");
/* ESM import */var _Pimcore_modules_document_hooks_use_document_url_processor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/document/hooks/use-document-url-processor.ts");
/* ESM import */var _Pimcore_utils_hooks_use_element_visible__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/utils/hooks/use-element-visible.ts");
/* ESM import */var _Pimcore_utils_hooks_use_element_resize__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/utils/hooks/use-element-resize.ts");
/* ESM import */var _Pimcore_components_iframe_iframe__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/iframe/iframe.tsx");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_9__);
/* ESM import */var _Pimcore_components_content_layout_content_layout__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/components/content-layout/content-layout.tsx");
/* ESM import */var _Pimcore_components_toolbar_toolbar__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/components/toolbar/toolbar.tsx");
/* ESM import */var _Pimcore_components_icon_text_button_icon_text_button__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/components/icon-text-button/icon-text-button.tsx");
/* ESM import */var _Pimcore_components_compact_compact__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/components/compact/compact.tsx");
/* ESM import */var _Pimcore_components_date_picker_date_picker__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/components/date-picker/date-picker.tsx");
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var _Pimcore_modules_document_document_editor_slice__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("./js/src/core/modules/document/document-editor-slice.ts");
/* ESM import */var _Pimcore_components_modal_alert_modal_hooks_use_alert_modal__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("./js/src/core/components/modal/alert-modal/hooks/use-alert-modal.tsx");
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

















const DocumentPreview = (param)=>{
    let { id } = param;
    var _iframeRef_current, _document_draftData;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)();
    const [refreshKey, setRefreshKey] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(Date.now());
    const { document } = (0,_Pimcore_modules_document_hooks_use_document_draft__WEBPACK_IMPORTED_MODULE_4__.useDocumentDraft)(id);
    const iframeRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const containerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const { width: availableWidth, height: availableHeight } = (0,_Pimcore_utils_hooks_use_element_resize__WEBPACK_IMPORTED_MODULE_7__["default"])(containerRef);
    const isVisible = (0,_Pimcore_utils_hooks_use_element_visible__WEBPACK_IMPORTED_MODULE_6__["default"])((_iframeRef_current = iframeRef.current) === null || _iframeRef_current === void 0 ? void 0 : _iframeRef_current.getElementRef(), true);
    const alertModal = (0,_Pimcore_components_modal_alert_modal_hooks_use_alert_modal__WEBPACK_IMPORTED_MODULE_17__.useAlertModal)();
    const [mode, setMode] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        device: 'desktop'
    });
    const [previewTimestamp, setPreviewTimestamp] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    const isTimeSliderVisible = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_3__.useAppSelector)((state)=>(0,_Pimcore_modules_document_document_editor_slice__WEBPACK_IMPORTED_MODULE_16__.selectDocumentTimeSliderVisible)(state, id));
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (isVisible) {
            setRefreshKey(Date.now());
        }
    }, [
        document === null || document === void 0 ? void 0 : (_document_draftData = document.draftData) === null || _document_draftData === void 0 ? void 0 : _document_draftData.modificationDate,
        isVisible
    ]);
    const handleSetMode = (newMode)=>{
        if (newMode.width != null && availableWidth > 0 && availableWidth - 10 < newMode.width) {
            alertModal.error({
                content: t('preview.screen_size_too_small')
            });
            return;
        }
        const updatedMode = {
            ...newMode
        };
        if (updatedMode.height != null && availableHeight > 0 && availableHeight - 10 < updatedMode.height) {
            updatedMode.height = availableHeight - 10;
        }
        setMode(updatedMode);
    };
    const forceDeviceType = mode.device === 'phone-horizontal' ? 'phone' : mode.device;
    const previewUrl = (0,_Pimcore_modules_document_hooks_use_document_url_processor__WEBPACK_IMPORTED_MODULE_5__.useDocumentPreviewUrlProcessor)(id, (document === null || document === void 0 ? void 0 : document.fullPath) ?? '', refreshKey, forceDeviceType, previewTimestamp);
    if (previewUrl === '' || (0,lodash__WEBPACK_IMPORTED_MODULE_9__.isNil)(document)) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
            children: t('preview.label')
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/preview/document-preview.tsx",
            lineNumber: 74,
            columnNumber: 12
        }, undefined);
    }
    const iframeStyle = mode.device === 'desktop' ? {
        width: '100%',
        height: '100%',
        border: 'none'
    } : {
        width: mode.width,
        height: mode.height,
        border: '1px solid #eae8ed',
        margin: 'auto',
        position: 'relative'
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_layout_content_layout__WEBPACK_IMPORTED_MODULE_10__.ContentLayout, {
        renderToolbar: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_toolbar_toolbar__WEBPACK_IMPORTED_MODULE_11__.Toolbar, {
            justify: "start",
            theme: "secondary",
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_15__.Flex, {
                gap: "small",
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_compact_compact__WEBPACK_IMPORTED_MODULE_13__.Compact, {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_text_button_icon_text_button__WEBPACK_IMPORTED_MODULE_12__.IconTextButton, {
                                icon: {
                                    value: 'monitor'
                                },
                                onClick: ()=>{
                                    handleSetMode({
                                        device: 'desktop'
                                    });
                                },
                                children: t('preview.desktop')
                            }, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/preview/document-preview.tsx",
                                lineNumber: 90,
                                columnNumber: 15
                            }, void 0),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_text_button_icon_text_button__WEBPACK_IMPORTED_MODULE_12__.IconTextButton, {
                                icon: {
                                    value: 'tablet'
                                },
                                onClick: ()=>{
                                    handleSetMode({
                                        device: 'tablet',
                                        width: 1024,
                                        height: 768
                                    });
                                },
                                children: t('preview.tablet')
                            }, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/preview/document-preview.tsx",
                                lineNumber: 99,
                                columnNumber: 15
                            }, void 0),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_text_button_icon_text_button__WEBPACK_IMPORTED_MODULE_12__.IconTextButton, {
                                icon: {
                                    value: 'phone'
                                },
                                onClick: ()=>{
                                    handleSetMode({
                                        device: 'phone',
                                        width: 375,
                                        height: 667
                                    });
                                },
                                children: t('preview.phone-vertical')
                            }, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/preview/document-preview.tsx",
                                lineNumber: 110,
                                columnNumber: 15
                            }, void 0),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_text_button_icon_text_button__WEBPACK_IMPORTED_MODULE_12__.IconTextButton, {
                                icon: {
                                    value: 'phone-horizontal'
                                },
                                onClick: ()=>{
                                    handleSetMode({
                                        device: 'phone-horizontal',
                                        width: 667,
                                        height: 375
                                    });
                                },
                                children: t('preview.phone-horizontal')
                            }, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/preview/document-preview.tsx",
                                lineNumber: 121,
                                columnNumber: 15
                            }, void 0)
                        ]
                    }, void 0, true, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/preview/document-preview.tsx",
                        lineNumber: 89,
                        columnNumber: 13
                    }, void 0),
                    isTimeSliderVisible && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_date_picker_date_picker__WEBPACK_IMPORTED_MODULE_14__.DatePicker, {
                        onChange: (value)=>{
                            if (typeof value === 'string') {
                                setPreviewTimestamp(Math.floor(new Date(value).getTime() / 1000));
                            } else {
                                setPreviewTimestamp(undefined);
                            }
                        },
                        outputFormat: "YYYY-MM-DD HH:mm",
                        outputType: "dateString",
                        placeholder: t('preview.select_date_time'),
                        showSuffixIcon: true,
                        showTime: true,
                        value: previewTimestamp
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/preview/document-preview.tsx",
                        lineNumber: 133,
                        columnNumber: 37
                    }, void 0)
                ]
            }, void 0, true, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/preview/document-preview.tsx",
                lineNumber: 88,
                columnNumber: 11
            }, void 0)
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/preview/document-preview.tsx",
            lineNumber: 87,
            columnNumber: 40
        }, void 0),
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
            ref: containerRef,
            style: {
                width: '100%',
                height: '100%',
                display: 'flex',
                overflow: 'auto'
            },
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_iframe_iframe__WEBPACK_IMPORTED_MODULE_8__.Iframe, {
                ref: iframeRef,
                src: previewUrl,
                style: iframeStyle,
                title: `${t('preview.label')}-${id}`
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/preview/document-preview.tsx",
                lineNumber: 148,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/preview/document-preview.tsx",
            lineNumber: 142,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/preview/document-preview.tsx",
        lineNumber: 87,
        columnNumber: 10
    }, undefined);
};
_s(DocumentPreview, "2n6jd7JX3ztCpBRbr2bQ2X1Wgis=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation,
        _Pimcore_modules_document_hooks_use_document_draft__WEBPACK_IMPORTED_MODULE_4__.useDocumentDraft,
        _Pimcore_utils_hooks_use_element_resize__WEBPACK_IMPORTED_MODULE_7__["default"],
        _Pimcore_utils_hooks_use_element_visible__WEBPACK_IMPORTED_MODULE_6__["default"],
        _Pimcore_components_modal_alert_modal_hooks_use_alert_modal__WEBPACK_IMPORTED_MODULE_17__.useAlertModal,
        _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_3__.useAppSelector,
        _Pimcore_modules_document_hooks_use_document_url_processor__WEBPACK_IMPORTED_MODULE_5__.useDocumentPreviewUrlProcessor
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
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/preview/preview-view.tsx",
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
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/preview/preview-view.tsx",
            lineNumber: 39,
            columnNumber: 68
        }, void 0) : undefined,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_document_preview__WEBPACK_IMPORTED_MODULE_3__.DocumentPreview, {
            id: id
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/preview/preview-view.tsx",
            lineNumber: 40,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/preview/preview-view.tsx",
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
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/versions/comparison-view/comparison-view.tsx",
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
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/versions/components/document-versions-view/document-versions-view.tsx",
                            lineNumber: 45,
                            columnNumber: 13
                        }, undefined)
                    }, `${index}-${versionId}`, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/versions/components/document-versions-view/document-versions-view.tsx",
                        lineNumber: 44,
                        columnNumber: 51
                    }, undefined))
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/versions/components/document-versions-view/document-versions-view.tsx",
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
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/versions/components/document-versions-view/document-versions-view.tsx",
                    lineNumber: 49,
                    columnNumber: 33
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/versions/components/document-versions-view/document-versions-view.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/versions/components/document-versions-view/document-versions-view.tsx",
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
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/versions/single-view/single-view.tsx",
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
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/versions/single-view/single-view.tsx",
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
"./js/src/core/modules/document/editor/sidebar/tabs/areablock-types/areablock-types-sidebar.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  AreablockTypesSidebar: () => (AreablockTypesSidebar)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_components_sidebar_title__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/sidebar/title/index.ts");
/* ESM import */var _components_areablock_types_list_areablock_types_list__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/document/editor/sidebar/tabs/areablock-types/components/areablock-types-list/areablock-types-list.tsx");
/* ESM import */var _sdk_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/sdk/components/index.ts");
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





const AreablockTypesSidebar = ()=>{
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_5__.Content, {
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_sidebar_title__WEBPACK_IMPORTED_MODULE_3__.SidebarTitle, {
                withBorder: true,
                children: t('add-areas')
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/areablock-types/areablock-types-sidebar.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_areablock_types_list_areablock_types_list__WEBPACK_IMPORTED_MODULE_4__.AreablockTypesList, {}, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/areablock-types/areablock-types-sidebar.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/areablock-types/areablock-types-sidebar.tsx",
        lineNumber: 20,
        columnNumber: 10
    }, undefined);
};
_s(AreablockTypesSidebar, "vu2xTFBfHkv41zWfADiErp1aWcA=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation
    ];
});
_c = AreablockTypesSidebar;
var _c;
$RefreshReg$(_c, "AreablockTypesSidebar");

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
"./js/src/core/modules/document/editor/sidebar/tabs/areablock-types/components/areablock-types-list/areablock-types-list.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  AreablockTypesList: () => (AreablockTypesList)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_modules_document_document_provider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/document/document-provider.tsx");
/* ESM import */var _Pimcore_modules_document_document_editor_slice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/document/document-editor-slice.ts");
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/box/box.tsx");
/* ESM import */var _Pimcore_components_panel_panel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/panel/panel.tsx");
/* ESM import */var _areablock_types_list_styles__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/document/editor/sidebar/tabs/areablock-types/components/areablock-types-list/areablock-types-list.styles.ts");
/* ESM import */var _draggable_areablock_type_draggable_areablock_type__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/document/editor/sidebar/tabs/areablock-types/components/draggable-areablock-type/draggable-areablock-type.tsx");
/* ESM import */var _Pimcore_modules_element_dynamic_types_definitions_document_editable_types_dynamic_type_document_editable_areablock__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/document/editable/types/dynamic-type-document-editable-areablock.tsx");
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










const AreablockTypesList = ()=>{
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)();
    const { id: documentId } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_Pimcore_modules_document_document_provider__WEBPACK_IMPORTED_MODULE_3__.DocumentContext);
    const { styles } = (0,_areablock_types_list_styles__WEBPACK_IMPORTED_MODULE_8__.useStyles)();
    const areablockGroupedTypes = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_5__.useAppSelector)((state)=>(0,_Pimcore_modules_document_document_editor_slice__WEBPACK_IMPORTED_MODULE_4__.selectDocumentAreablockGroupedTypes)(state, documentId));
    const groupEntries = Object.entries(areablockGroupedTypes);
    // If only one group and it's the default group, render items directly without grouping
    if (groupEntries.length === 1 && groupEntries[0][0] === _Pimcore_modules_element_dynamic_types_definitions_document_editable_types_dynamic_type_document_editable_areablock__WEBPACK_IMPORTED_MODULE_10__.DEFAULT_AREABLOCK_GROUP) {
        const [, types] = groupEntries[0];
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_6__.Box, {
            className: styles.gridContainer,
            padding: {
                x: 'extra-small',
                bottom: 'small'
            },
            children: types.map((type, typeIndex)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_draggable_areablock_type_draggable_areablock_type__WEBPACK_IMPORTED_MODULE_9__.DraggableAreablockType, {
                    globalIndex: typeIndex,
                    type: type
                }, `${type.areablockName}-${type.type}`, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/areablock-types/components/areablock-types-list/areablock-types-list.tsx",
                    lineNumber: 41,
                    columnNumber: 41
                }, undefined))
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/areablock-types/components/areablock-types-list/areablock-types-list.tsx",
            lineNumber: 37,
            columnNumber: 12
        }, undefined);
    }
    // Multiple groups - use collapsible panels
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_6__.Box, {
        className: styles.collapsibleContainer,
        children: groupEntries.map((param, groupIndex)=>{
            let [groupName, types] = param;
            let startIndex = 0;
            const entriesBeforeThis = groupEntries.slice(0, groupIndex);
            entriesBeforeThis.forEach((param)=>{
                let [, prevTypes] = param;
                startIndex += prevTypes.length;
            });
            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_panel_panel__WEBPACK_IMPORTED_MODULE_7__.Panel, {
                border: false,
                collapsed: false,
                collapsible: true,
                contentPadding: "extra-small",
                theme: "card-with-highlight",
                title: t(groupName),
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_6__.Box, {
                    className: styles.gridContainer,
                    children: types.map((type, typeIndex)=>{
                        const globalIndex = startIndex + typeIndex;
                        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_draggable_areablock_type_draggable_areablock_type__WEBPACK_IMPORTED_MODULE_9__.DraggableAreablockType, {
                            globalIndex: globalIndex,
                            type: type
                        }, `${type.areablockName}-${type.type}`, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/areablock-types/components/areablock-types-list/areablock-types-list.tsx",
                            lineNumber: 57,
                            columnNumber: 20
                        }, undefined);
                    })
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/areablock-types/components/areablock-types-list/areablock-types-list.tsx",
                    lineNumber: 54,
                    columnNumber: 13
                }, undefined)
            }, groupName, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/areablock-types/components/areablock-types-list/areablock-types-list.tsx",
                lineNumber: 53,
                columnNumber: 14
            }, undefined);
        })
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/areablock-types/components/areablock-types-list/areablock-types-list.tsx",
        lineNumber: 46,
        columnNumber: 10
    }, undefined);
};
_s(AreablockTypesList, "PJYpFEKGDo3jdWpboqsRz7xXGW0=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation,
        _areablock_types_list_styles__WEBPACK_IMPORTED_MODULE_8__.useStyles,
        _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_5__.useAppSelector
    ];
});
_c = AreablockTypesList;
var _c;
$RefreshReg$(_c, "AreablockTypesList");

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
"./js/src/core/modules/document/editor/sidebar/tabs/areablock-types/components/draggable-areablock-type/draggable-areablock-type.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DraggableAreablockType: () => (DraggableAreablockType)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_components_drag_and_drop_draggable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/drag-and-drop/draggable.tsx");
/* ESM import */var _Pimcore_components_grid_button_grid_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/grid-button/grid-button.tsx");
/* ESM import */var _utils_icon_fallback__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/document/editor/sidebar/tabs/areablock-types/utils/icon-fallback.ts");
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





const DraggableAreablockType = (param)=>{
    let { type, globalIndex } = param;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)();
    const iconConfig = (0,_utils_icon_fallback__WEBPACK_IMPORTED_MODULE_5__.getAreablockTypeIcon)(type.icon, globalIndex);
    const dragInfo = {
        type: 'areablock-type',
        icon: iconConfig,
        title: t(type.name),
        data: {
            areablockType: type.type,
            sourceType: 'sidebar'
        }
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_drag_and_drop_draggable__WEBPACK_IMPORTED_MODULE_3__.Draggable, {
        info: dragInfo,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_grid_button_grid_button__WEBPACK_IMPORTED_MODULE_4__.GridButton, {
            icon: iconConfig,
            label: t(type.name)
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/areablock-types/components/draggable-areablock-type/draggable-areablock-type.tsx",
            lineNumber: 34,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/areablock-types/components/draggable-areablock-type/draggable-areablock-type.tsx",
        lineNumber: 33,
        columnNumber: 10
    }, undefined);
};
_s(DraggableAreablockType, "vu2xTFBfHkv41zWfADiErp1aWcA=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation
    ];
});
_c = DraggableAreablockType;
var _c;
$RefreshReg$(_c, "DraggableAreablockType");

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
"./js/src/core/modules/document/editor/sidebar/tabs/content-settings/content-settings-form.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ContentSettingsForm: () => (ContentSettingsForm)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_components_form_form_kit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/form/form-kit.tsx");
/* ESM import */var _Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/form/form.tsx");
/* ESM import */var _Pimcore_components_input_input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/input/input.tsx");
/* ESM import */var _Pimcore_components_textarea_textarea__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/textarea/textarea.tsx");
/* ESM import */var _Pimcore_components_select_select__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/select/select.tsx");
/* ESM import */var _Pimcore_components_sidebar_headline_sidebar_headline__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/sidebar-headline/sidebar-headline.tsx");
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var _Pimcore_components_flag_icon_flag_icon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/components/flag-icon/flag-icon.tsx");
/* ESM import */var _Pimcore_modules_app_settings_hooks_use_settings__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/app/settings/hooks/use-settings.ts");
/* ESM import */var _Pimcore_modules_translations_hooks_use_language_lookup__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/translations/hooks/use-language-lookup.ts");
/* ESM import */var _Pimcore_modules_document_hooks_use_document_draft__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/modules/document/hooks/use-document-draft.ts");
/* ESM import */var _Pimcore_modules_document_actions_save_use_save__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/modules/document/actions/save/use-save.tsx");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_15__);
/* ESM import */var _Pimcore_components_form_hooks_use_debounced_form_change__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("./js/src/core/components/form/hooks/use-debounced-form-change.ts");
/* ESM import */var _Pimcore_utils_uuid__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("./js/src/core/utils/uuid.ts");
/* ESM import */var _Pimcore_modules_document_utils_document_debounce_tag__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("./js/src/core/modules/document/utils/document-debounce-tag.ts");
/* ESM import */var _Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__("./js/src/core/components/modal/form-modal/hooks/use-form-modal.tsx");
/* ESM import */var _Pimcore_modules_document_document_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__("./js/src/core/modules/document/document-api-slice-enhanced.ts");
/* ESM import */var _Pimcore_modules_element_actions_refresh_element_use_element_refresh__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__("./js/src/core/modules/element/actions/refresh-element/use-element-refresh.tsx");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* ESM import */var _Pimcore_components_many_to_one_relation__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__("./js/src/core/components/many-to-one-relation/index.ts");
/* ESM import */var _sdk_components__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__("./js/src/sdk/components/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ /* eslint-disable max-lines */ 
var _s = $RefreshSig$();
























const ContentSettingsForm = (param)=>{
    let { documentId, initialValues, hasPropertiesPermission = true, hasSavePermission = true, allowedContentMainDocumentTypes, enableTitleDescription, enablePrettyUrl } = param;
    var _settings_validLanguages, _initialValues_title, _initialValues_description, _document_settingsData;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)();
    const settings = (0,_Pimcore_modules_app_settings_hooks_use_settings__WEBPACK_IMPORTED_MODULE_11__.useSettings)();
    const { getDisplayName } = (0,_Pimcore_modules_translations_hooks_use_language_lookup__WEBPACK_IMPORTED_MODULE_12__.useLanguageLookup)();
    const { document, updateSettingsData, updateProperty, addProperty, properties } = (0,_Pimcore_modules_document_hooks_use_document_draft__WEBPACK_IMPORTED_MODULE_13__.useDocumentDraft)(documentId);
    const { debouncedAutoSave } = (0,_Pimcore_modules_document_actions_save_use_save__WEBPACK_IMPORTED_MODULE_14__.useSave)();
    const modal = (0,_Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_19__.useFormModal)();
    const [changeMainDocument, { isLoading: isApplyingMainDocument, error: applyingMainDocumentError }] = (0,_Pimcore_modules_document_document_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_20__.useDocumentPageSnippetChangeMainDocumentMutation)();
    const { refreshElement } = (0,_Pimcore_modules_element_actions_refresh_element_use_element_refresh__WEBPACK_IMPORTED_MODULE_21__.useElementRefresh)('document');
    react__WEBPACK_IMPORTED_MODULE_1___default().useEffect(()=>{
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_15__.isUndefined)(applyingMainDocumentError)) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_22__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_22__.ApiError(applyingMainDocumentError));
        }
    }, [
        applyingMainDocumentError
    ]);
    const canEdit = hasSavePermission;
    const titleCountRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const descriptionCountRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const updateCharCount = (countRef, count)=>{
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_15__.isNull)(countRef.current) && !(0,lodash__WEBPACK_IMPORTED_MODULE_15__.isUndefined)(countRef.current)) {
            countRef.current.textContent = `(${count})`;
        }
    };
    const languageProperty = !(0,lodash__WEBPACK_IMPORTED_MODULE_15__.isNull)(properties) && !(0,lodash__WEBPACK_IMPORTED_MODULE_15__.isUndefined)(properties) ? properties.find((prop)=>prop.key === 'language' && !prop.inherited) : undefined;
    const handleFormChange = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((changedValues, allValues)=>{
        if (!canEdit) return;
        const { language, contentMainDocument, ...settingsDataChanges } = changedValues;
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_15__.isUndefined)(language)) {
            if (!(0,lodash__WEBPACK_IMPORTED_MODULE_15__.isUndefined)(languageProperty) && !(0,lodash__WEBPACK_IMPORTED_MODULE_15__.isNull)(languageProperty)) {
                updateProperty('language', {
                    ...languageProperty,
                    data: language,
                    inherited: false
                });
            } else {
                const newLanguageProperty = {
                    key: 'language',
                    type: 'text',
                    data: language,
                    inherited: false,
                    inheritable: true,
                    predefinedName: 'Custom',
                    rowId: (0,_Pimcore_utils_uuid__WEBPACK_IMPORTED_MODULE_17__.uuid)()
                };
                addProperty(newLanguageProperty);
            }
        }
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_15__.isUndefined)(contentMainDocument)) {
            settingsDataChanges.contentMainDocumentId = (contentMainDocument === null || contentMainDocument === void 0 ? void 0 : contentMainDocument.id) ?? null;
            settingsDataChanges.contentMainDocumentPath = (contentMainDocument === null || contentMainDocument === void 0 ? void 0 : contentMainDocument.fullPath) ?? null;
        }
        if (Object.keys(settingsDataChanges).length > 0) {
            updateSettingsData(settingsDataChanges);
        }
        debouncedAutoSave();
    }, [
        updateSettingsData,
        languageProperty,
        updateProperty,
        addProperty,
        debouncedAutoSave,
        canEdit
    ]);
    const { handleFormChange: handleFormChangeDebounced } = (0,_Pimcore_components_form_hooks_use_debounced_form_change__WEBPACK_IMPORTED_MODULE_16__.useDebouncedFormChange)(handleFormChange, {
        delay: 500,
        immediateFields: [
            'language',
            'contentMainDocument'
        ],
        tag: (0,_Pimcore_modules_document_utils_document_debounce_tag__WEBPACK_IMPORTED_MODULE_18__.createDocumentDebounceTag)(documentId)
    });
    const handleApplyMainDocument = ()=>{
        var _document_settingsData;
        const contentMainDocumentPath = document === null || document === void 0 ? void 0 : (_document_settingsData = document.settingsData) === null || _document_settingsData === void 0 ? void 0 : _document_settingsData.contentMainDocumentPath;
        if ((0,lodash__WEBPACK_IMPORTED_MODULE_15__.isNull)(contentMainDocumentPath) || (0,lodash__WEBPACK_IMPORTED_MODULE_15__.isUndefined)(contentMainDocumentPath)) {
            return;
        }
        modal.confirm({
            title: t('content-main-document.apply-warning-title'),
            content: t('content-main-document.apply-warning-message'),
            onOk: async ()=>{
                const { data } = await changeMainDocument({
                    id: documentId,
                    changeMainDocument: {
                        mainDocumentPath: contentMainDocumentPath
                    }
                });
                // Only reload the document if the operation was successful
                if (!(0,lodash__WEBPACK_IMPORTED_MODULE_15__.isUndefined)(data)) {
                    refreshElement(documentId);
                }
            }
        });
    };
    const languageOptions = [
        {
            value: '',
            label: t('none')
        },
        ...((_settings_validLanguages = settings.validLanguages) === null || _settings_validLanguages === void 0 ? void 0 : _settings_validLanguages.map((locale)=>({
                value: locale,
                label: getDisplayName(locale)
            }))) ?? []
    ];
    const renderLanguageOption = (option)=>{
        if (option.value === '' || (0,lodash__WEBPACK_IMPORTED_MODULE_15__.isUndefined)(option.value) || (0,lodash__WEBPACK_IMPORTED_MODULE_15__.isNull)(option.value)) {
            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                children: option.label
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/content-settings/content-settings-form.tsx",
                lineNumber: 161,
                columnNumber: 14
            }, undefined);
        }
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_9__.Flex, {
            align: "center",
            gap: "extra-small",
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flag_icon_flag_icon__WEBPACK_IMPORTED_MODULE_10__.FlagIcon, {
                    value: !(0,lodash__WEBPACK_IMPORTED_MODULE_15__.isUndefined)(option.value) && !(0,lodash__WEBPACK_IMPORTED_MODULE_15__.isNull)(option.value) ? String(option.value) : ''
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/content-settings/content-settings-form.tsx",
                    lineNumber: 164,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                    children: option.label
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/content-settings/content-settings-form.tsx",
                    lineNumber: 165,
                    columnNumber: 9
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/content-settings/content-settings-form.tsx",
            lineNumber: 163,
            columnNumber: 12
        }, undefined);
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form_kit__WEBPACK_IMPORTED_MODULE_3__.FormKit, {
        formProps: {
            initialValues,
            onValuesChange: handleFormChangeDebounced
        },
        children: [
            ((document === null || document === void 0 ? void 0 : document.type) === 'page' || enableTitleDescription === true) && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_4__.Form.Item, {
                        label: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                            children: [
                                t('title'),
                                " ",
                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                                    ref: titleCountRef,
                                    children: [
                                        "(",
                                        ((_initialValues_title = initialValues.title) === null || _initialValues_title === void 0 ? void 0 : _initialValues_title.length) ?? 0,
                                        ")"
                                    ]
                                }, void 0, true, {
                                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/content-settings/content-settings-form.tsx",
                                    lineNumber: 173,
                                    columnNumber: 48
                                }, void 0)
                            ]
                        }, void 0, true, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/content-settings/content-settings-form.tsx",
                            lineNumber: 173,
                            columnNumber: 29
                        }, void 0),
                        name: "title",
                        rules: [
                            {
                                max: 255,
                                message: t('form.validation.max-length', {
                                    max: 255
                                })
                            }
                        ],
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_input_input__WEBPACK_IMPORTED_MODULE_5__.Input, {
                            disabled: !canEdit,
                            onChange: (e)=>{
                                updateCharCount(titleCountRef, e.target.value.length);
                            }
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/content-settings/content-settings-form.tsx",
                            lineNumber: 179,
                            columnNumber: 13
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/content-settings/content-settings-form.tsx",
                        lineNumber: 173,
                        columnNumber: 11
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_4__.Form.Item, {
                        label: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                            children: [
                                t('description'),
                                " ",
                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                                    ref: descriptionCountRef,
                                    children: [
                                        "(",
                                        ((_initialValues_description = initialValues.description) === null || _initialValues_description === void 0 ? void 0 : _initialValues_description.length) ?? 0,
                                        ")"
                                    ]
                                }, void 0, true, {
                                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/content-settings/content-settings-form.tsx",
                                    lineNumber: 184,
                                    columnNumber: 54
                                }, void 0)
                            ]
                        }, void 0, true, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/content-settings/content-settings-form.tsx",
                            lineNumber: 184,
                            columnNumber: 29
                        }, void 0),
                        name: "description",
                        rules: [
                            {
                                max: 350,
                                message: t('form.validation.max-length', {
                                    max: 350
                                })
                            }
                        ],
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_textarea_textarea__WEBPACK_IMPORTED_MODULE_6__.TextArea, {
                            autoSize: {
                                minRows: 3,
                                maxRows: 8
                            },
                            disabled: !canEdit,
                            onChange: (e)=>{
                                updateCharCount(descriptionCountRef, e.target.value.length);
                            }
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/content-settings/content-settings-form.tsx",
                            lineNumber: 190,
                            columnNumber: 13
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/content-settings/content-settings-form.tsx",
                        lineNumber: 184,
                        columnNumber: 11
                    }, undefined)
                ]
            }, void 0, true),
            hasPropertiesPermission && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_4__.Form.Item, {
                label: (document === null || document === void 0 ? void 0 : document.type) === 'page' || enableTitleDescription === true ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_sidebar_headline_sidebar_headline__WEBPACK_IMPORTED_MODULE_8__.SidebarHeadline, {
                    asFormLabel: true,
                    withBorder: true,
                    children: t('language')
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/content-settings/content-settings-form.tsx",
                    lineNumber: 199,
                    columnNumber: 116
                }, void 0) : t('language'),
                name: "language",
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_select_select__WEBPACK_IMPORTED_MODULE_7__.Select, {
                    disabled: !canEdit,
                    labelRender: (option)=>renderLanguageOption(option),
                    optionRender: (option)=>renderLanguageOption(option),
                    options: languageOptions,
                    showSearch: true
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/content-settings/content-settings-form.tsx",
                    lineNumber: 202,
                    columnNumber: 11
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/content-settings/content-settings-form.tsx",
                lineNumber: 199,
                columnNumber: 35
            }, undefined),
            ((document === null || document === void 0 ? void 0 : document.type) === 'page' || enablePrettyUrl === true) && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_4__.Form.Item, {
                extra: t('pretty-url-override-notice'),
                label: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_sidebar_headline_sidebar_headline__WEBPACK_IMPORTED_MODULE_8__.SidebarHeadline, {
                    asFormLabel: true,
                    withBorder: true,
                    children: t('pretty-url')
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/content-settings/content-settings-form.tsx",
                    lineNumber: 205,
                    columnNumber: 125
                }, void 0),
                name: "prettyUrl",
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_input_input__WEBPACK_IMPORTED_MODULE_5__.Input, {
                    disabled: !canEdit
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/content-settings/content-settings-form.tsx",
                    lineNumber: 208,
                    columnNumber: 11
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/content-settings/content-settings-form.tsx",
                lineNumber: 205,
                columnNumber: 67
            }, undefined),
            (!(0,lodash__WEBPACK_IMPORTED_MODULE_15__.isUndefined)(allowedContentMainDocumentTypes) || (document === null || document === void 0 ? void 0 : document.type) === 'page' || (document === null || document === void 0 ? void 0 : document.type) === 'snippet') && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_4__.Form.Item, {
                        label: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_sidebar_headline_sidebar_headline__WEBPACK_IMPORTED_MODULE_8__.SidebarHeadline, {
                            asFormLabel: true,
                            withBorder: true,
                            children: t('content-main-document')
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/content-settings/content-settings-form.tsx",
                            lineNumber: 212,
                            columnNumber: 29
                        }, void 0),
                        name: "contentMainDocument",
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_many_to_one_relation__WEBPACK_IMPORTED_MODULE_23__.ManyToOneRelationInput, {
                            allowElementTagClose: true,
                            allowedDocumentTypes: allowedContentMainDocumentTypes ?? [
                                'page',
                                'snippet'
                            ],
                            disabled: !canEdit,
                            documentsAllowed: true,
                            enableSearch: true
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/content-settings/content-settings-form.tsx",
                            lineNumber: 215,
                            columnNumber: 13
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/content-settings/content-settings-form.tsx",
                        lineNumber: 212,
                        columnNumber: 11
                    }, undefined),
                    !(0,lodash__WEBPACK_IMPORTED_MODULE_15__.isNil)(document === null || document === void 0 ? void 0 : (_document_settingsData = document.settingsData) === null || _document_settingsData === void 0 ? void 0 : _document_settingsData.contentMainDocumentPath) ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_24__.Button, {
                        loading: isApplyingMainDocument,
                        onClick: handleApplyMainDocument,
                        type: "default",
                        children: t('content-main-document.apply')
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/content-settings/content-settings-form.tsx",
                        lineNumber: 218,
                        columnNumber: 70
                    }, undefined) : null
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/content-settings/content-settings-form.tsx",
        lineNumber: 168,
        columnNumber: 10
    }, undefined);
};
_s(ContentSettingsForm, "PFguZqd6M+koFeajRNNTFFxb+XQ=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation,
        _Pimcore_modules_app_settings_hooks_use_settings__WEBPACK_IMPORTED_MODULE_11__.useSettings,
        _Pimcore_modules_translations_hooks_use_language_lookup__WEBPACK_IMPORTED_MODULE_12__.useLanguageLookup,
        _Pimcore_modules_document_hooks_use_document_draft__WEBPACK_IMPORTED_MODULE_13__.useDocumentDraft,
        _Pimcore_modules_document_actions_save_use_save__WEBPACK_IMPORTED_MODULE_14__.useSave,
        _Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_19__.useFormModal,
        _Pimcore_modules_document_document_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_20__.useDocumentPageSnippetChangeMainDocumentMutation,
        _Pimcore_modules_element_actions_refresh_element_use_element_refresh__WEBPACK_IMPORTED_MODULE_21__.useElementRefresh,
        _Pimcore_components_form_hooks_use_debounced_form_change__WEBPACK_IMPORTED_MODULE_16__.useDebouncedFormChange
    ];
});
_c = ContentSettingsForm;
var _c;
$RefreshReg$(_c, "ContentSettingsForm");

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
"./js/src/core/modules/document/editor/sidebar/tabs/content-settings/content-settings-sidebar.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ContentSettingsSidebar: () => (ContentSettingsSidebar)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_components_sidebar_title__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/sidebar/title/index.ts");
/* ESM import */var _sdk_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/sdk/components/index.ts");
/* ESM import */var _Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/box/box.tsx");
/* ESM import */var _Pimcore_modules_document_document_provider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/document/document-provider.tsx");
/* ESM import */var _Pimcore_modules_document_hooks_use_document_draft__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/document/hooks/use-document-draft.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_8__);
/* ESM import */var _Pimcore_modules_element_hooks_use_properties_initialization__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/element/hooks/use-properties-initialization.ts");
/* ESM import */var _visibility_document_permission_helper__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/document/editor/sidebar/visibility/document-permission-helper.ts");
/* ESM import */var _content_settings_form__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/document/editor/sidebar/tabs/content-settings/content-settings-form.tsx");
/* ESM import */var _Pimcore_types_enums_element_element_type__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/types/enums/element/element-type.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ var _this = undefined;

var _s = $RefreshSig$();












const ContentSettingsSidebar = function() {
    let { ...props } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var _propertiesData_items;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)();
    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_Pimcore_modules_document_document_provider__WEBPACK_IMPORTED_MODULE_6__.DocumentContext);
    const { id } = context;
    const { document } = (0,_Pimcore_modules_document_hooks_use_document_draft__WEBPACK_IMPORTED_MODULE_7__.useDocumentDraft)(id);
    const hasPropertiesPermission = (0,_visibility_document_permission_helper__WEBPACK_IMPORTED_MODULE_10__.checkDocumentPermission)(context, 'properties');
    const hasSavePermission = (0,_visibility_document_permission_helper__WEBPACK_IMPORTED_MODULE_10__.checkDocumentPermission)(context, 'save') || (0,_visibility_document_permission_helper__WEBPACK_IMPORTED_MODULE_10__.checkDocumentPermission)(context, 'publish');
    const { data: propertiesData, isLoading: isLoadingProperties } = (0,_Pimcore_modules_element_hooks_use_properties_initialization__WEBPACK_IMPORTED_MODULE_9__.usePropertiesInitialization)({
        skip: !hasPropertiesPermission
    });
    const languageProperty = propertiesData === null || propertiesData === void 0 ? void 0 : (_propertiesData_items = propertiesData.items) === null || _propertiesData_items === void 0 ? void 0 : _propertiesData_items.find((prop)=>prop.key === 'language');
    const currentLanguage = (languageProperty === null || languageProperty === void 0 ? void 0 : languageProperty.data) ?? '';
    // Get initial values from document draft settingsData and properties
    const initialValues = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        const settingsData = (document === null || document === void 0 ? void 0 : document.settingsData) ?? {};
        return {
            title: (settingsData === null || settingsData === void 0 ? void 0 : settingsData.title) ?? '',
            description: (settingsData === null || settingsData === void 0 ? void 0 : settingsData.description) ?? '',
            language: currentLanguage,
            prettyUrl: (settingsData === null || settingsData === void 0 ? void 0 : settingsData.prettyUrl) ?? '',
            contentMainDocument: !(0,lodash__WEBPACK_IMPORTED_MODULE_8__.isNil)(settingsData === null || settingsData === void 0 ? void 0 : settingsData.contentMainDocumentId) ? {
                id: settingsData.contentMainDocumentId,
                type: _Pimcore_types_enums_element_element_type__WEBPACK_IMPORTED_MODULE_12__.elementTypes.document,
                fullPath: settingsData.contentMainDocumentPath ?? ''
            } : null
        };
    }, [
        document === null || document === void 0 ? void 0 : document.settingsData,
        currentLanguage
    ]);
    const isDataReady = hasPropertiesPermission ? !isLoadingProperties && !(0,lodash__WEBPACK_IMPORTED_MODULE_8__.isUndefined)(propertiesData) : true;
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_4__.Content, {
        loading: !isDataReady,
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_sidebar_title__WEBPACK_IMPORTED_MODULE_3__.SidebarTitle, {
                withBorder: true,
                children: t('content-settings')
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/content-settings/content-settings-sidebar.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, _this),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_5__.Box, {
                padding: {
                    x: 'extra-small',
                    bottom: 'small'
                },
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_content_settings_form__WEBPACK_IMPORTED_MODULE_11__.ContentSettingsForm, {
                    ...props,
                    documentId: id,
                    hasPropertiesPermission: hasPropertiesPermission,
                    hasSavePermission: hasSavePermission,
                    initialValues: initialValues
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/content-settings/content-settings-sidebar.tsx",
                    lineNumber: 72,
                    columnNumber: 9
                }, _this)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/content-settings/content-settings-sidebar.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, _this)
        ]
    }, void 0, true, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/content-settings/content-settings-sidebar.tsx",
        lineNumber: 63,
        columnNumber: 10
    }, _this);
};
_s(ContentSettingsSidebar, "G0DbdQwxNclUrMwLWlAgbH/OuT8=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation,
        _Pimcore_modules_document_hooks_use_document_draft__WEBPACK_IMPORTED_MODULE_7__.useDocumentDraft,
        _Pimcore_modules_element_hooks_use_properties_initialization__WEBPACK_IMPORTED_MODULE_9__.usePropertiesInitialization
    ];
});
_c = ContentSettingsSidebar;
var _c;
$RefreshReg$(_c, "ContentSettingsSidebar");

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
"./js/src/core/modules/document/editor/sidebar/tabs/document-configuration/document-configuration-form.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DocumentConfigurationForm: () => (DocumentConfigurationForm)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_components_form_form_kit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/form/form-kit.tsx");
/* ESM import */var _Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/form/form.tsx");
/* ESM import */var _Pimcore_components_select_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/select/select.tsx");
/* ESM import */var _Pimcore_components_switch_switch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/switch/switch.tsx");
/* ESM import */var _Pimcore_components_input_number_input_number__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/input-number/input-number.tsx");
/* ESM import */var _Pimcore_components_sidebar_headline_sidebar_headline__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/sidebar-headline/sidebar-headline.tsx");
/* ESM import */var _Pimcore_modules_document_hooks_use_document_draft__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/document/hooks/use-document-draft.ts");
/* ESM import */var _Pimcore_modules_document_actions_save_use_save__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/document/actions/save/use-save.tsx");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_11__);
/* ESM import */var _Pimcore_components_formatted_date_time_formatted_date_time__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/components/formatted-date-time/formatted-date-time.tsx");
/* ESM import */var _Pimcore_components_form_hooks_use_debounced_form_change__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/components/form/hooks/use-debounced-form-change.ts");
/* ESM import */var _Pimcore_modules_document_utils_document_debounce_tag__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/modules/document/utils/document-debounce-tag.ts");
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














const DocumentConfigurationForm = (param)=>{
    let { documentId, documentType, initialValues, apiData, hasSavePermission = true } = param;
    var _document_settingsData;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)();
    const { updateSettingsData, document } = (0,_Pimcore_modules_document_hooks_use_document_draft__WEBPACK_IMPORTED_MODULE_9__.useDocumentDraft)(documentId);
    const { debouncedAutoSave } = (0,_Pimcore_modules_document_actions_save_use_save__WEBPACK_IMPORTED_MODULE_10__.useSave)();
    const [form] = _Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_4__.Form.useForm();
    const canEdit = hasSavePermission;
    const processedInitialValues = {
        ...initialValues,
        staticGeneratorLifetime: initialValues.staticGeneratorLifetime ?? null
    };
    const { controllers, templates, predefinedDocTypes } = apiData;
    const controllerOptions = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>[
            ...controllers.map((controller)=>({
                    value: controller.name,
                    label: controller.name
                }))
        ], [
        controllers
    ]);
    const templateOptions = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>[
            ...templates.map((template)=>({
                    value: template.path,
                    label: template.path
                }))
        ], [
        templates
    ]);
    const predefinedDocTypeOptions = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>[
            ...predefinedDocTypes.map((docType)=>({
                    value: docType.id,
                    label: docType.name ?? docType.id
                }))
        ], [
        predefinedDocTypes
    ]);
    const handleFormChange = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((changedValues, allValues)=>{
        if (!canEdit) return;
        const settingsUpdates = {};
        if ('predefinedDocumentType' in changedValues && !(0,lodash__WEBPACK_IMPORTED_MODULE_11__.isNil)(changedValues.predefinedDocumentType)) {
            const selectedDocType = predefinedDocTypes.find((docType)=>docType.id === changedValues.predefinedDocumentType);
            if (!(0,lodash__WEBPACK_IMPORTED_MODULE_11__.isNil)(selectedDocType)) {
                form.setFieldsValue({
                    ...allValues,
                    controller: selectedDocType.controller ?? '',
                    template: selectedDocType.template ?? ''
                });
                settingsUpdates.controller = selectedDocType.controller ?? '';
                settingsUpdates.template = selectedDocType.template ?? '';
            }
        }
        Object.entries(changedValues).forEach((param)=>{
            let [key, value] = param;
            if (key !== 'predefinedDocumentType') {
                settingsUpdates[key] = value ?? null;
            }
        });
        if (Object.keys(settingsUpdates).length > 0) {
            updateSettingsData(settingsUpdates);
            debouncedAutoSave();
        }
    }, [
        updateSettingsData,
        debouncedAutoSave,
        predefinedDocTypes,
        form,
        canEdit
    ]);
    const { handleFormChange: handleFormChangeDebounced } = (0,_Pimcore_components_form_hooks_use_debounced_form_change__WEBPACK_IMPORTED_MODULE_13__.useDebouncedFormChange)(handleFormChange, {
        delay: 500,
        immediateFields: [
            'predefinedDocumentType',
            'staticGeneratorEnabled'
        ],
        tag: (0,_Pimcore_modules_document_utils_document_debounce_tag__WEBPACK_IMPORTED_MODULE_14__.createDocumentDebounceTag)(documentId)
    });
    const lastGeneratedInfo = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        var _document_settingsData;
        const lastGenerated = document === null || document === void 0 ? void 0 : (_document_settingsData = document.settingsData) === null || _document_settingsData === void 0 ? void 0 : _document_settingsData.staticLastGenerated;
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
            children: [
                t('document-configuration.last-generated', {
                    timestamp: (0,lodash__WEBPACK_IMPORTED_MODULE_11__.isNil)(lastGenerated) ? t('never') : ''
                }),
                !(0,lodash__WEBPACK_IMPORTED_MODULE_11__.isNil)(lastGenerated) && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_formatted_date_time_formatted_date_time__WEBPACK_IMPORTED_MODULE_12__.FormattedDateTime, {
                    timestamp: lastGenerated
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/document-configuration/document-configuration-form.tsx",
                    lineNumber: 103,
                    columnNumber: 35
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/document-configuration/document-configuration-form.tsx",
            lineNumber: 99,
            columnNumber: 12
        }, undefined);
    }, [
        document === null || document === void 0 ? void 0 : (_document_settingsData = document.settingsData) === null || _document_settingsData === void 0 ? void 0 : _document_settingsData.staticLastGenerated
    ]);
    const showStaticGenerator = documentType === 'page';
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form_kit__WEBPACK_IMPORTED_MODULE_3__.FormKit, {
        formProps: {
            form,
            initialValues: processedInitialValues,
            onValuesChange: handleFormChangeDebounced
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_4__.Form.Item, {
                label: t('document-configuration.predefined-document-type'),
                name: "predefinedDocumentType",
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_select_select__WEBPACK_IMPORTED_MODULE_5__.Select, {
                    allowClear: true,
                    disabled: !canEdit,
                    options: predefinedDocTypeOptions,
                    popupMatchSelectWidth: false,
                    showSearch: true
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/document-configuration/document-configuration-form.tsx",
                    lineNumber: 113,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/document-configuration/document-configuration-form.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_4__.Form.Item, {
                label: t('document-configuration.controller'),
                name: "controller",
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_select_select__WEBPACK_IMPORTED_MODULE_5__.Select, {
                    allowClear: true,
                    disabled: !canEdit,
                    options: controllerOptions,
                    popupMatchSelectWidth: false,
                    showSearch: true
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/document-configuration/document-configuration-form.tsx",
                    lineNumber: 117,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/document-configuration/document-configuration-form.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_4__.Form.Item, {
                label: t('document-configuration.template'),
                name: "template",
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_select_select__WEBPACK_IMPORTED_MODULE_5__.Select, {
                    allowClear: true,
                    disabled: !canEdit,
                    options: templateOptions,
                    popupMatchSelectWidth: false,
                    showSearch: true
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/document-configuration/document-configuration-form.tsx",
                    lineNumber: 121,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/document-configuration/document-configuration-form.tsx",
                lineNumber: 120,
                columnNumber: 7
            }, undefined),
            showStaticGenerator && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_sidebar_headline_sidebar_headline__WEBPACK_IMPORTED_MODULE_8__.SidebarHeadline, {
                        marginBottom: "none",
                        withBorder: true,
                        children: t('document-configuration.static-page-generator')
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/document-configuration/document-configuration-form.tsx",
                        lineNumber: 125,
                        columnNumber: 11
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_4__.Form.Item, {
                        name: "staticGeneratorEnabled",
                        valuePropName: "checked",
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_switch_switch__WEBPACK_IMPORTED_MODULE_6__.Switch, {
                            disabled: !canEdit,
                            labelRight: t('document-configuration.enable-server-side-static-rendering')
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/document-configuration/document-configuration-form.tsx",
                            lineNumber: 130,
                            columnNumber: 13
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/document-configuration/document-configuration-form.tsx",
                        lineNumber: 129,
                        columnNumber: 11
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_4__.Form.Item, {
                        extra: lastGeneratedInfo,
                        label: t('document-configuration.lifetime-for-static-page'),
                        name: "staticGeneratorLifetime",
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_input_number_input_number__WEBPACK_IMPORTED_MODULE_7__.InputNumber, {
                            disabled: !canEdit,
                            min: 1,
                            step: 1
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/document-configuration/document-configuration-form.tsx",
                            lineNumber: 134,
                            columnNumber: 13
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/document-configuration/document-configuration-form.tsx",
                        lineNumber: 133,
                        columnNumber: 11
                    }, undefined)
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/document-configuration/document-configuration-form.tsx",
        lineNumber: 107,
        columnNumber: 10
    }, undefined);
};
_s(DocumentConfigurationForm, "e7C9kpaMMpQO10HpnKxiD+jFXfc=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation,
        _Pimcore_modules_document_hooks_use_document_draft__WEBPACK_IMPORTED_MODULE_9__.useDocumentDraft,
        _Pimcore_modules_document_actions_save_use_save__WEBPACK_IMPORTED_MODULE_10__.useSave,
        _Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_4__.Form.useForm,
        _Pimcore_components_form_hooks_use_debounced_form_change__WEBPACK_IMPORTED_MODULE_13__.useDebouncedFormChange
    ];
});
_c = DocumentConfigurationForm;
var _c;
$RefreshReg$(_c, "DocumentConfigurationForm");

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
"./js/src/core/modules/document/editor/sidebar/tabs/document-configuration/document-configuration-sidebar.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DocumentConfigurationSidebar: () => (DocumentConfigurationSidebar)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_components_sidebar_title__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/sidebar/title/index.ts");
/* ESM import */var _sdk_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/sdk/components/index.ts");
/* ESM import */var _Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/box/box.tsx");
/* ESM import */var _Pimcore_modules_document_document_provider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/document/document-provider.tsx");
/* ESM import */var _Pimcore_modules_document_hooks_use_document_draft__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/document/hooks/use-document-draft.ts");
/* ESM import */var _Pimcore_modules_document_document_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/document/document-api-slice-enhanced.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_9__);
/* ESM import */var _document_configuration_form__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/document/editor/sidebar/tabs/document-configuration/document-configuration-form.tsx");
/* ESM import */var _visibility_document_permission_helper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/document/editor/sidebar/visibility/document-permission-helper.ts");
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











const DocumentConfigurationSidebar = ()=>{
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)();
    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_Pimcore_modules_document_document_provider__WEBPACK_IMPORTED_MODULE_6__.DocumentContext);
    const { id } = context;
    const { document } = (0,_Pimcore_modules_document_hooks_use_document_draft__WEBPACK_IMPORTED_MODULE_7__.useDocumentDraft)(id);
    const hasSavePermission = (0,_visibility_document_permission_helper__WEBPACK_IMPORTED_MODULE_11__.checkDocumentPermission)(context, 'save') || (0,_visibility_document_permission_helper__WEBPACK_IMPORTED_MODULE_11__.checkDocumentPermission)(context, 'publish');
    // Load API data with refetch on mount
    const { data: controllersData, isLoading: isLoadingControllers } = (0,_Pimcore_modules_document_document_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_8__.useDocumentAvailableControllersListQuery)(undefined, {
        refetchOnMountOrArgChange: true
    });
    const { data: templatesData, isLoading: isLoadingTemplates } = (0,_Pimcore_modules_document_document_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_8__.useDocumentAvailableTemplatesListQuery)(undefined, {
        refetchOnMountOrArgChange: true
    });
    const { data: predefinedDocTypesData, isLoading: isLoadingDocTypes } = (0,_Pimcore_modules_document_document_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_8__.useDocumentDocTypeListQuery)({
        type: (document === null || document === void 0 ? void 0 : document.type) ?? 'page'
    }, {
        refetchOnMountOrArgChange: true
    });
    const initialValues = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        const settingsData = (document === null || document === void 0 ? void 0 : document.settingsData) ?? {};
        return {
            predefinedDocumentType: '',
            controller: (settingsData === null || settingsData === void 0 ? void 0 : settingsData.controller) ?? '',
            template: (settingsData === null || settingsData === void 0 ? void 0 : settingsData.template) ?? '',
            staticGeneratorEnabled: (settingsData === null || settingsData === void 0 ? void 0 : settingsData.staticGeneratorEnabled) ?? false,
            staticGeneratorLifetime: (settingsData === null || settingsData === void 0 ? void 0 : settingsData.staticGeneratorLifetime) ?? null
        };
    }, [
        document === null || document === void 0 ? void 0 : document.settingsData
    ]);
    const isDataReady = !(0,lodash__WEBPACK_IMPORTED_MODULE_9__.isUndefined)(document) && !isLoadingControllers && !isLoadingTemplates && !isLoadingDocTypes;
    const apiData = {
        controllers: (controllersData === null || controllersData === void 0 ? void 0 : controllersData.items) ?? [],
        templates: (templatesData === null || templatesData === void 0 ? void 0 : templatesData.items) ?? [],
        predefinedDocTypes: (predefinedDocTypesData === null || predefinedDocTypesData === void 0 ? void 0 : predefinedDocTypesData.items) ?? []
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_4__.Content, {
        loading: !isDataReady,
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_sidebar_title__WEBPACK_IMPORTED_MODULE_3__.SidebarTitle, {
                withBorder: true,
                children: t('document-configuration.sidebar-title')
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/document-configuration/document-configuration-sidebar.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_5__.Box, {
                padding: {
                    x: 'extra-small',
                    bottom: 'small'
                },
                children: isDataReady && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_document_configuration_form__WEBPACK_IMPORTED_MODULE_10__.DocumentConfigurationForm, {
                    apiData: apiData,
                    documentId: id,
                    documentType: document === null || document === void 0 ? void 0 : document.type,
                    hasSavePermission: hasSavePermission,
                    initialValues: initialValues
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/document-configuration/document-configuration-sidebar.tsx",
                    lineNumber: 81,
                    columnNumber: 25
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/document-configuration/document-configuration-sidebar.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/document-configuration/document-configuration-sidebar.tsx",
        lineNumber: 72,
        columnNumber: 10
    }, undefined);
};
_s(DocumentConfigurationSidebar, "4BGPa/jgf81TLeqNffq6164zlFk=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation,
        _Pimcore_modules_document_hooks_use_document_draft__WEBPACK_IMPORTED_MODULE_7__.useDocumentDraft,
        _Pimcore_modules_document_document_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_8__.useDocumentAvailableControllersListQuery,
        _Pimcore_modules_document_document_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_8__.useDocumentAvailableTemplatesListQuery,
        _Pimcore_modules_document_document_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_8__.useDocumentDocTypeListQuery
    ];
});
_c = DocumentConfigurationSidebar;
var _c;
$RefreshReg$(_c, "DocumentConfigurationSidebar");

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
"./js/src/core/modules/document/editor/sidebar/tabs/navigation/navigation-form.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  NavigationForm: () => (NavigationForm)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_components_form_form_kit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/form/form-kit.tsx");
/* ESM import */var _Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/form/form.tsx");
/* ESM import */var _Pimcore_components_input_input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/input/input.tsx");
/* ESM import */var _Pimcore_components_select_select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/select/select.tsx");
/* ESM import */var _Pimcore_components_switch_switch__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/switch/switch.tsx");
/* ESM import */var _Pimcore_components_sidebar_headline_sidebar_headline__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/sidebar-headline/sidebar-headline.tsx");
/* ESM import */var _Pimcore_modules_document_document_provider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/document/document-provider.tsx");
/* ESM import */var _Pimcore_modules_document_hooks_use_document_draft__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/document/hooks/use-document-draft.ts");
/* ESM import */var _Pimcore_modules_document_actions_save_use_save__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/document/actions/save/use-save.tsx");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_12__);
/* ESM import */var _Pimcore_utils_uuid__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/utils/uuid.ts");
/* ESM import */var _Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/modules/element/permissions/permission-helper.ts");
/* ESM import */var _Pimcore_components_form_hooks_use_debounced_form_change__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./js/src/core/components/form/hooks/use-debounced-form-change.ts");
/* ESM import */var _Pimcore_modules_document_utils_document_debounce_tag__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("./js/src/core/modules/document/utils/document-debounce-tag.ts");
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
















const NavigationForm = (param)=>{
    let { initialValues } = param;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)();
    const { id: documentId } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_Pimcore_modules_document_document_provider__WEBPACK_IMPORTED_MODULE_9__.DocumentContext);
    const { properties, updateProperty, addProperty, document } = (0,_Pimcore_modules_document_hooks_use_document_draft__WEBPACK_IMPORTED_MODULE_10__.useDocumentDraft)(documentId);
    const { debouncedAutoSave } = (0,_Pimcore_modules_document_actions_save_use_save__WEBPACK_IMPORTED_MODULE_11__.useSave)();
    const canEdit = (0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_14__.checkElementPermission)(document === null || document === void 0 ? void 0 : document.permissions, 'save') || (0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_14__.checkElementPermission)(document === null || document === void 0 ? void 0 : document.permissions, 'publish');
    const getNavigationProperty = (key)=>{
        return !(0,lodash__WEBPACK_IMPORTED_MODULE_12__.isNull)(properties) && !(0,lodash__WEBPACK_IMPORTED_MODULE_12__.isUndefined)(properties) ? properties.find((prop)=>prop.key === key) : undefined;
    };
    const updateNavigationProperty = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((key, value)=>{
        const existingProperty = getNavigationProperty(key);
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_12__.isUndefined)(existingProperty) && !(0,lodash__WEBPACK_IMPORTED_MODULE_12__.isNull)(existingProperty)) {
            updateProperty(key, {
                ...existingProperty,
                data: value,
                inherited: false,
                inheritable: false
            });
        } else {
            const propertyType = key === 'navigation_exclude' ? 'bool' : 'text';
            const newProperty = {
                key,
                type: propertyType,
                data: value,
                inherited: false,
                inheritable: false,
                predefinedName: 'Custom',
                rowId: (0,_Pimcore_utils_uuid__WEBPACK_IMPORTED_MODULE_13__.uuid)()
            };
            addProperty(newProperty);
        }
        debouncedAutoSave();
    }, [
        getNavigationProperty,
        updateProperty,
        addProperty,
        debouncedAutoSave
    ]);
    const handleFormChange = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((changedValues)=>{
        if (!canEdit) return;
        Object.entries(changedValues).forEach((param)=>{
            let [key, value] = param;
            updateNavigationProperty(key, value);
        });
    }, [
        updateNavigationProperty,
        canEdit
    ]);
    const { handleFormChange: debouncedFormChange } = (0,_Pimcore_components_form_hooks_use_debounced_form_change__WEBPACK_IMPORTED_MODULE_15__.useDebouncedFormChange)(handleFormChange, {
        delay: 500,
        immediateFields: [
            'navigation_exclude',
            'navigation_target'
        ],
        tag: (0,_Pimcore_modules_document_utils_document_debounce_tag__WEBPACK_IMPORTED_MODULE_16__.createDocumentDebounceTag)(documentId)
    });
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form_kit__WEBPACK_IMPORTED_MODULE_3__.FormKit, {
        formProps: {
            initialValues,
            onValuesChange: debouncedFormChange,
            layout: 'vertical'
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_4__.Form.Item, {
                label: t('navigation.name'),
                name: "navigation_name",
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_input_input__WEBPACK_IMPORTED_MODULE_5__.Input, {
                    disabled: !canEdit
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/navigation/navigation-form.tsx",
                    lineNumber: 92,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/navigation/navigation-form.tsx",
                lineNumber: 91,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_4__.Form.Item, {
                label: t('link.title'),
                name: "navigation_title",
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_input_input__WEBPACK_IMPORTED_MODULE_5__.Input, {
                    disabled: !canEdit
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/navigation/navigation-form.tsx",
                    lineNumber: 96,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/navigation/navigation-form.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_4__.Form.Item, {
                label: t('link.target'),
                name: "navigation_target",
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_select_select__WEBPACK_IMPORTED_MODULE_6__.Select, {
                    disabled: !canEdit,
                    options: [
                        {
                            label: t('link.not-set'),
                            value: ''
                        },
                        {
                            label: '_self',
                            value: '_self'
                        },
                        {
                            label: '_blank',
                            value: '_blank'
                        },
                        {
                            label: '_parent',
                            value: '_parent'
                        },
                        {
                            label: '_top',
                            value: '_top'
                        }
                    ]
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/navigation/navigation-form.tsx",
                    lineNumber: 100,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/navigation/navigation-form.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_4__.Form.Item, {
                name: "navigation_exclude",
                valuePropName: "checked",
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_switch_switch__WEBPACK_IMPORTED_MODULE_7__.Switch, {
                    disabled: !canEdit,
                    labelRight: t('navigation.exclude')
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/navigation/navigation-form.tsx",
                    lineNumber: 119,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/navigation/navigation-form.tsx",
                lineNumber: 118,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_4__.Form.Item, {
                label: t('link.rel'),
                name: "navigation_relation",
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_input_input__WEBPACK_IMPORTED_MODULE_5__.Input, {
                    disabled: !canEdit
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/navigation/navigation-form.tsx",
                    lineNumber: 123,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/navigation/navigation-form.tsx",
                lineNumber: 122,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_sidebar_headline_sidebar_headline__WEBPACK_IMPORTED_MODULE_8__.SidebarHeadline, {
                marginBottom: "none",
                withBorder: true,
                children: t('navigation.advanced-settings')
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/navigation/navigation-form.tsx",
                lineNumber: 126,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_4__.Form.Item, {
                label: t('link.class'),
                name: "navigation_class",
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_input_input__WEBPACK_IMPORTED_MODULE_5__.Input, {
                    disabled: !canEdit
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/navigation/navigation-form.tsx",
                    lineNumber: 131,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/navigation/navigation-form.tsx",
                lineNumber: 130,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_4__.Form.Item, {
                label: t('link.anchor'),
                name: "navigation_anchor",
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_input_input__WEBPACK_IMPORTED_MODULE_5__.Input, {
                    disabled: !canEdit
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/navigation/navigation-form.tsx",
                    lineNumber: 135,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/navigation/navigation-form.tsx",
                lineNumber: 134,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_4__.Form.Item, {
                label: t('link.parameters'),
                name: "navigation_parameters",
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_input_input__WEBPACK_IMPORTED_MODULE_5__.Input, {
                    disabled: !canEdit
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/navigation/navigation-form.tsx",
                    lineNumber: 139,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/navigation/navigation-form.tsx",
                lineNumber: 138,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_4__.Form.Item, {
                label: t('link.accesskey'),
                name: "navigation_accesskey",
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_input_input__WEBPACK_IMPORTED_MODULE_5__.Input, {
                    disabled: !canEdit
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/navigation/navigation-form.tsx",
                    lineNumber: 143,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/navigation/navigation-form.tsx",
                lineNumber: 142,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_4__.Form.Item, {
                label: t('link.tabindex'),
                name: "navigation_tabindex",
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_input_input__WEBPACK_IMPORTED_MODULE_5__.Input, {
                    disabled: !canEdit
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/navigation/navigation-form.tsx",
                    lineNumber: 147,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/navigation/navigation-form.tsx",
                lineNumber: 146,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/navigation/navigation-form.tsx",
        lineNumber: 86,
        columnNumber: 10
    }, undefined);
};
_s(NavigationForm, "hn67IHQu9eWCn7xhzFXIb6tm44M=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation,
        _Pimcore_modules_document_hooks_use_document_draft__WEBPACK_IMPORTED_MODULE_10__.useDocumentDraft,
        _Pimcore_modules_document_actions_save_use_save__WEBPACK_IMPORTED_MODULE_11__.useSave,
        _Pimcore_components_form_hooks_use_debounced_form_change__WEBPACK_IMPORTED_MODULE_15__.useDebouncedFormChange
    ];
});
_c = NavigationForm;
var _c;
$RefreshReg$(_c, "NavigationForm");

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
"./js/src/core/modules/document/editor/sidebar/tabs/navigation/navigation-sidebar.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  NavigationSidebar: () => (NavigationSidebar)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_components_sidebar_title__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/sidebar/title/index.ts");
/* ESM import */var _sdk_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/sdk/components/index.ts");
/* ESM import */var _Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/box/box.tsx");
/* ESM import */var _Pimcore_modules_element_hooks_use_properties_initialization__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/element/hooks/use-properties-initialization.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_7__);
/* ESM import */var _navigation_form__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/document/editor/sidebar/tabs/navigation/navigation-form.tsx");
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








const NavigationSidebar = ()=>{
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)();
    const { data: propertiesData, isLoading: isLoadingProperties } = (0,_Pimcore_modules_element_hooks_use_properties_initialization__WEBPACK_IMPORTED_MODULE_6__.usePropertiesInitialization)();
    const initialValues = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        const getPropertyData = (key)=>{
            var _propertiesData_items;
            const property = propertiesData === null || propertiesData === void 0 ? void 0 : (_propertiesData_items = propertiesData.items) === null || _propertiesData_items === void 0 ? void 0 : _propertiesData_items.find((prop)=>prop.key === key);
            return property === null || property === void 0 ? void 0 : property.data;
        };
        return {
            navigation_name: getPropertyData('navigation_name') ?? '',
            navigation_title: getPropertyData('navigation_title') ?? '',
            navigation_target: getPropertyData('navigation_target') ?? '',
            navigation_exclude: getPropertyData('navigation_exclude') ?? false,
            navigation_relation: getPropertyData('navigation_relation') ?? '',
            navigation_class: getPropertyData('navigation_class') ?? '',
            navigation_anchor: getPropertyData('navigation_anchor') ?? '',
            navigation_parameters: getPropertyData('navigation_parameters') ?? '',
            navigation_accesskey: getPropertyData('navigation_accesskey') ?? '',
            navigation_tabindex: getPropertyData('navigation_tabindex') ?? ''
        };
    }, [
        propertiesData === null || propertiesData === void 0 ? void 0 : propertiesData.items
    ]);
    const isDataReady = !isLoadingProperties && !(0,lodash__WEBPACK_IMPORTED_MODULE_7__.isUndefined)(propertiesData);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_4__.Content, {
        loading: !isDataReady,
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_sidebar_title__WEBPACK_IMPORTED_MODULE_3__.SidebarTitle, {
                withBorder: true,
                children: t('navigation.sidebar-title')
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/navigation/navigation-sidebar.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_5__.Box, {
                padding: {
                    x: 'extra-small',
                    bottom: 'small'
                },
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_navigation_form__WEBPACK_IMPORTED_MODULE_8__.NavigationForm, {
                    initialValues: initialValues
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/navigation/navigation-sidebar.tsx",
                    lineNumber: 55,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/navigation/navigation-sidebar.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/sidebar/tabs/navigation/navigation-sidebar.tsx",
        lineNumber: 46,
        columnNumber: 10
    }, undefined);
};
_s(NavigationSidebar, "GQyKt7x4JYGpYNnyB9+N+HookjE=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation,
        _Pimcore_modules_element_hooks_use_properties_initialization__WEBPACK_IMPORTED_MODULE_6__.usePropertiesInitialization
    ];
});
_c = NavigationSidebar;
var _c;
$RefreshReg$(_c, "NavigationSidebar");

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
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/title/title-container.tsx",
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
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/widget.tsx",
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
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/components/version-item/version-item.tsx",
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
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/components/version-item/version-item.tsx",
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
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/components/version-item/version-item.tsx",
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
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/components/version-item/version-item.tsx",
                                lineNumber: 112,
                                columnNumber: 11
                            }, undefined)
                        ]
                    }, void 0, true, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/components/version-item/version-item.tsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/components/version-item/version-item.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, undefined),
            !(0,lodash__WEBPACK_IMPORTED_MODULE_3__.isNil)(scheduledDate) && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                        children: t('version.schedule-for')
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/components/version-item/version-item.tsx",
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
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/components/version-item/version-item.tsx",
                                lineNumber: 120,
                                columnNumber: 13
                            }, undefined),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_text_text__WEBPACK_IMPORTED_MODULE_6__.Text, {
                                className: styles.dateLabel,
                                children: scheduledDate
                            }, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/components/version-item/version-item.tsx",
                                lineNumber: 121,
                                columnNumber: 13
                            }, undefined)
                        ]
                    }, void 0, true, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/components/version-item/version-item.tsx",
                        lineNumber: 119,
                        columnNumber: 11
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/components/version-item/version-item.tsx",
                lineNumber: 117,
                columnNumber: 33
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                        children: t('version.note')
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/components/version-item/version-item.tsx",
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
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/components/version-item/version-item.tsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/components/version-item/version-item.tsx",
                lineNumber: 126,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/components/version-item/version-item.tsx",
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
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/components/versions-container/versions-container.tsx",
            lineNumber: 34,
            columnNumber: 12
        }, undefined);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_editor_shared_tab_manager_tabs_versions_versions_view__WEBPACK_IMPORTED_MODULE_3__.VersionsView, {
        ComparisonViewComponent: ComparisonViewComponent,
        SingleViewComponent: SingleViewComponent,
        versions: data.items
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/components/versions-container/versions-container.tsx",
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
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/helpers/create-version-accordion-item.tsx",
                        lineNumber: 57,
                        columnNumber: 13
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/helpers/create-version-accordion-item.tsx",
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
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/helpers/create-version-accordion-item.tsx",
                    lineNumber: 61,
                    columnNumber: 9
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/helpers/create-version-accordion-item.tsx",
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
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/helpers/create-version-accordion-item.tsx",
                    lineNumber: 74,
                    columnNumber: 9
                }, undefined),
                (0,lodash__WEBPACK_IMPORTED_MODULE_3__.isNil)(version.autosave) && version.autosave && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_6__.Icon, {
                    value: "auto-save"
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/helpers/create-version-accordion-item.tsx",
                    lineNumber: 75,
                    columnNumber: 57
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/helpers/create-version-accordion-item.tsx",
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
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/helpers/create-version-accordion-item.tsx",
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
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/helpers/create-version-accordion-item.tsx",
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
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/helpers/create-version-accordion-item.tsx",
            lineNumber: 97,
            columnNumber: 12
        }, undefined),
        subtitle: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Subtitle, {}, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/helpers/create-version-accordion-item.tsx",
            lineNumber: 98,
            columnNumber: 15
        }, undefined),
        extra: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Extra, {}, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/helpers/create-version-accordion-item.tsx",
            lineNumber: 99,
            columnNumber: 12
        }, undefined),
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_version_item_version_item__WEBPACK_IMPORTED_MODULE_9__.VersionItem, {
            setDetailedVersions: setDetailedVersions,
            version: version
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/helpers/create-version-accordion-item.tsx",
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
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/versions-view.tsx",
                        lineNumber: 82,
                        columnNumber: 11
                    }, void 0),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_5__.Button, {
                        onClick: handleOk,
                        type: 'default',
                        children: t('no')
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/versions-view.tsx",
                        lineNumber: 85,
                        columnNumber: 11
                    }, void 0)
                ]
            }, void 0, true, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/versions-view.tsx",
                lineNumber: 81,
                columnNumber: 50
            }, void 0),
            title: t('version.clear-unpublished-versions'),
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                children: t('version.confirm-clear-unpublished')
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/versions-view.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/versions-view.tsx",
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
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/versions-view.tsx",
                    lineNumber: 102,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_10__.Content, {
                    none: true,
                    noneOptions: {
                        text: t('version.no-versions-to-show')
                    }
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/versions-view.tsx",
                    lineNumber: 103,
                    columnNumber: 9
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/versions-view.tsx",
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
                                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/versions-view.tsx",
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
                                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/versions-view.tsx",
                                                lineNumber: 122,
                                                columnNumber: 23
                                            }, void 0)
                                        ]
                                    }, void 0, true, {
                                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/versions-view.tsx",
                                        lineNumber: 115,
                                        columnNumber: 21
                                    }, void 0),
                                    renderModal()
                                ]
                            }, void 0, true)
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/versions-view.tsx",
                            lineNumber: 113,
                            columnNumber: 15
                        }, void 0),
                        !isEmptyVersionsList && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_accordion_timeline_accordion_timeline__WEBPACK_IMPORTED_MODULE_12__.AccordionTimeline, {
                            items: accordionItems
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/versions-view.tsx",
                            lineNumber: 133,
                            columnNumber: 40
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/versions-view.tsx",
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
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/versions-view.tsx",
                                lineNumber: 139,
                                columnNumber: 71
                            }, void 0),
                            !isEmptyDetailedVersionsList && !isComparingActive && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(SingleViewComponent, {
                                setDetailedVersions: setDetailedVersions,
                                versionId: detailedVersions[0],
                                versions: versions
                            }, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/versions-view.tsx",
                                lineNumber: 141,
                                columnNumber: 72
                            }, void 0),
                            isEmptyDetailedVersionsList && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_text_text__WEBPACK_IMPORTED_MODULE_14__.Text, {
                                className: styles.notificationMessage,
                                children: t('version.preview-notification')
                            }, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/versions-view.tsx",
                                lineNumber: 143,
                                columnNumber: 49
                            }, void 0)
                        ]
                    }, void 0, true, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/versions-view.tsx",
                        lineNumber: 138,
                        columnNumber: 15
                    }, void 0)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/versions-view.tsx",
                    lineNumber: 137,
                    columnNumber: 17
                }, void 0)
            }
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/versions-view.tsx",
            lineNumber: 109,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/versions-view.tsx",
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
//# sourceMappingURL=js_src_core_modules_document_editor_sidebar_document-sidebar-manager_ts-js_src_core_modules_d-4b5729.js.map