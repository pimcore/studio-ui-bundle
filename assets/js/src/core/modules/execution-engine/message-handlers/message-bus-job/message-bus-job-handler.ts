/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/* eslint-disable max-lines */
import { AbstractMessageHandler } from '@Pimcore/modules/global-message-bus/message-handlers/abstract-message-handler'
import { type AbstractMercureMessage } from '@Pimcore/modules/background-processor/process/abstract-mercure-process'
import { store } from '@Pimcore/app/store'
import { jobReceived, jobUpdated } from '@Pimcore/modules/execution-engine/execution-engine-slice'
import { JobStatus } from '@Pimcore/modules/execution-engine/jobs/abstact-job'
import { getUniqueId } from '@Pimcore/modules/execution-engine/jobs/factory-helper'
import { isFunction, isNil, throttle } from 'lodash'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type GlobalMessageBus } from '@Pimcore/modules/global-message-bus/services/global-message-bus'
import { type JobButtonCustomizationContext } from './message-bus-job-notification'
import { JobRunPolling, type JobStatusUpdateData } from './job-run-polling'
import { type MessageBusJob, type JobCompletionData, type MessageBusJobHandlerOptions } from './message-bus-job-handler-types'
import { DefaultStepTracker } from './step-tracker/default-step-tracker'
import { type StepTracker } from './step-tracker/step-tracker.interface'
import { ProgressFieldCalculator } from './progress-calculator/progress-field-calculator'
import { PROGRESS_NO_UPDATE, type ProgressCalculator } from './progress-calculator/progress-calculator.interface'

export type { MessageBusJob, JobCompletionData, MessageBusJobHandlerOptions } from './message-bus-job-handler-types'

export class MessageBusJobHandler extends AbstractMessageHandler {
  private jobRunId: number
  private job: MessageBusJob | null = null
  private readonly onJobCompletion?: (data: JobCompletionData) => void | Promise<void>
  private readonly onRetry?: () => void | Promise<void>
  private readonly onCustomizeButtons?: (context: JobButtonCustomizationContext) => void

  private readonly stepTracker: StepTracker
  private readonly stepDescriptions?: Record<number, string>
  private readonly progressCalculator: ProgressCalculator
  private lastProgressValue: number = -1
  private readonly title: string | ((job: MessageBusJob) => string)
  private polling: JobRunPolling

  private readonly throttledProgressUpdate = throttle((progress: number | null, data: any) => {
    this.performProgressUpdate(progress, data)
    if (progress !== null) {
      this.lastProgressValue = progress
    }
  }, 250, { leading: true, trailing: true })

  constructor (options: MessageBusJobHandlerOptions) {
    super()
    this.jobRunId = options.jobRunId
    this.title = options.title
    this.stepDescriptions = options.stepDescriptions
    this.stepTracker = options.stepTracker ?? new DefaultStepTracker()
    this.progressCalculator = options.progressCalculator ?? new ProgressFieldCalculator()

    this.onJobCompletion = options.onJobCompletion
    this.onRetry = options.onRetry
    this.onCustomizeButtons = options.onCustomizeButtons

    this.polling = new JobRunPolling(this.jobRunId, {
      onStatusUpdate: async (data) => { await this.handlePolledStatusUpdate(data) },
      onError: (error) => { console.error('Job run polling error:', error) }
    })
  }

  public shouldHandle (message: AbstractMercureMessage): boolean {
    const messageJobRunId = (message.payload as any)?.jobRunId
    return !isNil(messageJobRunId) && String(messageJobRunId) === String(this.jobRunId)
  }

