import { createStyles } from 'antd-style'

export const useStyle = createStyles(({ token, css }) => {
  return {
    message: css`
        .ant-message-custom-content {
            font-family: ${token.fontFamily};
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: 22px;
        }
    `
  }
}, { hashPriority: 'low' })
