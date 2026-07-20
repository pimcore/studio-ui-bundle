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
  addOrUpdateBatchEdit: (column: AvailableColumn, value: BatchEdit['value']) => void
  addOrUpdateBatchEdits: (columns: AvailableColumn[]) => void
  updateLocale: (batchEdit: BatchEdit, locale: string | null) => void
  resetBatchEdits: () => void
  removeBatchEdit: (batchEdit: BatchEdit) => void
}

// Entries are identified by key + locale + group, plus keyId/groupId for classification store.
const isSameEntry = (a: BatchEdit, b: BatchEdit): boolean => {
  if (a.key !== b.key || (a.locale ?? null) !== (b.locale ?? null) || !areGroupsEqual(a.group, b.group)) {
    return false
  }

  if (a.type === 'dataobject.classificationstore' || b.type === 'dataobject.classificationstore') {
    const aConfig = a.config as { keyId?: unknown, groupId?: unknown }
    const bConfig = b.config as { keyId?: unknown, groupId?: unknown }

    return aConfig.keyId === bConfig.keyId && aConfig.groupId === bConfig.groupId
  }

  return true
}

// Only adapter fields get one row per locale; object-brick stays single-entry, and with no
// content languages we fall back to a single entry too.
const supportsMultipleLocales = (column: AvailableColumn, contentLanguages: string[]): boolean =>
  column.localizable && column.type !== 'dataobject.objectbrick' && contentLanguages.length > 0

export const useBatchEdit = (): UseBatchEditHookReturn => {
  const { batchEdits, setBatchEdits } = useContext(BatchEditContext)
  const user = useUser()
  const contentLanguages = Array.isArray(user.contentLanguages) ? user.contentLanguages as string[] : []

  const resetBatchEdits = (): void => {
    setBatchEdits([])
  }

  const updateLocale = (batchEdit: BatchEdit, locale: string | null): void => {
    setBatchEdits(prev => prev.map(edit => (isSameEntry(edit, batchEdit) ? { ...edit, locale } : edit)))
  }

  const addOrUpdateBatchEdit = (column: AvailableColumn, value: BatchEdit['value']): void => {
    if (supportsMultipleLocales(column, contentLanguages)) {
      setBatchEdits(prev => {
        const usedLocales = new Set(
          prev
            .filter(edit => edit.key === column.key && areGroupsEqual(edit.group, column.group))
            .map(edit => edit.locale)
        )
        const nextLocale = contentLanguages.find(language => !usedLocales.has(language))

        if (nextLocale === undefined) {
          return prev
        }

        return [...prev, { ...column, locale: nextLocale, value }]
      })
      return
    }

    // Single entry: non-localizable, object-brick, or when the user has no content languages.
    const locale = column.localizable ? column.locale ?? contentLanguages[0] ?? null : null
    const newEdit: BatchEdit = { ...column, locale, value }

    setBatchEdits(prev => {
      const existingIndex = prev.findIndex(edit => edit.key === newEdit.key && areGroupsEqual(edit.group, newEdit.group))

      if (existingIndex === -1) {
        return [...prev, newEdit]
      }

      const updated = [...prev]
      updated[existingIndex] = newEdit
      return updated
    })
  }

  const addOrUpdateBatchEdits = (columns: AvailableColumn[]): void => {
    setBatchEdits(prev => {
      const updatedEdits: BatchEdit[] = [...prev]

      columns.forEach(column => {
        const newEdit: BatchEdit = {
          ...column,
          locale: column.localizable ? column.locale ?? contentLanguages[0] ?? null : null,
          value: undefined
        }

        const existingIndex = updatedEdits.findIndex(edit => isSameEntry(edit, newEdit))

        if (existingIndex !== -1) {
          updatedEdits[existingIndex] = newEdit
        } else {
          updatedEdits.push(newEdit)
        }
      })

      return updatedEdits
    })
  }

  const removeBatchEdit = (batchEdit: BatchEdit): void => {
    setBatchEdits(prev => prev.filter(edit => !isSameEntry(edit, batchEdit)))
  }

  return {
    batchEdits,
    setBatchEdits,
    addOrUpdateBatchEdit,
    addOrUpdateBatchEdits,
    updateLocale,
    resetBatchEdits,
    removeBatchEdit
  }
}
