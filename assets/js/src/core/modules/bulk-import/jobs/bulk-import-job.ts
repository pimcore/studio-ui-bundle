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
import { api as classDefinitionApi } from '@Pimcore/modules/class-definition/class-definition-slice.gen'
import { type BulkImportItem } from '../components/bulk-import-modal/context/bulk-import-context'

export interface BulkImportJobOptions {
  fileId: string
  items: BulkImportItem[]
  title: string
  onFinish?: () => void
}

export class BulkImportJob implements JobInterface {
  private readonly fileId: string
  private readonly items: BulkImportItem[]
  private readonly title: string
  private readonly onFinish?: () => void

  constructor (options: BulkImportJobOptions) {
    this.fileId = options.fileId
    this.items = options.items
    this.title = options.title
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

      const handler = new MessageBusJobHandler({
        jobRunId,
        title: this.title,
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
