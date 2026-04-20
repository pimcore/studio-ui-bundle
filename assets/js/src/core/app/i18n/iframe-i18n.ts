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
import { isNonEmptyString } from '@sdk/utils'

export const FALLBACK_LANGUAGE = 'en'

const getValidTranslationValue = (value: string | undefined, key: string): string | undefined => {
  if (isNonEmptyString(value) && value !== key) {
    return value
  }

  return undefined
}

const resolveTranslatedValue = (
  resources: Record<string, Record<string, string>>,
  key: string,
  currentLanguage: string,
  fallbackLanguage: string
): string | undefined => {
  const currentValue = getValidTranslationValue(resources[currentLanguage]?.[key], key)
  if (currentValue !== undefined) {
    return currentValue
  }

  const fallbackValue = getValidTranslationValue(resources[fallbackLanguage]?.[key], key)
  if (fallbackValue !== undefined) {
    return fallbackValue
  }

  return undefined
}

export const initializeIframeI18n = async (): Promise<void> => {
  try {
    const { i18n: i18nApi } = getPimcoreStudioApi()
    const translationResources = i18nApi.getTranslationResources()
    const currentLanguage = i18nApi.getCurrentLanguage()
    const fallbackLanguage = i18nApi.getFallbackLanguage()

    const resources: Record<string, any> = {}
    Object.keys(translationResources).forEach(language => {
      resources[language] = {
        translation: { ...(translationResources[language] ?? {}) }
      }
    })

    await i18n
      .use(initReactI18next)
      .init({
        lng: currentLanguage,
        fallbackLng: fallbackLanguage,
        ns: ['translation'],
        defaultNS: 'translation',
        keySeparator: false,
        resources,
        saveMissing: true,
        postProcess: ['returnKeyIfEmpty'],
        interpolation: {
          escapeValue: false
        }
      })

    i18n.use(returnKeyIfEmptyProcessor)

    i18n.on('missingKey', (lngs, namespace, key, res) => {
      if (!isNonEmptyString(key)) {
        return
      }

      try {
        const latestResources = i18nApi.getTranslationResources()
        const translatedValue = resolveTranslatedValue(latestResources, key, currentLanguage, fallbackLanguage)

        if (translatedValue !== undefined) {
          i18n.addResource(currentLanguage, namespace, key, translatedValue)

          if (currentLanguage !== fallbackLanguage) {
            i18n.addResource(fallbackLanguage, namespace, key, translatedValue)
          }

          console.warn('[iframe-i18n] missingKey but translation exists in parent catalog', {
            key,
            currentLanguage,
            fallbackLanguage,
            translatedValue
          })
        } else {
          i18nApi.reportMissingTranslation(key)
        }
      } catch (error) {
        console.warn(`Could not report missing translation key '${key}' to parent window:`, error)
      }
    })
  } catch (error) {
    console.warn('Could not initialize iframe i18n from parent window, falling back to basic setup:', error)

    await i18n
      .use(initReactI18next)
      .init({
        lng: FALLBACK_LANGUAGE,
        fallbackLng: FALLBACK_LANGUAGE,
        keySeparator: false,
        ns: ['translation'],
        resources: {},
        saveMissing: false
      })
  }
}

export default i18n
