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

export const useStyles = createStyles(({ css, token }) => {
  return {
    table: css`
      .ant-table-content {
        
        .schedule-table--actions-column {
          display: flex;
          align-items: center;
  
          .ant-btn-icon {
            color: ${token.colorPrimary};
  
              &:hover {
                color: ${token.colorPrimaryHover};
              }
          }
        }
      }
    `
  }
})
