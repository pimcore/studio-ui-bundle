import { createStyles } from 'antd-style'

export const useStyle = createStyles(({ token, css }) => {
  return {
    imageZoomContainer: css`
        display: flex;
        gap: 5px
    `,
    imageZoom: css`
            .ant-btn {
                border-color: ${token.colorBorder};
                
                &.ant-btn-default {
                    box-shadow: none;
                }
                
                .pimcore-icon {
                    display: flex;
                }
            }
            
            .ant-input {
                width: 60px;
                text-align: center;
            }
        `
  }
})
