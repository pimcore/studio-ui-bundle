/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNil, isUndefined } from 'lodash'
import { store } from '@Pimcore/app/store'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { type JobInterface, type JobRunOptions } from '../job-interface'
import { MessageBusJobHandler } from '../../message-handlers/message-bus-job/message-bus-job-handler'
import { api } from '@Pimcore/modules/index-sync/index-sync-api-slice.gen'
import { t } from 'i18next'
import { type RehydratableJob, type JobRunList } from '../../services/job-rehydration-registry'

export class IndexSyncJob implements JobInterface {
  /**
   * API errors are reported here; any other failure propagates to the caller (startIndexSync), which owns the
   * reporting of startup failures, so the user is not shown two dialogs for one error.
   */
  async run (options: JobRunOptions): Promise<void> {
    const jobRunId = await this.executeRequest()

    if (isNil(jobRunId)) {
      return
    }

    options.messageBus.registerHandler(IndexSyncJob.buildHandler(jobRunId))
  }

  private async executeRequest (): Promise<number | null> {
    const response = await store.dispatch(api.endpoints.indexSyncStart.initiate())

    if (!isUndefined(response.error)) {
      trackError(new ApiError(response.error))
      return null
    }

    return response.data?.jobRunId ?? null
  }

  static readonly jobNames = ['studio_ee_job_index_sync'] as const

  static rehydrate (jobRuns: JobRunList): MessageBusJobHandler {
    const [parent] = jobRuns

    return IndexSyncJob.buildHandler(parent.id)
  }

  private static buildHandler (jobRunId: number): MessageBusJobHandler {
    return new MessageBusJobHandler({
      jobRunId,
      title: t('index-sync.job.title')
    })
  }
}

void (IndexSyncJob satisfies RehydratableJob)
