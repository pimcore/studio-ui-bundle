import { createStyles } from 'antd-style'

export const useStyle = createStyles(({ token, css }) => {
  return {
    notification: css`
        .ant-notification-notice-content {
          .ant-notification-notice-message {
            margin-bottom: 0 !important;
          }
        }
    `,
    'notification-header': css`
      .notification-header__content {
        .notification-header__content_headline {
            display: flex;
            gap: 4px;
            
          p {
            color: ${token.colorText};
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 24px;
            margin: 0; 
          }

          .pimcore-icon {
            display: flex;
            justify-content: center;
            align-items: center;

            &:hover {
                cursor: pointer;
            }
          }
        }
          
        .notification-header__content__summary {
          display: flex;
          align-items: center;
          align-self: stretch;
            
          .ant-btn {
            color: ${token.colorPrimary};
            padding: 0 ${token.paddingXXS}px;
              
              &:hover {
              color: ${token.colorPrimaryHover};
            }
          }

            p {
            color: ${token.colorTextSecondary};
            font-size: 12px;
            line-height: 22px;
            margin: 0;
          } 
        }
      }
    `
  }
}, { hashPriority: 'low' })
