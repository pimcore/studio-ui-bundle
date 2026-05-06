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
import { AbstractDownloadJob, type AbstractDownloadJobOptions } from './abstract-download-job'
import { getPrefix } from '@Pimcore/app/api/pimcore/route'
import { t } from 'i18next'
import { type RehydratableJob, type JobRunList } from '../../services/job-rehydration-registry'
import { resolveChildJobRunOptions } from '../rehydration-helpers'

const CSV_FOLDER_EXPORT_JOB_NAME = 'studio_ee_job_collect_csv_folder_export_elements' as const

export interface CsvDownloadJobOptions extends AbstractDownloadJobOptions {
  isFolderExport?: boolean
}

export class CsvDownloadJob extends AbstractDownloadJob {
  static readonly jobNames = ['studio_ee_job_create_csv', CSV_FOLDER_EXPORT_JOB_NAME] as const

  private readonly isFolderExport: boolean

  constructor (options: CsvDownloadJobOptions) {
    super({ action: options.action })
    this.isFolderExport = options.isFolderExport ?? false
  }

  protected usesChildJob (): boolean { return this.isFolderExport }
  protected static override getTitle (): string { return t('jobs.download-csv-job.title') }
  protected static override getDownloadUrl (): string { return `${getPrefix()}/export/download/csv/{jobRunId}` }

  static rehydrate (jobRuns: JobRunList): MessageBusJobHandler {
    const [parent] = jobRuns
    return this.buildHandler({
      ...resolveChildJobRunOptions(jobRuns),
      hasChildJob: parent.jobName === CSV_FOLDER_EXPORT_JOB_NAME
    })
  }
}

void (CsvDownloadJob satisfies RehydratableJob)
