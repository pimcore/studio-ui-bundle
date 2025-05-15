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
    editor: css`
      border: 1px solid ${token.colorBorder};
      padding: ${token.paddingSM}px;
      border-radius: ${token.borderRadius}px;
      min-height: 100px;
      background-color: ${token.colorBgContainer};
      cursor: text;

      &[contenteditable='false'] {
        background-color: ${token.colorBgContainerDisabled};
        cursor: not-allowed;
      }
    `
  }
})
