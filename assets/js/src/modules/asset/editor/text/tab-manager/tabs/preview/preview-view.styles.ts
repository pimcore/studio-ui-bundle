import { createStyles } from 'antd-style'

export const useStyle = createStyles(({ token, css }) => {
  return {
    preview: css`
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;
      object-fit: contain;

      iframe {
        display: flex;
        height: 100%;
        width: 100%;
      }
    `
  }
}, { hashPriority: 'low' })
