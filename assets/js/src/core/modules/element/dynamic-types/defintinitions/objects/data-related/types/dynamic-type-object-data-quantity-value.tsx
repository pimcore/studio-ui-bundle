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
  QuantityValue
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/quantity-value/quantity-value'
import type { FormInstance } from 'antd'
import type { NamePath } from 'rc-field-form/es/interface'
import _ from 'lodash'

export type QuantityValueObjectDataDefinition = AbstractObjectDataDefinition & {
  defaultUnit: string | null
  defaultValue: number | null
  validUnits: string[] | null
  unitWidth: string | null
  decimalPrecision: number | null
  width: string | null
  autoConvert: boolean
}

export class DynamicTypeObjectDataQuantityValue extends DynamicTypeObjectDataAbstract {
  id: string = 'quantityValue'

  getObjectDataComponent (props: QuantityValueObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    return (
      <QuantityValue
        { ...props }
        className={ props.className }
        disabled={ props.noteditable === true }
      />
    )
  }

  handleDefaultValue (props: QuantityValueObjectDataDefinition, form: FormInstance, fieldName: NamePath): void {
    if (_.isEmpty(props.defaultValue) && _.isEmpty(props.defaultUnit)) {
      return
    }
    if (_.isEmpty(form.getFieldValue(fieldName))) {
      form.setFieldValue(fieldName, {
        value: props.defaultValue,
        unitId: props.defaultUnit
      })
    }
  }
}
