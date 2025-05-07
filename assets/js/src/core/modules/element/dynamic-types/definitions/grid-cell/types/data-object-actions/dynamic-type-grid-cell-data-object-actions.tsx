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
import { DataObjectActionsCell } from '../../components/data-object-actions/data-object-actions'

@injectable()
export class DynamicTypeGridCellDataObjectActions extends DynamicTypeGridCellAbstract {
  readonly id = 'data-object-actions'

  getGridCellComponent (props: AbstractGridCellDefinition): ReactElement<AbstractGridCellDefinition> {
    return <DataObjectActionsCell { ...props } />
  }

  getDefaultGridColumnWidth (): number | undefined {
    return 100
  }
}
