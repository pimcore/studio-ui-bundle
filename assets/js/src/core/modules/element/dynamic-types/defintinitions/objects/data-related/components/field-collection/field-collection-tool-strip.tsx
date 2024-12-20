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
import { Split } from '@Pimcore/components/split/split'
import { Text } from '@Pimcore/components/text/text'
import { type FormListFieldData, type FormListOperation } from 'antd'
import React from 'react'
import { type FieldCollectionProps } from './field-collection'
import { Dropdown, type DropdownMenuProps } from '@Pimcore/components/dropdown/dropdown'
import { Space } from '@Pimcore/components/space/space'

export interface FieldCollectionToolStripProps extends FieldCollectionProps {
  label: string
  field: FormListFieldData
  operations: FormListOperation
}

export const FieldCollectionToolStrip = ({ label, field, operations, allowedTypes }: FieldCollectionToolStripProps): React.JSX.Element => {
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
        <Text type='secondary'>{ label }</Text>

        <Dropdown menu={ { items: dropDownItems } }>
          <IconButton
            icon={ { value: 'new' } }
            style={ { padding: 4 } }
            variant='minimal'
          />
        </Dropdown>

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
