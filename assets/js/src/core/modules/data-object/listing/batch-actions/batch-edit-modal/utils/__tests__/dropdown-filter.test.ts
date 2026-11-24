/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

jest.mock('@Pimcore/app/config/services/service-ids', () => ({ serviceIds: {} }))
jest.mock('@Pimcore/app/depency-injection', () => ({
  container: { get: () => ({ hasDynamicType: () => true, getDynamicType: () => ({ isAllowedInBatchEditForField: () => true }) }) }
}))

const { shouldIncludeColumnItem } = jest.requireActual('../dropdown-filter')

describe('shouldIncludeColumnItem for a Classification Store column', () => {
  const column = (editable: boolean): object => ({ key: 'attributes', mainType: 'dataobject.classificationstore', frontendType: 'multiValue', group: {}, editable })
  const hasType = (): boolean => true

  it('offers an editable column and not a display-only one', () => {
    expect(shouldIncludeColumnItem(column(true), [], hasType, jest.fn())).toBe(true)
    expect(shouldIncludeColumnItem(column(false), [], hasType, jest.fn())).toBe(false)
  })
})
