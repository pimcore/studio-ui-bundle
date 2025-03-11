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

import React, { useEffect, useState } from 'react'
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
import { useFieldWidth } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/field-width/use-field-width'
import { theme } from 'antd'

export interface QuantityValueRangeProps {
  value?: QuantityValueRangeValue | null
  className?: string
  onChange?: (value: QuantityValueRangeValue | null) => void
  validUnits?: string[] | null
  unitWidth?: string | null
  Width?: string | null
  decimalPrecision?: number | null
  disabled?: boolean
  inherited?: boolean
}

export interface QuantityValueRangeValue {
  minimum: ValueType | null
  maximum: ValueType | null
  unitId: string | null
}

const { useToken } = theme

export const QuantityValueRange = (props: QuantityValueRangeProps): React.JSX.Element => {
  const [value, setValueState] = useState<QuantityValueRangeValue>(props.value ?? { minimum: null, maximum: null, unitId: null })
  const { getSelectOptions } = useQuantityValueUnits()
  const { t } = useTranslation()
  const { styles } = useStyles()
  const fieldWidth = useFieldWidth()
  const { token } = useToken()

  const setValue = (newValue: QuantityValueRangeValue): void => {
    if (!_.isEqual(newValue, value)) {
      setValueState(newValue)
      props.onChange?.(newValue.minimum === null && newValue.maximum === null && newValue.unitId === null ? null : newValue)
    }
  }

  const onChangeMinimum = (newValue: ValueType | null): void => {
    setValue({
      ...value,
      minimum: newValue ?? null
    })
  }
  const onChangeMaximum = (newValue: ValueType | null): void => {
    setValue({
      ...value,
      maximum: newValue ?? null
    })
  }

  const onChangeSelect = (unitId?: string): void => {
    setValue({
      ...value,
      unitId: _.isEmpty(unitId) ? null : (unitId ?? null)
    })
  }

  useEffect(() => {
    const localValue = value.minimum === null && value.maximum === null && value.unitId === null ? null : value
    if (!_.isEqual(props.value, localValue)) {
      setValue(props.value ?? { minimum: null, maximum: null, unitId: null })
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
