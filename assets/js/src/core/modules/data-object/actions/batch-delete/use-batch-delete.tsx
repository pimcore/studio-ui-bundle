/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type ExecutionEngine } from '@Pimcore/modules/execution-engine/services/execution-engine'
import { DataObjectBatchDeleteJob } from '@Pimcore/modules/execution-engine/jobs/batch-delete/data-object-batch-delete-job'
import { useRefreshGrid } from '@Pimcore/modules/element/actions/refresh-grid/use-refresh-grid'
import { useBatchDeleteConfirm } from '@Pimcore/modules/element/actions/delete/use-batch-delete-confirm'
import { elementTypes } from '@sdk/modules/data-object'

export interface UseBatchDeleteReturn {
  confirmBatchDelete: (itemIds: number[], selectedRowsData?: Record<number, any>, onFinish?: () => void) => Promise<void>
  isLoading: boolean
}

export const useBatchDelete = (): UseBatchDeleteReturn => {
  const executionEngine = container.get<ExecutionEngine>(serviceIds.executionEngine)
  const { refreshGrid } = useRefreshGrid(elementTypes.dataObject)
  const { confirmBatchDelete: confirmDialog, isLoading } = useBatchDeleteConfirm()

  const confirmBatchDelete = async (itemIds: number[], selectedRowsData?: Record<number, any>, onFinish?: () => void): Promise<void> => {
    await confirmDialog({
      elementType: elementTypes.dataObject,
      itemIds,
      selectedRowsData,
      onOk: async () => {
        const job = new DataObjectBatchDeleteJob({
          itemIds,
          onFinish: async () => {
            await refreshGrid()
            onFinish?.()
          }
        })

        await executionEngine.runJob(job)
      }
    })
  }

  return { confirmBatchDelete, isLoading }
}
