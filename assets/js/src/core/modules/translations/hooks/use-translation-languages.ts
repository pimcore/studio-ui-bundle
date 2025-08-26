/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useMemo } from 'react'
import { useUser } from '@Pimcore/modules/auth/hooks/use-user'
import { useSettings } from '@Pimcore/modules/app/settings/hooks/use-settings'
import { useLanguageLookup } from './use-language-lookup'
import { isNil, isString } from 'lodash'

export interface LanguageConfig {
  locale: string
  displayName: string
  canEdit: boolean
  canView: boolean
}

interface UseTranslationLanguagesReturn {
  languages: LanguageConfig[]
  isLoading: boolean
}

/**
 * Hook to get the appropriate languages for translation based on domain type
 * For frontend domains: uses allowedLanguagesForEditingWebsiteTranslations/allowedLanguagesForViewingWebsiteTranslations
 * For admin domains: uses availableAdminLanguages from settings
 */
export const useTranslationLanguages = (isFrontendDomain: boolean): UseTranslationLanguagesReturn => {
  const user = useUser()
  const settings = useSettings()
  const { getDisplayName, isLoading: lookupLoading } = useLanguageLookup()

  const languages = useMemo(() => {
    if (!isFrontendDomain) {
      // For frontend domains, use website translation languages from user
      const editableLocales = user.allowedLanguagesForEditingWebsiteTranslations ?? []
      const viewableLocales = user.allowedLanguagesForViewingWebsiteTranslations ?? []
      
      // Combine all viewable locales as the base set
      const allLocales = new Set(viewableLocales)
      
      return Array.from(allLocales)
        .filter(locale => !isNil(locale) && isString(locale))
        .map(locale => ({
          locale,
          displayName: getDisplayName(locale),
          canEdit: editableLocales.includes(locale),
          canView: true // All locales in this set are viewable
        }))
        .sort((a, b) => (a.displayName ?? 'UNKNOWN').localeCompare(b.displayName ?? 'UNKNOWN'))
    } else {
      // For admin domains, use available admin languages from settings
      const adminLanguages = settings?.availableAdminLanguages ?? []
      
      console.log("adminLanguages", adminLanguages);
      console.log("adminLanguages length:", adminLanguages.length);
      
      const filtered = adminLanguages.filter(lang => {
        console.log(`Full lang object:`, lang);
        console.log(`typeof lang:`, typeof lang);
        console.log(`isString(lang):`, isString(lang));
        
        // adminLanguages contains strings directly, not objects
        const hasLanguage = !isNil(lang) && isString(lang)
        console.log(`Checking lang:`, lang, `hasLanguage:`, hasLanguage);
        return hasLanguage
      })
      
      console.log("filtered languages:", filtered);
      
      const foo = filtered
        .map(langCode => ({
          locale: langCode,
          displayName: getDisplayName(langCode),
          canEdit: true, // Admin languages are always editable
          canView: true  // Admin languages are always viewable
        }))
        .sort((a, b) => (a.displayName ?? 'UNKNOWN').localeCompare(b.displayName ?? 'UNKNOWN'))

              console.log("foo", foo);

        return foo
    }
  }, [isFrontendDomain, user, settings, getDisplayName])

  return {
    languages,
    isLoading: lookupLoading
  }
}
