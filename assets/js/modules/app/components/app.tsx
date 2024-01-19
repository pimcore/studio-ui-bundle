import { store } from '@Pimcore/app/store'
import Example from '@Pimcore/modules/example/components/example'
import React from 'react'
import { Provider } from 'react-redux'

export const App = (): React.JSX.Element => {
  return (
    <>
      <Provider store={store}>
        <Example />
      </Provider>
    </>
  )
}
