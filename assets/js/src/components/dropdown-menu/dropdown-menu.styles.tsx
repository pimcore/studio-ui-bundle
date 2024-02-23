import { createStyles } from 'antd-style'

export const useStyle = createStyles(({ token, css }) => {
  return {
      'menu-icon': css `
        margin-right: ${token.marginXS}px;
      `,
      'flexbox-start-end': css `
        display: flex;
        justify-content: space-between;
      `,
  }
})
