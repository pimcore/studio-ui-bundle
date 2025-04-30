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

export const useStyles = createStyles(({ token, css }) => {
  return {
    workflowCard: css`
      .ant-card-head-title {
        display: flex !important;
        gap: 8px;
        font-size: 12px;
        align-items: center;
        
          p {
              margin: 0;
          }

        .ant-tag {
          background: ${token.colorFillSecondary};
          border: 1px solid ${token.colorBorder};
          cursor: pointer;
          height: 22px;
          display: flex;
          align-items: center;
          gap: 8px;
            
          &.color-inverted {
            border: transparent;
          }
            
          .ant-badge {              
            .ant-badge-status-dot {
              width: 6px;
              height: 6px;
              top: unset;
            }
          }
        }
      }

      .ant-card-body {
        overflow: auto;
      }
    `
  }
}, { hashPriority: 'low' })
