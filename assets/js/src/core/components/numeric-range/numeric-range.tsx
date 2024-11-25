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
import { InputNumber } from 'antd'
import { type InputNumberProps } from 'antd/es/input-number'
import { Flex } from '@Pimcore/components/flex/flex'
import { type ValueType } from '@rc-component/mini-decimal/es/interface'
import { t } from 'i18next'

export type NumericRangeValue = [start: ValueType | null, end: ValueType | null]

export type NumericRangeProps = InputNumberProps & {
  value?: NumericRangeValue | null
  onChange?: (value: NumericRangeValue | null) => void
}

export const validateOneFieldEmpty = async (rule, value): Promise<any> => {
  if (value === null) {
    await Promise.resolve(); return
  }
  if (value[0] === null) {
    await Promise.reject(Error(t('form.validation.numeric-range.first-value-missing')))
  }
  if (value[1] === null) {
    await Promise.reject(Error(t('form.validation.numeric-range.second-value-missing')))
  }
  await Promise.resolve()
}

export const validateSecondValueGreater = async (rule, value): Promise<any> => {
  await validateOneFieldEmpty(rule, value)
  if (value === null) {
    return
  }

  if (value[0] > value[1]) {
    await Promise.reject(Error(t('form.validation.numeric-range.second-value-greater')))
  }
  await Promise.resolve()
}

export const NumericRange = (props: NumericRangeProps): React.JSX.Element => {
  const [value, setValue] = useState<NumericRangeValue | null>(props.value ?? null)

  useEffect(() => {
    if (props.onChange !== undefined) {
      props.onChange(value)
    }
  }, [value])

  const updateValue = (index: number, newValue: ValueType | null): void => {
    setValue((prevValue) => {
      if (prevValue === null) {
        prevValue = [null, null]
      }
      const updatedValue: NumericRangeValue = index === 0 ? [newValue, prevValue[1]] : [prevValue[0], newValue]

      return updatedValue[0] === null && updatedValue[1] === null ? null : updatedValue
    })
  }

  return (
    <Flex
      align="center"
      className={ props.className }
      gap="mini"
    >
      <InputNumber
        { ...props }
        onChange={ (newValue) => { updateValue(0, newValue) } }
        value={ value !== null ? value[0] : null }
      />
      <div>–</div>
      <InputNumber
        { ...props }
        onChange={ (newValue) => { updateValue(1, newValue) } }
        value={ value !== null ? value[1] : null }
      />
    </Flex>
  )
}
