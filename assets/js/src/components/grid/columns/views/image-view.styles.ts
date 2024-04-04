import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ token, css }) => {
  return {
    image: css`
      display: flex;
      justify-content: center;
      align-items: center;
      aspect-ratio: 1;
      width: 80px;
    `
  }
}, { hashPriority: 'low' })
