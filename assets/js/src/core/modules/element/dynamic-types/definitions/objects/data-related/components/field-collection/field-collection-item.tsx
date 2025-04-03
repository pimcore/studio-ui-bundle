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

import { ToolStripBox } from '@Pimcore/components/toolstrip/box/tool-strip-box'
import React, { useMemo } from 'react'
import { type AbstractObjectDataDefinition } from '../../dynamic-type-object-data-abstract'
import { useFieldCollection } from './providers/use-field-collection'
import { isEmpty } from 'lodash'
import { Content } from '@Pimcore/components/content/content'
import { useNumberedList } from '@Pimcore/components/form/numbered-list/provider/numbered-list/use-numbered-list'
import { type FieldCollectionProps } from './field-collection'
import { Form } from '@Pimcore/components/form/form'
import { ObjectComponent } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/object-component'
import { FieldCollectionToolStrip } from './field-collection-tool-strip'
import { Input } from 'antd'

export interface FieldCollectionItemProps {
  field: number
  docked: boolean
  noteditable: AbstractObjectDataDefinition['noteditable']
  allowedTypes: FieldCollectionProps['allowedTypes']
  disallowReorder?: boolean
  disallowAdd?: boolean
  disallowDelete?: boolean
}

export const FieldCollectionItem = (props: FieldCollectionItemProps): React.JSX.Element => {
  const { field, noteditable } = props

  const fieldCollection = useFieldCollection()
  const { operations } = useNumberedList()
  const type = operations.getValue([field, 'type'])

  if (isEmpty(type) || isEmpty(fieldCollection)) {
    throw new Error('FieldCollection or type is empty')
  }

  return useMemo(() => {
    const { data, isLoading } = fieldCollection

    if (isLoading === true) {
      return <Content loading />
    }

    const layoutDefinition = data.items.find(item => item.key === type)

    if (layoutDefinition === undefined) {
      throw new Error(`Field collection layout definition for type ${type} not found`)
    }

    return (
      <ToolStripBox
        docked={ props.docked }
        key={ field }
        renderToolStripStart={ (
          <FieldCollectionToolStrip
            allowedTypes={ props.allowedTypes }
            disallowAdd={ props?.disallowAdd }
            disallowDelete={ props?.disallowDelete }
            disallowReorder={ props?.disallowReorder }
            field={ field }
          />
          ) }
      >
        <Form.Item
          name={ [field, 'type'] }
          style={ { display: 'none' } }
        >
          <Input
            type='hidden'
            value={ type }
          />
        </Form.Item>

        <Form.Group name={ [field, 'data'] }>
          {layoutDefinition.children.map((child, index) => {
            return (
              <ObjectComponent
                key={ index }
                { ...child }
                noteditable={ noteditable }
              />
            )
          })}
        </Form.Group>
      </ToolStripBox>
    )
  }, [field, noteditable, fieldCollection, type, props.docked, props.allowedTypes])
}
