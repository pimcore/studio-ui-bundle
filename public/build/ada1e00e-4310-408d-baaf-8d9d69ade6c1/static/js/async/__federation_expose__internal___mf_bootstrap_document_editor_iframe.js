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
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["__federation_expose__internal___mf_bootstrap_document_editor_iframe"], {
"./js/src/core/app/i18n/hooks/use-iframe-i18n-setup.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useIframeI18nSetup: () => (useIframeI18nSetup)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _Pimcore_app_i18n_iframe_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/app/i18n/iframe-i18n.ts");
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
 * Hook to handle i18n initialization for iframe components
 * Ensures translations are loaded from parent window before rendering
 */ const useIframeI18nSetup = ()=>{
    const [isInitialized, setIsInitialized] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        const initI18n = async ()=>{
            try {
                await (0,_Pimcore_app_i18n_iframe_i18n__WEBPACK_IMPORTED_MODULE_1__.initializeIframeI18n)();
                setIsInitialized(true);
            } catch (err) {
                const error = err instanceof Error ? err : new Error('Failed to initialize iframe i18n');
                console.error('Failed to initialize iframe i18n:', error);
                setError(error);
                setIsInitialized(true); // Continue anyway with fallback
            }
        };
        void initI18n();
    }, []);
    return {
        isInitialized,
        error
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
"./js/src/core/app/i18n/iframe-i18n.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  FALLBACK_LANGUAGE: () => (FALLBACK_LANGUAGE),
  "default": () => (__WEBPACK_DEFAULT_EXPORT__),
  initializeIframeI18n: () => (initializeIframeI18n)
});
/* ESM import */var i18next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/i18next/i18next");
/* ESM import */var i18next__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(i18next__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _public_api_helpers_api_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/app/public-api/helpers/api-helper.ts");
/* ESM import */var _utils_post_processors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/app/i18n/utils/post-processors.ts");
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



const FALLBACK_LANGUAGE = 'en';
/**
 * Initialize i18n for iframe with translations from parent window
 */ const initializeIframeI18n = async ()=>{
    try {
        // Get translation resources from parent window
        const { i18n: i18nApi } = (0,_public_api_helpers_api_helper__WEBPACK_IMPORTED_MODULE_2__.getPimcoreStudioApi)();
        const translationResources = i18nApi.getTranslationResources();
        const currentLanguage = i18nApi.getCurrentLanguage();
        const fallbackLanguage = i18nApi.getFallbackLanguage();
        const resources = {};
        Object.keys(translationResources).forEach((language)=>{
            resources[language] = {
                translation: translationResources[language]
            };
        });
        // Initialize i18n with parent window's translations
        await i18next__WEBPACK_IMPORTED_MODULE_0___default().use(react_i18next__WEBPACK_IMPORTED_MODULE_1__.initReactI18next).init({
            lng: currentLanguage,
            fallbackLng: fallbackLanguage,
            ns: [
                'translation'
            ],
            defaultNS: 'translation',
            keySeparator: false,
            resources,
            saveMissing: true,
            postProcess: [
                'returnKeyIfEmpty'
            ],
            interpolation: {
                escapeValue: false
            }
        });
        // Add the shared post-processor
        i18next__WEBPACK_IMPORTED_MODULE_0___default().use(_utils_post_processors__WEBPACK_IMPORTED_MODULE_3__.returnKeyIfEmptyProcessor);
        // Set up missing key handler to report back to parent window
        i18next__WEBPACK_IMPORTED_MODULE_0___default().on('missingKey', (lngs, namespace, key, res)=>{
            try {
                i18nApi.reportMissingTranslation(key);
                i18next__WEBPACK_IMPORTED_MODULE_0___default().addResource(currentLanguage, namespace, key, key);
                if (currentLanguage !== fallbackLanguage) {
                    i18next__WEBPACK_IMPORTED_MODULE_0___default().addResource(fallbackLanguage, namespace, key, key);
                }
                console.debug(`Missing translation key reported to parent: ${key}`);
            } catch (error) {
                console.warn(`Could not report missing translation key '${key}' to parent window:`, error);
                i18next__WEBPACK_IMPORTED_MODULE_0___default().addResource(currentLanguage, namespace, key, key);
                if (currentLanguage !== fallbackLanguage) {
                    i18next__WEBPACK_IMPORTED_MODULE_0___default().addResource(fallbackLanguage, namespace, key, key);
                }
            }
        });
    } catch (error) {
        console.warn('Could not initialize iframe i18n from parent window, falling back to basic setup:', error);
        // Fallback initialization if parent API is not available
        await i18next__WEBPACK_IMPORTED_MODULE_0___default().use(react_i18next__WEBPACK_IMPORTED_MODULE_1__.initReactI18next).init({
            lng: FALLBACK_LANGUAGE,
            fallbackLng: FALLBACK_LANGUAGE,
            keySeparator: false,
            ns: [
                'translation'
            ],
            resources: {},
            saveMissing: false
        });
    }
};
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((i18next__WEBPACK_IMPORTED_MODULE_0___default()));

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
"./js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/iframe-app/styles/global.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DocumentEditorIframeGlobalStyles: () => (DocumentEditorIframeGlobalStyles)
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
const DocumentEditorIframeGlobalStyles = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createGlobalStyle)`
  /* Required field styling for document editables - Default behavior: style direct children of wrapper */
  [data-required-active="true"]:not(:has(.studio-required-field-target)) .studio-required-field-wrapper > * {
    outline: 2px dashed ${(props)=>props.theme.colorError} !important;
    outline-offset: 5px !important;
  }

  /* Required field styling for document editables - Custom target behavior: style specific target element */
  [data-required-active="true"] .studio-required-field-target {
    outline: 2px dashed ${(props)=>props.theme.colorError} !important;
    outline-offset: 5px !important;
  }

  .ant-dropdown-menu,
  .ant-dropdown-menu-sub {
    overflow: auto;
    max-height: 48vh;
  }

  .ant-dropdown-menu-submenu-popup {
    box-shadow: ${(props)=>props.theme.boxShadowSecondary};
  }
`;

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
"./js/src/sdk/_internal_/mf-bootstrap-document-editor-iframe.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.a(module, async function (__webpack_handle_async_dependencies__, __webpack_async_result__) { try {
__webpack_require__.r(__webpack_exports__);
/* ESM import */var _Pimcore_bootstrap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/bootstrap.ts");
/* ESM import */var _Pimcore_app_plugin_system_plugin_system__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/app/plugin-system/plugin-system.ts");
/* ESM import */var _Pimcore_app_module_system_module_system__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/app/module-system/module-system.ts");
/* ESM import */var _Pimcore_modules_document_editor_shared_tab_manager_tabs_edit_iframe_app_app_runner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/iframe-app/app-runner.tsx");
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



