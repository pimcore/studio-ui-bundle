import { createStyles } from 'antd-style'

export const useStyle = createStyles(({ token, css }) => {
  return {
    toolbar: css`
      .ant-tabs-tab {
        padding-left: ${token.paddingSM}px;
        
        &.ant-tabs-tab-active svg path{
          fill: ${token.Tabs.inkBarColor};
        }
        
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
          border-bottom: 2px solid ${token.colorPrimary};
          animation: fadeIn .2s;
      }
    `
  }
})
