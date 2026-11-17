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
import { type ColumnPickerGroup } from '@Pimcore/components/column-picker/column-picker.types'
import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'
import { type FieldFilter } from '../../../../../../context-layer/provider/field-filters/field-filters-provider'
import { useFieldFilterEditor } from './use-field-filter-editor'

let filterableColumns: AvailableColumn[] = []
const filterableSources: string[] = []
let draftFieldFilters: FieldFilter[] = []
const mockSetFieldFilters = jest.fn()
let mockFilterType: { isFilterAvailable: () => boolean, isEmptyFilterAvailable: () => boolean } = { isFilterAvailable: () => true, isEmptyFilterAvailable: () => true }

jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))
// only the instanceof check is used; the fake resolver returns a wrapper type
jest.mock('@sdk/modules/element', () => ({ DynamicTypeFieldFilterAbstract: function DynamicTypeFieldFilterAbstract () {} }))
jest.mock('@Pimcore/modules/element/dynamic-types/resolver/hooks/use-dynamic-type-resolver', () => ({
  useDynamicTypeResolver: () => ({ getType: () => ({ dynamicTypeFieldFilterType: mockFilterType }) })
}))
jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/provider/classifcation-store-modal-provider', () => ({
  useClassificationStoreModal: () => ({ openModal: jest.fn() })
}))
jest.mock('@Pimcore/modules/data-object/listing/decorator/class-definition-selection/context-layer/provider/use-class-definition-selection', () => ({
  useClassDefinitionSelectionOptional: () => undefined
}))
jest.mock('../../../../../../element-filters', () => ({
  useDraftFilterValues: () => ({ fieldFilters: draftFieldFilters, setFieldFilters: mockSetFieldFilters })
}))
jest.mock('../../../../../../search-modes/use-filterable-columns', () => ({
  useFilterableColumns: (source: string) => {
    filterableSources.push(source)
    return filterableColumns
  }
}))

const column = (key: string): AvailableColumn => ({
  key,
  group: ['system'],
  sortable: true,
  editable: false,
  localizable: false,
  locale: null,
  type: `test.${key}`,
  frontendType: `test.${key}`,
  config: []
})

const collectKeys = (group: ColumnPickerGroup<AvailableColumn>): string[] => [
  ...group.items.map((item) => item.meta?.key ?? ''),
  ...(group.children ?? []).flatMap(collectKeys)
]

const pickerKeys = (result: ReturnType<typeof useFieldFilterEditor>): string[] => result.columnGroups.flatMap(collectKeys)

