/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { createStyles } from 'antd-style'

export const useStyle = createStyles(({ token, css }) => {
  return {
    responsiveImagePreviewContainer: css`
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      transition: width 0.2s ease, height 0.2s ease;
      min-width: 80px;
      min-height: 50px;
      
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
    imageComponent: css`
      width: 100%;
    `,
    loadingContainer: css`
      width: 100%;
      height: 100%;
      min-height: 50px;
    `
  }
})