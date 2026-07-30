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
import { useClassDefinitionGetTreeQuery, type ClassDefinitionTreeNodeItem, type ClassDefinitionTreeNodeFolder } from '@sdk/api/class-definition'
import { useClassDefinitionOptions } from './use-class-definition-options'

jest.mock('@sdk/api/class-definition', () => ({
  useClassDefinitionGetTreeQuery: jest.fn()
}))

const mockedUseClassDefinitionGetTreeQuery = useClassDefinitionGetTreeQuery as jest.Mock

const createItem = (name: string): ClassDefinitionTreeNodeItem => ({
  id: name.toLowerCase(),
  name,
  title: name,
  icon: { type: 'name', value: 'data-object' },
  group: null,
  enableGridLocking: false,
  hasBrickField: false
})

const createFolder = (name: string, children: ClassDefinitionTreeNodeItem[]): ClassDefinitionTreeNodeFolder => ({
  id: `folder_${name}`,
  name,
  title: name,
  icon: { type: 'name', value: 'folder' },
  group: null,
  children
})

const mockTreeData = (items: Array<ClassDefinitionTreeNodeItem | ClassDefinitionTreeNodeFolder> | undefined): void => {
  mockedUseClassDefinitionGetTreeQuery.mockReturnValue({
    data: items === undefined ? undefined : { items, totalItems: items.length },
    refetch: jest.fn(),
    isFetching: false
  })
}

describe('useClassDefinitionOptions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('excludes folder nodes so that group names never appear as class options', () => {
    // Groups derived from class name prefixes create folder nodes named after
    // existing classes (e.g. folder "Material" containing the class "Material").
    mockTreeData([
      createFolder('Material', [createItem('Material'), createItem('MaterialGroup')]),
      createFolder('Product', [createItem('Product'), createItem('ProductForm')]),
      createItem('Series')
    ])

    const { result } = renderHook(() => useClassDefinitionOptions())
    const values = result.current.options.map((option) => option.value)

    expect(values).toEqual(['Material', 'MaterialGroup', 'Product', 'ProductForm', 'Series'])
  })

  it('does not produce duplicate option values when a folder shares its name with a class', () => {
    mockTreeData([
      createFolder('Material', [createItem('Material'), createItem('MaterialGroup')])
    ])

    const { result } = renderHook(() => useClassDefinitionOptions())
    const values = result.current.options.map((option) => option.value)

    expect(values).toHaveLength(new Set(values).size)
    expect(values.filter((value) => value === 'Material')).toHaveLength(1)
  })

  it('prepends the special folder option when includeFolder is true', () => {
    mockTreeData([createItem('Series')])

    const { result } = renderHook(() => useClassDefinitionOptions(true))

    expect(result.current.options).toEqual([
      { label: 'folder', value: 'folder' },
      { label: 'Series', value: 'Series' }
    ])
  })

  it('returns an empty option list while the tree is not loaded yet', () => {
    mockTreeData(undefined)

    const { result } = renderHook(() => useClassDefinitionOptions())

    expect(result.current.options).toEqual([])
  })
})
