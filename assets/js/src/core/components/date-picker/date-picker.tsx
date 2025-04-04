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
import _ from 'lodash'
import { useStyles } from './date-picker.styles'
import cn from 'classnames'

export type DatePickerProps = PickerProps & {
  value?: DatePickerValueType
  onChange?: (date: DatePickerValueType) => void
  outputType?: OutputType
  outputFormat?: string
  disabled?: boolean
  inherited?: boolean
}

const DatePickerComponent = (props: DatePickerProps): React.JSX.Element => {
  const [value, setValue] = useState<Dayjs | null>(toDayJs(props.value))
  const { styles } = useStyles()

  useEffect(() => {
    const localValue = fromDayJs(value, 'timestamp')
    if (!_.isEqual(fromDayJs(toDayJs(props.value), 'timestamp'), localValue)) {
      setValue(toDayJs(props.value))
    }
  }, [props.value])

  return (
    <OriginalDatePicker
      { ...props }
      format={ props.outputFormat }
      onChange={ (date: Dayjs | null) => {
        setValue(date)
        props.onChange?.(fromDayJs(date, props.outputType, props.outputFormat))
      } }
      popupClassName={ styles.datePickerDropdown }
      rootClassName={ cn(styles.datePicker, props.className, { [styles.inherited]: props.inherited }) }
      showTime={ props.showTime }
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
