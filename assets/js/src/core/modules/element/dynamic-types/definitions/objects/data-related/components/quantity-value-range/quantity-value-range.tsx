/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useRef, useState } from 'react'
import { Flex } from '@Pimcore/components/flex/flex'
import _ from 'lodash'
import { useQuantityValueUnits } from '@Pimcore/modules/data-object/hooks/use-quantity-value-units'
import { Select } from '@Pimcore/components/select/select'
import { useTranslation } from 'react-i18next'
import { toCssDimension } from '@Pimcore/utils/css'
import { type ValueType } from '@rc-component/mini-decimal/es/interface'
import { useStyles } from './quantity-value-range.styles'
import cn from 'classnames'
import { InputNumber } from '@Pimcore/components/input-number/input-number'
import { useFieldWidth } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/use-field-width'
import { theme } from 'antd'

export interface QuantityValueRangeProps {
  value?: QuantityValueRangeValue | null
  className?: string
  onChange?: (value: QuantityValueRangeValue | null) => void
  validUnits?: string[] | null
  unitWidth?: string | null
  Width?: string | null
  decimalPrecision?: number | null
  autoConvert?: boolean
  disabled?: boolean
  inherited?: boolean
}

export interface QuantityValueRangeValue {
  minimum: ValueType | null
  maximum: ValueType | null
  unitId: string | null
}

const { useToken } = theme

type Bound = 'minimum' | 'maximum'
const bounds: Bound[] = ['minimum', 'maximum']

export const QuantityValueRange = (props: QuantityValueRangeProps): React.JSX.Element => {
  const [value, setValueState] = useState<QuantityValueRangeValue>(props.value ?? { minimum: null, maximum: null, unitId: null })
  const { getSelectOptions, convertValue } = useQuantityValueUnits()
  const { t } = useTranslation()
  const { styles } = useStyles()
  const fieldWidth = useFieldWidth()
  const { token } = useToken()

  const latestValue = useRef<QuantityValueRangeValue>(value)
  // The unit each bound's number is actually expressed in; differs from the selected unit while a conversion is pending
  const boundUnits = useRef<Record<Bound, string | null>>({ minimum: value.unitId, maximum: value.unitId })
  const boundVersions = useRef<Record<Bound, number>>({ minimum: 0, maximum: 0 })

  const setValue = (newValue: QuantityValueRangeValue): void => {
    if (!_.isEqual(newValue, latestValue.current)) {
      latestValue.current = newValue
      setValueState(newValue)
      props.onChange?.(newValue.minimum === null && newValue.maximum === null && newValue.unitId === null ? null : newValue)
    }
  }

  const resetBound = (bound: Bound, unitId: string | null): void => {
    boundUnits.current[bound] = unitId
    boundVersions.current[bound]++
  }

  const onChangeBound = (bound: Bound, newValue: ValueType | null): void => {
    // The typed number is in the displayed unit; it also cancels the pending conversion of this bound only
    resetBound(bound, latestValue.current.unitId)
    setValue({
      ...latestValue.current,
      [bound]: newValue ?? null
    })
  }

  const onChangeMinimum = (newValue: ValueType | null): void => {
    onChangeBound('minimum', newValue)
  }
  const onChangeMaximum = (newValue: ValueType | null): void => {
    onChangeBound('maximum', newValue)
  }

  const onChangeSelect = (unitId?: string): void => {
    const current = latestValue.current
    const newUnitId = _.isEmpty(unitId) ? null : (unitId ?? null)

    setValue({
      ...current,
      unitId: newUnitId
    })

    const conversions: Array<{ bound: Bound, version: number, converted: Promise<ValueType | null> }> = []

    bounds.forEach(bound => {
      const boundValue = current[bound]
      const fromUnitId = boundUnits.current[bound]

      if (props.autoConvert !== true || newUnitId === null || fromUnitId === null || fromUnitId === newUnitId || typeof boundValue !== 'number') {
        resetBound(bound, newUnitId)
        return
      }

      // Convert from the unit the number is really in, not from the unit selected last
      conversions.push({
        bound,
        version: ++boundVersions.current[bound],
        converted: convertValue(fromUnitId, newUnitId, boundValue)
      })
    })

    if (conversions.length === 0) {
      return
    }

    void Promise.all(conversions.map(async conversion => await conversion.converted)).then(results => {
      // Drop the answers of bounds that were edited or converted again meanwhile
      const valid = conversions
        .map((conversion, index) => ({ ...conversion, result: results[index] }))
        .filter(conversion => conversion.version === boundVersions.current[conversion.bound])

      if (valid.length === 0) {
        return
      }

      valid.forEach(conversion => { boundUnits.current[conversion.bound] = newUnitId })

      // A bound that cannot be converted changes only the unit
      if (valid.some(conversion => conversion.result === null)) {
        return
      }

      const converted = { ...latestValue.current }
      valid.forEach(conversion => { converted[conversion.bound] = conversion.result })
      setValue(converted)
    })
  }

  useEffect(() => {
    const localValue = value.minimum === null && value.maximum === null && value.unitId === null ? null : value
    if (!_.isEqual(props.value, localValue)) {
      const external = props.value ?? { minimum: null, maximum: null, unitId: null }
      bounds.forEach(bound => { resetBound(bound, external.unitId) })
      setValue(external)
    }
  }, [props.value])

  return (
    <Flex
      align="center"
      className={ cn(styles.container, props.className) }
      gap="small"
    >
      <Flex
        align="center"
        className="w-full"
        gap="small"
        style={ { maxWidth: toCssDimension(props.Width, fieldWidth.small * 2 + Number(token.sizeSM)) } }
      >
        <InputNumber
          className={ cn(styles.input, 'w-full') }
          disabled={ props.disabled }
          inherited={ props.inherited }
          onChange={ onChangeMinimum }
          precision={ props.decimalPrecision ?? undefined }
          value={ value?.minimum ?? undefined }
        />
        <InputNumber
          className={ cn(styles.input, 'w-full') }
          disabled={ props.disabled }
          inherited={ props.inherited }
          onChange={ onChangeMaximum }
          precision={ props.decimalPrecision ?? undefined }
          value={ value?.maximum ?? undefined }
        />
      </Flex>
      <Select
        allowClear
        disabled={ props.disabled }
        inherited={ props.inherited }
        onChange={ onChangeSelect }
        optionFilterProp="label"
        options={ getSelectOptions(props.validUnits ?? undefined) }
        placeholder={ '(' + t('empty') + ')' }
        showSearch
        style={ { minWidth: toCssDimension(props.unitWidth, 150) } }
        value={ value?.unitId ?? undefined }
      />
    </Flex>
  )
}
