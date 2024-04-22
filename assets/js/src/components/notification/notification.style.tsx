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
    `,
    'notification-description': css`
      &.collapsed {
        display: none;
        transition: all 0.2s ease-in-out;
      }
      
      &.collapse {
        display: flex;
        flex-direction: column;
        gap: 8px;
        transition: all 0.2s ease-in-out;
      }
        
      .notification-description__completed-actions {
        .notification-description__completed-actions__headline {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 4px;
        }
          
        .notification-description__completed-actions__actions__action {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            
            p {
                margin: 0;
            }
            
            .ant-btn {
              color: ${token.colorPrimary};
              &:hover {
                color: ${token.colorPrimaryHover}
              }
            }
        }
      }
    `
  }
}, { hashPriority: 'low' })
