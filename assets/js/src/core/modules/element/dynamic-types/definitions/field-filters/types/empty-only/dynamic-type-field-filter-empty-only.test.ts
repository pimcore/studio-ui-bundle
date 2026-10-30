/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { container } from '@sdk/app'
import { type FieldFilter } from '@Pimcore/modules/element/listing/decorators/general-filters/context-layer/provider/field-filters/field-filters-provider'
import { DynamicTypeFieldFilterBooleanSelect } from '../boolean-select/dynamic-type-field-filter-boolean-select'
import { DynamicTypeFieldFilterClassificationStore } from '../classification-store/dynamic-type-field-filter-classification-store'
import { DynamicTypeFieldFilterId } from '../id/dynamic-type-field-filter-id'
import { DynamicTypeFieldFilterObjectAdapter } from '../data-object-adapter/dynamic-type-field-filter-data-object-adapter'
import { DynamicTypeFieldFilterString } from '../string/dynamic-type-field-filter-string'
import { DynamicTypeFieldFilterEmptyOnly } from './dynamic-type-field-filter-empty-only'

jest.mock('@sdk/app', () => ({
  container: {
    get: jest.fn()
  },
  serviceIds: {
    'DynamicTypes/ObjectDataRegistry': 'DynamicTypes/ObjectDataRegistry'
  }
}))

// The types are only asked about what they can filter, so their editors are stood in
jest.mock('../../components/dynamic-type-field-filter-boolean-select-component', () => ({
  DynamicTypeFieldFilterBooleanSelectComponent: () => null
}))
jest.mock('../../components/dynamic-type-field-filter-string-component', () => ({
  DynamicTypeFieldFilterStringComponent: () => null
}))
jest.mock('../../components/dynamic-type-field-filter-number-component', () => ({
  DynamicTypeFieldFilterNumberComponent: () => null
}))
jest.mock('../../components/dynamic-type-field-filter-object-adapter', () => ({
  DynamicTypeFieldFilterObjectAdapterComponent: () => null
}))

const filter = (changes: Partial<FieldFilter> = {}): FieldFilter => ({
  key: 'category',
  type: 'dataobject.adapter',
  filterValue: undefined,
  operator: 'empty',
  locale: null,
  meta: { translationKey: 'Category', fieldDefinition: { fieldtype: 'manyToOneRelation' } },
  ...changes
})

describe('field filter types and the empty operator', () => {
  describe('DynamicTypeFieldFilterEmptyOnly', () => {
    const type = new DynamicTypeFieldFilterEmptyOnly()

    it('has no value filter but can be searched for no value', () => {
      expect(type.isFilterAvailable()).toBe(false)
      expect(type.isEmptyFilterAvailable()).toBe(true)
    })

    it('sends the column type, as it has none of its own', () => {
      expect(type.transformOperatorFilterToApiRequest(filter())).toEqual({
        key: 'category',
        type: 'dataobject.adapter',
        operator: 'empty',
        locale: null,
        filterValue: null,
        meta: filter().meta
      })
    })
  })

  describe('a type with a value filter', () => {
    const type = new DynamicTypeFieldFilterString()

    it('can be searched for no value as well', () => {
      expect(type.isFilterAvailable(null)).toBe(true)
      expect(type.isEmptyFilterAvailable(null)).toBe(true)
    })

    it('sends its own type and no value', () => {
      expect(type.transformOperatorFilterToApiRequest(filter({ type: 'dataobject.adapter', operator: 'notEmpty', filterValue: 'abc' }))).toEqual(
        expect.objectContaining({ type: 'system.string', operator: 'notEmpty', filterValue: null })
      )
    })

    it('uses the configured filter key', () => {
      const result = type.transformOperatorFilterToApiRequest(
        filter({ meta: { translationKey: 'Category', filters: { key: 'sku_index' } } })
      )

      expect(result.key).toBe('sku_index')
    })
  })

  it('does not offer the operator for boolean fields, which have an "Empty" option already', () => {
    expect(new DynamicTypeFieldFilterBooleanSelect().isEmptyFilterAvailable()).toBe(false)
  })

  it('does not offer the operator for the id, which an element always has', () => {
    expect(new DynamicTypeFieldFilterId().isEmptyFilterAvailable()).toBe(false)
  })

  it('does not offer the operator for classification store fields', () => {
    expect(new DynamicTypeFieldFilterClassificationStore().isEmptyFilterAvailable()).toBe(false)
  })

  describe('DynamicTypeFieldFilterObjectAdapter', () => {
    const objectType = (filterType: object): object => ({ dynamicTypeFieldFilterType: filterType })

    beforeEach(() => {
      ;(container.get as jest.Mock).mockReset()
    })

    it('asks the filter type of the field whether it can be searched for no value', () => {
      ;(container.get as jest.Mock).mockReturnValue({
        hasDynamicType: () => true,
        getDynamicType: () => objectType(new DynamicTypeFieldFilterEmptyOnly())
      })
      const adapter = new DynamicTypeFieldFilterObjectAdapter()

      expect(adapter.isFilterAvailable('image')).toBe(false)
      expect(adapter.isEmptyFilterAvailable('image')).toBe(true)
    })

    it('has no operator for a field that is not registered', () => {
      ;(container.get as jest.Mock).mockReturnValue({ hasDynamicType: () => false })

      expect(new DynamicTypeFieldFilterObjectAdapter().isEmptyFilterAvailable('unknown')).toBe(false)
      expect(new DynamicTypeFieldFilterObjectAdapter().isEmptyFilterAvailable(null)).toBe(false)
    })

    it('lets the filter type of the field build the request', () => {
      ;(container.get as jest.Mock).mockReturnValue({
        hasDynamicType: () => true,
        getDynamicType: () => objectType(new DynamicTypeFieldFilterString())
      })

      expect(new DynamicTypeFieldFilterObjectAdapter().transformOperatorFilterToApiRequest(
        filter({ meta: { translationKey: 'Name', fieldDefinition: { fieldtype: 'input' } } })
      )).toEqual(expect.objectContaining({ key: 'category', type: 'system.string', operator: 'empty' }))
    })
  })
})
