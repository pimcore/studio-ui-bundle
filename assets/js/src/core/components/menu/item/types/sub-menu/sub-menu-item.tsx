/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Menu } from 'antd'
import { type ItemType, type SubMenuItemType } from '@Pimcore/components/menu/menu'
import React, { type ComponentType } from 'react'
import { MenuItem } from '../../menu-item'

export const WithExtendedApi = (Component: typeof Menu.SubMenu): ComponentType<SubMenuItemType> => {
  const ExtendedSubmenu = ({ children, popupOffset, label, ...props }: SubMenuItemType): React.JSX.Element => {
    return (
      <Component
        title={ label }
        { ...props }
      >
        {children?.map((item: ItemType) => (
          MenuItem({ item })
        ))}
      </Component>
    )
  }

  return ExtendedSubmenu
}

export const SubMenuItem = WithExtendedApi(Menu.SubMenu)
