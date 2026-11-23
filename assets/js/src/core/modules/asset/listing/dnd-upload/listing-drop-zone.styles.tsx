/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { createStyles } from '@Pimcore/modules/ant-design/styles/create-styles'

export const useStyles = createStyles(({ token, css }) => {
  return {
    dropArea: css`
      height: 100%;
      width: 100%;
      min-height: 0;
      min-width: 0;
      overflow: hidden;
      position: relative;

      /* keep the grid's layout (full height, own scrolling) through antd's upload wrappers */
      > div,
      .ant-upload-wrapper,
      .ant-upload,
      .ant-upload-btn,
      .ant-upload-drag-container {
        display: block;
        height: 100%;
        width: 100%;
        min-height: 0;
        min-width: 0;
        max-width: 100%;
      }

      .ant-upload-btn {
        padding: 0 !important;
      }

      /* antd marks every drag as hover; only drags that carry files may show the indicator */
      &:not([data-file-drag]) .ant-upload.ant-upload-drag-hover::after {
        display: none;
      }

      &[data-file-drag]::before {
        content: '';
        position: absolute;
        inset: 0;
        background: ${token.colorPrimaryBg};
        opacity: 0.5;
        border-radius: ${token.borderRadius}px;
        pointer-events: none;
        z-index: 1;
      }
    `
  }
})
