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
"./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/input-quantity-value/input-quantity-value.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyles: () => (useStyles)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/antd-style/es/functions/index.js");
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
const useStyles = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param)=>{
    let { css, token } = param;
    return {
        container: css`
      &.versionFieldItem {
        .ant-select-disabled,
        .ant-input-disabled {
          width: 100%;
          max-width: 100% !important;
        }

        .ant-select-disabled .ant-select-selection-item,
        .ant-input-disabled {
          color: ${token.colorText} !important;
        }

        .ant-select.ant-select-disabled .ant-select-selector,
        .ant-input-disabled {
          border-color: transparent !important;
        }
      }

      &.versionFieldItemHighlight {
        .ant-select-disabled .ant-select-selector,
        .ant-input-disabled {
          background-color: ${token.Colors.Brand.Warning.colorWarningBg} !important;
        }

        .ant-select.ant-select-disabled .ant-select-selector,
        .ant-input-disabled {
          border-color: ${token.colorBorder} !important;
        }
      }
    `,
        select: css`
       min-width: 100px;
    `,
        input: css`
      min-width: 80px;
    `
    };
});

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
//# sourceMappingURL=js_src_core_mf-bootstrap_ts.d5fd6dfeb4ad791f.hot-update.js.map