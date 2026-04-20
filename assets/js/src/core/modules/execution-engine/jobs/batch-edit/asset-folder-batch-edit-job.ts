/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { AbstractBatchEditJob, type AbstractBatchEditJobOptions } from './abstract-batch-edit-job'
import { MessageBusJobHandler, type MessageBusJobHandlerOptions } from '../../message-handlers/message-bus-job/message-bus-job-handler'
import { ProgressFieldStrategy } from '../../message-handlers/message-bus-job/strategies/progress-field-strategy'

export interface AssetFolderBatchEditJobOptions extends AbstractBatchEditJobOptions {
  patchAssetsInFolder: (args: any) => Promise<any>
  folderId: number
  patches: any[]
  filters: any
}

export class AssetFolderBatchEditJob extends AbstractBatchEditJob {
  private readonly patchAssetsInFolder: (args: any) => Promise<any>
  private readonly folderId: number
  private readonly patches: any[]
  private readonly filters: any

  constructor (options: AssetFolderBatchEditJobOptions) {
    super(options)
    this.patchAssetsInFolder = options.patchAssetsInFolder
    this.folderId = options.folderId
    this.patches = options.patches
    this.filters = options.filters
  }

  protected override createHandler (options: MessageBusJobHandlerOptions): MessageBusJobHandler {
    return new MessageBusJobHandler({
      ...options,
      totalSteps: 2,
      stepDescriptions: {
        1: 'jobs.job.step.batch-edit.preparing',
        2: 'jobs.job.step.batch-edit.applying'
      },
      progressStrategy: new ProgressFieldStrategy()
    })
  }

  protected async executeEditRequest (): Promise<number | null> {
    const response = await this.patchAssetsInFolder({
      id: this.folderId,
      body: {
        data: {
          metadata: this.patches
        },
        filters: this.filters
      }
    })

    return response.data?.jobRunId ?? null
  }
}
