/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type KeyboardEvent } from 'react'
import { type DefaultCellProps } from '../columns/default-cell'
import { useGrid } from '../use-grid'

interface KeyboardNavigationHookReturn {
  handleArrowNavigation: (event: KeyboardEvent) => void
}

export const useKeyboardNavigation = (props: DefaultCellProps): KeyboardNavigationHookReturn => {
  const { tableElement } = useGrid()

  function handleArrowNavigation (event: KeyboardEvent): void {
    const target = resolveTarget(event)
    if (target === undefined) return
    focusCell(target.row, target.column)
  }

  function resolveTarget (event: KeyboardEvent): { row: number, column: number } | undefined {
    const row = props.row.index
    const col = props.column.getIndex()

    switch (event.key) {
      case 'ArrowDown': event.preventDefault(); return { row: row + 1, column: col }
      case 'ArrowUp': event.preventDefault(); return { row: row - 1, column: col }
      case 'ArrowLeft': event.preventDefault(); return { row, column: findPrevColumn(col) ?? col }
      case 'ArrowRight': event.preventDefault(); return { row, column: findNextColumn(col) ?? col }
      case 'Tab': return resolveTabTarget(event, row, col)
      default: return undefined
    }
  }

  function resolveTabTarget (event: KeyboardEvent, row: number, col: number): { row: number, column: number } | undefined {
    const next = event.shiftKey ? findPrevCell(row, col) : findNextCell(row, col)
    if (next === undefined) return undefined // Let Tab exit the grid at boundaries
    event.preventDefault()
    return next
  }

  function focusCell (rowId: number, columnId: number): void {
    if (tableElement?.current === null) return
    const cellElement = tableElement!.current.querySelector<HTMLDivElement>(`[data-grid-row="${rowId}"][data-grid-column="${columnId}"]`)
    if (cellElement === null) return
    cellElement.focus()
    const range = document.createRange()
    const selection = window.getSelection()
    range.setStart(cellElement, 0)
    selection?.removeAllRanges()
    selection?.addRange(range)
  }

  function findNextCell (row: number, col: number): { row: number, column: number } | undefined {
    const nextCol = findNextColumn(col)
    if (nextCol !== undefined) return { row, column: nextCol }
    const totalRows = props.table.getRowCount()
    if (row + 1 < totalRows) return { row: row + 1, column: 0 }
    return undefined
  }

  function findPrevCell (row: number, col: number): { row: number, column: number } | undefined {
    const prevCol = findPrevColumn(col)
    if (prevCol !== undefined) return { row, column: prevCol }
    if (row - 1 >= 0) return { row: row - 1, column: props.table.getAllColumns().length - 1 }
    return undefined
  }

  function findNextColumn (columnId: number): number | undefined {
    const columns = props.table.getAllColumns()

    if (columnId === columns.length - 1) {
      return undefined
    }

    return columnId + 1
  }

  function findPrevColumn (columnId: number): number | undefined {
    if (columnId === 0) {
      return undefined
    }

    return columnId - 1
  }

  return { handleArrowNavigation }
}
