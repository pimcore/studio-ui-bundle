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
import { type FormListFieldData } from 'antd'
import React from 'react'
import { Dropdown, type DropdownMenuProps } from '@Pimcore/components/dropdown/dropdown'
import { Space } from '@Pimcore/components/space/space'
import { type CollectionItemProps } from '../collection/collection'
import { type FieldCollectionItemProps } from './field-collection-item'

export interface FieldCollectionToolStripProps extends CollectionItemProps {
  label: string
  field: FormListFieldData
  allowedTypes: FieldCollectionItemProps['allowedTypes']
}

export const FieldCollectionToolStrip = ({ label, field, fields, operation, allowedTypes, disallowAdd, disallowDelete, disallowReorder, maxItems }: FieldCollectionToolStripProps): React.JSX.Element => {
  const hasMaxItems = maxItems !== undefined && maxItems !== null && fields.length >= maxItems

  const dropDownItems: DropdownMenuProps['items'] = allowedTypes.map((type, index) => {
    return {
      key: index,
      label: type,
      onClick: (e) => { e.domEvent.stopPropagation(); operation.add({ type }) }
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

        <Dropdown
          disabled={ disallowAdd === true || hasMaxItems }
          menu={ { items: dropDownItems } }
        >
          <IconButton
            icon={ { value: 'new' } }
            style={ { padding: 4 } }
            variant='minimal'
          />
        </Dropdown>

        <IconButton
          disabled={ disallowReorder === true }
          icon={ { value: 'move-down' } }
          onClick={ () => { operation.move(field.name, field.name + 1) } }
          style={ { padding: 4 } }
          variant='minimal'
        />
        <IconButton
          disabled={ disallowReorder === true }
          icon={ { value: 'move-up' } }
          onClick={ () => { operation.move(field.name, field.name - 1) } }
          style={ { padding: 4 } }
          variant='minimal'
        />
      </Space>

      <IconButton
        disabled={ disallowDelete === true }
        icon={ { value: 'trash' } }
        onClick={ () => { operation.remove(field.name) } }
        style={ { padding: 4 } }
        variant='minimal'
      />
    </Split>
  )
}
