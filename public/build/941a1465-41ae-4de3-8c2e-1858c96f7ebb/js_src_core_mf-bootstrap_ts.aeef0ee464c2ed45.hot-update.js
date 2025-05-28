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
"./js/src/core/modules/data-object/editor/shared-tab-manager/tabs/versions/components/data-component/data-component.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DataComponent: () => (DataComponent)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/app/depency-injection/index.ts");
/* ESM import */var _Pimcore_app_config_services_service_ids__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/app/config/services/service-ids.ts");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var _Pimcore_modules_app_error_boundary_error_boundary__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/app/error-boundary/error-boundary.tsx");
/* ESM import */var _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_providers_field_width_use_field_width__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/use-field-width.tsx");
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






const DataComponent = (props)=>{
    _s();
    const { fieldType, fieldtype } = props;
    const objectDataRegistry = (0,_Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_2__.useInjection)(_Pimcore_app_config_services_service_ids__WEBPACK_IMPORTED_MODULE_3__.serviceIds["DynamicTypes/ObjectDataRegistry"]);
    const fieldWidth = (0,_Pimcore_modules_element_dynamic_types_definitions_objects_data_related_providers_field_width_use_field_width__WEBPACK_IMPORTED_MODULE_6__.useFieldWidth)();
    const currentFieldType = fieldType ?? fieldtype ?? 'unknown';
    if (!objectDataRegistry.hasDynamicType(currentFieldType)) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_4__.Alert, {
            message: `Unknown data type: ${currentFieldType}`,
            type: "warning"
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/shared-tab-manager/tabs/versions/components/data-component/data-component.tsx",
            lineNumber: 37,
            columnNumber: 7
        }, undefined);
    }
    const objectDataType = objectDataRegistry.getDynamicType(currentFieldType);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_app_error_boundary_error_boundary__WEBPACK_IMPORTED_MODULE_5__["default"], {
        children: objectDataType.getVersionObjectDataComponent({
            ...props,
            defaultFieldWidth: fieldWidth
        })
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/shared-tab-manager/tabs/versions/components/data-component/data-component.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, undefined);
};
_s(DataComponent, "8zGH3gVumWibPJG+8Z1SOSvWwEI=", false, function() {
    return [
        _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_2__.useInjection,
        _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_providers_field_width_use_field_width__WEBPACK_IMPORTED_MODULE_6__.useFieldWidth
    ];
});
_c = DataComponent;
var _c;
$RefreshReg$(_c, "DataComponent");

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
//# sourceMappingURL=js_src_core_mf-bootstrap_ts.aeef0ee464c2ed45.hot-update.js.map