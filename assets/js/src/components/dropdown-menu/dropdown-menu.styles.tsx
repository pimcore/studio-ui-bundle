import { createStyles } from 'antd-style'

export const useStyle = createStyles(({ token, css }) => {
  return {
    'menu-icon-left': css`
      .anticon& {
          vertical-align: middle;
          margin-right: ${token.marginXS}px;
      }
    `,

    'menu-icon': css`
      .anticon& {
          vertical-align: middle;
      }
    `,

    label: css`
        margin-right: ${token.marginXS}px;
    `,

    'flexbox-start-end': css`
      display: flex;
      justify-content: space-between;
    `,

    flexbox: css`
      display: flex;
    `,

    'left-area': css`
      margin-right: 22px;
    `,

    'icon-placeholder': css`
      width: 16px;
      height: 16px;
    `
  }
}, { hashPriority: 'low' })
