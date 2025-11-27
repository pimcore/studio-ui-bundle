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
import { type Dayjs } from 'dayjs'
import {
  toDayJs,
  type DatePickerValueType,
  fromDayJs,
  type OutputType
} from './utils/date-picker-utils'
import { TimePicker as OriginalTimePicker, TimeRangePickerProps as antTimeRangePickerProps } from 'antd'
import cn from 'classnames'
import { useStyles } from '@Pimcore/components/date-picker/date-picker.styles'
import { useFieldWidthOptional } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/use-field-width'


export type DateRange = [start: Dayjs | null, end: Dayjs | null]
export type DateRangeTargetValue = [start: DatePickerValueType, end: DatePickerValueType]

export type TimeRangePickerProps = Omit<antTimeRangePickerProps, 'value'> & {
  value?: DateRangeTargetValue | null
  onChange?: (dates: DateRangeTargetValue | null) => void
  outputType?: OutputType
  outputFormat?: string
  inherited?: boolean
}

const valueToDayJs = (value?: DateRangeTargetValue | null, outputFormat?: string): DateRange | null => {
  console.log({value, outputFormat});

  if (Array.isArray(value)) {
    return [
      toDayJs(value[0], outputFormat),
      toDayJs(value[1], outputFormat)
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

export const TimeRangePicker = (props: TimeRangePickerProps): React.JSX.Element => {
  const outputFormat = props?.outputFormat ?? 'HH:mm:ss'
  const value = valueToDayJs(props.value, outputFormat)
  const fieldWidths = useFieldWidthOptional()

  const { styles } = useStyles()

  // Apply small width as default for time pickers (consistent with date picker)
  const computedStyle = {
    maxWidth: fieldWidths?.small,
    ...props.style
  }

  const handleChange = (dates: DateRange | null): void => {
    props.onChange?.(valueFromDayJs(dates, props.outputType, outputFormat))
  }

  return (
    <OriginalTimePicker.RangePicker
      { ...props }
      onChange={ handleChange }
      popupClassName={ styles.datePickerDropdown }
      rootClassName={ cn(styles.datePicker, props.className, { [styles.inherited]: props.inherited }) }
      style={ computedStyle }
      value={ value }
    />
  )
}
