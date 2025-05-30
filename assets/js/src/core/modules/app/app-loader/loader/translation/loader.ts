/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import i18n, { FALLBACK_LANGUAGE } from '@Pimcore/app/i18n'
import { store } from '@sdk/app'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { useTranslationGetCollectionMutation } from '@Pimcore/modules/app/translations/translations-api-slice.gen'
import { selectCurrentUser } from '@Pimcore/modules/auth/user/user-slice'

export interface UseTranslationLoaderReturn {
  loadPublicTranslations: () => Promise<void>
  loadTranslations: () => Promise<any>
}

export const useTranslationLoader = (): UseTranslationLoaderReturn => {
  const [fetchTranslations] = useTranslationGetCollectionMutation()

  const loadPublicTranslations = async (): Promise<void> => {
    await fetchTranslations({
      translation: {
        locale: FALLBACK_LANGUAGE,
        keys: [],
        useFallback: true
      }
    })
      .unwrap()
      .then(response => {
        i18n.addResourceBundle(FALLBACK_LANGUAGE, 'translation', response.keys ?? [], true, true)
        void i18n.changeLanguage(FALLBACK_LANGUAGE)
      })
      .catch(() => {
        trackError(new GeneralError('Error loading translations'))
        throw new Error('Error loading translations')
      })
  }

  const loadTranslations = async (): Promise<any> => {
    const user = selectCurrentUser(store.getState())

    await fetchTranslations({ translation: { locale: user.language, keys: [], useFallback: true } })
      .unwrap()
      .then(response => {
        i18n.addResourceBundle(user.language, 'translation', response.keys ?? [], true, true)
        void i18n.changeLanguage(user.language)
      })
      .catch((error) => {
        console.error('Error loading translations', error)
        trackError(new GeneralError('Error loading translations'))
      })
  }

  return { loadPublicTranslations, loadTranslations }
}
