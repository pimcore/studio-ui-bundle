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
import { renderDropdownItem } from '../../utils/dropdown-item'
import React, { type ComponentType } from 'react'

export const WithExtendedApi = (Component: typeof Menu.SubMenu): ComponentType<SubMenuItemType> => {
  const ExtendedSubmenu = ({ children, popupOffset, label, ...props }: SubMenuItemType): React.JSX.Element => {
    return (
      <Component
        title={ label }
        { ...props }
      >
        {children?.map((item: ItemType) => (
          renderDropdownItem({ item })
        ))}
      </Component>
    )
  }

  return ExtendedSubmenu
}

export const SubMenuItem = WithExtendedApi(Menu.SubMenu)
