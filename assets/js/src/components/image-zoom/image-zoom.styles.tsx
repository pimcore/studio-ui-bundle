import { createStyles } from 'antd-style'

export const useStyle = createStyles(({ token, css }) => {
  return {
    imageZoomContainer: css`
      display: flex;
      gap: 5px
    `,
    imageZoom: css`      
      .ant-select {
          min-width: 70px;
          text-align: center;
          
          .ant-select-selector {
              border: 1px solid ${token.Button.defaultBorderColor};
              
              .ant-select-selection-item {
                padding-inline-end: unset;
              } 
          }
          
          .ant-select-arrow {
              display: none;
          }
      }
  `,
    imageZoomBtn: css`
        border: 1px solid ${token.Button.defaultBorderColor};
        box-shadow: none !important;
        width: ${token.controlHeight}px;
        height: ${token.controlHeight}px;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;

        .pimcore-icon {
            display: flex;
        }

        &:disabled {
            background: ${token.colorBgContainer};
        }
    `
  }
})
