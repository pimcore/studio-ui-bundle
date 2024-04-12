import { createStyles } from 'antd-style'

export const useStyle = createStyles(({ token, css }) => {
  return {
    relativeContainer: css`
      position: relative;
      width: 100%;
    `,
    floatingContainer: css`
      position: absolute;
      bottom: 20px;
      width: 100%;
      z-index: 9999;
    `,
    flexContainer: css`
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      padding-left: 15px;
      padding-right: 15px;
    `
  }
})
