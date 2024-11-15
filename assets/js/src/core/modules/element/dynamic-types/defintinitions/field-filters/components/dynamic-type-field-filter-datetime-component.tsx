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
import type { Dayjs } from 'dayjs'

enum DatePickerSettingValue {
  ON = 'on',
  BETWEEN = 'between'
}

const SETTING_OPTIONS = [
  { label: 'On', value: DatePickerSettingValue.ON },
  { label: 'Between', value: DatePickerSettingValue.BETWEEN }
]

const DATE_FORMAT = 'YYYY-MM-DD'

export const DynamicTypeFieldFilterDatetimeComponent = (): React.JSX.Element => {
  const [settingValue, setSettingValue] = useState<DatePickerSettingValue>(DatePickerSettingValue.ON)

  const handleChangeDateOnValue = (date: Dayjs): void => {
    console.log('---->>> handleChangeDateOnValue: ', date)
  }

  const handleChangeDateBetweenValue = (date: DateRange): void => {
    console.log('---->>> handleChangeDateBetweenValue: ', date)
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
          onChange={ (date: Dayjs) => { handleChangeDateOnValue(date) } }
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
