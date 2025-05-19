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
import React, { type ComponentType } from 'react'
import { useStyles } from './group-item.styles'
import { MenuItem } from '../../menu-item'
import { type ItemType, type MenuItemGroupType } from '@Pimcore/components/menu/menu'

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
          MenuItem({ item })
        ))}
      </Component>
    )
  }

  return ExtendedMenuItemGroup
}

export const GroupItem = WithExtendedApi(Menu.ItemGroup)
