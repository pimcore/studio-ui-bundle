/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type JobInterface, type JobRunOptions } from '../job-interface'
import { MessageBusJobHandler } from '../../message-handlers/message-bus-job/message-bus-job-handler'
import { ProgressFieldCalculator } from '../../message-handlers/message-bus-job/progress-calculator/progress-field-calculator'
import { ChildJobStepTracker } from '../../message-handlers/message-bus-job/step-tracker/child-job-step-tracker'
import { DefaultStepTracker } from '../../message-handlers/message-bus-job/step-tracker/default-step-tracker'
import { type JobButtonCustomizationContext } from '../../message-handlers/message-bus-job/message-bus-job-notification'
import { downloadFromUrl } from '@Pimcore/utils/files'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { t } from 'i18next'
import { isNull } from 'lodash'

export interface AbstractDownloadJobOptions {
  action: () => Promise<number>
}

interface BuildHandlerOptions {
  jobRunId: number
  hasChildJob?: boolean
  startAtStep?: number
  ancestorJobRunIds?: number[]
  onRetry?: () => Promise<void>
}

export abstract class AbstractDownloadJob implements JobInterface {
  protected usesChildJob (): boolean { return false }

  constructor (private readonly options: AbstractDownloadJobOptions) {}

  async run (options: JobRunOptions): Promise<void> {
    const { messageBus } = options
    const jobRunId = await this.executeAction()

    if (!isNull(jobRunId)) {
      messageBus.registerHandler(this.createHandler({
        jobRunId,
        hasChildJob: this.usesChildJob(),
        onRetry: async () => { await this.run(options) }
      }))
    }
  }

  private async executeAction (): Promise<number | null> {
    try {
      return await this.options.action()
    } catch (e) {
      console.error(e)
      trackError(new GeneralError(t('jobs.job.download-error')))
      return null
    }
  }

  // Bridge: lets run() use instance polymorphism to reach the subclass's static buildHandler
  private createHandler (options: BuildHandlerOptions): MessageBusJobHandler {
    return (this.constructor as typeof AbstractDownloadJob).buildHandler(options)
  }

  static buildDownloadButton (downloadUrl: string): (context: JobButtonCustomizationContext) => void {
    return (context: JobButtonCustomizationContext) => {
      context.addSuccessButton({
        label: t('jobs.job.button-download'),
        handler: async () => {
          const url = downloadUrl.replace('{jobRunId}', context.jobRunId.toString())
          const available = await downloadFromUrl(url)
          if (!available) {
            context.showWarning('jobs.job.download-error', t('jobs.job.download-not-available'))
          }
        }
      })
    }
  }

  protected static getTitle (): string { return '' }
  protected static getDownloadUrl (): string | null { return null }

  protected static buildHandler (options: BuildHandlerOptions): MessageBusJobHandler {
    const downloadUrl = this.getDownloadUrl()
    return new MessageBusJobHandler({
      jobRunId: options.jobRunId,
      ancestorJobRunIds: options.ancestorJobRunIds,
      title: this.getTitle(),
      stepTracker: options.hasChildJob === true
        ? new ChildJobStepTracker({ totalSteps: 2, startAtStep: options.startAtStep })
        : new DefaultStepTracker(),
      progressCalculator: new ProgressFieldCalculator(),
      onRetry: options.onRetry,
      onCustomizeButtons: downloadUrl !== null ? AbstractDownloadJob.buildDownloadButton(downloadUrl) : undefined
    })
  }
}
