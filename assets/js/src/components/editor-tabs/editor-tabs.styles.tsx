import { createStyles } from 'antd-style'

export const useStyle = createStyles(({ token, css }) => {
  return {
    editorTabs: css`
      &.ant-tabs .ant-tabs-tab+.ant-tabs-tab {
        margin-left: ${token.paddingSM}px;
        margin-right: ${token.paddingSM}px;
      }
      &.ant-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
        color: ${token.colorPrimaryActive}
      }
      
      .ant-tabs-tab {
        &:first-of-type {
            margin-left: ${token.paddingSM}px;
            margin-right: ${token.paddingSM}px;
        }
        padding: 0;
        
        .ant-tabs-tab-btn {
          display: flex;
          padding-top: ${token.paddingXS}px;
          padding-bottom: ${token.paddingXS}px;
          justify-content: center;
          align-items: center;
          gap: ${token.Tabs.paddingTabs}px;
          
          .ant-tabs-tab-icon {
            height: 16px;
            justify-content: center;
            align-content: center;
            margin-inline-end: 0;
            
            svg {
              height: 16px;
              width: 16px
            }
          }
        }
      }
    `,

    onlyActiveLabel: css`
      .ant-tabs-tab:not(.ant-tabs-tab-active) {
          span:nth-child(2) {
              display: none;
          }

          .ant-tabs-tab-icon {
              margin-inline-end: 0;
          }
      }

      @keyframes fadeIn {
          from {
              opacity: 0;
          }

          to {
              opacity: 1;
          }
      }

      .ant-tabs-tab.ant-tabs-tab-active {
          border-bottom: 2px solid ${token.colorPrimaryActive};
          animation: fadeIn .2s;
      }
    `
  }
})
