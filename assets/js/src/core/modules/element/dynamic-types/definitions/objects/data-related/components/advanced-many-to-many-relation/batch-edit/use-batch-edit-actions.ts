/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useCallback, useEffect, useRef, useState } from 'react'
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

  /**
   * Selection keys are positions, so they stop meaning the same row as soon as rows are added,
   * removed or reordered - a selected row 1 would silently become whichever row moved into that
   * slot, and the next batch action would edit or delete the wrong one.
   *
   * The signature therefore covers the cell data as well as the element, not element identity
   * alone: with allowMultipleAssignments two rows can share a `type:id`, so swapping them is
   * invisible to an identity-only signature while still moving the row under the selection.
   * Keys are sorted so that rewriting `data` in a different key order does not read as a change.
   *
   * Two duplicate rows carrying identical data are indistinguishable, so leaving the selection
   * on either of them is equivalent.
   */
  const rowSignature = (row: AdvancedManyToManyRelationValue[number]): string => {
    const data = row.data ?? {}
    const cells = Object.keys(data)
      .sort((a, b) => a.localeCompare(b))
      .map((key) => `${key}=${String(data[key])}`)
      .join(',')

    return `${String(row.element?.type ?? '')}:${String(row.element?.id ?? '')}:${cells}`
  }

  const structureSignature = (value ?? []).map(rowSignature).join('|')
  const lastStructure = useRef(structureSignature)

  useEffect(() => {
    if (lastStructure.current !== structureSignature) {
      lastStructure.current = structureSignature
      setSelectedRows({})
    }
  }, [structureSignature])

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
