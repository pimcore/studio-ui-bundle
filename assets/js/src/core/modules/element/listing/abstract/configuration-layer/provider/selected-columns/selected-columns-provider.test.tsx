/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { act, renderHook } from '@testing-library/react'
import { SettingsContext, type SettingsContextProps } from '../../../settings/settings-provider'
import { SelectedColumnsProvider, type SelectedColumn } from './selected-columns-provider'
import { useSelectedColumns } from './use-selected-columns'
import { useColumnMapper } from './use-column-mapper'
import { SortingProvider } from '@Pimcore/modules/element/listing/decorators/sorting/context-layer/provider/sorting-provider/sorting-provider'
import { useSorting } from '@Pimcore/modules/element/listing/decorators/sorting/context-layer/provider/sorting-provider/use-sorting'
import { withSortingDataQueryArg } from '@Pimcore/modules/element/listing/decorators/sorting/data-layer/with-sorting-data-query-arg'
import { type AbstractDecoratorProps } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import { getColumnIdentity } from '@Pimcore/modules/element/listing/decorators/general-filters/search-modes/search-mode-columns'

let additionalColumns: SelectedColumn[] = []

jest.mock('@Pimcore/components/language-selection/provider/use-language-selection', () => ({
  useLanguageSelection: () => ({ currentLanguage: 'en' })
}))

jest.mock('@Pimcore/modules/element/listing/decorators/general-filters/search-modes/use-search-mode-additional-columns', () => ({
  useSearchModeAdditionalColumns: () => additionalColumns
}))

const column = (key: string): SelectedColumn => ({
  key,
  locale: null,
  type: 'system.string',
  config: [],
  sortable: true,
  editable: false,
  localizable: false
})

const score = column('score')

const settings = { useColumnMapper } as unknown as SettingsContextProps

const wrapper = ({ children }: { children: React.ReactNode }): React.JSX.Element => (
  <SettingsContext.Provider value={ settings }>
    <SelectedColumnsProvider>{children}</SelectedColumnsProvider>
  </SettingsContext.Provider>
)

const keys = (columns: SelectedColumn[]): Array<string | undefined> => columns.map((c) => c.key)

describe('SelectedColumnsProvider with search mode columns', () => {
  beforeEach(() => {
    additionalColumns = []
  })

  it('shows the active mode columns after the selected columns', () => {
    additionalColumns = [score]
    const { result } = renderHook(() => useSelectedColumns(), { wrapper })

    act(() => { result.current.setSelectedColumns([column('id'), column('filename')]) })

    expect(keys(result.current.visibleColumns)).toEqual(['id', 'filename', 'score'])
  })

  it('never puts mode columns into the selected (persisted) columns', () => {
    additionalColumns = [score]
    const { result } = renderHook(() => useSelectedColumns(), { wrapper })

    act(() => { result.current.setSelectedColumns([column('id')]) })

    expect(keys(result.current.selectedColumns)).toEqual(['id'])
  })

  it('drops mode columns once the mode is no longer applied', () => {
    additionalColumns = [score]
    const { result, rerender } = renderHook(() => useSelectedColumns(), { wrapper })
    act(() => { result.current.setSelectedColumns([column('id')]) })

    additionalColumns = []
    rerender()

    expect(keys(result.current.visibleColumns)).toEqual(['id'])
  })

  it('keeps a column the user selected explicitly, once, at its position', () => {
    additionalColumns = [score]
    const { result } = renderHook(() => useSelectedColumns(), { wrapper })

    act(() => { result.current.setSelectedColumns([column('score'), column('id')]) })

    expect(keys(result.current.visibleColumns)).toEqual(['score', 'id'])
  })

  it('decodes identifiers of mode columns so they can be sorted', () => {
    additionalColumns = [score]
    const { result } = renderHook(() => useSelectedColumns(), { wrapper })
    act(() => { result.current.setSelectedColumns([column('id')]) })

    const identifier = result.current.encodeColumnIdentifier(score)

    expect(result.current.decodeColumnIdentifier(identifier)?.key).toBe('score')
  })
})

