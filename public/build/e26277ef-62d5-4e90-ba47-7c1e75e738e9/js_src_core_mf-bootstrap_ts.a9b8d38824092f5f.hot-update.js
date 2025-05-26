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
self["webpackHotUpdatepimcore_studio_ui_bundle_core"]("js_src_core_mf-bootstrap_ts", {
"./js/src/core/modules/app/app-loader/loader/translation/loader.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useTranslationLoader: () => (useTranslationLoader)
});
/* ESM import */var _Pimcore_app_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/i18n/index.ts");
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* ESM import */var _Pimcore_modules_app_translations_translations_api_slice_gen__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/app/translations/translations-api-slice.gen.ts");
/* ESM import */var _Pimcore_modules_auth_user_user_slice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/auth/user/user-slice.ts");
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




const useTranslationLoader = ()=>{
    const [fetchTranslations] = (0,_Pimcore_modules_app_translations_translations_api_slice_gen__WEBPACK_IMPORTED_MODULE_3__.useTranslationGetCollectionMutation)();
    const loadPublicTranslations = async ()=>{
        await fetchTranslations({
            translation: {
                locale: _Pimcore_app_i18n__WEBPACK_IMPORTED_MODULE_0__.FALLBACK_LANGUAGE,
                keys: [],
                useFallback: true
            }
        }).unwrap().then((response)=>{
            _Pimcore_app_i18n__WEBPACK_IMPORTED_MODULE_0__["default"].addResourceBundle(_Pimcore_app_i18n__WEBPACK_IMPORTED_MODULE_0__.FALLBACK_LANGUAGE, 'translation', response.keys ?? [], true, true);
            void _Pimcore_app_i18n__WEBPACK_IMPORTED_MODULE_0__["default"].changeLanguage(_Pimcore_app_i18n__WEBPACK_IMPORTED_MODULE_0__.FALLBACK_LANGUAGE);
        }).catch(()=>{
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_2__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_2__.GeneralError('Error loading translations'));
            throw new Error('Error loading translations');
        });
    };
    const loadTranslations = async ()=>{
        const user = (0,_Pimcore_modules_auth_user_user_slice__WEBPACK_IMPORTED_MODULE_4__.selectCurrentUser)(_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_1__.store.getState());
        await fetchTranslations({
            translation: {
                locale: user.language,
                keys: [],
                useFallback: true
            }
        }).unwrap().then((response)=>{
            _Pimcore_app_i18n__WEBPACK_IMPORTED_MODULE_0__["default"].addResourceBundle(user.language, 'translation', response.keys ?? [], true, true);
            void _Pimcore_app_i18n__WEBPACK_IMPORTED_MODULE_0__["default"].changeLanguage(user.language);
        }).catch((error)=>{
            console.error('Error loading translations', error);
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_2__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_2__.GeneralError('Error loading translations'));
        });
    };
    return {
        loadPublicTranslations,
        loadTranslations
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

});
//# sourceMappingURL=js_src_core_mf-bootstrap_ts.a9b8d38824092f5f.hot-update.js.map