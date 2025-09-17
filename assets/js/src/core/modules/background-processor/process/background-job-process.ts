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
import { type BackgroundJobRegistry } from '@Pimcore/modules/background-processor/services/background-job-registry'

@injectable()
export class BackgroundJobProcess extends AbstractMercureProcess {
  protected name: string = 'background-job-global'
  protected description: string = 'Global process for background job operations'

  constructor (
    @inject(serviceIds.backgroundJobRegistry) private readonly jobRegistry: BackgroundJobRegistry
  ) {
    super()
  }

  protected getTopics (): string[] {
    return this.jobRegistry.getRegisteredTopics()
  }

  public start (): void {
    super.start()
    console.log('🚀 BackgroundJobProcess started')
  }

  public cancel (): void {
    super.cancel()
    console.log('🛑 BackgroundJobProcess cancelled')
  }

  protected sendMessage (message: AbstractMercureMessage): void {
    // Route complete Mercure message to job registry
    this.jobRegistry.routeMessage(message)
  }
}
