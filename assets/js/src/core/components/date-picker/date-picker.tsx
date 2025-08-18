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
import { useStyles } from './date-picker.styles'
import cn from 'classnames'
import { useFieldWidth } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/use-field-width'

export type DatePickerProps = PickerProps & {
  value?: DatePickerValueType
  onChange?: (date: DatePickerValueType) => void
  outputType?: OutputType
  outputFormat?: string
  disabled?: boolean
  inherited?: boolean
}

const DatePickerComponent = (props: DatePickerProps): React.JSX.Element => {
  const value = toDayJs(props.value)
  const fieldWidths = useFieldWidth()

  const { styles } = useStyles()

  // Apply medium width as default for date pickers
  const computedStyle = {
    maxWidth: fieldWidths.small,
    ...props.style
  }

  const handleChange = (date: Dayjs | null): void => {
    props.onChange?.(fromDayJs(date, props.outputType, props.outputFormat))
  }

  return (
    <OriginalDatePicker
      { ...props }
      format={ props.outputFormat }
      onChange={ handleChange }
      popupClassName={ styles.datePickerDropdown }
      rootClassName={ cn(styles.datePicker, props.className, { [styles.inherited]: props.inherited }) }
      showTime={ props.showTime }
      style={ computedStyle }
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
