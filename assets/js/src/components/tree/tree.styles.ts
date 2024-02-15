import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ token, css }) => {
  return {
    tree: css`
      max-width: 100%;
      color: ${token.colorTextTreeElement}
    `
  }
})
