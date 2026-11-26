/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/* eslint-disable max-lines */

import { act, renderHook } from '@testing-library/react'
import { type ColumnPickerGroup } from '@Pimcore/components/column-picker/column-picker.types'
import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'
import { DynamicTypeFieldFilterAbstract } from '@sdk/modules/element'
// the class toFieldFilterType() tests against: the SDK barrel's is mocked below, and an instance of
// that mock is not an instance of this one, so a filter type built for the resolver must use this
import { DynamicTypeFieldFilterAbstract as ResolvedFieldFilterAbstract } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/dynamic-type-field-filter-abstract'
import { type FieldFilter } from '../../../../../../context-layer/provider/field-filters/field-filters-provider'
import { useFieldFilterEditor } from './use-field-filter-editor'

let filterableColumns: AvailableColumn[] = []
const filterableSources: string[] = []
let draftFieldFilters: FieldFilter[] = []
let onUpdateClassificationStoreColumn: (data: unknown) => void = () => {}
const messageInfo = jest.fn()
// every id list the hook asks the resolver to resolve, so the resolution path itself can be asserted
const resolvedIdLists: string[][] = []
const mockSetFieldFilters = jest.fn()
let mockFilterType: { isFilterAvailable: () => boolean, isEmptyFilterAvailable: () => boolean } = { isFilterAvailable: () => true, isEmptyFilterAvailable: () => true }

// The key types that report no grid filter: the six offered before the picker was widened, and the new ones.
const NO_FILTER_TYPES = ['image', 'encryptedField', 'table', 'calculatedValue', 'quantityValueRange', 'password']
// Data types the object data registry carries, i.e. every pimcore fieldtype a key can be defined with.
const OBJECT_DATA_TYPES = [...NO_FILTER_TYPES, 'input', 'numeric', 'select']
const OBJECT_ADAPTER_ID = 'dataobject.adapter'
const FILTERABLE_TYPE = 'input'
const STORE_COLUMN_KEY = 'cs'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: Record<string, unknown>) => options === undefined ? key : `${key}:${String(options.keyNames)}`
  })
}))
jest.mock('@sdk/modules/element', () => ({ DynamicTypeFieldFilterAbstract: function DynamicTypeFieldFilterAbstract () {} }))
jest.mock('@Pimcore/components/message/useMessage', () => ({ useMessage: () => ({ info: messageInfo }) }))
/**
 * Models the two registries the resolver walks for FIELD_FILTER (with-dynamic-types.tsx): the field
 * filter registry, which carries `dataobject.adapter` and the column types, and the object data
 * registry, keyed by pimcore fieldtype. The adapter answers from the object data registry the way
 * the real one does, so an id that registry does not carry reports no filter.
 */
