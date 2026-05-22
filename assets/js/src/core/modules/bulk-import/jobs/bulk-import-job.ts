/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isUndefined } from 'lodash'
import { store } from '@Pimcore/app/store'
import trackError, { ApiError, GeneralError } from '@Pimcore/modules/app/error-handler'
import { type JobInterface, type JobRunOptions } from '@Pimcore/modules/execution-engine/jobs/job-interface'
import { MessageBusJobHandler, type JobCompletionData } from '@Pimcore/modules/execution-engine/message-handlers/message-bus-job/message-bus-job-handler'
import { StepCompletionCalculator } from '@Pimcore/modules/execution-engine/message-handlers/message-bus-job/progress-calculator/step-completion-calculator'
import { api as classDefinitionApi } from '@Pimcore/modules/class-definition/class-definition-slice.gen'
import { type BulkImportItem } from '../components/bulk-import-modal/context/bulk-import-context'
import { type RehydratableJob, type JobRunList } from '@Pimcore/modules/execution-engine/services/job-rehydration-registry'
import { t } from 'i18next'

export interface BulkImportJobOptions {
  fileId: string
  items: BulkImportItem[]
  onFinish?: () => void
}

export class BulkImportJob implements JobInterface {
  static readonly jobNames = ['studio_ee_job_bulk_import_class_definitions'] as const

  static rehydrate (jobRuns: JobRunList): MessageBusJobHandler {
    const [parent] = jobRuns
    return BulkImportJob.buildHandler({ jobRunId: parent.id })
  }

  protected static buildHandler (options: {
    jobRunId: number
    onJobCompletion?: (data: JobCompletionData) => Promise<void>
    onRetry?: () => Promise<void>
  }): MessageBusJobHandler {
    return new MessageBusJobHandler({
      jobRunId: options.jobRunId,
      title: t('bulk-import.job-title'),
      progressCalculator: new StepCompletionCalculator(),
      onJobCompletion: options.onJobCompletion,
      onRetry: options.onRetry
    })
  }

  private readonly fileId: string
  private readonly items: BulkImportItem[]
  private readonly onFinish?: () => void

  constructor (options: BulkImportJobOptions) {
    this.fileId = options.fileId
    this.items = options.items
    this.onFinish = options.onFinish
  }

  async run (options: JobRunOptions): Promise<void> {
    const { messageBus } = options

    try {
      const response = await store.dispatch(
        classDefinitionApi.endpoints.classBulkImport.initiate({
          fileId: this.fileId,
          bulkImportParameters: { items: this.items }
        })
      )

      if (!isUndefined(response.error)) {
        trackError(new ApiError(response.error))
        return
      }

      const jobRunId = response.data?.jobRunId

      if (isUndefined(jobRunId)) {
        trackError(new GeneralError('Bulk import did not return a jobRunId'))
        return
      }

      const handler = BulkImportJob.buildHandler({
        jobRunId,
        onJobCompletion: async (data: JobCompletionData) => {
          if (data.isFinished) {
            this.onFinish?.()
          } else {
            trackError(new GeneralError('Bulk import job failed'))
          }
        },
        onRetry: async () => {
          await this.run(options)
        }
      })

      messageBus.registerHandler(handler)
    } catch (error: any) {
      trackError(new GeneralError(error.message as string))
    }
  }
}

void (BulkImportJob satisfies RehydratableJob)
