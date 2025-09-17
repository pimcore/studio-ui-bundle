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
import { container } from '@Pimcore/app/depency-injection'
import { type BackgroundJobProcess } from '@Pimcore/modules/background-processor/process/background-job-process'
import { type AbstractMercureMessage } from '@Pimcore/modules/background-processor/process/abstract-mercure-process'
import { debounce } from 'lodash'

// Message buffer entry with timestamp for TTL
interface BufferedMessage {
  mercureMessage: AbstractMercureMessage
  timestamp: number
}

@injectable()
export class BackgroundJobRegistry {
  private activeHandlers = new Map<string | number, AbstractBackgroundJobHandler>()
  private globalSubscriptionId: string | null = null
  private registeredTopics = new Set<string>()
  
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

  /**
   * Register topics that handlers can use
   */
  public registerTopics(topics: string[]): void {
    topics.forEach(topic => this.registeredTopics.add(topic))
    console.log(`📡 BackgroundJobRegistry: Registered ${topics.length} topics. Total: ${this.registeredTopics.size}`)
  }

  /**
   * Get all registered topics
   */
  public getRegisteredTopics(): string[] {
    return Array.from(this.registeredTopics)
  }

  public registerHandler(handler: AbstractBackgroundJobHandler): void {
    console.log('📝 BackgroundJobRegistry: Registering handler', handler.getId())
    
    // Validate that the handler's topics are registered in the process
    this.validateHandlerTopics(handler)
    
    this.activeHandlers.set(handler.getId(), handler)
    
    // Call lifecycle method if defined
    if (handler.onRegister) {
      handler.onRegister()
    }
    
    // Replay any buffered messages that this handler should process
    this.replayBufferedMessages(handler)
  }

  private validateHandlerTopics(handler: AbstractBackgroundJobHandler): void {
    const handlerClass = handler.constructor as any
    const handlerTopics = handlerClass.TOPICS || []
    
    // Validate that all handler topics are registered
    for (const topic of handlerTopics) {
      if (!this.registeredTopics.has(topic)) {
        const errorMessage = [
          `❌ BackgroundJobRegistry: Handler "${handler.getId()}" uses unregistered topic "${topic}".`,
          `💡 To register this topic, add it to your module's initialization:`,
          `   const registry = container.get<BackgroundJobRegistry>(serviceIds.backgroundJobRegistry)`,
          `   registry.registerTopics(['${topic}'])`,
          `📋 Available topics: [${this.getRegisteredTopics().join(', ')}]`
        ].join('\n')
        
        console.error(errorMessage)
        throw new Error(errorMessage)
      }
    }
    
    console.log(`✅ BackgroundJobRegistry: Handler "${handler.getId()}" topics validated:`, handlerTopics)
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
          // Route complete Mercure message
          console.log('📡 BackgroundJobRegistry: Received message via global subscription:', message.type)
          this.routeMessage(message as AbstractMercureMessage)
        }
      })
      console.log('📡 BackgroundJobRegistry: Established global subscription with ID:', this.globalSubscriptionId)
    } catch (error) {
      console.error('❌ Failed to establish global subscription:', error)
    }
  }

  public routeMessage(mercureMessage: AbstractMercureMessage): void {
    console.log('📨 BackgroundJobRegistry: Routing message', mercureMessage.type)
    
    // Validate topic registration
    const eventData = JSON.parse(mercureMessage.event.data as string)
    const eventTopic = eventData.topic || eventData['@topic']
    
    if (eventTopic && !this.registeredTopics.has(eventTopic)) {
      return
    }
    
    
    // Find all handlers that should handle this message
    const matchingHandlers: AbstractBackgroundJobHandler[] = []
    
    for (const handler of this.activeHandlers.values()) {
      if (handler.shouldHandle(mercureMessage)) {
        matchingHandlers.push(handler)
      }
    }
    
    if (matchingHandlers.length === 0) {
      console.log('🔍 BackgroundJobRegistry: No handler found for message', mercureMessage.type, '- buffering message. Active handlers:', Array.from(this.activeHandlers.keys()))
      
      // Buffer the message for potential future handlers
      this.bufferMessage(mercureMessage)
      return
    }
    
    // Process message with all matching handlers
    for (const handler of matchingHandlers) {
      console.log('📨 BackgroundJobRegistry: Processing message with handler', handler.getId(), mercureMessage.type)
      try {
        handler.handleMessage(mercureMessage)
      } catch (error) {
        console.error('❌ BackgroundJobRegistry: Error processing message with handler', handler.getId(), error)
      }
    }
  }

  private bufferMessage(mercureMessage: AbstractMercureMessage): void {
    // Clean up buffer if it's getting too large
    if (this.messageBuffer.length >= this.MAX_BUFFER_SIZE) {
      console.warn('🚫 BackgroundJobRegistry: Message buffer full, removing oldest messages')
      this.messageBuffer.splice(0, this.messageBuffer.length - this.MAX_BUFFER_SIZE + 100) // Keep some headroom
    }
    
    this.messageBuffer.push({
      mercureMessage,
      timestamp: Date.now()
    })
    
    console.log('📦 BackgroundJobRegistry: Buffered message', mercureMessage.type, '- buffer size:', this.messageBuffer.length)
    
    // Trigger debounced cleanup after message activity
    this.debouncedCleanup()
  }

  private replayBufferedMessages(handler: AbstractBackgroundJobHandler): void {
    console.log('🔄 BackgroundJobRegistry: Replaying buffered messages for handler', handler.getId())
    
    const matchingMessages: BufferedMessage[] = []
    
    // Find all buffered messages this handler should process
    for (const bufferedMsg of this.messageBuffer) {
      if (handler.shouldHandle(bufferedMsg.mercureMessage)) {
        matchingMessages.push(bufferedMsg)
      }
    }
    
    if (matchingMessages.length > 0) {
      console.log('📨 BackgroundJobRegistry: Found', matchingMessages.length, 'buffered messages for handler', handler.getId())
      
      // Replay messages in chronological order
      matchingMessages.sort((a, b) => a.timestamp - b.timestamp)
      
      for (const bufferedMsg of matchingMessages) {
        console.log('📨 BackgroundJobRegistry: Replaying buffered message', bufferedMsg.mercureMessage.type, 'for handler', handler.getId())
        try {
          handler.handleMessage(bufferedMsg.mercureMessage)
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
