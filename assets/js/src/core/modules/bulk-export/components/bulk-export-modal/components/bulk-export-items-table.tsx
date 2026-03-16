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
import { Checkbox } from '@Pimcore/components/checkbox/checkbox'
import { Icon } from '@Pimcore/components/icon/icon'
import { Flex } from '@Pimcore/components/flex/flex'
import { type BulkExportAvailableItem } from '@Pimcore/modules/class-definition/class-definition-slice-enhanced'

interface BulkExportItemsTableProps {
  items: BulkExportAvailableItem[]
  toggleItem: (type: string, name: string) => void
  isSelected: (type: string, name: string) => boolean
}

export const BulkExportItemsTable = ({ items, toggleItem, isSelected }: BulkExportItemsTableProps): React.JSX.Element => {
  return (
    <div className='bulk-export-items-table'>
      {items.map((item) => (
        <Flex
          align='center'
          gap='small'
          key={ `${item.type}-${item.name}` }
          style={ { padding: '4px 0' } }
        >
          <Checkbox
            checked={ isSelected(item.type, item.name) }
            onChange={ () => { toggleItem(item.type, item.name) } }
          />

          <Icon
            value={ item.icon }
          />

          <span>{item.displayName}</span>
        </Flex>
      ))}
    </div>
  )
}
