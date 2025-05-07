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
        border-color: transparent;
        
        &:hover {
            border-color: transparent !important;
        }
        
        &.ant-upload-drag-hover {
            border-color: ${token.colorLinkHover} !important;
        }

        .ant-upload-drag-container {
          width: 100%;
        }
      }
    `
  }
})