  public getId (): number {
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

        this.polling.notifyUpdate()

        await this.processUpdate(data)
      }
    } catch (error) {
      console.error('Error in message handling: ', error)
    }
  }

  public onUnregister (): void {
    this.throttledProgressUpdate.cancel()
    this.polling.destroy()
  }

  private getTitle (job: MessageBusJob): string {
    if (isFunction(this.title)) {
      return this.title(job)
    }
    return this.title
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
    const { currentStep, totalSteps } = this.stepTracker.state

    const job: MessageBusJob = {
      id: getUniqueId(),
      type: 'default-message-bus',
      title: '',
      status: JobStatus.QUEUED,
      progress: 0,
      currentStep: this.stepTracker.showStepLabel ? currentStep : undefined,
      totalSteps: this.stepTracker.showStepLabel ? totalSteps : undefined,
      stepDescriptionKey: this.stepDescriptions?.[currentStep],
      onRetry: this.onRetry,
      onCustomizeButtons: this.onCustomizeButtons,
      jobRunId: this.jobRunId
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

  private transitionToChildJob (newJobRunId: number): void {
    const oldJobRunId = this.jobRunId

    this.jobRunId = newJobRunId

    const newState = this.stepTracker.onChildJobTransition()

    // Re-register handler with new ID
    const messageBus = container.get<GlobalMessageBus>(serviceIds.globalMessageBus)
    messageBus.unregisterHandler(oldJobRunId)
    messageBus.registerHandler(this)

    // Recreate polling for the child job
    this.polling = new JobRunPolling(this.jobRunId, {
      onStatusUpdate: async (data) => { await this.handlePolledStatusUpdate(data) },
      onError: (error) => { console.error('Job run polling error:', error) }
    })

    this.lastProgressValue = -1
    this.progressCalculator.onStepChange?.()

    this.updateJob({
      status: JobStatus.RUNNING,
      progress: 0,
      ...(this.stepTracker.showStepLabel && {
        currentStep: newState.currentStep,
        totalSteps: newState.totalSteps,
        stepDescriptionKey: this.stepDescriptions?.[newState.currentStep]
      }),
      jobRunId: newJobRunId
    })
  }

  private async handleStatusUpdate (data: any): Promise<boolean> {
    if (data.status === 'finished' && !isNil(data.messages?.jobRunChildId) && String(data.messages.jobRunChildId) !== String(this.jobRunId)) {
      this.transitionToChildJob(Number(data.messages.jobRunChildId))
      return true
    }

    const isComplete = ['finished', 'finished_with_errors', 'failed'].includes(String(data.status))

    if (isComplete) {
      const statusMap: Record<string, JobStatus> = {
        finished: JobStatus.SUCCESS,
        finished_with_errors: JobStatus.FINISHED_WITH_ERRORS,
        failed: JobStatus.FAILED
      }
      const jobStatus = statusMap[data.status] ?? JobStatus.FAILED

      const completionData: JobCompletionData = {
        isSuccessful: String(data.status) === 'finished',
        isFinished: ['finished', 'finished_with_errors'].includes(String(data.status)),
        isFailed: String(data.status) === 'failed',
        status: jobStatus,
        payload: data
      }

      await this.handleJobCompletion(completionData)

      const messages = Array.isArray(data.messages) ? data.messages as string[] : undefined
      this.updateJob({ status: jobStatus, messages })

      const messageBus = container.get<GlobalMessageBus>(serviceIds.globalMessageBus)
      messageBus.unregisterHandler(this.jobRunId)
    } else if (data.status === 'running') {
      this.updateJob({ status: JobStatus.RUNNING })
    }

    return false
  }

  private handleProgressUpdate (progress: number | null, data: any): void {
    if (progress !== null) {
      if (progress < this.lastProgressValue && progress !== 0) {
        return
      }

      if (Math.abs(progress - this.lastProgressValue) < 1 && progress !== 100) {
        return
      }
    }

    this.throttledProgressUpdate(progress, data)
  }

  private performProgressUpdate (progress: number | null, data: any): void {
    if (isNil(data?.status)) {
      this.updateJob({ status: JobStatus.RUNNING })
    }

    if (progress === null) {
      this.updateJob({ indeterminate: true })
    } else {
      this.updateJob({ indeterminate: false, progress })
    }
  }

  private async handlePolledStatusUpdate (data: JobStatusUpdateData): Promise<void> {
    const polledData = {
      status: data.status,
      currentStep: data.currentStep,
      totalSteps: data.totalSteps,
      messages: !isNil(data.currentMessage) ? [data.currentMessage] : undefined
    }

    await this.processUpdate(polledData)
  }

  private async processUpdate (data: any): Promise<void> {
    if (!isNil(data?.status)) {
      const transitioned = await this.handleStatusUpdate(data)
      if (transitioned) {
        return
      }
    }

    // Notify the step tracker of incoming backend step data
    if (!isNil(data?.currentStep)) {
      const newState = this.stepTracker.onBackendStep(data.currentStep as number)

      if (newState !== null) {
        // Step advanced — notify calculator and reset progress tracking
        this.progressCalculator.onStepChange?.()
        this.lastProgressValue = -1

        if (this.stepTracker.showStepLabel) {
          // Also pick up totalSteps from backend if the tracker now knows it
          this.updateJob({
            currentStep: newState.currentStep,
            totalSteps: newState.totalSteps,
            stepDescriptionKey: this.stepDescriptions?.[newState.currentStep]
          })
        }
      }
    }

    // For DefaultStepTracker: pick up totalSteps from backend on first message
    if (!isNil(data?.totalSteps) && this.stepTracker.showStepLabel) {
      const currentTrackerState = this.stepTracker.state
      if (isNil(currentTrackerState.totalSteps) && 'onBackendTotalSteps' in this.stepTracker) {
        (this.stepTracker as any).onBackendTotalSteps(data.totalSteps as number)
        this.updateJob({ totalSteps: data.totalSteps as number })
      }
    }

    const { currentStep, totalSteps } = this.stepTracker.state
    const result = this.progressCalculator.calculateProgress(data, {
      currentStep,
      totalSteps,
      lastProgressValue: this.lastProgressValue
    })

    if (result !== PROGRESS_NO_UPDATE) {
      this.handleProgressUpdate(result, data)
    }
  }
}
