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

export const useStyles = createStyles(({ css }) => {
  return {
    overlay: css`
      max-width: 300px;

      .ant-dropdown-menu {
        overflow: hidden;
      }

      .ant-dropdown-menu-item-group-title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    `
  }
})
