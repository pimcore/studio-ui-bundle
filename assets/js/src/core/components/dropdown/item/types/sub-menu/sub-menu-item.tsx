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
