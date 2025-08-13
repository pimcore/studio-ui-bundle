/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { DynamicThemeProvider } from './dynamic-theme-provider'

interface ThemeProviderProps {
  children: React.ReactNode
  id?: string
}

export const ThemeProvider = ({ children, id = 'studio-default-light' }: ThemeProviderProps): React.JSX.Element => {
  return (
    <DynamicThemeProvider id={ id }>
      {children}
    </DynamicThemeProvider>
  )
}
