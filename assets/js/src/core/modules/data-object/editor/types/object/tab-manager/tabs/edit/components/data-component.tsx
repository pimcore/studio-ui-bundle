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

import React from 'react'
import { type ObjectComponentProps } from './object-component'
import { Form } from '@Pimcore/components/form/form'
import { useInjection } from '@Pimcore/app/depency-injection'
import { type DynamicTypeObjectDataRegistry } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/dynamic-type-object-data-registry'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'

export interface DataComponentProps extends ObjectComponentProps {
  name: string
  title: string | null
  datatype: 'data'
  fieldType?: string
  fieldtype?: string
  [p: string]: any
}

export const DataComponent = (props: DataComponentProps): React.JSX.Element => {
  const objectDataRegistry = useInjection<DynamicTypeObjectDataRegistry>(serviceIds['DynamicTypes/ObjectDataRegistry'])
  const { fieldType, fieldtype } = props

  // @todo unify to one fieldType after api is updated completely
  const currentFieldType = fieldType ?? fieldtype ?? 'unknown'

  if (!objectDataRegistry.hasDynamicType(currentFieldType)) {
    // @todo should throw an error in the future after the implementation of all data types
    return (<div>Unknown data type: {currentFieldType}</div>)
  }
  const objectDataType = objectDataRegistry.getDynamicType(currentFieldType)

  return (
    <Form.Item
      { ...objectDataType.getObjectDataFormItemProps(props) }
    >
      {objectDataType.getObjectDataComponent(props)}
    </Form.Item>
  )
}
