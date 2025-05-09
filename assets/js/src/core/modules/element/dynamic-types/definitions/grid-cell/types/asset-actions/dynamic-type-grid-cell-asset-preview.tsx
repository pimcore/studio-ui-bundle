/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactElement } from 'react'
import { type AbstractGridCellDefinition, DynamicTypeGridCellAbstract } from '../../dynamic-type-grid-cell-abstract'
import { injectable } from 'inversify'
import { AssetActionsCell } from '../../components/asset-actions/asset-actions'

@injectable()
export class DynamicTypeGridCellAssetActions extends DynamicTypeGridCellAbstract {
  readonly id = 'asset-actions'

  getGridCellComponent (props: AbstractGridCellDefinition): ReactElement<AbstractGridCellDefinition> {
    return <AssetActionsCell { ...props } />
  }

  getDefaultGridColumnWidth (): number | undefined {
    return 100
  }
}
