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

export const useStyles = createStyles(({ css, token }) => {
  return {
    'tool-strip': css`
      background: #f5f5f5;
      border-top-left-radius: ${token.borderRadius}px;
      border-top-right-radius: ${token.borderRadius}px;

      &.tool-strip--theme-inverse {
        background: ${token.colorFillInverse};
      }
    `
  }
})
