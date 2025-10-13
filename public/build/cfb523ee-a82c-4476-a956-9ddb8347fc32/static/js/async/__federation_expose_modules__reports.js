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
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["__federation_expose_modules__reports"], {
"./js/src/core/modules/reports/reports-editor/types.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
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
"./js/src/sdk/modules/reports/index.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DynamicTypeCustomReportDefinitionAbstract: () => (/* reexport safe */ _Pimcore_modules_reports_dynamic_types_definitions_custom_report_definition_adapters_dynamic_type_custom_report_definition_abstract__WEBPACK_IMPORTED_MODULE_1__.DynamicTypeCustomReportDefinitionAbstract),
  DynamicTypeCustomReportDefinitionRegistry: () => (/* reexport safe */ _Pimcore_modules_reports_dynamic_types_definitions_custom_report_definition_adapters_dynamic_type_custom_report_definition_registry__WEBPACK_IMPORTED_MODULE_0__.DynamicTypeCustomReportDefinitionRegistry),
  ReportsApiSlice: () => (/* reexport module object */ _Pimcore_modules_reports_custom_reports_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_4__),
  useReportFormState: () => (/* reexport safe */ _Pimcore_modules_reports_reports_editor_hooks_use_report_form_state__WEBPACK_IMPORTED_MODULE_3__.useReportFormState)
});
/* ESM import */var _Pimcore_modules_reports_dynamic_types_definitions_custom_report_definition_adapters_dynamic_type_custom_report_definition_registry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/reports/dynamic-types/definitions/custom-report-definition-adapters/dynamic-type-custom-report-definition-registry.ts");
/* ESM import */var _Pimcore_modules_reports_dynamic_types_definitions_custom_report_definition_adapters_dynamic_type_custom_report_definition_abstract__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/reports/dynamic-types/definitions/custom-report-definition-adapters/dynamic-type-custom-report-definition-abstract.tsx");
/* ESM import */var _Pimcore_modules_reports_reports_editor_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/reports/reports-editor/types.ts");
/* ESM import */var _Pimcore_modules_reports_reports_editor_hooks_use_report_form_state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/reports/reports-editor/hooks/use-report-form-state.ts");
/* ESM import */var _Pimcore_modules_reports_custom_reports_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/reports/custom-reports-api-slice-enhanced.ts");
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
"./js/src/core/modules/element/dynamic-types/registry/dynamic-type-registry-abstract.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DynamicTypeAbstract: () => (DynamicTypeAbstract),
  DynamicTypeRegistryAbstract: () => (DynamicTypeRegistryAbstract)
});
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(inversify__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
var _dec, _class, _dec2, _class2;
function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[r] = t, e;
}
function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != typeof i) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 

let DynamicTypeAbstract = (_dec = (0,inversify__WEBPACK_IMPORTED_MODULE_0__.injectable)(), _dec(_class = class DynamicTypeAbstract {
    constructor(){
        _defineProperty(this, "id", void 0);
    }
}) || _class);
let DynamicTypeRegistryAbstract = (_dec2 = (0,inversify__WEBPACK_IMPORTED_MODULE_0__.injectable)(), _dec2(_class2 = class DynamicTypeRegistryAbstract {
    registerDynamicType(type) {
        if (this.dynamicTypes.has(type.id)) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__.GeneralError(`Dynamic type with id "${type.id}" already exists`));
        }
        this.dynamicTypes.set(type.id, type);
    }
    getDynamicType(id) {
        let throwException = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
        const dynamicType = this.dynamicTypes.get(id);
        if (dynamicType === undefined && throwException) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__.GeneralError(`Dynamic type with id "${id}" not found`));
        }
        return dynamicType;
    }
    getDynamicTypes() {
        return Array.from(this.dynamicTypes.values());
    }
    overrideDynamicType(type) {
        if (!this.dynamicTypes.has(type.id)) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__.GeneralError(`Dynamic type with id "${type.id}" not found`));
        }
        this.dynamicTypes.set(type.id, type);
    }
    hasDynamicType(id) {
        return this.dynamicTypes.has(id);
    }
    constructor(){
        _defineProperty(this, "dynamicTypes", new Map());
    }
}) || _class2);

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
//# sourceMappingURL=__federation_expose_modules__reports.js.map