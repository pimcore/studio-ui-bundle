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
(self["chunk_pimcore_studio_ui_bundle "] = self["chunk_pimcore_studio_ui_bundle "] || []).push([["__federation_expose__internal___mf_bootstrap_document_editor_iframe"], {
"./js/src/core/app/i18n/hooks/use-iframe-i18n-setup.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useIframeI18nSetup: () => (useIframeI18nSetup)
});
/* import */ var react__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var _Pimcore_app_i18n_iframe_i18n__rspack_import_1 = __webpack_require__("./js/src/core/app/i18n/iframe-i18n.ts");
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
 * Hook to handle i18n initialization for iframe components
 * Ensures translations are loaded from parent window before rendering
 */ const useIframeI18nSetup = ()=>{
    const [isInitialized, setIsInitialized] = (0,react__rspack_import_0.useState)(false);
    const [error, setError] = (0,react__rspack_import_0.useState)(null);
    (0,react__rspack_import_0.useEffect)(()=>{
        const initI18n = async ()=>{
            try {
                await (0,_Pimcore_app_i18n_iframe_i18n__rspack_import_1.initializeIframeI18n)();
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

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/app/i18n/iframe-i18n.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  FALLBACK_LANGUAGE: () => (FALLBACK_LANGUAGE),
  "default": () => (__rspack_default_export),
  initializeIframeI18n: () => (initializeIframeI18n)
});
/* import */ var i18next__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/i18next/i18next");
/* import */ var i18next__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(i18next__rspack_import_0);
/* import */ var react_i18next__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_1);
/* import */ var _public_api_helpers_api_helper__rspack_import_2 = __webpack_require__("./js/src/core/app/public-api/helpers/api-helper.ts");
/* import */ var _utils_post_processors__rspack_import_3 = __webpack_require__("./js/src/core/app/i18n/utils/post-processors.ts");
/* import */ var _sdk_utils__rspack_import_4 = __webpack_require__("./js/src/sdk/utils/index.ts");
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




const FALLBACK_LANGUAGE = 'en';
const getValidTranslationValue = (value, key)=>{
    if ((0,_sdk_utils__rspack_import_4.isNonEmptyString)(value) && value !== key) {
        return value;
    }
    return undefined;
};
const resolveTranslatedValue = (resources, key, currentLanguage, fallbackLanguage)=>{
    var _resources_currentLanguage, _resources_fallbackLanguage;
    const currentValue = getValidTranslationValue((_resources_currentLanguage = resources[currentLanguage]) === null || _resources_currentLanguage === void 0 ? void 0 : _resources_currentLanguage[key], key);
    if (currentValue !== undefined) {
        return currentValue;
    }
    const fallbackValue = getValidTranslationValue((_resources_fallbackLanguage = resources[fallbackLanguage]) === null || _resources_fallbackLanguage === void 0 ? void 0 : _resources_fallbackLanguage[key], key);
    if (fallbackValue !== undefined) {
        return fallbackValue;
    }
    return undefined;
};
const initializeIframeI18n = async ()=>{
    try {
        const { i18n: i18nApi } = (0,_public_api_helpers_api_helper__rspack_import_2.getPimcoreStudioApi)();
        const translationResources = i18nApi.getTranslationResources();
        const currentLanguage = i18nApi.getCurrentLanguage();
        const fallbackLanguage = i18nApi.getFallbackLanguage();
        const resources = {};
        Object.keys(translationResources).forEach((language)=>{
            resources[language] = {
                translation: {
                    ...translationResources[language] ?? {}
                }
            };
        });
        await i18next__rspack_import_0_default().use(react_i18next__rspack_import_1.initReactI18next).init({
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
        i18next__rspack_import_0_default().use(_utils_post_processors__rspack_import_3.returnKeyIfEmptyProcessor);
        i18next__rspack_import_0_default().on('missingKey', (lngs, namespace, key, res)=>{
            if (!(0,_sdk_utils__rspack_import_4.isNonEmptyString)(key)) {
                return;
            }
            try {
                const latestResources = i18nApi.getTranslationResources();
                const translatedValue = resolveTranslatedValue(latestResources, key, currentLanguage, fallbackLanguage);
                if (translatedValue !== undefined) {
                    i18next__rspack_import_0_default().addResource(currentLanguage, namespace, key, translatedValue);
                    if (currentLanguage !== fallbackLanguage) {
                        i18next__rspack_import_0_default().addResource(fallbackLanguage, namespace, key, translatedValue);
                    }
                    console.warn('[iframe-i18n] missingKey but translation exists in parent catalog', {
                        key,
                        currentLanguage,
                        fallbackLanguage,
                        translatedValue
                    });
                } else {
                    i18nApi.reportMissingTranslation(key);
                }
            } catch (error) {
                console.warn(`Could not report missing translation key '${key}' to parent window:`, error);
            }
        });
    } catch (error) {
        console.warn('Could not initialize iframe i18n from parent window, falling back to basic setup:', error);
        await i18next__rspack_import_0_default().use(react_i18next__rspack_import_1.initReactI18next).init({
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
/* export default */ const __rspack_default_export = ((i18next__rspack_import_0_default()));

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/iframe-app/styles/global.styles.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DocumentEditorIframeGlobalStyles: () => (DocumentEditorIframeGlobalStyles)
});
/* import */ var antd_style__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/antd-style/antd-style");
/* import */ var antd_style__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(antd_style__rspack_import_0);
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
const DocumentEditorIframeGlobalStyles = (0,antd_style__rspack_import_0.createGlobalStyle)`
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

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/sdk/_internal_/mf-bootstrap-document-editor-iframe.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.a(module, async function (__rspack_load_async_deps, __rspack_async_done) { try {
__webpack_require__.r(__webpack_exports__);
/* import */ var _Pimcore_bootstrap__rspack_import_0 = __webpack_require__("./js/src/core/bootstrap.ts");
/* import */ var _Pimcore_app_plugin_system_plugin_system__rspack_import_1 = __webpack_require__("./js/src/core/app/plugin-system/plugin-system.ts");
/* import */ var _Pimcore_app_module_system_module_system__rspack_import_2 = __webpack_require__("./js/src/core/app/module-system/module-system.ts");
/* import */ var _Pimcore_modules_document_editor_shared_tab_manager_tabs_edit_iframe_app_app_runner__rspack_import_3 = __webpack_require__("./js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/iframe-app/app-runner.tsx");
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



if (true) {
    module.hot.accept();
}
window.Pimcore = (await __webpack_require__.e(/* import() */ "js_src_core_app_public-api_index_ts").then(__webpack_require__.bind(__webpack_require__, "./js/src/core/app/public-api/index.ts"))).Pimcore;
window.PimcoreDocumentEditor = (await __webpack_require__.e(/* import() */ "js_src_core_app_public-api_document-editor-iframe_index_ts").then(__webpack_require__.bind(__webpack_require__, "./js/src/core/app/public-api/document-editor-iframe/index.ts"))).PimcoreDocumentEditor;
window.addEventListener('load', async ()=>{
    await _Pimcore_app_plugin_system_plugin_system__rspack_import_1.pluginSystem.loadPlugins();
    _Pimcore_app_plugin_system_plugin_system__rspack_import_1.pluginSystem.initPlugins();
    _Pimcore_app_plugin_system_plugin_system__rspack_import_1.pluginSystem.startupPlugins();
    _Pimcore_app_module_system_module_system__rspack_import_2.moduleSystem.initModules();
    (0,_Pimcore_modules_document_editor_shared_tab_manager_tabs_edit_iframe_app_app_runner__rspack_import_3.runApp)();
});

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });

__rspack_async_done();
} catch(e) { __rspack_async_done(e); } }, 1);

},
"./js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/components/editables-renderer/editables-loader.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  EditablesLoader: () => (EditablesLoader)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var lodash__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_2);
/* import */ var _Pimcore_app_depency_injection__rspack_import_3 = __webpack_require__("./js/src/core/app/depency-injection/index.ts");
/* import */ var _Pimcore_app_config_services_service_ids__rspack_import_4 = __webpack_require__("./js/src/core/app/config/services/service-ids.ts");
/* import */ var _hooks_use_document_editor__rspack_import_5 = __webpack_require__("./js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/hooks/use-document-editor.tsx");
/* import */ var _Pimcore_modules_document_document_provider__rspack_import_6 = __webpack_require__("./js/src/core/modules/document/document-provider.tsx");
/* import */ var _editables_renderer__rspack_import_7 = __webpack_require__("./js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/components/editables-renderer/editables-renderer.tsx");
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






const EditablesLoader = (param)=>{
    let { editableDefinitions } = param;
    _s();
    const documentEditableRegistry = (0,_Pimcore_app_depency_injection__rspack_import_3.useInjection)(_Pimcore_app_config_services_service_ids__rspack_import_4.serviceIds["DynamicTypes/DocumentEditableRegistry"]);
    const apiInitialized = (0,react__rspack_import_1.useRef)(false);
    const [isInitialized, setIsInitialized] = (0,react__rspack_import_1.useState)(false);
    const { initializeData, notifyReady, initializeInheritanceState } = (0,_hooks_use_document_editor__rspack_import_5.useDocumentEditor)();
    const { id: documentId } = (0,react__rspack_import_1.useContext)(_Pimcore_modules_document_document_provider__rspack_import_6.DocumentContext);
    const getInitialData = (editableDefinitions)=>{
        const initialData = {};
        editableDefinitions.forEach((editable)=>{
            const editableType = documentEditableRegistry.hasDynamicType(editable.type) ? documentEditableRegistry.getDynamicType(editable.type) : undefined;
            initialData[editable.name] = {
                type: editable.type,
                data: (0,lodash__rspack_import_2.isUndefined)(editableType) ? editable.data ?? null : editableType.transformValue(editable.data, editable)
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
    (0,react__rspack_import_1.useEffect)(()=>{
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
    (0,react__rspack_import_1.useEffect)(()=>{
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
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(react_jsx_dev_runtime__rspack_import_0.Fragment, {}, void 0, false);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_editables_renderer__rspack_import_7.EditablesRenderer, {
        editableDefinitions: editableDefinitions
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/components/editables-renderer/editables-loader.tsx",
        lineNumber: 71,
        columnNumber: 10
    }, undefined);
};
_s(EditablesLoader, "b6Z8UQG4e9bqfgR/uuepDxai2ZI=", false, function() {
    return [
        _Pimcore_app_depency_injection__rspack_import_3.useInjection,
        _hooks_use_document_editor__rspack_import_5.useDocumentEditor
    ];
});
_c = EditablesLoader;
var _c;
$RefreshReg$(_c, "EditablesLoader");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/components/editables-renderer/editables-renderer.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  EditablesRenderer: () => (EditablesRenderer)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var react_dom__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/react-dom/react-dom");
/* import */ var react_dom__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(react_dom__rspack_import_2);
/* import */ var _render_editable__rspack_import_3 = __webpack_require__("./js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/components/editables-renderer/render-editable.tsx");
/* import */ var lodash__rspack_import_4 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_4_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_4);
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



const EditablesRenderer = (param)=>{
    let { editableDefinitions } = param;
    _s();
    const editableContainerRefs = (0,react__rspack_import_1.useRef)({});
    // Create refs for each editable if they don't exist
    editableDefinitions.forEach((editable)=>{
        if ((0,lodash__rspack_import_4.isUndefined)(editableContainerRefs.current[editable.id])) {
            editableContainerRefs.current[editable.id] = /*#__PURE__*/ (0,react__rspack_import_1.createRef)();
        }
    });
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(react_jsx_dev_runtime__rspack_import_0.Fragment, {
        children: editableDefinitions.map((editable)=>{
            const targetElement = document.getElementById(editable.id);
            if (!(0,lodash__rspack_import_4.isNull)(targetElement)) {
                // Assign the DOM element to the ref's current property
                if (!(0,lodash__rspack_import_4.isNull)(editableContainerRefs.current[editable.id]) && (0,lodash__rspack_import_4.isNull)(editableContainerRefs.current[editable.id].current)) {
                    editableContainerRefs.current[editable.id].current = targetElement;
                }
                return /*#__PURE__*/ react_dom__rspack_import_2_default().createPortal(/*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_render_editable__rspack_import_3.RenderEditable, {
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

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/iframe-app/app-runner.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  runApp: () => (runApp)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var react_dom_client__rspack_import_2 = __webpack_require__("./node_modules/react-dom/client.js");
/* import */ var _Pimcore_modules_app_error_handler__rspack_import_3 = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* import */ var _iframe_app_view__rspack_import_4 = __webpack_require__("./js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/iframe-app/iframe-app-view.tsx");
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



function runApp() {
    const domElement = document.getElementById('pimcore-studio-app');
    if (domElement === null) {
        (0,_Pimcore_modules_app_error_handler__rspack_import_3["default"])(new _Pimcore_modules_app_error_handler__rspack_import_3.GeneralError('Root element not found'));
        return undefined;
    }
    const root = (0,react_dom_client__rspack_import_2.createRoot)(domElement);
    root.render(/*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_iframe_app_view__rspack_import_4.DocumentEditorIframeAppView, {}, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/iframe-app/app-runner.tsx",
        lineNumber: 22,
        columnNumber: 15
    }, this));
}

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/iframe-app/iframe-app-view.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DocumentEditorIframeAppView: () => (DocumentEditorIframeAppView)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _components_editables_renderer_editables_loader__rspack_import_2 = __webpack_require__("./js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/components/editables-renderer/editables-loader.tsx");
/* import */ var _Pimcore_modules_app_global_provider__rspack_import_3 = __webpack_require__("./js/src/core/modules/app/global-provider.tsx");
/* import */ var _Pimcore_modules_document_document_provider__rspack_import_4 = __webpack_require__("./js/src/core/modules/document/document-provider.tsx");
/* import */ var lodash__rspack_import_5 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_5_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_5);
/* import */ var _Pimcore_components_alert_alert__rspack_import_6 = __webpack_require__("./js/src/core/components/alert/alert.tsx");
/* import */ var antd__rspack_import_7 = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* import */ var antd__rspack_import_7_default = /*#__PURE__*/__webpack_require__.n(antd__rspack_import_7);
/* import */ var _Pimcore_app_config_date_time__rspack_import_8 = __webpack_require__("./js/src/core/app/config/date-time.tsx");
/* import */ var _Pimcore_modules_app_error_boundary_error_boundary__rspack_import_9 = __webpack_require__("./js/src/core/modules/app/error-boundary/error-boundary.tsx");
/* import */ var _Pimcore_app_i18n_hooks_use_iframe_i18n_setup__rspack_import_10 = __webpack_require__("./js/src/core/app/i18n/hooks/use-iframe-i18n-setup.ts");
/* import */ var _Pimcore_modules_app_modals_provider__rspack_import_11 = __webpack_require__("./js/src/core/modules/app/modals-provider.tsx");
/* import */ var _styles_global_styles__rspack_import_12 = __webpack_require__("./js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/iframe-app/styles/global.styles.ts");
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











const DocumentEditorIframeAppView = ()=>{
    _s();
    const editableDefinitions = window.editableDefinitions ?? [];
    const { isInitialized } = (0,_Pimcore_app_i18n_hooks_use_iframe_i18n_setup__rspack_import_10.useIframeI18nSetup)();
    // Extract document ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const documentIdParam = urlParams.get('documentId');
    const documentId = (0,lodash__rspack_import_5.isNil)(documentIdParam) ? undefined : parseInt(documentIdParam, 10);
    if (!isInitialized) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)("div", {
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
    if ((0,lodash__rspack_import_5.isNil)(documentId) || !(0,lodash__rspack_import_5.isNumber)(documentId) || (0,lodash__rspack_import_5.isNaN)(documentId) || documentId <= 0) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_alert_alert__rspack_import_6.Alert, {
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
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(react__rspack_import_1.StrictMode, {
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_app_error_boundary_error_boundary__rspack_import_9["default"], {
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_app_global_provider__rspack_import_3.GlobalProvider, {
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_7.App, {
                    children: [
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_styles_global_styles__rspack_import_12.DocumentEditorIframeGlobalStyles, {}, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/editor/shared-tab-manager/tabs/edit/iframe-app/iframe-app-view.tsx",
                            lineNumber: 48,
                            columnNumber: 13
                        }, undefined),
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_app_modals_provider__rspack_import_11.ModalsProvider, {
                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_app_config_date_time__rspack_import_8.DateTimeConfig, {
                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_document_document_provider__rspack_import_4.DocumentProvider, {
                                    id: documentId,
                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_components_editables_renderer_editables_loader__rspack_import_2.EditablesLoader, {
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
        _Pimcore_app_i18n_hooks_use_iframe_i18n_setup__rspack_import_10.useIframeI18nSetup
    ];
});
_c = DocumentEditorIframeAppView;
var _c;
$RefreshReg$(_c, "DocumentEditorIframeAppView");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},

}]);
//# sourceMappingURL=__federation_expose__internal___mf_bootstrap_document_editor_iframe.js.map