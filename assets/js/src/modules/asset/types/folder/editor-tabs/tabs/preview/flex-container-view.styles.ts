import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ css, token }) => {
  return {
    flexContainer: css`
      display: flex;
      flex-wrap: wrap;
      gap: ${token.marginXS}px;
      padding: ${token.marginXS}px ${token.paddingSM}px ${token.marginXS}px ${token.paddingXS}px;
      align-self: baseline;
    `
  }
}, { hashPriority: 'low' })
