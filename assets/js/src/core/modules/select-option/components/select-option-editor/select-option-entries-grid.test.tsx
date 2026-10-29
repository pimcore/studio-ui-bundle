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
import { render, screen } from '@testing-library/react'
import { SelectOptionEntriesGrid } from './select-option-entries-grid'

jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))
jest.mock('./select-option-entries-grid.styles', () => ({ useStyles: () => ({ styles: { removed: 'removed' } }) }))
// antd-style ships untranspiled ESM; the class names are all the cells need from these
jest.mock('@Pimcore/components/grid/columns/default-cell.styles', () => ({ useStyle: () => ({ styles: { 'default-cell': 'default-cell' } }) }))
jest.mock('@Pimcore/components/form/item/with-annotation.styles', () => ({ useStyles: () => ({ styles: { tag: 'tag' } }) }))
jest.mock('@Pimcore/components/grid/grid-context', () => ({ GridContext: React.createContext({ size: 'normal' }) }))
jest.mock('@Pimcore/components/form/item/with-annotation', () => ({
  AnnotationTag: ({ status }: { status: string }) => <span>{`form.annotation.${status}`}</span>
}))
jest.mock('@sdk/components', () => ({
  OperationalGrid: () => <div data-testid="operational-grid" />,
  Box: () => null,
  ButtonGroup: () => null,
  CsvImportButton: () => null,
  IconButton: () => null,
  Space: () => null
}))

// a table that runs the column definitions the way the real grid would, and nothing else
jest.mock('@Pimcore/components/grid/grid', () => ({
  Grid: ({ columns, data }: { columns: any[], data: any[] }) => (
    <table>
      <thead><tr>{ columns.map((column, i) => <th key={ i }>{ column.header }</th>) }</tr></thead>
      <tbody>
        { data.map((row, index) => (
          <tr key={ index }>
            { columns.map((column, i) => (
              <td key={ i }>
                { typeof column.cell === 'function'
                  ? column.cell({ getValue: () => row[column.accessorKey], row: { original: row, index } })
                  : row[column.accessorKey] }
              </td>
            )) }
          </tr>
        )) }
      </tbody>
    </table>
  )
}))

const rows = [
  { value: 'wilson', label: 'Wilson', name: '' },
  { value: 'head', label: 'Head', name: '' }
]

describe('SelectOptionEntriesGrid read-only', () => {
  it('shows the rows without an action column and without operations', () => {
    render(<SelectOptionEntriesGrid
      readOnly
      value={ rows }
           />)

    expect(screen.queryByTestId('operational-grid')).not.toBeInTheDocument()
    expect(screen.queryByText('select-option.entries.action')).not.toBeInTheDocument()
    expect(screen.getByText('Wilson')).toBeInTheDocument()
  })

  it('marks annotated rows with the form annotation tag and strikes a removed one through', () => {
    render(
      <SelectOptionEntriesGrid
        annotations={ { head: { status: 'removed' }, wilson: { status: 'changed' } } }
        readOnly
        value={ rows }
      />
    )

    expect(screen.getByText('form.annotation.removed')).toBeInTheDocument()
    expect(screen.getByText('form.annotation.changed')).toBeInTheDocument()
    expect(screen.getByText('Head').className).toBe('removed')
    expect(screen.getByText('Wilson').className).toBe('')
    // drawn in the default cell's chrome, so it pads and centres like every other cell
    expect(screen.getByText('Head').closest('.default-cell')).not.toBeNull()
  })

  it('does not annotate a row whose value names an Object.prototype member', () => {
    render(
      <SelectOptionEntriesGrid
        annotations={ {} }
        readOnly
        value={ [{ value: 'constructor', label: 'Constructor', name: '' }, { value: '__proto__', label: 'Proto', name: '' }] }
      />
    )

    expect(screen.queryByText(/^form\.annotation\./)).not.toBeInTheDocument()
  })

  it('stays the editing grid when nothing says otherwise', () => {
    render(<SelectOptionEntriesGrid value={ rows } />)

    expect(screen.getByTestId('operational-grid')).toBeInTheDocument()
  })
})
