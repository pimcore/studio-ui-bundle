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
import { type GlobalMessageBusProcess } from '@Pimcore/modules/background-processor'
import { type JobInterface } from '../jobs/job-interface'
import { type JobRehydrationRegistry } from './job-rehydration-registry'
import { type JobRun } from '../execution-engine-api-slice.gen'

@injectable()
export class ExecutionEngine {
  constructor (
    @inject(serviceIds.globalMessageBus) private readonly messageBus: GlobalMessageBus,
    @inject(serviceIds.globalMessageBusProcess) private readonly globalProcess: GlobalMessageBusProcess,
    @inject(serviceIds['ExecutionEngine/JobRehydrationRegistry']) private readonly rehydrationRegistry: JobRehydrationRegistry
  ) {}

  async runJob (job: JobInterface): Promise<void> {
    if (!this.globalProcess.isConnected()) {
      this.globalProcess.start()
    }

    await job.run({ messageBus: this.messageBus })
  }

  rehydrateRunningJobs (items: JobRun[]): void {
    if (items.length === 0) return

    if (!this.globalProcess.isConnected()) {
      this.globalProcess.start()
    }

    // IDs that appear as a child of another item in this response
    const childIds = new Set<number>(
      items
        .filter(j => j.childJobRunId != null)
        .map(j => j.childJobRunId as number)
    )

    // Process only top-level (parent) items; pass child as second argument
    for (const parent of items.filter(j => !childIds.has(j.id))) {
      const fn = this.rehydrationRegistry.get(parent.jobName)
      if (fn === undefined) continue

      const child = parent.childJobRunId != null
        ? items.find(j => j.id === parent.childJobRunId)
        : undefined

      const handler = fn(parent, child)
      handler.setInitialStatus((child ?? parent).state)
      this.messageBus.registerHandler(handler)
    }
  }
}
