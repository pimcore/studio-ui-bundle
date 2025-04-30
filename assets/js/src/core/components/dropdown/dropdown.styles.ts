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
    dropdown: css`
    .ant-dropdown-menu {
    display: flex;
    flex-direction: column;
    }
    
    .ant-dropdown-menu-item-group-list {
    display: flex;
    flex-direction: column;
    }
    
      .ant-dropdown-menu-submenu {
          .ant-dropdown-menu-submenu-title {
              display: flex;
              align-items: center;
          }
      }
    `
  }
})
