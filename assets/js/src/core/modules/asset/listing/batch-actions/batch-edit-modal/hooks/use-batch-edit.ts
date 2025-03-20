/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { useContext } from 'react'
import { type BatchContext, type BatchEdit, BatchEditContext } from '../batch-edit-provider'
import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'

interface UseBatchEditHookReturn extends BatchContext {
  addOrUpdateBatchEdit: (column: AvailableColumn) => void
  updateLocale: (key: string, locale: string | null) => void
  resetBatchEdits: () => void
  removeBatchEdit: (key: string) => void
}

export const useBatchEdit = (): UseBatchEditHookReturn => {
  const { batchEdits, setBatchEdits } = useContext(BatchEditContext)

  const resetBatchEdits = (): void => {
    setBatchEdits([])
  }

  const updateLocale = (columnKey: string, locale: string | null): void => {
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

  const addOrUpdateBatchEdit = (column: AvailableColumn): void => {
    const newEdit: BatchEdit = column

    const updatedEdits: BatchEdit[] = [...batchEdits]

    const existingIndex = batchEdits.findIndex(edit => edit.key === newEdit.key)

    if (existingIndex !== -1) {
      updatedEdits[existingIndex] = newEdit
    } else {
      updatedEdits.push(newEdit)
    }

    setBatchEdits(updatedEdits)
  }

  const removeBatchEdit = (key: string): void => {
    const updatedEdits = batchEdits.filter(edit => edit.key !== key)
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
