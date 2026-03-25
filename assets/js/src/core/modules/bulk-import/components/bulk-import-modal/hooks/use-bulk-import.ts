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
import {
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
  setUploadResult: (result: PrepareResult) => void
  handleImport: (fileId: string, items: BulkImportItem[], title: string) => void
  reset: () => void
}

export const useBulkImport = (): UseBulkImportReturn => {
  const [fileId, setFileId] = useState<string | null>(null)
  const [availableItems, setAvailableItems] = useState<BulkExportAvailableItem[]>([])

  const executionEngine = useExecutionEngine()

  const setUploadResult = useCallback((result: PrepareResult): void => {
    setFileId(result.fileId)
    setAvailableItems(result.items)
  }, [])

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
    setUploadResult,
    handleImport,
    reset
  }
}
