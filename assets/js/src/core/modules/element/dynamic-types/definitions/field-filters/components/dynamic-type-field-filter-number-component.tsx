/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { Select } from '@Pimcore/components/select/select'
import { Flex } from '@Pimcore/components/flex/flex'
import { InputNumber } from '@Pimcore/components/input-number/input-number'
import { useDynamicFilter } from '@Pimcore/components/dynamic-filter/provider/use-dynamic-filter'
import { t } from 'i18next'
import { type AbstractFieldFilterDefinition } from '../dynamic-type-field-filter-abstract'

enum NumberFilterSettingValue {
  IS = 'is',
  BETWEEN = 'between',
  LESS = 'less',
  MORE = 'more'
}

export interface DynamicTypeFieldFilterNumberProps extends AbstractFieldFilterDefinition {}

export const DynamicTypeFieldFilterNumberComponent = (props: DynamicTypeFieldFilterNumberProps): React.JSX.Element => {
  interface NumberValue {
    setting: NumberFilterSettingValue
    more: number | null
    less: number | null
    value: number | null
  }

  const { data: rawData, setData } = useDynamicFilter()

  const data: NumberValue = rawData ?? {
    setting: NumberFilterSettingValue.IS,
    more: null,
    less: null,
    value: null
  }

  const SETTING_OPTIONS = [
    { label: t('grid.filter.number.is'), value: NumberFilterSettingValue.IS },
    { label: t('grid.filter.number.between'), value: NumberFilterSettingValue.BETWEEN },
    { label: t('grid.filter.number.less'), value: NumberFilterSettingValue.LESS },
    { label: t('grid.filter.number.more'), value: NumberFilterSettingValue.MORE }
  ]

  const currentSetting = data?.setting ?? NumberFilterSettingValue.IS

  const handleSettingChange = (
    newSetting: NumberFilterSettingValue
  ): void => {
    const prevData = data ?? { more: null, less: null, value: null, setting: NumberFilterSettingValue.IS }

    if (newSetting === NumberFilterSettingValue.LESS) {
      setData({
        setting: newSetting,
        more: null,
        less: prevData.less ?? prevData.value ?? prevData.more ?? null,
        value: null
      })
    } else if (newSetting === NumberFilterSettingValue.MORE) {
      setData({
        setting: newSetting,
        more: prevData.more ?? prevData.value ?? prevData.less ?? null,
        less: null,
        value: null
      })
    } else if (newSetting === NumberFilterSettingValue.IS) {
      setData({
        setting: newSetting,
        more: null,
        less: null,
        value: prevData.more ?? prevData.less ?? null
      })
    } else if (newSetting === NumberFilterSettingValue.BETWEEN) {
      setData({
        setting: newSetting,
        more: prevData.more ?? prevData.value ?? null,
        less: prevData.less ?? null,
        value: null
      })
    }
  }

  const handleNumberChange = (field: 'value' | 'more' | 'less', value: number | null): void => {
    setData({
      ...data,
      setting: currentSetting,
      [field]: value
    })
  }

  const handleNumberRangeChange = (field: 'more' | 'less', value: number | null): void => {
    setData({
      ...data,
      setting: data.setting,
      [field]: value
    })
  }

  const getNumberValue = (): number | null => {
    if (currentSetting === NumberFilterSettingValue.IS) {
      return data?.value ?? null
    } else if (currentSetting === NumberFilterSettingValue.LESS) {
      return data?.less ?? null
    } else if (currentSetting === NumberFilterSettingValue.MORE) {
      return data?.more ?? null
    } else return null
  }

  return (
    <Flex
      align="center"
      gap="extra-small"
    >
      <Select
        defaultValue={ NumberFilterSettingValue.IS }
        onChange={ (value: NumberFilterSettingValue) => { handleSettingChange(value as NumberFilterSettingValue) } }
        options={ SETTING_OPTIONS }
        width={ 90 }
      />

      {currentSetting === NumberFilterSettingValue.BETWEEN && (
        <>
          <InputNumber
            onChange={ (value: number | null) => {
              handleNumberRangeChange('more', value)
            } }
            placeholder="From"
            value={ data?.more ?? null }
          />
          <InputNumber
            onChange={ (value: number | null) => {
              handleNumberRangeChange('less', value)
            } }
            placeholder="To"
            value={ data?.less ?? null }
          />
        </>
      )}
      {currentSetting !== NumberFilterSettingValue.BETWEEN && (
        <InputNumber
          onChange={ (value: number | null) => {
            if (currentSetting === NumberFilterSettingValue.IS) {
              handleNumberChange('value', value)
            } else if (currentSetting === NumberFilterSettingValue.LESS) {
              handleNumberChange('less', value)
            } else if (currentSetting === NumberFilterSettingValue.MORE) {
              handleNumberChange('more', value)
            }
          } }
          value={ getNumberValue() }
        />
      )}
    </Flex>
  )
}
