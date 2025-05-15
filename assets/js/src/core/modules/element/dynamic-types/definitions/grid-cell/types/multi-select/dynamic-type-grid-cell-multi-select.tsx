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
import {
  MultiSelectCell
} from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/components/multi-select/multi-select-cell'

@injectable()
export class DynamicTypeGridCellMultiSelect extends DynamicTypeGridCellAbstract {
  readonly id = 'multi-select'

  getGridCellComponent (props: AbstractGridCellDefinition): ReactElement<AbstractGridCellDefinition> {
    return <MultiSelectCell { ...props } />
  }
}
