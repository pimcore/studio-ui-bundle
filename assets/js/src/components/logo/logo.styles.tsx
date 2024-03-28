import { createStyles } from 'antd-style'

export const useStlyes = createStyles(({ token, css }) => {
  return {
    logo: css`
      padding: 13px 16px 0 16px;
    `
  }
}, { hashPriority: 'low' })
