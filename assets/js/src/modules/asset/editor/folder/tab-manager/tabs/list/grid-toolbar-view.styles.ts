import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ css, token }) => {
  return {
    GridToolbar: css`
      display: flex;
      justify-content: space-between;
      background-color: ${token.colorWhite};
      padding-right: ${token.paddingSM}px;
      padding-left: ${token.paddingXS}px;
      height: ${token.sizeXXL}px;
      align-items: center;
      justify-content: space-between;
    `
  }
}, { hashPriority: 'low' })
