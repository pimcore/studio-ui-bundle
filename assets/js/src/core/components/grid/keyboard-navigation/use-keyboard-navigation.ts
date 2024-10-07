/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
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

    if (!isArrowKey) {
      return
    }

    event.preventDefault()

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
    }

    if (tableElement?.current !== null) {
      const cellElement = tableElement!.current.querySelector<HTMLDivElement>(`[data-grid-row="${rowId}"][data-grid-column="${columnId}"]`)

      if (cellElement === null) {
        return
      }
      cellElement.focus()
      // Resposition selection ortherwise the copy event will not fire
      const range = document.createRange()
      const selection = window.getSelection()

      range.setStart(cellElement, 0)
      selection?.removeAllRanges()
      selection?.addRange(range)
    }
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
