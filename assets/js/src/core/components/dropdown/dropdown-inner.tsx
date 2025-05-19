/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactNode, type Ref } from 'react'
import { Dropdown as AntdDropdown, type MenuRef } from 'antd'
import { type DropdownProps } from './dropdown'
import { Menu } from '../menu/menu'

export type DropdownInnerProps = DropdownProps & {
  menuRef?: Ref<MenuRef>
}

export const DropdownInner = ({ menu, onSelect, selectedKeys, menuRef, ...props }: DropdownInnerProps): React.JSX.Element => {
  const renderMenuComponent = (): ReactNode => (
    <Menu
      ref={ menuRef }
      { ...menu }
      onSelect={ onSelect }
      selectedKeys={ selectedKeys }
    />
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
