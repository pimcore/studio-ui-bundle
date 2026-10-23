/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { act, renderHook } from '@testing-library/react'
import type { Tag } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/tags-api-slice.gen'
import { buildMoveTargetOptions } from '@Pimcore/modules/tags/utils/move-target-options'
import { useTagConfig } from './use-tag-config'

const tag = (id: number, text: string, parentId: number, children: Tag[] = []): Tag =>
  ({ id, text, parentId, children, hasChildren: children.length > 0, path: '', iconName: '' }) as unknown as Tag

const germany = tag(3, 'Germany', 2)
const countries = tag(2, 'Countries', 0, [germany])
const quality = tag(4, 'Quality', 0)

// What the backend answers for a given toolbar search: searching for Germany drops the Quality
// branch from the collection entirely.
const collections: Record<string, Tag[]> = {
  '': [countries, quality],
  Germany: [tag(2, 'Countries', 0, [germany])]
}

// One result object per search, because RTK Query hands back the same object until the data
// changes and the hook flattens the tree whenever that object does.
const results: Record<string, unknown> = {}

const getCollection = jest.fn((parameters: { filter: string }) => {
  results[parameters.filter] ??= {
    data: { items: collections[parameters.filter] ?? [] },
    isFetching: false,
    isLoading: false,
    isError: false
  }

  return results[parameters.filter]
})

jest.mock('@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/tags-api-slice-enhanced', () => ({
  useTagGetCollectionQuery: (parameters: { filter: string }) => getCollection(parameters),
  useTagUpdateByIdMutation: () => [jest.fn()],
  useTagDeleteByIdMutation: () => [jest.fn()],
  useTagCreateMutation: () => [jest.fn()]
}))

jest.mock('@Pimcore/components/message/useMessage', () => ({
  useMessage: () => ({ success: jest.fn(), error: jest.fn() })
}))

jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: jest.fn(),
  GeneralError: class MockGeneralError extends Error {}
}))

jest.mock('i18next', () => ({ t: (key: string) => key }))

describe('useTagConfig', () => {
  beforeEach(() => {
    getCollection.mockClear()
  })

  it('keeps the move destinations out of the toolbar search', () => {
    const { result } = renderHook(() => useTagConfig())

    act(() => { result.current.setTagFilter('Germany') })

    // The tree follows the search, as it did before.
    expect(result.current.tags.map((item) => item.text)).toEqual(['Countries'])

    // The destinations do not: Quality is still somewhere Germany can be moved to.
    expect(result.current.moveTargetTags.map((item) => item.text)).toEqual(['Countries', 'Quality'])
    expect(getCollection).toHaveBeenCalledWith(expect.objectContaining({ filter: '' }))
  })

  it('offers a destination the tree search hides', () => {
    const { result } = renderHook(() => useTagConfig())

    act(() => { result.current.setTagFilter('Germany') })

    const labels = buildMoveTargetOptions(
      result.current.moveTargetTags,
      result.current.rootTagFolder,
      germany.id
    ).map((option) => option.label)

    expect(labels).toContain('All Tags / Quality')
  })
})
