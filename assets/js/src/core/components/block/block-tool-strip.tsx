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
import { ToolStrip } from '@Pimcore/components/toolstrip/tool-strip'
import { Form } from '@Pimcore/components/form/form'
import React from 'react'

export interface BlockToolStripProps {
  field: number
  disallowAdd: boolean
  disallowDelete: boolean
  disallowReorder: boolean
  itemValue?: any
  getItemTitle?: (itemValue: any, index: number) => React.ReactNode
}

export const BlockToolStrip = ({ field, disallowAdd, disallowDelete, disallowReorder, itemValue, getItemTitle }: BlockToolStripProps): React.JSX.Element => {
  const { operations } = useNumberedList()

  // Use Form.useWatch to get the real-time form values for this specific item
  const watchedValue = Form.useWatch([field])

  const handleMoveUp = (): void => {
    operations.move(field, field - 1)
  }

  const handleMoveDown = (): void => {
    operations.move(field, field + 1)
  }

  const handleAdd = (): void => {
    operations.add({}, field + 1)
  }

  const handleDelete = (): void => {
    operations.remove(field)
  }

  // Use the watched value for real-time updates, fallback to itemValue
  const currentValue = watchedValue ?? itemValue

  // Generate dynamic title if callback is provided
  const dynamicTitle = getItemTitle?.(currentValue, field)

  // Convert title to string for ToolStrip
  const titleString = dynamicTitle !== null && dynamicTitle !== undefined ? String(dynamicTitle) : undefined

  return (
    <ToolStrip title={ titleString }>
      <Split
        dividerSize='small'
        size='mini'
        theme='secondary'
      >
        <Space size="mini">
          <IconButton
            data-testid={ `block-tool-strip-${field}-add` }
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
    </ToolStrip>
  )
}
