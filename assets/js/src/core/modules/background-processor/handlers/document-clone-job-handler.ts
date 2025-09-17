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
import { jobReceived, jobUpdated } from '@Pimcore/modules/execution-engine/execution-engine-slice'
import { refreshNodeChildren } from '@Pimcore/components/element-tree/element-tree-slice'
import { JobStatus } from '@Pimcore/modules/execution-engine/jobs/abstact-job'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type BackgroundJobRegistry } from '@Pimcore/modules/background-processor/services/background-job-registry'
import { createDocumentCloneBackgroundJob } from '@Pimcore/modules/execution-engine/jobs/document-clone-background/factory'

export interface DocumentCloneJobConfig {
  title: string
  parentFolder: string
  elementType: ElementType
  sourceId: number
  targetId: number
  parameters?: any
  isReplace?: boolean
}

/**
 * Concrete implementation of a job handler for document clone operations
 * Handles all Redux updates and tree refreshing internally
 */
export class DocumentCloneJobHandler extends AbstractJobRunIdHandler {
  private readonly config: DocumentCloneJobConfig
  private readonly job: any

  constructor(
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

  public onRegister(): void {
    console.log('📝 DocumentCloneJobHandler: Registering job in Redux store')
    // Add the job to Redux when handler is registered
    store.dispatch(jobReceived(this.job))
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
            id: this.job.id, 
            changes: { status: jobStatus } 
          }))
          
          // Unregister handler from registry
          const jobRegistry = container.get<BackgroundJobRegistry>(serviceIds.backgroundJobRegistry)
          jobRegistry.unregisterHandler(this.jobRunId)
        } else if (data.status === 'running') {
          // Set job to running when it starts processing
          console.log('🏃 Job is now running')
          store.dispatch(jobUpdated({ 
            id: this.job.id, 
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
            id: this.job.id, 
            changes: { status: JobStatus.RUNNING } 
          }))
        }
        
        store.dispatch(jobUpdated({
          id: this.job.id,
          changes: {
            config: {
              ...this.job.config,
              progress: data.progress as number
            }
          }
        }))
      }
    }
  }

  onUnregister(): void {
    console.log('🧹 Unregistering job handler', this.jobRunId)
  }
}
