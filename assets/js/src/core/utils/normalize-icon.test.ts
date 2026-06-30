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

// The name/path/skip classification is covered by icon-path.test.ts (resolveIconString).
// These tests focus on normalizeIcon's own concerns: empty handling, ElementIcon
// passthrough, and wiring the icon-library lookup into the shared resolver.
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