describe('useFieldFilterEditor', () => {
  beforeEach(() => {
    mockSetFieldFilters.mockReset()
    mockFilterType = { isFilterAvailable: () => true, isEmptyFilterAvailable: () => true }
    filterableSources.length = 0
    draftFieldFilters = [{ key: 'score', type: 'test.score', filterValue: 0.8, locale: undefined, meta: { translationKey: 'score' } }]
  })

  it('reads the filterable columns of the draft search mode', () => {
    filterableColumns = [column('id')]
    renderHook(() => useFieldFilterEditor({ onCommit: jest.fn() }))

    expect(filterableSources).toContain('draft')
    expect(filterableSources).not.toContain('applied')
  })

  it('keeps an existing filter on a search mode column and offers the remaining columns', () => {
    filterableColumns = [column('id'), column('score')]
    const { result } = renderHook(() => useFieldFilterEditor({ onCommit: jest.fn() }))

    expect(result.current.filters.map((filter) => filter.id)).toEqual(['score'])
    expect(pickerKeys(result.current)).toEqual(['id'])
  })

  it('offers a search mode column in the add list', () => {
    draftFieldFilters = []
    filterableColumns = [column('id'), column('score')]
    const { result } = renderHook(() => useFieldFilterEditor({ onCommit: jest.fn() }))

    expect(pickerKeys(result.current).sort()).toEqual(['id', 'score'])
  })

  it('drops the filter once the mode column is gone', () => {
    filterableColumns = [column('id')]
    const { result } = renderHook(() => useFieldFilterEditor({ onCommit: jest.fn() }))

    expect(result.current.filters).toEqual([])
  })

  describe('operator', () => {
    it('keeps the operator of a filter and hands it back', () => {
      draftFieldFilters = [{ key: 'score', type: 'test.score', filterValue: undefined, operator: 'empty', locale: undefined, meta: { translationKey: 'score' } }]
      filterableColumns = [column('score')]
      const { result } = renderHook(() => useFieldFilterEditor({ onCommit: jest.fn() }))

      expect(result.current.filters[0].operator).toBe('empty')
    })

    it('offers a field that has no value filter but can be searched for no value', () => {
      mockFilterType = { isFilterAvailable: () => false, isEmptyFilterAvailable: () => true }
      draftFieldFilters = []
      filterableColumns = [column('gallery')]
      const { result } = renderHook(() => useFieldFilterEditor({ onCommit: jest.fn() }))

      expect(pickerKeys(result.current)).toEqual(['gallery'])
    })

    it('keeps offering a field with a value filter that cannot be searched for no value (e.g. an id)', () => {
      mockFilterType = { isFilterAvailable: () => true, isEmptyFilterAvailable: () => false }
      draftFieldFilters = []
      filterableColumns = [column('id')]
      const { result } = renderHook(() => useFieldFilterEditor({ onCommit: jest.fn() }))

      expect(pickerKeys(result.current)).toEqual(['id'])
    })

    it('does not offer a field that cannot be searched for no value either', () => {
      mockFilterType = { isFilterAvailable: () => false, isEmptyFilterAvailable: () => false }
      draftFieldFilters = []
      filterableColumns = [column('gallery')]
      const { result } = renderHook(() => useFieldFilterEditor({ onCommit: jest.fn() }))

      expect(pickerKeys(result.current)).toEqual([])
    })

    it('adds a field without a value filter with the empty operator already picked', () => {
      mockFilterType = { isFilterAvailable: () => false, isEmptyFilterAvailable: () => true }
      draftFieldFilters = []
      filterableColumns = [column('gallery')]
      const { result } = renderHook(() => useFieldFilterEditor({ onCommit: jest.fn() }))

      act(() => { result.current.handleColumnClick(filterableColumns[0]) })

      expect(result.current.filters).toEqual([expect.objectContaining({ id: 'gallery', operator: 'empty' })])
    })

    it('hands a field added with its operator to the draft filters right away, as there is no value to wait for', () => {
      mockFilterType = { isFilterAvailable: () => false, isEmptyFilterAvailable: () => true }
      draftFieldFilters = []
      filterableColumns = [column('gallery')]
      const { result } = renderHook(() => useFieldFilterEditor({ onCommit: jest.fn() }))

      act(() => { result.current.handleColumnClick(filterableColumns[0]) })

      expect(mockSetFieldFilters).toHaveBeenCalledWith([expect.objectContaining({ key: 'gallery', operator: 'empty' })])
    })

    it('keeps a field with a value filter out of the draft filters until it has a value', () => {
      draftFieldFilters = []
      filterableColumns = [column('id')]
      const { result } = renderHook(() => useFieldFilterEditor({ onCommit: jest.fn() }))

      act(() => { result.current.handleColumnClick(filterableColumns[0]) })

      expect(mockSetFieldFilters).not.toHaveBeenCalled()
    })

    it('adds a field with a value filter without an operator', () => {
      draftFieldFilters = []
      filterableColumns = [column('id')]
      const { result } = renderHook(() => useFieldFilterEditor({ onCommit: jest.fn() }))

      act(() => { result.current.handleColumnClick(filterableColumns[0]) })

      expect(result.current.filters[0].operator).toBeUndefined()
    })
  })
})
