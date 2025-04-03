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

import { useNumberedList } from '@Pimcore/components/form/numbered-list/provider/numbered-list/use-numbered-list'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Space } from '@Pimcore/components/space/space'
import { Split } from '@Pimcore/components/split/split'
import React from 'react'

export interface BlockToolStripProps {
  field: number
  disallowAdd: boolean
  disallowDelete: boolean
  disallowReorder: boolean
  maxItems: number
}

export const BlockToolStrip = ({ field, disallowAdd, disallowDelete, disallowReorder, maxItems }: BlockToolStripProps): React.JSX.Element => {
  const hasMaxItems = false
  const { operations } = useNumberedList()

  return (
    <Split
      dividerSize='small'
      size='mini'
      theme='secondary'
    >
      <Space size="mini">
        <IconButton
          disabled={ disallowAdd || hasMaxItems }
          icon={ { value: 'new' } }
          onClick={ () => { operations.add({}, field + 1) } }
          style={ { padding: 4 } }
          variant='minimal'
        />

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
