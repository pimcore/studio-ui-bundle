import { invalidatingTags } from "@Pimcore/app/api/pimcore/tags"
import { useAppDispatch } from "@Pimcore/app/store"
import ApiError from "@Pimcore/modules/app/error-handler/classes/api-error"
import GeneralError from "@Pimcore/modules/app/error-handler/classes/general-error"
import trackError from "@Pimcore/modules/app/error-handler/error-handler"
import { useJobs } from "@Pimcore/modules/execution-engine/hooks/useJobs"
import { createJob as createRestoreJob } from "@Pimcore/modules/execution-engine/jobs/recycle-bin/restore/factory"
import { defaultTopics, topics } from "@Pimcore/modules/execution-engine/topics"
import { useTranslation } from "react-i18next"
import { api, RecycleBin, useRecycleBinDeleteItemsMutation, useRecycleBinFlushMutation } from "../recycle-bin-api-slice-enhanced"
import { RecycleBinRestoreItemsApiResponse, useRecycleBinRestoreItemsMutation } from "../recycle-bin-api-slice.gen"

interface UseRecycleBinHookReturn {
  restoreItems: (ids: Array<RecycleBin['id']>, onFinish?: () => void) => Promise<void>
  removeItems: (ids: Array<RecycleBin['id']>, onFinish?: () => void) => Promise<void>
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

  const restoreItems = async (ids: Array<RecycleBin['id']>, onFinish?: () => void): Promise<void> => {
    const restoreTask = recycleBinRestoreMutation({
      body: {
        items: ids
      }
    })

    try {
      const response = await restoreTask

      if (response.error !== undefined) {
        trackError(new ApiError(response.error))
      }

      let jobRunId: any = null
      if ((response.data ?? false) !== false) {
        const data = response.data as RecycleBinRestoreItemsApiResponse
        jobRunId = data.jobRunId ?? null
      }

      if (jobRunId !== null) {
        addJob(createRestoreJob({
          title: t('recycle-bin.actions.restore.title'),
          topics: [topics['recycle-bin-restore-finished'], ...defaultTopics],
          action: async () => {
            return jobRunId
          },
          elementIds: ids
        }))
      }

      onFinish?.()
    } catch (error) {
      trackError(new GeneralError('Failed to restore item(s) from recycle bin'))
    }
  }

  const removeItems = async (ids: Array<RecycleBin['id']>, onFinish?: () => void): Promise<void> => {
    const deleteTask = recycleBindDelteMutation({
      body: {
        items: ids
      }
    })

    try {
      const response = await deleteTask

      if (response.error !== undefined) {
        trackError(new ApiError(response.error))
      }

      let jobRunId: any = null
      if ((response.data ?? false) !== false) {
        const data = response.data as RecycleBinRestoreItemsApiResponse
        jobRunId = data.jobRunId ?? null
      }

      if (jobRunId !== null) {
        addJob(createRestoreJob({
          title: t('recycle-bin.actions.delete.title'),
          topics: [topics['recycle-bin-delete-finished'], ...defaultTopics],
          action: async () => {
            return jobRunId
          },
          elementIds: ids
        }))
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