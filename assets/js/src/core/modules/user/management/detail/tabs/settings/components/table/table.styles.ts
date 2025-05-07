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
    table: css`
      .ant-table {
        .ant-table-tbody {
          
          .properties-table--actions-column {
            align-items: center;
            
            .ant-btn-icon {
              color: ${token.colorPrimary};
                
              &:hover {
                color: ${token.colorPrimaryHover};
              }
            }
          }
        }
      }
        
      .headline {
        padding: ${token.paddingXS}px;
        margin: 0;
      }
    `
  }
})
