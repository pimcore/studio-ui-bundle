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

export interface DocumentCloneBackgroundJob extends AbstractJob {
  type: 'document-clone-background'
  config: {
    parentFolder: string
    elementType: ElementType
    sourceId: number
    targetId: number
    parameters?: any
    isReplace?: boolean
    progress: number
  }
}

export interface DocumentCloneBackgroundJobArgs {
  action: AbstractJob['action']
  title: AbstractJob['title']
  topics: AbstractJob['topics']
  parentFolder: string
  elementType: ElementType
  sourceId: number
  targetId: number
  parameters?: any
  isReplace?: boolean
}

export const createDocumentCloneBackgroundJob = (job: DocumentCloneBackgroundJobArgs): DocumentCloneBackgroundJob => {
  return {
    id: getUniqueId(),
    action: job.action,
    type: 'document-clone-background',
    title: job.title,
    status: JobStatus.QUEUED,
    topics: job.topics,
    config: {
      parentFolder: job.parentFolder,
      elementType: job.elementType,
      sourceId: job.sourceId,
      targetId: job.targetId,
      parameters: job.parameters,
      isReplace: job.isReplace,
      progress: 0
    }
  }
}
