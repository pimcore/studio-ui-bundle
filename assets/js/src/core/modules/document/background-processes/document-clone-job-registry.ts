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
import { isNil } from 'lodash'

export interface DocumentCloneJobHandler {
  jobRunId: string | number
  callback: (message: any) => void
  cleanup?: () => void
}

@injectable()
export class DocumentCloneJobRegistry {
  private readonly activeJobs = new Map<string | number, DocumentCloneJobHandler>()
  private globalSubscriptionId: string | null = null

  constructor (
    @inject(serviceIds.backgroundProcessor) private readonly backgroundProcessor: BackgroundProcessor
  ) {}

  public registerJob (handler: DocumentCloneJobHandler): void {
    console.log('📝 DocumentCloneJobRegistry: Registering job', handler.jobRunId)

    this.activeJobs.set(handler.jobRunId, handler)
  }

  public unregisterJob (jobRunId: string | number): void {
    console.log('🗑️ DocumentCloneJobRegistry: Unregistering job', jobRunId)
    const handler = this.activeJobs.get(jobRunId)
    if (!isNil(handler?.cleanup)) {
      handler.cleanup()
    }
    this.activeJobs.delete(jobRunId)
  }

  public startGlobalSubscription (): void {
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

  public routeMessage (message: any): void {
    // Extract jobRunId from message payload
    const jobRunId = message.payload?.jobRunId

    if (isNil(jobRunId)) {
      console.log('⚠️ DocumentCloneJobRegistry: Message without jobRunId', message)
      return
    }

    const handler = this.activeJobs.get(String(jobRunId))
    if (!isNil(handler)) {
      console.log('📨 DocumentCloneJobRegistry: Routing message to job', jobRunId, message.type)
      handler.callback(message)
    } else {
      console.log('🔍 DocumentCloneJobRegistry: No handler found for jobRunId', jobRunId, 'Active jobs:', Array.from(this.activeJobs.keys()))
    }
  }

  public getActiveJobIds (): Array<string | number> {
    return Array.from(this.activeJobs.keys())
  }

  public hasActiveJobs (): boolean {
    return this.activeJobs.size > 0
  }
}
