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

export const useStyles = createStyles(({ css, token }) => {
  return {
    select: css`
      .ant-select-selector {
        padding: 0 ${token.controlPaddingHorizontal}px !important;
      }

      .ant-select-arrow {
        color: ${token.colorIcon} !important;
      }

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

      // disabled state
      &.ant-select-disabled {
        .ant-select-selection-item,
        .ant-select-selection-placeholder {
          color: ${token.colorTextDisabled} !important;
        }

        .ant-select-arrow {
          color: ${token.colorTextDisabled} !important;
        }
      }

      // warning state
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

      // error state
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
    `,

    arrowIcon: css`
      pointer-events: none !important
    `
  }
})
