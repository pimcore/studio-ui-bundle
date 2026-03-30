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
import { useNumberedList } from '../numbered-list/provider/numbered-list/use-numbered-list'
import { Form } from '../../form'
import { useFieldCollection } from './field-collection-provider'
import { FieldCollectionItemProvider } from './field-collection-item-provider'
import { Input } from 'antd'
import { ToolStripBox } from '../../../toolstrip/box/tool-strip-box'
import { FieldCollectionItemToolStrip } from './field-collection-item-toolstrip'

export interface FieldCollectionItemProps {
  field: number
}

export const FieldCollectionItem = React.memo((props: FieldCollectionItemProps): React.JSX.Element => {
  const { field } = props
  const { values } = useNumberedList()
  const value = values[field]

  const type = value?.type
  const { registry } = useFieldCollection()

  const registryItem = registry.getItemByType(type as string)

  if (registryItem === undefined) {
    throw new Error(`No registry item found for type "${type}"`)
  }

  return (
    <FieldCollectionItemProvider
      field={ field }
      value={ value }
    >
      <ToolStripBox renderToolStripStart={ <FieldCollectionItemToolStrip field={ field } /> }>
        <Form.Item
          hidden
          name={ 'type' }
        >
          <Input />
        </Form.Item>

        <Form.Group name={ 'data' }>
          {registryItem.component}
        </Form.Group>
      </ToolStripBox>
    </FieldCollectionItemProvider>
  )
})

FieldCollectionItem.displayName = 'FieldCollectionItem'
