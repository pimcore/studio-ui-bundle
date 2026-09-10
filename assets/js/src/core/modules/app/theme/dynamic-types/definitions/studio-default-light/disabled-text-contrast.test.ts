/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { theme, type GlobalToken, type ThemeConfig } from 'antd'
import { studioDefaultLightThemeConfig } from './dynamic-type-theme-studio-default-light'

/**
 * The Pimcore theme config carries custom component groups (Colors, Tree, IconButton, …)
 * that antd's ThemeConfig does not describe, so it needs a cast to reach getDesignToken.
 * antd passes unknown component keys through untouched, which is what makes them readable
 * as token.<Group> at runtime.
 */
const resolveToken = (config: object): GlobalToken => theme.getDesignToken(config as ThemeConfig)

/**
 * antd aliases both colorTextDisabled and colorTextPlaceholder to colorTextQuaternary, so
 * these assert the resolved alias tokens rather than the raw config.
 */
describe('disabled and placeholder text contrast', () => {
  it('raises both aliases in the light theme', () => {
    const token = resolveToken(studioDefaultLightThemeConfig)

    expect(token.colorTextDisabled).toBe('rgba(0, 0, 0, 0.55)')
    expect(token.colorTextPlaceholder).toBe('rgba(0, 0, 0, 0.55)')
  })

  /**
   * A dark theme extending this one inherits `token` but replaces `algorithm`. Carrying the
   * light value through would paint black text on a dark surface, so the fallback must be
   * antd's own derivation from the dark text base — not the light literal.
   */
  it('does not leak the light value into a dark theme that has no override of its own', () => {
    const darkChild = {
      ...studioDefaultLightThemeConfig,
      algorithm: theme.darkAlgorithm
    }

    const token = resolveToken(darkChild)

    expect(token.colorTextDisabled).toBe('rgba(255, 255, 255, 0.25)')
    expect(token.colorTextPlaceholder).toBe('rgba(255, 255, 255, 0.25)')
  })

  it('lets a dark theme raise it with its own override', () => {
    const darkChild = {
      ...studioDefaultLightThemeConfig,
      token: { ...studioDefaultLightThemeConfig.token, colorTextQuaternary: 'rgba(255, 255, 255, 0.52)' },
      algorithm: theme.darkAlgorithm
    }

    const token = resolveToken(darkChild)

    expect(token.colorTextDisabled).toBe('rgba(255, 255, 255, 0.52)')
  })
})
