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

export const useStyles = createStyles(({ token, css }) => {
  return {
    grid: css`
      display: flex; 
      width: 100%;
      max-width: 100%;

      table {
        table-layout: fixed;
        width: auto;
        height: 0;
      }

      th {
        user-select: none;
      }

      th, td {
        line-height: 1.83;
        padding: ${token.Table.cellPaddingBlockSM}px ${token.Table.cellPaddingInlineSM}px;
      }

      &.ant-table-wrapper .ant-table.ant-table-small .ant-table-tbody>tr>td {
        padding: 0;
      }
        
      .ant-table-row-no-data {
        margin: 0;
        padding: ${token.paddingXS}px 0px ${token.paddingXS}px ${token.paddingXS}px;
      }

      .ant-table-cell {
        position: relative;
        border-left: 1px solid #F0F0F0;
        white-space: nowrap;
        text-overflow: ellipsis;

        &:last-of-type {
          border-right: 1px solid #F0F0F0;
        }
      }

      .ant-table-thead {
        position: sticky;
        top: 0;
        z-index: 1;
          
        .ant-table-cell {
          border-top: 1px solid #F0F0F0;
            
          &:first-of-type {
            border-left: 1px solid #F0F0F0;
            border-radius: 8px 0 0 0;
          }
          &:last-of-type {
            border-radius: 0 8px 0 0;
          }
        }
      }
        
      .ant-table-tbody {
        .ant-table-row:last-of-type {
          .ant-table-cell {
            &:first-of-type {
              border-radius: 0 0 0 8px;
            }
            &:last-of-type {
                border-radius: 0 0 8px 0;
            }
          }
        }
      }

      .grid__cell-content {
        display: flex;
        width: 100%;
        height: 100%;
      }

      .grid__cell-content > * {
        display: flex;
        width: 100%;
        height: 100%;
      }
    `
  }
}, { hashPriority: 'low' })
