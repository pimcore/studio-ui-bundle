import { createStyles } from 'antd-style'

export const useStyle = createStyles(({ token, css }) => {
  return {
      checkbox: css`
        position: absolute;
        top: ${token.paddingXXS}px;
        left: ${token.paddingXXS}px;
      `,
      'checkbox-medium': css`
        position: absolute;
        top: ${token.paddingXXS}px;
        left: ${token.paddingXS}px;
      `,

      'dots-button': css`
        position: absolute;
        top: ${token.paddingXXS}px;
        right: ${token.paddingXXS}px;
      `,
      'dots-button-medium': css`
        position: absolute;
        top: ${token.paddingXXS}px;
        right: ${token.paddingXS}px;
      `,
      'dots-button-open-dropdown': css`
          background-color: ${token.Button.defaultColor};
          color: white !important;
      `,
      'dropdown-menu__icon': css`
          vertical-align: text-bottom;
      `,

      img: css `
        height: 64px !important;
        width: 170px !important;;
      `,
      'img-medium': css `
        height: 109px !important;;
        width: 236px !important;;
      `,
      
      card: css `
        .ant-card-body {
          padding: ${token.paddingXXS}px ${token.paddingXS}px;
          margin-top: 7px;
          margin-bottom: 7px;
        };
      `,

      'menu-icon': css `
        margin-right: ${token.marginXS}px;
      `,
      'flexbox-start-end': css `
        display: flex;
        justify-content: space-between;
      `,
  }
})
