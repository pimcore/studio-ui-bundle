/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { theme } from 'antd'
import { designTokenDeclarations, designTokenVariables } from './design-token-variables'

describe('designTokenVariables', () => {
  const token = theme.getDesignToken({ token: { fontSize: 12, colorPrimary: '#722ed1', fontFamily: 'Lato, sans-serif' } })
  const variables = designTokenVariables(token)

  it('carries the theme values under --studio- names', () => {
    expect(variables['--studio-font-family']).toBe('Lato, sans-serif')
    expect(variables['--studio-color-primary']).toBe(token.colorPrimary)
    expect(variables['--studio-color-text-description']).toBe(token.colorTextDescription)
  })

  it('gives sizes in px and keeps unitless values unitless', () => {
    expect(variables['--studio-font-size']).toBe('12px')
    expect(variables['--studio-margin-sm']).toBe(`${token.marginSM}px`)
    expect(variables['--studio-control-height']).toBe(`${token.controlHeight}px`)
    expect(variables['--studio-line-height']).toBe(String(token.lineHeight))
    expect(variables['--studio-font-weight-strong']).toBe(String(token.fontWeightStrong))
  })

  it("includes Studio's field widths", () => {
    expect(variables['--studio-field-width-small']).toBe('200px')
    expect(variables['--studio-field-width-medium']).toBe('300px')
    expect(variables['--studio-field-width-large']).toBe('900px')
  })

  it('renders every variable as one declaration', () => {
    const declarations = designTokenDeclarations(token).split('\n')

    expect(declarations).toHaveLength(Object.keys(variables).length)
    expect(declarations).toContain('--studio-font-size: 12px;')
  })
})
