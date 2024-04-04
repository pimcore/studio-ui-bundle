import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ token, css }) => {
  return {
    tree: css`
      padding: ${token.paddingXXS}px 0 ${token.paddingXS}px 0;
      max-width: 100%;
      color: ${token.colorTextTreeElement}
    `
  }
}, { hashPriority: 'low' })
