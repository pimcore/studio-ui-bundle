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

interface IFormatRelativeTimeProps {
  value: number
  unit: Intl.RelativeTimeFormatUnit
  lng?: string
  options?: Intl.RelativeTimeFormatOptions
}

export function formatRelativeTime ({ value, unit, lng, options }: IFormatRelativeTimeProps): string {
  if (lng === undefined) {
    lng = i18n.language
  }

  const formatter = new Intl.RelativeTimeFormat(lng, options)

  return formatter.format(value, unit)
}
