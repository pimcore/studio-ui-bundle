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
import { type AbstractMessageHandler } from '../message-handlers/abstract-message-handler'
import { type AbstractMercureMessage } from '@Pimcore/modules/background-processor/process/abstract-mercure-process'
import { debounce, isNil } from 'lodash'

interface BufferedMessage {
  mercureMessage: AbstractMercureMessage
  timestamp: number
}

@injectable()
export class GlobalMessageBus {
  private readonly activeHandlers = new Map<string | number, AbstractMessageHandler>()
  private globalSubscriptionId: string | null = null
  private readonly registeredTopics = new Set<string>()

  // Message buffer for race condition prevention
  private messageBuffer: BufferedMessage[] = []
  private readonly MESSAGE_BUFFER_TTL = 30000 // 30 seconds
  private readonly MAX_BUFFER_SIZE = 1000 // Prevent memory leaks

  private readonly debouncedCleanup = debounce(() => {
    this.cleanupExpiredMessages()
  }, 5000)

  constructor (
    @inject(serviceIds.backgroundProcessor) private readonly backgroundProcessor: BackgroundProcessor
  ) {}

  /**
   * Register topics that handlers can use
   * @throws Error if global subscription has already started
   */
  public registerTopics (topics: string[]): void {
    if (!isNil(this.globalSubscriptionId)) {
      throw new Error('Cannot register new topics after global subscription has started. Topics must be registered in your module\'s onInit() method before the app starts.')
    }

    topics.forEach(topic => this.registeredTopics.add(topic))
  }

  public getRegisteredTopics (): string[] {
    return Array.from(this.registeredTopics)
  }

  public registerHandler (handler: AbstractMessageHandler): void {
    const handlerId = handler.getId()
    this.activeHandlers.set(handlerId, handler)

    if (!isNil(handler.onRegister)) {
      handler.onRegister()
    }

    void this.replayBufferedMessages(handler)
  }

  public unregisterHandler (handlerId: string | number): void {
    const handler = this.activeHandlers.get(handlerId)
    if (!isNil(handler?.onUnregister)) {
      handler.onUnregister()
    }
    this.activeHandlers.delete(handlerId)
  }

  public startGlobalSubscription (): void {
    if (this.globalSubscriptionId !== null) {
      return
    }

    try {
      this.globalSubscriptionId = this.backgroundProcessor.subscribeToProcessMessages({
        processName: 'global-message-bus-process',
        callback: (message: any) => {
          void this.routeMessage(message as AbstractMercureMessage)
        }
      })
    } catch (error) {
      console.error('Failed to establish global subscription:', error)
    }
  }

  public async routeMessage (mercureMessage: AbstractMercureMessage): Promise<void> {

    const matchingHandlers: AbstractMessageHandler[] = []

    for (const handler of this.activeHandlers.values()) {
      const shouldHandle = handler.shouldHandle(mercureMessage)
      if (shouldHandle) {
        matchingHandlers.push(handler)
      }
    }

    if (matchingHandlers.length === 0) {
      this.bufferMessage(mercureMessage)
      return
    }

    for (const handler of matchingHandlers) {
      try {
        await handler.handleMessage(mercureMessage)
      } catch (error) {
        console.error('GlobalMessageBus: Error processing message with handler', handler.getId(), error)
      }
    }
  }

  private bufferMessage (mercureMessage: AbstractMercureMessage): void {
    if (this.messageBuffer.length >= this.MAX_BUFFER_SIZE) {
      console.warn('GlobalMessageBus: Message buffer full, removing oldest messages')
      this.messageBuffer.splice(0, this.messageBuffer.length - this.MAX_BUFFER_SIZE + 100) // Keep some headroom
    }

    this.messageBuffer.push({
      mercureMessage,
      timestamp: Date.now()
    })

    this.debouncedCleanup()
  }

  private async replayBufferedMessages (handler: AbstractMessageHandler): Promise<void> {
    const matchingMessages: BufferedMessage[] = []

    for (const bufferedMsg of this.messageBuffer) {
      const shouldHandle = handler.shouldHandle(bufferedMsg.mercureMessage)
      if (shouldHandle) {
        matchingMessages.push(bufferedMsg)
      }
    }

    if (matchingMessages.length > 0) {
      // Replay messages in chronological order
      matchingMessages.sort((a, b) => a.timestamp - b.timestamp)

      for (const bufferedMsg of matchingMessages) {
        try {
          await handler.handleMessage(bufferedMsg.mercureMessage)
        } catch (error) {
          console.error('GlobalMessageBus: Error replaying message for handler', handler.getId(), error)
        }
      }

      // Remove replayed messages from buffer
      this.messageBuffer = this.messageBuffer.filter(bufferedMsg =>
        !matchingMessages.includes(bufferedMsg)
      )
    }
  }

  private cleanupExpiredMessages (): void {
    const now = Date.now()

    this.messageBuffer = this.messageBuffer.filter(bufferedMsg =>
      (now - bufferedMsg.timestamp) < this.MESSAGE_BUFFER_TTL
    )
  }
}
