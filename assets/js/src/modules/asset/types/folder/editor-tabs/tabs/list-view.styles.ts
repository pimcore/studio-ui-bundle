import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ css, token }) => {
  return {
    folderListing: css`
      &.folder-listing {
        width: 100%;
        overflow: hidden;
        max-height: 100%;
      }

      .folder-listing__toolbar {
        position: sticky;
        bottom: 0;
      }

      .folder-listing__grid {
        display: flex;
        overflow: auto;
        height: calc(100% - ${token.sizeXXL}px);
      }
    `
  }
})
