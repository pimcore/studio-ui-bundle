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
import { CheckboxCell } from '../../components/checkbox/checkbox-cell'

export const DEFAULT_CHECKBOX_COLUMN_WIDTH = 100

@injectable()
export class DynamicTypeGridCellCheckbox extends DynamicTypeGridCellAbstract {
  readonly id = 'checkbox'

  getGridCellComponent (props: AbstractGridCellDefinition): ReactElement<AbstractGridCellDefinition> {
    return <CheckboxCell { ...props } />
  }

  getDefaultGridColumnWidth (): number | undefined {
    return DEFAULT_CHECKBOX_COLUMN_WIDTH
  }
}
