import { ThemeProvider as AntdThemeProvider, type FullToken } from 'antd-style'
import React from 'react'
import Theme from '@Pimcore/assets/theme/default.json'

export interface PimcoreTokens extends FullToken {}

interface ThemeProviderProps {
  children: React.ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps): React.JSX.Element => {
  return (
    <AntdThemeProvider theme={{ ...Theme }} >
      {children}
    </AntdThemeProvider>
  )
}
