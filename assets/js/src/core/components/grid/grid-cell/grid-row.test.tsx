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
import { render } from '@testing-library/react'
import { type ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { GridRow } from './grid-row'

jest.mock('@dnd-kit/sortable', () => ({
  useSortable: () => ({
    setNodeRef: jest.fn(),
    transform: null,
    transition: undefined,
    isDragging: false,
    attributes: {},
    listeners: {}
  })
}))

jest.mock('./grid-cell', () => ({
  GridCell: () => null
}))

// Only the drag handle uses these, and they pull in the styling stack, which jest does not transform.
jest.mock('@Pimcore/components/icon-button/icon-button', () => ({
  IconButton: () => null
}))

jest.mock('@Pimcore/components/flex/flex', () => ({
  Flex: ({ children }: { children?: React.ReactNode }) => children
}))

const columns: Array<ColumnDef<{ name: string, path: string }>> = [
  { id: 'name', accessorKey: 'name', size: 100 },
  { id: 'path', accessorKey: 'path', size: 200 }
]

const data = [{ name: 'a', path: '/a' }]

interface RowHarnessProps {
  columnSizing: Record<string, number>
  enableRowVirtualizer: boolean
}

// Mirrors what Grid does: the table state changes on a resize while the row object stays the same.
const RowHarness = ({ columnSizing, enableRowVirtualizer }: RowHarnessProps): React.JSX.Element => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: { columnSizing }
  })

  return (
    <table>
      <tbody>
        <GridRow
          columnSizingKey={ enableRowVirtualizer ? JSON.stringify(columnSizing) : undefined }
          columns={ columns as any }
          enableColumnVirtualizer={ false }
          enableRowVirtualizer={ enableRowVirtualizer }
          modifiedCells='[]'
          row={ table.getRowModel().rows[0] }
          tableElement={ undefined as any }
        />
      </tbody>
    </table>
  )
}

const harness = (columnSizing: Record<string, number>, enableRowVirtualizer = true): React.JSX.Element => {
  return React.createElement(RowHarness, { columnSizing, enableRowVirtualizer })
}

const getBodyCellWidths = (container: HTMLElement): string[] => {
  return Array.from(container.querySelectorAll('td')).map(cell => cell.style.width)
}

describe('GridRow', () => {
  describe('with row virtualization', () => {
    // Virtualized rows are flex containers, so the body cells carry their own inline widths and
    // nothing propagates the header widths to them. The memoised row has to pick up a resize itself.
    it('follows a column resize', () => {
      const { container, rerender } = render(harness({}))

      expect(getBodyCellWidths(container)).toEqual(['100px', '200px'])

      rerender(harness({ name: 180 }))

      expect(getBodyCellWidths(container)).toEqual(['180px', '200px'])
    })

    it('follows a further resize of the same column', () => {
      const { container, rerender } = render(harness({ name: 180 }))

      rerender(harness({ name: 260 }))

      expect(getBodyCellWidths(container)).toEqual(['260px', '200px'])
    })
  })

  describe('without row virtualization', () => {
    it('keeps the width the table layout decides', () => {
      const { container } = render(harness({}, false))

      expect(getBodyCellWidths(container)).toEqual(['100px', '200px'])
    })
  })
})
