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

      &.ant-table-wrapper .ant-table-container table>thead>tr:first-child >*:first-child {
        border-start-start-radius: 0;
      }

      &.ant-table-wrapper .ant-table-container table>thead>tr:first-child >*:last-child {
        border-start-end-radius: 0;
      }

      &.ant-table-wrapper .ant-table.ant-table-small .ant-table-tbody>tr>td {
        padding: 0;
      }

      .ant-table-cell {
        position: relative;
        border-left: 1px solid #F0F0F0;
        white-space: nowrap;
        text-overflow: ellipsis;

        &:first-of-type {
          border-left: 0;
        }

        &:last-of-type {
          border-right: 1px solid #F0F0F0;
        }
      }

      .ant-table-thead {
        position: sticky;
        top: 0;
        z-index: 1;
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
