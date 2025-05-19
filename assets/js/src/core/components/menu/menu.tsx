/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactNode } from 'react'
import { Menu as AntMenu, type MenuRef, type MenuProps } from 'antd'
import {
  type MenuItemType as AntdMenuType,
  type SubMenuType as AntdSubMenuType

} from 'antd/es/menu/interface'
import { MenuItem } from './item/menu-item'
import { SelectionProvider, SelectionType } from './selection/selection-provider'

type OldItemType = Extract<MenuProps['items'], any[]>[0]
type OldMenuItemGroupType = Extract<OldItemType, { type: 'group' }>
export type MenuDividerType = Extract<OldItemType, { type: 'divider' }>

export interface MenuItemType extends AntdMenuType {
  selectable?: boolean
  isLoading?: boolean
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

export interface IMenuProps extends Omit<MenuProps, 'items' | 'selectedKeys' | 'onSelect'> {
  items?: ItemType[]
  ref?: React.Ref<MenuRef>
  selectedKeys?: React.Key[]
  onSelect?: (keys: React.Key[]) => void
}

export const Menu = (props: IMenuProps): JSX.Element => {
  const filteredItems = props.items?.filter(function filterItems (item: ItemType) {
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

  const { selectable, multiple, selectedKeys } = props
  let selectionType = SelectionType.Disabled

  if (selectable === true) {
    selectionType = multiple === true ? SelectionType.Multiple : SelectionType.Single
  }

  return (
    <SelectionProvider
      selectedKeys={ selectedKeys }
      selectionType={ selectionType }
    >
      <AntMenu
        { ...props }
        items={ undefined }
        onSelect={ undefined }
        selectedKeys={ undefined }
      >
        {filteredItems?.map((item: ItemType) => MenuItem({ item }))}
      </AntMenu>
    </SelectionProvider>
  )
}
