"use strict";
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["js_src_core_modules_app_error-handler_error-handler_tsx-js_src_core_modules_app_error-handler-176acb"], {
"./js/src/core/modules/app/error-handler/classes/api-error.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DEFAULT_ERROR_CONTENT: () => (DEFAULT_ERROR_CONTENT),
  "default": () => (__WEBPACK_DEFAULT_EXPORT__)
});
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _Pimcore_modules_app_error_handler_constants_errorTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/app/error-handler/constants/errorTypes.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 

const DEFAULT_ERROR_CONTENT = 'Something went wrong.';
class ApiError extends Error {
    handleApiErrorDetails(errorData) {
        const errorKey = errorData === null || errorData === void 0 ? void 0 : errorData.errorKey;
        const errorMessage = errorData === null || errorData === void 0 ? void 0 : errorData.message;
        const errorValue = errorData === null || errorData === void 0 ? void 0 : errorData.error;
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(errorKey) && errorKey === _Pimcore_modules_app_error_handler_constants_errorTypes__WEBPACK_IMPORTED_MODULE_1__.ErrorKeyTypes.ELEMENT_VALIDATION_FAILED) {
            return {
                title: errorKey,
                errorKey: errorMessage
            };
        }
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(errorKey) && errorKey !== _Pimcore_modules_app_error_handler_constants_errorTypes__WEBPACK_IMPORTED_MODULE_1__.ErrorKeyTypes.GENERIC_ERROR) {
            return {
                errorKey: errorKey
            };
        }
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(errorMessage)) {
            return errorMessage;
        }
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(errorValue)) {
            return errorValue;
        }
    }
    getContent() {
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(this.errorData)) {
            var _this_errorData;
            if (!(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isEmpty)((_this_errorData = this.errorData) === null || _this_errorData === void 0 ? void 0 : _this_errorData.message)) {
                return this.errorData.message;
            }
            if ('data' in this.errorData) {
                const apiErrorDetails = this.handleApiErrorDetails(this.errorData.data);
                if (!(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(apiErrorDetails)) return apiErrorDetails;
            }
            if ('error' in this.errorData && (0,lodash__WEBPACK_IMPORTED_MODULE_0__.isString)(this.errorData.error)) {
                return this.errorData.error;
            }
        }
        return DEFAULT_ERROR_CONTENT;
    }
    constructor(errorData){
        super();
        this.errorData = errorData;
    }
}
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ApiError);

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
"./js/src/core/modules/app/error-handler/classes/general-error.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__WEBPACK_DEFAULT_EXPORT__)
});
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ class GeneralError extends Error {
    getContent() {
        return this.errorData;
    }
    constructor(message){
        super();
        this.errorData = message;
    }
}
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GeneralError);

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
"./js/src/core/modules/app/error-handler/components/api-error-view-ui.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ApiErrorViewUI: () => (ApiErrorViewUI)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _Pimcore_modules_app_error_handler_classes_api_error__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/app/error-handler/classes/api-error.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
var _s = $RefreshSig$();




const ApiErrorViewUI = (param)=>{
    let { errorContent } = param;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)();
    const getErrorKeyValue = ()=>{
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_3__.isString)(errorContent) && !(0,lodash__WEBPACK_IMPORTED_MODULE_3__.isUndefined)(errorContent === null || errorContent === void 0 ? void 0 : errorContent.errorKey)) {
            return t(`error.${errorContent.errorKey}`);
        }
        return _Pimcore_modules_app_error_handler_classes_api_error__WEBPACK_IMPORTED_MODULE_4__.DEFAULT_ERROR_CONTENT;
    };
    const textValue = (0,lodash__WEBPACK_IMPORTED_MODULE_3__.isString)(errorContent) ? errorContent : getErrorKeyValue();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: textValue
    }, void 0, false);
};
_s(ApiErrorViewUI, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation
    ];
});
_c = ApiErrorViewUI;
var _c;
$RefreshReg$(_c, "ApiErrorViewUI");

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
"./js/src/core/modules/app/error-handler/constants/errorTypes.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ErrorKeyTypes: () => (ErrorKeyTypes),
  ErrorTypes: () => (ErrorTypes)
});
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ /* In this file, we're keeping the unused data as documentation of what we have exactly. */ var ErrorTypes = /*#__PURE__*/ function(ErrorTypes) {
    ErrorTypes["API_ERROR"] = "API_ERROR";
    ErrorTypes["GENERAL_ERROR"] = "GENERAL_ERROR";
    return ErrorTypes;
}({});
var ErrorKeyTypes = /*#__PURE__*/ function(ErrorKeyTypes) {
    ErrorKeyTypes["GENERIC_ERROR"] = "error_something_generic_went_wrong";
    ErrorKeyTypes["ELEMENT_EXISTS"] = "error_element_exists";
    ErrorKeyTypes["FOLDER_EXISTS"] = "error_folder_exists";
    ErrorKeyTypes["INVALID_ARGUMENT"] = "error_invalid_argument";
    ErrorKeyTypes["WIDGET_NAME_MISSING"] = "error_widget_name_missing";
    ErrorKeyTypes["WIDGET_NAME_INVALID"] = "error_widget_name_invalid";
    ErrorKeyTypes["VALIDATION_FAILED"] = "error_validation_failed";
    ErrorKeyTypes["ELEMENT_VALIDATION_FAILED"] = "error_element_validation_failed";
    return ErrorKeyTypes;
}({});

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
"./js/src/core/modules/app/error-handler/error-handler.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__WEBPACK_DEFAULT_EXPORT__)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_modules_app_error_handler_services_error_modal_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/app/error-handler/services/error-modal-service.ts");
/* ESM import */var _Pimcore_modules_app_error_handler_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* ESM import */var _Pimcore_modules_app_error_handler_components_api_error_view_ui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/app/error-handler/components/api-error-view-ui.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 





