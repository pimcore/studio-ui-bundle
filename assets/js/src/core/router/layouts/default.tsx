import React from 'react'
import { Background } from '@Pimcore/components/background/background'
import { TranslationsLoaderContainer } from '@Pimcore/modules/app/translations/translations-loader-container'
import { BaseLayoutView } from '@Pimcore/modules/app/base-layout/base-layout-view'
import { useMiddleware } from '@Pimcore/components/login-form/hooks/use-middleware'

export default function DefaultLayout (): React.JSX.Element {
  useMiddleware()

  return (
    <>
      <Background />
      <TranslationsLoaderContainer>
        <BaseLayoutView />
      </TranslationsLoaderContainer>
    </>
  )
}
