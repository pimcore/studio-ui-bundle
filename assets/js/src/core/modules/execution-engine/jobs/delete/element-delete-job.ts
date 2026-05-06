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
import { t } from 'i18next'
import { type RehydratableJob, type JobRunList } from '../../services/job-rehydration-registry'


export interface DeleteJobOptions {
  elementId: number
  elementType: ElementType
  treeId?: string
  nodeId?: string
  parentFolderId?: number
}

export class DeleteJob implements JobInterface {
  static readonly jobNames = ['studio_ee_job_delete_assets', 'studio_ee_job_delete_data_objects', 'studio_ee_job_delete_documents'] as const

  private readonly elementId: number
  private readonly elementType: ElementType
  private readonly treeId?: string
  private readonly nodeId?: string
  private readonly parentFolderId?: number

  constructor (options: DeleteJobOptions) {
    this.elementId = options.elementId
    this.elementType = options.elementType
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

      const handler = DeleteJob.buildHandler({
        jobRunId,
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

  static rehydrate (jobRuns: JobRunList): MessageBusJobHandler {
    const [parent] = jobRuns
    return this.buildHandler({ jobRunId: parent.id })
  }

  private static buildHandler (options: {
    jobRunId: number
    onJobCompletion?: (data: JobCompletionData) => Promise<void>
    onRetry?: () => Promise<void>
  }): MessageBusJobHandler {
    return new MessageBusJobHandler({
      jobRunId: options.jobRunId,
      title: t('element.delete.deleting-folder'),
      progressCalculator: new StepCompletionCalculator(),
      onJobCompletion: options.onJobCompletion,
      onRetry: options.onRetry
    })
  }
}

void (DeleteJob satisfies RehydratableJob)