if (true) {
    module.hot.accept();
}
window.Pimcore = (await __webpack_require__.e(/* import() */ "js_src_core_app_public-api_index_ts").then(__webpack_require__.bind(__webpack_require__, "./js/src/core/app/public-api/index.ts"))).Pimcore;
window.PimcoreDocumentEditor = (await __webpack_require__.e(/* import() */ "js_src_core_app_public-api_document-editor-iframe_index_ts").then(__webpack_require__.bind(__webpack_require__, "./js/src/core/app/public-api/document-editor-iframe/index.ts"))).PimcoreDocumentEditor;
window.addEventListener('load', async ()=>{
    await _Pimcore_app_plugin_system_plugin_system__WEBPACK_IMPORTED_MODULE_1__.pluginSystem.loadPlugins();
    _Pimcore_app_plugin_system_plugin_system__WEBPACK_IMPORTED_MODULE_1__.pluginSystem.initPlugins();
    _Pimcore_app_plugin_system_plugin_system__WEBPACK_IMPORTED_MODULE_1__.pluginSystem.startupPlugins();
    _Pimcore_app_module_system_module_system__WEBPACK_IMPORTED_MODULE_2__.moduleSystem.initModules();
    (0,_Pimcore_modules_document_editor_shared_tab_manager_tabs_edit_iframe_app_app_runner__WEBPACK_IMPORTED_MODULE_3__.runApp)();
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

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

}),
"./js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/components/editables-renderer/editables-loader.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  EditablesLoader: () => (EditablesLoader)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/app/depency-injection/index.ts");
/* ESM import */var _Pimcore_app_config_services_service_ids__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/app/config/services/service-ids.ts");
/* ESM import */var _hooks_use_document_editor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/hooks/use-document-editor.tsx");
/* ESM import */var _Pimcore_modules_document_document_provider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/document/document-provider.tsx");
/* ESM import */var _editables_renderer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/components/editables-renderer/editables-renderer.tsx");
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







