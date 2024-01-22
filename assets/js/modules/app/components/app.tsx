import { store } from '@Pimcore/app/store'
import Example from '@Pimcore/modules/example/components/example'
import { ThemeProvider } from '@Pimcore/modules/theme/components/ThemeProvider'
import React from 'react'
import { Provider } from 'react-redux'

export const App = (): React.JSX.Element => {
  return (
    <>
      <ThemeProvider>
        <Provider store={store}>
          <Example />
        </Provider>
      </ThemeProvider>
    </>
  )
}
