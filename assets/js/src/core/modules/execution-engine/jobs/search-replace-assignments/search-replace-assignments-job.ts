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
import { MessageBusJobHandler, type JobCompletionData } from '../../message-handlers/message-bus-job/message-bus-job-handler'
import { api, type ElementUsageBaseItem } from '@Pimcore/modules/element/search-replace-assignments/usage-api-slice-enhanced'
import { t } from 'i18next'
import { type RehydratableJob, type JobRunList } from '../../services/job-rehydration-registry'

export interface SearchReplaceAssignmentsJobOptions {
  sourceElementType: ElementType
  sourceElementId: number
  targetElementType: ElementType
  targetElementId: number
  elements?: ElementUsageBaseItem[]
  /**
   * Called once the run has ended, whatever its terminal state. `data` carries the outcome
   * (`isSuccessful`, `isFailed`, `status`, messages); it is undefined when the run never reached the
   * execution engine, i.e. the replace request itself failed or returned no job run.
   */
  onFinish?: (data?: JobCompletionData) => void
}

export class SearchReplaceAssignmentsJob implements JobInterface {
  private readonly sourceElementType: ElementType
  private readonly sourceElementId: number
  private readonly targetElementType: ElementType
  private readonly targetElementId: number
  private readonly elements?: ElementUsageBaseItem[]
  private readonly onFinish?: (data?: JobCompletionData) => void

  constructor (options: SearchReplaceAssignmentsJobOptions) {
    this.sourceElementType = options.sourceElementType
    this.sourceElementId = options.sourceElementId
    this.targetElementType = options.targetElementType
    this.targetElementId = options.targetElementId
    this.elements = options.elements
    this.onFinish = options.onFinish
  }

  async run (options: JobRunOptions): Promise<void> {
    const { messageBus } = options

    try {
      const jobRunId = await this.executeReplaceRequest()

      if (isNil(jobRunId)) {
        await this.handleCompletion()
        return
      }

      const handler = SearchReplaceAssignmentsJob.buildHandler({
        jobRunId,
        elementCount: this.elements?.length ?? 0,
        onJobCompletion: async (data: JobCompletionData) => {
          try {
            await this.handleCompletion(data)
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

  private async executeReplaceRequest (): Promise<number | null> {
    const response = await store.dispatch(
      api.endpoints.elementUsageReplace.initiate({
        elementType: this.sourceElementType,
        id: this.sourceElementId,
        body: {
          targetType: this.targetElementType,
          targetId: this.targetElementId,
          elements: this.elements ?? []
        }
      })
    )

    if (!isUndefined(response.error)) {
      trackError(new ApiError(response.error))
      return null
    }

    return response.data?.jobRunId ?? null
  }

  private async handleCompletion (data?: JobCompletionData): Promise<void> {
    this.onFinish?.(data)
  }

  private async handleJobFailure (error: any): Promise<void> {
    console.error('Search replace assignments job failed:', error)
  }

  static readonly jobNames = ['studio_ee_job_element_usage_replace'] as const

  static rehydrate (jobRuns: JobRunList): MessageBusJobHandler {
    const [parent] = jobRuns
    return this.buildHandler({ jobRunId: parent.id, elementCount: parent.totalElements })
  }

  private static buildHandler (options: {
    jobRunId: number
    elementCount?: number
    onJobCompletion?: (data: JobCompletionData) => Promise<void>
  }): MessageBusJobHandler {
    return new MessageBusJobHandler({
      jobRunId: options.jobRunId,
      title: options.elementCount != null && options.elementCount > 0
        ? t('search-replace-assignments.job.title-selection', { count: options.elementCount })
        : t('search-replace-assignments.job.title-all'),
      onJobCompletion: options.onJobCompletion
    })
  }
}

void (SearchReplaceAssignmentsJob satisfies RehydratableJob)
