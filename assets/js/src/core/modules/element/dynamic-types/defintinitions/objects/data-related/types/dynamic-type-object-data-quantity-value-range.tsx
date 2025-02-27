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

import {
  QuantityValueRange
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/quantity-value-range/quantity-value-range'
import type { FormInstance } from 'antd'
import type { NamePath } from 'rc-field-form/es/interface'
import _ from 'lodash'

export type QuantityValueRangeObjectDataDefinition = AbstractObjectDataDefinition & {
  defaultUnit: string | null
  validUnits: string[] | null
  unitWidth: string | null
  decimalPrecision: number | null
  width: string | null
}

export class DynamicTypeObjectDataQuantityValueRange extends DynamicTypeObjectDataAbstract {
  id: string = 'quantityValueRange'

  getObjectDataComponent (props: QuantityValueRangeObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    return (
      <QuantityValueRange
        { ...props }
        className={ props.className }
        disabled={ props.noteditable === true }
      />
    )
  }

  handleDefaultValue (props: QuantityValueRangeObjectDataDefinition, form: FormInstance, fieldName: NamePath): void {
    if (_.isEmpty(props.defaultUnit)) {
      return
    }
    if (_.isEmpty(form.getFieldValue(fieldName))) {
      form.setFieldValue(fieldName, {
        minimum: null,
        maximum: null,
        unitId: props.defaultUnit
      })
    }
  }
}
