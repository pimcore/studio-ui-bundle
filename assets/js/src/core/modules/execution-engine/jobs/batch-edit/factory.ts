/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type AbstractJob, JobStatus } from '../abstact-job'
import { getUniqueId } from '../factory-helper'

export interface BatchEditJob extends AbstractJob {
  type: 'batch-edit'
  config: {
    assetContextId: number
  }
  refreshGrid: () => Promise<void>
}

export interface BatchEditFactoryArgs {
  action: AbstractJob['action']
  title: AbstractJob['title']
  topics: AbstractJob['topics']
  assetContextId: number
  refreshGrid: () => Promise<void>
}

export const createJob = (job: BatchEditFactoryArgs): BatchEditJob => {
  return {
    id: getUniqueId(),
    action: job.action,
    refreshGrid: job.refreshGrid,
    type: 'batch-edit',
    title: job.title,
    status: JobStatus.QUEUED,
    topics: job.topics,
    config: {
      assetContextId: job.assetContextId
    }
  }
}
