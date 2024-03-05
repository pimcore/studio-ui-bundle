import { createStyles } from 'antd-style'

export const useStyle = createStyles(({ token, css }) => {
  return {
    card: css`
        &.ant-card .ant-card-body {
            padding: ${token.paddingXXS}px ${token.paddingXS}px;
            margin-top: 7px;
            margin-bottom: 7px;
        }

        .checkbox, .checkbox-medium {
            position: absolute;
            top: ${token.paddingXXS}px;
            left: ${token.paddingXXS}px;
        }

        .checkbox-medium {
            left: ${token.paddingXS}px;
        }

        .dots-button, .dots-button-medium {
            position: absolute;
            top: ${token.paddingXXS}px;
            right: ${token.paddingXXS}px;
        }

        .dots-button-medium {
            right: ${token.paddingXS}px;
        }
      
        .dropdown-menu__icon {
            vertical-align: text-bottom;
        }

        .dots-button-open-dropdown:not(:disabled):not(.ant-btn-disabled):hover {
            background-color: ${token.Button.defaultColor};
            color: white;
        }
      
        .ant-image .ant-image-img.img {
            height: 64px;
            width: 170px;
        }
      
        .ant-image .ant-image-img.img-medium {
            height: 109px;
            width: 236px;
        }

        .menu-icon {
            margin-right: ${token.marginXS}px;
        }

        .flexbox-start-end {
            display: flex;
            justify-content: space-between;
        }
    }
    `
  }
}, { hashPriority: 'low' })
