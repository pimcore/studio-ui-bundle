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
    uploadProgress: css`
      margin-top: ${token.paddingSM}px;
      margin-bottom: ${token.paddingSM}px;
      display: flex;
      gap: ${token.paddingSM}px;
      flex-direction: column;
      align-items: center;
        
      .progress-label {
          color: ${token.colorTextDescription};
      }
    `
  }
})
