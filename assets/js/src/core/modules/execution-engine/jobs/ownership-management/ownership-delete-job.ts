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
import { MessageBusJobHandler, type JobCompletionData } from '../../message-handlers/message-bus-job/message-bus-job-handler'
import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import { api } from '@Pimcore/modules/ownership-management/ownership-management-api-slice-enhanced'
import { t } from 'i18next'
import { type RehydratableJob, type JobRunList } from '../../services/job-rehydration-registry'

export interface OwnershipDeleteJobOptions {
  configurationType: string
  ids: string[]
  onFinish?: () => void
}

export class OwnershipDeleteJob implements JobInterface {
  private readonly configurationType: string
  private readonly ids: string[]
  private readonly onFinish?: () => void

  constructor (options: OwnershipDeleteJobOptions) {
    this.configurationType = options.configurationType
    this.ids = options.ids
    this.onFinish = options.onFinish
  }

  async run (options: JobRunOptions): Promise<void> {
    const { messageBus } = options

    try {
      const jobRunId = await this.executeRequest()

      if (isNil(jobRunId)) {
        await this.handleCompletion()
        return
      }

      const handler = OwnershipDeleteJob.buildHandler({
        jobRunId,
        onJobCompletion: async () => {
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

  private async executeRequest (): Promise<number | null> {
    const response = await store.dispatch(
      api.endpoints.ownershipManagementDelete.initiate({
        type: this.configurationType,
        body: {
          ids: this.ids
        }
      })
    )

    if (!isUndefined(response.error)) {
      trackError(new ApiError(response.error))
      return null
    }

    return response.data?.jobRunId ?? null
  }

  private static invalidateCache (): void {
    store.dispatch(api.util.invalidateTags(invalidatingTags.OWNERSHIP_MANAGEMENT()))
  }

  private async handleCompletion (): Promise<void> {
    OwnershipDeleteJob.invalidateCache()
    this.onFinish?.()
  }

  private async handleJobFailure (error: any): Promise<void> {
    console.error('Ownership delete job failed:', error)
  }

  static readonly jobNames = ['studio_ee_job_ownership_management_delete'] as const

  static rehydrate (jobRuns: JobRunList): MessageBusJobHandler {
    const [parent] = jobRuns
    const isActive = ['running', 'queued'].includes(parent.state)
    return this.buildHandler({
      jobRunId: parent.id,
      onJobCompletion: isActive
        ? async (data) => {
          if (data.isFinished) {
            OwnershipDeleteJob.invalidateCache()
          }
        }
        : undefined
    })
  }

  private static buildHandler (options: {
    jobRunId: number
    onJobCompletion?: (data: JobCompletionData) => Promise<void>
  }): MessageBusJobHandler {
    return new MessageBusJobHandler({
      jobRunId: options.jobRunId,
      title: t('ownership-management.actions.delete.title'),
      onJobCompletion: options.onJobCompletion
    })
  }
}

void (OwnershipDeleteJob satisfies RehydratableJob)
