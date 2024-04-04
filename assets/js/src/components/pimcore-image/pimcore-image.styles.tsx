import { createStyles } from 'antd-style'

export const useStyle = createStyles(({ token, css }) => {
  return {
    'loading-div': css`
      position: absolute;
      top: calc(50% - 11px);
      left: calc(50% - 8px);
    `
  }
}, { hashPriority: 'low' })
