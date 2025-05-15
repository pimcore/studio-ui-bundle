/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { ThemeProvider as AntdThemeProvider } from 'antd-style'
import React from 'react'
import { PimcoreDefaultTheme } from './utils/themes/default-theme'

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
