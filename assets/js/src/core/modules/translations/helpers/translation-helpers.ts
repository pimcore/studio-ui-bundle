/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { uuid } from '@sdk/utils'
import type { Translations } from '../../app/translations/translations-api-slice.gen'

export type TranslationDataItem = {
  key: string
  type: string
} & Record<`_${string}`, string>

export type TranslationRow = TranslationDataItem & {
  rowId: string
}

export const getAvailableLocales = (translations: Translations[]): string[] => {
  if (translations.length === 0) return []

  const localeSet = new Set<string>()

  translations.forEach(translation => {
    if (translation.translations !== null && typeof translation.translations === 'object') {
      Object.keys(translation.translations).forEach(locale => {
        localeSet.add(locale)
      })
    }
  })

  return Array.from(localeSet).sort()
}

export const translationsToRows = (translations: Translations[]): TranslationRow[] => {
  return translations.map(translation => {
    const row: TranslationRow = {
      key: translation.key,
      type: translation.type,
      rowId: uuid()
    }

    if (translation.translations !== null && typeof translation.translations === 'object') {
      Object.entries(translation.translations).forEach(([locale, value]) => {
        row[`_${locale}`] = String(value ?? '')
      })
    }

    return row
  })
}

export const translationDataToRow = (data: TranslationDataItem): TranslationRow => {
  return {
    ...data,
    rowId: uuid()
  }
}
