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

import React, { useState, type ReactNode } from 'react'
import { Dropdown as AntdDropdown, type DropdownProps as AntdDropdownProps, Menu, type MenuProps } from 'antd'
import { renderDropdownItem } from './item/utils/dropdown-item'

export type OldItemType = Extract<MenuProps['items'], any[]>[0]
export type OldMenuItemType = Extract<OldItemType, { danger?: boolean }>
export type OldMenuItemGroupType = Extract<OldItemType, { type: 'group' }>
export type OldSubMenuType = Extract<OldItemType, { children: OldItemType[] }>
export type MenuDividerType = Extract<OldItemType, { type: 'divider' }>

export interface MenuItemType extends OldMenuItemType {
  selectable?: boolean
}

export interface SubMenuItemType extends Omit<OldSubMenuType, 'children'> {
  children: ItemType[]
}

export interface MenuItemGroupType extends Omit<OldMenuItemGroupType, 'children'> {
  children?: ItemType[]
}

export interface MenuItemCustomType extends Pick<MenuItemType, 'key'> {
  type: 'custom'
  component: ReactNode
}

export type ItemType = MenuItemType | MenuItemGroupType | SubMenuItemType | MenuDividerType | MenuItemCustomType

export interface DropdownMenuProps extends Omit<MenuProps, 'items'> {
  items?: ItemType[]
}

export interface DropdownProps extends Omit<AntdDropdownProps, 'dropdownRender'> {
  menu: DropdownMenuProps,
  selectedKeys?: string[],
  onSelect?: (keys: []) => void
}

export const DropdownInner = ({ selectedKeys, onSelect, menu, ...props}: DropdownProps): React.JSX.Element => {
  const { items } = menu;

  return (
    <AntdDropdown
      { ...props }
      dropdownRender={ () => {
        return (
          <>
            <Menu>
              {items?.map((item: ItemType) => renderDropdownItem({ item }))}
            </Menu>
          </>
        )
      } }
    >
      {props.children}
    </AntdDropdown>
  )
}
