import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ token, css }) => {
  return {
    tabbarToolbar: css`
      &.tabs-toolbar-layout {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        overflow: hidden;
      }

      .tabs-toolbar-layout__tabbar {
        display: flex;
        overflow: hidden;
        height: calc(100% - ${token.sizeXXL}px);
        width: 100%;
      }

      .tabs-toolbar-layout__toolbar {
        display: flex;
        overflow: hidden;
        height: ${token.sizeXXL}px;
        width: 100%;
      }
    `
  }
}, { hashPriority: 'low' })
