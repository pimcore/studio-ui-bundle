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
    return value.unix()
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
