/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useNumberedList } from '@Pimcore/components/form/controls/numbered-list/provider/numbered-list/use-numbered-list'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Space } from '@Pimcore/components/space/space'
import { Split } from '@Pimcore/components/split/split'
import React from 'react'

export interface BlockToolStripProps {
  field: number
  disallowAdd: boolean
  disallowDelete: boolean
  disallowReorder: boolean
}

export const BlockToolStrip = ({ field, disallowAdd, disallowDelete, disallowReorder }: BlockToolStripProps): React.JSX.Element => {
  const { operations, values } = useNumberedList()

  const handleMoveUp = (): void => {
    console.log(`Moving item ${field} up to ${field - 1}`, 'values length:', values.length)
    operations.move(field, field - 1)
  }

  const handleMoveDown = (): void => {
    console.log(`Moving item ${field} down to ${field + 1}`, 'values length:', values.length)
    operations.move(field, field + 1)
  }

  const handleAdd = (): void => {
    console.log(`Adding item after ${field}`, 'values length:', values.length)
    operations.add({}, field + 1)
  }

  const handleDelete = (): void => {
    console.log(`Deleting item ${field}`, 'values length:', values.length)
    operations.remove(field)
  }

  return (
    <Split
      dividerSize='small'
      size='mini'
      theme='secondary'
    >
      <Space size="mini">
        <IconButton
          disabled={ disallowAdd }
          icon={ { value: 'new' } }
          onClick={ handleAdd }
          size='small'
        />

        <IconButton
          disabled={ disallowReorder }
          icon={ { value: 'chevron-down' } }
          onClick={ handleMoveDown }
          size='small'
        />

        <IconButton
          disabled={ disallowReorder }
          icon={ { value: 'chevron-up' } }
          onClick={ handleMoveUp }
          size='small'
        />
      </Space>

      <IconButton
        disabled={ disallowDelete }
        icon={ { value: 'trash' } }
        onClick={ handleDelete }
        size='small'
      />
    </Split>
  )
}
