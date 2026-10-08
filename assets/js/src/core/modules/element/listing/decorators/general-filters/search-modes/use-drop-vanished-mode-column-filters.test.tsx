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
import { Container } from 'inversify'
import { act, renderHook } from '@testing-library/react'
import { ContainerProvider } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type GridColumnConfiguration } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { type ColumnFilter } from '@Pimcore/modules/app/types/column-filter'
import { type AvailableColumn, AvailableColumnsContext, type AvailableColumnsData } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'
import { GeneralFiltersConfigProvider } from '../context-layer/provider/general-filters-config/general-filters-config-provider'
import { type FieldFilter } from '../context-layer/provider/field-filters/field-filters-provider'
import { AppliedFiltersProvider, DraftFiltersProvider, useAppliedFilters, useDraftFilters } from '../element-filters/stores'
import { readElementFilterValues } from '../element-filters/use-element-filter-values'
import { FULLTEXT_SEARCH_MODE_ID, SearchModeAbstract, type SearchModeAvailability } from './search-mode-abstract'
import { SearchModeRegistry } from './search-mode-registry'
import { useDropVanishedModeColumnFilters } from './use-drop-vanished-mode-column-filters'

const scoreColumn: GridColumnConfiguration = {
  key: 'score',
  group: ['system'],
  sortable: true,
  editable: false,
  localizable: false,
  locale: null,
  type: 'test.score',
  config: []
}

class ScoreMode extends SearchModeAbstract {
  readonly columnFilterType = 'test.filter'
  readonly order = 10
  readonly icon = 'search'

  constructor (readonly id: string) { super() }

  getMenuLabel (): string { return this.id }
  getCollapsedLabel (): string { return this.id }
  getAvailability (): SearchModeAvailability { return { available: true } }
  buildColumnFilter (query: string): ColumnFilter { return { type: this.columnFilterType, filterValue: query } }
  getAdditionalColumns (): GridColumnConfiguration[] { return [{ ...scoreColumn }] }
}

const filter = (key: string): FieldFilter => ({ key, type: `test.${key}`, filterValue: 80, locale: undefined, meta: { translationKey: key } })
const idColumn: AvailableColumn = { ...scoreColumn, key: 'id', type: 'system.id' }

const render = (
  availableColumns: AvailableColumn[],
  source: 'draft' | 'applied' = 'draft'
): ReturnType<typeof renderHook<ReturnType<typeof useDraftFilters>, unknown>> => {
  const container = new Container()
  const registry = new SearchModeRegistry()
  registry.registerDynamicType(new ScoreMode('score'))
  registry.registerDynamicType(new ScoreMode('other-score'))
  container.bind(serviceIds['Element/Listing/SearchModeRegistry']).toConstantValue(registry)

  const FiltersProvider = source === 'draft' ? DraftFiltersProvider : AppliedFiltersProvider
  const useFilters = source === 'draft' ? useDraftFilters : useAppliedFilters

  return renderHook(() => {
    useDropVanishedModeColumnFilters(source)
    return useFilters()
  }, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <ContainerProvider container={ container }>
        <GeneralFiltersConfigProvider config={ { handleSearchTermInSidebar: true, elementType: 'asset' } }>
          <AvailableColumnsContext.Provider value={ { availableColumns } as unknown as AvailableColumnsData }>
            <FiltersProvider
              descriptors={ [{ key: 'searchMode', defaultValue: FULLTEXT_SEARCH_MODE_ID }, { key: 'fieldFilters', defaultValue: [] }] }
              initialValues={ { searchMode: 'score', fieldFilters: [filter('score'), filter('id')] } }
            >
              {children}
            </FiltersProvider>
          </AvailableColumnsContext.Provider>
        </GeneralFiltersConfigProvider>
      </ContainerProvider>
    )
  })
}

const filterKeys = (result: { current: ReturnType<typeof useDraftFilters> }): string[] =>
  readElementFilterValues(result.current.values).fieldFilters.map((fieldFilter) => fieldFilter.key)

describe('useDropVanishedModeColumnFilters', () => {
  it('removes a filter on a mode column from the draft store when the mode no longer provides it', () => {
    const { result } = render([idColumn])

    act(() => { result.current.setValue('searchMode', FULLTEXT_SEARCH_MODE_ID) })

    expect(filterKeys(result)).toEqual(['id'])
  })

  it('keeps the filter when the listing itself provides the column', () => {
    const { result } = render([idColumn, scoreColumn as AvailableColumn])

    act(() => { result.current.setValue('searchMode', FULLTEXT_SEARCH_MODE_ID) })

    expect(filterKeys(result)).toEqual(['score', 'id'])
  })

  it('keeps the filter when the new mode provides the column too', () => {
    const { result } = render([idColumn])

    act(() => { result.current.setValue('searchMode', 'other-score') })

    expect(filterKeys(result)).toEqual(['score', 'id'])
  })

  it('leaves the draft alone while the mode does not change', () => {
    const { result } = render([idColumn])
    const before = result.current.values.fieldFilters

    act(() => { result.current.setValue('searchTerm', 'car') })

    expect(result.current.values.fieldFilters).toBe(before)
  })

  it('removes the filter from the applied store when an immediate-apply surface switches the mode', () => {
    const { result } = render([idColumn], 'applied')

    act(() => { result.current.setValue('searchMode', FULLTEXT_SEARCH_MODE_ID) })
    act(() => { result.current.setValue('searchMode', 'score') })

    expect(filterKeys(result)).toEqual(['id'])
  })
})
