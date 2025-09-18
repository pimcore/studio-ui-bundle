/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { AbstractMessageHandler } from '@Pimcore/modules/global-message-bus/handlers/abstract/abstract-message-handler'
import { type AbstractMercureMessage } from '@Pimcore/modules/background-processor/process/abstract-mercure-process'
import { store } from '@Pimcore/app/store'
import { jobReceived, jobUpdated } from '@Pimcore/modules/execution-engine/execution-engine-slice'
import { JobStatus, type AbstractJob } from '@Pimcore/modules/execution-engine/jobs/abstact-job'
import { useGlobalMessageBus } from '@Pimcore/modules/global-message-bus/hooks/use-global-message-bus'
import { getUniqueId } from '@Pimcore/modules/execution-engine/jobs/factory-helper'
import { isNil } from 'lodash'
import { type NonEmptyArray } from '@Pimcore/types/non-empty-array'
import { defaultTopics } from '@Pimcore/modules/execution-engine/topics'

/**
 * Abstract base class for job handlers that need to track progress and handle status updates
 * Provides common functionality for job management, Redux integration, status mapping, and progress handling
 */
export abstract class AbstractJobHandler<TConfig extends BaseJobConfig> extends AbstractMessageHandler {
  protected readonly jobRunId: string | number
  protected job: AbstractJob | null = null
  protected readonly config: TConfig
  protected readonly topics: NonEmptyArray<string>
  protected readonly jobType: string
  protected readonly onJobCompletion?: (data: any) => void | Promise<void>

  constructor (jobRunId: string | number, config: TConfig) {
    super()
    this.jobRunId = jobRunId
    this.config = config
    
    // Get configuration from abstract methods
    this.jobType = this.getJobType()
    this.onJobCompletion = this.getJobCompletion()
    
    // Merge default topics with custom topics, ensuring uniqueness
    const customTopics = this.getCustomTopics()
    const allTopics = [...new Set([...defaultTopics, ...customTopics])]
    this.topics = allTopics as NonEmptyArray<string>
  }

  /**
   * Get the job type string for this handler
   * Must be implemented by subclasses
   */
  protected abstract getJobType (): string

  /**
   * Get custom topics for this handler
   * Must be implemented by subclasses
   */
  protected abstract getCustomTopics (): NonEmptyArray<string>

  /**
   * Get the job completion handler
   * Override in subclasses if needed
   */
  protected getJobCompletion (): ((data: any) => void | Promise<void>) | undefined {
    return undefined
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
      type: this.getJobType(),
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
      const messageRegistry = useGlobalMessageBus()
      messageRegistry.unregisterHandler(String(this.jobRunId))
    } else if (data.status === 'running') {
      store.dispatch(jobUpdated({
        id: this.getJob().id,
        changes: { status: JobStatus.RUNNING }
      }))
    }
  }

  private handleProgressUpdate (progress: number, data: any): void {
    // If we get progress but haven't set status to running yet, set it now
    if (isNil(data?.status)) {
      store.dispatch(jobUpdated({
        id: this.getJob().id,
        changes: { status: JobStatus.RUNNING }
      }))
    }

    const job = this.getJob()
    store.dispatch(jobUpdated({
      id: job.id,
      changes: {
        config: {
          ...(job.config ?? {}),
          progress,
          lastUpdated: Date.now()
        }
      }
    }))
  }

  public onUnregister (): void {
    // Override in subclasses if needed
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

