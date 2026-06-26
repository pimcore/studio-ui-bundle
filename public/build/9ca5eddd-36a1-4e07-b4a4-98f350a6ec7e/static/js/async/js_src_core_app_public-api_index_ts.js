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
(self["chunk_pimcore_studio_ui_bundle "] = self["chunk_pimcore_studio_ui_bundle "] || []).push([["js_src_core_app_public-api_index_ts"], {
"./js/src/core/app/public-api/i18n/i18n-api.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  i18nApi: () => (i18nApi)
});
/* import */ var _Pimcore_app_i18n__rspack_import_0 = __webpack_require__("./js/src/core/app/i18n/index.ts");
/* import */ var lodash__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_1);
/* import */ var _sdk_utils__rspack_import_2 = __webpack_require__("./js/src/sdk/utils/index.ts");
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


class I18nApiImpl {
    getTranslationResources() {
        const resources = {};
        // Get all loaded language resources from i18n
        const languages = _Pimcore_app_i18n__rspack_import_0["default"].languages ?? [];
        languages.forEach((language)=>{
            const resourceBundle = _Pimcore_app_i18n__rspack_import_0["default"].getResourceBundle(language, 'translation');
            if (!(0,lodash__rspack_import_1.isNil)(resourceBundle)) {
                resources[language] = resourceBundle;
            }
        });
        return resources;
    }
    getCurrentLanguage() {
        return _Pimcore_app_i18n__rspack_import_0["default"].language;
    }
    getFallbackLanguage() {
        const fallbackLng = _Pimcore_app_i18n__rspack_import_0["default"].options.fallbackLng;
        if (Array.isArray(fallbackLng)) {
            return fallbackLng[0] ?? 'en';
        }
        if ((0,_sdk_utils__rspack_import_2.isNonEmptyString)(fallbackLng)) {
            return fallbackLng;
        }
        if ((0,lodash__rspack_import_1.isPlainObject)(fallbackLng)) {
            var _fallbackMap_default;
            const fallbackMap = fallbackLng;
            return ((_fallbackMap_default = fallbackMap.default) === null || _fallbackMap_default === void 0 ? void 0 : _fallbackMap_default[0]) ?? 'en';
        }
        return 'en';
    }
    reportMissingTranslation(key) {
        // Trigger the same missing key handling as the main app
        // This will add the key to the missing translations store and handle debounced API calls
        _Pimcore_app_i18n__rspack_import_0["default"].emit('missingKey', [
            _Pimcore_app_i18n__rspack_import_0["default"].language
        ], 'translation', key, key);
    }
}
const i18nApi = new I18nApiImpl();

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/app/public-api/index.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Pimcore: () => (Pimcore),
  PimcoreStudio: () => (PimcoreStudio)
});
/* import */ var _depency_injection__rspack_import_0 = __webpack_require__("./js/src/core/app/depency-injection/index.ts");
/* import */ var _document_document_api__rspack_import_1 = __webpack_require__("./js/src/core/app/public-api/document/document-api.ts");
/* import */ var _i18n_i18n_api__rspack_import_2 = __webpack_require__("./js/src/core/app/public-api/i18n/i18n-api.ts");
/* import */ var _element_element_api__rspack_import_3 = __webpack_require__("./js/src/core/app/public-api/element/element-api.ts");
/* import */ var _modal_modal_api__rspack_import_4 = __webpack_require__("./js/src/core/app/public-api/modal/modal-api.ts");
/* import */ var _settings_settings_api__rspack_import_5 = __webpack_require__("./js/src/core/app/public-api/settings/settings-api.ts");
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





const Pimcore = {
    container: _depency_injection__rspack_import_0.container
};
const PimcoreStudio = {
    document: _document_document_api__rspack_import_1.documentApi,
    i18n: _i18n_i18n_api__rspack_import_2.i18nApi,
    element: _element_element_api__rspack_import_3.elementApi,
    modal: _modal_modal_api__rspack_import_4.modalApi,
    settings: _settings_settings_api__rspack_import_5.settingsApi
};

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/app/public-api/modal/modal-api.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  modalApi: () => (modalApi)
});
/* import */ var lodash__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_0);
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
let modalInstance = null;
class ModalApiImpl {
    setModalInstance(modal) {
        modalInstance = modal;
    }
    getModalInstance() {
        if ((0,lodash__rspack_import_0.isNull)(modalInstance)) {
            throw new Error('Modal instance not initialized. Make sure App.useApp() is called in the parent window.');
        }
        return modalInstance;
    }
    constructor(){
        this.info = (props)=>{
            return this.getModalInstance().info(props);
        };
        this.success = (props)=>{
            return this.getModalInstance().success(props);
        };
        this.error = (props)=>{
            return this.getModalInstance().error(props);
        };
        this.warning = (props)=>{
            return this.getModalInstance().warning(props);
        };
        this.confirm = (props)=>{
            return this.getModalInstance().confirm(props);
        };
    }
}
const modalApi = new ModalApiImpl();

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/app/public-api/settings/settings-api.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SettingsApi: () => (SettingsApi),
  settingsApi: () => (settingsApi)
});
/* import */ var _Pimcore_modules_app_settings_settings_slice__rspack_import_0 = __webpack_require__("./js/src/core/modules/app/settings/settings-slice.ts");
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
 * Settings API for iframe communication
 * Provides access to system settings from parent window to iframes
 */ class SettingsApi {
    /**
   * Initialize the settings API with the Redux store
   * This should be called during app initialization
   */ initialize(appStore) {
        this.store = appStore;
    }
    /**
   * Get current system settings
   * Returns the settings from the Redux store if available
   */ getSettings() {
        if (this.store === null) {
            console.warn('Settings API not initialized - Redux store not available');
            return null;
        }
        try {
            return (0,_Pimcore_modules_app_settings_settings_slice__rspack_import_0.getSettings)(this.store.getState());
        } catch (error) {
            console.error('Failed to get settings from store:', error);
            return null;
        }
    }
    /**
   * Check if settings are available
   */ areSettingsAvailable() {
        return this.store !== null && (0,_Pimcore_modules_app_settings_settings_slice__rspack_import_0.getSettings)(this.store.getState()) !== null;
    }
    constructor(){
        this.store = null;
    }
}
const settingsApi = new SettingsApi();

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},

}]);
//# sourceMappingURL=js_src_core_app_public-api_index_ts.js.map