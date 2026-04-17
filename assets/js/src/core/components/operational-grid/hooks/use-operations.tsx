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
import { isNil } from 'lodash'
import React, { useState } from 'react'
import { CsvImportModal } from '../csv-import-modal/csv-import-modal'

export interface UseOperationsReturn {
  addRow: (data?: any) => void
  clearAll: () => void
  deleteSelectedRows: () => void
  clearSelectedRows: () => void
  getSelectedRowsData: () => any[]
  addColumn: (column: ColumnDef<any>, defaultValue?: any) => void
  removeColumn: (columnId: string) => void
  updateColumn: (columnId: string, updatedColumn: ColumnDef<any>) => void
  openCsvImport?: () => void
  csvImportModal: React.JSX.Element | null
}

export const useOperations = (): UseOperationsReturn => {
  const { value, onChange, finalGridProps, columns, onColumnsChange, disableCsvImport } = useOperationalGridContext()
  const selectedRows = finalGridProps.selectedRows
  const onSelectedRowsChange = finalGridProps.onSelectedRowsChange
  const setRowId = finalGridProps.setRowId
  const [isCsvImportOpen, setIsCsvImportOpen] = useState(false)

  const getRowId = (row: any, index: number): string => {
    if (!isNil(setRowId)) {
      return setRowId(row, index, undefined as any)
    }

    return String(index)
  }

  const getSelectedRowKeys = (): Set<string> => {
    if (isNil(selectedRows)) return new Set()

    return new Set(
      Object.keys(selectedRows).filter(key => selectedRows[key])
    )
  }

  const addRow = (data?: any): void => {
    const newValue = [...value, data]
    onChange?.(newValue)
  }

  const clearAll = (): void => {
    onChange?.([])
    onSelectedRowsChange?.({})
  }

  const deleteSelectedRows = (): void => {
    if (isNil(selectedRows)) return

    const selectedKeys = getSelectedRowKeys()
    if (selectedKeys.size === 0) return

    const newValue = value.filter((row, index) => !selectedKeys.has(getRowId(row, index)))

    onChange?.(newValue)
    onSelectedRowsChange?.({})
  }

  const clearSelectedRows = (): void => {
    onSelectedRowsChange?.({})
  }

  const getSelectedRowsData = (): any[] => {
    if (isNil(selectedRows)) return []

    const selectedKeys = getSelectedRowKeys()
    if (selectedKeys.size === 0) return []

    return value.filter((row, index) => selectedKeys.has(getRowId(row, index)))
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

  const handleCsvImportConfirm = (newRows: any[]): void => {
    onChange?.(newRows)
    setIsCsvImportOpen(false)
  }

  const handleCsvImportCancel = (): void => {
    setIsCsvImportOpen(false)
  }

  const csvEnabled = disableCsvImport !== true

  const openCsvImport = csvEnabled
    ? (): void => { setIsCsvImportOpen(true) }
    : undefined

  const csvImportModal = csvEnabled
    ? (
      <CsvImportModal
        columns={ columns }
        onCancel={ handleCsvImportCancel }
        onConfirm={ handleCsvImportConfirm }
        open={ isCsvImportOpen }
        value={ value }
      />
      )
    : null

  return {
    addRow,
    clearAll,
    deleteSelectedRows,
    clearSelectedRows,
    getSelectedRowsData,
    addColumn,
    removeColumn,
    updateColumn,
    openCsvImport,
    csvImportModal
  }
}
