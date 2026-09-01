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
    let rowId = props.row.index
    let columnId = props.column.getIndex()

    const isArrowKey = ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(event.key)
    const isTab = event.key === 'Tab'

    if (!isArrowKey && !isTab) {
      return
    }

    if (isArrowKey) {
      event.preventDefault()
    }

    if (event.key === 'ArrowDown') {
      rowId++
    } else if (event.key === 'ArrowUp') {
      rowId--
    } else if (event.key === 'ArrowLeft') {
      const prevColumn = findPrevColumn(columnId)
      if (prevColumn !== undefined) {
        columnId = prevColumn
      }
    } else if (event.key === 'ArrowRight') {
      const nextColumn = findNextColumn(columnId)
      if (nextColumn !== undefined) {
        columnId = nextColumn
      }
    } else if (isTab) {
      const next = event.shiftKey ? findPrevCell(rowId, columnId) : findNextCell(rowId, columnId)
      if (next === undefined) {
        return // Let Tab exit the grid at boundaries
      }
      event.preventDefault()
      rowId = next.row
      columnId = next.column
    }

    focusCell(rowId, columnId)
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
