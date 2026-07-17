/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useContext } from 'react'
import { type BatchContext, type BatchEdit, BatchEditContext } from '../batch-edit-provider'
import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'
import { useUser } from '@Pimcore/modules/auth/hooks/use-user'
import { areGroupsEqual } from '../utils/dropdown-filter'

interface UseBatchEditHookReturn extends BatchContext {
  addOrUpdateBatchEdit: (column: AvailableColumn) => void
  updateLocale: (batchEdit: BatchEdit, locale: string | null) => void
  resetBatchEdits: () => void
  removeBatchEdit: (batchEdit: BatchEdit) => void
}

const isSameEntry = (a: BatchEdit, b: BatchEdit): boolean => a.rowId === b.rowId

export const useBatchEdit = (): UseBatchEditHookReturn => {
  const { batchEdits, setBatchEdits } = useContext(BatchEditContext)
  const user = useUser()
  const contentLanguages = Array.isArray(user.contentLanguages) ? user.contentLanguages as string[] : []

  const resetBatchEdits = (): void => {
    setBatchEdits([])
  }

  const updateLocale = (batchEdit: BatchEdit, locale: string | null): void => {
    const updatedEdits = batchEdits.map(edit =>
      isSameEntry(edit, batchEdit) ? { ...edit, locale } : edit
    )
    setBatchEdits(updatedEdits)
  }

  const addOrUpdateBatchEdit = (column: AvailableColumn): void => {
    // Each click on a localizable field adds a row for the next unused locale (null first).
    if (column.localizable === true) {
      const usedLocales = new Set(
        batchEdits
          .filter(edit => edit.key === column.key && areGroupsEqual(edit.group, column.group))
          .map(edit => edit.locale ?? null)
      )
      const candidateLocales: Array<string | null> = [null, ...contentLanguages]
      const nextLocale = candidateLocales.find(locale => !usedLocales.has(locale))

      if (nextLocale === undefined) {
        return
      }

      setBatchEdits([...batchEdits, { ...column, rowId: crypto.randomUUID(), locale: nextLocale }])
      return
    }

    const updatedEdits: BatchEdit[] = [...batchEdits]
    const existingIndex = batchEdits.findIndex(edit => edit.key === column.key && areGroupsEqual(edit.group, column.group))

    if (existingIndex !== -1) {
      updatedEdits[existingIndex] = { ...column, rowId: batchEdits[existingIndex].rowId, locale: null }
    } else {
      updatedEdits.push({ ...column, rowId: crypto.randomUUID(), locale: null })
    }

    setBatchEdits(updatedEdits)
  }

  const removeBatchEdit = (batchEdit: BatchEdit): void => {
    const updatedEdits = batchEdits.filter(edit => !isSameEntry(edit, batchEdit))
    setBatchEdits(updatedEdits)
  }

  return {
    batchEdits,
    setBatchEdits,
    updateLocale,
    resetBatchEdits,
    removeBatchEdit,
    addOrUpdateBatchEdit
  }
}
