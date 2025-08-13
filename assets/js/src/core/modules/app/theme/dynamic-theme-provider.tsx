/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo } from 'react'
import { ThemeProvider as AntdThemeProvider } from 'antd-style'
import { useInjection } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type DynamicTypeThemeRegistry } from './dynamic-types/registry/dynamic-type-theme-registry'
import { type PimcoreThemeConfig } from './dynamic-types/definitions/dynamic-type-theme-abstract'
import { studioThemeIds } from './constants/theme-ids'

export interface DynamicThemeProviderProps {
  children: React.ReactNode
  id?: string
}

const NestedThemeProviders = ({
  children,
  themeChain
}: {
  children: React.ReactNode
  themeChain: Array<{ config: PimcoreThemeConfig }>
}): React.JSX.Element => {
  if (themeChain.length === 0) {
    return <>{children}</>
  }

  const [currentTheme, ...remainingThemes] = themeChain

  return (
    <AntdThemeProvider theme={ currentTheme.config }>
      <NestedThemeProviders themeChain={ remainingThemes }>
        {children}
      </NestedThemeProviders>
    </AntdThemeProvider>
  )
}

export const DynamicThemeProvider = ({ children, id = studioThemeIds.light }: DynamicThemeProviderProps): React.JSX.Element => {
  const themeRegistry = useInjection<DynamicTypeThemeRegistry>(serviceIds['DynamicTypes/ThemeRegistry'])

  const themeChain = useMemo(() => {
    try {
      const resolved = themeRegistry.resolveThemeChain(id)
      return resolved.themes.map(theme => ({
        config: theme.config
      }))
    } catch (error) {
      console.error('Failed to resolve theme chain:', error)
      return []
    }
  }, [themeRegistry, id])

  return (
    <NestedThemeProviders themeChain={ themeChain }>
      {children}
    </NestedThemeProviders>
  )
}
