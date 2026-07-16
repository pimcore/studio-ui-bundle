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

  const addOrUpdateBatchEdit = (column: AvailableColumn, value: BatchEdit['value']): void => {
    if (column.localizable) {
      const usedLocales = new Set(
        batchEdits
          .filter(edit => edit.key === column.key && areGroupsEqual(edit.group, column.group))
          .map(edit => edit.locale)
      )
      const nextLocale = contentLanguages.find(language => !usedLocales.has(language))

      if (nextLocale === undefined) {
        return
      }

      setBatchEdits([...batchEdits, { ...column, locale: nextLocale, value }])
      return
    }

    const newEdit: BatchEdit = { ...column, locale: null, value }

    const updatedEdits: BatchEdit[] = [...batchEdits]
    const existingIndex = batchEdits.findIndex(edit => edit.key === newEdit.key && areGroupsEqual(edit.group, newEdit.group))

    if (existingIndex !== -1) {
      updatedEdits[existingIndex] = newEdit
    } else {
      updatedEdits.push(newEdit)
    }

    setBatchEdits(updatedEdits)
  }

  const addOrUpdateBatchEdits = (columns: AvailableColumn[]): void => {
    const updatedEdits: BatchEdit[] = [...batchEdits]

    columns.forEach(column => {
      const newEdit: BatchEdit = {
        ...column,
        locale: column.localizable ? column.locale ?? contentLanguages[0] : null,
        value: undefined
      }

      const existingIndex = batchEdits.findIndex(edit => edit.key === newEdit.key)

      if (existingIndex !== -1) {
        updatedEdits[existingIndex] = newEdit
      } else {
        updatedEdits.push(newEdit)
      }
    })

    setBatchEdits(updatedEdits)
  }

  const removeBatchEdit = (batchEdit: BatchEdit): void => {
    const updatedEdits = batchEdits.filter(edit => !isSameEntry(edit, batchEdit))
    setBatchEdits(updatedEdits)
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
