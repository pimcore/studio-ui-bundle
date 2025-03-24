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
import { type FormInstance } from 'antd'
import type { NamePath } from 'rc-field-form/es/interface'
import _ from 'lodash'
import { type IInputNumberProps, InputNumber } from '@Pimcore/components/input-number/input-number'
import { toCssDimension } from '@Pimcore/utils/css'
import cn from 'classnames'

export type AbstractNumericObjectDataDefinition = AbstractObjectDataDefinition & {
  defaultValue?: number | null
  minValue: number | null
  maxValue: number | null
  integer?: boolean
  unsigned?: boolean
  decimalPrecision: number | null
  increment?: number | null
  width?: number | string | null
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
  getObjectDataComponentProps (props: AbstractNumericObjectDataDefinition): IInputNumberProps {
    return {
      inherited: props.inherited,
      disabled: props.noteditable === true,
      max: fixUnsigned(props.unsigned === true, props.maxValue, true) ?? undefined,
      min: fixUnsigned(props.unsigned === true, props.minValue, false) ?? undefined,
      precision: props.integer === true ? 0 : (props.decimalPrecision ?? undefined),
      step: props.increment ?? undefined
    }
  }

  getObjectDataComponent (props: AbstractNumericObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    return (
      <InputNumber
        { ...this.getObjectDataComponentProps(props) }
        className={ cn('w-full', props.className) }
        style={ { maxWidth: toCssDimension(props.width, props.defaultFieldWidth.small) } }
      />
    )
  }

  getVersionObjectDataComponentProps (props: AbstractNumericObjectDataDefinition): IInputNumberProps {
    return {
      inherited: props.inherited,
      disabled: true,
      max: fixUnsigned(props.unsigned === true, props.maxValue, true) ?? undefined,
      min: fixUnsigned(props.unsigned === true, props.minValue, false) ?? undefined,
      defaultValue: props.value,
      precision: props.integer === true ? 0 : (props.decimalPrecision ?? undefined),
      step: props.increment ?? undefined,
      value: props.value
    }
  }

  getVersionObjectDataComponent (props: AbstractNumericObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    return (
      <InputNumber
        className={ cn(props.className) }
        { ...this.getVersionObjectDataComponentProps(props) }
      />
    )
  }

  handleDefaultValue (props: AbstractNumericObjectDataDefinition, form: FormInstance, fieldName: NamePath): void {
    if (!_.isNumber(props.defaultValue)) {
      return
    }
    if (!_.isNumber(form.getFieldValue(fieldName))) {
      form.setFieldValue(fieldName, props.defaultValue)
    }
  }
}
