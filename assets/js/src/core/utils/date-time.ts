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
