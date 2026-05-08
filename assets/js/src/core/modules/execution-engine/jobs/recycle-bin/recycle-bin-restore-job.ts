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
import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import { api } from '@Pimcore/modules/recycle-bin/recycle-bin-api-slice-enhanced'
import { refreshTreeByElementType } from '@Pimcore/components/element-tree/element-tree-slice'
import { t } from 'i18next'
import { type RehydratableJob, type JobRunList } from '../../services/job-rehydration-registry'

export interface RecycleBinRestoreJobOptions {
  itemIds: number[]
  elementTypes: ElementType[]
  onFinish?: () => void
}

export class RecycleBinRestoreJob implements JobInterface {
  private readonly itemIds: number[]
  private readonly elementTypes: ElementType[]
  private readonly onFinish?: () => void

  constructor (options: RecycleBinRestoreJobOptions) {
    this.itemIds = options.itemIds
    this.elementTypes = options.elementTypes
    this.onFinish = options.onFinish
  }

  async run (options: JobRunOptions): Promise<void> {
    const { messageBus } = options

    try {
      const jobRunId = await this.executeRestoreRequest()

      if (isNil(jobRunId)) {
        await this.handleCompletion()
        return
      }

      const handler = RecycleBinRestoreJob.buildHandler({
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

  private async executeRestoreRequest (): Promise<number | null> {
    const response = await store.dispatch(
      api.endpoints.recycleBinRestoreItems.initiate({
        body: {
          items: this.itemIds
        }
      })
    )

    if (!isUndefined(response.error)) {
      trackError(new ApiError(response.error))
      return null
    }

    return response.data?.jobRunId ?? null
  }

  private static completeRestore (elementTypes: ElementType[]): void {
    store.dispatch(refreshTreeByElementType({ elementTypes }))
    store.dispatch(api.util.invalidateTags(invalidatingTags.RECYCLING_BIN()))
  }

  private async handleCompletion (): Promise<void> {
    RecycleBinRestoreJob.completeRestore(this.elementTypes)
    this.onFinish?.()
  }

  private async handleJobFailure (error: any): Promise<void> {
    console.error('Recycle bin restore job failed:', error)
  }

  static readonly jobNames = ['studio_ee_job_recycle_bin_restore'] as const

  static rehydrate (jobRuns: JobRunList): MessageBusJobHandler {
    const [parent] = jobRuns
    const isActive = ['running', 'queued'].includes(parent.state)
    return this.buildHandler({
      jobRunId: parent.id,
      onJobCompletion: isActive
        ? async (data) => {
          if (data.isFinished) {
            RecycleBinRestoreJob.completeRestore(['asset', 'data-object', 'document'])
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
      title: t('recycle-bin.actions.restore.title'),
      onJobCompletion: options.onJobCompletion
    })
  }
}

void (RecycleBinRestoreJob satisfies RehydratableJob)
