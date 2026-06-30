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
import { normalizeIcon } from './normalize-icon'

describe('normalizeIcon', () => {
  let warnSpy: jest.SpyInstance

  beforeEach(() => {
    mockIconLibraryGet.mockReset()
    // Default: nothing is registered in the icon library.
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

  it('returns an already-normalized ElementIcon unchanged', () => {
    const icon = { type: 'path', value: '/bundles/foo/icon.svg' } as const
    expect(normalizeIcon(icon)).toBe(icon)
    expect(mockIconLibraryGet).not.toHaveBeenCalled()
  })

  it('resolves a registered library icon to type "name"', () => {
    mockIconLibraryGet.mockReturnValue(() => null) // pretend a component is registered
    expect(normalizeIcon('workflow')).toEqual({ type: 'name', value: 'workflow' })
    expect(warnSpy).not.toHaveBeenCalled()
  })

  it.each([
    '/bundles/pimcorestudioui/img/icons/twemoji/1f600.svg',
    './relative/icon.png',
    'https://example.com/icon.svg',
    'data:image/svg+xml;base64,PHN2Zz48L3N2Zz4=',
    'icon.webp'
  ])('treats a real path/url %p as type "path"', (value) => {
    expect(normalizeIcon(value)).toEqual({ type: 'path', value })
    expect(warnSpy).not.toHaveBeenCalled()
  })

  it.each([
    'pimcore_icon_workflow_action',
    'pimcore_icon_asset',
    'some_unknown_icon'
  ])('returns null and warns for an unknown bare token %p (no 404 fetch)', (value) => {
    expect(normalizeIcon(value)).toBeNull()
    expect(warnSpy).toHaveBeenCalledTimes(1)
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining(value))
  })
})
