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

export const useStyle = createStyles(({ token, css }) => {
  return {
    table: css`
      .ant-table {
          
        .ant-table-cell {
          .grid__cell-content {
            >div:first-of-type {
              padding: 4px;
            }
          }
        }
          
        .custom-metadata-table--actions-column,
        [data-grid-column="custom-metadata-table--data-column"] {
          align-items: center;
        }
          
        [data-grid-column="custom-metadata-table--language-column"] {
            align-items: center;
            
            >div:first-of-type {
              flex-grow: 1;
              align-items: center;

              .ant-select {
                width: 100%;
              }
            }
        }
      }
    `
  }
})
