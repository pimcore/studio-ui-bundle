/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { CustomItem } from '../item/types/custom/custom-item'
import { DividerItem } from '../item/types/divider/divider-item'
import { GroupItem } from '../item/types/group/group-item'
import { SubMenuItem } from '../item/types/sub-menu/sub-menu-item'
import { DefaultItem } from '../item/types/default/default-item'
import { type ItemType } from '../menu'

export interface MenuItemProps {
  item: ItemType
}

export const MenuItem = ({ item }: MenuItemProps): React.JSX.Element => {
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
