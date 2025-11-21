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

export interface DataObjectBatchEditJobOptions extends AbstractBatchEditJobOptions {
  patchObjectsByIds: (args: any) => Promise<any>
  selectedRowsIds: number[]
  values: any
}

export class DataObjectBatchEditJob extends AbstractBatchEditJob {
  private readonly patchObjectsByIds: (args: any) => Promise<any>
  private readonly selectedRowsIds: number[]
  private readonly values: any

  constructor (options: DataObjectBatchEditJobOptions) {
    super(options)
    this.patchObjectsByIds = options.patchObjectsByIds
    this.selectedRowsIds = options.selectedRowsIds
    this.values = options.values
  }

  protected async executeEditRequest (): Promise<string | number | null> {
    const response = await this.patchObjectsByIds({
      body: {
        data: this.selectedRowsIds.map((rowId) => ({
          id: rowId,
          editableData: this.values
        }))
      }
    })

    return response.data?.jobRunId ?? null
  }
}
