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

const searchQuery = jest.fn()
const formatPath = jest.fn()

jest.mock('@Pimcore/modules/search/search-api-slice.gen', () => ({
  useDataObjectGetSearchQuery: (...args: unknown[]) => searchQuery(...args)
}))

jest.mock('@Pimcore/modules/class-definition/class-definition-slice-enhanced', () => ({
  useClassDefinitionCollectionQuery: () => ({
    data: { items: [{ id: '10', name: 'Supplier' }] }
  })
}))

jest.mock('@Pimcore/modules/data-object/hooks/use-format-path', () => ({
  useFormatPath: () => ({ formatPath })
}))

const { useComboFieldData } = jest.requireActual('./use-combo-field-data')

interface SearchArgs {
  classId?: string
  body: { filters: { page: number, columnFilters?: Array<{ type: string, filterValue: string }> } }
}

const searchItem = (id: number, fullPath: string): Record<string, unknown> => ({
  id,
  columns: [
    { key: 'fullpath', value: fullPath },
    { key: 'classname', value: 'Supplier' }
  ]
})

const lastSearchArgs = (): SearchArgs => searchQuery.mock.calls[searchQuery.mock.calls.length - 1][0] as SearchArgs

describe('useComboFieldData', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    searchQuery.mockReturnValue({ data: undefined, isFetching: false })
    formatPath.mockResolvedValue(undefined)
  })

  it('resolves the class id of the allowed class and searches it', () => {
    renderHook(() => useComboFieldData({ allowedClasses: ['Supplier'] }))

    expect(lastSearchArgs().classId).toBe('10')
  })

  it('does not search when the allowed class is unknown', () => {
    renderHook(() => useComboFieldData({ allowedClasses: ['DoesNotExist'] }))

    expect(searchQuery.mock.calls[0][1]).toEqual({ skip: true })
  })

  it('exposes the loaded hits as options labelled with their path', () => {
    searchQuery.mockReturnValue({
      data: { totalItems: 1, items: [searchItem(8178, '/Suppliers/122242')] },
      isFetching: false
    })

    const { result } = renderHook(() => useComboFieldData({ allowedClasses: ['Supplier'] }))

    expect(result.current.options).toEqual([{ value: 8178, label: '/Suppliers/122242' }])
  })

  it('sends the typed term as a full text filter and resets to the first page', () => {
    jest.useFakeTimers()

    try {
      const { result } = renderHook(() => useComboFieldData({ allowedClasses: ['Supplier'] }))

      act(() => {
        result.current.handleSearch('Novosol')
        jest.runOnlyPendingTimers()
      })

      const filters = lastSearchArgs().body.filters

      expect(filters.columnFilters).toEqual([{ type: 'system.fulltext', filterValue: 'Novosol' }])
      expect(filters.page).toBe(1)
    } finally {
      jest.useRealTimers()
    }
  })

  it('clears the full text filter when the term is emptied', () => {
    jest.useFakeTimers()

    try {
      const { result } = renderHook(() => useComboFieldData({ allowedClasses: ['Supplier'] }))

      act(() => {
        result.current.handleSearch('Novosol')
        jest.runOnlyPendingTimers()
      })

      act(() => {
        result.current.handleSearch('')
      })

      expect(lastSearchArgs().body.filters.columnFilters).toEqual([])
    } finally {
      jest.useRealTimers()
    }
  })

  it('requests the next page when the dropdown is scrolled to the end', () => {
    searchQuery.mockReturnValue({
      data: { totalItems: 500, items: [searchItem(1, '/Suppliers/1')] },
      isFetching: false
    })

    const { result } = renderHook(() => useComboFieldData({ allowedClasses: ['Supplier'] }))

    act(() => {
      result.current.handlePopupScroll({
        currentTarget: { scrollHeight: 1000, scrollTop: 960, clientHeight: 40 }
      } as any)
    })

    expect(lastSearchArgs().body.filters.page).toBe(2)
  })

  it('keeps the current page when everything is loaded', () => {
    searchQuery.mockReturnValue({
      data: { totalItems: 1, items: [searchItem(1, '/Suppliers/1')] },
      isFetching: false
    })

    const { result } = renderHook(() => useComboFieldData({ allowedClasses: ['Supplier'] }))

    act(() => {
      result.current.handlePopupScroll({
        currentTarget: { scrollHeight: 1000, scrollTop: 960, clientHeight: 40 }
      } as any)
    })

    expect(lastSearchArgs().body.filters.page).toBe(1)
  })

  describe('label resolution', () => {
    const propsWithFormatter = {
      allowedClasses: ['Supplier'],
      combinedFieldName: 'supplier',
      objectId: 6,
      pathFormatterClass: 'App\\PathFormatter\\SupplierPathFormatter'
    }

    beforeEach(() => {
      searchQuery.mockReturnValue({
        data: { totalItems: 1, items: [searchItem(8178, '/Suppliers/122242')] },
        isFetching: false
      })
    })

    it('labels the options with the formatted path', async () => {
      formatPath.mockResolvedValue({
        totalItems: 1,
        items: [{ objectReference: 'object_8178', formatedPath: 'Novosol' }]
      })

      const { result } = renderHook(() => useComboFieldData(propsWithFormatter))

      await act(async () => { await Promise.resolve() })

      expect(formatPath).toHaveBeenCalledWith(
        [{ id: 8178, type: 'object', fullPath: '/Suppliers/122242' }],
        'supplier',
        6,
        false
      )
      expect(result.current.options).toEqual([{ value: 8178, label: 'Novosol' }])
    })

    it('falls back to the object path when the formatter returns nothing', async () => {
      formatPath.mockResolvedValue({ totalItems: 0, items: [] })

      const { result } = renderHook(() => useComboFieldData(propsWithFormatter))

      await act(async () => { await Promise.resolve() })

      expect(result.current.options).toEqual([{ value: 8178, label: '/Suppliers/122242' }])
    })

    it('does not format paths without a path formatter', async () => {
      const { result } = renderHook(() => useComboFieldData({ allowedClasses: ['Supplier'] }))

      await act(async () => { await Promise.resolve() })

      expect(formatPath).not.toHaveBeenCalled()
      expect(result.current.options).toEqual([{ value: 8178, label: '/Suppliers/122242' }])
    })

    it('does not format paths without a source object', async () => {
      const { objectId, ...withoutObjectId } = propsWithFormatter

      renderHook(() => useComboFieldData(withoutObjectId))

      await act(async () => { await Promise.resolve() })

      expect(formatPath).not.toHaveBeenCalled()
    })
  })
})
