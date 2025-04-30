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
    treeContainer: css`
      margin-top: ${token.paddingSM}px;

      .simple-tree--search {
        margin: ${token.paddingSM}px ${token.paddingSM}px ${token.paddingXS}px;
      }
      
      :has(.simple-tree--search) {
        margin-top: 0;
      }
    `
  }
}, { hashPriority: 'low' })
