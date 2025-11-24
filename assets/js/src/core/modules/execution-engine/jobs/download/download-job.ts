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
import { type JobButtonCustomizationContext } from '../../message-handlers/message-bus-job/message-bus-job-notification'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { t } from 'i18next'
import { isNull } from 'lodash'

export interface DownloadJobOptions {
  title: string
  action: () => Promise<number>
  downloadUrl: string
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
      trackError(new GeneralError(t('jobs.job.download-error')))
      return null
    }
  }

  private createHandler (jobRunId: number, options: JobRunOptions): MessageBusJobHandler {
    const { title, downloadUrl } = this.options

    return new MessageBusJobHandler({
      jobRunId,
      title,
      onRetry: async () => {
        await this.run(options)
      },
      onCustomizeButtons: (context: JobButtonCustomizationContext) => {
        context.addSuccessButton({
          label: t('jobs.job.button-download'),
          handler: () => {
            const a = document.createElement('a')
            a.href = downloadUrl.replace('{jobRunId}', jobRunId.toString())
            a.download = ''
            a.click()
          }
        })
      }
    })
  }
}
