import React, { useEffect, useState } from 'react'
import { useGetTranslationsMutation } from '@Pimcore/modules/app/translations/translations-api-slice.gen'
import { useTranslation } from 'react-i18next'

interface TranslationsLoaderContainerProps {
  children: React.ReactNode
}

export const TranslationsLoaderContainer = (props: TranslationsLoaderContainerProps): React.JSX.Element => {
  const [isLoading, setIsLoading] = useState(true)
  const [translations] = useGetTranslationsMutation()
  const { i18n } = useTranslation()

  useEffect(() => {
    translations({ translation: { locale: 'en', keys: [] } })
      .unwrap()
      .then(response => {
        i18n.addResourceBundle('en', 'translation', response.keys ?? [], true, true)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('rejected', error)
      })
  }, [])

  if (isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <>
      {props.children}
    </>
  )
}
