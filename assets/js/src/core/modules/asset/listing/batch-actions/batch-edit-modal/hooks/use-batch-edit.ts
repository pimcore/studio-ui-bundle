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

interface UseBatchEditHookReturn extends BatchContext {
  addOrUpdateBatchEdit: (column: AvailableColumn) => void
  updateLocale: (batchEdit: BatchEdit, locale: string | null) => void
  resetBatchEdits: () => void
  removeBatchEdit: (batchEdit: BatchEdit) => void
}

// Entries are identified by (key + locale); a language-neutral value (locale null) is a valid row.
const isSameEntry = (a: BatchEdit, b: BatchEdit): boolean =>
  a.key === b.key && (a.locale ?? null) === (b.locale ?? null)

export const useBatchEdit = (): UseBatchEditHookReturn => {
  const { batchEdits, setBatchEdits } = useContext(BatchEditContext)
  const user = useUser()
  const contentLanguages = (user.contentLanguages ?? []) as string[]

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
    if (column.localizable) {
      const usedLocales = new Set(
        batchEdits.filter(edit => edit.key === column.key).map(edit => edit.locale ?? null)
      )
      const candidateLocales: Array<string | null> = [null, ...contentLanguages]
      const nextLocale = candidateLocales.find(locale => !usedLocales.has(locale))

      if (nextLocale === undefined) {
        return
      }

      setBatchEdits([...batchEdits, { ...column, locale: nextLocale }])
      return
    }

    const newEdit: BatchEdit = { ...column, locale: null }
    const updatedEdits: BatchEdit[] = [...batchEdits]
    const existingIndex = batchEdits.findIndex(edit => edit.key === newEdit.key)

    if (existingIndex !== -1) {
      updatedEdits[existingIndex] = newEdit
    } else {
      updatedEdits.push(newEdit)
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
