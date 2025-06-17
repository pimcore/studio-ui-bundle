/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import dayjs, { type Dayjs } from 'dayjs'

export type DatePickerValueType = string | number | Dayjs | null
export type OutputType = 'dateString' | 'timestamp' | 'dayjs'
export const toDayJs = (value?: DatePickerValueType | unknown, format?: string): Dayjs | null => {
  if (dayjs.isDayjs(value)) {
    return value
  }
  if (typeof value === 'number') {
    return dayjs.unix(value)
  }
  if (typeof value === 'string') {
    return dayjs(value, format)
  }
  return null
}

export const fromDayJs = (value: Dayjs | null, outputType?: OutputType, outputFormat?: string): DatePickerValueType => {
  if (value === null) {
    return null
  }

  if (outputType === 'timestamp') {
    const normalized = value.startOf('day')

    const year = normalized.year()
    const month = normalized.month()
    const day = normalized.date()

    return new Date(year, month, day).getTime() / 1000
  }

  if (outputType === 'dateString') {
    return outputFormat !== undefined ? value.format(outputFormat) : value.format()
  }
  return value
}

export const formatDatePickerDate = (date?: DatePickerValueType): string => {
  if (date === null || date === undefined) {
    return ''
  }
  return dayjs.isDayjs(date) ? '[dayjs object]: ' + date.toString() : date.toString()
}
