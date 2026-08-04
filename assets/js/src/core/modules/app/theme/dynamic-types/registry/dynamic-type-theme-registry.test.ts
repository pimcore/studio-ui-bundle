/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import 'reflect-metadata'
import { DynamicTypeThemeRegistry } from './dynamic-type-theme-registry'
import { DynamicTypeThemeAbstract, type PimcoreThemeConfig } from '../definitions/dynamic-type-theme-abstract'

class TestTheme extends DynamicTypeThemeAbstract {
  constructor (
    readonly id: string,
    private readonly config: PimcoreThemeConfig,
    extendsIds?: string[]
  ) {
    super()
    this.extends = extendsIds
  }

  getThemeConfig (): PimcoreThemeConfig {
    return this.config
  }
}

const createRegistry = (...themes: TestTheme[]): DynamicTypeThemeRegistry => {
  const registry = new DynamicTypeThemeRegistry()
  themes.forEach(theme => { registry.registerDynamicType(theme) })

  return registry
}

describe('DynamicTypeThemeRegistry', () => {
  describe('resolveThemeChain', () => {
    it('orders the chain from root ancestor down to the requested leaf', () => {
      const registry = createRegistry(
        new TestTheme('base', {}),
        new TestTheme('mid', {}, ['base']),
        new TestTheme('leaf', {}, ['mid'])
      )

      const ids = registry.resolveThemeChain('leaf').themes.map(theme => theme.id)

      expect(ids).toEqual(['base', 'mid', 'leaf'])
    })

    it('emits a theme reached through multiple parents only once (diamond inheritance)', () => {
      const registry = createRegistry(
        new TestTheme('base', {}),
        new TestTheme('left', {}, ['base']),
        new TestTheme('right', {}, ['base']),
        new TestTheme('leaf', {}, ['left', 'right'])
      )

      const ids = registry.resolveThemeChain('leaf').themes.map(theme => theme.id)

      expect(ids).toEqual(['base', 'left', 'right', 'leaf'])
    })

    it('throws on a circular dependency', () => {
      const registry = createRegistry(
        new TestTheme('a', {}, ['b']),
        new TestTheme('b', {}, ['a'])
      )

      expect(() => registry.resolveThemeChain('a')).toThrow(/Circular theme dependency/)
    })

    it('throws when a theme extends itself', () => {
      const registry = createRegistry(new TestTheme('a', {}, ['a']))

      expect(() => registry.resolveThemeChain('a')).toThrow(/Circular theme dependency/)
    })
  })

  describe('resolveMergedTheme', () => {
    it('keeps sibling keys of a nested token group when a child overrides one value', () => {
      const registry = createRegistry(
        new TestTheme('base', {
          components: {
            Colors: {
              Brand: {
                Warning: { colorWarningBg: '#baseBg', colorWarningText: '#baseText' },
                Success: { colorSuccessBg: '#baseSuccess' }
              }
            }
          }
        }),
        new TestTheme('leaf', {
          components: {
            Colors: {
              Brand: {
                Warning: { colorWarningBg: '#leafBg' }
              }
            }
          }
        }, ['base'])
      )

      const merged = registry.resolveMergedTheme('leaf')
      const brand = (merged.components?.Colors as any).Brand

      // Overridden value wins, untouched sibling values in the same nested group survive.
      expect(brand.Warning.colorWarningBg).toBe('#leafBg')
      expect(brand.Warning.colorWarningText).toBe('#baseText')
      expect(brand.Success.colorSuccessBg).toBe('#baseSuccess')
    })

    it('overrides flat token and component values with the leaf theme', () => {
      const registry = createRegistry(
        new TestTheme('base', {
          token: { colorPrimary: '#base', colorBgCanvas: '#baseCanvas' },
          components: { Button: { colorPrimary: '#baseBtn', borderRadius: 4 } }
        }),
        new TestTheme('leaf', {
          token: { colorPrimary: '#leaf' },
          components: { Button: { colorPrimary: '#leafBtn' } }
        }, ['base'])
      )

      const merged = registry.resolveMergedTheme('leaf')

      expect(merged.token).toEqual({ colorPrimary: '#leaf', colorBgCanvas: '#baseCanvas' })
      expect(merged.components?.Button).toEqual({ colorPrimary: '#leafBtn', borderRadius: 4 })
    })

    it('replaces an algorithm array wholesale instead of merging by index', () => {
      const baseAlg = jest.fn()
      const leafAlgA = jest.fn()
      const leafAlgB = jest.fn()

      const registry = createRegistry(
        new TestTheme('base', { algorithm: [baseAlg] }),
        new TestTheme('leaf', { algorithm: [leafAlgA, leafAlgB] }, ['base'])
      )

      const merged = registry.resolveMergedTheme('leaf')

      expect(merged.algorithm).toEqual([leafAlgA, leafAlgB])
    })

    it('does not mutate the source theme configs', () => {
      const baseConfig: PimcoreThemeConfig = { token: { colorPrimary: '#base' } }
      const registry = createRegistry(
        new TestTheme('base', baseConfig),
        new TestTheme('leaf', { token: { colorPrimary: '#leaf' } }, ['base'])
      )

      registry.resolveMergedTheme('leaf')

      expect(baseConfig.token).toEqual({ colorPrimary: '#base' })
    })
  })
})
