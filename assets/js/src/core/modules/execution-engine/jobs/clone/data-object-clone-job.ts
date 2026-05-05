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
import { api, type DataObjectCloneParameters } from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import { elementTypes } from '@Pimcore/types/enums/element/element-type'
import { t } from 'i18next'
import { type RehydratableJob, type JobRunList } from '../../services/job-rehydration-registry'
import { type MessageBusJobHandler } from '../../message-handlers/message-bus-job/message-bus-job-handler'
import { AbstractCloneJob, type AbstractCloneJobOptions } from './abstract-clone-job'
import { resolveChildJobRunOptions } from '../rehydration-helpers'

export interface DataObjectCloneJobOptions extends Omit<AbstractCloneJobOptions, 'elementType'> {
  parameters: DataObjectCloneParameters
}

export class DataObjectCloneJob extends AbstractCloneJob {
  static readonly jobNames = ['studio_ee_job_clone_data_objects'] as const

  private readonly parameters: DataObjectCloneParameters

  constructor (options: DataObjectCloneJobOptions) {
    super({ ...options, elementType: elementTypes.dataObject })
    this.parameters = options.parameters
  }

  protected static override getTitle (): string { return t('jobs.data-object-clone-job.title') }

  protected async executeCloneRequest (): Promise<number | null> {
    const response = await store.dispatch(
      api.endpoints.dataObjectClone.initiate({
        id: this.sourceId,
        parentId: this.targetId,
        cloneParameters: this.parameters
      })
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

void (DataObjectCloneJob satisfies RehydratableJob)
