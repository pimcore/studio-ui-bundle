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
"./js/src/core/components/select/select.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyles: () => (useStyles)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/antd-style/es/functions/index.js");
/* ESM import */var _Pimcore_utils_type_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/utils/type-utils.ts");
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

const ICON_WIDTH = 16;
const useStyles = (0,antd_style__WEBPACK_IMPORTED_MODULE_1__.createStyles)((param, props)=>{
    let { css, token } = param;
    return {
        selectContainer: css`
      position: relative;
      
      &:hover {
        .custom-select-icon {
          color: ${token.colorPrimary};
        }
      }
    `,
        // WARNING state
        selectContainerWarning: css`
      &:hover {
        .custom-select-icon {
          color: ${token.colorWarningHover} !important;
        }
      }
      
      .ant-select-status-warning {
        &.ant-select-open, &.ant-select-focused {
          .ant-select-selection-item {
            color: ${token.colorText};
          }

          .ant-select-arrow {
            color: ${token.colorWarningHover} !important;
          }
        }

        &:hover {
          .ant-select-selection-item {
            color: ${token.colorText};
          }

          .ant-select-arrow {
            color: ${token.colorWarningHover} !important;
          }
        }
       }
    `,
        // ERROR state
        selectContainerError: css`
      &:hover {
        .custom-select-icon {
          color: ${token.colorErrorHover} !important;
        }
      }
      
      .ant-select-status-error {
        &.ant-select-open, &.ant-select-focused {
          .ant-select-selection-item {
            color: ${token.colorText};
          }

          .ant-select-arrow {
            color: ${token.colorErrorHover} !important;
          }
        }

        &:hover {
          .ant-select-selection-item {
            color: ${token.colorText};
          }

          .ant-select-arrow {
            color: ${token.colorErrorHover} !important;
          }
        }
      }
    `,
        selectContainerWithClear: css`
      &:hover:not() {
        .ant-select-arrow {
          display: none;
        }
      }
    `,
        select: css`
      width: ${!(0,_Pimcore_utils_type_utils__WEBPACK_IMPORTED_MODULE_0__.isEmptyValue)(props.width) ? `${props.width}px` : 'initial'};
      
      .ant-select-selector {
        padding: 0 ${token.controlPaddingHorizontal}px !important;
      }

      .ant-select-arrow {
        color: ${token.colorIcon} !important;
      }

      // DEFAULT select
      &.ant-select-open, &.ant-select-focused {
        .ant-select-selection-item {
          color: ${token.colorPrimary};
        }

        .ant-select-arrow {
          color: ${token.colorPrimary} !important;
        }
      }

      &:hover {
        .ant-select-selection-item {
          color: ${token.colorPrimary};
        }

        .ant-select-arrow {
          color: ${token.colorPrimary} !important;
        }
      }

      // MULTIPLE select
      &.ant-select-multiple {
        &.ant-select {
          .ant-select-selector {
            padding: 2px ${token.controlPaddingHorizontal}px 2px ${token.paddingXXS}px !important;
          }
        }
        
        &:hover {
          .ant-select-selection-item {
            .ant-select-selection-item-content {
              color: ${token.colorText} !important;
            }
          }
        }
      }

      // DISABLED state
      &.ant-select.ant-select-disabled {
        .ant-select-selector {
          border-color: ${token.colorBorder} !important;
        }
        
        .ant-select-selection-item {
          color: ${token.colorTextDisabled};
        }

        .ant-select-arrow {
          color: ${token.colorTextDisabled} !important;
        }
        
        &.versionFieldItem {
          .ant-select-selection-item {
            color: ${token.colorText} !important;
          }
        }

        &.versionFieldItem:not(.versionFieldItemHighlight) {
          .ant-select-selector {
            border-color: transparent !important;
          }
        }

        &.versionFieldItemHighlight {
          .ant-select-selector {
            background-color: ${token.Colors.Brand.Warning.colorWarningBg} !important;
          }
        }
      }
      
      &.ant-select--inherited {
        .ant-select-selector {
        background: ${token.colorBgContainerDisabled} !important;
        color: ${token.colorTextDisabled};
        
        .ant-select-selection-item-remove .anticon {
          color: ${token.colorTextDisabled};
        }

        .ant-select-selection-item-content {
            color: ${token.colorTextDisabled} !important;
          }
        }
        
        &.ant-select-multiple {
          &:hover {
            .ant-select-selection-item {
              .ant-select-selection-item-content {
                color: ${token.colorTextDisabled} !important;
              }
            }
          }
        }
      }
    `,
        arrowIcon: css`
      pointer-events: none !important
    `,
        selectWithCustomIcon: css`
      &.ant-select {
        .ant-select-selector {
          padding: 0 ${token.controlPaddingHorizontal}px 0 ${token.controlPaddingHorizontal + ICON_WIDTH + token.marginXXS}px !important;
        }
      }
    `,
        customIcon: css`
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 1;
      color: ${token.colorIcon};
    `,
        customIconActive: css`
       color: ${token.colorPrimary} !important;
     `,
        customIconWarning: css`
       color: ${token.colorWarningHover};
     `,
        customIconError: css`
       color: ${token.colorErrorHover};
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
//# sourceMappingURL=js_src_core_mf-bootstrap_ts.7089715c66dcbe34.hot-update.js.map