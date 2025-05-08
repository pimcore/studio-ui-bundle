/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState, useMemo, useEffect } from 'react'
import { Select } from '@Pimcore/components/select/select'
import { Flex } from '@Pimcore/components/flex/flex'
import { DatePicker } from '@Pimcore/components/date-picker/date-picker'
import { DateRangePicker, type DateRangeTargetValue } from '@Pimcore/components/date-picker/date-range-picker'
import type { AbstractFieldFilterDefinition } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/dynamic-type-field-filter-abstract'
import { useDynamicFilter } from '@Pimcore/components/dynamic-filter/provider/use-dynamic-filter'

enum DatePickerSettingValue {
  ON = 'on',
  BETWEEN = 'between',
  BEFORE = 'before',
  AFTER = 'after'
}

interface FieldFilterDatetimeON {
  on: number
}

interface FieldFilterDatetimeBetween {
  from: number
  to: number
}

interface FieldFilterDatetime {
  filterValue?: FieldFilterDatetimeON | FieldFilterDatetimeBetween
}

const SETTING_OPTIONS = [
  { label: 'On', value: DatePickerSettingValue.ON },
  { label: 'Between', value: DatePickerSettingValue.BETWEEN },
  { label: 'Before', value: DatePickerSettingValue.BEFORE },
  { label: 'After', value: DatePickerSettingValue.AFTER }
]

const DATE_FORMAT = 'YYYY-MM-DD'

export interface DynamicTypeFieldFilterDatetimeProps extends AbstractFieldFilterDefinition {}

export const DynamicTypeFieldFilterDatetimeComponent = (props: DynamicTypeFieldFilterDatetimeProps): React.JSX.Element => {
  const [settingValue, setSettingValue] = useState<DatePickerSettingValue>(DatePickerSettingValue.ON)

  const { data, setData } = useDynamicFilter()

  const fieldFilter = data as FieldFilterDatetime

  const getDateValue = (datetimeType: DatePickerSettingValue): null | number | number[] => {
    const currentFilterValue = fieldFilter?.filterValue

    if (currentFilterValue == null) return null

    switch (datetimeType) {
      case DatePickerSettingValue.ON:
        if ('on' in currentFilterValue) {
          setSettingValue(DatePickerSettingValue.ON)
          return currentFilterValue.on
        }
        break

      case DatePickerSettingValue.BEFORE:
        if ('to' in currentFilterValue) {
          setSettingValue(DatePickerSettingValue.BEFORE)
          return currentFilterValue.to
        }
        break

      case DatePickerSettingValue.AFTER:
        if ('from' in currentFilterValue) {
          setSettingValue(DatePickerSettingValue.AFTER)
          return currentFilterValue.from
        }
        break

      case DatePickerSettingValue.BETWEEN:
        if ('from' in currentFilterValue && 'to' in currentFilterValue) {
          setSettingValue(DatePickerSettingValue.BETWEEN)
          return [currentFilterValue.from, currentFilterValue.to]
        }
        break

      default:
        return null
    }
  }

  const valueOn = useMemo(() => getDateValue(DatePickerSettingValue.ON) as number | null, [fieldFilter])
  const valueBefore = useMemo(() => getDateValue(DatePickerSettingValue.BEFORE) as number | null, [fieldFilter])
  const valueAfter = useMemo(() => getDateValue(DatePickerSettingValue.AFTER) as number | null, [fieldFilter])
  const valueBetween = useMemo(() => getDateValue(DatePickerSettingValue.BETWEEN) as DateRangeTargetValue | null, [fieldFilter])

  const [dateOnValue, setDateOnValue] = useState<null | number>(valueOn)
  const [dateBeforeValue, setDateBeforeValue] = useState<null | number>(valueBefore)
  const [dateAfterValue, setDateAfterValue] = useState<null | number>(valueAfter)
  const [dateBetweenValue, setDateBetweenValue] = useState<null | DateRangeTargetValue>(valueBetween)

  useEffect(() => {
    setSettingValue(DatePickerSettingValue.ON)
  }, [])

  const handleChangeDateOnValue = (date: number): void => {
    setData({ on: date })
    setDateOnValue(date)

    setDateBetweenValue(null)
    setDateBeforeValue(null)
    setDateAfterValue(null)
  }

  const handleChangeDateBeforeAfterValue = (date: number): void => {
    const isBefore = settingValue === DatePickerSettingValue.BEFORE
    const isAfter = settingValue === DatePickerSettingValue.AFTER

    setData({
      from: isBefore ? null : date,
      to: isAfter ? date : null
    })

    setDateBeforeValue(isBefore ? date : null)
    setDateAfterValue(isAfter ? null : date)

    setDateOnValue(null)
    setDateBetweenValue(null)
  }

  const handleChangeDateBetweenValue = (dates: DateRangeTargetValue): void => {
    setDateBetweenValue(dates)
    setData({ from: dates?.[0], to: dates?.[1] })

    setDateOnValue(null)
    setDateBeforeValue(null)
    setDateAfterValue(null)
  }

  return (
    <Flex
      align="center"
      gap="extra-small"
    >
      <Select
        onChange={ (value: DatePickerSettingValue) => { setSettingValue(value) } }
        options={ SETTING_OPTIONS }
        value={ settingValue }
        width={ 90 }
      />

      {settingValue === DatePickerSettingValue.ON && (
      <DatePicker
        format={ DATE_FORMAT }
        onChange={ handleChangeDateOnValue }
        outputType='timestamp'
        showTime
        value={ dateOnValue }
      />
      )}

      {(settingValue === DatePickerSettingValue.BEFORE || settingValue === DatePickerSettingValue.AFTER) && (
      <DatePicker
        format={ DATE_FORMAT }
        onChange={ handleChangeDateBeforeAfterValue }
        outputType='timestamp'
        showTime
        value={
        settingValue === DatePickerSettingValue.BEFORE
          ? dateBeforeValue
          : dateAfterValue }
      />
      )}

      {settingValue === DatePickerSettingValue.BETWEEN && (
      <DateRangePicker
        allowEmpty={ [true, true] }
        format={ DATE_FORMAT }
        onChange={ handleChangeDateBetweenValue }
        outputType='timestamp'
        showTime
        value={ dateBetweenValue }
      />
      )}
    </Flex>
  )
}