const EditablesLoader = (param)=>{
    let { editableDefinitions } = param;
    _s();
    const documentEditableRegistry = (0,_Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_3__.useInjection)(_Pimcore_app_config_services_service_ids__WEBPACK_IMPORTED_MODULE_4__.serviceIds["DynamicTypes/DocumentEditableRegistry"]);
    const apiInitialized = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
    const [isInitialized, setIsInitialized] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { initializeData, notifyReady, initializeInheritanceState } = (0,_hooks_use_document_editor__WEBPACK_IMPORTED_MODULE_5__.useDocumentEditor)();
    const { id: documentId } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_Pimcore_modules_document_document_provider__WEBPACK_IMPORTED_MODULE_6__.DocumentContext);
    const getInitialData = (editableDefinitions)=>{
        const initialData = {};
        editableDefinitions.forEach((editable)=>{
            const editableType = documentEditableRegistry.hasDynamicType(editable.type) ? documentEditableRegistry.getDynamicType(editable.type) : undefined;
            initialData[editable.name] = {
                type: editable.type,
                data: (0,lodash__WEBPACK_IMPORTED_MODULE_2__.isUndefined)(editableType) ? editable.data ?? null : editableType.transformValue(editable.data, editable)
            };
        });
        return initialData;
    };
    const getInitialInheritanceState = (editableDefinitions)=>{
        const inheritanceState = {};
        editableDefinitions.forEach((editable)=>{
            inheritanceState[editable.name] = editable.inherited;
        });
        return inheritanceState;
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!apiInitialized.current) {
            initializeData(getInitialData(editableDefinitions));
            initializeInheritanceState(getInitialInheritanceState(editableDefinitions));
            apiInitialized.current = true;
            setIsInitialized(true);
        }
    }, [
        editableDefinitions,
        initializeData,
        initializeInheritanceState
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (apiInitialized.current) {
            notifyReady();
            try {
                documentEditableRegistry.notifyDocumentReady(documentId, editableDefinitions);
            } catch (error) {
                console.warn('Could not process document ready events:', error);
            }
        }
    }, [
        notifyReady,
        editableDefinitions,
        documentId,
        documentEditableRegistry
    ]);
    if (!isInitialized) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}, void 0, false);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_editables_renderer__WEBPACK_IMPORTED_MODULE_7__.EditablesRenderer, {
        editableDefinitions: editableDefinitions
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/components/editables-renderer/editables-loader.tsx",
        lineNumber: 71,
        columnNumber: 10
    }, undefined);
};
_s(EditablesLoader, "b6Z8UQG4e9bqfgR/uuepDxai2ZI=", false, function() {
    return [
        _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_3__.useInjection,
        _hooks_use_document_editor__WEBPACK_IMPORTED_MODULE_5__.useDocumentEditor
    ];
});
_c = EditablesLoader;
var _c;
$RefreshReg$(_c, "EditablesLoader");

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
"./js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/components/editables-renderer/editables-renderer.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  EditablesRenderer: () => (EditablesRenderer)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react-dom/react-dom");
/* ESM import */var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _render_editable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/components/editables-renderer/render-editable.tsx");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);
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




