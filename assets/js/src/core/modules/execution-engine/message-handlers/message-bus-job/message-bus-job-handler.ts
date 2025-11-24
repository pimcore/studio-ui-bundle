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
import { isFunction, isNil, throttle } from 'lodash'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type GlobalMessageBus } from '@Pimcore/modules/global-message-bus/services/global-message-bus'
import { type JobButtonCustomizationContext } from './message-bus-job-notification'

/**
 * Default job handler that provides common functionality for job management, Redux integration, status mapping, and progress handling
 * Can be used directly or extended by specific job handlers
 */
export class MessageBusJobHandler extends AbstractMessageHandler {
  private jobRunId: string | number
  private job: MessageBusJob | null = null
  private readonly onJobCompletion?: (data: JobCompletionData) => void | Promise<void>
  private readonly onRetry?: () => void | Promise<void>
  private readonly onCustomizeButtons?: (context: JobButtonCustomizationContext) => void

  private currentStep: number = 1
  private readonly totalSteps?: number
  private lastProgressValue: number = -1
  private readonly title: string | ((job: MessageBusJob) => string)

  private readonly throttledProgressUpdate = throttle((progress: number, data: any) => {
    this.performProgressUpdate(progress, data)
    this.lastProgressValue = progress
  }, 250, { leading: true, trailing: true })

  constructor (options: MessageBusJobHandlerOptions) {
    super()
    this.jobRunId = options.jobRunId
    this.totalSteps = options.totalSteps
    this.title = options.title

    this.onJobCompletion = options.onJobCompletion
    this.onRetry = options.onRetry
    this.onCustomizeButtons = options.onCustomizeButtons
  }

  public shouldHandle (message: AbstractMercureMessage): boolean {
    const messageJobRunId = (message.payload as any)?.jobRunId
    return !isNil(messageJobRunId) && String(messageJobRunId) === String(this.jobRunId)
  }

  public getId (): string | number {
    return this.jobRunId
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

        if (!isNil(data?.status)) {
          await this.handleStatusUpdate(data)
        }

        const progress = this.calculateProgress(data)
        if (!isNil(progress)) {
          this.handleProgressUpdate(progress, data)
        }
      }
    } catch (error) {
      console.error('Error in message handling: ', error)
    }
  }

  public onUnregister (): void {
    this.throttledProgressUpdate.cancel()
  }

  private getTitle (job: MessageBusJob): string {
    if (isFunction(this.title)) {
      return this.title(job)
    }
    return this.title
  }

  /**
   * Calculate progress percent from message data
   * Handles both step-based progress (if totalSteps > 1) and direct progress values (0-100)
   */
  private calculateProgress (data: any): number | null {
    if (!isNil(data?.currentStep) && !isNil(data?.totalSteps) && data.totalSteps > 1) {
      return Math.round(((data.currentStep - 1) / data.totalSteps) * 100)
    }

    if (!isNil(data?.progress)) {
      return Math.max(0, Math.min(100, data.progress as number))
    }

    return null
  }

  private async handleJobCompletion (data: JobCompletionData): Promise<void> {
    if (!isNil(this.onJobCompletion)) {
      await this.onJobCompletion(data)
    }
  }

  private getJob (): MessageBusJob {
    this.job = this.job ?? this.createJob()
    return this.job
  }

  private createJob (): MessageBusJob {
    const job: MessageBusJob = {
      id: getUniqueId(),
      type: 'default-message-bus',
      title: '',
      status: JobStatus.QUEUED,
      progress: 0,
      currentStep: this.currentStep,
      totalSteps: this.totalSteps,
      onRetry: this.onRetry,
      onCustomizeButtons: this.onCustomizeButtons
    }

    job.title = this.getTitle(job)

    return job
  }

  private updateJob (changes: Partial<MessageBusJob>): void {
    const job = this.getJob()
    const nextJobState = { ...job, ...changes }

    const title = this.getTitle(nextJobState)
    if (title !== nextJobState.title) {
      nextJobState.title = title
      changes.title = title
    }

    this.job = nextJobState

    store.dispatch(jobUpdated({
      id: job.id,
      changes
    }))
  }

  private transitionToChildJob (newJobRunId: string | number): void {
    const oldJobRunId = this.jobRunId

    this.jobRunId = newJobRunId
    if (isNil(this.totalSteps) || this.currentStep < this.totalSteps) {
      this.currentStep++
    }

    // Re-register handler with new ID to ensure proper unregistration later
    const messageBus = container.get<GlobalMessageBus>(serviceIds.globalMessageBus)
    messageBus.unregisterHandler(oldJobRunId)
    messageBus.registerHandler(this)

    this.lastProgressValue = -1

    this.updateJob({
      status: JobStatus.RUNNING,
      progress: 0,
      currentStep: this.currentStep
    })
  }

  private async handleStatusUpdate (data: any): Promise<void> {
    if (data.status === 'finished' && !isNil(data.messages?.jobRunChildId) && String(data.messages.jobRunChildId) !== String(this.jobRunId)) {
      this.transitionToChildJob(data.messages.jobRunChildId as string | number)
      return
    }

    const isComplete = ['finished', 'finished_with_errors', 'failed'].includes(String(data.status))

    if (isComplete) {
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

      const completionData: JobCompletionData = {
        isSuccessful: String(data.status) === 'finished',
        isFinished: ['finished', 'finished_with_errors'].includes(String(data.status)),
        isFailed: String(data.status) === 'failed',
        status: jobStatus,
        payload: data
      }

      await this.handleJobCompletion(completionData)

      this.updateJob({ status: jobStatus, messages: data.messages })

      const messageBus = container.get<GlobalMessageBus>(serviceIds.globalMessageBus)
      messageBus.unregisterHandler(this.jobRunId)
    } else if (data.status === 'running') {
      this.updateJob({ status: JobStatus.RUNNING })
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
      this.updateJob({ status: JobStatus.RUNNING })
    }

    this.updateJob({
      progress
    })
  }
}

export interface MessageBusJob extends AbstractJob {
  progress?: number
  currentStep?: number
  totalSteps?: number
  onRetry?: () => void | Promise<void>
  onCustomizeButtons?: (context: JobButtonCustomizationContext) => void
  messages?: string[]
}

export interface JobCompletionData {
  isSuccessful: boolean
  isFinished: boolean
  isFailed: boolean
  status: JobStatus
  payload: any
}

export interface MessageBusJobHandlerOptions {
  jobRunId: string | number
  title: string | ((job: MessageBusJob) => string)
  totalSteps?: number
  onJobCompletion?: (data: JobCompletionData) => void | Promise<void>
  onRetry?: () => void | Promise<void>
  onCustomizeButtons?: (context: JobButtonCustomizationContext) => void
}
