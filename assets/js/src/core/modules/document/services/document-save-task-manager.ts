/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/* eslint-disable max-lines */
import { store } from '@Pimcore/app/store'
import { api } from '@Pimcore/modules/document/document-api-slice.gen'
import { selectDocumentById, setDraftData, setModificationDate } from '@Pimcore/modules/document/document-draft-slice'
import { setNodePublished, setDocumentNodeStaticGeneratorEnabled } from '@Pimcore/components/element-tree/element-tree-slice'
import { getPimcoreStudioApi } from '@Pimcore/app/public-api/helpers/api-helper'
import type { DataProperty } from '@Pimcore/modules/element/draft/hooks/use-properties'
import type {
  DataProperty as DataPropertyApi
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/properties/properties-api-slice.gen'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'
import { isNil, isUndefined } from 'lodash'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type DebouncedFormRegistry } from '@Pimcore/components/form/services/debounced-form-registry'
import { createDocumentDebounceTag } from '@Pimcore/modules/document/utils/document-debounce-tag'
import {
  type DocumentSaveDataProcessorRegistry,
  DocumentSaveDataContext,
  type DocumentSaveUpdateData
} from './processors/document-save-data-processor-registry'
import { eventBus } from '@Pimcore/lib/event-bus'
import { eventTypes } from '@Pimcore/lib/event-bus/event-types'
import { type DocumentPostUpdateEvent } from '../events/post-update-event'

export enum SaveTaskType {
  Version = 'version',
  AutoSave = 'autoSave',
  Publish = 'publish',
  Save = 'save',
  Unpublish = 'unpublish'
}

export interface DocumentSaveData {
  editableData?: Record<string, any>
  task?: SaveTaskType
  useDraftData?: boolean
}

export interface DocumentSaveResult {
  success: boolean
  data?: any
  error?: any
}

interface QueuedTask {
  task?: SaveTaskType
  onFinish?: () => void
}

/**
 * Centralized document save task manager
 * Handles running task state, queuing, and prevents concurrent saves
 */
export class DocumentSaveTaskManager {
  private static readonly instances = new Map<number, DocumentSaveTaskManager>()

  private runningTask?: SaveTaskType
  private queuedTask?: QueuedTask
  private readonly taskCallbacks = new Set<(task?: SaveTaskType) => void>()
  private readonly errorCallbacks = new Set<(error: any, task?: SaveTaskType) => void>()

  private constructor (private readonly documentId: number) {}

  static getInstance (documentId: number): DocumentSaveTaskManager {
    if (!this.instances.has(documentId)) {
      this.instances.set(documentId, new DocumentSaveTaskManager(documentId))
    }
    return this.instances.get(documentId)!
  }

  static cleanup (documentId: number): void {
    this.instances.delete(documentId)
  }

  onRunningTaskChange (callback: (task?: SaveTaskType) => void): () => void {
    this.taskCallbacks.add(callback)
    return () => this.taskCallbacks.delete(callback)
  }

  onErrorChange (callback: (error: any, task?: SaveTaskType) => void): () => void {
    this.errorCallbacks.add(callback)
    return () => this.errorCallbacks.delete(callback)
  }

  getRunningTask (): SaveTaskType | undefined {
    return this.runningTask
  }

  /**
   * Execute a save task with proper queuing and concurrency control
   */
  async executeSave (
    task?: SaveTaskType,
    onFinish?: () => void,
    useDraftData: boolean = true
  ): Promise<void> {
    // Skip auto-save if user doesn't have save permission
    if (task === SaveTaskType.AutoSave) {
      const state = store.getState()
      const document = selectDocumentById(state, this.documentId)

      if (!checkElementPermission(document?.permissions, 'save')) {
        return
      }
    }

    // Handle task queuing logic
    if (this.runningTask != null) {
      if (task === SaveTaskType.AutoSave) {
        // Don't queue auto-saves if something is already running - they're frequent and can be skipped
        return
      }

      if (this.runningTask !== SaveTaskType.AutoSave) {
        // Don't interrupt non-auto-save tasks - ignore rapid duplicate clicks
        return
      }

      // Queue the regular save task if auto-save is running
      // Important case: auto-save running, user wants to save manually
      this.queuedTask = { task, onFinish }
      return
    }

    await this.performSave(task, onFinish, useDraftData)
  }

