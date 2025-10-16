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
import { DropdownInnerDropClass } from './dropdown-inner-drop-class'
import { useStyle } from './dropdown.styles'
import { type ItemType } from '../menu/menu'
import cn from 'classnames'
import { isNil } from 'lodash'

export type { ItemType, MenuItemType, SubMenuItemType, MenuItemGroupType, MenuItemCustomType } from '../menu/menu'
export interface DropdownMenuProps extends Omit<MenuProps, 'items'> {
  items?: ItemType[]
}

export interface DropdownProps extends Omit<AntdDropdownProps, 'dropdownRender' | 'menu'> {
  menu: DropdownMenuProps
  menuRef?: Ref<MenuRef>
  selectedKeys?: React.Key[]
  onSelect?: (keys: React.Key[]) => void
  dropClass?: string
}

export const Dropdown = ({ menu, dropClass, ...props }: DropdownProps): React.JSX.Element => {
  const { styles } = useStyle()
  const commonProps = {
    ...props,
    menu,
    overlayClassName: cn(props.overlayClassName, styles.dropdown)
  }

  if (isNil(dropClass)) {
    return <DropdownInner { ...commonProps } />
  }

  return <DropdownInnerDropClass { ...commonProps } dropClass={ dropClass } />
}
