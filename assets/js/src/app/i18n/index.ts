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
