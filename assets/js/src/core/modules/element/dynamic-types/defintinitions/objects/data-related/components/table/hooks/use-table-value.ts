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

export type TableValue = Array<Record<string, string> | string[]>

interface UseTableValueProps {
  cols: number | null
  rows: number | null
  initialValue: TableValue | null
  onChange?: (value: TableValue | null) => void
  columnConfigActivated: boolean
  columnConfig?: Array<{ key: string, label: string }>
  emptyValue: TableValue | null
}

interface UseTableValueReturn {
  value: TableValue | null
  setValue: (value: TableValue | null) => void
  activeCell: GridCellReference | undefined
  setActiveCell: (cell: GridCellReference | undefined) => void
  key: number
  emptyValue: () => void
  newRow: () => void
  newColumn: () => void
  deleteRow: () => void
  deleteColumn: () => void
  duplicateRow: () => void
  fixColumnConfig: (value: TableValue) => TableValue
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

  const initializeValue = (): TableValue => {
    const rows = props.rows ?? 1

    return new Array(rows).fill(null).map(() => createEmptyRow())
  }

  let cols = (() => {
    if (value !== null && value.length > 0) {
      if (props.columnConfigActivated) {
        return Object.keys(value[0]).length
      } else {
        return (value[0] as string[]).length
      }
    } else {
      return props.cols ?? 0
    }
  })()
  let rows = value !== null && value.length > 0 ? value.length : (props.rows ?? 0)
  cols = Math.max(cols, 1)
  rows = Math.max(rows, 1)

  const emptyValue = (): void => {
    setValue(props.emptyValue ?? [])
    setKey(key + 1) // force re-render
  }

  const createEmptyRow = (): Record<string, string> | string[] => {
    if (props.columnConfigActivated && props.columnConfig !== undefined) {
      return props.columnConfig.reduce<Record<string, string>>((acc, col) => {
        acc[col.key] = ''
        return acc
      }, {})
    } else {
      return new Array<string>(cols).fill('')
    }
  }

  const newRow = (): void => {
    const newValue = [...(value !== null && value.length > 0 ? value : initializeValue())]
    const newRow = createEmptyRow()

    if (activeCell?.rowIndex !== undefined) {
      newValue.splice(activeCell.rowIndex, 0, newRow)
    } else {
      newValue.push(newRow)
    }

    setValue(newValue as TableValue)
  }

  const newColumn = (): void => {
    if (props.columnConfigActivated) return
    const newValue = [...(value !== null && value.length > 0 ? value : initializeValue())]
    newValue.forEach(row => (row as string[]).splice(activeCell?.columnIndex ?? (row as string[]).length, 0, ''))

    setValue(newValue as TableValue)
  }

  const deleteRow = (): void => {
    if (activeCell === undefined) return

    const newValue = [...(value !== null && value.length > 0 ? value : initializeValue())]
    newValue.splice(activeCell.rowIndex, 1)

    setValue(newValue as TableValue)
  }

  const deleteColumn = (): void => {
    if (props.columnConfigActivated || activeCell === undefined) return

    const newValue = [...(value !== null && value.length > 0 ? value : initializeValue())]
    newValue.forEach(row => (row as string[]).splice(activeCell.columnIndex, 1))

    setValue(newValue as TableValue)
  }

  const duplicateRow = (): void => {
    if (activeCell === undefined) return

    const newValue = [...(value !== null && value.length > 0 ? value : initializeValue())]
    const rowToDuplicate = newValue[activeCell.rowIndex]
    if (Array.isArray(rowToDuplicate)) {
      newValue.splice(activeCell.rowIndex, 0, [...rowToDuplicate])
    } else {
      newValue.splice(activeCell.rowIndex, 0, { ...rowToDuplicate })
    }

    setValue(newValue as TableValue)
  }

  const fixColumnConfig = (value: TableValue): TableValue => {
    if (!props.columnConfigActivated || props.columnConfig === undefined) {
      return value
    }

    const columnConfig = props.columnConfig ?? []
    return value.map(row => {
      const newRow: Record<string, string> = {}
      columnConfig.forEach((col, index) => {
        newRow[col.key] = row[index] ?? ''
      })
      return newRow
    })
  }

  return {
    value,
    setValue,
    activeCell,
    setActiveCell,
    key,
    emptyValue,
    newRow,
    newColumn,
    deleteRow,
    deleteColumn,
    duplicateRow,
    fixColumnConfig,
    rows,
    cols
  }
}
