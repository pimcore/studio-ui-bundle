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
  const { operations } = useNumberedList()

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
          onClick={ () => { operations.add({}, field + 1) } }
          size='small'
        />

        <IconButton
          disabled={ disallowReorder }
          icon={ { value: 'chevron-down' } }
          onClick={ () => { operations.move(field, field + 1) } }
          size='small'
        />

        <IconButton
          disabled={ disallowReorder }
          icon={ { value: 'chevron-up' } }
          onClick={ () => { operations.move(field, field - 1) } }
          size='small'
        />
      </Space>

      <IconButton
        disabled={ disallowDelete }
        icon={ { value: 'trash' } }
        onClick={ () => { operations.remove(field) } }
        size='small'
      />
    </Split>
  )
}