const isGeneralError = (error)=>error instanceof _Pimcore_modules_app_error_handler_index__WEBPACK_IMPORTED_MODULE_4__.GeneralError;
const isApiError = (error)=>error instanceof _Pimcore_modules_app_error_handler_index__WEBPACK_IMPORTED_MODULE_4__.ApiError;
// Create a set to keep shown error content and avoid duplicates
const shownErrors = new Set();
const trackError = (data, handler)=>{
    const errorContent = data.getContent();
    if (shownErrors.has(errorContent)) {
        return;
    } else {
        shownErrors.add(errorContent);
    }
    // Set a timeout to clear the shownErrors after the current execution cycle
    setTimeout(()=>{
        // Clear the shownErrors after handling the error to allow future errors to be shown
        shownErrors.clear();
    }, 0);
    const getErrorContentValue = ()=>{
        return isApiError(data) ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_app_error_handler_components_api_error_view_ui__WEBPACK_IMPORTED_MODULE_5__.ApiErrorViewUI, {
            errorContent: errorContent
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/error-handler/error-handler.tsx",
            lineNumber: 48,
            columnNumber: 31
        }, undefined) : errorContent;
    };
    if (!(0,lodash__WEBPACK_IMPORTED_MODULE_2__.isUndefined)(handler)) {
        handler(getErrorContentValue());
    } else {
        // default handler
        _Pimcore_modules_app_error_handler_services_error_modal_service__WEBPACK_IMPORTED_MODULE_3__.ErrorModalService.showError({
            content: getErrorContentValue(),
            title: typeof errorContent === 'object' ? errorContent.title : null
        });
    }
    if (isGeneralError(data)) {
        throw new Error(errorContent);
    }
};
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = (trackError);

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
"./js/src/core/modules/app/error-handler/index.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ApiError: () => (/* reexport safe */ _classes_api_error__WEBPACK_IMPORTED_MODULE_1__["default"]),
  GeneralError: () => (/* reexport safe */ _classes_general_error__WEBPACK_IMPORTED_MODULE_2__["default"]),
  "default": () => (/* reexport safe */ _error_handler__WEBPACK_IMPORTED_MODULE_0__["default"])
});
/* ESM import */var _error_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/app/error-handler/error-handler.tsx");
/* ESM import */var _classes_api_error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/app/error-handler/classes/api-error.ts");
/* ESM import */var _classes_general_error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/app/error-handler/classes/general-error.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 



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
"./js/src/core/modules/app/error-handler/services/error-modal-service.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ErrorModalService: () => (ErrorModalService)
});
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
const ErrorModalService = (()=>{
    let modalInstance = null;
    const setModalInstance = (modal)=>{
        modalInstance = modal;
    };
    const showError = (param)=>{
        let { content, title } = param;
        if ((0,lodash__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(modalInstance)) {
            throw new Error('ErrorModalService: Modal instance is not set. Call setModalInstance first.');
        }
        modalInstance.error({
            content,
            title
        });
    };
    return {
        setModalInstance,
        showError
    };
})();

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
//# sourceMappingURL=js_src_core_modules_app_error-handler_error-handler_tsx-js_src_core_modules_app_error-handler-176acb.js.map