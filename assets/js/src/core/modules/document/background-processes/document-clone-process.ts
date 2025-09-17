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
import { AbstractMercureProcess } from '@Pimcore/modules/background-processor/process/abstract-mercure-process'
import { topics } from '@Pimcore/modules/execution-engine/topics'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type DocumentCloneJobRegistry } from './document-clone-job-registry'
import { type AbstractMessage } from '@Pimcore/modules/background-processor/process/abstract-background-process'

@injectable()
export class DocumentCloneGlobalProcess extends AbstractMercureProcess {
  protected name: string = 'document-clone-global'
  protected description: string = 'Global process for document clone operations'

  protected topics: string[] = [
    topics['handler-progress'],
    topics['cloning-finished'],
    topics['job-finished-with-errors'],
    topics['job-failed']
  ]

  constructor (
    @inject(serviceIds.documentCloneJobRegistry) private readonly jobRegistry: DocumentCloneJobRegistry
  ) {
    super()
  }

  public start (): void {
    super.start()
    console.log('🚀 DocumentCloneGlobalProcess started')
  }

  public cancel (): void {
    super.cancel()
    console.log('🛑 DocumentCloneGlobalProcess cancelled')
  }

  protected sendMessage (message: AbstractMessage): void {
    // Route message to job registry for specific job handling
    this.jobRegistry.routeMessage(message)
    
    // Call parent to notify subscribers
    super.sendMessage(message)
  }
}
