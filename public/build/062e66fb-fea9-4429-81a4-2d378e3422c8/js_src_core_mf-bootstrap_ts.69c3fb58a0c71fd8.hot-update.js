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
"./js/src/core/components/login-form/login-form.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  LoginForm: () => (LoginForm)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/button/button.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _Pimcore_components_login_form_login_form_style__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/login-form/login-form-style.tsx");
/* ESM import */var react_redux__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./node_modules/react-redux/dist/react-redux.mjs");
/* ESM import */var _Pimcore_components_message_useMessage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/message/useMessage/index.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_modules_auth_user_user_slice__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/auth/user/user-slice.ts");
/* ESM import */var _icon_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _Pimcore_modules_auth_authorization_api_slice_gen__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/auth/authorization-api-slice.gen.ts");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
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



// import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons-old'








const LoginForm = (param)=>{
    let { additionalLogins } = param;
    _s();
    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_11__.useDispatch)();
    const { styles } = (0,_Pimcore_components_login_form_login_form_style__WEBPACK_IMPORTED_MODULE_4__.useStyle)();
    const messageApi = (0,_Pimcore_components_message_useMessage__WEBPACK_IMPORTED_MODULE_5__.useMessage)();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_6__.useTranslation)();
    const [formState, setFormState] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)({
        username: '',
        password: ''
    });
    const [login] = (0,_Pimcore_modules_auth_authorization_api_slice_gen__WEBPACK_IMPORTED_MODULE_9__.useLoginMutation)();
    // Use manual isLoading state because the rtkQueryErrorLogger prevents this action on 401 error
    const [isLoginLoading, setIsLoginLoading] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const handleAuthentication = async (event)=>{
        const loginTask = login({
            credentials: formState
        });
        setIsLoginLoading(true);
        loginTask.catch((error)=>{
            setIsLoginLoading(false);
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_10__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_10__.ApiError(error));
        });
        try {
            event.preventDefault();
            const response = await loginTask;
            if (response.error !== undefined) {
                (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_10__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_10__.ApiError(response.error));
            }
            setIsLoginLoading(false);
            const userInformation = response.data;
            dispatch((0,_Pimcore_modules_auth_user_user_slice__WEBPACK_IMPORTED_MODULE_7__.setUser)(userInformation));
        } catch (e) {
            setIsLoginLoading(false);
            await messageApi.error({
                content: e.message
            });
        }
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: styles.form,
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("form", {
                onSubmit: handleAuthentication,
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_1__.Input, {
                        onChange: (e)=>{
                            setFormState({
                                ...formState,
                                username: e.target.value
                            });
                        },
                        placeholder: t('login-form.username'),
                        prefix: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_icon_icon__WEBPACK_IMPORTED_MODULE_8__.Icon, {
                            value: "user"
                        }, void 0, false, {
                            fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
                            lineNumber: 86,
                            columnNumber: 20
                        }, void 0)
                    }, void 0, false, {
                        fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_1__.Input.Password, {
                        // iconRender={ (visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />) }
                        onChange: (e)=>{
                            setFormState({
                                ...formState,
                                password: e.target.value
                            });
                        },
                        placeholder: t('login-form.password')
                    }, void 0, false, {
                        fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                        className: 'flex-space',
                        children: [
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_1__.Checkbox, {
                                "aria-label": t('aria.login-form-additional-logins.remember-me-checkbox'),
                                children: t('login-form.remember-me')
                            }, void 0, false, {
                                fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
                                lineNumber: 94,
                                columnNumber: 11
                            }, undefined),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
                                type: 'link',
                                children: t('login-form.forgot-password')
                            }, void 0, false, {
                                fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
                                lineNumber: 99,
                                columnNumber: 11
                            }, undefined)
                        ]
                    }, void 0, true, {
                        fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
                        lineNumber: 93,
                        columnNumber: 9
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
                        htmlType: "submit",
                        loading: isLoginLoading,
                        type: "primary",
                        children: t('login-form.login')
                    }, void 0, false, {
                        fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, undefined),
            Array.isArray(additionalLogins) && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                className: 'login__additional-logins',
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
                        children: t('login-form-additional-logins.or')
                    }, void 0, false, {
                        fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
                        lineNumber: 113,
                        columnNumber: 11
                    }, undefined),
                    additionalLogins === null || additionalLogins === void 0 ? void 0 : additionalLogins.map((login)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
                            "aria-label": `${t('aria.login-form-additional-logins.additional-login-provider')} ${login.name}`,
                            href: login.link,
                            type: 'primary',
                            children: login.name
                        }, login.key, false, {
                            fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
                            lineNumber: 116,
                            columnNumber: 13
                        }, undefined))
                ]
            }, void 0, true, {
                fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
                lineNumber: 112,
                columnNumber: 9
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/home/cfeldkirchner/studio-demo/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
        lineNumber: 81,
        columnNumber: 5
    }, undefined);
};
_s(LoginForm, "CsDoDMTmXQTwhQhmd7BAY+8uG5o=", false, function() {
    return [
        react_redux__WEBPACK_IMPORTED_MODULE_11__.useDispatch,
        _Pimcore_components_login_form_login_form_style__WEBPACK_IMPORTED_MODULE_4__.useStyle,
        _Pimcore_components_message_useMessage__WEBPACK_IMPORTED_MODULE_5__.useMessage,
        react_i18next__WEBPACK_IMPORTED_MODULE_6__.useTranslation,
        _Pimcore_modules_auth_authorization_api_slice_gen__WEBPACK_IMPORTED_MODULE_9__.useLoginMutation
    ];
});
_c = LoginForm;
var _c;
$RefreshReg$(_c, "LoginForm");

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
//# sourceMappingURL=js_src_core_mf-bootstrap_ts.69c3fb58a0c71fd8.hot-update.js.map