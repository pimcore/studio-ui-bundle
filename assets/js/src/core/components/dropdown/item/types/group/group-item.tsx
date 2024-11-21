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
