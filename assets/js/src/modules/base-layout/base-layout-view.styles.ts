import { createStyles } from 'antd-style'

export const useStlyes = createStyles(({ token, css }) => {
  return {
    baseLayout: css`
      position: absolute;
      inset: 0;
      background: #FCFCFC;
      font-size: ${token.fontSize}
    `
  }
})
