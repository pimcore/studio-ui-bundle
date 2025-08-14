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
import { DateRangePicker as BaseDateRangePicker, type DateRangePickerProps } from '@Pimcore/components/date-picker/date-range-picker'
import { useFieldWidth } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/use-field-width'

export const DateRangePicker = ({ style, ...props }: DateRangePickerProps): JSX.Element => {
  const fieldWidths = useFieldWidth()

  // Apply large width as default for date range pickers
  const computedStyle = {
    width: fieldWidths.large,
    ...style
  }

  return <BaseDateRangePicker style={computedStyle} {...props} />
}

export type { DateRangePickerProps }
