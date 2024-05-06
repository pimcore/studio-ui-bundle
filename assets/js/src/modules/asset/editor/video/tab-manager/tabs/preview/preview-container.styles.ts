import { createStyles } from 'antd-style'

export const useStyle = createStyles(({ token, css }) => {
  return {
    relativeContainer: css`
      position: relative;
      width: 100%;
    `
  }
})
