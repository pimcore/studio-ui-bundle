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
import { debounce } from 'lodash'

// Message buffer entry with timestamp for TTL
interface BufferedMessage {
  message: any
  timestamp: number
}

@injectable()
export class BackgroundJobRegistry {
  private activeHandlers = new Map<string | number, AbstractBackgroundJobHandler>()
  private globalSubscriptionId: string | null = null
  
  // Message buffer for race condition prevention
  private messageBuffer: BufferedMessage[] = []
  private readonly MESSAGE_BUFFER_TTL = 30000 // 30 seconds
  private readonly MAX_BUFFER_SIZE = 1000 // Prevent memory leaks
  
  // Debounced cleanup - triggers after message activity stops
  private debouncedCleanup = debounce(() => {
    this.cleanupExpiredMessages()
  }, 5000) // Cleanup 5 seconds after last message

  constructor(
    @inject(serviceIds.backgroundProcessor) private readonly backgroundProcessor: BackgroundProcessor
  ) {}

  public registerHandler(handler: AbstractBackgroundJobHandler): void {
    console.log('📝 BackgroundJobRegistry: Registering handler', handler.getId())
    
    this.activeHandlers.set(handler.getId(), handler)
    
    // Call lifecycle method if defined
    if (handler.onRegister) {
      handler.onRegister()
    }
    
    // Replay any buffered messages that this handler should process
    this.replayBufferedMessages(handler)
  }

  public unregisterHandler(handlerId: string | number): void {
    console.log('🗑️ BackgroundJobRegistry: Unregistering handler', handlerId)
    const handler = this.activeHandlers.get(handlerId)
    if (handler?.onUnregister) {
      handler.onUnregister()
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
      console.log('🔍 BackgroundJobRegistry: No handler found for message', message.type, '- buffering message. Active handlers:', Array.from(this.activeHandlers.keys()))
      
      // Buffer the message for potential future handlers
      this.bufferMessage(message)
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

  private bufferMessage(message: any): void {
    // Clean up buffer if it's getting too large
    if (this.messageBuffer.length >= this.MAX_BUFFER_SIZE) {
      console.warn('🚫 BackgroundJobRegistry: Message buffer full, removing oldest messages')
      this.messageBuffer.splice(0, this.messageBuffer.length - this.MAX_BUFFER_SIZE + 100) // Keep some headroom
    }
    
    this.messageBuffer.push({
      message,
      timestamp: Date.now()
    })
    
    console.log('📦 BackgroundJobRegistry: Buffered message', message.type, '- buffer size:', this.messageBuffer.length)
    
    // Trigger debounced cleanup after message activity
    this.debouncedCleanup()
  }

  private replayBufferedMessages(handler: AbstractBackgroundJobHandler): void {
    console.log('🔄 BackgroundJobRegistry: Replaying buffered messages for handler', handler.getId())
    
    const matchingMessages: BufferedMessage[] = []
    
    // Find all buffered messages this handler should process
    for (const bufferedMsg of this.messageBuffer) {
      if (handler.shouldHandle(bufferedMsg.message)) {
        matchingMessages.push(bufferedMsg)
      }
    }
    
    if (matchingMessages.length > 0) {
      console.log('📨 BackgroundJobRegistry: Found', matchingMessages.length, 'buffered messages for handler', handler.getId())
      
      // Replay messages in chronological order
      matchingMessages.sort((a, b) => a.timestamp - b.timestamp)
      
      for (const bufferedMsg of matchingMessages) {
        console.log('📨 BackgroundJobRegistry: Replaying buffered message', bufferedMsg.message.type, 'for handler', handler.getId())
        try {
          handler.handleMessage(bufferedMsg.message)
        } catch (error) {
          console.error('❌ BackgroundJobRegistry: Error replaying message for handler', handler.getId(), error)
        }
      }
      
      // Remove replayed messages from buffer
      this.messageBuffer = this.messageBuffer.filter(bufferedMsg => 
        !matchingMessages.includes(bufferedMsg)
      )
    }
  }

  private cleanupExpiredMessages(): void {
    const now = Date.now()
    const originalSize = this.messageBuffer.length
    
    this.messageBuffer = this.messageBuffer.filter(bufferedMsg => 
      (now - bufferedMsg.timestamp) < this.MESSAGE_BUFFER_TTL
    )
    
    const removedCount = originalSize - this.messageBuffer.length
    if (removedCount > 0) {
      console.log('🧹 BackgroundJobRegistry: Cleaned up', removedCount, 'expired messages from buffer')
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
