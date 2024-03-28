import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ token, css }) => {
  return {
    title: css`
      .ant-space-item {
        display: flex;
        align-items: center;
      }
    `
  }
}, { hashPriority: 'low' })
