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
import { type GlobalMessageBus } from '@Pimcore/modules/global-message-bus'
import { type JobInterface } from '../jobs/job-interface'

/**
 * Service for executing jobs in the execution engine
 * Simply delegates to the job's run method
 */
@injectable()
export class ExecutionEngine {
  constructor (
    @inject(serviceIds.globalMessageBus) private readonly messageBus: GlobalMessageBus
  ) {}

  /**
   * Run a job using the execution engine
   * Delegates all logic to the job itself
   */
  async runJob (job: JobInterface): Promise<void> {
    await job.run({ messageBus: this.messageBus })
  }
}
