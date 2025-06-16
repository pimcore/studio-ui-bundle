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
import { ElementCell } from '../../components/element-cell/element-cell'
import { addColumnConfig } from '@Pimcore/components/grid/columns/helpers'

@injectable()
export class DynamicTypeGridCellAsset extends DynamicTypeGridCellAbstract {
  readonly id = 'asset'

  getGridCellComponent (props: AbstractGridCellDefinition): ReactElement<AbstractGridCellDefinition> {
    return <ElementCell { ...addColumnConfig(props, { allowedTypes: ['asset'] }) } />
  }

  getDefaultGridColumnWidth (): number | undefined {
    return 350
  }
}
