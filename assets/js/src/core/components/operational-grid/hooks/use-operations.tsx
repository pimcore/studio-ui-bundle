/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useOperationalGridContext } from '../provider/operational-grid-provider'
import { type ColumnDef } from '@tanstack/react-table'

export interface UseOperationsReturn {
  addRow: (data?: any) => void
  clearAll: () => void
  deleteSelectedRows: () => void
  clearSelectedRows: () => void
  getSelectedRowsData: () => any[]
  addColumn: (column: ColumnDef<any>, defaultValue?: any) => void
  removeColumn: (columnId: string) => void
  updateColumn: (columnId: string, updatedColumn: ColumnDef<any>) => void
}

export const useOperations = (): UseOperationsReturn => {
  const { value, onChange, finalGridProps, columns, onColumnsChange } = useOperationalGridContext()
  const selectedRows = finalGridProps.selectedRows
  const onSelectedRowsChange = finalGridProps.onSelectedRowsChange

  const addRow = (data?: any): void => {
    const newValue = [...value, data]
    onChange?.(newValue)
  }

  const clearAll = (): void => {
    onChange?.([])
    onSelectedRowsChange?.({})
  }

  const deleteSelectedRows = (): void => {
    if (selectedRows === null || selectedRows === undefined) return

    const selectedIndices = Object.keys(selectedRows)
      .filter(key => selectedRows[key])
      .map(key => parseInt(key, 10))
      .sort((a, b) => b - a) // Sort in reverse order to avoid index shifting

    const newValue = [...value]
    selectedIndices.forEach(index => {
      newValue.splice(index, 1)
    })

    onChange?.(newValue)
    onSelectedRowsChange?.({})
  }

  const clearSelectedRows = (): void => {
    onSelectedRowsChange?.({})
  }

  const getSelectedRowsData = (): any[] => {
    if (selectedRows === null || selectedRows === undefined) return []

    return Object.keys(selectedRows)
      .filter(key => selectedRows[key])
      .map(key => parseInt(key, 10))
      .filter(index => index < value.length)
      .map(index => value[index])
  }

  const addColumn = (column: ColumnDef<any>, defaultValue: any = null): void => {
    const newColumns = [...columns, column]
    onColumnsChange?.(newColumns)

    // Add default value to existing rows for the new column
    const columnId = 'accessorKey' in column ? column.accessorKey : column.id
    if ((columnId !== null && columnId !== undefined) && value.length > 0) {
      const newValue = value.map(row => ({
        ...row,
        [columnId]: row[columnId] !== undefined ? row[columnId] : defaultValue
      }))
      onChange?.(newValue)
    }
  }

  const removeColumn = (columnId: string): void => {
    const newColumns = columns.filter(col => {
      // Handle both accessorKey (string) and id (string) properties
      const colId = 'accessorKey' in col ? col.accessorKey : col.id
      return colId !== columnId
    })
    onColumnsChange?.(newColumns)

    // Remove the property from existing rows
    if (value.length > 0) {
      const newValue = value.map(row => {
        const { [columnId]: removedProperty, ...restRow } = row
        return restRow
      })
      onChange?.(newValue)
    }
  }

  const updateColumn = (columnId: string, updatedColumn: ColumnDef<any>): void => {
    const newColumns = columns.map(col => {
      // Handle both accessorKey (string) and id (string) properties
      const colId = 'accessorKey' in col ? col.accessorKey : col.id
      return colId === columnId ? updatedColumn : col
    })
    onColumnsChange?.(newColumns)
  }

  return {
    addRow,
    clearAll,
    deleteSelectedRows,
    clearSelectedRows,
    getSelectedRowsData,
    addColumn,
    removeColumn,
    updateColumn
  }
}
