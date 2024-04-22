import { createStyles } from 'antd-style'

export const useStyle = createStyles(({ token, css }) => {
  return {
    progressbar: css`
      padding-bottom: ${token.marginXXS}px;  
        
      .progressbar-description {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-end;
          
        p {
          color: ${token.colorTextTertiary};
          margin: 0;
          font-size: 12px;
          font-weight: 400;
          line-height: 22px;
        }

        .progressbar-description__action {
          .ant-btn {
            color: ${token.colorPrimary};
            height: ${token.controlHeight}px;
            display: flex;
            justify-content: center;
            padding: 0 ${token.paddingXS}px;
            align-items: flex-end;

            &:hover {
              color: ${token.colorPrimaryHover}
            }
          }
        }
      }
      
      .ant-progress {
        margin-bottom: 0;
      }

      .progressbar-status {
        p {
          color: ${token.colorTextSecondary};
          font-size: 12px;
          font-weight: 400;
          line-height: 22px;
          margin: 0;
        }
      }
    `
  }
}, { hashPriority: 'low' })
