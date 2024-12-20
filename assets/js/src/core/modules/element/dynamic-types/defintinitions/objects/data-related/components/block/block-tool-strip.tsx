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

import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Space } from '@Pimcore/components/space/space'
import { Split } from '@Pimcore/components/split/split'
import { type FormListFieldData, type FormListOperation } from 'antd'
import React from 'react'

export interface BlockToolStripProps {
  field: FormListFieldData
  operations: FormListOperation
}

export const BlockToolStrip = ({ field, operations }: BlockToolStripProps): React.JSX.Element => {
  return (
    <Split
      dividerSize='small'
      size='mini'
      theme='secondary'
    >
      <Space size="mini">
        <IconButton
          icon={ { value: 'new' } }
          onClick={ () => { operations.add(undefined, field.name + 1) } }
          style={ { padding: 4 } }
          variant='minimal'
        />
        <IconButton
          icon={ { value: 'move-down' } }
          onClick={ () => { operations.move(field.name, field.name + 1) } }
          style={ { padding: 4 } }
          variant='minimal'
        />
        <IconButton
          icon={ { value: 'move-up' } }
          onClick={ () => { operations.move(field.name, field.name - 1) } }
          style={ { padding: 4 } }
          variant='minimal'
        />
      </Space>

      <IconButton
        icon={ { value: 'trash' } }
        onClick={ () => { operations.remove(field.name) } }
        style={ { padding: 4 } }
        variant='minimal'
      />
    </Split>
  )
}
