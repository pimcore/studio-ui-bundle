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
  datatype: 'data'
  [p: string]: any
}

export const DataComponent = (props: DataComponentProps): React.JSX.Element => {
  const { name, title } = props
  const objectDataRegistry = useInjection<DynamicTypeObjectDataRegistry>(serviceIds['DynamicTypes/ObjectDataRegistry'])
  // @todo handle all the different data types here
  const objectDataType = objectDataRegistry.getDynamicType('input')

  return (
    <Form.Item
      label={ title }
      name={ name }
    >
      {objectDataType.getObjectDataComponent(props)}
    </Form.Item>
  )
}
