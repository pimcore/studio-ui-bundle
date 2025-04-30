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
    content: css`
      .ant-empty-image {
        margin-bottom: ${token.marginXS}px;
        height: auto;
      }
        
      .ant-empty-description {
        padding: 5px ${token.controlPaddingHorizontal}px;
        font-size: 14px;
        color: ${token.Empty.colorTextDisabled};
        line-height: 20px;
      }
    `
  }
})
