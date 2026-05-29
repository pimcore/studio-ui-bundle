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
  /**
   * IANA timezone (e.g. the server timezone) to render the instant in. When omitted the browser's
   * local timezone is used. Pass the server timezone for non-respect-timezone (wall-clock) fields so
   * grid previews match the editor regardless of the browser timezone.
   */
  timeZone?: string
  options?: Intl.DateTimeFormatOptions
}

export function formatDateTime ({ timestamp, lng, timeStyle, dateStyle, timeZone, options }: IFormatDateTimeProps): string {
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
        ...(timeZone !== undefined ? { timeZone } : {}),
        ...options
      }
    )
  } catch (error) {
    trackError(new GeneralError(`Failed to format date time: ${error}`))

    return ''
  }
}

export function formatDate (timestamp: number | string, timeZone?: string): string {
  return formatDateTime({ timestamp, dateStyle: 'short', timeZone })
}

export function formatTime (timestamp: number | string, timeZone?: string): string {
  return formatDateTime({ timestamp, timeStyle: 'short', timeZone })
}

