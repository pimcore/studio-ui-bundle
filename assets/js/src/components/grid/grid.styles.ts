import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ token, css }) => {
  return {
    grid: css`
      table {
        table-layout: fixed;
        width: auto;
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

      .grid__cell-content {
        display: block; 
        width: fit-content;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
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
    `
  }
}, { hashPriority: 'low' })
