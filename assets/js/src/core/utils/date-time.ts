/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import i18n from 'i18next'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { isNumber } from 'lodash'

interface IFormatDateTimeProps {
  timestamp: number | string | null
  lng?: string
  timeStyle?: 'short' | 'medium' | 'long' | 'full'
  dateStyle?: 'short' | 'medium' | 'long' | 'full'
  options?: Intl.DateTimeFormatOptions
}

export function formatDateTime ({ timestamp, lng, timeStyle, dateStyle, options }: IFormatDateTimeProps): string {
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  if (lng === undefined) {
    lng = i18n.language
  }

  if (timestamp === null) {
    return ''
  }

  try {
    const date = new Date(isNumber(timestamp) ? timestamp * 1000 : timestamp)

    return i18n.format(
      date,
      'datetime',
      lng,
      {
        timeStyle,
        dateStyle,
        ...options
      }
    )
  } catch (error) {
    trackError(new GeneralError(`Failed to format date time: ${error}`))

    return ''
  }
}

export function formatDate (timestamp: number | string): string {
  return formatDateTime({ timestamp, dateStyle: 'short' })
}

export function formatTime (timestamp: number | string): string {
  return formatDateTime({ timestamp, timeStyle: 'short' })
}


export function getLocaleDateFormat (): string {
  const locale = i18n.language
  const parts = new Intl.DateTimeFormat(locale, { dateStyle: 'short' }).formatToParts(new Date(2026, 11, 31))

  return parts.map(part => {
    switch (part.type) {
      case 'day': return part.value.length === 1 ? 'D' : 'DD'
      case 'month': return part.value.length === 1 ? 'M' : 'MM'
      case 'year': return part.value.length <= 2 ? 'YY' : 'YYYY'
      case 'literal': return part.value
      default: return ''
    }
  }).join('')
}

export function getLocaleDateTimeFormat (): string {
  const locale = i18n.language
  const formatter = new Intl.DateTimeFormat(locale, { dateStyle: 'short', timeStyle: 'short' })
  const resolvedOptions = formatter.resolvedOptions()
  const is12Hour = resolvedOptions.hour12 === true
  const parts = formatter.formatToParts(new Date(2026, 11, 31, 23, 59))

  return parts.map(part => {
    switch (part.type) {
      case 'day': return part.value.length === 1 ? 'D' : 'DD'
      case 'month': return part.value.length === 1 ? 'M' : 'MM'
      case 'year': return part.value.length <= 2 ? 'YY' : 'YYYY'
      case 'hour': {
        const token = is12Hour ? 'h' : 'H'
        return part.value.length === 1 ? token : token + token
      }
      case 'minute': return part.value.length === 1 ? 'm' : 'mm'
      case 'dayPeriod': return 'A'
      case 'literal': return part.value
      default: return ''
    }
  }).join('')
}
