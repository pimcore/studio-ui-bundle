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
    let rowId = parseInt(props.row.id)
    let columnId = props.column.id
    const isArrowKey = ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(event.key)

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
    }

    if (isArrowKey) {
      if (tableElement?.current !== null) {
        tableElement!.current.querySelector<HTMLDivElement>(`[data-grid-row="${rowId}"][data-grid-column="${columnId}"]`)?.focus()
      }
    }
  }

  function findNextColumn (columnId: string): string | undefined {
    const columns = props.table.getAllColumns()

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].id === columnId) {
        return columns[i + 1]?.id
      }
    }

    return undefined
  }

  function findPrevColumn (columnId: string): string | undefined {
    const columns = props.table.getAllColumns()

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].id === columnId) {
        return columns[i - 1]?.id
      }
    }

    return undefined
  }

  return { handleArrowNavigation }
}
