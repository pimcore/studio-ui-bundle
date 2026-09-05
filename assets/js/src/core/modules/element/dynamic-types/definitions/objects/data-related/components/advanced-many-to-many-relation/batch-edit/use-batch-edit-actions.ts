/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useCallback, useState } from 'react'
import { type RowSelectionState } from '@tanstack/react-table'
import { type AdvancedManyToManyRelationValue } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/relations/types/advanced-many-to-many-relation'

export interface BatchEditApplyEntry {
  columnKey: string
  value: any
}

export interface UseBatchEditActionsProps {
  value?: AdvancedManyToManyRelationValue | null
  onChange?: (value?: AdvancedManyToManyRelationValue | null) => void
}

export interface UseBatchEditActionsReturn {
  selectedRows: RowSelectionState
  setSelectedRows: (rows: RowSelectionState) => void
  handleBatchApply: (entries: BatchEditApplyEntry[]) => void
  handleBatchDelete: () => void
}

/**
 * Shared hook for batch edit/delete actions on advanced many-to-many relations.
 *
 * The relation grid keys rows by `originalIndex` — the row's position in the unfiltered
 * value, stamped before search and column filters are applied. Element id cannot be used:
 * with `allowMultipleAssignments` one element occupies several rows, so an id would select
 * every occurrence of it rather than the row the user ticked.
 */
export const useBatchEditActions = ({ value, onChange }: UseBatchEditActionsProps): UseBatchEditActionsReturn => {
  const [selectedRows, setSelectedRows] = useState<RowSelectionState>({})

  // Selection keys are already positions in the unfiltered value, so they map straight across.
  const getSelectedIndices = useCallback((): Set<number> => {
    if (value === undefined || value === null) return new Set()

    return new Set(
      Object.keys(selectedRows)
        .map(Number)
        .filter((index) => Number.isInteger(index) && index >= 0 && index < value.length)
    )
  }, [value, selectedRows])

  const handleBatchApply = useCallback((entries: BatchEditApplyEntry[]): void => {
    if (value === undefined || value === null || entries.length === 0) return

    const selectedIndices = getSelectedIndices()
    const applyToAll = Object.keys(selectedRows).length === 0

    const newValue: AdvancedManyToManyRelationValue = value.map((row, index) => {
      if (applyToAll || selectedIndices.has(index)) {
        const updatedData = { ...row.data }
        for (const entry of entries) {
          updatedData[entry.columnKey] = Array.isArray(entry.value) ? entry.value.join(',') : entry.value
        }
        return { ...row, data: updatedData }
      }
      return row
    })

    onChange?.(newValue)
    setSelectedRows({})
  }, [value, onChange, selectedRows, getSelectedIndices])

  const handleBatchDelete = useCallback((): void => {
    if (value === undefined || value === null) return

    const selectedIndices = getSelectedIndices()
    const applyToAll = Object.keys(selectedRows).length === 0

    if (applyToAll) {
      onChange?.([])
    } else {
      const newValue = value.filter((_, index) => !selectedIndices.has(index))
      onChange?.(newValue)
    }

    setSelectedRows({})
  }, [value, onChange, selectedRows, getSelectedIndices])

  return { selectedRows, setSelectedRows, handleBatchApply, handleBatchDelete }
}
