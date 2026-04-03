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
import { CombinedProgressJobHandler } from '../../message-handlers/message-bus-job/combined-progress-job-handler'
import { type JobButtonCustomizationContext } from '../../message-handlers/message-bus-job/message-bus-job-notification'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { t } from 'i18next'
import { isNull } from 'lodash'

export interface DownloadJobOptions {
  title: string
  action: () => Promise<number>
  downloadUrl: string
  /**
   * When true, the job is split into 2 backend steps (e.g. folder CSV/XLSX export):
   * step 1 collects data and returns a jobRunChildId, step 2 creates the file.
   * The download will use the child job run ID automatically.
   */
  twoStep?: boolean
}

export class DownloadJob implements JobInterface {
  constructor (private readonly options: DownloadJobOptions) {}

  async run (options: JobRunOptions): Promise<void> {
    const { messageBus } = options
    const jobRunId = await this.executeAction()

    if (!isNull(jobRunId)) {
      const handler = this.createHandler(jobRunId, options)
      messageBus.registerHandler(handler)
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

  private createHandler (jobRunId: number, options: JobRunOptions): MessageBusJobHandler {
    const { title, downloadUrl, twoStep } = this.options

    const handlerOptions = {
      jobRunId,
      title,
      ...(twoStep === true && {
        totalSteps: 2,
        stepDescriptions: {
          1: 'jobs.job.step.preparing-elements',
          2: 'jobs.job.step.creating-export-file'
        }
      }),
      onRetry: async () => {
        await this.run(options)
      },
      onCustomizeButtons: (context: JobButtonCustomizationContext) => {
        context.addSuccessButton({
          label: t('jobs.job.button-download'),
          handler: () => {
            const a = document.createElement('a')
            a.href = downloadUrl.replace('{jobRunId}', context.jobRunId.toString())
            a.download = ''
            a.click()
          }
        })
      }
    }

    if (twoStep === true) {
      return new CombinedProgressJobHandler(handlerOptions)
    }

    return new MessageBusJobHandler(handlerOptions)
  }
}
