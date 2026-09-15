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
})
