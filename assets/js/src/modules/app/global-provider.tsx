import { store } from '@Pimcore/app/store'
import { ThemeProvider } from '@Pimcore/modules/theme/theme-provider'
import React from 'react'
import { Provider } from 'react-redux'

export interface GlobalProviderProps {
  children: React.ReactNode
}

export const GlobalProvider = ({ children }: GlobalProviderProps): React.JSX.Element => {
  return (
    <ThemeProvider>
      <Provider store={ store }>
        {children}
      </Provider>
    </ThemeProvider>
  )
}
