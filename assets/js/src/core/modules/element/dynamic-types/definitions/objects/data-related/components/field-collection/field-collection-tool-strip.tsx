/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Split } from '@Pimcore/components/split/split'
import { Text } from '@Pimcore/components/text/text'
import React from 'react'
import { Dropdown, type DropdownMenuProps } from '@Pimcore/components/dropdown/dropdown'
import { Space } from '@Pimcore/components/space/space'
import { type FieldCollectionProps } from './field-collection'
import { useNumberedList } from '@Pimcore/components/form/controls/numbered-list/provider/numbered-list/use-numbered-list'

export interface FieldCollectionToolStripProps {
  field: number
  allowedTypes: FieldCollectionProps['allowedTypes']
  disallowAdd: boolean
  disallowDelete: boolean
  disallowReorder: boolean
}

export const FieldCollectionToolStrip = ({ field, allowedTypes, disallowAdd, disallowDelete, disallowReorder }: FieldCollectionToolStripProps): React.JSX.Element => {
  const { operations } = useNumberedList()

  const type = operations.getValue([field, 'type'])

  const dropDownItems: DropdownMenuProps['items'] = allowedTypes.map((type, index) => {
    return {
      key: index,
      label: type,
      onClick: (e) => { e.domEvent.stopPropagation(); operations.add({ type }) }
    }
  })

  return (
    <Split
      dividerSize='small'
      size='mini'
      theme='secondary'
    >
      <Space size="mini">
        <Text type='secondary'>{ type }</Text>

        <Dropdown
          disabled={ disallowAdd }
          menu={ { items: dropDownItems } }
        >
          <IconButton
            icon={ { value: 'new' } }
            style={ { padding: 4 } }
            variant='minimal'
          />
        </Dropdown>

        <IconButton
          disabled={ disallowReorder }
          icon={ { value: 'move-down' } }
          onClick={ () => { operations.move(field, field + 1) } }
          style={ { padding: 4 } }
          variant='minimal'
        />
        <IconButton
          disabled={ disallowReorder }
          icon={ { value: 'move-up' } }
          onClick={ () => { operations.move(field, field - 1) } }
          style={ { padding: 4 } }
          variant='minimal'
        />
      </Space>

      <IconButton
        disabled={ disallowDelete }
        icon={ { value: 'trash' } }
        onClick={ () => { operations.remove(field) } }
        style={ { padding: 4 } }
        variant='minimal'
      />
    </Split>
  )
}
