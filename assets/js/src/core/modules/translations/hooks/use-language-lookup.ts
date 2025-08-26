/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useTranslationGetAvailableLocalesQuery } from '@Pimcore/modules/app/translations/translations-api-slice-enhanced'
import { isNil, isString } from 'lodash'
import { useMemo } from 'react'

export interface LocaleInfo {
  locale: string
  displayName: string
}

type LanguageLookup = Record<string, string>

export const useLanguageLookup = (): {
  lookupMap: LanguageLookup
  isLoading: boolean
  getDisplayName: (locale: string) => string
} => {
  const { data: availableLocales, isLoading } = useTranslationGetAvailableLocalesQuery()

  const lookupMap: LanguageLookup = useMemo(() => {
    const map: LanguageLookup = {}

    if (availableLocales !== null && availableLocales !== undefined) {
      availableLocales.forEach(localeInfo => {
        const locale = (localeInfo as any)?.locale
        if (locale !== null && locale !== undefined && locale !== '' && localeInfo?.displayName !== null && localeInfo?.displayName !== undefined && localeInfo.displayName !== '') {
          map[locale] = localeInfo.displayName
        }
      })
    }

    return map
  }, [availableLocales])

  const getDisplayName = (locale: string): string => {
    if (isNil(locale) || !isString(locale)) {
      return 'Unknown'
    }
    return lookupMap[locale] ?? locale.toUpperCase()
  }

  return {
    lookupMap,
    isLoading,
    getDisplayName
  }
}
