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

export interface DownloadJob extends AbstractJob {
  type: 'download'
  config: {
    downloadUrl: string
  }
}

export interface DownloadJobFactoryArgs {
  id: AbstractJob['id']
  title: AbstractJob['title']
  topics: AbstractJob['topics']
  downloadUrl: string
}

export const createJob = (job: DownloadJobFactoryArgs): DownloadJob => {
  return {
    id: job.id,
    jobId: job.id,
    type: 'download',
    title: job.title,
    status: JobStatus.RUNNING,
    topics: job.topics,
    config: {
      downloadUrl: job.downloadUrl
    }
  }
}
