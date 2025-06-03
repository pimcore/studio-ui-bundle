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
"./js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/object-component.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ObjectComponent: () => (ObjectComponent)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _layout_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/layout-component.tsx");
/* ESM import */var _data_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/data-component.tsx");
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



const ObjectComponent = (props)=>{
    _s();
    const { dataType, datatype } = props;
    const currentDataType = dataType ?? datatype;
    const renderNode = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (currentDataType === 'data') {
            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_data_component__WEBPACK_IMPORTED_MODULE_3__.DataComponent, {
                ...props,
                noteditable: props.noteditable
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/object-component.tsx",
                lineNumber: 36,
                columnNumber: 9
            }, undefined);
        }
        if (currentDataType === 'layout') {
            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_layout_component__WEBPACK_IMPORTED_MODULE_2__.LayoutComponent, {
                ...props,
                noteditable: props.noteditable
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/object-component.tsx",
                lineNumber: 45,
                columnNumber: 9
            }, undefined);
        }
    }, [
        props
    ]);
    if (renderNode === undefined) {
        throw new Error(`Unknown datatype: ${currentDataType}`);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: renderNode
    }, void 0, false);
};
_s(ObjectComponent, "E221tZGqYJwoYbIj5q5UFQ1CGew=");
_c = ObjectComponent;
var _c;
$RefreshReg$(_c, "ObjectComponent");

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
//# sourceMappingURL=js_src_core_mf-bootstrap_ts.1fcabce807a875e4.hot-update.js.map