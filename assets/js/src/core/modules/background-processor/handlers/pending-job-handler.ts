/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { AbstractBackgroundJobHandler } from '@Pimcore/modules/background-processor/handlers/abstract-background-job-handler'

/**
 * A handler that can be registered before knowing the actual jobRunId
 * It will collect and buffer messages until the real jobRunId is known
 */
export class PendingJobHandler extends AbstractBackgroundJobHandler {
  private actualJobRunId: string | number | null = null
  private bufferedMessages: any[] = []
  private actualHandler: AbstractBackgroundJobHandler | null = null
  private readonly pendingId: string

  constructor(
    pendingId: string,
    private readonly jobMatcher?: (message: any) => string | number | null
  ) {
    super()
    this.pendingId = pendingId
  }

  shouldHandle(message: any): boolean {
    // If we already know the actual jobRunId, delegate to actual handler
    if (this.actualHandler) {
      return this.actualHandler.shouldHandle(message)
    }

    // If we have a custom matcher, use it to try to identify the jobRunId
    if (this.jobMatcher) {
      const detectedJobRunId = this.jobMatcher(message)
      if (detectedJobRunId !== null) {
        console.log('🎯 PendingJobHandler: Detected jobRunId', detectedJobRunId, 'from message', message.type)
        return true
      }
    }

    // For document clone jobs, look for messages that might contain our jobRunId
    // This is a heuristic - we'll collect messages that look like they could be ours
    if (message.type === 'update' && message.payload?.jobRunId) {
      return true // Collect all job messages until we know which one is ours
    }

    return false
  }

  handleMessage(message: any): void {
    // If we have the actual handler, delegate
    if (this.actualHandler) {
      this.actualHandler.handleMessage(message)
      return
    }

    // Otherwise, buffer the message
    console.log('📦 PendingJobHandler: Buffering message', message.type, 'for pending job', this.pendingId)
    this.bufferedMessages.push(message)
  }

  /**
   * Upgrade this pending handler to use an actual handler once the jobRunId is known
   */
  public upgradeToActualHandler(actualHandler: AbstractBackgroundJobHandler): void {
    console.log('⬆️ PendingJobHandler: Upgrading to actual handler for jobRunId', actualHandler.getId())
    
    this.actualHandler = actualHandler
    this.actualJobRunId = actualHandler.getId()

    // Replay buffered messages that the actual handler should process
    const relevantMessages = this.bufferedMessages.filter(msg => 
      actualHandler.shouldHandle(msg)
    )

    if (relevantMessages.length > 0) {
      console.log('🔄 PendingJobHandler: Replaying', relevantMessages.length, 'buffered messages to actual handler')
      
      for (const message of relevantMessages) {
        try {
          actualHandler.handleMessage(message)
        } catch (error) {
          console.error('❌ PendingJobHandler: Error replaying message:', error)
        }
      }
    }

    // Clear the buffer to prevent memory leaks
    this.bufferedMessages = []
  }

  getId(): string | number {
    return this.actualJobRunId ?? this.pendingId
  }

  cleanup(): void {
    if (this.actualHandler?.cleanup) {
      this.actualHandler.cleanup()
    }
    this.bufferedMessages = []
  }

  /**
   * Check if this pending handler has been upgraded to an actual handler
   */
  public isUpgraded(): boolean {
    return this.actualHandler !== null
  }

  /**
   * Get the number of buffered messages
   */
  public getBufferedMessageCount(): number {
    return this.bufferedMessages.length
  }
}
