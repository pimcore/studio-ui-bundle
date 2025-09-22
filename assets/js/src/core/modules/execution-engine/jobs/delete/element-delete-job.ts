/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNil, isString } from 'lodash'
import { store } from '@Pimcore/app/store'
import { setNodeFetching, refreshNodeChildren, markNodeDeleting } from '@Pimcore/components/element-tree/element-tree-slice'
import trackError, { ApiError, GeneralError } from '@Pimcore/modules/app/error-handler'
import { StepBasedProgressJobHandler } from '../../message-handlers/step-based-progress-job-handler'
import { type JobInterface, type JobRunOptions } from '../job-interface'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { type BaseJobConfig } from '../../message-handlers/default-job-handler'
import { api as elementApi } from '@Pimcore/modules/element/element-api-slice.gen'
import { isUndefined } from 'lodash'

export interface DeleteJobConfig extends BaseJobConfig {
  elementType: ElementType
  parentFolderId?: number
}

export interface DeleteJobOptions {
  elementId: number
  elementType: ElementType
  title: string
  treeId?: string
  nodeId?: string
  parentFolderId?: number
}

export class DeleteJob implements JobInterface {
  protected readonly elementId: number
  protected readonly elementType: ElementType
  protected readonly title: string
  protected readonly treeId?: string
  protected readonly nodeId?: string
  protected readonly parentFolderId?: number

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

      const handler = new StepBasedProgressJobHandler({
        jobRunId,
        config: this.getJobConfig(),
        onJobCompletion: async (data: any) => {
          try {
            await this.handleCompletion()
          } catch (error) {
            await this.handleJobFailure(error)
          }
        }
      })

      messageBus.registerHandler(handler)
    } catch (error: any) {
      await this.handleJobFailure(error)
      trackError(new GeneralError(error.message as string))
    }
  }

  protected async executeDeleteRequest (): Promise<string | number | null> {
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

  protected getJobConfig (): DeleteJobConfig {
    return {
      title: this.title,
      progress: 0,
      elementType: this.elementType,
      parentFolderId: this.parentFolderId
    }
  }

  protected async handleCompletion (): Promise<void> {
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

  protected async handleJobFailure (error: any): Promise<void> {
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