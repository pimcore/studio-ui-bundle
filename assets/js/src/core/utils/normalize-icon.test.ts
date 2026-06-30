/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

const mockIconLibraryGet = jest.fn()

jest.mock('@Pimcore/app/depency-injection', () => ({
  container: {
    get: () => ({ get: (name: string) => mockIconLibraryGet(name) })
  }
}))

jest.mock('@Pimcore/app/config/services/service-ids', () => ({
  serviceIds: { iconLibrary: 'iconLibrary' }
}))

// eslint-disable-next-line import/first
import { looksLikeIconPath, resolveIconString, normalizeIcon } from './normalize-icon'

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

// Classification is covered by the resolveIconString tests above; this checks normalizeIcon's
// own bits: empty handling, ElementIcon passthrough, and the icon-library lookup.
describe('normalizeIcon', () => {
  let warnSpy: jest.SpyInstance

  beforeEach(() => {
    mockIconLibraryGet.mockReset()
    mockIconLibraryGet.mockReturnValue(undefined)
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
  })

  afterEach(() => {
    warnSpy.mockRestore()
  })

  it.each([null, undefined, ''])('returns null for empty value %p', (value) => {
    expect(normalizeIcon(value)).toBeNull()
    expect(warnSpy).not.toHaveBeenCalled()
  })

  it('returns an already-normalized ElementIcon unchanged without a library lookup', () => {
    const icon = { type: 'path', value: '/bundles/foo/icon.svg' } as const
    expect(normalizeIcon(icon)).toBe(icon)
    expect(mockIconLibraryGet).not.toHaveBeenCalled()
  })

  it('resolves a registered library icon to type "name"', () => {
    mockIconLibraryGet.mockReturnValue(() => null) // a component is registered for this name
    expect(normalizeIcon('workflow')).toEqual({ type: 'name', value: 'workflow' })
    expect(warnSpy).not.toHaveBeenCalled()
  })

  it('returns null and warns for an unknown bare token (delegates to the shared resolver)', () => {
    expect(normalizeIcon('pimcore_icon_workflow_action')).toBeNull()
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('pimcore_icon_workflow_action'))
  })
})
