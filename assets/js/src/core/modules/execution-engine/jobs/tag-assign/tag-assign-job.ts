/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNil, isUndefined } from 'lodash'
import { store } from '@Pimcore/app/store'
import trackError, { ApiError, GeneralError } from '@Pimcore/modules/app/error-handler'
import { type JobInterface, type JobRunOptions } from '../job-interface'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { MessageBusJobHandler } from '../../message-handlers/message-bus-job/message-bus-job-handler'
import { api, type TagBatchOperationToElementsByTypeAndIdApiArg } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/tags-api-slice-enhanced'

export interface TagAssignJobOptions {
  elementType: ElementType
  elementId: number
  operation: TagBatchOperationToElementsByTypeAndIdApiArg['operation']
  title: string
}

export class TagAssignJob implements JobInterface {
  private readonly elementType: ElementType
  private readonly elementId: number
  private readonly operation: TagBatchOperationToElementsByTypeAndIdApiArg['operation']
  private readonly title: string

  constructor (options: TagAssignJobOptions) {
    this.elementType = options.elementType
    this.elementId = options.elementId
    this.operation = options.operation
    this.title = options.title
  }

  async run (options: JobRunOptions): Promise<void> {
    const { messageBus } = options

    try {
      const jobRunId = await this.executeRequest()

      if (isNil(jobRunId)) {
        return
      }

      const handler = new MessageBusJobHandler({
        jobRunId,
        title: this.title
      })

      messageBus.registerHandler(handler)
    } catch (error: any) {
      await this.handleJobFailure(error)
      trackError(new GeneralError(error.message as string))
    }
  }

  private async executeRequest (): Promise<number | null> {
    const response = await store.dispatch(
      api.endpoints.tagBatchOperationToElementsByTypeAndId.initiate({
        elementType: this.elementType,
        id: this.elementId,
        operation: this.operation
      })
    )

    if (!isUndefined(response.error)) {
      trackError(new ApiError(response.error))
      return null
    }

    return response.data?.jobRunId ?? null
  }

  private async handleJobFailure (error: any): Promise<void> {
    console.error('Tag assign job failed:', error)
  }
}
