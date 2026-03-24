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
import {
  BooleanSelect
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/boolean-select/boolean-select'
import { toCssDimension } from '@Pimcore/utils/css'
import { type DynamicTypeFieldFilterAbstract } from '../../../field-filters/dynamic-type-field-filter-abstract'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { isNil } from 'lodash'

export class DynamicTypeObjectDataBooleanSelect extends DynamicTypeObjectDataAbstractSelect {
  id: string = 'booleanSelect'

  dynamicTypeFieldFilterType: DynamicTypeFieldFilterAbstract = container.get(serviceIds['DynamicTypes/FieldFilter/BooleanSelect'])

  convertOptions (options: Array<{ key: string, value: string | number }> | null | undefined): Array<{ label: string, value: string | number | null }> | undefined {
    if (isNil(options)) {
      return undefined
    }

    return options.map((option) => {
      let booleanValue: boolean | null

      if (option.value === -1) {
        booleanValue = false
      } else if (option.value === 1) {
        booleanValue = true
      } else {
        booleanValue = null
      }

      return {
        label: option.key,
        value: booleanValue
      }
    }) as any
  }

  getObjectDataComponent (props: SelectProps): React.ReactElement<AbstractObjectDataDefinition> {
    const options = this.convertOptions(props.options)
    return (
      <BooleanSelect
        className={ props.className }
        disabled={ props.noteditable === true }
        inherited={ props.inherited }
        maxWidth={ toCssDimension(props.width, props.defaultFieldWidth.medium) }
        optionFilterProp="label"
        options={ options as any }
        value={ props.value }
      />
    )
  }

  getObjectDataFormItemProps (props: SelectProps): FormItemProps {
    return super.getObjectDataFormItemProps({
      ...props,
      defaultValue: null
    })
  }

  getDefaultGridColumnWidth (): number | undefined {
    return 150
  }
}
