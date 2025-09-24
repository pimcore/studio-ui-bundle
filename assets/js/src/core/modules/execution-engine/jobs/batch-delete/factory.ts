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

export interface BatchDeleteJob extends AbstractJob {
  type: 'batch-delete'
  config: {
    assetContextId: number
  }
  refreshGrid: () => Promise<void>
}

export interface BatchDeleteFactoryArgs {
  action: AbstractJob['action']
  title: AbstractJob['title']
  topics: AbstractJob['topics']
  assetContextId: number
  refreshGrid: () => Promise<void>
}

export const createJob = (job: BatchDeleteFactoryArgs): BatchDeleteJob => {
  return {
    id: getUniqueId(),
    action: job.action,
    refreshGrid: job.refreshGrid,
    type: 'batch-delete',
    title: job.title,
    status: JobStatus.QUEUED,
    topics: job.topics,
    config: {
      assetContextId: job.assetContextId
    }
  }
}
