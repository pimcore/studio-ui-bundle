import { createStyles } from 'antd-style'

export const useStyle = createStyles(({ token, css }) => {
  return {
    editor: css`
      height: 100%;
      width: 100%;
    `
  }
}, { hashPriority: 'low' })
