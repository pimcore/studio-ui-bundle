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
 * The Grid component keys rows by element ID (via setRowId), so selectedRows
 * contains element IDs as keys, not array indices. This hook resolves selected
 * element IDs to their positions in the value array to apply edits/deletes
 * to the correct rows.
 */
export const useBatchEditActions = ({ value, onChange }: UseBatchEditActionsProps): UseBatchEditActionsReturn => {
  const [selectedRows, setSelectedRows] = useState<RowSelectionState>({})

  const getSelectedIndices = useCallback((): Set<number> => {
    if (value === undefined || value === null) return new Set()

    const selectedIds = new Set(Object.keys(selectedRows).map(Number))
    const indices = new Set<number>()

    value.forEach((row, index) => {
      if (selectedIds.has(row.element.id)) {
        indices.add(index)
      }
    })

    return indices
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
