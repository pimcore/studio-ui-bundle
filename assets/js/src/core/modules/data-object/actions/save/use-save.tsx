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
import { isNil, isUndefined } from 'lodash'
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

export interface UseSaveHookReturn {
  save: (editableData: Record<string, any>, task?: SaveTaskType, onFinish?: () => void) => Promise<void>
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  error: FetchBaseQueryError | SerializedError | undefined
}

export const useSave = (useDraftData: boolean = true): UseSaveHookReturn => {
  const { id } = useContext(DataObjectContext)
  const { dataObject, properties, setDraftData } = useDataObjectDraft(id)
  const [saveDataObject, { isLoading, isSuccess, isError, error }] = useDataObjectUpdateByIdMutation()
  const { setRunningTask, runningTask, runningTaskRef, queuedTask, queuedTaskRef, setQueuedTask } = useSaveContext()
  const dispatch = useAppDispatch()

  const executeQueuedTask = async (): Promise<void> => {
    // Read and claim the task through the ref, not the state: useSave is mounted in
    // several places that share this context, so the state value can still be the
    // queued task in another instance running the same effect in this tick, and the
    // task would be sent twice. Clearing it through setQueuedTask updates the ref
    // synchronously, so only the first instance gets it.
    const executeTask = queuedTaskRef?.current

    if (!isNil(executeTask)) {
      setQueuedTask(undefined)
      await save(executeTask.editableData, executeTask.task)
    }
  }

  useEffect(() => {
    if (isNil(runningTask)) {
      executeQueuedTask().catch((error) => { console.error(error) })
    }
  }, [runningTask, queuedTask])

  const save = async (editableData: Record<string, any>, task?: SaveTaskType, onFinish?: () => void): Promise<void> => {
    if (dataObject?.changes === undefined) return

    // Hold autosaves until the edit-lock check resolves in the user's favour.
    if (task === SaveTaskType.AutoSave && !(await awaitEditLockPersistAllowed('data-object', id))) {
      return
    }

    if (!isNil(runningTaskRef?.current)) {
      if (task === SaveTaskType.AutoSave) {
        const queuesBehindAutoSave = runningTaskRef?.current === SaveTaskType.AutoSave &&
          (isNil(queuedTaskRef?.current) || queuedTaskRef.current.task === SaveTaskType.AutoSave)

        if (queuesBehindAutoSave) {
          setQueuedTask({
            task,
            editableData
          })
        }

        return
      }

      if (runningTaskRef?.current !== SaveTaskType.AutoSave) {
        return
      }

      setQueuedTask({
        task,
        editableData
      })
      return
    }

    setRunningTask(task)

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

        onFinish?.()
      }
      setRunningTask(undefined)
    })
  }

  return {
    save,
    isLoading: isLoading || !isNil(queuedTask),
    isSuccess,
    isError,
    error
  }
}
