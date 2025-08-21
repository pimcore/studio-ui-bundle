/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { FormItemProps } from 'antd/es/form/FormItem'
import {
  DynamicTypeObjectDataAbstractSelect,
  type SelectProps
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/abstract/dynamic-type-object-data-abstract-select'
import React from 'react'
import type {
  AbstractObjectDataDefinition
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-abstract'
import { t } from 'i18next'
import {
  BooleanSelect
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/boolean-select/boolean-select'
import { toCssDimension } from '@Pimcore/utils/css'
import { DynamicTypeFieldFilterAbstract } from '../../../field-filters/dynamic-type-field-filter-abstract'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'

export class DynamicTypeObjectDataBooleanSelect extends DynamicTypeObjectDataAbstractSelect {
  id: string = 'booleanSelect'

  protected dynamicTypeFieldFilterType: DynamicTypeFieldFilterAbstract = container.get(serviceIds['DynamicTypes/FieldFilter/Select'])
  
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

  getDefaultGridColumnWidth (): number | undefined {
    return 150
  }
}
