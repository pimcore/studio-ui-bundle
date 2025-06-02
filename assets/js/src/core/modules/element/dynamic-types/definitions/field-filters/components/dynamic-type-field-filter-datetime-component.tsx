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
import { DatePicker } from '@Pimcore/components/date-picker/date-picker'
import { DateRangePicker } from '@Pimcore/components/date-picker/date-range-picker'
import { useDynamicFilter } from '@Pimcore/components/dynamic-filter/provider/use-dynamic-filter'
import { t } from 'i18next'
import { type AbstractFieldFilterDefinition } from '../dynamic-type-field-filter-abstract'

enum DatePickerSettingValue {
  ON = 'on',
  BETWEEN = 'between',
  BEFORE = 'before',
  AFTER = 'after'
}

const DATE_FORMAT = 'YYYY-MM-DD'

export interface DynamicTypeFieldFilterDatetimeProps extends AbstractFieldFilterDefinition {}

export const DynamicTypeFieldFilterDatetimeComponent = (props: DynamicTypeFieldFilterDatetimeProps): React.JSX.Element => {
  interface DateValue {
    setting: DatePickerSettingValue
    from: number | null
    to: number | null
    on: number | null
  }

  const { data: rawData, setData } = useDynamicFilter()

  const data: DateValue = rawData ?? {
    setting: DatePickerSettingValue.ON,
    from: null,
    to: null,
    on: null
  }

  const SETTING_OPTIONS = [
    { label: t('grid.filter.datetime.on'), value: DatePickerSettingValue.ON },
    { label: t('grid.filter.datetime.between'), value: DatePickerSettingValue.BETWEEN },
    { label: t('grid.filter.datetime.before'), value: DatePickerSettingValue.BEFORE },
    { label: t('grid.filter.datetime.after'), value: DatePickerSettingValue.AFTER }
  ]

  const currentSetting = data?.setting ?? DatePickerSettingValue.ON

  const handleSettingChange = (
    newSetting: DatePickerSettingValue
  ): void => {
    const prevData = data ?? { from: null, to: null, on: null, setting: DatePickerSettingValue.ON }

    if (newSetting === DatePickerSettingValue.BEFORE) {
      setData({
        setting: newSetting,
        from: null,
        to: prevData.to ?? prevData.on ?? prevData.from ?? null,
        on: null
      })
    } else if (newSetting === DatePickerSettingValue.AFTER) {
      setData({
        setting: newSetting,
        from: prevData.from ?? prevData.on ?? prevData.to ?? null,
        to: null,
        on: null
      })
    } else if (newSetting === DatePickerSettingValue.ON) {
      setData({
        setting: newSetting,
        from: null,
        to: null,
        on: prevData.from ?? prevData.to ?? null
      })
    } else if (newSetting === DatePickerSettingValue.BETWEEN) {
      setData({
        setting: newSetting,
        from: prevData.from ?? prevData.on ?? null,
        to: prevData.to ?? null,
        on: null
      })
    }
  }

  const handleDateChange = (field: 'on' | 'from' | 'to', value: number | null): void => {
    setData({
      setting: currentSetting,
      from: (field === 'from') ? value : null,
      to: (field === 'to') ? value : null,
      on: (field === 'on') ? value : null
    })
  }

  const handleDateRangeChange = (newFrom: number | null, newTo: number | null): void => {
    setData({
      setting: data.setting,
      from: newFrom ?? data.from ?? null,
      to: newTo ?? data.to ?? null,
      on: null
    })
  }

  const getDatePickerValue = (): number | null => {
    if (currentSetting === DatePickerSettingValue.ON) {
      return data?.on ?? null
    } else if (currentSetting === DatePickerSettingValue.BEFORE) {
      return data?.to ?? null
    } else if (currentSetting === DatePickerSettingValue.AFTER) {
      return data?.from ?? null
    } else return null
  }

  return (
    <Flex
      align="center"
      gap="extra-small"
    >
      <Select
        defaultValue={ DatePickerSettingValue.ON }
        onChange={ (value: DatePickerSettingValue) => { handleSettingChange(value as DatePickerSettingValue) } }
        options={ SETTING_OPTIONS }
        width={ 90 }
      />

      {currentSetting === DatePickerSettingValue.BETWEEN && (
        <DateRangePicker
          allowEmpty={ [true, true] }
          format={ DATE_FORMAT }
          onChange={ (value: unknown) => {
            const [newFrom, newTo] = value as [number | null, number | null]
            handleDateRangeChange(newFrom, newTo)
          } }
          outputType="timestamp"
          value={ [data?.from ?? null, data?.to ?? null] }
        />
      )
          }
      {currentSetting !== DatePickerSettingValue.BETWEEN && (
      <DatePicker
        format={ DATE_FORMAT }
        onChange={ (value: unknown) => {
          const newValue = typeof value === 'number' ? value : null

          if (currentSetting === DatePickerSettingValue.ON) {
            handleDateChange('on', newValue)
          } else if (currentSetting === DatePickerSettingValue.BEFORE) {
            handleDateChange('to', newValue)
          } else if (currentSetting === DatePickerSettingValue.AFTER) {
            handleDateChange('from', newValue)
          }
        } }
        outputType="timestamp"
        value={ getDatePickerValue() }
      />
      )}
    </Flex>
  )
}
