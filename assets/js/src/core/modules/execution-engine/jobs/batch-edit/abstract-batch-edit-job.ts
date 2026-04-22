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
import { MessageBusJobHandler, type JobCompletionData, type MessageBusJobHandlerOptions } from '../../message-handlers/message-bus-job/message-bus-job-handler'
import { type JobButtonCustomizationContext } from '../../message-handlers/message-bus-job/message-bus-job-notification'
import { t } from 'i18next'

export interface AbstractBatchEditJobOptions {
  title: string
  assetContextId: number
  refreshGrid: () => Promise<void>
  onFinish?: () => Promise<void>
}

export abstract class AbstractBatchEditJob implements JobInterface {
  protected readonly title: string
  protected readonly assetContextId: number
  protected readonly onFinish?: () => Promise<void>
  protected readonly refreshGrid: () => Promise<void>

  constructor (options: AbstractBatchEditJobOptions) {
    this.title = options.title
    this.assetContextId = options.assetContextId
    this.onFinish = options.onFinish
    this.refreshGrid = options.refreshGrid
  }

  async run (options: JobRunOptions): Promise<void> {
    const { messageBus } = options

    try {
      const jobRunId = await this.executeEditRequest()

      if (isNil(jobRunId)) {
        await this.handleJobFailure(new Error('No jobRunId returned from edit request'))
        return
      }

      const handler = this.createHandler({
        jobRunId,
        title: this.title,
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
        },
        onCustomizeButtons: (context: JobButtonCustomizationContext) => {
          const reloadAction = {
            label: t('jobs.job.button-reload'),
            handler: async () => {
              await this.refreshGrid()
            }
          }

          context.addSuccessButton(reloadAction)
          context.addFinishedWithErrorsButton(reloadAction)
        }
      })

      messageBus.registerHandler(handler)
    } catch (error: any) {
      await this.handleJobFailure(error)
      trackError(new GeneralError(error.message as string))
    }
  }

  protected createHandler (options: MessageBusJobHandlerOptions): MessageBusJobHandler {
    return new MessageBusJobHandler(options)
  }

  protected abstract executeEditRequest (): Promise<number | null>

  protected async handleCompletion (): Promise<void> {
    if (this.onFinish !== undefined) {
      await this.onFinish()
    }
  }

  protected async handleJobFailure (error: any): Promise<void> {
    console.error('Batch edit job failed:', error)
  }
}