const EditablesRenderer = (param)=>{
    let { editableDefinitions } = param;
    _s();
    const editableContainerRefs = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)({});
    // Create refs for each editable if they don't exist
    editableDefinitions.forEach((editable)=>{
        if ((0,lodash__WEBPACK_IMPORTED_MODULE_4__.isUndefined)(editableContainerRefs.current[editable.id])) {
            editableContainerRefs.current[editable.id] = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createRef)();
        }
    });
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: editableDefinitions.map((editable)=>{
            const targetElement = document.getElementById(editable.id);
            if (!(0,lodash__WEBPACK_IMPORTED_MODULE_4__.isNull)(targetElement)) {
                // Assign the DOM element to the ref's current property
                if (!(0,lodash__WEBPACK_IMPORTED_MODULE_4__.isNull)(editableContainerRefs.current[editable.id]) && (0,lodash__WEBPACK_IMPORTED_MODULE_4__.isNull)(editableContainerRefs.current[editable.id].current)) {
                    editableContainerRefs.current[editable.id].current = targetElement;
                }
                return /*#__PURE__*/ react_dom__WEBPACK_IMPORTED_MODULE_2___default().createPortal(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_render_editable__WEBPACK_IMPORTED_MODULE_3__.RenderEditable, {
                    containerRef: editableContainerRefs.current[editable.id],
                    editableDefinition: editable
                }, editable.id, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/components/editables-renderer/editables-renderer.tsx",
                    lineNumber: 34,
                    columnNumber: 38
                }, undefined), targetElement);
            }
            return null;
        })
    }, void 0, false);
};
_s(EditablesRenderer, "rgIZFoiCyxfXAbgtPSnNg63pYCU=");
_c = EditablesRenderer;
var _c;
$RefreshReg$(_c, "EditablesRenderer");

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
"./js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/iframe-app/app-runner.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  runApp: () => (runApp)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react_dom_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/react-dom/client.js");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* ESM import */var _iframe_app_view__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/iframe-app/iframe-app-view.tsx");
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




function runApp() {
    const domElement = document.getElementById('pimcore-studio-app');
    if (domElement === null) {
        (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_3__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_3__.GeneralError('Root element not found'));
        return undefined;
    }
    const root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_2__.createRoot)(domElement);
    root.render(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_iframe_app_view__WEBPACK_IMPORTED_MODULE_4__.DocumentEditorIframeAppView, {}, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/iframe-app/app-runner.tsx",
        lineNumber: 22,
        columnNumber: 15
    }, this));
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
"./js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/iframe-app/iframe-app-view.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DocumentEditorIframeAppView: () => (DocumentEditorIframeAppView)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _components_editables_renderer_editables_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/components/editables-renderer/editables-loader.tsx");
/* ESM import */var _Pimcore_modules_app_global_provider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/app/global-provider.tsx");
/* ESM import */var _Pimcore_modules_document_document_provider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/document/document-provider.tsx");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);
/* ESM import */var _Pimcore_components_alert_alert__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/alert/alert.tsx");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_7__);
/* ESM import */var _Pimcore_app_config_date_time__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/app/config/date-time.tsx");
/* ESM import */var _Pimcore_modules_app_error_boundary_error_boundary__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/app/error-boundary/error-boundary.tsx");
/* ESM import */var _Pimcore_app_i18n_hooks_use_iframe_i18n_setup__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/app/i18n/hooks/use-iframe-i18n-setup.ts");
/* ESM import */var _Pimcore_modules_app_modals_provider__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/app/modals-provider.tsx");
/* ESM import */var _styles_global_styles__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/iframe-app/styles/global.styles.ts");
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












