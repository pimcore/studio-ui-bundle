/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

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
            
            .pimcore-icon {
                color: ${token.Colors.Neutral.Icon.colorIcon};

                svg * {
                    vector-effect: non-scaling-stroke;
                }
            }
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
