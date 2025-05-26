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
"./js/src/core/modules/auth/hooks/use-is-authenticated.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useIsAuthenticated: () => (useIsAuthenticated)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/auth/user/user-api-slice-enhanced.ts");
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _auth_slice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/auth/auth-slice.ts");
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



const useIsAuthenticated = ()=>{
    const isAuthenticated = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_2__.useAppSelector)(_auth_slice__WEBPACK_IMPORTED_MODULE_3__.selectIsAuthenticated);
    const dispatch = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_2__.useAppDispatch)();
    const { isError, error, isSuccess, refetch } = (0,_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__.useUserGetCurrentInformationQuery)(undefined, {
        skip: isAuthenticated !== undefined
    });
    const recheck = ()=>{
        refetch();
    };
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (isError) {
            dispatch((0,_auth_slice__WEBPACK_IMPORTED_MODULE_3__.setAuthState)(false));
        }
        if (isSuccess) {
            dispatch((0,_auth_slice__WEBPACK_IMPORTED_MODULE_3__.setAuthState)(true));
        }
    }, [
        isError,
        isSuccess,
        error
    ]);
    return {
        isAuthenticated,
        recheck
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
//# sourceMappingURL=js_src_core_mf-bootstrap_ts.4a45038631b0f6ab.hot-update.js.map