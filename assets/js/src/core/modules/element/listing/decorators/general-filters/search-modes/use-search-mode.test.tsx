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
import { renderHook } from '@testing-library/react'
import { ContainerProvider } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type ColumnFilter } from '@Pimcore/modules/app/types/column-filter'
import { type SelectedColumn } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/selected-columns-provider'
import { SortingContext } from '@Pimcore/modules/element/listing/decorators/sorting/context-layer/provider/sorting-provider/sorting-provider'
import { GeneralFiltersConfigProvider } from '../context-layer/provider/general-filters-config/general-filters-config-provider'
import { SearchModeAbstract, type SearchModeAvailability } from './search-mode-abstract'
import { SearchModeRegistry } from './search-mode-registry'
import { useSearchMode } from './use-search-mode'

const appliedStore = { values: { searchMode: 'score' } }

jest.mock('../element-filters/stores', () => ({
  useAppliedFiltersOptional: () => appliedStore,
  useDraftFiltersOptional: () => undefined
}))

// The listing's decoder knows visible columns, the mode's score column included.
const visibleScoreColumn = { key: 'score', locale: null } as unknown as SelectedColumn
jest.mock('@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns', () => ({
  useSelectedColumns: () => ({
    decodeColumnIdentifier: (id: string) => (id === 'score-column' ? visibleScoreColumn : undefined)
  })
}))

class ScoreMode extends SearchModeAbstract {
  readonly id = 'score'
  readonly columnFilterType = 'test.filter'
  readonly order = 10
  readonly icon = 'search'

  getMenuLabel (): string { return 'Score' }
  getCollapsedLabel (): string { return 'Score' }
  getAvailability (): SearchModeAvailability { return { available: true } }
  buildColumnFilter (query: string): ColumnFilter { return { type: this.columnFilterType, filterValue: query } }
}

const render = (sortedColumnId: string | undefined): ReturnType<typeof useSearchMode> => {
  const container = new Container()
  const registry = new SearchModeRegistry()
  registry.registerDynamicType(new ScoreMode())
  container.bind(serviceIds['Element/Listing/SearchModeRegistry']).toConstantValue(registry)
  const sorting = sortedColumnId === undefined ? [] : [{ id: sortedColumnId, desc: false }]

  return renderHook(() => useSearchMode('applied'), {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <ContainerProvider container={ container }>
        <GeneralFiltersConfigProvider config={ { handleSearchTermInSidebar: true, elementType: 'asset' } }>
          <SortingContext.Provider value={ { sorting, setSorting: () => {} } }>{children}</SortingContext.Provider>
        </GeneralFiltersConfigProvider>
      </ContainerProvider>
    )
  }).result.current
}

describe('useSearchMode', () => {
  it('counts a sort on a mode column as explicit sorting', () => {
    expect(render('score-column')?.modeContext.hasExplicitSorting).toBe(true)
  })

  it('reports no explicit sorting without a column sort', () => {
    expect(render(undefined)?.modeContext.hasExplicitSorting).toBe(false)
  })
})
