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
import { type TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'
import { type DataObject } from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import { useTreeClassRestriction } from './use-tree-class-restriction'

const mockClassIds = jest.fn<string[] | undefined, []>()
const mockStoredNode = jest.fn<TreeNodeProps | DataObject | undefined, []>()

jest.mock('@Pimcore/components/element-tree/provider/tree-filter-provider/use-tree-filter', () => ({
  useTreeFilter: () => ({ classIds: mockClassIds(), pageSize: 30 })
}))

jest.mock('@Pimcore/modules/element/actions/copy-paste/tree-copy-paste-context', () => ({
  useTreeCopyPasteContext: () => ({ getStoredNode: () => mockStoredNode() })
}))

jest.mock('@Pimcore/modules/data-object/utils/provider/class-defintions/use-class-definitions', () => ({
  useClassDefinitions: () => ({
    getByName: (name: string) => ({
      Car: { id: 'CAR', name: 'Car' },
      Category: { id: 'CA', name: 'Category' }
    })[name]
  })
}))

const treeNode = (className: string, type: string = 'object'): TreeNodeProps => ({
  id: '1',
  type,
  metaData: { dataObject: { className } }
} as unknown as TreeNodeProps)

const element = (className: string, type: string = 'object'): DataObject => ({
  id: 1,
  type,
  className
} as unknown as DataObject)

const render = (classIds?: string[]): ReturnType<typeof useTreeClassRestriction> => {
  mockClassIds.mockReturnValue(classIds)
  return renderHook(() => useTreeClassRestriction()).result.current
}

describe('useTreeClassRestriction', () => {
  it('allows everything when the tree has no class restriction', () => {
    const { isClassAllowed } = render(undefined)

    expect(isClassAllowed(treeNode('Category'))).toBe(true)
    expect(isClassAllowed(element('Category'))).toBe(true)
    expect(isClassAllowed(undefined)).toBe(true)
  })

  it('treats an empty allowlist as unrestricted', () => {
    expect(render([]).isClassAllowed(treeNode('Category'))).toBe(true)
  })

  it('allows a tree node whose class is in the allowlist', () => {
    expect(render(['CAR']).isClassAllowed(treeNode('Car'))).toBe(true)
  })

  it('rejects a tree node whose class is not in the allowlist', () => {
    expect(render(['CAR']).isClassAllowed(treeNode('Category'))).toBe(false)
  })

  it('reads the class name from a dragged element as well', () => {
    const { isClassAllowed } = render(['CAR'])

    expect(isClassAllowed(element('Car'))).toBe(true)
    expect(isClassAllowed(element('Category'))).toBe(false)
  })

  it('always allows folders, which have no class', () => {
    const { isClassAllowed } = render(['CAR'])

    expect(isClassAllowed(treeNode('', 'folder'))).toBe(true)
    expect(isClassAllowed(element('', 'folder'))).toBe(true)
  })

  it('allows a source without a class name', () => {
    expect(render(['CAR']).isClassAllowed(treeNode(''))).toBe(true)
  })

  it('matches against class ids, not class names', () => {
    expect(render(['Car']).isClassAllowed(treeNode('Car'))).toBe(false)
  })

  it('fails closed when the class definition cannot be resolved', () => {
    expect(render(['CAR']).isClassAllowed(treeNode('Unknown'))).toBe(false)
  })

  it('hides paste for a copied object of a disallowed class', () => {
    mockStoredNode.mockReturnValue(treeNode('Category'))

    expect(render(['CAR']).isPasteHiddenForClass()).toBe(true)
  })

  it('shows paste for a copied object of an allowed class', () => {
    mockStoredNode.mockReturnValue(treeNode('Car'))

    expect(render(['CAR']).isPasteHiddenForClass()).toBe(false)
  })

  it('shows paste when the clipboard is empty', () => {
    mockStoredNode.mockReturnValue(undefined)

    expect(render(['CAR']).isPasteHiddenForClass()).toBe(false)
  })
})
