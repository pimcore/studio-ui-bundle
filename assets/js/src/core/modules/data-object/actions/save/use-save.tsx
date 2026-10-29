/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useContext, useEffect, useId } from 'react'
import { DataObjectContext } from '@Pimcore/modules/data-object/data-object-provider'
import { useDataObjectDraft } from '@Pimcore/modules/data-object/hooks/use-data-object-draft'
import type { DataProperty } from '@Pimcore/modules/element/draft/hooks/use-properties'
import type {
  DataProperty as DataPropertyApi
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/properties/properties-api-slice.gen'
import { useDataObjectUpdateByIdMutation } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
import {
  useSaveContext
} from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/save-provider/use-save-context'
import { isEqual, isNil, isUndefined } from 'lodash'
import { type FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { type SerializedError } from '@reduxjs/toolkit'
import { useAppDispatch } from '@sdk/app'
import { setNodePublished } from '@Pimcore/components/element-tree/element-tree-slice'
import { setModificationDate } from '@Pimcore/modules/data-object/data-object-draft-slice'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import {
  type DataObjectSaveDataProcessorRegistry,
  DataObjectSaveDataContext,
  type DataObjectSaveUpdateData
} from '@Pimcore/modules/data-object/services/processors/data-object-save-data-processor-registry'
import { eventBus } from '@Pimcore/lib/event-bus'
import { eventTypes } from '@Pimcore/lib/event-bus/event-types'
import { type PostUpdateEvent } from '../../events/post-update-event'
import { awaitEditLockPersistAllowed } from '@Pimcore/modules/element/services/edit-lock-gate'

export enum SaveTaskType {
  Version = 'version',
  AutoSave = 'autoSave',
  Publish = 'publish',
  Save = 'save',
  Unpublish = 'unpublish'
}

/**
 * Runs once a save went through, with the editable data it actually sent - which is
 * not necessarily what was passed to save(): a queued task takes over the data of a
 * later auto save folded into it (see queueAutoSave).
 */
export type SaveFinishCallback = (savedEditableData: Record<string, any>) => void

export interface UseSaveHookReturn {
  save: (editableData: Record<string, any>, task?: SaveTaskType, onFinish?: SaveFinishCallback) => Promise<void>
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  error: FetchBaseQueryError | SerializedError | undefined
}

export const useSave = (useDraftData: boolean = true): UseSaveHookReturn => {
  const { id } = useContext(DataObjectContext)
  const { dataObject, properties, setDraftData } = useDataObjectDraft(id)
  const [saveDataObject, { isLoading, isSuccess, isError, error }] = useDataObjectUpdateByIdMutation()
  const { setRunningTask, runningTask, runningTaskRef, runningEditableDataRef, queuedTask, queuedTaskRef, setQueuedTask } = useSaveContext()
  const dispatch = useAppDispatch()
  const ownerId = useId()

  const executeQueuedTask = async (): Promise<void> => {
    // useSave is mounted in several places that share this context (the edit form for
    // auto saves, the toolbar for the user's tasks), and each has its own mutation
    // state. Only the instance that queued a task runs it, so the result reaches the
    // one waiting for it. Reading it through the ref, not the state, keeps it from
    // being sent twice when the effect runs again before the state caught up.
    const executeTask = queuedTaskRef?.current

    if (!isNil(executeTask) && executeTask.ownerId === ownerId) {
      setQueuedTask(undefined)
      await save(executeTask.editableData, executeTask.task, executeTask.onFinish)
    }
  }

  useEffect(() => {
    if (isNil(runningTask)) {
      executeQueuedTask().catch((error) => { console.error(error) })
    }
  }, [runningTask, queuedTask])

  const save = async (editableData: Record<string, any>, task?: SaveTaskType, onFinish?: SaveFinishCallback): Promise<void> => {
    if (dataObject?.changes === undefined) return

    // Hold autosaves until the edit-lock check resolves in the user's favour.
    if (task === SaveTaskType.AutoSave && !(await awaitEditLockPersistAllowed('data-object', id))) {
      return
    }

    if (!isNil(runningTaskRef?.current)) {
      if (task === SaveTaskType.AutoSave) {
        queueAutoSave(editableData)
        return
      }

      if (runningTaskRef?.current !== SaveTaskType.AutoSave) {
        return
      }

      setQueuedTask({
        task,
        editableData,
        ownerId,
        onFinish
      })
      return
    }

    setRunningTask(task)
    runningEditableDataRef.current = editableData

    const updatedData: DataObjectSaveUpdateData = {}
    if (dataObject.changes.properties) {
      const propertyUpdate = properties?.map((property: DataProperty): DataPropertyApi => {
        const { rowId, ...propertyApi } = property

        if (typeof propertyApi.data === 'object') {
          return {
            ...propertyApi,
            data: propertyApi?.data?.id ?? null
          }
        }

        return propertyApi
      })

      updatedData.properties = propertyUpdate?.filter((property) => !property.inherited)
    }

    if (Object.keys(editableData).length > 0) {
      updatedData.editableData = editableData
    }

    if (!isUndefined(task)) {
      updatedData.task = task
    }

    updatedData.useDraftData = useDraftData

    const saveDataProcessorRegistry = container.get<DataObjectSaveDataProcessorRegistry>(
      serviceIds['DataObject/ProcessorRegistry/SaveDataProcessor']
    )

    const context = new DataObjectSaveDataContext(id, task, updatedData)
    saveDataProcessorRegistry.executeProcessors(context)

    await saveDataObject({
      id,
      body: {
        data: {
          ...updatedData
        }
      }
    }).then((response) => {
      if (response.error === undefined) {
        if ('draftData' in response.data) {
          setDraftData(response.data?.draftData ?? null)
        }

        if ('modificationDate' in response.data) {
          dispatch(setModificationDate({ id, modificationDate: response.data?.modificationDate ?? null }))
        }

        if (task === SaveTaskType.Publish) {
          dispatch(setNodePublished({ nodeId: String(id), elementType: 'data-object', isPublished: true }))
        }

        const event: PostUpdateEvent = {
          identifier: {
            type: eventTypes['data-object:editor:post-update'],
            id: String(id)
          },
          payload: {
            id,
            task,
            updatedData,
            responseData: response.data
          }
        }

        eventBus.publish(event)

        onFinish?.(editableData)
      }
      runningEditableDataRef.current = undefined
      setRunningTask(undefined)
    })
  }

  /**
   * An auto save that collides with a running task must not get lost: some writes,
   * e.g. restoring a field's inheritance, leave no later form change behind to carry
   * them. Auto saves send the complete set of modified attributes, so the latest one
   * carries every earlier one.
   */
  const queueAutoSave = (editableData: Record<string, any>): void => {
    const queued = queuedTaskRef.current

    // A task the user is waiting on keeps its place and sends the latest data.
    if (!isNil(queued) && queued.task !== SaveTaskType.AutoSave) {
      setQueuedTask({ ...queued, editableData })
      return
    }

    // Nothing to follow up on when the running task of the user already sends this
    // data: a follow-up auto save would only turn the saved state into a draft again.
    const isCarriedByRunningTask = runningTaskRef.current !== SaveTaskType.AutoSave &&
      isEqual(editableData, runningEditableDataRef.current)

    if (!isCarriedByRunningTask) {
      setQueuedTask({
        task: SaveTaskType.AutoSave,
        editableData,
        ownerId
      })
    }
  }

  return {
    save,
    isLoading: isLoading || !isNil(queuedTask),
    isSuccess,
    isError,
    error
  }
}
