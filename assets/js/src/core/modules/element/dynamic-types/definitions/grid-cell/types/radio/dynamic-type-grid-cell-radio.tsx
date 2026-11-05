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
import { RadioCell } from '../../components/radio/radio-cell'

export const DEFAULT_RADIO_COLUMN_WIDTH = 100

@injectable()
export class DynamicTypeGridCellRadio extends DynamicTypeGridCellAbstract {
  readonly id: string = 'radio'

  getGridCellComponent (props: AbstractGridCellDefinition): ReactElement<AbstractGridCellDefinition> {
    return <RadioCell { ...props } />
  }

  getDefaultGridColumnWidth (): number | undefined {
    return DEFAULT_RADIO_COLUMN_WIDTH
  }
}
