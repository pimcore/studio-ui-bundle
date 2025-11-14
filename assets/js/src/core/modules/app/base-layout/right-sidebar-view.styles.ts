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

export const useStlyes = createStyles(({
  token,
  css
}) => {
  return {
    rightSidebar: css`
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 2;
      pointer-events: none;
      width: 56px;

      .right-sidebar__nav {
        list-style: none;
        padding: ${token.paddingXXS}px 0;
        margin: ${token.marginXS}px 0;
        position: relative;
        pointer-events: auto;
        text-align: center;
      }
    `
  }
}, { hashPriority: 'low' })
