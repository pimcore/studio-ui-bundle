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
(self["chunk_pimcore_studio_ui_bundle "] = self["chunk_pimcore_studio_ui_bundle "] || []).push([["__federation_expose_modules__auth"], {
"./js/src/core/modules/auth/util/user-helper.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  getCurrentUser: () => (getCurrentUser)
});
/* import */ var _Pimcore_app_store__rspack_import_0 = __webpack_require__("./js/src/core/app/store/index.ts");
/* import */ var _user_user_slice__rspack_import_1 = __webpack_require__("./js/src/core/modules/auth/user/user-slice.ts");
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

const getCurrentUser = ()=>{
    const user = (0,_user_user_slice__rspack_import_1.selectCurrentUser)(_Pimcore_app_store__rspack_import_0.store.getState());
    if (user.id === 0) {
        console.warn('getCurrentUser() returned the system user (id 0). This usually means it was ' + 'called before the current user was loaded, e.g. during a module\'s onInit(). ' + 'Read the user inside a component instead, for example via the useUser() hook.');
    }
    return user;
};

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/sdk/modules/auth/index.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  UserPermission: () => (/* reexport safe */ _Pimcore_modules_auth_enums_user_permission__rspack_import_0.UserPermission),
  getCurrentUser: () => (/* reexport safe */ _Pimcore_modules_auth_util_user_helper__rspack_import_4.getCurrentUser),
  isAllowed: () => (/* reexport safe */ _Pimcore_modules_auth_permission_helper__rspack_import_1.isAllowed),
  useIsAuthenticated: () => (/* reexport safe */ _Pimcore_modules_auth_hooks_use_is_authenticated__rspack_import_3.useIsAuthenticated),
  useUser: () => (/* reexport safe */ _Pimcore_modules_auth_hooks_use_user__rspack_import_2.useUser)
});
/* import */ var _Pimcore_modules_auth_enums_user_permission__rspack_import_0 = __webpack_require__("./js/src/core/modules/auth/enums/user-permission.ts");
/* import */ var _Pimcore_modules_auth_permission_helper__rspack_import_1 = __webpack_require__("./js/src/core/modules/auth/permission-helper.ts");
/* import */ var _Pimcore_modules_auth_hooks_use_user__rspack_import_2 = __webpack_require__("./js/src/core/modules/auth/hooks/use-user.ts");
/* import */ var _Pimcore_modules_auth_hooks_use_is_authenticated__rspack_import_3 = __webpack_require__("./js/src/core/modules/auth/hooks/use-is-authenticated.ts");
/* import */ var _Pimcore_modules_auth_util_user_helper__rspack_import_4 = __webpack_require__("./js/src/core/modules/auth/util/user-helper.ts");
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






function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},

}]);
//# sourceMappingURL=__federation_expose_modules__auth.js.map