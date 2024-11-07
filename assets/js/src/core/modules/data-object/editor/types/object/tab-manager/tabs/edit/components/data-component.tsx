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
import { useFormList } from '../providers/form-list-provider/use-form-list'
import { useLocalizedFields } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/localized-fields/provider/localized-fields-provider/use-localized-fields'

export interface DataComponentProps extends ObjectComponentProps {
  datatype: 'data'
  fieldType?: string
  fieldtype?: string
  [p: string]: any
}

export const DataComponent = (props: DataComponentProps): React.JSX.Element => {
  const objectDataRegistry = useInjection<DynamicTypeObjectDataRegistry>(serviceIds['DynamicTypes/ObjectDataRegistry'])
  const localizedFields = useLocalizedFields()
  const { name, title } = props
  const { fieldType, fieldtype } = props
  const formList = useFormList()
  const hasFormList = formList !== undefined
  const hasLocalizedFields = localizedFields !== undefined && !hasFormList
  let formFieldName: Array<number | string> = [name]

  if (hasFormList) {
    formFieldName = [formList.field.name, name]
  }

  if (hasLocalizedFields) {
    // @todo should handle multiple locales
    formFieldName = ['localizedfields', localizedFields.locales[0], name]
  }

  // @todo unify to one fieldType after api is updated completely
  const currentFieldType = fieldType ?? fieldtype ?? 'unknown'

  if (!objectDataRegistry.hasDynamicType(currentFieldType)) {
    // @todo should throw an error in the future after the implementation of all data types
    return (<div>Unknown data type: {currentFieldType}</div>)
  }

  const objectDataType = objectDataRegistry.getDynamicType(currentFieldType)

  if (!objectDataType.isCollectionType) {
    return (
      <Form.Item
        className='w-full'
        label={ title }
        name={ formFieldName }
      >
        {objectDataType.getObjectDataComponent(props)}
      </Form.Item>
    )
  }

  return (
    <>
      {objectDataType.getObjectDataComponent({ ...props, name: hasLocalizedFields ? formFieldName : name })}
    </>
  )
}
