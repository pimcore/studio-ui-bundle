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
    // reset the ul defaults only; the per-level indent comes from `.tree-node > .tree-list` in element-tree.styles
    'tree-list': css`
      list-style: none;
      margin: 0;
      padding: 0;
    `,

    'tree-list__pager': css` 
      padding: ${token.paddingXXS}px 0;

      &:empty {
        padding: 0;
      }
    `,

    'tree-list__search': css`
      padding: ${token.paddingXXS}px ${token.paddingSM}px ${token.paddingXS}px 0;

      &:empty {
        padding: 0;
      }

      .ant-btn-default {
        border-color: ${token.colorBorder}
      }
    `
  }
}, { hashPriority: 'low' })
