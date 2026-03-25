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
import { useDynamicFilter } from '@Pimcore/components/dynamic-filter/provider/use-dynamic-filter'
import { t } from 'i18next'
import { type AbstractFieldFilterDefinition } from '../dynamic-type-field-filter-abstract'
import { TimePicker } from '@sdk/components'
import { TimeRangePicker } from '@Pimcore/components/date-picker/time-range-picker'

export enum TimePickerSettingValue {
  ON = 'on',
  BETWEEN = 'between',
  BEFORE = 'before',
  AFTER = 'after'
}

const DATE_FORMAT = 'HH:mm'

export interface DateValue {
  setting: TimePickerSettingValue
  from: string | null
  to: string | null
  on: string | null
}

export interface DynamicTypeFieldFilterTimeProps extends AbstractFieldFilterDefinition {}

export const DynamicTypeFieldFilterTimeComponent = (props: DynamicTypeFieldFilterTimeProps): React.JSX.Element => {
  const { data: rawData, setData } = useDynamicFilter()

  const data: DateValue = rawData ?? {
    setting: TimePickerSettingValue.ON,
    from: null,
    to: null,
    on: null
  }

  const SETTING_OPTIONS = [
    { label: t('grid.filter.on'), value: TimePickerSettingValue.ON },
    { label: t('grid.filter.between'), value: TimePickerSettingValue.BETWEEN },
    { label: t('grid.filter.before'), value: TimePickerSettingValue.BEFORE },
    { label: t('grid.filter.after'), value: TimePickerSettingValue.AFTER }
  ]

  const currentSetting = data?.setting ?? TimePickerSettingValue.ON

  const handleSettingChange = (
    newSetting: TimePickerSettingValue
  ): void => {
    const prevData = data ?? { from: null, to: null, on: null, setting: TimePickerSettingValue.ON }

    if (newSetting === TimePickerSettingValue.BEFORE) {
      setData({
        setting: newSetting,
        from: null,
        to: prevData.to ?? prevData.on ?? prevData.from ?? null,
        on: null
      })
    } else if (newSetting === TimePickerSettingValue.AFTER) {
      setData({
        setting: newSetting,
        from: prevData.from ?? prevData.on ?? prevData.to ?? null,
        to: null,
        on: null
      })
    } else if (newSetting === TimePickerSettingValue.ON) {
      setData({
        setting: newSetting,
        from: null,
        to: null,
        on: prevData.from ?? prevData.to ?? null
      })
    } else if (newSetting === TimePickerSettingValue.BETWEEN) {
      setData({
        setting: newSetting,
        from: prevData.from ?? prevData.on ?? null,
        to: prevData.to ?? null,
        on: null
      })
    }
  }

  const getTimePickerValue = (): string | null => {
    if (currentSetting === TimePickerSettingValue.ON) {
      return data?.on ?? null
    } else if (currentSetting === TimePickerSettingValue.BEFORE) {
      return data?.to ?? null
    } else if (currentSetting === TimePickerSettingValue.AFTER) {
      return data?.from ?? null
    } else return null
  }

  const handleTimeChange = (field: 'on' | 'from' | 'to', value: string | null): void => {
    setData({
      setting: currentSetting,
      from: (field === 'from') ? value : null,
      to: (field === 'to') ? value : null,
      on: (field === 'on') ? value : null
    })
  }

  const handleTimeRangeChange = (newFrom: string | null, newTo: string | null): void => {
    setData({
      setting: data.setting,
      from: newFrom ?? data.from ?? null,
      to: newTo ?? data.to ?? null,
      on: null
    })
  }

  return (
    <Flex
      align="center"
      gap="extra-small"
    >
      <Select
        defaultValue={ TimePickerSettingValue.ON }
        onChange={ (value: TimePickerSettingValue) => { handleSettingChange(value) } }
        options={ SETTING_OPTIONS }
        width={ 90 }
      />

      {currentSetting === TimePickerSettingValue.BETWEEN && (
        <TimeRangePicker
          format={ DATE_FORMAT }
          onChange={ (value: unknown) => {
            const [newFrom, newTo] = value as [string | null, string | null]

            handleTimeRangeChange(newFrom, newTo)
          } }
          outputFormat={ DATE_FORMAT }
          outputType="dateString"
          value={ [data?.from ?? null, data?.to ?? null] }
        />
      )
          }
      {currentSetting !== TimePickerSettingValue.BETWEEN && (
      <TimePicker
        format={ DATE_FORMAT }
        onChange={ (value: string | null) => {
          if (currentSetting === TimePickerSettingValue.ON) {
            handleTimeChange('on', value)
          } else if (currentSetting === TimePickerSettingValue.BEFORE) {
            handleTimeChange('to', value)
          } else if (currentSetting === TimePickerSettingValue.AFTER) {
            handleTimeChange('from', value)
          }
        } }
        outputFormat={ DATE_FORMAT }
        outputType="dateString"
        value={ getTimePickerValue() }

      />
      )}
    </Flex>
  )
}
