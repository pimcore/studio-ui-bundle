/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useEffect, useRef, useState } from 'react'
import { type SaveTaskType } from '@Pimcore/modules/data-object/actions/save/use-save'
import {
  useRegisterUnsavedChangesSaver
} from '@Pimcore/modules/element/editor/shared-components/workflow/provider/unsaved-changes-saver-context'

export interface UseWorkflowSaveProps {
  /**
   * The task the save buttons would use, or undefined when the user cannot save the changes into
   * the object right now (no permission, another save of theirs still running).
   */
  getTask: () => SaveTaskType.Publish | SaveTaskType.Save | undefined
  /** Starts the save buttons' own save (data + properties + schedules); `onSaved` follows the data save. */
  startSave: (task: SaveTaskType, onSaved: () => void) => void
  isError: boolean
  isSchedulesError: boolean
  isSchedulesSuccess: boolean
}

interface PendingSave {
  resolve: (saved: boolean) => void
  dataSaved: boolean
}

/**
 * Offers the data-object save buttons' save flow to the workflow (UnsavedChangesSaverContext), so a
 * transition with `unsavedChangesBehaviour: save` saves exactly like the user's own save: queued
 * behind a running autosave, with properties, save processors and schedules. The returned promise
 * settles only once that save has completed — true when both the data and the schedules were saved,
 * false as soon as either failed.
 */
export const useWorkflowSave = ({ getTask, startSave, isError, isSchedulesError, isSchedulesSuccess }: UseWorkflowSaveProps): void => {
  const pendingRef = useRef<PendingSave | null>(null)
  const [dataSavedTick, setDataSavedTick] = useState(0)

  const settle = (saved: boolean): void => {
    const pending = pendingRef.current
    if (pending === null) {
      return
    }

    pendingRef.current = null
    pending.resolve(saved)
  }

  useEffect(() => {
    if (pendingRef.current === null) {
      return
    }

    if (isError || isSchedulesError) {
      settle(false)
    } else if (pendingRef.current.dataSaved && isSchedulesSuccess) {
      settle(true)
    }
  }, [isError, isSchedulesError, isSchedulesSuccess, dataSavedTick])

  useRegisterUnsavedChangesSaver(async () => {
    const task = getTask()
    if (task === undefined || pendingRef.current !== null) {
      return false
    }

    return await new Promise<boolean>((resolve) => {
      const pending: PendingSave = { resolve, dataSaved: false }
      pendingRef.current = pending

      startSave(task, () => {
        pending.dataSaved = true
        setDataSavedTick((tick) => tick + 1)
      })
    })
  })
}
