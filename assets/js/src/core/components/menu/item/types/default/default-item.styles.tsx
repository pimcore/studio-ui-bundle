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
    dropdownItem: css`
      display: flex;
      align-items: center;
      
      .ant-dropdown-menu-title-content {
        display: flex;
        gap: ${token.marginXS}px;
      }
      
      &.ant-dropdown-menu-item-active {
        background-color: ${token.colorBgContainer} !important;

        &:hover {
          background-color: ${token.colorFillTertiary} !important;
        }
      }

      &.default-item--with-icon-right {
        padding-right: 4px !important;
      }
    `
  }
})
