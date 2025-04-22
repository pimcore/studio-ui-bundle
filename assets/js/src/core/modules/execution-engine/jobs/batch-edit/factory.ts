/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
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
