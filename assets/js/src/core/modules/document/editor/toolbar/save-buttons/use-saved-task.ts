/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useEffect } from 'react'
import { isNil } from 'lodash'
import { DocumentSaveTaskManager } from '@Pimcore/modules/document/services'
import { SaveTaskType } from '@Pimcore/modules/document/actions/save/use-save'
import { useTemporaryValue } from '@Pimcore/utils/hooks/use-temporary-value'
import { confirmWhenSchedulesSaved } from '@Pimcore/modules/element/editor/save-confirmation'

/**
 * The manual save task of a document that has just been saved, for a short confirmation.
 *
 * A task counts as saved when it ends without an error. Tasks queued behind an auto save only start
 * once that one has finished, and ignored duplicate clicks never start, so neither is confirmed early.
 * The confirmation also waits for the schedules saved by the same action (see schedulesSavedRef).
 */
export const useSavedTask = (documentId: number, schedulesSavedRef?: { current: Promise<boolean> | undefined }): SaveTaskType | null => {
  const [savedTask, showSavedTask] = useTemporaryValue<SaveTaskType>()

  useEffect(() => {
    const taskManager = DocumentSaveTaskManager.getInstance(documentId)
    let runningTask: SaveTaskType | undefined
    let hasFailed = false

    const unsubscribeError = taskManager.onErrorChange((_error, task) => {
      if (task === runningTask) {
        hasFailed = true
      }
    })

    const unsubscribeTask = taskManager.onRunningTaskChange((task) => {
      if (!isNil(runningTask) && runningTask !== SaveTaskType.AutoSave && !hasFailed) {
        const savedTask = runningTask
        void confirmWhenSchedulesSaved(schedulesSavedRef?.current, () => { showSavedTask(savedTask) })
      }

      runningTask = task
      hasFailed = false
    })

    return () => {
      unsubscribeError()
      unsubscribeTask()
    }
  }, [documentId])

  return savedTask
}

/**
 * Whether the task manager runs a save requested now: it is ignored while another manual save is
 * running, and queued while an auto save is running.
 */
export const isSaveAccepted = (documentId: number): boolean => {
  const runningTask = DocumentSaveTaskManager.getInstance(documentId).getRunningTask()

  return isNil(runningTask) || runningTask === SaveTaskType.AutoSave
}
