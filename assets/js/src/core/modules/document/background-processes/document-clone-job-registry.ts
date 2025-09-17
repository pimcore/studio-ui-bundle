/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { injectable } from 'inversify'

export interface DocumentCloneJobHandler {
  jobRunId: string | number
  callback: (message: any) => void
  cleanup?: () => void
}

@injectable()
export class DocumentCloneJobRegistry {
  private activeJobs = new Map<string | number, DocumentCloneJobHandler>()

  public registerJob(handler: DocumentCloneJobHandler): void {
    console.log('📝 DocumentCloneJobRegistry: Registering job', handler.jobRunId)
    this.activeJobs.set(handler.jobRunId, handler)
  }

  public unregisterJob(jobRunId: string | number): void {
    console.log('🗑️ DocumentCloneJobRegistry: Unregistering job', jobRunId)
    const handler = this.activeJobs.get(jobRunId)
    if (handler?.cleanup) {
      handler.cleanup()
    }
    this.activeJobs.delete(jobRunId)
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
