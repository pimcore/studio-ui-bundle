/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

const mockGetDynamicTypes = jest.fn()

jest.mock('@Pimcore/app/depency-injection', () => ({
  container: {
    get: () => ({ getDynamicTypes: () => mockGetDynamicTypes() })
  }
}))

jest.mock('@Pimcore/app/config/services/service-ids', () => ({
  serviceIds: { 'DynamicTypes/IconSetRegistry': 'iconSetRegistry' }
}))

// eslint-disable-next-line import/first
import { toElementIcon } from './element-icon'

const iconSetWith = (values: string[]): { getIcons: () => Array<{ value: string }> } => ({
  getIcons: () => values.map((value) => ({ value }))
})

describe('toElementIcon', () => {
  let warnSpy: jest.SpyInstance

  beforeEach(() => {
    mockGetDynamicTypes.mockReset()
    mockGetDynamicTypes.mockReturnValue([iconSetWith(['workflow', 'pie-chart'])])
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
  })

  afterEach(() => {
    warnSpy.mockRestore()
  })

  it.each([null, undefined, ''])('returns undefined for empty value %p', (value) => {
    expect(toElementIcon(value)).toBeUndefined()
    expect(warnSpy).not.toHaveBeenCalled()
  })

  it('returns an already-shaped ElementIcon unchanged', () => {
    const icon = { type: 'path', value: '/bundles/foo/icon.svg' } as const
    expect(toElementIcon(icon)).toBe(icon)
  })

  it('resolves a known icon-set entry to type "name"', () => {
    expect(toElementIcon('workflow')).toEqual({ type: 'name', value: 'workflow' })
    expect(warnSpy).not.toHaveBeenCalled()
  })

  it.each([
    '/bundles/pimcorestudioui/img/icons/twemoji/1f600.svg',
    'https://example.com/icon.svg',
    'icon.png'
  ])('treats a real path/url %p as type "path"', (value) => {
    expect(toElementIcon(value)).toEqual({ type: 'path', value })
    expect(warnSpy).not.toHaveBeenCalled()
  })

  it.each([
    'pimcore_icon_workflow_action',
    'some_unknown_icon'
  ])('returns undefined and warns for an unknown bare token %p (no 404 fetch)', (value) => {
    expect(toElementIcon(value)).toBeUndefined()
    expect(warnSpy).toHaveBeenCalledTimes(1)
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining(value))
  })
})
