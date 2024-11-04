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

import { type AbstractObjectDataDefinition, DynamicTypeObjectDataAbstract } from '../dynamic-type-object-data-abstract'
import { type FormItemProps } from 'antd/es/form/FormItem'
import { Select } from '@Pimcore/components/select/select'

export type MultiSelectObjectDataDefinition = AbstractObjectDataDefinition & {
  defaultValue: string | null
  options: Array<{ key: string, value: string }> | null
  maxItems: number | null
}

export class DynamicTypeObjectDataMultiSelect extends DynamicTypeObjectDataAbstract {
  id: string = 'multiselect'
  getObjectDataComponent (props: MultiSelectObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    const options = props.options === null ? undefined : props.options.map(option => ({ label: option.key, value: option.value }))
    return (
      <Select
        disabled={ props.noteditable === true }
        maxCount={ props.maxItems ?? undefined }
        mode="multiple"
        optionFilterProp="label"
        options={ options }
        showSearch
      />
    )
  }

  getObjectDataFormItemProps (props: MultiSelectObjectDataDefinition): FormItemProps {
    return {
      ...super.getObjectDataFormItemProps(props),
      initialValue: props.defaultValue
    }
  }
}
