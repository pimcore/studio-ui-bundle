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
import { Select } from '@Pimcore/components/select/select'
import { t } from 'i18next'
import type { FormItemProps } from 'antd/es/form/FormItem'
import {
  type SelectObjectDataDefinition
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-select'

export type BooleanSelectObjectDataDefinition = AbstractObjectDataDefinition & {
  options: Array<{ key: string, value: string }> | null
}

export class DynamicTypeObjectDataBooleanSelect extends DynamicTypeObjectDataAbstract {
  id: string = 'booleanSelect'
  getObjectDataComponent (props: BooleanSelectObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    const options = props.options === null ? undefined : props.options.map(option => ({ label: t(option.key), value: option.value }))
    return (
      <Select
        disabled={ props.noteditable === true }
        options={ options }
      />
    )
  }

  getObjectDataFormItemProps (props: SelectObjectDataDefinition): FormItemProps {
    return {
      ...super.getObjectDataFormItemProps(props),
      initialValue: 0
    }
  }
}
