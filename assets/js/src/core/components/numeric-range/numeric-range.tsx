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
import cn from 'classnames'
import { type InputNumberProps } from 'antd/es/input-number'
import { Flex } from '@Pimcore/components/flex/flex'
import { type ValueType } from '@rc-component/mini-decimal/es/interface'
import { t } from 'i18next'
import { InputNumber } from '@Pimcore/components/input-number/input-number'
import { toCssDimension } from '@Pimcore/utils/css'
import { useStyles } from './numeric-range.styles'

export interface NumericRangeValue { minimum: ValueType | null, maximum: ValueType | null }

export type NumericRangeProps = InputNumberProps & {
  value?: NumericRangeValue | null
  onChange?: (value: NumericRangeValue | null) => void
  disabled?: boolean
  width?: string | number | null
  inputClassName?: string
}

export const validateOneFieldEmpty = async (rule, value): Promise<any> => {
  if (value === null) {
    await Promise.resolve(); return
  }
  if (value.minimum === null) {
    await Promise.reject(Error(t('form.validation.numeric-range.first-value-missing')))
  }
  if (value.maximum === null) {
    await Promise.reject(Error(t('form.validation.numeric-range.second-value-missing')))
  }
  await Promise.resolve()
}

export const validateSecondValueGreater = async (rule, value): Promise<any> => {
  await validateOneFieldEmpty(rule, value)
  if (value === null) {
    return
  }

  if (value.minimum > value.maximum) {
    await Promise.reject(Error(t('form.validation.numeric-range.second-value-greater')))
  }
  await Promise.resolve()
}

export const NumericRange = (props: NumericRangeProps): React.JSX.Element => {
  const [value, setValue] = useState<NumericRangeValue | null>(props.value ?? null)

  const { styles } = useStyles()

  useEffect(() => {
    if (props.onChange !== undefined) {
      props.onChange(value)
    }
  }, [value])

  const updateValue = (key: 'minimum' | 'maximum', newValue: ValueType | null): void => {
    setValue((prevValue) => {
      const updatedValue: NumericRangeValue = {
        minimum: prevValue?.minimum ?? null,
        maximum: prevValue?.maximum ?? null,
        [key]: newValue
      }

      return updatedValue.minimum === null && updatedValue.maximum === null ? null : updatedValue
    })
  }

  return (
    <Flex
      align="center"
      className={ cn(styles.container, props.className) }
      gap="small"
      style={ { maxWidth: toCssDimension(props.width) } }

    >
      <InputNumber
        { ...props }
        className={ props.inputClassName }
        onChange={ (newValue) => { updateValue('minimum', newValue) } }
        value={ value !== null ? value.minimum : null }
      />
      <InputNumber
        { ...props }
        className={ props.inputClassName }
        onChange={ (newValue) => { updateValue('maximum', newValue) } }
        value={ value !== null ? value.maximum : null }
      />
    </Flex>
  )
}
