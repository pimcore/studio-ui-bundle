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
import { useAppSelector } from '@Pimcore/app/store'
import { DynamicThemeProvider } from './dynamic-theme-provider'
import { selectThemeId } from './theme-slice'

export interface ThemeProviderProps {
  children: React.ReactNode
  /**
   * Explicit theme id override. When omitted, the theme id from the
   * store applies (settable via setThemeId, defaults to the light theme).
   */
  id?: string
}

/**
 * Applies the currently active studio theme.
 *
 * Note: this component unconditionally reads the theme id from the redux
 * store (useAppSelector) and therefore requires a react-redux Provider
 * ancestor (e.g. the studio GlobalProvider) to be rendered.
 */
export const ThemeProvider = ({ children, id }: ThemeProviderProps): React.JSX.Element => {
  const storeThemeId = useAppSelector(selectThemeId)

  return (
    <DynamicThemeProvider id={ id ?? storeThemeId }>
      {children}
    </DynamicThemeProvider>
  )
}
