import React, { StrictMode } from 'react'
import { GlobalProvider } from './global-provider'
import { BaseLayoutView } from '@Pimcore/modules/base-layout/base-layout-view'
import { App as AntApp } from 'antd'
import {TranslationsLoaderContainer} from "@Pimcore/modules/translations/translations-loader-container";

export const AppView = (): React.JSX.Element => {
  return (
    <>
      <StrictMode>
        <GlobalProvider>
          <AntApp>
            <TranslationsLoaderContainer>
              <BaseLayoutView />
            </TranslationsLoaderContainer>
          </AntApp>
        </GlobalProvider>
      </StrictMode>
    </>
  )
}
