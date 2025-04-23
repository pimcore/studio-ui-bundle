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
    imagePreviewContainer: css`
      display: flex;
      justify-content: center;
      align-items: center;
      max-width: 100%;
      position: relative;
      
      .ant-image {
        height: 100%;
        width: 100%;

        .ant-image-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
      
      &.image-preview-bordered {
        outline: 1px solid ${token.colorBorderSecondary};
        border-radius: ${token.borderRadius}px;
        .ant-image-img {
           border-radius: ${token.borderRadius}px;
        }
      }
        
    `,
    hotspotButton: css`
      position: absolute;
      top: ${token.paddingXXS}px;
      left: ${token.paddingXXS}px;
      // todo: remove this when loading animation in button is fixed
      & > div {
        display:none;
      }
    `
  }
})
