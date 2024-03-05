import { createStyles } from 'antd-style'

export const useStyle = createStyles(({ token, css }) => {
  return {
    editorTabs: css`
      height: 100%;
      overflow: hidden;

      .ant-tabs-content {
        display: flex;
        height: 100%;
      }

      &.ant-tabs .ant-tabs-tab {
        padding: 0;
        transition: color .2s;
      }

      .ant-tabs-tabpane {
        position: relative;
        display: flex;
        height: 100%;
        width: 100%;
      }

      .ant-tabs-content-holder {
        overflow: auto;
      }

      &.ant-tabs .ant-tabs-tab+.ant-tabs-tab {
        margin-left: ${token.paddingSM}px;
        margin-right: ${token.paddingSM}px;
      }
      &.ant-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
        color: ${token.colorPrimaryActive}
      }
      &.ant-tabs-top >.ant-tabs-nav {
        margin-bottom: 0;
      }

      &.ant-tabs .ant-tabs-tab-btn .ant-tabs-tab-icon:not(:last-child) {
        margin-inline-end: 0;
      }
      
      .ant-tabs-tab {
        padding: 0;
        
        &:first-of-type {
            margin-left: ${token.paddingSM}px;
            margin-right: ${token.paddingSM}px;
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
            color: ${token.Tabs.itemUnselectedIconColor};
            
            svg {
              height: 16px;
              width: 16px
            }
          }
        }

        &:not(.ant-tabs-tab-active) {
          .ant-tabs-tab-icon {
            &:hover {
                color: ${token.colorIconHover};
            }
          }
        }
        
        &.ant-tabs-tab-active  {
          .ant-tabs-tab-icon {
              color: ${token.colorPrimaryActive}
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
      }
    `
  }
}, { hashPriority: 'low' })
