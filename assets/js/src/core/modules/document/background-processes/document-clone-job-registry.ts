/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { injectable, inject } from 'inversify'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type BackgroundProcessor } from '@Pimcore/modules/background-processor/services/background-processor'

export interface DocumentCloneJobHandler {
  jobRunId: string | number
  callback: (message: any) => void
  cleanup?: () => void
}

@injectable()
export class DocumentCloneJobRegistry {
  private activeJobs = new Map<string | number, DocumentCloneJobHandler>()
  private globalSubscriptionId: string | null = null

  constructor(
    @inject(serviceIds.backgroundProcessor) private readonly backgroundProcessor: BackgroundProcessor
  ) {}

  public registerJob(handler: DocumentCloneJobHandler): void {
    console.log('📝 DocumentCloneJobRegistry: Registering job', handler.jobRunId)
    
    // If this is the first job, establish global subscription
    if (this.activeJobs.size === 0) {
      this.ensureGlobalSubscription()
    }
    
    this.activeJobs.set(handler.jobRunId, handler)
  }

  public unregisterJob(jobRunId: string | number): void {
    console.log('🗑️ DocumentCloneJobRegistry: Unregistering job', jobRunId)
    const handler = this.activeJobs.get(jobRunId)
    if (handler?.cleanup) {
      handler.cleanup()
    }
    this.activeJobs.delete(jobRunId)
    
    // If no more jobs, cleanup global subscription
    if (this.activeJobs.size === 0) {
      this.cleanupGlobalSubscription()
    }
  }

  private ensureGlobalSubscription(): void {
    if (this.globalSubscriptionId !== null) {
      return // Already subscribed
    }
    
    try {
      this.globalSubscriptionId = this.backgroundProcessor.subscribeToProcessMessages({
        processName: 'document-clone-global',
        callback: (message: any) => {
          this.routeMessage(message)
        }
      })
      console.log('📡 DocumentCloneJobRegistry: Established global subscription with ID:', this.globalSubscriptionId)
    } catch (error) {
      console.error('❌ Failed to establish global subscription:', error)
    }
  }

  private cleanupGlobalSubscription(): void {
    if (this.globalSubscriptionId === null) {
      return // Not subscribed
    }
    
    try {
      this.backgroundProcessor.unsubscribeFromProcessMessages(this.globalSubscriptionId)
      console.log('🔌 DocumentCloneJobRegistry: Cleaned up global subscription')
    } catch (error) {
      console.error('❌ Failed to cleanup global subscription:', error)
    } finally {
      this.globalSubscriptionId = null
    }
  }

  public routeMessage(message: any): void {
    // Extract jobRunId from message payload
    const jobRunId = message.payload?.jobRunId
    
    if (!jobRunId) {
      console.log('⚠️ DocumentCloneJobRegistry: Message without jobRunId', message)
      return
    }

    const handler = this.activeJobs.get(jobRunId)
    if (handler) {
      console.log('📨 DocumentCloneJobRegistry: Routing message to job', jobRunId, message.type)
      handler.callback(message)
    } else {
      console.log('🔍 DocumentCloneJobRegistry: No handler found for jobRunId', jobRunId, 'Active jobs:', Array.from(this.activeJobs.keys()))
    }
  }

  public getActiveJobIds(): Array<string | number> {
    return Array.from(this.activeJobs.keys())
  }

  public hasActiveJobs(): boolean {
    return this.activeJobs.size > 0
  }
}
