/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { AbstractMessageHandler } from '@Pimcore/modules/global-message-bus/message-handlers/abstract-message-handler'
import { type AbstractMercureMessage } from '@Pimcore/modules/background-processor/process/abstract-mercure-process'
import { store } from '@Pimcore/app/store'
import { jobReceived, jobUpdated } from '@Pimcore/modules/execution-engine/execution-engine-slice'
import { JobStatus, type AbstractJob } from '@Pimcore/modules/execution-engine/jobs/abstact-job'
import { getUniqueId } from '@Pimcore/modules/execution-engine/jobs/factory-helper'
import { isNil, throttle } from 'lodash'
import { type NonEmptyArray } from '@Pimcore/types/non-empty-array'
import { defaultTopics } from '@Pimcore/modules/execution-engine/topics'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type GlobalMessageBus } from '@Pimcore/modules/global-message-bus/services/global-message-bus'

/**
 * Default job handler that provides common functionality for job management, Redux integration, status mapping, and progress handling
 * Can be used directly or extended by specific job handlers
 */
export class DefaultJobHandler<TConfig extends BaseJobConfig> extends AbstractMessageHandler {
  protected readonly jobRunId: string | number
  protected job: AbstractJob | null = null
  protected readonly config: TConfig
  protected readonly topics: NonEmptyArray<string>
  protected readonly jobType: string
  protected readonly onJobCompletion?: (data: any) => void | Promise<void>

  // Progress throttling properties
  private lastProgressValue: number = -1

  private readonly throttledProgressUpdate = throttle((progress: number, data: any) => {
    this.performProgressUpdate(progress, data)
    this.lastProgressValue = progress
  }, 250, { leading: true, trailing: true })

  constructor (options: DefaultJobHandlerOptions<TConfig>) {
    super()
    this.jobRunId = options.jobRunId
    this.config = options.config

    this.jobType = options.jobType ?? 'default'
    this.onJobCompletion = options.onJobCompletion

    const additionalTopics = options.additionalTopics ?? []
    const allTopics = [...new Set([...defaultTopics, ...additionalTopics])]
    this.topics = allTopics as NonEmptyArray<string>
  }

  /**
   * Calculate progress from message data
   * Default implementation handles direct progress values (0-100)
   * Override in subclasses for different progress formats (e.g., step-based)
   */
  protected calculateProgress (data: any): number | null {
    if (data?.progress !== undefined) {
      return Math.max(0, Math.min(100, data.progress as number))
    }

    return null
  }

  /**
   * Handle completion of the job (refresh UI, etc.)
   * Uses the configurable completion handler if provided
   */
  protected async handleJobCompletion (data: any): Promise<void> {
    if (this.onJobCompletion !== undefined) {
      await this.onJobCompletion(data)
    }
  }

  public shouldHandle (message: AbstractMercureMessage): boolean {
    const messageJobRunId = (message.payload as any)?.jobRunId
    return messageJobRunId !== undefined && messageJobRunId === this.jobRunId
  }

  public getId (): string | number {
    return this.jobRunId
  }

  /**
   * Get the job, creating it if necessary
   */
  protected getJob (): AbstractJob {
    this.job = this.job ?? this.createJob()
    return this.job
  }

  /**
   * Create the job object for this handler
   */
  protected createJob (): AbstractJob {
    return {
      id: getUniqueId(),
      action: async () => 0,
      type: this.jobType,
      title: this.config.title,
      status: JobStatus.QUEUED,
      topics: this.topics,
      config: {
        ...this.config,
        progress: this.config.progress ?? 0
      }
    }
  }

  public onRegister (): void {
    store.dispatch(jobReceived(this.getJob()))
  }

  public async handleMessage (message: AbstractMercureMessage): Promise<void> {
    try {
      if (message.type === 'update') {
        const data = message.payload as any

        if (isNil(data)) {
          return
        }

        if (data?.status !== undefined) {
          await this.handleStatusUpdate(data)
        }

        const progress = this.calculateProgress(data)
        if (progress !== null) {
          this.handleProgressUpdate(progress, data)
        }
      }
    } catch (error) {
      console.error('Error in message handling: ', error)
    }
  }

  private async handleStatusUpdate (data: any): Promise<void> {
    const isComplete = ['finished', 'finished_with_errors', 'failed'].includes(String(data.status))

    if (isComplete) {
      const success = data.status === 'finished'
      await this.handleJobCompletion(success)

      let jobStatus: JobStatus
      switch (data.status) {
        case 'finished':
          jobStatus = JobStatus.SUCCESS
          break
        case 'finished_with_errors':
          jobStatus = JobStatus.FINISHED_WITH_ERRORS
          break
        case 'failed':
          jobStatus = JobStatus.FAILED
          break
        default:
          jobStatus = JobStatus.FAILED
      }

      store.dispatch(jobUpdated({
        id: this.getJob().id,
        changes: { status: jobStatus }
      }))

      const messageRegistry = container.get<GlobalMessageBus>(serviceIds.globalMessageBus)
      messageRegistry.unregisterHandler(this.jobRunId)
    } else if (data.status === 'running') {
      store.dispatch(jobUpdated({
        id: this.getJob().id,
        changes: { status: JobStatus.RUNNING }
      }))
    }
  }

  private handleProgressUpdate (progress: number, data: any): void {
    if (Math.abs(progress - this.lastProgressValue) < 1 && progress !== 100) {
      return
    }

    this.throttledProgressUpdate(progress, data)
  }

  private performProgressUpdate (progress: number, data: any): void {
    if (isNil(data?.status)) {
      store.dispatch(jobUpdated({
        id: this.getJob().id,
        changes: { status: JobStatus.RUNNING }
      }))
    }

    const job = this.getJob()
    const action = jobUpdated({
      id: job.id,
      changes: {
        config: {
          ...(job.config ?? {}),
          progress
        }
      }
    })
    store.dispatch(action)
  }

  public onUnregister (): void {
    this.throttledProgressUpdate.cancel()
  }
}

export interface BaseJobConfig {
  title: string
  progress?: number
}

export interface DefaultJobHandlerOptions<TConfig extends BaseJobConfig> {
  jobRunId: string | number
  config: TConfig
  jobType?: string
  onJobCompletion?: (data: any) => void | Promise<void>
  additionalTopics?: string[]
}
