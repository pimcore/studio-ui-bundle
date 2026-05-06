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
import { type JobRehydrationRegistry, type RehydratableJob } from './job-rehydration-registry'
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

    const ctor = job.constructor as Partial<RehydratableJob>
    if (ctor.jobNames != null) {
      for (const name of ctor.jobNames) {
        if (this.rehydrationRegistry.get(name) === undefined) {
          throw new Error(`Job "${name}" (${job.constructor.name}) is not registered in the rehydration registry. Call registry.register(${job.constructor.name}) in your module's onInit().`)
        }
      }
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
        .filter(j => j.jobRunChildId != null)
        .map(j => j.jobRunChildId!)
    )

    // Process only top-level (parent) items; walk the full chain to any depth
    for (const parent of items.filter(j => !childIds.has(j.id))) {
      const fn = this.rehydrationRegistry.get(parent.jobName)
      if (fn === undefined) {
        console.warn(`[ExecutionEngine] No rehydration handler for job "${parent.jobName}" (id ${parent.id}). Register it with JobRehydrationRegistry in your module's onInit().`)
        continue
      }

      const chain: JobRun[] = [parent]
      let cursor: JobRun = parent
      while (cursor.jobRunChildId != null) {
        const next = items.find(j => j.id === cursor.jobRunChildId)
        if (next === undefined) break
        chain.push(next)
        cursor = next
      }

      const handler = fn(chain as [JobRun, ...JobRun[]])
      handler.setInitialStatus(chain.at(-1)!.state)
      this.messageBus.registerHandler(handler)
    }
  }
}
