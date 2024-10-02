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
import { type GridColumnConfiguration } from 'src/sdk/main'
import {
  type BatchContext, BatchEditContext
} from '@Pimcore/modules/asset/editor/types/folder/tab-manager/tabs/list/toolbar/tools/batch-edit-modal/batch-edit-provider'
import { t } from 'i18next'

interface UseBatchEditHookReturn extends BatchContext {
  addBatchEdit: (column: GridColumnConfiguration, value: string) => void
  resetBatchEdits: () => void
}

export interface BatchEdit {
  key: string
  type: string
  value: string
}

export const useBatchEdit = (): UseBatchEditHookReturn => {
  const { batchEdits, setBatchEdits } = useContext(BatchEditContext)

  const resetBatchEdits = (): void => {
    setBatchEdits([])
  }

  const addBatchEdit = (column: GridColumnConfiguration, value: string): void => {
    let newEdits: BatchEdit[] = []

    if (batchEdits.length !== null) {
      newEdits = [{
        key: t(`asset.listing.column.${column.key}`),
        type: column.type,
        value
      }]

      setBatchEdits(newEdits)
    }
  }

  return {
    batchEdits,
    setBatchEdits,
    addBatchEdit,
    resetBatchEdits
  }
}
