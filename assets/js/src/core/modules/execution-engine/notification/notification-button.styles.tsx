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
    badge: css` 
      .ant-badge-count {
        background: ${token.itemActiveColor};
        font-size: 8px;
        outline: ${token.colorBgBase} solid 2px !important;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        line-height: 14px;
      }
    `
  }
})
