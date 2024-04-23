import { createStyles } from 'antd-style'

export const useStyle = createStyles(({ token, css }) => {
  return {
    card: css`
        &.ant-card {
            height: 103px;
            cursor: pointer;
        }
        
        &.card-medium {
            height: 150px;
        }
        
        &.ant-card .ant-card-body {
            padding: ${token.paddingXXS}px ${token.paddingXS}px;
            margin-top: 7px;
            margin-bottom: 7px;
            width: 166px;
        }
        
        &.ant-card .ant-card-meta-title {
              font-weight: normal;
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

        .ant-image .ant-image-img.img, .ant-image .ant-image-img.img-medium {
            border-radius: unset;
            margin-top: 3px;
        }
        
        .ant-image .ant-image-img.img {
            max-height: 61px;
            max-width: 168px;
        }

        .ant-card-cover .img-container-medium {
            height: 109px;
            width: 236px;
        }

        .ant-image .ant-image-img.img-medium {
            max-height: 106px;
            max-width: 234px;
        }
        
        .blur-image__bg {
          max-height: 64px;
          max-width: 170px;
        }
        
        .blur-image__bg-medium  {
          max-height: 109px;
          max-width: 236px;
        }
      
        .blur-image__bg, .blur-image__bg-medium  {
          width: auto;
          height: auto;   
          
          filter: blur(1.38px);
          -webkit-filter: blur(1.38px);
          background-size: cover;
          background-repeat: no-repeat;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background-blend-mode: overlay;
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
