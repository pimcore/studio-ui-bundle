/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type BackgroundProcessor } from '@Pimcore/modules/background-processor/services/background-processor'
import { type DocumentCloneJobRegistry } from './document-clone-job-registry'
import { createDocumentCloneBackgroundJob } from '@Pimcore/modules/execution-engine/jobs/document-clone-background/factory'
import { JobStatus } from '@Pimcore/modules/execution-engine/jobs/abstact-job'
import { ElementType } from '@Pimcore/types/enums/element/element-type'
import { store } from '@Pimcore/app/store'
import { jobReceived, jobUpdated } from '@Pimcore/modules/execution-engine/execution-engine-slice'
import { refreshNodeChildren } from '@Pimcore/components/element-tree/element-tree-slice'
import { api } from '@Pimcore/modules/document/document-api-slice.gen'

export interface DocumentCloneJobConfig {
  sourceId: number
  targetId: number
  parentFolder: number
  elementType: ElementType
  title: string
  parameters?: any
  isReplace?: boolean
}

/**
 * Start a document clone job - non-hook implementation for use in event handlers
 */
export const startDocumentCloneJob = async (
  config: DocumentCloneJobConfig,
  // Legacy parameters for backward compatibility - these are not used
  documentCloneMutation?: any,
  documentReplaceContentMutation?: any,
  addJob?: any,
  updateJob?: any,
  dispatch?: any
): Promise<void> => {
  console.log('🚀 Starting document clone job with config:', config)
  
  // Get required services from DI container
  const backgroundProcessor = container.get<BackgroundProcessor>(serviceIds.backgroundProcessor)
  const jobRegistry = container.get<DocumentCloneJobRegistry>(serviceIds.documentCloneJobRegistry)
  
  try {
    // Make API call using RTK Query endpoints
    let result: any
    
    if (config.isReplace) {
      console.log('📡 Making document replace content API call')
      result = await store.dispatch(
        api.endpoints.documentReplaceContent.initiate({
          sourceId: config.sourceId,
          targetId: config.targetId
        })
      ).unwrap()
    } else {
      console.log('📡 Making document clone API call')
      result = await store.dispatch(
        api.endpoints.documentClone.initiate({
          id: config.sourceId,
          parentId: config.targetId,
          ...(config.parameters && { documentCloneParameters: config.parameters })
        })
      ).unwrap()
    }
    
    const jobRunId = result?.jobRunId
    
    // If no jobRunId, operation completed immediately
    if (!jobRunId) {
      console.log('✅ Document operation completed immediately without background processing')
      
      // Refresh the tree
      store.dispatch(refreshNodeChildren({ 
        nodeId: config.parentFolder.toString(), 
        elementType: config.elementType 
      }))
      
      return
    }
    
    console.log('✅ Got jobRunId from API:', jobRunId, '- setting up background job tracking')
    
    // Create Redux job for progress tracking
    const job = createDocumentCloneBackgroundJob({
      title: config.title,
      parentFolder: config.parentFolder.toString(),
      elementType: config.elementType,
      sourceId: config.sourceId,
      targetId: config.targetId,
      parameters: config.parameters,
      isReplace: config.isReplace,
      action: async () => 0, // Placeholder action
      topics: ['document-clone']
    })
    
    // Add job to Redux using store directly
    store.dispatch(jobReceived(job))
    store.dispatch(jobUpdated({ 
      id: job.id, 
      changes: { status: JobStatus.RUNNING } 
    }))
    
    // Register job handler for this specific jobRunId
    jobRegistry.registerJob({
      jobRunId,
      callback: (message: any) => {
        console.log('📨 Job', jobRunId, 'received message:', message.type, message.payload)
        
        if (message.type === 'update') {
          const data = message.payload

          // Update progress
          if (data?.progress !== undefined) {
            console.log('📈 Updating progress to:', data.progress)
            store.dispatch(jobUpdated({
              id: job.id,
              changes: {
                config: {
                  ...job.config,
                  progress: data.progress as number
                }
              }
            }))
          }

          // Update status based on backend response
          if (data?.status !== undefined) {
            console.log('🎯 Updating status to:', data.status)
            
            // Refresh tree for completion states
            if (data.status === 'finished' || data.status === 'finished_with_errors' || data.status === 'failed') {
              store.dispatch(refreshNodeChildren({ 
                nodeId: config.parentFolder.toString(), 
                elementType: config.elementType 
              }))
            }

            // Handle specific status updates
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
                return
            }

            // Update job status
            store.dispatch(jobUpdated({ 
              id: job.id, 
              changes: { status: jobStatus } 
            }))
            
            // Unregister job from registry
            jobRegistry.unregisterJob(jobRunId)
          }
        }
      },
      cleanup: () => {
        console.log('🧹 Cleaning up job', jobRunId)
      }
    })
    
  } catch (error) {
    console.error('❌ Document clone job failed:', error)
    // Re-throw to allow caller to handle
    throw error
  }
}