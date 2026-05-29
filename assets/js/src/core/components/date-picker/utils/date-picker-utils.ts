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
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { isNonEmptyString } from '@Pimcore/utils/type-utils'

// Extend dayjs with timezone support (idempotent; mirrors use-date-converter.ts)
dayjs.extend(utc)
dayjs.extend(timezone)

export type DatePickerValueType = string | number | Dayjs | null
export type OutputType = 'dateString' | 'timestamp' | 'dayjs'

export interface ToDayJsOptions {
  /**
   * When explicitly `false` the value is treated as a timezone-agnostic wall-clock anchored to the
   * server timezone (Pimcore semantics for date `columnType:'date'` / datetime `respectTimezone:false`).
   * The stored instant is rendered in `timezone` and handed to the picker as a browser-local dayjs
   * carrying those wall-clock fields, so the displayed wall-clock no longer drifts with the browser
   * timezone. Any other value keeps the previous behaviour (display the absolute instant locally).
   */
  respectTimezone?: boolean | null
  /** Server timezone, e.g. from `useSettings().timezone`. */
  timezone?: string
}

/**
 * Returns a browser-local dayjs whose wall-clock fields equal the given instant rendered in
 * `timezone`. Used to anchor non-respect-timezone date fields to the server timezone.
 */
export const toServerWallClock = (instant: Dayjs, timezone: string): Dayjs =>
  dayjs(instant.tz(timezone).format('YYYY-MM-DDTHH:mm:ss'))

/**
 * Serialise a date-picker timestamp (browser-local seconds) for a grid filter request:
 *   - respectTimezone=true  → ISO 8601 with the browser offset (absolute-instant semantics).
 *   - respectTimezone=false → the picked calendar day pinned to UTC midnight as ISO 8601. The
 *                              generic-data-index pipeline indexes naive `date` / `datetime`
 *                              values into OpenSearch without an offset (which OS interprets as
 *                              UTC), so anchoring the filter to UTC keeps the query window aligned
 *                              with the indexed instants regardless of the server timezone.
 */
export const formatFilterDate = (timestamp: number | null, respectTimezone: boolean): string | null => {
  if (timestamp === null) {
    return null
  }
  const dj = dayjs.unix(timestamp)
  if (respectTimezone) {
    return dj.format()
  }
  return `${dj.format('YYYY-MM-DD')}T00:00:00Z`
}

export const toDayJs = (value?: unknown, format?: string, options?: ToDayJsOptions): Dayjs | null => {
  if (dayjs.isDayjs(value)) {
    return value
  }
  if (typeof value === 'number') {
    if (options?.respectTimezone === false && isNonEmptyString(options.timezone)) {
      return toServerWallClock(dayjs.unix(value), options.timezone)
    }
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
