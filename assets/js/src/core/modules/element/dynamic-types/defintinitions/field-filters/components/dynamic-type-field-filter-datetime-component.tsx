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

import React, { useState, useMemo } from 'react'
import { Select } from '@Pimcore/components/select/select'
import { Flex } from '@Pimcore/components/flex/flex'
import { DatePicker } from '@Pimcore/components/date-picker/date-picker'
import { DateRangePicker, type DateRangeTargetValue } from '@Pimcore/components/date-picker/date-range-picker'
import type { AbstractFieldFilterDefinition } from '@Pimcore/modules/element/dynamic-types/defintinitions/field-filters/dynamic-type-field-filter-abstract'
import { useFilters } from '@Pimcore/modules/asset/editor/types/folder/tab-manager/tabs/list/sidebar/filters/hooks/use-filters'

enum DatePickerSettingValue {
  ON = 'on',
  BETWEEN = 'between'
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
  { label: 'Between', value: DatePickerSettingValue.BETWEEN }
]

const DATE_FORMAT = 'YYYY-MM-DD'

export interface DynamicTypeFieldFilterDatetimeProps extends AbstractFieldFilterDefinition {}

export const DynamicTypeFieldFilterDatetimeComponent = ({ column }: DynamicTypeFieldFilterDatetimeProps): React.JSX.Element => {
  const [settingValue, setSettingValue] = useState<DatePickerSettingValue>(DatePickerSettingValue.ON)

  const { getFieldFilter, addOrUpdateFieldFilter } = useFilters()

  const fieldFilter = getFieldFilter(column) as FieldFilterDatetime

  const getDateValue = (datetimeType: DatePickerSettingValue): null | number | number[] => {
    const currentFilterValue = fieldFilter?.filterValue

    if (currentFilterValue == null) return null

    if (datetimeType === DatePickerSettingValue.ON && 'on' in currentFilterValue) {
      setSettingValue(DatePickerSettingValue.ON)

      return currentFilterValue.on
    }

    if (
      datetimeType === DatePickerSettingValue.BETWEEN &&
      'from' in currentFilterValue &&
      'to' in currentFilterValue
    ) {
      setSettingValue(DatePickerSettingValue.BETWEEN)

      return [currentFilterValue.from, currentFilterValue.to]
    }

    return null
  }

  const valueOn = useMemo(() => getDateValue(DatePickerSettingValue.ON) as number | null, [fieldFilter])
  const valueBetween = useMemo(() => getDateValue(DatePickerSettingValue.BETWEEN) as DateRangeTargetValue | null, [fieldFilter])

  const [dateOnValue, setDateOnValue] = useState<null | number>(valueOn)
  const [dateBetweenValue, setDateBetweenValue] = useState<null | DateRangeTargetValue>(valueBetween)

  const handleChangeDateOnValue = (date: number): void => {
    setDateOnValue(date)
    setDateBetweenValue(null)

    addOrUpdateFieldFilter(column, { on: date })
  }

  const handleChangeDateBetweenValue = (dates: DateRangeTargetValue): void => {
    setDateBetweenValue(dates)
    setDateOnValue(null)

    addOrUpdateFieldFilter(column, { from: dates?.[0], to: dates?.[1] })
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
          value={ dateOnValue }
        />
      )}

      {settingValue === DatePickerSettingValue.BETWEEN && (
        <DateRangePicker
          format={ DATE_FORMAT }
          onChange={ handleChangeDateBetweenValue }
          outputType='timestamp'
          value={ dateBetweenValue }
        />
      )}
    </Flex>
  )
}
