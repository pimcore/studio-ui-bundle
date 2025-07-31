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
        padding-top: 10px;
        padding-left: 5px;
      }
        
      .statistic-normal {
        padding-right: 28px;
        width: 60px;
      }

      .statistic-bold {
        font-weight: ${token.fontWeightStrong};
        color: ${token.colorText};
        padding-right: 12px;
        width: 60px;
      }
      
      .statistic-item.errored {
        color: ${token.colorError};
        
        .statistic-bold {
          color: ${token.colorError};
        }
      }
    `,
    errorSection: css`
      margin-top: ${token.marginXS}px;
      
      .error-list {
        background: ${token.colorErrorBg};
        border: 1px solid ${token.colorErrorBorder};
        border-radius: ${token.borderRadius}px;
        max-height: 200px;
        overflow-y: auto;
    

    .error-item {
        padding: ${token.paddingXS}px 0;
        border-bottom: 1px solid ${token.colorErrorBorder};
          
        .pimcore-icon.pimcore-icon-alert.anticon.error-icon {
        margin: 3px;
        margin-left: 10px;
        margin-right: 5px;
        color: ${token.colorError};

        }

          &:last-child {
            border-bottom: none;
          }
          
          .error-line {
            font-weight: ${token.fontWeightStrong};
            width: 50px;
          }
          
          .error-message {
            margin-left: ${token.marginXS}px;
            margin-right: 8px;
          }
        }
      }
    `
  }
})
