/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { addMissingTranslation } from './store/missingTranslations.slice'
import { store } from '../store'

const FALLBACK_LANGUAGE = 'en'

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

i18n.use({
  type: 'postProcessor',
  name: 'returnKeyIfEmpty',
  process (value, key, options, translator) {
    let returnValue = value

    if (value === '') {
      returnValue = key

      if (Array.isArray(key)) {
        returnValue = key[0]
      }
    }

    if (typeof returnValue !== 'string') {
      try {
        returnValue = JSON.stringify(returnValue)
      } catch (e) {
        throw new Error(`Translation key '${key}' with value '${value}' is not translatable. Error in i18n postProcessor: ${e}`)
      }

      console.warn('Malformed translation key detected:', key, value)
    }

    return returnValue
  }
})

i18n.on('missingKey', (lngs, namespace, key, res) => {
  store.dispatch(addMissingTranslation(key))
  i18n.addResource(FALLBACK_LANGUAGE, namespace, key, key)
})

export default i18n
