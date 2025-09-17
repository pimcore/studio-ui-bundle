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

export interface BackgroundJobHandler {
  jobRunId: string | number
  callback: (message: any) => void
  cleanup?: () => void
}

@injectable()
export class BackgroundJobRegistry {
  private activeJobs = new Map<string | number, BackgroundJobHandler>()
  private globalSubscriptionId: string | null = null

  constructor(
    @inject(serviceIds.backgroundProcessor) private readonly backgroundProcessor: BackgroundProcessor
  ) {}

  public registerJob(handler: BackgroundJobHandler): void {
    console.log('📝 BackgroundJobRegistry: Registering job', handler.jobRunId)
    
    this.activeJobs.set(handler.jobRunId, handler)
  }

  public unregisterJob(jobRunId: string | number): void {
    console.log('🗑️ BackgroundJobRegistry: Unregistering job', jobRunId)
    const handler = this.activeJobs.get(jobRunId)
    if (handler?.cleanup) {
      handler.cleanup()
    }
    this.activeJobs.delete(jobRunId)
  }

  public startGlobalSubscription(): void {
    if (this.globalSubscriptionId !== null) {
      return // Already subscribed
    }
    
    try {
      this.globalSubscriptionId = this.backgroundProcessor.subscribeToProcessMessages({
        processName: 'background-job-global',
        callback: (message: any) => {
          this.routeMessage(message)
        }
      })
      console.log('📡 BackgroundJobRegistry: Established global subscription with ID:', this.globalSubscriptionId)
    } catch (error) {
      console.error('❌ Failed to establish global subscription:', error)
    }
  }

  public routeMessage(message: any): void {
    // Extract jobRunId from message payload
    const jobRunId = message.payload?.jobRunId
    
    if (!jobRunId) {
      console.log('⚠️ BackgroundJobRegistry: Message without jobRunId', message)
      return
    }

    const handler = this.activeJobs.get(jobRunId)
    if (handler) {
      console.log('📨 BackgroundJobRegistry: Routing message to job', jobRunId, message.type)
      handler.callback(message)
    } else {
      console.log('🔍 BackgroundJobRegistry: No handler found for jobRunId', jobRunId, 'Active jobs:', Array.from(this.activeJobs.keys()))
    }
  }

  public getActiveJobIds(): Array<string | number> {
    return Array.from(this.activeJobs.keys())
  }

  public hasActiveJobs(): boolean {
    return this.activeJobs.size > 0
  }
}