jest.mock('@Pimcore/modules/element/dynamic-types/resolver/hooks/use-dynamic-type-resolver', () => ({
  useDynamicTypeResolver: () => ({
    getType: ({ dynamicTypeIds }: { dynamicTypeIds: string[] }) => {
      resolvedIdLists.push(dynamicTypeIds)

      // A classification store key is offered on its own value filter alone, never through the empty
      // operator, which is what the key picker's cases below assert.
      const fieldFilter = (isFilterAvailable: (subtype: string | null) => boolean): object =>
        Object.assign(Object.create(ResolvedFieldFilterAbstract.prototype), { isFilterAvailable, isEmptyFilterAvailable: () => false })

      for (const id of dynamicTypeIds) {
        if (id === OBJECT_ADAPTER_ID) {
          return fieldFilter((subtype) => subtype !== null && OBJECT_DATA_TYPES.includes(subtype) && !NO_FILTER_TYPES.includes(subtype))
        }

        if (OBJECT_DATA_TYPES.includes(id)) {
          return { dynamicTypeFieldFilterType: fieldFilter(() => !NO_FILTER_TYPES.includes(id)) }
        }

        // a plain column drives both answers through mockFilterType, which the operator cases set
        if (id.startsWith('test.')) {
          return { dynamicTypeFieldFilterType: mockFilterType }
        }
      }

      return null
    }
  })
}))
jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/provider/classifcation-store-modal-provider', () => ({
  useClassificationStoreModal: ({ onUpdate }: { onUpdate: (data: unknown) => void }) => {
    onUpdateClassificationStoreColumn = onUpdate
    return { openModal: jest.fn() }
  }
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
    resolvedIdLists.length = 0
    messageInfo.mockClear()
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

  describe('applying keys from the group by key picker', () => {
    const storeColumn: AvailableColumn = { ...column(STORE_COLUMN_KEY), type: 'dataobject.classificationstore', frontendType: 'classificationstore' }

    const appliedItem = (fieldtype: string, id: number): object => ({
      id,
      name: `key ${id}`,
      groupId: 1,
      definition: { fieldtype, title: `key ${id}` }
    })

    const applyKeys = (items: object[]): void => {
      act(() => {
        onUpdateClassificationStoreColumn({ modalContext: { fieldName: STORE_COLUMN_KEY }, data: items })
      })
    }

    it('adds a filter row only for keys whose type reports a grid filter', () => {
      draftFieldFilters = []
      filterableColumns = [storeColumn]
      const { result } = renderHook(() => useFieldFilterEditor({ onCommit: jest.fn() }))

      applyKeys([...NO_FILTER_TYPES.map((type, index) => appliedItem(type, index)), appliedItem(FILTERABLE_TYPE, 100)])

      expect(result.current.filters.map((filter) => filter.config.keyId)).toEqual([100])
    })

    it("resolves a key's filter through the object adapter, the way a column's is resolved", () => {
      draftFieldFilters = []
      filterableColumns = [storeColumn]
      renderHook(() => useFieldFilterEditor({ onCommit: jest.fn() }))

      applyKeys([appliedItem(FILTERABLE_TYPE, 100)])

      expect(resolvedIdLists).toContainEqual([OBJECT_ADAPTER_ID, FILTERABLE_TYPE])
    })

    const variantKey = (overrides: object = {}): object => ({
      ...appliedItem('multiValue', 100),
      variants: [{ name: 'Metric', label: 'Metric' }, { name: 'Imperial', label: 'Imperial' }],
      definition: { fieldtype: 'multiValue', title: 'key 100', delegateDatatype: FILTERABLE_TYPE },
      ...overrides
    })

    it('offers a multiValue key one filter per declared variant, then the default slot', () => {
      draftFieldFilters = []
      filterableColumns = [storeColumn]
      const { result } = renderHook(() => useFieldFilterEditor({ onCommit: jest.fn() }))

      applyKeys([variantKey()])

      expect(result.current.filters.map((filter) => filter.config.variant)).toEqual(['Metric', 'Imperial', null])
      expect(result.current.filters.map((filter) => filter.translationKey)).toEqual(['key 100 (Metric)', 'key 100 (Imperial)', 'key 100'])
      expect(resolvedIdLists).toContainEqual([OBJECT_ADAPTER_ID, FILTERABLE_TYPE])
      expect(messageInfo).not.toHaveBeenCalled()
    })

    it('does not add a variant slot the panel already holds', () => {
      draftFieldFilters = []
      filterableColumns = [storeColumn]
      const { result } = renderHook(() => useFieldFilterEditor({ onCommit: jest.fn() }))

      applyKeys([variantKey()])
      applyKeys([variantKey()])

      expect(result.current.filters.map((filter) => filter.config.variant)).toEqual(['Metric', 'Imperial', null])
    })

    it('names the keys it skipped so a shorter list is not a silent one', () => {
      draftFieldFilters = []
      filterableColumns = [storeColumn]
      renderHook(() => useFieldFilterEditor({ onCommit: jest.fn() }))

      applyKeys([appliedItem('image', 1), appliedItem('password', 2), appliedItem(FILTERABLE_TYPE, 100)])

      expect(messageInfo).toHaveBeenCalledTimes(1)
      expect(messageInfo).toHaveBeenCalledWith('classification-store.keys-without-field-filter:key 1, key 2')
    })

    // A configured empty title is a valid key state, and `??` would have let it name the key as ''.
    it('names a skipped key by its name when its configured title is empty', () => {
      draftFieldFilters = []
      filterableColumns = [storeColumn]
      renderHook(() => useFieldFilterEditor({ onCommit: jest.fn() }))

      applyKeys([{ ...appliedItem('image', 1), title: '' }])

      expect(messageInfo).toHaveBeenCalledWith('classification-store.keys-without-field-filter:key 1')
    })

    // Neither title nor name is set, so the id is what is left to name it by.
    it('falls back to the key id when title and name are both empty', () => {
      draftFieldFilters = []
      filterableColumns = [storeColumn]
      renderHook(() => useFieldFilterEditor({ onCommit: jest.fn() }))

      applyKeys([{ id: 7, name: '', title: '', groupId: 1, definition: { fieldtype: 'image', title: '' } }])

      expect(messageInfo).toHaveBeenCalledWith('classification-store.keys-without-field-filter:7')
    })

    it('prefers a configured non-empty title over the name', () => {
      draftFieldFilters = []
      filterableColumns = [storeColumn]
      renderHook(() => useFieldFilterEditor({ onCommit: jest.fn() }))

      applyKeys([{ ...appliedItem('image', 1), title: 'Colour' }])

      expect(messageInfo).toHaveBeenCalledWith('classification-store.keys-without-field-filter:Colour')
    })

    it('reports nothing when every selected key has a filter', () => {
      draftFieldFilters = []
      filterableColumns = [storeColumn]
      renderHook(() => useFieldFilterEditor({ onCommit: jest.fn() }))

      applyKeys([appliedItem(FILTERABLE_TYPE, 100)])

      expect(messageInfo).not.toHaveBeenCalled()
    })

    it('keeps a saved filter on a key of a type without a grid filter and sends it as it is', () => {
      const savedFilter: FieldFilter = {
        key: STORE_COLUMN_KEY,
        type: 'dataobject.classificationstore',
        filterValue: 'saved',
        locale: undefined,
        meta: { translationKey: 'key 1', keyId: 1, groupId: 1, fieldDefinition: { fieldtype: 'password' } }
      }
      draftFieldFilters = [savedFilter]
      filterableColumns = [storeColumn]
      const onCommit = jest.fn()
      const { result } = renderHook(() => useFieldFilterEditor({ onCommit }))

      expect(result.current.filters.map((filter) => filter.id)).toEqual([STORE_COLUMN_KEY])

      act(() => { result.current.onFilterCommit(result.current.filters) })

      expect(onCommit).toHaveBeenCalledWith([savedFilter])
    })
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
