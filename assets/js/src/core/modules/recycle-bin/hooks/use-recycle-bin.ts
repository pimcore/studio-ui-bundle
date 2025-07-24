import { invalidatingTags } from "@Pimcore/app/api/pimcore/tags"
import { useAppDispatch } from "@Pimcore/app/store"
import ApiError from "@Pimcore/modules/app/error-handler/classes/api-error"
import GeneralError from "@Pimcore/modules/app/error-handler/classes/general-error"
import trackError from "@Pimcore/modules/app/error-handler/error-handler"
import { api, RecycleBin, useRecycleBinDeleteItemsMutation, useRecycleBinFlushMutation } from "../recycle-bin-api-slice-enhanced"
import { useRecycleBinRestoreItemsMutation } from "../recycle-bin-api-slice.gen"

interface UseRecycleBinHookReturn {
  restoreItems: (ids: Array<RecycleBin['id']>, onFinish?: () => void) => Promise<void>
  removeItems: (ids: Array<RecycleBin['id']>, onFinish?: () => void) => Promise<void>
  flush: (onFinish?: () => void) => Promise<void>
  refreshRecycleBin: () => void
}

export const useRecycleBin = (): UseRecycleBinHookReturn => {
  const dispatch = useAppDispatch()
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