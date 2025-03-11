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

import type { FormItemProps } from 'antd/es/form/FormItem'
import {
  DynamicTypeObjectDataAbstractSelect,
  type SelectProps
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/abstract/dynamic-type-object-data-abstract-select'
import React from 'react'
import type {
  AbstractObjectDataDefinition
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/dynamic-type-object-data-abstract'
import { t } from 'i18next'
import {
  BooleanSelect
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/boolean-select/boolean-select'
import { toCssDimension } from '@Pimcore/utils/css'

export class DynamicTypeObjectDataBooleanSelect extends DynamicTypeObjectDataAbstractSelect {
  id: string = 'booleanSelect'

  getObjectDataComponent (props: SelectProps): React.ReactElement<AbstractObjectDataDefinition> {
    const options = props.options === null ? undefined : props.options.map(option => ({ label: t(option.key), value: option.value }))
    return (
      <BooleanSelect
        className={ props.className }
        disabled={ props.noteditable === true }
        inherited={ props.inherited }
        maxWidth={ toCssDimension(props.width, props.defaultFieldWidth.medium) }
        optionFilterProp="label"
        options={ options }
        value={ props.value }
      />
    )
  }

  getObjectDataFormItemProps (props: SelectProps): FormItemProps {
    return super.getObjectDataFormItemProps({
      ...props,
      defaultValue: 0
    })
  }
}
