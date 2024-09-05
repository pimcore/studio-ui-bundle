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

import React from 'react'
import { Dropdown as AntdDropdown, Menu } from 'antd'
import { renderDropdownItem } from './item/utils/dropdown-item'
import { type DropdownProps, type ItemType } from './dropdown'

export const DropdownInner = ({ selectedKeys, onSelect, menu, ...props }: DropdownProps): React.JSX.Element => {
  const { items } = menu

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
