/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { type RowSelectionState, type SortingState } from '@tanstack/react-table'
import { Grid } from './grid'

// antd-style is untranspiled ESM — every `.styles.ts` in the render tree goes through this
// factory, so stubbing it here avoids mocking each `.styles.ts` file individually
jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: {}, cx: (...classNames: unknown[]) => classNames.filter(Boolean).join(' '), theme: {} })
}))

// Pulls in the untranspiled ESM styles of the antd table
jest.mock('@Pimcore/modules/ant-design/hooks/use-css-component-hash', () => ({
  useCssComponentHash: () => ''
}))

// The grid styles come from antd-style directly, which needs the antd theme token
jest.mock('./grid.styles', () => ({
  useStyles: () => ({ styles: { grid: 'grid', disabledGrid: 'disabled-grid', headerRow: 'header-row' } })
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

// The grid resolves the cell types through the container
jest.mock('@Pimcore/app/depency-injection', () => ({
  useInjection: () => ({ getDynamicType: () => undefined })
}))

// Renders the bare cell content, so the selection checkboxes show up without the dynamic type registry
jest.mock('./grid-cell/grid-cell', () => {
  const { flexRender } = jest.requireActual('@tanstack/react-table')

  return {
    GridCell: jest.fn(({ cell }) => flexRender(cell.column.columnDef.cell, cell.getContext()))
  }
})

jest.mock('./columns/default-cell', () => ({
  DefaultCell: jest.fn(() => null)
}))

// Names out of id order, so that sorting by name gives a displayed order that differs from the data order
const data = ['delta', 'alpha', 'foxtrot', 'bravo', 'echo', 'charlie'].map((name, index) => ({ id: index + 1, name }))

interface SelectableGridProps {
  multiple?: boolean
  sorting?: SortingState
}

const SelectableGrid = ({ multiple = true, sorting }: SelectableGridProps): React.JSX.Element => {
  const [columns] = useState(() => [{ id: 'name', accessorKey: 'name', header: 'Name', cell: () => null }])
  const [selectedRows, setSelectedRows] = useState<RowSelectionState>({})

  // Without the header row only the row checkboxes are left, and no sort button that needs the icon library
  return (
    <>
      <button onClick={ () => { setSelectedRows({}) } }>Reset selection</button>
      <Grid
        columns={ columns }
        data={ data }
        enableMultipleRowSelection={ multiple }
        enableRowSelection={ !multiple }
        enableSorting={ sorting !== undefined }
        hideColumnHeaders
        onSelectedRowsChange={ setSelectedRows }
        selectedRows={ selectedRows }
        setRowId={ (originalRow) => String(originalRow.id) }
        sorting={ sorting }
      />
    </>
  )
}

const clickRow = (displayedIndex: number, { shiftKey = false }: { shiftKey?: boolean } = {}): void => {
  fireEvent.click(screen.getAllByRole('checkbox')[displayedIndex], { shiftKey })
}

const getCheckedRows = (): number[] => screen.getAllByRole('checkbox')
  .map((checkbox, displayedIndex) => (checkbox as HTMLInputElement).checked ? displayedIndex : -1)
  .filter(displayedIndex => displayedIndex !== -1)

describe('Grid Shift-click range selection on the row checkboxes', () => {
  it('selects every row from the anchor down to the Shift-clicked row', () => {
    render(<SelectableGrid />)

    clickRow(1)
    clickRow(4, { shiftKey: true })

    expect(getCheckedRows()).toEqual([1, 2, 3, 4])
  })

  it('selects every row from the anchor up to the Shift-clicked row', () => {
    render(<SelectableGrid />)

    clickRow(4)
    clickRow(2, { shiftKey: true })

    expect(getCheckedRows()).toEqual([2, 3, 4])
  })

  it('adds a further range to the existing selection', () => {
    render(<SelectableGrid />)

    clickRow(0)
    clickRow(1, { shiftKey: true })
    clickRow(5)
    clickRow(3, { shiftKey: true })

    expect(getCheckedRows()).toEqual([0, 1, 3, 4, 5])
  })

  it('follows the displayed order of a sorted grid', () => {
    render(<SelectableGrid sorting={ [{ id: 'name', desc: false }] } />)

    // alpha, bravo, charlie, delta, echo, foxtrot
    clickRow(0)
    clickRow(2, { shiftKey: true })

    expect(getCheckedRows()).toEqual([0, 1, 2])
  })

  it('toggles only the clicked row without an anchor and starts the range there', () => {
    render(<SelectableGrid />)

    clickRow(2, { shiftKey: true })

    expect(getCheckedRows()).toEqual([2])

    clickRow(5, { shiftKey: true })

    expect(getCheckedRows()).toEqual([2, 3, 4, 5])
  })

  it('starts a new range at the clicked row after the parent reset the selection', () => {
    render(<SelectableGrid />)

    clickRow(1)
    clickRow(3, { shiftKey: true })
    fireEvent.click(screen.getByRole('button', { name: 'Reset selection' }))
    clickRow(5, { shiftKey: true })

    expect(getCheckedRows()).toEqual([5])

    clickRow(3, { shiftKey: true })

    expect(getCheckedRows()).toEqual([3, 4, 5])
  })

  it('keeps a plain click toggling the single row', () => {
    render(<SelectableGrid />)

    clickRow(1)
    clickRow(3, { shiftKey: true })
    clickRow(2)

    expect(getCheckedRows()).toEqual([1, 3])
  })

  it('keeps toggling one row at a time with single row selection', () => {
    render(<SelectableGrid multiple={ false } />)

    clickRow(1)
    clickRow(4, { shiftKey: true })

    expect(getCheckedRows()).toEqual([4])
  })
})
