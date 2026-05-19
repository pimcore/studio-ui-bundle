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
    dropdownOverlay: css`
      min-width: 0 !important;

      .ant-dropdown-menu {
        width: max-content !important;
      }

      .ant-dropdown-menu-item-group-title {
        padding-left: ${token.padding}px !important;
      }

      .ant-dropdown-menu-item-group-list {
        margin: 0 !important;
      }
    `
  }
})
