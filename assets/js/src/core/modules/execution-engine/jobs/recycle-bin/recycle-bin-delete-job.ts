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
import { MessageBusJobHandler } from '../../message-handlers/message-bus-job/message-bus-job-handler'
import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import { api } from '@Pimcore/modules/recycle-bin/recycle-bin-api-slice-enhanced'

export interface RecycleBinDeleteJobOptions {
  itemIds: number[]
  elementTypes: ElementType[]
  title: string
  onFinish?: () => void
}

export class RecycleBinDeleteJob implements JobInterface {
  private readonly itemIds: number[]
  private readonly elementTypes: ElementType[]
  private readonly title: string
  private readonly onFinish?: () => void

  constructor (options: RecycleBinDeleteJobOptions) {
    this.itemIds = options.itemIds
    this.elementTypes = options.elementTypes
    this.title = options.title
    this.onFinish = options.onFinish
  }

  async run (options: JobRunOptions): Promise<void> {
    const { messageBus } = options

    try {
      const jobRunId = await this.executeDeleteRequest()

      if (isNil(jobRunId)) {
        await this.handleCompletion()
        return
      }

      const handler = new MessageBusJobHandler({
        jobRunId,
        title: this.title,
        onJobCompletion: async (data: any) => {
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

  private async executeDeleteRequest (): Promise<number | null> {
    const response = await store.dispatch(
      api.endpoints.recycleBinDeleteItems.initiate({
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

  private async handleCompletion (): Promise<void> {
    // Refresh the recycle bin data
    store.dispatch(
      api.util.invalidateTags(
        invalidatingTags.RECYCLING_BIN()
      )
    )

    this.onFinish?.()
  }

  private async handleJobFailure (error: any): Promise<void> {
    console.error('Recycle bin delete job failed:', error)
  }
}
