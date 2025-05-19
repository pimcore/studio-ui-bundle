/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type Ref } from 'react'
import { type DropdownProps as AntdDropdownProps, type MenuProps, type MenuRef } from 'antd'
import { DropdownInner } from './dropdown-inner'
import { useStyle } from './dropdown.styles'
import { type ItemType } from '../menu/menu'

export type { ItemType, MenuItemType, SubMenuItemType, MenuItemGroupType, MenuItemCustomType } from '../menu/menu'
export interface DropdownMenuProps extends Omit<MenuProps, 'items'> {
  items?: ItemType[]
}

export interface DropdownProps extends Omit<AntdDropdownProps, 'dropdownRender' | 'menu'> {
  menu: DropdownMenuProps
  menuRef?: Ref<MenuRef>
  selectedKeys?: React.Key[]
  onSelect?: (keys: React.Key[]) => void
}

export const Dropdown = ({ menu, ...props }: DropdownProps): React.JSX.Element => {
  const { styles } = useStyle()

  return (

    <DropdownInner
      { ...props }
      menu={ menu }
      overlayClassName={ styles.dropdown }
    />
  )
}
