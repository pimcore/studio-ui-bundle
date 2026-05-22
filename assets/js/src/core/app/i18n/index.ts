/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { isNonEmptyString } from '@sdk/utils'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { store } from '../store'
import { addMissingTranslation } from './store/missingTranslations.slice'
import { createDebugTranslationsProcessor, returnKeyIfEmptyProcessor } from './utils/post-processors'

export const FALLBACK_LANGUAGE = 'en'

i18n
  .use(initReactI18next)

  .init({
    fallbackLng: FALLBACK_LANGUAGE,
    ns: ['translation'],
    resources: {},
    keySeparator: false,
    saveMissing: true,
    postProcess: ['returnKeyIfEmpty', 'debugTranslations']
  })

  .catch(() => {
    trackError(new GeneralError('Could not load translations'))
  })

i18n.use(returnKeyIfEmptyProcessor)

const debugTranslationsProcessor = createDebugTranslationsProcessor(
  () => (store.getState()).settings?.settings?.debug_admin_translations === true
)
i18n.use(debugTranslationsProcessor)

i18n.on('missingKey', (lngs, namespace, key, res) => {
  if (isNonEmptyString(key)) {
    store.dispatch(addMissingTranslation(key))
    i18n.addResource(FALLBACK_LANGUAGE, namespace, key, key)
  }
})

export default i18n
