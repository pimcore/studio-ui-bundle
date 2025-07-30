/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { createStyles } from 'antd-style'

export const useStyle = createStyles(({ token, css }) => {
  return {
    statisticsContainer: css`
      .statistics-list {
      }
        
        .statistic-bold {
          font-weight: ${token.fontWeightStrong};
          color: ${token.colorText};
        }
        
        &.errored {
          .statistic-value {
            color: ${token.colorError};
          }
        }
      }
    `,
    errorSection: css`
      margin-top: ${token.marginLG}px;
      
      .error-title {
        font-weight: ${token.fontWeightStrong};
        color: ${token.colorError};
        margin-bottom: ${token.marginMD}px;
        display: flex;
        align-items: center;
        gap: ${token.marginXS}px;
      }
      
      .error-list {
        background: ${token.colorErrorBg};
        border: 1px solid ${token.colorErrorBorder};
        border-radius: ${token.borderRadius}px;
        padding: ${token.paddingMD}px;
        max-height: 200px;
        overflow-y: auto;
        
        .error-item {
          padding: ${token.paddingXS}px 0;
          border-bottom: 1px solid ${token.colorErrorBorder};
          font-family: ${token.fontFamilyCode};
          font-size: ${token.fontSizeSM}px;
          
          &:last-child {
            border-bottom: none;
          }
          
          .error-line {
            font-weight: ${token.fontWeightStrong};
            color: ${token.colorError};
          }
          
          .error-message {
            color: ${token.colorErrorText};
            margin-left: ${token.marginXS}px;
          }
        }
      }
    `
  }
})
