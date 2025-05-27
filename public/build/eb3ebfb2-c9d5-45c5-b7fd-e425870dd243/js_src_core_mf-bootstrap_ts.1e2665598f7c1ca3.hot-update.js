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
"./js/src/core/components/form/numbered-list/form-item/numbered-form-item-control.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  NumberedFormItemControl: () => (NumberedFormItemControl)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _provider_numbered_list_use_numbered_list__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/form/numbered-list/provider/numbered-list/use-numbered-list.ts");
/* ESM import */var _item_provider_item_use_item__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/form/item/provider/item/use-item.ts");
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



const NumberedFormItemControl = (param)=>{
    let { children, onChange: baseOnChange, value: baseValue, ...props } = param;
    _s();
    const { operations, getAdditionalComponentProps } = (0,_provider_numbered_list_use_numbered_list__WEBPACK_IMPORTED_MODULE_2__.useNumberedList)();
    const { name } = (0,_item_provider_item_use_item__WEBPACK_IMPORTED_MODULE_3__.useItem)();
    const Child = react__WEBPACK_IMPORTED_MODULE_1__.Children.only(children);
    const value = operations.getValue(name);
    console.log('----->>>>>>> name: ', name);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        operations.update(name, value ?? null, true);
    }, []);
    const onChange = (value)=>{
        if ((value === null || value === void 0 ? void 0 : value.target) !== undefined && typeof value.target === 'object') {
            operations.update(name, value.target.value, false);
            return;
        }
        operations.update(name, value, false);
    };
    if (!/*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.isValidElement)(Child)) {
        throw new Error('NumberedFormItemControl only accepts a single child');
    }
    const Component = Child.type;
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {
            ...Child.props,
            ...props,
            ...getAdditionalComponentProps === null || getAdditionalComponentProps === void 0 ? void 0 : getAdditionalComponentProps(name),
            onChange: onChange,
            value: value
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/form/numbered-list/form-item/numbered-form-item-control.tsx",
            lineNumber: 52,
            columnNumber: 5
        }, undefined), [
        Child.props,
        props,
        value
    ]);
};
_s(NumberedFormItemControl, "RIrdwSxkcjTHP39A/E5veP5ldKE=", false, function() {
    return [
        _provider_numbered_list_use_numbered_list__WEBPACK_IMPORTED_MODULE_2__.useNumberedList,
        _item_provider_item_use_item__WEBPACK_IMPORTED_MODULE_3__.useItem
    ];
});
_c = NumberedFormItemControl;
var _c;
$RefreshReg$(_c, "NumberedFormItemControl");

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
//# sourceMappingURL=js_src_core_mf-bootstrap_ts.1e2665598f7c1ca3.hot-update.js.map