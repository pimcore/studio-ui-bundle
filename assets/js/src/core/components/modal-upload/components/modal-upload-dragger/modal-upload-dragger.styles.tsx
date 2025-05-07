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

export const useStyles = createStyles(({ token, css }) => {
  return {
    dragger: css`
      .ant-upload {
        padding: 0 !important;
        background: none;
        border: none !important;
        
        &:hover {
            border: none !important;
        }
        
        &.ant-upload-drag-hover {
          position: relative;
          border-radius: ${token.borderRadius}px;

          &::after {
            content: '';
            position: absolute;
            inset: 0;
            border: 1px dashed ${token.colorLinkHover};
            border-radius: ${token.borderRadius}px;
            box-sizing: border-box;
            pointer-events: none;
            z-index: 1;
          }
        }

        .ant-upload-drag-container {
          width: 100%;
        }
      }
    `
  }
})
