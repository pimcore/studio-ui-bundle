import React from 'react'
import Example from '@Pimcore/modules/example/containers/example'
import { GlobalProvider } from './global-provider'

export const App = (): React.JSX.Element => {
  return (
    <>
      <GlobalProvider>
        <Example />
      </GlobalProvider>
    </>
  )
}
