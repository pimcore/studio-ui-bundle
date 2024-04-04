import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ token, css }) => {
  return {
    ContentToolbarSidebarLayout: css`
      &.content-toolbar-sidebar-layout {
        position: relative;
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        overflow: hidden;
      }

      .content-toolbar-sidebar-layout__content {
        display: flex;
        overflow: auto;
        height: 100%;
        width: 100%;
      }

      .content-toolbar-sidebar-layout__toolbar {
        position: sticky;
        bottom: 0;
        height: ${token.sizeXXL}px; 
      }
    `
  }
}, { hashPriority: 'low' })
