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
import { 
  type BackgroundJobRegistry,
  DocumentCloneJobHandler,
  AbstractBackgroundJobHandler
} from '@Pimcore/modules/background-processor'
import { type AbstractMercureMessage } from '@Pimcore/modules/background-processor/process/abstract-mercure-process'

/**
 * Example usage of the new abstract handler system
 * This demonstrates the flexibility of the new approach
 */
export class BackgroundJobExamples {
  
  private static getJobRegistry(): BackgroundJobRegistry {
    return container.get<BackgroundJobRegistry>(serviceIds.backgroundJobRegistry)
  }

  /**
   * Example 1: JobRunId-based handler (most common case)
   */
  static registerDocumentCloneHandler(jobRunId: string | number): void {
    const jobRegistry = this.getJobRegistry()
    
    const handler = new DocumentCloneJobHandler(jobRunId, {
      title: 'Clone Document Job',
      parentFolder: '/documents',
      elementType: 'document',
      sourceId: 123,
      targetId: 456,
      onProgress: (progress) => {
        console.log(`📈 Job ${jobRunId} progress: ${progress.currentStep}/${progress.totalSteps} - ${progress.message}`)
      },
      onComplete: (success) => {
        console.log(`✅ Job ${jobRunId} completed:`, success ? 'SUCCESS' : 'FAILED')
        jobRegistry.unregisterHandler(jobRunId)
      },
      onCleanup: () => {
        console.log(`🧹 Cleaning up job ${jobRunId}`)
      }
    })
    
    jobRegistry.registerHandler(handler)
  }

  /**
   * Example 2: Custom progress listener with message filtering
   */
  static registerGlobalProgressListener(): void {
    const jobRegistry = this.getJobRegistry()
    
    class GlobalProgressHandler extends AbstractBackgroundJobHandler {
      static readonly TOPICS = ['job.progress.update']
      
      shouldHandle(message: AbstractMercureMessage): boolean {
        const payload = message.payload as any
        return message.type === 'update' && payload?.progress !== undefined
      }

      handleMessage(message: AbstractMercureMessage): void {
        const payload = message.payload as any
        const progress = payload?.progress
        console.log('🌍 Global progress update:', progress)
        // Could update global progress bar, notifications, etc.
      }

      getId(): string {
        return 'global-progress-listener'
      }
    }
    
    jobRegistry.registerHandler(new GlobalProgressHandler())
  }

  /**
   * Example 3: Custom handler with complex logic
   */
  static registerCustomHandler(): void {
    const jobRegistry = this.getJobRegistry()
    
    class CustomHandler extends AbstractBackgroundJobHandler {
      shouldHandle(message: AbstractMercureMessage): boolean {
        // Complex custom logic
        const payload = message.payload as any
        return message.type === 'update' && 
               payload?.category === 'document' &&
               payload?.priority === 'high'
      }

      handleMessage(message: AbstractMercureMessage): void {
        console.log('🎯 Processing high-priority document message:', message)
        // Custom processing logic
      }

      getId(): string {
        return 'custom-high-priority-handler'
      }
    }
    
    jobRegistry.registerHandler(new CustomHandler())
  }

  /**
   * Example 4: Batch handler for multiple jobRunIds
   */
  static registerBatchHandler(jobRunIds: Array<string | number>): void {
    const jobRegistry = this.getJobRegistry()
    
    class BatchHandler extends AbstractBackgroundJobHandler {
      private jobRunIds: Set<string | number>
      
      constructor(jobRunIds: Array<string | number>) {
        super()
        this.jobRunIds = new Set(jobRunIds)
      }

      shouldHandle(message: AbstractMercureMessage): boolean {
        const payload = message.payload as any
        const jobRunId = payload?.jobRunId
        return jobRunId !== undefined && this.jobRunIds.has(jobRunId)
      }

      handleMessage(message: AbstractMercureMessage): void {
        const payload = message.payload as any
        const jobRunId = payload?.jobRunId
        console.log(`📦 Batch processing message for job ${jobRunId}`)
        
        if (payload?.status === 'finished') {
          this.jobRunIds.delete(jobRunId)
          console.log(`✅ Job ${jobRunId} finished. Remaining jobs:`, Array.from(this.jobRunIds))
          
          if (this.jobRunIds.size === 0) {
            console.log('🎉 All batch jobs completed!')
            jobRegistry.unregisterHandler(this.getId())
          }
        }
      }

      getId(): string {
        return 'batch-handler'
      }
    }
    
    jobRegistry.registerHandler(new BatchHandler(jobRunIds))
  }
}
