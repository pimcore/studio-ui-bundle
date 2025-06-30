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
    withDroppable: css`
      .tree-node__content-inner {
        background: ${token.colorBgContainerDisabled};
        border-radius: ${token.borderRadius}px;
        outline: 1px dashed ${token.colorBorder};
      }

      .tree-list .tree-node__content {
        background: transparent;
        border: 0;
      }
    `
  }
})
