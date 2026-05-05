/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { api, type DocumentCloneApiArg, type DocumentCloneParameters } from '@Pimcore/modules/document/document-api-slice.gen'
import { elementTypes } from '@Pimcore/types/enums/element/element-type'
import { store } from '@Pimcore/app/store'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { isUndefined } from 'lodash'
import { t } from 'i18next'
import { type RehydratableJob, type JobRunList } from '../../services/job-rehydration-registry'
import { type MessageBusJobHandler } from '../../message-handlers/message-bus-job/message-bus-job-handler'
import { AbstractCloneJob, type AbstractCloneJobOptions } from './abstract-clone-job'
import { resolveChildJobRunOptions } from '../rehydration-helpers'

export interface DocumentCloneJobOptions extends Omit<AbstractCloneJobOptions, 'elementType'> {
  parameters: DocumentCloneParameters
}

export class DocumentCloneJob extends AbstractCloneJob {
  static readonly jobNames = ['studio_ee_job_clone_documents'] as const

  private readonly parameters: DocumentCloneParameters

  constructor (options: DocumentCloneJobOptions) {
    super({ ...options, elementType: elementTypes.document })
    this.parameters = options.parameters
  }

  protected static override getTitle (): string { return t('jobs.document-clone-job.title') }

  protected async executeCloneRequest (): Promise<number | null> {
    const cloneParams: DocumentCloneApiArg = {
      id: this.sourceId,
      parentId: this.targetId,
      documentCloneParameters: this.parameters ?? {}
    }

    const response = await store.dispatch(
      api.endpoints.documentClone.initiate(cloneParams)
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

void (DocumentCloneJob satisfies RehydratableJob)
