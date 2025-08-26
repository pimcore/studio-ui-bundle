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

export const useTranslationLanguages = (isFrontendDomain: boolean): UseTranslationLanguagesReturn => {
  const user = useUser()
  const settings = useSettings()
  const { getDisplayName, isLoading: lookupLoading } = useLanguageLookup()

  const languages = useMemo(() => {
    if (!isFrontendDomain) {
      const editableLocales = user.allowedLanguagesForEditingWebsiteTranslations ?? []
      const viewableLocales = user.allowedLanguagesForViewingWebsiteTranslations ?? []
      
      const allLocales = new Set(viewableLocales)
      
      return Array.from(allLocales)
        .filter(locale => !isNil(locale) && isString(locale))
        .map(locale => ({
          locale,
          displayName: getDisplayName(locale),
          canEdit: editableLocales.includes(locale),
          canView: true 
        }))
        .sort((a, b) => (a.displayName ?? 'UNKNOWN').localeCompare(b.displayName ?? 'UNKNOWN'))
    } else {
      const adminLanguages = settings?.availableAdminLanguages ?? []
      const filtered = adminLanguages.filter(lang => {
        const hasLanguage = !isNil(lang) && isString(lang)
        return hasLanguage
      })
            
      const foo = filtered
        .map(langCode => ({
          locale: langCode,
          displayName: getDisplayName(langCode),
          canEdit: true, 
          canView: true  
        }))
        .sort((a, b) => (a.displayName ?? 'UNKNOWN').localeCompare(b.displayName ?? 'UNKNOWN'))

        return foo
    }
  }, [isFrontendDomain, user, settings, getDisplayName])

  return {
    languages,
    isLoading: lookupLoading
  }
}
