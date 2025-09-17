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
import { AbstractMercureProcess, type AbstractMercureMessage } from '@Pimcore/modules/background-processor/process/abstract-mercure-process'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type GlobalMessageBus } from '@Pimcore/modules/global-message-bus/services/global-message-bus'

@injectable()
export class GlobalMessageBusProcess extends AbstractMercureProcess {
  protected name: string = 'global-message-bus-process'
  protected description: string = 'Global process for message bus handling operations'

  constructor (
    @inject(serviceIds.globalMessageBus) private readonly messageRegistry: GlobalMessageBus
  ) {
    super()
  }

  protected getTopics (): string[] {
    return this.messageRegistry.getRegisteredTopics()
  }

  public start (): void {
    super.start()
    console.log('🚀 GlobalMessageBusProcess started')
  }

  public cancel (): void {
    super.cancel()
    console.log('🛑 GlobalMessageBusProcess cancelled')
  }

  protected sendMessage (message: AbstractMercureMessage): void {
    // Route complete Mercure message to registry
    this.messageRegistry.routeMessage(message)
  }
}
