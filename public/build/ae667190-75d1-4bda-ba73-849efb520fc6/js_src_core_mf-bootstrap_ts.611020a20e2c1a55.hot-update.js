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
"./js/src/core/components/button/button.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Button: () => (Button)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var framer_motion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/framer-motion/framer-motion");
/* ESM import */var framer_motion__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(framer_motion__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/classnames/classnames");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var _spin_spin__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/spin/spin.tsx");
/* ESM import */var _button_styles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/button/button.styles.tsx");
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






const Component = (param, ref)=>{
    let { loading, children, className, type, color, ...props } = param;
    _s();
    const buttonRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const { styles } = (0,_button_styles__WEBPACK_IMPORTED_MODULE_6__.useStyles)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useImperativeHandle)(ref, ()=>buttonRef.current);
    const buttonClassNames = classnames__WEBPACK_IMPORTED_MODULE_4___default()('button', `button--type-${type}`, `button--color-${color}`, styles.button, {
        'ant-btn-loading': loading
    }, className);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (loading === true && buttonRef.current !== null) {
            buttonRef.current.style.width = buttonRef.current.getBoundingClientRect().width + 'px';
            buttonRef.current.style.height = buttonRef.current.getBoundingClientRect().height + 'px';
        }
        return ()=>{
            if (loading === true && buttonRef.current !== null) {
                buttonRef.current.style.width = '';
                buttonRef.current.style.height = '';
            }
        };
    }, [
        loading
    ]);
    console.log('=====>>> props: ', props === null || props === void 0 ? void 0 : props.variant);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Button, {
        className: buttonClassNames,
        ref: buttonRef,
        type: type === 'action' ? undefined : type,
        ...props,
        color: color === 'secondary' ? undefined : color,
        children: [
            loading === true ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(framer_motion__WEBPACK_IMPORTED_MODULE_3__.AnimatePresence, {
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(framer_motion__WEBPACK_IMPORTED_MODULE_3__.motion.div, {
                    animate: {
                        opacity: 1
                    },
                    className: "button__loading-spinner",
                    exit: {
                        opacity: 0
                    },
                    initial: {
                        opacity: 0
                    },
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_spin_spin__WEBPACK_IMPORTED_MODULE_5__.Spin, {
                        size: "small",
                        spinning: true
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/button/button.tsx",
                        lineNumber: 76,
                        columnNumber: 15
                    }, undefined)
                }, 'loading', false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/button/button.tsx",
                    lineNumber: 69,
                    columnNumber: 13
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/button/button.tsx",
                lineNumber: 68,
                columnNumber: 11
            }, undefined) : null,
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                className: 'button__text',
                children: children
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/button/button.tsx",
                lineNumber: 85,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/button/button.tsx",
        lineNumber: 59,
        columnNumber: 5
    }, undefined);
};
_s(Component, "FRFsMY1hSM1bD5hMIfIKFcdXRcY=", false, function() {
    return [
        _button_styles__WEBPACK_IMPORTED_MODULE_6__.useStyles
    ];
});
_c = Component;
const Button = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().forwardRef(Component);
_c1 = Button;
var _c, _c1;
$RefreshReg$(_c, "Component");
$RefreshReg$(_c1, "Button");

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
//# sourceMappingURL=js_src_core_mf-bootstrap_ts.611020a20e2c1a55.hot-update.js.map