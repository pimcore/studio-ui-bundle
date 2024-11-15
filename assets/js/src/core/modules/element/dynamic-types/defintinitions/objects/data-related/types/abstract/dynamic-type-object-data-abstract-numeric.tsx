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

import { type AbstractObjectDataDefinition, DynamicTypeObjectDataAbstract } from '../../dynamic-type-object-data-abstract'
import { type FormItemProps } from 'antd/es/form/FormItem'
import { InputNumber } from 'antd'
import { type InputNumberProps } from 'antd/es/input-number'

export type AbstractNumericObjectDataDefinition = AbstractObjectDataDefinition & {
  defaultValue?: number | null
  minValue: number | null
  maxValue: number | null
  integer?: boolean
  unsigned?: boolean
  decimalPrecision: number | null
  increment?: number | null
}

const fixUnsigned = (unsigned: boolean, value: number | null, max: boolean): number | null => {
  if (!unsigned) {
    return value
  }
  if (value === null) {
    return max ? null : 0
  }

  if (max) {
    return Math.max(value, 0)
  }

  return Math.max(value, 0)
}

export abstract class DynamicTypeObjectDataAbstractNumeric extends DynamicTypeObjectDataAbstract {
  getObjectDataComponent (props: AbstractNumericObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    return (
      <InputNumber
        { ...this.getObjectDataComponentProps(props) }
      />
    )
  }

  getObjectDataComponentProps (props: AbstractNumericObjectDataDefinition): InputNumberProps {
    return {
      disabled: props.noteditable === true,
      max: fixUnsigned(props.unsigned === true, props.maxValue, true) ?? undefined,
      min: fixUnsigned(props.unsigned === true, props.minValue, false) ?? undefined,
      precision: props.integer === true ? 0 : (props.decimalPrecision ?? undefined),
      step: props.increment ?? undefined
    }
  }

  getObjectDataFormItemProps (props: AbstractNumericObjectDataDefinition): FormItemProps {
    return {
      ...super.getObjectDataFormItemProps(props),
      initialValue: props.defaultValue
    }
  }
}
