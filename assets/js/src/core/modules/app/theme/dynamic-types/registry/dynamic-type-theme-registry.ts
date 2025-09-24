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
import { isNil, isEmpty } from 'lodash'

export interface ResolvedTheme {
  id: string
  config: PimcoreThemeConfig
}

export interface ThemeChain {
  themes: ResolvedTheme[]
}

@injectable()
export class DynamicTypeThemeRegistry extends DynamicTypeRegistryAbstract<DynamicTypeThemeAbstract> {
  /**
   * Resolve a theme and its inheritance chain
   */
  resolveThemeChain (themeId: string): ThemeChain {
    const visited = new Set<string>()
    const themes: ResolvedTheme[] = []

    const resolveTheme = (id: string): void => {
      if (visited.has(id)) {
        throw new Error(`Circular theme dependency detected: ${id}`)
      }

      const theme = this.getDynamicType(id)
      if (isNil(theme)) {
        throw new Error(`Theme not found: ${id}`)
      }

      visited.add(id)

      if (!isNil(theme.extends) && !isEmpty(theme.extends)) {
        for (const parentId of theme.extends) {
          resolveTheme(parentId)
        }
      }

      themes.push({
        id,
        config: theme.getThemeConfig()
      })
    }

    resolveTheme(themeId)
    return { themes }
  }
}
