import { createStyles } from 'antd-style'

export const useStyle = createStyles(({ token, css }) => {
  return {
    'document-container': css`
      width: 100%;
      height: 100%;
      .loading-div {
        position: absolute;
        top: calc(50% - 11px);
        left: calc(50% - 8px);
      }
      
      .display-none {
        display: none;
      }
    `
  }
}, { hashPriority: 'low' })
