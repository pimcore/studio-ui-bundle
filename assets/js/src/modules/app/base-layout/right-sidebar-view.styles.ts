import { createStyles } from 'antd-style'

export const useStlyes = createStyles(({
  token,
  css
}) => {
  return {
    rightSidebar: css`
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 2;
      pointer-events: none;

      .logo 
    `
  }
}, { hashPriority: 'low' })
