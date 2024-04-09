import { createStyles } from 'antd-style'

export const useStyle = createStyles(({ token, css }) => {
  return {
    pagination: css`
      .ant-pagination .ant-pagination-item {
          height: unset;
      }  
    `
  }
}, { hashPriority: 'low' })
