/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import i18n from '@Pimcore/app/i18n'
import { isNil } from 'lodash'

export interface I18nApi {
  getTranslationResources: () => Record<string, any>
  getCurrentLanguage: () => string
  getFallbackLanguage: () => string
  reportMissingTranslation: (key: string) => void
}

class I18nApiImpl implements I18nApi {
  getTranslationResources (): Record<string, any> {
    const resources: Record<string, any> = {}

    // Get all loaded language resources from i18n
    const languages = i18n.languages ?? []

    languages.forEach(language => {
      const resourceBundle = i18n.getResourceBundle(language, 'translation')
      if (!isNil(resourceBundle)) {
        resources[language] = resourceBundle
      }
    })

    return resources
  }

  getCurrentLanguage (): string {
    return i18n.language
  }

  getFallbackLanguage (): string {
    const fallbackLng = i18n.options.fallbackLng as string
    return fallbackLng !== '' ? fallbackLng : 'en'
  }

  reportMissingTranslation (key: string): void {
    // Trigger the same missing key handling as the main app
    // This will add the key to the missing translations store and handle debounced API calls
    i18n.emit('missingKey', [i18n.language], 'translation', key, key)
  }
}

export const i18nApi = new I18nApiImpl()
