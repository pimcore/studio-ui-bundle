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
import { DynamicTypeFieldFilterClassificationStore } from './dynamic-type-field-filter-classification-store'
import { type FieldFilter } from '@Pimcore/modules/element/listing/decorators/general-filters/context-layer/provider/field-filters/field-filters-provider'

jest.mock('@sdk/app', () => ({
  container: {
    get: jest.fn()
  },
  serviceIds: {
    'DynamicTypes/ObjectDataRegistry': 'DynamicTypes/ObjectDataRegistry'
  }
}))

describe('DynamicTypeFieldFilterClassificationStore', () => {
  it('does not mutate the input filter and returns a classification-store-prefixed type', () => {
    const dynamicTypeFieldFilterType = {
      transformFilterToApiRequest: jest.fn().mockReturnValue({ filterValue: 'foo' }),
      getFieldFilterType: jest.fn().mockReturnValue('system.select')
    }

    ;(container.get as jest.Mock).mockReturnValue({
      hasDynamicType: () => true,
      getDynamicType: () => ({ dynamicTypeFieldFilterType })
    })

    const filter: FieldFilter = {
      key: 'TestClassificationStoreFilter',
      type: 'dataobject.classificationstore',
      filterValue: 'foo',
      locale: null,
      meta: { fieldDefinition: { fieldtype: 'select' }, keyId: 7, groupId: 4, translationKey: 'Type' }
    }

    const result = new DynamicTypeFieldFilterClassificationStore().transformFilterToApiRequest(filter)

    expect(filter.type).toBe('dataobject.classificationstore')
    expect(result.type).toBe('classificationstore.select')
    expect(result.filterValue).toEqual({ value: 'foo', keyId: 7, groupId: 4 })
  })

  it('transforms the request of a multiValue key as its delegate does, re-typed to classificationstore', () => {
    const transformFilterToApiRequest = jest.fn().mockReturnValue({ filterValue: 'foo' })
    const getDynamicType = jest.fn(() => ({
      dynamicTypeFieldFilterType: { transformFilterToApiRequest, getFieldFilterType: () => 'dataobject.input' }
    }))

    ;(container.get as jest.Mock).mockReturnValue({ hasDynamicType: () => true, getDynamicType })

    const filter: FieldFilter = {
      key: 'TestClassificationStoreFilter',
      type: 'dataobject.classificationstore',
      filterValue: 'foo',
      locale: null,
      meta: { fieldDefinition: { fieldtype: 'multiValue', delegateDatatype: 'input' }, keyId: 7, groupId: 4, translationKey: 'Type' }
    }

    const result = new DynamicTypeFieldFilterClassificationStore().transformFilterToApiRequest(filter)

    expect(getDynamicType).toHaveBeenCalledWith('input')
    expect(result.type).toBe('classificationstore.input')
    expect(result.filterValue).toEqual({ value: 'foo', keyId: 7, groupId: 4 })
  })

  it('drops a filter whose delegate type the registry no longer holds instead of throwing', () => {
    ;(container.get as jest.Mock).mockReturnValue({
      hasDynamicType: () => false,
      getDynamicType: jest.fn()
    })

    const filter: FieldFilter = {
      key: 'Gone',
      type: 'dataobject.classificationstore',
      filterValue: 'foo',
      locale: null,
      meta: { fieldDefinition: { fieldtype: 'multiValue', delegateDatatype: 'gone' }, keyId: 7, groupId: 4, translationKey: 'Type' }
    }
    const subject = new DynamicTypeFieldFilterClassificationStore()

    expect(subject.shouldApply(filter)).toBe(false)
    expect(() => subject.transformFilterToApiRequest(filter)).not.toThrow()
  })
})
