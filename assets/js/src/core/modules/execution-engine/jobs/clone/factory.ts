/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
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
