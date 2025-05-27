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
"./js/src/core/app/store/middleware/rtkQueryErrorLogger.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  rtkQueryErrorLogger: () => (rtkQueryErrorLogger)
});
/* ESM import */var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs");
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
// Cannot use directly from the slice
// Middleware doesn't have direct access to the state management logic defined in slices
const initialState = {
    id: 0,
    username: '',
    email: '',
    firstname: '',
    lastname: '',
    permissions: [],
    isAdmin: false,
    classes: [],
    docTypes: [],
    language: 'en',
    activePerspective: '0',
    perspectives: [],
    dateTimeLocale: '',
    welcomeScreen: false,
    memorizeTabs: false,
    hasImage: false,
    contentLanguages: [],
    keyBindings: []
};
const rtkQueryErrorLogger = (api)=>(next)=>(action)=>{
            // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
            if ((0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.isRejectedWithValue)(action)) {
                var _action_meta;
                const payload = action.payload;
                const actionMetaArgs = (_action_meta = action.meta) === null || _action_meta === void 0 ? void 0 : _action_meta.arg;
                // Handle the case when the user's session has expired and further requests return a 401 status.
                // @todo - check if we can bind it to another endpoint that is specific to the user session
                if ((payload === null || payload === void 0 ? void 0 : payload.status) === 401) {
                    if ('endpointName' in actionMetaArgs && actionMetaArgs.endpointName === 'userGetCurrentInformation') {
                        return next(action);
                    }
                    api.dispatch({
                        type: 'auth/setUser',
                        payload: initialState
                    });
                    api.dispatch({
                        type: 'authentication/setAuthState',
                        payload: false
                    });
                    // Need to prevent further handling of the error to avoid triggering the error boundary etc.
                    return;
                }
            }
            return next(action);
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
//# sourceMappingURL=js_src_core_mf-bootstrap_ts.929b9add8325228c.hot-update.js.map