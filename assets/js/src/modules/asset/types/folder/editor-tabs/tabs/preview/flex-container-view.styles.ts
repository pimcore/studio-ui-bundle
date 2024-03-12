import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ css, token }) => {
  return {
    flexContainer: css`
      display: flex;
      flex-wrap: wrap;
      gap: ${token.marginXS}px;
      padding-right: ${token.paddingSM}px;
      padding-left: ${token.paddingXS}px;
      align-self: baseline;
    `
  }
})
