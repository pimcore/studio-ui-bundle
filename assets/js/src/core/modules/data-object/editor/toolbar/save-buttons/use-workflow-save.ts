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
import { isNil } from 'lodash'
import { SaveTaskType } from '@Pimcore/modules/data-object/actions/save/use-save'
import {
  checkElementPermission,
  type ElementPermissions
} from '@Pimcore/modules/element/permissions/permission-helper'
import {
  useSaveContext
} from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/save-provider/use-save-context'
import {
  useRegisterUnsavedChangesSaver
} from '@Pimcore/modules/element/editor/shared-components/workflow/provider/unsaved-changes-saver-context'

export interface UseWorkflowSaveProps {
  /**
   * The task the save buttons would use, or undefined when the user cannot save the changes into
   * the object right now (no permission, another save of theirs still running).
   */
  getTask: () => SaveTaskType.Publish | SaveTaskType.Save | undefined
  /**
   * Starts the save buttons' own save (data + properties + schedules). `onDataSaved` follows the data
   * save; the returned promise resolves with the outcome of the schedules save.
   */
  startSave: (task: SaveTaskType, onDataSaved: () => void) => Promise<boolean>
}

/**
 * The task of the primary save button for a workflow save, or undefined when the user cannot save the
 * changes into the object right now (no changes, no publish permission, another save of theirs running).
 */
export const getWorkflowSaveTask = (
  dataObject: { changes?: unknown, published?: boolean, permissions?: ElementPermissions } | undefined,
  runningTask: SaveTaskType | undefined
): SaveTaskType.Publish | SaveTaskType.Save | undefined => {
  if (dataObject?.changes === undefined) {
    return undefined
  }

  if (!isNil(runningTask) && runningTask !== SaveTaskType.AutoSave) {
    return undefined
  }

  if (dataObject.published !== true) {
    return SaveTaskType.Save
  }

  return checkElementPermission(dataObject.permissions, 'publish') ? SaveTaskType.Publish : undefined
}

interface PendingSave {
  resolve: (saved: boolean) => void
  dataSaved: boolean
  /** undefined while the schedules are still being saved. */
  schedulesSaved?: boolean
  /** The save was seen running or queued; once the editor is idle again without dataSaved, it failed. */
  started: boolean
}

/**
 * Offers the data-object save buttons' save flow to the editor's workflow coordinator, so a
 * transition with `unsavedChangesBehaviour: save` saves exactly like the user's own save: queued
 * behind a running autosave, with properties, save processors and schedules. The returned promise
 * settles only once that save has completed — true when both the data and the schedules were saved,
 * false as soon as either failed.
 *
 * Only the outcome of this save counts, never the save buttons' mutation flags: those can still
 * hold the result of an earlier save, and a save queued behind an autosave is sent by another
 * useSave instance whose flags never reach the buttons.
 */
export const useWorkflowSave = ({ getTask, startSave }: UseWorkflowSaveProps): void => {
  const { runningTask, queuedTask } = useSaveContext()
  const pendingRef = useRef<PendingSave | null>(null)
  const [outcomeTick, setOutcomeTick] = useState(0)

  const settle = (saved: boolean): void => {
    const pending = pendingRef.current
    if (pending === null) {
      return
    }

    pendingRef.current = null
    pending.resolve(saved)
  }

  useEffect(() => {
    const pending = pendingRef.current
    if (pending === null) {
      return
    }

    if (pending.schedulesSaved === false) {
      settle(false)
    } else if (pending.dataSaved && pending.schedulesSaved === true) {
      settle(true)
    }
  }, [outcomeTick])

  // The data save reports only success (onDataSaved). Its failure shows in the shared save state:
  // once the pending save has been seen running (or waiting) and the editor is idle again without
  // the data reported as saved, it failed — whichever useSave instance sent it.
  useEffect(() => {
    const pending = pendingRef.current
    if (pending === null) {
      return
    }

    const isActive = !isNil(runningTask) || !isNil(queuedTask)
    if (isActive) {
      pending.started = true
    } else if (pending.started && !pending.dataSaved) {
      settle(false)
    }
  }, [runningTask, queuedTask])

  const startPendingSave = (task: SaveTaskType, resolve: (saved: boolean) => void): void => {
    const pending: PendingSave = { resolve, dataSaved: false, started: false }
    pendingRef.current = pending

    const report = (update: Partial<PendingSave>): void => {
      // a late report of a save that has already settled must not touch a newer one
      if (pendingRef.current !== pending) {
        return
      }

      Object.assign(pending, update)
      setOutcomeTick((tick) => tick + 1)
    }

    startSave(task, () => { report({ dataSaved: true }) })
      .then((schedulesSaved) => { report({ schedulesSaved }) })
      .catch((error) => {
        console.error(error)
        report({ schedulesSaved: false })
      })
  }

  useRegisterUnsavedChangesSaver(async () => {
    const task = getTask()
    if (task === undefined || pendingRef.current !== null) {
      return false
    }

    return await new Promise<boolean>((resolve) => { startPendingSave(task, resolve) })
  })
}
