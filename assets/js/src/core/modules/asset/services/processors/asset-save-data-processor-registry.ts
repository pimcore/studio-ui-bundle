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
import type { AssetUpdateByIdApiArg } from '../../asset-api-slice.gen'

export type AssetSaveUpdateData = AssetUpdateByIdApiArg['body']['data']

/**
 * Context object passed to asset save data processors
 */
export class AssetSaveDataContext extends AbstractDataContext<AssetSaveUpdateData> {
  constructor (
    public readonly assetId: number,
    public updateData: AssetSaveUpdateData
  ) {
    super(updateData)
  }
}

/**
 * Processor for modifying asset save data before it's sent to the API.
 * Allows adding, transforming, or enriching data based on custom logic.
 */
export interface AssetSaveDataProcessor extends Processor<AssetSaveDataContext> {}

@injectable()
export class AssetSaveDataProcessorRegistry extends AbstractProcessorRegistry<AssetSaveDataContext> {}
