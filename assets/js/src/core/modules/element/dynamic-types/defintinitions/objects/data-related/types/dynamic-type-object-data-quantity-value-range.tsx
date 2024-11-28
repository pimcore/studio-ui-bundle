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

import type { FormItemProps } from 'antd/es/form/FormItem'
import {
  QuantityValueRange
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/quantity-value-range/quantity-value-range'

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
      <QuantityValueRange { ...props } />
    )
  }

  getObjectDataFormItemProps (props: QuantityValueRangeObjectDataDefinition): FormItemProps {
    return {
      ...super.getObjectDataFormItemProps(props)
      /* initialValue: {
        value: props.defaultValue,
        unitId: props.defaultUnit
      } */
    }
  }
}
