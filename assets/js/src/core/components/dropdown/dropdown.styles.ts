/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
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
