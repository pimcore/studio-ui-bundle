/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { AbstractJobRunIdHandler } from '@Pimcore/modules/background-processor/handlers/abstract-job-run-id-handler'
import { type AbstractMercureMessage } from '@Pimcore/modules/background-processor/process/abstract-mercure-process'
import { store } from '@Pimcore/app/store'
import { jobReceived, jobUpdated } from '@Pimcore/modules/execution-engine/execution-engine-slice'
import { refreshNodeChildren } from '@Pimcore/components/element-tree/element-tree-slice'
import { JobStatus, type AbstractJob } from '@Pimcore/modules/execution-engine/jobs/abstact-job'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { useGlobalMessageRegistry } from '@Pimcore/modules/background-processor/hooks/use-global-message-registry'
import { createDocumentCloneBackgroundJob } from '@Pimcore/modules/execution-engine/jobs/document-clone-background/factory'
import { topics } from '@Pimcore/modules/execution-engine/topics'
import { isNil } from 'lodash'

export interface DocumentCloneJobConfig {
  title: string
  parentFolder: string
  elementType: ElementType
  sourceId: number
  targetId: number
  parameters?: any
  isReplace?: boolean
  onProgress?: (progress: { currentStep: number, totalSteps: number, message: string }) => void
  onComplete?: (success: boolean) => void
  onCleanup?: () => void
}

/**
 * Concrete implementation of a job handler for document clone operations
 * Handles all Redux updates and tree refreshing internally
 */
export class DocumentCloneJobHandler extends AbstractJobRunIdHandler {
  /**
   * Topics that document clone jobs need to listen to
   */
  static readonly TOPICS = [
    topics['handler-progress'],
    topics['cloning-finished'],
    topics['job-finished-with-errors'],
    topics['job-failed']
  ]

  private readonly config: DocumentCloneJobConfig
  private readonly job: AbstractJob

  constructor (
    jobRunId: string | number,
    config: DocumentCloneJobConfig
  ) {
    super(jobRunId)
    this.config = config

    // Create the Redux job internally
    this.job = createDocumentCloneBackgroundJob({
      title: config.title,
      parentFolder: config.parentFolder,
      elementType: config.elementType,
      sourceId: config.sourceId,
      targetId: config.targetId,
      parameters: config.parameters,
      isReplace: config.isReplace,
      action: async () => 0, // Placeholder action
      topics: ['document-clone']
    })
  }

  public onRegister (): void {
    console.log('📝 DocumentCloneJobHandler: Registering job in Redux store')

    // Add the job to Redux when handler is registered
    store.dispatch(jobReceived(this.job))
  }

  public handleMessage (message: AbstractMercureMessage): void {
    console.log('📨 DocumentCloneJobHandler: Processing message for job', this.jobRunId, message.type)

    try {
      if (message.type === 'update') {
        const data = message.payload as any

        // Validate message payload
        if (isNil(data)) {
          console.warn('⚠️ DocumentCloneJobHandler: Received update message with no payload')
          return
        }

        // Handle status updates first
        if (data?.status !== undefined) {
          this.handleStatusUpdate(data)
        }

        // Handle progress updates
        if (data?.progress !== undefined || (data?.currentStep !== undefined && data?.totalSteps !== undefined)) {
          this.handleProgressUpdate(data)
        }
      }
    } catch (error) {
      console.error('❌ DocumentCloneJobHandler: Error processing message for job', this.jobRunId, error)

      // Don't re-throw the error to prevent it from bubbling up to the registry
      // The job should continue processing other messages
    }
  }

  private handleStatusUpdate (data: any): void {
    console.log('🎯 Job status update:', data.status)
    const isComplete = ['finished', 'finished_with_errors', 'failed'].includes(String(data.status))

    if (isComplete) {
      // Refresh tree for completion states
      store.dispatch(refreshNodeChildren({
        nodeId: this.config.parentFolder,
        elementType: this.config.elementType
      }))

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
        id: this.job.id,
        changes: { status: jobStatus }
      }))

      // Unregister handler from registry
      const messageRegistry = useGlobalMessageRegistry()
      messageRegistry.unregisterHandler(String(this.jobRunId))
    } else if (data.status === 'running') {
      // Set job to running when it starts processing
      console.log('🏃 Job is now running')
      store.dispatch(jobUpdated({
        id: this.job.id,
        changes: { status: JobStatus.RUNNING }
      }))
    }
  }

  private handleProgressUpdate (data: any): void {
    let calculatedProgress: number

    if (data?.currentStep !== undefined && data?.totalSteps !== undefined) {
      // Validate step data
      if (data.totalSteps <= 0 || data.currentStep < 1 || data.currentStep > data.totalSteps) {
        console.warn('⚠️ Invalid step data:', { currentStep: data.currentStep, totalSteps: data.totalSteps })
        return
      }

      // Calculate percentage based on currentStep/totalSteps for multi-step jobs
      calculatedProgress = Math.round(((data.currentStep - 1) / data.totalSteps) * 100)
      console.log('📈 Multi-step progress: Step', data.currentStep, 'of', data.totalSteps, '=', calculatedProgress + '%')
    } else {
      // Use direct progress value if available
      calculatedProgress = Math.max(0, Math.min(100, data.progress as number)) // Clamp between 0-100
      console.log('📈 Direct progress:', calculatedProgress + '%')
    }

    // If we get progress but haven't set status to running yet, set it now
    if (isNil(data?.status)) {
      console.log('🏃 Job appears to be running (received progress update)')
      store.dispatch(jobUpdated({
        id: this.job.id,
        changes: { status: JobStatus.RUNNING }
      }))
    }

    store.dispatch(jobUpdated({
      id: this.job.id,
      changes: {
        config: {
          ...(this.job.config ?? {}),
          progress: calculatedProgress,
          lastUpdated: Date.now() // Force re-render by changing reference
        }
      }
    }))
  }

  onUnregister (): void {
    console.log('🧹 Unregistering job handler', this.jobRunId)
  }
}
