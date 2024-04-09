import React, { StrictMode } from 'react'
import { GlobalProvider } from './global-provider'
import { BaseLayoutView } from '@Pimcore/modules/app/base-layout/base-layout-view'
import { App as AntApp } from 'antd'
import { TranslationsLoaderContainer } from '@Pimcore/modules/app/translations/translations-loader-container'
import { Background } from '@Pimcore/components/background/background'

export const AppView = (): React.JSX.Element => {
  return (
    <>
      <StrictMode>
        <GlobalProvider>
          <AntApp>
            <Background />
            <TranslationsLoaderContainer>
              <BaseLayoutView />
            </TranslationsLoaderContainer>
          </AntApp>
        </GlobalProvider>
      </StrictMode>
    </>
  )
}
