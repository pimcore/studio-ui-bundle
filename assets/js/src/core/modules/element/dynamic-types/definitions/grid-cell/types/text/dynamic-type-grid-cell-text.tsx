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
import { TextCell } from '../../components/text/text-cell'
import { injectable } from 'inversify'

@injectable()
export class DynamicTypeGridCellText extends DynamicTypeGridCellAbstract {
  readonly id = 'input'

  getGridCellComponent (props: AbstractGridCellDefinition): ReactElement<AbstractGridCellDefinition> {
    return <TextCell { ...props } />
  }

  getDefaultGridColumnWidth (): number | undefined {
    return 350 // asset -> type column // asset -> filename column
  }
}
