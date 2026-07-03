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
import { isNil } from 'lodash'
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
 * Resolves the theme chain for the given id from the theme registry, deep-merges
 * it into a single config, and applies it via one antd-style theme provider. The
 * deep merge lets a child theme override individual values inside a nested token
 * group without dropping the group's other keys.
 *
 * Note: theme resolution is memoized on [themeRegistry, id] and is NOT
 * reactive to later registry changes. Theme dynamic types must therefore be
 * registered during the module init / app-loader phase, before first render —
 * a theme registered after a failed resolution is only retried once the
 * theme id changes.
 */
export const DynamicThemeProvider = ({ children, id = studioThemeIds.light }: DynamicThemeProviderProps): React.JSX.Element => {
  const themeRegistry = useInjection<DynamicTypeThemeRegistry>(serviceIds['DynamicTypes/ThemeRegistry'])

  const themeConfig = useMemo<PimcoreThemeConfig | null>(() => {
    try {
      return themeRegistry.resolveMergedTheme(id)
    } catch (error) {
      if (id === studioThemeIds.light) {
        reportUnthemedRendering(error)

        return null
      }

      console.warn(`Failed to resolve theme chain for "${id}", falling back to the light theme:`, error)

      try {
        return themeRegistry.resolveMergedTheme(studioThemeIds.light)
      } catch (fallbackError) {
        reportUnthemedRendering(fallbackError)
      }

      return null
    }
  }, [themeRegistry, id])

  if (isNil(themeConfig)) {
    return <>{children}</>
  }

  return (
    <AntdThemeProvider theme={ themeConfig }>
      {children}
    </AntdThemeProvider>
  )
}
