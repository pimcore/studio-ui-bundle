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
 * Example handler that processes all messages of a specific type
 * This demonstrates flexibility beyond jobRunId-based routing
 */
export class MessageTypeHandler extends AbstractBackgroundJobHandler {
  private readonly messageType: string
  private readonly callback: (message: any) => void
  private readonly handlerId: string

  constructor(
    messageType: string,
    callback: (message: any) => void,
    handlerId?: string
  ) {
    super()
    this.messageType = messageType
    this.callback = callback
    this.handlerId = handlerId ?? `message-type-${messageType}-${Date.now()}`
  }

  public shouldHandle(message: any): boolean {
    // Handle based on message type, not jobRunId
    return message.type === this.messageType
  }

  public handleMessage(message: any): void {
    console.log('📨 MessageTypeHandler: Processing message of type', this.messageType)
    this.callback(message)
  }

  public getId(): string | number {
    return this.handlerId
  }
}
