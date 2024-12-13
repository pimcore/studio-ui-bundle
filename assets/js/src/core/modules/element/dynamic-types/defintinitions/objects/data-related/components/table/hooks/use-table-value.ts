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

import { useState, useEffect } from 'react'
import { type GridCellReference } from '@Pimcore/components/grid/grid'

export type TableValue = string[][]

interface UseTableValueProps {
  cols: number | null
  rows: number | null
  initialValue: TableValue | null
  onChange?: (value: TableValue | null) => void
}

interface UseTableValueReturn {
  value: TableValue | null
  setValue: (value: TableValue | null) => void
  activeCell: GridCellReference | undefined
  setActiveCell: (cell: GridCellReference | undefined) => void
  key: number
  emptyValue: () => void
  addRow: () => void
  addColumn: () => void
  deleteRow: () => void
  deleteColumn: () => void
  duplicateRow: () => void
  rows: number
  cols: number
}

export const useTableValue = (props: UseTableValueProps): UseTableValueReturn => {
  const [value, setValue] = useState<TableValue | null>(props.initialValue)
  const [activeCell, setActiveCell] = useState<GridCellReference | undefined>(undefined)
  const [key, setKey] = useState<number>(0)

  useEffect(() => {
    props.onChange?.(value)
  }, [value])

  const cols = value !== null && (value.length > 0) ? value[0].length : (props.cols ?? 0)
  const rows = value !== null && (value.length > 0) ? value.length : (props.rows ?? 0)

  const emptyValue = (): void => {
    if (value !== null) {
      setValue([])
      setKey(key + 1) // force re-render
    }
  }

  const addRow = (): void => {
    const newValue = [...value ?? []]
    const newRow = new Array<string>(cols).fill('')

    if (activeCell?.rowIndex !== undefined) {
      newValue.splice(activeCell.rowIndex, 0, newRow)
    } else {
      newValue.push(newRow)
    }

    setValue(newValue)
  }

  const addColumn = (): void => {
    if (activeCell === undefined) return

    const newValue = [...value ?? []]
    newValue.forEach(row => row.splice(activeCell.columnIndex, 0, ''))

    setValue(newValue)
  }

  const deleteRow = (): void => {
    if (activeCell === undefined) return

    const newValue = [...value ?? []]
    newValue.splice(activeCell.rowIndex, 1)

    setValue(newValue)
  }

  const deleteColumn = (): void => {
    if (activeCell === undefined) return

    const newValue = [...value ?? []]
    newValue.forEach(row => row.splice(activeCell.columnIndex, 1))

    setValue(newValue)
  }

  const duplicateRow = (): void => {
    if (activeCell === undefined) return

    const newValue = [...value ?? []]
    const rowToDuplicate = newValue[activeCell.rowIndex]
    newValue.splice(activeCell.rowIndex, 0, [...rowToDuplicate])

    setValue(newValue)
  }

  return {
    value,
    setValue,
    activeCell,
    setActiveCell,
    key,
    emptyValue,
    addRow,
    addColumn,
    deleteRow,
    deleteColumn,
    duplicateRow,
    rows,
    cols
  }
}
