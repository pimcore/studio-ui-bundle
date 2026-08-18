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
import { isNil } from 'lodash'

interface IFormatNumberProps {
  value?: number
  lng?: string
  options?: Intl.NumberFormatOptions
}

const DEFAULT_DECIMAL_SEPARATOR = '.'

/**
 * The decimal separator of the given (or current UI) language — ',' for de/fr/it/…, '.' for en.
 *
 * Numeric input has to accept what `formatNumber` renders, otherwise a German user reads "12,4"
 * in a grid preview but cannot type it back into the editor.
 */
export function getDecimalSeparator (lng?: string): string {
  // Pimcore stores locales as `de_DE`, Intl only accepts BCP 47 tags (`de-DE`).
  const locale = (lng ?? i18n.language ?? '').replaceAll('_', '-')

  try {
    return new Intl.NumberFormat(locale)
      .formatToParts(1.1)
      .find((part) => part.type === 'decimal')
      ?.value ?? DEFAULT_DECIMAL_SEPARATOR
  } catch {
    // Empty or malformed locale tag — Intl throws a RangeError. Keep the input usable.
    return DEFAULT_DECIMAL_SEPARATOR
  }
}

export function formatNumber ({ value, lng, options = { useGrouping: false } }: IFormatNumberProps): string {
  if (isNil(value)) {
    return ''
  }

  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  if (lng === undefined) {
    lng = i18n.language
  }

  return i18n.format(
    value,
    'number',
    lng,
    options
  )
}
