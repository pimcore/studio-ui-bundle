import React, { StrictMode } from 'react'
import { GlobalProvider } from './global-provider'
import { BaseLayout } from '@Pimcore/modules/base-layout/components/base-layout'

export const App = (): React.JSX.Element => {
  return (
    <>
      <StrictMode>
        <GlobalProvider>
          <BaseLayout />
        </GlobalProvider>
      </StrictMode>
    </>
  )
}
