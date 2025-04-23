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
import { isEmptyValue } from '@Pimcore/utils/type-utils'

interface StylesProps {
  width?: number
}

const ICON_WIDTH = 16

export const useStyles = createStyles(({ css, token }, props: StylesProps) => {
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
      &:hover {
        .ant-select-arrow {
          display: none;
        }
      }
    `,

    select: css`
      width: ${!isEmptyValue(props.width) ? `${props.width}px` : 'initial'};
      
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
  }
})
