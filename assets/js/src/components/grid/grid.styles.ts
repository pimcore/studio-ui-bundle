import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ token, css }) => {
  return {
    grid: css`
      table {
        table-layout: auto;
      }

      .ant-table-cell {
        border-left: 1px solid #F0F0F0;

        &:first-of-type {
          border-left: 0;
        }
      }
    `
  }
})
