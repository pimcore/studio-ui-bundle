/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { store } from '@Pimcore/app/store'
import { api as baseApi } from '@Pimcore/modules/app/translations/translations-api-slice-enhanced'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'

export interface ILanguageLoader {
  loadAvailableLocales: () => Promise<void>
}

export const useLanguageLoader = (): ILanguageLoader => {
  const loadAvailableLocales = async (): Promise<void> => {
    try {
      await store.dispatch(
        baseApi.endpoints.translationGetAvailableLocales.initiate(undefined, {
          forceRefetch: false,
          subscribe: true
        })
      ).unwrap()
    } catch (error) {
      trackError(new GeneralError('Error loading available locales'))
      throw error
    }
  }

  return {
    loadAvailableLocales
  }
}
