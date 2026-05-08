/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { store } from '@Pimcore/app/store'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { isUndefined } from 'lodash'
import { api } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { elementTypes } from '@Pimcore/types/enums/element/element-type'
import { t } from 'i18next'
import { type RehydratableJob, type JobRunList } from '../../services/job-rehydration-registry'
import { type MessageBusJobHandler } from '../../message-handlers/message-bus-job/message-bus-job-handler'
import { AbstractCloneJob, type AbstractCloneJobOptions } from './abstract-clone-job'
import { resolveChildJobRunOptions } from '../rehydration-helpers'

export type AssetCloneJobOptions = Omit<AbstractCloneJobOptions, 'elementType'>

export class AssetCloneJob extends AbstractCloneJob {
  static readonly jobNames = ['studio_ee_job_clone_assets'] as const

  constructor (options: AssetCloneJobOptions) {
    super({ ...options, elementType: elementTypes.asset })
  }

  protected static override getTitle (): string { return t('jobs.asset-clone-job.title') }

  protected async executeCloneRequest (): Promise<number | null> {
    const response = await store.dispatch(
      api.endpoints.assetClone.initiate({ id: this.sourceId, parentId: this.targetId })
    )

    if (!isUndefined(response.error)) {
      trackError(new ApiError(response.error))
      return null
    }

    return response.data?.jobRunId ?? null
  }

  static rehydrate (jobRuns: JobRunList): MessageBusJobHandler {
    return this.buildHandler(resolveChildJobRunOptions(jobRuns))
  }
}

void (AssetCloneJob satisfies RehydratableJob)
