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
  type DatePickerValueType,
  toDayJs,
  fromDayJs,
  type OutputType
} from './utils/date-picker-utils'
import { DatePicker } from 'antd'
import { type GenericTimePickerProps } from 'antd/es/date-picker/generatePicker/interface'
import cn from 'classnames'
import { useStyles } from '@Pimcore/components/date-picker/date-picker.styles'

export type TimePickerProps = GenericTimePickerProps & {
  value?: DatePickerValueType
  onChange?: (date: DatePickerValueType) => void
  outputType?: OutputType
  outputFormat?: string
  inherited?: boolean
}

export const TimePicker = (props: TimePickerProps): React.JSX.Element => {
  const outputFormat = props?.outputFormat ?? 'HH:mm:ss'
  const value = toDayJs(props.value, outputFormat)

  const { styles } = useStyles()

  const handleChange = (date: Dayjs | null): void => {
    props.onChange?.(fromDayJs(date, props.outputType, outputFormat))
  }

  const OriginalTimePicker = DatePicker.TimePicker

  return (
    <OriginalTimePicker
      { ...props }
      onChange={ handleChange }
      popupClassName={ styles.datePickerDropdown }
      rootClassName={ cn(styles.datePicker, props.className, { [styles.inherited]: props.inherited }) }
      value={ value }
    />
  )
}
