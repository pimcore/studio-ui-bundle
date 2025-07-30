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
    imageEditablePreviewContainer: css`
      position: relative;
      display: inline-flex; /* Use inline-flex instead of inline-block */
      max-width: 100%;
      
      .ant-image {
        display: block;
        
        .ant-image-img {
          display: block;
          max-width: 100%;
          height: auto;
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
      display: block;
      max-width: 100%;
      height: auto;
    `,

    loadingContainer: css`
      min-height: 100px;
      min-width: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
    `,

    loadingSpinner: css`
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: ${token.borderRadiusLG}px;
      outline: 1px dashed ${token.colorBorder};
      background: ${token.controlItemBgHover};
      padding: ${token.paddingSM}px;
    `
  }
})
