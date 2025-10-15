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
import { useSettings } from '@Pimcore/modules/app/settings/hooks/use-settings'

interface UseBatchEditHookReturn extends BatchContext {
  addOrUpdateBatchEdit: (column: AvailableColumn, value: BatchEdit['value']) => void
  addOrUpdateBatchEdits: (columns: AvailableColumn[]) => void
  updateLocale: (batchEdit: BatchEdit, locale: string | null) => void
  resetBatchEdits: () => void
  removeBatchEdit: (batchEdit: BatchEdit) => void
}

export const useBatchEdit = (): UseBatchEditHookReturn => {
  const { batchEdits, setBatchEdits } = useContext(BatchEditContext)
  const settings = useSettings()

  const resetBatchEdits = (): void => {
    setBatchEdits([])
  }

  const updateLocale = (batchEdit: BatchEdit, locale: string | null): void => {
    const columnKey = batchEdit.key

    const updatedEdits = batchEdits.map(edit => {
      if (edit.key === columnKey) {
        return {
          ...edit,
          locale
        }
      }

      return edit
    })
    setBatchEdits(updatedEdits)
  }

  const addOrUpdateBatchEdit = (column: AvailableColumn, value: BatchEdit['value']): void => {
    const newEdit: BatchEdit = {
      ...column,
      // @todo infer selected language from grid config when available
      locale: column.localizable ? column.locale ?? settings.requiredLanguages[0] : null,
      value
    }

    const updatedEdits: BatchEdit[] = [...batchEdits]

    const existingIndex = batchEdits.findIndex(edit => edit.key === newEdit.key)

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
        // @todo infer selected language from grid config when available
        locale: column.localizable ? column.locale ?? settings.requiredLanguages[0] : null,
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
    const updatedEdits = batchEdits.filter(edit => {
      if (batchEdit.type === 'dataobject.classificationstore') {
        if (!('keyId' in edit.config) || !('groupId' in edit.config) || !('keyId' in batchEdit.config) || !('groupId' in batchEdit.config)) {
          throw new Error('keyId or groupId is missing in config')
        }

        return !(edit.key === batchEdit.key && edit.config.keyId === batchEdit.config.keyId && edit.config.groupId === batchEdit.config.groupId)
      }

      return edit.key !== batchEdit.key
    })
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
