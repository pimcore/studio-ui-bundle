import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ token, css }) => {
  return {
    Widget: css`
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      overflow: hidden;

      .widget__content {
        flex: 1;
        overflow: auto;
      }
      
      .widget__title {
        padding-top: ${token.paddingSM}px;
      }
    `
  }
}, { hashPriority: 'low' })
