import { createStyles } from 'antd-style'

export const useStyle = createStyles(({ token, css }) => {
  return {
    example: css`
      color: ${token.Example.color};
    `
  }
}, { hashPriority: 'low' })
