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

export interface DeleteJob extends AbstractJob {
  type: 'delete'
  config: {
    elementType: ElementType
    parentFolder: string
  }
}

export interface DeleteFactoryArgs {
  action: AbstractJob['action']
  title: AbstractJob['title']
  topics: AbstractJob['topics']
  parentFolder: string
  elementType: ElementType
}

export const createJob = (job: DeleteFactoryArgs): DeleteJob => {
  return {
    id: getUniqueId(),
    action: job.action,
    type: 'delete',
    title: job.title,
    status: JobStatus.QUEUED,
    topics: job.topics,
    config: {
      elementType: job.elementType,
      parentFolder: job.parentFolder
    }
  }
}
