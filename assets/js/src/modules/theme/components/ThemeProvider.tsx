import { ThemeProvider as AntdThemeProvider } from 'antd-style'
import React from 'react'
import { PimcoreDefaultTheme } from '../utils/default-theme'

interface ThemeProviderProps {
  children: React.ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps): React.JSX.Element => {
  return (
    <AntdThemeProvider theme={ PimcoreDefaultTheme } >
      {children}
    </AntdThemeProvider>
  )
}
