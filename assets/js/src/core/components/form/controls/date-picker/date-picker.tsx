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
import { DatePicker as BaseDatePicker, type DatePickerProps } from '@Pimcore/components/date-picker/date-picker'
import { useFieldWidth } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/use-field-width'

const DatePickerComponent = ({ style, ...props }: DatePickerProps): React.JSX.Element => {
  const fieldWidths = useFieldWidth()

  // Apply medium width as default for date pickers
  const computedStyle = {
    width: fieldWidths.medium,
    ...style
  }

  return <BaseDatePicker style={computedStyle} {...props} />
}

export const DatePicker = Object.assign(DatePickerComponent, {
  RangePicker: BaseDatePicker.RangePicker,
  TimePicker: BaseDatePicker.TimePicker
})

export type { DatePickerProps }
