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
import { VersionIdCell } from '../../components/_schedule/version-id-cell/version-id-cell'

@injectable()
export class DynamicTypeGridCellVersionIdSelect extends DynamicTypeGridCellAbstract {
  readonly id = 'version-id-select'

  getGridCellComponent (props: AbstractGridCellDefinition): ReactElement<AbstractGridCellDefinition> {
    return <VersionIdCell { ...props } />
  }
}