  private async performSave (
    task?: SaveTaskType,
    onFinish?: () => void,
    useDraftData: boolean = true
  ): Promise<void> {
    // Flush any pending debounced form changes for this specific document before saving
    const debouncedFormRegistry = container.get<DebouncedFormRegistry>(serviceIds.debouncedFormRegistry)
    debouncedFormRegistry.flushByTag(createDocumentDebounceTag(this.documentId))

    this.setRunningTask(task)

    try {
      const result = await this.saveDocument(task, useDraftData)

      if (result.success) {
        store.dispatch(setDraftData({
          id: this.documentId,
          draftData: result.data?.draftData ?? null
        }))

        if (!isUndefined(result.data?.modificationDate)) {
          store.dispatch(setModificationDate({
            id: this.documentId,
            modificationDate: result.data?.modificationDate ?? null
          }))
        }

        if (task === SaveTaskType.Publish) {
          store.dispatch(setNodePublished({
            nodeId: String(this.documentId),
            elementType: 'document',
            isPublished: true
          }))
        }

        const settingsData = result.data?.settingsData as Record<string, unknown> | undefined

        if (!isUndefined(settingsData?.staticGeneratorEnabled)) {
          store.dispatch(setDocumentNodeStaticGeneratorEnabled({
            nodeId: String(this.documentId),
            staticGeneratorEnabled: Boolean(settingsData.staticGeneratorEnabled)
          }))
        }

        const event: DocumentPostUpdateEvent = {
          identifier: {
            type: eventTypes['document:editor:post-update'],
            id: String(this.documentId)
          },
          payload: {
            id: this.documentId,
            task,
            updatedData: result.data,
            responseData: result.data
          }
        }

        eventBus.publish(event)

        onFinish?.()
      } else {
        throw result.error
      }
    } catch (error) {
      console.error(`Save failed for document ${this.documentId}:`, error)

      // Notify error callbacks immediately
      this.errorCallbacks.forEach(callback => { callback(error, task) })

      throw error
    } finally {
      this.setRunningTask(undefined)
      await this.executeQueuedTask()
    }
  }

  private async executeQueuedTask (): Promise<void> {
    if (!isUndefined(this.queuedTask)) {
      const { task, onFinish } = this.queuedTask
      this.queuedTask = undefined
      await this.performSave(task, onFinish)
    }
  }

  private setRunningTask (task: SaveTaskType | undefined): void {
    this.runningTask = task
    this.taskCallbacks.forEach(callback => { callback(task) })
  }

  /**
   * Gets editable data from the iframe API for this document
   * Only includes non-inherited values for saving
   */
  private getEditableData (): Record<string, any> {
    try {
      const { document: documentApi } = getPimcoreStudioApi()

      if (!documentApi.isIframeAvailable(this.documentId)) {
        return {}
      }

      const iframeApi = documentApi.getIframeApi(this.documentId)
      const allValues = iframeApi.documentEditable.getValues(true)

      return Object.fromEntries(
        Object.entries(allValues).filter(([key]) => !iframeApi.documentEditable.getInheritanceState(key))
      )
    } catch (error) {
      console.warn(`Could not get editable data for document ${this.documentId}:`, error)
      return {}
    }
  }

  private buildUpdateData (
    task: SaveTaskType = SaveTaskType.AutoSave,
    useDraftData: boolean = true
  ): DocumentSaveUpdateData {
    const state = store.getState()
    const document = selectDocumentById(state, this.documentId)

    if (isNil(document)) {
      throw new Error(`Document ${this.documentId} not found in state`)
    }

    const updatedData: DocumentSaveUpdateData = {}

    // Handle properties if they exist and have changes
    if (document.changes?.properties) {
      const propertyUpdate = document.properties?.map((property: DataProperty): DataPropertyApi => {
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

    if (!isNil(document.changes?.settingsData) && !isNil(document.settingsData)) {
      updatedData.settingsData = document.settingsData
    }

    const editableData = this.getEditableData()
    if (Object.keys(editableData).length > 0) {
      updatedData.editableData = editableData
    }

    updatedData.task = task
    updatedData.useDraftData = useDraftData

    const saveDataProcessorRegistry = container.get<DocumentSaveDataProcessorRegistry>(
      serviceIds['Document/ProcessorRegistry/SaveDataProcessor']
    )

    const context = new DocumentSaveDataContext(this.documentId, task, updatedData)
    saveDataProcessorRegistry.executeProcessors(context)

    return context.updateData
  }

  /**
   * Performs the actual document save operation using RTK Query
   */
  private async saveDocument (
    task: SaveTaskType = SaveTaskType.AutoSave,
    useDraftData: boolean = true
  ): Promise<DocumentSaveResult> {
    const updatedData = this.buildUpdateData(task, useDraftData)

    const result = await store.dispatch(
      api.endpoints.documentUpdateById.initiate({
        id: this.documentId,
        body: {
          data: updatedData
        }
      })
    )

    if (!isNil(result.error)) {
      console.error(`Failed to save document ${this.documentId}:`, result.error)
      return {
        success: false,
        error: result.error
      }
    }

    return {
      success: true,
      data: result.data
    }
  }
}
