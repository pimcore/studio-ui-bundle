/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type MessageBusJobHandler } from '../../message-handlers/message-bus-job/message-bus-job-handler'
import { AbstractDownloadJob } from './abstract-download-job'
import { getPrefix } from '@Pimcore/app/api/pimcore/route'
import { t } from 'i18next'
import { type RehydratableJob, type JobRunList } from '../../services/job-rehydration-registry'

export class ZipDownloadJob extends AbstractDownloadJob {
  static readonly jobNames = ['studio_ee_job_create_download_zip'] as const

  protected static override getTitle (): string { return t('jobs.download-zip-job.title') }
  protected static override getDownloadUrl (): string { return `${getPrefix()}/assets/download/zip/{jobRunId}` }

  static rehydrate (jobRuns: JobRunList): MessageBusJobHandler {
    const [parent] = jobRuns
    return this.buildHandler({ jobRunId: parent.id })
  }
}

void (ZipDownloadJob satisfies RehydratableJob)
