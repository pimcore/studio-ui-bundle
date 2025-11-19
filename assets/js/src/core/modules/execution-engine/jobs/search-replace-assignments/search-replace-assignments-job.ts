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
import { api, type ElementUsageBaseItem } from '@Pimcore/modules/element/search-replace-assignments/usage-api-slice-enhanced'

export interface SearchReplaceAssignmentsJobConfig extends BaseJobConfig {
  sourceElementType: ElementType
  sourceElementId: number
}

export interface SearchReplaceAssignmentsJobOptions {
  sourceElementType: ElementType
  sourceElementId: number
  targetElementType: ElementType
  targetElementId: number
  elements?: ElementUsageBaseItem[]
  title: string
  onFinish?: () => void
}

export class SearchReplaceAssignmentsJob implements JobInterface {
  protected readonly sourceElementType: ElementType
  protected readonly sourceElementId: number
  protected readonly targetElementType: ElementType
  protected readonly targetElementId: number
  protected readonly elements?: ElementUsageBaseItem[]
  protected readonly title: string
  protected readonly onFinish?: () => void

  constructor (options: SearchReplaceAssignmentsJobOptions) {
    this.sourceElementType = options.sourceElementType
    this.sourceElementId = options.sourceElementId
    this.targetElementType = options.targetElementType
    this.targetElementId = options.targetElementId
    this.elements = options.elements
    this.title = options.title
    this.onFinish = options.onFinish
  }

  async run (options: JobRunOptions): Promise<void> {
    const { messageBus } = options

    try {
      const jobRunId = await this.executeReplaceRequest()

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

  protected async executeReplaceRequest (): Promise<string | number | null> {
    const response = await store.dispatch(
      api.endpoints.elementUsageReplace.initiate({
        elementType: this.sourceElementType,
        id: this.sourceElementId,
        body: {
          targetType: this.targetElementType,
          targetId: this.targetElementId,
          elements: this.elements ?? []
        }
      })
    )

    if (!isUndefined(response.error)) {
      trackError(new ApiError(response.error))
      return null
    }

    return response.data?.jobRunId ?? null
  }

  protected getJobConfig (): SearchReplaceAssignmentsJobConfig {
    return {
      title: this.title,
      progress: 0,
      sourceElementType: this.sourceElementType,
      sourceElementId: this.sourceElementId
    }
  }

  protected async handleCompletion (): Promise<void> {
    store.dispatch(
      api.util.invalidateTags(['Elements'])
    )

    this.onFinish?.()
  }

  protected async handleJobFailure (error: any): Promise<void> {
    console.error('Search replace assignments job failed:', error)
  }
}
