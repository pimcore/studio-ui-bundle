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
import { AbstractBackgroundJobHandler } from '@Pimcore/modules/background-processor/handlers/abstract-background-job-handler'

@injectable()
export class BackgroundJobRegistry {
  private activeHandlers = new Map<string | number, AbstractBackgroundJobHandler>()
  private globalSubscriptionId: string | null = null

  constructor(
    @inject(serviceIds.backgroundProcessor) private readonly backgroundProcessor: BackgroundProcessor
  ) {}

  public registerHandler(handler: AbstractBackgroundJobHandler): void {
    console.log('📝 BackgroundJobRegistry: Registering handler', handler.getId())
    
    this.activeHandlers.set(handler.getId(), handler)
  }

  public unregisterHandler(handlerId: string | number): void {
    console.log('🗑️ BackgroundJobRegistry: Unregistering handler', handlerId)
    const handler = this.activeHandlers.get(handlerId)
    if (handler?.cleanup) {
      handler.cleanup()
    }
    this.activeHandlers.delete(handlerId)
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
    console.log('📨 BackgroundJobRegistry: Routing message', message.type)
    
    // Find all handlers that should handle this message
    const matchingHandlers: AbstractBackgroundJobHandler[] = []
    
    for (const handler of this.activeHandlers.values()) {
      if (handler.shouldHandle(message)) {
        matchingHandlers.push(handler)
      }
    }
    
    if (matchingHandlers.length === 0) {
      console.log('🔍 BackgroundJobRegistry: No handler found for message', message.type, 'Active handlers:', Array.from(this.activeHandlers.keys()))
      return
    }
    
    // Process message with all matching handlers
    for (const handler of matchingHandlers) {
      console.log('📨 BackgroundJobRegistry: Processing message with handler', handler.getId(), message.type)
      try {
        handler.handleMessage(message)
      } catch (error) {
        console.error('❌ BackgroundJobRegistry: Error processing message with handler', handler.getId(), error)
      }
    }
  }

  public getActiveHandlerIds(): Array<string | number> {
    return Array.from(this.activeHandlers.keys())
  }

  public hasActiveHandlers(): boolean {
    return this.activeHandlers.size > 0
  }

  // Legacy methods for backward compatibility
  public getActiveJobIds(): Array<string | number> {
    return this.getActiveHandlerIds()
  }

  public hasActiveJobs(): boolean {
    return this.hasActiveHandlers()
  }
}
