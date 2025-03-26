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

import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { type AbstractJob, JobStatus } from '../abstact-job'
import { getUniqueId } from '../factory-helper'

export interface CloneJob extends AbstractJob {
  type: 'clone'
  config: {
    parentFolder: string
    elementType: ElementType
  }
}

export interface CloneFactoryArgs {
  action: AbstractJob['action']
  title: AbstractJob['title']
  topics: AbstractJob['topics']
  parentFolder: string
  elementType: ElementType
}

export const createJob = (job: CloneFactoryArgs): CloneJob => {
  return {
    id: getUniqueId(),
    action: job.action,
    type: 'clone',
    title: job.title,
    status: JobStatus.QUEUED,
    topics: job.topics,
    config: {
      parentFolder: job.parentFolder,
      elementType: job.elementType
    }
  }
}
