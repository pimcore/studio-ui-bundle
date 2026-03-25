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

interface IFormatCurrencyProps {
  value: number
  lng?: string
  options?: Intl.NumberFormatOptions
}

export function formatCurrency ({ value, lng, options }: IFormatCurrencyProps): string {
  if (lng === undefined) {
    lng = i18n.language
  }

  return i18n.format(
    value,
    'currency',
    lng,
    {
      style: 'currency',
      currency: 'EUR',
      ...options
    }
  )
}
