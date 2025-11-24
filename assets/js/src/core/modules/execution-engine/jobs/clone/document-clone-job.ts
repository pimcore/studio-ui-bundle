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
import { AbstractCloneJob, type AbstractCloneJobOptions } from './abstract-clone-job'

export interface DocumentCloneJobOptions extends Omit<AbstractCloneJobOptions, 'elementType'> {
  parameters: DocumentCloneParameters
}

export class DocumentCloneJob extends AbstractCloneJob {
  private readonly parameters: DocumentCloneParameters

  constructor (options: DocumentCloneJobOptions) {
    super({
      sourceId: options.sourceId,
      targetId: options.targetId,
      title: options.title,
      elementType: elementTypes.document,
      treeId: options.treeId,
      nodeId: options.nodeId
    })
    this.parameters = options.parameters
  }

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
}
