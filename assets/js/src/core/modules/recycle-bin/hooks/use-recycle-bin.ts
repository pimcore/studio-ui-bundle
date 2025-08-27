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
import { refreshTreeByElementType } from '@Pimcore/components/element-tree/element-tree-slice'
import ApiError from '@Pimcore/modules/app/error-handler/classes/api-error'
import GeneralError from '@Pimcore/modules/app/error-handler/classes/general-error'
import trackError from '@Pimcore/modules/app/error-handler/error-handler'
import { mapToElementType } from '@Pimcore/modules/element/utils/element-type'
import { useJobs } from '@Pimcore/modules/execution-engine/hooks/useJobs'
import { createJob as createRestoreJob } from '@Pimcore/modules/execution-engine/jobs/recycle-bin/restore/factory'
import { defaultTopics, topics } from '@Pimcore/modules/execution-engine/topics'
import { isNil } from 'lodash'
import { useTranslation } from 'react-i18next'
import { api, type RecycleBin, useRecycleBinDeleteItemsMutation, useRecycleBinFlushMutation } from '../recycle-bin-api-slice-enhanced'
import { useRecycleBinRestoreItemsMutation } from '../recycle-bin-api-slice.gen'

interface UseRecycleBinHookReturn {
  restoreItems: (items: RecycleBin[], onFinish?: () => void) => Promise<void>
  removeItems: (items: RecycleBin[], onFinish?: () => void) => Promise<void>
  flush: (onFinish?: () => void) => Promise<void>
  refreshRecycleBin: () => void
}

export const useRecycleBin = (): UseRecycleBinHookReturn => {
  const dispatch = useAppDispatch()
  const { addJob } = useJobs()
  const { t } = useTranslation()
  const [recycleBinRestoreMutation] = useRecycleBinRestoreItemsMutation()
  const [recycleBindDelteMutation] = useRecycleBinDeleteItemsMutation()
  const [recycleBinFlushMutation] = useRecycleBinFlushMutation()

  const restoreItems = async (items: RecycleBin[], onFinish?: () => void): Promise<void> => {
    const restoreTask = recycleBinRestoreMutation({
      body: {
        items: items.map(item => item.id)
      }
    })

    try {
      const response = await restoreTask

      if (response.error !== undefined) {
        trackError(new ApiError(response.error))
        return
      }

      let jobRunId: any = null
      if (!isNil(response.data)) {
        const data = response.data
        jobRunId = data.jobRunId ?? null
      }

      if (jobRunId !== null) {
        addJob(createRestoreJob({
          title: t('recycle-bin.actions.restore.title'),
          topics: [topics['recycle-bin-restore-finished'], ...defaultTopics],
          action: async () => {
            return jobRunId
          },
          elementTypes: items.map(item => mapToElementType(item.type)!)
        }))
      }

      if (jobRunId === null) {
        dispatch(refreshTreeByElementType({
          elementTypes: [mapToElementType(items[0].type)!]
        }))
        refreshRecycleBin()
      }

      onFinish?.()
    } catch (error) {
      trackError(new GeneralError('Failed to restore item(s) from recycle bin'))
    }
  }

  const removeItems = async (items: RecycleBin[], onFinish?: () => void): Promise<void> => {
    const deleteTask = recycleBindDelteMutation({
      body: {
        items: items.map(item => item.id)
      }
    })

    try {
      const response = await deleteTask

      if (response.error !== undefined) {
        trackError(new ApiError(response.error))
        return
      }

      let jobRunId: any = null
      if (!isNil(response.data)) {
        const data = response.data
        jobRunId = data.jobRunId ?? null
      }

      if (jobRunId !== null) {
        addJob(createRestoreJob({
          title: t('recycle-bin.actions.delete.title'),
          topics: [topics['recycle-bin-delete-finished'], ...defaultTopics],
          action: async () => {
            return jobRunId
          },
          elementTypes: items.map(item => mapToElementType(item.type)!)
        }))
      }

      if (jobRunId === null) {
        dispatch(refreshTreeByElementType({
          elementTypes: [mapToElementType(items[0].type)!]
        }))
        refreshRecycleBin()
      }

      onFinish?.()
    } catch (error) {
      trackError(new GeneralError('Failed to remove item(s) from recycle bin'))
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
