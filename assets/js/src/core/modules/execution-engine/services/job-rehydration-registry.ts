/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { injectable } from 'inversify'
import { type JobRun } from '../execution-engine-api-slice.gen'
import { type MessageBusJobHandler } from '../message-handlers/message-bus-job/message-bus-job-handler'

export type JobRunList = [JobRun, ...JobRun[]]

export type RehydrationFn = (jobRuns: JobRunList) => MessageBusJobHandler

export interface RehydratableJob {
  readonly jobNames: readonly string[]
  rehydrate: (jobRuns: JobRunList) => MessageBusJobHandler
}

@injectable()
export class JobRehydrationRegistry {
  private readonly registry = new Map<string, RehydrationFn>()

  register (job: RehydratableJob): void {
    for (const name of job.jobNames) {
      this.registry.set(name, (jobRuns) => job.rehydrate(jobRuns))
    }
  }

  get (jobName: string): RehydrationFn | undefined {
    return this.registry.get(jobName)
  }
}
