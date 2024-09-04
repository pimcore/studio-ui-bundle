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

import { Menu } from 'antd'
import { type ItemType, type SubMenuItemType } from '../../../dropdown'
import { DropdownItem } from '../../dropdown-item'
import React from 'react'

export const SubMenuItem = ({ children, popupOffset, label, ...props }: SubMenuItemType): React.JSX.Element => {
  return (
    <Menu.SubMenu
      title={ label }
      { ...props }
    >
      {children?.map((item: ItemType) => (
        <DropdownItem
          item={ item }
          key={ item.key }
        />
      ))}
    </Menu.SubMenu>
  )
}
