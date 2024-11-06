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
import dayjs, { type Dayjs } from 'dayjs'

type DatePickerValueType = string | number | Dayjs | null

type DatePickerPropsBase = PickerProps & {
  value?: DatePickerValueType
  onChange?: (date: string | number | Dayjs | null) => void
  outputType?: 'dateString' | 'timestamp' | 'dayjs'
}

type DatePickerPropsDateString = DatePickerPropsBase & {
  outputType: 'dateString'
  outputFormat?: string // if not set, ISO8601 will be used
}

type DatePickerPropsTimestamp = DatePickerPropsBase & {
  outputType: 'timestamp'
}

export type DatePickerProps = DatePickerPropsDateString | DatePickerPropsTimestamp | DatePickerPropsBase

export const DatePicker = (props: DatePickerProps): React.JSX.Element => {
  const valueToDayJs = (value?: DatePickerValueType | any): Dayjs | null => {
    if (dayjs.isDayjs(value)) {
      return value
    }
    if (typeof value === 'number') {
      return dayjs.unix(value)
    }
    if (typeof value === 'string') {
      return dayjs(value)
    }
    return null
  }

  const outputFormat = (props as DatePickerPropsDateString)?.outputFormat
  const valueToTargetFormat = (value: Dayjs | null): DatePickerValueType => {
    if (value === null) {
      return null
    }
    if (props.outputType === 'timestamp') {
      return value.unix()
    }
    if (props.outputType === 'dateString') {
      return outputFormat !== undefined ? value.format(outputFormat) : value.format()
    }
    return value
  }

  const [value, setValue] = React.useState<Dayjs | null>(valueToDayJs(props.value))

  useEffect(() => {
    if (props.onChange !== undefined) {
      props.onChange(valueToTargetFormat(value))
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
