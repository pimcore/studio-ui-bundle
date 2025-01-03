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
import { InputNumber } from 'antd'
import _ from 'lodash'
import { useQuantityValueUnits } from '@Pimcore/modules/data-object/hooks/use-quantity-value-units'
import { Select } from '@Pimcore/components/select/select'
import { useTranslation } from 'react-i18next'
import { toCssDimension } from '@Pimcore/utils/css'
import { type ValueType } from '@rc-component/mini-decimal/es/interface'
import { useStyles } from './quantity-value-range.styles'
import cn from 'classnames'

export interface QuantityValueRangeProps {
  value?: QuantityValueRangeValue | null
  className?: string
  onChange?: (value: QuantityValueRangeValue | null) => void
  validUnits?: string[] | null
  unitWidth?: string | null
  width?: string | null
  decimalPrecision?: number | null
  disabled?: boolean
}

export interface QuantityValueRangeValue {
  minimum: ValueType | null
  maximum: ValueType | null
  unitId: string | null
}

export const QuantityValueRange = (props: QuantityValueRangeProps): React.JSX.Element => {
  const [value, setValue] = useState<QuantityValueRangeValue>(props.value ?? { minimum: null, maximum: null, unitId: null })
  const { getSelectOptions } = useQuantityValueUnits()
  const { t } = useTranslation()
  const { styles } = useStyles()

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
    if (props.onChange !== undefined) {
      props.onChange(value.minimum === null && value.maximum === null && value.unitId === null ? null : value)
    }
  }, [value])

  return (
    <Flex
      align="center"
      className={ props.className }
      gap="small"
    >
      <Flex
        align="center"
        className="w-full"
        gap="small"
        style={ { maxWidth: toCssDimension(props.width, 310) } }
      >
        <InputNumber
          className={ cn(styles.input, 'w-full') }
          disabled={ props.disabled }
          onChange={ onChangeMinimum }
          precision={ props.decimalPrecision ?? undefined }
          value={ value?.minimum ?? undefined }
        />
        <InputNumber
          className={ cn(styles.input, 'w-full') }
          disabled={ props.disabled }
          onChange={ onChangeMaximum }
          precision={ props.decimalPrecision ?? undefined }
          value={ value?.maximum ?? undefined }
        />
      </Flex>
      <Select
        allowClear
        disabled={ props.disabled }
        onChange={ onChangeSelect }
        optionFilterProp="label"
        options={ getSelectOptions(props.validUnits ?? undefined) }
        placeholder={ '(' + t('empty') + ')' }
        showSearch
        style={ { minWidth: toCssDimension(props.unitWidth, 100) } }
        value={ value?.unitId ?? undefined }
      />
    </Flex>
  )
}
