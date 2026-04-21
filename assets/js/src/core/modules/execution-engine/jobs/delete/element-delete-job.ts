/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNil, isString, isUndefined } from 'lodash'
import { store } from '@Pimcore/app/store'
import { setNodeFetching, refreshNodeChildren, markNodeDeleting } from '@Pimcore/components/element-tree/element-tree-slice'
import trackError, { ApiError, GeneralError } from '@Pimcore/modules/app/error-handler'
import { type JobInterface, type JobRunOptions } from '../job-interface'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { MessageBusJobHandler, type JobCompletionData } from '../../message-handlers/message-bus-job/message-bus-job-handler'
import { StepCompletionCalculator } from '../../message-handlers/message-bus-job/progress-calculator/step-completion-calculator'
import { api as elementApi } from '@Pimcore/modules/element/element-api-slice.gen'

export interface DeleteJobOptions {
  elementId: number
  elementType: ElementType
  title: string
  treeId?: string
  nodeId?: string
  parentFolderId?: number
}

export class DeleteJob implements JobInterface {
  private readonly elementId: number
  private readonly elementType: ElementType
  private readonly title: string
  private readonly treeId?: string
  private readonly nodeId?: string
  private readonly parentFolderId?: number

  constructor (options: DeleteJobOptions) {
    this.elementId = options.elementId
    this.elementType = options.elementType
    this.title = options.title
    this.treeId = options.treeId
    this.nodeId = options.nodeId
    this.parentFolderId = options.parentFolderId
  }

  async run (options: JobRunOptions): Promise<void> {
    const { messageBus } = options

    if (isString(this.treeId) && isString(this.nodeId)) {
      store.dispatch(setNodeFetching({ treeId: this.treeId, nodeId: this.nodeId, isFetching: true }))
    }

    // Mark node as deleting in the tree
    store.dispatch(markNodeDeleting({
      nodeId: String(this.elementId),
      elementType: this.elementType,
      isDeleting: true
    }))

    try {
      const jobRunId = await this.executeDeleteRequest()

      if (isNil(jobRunId)) {
        await this.handleCompletion()
        return
      }

      const handler = new MessageBusJobHandler({
        jobRunId,
        title: this.title,
        progressCalculator: new StepCompletionCalculator(),
        onJobCompletion: async (data: JobCompletionData) => {
          if (data.isFinished) {
            try {
              await this.handleCompletion()
            } catch (error) {
              await this.handleJobFailure(error)
            }
          } else {
            await this.handleJobFailure(new Error(`Job failed with status: ${data.status}`))
          }
        },
        onRetry: async () => {
          await this.run(options)
        }
      })

      messageBus.registerHandler(handler)
    } catch (error: any) {
      await this.handleJobFailure(error)
      trackError(new GeneralError(error.message as string))
    }
  }

  private async executeDeleteRequest (): Promise<number | null> {
    const response = await store.dispatch(
      elementApi.endpoints.elementDelete.initiate({
        id: this.elementId,
        elementType: this.elementType
      })
    )

    if (!isUndefined(response.error)) {
      trackError(new ApiError(response.error))
      return null
    }

    return response.data?.jobRunId ?? null
  }

  private async handleCompletion (): Promise<void> {
    if (isString(this.treeId) && isString(this.nodeId)) {
      store.dispatch(setNodeFetching({ treeId: this.treeId, nodeId: this.nodeId, isFetching: false }))
    }

    store.dispatch(markNodeDeleting({
      nodeId: String(this.elementId),
      elementType: this.elementType,
      isDeleting: false
    }))

    if (!isNil(this.parentFolderId)) {
      store.dispatch(refreshNodeChildren({
        elementType: this.elementType,
        nodeId: this.parentFolderId.toString()
      }))
    }
  }

  private async handleJobFailure (error: any): Promise<void> {
    if (isString(this.treeId) && isString(this.nodeId)) {
      store.dispatch(setNodeFetching({ treeId: this.treeId, nodeId: this.nodeId, isFetching: false }))
    }

    store.dispatch(markNodeDeleting({
      nodeId: String(this.elementId),
      elementType: this.elementType,
      isDeleting: false
    }))

    console.error('Delete job failed:', error)
  }
}
