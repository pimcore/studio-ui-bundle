import { ConfigProvider } from 'antd'
import React from 'react'
import Theme from '@Pimcore/assets/theme/default.json'

interface ThemeProviderProps {
  children: React.ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps): React.JSX.Element => {
  return (
    <ConfigProvider theme={{ ...Theme }} >
      {children}
    </ConfigProvider>
  )
}
