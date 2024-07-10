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

import { useTranslation } from 'react-i18next'

interface IFormatDateTimeProps {
  timestamp: number
  lng?: string
  timeStyle?: 'short' | 'medium' | 'long' | 'full'
  dateStyle?: 'short' | 'medium' | 'long' | 'full'
  options?: Intl.DateTimeFormatOptions
}

export function formatDateTime ({ timestamp, lng, timeStyle, dateStyle, options }: IFormatDateTimeProps): string {
  const { i18n } = useTranslation()

  if (lng === undefined) {
    lng = i18n.language
  }

  try {
    const date = new Date(timestamp * 1000)

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
  }
  catch (error) {
    throw new Error(`Failed to format date time: ${error}`)
  }

}

export function formatDate (timestamp: number): string {
  return formatDateTime({ timestamp, dateStyle: 'short' })
}

export function formatTime (timestamp: number): string {
  return formatDateTime({ timestamp, timeStyle: 'short' })
}
