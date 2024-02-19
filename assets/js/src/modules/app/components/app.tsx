import React, { StrictMode } from 'react'
import { GlobalProvider } from './global-provider'
import { BaseLayout } from '@Pimcore/modules/base-layout/components/base-layout'
import { App as AntApp } from 'antd'

export const App = (): React.JSX.Element => {
  return (
    <>
      <StrictMode>
        <GlobalProvider>
          <AntApp>
            <BaseLayout />
          </AntApp>
        </GlobalProvider>
      </StrictMode>
    </>
  )
}
