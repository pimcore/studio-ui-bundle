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
    editor: css`
      .cm-editor {
        border: 1px solid #d9d9d9;
        border-radius: ${token.borderRadius}px;
        outline: none;
        overflow: auto;

        &.cm-focused {
          border-color: ${token.colorPrimary};
        }
      }
    `
  }
})
