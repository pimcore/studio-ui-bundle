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
import { initReactI18next } from 'react-i18next'
import { getPimcoreStudioApi } from '../public-api/helpers/api-helper'
import { returnKeyIfEmptyProcessor } from './utils/post-processors'

export const FALLBACK_LANGUAGE = 'en'

/**
 * Initialize i18n for iframe with translations from parent window
 */
export const initializeIframeI18n = async (): Promise<void> => {
  try {
    // Get translation resources from parent window
    const studioApi = getPimcoreStudioApi()
    const translationResources = studioApi.i18n.getTranslationResources()
    const currentLanguage = studioApi.i18n.getCurrentLanguage()
    const fallbackLanguage = studioApi.i18n.getFallbackLanguage()

    const resources: Record<string, any> = {}
    Object.keys(translationResources).forEach(language => {
      resources[language] = {
        translation: translationResources[language]
      }
    })

    // Initialize i18n with parent window's translations
    await i18n
      .use(initReactI18next)
      .init({
        lng: currentLanguage,
        fallbackLng: fallbackLanguage,
        ns: ['translation'],
        defaultNS: 'translation',
        resources,
        saveMissing: true, 
        postProcess: ['returnKeyIfEmpty'],
        interpolation: {
          escapeValue: false
        }
      })

    // Add the shared post-processor
    i18n.use(returnKeyIfEmptyProcessor)

    // Set up missing key handler to report back to parent window
    i18n.on('missingKey', (lngs, namespace, key, res) => {
      try {
        studioApi.i18n.reportMissingTranslation(key)
        
        i18n.addResource(currentLanguage, namespace, key, key)
        if (currentLanguage !== fallbackLanguage) {
          i18n.addResource(fallbackLanguage, namespace, key, key)
        }
        
        console.debug(`Missing translation key reported to parent: ${key}`)
      } catch (error) {
        console.warn(`Could not report missing translation key '${key}' to parent window:`, error)
        
        i18n.addResource(currentLanguage, namespace, key, key)
        if (currentLanguage !== fallbackLanguage) {
          i18n.addResource(fallbackLanguage, namespace, key, key)
        }
      }
    })

    console.log(`Iframe i18n initialized with ${Object.keys(translationResources).length} languages and missing key reporting`)
  } catch (error) {
    console.warn('Could not initialize iframe i18n from parent window, falling back to basic setup:', error)
    
    // Fallback initialization if parent API is not available
    await i18n
      .use(initReactI18next)
      .init({
        lng: FALLBACK_LANGUAGE,
        fallbackLng: FALLBACK_LANGUAGE,
        ns: ['translation'],
        resources: {},
        saveMissing: false
      })
  }
}

export default i18n