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
import type { DataObjectUpdateByIdApiArg } from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import type { DataProperty } from '@Pimcore/modules/element/draft/hooks/use-properties'
import type {
  DataProperty as DataPropertyApi
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/properties/properties-api-slice.gen'
import {
  useSaveContext
} from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/save-provider/use-save-context'
import { isNil, isUndefined } from 'lodash'
import { type FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { type SerializedError } from '@reduxjs/toolkit'
import { useAppDispatch } from '@sdk/app'
import { setNodePublished } from '@Pimcore/components/element-tree/element-tree-slice'
import { DocumentContext } from '../../document-provider'
import { useDocumentDraft } from '../../hooks/use-document-draft'
import { useDocumentUpdateByIdMutation } from '../../document-api-slice.gen'

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
  const { id } = useContext(DocumentContext)
  const { document, properties, setDraftData } = useDocumentDraft(id)
  const [saveDataObject, { isLoading, isSuccess, isError, error }] = useDocumentUpdateByIdMutation()
  const { setRunningTask, runningTask, runningTaskRef, queuedTask, setQueuedTask } = useSaveContext()
  const dispatch = useAppDispatch()

  const executeQueuedTask = async (): Promise<void> => {
    if (!isNil(queuedTask)) {
      const executeTask = { ...queuedTask }
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
    if (document?.changes === undefined) return

    if (!isNil(runningTaskRef?.current)) {
      if (task === SaveTaskType.AutoSave) {
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

    const updatedData: DataObjectUpdateByIdApiArg['body']['data'] = {}
    if (document.changes.properties) {
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

    await saveDataObject({
      id,
      body: {
        data: {
          ...updatedData
        }
      }
    }).then((response) => {
      if (response.error === undefined) {
        setDraftData(response.data?.draftData ?? null)
        if (task === SaveTaskType.Publish) {
          dispatch(setNodePublished({ nodeId: String(id), elementType: 'document', isPublished: true }))
        }
        onFinish?.()
      }
      setRunningTask(undefined)
    })
  }

  return {
    save,
    isLoading: Boolean(isLoading) || !isNil(queuedTask),
    isSuccess,
    isError,
    error
  }
}
