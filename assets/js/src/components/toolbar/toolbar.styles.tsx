import { createStyles } from 'antd-style'

export const useStyle = createStyles(({ token, css }) => {
  return {
    container: css`
      border-top: 0.5px solid #DFD7EA;
      background-color: ${token.colorBgToolbar};

      display: flex;
      justify-content: space-between;
      
      padding: ${token.paddingXS}px ${token.paddingSM}px ${token.paddingXS}px ${token.paddingXS}px;
      
      width: 100%;
      
      .container__inline-container {
        display: flex;
        align-items: center;
        gap: ${token.marginXS}px;
      }
      
      .inline-container__btn-workflow {
        height: 22px;
        color: ${token.Button.textGhostColor};
        padding-top: 0;
      }

      .inline-container__btn-info {
        padding-left: 5px;
        padding-right: 5px;
      }
      
      .inline-container__info-arrow-down {
        vertical-align: super;
        margin-left: 3px;   
      }
      
      .inline-container__btn-more {
        &:not(:disabled):not(.ant-btn-disabled):hover {
          background-color: ${token.controlItemBgActive};
          color: ${token.Button.defaultColor};
        }
      }
      
      .inline-container__btn-default-color {
        color: ${token.Button.defaultColor};
      }
      
      .inline-container__more-arrow-down {  
        vertical-align: middle;
      }
      
      .display-none {
        display: none;
      }
    `,

    'inline-container__btn-default-color': css`
      .anticon& {
          color: ${token.Button.defaultColor};
      }
    `,

    'inline-container__btn-color-white': css`
      .anticon& {
          color: white;
      }
    `
  }
}, { hashPriority: 'low' })
