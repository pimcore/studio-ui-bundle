import React, { StrictMode } from 'react'
import { GlobalProvider } from './global-provider'
import { App as AntApp } from 'antd'
import { router } from '@Pimcore/router/router'
import { RouterProvider } from 'react-router-dom'

export const AppView = (): React.JSX.Element => {
  return (
    <>
      <StrictMode>
        <GlobalProvider>
          <AntApp>
            <RouterProvider router={ router } />
          </AntApp>
        </GlobalProvider>
      </StrictMode>
    </>
  )
}
