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
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { addMissingTranslation } from './store/missingTranslations.slice'
import { store } from '../store'
import { returnKeyIfEmptyProcessor } from './utils/post-processors'

export const FALLBACK_LANGUAGE = 'en'

i18n
  .use(initReactI18next)

  .init({
    fallbackLng: FALLBACK_LANGUAGE,
    ns: ['translation'],
    resources: {},
    saveMissing: true,
    postProcess: ['returnKeyIfEmpty']
  })

  .catch(() => {
    trackError(new GeneralError('Could not load translations'))
  })

i18n.use(returnKeyIfEmptyProcessor)

i18n.on('missingKey', (lngs, namespace, key, res) => {
  store.dispatch(addMissingTranslation(key))
  i18n.addResource(FALLBACK_LANGUAGE, namespace, key, key)
})

export default i18n
