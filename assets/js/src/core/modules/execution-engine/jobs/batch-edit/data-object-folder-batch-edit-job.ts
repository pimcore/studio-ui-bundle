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
import { ProgressFieldCalculator } from '../../message-handlers/message-bus-job/progress-calculator/progress-field-calculator'
import { DefaultStepTracker } from '../../message-handlers/message-bus-job/step-tracker/default-step-tracker'

export interface DataObjectFolderBatchEditJobOptions extends AbstractBatchEditJobOptions {
  patchObjectsInFolder: (args: any) => Promise<any>
  folderId: number
  values: any
  filters: any
  classId: string
}

export class DataObjectFolderBatchEditJob extends AbstractBatchEditJob {
  private readonly patchObjectsInFolder: (args: any) => Promise<any>
  private readonly folderId: number
  private readonly values: any
  private readonly filters: any
  private readonly classId: string

  constructor (options: DataObjectFolderBatchEditJobOptions) {
    super(options)
    this.patchObjectsInFolder = options.patchObjectsInFolder
    this.folderId = options.folderId
    this.values = options.values
    this.filters = options.filters
    this.classId = options.classId
  }

  protected override createHandler (options: MessageBusJobHandlerOptions): MessageBusJobHandler {
    return new MessageBusJobHandler({
      ...options,
      
      stepDescriptions: {
        1: 'jobs.job.step.batch-edit.preparing',
        2: 'jobs.job.step.batch-edit.applying'
      },
      stepTracker: new DefaultStepTracker({ showStepLabel: true }),
      progressCalculator: new ProgressFieldCalculator()
    })
  }

  protected async executeEditRequest (): Promise<number | null> {
    const response = await this.patchObjectsInFolder({
      id: this.folderId,
      body: {
        data: {
          editableData: this.values
        },
        filters: this.filters,
        classId: this.classId
      }
    })

    return response.data?.jobRunId ?? null
  }
}
