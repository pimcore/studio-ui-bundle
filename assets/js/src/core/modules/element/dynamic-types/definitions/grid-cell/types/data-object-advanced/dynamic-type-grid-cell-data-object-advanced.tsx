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
import React, { type ReactElement } from 'react'
import { type AbstractGridCellDefinition, DynamicTypeGridCellAbstract } from '../../dynamic-type-grid-cell-abstract'
import { DataObjectAdvancedCell } from '../../components/data-object-advanced/data-object-advanced-cell'

@injectable()
export class DynamicTypeGridCellDataObjectAdvanced extends DynamicTypeGridCellAbstract {
  readonly id = 'dataobject.advanced'

  getGridCellComponent (props: AbstractGridCellDefinition): ReactElement<AbstractGridCellDefinition> {
    return <DataObjectAdvancedCell { ...props } />
  }
}
