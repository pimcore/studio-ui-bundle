/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useState, useCallback } from 'react'
import { isNil } from 'lodash'
import { GeneralError } from '@Pimcore/modules/app/error-handler'
import {
  useClassBulkImportPrepareMutation,
  type BulkExportAvailableItem
} from '@Pimcore/modules/class-definition/class-definition-slice-enhanced'
import { useExecutionEngine } from '@Pimcore/modules/execution-engine/hooks/use-execution-engine'
import { BulkImportJob } from '../../../jobs/bulk-import-job'
import { type BulkImportItem } from '../context/bulk-import-context'

interface PrepareResult {
  fileId: string
  items: BulkExportAvailableItem[]
}

interface UseBulkImportReturn {
  fileId: string | null
  availableItems: BulkExportAvailableItem[]
  isPreparing: boolean
  handleUpload: (file: File) => Promise<PrepareResult>
  handleImport: (fileId: string, items: BulkImportItem[], title: string) => void
  reset: () => void
}

export const useBulkImport = (): UseBulkImportReturn => {
  const [fileId, setFileId] = useState<string | null>(null)
  const [availableItems, setAvailableItems] = useState<BulkExportAvailableItem[]>([])

  const [triggerPrepare, { isLoading: isPreparing }] = useClassBulkImportPrepareMutation()
  const executionEngine = useExecutionEngine()

  const handleUpload = useCallback(async (file: File): Promise<PrepareResult> => {
    const result = await triggerPrepare({ body: { file: file as unknown as Blob } })

    if (!('data' in result) || isNil(result.data)) {
      throw new GeneralError('Bulk import prepare failed')
    }

    const { fileId: newFileId, items } = result.data

    setFileId(newFileId)
    setAvailableItems(items)

    return { fileId: newFileId, items }
  }, [triggerPrepare])

  const handleImport = useCallback((importFileId: string, items: BulkImportItem[], title: string): void => {
    const job = new BulkImportJob({
      fileId: importFileId,
      items,
      title
    })

    void executionEngine.runJob(job)
  }, [executionEngine])

  const reset = useCallback((): void => {
    setFileId(null)
    setAvailableItems([])
  }, [])

  return {
    fileId,
    availableItems,
    isPreparing,
    handleUpload,
    handleImport,
    reset
  }
}
