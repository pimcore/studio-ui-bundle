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

/**
 * Example concrete implementation of a job handler for document clone operations
 * This demonstrates how to use the new abstract handler system
 */
export class DocumentCloneJobHandler extends AbstractJobRunIdHandler {
  private readonly onProgress?: (progress: number) => void
  private readonly onComplete?: (success: boolean, status?: string) => void

  constructor(
    jobRunId: string | number,
    callbacks: {
      onProgress?: (progress: number) => void
      onComplete?: (success: boolean, status?: string) => void
      onCleanup?: () => void
    } = {}
  ) {
    super(jobRunId)
    this.onProgress = callbacks.onProgress
    this.onComplete = callbacks.onComplete
    if (callbacks.onCleanup) {
      this.cleanup = callbacks.onCleanup
    }
  }

  public handleMessage(message: any): void {
    console.log('📨 DocumentCloneJobHandler: Processing message for job', this.jobRunId, message.type)
    
    if (message.type === 'update') {
      const data = message.payload

      // Handle progress updates
      if (data?.progress !== undefined && this.onProgress) {
        this.onProgress(data.progress as number)
      }

      // Handle status updates
      if (data?.status !== undefined) {
        const isComplete = ['finished', 'finished_with_errors', 'failed'].includes(data.status)
        
        if (isComplete && this.onComplete) {
          const success = data.status === 'finished' || data.status === 'finished_with_errors'
          this.onComplete(success, data.status)
        }
      }
    }
  }
}
