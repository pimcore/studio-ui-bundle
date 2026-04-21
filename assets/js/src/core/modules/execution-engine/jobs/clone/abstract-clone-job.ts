/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNil, isString } from 'lodash'
import { store } from '@Pimcore/app/store'
import { setNodeFetching, refreshNodeChildren } from '@Pimcore/components/element-tree/element-tree-slice'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { MessageBusJobHandler, type MessageBusJob } from '../../message-handlers/message-bus-job/message-bus-job-handler'
import { ChildJobStepTracker } from '../../message-handlers/message-bus-job/step-tracker/child-job-step-tracker'
import { StepCompletionCalculator } from '../../message-handlers/message-bus-job/progress-calculator/step-completion-calculator'
import { type JobInterface, type JobRunOptions } from '../job-interface'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { JobStatus } from '../abstact-job'
import { t } from 'i18next'

export interface AbstractCloneJobOptions {
  sourceId: number
  targetId: number
  title: string
  elementType: ElementType
  treeId?: string
  nodeId?: string
}

export abstract class AbstractCloneJob implements JobInterface {
  protected readonly sourceId: number
  protected readonly targetId: number
  protected readonly title: string
  protected readonly elementType: ElementType
  protected readonly treeId?: string
  protected readonly nodeId?: string

  constructor (options: AbstractCloneJobOptions) {
    this.sourceId = options.sourceId
    this.targetId = options.targetId
    this.title = options.title
    this.elementType = options.elementType
    this.treeId = options.treeId
    this.nodeId = options.nodeId
  }

  async run (options: JobRunOptions): Promise<void> {
    const { messageBus } = options

    if (isString(this.treeId) && isString(this.nodeId)) {
      store.dispatch(setNodeFetching({ treeId: this.treeId, nodeId: this.nodeId, isFetching: true }))
    }

    try {
      const jobRunId = await this.executeCloneRequest()

      if (isNil(jobRunId)) {
        await this.handleCompletion()
        return
      }

      const handler = new MessageBusJobHandler({
        jobRunId,
        title: (job: MessageBusJob) => {
          if (job.status === JobStatus.RUNNING && job.currentStep === 2) {
            return t('jobs.clone-job.step2.title')
          }
          return this.title
        },
        stepTracker: new ChildJobStepTracker(),
        progressCalculator: new StepCompletionCalculator(),
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

  protected abstract executeCloneRequest (): Promise<number | null>

  protected async handleCompletion (): Promise<void> {
    if (isString(this.treeId) && isString(this.nodeId)) {
      store.dispatch(setNodeFetching({ treeId: this.treeId, nodeId: this.nodeId, isFetching: false }))
    }

    store.dispatch(refreshNodeChildren({
      elementType: this.elementType,
      nodeId: this.targetId.toString()
    }))
  }

  protected async handleJobFailure (error: any): Promise<void> {
    if (isString(this.treeId) && isString(this.nodeId)) {
      store.dispatch(setNodeFetching({ treeId: this.treeId, nodeId: this.nodeId, isFetching: false }))
    }

    console.error('Clone job failed:', error)
  }
}
