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

i18n
  .use(initReactI18next)

  .init({
    fallbackLng: 'en',
    ns: ['translation'],
    resources: {},
    saveMissing: true
  })

  .catch((error) => {
    console.error(error)
  })

i18n.on('missingKey', (lngs, namespace, key, res) => {
// @todo implement handling of missing keys after endpoints are available
})

export default i18n
