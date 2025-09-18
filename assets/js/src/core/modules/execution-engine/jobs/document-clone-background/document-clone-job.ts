/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNil } from 'lodash'
import { store } from '@Pimcore/app/store'
import { setNodeFetching, refreshNodeChildren } from '@Pimcore/components/element-tree/element-tree-slice'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { type GlobalMessageBus } from '@Pimcore/modules/global-message-bus/services/global-message-bus'
import { StepBasedProgressJobHandler } from '../../message-handlers/step-based-progress-job-handler'
import { api, type DocumentCloneApiArg, type DocumentCloneParameters } from '@Pimcore/modules/document/document-api-slice.gen'
import { topics } from '../../topics'
import { elementTypes } from '@Pimcore/types/enums/element/element-type'
import { type JobInterface, type JobRunOptions } from '../job-interface'
import { type DocumentCloneJobConfig } from './types'

export interface DocumentCloneJobOptions {
  sourceId: number
  targetId: number
  parameters: DocumentCloneParameters
  title: string
  /** Tree ID for UI state management */
  treeId?: string
  /** Node ID for UI state management */
  nodeId?: string
}

/**
 * Job for cloning documents in the background
 * Handles the complete workflow including API calls, progress tracking, and UI updates
 */
export class DocumentCloneJob implements JobInterface {
  private readonly sourceId: number
  private readonly targetId: number
  private readonly parameters: DocumentCloneParameters
  private readonly title: string
  private readonly treeId?: string
  private readonly nodeId?: string

  constructor (options: DocumentCloneJobOptions) {
    this.sourceId = options.sourceId
    this.targetId = options.targetId
    this.parameters = options.parameters
    this.title = options.title
    this.treeId = options.treeId
    this.nodeId = options.nodeId
  }

  async run (options: JobRunOptions): Promise<void> {
    const { messageBus } = options
    
    // Set loading state if node management is enabled
    if (this.treeId && this.nodeId) {
      store.dispatch(setNodeFetching({ treeId: this.treeId, nodeId: this.nodeId, isFetching: true }))
    }

    try {
      // Execute the API call
      const jobRunId = await this.executeCloneRequest()

      // If no jobRunId, operation completed immediately
      if (isNil(jobRunId)) {
        await this.handleImmediateCompletion()
        return
      }

      // Register job handler for background processing
      const handler = new StepBasedProgressJobHandler({
        jobRunId,
        config: this.getJobConfig(),
        jobType: 'document-clone-background',
        additionalTopics: [topics['cloning-finished']],
        onJobCompletion: async (data: any) => {
          try {
            await this.handleJobCompletion(data)
          } catch (error) {
            await this.handleJobFailure(error)
          }
        }
      })

      // Register the handler with the message bus
      messageBus.registerHandler(handler)

    } catch (error: any) {
      await this.handleJobFailure(error)
      trackError(new GeneralError(error.message as string))
    } finally {
      // Clear loading state if node management is enabled
      if (this.treeId && this.nodeId) {
        store.dispatch(setNodeFetching({ treeId: this.treeId, nodeId: this.nodeId, isFetching: false }))
      }
    }
  }

  private async executeCloneRequest (): Promise<string | number | null> {
    const cloneParams: DocumentCloneApiArg = {
      id: this.sourceId,
      parentId: this.targetId,
      documentCloneParameters: this.parameters ?? {}
    }

    const result = await store.dispatch(
      api.endpoints.documentClone.initiate(cloneParams)
    ).unwrap()

    return result?.jobRunId ?? null
  }

  private getJobConfig (): DocumentCloneJobConfig {
    return {
      title: this.title,
      progress: 0,
      parentFolderId: this.targetId,
      parentFolderType: elementTypes.document
    }
  }

  private async handleJobCompletion (data: any): Promise<void> {
    store.dispatch(refreshNodeChildren({
      elementType: elementTypes.document,
      nodeId: this.targetId.toString()
    }))
  }

  private async handleImmediateCompletion (): Promise<void> {
    // If operation completed immediately, refresh the tree
    store.dispatch(refreshNodeChildren({
      nodeId: this.targetId.toString(),
      elementType: elementTypes.document
    }))
  }

  private async handleJobFailure (error: any): Promise<void> {
    // Default implementation - can be extended for specific error handling
    console.error('Document clone job failed:', error)
  }
}
