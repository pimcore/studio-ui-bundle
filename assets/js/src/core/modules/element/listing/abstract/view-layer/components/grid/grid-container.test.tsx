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
import { act, render } from '@testing-library/react'
import { type GridProps } from '@Pimcore/types/components/types'
import { SettingsContext, type SettingsContextProps } from '../../../settings/settings-provider'
import { SelectedColumnsProvider, type SelectedColumn } from '../../../configuration-layer/provider/selected-columns/selected-columns-provider'
import { useSelectedColumns } from '../../../configuration-layer/provider/selected-columns/use-selected-columns'
import { useColumnMapper } from '../../../configuration-layer/provider/selected-columns/use-column-mapper'
import { GridContainer } from './grid-container'

let gridProps: GridProps | undefined
let additionalColumns: SelectedColumn[] = []

jest.mock('@Pimcore/components/grid/grid', () => ({
  Grid: (props: GridProps) => {
    gridProps = props
    return null
  }
}))

jest.mock('../../../data-layer/provider/data/use-data', () => ({
  useData: () => ({
    dataQueryResult: { isLoading: false, isFetching: false, data: undefined },
    dataLoadingState: 'data-available'
  })
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

const settings = {
  useColumnMapper,
  useGridOptions: () => ({
    getGridProps: () => ({}),
    transformGridColumn: () => ({}),
    transformGridColumnDefinition: (columns: unknown[]) => columns
  })
} as unknown as SettingsContextProps

let context: ReturnType<typeof useSelectedColumns>

const Probe = (): React.JSX.Element => {
  context = useSelectedColumns()
  return <GridContainer />
}

const renderGrid = (): ReturnType<typeof render> => {
  const rendered = render(
    <SettingsContext.Provider value={ settings }>
      <SelectedColumnsProvider><Probe /></SelectedColumnsProvider>
    </SettingsContext.Provider>
  )
  act(() => { context.setSelectedColumns([column('id')]) })

  return rendered
}

const resize = (target: SelectedColumn, width: number): void => {
  act(() => {
    gridProps!.onColumnResizeEnd!({ columnId: context.encodeColumnIdentifier(target), width, columnSizing: {} })
  })
}

describe('GridContainer column resizing with search mode columns', () => {
  beforeEach(() => {
    additionalColumns = [score]
    gridProps = undefined
  })

  it('keeps the width of a resized mode column outside the selected columns', () => {
    renderGrid()

    resize(score, 240)

    expect(context.visibleColumns.find((c) => c.key === 'score')?.width).toBe(240)
    expect(context.selectedColumns.map((c) => c.key)).toEqual(['id'])
    expect(context.selectedColumns[0].width).toBeUndefined()
  })

  it('restores the mode column width when the mode is applied again', () => {
    const { rerender } = renderGrid()
    resize(score, 240)

    additionalColumns = []
    rerender(
      <SettingsContext.Provider value={ settings }>
        <SelectedColumnsProvider><Probe /></SelectedColumnsProvider>
      </SettingsContext.Provider>
    )
    additionalColumns = [score]
    rerender(
      <SettingsContext.Provider value={ settings }>
        <SelectedColumnsProvider><Probe /></SelectedColumnsProvider>
      </SettingsContext.Provider>
    )

    expect(context.visibleColumns.find((c) => c.key === 'score')?.width).toBe(240)
  })

  it('still stores the width of a user column on the selected columns', () => {
    renderGrid()

    resize(column('id'), 300)

    expect(context.selectedColumns[0].width).toBe(300)
    expect(context.searchModeColumnPlacements).toEqual({})
  })
})
