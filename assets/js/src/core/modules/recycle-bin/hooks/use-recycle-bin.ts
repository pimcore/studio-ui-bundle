/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import { useAppDispatch } from '@Pimcore/app/store'
import ApiError from '@Pimcore/modules/app/error-handler/classes/api-error'
import GeneralError from '@Pimcore/modules/app/error-handler/classes/general-error'
import trackError from '@Pimcore/modules/app/error-handler/error-handler'
import { mapToElementType } from '@Pimcore/modules/element/utils/element-type'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type ExecutionEngine } from '@Pimcore/modules/execution-engine/services/execution-engine'
import { RecycleBinDeleteJob } from '@Pimcore/modules/execution-engine/jobs/recycle-bin/recycle-bin-delete-job'
import { RecycleBinRestoreJob } from '@Pimcore/modules/execution-engine/jobs/recycle-bin/recycle-bin-restore-job'
import { useTranslation } from 'react-i18next'
import { api, type RecycleBin, useRecycleBinFlushMutation } from '../recycle-bin-api-slice-enhanced'

interface UseRecycleBinHookReturn {
  restoreItems: (items: Array<Pick<RecycleBin, 'id' | 'type'>>, onFinish?: () => void) => Promise<void>
  removeItems: (items: Array<Pick<RecycleBin, 'id' | 'type'>>, onFinish?: () => void) => Promise<void>
  flush: (onFinish?: () => void) => Promise<void>
  refreshRecycleBin: () => void
}

export const useRecycleBin = (): UseRecycleBinHookReturn => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const [recycleBinFlushMutation] = useRecycleBinFlushMutation()
  const executionEngine = container.get<ExecutionEngine>(serviceIds.executionEngine)

  const restoreItems = async (items: Array<Pick<RecycleBin, 'id' | 'type'>>, onFinish?: () => void): Promise<void> => {
    try {
      const job = new RecycleBinRestoreJob({
        itemIds: items.map(item => item.id),
        elementTypes: items.map(item => mapToElementType(item.type)!),
        onFinish
      })

      await executionEngine.runJob(job)
    } catch (error) {
      trackError(new GeneralError('Failed to restore item(s) from recycle bin'))
      onFinish?.()
    }
  }

  const removeItems = async (items: Array<Pick<RecycleBin, 'id' | 'type'>>, onFinish?: () => void): Promise<void> => {
    try {
      const job = new RecycleBinDeleteJob({
        itemIds: items.map(item => item.id),
        onFinish
      })

      await executionEngine.runJob(job)
    } catch (error) {
      trackError(new GeneralError('Failed to remove item(s) from recycle bin'))
      onFinish?.()
    }
  }

  const flush = async (onFinish?: () => void): Promise<void> => {
    const flushTask = recycleBinFlushMutation()

    try {
      const response = await flushTask

      if (response.error !== undefined) {
        trackError(new ApiError(response.error))
      }

      onFinish?.()
    } catch (error) {
      trackError(new GeneralError('Failed to flush recycle bin'))
    }
  }

  const refreshRecycleBin = (): void => {
    dispatch(
      api.util.invalidateTags(
        invalidatingTags.RECYCLING_BIN()
      )
    )
  }

  return {
    restoreItems,
    removeItems,
    flush,
    refreshRecycleBin
  }
}
