/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isDarkSurface } from './color'

describe('isDarkSurface', () => {
  it('reports the shipped theme surfaces correctly', () => {
    // colorBgContainer as pimcore-dark and studio-default-light resolve it.
    expect(isDarkSurface('#1e1e24')).toBe(true)
    expect(isDarkSurface('#ffffff')).toBe(false)
  })

  it('accepts every colour format theme tokens are written in', () => {
    expect(isDarkSurface('#000')).toBe(true)
    expect(isDarkSurface('#FFF')).toBe(false)
    expect(isDarkSurface('rgb(30, 30, 36)')).toBe(true)
    expect(isDarkSurface('rgba(255, 255, 255, 0.85)')).toBe(false)
    expect(isDarkSurface('  #1E1E24  ')).toBe(true)
  })

  it('judges by luminance rather than by channel values', () => {
    // Saturated mid-tones: green reads light, blue reads dark, at equal channel value.
    expect(isDarkSurface('#00ff00')).toBe(false)
    expect(isDarkSurface('#0000ff')).toBe(true)
  })

  it('treats an unparseable colour as light, matching the antd default', () => {
    expect(isDarkSurface('')).toBe(false)
    expect(isDarkSurface('transparent')).toBe(false)
    expect(isDarkSurface('var(--surface)')).toBe(false)
  })
})
