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
    dropdownItem: css`
      &.ant-dropdown-menu-item-active {
        background-color: ${token.colorBgContainer} !important;

        &:hover {
          background-color: rgba(0, 0, 0, 0.04) !important;
        }
      }

      &.default-item--with-icon-right {
        padding-right: 4px !important;
      }
    `
  }
})
