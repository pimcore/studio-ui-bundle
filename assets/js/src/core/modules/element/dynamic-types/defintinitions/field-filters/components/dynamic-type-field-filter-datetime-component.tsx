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

import React, { useState } from 'react'
import { Select } from '@Pimcore/components/select/select'
import { Flex } from '@Pimcore/components/flex/flex'
import { DatePicker } from '@Pimcore/components/date-picker/date-picker'
import { type DateRange, DateRangePicker } from '@Pimcore/components/date-picker/date-range-picker'
import type { AbstractFieldFilterDefinition } from '@Pimcore/modules/element/dynamic-types/defintinitions/field-filters/dynamic-type-field-filter-abstract'
import { useFilters } from '@Pimcore/modules/asset/editor/types/folder/tab-manager/tabs/list/sidebar/filters/hooks/use-filters'

enum DatePickerSettingValue {
  ON = 'on',
  BETWEEN = 'between'
}

interface FieldFilterDatetimeON {
  on?: number
}

interface FieldFilterDatetimeBetween {
  from?: number
  to?: number
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
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const value = fieldFilter?.filterValue?.on ?? null

  const [dateOnValue, setDateOnValue] = useState<null | number | any>(value)

  const handleChangeDateOnValue = (date: number): void => {
    setDateOnValue(date)

    addOrUpdateFieldFilter(column, { on: date })
  }

  const handleChangeDateBetweenValue = (date: DateRange): void => {
    console.warn('---->>> handleChangeDateBetweenValue: ', date, column)
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
          onChange={ (date: DateRange) => { handleChangeDateBetweenValue(date) } }
        />
      )}
    </Flex>
  )
}
