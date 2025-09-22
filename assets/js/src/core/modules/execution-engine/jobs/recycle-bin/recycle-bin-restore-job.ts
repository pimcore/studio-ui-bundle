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
import { DefaultJobHandler, type BaseJobConfig } from '../../message-handlers/default-job-handler'
import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import { api } from '@Pimcore/modules/recycle-bin/recycle-bin-api-slice-enhanced'
import { refreshTreeByElementType } from '@Pimcore/components/element-tree/element-tree-slice'

export interface RecycleBinRestoreJobConfig extends BaseJobConfig {
  elementTypes: ElementType[]
}

export interface RecycleBinRestoreJobOptions {
  itemIds: number[]
  elementTypes: ElementType[]
  title: string
}

export class RecycleBinRestoreJob implements JobInterface {
  protected readonly itemIds: number[]
  protected readonly elementTypes: ElementType[]
  protected readonly title: string

  constructor (options: RecycleBinRestoreJobOptions) {
    this.itemIds = options.itemIds
    this.elementTypes = options.elementTypes
    this.title = options.title
  }

  async run (options: JobRunOptions): Promise<void> {
    const { messageBus } = options

    try {
      const jobRunId = await this.executeRestoreRequest()

      if (isNil(jobRunId)) {
        await this.handleCompletion()
        return
      }

      const handler = new DefaultJobHandler({
        jobRunId,
        config: this.getJobConfig(),
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

  protected async executeRestoreRequest (): Promise<string | number | null> {
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

  protected getJobConfig (): RecycleBinRestoreJobConfig {
    return {
      title: this.title,
      progress: 0,
      elementTypes: this.elementTypes
    }
  }

  protected async handleCompletion (): Promise<void> {
    // Refresh the tree for all affected element types since items are being restored to their original locations
    store.dispatch(refreshTreeByElementType({
      elementTypes: this.elementTypes
    }))

    // Refresh the recycle bin data
    store.dispatch(
      api.util.invalidateTags(
        invalidatingTags.RECYCLING_BIN()
      )
    )
  }

  protected async handleJobFailure (error: any): Promise<void> {
    console.error('Recycle bin restore job failed:', error)
  }
}
