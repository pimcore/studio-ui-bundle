/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { injectable } from 'inversify'
import { DynamicTypeRegistryAbstract } from '@Pimcore/modules/element/dynamic-types/registry/dynamic-type-registry-abstract'
import { type PimcoreThemeConfig, type DynamicTypeThemeAbstract } from '../definitions/dynamic-type-theme-abstract'
import { isNil, isEmpty, isArray, mergeWith } from 'lodash'

export interface ResolvedTheme {
  id: string
  config: PimcoreThemeConfig
}

export interface ThemeChain {
  themes: ResolvedTheme[]
}

/**
 * Deep-merges an override theme config on top of a base one.
 *
 * Custom token namespaces (e.g. `components.Colors.Brand.Warning`) are nested
 * several levels deep, so a shallow merge would replace a whole group and drop
 * its untouched siblings. Plain objects are therefore merged recursively, while
 * arrays (algorithm lists) and functions (a single algorithm) replace wholesale
 * — deep-merging those would corrupt antd's token derivation.
 */
const mergeThemeConfigs = (base: PimcoreThemeConfig, override: PimcoreThemeConfig): PimcoreThemeConfig =>
  mergeWith({}, base, override, (_baseValue: unknown, overrideValue: unknown) => {
    if (isArray(overrideValue) || typeof overrideValue === 'function') {
      return overrideValue
    }

    // Returning undefined defers to lodash's default recursive merge.
    return undefined
  })

@injectable()
export class DynamicTypeThemeRegistry extends DynamicTypeRegistryAbstract<DynamicTypeThemeAbstract> {
  /**
   * Resolve a theme and its inheritance chain into an ordered list of configs,
   * from the root ancestor down to the requested leaf theme.
   *
   * A theme reached via more than one path (diamond inheritance) is emitted only
   * once, at its first occurrence; a theme that (transitively) extends itself
   * throws, since that chain can never be resolved.
   */
  resolveThemeChain (themeId: string): ThemeChain {
    const ancestorsOnPath = new Set<string>()
    const emitted = new Set<string>()
    const themes: ResolvedTheme[] = []

    const resolveTheme = (id: string): void => {
      if (ancestorsOnPath.has(id)) {
        throw new Error(`Circular theme dependency detected: ${id}`)
      }

      if (emitted.has(id)) {
        return
      }

      const theme = this.getDynamicType(id)
      if (isNil(theme)) {
        throw new Error(`Theme not found: ${id}`)
      }

      ancestorsOnPath.add(id)

      if (!isNil(theme.extends) && !isEmpty(theme.extends)) {
        for (const parentId of theme.extends) {
          resolveTheme(parentId)
        }
      }

      ancestorsOnPath.delete(id)
      emitted.add(id)
      themes.push({
        id,
        config: theme.getThemeConfig()
      })
    }

    resolveTheme(themeId)
    return { themes }
  }

  /**
   * Resolve a theme's inheritance chain and deep-merge it into a single config,
   * with the leaf theme's values taking precedence over its ancestors'.
   */
  resolveMergedTheme (themeId: string): PimcoreThemeConfig {
    return this.resolveThemeChain(themeId).themes.reduce<PimcoreThemeConfig>(
      (merged, theme) => mergeThemeConfigs(merged, theme.config),
      {}
    )
  }
}
