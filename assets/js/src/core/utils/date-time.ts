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
import { store } from '@Pimcore/app/store'
import { selectCurrentUser } from '@Pimcore/modules/auth/user/user-slice'

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

/**
 * Resolution order:
 *   1. explicit `lng` arg
 *   2. the user's `dateTimeLocale` profile setting
 *   3. the browser/OS region (`Intl.DateTimeFormat().resolvedOptions().locale`)
 *   4. the UI language as final fallback
 *
 * Keeps date/time formatting independent of UI language — an English-UI user on an Austrian OS
 * sees Austrian conventions unless they explicitly chose otherwise in their profile.
 */
export function resolveDateTimeLocale (lng?: string): string {
  if (typeof lng === 'string' && lng !== '') {
    return lng
  }

  try {
    const userLocale = selectCurrentUser(store.getState()).dateTimeLocale
    if (typeof userLocale === 'string' && userLocale !== '') {
      return userLocale
    }
  } catch {
    // Store not yet initialised (very early boot, isolated tests) — fall through.
  }

  if (typeof Intl !== 'undefined') {
    const resolved = Intl.DateTimeFormat().resolvedOptions().locale
    if (typeof resolved === 'string' && resolved !== '') {
      return resolved
    }
  }

  return i18n.language
}

export function formatDateTime ({ timestamp, lng, timeStyle, dateStyle, timeZone, options }: IFormatDateTimeProps): string {
  if (timestamp === null) {
    return ''
  }

  try {
    const date = new Date(isNumber(timestamp) ? timestamp * 1000 : timestamp)

    return i18n.format(
      date,
      'datetime',
      resolveDateTimeLocale(lng),
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
