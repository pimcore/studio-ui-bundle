/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { looksLikeIconPath, resolveIconString } from './icon-path'

describe('looksLikeIconPath', () => {
  it.each([
    '/bundles/pimcorestudioui/img/icons/twemoji/1f600.svg',
    './relative/icon.png',
    '../up/icon.gif',
    'https://example.com/icon.svg',
    '//cdn.example.com/icon.png',
    'data:image/svg+xml;base64,PHN2Zz48L3N2Zz4=',
    'blob:https://example.com/abc',
    'icon.webp',
    'logo.JPEG'
  ])('returns true for a real path/url %p', (value) => {
    expect(looksLikeIconPath(value)).toBe(true)
  })

  it.each([
    'pimcore_icon_workflow_action',
    'pimcore_icon_asset',
    'workflow',
    'pie-chart',
    'copy-03',
    'some_unknown_icon'
  ])('returns false for a bare token %p', (value) => {
    expect(looksLikeIconPath(value)).toBe(false)
  })
})

describe('resolveIconString', () => {
  const isKnown = (name: string): boolean => name === 'workflow' || name === 'pie-chart'
  let warnSpy: jest.SpyInstance

  beforeEach(() => {
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
  })

  afterEach(() => {
    warnSpy.mockRestore()
  })

  it('resolves a registered icon name to type "name"', () => {
    expect(resolveIconString('workflow', isKnown, 'test')).toEqual({ type: 'name', value: 'workflow' })
    expect(warnSpy).not.toHaveBeenCalled()
  })

  it.each([
    '/bundles/foo/icon.svg',
    'https://example.com/icon.svg',
    'icon.png'
  ])('resolves a path-like value %p to type "path"', (value) => {
    expect(resolveIconString(value, isKnown, 'test')).toEqual({ type: 'path', value })
    expect(warnSpy).not.toHaveBeenCalled()
  })

  it.each([
    'pimcore_icon_workflow_action',
    'some_unknown_icon'
  ])('returns null and warns for an unknown bare token %p (no 404 fetch)', (value) => {
    expect(resolveIconString(value, isKnown, 'mySource')).toBeNull()
    expect(warnSpy).toHaveBeenCalledTimes(1)
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining(value))
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('mySource'))
  })
})
