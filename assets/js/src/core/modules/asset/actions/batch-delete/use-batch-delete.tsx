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
import { AssetBatchDeleteJob } from '@Pimcore/modules/execution-engine/jobs/batch-delete/asset-batch-delete-job'
import { useRefreshGrid } from '@Pimcore/modules/element/actions/refresh-grid/use-refresh-grid'
import { useBatchDeleteConfirm } from '@Pimcore/modules/element/actions/delete/use-batch-delete-confirm'

export interface UseBatchDeleteReturn {
  confirmBatchDelete: (itemIds: number[], selectedRowsData?: Record<number, any>, onFinish?: () => void) => Promise<void>
}

export const useBatchDelete = (): UseBatchDeleteReturn => {
  const executionEngine = container.get<ExecutionEngine>(serviceIds.executionEngine)
  const { refreshGrid } = useRefreshGrid('asset')
  const { confirmBatchDelete: confirmDialog } = useBatchDeleteConfirm()

  const confirmBatchDelete = async (itemIds: number[], selectedRowsData?: Record<number, any>, onFinish?: () => void): Promise<void> => {
    await confirmDialog({
      elementType: 'asset',
      itemIds,
      selectedRowsData,
      onOk: async () => {
        const job = new AssetBatchDeleteJob({
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

  return { confirmBatchDelete }
}
