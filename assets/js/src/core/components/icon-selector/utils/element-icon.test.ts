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

// Classification is covered by the resolveIconString tests in normalize-icon.test.ts; this
// checks toElementIcon's own bits: empty handling, ElementIcon passthrough, registry lookup.
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

  it('returns undefined and warns for an unknown bare token (delegates to the shared resolver)', () => {
    expect(toElementIcon('pimcore_icon_workflow_action')).toBeUndefined()
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('pimcore_icon_workflow_action'))
  })
})
