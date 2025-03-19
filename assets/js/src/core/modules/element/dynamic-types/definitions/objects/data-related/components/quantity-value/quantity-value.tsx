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
import { QuantityValueCalculatorButton } from './components/calculator/calculator-button'
import { useStyles } from './quantity-value.styles'
import cn from 'classnames'
import { InputNumber } from '@Pimcore/components/input-number/input-number'
import { useFieldWidth } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/field-width/use-field-width'

export interface QuantityValueProps {
  value?: QuantityValueValue | null
  className?: string
  onChange?: (value: QuantityValueValue | null) => void
  validUnits?: string[] | null
  unitWidth?: string | null
  width?: string | null
  decimalPrecision?: number | null
  autoConvert: boolean
  disabled?: boolean
  inherited?: boolean
}

export interface QuantityValueValue {
  value: ValueType | null
  unitId: string | null
}

export const QuantityValue = (props: QuantityValueProps): React.JSX.Element => {
  const [value, setValueState] = useState<QuantityValueValue>(props.value ?? { value: null, unitId: null })
  const { getSelectOptions } = useQuantityValueUnits()
  const { t } = useTranslation()
  const { convertValue } = useQuantityValueUnits()
  const { styles } = useStyles()
  const fieldWidth = useFieldWidth()

  const setValue = (newValue: QuantityValueValue): void => {
    if (!_.isEqual(newValue, value)) {
      setValueState(newValue)
      props.onChange?.(newValue.value === null && newValue.unitId === null ? null : newValue)
    }
  }

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
    const localValue = value.value === null && value.unitId === null ? null : value
    if (!_.isEqual(props.value, localValue)) {
      setValue(props.value ?? { value: null, unitId: null })
    }
  }, [props.value])

  return (
    <Flex
      align="center"
      className={ cn(styles.container, props.className) }
      gap="small"
    >
      <InputNumber
        className={ cn(styles.input, 'w-full') }
        disabled={ props.disabled }
        inherited={ props.inherited }
        onChange={ onChangeNumber }
        precision={ props.decimalPrecision ?? undefined }
        style={ { maxWidth: toCssDimension(props.width, fieldWidth.small) } }
        value={ value?.value ?? undefined }
      />
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

      { typeof value?.value === 'number' && value?.unitId !== null && (
        <QuantityValueCalculatorButton
          unitId={ value.unitId }
          value={ value?.value }
        />
      ) }
    </Flex>
  )
}
