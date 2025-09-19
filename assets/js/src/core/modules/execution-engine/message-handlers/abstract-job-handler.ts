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

  // Progress throttling properties - track last progress to avoid micro-updates
  private lastProgressValue: number = -1

  // Throttled progress update function - max 1 update per 250ms, with leading and trailing execution
  private readonly throttledProgressUpdate = throttle((progress: number, data: any) => {
    console.log(`[JobHandler] Triggering throttled progress update: ${progress}% (job: ${this.jobRunId})`)
    this.performProgressUpdate(progress, data)
    this.lastProgressValue = progress
  }, 1000, { leading: true, trailing: true })

  constructor (options: DefaultJobHandlerOptions<TConfig>) {
    super()
    this.jobRunId = options.jobRunId
    this.config = options.config

    // Use constructor parameters or defaults
    this.jobType = options.jobType ?? 'default'
    this.onJobCompletion = options.onJobCompletion

    // Merge default topics with additional topics, ensuring uniqueness
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
    if (this.job === null) {
      this.job = this.createJob()
    }
    return this.job
  }

  /**
   * Create the job object for this handler
   */
  protected createJob (): AbstractJob {
    return {
      id: getUniqueId(),
      action: async () => 0, // Placeholder action
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

        // Handle status updates first
        if (data?.status !== undefined) {
          await this.handleStatusUpdate(data)
        }

        // Handle progress updates
        const progress = this.calculateProgress(data)
        if (progress !== null) {
          this.handleProgressUpdate(progress, data)
        }
      }
    } catch (error) {
      // Don't re-throw to prevent bubbling up to registry
    }
  }

  private async handleStatusUpdate (data: any): Promise<void> {
    const isComplete = ['finished', 'finished_with_errors', 'failed'].includes(String(data.status))

    if (isComplete) {
      // Handle job completion
      const success = data.status === 'finished'
      await this.handleJobCompletion(success)

      // Map backend status to JobStatus
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

      // Update job status
      store.dispatch(jobUpdated({
        id: this.getJob().id,
        changes: { status: jobStatus }
      }))

      // Unregister handler from registry
      console.log(`[JobHandler] Job completed, unregistering handler (job: ${this.jobRunId})`)
      const messageRegistry = container.get<GlobalMessageBus>(serviceIds.globalMessageBus)
      messageRegistry.unregisterHandler(this.jobRunId) // Use same type as getId()
    } else if (data.status === 'running') {
      store.dispatch(jobUpdated({
        id: this.getJob().id,
        changes: { status: JobStatus.RUNNING }
      }))
    }
  }

  private handleProgressUpdate (progress: number, data: any): void {
    // Skip micro-updates - only update if progress changed by at least 2%
    if (Math.abs(progress - this.lastProgressValue) < 2 && progress !== 100) {
      return
    }

    // All significant updates go through throttling - first one executes immediately due to leading: true
    this.throttledProgressUpdate(progress, data)
  }

  private performProgressUpdate (progress: number, data: any): void {
    console.time(`[JobHandler] Redux dispatch progress ${this.jobRunId}`)

    // If we get progress but haven't set status to running yet, set it now
    if (isNil(data?.status)) {
      console.time(`[JobHandler] Redux dispatch status ${this.jobRunId}`)
      console.log('[JobHandler] Dispatching status update:', { jobId: this.getJob().id, status: JobStatus.RUNNING })
      store.dispatch(jobUpdated({
        id: this.getJob().id,
        changes: { status: JobStatus.RUNNING }
      }))
      console.timeEnd(`[JobHandler] Redux dispatch status ${this.jobRunId}`)
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
    console.log('[JobHandler] Dispatching progress update:', action)
    store.dispatch(action)

    console.timeEnd(`[JobHandler] Redux dispatch progress ${this.jobRunId}`)
  }

  public onUnregister (): void {
    // Cancel any pending throttled updates to prevent memory leaks
    console.log(`[JobHandler] Cancelling throttled updates (job: ${this.jobRunId})`)
    this.throttledProgressUpdate.cancel()
  }
}
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */
/**
 * Base configuration interface that all job handlers need
 */
export interface BaseJobConfig {
  title: string
  progress?: number
}

/**
 * Constructor options for DefaultJobHandler
 */
export interface DefaultJobHandlerOptions<TConfig extends BaseJobConfig> {
  jobRunId: string | number
  config: TConfig
  jobType?: string
  onJobCompletion?: (data: any) => void | Promise<void>
  additionalTopics?: string[]
}
