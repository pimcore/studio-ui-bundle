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
"./js/src/core/modules/app/app-loader/app-loader.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  AppLoader: () => (AppLoader)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/content/content.tsx");
/* ESM import */var _Pimcore_styles_global_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/styles/global.styles.ts");
/* ESM import */var _Pimcore_components_modal_alert_modal_hooks_use_alert_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/modal/alert-modal/hooks/use-alert-modal.tsx");
/* ESM import */var _Pimcore_modules_app_error_handler_services_error_modal_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/app/error-handler/services/error-modal-service.ts");
/* ESM import */var _Pimcore_modules_auth_hooks_use_is_authenticated__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/auth/hooks/use-is-authenticated.ts");
/* ESM import */var _loader_translation_loader__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/app/app-loader/loader/translation/loader.ts");
/* ESM import */var _loader_user_loader__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/app/app-loader/loader/user/loader.ts");
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









const AppLoader = (props)=>{
    _s();
    const dispatch = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_2__.useAppDispatch)();
    const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const modal = (0,_Pimcore_components_modal_alert_modal_hooks_use_alert_modal__WEBPACK_IMPORTED_MODULE_5__.useAlertModal)();
    // Register the modal instance to allow centralized error message display throughout the project
    _Pimcore_modules_app_error_handler_services_error_modal_service__WEBPACK_IMPORTED_MODULE_6__.ErrorModalService.setModalInstance(modal);
    const { isAuthenticated } = (0,_Pimcore_modules_auth_hooks_use_is_authenticated__WEBPACK_IMPORTED_MODULE_7__.useIsAuthenticated)();
    const { loadPublicTranslations, loadTranslations } = (0,_loader_translation_loader__WEBPACK_IMPORTED_MODULE_8__.useTranslationLoader)();
    const { loadUser } = (0,_loader_user_loader__WEBPACK_IMPORTED_MODULE_9__.useUserLoader)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        (async ()=>{
            setIsLoading(()=>true);
            if (isAuthenticated === undefined) {
                return;
            }
            if (isAuthenticated === false) {
                await Promise.all([
                    loadPublicTranslations()
                ]).then(()=>{
                    setIsLoading(()=>false);
                }).catch((error)=>{
                    console.error('Error during login preparation', error);
                });
            }
            if (isAuthenticated === true) {
                await Promise.all([
                    loadUser()
                ]);
                await Promise.all([
                    loadTranslations()
                ]);
            }
        })();
    }, [
        isAuthenticated
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_styles_global_styles__WEBPACK_IMPORTED_MODULE_4__.GlobalStyles, {}, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/app-loader/app-loader.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, undefined),
            isLoading && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_3__.Content, {
                loading: true
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/app-loader/app-loader.tsx",
                lineNumber: 72,
                columnNumber: 21
            }, undefined),
            !isLoading && props.children
        ]
    }, void 0, true);
};
_s(AppLoader, "vv09Ml5Jdz5ohjGKRm9EZnfkPao=", false, function() {
    return [
        _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_2__.useAppDispatch,
        _Pimcore_components_modal_alert_modal_hooks_use_alert_modal__WEBPACK_IMPORTED_MODULE_5__.useAlertModal,
        _Pimcore_modules_auth_hooks_use_is_authenticated__WEBPACK_IMPORTED_MODULE_7__.useIsAuthenticated,
        _loader_translation_loader__WEBPACK_IMPORTED_MODULE_8__.useTranslationLoader,
        _loader_user_loader__WEBPACK_IMPORTED_MODULE_9__.useUserLoader
    ];
});
_c = AppLoader;
var _c;
$RefreshReg$(_c, "AppLoader");

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
//# sourceMappingURL=js_src_core_mf-bootstrap_ts.41d1cce0063161f9.hot-update.js.map