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
import { Dropdown as AntdDropdown, Menu, type MenuRef } from 'antd'
import { renderDropdownItem } from './item/utils/dropdown-item'
import { type DropdownProps, type ItemType } from './dropdown'

export type DropdownInnerProps = DropdownProps & {
  menuRef?: Ref<MenuRef>
}

export const DropdownInner = ({ selectedKeys, onSelect, menu, menuRef, ...props }: DropdownInnerProps): React.JSX.Element => {
  const { items, ...rest } = menu

  const renderMenuComponent = (): ReactNode => (
    <Menu
      ref={ menuRef }
      { ...rest }
    >
      {items?.map((item: ItemType) => renderDropdownItem({ item }))}
    </Menu>
  )

  return (
    <AntdDropdown
      { ...props }
      dropdownRender={ renderMenuComponent }
    >
      {props.children}
    </AntdDropdown>
  )
}
