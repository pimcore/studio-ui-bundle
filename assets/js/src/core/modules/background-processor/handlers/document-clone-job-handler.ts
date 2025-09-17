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
import { store } from '@Pimcore/app/store'
import { jobUpdated } from '@Pimcore/modules/execution-engine/execution-engine-slice'
import { refreshNodeChildren } from '@Pimcore/components/element-tree/element-tree-slice'
import { JobStatus } from '@Pimcore/modules/execution-engine/jobs/abstact-job'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type BackgroundJobRegistry } from '@Pimcore/modules/background-processor/services/background-job-registry'

export interface DocumentCloneJobConfig {
  jobId: number
  parentFolder: string
  elementType: ElementType
  jobConfig: any // The job.config object for progress updates
}

/**
 * Concrete implementation of a job handler for document clone operations
 * Handles all Redux updates and tree refreshing internally
 */
export class DocumentCloneJobHandler extends AbstractJobRunIdHandler {
  private readonly config: DocumentCloneJobConfig

  constructor(
    jobRunId: string | number,
    config: DocumentCloneJobConfig,
    customCleanup?: () => void
  ) {
    super(jobRunId)
    this.config = config
    
    if (customCleanup) {
      this.cleanup = customCleanup
    }
  }

  public handleMessage(message: any): void {
    console.log('📨 DocumentCloneJobHandler: Processing message for job', this.jobRunId, message.type)
    
    if (message.type === 'update') {
      const data = message.payload

      // Handle status updates first
      if (data?.status !== undefined) {
        console.log('🎯 Job status update:', data.status)
        const isComplete = ['finished', 'finished_with_errors', 'failed'].includes(data.status)
        
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
            id: this.config.jobId, 
            changes: { status: jobStatus } 
          }))
          
          // Unregister handler from registry
          const jobRegistry = container.get<BackgroundJobRegistry>(serviceIds.backgroundJobRegistry)
          jobRegistry.unregisterHandler(this.jobRunId)
        } else if (data.status === 'running') {
          // Set job to running when it starts processing
          console.log('🏃 Job is now running')
          store.dispatch(jobUpdated({ 
            id: this.config.jobId, 
            changes: { status: JobStatus.RUNNING } 
          }))
        }
      }

      // Handle progress updates
      if (data?.progress !== undefined) {
        console.log('📈 Updating progress to:', data.progress)
        
        // If we get progress but haven't set status to running yet, set it now
        if (!data?.status) {
          console.log('🏃 Job appears to be running (received progress update)')
          store.dispatch(jobUpdated({ 
            id: this.config.jobId, 
            changes: { status: JobStatus.RUNNING } 
          }))
        }
        
        store.dispatch(jobUpdated({
          id: this.config.jobId,
          changes: {
            config: {
              ...this.config.jobConfig,
              progress: data.progress as number
            }
          }
        }))
      }
    }
  }

  cleanup(): void {
    console.log('🧹 Cleaning up job', this.jobRunId)
  }
}
