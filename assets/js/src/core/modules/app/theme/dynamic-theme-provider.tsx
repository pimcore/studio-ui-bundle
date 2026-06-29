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
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'

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

/**
 * Reports that not even the light theme could be resolved — the app keeps
 * rendering, but unthemed, which is a broken state worth surfacing.
 */
const reportUnthemedRendering = (error: unknown): void => {
  try {
    trackError(new GeneralError(`Failed to resolve the light theme "${studioThemeIds.light}" — rendering unthemed: ${String(error)}`))
  } catch {
    // trackError re-throws GeneralError by design; swallow it so the app
    // still renders (unthemed) instead of crashing during render.
  }
}

/**
 * Resolves the theme chain for the given id from the theme registry and
 * applies it via nested antd-style theme providers.
 *
 * Note: theme resolution is memoized on [themeRegistry, id] and is NOT
 * reactive to later registry changes. Theme dynamic types must therefore be
 * registered during the module init / app-loader phase, before first render —
 * a theme registered after a failed resolution is only retried once the
 * theme id changes.
 */
export const DynamicThemeProvider = ({ children, id = studioThemeIds.light }: DynamicThemeProviderProps): React.JSX.Element => {
  const themeRegistry = useInjection<DynamicTypeThemeRegistry>(serviceIds['DynamicTypes/ThemeRegistry'])

  const themeChain = useMemo(() => {
    const resolve = (themeId: string): Array<{ config: PimcoreThemeConfig }> =>
      themeRegistry.resolveThemeChain(themeId).themes.map(theme => ({
        config: theme.config
      }))

    try {
      return resolve(id)
    } catch (error) {
      if (id === studioThemeIds.light) {
        reportUnthemedRendering(error)

        return []
      }

      console.warn(`Failed to resolve theme chain for "${id}", falling back to the light theme:`, error)

      try {
        return resolve(studioThemeIds.light)
      } catch (fallbackError) {
        reportUnthemedRendering(fallbackError)
      }

      return []
    }
  }, [themeRegistry, id])

  return (
    <NestedThemeProviders themeChain={ themeChain }>
      {children}
    </NestedThemeProviders>
  )
}
