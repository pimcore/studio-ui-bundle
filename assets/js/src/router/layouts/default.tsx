import React from 'react'
import { Background } from '@Pimcore/components/background/background'
import { TranslationsLoaderContainer } from '@Pimcore/modules/app/translations/translations-loader-container'
import { BaseLayoutView } from '@Pimcore/modules/app/base-layout/base-layout-view'

export default function DefaultLayout (): React.JSX.Element {
  return (
    <>
      <Background />
      <TranslationsLoaderContainer>
        <BaseLayoutView />
      </TranslationsLoaderContainer>
    </>
  )
}
