/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { renderHook } from '@testing-library/react'
import { useClassGetFieldsByTypeQuery, useClassDefinitionGetTreeQuery } from '@Pimcore/modules/class-definition/class-definition-slice-enhanced'
import { useClassRelationFieldsOptions } from './use-class-relation-fields-options'

jest.mock('@Pimcore/modules/class-definition/class-definition-slice-enhanced', () => ({
  useClassGetFieldsByTypeQuery: jest.fn(),
  useClassDefinitionGetTreeQuery: jest.fn()
}))

const mockedTreeQuery = useClassDefinitionGetTreeQuery as jest.Mock
const mockedFieldsQuery = useClassGetFieldsByTypeQuery as jest.Mock

describe('useClassRelationFieldsOptions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockedTreeQuery.mockReturnValue({
      data: { items: [{ id: 'CU', name: 'Customer', title: 'Customer' }], totalItems: 1 },
      isFetching: false
    })
    mockedFieldsQuery.mockReturnValue({
      data: { items: [{ key: 'manualSegments' }] },
      isFetching: false
    })
  })

  it('requests all object relation types that can own a reverse relation, advanced many-to-many included', () => {
    renderHook(() => useClassRelationFieldsOptions('Customer'))

    const requestedTypes = (mockedFieldsQuery.mock.calls[0][0] as { type: string }).type.split(',')

    expect(requestedTypes).toEqual(expect.arrayContaining([
      'manyToManyObjectRelation',
      'manyToOneRelation',
      'advancedManyToManyObjectRelation'
    ]))
  })

  it('maps the returned fields to select options', () => {
    const { result } = renderHook(() => useClassRelationFieldsOptions('Customer'))

    expect(result.current.options).toEqual([{ label: 'manualSegments', value: 'manualSegments' }])
  })
})
