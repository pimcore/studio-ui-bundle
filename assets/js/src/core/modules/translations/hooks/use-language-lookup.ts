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

interface LanguageLookup {
  [locale: string]: string
}

/**
 * Hook to get a language lookup map from locale codes to display names
 * Uses the available locales API to build a cached lookup map
 */
export const useLanguageLookup = (): {
  lookupMap: LanguageLookup
  isLoading: boolean
  getDisplayName: (locale: string) => string
} => {
  const { data: availableLocales, isLoading } = useTranslationGetAvailableLocalesQuery()

  const lookupMap: LanguageLookup = useMemo(() => {
    const map: LanguageLookup = {}
    
    console.log("availableLocales", availableLocales);
    
    if (availableLocales) {
      availableLocales.forEach((localeInfo, index) => {
        console.log(`Processing locale ${index}:`, localeInfo);
        const locale = (localeInfo as any)?.locale
        console.log(`  locale: "${locale}"`);
        console.log(`  displayName: "${localeInfo?.displayName}"`);
        
        if (locale && localeInfo?.displayName) {
          map[locale] = localeInfo.displayName
          console.log(`  Added to map: ${locale} -> ${localeInfo.displayName}`);
        } else {
          console.log(`  Skipped - missing locale or displayName`);
        }
      })
    }
    
    console.log("Final map:", map);
    return map
  }, [availableLocales])

  const getDisplayName = (locale: string): string => {
    if (isNil(locale) || !isString(locale)) {
      return 'UNKNOWN'
    }
    return lookupMap[locale] ?? locale.toUpperCase()
  }

  console.log("lookupMap", lookupMap);
  
  return {
    lookupMap,
    isLoading,
    getDisplayName
  }
}
