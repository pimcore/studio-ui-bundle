import { createStyles } from 'antd-style'

export const useStyle = createStyles(({ token, css }) => {
  return {
    card: css`
        &.ant-card {
            height: 103px;
        }
        
        &.ant-card .ant-card-body {
            padding: ${token.paddingXXS}px ${token.paddingXS}px;
            margin-top: 7px;
            margin-bottom: 7px;
            width: 166px;
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

        .ant-card-cover .img-container, .ant-card-cover .img-container-medium {
            display: flex;
            justify-content: center;
            align-items: center;
        }
      
        .ant-card-cover .img-container {
            height: 64px;
            width: 170px;
        }

        .ant-image .ant-image-img.img {
            max-height: 64px;
            max-width: 170px;
        }

        .ant-card-cover .img-container-medium {
            height: 109px;
            width: 236px;
        }

        .ant-image .ant-image-img.img-medium {
            max-height: 109px;
            max-width: 236px;
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
