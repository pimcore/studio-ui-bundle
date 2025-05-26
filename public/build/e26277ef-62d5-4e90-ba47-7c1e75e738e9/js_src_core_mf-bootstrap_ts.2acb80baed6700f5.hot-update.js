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
"./js/src/core/modules/app/app-loader/loader/user/loader.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useUserLoader: () => (useUserLoader)
});
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* ESM import */var _Pimcore_modules_auth_user_user_slice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/auth/user/user-slice.ts");
/* ESM import */var _Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/user/user-api-slice-enhanced.ts");
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



const useUserLoader = ()=>{
    const dispatch = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.useAppDispatch)();
    const loadUser = async ()=>{
        const userFetcher = dispatch(_Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_3__.api.endpoints.userGetCurrentInformation.initiate());
        await userFetcher.then((param)=>{
            let { data, isSuccess, isError, error } = param;
            if (isError) {
                // Handle error appropriately
                (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__.ApiError(error));
            } else if (isSuccess === true && data !== undefined) {
                // Dispatch action to set user information in the store
                dispatch((0,_Pimcore_modules_auth_user_user_slice__WEBPACK_IMPORTED_MODULE_2__.setUser)(data));
            }
        }).catch((err)=>{
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__.GeneralError('Error loading user information'));
            throw new Error('Error loading user information', {
                cause: err
            });
        });
    };
    return {
        loadUser
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
//# sourceMappingURL=js_src_core_mf-bootstrap_ts.2acb80baed6700f5.hot-update.js.map