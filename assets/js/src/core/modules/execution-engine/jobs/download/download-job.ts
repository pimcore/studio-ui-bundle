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
import { DefaultJobHandler } from '../../message-handlers/default-job-handler'
import { type JobViewCustomizationContext } from '../../notification/job/job-view'
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
      return null
    }
  }

  private createHandler (jobRunId: number, options: JobRunOptions): DefaultJobHandler<any> {
    const { title, downloadUrl } = this.options

    return new DefaultJobHandler({
      jobRunId,
      config: { title },
      onRetry: async () => {
        await this.run(options)
      },
      onCustomizeJobView: (context: JobViewCustomizationContext) => {
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
