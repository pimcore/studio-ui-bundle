import { createStyles } from 'antd-style'

export const useStyle = createStyles(({ token, css }) => {
  return {
    'menu-icon': css`
      .anticon& {
          vertical-align: middle;
          margin-right: ${token.marginXS}px;
      }
    `,
    label: css`
        margin-right: ${token.marginXS}px;
    `,
    'flexbox-start-end': css`
        display: flex;
        justify-content: space-between;
      `
  }
}, { hashPriority: 'low' })