describe('SelectedColumnsProvider search mode column placement', () => {
  beforeEach(() => {
    additionalColumns = []
  })

  const renderPlaced = (): ReturnType<typeof renderHook<ReturnType<typeof useSelectedColumns>, unknown>> => {
    additionalColumns = [score]
    const rendered = renderHook(() => useSelectedColumns(), { wrapper })
    act(() => { rendered.result.current.setSelectedColumns([column('id'), column('filename')]) })
    act(() => {
      rendered.result.current.updateSearchModeColumnPlacements({ [getColumnIdentity(score)]: { anchor: getColumnIdentity(column('id')) } })
    })

    return rendered
  }

  it('places a mode column after its anchor', () => {
    const { result } = renderPlaced()

    expect(keys(result.current.visibleColumns)).toEqual(['id', 'score', 'filename'])
    expect(keys(result.current.selectedColumns)).toEqual(['id', 'filename'])
  })

  it('flags only the mode columns', () => {
    const { result } = renderPlaced()

    expect(result.current.isSearchModeColumn(score)).toBe(true)
    expect(result.current.isSearchModeColumn(column('id'))).toBe(false)
  })

  it('keeps the placement when the mode is switched off and on again', () => {
    const rendered = renderPlaced()

    additionalColumns = []
    rendered.rerender()
    expect(keys(rendered.result.current.visibleColumns)).toEqual(['id', 'filename'])

    additionalColumns = [score]
    rendered.rerender()
    expect(keys(rendered.result.current.visibleColumns)).toEqual(['id', 'score', 'filename'])
  })

  it('keeps the width when only the width changes', () => {
    const { result } = renderPlaced()

    act(() => { result.current.updateSearchModeColumnPlacements({ [getColumnIdentity(score)]: { width: 180 } }) })

    expect(result.current.visibleColumns[1]).toMatchObject({ key: 'score', width: 180 })
    expect(keys(result.current.visibleColumns)).toEqual(['id', 'score', 'filename'])
  })

  it('appends the mode column once its anchor is removed', () => {
    const { result } = renderPlaced()

    act(() => { result.current.setSelectedColumns([column('filename'), column('path')]) })

    expect(keys(result.current.visibleColumns)).toEqual(['filename', 'path', 'score'])
  })

  it('starts without placements after the listing is mounted again', () => {
    const rendered = renderPlaced()
    rendered.unmount()

    const { result } = renderHook(() => useSelectedColumns(), { wrapper })
    act(() => { result.current.setSelectedColumns([column('id'), column('filename')]) })

    expect(result.current.searchModeColumnPlacements).toEqual({})
    expect(keys(result.current.visibleColumns)).toEqual(['id', 'filename', 'score'])
  })
})

const baseQueryHelper = (() => ({
  getArgs: () => ({ body: { filters: {} } }),
  hasRequiredArgs: () => true,
  dataLoadingState: 'data-available',
  setDataLoadingState: () => {}
})) as unknown as AbstractDecoratorProps['useDataQueryHelper']

const useSortedQueryHelper = withSortingDataQueryArg(baseQueryHelper)

const sortingWrapper = ({ children }: { children: React.ReactNode }): React.JSX.Element => (
  <SettingsContext.Provider value={ settings }>
    <SortingProvider>
      <SelectedColumnsProvider>{children}</SelectedColumnsProvider>
    </SortingProvider>
  </SettingsContext.Provider>
)

const useListing = (): { columns: ReturnType<typeof useSelectedColumns>, sorting: ReturnType<typeof useSorting>, sortFilter: unknown } => {
  const columns = useSelectedColumns()
  const sorting = useSorting()
  const args = useSortedQueryHelper().getArgs() as unknown as { body: { filters: { sortFilter?: unknown } } }

  return { columns, sorting, sortFilter: args.body.filters.sortFilter }
}

describe('SelectedColumnsProvider sorting on search mode columns', () => {
  beforeEach(() => {
    additionalColumns = []
  })

  const renderListing = (): ReturnType<typeof renderHook<ReturnType<typeof useListing>, unknown>> => {
    additionalColumns = [score]
    const rendered = renderHook(() => useListing(), { wrapper: sortingWrapper })
    act(() => { rendered.result.current.columns.setSelectedColumns([column('id')]) })

    return rendered
  }

  const sortBy = (rendered: ReturnType<typeof renderListing>, selectedColumn: SelectedColumn, desc = false): void => {
    const id = rendered.result.current.columns.encodeColumnIdentifier(selectedColumn)
    act(() => { rendered.result.current.sorting.setSorting([{ id, desc }]) })
  }

  it('sends the sort of a mode column while the mode is applied', () => {
    const rendered = renderListing()
    sortBy(rendered, score)

    expect(rendered.result.current.sortFilter).toEqual({ key: 'score', locale: undefined, direction: 'asc' })
  })

  it('drops the sort of a mode column when the mode is switched off', () => {
    const rendered = renderListing()
    sortBy(rendered, score)

    additionalColumns = []
    rendered.rerender()

    expect(rendered.result.current.sorting.sorting).toEqual([])
    expect(rendered.result.current.sortFilter).toBeUndefined()
  })

  it('does not bring the old sort back when the mode is applied again', () => {
    const rendered = renderListing()
    sortBy(rendered, score)
    additionalColumns = []
    rendered.rerender()

    additionalColumns = [score]
    rendered.rerender()

    expect(rendered.result.current.sorting.sorting).toEqual([])
    expect(rendered.result.current.sortFilter).toBeUndefined()
  })

  it('keeps the sort of a column the user selected when the mode is switched off', () => {
    const rendered = renderListing()
    sortBy(rendered, column('id'), true)

    additionalColumns = []
    rendered.rerender()

    expect(rendered.result.current.sorting.sorting).toHaveLength(1)
    expect(rendered.result.current.sortFilter).toEqual({ key: 'id', locale: undefined, direction: 'desc' })
  })

  it('keeps the sort of a mode column the user also selected', () => {
    const rendered = renderListing()
    act(() => { rendered.result.current.columns.setSelectedColumns([column('id'), column('score')]) })
    sortBy(rendered, score)

    additionalColumns = []
    rendered.rerender()

    expect(rendered.result.current.sortFilter).toEqual({ key: 'score', locale: undefined, direction: 'asc' })
  })
})
