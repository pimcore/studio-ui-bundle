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

import React, { useEffect } from 'react'
import { type PickerProps } from 'antd/lib/date-picker/generatePicker/interface'
import { DatePicker as OriginalDatePicker } from 'antd'
import { type Dayjs } from 'dayjs'
import {
  type DatePickerValueType,
  toDayJs,
  fromDayJs,
  type OutputType
} from './utils/date-picker-utils'
import { DateRangePicker, type DateRangePickerProps } from '@Pimcore/components/date-picker/date-range-picker'
import { TimePicker, type TimePickerProps } from '@Pimcore/components/date-picker/time-picker'

export type DatePickerProps = PickerProps & {
  value?: DatePickerValueType
  onChange?: (date: DatePickerValueType) => void
  outputType?: OutputType
  outputFormat?: string
}

const DatePickerComponent = (props: DatePickerProps): React.JSX.Element => {
  const outputFormat = props?.outputFormat

  const [value, setValue] = React.useState<Dayjs | null>(toDayJs(props.value))

  useEffect(() => {
    if (props.onChange !== undefined) {
      props.onChange(fromDayJs(value, props.outputType, props.outputFormat))
    }
  }, [value, props.outputType, outputFormat])

  return (
    <OriginalDatePicker
      { ...props }
      onChange={ (date: Dayjs | null) => {
        setValue(date)
      } }
      value={ value }
    />
  )
}

interface DatePickerReturn extends React.FC<DatePickerProps> {
  RangePicker: React.FC<DateRangePickerProps>
  TimePicker: React.FC<TimePickerProps>
}

export const DatePicker = Object.assign(DatePickerComponent, {
  RangePicker: DateRangePicker,
  TimePicker
}) as DatePickerReturn
