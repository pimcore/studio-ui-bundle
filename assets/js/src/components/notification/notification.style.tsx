import { createStyles } from 'antd-style'

export const useStyle = createStyles(({ token, css }) => {
  return {
    notification: css`
      .ant-notification-notice-content {          
        .ant-notification-notice-message {
            color: ${token.colorText};
            font-size: 16px !important;
            font-style: normal;
            font-weight: 400;
            line-height: 24px;
            margin-bottom: ${token.marginXS}
        }
      }
    `
  }
}, { hashPriority: 'low' })
