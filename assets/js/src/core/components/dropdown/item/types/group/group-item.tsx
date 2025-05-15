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
import { type ItemType, type MenuItemGroupType } from '../../../dropdown'
import { renderDropdownItem } from '../../utils/dropdown-item'
import React, { type ComponentType } from 'react'
import { useStyles } from './group-item.styles'

export const WithExtendedApi = (Component: typeof Menu.ItemGroup): ComponentType<MenuItemGroupType> => {
  const ExtendedMenuItemGroup = ({ children, label, ...props }: MenuItemGroupType): React.JSX.Element => {
    const { styles } = useStyles()

    return (
      // @ts-expect-error ref is incompatible due to wrong typing in antd
      <Component
        title={ label }
        { ...props }
        className={ styles.groupItem }
      >
        {children?.map((item: ItemType) => (
          renderDropdownItem({ item })
        ))}
      </Component>
    )
  }

  return ExtendedMenuItemGroup
}

export const GroupItem = WithExtendedApi(Menu.ItemGroup)
