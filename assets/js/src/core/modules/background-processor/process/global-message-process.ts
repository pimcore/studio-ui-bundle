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
import { type GlobalMessageRegistry } from '@Pimcore/modules/background-processor/services/global-message-registry'

@injectable()
export class GlobalMessageProcess extends AbstractMercureProcess {
  protected name: string = 'global-message-process'
  protected description: string = 'Global process for message handling operations'

  constructor (
    @inject(serviceIds.globalMessageRegistry) private readonly messageRegistry: GlobalMessageRegistry
  ) {
    super()
  }

  protected getTopics (): string[] {
    return this.messageRegistry.getRegisteredTopics()
  }

  public start (): void {
    super.start()
    console.log('🚀 GlobalMessageProcess started')
  }

  public cancel (): void {
    super.cancel()
    console.log('🛑 GlobalMessageProcess cancelled')
  }

  protected sendMessage (message: AbstractMercureMessage): void {
    // Route complete Mercure message to registry
    this.messageRegistry.routeMessage(message)
  }
}
