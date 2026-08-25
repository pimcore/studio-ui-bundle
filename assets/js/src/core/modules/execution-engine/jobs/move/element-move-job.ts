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
import { t } from 'i18next'
import { store } from '@Pimcore/app/store'
import trackError, { ApiError, GeneralError } from '@Pimcore/modules/app/error-handler'
import { api as assetApi } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { api as dataObjectApi } from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import { type ElementType, elementTypes } from '@Pimcore/types/enums/element/element-type'
import { type JobInterface, type JobRunOptions } from '../job-interface'
import { MessageBusJobHandler, type JobCompletionData } from '../../message-handlers/message-bus-job/message-bus-job-handler'
import { BatchedStepProgressCalculator } from '../../message-handlers/message-bus-job/progress-calculator/batched-step-progress-calculator'
import { type JobRunList, type RehydratableJob } from '../../services/job-rehydration-registry'

export interface ElementMoveJobItem {
  id: number
  parentId: number
  /** Position among the new siblings; data objects only, and only when sorting. */
  index?: number
}

export interface ElementMoveJobOptions {
  elementType: ElementType
  items: ElementMoveJobItem[]
  onFinish?: () => Promise<void>
}

/**
 * Moves several elements into a new parent in one job run.
 *
 * The patch endpoint turns a request with more than one element into a job that
 * continues past failures, so progress and the per element error list come from
 * the execution engine. Documents have no batch patch endpoint and are therefore
 * not supported here.
 */
export class ElementMoveJob implements JobInterface {
  static readonly jobNames = ['studio_ee_job_patch_elements'] as const

  private readonly elementType: ElementType
  private readonly items: ElementMoveJobItem[]
  private readonly onFinish?: () => Promise<void>

  constructor (options: ElementMoveJobOptions) {
    this.elementType = options.elementType
    this.items = options.items
    this.onFinish = options.onFinish
  }

  async run (options: JobRunOptions): Promise<void> {
    const { messageBus } = options

    try {
      const jobRunId = await this.executeMoveRequest()

      if (isNil(jobRunId)) {
        // Nothing to track: either the request failed, or the backend applied a
        // single element synchronously.
        await this.handleCompletion()
        return
      }

      messageBus.registerHandler(ElementMoveJob.buildHandler({
        jobRunId,
        onJobCompletion: async (data: JobCompletionData) => {
          // Elements that could not be moved are reported by the job itself; the
          // refresh puts both sides of the move back in sync either way.
          await this.handleCompletion()

          if (!data.isFinished) {
            console.error(`Element move job ended with status: ${data.status}`)
          }
        },
        onRetry: async () => {
          await this.run(options)
        }
      }))
    } catch (error: any) {
      await this.handleCompletion()
      trackError(new GeneralError(error.message as string))
    }
  }

  private async executeMoveRequest (): Promise<number | null> {
    const data = this.items.map(item => isUndefined(item.index)
      ? { id: item.id, parentId: item.parentId }
      : { id: item.id, parentId: item.parentId, index: item.index })

    const response = this.elementType === elementTypes.asset
      ? await store.dispatch(assetApi.endpoints.assetPatchById.initiate({ body: { data } }))
      : await store.dispatch(dataObjectApi.endpoints.dataObjectPatchById.initiate({ body: { data } }))

    if (!isUndefined(response.error)) {
      trackError(new ApiError(response.error))
      return null
    }

    return response.data?.jobRunId ?? null
  }

  private async handleCompletion (): Promise<void> {
    if (!isUndefined(this.onFinish)) {
      await this.onFinish()
    }
  }

  static rehydrate (jobRuns: JobRunList): MessageBusJobHandler {
    const [parent] = jobRuns

    return this.buildHandler({ jobRunId: parent.id })
  }

  private static buildHandler (options: {
    jobRunId: number
    onJobCompletion?: (data: JobCompletionData) => Promise<void>
    onRetry?: () => Promise<void>
  }): MessageBusJobHandler {
    return new MessageBusJobHandler({
      jobRunId: options.jobRunId,
      title: t('element-move.job-title'),
      progressCalculator: new BatchedStepProgressCalculator(),
      onJobCompletion: options.onJobCompletion,
      onRetry: options.onRetry
    })
  }
}

void (ElementMoveJob satisfies RehydratableJob)
