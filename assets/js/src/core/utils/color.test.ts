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

  it('accepts opaque colours in every format theme tokens use', () => {
    expect(isDarkSurface('#000')).toBe(true)
    expect(isDarkSurface('#FFF')).toBe(false)
    expect(isDarkSurface('rgb(30, 30, 36)')).toBe(true)
    expect(isDarkSurface('rgb(255 255 255)')).toBe(false)
    expect(isDarkSurface('rgba(30, 30, 36, 1)')).toBe(true)
    expect(isDarkSurface('  #1E1E24  ')).toBe(true)
  })

  it('judges by luminance rather than by channel values', () => {
    // Saturated mid-tones: green reads light, blue reads dark, at equal channel value.
    expect(isDarkSurface('#00ff00')).toBe(false)
    expect(isDarkSurface('#0000ff')).toBe(true)
  })

  it('rejects translucent colours, whose appearance depends on the backdrop', () => {
    // Black at zero alpha renders as whatever is behind it, so it must not read as dark
    // merely because its channels are zero -- and must agree with `transparent`.
    expect(isDarkSurface('rgba(0, 0, 0, 0)')).toBe(false)
    expect(isDarkSurface('rgba(0, 0, 0, 0.1)')).toBe(false)
    expect(isDarkSurface('rgba(255, 255, 255, 0.09)')).toBe(false)
    expect(isDarkSurface('rgb(0 0 0 / 50%)')).toBe(false)
  })

  it('treats an unparseable colour as light, matching the antd default', () => {
    expect(isDarkSurface('')).toBe(false)
    expect(isDarkSurface('transparent')).toBe(false)
    expect(isDarkSurface('var(--surface)')).toBe(false)
    expect(isDarkSurface('#12345')).toBe(false)
  })
})
