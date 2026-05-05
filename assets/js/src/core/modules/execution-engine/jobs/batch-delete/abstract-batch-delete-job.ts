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
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { type JobInterface, type JobRunOptions } from '../job-interface'
import { MessageBusJobHandler, type JobCompletionData } from '../../message-handlers/message-bus-job/message-bus-job-handler'
import { StepCompletionCalculator } from '../../message-handlers/message-bus-job/progress-calculator/step-completion-calculator'
import { t } from 'i18next'

export interface AbstractBatchDeleteJobOptions {
  itemIds: number[]
  onFinish?: () => Promise<void>
}

export abstract class AbstractBatchDeleteJob implements JobInterface {
  protected readonly itemIds: number[]
  protected readonly onFinish?: () => Promise<void>

  constructor (options: AbstractBatchDeleteJobOptions) {
    this.itemIds = options.itemIds
    this.onFinish = options.onFinish
  }

  async run (options: JobRunOptions): Promise<void> {
    const { messageBus } = options

    try {
      const jobRunId = await this.executeDeleteRequest()

      if (isNil(jobRunId)) {
        await this.handleJobFailure(new Error('No jobRunId returned from delete request'))
        return
      }

      const handler = AbstractBatchDeleteJob.buildHandler({
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

  protected abstract executeDeleteRequest (): Promise<number | null>

  protected async handleCompletion (): Promise<void> {
    if (this.onFinish !== undefined) {
      await this.onFinish()
    }
  }

  protected async handleJobFailure (error: any): Promise<void> {
    console.error('Batch delete job failed:', error)
  }

  protected static buildHandler (options: {
    jobRunId: number
    onJobCompletion?: (data: JobCompletionData) => Promise<void>
    onRetry?: () => Promise<void>
  }): MessageBusJobHandler {
    return new MessageBusJobHandler({
      jobRunId: options.jobRunId,
      title: t('batch-delete.job-title'),
      progressCalculator: new StepCompletionCalculator(),
      onJobCompletion: options.onJobCompletion,
      onRetry: options.onRetry
    })
  }
}
