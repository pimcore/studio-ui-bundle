/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isUndefined } from 'lodash'
import { store } from '@Pimcore/app/store'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { AbstractBatchDeleteJob, type AbstractBatchDeleteJobOptions } from './abstract-batch-delete-job'
import { api } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { type RehydratableJob, type JobRunList } from '../../services/job-rehydration-registry'
import { type MessageBusJobHandler } from '../../message-handlers/message-bus-job/message-bus-job-handler'

export interface AssetBatchDeleteJobOptions extends AbstractBatchDeleteJobOptions {}

export class AssetBatchDeleteJob extends AbstractBatchDeleteJob {
  static readonly jobNames = ['studio_ee_job_batch_delete_assets'] as const

  static rehydrate (jobRuns: JobRunList): MessageBusJobHandler {
    const [parent] = jobRuns
    return this.buildHandler({ jobRunId: parent.id })
  }

  protected async executeDeleteRequest (): Promise<number | null> {
    const response = await store.dispatch(
      api.endpoints.assetBatchDelete.initiate({
        body: {
          ids: this.itemIds
        }
      })
    )

    if (!isUndefined(response.error)) {
      trackError(new ApiError(response.error))
      return null
    }

    return response.data?.jobRunId ?? null
  }
}

void (AssetBatchDeleteJob satisfies RehydratableJob)
