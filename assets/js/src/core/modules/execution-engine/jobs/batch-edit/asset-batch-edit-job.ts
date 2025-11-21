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

export interface AssetBatchEditJobOptions extends AbstractBatchEditJobOptions {
  patchAssets: (args: any) => Promise<any>
  selectedRowsIds: number[]
  patches: any[]
}

export class AssetBatchEditJob extends AbstractBatchEditJob {
  private readonly patchAssets: (args: any) => Promise<any>
  private readonly selectedRowsIds: number[]
  private readonly patches: any[]

  constructor (options: AssetBatchEditJobOptions) {
    super(options)
    this.patchAssets = options.patchAssets
    this.selectedRowsIds = options.selectedRowsIds
    this.patches = options.patches
  }

  protected async executeEditRequest (): Promise<string | number | null> {
    const response = await this.patchAssets({
      body: {
        data: this.selectedRowsIds.map((rowId) => ({
          id: rowId,
          metadata: this.patches
        }))
      }
    })

    return response.data?.jobRunId ?? null
  }
}
