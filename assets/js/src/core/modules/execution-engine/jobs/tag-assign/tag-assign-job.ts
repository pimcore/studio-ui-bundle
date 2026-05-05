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
import { t } from 'i18next'
import { type RehydratableJob, type JobRunList } from '../../services/job-rehydration-registry'

const titleKeyByOperation: Record<TagBatchOperationToElementsByTypeAndIdApiArg['operation'], string> = {
  assign: 'tags.apply-tags-to-children',
  replace: 'tags.remove-and-apply-tags-to-children'
}

const operationByJobName: Record<string, TagBatchOperationToElementsByTypeAndIdApiArg['operation']> = {
  studio_ee_job_batch_tag_assign: 'assign',
  studio_ee_job_batch_tag_replace: 'replace'
}

export interface TagAssignJobOptions {
  elementType: ElementType
  elementId: number
  operation: TagBatchOperationToElementsByTypeAndIdApiArg['operation']
}

export class TagAssignJob implements JobInterface {
  private readonly elementType: ElementType
  private readonly elementId: number
  private readonly operation: TagBatchOperationToElementsByTypeAndIdApiArg['operation']

  constructor (options: TagAssignJobOptions) {
    this.elementType = options.elementType
    this.elementId = options.elementId
    this.operation = options.operation
  }

  async run (options: JobRunOptions): Promise<void> {
    const { messageBus } = options

    try {
      const jobRunId = await this.executeRequest()

      if (isNil(jobRunId)) {
        return
      }

      const handler = TagAssignJob.buildHandler({ jobRunId, operation: this.operation })

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

  static readonly jobNames = ['studio_ee_job_batch_tag_assign', 'studio_ee_job_batch_tag_replace'] as const

  static rehydrate (jobRuns: JobRunList): MessageBusJobHandler {
    const [parent] = jobRuns
    const operation = operationByJobName[parent.jobName] ?? 'assign'
    return this.buildHandler({ jobRunId: parent.id, operation })
  }

  private static buildHandler (options: {
    jobRunId: number
    operation: TagBatchOperationToElementsByTypeAndIdApiArg['operation']
  }): MessageBusJobHandler {
    return new MessageBusJobHandler({
      jobRunId: options.jobRunId,
      title: t(titleKeyByOperation[options.operation])
    })
  }
}

void (TagAssignJob satisfies RehydratableJob)
