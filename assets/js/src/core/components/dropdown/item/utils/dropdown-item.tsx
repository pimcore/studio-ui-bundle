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
import { type ItemType } from '../../dropdown'
import { CustomItem } from '../types/custom/custom-item'
import { DividerItem } from '../types/divider/divider-item'
import { GroupItem } from '../types/group/group-item'
import { SubMenuItem } from '../types/sub-menu/sub-menu-item'
import { DefaultItem } from '../types/default/default-item'

export interface DropdownItemProps {
  item: ItemType
}

export const renderDropdownItem = ({ item }: DropdownItemProps): React.JSX.Element => {
  if (item === null) {
    return <></>
  }

  if ('type' in item && item.type === 'divider') {
    return <DividerItem { ...item } />
  }

  if ('type' in item && item.type === 'group') {
    return <GroupItem { ...item } />
  }

  if ('type' in item && item.type === 'custom') {
    return <CustomItem { ...item } />
  }

  if (!('type' in item) && 'children' in item) {
    return <SubMenuItem { ...item } />
  }

  if (!('type' in item) && !('children' in item)) {
    return (
      <DefaultItem
        { ...item }
        id={ item.key }
      />
    )
  }

  return <></>
}
