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
  MessageTypeHandler,
  AbstractBackgroundJobHandler
} from '@Pimcore/modules/background-processor'

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
      onProgress: (progress) => {
        console.log(`📈 Job ${jobRunId} progress: ${progress}%`)
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
   * Example 2: Message type-based handler (for global listeners)
   */
  static registerGlobalProgressListener(): void {
    const jobRegistry = this.getJobRegistry()
    
    const handler = new MessageTypeHandler('update', (message) => {
      const progress = message.payload?.progress
      if (progress !== undefined) {
        console.log('🌍 Global progress update:', progress)
        // Could update global progress bar, notifications, etc.
      }
    }, 'global-progress-listener')
    
    jobRegistry.registerHandler(handler)
  }

  /**
   * Example 3: Custom handler with complex logic
   */
  static registerCustomHandler(): void {
    const jobRegistry = this.getJobRegistry()
    
    class CustomHandler extends AbstractBackgroundJobHandler {
      shouldHandle(message: any): boolean {
        // Complex custom logic
        return message.type === 'update' && 
               message.payload?.category === 'document' &&
               message.payload?.priority === 'high'
      }

      handleMessage(message: any): void {
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

      shouldHandle(message: any): boolean {
        const jobRunId = message.payload?.jobRunId
        return jobRunId !== undefined && this.jobRunIds.has(jobRunId)
      }

      handleMessage(message: any): void {
        const jobRunId = message.payload?.jobRunId
        console.log(`📦 Batch processing message for job ${jobRunId}`)
        
        if (message.payload?.status === 'finished') {
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
