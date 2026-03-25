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

export enum NumberFilterSettingValue {
  IS = 'is',
  BETWEEN = 'between',
  LESS = 'less',
  MORE = 'more'
}

export interface NumberValue {
  setting: NumberFilterSettingValue
  from: number | null
  to: number | null
  is: number | null
}

export interface DynamicTypeFieldFilterNumberProps extends AbstractFieldFilterDefinition {}

export const DynamicTypeFieldFilterNumberComponent = (props: DynamicTypeFieldFilterNumberProps): React.JSX.Element => {
  const { data: rawData, setData } = useDynamicFilter()

  const data: NumberValue = rawData ?? {
    setting: NumberFilterSettingValue.IS,
    from: null,
    to: null,
    is: null
  }

  const SETTING_OPTIONS = [
    { label: t('grid.filter.is'), value: NumberFilterSettingValue.IS },
    { label: t('grid.filter.between'), value: NumberFilterSettingValue.BETWEEN },
    { label: t('grid.filter.less'), value: NumberFilterSettingValue.LESS },
    { label: t('grid.filter.more'), value: NumberFilterSettingValue.MORE }
  ]

  const currentSetting = data?.setting ?? NumberFilterSettingValue.IS

  const handleSettingChange = (
    newSetting: NumberFilterSettingValue
  ): void => {
    const prevData = data ?? { from: null, to: null, is: null, setting: NumberFilterSettingValue.IS }

    if (newSetting === NumberFilterSettingValue.LESS) {
      setData({
        setting: newSetting,
        from: null,
        to: prevData.to ?? prevData.is ?? prevData.from ?? null,
        is: null
      })
    } else if (newSetting === NumberFilterSettingValue.MORE) {
      setData({
        setting: newSetting,
        from: prevData.from ?? prevData.is ?? prevData.to ?? null,
        to: null,
        is: null
      })
    } else if (newSetting === NumberFilterSettingValue.IS) {
      setData({
        setting: newSetting,
        from: null,
        to: null,
        is: prevData.from ?? prevData.to ?? null
      })
    } else if (newSetting === NumberFilterSettingValue.BETWEEN) {
      setData({
        setting: newSetting,
        from: prevData.from ?? prevData.is ?? null,
        to: prevData.to ?? null,
        is: null
      })
    }
  }

  const handleNumberChange = (field: 'is' | 'from' | 'to', value: number | null): void => {
    setData({
      ...data,
      setting: currentSetting,
      [field]: value
    })
  }

  const handleNumberRangeChange = (field: 'from' | 'to', value: number | null): void => {
    setData({
      ...data,
      setting: data.setting,
      [field]: value
    })
  }

  const getNumberValue = (): number | null => {
    if (currentSetting === NumberFilterSettingValue.IS) {
      return data?.is ?? null
    } else if (currentSetting === NumberFilterSettingValue.LESS) {
      return data?.to ?? null
    } else if (currentSetting === NumberFilterSettingValue.MORE) {
      return data?.from ?? null
    } else return null
  }

  return (
    <Flex
      align="center"
      gap="extra-small"
    >
      <Select
        defaultValue={ NumberFilterSettingValue.IS }
        onChange={ (value: NumberFilterSettingValue) => { handleSettingChange(value) } }
        options={ SETTING_OPTIONS }
        width={ currentSetting === NumberFilterSettingValue.MORE ? 100 : 90 }
      />

      {currentSetting === NumberFilterSettingValue.BETWEEN && (
        <>
          <InputNumber
            onChange={ (value: number | null) => {
              handleNumberRangeChange('from', value)
            } }
            placeholder={ t('grid.filter.from') }
            value={ data?.from ?? null }
          />
          <InputNumber
            onChange={ (value: number | null) => {
              handleNumberRangeChange('to', value)
            } }
            placeholder={ t('grid.filter.to') }
            value={ data?.to ?? null }
          />
        </>
      )}
      {currentSetting !== NumberFilterSettingValue.BETWEEN && (
        <InputNumber
          onChange={ (value: number | null) => {
            if (currentSetting === NumberFilterSettingValue.IS) {
              handleNumberChange('is', value)
            } else if (currentSetting === NumberFilterSettingValue.LESS) {
              handleNumberChange('to', value)
            } else if (currentSetting === NumberFilterSettingValue.MORE) {
              handleNumberChange('from', value)
            }
          } }
          value={ getNumberValue() }
        />
      )}
    </Flex>
  )
}
