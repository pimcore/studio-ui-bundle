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

import React from 'react'
import { type RangePickerProps as OriginalRangePickerProps } from 'antd/lib/date-picker/generatePicker/interface'
import { DatePicker as OriginalDatePicker } from 'antd'
import { type Dayjs } from 'dayjs'
import {
  toDayJs,
  type DatePickerValueType,
  fromDayJs,
  type OutputType
} from './utils/date-picker-utils'
import { useStyles } from '@Pimcore/components/date-picker/date-picker.styles'
import cn from 'classnames'

export type DateRange = [start: Dayjs | null, end: Dayjs | null]
export type DateRangeTargetValue = [start: DatePickerValueType, end: DatePickerValueType]

export type DateRangePickerProps = OriginalRangePickerProps & {
  value?: DateRangeTargetValue | null
  onChange?: (dates: DateRangeTargetValue | null) => void
  outputType?: OutputType
  outputFormat?: string
  inherited?: boolean
}

const valueToDayJs = (value?: DateRangeTargetValue | unknown): DateRange | null => {
  if (Array.isArray(value)) {
    return [
      toDayJs(value[0]),
      toDayJs(value[1])
    ]
  }

  return null
}

const valueFromDayJs = (value: DateRange | null, outputType?: OutputType, outputFormat?: string): DateRangeTargetValue | null => {
  if (value === null) {
    return null
  }

  return [
    fromDayJs(value[0], outputType, outputFormat),
    fromDayJs(value[1], outputType, outputFormat)
  ]
}

export const DateRangePicker = (props: DateRangePickerProps): React.JSX.Element => {
  const [value, setValue] = React.useState<DateRange | null>(valueToDayJs(props.value))
  const { styles } = useStyles()

  return (
    <OriginalDatePicker.RangePicker
      { ...props }
      onChange={ (dates: DateRange | null) => {
        setValue(dates)
        props.onChange?.(valueFromDayJs(dates, props.outputType, props.outputFormat))
      } }
      rootClassName={ cn(styles.datePicker, props.className, { [styles.inherited]: props.inherited }) }
      value={ value }
    />
  )
}
