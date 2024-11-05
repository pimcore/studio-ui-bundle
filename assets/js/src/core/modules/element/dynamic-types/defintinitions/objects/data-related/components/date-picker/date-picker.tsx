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
import dayjs from 'dayjs'

export interface DatePickerProps extends PickerProps {
  value?: string | number | null
  onChange?: (date: string | number | null) => void
  targetFormat?: string // if not set, ISO8601 will be used
}

export const DatePickerDataComponent = (props: DatePickerProps): React.JSX.Element => {
  const valueToDayJs = (value: string | number | null | undefined): dayjs.Dayjs | null => {
    if (typeof value === 'number') {
      return dayjs.unix(value)
    }
    if (typeof value === 'string') {
      return dayjs(value)
    }
    return null
  }

  const valueToTargetFormat = (value: dayjs.Dayjs | null): string | number | null => {
    return value === null ? null : value.format(props.targetFormat)
  }

  const [value, setValue] = React.useState<dayjs.Dayjs | null>(valueToDayJs(props.value))

  useEffect(() => {
    props.onChange !== undefined && props.onChange(valueToTargetFormat(value))
  }, [value])

  return (
    <OriginalDatePicker
      { ...props }
      onChange={ (date: dayjs.Dayjs | null) => {
        setValue(date)
      } }
      value={ value }

    />
  )
}