const DocumentEditorIframeAppView = ()=>{
    _s();
    const editableDefinitions = window.editableDefinitions ?? [];
    const { isInitialized } = (0,_Pimcore_app_i18n_hooks_use_iframe_i18n_setup__WEBPACK_IMPORTED_MODULE_10__.useIframeI18nSetup)();
    // Extract document ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const documentIdParam = urlParams.get('documentId');
    const documentId = (0,lodash__WEBPACK_IMPORTED_MODULE_5__.isNil)(documentIdParam) ? undefined : parseInt(documentIdParam, 10);
    if (!isInitialized) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
            style: {
                padding: '20px',
                textAlign: 'center'
            },
            children: "Loading translations..."
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/iframe-app/iframe-app-view.tsx",
            lineNumber: 34,
            columnNumber: 12
        }, undefined);
    }
    if ((0,lodash__WEBPACK_IMPORTED_MODULE_5__.isNil)(documentId) || !(0,lodash__WEBPACK_IMPORTED_MODULE_5__.isNumber)(documentId) || (0,lodash__WEBPACK_IMPORTED_MODULE_5__.isNaN)(documentId) || documentId <= 0) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_alert_alert__WEBPACK_IMPORTED_MODULE_6__.Alert, {
            description: "A valid documentId parameter is required in the URL.",
            message: "Error: Invalid Document ID",
            showIcon: true,
            type: "error"
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/iframe-app/iframe-app-view.tsx",
            lineNumber: 42,
            columnNumber: 12
        }, undefined);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react__WEBPACK_IMPORTED_MODULE_1__.StrictMode, {
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_app_error_boundary_error_boundary__WEBPACK_IMPORTED_MODULE_9__["default"], {
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_app_global_provider__WEBPACK_IMPORTED_MODULE_3__.GlobalProvider, {
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_7__.App, {
                    children: [
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_styles_global_styles__WEBPACK_IMPORTED_MODULE_12__.DocumentEditorIframeGlobalStyles, {}, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/iframe-app/iframe-app-view.tsx",
                            lineNumber: 48,
                            columnNumber: 13
                        }, undefined),
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_app_modals_provider__WEBPACK_IMPORTED_MODULE_11__.ModalsProvider, {
                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_app_config_date_time__WEBPACK_IMPORTED_MODULE_8__.DateTimeConfig, {
                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_document_document_provider__WEBPACK_IMPORTED_MODULE_4__.DocumentProvider, {
                                    id: documentId,
                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_editables_renderer_editables_loader__WEBPACK_IMPORTED_MODULE_2__.EditablesLoader, {
                                        editableDefinitions: editableDefinitions
                                    }, void 0, false, {
                                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/iframe-app/iframe-app-view.tsx",
                                        lineNumber: 52,
                                        columnNumber: 19
                                    }, undefined)
                                }, void 0, false, {
                                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/iframe-app/iframe-app-view.tsx",
                                    lineNumber: 51,
                                    columnNumber: 17
                                }, undefined)
                            }, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/iframe-app/iframe-app-view.tsx",
                                lineNumber: 50,
                                columnNumber: 15
                            }, undefined)
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/iframe-app/iframe-app-view.tsx",
                            lineNumber: 49,
                            columnNumber: 13
                        }, undefined)
                    ]
                }, void 0, true, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/iframe-app/iframe-app-view.tsx",
                    lineNumber: 47,
                    columnNumber: 11
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/iframe-app/iframe-app-view.tsx",
                lineNumber: 46,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/iframe-app/iframe-app-view.tsx",
            lineNumber: 45,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/iframe-app/iframe-app-view.tsx",
        lineNumber: 44,
        columnNumber: 10
    }, undefined);
};
_s(DocumentEditorIframeAppView, "2NA/XHrquR7O//22XLKklQm/los=", false, function() {
    return [
        _Pimcore_app_i18n_hooks_use_iframe_i18n_setup__WEBPACK_IMPORTED_MODULE_10__.useIframeI18nSetup
    ];
});
_c = DocumentEditorIframeAppView;
var _c;
$RefreshReg$(_c, "DocumentEditorIframeAppView");

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
//# sourceMappingURL=__federation_expose__internal___mf_bootstrap_document_editor_iframe.js.map