import { api } from '@Pimcore/modules/asset/translations-api-slice.gen'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { store } from '@Pimcore/app/store'

i18n
  .use(initReactI18next)

  .init({
    fallbackLng: 'en',
    partialBundledLanguages: true,
    ns: [],
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
