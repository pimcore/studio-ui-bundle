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

export interface DownloadJob extends AbstractJob {
  type: 'download'
  config: {
    downloadUrl: string
  }
}

export interface DownloadJobFactoryArgs {
  action: AbstractJob['action']
  title: AbstractJob['title']
  topics: AbstractJob['topics']
  downloadUrl: string
}

export const createJob = (job: DownloadJobFactoryArgs): DownloadJob => {
  return {
    id: getUniqueId(),
    action: job.action,
    type: 'download',
    title: job.title,
    status: JobStatus.QUEUED,
    topics: job.topics,
    config: {
      downloadUrl: job.downloadUrl
    }
  }
}
