import { createStyles } from 'antd-style'

export const useStlyes = createStyles(({ token, css }) => {
  return {
    baseLayout: css`
      position: absolute;
      overflow: hidden;
      inset: 0;
    `
  }
})
