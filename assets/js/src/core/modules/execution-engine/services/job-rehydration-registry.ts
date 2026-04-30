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

export type RehydrationFn = (parent: JobRun, child?: JobRun) => MessageBusJobHandler

@injectable()
export class JobRehydrationRegistry {
  private readonly registry = new Map<string, RehydrationFn>()

  register (jobNames: string[], fn: RehydrationFn): void {
    for (const name of jobNames) {
      this.registry.set(name, fn)
    }
  }

  get (jobName: string): RehydrationFn | undefined {
    return this.registry.get(jobName)
  }
}
