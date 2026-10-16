/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { DynamicTypeFieldFilterString } from './dynamic-type-field-filter-string'
import { type FieldFilter } from '@Pimcore/modules/element/listing/decorators/general-filters/context-layer/provider/field-filters/field-filters-provider'

// The component pulls in the SDK barrel, which is untranspiled ESM; the test only cares about the request.
jest.mock('../../components/dynamic-type-field-filter-string-component', () => ({
  DynamicTypeFieldFilterStringComponent: () => null
}))

const createFilter = (filterValue: unknown): FieldFilter => ({
  key: 'sku',
  type: 'data-object.input',
  filterValue,
  locale: null,
  meta: { translationKey: 'SKU' }
})

describe('DynamicTypeFieldFilterString', () => {
  const type = new DynamicTypeFieldFilterString()

  it('sends a single line as one string value', () => {
    const result = type.transformFilterToApiRequest(createFilter('auto-3095'))

    expect(result.type).toBe('system.string')
    expect(result.key).toBe('sku')
    expect(result.filterValue).toBe('auto-3095')
  })

  it('sends a pasted list as an array of values', () => {
    const filter = createFilter('A-1\nB-2\r\nA-1\n')

    const result = type.transformFilterToApiRequest(filter)

    expect(result.type).toBe('system.string')
    expect(result.filterValue).toEqual(['A-1', 'B-2'])
    expect(filter.filterValue).toBe('A-1\nB-2\r\nA-1\n')
  })

  it('applies a filter with text only', () => {
    expect(type.shouldApply(createFilter('A-1'))).toBe(true)
    expect(type.shouldApply(createFilter('A-1\nB-2'))).toBe(true)
    expect(type.shouldApply(createFilter(''))).toBe(false)
    expect(type.shouldApply(createFilter('  \n '))).toBe(false)
    expect(type.shouldApply(createFilter(null))).toBe(false)
  })
})
