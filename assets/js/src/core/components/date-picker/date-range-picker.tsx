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
import { Icon } from '@Pimcore/components/icon/icon'
import { useFieldWidthOptional } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/use-field-width'

export type DateRange = [start: Dayjs | null, end: Dayjs | null]
export type DateRangeTargetValue = [start: DatePickerValueType, end: DatePickerValueType]

export type DateRangePickerProps = OriginalRangePickerProps & {
  value?: DateRangeTargetValue | null
  onChange?: (dates: DateRangeTargetValue | null) => void
  outputType?: OutputType
  outputFormat?: string
  inherited?: boolean
}

const valueToDayJs = (value?: DateRangeTargetValue | null): DateRange | null => {
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
  const value = valueToDayJs(props.value)
  const fieldWidths = useFieldWidthOptional()

  const { styles } = useStyles()

  // Apply large width as default for date range pickers
  const computedStyle = {
    maxWidth: fieldWidths?.medium,
    ...props.style
  }

  const handleChange = (dates: DateRange | null): void => {
    props.onChange?.(valueFromDayJs(dates, props.outputType, props.outputFormat))
  }

  return (
    <OriginalDatePicker.RangePicker
      { ...props }
      onChange={ handleChange }
      popupClassName={ styles.datePickerDropdown }
      rootClassName={ cn(styles.datePicker, props.className, { [styles.inherited]: props.inherited }) }
      separator={ <Icon value="arrow-narrow-right" /> }
      style={ computedStyle }
      value={ value }
    />
  )
}
