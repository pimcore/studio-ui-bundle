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

export interface DefaultJob extends AbstractJob {
  type: 'default'
  config: undefined
}

export interface DefaultJobFactoryArgs {
  action: AbstractJob['action']
  title: AbstractJob['title']
  topics: AbstractJob['topics']
}

export const createJob = (job: DefaultJobFactoryArgs): DefaultJob => {
  return {
    id: getUniqueId(),
    action: job.action,
    type: 'default',
    title: job.title,
    status: JobStatus.QUEUED,
    topics: job.topics,
    config: undefined
  }
}
