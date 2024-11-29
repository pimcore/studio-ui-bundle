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
import { QuantityValueCalculatorButton } from './components/calculator/calculator-button'

export interface QuantityValueProps {
  value?: QuantityValueValue | null
  className?: string
  onChange?: (value: QuantityValueValue | null) => void
  validUnits?: string[] | null
  unitWidth?: string | null
  width?: string | null
  decimalPrecision?: number | null
  autoConvert: boolean
}

export interface QuantityValueValue {
  value: ValueType | null
  unitId: string | null
}

export const QuantityValue = (props: QuantityValueProps): React.JSX.Element => {
  const [value, setValue] = useState<QuantityValueValue>(props.value ?? { value: null, unitId: null })
  const { getSelectOptions } = useQuantityValueUnits()
  const { t } = useTranslation()
  const { convertValue } = useQuantityValueUnits()

  const onChangeNumber = (newValue: ValueType | null): void => {
    setValue({
      ...value,
      value: newValue ?? null
    })
  }

  const onChangeSelect = (unitId?: string): void => {
    if (props.autoConvert && !_.isEmpty(unitId) && typeof value?.value === 'number' && value?.unitId !== null) {
      void convertValue(value.unitId, unitId!, value.value).then((convertedValue: number | null) => {
        if (convertedValue === null) {
          return
        }

        setValue({
          unitId: unitId!,
          value: convertedValue
        })
      })
    }

    setValue({
      ...value,
      unitId: _.isEmpty(unitId) ? null : (unitId ?? null)
    })
  }

  useEffect(() => {
    if (props.onChange !== undefined) {
      props.onChange(value.value === null && value.unitId === null ? null : value)
    }
  }, [value])

  return (
    <Flex
      align="center"
      className={ props.className }
      gap="small"
    >
      <InputNumber
        className="w-full"
        onChange={ onChangeNumber }
        precision={ props.decimalPrecision ?? undefined }
        style={ { maxWidth: toCssDimension(props.width, 150) } }
        value={ value?.value ?? undefined }
      />
      <Select
        allowClear
        onChange={ onChangeSelect }
        optionFilterProp="label"
        options={ getSelectOptions(props.validUnits ?? undefined) }
        placeholder={ '(' + t('empty') + ')' }
        showSearch
        style={ { minWidth: toCssDimension(props.unitWidth, 100) } }
        value={ value?.unitId ?? undefined }
      />

      { typeof value?.value === 'number' && value?.unitId !== null && (
        <QuantityValueCalculatorButton
          unitId={ value.unitId }
          value={ value?.value }
        />
      ) }
    </Flex>
  )
}
