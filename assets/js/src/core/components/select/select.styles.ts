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

import { createStyles } from 'antd-style'

const ICON_WIDTH = 16

export const useStyles = createStyles(({ css, token }) => {
  return {
    selectContainer: css`
      position: relative;
      
      &:hover, &:focus {
        .pimcore-icon {
          color: ${token.colorPrimary} !important;
        }
      }
    `,

    select: css`
      .ant-select-selector {
        padding: 0 ${token.controlPaddingHorizontal}px !important;
      }

      .ant-select-arrow {
        color: ${token.colorIcon} !important;
      }

      // DEFAULT select
      &.ant-select-open, &.ant-select-focused {
        .ant-select-selection-item,
        .ant-select-selection-placeholder {
          color: ${token.colorPrimary} !important;
        }

        .ant-select-arrow {
          color: ${token.colorPrimary} !important;
        }
      }

      &:hover {
        .ant-select-selection-item,
        .ant-select-selection-placeholder {
          color: ${token.colorPrimary} !important;
        }

        .ant-select-arrow {
          color: ${token.colorPrimary} !important;
        }
      }

      // MULTIPLE select
      &.ant-select-multiple {
        .ant-select-selection-placeholder {
          color: ${token.colorTextPlaceholder} !important;
        }
        
        &:hover {
          .ant-select-selection-item {
            .ant-select-selection-item-content {
              color: ${token.colorText} !important;
            }
          }
        }
      }

      // SEARCH select
      &.ant-select-show-search {
        .ant-select-selection-placeholder {
          color: ${token.colorTextPlaceholder} !important;
        }
      }

      // WARNING state
      &.ant-select-status-warning {
        &.ant-select-open, &.ant-select-focused {
          .ant-select-selection-item,
          .ant-select-selection-placeholder {
            color: ${token.colorText} !important;
          }

          .ant-select-arrow {
            color: ${token.colorWarningHover} !important;
          }
        }
        
        &.ant-select-show-search, &.ant-select-multiple {
          &:hover {
            .ant-select-selection-placeholder {
              color: ${token.colorTextPlaceholder} !important;
            }
          }
        }
        
        &:hover {
          .ant-select-selection-item,
          .ant-select-selection-placeholder {
            color: ${token.colorText} !important;
          }

          .ant-select-arrow {
            color: ${token.colorWarningHover} !important;
          }
        }
      }

      // ERROR state
      &.ant-select-status-error {
        &.ant-select-open, &.ant-select-focused {
          .ant-select-selection-item,
          .ant-select-selection-placeholder {
            color: ${token.colorText} !important;
          }

          .ant-select-arrow {
            color: ${token.colorErrorHover} !important;
          }
        }

        &.ant-select-show-search, &.ant-select-multiple {
          &:hover {
            .ant-select-selection-placeholder {
              color: ${token.colorTextPlaceholder} !important;
            }
          }
        }

        &:hover {
          .ant-select-selection-item,
          .ant-select-selection-placeholder {
            color: ${token.colorText} !important;
          }

          .ant-select-arrow {
            color: ${token.colorErrorHover} !important;
          }
        }
      }

      // DISABLED state
      &.ant-select.ant-select-disabled {
        .ant-select-selector {
          border-color: ${token.colorBorder} !important;
        }
        
        .ant-select-selection-item,
        .ant-select-selection-placeholder {
          color: ${token.colorTextDisabled} !important;
        }

        .ant-select-arrow {
          color: ${token.colorTextDisabled} !important;
        }
      }
    `,

    arrowIcon: css`
      pointer-events: none !important
    `,

    selectWithCustomIcon: css`
      .ant-select-selector {
        padding: 0 ${token.controlPaddingHorizontal}px 0 ${token.controlPaddingHorizontal + ICON_WIDTH + token.marginXXS}px !important;
      }
    `,

    customIcon: css`
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 1;
    `,

    customIconActive: css`
      color: ${token.colorPrimary} !important;
    `
  }
})
