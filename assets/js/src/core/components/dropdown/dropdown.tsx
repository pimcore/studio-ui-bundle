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

import React, { type ReactNode, type Ref } from 'react'
import { type DropdownProps as AntdDropdownProps, type MenuProps, type MenuRef } from 'antd'
import {
  type MenuItemType as AntdMenuType,
  type SubMenuType as AntdSubMenuType

} from 'antd/es/menu/interface'
import { DropdownInner } from './dropdown-inner'
import { SelectionProvider, SelectionType } from './selection/selection-provider'
import { useStyle } from './dropdown.styles'

export type OldItemType = Extract<MenuProps['items'], any[]>[0]
export type OldMenuItemType = Extract<OldItemType, { danger?: boolean }>
export type OldMenuItemGroupType = Extract<OldItemType, { type: 'group' }>
export type OldSubMenuType = Extract<OldItemType, { children: OldItemType[] }>
export type MenuDividerType = Extract<OldItemType, { type: 'divider' }>

export interface MenuItemType extends AntdMenuType {
  selectable?: boolean
}

export interface SubMenuItemType extends Omit<AntdSubMenuType, 'children'> {
  children: ItemType[]
}

export interface MenuItemGroupType extends Omit<OldMenuItemGroupType, 'children'> {
  children?: ItemType[]
}

export interface MenuItemCustomType extends Pick<MenuItemType, 'key'> {
  type: 'custom'
  component: ReactNode
  hidden?: boolean
}

export type ItemType<T extends MenuItemType = MenuItemType> = T | MenuItemGroupType | SubMenuItemType | MenuDividerType | MenuItemCustomType | null

export interface DropdownMenuProps extends Omit<MenuProps, 'items'> {
  items?: ItemType[]
}

export interface DropdownProps extends Omit<AntdDropdownProps, 'dropdownRender' | 'menu'> {
  menu: DropdownMenuProps
  menuRef?: Ref<MenuRef>
  selectedKeys?: React.Key[]
  onSelect?: (keys: React.Key[]) => void
}

export const Dropdown = ({ selectedKeys, onSelect, menu, ...props }: DropdownProps): React.JSX.Element => {
  const { styles } = useStyle()
  const { selectable, multiple, items } = menu
  let selectionType = SelectionType.Disabled

  if (selectable === true) {
    selectionType = multiple === true ? SelectionType.Multiple : SelectionType.Single
  }

  const filteredItems = items?.filter(function filterItems (item: ItemType) {
    // @ts-expect-error - the prop exists trust me bro ;)
    if (item?.hidden === true) {
      return false
    }

    // @ts-expect-error - the prop exists trust me bro ;)
    if (item?.children !== undefined) {
      // @ts-expect-error - the prop exists trust me bro ;)
      const filteredChildren = item.children.filter(filterItems)
      // @ts-expect-error - the prop exists trust me bro ;)
      item.children = filteredChildren

      return filteredChildren.length
    }

    return true
  })

  return (
    <SelectionProvider
      selectedKeys={ selectedKeys }
      selectionType={ selectionType }
    >
      <DropdownInner
        { ...props }
        menu={ {
          ...menu,
          items: filteredItems
        } }
        onSelect={ onSelect }
        overlayClassName={ styles.dropdown }
      />
    </SelectionProvider>
  )
}
