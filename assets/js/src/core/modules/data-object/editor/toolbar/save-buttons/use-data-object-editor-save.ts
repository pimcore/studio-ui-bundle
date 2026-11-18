/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useContext, useEffect } from 'react'
import { isNil } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useMessage } from '@Pimcore/components/message/useMessage'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { type SaveTaskType, useSave } from '@Pimcore/modules/data-object/actions/save/use-save'
import { DataObjectContext } from '@Pimcore/modules/data-object/data-object-provider'
import { useDataObjectDraft } from '@Pimcore/modules/data-object/hooks/use-data-object-draft'
import { useEditFormContext } from '../../types/object/tab-manager/tabs/edit/providers/edit-form-provider/edit-form-provider'
import { useSaveContext } from '../../types/object/tab-manager/tabs/edit/providers/save-provider/use-save-context'
import { useSaveSchedules } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/schedule/hooks/use-save-schedules'
import { useTemporaryValue } from '@Pimcore/utils/hooks/use-temporary-value'
import { confirmWhenSchedulesSaved } from '@Pimcore/modules/element/editor/save-confirmation'
import { getWorkflowSaveTask, useWorkflowSave } from './use-workflow-save'

export interface UseDataObjectEditorSaveReturn {
  save: (task: SaveTaskType, onFinish?: () => void) => Promise<void>
  isLoading: boolean
  isAutoSaveLoading: boolean
  runningTask?: SaveTaskType
  savedTask: SaveTaskType | null
}

/**
 * Saves the open editor's modified fields, properties and schedules through the native save pipeline.
 * Use inside the data object editor's existing providers when replacing its toolbar through the SDK.
 */
export const useDataObjectEditorSave = (): UseDataObjectEditorSaveReturn => {
  const { t } = useTranslation()
  const { id } = useContext(DataObjectContext)
  const { dataObject, removeTrackedChanges } = useDataObjectDraft(id)
  const { save: saveDataObject, isLoading, isSuccess, isError, error } = useSave()
  const { isAutoSaveLoading, runningTask, runningTaskRef } = useSaveContext()
  const {
    saveSchedules,
    isLoading: isSchedulesLoading,
    isSuccess: isSchedulesSuccess,
    isError: isSchedulesError,
    error: schedulesError
  } = useSaveSchedules('data-object', id, false)
  const { getModifiedDataObjectAttributes, resetModifiedDataObjectAttributes } = useEditFormContext()
  const messageApi = useMessage()
  // the button of the save that just succeeded briefly confirms it with a check mark
  const [savedTask, showSavedTask] = useTemporaryValue<SaveTaskType>()

  useEffect(() => {
    const handleSuccessEvent = async (): Promise<void> => {
      if (isSuccess && isSchedulesSuccess) {
        removeTrackedChanges()
        await messageApi.success(t('save-success'))
      }
    }

    handleSuccessEvent().catch((error) => {
      console.error(error)
    })
  }, [isSuccess, isSchedulesSuccess])

  useEffect(() => {
    if (isError && !isNil(error)) {
      trackError(new ApiError(error))
    } else if (isSchedulesError && !isNil(schedulesError)) {
      trackError(new ApiError(schedulesError))
    }
  }, [isError, isSchedulesError, error, schedulesError])

  // Saves the data and the schedules; resolves with the outcome of the schedules save (the data
  // save reports its success through onFinish).
  const saveDataAndSchedules = async (task: SaveTaskType, onFinish?: () => void): Promise<boolean> => {
    if (dataObject?.changes === undefined) return false
    // The reset compares against the data the save actually sent, not the data read
    // here: the save may run much later (queued behind another one), take over the data
    // of an auto save folded into it meanwhile, and the user can keep editing after that.
    // filled right below; read once the object is saved
    const action: { schedulesSaved?: Promise<boolean> } = {}
    const objectSaved = saveDataObject(getModifiedDataObjectAttributes(), task, (savedEditableData) => {
      resetModifiedDataObjectAttributes(savedEditableData)
      // only called once this very save has succeeded, also when it was queued; the confirmation
      // also waits for the schedules saved by the same action
      void confirmWhenSchedulesSaved(action.schedulesSaved, () => { showSavedTask(task) })
      onFinish?.()
    })
    action.schedulesSaved = saveSchedules()

    return await Promise.all([objectSaved, action.schedulesSaved]).then(([, schedulesSaved]) => schedulesSaved).catch((error) => {
      console.error(error)
      return false
    })
  }

  const save = async (task: SaveTaskType, onFinish?: () => void): Promise<void> => {
    await saveDataAndSchedules(task, onFinish)
  }

  // A transition with unsavedChangesBehaviour "save" saves through this same flow, using the
  // task of the primary button. A user's own save that is still running is not queued behind.
  useWorkflowSave({
    getTask: () => getWorkflowSaveTask(dataObject, runningTaskRef?.current),
    startSave: saveDataAndSchedules
  })

  return { save, isLoading: isLoading || isSchedulesLoading, isAutoSaveLoading, runningTask, savedTask }
}
