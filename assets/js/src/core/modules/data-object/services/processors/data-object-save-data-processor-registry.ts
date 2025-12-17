/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { injectable } from 'inversify'
import { AbstractProcessorRegistry, type Processor } from '@Pimcore/modules/app/processor-registry/abstract-processor-registry'
import { AbstractDataContext } from '@Pimcore/modules/app/processor-registry/abstract-data-context'
import { type SaveTaskType } from '../../actions/save/use-save'
import type { DataObjectUpdateByIdApiArg } from '../../data-object-api-slice.gen'

export type DataObjectSaveUpdateData = DataObjectUpdateByIdApiArg['body']['data']

/**
 * Context object passed to data object save data processors
 */
export class DataObjectSaveDataContext extends AbstractDataContext<DataObjectSaveUpdateData> {
  constructor (
    public readonly dataObjectId: number,
    public readonly saveTask: SaveTaskType | undefined,
    public updateData: DataObjectSaveUpdateData
  ) {
    super(updateData)
  }
}

/**
 * Processor for modifying data object save data before it's sent to the API.
 * Allows adding, transforming, or enriching data based on custom logic.
 */
export interface DataObjectSaveDataProcessor extends Processor<DataObjectSaveDataContext> {}

@injectable()
export class DataObjectSaveDataProcessorRegistry extends AbstractProcessorRegistry<DataObjectSaveDataContext> {}
